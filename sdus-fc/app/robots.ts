import type { MetadataRoute } from 'next';
import { CLUB } from '@/lib/club';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${CLUB.domain}/sitemap.xml`,
  };
}
