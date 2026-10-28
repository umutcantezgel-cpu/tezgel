// Fugenkreuz-Cursor (UM-E3-CURSOR, KERN K-007 und Regeln v4): Register der sechs Zustände, Zuordnung unter dem Zeiger,
// Zustandsmaschine (Ausblenden bei Tastatur, Fensterwechsel, Finger, erzwungenen Farben; Ladeschwelle), Fensterrand,
// Nachladen nur bei feinem Zeiger und die CSS-Regeln. Ohne Browser: Elemente sind nachgebaut, sie kennen nur die Selektoren,
// die ihnen im Test zugewiesen sind.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  CURSOR_KENNUNG,
  CURSOR_REGISTER,
  CURSOR_ZUSTAENDE,
  CURSOR_KANDIDATEN,
  START_STAND,
  TEXTFELD,
  anzeige,
  kante,
  weiter,
  zielZustand,
} from '../src/lib/motion/cursor.ts';
import { erzeugeLadeschwelle, LADE_MINDESTDAUER_MS, LADE_VERZOEGERUNG_MS } from '../src/lib/ladeschwelle.ts';

const lies = (pfad) => fs.readFileSync(new URL(`../${pfad}`, import.meta.url), 'utf8');
const ohneKommentare = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '');

/** Selektorliste an Kommas der obersten Ebene teilen (nicht in Klammern oder Anführungszeichen). */
function teile(liste) {
  const teile = [];
  let tiefe = 0;
  let zitat = null;
  let anfang = 0;
  for (let i = 0; i < liste.length; i++) {
    const c = liste[i];
    if (zitat) {
      if (c === zitat) zitat = null;
    } else if (c === '"' || c === "'") zitat = c;
    else if (c === '(' || c === '[') tiefe++;
    else if (c === ')' || c === ']') tiefe--;
    else if (c === ',' && tiefe === 0) {
      teile.push(liste.slice(anfang, i).trim());
      anfang = i + 1;
    }
  }
  teile.push(liste.slice(anfang).trim());
  return teile.filter(Boolean);
}

/** Nachgebautes Element: passt genau auf die genannten Einzelselektoren; [data-cursor] folgt dem Attribut. */
function el(passt = [], attribute = {}, eltern = null) {
  const e = {
    parentElement: eltern,
    matches: (liste) => teile(liste).some((s) => passt.includes(s) || (s === '[data-cursor]' && 'data-cursor' in attribute)),
    closest: (liste) => {
      for (let x = e; x; x = x.parentElement) if (x.matches(liste)) return x;
      return null;
    },
    getAttribute: (n) => (n in attribute ? attribute[n] : null),
  };
  return e;
}

const R = CURSOR_REGISTER;
const KNOPF_LAEDT = [R.laedt.wo[0], 'button:disabled'];

