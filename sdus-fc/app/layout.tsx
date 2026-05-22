import type { Metadata } from 'next';
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
    default: 'Saint-Denis U.S. Football Club | SDUS FC 93',
    template: '%s | SDUS FC 93',
  },
  description:
    'Le Saint-Denis U.S. Football Club, club de football formateur et ambitieux au cœur de Saint-Denis depuis 1993.',
  keywords: ['football', 'Saint-Denis', 'SDUS', 'FC 93', 'club de foot', 'Seine-Saint-Denis'],
  openGraph: {
    title: 'Saint-Denis U.S. Football Club | SDUS FC 93',
    description:
      'Club de football formateur et ambitieux au cœur de Saint-Denis depuis 1993.',
    url: '/',
    siteName: 'SDUS FC 93',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/assets/hero_bg.jpeg', width: 1672, height: 941, alt: 'Saint-Denis U.S. Football Club' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saint-Denis U.S. Football Club | SDUS FC 93',
    description:
      'Club de football formateur et ambitieux au cœur de Saint-Denis depuis 1993.',
    images: ['/assets/hero_bg.jpeg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/logo.png',
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'Saint-Denis U.S. Football Club',
  alternateName: 'SDUS FC 93',
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
