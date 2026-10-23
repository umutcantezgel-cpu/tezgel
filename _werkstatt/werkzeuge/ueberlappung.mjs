// Prüfstufe A · Überlappung: sichtbarer Text, der von fixierten oder klebenden Elementen, von Leitachsen
// oder von anderem Text verdeckt oder gekreuzt wird. Die Seite wird in Bildschirmhöhen-Schritten selbst
// durchscrollt; am Ende steht die Scrollposition wieder auf 0.
// Exportiert ueberlappung(page) (von einzelbild.mjs und bildsatz.mjs genutzt) und ist per CLI nutzbar:
//   node ueberlappung.mjs --base http://127.0.0.1:4320 --seite /kontakt --ansicht m390 [--einwilligung abgelehnt|erstbesuch|alle]
// Ausgabe von ueberlappung(page): höchstens 50 Befunde {art, text (60 Zeichen), selektor, rechteck {x, y, w, h}
// in Seitenkoordinaten, durch}. ueberlappungMitZahl(page) liefert zusätzlich gesamt und nachArt (ungekürzt).
//   art: fixed | sticky (Überdeckung durch fixiertes/klebendes Element), leitachse (Kreuzung mit
//        [data-leitachse] oder [data-motion="leitachse"]), textkreuzung (zwei Textrechtecke aus verschiedenen,
//        nicht verschachtelten Elementen).
//   durch: das überdeckende oder gekreuzte Element bzw. der zweite Text (Zusatz zum Briefing-Format).
// Toleranz: 1 px bei Überdeckung und Textkreuzung, bei Leitachsen jede Überschneidung.
// Ausgenommen: Text unter display:none, opacity:0 oder visibility:hidden, Inhalt geschlossener <details> (außer summary); sr-only-Text (Elementbox ≤ 2 px oder
// clip-Zuschnitt); Textteile außerhalb eines Behälters mit overflow (z. B. Liste mit eigenem Scroll); eigene
// Vorfahren bzw. Nachfahren der Gegenseite. Die Gesamtzahl je Bildschirmausschnitt ist durch eine Sicherheitsgrenze (5000) begrenzt.
// Feste Ebene (KERN K-009: fester Kopf und untere Leiste, Kennzeichen data-feste-ebene selbst oder über einen Vorfahren):
// ist kein Verdecker für (a); Text darin zählt nicht bei (c). Auch Text in position fixed/sticky zählt nicht bei (c).
// Auslegung: ein fixiertes oder klebendes Element innerhalb einer Ebene mit data-feste-ebene gehört zur Ebene (kein Verdecker).
// Voraussetzung: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers (wie bei den übrigen Werkzeugen).
import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE, assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, bereit, versteckeDevOverlay } from './lib.mjs';

const GRENZE = 50;

/**
 * Im Seitenkontext: prüft den aktuellen Bildschirmausschnitt.
 * Läuft per page.evaluate – deshalb ohne Bezug auf Namen aus dieser Datei.
 */