test('Cursor 1: Register mit genau sechs Zuständen (Regeln v4), Beschriftungen nach K-007, Orte über Fotos, Reglern und Plänen', () => {
  assert.equal(CURSOR_KENNUNG, 'cursor');
  assert.deepEqual([...CURSOR_ZUSTAENDE], ['handlung', 'ansehen', 'ziehen', 'vergleichen', 'gesperrt', 'laedt']);
  assert.deepEqual(Object.keys(R).sort(), [...CURSOR_ZUSTAENDE].sort());
  assert.equal(R.ansehen.text, 'Ansehen');
  assert.equal(R.ziehen.text, 'Ziehen');
  assert.equal(R.vergleichen.text, 'Vergleichen');
  assert.equal(R.gesperrt.text, 'Nicht verfügbar');
  assert.equal(R.laedt.text, 'Lädt');
  assert.equal(R.handlung.text, '', 'Handlung nennt ihr Ziel selbst (data-cursor-text), sonst nur das Kreuz');
  assert.deepEqual(R.handlung.wo, [], 'Handlung hat keinen festen Ort (Ruhe: kein Schild über jedem Link)');
  for (const z of CURSOR_ZUSTAENDE) {
    assert.ok(['kreuz', 'schraeg', 'drehend'].includes(R[z].form), z);
    assert.ok(R[z].ruhig.length > 0, `${z}: ruhige Fassung beschrieben`);
    assert.equal(R[z].zweck, 'Rückmeldung', z);
    assert.match(R[z].stufe, /dauer-1 · setzen/, `${z}: Stufen nur als Token`);
    assert.ok(R[z].text.length <= 16, `${z}: Mikrotext`);
  }
  assert.ok(R.ansehen.wo.includes('a.glasbild[href]'), 'Fotos mit Weg (Glasbild)');
  assert.ok(R.ansehen.wo.some((s) => s.includes('verlegeplan')), 'Pläne');
  assert.deepEqual(R.ziehen.wo, ['.formatregler-bild']);
  assert.deepEqual(R.vergleichen.wo, ['.vn-zone']);
  // die Orte gibt es im Quelltext wirklich
  assert.match(lies('src/components/kern/Glasbild.tsx'), /className="glasbild grid/);
  assert.match(lies('src/components/momente/formatregler/Formatregler.tsx'), /'formatregler-bild /);
  assert.match(lies('src/components/momente/vorher-nachher/Regler.tsx'), /className="vn-zone /);
  assert.match(lies('src/components/kern/Verlegeplan.tsx'), /data-flucht=\{fluchtArt\}/);
  assert.match(lies('src/components/leistungen/Leistungsplaene.tsx'), /sig-plan-ziel/);
});

test('Cursor 2: Zuordnung unter dem Zeiger – das nächste entscheidende Element gilt, Textfelder bleiben nativ', () => {
  // Foto mit Weg: das Bild im Link
  const glasbild = el(['a.glasbild[href]', 'a[href]']);
  assert.deepEqual(zielZustand(el([], {}, glasbild)), { zustand: 'ansehen', text: 'Ansehen', quelle: glasbild });
  // Pläne, die in die Flucht rücken: Pfad im Plan, Plan in einer Karte
  const plan = el(['.verlegeplan[data-flucht="zeigen"]']);
  assert.equal(zielZustand(el([], {}, plan))?.zustand, 'ansehen');
  const karte = el([]);
  const kartenPlan = el(['.sig-plan-ziel .verlegeplan'], {}, karte);
  assert.equal(zielZustand(el([], {}, kartenPlan))?.zustand, 'ansehen');
  assert.equal(zielZustand(karte), null, 'Text der Karte: kein Schild, nur der Plan');
  // Regler
  const wand = el(['.formatregler-bild']);
  assert.deepEqual(zielZustand(wand), { zustand: 'ziehen', text: 'Ziehen', quelle: wand });
  assert.equal(zielZustand(el(['.vn-zone']))?.text, 'Vergleichen');
  // nichts davon: Foto ohne Weg, Absatz, Link im Kopf
  assert.equal(zielZustand(el(['img'])), null);
  assert.equal(zielZustand(el(['a[href]'])), null, 'gewöhnliche Links behalten nur den Systemzeiger');
  // Textcursor bleibt nativ, auch mitten in einem Ort
  for (const feld of teile(TEXTFELD)) assert.equal(zielZustand(el([feld], {}, el(['.vn-zone']))), null, feld);
  // ladend vor gesperrt (ein ladender Knopf ist auch gesperrt)
  const knopf = el(KNOPF_LAEDT);
  assert.deepEqual(zielZustand(el([], {}, knopf)), { zustand: 'laedt', text: 'Lädt', quelle: knopf });
  assert.equal(zielZustand(el(['button:disabled']))?.zustand, 'gesperrt');
  assert.equal(zielZustand(el([R.gesperrt.wo[3]]))?.text, 'Nicht verfügbar', 'aria-disabled an einem Bedienelement');
  // das nächste Element entscheidet: gesperrter Knopf auf einem Foto
  assert.equal(zielZustand(el(['button:disabled'], {}, glasbild))?.zustand, 'gesperrt');
  // eigene Wahl
  assert.deepEqual(zielZustand(el([], { 'data-cursor': 'handlung', 'data-cursor-text': 'Öffnen' }))?.text, 'Öffnen');
  assert.equal(zielZustand(el([], { 'data-cursor': 'handlung' }))?.text, '');
  assert.equal(zielZustand(el(['a.glasbild[href]'], { 'data-cursor': 'aus' })), null, 'aus schaltet einen Ort ab');
  assert.equal(zielZustand(el([], { 'data-cursor': 'quatsch' }, glasbild))?.zustand, 'ansehen', 'unbekannte Wahl zählt nicht');
  assert.equal(zielZustand(el(['button:disabled'], { 'data-cursor': 'ziehen' }))?.zustand, 'gesperrt', 'gesperrt geht vor eigener Wahl');
  // kein Element
  assert.equal(zielZustand(null), null);
  assert.equal(zielZustand({ nodeName: '#document' }), null);
  // jeder Einzelselektor des Registers ist Kandidat für closest()
  const kandidaten = teile(CURSOR_KANDIDATEN);
  for (const z of CURSOR_ZUSTAENDE) for (const s of R[z].wo) assert.ok(kandidaten.includes(s), s);
});

/** Stand nach einer Folge von Ereignissen. */
const nach = (...ereignisse) => ereignisse.reduce(weiter, START_STAND);
const maus = (x, y) => ({ art: 'zeiger', x, y, typ: 'mouse' });
const ziel = (zustand, text = zustand ? CURSOR_REGISTER[zustand].text : '') => ({ art: 'ziel', zustand, text });

test('Cursor 3: Zustandsmaschine – sichtbar nur mit Maus über einem Ort; die Lage folgt dem Zeiger ohne Nachlauf', () => {
  assert.equal(anzeige(START_STAND).sichtbar, false);
  assert.equal(anzeige(nach(ziel('ansehen'))).sichtbar, false, 'ohne bekannte Lage kein Schild');
  let s = nach(maus(100, 200), ziel('ansehen'));
  assert.deepEqual(anzeige(s), { sichtbar: true, zustand: 'ansehen', text: 'Ansehen', gedrueckt: false });
  assert.deepEqual([s.x, s.y], [100, 200]);
  s = weiter(s, maus(101, 207));
  assert.deepEqual([s.x, s.y], [101, 207], 'genau die Lage des letzten Ereignisses (keine Feder)');
  assert.equal(anzeige(weiter(s, ziel(null))).sichtbar, false, 'außerhalb der Orte kein Schild');
  for (const z of CURSOR_ZUSTAENDE.filter((z) => z !== 'laedt')) {
    const a = anzeige(weiter(s, ziel(z)));
    assert.equal(a.zustand, z);
    assert.equal(a.text, CURSOR_REGISTER[z].text);
  }
  // keine Änderung: derselbe Stand (das Modul plant dann kein Bild)
  assert.equal(weiter(s, maus(101, 207)), s);
  assert.equal(weiter(s, ziel('ansehen')), s);
});

test('Cursor 4: ausgeblendet bei Tastatur und nach einem Seitenwechsel, bis sich der Zeiger bewegt', () => {
  const an = nach(maus(10, 10), ziel('ziehen'));
  for (const ereignis of [{ art: 'taste' }, { art: 'seite' }]) {
    let s = weiter(an, ereignis);
    assert.equal(anzeige(s).sichtbar, false, ereignis.art);
    s = weiter(s, ziel('ansehen'));
    assert.equal(anzeige(s).sichtbar, false, `${ereignis.art}: neues Ziel ohne Bewegung`);
    s = weiter(s, maus(10, 10));
    assert.equal(anzeige(s).sichtbar, false, `${ereignis.art}: Ereignis ohne Bewegung`);
    s = weiter(s, maus(11, 10));
    assert.equal(anzeige(s).sichtbar, true, `${ereignis.art}: nach der Bewegung wieder da`);
    assert.equal(anzeige(s).zustand, 'ansehen');
  }
});

test('Cursor 5: ausgeblendet beim Verlassen des Fensters, nach Finger oder Stift und in erzwungenen Farben', () => {
  const an = nach(maus(10, 10), ziel('vergleichen'));
  let s = weiter(an, { art: 'verlassen' });
  assert.equal(anzeige(s).sichtbar, false, 'Fenster verlassen, Tab verborgen oder Fenster ohne Fokus');
  assert.equal(anzeige(weiter(s, maus(10, 10))).sichtbar, true, 'zurück im Fenster');
  for (const typ of ['touch', 'pen']) {
    s = weiter(an, { art: 'zeiger', x: 50, y: 50, typ });
    assert.equal(anzeige(s).sichtbar, false, typ);
    assert.deepEqual([s.x, s.y], [10, 10], `${typ}: Lage bleibt die der Maus`);
    assert.equal(anzeige(weiter(s, maus(12, 10))).sichtbar, true, `${typ}: Maus wieder da`);
  }
  s = weiter(an, { art: 'farben', an: true });
  assert.equal(anzeige(s).sichtbar, false, 'erzwungene Farben');
  assert.equal(anzeige(weiter(s, maus(40, 40))).sichtbar, false, 'auch bei Bewegung');
  assert.equal(anzeige(weiter(s, { art: 'farben', an: false })).sichtbar, true);
});

test('Cursor 6: gedrückt nur sichtbar und nur bis zur nächsten Taste, zum Verlassen oder zum Loslassen', () => {
  const an = nach(maus(10, 10), ziel('ziehen'), { art: 'druck', an: true });
  assert.equal(anzeige(an).gedrueckt, true);
  assert.equal(anzeige(weiter(an, { art: 'druck', an: false })).gedrueckt, false);
  assert.equal(weiter(an, { art: 'taste' }).gedrueckt, false);
  assert.equal(weiter(an, { art: 'verlassen' }).gedrueckt, false);
  assert.equal(anzeige(weiter(an, ziel(null))).gedrueckt, false, 'ohne Schild kein Druck');
});

test('Cursor 7: „lädt“ folgt der Ladeschwelle (K-010): erst nach 300 ms, dann mindestens 500 ms', () => {
  let s = nach(maus(5, 5), ziel('laedt'));
  assert.equal(anzeige(s).sichtbar, false, 'vor der Schwelle kein Schild');
  // Ladeschwelle mit Scheinuhr, ihre Meldungen gehen als Ereignis „laden“ in die Maschine (wie im Modul)
  let jetzt = 0;
  const auftraege = new Map();
  let naechste = 1;
  const uhr = {
    setTimeout: (fn, ms) => {
      auftraege.set(naechste, { fn, um: jetzt + ms });
      return naechste++;
    },
    clearTimeout: (id) => auftraege.delete(id),
    jetzt: () => jetzt,
  };
  const bis = (zeit) => {
    jetzt = zeit;
    for (const [id, a] of [...auftraege]) if (a.um <= zeit) {
      auftraege.delete(id);
      a.fn();
    }
  };
  const schwelle = erzeugeLadeschwelle((sichtbar) => {
    s = weiter(s, { art: 'laden', sichtbar });
  }, uhr);
  schwelle.setze(true);
  bis(LADE_VERZOEGERUNG_MS - 1);
  assert.equal(anzeige(s).sichtbar, false);
  bis(LADE_VERZOEGERUNG_MS);
  assert.deepEqual(anzeige(s), { sichtbar: true, zustand: 'laedt', text: 'Lädt', gedrueckt: false });
  // Laden endet kurz danach, der Zeiger bleibt auf dem Knopf (Knopf wieder frei: kein Ort mehr)
  bis(LADE_VERZOEGERUNG_MS + 100);
  s = weiter(s, ziel(null));
  schwelle.setze(false);
  assert.equal(anzeige(s).zustand, 'laedt', 'Mindestdauer');
  bis(LADE_VERZOEGERUNG_MS + LADE_MINDESTDAUER_MS - 1);
  assert.equal(anzeige(s).sichtbar, true);
  bis(LADE_VERZOEGERUNG_MS + LADE_MINDESTDAUER_MS);
  assert.equal(anzeige(s).sichtbar, false);
  // kurzes Laden zeigt nichts
  s = weiter(s, ziel('laedt'));
  schwelle.setze(true);
  bis(jetzt + LADE_VERZOEGERUNG_MS - 50);
  schwelle.setze(false);
  bis(jetzt + 1000);
  assert.equal(anzeige(s).sichtbar, false);
  // Tastatur blendet auch „lädt“ aus
  s = nach(maus(5, 5), ziel('laedt'), { art: 'laden', sichtbar: true }, { art: 'taste' });
  assert.equal(anzeige(s).sichtbar, false);
});

test('Cursor 8: am Fensterrand wechselt das Schild die Seite (Maße der Marke mit Abstand, ohne Layout pro Bild)', () => {
  assert.equal(kante(100, 100, 120, 40, 1440, 900), '');
  assert.equal(kante(1400, 100, 120, 40, 1440, 900), 'x');
  assert.equal(kante(100, 880, 120, 40, 1440, 900), 'y');
  assert.equal(kante(1400, 880, 120, 40, 1440, 900), 'x y');
  assert.equal(kante(1320, 860, 120, 40, 1440, 900), '', 'genau bis zum Rand passt');
});

test('Cursor 9: Modul – gemeinsamer Takt, passive Lauscher, kein Scroll-Lauscher, kein Layout-Lesen, Schild aria-hidden', () => {
  const q = lies('src/lib/motion/cursor.ts');
  const code = q.replace(/^\s*\/\/.*$/gm, '');
  assert.doesNotMatch(code, /requestAnimationFrame/, 'nur über takt.ts');
  assert.match(code, /import \{ naechstesBild \} from '\.\/takt'/);
  assert.match(code, /import \{ erzeugeLadeschwelle, type Ladeschwelle \} from '@\/lib\/ladeschwelle'/, 'Ladeschwelle wiederverwendet');
  assert.doesNotMatch(code, /getBoundingClientRect|offsetWidth|offsetHeight|getComputedStyle|elementFromPoint/, 'kein Layout-Lesen');
  assert.doesNotMatch(code, /'scroll'|'wheel'|'touchmove'/, 'keine Scroll-Ereignisse');
  assert.doesNotMatch(code, /mix-blend|mixBlend/, 'keine Mischmodi');
  const lauscher = [...code.matchAll(/(\w+)\.addEventListener\('([a-z]+)', (\w+)(?:, ([^)]+))?\)/g)];
  assert.ok(lauscher.length >= 10, `Lauscher gefunden: ${lauscher.length}`);
  for (const [, wo, art, fn, optionen] of lauscher) {
    if (art === 'change') continue; // MediaQueryList
    // blur am Fenster ohne capture: Mit capture käme jeder blur eines Elements an, jeder Fokuswechsel blendete aus
    assert.equal(optionen, art === 'blur' ? 'nurFenster' : 'passiv', `${art} passiv${art === 'blur' ? ', ohne capture' : ''}`);
    if (art === 'blur') assert.equal(wo, 'window', 'blur nur am Fenster');
    // stopp() meldet mit denselben Optionen ab (sonst bliebe ein Lauscher mit capture hängen)
    assert.ok(code.includes(`${wo}.removeEventListener('${art}', ${fn}, ${optionen})`), `${art} wird in stopp() abgemeldet`);
  }
  assert.match(code, /const passiv = \{ passive: true, capture: true \} as const;/);
  assert.match(code, /const nurFenster = \{ passive: true, capture: false \} as const;/, 'blur ohne capture');
  assert.match(code, /schild\.setAttribute\('aria-hidden', 'true'\)/);
  assert.match(code, /schild\.setAttribute\('data-motion', CURSOR_KENNUNG\)/);
});

test('Cursor 10: Nachladen – erst nach der Hydrierung bei der ersten Mausbewegung, nur bei feinem Zeiger, im Wurzel-Layout', () => {
  const q = lies('src/components/cursor/Cursor.tsx');
  assert.match(q, /^'use client';/);
  assert.doesNotMatch(q, /^import (?!type )[^;]*from '@\/lib\/motion\/cursor'/m, 'kein statischer Import des Moduls (Z-10)');
  assert.match(q, /import\('@\/lib\/motion\/cursor'\)/, 'dynamischer Import');
  const fein = q.indexOf('if (!zeigerFein()) return;');
  const lauscher = q.indexOf("addEventListener('pointermove', los, { passive: true })");
  assert.ok(fein > 0 && lauscher > fein, 'grober Zeiger: kein Lauscher, kein Modul');
  assert.match(q, /if \(e\.pointerType !== 'mouse'\) return;/, 'nur die Maus lädt (nicht Finger oder Stift)');
  assert.match(q, /useEffect\(/, 'nach der Hydrierung');
  assert.match(q, /return null;/, 'rendert nichts');
  const layout = lies('src/app/(bestand)/layout.tsx');
  assert.match(layout, /import Cursor from '@\/components\/cursor\/Cursor';/);
  assert.match(layout, /<Cursor \/>/);
});

test('Cursor 11: CSS – über dem Inhalt, unter B-01, Übergänge nur mit Bewegung, Druck und erzwungene Farben ohne Schild', () => {
  const css = ohneKommentare(lies('src/app/bewegung.css'));
  const anfang = css.indexOf('.k-cursor {');
  const ende = css.indexOf('html[data-bewegung="ruhig"] {', anfang);
  assert.ok(anfang > 0 && ende > anfang, 'Block cursor vor dem Spiegel des Bewegungsschalters');
  const block = css.slice(anfang, ende);
  const regel = (sel) => block.match(new RegExp(`(?:^|\\n)${sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\{([^}]*)\\}`))?.[1] ?? '';
  const basis = regel('.k-cursor');
  assert.match(basis, /position: fixed;/);
  assert.match(basis, /pointer-events: none;/);
  assert.match(basis, /transition-property: none;/, 'die ruhige Übergangsregel (0,01 ms) erreicht das Schild nicht');
  // transition-property erbt nicht: auch Marke, Tafel, Kreuz und Beschriftung samt Pseudoelementen
  assert.match(regel('.k-cursor *,\n.k-cursor *::before,\n.k-cursor *::after'), /transition-property: none;/, 'alle Teile des Schilds');
  const ebene = Number(basis.match(/z-index: (\d+);/)?.[1]);
  const verlegen = Number(css.match(/\n\.verlegen \{[^}]*z-index: (\d+);/)?.[1]);
  assert.ok(ebene >= 50 && ebene < verlegen, `Ebene ${ebene} unter B-01 (${verlegen})`);
  // jede Regel mit transition oder animation hängt an html.k-bewegung ohne Notaus
  for (const m of block.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const [sel, rumpf] = [m[1].trim(), m[2]];
    if (sel.startsWith('@') || sel === 'to' || sel === 'from') continue;
    if (/(^|\s|;)(transition|animation)\s*:/.test(rumpf)) assert.match(sel, /^html\.k-bewegung:not\(\.k-notaus\) /, sel);
  }
  // Zustände ändern nur Deckkraft und Transformation, nie das Layout (keine Layout-Verschiebung, CLS 0)
  const zustandsRegeln = [...block.matchAll(/([^{}]+)\{([^}]*)\}/g)].filter((m) => /\[data-cursor-/.test(m[1]));
  assert.ok(zustandsRegeln.length >= 7, `Zustandsregeln gefunden: ${zustandsRegeln.length}`);
  for (const [, sel, rumpf] of zustandsRegeln) {
    for (const [, eigenschaft] of rumpf.matchAll(/(?:^|;)\s*([a-z-]+)\s*:/g)) {
      assert.ok(['opacity', 'translate', 'rotate', 'scale', 'transition', 'animation'].includes(eigenschaft), `${sel.trim()}: ${eigenschaft}`);
    }
  }
  // am Fensterrand wechselt die Marke die Seite über translate (Kante x, y und beide)
  const kanten = zustandsRegeln.filter(([, sel]) => sel.includes('data-cursor-kante'));
  assert.equal(kanten.length, 3);
  for (const [, sel, rumpf] of kanten) assert.match(rumpf, /^\s*translate: [^;]+;\s*$/, sel.trim());
  const marke = regel('.k-cursor-marke');
  assert.match(marke, /padding: calc\(var\(--spacing\) \* 4\);/, 'Innenabstand rundum gleich (Abstand zum Zeiger auf jeder Seite)');
  assert.doesNotMatch(marke, /padding-(top|right|bottom|left)/, 'kein einseitiger Innenabstand');
  // die endlose Drehung von „lädt“ läuft nur bei sichtbarem Schild (ausgeblendet ruht der Compositor)
  for (const m of block.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    if (/infinite/.test(m[2])) assert.match(m[1], /\[data-cursor-stand="an"\]/, m[1].trim());
  }
  assert.match(block, /@keyframes cursor-laedt \{\s*to \{\s*rotate: 90deg;/);
  assert.match(block, /@media print, \(forced-colors: active\) \{\s*\.k-cursor \{\s*display: none;/);
  assert.doesNotMatch(block, /prefers-reduced-motion|mix-blend-mode|will-change|\d+m?s\b/, 'keine Medienabfrage ohne Spiegel, keine Mischmodi, Dauern nur als Token');
  assert.match(regel('.k-cursor-schild'), /background-color: var\(--color-tinte\);[\s\S]*color: var\(--color-kalk\);/);
});
