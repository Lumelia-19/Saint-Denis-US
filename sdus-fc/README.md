# UFSD - Site officiel

Site du **United Football Saint-Denis**, construit avec Next.js 16 (App Router), React 19, TypeScript et Tailwind CSS v4.

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
| `RESEND_API_KEY` | Clé Resend pour l'envoi du formulaire de contact (serveur) |
| `CONTACT_TO_EMAIL` | Destinataire des emails du formulaire (défaut `contact@ufsaintdenis.com`) |
| `CONTACT_FROM_EMAIL` | Expéditeur affiché (domaine vérifié sur Resend ou `onboarding@resend.dev`) |

## Formulaire de contact (Resend)

Le formulaire `/contact` poste vers la route `app/api/contact/route.ts` qui envoie l'email via [Resend](https://resend.com).

1. Créer un compte Resend → générer une API key → la coller dans `RESEND_API_KEY`.
2. **Tant que le domaine n'est pas vérifié**, garder `CONTACT_FROM_EMAIL="UFSD <onboarding@resend.dev>"`. Resend impose alors d'envoyer **vers l'email du compte Resend** uniquement.
3. **En production**, vérifier `ufsaintdenis.com` sur Resend (DNS records SPF + DKIM), puis passer `CONTACT_FROM_EMAIL` à `"UFSD <noreply@ufsaintdenis.com>"` - l'envoi vers `contact@ufsaintdenis.com` (ou n'importe quelle adresse) devient possible.
4. La route valide les champs côté serveur (longueurs, regex email, sujet dans une liste blanche) avant l'appel à Resend.

## Matchs et résultats automatiques

La source est la [fiche publique UFSD de TheFootData](https://thefootdata.com/clubs/united-football-saint-denis), qui republie les données FFF. Aucun compte ni secret n'est nécessaire. Ce n'est pas une connexion directe à la FFF ni un service de scores en direct.

`lib/matches-source.ts` récupère uniquement les équipes du club 8838 (affiliation 523415) explicitement référencées dans la saison courante. L'adaptateur lit les données JSON présentes dans les pages publiques, sans exécuter de scripts. Il valide le club, les équipes, la saison et le format. Les lieux absents et les adversaires non désignés restent à confirmer ; un score absent ne devient jamais un 0–0. Les heures internes sans fuseau ne sont pas utilisées : la vue publique ne les affiche pas et elles divergent d'autres sources. L'horaire reste donc à confirmer auprès du club. La couverture dépend des publications du fournisseur : certains plateaux ne sont pas référencés.

`lib/matches-server.ts` conserve les récupérations complètes dans le Data Cache Next.js, partagé entre l'accueil et `/api/matches`. Après une heure, la prochaine visite déclenche une actualisation. Les visites suivantes obtiennent les nouvelles données. Le navigateur consulte notre API toutes les cinq minutes et au retour sur l'onglet ; aucun appel fournisseur n'est fait depuis le navigateur. L'accueil est régénéré toutes les cinq minutes à la demande.

En cas d'échec ou de changement du format de la source, le cache conserve la dernière récupération réussie. À froid, `lib/matches-snapshot.json` fournit une copie réelle datée de la saison, signalée comme secours. Le navigateur peut aussi conserver sa dernière copie pour une panne réseau. Aucun secours d'une saison précédente ni ancien cache de démonstration n'est réutilisé. La date affichée est la date de récupération, pas la date de publication des scores chez le fournisseur.

La dépendance au format public TheFootData reste à surveiller : en cas de changement, mettre à jour l'adaptateur et son jeu de tests, puis régénérer la copie de secours avec `npm run matches:snapshot` (Node 22.6+). `npm test` couvre notamment scores absents/0–0, reports, erreurs fournisseur, format invalide et changement de saison. Aucun nouveau déploiement n'est nécessaire pour les mises à jour normales de matchs.

## Couche données & fonctionnalités

| Fichier | Rôle |
| --- | --- |
| `hooks/useMatches.ts` | API du site, rafraîchissement auto et secours local daté |
| `lib/matches-source.ts` | Adaptateur des pages publiques TheFootData |
| `lib/matches-server.ts` | Cache serveur horaire et copie de secours |
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
2. Configurer les variables d'environnement serveur pour les formulaires dans **Project Settings → Environment Variables**. Les matchs ne nécessitent aucune variable.
3. Vercel détecte Next.js automatiquement - aucun réglage de build supplémentaire.

## Structure

```
app/            Pages (App Router) + layout + globals.css
components/     Composants UI (Navbar, Footer, cartes, Icon, …)
hooks/          Hooks de données (useMatches, useNotifications)
lib/            Données & logique (types, matches, players, sw-register)
public/         Assets statiques + sw.js
```
