// Prüfwerkzeug Bewegung (E0-PRUEF-02b). Vier Modi; je Lauf ergebnis.json plus Zusammenfassung auf stdout:
//   einzelbilder  je Bewegungskennung fünf Bilder bei 0/25/50/75/100 % der längsten Dauer (Zeitmodus; Auslöser wahl:
//                 je Folge fünf Bilder), bei scroll-gebundenen Animationen fünf Bilder der ganzen Ansicht bei
//                 10/30/50/70/90 % des Durchgangs des Elements (Eintritt bis Austritt). Auslöser seite (Lade-Moment):
//                 Echtzeit-Folge (E4-NACH-18): je Bild eine frische Seite, Anker „Element im DOM“, Wartezeit t_k
//                 (0/25/50/75 % der längsten Dauer, 100 % + 150 ms), CPU 4×; Ausschnitt nach Lage (Oberkante 80 px
//                 unter dem Kopf, mindestens 400 px hoch); je Bildpaar der Anteil geänderter Pixel (Graustufen)
//   bildrate      präsentierte und verworfene Bilder sowie Long Animation Frames bei 4× CPU-Drosselung,
//                 Scroll-Geste oben→unten→oben, Kennzahlen je Wiederholung, Median der Anteile je Lauf als Kopfwert
//   register      data-motion im DOM gegen _werkstatt/register.json, Animationen ohne data-motion
//   reduziert     Animationen bei prefers-reduced-motion: reduce und Sichtbarkeit der data-motion-Elemente
// Nutzung:
//   node bewegung.mjs --modus einzelbilder|bildrate|register|reduziert --seite /pfad [--base URL]
//     [--ansicht m390] [--kennung NAME] [--ziel DIR] [--wiederholungen 3] [--ausschnitt ansicht]
//     [--anker animation|dom] [--cpu 1] [--zeitlupe 0.1]   (Lade-Momente: Anker, CPU-Drosselung, Wiedergabegeschwindigkeit)
// Standardziel: _werkstatt/cache/bewegung/<modus>/<slug>/ (liegt außerhalb des Repos).
// Jeder Browserlauf: assertLocal(base), installSperre (Anfragesperre aus lib.mjs), Einwilligung „abgelehnt“.
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE, RELAUNCH, ANSICHTEN_AUSBAU, assertLocal, installSperre, setzeEinwilligung, durchscrollen, bereit, slug, ensureDir } from './lib.mjs';

export const MODI = ['einzelbilder', 'bildrate', 'register', 'reduziert'];

// Auslöser je Kennung nach K-007 und src/lib/motion/register.ts. Unbekannte Kennungen gelten als Scroll-Auslöser (Annahme, im Ergebnis vermerkt).
// sig-plan: trägt das Element data-flucht="laden", gilt zur Laufzeit „seite“ (Ladeanimation), sonst „hover“.
// verband: „wahl“ = Radiofeld wechseln (Halb → Drittel, Drittel → Kreuz), je Wechsel eine Folge.
export const AUSLOESER = {
  'sig-kreuzlinie': 'seite', 'sig-flucht': 'seite', 'szene-ablauf': 'scroll', 'sig-plan': 'hover',
  einzugsband: 'seite', fugenband: 'scroll', leitachse: 'scroll', verband: 'wahl',
  anriss: 'scroll', auftritt: 'scroll', aufklappen: 'klick', druck: 'aktiv', zustand: 'hover+fokus',
  notiert: 'erfolg', laden: 'absenden', seitenwechsel: 'navigation',
};
// Auslöser, die nur nach Formularsendung oder Navigation entstehen. Sie werden bewusst nicht ausgelöst.
const NICHT_AUSLOESBAR = {
  erfolg: 'Erfolgsmeldung entsteht erst nach einer Formularsendung',
  absenden: 'Ladeanzeige entsteht erst nach Absenden (keine Formularsendung in Prüfläufen)',
  navigation: 'Seitenwechsel entsteht nur per Navigation',
};
const ZEITPUNKTE = [0, 0.25, 0.5, 0.75, 1];
const SCROLL_ANTEILE = [0.1, 0.3, 0.5, 0.7, 0.9];   // Scrollmodus: Anteile am Durchgang des Elements (Eintritt bis Austritt)
const WAHL_FOLGEN = ['drittel', 'kreuz'];            // verband: Start ist Halb (Standard); Folgen Halb → Drittel, Drittel → Kreuz
const LADE_MIN_HOEHE = 400;                          // Auslöser seite, Ausschnitt: mindestens so hoch
const LADE_PUFFER_MS = 150;                          // Auslöser seite: Puffer nach der längsten Dauer (letztes Bild)
const LADE_CPU_RATE = 1;                             // Auslöser seite: CPU-Drosselung je Bild (CDP); Maßstab 4× verschiebt den Beginn der Beobachtung (Befund)
const LADE_ZEITLUPE = 0.1;                           // Auslöser seite: Wiedergabegeschwindigkeit der CSS-Animationen je Bild (CDP), Anker animation
const KOPF_ABSTAND = 80;                             // Auslöser seite: Oberkante des Elements unter dem Kopf, wenn gescrollt wird
const SCHWELLE_GRAU = 24;                            // Helligkeitsunterschied (0–255), ab dem ein Pixel als geändert gilt (wie E4-NACH-16)
const SCHWELLE_ANTEIL = 0.5;                         // Prozent geänderter Pixel, ab dem sich ein Bild vom Nachbarn sichtbar unterscheidet
const LADE_MIN_SICHTBAR = 3;                         // Lade-Folge: mindestens so viele der fünf Bilder unterscheiden sich sichtbar
const MAX_AUSLOESER = 12;   // je Kennung höchstens so viele Elemente auslösen
const SCHRITT_MS = 250;     // Wartezeit nach einem Auslöser (IntersectionObserver, Klassenwechsel)
const VERBOTEN = ['transform', 'translate', 'scale', 'rotate', 'width', 'height', 'top', 'left', 'inset'];
const KATEGORIEN = 'devtools.timeline,disabled-by-default-devtools.timeline.frame,benchmark,cc';
const GESTE_PX_S = 800;
const ZWEI_FRAMES = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

const istAufruf = !!process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

function arg(argv, k, d) {
  const i = argv.indexOf(`--${k}`);
  return i > -1 && argv[i + 1] !== undefined && !argv[i + 1].startsWith('--') ? argv[i + 1] : d;
}

/**
 * Zeitpunkte einer Lade-Folge (Auslöser seite) in ms: 0, 25, 50, 75 % der längsten Dauer (Dauer + Verzögerung), danach
 * 100 % plus Puffer am Ende. Die Zeit wird ab dem Anker gemessen (Element im DOM), nicht aus einer Pause oder einem Seek.
 */
export function zeitpunkteLade(laengste, puffer = LADE_PUFFER_MS) {
  const T = Math.max(0, Math.round(laengste));
  return [0, Math.round(T * 0.25), Math.round(T * 0.5), Math.round(T * 0.75), T + puffer];
}

/**
 * Scrollziel für den Ausschnitt seite. oben/unten: Dokumentkoordinaten des Elements (Vereinigung der gerenderten Elemente
 * der Kennung); sy: aktuelle Scrollposition; kopf: Unterkante der festen Kopfleiste; fuss: Oberkante der festen Leiste am
 * unteren Rand (Ansichtskoordinaten). Liegt das Element nicht vollständig im sichtbaren Bereich, wird so gescrollt, dass
 * seine Oberkante KOPF_ABSTAND unter dem Kopf steht; der Scrollbereich begrenzt das (Scroll 0 ist die Grenze).
 */
export function scrollZiel({ oben, unten, sy, kopf, fuss, maxScroll }) {
  const sichtbar = oben - sy >= kopf && unten - sy <= fuss;
  if (sichtbar) return { noetig: false, ziel: sy };
  const ziel = Math.round(Math.min(Math.max(0, oben - kopf - KOPF_ABSTAND), Math.max(0, maxScroll)));
  return { noetig: true, ziel };
}

/**
 * Bildausschnitt um das Element (Ansichtskoordinaten nach dem Scroll): mindestens LADE_MIN_HOEHE hoch und nie höher als
 * die Ansicht. Ist das Element höher als die Ansicht, steht der Ausschnitt über die ganze Höhe.
 */
export function clipFuerAusschnitt({ oben, unten, vh, vw, mindestHoehe = LADE_MIN_HOEHE }) {
  const h = Math.round(Math.min(vh, Math.max(mindestHoehe, unten - oben + 48)));
  const mitte = (oben + unten) / 2;
  const y = Math.round(Math.min(Math.max(0, mitte - h / 2), vh - h));
  return { x: 0, y, width: vw, height: h };
}

