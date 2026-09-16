import type { Match, MatchCategory } from './types.ts';

const ORIGIN = 'https://thefootdata.com';
const CLUB_PATH = '/clubs/united-football-saint-denis';
const CLUB_ID = 8838;
const PAGE_TIMEOUT_MS = 6_000;
const MAX_TEAMS = 40;
const MAX_MATCHES = 1_000;
const MAX_PAGE_BYTES = 2 * 1024 * 1024;

type Fetcher = typeof fetch;

type SourceMatch = {
  match_id: number;
  competition_edition_id: number;
  matchday?: number | null;
  kickoff_local_date: string;
  kickoff_at: string | null;
  status: string;
  home_club_id: number | null;
  home_team_id: string | null;
  home_short_name: string | null;
  away_club_id: number | null;
  away_team_id: string | null;
  away_short_name: string | null;
  home_score: number | null;
  away_score: number | null;
  home_penalty_score?: number | null;
  away_penalty_score?: number | null;
};

type CalendarProps = {
  matches: SourceMatch[];
  teamId: string;
  tabs: unknown[];
  allHref: string;
  initialCompet: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function readFlightChunks(html: string): string[] {
  const chunks: string[] = [];
  const re = /self\.__next_f\.push\(\[1,("(?:\\.|[^"\\])*")\]\)/g;
  for (const match of html.matchAll(re)) {
    try {
      chunks.push(JSON.parse(match[1]));
    } catch {
      throw new Error('TheFootData Flight payload is invalid');
    }
  }
  if (chunks.length === 0) throw new Error('TheFootData Flight payload is missing');
  return chunks;
}

function jsonObjectsWithMatches(flight: string): unknown[] {
  const objects: unknown[] = [];
  for (let marker = flight.indexOf('"matches"'); marker !== -1; marker = flight.indexOf('"matches"', marker + 1)) {
    const start = flight.lastIndexOf('{', marker);
    if (start === -1) continue;
    let depth = 0;
    let quoted = false;
    let escaped = false;
    for (let index = start; index < flight.length; index += 1) {
      const char = flight[index];
      if (quoted) {
        if (escaped) escaped = false;
        else if (char === '\\') escaped = true;
        else if (char === '"') quoted = false;
        continue;
      }
      if (char === '"') quoted = true;
      else if (char === '{') depth += 1;
      else if (char === '}' && --depth === 0) {
        try { objects.push(JSON.parse(flight.slice(start, index + 1))); } catch { /* not a JSON object */ }
        break;
      }
    }
  }
  return objects;
}

function isCalendarProps(value: unknown): value is CalendarProps {
  if (!isRecord(value) || !Array.isArray(value.matches) || !Array.isArray(value.tabs)) return false;
  return typeof value.teamId === 'string' && typeof value.allHref === 'string' && 'initialCompet' in value;
}

/** Extract the CalendarFilter properties from a public TheFootData HTML page. */
export function parseCalendarProps(html: string, expectedTeamId?: string): CalendarProps {
  const candidates = jsonObjectsWithMatches(readFlightChunks(html).join('')).filter(isCalendarProps);
  const calendar = candidates.find((item) =>
    item.teamId.startsWith(`${CLUB_ID}-`) && (!expectedTeamId || item.teamId === expectedTeamId),
  );
  if (!calendar) throw new Error('TheFootData calendar data is missing or belongs to another club');
  return calendar;
}

function teamUrl(teamId: string, season: number): URL {
  const url = new URL(CLUB_PATH, ORIGIN);
  url.searchParams.set('equipe', teamId);
  url.searchParams.set('saison', String(season));
  return url;
}

function isAllowedUrl(url: URL, teamId?: string): boolean {
  if (url.origin !== ORIGIN || url.pathname !== CLUB_PATH) return false;
  if (teamId && url.searchParams.get('equipe') !== teamId) return false;
  return true;
}

function validateSeasonHref(href: string, teamId: string, season: number): void {
  const url = new URL(href, ORIGIN);
  if (!isAllowedUrl(url, teamId) || url.searchParams.get('saison') !== String(season) || url.searchParams.has('compet')) {
    throw new Error('TheFootData calendar identity or season does not match the requested team');
  }
}

/** Discover only the club teams explicitly linked for the requested season. */
export function discoverCurrentTeamIds(html: string, season: number): string[] {
  const decoded = readFlightChunks(html).join('');
  const ids = new Set<string>();
  const hrefRe = /"href":"([^"\\]*(?:\\.[^"\\]*)*)"/g;
  for (const hit of decoded.matchAll(hrefRe)) {
    let href: string;
    try { href = JSON.parse(`"${hit[1]}"`); } catch { continue; }
    const url = new URL(href, ORIGIN);
    const id = url.searchParams.get('equipe');
    if (isAllowedUrl(url) && id?.startsWith(`${CLUB_ID}-`) && url.searchParams.get('saison') === String(season) && !url.searchParams.has('compet')) {
      ids.add(id);
    }
  }
  if (ids.size === 0) throw new Error('No current TheFootData teams were found for this season');
  if (ids.size > MAX_TEAMS) throw new Error('TheFootData returned too many current teams');
  return [...ids].sort();
}

/** Reject a page that is not the public UFSD club record before following team links. */
export function validateClubIdentity(html: string): void {
  const flight = readFlightChunks(html).join('');
  if (!flight.includes('United Football Saint-Denis') || !flight.includes('523415')) {
    throw new Error('TheFootData page does not identify United Football Saint-Denis');
  }
}

function validScore(value: unknown): value is number | null {
  return value === null || (typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 99);
}

function isSourceMatch(value: unknown): value is SourceMatch {
  if (!isRecord(value)) return false;
  const text = ['kickoff_local_date', 'status'];
  const nullableText = ['kickoff_at', 'home_team_id', 'home_short_name', 'away_team_id', 'away_short_name'];
  return typeof value.match_id === 'number' && Number.isInteger(value.match_id) && value.match_id > 0 &&
    typeof value.competition_edition_id === 'number' && Number.isInteger(value.competition_edition_id) && value.competition_edition_id > 0 &&
    (value.matchday === undefined || value.matchday === null || (typeof value.matchday === 'number' && Number.isInteger(value.matchday) && value.matchday > 0)) &&
    text.every((key) => typeof value[key] === 'string') &&
    nullableText.every((key) => value[key] === null || typeof value[key] === 'string') &&
    (value.home_club_id === null || typeof value.home_club_id === 'number') &&
    (value.away_club_id === null || typeof value.away_club_id === 'number') &&
    validScore(value.home_score) && validScore(value.away_score) && validScore(value.home_penalty_score ?? null) && validScore(value.away_penalty_score ?? null);
}

function competitionAge(label?: string): number | undefined {
  const match = label?.match(/\bU\s?(\d{1,2})\b/i);
  return match ? Number(match[1]) : undefined;
}

function categoryFor(teamId: string, competitionLabel?: string): MatchCategory {
  if (teamId.includes('-VET-')) return 'Vétérans' as MatchCategory;
  const age = competitionAge(competitionLabel);
  if (age !== undefined) {
    if (age <= 9) return 'U6-U9';
    if (age <= 13) return 'U10-U13';
    if (age <= 17) return 'U14-U17';
    return 'U18-Seniors';
  }
  if (teamId.includes('-FA-')) return 'U6-U9';
  if (teamId.includes('-U13-')) return 'U10-U13';
  if (teamId.includes('-U15-') || teamId.includes('-U17-')) return 'U14-U17';
  if (teamId.includes('-U19-')) return 'U18-Seniors';
  return 'Seniors';
}

function labelFor(teamId: string, competitionLabel?: string): string {
  const [, group = 'Équipe', number = '1'] = teamId.split('-');
  const age = competitionAge(competitionLabel);
  const label = group === 'VET' ? 'Vétérans' : age === undefined ? (group === 'SEM' ? 'Seniors' : group) : `U${age}`;
  return `${label} — Équipe ${number}`;
}

function matchStatus(source: SourceMatch): Match['status'] {
  if (source.status === 'reporte' || source.status === 'reporté') return 'postponed' as Match['status'];
  if (source.status === 'annule' || source.status === 'annulé') return 'cancelled' as Match['status'];
  if (source.status !== 'termine' && source.status !== 'a_jouer') throw new Error('TheFootData returned an unknown match status');
  if (source.status === 'termine' && source.home_score !== null && source.away_score !== null) return 'finished';
  return source.status === 'termine' ? 'pending' : 'upcoming';
}

function validDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function validTime(value: string | null): boolean {
  if (value === null) return true;
  const match = /^(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2}):(\d{2})$/.exec(value);
  return match !== null && validDate(match[1]) && Number(match[2]) < 24 && Number(match[3]) < 60 && Number(match[4]) < 60;
}

function teamName(clubId: number | null, teamId: string | null, sourceName: string | null): string {
  if (clubId === CLUB_ID) return `UF Saint-Denis — Équipe ${teamId?.split('-').at(-1) ?? 'à désigner'}`;
  const number = teamId?.split('-').at(-1);
  return sourceName ? `${sourceName}${number ? ` — Équipe ${number}` : ''}` : 'Adversaire à désigner';
}

/** Convert one validated public source match. Null scores remain absent; 0 is preserved. */
export function mapPublicMatch(source: unknown, teamId: string, sourceUrl: string, competitionLabel?: string, season?: number): Match {
  if (!isSourceMatch(source)) throw new Error('TheFootData match format changed');
  if (source.home_club_id !== CLUB_ID && source.away_club_id !== CLUB_ID) throw new Error('TheFootData returned a match for another club');
  if (source.home_team_id !== teamId && source.away_team_id !== teamId) throw new Error('TheFootData returned a match for another team');
  if (!validDate(source.kickoff_local_date) || !validTime(source.kickoff_at)) {
    throw new Error('TheFootData returned an invalid kickoff');
  }
  if (season !== undefined && (source.kickoff_local_date < `${season}-07-01` || source.kickoff_local_date > `${season + 1}-06-30`)) {
    throw new Error('TheFootData returned a match outside the requested season');
  }
  if ((source.home_score === null) !== (source.away_score === null)) throw new Error('TheFootData returned a partial score');
  const match: Match = {
    id: String(source.match_id),
    homeTeam: { name: teamName(source.home_club_id, source.home_team_id, source.home_short_name), shortName: source.home_club_id === CLUB_ID ? 'UFSD' : undefined },
    awayTeam: { name: teamName(source.away_club_id, source.away_team_id, source.away_short_name), shortName: source.away_club_id === CLUB_ID ? 'UFSD' : undefined },
    date: source.kickoff_local_date,
    // The public calendar exposes dates, but no timezone-qualified match times.
    // Internal SQL timestamps disagree with other listings: do not present them as confirmed kickoffs.
    time: '',
    venue: 'Lieu à confirmer',
    category: categoryFor(teamId, competitionLabel),
    competition: competitionLabel ?? String(source.competition_edition_id),
    status: matchStatus(source),
    matchDay: source.matchday ?? undefined,
    teamLabel: labelFor(teamId, competitionLabel),
    sourceUrl,
  };
  if (source.home_score !== null && source.away_score !== null) {
    match.homeScore = source.home_score;
    match.awayScore = source.away_score;
  }
  if (source.home_penalty_score !== null && source.home_penalty_score !== undefined) match.homePenaltyScore = source.home_penalty_score;
  if (source.away_penalty_score !== null && source.away_penalty_score !== undefined) match.awayPenaltyScore = source.away_penalty_score;
  return match;
}

async function fetchPage(url: URL, fetcher: Fetcher): Promise<string> {
  if (!isAllowedUrl(url)) throw new Error('Refusing an unexpected TheFootData URL');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PAGE_TIMEOUT_MS);
  try {
    const response = await fetcher(url.toString(), { signal: controller.signal, cache: 'no-store', redirect: 'error' });
    if (!response.ok) throw new Error(`TheFootData request failed (${response.status})`);
    const page = await response.text();
    if (new TextEncoder().encode(page).byteLength > MAX_PAGE_BYTES) throw new Error('TheFootData page is too large');
    return page;
  } finally {
    clearTimeout(timer);
  }
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, work: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await work(items[index]);
    }
  }));
  return results;
}

