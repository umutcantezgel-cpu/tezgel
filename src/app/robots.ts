import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // 13 Key AI & GEO Search Engine Crawlers
  const aiCrawlers = [
    'GPTBot',
    'ChatGPT-User',
    'ClaudeBot',
    'anthropic-ai',
    'PerplexityBot',
    'Google-Extended',
    'GoogleOther',
    'Applebot-Extended',
    'cohere-ai',
    'CCBot',
    'Meta-ExternalAgent',
    'Bytespider',
    'Amazonbot',
  ];

  // SEO-Runde T01 (docs/seo/KONTEXT.md, Abschnitt 5): Keine Sperre für Adressen mit Fragezeichen mehr. `/*?*` sperrte alle
  // Fotos (`/_next/image?url=…`) und jeden Link mit Kampagnenparametern (utm_…). Doppelte
  // Parameter-Adressen fasst das selbstreferenzierende Canonical zusammen (src/lib/metadata.ts).
  const gesperrt = ['/api/', '/login', '/admin'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: gesperrt,
      },
      ...aiCrawlers.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: gesperrt,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
