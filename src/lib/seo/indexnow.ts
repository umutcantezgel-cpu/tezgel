import { posts } from '@/config/posts';
import { SERVICES } from '@/config/services';
import { PORTFOLIO_PROJECTS } from '@/config/projects';
import { TOPIC_PAGES } from '@/config/topics';
import { CITIES } from '@/config/cities';
import { MUSTERBAEDER } from '@/config/musterbaeder';
import { SITE_URL } from '@/lib/schema';

export const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '4c6796df61f5479387fc4f56b1ed6b19';
export const INDEXNOW_HOST = new URL(SITE_URL).hostname; // 'tezgel.de'
export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const STATIC_PATHS = [
  '',
  '/bad',
  '/bad/badsanierung',
  '/bad/fliesen',
  '/bad/barrierefreies-bad',
  '/bad/bad-aus-einer-hand',
  '/bad/musterbaeder',
  '/bad/badplaner',
  '/bad/projekt-check',
  '/bad/badanfrage',
  '/leistungen',
  '/standorte',
  '/ausstellung/wetzlar',
  '/ausstellung/giessen',
  '/blog',
  '/faq',
  '/beratung',
  '/foerderung',
  '/referenzen',
  '/downloads',
  '/ueber-uns',
  '/unternehmen',
  '/team',
  '/partner',
  '/karriere',
  '/karriere/ausbildung',
  '/kontakt',
  '/impressum',
  '/datenschutz',
  '/agb',
  '/widerruf',
  '/cookie-richtlinie',
  '/barrierefreiheit',
];

/**
 * Aggregates all public, indexable canonical URLs for tezgel.de
 */
export function getAllSiteUrls(): string[] {
  const urls: string[] = [
    ...STATIC_PATHS.map((path) => `${SITE_URL}${path}`),
    ...SERVICES.map((service) => `${SITE_URL}/leistungen/${service.id}`),
    ...SERVICES.flatMap((service) =>
      CITIES.map((city) => `${SITE_URL}/leistungen/${service.id}/${city.slug}`)
    ),
    ...CITIES.map((city) => `${SITE_URL}/standorte/${city.slug}`),
    ...MUSTERBAEDER.map((bad) => `${SITE_URL}/bad/musterbaeder/${bad.slug}`),
    ...TOPIC_PAGES.map((page) => `${SITE_URL}${page.path}`),
    ...PORTFOLIO_PROJECTS.map((project) => `${SITE_URL}/referenzen/${project.id}`),
    ...posts.map((post) => `${SITE_URL}/blog/${post.slug}`),
  ];

  return Array.from(new Set(urls));
}

export interface IndexNowResult {
  success: boolean;
  status: number;
  message: string;
  host: string;
  keyLocation: string;
  submittedCount: number;
}

/**
 * Submits a list of URLs (or all site URLs by default) to the IndexNow protocol.
 * Bing, Yandex, Naver, and Seznam automatically receive the notification.
 */
export async function submitToIndexNow(urls?: string[]): Promise<IndexNowResult> {
  const urlList = urls && urls.length > 0 ? urls : getAllSiteUrls();

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  };

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // IndexNow specifications:
    // 200 = OK: URL submitted successfully
    // 202 = Accepted: Key in process of being validated
    const isSuccess = response.status === 200 || response.status === 202;
    const responseText = await response.text().catch(() => '');

    return {
      success: isSuccess,
      status: response.status,
      message: isSuccess
        ? 'URLs successfully submitted to IndexNow'
        : `IndexNow returned HTTP ${response.status}: ${responseText || response.statusText}`,
      host: INDEXNOW_HOST,
      keyLocation: INDEXNOW_KEY_LOCATION,
      submittedCount: urlList.length,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : 'Unknown network error',
      host: INDEXNOW_HOST,
      keyLocation: INDEXNOW_KEY_LOCATION,
      submittedCount: urlList.length,
    };
  }
}
