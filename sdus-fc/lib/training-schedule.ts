export type TrainingDay = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi';

export interface TrainingSession {
  day: TrainingDay;
  start: string;
  end: string;
  pitch: string;
  note?: string;
}

export interface TrainingCategory {
  name: string;
  sessions: TrainingSession[];
}

export interface TrainingGroup {
  name: string;
  categories: TrainingCategory[];
}

export const TRAINING_DAYS: TrainingDay[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

export const TRAINING_DAY_LABELS: Record<TrainingDay, string> = {
  Lundi: 'Lun',
  Mardi: 'Mar',
  Mercredi: 'Mer',
  Jeudi: 'Jeu',
  Vendredi: 'Ven',
};

export const TRAINING_SCHEDULE: TrainingGroup[] = [
  {
    name: 'École de foot',
    categories: [
      { name: 'U6 · U7 · U8', sessions: [{ day: 'Mercredi', start: '13:00', end: '14:30', pitch: 'T2' }] },
      { name: 'U9', sessions: [{ day: 'Lundi', start: '17:00', end: '18:45', pitch: 'T3' }, { day: 'Mercredi', start: '13:00', end: '14:30', pitch: 'T3' }] },
      { name: 'U9 · U10', sessions: [{ day: 'Lundi', start: '17:00', end: '18:45', pitch: 'T2' }] },
      { name: 'U10', sessions: [{ day: 'Mercredi', start: '14:30', end: '16:00', pitch: 'T3' }] },
      { name: 'U11', sessions: [{ day: 'Mercredi', start: '14:30', end: '16:00', pitch: 'T2' }] },
      { name: 'U11 · U12', sessions: [{ day: 'Mardi', start: '18:00', end: '20:00', pitch: 'T4' }] },
      { name: 'U12', sessions: [{ day: 'Mercredi', start: '16:00', end: '17:30', pitch: 'T2' }] },
      { name: 'U13', sessions: [{ day: 'Mercredi', start: '15:30', end: '17:00', pitch: 'T4' }] },
      { name: 'U13A', sessions: [{ day: 'Lundi', start: '18:45', end: '20:15', pitch: 'T3' }] },
    ],
  },
  {
    name: 'Jeunes',
    categories: [
      { name: 'U14A · U14B', sessions: [{ day: 'Lundi', start: '18:45', end: '20:15', pitch: 'T2' }, { day: 'Jeudi', start: '18:45', end: '20:15', pitch: 'T2' }] },
      { name: 'U14A · U15', sessions: [{ day: 'Mercredi', start: '17:30', end: '19:00', pitch: 'T2' }] },
      { name: 'U14C', sessions: [{ day: 'Mercredi', start: '17:00', end: '18:30', pitch: 'T4' }, { day: 'Vendredi', start: '18:45', end: '20:15', pitch: 'T3' }] },
      { name: 'U15', sessions: [{ day: 'Lundi', start: '18:45', end: '20:15', pitch: 'T3', note: 'avec les U13A' }, { day: 'Jeudi', start: '18:45', end: '20:15', pitch: 'T3', note: 'avec les U13A' }] },
      { name: 'U16', sessions: [{ day: 'Lundi', start: '18:45', end: '20:15', pitch: 'T4' }, { day: 'Mercredi', start: '18:45', end: '20:15', pitch: 'T4' }, { day: 'Jeudi', start: '20:15', end: '22:00', pitch: 'Honneur rugby' }] },
      { name: 'U17 · U18 groupe A', sessions: [{ day: 'Lundi', start: '20:15', end: '22:00', pitch: 'T3', note: 'avec le groupe B' }, { day: 'Mercredi', start: '20:15', end: '22:00', pitch: 'T4' }, { day: 'Vendredi', start: '20:15', end: '22:00', pitch: 'T4' }] },
      { name: 'U17 · U18 groupe B', sessions: [{ day: 'Lundi', start: '20:15', end: '22:00', pitch: 'T3', note: 'avec le groupe A' }, { day: 'Mercredi', start: '21:00', end: '22:00', pitch: 'T2' }, { day: 'Vendredi', start: '21:00', end: '22:00', pitch: 'T2' }] },
    ],
  },
  {
    name: 'Élite, Espoir et gardiens',
    categories: [
      { name: 'Élite U9 · U10', sessions: [{ day: 'Jeudi', start: '17:00', end: '18:45', pitch: 'T2' }] },
      { name: 'Élite U11 · U12', sessions: [{ day: 'Jeudi', start: '18:00', end: '20:00', pitch: 'T4' }] },
      { name: 'Espoir U10', sessions: [{ day: 'Vendredi', start: '17:00', end: '18:45', pitch: 'T3' }] },
      { name: 'Espoir U11', sessions: [{ day: 'Vendredi', start: '17:00', end: '18:45', pitch: 'T4' }] },
      { name: 'Espoir U12', sessions: [{ day: 'Vendredi', start: '17:00', end: '18:45', pitch: 'T2' }] },
      { name: 'Espoir U13', sessions: [{ day: 'Vendredi', start: '18:45', end: '20:15', pitch: 'T4' }] },
      { name: 'Gardiens U10 à U13', sessions: [{ day: 'Jeudi', start: '17:00', end: '18:45', pitch: 'T3' }] },
      { name: 'Gardiens U14 · U15 · U16', sessions: [{ day: 'Lundi', start: '19:00', end: '20:15', pitch: 'T3' }] },
      { name: 'Gardiens U17 · U18', sessions: [{ day: 'Lundi', start: '20:00', end: '22:00', pitch: 'T3' }] },
    ],
  },
  {
    name: 'Seniors',
    categories: [
      { name: 'Seniors R1', sessions: [{ day: 'Mardi', start: '19:00', end: '21:00', pitch: 'T2' }, { day: 'Mercredi', start: '19:00', end: '21:00', pitch: 'T2 + Honneur' }, { day: 'Jeudi', start: '20:15', end: '22:00', pitch: 'Honneur' }, { day: 'Vendredi', start: '19:00', end: '21:00', pitch: 'T2' }] },
      { name: 'Seniors B', sessions: [{ day: 'Jeudi', start: '20:15', end: '22:00', pitch: 'T2' }] },
      { name: 'Vétérans', sessions: [{ day: 'Jeudi', start: '20:15', end: '22:00', pitch: 'T4' }] },
    ],
  },
];

