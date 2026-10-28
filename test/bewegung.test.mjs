import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { REGISTER, KENNUNGEN, beobachteteKennungen, ladeKennungen, schwelleFuer, istRegistriert, entfallendeKennungen, SELBST, aliasKennungen, aufgeloest } from '../src/lib/motion/register.ts';
import { REGISTER_V4, ZWECKE, DAUER_TOKENS, KURVEN, LETZTE_STUFE_HOECHSTENS, REDUZIERT_ARTEN, NOTAUS_ARTEN } from '../src/lib/motion/register.ts';
import { CURSOR_KENNUNG, CURSOR_REGISTER, CURSOR_ZUSTAENDE } from '../src/lib/motion/cursor.ts';
import { STAFFEL_MAX } from '../src/components/momente/galerie-filter/daten.ts';
import { KOPFSKRIPT } from '../src/lib/motion/kopfskript.ts';

// Register laut Gestaltungskern v3 (K-007): neue Bewegungen nur mit Registereintrag. Die SVG-Bewegungen aus v2 sind seit
// E-037 (Entscheidung des Auftraggebers) fester Teil des Systems und nicht mehr als entfallend markiert.
const KERN_V3 = ['verlegen', 'seitenwechsel', 'intro', 'startbild', 'verband', 'leitachse', 'anriss', 'auftritt', 'aufklappen', 'druck', 'zustand', 'notiert', 'laden'];
const V2_SVG_E037 = ['sig-kreuzlinie', 'sig-flucht', 'szene-ablauf', 'sig-plan', 'einzugsband', 'fugenband'];
const ENTFALLEN_E009 = [];
// große Momente (E3-ORCH-02a, KERN v3.4 K-007); verband steht in KERN_V3
const MOMENTE_SCROLL = ['schichten', 'weg'];
const MOMENTE_SICHT = ['gefaelle-dusche', 'gefaelle-balkon', 'karte'];
const MOMENTE_INTERAKTION = ['formatregler', 'vorher-nachher', 'galerie-filter'];
const GROSSE_MOMENTE = [...MOMENTE_SCROLL, ...MOMENTE_SICHT, ...MOMENTE_INTERAKTION];
// Ruhe (E-047, KERN v3.6 K-016)
const RUHE_E047 = ['karussell'];
// Eingang ohne Vorhang (E-067-4, UM-E3-EIN): Eingang und Zeilenmasken; intro (B-02) und startbild bleiben als Alias
const EINGANG_E067 = ['eingang', 'zeilenmaske'];
const ALIASE_E067 = { intro: 'eingang', startbild: 'eingang' };
// Cursor „Fugenkreuz“ (E-067-1, UM-E3-CURSOR; eingetragen in UM-E3-REG): Schild am Systemzeiger, steuert sich selbst
const CURSOR_E067 = ['cursor'];

test('Bewegung 1: Register enthält genau die Einträge von KERN v3, die SVG-Bewegungen aus v2 (E-037), die großen Momente, den Eingang (E-067-4) und den Cursor (E-067-1), keine entfällt', () => {
  assert.deepEqual([...KENNUNGEN].sort(), [...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE, ...RUHE_E047, ...EINGANG_E067, ...CURSOR_E067, ...ENTFALLEN_E009].sort());
  assert.deepEqual(entfallendeKennungen().sort(), [...ENTFALLEN_E009].sort());
  for (const k of [...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE, ...RUHE_E047, ...EINGANG_E067, ...CURSOR_E067]) assert.ok(!REGISTER[k].entfaellt, `${k} gehört zum System`);
});

