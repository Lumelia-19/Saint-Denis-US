'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PlayerCard from '@/components/PlayerCard';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';
import { PLAYERS, getCategories } from '@/lib/players';
import { MatchCategory } from '@/lib/types';

const CATEGORIES = getCategories();

type StageDef = {
  category: MatchCategory;
  title: string;
  tagline: string;
  description: string;
  image: string;
  height: number;
  offsetY?: number; // px, negatif = remonte, positif = descend
  scale?: number;   // zoom visuel (n'affecte pas le layout)
  flip?: boolean;
};

// Une vraie photo par categorie ; height = pixels en desktop (lg)
const STAGES: StageDef[] = [
  {
    category: 'U6-U9',
    title: 'U6 - U9',
    tagline: 'Découverte & plaisir',
    description: "Apprendre en s'amusant, développer la motricité et l'amour du jeu.",
    image: '/assets/player_u6_u9.png',
    height: 700,
    offsetY: 0,
    scale: 1.3,
  },
  {
    category: 'U10-U13',
    title: 'U10 - U13',
    tagline: 'Apprentissage & fondations',
    description: 'Acquérir les bases techniques, comprendre le jeu et grandir ensemble.',
    image: '/assets/player_u10_13.png',
    height: 700,
    offsetY: -10,
    scale: 1.3,
  },
  {
    category: 'U14-U17',
    title: 'U14 - U17',
    tagline: 'Progression & performance',
    description: "Se perfectionner, prendre des décisions et viser l'excellence au quotidien.",
    image: '/assets/player_u14.png',
    height: 880,
    offsetY: 100,
    scale: 1.3,
  },
  {
    category: 'U18-Seniors',
    title: 'U18 - SENIORS',
    tagline: 'Compétition & ambition',
    description: 'Être performant, représenter le club et viser toujours plus haut.',
    image: '/assets/player_senior.png',
    height: 1000,
    offsetY: 160,
    scale: 1.3,
  },
];

const PATHWAY: { icon: IconName; label: string }[] = [
  { icon: 'ball', label: 'Technique' },
  { icon: 'sparkles', label: 'Intelligence de jeu' },
  { icon: 'users', label: 'Comportement' },
  { icon: 'handshake', label: 'Engagement collectif' },
];

const ALUMNI = [
  { firstName: 'Wissam', lastName: 'Ben Yedder', initials: 'WB' },
  { firstName: 'Jérôme', lastName: 'Roussillon', initials: 'JR' },
];

