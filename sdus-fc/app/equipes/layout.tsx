import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Équipes & Formation',
  description:
    "De l'école de foot aux seniors : découvrez les catégories U6-U9, U10-U13, U14-U17 et U18-Seniors du United Football Saint-Denis et son parcours de formation.",
  keywords: ['équipes', 'formation', 'école de foot', 'U6', 'U13', 'U17', 'seniors', 'UFSD', 'Saint-Denis'],
  alternates: { canonical: '/equipes' },
  openGraph: {
    title: 'Équipes & Formation | UFSD',
    description:
      "De l'école de foot aux seniors : les catégories et le parcours de formation du United Football Saint-Denis.",
    url: '/equipes',
    type: 'website',
  },
};

export default function EquipesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
