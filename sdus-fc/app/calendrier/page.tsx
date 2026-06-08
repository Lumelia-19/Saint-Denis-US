'use client';
import { useState } from 'react';
import Link from 'next/link';
import MatchCard from '@/components/MatchCard';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { useMatches } from '@/hooks/useMatches';
import { Match, MatchCategory } from '@/lib/types';

const TABS: (MatchCategory | 'Tous')[] = ['Tous', 'U6-U9', 'U10-U13', 'U14-U17', 'U18-Seniors', 'Seniors'];

export default function CalendrierPage() {
  const [active, setActive] = useState<MatchCategory | 'Tous'>('Tous');
  // API_INTEGRATION_POINT - cache + refetch gérés par useMatches ; provider dans lib/matches.ts
  const { upcoming, results, loading, error } = useMatches(active);

  return (
    <>
      {/* ===================== HEADER ===================== */}
      <section className="relative pt-32 pb-14 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-grid-ink opacity-70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow text-flame mb-4">Saison 2025 / 2026</p>
            <h1 className="hero-title text-royal lg:text-[5.6rem]">
              Calendrier &amp;{' '}
              <span className="text-flame">Résultats</span>
            </h1>
            <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-deep/82 sm:text-lg">
              Tous les matchs du club, toutes catégories confondues. Filtrez pour suivre votre équipe.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-2.5 mt-8">
              {TABS.map((tab) => (
                <button key={tab} onClick={() => setActive(tab)} className="pill" data-active={active === tab}>
                  {tab}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== MATCHES ===================== */}
      <section className="pb-24 bg-mist">
        <div className="max-w-7xl mx-auto px-6 pt-14">
          {loading ? (
            <MatchesLoader />
          ) : error ? (
            <p className="text-center text-red-500 text-sm py-24">{error}</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <MatchColumn
                icon="calendar"
                title="À venir"
                accent="bg-royal"
                count={upcoming.length}
                matches={upcoming}
                emptyMsg="Aucun match à venir pour cette catégorie."
              />
              <MatchColumn
                icon="trophy"
                title="Résultats"
                accent="bg-flame"
                count={results.length}
                matches={results}
                emptyMsg="Aucun résultat enregistré pour cette catégorie."
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function MatchesLoader() {
  return (
    <div className="flex items-center justify-center gap-2 py-24" role="status" aria-label="Chargement des matchs">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-3 h-3 rounded-full bg-flame animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function MatchColumn({
  icon,
  title,
  accent,
  count,
  matches,
  emptyMsg,
}: {
  icon: 'calendar' | 'trophy';
  title: string;
  accent: string;
  count: number;
  matches: Match[];
  emptyMsg: string;
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-3 mb-7">
          <span className={`grid place-items-center w-11 h-11 rounded-xl text-white ${accent}`}>
            <Icon name={icon} size={20} />
          </span>
          <h2 className="display-sm text-3xl text-navy">{title}</h2>
          <span className="chip bg-surface border border-cloud text-slate-soft nums">{count}</span>
        </div>
      </Reveal>
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {matches.map((match, i) => (
            <Reveal key={match.id} delay={(i % 4) * 0.07}>
              <MatchCard match={match} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="card p-10 text-center">
            <span className="grid place-items-center w-16 h-16 rounded-2xl bg-mist text-flame mx-auto mb-4">
              <Icon name="ball" size={30} />
            </span>
            <p className="text-slate-soft mb-6">{emptyMsg}</p>
            <Link href="/inscriptions" className="btn-outline group">
              Être notifié des matchs
              <Icon
                name="arrow-right"
                size={16}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
