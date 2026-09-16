import { writeFile } from 'node:fs/promises';
import { fetchPublicMatches } from '../lib/matches-source.ts';
import { currentSeason, type MatchSnapshot } from '../lib/matches-feed.ts';

const season = currentSeason();
const data = await fetchPublicMatches(season);
const snapshot: MatchSnapshot = { version: 1, season, fetchedAt: new Date().toISOString(), ...data };
await writeFile(new URL('../lib/matches-snapshot.json', import.meta.url), `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Saved ${snapshot.matches.length} matches / ${snapshot.teamCount} teams, season ${season}, fetched ${snapshot.fetchedAt}`);
