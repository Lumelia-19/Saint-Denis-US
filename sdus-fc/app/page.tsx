import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import TacticalPattern from '@/components/TacticalPattern';
import MatchCard from '@/components/MatchCard';
import SectionTitle from '@/components/ui/SectionTitle';
import PartnerSponsoringSection from '@/components/PartnerSponsoringSection';
import StatCounter from '@/components/StatCounter';
import Icon, { type IconName } from '@/components/Icon';
import { fetchMatches } from '@/lib/matches';

const PILLARS: { icon: IconName; title: string; desc: string; href: string }[] = [
  {
    icon: 'graduation',
    title: 'Formation',
    desc: "Encadrer, transmettre, faire progresser. De l'école de foot aux seniors, chacun trouve sa place.",
    href: '/equipes',
  },
  {
    icon: 'users',
    title: 'Esprit collectif',
    desc: 'Respect, solidarité, dépassement de soi. Ici, le collectif fait la différence.',
    href: '/club',
  },
  {
    icon: 'trophy',
    title: 'Matchs & vie du club',
    desc: "Compétitions, événements, convivialité. Vibrez toute l'année avec le UFSD.",
    href: '/calendrier',
  },
];

const STATS: { value: number; suffix: string; label: string; icon: IconName }[] = [
  { value: 500, suffix: '+', label: 'Licenciés', icon: 'users' },
  { value: 12, suffix: '', label: 'Équipes', icon: 'shield' },
  { value: 30, suffix: ' ans', label: "D'histoire", icon: 'star' },
  { value: 1, suffix: '', label: 'Stade de France', icon: 'map-pin' },
];

const SPOTLIGHTS = [
  {
    image: '/assets/player_u6_u9.png',
    kicker: 'École de foot',
    title: 'U6 - U9',
    meta: 'Découverte + motricité',
    stat: '2 séances / semaine',
    desc: 'Premiers appuis, premiers repères, et le plaisir du ballon au centre de chaque séance.',
    href: '/equipes',
  },
  {
    image: '/assets/player_u10_13.png',
    kicker: 'Préformation',
    title: 'U10 - U13',
    meta: 'Technique + jeu collectif',
    stat: 'Plateaux & matchs',
    desc: 'Un cadre exigeant pour progresser techniquement, apprendre le jeu et grandir ensemble.',
    href: '/equipes',
  },
  {
    image: '/assets/club_hero.webp',
    kicker: 'Vie du club',
    title: 'Une maison bleue et orange',
    meta: 'Familles + bénévoles',
    stat: 'Depuis 1993',
    desc: 'Des éducateurs, des familles, des bénévoles et des joueurs réunis autour du même maillot.',
    href: '/club',
  },
];

