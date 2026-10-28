// Cursor-Probe UM-E3-CURSOR: Desktop mit Maus (Glasbild → ansehen, Tab blendet aus), Touch lädt kein Schild, ruhig ohne Bewegung.
import { chromium, devices } from '/home/user/tezgel/_werkstatt/werkzeuge/node_modules/@playwright/test/index.mjs';
import { installSperre, setzeEinwilligung } from '/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs';
const [BASE, ZIEL] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const erg = {};
async function kontext(opts, init) {
  const c = await browser.newContext({ locale: 'de-DE', ...opts });
  await installSperre(c, { protokoll: [] }); await setzeEinwilligung(c, 'abgelehnt', BASE);
  if (init) await c.addInitScript(init);
  return c;
}
const schild = (p) => p.evaluate(() => { const s = document.querySelector('[data-motion="cursor"]'); return s ? { stand: s.getAttribute('data-cursor-stand'), zustand: s.getAttribute('data-cursor-zustand'), text: s.textContent.trim().slice(0, 40) } : null; });
// 1 Desktop, Bewegung an
let c = await kontext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
let p = await c.newPage(); const fehler = []; p.on('pageerror', (e) => fehler.push(String(e)));
await p.goto(BASE + '/referenzen', { waitUntil: 'networkidle' });
const g = p.locator('a.glasbild').first(); await g.scrollIntoViewIfNeeded();
const b = await g.boundingBox();
await p.mouse.move(b.x + 20, b.y + 20); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 5 }); await p.waitForTimeout(700);
erg.desktop_glasbild = await schild(p);
await p.screenshot({ path: `${ZIEL}/cursor-glasbild-d1440.png`, clip: { x: Math.max(0, b.x), y: Math.max(0, b.y), width: Math.min(b.width, 700), height: Math.min(b.height, 500) } });
await p.keyboard.press('Tab'); await p.waitForTimeout(300);
erg.desktop_nach_tab = await schild(p);
await p.mouse.move(10, 400, { steps: 3 }); await p.waitForTimeout(400);
erg.desktop_ausserhalb = await schild(p);
erg.desktop_fehler = fehler;
await c.close();
// 2 Touch
c = await kontext({ ...devices['Pixel 7'], reducedMotion: 'no-preference' });
p = await c.newPage(); await p.goto(BASE + '/referenzen', { waitUntil: 'networkidle' });
await p.locator('a.glasbild').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
erg.touch = await schild(p);
await c.close();
// 3 Desktop ruhig
c = await kontext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' }, () => { try { localStorage.setItem('tezgel-bewegung', 'ruhig'); } catch {} });
p = await c.newPage(); await p.goto(BASE + '/referenzen', { waitUntil: 'networkidle' });
const g2 = p.locator('a.glasbild').first(); await g2.scrollIntoViewIfNeeded(); const b2 = await g2.boundingBox();
await p.mouse.move(b2.x + 20, b2.y + 20); await p.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2, { steps: 5 }); await p.waitForTimeout(700);
erg.ruhig = await schild(p);
erg.ruhig_transition = await p.evaluate(() => { const s = document.querySelector('[data-motion="cursor"]'); return s ? getComputedStyle(s).transitionDuration + ' / ' + getComputedStyle(s).animationName : null; });
await c.close(); await browser.close();
console.log(JSON.stringify(erg));