/**
 * Sichtbare Bilder einer Lade-Folge. prozente[k] ist der Anteil geänderter Pixel zwischen Bild k und Bild k+1 (vier Werte
 * bei fünf Bildern). Ein Bild gilt als sichtbar verschieden, wenn ein Nachbarbild über SCHWELLE_ANTEIL liegt.
 */
export function sichtbareBilder(prozente, schwelle = SCHWELLE_ANTEIL) {
  const n = prozente.length + 1;
  const je_bild = Array.from({ length: n }, (_, k) => (k > 0 && prozente[k - 1] > schwelle) || (k < n - 1 && prozente[k] > schwelle));
  return { anzahl: je_bild.filter(Boolean).length, je_bild };
}

/** Im Seitenkontext: längste Dauer + Verzögerung der CSS-Animationen der Kennung (getComputedStyle, gerenderte Elemente). */
function laufzeitLade(kennung) {
  const ms = (s) => { const v = parseFloat(s); return /ms\s*$/.test(s) ? v : v * 1000; };
  const liste = (s) => String(s).split(',').map((x) => x.trim());
  const els = [...document.querySelectorAll(`[data-motion="${kennung}"]`)].filter((e) => e.getClientRects().length > 0);
  let laengste = 0;
  let animationen = 0;
  let endlos = false;
  for (const el of els) {
    for (const d of [el, ...el.querySelectorAll('*')]) {
      if (d.getClientRects().length === 0) continue;
      const c = getComputedStyle(d);
      const namen = liste(c.animationName);
      if (namen.every((n) => n === 'none')) continue;
      const dauern = liste(c.animationDuration);
      const verz = liste(c.animationDelay);
      const its = liste(c.animationIterationCount);
      namen.forEach((n, i) => {
        if (n === 'none') return;
        animationen += 1;
        laengste = Math.max(laengste, ms(dauern[i % dauern.length]) + ms(verz[i % verz.length]));
        if (its[i % its.length] === 'infinite') endlos = true;
      });
    }
  }
  return { gerendert: els.length, animationen, laengste_ms: Math.round(laengste), endlos };
}

/** Im Seitenkontext: Lage der Kennung für den Ausschnitt seite (feste Kopf- und Fußleiste, Vereinigung der Elemente). */
function lageLade(kennung) {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const sy = window.scrollY;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
  let kopf = 0;
  let fuss = vh;
  for (const e of document.body.querySelectorAll('*')) {
    if (e.getClientRects().length === 0 || getComputedStyle(e).position !== 'fixed') continue;
    const r = e.getBoundingClientRect();
    if (r.width < 100 || r.height <= 0 || r.height > vh * 0.5) continue;
    if (r.top <= 0.5 && r.bottom > 0) kopf = Math.max(kopf, r.bottom);
    if (r.bottom >= vh - 0.5 && r.top > vh * 0.5) fuss = Math.min(fuss, r.top);
  }
  let oben = Infinity;
  let unten = -Infinity;
  let gerendert = 0;
  for (const e of document.querySelectorAll(`[data-motion="${kennung}"]`)) {
    if (e.getClientRects().length === 0) continue;
    const r = e.getBoundingClientRect();
    if (r.width <= 0 && r.height <= 0) continue;
    gerendert += 1;
    oben = Math.min(oben, r.top + sy);
    unten = Math.max(unten, r.bottom + sy);
  }
  return {
    vh, vw, sy, maxScroll, gerendert,
    kopf: Math.round(kopf), fuss: Math.round(fuss),
    oben: gerendert ? Math.round(oben) : null, unten: gerendert ? Math.round(unten) : null,
  };
}

/** Browserkontext wie in den übrigen Werkzeugen: Ansicht, Anfragesperre, Einwilligung abgelehnt. */
async function kontext(browser, { base, ansicht, reducedMotion, protokoll, init = [], vorbereitung }) {
  const v = ANSICHTEN_AUSBAU[ansicht];
  const context = await browser.newContext({
    viewport: { width: v.width, height: v.height }, deviceScaleFactor: v.isMobile ? 2 : 1,
    isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion, locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light',
  });
  await installSperre(context, { protokoll });
  await setzeEinwilligung(context, 'abgelehnt', base);
  for (const f of init) await context.addInitScript(f);
  if (vorbereitung) await vorbereitung(context);
  return context;
}

const zusammenfassung = (p) => ({
  fremd_abgefangen: p.filter((x) => x.art === 'fremd').length,
  blockiert: p.filter((x) => x.art === 'blockiert').length,
  formular_attrappe: p.filter((x) => x.art === 'anfrage').length,
});

/** Init-Skript (Einzelbilder): hält jede neu entstehende Animation sofort an, damit der Startzustand erhalten bleibt. Scroll-gebundene laufen weiter. */
function pausierInit() {
  if (window.__bewPausiert) return;
  window.__bewPausiert = true;
  const gesehen = new WeakSet();
  const scrollGebunden = (a) => !!a.timeline && /ScrollTimeline|ViewTimeline/.test((a.timeline.constructor && a.timeline.constructor.name) || '');
  const halte = () => {
    for (const a of document.getAnimations()) {
      if (gesehen.has(a)) continue;
      gesehen.add(a);
      if (!scrollGebunden(a)) { try { a.pause(); } catch (e) { /* nicht pausierbar: ignorieren */ } }
    }
    requestAnimationFrame(halte);
  };
  requestAnimationFrame(halte);
}

/** Init-Skript (Register, Reduziert): sammelt Animationen und Transitions zwischen start() und stopp(). Alle 100 ms plus Ereignisse. */
function sammlerInit() {
  if (window.__bewSammler) return;
  const AUS = ['offset', 'easing', 'composite', 'computedOffset'];
  // Eigenschaften einheitlich in CSS-Schreibweise (outlineColor → outline-color), damit Doppelnennungen entfallen
  const norm = (p) => String(p).replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
  const sel = (el) => {
    if (!(el instanceof Element)) return String(el && el.nodeName ? el.nodeName : '?').toLowerCase();
    const id = el.id ? `#${el.id}` : '';
    const cls = [...el.classList].slice(0, 2).map((c) => `.${c}`).join('');
    return (el.tagName.toLowerCase() + id + cls).slice(0, 120);
  };
  const dmVon = (el) => {
    const d = el && el.closest ? el.closest('[data-motion]') : null;
    return d ? d.getAttribute('data-motion') : null;
  };
  const karten = new Map();
  const gesehen = new WeakSet();
  const zaehle = (d) => {
    const k = [d.art, d.sel, d.dm || '', d.eigenschaften.join(',')].join('|');
    const v = karten.get(k);
    if (v) v.anzahl += 1; else karten.set(k, { ...d, anzahl: 1 });
  };
  const S = window.__bewSammler = {
    aktiv: false,
    start() { this.aktiv = true; },
    stopp() { this.aktiv = false; },
    ergebnis() { return [...karten.values()]; },
  };
  const erfasse = (a) => {
    if (!S.aktiv || gesehen.has(a)) return;
    gesehen.add(a);
    const ziel = a.effect && a.effect.target;
    if (!ziel) return;
    const art = (typeof CSSTransition !== 'undefined' && a instanceof CSSTransition) ? 'transition'
      : (typeof CSSAnimation !== 'undefined' && a instanceof CSSAnimation) ? 'animation' : 'waapi';
    let eig = [];
    try { eig = a.effect.getKeyframes().flatMap((k) => Object.keys(k)).filter((k) => !AUS.includes(k)); } catch (e) { /* ohne Keyframes */ }
    if (art === 'transition' && a.transitionProperty) eig.push(a.transitionProperty);
    zaehle({ art, sel: sel(ziel) + (a.effect.pseudoElement || ''), dm: dmVon(ziel), eigenschaften: [...new Set(eig.map(norm))].sort() });
  };
  setInterval(() => { if (S.aktiv) for (const a of document.getAnimations()) erfasse(a); }, 100);
  document.addEventListener('animationstart', (e) => {
    if (!S.aktiv) return;
    const treffer = document.getAnimations().find((a) => a instanceof CSSAnimation && a.animationName === e.animationName && a.effect && a.effect.target === e.target);
    if (treffer) erfasse(treffer);
    else zaehle({ art: 'animation', sel: sel(e.target), dm: dmVon(e.target), eigenschaften: [`name:${e.animationName}`] });
  }, true);
  document.addEventListener('transitionrun', (e) => {
    if (!S.aktiv) return;
    const treffer = document.getAnimations().find((a) => a instanceof CSSTransition && a.transitionProperty === e.propertyName && a.effect && a.effect.target === e.target);
    if (treffer) erfasse(treffer);
    else zaehle({ art: 'transition', sel: sel(e.target), dm: dmVon(e.target), eigenschaften: [norm(e.propertyName)] });
  }, true);
}

