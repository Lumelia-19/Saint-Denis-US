# PROMPT CLAUDE CODE — SDUS FC 93
# Reprend exactement là où Antigravity s'est arrêté

Tu es un développeur Next.js 14 expert. Antigravity a généré les fichiers de base
d'un site pour le Saint-Denis U.S. Football Club (SDUS FC 93). Tu dois créer
TOUT le reste du projet : initialisation, composants, pages, et intégration des assets.

---

## ÉTAPE 1 — INITIALISATION DU PROJET

```bash
npx create-next-app@latest sdus-fc --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd sdus-fc
npm install framer-motion
npm install @types/node
```

---

## ÉTAPE 2 — COPIER LES FICHIERS D'ANTIGRAVITY

Remplace/crée ces fichiers avec exactement le contenu ci-dessous :

### `next.config.ts`
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
```

### `app/globals.css`
Remplace le contenu par défaut par ce CSS (design system SDUS FC) :

```css
@import "tailwindcss";

@theme inline {
  --color-sdus-blue: #1B3A8C;
  --color-sdus-blue-dark: #0D1B4B;
  --color-sdus-blue-light: #2D52C4;
  --color-sdus-orange: #F26522;
  --color-sdus-orange-dark: #D4541A;
  --color-sdus-bg-light: #F4F6FB;
  --font-barlow: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
  --font-body: var(--font-inter-sans), 'Inter', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  color: #1a1a2e;
  background-color: #ffffff;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.hero-title {
  font-family: var(--font-barlow);
  font-weight: 800;
  font-style: italic;
  text-transform: uppercase;
  font-size: clamp(48px, 8vw, 110px);
  line-height: 0.95;
  letter-spacing: -0.02em;
}

.section-title {
  font-family: var(--font-barlow);
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.1;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #F26522;
  color: white;
  border-radius: 9999px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}
.btn-primary:hover { background-color: #D4541A; transform: translateY(-2px); }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 9999px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}
.btn-secondary:hover { background-color: rgba(255,255,255,0.1); transform: translateY(-2px); }

.card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(27,58,140,0.12); }

.player-card-container { perspective: 1200px; }
.player-card-inner {
  position: relative; width: 100%; height: 100%;
  transition: transform 0.7s ease;
  transform-style: preserve-3d;
}
.player-card-container:hover .player-card-inner { transform: rotateY(180deg); }
.player-card-front, .player-card-back {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 1rem; overflow: hidden;
}
.player-card-back { transform: rotateY(180deg); }

.fade-in-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
.fade-in-up.visible { opacity: 1; transform: translateY(0); }

