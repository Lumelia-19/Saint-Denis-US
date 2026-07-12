# PROMPT CLAUDE CODE — SDUS FC 93 — API & Data Layer
# À lancer APRÈS que npm run build passe sans erreur

Tu es un développeur Next.js 14 / TypeScript senior.
Le site SDUS FC 93 est déjà buildé et fonctionnel visuellement.

⚠️ RÈGLE ABSOLUE : Tu ne touches à AUCUN fichier CSS.
Ne modifie pas globals.css, ne change aucune classe Tailwind existante,
ne touche pas au design, aux couleurs, aux animations, aux composants visuels.
Tu interviens UNIQUEMENT sur la logique, les données et les fonctionnalités.

---

## CE QUE TU VAS CRÉER

### 1. `hooks/useMatches.ts`

Custom hook complet avec :
- `useState` pour `matches`, `loading`, `error`
- `useEffect` qui appelle `fetchMatches()` depuis `@/lib/matches`
- Filtre optionnel par catégorie passé en paramètre
- Cache localStorage avec TTL de 5 minutes :
  * Clé : `sdus_matches_cache`
  * Structure : `{ data, timestamp }`
  * Si cache valide (< 5 min) → retourne le cache sans fetch
  * Si cache expiré ou absent → fetch + met à jour le cache
- Refetch automatique toutes les 5 minutes via `setInterval`
- Cleanup propre dans le `return` du useEffect

```ts
'use client';
import { useState, useEffect, useCallback } from 'react';
import { fetchMatches, filterMatchesByCategory } from '@/lib/matches';
import { Match, MatchCategory } from '@/lib/types';

const CACHE_KEY = 'sdus_matches_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const REFETCH_INTERVAL = 5 * 60 * 1000;

interface MatchesState {
  upcoming: Match[];
  results: Match[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => void;
}

export function useMatches(category?: MatchCategory | 'Tous'): MatchesState {
  // ... implémentation complète
}
```

---

### 2. `hooks/useScrollReveal.ts`

Hook pour les animations scroll reveal :
- Accepte un `ref` et des options (threshold, delay)
- Utilise `IntersectionObserver`
- Retourne `isVisible: boolean`
- Ajoute/retire la classe `visible` sur l'élément (pour `.fade-in-up`)
- Ne touche pas au CSS — la classe `.fade-in-up` existe déjà dans globals.css

```ts
'use client';
import { useEffect, useRef, RefObject } from 'react';

export function useScrollReveal<T extends HTMLElement>(
  options?: { threshold?: number; delay?: number }
): RefObject<T> {
  // ... utilise IntersectionObserver
  // ajoute classe 'visible' sur l'élément quand visible
  // NE MODIFIE PAS le CSS
}
```

---

### 3. `hooks/useNotifications.ts`

Hook pour les notifications push :
- Vérifie si `'Notification' in window` et `'serviceWorker' in navigator`
- `requestPermission()` : demande la permission navigateur
- `subscribe(category)` : stocke en localStorage les catégories suivies
- `unsubscribe(category)` : retire la catégorie
- `getSubscriptions()` : retourne la liste des catégories suivies
- État `permission: 'default' | 'granted' | 'denied'`

```ts
'use client';
const SUBSCRIPTIONS_KEY = 'sdus_notifications_subscriptions';

export function useNotifications() {
  // ... implémentation
}
```

---

### 4. `public/sw.js`

Service Worker basique :
- `install` event : cache les assets statiques essentiels
- `fetch` event : stratégie Cache First pour les assets, Network First pour les pages
- `push` event : affiche une notification avec icon `/assets/logo.png`
- Ne gère PAS de logique complexe — juste le squelette fonctionnel

```js
const CACHE_NAME = 'sdus-fc-v1';
const STATIC_ASSETS = ['/', '/assets/logo.png'];

self.addEventListener('install', (event) => { /* ... */ });
self.addEventListener('fetch', (event) => { /* ... */ });
self.addEventListener('push', (event) => { /* ... */ });
```

---

### 5. `lib/sw-register.ts`