/** Seitenseitig: Animationen der Kennung anhalten, Zeitbasis bestimmen und Zeitpunkte setzen. */
function ermittleKennung(kennung) {
  const scrollGebunden = (a) => !!a.timeline && /ScrollTimeline|ViewTimeline/.test((a.timeline.constructor && a.timeline.constructor.name) || '');
  const els = [...document.querySelectorAll(`[data-motion="${kennung}"]`)];
  const alle = document.getAnimations();
  for (const a of alle) if (!scrollGebunden(a)) { try { a.pause(); } catch (e) { /* ignorieren */ } }
  const eigene = alle.filter((a) => { const t = a.effect && a.effect.target; return !!t && els.some((el) => el === t || el.contains(t)); });
  const zeit = eigene.filter((a) => !scrollGebunden(a));
  const dauer = (a) => {
    const ct = a.effect.getComputedTiming();
    const ende = Number.isFinite(ct.endTime) ? ct.endTime : (Number(ct.delay) || 0) + (Number(ct.duration) || 0);
    return Number.isFinite(ende) ? ende : 0;
  };
  window.__bewEigene = eigene;
  window.__bewSeek = (p, T) => {
    for (const a of window.__bewEigene) {
      if (scrollGebunden(a)) continue;
      a.pause();
      a.currentTime = p * T;
    }
  };
  return {
    elemente: els.length,
    animationen: eigene.length,
    zeit: zeit.length,
    scroll: eigene.length - zeit.length,
    laengste_ms: Math.round(zeit.reduce((m, a) => Math.max(m, dauer(a)), 0)),
    endlos: zeit.some((a) => !Number.isFinite(a.effect.getComputedTiming().endTime)),
  };
}

/**
 * Durchgang eines scroll-gebundenen Elements in Dokumentkoordinaten: Eintritt (Oberkante am unteren Fensterrand)
 * bis Austritt (Unterkante am oberen Fensterrand), auch wenn das Element ganz ins Fenster passt. Die Scroll-Animationen
 * laufen über `cover`, also über genau diesen Weg (E3-Befund c).
 */
function wirkbereich(kennung) {
  const el = document.querySelector(`[data-motion="${kennung}"]`);
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const oben = r.top + window.scrollY;
  const max = Math.max(0, document.documentElement.scrollHeight - vh);
  return {
    start: Math.min(max, Math.max(0, oben - vh)),
    ende: Math.min(max, Math.max(0, oben + r.height)),
    max,
    lage: 'Durchgang',
  };
}

function mitteZeigen(el) { el.scrollIntoView({ block: 'center', behavior: 'instant' }); }

/**
 * Bildausschnitt für Zeit- und Wahl-Folgen. modus: 'ansicht' = ganzer Viewport bei Scrollposition 0;
 * 'element' = Element mit 24 px Rand, im Viewport. Liegt das Element nicht im Viewport, wird die Ansicht aufgenommen.
 * Lade-Momente (Auslöser seite) laufen über echtzeitLaden().
 */
async function ausschnitt(page, loc, datei, modus = 'element') {
  if (modus === 'ansicht') {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.evaluate(ZWEI_FRAMES);
    await page.screenshot({ path: datei, type: 'jpeg', quality: 70 });
    return 'ansicht';
  }
  const vp = page.viewportSize();
  const box = await loc.boundingBox();
  let clip = { x: 0, y: 0, width: vp.width, height: vp.height };
  let art = 'ansicht';
  if (box) {
    const x0 = Math.max(0, box.x - 24), y0 = Math.max(0, box.y - 24);
    const x1 = Math.min(vp.width, box.x + box.width + 24), y1 = Math.min(vp.height, box.y + box.height + 24);
    if (x1 - x0 >= 2 && y1 - y0 >= 2) { clip = { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }; art = 'ausschnitt'; }
  }
  await page.screenshot({ path: datei, type: 'jpeg', quality: 70, clip });
  return art;
}

/** Scrollmodus: die ganze Ansicht an der aktuellen Position (Zusammenhang sichtbar). */
async function vollbild(page, datei) {
  await page.evaluate(ZWEI_FRAMES);
  await page.screenshot({ path: datei, type: 'jpeg', quality: 70 });
  return 'ansicht';
}

/** Zeitmodus: fünf Bilder bei 0/25/50/75/100 % der längsten Dauer der erfassten Animationen (Seek über __bewSeek). */
async function zeitBilder(page, loc, { st, verzeichnis, praefix, bildModus, folge = null }) {
  const bilder = [];
  for (let k = 0; k < ZEITPUNKTE.length; k++) {
    await page.evaluate(([p, T]) => window.__bewSeek(p, T), [ZEITPUNKTE[k], st.laengste_ms]);
    await page.evaluate(ZWEI_FRAMES);
    const datei = `${praefix}${k}.jpg`;
    const art = await ausschnitt(page, loc, path.join(verzeichnis, datei), bildModus);
    bilder.push({ datei, ...(folge ? { folge } : {}), zeitpunkt: ZEITPUNKTE[k], art });
  }
  return bilder;
}

/**
 * Auslöser wahl (verband): je Radiowechsel in WAHL_FOLGEN eine Folge mit fünf Zeitpunkten. Der Start ist Halb (Standard),
 * die Folgen sind Halb → Drittel und Drittel → Kreuz. Nach jeder Folge werden die Übergänge abgebrochen, damit die nächste
 * Folge nur ihre eigenen zeigt. Das Feld wird über seinen Wert gewählt, nicht über die Position (Reihenfolge im Markup:
 * Kreuz, Halb, Drittel).
 */
async function wahlFolgen(page, loc, info, { kennung, verzeichnis, bildModus }) {
  const gewaehlt = () => page.evaluate((k) => {
    const i = document.querySelector(`[data-motion="${k}"] [data-verband-wahl]:checked`);
    return i ? i.getAttribute('data-verband-wahl') : 'ohne';
  }, kennung);
  const el = loc.first();
  for (const ziel of WAHL_FOLGEN) {
    const feld = el.locator(`[data-verband-wahl="${ziel}"]`);
    if (!(await feld.count())) { info.befund.push(`Radiofeld ${ziel} fehlt: Folge übersprungen`); continue; }
    const von = await gewaehlt();
    if (von === ziel) { info.befund.push(`Radiofeld ${ziel} ist schon gewählt: Folge übersprungen`); continue; }
    const folge = `${von} → ${ziel}`;
    const praefix = `${kennung}-${von}-${ziel}-`;
    // Dauer des Übergangs aus dem Stil (dauer-3); Zwischenstände sind nicht per Pause/Seek ins Bild zu bringen (siehe Befund)
    const dauerMs = await page.evaluate(() => {
      const r = document.querySelector('[data-motion="verband"] .verband-reihe');
      return r ? Math.round(parseFloat(getComputedStyle(r).transitionDuration) * 1000) || 0 : 0;
    });
    await el.evaluate(mitteZeigen);
    await page.evaluate(ZWEI_FRAMES);
    const folgeBilder = [];
    const schuss = async (k, zustand, t0) => {
      const start = Date.now();
      const art = await ausschnitt(page, el, path.join(verzeichnis, `${praefix}${k}.jpg`), bildModus);
      folgeBilder.push({ datei: `${praefix}${k}.jpg`, folge, zustand, ...(t0 == null ? {} : { ms_nach_klick: start - t0 }), art });
    };
    await schuss(0, 'vorher', null);                 // 0 %: Zustand vor dem Wechsel
    const t0 = Date.now();
    // Das Radiofeld liegt unter seinem Textfeld (span über dem Eingang): wie ein Mensch über das Etikett wählen
    await el.locator(`label:has([data-verband-wahl="${ziel}"])`).click({ timeout: 5000 });
    if (!(await feld.isChecked())) { info.befund.push(`Radiofeld ${ziel} nach dem Klick nicht gewählt: Folge übersprungen`); continue; }
    info.ausgeloest++;
    // pausierInit hat die Übergänge beim Entstehen angehalten; für die Abtastung laufen sie in Echtzeit weiter
    await page.evaluate(() => document.getAnimations().forEach((a) => { if (a instanceof CSSTransition) a.play(); }));
    info.laengste_dauer_ms = Math.max(info.laengste_dauer_ms, dauerMs);
    info.animationen += await page.evaluate(() => document.getAnimations().filter((a) => a instanceof CSSTransition).length);
    for (let k = 1; k <= 3; k++) await schuss(k, 'echtzeit', t0);   // 1–3: Abtastung in Echtzeit nach dem Klick
    const rest = dauerMs + 400 - (Date.now() - t0);
    if (rest > 0) await page.waitForTimeout(rest);
    await schuss(4, 'nachher', t0);                 // 4: Zustand nach dem Übergang
    info.bilder.push(...folgeBilder);
  }
  if (!info.bilder.length) info.befund.push('keine Folge aufgenommen');
  else info.befund.push('verband: Bilder 1–3 sind Echtzeit-Abtastungen nach dem Klick (ms_nach_klick), keine Zeitpunkte 25/50/75 %. In dieser Umgebung folgt das Bild bei translate-Übergängen weder JS-Pause noch CDP-Seek (getestet); der Übergang steht nach etwa 150 ms zu rund 85 % im Bild');
  info.modus = 'echtzeit';
  return info;
}

