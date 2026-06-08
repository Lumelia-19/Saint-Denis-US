import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez le Saint-Denis U.S. Football Club : inscriptions, détections, stages, partenariats. Stade Marville, Saint-Denis (93).',
  keywords: ['contact', 'SDUS FC 93', 'Saint-Denis', 'inscription football', 'Stade Marville'],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | SDUS FC 93',
    description: 'Une question ? Le Saint-Denis U.S. Football Club vous répond rapidement.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
