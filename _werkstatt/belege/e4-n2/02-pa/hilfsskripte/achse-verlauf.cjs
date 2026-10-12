// Lesende Sonde (Scratchpad): Verlauf der roten Lot-Achse im Laden-Moment (/bad, m390, ohne Zeitlupe, ohne Pausen-Skript).
// Je Probe: Zeit seit Navigationsbeginn, Animationszeit der Lot-Achse, gerenderte Höhe der Achse. Keine Schreibaktionen.
const { createRequire } = require('node:module');
const req = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = req('@playwright/test');
const SERVER = 'http://127.0.0.1:4320';
(async () => {
  const browser = await chromium.launch();
  for (let n = 1; n <= 2; n++) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'no-preference', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
    await context.route('**/*', (route) => { const u = new URL(route.request().url()); if (['127.0.0.1', 'localhost'].includes(u.hostname) || u.protocol === 'data:' || u.protocol === 'blob:') return route.continue(); return route.fulfill({ status: 204, body: '' }); });
    await context.addCookies([{ name: 'tezgel_consent_status', value: encodeURIComponent(JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: '2026-10-10T08:00:00.000Z', version: '2.1.0' })), url: SERVER }]);
    const page = await context.newPage();
    await page.goto(SERVER + '/bad', { waitUntil: 'commit', timeout: 60000 });
    const t = await page.evaluate(() => new Promise((res) => {
      const out = [];
      const t0 = performance.now();
      const schritt = () => {
        const lot = document.querySelector('[data-motion="sig-plan"][data-flucht="laden"] .plan-achse-lot');
        if (lot) {
          const anim = lot.getAnimations ? lot.getAnimations() : [];
          const a = anim[0];
          const r = lot.getBoundingClientRect();
          out.push({ wand: Math.round(performance.now() - t0), anim: a ? a.constructor.name : null, zeit: a && a.currentTime != null ? Math.round(a.currentTime) : null, status: a ? a.playState : null, hoehe: Math.round(r.height), breite: Math.round(r.width) });
        } else out.push({ wand: Math.round(performance.now() - t0), lot: 'fehlt' });
        if (performance.now() - t0 < 1700) requestAnimationFrame(schritt); else res(out);
      };
      schritt();
    }));
    const kurz = t.filter((_, i) => i % 3 === 0);
    console.log('Lauf', n, JSON.stringify(kurz));
    await context.close();
  }
  await browser.close();
})().catch((e) => { console.error('FEHLER', e.message); process.exit(1); });
