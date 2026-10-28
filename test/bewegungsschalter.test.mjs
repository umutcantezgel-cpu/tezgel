// Bewegungsschalter (UM-E3-MOD, E-080): Entscheidung, Kopfskript, Wahl zur Laufzeit und CSS-Spiegel der ruhigen Fassung.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { KOPFSKRIPT } from '../src/lib/motion/kopfskript.ts';
import { BEWEGUNG_ATTRIBUT, BEWEGUNG_SPEICHER, BEWEGUNG_WECHSEL, ruhigNach } from '../src/lib/motion/schalter.ts';
import { waehleBewegung } from '../src/lib/motion/bewegung.ts';
import { SPEICHER_INTRO } from '../src/lib/intro/ablauf.ts';

function speicher(eintraege = {}, { wirft = false } = {}) {
  const daten = new Map(Object.entries(eintraege));
  return {
    daten,
    getItem: (k) => {
      if (wirft) throw new Error('gesperrt');
      return daten.has(k) ? daten.get(k) : null;
    },
    setItem: (k, v) => {
      if (wirft) throw new Error('gesperrt');
      daten.set(k, String(v));
    },
  };
}

function html() {
  const klassen = new Set();
  const attribute = new Map();
  return {
    klassen,
    attribute,
    classList: {
      add: (...c) => c.forEach((x) => klassen.add(x)),
      remove: (...c) => c.forEach((x) => klassen.delete(x)),
      contains: (c) => klassen.has(c),
    },
    setAttribute: (n, v) => attribute.set(n, String(v)),
    getAttribute: (n) => (attribute.has(n) ? attribute.get(n) : null),
    removeAttribute: (n) => attribute.delete(n),
  };
}

function fenster({ reduziert = false, ablage = speicher() } = {}) {
  const ereignisse = [];
  return {
    ereignisse,
    localStorage: ablage,
    matchMedia: (q) => ({
      matches: q.includes('no-preference') ? !reduziert : q.includes('reduce') ? reduziert : false,
      addEventListener() {},
      removeEventListener() {},
    }),
    dispatchEvent: (e) => ereignisse.push(e.type),
    addEventListener() {},
    removeEventListener() {},
  };
}

test('Schalter 1: das Gerät geht vor, sonst gilt die Wahl; unbekannte Einträge zählen nicht', () => {
  assert.equal(ruhigNach(null, false), false);
  assert.equal(ruhigNach('an', false), false);
  assert.equal(ruhigNach('ruhig', false), true);
  assert.equal(ruhigNach(null, true), true);
  assert.equal(ruhigNach('an', true), true, 'reduzierte Bewegung des Geräts geht vor (E-080)');
  assert.equal(ruhigNach('irgendwas', false), false);
});

test('Schalter 2: Kopfskript – „ruhig“ setzt data-bewegung und keine Startklasse, ohne Notaus-Zeitgeber', () => {
  const lauf = (eintraege, { reduziert = false, wirft = false } = {}) => {
    const wurzel = html();
    let zeitgeber = null;
    const win = fenster({ reduziert, ablage: speicher({ [SPEICHER_INTRO]: '1', ...eintraege }, { wirft }) });
    new Function('window', 'document', 'setTimeout', 'Image', 'location', KOPFSKRIPT)(
      win,
      { documentElement: wurzel },
      (fn, ms) => {
        zeitgeber = { fn, ms };
      },
      function Bild() {},
      { pathname: '/' },
    );
    return { wurzel, zeitgeber };
  };
  let r = lauf({ [BEWEGUNG_SPEICHER]: 'ruhig' });
  assert.equal(r.wurzel.getAttribute(BEWEGUNG_ATTRIBUT), 'ruhig');
  assert.equal(r.wurzel.klassen.has('k-bewegung'), false);
  assert.equal(r.zeitgeber, null, 'kein Notaus nötig');
  r = lauf({ [BEWEGUNG_SPEICHER]: 'an' });
  assert.equal(r.wurzel.getAttribute(BEWEGUNG_ATTRIBUT), null);
  assert.equal(r.wurzel.klassen.has('k-bewegung'), true);
  assert.equal(r.zeitgeber.ms, 2000);
  r = lauf({ [BEWEGUNG_SPEICHER]: 'an' }, { reduziert: true });
  assert.equal(r.wurzel.klassen.has('k-bewegung'), false, '„an“ hebt reduzierte Bewegung nicht auf');
  r = lauf({}, { wirft: true });
  assert.equal(r.wurzel.getAttribute(BEWEGUNG_ATTRIBUT), null, 'ohne Speicher gilt das Gerät');
  assert.equal(r.wurzel.klassen.has('k-bewegung'), true);
});

