// Ebene 6 · INP-Näherung je Interaktion (Kriterium Z-12, Budget INP ≤ 200 ms; AUFTRAG Abschnitt 11 Ebene 6: „INP über
//   Lighthouse-Zeitspannen für Menü, Formular und Seitenwechsel mit vierfacher Drosselung“).
// Warum nicht Lighthouse-Zeitspannen: startTimespan/endTimespan verlangen die Puppeteer-Brücke, die hier nicht vorgesehen ist (P3-00d).
//   Ersatz mit derselben Datengrundlage, aus der Lighthouse und web-vitals INP bilden: Playwright + CDP
//   Emulation.setCPUThrottlingRate (Standard 4×) + Event-Timing-API (PerformanceObserver type 'event', durationThreshold 16,
//   buffered). Je Interaktion (interactionId > 0) zählt die längste Ereignisdauer (Eingabe bis nächstes Bild); INP-Näherung
//   eines Laufs = höchster Interaktionswert (bei < 50 Interaktionen ist INP das Maximum). Aufschlüsselung des längsten
//   Eintrags: Eingabeverzögerung (processingStart − startTime), Verarbeitung (processingEnd − processingStart),
//   Darstellungsverzögerung (startTime + duration − processingEnd). Werte < 16 ms meldet die API nicht → 0 = „unter 16 ms“.
// Interaktionen (je --wdh Wiederholungen, Standard 5, jede in frischem Kontext nach vollständigem Laden; Median):
//   menue         – Menü öffnen: mobil (Touch) der sichtbare Menüknopf im Kopf (aria-expanded, „menu/menü/mobil“),
//                   Desktop (Maus) der erste Mega-Menü-Knopf (aria-controls/Label „mega/unter“); offen = aria-expanded="true".
//   formular      – erstes sichtbares Textfeld (input text/email/tel/search/url/number, textarea; Vorrang in <form> in <main>,
//                   dann in <main>; nicht in header/nav, kein Honigtopf mit tabindex −1/außerhalb des Bildes) antippen/anklicken, dann 10 Zeichen tippen (Tippabstand 120 ms, Nachbildung von Menschen).
//                   Ergebnis zusätzlich getrennt: fokus_ms (Antippen) und tasten_max_ms (10 Tastenanschläge).
//   seitenwechsel – erster sichtbarer interner Link in <main> auf eine andere Seite antippen/anklicken; Wert = Klick-Interaktion
//                   im alten Dokument; dazu seitenwechsel_ms = Eingabe → load des neuen Dokuments (hart) bzw. → erstes Bild
//                   nach dem Festschreiben der neuen URL (weich, Navigation-API 'navigate' + requestAnimationFrame).
// Nutzung: CHROME_PATH=… node inp.mjs --satz <name> [--seiten /,/kontakt,/blog] [--ansichten m375,d1440]
//          [--interaktionen menue,formular,seitenwechsel] [--wdh 5] [--drossel 4] [--einwilligung abgelehnt|erstbesuch]
//          [--vergleich http://127.0.0.1:<port>] [--menue <css>] [--feld <css>] [--link <css>] [--aus <datei.json>]
//          [--zusammenfuehren] [--gegenprobe] [--ruhe-max 60]
//   --vergleich: verschränkt – je Wiederholung erst Basis, dann Kandidat (A B A B …); Ergebnis mit Differenz der Mediane.
//   --gegenprobe: hängt per evaluate einen click-Handler mit 300 ms Busy-Loop an den Menüknopf (nur Testlauf, src/ bleibt
//                 unberührt); Ausgabe nur nach cache/lighthouse/<satz>/inp-gegenprobe.json; Erwartung: jeder Lauf > 300 ms.
// Messbedingungen (stehen vollständig im Kopf der Ausgabe): lokaler Server (assertLocal), Anfragesperre (installSperre:
//   Dritt-Hosts 204, schreibende Anfragen abgefangen), Einwilligung „abgelehnt“ (kein Banner über Bedienelementen),
//   Chromium 1194 headless ohne GPU, DPR 1, de-DE, Europe/Berlin, hell; CPU-Drosselung per CDP (mobil und Desktop 4×,
//   AUFTRAG), kein Netzdrosseln; je Lauf frischer Kontext (kalter Cache); Start der Interaktion erst, wenn load + Schriften +
//   Netzruhe (≤ 5 s) erreicht sind und seit 500 ms kein Long Task lief (≤ 15 s, sonst ruhe_erreicht = false).
//   Ruhetor wie bewegung.mjs: ungedrosselte Rechenprobe auf about:blank ≤ 1,3 × beste Probe (≤ --ruhe-max s);
//   Läufe mit effektiver Drosselung außerhalb 0,75–1,35 × Soll heißen messqualitaet „unsicher“ (Fremdlast) und werden bis zu
//   zweimal wiederholt (es zählt der letzte Versuch; „unsicher“ bleibt im Ergebnis sichtbar).
// Feste Zeiten (begründet): Tippabstand 120 ms (menschliches Tippen; ohne Abstand stauen sich Tasten und messen Warteschlange
//   statt Reaktion), Abfragetakt 2 s des Ruhetors, Abfragetakt 100 ms der Zustandsabfragen. Sonst nur Zustandsabfragen.
// Ausgabe: belege/<satz>/inp.json (Zusammenfassung) · Rohdaten (alle Event-Timing-Einträge je Lauf) cache/lighthouse/<satz>/inp/.
// Höchstens ein Browser mit einem Kontext gleichzeitig (Messruhe; Lastgrenze 2).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, bereit, grundmenge, slug, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
assertLocal();
const KANDIDAT = arg('vergleich') ? arg('vergleich').replace(/\/$/, '') : null;
if (KANDIDAT) assertLocal(KANDIDAT);

