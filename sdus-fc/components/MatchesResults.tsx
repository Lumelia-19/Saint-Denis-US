'use client';

import { useState } from 'react';
import Link from 'next/link';
import MatchCard from '@/components/MatchCard';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { useMatches } from '@/hooks/useMatches';
import { Match, MatchCategory } from '@/lib/types';

const TABS: (MatchCategory | 'Tous')[] = ['Tous', 'U6-U9', 'U10-U13', 'U14-U17', 'U18-Seniors', 'Seniors'];

export default function MatchesResults() {
  const [active, setActive] = useState<MatchCategory | 'Tous'>('Tous');
  const { upcoming, results, loading, error } = useMatches(active);

  return (
    <section id="matches-results" aria-labelledby="matches-results-title" className="bg-mist pb-24 pt-12 sm:pt-14">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-8 border-b border-cloud pb-8">
            <p className="eyebrow mb-3 text-flame">Compétitions officielles</p>
            <h2 id="matches-results-title" className="section-title text-navy">Matchs & résultats</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-soft sm:text-base">
              Tous les matchs du club, toutes catégories confondues. Filtrez pour suivre votre équipe.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5" aria-label="Filtrer les matchs par catégorie">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(tab)}
                  className="pill"
                  data-active={active === tab}
                  aria-pressed={active === tab}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {loading ? (
          <MatchesLoader />
        ) : error ? (
          <p className="form-error rounded-xl px-5 py-4 text-center text-sm" role="alert">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <MatchColumn
              icon="calendar"
              title="À venir"
              accent="bg-royal"
              count={upcoming.length}
              matches={upcoming}
              emptyMsg="Aucun match à venir pour le moment. Le calendrier sera alimenté dès que les données FFF du club seront disponibles."
            />
            <MatchColumn
              icon="trophy"
              title="Résultats"
              accent="bg-flame"
              count={results.length}
              matches={results}
              emptyMsg="Aucun résultat enregistré pour le moment. Les scores officiels FFF s'afficheront ici dès la connexion API."
            />
          </div>
        )}
      </div>
    </section>
  );
}

function MatchesLoader() {
  return (
    <div className="flex items-center justify-center gap-2 py-24" role="status" aria-label="Chargement des matchs">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="h-3 w-3 animate-bounce rounded-full bg-flame"
          style={{ animationDelay: `${index * 0.15}s` }}
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
        <div className="mb-7 flex items-center gap-3">
          <span className={`grid h-11 w-11 place-items-center rounded-xl text-white ${accent}`}>
            <Icon name={icon} size={20} />
          </span>
          <h3 className="display-sm text-3xl text-navy">{title}</h3>
          <span className="chip border border-cloud bg-surface text-slate-soft nums">{count}</span>
        </div>
      </Reveal>
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {matches.map((match, index) => (
            <Reveal key={match.id} delay={(index % 4) * 0.07}>
              <MatchCard match={match} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="card p-10 text-center">
            <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-mist text-flame">
              <Icon name="ball" size={30} />
            </span>
            <p className="mb-6 text-slate-soft">{emptyMsg}</p>
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

