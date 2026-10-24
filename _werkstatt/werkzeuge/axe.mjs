// Ebene 5: axe-core (wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa) je Seite und Ansicht, dazu Zustände:
// offenes Mobilmenü (m390) und Erstbesuch mit Einwilligungsbanner (m390, d1440).
// Nutzung: node axe.mjs --satz <name> [--seiten … | --hauptansichten] [--ansichten m390,d1440] [--zustaende] [--nur-zustaende] [--ziel DIR]
// --hauptansichten liest _werkstatt/HAUPTANSICHTEN.json (12 Seiten); zusammen mit --zustaende gelten die Zustände für alle 12.
// --ziel DIR schreibt axe.json bzw. axe-zustaende.json nach DIR (Standard: _werkstatt/belege/<satz>).
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, bereit, grundmenge, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
assertLocal();
const G = grundmenge();
const satz = arg('satz', 'adhoc');
const hauptansichten = process.argv.includes('--hauptansichten');
if (hauptansichten && arg('seiten')) throw new Error('ABBRUCH: --seiten und --hauptansichten bitte nicht zusammen.');
const HAUPT = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'HAUPTANSICHTEN.json'), 'utf8')).hauptansichten.map((h) => h.pfad);
const seiten = hauptansichten ? HAUPT : (arg('seiten') ? arg('seiten').split(',') : G.seiten);
const ansichten = (arg('ansichten') || Object.keys(ANSICHTEN).join(',')).split(',');
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const ergebnisse = [];

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
  const res = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const v2 = res.violations.map((x) => ({ id: x.id, impact: x.impact, hilfe: x.help, anzahl: x.nodes.length, ziele: x.nodes.slice(0, 5).map((n) => n.target.join(' ')) }));
  ergebnisse.push({ seite: s, ansicht: a, zustand, verstoesse: v2 });
  await context.close();
  process.stdout.write(v2.some((x) => ['serious', 'critical'].includes(x.impact)) ? 'X' : '.');
}

const jobs = [];
if (!process.argv.includes('--nur-zustaende')) for (const s of seiten) for (const a of ansichten) jobs.push([s, a, 'normal']);
// Zustände für die gewählten Seiten (--seiten), sonst Hauptansichten bzw. Hauptseiten (Runde 4: --seiten wurde übergangen)
if (process.argv.includes('--zustaende')) for (const s of hauptansichten ? HAUPT : arg('seiten') ? seiten : G.hauptseiten) { jobs.push([s, 'm390', 'menue']); jobs.push([s, 'm390', 'erstbesuch']); jobs.push([s, 'd1440', 'erstbesuch']); }
let i = 0;
await Promise.all(Array.from({ length: 3 }, async () => { while (i < jobs.length) { const j = jobs[i++]; try { await pruefe(...j); } catch (e) { ergebnisse.push({ seite: j[0], ansicht: j[1], zustand: j[2], fehler: String(e.message).slice(0, 200) }); } } }));
await browser.close();
const out = arg('ziel') ? ensureDir(path.resolve(arg('ziel'))) : ensureDir(path.join(RELAUNCH, 'belege', satz));
const zaehl = {};
for (const r of ergebnisse) for (const v of r.verstoesse || []) { const k = `${v.impact}:${v.id}`; zaehl[k] = (zaehl[k] || 0) + v.anzahl; }
const ernst = ergebnisse.reduce((n, r) => n + (r.verstoesse || []).filter((v) => ['serious', 'critical'].includes(v.impact)).reduce((m, v) => m + v.anzahl, 0), 0);
fs.writeFileSync(path.join(out, process.argv.includes('--nur-zustaende') ? 'axe-zustaende.json' : 'axe.json'), JSON.stringify({ satz, tags: TAGS, laeufe: ergebnisse.length, ernst_kritisch_knoten: ernst, je_regel: zaehl, ergebnisse }, null, 1));
console.log(`\naxe: ${ergebnisse.length} Läufe · ernst/kritisch (Knoten) ${ernst}`);
console.log(Object.entries(zaehl).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([k, n]) => `${k} ${n}`).join('\n'));
