'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import MatchesResults from '@/components/MatchesResults';
import Reveal from '@/components/Reveal';
import TrainingSchedule from '@/components/TrainingSchedule';

type CalendarView = 'planning' | 'matches';

const VIEWS: { id: CalendarView; label: string }[] = [
  { id: 'planning', label: 'Planning entraînements' },
  { id: 'matches', label: 'Matchs & résultats' },
];

export default function CalendrierPage() {
  const [activeView, setActiveView] = useState<CalendarView>('planning');
  const isPlanning = activeView === 'planning';

  return (
    <>
      <section className="relative overflow-hidden bg-surface pb-12 pt-32 sm:pb-14">
        <div className="absolute inset-0 bg-grid-ink opacity-70" />
        <div className="absolute -right-20 top-16 h-72 w-72 rounded-full bg-flame/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-azure/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow mb-4 text-flame">Saison 2026 / 2027</p>
            <h1 className="hero-title max-w-4xl text-navy lg:text-[5.6rem]">
              {isPlanning ? (
                <>
                  Planning des <span className="text-flame">entraînements</span>
                </>
              ) : (
                <>
                  Calendrier & <span className="text-flame">résultats</span>
                </>
              )}
            </h1>
            <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-soft sm:text-lg">
              {isPlanning
                ? 'Retrouvez le jour, l’horaire et le terrain de la catégorie de votre enfant au stade Auguste-Delaune.'
                : 'Suivez les matchs et résultats du club, toutes catégories confondues.'}
            </p>
          </Reveal>

          <Reveal>
            <div
              className="mt-8 inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-cloud bg-panel p-1.5 shadow-soft"
              aria-label="Choisir le contenu du calendrier"
            >
              {VIEWS.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setActiveView(view.id)}
                  className={`min-h-11 shrink-0 rounded-xl px-4 text-sm font-bold transition-colors sm:px-5 ${
                    activeView === view.id ? 'bg-royal text-white shadow-sm' : 'text-slate-soft hover:bg-mist hover:text-navy'
                  }`}
                  data-active={activeView === view.id}
                  aria-pressed={activeView === view.id}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </Reveal>

          {isPlanning && (
            <Reveal>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-soft">
                <Icon name="map-pin" size={18} className="text-flame" />
                Stade Auguste-Delaune · Saint-Denis
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {isPlanning ? <TrainingSchedule /> : <MatchesResults />}
    </>
  );
}

