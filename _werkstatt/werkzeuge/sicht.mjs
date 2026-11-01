// Sicht (UM-E3-FIX, aus dem Skript des Baumeisters; übernommen und berichtigt in UM-E4-SICHT-FIX-2 M2-O1): Bildschirmfotos nur
// gegen den lokalen Prüfserver, jeder Lauf über installSperre (G5). Aufruf: node sicht.mjs <ziel> [ruhe|eingang] [geraete] [seite], SICHT_BASE=URL.
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { installSperre, setzeEinwilligung, ANSICHTEN, assertLocal, durchscrollen } from '/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs';
const require = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = require('@playwright/test');

const BASE = process.env.SICHT_BASE || 'http://127.0.0.1:4325';
assertLocal(BASE);
const [ziel, modus = 'ruhe', geraeteArg = 'm390,t1024,d1440,d1920', seite = '/'] = process.argv.slice(2);
fs.mkdirSync(ziel, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });

async function kontext(g, { reduziert = false, erstbesuch = false } = {}) {
  const a = ANSICHTEN[g];
  const context = await browser.newContext({ viewport: { width: a.width, height: a.height }, isMobile: a.isMobile, hasTouch: a.hasTouch, deviceScaleFactor: 1, reducedMotion: reduziert ? 'reduce' : 'no-preference', locale: 'de-DE' });
  await installSperre(context, { intro: erstbesuch ? 'erstbesuch' : 'gesehen' });
  await setzeEinwilligung(context, 'abgelehnt', BASE);
  return context;
}

const geraete = geraeteArg.split(',');
const name = seite === '/' ? 'start' : seite.replace(/\//g, '_');
for (const g of geraete) {
  if (modus === 'eingang') {
    // Erstbesuch: je Bild ein frischer Kontext; alle Zeit-Animationen anhalten und auf t setzen (Scroll-Zeitstrahlen bleiben)
    for (const t of [0, 150, 300, 450, 600, 800, 1000, 1200, 1500]) {
      const c = await kontext(g, { erstbesuch: true });
      const p = await c.newPage();
      await p.goto(BASE + seite, { waitUntil: 'domcontentloaded' });
      // M2-O1 (UM-E4-SICHT-FIX-2): zwei Bilder abwarten, bevor die Animationen angehalten werden; vorher ist die erste
      // Auswertung der Container-Abfragen (z. B. Hauptnavigation @7xl) noch nicht erfolgt, und das Bild zeigte einen Scheinbefund.
      await p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null)))));
      const info = await p.evaluate((t) => {
        const anis = document.getAnimations().filter((a) => a.timeline === document.timeline);
        for (const a of anis) { a.pause(); a.currentTime = t; }
        return { klassen: document.documentElement.className, zahl: anis.length, namen: [...new Set(anis.map((a) => a.animationName))] };
      }, t);
      await p.screenshot({ path: path.join(ziel, `${g}-eingang-${String(t).padStart(4, '0')}.png`) });
      if (t === 0) fs.writeFileSync(path.join(ziel, `${g}-eingang-info.json`), JSON.stringify(info, null, 1));
      await c.close();
    }
    continue;
  }
  const c = await kontext(g, { reduziert: modus === 'reduziert' });
  const p = await c.newPage();
  await p.goto(BASE + seite, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await durchscrollen(p);
  await p.waitForTimeout(300);
  const vh = ANSICHTEN[g].height;
  const hoehe = await p.evaluate(() => document.documentElement.scrollHeight);
  // Bildschirmhöhen ab oben, bis zur Galerie (etwa 4 Bildschirme), dann gezielte Stellen
  const stellen = [];
  for (let y = 0, i = 0; y < Math.min(hoehe, vh * (modus === 'oben' ? 2 : 5)); y += Math.round(vh * 0.85), i++) stellen.push([`${String(i).padStart(2, '0')}`, y]);
  if (modus !== 'oben') for (const id of ['ihre-lage', 'was-wir-tun', 'ablauf', 'unsere-arbeiten', 'kundenstimmen', 'einsatzgebiet', 'naechster-schritt']) {
    const y = await p.evaluate((id) => { const e = document.getElementById(id); return e ? Math.round(e.getBoundingClientRect().top + scrollY - 200) : null; }, id);
    if (y !== null) stellen.push([`ab-${id}`, Math.max(0, y)]);
  }
  for (const [n, y] of stellen) {
    await p.evaluate((y) => window.scrollTo(0, y), y);
    await p.waitForTimeout(250);
    await p.screenshot({ path: path.join(ziel, `${g}-${modus}-${name}-${n}.png`) });
  }
  // Maße des Einstiegs
  const masse = await p.evaluate(() => {
    const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y + scrollY), w: Math.round(b.width), h: Math.round(b.height) }; };
    window.scrollTo(0, 0);
    const h1 = document.querySelector('h1');
    return { h1: r('h1'), h1Schrift: h1 && getComputedStyle(h1).fontSize, schnur: r('[data-eingang="schnur"]'), lot: r('.einstieg-lot .leitachse'), ort: r('[data-erstes-bild="ort"]'), bild: r('[data-eingang="bild"] img'), knoepfe: r('[data-eingang="knoepfe"]'), sichtbareKreuze: [...document.querySelectorAll('.abschnitt-kreuz')].map((e) => getComputedStyle(e).display + ':' + (e.closest('section')?.id || '?')), marke: (() => { const m = document.querySelector('.leitfaden-marke'); return m && getComputedStyle(m).display; })() };
  });
  fs.writeFileSync(path.join(ziel, `${g}-${modus}-${name}-masse.json`), JSON.stringify(masse, null, 1));
  await c.close();
}
await browser.close();
