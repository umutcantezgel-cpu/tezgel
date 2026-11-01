import { chromium } from '@playwright/test';
import { ANSICHTEN, installSperre, setzeEinwilligung } from './lib.mjs';
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH });
for (const g of ['d1440', 't1024']) {
  const ctx = await b.newContext({ ...ANSICHTEN[g], viewport: { width: ANSICHTEN[g].width, height: ANSICHTEN[g].height }, reducedMotion: 'reduce' });
  await installSperre(ctx, {}); await setzeEinwilligung(ctx, 'abgelehnt', 'http://127.0.0.1:4325');
  const p = await ctx.newPage(); await p.goto('http://127.0.0.1:4325/', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => [...document.querySelectorAll('#ihre-lage li a > span[aria-hidden="true"]')].map((s) => Math.round(s.getBoundingClientRect().width)));
  console.log(g, '/ Lage-Zeichnungen', JSON.stringify(r));
  await ctx.close();
}
await b.close();
