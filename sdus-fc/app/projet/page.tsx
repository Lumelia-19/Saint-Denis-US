import type { Metadata } from 'next';
import Link from 'next/link';
import TacticalPattern from '@/components/TacticalPattern';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Le Projet de club',
  description:
    "Projet de club 2025-2030 de l'United Football Saint-Denis (UFSD) : l'excellence au service de la masse. Former, accompagner, inspirer chaque enfant de Saint-Denis.",
  alternates: { canonical: '/projet' },
  openGraph: {
    title: 'Le Projet de club | United Football Saint-Denis',
    description:
      "L'excellence au service de la masse : philosophie, piliers, gouvernance et ambitions de l'UFSD.",
    url: '/projet',
    type: 'website',
  },
};

const PHILOSOPHIE: { icon: IconName; text: string }[] = [
  {
    icon: 'users',
    text: 'Un foot de masse réellement inclusif, ouvert à tous les enfants de la commune, sans sélection ni discrimination à l’entrée.',
  },
  {
    icon: 'shield',
    text: 'Des éducateurs de haut rang, diplômés et exigeants, qui préparent les meilleurs au haut niveau sans jamais délaisser la masse - la qualité d’encadrement bénéficie à tous, du U6 à l’élite.',
  },
  {
    icon: 'star',
    text: 'Un accompagnement des élites dans leur projet sportif, pour transformer le potentiel en parcours professionnel réel.',
  },
  {
    icon: 'graduation',
    text: 'Un accompagnement de tous dans leur scolarité, en faisant du club un levier de valorisation de l’école, des institutions et du travail.',
  },
];

const PILIERS: { num: string; icon: IconName; title: string; tag: string; points: string[] }[] = [
  {
    num: '01',
    icon: 'users',
    title: 'Le foot de masse inclusif',
    tag: 'La base du projet',
    points: [
      'École de football ouverte à tous, sans détection ni sélection à l’entrée, avec un encadrement de qualité équivalente à celle des structures d’élite.',
      'Encadrement par des éducateurs diplômés, formés et qualifiés à tous les niveaux - y compris les catégories de masse.',
      'Suivi individualisé de chaque licencié, sans logique de tri précoce.',
      'Animation extra-sportive digne des plus grands clubs (tournois, événements, rencontres interclubs).',
      'Maintien de sections loisirs et vétérans pour un lien intergénérationnel fort.',
    ],
  },
  {
    num: '02',
    icon: 'shield',
    title: 'Le double encadrement',
    tag: 'Préparer l’élite sans délaisser la masse',
    points: [
      'Pôle Élite (U13 à U21) : préparation au haut niveau, méthodes modernes, suivi physique et mental personnalisé.',
      'Partenariats avec des centres de formation professionnels en France et à l’international.',
      'Stratégie de fidélisation des talents pour éviter la fuite vers d’autres clubs.',
      'Équipes seniors : objectif National pour l’équipe première, R1 pour la réserve, comme vitrine de l’ambition du club.',
    ],
  },
  {
    num: '03',
    icon: 'star',
    title: 'Accompagnement des élites',
    tag: 'Du potentiel au parcours pro',
    points: [
      'Partenariats avec des structures spécialisées (préparation physique, mentale, suivi de carrière).',
      'Mise en réseau avec des agents, recruteurs et anciens professionnels issus du club ou de son réseau.',
      'Programmes de préparation mentale par des professionnels : gérer la pression, préparer l’après-carrière.',
      'Stages vacances en France et à l’étranger : découverte d’autres villes, clubs et cultures footballistiques.',
    ],
  },
  {
    num: '04',
    icon: 'graduation',
    title: 'Réussite scolaire & citoyenne',
    tag: 'Le club comme levier',
    points: [
      'Accompagnement scolaire : partenariat avec une association de réussite scolaire, aide aux devoirs et coaching, implication des éducateurs dans le suivi.',
      'Découverte des métiers et lien avec les institutions (mairie, ligue, services publics).',
      'Éducation civique et citoyenne : ateliers sur le respect, le travail, l’humilité, la solidarité ; prévention des violences et de la délinquance.',
      'Renforcement du lien parent-enfant : le club agit comme médiateur, les familles sont impliquées dans sa vie.',
    ],
  },
];

