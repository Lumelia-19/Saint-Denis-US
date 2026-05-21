'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import MatchCard from '@/components/MatchCard';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { fetchMatches, filterMatchesByCategory } from '@/lib/matches';
import { Match, MatchCategory } from '@/lib/types';

const TABS: (MatchCategory | 'Tous')[] = ['Tous', 'U6-U9', 'U10-U13', 'U14-U17', 'U18-Seniors', 'Seniors'];

export default function CalendrierPage() {
  const [upcoming, setUpcoming] = useState<Match[]>([]);
  const [results, setResults] = useState<Match[]>([]);
  const [active, setActive] = useState<MatchCategory | 'Tous'>('Tous');

  useEffect(() => {
    // API_INTEGRATION_POINT — pour brancher une vraie API, changer le provider dans lib/matches.ts
    fetchMatches().then((data) => {
      setUpcoming(data.upcoming);
      setResults(data.results);
    });
  }, []);

  const filteredUpcoming = filterMatchesByCategory(upcoming, active);
  const filteredResults = filterMatchesByCategory(results, active);

  return (
    <>
      {/* ===================== HEADER ===================== */}
      <section className="relative pt-32 pb-14 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-grid-ink opacity-70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Saison 2025 / 2026"
              blue="Calendrier &"
              orange="Résultats"
              subtitle="Tous les matchs du club, toutes catégories confondues. Filtrez pour suivre votre équipe."
            />
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
        <div className="max-w-7xl mx-auto px-6 pt-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MatchColumn
            icon="calendar"
            title="À venir"
            accent="bg-royal"
            count={filteredUpcoming.length}
            matches={filteredUpcoming}
            emptyMsg="Aucun match à venir pour cette catégorie."
          />
          <MatchColumn
            icon="trophy"
            title="Résultats"
            accent="bg-flame"
            count={filteredResults.length}
            matches={filteredResults}
            emptyMsg="Aucun résultat enregistré pour cette catégorie."
          />
        </div>
      </section>
    </>
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
