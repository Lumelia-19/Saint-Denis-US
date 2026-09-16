'use client';

import { useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import {
  TRAINING_DAYS,
  TRAINING_DAY_LABELS,
  TRAINING_SCHEDULE,
  TrainingDay,
} from '@/lib/training-schedule';

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function formatTime(value: string) {
  return value.replace(':', 'h');
}

export default function TrainingSchedule() {
  const [query, setQuery] = useState('');
  const [activeDay, setActiveDay] = useState<TrainingDay | null>(null);

  const filteredGroups = useMemo(() => {
    const normalizedQuery = normalize(query.trim());

    return TRAINING_SCHEDULE.map((group) => ({
      ...group,
      categories: group.categories.filter((category) => {
        const matchesQuery = !normalizedQuery || normalize(category.name).includes(normalizedQuery);
        const matchesDay = !activeDay || category.sessions.some((session) => session.day === activeDay);
        return matchesQuery && matchesDay;
      }),
    })).filter((group) => group.categories.length > 0);
  }, [activeDay, query]);

  const visibleCategoryCount = filteredGroups.reduce((count, group) => count + group.categories.length, 0);

  return (
    <section id="planning" aria-labelledby="planning-title" className="bg-mist pb-24 pt-12 sm:pt-14">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-8 flex flex-col gap-5 border-b border-cloud pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow mb-3 text-flame">Stade Auguste-Delaune · Saint-Denis</p>
              <h2 id="planning-title" className="section-title text-navy">Trouvez votre créneau</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-soft sm:text-base">
                Recherchez la catégorie de votre enfant ou filtrez les séances par jour.
              </p>
            </div>
            <span className="chip w-fit border border-cloud bg-surface text-slate-soft nums">
              {visibleCategoryCount} catégorie{visibleCategoryCount > 1 ? 's' : ''}
            </span>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-10 rounded-2xl border border-cloud bg-surface p-3 shadow-soft sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <label className="relative block min-w-0 flex-1">
                <span className="sr-only">Rechercher une catégorie</span>
                <Icon
                  name="search"
                  size={19}
                  strokeWidth={2}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-soft"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Catégorie de mon enfant, par exemple U12"
                  className="h-12 w-full rounded-xl border border-cloud bg-mist py-2 pl-11 pr-4 text-sm font-medium text-navy outline-none transition focus:border-azure focus:ring-4 focus:ring-azure/15"
                />
              </label>
              <div className="flex flex-wrap gap-2" aria-label="Filtrer les entraînements par jour">
                <button
                  type="button"
                  aria-pressed={activeDay === null}
                  onClick={() => setActiveDay(null)}
                  className="pill min-h-10 px-3.5 text-xs sm:px-4"
                  data-active={activeDay === null}
                >
                  Tous
                </button>
                {TRAINING_DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={activeDay === day}
                    onClick={() => setActiveDay(day)}
                    className="pill min-h-10 px-3.5 text-xs sm:px-4"
                    data-active={activeDay === day}
                  >
                    {TRAINING_DAY_LABELS[day]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite">
          {visibleCategoryCount} catégorie{visibleCategoryCount > 1 ? 's' : ''} affichée{visibleCategoryCount > 1 ? 's' : ''}.
        </p>

        {filteredGroups.length > 0 ? (
          <div className="space-y-12">
            {filteredGroups.map((group, groupIndex) => (
              <section key={group.name} aria-labelledby={`training-group-${groupIndex}`}>
                <Reveal delay={(groupIndex % 3) * 0.06}>
                  <div className="mb-5 flex items-center gap-4">
                    <h3 id={`training-group-${groupIndex}`} className="display-sm text-3xl text-navy sm:text-4xl">
                      {group.name}
                    </h3>
                    <span className="h-px flex-1 bg-cloud" />
                    <span className="hidden text-xs font-semibold text-slate-soft sm:block">
                      {group.categories.length} catégorie{group.categories.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </Reveal>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {group.categories.map((category, categoryIndex) => (
                    <Reveal key={category.name} delay={(categoryIndex % 3) * 0.05}>
                      <article className="relative h-full overflow-hidden rounded-2xl border border-cloud bg-surface p-5 shadow-soft">
                        <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-flame via-azure to-transparent" />
                        <h4 className="display-sm pr-8 text-2xl text-navy">{category.name}</h4>
                        <div className="mt-4 divide-y divide-cloud">
                          {category.sessions.map((session) => {
                            const faded = activeDay !== null && session.day !== activeDay;
                            return (
                              <div
                                key={`${session.day}-${session.start}-${session.pitch}`}
                                className={`grid grid-cols-[2.8rem_minmax(0,1fr)] gap-x-3 py-3 first:pt-0 last:pb-0 ${faded ? 'opacity-35' : ''}`}
                              >
                                <span className="pt-1 text-[0.68rem] font-extrabold tracking-[0.14em] text-flame">
                                  {TRAINING_DAY_LABELS[session.day].toUpperCase()}
                                </span>
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                    <p className="display-sm text-xl text-navy">
                                      {formatTime(session.start)} <span className="text-azure">→</span> {formatTime(session.end)}
                                    </p>
                                    <span className="rounded-md border border-cloud bg-mist px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-[0.08em] text-navy">
                                      {session.pitch}
                                    </span>
                                  </div>
                                  {session.note && <p className="mt-1 text-xs text-slate-soft">{session.note}</p>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-cloud bg-surface px-6 py-16 text-center shadow-soft">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mist text-flame">
                <Icon name="search" size={26} />
              </span>
              <h3 className="display-sm mt-5 text-2xl text-navy">Aucune catégorie trouvée</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-soft">
                Essayez « U10 », « Seniors » ou « Gardiens », ou réinitialisez le filtre de jour.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveDay(null);
                }}
                className="btn-outline mt-6"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-[1.45fr_1fr]">
            <aside className="rounded-2xl border border-cloud bg-surface p-6 shadow-soft">
              <div className="mb-4 flex items-center gap-3 text-flame">
                <Icon name="clock" size={21} />
                <h3 className="display-sm text-2xl text-navy">Bon à savoir</h3>
              </div>
              <ul className="space-y-3 pl-5 text-sm leading-relaxed text-slate-soft marker:text-flame">
                <li>Toutes les séances se déroulent au stade Auguste-Delaune. T2, T3 et T4 sont les terrains annexes ; le terrain d’honneur est indiqué en toutes lettres.</li>
                <li>Prévoyez une arrivée 15 minutes avant le début de l’entraînement et un départ à l’heure indiquée.</li>
                <li>Les groupes Élite et Espoir fonctionnent sur convocation de l’encadrement sportif.</li>
                <li>Les U17 et U18 sont répartis en groupes A et B : l’éducateur indique le groupe concerné.</li>
                <li>Toute modification est communiquée par l’éducateur et via la chaîne officielle du club.</li>
              </ul>
            </aside>
            <aside className="relative overflow-hidden rounded-2xl bg-mesh p-6 text-white shadow-lift">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-flame/30 blur-2xl" />
              <div className="relative">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-flame ring-1 ring-white/15">
                  <Icon name="users" size={21} />
                </span>
                <h3 className="display-sm mt-5 text-3xl">Football féminin & futsal</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Proposés en partenariat avec AB Saint-Denis. Renseignements auprès du club.
                </p>
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

