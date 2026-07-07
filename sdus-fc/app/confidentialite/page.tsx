import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';
import { CLUB } from '@/lib/club';

type Section = {
  icon: IconName;
  title: string;
  intro?: string;
  bullets?: string[];
  lines?: { label: string; value: string }[];
};

const SECTIONS: Section[] = [
  {
    icon: 'institution',
    title: 'Responsable du traitement',
    intro: `L’association ${CLUB.name} (${CLUB.shortName}) est responsable du traitement des données personnelles collectées sur ce site.`,
    lines: [{ label: 'Contact', value: CLUB.email }],
  },
  {
    icon: 'folder',
    title: 'Données collectées',
    intro: 'Nous collectons uniquement les données nécessaires au bon fonctionnement du club, via :',
    bullets: [
      'Le formulaire de contact : nom, prénom, email, objet du message et contenu du message.',
      "Le formulaire d’inscription (à venir) : identité du joueur, catégorie, coordonnées du ou des responsables légaux et pièces justificatives.",
    ],
  },
  {
    icon: 'target',
    title: 'Finalité du traitement',
    bullets: [
      'Répondre aux demandes reçues via le formulaire de contact.',
      "Gérer les inscriptions, les licenciés et la vie associative (adhésion, équipes, compétitions).",
      'Assurer le suivi administratif et sportif des membres du club.',
    ],
  },
  {
    icon: 'shield',
    title: 'Base légale',
    bullets: [
      'Consentement de la personne concernée pour les demandes de contact.',
      "Intérêt légitime de l’association pour la gestion des adhésions et de la vie du club.",
    ],
  },
  {
    icon: 'clock',
    title: 'Durée de conservation',
    bullets: [
      'Les données sont conservées le temps nécessaire au traitement de la demande ou de la saison concernée.',
      "Les pièces justificatives et documents administratifs sont ensuite archivés conformément aux obligations légales applicables.",
    ],
  },
  {
    icon: 'users',
    title: 'Destinataires des données',
    bullets: [
      'Uniquement les responsables habilités du club (bureau, encadrement, administration).',
      'Aucune donnée n’est revendue, cédée ou partagée à des fins commerciales.',
    ],
  },
  {
    icon: 'building',
    title: 'Sous-traitants',
    intro: 'Certaines prestations techniques impliquent des sous-traitants agissant pour le compte du club :',
    bullets: [
      `${CLUB.hosting} Inc. - hébergement du site web.`,
      'Resend - envoi des emails depuis le formulaire de contact.',
    ],
  },
  {
    icon: 'eye',
    title: 'Vos droits (RGPD)',
    intro: 'Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :',
    bullets: [
      "Droit d’accès et de copie des données vous concernant.",
      'Droit de rectification des données inexactes ou incomplètes.',
      "Droit à l’effacement de vos données dans les limites légales.",
      "Droit d’opposition au traitement.",
      'Droit à la portabilité de vos données.',
    ],
    lines: [
      { label: 'Exercice de vos droits', value: `Par email à ${CLUB.email} en précisant votre demande.` },
      { label: 'Réclamation', value: 'Auprès de la CNIL (www.cnil.fr) si vous estimez vos droits non respectés.' },
    ],
  },
  {
    icon: 'shield',
    title: 'Cookies',
    bullets: [
      "Le site n’utilise pas de cookies de suivi (tracking) ni d’analytics tiers à ce jour.",
      "La préférence de thème (clair / sombre) est stockée localement dans votre navigateur (localStorage) et n’est jamais transmise à nos serveurs.",
    ],
  },
];

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: `Politique de confidentialité et protection des données (RGPD) du site ${CLUB.domain} - données collectées, finalités, droits et cookies.`,
  alternates: { canonical: '/confidentialite' },
  openGraph: {
    title: `Politique de confidentialité | ${CLUB.shortName}`,
    description: 'Protection des données personnelles : données collectées, finalités, sous-traitants et droits RGPD.',
    url: '/confidentialite',
    type: 'website',
  },
};

export default function ConfidentialitePage() {
  return (
    <section className="relative isolate overflow-hidden bg-surface pt-28 pb-24 lg:pt-32" aria-labelledby="conf-title">
      {/* ===== Petit héros sobre sur fond mesh ===== */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 bg-mesh">
        <div className="h-[42vh] min-h-[280px] w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="eyebrow text-flame mb-4">RGPD - Protection des données</p>
          <h1 id="conf-title" className="hero-title text-white lg:text-[4.6rem]">
            Politique de <span className="text-flame">confidentialité</span>
          </h1>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Le club {CLUB.shortName} s&apos;engage à protéger vos données personnelles. Cette page détaille les
            informations collectées, leurs finalités et vos droits.
          </p>
        </Reveal>

        {/* ===== Sections ===== */}
        <div className="mt-12 grid grid-cols-1 gap-6">
          {SECTIONS.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.05}>
              <article className="card p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal/8 border border-royal/15 text-royal">
                    <Icon name={section.icon} size={20} />
                  </span>
                  <h2 className="display-sm text-xl italic text-navy">{section.title}</h2>
                </div>
                <div className="mt-3 h-0.5 w-9 rounded-full bg-flame" />
                {section.intro && (
                  <p className="mt-5 text-sm leading-relaxed text-navy">{section.intro}</p>
                )}
                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-navy">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.lines && (
                  <dl className="mt-5 space-y-4">
                    {section.lines.map((line) => (
                      <div key={line.label}>
                        <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-slate-soft">{line.label}</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-navy">{line.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* ===== Lien vers mentions légales ===== */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-royal/12 bg-mist p-6">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-slate-soft">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/70 border border-cloud text-flame">
                <Icon name="file-text" size={18} />
              </span>
              <span>
                Consultez également nos{' '}
                <Link
                  href="/mentions-legales"
                  className="font-semibold text-royal underline underline-offset-4 decoration-flame decoration-2 hover:text-flame transition-colors"
                >
                  mentions légales
                </Link>{' '}
                pour les informations relatives à l&apos;éditeur et à l&apos;hébergeur du site.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}