/** Eine Kennung: Auslöser, Pause, Zeitpunkte bzw. Scrollpositionen, fünf Bilder je Folge. */
async function aufnahme(context, { base, seite, kennung, anzahl, verzeichnis, ganzeAnsicht = false }) {
  const info = { kennung, elemente: anzahl, ausloeser: AUSLOESER[kennung] ?? 'scroll', ausgeloest: 0, modus: null, animationen: 0, laengste_dauer_ms: 0, bilder: [], befund: [] };
  if (!(kennung in AUSLOESER)) info.befund.push('nicht in AUSLOESER (K-007): Scroll-Auslöser angenommen');
  if (NICHT_AUSLOESBAR[info.ausloeser]) { info.befund.push(`keine Bilder: ${NICHT_AUSLOESBAR[info.ausloeser]}`); return info; }
  const page = await context.newPage();
  let loslassen = null;
  try {
    await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await bereit(page);
    await page.waitForTimeout(150);
    const loc = page.locator(`[data-motion="${kennung}"]`);
    // sig-plan mit data-flucht="laden" läuft über echtzeitLaden() (Auslöser seite); hier nur Hover-Folgen
    if (kennung === 'sig-plan') {
      const fluchten = await loc.evaluateAll((els) => els.map((e) => e.getAttribute('data-flucht') || ''));
      if (new Set(fluchten).size > 1) info.befund.push(`data-flucht gemischt (${[...new Set(fluchten)].join(', ') || 'ohne'}): Auslöser nach dem ersten Element`);
    }
    const ausloeser = info.ausloeser;
    const n = Math.min(anzahl, MAX_AUSLOESER);
    if (anzahl > MAX_AUSLOESER) info.befund.push(`nur ${MAX_AUSLOESER} von ${anzahl} Elementen ausgelöst`);
    const bildModus = ganzeAnsicht ? 'ansicht' : 'element';
    if (ausloeser === 'scroll') {
      for (let i = 0; i < n; i++) { await loc.nth(i).evaluate(mitteZeigen); await page.waitForTimeout(SCHRITT_MS); info.ausgeloest++; }
    } else if (ausloeser === 'wahl') {
      // je Radiowechsel eine Folge (Auslöser ist der Wechsel selbst, Aufnahme folgt unten je Folge)
      return await wahlFolgen(page, loc, info, { kennung, verzeichnis, bildModus });
    } else if (ausloeser === 'hover' || ausloeser === 'hover+fokus') {
      for (let i = 0; i < n; i++) { await loc.nth(i).hover({ timeout: 5000 }); await page.waitForTimeout(SCHRITT_MS); info.ausgeloest++; }
      await loc.first().hover({ timeout: 5000 }); // Zustand am ersten Element herstellen
      if (ausloeser === 'hover+fokus') await loc.first().focus({ timeout: 3000 }).catch(() => info.befund.push('Fokus nicht setzbar'));
    } else if (ausloeser === 'aktiv') {
      await loc.first().evaluate(mitteZeigen);
      const box = await loc.first().boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down(); // Zustand :active bleibt bis zum Loslassen (finally)
        loslassen = () => page.mouse.up();
        info.ausgeloest = 1;
      }
    } else if (ausloeser === 'klick') {
      const schalter = await loc.first().evaluate((el) => el.tagName === 'BUTTON' || el.hasAttribute('aria-expanded'));
      if (!schalter) { info.befund.push('kein Schalter (button oder aria-expanded): nicht geklickt'); return info; }
      await loc.first().click({ timeout: 5000 });
      info.ausgeloest = 1;
    }
    if (ausloeser === 'scroll') await loc.first().evaluate(mitteZeigen);
    await page.waitForTimeout(350);

    const st = await page.evaluate(ermittleKennung, kennung);
    info.animationen = st.animationen;
    info.laengste_dauer_ms = st.laengste_ms;
    if (st.animationen === 0) info.befund.push('keine Animation erfasst (Auslöser wirkungslos oder Element statisch): alle Bilder gleich');
    if (st.endlos) info.befund.push('endlose Animation: 0–100 % über eine Iteration');
    if (st.scroll > 0 && st.zeit > 0) info.befund.push('Zeit- und Scroll-Animationen gemischt: Zeitpunkte nur für die zeitbasierten');
    const scrollModus = st.scroll > 0 && st.zeit === 0;
    info.modus = scrollModus ? 'scroll' : 'zeit';
    if (ganzeAnsicht && scrollModus) info.befund.push('--ausschnitt ansicht ohne Wirkung im Scrollmodus: die Ansicht steht dort immer ganz');

    if (scrollModus) {
      const bereich = await page.evaluate(wirkbereich, kennung);
      info.wirkbereich = bereich.lage;
      info.wirkbereich_px = { start: Math.round(bereich.start), ende: Math.round(bereich.ende) };
      if (bereich.ende <= bereich.start) info.befund.push('Durchgang ohne Scrollweg: alle Bilder gleich');
      for (let k = 0; k < SCROLL_ANTEILE.length; k++) {
        const anteil = SCROLL_ANTEILE[k];
        const soll = Math.round(bereich.start + (bereich.ende - bereich.start) * anteil);
        await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), soll);
        await page.waitForTimeout(120);
        await page.evaluate(ZWEI_FRAMES);
        const ist = await page.evaluate(() => Math.round(window.scrollY));
        const datei = `${kennung}-${k}.jpg`;
        const art = await vollbild(page, path.join(verzeichnis, datei));
        info.bilder.push({ datei, scroll_y: ist, anteil, art });
      }
    } else {
      info.bilder.push(...(await zeitBilder(page, loc.first(), { st, verzeichnis, praefix: `${kennung}-`, bildModus })));
    }
    return info;
  } finally {
    if (loslassen) await loslassen().catch(() => {});
    await page.close().catch(() => {});
  }
}

/**
 * Anteil geänderter Pixel je Bildpaar (Graustufen, Helligkeitsunterschied über SCHWELLE_GRAU), im Seitenkontext über
 * Canvas gelesen (kein zusätzliches Paket). Paare: aufeinanderfolgende Bilder und 0 → letztes Bild.
 */
async function paarAnteile(context, dateien) {
  const urls = dateien.map((f) => `data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}`);
  const page = await context.newPage();
  try {
    return await page.evaluate(async ({ urls, schwelle }) => {
      const lade = (u) => new Promise((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = () => rej(new Error('Bild nicht lesbar'));
        i.src = u;
      });
      const felder = [];
      for (const u of urls) {
        const i = await lade(u);
        const c = document.createElement('canvas');
        c.width = i.naturalWidth;
        c.height = i.naturalHeight;
        const x = c.getContext('2d', { willReadFrequently: true });
        x.drawImage(i, 0, 0);
        const px = x.getImageData(0, 0, c.width, c.height).data;
        const y = new Uint8Array(c.width * c.height);
        for (let p = 0, q = 0; p < px.length; p += 4, q++) y[q] = 0.299 * px[p] + 0.587 * px[p + 1] + 0.114 * px[p + 2];
        felder.push({ w: c.width, h: c.height, y });
      }
      const anteil = (a, b) => {
        if (a.w !== b.w || a.h !== b.h) return null;
        let n = 0;
        for (let q = 0; q < a.y.length; q++) if (Math.abs(a.y[q] - b.y[q]) > schwelle) n++;
        return Math.round((n / a.y.length) * 10000) / 100;
      };
      const paare = [];
      for (let k = 0; k + 1 < felder.length; k++) paare.push(anteil(felder[k], felder[k + 1]));
      return {
        groesse: felder.length ? `${felder[0].w}x${felder[0].h}` : null,
        paare,
        ende: felder.length > 1 ? anteil(felder[0], felder[felder.length - 1]) : null,
      };
    }, { urls, schwelle: SCHWELLE_GRAU });
  } finally {
    await page.close().catch(() => {});
  }
}

/**
 * Im Seitenkontext, nur lesend: Stand der CSS-Animationen der Kennung. max = Zeit (ms, inkl. Verzögerung) der am weitesten
 * fortgeschrittenen Animation (gemeinsame Uhr der Lade-Animationen), fertig = alle beendet. Als Warteprädikat: tk = Zahl
 * (max ≥ tk), tk = null (alle beendet), tk = 0 (Animation existiert).
 */
