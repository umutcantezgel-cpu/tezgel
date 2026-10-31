// Eingang ohne Vorhang (E-067-4, KERN K-007 „An der Schnur“, UM-E3-EIN): ersetzt Intro B-02 und den Belag des Startbilds.
// Geprüft ohne Browser: der Takt aus bewegung.css und globals.css (voll höchstens 1,5 s, Wiederkehr kürzer), das Kopfskript
// in einer nachgebauten Umgebung (Klassen, Merker, Zeitlimit 2 s, Abbruch durch Eingabe), kein Startzustand für das Foto
// (LCP) und die Bindung aller Startzustände an html.k-bewegung:not(.k-notaus).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  EINGANG_ABBRUCH,
  EINGANG_GRENZE,
  EINGANG_HOECHSTENS,
  KLASSE_EINGANG,
  KLASSE_WIEDERKEHR,
  SPEICHER_EINGANG,
  SPEICHER_INTRO,
} from '../src/lib/intro/ablauf.ts';
import * as kopf from '../src/lib/motion/kopfskript.ts';

const { KOPFSKRIPT } = kopf;
const lies = (pfad) => readFileSync(new URL(`../${pfad}`, import.meta.url), 'utf8');
const ohneKommentare = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '');
const GLOBALS = lies('src/app/globals.css');
const CSS = ohneKommentare(lies('src/app/bewegung.css'));

/** Inhalt des Blocks, dessen öffnende Klammer bei `auf` steht. */
function block(text, auf) {
  let tiefe = 0;
  for (let i = auf; i < text.length; i++) {
    if (text[i] === '{') tiefe++;
    else if (text[i] === '}' && --tiefe === 0) return text.slice(auf + 1, i);
  }
  throw new Error('Klammer nicht geschlossen');
}

/** Regeln eines Blocks als [Selektoren, Deklarationen]; verschachtelte @-Regeln werden aufgelöst. */
function regeln(text) {
  const liste = [];
  let i = 0;
  while (i < text.length) {
    const auf = text.indexOf('{', i);
    if (auf < 0) break;
    const kopfText = text.slice(Math.max(text.lastIndexOf('}', auf), text.lastIndexOf(';', auf)) + 1, auf).trim();
    const innen = block(text, auf);
    if (kopfText.startsWith('@')) liste.push(...regeln(innen).map((r) => ({ ...r, at: kopfText })));
    else {
      const dekl = Object.fromEntries(
        innen.split(';').map((d) => d.trim()).filter(Boolean).map((d) => [d.slice(0, d.indexOf(':')).trim(), d.slice(d.indexOf(':') + 1).trim()]),
      );
      liste.push({ selektoren: kopfText.split(',').map((s) => s.trim()), dekl });
    }
    i = auf + innen.length + 2;
  }
  return liste;
}

const ALLE = regeln(CSS);
const vars = (selektor) => ALLE.find((r) => !r.at && r.selektoren.length === 1 && r.selektoren[0] === selektor)?.dekl ?? {};

// Token-Werte in ms aus @theme (globals.css)
const TOKENS = Object.fromEntries(
  [...GLOBALS.matchAll(/--(dauer-\d|staffel):\s*(\d+)ms;/g)].map((m) => [`--${m[1]}`, Number(m[2])]),
);