Fonction d'enregistrement du Service Worker :
- Vérifie `'serviceWorker' in navigator`
- Register `/sw.js` uniquement en production (`process.env.NODE_ENV === 'production'`)
- Log propre sans throw en cas d'erreur

```ts
export async function registerServiceWorker(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;
  if (process.env.NODE_ENV !== 'production') return;
  // ... registration
}
```

---

### 6. Mise à jour `app/layout.tsx`

UNIQUEMENT ajouter l'enregistrement du SW au montage :
- Importer `registerServiceWorker` depuis `@/lib/sw-register`
- Créer un petit composant client `ServiceWorkerInit` qui appelle `registerServiceWorker()` dans un `useEffect`
- L'ajouter dans le layout SANS toucher à quoi que ce soit d'autre dans ce fichier
- ⚠️ Ne pas modifier les classes CSS, les fonts, la structure HTML existante

```tsx
// Juste ce composant à ajouter, rien d'autre ne change :
'use client';
function ServiceWorkerInit() {
  useEffect(() => { registerServiceWorker(); }, []);
  return null;
}
```

---

### 7. Mise à jour `app/calendrier/page.tsx`

Remplacer le fetch statique par `useMatches` :
- Passer la page en `'use client'`
- Utiliser `useMatches(selectedCategory)` au lieu de `fetchMatches()` direct
- Ajouter un état de loading : spinner simple (3 points animés en orange)
- Ajouter un état d'erreur : message discret en rouge
- ⚠️ Ne pas modifier les classes CSS existantes sur la page
- ⚠️ Ne pas changer le layout, les couleurs, les composants visuels

---

### 8. `components/NotificationButton.tsx`

Bouton d'abonnement aux notifications d'une équipe :
- Utilise `useNotifications()`
- Props : `category: MatchCategory`
- Si permission denied : bouton grisé avec tooltip
- Si subscribed : bouton "🔔 Abonné" avec style outline
- Si not subscribed : bouton "🔕 M'abonner" avec style plein
- ⚠️ Utilise UNIQUEMENT les classes CSS existantes (`btn-primary`, `btn-secondary`)
  et les couleurs du design system (`#1B3A8C`, `#F26522`)
- N'ajoute AUCUN nouveau style CSS

---

### 9. `.env.local.example`

```
# Provider des matchs : 'mock' | 'fff' | 'footclubs' | 'sporteasy' | 'custom'
NEXT_PUBLIC_MATCHES_PROVIDER=mock

# URL de l'API matches (à renseigner quand disponible)
NEXT_PUBLIC_MATCHES_API_URL=

# Clé API (à renseigner quand disponible)
NEXT_PUBLIC_MATCHES_API_KEY=

# Identifiant du club
NEXT_PUBLIC_CLUB_ID=SDUS93
```

---

### 10. Mise à jour `README.md`

Créer ou compléter avec :
- Comment lancer en dev : `npm run dev`
- Comment builder : `npm run build`
- Comment connecter l'API matches (changer `NEXT_PUBLIC_MATCHES_PROVIDER`)
- Structure des fichiers créés dans cette étape
- Comment ajouter un vrai joueur dans `lib/players.ts`
- Comment déployer sur Vercel (variables d'env à configurer)

---

## VÉRIFICATIONS FINALES

```bash
npm run build   # doit passer 0 erreurs TypeScript
npm run lint    # doit passer 0 warnings
```

Vérifier spécifiquement :
- Aucun fichier `.css` modifié
- Aucune classe Tailwind ajoutée ou supprimée dans les composants existants
- Aucune couleur hardcodée ajoutée (seulement celles déjà présentes)
- Tous les nouveaux fichiers sont en TypeScript strict
- Les hooks sont tous marqués `'use client'` si ils utilisent des APIs browser

---

## RAPPEL — FICHIERS INTERDITS À MODIFIER
- `app/globals.css` ❌
- `tailwind.config.ts` ❌
- Tout composant existant sauf `app/calendrier/page.tsx` et `app/layout.tsx` (ajout minimal uniquement)
- `lib/types.ts`, `lib/matches.ts`, `lib/players.ts` ❌