const G = grundmenge();
const satz = arg('satz', 'adhoc');
const seiten = arg('seiten') ? arg('seiten').split(',') : G.hauptseiten;
const ansichten = (arg('ansichten') || 'm375,d1440').split(',');
const gegenprobe = flag('gegenprobe');
const interaktionen = (arg('interaktionen') || (gegenprobe ? 'menue' : 'menue,formular,seitenwechsel')).split(',');
const wdh = Math.max(1, Number(arg('wdh', '5')));
const drossel = Number(arg('drossel', '4'));
const einwilligung = arg('einwilligung', 'abgelehnt');
const RUHE_WARTE_MAX_S = Number(arg('ruhe-max', '60'));
const UEBERSCHREIBUNG = { menue: arg('menue') || null, formular: arg('feld') || null, seitenwechsel: arg('link') || null };
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const TIPPTEXT = { text: 'Badfliesen', ziffern: '0123456789' }; // je 10 Zeichen
const TIPPABSTAND_MS = 120;
const RUHE_LANGTASK_MS = 500; // so lange kein Long Task vor dem Start der Interaktion
const RUHE_MAX_MS = 15000;
const BUDGET_INP_MS = 200;    // AUFTRAG BUDGETS / KERN
const GEGENPROBE_MS = 300;

for (const a of ansichten) if (!ANSICHTEN[a]) throw new Error(`unbekannte Ansicht ${a}`);
for (const i of interaktionen) if (!['menue', 'formular', 'seitenwechsel'].includes(i)) throw new Error(`unbekannte Interaktion ${i}`);
const rohDir = ensureDir(path.join(RELAUNCH, 'cache', 'lighthouse', satz, 'inp', ...(gegenprobe ? ['gegenprobe'] : [])));
const ausDatei = arg('aus') ? path.resolve(arg('aus'))
  : gegenprobe ? path.join(RELAUNCH, 'cache', 'lighthouse', satz, 'inp-gegenprobe.json')
    : path.join(RELAUNCH, 'belege', satz, 'inp.json');
const median = (a) => { const s = a.filter((x) => typeof x === 'number').sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null; };
const rund = (x) => (typeof x === 'number' ? Math.round(x) : x);

