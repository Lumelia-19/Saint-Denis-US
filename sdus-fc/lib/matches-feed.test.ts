import assert from 'node:assert/strict';
import test from 'node:test';
import { currentSeason, isMatchesFeed, loadMatchesFeed, toMatchesFeed, type MatchSnapshot } from './matches-feed.ts';
import type { Match } from './types.ts';

const now = new Date('2026-09-16T13:00:00Z'); // 15:00 Paris
const match: Match = { id: '1', date: '2026-09-16', time: '16:00', homeTeam: { name: 'UF Saint-Denis 1' }, awayTeam: { name: 'Adversaire 1' },
  category: 'Seniors', competition: 'Régional 1', venue: 'Lieu à confirmer', status: 'upcoming' };
const snapshot: MatchSnapshot = { version: 1, season: 2026, fetchedAt: now.toISOString(), teamCount: 1, matches: [match] };

test('kickoff is classified in Paris time; missing scores never become 0–0', () => {
  const feed = toMatchesFeed({ ...snapshot, matches: [match,
    { ...match, id: 'past', time: '14:00' },
    { ...match, id: 'older', date: '2026-09-15' },
    { ...match, id: 'unknown-time', time: '' },
    { ...match, id: 'postponed', status: 'postponed', date: '2026-09-20' },
    { ...match, id: 'cancelled', status: 'cancelled' },
    { ...match, id: 'draw', status: 'finished', homeScore: 0, awayScore: 0 },
  ] }, now);
  assert.deepEqual(feed.upcoming.map((m) => m.id).sort(), ['1', 'unknown-time']);
  assert.equal(feed.results.length, 1);
  assert.equal(feed.results[0].homeScore, 0);
  assert.equal(feed.pending.find((m) => m.id === 'past')?.status, 'pending');
  assert.equal(feed.pending.find((m) => m.id === 'older')?.homeScore, undefined);
  assert.equal(feed.pending.find((m) => m.id === 'cancelled')?.status, 'cancelled');
  assert.equal(feed.pending.find((m) => m.id === 'postponed')?.status, 'postponed');
});

test('source outage returns the dated backup, successful empty calendars stay empty', async () => {
  const unavailable = async () => { throw new Error('HTTP 503'); };
  const fallback = await loadMatchesFeed(unavailable, snapshot, now);
  assert.equal(fallback.state, 'backup');
  assert.equal(fallback.fetchedAt, snapshot.fetchedAt);
  const empty = await loadMatchesFeed(async () => ({ ...snapshot, matches: [] }), snapshot, now);
  assert.equal(empty.state, 'fresh');
  assert.equal(empty.upcoming.length, 0);
  const cold = await loadMatchesFeed(unavailable, null, now);
  assert.equal(cold.state, 'unavailable');
});

test('a previous season backup is not reused after the Paris July rollover', async () => {
  const july = new Date('2027-06-30T22:30:00Z');
  assert.equal(currentSeason(new Date('2027-06-30T21:30:00Z')), 2026);
  assert.equal(currentSeason(july), 2027);
  const feed = await loadMatchesFeed(async () => { throw new Error('offline'); }, snapshot, july);
  assert.equal(feed.state, 'unavailable');
  assert.equal(feed.upcoming.length, 0);
});

test('cached data keeps its original fetchedAt and never gets falsely marked fresh', () => {
  const feed = toMatchesFeed(snapshot, new Date('2026-09-17T13:00:00Z'));
  assert.equal(feed.state, 'cached');
  assert.equal(feed.fetchedAt, snapshot.fetchedAt);
  assert.equal(feed.upcoming.length, 0);
  assert.equal(feed.pending.length, 1);
});

test('old demo cache, corrupted teams/scores and arbitrary source URLs are rejected', () => {
  const feed = toMatchesFeed(snapshot, now);
  assert.equal(isMatchesFeed(feed), true);
  assert.equal(isMatchesFeed({ data: { upcoming: [match], results: [] }, timestamp: Date.now() }), false);
  assert.equal(isMatchesFeed({ ...feed, sourceUrl: 'https://other.example' }), false);
  assert.equal(isMatchesFeed({ ...feed, upcoming: [{ ...match, sourceUrl: 3 }] }), false);
  assert.equal(isMatchesFeed({ ...feed, results: [{ ...match, status: 'finished', homeScore: null, awayScore: null }] }), false);
  assert.equal(isMatchesFeed({ ...feed, upcoming: [{ ...match, homeTeam: null }] }), false);
});
