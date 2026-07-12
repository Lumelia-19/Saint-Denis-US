sdus-fc-website/
├── index.html              ← Accueil
├── club.html               ← Le Club / À Propos
├── equipes.html            ← Équipes & Formation
├── calendrier.html         ← Calendrier & Résultats
├── inscriptions.html       ← Rejoindre le Club
├── actualites.html         ← Actualités
├── partenaires.html        ← Partenaires & Sponsoring
├── contact.html            ← Contact
│
├── css/
│   ├── style.css           ← Design system global (variables, reset)
│   ├── components.css      ← Nav, footer, cards, buttons
│   ├── animations.css      ← Keyframes, transitions
│   └── pages/
│       ├── home.css
│       ├── equipes.css
│       └── ...
│
├── js/
│   ├── main.js             ← Init, nav, scroll
│   ├── animations.js       ← IntersectionObserver, CountUp
│   ├── matches.js          ← API adapter (placeholder → réel)
│   ├── players.js          ← Player cards dynamiques
│   └── calendar.js         ← Calendrier interactif
│
├── data/
│   ├── players.json        ← Données joueurs mock
│   └── matches.json        ← Matchs mock 2025-2026
│
├── assets/
│   ├── logo.png            ← Logo SDUS FC officiel
│   ├── hero_bg.jpeg        ← Photo hero accueil
│   ├── club_hero.jpeg      ← Photo club / stade
│   ├── player_u6_u9.png    ← Joueur U6-U9
│   ├── player_u10_u13.png  ← Joueur U10-U13
│   └── generated/          ← Images générées par Antigravity
│       ├── player_u14_u17.png
│       ├── player_u18_seniors.png
│       ├── article_1.jpg
│       ├── article_2.jpg
│       └── article_3.jpg
│
├── sw.js                   ← Service Worker (notifications)
└── README.md               ← Documentation API + déploiement

=== WORKFLOW RECOMMANDÉ ===

ÉTAPE 1 — Antigravity (Design + Code) :
→ Donne le PROMPT PRINCIPAL avec toutes les images
→ Génère le site complet 8 pages
→ Génère les images manquantes avec les prompts images

ÉTAPE 2 — Claude Code (Fonctionnel) :
→ cd dans le dossier du projet généré
→ Donne le PROMPT CLAUDE CODE
→ Il crée le JS avancé + JSON data

ÉTAPE 3 — Intégration API Matchs :
→ Quand tu as l'API (FFF/Footclubs/custom)
→ Modifier API_CONFIG dans matches.js
→ Adapter le parser selon le format de réponse

ÉTAPE 4 — Player Cards avec vraies photos :
→ Photographier les joueurs (fond blanc idéalement)
→ Ajouter dans /assets/players/
→ Mettre à jour players.json avec les vraies URLs

ÉTAPE 5 — Déploiement :
→ Hébergement statique : Vercel, Netlify, ou OVH
→ Domaine : sdus-fc.fr ou saindenisus.fr