function standLade({ kennung, tk, nurErfuellt = false }) {
  const els = [...document.querySelectorAll(`[data-motion="${kennung}"]`)];
  let n = 0;
  let max = null;
  let fertig = true;
  for (const a of document.getAnimations()) {
    if (!(a instanceof CSSAnimation)) continue;
    const t = a.effect && a.effect.target;
    if (!t || !els.some((el) => el === t || el.contains(t))) continue;
    n += 1;
    if (a.playState !== 'finished') fertig = false;
    if (a.currentTime != null) max = max === null ? a.currentTime : Math.max(max, a.currentTime);
  }
  const erfuellt = n > 0 && (tk === null ? fertig : (max !== null && max >= tk));
  if (nurErfuellt) return erfuellt;
  return { erfuellt, n, max: max === null ? null : Math.round(max), fertig };
}

/** Scrollt auf y und prüft, ob die Position gehalten wird (Layout kann beim frühen Anker noch unvollständig sein). */
async function scrollenAuf(page, y) {
  for (let v = 0; v < 5; v++) {
    await page.evaluate((t) => window.scrollTo({ top: t, behavior: 'instant' }), y);
    await page.evaluate(ZWEI_FRAMES);
    const ist = await page.evaluate(() => window.scrollY);
    if (Math.abs(ist - y) <= 1) return ist;
    await page.waitForTimeout(60);
  }
  return page.evaluate(() => window.scrollY);
}

/**
 * Ein Bild einer Lade-Folge: frische Seite im selben Kontext, CPU-Drosselung (CDP), Element im DOM (Anker dom: danach
 * soll ms warten, so wie im Maßstab; Anker animation: auf die Uhr der Animation warten, bis soll ms erreicht sind, weil
 * die Drosselung den DOM-Anker hinter die Animation legt, siehe Befund). Vor dem ersten Bild bei Bedarf scrollen.
 * Vor und nach der Aufnahme wird die Animationszeit gelesen: das Bild liegt zwischen beiden Werten.
 */
async function ladeBild(context, { base, seite, kennung, soll, scrollAuf, ausschnitt: mitAusschnitt, pfad, anker, cpu, zeitlupe, letztes }) {
  const page = await context.newPage();
  try {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
    // Anker animation: Wiedergabegeschwindigkeit vor dem Laden setzen, damit die Beobachtung den Beginn der Animation erreicht
    if (anker !== 'dom') {
      await cdp.send('Animation.enable');
      if (zeitlupe !== 1) await cdp.send('Animation.setPlaybackRate', { playbackRate: zeitlupe });
    }
    await page.goto(base + seite, { waitUntil: 'commit', timeout: 45000 });
    await page.waitForSelector(`[data-motion="${kennung}"]`, { state: 'attached', timeout: 45000 });
    const domAnker = Date.now();
    if (anker === 'dom') {
      await page.waitForFunction(() => document.readyState !== 'loading', null, { timeout: 45000 });
      if (scrollAuf != null) await scrollenAuf(page, scrollAuf);
      const rest = soll - (Date.now() - domAnker);
      if (rest > 0) await page.waitForTimeout(rest);
    } else {
      if (scrollAuf != null) await scrollenAuf(page, scrollAuf);
      await page.waitForFunction(standLade, { kennung, tk: 0, nurErfuellt: true }, { timeout: 30000, polling: 'raf' });
      await page.waitForFunction(standLade, { kennung, tk: letztes ? null : soll, nurErfuellt: true }, { timeout: 30000, polling: 'raf' });
      if (letztes) await page.waitForTimeout(LADE_PUFFER_MS);
    }
    await page.evaluate(ZWEI_FRAMES);
    const vorher = await page.evaluate(standLade, { kennung, tk: 0 });
    const lage = await page.evaluate(lageLade, kennung);
    let clip = null;
    if (mitAusschnitt && lage.gerendert) {
      clip = clipFuerAusschnitt({ oben: lage.oben - lage.sy, unten: lage.unten - lage.sy, vh: lage.vh, vw: lage.vw });
    }
    const msNachDom = Date.now() - domAnker;
    await page.screenshot({ path: pfad, type: 'jpeg', quality: 70, ...(clip ? { clip } : {}) });
    const nachher = await page.evaluate(standLade, { kennung, tk: 0 });
    return {
      art: clip ? 'ausschnitt' : 'ansicht',
      soll_ms: soll,
      ms_nach_dom: msNachDom,
      ist_ms: vorher.max,
      ist_nach_aufnahme_ms: nachher.max,
      animationen_laufen: vorher.n,
      scroll_y: lage.sy,
      oberkante_unter_kopf_px: lage.gerendert ? lage.oben - lage.sy - lage.kopf : null,
      ...(clip ? { ausschnitt_px: clip } : {}),
    };
  } finally {
    await page.close().catch(() => {});
  }
}

/**
 * Auslöser seite (Lade-Moment): Echtzeit-Folge (E4-NACH-18). Ein Vorlauf ohne Drosselung misst längste Dauer und Lage;
 * danach je Bild eine frische Seite im selben Kontext (Einwilligung abgelehnt, Bewegung an, ohne Pausen-Skript). Bei
 * Ausschnitt-Bedarf wird vor dem ersten Bild gescrollt (Lade-Momente laufen ab dem ersten Bild). Pixelanteile je Bildpaar.
 */
async function echtzeitLaden(browser, { base, seite, ansicht, kennung, verzeichnis, ganzeAnsicht = false, vorbereitung, protokoll, anzahl, anker = 'animation', cpu = LADE_CPU_RATE, zeitlupe = LADE_ZEITLUPE }) {
  const info = { kennung, elemente: anzahl, ausloeser: 'seite', ausgeloest: 0, modus: 'echtzeit', animationen: 0, laengste_dauer_ms: 0, bilder: [], befund: [] };
  const context = await kontext(browser, { base, ansicht, reducedMotion: 'no-preference', protokoll, init: [], vorbereitung });
  try {
    const vor = await context.newPage();
    let laufzeit;
    let lage;
    try {
      await vor.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await bereit(vor);
      laufzeit = await vor.evaluate(laufzeitLade, kennung);
      lage = await vor.evaluate(lageLade, kennung);
    } finally {
      await vor.close().catch(() => {});
    }
    info.animationen = laufzeit.animationen;
    info.laengste_dauer_ms = laufzeit.laengste_ms;
    info.vorlauf = {
      gerendert: lage.gerendert, kopf_px: lage.kopf, fuss_px: lage.fuss, oben_px: lage.oben, unten_px: lage.unten,
      scroll_max_px: lage.maxScroll, laengste_ms: laufzeit.laengste_ms,
    };
    info.cpu_drosselung = cpu;
    info.anker_modus = anker;
    info.zeitlupe = anker === 'dom' ? 1 : zeitlupe;
    info.puffer_ms = LADE_PUFFER_MS;
    info.anker = anker === 'dom'
      ? 'Element im DOM, danach readyState ungleich loading; soll ms warten (Maßstab)'
      : 'Beginn der CSS-Animation: auf die Animationszeit warten (soll ms); Ende: alle beendet + 150 ms Wartezeit';
    info.ms_nach_dom_bezug = 'Element im DOM (attached)';
    if (!lage.gerendert) {
      info.befund.push('kein gerendertes Element auf dieser Ansicht: keine Bilder');
      return info;
    }
    if (laufzeit.endlos) info.befund.push('endlose Animation: Zeitpunkte nur bis zur ersten Iteration');
    if (!laufzeit.animationen) info.befund.push('keine CSS-Animation (getComputedStyle): alle Bilder gleich');
    const zeiten = zeitpunkteLade(laufzeit.laengste_ms);
    info.zeitpunkte_ms = zeiten;
    const ziel = ganzeAnsicht
      ? { noetig: false, ziel: 0 }
      : scrollZiel({ oben: lage.oben, unten: lage.unten, sy: 0, kopf: lage.kopf, fuss: lage.fuss, maxScroll: lage.maxScroll });
    if (ganzeAnsicht && lage.unten > lage.fuss) info.befund.push(`--ausschnitt ansicht: Unterkante ${lage.unten} px liegt unter dem sichtbaren Bereich (${lage.fuss} px)`);
    info.scroll_ziel_px = ziel.noetig ? ziel.ziel : 0;
    for (let k = 0; k < zeiten.length; k++) {
      const datei = `${kennung}-${k}.jpg`;
      const bild = await ladeBild(context, {
        base, seite, kennung, soll: zeiten[k],
        scrollAuf: ziel.noetig ? ziel.ziel : null,
        ausschnitt: ziel.noetig,
        pfad: path.join(verzeichnis, datei),
        anker,
        cpu,
        zeitlupe: anker === 'dom' ? 1 : zeitlupe,
        letztes: k === zeiten.length - 1,
      });
      info.bilder.push({ datei, zeitpunkt: ZEITPUNKTE[k], ...bild });
    }
    info.ausgeloest = 1;
    if (ziel.noetig) {
      const ob = info.bilder[0] ? info.bilder[0].oberkante_unter_kopf_px : null;
      const grenze = ob !== null && ob < KOPF_ABSTAND - 1 ? ', Scroll-Grenze erreicht' : '';
      info.befund.push(`Element nicht vollständig sichtbar (Oberkante ${lage.oben} px, Unterkante ${lage.unten} px, sichtbar bis ${lage.fuss} px): vor dem ersten Bild auf ${ziel.ziel} px gescrollt, Oberkante ${ob} px unter dem Kopf (Ziel ${KOPF_ABSTAND} px${grenze})`);
      if (info.bilder.some((b) => b.ausschnitt_px && b.ausschnitt_px.height >= lage.vh)) info.befund.push('Ausschnitt über die ganze Ansichtshöhe (Element höher als die Ansicht)');
    }
    const pix = await paarAnteile(context, info.bilder.map((b) => path.join(verzeichnis, b.datei)));
    const sicht = sichtbareBilder(pix.paare.map((p) => (p == null ? 0 : p)));
    info.pixel = { groesse: pix.groesse, schwelle_grau: SCHWELLE_GRAU, paare: pix.paare, ende_0_4: pix.ende };
    info.bilder.forEach((b, k) => {
      b.anteil_zu_vorher_prozent = k > 0 ? pix.paare[k - 1] : null;
      b.anteil_zu_nachher_prozent = k < pix.paare.length ? pix.paare[k] : null;
    });
    info.sichtbare_bilder = sicht.anzahl;
    info.sichtbar_je_bild = sicht.je_bild;
    if (sicht.anzahl < LADE_MIN_SICHTBAR) {
      info.befund.push(`nur ${sicht.anzahl} von 5 Bildern unterscheiden sich sichtbar (Nachbar über ${SCHWELLE_ANTEIL} %, mindestens ${LADE_MIN_SICHTBAR} gefordert)`);
    }
    return info;
  } finally {
    await context.close().catch(() => {});
  }
}