test('Bewegung 1b: B-01, Plan-Morph, Eingang, Zeilenmasken und Cursor steuern sich selbst; intro und startbild sind Aliase des Eingangs (E-067-4)', () => {
  assert.deepEqual([...SELBST].sort(), ['cursor', 'eingang', 'seitenwechsel', 'verlegen', 'zeilenmaske']);
  assert.equal(REGISTER.cursor.ausloeser, 'interaktion');
  assert.equal(CURSOR_KENNUNG, 'cursor', 'das Schild trägt die registrierte Kennung');
  for (const k of SELBST) {
    assert.ok(istRegistriert(k));
    assert.ok(!ladeKennungen().includes(k));
    assert.ok(!beobachteteKennungen(true).includes(k) && !beobachteteKennungen(false).includes(k));
  }
  assert.deepEqual(aliasKennungen().sort(), Object.keys(ALIASE_E067).sort());
  for (const [alt, neu] of Object.entries(ALIASE_E067)) {
    assert.ok(istRegistriert(alt), `${alt} bleibt registriert`);
    assert.equal(REGISTER[alt].alias, neu);
    assert.equal(aufgeloest(alt), neu);
    assert.ok(istRegistriert(neu) && !REGISTER[neu].alias, `${neu} ist selbst kein Alias`);
    assert.equal(REGISTER[alt].ausloeser, REGISTER[neu].ausloeser, `${alt} trägt den Auslöser von ${neu}`);
    assert.ok(!SELBST.includes(alt), `${alt} hat keine eigene Steuerung mehr`);
    assert.ok(!ladeKennungen().includes(alt), `${alt}: kein Ladezustand`);
    assert.ok(!beobachteteKennungen(true).includes(alt) && !beobachteteKennungen(false).includes(alt), `${alt}: kein Beobachter`);
  }
  assert.equal(aufgeloest('auftritt'), 'auftritt');
});

test('Bewegung 1c: register.json führt dieselben Kennungen und Aliase wie register.ts', () => {
  const json = JSON.parse(fs.readFileSync(new URL('../_werkstatt/register.json', import.meta.url), 'utf8'));
  assert.deepEqual([...json.kennungen].sort(), [...KENNUNGEN].sort());
  assert.deepEqual(json.aliase, ALIASE_E067);
  assert.deepEqual([...json.v4].sort(), [...EINGANG_E067, ...CURSOR_E067].sort());
});

test('Bewegung 2: sig-plan wird nur auf groben Zeigegeräten über Sichtbarkeit ausgelöst', () => {
  assert.ok(beobachteteKennungen(true).includes('sig-plan'));
  assert.ok(!beobachteteKennungen(false).includes('sig-plan'));
  assert.ok(beobachteteKennungen(false).includes('auftritt'));
  assert.ok(!beobachteteKennungen(true).includes('leitachse'), 'scroll-gebundene Einträge laufen über CSS, nicht über den Beobachter');
});

test('Bewegung 3: Ladeeinträge und Schwellen', () => {
  // E4-NACH-02: einzugsband legt sich beim Laden frei (CSS ab dem ersten Bild) – Ladeeintrag statt Beobachter
  assert.deepEqual(ladeKennungen().sort(), ['einzugsband', 'sig-flucht', 'sig-kreuzlinie']);
  assert.ok(!beobachteteKennungen(true).includes('einzugsband') && !beobachteteKennungen(false).includes('einzugsband'));
  assert.equal(schwelleFuer('anriss'), 0.5);
  assert.equal(schwelleFuer('auftritt'), 0.2);
  assert.equal(schwelleFuer('unbekannt'), 0.2);
  for (const k of KENNUNGEN) {
    const s = REGISTER[k].schwelle;
    if (s !== undefined) assert.ok(s > 0 && s <= 1, `${k}: Schwelle im Bereich (0, 1]`);
  }
});

test('Bewegung 4: unbekannte Kennungen sind nicht registriert', () => {
  assert.equal(istRegistriert('auftritt'), true);
  assert.equal(istRegistriert('hover-lift'), false);
});

