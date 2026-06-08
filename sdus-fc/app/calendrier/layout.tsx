import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendrier & Résultats',
  description:
    'Tous les matchs et résultats du Saint-Denis U.S. Football Club, toutes catégories confondues. Suivez le calendrier de la saison 2025/2026 du SDUS FC 93.',
  keywords: ['calendrier', 'résultats', 'matchs', 'saison 2025 2026', 'SDUS FC 93', 'Saint-Denis', 'football'],
  alternates: { canonical: '/calendrier' },
  openGraph: {
    title: 'Calendrier & Résultats | SDUS FC 93',
    description: 'Matchs et résultats de toutes les équipes du Saint-Denis U.S. Football Club.',
    url: '/calendrier',
    type: 'website',
  },
};

export default function CalendrierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
