// Hilfsskript SF-C3 (vorübergehend, wird nach dem Lauf gelöscht): Aufnahme einzelner Abschnitte (Selektor) im ruhigen Zustand.
// Nutzung: node sfixc3-band.mjs --base URL --ziel DIR --faelle "/seite|geraet|selektor|name;..." [--bewegt]
import path from 'node:path';
import { chromium } from 'playwright';
import { ANSICHTEN, CHROME, assertLocal, bereit, ensureDir, installSperre, setzeEinwilligung } from './lib.mjs';
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base'); assertLocal(base);
const ziel = ensureDir(arg('ziel'));
const bewegt = process.argv.includes('--bewegt');
const faelle = arg('faelle').split(';').filter(Boolean).map((f) => f.split('|'));
const browser = await chromium.launch({ executablePath: CHROME });
for (const [seite, g, sel, name] of faelle) {
  const v = ANSICHTEN[g];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, deviceScaleFactor: 1, locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: 'no-preference' });
  await installSperre(context);
  await setzeEinwilligung(context, 'abgelehnt', base);
  if (!bewegt) await context.addInitScript(() => { try { localStorage.setItem('tezgel-bewegung', 'ruhig'); } catch {} });
  const page = await context.newPage();
  await page.goto(base + seite, { waitUntil: 'load' });
  await bereit(page);
  await page.addStyleTag({ content: '.spaet-zeichnen{content-visibility:visible !important}' });
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(bewegt ? 2500 : 500);
  await el.screenshot({ path: path.join(ziel, `${name}.png`) });
  console.log('ok', name);
  await context.close();
}
await browser.close();
