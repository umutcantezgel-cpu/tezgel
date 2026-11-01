// CLS-Probe (E-112 „Vereinzelter CLS am Einstiegsbehälter: Ursache klären“): lädt Seiten wiederholt wie Lighthouse
// (frischer Kontext, kein Cache, Erstbesuch mit Cookie-Hinweis, Bewegung an) und schreibt jede Layout-Verschiebung mit
// Zeitpunkt, Wert und Quellen (vorheriges und jetziges Rechteck). Nur gegen den lokalen Prüfserver, über installSperre (G5).
// Aufruf: node cls-probe.mjs <base> <ziel.json> <seiten,komma> [läufe=12] [geraet=desktop|mobil]
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { installSperre, assertLocal } from '/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs';
const require = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = require('@playwright/test');
const [BASE, ZIEL, SEITEN, LAEUFE = '12', GERAET = 'desktop'] = process.argv.slice(2);
assertLocal(BASE);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const ergebnis = [];
const opts = GERAET === 'mobil'
  ? { viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 }
  : { viewport: { width: 1350, height: 940 }, deviceScaleFactor: 1 };
for (const seite of SEITEN.split(',')) {
  for (let n = 0; n < Number(LAEUFE); n++) {
    const c = await browser.newContext({ locale: 'de-DE', reducedMotion: 'no-preference', ...opts });
    await installSperre(c, { intro: 'erstbesuch' });
    await c.addInitScript(() => {
      window.__shifts = [];
      const sel = (el) => { if (!el || !el.tagName) return String(el && el.nodeName); const p = []; let e = el; for (let i = 0; e && e.tagName && i < 4; i++, e = e.parentElement) p.unshift(e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).slice(0, 3).join('.') : '')); return p.join(' > '); };
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__shifts.push({ t: Math.round(e.startTime), wert: Number(e.value.toFixed(4)), eingabe: e.hadRecentInput, scrollY: Math.round(scrollY), quellen: (e.sources || []).map((s) => ({ el: sel(s.node), vorher: [Math.round(s.previousRect.x), Math.round(s.previousRect.y), Math.round(s.previousRect.width), Math.round(s.previousRect.height)], jetzt: [Math.round(s.currentRect.x), Math.round(s.currentRect.y), Math.round(s.currentRect.width), Math.round(s.currentRect.height)] })) }); }).observe({ type: 'layout-shift', buffered: true });
      const t0 = performance.now();
      window.__ereignisse = [];
      document.fonts && document.fonts.addEventListener('loadingdone', (ev) => window.__ereignisse.push({ t: Math.round(performance.now() - t0), was: 'fonts', n: ev.fontfaces.length }));
      new MutationObserver((ms) => { for (const m of ms) if (m.attributeName === 'class' && m.target === document.documentElement) window.__ereignisse.push({ t: Math.round(performance.now()), was: 'html.class', wert: document.documentElement.className }); }).observe(document.documentElement, { attributes: true });
    });
    const p = await c.newPage();
    await p.goto(BASE + seite, { waitUntil: 'load' });
    await p.waitForTimeout(3500);
    const r = await p.evaluate(() => ({ shifts: window.__shifts, ereignisse: window.__ereignisse, scrollbar: innerWidth - document.documentElement.clientWidth, hoehe: document.documentElement.scrollHeight }));
    const summe = r.shifts.filter((s) => !s.eingabe).reduce((a, s) => a + s.wert, 0);
    ergebnis.push({ seite, lauf: n, cls: Number(summe.toFixed(4)), ...r });
    if (summe > 0.01) console.log(`${seite} lauf ${n}: CLS ${summe.toFixed(3)} · ${r.shifts.map((s) => `t=${s.t} ${s.wert} ${s.quellen.map((q) => `${q.el} ${q.vorher}→${q.jetzt}`).join(' | ')}`).join(' ;; ')}`);
    await c.close();
  }
}
await browser.close();
fs.writeFileSync(ZIEL, JSON.stringify(ergebnis, null, 1));
const hoch = ergebnis.filter((e) => e.cls > 0.05);
console.log(`Läufe ${ergebnis.length}, mit CLS > 0,05: ${hoch.length}, mit CLS > 0,01: ${ergebnis.filter((e) => e.cls > 0.01).length}`);
