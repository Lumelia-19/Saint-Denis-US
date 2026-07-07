import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import TacticalPattern from '@/components/TacticalPattern';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';
import { CLUB, BUREAU, REFERENTS, ENCADREMENT } from '@/lib/club';

const TIMELINE: { year: string; icon: IconName; title: string; desc: string }[] = [
  { year: '', icon: 'flag', title: 'Héritage', desc: 'Le football dionysien, une tradition populaire au cœur du 93.' },
  { year: '2026', icon: 'sparkles', title: 'Naissance de l’UFSD', desc: 'AG constitutive du 18 mai 2026 : le club prend son autonomie et reprend la section football du SDUS.' },
  { year: '', icon: 'graduation', title: 'Projet', desc: '« L’excellence au service de la masse » : former, accompagner, inspirer.' },
  { year: '', icon: 'trophy', title: 'Ambition', desc: 'Objectif National pour l’équipe première, R1 pour la réserve.' },
];

const VALUES: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'star', title: 'Excellence', desc: 'Les meilleurs éducateurs au service de tous, du U6 à l’élite.' },
  { icon: 'graduation', title: 'Formation', desc: 'Un parcours sportif et scolaire pour chaque licencié.' },
  { icon: 'users', title: 'Inclusion', desc: 'Une école de football ouverte à tous, sans sélection à l’entrée.' },
];

export const metadata: Metadata = {
  title: 'Le Club',
  description:
    'Découvrez United Football Saint-Denis (UFSD) : son histoire, sa gouvernance et son projet « L’excellence au service de la masse ».',
  alternates: { canonical: '/club' },
  openGraph: {
    title: 'Le Club | UFSD',
    description: 'L’histoire, la gouvernance et le projet formateur de United Football Saint-Denis.',
    url: '/club',
    type: 'website',
  },
};