async function einzelbilder({ browser, base, seite, ansicht, kennung, verzeichnis, vorbereitung, zeitpunkt, ganzeAnsicht = false, anker = 'animation', cpu = LADE_CPU_RATE, zeitlupe = LADE_ZEITLUPE }) {
  const protokoll = [];
  const erg = {
    modus: 'einzelbilder', seite, base, ansicht, zeitpunkt, dpr: ANSICHTEN_AUSBAU[ansicht].isMobile ? 2 : 1,
    reducedMotion: 'no-preference', einwilligung: 'abgelehnt', zeitpunkte_anteil: ZEITPUNKTE, kennungen: [], bilder_gesamt: 0,
  };
  if (ganzeAnsicht) erg.ausschnitt = 'ansicht';
  const context = await kontext(browser, { base, ansicht, reducedMotion: 'no-preference', protokoll, init: [pausierInit], vorbereitung });
  try {
    const pruef = await context.newPage();
    await pruef.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await bereit(pruef);
    const werte = await pruef.evaluate(() => [...document.querySelectorAll('[data-motion]')].map((el) => ({ k: el.getAttribute('data-motion'), flucht: el.getAttribute('data-flucht') || '' })));
    await pruef.close();
    erg.data_motion_elemente = werte.length;
    const anzahl = {};
    const erstesFlucht = {}; // data-flucht des ersten Elements je Kennung (sig-plan „laden“ = Lade-Moment)
    for (const { k, flucht } of werte) {
      anzahl[k] = (anzahl[k] || 0) + 1;
      if (!(k in erstesFlucht)) erstesFlucht[k] = flucht;
    }
    let kennungen = Object.keys(anzahl).sort();
    if (kennung) kennungen = kennungen.filter((k) => k === kennung);
    erg.meldung = !werte.length ? `Keine [data-motion]-Elemente auf ${seite}: keine Einzelbilder erzeugt.`
      : !kennungen.length ? `Kennung ${kennung} kommt auf ${seite} nicht vor.`
        : `${kennungen.length} Kennungen, ${werte.length} Elemente auf ${seite}.`;
    for (const k of kennungen) {
      if (!/^[a-z0-9-]+$/.test(k)) { erg.kennungen.push({ kennung: k, befund: ['unzulässige Zeichen in der Kennung: übersprungen'], bilder: [] }); continue; }
      try {
        const ladeMoment = k === 'sig-plan' ? erstesFlucht[k] === 'laden' : AUSLOESER[k] === 'seite';
        if (ladeMoment) erg.kennungen.push(await echtzeitLaden(browser, { base, seite, ansicht, kennung: k, verzeichnis, ganzeAnsicht, vorbereitung, protokoll, anzahl: anzahl[k], anker, cpu, zeitlupe }));
        else erg.kennungen.push(await aufnahme(context, { base, seite, kennung: k, anzahl: anzahl[k], verzeichnis, ganzeAnsicht }));
      } catch (e) {
        // Ein Fehler je Kennung bricht den Lauf nicht ab; er wird als Befund festgehalten
        erg.kennungen.push({ kennung: k, elemente: anzahl[k], befund: [`Fehler beim Auslösen: ${String(e.message).split('\n')[0].slice(0, 160)}`], bilder: [] });
      }
    }
    erg.bilder_gesamt = erg.kennungen.reduce((n, k) => n + k.bilder.length, 0);
    erg.gesperrt = zusammenfassung(protokoll);
    return erg;
  } finally {
    await context.close();
  }
}

/** Long Animation Frames (> 50 ms) im Seitenkontext erfassen. */
function loafInit() {
  window.__loaf = [];
  const unterstuetzt = !!(PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes('long-animation-frame'));
  window.__loafUnterstuetzt = unterstuetzt;
  if (!unterstuetzt) return;
  new PerformanceObserver((liste) => {
    for (const e of liste.getEntries()) if (e.duration > 50) window.__loaf.push(e.duration);
  }).observe({ type: 'long-animation-frame', buffered: false });
}

const zaehlerNeu = () => ({ praesentiert: 0, verworfen: 0, prPraesentiert: 0, prVerworfen: 0 });

/** Zählt Frame-Ereignisse im Stream, speichert den Rohtrace nicht. */
function zaehleEreignis(e, s) {
  if (e.name === 'Display::FrameDisplayed') s.praesentiert++;
  else if (e.name === 'DroppedFrame') s.verworfen++;
  else if (e.name === 'PipelineReporter' && e.ph === 'b') {
    const fr = e.args && (e.args.frame_reporter || e.args.chrome_frame_reporter);
    const st = fr ? fr.state : null;
    if (st === 'STATE_PRESENTED_ALL' || st === 'STATE_PRESENTED_PARTIAL') s.prPraesentiert++;
    else if (st === 'STATE_DROPPED') s.prVerworfen++;
  }
}

/** Anteil verworfener Bilder in Prozent (zwei Nachkommastellen), null ohne Bilder. */
const anteilProzent = (verworfen, gesamt) => (gesamt ? Math.round((verworfen / gesamt) * 10000) / 100 : null);

/** Kennzahlen einer Messung. Quelle: Frame-Ereignisse, sonst PipelineReporter (Zustände stehen am b-Ereignis). */
function kennzahlen(s, loaf) {
  const frame = s.praesentiert + s.verworfen > 0;
  const pipe = s.prPraesentiert + s.prVerworfen > 0;
  const quelle = frame ? 'Frame-Ereignisse: Display::FrameDisplayed, DroppedFrame'
    : pipe ? 'PipelineReporter: frame_reporter.state' : 'keine Frame-Ereignisse gefunden';
  const praesentiert = frame ? s.praesentiert : s.prPraesentiert;
  const verworfen = frame ? s.verworfen : s.prVerworfen;
  const gesamt = praesentiert + verworfen;
  return {
    bilder_gesamt: gesamt,
    verworfen,
    anteil_verworfen_prozent: anteilProzent(verworfen, gesamt),
    loaf_anzahl: loaf.length,
    loaf_summe_ms: Math.round(loaf.reduce((a, b) => a + b, 0)),
    quelle,
    zusatz: {
      frame_ereignisse: { praesentiert: s.praesentiert, verworfen: s.verworfen, anteil_prozent: anteilProzent(s.verworfen, s.praesentiert + s.verworfen) },
      pipeline_reporter: { praesentiert: s.prPraesentiert, verworfen: s.prVerworfen, anteil_prozent: anteilProzent(s.prVerworfen, s.prPraesentiert + s.prVerworfen) },
    },
  };
}

