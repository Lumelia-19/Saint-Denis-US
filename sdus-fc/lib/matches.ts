import type { Match, MatchCategory } from './types';
import { isMatchesFeed, type MatchesFeed } from './matches-feed';

/** Same-origin only: the external source is fetched on the server. */
export async function fetchMatches(signal?: AbortSignal): Promise<MatchesFeed> {
  const response = await fetch('/api/matches', { cache: 'no-store', signal });
  const data: unknown = await response.json();
  if (!response.ok || !isMatchesFeed(data)) throw new Error('Matchs indisponibles');
  return data;
}

export function filterMatchesByCategory(matches: Match[], category: MatchCategory | 'Tous'): Match[] {
  return category === 'Tous' ? matches : matches.filter((m) => m.category === category);
}

export function formatMatchDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString('fr-FR', {
    timeZone: 'Europe/Paris', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function getCategoryColor(category: MatchCategory): string {
  return ['Seniors', 'U18-Seniors', 'Vétérans'].includes(category) ? '#F26522' : '#1B3A8C';
}
