import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendrier & Résultats',
  description:
    "Tous les matchs et résultats de l'UFSD, toutes catégories confondues. Suivez le calendrier de la saison 2025/2026 de l'United Football Saint-Denis.",
  keywords: ['calendrier', 'résultats', 'matchs', 'saison 2025 2026', 'United Football Saint-Denis', 'Saint-Denis', 'football'],
  alternates: { canonical: '/calendrier' },
  openGraph: {
    title: 'Calendrier & Résultats | United Football Saint-Denis',
    description: "Matchs et résultats de toutes les équipes de l'UFSD.",
    url: '/calendrier',
    type: 'website',
  },
};

export default function CalendrierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
