// ============================================
// SDUS FC 93 - Matches API Adapter
// ============================================
// Ce fichier gère la récupération des données de matchs.
// Par défaut, il utilise des données mock.
// Quand l'API est disponible, modifier API_CONFIG.provider
// et implémenter le parser correspondant.
// ============================================

import { Match, APIConfig, MatchCategory } from './types';

// Configuration de l'API - à remplir quand disponible
const API_CONFIG: APIConfig = {
  provider: 'mock' as const,
  baseUrl: process.env.NEXT_PUBLIC_MATCHES_API_URL || '',
  apiKey: process.env.NEXT_PUBLIC_MATCHES_API_KEY || '',
  clubId: 'SDUS93',
};

// ============================================
// MOCK DATA - Matchs à venir (Saison 2025/2026)
// ============================================
const MOCK_UPCOMING_MATCHES: Match[] = [
  {
    id: 'match-001',
    homeTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    awayTeam: { name: 'AS Bondy', shortName: 'ASB', city: 'Bondy' },
    date: '2025-09-14',
    time: '15:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'Seniors',
    competition: 'Championnat District',
    status: 'upcoming',
    matchDay: 3,
  },
  {
    id: 'match-002',
    homeTeam: { name: 'FC Aubervilliers', shortName: 'FCA', city: 'Aubervilliers' },
    awayTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    date: '2025-09-20',
    time: '14:00',
    venue: 'Stade André Karman',
    category: 'U14-U17',
    competition: 'Championnat District U17',
    status: 'upcoming',
    matchDay: 4,
  },
  {
    id: 'match-003',
    homeTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    awayTeam: { name: 'US Villetaneuse', shortName: 'USV', city: 'Villetaneuse' },
    date: '2025-09-21',
    time: '10:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'U10-U13',
    competition: 'Plateau U11',
    status: 'upcoming',
    matchDay: 5,
  },
  {
    id: 'match-004',
    homeTeam: { name: 'Stade Français', shortName: 'SF', city: 'Paris' },
    awayTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    date: '2025-09-27',
    time: '16:00',
    venue: 'Stade Jean Bouin, Paris',
    category: 'Seniors',
    competition: 'Coupe de Paris',
    status: 'upcoming',
    matchDay: 1,
  },
  {
    id: 'match-005',
    homeTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    awayTeam: { name: 'Drancy JA', shortName: 'DJA', city: 'Drancy' },
    date: '2025-10-04',
    time: '15:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'U18-Seniors',
    competition: 'Championnat U18',
    status: 'upcoming',
    matchDay: 5,
  },
  {
    id: 'match-006',
    homeTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    awayTeam: { name: 'Épinay-sur-Seine', shortName: 'ESS', city: 'Épinay' },
    date: '2025-10-11',
    time: '10:30',
    venue: 'Stade Marville, Saint-Denis',
    category: 'U6-U9',
    competition: 'Plateau U8',
    status: 'upcoming',
    matchDay: 6,
  },
];

// ============================================
// MOCK DATA - Résultats récents
// ============================================
const MOCK_RECENT_RESULTS: Match[] = [
  {
    id: 'result-001',
    homeTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    awayTeam: { name: 'Pierrefitte AC', shortName: 'PAC', city: 'Pierrefitte' },
    date: '2025-09-07',
    time: '15:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'Seniors',
    competition: 'Championnat District',
    status: 'finished',
    homeScore: 3,
    awayScore: 1,
    matchDay: 2,
  },
  {
    id: 'result-002',
    homeTeam: { name: 'La Courneuve Sports', shortName: 'LCS', city: 'La Courneuve' },
    awayTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    date: '2025-09-06',
    time: '14:00',
    venue: 'Stade Géo André',
    category: 'U14-U17',
    competition: 'Championnat District U15',
    status: 'finished',
    homeScore: 0,
    awayScore: 2,
    matchDay: 2,
  },
  {
    id: 'result-003',
    homeTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    awayTeam: { name: 'Stains FC', shortName: 'SFC', city: 'Stains' },
    date: '2025-08-31',
    time: '15:00',
    venue: 'Stade Marville, Saint-Denis',
    category: 'Seniors',
    competition: 'Championnat District',
    status: 'finished',
    homeScore: 2,
    awayScore: 2,
    matchDay: 1,
  },
  {
    id: 'result-004',
    homeTeam: { name: 'US Dugny', shortName: 'USD', city: 'Dugny' },
    awayTeam: { name: 'SDUS FC 93', shortName: 'SDUS', logo: '/assets/logo.png' },
    date: '2025-08-30',
    time: '10:00',
    venue: 'Stade de Dugny',
    category: 'U10-U13',
    competition: 'Plateau U13',
    status: 'finished',
    homeScore: 1,
    awayScore: 4,
    matchDay: 1,
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
      // Documentation : https://www.fff.fr/api
      // 1. Authentification avec API key
      // 2. GET /api/clubs/{clubId}/matches
      // 3. Parser la réponse FFF vers notre type Match
      console.warn('[SDUS API] Provider FFF non implémenté, fallback mock');
      return fetchMockMatches();

    case 'footclubs':
      // TODO: Implémenter l'intégration Footclubs
      // 1. Login via POST /api/auth
      // 2. GET /api/clubs/{clubId}/calendar
      // 3. Mapper les champs Footclubs vers Match
      console.warn('[SDUS API] Provider Footclubs non implémenté, fallback mock');
      return fetchMockMatches();

    case 'sporteasy':
      // TODO: Implémenter l'intégration SportEasy
      // 1. OAuth2 flow avec SportEasy
      // 2. GET /api/v2/teams/{teamId}/events
      // 3. Filtrer type === 'match' et mapper
      console.warn('[SDUS API] Provider SportEasy non implémenté, fallback mock');
      return fetchMockMatches();

    case 'custom':
      // TODO: Implémenter votre API custom
      // const response = await fetch(`${API_CONFIG.baseUrl}/matches`, {
      //   headers: { 'Authorization': `Bearer ${API_CONFIG.apiKey}` }
      // });
      // const data = await response.json();
      // return parseCustomAPIResponse(data);
      console.warn('[SDUS API] Provider custom non implémenté, fallback mock');
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
