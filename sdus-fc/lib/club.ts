// ============================================
// United Football Saint-Denis (UFSD)
// Source de vérité - données réelles du club
// Réf : Projet de Club UFSD 2025-2030 (AG constitutive du 18/05/2026)
// ============================================

export const CLUB = {
  name: 'United Football Saint-Denis',
  shortName: 'UFSD',
  legalName: 'United Football Saint-Denis (UFSD)',
  slogan: 'Terre des rois, terreau des talents, déterminé jusqu’au sommet !',
  tagline: 'L’excellence au service de la masse',
  motto: 'Former, accompagner, inspirer',
  // Association constituée par AG constitutive le 18 mai 2026,
  // reprend les activités de la section football du SDUS.
  foundedYear: '2026',
  affiliation: '523415',
  ligue: 'Ligue de Paris Île-de-France de Football',
  city: 'Saint-Denis',
  department: 'Seine-Saint-Denis (93)',
  venue: 'Stade Marville',
  address: {
    streetAddress: 'Stade Marville',
    postalCode: '93200',
    addressLocality: 'Saint-Denis',
    addressCountry: 'FR',
  },
  // Domaine de production (à confirmer). Sert de canonical pour SEO.
  domain: 'https://ufsd.fr',
  email: 'contact@ufsd.fr',
  phoneDisplay: 'Sur demande par email',
  hosting: 'Vercel Inc.',
  socials: {
    instagram: 'https://www.instagram.com/ufsd_football/',
  },
} as const;

// Bureau Directeur (AG constitutive du 18/05/2026)
export const BUREAU: { role: string; name: string; scope: string }[] = [
  { role: 'Président', name: 'Antoine Cantaloup', scope: 'Représentation, signature des contrats, supervision générale' },
  { role: 'Vice-Président chargé du Sport', name: 'Mohamed Sissoko', scope: 'Activités sportives, compétitions, éducateurs, développement sportif' },
  { role: 'Vice-Président chargé de la Jeunesse', name: 'Sébastien Aymar Bassong Nguena', scope: 'Actions éducatives, projets jeunesse, actions citoyennes et sociales, relations familles/partenaires éducatifs' },
  { role: 'Trésorier', name: 'Alain Dupré', scope: 'Gestion financière, comptes, budgets et bilans' },
  { role: 'Secrétaire Général', name: 'Ahmed Homm', scope: 'Gestion administrative, convocations, procès-verbaux, suivi des adhésions' },
];

export const REFERENTS: { role: string; name: string }[] = [
  { role: 'Stratégie et valorisation du club', name: 'Sami Sellami' },
  { role: 'Réseau et accompagnement haut niveau', name: 'Adams Doumbia' },
];

export const ENCADREMENT: { role: string; name: string }[] = [
  { role: 'Responsable École de Foot', name: 'Arnaud Chéron' },
  { role: 'Responsable Senior', name: 'Adams Doumbia' },
  { role: 'Futsal / Foot Féminin', name: 'Arnaud Chéron' },
];

// Les quatre piliers du projet
export const PILIERS: { title: string; summary: string; points: string[] }[] = [
  {
    title: 'Le foot de masse inclusif',
    summary: 'La base du projet : une école de football ouverte à tous, sans détection ni sélection à l’entrée.',
    points: [
      'Encadrement par des éducateurs diplômés et qualifiés à tous les niveaux, y compris les catégories de masse.',
      'Suivi individualisé de chaque licencié, sans logique de tri précoce.',
      'Animation extra-sportive (tournois, événements, rencontres interclubs) digne des plus grands clubs.',
      'Maintien de sections loisirs et vétérans pour un lien intergénérationnel fort.',
    ],
  },
  {
    title: 'Le double encadrement',
    summary: 'Préparer l’élite sans délaisser la masse : des éducateurs de haut rang au service de tous.',
    points: [
      'Pôle Élite (U13 à U21) : préparation au haut niveau, méthodes modernes, suivi physique et mental.',
      'Partenariats avec des centres de formation professionnels en France et à l’international.',
      'Stratégie de fidélisation des talents pour éviter la fuite vers d’autres clubs.',
      'Équipes seniors : objectif National pour l’équipe première, R1 pour la réserve.',
    ],
  },
  {
    title: 'Accompagnement des élites',
    summary: 'Transformer le potentiel en parcours professionnel réel, avec un accompagnement structuré.',
    points: [
      'Partenariats avec des structures d’accompagnement des sportifs de haut niveau.',
      'Mise en réseau avec agents, recruteurs et anciens professionnels du club.',
      'Programmes de préparation mentale par des professionnels.',
      'Stages vacances en France et à l’étranger, à la découverte d’autres cultures footballistiques.',
    ],
  },
  {
    title: 'Réussite scolaire et citoyenne',
    summary: 'Le club comme levier de réussite scolaire, d’insertion et de citoyenneté.',
    points: [
      'Partenariat avec une association de suivi et de réussite scolaire, aide aux devoirs et coaching.',
      'Découverte des métiers et rencontres avec les institutions locales.',
      'Éducation civique : respect, travail, humilité, solidarité ; prévention des violences.',
      'Renforcement du lien parent-enfant : le club comme médiateur éducatif.',
    ],
  },
];

// Réseau de partenariats structuré (volets du projet)
export const PARTNER_TRACKS: { volet: string; description: string }[] = [
  { volet: 'Haut niveau / Élite', description: 'Structures d’accompagnement de sportifs de haut niveau, centres de formation pro en France et à l’étranger.' },
  { volet: 'Réussite scolaire', description: 'Associations de suivi et de réussite scolaire, aide aux devoirs et coaching pédagogique.' },
  { volet: 'Accompagnement mental', description: 'Professionnels (psychologues du sport, coachs mentaux) orientant les enfants vers la réussite sportive et sociale.' },
  { volet: 'Insertion / institutions', description: 'Présentations de métiers, rencontres avec les institutions locales et nationales, mairie, ligue.' },
  { volet: 'Citoyenneté / prévention', description: 'Associations de prévention de la délinquance et de lutte contre les violences, éducation civique.' },
  { volet: 'Échanges internationaux', description: 'Clubs partenaires en France et à l’étranger pour stages, tournois et échanges culturels.' },
  { volet: 'Image et communication', description: 'Ambassadeurs (sport et culture), médias locaux/nationaux, agences de communication.' },
];