// ---------------------------------------------------------------- Seitenkontext: Rekorder (jedes Dokument, nur Hauptrahmen)
function rekorder() {
  if (window.top !== window || window.__inp) return;
  const I = window.__inp = { token: Math.random().toString(36).slice(2, 10), eintraege: [], letzterLangtask: 0, nav: [], eingaben: [], fehler: null };
  const melde = (art, daten) => { try { if (window.__inpMelde) window.__inpMelde({ token: I.token, pfad: location.pathname, art, daten }); } catch { /* Bindung fehlt im Dokument */ } };
  const sel = (el) => {
    if (!el || el.nodeType !== 1) return null;
    const teile = []; let e = el;
    for (let t = 0; e && e.nodeType === 1 && t < 3; t++) {
      let s = e.localName;
      if (e.id) { teile.unshift(`${s}#${e.id}`); break; }
      const lab = e.getAttribute('aria-label'); if (lab) s += `[aria-label="${lab.slice(0, 40)}"]`;
      else { const c = [...(e.classList || [])].slice(0, 2); if (c.length) s += '.' + c.join('.'); }
      teile.unshift(s); e = e.parentElement;
    }
    return teile.join(' > ');
  };
  const wandle = (e) => ({ name: e.name, id: e.interactionId || 0, start: +e.startTime.toFixed(1), dauer: e.duration, pStart: +e.processingStart.toFixed(1), pEnde: +e.processingEnd.toFixed(1), ziel: sel(e.target) });
  try {
    I.po = new PerformanceObserver((l) => { const neu = l.getEntries().map(wandle); I.eintraege.push(...neu); melde('event', neu); });
    I.po.observe({ type: 'event', durationThreshold: 16, buffered: true });
  } catch (e) { I.fehler = 'event-timing: ' + e; }
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) I.letzterLangtask = Math.max(I.letzterLangtask, e.startTime + e.duration); }).observe({ type: 'longtask', buffered: true }); } catch { /* ohne Long-Task-API: Ruhe nur über load/Netz */ }
  const eingabe = (e) => { if (!e.isTrusted) return; const d = { typ: e.type, abs: performance.timeOrigin + e.timeStamp }; I.eingaben.push(d); melde('eingabe', d); };
  addEventListener('pointerdown', eingabe, { capture: true, passive: true });
  addEventListener('click', eingabe, { capture: true, passive: true });
  if (window.navigation) {
    navigation.addEventListener('navigate', (e) => {
      const t = performance.now();
      const n = { typ: e.navigationType, ziel: e.destination && e.destination.url, gleichesDokument: e.destination ? e.destination.sameDocument : null, t, abs: performance.timeOrigin + t, bild: null, bildAbs: null };
      I.nav.push(n);
      requestAnimationFrame(() => { n.bild = performance.now(); n.bildAbs = performance.timeOrigin + n.bild; melde('nav', n); });
    });
  }
  I.flush = () => { if (I.po) { const rest = I.po.takeRecords().map(wandle); I.eintraege.push(...rest); if (rest.length) melde('event', rest); } return I.eintraege.length; };
  addEventListener('pagehide', () => { try { I.flush(); melde('ende', {}); } catch { /* Abschied ohne Bindung */ } });
}