/** Read the public TheFootData pages for all current UFSD teams in a season. */
export async function fetchPublicMatches(season: number, fetcher: Fetcher = fetch): Promise<{ matches: Match[]; teamCount: number }> {
  if (!Number.isInteger(season) || season < 2000 || season > 2100) throw new Error('Invalid season');
  const defaultUrl = new URL(CLUB_PATH, ORIGIN);
  const defaultHtml = await fetchPage(defaultUrl, fetcher);
  validateClubIdentity(defaultHtml);
  const teamIds = discoverCurrentTeamIds(defaultHtml, season);
  const perTeam = await mapWithConcurrency(teamIds, 3, async (teamId) => {
    const url = teamUrl(teamId, season);
    const page = await fetchPage(url, fetcher);
    const calendar = parseCalendarProps(page, teamId);
    validateSeasonHref(calendar.allHref, teamId, season);
    const competitionLabels = new Map<number, string>();
    for (const tab of calendar.tabs) {
      if (!isRecord(tab) || !Number.isInteger(tab.cp_no) || typeof tab.label !== 'string' || tab.label.trim() === '') {
        throw new Error('TheFootData competition tabs changed format');
      }
      competitionLabels.set(tab.cp_no as number, tab.label.trim());
    }
    return calendar.matches.map((source) => {
      const label = competitionLabels.get(source.competition_edition_id);
      if (!label) throw new Error('TheFootData did not label a match competition');
      return mapPublicMatch(source, teamId, url.toString(), label, season);
    });
  });
  if (perTeam.flat().length > MAX_MATCHES) throw new Error('TheFootData returned too many matches');
  const unique = new Map<string, Match>();
  for (const match of perTeam.flat()) unique.set(match.id, match);
  return { matches: [...unique.values()], teamCount: teamIds.length };
}
