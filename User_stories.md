# SDUS FC 93 - User Stories

Suivi des fonctionnalités à implémenter pour finaliser et livrer le site.
Statuts : `⬜ TODO` · `🟡 Partiel` (code présent mais incomplet/non branché) · `✅ Done` · `🔴 Blocked`

> Référentiel d'analyse : audit du repo `sdus-fc/` (Next.js 16 App Router) au 2026-07-07.
> Les ingénieurs mettent à jour la colonne **Statut** au fil de l'avancement et cochent les critères d'acceptation.

---

## Epic 1 - Contact & envoi de mail

### US-001 - Configurer l'envoi d'email du formulaire de contact
- **Statut** : 🔴 Blocked
- **En tant que** visiteur, **je veux** que mon message parte sur la boîte du club, **afin de** être contacté en retour.
- **Critères d'acceptation** :
  - [ ] Fichier `.env.local.example` créé et versionné (variables du README).
  - [ ] `.env.local` renseigné en local avec `RESEND_API_KEY` valide.
  - [ ] `CONTACT_FROM_EMAIL` utilise un domaine vérifié sur Resend (`noreply@sdus-fc93.fr`).
  - [ ] `CONTACT_TO_EMAIL` = `contact@sdus-fc93.fr` (ou adresse réelle du club).
  - [ ] Envoi testé en production → message reçu dans la boîte du club.
- **Fichiers** : `app/api/contact/route.ts`, `.env.local.example` (à créer), `README.md`.
- **Dépendance** : vérification du domaine `sdus-fc93.fr` sur Resend (SPF + DKIM).

### US-002 - Aligner les sujets du formulaire avec les pages du site
- **Statut** : ⬜ TODO
- **En tant que** visiteur, **je veux** des sujets cohérents avec les pages Inscriptions/Détections/Stages, **afin de** être orienté correctement.
- **Critères d'acceptation** :
  - [ ] La liste `VALID_SUBJECTS` de la route API correspond au `<select>` de `app/contact/page.tsx`.
  - [ ] Les sujets reflètent les offres de `app/inscriptions/page.tsx` (Détection, Stage vacances, Inscription, Partenariat, Autre).
- **Fichiers** : `app/api/contact/route.ts`, `app/contact/page.tsx`.

---

## Epic 2 - Légal & RGPD (bloquant publication)

### US-003 - Page Mentions légales
- **Statut** : ⬜ TODO
- **En tant que** visiteur, **je veux** consulter les mentions légales, **afin de** connaître l'éditeur et l'hébergeur du site.
- **Critères d'acceptation** :
  - [ ] Page `app/mentions-legales/page.tsx` créée (design system).
  - [ ] Contient : association/club, SIRET, adresse (Stade Marville, 93200 Saint-Denis), dirigeant, hébergeur (Vercel).
  - [ ] Lien ajouté dans le footer.
- **Fichiers** : `app/mentions-legales/page.tsx` (à créer), `components/Footer.tsx`.

### US-004 - Page Politique de confidentialité + consentement
- **Statut** : ⬜ TODO
- **En tant que** visiteur, **je veux** savoir comment mes données sont traitées, **afin de** donner mon consentement éclairé.
- **Critères d'acceptation** :
  - [ ] Page `app/confidentialite/page.tsx` créée.
  - [ ] Décrit les données collectées (formulaire contact : nom, email, message), finalité, durée, droits RGPD.
  - [ ] Bandeau cookies / consentement si trackers ou analytics ajoutés.
  - [ ] Lien depuis le footer.
- **Fichiers** : `app/confidentialite/page.tsx` (à créer), `components/Footer.tsx`.

---

## Epic 3 - PWA, mode sombre & notifications

### US-005 - Rendre le mode sombre accessible
- **Statut** : 🟡 Partiel
- **En tant que** utilisateur, **je veux** basculer en mode sombre, **afin de** lire le site confortablement selon l'éclairage.
- **Critères d'acceptation** :
  - [ ] `components/ThemeToggle.tsx` monté dans la Navbar (desktop + menu mobile).
  - [ ] Préférence persistée en `localStorage`, anti-flash déjà en place dans `app/layout.tsx`.
  - [ ] Toutes les pages vérifiées en clair ET sombre (pas de texte illisible).
- **Fichiers** : `components/Navbar.tsx`, `components/ThemeToggle.tsx`.
- **Note** : le composant existe mais n'est rendu nulle part.

### US-006 - Enregistrer le Service Worker (PWA offline)
- **Statut** : 🟡 Partiel
- **En tant que** utilisateur, **je veux** installer le site / le consulter hors-ligne, **afin de** réutiliser le contenu sans réseau.
- **Critères d'acceptation** :
  - [ ] `components/ServiceWorkerInit.tsx` monté dans `app/layout.tsx`.
  - [ ] `public/manifest.json` créé (ou `app/manifest.ts`) + référencé dans le layout.
  - [ ] Icônes PWA (192/512) ajoutées dans `public/`.
  - [ ] Installation testée sur mobile desktop.
