// Lesende Messung (Scratchpad): Schriftgrößen H1/H2, Lage der Planstände im Ablauf. Keine Schreibaktionen.
const { createRequire } = require('node:module');
const req = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = req('@playwright/test');
const SERVER = 'http://127.0.0.1:4320';
const ANS = {
  m390: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  d1440: { viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false },
};
const SEITEN = ['/kontakt', '/fliesen/konfigurator', '/blog', '/blog/rutschfeste-fliesen-r-klassen', '/', '/leistungen', '/bad', '/standorte'];
(async () => {
  const browser = await chromium.launch();
  const out = {};
  for (const [name, a] of Object.entries(ANS)) {
    for (const seite of SEITEN) {
      const context = await browser.newContext({ ...a, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
      await context.route('**/*', (route) => { const u = new URL(route.request().url()); if (['127.0.0.1', 'localhost'].includes(u.hostname) || u.protocol === 'data:' || u.protocol === 'blob:') return route.continue(); return route.fulfill({ status: 204, body: '' }); });
      await context.addCookies([{ name: 'tezgel_consent_status', value: encodeURIComponent(JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: '2026-10-10T08:00:00.000Z', version: '2.1.0' })), url: SERVER }]);
      const page = await context.newPage();
      await page.goto(SERVER + seite, { waitUntil: 'load', timeout: 90000 });
      await page.waitForTimeout(1200);
      const r = await page.evaluate(() => {
        const fs = (el) => (el ? parseFloat(getComputedStyle(el).fontSize) : null);
        const h1 = document.querySelector('main h1, h1');
        const h2s = [...document.querySelectorAll('main h2, h2')].filter((h) => h.getClientRects().length > 0);
        const h2 = h2s[0];
        const schritte = [...document.querySelectorAll('.szene-plan')].map((el) => { const r = el.getBoundingClientRect(); return { top: Math.round(r.top + window.scrollY), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }; });
        const sichtbar_erster = h2 ? h2.getBoundingClientRect().top < window.innerHeight : null;
        return {
          h1_text: h1 ? h1.textContent.trim().slice(0, 60) : null,
          h1_fs: fs(h1),
          h2_text: h2 ? h2.textContent.trim().slice(0, 60) : null,
          h2_fs: fs(h2),
          h2_im_ersten_bildschirm: sichtbar_erster,
          h2_anzahl_sichtbar: h2s.length,
          szene_plan_positionen: schritte,
        };
      });
      out[`${name} ${seite}`] = r;
      await context.close();
    }
  }
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch((e) => { console.error('FEHLER', e.message); process.exit(1); });
