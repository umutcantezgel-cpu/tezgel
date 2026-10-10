// a11y-zusatz.mjs · Ebene 5 (Z-11): Barrierefreiheits-Prüfungen, die axe nicht abdeckt.
//
// Zweck: misst je Seite sechs Prüfungen mit Befundliste und Kennzahl. Das Werkzeug ändert nie das Produkt;
// Eingriffe (Zoom, Stilblätter, Gegenproben) gibt es nur im Prüflauf im Browser.
//   1. tastatur    – Tab-Durchlauf (d1440, m375; Einwilligung „abgelehnt“ und „erstbesuch“), Obergrenze 400 Schritte:
//                    Reihenfolge (Sprung rückwärts > 1 Bildschirmhöhe), Fokus sichtbar (Pixelvergleich Ruhe/Fokus im
//                    Elementausschnitt, Kontrast ≥ 3:1 je Pixel), Fokus verdeckt (elementFromPoint an der Mitte),
//                    Tastaturfalle (derselbe Fokus 10× hintereinander; zusätzlich Zyklus-Erkennung), erster Tab = Sprunglink.
//   2. reflow      – 320 × 640: horizontales Scrollen + Überlauf/Abschneiden (lib.mjs → ueberlauf).
//   3. zoom        – d1280 (1280 × 800, DPR 1) mit document.documentElement.style.zoom = 2: horizontales Scrollen,
//                    Überlauf, verdeckte Bedienelemente. Zusätzlich Variante „aequivalent“ (640 × 400, DPR 2 = echter
//                    Browser-Zoom 200 % auf 1280, Medienabfragen greifen) zur Einordnung.
//   4. textabstand – WCAG 1.4.12: Stilblatt (Zeilenhöhe 1,5 · Absatz 2 em · Buchstaben 0,12 em · Wort 0,16 em);
//                    Text, der danach in overflow:hidden/clip-Elementen über den Rand ragt (neu ggü. ohne Stilblatt).
//   5. forced      – forced-colors: active: Ganzseitenfoto nach cache/, Bedienelemente ohne sichtbare Grenze
//                    (Rahmen und Outline = none und kein Text).
//   6. ohnejs      – javaScriptEnabled: false: Text in <main> ≥ 80 % des Laufs mit JS, keine Elemente mit Deckkraft 0 /
//                    visibility:hidden im ersten Bildschirm, Navigation erreichbar (sichtbare interne Links in Kopf/Fuß).
//
// Nutzung:
//   node a11y-zusatz.mjs --satz p0-ausgangsstand [--seiten /,/bad] [--ansichten m375,d1440]
//        [--pruefungen tastatur,reflow,zoom,textabstand,forced,ohnejs] [--ohne-erstbesuch] [--max-tabs 400]
//        [--worker 2] [--gegenprobe fokus[,verdeckt,falle,reihenfolge,reflow,zoom,textabstand,forced,ohnejs]] [--basis datei.json] [--aus datei.json]
//   Standard: 7 Hauptseiten (GRUNDMENGE.json), alle Prüfungen. --ansichten gilt für tastatur/textabstand/forced/ohnejs.
//   Ausgabe: belege/<satz>/a11y-zusatz.json (Zusammenfassung), Rohdaten unter cache/a11y-zusatz/<satz>/.
//   Gegenprobe-Läufe schreiben nie nach belege/, sondern nach cache/a11y-zusatz/<satz>/gegenprobe-<namen>.json, und
//   vergleichen mit der Basis (Standard belege/<satz>/a11y-zusatz.json; tastatur je Fokusschritt über deren Rohdaten).
//
// Messbedingungen: lokaler Server (assertLocal), Anfragesperre (installSperre, G5), Einwilligung „abgelehnt“ (Tastatur
// zusätzlich „erstbesuch“, Banner per Zustandsabfrage abgewartet), reducedMotion 'reduce', de-DE, Europe/Berlin, hell,
// DPR 1 (außer zoom/aequivalent). Wartezeiten nur als Zustandsabfragen: Animationen am Element/Vorfahren/Nachfahren
// beendet und Lage/Stil zwei Frames stabil (Obergrenze 1,5 s) – keine festen Pausen. Höchstens 2 Browser-Kontexte zugleich.
//
// Bezug: Z-11 (ABNAHME.md), AUFTRAG §7 (Zustände: Fokus über outline ≥ 2 px, 3:1; scroll-padding; Sprunglink;
// ohne JavaScript ist jeder Inhalt sichtbar), KERN K-006 (Kontrast 3:1 Bedienelemente), K-011 (Zustände, feste Ebenen).
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, durchscrollen, bereit, grundmenge, slug, ensureDir, ueberlauf, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); if (i < 0) return d; const v = process.argv[i + 1]; return v === undefined || v.startsWith('--') ? true : v; };
const flag = (k) => process.argv.includes(`--${k}`);
assertLocal();

const G = grundmenge();
const satz = arg('satz', 'adhoc');
const seiten = typeof arg('seiten') === 'string' ? arg('seiten').split(',') : G.hauptseiten;
const ansichten = (typeof arg('ansichten') === 'string' ? arg('ansichten') : 'm375,d1440').split(',');
const ALLE_PRUEFUNGEN = ['tastatur', 'reflow', 'zoom', 'textabstand', 'forced', 'ohnejs'];
const pruefungen = typeof arg('pruefungen') === 'string' ? arg('pruefungen').split(',') : ALLE_PRUEFUNGEN;
const maxTabs = Number(arg('max-tabs', '400'));
const WORKER = Math.min(2, Math.max(1, Number(arg('worker', '2')))); // Last: höchstens 2 Kontexte (Vorlage §8)
const gpArg = arg('gegenprobe');
const gegenprobe = gpArg === undefined ? [] : (gpArg === true ? ['fokus'] : String(gpArg).split(','));
const zustaendeTastatur = flag('ohne-erstbesuch') ? ['abgelehnt'] : ['abgelehnt', 'erstbesuch'];
for (const p of pruefungen) if (!ALLE_PRUEFUNGEN.includes(p)) throw new Error(`unbekannte Prüfung ${p}`);
for (const a of ansichten) if (!ANSICHTEN[a]) throw new Error(`unbekannte Ansicht ${a}`);

const satzCache = gegenprobe.length ? `${satz}-gegenprobe-${gegenprobe.join('+')}` : satz;
const CACHE = ensureDir(path.join(RELAUNCH, 'cache', 'a11y-zusatz', satzCache));
const AUS = typeof arg('aus') === 'string' ? path.resolve(arg('aus'))
  : gegenprobe.length ? path.join(RELAUNCH, 'cache', 'a11y-zusatz', satz, `gegenprobe-${gegenprobe.join('+')}.json`)
    : path.join(RELAUNCH, 'belege', satz, 'a11y-zusatz.json');

