# SDUS FC 93 — Site officiel

Site du **Saint-Denis U.S. Football Club**, construit avec Next.js 16 (App Router), React 19, TypeScript et Tailwind CSS v4.

## Démarrage

```bash
npm install
npm run dev      # serveur de développement → http://localhost:3000
npm run build    # build de production
npm run start    # sert le build de production
npm run lint     # ESLint
```

## Variables d'environnement

Copier `.env.local.example` vers `.env.local` :

```bash
cp .env.local.example .env.local
```

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_MATCHES_PROVIDER` | Source des matchs : `mock`, `fff`, `footclubs`, `sporteasy`, `custom` |
| `NEXT_PUBLIC_MATCHES_API_URL` | URL de l'API matchs (si provider distant) |
| `NEXT_PUBLIC_MATCHES_API_KEY` | Clé d'API matchs |
| `NEXT_PUBLIC_CLUB_ID` | Identifiant du club (`SDUS93`) |

## Connecter une vraie API de matchs

Par défaut le site utilise des données **mock**. Pour brancher une API réelle :

1. Mettre `NEXT_PUBLIC_MATCHES_PROVIDER` sur `fff` / `footclubs` / `sporteasy` / `custom`, et renseigner l'URL + la clé.
2. Dans [`lib/matches.ts`](lib/matches.ts), implémenter le `case` du provider dans `fetchMatches()` et son parser (les `TODO` sont déjà en place).
3. Aucune autre modification : le hook [`hooks/useMatches.ts`](hooks/useMatches.ts) gère le cache (TTL 5 min, `localStorage`) et le rafraîchissement automatique toutes les 5 minutes.

## Couche données & fonctionnalités

| Fichier | Rôle |
| --- | --- |
| `hooks/useMatches.ts` | Récupère les matchs : cache `localStorage` (5 min) + refetch auto |
| `hooks/useNotifications.ts` | Permission navigateur + abonnements par catégorie |
| `lib/sw-register.ts` | Enregistre le Service Worker (production uniquement) |
| `components/ServiceWorkerInit.tsx` | Déclenche l'enregistrement au montage |
| `components/NotificationButton.tsx` | Bouton d'abonnement aux notifications d'une catégorie |
| `public/sw.js` | Service Worker : cache d'assets + notifications push |

## Ajouter un joueur

Éditer le tableau `PLAYERS` dans [`lib/players.ts`](lib/players.ts) :

```ts
{
  id: 'sen-09', firstName: 'Prénom', lastName: 'Nom', number: 12,
  position: 'Milieu', category: 'Seniors', birthYear: 2001,
  photo: '/assets/players/sen-09.png', // optionnel
  stats: { matches: 0, goals: 0, assists: 0, rating: 6.5 },
}
```

`category` doit être l'une de : `U6-U9`, `U10-U13`, `U14-U17`, `U18-Seniors`, `Seniors`.

## Thème clair / sombre

Le site gère un mode clair et un mode sombre (bouton dans la navbar). La préférence est mémorisée dans `localStorage` et un script anti-flash l'applique avant le rendu.

## Déploiement sur Vercel

1. Importer le dépôt sur [vercel.com](https://vercel.com/new).
2. Configurer les variables d'environnement (`NEXT_PUBLIC_*`) dans **Project Settings → Environment Variables**.
3. Vercel détecte Next.js automatiquement — aucun réglage de build supplémentaire.

## Structure

```
app/            Pages (App Router) + layout + globals.css
components/     Composants UI (Navbar, Footer, cartes, Icon, …)
hooks/          Hooks de données (useMatches, useNotifications)
lib/            Données & logique (types, matches, players, sw-register)
public/         Assets statiques + sw.js
```
