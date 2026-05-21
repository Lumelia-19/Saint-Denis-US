import Image from 'next/image';
import Link from 'next/link';
import TacticalPattern from '@/components/TacticalPattern';
import StatCounter from '@/components/StatCounter';
import MatchCard from '@/components/MatchCard';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/Reveal';
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
    desc: "Compétitions, événements, convivialité. Vibrez toute l'année avec le SDUS.",
    href: '/calendrier',
  },
];

const STATS: { value: number; suffix: string; label: string; icon: IconName }[] = [
  { value: 500, suffix: '+', label: 'Licenciés', icon: 'users' },
  { value: 12, suffix: '', label: 'Équipes', icon: 'shield' },
  { value: 30, suffix: ' ans', label: "D'histoire", icon: 'star' },
  { value: 1, suffix: '', label: 'Stade de France', icon: 'map-pin' },
];

export default async function HomePage() {
  const { upcoming } = await fetchMatches();

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image src="/assets/hero_bg.jpeg" alt="" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/96 via-deep/82 to-deep/35" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <TacticalPattern />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-32 w-full">
          <div className="max-w-3xl">
            <p
              className="eyebrow text-flame mb-6 animate-rise"
              style={{ animationDelay: '80ms' }}
            >
              Saint-Denis U.S. Football Club · 93
            </p>
            <h1 className="hero-title text-white animate-rise" style={{ animationDelay: '160ms' }}>
              Saint-Denis
              <br />
              dans le cœur.
            </h1>
            <h1
              className="hero-title text-gradient mt-1 animate-rise"
              style={{ animationDelay: '240ms' }}
            >
              Le football
              <br />
              dans les veines.
            </h1>
            <p
              className="text-white/75 text-lg max-w-xl mt-7 leading-relaxed animate-rise"
              style={{ animationDelay: '320ms' }}
            >
              Plus qu&apos;un club, une famille.{' '}
              <strong className="text-white font-semibold">Formateur, populaire et ambitieux</strong>, nous
              faisons grandir les talents et les valeurs depuis 1993.
            </p>
            <div className="flex flex-wrap gap-4 mt-9 animate-rise" style={{ animationDelay: '400ms' }}>
              <Link href="/inscriptions" className="btn-primary group">
                S&apos;inscrire au club
                <Icon
                  name="arrow-right"
                  size={17}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link href="/equipes" className="btn-ghost group">
                Voir les équipes
                <Icon
                  name="arrow-up-right"
                  size={17}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/45">
          <span className="text-[0.62rem] uppercase tracking-[0.26em]">Découvrir</span>
          <Icon name="chevron-down" size={20} className="animate-float" />
        </div>
      </section>

      {/* ===================== PILLARS ===================== */}
      <section className="relative py-24 bg-mist overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="L'ADN du club"
              blue="Ce qui nous"
              orange="rassemble"
              subtitle="Trois piliers qui font du SDUS FC un lieu de passion, de progrès et de partage."
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <Link
                  href={p.href}
                  className="card card-hover sheen group p-8 h-full flex flex-col items-start"
                >
                  <span className="grid place-items-center w-16 h-16 rounded-2xl bg-deep text-flame mb-6 transition-colors duration-300 group-hover:bg-flame group-hover:text-white">
                    <Icon name={p.icon} size={28} />
                  </span>
                  <h3 className="display-sm text-2xl text-navy mb-3">{p.title}</h3>
                  <p className="text-slate-soft text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-flame font-semibold text-sm">
                    Découvrir
                    <Icon
                      name="arrow-right"
                      size={15}
                      strokeWidth={2.4}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="relative py-20 bg-mesh overflow-hidden">
        <TacticalPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== UPCOMING MATCHES ===================== */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle eyebrow="Saison 25/26" blue="Prochains" orange="matchs" />
              <Link
                href="/calendrier"
                className="hidden sm:inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:text-flame transition-colors group"
              >
                Tout le calendrier
                <Icon
                  name="arrow-right"
                  size={15}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {upcoming.slice(0, 3).map((match, i) => (
              <Reveal key={match.id} delay={i * 0.1}>
                <MatchCard match={match} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="text-center mt-10 sm:hidden">
              <Link href="/calendrier" className="btn-outline">
                Tout le calendrier
                <Icon name="arrow-right" size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="pb-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.4rem] bg-mesh px-8 py-16 sm:px-16 text-center">
              <TacticalPattern />
              <div className="relative z-10 max-w-2xl mx-auto">
                <p className="eyebrow text-flame justify-center mb-5">Rejoignez l&apos;aventure</p>
                <h2 className="section-title text-white">
                  Prêt à porter le <span className="text-gradient">bleu &amp; orange</span> ?
                </h2>
                <p className="text-white/70 mt-4 leading-relaxed">
                  Inscriptions ouvertes pour toutes les catégories, de l&apos;école de foot aux seniors.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