const COMMUNICATION: { icon: IconName; text: string }[] = [
  { icon: 'sparkles', text: 'Refonte de l’identité visuelle du club (logo, charte graphique) pour une image moderne et fédératrice.' },
  { icon: 'star', text: 'Valorisation des talents issus du club ayant percé au haut niveau, pour créer des modèles de réussite.' },
  { icon: 'users', text: 'Implication d’ambassadeurs reconnus, issus du football et du monde artistique.' },
  { icon: 'flame', text: 'Communication offensive sur les réseaux sociaux et auprès des médias locaux et nationaux.' },
  { icon: 'trophy', text: 'Organisation d’un événement annuel phare (match de gala, invités prestigieux).' },
  { icon: 'shield', text: 'Échanges internationaux : accueil de clubs partenaires, stages et tournois à l’étranger.' },
];

const PARTENARIATS: { volet: string; type: string }[] = [
  {
    volet: 'Haut niveau / Élite',
    type: 'Structures d’accompagnement de sportifs de haut niveau (suivi physique, mental) et centres de formation pro, en France et à l’étranger.',
  },
  {
    volet: 'Réussite scolaire',
    type: 'Associations de suivi et de réussite scolaire ; aide aux devoirs et coaching pédagogique.',
  },
  {
    volet: 'Accompagnement mental',
    type: 'Professionnels (psychologues du sport, coachs mentaux) pour orienter les enfants vers la réussite sportive et sociale.',
  },
  {
    volet: 'Insertion / Institutions',
    type: 'Présentations de métiers, rencontres avec les institutions locales et nationales, mairie, ligue.',
  },
  {
    volet: 'Citoyenneté / Prévention',
    type: 'Associations de prévention de la délinquance et de lutte contre les violences, éducation civique.',
  },
  {
    volet: 'Échanges internationaux',
    type: 'Clubs partenaires en France et à l’étranger pour stages, tournois et échanges culturels.',
  },
  {
    volet: 'Image & Communication',
    type: 'Ambassadeurs (sport et culture), médias locaux et nationaux, agences de communication.',
  },
];

const BUREAU: { role: string; name: string; mission: string }[] = [
  { role: 'Président', name: 'Antoine Cantaloup', mission: 'Représentation, signature des contrats, supervision générale.' },
  { role: 'Vice-Président chargé du Sport', name: 'Mohamed Sissoko', mission: 'Activités sportives, compétitions, éducateurs, développement sportif.' },
  { role: 'Vice-Président chargé de la Jeunesse', name: 'Sébastien Aymar Bassong Nguena', mission: 'Actions éducatives, projets jeunesse, actions citoyennes et sociales, relations familles / partenaires éducatifs.' },
  { role: 'Trésorier', name: 'Alain Dupré', mission: 'Gestion financière, comptes, budgets et bilans.' },
  { role: 'Secrétaire Général', name: 'Ahmed Homm', mission: 'Gestion administrative, convocations, procès-verbaux, suivi des adhésions.' },
];

const REFERENTS: { role: string; name: string }[] = [
  { role: 'Stratégie et valorisation du club', name: 'Sami Sellami' },
  { role: 'Réseau et accompagnement haut niveau', name: 'Adams Doumbia' },
];

const ENCADREMENT: { role: string; name: string }[] = [
  { role: 'Responsable École de Foot', name: 'Arnaud Chéron' },
  { role: 'Responsable Senior', name: 'Adams Doumbia' },
  { role: 'Futsal / Foot Féminin', name: 'Arnaud Chéron' },
];

