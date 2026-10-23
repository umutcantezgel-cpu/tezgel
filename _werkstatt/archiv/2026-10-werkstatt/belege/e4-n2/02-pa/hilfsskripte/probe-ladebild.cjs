// Lesende Sonde (Scratchpad): wie ladeBild im Werkzeug (goto commit, Element im DOM, dann Beobachtung) – Klassen und
// Kanten-Animationen über die Zeit. Keine Schreibaktionen.
const { createRequire } = require('node:module');
const req = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = req('@playwright/test');
const ansicht = process.argv[2] || 'd1440';
const versuche = Number(process.argv[3] || 2);
const SERVER = 'http://127.0.0.1:4320';
(async () => {
  const browser = await chromium.launch();
  const v = ansicht === 'd1440' ? { width: 1440, height: 900, isMobile: false, hasTouch: false } : { width: 390, height: 844, isMobile: true, hasTouch: true };
  for (let n = 1; n <= versuche; n++) {
    const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: v.isMobile ? 2 : 1, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'no-preference', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
    await context.route('**/*', (route) => { const u = new URL(route.request().url()); if (['127.0.0.1', 'localhost'].includes(u.hostname) || u.protocol === 'data:' || u.protocol === 'blob:') return route.continue(); return route.fulfill({ status: 204, body: '' }); });
    await context.addCookies([{ name: 'tezgel_consent_status', value: encodeURIComponent(JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: '2026-10-10T08:00:00.000Z', version: '2.1.0' })), url: SERVER }]);
    const page = await context.newPage();
    const t0 = Date.now();
    await page.goto(SERVER + '/standorte', { waitUntil: 'commit', timeout: 45000 });
    await page.waitForSelector('[data-motion="einzugsband"]', { state: 'attached', timeout: 45000 });
    const zeilen = [];
    for (let k = 0; k < 12; k++) {
      const s = await page.evaluate(() => ({
        t: null,
        klassen: document.documentElement.className.split(' ').filter((c) => c.startsWith('k-')).join(','),
        kanten_css: document.getAnimations().filter((x) => x.constructor.name === 'CSSAnimation' && x.effect && x.effect.target && x.effect.target.closest && x.effect.target.closest('[data-motion="einzugsband"]')).length,
        stand: document.querySelector('[data-motion="einzugsband"]')?.getAttribute('data-motion-stand'),
      }));
      zeilen.push({ ms: Date.now() - t0, ...s });
      await page.waitForTimeout(250);
    }
    console.log(ansicht, 'versuch', n, JSON.stringify(zeilen.filter((_, i) => i % 2 === 0)));
    await context.close();
  }
  await browser.close();
})().catch((e) => { console.error('FEHLER', e.message); process.exit(1); });