// Sichtbarkeit und Zielsuche im Seitenkontext (keine DOM-Änderung; Rückgabe als ElementHandle)
function zielSuche({ art, mobil }) {
  const sichtbar = (el, imBild) => {
    if (!el || !el.isConnected) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return false;
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    if (el.closest('[aria-hidden="true"], [inert]')) return false;
    if (r.right <= 0 || r.left >= innerWidth) return false; // seitlich ausgelagert (Honigtopf, Schublade)
    if (imBild && (r.bottom <= 0 || r.top >= innerHeight)) return false;
    return true;
  };
  const text = (el) => (el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || '').replace(/\s+/g, ' ').trim();
  const imKopf = (el) => !!el.closest('header, nav, [role="banner"], [role="navigation"]') && !el.closest('main');
  if (art === 'menue') {
    const k = [...document.querySelectorAll('button[aria-expanded], [role="button"][aria-expanded], summary')]
      .filter((el) => imKopf(el) && sichtbar(el, true) && el.getAttribute('aria-expanded') !== 'true');
    const merkmal = (el) => `${el.getAttribute('aria-controls') || ''} ${text(el)}`;
    return mobil ? (k.find((el) => /mobil|mobile|menu|menü|navigation/i.test(merkmal(el))) || k[0] || null)
      : (k.find((el) => /mega|unterme|submenu/i.test(merkmal(el))) || k[0] || null);
  }
  if (art === 'formular') {
    const typen = new Set(['', 'text', 'email', 'tel', 'search', 'url', 'number', 'password']);
    const ok = (el) => (el.localName === 'textarea' || typen.has((el.getAttribute('type') || '').toLowerCase()))
      && !el.disabled && !el.readOnly && el.tabIndex !== -1 && !imKopf(el) && sichtbar(el, false);
    // Vorrang: Feld in einem <form> in <main>, dann irgendein Feld in <main>, dann außerhalb von Kopf/Navigation
    return [...document.querySelectorAll('main form input, main form textarea')].find(ok)
      || [...document.querySelectorAll('main input, main textarea')].find(ok)
      || [...document.querySelectorAll('input, textarea')].find(ok) || null;
  }
  if (art === 'seitenwechsel') {
    const hier = location.pathname.replace(/\/$/, '') || '/';
    const ok = (a) => {
      let u; try { u = new URL(a.href, location.href); } catch { return false; }
      const p = u.pathname.replace(/\/$/, '') || '/';
      return u.origin === location.origin && p !== hier && !a.hasAttribute('download') && (!a.target || a.target === '_self')
        && !/^\/api\//.test(p) && !/\.(pdf|jpe?g|png|webp|avif|svg|zip|xml|txt|ics|vcf)$/i.test(p) && sichtbar(a, false);
    };
    return [...document.querySelectorAll('main a[href]')].find(ok) || null;
  }
  return null;
}
function beschreibe(el) {
  const r = el.getBoundingClientRect();
  return { tag: el.localName, id: el.id || null, text: (el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
    aria_controls: el.getAttribute('aria-controls'), name: el.getAttribute('name'), typ: el.getAttribute('type'), href: el.getAttribute('href'),
    oben_px: Math.round(r.top + scrollY), groesse: `${Math.round(r.width)}×${Math.round(r.height)}` };
}

// ---------------------------------------------------------------- Messhilfen
const LEISTUNG = () => { const t = performance.now(); let x = 0; for (let i = 0; i < 1e7; i++) x += i % 7; return performance.now() - t + (x < 0 ? 1 : 0); };
let basisLeistung = null; // beste ungedrosselte Rechenprobe (Ruhetor, effektive Drosselung)
const ruhig = (page, max = RUHE_MAX_MS) => page.waitForFunction((ms) => document.readyState === 'complete' && window.__inp && performance.now() - window.__inp.letzterLangtask > ms,
  RUHE_LANGTASK_MS, { polling: 100, timeout: max }).then(() => true, () => false);
// Einträge sind geliefert, wenn nach zwei Bildern die Zahl über 3 Abfragen stabil bleibt (Obergrenze 3 s)
const stabil = (page) => page.evaluate(async () => {
  const bild = () => new Promise((r) => requestAnimationFrame(() => r()));
  await bild(); await bild();
  let vorher = -1, gleich = 0; const t0 = performance.now();
  while (gleich < 3 && performance.now() - t0 < 3000) {
    const n = window.__inp.flush();
    gleich = n === vorher ? gleich + 1 : 0; vorher = n;
    await bild(); await new Promise((r) => setTimeout(r, 0));
  }
  return window.__inp.eintraege;
});

function auswerten(eintraege, start) {
  const gruppen = new Map();
  for (const e of eintraege) {
    if (!e.id || e.start < start - 1) continue;
    const g = gruppen.get(e.id) || { id: e.id, dauer: -1, ereignisse: [] };
    g.ereignisse.push(e.name);
    if (e.dauer > g.dauer) Object.assign(g, { dauer: e.dauer, name: e.name, start: e.start, verzoegerung: e.pStart - e.start, verarbeitung: e.pEnde - e.pStart, darstellung: e.start + e.dauer - e.pEnde, ziel: e.ziel });
    gruppen.set(e.id, g);
  }
  const liste = [...gruppen.values()].sort((x, y) => x.start - y.start);
  const max = liste.reduce((m, g) => (g.dauer > (m?.dauer ?? -1) ? g : m), null);
  return { liste, max };
}

// ---------------------------------------------------------------- Ein Lauf
const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox', '--disable-gpu'] });
const browserVersion = browser.version();
async function lauf({ basis, s, a, interaktion, k, rolle }) {
  const v = ANSICHTEN[a];
  const mobil = !!v.hasTouch;
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch,
    locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light', reducedMotion: 'no-preference' });
  const protokoll = [];
  await installSperre(context, { protokoll });
  await setzeEinwilligung(context, einwilligung, basis);
  const meldungen = [];
  await context.exposeBinding('__inpMelde', (_q, m) => { meldungen.push(m); });
  await context.addInitScript(rekorder);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const konsole = [];
  page.on('pageerror', (e) => konsole.push(String(e).slice(0, 200)));
  const last = [+os.loadavg()[0].toFixed(2)];
  const r = { rolle, k, seite: s, ansicht: a, interaktion, eingabe: mobil ? 'touch' : 'maus' };
  try {
    // Ruhetor (Zustandsabfrage, Takt 2 s) und ungedrosselte Rechenprobe
    const tw = Date.now(); let frei;
    for (;;) {
      const w = []; for (let i = 0; i < 3; i++) w.push(await page.evaluate(LEISTUNG));
      frei = median(w); basisLeistung = Math.min(basisLeistung ?? frei, frei);
      if (frei <= basisLeistung * 1.3 || Date.now() - tw > RUHE_WARTE_MAX_S * 1000) break;
      await page.waitForTimeout(2000); // Abfragetakt des Ruhetors (Maschinenlast), kein Warten auf die Seite
    }
    r.ruhetor_s = Math.round((Date.now() - tw) / 1000);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: drossel });
    await page.goto(basis + s, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await bereit(page);
    const leistung = await page.evaluate(LEISTUNG);
    r.drossel_effektiv = +(leistung / basisLeistung).toFixed(2);
    r.messqualitaet = r.drossel_effektiv >= drossel * 0.75 && r.drossel_effektiv <= drossel * 1.35 ? 'ok' : 'unsicher';
    r.ruhe_erreicht = await ruhig(page);

    // Ziel
    let handle = null;
    if (UEBERSCHREIBUNG[interaktion]) handle = await page.$(UEBERSCHREIBUNG[interaktion]);
    else { const h = await page.evaluateHandle(zielSuche, { art: interaktion, mobil }); handle = h.asElement(); if (!handle) await h.dispose(); }
    if (!handle) { r.fehlt = `kein Ziel für ${interaktion} gefunden`; return r; }
    r.ziel = await handle.evaluate(beschreibe);
    if (gegenprobe && interaktion === 'menue') {
      await handle.evaluate((el, ms) => el.addEventListener('click', () => { const t = performance.now(); while (performance.now() - t < ms) { /* Busy-Loop (Gegenprobe) */ } }), GEGENPROBE_MS);
      r.gegenprobe = `click-Handler mit ${GEGENPROBE_MS} ms Busy-Loop am Menüknopf`;
    }
    // Ziel vorab ins Bild holen (Scrollen ist keine Interaktion im Sinne von INP) und Ruhe nach dem Scrollen abwarten
    await handle.scrollIntoViewIfNeeded();
    r.ruhe_nach_scroll = await ruhig(page, r.ruhe_erreicht ? RUHE_MAX_MS : 2000); // ohne Ruhe nach dem Laden (Dauerlast, z. B. WebGL) nur kurz
    const { token, start } = await page.evaluate(() => { window.__inp.flush(); return { token: window.__inp.token, start: performance.now() }; });
    const drueck = () => (mobil ? handle.tap() : handle.click());

    if (interaktion === 'menue') {
      await drueck();
      r.geoeffnet = await page.waitForFunction((el) => !el.hasAttribute('aria-expanded') || el.getAttribute('aria-expanded') === 'true', handle, { polling: 100, timeout: 5000 }).then(() => true, () => false);
      const { liste, max } = auswerten(await stabil(page), start);
      Object.assign(r, kennzahlen(liste, max));
    } else if (interaktion === 'formular') {
      const typ = (r.ziel.typ || '').toLowerCase();
      const tipptext = ['tel', 'number'].includes(typ) ? TIPPTEXT.ziffern : TIPPTEXT.text;
      await drueck();
      r.fokussiert = await page.waitForFunction((el) => document.activeElement === el, handle, { polling: 100, timeout: 3000 }).then(() => true, () => false);
      if (!r.fokussiert) { await handle.focus(); r.fokus_nachgeholt = true; }
      const tStart = await page.evaluate(() => performance.now());
      await page.keyboard.type(tipptext, { delay: TIPPABSTAND_MS }); // Tippabstand: s. Kopfkommentar
      r.getippt = await page.waitForFunction(([el, n]) => (el.value || '').length >= n, [handle, tipptext.length], { polling: 100, timeout: 5000 }).then(() => true, () => false);
      const eintraege = await stabil(page);
      const { liste, max } = auswerten(eintraege, start);
      Object.assign(r, kennzahlen(liste, max));
      const fokus = liste.filter((g) => g.start < tStart), tasten = liste.filter((g) => g.start >= tStart);
      r.fokus_ms = fokus.length ? Math.max(...fokus.map((g) => g.dauer)) : 0;
      r.tasten_max_ms = tasten.length ? Math.max(...tasten.map((g) => g.dauer)) : 0;
      r.tasten_interaktionen = tasten.length;
      // Feld wieder leeren ist unnötig: Kontext wird verworfen, nichts wird abgeschickt (Sperre fängt POST ab)
    } else if (interaktion === 'seitenwechsel') {
      const startPfad = new URL(page.url()).pathname;
      await drueck();
      await page.waitForURL((u) => u.pathname !== startPfad, { timeout: 45000, waitUntil: 'load' });
      r.ziel_pfad = new URL(page.url()).pathname;
      const neuerToken = await page.evaluate(() => window.__inp && window.__inp.token).catch(() => null);
      r.art = neuerToken === token ? 'weich' : 'hart';
      const t0 = meldungen.find((m) => m.token === token && m.art === 'eingabe')?.daten.abs ?? null;
      let ende = null, eintraege;
      if (r.art === 'weich') {
        await page.waitForFunction((p) => window.__inp.nav.some((n) => n.bildAbs && n.ziel && new URL(n.ziel).pathname !== p), startPfad, { polling: 100, timeout: 15000 }).catch(() => null);
        ende = await page.evaluate((p) => window.__inp.nav.find((n) => n.bildAbs && n.ziel && new URL(n.ziel).pathname !== p)?.bildAbs ?? null, startPfad);
        eintraege = await stabil(page);
      } else {
        ende = await page.waitForFunction(() => { const n = performance.getEntriesByType('navigation')[0]; return n && n.loadEventEnd > 0 ? performance.timeOrigin + n.loadEventEnd : false; }, null, { polling: 100, timeout: 30000 })
          .then((h) => h.jsonValue(), () => null);
        eintraege = meldungen.filter((m) => m.token === token && m.art === 'event').flatMap((m) => m.daten);
        r.abschied_gemeldet = meldungen.some((m) => m.token === token && m.art === 'ende');
      }
      r.seitenwechsel_ms = t0 && ende ? Math.round(ende - t0) : null;
      const { liste, max } = auswerten(eintraege, start);
      Object.assign(r, kennzahlen(liste, max));
    }
    last.push(+os.loadavg()[0].toFixed(2));
    r.last_1min = last;
    r.seitenfehler = konsole.length ? konsole.slice(0, 5) : undefined;
    r.fremd_abgefangen = protokoll.filter((p) => p.art === 'fremd').length;
    r.schreibend_abgefangen = protokoll.filter((p) => p.art !== 'fremd').length;
    fs.writeFileSync(path.join(rohDir, `${slug(s)}-${a}-${interaktion}-${k}${rolle === 'kandidat' ? '-kandidat' : ''}.json`),
      JSON.stringify({ ...r, eintraege: meldungen.filter((m) => m.art === 'event').flatMap((m) => m.daten.map((e) => ({ ...e, pfad: m.pfad }))), nav: meldungen.filter((m) => m.art === 'nav').map((m) => m.daten) }));
    return r;
  } catch (e) {
    r.fehler = String(e.message || e).split('\n')[0].slice(0, 240);
    return r;
  } finally { await context.close(); }
}
// Lauf mit Messqualität „unsicher“ (Fremdlast) wird bis zu zweimal wiederholt (Ruhetor davor); es zählt der letzte Versuch
async function gesichert(o) {
  let r;
  for (let v = 1; v <= 3; v++) {
    r = await lauf(o);
    r.versuche = v;
    if (r.messqualitaet === 'ok' || r.fehler || r.fehlt) break;
  }
  return r;
}
function kennzahlen(liste, max) {
  return {
    inp_ms: max ? max.dauer : 0, unter_schwelle: !max,
    ereignis: max ? max.name : null, ereignis_ziel: max ? max.ziel : null,
    verzoegerung_ms: max ? rund(max.verzoegerung) : null, verarbeitung_ms: max ? rund(max.verarbeitung) : null, darstellung_ms: max ? rund(max.darstellung) : null,
    interaktionen: liste.length, alle_ms: liste.map((g) => g.dauer),
  };
}

