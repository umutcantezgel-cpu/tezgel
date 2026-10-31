import { chromium } from '@playwright/test';
import { installSperre, setzeEinwilligung, bereit, durchscrollen } from './lib.mjs';
const BASE = process.env.RELAUNCH_BASE;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
async function ctx(w, h, mobile) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1, locale: 'de-DE', reducedMotion: 'reduce' });
  await installSperre(c); await setzeEinwilligung(c, 'abgelehnt', BASE); return c;
}
// 2) Querformat Handy 667x375: Galerie mit zwei Hochformaten
{
  const c = await ctx(667, 375, true); const page = await c.newPage();
  for (const s of ['/bad/barrierefreies-bad']) {
    await page.goto(BASE + s, { waitUntil: 'domcontentloaded' }); await bereit(page); await durchscrollen(page);
    const r = await page.evaluate(() => {
      const a = document.querySelector('#unsere-arbeiten');
      return [...a.querySelectorAll('.glas-hoch')].map((e) => { const li = e.closest('li') || e.parentElement; const b = e.getBoundingClientRect(), l = li.getBoundingClientRect(); return { foto: [Math.round(b.left), Math.round(b.width)], karte: [Math.round(l.left), Math.round(l.width)] }; });
    });
    console.log('667x375', s, JSON.stringify(r));
  }
  await c.close();
}
await browser.close();
