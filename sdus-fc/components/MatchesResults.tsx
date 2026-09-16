'use client';

import { useState } from 'react';
import MatchCard from '@/components/MatchCard';
import MatchesFreshness from '@/components/MatchesFreshness';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { useMatches } from '@/hooks/useMatches';
import { Match, MatchCategory } from '@/lib/types';
import { MATCHES_SOURCE_URL } from '@/lib/matches-feed';

const TABS: (MatchCategory | 'Tous')[] = ['Tous', 'U6-U9', 'U10-U13', 'U14-U17', 'U18-Seniors', 'Seniors', 'Vétérans'];

export default function MatchesResults() {
  const [active, setActive] = useState<MatchCategory | 'Tous'>('Tous');
  const { upcoming, results, pending, feed, loading, error, refetch } = useMatches(active);

  return (
    <section id="matches-results" aria-labelledby="matches-results-title" className="bg-mist pb-24 pt-12 sm:pt-14">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-8 border-b border-cloud pb-8">
            <p className="eyebrow mb-3 text-flame">Compétitions officielles</p>
            <h2 id="matches-results-title" className="section-title text-navy">Matchs & résultats</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-soft sm:text-base">
              Calendriers et scores publiés pour les équipes du club. Filtrez pour suivre votre équipe.
            </p>
            <div className="mt-5"><MatchesFreshness feed={feed} /></div>
            {feed && <p className="mt-2 text-xs text-slate-soft">Saison {feed.season}–{feed.season + 1} · {feed.teamCount} équipes référencées. Les plateaux non publiés sont à confirmer auprès des éducateurs.</p>}
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

        {error && <div className="mb-6 rounded-xl border border-cloud bg-surface px-5 py-4 text-sm text-slate-soft" role="status">
          {error}{' '}
          <button type="button" onClick={() => void refetch()} className="font-bold text-navy underline underline-offset-4">Réessayer</button>
        </div>}
        {loading && !feed ? (
          <MatchesLoader />
        ) : !feed ? (
          <p className="card p-8 text-center text-slate-soft">Le calendrier est momentanément indisponible.{' '}
            <a href={MATCHES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-navy underline underline-offset-4">Consulter la source</a>
          </p>
        ) : (
          <>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <MatchColumn
              key={`upcoming-${active}`}
              icon="calendar"
              title="À venir"
              accent="bg-royal"
              count={upcoming.length}
              matches={upcoming}
              emptyMsg="Aucun match à venir publié pour cette catégorie dans la source."
            />
            <MatchColumn
              key={`results-${active}`}
              icon="trophy"
              title="Résultats"
              accent="bg-flame"
              count={results.length}
              matches={results}
              emptyMsg="Aucun score publié pour cette catégorie cette saison."
            />
          </div>
          {pending.length > 0 && <div className="mt-12">
            <MatchColumn key={`pending-${active}`} icon="calendar" title="En attente · reports" accent="bg-royal"
              count={pending.length} matches={pending} emptyMsg="" />
          </div>}
          </>
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
          className="h-3 w-3 animate-bounce rounded-full bg-flame motion-reduce:animate-none"
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
  const [visibleCount, setVisibleCount] = useState(12);
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
          {matches.slice(0, visibleCount).map((match, index) => (
            <Reveal key={match.id} delay={(index % 4) * 0.07}>
              <MatchCard match={match} />
            </Reveal>
          ))}
          {matches.length > visibleCount && <button type="button" className="btn-outline justify-center"
            onClick={() => setVisibleCount((count) => count + 12)}>Voir plus de matchs ({visibleCount}/{matches.length})</button>}
        </div>
      ) : (
        <Reveal>
          <div className="card p-10 text-center">
            <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-mist text-flame">
              <Icon name="ball" size={30} />
            </span>
            <p className="mb-6 text-slate-soft">{emptyMsg}</p>
            <a href={MATCHES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="btn-outline group">
              Consulter la source
              <Icon
                name="arrow-right"
                size={16}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      )}
    </div>
  );
}
