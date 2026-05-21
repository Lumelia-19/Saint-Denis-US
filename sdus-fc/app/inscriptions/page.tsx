import Link from 'next/link';
import TacticalPattern from '@/components/TacticalPattern';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';

const PIECES = [
  "Photo d'identité récente",
  'Certificat médical de non contre-indication',
  "Copie d'une pièce d'identité",
  'Justificatif de domicile',
];

const ETAPES: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'file-text', title: 'Pré-inscription en ligne', desc: 'Remplissez le formulaire et choisissez votre catégorie.' },
  { icon: 'ticket', title: 'Dépôt des documents', desc: 'Transmettez les pièces justificatives au club.' },
  { icon: 'shield', title: 'Validation & licence', desc: 'Le club valide le dossier et délivre la licence FFF.' },
];

const OFFERS: { icon: IconName; title: string; desc: string; cta: string }[] = [
  {
    icon: 'target',
    title: 'Détections',
    desc: 'Vous visez une équipe compétitive ? Participez à nos séances de détection.',
    cta: 'Passer une détection',
  },
  {
    icon: 'flame',
    title: 'Stages vacances',
    desc: 'Stages multi-niveaux pendant les vacances scolaires : progression, fun et cohésion.',
    cta: 'Réserver un stage',
  },
];

export default function InscriptionsPage() {
  return (
    <>
      {/* ===================== HEADER ===================== */}
      <section className="relative pt-32 pb-16 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-grid-ink opacity-70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <Reveal>
            <span className="chip bg-mist text-accent border border-cloud mb-6">
              <Icon name="sparkles" size={14} className="text-flame" />
              Saison 2025 / 2026
            </span>
            <h1 className="hero-title text-navy">
              Rejoindre le <span className="text-gradient">club.</span>
            </h1>
            <p className="text-slate-soft text-lg mt-4 max-w-xl mx-auto">
              Inscriptions, détections &amp; stages — une procédure simple et 100% en ligne.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== STEPS ===================== */}
      <section className="py-20 bg-mist">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle eyebrow="La marche à suivre" blue="S'inscrire en" orange="3 étapes" center />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {ETAPES.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <div className="card card-hover relative p-8 h-full">
                  <span className="absolute top-6 right-7 display-sm text-5xl text-slate-soft">0{i + 1}</span>
                  <span className="grid place-items-center w-16 h-16 rounded-2xl bg-flame text-white mb-6">
                    <Icon name={e.icon} size={28} />
                  </span>
                  <h3 className="display-sm text-xl text-navy mb-2">{e.title}</h3>
                  <p className="text-slate-soft text-sm leading-relaxed">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DOCS + OFFERS ===================== */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-mesh p-9 h-full">
              <TacticalPattern />
              <div className="relative z-10">
                <p className="eyebrow text-flame mb-4">Le dossier</p>
                <h3 className="section-title text-white !text-3xl mb-7">Pièces à fournir</h3>
                <ul className="space-y-4">
                  {PIECES.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="grid place-items-center w-7 h-7 rounded-lg bg-flame text-white shrink-0 mt-0.5">
                        <Icon name="check" size={16} strokeWidth={3} />
                      </span>
                      <span className="text-white/80 text-sm leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {OFFERS.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.1}>
                <div className="card card-hover group p-7 flex items-start gap-5">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl bg-mist text-accent shrink-0 transition-colors duration-300 group-hover:bg-royal group-hover:text-white">
                    <Icon name={o.icon} size={26} />
                  </span>
                  <div>
                    <h3 className="display-sm text-xl text-navy mb-1">{o.title}</h3>
                    <p className="text-slate-soft text-sm leading-relaxed mb-4">{o.desc}</p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-flame font-semibold text-sm"
                    >
                      {o.cta}
                      <Icon
                        name="arrow-right"
                        size={15}
                        strokeWidth={2.4}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="pb-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="rounded-[2.4rem] border border-cloud bg-mist px-8 py-14 text-center flex flex-col items-center">
              <h2 className="section-title text-navy">
                Prêt à <span className="text-gradient">nous rejoindre</span> ?
              </h2>
              <Link href="/contact" className="btn-primary group mt-7">
                Démarrer mon inscription
                <Icon
                  name="arrow-right"
                  size={17}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <span className="chip bg-surface border border-cloud text-accent mt-5">
                <Icon name="check" size={14} strokeWidth={3} className="text-flame" />
                Procédure 100% en ligne
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
