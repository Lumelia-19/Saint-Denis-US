import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TacticalPattern from '@/components/TacticalPattern';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';

// Vrai cercle (pas ellipse), positions calculees sur le cercle
const ORBIT = 640;     // taille du conteneur carre de l'orbite (px)
const RADIUS = 260;    // rayon du cercle pointille
const NODE = 128;      // diametre de chaque bulle (lg:w-32 = 128px)
const C = ORBIT / 2;   // centre

function nodePos(angleDeg: number): CSSProperties {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${C + RADIUS * Math.cos(rad) - NODE / 2}px`,
    top: `${C + RADIUS * Math.sin(rad) - NODE / 2}px`,
  };
}

const NODES: { icon: IconName; title: string; angle: number }[] = [
  { icon: 'store', title: 'Commerces\nde proximité', angle: 235 },     // haut-gauche
  { icon: 'building', title: 'Entreprises\nlocales', angle: 305 },     // haut-droite
  { icon: 'institution', title: 'Collectivités\n& institutions', angle: 180 }, // gauche
  { icon: 'handshake', title: 'Acteurs\néconomiques', angle: 0 },      // droite
  { icon: 'users', title: 'Associations\n& citoyens', angle: 125 },    // bas-gauche
  { icon: 'graduation', title: 'Éducation\n& formation', angle: 55 },  // bas-droite
];

const BENEFITS: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: 'eye',
    title: 'Visibilité',
    desc: "Valorisez votre image auprès d'un public engagé, local et grandissant.",
  },
  {
    icon: 'map-pin',
    title: 'Territoire',
    desc: 'Associez votre marque au développement et à la dynamique de Saint-Denis.',
  },
  {
    icon: 'users',
    title: 'Jeunesse',
    desc: "Soutenez la formation, l'éducation et l'insertion par le sport de la nouvelle génération.",
  },
];

export const metadata: Metadata = {
  title: 'Partenaires & Sponsoring',
  description:
    "Devenez partenaire de l'UFSD et soutenez un club formateur, populaire et ancré à Saint-Denis.",
  alternates: { canonical: '/partenaires' },
  openGraph: {
    title: 'Partenaires & Sponsoring | United Football Saint-Denis',
    description: 'Soutenez un club formateur et ambitieux, engagé pour la jeunesse et le territoire de Saint-Denis.',
    url: '/partenaires',
    type: 'website',
  },
};

export default function PartenairesPage() {
  return (
    <section
      className="relative isolate overflow-hidden bg-white pt-20 pb-12 sm:pt-24 sm:pb-14 lg:pt-24 lg:pb-16 lg:min-h-screen"
      aria-labelledby="partenaires-title"
    >
      {/* ===== Background avec image skyline ===== */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/assets/sponsor-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_34%,rgba(255,255,255,0.56)_58%,rgba(255,255,255,0.18)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.3)_52%,rgba(27,58,140,0.18)_82%,rgba(255,255,255,0.96)_100%)]"
      />
      <TacticalPattern tone="onLight" className="z-[1] opacity-55" />

      <div className="relative z-10 mx-auto flex max-w-[1500px] flex-col px-5 sm:px-8 lg:block lg:min-h-[900px] lg:px-10 min-[1400px]:px-16">
        {/* ===== Stats (mobile: 2 colonnes compactes / desktop: absolute via lg:contents) ===== */}
        <div className="order-2 mt-2 grid grid-cols-2 gap-3 lg:contents">
        {/* ===== Stat 500+ JEUNES LICENCIÉS (gauche) ===== */}
        <Reveal delay={0.04} className="lg:absolute lg:left-[8%] lg:top-[36%] lg:w-[180px]">
          <div className="max-w-xs lg:mb-0">
            <span className="mb-3 grid h-11 w-11 place-items-center rounded-full border border-flame/30 bg-white/76 text-flame shadow-[0_18px_40px_-28px_rgba(13,27,75,0.55)] backdrop-blur sm:mb-4 sm:h-14 sm:w-14">
              <Icon name="users" size={24} />
            </span>
            <p className="nums text-[2rem] font-black italic leading-none text-royal sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
              500<span className="text-flame">+</span>
            </p>
            <p className="display-sm mt-1 text-base italic text-flame sm:text-xl lg:text-2xl">Jeunes licenciés</p>
            <p className="mt-3 hidden text-sm leading-relaxed text-deep/78 sm:block sm:mt-4">
              Un vivier de talents formés avec passion au cœur de Saint-Denis.
            </p>
          </div>
        </Reveal>

        {/* ===== Stat 1 STADE (droite) ===== */}
        <Reveal delay={0.1} className="lg:absolute lg:right-[8%] lg:top-[36%] lg:w-[180px]">
          <div className="max-w-xs lg:mb-0 lg:ml-auto">
            <span className="mb-3 grid h-11 w-11 place-items-center rounded-full border border-flame/30 bg-white/76 text-flame shadow-[0_18px_40px_-28px_rgba(13,27,75,0.55)] backdrop-blur sm:mb-4 sm:h-14 sm:w-14">
              <Icon name="target" size={24} />
            </span>
            <p className="nums text-[2rem] font-black italic leading-none text-royal sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
              1
              <span className="ml-2 align-middle text-xl not-italic text-royal sm:text-2xl">stade</span>
            </p>
            <p className="display-sm mt-1 text-base italic text-flame sm:text-xl lg:text-2xl">Au cœur de Saint-Denis</p>
            <p className="mt-3 hidden text-sm leading-relaxed text-deep/78 sm:block sm:mt-4">Le Stade de France, notre fierté, notre force.</p>
          </div>
        </Reveal>
        </div>

        {/* ===== Centre : Orbit (VRAI cercle) + titre ===== */}
        {/* Mobile : titre en haut (order-first), puis bulles en 2 colonnes. Desktop : carre 640px. */}
        <div className="relative order-1 mx-auto flex w-full max-w-[640px] flex-col items-center justify-center py-6 text-center lg:order-none lg:h-[640px] lg:w-[640px] lg:py-0">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
            viewBox={`0 0 ${ORBIT} ${ORBIT}`}
            aria-hidden="true"
          >
            <circle
              cx={C}
              cy={C}
              r={RADIUS}
              fill="none"
              stroke="rgba(27,58,140,0.58)"
              strokeWidth="2"
              strokeDasharray="7 8"
            />
            {[15, 65, 115, 195, 245, 295].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x = C + Math.cos(rad) * RADIUS;
              const y = C + Math.sin(rad) * RADIUS;
              return <circle key={deg} cx={x} cy={y} r="6" fill="white" stroke="#f26522" strokeWidth="2" />;
            })}
          </svg>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/54 blur-2xl lg:block"
          />

          {/* Mobile : grille 2 colonnes / desktop : bulles absolute (lg:contents) */}
          <div className="order-2 mt-6 grid w-full grid-cols-2 gap-2.5 lg:contents">
          {NODES.map((node) => (
            <div
              key={node.title}
              className="flex items-center gap-2.5 rounded-[1rem] border border-royal/20 bg-white/95 px-3 py-2.5 text-left shadow-[0_22px_44px_-30px_rgba(13,27,75,0.72)] backdrop-blur lg:absolute lg:z-10 lg:flex-col lg:justify-center lg:h-32 lg:w-32 lg:gap-1 lg:rounded-full lg:border-2 lg:border-royal lg:px-3 lg:py-3 lg:text-center lg:ring-4 lg:ring-white/70"
              style={nodePos(node.angle)}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-royal lg:h-auto lg:w-auto lg:shrink lg:bg-transparent">
                <Icon name={node.icon} size={22} strokeWidth={1.8} />
              </span>
              <p className="display-sm whitespace-pre-line text-[0.82rem] italic leading-[1] text-royal sm:text-sm lg:text-[0.78rem]">
                {node.title}
              </p>
            </div>
          ))}
          </div>

          <div className="relative z-20 order-first mx-auto max-w-md pt-2 lg:order-none lg:pt-0">
            <h1 id="partenaires-title" className="hero-title text-royal lg:text-[3.6rem]">
              Partenaires
              <br />
              <span className="text-flame">&amp; Sponsoring</span>
            </h1>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-deep/78 sm:text-[0.92rem]">
              Soutenez un club formateur et ambitieux, engagé pour la jeunesse, l&apos;inclusion et le rayonnement
              de Saint-Denis. Ensemble, construisons un avenir gagnant pour notre territoire.
            </p>
            <Link href="/contact" className="btn-primary group mt-6 min-w-0 sm:min-w-48 lg:min-w-52">
              Devenir partenaire
              <Icon
                name="arrow-right"
                size={18}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* ===== 3 cartes avantages ===== */}
        <div className="order-3 mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:absolute lg:bottom-10 lg:left-1/2 lg:mt-0 lg:w-[780px] lg:-translate-x-1/2 lg:grid-cols-3">
          {BENEFITS.map((item, i) => (
            <Reveal key={item.title} delay={0.32 + i * 0.08}>
              <Link
                href="/contact"
                className="group relative block h-full min-h-[120px] overflow-hidden rounded-[0.9rem] border border-royal/14 bg-white/96 p-4 shadow-[0_22px_54px_-34px_rgba(13,27,75,0.65)] backdrop-blur transition duration-300 hover:-translate-y-1 sm:min-h-[170px] sm:p-6"
              >
                <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-royal text-white shadow-[0_14px_28px_-18px_rgba(13,27,75,0.8)] transition-colors duration-300 group-hover:bg-flame sm:mb-4 sm:h-12 sm:w-12">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3 className="display-sm text-xl italic text-royal sm:text-2xl">{item.title}</h3>
                <div className="mt-2 mb-2.5 h-0.5 w-9 rounded-full bg-flame sm:mb-3" />
                <p className="pr-7 text-sm leading-relaxed text-slate-soft">{item.desc}</p>
                <Icon
                  name="arrow-right"
                  size={24}
                  strokeWidth={2}
                  className="absolute bottom-5 right-5 text-flame transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
