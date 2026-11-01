// UM-E5-C Zugangsprobe (Prüfstufe C, Z-07/Z-09/Z-11): Reflow 320 px, erzwungene Farben und Seitensuche auf den zwölf Hauptansichten.
// Nur gegen den lokalen Prüfserver, jeder Kontext über installSperre (G5), Einwilligung abgelehnt.
// Aufruf: node zugang.mjs <base> <ziel>
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { installSperre, setzeEinwilligung, assertLocal, bereit, ueberlauf, durchscrollen, slug } from '/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs';
const require = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = require('@playwright/test');

const [BASE, ZIEL] = process.argv.slice(2);
assertLocal(BASE);
fs.mkdirSync(ZIEL, { recursive: true });
const SEITEN = ['/', '/bad', '/bad/badsanierung', '/bad/barrierefreies-bad', '/leistungen', '/fliesen', '/balkon-terrasse', '/referenzen', '/ueber-uns', '/kontakt', '/standorte/wetzlar', '/blog'];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const erg = { base: BASE, reflow: [], farben: [], suche: [] };

async function kontext(opts) {
  const c = await browser.newContext({ locale: 'de-DE', deviceScaleFactor: 1, reducedMotion: 'reduce', ...opts });
  await installSperre(c, { intro: 'gesehen' });
  await setzeEinwilligung(c, 'abgelehnt', BASE);
  return c;
}

// 1. Reflow 320 px (WCAG 1.4.10): kein waagerechtes Scrollen der Seite, nichts ragt heraus, kein abgeschnittener Text.
for (const s of SEITEN) {
  const c = await kontext({ viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true });
  const p = await c.newPage();
  const fehler = [];
  p.on('pageerror', (e) => fehler.push(String(e).slice(0, 200)));
  await p.goto(BASE + s); await bereit(p); await durchscrollen(p); await p.evaluate(() => window.scrollTo(0, 0));
  const befunde = await ueberlauf(p);
  const d = path.join(ZIEL, 'reflow', slug(s)); fs.mkdirSync(d, { recursive: true });
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (const [i, y] of [0, 0.33, 0.66].entries()) { await p.evaluate((yy) => window.scrollTo(0, yy), Math.round(h * y)); await p.waitForTimeout(150); await p.screenshot({ path: path.join(d, `0${i}.png`) }); }
  erg.reflow.push({ seite: s, befunde, skriptfehler: fehler });
  await c.close();
}

// 2. Erzwungene Farben (Windows-Kontrast): Schrift und Bedienelemente lesbar, rote Kreuze und Cursor ausgeblendet.
for (const g of [{ k: 'd1440', viewport: { width: 1440, height: 900 } }, { k: 'm390', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]) {
  for (const s of SEITEN) {
    const c = await kontext({ viewport: g.viewport, isMobile: !!g.isMobile, hasTouch: !!g.hasTouch, forcedColors: 'active' });
    const p = await c.newPage();
    await p.goto(BASE + s); await bereit(p);
    if (g.k === 'd1440') { await p.mouse.move(700, 450); await p.waitForTimeout(200); }
    const info = await p.evaluate(() => {
      const sichtbar = (el) => { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0 && r.width > 0 && r.height > 0; };
      return {
        forced: matchMedia('(forced-colors: active)').matches,
        kreuzRotSichtbar: [...document.querySelectorAll('.kreuz-rot')].filter(sichtbar).length,
        cursorSichtbar: [...document.querySelectorAll('.k-cursor')].filter(sichtbar).length,
        h1: (document.querySelector('h1') || {}).textContent?.trim().slice(0, 80) || null,
        knoepfe: [...document.querySelectorAll('a, button')].filter(sichtbar).length,
      };
    });
    const d = path.join(ZIEL, 'farben', g.k); fs.mkdirSync(d, { recursive: true });
    await p.screenshot({ path: path.join(d, `${slug(s)}-00.png`) });
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.evaluate((yy) => window.scrollTo(0, yy), Math.round(h * 0.45)); await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(d, `${slug(s)}-01.png`) });
    erg.farben.push({ seite: s, geraet: g.k, ...info });
    await c.close();
  }
}

// 3. Seitensuche (Strg+F): die letzte H2 jeder Seite ist als Text auffindbar, und der Fund liegt danach im Bild.
for (const s of SEITEN) {
  const c = await kontext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  await p.goto(BASE + s); await bereit(p);
  const r = await p.evaluate(async () => {
    const h2 = [...document.querySelectorAll('main h2')].map((h) => h.textContent.replace(/\s+/g, ' ').trim()).filter((t) => t.length > 6);
    if (!h2.length) return { ziel: null, gefunden: false };
    const ziel = h2[h2.length - 1].slice(0, 40);
    window.scrollTo(0, 0);
    const gefunden = window.find(ziel, false, false, true, false, false, false);
    await new Promise((res) => setTimeout(res, 300));
    const sel = window.getSelection();
    let imBild = false;
    if (sel && sel.rangeCount) { const rr = sel.getRangeAt(0).getBoundingClientRect(); imBild = rr.top >= 0 && rr.bottom <= innerHeight && rr.height > 0; }
    return { ziel, gefunden, imBild, scrollY: Math.round(scrollY) };
  });
  erg.suche.push({ seite: s, ...r });
  await c.close();
}

await browser.close();
fs.writeFileSync(path.join(ZIEL, 'zugang.json'), JSON.stringify(erg, null, 1));
const rf = erg.reflow.filter((x) => x.befunde.length || x.skriptfehler.length);
const fb = erg.farben.filter((x) => !x.forced || x.kreuzRotSichtbar || x.cursorSichtbar);
const su = erg.suche.filter((x) => !x.gefunden || !x.imBild);
console.log(`reflow 320: ${SEITEN.length - rf.length}/${SEITEN.length} ohne Befund${rf.length ? ' · ' + rf.map((x) => `${x.seite} (${x.befunde.length} Befunde, ${x.skriptfehler.length} Skriptfehler)`).join(', ') : ''}`);
console.log(`erzwungene Farben: ${erg.farben.length - fb.length}/${erg.farben.length} ohne Befund${fb.length ? ' · ' + fb.map((x) => `${x.seite} ${x.geraet} kreuz ${x.kreuzRotSichtbar} cursor ${x.cursorSichtbar}`).join(', ') : ''}`);
console.log(`seitensuche: ${SEITEN.length - su.length}/${SEITEN.length} gefunden und im Bild${su.length ? ' · ' + su.map((x) => `${x.seite} „${x.ziel}“ gefunden ${x.gefunden} im Bild ${x.imBild}`).join(', ') : ''}`);