function ausschnittPruefen() {
  const SICHERHEITSGRENZE = 5000; // Schutz gegen Ausreißer je Ausschnitt; die Ausgabe (höchstens 50) entsteht in Node
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const sy = window.scrollY;
  const kurz = (t) => t.replace(/\s+/g, ' ').trim().slice(0, 60);
  // Kurzer CSS-Pfad für den Bericht (bis zu vier Ebenen, ohne body)
  const sel = (el) => {
    const teile = [];
    for (let e = el; e && e.nodeType === 1 && e !== document.body && teile.length < 4; e = e.parentElement) {
      const tag = e.tagName.toLowerCase();
      if (e.id) { teile.unshift(`${tag}#${e.id}`); break; }
      const klassen = (typeof e.className === 'string' ? e.className : '').trim().split(/\s+/).filter(Boolean);
      teile.unshift(klassen.length ? `${tag}.${klassen.slice(0, 2).join('.')}` : tag);
    }
    return teile.join(' > ').slice(0, 160);
  };
  // Deckkraft 0 oder display:none auf dem Element oder einem Vorfahren (Deckkraft wirkt multiplikativ)
  const memo = new Map();
  const ausgeblendet = (el) => {
    if (!el || el.nodeType !== 1) return false;
    if (memo.has(el)) return memo.get(el);
    const cs = getComputedStyle(el);
    // Inhalt eines geschlossenen <details> (außer seinem <summary>) zeichnet der Browser nicht (content-visibility: hidden)
    const zu = el.tagName === 'DETAILS' ? false : el.parentElement?.tagName === 'DETAILS' && !el.parentElement.open && el.tagName !== 'SUMMARY';
    const ergebnis = cs.display === 'none' || cs.opacity === '0' || zu || ausgeblendet(el.parentElement);
    memo.set(el, ergebnis);
    return ergebnis;
  };
  // Sichtbarkeit wird vererbt; der berechnete Wert am Element selbst genügt
  const verborgen = (el) => {
    const cs = getComputedStyle(el);
    return cs.visibility === 'hidden' || cs.visibility === 'collapse';
  };
  // Visuell versteckt (sr-only): Elementbox höchstens 2 px quadratisch, oder Zuschnitt per clip / clip-path.
  // Die Textrechtecke der Range bleiben bei sr-only-Text voll groß, deshalb wird das Element selbst geprüft.
  const versteckt = (el) => {
    const eb = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return (eb.width <= 2 && eb.height <= 2) || cs.clip.startsWith('rect(0') || cs.clipPath.startsWith('inset(50%');
  };
  // Überlaufbehälter (overflow außer visible, z. B. Listen mit eigenem Scroll): Text außerhalb des Behälters ist nicht sichtbar.
  const kastenMemo = new Map();
  const kasten = (p) => {
    if (kastenMemo.has(p)) return kastenMemo.get(p);
    const cs = getComputedStyle(p);
    // body: sein overflow wird an den Viewport weitergegeben und beschneidet nicht; display:contents hat keine Box
    const beschneidend = p !== document.body && cs.display !== 'contents' && (cs.overflowX !== 'visible' || cs.overflowY !== 'visible');
    const k = beschneidend ? p.getBoundingClientRect() : null;
    kastenMemo.set(p, k);
    return k;
  };
  // Sichtbarer Teil eines Textrechtecks innerhalb aller Überlaufbehälter; null, wenn nichts übrig bleibt
  const beschnitten = (el, r) => {
    let l = r.left, t = r.top, rr = r.right, bb = r.bottom;
    for (let p = el; p && p.nodeType === 1 && p !== document.documentElement; p = p.parentElement) {
      const k = kasten(p);
      if (!k) continue;
      l = Math.max(l, k.left); t = Math.max(t, k.top); rr = Math.min(rr, k.right); bb = Math.min(bb, k.bottom);
      if (rr - l <= 1 || bb - t <= 1) return null;
    }
    return { left: l, top: t, right: rr, bottom: bb };
  };
  // Fixiert: das Element selbst oder ein Vorfahr hat position: fixed (Lage in Ansichtskoordinaten)
  const memoFix = new Map();
  const inFixiert = (el) => {
    if (!el || el.nodeType !== 1) return false;
    if (memoFix.has(el)) return memoFix.get(el);
    const ergebnis = getComputedStyle(el).position === 'fixed' || inFixiert(el.parentElement);
    memoFix.set(el, ergebnis);
    return ergebnis;
  };
  // Feste Ebene nach KERN K-009: data-feste-ebene am Element oder an einem Vorfahren
  const memoDatenEbene = new Map();
  const inDatenEbene = (el) => {
    if (!el || el.nodeType !== 1) return false;
    if (memoDatenEbene.has(el)) return memoDatenEbene.get(el);
    const ergebnis = el.hasAttribute('data-feste-ebene') || inDatenEbene(el.parentElement);
    memoDatenEbene.set(el, ergebnis);
    return ergebnis;
  };
  // Text in einer festen Ebene: data-feste-ebene oder position fixed/sticky, am Element oder an einem Vorfahren
  const memoFesterText = new Map();
  const inFesterEbene = (el) => {
    if (!el || el.nodeType !== 1) return false;
    if (memoFesterText.has(el)) return memoFesterText.get(el);
    const pos = getComputedStyle(el).position;
    const ergebnis = inDatenEbene(el) || pos === 'fixed' || pos === 'sticky' || inFesterEbene(el.parentElement);
    memoFesterText.set(el, ergebnis);
    return ergebnis;
  };
  const imSichtfeld = (r) => r.right > 0 && r.bottom > 0 && r.left < vw && r.top < vh;
  const beschneide = (r) => ({ l: Math.max(r.left, 0), t: Math.max(r.top, 0), r: Math.min(r.right, vw), b: Math.min(r.bottom, vh) });
  const schnitt = (a, b) => ({ l: Math.max(a.l, b.l), t: Math.max(a.t, b.t), r: Math.min(a.r, b.r), b: Math.min(a.b, b.b) });
  const ueberlappt = (a, b, tol) => { const s = schnitt(a, b); return s.r - s.l > tol && s.b - s.t > tol; };

  // 1) Sichtbare Textrechtecke im Ausschnitt (je Zeile ein Rechteck)
  const texte = [];
  const wanderer = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let knoten = wanderer.nextNode(); knoten; knoten = wanderer.nextNode()) {
    const el = knoten.parentElement;
    if (!el || !knoten.nodeValue.trim() || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) continue;
    if (ausgeblendet(el) || verborgen(el) || versteckt(el)) continue;
    const bereich = document.createRange();
    bereich.selectNodeContents(knoten);
    const fix = inFixiert(el);
    const feste = inFesterEbene(el);
    for (const r0 of bereich.getClientRects()) {
      const sichtbar = beschnitten(el, r0);
      if (!sichtbar || !imSichtfeld(sichtbar)) continue;
      const c = beschneide(sichtbar);
      if (c.r - c.l <= 2 || c.b - c.t <= 2) continue; // Rest eines Textes am Bildschirmrand oder sr-only
      // Lage ohne Ausschnitt und ohne Überlaufzuschnitt, damit dieselbe Zeile in verschiedenen Schritten gleich aussieht
      const d = fix ? { l: r0.left, t: r0.top, r: r0.right, b: r0.bottom } : { l: r0.left, t: r0.top + sy, r: r0.right, b: r0.bottom + sy };
      texte.push({ el, text: kurz(knoten.nodeValue), r: c, d, feste, fix });
    }
  }

  // Stapelhöhe: z-index des nächsten positionierten Vorfahren mit gesetztem z-index (sonst 0). Damit gilt ein klebendes
  // Element im Seitenfluss nicht als Verdecker von Text in einer höher gestapelten festen Ebene (Kopf z-40 über einer
  // klebenden Rückfrage) – sichtbar liegt dort der Kopf oben (E4-Rückgaben: Rückfrage am Abschnittsende „unter“ dem Kopf).
  const stapel = (el) => {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.position !== 'static' && cs.zIndex !== 'auto') return Number(cs.zIndex) || 0;
    }
    return 0;
  };

  // 2) Fixierte und klebende Elemente im Sichtfeld
  const fest = [];
  for (const e of document.body.querySelectorAll('*')) {
    const pos = getComputedStyle(e).position;
    if (pos !== 'fixed' && pos !== 'sticky') continue;
    if (inDatenEbene(e)) continue; // Kopf und untere Leiste (KERN K-009) dürfen beim Scrollen Inhalt überdecken
    if (ausgeblendet(e) || verborgen(e)) continue;
    const r = e.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0 || !imSichtfeld(r)) continue;
    fest.push({ el: e, art: pos, r: beschneide(r) });
  }

  // 3) Leitachsen im Sichtfeld
  const achsen = [];
  for (const e of document.querySelectorAll('[data-leitachse], [data-motion="leitachse"]')) {
    if (ausgeblendet(e) || verborgen(e)) continue;
    const r = e.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0 || !imSichtfeld(r)) continue;
    achsen.push({ el: e, r: beschneide(r) });
  }

  // Befunde sammeln: zuerst (a) und (b) je Textrechteck, dann (c) Textkreuzungen
  const roh = [];
  const voll = () => roh.length >= SICHERHEITSGRENZE;
  for (const t of texte) {
    for (const f of fest) {
      if (voll()) break;
      if (f.el.contains(t.el) || !ueberlappt(t.r, f.r, 1)) continue;
      if (f.art === 'sticky' && t.fix && stapel(t.el) > stapel(f.el)) continue; // Text der festen Ebene liegt darüber
      roh.push({ art: f.art, t, durch: f.el, s: schnitt(t.r, f.r) });
    }
    for (const a of achsen) {
      if (voll()) break;
      if (a.el.contains(t.el) || !ueberlappt(t.r, a.r, 0)) continue;
      roh.push({ art: 'leitachse', t, durch: a.el, s: schnitt(t.r, a.r) });
    }
  }
  for (let i = 0; i < texte.length && !voll(); i++) {
    for (let j = i + 1; j < texte.length && !voll(); j++) {
      const a = texte[i];
      const b = texte[j];
      if (a.feste || b.feste || a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el) || !ueberlappt(a.r, b.r, 1)) continue;
      roh.push({ art: 'textkreuzung', t: a, durch: b.el, b, s: schnitt(a.r, b.r) });
    }
  }

  const ganz = (d) => [Math.round(d.l), Math.round(d.t), Math.round(d.r), Math.round(d.b)].join(',');
  return roh.map((b) => ({
    art: b.art,
    text: b.t.text,
    selektor: sel(b.t.el),
    rechteck: { x: Math.round(b.s.l), y: Math.round(b.s.t + sy), w: Math.round(b.s.r - b.s.l), h: Math.round(b.s.b - b.s.t) },
    durch: sel(b.durch),
    // Schlüssel zum Zusammenführen über Bildschirmschritte (entfernt die Seite vor der Rückgabe)
    _k: [b.art, sel(b.t.el), b.t.text, ganz(b.t.d), sel(b.durch), b.b ? `${b.b.text}|${ganz(b.b.d)}` : ''].join('|'),
  }));
}

