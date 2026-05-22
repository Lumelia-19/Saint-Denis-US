import type { MetadataRoute } from 'next';

const BASE_URL = 'https://sdus-fc93.fr';

const ROUTES = ['', '/club', '/equipes', '/calendrier', '/inscriptions', '/actualites', '/partenaires', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/actualites' || route === '/calendrier' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