function zusammenfassen(runs, interaktion) {
  const ok = runs.filter((x) => !x.fehler && !x.fehlt);
  const z = {
    median: {
      inp_ms: median(ok.map((x) => x.inp_ms)), verzoegerung_ms: median(ok.map((x) => x.verzoegerung_ms)), verarbeitung_ms: median(ok.map((x) => x.verarbeitung_ms)), darstellung_ms: median(ok.map((x) => x.darstellung_ms)),
      ...(interaktion === 'formular' ? { fokus_ms: median(ok.map((x) => x.fokus_ms)), tasten_max_ms: median(ok.map((x) => x.tasten_max_ms)) } : {}),
      ...(interaktion === 'seitenwechsel' ? { seitenwechsel_ms: median(ok.map((x) => x.seitenwechsel_ms)) } : {}),
    },
    streuung_ms: ok.length ? [Math.min(...ok.map((x) => x.inp_ms)), Math.max(...ok.map((x) => x.inp_ms))] : null,
    gueltig: ok.length, von: runs.length,
    unsicher: ok.filter((x) => x.messqualitaet !== 'ok').length,
    ohne_ruhe: ok.filter((x) => !x.ruhe_erreicht).length,
    ziel: ok[0]?.ziel || null,
    ...(interaktion === 'seitenwechsel' ? { art: [...new Set(ok.map((x) => x.art))].join('/') || null, ziel_pfad: ok[0]?.ziel_pfad || null } : {}),
    ...(interaktion === 'menue' ? { geoeffnet: `${ok.filter((x) => x.geoeffnet).length}/${ok.length}` } : {}),
    ...(interaktion === 'formular' ? { getippt: `${ok.filter((x) => x.getippt).length}/${ok.length}`, fokus_nachgeholt: ok.filter((x) => x.fokus_nachgeholt).length } : {}),
    wiederholt_wegen_last: ok.filter((x) => x.versuche > 1).length,
    fehler: runs.filter((x) => x.fehler || x.fehlt).map((x) => x.fehler || x.fehlt),
  };
  // Zielwechsel zwischen Läufen (sollte nie vorkommen – sonst sind die Läufe nicht vergleichbar)
  const zielSchluessel = new Set(ok.map((x) => JSON.stringify([x.ziel?.tag, x.ziel?.id, x.ziel?.text, x.ziel?.href])));
  if (zielSchluessel.size > 1) z.ziel_uneinheitlich = [...zielSchluessel];
  z.bewertung = z.median.inp_ms == null ? null : z.median.inp_ms <= 200 ? 'gut' : z.median.inp_ms <= 500 ? 'verbesserungswürdig' : 'schlecht';
  return z;
}