/** Scrollt ohne Animation auf y und wartet zwei Bildschirmaktualisierungen ab. */
async function scrolleNach(page, y) {
  await page.evaluate((ziel) => window.scrollTo({ top: ziel, behavior: 'instant' }), y);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null)))));
}

/**
 * Prüft die ganze Seite in Bildschirmhöhen-Schritten, ohne vorzeitigen Abbruch. Liefert die Gesamtzahl,
 * die Anzahl je Art und höchstens 50 Befunde (nach Lage sortiert). Setzt die Scrollposition am Ende auf 0 zurück.
 */
export async function ueberlappungMitZahl(page) {
  const { vh, hoehe } = await page.evaluate(() => ({ vh: window.innerHeight, hoehe: document.documentElement.scrollHeight }));
  const alle = new Map();
  const schritte = Math.max(1, Math.ceil(hoehe / vh));
  for (let k = 0; k < schritte; k++) {
    await scrolleNach(page, k * vh);
    for (const { _k, ...b } of await page.evaluate(ausschnittPruefen)) {
      if (!alle.has(_k)) alle.set(_k, b);
    }
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  const befunde = [...alle.values()].sort((p, q) => p.rechteck.y - q.rechteck.y || p.rechteck.x - q.rechteck.x);
  const nachArt = {};
  for (const b of befunde) nachArt[b.art] = (nachArt[b.art] || 0) + 1;
  return { gesamt: befunde.length, nachArt, befunde: befunde.slice(0, GRENZE) };
}

/** Wie ueberlappungMitZahl, liefert aber nur die Befunde (höchstens 50). */
export async function ueberlappung(page) {
  return (await ueberlappungMitZahl(page)).befunde;
}

async function cli() {
  const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
  const base = arg('base', BASE);
  assertLocal(base);
  const seite = arg('seite', '/');
  if (!seite.startsWith('/')) { console.error('--seite muss mit / beginnen'); process.exit(2); }
  const ansicht = arg('ansicht', 'd1440');
  const v = ANSICHTEN[ansicht];
  if (!v) { console.error(`unbekannte Ansicht: ${ansicht}`); process.exit(2); }
  const browser = await chromium.launch({ args: ['--font-render-hinting=none'], executablePath: process.env.CHROME_PATH || undefined });
  try {
    const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
    await installSperre(context);
    await setzeEinwilligung(context, arg('einwilligung', 'abgelehnt'), base);
    const page = await context.newPage();
    const resp = await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await bereit(page);
    await versteckeDevOverlay(page);
    const zahl = await ueberlappungMitZahl(page);
    console.log(JSON.stringify({ seite, ansicht, status: resp?.status() ?? null, gesamt: zahl.gesamt, nachArt: zahl.nachArt, befunde: zahl.befunde }, null, 1));
    await context.close();
  } finally {
    await browser.close();
  }
}

const istCli = Boolean(process.argv[1]) && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (istCli) await cli();