/** Wert eines Zeitausdrucks in ms: nur var(--…), calc, min und Zahlen ohne Einheit (Faktoren). */
function ms(ausdruck, werte, zeile = 0) {
  let t = ausdruck.replace(/var\(--zeile,\s*0\)/g, String(zeile));
  for (let n = 0; n < 10 && /var\(/.test(t); n++) {
    t = t.replace(/var\((--[\w-]+)\)/g, (_, name) => {
      if (name in TOKENS) return String(TOKENS[name]);
      if (name in werte) return `(${werte[name]})`;
      throw new Error(`unbekannte Variable ${name}`);
    });
  }
  t = t.replace(/calc\(/g, '(').replace(/min\(/g, 'Math.min(');
  assert.match(t, /^[\d\s.+\-*/(),]*(Math\.min[\d\s.+\-*/(),]*)*$/, `nur Rechnung aus Tokens: ${ausdruck}`);
  return Function(`return (${t});`)();
}

/** Teilt auf oberster Ebene (Klammern bleiben zusammen): an Kommas die Animationen einer Liste, an Leerraum ihre Werte. */
function teile(wert, trenner = /\s/) {
  const out = [];
  let tiefe = 0;
  let akt = '';
  for (const z of wert) {
    if (z === '(') tiefe++;
    if (z === ')') tiefe--;
    if (trenner.test(z) && tiefe === 0) {
      if (akt.trim()) out.push(akt.trim());
      akt = '';
    } else akt += z;
  }
  if (akt.trim()) out.push(akt.trim());
  return out;
}
const animationen = (wert) => teile(wert, /,/).map((a) => teile(a));

const PRAEFIX = 'html.k-eingang.k-bewegung:not(.k-notaus)';
const EINGANG_REGELN = ALLE.filter((r) => r.at === '@media (prefers-reduced-motion: no-preference)' && r.selektoren.some((s) => s.startsWith('html.k-eingang')));

/** Ablauf je Art: jedes animierte Teil mit Beginn und Ende in ms (Zeilen 1 bis 4). */
function ablauf(art) {
  const werte = { ...vars('[data-motion="eingang"]'), ...(art === 'kurz' ? vars('html.k-wiederkehr [data-motion="eingang"]') : {}) };
  const teileListe = [];
  for (const r of EINGANG_REGELN) {
    if (!r.dekl.animation) continue;
    for (const sel of r.selektoren) {
      if (art === 'kurz' && sel.includes(':not(.k-wiederkehr)')) continue;
      for (const [name, dauer, kurve, ...rest] of animationen(r.dekl.animation)) {
        // ohne Verzögerung in der Kurzschreibweise beginnt das Teil sofort
        const beginn = rest.length > 1 ? rest[0] : null;
        for (let zeile = 0; zeile < (beginn?.includes('--zeile') ? 4 : 1); zeile++) {
          const b = beginn === null ? 0 : ms(beginn, werte, zeile);
          teileListe.push({ sel, name, kurve, zeile, beginn: b, ende: b + ms(dauer, werte) });
        }
      }
    }
  }
  return teileListe;
}

test('Eingang 1: Takt nur aus Tokens; voll höchstens 1,5 s, Wiederkehr kürzer und nur mit Zeilenmasken', () => {
  assert.equal(EINGANG_HOECHSTENS, 1500);
  assert.ok(TOKENS['--dauer-5'] && TOKENS['--staffel'], 'Tokens gelesen');
  for (const r of EINGANG_REGELN) {
    if (r.dekl.animation) assert.ok(!/(?<![\w.-])\d+(\.\d+)?m?s\b/.test(r.dekl.animation), `keine festen Zeiten: ${r.dekl.animation}`);
  }
  for (const [name, wert] of Object.entries({ ...vars('[data-motion="eingang"]'), ...vars('html.k-wiederkehr [data-motion="eingang"]') })) {
    assert.ok(!/\d+m?s\b/.test(wert), `${name} nur aus Tokens: ${wert}`);
  }
  const voll = ablauf('voll');
  const kurz = ablauf('kurz');
  const ende = (liste) => Math.max(...liste.map((t) => t.ende));
  for (const name of ['eingang-logo', 'eingang-zeile', 'eingang-setzen', 'eingang-riss']) assert.ok(voll.some((t) => t.name === name), `voll: ${name}`);
  assert.ok(ende(voll) <= EINGANG_HOECHSTENS, `voll ${ende(voll)} ms`);
  assert.ok(voll.every((t) => t.beginn >= 0));
  // Wiederkehr: nur Zeilenmasken (mit der Flucht, die sig-flucht ohnehin bei jedem Laden zeigt), kein Logo-Aufbau
  assert.ok(kurz.some((t) => t.name === 'eingang-zeile'));
  assert.ok(kurz.every((t) => t.name === 'eingang-zeile' || t.name === 'flucht-einruecken'), 'Wiederkehr: nur Zeilenmasken');
  assert.ok(ende(kurz) < ende(voll), `Wiederkehr ${ende(kurz)} ms kürzer als ${ende(voll)} ms`);
  // die Zeilen kommen eine nach der anderen, Ort und Knopfzeile folgen der ersten Zeile, das Logo beginnt sofort
  // die Maske steht in zwei Regeln (Block-H1 und Zeilen in der Flucht) mit demselben Takt
  for (const liste of [voll, kurz]) {
    const jeZeile = new Map();
    for (const t of liste.filter((x) => x.name === 'eingang-zeile')) {
      if (jeZeile.has(t.zeile)) assert.deepEqual(jeZeile.get(t.zeile), [t.beginn, t.ende], `Zeile ${t.zeile + 1}: gleicher Takt in beiden Regeln`);
      jeZeile.set(t.zeile, [t.beginn, t.ende]);
    }
  }
  const zeilen = [...new Map(voll.filter((t) => t.name === 'eingang-zeile').map((t) => [t.zeile, t.beginn])).values()];
  assert.equal(zeilen.length, 4);
  for (let i = 1; i < zeilen.length; i++) assert.ok(zeilen[i] > zeilen[i - 1], 'Zeilen gestaffelt');
  const setzen = voll.filter((t) => t.name === 'eingang-setzen');
  assert.equal(setzen.length, 2, 'Ort und Knopfzeile');
  for (const t of setzen) assert.ok(t.beginn > zeilen[0], `${t.sel} folgt den Zeilen`);
  assert.equal(voll.find((t) => t.name === 'eingang-logo').beginn, 0);
  // Kurven nur aus Tokens (oder linear)
  for (const t of [...voll, ...kurz]) assert.match(t.kurve, /^(var\(--ease-[a-z]+\)|linear)$/, t.kurve);
});

/** Kopfskript in einer nachgebauten Umgebung ausführen (ohne Browser). */
function umgebung({ gemerkt = false, speicherFehler = false, reduziert = false, ruhig = false, ohneLauscher = false } = {}) {
  const klassen = new Set();
  const attribute = new Map();
  const lauscher = [];
  const zeitgeber = [];
  const geholt = [];
  const sitzung = new Map(gemerkt ? [[SPEICHER_EINGANG, '1']] : []);
  const sessionStorage = {
    getItem: (k) => {
      if (speicherFehler) throw new Error('gesperrt');
      return sitzung.has(k) ? sitzung.get(k) : null;
    },
    setItem: (k, v) => {
      if (speicherFehler) throw new Error('gesperrt');
      sitzung.set(k, v);
    },
  };
  const localStorage = { getItem: (k) => (ruhig && k === 'tezgel-bewegung' ? 'ruhig' : null), setItem() {} };
  const html = {
    classList: { add: (k) => klassen.add(k), remove: (k) => klassen.delete(k), contains: (k) => klassen.has(k) },
    setAttribute: (n, v) => attribute.set(n, v),
    style: { setProperty: () => assert.fail('kein Stil an html') },
  };
  const fenster = {
    localStorage,
    sessionStorage,
    matchMedia: (q) => ({ matches: q.includes('no-preference') ? !reduziert : reduziert }),
    addEventListener: ohneLauscher ? undefined : (name, fn, opt) => lauscher.push({ name, fn, opt }),
  };
  class Bild {
    set src(v) {
      geholt.push(v);
    }
  }
  new Function('window', 'document', 'setTimeout', 'Image', 'location', KOPFSKRIPT)(
    fenster,
    { documentElement: html },
    (fn, ms) => zeitgeber.push({ fn, ms }),
    Bild,
    { pathname: '/' },
  );
  return { klassen, attribute, lauscher, zeitgeber, sitzung, geholt };
}

test('Eingang 2: erster Aufruf im Besuch voll, Wiederkehr kurz; ohne Speicher kurz; reduziert und „ruhig“ ohne Eingang', () => {
  assert.equal(SPEICHER_INTRO, SPEICHER_EINGANG, 'v3-Name bleibt als Alias');
  const erst = umgebung();
  assert.ok(erst.klassen.has(KLASSE_EINGANG) && erst.klassen.has('k-bewegung'));
  assert.ok(!erst.klassen.has(KLASSE_WIEDERKEHR), 'erster Aufruf: mit Logo-Aufbau');
  assert.equal(erst.sitzung.get(SPEICHER_EINGANG), '1', 'Merker sofort gesetzt');
  assert.deepEqual(erst.geholt, [], 'kein zusätzlicher Abruf (das Kopf-Logo lädt mit Vorrang)');
  for (const alt of ['k-intro', 'k-intro-sig', 'k-intro-start', 'k-startbild']) assert.ok(!erst.klassen.has(alt), `${alt} entfällt`);

  const wieder = umgebung({ gemerkt: true });
  assert.ok(wieder.klassen.has(KLASSE_EINGANG) && wieder.klassen.has(KLASSE_WIEDERKEHR), 'Wiederkehr: nur Zeilenmasken');

  const fehler = umgebung({ speicherFehler: true });
  assert.ok(fehler.klassen.has(KLASSE_EINGANG) && fehler.klassen.has(KLASSE_WIEDERKEHR), 'ohne Speicher: kurz');
  assert.ok(fehler.klassen.has('k-bewegung'), 'der Rest des Kopfskripts läuft weiter');

  for (const u of [umgebung({ reduziert: true }), umgebung({ ruhig: true })]) {
    assert.ok(!u.klassen.has(KLASSE_EINGANG) && !u.klassen.has('k-bewegung'), 'kein Eingang, sofort Endzustand');
    assert.equal(u.lauscher.length, 0);
    assert.equal(u.zeitgeber.length, 0);
  }
  assert.equal(umgebung({ ruhig: true }).attribute.get('data-bewegung'), 'ruhig');
});

test('Eingang 3: Zeitlimit 2 s im Kopfskript, danach Endzustand; das Notaus bleibt der letzte Zeitgeber', () => {
  assert.equal(EINGANG_GRENZE, 2000);
  for (const u of [umgebung(), umgebung({ gemerkt: true })]) {
    const grenze = u.zeitgeber.filter((z) => z.ms === EINGANG_GRENZE);
    assert.equal(grenze.length, 2, 'Zeitlimit und Notaus');
    grenze[0].fn();
    assert.ok(!u.klassen.has(KLASSE_EINGANG) && !u.klassen.has(KLASSE_WIEDERKEHR), 'nach dem Limit gilt der Endzustand');
    assert.ok(u.klassen.has('k-bewegung'), 'die übrige Bewegung bleibt');
    u.zeitgeber.at(-1).fn();
    assert.ok(u.klassen.has('k-notaus'), 'Notaus ohne Bereitmeldung des Moduls wie bisher');
  }
  // Scheitern Lauscher oder Zeitlimit, bleibt kein Eingang ohne Ende zurück: die Klassen kommen erst danach
  const ohne = umgebung({ ohneLauscher: true });
  assert.ok(!ohne.klassen.has(KLASSE_EINGANG) && !ohne.klassen.has(KLASSE_WIEDERKEHR), 'ohne Lauscher kein Eingang');
  assert.ok(ohne.klassen.has('k-bewegung') && !ohne.klassen.has('k-notaus'), 'die übrige Bewegung läuft, kein Notaus');
  assert.equal(ohne.zeitgeber.length, 1, 'nur das Notaus');
});

test('Eingang 4: jede Eingabe beendet sofort (passiv, once, capture), auch mitten in der Wiederkehr', () => {
  for (const name of EINGANG_ABBRUCH) {
    for (const gemerkt of [false, true]) {
      const u = umgebung({ gemerkt });
      assert.deepEqual(u.lauscher.map((l) => l.name).sort(), [...EINGANG_ABBRUCH].sort());
      for (const l of u.lauscher) assert.deepEqual(l.opt, { passive: true, once: true, capture: true });
      u.lauscher.find((l) => l.name === name).fn();
      assert.ok(!u.klassen.has(KLASSE_EINGANG) && !u.klassen.has(KLASSE_WIEDERKEHR), `${name} beendet`);
      u.lauscher.forEach((l) => l.fn());
      assert.ok(!u.klassen.has(KLASSE_EINGANG), 'mehrfaches Ende ist folgenlos');
    }
  }
  assert.deepEqual([...EINGANG_ABBRUCH].sort(), ['keydown', 'pointerdown', 'scroll', 'touchstart', 'wheel']);
});

test('Eingang 5: kein Startzustand und kein Belag für das LCP-Foto, keine Intro-Schicht mehr', () => {
  const selektoren = ALLE.flatMap((r) => r.selektoren);
  assert.ok(!selektoren.some((s) => /startbild|\.intro\b|intro-/.test(s)), 'kein Belag, kein Kalkblatt');
  assert.ok(!/@keyframes (intro|startbild)-/.test(CSS));
  for (const s of selektoren.filter((x) => x.includes('data-eingang="bild"'))) {
    assert.ok(s.endsWith('::after'), `am Bildplatz nur der Fugenriss als Pseudoelement: ${s}`);
  }
  for (const s of EINGANG_REGELN.flatMap((r) => r.selektoren)) {
    assert.ok(!/\b(img|figure|picture)\b|data-erstes-bild="(ueberschrift|kontakt)"/.test(s), `nichts am Foto oder an der H1 als Ganzes: ${s}`);
  }
  // Fugenriss: nur scale und opacity am Pseudoelement
  const riss = /@keyframes eingang-riss \{([\s\S]*?)\n\}/.exec(CSS)[1];
  assert.ok(!/translate|clip-path/.test(riss));
  // Komponenten: Startbild ohne Belag, das Foto lädt weiter mit Vorrang
  const startbild = lies('src/components/start/Startbild.tsx');
  assert.ok(!/startbild-decke|startbild-reihe|aria-hidden/.test(startbild), 'kein Belag über dem Foto');
  // UM-E4-START: Startfoto ist das Querformat start-bad (ab lg der Zuschnitt start-bad-gross über `gross`)
  assert.match(startbild, /<Bildfeld arbeit="start-bad" lcp=\{lcp\}/);
  const mitte = lies('src/components/vorlagen/teile/EinstiegMitte.tsx');
  assert.match(mitte, /<Bildfeld arbeit=\{bild as ArbeitId\} lcp /);
  const dokument = lies('src/app/(bestand)/_dokument.tsx');
  assert.ok(!/Intro|INTRO_ZIEL/.test(dokument), 'keine Intro-Schicht, kein Zielskript');
  assert.equal(kopf.INTRO_ZIEL, undefined, 'Zielmessung für das Gleiten entfällt');
});

test('Eingang 6: Startzustände nur unter html.k-eingang.k-bewegung:not(.k-notaus) und an der Medienabfrage; Druck und erzwungene Farben ohne Eingang', () => {
  assert.ok(EINGANG_REGELN.length >= 5);
  for (const r of EINGANG_REGELN) {
    for (const s of r.selektoren) assert.ok(s.startsWith(PRAEFIX), `Startzustand gebunden: ${s}`);
  }
  // außerhalb der Medienabfrage stehen nur Takt-Variablen
  for (const r of ALLE.filter((x) => !x.at && x.selektoren.some((s) => /eingang|zeilenmaske/.test(s)))) {
    for (const name of Object.keys(r.dekl)) assert.ok(name.startsWith('--eingang-'), `${r.selektoren.join(', ')}: nur Variablen (${name})`);
  }
  const aus = ALLE.filter((r) => r.at === '@media print, (forced-colors: active)' && r.selektoren.some((s) => s.startsWith('html.k-eingang')));
  const ausSel = aus.flatMap((r) => r.selektoren);
  for (const teil of ['[data-erstes-bild="logo"]', '[data-motion="zeilenmaske"]', '[data-erstes-bild="ort"]', '[data-eingang="knoepfe"]', '[data-eingang="bild"]::after']) {
    assert.ok(ausSel.some((s) => s.endsWith(teil)), `Druck und erzwungene Farben: ${teil}`);
  }
  for (const r of aus) assert.ok(/none !important/.test(r.dekl.animation ?? r.dekl.display), r.selektoren.join(', '));
});

test('Eingang 7: Behälter und Teile in Kopf und Einstiegen; H1 bleibt Text, Arbeitsansichten ohne Eingang', () => {
  assert.match(lies('src/components/common/Header.jsx'), /<Link href="\/" className="[^"]*" data-motion="eingang">\s*<BrandMark/);
  for (const datei of ['EinstiegMitte', 'EinstiegPlanblatt']) {
    const q = lies(`src/components/vorlagen/teile/${datei}.tsx`);
    assert.match(q, /data-formel="worum" data-motion="eingang"/, datei);
    // jede Zeile ein Block mit Maske und Nummer, als Text im DOM; fließt sie als Satz (inline), entfällt die Maske
    const zeile = /<span key=\{zeile\} data-motion="zeilenmaske" style=\{\{ '--zeile': i \} as CSSProperties\} className="([^"]+)">\s*\{zeile\}/.exec(q);
    assert.ok(zeile, `${datei}: Zeile mit Maske`);
    for (const inline of zeile[1].match(/[\w@-]+:inline/g)) assert.ok(zeile[1].includes(inline.replace('inline', 'animate-none')), `${datei}: ${inline} ohne Maske`);
    assert.match(q, /data-eingang="knoepfe"/, datei);
  }
  const einstieg = lies('src/components/vorlagen/teile/Einstieg.tsx');
  assert.match(einstieg, /data-motion=\{kompakt \? undefined : 'eingang'\}/);
  // Wissens- und Ortsseiten (UM-E4-SICHT-FIX M-A3 Nr. 2, Eintrag in ENTSCHEIDUNGEN): Die H1 steht ab dem ersten Bild
  // (LCP-Kandidat, E-067-4), ohne Zeilenmaske; der Vorspann steht ohne data-eingang; an der Schnur ziehen nur Schnur und
  // Lotstück der Schnurebene (Kennung eingang), im Behälter des Einstiegs
  assert.ok(!einstieg.includes('zeilenmaske'), 'Einstieg: H1 ohne Zeilenmaske');
  const vorspann = /<p className=\{clsx\('max-w-mass font-text text-fs-3[^\n]*\n\s*<Textmarken text=\{vorspann\}/.exec(einstieg);
  assert.ok(vorspann && !vorspann[0].includes('data-eingang'), 'Einstieg: Vorspann ohne data-eingang');
  assert.match(einstieg, /data-formel="worum" data-motion="eingang" data-einstieg="schnur"/);
  assert.match(einstieg, /<Schnurebene stark \/>/);
  assert.match(einstieg, /<Lotstueck className=/);
  const ebene = lies('src/components/vorlagen/teile/Schnurebene.tsx');
  assert.match(ebene, /data-eingang="schnur"/);
  assert.match(ebene, /data-eingang="lot"/);
  // die Zeilenmaske hält höchstens vier Stufen (Staffel ≤ 8 Elemente, K-005)
  assert.match(CSS, /min\(var\(--zeile, 0\), 3\)/);
});

test('Eingang 8: Kopfskript bleibt klein (Z-10) und setzt nur Klassen', () => {
  assert.ok(Buffer.byteLength(KOPFSKRIPT) <= 1024, `${Buffer.byteLength(KOPFSKRIPT)} Byte`);
  assert.ok(!/requestAnimationFrame|getBoundingClientRect|style\.|new Image/.test(KOPFSKRIPT), 'keine Messung, kein Stil, kein Abruf');
  assert.ok(KOPFSKRIPT.includes('sessionStorage'));
});

test('Eingang 9: Endet der Eingang, läuft die Flucht ohne Neustart weiter (gleicher Name und Takt wie sig-flucht)', () => {
  const regel = EINGANG_REGELN.find((r) => r.selektoren.some((s) => s.endsWith('[data-motion="sig-flucht"] > [data-motion="zeilenmaske"]')));
  assert.ok(regel, 'Regel für die Zeilen in der Flucht');
  const [flucht, maske] = animationen(regel.dekl.animation);
  assert.equal(maske[0], 'eingang-zeile', 'die Maske kommt als zweite dazu');
  // sig-flucht außerhalb des Eingangs: Kurzschreibweise und Verzögerung je nth-child
  const basis = ALLE.find((r) => !r.at && r.selektoren.includes('html.k-bewegung [data-motion="sig-flucht"] > *'));
  const [bName, bDauer, bKurve, bFuellung] = animationen(basis.dekl.animation)[0];
  assert.deepEqual([flucht[0], flucht[1], flucht[2], flucht.at(-1)], [bName, bDauer, bKurve, bFuellung], 'gleicher Name, gleiche Dauer, Kurve und Füllung');
  for (let zeile = 0; zeile < 4; zeile++) {
    const kind = ALLE.find((r) => !r.at && r.selektoren.includes(`html.k-bewegung [data-motion="sig-flucht"] > :nth-child(${zeile + 1})`));
    const soll = kind ? ms(kind.dekl['animation-delay'], {}) : 0;
    assert.equal(ms(flucht[3], {}, zeile), soll, `Zeile ${zeile + 1}: gleiche Verzögerung`);
  }
  // die Maske bewegt transform, die Flucht translate: beide setzen sich zusammen, keine überschreibt die andere
  const schluessel = (name) => /@keyframes NAME \{([\s\S]*?)\n\}/.exec(CSS.replace(/@keyframes (\S+)/g, (m, n) => (n === name ? '@keyframes NAME' : m)))[1];
  assert.ok(/transform:/.test(schluessel('eingang-zeile')) && !/translate:/.test(schluessel('eingang-zeile')));
  assert.ok(/translate:/.test(schluessel('flucht-einruecken')) && !/transform:/.test(schluessel('flucht-einruecken')));
});