// ---------------------------------------------------------------- Ablauf
const vorhanden = flag('zusammenfuehren') && fs.existsSync(ausDatei) ? JSON.parse(fs.readFileSync(ausDatei, 'utf8')) : null;
const ergebnis = vorhanden || { satz, base: BASE, ...(KANDIDAT ? { kandidat: KANDIDAT } : {}), modus: KANDIDAT ? 'verschraenkt' : 'einzeln', bedingungen: null, erstellt: null, seiten: {} };
ergebnis.erstellt = new Date().toISOString();
ergebnis.bedingungen = {
  methode: 'Playwright + CDP Emulation.setCPUThrottlingRate + Event-Timing-API (PerformanceObserver type "event", durationThreshold 16, buffered); INP-Näherung je Lauf = höchste Dauer über die Interaktionen (interactionId > 0) der Aktion; Median über die Wiederholungen',
  drossel_cpu: `${drossel}× (CDP), kein Netzdrosseln`, wiederholungen: wdh, reihenfolge: KANDIDAT ? 'je Wiederholung A (Basis) dann B (Kandidat)' : 'nacheinander',
  einwilligung, kontext: 'je Lauf frischer Kontext (kalter Cache), DPR 1, de-DE, Europe/Berlin, hell, reducedMotion no-preference; mobil Touch (tap), Desktop Maus (click)',
  start: `nach load + Schriften + Netzruhe (≤ 5 s) und ${RUHE_LANGTASK_MS} ms ohne Long Task (≤ ${RUHE_MAX_MS / 1000} s); Ziel vorher ins Bild gescrollt`,
  tippen: `10 Zeichen („${TIPPTEXT.text}“, bei tel/number „${TIPPTEXT.ziffern}“), Abstand ${TIPPABSTAND_MS} ms`,
  seitenwechsel: 'Wert = Klick-Interaktion im alten Dokument; seitenwechsel_ms = Eingabe (pointerdown) → loadEventEnd (hart) bzw. → erstes requestAnimationFrame nach navigate (weich)',
  ruhetor: `ungedrosselte Rechenprobe ≤ 1,3 × beste (≤ ${RUHE_WARTE_MAX_S} s); messqualitaet „unsicher“ bei effektiver Drosselung außerhalb 0,75–1,35 × Soll`,
  sperre: 'installSperre (Dritt-Hosts 204, schreibende Anfragen abgefangen/Attrappe), assertLocal',
  schwelle_api: 'Event Timing meldet nur Einträge ≥ 16 ms (auf 8 ms gerundet) → inp_ms 0 = unter 16 ms',
  budget_inp_ms: BUDGET_INP_MS, bewertung: 'gut ≤ 200 ms · verbesserungswürdig ≤ 500 ms · schlecht > 500 ms (web.dev)',
  ...(gegenprobe ? { gegenprobe: `click-Handler mit ${GEGENPROBE_MS} ms Busy-Loop am Menüknopf (evaluate, nur im Testlauf)` } : {}),
};
ergebnis.umgebung = { browser: `Chromium ${browserVersion} headless (${CHROME})`, node: process.version, cpus: os.cpus().length, last_1min_start: +os.loadavg()[0].toFixed(2) };
const schreiben = () => { ensureDir(path.dirname(ausDatei)); fs.writeFileSync(ausDatei, JSON.stringify(ergebnis, null, 1)); };

