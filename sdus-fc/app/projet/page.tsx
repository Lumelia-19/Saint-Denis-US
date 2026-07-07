import Link from 'next/link';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';
import { CLUB, PILIERS, PARTNER_TRACKS } from '@/lib/club';

export const metadata: Metadata = {
  title: 'Projet de club',
  description:
    'Le projet de United Football Saint-Denis : « L’excellence au service de la masse ». Quatre piliers, un réseau de partenariats et une ambition sportive et sociale.',
  alternates: { canonical: '/projet' },
  openGraph: {
    title: 'Projet de club | UFSD',
    description: 'L’excellence au service de la masse : former, accompagner, inspirer.',
    url: '/projet',
    type: 'website',
  },
};

const PILIER_ICONS: IconName[] = ['users', 'whistle', 'target', 'graduation'];

const AMBITIONS: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'users', title: 'Croissance maîtrisée', desc: 'Développer les effectifs dans le respect de la capacité d’accueil et de la qualité d’encadrement.' },
  { icon: 'trophy', title: 'Montée en gamme', desc: 'Faire progresser jeunes et seniors vers les niveaux régional et national.' },
  { icon: 'graduation', title: 'Accompagnement pour tous', desc: 'Intégrer le suivi scolaire à l’ensemble des licenciés, et non plus à un public restreint.' },
  { icon: 'handshake', title: 'Modèle équilibré', desc: 'Financer un encadrement de qualité, en partie via des dispositifs d’insertion (alternance, Service Civique).' },
];

export default function ProjetPage() {
  return (
    <>
      {/* ===== Héro ===== */}
      <section className="relative bg-mesh text-white">
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <Reveal>
            <p className="eyebrow text-flame mb-4">Projet de club 2025-2030</p>
            <h1 className="hero-title max-w-4xl">
              L&apos;excellence au <span className="text-gradient">service de la masse</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {CLUB.motto}. La réussite de quelques-uns doit servir la réussite de tous : chaque enfant de Saint-Denis
              doit pouvoir se dire « ce club croit en moi » - sur le terrain, à l&apos;école, et dans la vie.
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-flame">{CLUB.slogan}</p>
          </Reveal>
        </div>
      </section>

      {/* ===== 4 piliers ===== */}
      <section className="relative bg-surface py-20 lg:py-24" aria-labelledby="piliers-title">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow text-flame mb-3">La méthode</p>
            <h2 id="piliers-title" className="section-title text-navy">Les quatre piliers</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PILIERS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <article className="card h-full p-7 lg:p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-royal text-white">
                      <Icon name={PILIER_ICONS[i] ?? 'star'} size={24} />
                    </span>
                    <h3 className="display-sm text-xl text-navy">{p.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-soft">{p.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-navy/85">
                        <Icon name="check" size={17} strokeWidth={2.4} className="mt-0.5 shrink-0 text-flame" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Réseau de partenariats ===== */}
      <section className="relative bg-mist py-20 lg:py-24" aria-labelledby="partners-title">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow text-flame mb-3">Plusieurs bras, un même objectif</p>
            <h2 id="partners-title" className="section-title text-navy">Un réseau de partenariats structuré</h2>
            <p className="mt-4 max-w-2xl text-slate-soft">
              Chaque volet du projet s&apos;appuie sur des partenaires complémentaires apportant leur expertise.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TRACKS.map((t, i) => (
              <Reveal key={t.volet} delay={i * 0.04}>
                <article className="card card-hover h-full p-6">
                  <p className="display-sm text-lg text-navy">{t.volet}</p>
                  <div className="mt-2 mb-3 h-0.5 w-9 rounded-full bg-flame" />
                  <p className="text-sm leading-relaxed text-slate-soft">{t.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Ambitions & modèle ===== */}
      <section className="relative bg-surface py-20 lg:py-24" aria-labelledby="ambitions-title">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow text-flame mb-3">Trajectoire</p>
            <h2 id="ambitions-title" className="section-title text-navy">Ambitions &amp; modèle de développement</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AMBITIONS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <article className="card h-full p-6">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-flame text-white">
                    <Icon name={a.icon} size={20} />
                  </span>
                  <h3 className="display-sm text-base text-navy">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-soft">{a.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-mesh text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:py-24">
          <Reveal>
            <h2 className="section-title">Rejoignez le projet</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Un club de quartier peut être à la fois un accélérateur de talents et un acteur de cohésion sociale.
              Prenez part à l&apos;aventure.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/inscriptions" className="btn-primary">
                S&apos;inscrire au club
                <Icon name="arrow-right" size={16} strokeWidth={2.4} />
              </Link>
              <Link href="/partenaires" className="btn-ghost">
                Devenir partenaire
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