// ---- Regeln (stehen im Ergebnis) ----
const REGELN = {
  tastatur: {
    obergrenze_schritte: maxTabs,
    ende: 'Fokus verlässt das Dokument (activeElement = body, document.hasFocus() = false) oder Rückkehr zum ersten Element',
    sprung_rueckwaerts: 'Dokument-Y (rect.top + scrollY) des nächsten Fokus liegt mehr als 1 Bildschirmhöhe über dem vorigen',
    fokus_sichtbar: 'Ausschnitt = Element-Rechteck + 8 px, im Bild; Fokus-Bild (nach Tab, stabil) gegen Ruhe-Bild (nach blur(), stabil). '
      + 'Pixel geändert = ein Kanal weicht > 12/255 ab; Kontrastpixel = geändert und Kontrast Fokus-/Ruhefarbe ≥ 3:1 (WCAG-2.4.13-Verfahren). '
      + 'Messlage: ragt der Ausschnitt aus dem Bild, wird das Element nur für die Messung mittig gerollt (scrollIntoView center), danach '
      + 'werden Fenster- und Container-Scrollstände zurückgesetzt. U = Umfang des sichtbaren Elementrechtecks abzüglich Eckenrundung '
      + '(je Ecke (2 − π/2)·r, Radien nach CSS-Skalierung; mindestens ½ Rechteckumfang) = 1-px-Umfang. Status: ok ≥ 1,5·U Kontrastpixel '
      + '(≈ 2-px-Umriss mit Kantenglättung) · duenn ≥ 0,7·U (≈ 1 px oder nur teilweise ≥ 3:1) · kontrastarm < 0,7·U · unsichtbar < max(4, 0,05·U) '
      + 'geänderte Pixel. „Fokus nicht sichtbar“ = unsichtbar + kontrastarm; „nicht-messbar“ = Fokus blieb nach blur() nicht frei. '
      + 'grund: element-unsichtbar (checkVisibility mit Deckkraft/visibility = false), im-overflow-abgeschnitten, ohne-groesse, ausserhalb-bild. '
      + 'Messlage auch dann mittig, wenn an Ring-Stichproben (4 px außerhalb, Kanten/Ecken) eine fremde feste Ebene liegt (ist die Mitte '
      + 'mittig verdeckt, im natürlichen aber frei, wird im natürlichen Scrollstand gemessen); das zählt als '
      + '„Ring teilverdeckt (fest)“, wenn die Mitte im natürlichen Scrollstand frei war (WCAG 2.4.12, Info). '
      + 'Zusatz „ohne Outline/Schatten“: weder outline noch box-shadow unterscheiden sich zwischen Fokus und Ruhe (AUFTRAG §7: Fokus über outline).',
    fokus_verdeckt: 'elementFromPoint an der Mitte des größten Client-Rechtecks ist weder Element noch Nach-/Vorfahr noch zugehöriges label; '
      + '„fest“ = Treffer liegt in einer position:fixed/sticky-Ebene, die das Element nicht enthält; „ausserhalb“ = Mitte nicht im Bild; '
      + '„abgeschnitten“ = Mitte liegt außerhalb eines overflow-Vorfahren; „ganz“ = zusätzlich alle vier Ecken nicht frei',
    falle: 'derselbe Fokus 10× hintereinander → Abbruch; Zyklus = ein Element zum 3. Mal fokussiert → Abbruch, danach Escape + Tab: verlässt der Fokus den Zyklus?',
    sprunglink: 'erster Tab fokussiert <a href="#main-content"> und das Ziel #main-content existiert',
    iframes: 'ein iframe zählt als ein Element (Fremd-Inhalte sind durch die Sperre leer)',
  },
  reflow: { ansicht: '320 × 640, DPR 1, Desktop-Kontext (entspricht 1280 px bei 400 %)', horizontal: 'scrollWidth > clientWidth + 1 oder scrollTo(1e6) ergibt scrollX > 1', ueberlauf: 'lib.mjs → ueberlauf() (ragt-heraus, text-abgeschnitten), nach durchscrollen()' },
  zoom: { css: '1280 × 800, DPR 1, document.documentElement.style.zoom = 2 (Medienabfragen sehen weiter 1280 px – strenger als Browser-Zoom)', aequivalent: '640 × 400, DPR 2, ohne CSS-Zoom (= Browser-Zoom 200 % bei 1280 × 800)', verdeckt: 'sichtbares Bedienelement, dessen Mitte an keiner Scrollposition (Schritt ½ Bildschirmhöhe) frei ist', nie_im_bild: 'Mitte an keiner Scrollposition im Bild (z. B. rechts außerhalb) und kein eigener Scroll-Container dazwischen', info: 'im_overflow_verborgen = Mitte nur außerhalb eines overflow-Vorfahren (z. B. geschlossene Menüs/Akkordeons); im_scroller = in einem scrollbaren Container (z. B. Filterleiste), per Container-Scrollen erreichbar' },
  textabstand: { stilblatt: '*,*::before,*::after{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p{margin-bottom:2em!important}', befund: 'Text-Fragment (Range.getClientRects) ragt > 2 px über die Innenkante eines Elements mit overflow hidden/clip; gezählt wird nur, was ohne Stilblatt nicht abgeschnitten war; dazu neue ueberlauf()-Befunde', scroll_ueberhang: 'Wortlaut Paket: overflow hidden/clip mit Text und scrollHeight > clientHeight bzw. scrollWidth > clientWidth (+1 px), neu ggü. ohne Stilblatt – zählt auch Nicht-Text-Überhang, daher nur Info' },
  forced: { emulation: "page.emulateMedia({ forcedColors: 'active' })", befund: 'sichtbares Bedienelement ohne Rahmen (alle Seiten none/hidden oder < 1 px) und ohne Outline und ohne sichtbaren Text; Felder (input/select/textarea) ohne Rahmen/Outline gesondert' },
  ohnejs: { kontext: 'javaScriptEnabled: false', text: 'sichtbare Zeichen in <main> (Textknoten mit checkVisibility inkl. Deckkraft/visibility) ≥ 80 % des Laufs mit JS (nach durchscrollen)', erster_bildschirm: 'Elemente im ersten Bildschirm mit opacity 0 oder visibility hidden, oberstes je Teilbaum, mit Inhalt (Text/Bild) und ohne aria-hidden; Kennzahl zählt nur, was im Lauf mit JS (oben, nach durchscrollen) nicht ebenso verborgen ist (pfad + Text); ebenso verborgene (geschlossene Menüs) stehen gesondert', navigation: 'mindestens ein sichtbarer interner Link in header oder footer; dazu erreichbare Hauptseiten' },
};

const FOKUS_PAD = 8;
const TOL = 12;
const OK_FAKTOR = 1.5, MIN_FAKTOR = 0.7;
const TEXTABSTAND_CSS = REGELN.textabstand.stilblatt;
const BEDIENELEMENTE = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';