.nav-link {
  position: relative; font-weight: 500; font-size: 0.9rem;
  color: #0D1B4B; text-decoration: none; padding: 0.25rem 0;
  transition: color 0.3s ease;
}
.nav-link::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 0; height: 2px; background-color: #F26522; transition: width 0.3s ease;
}
.nav-link:hover::after, .nav-link.active::after { width: 100%; }
.nav-link:hover, .nav-link.active { color: #F26522; }

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #F4F6FB; }
::-webkit-scrollbar-thumb { background: #1B3A8C; border-radius: 4px; }

.form-input {
  width: 100%; padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0; border-radius: 0.75rem;
  font-size: 0.95rem; transition: border-color 0.3s ease; outline: none; background: white;
}
.form-input:focus { border-color: #1B3A8C; box-shadow: 0 0 0 3px rgba(27,58,140,0.1); }

@media (max-width: 768px) {
  .hero-title { font-size: clamp(36px, 10vw, 60px); }
  .section-title { font-size: clamp(28px, 6vw, 42px); }
}
```

### `lib/types.ts`
```ts
export type MatchCategory = 'U6-U9' | 'U10-U13' | 'U14-U17' | 'U18-Seniors' | 'Seniors';
export type MatchStatus = 'upcoming' | 'live' | 'finished';
export type APIProvider = 'mock' | 'fff' | 'footclubs' | 'sporteasy' | 'custom';

export interface Team {
  name: string; logo?: string; shortName?: string; city?: string;
}

export interface Match {
  id: string; homeTeam: Team; awayTeam: Team;
  date: string; time: string; venue: string;
  category: MatchCategory; competition: string; status: MatchStatus;
  homeScore?: number; awayScore?: number; matchDay?: number;
}

export interface Player {
  id: string; firstName: string; lastName: string;
  number: number; position: 'Gardien' | 'Défenseur' | 'Milieu' | 'Attaquant';
  category: MatchCategory; photo?: string; birthYear?: number;
  stats: { matches: number; goals: number; assists: number; rating: number; };
}

export interface Article {
  id: string; title: string; excerpt: string;
  content?: string; image?: string; date: string; category: string; author?: string;
}

export interface APIConfig {
  provider: APIProvider; baseUrl: string; apiKey: string; clubId: string;
}

export interface ContactFormData {
  firstName: string; lastName: string; email: string; subject: string; message: string;
}
```

### `lib/matches.ts`
[Colle ici le fichier matches.ts fourni par Antigravity — identique, ne pas modifier]

### `lib/players.ts`
[Colle ici le fichier players.ts fourni par Antigravity — identique, ne pas modifier]

---

## ÉTAPE 3 — ASSETS

Crée le dossier `public/assets/` et copie-y :
- logo.png
- hero_bg.jpeg
- player_u6_u9.png
- player_u10_u13.png
- club_hero.jpeg

---

## ÉTAPE 4 — LAYOUT GLOBAL

### `app/layout.tsx`
```tsx
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
  title: 'Saint-Denis U.S. Football Club | SDUS FC 93',
  description: 'Le Saint-Denis U.S. Football Club, club de football formateur et ambitieux au cœur de Saint-Denis depuis 1993.',
  keywords: ['football', 'Saint-Denis', 'SDUS', 'FC 93', 'club de foot', 'Seine-Saint-Denis'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${barlowCondensed.variable} ${inter.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## ÉTAPE 5 — COMPOSANTS

### `components/Navbar.tsx`
Navbar sticky avec :
- Logo `/assets/logo.png` (next/image, height 56px) à gauche
- Liens centrés : Accueil `/` | Le Club `/club` | Équipes `/equipes` | Calendrier `/calendrier` | Inscriptions `/inscriptions` | Actualités `/actualites` | Partenaires `/partenaires` | Contact `/contact`
- Lien actif détecté via `usePathname()` → underline orange animé via classe `.nav-link.active`
- Au scroll > 50px : `backdrop-blur-md bg-white/95 shadow-sm` (useEffect + useState)
- Mobile : hamburger button → menu full-screen `fixed inset-0 bg-[#0D1B4B] z-50` avec liens en grand + bouton fermeture
- Utilise `'use client'`

```tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/club', label: 'Le Club' },
  { href: '/equipes', label: 'Équipes' },
  { href: '/calendrier', label: 'Calendrier & Résultats' },
  { href: '/inscriptions', label: 'Inscriptions' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-md bg-white/95 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src="/assets/logo.png" alt="SDUS FC 93" width={56} height={56} className="h-14 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <Link href="/inscriptions" className="hidden md:flex btn-primary text-sm py-2 px-5">
            S&apos;inscrire →
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="xl:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className="w-6 h-0.5 bg-[#0D1B4B] block" />
            <span className="w-6 h-0.5 bg-[#0D1B4B] block" />
            <span className="w-4 h-0.5 bg-[#0D1B4B] block" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#0D1B4B] z-50 flex flex-col items-center justify-center">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-4xl"
            aria-label="Fermer"
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white font-barlow text-4xl font-bold uppercase hover:text-[#F26522] transition-colors"
                style={{ fontFamily: 'var(--font-barlow)' }}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/inscriptions" onClick={() => setMenuOpen(false)} className="btn-primary mt-4">
              S&apos;inscrire →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
```

### `components/Footer.tsx`
```tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0D1B4B] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image src="/assets/logo.png" alt="SDUS FC 93" width={80} height={80} className="mb-4" />
            <p className="text-white/60 text-sm leading-relaxed">
              Formateur, populaire et ambitieux. Au cœur de Saint-Denis depuis 1993.
            </p>
            <div className="flex gap-3 mt-4">
              {['Instagram', 'Facebook', 'YouTube'].map(s => (
                <span key={s} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/60 hover:border-[#F26522] hover:text-[#F26522] cursor-pointer transition-colors">
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[['/', 'Accueil'], ['/club', 'Le Club'], ['/equipes', 'Équipes'], ['/calendrier', 'Calendrier']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-white/70 hover:text-[#F26522] transition-colors text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Club */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-4">Le Club</h4>
            <ul className="space-y-2">
              {[['/inscriptions', 'Inscriptions'], ['/actualites', 'Actualités'], ['/partenaires', 'Partenaires'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-white/70 hover:text-[#F26522] transition-colors text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>📍 Stade Marville, Saint-Denis (93)</li>
              <li>📧 contact@sdus-fc93.fr</li>
              <li>📱 @sdus_football</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} Saint-Denis U.S. Football Club. Tous droits réservés.</p>
          <p className="text-white/30 text-xs">SDUS FC 93 — Seine-Saint-Denis</p>
        </div>
      </div>
    </footer>
  );
}
```

### `components/ui/Button.tsx`
```tsx
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline-dark';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({ href, onClick, variant = 'primary', children, className = '', type = 'button' }: ButtonProps) {
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'inline-flex items-center gap-2 border-2 border-[#1B3A8C] text-[#1B3A8C] rounded-full px-8 py-3 font-semibold hover:bg-[#1B3A8C] hover:text-white transition-all';

  if (href) return <Link href={href} className={`${cls} ${className}`}>{children}</Link>;
  return <button type={type} onClick={onClick} className={`${cls} ${className}`}>{children}</button>;
}
```

### `components/ui/SectionTitle.tsx`
```tsx
interface SectionTitleProps {
  blue: string;
  orange: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({ blue, orange, subtitle, center = false, light = false }: SectionTitleProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className="section-title">
        <span className={light ? 'text-white' : 'text-[#0D1B4B]'}>{blue} </span>
        <span className="text-[#F26522]">{orange}</span>
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/70' : 'text-gray-600'} ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

### `components/TacticalPattern.tsx`
SVG overlay avec les motifs X, O, flèches tactiques du foot
```tsx
export default function TacticalPattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden>
      <svg className="absolute top-10 left-10 w-12 h-12 opacity-10 text-blue-300" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3">
        <line x1="5" y1="5" x2="35" y2="35"/><line x1="35" y1="5" x2="5" y2="35"/>
      </svg>
      <svg className="absolute top-20 right-20 w-10 h-10 opacity-10 text-blue-300" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="20" cy="20" r="15"/>
      </svg>
      <svg className="absolute bottom-20 left-1/4 w-16 h-8 opacity-10 text-orange-300" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 15 L45 15 M35 5 L50 15 L35 25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <svg className="absolute top-1/2 right-10 w-10 h-10 opacity-10 text-blue-300" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3">
        <line x1="5" y1="5" x2="35" y2="35"/><line x1="35" y1="5" x2="5" y2="35"/>
      </svg>
      <svg className="absolute bottom-10 right-1/3 w-10 h-10 opacity-10 text-blue-300" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="20" cy="20" r="15"/>
      </svg>
      <svg className="absolute top-1/3 left-1/2 w-20 h-10 opacity-8 text-orange-300" viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4">
        <path d="M5 20 Q40 5 75 20"/>
      </svg>
    </div>
  );
}
```

### `components/MatchCard.tsx`
```tsx
import { Match } from '@/lib/types';
import { formatMatchDate } from '@/lib/matches';

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    'U6-U9': '#1B3A8C', 'U10-U13': '#2D52C4',
    'U14-U17': '#1B3A8C', 'U18-Seniors': '#F26522', 'Seniors': '#F26522',
  };
  return map[cat] || '#1B3A8C';
}

export default function MatchCard({ match }: { match: Match }) {
  const isSDUSHome = match.homeTeam.shortName === 'SDUS';
  const isFinished = match.status === 'finished';

  return (
    <div className="card p-5 flex flex-col gap-3">
      {/* Badge catégorie */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: getCategoryColor(match.category) }}>
          {match.category}
        </span>
        <span className="text-xs text-gray-400">{match.competition}</span>
      </div>

      {/* Équipes + score */}
      <div className="flex items-center justify-between gap-4">
        <div className={`flex-1 text-center ${isSDUSHome ? 'font-bold text-[#1B3A8C]' : 'text-gray-700'}`}>
          <p className="text-sm leading-tight">{match.homeTeam.name}</p>
        </div>
        <div className="flex-shrink-0 text-center min-w-[60px]">
          {isFinished ? (
            <span className="text-2xl font-black text-[#0D1B4B]">
              {match.homeScore} – {match.awayScore}
            </span>
          ) : (
            <div>
              <span className="text-lg font-bold text-[#F26522]">VS</span>
              <p className="text-xs text-gray-400 mt-0.5">{match.time}</p>
            </div>
          )}
        </div>
        <div className={`flex-1 text-center ${!isSDUSHome ? 'font-bold text-[#1B3A8C]' : 'text-gray-700'}`}>
          <p className="text-sm leading-tight">{match.awayTeam.name}</p>
        </div>
      </div>

      {/* Infos */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs text-gray-500">
        <span>📅 {formatMatchDate(match.date)}</span>
        <span>📍 {match.venue.split(',')[0]}</span>
      </div>
    </div>
  );
}
```

### `components/PlayerCard.tsx`
```tsx
'use client';
import { Player } from '@/lib/types';

export default function PlayerCard({ player }: { player: Player }) {
  const initials = `${player.firstName[0]}${player.lastName[0]}`;

  return (
    <div className="player-card-container h-72 cursor-pointer">
      <div className="player-card-inner h-full">
        {/* RECTO */}
        <div className="player-card-front h-full" style={{ background: 'linear-gradient(135deg, #1B3A8C 0%, #0D1B4B 100%)' }}>
          <div className="relative h-full flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Numéro watermark */}
            <span className="absolute text-[8rem] font-black text-white/5 select-none leading-none">
              {player.number}
            </span>
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-[#F26522]/50 flex items-center justify-center mb-3 z-10">
              <span className="text-2xl font-black text-white">{initials}</span>
            </div>
            {/* Infos */}
            <div className="text-center z-10">
              <p className="text-[#F26522] text-xs font-bold uppercase tracking-widest mb-1">#{player.number}</p>
              <h3 className="text-white font-black text-lg leading-tight">{player.firstName}</h3>
              <h3 className="text-white font-black text-lg leading-tight">{player.lastName}</h3>
              <p className="text-white/50 text-sm mt-1">{player.position}</p>
            </div>
          </div>
        </div>

        {/* VERSO */}
        <div className="player-card-back h-full bg-[#0D1B4B] p-6 flex flex-col justify-center">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center">Statistiques</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Matchs', value: player.stats.matches },
              { label: 'Buts', value: player.stats.goals },
              { label: 'Passes D.', value: player.stats.assists },
              { label: 'Note', value: player.stats.rating.toFixed(1) },
            ].map(stat => (
              <div key={stat.label} className="text-center bg-white/5 rounded-xl p-3">
                <p className="text-[#F26522] text-2xl font-black">{stat.value}</p>
                <p className="text-white/50 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="text-white/30 text-xs">{player.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### `components/StatCounter.tsx`
```tsx
'use client';
import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ value, suffix = '', label }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        let start = 0;
        const duration = 1500;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl font-black text-[#F26522]" style={{ fontFamily: 'var(--font-barlow)' }}>
        {count}{suffix}
      </p>
      <p className="text-white/70 text-sm font-medium mt-2 uppercase tracking-wider">{label}</p>
    </div>
  );
}
```

### `components/ArticleCard.tsx`
```tsx
import { Article } from '@/lib/types';
import Link from 'next/link';

export default function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();

  return (
    <div className="card group cursor-pointer">
      <div className="h-44 bg-gradient-to-br from-[#1B3A8C] to-[#0D1B4B] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-20">⚽</span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-[#F26522] text-white text-xs font-bold px-3 py-1 rounded-full">{date}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-black text-[#0D1B4B] text-base uppercase leading-tight mb-2 group-hover:text-[#F26522] transition-colors"
          style={{ fontFamily: 'var(--font-barlow)' }}>
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
        <span className="text-[#F26522] text-sm font-semibold flex items-center gap-1">
          Lire la suite →
        </span>
      </div>
    </div>
  );
}
```

---

## ÉTAPE 6 — PAGES

### `app/page.tsx` — ACCUEIL
```tsx
import Image from 'next/image';
import Link from 'next/link';
import TacticalPattern from '@/components/TacticalPattern';
import StatCounter from '@/components/StatCounter';
import MatchCard from '@/components/MatchCard';
import { fetchMatches } from '@/lib/matches';

const VALUES = [
  { icon: '🎓', title: 'FORMATION', desc: "Encadrer, transmettre, faire progresser. De l'école de foot aux seniors, chacun trouve sa place.", href: '/equipes' },
  { icon: '👥', title: 'ESPRIT COLLECTIF', desc: 'Respect, solidarité, dépassement de soi. Ici, le collectif fait la différence.', href: '/club' },
  { icon: '🏆', title: 'MATCHS & VIE DU CLUB', desc: 'Compétitions, événements, convivialité. Vibrez toute l'année avec le SDUS.', href: '/calendrier' },
];

const STATS = [
  { value: 500, suffix: '+', label: 'Licenciés' },
  { value: 12, suffix: '', label: 'Équipes' },
  { value: 30, suffix: ' Ans', label: "D'Histoire" },
  { value: 1, suffix: '', label: 'Stade • Stade de France' },
];

export default async function HomePage() {
  const { upcoming } = await fetchMatches();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image src="/assets/hero_bg.jpeg" alt="SDUS FC Hero" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A8C]/90 via-[#0D1B4B]/75 to-transparent" />
        <TacticalPattern />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
          <div className="max-w-3xl">
            <p className="text-[#F26522] font-bold text-sm uppercase tracking-[0.3em] mb-6">
              Saint-Denis U.S. Football Club — 93
            </p>
            <h1 className="hero-title text-white mb-2">
              SAINT-DENIS<br />
              <span className="text-white">DANS LE CŒUR.</span>
            </h1>
            <h1 className="hero-title text-[#F26522] mb-8">
              LE FOOTBALL<br />
              DANS LES VEINES.
            </h1>
            <p className="text-white/80 text-lg max-w-xl mb-10 leading-relaxed">
              Le Saint-Denis U.S. Football Club, c&apos;est plus qu&apos;un club : c&apos;est une famille.{' '}
              <strong className="text-white">Formateur, populaire et ambitieux</strong>, nous faisons grandir
              les talents et les valeurs depuis 1993.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/inscriptions" className="btn-primary text-base px-8 py-4">S&apos;inscrire →</Link>
              <Link href="/equipes" className="btn-secondary text-base px-8 py-4">Voir les équipes →</Link>
            </div>
          </div>
        </div>

        {/* Value cards flottantes en bas */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VALUES.map(v => (
                <Link key={v.title} href={v.href}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all group">
                  <span className="text-3xl mb-3 block">{v.icon}</span>
                  <h3 className="text-white font-black text-lg mb-2" style={{ fontFamily: 'var(--font-barlow)' }}>{v.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-3">{v.desc}</p>
                  <span className="text-[#F26522] text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">Découvrir →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#1B3A8C] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(s => <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* PROCHAINS MATCHS */}
      <section className="py-20 bg-[#F4F6FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="section-title text-[#0D1B4B]">PROCHAINS <span className="text-[#F26522]">MATCHS</span></h2>
            <span className="bg-[#F26522] text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">SAISON 25/26</span>
          </div>
          {/* TODO: connecter l'API FFF/Footclubs — voir lib/matches.ts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {upcoming.slice(0, 3).map(match => <MatchCard key={match.id} match={match} />)}
          </div>
          <div className="text-center mt-8">
            <Link href="/calendrier" className="btn-primary">Voir tout le calendrier →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

### `app/club/page.tsx` — LE CLUB
Page complète avec :
- Hero image `/assets/club_hero.jpeg` en full-width + overlay gradient bleu
- Titre "QUI SOMMES-NOUS ?" en blanc + "NOUS ?" en orange
- Paragraph descriptif du club depuis 1993
- Timeline horizontale 4 étapes : 1945 / Club omnisports / Section Football / Aujourd'hui
  Chaque étape : cercle icône blanc bordé orange, année/titre en gras, description 2 lignes
- 3 cards valeurs fond blanc : RESPECT / FORMATION / ESPRIT COLLECTIF (icône ronde bleue + titre + texte + flèche orange)
- Citation finale : "BLEU ET ORANGE DANS LE CŒUR, SAINT-DENIS COMME TERRAIN." en très grand, mot "CŒUR" en orange et "TERRAIN" en orange

```tsx
import Image from 'next/image';
import TacticalPattern from '@/components/TacticalPattern';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';

const TIMELINE = [
  { year: '1945', icon: '🏳️', title: 'Naissance du Club', desc: 'Un club au service du sport pour tous.' },
  { year: '', icon: '⚽', title: 'Club Omnisports', desc: 'Plusieurs disciplines, une même passion : rassembler.' },
  { year: '', icon: '🎯', title: 'Section Football', desc: "Le football s'impose comme moteur d'engagement." },
  { year: "Aujourd'hui", icon: '🏆', title: "Aujourd'hui", desc: 'Un club structuré, tourné vers l'avenir.' },
];

const VALUES = [
  { icon: '🤝', title: 'RESPECT', desc: "Respecter l'autre, le jeu, les règles et nos couleurs." },
  { icon: '🎓', title: 'FORMATION', desc: 'Accompagner chaque joueur dans son apprentissage sportif et citoyen.' },
  { icon: '👥', title: 'ESPRIT COLLECTIF', desc: 'Avancer ensemble, se soutenir, se dépasser pour le maillot et le club.' },
];

export default function ClubPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <Image src="/assets/club_hero.jpeg" alt="Stade de France, Saint-Denis" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4B] via-[#0D1B4B]/50 to-transparent" />
        <TacticalPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-[#F26522] text-sm font-bold uppercase tracking-[0.3em] mb-3">Le Club / À Propos</p>
          <h1 className="hero-title text-white">QUI SOMMES-<span className="text-[#F26522]">NOUS ?</span></h1>
        </div>
      </section>

      {/* Description + Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-gray-600 text-lg leading-relaxed">
              Le Saint-Denis U.S. Football Club, c&apos;est plus qu&apos;un club : c&apos;est une famille.{' '}
              <strong className="text-[#0D1B4B]">Formateur, populaire et ambitieux</strong>, nous faisons grandir
              les talents et les valeurs, au cœur de Saint-Denis{' '}
              <strong className="text-[#F26522]">depuis 1993</strong>.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-[#F26522]/30 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {TIMELINE.map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-[#F26522] flex items-center justify-center text-2xl mb-4 z-10 shadow-md">
                    {item.icon}
                  </div>
                  <p className="text-[#F26522] font-black text-xl mb-1" style={{ fontFamily: 'var(--font-barlow)' }}>{item.year || item.title}</p>
                  {item.year && <p className="text-[#0D1B4B] font-bold mb-1">{item.title}</p>}
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-[#F4F6FB]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle blue="NOS" orange="VALEURS" center />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {VALUES.map(v => (
              <div key={v.title} className="card p-8 group">
                <div className="w-14 h-14 rounded-full bg-[#1B3A8C] flex items-center justify-center text-2xl mb-5">{v.icon}</div>
                <h3 className="font-black text-[#0D1B4B] text-xl mb-3" style={{ fontFamily: 'var(--font-barlow)' }}>{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{v.desc}</p>
                <span className="text-[#F26522] font-semibold text-sm">En savoir plus →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation finale */}
      <section className="py-24 bg-[#0D1B4B] text-center relative overflow-hidden">
        <TacticalPattern />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="section-title text-white">
            BLEU ET ORANGE DANS LE <span className="text-[#F26522]">CŒUR</span>,<br />
            SAINT-DENIS COMME <span className="text-[#F26522]">TERRAIN</span>.
          </p>
        </div>
      </section>
    </>
  );
}
```

### `app/equipes/page.tsx` — ÉQUIPES & FORMATION
Page complète avec :
- Hero fond blanc avec motifs tactiques + joueurs en cutout progressif
  * Image `/assets/player_u6_u9.png` (petit, à gauche, object-contain)
  * Image `/assets/player_u10_u13.png` (milieu-gauche, plus grand)
  * Silhouettes SVG pour U14-U17 et U18-Seniors (cercle bleu + point d'interrogation)
- Titre "ÉQUIPES &" bleu + "FORMATION" orange, sous-titre
- 4 CategoryBanner chevrons (> composant inline)
- Sidebar droite : card "Parcours Joueur" + card "Anciens du Club"
- Grille player cards avec filtre par catégorie (tabs 'use client')
- Import `PLAYERS` depuis `@/lib/players`

### `app/calendrier/page.tsx` — CALENDRIER
Page complète avec :
- Header "CALENDRIER" + "& RÉSULTATS" + description
- Tabs de filtre catégorie (Tous / U6-U9 / U10-U13 / U14-U17 / U18-Seniors / Seniors) — 'use client'
- 2 colonnes : À venir / Résultats
- Grille MatchCard filtrée selon tab actif
- Si aucun match : message stylé + bouton inscription notification
- Commentaire : // API_INTEGRATION_POINT — modifier lib/matches.ts provider

### `app/inscriptions/page.tsx` — INSCRIPTIONS
Page complète reprenant exactement la maquette :
- Fond blanc, pas de hero image, titre épuré
- Badge circulaire bleu "SAISON 2025 / 2026"
- Titre "REJOINDRE LE CLUB." en très grand noir
- Sous-titre "Inscriptions, Détections & Stages."
- Card bleue (#1B3A8C) pièces à fournir avec 4 checkmarks orange
- 3 étapes numérotées avec flèches tiretées entre elles
- Sidebar : 2 cards DÉTECTIONS + STAGES VACANCES avec boutons orange
- CTA centré + badge "PROCÉDURE 100% EN LIGNE"

### `app/actualites/page.tsx` — ACTUALITÉS
Page complète avec :
- Hero gradient bleu + titre "ACTUALITÉS & VIE DU CLUB"
- 3 ArticleCard en grille (données mock depuis un array local)
- Bloc Instagram @sdus_football (4 placeholders + bouton)
- Citation card avec grande guillemet orange
- CTA "Voir toutes les actualités →"

Articles mock :
```ts
const ARTICLES = [
  { id: '1', title: 'VICTOIRE AU BOUT DU SUSPENSE', excerpt: "Les U16 s'imposent 2-1 dans les dernières minutes.", date: '2024-04-28', category: 'Match' },
  { id: '2', title: "RETOUR SUR LE WEEK-END DE NOS ÉDUCATEURS", excerpt: "Échanges, formations et partages d'expériences.", date: '2024-04-24', category: 'Formation' },
  { id: '3', title: 'STAGE DE PRINTEMPS : UNE RÉUSSITE COLLECTIVE', excerpt: '3 jours de progression, de fun et de cohésion.', date: '2024-04-20', category: 'Stage' },
];
```

### `app/partenaires/page.tsx` — PARTENAIRES
Page complète avec :
- Background Stade de France (gradient si pas image) + overlay
- Titre "PARTENAIRES & SPONSORING"
- Section centrale : 6 nodes en cercle (CSS orbit animation depuis globals.css) :
  COMMERCES DE PROXIMITÉ / ENTREPRISES LOCALES / COLLECTIVITÉS & INSTITUTIONS / ACTEURS ÉCONOMIQUES / ÉDUCATION & FORMATION / ASSOCIATIONS & CITOYENS
- Stats : "500+ JEUNES LICENCIÉS" (gauche) + "1 STADE AU CŒUR DE SAINT-DENIS" (droite)
- 3 avantages bas : VISIBILITÉ / TERRITOIRE / JEUNESSE
- CTA "Devenir partenaire →"

### `app/contact/page.tsx` — CONTACT
Page complète avec :
- Titre "CONTACTEZ-" bleu + "NOUS" orange
- Formulaire React (useState) : Prénom, Nom, Email, Objet (select), Message, submit
- Card coordonnées : adresse Stade Marville, email, téléphone fictif
- Réseaux sociaux

---

## ÉTAPE 7 — VÉRIFICATION FINALE

```bash
npm run build
npm run lint
```

Corriger toutes les erreurs TypeScript et ESLint.
S'assurer que `next/image` est utilisé partout (0 balise `<img>` nue).
Tester `npm run dev` et vérifier toutes les pages sur http://localhost:3000

---

## ÉTAPE 8 — .env.local

Créer `.env.local` :
```
NEXT_PUBLIC_MATCHES_PROVIDER=mock
NEXT_PUBLIC_MATCHES_API_URL=
NEXT_PUBLIC_MATCHES_API_KEY=
NEXT_PUBLIC_CLUB_ID=SDUS93
```

Et `.gitignore` doit contenir `.env.local`.

---

## RÉSUMÉ DE CE QUI EXISTAIT DÉJÀ (ne pas recréer)
- `lib/types.ts` ✅ (fourni par Antigravity)
- `lib/matches.ts` ✅ (fourni par Antigravity)
- `lib/players.ts` ✅ (fourni par Antigravity)
- `next.config.ts` ✅ (fourni par Antigravity)
- `app/globals.css` ✅ (fourni par Antigravity)

## CE QUI EST À CRÉER (tout le reste)
- `app/layout.tsx`
- `app/page.tsx`
- `app/club/page.tsx`
- `app/equipes/page.tsx`
- `app/calendrier/page.tsx`
- `app/inscriptions/page.tsx`
- `app/actualites/page.tsx`
- `app/partenaires/page.tsx`
- `app/contact/page.tsx`
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `components/TacticalPattern.tsx`
- `components/MatchCard.tsx`
- `components/PlayerCard.tsx`
- `components/StatCounter.tsx`
- `components/ArticleCard.tsx`
- `components/ui/Button.tsx`
- `components/ui/SectionTitle.tsx`
- `.env.local`