const POLES: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'graduation', title: 'Accompagnement scolaire', desc: 'Partenaire(s) associatif(s) de réussite scolaire.' },
  { icon: 'star', title: 'Accompagnement mental & élite', desc: 'Professionnels de la préparation mentale et du suivi de carrière.' },
  { icon: 'handshake', title: 'Citoyenneté, prévention & lien parents', desc: 'Associations de prévention, institutions locales, référents parents.' },
];

const AMBITIONS: { icon: IconName; text: string }[] = [
  { icon: 'users', text: 'Une croissance maîtrisée des effectifs, dans le respect de la capacité d’accueil et de la qualité d’encadrement.' },
  { icon: 'trophy', text: 'Une montée en gamme progressive des équipes de jeunes et seniors vers les niveaux régional et national.' },
  { icon: 'flame', text: 'La diversification des ressources : cotisations, subventions, partenariats privés, mécénat, dispositifs d’insertion (alternance, Service Civique).' },
  { icon: 'graduation', text: 'Une intégration de l’accompagnement scolaire à l’ensemble des licenciés, et non plus à un public restreint.' },
  { icon: 'shield', text: 'Un réseau de partenariats structuré sur les volets sportif, scolaire, institutionnel et citoyen.' },
];

export default function ProjetPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-mesh pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <TacticalPattern />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow justify-center text-flame">Projet de club 2025 - 2030</p>
            <h1 className="hero-title mt-4 text-white">
              L&apos;excellence au service de la <span className="text-gradient">masse</span>
            </h1>
            <p className="mt-5 text-lg font-semibold text-white/85 sm:text-xl">Former, accompagner, inspirer.</p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Saint-Denis, terre des rois de France et symbole du 93, possède un vivier exceptionnel de talents.
              La véritable mission d&apos;un club n&apos;est pas seulement de produire des champions : c&apos;est de
              faire de l&apos;excellence un moteur collectif, un horizon accessible à tous les enfants du territoire -
              qu&apos;ils deviennent footballeurs professionnels, élèves brillants, citoyens engagés ou adultes
              épanouis et fiers de leur ville.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <blockquote className="mx-auto mt-8 max-w-3xl border-l-4 border-flame bg-white/[0.06] px-5 py-4 text-left text-sm italic leading-relaxed text-white/85 sm:px-7 sm:py-5 sm:text-base">
              « Valoriser l&apos;excellence au profit de la masse, pour inspirer chaque enfant de Saint-Denis à
              réussir - sur le terrain, à l&apos;école, et dans la vie. »
            </blockquote>
            <p className="mt-6 display-sm text-base italic text-flame sm:text-lg">
              Terre des rois, terreau des talents, déterminé jusqu&apos;au sommet !
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ PHILOSOPHIE ============ */}
      <section className="bg-surface py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Philosophie"
              blue="L'excellence comme"
              orange="levier collectif"
              subtitle="La réussite de quelques-uns doit servir la réussite de tous. Le club ne choisit pas entre le foot de masse et le haut niveau : il fait de l'un le tremplin de l'autre."
            />
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12">
            {PHILOSOPHIE.map((p, i) => (
              <Reveal key={p.text} delay={i * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-[1.15rem] border border-cloud bg-panel p-5 shadow-[var(--shadow-soft)] sm:p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-royal text-white">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <p className="text-[0.9rem] leading-relaxed text-slate-soft sm:text-sm">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LES 4 PILIERS ============ */}
      <section className="bg-mist py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <SectionTitle eyebrow="La méthode" blue="Les quatre" orange="piliers du projet" center />
          </Reveal>
          <div className="mt-9 grid gap-5 lg:mt-12 lg:grid-cols-2">
            {PILIERS.map((pilier, i) => (
              <Reveal key={pilier.title} delay={(i % 2) * 0.08}>
                <article className="flex h-full flex-col rounded-[1.4rem] border border-cloud bg-panel p-6 shadow-[var(--shadow-soft)] sm:p-7">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-royal text-white sm:h-14 sm:w-14">
                      <Icon name={pilier.icon} size={26} />
                    </span>
                    <div>
                      <span className="display-sm text-3xl text-flame/70">{pilier.num}</span>
                      <h3 className="display-sm text-xl italic text-navy sm:text-2xl">{pilier.title}</h3>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-flame">{pilier.tag}</p>
                  <ul className="mt-5 space-y-3">
                    {pilier.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[0.9rem] leading-relaxed text-slate-soft sm:text-sm">
                        <Icon name="check" size={16} strokeWidth={3} className="mt-1 shrink-0 text-flame" />
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

      {/* ============ COMMUNICATION & TERRITOIRE ============ */}
      <section className="bg-surface py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Image & territoire"
              blue="Une fierté pour"
              orange="Saint-Denis"
              subtitle="Associer la ville au talent, à la réussite et à l'excellence plutôt qu'aux représentations négatives qui circulent trop souvent."
            />
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3">
            {COMMUNICATION.map((c, i) => (
              <Reveal key={c.text} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-[1.15rem] border border-cloud bg-panel p-5 shadow-[var(--shadow-soft)] sm:p-6">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-mist text-flame">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <p className="text-[0.9rem] leading-relaxed text-slate-soft sm:text-sm">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARTENARIATS ============ */}
      <section className="bg-mist py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Structuration"
              blue="Plusieurs bras pour"
              orange="un même objectif"
              subtitle="La réussite du projet repose sur la mise en réseau de partenaires complémentaires, chacun apportant son expertise sur un volet."
            />
          </Reveal>
          <div className="mt-9 overflow-hidden rounded-[1.2rem] border border-cloud bg-panel shadow-[var(--shadow-soft)] lg:mt-12">
            {PARTENARIATS.map((p, i) => (
              <Reveal key={p.volet} delay={(i % 4) * 0.05}>
                <div
                  className={`grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-4 sm:px-6 ${
                    i > 0 ? 'border-t border-cloud' : ''
                  }`}
                >
                  <p className="display-sm text-base italic text-royal">{p.volet}</p>
                  <p className="text-[0.9rem] leading-relaxed text-slate-soft sm:text-sm">{p.type}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GOUVERNANCE ============ */}
      <section className="bg-surface py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Gouvernance"
              blue="L'équipe"
              orange="dirigeante"
              subtitle="Constituée par Assemblée Générale Constitutive le 18 mai 2026, l'association United Football Saint-Denis (UFSD) reprend les activités de la section football du SDUS et son numéro d'affiliation 523415 auprès de la Ligue de Paris Île-de-France de Football."
            />
          </Reveal>

          {/* Bureau directeur */}
          <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3">
            {BUREAU.map((m, i) => (
              <Reveal key={m.role} delay={(i % 3) * 0.06}>
                <article className="h-full rounded-[1.15rem] border border-cloud bg-panel p-5 shadow-[var(--shadow-soft)] sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-flame">{m.role}</p>
                  <p className="display-sm mt-1.5 text-lg italic text-navy sm:text-xl">{m.name}</p>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-slate-soft">{m.mission}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Référents stratégie & réseau */}
          <Reveal>
            <h3 className="display-sm mt-10 text-lg italic text-navy sm:text-xl">Référents Stratégie &amp; Réseau</h3>
          </Reveal>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {REFERENTS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.06}>
                <div className="flex items-center gap-3 rounded-[1.1rem] border border-cloud bg-panel p-4 shadow-[var(--shadow-soft)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-royal text-white">
                    <Icon name="target" size={20} />
                  </span>
                  <div>
                    <p className="font-bold text-navy">{r.name}</p>
                    <p className="text-[0.84rem] text-slate-soft">{r.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ORGANIGRAMME ============ */}
      <section className="bg-mist py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <SectionTitle eyebrow="Organisation" blue="Pôles" orange="du club" center />
          </Reveal>

          <Reveal>
            <h3 className="display-sm mt-10 text-center text-lg italic text-navy sm:text-xl">Pôle Encadrement Sportif</h3>
          </Reveal>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {ENCADREMENT.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.06}>
                <div className="rounded-[1.1rem] border border-cloud bg-panel p-5 text-center shadow-[var(--shadow-soft)]">
                  <span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-royal text-white">
                    <Icon name="whistle" size={20} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-flame">{e.role}</p>
                  <p className="display-sm mt-1 text-lg italic text-navy">{e.name}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h3 className="display-sm mt-10 text-center text-lg italic text-navy sm:text-xl">
              Pôles transversaux « Excellence pour la masse »
            </h3>
          </Reveal>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {POLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-[1.1rem] border border-cloud bg-panel p-5 text-center shadow-[var(--shadow-soft)] sm:p-6">
                  <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-royal text-white">
                    <Icon name={p.icon} size={22} />
                  </span>
                  <p className="display-sm text-[1.05rem] italic text-navy">{p.title}</p>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-slate-soft">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AMBITIONS & MODÈLE ============ */}
      <section className="bg-surface py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
            <Reveal>
              <SectionTitle
                eyebrow="Trajectoire"
                blue="Ambitions &"
                orange="modèle de développement"
                subtitle="Un développement progressif et maîtrisé, porté par la croissance des licenciés, la montée en niveau sportif et le renforcement de l'accompagnement scolaire et citoyen."
              />
              <div className="mt-6 rounded-[1.2rem] border-l-4 border-flame bg-mist p-5 text-sm leading-relaxed text-slate-soft sm:p-6">
                <strong className="text-royal">Un modèle économique équilibré :</strong> l&apos;encadrement
                sportif est financé en partie par des dispositifs d&apos;insertion professionnelle (alternance,
                Service Civique), qui créent des emplois pour les jeunes du territoire et renforcent l&apos;impact
                social du club. L&apos;excellence sportive et l&apos;investissement social se nourrissent
                mutuellement.
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="grid gap-4">
                {AMBITIONS.map((a) => (
                  <li
                    key={a.text}
                    className="flex items-start gap-4 rounded-[1.15rem] border border-cloud bg-panel p-5 shadow-[var(--shadow-soft)]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-royal text-white">
                      <Icon name={a.icon} size={20} />
                    </span>
                    <p className="text-[0.9rem] leading-relaxed text-slate-soft sm:text-sm">{a.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CONCLUSION ============ */}
      <section className="bg-mist py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-mesh px-6 py-12 text-center sm:px-10 sm:py-16">
              <TacticalPattern />
              <div className="relative z-10">
                <SectionTitle blue="Un projet de société" orange="à l'échelle d'un club" center light />
                <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                  En valorisant l&apos;excellence au profit de la masse, en mettant les meilleurs éducateurs au
                  service de tous, et en faisant du club un pont vers l&apos;école, les institutions et le monde du
                  travail, United Football Saint-Denis veut prouver qu&apos;un club de quartier peut être à la fois
                  un accélérateur de talents et un acteur de cohésion sociale.
                </p>
                <p className="mx-auto mt-5 max-w-2xl text-base font-semibold text-white sm:text-lg">
                  Chaque enfant de Saint-Denis doit pouvoir se dire : ce club croit en moi - sur un terrain, sur les
                  bancs de l&apos;école, ou dans la vie.
                </p>
                <p className="mt-7 display-sm text-base italic text-flame sm:text-lg">
                  Terre des rois, terreau des talents, déterminé jusqu&apos;au sommet !
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/inscriptions" className="btn-primary group">
                    Rejoindre le club
                    <Icon name="arrow-right" size={17} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link href="/partenaires" className="btn-ghost">
                    Devenir partenaire
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