// ---- Gegenproben (nur im Prüflauf, nie im Produkt) ----
const GEGENPROBEN = {
  fokus: { pruefung: 'tastatur', css: '*:focus{outline:none!important;box-shadow:none!important}' },
  verdeckt: { pruefung: 'tastatur', js: () => { const d = document.createElement('div'); d.setAttribute('data-gegenprobe', 'verdeckt'); d.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:transparent'; document.body.append(d); } },
  falle: { pruefung: 'tastatur', js: () => { document.addEventListener('keydown', (e) => { if (e.key === 'Tab' && document.activeElement && document.activeElement.closest('main')) e.preventDefault(); }, true); } },
  reihenfolge: { pruefung: 'tastatur', js: () => { const a = [...document.querySelectorAll('footer a[href]')].pop(); if (a) a.tabIndex = 1; } },
  reflow: { pruefung: 'reflow', css: 'main{min-width:480px!important}' },
  zoom: { pruefung: 'zoom', css: 'main{min-width:1000px!important}', js: () => { const d = document.createElement('div'); d.setAttribute('data-gegenprobe', 'zoom'); d.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:transparent'; document.body.append(d); } },
  textabstand: { pruefung: 'textabstand', js: () => { for (const p of document.querySelectorAll('main p')) { p.style.height = p.getBoundingClientRect().height + 'px'; p.style.overflow = 'hidden'; } } },
  forced: { pruefung: 'forced', js: () => { for (const e of document.querySelectorAll('main a[href], main button')) { e.textContent = ''; e.style.minWidth = '24px'; e.style.minHeight = '24px'; e.style.display = 'inline-block'; } } },
  ohnejs: { pruefung: 'ohnejs', css: 'main > *{opacity:0!important}' },
};
for (const g of gegenprobe) if (!GEGENPROBEN[g]) throw new Error(`unbekannte Gegenprobe ${g}`);

async function gegenprobenAnwenden(page, pruefung, { jsAn = true } = {}) {
  const angewandt = [];
  for (const name of gegenprobe) {
    const g = GEGENPROBEN[name];
    if (g.pruefung !== pruefung) continue;
    if (g.css) {
      if (jsAn) await page.addStyleTag({ content: g.css });
      else await page.evaluate((css) => { const s = document.createElement('style'); s.textContent = css; document.head.append(s); }, g.css); // addStyleTag wartet ohne JS ewig
    }
    if (g.js) await page.evaluate(g.js);
    angewandt.push(name);
  }
  return angewandt;
}

// ---- Hilfen im Seitenkontext (einmal je Dokument) ----
function HELFER() {
  if (window.__a11yZ) return;
  const ids = new WeakMap(); let n = 0;
  const Z = {
    id(el) { let i = ids.get(el); if (!i) { i = ++n; ids.set(el, i); } return i; },
    kurz(e) {
      const teile = [];
      for (let x = e, i = 0; x && x.nodeType === 1 && x !== document.body && x !== document.documentElement && i < 4; x = x.parentElement, i++) {
        let t = x.tagName.toLowerCase();
        if (x.id) { teile.unshift(`${t}#${x.id}`); break; }
        const c = [...x.classList].filter((k) => !/[:[\]/]/.test(k)).slice(0, 2);
        if (c.length) t += '.' + c.join('.');
        teile.unshift(t);
      }
      return teile.join(' > ');
    },
    name(e) {
      const t = e.getAttribute('aria-label') || (e.innerText || '').trim() || e.value || e.getAttribute('title') || e.getAttribute('placeholder') || e.querySelector?.('img[alt]')?.getAttribute('alt') || '';
      return String(t).replace(/\s+/g, ' ').trim().slice(0, 60);
    },
    sichtbar(e) {
      if (!e || !e.checkVisibility) return true;
      return e.checkVisibility({ opacityProperty: true, visibilityProperty: true, checkOpacity: true, checkVisibilityCSS: true });
    },
    srOnly(e, cs) {
      const r = e.getBoundingClientRect();
      return r.width <= 2 || r.height <= 2 || (cs.clipPath || '').startsWith('inset(50%') || (cs.clip || '').startsWith('rect(0');
    },
    fest(e) {
      for (let p = e; p && p.nodeType === 1; p = p.parentElement) {
        const ps = getComputedStyle(p).position;
        if (ps === 'fixed' || ps === 'sticky') return { pos: ps, el: p };
      }
      return null;
    },
    // Liegt Punkt (x, y) außerhalb eines Vorfahren mit abschneidendem overflow?
    abgeschnitten(e, x, y) {
      for (let p = e.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
        const cs = getComputedStyle(p);
        const cx = cs.overflowX !== 'visible', cy = cs.overflowY !== 'visible';
        if (!cx && !cy) continue;
        const r = p.getBoundingClientRect();
        // halboffen: ein Vorfahr mit Höhe/Breite 0 (eingeklapptes Akkordeon) schneidet immer ab
        if ((cx && (x < r.left || x >= r.right)) || (cy && (y < r.top || y >= r.bottom))) return true;
      }
      return false;
    },
    hauptRect(e) {
      const rs = [...e.getClientRects()].filter((q) => q.width > 0 && q.height > 0).sort((a, b) => b.width * b.height - a.width * a.height);
      return rs[0] || e.getBoundingClientRect();
    },
    treffer(el, x, y) {
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) return { s: 'ausserhalb' };
      if (Z.abgeschnitten(el, x, y)) return { s: 'abgeschnitten' };
      const h = document.elementFromPoint(x, y);
      if (!h) return { s: 'ausserhalb' };
      if (h === el || el.contains(h) || h.contains(el)) return { s: 'frei' };
      const lab = h.closest('label');
      if (lab && (lab.control === el || lab.contains(el) || (el.id && lab.htmlFor === el.id))) return { s: 'frei' };
      const f = Z.fest(h);
      const fe = f && !f.el.contains(el) ? f : null;
      return { s: 'verdeckt', durch: Z.kurz(h), fest: fe ? fe.pos : null, ebene: fe ? Z.kurz(fe.el) : null };
    },
    stil(e) {
      const cs = getComputedStyle(e);
      return {
        outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, outlineOffset: cs.outlineOffset, boxShadow: cs.boxShadow,
        border: `${cs.borderTopStyle} ${cs.borderTopWidth} ${cs.borderTopColor}`, hintergrund: cs.backgroundColor, farbe: cs.color, deko: cs.textDecorationLine,
      };
    },
    frames(k = 2) { return new Promise((r) => { let i = 0; const f = () => (++i >= k ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }); },
    // Zustandsabfrage statt fester Pause: Animationen an el/Vorfahren/Nachfahren beendet, Lage und Stil 2 Frames stabil.
    async stabil(el, maxMs = 1500) {
      const t0 = performance.now();
      const bezug = (a) => { const t = a.effect && a.effect.target; return !!t && (t === el || el.contains(t) || t.contains(el)); };
      const sig = () => {
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        return [r.x, r.y, r.width, r.height, scrollX, scrollY].map((v) => Math.round(v * 2)).join('|') + cs.outlineColor + cs.outlineWidth + cs.boxShadow + cs.backgroundColor + cs.opacity;
      };
      let vor = sig(), ruhig = 0;
      while (performance.now() - t0 < maxMs) {
        await new Promise((r) => requestAnimationFrame(() => r()));
        const laeuft = document.getAnimations().some((a) => a.playState === 'running' && bezug(a) && Number.isFinite(a.effect.getComputedTiming().endTime));
        const s = sig();
        if (s === vor && !laeuft) { if (++ruhig >= 2) return { ok: true, ms: Math.round(performance.now() - t0) }; } else ruhig = 0;
        vor = s;
      }
      return { ok: false, ms: Math.round(performance.now() - t0) };
    },
    horizontal() {
      const d = document.documentElement; const sy = scrollY;
      window.scrollTo({ left: 1e6, top: sy, behavior: 'instant' });
      const sx = scrollX;
      window.scrollTo({ left: 0, top: sy, behavior: 'instant' });
      return { horizontal: sx > 1 || d.scrollWidth > d.clientWidth + 1, scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, scrollX: Math.round(sx) };
    },
  };
  window.__a11yZ = Z;
}

// ---- Seitenfunktionen ----
async function SCHRITT(maxMs) {
  const Z = window.__a11yZ;
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement || !document.hasFocus()) return { ende: true, tag: el ? el.tagName.toLowerCase() : null };
  const st = await Z.stabil(el, maxMs);
  const r = el.getBoundingClientRect();
  const g = Z.hauptRect(el);
  const mitte = Z.treffer(el, g.left + g.width / 2, g.top + g.height / 2);
  const ecken = [[g.left + 2, g.top + 2], [g.right - 3, g.top + 2], [g.left + 2, g.bottom - 3], [g.right - 3, g.bottom - 3]].map(([x, y]) => Z.treffer(el, x, y).s);
  const f = Z.fest(el);
  window.__a11yAktiv = el;
  return {
    ende: false, id: Z.id(el), tag: el.tagName.toLowerCase(), rolle: el.getAttribute('role'), name: Z.name(el), href: el.getAttribute('href'),
    pfad: Z.kurz(el), rect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) },
    docY: Math.round(r.top + scrollY), scrollY: Math.round(scrollY), fest: f ? f.pos : null, focusVisible: el.matches(':focus-visible'),
    stil: Z.stil(el), mitte, ganzVerdeckt: mitte.s !== 'frei' && ecken.every((s) => s !== 'frei'), stabil: st, sichtbar: Z.sichtbar(el),
    sprungziel: el.getAttribute('href') === '#main-content' ? !!document.getElementById('main-content') : null,
  };
}
async function BLUR(maxMs) {
  const Z = window.__a11yZ; const el = window.__a11yAktiv;
  el.blur();
  const st = await Z.stabil(el, maxMs);
  const ae = document.activeElement;
  return { stil: Z.stil(el), frei: !ae || ae === document.body || ae === document.documentElement, stabil: st };
}
function REFOKUS() { const el = window.__a11yAktiv; el.focus({ preventScroll: true }); return document.activeElement === el; }

// Messlage: Ragt der Ausschnitt (Element + pad) aus dem Bild, wird das Element nur für die Pixelmessung mittig gerollt
// (sonst fehlt der Fokusring am Bildrand). Alle Scrollstände werden gemerkt und danach zurückgesetzt (LAGE_ZURUECK),
// damit der nächste Tab im natürlichen Scrollstand landet (Prüfung „verdeckt“ bleibt unverfälscht).
async function MESSLAGE([pad, maxMs]) {
  const Z = window.__a11yZ; const el = window.__a11yAktiv;
  const box = () => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; };
  // Ring-Stichproben 4 px außerhalb des Rechtecks (Kantenmitten + Ecken): liegt dort eine fremde feste Ebene?
  const randFest = (q) => {
    const o = 4, xs = [q.x - o, q.x + q.w / 2, q.x + q.w + o - 1], ys = [q.y - o, q.y + q.h / 2, q.y + q.h + o - 1];
    for (const x of xs) for (const y of ys) {
      if (x === xs[1] && y === ys[1]) continue;
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
      const h = document.elementFromPoint(x, y); if (!h || h === el || el.contains(h)) continue;
      const f = Z.fest(h); if (f && !f.el.contains(el)) return Z.kurz(f.el);
    }
    return null;
  };
  const mitteVon = () => { const g = Z.hauptRect(el); return Z.treffer(el, g.left + g.width / 2, g.top + g.height / 2).s; };
  let b = box();
  const randNatur = randFest(b);
  const mitteNatur = mitteVon();
  const drin = b.x - pad >= 0 && b.y - pad >= 0 && b.x + b.w + pad <= innerWidth && b.y + b.h + pad <= innerHeight && !randNatur;
  const passt = b.w + 2 * pad <= innerWidth && b.h + 2 * pad <= innerHeight;
  window.__a11yLage = null;
  let verschoben = false;
  if (!drin && passt) {
    const lage = [{ el: document.scrollingElement || document.documentElement, l: scrollX, t: scrollY, fenster: true }];
    for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
      if (p.scrollHeight > p.clientHeight || p.scrollWidth > p.clientWidth) lage.push({ el: p, l: p.scrollLeft, t: p.scrollTop });
    }
    window.__a11yLage = lage;
    el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
    await Z.stabil(el, maxMs);
    b = box();
    verschoben = true;
    // Mittig schlechter als natürlich (Mitte dort verdeckt, z. B. Banner)? → zurück und im natürlichen Scrollstand messen
    if (mitteVon() !== 'frei' && mitteNatur === 'frei') {
      for (const q of lage.slice().reverse()) { if (q.fenster) window.scrollTo({ left: q.l, top: q.t, behavior: 'instant' }); else { q.el.scrollLeft = q.l; q.el.scrollTop = q.t; } }
      window.__a11yLage = null;
      await Z.stabil(el, maxMs);
      b = box();
      verschoben = false;
    }
  }
  // Umfang mit Eckenrundung (CSS-Skalierung zu großer Radien wie 9999px eingerechnet), Teil im Bild
  const cs = getComputedStyle(el);
  const px = (v, bezug) => (v.endsWith('%') ? (parseFloat(v) / 100) * bezug : parseFloat(v)) || 0;
  const ecken = ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'].map((k) => { const t = cs[`border${k}Radius`].split(' '); return { h: px(t[0], b.w), v: px(t[1] || t[0], b.h) }; });
  const f = Math.min(1, ...[[0, 1, 'h', b.w], [3, 2, 'h', b.w], [0, 3, 'v', b.h], [1, 2, 'v', b.h]].map(([i, j, a, s]) => { const sum = ecken[i][a] + ecken[j][a]; return sum > 0 ? s / sum : 1; }));
  const radien = ecken.map((e) => Math.min(e.h, e.v) * f);
  const mitte = mitteVon();
  return { rect: { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.w), h: Math.round(b.h) }, radien: radien.map((r) => Math.round(r * 10) / 10), verschoben, rand_fest_natuerlich: randNatur, rand_fest_messlage: verschoben ? randFest(b) : randNatur, mitte_messlage: mitte };
}
async function LAGE_ZURUECK(maxMs) {
  const lage = window.__a11yLage; if (!lage) return false;
  for (const s of lage.slice().reverse()) {
    if (s.fenster) window.scrollTo({ left: s.l, top: s.t, behavior: 'instant' });
    else { s.el.scrollLeft = s.l; s.el.scrollTop = s.t; }
  }
  window.__a11yLage = null;
  await window.__a11yZ.stabil(window.__a11yAktiv, maxMs);
  return true;
}

