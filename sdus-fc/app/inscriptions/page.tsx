import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon, { type IconName } from '@/components/Icon';

// Perforation reelle : trous semi-circulaires decoupes sur les bords gauche
// et droit via mask-image. Les tickets sont colles bord a bord et les demi
// cercles d'un ticket se completent avec ceux du voisin pour former un cercle.
const TICKET_PERF: CSSProperties = {
  WebkitMaskImage:
    'radial-gradient(circle 6px at 0 12px, transparent 5.5px, black 6px), radial-gradient(circle 6px at 100% 12px, transparent 5.5px, black 6px)',
  WebkitMaskSize: '100% 24px, 100% 24px',
  WebkitMaskPosition: '0 0, 0 0',
  WebkitMaskRepeat: 'repeat-y, repeat-y',
  WebkitMaskComposite: 'source-in',
  maskImage:
    'radial-gradient(circle 6px at 0 12px, transparent 5.5px, black 6px), radial-gradient(circle 6px at 100% 12px, transparent 5.5px, black 6px)',
  maskSize: '100% 24px, 100% 24px',
  maskPosition: '0 0, 0 0',
  maskRepeat: 'repeat-y, repeat-y',
  maskComposite: 'intersect',
};

const REQUIREMENTS = [
  "Formulaire d'inscription dûment rempli",
  "Photo d'identité (format officiel)",
  'Certificat médical de non contre-indication',
  'Justificatif de domicile (moins de 3 mois)',
];

const STEPS: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: 'users',
    title: 'Choisir sa catégorie',
    desc: "Sélectionnez la catégorie correspondant à l'âge et au niveau du joueur.",
  },
  {
    icon: 'folder',
    title: 'Préparer son dossier',
    desc: 'Rassemblez les pièces demandées pour constituer un dossier complet.',
  },
  {
    icon: 'send',
    title: 'Envoyer sa demande',
    desc: 'Envoyez votre dossier en ligne et recevez une confirmation par email.',
  },
];

const OFFERS: { icon: IconName; title: string; desc: string; cta: string }[] = [
  {
    icon: 'search',
    title: 'Détections',
    desc: "Intégrez nos détections et tentez de rejoindre l'aventure UFSD.",
    cta: 'Demander une détection',
  },
  {
    icon: 'runner',
    title: 'Stages vacances',
    desc: 'Progressez pendant les vacances avec nos stages accessibles à tous les niveaux.',
    cta: 'Découvrir les stages',
  },
];

// US-013 : prochaines dates de détection / stage (saison 2026/2027).
const EVENTS: { icon: IconName; date: string; period: string; title: string; desc: string }[] = [
  {
    icon: 'search',
    date: '12 sept. 2026',
    period: 'Samedi · 10h – 12h',
    title: 'Détection de rentrée',
    desc: "Session ouverte aux U13 – U17 au Stade Marville. Venir avec équipement et certificat médical.",
  },
  {
    icon: 'calendar',
    date: '24 oct. – 1er nov. 2026',
    period: 'Vacances de la Toussaint',
    title: 'Stage de la Toussaint',
    desc: "Stage de 5 jours accessible à tous les niveaux, encadré par nos éducateurs diplômés.",
  },
  {
    icon: 'search',
    date: '7 fév. 2027',
    period: 'Dimanche · 14h – 16h',
    title: 'Détection hivernale',
    desc: "Nouvelle session de détection mi-saison. Inscription recommandée en amont via le formulaire.",
  },
];

export const metadata: Metadata = {
  title: 'Inscriptions | UFSD',
  description:
    "Rejoignez l'United Football Saint-Denis (UFSD) : inscriptions en ligne, détections, stages et pièces à fournir pour la saison 2026/2027.",
  alternates: { canonical: '/inscriptions' },
  openGraph: {
    title: 'Rejoindre le club | UFSD',
    description: "Inscriptions, détections et stages - saison 2026/2027 de l'United Football Saint-Denis.",
    url: '/inscriptions',
    type: 'website',
  },
};