export default function ClubPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-surface pt-20 lg:pt-16" aria-labelledby="club-title">
        {/* ===== Motif décoratif tactique (remplace l'ancien filigrane logo) ===== */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <TacticalPattern tone="onLight" className="opacity-50" />
        </div>

        {/* ===== SVG clip path partagé pour le bandeau ===== */}
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <defs>
            <clipPath id="club-banner-wave" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1,0 L 1,1 C 0.62,1 0.3,0.55 0,0.55 L 0,0 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* ===== Bandeau (top, plein large, vague) ===== */}
        <div className="relative h-[28vh] min-h-[220px] w-full overflow-hidden lg:h-[34vh] lg:min-h-[280px]">
          <div className="absolute inset-0" style={{ clipPath: 'url(#club-banner-wave)' }}>
            <Image
              src="/assets/club_hero.webp"
              alt="Vue du Stade de France à Saint-Denis."
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* ===== Contenu principal ===== */}
        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_440px] lg:gap-14 lg:px-10 min-[1400px]:px-16">
          {/* ====== Colonne gauche ====== */}
          <div className="pt-4 lg:pt-6">
            <Reveal>
              <p className="eyebrow text-flame mb-4 animate-rise">Le Club · À propos</p>
              <h1
                id="club-title"
                className="hero-title text-navy animate-rise lg:text-[5.6rem]"
                style={{ animationDelay: '120ms' }}
              >
                Qui sommes-
                <span className="text-flame">nous ?</span>
              </h1>
              <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/82 sm:text-lg">
                {CLUB.name} (UFSD), c&apos;est plus qu&apos;un club : c&apos;est un projet de société.{' '}
                <strong className="font-extrabold text-navy">Formateur, populaire et ambitieux</strong>, né de la
                section football du SDUS, nous faisons grandir les talents et les valeurs au cœur de Saint-Denis, avec
                une conviction : <strong className="font-extrabold text-flame">l&apos;excellence au service de la masse</strong>.
              </p>
            </Reveal>

            {/* ===== Timeline horizontale ===== */}
            <div className="relative mt-14">
              <div
                aria-hidden="true"
                className="absolute left-6 right-6 top-8 hidden h-0.5 md:block"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, var(--color-flame) 0, var(--color-flame) 6px, transparent 6px, transparent 14px)',
                }}
              />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4">
                {TIMELINE.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div className="relative flex flex-col items-center text-center">
                      <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-royal text-white shadow-[0_18px_40px_-22px_rgba(13,27,75,0.85)] ring-[6px] ring-white">
                        <Icon name={item.icon} size={26} />
                      </span>
                      <p className="display-sm mt-5 text-2xl italic text-navy">
                        {item.year || item.title.toUpperCase()}
                      </p>
                      {item.year && (
                        <p className="mt-1 text-sm font-bold uppercase tracking-wide text-navy">{item.title}</p>
                      )}
                      <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-navy/72">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* ===== 3 cartes valeurs ===== */}
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08}>
                  <article className="group relative h-full overflow-hidden rounded-[1.15rem] border border-cloud bg-panel p-6 shadow-[0_22px_56px_-34px_rgba(13,27,75,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(13,27,75,0.7)]">
                    <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-royal text-white shadow-[0_14px_28px_-18px_rgba(13,27,75,0.8)] transition-colors duration-300 group-hover:bg-flame">
                      <Icon name={v.icon} size={22} />
                    </span>
                    <h3 className="display-sm text-[1.2rem] italic text-navy">{v.title}</h3>
                    <div className="mt-2 mb-3 h-0.5 w-9 rounded-full bg-flame" />
                    <p className="text-[0.82rem] leading-relaxed text-navy/72">{v.desc}</p>
                    <Icon
                      name="arrow-right"
                      size={22}
                      strokeWidth={2}
                      className="absolute bottom-5 right-5 text-flame transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <Link href="/projet" className="btn-primary mt-10">
                Découvrir le projet de club
                <Icon name="arrow-right" size={16} strokeWidth={2.4} />
              </Link>
            </Reveal>
          </div>

          {/* ====== Colonne droite : pilule ovale + citation ====== */}
          <div className="relative flex flex-col items-center gap-10 lg:items-end">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
              <TacticalPattern tone="onLight" className="opacity-60" />
            </div>

            <Reveal>
              <div
                className="relative h-[440px] w-[300px] overflow-hidden shadow-[0_40px_100px_-40px_rgba(13,27,75,0.65)] sm:h-[520px] sm:w-[360px] lg:-mt-44 lg:h-[600px] lg:w-[400px] xl:h-[640px] xl:w-[420px]"
                style={{ borderRadius: '50%' }}
              >
                <Image
                  src="/assets/hero_bg.jpeg"
                  alt="Joueurs de United Football Saint-Denis sur le terrain."
                  fill
                  priority
                  sizes="(min-width: 1280px) 420px, (min-width: 1024px) 400px, (min-width: 640px) 360px, 300px"
                  className="object-cover object-[55%_30%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,75,0)_55%,rgba(13,27,75,0.32)_100%)]" />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="section-title mt-2 max-w-[28rem] text-right text-navy lg:text-[2.1rem] lg:leading-[1.08] xl:text-[2.4rem]">
                Bleu et orange dans le <span className="text-flame">cœur</span>,
                <br />
                Saint-Denis comme <span className="text-flame">terrain</span>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====== Gouvernance ====== */}
      <section className="relative bg-surface py-20 lg:py-24" aria-labelledby="gov-title">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow text-flame mb-3">Structuration</p>
            <h2 id="gov-title" className="section-title text-navy">
              Une gouvernance <span className="text-gradient">autonome et resserrée</span>
            </h2>
            <p className="mt-4 max-w-2xl text-slate-soft">
              Constituée le 18 mai 2026, l&apos;association UFSD dispose de sa propre gouvernance, de son autonomie
              statutaire et budgétaire (affiliation n° {CLUB.affiliation}, {CLUB.ligue}).
            </p>
          </Reveal>

          <div className="mt-10">
            <h3 className="display-sm text-xl text-navy">Bureau Directeur</h3>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {BUREAU.map((m, i) => (
                <Reveal key={m.role} delay={i * 0.05}>
                  <article className="card card-hover h-full p-6">
                    <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-royal text-white">
                      <Icon name="shield" size={20} />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-flame">{m.role}</p>
                    <p className="display-sm mt-1 text-lg text-navy">{m.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-soft">{m.scope}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="display-sm text-xl text-navy">Référents Stratégie &amp; Réseau</h3>
              <ul className="mt-5 space-y-3">
                {REFERENTS.map((r) => (
                  <li key={r.role} className="card flex items-center gap-4 p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-flame text-white">
                      <Icon name="target" size={18} />
                    </span>
                    <div>
                      <p className="display-sm text-base text-navy">{r.name}</p>
                      <p className="text-sm text-slate-soft">{r.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="display-sm text-xl text-navy">Pôle Encadrement Sportif</h3>
              <ul className="mt-5 space-y-3">
                {ENCADREMENT.map((e) => (
                  <li key={e.role} className="card flex items-center gap-4 p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-royal text-white">
                      <Icon name="whistle" size={18} />
                    </span>
                    <div>
                      <p className="display-sm text-base text-navy">{e.name}</p>
                      <p className="text-sm text-slate-soft">{e.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
