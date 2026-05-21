// ============================================
// SDUS FC 93 — Players Data
// ============================================

import { Player, MatchCategory } from './types';

// ============================================
// MOCK DATA — Joueurs par catégorie
// ============================================

export const PLAYERS: Player[] = [
  // === SENIORS ===
  {
    id: 'sen-01', firstName: 'Mamadou', lastName: 'Diallo', number: 1,
    position: 'Gardien', category: 'Seniors', birthYear: 2000,
    stats: { matches: 22, goals: 0, assists: 1, rating: 7.2 },
  },
  {
    id: 'sen-02', firstName: 'Youssef', lastName: 'Benali', number: 4,
    position: 'Défenseur', category: 'Seniors', birthYear: 1999,
    stats: { matches: 20, goals: 2, assists: 3, rating: 7.0 },
  },
  {
    id: 'sen-03', firstName: 'Kévin', lastName: 'Moreira', number: 6,
    position: 'Milieu', category: 'Seniors', birthYear: 2001,
    stats: { matches: 24, goals: 5, assists: 8, rating: 7.5 },
  },
  {
    id: 'sen-04', firstName: 'Abdoulaye', lastName: 'Touré', number: 9,
    position: 'Attaquant', category: 'Seniors', birthYear: 2000,
    stats: { matches: 23, goals: 14, assists: 4, rating: 7.8 },
  },
  {
    id: 'sen-05', firstName: 'Lucas', lastName: 'Ferreira', number: 5,
    position: 'Défenseur', category: 'Seniors', birthYear: 1998,
    stats: { matches: 18, goals: 1, assists: 2, rating: 6.9 },
  },
  {
    id: 'sen-06', firstName: 'Ibrahim', lastName: 'Konaté', number: 8,
    position: 'Milieu', category: 'Seniors', birthYear: 2002,
    stats: { matches: 21, goals: 3, assists: 6, rating: 7.3 },
  },
  {
    id: 'sen-07', firstName: 'Théo', lastName: 'Dupont', number: 11,
    position: 'Attaquant', category: 'Seniors', birthYear: 2001,
    stats: { matches: 19, goals: 8, assists: 5, rating: 7.1 },
  },
  {
    id: 'sen-08', firstName: 'Ousmane', lastName: 'Sy', number: 3,
    position: 'Défenseur', category: 'Seniors', birthYear: 2000,
    stats: { matches: 22, goals: 0, assists: 1, rating: 7.0 },
  },

  // === U18-SENIORS ===
  {
    id: 'u18-01', firstName: 'Ryan', lastName: 'Mbappé', number: 1,
    position: 'Gardien', category: 'U18-Seniors', birthYear: 2007,
    stats: { matches: 18, goals: 0, assists: 0, rating: 7.0 },
  },
  {
    id: 'u18-02', firstName: 'Amine', lastName: 'Zidane', number: 2,
    position: 'Défenseur', category: 'U18-Seniors', birthYear: 2007,
    stats: { matches: 16, goals: 1, assists: 3, rating: 6.8 },
  },
  {
    id: 'u18-03', firstName: 'Djibril', lastName: 'Camara', number: 7,
    position: 'Milieu', category: 'U18-Seniors', birthYear: 2008,
    stats: { matches: 20, goals: 6, assists: 7, rating: 7.4 },
  },
  {
    id: 'u18-04', firstName: 'Noah', lastName: 'Lefebvre', number: 9,
    position: 'Attaquant', category: 'U18-Seniors', birthYear: 2007,
    stats: { matches: 19, goals: 11, assists: 3, rating: 7.6 },
  },
  {
    id: 'u18-05', firstName: 'Bilal', lastName: 'Haddad', number: 4,
    position: 'Défenseur', category: 'U18-Seniors', birthYear: 2008,
    stats: { matches: 17, goals: 0, assists: 2, rating: 6.7 },
  },
  {
    id: 'u18-06', firstName: 'Enzo', lastName: 'Da Silva', number: 10,
    position: 'Milieu', category: 'U18-Seniors', birthYear: 2007,
    stats: { matches: 20, goals: 4, assists: 9, rating: 7.5 },
  },
  {
    id: 'u18-07', firstName: 'Mady', lastName: 'Traoré', number: 11,
    position: 'Attaquant', category: 'U18-Seniors', birthYear: 2008,
    stats: { matches: 15, goals: 7, assists: 2, rating: 7.1 },
  },
  {
    id: 'u18-08', firstName: 'Rayan', lastName: 'Boudjemaa', number: 6,
    position: 'Milieu', category: 'U18-Seniors', birthYear: 2007,
    stats: { matches: 18, goals: 2, assists: 5, rating: 7.0 },
  },

  // === U14-U17 ===
  {
    id: 'u14-01', firstName: 'Ismaël', lastName: 'Cissé', number: 1,
    position: 'Gardien', category: 'U14-U17', birthYear: 2010,
    stats: { matches: 15, goals: 0, assists: 0, rating: 6.8 },
  },
  {
    id: 'u14-02', firstName: 'Yanis', lastName: 'Khelifi', number: 3,
    position: 'Défenseur', category: 'U14-U17', birthYear: 2009,
    stats: { matches: 14, goals: 1, assists: 2, rating: 6.9 },
  },
  {
    id: 'u14-03', firstName: 'Tidiane', lastName: 'Ndiaye', number: 8,
    position: 'Milieu', category: 'U14-U17', birthYear: 2010,
    stats: { matches: 16, goals: 4, assists: 5, rating: 7.2 },
  },
  {
    id: 'u14-04', firstName: 'Adam', lastName: 'Bekkouche', number: 9,
    position: 'Attaquant', category: 'U14-U17', birthYear: 2009,
    stats: { matches: 15, goals: 9, assists: 3, rating: 7.4 },
  },
  {
    id: 'u14-05', firstName: 'Samba', lastName: 'Diop', number: 5,
    position: 'Défenseur', category: 'U14-U17', birthYear: 2010,
    stats: { matches: 13, goals: 0, assists: 1, rating: 6.6 },
  },
  {
    id: 'u14-06', firstName: 'Ilyes', lastName: 'Mebarki', number: 6,
    position: 'Milieu', category: 'U14-U17', birthYear: 2009,
    stats: { matches: 16, goals: 2, assists: 4, rating: 7.0 },
  },
  {
    id: 'u14-07', firstName: 'Nathan', lastName: 'Oliveira', number: 11,
    position: 'Attaquant', category: 'U14-U17', birthYear: 2010,
    stats: { matches: 14, goals: 6, assists: 2, rating: 7.1 },
  },
  {
    id: 'u14-08', firstName: 'Moussa', lastName: 'Barry', number: 4,
    position: 'Défenseur', category: 'U14-U17', birthYear: 2009,
    stats: { matches: 15, goals: 1, assists: 0, rating: 6.7 },
  },

  // === U10-U13 ===
  {
    id: 'u10-01', firstName: 'Liam', lastName: 'Dubois', number: 1,
    position: 'Gardien', category: 'U10-U13', birthYear: 2013,
    stats: { matches: 12, goals: 0, assists: 0, rating: 6.5 },
  },
  {
    id: 'u10-02', firstName: 'Amir', lastName: 'El Amri', number: 3,
    position: 'Défenseur', category: 'U10-U13', birthYear: 2012,
    stats: { matches: 14, goals: 1, assists: 2, rating: 6.8 },
  },
  {
    id: 'u10-03', firstName: 'Souleymane', lastName: 'Keïta', number: 7,
    position: 'Milieu', category: 'U10-U13', birthYear: 2013,
    stats: { matches: 15, goals: 5, assists: 6, rating: 7.3 },
  },
  {
    id: 'u10-04', firstName: 'Eliott', lastName: 'Martinez', number: 9,
    position: 'Attaquant', category: 'U10-U13', birthYear: 2012,
    stats: { matches: 14, goals: 10, assists: 2, rating: 7.5 },
  },
  {
    id: 'u10-05', firstName: 'Malik', lastName: 'Sanogo', number: 5,
    position: 'Défenseur', category: 'U10-U13', birthYear: 2013,
    stats: { matches: 12, goals: 0, assists: 1, rating: 6.4 },
  },
  {
    id: 'u10-06', firstName: 'Hugo', lastName: 'Petit', number: 8,
    position: 'Milieu', category: 'U10-U13', birthYear: 2012,
    stats: { matches: 13, goals: 3, assists: 4, rating: 7.0 },
  },
  {
    id: 'u10-07', firstName: 'Yassine', lastName: 'Aït-Ahmed', number: 10,
    position: 'Attaquant', category: 'U10-U13', birthYear: 2013,
    stats: { matches: 15, goals: 8, assists: 3, rating: 7.2 },
  },
  {
    id: 'u10-08', firstName: 'Jules', lastName: 'Bernard', number: 2,
    position: 'Défenseur', category: 'U10-U13', birthYear: 2012,
    stats: { matches: 11, goals: 0, assists: 1, rating: 6.5 },
  },

  // === U6-U9 ===
  {
    id: 'u6-01', firstName: 'Ayoub', lastName: 'Bensalem', number: 1,
    position: 'Gardien', category: 'U6-U9', birthYear: 2017,
    stats: { matches: 8, goals: 0, assists: 0, rating: 6.0 },
  },
  {
    id: 'u6-02', firstName: 'Léo', lastName: 'Niang', number: 3,
    position: 'Défenseur', category: 'U6-U9', birthYear: 2016,
    stats: { matches: 10, goals: 1, assists: 1, rating: 6.2 },
  },
  {
    id: 'u6-03', firstName: 'Kenzo', lastName: 'Yamamoto', number: 7,
    position: 'Milieu', category: 'U6-U9', birthYear: 2017,
    stats: { matches: 10, goals: 3, assists: 4, rating: 6.8 },
  },
  {
    id: 'u6-04', firstName: 'Noa', lastName: 'Traoré', number: 9,
    position: 'Attaquant', category: 'U6-U9', birthYear: 2016,
    stats: { matches: 10, goals: 7, assists: 2, rating: 7.0 },
  },
  {
    id: 'u6-05', firstName: 'Sandro', lastName: 'Rossi', number: 4,
    position: 'Défenseur', category: 'U6-U9', birthYear: 2017,
    stats: { matches: 8, goals: 0, assists: 0, rating: 5.8 },
  },
  {
    id: 'u6-06', firstName: 'Ilyès', lastName: 'Ouali', number: 6,
    position: 'Milieu', category: 'U6-U9', birthYear: 2016,
    stats: { matches: 9, goals: 2, assists: 3, rating: 6.5 },
  },
  {
    id: 'u6-07', firstName: 'Raphaël', lastName: 'Cohen', number: 10,
    position: 'Attaquant', category: 'U6-U9', birthYear: 2017,
    stats: { matches: 10, goals: 5, assists: 1, rating: 6.7 },
  },
  {
    id: 'u6-08', firstName: 'Matéo', lastName: 'Gomez', number: 2,
    position: 'Défenseur', category: 'U6-U9', birthYear: 2016,
    stats: { matches: 9, goals: 0, assists: 1, rating: 6.0 },
  },
];

/**
 * Retourne les joueurs par catégorie
 */
export function getPlayersByCategory(category: MatchCategory | string): Player[] {
  if (category === 'Seniors') {
    return PLAYERS.filter((p) => p.category === 'Seniors');
  }
  return PLAYERS.filter((p) => p.category === category);
}

/**
 * Retourne toutes les catégories disponibles
 */
export function getCategories(): string[] {
  return ['U6-U9', 'U10-U13', 'U14-U17', 'U18-Seniors', 'Seniors'];
}

/**
 * Retourne un joueur par son ID
 */
export function getPlayerById(id: string): Player | undefined {
  return PLAYERS.find((p) => p.id === id);
}
