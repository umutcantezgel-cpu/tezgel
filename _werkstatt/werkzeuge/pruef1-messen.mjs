import { chromium } from '@playwright/test';
import fs from 'node:fs';
import { ANSICHTEN, installSperre, setzeEinwilligung, bereit, durchscrollen, versteckeDevOverlay } from './lib.mjs';
const out = process.argv[2];
const bases = { vor: 'http://127.0.0.1:4325', nach: 'http://127.0.0.1:4563' };
const seiten = (process.argv[3] || '/fliesen').split(',');
const geraete = (process.argv[4] || 'm390').split(',');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const res = [];
for (const [stand, base] of Object.entries(bases)) {
  for (const g of geraete) for (const s of seiten) {
    const v = ANSICHTEN[g];
    const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
    await installSperre(ctx, { protokoll: [] });
    await setzeEinwilligung(ctx, 'abgelehnt', base);
    const page = await ctx.newPage();
    try {
      await page.goto(base + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await bereit(page); await versteckeDevOverlay(page); await durchscrollen(page); await bereit(page);
      const d = await page.evaluate(() => {
        const r = {};
        // doppelte Fotos
        const urls = [...document.querySelectorAll('main img, img')].map((i) => { const m = (i.getAttribute('src') || '').match(/url=([^&]+)/); return m ? decodeURIComponent(m[1]) : i.getAttribute('src'); }).filter(Boolean);
        const cnt = {}; urls.forEach((u) => (cnt[u] = (cnt[u] || 0) + 1));
        r.doppelt = Object.entries(cnt).filter(([, n]) => n > 1).map(([u, n]) => `${u} x${n}`);
        // Bereichszeilen: Feld und Text
        r.zeilen = [...document.querySelectorAll('a.group.flex')].filter((a) => a.querySelector('.min-w-0.flex-1')).map((a) => {
          const feld = a.firstElementChild; const text = a.querySelector('.min-w-0.flex-1');
          const fr = feld.getAttribute('aria-hidden') ? feld.getBoundingClientRect() : null;
          return { name: text.querySelector('span')?.textContent?.slice(0, 24), feldB: fr ? Math.round(fr.width) : 0, textB: Math.round(text.getBoundingClientRect().width), textX: Math.round(text.getBoundingClientRect().x), liB: Math.round(a.getBoundingClientRect().width) };
        });
        // Glasbilder
        r.glas = [...document.querySelectorAll('.glasbild')].map((g) => { const b = g.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y + scrollY), w: Math.round(b.width), h: Math.round(b.height) }; });
        // Vorspann
        r.vorspann = [...document.querySelectorAll('[data-kopf-pause]')].map((e) => { const b = e.getBoundingClientRect(); const p = e.querySelector('p'); const cs = p ? getComputedStyle(p) : null; return { x: Math.round(b.x), w: Math.round(b.width), fs: cs?.fontSize }; });
        return r;
      });
      res.push({ stand, g, s, ...d });
    } catch (e) { res.push({ stand, g, s, fehler: String(e.message).slice(0, 200) }); }
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log('fertig', res.length);
