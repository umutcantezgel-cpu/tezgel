// Uhr-Probe (P4-05d, I-19): lädt Seiten mit vorgestellter Browseruhr (+0, +1, +3, +30 Tage gegen den Build-Tag) und zählt
// Seitenfehler und Konsolenfehler (z. B. React #418, wenn vorgerendertes HTML vom Datum abhängt). Erwartet: überall 0.
// Nutzung: node uhr.mjs --base http://127.0.0.1:43xx [--seiten /termin,/kontakt] [--satz <beleg>]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { installSperre, setzeEinwilligung, assertLocal, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const BASE = arg('base', 'http://127.0.0.1:4310'); assertLocal(BASE);
const seiten = arg('seiten', '/termin,/kontakt').split(',');
const satz = arg('satz', null);
const b = await chromium.launch();
const ergebnis = [];
for (const tage of [0, 1, 3, 30]) {
  const c = await b.newContext({ locale: 'de-DE', timezoneId: 'Europe/Berlin' }); await installSperre(c); await setzeEinwilligung(c, 'abgelehnt', BASE);
  const p = await c.newPage();
  if (tage) await p.clock.setSystemTime(new Date(Date.now() + tage * 86400000));
  for (const s of seiten) {
    const fehler = [];
    const aufFehler = (e) => fehler.push(`seite: ${e.message.slice(0, 100)}`);
    const aufKonsole = (m) => { if (m.type() === 'error') fehler.push(`konsole: ${m.text().slice(0, 100)}`); };
    p.on('pageerror', aufFehler); p.on('console', aufKonsole);
    await p.goto(BASE + s); await p.waitForLoadState('networkidle'); await p.waitForTimeout(400);
    const tageSichtbar = await p.evaluate(() => document.querySelectorAll('button').length);
    p.off('pageerror', aufFehler); p.off('console', aufKonsole);
    ergebnis.push({ tage, seite: s, fehler, knoepfe: tageSichtbar });
    console.log(`+${tage} Tage ${s}: ${fehler.length ? fehler.join(' | ') : 'keine Fehler'}`);
  }
  await c.close();
}
await b.close();
const rot = ergebnis.filter((e) => e.fehler.length).length;
console.log(rot ? `ROT (${rot})` : 'GRÜN');
if (satz) { const aus = ensureDir(path.join(RELAUNCH, 'belege', satz)); fs.writeFileSync(path.join(aus, 'uhr.json'), JSON.stringify({ base: BASE, ergebnis }, null, 2)); }
process.exit(rot ? 1 : 0);
