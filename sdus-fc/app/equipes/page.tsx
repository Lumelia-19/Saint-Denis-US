'use client';
import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import TacticalPattern from '@/components/TacticalPattern';
import PlayerCard from '@/components/PlayerCard';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';
import { PLAYERS, getCategories } from '@/lib/players';
import { MatchCategory } from '@/lib/types';

const CATEGORIES = getCategories();

const STAGES: {
  category: MatchCategory;
  label: string;
  age: string;
  icon: IconName;
  image?: string;
}[] = [
  { category: 'U6-U9', label: 'École de foot', age: '5 à 9 ans', icon: 'star', image: '/assets/player_u6_u9.png' },
  { category: 'U10-U13', label: 'Préformation', age: '10 à 13 ans', icon: 'ball', image: '/assets/player_u10_u13.png' },
  { category: 'U14-U17', label: 'Formation', age: '14 à 17 ans', icon: 'target' },
  { category: 'U18-Seniors', label: 'Performance', age: '18 ans et +', icon: 'trophy' },
];

function Jersey({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M16 6 6 13l4 8 5-3v22h18V18l5 3 4-8L32 6c-2 3-5 4.5-8 4.5S18 9 16 6Z" />
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
      {/* ===================== HERO ===================== */}
      <section className="relative pt-32 pb-16 bg-mist bg-grid-ink overflow-hidden">
        <TacticalPattern className="opacity-60" tone="onLight" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <p className="eyebrow text-flame mb-4">Nos équipes</p>
              <h1 className="hero-title">
                <span className="text-navy">Équipes &amp;</span>
                <br />
                <span className="text-gradient">Formation</span>
              </h1>
              <p className="text-slate-soft text-lg max-w-lg mt-6 leading-relaxed">
                De l&apos;école de foot aux seniors, le SDUS FC accompagne chaque joueur dans sa progression
                sportive et humaine.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="flex items-end justify-center gap-3 sm:gap-5">
                {STAGES.map((s, i) => (
                  <div key={s.category} className="flex flex-col items-center">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={`Joueur ${s.category}`}
                        width={170}
                        height={250}
                        className="w-auto object-contain animate-float"
                        style={{ height: `${120 + i * 26}px`, animationDelay: `${i * 0.5}s` }}
                      />
                    ) : (
                      <Jersey
                        className="text-accent animate-float"
                        style={{
                          width: `${88 + i * 14}px`,
                          height: `${88 + i * 14}px`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      />
                    )}
                    <span className="chip bg-surface text-navy border border-cloud mt-2">{s.category}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== FORMATION PATHWAY ===================== */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Le parcours"
              blue="Un chemin de"
              orange="progression"
              subtitle="Chaque catégorie a son projet de jeu et son encadrement diplômé. Cliquez pour voir l'effectif."
            />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {STAGES.map((s, i) => (
              <Reveal key={s.category} delay={i * 0.08}>
                <button
                  onClick={() => selectStage(s.category)}
                  className="card card-hover sheen group w-full text-left p-7 h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="grid place-items-center w-14 h-14 rounded-2xl bg-mist text-accent transition-colors duration-300 group-hover:bg-flame group-hover:text-white">
                      <Icon name={s.icon} size={26} />
                    </span>
                    <span className="display-sm text-3xl text-slate-soft">0{i + 1}</span>
                  </div>
                  <h3 className="display-sm text-xl text-navy">{s.category}</h3>
                  <p className="text-flame font-semibold text-sm">{s.label}</p>
                  <p className="text-slate-soft text-sm mt-1 flex-1">{s.age}</p>
                  <span className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm mt-4">
                    Voir l&apos;effectif
                    <Icon
                      name="arrow-right"
                      size={15}
                      strokeWidth={2.4}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ROSTER ===================== */}
      <section id="roster" className="py-24 bg-mist scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Effectifs"
              blue="Nos"
              orange="joueurs"
              subtitle="Survolez une carte pour révéler les statistiques de la saison."
            />
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-2.5 mt-8 mb-12">
              {(['Tous', ...CATEGORIES] as (MatchCategory | 'Tous')[]).map((cat) => (
                <button key={cat} onClick={() => setActive(cat)} className="pill" data-active={active === cat}>
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((player, i) => (
              <Reveal key={player.id} delay={(i % 4) * 0.08}>
                <PlayerCard player={player} />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-slate-soft py-16">Aucun joueur dans cette catégorie.</p>
          )}
        </div>
      </section>
    </>
  );
}