export const metadata: Metadata = {
  title: { absolute: 'United Football Saint-Denis | UFSD - Club de foot à Saint-Denis (93)' },
  description:
    'United Football Saint-Denis : inscriptions, équipes, prochains matchs et actualités du UFSD. Club formateur, populaire et ambitieux depuis 1993.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const { upcoming } = await fetchMatches();

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative isolate min-h-screen overflow-hidden bg-surface md:min-h-[820px] lg:min-h-[820px] xl:min-h-screen">
        <Image
          src="/assets/hero_bg.jpeg"
          alt="Jeunes joueurs du UFSD entrant sur un terrain de football."
          fill
          priority
          className="object-cover object-[66%_50%] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-scrim)_92%,transparent)_0%,color-mix(in_srgb,var(--color-scrim)_82%,transparent)_52%,color-mix(in_srgb,var(--color-scrim)_22%,transparent)_100%)] md:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-scrim)_74%,transparent)_0%,color-mix(in_srgb,var(--color-scrim)_58%,transparent)_34%,color-mix(in_srgb,var(--color-scrim)_16%,transparent)_58%,color-mix(in_srgb,var(--color-scrim)_0%,transparent)_100%)] md:block" />
        <TacticalPattern tone="onLight" className="z-[1] opacity-80" />

        <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1420px] flex-col justify-center px-5 pt-28 pb-8 sm:min-h-[700px] sm:px-8 md:min-h-[760px] md:pb-16 lg:min-h-[820px] lg:px-10 lg:pt-32 lg:pb-36 xl:min-h-screen xl:px-12 xl:pb-40">
          <div className="max-w-[700px]">
            <div className="mb-5 h-1.5 w-20 rounded-full bg-flame animate-rise md:mb-6" style={{ animationDelay: '80ms' }} />
            <h1 className="hero-title text-navy drop-shadow-[0_10px_30px_rgba(255,255,255,0.35)] animate-rise" style={{ animationDelay: '150ms' }}>
              Saint-Denis
              <br />
              dans le cœur.
              <br />
              <span className="mt-2 block text-flame">Le football</span>
              <span className="block text-flame">dans les veines.</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[1.02rem] leading-relaxed text-navy/82 animate-rise sm:text-lg lg:mt-7" style={{ animationDelay: '310ms' }}>
              Le United Football Saint-Denis, c&apos;est plus qu&apos;un club : c&apos;est une famille.{' '}
              <strong className="font-extrabold text-navy">Formateur, populaire et ambitieux</strong>, nous
              faisons grandir les talents et les valeurs depuis 1993.
            </p>
            <div className="mt-7 flex flex-wrap gap-4 animate-rise lg:mt-8" style={{ animationDelay: '390ms' }}>
              <Link href="/inscriptions" className="btn-primary group min-w-44">
                S&apos;inscrire
                <Icon
                  name="arrow-right"
                  size={18}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link href="/equipes" className="btn-outline group min-w-44 bg-white/72 backdrop-blur">
                Voir les équipes
                <Icon
                  name="arrow-right"
                  size={18}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto grid max-w-[900px] grid-cols-1 gap-4 px-5 pb-8 sm:px-8 md:grid-cols-3 2xl:absolute 2xl:bottom-7 2xl:left-auto 2xl:right-20 2xl:px-0 2xl:pb-0">
          {PILLARS.map((p, i) => (
            <Link
              key={p.title}
              href={p.href}
              className="group relative overflow-hidden rounded-[1.15rem] border border-cloud bg-panel/94 p-5 shadow-[0_22px_60px_-28px_rgba(13,27,75,0.65)] backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_-34px_rgba(13,27,75,0.78)] xl:p-6"
              style={{ animationDelay: `${460 + i * 90}ms` }}
            >
              <span className="absolute inset-x-6 top-0 h-1 bg-flame" />
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-royal text-white shadow-[0_14px_24px_-16px_rgba(13,27,75,0.7)] ring-4 ring-flame/12 transition-colors duration-300 group-hover:bg-flame xl:mb-5 xl:h-14 xl:w-14">
                <Icon name={p.icon} size={23} />
              </span>
              <h3 className="display-sm text-[1.28rem] italic text-navy xl:text-[1.45rem]">{p.title}</h3>
              <div className="mt-2 mb-4 h-0.5 w-9 rounded-full bg-flame" />
              <p className="text-[0.82rem] leading-relaxed text-slate-soft xl:text-[0.86rem]">{p.desc}</p>
              <Icon
                name="arrow-right"
                size={25}
                strokeWidth={2}
                className="absolute bottom-5 right-5 text-flame transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ===================== FORMATION ===================== */}
      <section className="relative overflow-hidden bg-mist py-20 sm:py-24">
        <div className="absolute inset-0 bg-grid-ink opacity-70" />
        <div className="absolute -left-10 top-12 hidden text-[10rem] font-black uppercase leading-none text-royal/[0.035] lg:block" style={{ fontFamily: 'var(--font-display)' }}>
          Formation
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionTitle
              eyebrow="Au quotidien"
              blue="Un club qui"
              orange="fait grandir"
              subtitle="Des catégories lisibles, un cadre clair, et une progression pensée pour chaque âge."
            />
            <div className="max-w-2xl border-l-4 border-flame bg-panel/72 px-5 py-5 text-sm leading-relaxed text-slate-soft shadow-[0_18px_48px_-34px_rgba(13,27,75,0.45)] backdrop-blur">
              <strong className="text-navy">L&apos;expérience UFSD</strong>, c&apos;est un parcours complet :
              accueil des plus jeunes, préformation exigeante, éducateurs présents, matchs, tournois et vie de club.
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <Link
              href={SPOTLIGHTS[0].href}
              className="group relative min-h-[500px] overflow-hidden rounded-[1.35rem] bg-deep shadow-[0_30px_80px_-42px_rgba(13,27,75,0.85)]"
            >
              <Image
                src={SPOTLIGHTS[0].image}
                alt={`Jeune joueur du UFSD - ${SPOTLIGHTS[0].kicker} ${SPOTLIGHTS[0].title}`}
                fill
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,32,0.02)_0%,rgba(7,12,32,0.28)_45%,rgba(7,12,32,0.92)_100%)]" />
              <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-royal">
                {SPOTLIGHTS[0].kicker}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-sm font-bold uppercase text-flame">{SPOTLIGHTS[0].meta}</p>
                <h3 className="display-sm mt-2 text-5xl italic text-white sm:text-6xl">{SPOTLIGHTS[0].title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/76">{SPOTLIGHTS[0].desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-royal transition-colors duration-300 group-hover:bg-flame group-hover:text-white">
                  Découvrir la catégorie
                  <Icon name="arrow-right" size={15} strokeWidth={2.4} />
                </span>
              </div>
            </Link>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {SPOTLIGHTS.slice(1).map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative min-h-[240px] overflow-hidden rounded-[1.35rem] bg-deep shadow-[0_24px_70px_-42px_rgba(13,27,75,0.8)]"
                >
                  <Image
                    src={item.image}
                    alt={`Illustration UFSD - ${item.kicker} ${item.title}`}
                    fill
                    sizes="(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,12,32,0.88)_0%,rgba(7,12,32,0.48)_54%,rgba(7,12,32,0.04)_100%)]" />
                  <div className="relative z-10 flex h-full min-h-[240px] max-w-[72%] flex-col justify-end p-6">
                    <p className="text-[0.7rem] font-black uppercase tracking-[0.16em] text-flame">{item.kicker}</p>
                    <h3 className="display-sm mt-2 text-3xl italic text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/72">{item.desc}</p>
                    <p className="mt-5 inline-flex w-fit rounded-full border border-white/25 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/84">
                      {item.stat}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="relative overflow-hidden bg-mesh py-16 sm:py-20">
        <TacticalPattern />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="eyebrow mb-5 text-flame">Repères</p>
            <h2 className="section-title text-white">
              Le club en <span className="text-gradient">chiffres</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/64">
              Un club populaire, structuré et ancré à Saint-Denis, avec des catégories pour progresser toute l&apos;année.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center rounded-[1.1rem] border border-white/12 bg-white/[0.07] px-4 py-6 text-center backdrop-blur"
              >
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} animate={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== UPCOMING MATCHES ===================== */}
      <section className="relative overflow-hidden bg-surface py-20 sm:py-24">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-mist to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionTitle
              eyebrow="Saison 25/26"
              blue="Prochains"
              orange="matchs"
              subtitle="Les rendez-vous à venir pour suivre les équipes du club sur les terrains."
            />
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/calendrier" className="btn-outline group bg-white">
                Tout le calendrier
                <Icon
                  name="arrow-right"
                  size={16}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {upcoming.slice(0, 3).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      <PartnerSponsoringSection />

      {/* ===================== CTA ===================== */}
      <section className="bg-surface pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="relative grid overflow-hidden rounded-[2rem] bg-mesh lg:grid-cols-[0.92fr_1.08fr]">
            <TacticalPattern />
            <div className="relative min-h-[280px] lg:min-h-[420px]">
              <Image
                src="/assets/club_hero.webp"
                alt="Joueurs et éducateurs du UFSD réunis au club."
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-deep/25 via-deep/10 to-deep/78 lg:bg-gradient-to-r lg:from-transparent lg:to-deep/88" />
            </div>
            <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
              <p className="eyebrow mb-5 text-flame">Rejoignez l&apos;aventure</p>
              <h2 className="section-title max-w-2xl text-white">
                Prêt à porter le <span className="text-gradient">bleu &amp; orange</span> ?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
                Inscriptions ouvertes pour toutes les catégories, de l&apos;école de foot aux seniors. Le club vous
                accompagne pour trouver la bonne équipe et le bon créneau.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/inscriptions" className="btn-primary group">
                  Démarrer mon inscription
                  <Icon
                    name="arrow-right"
                    size={17}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
