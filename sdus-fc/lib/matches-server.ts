import 'server-only';
import { unstable_cache } from 'next/cache';
import { fetchPublicMatches } from './matches-source';
import { loadMatchesFeed, MATCHES_REFRESH_SECONDS, type MatchSnapshot } from './matches-feed';
import backup from './matches-snapshot.json';

// Cache only validated complete refreshes. A failed refresh keeps the previous snapshot.
const readSnapshot = unstable_cache(async (season: number): Promise<MatchSnapshot> => {
  const data = await fetchPublicMatches(season);
  return { version: 1, season, fetchedAt: new Date().toISOString(), ...data };
}, ['ufsd-matches-thefootdata-v2'], { revalidate: MATCHES_REFRESH_SECONDS });

export async function getMatches() {
  return loadMatchesFeed(readSnapshot, backup as MatchSnapshot);
}
