import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planning, Calendrier & Résultats',
  description:
    'Planning des entraînements, matchs et résultats du United Football Saint-Denis pour la saison 2026/2027. Horaires, terrains et catégories du UFSD.',
  keywords: ['planning entraînements', 'calendrier', 'résultats', 'matchs', 'saison 2026 2027', 'UFSD', 'Saint-Denis', 'football'],
  alternates: { canonical: '/calendrier' },
  openGraph: {
    title: 'Planning, Calendrier & Résultats | UFSD',
    description: 'Horaires d’entraînement, matchs et résultats de toutes les équipes du United Football Saint-Denis.',
    url: '/calendrier',
    type: 'website',
  },
};

export default function CalendrierLayout({ children }: { children: React.ReactNode }) {
  return children;
}