const t0 = Date.now();
for (const s of seiten) {
  ergebnis.seiten[s] = ergebnis.seiten[s] || {};
  for (const a of ansichten) {
    const block = ergebnis.seiten[s][a] = ergebnis.seiten[s][a] || {};
    for (const interaktion of interaktionen) {
      const A = [], B = [];
      for (let k = 0; k < wdh; k++) {
        A.push(await gesichert({ basis: BASE, s, a, interaktion, k, rolle: 'basis' })); process.stdout.write('.');
        if (KANDIDAT) { B.push(await gesichert({ basis: KANDIDAT, s, a, interaktion, k, rolle: 'kandidat' })); process.stdout.write(':'); }
      }
      const zA = zusammenfassen(A, interaktion);
      if (!KANDIDAT) block[interaktion] = { ...zA, laeufe: A.map(kurz) };
      else {
        const zB = zusammenfassen(B, interaktion);
        const d = {};
        for (const key of Object.keys(zA.median)) d[key] = zA.median[key] != null && zB.median[key] != null ? zB.median[key] - zA.median[key] : null;
        block[interaktion] = { basis: { ...zA, laeufe: A.map(kurz) }, kandidat: { ...zB, laeufe: B.map(kurz) }, differenz: d };
      }
      const m = KANDIDAT ? `A ${zA.median.inp_ms} · B ${block[interaktion].kandidat.median.inp_ms} · Δ ${block[interaktion].differenz.inp_ms}` : `${zA.median.inp_ms} ms [${zA.streuung_ms}]`;
      console.log(` ${s} ${a} ${interaktion}: INP ${m}${zA.median.seitenwechsel_ms != null ? ` · Wechsel ${zA.median.seitenwechsel_ms} ms (${zA.art})` : ''}${zA.fehler.length ? ` · Fehler ${zA.fehler.length}` : ''}${zA.unsicher ? ` · unsicher ${zA.unsicher}` : ''}`);
      schreiben(); // Zwischenstand
    }
    // Seitenwert: schlechteste Interaktion (Median) – entspricht INP als Maximum über die Interaktionen
    const werte = (rolle) => interaktionen.map((i) => (KANDIDAT ? block[i]?.[rolle]?.median?.inp_ms : block[i]?.median?.inp_ms)).filter((x) => x != null);
    block.inp_seite_ms = KANDIDAT ? { basis: Math.max(...werte('basis')), kandidat: Math.max(...werte('kandidat')) } : Math.max(...werte());
    block.budget_eingehalten = KANDIDAT ? block.inp_seite_ms.kandidat <= BUDGET_INP_MS : block.inp_seite_ms <= BUDGET_INP_MS;
  }
}
await browser.close();

