// Prüf-Hilfsskript (UM-E4-SICHT-FIX-2-r, Prüfer 0): Aufnahmen und Messungen nach Auftragsliste. Wird nach dem Lauf gelöscht.
// Nutzung: node p0-mess.mjs BASE ZIEL jobs.json
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, durchscrollen, bereit, versteckeDevOverlay, ensureDir } from './lib.mjs';

const [base, zielArg, jobsDatei] = process.argv.slice(2);
assertLocal(base);
const ziel = ensureDir(path.resolve(zielArg));
const jobs = JSON.parse(fs.readFileSync(jobsDatei, 'utf8'));
const browser = await chromium.launch({ args: ['--font-render-hinting=none'], executablePath: process.env.CHROME_PATH || undefined });
const ergebnis = [];
// Jobs nach Gerät und Seite gruppieren
const gruppen = new Map();
for (const j of jobs) {
  const k = `${j.geraet}|${j.seite}|${j.dpr || 1}`;
  if (!gruppen.has(k)) gruppen.set(k, []);
  gruppen.get(k).push(j);
}
for (const [k, liste] of gruppen) {
  const [g, s, dpr] = k.split('|');
  const v = ANSICHTEN[g];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: Number(dpr), isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
  await installSperre(context, { protokoll: [] });
  await setzeEinwilligung(context, 'abgelehnt', base);
  const page = await context.newPage();
  try {
    await page.goto(base + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await bereit(page);
    await versteckeDevOverlay(page);
    await durchscrollen(page);
    await bereit(page);
    for (const j of liste) {
      const datei = path.join(ziel, `${j.name}.png`);
      const r = { name: j.name, geraet: g, seite: s };
      try {
        if (j.aktion === 'viewport') {
          await page.evaluate((y) => window.scrollTo(0, y), j.scrollY || 0);
          await page.waitForTimeout(250);
          await page.screenshot({ path: datei });
        } else if (j.aktion === 'selector') {
          const el = page.locator(j.sel).first();
          await el.scrollIntoViewIfNeeded();
          await page.waitForTimeout(250);
          r.box = await el.boundingBox();
          await el.screenshot({ path: datei });
        } else if (j.aktion === 'clip') {
          // Ausschnitt aus der Seite: y0/y1 in Seitenkoordinaten, volle Breite
          await page.screenshot({ path: datei, fullPage: true, clip: { x: j.x || 0, y: j.y0, width: j.w || v.width, height: j.y1 - j.y0 } });
        }
        if (j.js) r.daten = await page.evaluate(j.js);
      } catch (e) { r.fehler = String(e.message).slice(0, 200); }
      ergebnis.push(r);
    }
  } catch (e) {
    for (const j of liste) ergebnis.push({ name: j.name, fehler: String(e.message).slice(0, 200) });
  }
  await context.close();
}
await browser.close();
fs.writeFileSync(path.join(ziel, '_ergebnis.json'), JSON.stringify(ergebnis, null, 1));
console.log(JSON.stringify(ergebnis, null, 1).slice(0, 6000));
