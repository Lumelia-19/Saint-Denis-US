import type { Match } from './types';

export const MATCHES_SOURCE_URL = 'https://thefootdata.com/clubs/united-football-saint-denis';
export const MATCHES_REFRESH_SECONDS = 60 * 60;

export interface MatchSnapshot {
  version: 1;
  season: number;
  fetchedAt: string;
  teamCount: number;
  matches: Match[];
}

export interface MatchesFeed {
  upcoming: Match[];
  results: Match[];
  pending: Match[];
  state: 'fresh' | 'cached' | 'backup' | 'unavailable';
  fetchedAt: string | null;
  season: number;
  teamCount: number;
  sourceUrl: string;
}

export function parisDate(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

export function currentSeason(now = new Date()): number {
  const [year, month] = parisDate(now).split('-').map(Number);
  return month >= 7 ? year : year - 1;
}

export function toMatchesFeed(snapshot: MatchSnapshot | null, now = new Date(), backup = false): MatchesFeed {
  const season = currentSeason(now);
  const feed: MatchesFeed = {
    upcoming: [], results: [], pending: [], state: 'unavailable', fetchedAt: null,
    season, teamCount: 0, sourceUrl: MATCHES_SOURCE_URL,
  };
  if (!snapshot || snapshot.season !== season) return feed;
  const today = parisDate(now);
  const localTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(now);
  feed.fetchedAt = snapshot.fetchedAt;
  feed.teamCount = snapshot.teamCount;
  feed.state = backup ? 'backup' : now.getTime() - Date.parse(snapshot.fetchedAt) > MATCHES_REFRESH_SECONDS * 1000 ? 'cached' : 'fresh';
  for (const match of snapshot.matches) {
    if (match.status === 'finished' && Number.isInteger(match.homeScore) && Number.isInteger(match.awayScore)) {
      feed.results.push(match);
    } else if (match.status === 'upcoming' && (match.date > today || (match.date === today && (!match.time || match.time >= localTime)))) {
      feed.upcoming.push(match);
    } else {
      // A fixture with no published score is never a made-up result.
      feed.pending.push(match.status === 'upcoming' || match.status === 'finished' ? { ...match, status: 'pending' } : match);
    }
  }
  const byDate = (a: Match, b: Match) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
  feed.upcoming.sort(byDate);
  feed.results.sort((a, b) => byDate(b, a));
  feed.pending.sort((a, b) => byDate(b, a));
  return feed;
}

export async function loadMatchesFeed(load: (season: number) => Promise<MatchSnapshot>, backup: MatchSnapshot | null, now = new Date()): Promise<MatchesFeed> {
  try {
    return toMatchesFeed(await load(currentSeason(now)), now);
  } catch {
    return toMatchesFeed(backup, now, true);
  }
}

/** Reject obsolete mock caches and malformed/off-origin persisted feeds. */
export function isMatchesFeed(value: unknown): value is MatchesFeed {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  if (v.sourceUrl !== MATCHES_SOURCE_URL || !Number.isInteger(v.season) || !Number.isInteger(v.teamCount)) return false;
  if (!['fresh', 'cached', 'backup', 'unavailable'].includes(String(v.state))) return false;
  if (v.fetchedAt !== null && (typeof v.fetchedAt !== 'string' || !Number.isFinite(Date.parse(v.fetchedAt)))) return false;
  return ['upcoming', 'results', 'pending'].every((key) => Array.isArray(v[key]) && v[key].length <= 2000 && v[key].every((m: unknown) => {
    if (!m || typeof m !== 'object') return false;
    const match = m as Match;
    return typeof match.id === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(match.date)
      && typeof match.time === 'string' && typeof match.venue === 'string'
      && typeof match.competition === 'string' && typeof match.homeTeam?.name === 'string' && typeof match.awayTeam?.name === 'string'
      && ['U6-U9', 'U10-U13', 'U14-U17', 'U18-Seniors', 'Seniors', 'Vétérans'].includes(match.category)
      && ['upcoming', 'live', 'finished', 'pending', 'postponed', 'cancelled'].includes(match.status)
      && (match.status !== 'finished' || (Number.isInteger(match.homeScore) && Number.isInteger(match.awayScore) && match.homeScore! >= 0 && match.awayScore! >= 0))
      && (match.sourceUrl === undefined || (typeof match.sourceUrl === 'string' && match.sourceUrl.startsWith(`${MATCHES_SOURCE_URL}?`)));
  }));
}
