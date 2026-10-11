// Zuklapp-Probe (P4-09, GEG2 N2-1): öffnet auf `/` (375 px) das Mobilmenü, klappt einen Bereich auf und wieder zu und
// verfolgt je Bild die Höhe und `content-visibility` des Bereichsinhalts. Erwartet: normal animiertes Zuklappen
// (≥ 3 Zwischenhöhen, am Ende 0 und `hidden`), reduziert sofort (keine Zwischenhöhe). Auch das Aufklappen wird verfolgt.
// Nutzung: node zuklappen.mjs --base http://127.0.0.1:43xx [--satz <beleg>]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { assertLocal, installSperre, setzeEinwilligung, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const BASE = arg('base', 'http://127.0.0.1:4310'); assertLocal(BASE);
const satz = arg('satz', null);
const browser = await chromium.launch();
const ergebnis = {};
for (const modus of ['no-preference', 'reduce']) {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, locale: 'de-DE', reducedMotion: modus });
  await installSperre(context); await setzeEinwilligung(context, 'abgelehnt', BASE);
  const page = await context.newPage();
  await page.goto(BASE + '/'); await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Architektur-Menü öffnen' }).click();
  const dialog = page.getByRole('dialog', { name: 'Hauptnavigation' }); await dialog.waitFor();
  // erster zugeklappter Bereichsknopf
  const knopf = dialog.locator('button[aria-controls][aria-expanded="false"]').first();
  const id = await knopf.getAttribute('aria-controls');
  const verfolge = () => page.evaluate((bid) => new Promise((fertig) => {
    const b = document.getElementById(bid); const kind = b.firstElementChild; const t0 = performance.now(); const werte = [];
    const bild = () => { werte.push({ t: Math.round(performance.now() - t0), h: Math.round(kind.getBoundingClientRect().height), cv: getComputedStyle(kind).contentVisibility });
      if (performance.now() - t0 < 700) requestAnimationFrame(bild); else fertig(werte); };
    requestAnimationFrame(bild);
  }), id);
  const auf = verfolge(); await knopf.click(); const aufW = await auf;
  await page.waitForTimeout(300);
  const zu = verfolge(); await knopf.click(); const zuW = await zu;
  const zwischen = (w) => { const max = Math.max(...w.map((x) => x.h)); return w.filter((x) => x.h > 0 && x.h < max).length; };
  ergebnis[modus] = {
    bereich: id,
    aufklappen: { zwischenhoehen: zwischen(aufW), sichtbar_ab_ms: aufW.find((x) => x.cv === 'visible')?.t ?? null, ende: aufW.at(-1) },
    zuklappen: { zwischenhoehen: zwischen(zuW), start_h: zuW[0]?.h, ende: zuW.at(-1), hidden_ab_ms: zuW.find((x) => x.cv === 'hidden')?.t ?? null },
  };
  await context.close();
}
await browser.close();
const n = ergebnis['no-preference'], r = ergebnis.reduce;
const ok = n.zuklappen.zwischenhoehen >= 3 && n.zuklappen.ende.h === 0 && n.zuklappen.ende.cv === 'hidden'
  && n.aufklappen.zwischenhoehen >= 3 && r.zuklappen.zwischenhoehen === 0 && r.aufklappen.zwischenhoehen === 0 && r.zuklappen.ende.cv === 'hidden';
console.log(JSON.stringify(ergebnis));
console.log(ok ? 'GRÜN' : 'ROT');
if (satz) { const aus = ensureDir(path.join(RELAUNCH, 'belege', satz)); fs.writeFileSync(path.join(aus, 'zuklappen.json'), JSON.stringify({ base: BASE, ergebnis, ok }, null, 2)); }
process.exit(ok ? 0 : 1);
