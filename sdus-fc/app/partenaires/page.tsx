import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import TacticalPattern from '@/components/TacticalPattern';
import SectionTitle from '@/components/ui/SectionTitle';
import StatCounter from '@/components/StatCounter';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';

const NODES: { label: string; icon: IconName }[] = [
  { label: 'Commerces de proximité', icon: 'building' },
  { label: 'Entreprises locales', icon: 'flame' },
  { label: 'Collectivités & institutions', icon: 'shield' },
  { label: 'Acteurs économiques', icon: 'star' },
  { label: 'Éducation & formation', icon: 'graduation' },
  { label: 'Associations & citoyens', icon: 'users' },
];

const AVANTAGES: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'eye', title: 'Visibilité', desc: 'Votre marque exposée sur nos équipements, terrains et supports digitaux.' },
  { icon: 'map-pin', title: 'Territoire', desc: 'Un ancrage fort à Saint-Denis et un lien direct avec les habitants.' },
  { icon: 'flame', title: 'Jeunesse', desc: 'Associez votre image à plus de 500 jeunes et à des valeurs positives.' },
];

const OFFERS: { title: string; desc: string; points: string[]; icon: IconName }[] = [
  {
    title: 'Partenaire local',
    desc: 'Pour les commerces et entreprises qui veulent soutenir un projet visible sur le territoire.',
    points: ['Présence digitale', 'Visibilité événements', 'Mention club'],
    icon: 'store',
  },
  {
    title: 'Soutien formation',
    desc: "Pour financer l'équipement, les stages et l'accompagnement des jeunes joueurs.",
    points: ['Actions jeunesse', 'Reportage photo', 'Bilan de saison'],
    icon: 'graduation',
  },
  {
    title: 'Partenaire majeur',
    desc: 'Pour associer durablement votre image au développement du SDUS FC 93.',
    points: ['Activation sur mesure', 'Supports premium', 'Opérations terrain'],
    icon: 'handshake',
  },
];

const IMPACT_STATS: { value: number; suffix: string; label: string; icon: IconName }[] = [
  { value: 500, suffix: '+', label: 'Jeunes licenciés', icon: 'users' },
  { value: 12, suffix: '', label: 'Équipes engagées', icon: 'shield' },
  { value: 30, suffix: ' ans', label: "D'ancrage local", icon: 'star' },
  { value: 1, suffix: '', label: 'Stade emblématique', icon: 'map-pin' },
];

const ORBIT_DURATION = 32;

export const metadata: Metadata = {
  title: 'Partenaires & Sponsoring | Saint-Denis U.S. Football Club',
  description:
    'Devenez partenaire du SDUS FC 93 et soutenez un club formateur, populaire et ancré à Saint-Denis.',
};

