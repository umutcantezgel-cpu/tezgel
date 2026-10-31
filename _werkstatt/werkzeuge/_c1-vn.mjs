import path from 'node:path';
import { chromium } from 'playwright';
import { ANSICHTEN, installSperre, setzeEinwilligung, bereit, CHROME } from './lib.mjs';
const [base, ziel, name] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: CHROME });
for (const g of ['q844', 'm390', 'd1440', 't1024']) {
  const v = ANSICHTEN[g];
  const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce' });
  await installSperre(ctx); await setzeEinwilligung(ctx, 'abgelehnt', base);
  await ctx.addInitScript(() => { try { localStorage.setItem('tezgel-bewegung', 'ruhig'); } catch {} });
  const page = await ctx.newPage();
  await page.goto(base + '/referenzen', { waitUntil: 'load' }); await bereit(page);
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => { const h = document.querySelector('.vn-buehne').closest('figure'); window.scrollTo(0, h.getBoundingClientRect().top + scrollY - (innerHeight < 500 ? 56 : 120)); });
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(ziel, `${g}-vn-${name}.png`) });
  await ctx.close();
}
await browser.close();
