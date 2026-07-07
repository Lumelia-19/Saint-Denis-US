// ============================================
// UFSD - Type Definitions
// ============================================

export type MatchCategory = 'U6-U9' | 'U10-U13' | 'U14-U17' | 'U18-Seniors' | 'Seniors';
export type MatchStatus = 'upcoming' | 'live' | 'finished';
export type APIProvider = 'mock' | 'fff' | 'footclubs' | 'sporteasy' | 'custom';

export interface Team {
  name: string;
  logo?: string;
  shortName?: string;
  city?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;        // Format ISO: YYYY-MM-DD
  time: string;        // Format HH:mm
  venue: string;
  category: MatchCategory;
  competition: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  matchDay?: number;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  number: number;
  position: 'Gardien' | 'Défenseur' | 'Milieu' | 'Attaquant';
  category: MatchCategory;
  photo?: string;
  birthYear?: number;
  stats: PlayerStats;
}

export interface PlayerStats {
  matches: number;
  goals: number;
  assists: number;
  rating: number;      // Sur 10
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image?: string;
  date: string;        // Format ISO: YYYY-MM-DD
  category: string;
  author?: string;
}

export interface APIConfig {
  provider: APIProvider;
  baseUrl: string;
  apiKey: string;
  clubId: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValueCard {
  icon: string;
  title: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: string;
}