/** Scroll-Geste über die ganze Seite: oben→unten, dann zurück. Gesten-Art „default“ (touch scrollte in der Sondierung nicht). */
async function gesteHinUndZurueck(page, cdp) {
  const { hoehe, vw, vh } = await page.evaluate(() => ({
    hoehe: Math.max(0, document.documentElement.scrollHeight - window.innerHeight), vw: window.innerWidth, vh: window.innerHeight,
  }));
  const x = Math.round(vw / 2), y = Math.round(vh * 0.6);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await cdp.send('Input.synthesizeScrollGesture', { x, y, yDistance: -hoehe, speed: GESTE_PX_S, gestureSourceType: 'default', preventFling: true });
  const nachAbwaerts = await page.evaluate(() => Math.round(window.scrollY));
  await cdp.send('Input.synthesizeScrollGesture', { x, y, yDistance: hoehe, speed: GESTE_PX_S, gestureSourceType: 'default', preventFling: true });
  const nachAufwaerts = await page.evaluate(() => Math.round(window.scrollY));
  return { hoehe, nach_abwaerts: nachAbwaerts, nach_aufwaerts: nachAufwaerts };
}

function median(werte) {
  const v = werte.filter((x) => typeof x === 'number' && Number.isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return null;
  const m = v.length >> 1;
  return v.length % 2 ? v[m] : Math.round(((v[m - 1] + v[m]) / 2) * 100) / 100;
}

async function bildrate({ browser, base, seite, ansicht, wiederholungen, vorbereitung, zeitpunkt }) {
  const protokoll = [];
  const context = await kontext(browser, { base, ansicht: 'm390', reducedMotion: 'no-preference', protokoll, vorbereitung });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  let sammler = null;
  let fertig = null;
  // Ein Listener je Sitzung: Ereignisse werden während einer Messung gezählt, nicht gespeichert.
  cdp.on('Tracing.dataCollected', (p) => { if (sammler) for (const e of p.value) zaehleEreignis(e, sammler); });
  cdp.on('Tracing.tracingComplete', () => { if (fertig) fertig(); });
  try {
    await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await bereit(page);
    await page.waitForTimeout(1000);
    await page.evaluate(loafInit);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const laeufe = [];
    for (let n = 0; n < wiederholungen; n++) {
      await page.evaluate(() => { window.__loaf = []; });
      sammler = zaehlerNeu();
      const ende = new Promise((r) => { fertig = r; });
      const t0 = Date.now();
      await cdp.send('Tracing.start', { categories: KATEGORIEN, transferMode: 'ReportEvents' });
      const geste = await gesteHinUndZurueck(page, cdp);
      await cdp.send('Tracing.end');
      const vollstaendig = await Promise.race([ende.then(() => true), new Promise((r) => setTimeout(() => r(false), 60000))]);
      const loaf = await page.evaluate(() => window.__loaf.slice());
      laeufe.push({ ...kennzahlen(sammler, loaf), scroll: geste, trace_vollstaendig: vollstaendig, dauer_s: Math.round((Date.now() - t0) / 100) / 10 });
      sammler = null;
      fertig = null;
    }
    const m = (f) => median(laeufe.map(f));
    return {
      modus: 'bildrate', seite, base, ansicht: 'm390', zeitpunkt, dpr: 2, cpu_drosselung: 4,
      gesten: { befehl: 'Input.synthesizeScrollGesture', gestureSourceType: 'default', geschwindigkeit_px_s: GESTE_PX_S, folge: 'oben→unten, dann unten→oben' },
      wiederholungen,
      bilder_gesamt: m((l) => l.bilder_gesamt),
      verworfen: m((l) => l.verworfen),
      // Kopfwert = Median der Anteile je Lauf; die Anteile je Lauf stehen daneben (nicht die Feldmediane teilen)
      anteil_verworfen_prozent: m((l) => l.anteil_verworfen_prozent),
      anteile_je_lauf: laeufe.map((l) => l.anteil_verworfen_prozent),
      anteile_pipeline_je_lauf: laeufe.map((l) => l.zusatz.pipeline_reporter.anteil_prozent),
      loaf_anzahl: m((l) => l.loaf_anzahl),
      loaf_summe_ms: m((l) => l.loaf_summe_ms),
      hinweis: 'Median je Feld, nicht aus derselben Zeile (bilder_gesamt, verworfen, loaf_*). Kopfwert anteil_verworfen_prozent = Median der Anteile je Lauf (anteile_je_lauf).',
      quelle: [...new Set(laeufe.map((l) => l.quelle))].join(' | '),
      laeufe,
      gesperrt: zusammenfassung(protokoll),
      rohtrace: 'nicht gespeichert (nur Kennzahlen)',
    };
  } finally {
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 }).catch(() => {});
    await context.close();
  }
}

/** Ein Durchlauf: Ereignisse werden nur gezählt. Auslöser wird je Element hergestellt. */
async function interagieren(page) {
  const knoepfe = page.locator('a[href], button');
  const gesamt = await knoepfe.count();
  let hover = 0;
  let hoverFehler = 0;
  let ausserhalb = 0;
  let hoverBeispiel = null;
  const vp = page.viewportSize();
  for (let i = 0; i < gesamt && hover < 20; i++) {
    const el = knoepfe.nth(i);
    await el.evaluate(mitteZeigen).catch(() => {}); // Mitte des Ansichtsfensters, damit fixierte Kopfzeilen nicht überdecken
    // Wie lib.mjs (ueberlauf): Flächen bis 2 px gelten als visuell versteckt (sr-only)
    const f = await el.boundingBox().catch(() => null);
    if (!f || f.width <= 2 || f.height <= 2) continue;
    // Außerhalb des Ansichtsfensters (z. B. eingeklappte Navigation) lässt sich nicht hovern
    if (f.x + f.width < 0 || f.x > vp.width || f.y + f.height < 0 || f.y > vp.height) { ausserhalb++; continue; }
    hover++;
    try {
      await el.hover({ timeout: 1500 });
    } catch (e) {
      hoverFehler++;
      if (!hoverBeispiel) hoverBeispiel = String(e.message).split('\n')[0].slice(0, 160);
    }
    await page.waitForTimeout(300);
  }
  const fokusZiele = new Set();
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    const s = await page.evaluate(() => {
      const e = document.activeElement;
      if (!e || e === document.body) return '';
      const href = e.getAttribute('href');
      return `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${href ? ' ' + href.slice(0, 40) : ''}`;
    });
    if (s) fokusZiele.add(s);
  }
  return {
    hover_geprueft: hover, hover_fehler: hoverFehler, hover_fehler_beispiel: hoverBeispiel, hover_ausserhalb_uebersprungen: ausserhalb,
    tab_schritte: 30, fokus_verschieden: fokusZiele.size,
  };
}

async function register({ browser, base, seite, ansicht, vorbereitung, zeitpunkt }) {
  const reg = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'register.json'), 'utf8')).kennungen;
  const protokoll = [];
  const context = await kontext(browser, { base, ansicht, reducedMotion: 'no-preference', protokoll, init: [sammlerInit], vorbereitung });
  try {
    const page = await context.newPage();
    await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await bereit(page);
    await durchscrollen(page);
    await bereit(page);
    await page.evaluate(() => window.__bewSammler.start());
    const schritte = await interagieren(page);
    await page.evaluate(() => window.__bewSammler.stopp());
    const sammlung = await page.evaluate(() => window.__bewSammler.ergebnis());
    const dom = await page.evaluate(() => [...document.querySelectorAll('[data-motion]')].map((el) => el.getAttribute('data-motion')));
    const gefunden = [...new Set(dom)].sort();
    return {
      modus: 'register', seite, base, ansicht, zeitpunkt, schritte,
      data_motion_elemente: dom.length,
      gefundene_kennungen: gefunden,
      unbekannt: gefunden.filter((k) => !reg.includes(k)),
      registriert_nicht_im_dom: reg.filter((k) => !gefunden.includes(k)),
      ohne_register: sammlung.filter((d) => !d.dm).map(({ dm, ...rest }) => rest).sort((a, b) => b.anzahl - a.anzahl),
      mit_register_eintraege: sammlung.filter((d) => d.dm).length,
      erfasste_eintraege: sammlung.length,
      gesperrt: zusammenfassung(protokoll),
    };
  } finally {
    await context.close();
  }
}