- **Fichiers** : `app/layout.tsx`, `components/ServiceWorkerInit.tsx`, `public/manifest.json` (à créer), `public/sw.js`.
- **Note** : `ServiceWorkerInit` existe mais n'est pas monté ; aucun manifest présent.

### US-007 - Notifications de matchs réelles (ou retirer la feature)
- **Statut** : 🟡 Partiel
- **En tant que** supporter, **je veux** être notifié des matchs de ma catégorie, **afin de** ne pas rater les rendez-vous.
- **Critères d'acceptation** (si conservée) :
  - [ ] `NotificationButton` rendu sur `/calendrier` (par catégorie).
  - [ ] Backend push (VAPID) + endpoint d'abonnement `POST /api/notifications/subscribe`.
  - [ ] `sw.js` gère l'événement `push` et affiche la notification.
  - [ ] Planification des notifications (cron / job) avant chaque match.
  - [ ] Page confidentialité mise à jour (données d'abonnement).
- **Alternative** : si non prioritaire, retirer `NotificationButton.tsx` + `useNotifications.ts` + hooks associés pour éviter du dead code.
- **Fichiers** : `components/NotificationButton.tsx`, `hooks/useNotifications.ts`, `public/sw.js`, `lib/sw-register.ts`.
- **Note** : actuellement le « subscribe » ne fait que stocker en `localStorage` ; aucun push réel n'est envoyé.

---

## Epic 4 - Données réelles (matchs, joueurs, actualités)

### US-008 - Brancher une API de matchs réelle (saison 2026/2027)
- **Statut** : 🟡 Partiel
- **En tant que** supporter, **je veux** voir les vrais matchs et résultats, **afin de** suivre le club à jour.
- **Critères d'acceptation** :
  - [ ] Provider choisi (`fff` / `footclubs` / `sporteasy` / `custom`) et `API_CONFIG.provider` non `mock`.
  - [ ] Parser du provider implémenté dans `fetchMatches()` (remplacer les `TODO`).
  - [ ] `NEXT_PUBLIC_MATCHES_*` + `NEXT_PUBLIC_CLUB_ID` renseignés.
  - [ ] `next.config.ts` : `remotePatterns` ajouté si logos/images externes.
  - [ ] Données mock supprimées ou gardées uniquement en fallback.
- **Fichiers** : `lib/matches.ts`, `next.config.ts`, `.env.local`.
- **Note** : actuellement 6 matchs + 4 résultats **inventés** et **périmés** (dates 2025-08/09, dépassées en juillet 2026).

### US-009 - Mettre à jour si pas d'API (saisie manuelle saison en cours)
- **Statut** : ⬜ TODO
- **En tant que** supporter, **je veux** au moins des matchs à jour, **afin de** ne pas voir d'anciennes dates.
- **Critères d'acceptation** :
  - [ ] Si US-008 repoussée : `MOCK_UPCOMING_MATCHES` et `MOCK_RECENT_RESULTS` mis à jour pour la saison 2026/2027.
  - [ ] Aucune date dans le passé côté « à venir ».
- **Fichiers** : `lib/matches.ts`.

### US-010 - Renseigner l'effectif réel
- **Statut** : ⬜ TODO
- **En tant que** visiteur, **je veux** voir les vrais joueurs par catégorie, **afin de** identifier le club et ses équipes.
- **Critères d'acceptation** :
  - [ ] Tableau `PLAYERS` remplacé par les vrais joueurs (ou masqué tant que non prêt).
  - [ ] Photos des joueurs ajoutées dans `public/assets/players/` (optionnel).
  - [ ] Vérifier l'affichage sur `/equipes` (fil par catégorie).
- **Fichiers** : `lib/players.ts`, `app/equipes/page.tsx`, `public/assets/`.

### US-011 - Système d'actualités (articles réels + pages détail)
- **Statut** : ⬜ TODO
- **En tant que** visiteur, **je veux** lire de vrais articles, **afin de** suivre la vie du club.
- **Critères d'acceptation** :
  - [ ] Source d'articles : contenu MDX/CMS ou tableau `lib/articles.ts` dédié.
  - [ ] Route dynamique `app/actualites/[slug]/page.tsx` créée.
  - [ ] Cartes d'`/actualites` liées vers la page article (pas vers `/contact`).
  - [ ] Métadonnées + `generateStaticParams`/sitemap pour les articles.
  - [ ] Suppression du dead code `components/ArticleCard.tsx` (ou réutilisation).
- **Fichiers** : `app/actualites/page.tsx`, `app/actualites/[slug]/page.tsx` (à créer), `lib/articles.ts` (à créer), `app/sitemap.ts`, `components/ArticleCard.tsx`.
- **Note** : actuellement 3 articles codés en dur (dates avril 2024) sans page détail.

---

## Epic 5 - Inscriptions en ligne

### US-012 - Formulaire d'inscription en ligne
- **Statut** : ⬜ TODO
- **En tant que** parent/joueur, **je veux** m'inscrire en ligne, **afin de** rejoindre le club sans démarche physique.
- **Critères d'acceptation** :
  - [ ] Page `app/inscriptions/formulaire/page.tsx` (ou modale) avec champs : joueur, catégorie, contact parent, pièces.
  - [ ] Upload des pièces (photo, certificat médical, justificatif) + stockage (Vercel Blob / Resend attachment / email).
  - [ ] Email de confirmation au parent + notification au club.
  - [ ] Validation serveur (route `app/api/inscription/route.ts`).
  - [ ] Page « Procédure 100% en ligne » cohérente avec la promesse affichée.
- **Fichiers** : `app/inscriptions/page.tsx`, `app/inscriptions/formulaire/page.tsx` (à créer), `app/api/inscription/route.ts` (à créer).
- **Note** : aujourd'hui la page ne fait que rediriger vers `/contact`.

### US-013 - Détections & Stages : calendrier/inscription dédiée
- **Statut** : ⬜ TODO
- **En tant que** joueur, **je veux** connaître les dates de détection/stage et m'inscrire, **afin de** participer.
- **Critères d'acceptation** :
  - [ ] Dates des prochaines détections/stages affichées.
  - [ ] CTA fonctionnel vers un formulaire dédié (ou contact pré-rempli).
- **Fichiers** : `app/inscriptions/page.tsx`.

---

## Epic 6 - Contenu & coordonnées réelles

### US-014 - Coordonnées du club complètes
- **Statut** : ⬜ TODO
- **En tant que** visiteur, **je veux** téléphone, horaires et accès, **afin de** contacter/venir au club.
- **Critères d'acceptation** :
  - [ ] Numéro de téléphone réel (remplacer « Sur demande par email »).
  - [ ] Horaires d'accueil / permanences.
  - [ ] Plan ou lien Maps vers Stade Marville.
  - [ ] Réseaux sociaux confirmés (Instagram `@sdus_football` à valider ; ajouter Facebook/TikTok/WhatsApp si existants).
- **Fichiers** : `components/Footer.tsx`, `app/contact/page.tsx`, `app/layout.tsx` (JSON-LD).

### US-015 - Vérifier le domaine de production et les métadonnées
- **Statut** : ⬜ TODO
- **En tant que** moteur de recherche, **je veux** un domaine canonique cohérent, **afin de** indexer correctement.
- **Critères d'acceptation** :
  - [ ] `metadataBase` (`app/layout.tsx`), `app/sitemap.ts`, `app/robots.ts`, JSON-LD = domaine production final (`sdus-fc93.fr` à confirmer).
  - [ ] OpenGraph image (`/assets/hero_bg.jpeg`) valide et accessible.
- **Fichiers** : `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`.

---

## Epic 7 - Robustesse & finitions

### US-016 - Page 404 / erreur / loading personnalisées
- **Statut** : ⬜ TODO
- **En tant que** visiteur, **je veux** une page d'erreur dans le design du site, **afin de** ne pas être perdu.
- **Critères d'acceptation** :
  - [ ] `app/not-found.tsx` créée (lien retour accueil).
  - [ ] `app/error.tsx` (erreur runtime, client boundary).
  - [ ] (Optionnel) `app/loading.tsx` pour les pages asynchrones.
- **Fichiers** : `app/not-found.tsx`, `app/error.tsx` (à créer).

### US-017 - Nettoyage du dead code
- **Statut** : ⬜ TODO
- **En tant que** développeur, **je veux** retirer le code mort, **afin de** garder le repo maintenable.
- **Critères d'acceptation** :
  - [ ] `components/ArticleCard.tsx` : réutiliser (US-011) ou supprimer.
  - [ ] Décider de `NotificationButton` / `ServiceWorkerInit` : brancher (US-006/007) ou supprimer.
  - [ ] Aucun composant orphelin restant.
- **Fichiers** : `components/ArticleCard.tsx`, `components/NotificationButton.tsx`, `components/ServiceWorkerInit.tsx`.

### US-018 - Validation build production
- **Statut** : ⬜ TODO
- **En tant que** ingénieur, **je veux** un build propre, **afin de** déployer sans surprise.
- **Critères d'acceptation** :
  - [ ] `npm install` + `npm run lint` sans erreur.
  - [ ] `npm run build` sans erreur (Next 16 / React 19 / Tailwind v4).
  - [ ] `npm run start` testé localement, pages principales parcourues.
- **Fichiers** : `package.json`.

---

## Synthèse

| Statut | US |
| --- | --- |
| 🔴 Blocked | US-001 |
| 🟡 Partiel | US-005, US-006, US-007, US-008 |
| ⬜ TODO | US-002, US-003, US-004, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018 |
| ✅ Done | - |

**Priorité de livraison** : US-001 + US-003/US-004 (légal) → US-018 (build) → US-005/US-006 (UX de base) → US-008/US-009/US-010 (données réelles) → US-011/US-012 (contenu/inscriptions) → US-007 (notifications, optionnel) → US-014/US-015/US-016/US-017.