export default function PartenairesPage() {
  return (
    <>
      {/* ===================== HERO + ORBIT ===================== */}
      <section className="relative pt-36 pb-20 bg-mesh overflow-hidden">
        <div className="absolute inset-0 opacity-[0.18]">
          <Image
            src="/assets/sponsor-bg.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-deep/86 via-deep/78 to-deep/96" />
        <TacticalPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow text-flame justify-center mb-4 animate-rise">Ensemble, plus forts</p>
            <h1 className="hero-title text-white animate-rise" style={{ animationDelay: '120ms' }}>
              Partenaires &amp;
              <br />
              <span className="text-gradient">Sponsoring</span>
            </h1>
            <p
              className="text-white/70 mt-5 leading-relaxed animate-rise"
              style={{ animationDelay: '200ms' }}
            >
              Un club, c&apos;est un écosystème. Rejoignez celles et ceux qui font grandir le SDUS FC.
            </p>
          </div>

          {/* Orbit — md and up */}
          <div className="relative hidden md:block h-[440px] mt-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-dashed border-flame/15" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-36 h-36 rounded-full bg-flame shadow-[var(--shadow-glow)]">
              <div className="absolute inset-0 rounded-full bg-flame/40 animate-pulse-ring" />
              <Image src="/assets/logo.png" alt="SDUS FC 93" width={84} height={84} className="relative h-20 w-auto" />
            </div>
            {NODES.map((node, i) => (
              <div
                key={node.label}
                className="orbit-node"
                style={
                  {
                    '--orbit-r': '150px',
                    animationDelay: `-${(ORBIT_DURATION / NODES.length) * i}s`,
                  } as CSSProperties
                }
              >
                <div className="-translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full glass grid place-items-center text-center p-3">
                  <Icon name={node.icon} size={20} className="text-flame mb-1" />
                  <span className="text-white text-[0.66rem] font-semibold leading-tight">{node.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Grid — mobile */}
          <div className="grid grid-cols-2 gap-3 mt-10 md:hidden">
            {NODES.map((node) => (
              <div key={node.label} className="glass rounded-2xl p-4 flex flex-col items-center text-center gap-1">
                <Icon name={node.icon} size={20} className="text-flame" />
                <span className="text-white text-xs font-semibold leading-tight">{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="relative -mt-10 bg-surface pb-20">
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 lg:grid-cols-4">
          {IMPACT_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <div className="relative overflow-hidden rounded-[1.25rem] bg-mesh px-5 py-7 shadow-[0_24px_70px_-40px_rgba(13,27,75,0.7)]">
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} icon={stat.icon} animate={false} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== AVANTAGES ===================== */}
      <section className="py-20 bg-mist">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Pourquoi nous soutenir"
              blue="Un partenariat"
              orange="qui a du sens"
              center
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {AVANTAGES.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1}>
                <div className="card card-hover group p-8 text-center h-full flex flex-col items-center">
                  <span className="grid place-items-center w-16 h-16 rounded-2xl bg-deep text-flame mb-6 transition-colors duration-300 group-hover:bg-flame group-hover:text-white">
                    <Icon name={a.icon} size={28} />
                  </span>
                  <h3 className="display-sm text-xl text-navy mb-3">{a.title}</h3>
                  <p className="text-slate-soft text-sm leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OFFRES ===================== */}
      <section className="relative overflow-hidden bg-surface py-20">
        <div className="absolute inset-0 bg-grid-ink opacity-70" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <SectionTitle
                eyebrow="Offres partenaires"
                blue="Choisir le bon"
                orange="niveau d'engagement"
                subtitle="Une base claire, puis une activation adaptée à votre image, votre budget et votre présence locale."
              />
              <div className="rounded-[1.35rem] border border-cloud bg-white px-6 py-5 text-sm leading-relaxed text-slate-soft shadow-[0_18px_48px_-34px_rgba(13,27,75,0.45)]">
                <strong className="text-royal">Chaque partenariat doit être utile.</strong> Visibilité, jeunesse,
                territoire : le club privilégie des actions simples à comprendre et faciles à valoriser.
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {OFFERS.map((offer, i) => (
              <Reveal key={offer.title} delay={i * 0.08}>
                <article className="card card-hover flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-royal text-white">
                      <Icon name={offer.icon} size={26} />
                    </span>
                    <span className="display-sm text-3xl text-flame/70">0{i + 1}</span>
                  </div>
                  <h3 className="display-sm mt-7 text-3xl italic text-navy">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-soft">{offer.desc}</p>
                  <ul className="mt-7 space-y-3">
                    {offer.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm font-semibold text-navy">
                        <span className="grid h-6 w-6 place-items-center rounded-full border border-flame text-flame">
                          <Icon name="check" size={14} strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-outline group mt-8 w-full">
                    Discuter de cette offre
                    <Icon name="arrow-right" size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="bg-mist py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="relative grid overflow-hidden rounded-[2rem] bg-mesh lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[260px]">
                <Image
                  src="/assets/sponsor-bg.webp"
                  alt="Vue du territoire de Saint-Denis autour du stade."
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-deep/10 to-deep/82" />
              </div>
              <div className="relative z-10 flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-14">
                <p className="eyebrow mb-5 text-flame">Passer à l&apos;action</p>
                <h2 className="section-title max-w-xl text-white">
                  Construire un partenariat utile au club et au territoire
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/68">
                  Une proposition claire, des contreparties lisibles, et des actions que vos équipes comme les
                  familles du club peuvent comprendre.
                </p>
                <Link href="/contact" className="btn-primary group mt-8 w-fit">
                  Devenir partenaire
                  <Icon
                    name="arrow-right"
                    size={17}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
