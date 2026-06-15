import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-barlow-condensed',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sdus-fc93.fr'),
  title: {
    default: 'United Football Saint-Denis (UFSD)',
    template: '%s | UFSD',
  },
  description:
    "United Football Saint-Denis (UFSD) : former, accompagner, inspirer. L'excellence au service de la masse, au cœur de Saint-Denis (93).",
  keywords: ['football', 'Saint-Denis', 'UFSD', 'United Football Saint-Denis', 'club de foot', 'Seine-Saint-Denis', '93'],
  openGraph: {
    title: 'United Football Saint-Denis (UFSD)',
    description:
      "Former, accompagner, inspirer : l'excellence au service de la masse, au cœur de Saint-Denis.",
    url: '/',
    siteName: 'United Football Saint-Denis',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/assets/hero_bg.jpeg', width: 1672, height: 941, alt: 'United Football Saint-Denis' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'United Football Saint-Denis (UFSD)',
    description:
      "Former, accompagner, inspirer : l'excellence au service de la masse, au cœur de Saint-Denis.",
    images: ['/assets/hero_bg.jpeg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1b3a8c' },
    { media: '(prefers-color-scheme: dark)', color: '#0b101e' },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'United Football Saint-Denis',
  alternateName: 'UFSD',
  url: 'https://sdus-fc93.fr',
  logo: 'https://sdus-fc93.fr/assets/logo.png',
  foundingDate: '1993',
  sport: 'Football',
  email: 'contact@sdus-fc93.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Stade Marville',
    addressLocality: 'Saint-Denis',
    postalCode: '93200',
    addressCountry: 'FR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
