// Prüfwerkzeug Bewegung (E0-PRUEF-02b). Vier Modi; je Lauf ergebnis.json plus Zusammenfassung auf stdout:
//   einzelbilder  je Bewegungskennung fünf Bilder bei 0/25/50/75/100 % der längsten Dauer (Zeitmodus; Auslöser wahl:
//                 je Folge fünf Bilder), bei scroll-gebundenen Animationen fünf Bilder der ganzen Ansicht bei
//                 10/30/50/70/90 % des Durchgangs des Elements (Eintritt bis Austritt)
//   bildrate      präsentierte und verworfene Bilder sowie Long Animation Frames bei 4× CPU-Drosselung,
//                 Scroll-Geste oben→unten→oben, Kennzahlen je Wiederholung, Median der Anteile je Lauf als Kopfwert
//   register      data-motion im DOM gegen _werkstatt/register.json, Animationen ohne data-motion
//   reduziert     Animationen bei prefers-reduced-motion: reduce und Sichtbarkeit der data-motion-Elemente
// Nutzung:
//   node bewegung.mjs --modus einzelbilder|bildrate|register|reduziert --seite /pfad [--base URL]
//     [--ansicht m390] [--kennung NAME] [--ziel DIR] [--wiederholungen 3] [--ausschnitt ansicht]
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
const MIN_HOEHE_SEITE = 400;                         // Auslöser seite unterhalb des ersten Bildschirms: Ausschnitt mindestens so hoch
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
 * Bildausschnitt. modus: 'ansicht' = ganzer Viewport bei Scrollposition 0 (Lade-Momente im ersten Bildschirm);
 * 'hoch' = Ausschnitt über die volle Breite um das Element, mindestens MIN_HOEHE_SEITE hoch (Auslöser seite unterhalb
 * des ersten Bildschirms; das Element ist davor mittig gezeigt, damit ein schmales Lot nicht als Streifen endet);
 * 'element' = Element mit 24 px Rand, im Viewport. Liegt das Element nicht im Viewport, wird die Ansicht aufgenommen.
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
  if (box && modus === 'hoch') {
    const h = Math.floor(Math.min(vp.height, Math.max(MIN_HOEHE_SEITE, box.height + 48)));
    const y0 = Math.floor(Math.min(Math.max(0, box.y + box.height / 2 - h / 2), vp.height - h));
    clip = { x: 0, y: y0, width: vp.width, height: h };
    art = 'ausschnitt';
  } else if (box) {
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
    // sig-plan: mit data-flucht="laden" (Planblatt, E4-NACH-02) löst das Laden der Seite aus, sonst Hover/Fokus
    if (kennung === 'sig-plan') {
      const fluchten = await loc.evaluateAll((els) => els.map((e) => e.getAttribute('data-flucht') || ''));
      if (fluchten[0] === 'laden') { info.ausloeser = 'seite'; info.befund.push('data-flucht="laden": Auslöser seite (Ladeanimation)'); }
      if (new Set(fluchten).size > 1) info.befund.push(`data-flucht gemischt (${[...new Set(fluchten)].join(', ') || 'ohne'}): Auslöser nach dem ersten Element`);
    }
    const ausloeser = info.ausloeser;
    const n = Math.min(anzahl, MAX_AUSLOESER);
    if (anzahl > MAX_AUSLOESER) info.befund.push(`nur ${MAX_AUSLOESER} von ${anzahl} Elementen ausgelöst`);
    // Bildausschnitt: Auslöser seite = ganze Ansicht bei Scrollposition 0; unterhalb des ersten Bildschirms ein Ausschnitt um das Element
    let bildModus = ganzeAnsicht ? 'ansicht' : 'element';
    if (ausloeser === 'seite') {
      const lage = await loc.first().evaluate((el) => ({ oben: el.getBoundingClientRect().top + window.scrollY, vh: window.innerHeight }));
      if (lage.oben >= lage.vh) {
        bildModus = 'hoch';
        await loc.first().evaluate(mitteZeigen);
        info.befund.push(`Element unterhalb des ersten Bildschirms (oben ${Math.round(lage.oben)} px): Ausschnitt um das Element`);
      } else {
        bildModus = 'ansicht';
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      }
    }
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

async function einzelbilder({ browser, base, seite, ansicht, kennung, verzeichnis, vorbereitung, zeitpunkt, ganzeAnsicht = false }) {
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
    const werte = await pruef.evaluate(() => [...document.querySelectorAll('[data-motion]')].map((el) => el.getAttribute('data-motion')));
    await pruef.close();
    erg.data_motion_elemente = werte.length;
    const anzahl = {};
    for (const w of werte) anzahl[w] = (anzahl[w] || 0) + 1;
    let kennungen = Object.keys(anzahl).sort();
    if (kennung) kennungen = kennungen.filter((k) => k === kennung);
    erg.meldung = !werte.length ? `Keine [data-motion]-Elemente auf ${seite}: keine Einzelbilder erzeugt.`
      : !kennungen.length ? `Kennung ${kennung} kommt auf ${seite} nicht vor.`
        : `${kennungen.length} Kennungen, ${werte.length} Elemente auf ${seite}.`;
    for (const k of kennungen) {
      if (!/^[a-z0-9-]+$/.test(k)) { erg.kennungen.push({ kennung: k, befund: ['unzulässige Zeichen in der Kennung: übersprungen'], bilder: [] }); continue; }
      try {
        erg.kennungen.push(await aufnahme(context, { base, seite, kennung: k, anzahl: anzahl[k], verzeichnis, ganzeAnsicht }));
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
export async function laufe({ modus, seite = '/', base = BASE, ansicht = 'm390', kennung = null, ziel = null, wiederholungen = 3, vorbereitung = null, ausschnitt = null }) {
  if (!MODI.includes(modus)) throw new Error(`--modus fehlt oder ist unbekannt (${MODI.join('|')})`);
  assertLocal(base);
  if (!seite.startsWith('/')) throw new Error('--seite beginnt mit /');
  if (!ANSICHTEN_AUSBAU[ansicht]) throw new Error(`unbekannte Ansicht ${ansicht}`);
  if (modus === 'bildrate' && ansicht !== 'm390') throw new Error('bildrate läuft fest in Ansicht m390 (DPR 2)');
  if (kennung && !/^[a-z0-9-]+$/.test(kennung)) throw new Error('--kennung nur a–z, 0–9 und Bindestrich');
  if (ausschnitt && ausschnitt !== 'ansicht') throw new Error('--ausschnitt nur ansicht');
  const verzeichnis = ensureDir(ziel ? path.resolve(ziel) : path.join(RELAUNCH, 'cache', 'bewegung', modus, slug(seite)));
  const basis = { seite, base, ansicht, zeitpunkt: new Date().toISOString(), vorbereitung };
  const browser = await chromium.launch();
  let ergebnis;
  try {
    if (modus === 'einzelbilder') ergebnis = await einzelbilder({ browser, ...basis, kennung, verzeichnis, ganzeAnsicht: ausschnitt === 'ansicht' });
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
      kennungen: e.kennungen.map((k) => `${k.kennung}: ${k.bilder.length} Bilder, Modus ${k.modus}, Dauer ${k.laengste_dauer_ms} ms${k.befund.length ? ' · ' + k.befund.join('; ') : ''}`) };
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
    });
    console.log(JSON.stringify(kurzfassung(ergebnis, datei), null, 1));
  } catch (e) {
    console.error(`ABBRUCH: ${e.message}`);
    process.exit(1);
  }
}
