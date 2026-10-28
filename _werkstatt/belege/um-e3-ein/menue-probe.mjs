import { chromium, devices } from '/home/user/tezgel/_werkstatt/werkzeuge/node_modules/@playwright/test/index.mjs';
import { installSperre, setzeEinwilligung } from '/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs';
const BASE = process.argv[2];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const erg = [];
for (let i = 0; i < 8; i++) {
  const context = await browser.newContext({ ...devices['Pixel 7'], reducedMotion: 'no-preference', locale: 'de-DE' });
  await installSperre(context, { protokoll: [] });
  await setzeEinwilligung(context, 'abgelehnt', BASE);
  await context.addInitScript(() => {
    window.__log = [];
    const t0 = performance.now();
    document.addEventListener('toggle', (e) => window.__log.push(['toggle', e.newState, e.target.id, Math.round(performance.now() - t0)]), true);
    document.addEventListener('beforetoggle', (e) => window.__log.push(['before', e.newState, e.target.id, Math.round(performance.now() - t0)]), true);
    ['pointerdown', 'click', 'scroll'].forEach((n) => window.addEventListener(n, (e) => window.__log.push([n, (e.target && e.target.id) || e.target?.tagName, Math.round(performance.now() - t0)]), true));
    new MutationObserver(() => window.__log.push(['html', document.documentElement.className.replace(/__variable_\w+/g, '').trim(), Math.round(performance.now() - t0)])).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  });
  const page = await context.newPage();
  await page.goto(BASE + '/');
  const knopf = page.locator('header').getByRole('button', { name: 'Menü öffnen' });
  await page.waitForFunction(() => { const b = [...document.querySelectorAll('header button')].find((x) => x.textContent.includes('Menü') || x.getAttribute('aria-label')?.includes('Menü')); return b && Object.keys(b).some((k) => k.startsWith('__reactProps$')); });
  await knopf.click();
  await page.waitForTimeout(800);
  const offen = await page.evaluate(() => document.getElementById('mobile-menu')?.matches(':popover-open'));
  const log = await page.evaluate(() => window.__log);
  erg.push({ i, offen, log: log.filter((l) => l[0] !== 'scroll' || true).slice(-14) });
  await context.close();
}
await browser.close();
for (const e of erg) console.log(e.i, e.offen, JSON.stringify(e.log));