test('Bewegung 5: Kopfskript setzt k-bewegung nur ohne reduzierte Bewegung und hat ein Notaus nach 2 s', () => {
  const klassen = new Set();
  const doc = { documentElement: { classList: { add: (c) => klassen.add(c), contains: (c) => klassen.has(c) } } };
  let zeitgeber = null;
  const lauf = (bevorzugtReduziert) => {
    klassen.clear(); zeitgeber = null;
    const fenster = { matchMedia: (q) => ({ matches: q.includes('no-preference') ? !bevorzugtReduziert : bevorzugtReduziert }) };
    new Function('window', 'document', 'setTimeout', KOPFSKRIPT)(fenster, doc, (fn, ms) => { zeitgeber = { fn, ms }; });
  };
  lauf(true);
  assert.equal(klassen.has('k-bewegung'), false, 'reduzierte Bewegung: keine Startklasse');
  lauf(false);
  assert.equal(klassen.has('k-bewegung'), true);
  assert.equal(zeitgeber.ms, 2000);
  zeitgeber.fn();
  assert.equal(klassen.has('k-notaus'), true, 'ohne Bereitmeldung des Moduls wird alles sichtbar');
  lauf(false);
  klassen.add('k-modul');
  zeitgeber.fn();
  assert.equal(klassen.has('k-notaus'), false, 'mit Bereitmeldung bleibt die Bewegung aktiv');
});

test('Bewegung 6: scroll-gebundene große Momente laufen über CSS, ohne Beobachter und ohne Ladezustand', () => {
  for (const k of MOMENTE_SCROLL) {
    assert.equal(REGISTER[k].ausloeser, 'scroll', k);
    assert.ok(!beobachteteKennungen(true).includes(k) && !beobachteteKennungen(false).includes(k), k);
    assert.ok(!ladeKennungen().includes(k), k);
  }
});

test('Bewegung 7: große Momente mit Sichtbarkeit starten bei 0,4 auf jedem Zeigegerät', () => {
  for (const k of MOMENTE_SICHT) {
    assert.equal(schwelleFuer(k), 0.4, k);
    assert.ok(beobachteteKennungen(true).includes(k) && beobachteteKennungen(false).includes(k), k);
    assert.ok(!ladeKennungen().includes(k), k);
  }
});

test('Bewegung 8: Regler und Auswahl folgen der Eingabe, ohne Beobachter und ohne Selbststeuerung', () => {
  for (const k of MOMENTE_INTERAKTION) {
    assert.equal(REGISTER[k].ausloeser, 'interaktion', k);
    assert.ok(!beobachteteKennungen(true).includes(k) && !beobachteteKennungen(false).includes(k), k);
    assert.ok(!SELBST.includes(k), k);
    assert.ok(!ladeKennungen().includes(k), k);
  }
});

test('Bewegung 9: Karussell (E-047) läuft im Baustein, ohne Beobachter und ohne Ladezustand', () => {
  assert.equal(REGISTER.karussell.ausloeser, 'interaktion');
  assert.ok(!beobachteteKennungen(true).includes('karussell') && !beobachteteKennungen(false).includes('karussell'));
  assert.ok(!ladeKennungen().includes('karussell'));
});

// Register v4 (UM-E3-REG; AUFTRAG Abschnitt 8, K-008 Regeln v4): je Kennung Zweck, Stufen aus Tokens, ruhige Fassung,
// Notaus und die Cursor-Zustände. register.ts ist die Quelle, register.json die Maschinenfassung für die Werkzeuge.
const GLOBALS_CSS = fs.readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
const BEWEGUNG_CSS = fs.readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8');
const REGISTER_JSON = JSON.parse(fs.readFileSync(new URL('../_werkstatt/register.json', import.meta.url), 'utf8'));
const OHNE_ZEIT = ['scroll', 'eingabe'];