function TacticalDecor() {
  return (
    <>
      <svg
        className="pointer-events-none absolute right-4 top-24 hidden h-64 w-64 text-white lg:block"
        viewBox="0 0 260 260"
        aria-hidden="true"
      >
        <circle cx="190" cy="38" r="14" fill="none" stroke="#fff" strokeWidth="6" />
        <circle cx="204" cy="106" r="14" fill="none" stroke="#f26522" strokeWidth="6" />
        <path d="M202 56c42 44 40 104 3 150" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="12 14" strokeLinecap="round" />
        <path d="M78 74l24 24M102 74 78 98M82 150l24 24M106 150l-24 24" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <path d="m170 70 18-16M188 54l2 24M174 202l-22 10M152 212l16 16" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-2 left-0 h-44 w-80 text-flame sm:w-[32rem]"
        viewBox="0 0 520 190"
        aria-hidden="true"
      >
        <path d="M4 156c82-48 182-54 304-21" fill="none" stroke="#f26522" strokeWidth="5" strokeLinecap="round" />
        <path d="M20 166c94-30 182-28 292 2" fill="none" stroke="#1b3a8c" strokeWidth="3" strokeLinecap="round" opacity=".85" />
        <path d="M226 70c44-20 90-22 142 0" fill="none" stroke="#f26522" strokeWidth="3" strokeDasharray="9 14" strokeLinecap="round" />
        <path d="m360 56 24 17-29 11" fill="none" stroke="#f26522" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="72" cy="118" r="13" fill="none" stroke="#fff" strokeWidth="6" />
        <path d="M112 110l20 20M132 110l-20 20M206 126l17 17M223 126l-17 17" stroke="#f26522" strokeWidth="6" strokeLinecap="round" />
        <path d="M300 122l17 17M317 122l-17 17" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </>
  );
}

