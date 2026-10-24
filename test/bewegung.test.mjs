import test from 'node:test';
import assert from 'node:assert/strict';
import { REGISTER, KENNUNGEN, beobachteteKennungen, ladeKennungen, schwelleFuer, istRegistriert, entfallendeKennungen, SELBST } from '../src/lib/motion/register.ts';
import { KOPFSKRIPT } from '../src/lib/motion/kopfskript.ts';

// Register laut Gestaltungskern v3 (K-007): neue Bewegungen nur mit Registereintrag. Die SVG-Bewegungen aus v2 sind seit
// E-037 (Entscheidung des Auftraggebers) fester Teil des Systems und nicht mehr als entfallend markiert.
const KERN_V3 = ['verlegen', 'seitenwechsel', 'intro', 'startbild', 'verband', 'leitachse', 'anriss', 'auftritt', 'aufklappen', 'druck', 'zustand', 'notiert', 'laden'];
const V2_SVG_E037 = ['sig-kreuzlinie', 'sig-flucht', 'szene-ablauf', 'sig-plan', 'einzugsband', 'fugenband'];
const ENTFALLEN_E009 = [];

test('Bewegung 1: Register enthält genau die Einträge von KERN v3 und die SVG-Bewegungen aus v2 (E-037), keine entfällt', () => {
  assert.deepEqual([...KENNUNGEN].sort(), [...KERN_V3, ...V2_SVG_E037, ...ENTFALLEN_E009].sort());
  assert.deepEqual(entfallendeKennungen().sort(), [...ENTFALLEN_E009].sort());
  for (const k of [...KERN_V3, ...V2_SVG_E037]) assert.ok(!REGISTER[k].entfaellt, `${k} gehört zum System`);
});

test('Bewegung 1b: B-01, Plan-Morph und B-02 steuern sich selbst, das Startbild legt sich beim Eintritt frei (Sicht 0,4; E-037)', () => {
  assert.deepEqual([...SELBST].sort(), ['intro', 'seitenwechsel', 'verlegen']);
  assert.ok(beobachteteKennungen(true).includes('startbild') && beobachteteKennungen(false).includes('startbild'));
  assert.equal(schwelleFuer('startbild'), 0.4);
  for (const k of SELBST) {
    assert.ok(istRegistriert(k));
    assert.ok(!ladeKennungen().includes(k));
    assert.ok(!beobachteteKennungen(true).includes(k) && !beobachteteKennungen(false).includes(k));
  }
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
