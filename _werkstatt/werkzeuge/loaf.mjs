// loaf.mjs (UM-E4-B) · Zuordnung der Long Animation Frames (LoAF) beim Scrollen zu Skripten (Z-06: „ohne LoAF über 20 ms Skriptzeit
// aus Bewegungscode“). Aufbau wie bewegung.mjs --modus bildrate: m390, DPR 2, Touch, 4× CPU, Einwilligung abgelehnt,
// wiederkehrender Besuch, Scrollgeste 800 px/s oben→unten→oben, drei Wiederholungen je Seite. Erfasst je LoAF über 50 ms
// Dauer, Blockierzeit und je Skript: Quelle, Funktion, Auslöser, Dauer, erzwungenes Layout. Ein Stück zählt als
// Bewegungscode, wenn sein Text eine Marke aus src/lib/motion oder src/lib/verlegen enthält; ein gemeinsames Stück mit
// Marke zählt dabei ganz als Bewegungscode (streng). Inline-Skripte des Dokuments stehen getrennt.
// Aufruf (aus _werkstatt/werkzeuge): node loaf.mjs <base> <ziel> <seiten,kommagetrennt>
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { installSperre, setzeEinwilligung, bereit, ANSICHTEN_AUSBAU } from './lib.mjs';
const [base, ziel, seitenArg] = process.argv.slice(2);
const SEITEN = seitenArg.split(',');
const MARKEN = ['data-motion-stand', 'k-bewegung-wechsel', '.vn-zone', '--ease-aufsetzen', 'blende-aus', 'k-notaus'];
fs.mkdirSync(ziel, { recursive: true });
const stueckArt = new Map();
async function art(url) {
  if (!url) return 'ohne Quelle';
  if (stueckArt.has(url)) return stueckArt.get(url);
  let a = 'anderes Skript';
  try {
    const u = new URL(url);
    if (!u.pathname.endsWith('.js')) a = 'Dokument (Inline-Skript)';
    else {
      const text = await (await fetch(url)).text();
      a = MARKEN.some((m) => text.includes(m)) ? 'Bewegungscode' : 'anderes Skript';
    }
  } catch { a = 'nicht lesbar'; }
  stueckArt.set(url, a);
  return a;
}
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const v = ANSICHTEN_AUSBAU.m390;
const ergebnis = [];
for (const seite of SEITEN) {
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 2, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'no-preference', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
  await installSperre(context, { protokoll: [] });
  await setzeEinwilligung(context, 'abgelehnt', base);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await bereit(page);
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    window.__loafRoh = [];
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.duration > 50) window.__loafRoh.push({ dauer: e.duration, blockierend: e.blockingDuration, render: e.renderStart ? e.startTime + e.duration - e.renderStart : null, skripte: (e.scripts || []).map((s) => ({ quelle: s.sourceURL, funktion: s.sourceFunctionName, ausloeser: s.invoker, art: s.invokerType, dauer: s.duration, layout: s.forcedStyleAndLayoutDuration })) }); }).observe({ type: 'long-animation-frame', buffered: false });
  });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const laeufe = [];
  for (let n = 0; n < 3; n++) {
    await page.evaluate(() => { window.__loafRoh = []; });
    const { hoehe, vw, vh } = await page.evaluate(() => ({ hoehe: Math.max(0, document.documentElement.scrollHeight - window.innerHeight), vw: window.innerWidth, vh: window.innerHeight }));
    const x = Math.round(vw / 2), y = Math.round(vh * 0.6);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await cdp.send('Input.synthesizeScrollGesture', { x, y, yDistance: -hoehe, speed: 800, gestureSourceType: 'default', preventFling: true });
    await cdp.send('Input.synthesizeScrollGesture', { x, y, yDistance: hoehe, speed: 800, gestureSourceType: 'default', preventFling: true });
    await page.waitForTimeout(300);
    const roh = await page.evaluate(() => window.__loafRoh.slice());
    for (const f of roh) for (const s of f.skripte) s.stueck = await art(s.quelle);
    laeufe.push(roh);
  }
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 }).catch(() => {});
  await context.close();
  const alle = laeufe.flat();
  const skripte = alle.flatMap((f) => f.skripte);
  const bewegung = skripte.filter((s) => s.stueck === 'Bewegungscode');
  const ueber20 = bewegung.filter((s) => s.dauer > 20);
  const zeile = { seite, loaf_je_lauf: laeufe.map((l) => l.length), loaf_ohne_skript: alle.filter((f) => !f.skripte.length).length, skripte_gesamt: skripte.length, bewegung_skripte: bewegung.length, bewegung_ueber_20ms: ueber20.length, groesste_bewegung_ms: Math.round(Math.max(0, ...bewegung.map((s) => s.dauer))), groesste_skripte: skripte.sort((a, b) => b.dauer - a.dauer).slice(0, 4).map((s) => ({ stueck: s.stueck, quelle: path.basename(s.quelle || ''), funktion: s.funktion, ausloeser: s.ausloeser, dauer: Math.round(s.dauer), layout: Math.round(s.layout || 0) })), laeufe };
  ergebnis.push(zeile);
  console.log(`${seite} LoAF ${zeile.loaf_je_lauf.join('/')} · ohne Skript ${zeile.loaf_ohne_skript} · Skripte ${zeile.skripte_gesamt} · Bewegung ${zeile.bewegung_skripte} (über 20 ms: ${zeile.bewegung_ueber_20ms}, größte ${zeile.groesste_bewegung_ms} ms) · größte: ${zeile.groesste_skripte.map((s) => `${s.stueck}/${s.quelle}/${s.ausloeser} ${s.dauer} ms`).join('; ')}`);
}
fs.writeFileSync(path.join(ziel, 'loaf.json'), JSON.stringify({ base, ansicht: 'm390', cpu: 4, wiederholungen: 3, marken: MARKEN, stuecke: Object.fromEntries(stueckArt), ergebnis }, null, 1));
await browser.close();
