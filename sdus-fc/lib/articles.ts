// ============================================
// UFSD - Articles (système d'actualités)
// ============================================

import type { Article } from '@/lib/types';

export type ArticleEntry = Omit<Article, 'content'> & {
  slug: string;
  content: string[] | string;
};

const ARTICLES: ArticleEntry[] = [
  {
    id: 'ufs-naissance-agsdus',
    slug: 'united-football-saint-denis-naissance-nouveau-club',
    title: 'United Football Saint-Denis est né',
    excerpt:
      "Issu de la section football du SDUS, UFSD a vu le jour lors de l'AG constitutive du 18 mai 2026. Un nouveau chapitre s'ouvre pour le football saint-dionysien.",
    image: '/assets/club_hero.webp',
    date: '2026-05-20',
    category: 'Club',
    author: 'Bureau UFSD',
    content: [
      "Le 18 mai 2026, l'assemblée générale constitutive a entériné la création d'United Football Saint-Denis (UFSD), nouveau club né de la section football du SDUS. Cette étape majeure concrétise plusieurs mois de travail, de concertation et de partage d'une ambition commune : offrir au football saint-dionysien un projet structurant, pérenne et résolument tourné vers la jeunesse.",
      "UFSD hérite de l'histoire et des valeurs du SDUS Football, tout en se dotant d'une gouvernance propre, d'un projet sportif renouvelé et d'une identité affirmée. Le nouveau bureau, élu lors de cette même assemblée, prend la direction du club pour le cycle olympique 2025-2030, avec une feuille de route claire : structurer l'école de foot, monter en compétition et incarner un club de territoire.",
      "Cette naissance n'est pas un point de départ isolé. Elle s'appuie sur les bénévoles, les éducateurs, les familles et les partenaires qui font vivre le football à Saint-Denis au quotidien. UFSD se veut un club-école, un club-vie, un club de proximité, ancré au stade Marville et ouvert à toutes et tous.",
      "Les semaines à venir seront consacrées à la finalisation des inscriptions, à la constitution des groupes par catégorie et au lancement des premières séances d'entraînement sous la nouvelle bannière. Nous donnerons rendez-vous à l'ensemble du monde sportif dionysien pour une journée de présentation officielle dès la rentrée.",
      "Bienvenue à United Football Saint-Denis. Une histoire s'achève, une autre commence, avec le même cœur : celui du territoire.",
    ],
  },
  {
    id: 'inscriptions-2026-2027',
    slug: 'ouverture-inscriptions-saison-2026-2027',
    title: 'Ouverture des inscriptions pour la saison 2026/2027',
    excerpt:
      "Les inscriptions sont ouvertes pour la saison 2026/2027. École de foot, compétition, futsal et foot féminin : toutes nos catégories accueillent de nouveaux licenciés au stade Marville.",
    image: '/assets/inscriptions-bg.webp',
    date: '2026-06-03',
    category: 'Vie du club',
    author: 'Secrétariat UFSD',
    content: [
      "UFSD ouvre dès aujourd'hui les inscriptions pour la saison 2026/2027. Du plus jeune licencié de l'école de foot aux seniors, en passant par les catégories compétition, le futsal et le foot féminin, chaque dionysien·ne trouve sa place au sein du club. Les séances se déroulent au stade Marville, notre maison.",
      "L'inscription se fait en ligne via le formulaire dédié de la page Inscriptions. Les pièces à fournir (certificat médical, photo d'identité, fiche de renseignement) sont détaillées dans la procédure. Une permanence d'accueil est organisée chaque samedi matin au stade pour accompagner les familles dans la constitution des dossiers.",
      "Notre école de foot, labelisée et structurée autour de valeurs pédagogiques fortes, reste le cœur du projet. Les jeunes licenciés·es sont encadré·es par des éducateurs diplômés, dans une logique d'épanouissement, de progression technique et d'éducation par le sport.",
      "Pour la saison qui démarre, UFSD affine son offre : créneaux dédiés par tranche d'âge, reprise progressive des groupes dès la fin août, stages de préparation à la rentrée et événements de cohésion encadrant la première partie de saison.",
      "Une question avant de vous engager ? Contactez le secrétariat via la page Contact : nous vous orienterons vers la catégorie et le ou la référent·e adapté·e. Rejoignez UFSD, rejoignez un club de territoire qui grandit avec sa ville.",
    ],
  },
  {
    id: 'pole-elite-u13-u21',
    slug: 'lancement-pole-elite-u13-u21',
    title: 'Lancement du Pôle Élite U13 - U21',
    excerpt:
      "UFSD lance son Pôle Élite à destination des U13 à U21 : un parcours de progression sportive et scolaire renforcé, encadré par des éducateurs diplômés et un suivi individualisé.",
    image: '/assets/bg-article.webp',
    date: '2026-06-18',
    category: 'Formation',
    author: 'Pôle Sportif UFSD',
    content: [
      "United Football Saint-Denis lance son Pôle Élite à destination des jeunes de U13 à U21. Ce parcours, structurant pour le projet de club, vise à accompagner les joueur·seuses vers le haut niveau sans jamais sacrifier la scolarité ni le développement personnel.",
      "Le Pôle Élite s'appuie sur un encadrement renforcé : éducateurs diplômés, suivi individualisé de la progression, bilans techniques réguliers, préparation physique adaptée à la tranche d'âge et coordination étroite avec les référents de catégorie. Les groupes restent volontairement restreints, pour garantir la qualité du travail et l'attention portée à chaque joueur·seuse.",
      "L'objectif n'est pas seulement la performance. Il s'agit de former des joueur·seuses complets·ètes : techniquement, athlétiquement et humainement. Des modules transverses (sommeil, récupération, alimentation, gestion des temps de concentration) viennent compléter le volet sportif, en lien avec les familles et l'équipe éducative.",
      "Le Pôle Élite s'inscrit dans une continuité : il prend le relais naturel de l'école de foot pour les joueur·seuses qui souhaitent s'engager dans un rythme soutenu, tout en restant ouvert, sur détection, aux talents du territoire qui rejoindraient UFSD.",
      "Les sélections et évaluations de rentrée se tiendront en septembre. Les candidatures sont ouvertes via la page Inscriptions. Nous reviendrons très vite sur le calendrier des détections et sur la composition des groupes.",
    ],
  },
  {
    id: 'partenariat-reussite-scolaire',
    slug: 'partenariat-reussite-scolaire-accompagnement-jeunes',
    title: 'Partenariat « Réussite scolaire » : accompagner nos jeunes',
    excerpt:
      "UFSD noue un partenariat dédié à la réussite scolaire de ses licenciés. Soutien aux devoirs, suivi des résultats et lien école-club : le foot comme levier d'éducation.",
    image: '/assets/sponsor-bg.webp',
    date: '2026-07-02',
    category: 'Vie du club',
    author: 'Vice-Présidence Jeunesse',
    content: [
      "United Football Saint-Denis lance un partenariat « Réussite scolaire » dédié à l'accompagnement éducatif de ses licenciés·es. L'idée est simple : un·e joueur·seuse qui va bien à l'école va bien sur le terrain, et inversement. Le club se veut pleinement acteur de la réussite de ses jeunes.",
      "Concrètement, le dispositif articule trois axes : soutien aux devoirs au stade Marville, suivi des résultats scolaires en lien avec les familles et dialogue régulier avec les établissements dionysiens. Des créneaux d'aide aux devoirs encadrés par des bénévoles et des étudiants relais sont prévus dès la reprise.",
      "Ce partenariat est porté par la Vice-Présidence chargée de la Jeunesse, en coordination avec le Pôle Élite et l'école de foot. Il s'adresse à toutes les catégories, sans distinction, avec une attention particulière portée aux périodes charnières : entrée en sixième, année d'orientation, examens.",
      "Au-delà de l'aide ponctuelle, le club veut affirmer une posture : celle d'un partenaire éducatif de plein droit, aux côtés des familles et des équipes pédagogiques. Le maillot UFSD est aussi un signal de commitment pour soi et pour les autres.",
      "Les familles intéressées peuvent se rapprocher de la Vice-Présidence Jeunesse via la page Contact. Nous co-construirons, avec chacun·e, le parcours qui correspond à son enfant. Parce qu'un club de territoire se mesure aussi à la réussite de celles et ceux qui le composent.",
    ],
  },
];

export function getAllArticles(): ArticleEntry[] {
  return [...ARTICLES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): ArticleEntry | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}