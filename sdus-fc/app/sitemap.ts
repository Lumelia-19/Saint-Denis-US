import type { MetadataRoute } from 'next';
import { CLUB } from '@/lib/club';
import { getAllArticles } from '@/lib/articles';

const BASE_URL = CLUB.domain;

const ROUTES = [
  '',
  '/club',
  '/projet',
  '/equipes',
  '/calendrier',
  '/inscriptions',
  '/inscriptions/formulaire',
  '/actualites',
  '/partenaires',
  '/contact',
  '/mentions-legales',
  '/confidentialite',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === '' || route === '/actualites' || route === '/calendrier' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${BASE_URL}/actualites/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
