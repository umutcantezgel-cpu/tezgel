// Ebene 5: axe-core (wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa) je Seite und Ansicht, dazu Zustände:
// offenes Mobilmenü (m375) und Erstbesuch mit Einwilligungsbanner.
// Nutzung: node axe.mjs --satz <name> [--seiten …] [--ansichten m375,d1440] [--zustaende] [--fehler] [--nur-zustaende]
// --fehler (P4-GEG M4): sichtbare Fehlerzustände der Formulare, Abläufe wie in den Funktionstests, für Bestand und Kern gleich
//   (Knopfnamen beider Fassungen): Funnel-Serverfehler (/kontakt, /leistungen), Kalender mit leerem Namen (/kontakt),
//   Projekt-Check-Serverfehler (/bad); je m375 und d1440, nur Seiten aus --seiten. Serverfehler per page.route (500), nie echt.
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, bereit, grundmenge, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
assertLocal();
const G = grundmenge();
const satz = arg('satz', 'adhoc');
const seiten = arg('seiten') ? arg('seiten').split(',') : G.seiten;
const ansichten = (arg('ansichten') || Object.keys(ANSICHTEN).join(',')).split(',');
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const browser = await chromium.launch();
const ergebnisse = [];

// Wartet, bis React das Element übernommen hat (wie `bedienbar` der Tests): sonst gehen Klicks vor dem Hydrieren verloren.
async function bedienbar(locator) {
  for (let n = 0; n < 150; n++) {
    if (await locator.first().evaluate((el) => Object.keys(el).some((k) => k.startsWith('__reactProps$'))).catch(() => false)) return locator;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('nicht hydriert');
}
// Fester Scrollstand für die Messung: Das Formular mit der Fehlermeldung steht mit seiner Oberkante unter dem festen Kopf
// (scrollIntoView block start beachtet scroll-padding-top, wie Sprungziele der Seite). Ohne das bliebe der Scrollstand dem
// automatischen Rollen von fill()/click() überlassen, und ein beliebiges Element am oberen Bildrand läge halb unter dem Kopf –
// axe meldet das als „target-size: teilweise verdeckt“ (P4-Tor, Messregel in E-032).
async function mittig(locator) {
  await locator.waitFor({ timeout: 10000 });
  await locator.evaluate((el) => (el.closest('form') || el.closest('section') || el).scrollIntoView({ block: 'start', behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 300));
}
const serverfehler = (page) => page.route('**/api/anfrage', (r) => r.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ success: false, error: 'Test-Ausfall' }) }));
const FEHLER = {
  'fehler-funnel-server': { seiten: ['/kontakt', '/leistungen'], ablauf: async (page) => {
    await serverfehler(page);
    const weiter = (n) => page.locator('#express-anfrage').getByRole('button', { name: new RegExp(`^Weiter zu Schritt ${n}:`) });
    await (await bedienbar(weiter(2))).click();
    await weiter(3).click();
    await page.locator('#funnel-name').fill('Prüf Person');
    await page.locator('#funnel-phone').fill('0170 0000000');
    await page.getByRole('button', { name: /^Anfrage (senden|verbindlich absenden)$/ }).click();
    await mittig(page.getByText('Fehler beim Absenden:').first());
  } },
  'fehler-kalender-name': { seiten: ['/kontakt'], ablauf: async (page) => {
    const tag = page.getByRole('button', { name: /^\w{2}, \d{2}\.\d{2}\.\d{4}/ });
    if (await tag.count()) { await (await bedienbar(tag.nth(1))).click(); await page.getByRole('radio', { name: '15:00 Uhr', exact: true }).click(); }
    else await (await bedienbar(page.getByRole('button', { name: '15:00 Uhr', exact: true }).nth(1))).click();
    await page.getByPlaceholder('Vor- und Nachname').fill('   ');
    await page.getByPlaceholder('0172 / 1234567').fill('0170 0000000');
    await page.locator('#booking-consent').check();
    await page.locator('form').filter({ has: page.locator('#booking-consent') }).getByRole('button', { name: /Vor-Ort-Termin anfragen/ }).click();
    await mittig(page.getByText('Bitte füllen Sie Name und Telefonnummer aus').first());
  } },
  'fehler-projektcheck-server': { seiten: ['/bad'], ablauf: async (page) => {
    await serverfehler(page);
    const w = page.locator('#projekt-check');
    await bedienbar(w.getByLabel(/^1\. Badezimmer-Größe in Quadratmetern/));
    await w.getByRole('button', { name: 'Angebot mit Festpreis anfordern', exact: true }).click();
    await w.getByLabel('Ihr Name', { exact: true }).fill('Prüf Person');
    await w.getByLabel('Ihre Telefonnummer', { exact: true }).fill('0170 0000000');
    await w.getByRole('button', { name: 'Online anfragen (mit E-Mail-Bestätigung)', exact: true }).click();
    await mittig(w.getByRole('alert').first());
  } },
};

