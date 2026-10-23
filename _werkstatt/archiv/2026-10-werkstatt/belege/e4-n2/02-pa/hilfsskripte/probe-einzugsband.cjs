// Lesende Sonde (Scratchpad): Zustand der Einzugsband-Animation auf /standorte je Ansicht. Keine Schreibaktionen.
const { createRequire } = require('node:module');
const req = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = req('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const ansichten = [
    { name: 'd1440', viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false },
    { name: 'm390', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  ];
  for (const a of ansichten) {
    const context = await browser.newContext({ ...a, reducedMotion: 'no-preference', locale: 'de-DE', timezoneId: 'Europe/Berlin' });
    await context.route('**/*', (route) => {
      const u = new URL(route.request().url());
      if (['127.0.0.1', 'localhost'].includes(u.hostname) || u.protocol === 'data:' || u.protocol === 'blob:') return route.continue();
      return route.fulfill({ status: 204, body: '' });
    });
    await context.addCookies([{ name: 'tezgel_consent_status', value: encodeURIComponent(JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: '2026-10-10T08:00:00.000Z', version: '2.1.0' })), url: 'http://127.0.0.1:4320' }]);
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4320/standorte', { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2500);
    const info = await page.evaluate(() => {
      const els = [...document.querySelectorAll('[data-motion="einzugsband"]')];
      const sichtbar = (el) => el.getClientRects().length > 0;
      const ketten = (el) => { const out = []; let e = el; while (e && e !== document.body) { const cs = getComputedStyle(e); if (cs.display === 'none') out.push(e.tagName + '.' + String(e.className).slice(0, 60)); e = e.parentElement; } return out; };
      const kanten = [...document.querySelectorAll('[data-motion="einzugsband"] .einzugsband-kante')].map((k) => { const cs = getComputedStyle(k); const r = k.getBoundingClientRect(); return { sichtbar: k.getClientRects().length > 0, animationName: cs.animationName, animationDuration: cs.animationDuration, animationPlayState: cs.animationPlayState, breite_px: Math.round(r.width), hoehe_px: Math.round(r.height) }; });
      const cssAnim = document.getAnimations().filter((a) => a instanceof CSSAnimation && a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('[data-motion="einzugsband"]')).length;
      return {
        html_klasse: document.documentElement.className,
        elemente: els.length,
        elemente_sichtbar: els.filter(sichtbar).length,
        elemente_ketten_display_none: els.map((el) => ketten(el)),
        kanten,
        css_animationen_am_einzugsband: cssAnim,
        einzugsband_form: els.map((el) => el.className.slice(0, 80)),
      };
    });
    console.log(a.name, JSON.stringify(info, null, 1));
    await context.close();
  }
  await browser.close();
})().catch((e) => { console.error('FEHLER', e.message); process.exit(1); });
