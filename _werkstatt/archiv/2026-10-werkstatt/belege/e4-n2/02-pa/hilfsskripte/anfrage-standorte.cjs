// Lesende Messung und Teilbild (Scratchpad): Anfrageabschnitt auf /standorte. Keine Schreibaktionen.
const { createRequire } = require('node:module');
const req = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = req('@playwright/test');
const SERVER = 'http://127.0.0.1:4320';
const OUT = process.argv[2];
const ANS = [
  { name: 'd1440', viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false },
  { name: 'm390', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
];
(async () => {
  const browser = await chromium.launch();
  for (const a of ANS) {
    const context = await browser.newContext({ viewport: a.viewport, isMobile: a.isMobile, hasTouch: a.hasTouch, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
    await context.route('**/*', (route) => { const u = new URL(route.request().url()); if (['127.0.0.1', 'localhost'].includes(u.hostname) || u.protocol === 'data:' || u.protocol === 'blob:') return route.continue(); return route.fulfill({ status: 204, body: '' }); });
    await context.addCookies([{ name: 'tezgel_consent_status', value: encodeURIComponent(JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: '2026-10-10T08:00:00.000Z', version: '2.1.0' })), url: SERVER }]);
    const page = await context.newPage();
    await page.goto(SERVER + '/standorte', { waitUntil: 'load', timeout: 90000 });
    await page.waitForTimeout(1200);
    const sec = page.locator('section[aria-labelledby="weitere-orte-titel"]');
    await sec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const info = await sec.evaluate((s) => {
      const r = s.getBoundingClientRect();
      const kinder = [...s.querySelectorAll(':scope > div > div > *, :scope > div > *')].slice(0, 6).map((k) => { const b = k.getBoundingClientRect(); return { tag: k.tagName, cls: String(k.className).slice(0, 50), x: Math.round(b.left), w: Math.round(b.width), y: Math.round(b.top - r.top), h: Math.round(b.height) }; });
      const kopf = s.querySelector('h2');
      const kb = kopf ? kopf.getBoundingClientRect() : null;
      return { breite: Math.round(r.width), hoehe: Math.round(r.height), links: s.getBoundingClientRect().left, kopf_x: kb ? Math.round(kb.left) : null, kopf_w: kb ? Math.round(kb.width) : null, kinder };
    });
    console.log(a.name, JSON.stringify(info));
    await sec.screenshot({ path: `${OUT}/anfrage-standorte-${a.name}.png` });
    await context.close();
  }
  await browser.close();
})().catch((e) => { console.error('FEHLER', e.message); process.exit(1); });
