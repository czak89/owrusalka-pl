import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://rusalka-nadmorzem.pl/sitemap.xml',
    host: 'https://rusalka-nadmorzem.pl',
  };
}