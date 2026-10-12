import test from 'node:test';
import assert from 'node:assert/strict';
import { REGISTER, KENNUNGEN, beobachteteKennungen, ladeKennungen, schwelleFuer, istRegistriert } from '../src/lib/motion/register.ts';
import { KOPFSKRIPT } from '../src/lib/motion/kopfskript.ts';

// Register laut Gestaltungskern (K-007): 16 Einträge – neue Bewegungen nur mit Registereintrag.
const KERN_REGISTER = ['sig-kreuzlinie', 'sig-flucht', 'szene-ablauf', 'sig-plan', 'einzugsband', 'verband', 'fugenband', 'leitachse',
  'anriss', 'auftritt', 'aufklappen', 'druck', 'zustand', 'notiert', 'laden', 'seitenwechsel'];

test('Bewegung 1: Register enthält genau die 16 Einträge des Gestaltungskerns', () => {
  assert.deepEqual([...KENNUNGEN].sort(), [...KERN_REGISTER].sort());
});

test('Bewegung 2: sig-plan wird nur auf groben Zeigegeräten über Sichtbarkeit ausgelöst', () => {
  assert.ok(beobachteteKennungen(true).includes('sig-plan'));
  assert.ok(!beobachteteKennungen(false).includes('sig-plan'));
  assert.ok(beobachteteKennungen(false).includes('auftritt'));
  assert.ok(!beobachteteKennungen(true).includes('leitachse'), 'scroll-gebundene Einträge laufen über CSS, nicht über den Beobachter');
});

test('Bewegung 3: Ladeeinträge und Schwellen', () => {
  assert.deepEqual(ladeKennungen().sort(), ['sig-flucht', 'sig-kreuzlinie']);
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
