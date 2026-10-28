import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { REGISTER, KENNUNGEN, beobachteteKennungen, ladeKennungen, schwelleFuer, istRegistriert, entfallendeKennungen, SELBST, aliasKennungen, aufgeloest } from '../src/lib/motion/register.ts';
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

test('Bewegung 1: Register enthält genau die Einträge von KERN v3, die SVG-Bewegungen aus v2 (E-037), die großen Momente und den Eingang (E-067-4), keine entfällt', () => {
  assert.deepEqual([...KENNUNGEN].sort(), [...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE, ...RUHE_E047, ...EINGANG_E067, ...ENTFALLEN_E009].sort());
  assert.deepEqual(entfallendeKennungen().sort(), [...ENTFALLEN_E009].sort());
  for (const k of [...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE, ...RUHE_E047, ...EINGANG_E067]) assert.ok(!REGISTER[k].entfaellt, `${k} gehört zum System`);
});

test('Bewegung 1b: B-01, Plan-Morph, Eingang und Zeilenmasken steuern sich selbst; intro und startbild sind Aliase des Eingangs (E-067-4)', () => {
  assert.deepEqual([...SELBST].sort(), ['eingang', 'seitenwechsel', 'verlegen', 'zeilenmaske']);
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
  assert.deepEqual([...json.v4].sort(), [...EINGANG_E067].sort());
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
