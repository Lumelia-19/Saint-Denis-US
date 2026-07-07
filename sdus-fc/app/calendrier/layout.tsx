import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendrier & Résultats',
  description:
    'Tous les matchs et résultats du United Football Saint-Denis, toutes catégories confondues. Suivez le calendrier de la saison 2025/2026 du UFSD.',
  keywords: ['calendrier', 'résultats', 'matchs', 'saison 2025 2026', 'UFSD', 'Saint-Denis', 'football'],
  alternates: { canonical: '/calendrier' },
  openGraph: {
    title: 'Calendrier & Résultats | UFSD',
    description: 'Matchs et résultats de toutes les équipes du United Football Saint-Denis.',
    url: '/calendrier',
    type: 'website',
  },
};

export default function CalendrierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
