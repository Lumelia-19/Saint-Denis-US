import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';
import { CLUB, BUREAU } from '@/lib/club';

const PRESIDENT = BUREAU.find((m) => m.role === 'Président');
const DIRECTOR_NAME = PRESIDENT?.name ?? 'Le Président';

const FULL_ADDRESS = `${CLUB.address.streetAddress}, ${CLUB.address.postalCode} ${CLUB.address.addressLocality}`;

type Block = { icon: IconName; title: string; lines: { label: string; value: string }[]; note?: string };

const BLOCKS: Block[] = [
  {
    icon: 'institution',
    title: 'Éditeur du site',
    lines: [
      { label: 'Association', value: `${CLUB.legalName}, association loi 1901.` },
      { label: 'Constitution', value: 'Constituée par AG constitutive le 18/05/2026.' },
      { label: 'Objet', value: "Reprend les activités de la section football du SDUS." },
      { label: 'Affiliation', value: `N° ${CLUB.affiliation} auprès de la ${CLUB.ligue}.` },
    ],
  },
  {
    icon: 'map-pin',
    title: 'Adresse du siège',
    lines: [{ label: 'Siège social', value: FULL_ADDRESS }],
  },
  {
    icon: 'users',
    title: 'Directeur de la publication',
    lines: [{ label: 'Responsable', value: `${DIRECTOR_NAME}, Président de l’association.` }],
  },
  {
    icon: 'mail',
    title: 'Contact',
    lines: [{ label: 'Email', value: CLUB.email }],
  },
  {
    icon: 'building',
    title: 'Hébergeur',
    lines: [
      { label: 'Société', value: `${CLUB.hosting} Inc.` },
      { label: 'Adresse', value: '340 S Lemon Ave #4133, Walnut, CA 91789, USA.' },
      { label: 'Site', value: 'vercel.com' },
    ],
  },
  {
    icon: 'shield',
    title: 'Propriété intellectuelle',
    lines: [
      { label: 'Droits', value: "L’ensemble des contenus (textes, visuels, logo) est la propriété exclusive du club." },
      { label: 'Reproduction', value: 'Toute reproduction, totale ou partielle, est interdite sans autorisation écrite préalable.' },
    ],
  },
];

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: `Mentions légales du site ${CLUB.domain} - éditeur, siège, directeur de la publication, hébergeur et propriété intellectuelle.`,
  alternates: { canonical: '/mentions-legales' },
  openGraph: {
    title: `Mentions légales | ${CLUB.shortName}`,
    description: 'Informations légales, éditeur, hébergeur et propriété intellectuelle du club United Football Saint-Denis.',
    url: '/mentions-legales',
    type: 'website',
  },
};

export default function MentionsLegalesPage() {
  return (
    <section className="relative isolate overflow-hidden bg-surface pt-28 pb-24 lg:pt-32" aria-labelledby="ml-title">
      {/* ===== Petit héros sobre sur fond mesh ===== */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 bg-mesh">
        <div className="h-[42vh] min-h-[280px] w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="eyebrow text-flame mb-4">Informations légales</p>
          <h1 id="ml-title" className="hero-title text-white lg:text-[4.6rem]">
            Mentions <span className="text-flame">légales</span>
          </h1>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Conformément aux dispositions légales applicables, voici les informations relatives à l&apos;éditeur et à l&apos;hébergement du site {CLUB.domain}.
          </p>
        </Reveal>

        {/* ===== Cartes ===== */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {BLOCKS.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.06} className={block.title === 'Propriété intellectuelle' ? 'sm:col-span-2' : undefined}>
              <article className="card p-7 h-full">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal/8 border border-royal/15 text-royal">
                    <Icon name={block.icon} size={20} />
                  </span>
                  <h2 className="display-sm text-xl italic text-navy">{block.title}</h2>
                </div>
                <div className="mt-3 h-0.5 w-9 rounded-full bg-flame" />
                <dl className="mt-5 space-y-4">
                  {block.lines.map((line) => (
                    <div key={line.label}>
                      <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-slate-soft">{line.label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-navy">{line.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ===== Note + lien confidentialité ===== */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-royal/12 bg-mist p-6">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-slate-soft">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/70 border border-cloud text-flame">
                <Icon name="file-text" size={18} />
              </span>
              <span>
                Certaines informations (SIRET, numéro RNA) seront complétées à réception. Pour toute question
                relative au traitement de vos données personnelles, consultez notre{' '}
                <Link
                  href="/confidentialite"
                  className="font-semibold text-royal underline underline-offset-4 decoration-flame decoration-2 hover:text-flame transition-colors"
                >
                  politique de confidentialité
                </Link>
                .
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}