async function VERDECKUNG(SEL) {
  const Z = window.__a11yZ;
  const els = [...document.querySelectorAll(SEL)].filter((e) => {
    if (e.closest('[aria-hidden="true"], [inert]')) return false;
    if (!Z.sichtbar(e)) return false;
    return !Z.srOnly(e, getComputedStyle(e));
  });
  const stand = els.map(() => ({ gesehen: 0, frei: 0, abgeschnitten: 0, t: null }));
  const se = document.scrollingElement || document.documentElement;
  const max = Math.max(0, se.scrollHeight - innerHeight);
  const schritt = Math.max(100, Math.floor(innerHeight / 2));
  let positionen = 0;
  for (let y = 0; ; y = Math.min(y + schritt, max)) {
    window.scrollTo({ top: y, left: 0, behavior: 'instant' });
    await Z.frames(2);
    positionen++;
    els.forEach((e, i) => {
      const g = Z.hauptRect(e); const cx = g.left + g.width / 2, cy = g.top + g.height / 2;
      if (cy < 0 || cy >= innerHeight || cx < 0 || cx >= innerWidth) return;
      const t = Z.treffer(e, cx, cy);
      if (t.s === 'abgeschnitten') { stand[i].abgeschnitten++; return; }
      stand[i].gesehen++;
      if (t.s === 'frei') stand[i].frei++; else if (!stand[i].t) stand[i].t = t;
    });
    if (y >= max || positionen > 400) break;
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  const verdeckt = [], nieImBild = [];
  let verborgen = 0, imScroller = 0;
  // eigener Scroll-Container (overflow auto/scroll mit Überhang) zwischen Element und Dokument → per Container-Scrollen erreichbar
  const scroller = (e) => { for (let p = e.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) { const cs = getComputedStyle(p); if ((['auto', 'scroll'].includes(cs.overflowX) && p.scrollWidth > p.clientWidth + 1) || (['auto', 'scroll'].includes(cs.overflowY) && p.scrollHeight > p.clientHeight + 1)) return true; } return false; };
  els.forEach((e, i) => {
    const s = stand[i];
    const d = { pfad: Z.kurz(e), name: Z.name(e) };
    if (s.gesehen > 0 && s.frei === 0) verdeckt.push({ ...d, durch: s.t.durch || s.t.s, fest: s.t.fest || null, ebene: s.t.ebene || null });
    else if (s.gesehen === 0 && s.abgeschnitten > 0) verborgen++;
    else if (s.gesehen === 0 && scroller(e)) imScroller++;
    else if (s.gesehen === 0) { const g = Z.hauptRect(e); nieImBild.push({ ...d, x: Math.round(g.left), y: Math.round(g.top), w: Math.round(g.width), fest: !!Z.fest(e) }); }
  });
  return { bedienelemente: els.length, positionen, verdeckt, nie_im_bild: nieImBild, im_overflow_verborgen: verborgen, im_scroller: imScroller };
}

function TEXTSCHNITT() {
  const Z = window.__a11yZ; const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    const hx = cs.overflowX === 'hidden' || cs.overflowX === 'clip';
    const hy = cs.overflowY === 'hidden' || cs.overflowY === 'clip';
    if (!hx && !hy) continue;
    if (el.closest('[aria-hidden="true"]') || !Z.sichtbar(el) || Z.srOnly(el, cs)) continue;
    if (!(el.textContent || '').trim()) continue;
    const r = el.getBoundingClientRect();
    const box = { l: r.left + parseFloat(cs.borderLeftWidth), r: r.right - parseFloat(cs.borderRightWidth), t: r.top + parseFloat(cs.borderTopWidth), b: r.bottom - parseFloat(cs.borderBottomWidth) };
    let ueber = 0, beispiel = '';
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const t = w.currentNode; const s = t.textContent.trim(); if (!s) continue;
      const p = t.parentElement; if (!p || p.closest('[aria-hidden="true"], script, style, template') || !Z.sichtbar(p)) continue;
      const range = document.createRange(); range.selectNodeContents(t);
      for (const q of range.getClientRects()) {
        if (q.width < 1 || q.height < 1) continue;
        const dy = hy ? Math.max(box.t - q.top, q.bottom - box.b) : 0;
        const dx = hx ? Math.max(box.l - q.left, q.right - box.r) : 0;
        const d = Math.max(dx, dy);
        if (d > ueber) { ueber = d; beispiel = s.slice(0, 60); }
      }
    }
    if (ueber > 2) out.push({ id: Z.id(el), pfad: Z.kurz(el), text: beispiel, ueberstand: Math.round(ueber), achse: hy && hx ? 'xy' : hy ? 'y' : 'x', lineClamp: !!(cs.webkitLineClamp && cs.webkitLineClamp !== 'none') });
  }
  return out;
}

// Wortlaut des Pakets: Element mit overflow hidden/clip, Text darin, scrollHeight > clientHeight bzw. scrollWidth > clientWidth
function SCROLLSCHNITT() {
  const Z = window.__a11yZ; const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    const hx = cs.overflowX === 'hidden' || cs.overflowX === 'clip', hy = cs.overflowY === 'hidden' || cs.overflowY === 'clip';
    if (!hx && !hy) continue;
    if (el.closest('[aria-hidden="true"]') || !Z.sichtbar(el) || Z.srOnly(el, cs) || !(el.textContent || '').trim()) continue;
    const dy = hy ? el.scrollHeight - el.clientHeight : 0, dx = hx ? el.scrollWidth - el.clientWidth : 0;
    if (dy > 1 || dx > 1) out.push({ id: Z.id(el), pfad: Z.kurz(el), dx, dy });
  }
  return out;
}

function FORCED(SEL) {
  const Z = window.__a11yZ;
  const ohne = [], felder = []; let n = 0;
  const NATIV = 'input[type="checkbox"], input[type="radio"], input[type="range"], input[type="color"], input[type="file"]';
  for (const e of document.querySelectorAll(SEL)) {
    if (e.closest('[aria-hidden="true"], [inert]')) continue;
    const cs = getComputedStyle(e);
    if (!Z.sichtbar(e) || Z.srOnly(e, cs)) continue;
    if (e.matches(NATIV) && cs.appearance !== 'none') continue; // nativ gezeichnet, Systemfarben
    n++;
    const rand = ['Top', 'Right', 'Bottom', 'Left'].some((s) => !['none', 'hidden'].includes(cs[`border${s}Style`]) && parseFloat(cs[`border${s}Width`]) >= 1);
    const umriss = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 1;
    const knopfInput = e.matches('input[type="submit"], input[type="button"], input[type="reset"]');
    const text = ((knopfInput ? e.value : e.innerText) || '').trim().length > 0;
    const feld = e.matches('input, select, textarea') && !knopfInput;
    const grafik = e.matches('img, svg') || !!e.querySelector('svg, img, picture');
    const d = { pfad: Z.kurz(e), name: Z.name(e), grafik };
    if (feld && !rand && !umriss) felder.push(d);
    else if (!feld && !rand && !umriss && !text) ohne.push(d);
  }
  return { forcedColors: matchMedia('(forced-colors: active)').matches, bedienelemente: n, ohne_grenze: ohne, felder_ohne_grenze: felder };
}

