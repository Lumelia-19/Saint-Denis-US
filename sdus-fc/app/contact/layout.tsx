import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez le United Football Saint-Denis : inscriptions, détections, stages, partenariats. Stade Marville, Saint-Denis (93).',
  keywords: ['contact', 'UFSD', 'Saint-Denis', 'inscription football', 'Stade Marville'],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | UFSD',
    description: 'Une question ? Le United Football Saint-Denis vous répond rapidement.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