function pruefeStufen(name, stufen) {
  assert.ok(stufen.dauer.length > 0, `${name}: mindestens eine Dauer`);
  for (const d of stufen.dauer) {
    if (OHNE_ZEIT.includes(d)) continue;
    assert.ok(DAUER_TOKENS.includes(d), `${name}: ${d} ist ein Dauer-Token`);
    assert.match(GLOBALS_CSS, new RegExp(`${d}:\\s*\\d`), `${name}: ${d} steht in globals.css`);
  }
  for (const c of stufen.kurve) {
    assert.ok(KURVEN.includes(c), `${name}: Kurve ${c}`);
    if (c !== 'linear') assert.match(GLOBALS_CSS, new RegExp(`${c}:\\s*cubic-bezier\\(`), `${name}: ${c} steht in globals.css`);
  }
  if (stufen.dauer.includes('scroll')) assert.deepEqual([...stufen.dauer, ...stufen.kurve], ['scroll', 'linear'], `${name}: scrollgebunden, linear`);
  if (stufen.dauer.includes('eingabe')) assert.deepEqual([...stufen.dauer, ...stufen.kurve], ['eingabe'], `${name}: folgt der Eingabe, ohne Kurve`);
  if (!stufen.dauer.some((d) => OHNE_ZEIT.includes(d))) assert.ok(stufen.kurve.length > 0, `${name}: zur Dauer gehört eine Kurve`);
}

test('Bewegung 10: Register v4 führt jede Kennung mit Zweck, Stufen aus Tokens, ruhiger Fassung und Notaus; Aliase lösen auf; kein Laufzeitcode liest es (Z-10)', () => {
  assert.deepEqual(Object.keys(REGISTER_V4).sort(), KENNUNGEN.filter((k) => !REGISTER[k].alias).sort());
  for (const alt of aliasKennungen()) assert.ok(!(alt in REGISTER_V4) && REGISTER_V4[aufgeloest(alt)], `${alt} löst auf einen Eintrag auf`);
  for (const [k, e] of Object.entries(REGISTER_V4)) {
    assert.ok(ZWECKE.includes(e.zweck), `${k}: Zweck aus AUFTRAG Abschnitt 8`);
    assert.ok(e.was.trim().length > 0, `${k}: was die Bewegung zeigt`);
    pruefeStufen(k, e.stufen);
    assert.ok(REDUZIERT_ARTEN.includes(e.reduziert.art) && e.reduziert.text.trim().length > 0, `${k}: ruhige Fassung`);
    if (e.reduziert.art === 'gleich') assert.deepEqual([...e.stufen.dauer], ['eingabe'], `${k}: „gleich“ nur, wenn nichts in der Zeit läuft`);
    assert.ok(NOTAUS_ARTEN.includes(e.notaus), `${k}: Notaus`);
    assert.equal(e.zustaende === undefined, k !== 'cursor', `${k}: Zustände nur beim Cursor`);
  }
  // B-01 und Plan-Morph werden bei reduzierter Bewegung zur Überblendung (K-008), Regler bleiben gleich
  assert.equal(REGISTER_V4.verlegen.reduziert.art, 'ueberblendung');
  assert.equal(REGISTER_V4.seitenwechsel.reduziert.art, 'ueberblendung');
  for (const k of MOMENTE_INTERAKTION.filter((m) => m !== 'galerie-filter')) assert.equal(REGISTER_V4[k].reduziert.art, 'gleich', k);
  // Leitfaden (UM-E3-LEIT): reduziert Grundschicht, im Notaus läuft er weiter
  assert.equal(REGISTER_V4.leitachse.reduziert.art, 'grundform');
  assert.equal(REGISTER_V4.leitachse.notaus, 'laeuft');
  // Z-10: register.ts steht über bewegung.ts im ersten Laden. Register v4 bleibt nur dann draußen, wenn außer register.ts
  // kein Quelltext unter src seine Werte nennt; sonst hinge es allein am Tree-Shaking des Baus.
  const src = new URL('../src', import.meta.url).pathname;
  const V4_WERTE = /(?<![\w$])(?:REGISTER_V4|ZWECKE|DAUER_TOKENS|KURVEN|LETZTE_STUFE_HOECHSTENS|REDUZIERT_ARTEN|NOTAUS_ARTEN)(?![\w$])/;
  const quellen = quelltexte(src).filter((d) => d !== `${src}/lib/motion/register.ts`);
  assert.ok(quellen.some((d) => d.endsWith('/lib/motion/bewegung.ts')), 'der Scan erfasst das Bewegungsmodul');
  for (const datei of quellen) {
    assert.doesNotMatch(ohneKommentare(fs.readFileSync(datei, 'utf8')), V4_WERTE, `${datei.slice(src.length)}: liest Register v4; das gehört nicht in den Laufzeitcode`);
  }
});