function TEXT_MAIN() {
  const Z = window.__a11yZ;
  const main = document.querySelector('main');
  if (!main) return { main: false, zeichen: 0 };
  let z = 0;
  const w = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const t = w.currentNode; const p = t.parentElement;
    if (!p || p.closest('script, style, template')) continue;
    const s = t.textContent.replace(/\s+/g, ' ').trim(); if (!s) continue;
    if (!Z.sichtbar(p)) continue;
    z += s.length;
  }
  return { main: true, zeichen: z };
}
function ERSTER_BILDSCHIRM() {
  const Z = window.__a11yZ; const vh = innerHeight; const out = []; const gesehen = new Set();
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('script, style, template')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.bottom <= 0 || r.top >= vh) continue;
    const cs = getComputedStyle(el);
    const art = parseFloat(cs.opacity) === 0 ? 'opacity-0' : cs.visibility === 'hidden' ? 'visibility-hidden' : null;
    if (!art) continue;
    let p = el.parentElement, schon = false;
    while (p) { if (gesehen.has(p)) { schon = true; break; } p = p.parentElement; }
    gesehen.add(el);
    if (schon) continue;
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    const inhalt = text.length > 0 || el.matches('img, svg, picture, video, canvas') || !!el.querySelector('img, svg, picture, video, canvas');
    out.push({ pfad: Z.kurz(el), art, inhalt, ariaHidden: !!el.closest('[aria-hidden="true"]'), text: text.slice(0, 60), y: Math.round(r.top), h: Math.round(r.height) });
  }
  return out;
}
function NAVIGATION() {
  const Z = window.__a11yZ;
  const zaehle = (sel) => {
    const as = [...document.querySelectorAll(`${sel} a[href]`)].filter((a) => Z.sichtbar(a) && !Z.srOnly(a, getComputedStyle(a)));
    const intern = as.filter((a) => { try { return new URL(a.href, location.href).origin === location.origin; } catch { return false; } });
    return { sichtbar: as.length, intern: intern.length, pfade: [...new Set(intern.map((a) => new URL(a.href, location.href).pathname.replace(/\/$/, '') || '/'))] };
  };
  return { kopf: zaehle('header'), fuss: zaehle('footer') };
}

// ---- Pixelvergleich ----
const LIN = Array.from({ length: 256 }, (_, v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
const lum = (d, i) => 0.2126 * LIN[d[i]] + 0.7152 * LIN[d[i + 1]] + 0.0722 * LIN[d[i + 2]];
function vergleiche(bufF, bufR) {
  const a = PNG.sync.read(bufF), b = PNG.sync.read(bufR);
  if (a.width !== b.width || a.height !== b.height) return null;
  let aender = 0, kontrast = 0, maxK = 1;
  for (let i = 0; i < a.data.length; i += 4) {
    if (Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2])) <= TOL) continue;
    aender++;
    const l1 = lum(a.data, i), l2 = lum(b.data, i);
    const k = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    if (k >= 3) kontrast++;
    if (k > maxK) maxK = k;
  }
  return { aender, kontrast, maxKontrast: Math.round(maxK * 100) / 100 };
}

