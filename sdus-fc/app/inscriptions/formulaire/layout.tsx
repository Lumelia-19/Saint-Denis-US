import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inscription en ligne | UFSD',
  description:
    "Formulaire d'inscription en ligne à l'United Football Saint-Denis (UFSD) pour la saison 2026/2027 : joueur, catégorie, coordonnées parent/tuteur.",
  alternates: { canonical: '/inscriptions/formulaire' },
  openGraph: {
    title: 'Inscription en ligne | UFSD',
    description: "Inscrivez votre joueur à l'UFSD pour la saison 2026/2027.",
    url: '/inscriptions/formulaire',
    type: 'website',
  },
};

export default function InscriptionFormulaireLayout({ children }: { children: React.ReactNode }) {
  return children;
}