/** Letzte Staffelstufe je Kennung in bewegung.css. Jede Regel mit var(--staffel) gehört zum letzten data-motion ihres
 *  Selektors; die Galerie staffelt über --galerie-stufe bis STAFFEL_MAX. */
function staffelstufenInCss(css) {
  const ohneKommentar = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const stufen = {};
  for (const [, kopf, rumpf] of ohneKommentar.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!rumpf.includes('var(--staffel)')) continue;
    const kennungen = new Set(kopf.split(',').map((sel) => [...sel.matchAll(/\[data-motion="([a-z0-9-]+)"\]/g)].at(-1)?.[1]));
    assert.equal(kennungen.size, 1, `Staffel ohne eindeutige Kennung: ${kopf.trim()}`);
    const [kennung] = kennungen;
    assert.ok(kennung, `Staffel ohne data-motion im Selektor: ${kopf.trim()}`);
    const vorkommen = rumpf.match(/var\(--staffel\)/g).length;
    const werte = [];
    for (const m of rumpf.matchAll(/var\(--staffel\)\s*\*\s*(?:(\d+)(?:\s*\*\s*min\(var\(--[\w-]+(?:,\s*\d+)?\),\s*(\d+)\))?|var\(--galerie-stufe\b)/g)) {
      werte.push(m[1] === undefined ? STAFFEL_MAX : Number(m[1]) * Number(m[2] ?? 1));
    }
    assert.equal(werte.length, vorkommen, `Staffel nicht lesbar: ${kopf.trim()}`);
    stufen[kennung] = Math.max(stufen[kennung] ?? 0, ...werte);
  }
  return stufen;
}

test('Bewegung 11: Staffel höchstens acht Takte (Stufen 0 bis 7); karte angepasst, offene Befunde nur aus register.json', () => {
  assert.equal(LETZTE_STUFE_HOECHSTENS, 7);
  assert.equal(STAFFEL_MAX, LETZTE_STUFE_HOECHSTENS, 'Galerie und Register zählen gleich');
  const css = staffelstufenInCss(BEWEGUNG_CSS);
  for (const [k, e] of Object.entries(REGISTER_V4)) assert.equal(e.stufen.letzteStufe, css[k], `${k}: letzte Staffelstufe wie in bewegung.css`);
  for (const k of Object.keys(css)) assert.ok(k in REGISTER_V4, `${k}: Staffel in bewegung.css ohne Registereintrag`);
  assert.ok(css.karte <= LETZTE_STUFE_HOECHSTENS, `karte: Staffel bis Stufe ${css.karte}`);
  // Befunde über der Grenze stehen mit Grund und Vorschlag in register.json; wird einer behoben, fällt er hier heraus
  const darueber = Object.entries(REGISTER_V4).filter(([, e]) => (e.stufen.letzteStufe ?? 0) > LETZTE_STUFE_HOECHSTENS).map(([k]) => k);
  assert.deepEqual(darueber.sort(), Object.keys(REGISTER_JSON.staffel_offen).sort());
});

