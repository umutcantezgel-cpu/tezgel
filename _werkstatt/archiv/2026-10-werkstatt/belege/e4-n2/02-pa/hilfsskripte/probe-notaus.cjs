// Lesende Sonde (Scratchpad): Zeitpunkt, zu dem html.k-modul gesetzt wird, und ob html.k-notaus gesetzt ist.
// Je Ansicht und Server mehrere Ladevorgänge. Keine Schreibaktionen, keine Formulare.
const { createRequire } = require('node:module');
const req = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = req('@playwright/test');
const N = Number(process.argv[2] || 5);
const SERVER = (process.argv[3] || 'http://127.0.0.1:4320').replace(/\/$/, '');
const SEITE = process.argv[4] || '/standorte';
(async () => {
  const browser = await chromium.launch();
  const ansichten = [
    { name: 'd1440', viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false },
    { name: 'm390', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  ];
  const ergebnisse = [];
  for (const a of ansichten) {
    for (let i = 0; i < N; i++) {
      const context = await browser.newContext({ ...a, reducedMotion: 'no-preference', locale: 'de-DE', timezoneId: 'Europe/Berlin' });
      await context.route('**/*', (route) => {
        const u = new URL(route.request().url());
        if (['127.0.0.1', 'localhost'].includes(u.hostname) || u.protocol === 'data:' || u.protocol === 'blob:') return route.continue();
        return route.fulfill({ status: 204, body: '' });
      });
      await context.addCookies([{ name: 'tezgel_consent_status', value: encodeURIComponent(JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: '2026-10-10T08:00:00.000Z', version: '2.1.0' })), url: SERVER }]);
      const page = await context.newPage();
      const t0 = Date.now();
      await page.addInitScript(() => {
        window.__t = {};
        const mark = () => {
          const html = document.documentElement;
          if (!html) return;
          for (const k of ['k-bewegung', 'k-modul', 'k-notaus']) if (html.classList.contains(k) && window.__t[k] == null) window.__t[k] = Math.round(performance.timeOrigin + performance.now() - performance.timeOrigin);
        };
        const attach = () => {
          const html = document.documentElement;
          if (!html) return;
          new MutationObserver(mark).observe(html, { attributes: true, attributeFilter: ['class'] });
          mark();
        };
        if (document.documentElement) attach(); else new MutationObserver(() => { if (document.documentElement) { attach(); } }).observe(document, { childList: true, subtree: true });
      });
      await page.goto(SERVER + SEITE, { waitUntil: 'load', timeout: 90000 });
      await page.waitForTimeout(2600);
      const r = await page.evaluate(() => {
        const html = document.documentElement;
        const kanten = [...document.querySelectorAll('[data-motion="einzugsband"] .einzugsband-kante')].map((k) => getComputedStyle(k).animationName);
        return { klassen: html.className.split(' ').filter((c) => c.startsWith('k-')), t: window.__t, kanten_animation: kanten, css_anim_gesamt: document.getAnimations().filter((x) => x.constructor.name === 'CSSAnimation').length };
      });
      ergebnisse.push({ ansicht: a.name, lauf: i + 1, load_ms: Date.now() - t0, ...r });
      console.log(JSON.stringify({ ansicht: a.name, lauf: i + 1, klassen: r.klassen, t_ms: r.t, kanten: r.kanten_animation.slice(0, 1), css_anim: r.css_anim_gesamt }));
      await context.close();
    }
  }
  await browser.close();
})().catch((e) => { console.error('FEHLER', e.message); process.exit(1); });