async function pruefe(s, a, zustand = 'normal') {
  const v = ANSICHTEN[a];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce', locale: 'de-DE' });
  await installSperre(context);
  await setzeEinwilligung(context, zustand === 'erstbesuch' ? 'erstbesuch' : 'abgelehnt');
  const page = await context.newPage();
  await page.goto(BASE + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await bereit(page);
  if (zustand === 'menue') {
    const knopf = page.locator('header button[aria-expanded]:visible, header button[aria-controls]:visible, header button[aria-label*="enü"]:visible').first();
    if (await knopf.count()) { await knopf.click(); await page.waitForTimeout(400); }
  }
  if (zustand === 'erstbesuch') await page.waitForTimeout(900); // Banner erscheint nach 400 ms
  if (FEHLER[zustand]) await FEHLER[zustand].ablauf(page);
  const res = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const v2 = res.violations.map((x) => ({ id: x.id, impact: x.impact, hilfe: x.help, anzahl: x.nodes.length, ziele: x.nodes.slice(0, 5).map((n) => n.target.join(' ')), knoten: x.nodes.slice(0, 3).map((n) => ({ html: n.html.slice(0, 240), grund: (n.failureSummary || '').slice(0, 300) })) }));
  ergebnisse.push({ seite: s, ansicht: a, zustand, verstoesse: v2 });
  await context.close();
  process.stdout.write(v2.some((x) => ['serious', 'critical'].includes(x.impact)) ? 'X' : '.');
}

const jobs = [];
if (!process.argv.includes('--nur-zustaende')) for (const s of seiten) for (const a of ansichten) jobs.push([s, a, 'normal']);
if (process.argv.includes('--zustaende')) for (const s of G.hauptseiten) { jobs.push([s, 'm375', 'menue']); jobs.push([s, 'm375', 'erstbesuch']); jobs.push([s, 'd1440', 'erstbesuch']); }
if (process.argv.includes('--fehler')) for (const [z, f] of Object.entries(FEHLER)) for (const s of f.seiten) if (seiten.includes(s)) for (const a of ['m375', 'd1440']) jobs.push([s, a, z]);
let i = 0;
await Promise.all(Array.from({ length: 3 }, async () => { while (i < jobs.length) { const j = jobs[i++]; try { await pruefe(...j); } catch (e) { ergebnisse.push({ seite: j[0], ansicht: j[1], zustand: j[2], fehler: String(e.message).slice(0, 200) }); } } }));
await browser.close();
const out = ensureDir(path.join(RELAUNCH, 'belege', satz));
const zaehl = {};
for (const r of ergebnisse) for (const v of r.verstoesse || []) { const k = `${v.impact}:${v.id}`; zaehl[k] = (zaehl[k] || 0) + v.anzahl; }
const ernst = ergebnisse.reduce((n, r) => n + (r.verstoesse || []).filter((v) => ['serious', 'critical'].includes(v.impact)).reduce((m, v) => m + v.anzahl, 0), 0);
fs.writeFileSync(path.join(out, process.argv.includes('--nur-zustaende') ? 'axe-zustaende.json' : 'axe.json'), JSON.stringify({ satz, tags: TAGS, laeufe: ergebnisse.length, ernst_kritisch_knoten: ernst, je_regel: zaehl, ergebnisse }, null, 1));
console.log(`\naxe: ${ergebnisse.length} Läufe · ernst/kritisch (Knoten) ${ernst}`);
console.log(Object.entries(zaehl).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([k, n]) => `${k} ${n}`).join('\n'));
