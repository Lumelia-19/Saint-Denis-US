import type { CSSProperties } from 'react';
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

const ORBIT_DURATION = 32;

export default function PartenairesPage() {
  return (
    <>
      {/* ===================== HERO + ORBIT ===================== */}
      <section className="relative pt-36 pb-20 bg-mesh overflow-hidden">
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
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-mesh p-10">
              <StatCounter value={500} suffix="+" label="Jeunes licenciés" icon="users" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] bg-deep bg-grid p-10">
              <StatCounter value={1} suffix="" label="Stade au cœur de Saint-Denis" icon="map-pin" />
            </div>
          </Reveal>
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

      {/* ===================== CTA ===================== */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="rounded-[2.4rem] border border-cloud bg-mist px-8 py-14 text-center flex flex-col items-center">
              <h2 className="section-title text-navy">
                Devenez <span className="text-gradient">partenaire</span> du SDUS
              </h2>
              <p className="text-slate-soft mt-3 max-w-lg">
                Construisons ensemble un projet à votre image, à la hauteur de vos ambitions.
              </p>
              <Link href="/contact" className="btn-primary group mt-7">
                Devenir partenaire
                <Icon
                  name="arrow-right"
                  size={17}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
