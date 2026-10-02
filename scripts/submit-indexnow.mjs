#!/usr/bin/env node

/**
 * IndexNow URL Submission Script for Fliesenverlegung Tezgel (tezgel.de)
 * Submits all public URLs to api.indexnow.org (Bing, Yandex, Seznam, Naver).
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '4c6796df61f5479387fc4f56b1ed6b19';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tezgel.de';
const HOST = new URL(SITE_URL).hostname;
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

// Fallback core routes in case sitemap.xml is unreachable offline
const CORE_ROUTES = [
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
  '/leistungen/bad',
  '/leistungen/wohnen',
  '/leistungen/aussen',
  '/leistungen/untergrund',
  '/standorte',
  '/standorte/wetzlar',
  '/standorte/giessen',
  '/standorte/marburg',
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

async function fetchSitemapUrls() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  try {
    const res = await fetch(sitemapUrl, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const xml = await res.text();
      const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
      if (matches.length > 0) {
        return matches;
      }
    }
  } catch {
    // Fall back to pre-defined core routes
  }
  return CORE_ROUTES.map(path => `${SITE_URL}${path}`);
}

async function main() {
  console.log(`[IndexNow] Initializing submission for ${HOST}...`);
  console.log(`[IndexNow] Key Location: ${KEY_LOCATION}`);

  const urls = await fetchSitemapUrls();
  console.log(`[IndexNow] Found ${urls.length} URLs to submit.`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text().catch(() => '');

    if (response.status === 200 || response.status === 202) {
      console.log(`\x1b[32m[IndexNow] SUCCESS (HTTP ${response.status}): ${urls.length} URLs submitted to Bing & IndexNow engines!\x1b[0m`);
      if (responseText) console.log(`[IndexNow] Response: ${responseText}`);
    } else {
      console.warn(`\x1b[33m[IndexNow] Response HTTP ${response.status}: ${responseText || response.statusText}\x1b[0m`);
      console.log(`[IndexNow] Note: If the domain key file was just pushed, allow DNS/CDN propagation for search engine crawlers to fetch the key file.`);
    }
  } catch (error) {
    console.error(`\x1b[31m[IndexNow] Error submitting to api.indexnow.org:\x1b[0m`, error.message);
  }
}

main();
