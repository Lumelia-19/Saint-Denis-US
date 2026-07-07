// ============================================
// United Football Saint-Denis (UFSD) - Matches API Adapter
// ============================================
// Ce fichier gère la récupération des données de matchs.
// Par défaut, il utilise des données mock (saison 2026/2027).
// Quand l'API est disponible, modifier API_CONFIG.provider
// et implémenter le parser correspondant.
// ============================================

import { Match, APIConfig, MatchCategory } from './types';

const HOME = { name: 'United Football Saint-Denis', shortName: 'UFSD', logo: '/assets/logo.png' };

// Configuration de l'API - à remplir quand disponible
const API_CONFIG: APIConfig = {
  provider: 'mock' as const,
  baseUrl: process.env.NEXT_PUBLIC_MATCHES_API_URL || '',
  apiKey: process.env.NEXT_PUBLIC_MATCHES_API_KEY || '',
  clubId: process.env.NEXT_PUBLIC_CLUB_ID || 'UFSD93',
};

// ============================================
// MOCK DATA - Matchs à venir (Saison 2026/2027)
// ============================================
const MOCK_UPCOMING_MATCHES: Match[] = [
  {
    id: 'match-001',
    homeTeam: HOME,
    awayTeam: { name: 'AS Bondy', shortName: 'ASB', city: 'Bondy' },
    date: '2026-09-13',
    time: '15:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'Seniors',
    competition: 'Championnat District',
    status: 'upcoming',
    matchDay: 2,
  },
  {
    id: 'match-002',
    homeTeam: { name: 'FC Aubervilliers', shortName: 'FCA', city: 'Aubervilliers' },
    awayTeam: HOME,
    date: '2026-09-19',
    time: '14:00',
    venue: 'Stade André Karman, Aubervilliers',
    category: 'U14-U17',
    competition: 'Championnat District U17',
    status: 'upcoming',
    matchDay: 3,
  },
  {
    id: 'match-003',
    homeTeam: HOME,
    awayTeam: { name: 'US Villetaneuse', shortName: 'USV', city: 'Villetaneuse' },
    date: '2026-09-27',
    time: '10:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'U10-U13',
    competition: 'Plateau U13',
    status: 'upcoming',
    matchDay: 4,
  },
  {
    id: 'match-004',
    homeTeam: { name: 'Drancy JA', shortName: 'DJA', city: 'Drancy' },
    awayTeam: HOME,
    date: '2026-10-11',
    time: '16:00',
    venue: 'Parc des Sports Guy Môquet, Drancy',
    category: 'Seniors',
    competition: 'Coupe de Paris',
    status: 'upcoming',
    matchDay: 1,
  },
  {
    id: 'match-005',
    homeTeam: HOME,
    awayTeam: { name: 'La Courneuve Sports', shortName: 'LCS', city: 'La Courneuve' },
    date: '2026-10-18',
    time: '15:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'U18-Seniors',
    competition: 'Championnat U18',
    status: 'upcoming',
    matchDay: 5,
  },
  {
    id: 'match-006',
    homeTeam: HOME,
    awayTeam: { name: 'Épinay-sur-Seine FC', shortName: 'ESF', city: 'Épinay-sur-Seine' },
    date: '2026-11-08',
    time: '10:30',
    venue: 'Stade Marville, Saint-Denis',
    category: 'U6-U9',
    competition: 'Plateau U9',
    status: 'upcoming',
    matchDay: 6,
  },
];

// ============================================
// MOCK DATA - Résultats récents (fin de saison 2025/2026)
// ============================================
const MOCK_RECENT_RESULTS: Match[] = [
  {
    id: 'result-001',
    homeTeam: HOME,
    awayTeam: { name: 'Pierrefitte AC', shortName: 'PAC', city: 'Pierrefitte' },
    date: '2026-06-13',
    time: '15:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'Seniors',
    competition: 'Championnat District',
    status: 'finished',
    homeScore: 3,
    awayScore: 1,
    matchDay: 22,
  },
  {
    id: 'result-002',
    homeTeam: { name: 'Stains FC', shortName: 'SFC', city: 'Stains' },
    awayTeam: HOME,
    date: '2026-06-06',
    time: '14:00',
    venue: 'Stade Le Moulin Neuf, Stains',
    category: 'U14-U17',
    competition: 'Championnat District U15',
    status: 'finished',
    homeScore: 0,
    awayScore: 2,
    matchDay: 20,
  },
  {
    id: 'result-003',
    homeTeam: HOME,
    awayTeam: { name: 'US Dugny', shortName: 'USD', city: 'Dugny' },
    date: '2026-05-30',
    time: '15:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'Seniors',
    competition: 'Championnat District',
    status: 'finished',
    homeScore: 2,
    awayScore: 2,
    matchDay: 21,
  },
  {
    id: 'result-004',
    homeTeam: { name: 'AS Villetaneuse', shortName: 'ASV', city: 'Villetaneuse' },
    awayTeam: HOME,
    date: '2026-05-23',
    time: '10:00',
    venue: 'Stade Jesse Owens, Villetaneuse',
    category: 'U10-U13',
    competition: 'Plateau U13',
    status: 'finished',
    homeScore: 1,
    awayScore: 4,
    matchDay: 18,
  },
];

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Récupère tous les matchs (à venir + résultats)
 * Adapte automatiquement selon le provider configuré
 */
export async function fetchMatches(): Promise<{
  upcoming: Match[];
  results: Match[];
}> {
  switch (API_CONFIG.provider) {
    case 'mock':
      return fetchMockMatches();

    case 'fff':
      // TODO: Implémenter l'intégration API FFF
      console.warn('[UFSD API] Provider FFF non implémenté, fallback mock');
      return fetchMockMatches();

    case 'footclubs':
      // TODO: Implémenter l'intégration Footclubs
      console.warn('[UFSD API] Provider Footclubs non implémenté, fallback mock');
      return fetchMockMatches();

    case 'sporteasy':
      // TODO: Implémenter l'intégration SportEasy
      console.warn('[UFSD API] Provider SportEasy non implémenté, fallback mock');
      return fetchMockMatches();

    case 'custom':
      // TODO: Implémenter votre API custom
      console.warn('[UFSD API] Provider custom non implémenté, fallback mock');
      return fetchMockMatches();

    default:
      return fetchMockMatches();
  }
}

/**
 * Retourne les données mock
 */
function fetchMockMatches(): Promise<{ upcoming: Match[]; results: Match[] }> {
  return Promise.resolve({
    upcoming: MOCK_UPCOMING_MATCHES,
    results: MOCK_RECENT_RESULTS,
  });
}

/**
 * Filtre les matchs par catégorie
 */
export function filterMatchesByCategory(
  matches: Match[],
  category: MatchCategory | 'Tous'
): Match[] {
  if (category === 'Tous') return matches;
  return matches.filter((m) => m.category === category);
}

/**
 * Formatte une date ISO en français
 */
export function formatMatchDate(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('fr-FR', options);
}

/**
 * Retourne la couleur CSS du badge par catégorie
 */
export function getCategoryColor(category: MatchCategory): string {
  const colors: Record<MatchCategory, string> = {
    'U6-U9': '#1B3A8C',
    'U10-U13': '#2D52C4',
    'U14-U17': '#1B3A8C',
    'U18-Seniors': '#F26522',
    'Seniors': '#F26522',
  };
  return colors[category] || '#1B3A8C';
}