// Zusammenfassung
const zeilen = [];
for (const [s, o] of Object.entries(ergebnis.seiten)) for (const [a, b] of Object.entries(o)) zeilen.push({ s, a, wert: KANDIDAT ? b.inp_seite_ms?.kandidat : b.inp_seite_ms, ok: b.budget_eingehalten });
ergebnis.zusammenfassung = {
  inp_max_ms: Math.max(...zeilen.map((z) => z.wert).filter((x) => x != null)),
  ueber_budget: zeilen.filter((z) => z.ok === false).map((z) => `${z.s} ${z.a} ${z.wert} ms`),
  laufzeit_s: Math.round((Date.now() - t0) / 1000),
};
if (gegenprobe) {
  const alle = Object.values(ergebnis.seiten).flatMap((o) => Object.values(o)).flatMap((b) => (b.menue ? (KANDIDAT ? [...b.menue.basis.laeufe, ...b.menue.kandidat.laeufe] : b.menue.laeufe) : []));
  ergebnis.gegenprobe = { erwartung: `jeder Lauf inp_ms > ${GEGENPROBE_MS}`, werte: alle.map((x) => x.inp_ms), erkannt: alle.length > 0 && alle.every((x) => x.inp_ms > GEGENPROBE_MS) };
  console.log(`Gegenprobe: ${ergebnis.gegenprobe.erkannt ? 'erkannt' : 'NICHT erkannt'} (${ergebnis.gegenprobe.werte.join(', ')} ms)`);
}
ergebnis.umgebung.last_1min_ende = +os.loadavg()[0].toFixed(2);
schreiben();
console.log(`INP max ${ergebnis.zusammenfassung.inp_max_ms} ms · über Budget: ${ergebnis.zusammenfassung.ueber_budget.join('; ') || 'keine'} · ${ergebnis.zusammenfassung.laufzeit_s} s → ${path.relative(RELAUNCH, ausDatei)}`);

function kurz(x) {
  const { seite, ansicht, interaktion, alle_ms, ...rest } = x; // Kopfangaben stehen im Block; Einzelwerte bleiben in den Rohdaten
  return { ...rest, alle_ms };
}