/** Sichtbarkeit aller data-motion-Elemente nach der Wartezeit (Deckkraft über die Ahnenkette, visibility, Lage). */
function pruefeSichtbarkeit() {
  const dok = document.documentElement;
  const bw = dok.scrollWidth;
  const bh = dok.scrollHeight;
  const unsichtbar = [];
  const verdeckt = [];
  const els = [...document.querySelectorAll('[data-motion]')];
  for (const el of els) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    let deckkraft = 1;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) deckkraft *= parseFloat(getComputedStyle(n).opacity);
    const gruende = [];
    if (cs.display === 'none') gruende.push('display none');
    if (deckkraft <= 0.99) gruende.push(`Deckkraft ${deckkraft.toFixed(2)}`);
    if (cs.visibility !== 'visible') gruende.push(`visibility ${cs.visibility}`);
    if (cs.display !== 'none') {
      const fix = cs.position === 'fixed';
      const x = fix ? r.left : r.left + window.scrollX;
      const y = fix ? r.top : r.top + window.scrollY;
      if (x < -1 || x + r.width > bw + 1 || y < -1 || y + r.height > bh + 1) gruende.push('außerhalb des Dokuments');
    }
    if (!gruende.length) continue;
    const beleg = { kennung: el.getAttribute('data-motion'), sel: (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '')).slice(0, 80), gruende };
    if (el.closest('[hidden], details:not([open])')) verdeckt.push(beleg); else unsichtbar.push(beleg);
  }
  return {
    geprueft: els.length,
    unsichtbar,
    verdeckt_durch_zustand: verdeckt,
    klassen: { k_bewegung: dok.classList.contains('k-bewegung'), k_bereit: dok.classList.contains('k-bereit') },
  };
}

async function reduziert({ browser, base, seite, ansicht, vorbereitung, zeitpunkt }) {
  const protokoll = [];
  const context = await kontext(browser, { base, ansicht, reducedMotion: 'reduce', protokoll, init: [sammlerInit], vorbereitung });
  try {
    const page = await context.newPage();
    await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await bereit(page);
    await durchscrollen(page);
    await bereit(page);
    await page.evaluate(() => window.__bewSammler.start());
    const schritte = await interagieren(page);
    await page.evaluate(() => window.__bewSammler.stopp());
    await page.waitForTimeout(2500);
    const sammlung = await page.evaluate(() => window.__bewSammler.ergebnis());
    const bewegungsbefunde = sammlung
      .map((d) => ({ art: d.art, sel: d.sel, dm: d.dm, verboten: d.eigenschaften.filter((e) => VERBOTEN.includes(e.toLowerCase())), anzahl: d.anzahl }))
      .filter((d) => d.verboten.length > 0)
      .sort((a, b) => b.anzahl - a.anzahl);
    const pruef = await page.evaluate(pruefeSichtbarkeit);
    return {
      modus: 'reduziert', seite, base, ansicht, zeitpunkt, reducedMotion: 'reduce', schritte,
      bewegungsbefunde,
      unsichtbar: pruef.unsichtbar,
      geprueft: pruef.geprueft,
      verdeckt_durch_zustand: pruef.verdeckt_durch_zustand,
      klassen: pruef.klassen,
      erfasste_eintraege: sammlung.length,
      gesperrt: zusammenfassung(protokoll),
    };
  } finally {
    await context.close();
  }
}

/** Öffentliche Schnittstelle: führt einen Lauf aus und schreibt ergebnis.json. */
export async function laufe({ modus, seite = '/', base = BASE, ansicht = 'm390', kennung = null, ziel = null, wiederholungen = 3, vorbereitung = null, ausschnitt = null, anker = 'animation', cpu = LADE_CPU_RATE, zeitlupe = LADE_ZEITLUPE }) {
  if (!MODI.includes(modus)) throw new Error(`--modus fehlt oder ist unbekannt (${MODI.join('|')})`);
  assertLocal(base);
  if (!seite.startsWith('/')) throw new Error('--seite beginnt mit /');
  if (!ANSICHTEN_AUSBAU[ansicht]) throw new Error(`unbekannte Ansicht ${ansicht}`);
  if (modus === 'bildrate' && ansicht !== 'm390') throw new Error('bildrate läuft fest in Ansicht m390 (DPR 2)');
  if (kennung && !/^[a-z0-9-]+$/.test(kennung)) throw new Error('--kennung nur a–z, 0–9 und Bindestrich');
  if (ausschnitt && ausschnitt !== 'ansicht') throw new Error('--ausschnitt nur ansicht');
  if (!['animation', 'dom'].includes(anker)) throw new Error('--anker nur animation|dom');
  if (!(Number.isFinite(cpu) && cpu >= 1 && cpu <= 6)) throw new Error('--cpu zwischen 1 und 6');
  if (!(Number.isFinite(zeitlupe) && zeitlupe > 0 && zeitlupe <= 1)) throw new Error('--zeitlupe zwischen 0 und 1');
  const verzeichnis = ensureDir(ziel ? path.resolve(ziel) : path.join(RELAUNCH, 'cache', 'bewegung', modus, slug(seite)));
  const basis = { seite, base, ansicht, zeitpunkt: new Date().toISOString(), vorbereitung };
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
  let ergebnis;
  try {
    if (modus === 'einzelbilder') ergebnis = await einzelbilder({ browser, ...basis, kennung, verzeichnis, ganzeAnsicht: ausschnitt === 'ansicht', anker, cpu, zeitlupe });
    else if (modus === 'bildrate') ergebnis = await bildrate({ browser, ...basis, wiederholungen: Math.max(1, wiederholungen) });
    else if (modus === 'register') ergebnis = await register({ browser, ...basis });
    else ergebnis = await reduziert({ browser, ...basis });
  } finally {
    await browser.close();
  }
  if (kennung && modus !== 'einzelbilder') ergebnis.hinweis = '--kennung wirkt nur im Modus einzelbilder';
  ergebnis.verzeichnis = verzeichnis;
  const datei = path.join(verzeichnis, 'ergebnis.json');
  fs.writeFileSync(datei, JSON.stringify(ergebnis, null, 1));
  return { ergebnis, datei };
}

function kurzfassung(e, datei) {
  const basis = { modus: e.modus, seite: e.seite, ansicht: e.ansicht, ergebnis: datei };
  if (e.modus === 'einzelbilder') {
    return { ...basis, meldung: e.meldung, bilder_gesamt: e.bilder_gesamt,
      kennungen: e.kennungen.map((k) => `${k.kennung}: ${k.bilder.length} Bilder, Modus ${k.modus}, Dauer ${k.laengste_dauer_ms} ms${k.sichtbare_bilder != null ? `, sichtbar ${k.sichtbare_bilder}/5, Paare % ${k.pixel.paare.join(' / ')}` : ''}${k.befund.length ? ' · ' + k.befund.join('; ') : ''}`) };
  }
  if (e.modus === 'bildrate') {
    return { ...basis, wiederholungen: e.wiederholungen, bilder_gesamt: e.bilder_gesamt, verworfen: e.verworfen,
      anteil_verworfen_prozent: e.anteil_verworfen_prozent, anteile_je_lauf: e.anteile_je_lauf, anteile_pipeline_je_lauf: e.anteile_pipeline_je_lauf,
      loaf_anzahl: e.loaf_anzahl, loaf_summe_ms: e.loaf_summe_ms, hinweis: e.hinweis, quelle: e.quelle };
  }
  if (e.modus === 'register') {
    return { ...basis, gefundene_kennungen: e.gefundene_kennungen, unbekannt: e.unbekannt, ohne_register_anzahl: e.ohne_register.length,
      ohne_register_erste: e.ohne_register.slice(0, 8), schritte: e.schritte };
  }
  return { ...basis, bewegungsbefunde: e.bewegungsbefunde, unsichtbar: e.unsichtbar, geprueft: e.geprueft, schritte: e.schritte };
}

if (istAufruf) {
  const argv = process.argv.slice(2);
  try {
    const { ergebnis, datei } = await laufe({
      modus: arg(argv, 'modus', ''),
      seite: arg(argv, 'seite', '/'),
      base: arg(argv, 'base', BASE),
      ansicht: arg(argv, 'ansicht', 'm390'),
      kennung: arg(argv, 'kennung', null),
      ziel: arg(argv, 'ziel', null),
      wiederholungen: Number(arg(argv, 'wiederholungen', '3')),
      ausschnitt: arg(argv, 'ausschnitt', null),
      anker: arg(argv, 'anker', 'animation'),
      cpu: Number(arg(argv, 'cpu', String(LADE_CPU_RATE))),
      zeitlupe: Number(arg(argv, 'zeitlupe', String(LADE_ZEITLUPE))),
    });
    console.log(JSON.stringify(kurzfassung(ergebnis, datei), null, 1));
  } catch (e) {
    console.error(`ABBRUCH: ${e.message}`);
    process.exit(1);
  }
}
