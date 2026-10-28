// Fokusbilder UM-E3-ZUST: Glasbild auf /referenzen (d1440, feiner Zeiger) und untere Leiste (m390). Sperre wie alle Läufe (G5).
import { chromium, devices } from '/home/user/tezgel/_werkstatt/werkzeuge/node_modules/@playwright/test/index.mjs';
import { installSperre, setzeEinwilligung } from '/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs';
const [BASE, ZIEL] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
async function kontext(opts) {
  const c = await browser.newContext({ locale: 'de-DE', reducedMotion: 'reduce', ...opts });
  await installSperre(c, { protokoll: [] }); await setzeEinwilligung(c, 'abgelehnt', BASE); return c;
}
let c = await kontext({ viewport: { width: 1440, height: 900 } });
let p = await c.newPage();
await p.goto(BASE + '/referenzen', { waitUntil: 'networkidle' });
const g = p.locator('a.glasbild').first();
await g.scrollIntoViewIfNeeded(); await g.focus(); await p.waitForTimeout(400);
const box = await g.boundingBox();
await p.screenshot({ path: `${ZIEL}/glasbild-fokus-d1440.png`, clip: { x: Math.max(0, box.x - 12), y: Math.max(0, box.y - 12), width: Math.min(box.width + 24, 700), height: Math.min(box.height + 24, 500) } });
await c.close();
c = await kontext({ ...devices['Pixel 7'] });
p = await c.newPage();
await p.goto(BASE + '/', { waitUntil: 'networkidle' });
for (const name of ['Anrufen', 'Termin']) {
  const l = p.locator('aside a, aside button').filter({ hasText: name }).first();
  await l.focus(); await p.waitForTimeout(300);
  const b = await p.locator('aside').first().boundingBox();
  await p.screenshot({ path: `${ZIEL}/leiste-fokus-${name.toLowerCase()}-m390.png`, clip: { x: 0, y: b.y - 6, width: b.width, height: b.height + 6 } });
}
await c.close(); await browser.close(); console.log('ok');
