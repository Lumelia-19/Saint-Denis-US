import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez l'UFSD : inscriptions, détections, stages, partenariats. Stade Marville, Saint-Denis (93).",
  keywords: ['contact', 'United Football Saint-Denis', 'Saint-Denis', 'inscription football', 'Stade Marville'],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | United Football Saint-Denis',
    description: "Une question ? L'UFSD vous répond rapidement.",
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