// ---- Kontexte ----
let browser;
const BASIS_KONTEXT = { deviceScaleFactor: 1, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' };
async function neuerKontext(viewport, extra = {}, einwilligung = 'abgelehnt') {
  const context = await browser.newContext({ ...BASIS_KONTEXT, viewport: { width: viewport.width, height: viewport.height }, isMobile: !!viewport.isMobile, hasTouch: !!viewport.hasTouch, ...extra });
  const protokoll = [];
  await installSperre(context, { protokoll });
  await setzeEinwilligung(context, einwilligung);
  return { context, protokoll };
}
async function laden(page, s, { waitUntil = 'domcontentloaded' } = {}) {
  const resp = await page.goto(BASE + s, { waitUntil, timeout: 45000 });
  await bereit(page);
  await page.evaluate(HELFER);
  return resp ? resp.status() : null;
}
const sperrInfo = (protokoll) => ({ fremd: protokoll.filter((p) => p.art === 'fremd').length, blockiert: protokoll.filter((p) => p.art === 'blockiert').length });

// ---- 1. Tastatur ----
async function pruefeTastatur(s, a, zustand) {
  const v = ANSICHTEN[a];
  const { context, protokoll } = await neuerKontext(v, {}, zustand);
  const page = await context.newPage();
  const r = { pruefung: 'tastatur', seite: s, ansicht: a, zustand };
  try {
    r.status = await laden(page, s);
    if (zustand === 'erstbesuch') {
      const banner = page.locator('[role="dialog"][aria-label*="Cookie"]');
      try { await banner.waitFor({ state: 'visible', timeout: 8000 }); r.banner = true; await banner.evaluate((b) => window.__a11yZ.stabil(b, 2000)); } catch { r.banner = false; }
    }
    r.gegenprobe = await gegenprobenAnwenden(page, 'tastatur');
    const schritte = [];
    const zaehl = { ok: 0, duenn: 0, kontrastarm: 0, unsichtbar: 0, 'nicht-messbar': 0 };
    const verdeckt = { fest: 0, andere: 0, ausserhalb: 0, abgeschnitten: 0, ganz: 0 };
    const befunde = { fokus: [], verdeckt: [], sprung: [], falle: null, zyklus: null, refokus: [], ring_teilverdeckt: [] };
    const besuche = new Map();
    let letzteId = null, gleich = 0, ende = 'obergrenze', vorig = null, ersteId = null, bilder = 0, ohneUmriss = 0;
    const bildDir = path.join(CACHE, 'tastatur', `${a}-${zustand}`, slug(s));
    for (let n = 1; n <= maxTabs; n++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(SCHRITT, 1500);
      if (info.ende) { ende = 'seitenende'; break; }
      if (ersteId === null) ersteId = info.id;
      gleich = info.id === letzteId ? gleich + 1 : 1;
      letzteId = info.id;
      if (gleich >= 10) { ende = 'falle'; befunde.falle = { schritt: n, pfad: info.pfad, name: info.name }; break; }
      if (gleich > 1) continue; // dasselbe Element erneut – nur zählen
      const b = (besuche.get(info.id) || 0) + 1; besuche.set(info.id, b);
      if (info.id === ersteId && n > 1 && b === 2) { ende = 'umlauf'; break; }
      if (b >= 3) {
        const kreis = schritte.slice(schritte.findIndex((x) => x.id === info.id)).map((x) => x.id);
        const menge = new Set(kreis);
        await page.keyboard.press('Escape');
        await page.keyboard.press('Tab');
        const nach = await page.evaluate(SCHRITT, 1500);
        befunde.zyklus = { schritt: n, laenge: menge.size, elemente: schritte.filter((x) => menge.has(x.id)).slice(0, 12).map((x) => x.pfad), escape_befreit: nach.ende || !menge.has(nach.id) };
        ende = 'zyklus';
        break;
      }
      const e = { nr: n, ...info };
      // Reihenfolge
      if (vorig && vorig.docY - info.docY > v.height) befunde.sprung.push({ nr: n, von: { pfad: vorig.pfad, name: vorig.name, docY: vorig.docY }, nach: { pfad: info.pfad, name: info.name, docY: info.docY, fest: info.fest } });
      vorig = info;
      // Verdeckt
      if (info.mitte.s !== 'frei') {
        const art = info.mitte.s === 'verdeckt' ? (info.mitte.fest ? 'fest' : 'andere') : info.mitte.s;
        verdeckt[art]++;
        if (info.ganzVerdeckt) verdeckt.ganz++;
        befunde.verdeckt.push({ nr: n, art, ganz: info.ganzVerdeckt, pfad: info.pfad, name: info.name, durch: info.mitte.durch || null, ebene: info.mitte.ebene || null, rect: info.rect });
      }
      // Fokus sichtbar (Pixel Ruhe/Fokus) – in der Messlage (Ausschnitt ganz im Bild), danach Scrollstand zurück
      const lage = await page.evaluate(MESSLAGE, [FOKUS_PAD, 1500]);
      const m = lage.rect;
      const sx0 = Math.max(0, m.x), sy0 = Math.max(0, m.y);
      const sx1 = Math.min(v.width, m.x + m.w), sy1 = Math.min(v.height, m.y + m.h);
      const grundSichtbar = !info.sichtbar ? 'element-unsichtbar' : lage.mitte_messlage === 'abgeschnitten' ? 'im-overflow-abgeschnitten'
        : lage.mitte_messlage !== 'frei' ? 'verdeckt-in-messlage' : lage.rand_fest_messlage ? 'ring-unter-fester-ebene' : undefined;
      if (lage.rand_fest_natuerlich && info.mitte.s === 'frei') befunde.ring_teilverdeckt.push({ nr: n, pfad: info.pfad, name: info.name, ebene: lage.rand_fest_natuerlich });
      let fokus;
      if (m.w < 1 || m.h < 1) fokus = { status: 'unsichtbar', grund: 'ohne-groesse', stilAenderung: [] };
      else if (sx1 <= sx0 || sy1 <= sy0) fokus = { status: 'unsichtbar', grund: 'ausserhalb-bild', stilAenderung: [] };
      else {
        const x0 = Math.max(0, m.x - FOKUS_PAD), y0 = Math.max(0, m.y - FOKUS_PAD);
        const x1 = Math.min(v.width, m.x + m.w + FOKUS_PAD), y1 = Math.min(v.height, m.y + m.h + FOKUS_PAD);
        const clip = { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
        const bildF = await page.screenshot({ clip, animations: 'disabled' });
        const ruhe = await page.evaluate(BLUR, 1500);
        const bildR = await page.screenshot({ clip, animations: 'disabled' });
        const refok = await page.evaluate(REFOKUS);
        if (!refok) befunde.refokus.push({ nr: n, pfad: info.pfad });
        const px = vergleiche(bildF, bildR);
        const Urechteck = 2 * ((sx1 - sx0) + (sy1 - sy0));
        const U = Math.max(0.5 * Urechteck, Urechteck - lage.radien.reduce((s, r) => s + (2 - Math.PI / 2) * r, 0));
        const stilAenderung = Object.keys(info.stil).filter((k) => info.stil[k] !== ruhe.stil[k]);
        let status;
        if (!ruhe.frei || !px) status = 'nicht-messbar';
        else if (px.aender < Math.max(4, 0.05 * U)) status = 'unsichtbar';
        else if (px.kontrast < MIN_FAKTOR * U) status = 'kontrastarm';
        else if (px.kontrast < OK_FAKTOR * U) status = 'duenn';
        else status = 'ok';
        fokus = { status, grund: status === 'ok' ? undefined : grundSichtbar, ...px, umfang: Math.round(U), umfang_rechteck: Urechteck, radien: lage.radien, messlage_verschoben: lage.verschoben, rand_fest: lage.rand_fest_messlage, clip, stilAenderung, stabil: info.stabil.ok && ruhe.stabil.ok };
        if (status !== 'ok' && bilder < 12) {
          ensureDir(bildDir);
          fs.writeFileSync(path.join(bildDir, `${String(n).padStart(3, '0')}-fokus.png`), bildF);
          fs.writeFileSync(path.join(bildDir, `${String(n).padStart(3, '0')}-ruhe.png`), bildR);
          bilder++;
        }
      }
      if (lage.verschoben) await page.evaluate(LAGE_ZURUECK, 1500);
      fokus.outline_oder_schatten = fokus.stilAenderung.includes('outline') || fokus.stilAenderung.includes('boxShadow');
      if (!fokus.outline_oder_schatten) ohneUmriss++;
      zaehl[fokus.status]++;
      if (['unsichtbar', 'kontrastarm', 'duenn', 'nicht-messbar'].includes(fokus.status)) befunde.fokus.push({ nr: n, status: fokus.status, grund: fokus.grund, pfad: info.pfad, name: info.name, kontrast: fokus.kontrast, maxKontrast: fokus.maxKontrast, umfang: fokus.umfang, stilAenderung: fokus.stilAenderung });
      e.fokus = fokus;
      schritte.push(e);
    }
    const erster = schritte[0];
    r.erster_tab = erster ? { ok: erster.tag === 'a' && erster.href === '#main-content' && erster.sprungziel === true, pfad: erster.pfad, name: erster.name, href: erster.href } : { ok: false };
    r.ende = ende;
    r.schritte = schritte.length;
    r.instabil = schritte.filter((x) => !x.stabil.ok || (x.fokus && x.fokus.stabil === false)).length;
    r.fokus = zaehl;
    r.verdeckt = verdeckt;
    r.kennzahlen = {
      fokus_nicht_sichtbar: zaehl.unsichtbar + zaehl.kontrastarm,
      fokus_nicht_sichtbar_davon_verdeckt_verborgen: befunde.fokus.filter((b) => ['unsichtbar', 'kontrastarm'].includes(b.status) && ['verdeckt-in-messlage', 'ring-unter-fester-ebene', 'im-overflow-abgeschnitten', 'element-unsichtbar'].includes(b.grund)).length,
      fokus_ring_teilverdeckt_fest: befunde.ring_teilverdeckt.length, fokus_unter_2px: zaehl.duenn, fokus_nicht_messbar: zaehl['nicht-messbar'], fokus_ohne_outline_schatten: ohneUmriss,
      fokus_verdeckt: verdeckt.fest + verdeckt.andere + verdeckt.ausserhalb + verdeckt.abgeschnitten, fokus_verdeckt_fest: verdeckt.fest,
      sprung_rueckwaerts: befunde.sprung.length, falle: befunde.falle ? 1 : 0, zyklus_ohne_ausweg: befunde.zyklus && !befunde.zyklus.escape_befreit ? 1 : 0,
      sprunglink_fehlt: r.erster_tab.ok ? 0 : 1,
    };
    r.befunde = { fokus: befunde.fokus.slice(0, 40), verdeckt: befunde.verdeckt.slice(0, 40), sprung: befunde.sprung.slice(0, 20), falle: befunde.falle, zyklus: befunde.zyklus, refokus_fehlgeschlagen: befunde.refokus.slice(0, 10), ring_teilverdeckt: befunde.ring_teilverdeckt.slice(0, 20) };
    const roh = ensureDir(path.join(CACHE, 'tastatur', `${a}-${zustand}`));
    fs.writeFileSync(path.join(roh, `${slug(s)}.json`), JSON.stringify({ seite: s, ansicht: a, zustand, ende, schritte }, null, 1));
  } catch (err) { r.fehler = String(err.message).slice(0, 300); }
  r.sperre = sperrInfo(protokoll);
  await context.close();
  return r;
}

// ---- 2. Reflow 320 ----
async function pruefeReflow(s) {
  const v = { width: 320, height: 640, isMobile: false, hasTouch: false };
  const { context, protokoll } = await neuerKontext(v);
  const page = await context.newPage();
  const r = { pruefung: 'reflow', seite: s, ansicht: 'r320' };
  try {
    r.status = await laden(page, s);
    await durchscrollen(page); await bereit(page);
    r.gegenprobe = await gegenprobenAnwenden(page, 'reflow');
    r.horizontal = await page.evaluate(() => window.__a11yZ.horizontal());
    const ue = (await ueberlauf(page)).filter((b) => b.art !== 'horizontal');
    r.befunde = ue;
    r.kennzahlen = { horizontal: r.horizontal.horizontal ? 1 : 0, ueberlauf: ue.length, ragt_heraus: ue.filter((b) => b.art === 'ragt-heraus').length, text_abgeschnitten: ue.filter((b) => b.art === 'text-abgeschnitten').length };
  } catch (err) { r.fehler = String(err.message).slice(0, 300); }
  r.sperre = sperrInfo(protokoll);
  await context.close();
  return r;
}

// ---- 3. Zoom 200 % ----
async function pruefeZoom(s, variante) {
  const v = variante === 'css' ? { width: 1280, height: 800 } : { width: 640, height: 400 };
  const { context, protokoll } = await neuerKontext(v, { deviceScaleFactor: variante === 'css' ? 1 : 2 });
  const page = await context.newPage();
  const r = { pruefung: 'zoom', seite: s, variante, ansicht: variante === 'css' ? 'd1280-zoom2' : 'v640x400-dpr2' };
  try {
    r.status = await laden(page, s);
    await durchscrollen(page); await bereit(page);
    if (variante === 'css') {
      await page.evaluate(async () => { document.documentElement.style.zoom = 2; window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); await window.__a11yZ.frames(3); });
      r.zoom = await page.evaluate(() => getComputedStyle(document.documentElement).zoom);
    }
    r.gegenprobe = await gegenprobenAnwenden(page, 'zoom');
    r.horizontal = await page.evaluate(() => window.__a11yZ.horizontal());
    const ue = (await ueberlauf(page)).filter((b) => b.art !== 'horizontal');
    const vd = await page.evaluate(VERDECKUNG, BEDIENELEMENTE);
    r.bedienelemente = vd.bedienelemente; r.scrollpositionen = vd.positionen; r.im_overflow_verborgen = vd.im_overflow_verborgen; r.im_scroller = vd.im_scroller;
    r.befunde = { verdeckt: vd.verdeckt.slice(0, 40), nie_im_bild: vd.nie_im_bild.slice(0, 20), ueberlauf: ue };
    r.kennzahlen = { horizontal: r.horizontal.horizontal ? 1 : 0, verdeckt: vd.verdeckt.length, verdeckt_fest: vd.verdeckt.filter((x) => x.fest).length, nie_im_bild: vd.nie_im_bild.length, ueberlauf: ue.length };
  } catch (err) { r.fehler = String(err.message).slice(0, 300); }
  r.sperre = sperrInfo(protokoll);
  await context.close();
  return r;
}

// ---- 4. Textabstände ----
async function pruefeTextabstand(s, a) {
  const v = ANSICHTEN[a];
  const { context, protokoll } = await neuerKontext(v);
  const page = await context.newPage();
  const r = { pruefung: 'textabstand', seite: s, ansicht: a };
  try {
    r.status = await laden(page, s);
    await durchscrollen(page); await bereit(page);
    r.gegenprobe = await gegenprobenAnwenden(page, 'textabstand');
    const vor = await page.evaluate(TEXTSCHNITT);
    const scrollVor = await page.evaluate(SCROLLSCHNITT);
    const ueVor = await ueberlauf(page);
    await page.addStyleTag({ content: TEXTABSTAND_CSS });
    await page.evaluate(() => window.__a11yZ.frames(2));
    const nach = await page.evaluate(TEXTSCHNITT);
    const scrollNach = await page.evaluate(SCROLLSCHNITT);
    const ueNach = await ueberlauf(page);
    const scrollVorIds = new Set(scrollVor.map((x) => x.id));
    const scrollNeu = scrollNach.filter((x) => !scrollVorIds.has(x.id));
    const schl = (b) => `${b.art}|${b.tag}|${b.cls || ''}|${b.text || ''}`;
    const vorIds = new Set(vor.map((x) => x.id));
    const ueVorK = new Set(ueVor.map(schl));
    const neu = nach.filter((x) => !vorIds.has(x.id));
    const ueNeu = ueNach.filter((b) => !ueVorK.has(schl(b)));
    r.vorher_abgeschnitten = vor.length;
    r.befunde = { abgeschnitten_neu: neu.slice(0, 40), ueberlauf_neu: ueNeu.slice(0, 20), vorher: vor.slice(0, 10), scroll_ueberhang_neu: scrollNeu.slice(0, 20) };
    r.kennzahlen = { abgeschnitten_neu: neu.length, scroll_ueberhang_neu: scrollNeu.length, davon_line_clamp: neu.filter((x) => x.lineClamp).length, ueberlauf_neu: ueNeu.length, horizontal_neu: ueNeu.some((b) => b.art === 'horizontal') ? 1 : 0 };
  } catch (err) { r.fehler = String(err.message).slice(0, 300); }
  r.sperre = sperrInfo(protokoll);
  await context.close();
  return r;
}

// ---- 5. forced-colors ----
async function pruefeForced(s, a) {
  const v = ANSICHTEN[a];
  const { context, protokoll } = await neuerKontext(v);
  const page = await context.newPage();
  const r = { pruefung: 'forced', seite: s, ansicht: a };
  try {
    await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
    r.status = await laden(page, s);
    await durchscrollen(page); await bereit(page);
    r.gegenprobe = await gegenprobenAnwenden(page, 'forced');
    const dir = ensureDir(path.join(CACHE, 'forced-colors', a));
    const datei = path.join(dir, `${slug(s)}.jpg`);
    await page.screenshot({ path: datei, fullPage: true, type: 'jpeg', quality: 60, animations: 'disabled' });
    r.foto = path.relative(RELAUNCH, datei);
    const f = await page.evaluate(FORCED, BEDIENELEMENTE);
    r.forced_aktiv = f.forcedColors;
    r.bedienelemente = f.bedienelemente;
    r.befunde = { ohne_grenze: f.ohne_grenze.slice(0, 40), felder_ohne_grenze: f.felder_ohne_grenze.slice(0, 20) };
    r.kennzahlen = { ohne_grenze: f.ohne_grenze.length, davon_mit_grafik: f.ohne_grenze.filter((x) => x.grafik).length, felder_ohne_grenze: f.felder_ohne_grenze.length };
  } catch (err) { r.fehler = String(err.message).slice(0, 300); }
  r.sperre = sperrInfo(protokoll);
  await context.close();
  return r;
}

// ---- 6. Ohne JavaScript ----
async function pruefeOhneJs(s, a) {
  const v = ANSICHTEN[a];
  const r = { pruefung: 'ohnejs', seite: s, ansicht: a };
  const prot = [];
  try {
    // Bezug: Lauf mit JS (nach durchscrollen, damit Auftritte ausgelöst sind)
    let k = await neuerKontext(v);
    let page = await k.context.newPage();
    await laden(page, s);
    await durchscrollen(page); await bereit(page);
    const mitJs = await page.evaluate(TEXT_MAIN);
    const erstMitJs = await page.evaluate(ERSTER_BILDSCHIRM);
    prot.push(...k.protokoll);
    await k.context.close();
    // Lauf ohne JS
    k = await neuerKontext(v, { javaScriptEnabled: false });
    page = await k.context.newPage();
    r.status = await laden(page, s, { waitUntil: 'load' });
    r.gegenprobe = await gegenprobenAnwenden(page, 'ohnejs', { jsAn: false });
    const ohneJs = await page.evaluate(TEXT_MAIN);
    const erst = await page.evaluate(ERSTER_BILDSCHIRM);
    const nav = await page.evaluate(NAVIGATION);
    prot.push(...k.protokoll);
    await k.context.close();
    const anteil = mitJs.zeichen ? ohneJs.zeichen / mitJs.zeichen : 0;
    // Vergleich mit dem Lauf mit JS (oben, nach durchscrollen): was dort ebenso verborgen ist (geschlossene Menüs u. Ä.), ist kein Verlust ohne JS
    const schl = (x) => `${x.pfad}|${x.text}`;
    const auchMitJs = new Set(erstMitJs.map(schl));
    const kandidaten = erst.filter((x) => x.inhalt && !x.ariaHidden);
    const versteckt = kandidaten.filter((x) => !auchMitJs.has(schl(x)));
    const ebensoMitJs = kandidaten.filter((x) => auchMitJs.has(schl(x)));
    const pfade = new Set([...nav.kopf.pfade, ...nav.fuss.pfade]);
    r.text = { mit_js: mitJs.zeichen, ohne_js: ohneJs.zeichen, anteil: Math.round(anteil * 1000) / 1000, main: ohneJs.main };
    r.navigation = { kopf_sichtbar: nav.kopf.sichtbar, kopf_intern: nav.kopf.intern, fuss_sichtbar: nav.fuss.sichtbar, fuss_intern: nav.fuss.intern, hauptseiten_erreichbar: G.hauptseiten.filter((h) => pfade.has(h)).length, hauptseiten_fehlen: G.hauptseiten.filter((h) => !pfade.has(h)) };
    r.befunde = { erster_bildschirm_versteckt: versteckt.slice(0, 30), erster_bildschirm_ebenso_mit_js: ebensoMitJs.slice(0, 20), erster_bildschirm_ohne_inhalt_oder_aria_hidden: erst.length - kandidaten.length };
    r.kennzahlen = { text_unter_80: anteil < 0.8 ? 1 : 0, erster_bildschirm_versteckt: versteckt.length, erster_bildschirm_ebenso_mit_js: ebensoMitJs.length, navigation_fehlt: nav.kopf.intern + nav.fuss.intern > 0 ? 0 : 1, kopf_ohne_interne_links: nav.kopf.intern > 0 ? 0 : 1 };
  } catch (err) { r.fehler = String(err.message).slice(0, 300); }
  r.sperre = sperrInfo(prot);
  return r;
}

// ---- Ablauf ----
const t0 = Date.now();
browser = await chromium.launch();
const jobs = [];
if (pruefungen.includes('tastatur')) for (const s of seiten) for (const a of ansichten) for (const z of zustaendeTastatur) jobs.push(['tastatur', () => pruefeTastatur(s, a, z)]);
if (pruefungen.includes('reflow')) for (const s of seiten) jobs.push(['reflow', () => pruefeReflow(s)]);
if (pruefungen.includes('zoom')) for (const s of seiten) for (const vz of ['css', 'aequivalent']) jobs.push(['zoom', () => pruefeZoom(s, vz)]);
if (pruefungen.includes('textabstand')) for (const s of seiten) for (const a of ansichten) jobs.push(['textabstand', () => pruefeTextabstand(s, a)]);
if (pruefungen.includes('forced')) for (const s of seiten) for (const a of ansichten) jobs.push(['forced', () => pruefeForced(s, a)]);
if (pruefungen.includes('ohnejs')) for (const s of seiten) for (const a of ansichten) jobs.push(['ohnejs', () => pruefeOhneJs(s, a)]);
const laeufe = [];
let next = 0;
await Promise.all(Array.from({ length: WORKER }, async () => {
  while (next < jobs.length) {
    const [p, fn] = jobs[next++];
    const ts = Date.now();
    let r;
    try { r = await fn(); } catch (err) { r = { pruefung: p, fehler: String(err.message).slice(0, 300) }; }
    r.dauer_s = Math.round((Date.now() - ts) / 100) / 10;
    laeufe.push(r);
    const rot = r.fehler ? 'E' : Object.values(r.kennzahlen || {}).some((x) => x > 0) ? 'x' : '.';
    process.stdout.write(rot);
  }
}));
const browserVersion = browser.version();
await browser.close();

// ---- Zusammenfassung ----
const summe = (liste, k) => liste.reduce((n, r) => n + ((r.kennzahlen && r.kennzahlen[k]) || 0), 0);
const ergebnis = {};
const kennzahlen = {};
const status = {};
for (const p of pruefungen) {
  const l = laeufe.filter((r) => r.pruefung === p).sort((x, y) => (x.seite || '').localeCompare(y.seite || '') || String(x.ansicht).localeCompare(String(y.ansicht)) || String(x.zustand || x.variante || '').localeCompare(String(y.zustand || y.variante || '')));
  const keys = [...new Set(l.flatMap((r) => Object.keys(r.kennzahlen || {})))];
  const kz = Object.fromEntries(keys.map((k) => [k, summe(l, k)]));
  kz.laeufe = l.length; kz.fehler = l.filter((r) => r.fehler).length;
  if (p === 'tastatur') {
    kz.schritte = l.reduce((n, r) => n + (r.schritte || 0), 0);
    for (const z of zustaendeTastatur) for (const a of ansichten) {
      const t = l.filter((r) => r.zustand === z && r.ansicht === a);
      kz[`${a}_${z}`] = Object.fromEntries(['fokus_nicht_sichtbar', 'fokus_unter_2px', 'fokus_ohne_outline_schatten', 'fokus_verdeckt', 'fokus_verdeckt_fest', 'sprung_rueckwaerts', 'falle', 'sprunglink_fehlt'].map((k) => [k, summe(t, k)]));
    }
    status.tastatur = {
      reihenfolge: kz.sprung_rueckwaerts ? 'rot' : 'gruen', fokus_sichtbar: kz.fokus_nicht_sichtbar ? 'rot' : 'gruen', fokus_2px: kz.fokus_unter_2px ? 'rot' : 'gruen',
      fokus_outline: kz.fokus_ohne_outline_schatten ? 'rot' : 'gruen', fokus_verdeckt: kz.fokus_verdeckt ? 'rot' : 'gruen', tastaturfalle: kz.falle || kz.zyklus_ohne_ausweg ? 'rot' : 'gruen', sprunglink: kz.sprunglink_fehlt ? 'rot' : 'gruen',
    };
  } else if (p === 'zoom') {
    for (const vz of ['css', 'aequivalent']) { const t = l.filter((r) => r.variante === vz); kz[vz] = Object.fromEntries(['horizontal', 'verdeckt', 'verdeckt_fest', 'nie_im_bild', 'ueberlauf'].map((k) => [k, summe(t, k)])); }
    const rotZ = (k) => (k.horizontal || k.verdeckt || k.nie_im_bild || k.ueberlauf ? 'rot' : 'gruen');
    status.zoom = { css: rotZ(kz.css), aequivalent: rotZ(kz.aequivalent) };
  } else {
    const haupt = { reflow: ['horizontal', 'ueberlauf'], textabstand: ['abgeschnitten_neu', 'ueberlauf_neu'], forced: ['ohne_grenze'], ohnejs: ['text_unter_80', 'erster_bildschirm_versteckt', 'navigation_fehlt'] }[p];
    status[p] = haupt.some((k) => kz[k]) ? 'rot' : 'gruen';
  }
  if (kz.fehler) status[`${p}_fehler`] = kz.fehler;
  kennzahlen[p] = kz;
  ergebnis[p] = l;
}
// Übersicht je Seite (Kennzahlen summiert über Ansichten/Zustände)
const jeSeite = {};
for (const s of seiten) {
  jeSeite[s] = {};
  for (const p of pruefungen) {
    const l = laeufe.filter((r) => r.pruefung === p && r.seite === s);
    const keys = [...new Set(l.flatMap((r) => Object.keys(r.kennzahlen || {})))];
    jeSeite[s][p] = Object.fromEntries(keys.map((k) => [k, summe(l, k)]));
  }
}
// Gegenprobe: Vergleich mit der Basis desselben Satzes (Kennzahlen; für tastatur je Fokusschritt über die Rohdaten)
let vergleich = null;
if (gegenprobe.length) {
  const basisDatei = typeof arg('basis') === 'string' ? path.resolve(arg('basis')) : path.join(RELAUNCH, 'belege', satz, 'a11y-zusatz.json');
  if (fs.existsSync(basisDatei)) {
    const basis = JSON.parse(fs.readFileSync(basisDatei, 'utf8'));
    const nurZahlen = (o) => Object.fromEntries(Object.entries(o || {}).filter(([, x]) => typeof x === 'number'));
    vergleich = { basis: path.relative(RELAUNCH, basisDatei), basis_erstellt: basis.erstellt, status_basis: Object.fromEntries(pruefungen.map((p) => [p, basis.status?.[p]])), status_gegenprobe: Object.fromEntries(pruefungen.map((p) => [p, status[p]])), kennzahlen_basis: Object.fromEntries(pruefungen.map((p) => [p, nurZahlen(basis.kennzahlen?.[p])])), kennzahlen_gegenprobe: Object.fromEntries(pruefungen.map((p) => [p, nurZahlen(kennzahlen[p])])) };
    if (pruefungen.includes('tastatur') && basis.bedingungen?.rohdaten) {
      const lies = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
      const NICHT = ['unsichtbar', 'kontrastarm'];
      const t = { paare: 0, basis_ok: 0, basis_ok_jetzt_nicht_sichtbar: 0, basis_ok_jetzt_duenn: 0, basis_ok_bleibt_ok: 0, beispiele_bleibt_ok: [], ohne_basis: [] };
      for (const r of ergebnis.tastatur) {
        const rel = path.join('tastatur', `${r.ansicht}-${r.zustand}`, `${slug(r.seite)}.json`);
        const b = lies(path.join(RELAUNCH, basis.bedingungen.rohdaten, rel)), g = lies(path.join(CACHE, rel));
        if (!b || !g) { t.ohne_basis.push(rel); continue; }
        const bm = new Map(b.schritte.map((x) => [`${x.nr}|${x.pfad}`, x.fokus && x.fokus.status]));
        for (const x of g.schritte) {
          const k = `${x.nr}|${x.pfad}`; if (!bm.has(k) || !x.fokus) continue;
          t.paare++;
          if (bm.get(k) !== 'ok') continue;
          t.basis_ok++;
          if (NICHT.includes(x.fokus.status)) t.basis_ok_jetzt_nicht_sichtbar++;
          else if (x.fokus.status === 'duenn') t.basis_ok_jetzt_duenn++;
          else if (x.fokus.status === 'ok') { t.basis_ok_bleibt_ok++; if (t.beispiele_bleibt_ok.length < 20) t.beispiele_bleibt_ok.push({ seite: r.seite, ansicht: r.ansicht, zustand: r.zustand, nr: x.nr, pfad: x.pfad, name: x.name, stilAenderung: x.fokus.stilAenderung }); }
        }
      }
      t.quote_erkannt = t.basis_ok ? Math.round((t.basis_ok_jetzt_nicht_sichtbar / t.basis_ok) * 1000) / 1000 : null;
      vergleich.tastatur_fokus_je_schritt = t;
    }
  }
}
const aus = {
  satz, base: BASE, erstellt: new Date().toISOString(), werkzeug: 'a11y-zusatz.mjs', kriterium: 'Z-11',
  bedingungen: {
    server: BASE, browser: `chromium ${browserVersion}`, playwright: '1.56.1', seiten, ansichten, pruefungen,
    einwilligung: 'abgelehnt', einwilligung_tastatur: zustaendeTastatur, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light', deviceScaleFactor: 1,
    ansichten_px: Object.fromEntries(ansichten.map((a) => [a, ANSICHTEN[a]])), worker: WORKER, gegenprobe: gegenprobe.length ? gegenprobe.map((g) => ({ name: g, ...GEGENPROBEN[g], js: GEGENPROBEN[g].js ? String(GEGENPROBEN[g].js) : undefined })) : null,
    regeln: REGELN, rohdaten: path.relative(RELAUNCH, CACHE),
  },
  laufzeit_s: Math.round((Date.now() - t0) / 1000),
  status, kennzahlen, ...(vergleich ? { gegenprobe_vergleich: vergleich } : {}), je_seite: jeSeite, ergebnisse: ergebnis,
};
ensureDir(path.dirname(AUS));
fs.writeFileSync(AUS, JSON.stringify(aus, null, 1));
console.log(`\na11y-zusatz: ${laeufe.length} Läufe in ${aus.laufzeit_s} s → ${path.relative(RELAUNCH, AUS)}`);
console.log(JSON.stringify(status));
if (vergleich) console.log('gegenprobe_vergleich', JSON.stringify({ status_basis: vergleich.status_basis, status_gegenprobe: vergleich.status_gegenprobe, tastatur: vergleich.tastatur_fokus_je_schritt && Object.fromEntries(Object.entries(vergleich.tastatur_fokus_je_schritt).filter(([, x]) => typeof x === 'number')) }));
for (const [p, kz] of Object.entries(kennzahlen)) console.log(p, JSON.stringify(Object.fromEntries(Object.entries(kz).filter(([, v]) => typeof v === 'number'))));
