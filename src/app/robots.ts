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

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/login', '/admin', '/*?*'],
      },
      ...aiCrawlers.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: ['/api/', '/login', '/admin', '/*?*'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