test('Schalter 3: Wahl zur Laufzeit – „ruhig“ nimmt die Startklassen weg, „an“ setzt sie nur ohne reduzierte Bewegung', () => {
  const vorher = { window: globalThis.window, document: globalThis.document };
  try {
    const wurzel = html();
    const win = fenster();
    globalThis.window = win;
    globalThis.document = { documentElement: wurzel, querySelectorAll: () => [] };
    wurzel.classList.add('k-bewegung', 'k-modul', 'k-startbild', 'k-intro', 'k-intro-sig', 'k-intro-start');

    waehleBewegung('ruhig');
    assert.equal(wurzel.getAttribute(BEWEGUNG_ATTRIBUT), 'ruhig');
    for (const k of ['k-bewegung', 'k-startbild', 'k-intro', 'k-intro-sig', 'k-intro-start']) assert.equal(wurzel.klassen.has(k), false, k);
    assert.equal(win.localStorage.daten.get(BEWEGUNG_SPEICHER), 'ruhig');
    assert.deepEqual(win.ereignisse, [BEWEGUNG_WECHSEL]);

    wurzel.classList.add('k-notaus');
    waehleBewegung('an');
    assert.equal(wurzel.getAttribute(BEWEGUNG_ATTRIBUT), null);
    assert.equal(wurzel.klassen.has('k-bewegung'), true);
    assert.equal(wurzel.klassen.has('k-notaus'), false, 'das Modul läuft, also kein Notaus');
    assert.equal(win.localStorage.daten.get(BEWEGUNG_SPEICHER), 'an');
    assert.deepEqual(win.ereignisse, [BEWEGUNG_WECHSEL, BEWEGUNG_WECHSEL]);

    const reduziert = html();
    globalThis.window = fenster({ reduziert: true });
    globalThis.document = { documentElement: reduziert, querySelectorAll: () => [] };
    waehleBewegung('an');
    assert.equal(reduziert.klassen.has('k-bewegung'), false, 'Gerät wünscht reduzierte Bewegung');
  } finally {
    globalThis.window = vorher.window;
    globalThis.document = vorher.document;
  }
});

// Regeln unter (prefers-reduced-motion: no-preference), die nicht an html.k-bewegung hängen, gälten sonst auch bei „ruhig“.
// Jede solche Regel braucht einen Spiegel im Block „Bewegungsschalter“ von bewegung.css oder ist hier als wirkungslos belegt.
const OHNE_SPIEGEL_NOETIG = new Map([
  ['.leitachse', 'nur view-timeline, die Animation sitzt an .leitachse-rot'],
  ['.fugenband', 'nur view-timeline, die Animation sitzt an .fugenband-rot'],
  ['[data-motion="weg"] .weg-strecke', 'nur view-timeline, die Animation hängt an html.k-bewegung'],
  ['.menue-blatt', 'Übergang, durch die Übergangsregel auf 0,01 ms'],
  ['.menue-blatt:popover-open', 'Übergang, durch die Übergangsregel auf 0,01 ms'],
  ['.mega-blatt', 'Übergang, durch die Übergangsregel auf 0,01 ms'],
  ['.mega-blatt:not([hidden])', '@starting-style, durch die Übergangsregel sofort'],
  ['html.k-intro .intro-fliese', 'liegt im verborgenen Intro'],
  ['html.k-intro .intro-logo', 'liegt im verborgenen Intro'],
  ['html.k-intro .intro-schild', 'liegt im verborgenen Intro'],
  ['html.k-intro .intro-reihe', 'liegt im verborgenen Intro'],
]);
const GESPIEGELT = new Map([
  ['.leitachse-rot', 'html[data-bewegung="ruhig"] .leitachse-rot'],
  ['.fugenband-rot', 'html[data-bewegung="ruhig"] .fugenband-rot'],
  ['[data-motion="druck"]:active', 'html[data-bewegung="ruhig"] [data-motion="druck"]:active'],
  ['html.k-intro .intro', 'html[data-bewegung="ruhig"].k-intro .intro'],
  ['html.k-intro header [data-erstes-bild="logo"]', 'html[data-bewegung="ruhig"].k-intro header [data-erstes-bild="logo"]'],
]);

