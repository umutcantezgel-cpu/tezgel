// Lesender Live-Rauchtest im Browser (nach jedem Push, Plan Runde 2 P3-00i).
// Nur www.tezgel.de, nur GET/HEAD; alle anderen Hosts und schreibenden Anfragen werden abgefangen (G5).
// Prüft je Hauptseite: Status, Konsolenfehler, Seitenfehler (z. B. Hydration #418), CSP-Verstöße, x-build. Eine Seite nach der anderen.
// G1 (≤ 1 Anfrage/s live): alle Live-Abrufe laufen über eine Warteschlange mit ≥ 1 s Abstand; jede URL wird nur einmal
// geladen und danach aus dem Speicher bedient (Playwright-Routing schaltet den Browser-Cache ab).
// Nutzung: node live-browser.mjs <commit-sha> [--routen /a,/b]
import { chromium } from '@playwright/test';
import { grundmenge } from './lib.mjs';

const LIVE = 'https://www.tezgel.de';
const sha = process.argv[2] || '';
const iR = process.argv.indexOf('--routen');
const extra = iR > -1 ? process.argv[iR + 1].split(',') : [];
const seiten = [...new Set([...grundmenge().hauptseiten, ...extra])].concat('/gibt-es-nicht-relaunch');
let naechster = 0;
const warteschlange = async () => { const jetzt = Date.now(); const t = Math.max(jetzt, naechster); naechster = t + 1000; if (t > jetzt) await new Promise((r) => setTimeout(r, t - jetzt)); };
let liveAnfragen = 0;
const speicher = new Map();
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'de-DE' });
await context.route('**/*', (route) => {
  const req = route.request();
  const u = new URL(req.url());
  if (u.protocol === 'data:' || u.protocol === 'blob:') return route.continue();
  if (u.origin !== LIVE) return route.fulfill({ status: 204, body: '' });
  if (!['GET', 'HEAD'].includes(req.method())) return route.abort('blockedbyclient');
  const dokument = req.resourceType() === 'document' || req.headers()['rsc'];
  if (!dokument && speicher.has(req.url())) return route.fulfill(speicher.get(req.url()));
  return warteschlange().then(async () => {
    liveAnfragen++;
    const antwort = await route.fetch();
    const eintrag = { status: antwort.status(), headers: antwort.headers(), body: await antwort.body() };
    if (!dokument) speicher.set(req.url(), eintrag);
    return route.fulfill(eintrag);
  });
});
await context.addInitScript(() => {
  window.__csp = [];
  document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(`${e.violatedDirective} ${e.blockedURI}`));
});
let rot = 0;
for (const s of seiten) {
  const page = await context.newPage();
  const fehler = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) fehler.push(m.text().slice(0, 160)); });
  page.on('pageerror', (e) => fehler.push('pageerror: ' + String(e.message).slice(0, 160)));
  const res = await page.goto(LIVE + s, { waitUntil: 'load', timeout: 300000 });
  await page.waitForTimeout(1500);
  const csp = await page.evaluate(() => window.__csp || []);
  const build = await page.evaluate(() => document.querySelector('meta[name="x-build"]')?.content || '');
  const soll = s === '/gibt-es-nicht-relaunch' ? 404 : 200;
  const ok = res?.status() === soll && fehler.length === 0 && csp.length === 0 && (!sha || build.startsWith(sha) || s.startsWith('/gibt'));
  if (!ok) rot++;
  console.log(`${ok ? '✔' : '✘'} ${s} ${res?.status()} build=${build.slice(0, 7)} konsole=${fehler.length} csp=${csp.length}${fehler.length ? ' · ' + fehler.join(' | ') : ''}${csp.length ? ' · ' + csp.join(' | ') : ''}`);
  await page.close();
  await new Promise((r) => setTimeout(r, 1000));
}
await browser.close();
console.log(`Live-Anfragen: ${liveAnfragen} (≥ 1 s Abstand)`);
console.log(rot ? `ROT (${rot})` : 'GRÜN');
process.exit(rot ? 1 : 0);