export default function InscriptionsPage() {
  return (
    <section className="relative overflow-hidden bg-surface" aria-labelledby="inscriptions-title">
      <div className="relative isolate min-h-screen overflow-hidden pt-28 lg:pt-24">
        <Image
          src="/assets/inscriptions-bg.webp"
          alt="Jeune joueur de l'UFSD en action pendant une séance d'entraînement."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[42%_18%] lg:object-[55%_15%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-scrim)_96%,transparent)_0%,color-mix(in_srgb,var(--color-scrim)_86%,transparent)_30%,color-mix(in_srgb,var(--color-scrim)_28%,transparent)_54%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-scrim)_42%,transparent)_0%,transparent_36%,transparent_58%,color-mix(in_srgb,var(--color-scrim)_82%,transparent)_100%)]" />
        <TacticalDecor />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1536px] grid-rows-[auto_1fr] px-5 pb-8 sm:px-8 lg:px-10 min-[1400px]:px-24">
          <div className="grid items-start gap-7 lg:grid-cols-[500px_180px_1fr] min-[1400px]:grid-cols-[540px_190px_1fr]">
            <div className="max-w-[620px] pt-12 lg:pt-24">
              <h1 id="inscriptions-title" className="hero-title text-navy lg:text-[6.95rem]">
                Rejoindre
                <br />
                <span className="text-flame">le club.</span>
              </h1>
              <p className="mt-4 text-xl font-semibold text-navy sm:text-2xl">
                Inscriptions, Détections &amp; Stages.
              </p>
            </div>

            <div className="hidden h-48 w-48 place-items-center rounded-full border-4 border-flame bg-royal text-center text-white shadow-[0_24px_60px_-30px_rgba(13,27,75,0.75)] lg:mt-28 lg:grid">
              <p className="display-sm italic leading-[1]">
                <span className="block text-lg tracking-wide">Saison</span>
                <span className="mt-1 block text-5xl">2026</span>
                <span className="block text-base text-flame">/</span>
                <span className="block text-5xl text-flame">2027</span>
              </p>
            </div>

            <div className="hidden lg:block" />
          </div>

          <div className="mt-6 grid items-start gap-5 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_280px] min-[1400px]:grid-cols-[minmax(0,1fr)_300px]">
            {/* === Strip de 4 tickets attachés === */}
            {/* Pas de gap : les demi cercles d'un ticket completent ceux du voisin */}
            <div className="grid gap-y-3 sm:grid-cols-[230px_repeat(3,minmax(0,1fr))] sm:gap-x-0 min-[1400px]:grid-cols-[250px_repeat(3,minmax(0,1fr))]">
              {/* Ticket 1 : Pièces à fournir (bleu) */}
              <aside
                className="relative rounded-[1.1rem] bg-royal px-6 py-6 text-white shadow-[0_24px_60px_-28px_rgba(13,27,75,0.55)]"
                style={TICKET_PERF}
              >
                <div className="mb-5 h-1.5 w-20 rounded-full bg-flame" />
                <h2 className="display-sm text-[1.45rem] italic">Pièces à fournir</h2>
                <ul className="mt-5 space-y-3.5">
                  {REQUIREMENTS.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.8rem] font-semibold leading-snug text-white/90">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-flame text-flame">
                        <Icon name="check" size={14} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Tickets 2, 3, 4 : étapes */}
              {STEPS.map((step, i) => (
                <article
                  key={step.title}
                  className="relative rounded-[1.1rem] bg-panel/80 px-4 py-5 shadow-[0_24px_60px_-32px_rgba(13,27,75,0.45)] backdrop-blur min-[1400px]:px-5 min-[1400px]:py-6"
                  style={TICKET_PERF}
                >
                  <div className="flex items-center gap-3 min-h-14 min-[1400px]:gap-4">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-royal text-xl font-black italic text-white min-[1400px]:h-14 min-[1400px]:w-14 min-[1400px]:text-2xl"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="display-sm text-[0.92rem] italic leading-tight text-navy min-[1400px]:text-[1.05rem]">
                      {step.title.split(' ').slice(0, 1).join(' ').toUpperCase()}
                      <span className="block text-[0.84rem] not-italic font-bold tracking-wide text-navy/85 min-[1400px]:text-[0.92rem]">
                        {step.title.split(' ').slice(1).join(' ').toUpperCase()}
                      </span>
                    </h3>
                  </div>
                  <div className="mx-auto my-3 grid h-[4.5rem] w-[4.5rem] place-items-center text-flame min-[1400px]:my-4 min-[1400px]:h-20 min-[1400px]:w-20">
                    <Icon name={step.icon} size={72} strokeWidth={1.6} />
                  </div>
                  <p className="mx-auto max-w-[210px] text-center text-[0.74rem] leading-relaxed text-navy/78 min-[1400px]:text-[0.8rem]">
                    {step.desc}
                  </p>
                  {i < STEPS.length - 1 && (
                    <svg
                      className="pointer-events-none absolute right-[-30px] top-1/2 z-10 hidden h-9 w-16 -translate-y-1/2 sm:block"
                      viewBox="0 0 80 40"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 25c22-13 42-13 62 0"
                        fill="none"
                        stroke="#f26522"
                        strokeWidth="3"
                        strokeDasharray="9 12"
                        strokeLinecap="round"
                      />
                      <path
                        d="m58 10 17 15-21 8"
                        fill="none"
                        stroke="#f26522"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="absolute bottom-4 left-1/2 h-6 w-32 -translate-x-1/2 bg-[radial-gradient(circle,#f26522_1.7px,transparent_2px)] [background-size:14px_10px]" />
                </article>
              ))}

              {/* === CTA central (sous le strip) === */}
              <div className="mt-4 flex flex-col items-center gap-5 sm:col-span-full lg:flex-row lg:justify-center">
                <Link href="/inscriptions/formulaire" className="btn-primary group min-w-56">
                  S&apos;inscrire
                  <Icon
                    name="arrow-right"
                    size={18}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <div className="flex items-center gap-3 text-sm font-bold uppercase text-navy">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-royal text-white">
                    <Icon name="shield" size={20} />
                  </span>
                  <span>
                    Procédure 100% en ligne
                    <span className="block text-xs font-semibold text-navy/60">Simple, rapide et sécurisée.</span>
                  </span>
                </div>
              </div>
            </div>

            {/* === Sidebar droite : Détections + Stages === */}
            <div className="grid gap-5">
              {OFFERS.map((offer) => (
                <article
                  key={offer.title}
                  className="rounded-[1.15rem] bg-panel/80 p-5 shadow-[0_22px_56px_-34px_rgba(13,27,75,0.55)] backdrop-blur"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-royal text-white">
                      <Icon name={offer.icon} size={28} strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 className="display-sm text-[1.35rem] italic text-navy">{offer.title}</h3>
                      <p className="mt-1.5 text-[0.8rem] leading-relaxed text-navy/74">{offer.desc}</p>
                    </div>
                  </div>
                  <Link href="/inscriptions/formulaire" className="btn-primary group mt-4 w-full justify-between px-6 py-2.5 text-sm">
                    {offer.cta}
                    <Icon name="arrow-right" size={18} strokeWidth={2.4} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* === Détections & Stages (US-013) === */}
        <div className="relative z-10 mx-auto max-w-[1536px] px-5 pb-16 sm:px-8 lg:px-10 min-[1400px]:px-24">
          <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-flame mb-3">Saison 2026 / 2027</p>
              <h2 className="display-sm text-3xl italic text-navy sm:text-4xl lg:text-[2.7rem]">
                Détections &amp; Stages à venir
              </h2>
              <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
            </div>
            <Link href="/inscriptions/formulaire" className="btn-outline group self-start lg:self-auto">
              S&apos;inscrire à une session
              <Icon
                name="arrow-right"
                size={18}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((ev) => (
              <article
                key={ev.title}
                className="card card-hover p-6 flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-royal text-white">
                    <Icon name={ev.icon} size={24} strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-flame">{ev.date}</p>
                    <p className="text-xs font-semibold text-navy/60">{ev.period}</p>
                  </div>
                </div>
                <h3 className="display-sm text-xl italic text-navy mt-4">{ev.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-soft">{ev.desc}</p>
                <Link
                  href="/inscriptions/formulaire"
                  className="btn-ghost group mt-5 self-start px-0 text-sm text-navy"
                >
                  Je m&apos;inscris
                  <Icon
                    name="arrow-right"
                    size={16}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