export default function EquipesPage() {
  const [active, setActive] = useState<MatchCategory | 'Tous'>('Seniors');

  const filtered = active === 'Tous' ? PLAYERS : PLAYERS.filter((p) => p.category === active);

  const selectStage = (cat: MatchCategory) => {
    setActive(cat);
    document.getElementById('roster')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden bg-white pt-20 lg:pt-16" aria-labelledby="equipes-title">
        {/* ===== Brush strokes bleus en arrière-plan ===== */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          viewBox="0 0 1500 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Filtre pour donner une texture brossée aux strokes */}
            <filter id="brush-roughen" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="3" />
              <feDisplacementMap in="SourceGraphic" scale="14" />
            </filter>
          </defs>
          {/* Coup de pinceau diagonal principal - bleu marine */}
          <path
            d="M -50 620 Q 380 380 760 500 T 1560 360"
            stroke="#1b3a8c"
            strokeWidth="120"
            strokeLinecap="round"
            fill="none"
            opacity="0.10"
            filter="url(#brush-roughen)"
          />
          {/* Coup de pinceau secondaire - azure plus clair */}
          <path
            d="M -40 280 Q 340 200 720 320 T 1540 200"
            stroke="#2d52c4"
            strokeWidth="80"
            strokeLinecap="round"
            fill="none"
            opacity="0.08"
            filter="url(#brush-roughen)"
          />
          {/* Touche basse à droite */}
          <path
            d="M 880 780 Q 1140 720 1340 760 T 1620 740"
            stroke="#1b3a8c"
            strokeWidth="100"
            strokeLinecap="round"
            fill="none"
            opacity="0.09"
            filter="url(#brush-roughen)"
          />
        </svg>

        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-6 px-5 pb-16 sm:gap-8 sm:px-8 lg:grid-cols-[1fr_280px] lg:gap-12 lg:px-10 min-[1400px]:px-16">
          {/* ===== Colonne principale ===== */}
          <div className="pt-6 sm:pt-8 lg:pt-14">
            <Reveal>
              <p className="eyebrow text-flame mb-4">Nos équipes</p>
              <h1 id="equipes-title" className="hero-title text-royal lg:text-[6rem]">
                Équipes &amp;
                <br />
                <span className="text-flame">Formation</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-deep/82 sm:text-lg">
                Un parcours structuré, adapté à chaque âge pour développer le potentiel de chaque joueur et former
                des citoyens sur et en dehors du terrain.
              </p>
            </Reveal>

            {/* ===== 4 joueurs + chevrons + descriptions ===== */}
            <Reveal delay={0.12}>
              {/* Zone photos : faible flow + bottom decale tres bas (les photos
                 descendent par-dessus la zone des chevrons sans pousser le layout).
                 Masquee < lg (photos calibrees pour desktop, ingérables en petit). */}
              <div className="relative mt-4 hidden lg:block lg:h-[220px]">
                <div className="absolute inset-x-0 bottom-[-260px] flex items-end justify-center gap-2 sm:bottom-[-300px] sm:gap-4 lg:bottom-[-340px] lg:gap-3 lg:justify-start">
                  {STAGES.map((stage, i) => (
                    <div
                      key={stage.category}
                      className="flex flex-col items-center"
                      style={{ width: `${24 + i * 2}%` }}
                    >
                      <Image
                        src={stage.image}
                        alt={`Joueur UFSD FC catégorie ${stage.title}`}
                        width={600}
                        height={1200}
                        className={`relative z-[100] w-auto object-contain drop-shadow-[0_22px_30px_rgba(13,27,75,0.28)] ${stage.flip ? 'scale-x-[-1]' : ''}`}
                        style={{
                          height: `${stage.height}px`,
                          transform: [
                            stage.offsetY ? `translateY(${stage.offsetY}px)` : '',
                            stage.scale ? `scale(${stage.scale})` : '',
                          ].filter(Boolean).join(' ') || undefined,
                          transformOrigin: 'center bottom',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Chevrons (description integree, juste en dessous des photos) */}
              <div className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:items-stretch sm:gap-2 lg:gap-3">
                {STAGES.map((stage, i) => {
                  const isFirst = i === 0;
                  const isLast = i === STAGES.length - 1;
                  const clipPath = isFirst
                    ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                    : isLast
                      ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 20px 50%)'
                      : 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)';
                  return (
                  <button
                    key={stage.category}
                    onClick={() => selectStage(stage.category)}
                    className="group relative flex-1 overflow-hidden bg-royal px-4 py-6 text-left text-white shadow-[0_18px_40px_-24px_rgba(13,27,75,0.7)] transition hover:bg-flame sm:px-6 sm:py-7"
                    style={{ clipPath }}
                  >
                    <p className="display-sm text-xl italic leading-none sm:text-2xl md:text-3xl lg:text-[2.5rem]">
                      {stage.title.split('-')[0].trim()}-
                      <span className="text-flame group-hover:text-white">{stage.title.split('-').slice(1).join('-').trim()}</span>
                    </p>
                    <p className="mt-2 text-[0.82rem] font-semibold uppercase leading-tight tracking-wide text-white/85 sm:text-[0.9rem]">
                      {stage.tagline}
                    </p>
                    <p className="mt-3 text-[0.78rem] leading-snug text-white/78 sm:text-[0.82rem]">
                      {stage.description}
                    </p>
                  </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* ===== Sidebar droite (centree verticalement dans la zone disponible) ===== */}
          <aside className="flex flex-col gap-5 lg:justify-center">
            <Reveal delay={0.1}>
              <section className="rounded-[1.2rem] border border-cloud bg-white p-7 shadow-[0_22px_56px_-34px_rgba(13,27,75,0.55)] lg:p-8">
                <h2 className="display-sm text-center text-[1.25rem] italic text-royal">Parcours joueur</h2>
                <div className="mt-3 mx-auto h-1 w-14 rounded-full bg-flame" />
                <ul className="mt-7 space-y-6">
                  {PATHWAY.map((item) => (
                    <li key={item.label} className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-royal text-white">
                        <Icon name={item.icon} size={22} />
                      </span>
                      <span className="text-[0.95rem] font-semibold text-deep">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.18}>
              <section className="rounded-[1.2rem] border border-cloud bg-white p-7 shadow-[0_22px_56px_-34px_rgba(13,27,75,0.55)] lg:p-8">
                <h2 className="display-sm text-center text-[1.15rem] italic leading-tight text-royal">
                  Anciens passés
                  <br />
                  par le club
                </h2>
                <div className="mt-3 mx-auto h-1 w-14 rounded-full bg-flame" />
                <ul className="mt-7 space-y-5">
                  {ALUMNI.map((p) => (
                    <li key={p.lastName} className="flex items-center gap-4">
                      <span
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-royal text-white shadow-[0_10px_22px_-12px_rgba(13,27,75,0.75)] ring-2 ring-flame/60"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        <span className="text-base font-black italic">{p.initials}</span>
                      </span>
                      <span className="text-[0.95rem] font-semibold leading-tight text-deep">
                        {p.firstName}
                        <br />
                        {p.lastName}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Bouton sous la sidebar (a droite) */}
            <Reveal delay={0.24}>
              <Link href="#roster" className="btn-primary group w-full justify-center">
                Voir toutes les équipes
                <Icon
                  name="arrow-right"
                  size={18}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ============ ROSTER ============ */}
      <section id="roster" className="bg-mist py-12 scroll-mt-20 sm:py-16 sm:scroll-mt-24 lg:py-20" aria-label="Effectifs">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10 min-[1400px]:px-16">
          <Reveal>
            <SectionTitle
              eyebrow="Effectifs"
              blue="Nos"
              orange="joueurs"
              subtitle="Survolez une carte pour révéler les statistiques de la saison."
            />
          </Reveal>

          <Reveal>
            <div className="mt-8 mb-12 flex flex-wrap gap-1.5 sm:gap-2.5">
              {(['Tous', ...CATEGORIES] as (MatchCategory | 'Tous')[]).map((cat) => (
                <button key={cat} onClick={() => setActive(cat)} className="pill" data-active={active === cat}>
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((player, i) => (
              <Reveal key={player.id} delay={(i % 4) * 0.08}>
                <PlayerCard player={player} />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-slate-soft">Aucun joueur dans cette catégorie.</p>
          )}
        </div>
      </section>
    </>
  );
}
