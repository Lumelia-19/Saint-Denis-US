import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { discoverCurrentTeamIds, fetchPublicMatches, mapPublicMatch, parseCalendarProps, validateClubIdentity } from './matches-source.ts';

const fixture = readFileSync(new URL('../tests/fixtures/matches-source-mini.html', import.meta.url), 'utf8');

test('parses public Flight data and discovers only teams for the requested season', () => {
  assert.deepEqual(discoverCurrentTeamIds(fixture, 2026), ['8838-U17-1', '8838-U19-1']);
  assert.equal(parseCalendarProps(fixture, '8838-U19-1').matches.length, 1);
  assert.throws(() => validateClubIdentity(fixture));
});

test('concatenates split Flight chunks before reading calendar JSON', () => {
  const calendar = JSON.stringify(parseCalendarProps(fixture));
  const cut = calendar.indexOf('"matches"') + 6;
  const html = `<script>self.__next_f.push([1,${JSON.stringify(`x ${calendar.slice(0, cut)}`)}])</script>` +
    `<script>self.__next_f.push([1,${JSON.stringify(calendar.slice(cut))}])</script>`;
  assert.equal(parseCalendarProps(html, '8838-U19-1').teamId, '8838-U19-1');
});

test('maps an unscored scheduled match as upcoming without consulting the clock', () => {
  const source = { ...parseCalendarProps(fixture).matches[0], status: 'a_jouer', kickoff_local_date: '2020-01-01', kickoff_at: '2020-01-01 18:00:00', home_score: null, away_score: null };
  assert.equal(mapPublicMatch(source, '8838-U19-1', 'x').status, 'upcoming');
});

test('deduplicates public match ids returned by two current teams', async () => {
  const identified = fixture.replace('2f:', '523415 United Football Saint-Denis 2f:').replace('\\"tabs\\":[]', '\\"tabs\\":[{\\"cp_no\\":42,\\"label\\":\\"U18 D1\\"}]');
  const fetcher = async (url: string) => {
    const page = url.includes('equipe=8838-U17-1') ? identified.replaceAll('8838-U19-1', '8838-U17-1') : identified;
    return new Response(page, { status: 200 });
  };
  const result = await fetchPublicMatches(2026, fetcher as typeof fetch);
  assert.equal(result.teamCount, 2);
  assert.equal(result.matches.length, 1);
});

test('fails the whole refresh when one team page fails', async () => {
  const identified = fixture.replace('2f:', '523415 United Football Saint-Denis 2f:').replace('\\"tabs\\":[]', '\\"tabs\\":[{\\"cp_no\\":42,\\"label\\":\\"U18 D1\\"}]');
  const fetcher = async (url: string) => new Response(url.includes('equipe=8838-U17-1') ? 'nope' : identified, { status: url.includes('equipe=8838-U17-1') ? 500 : 200 });
  await assert.rejects(fetchPublicMatches(2026, fetcher as typeof fetch));
});

test('preserves a finished 0-0 score and maps competition, age and UFSD team number', () => {
  const source = parseCalendarProps(fixture, '8838-U19-1').matches[0];
  const match = mapPublicMatch(source, '8838-U19-1', 'https://thefootdata.com/example', 'U18 D1', 2026);
  assert.equal(match.status, 'finished');
  assert.equal(match.homeScore, 0);
  assert.equal(match.awayScore, 0);
  assert.equal(match.homePenaltyScore, 4);
  assert.equal(match.homeTeam.shortName, 'UFSD');
  assert.equal(match.homeTeam.name, 'UF Saint-Denis — Équipe 1');
  assert.equal(match.competition, 'U18 D1');
  assert.equal(match.teamLabel, 'U18 — Équipe 1');
  assert.equal(match.venue, 'Lieu à confirmer');
  assert.equal(mapPublicMatch({ ...source, home_team_id: '8838-FA-2' }, '8838-FA-2', 'x', 'U11 Elite', 2026).category, 'U10-U13');
  assert.equal(match.time, ''); // The public view does not confirm the timestamp's timezone.
  assert.throws(() => mapPublicMatch(source, '8838-U19-2', 'x', 'U18 D1', 2026));
});

test('maps reports and unknown opponents, but rejects unknown statuses and dates outside the season', () => {
  const source = parseCalendarProps(fixture).matches[0];
  assert.equal(mapPublicMatch({ ...source, status: 'reporte', home_score: null, away_score: null }, '8838-U19-1', 'x').status, 'postponed');
  assert.equal(mapPublicMatch({ ...source, status: 'termine', home_score: null, away_score: null }, '8838-U19-1', 'x').status, 'pending');
  assert.equal(mapPublicMatch({ ...source, away_club_id: null, away_team_id: null, away_short_name: null, home_score: null, away_score: null, status: 'a_jouer' }, '8838-U19-1', 'x').awayTeam.name, 'Adversaire à désigner');
  assert.throws(() => mapPublicMatch({ ...source, status: 'live' }, '8838-U19-1', 'x'));
  assert.throws(() => mapPublicMatch({ ...source, kickoff_local_date: '2025-07-31' }, '8838-U19-1', 'x', 'U18 D1', 2026));
  assert.throws(() => mapPublicMatch({ ...source, kickoff_at: '2026-10-03 25:00:00' }, '8838-U19-1', 'x'));
});

test('fails closed for absent calendar data and a match from another club', () => {
  assert.throws(() => parseCalendarProps('<html></html>'));
  assert.throws(() => mapPublicMatch({ ...parseCalendarProps(fixture).matches[0], home_club_id: 1 }, '8838-U19-1', 'x'));
});
