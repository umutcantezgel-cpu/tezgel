import { chromium } from '@playwright/test';
import { ANSICHTEN, installSperre, setzeEinwilligung } from './lib.mjs';
// node r-probe-element.mjs base pfad selektor geraete ziel-präfix
const [base, pfad, sel, geraete, ziel] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH });
for (const g of geraete.split(',')) {
  const ctx = await b.newContext({ ...ANSICHTEN[g], viewport: { width: ANSICHTEN[g].width, height: ANSICHTEN[g].height }, reducedMotion: 'reduce' });
  await installSperre(ctx, {});
  await setzeEinwilligung(ctx, 'abgelehnt', base);
  const p = await ctx.newPage();
  await p.goto(base + pfad, { waitUntil: 'networkidle' });
  const el = p.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(300);
  await el.screenshot({ path: `${ziel}-${g}.png` });
  await ctx.close();
}
await b.close();