function block(css, start) {
  let tiefe = 0;
  for (let i = start; i < css.length; i++) {
    if (css[i] === '{') tiefe++;
    else if (css[i] === '}' && --tiefe === 0) return css.slice(start + 1, i);
  }
  throw new Error('Klammer nicht geschlossen');
}

/** Selektoren aller Regeln in einem Block, auch in verschachtelten @-Regeln (@starting-style, @supports). */
function selektoren(text) {
  const liste = [];
  let i = 0;
  while (i < text.length) {
    const auf = text.indexOf('{', i);
    if (auf < 0) break;
    const kopf = text.slice(text.lastIndexOf(';', auf) + 1, auf).replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const innen = block(text, auf);
    const kopfOhneVorlauf = kopf.slice(kopf.lastIndexOf('}') + 1).trim();
    if (kopfOhneVorlauf.startsWith('@')) liste.push(...selektoren(innen));
    else liste.push(...kopfOhneVorlauf.split(',').map((s) => s.trim()).filter(Boolean));
    i = auf + innen.length + 2;
  }
  return liste;
}

test('Schalter 4: jede Bewegungsregel, die nur an der Medienabfrage hängt, ist für „ruhig“ gespiegelt (bewegung.css)', () => {
  const css = fs.readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const offen = [];
  let fund = 0;
  for (let i = css.indexOf('prefers-reduced-motion: no-preference'); i >= 0; i = css.indexOf('prefers-reduced-motion: no-preference', i + 1)) {
    fund++;
    for (const sel of selektoren(block(css, css.indexOf('{', i)))) {
      if (/^html(\.[\w-]+)*\.k-bewegung\b/.test(sel)) continue;
      if (OHNE_SPIEGEL_NOETIG.has(sel)) continue;
      if (GESPIEGELT.has(sel) && css.includes(GESPIEGELT.get(sel))) continue;
      offen.push(sel);
    }
  }
  assert.ok(fund >= 10, `Medienabfragen gefunden: ${fund}`);
  assert.deepEqual(offen, [], 'ohne Spiegel für den Bewegungsschalter');
  for (const spiegel of GESPIEGELT.values()) assert.ok(css.includes(spiegel), spiegel);
  assert.match(css, /html\[data-bewegung="ruhig"\] \*,[\s\S]*?transition-duration: 0\.01ms !important/, 'Übergangsregel wie globals.css');
  assert.match(css, /html\[data-bewegung="ruhig"\]::view-transition-group\(\*\)/, 'View Transitions wie reduziert');
});

// Tailwind-Varianten: Übergänge deckt die Übergangsregel des Schalters ab; alles andere braucht ein ruhig:-Gegenstück.
const DECKT_UEBERGANGSREGEL = /^motion-(safe|reduce):(transition(-[\w-]+)?|dauer-\d|ease-[\w-]+)$/;
const GEGENSTUECK = new Map([
  ['motion-safe:active:translate-y-px', 'ruhig:active:translate-y-0!'],
  ['motion-reduce:hidden', 'ruhig:hidden'],
]);

function quellen(ordner) {
  return fs.readdirSync(ordner, { withFileTypes: true }).flatMap((e) => {
    const pfad = `${ordner}/${e.name}`;
    if (e.isDirectory()) return quellen(pfad);
    return /\.(tsx?|jsx?)$/.test(e.name) ? [pfad] : [];
  });
}

test('Schalter 5: motion-safe/motion-reduce in Klassen haben für „ruhig“ ein Gegenstück oder steuern nur Übergänge', () => {
  const wurzel = new URL('../src', import.meta.url).pathname;
  const offen = [];
  let fund = 0;
  for (const datei of quellen(wurzel)) {
    const text = fs.readFileSync(datei, 'utf8');
    for (const klasse of text.match(/motion-(?:safe|reduce):[\w:!-]+/g) ?? []) {
      fund++;
      if (DECKT_UEBERGANGSREGEL.test(klasse)) continue;
      const gegen = GEGENSTUECK.get(klasse);
      if (!gegen || !text.includes(gegen)) offen.push(`${datei.slice(wurzel.length)}: ${klasse}`);
    }
  }
  assert.ok(fund > 0);
  assert.deepEqual(offen, []);
  const css = fs.readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  assert.match(css, /@custom-variant ruhig \(&:where\(\[data-bewegung="ruhig"\] \*\)\);/);
});

