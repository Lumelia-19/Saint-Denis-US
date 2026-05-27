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
  image?: string;
  height: number;
};

const STAGES: StageDef[] = [
  { category: 'U6-U9', title: 'U6 - U9', tagline: 'Découverte & plaisir', image: '/assets/player_u6_u9.webp', height: 240 },
  { category: 'U10-U13', title: 'U10 - U13', tagline: 'Apprentissage & fondations', image: '/assets/player_u10_u13.webp', height: 290 },
  { category: 'U14-U17', title: 'U14 - U17', tagline: 'Progression & performance', height: 340 },
  { category: 'U18-Seniors', title: 'U18 - SENIORS', tagline: 'Compétition & ambition', height: 400 },
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

function PlayerSilhouette({ height, jerseyNumber }: { height: number; jerseyNumber: string }) {
  return (
    <svg
      viewBox="0 0 220 320"
      style={{ height: `${height}px`, width: 'auto' }}
      className="text-royal animate-float drop-shadow-[0_22px_30px_rgba(13,27,75,0.28)]"
      aria-hidden="true"
    >
      {/* Tête */}
      <circle cx="110" cy="48" r="28" fill="currentColor" opacity="0.92" />
      {/* Maillot */}
      <path
        d="M44 110 L82 86 Q100 100 110 100 Q120 100 138 86 L176 110 L168 152 L148 144 L148 232 Q148 244 138 244 L82 244 Q72 244 72 232 L72 144 L52 152 Z"
        fill="currentColor"
      />
      {/* Liseré orange */}
      <path d="M82 100 L110 116 L138 100" stroke="#f26522" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text
        x="110"
        y="190"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontStyle="italic"
        fontSize="64"
        fill="#f26522"
      >
        {jerseyNumber}
      </text>
      {/* Shorts */}
      <path d="M82 244 L72 290 L102 290 L110 256 L118 290 L148 290 L138 244 Z" fill="#0d1b4b" />
      {/* Jambes */}
      <rect x="86" y="290" width="22" height="28" rx="4" fill="currentColor" opacity="0.85" />
      <rect x="112" y="290" width="22" height="28" rx="4" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export default function EquipesPage() {
  const [active, setActive] = useState<MatchCategory | 'Tous'>('Tous');

  const filtered = active === 'Tous' ? PLAYERS : PLAYERS.filter((p) => p.category === active);

  const selectStage = (cat: MatchCategory) => {
    setActive(cat);
    document.getElementById('roster')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden bg-white pt-28 lg:pt-24" aria-labelledby="equipes-title">
        {/* Mascotte tigre en fond */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[url('/assets/logo.png')] bg-[length:46rem_auto] bg-[position:42%_44%] bg-no-repeat opacity-[0.05] dark:opacity-[0.08]"
        />

        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_280px] lg:gap-12 lg:px-10 min-[1400px]:px-16">
          {/* ===== Colonne principale ===== */}
          <div className="pt-8 lg:pt-12">
            <Reveal>
              <p className="eyebrow text-flame mb-4">Nos équipes</p>
              <h1 id="equipes-title" className="hero-title text-royal lg:text-[6rem]">
                Équipes &amp;
                <br />
                <span className="text-flame">Formation</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-deep/82 sm:text-lg">
                Un parcours structuré, adapté à chaque âge pour développer le potentiel de chaque joueur et former
                des citoyens sur et en dehors du terrain.
              </p>
            </Reveal>

            {/* ===== 4 joueurs + chevrons ===== */}
            <Reveal delay={0.12}>
              <div className="mt-10 flex items-end justify-center gap-2 sm:gap-4 lg:gap-3 lg:justify-start">
                {STAGES.map((stage, i) => (
                  <div key={stage.category} className="flex flex-col items-center" style={{ width: `${24 + i * 2}%` }}>
                    <div className="flex h-[420px] items-end justify-center sm:h-[440px]">
                      {stage.image ? (
                        <Image
                          src={stage.image}
                          alt={`Joueur SDUS FC catégorie ${stage.title}`}
                          width={220}
                          height={400}
                          className="w-auto object-contain animate-float drop-shadow-[0_22px_30px_rgba(13,27,75,0.28)]"
                          style={{ height: `${stage.height}px`, animationDelay: `${i * 0.4}s` }}
                        />
                      ) : (
                        <PlayerSilhouette height={stage.height} jerseyNumber={i === 2 ? '7' : '9'} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:items-stretch sm:gap-2 lg:gap-3">
                {STAGES.map((stage, i) => {
                  const isFirst = i === 0;
                  const isLast = i === STAGES.length - 1;
                  const clipPath = isFirst
                    ? 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)'
                    : isLast
                      ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 14px 50%)'
                      : 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 14px 50%)';
                  return (
                  <button
                    key={stage.category}
                    onClick={() => selectStage(stage.category)}
                    className="group relative flex-1 overflow-hidden bg-royal px-3 py-3 text-left text-white shadow-[0_18px_40px_-24px_rgba(13,27,75,0.7)] transition hover:bg-flame sm:px-4 sm:py-4"
                    style={{ clipPath }}
                  >
                    <p className="display-sm text-base italic leading-none sm:text-lg lg:text-xl">
                      {stage.title.split('-')[0].trim()}-
                      <span className="text-flame group-hover:text-white">{stage.title.split('-').slice(1).join('-').trim()}</span>
                    </p>
                    <p className="mt-1.5 text-[0.66rem] font-semibold uppercase leading-tight tracking-wide text-white/82 sm:text-[0.72rem]">
                      {stage.tagline}
                    </p>
                  </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex justify-end">
                <Link href="#roster" className="btn-primary group">
                  Voir toutes les équipes
                  <Icon
                    name="arrow-right"
                    size={18}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ===== Sidebar droite ===== */}
          <aside className="flex flex-col gap-5 lg:pt-20">
            <Reveal delay={0.1}>
              <section className="rounded-[1.2rem] border border-cloud bg-white p-6 shadow-[0_22px_56px_-34px_rgba(13,27,75,0.55)]">
                <h2 className="display-sm text-center text-[1.15rem] italic text-royal">Parcours joueur</h2>
                <div className="mt-3 mx-auto h-1 w-12 rounded-full bg-flame" />
                <ul className="mt-5 space-y-4">
                  {PATHWAY.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-royal text-white">
                        <Icon name={item.icon} size={20} />
                      </span>
                      <span className="text-sm font-semibold text-deep">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.18}>
              <section className="rounded-[1.2rem] border border-cloud bg-white p-6 shadow-[0_22px_56px_-34px_rgba(13,27,75,0.55)]">
                <h2 className="display-sm text-center text-[1.05rem] italic leading-tight text-royal">
                  Anciens passés
                  <br />
                  par le club
                </h2>
                <div className="mt-3 mx-auto h-1 w-12 rounded-full bg-flame" />
                <ul className="mt-5 space-y-4">
                  {ALUMNI.map((p) => (
                    <li key={p.lastName} className="flex items-center gap-3">
                      <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-royal text-white shadow-[0_10px_22px_-12px_rgba(13,27,75,0.75)] ring-2 ring-flame/60"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        <span className="text-sm font-black italic">{p.initials}</span>
                      </span>
                      <span className="text-sm font-semibold leading-tight text-deep">
                        {p.firstName}
                        <br />
                        {p.lastName}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ============ ROSTER ============ */}
      <section id="roster" className="bg-mist py-20 scroll-mt-24" aria-label="Effectifs">
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
            <div className="mt-8 mb-12 flex flex-wrap gap-2.5">
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