test('Bewegung 12: die sechs Cursor-Zustände stehen im Register v4, mit derselben Beschriftung wie am Schild', () => {
  assert.ok(istRegistriert(CURSOR_KENNUNG) && SELBST.includes(CURSOR_KENNUNG));
  const zustaende = REGISTER_V4.cursor.zustaende;
  assert.deepEqual(Object.keys(zustaende), [...CURSOR_ZUSTAENDE]);
  assert.equal(CURSOR_ZUSTAENDE.length, 6);
  for (const z of CURSOR_ZUSTAENDE) {
    assert.equal(zustaende[z].beschriftung, CURSOR_REGISTER[z].text, `${z}: Beschriftung`);
    assert.equal(zustaende[z].zweck, 'rueckmeldung', z);
    assert.equal(CURSOR_REGISTER[z].zweck, 'Rückmeldung', z);
    assert.ok(zustaende[z].wo.trim() && zustaende[z].ruhig.trim(), `${z}: Ort und ruhige Fassung`);
    pruefeStufen(`cursor.${z}`, zustaende[z].stufen);
    for (const d of zustaende[z].stufen.dauer) assert.ok(REGISTER_V4.cursor.stufen.dauer.includes(d), `${z}: ${d} auch an der Kennung`);
  }
  assert.equal(REGISTER_V4.cursor.notaus, 'ruhig');
});

test('Bewegung 13: register.json spiegelt das Register v4 aus register.ts', () => {
  const v4 = REGISTER_JSON.register_v4;
  assert.deepEqual(v4.eintraege, JSON.parse(JSON.stringify(REGISTER_V4)));
  assert.deepEqual(v4.regeln.zwecke, [...ZWECKE]);
  assert.deepEqual(v4.regeln.dauer_tokens, [...DAUER_TOKENS]);
  assert.deepEqual(v4.regeln.kurven, [...KURVEN]);
  assert.deepEqual(v4.regeln.reduziert_arten, [...REDUZIERT_ARTEN]);
  assert.deepEqual(v4.regeln.notaus_arten, [...NOTAUS_ARTEN]);
  assert.equal(v4.regeln.letzte_stufe_hoechstens, LETZTE_STUFE_HOECHSTENS);
  assert.equal(REGISTER_JSON.entscheidungen.fugenband, REGISTER_V4.fugenband.ohneOrt);
});

function quelltexte(ordner) {
  return fs.readdirSync(ordner, { withFileTypes: true }).flatMap((e) => {
    const pfad = `${ordner}/${e.name}`;
    if (e.isDirectory()) return quelltexte(pfad);
    return /\.(tsx?|jsx?)$/.test(e.name) ? [pfad] : [];
  });
}

/** Quelltext ohne Block- und Zeilenkommentare (`://` in Adressen bleibt stehen). */
function ohneKommentare(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
}

test('Bewegung 14: fugenband ist gebaut, aber ohne Ort (UM-E3-REG); weg steht nur im Schaufenster (E-048)', () => {
  assert.deepEqual(Object.keys(REGISTER_V4).filter((k) => REGISTER_V4[k].ohneOrt).sort(), ['fugenband', 'weg']);
  assert.ok(istRegistriert('fugenband') && !REGISTER.fugenband.entfaellt, 'bleibt Teil des Systems (E-037)');
  assert.match(BEWEGUNG_CSS, /\.fugenband-rot\s*\{[^}]*background: var\(--color-laser\)/, 'das CSS bleibt bereit');
  const wurzel = new URL('../src', import.meta.url).pathname;
  const bauteile = [...quelltexte(`${wurzel}/components`), ...quelltexte(`${wurzel}/app`)];
  for (const datei of bauteile) {
    const text = ohneKommentare(fs.readFileSync(datei, 'utf8'));
    assert.doesNotMatch(text,/(?<![\w-])fugenband(?:-rot)?(?![\w-])/, `${datei}: trägt die Bewegung fugenband; dann Ort und Register nachführen`);
  }
  const mitWeg = bauteile.filter((d) => /momente\/weg/.test(fs.readFileSync(d, 'utf8')));
  assert.deepEqual(mitWeg.map((d) => d.slice(wurzel.length)), ['/app/(bestand)/werkstatt-schaufenster/weg/page.dev.tsx']);
});
