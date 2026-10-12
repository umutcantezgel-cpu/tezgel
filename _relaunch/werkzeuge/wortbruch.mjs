// Wortbruch-Prüfung (P4-10, Vorschau a361e9c): findet sichtbare Wörter, die über zwei Zeilen laufen. Das passiert durch
// `overflow-wrap: break-word`, wenn ein Wort breiter ist als seine Spalte. Chromium unter Linux trennt nicht nach Silben
// (`hyphens: auto` ohne Wörterbuch), darum zeigt die Prüfung den ungünstigsten Fall: ein Bruch ohne Trennstrich.
// Ausgenommen: Adressen und Kennungen (enthält @ / . : oder _), Wörter unter 4 Zeichen, unsichtbarer Text.
// Nutzung: node wortbruch.mjs --base http://127.0.0.1:4320 --seiten /p4-01,/p4-02 [--breiten 320,375,768,1024,1440,1920] [--satz <beleg>]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { assertLocal, installSperre, setzeEinwilligung, ensureDir, RELAUNCH, spaetZeichnen } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const BASE = arg('base', 'http://127.0.0.1:4310'); assertLocal(BASE);
const seiten = arg('seiten', '/').split(',');
const breiten = arg('breiten', '320,375,768,1024,1440,1920').split(',').map(Number);
const satz = arg('satz', null);

const browser = await chromium.launch();
const funde = [];
for (const breite of breiten) {
  const mobil = breite < 1024;
  const context = await browser.newContext({ viewport: { width: breite, height: 900 }, isMobile: mobil, hasTouch: mobil, locale: 'de-DE', reducedMotion: 'reduce' });
  await installSperre(context); await setzeEinwilligung(context, 'abgelehnt', BASE);
  const page = await context.newPage();
  for (const seite of seiten) {
    await page.goto(BASE + seite); await page.waitForLoadState('networkidle'); await spaetZeichnen(page);
    const liste = await page.evaluate(() => {
      const raus = [];
      const sel = (el) => { const teile = []; for (let e = el, d = 0; e && e !== document.body && d < 4; e = e.parentElement, d++) { let s = e.tagName.toLowerCase(); if (e.id) { s += `#${e.id}`; teile.unshift(s); break; } const k = [...e.classList].slice(0, 2).join('.'); if (k) s += `.${k}`; teile.unshift(s); } return teile.join(' > '); };
      const gang = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n = gang.nextNode(); n; n = gang.nextNode()) {
        const el = n.parentElement; if (!el || el.closest('script,style,noscript,[aria-hidden="true"],.sr-only,[hidden]')) continue;
        const st = getComputedStyle(el); if (st.visibility === 'hidden' || st.display === 'none') continue;
        for (const m of n.data.matchAll(/[^\s ]+/g)) {
          const wort = m[0].replace(/^[„"“(»]+|[“”"),.;:!?«]+$/g, '');
          if (wort.length < 4 || /[@/.:_]/.test(wort)) continue;
          const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
          const rects = [...r.getClientRects()].filter((x) => x.width > 0.5);
          if (rects.length < 2) continue;
          const zeilen = new Set(rects.map((x) => Math.round(x.top))); if (zeilen.size < 2) continue;
          // Bruch an Bindestrich oder weichem Trennzeichen ist erlaubt (gewollter Umbruch).
          if (/[-­‐‑]/.test(m[0])) continue;
          const tag = el.closest('h1,h2,h3,h4,h5,h6') ? 'überschrift' : el.closest('label,button,a,summary,legend') ? 'bedienelement' : 'text';
          raus.push({ wort: m[0], art: tag, element: sel(el), groesse: st.fontSize });
        }
      }
      return raus;
    });
    for (const f of liste) funde.push({ seite, breite, ...f });
  }
  await context.close();
}
await browser.close();
const nachArt = funde.reduce((a, f) => ((a[f.art] = (a[f.art] || 0) + 1), a), {});
console.log(`Wortbrüche: ${funde.length} ${JSON.stringify(nachArt)}`);
for (const f of funde.slice(0, 60)) console.log(`${f.breite} ${f.seite} [${f.art}] „${f.wort}“ ${f.groesse} · ${f.element}`);
if (satz) { const aus = ensureDir(path.join(RELAUNCH, 'belege', satz)); fs.writeFileSync(path.join(aus, 'wortbruch.json'), JSON.stringify({ base: BASE, seiten, breiten, funde }, null, 1)); }
process.exit(funde.length ? 1 : 0);
