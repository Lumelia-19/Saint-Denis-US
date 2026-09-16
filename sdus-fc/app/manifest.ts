import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'United Football Saint-Denis',
    short_name: 'UFSD',
    description:
      'United Football Saint-Denis (UFSD) - L’excellence au service de la masse. Club de football formateur au cœur de Saint-Denis.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b101e',
    theme_color: '#1b3a8c',
    lang: 'fr',
    orientation: 'portrait',
    categories: ['sports', 'education'],
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
