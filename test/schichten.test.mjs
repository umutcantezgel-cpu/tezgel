import test from 'node:test';
import assert from 'node:assert/strict';
import { SCHICHTEN, UNTERSCHRIFT, ZEICHNUNG, FLIESE_B, FLIESEN_X, FUGEN_X, schicht, zickzack } from '../src/components/momente/schichten/daten.ts';
// Großer Moment „schichten“ (E3-GRAF-01): Wortlaut aus _werkstatt/texte/bad.md und Maße der Zeichnung.
test('Schichten 1: fünf Schichten von unten nach oben, Wortlaut wie im Seitentext', () => {
  assert.equal(UNTERSCHRIFT, 'So ist eine Fläche im Bad aufgebaut, von unten nach oben.');
  assert.deepEqual(SCHICHTEN.map((s) => [s.name, s.satz]), [
    ['Untergrund', 'Darauf wird alles aufgebaut.'],
    ['Abdichtung', 'Die Abdichtung liegt zwischen Untergrund und Kleber.'],
    ['Kleber', 'Der Kleber hält die Fliese fest auf der Abdichtung.'],
    ['Fliese', 'Die Fliese liegt oben, und darauf stehen Sie im Bad.'],
    ['Fuge', 'Die Fugen füllen die Lücken zwischen den Fliesen.'],
  ]);
});
test('Schichten 2: die Schichten liegen lückenlos aufeinander und im Bild', () => {
  const [u, a, k, f, g] = ['untergrund', 'abdichtung', 'kleber', 'fliese', 'fuge'].map((n) => schicht(n));
  assert.equal(a.unten, u.oben);
  assert.equal(k.unten, a.oben);
  assert.equal(f.unten, k.oben);
  assert.deepEqual([g.oben, g.unten], [f.oben, f.unten], 'Fuge auf Höhe der Fliese');
  for (const s of SCHICHTEN) assert.ok(s.oben < s.unten && s.oben >= 0 && s.unten <= ZEICHNUNG.hoehe, s.name);
  assert.ok(f.oben - ZEICHNUNG.weg >= 0, 'Startlage der Fliesen bleibt in der Zeichenfläche');
});
test('Schichten 3: vier Fliesen und drei Fugen füllen die Breite genau', () => {
  assert.equal(FLIESE_B, 53);
  assert.deepEqual([...FLIESEN_X], [8, 65, 122, 179]);
  assert.deepEqual([...FUGEN_X], [61, 118, 175]);
  assert.equal(FLIESEN_X.at(-1) + FLIESE_B, ZEICHNUNG.rechts);
  FUGEN_X.forEach((x, i) => assert.equal(x + ZEICHNUNG.fuge, FLIESEN_X[i + 1]));
});
test('Schichten 4: die Zahnung des Klebers bleibt im Kleberbett', () => {
  const k = schicht('kleber');
  const d = zickzack(ZEICHNUNG.links, ZEICHNUNG.rechts, k.unten, k.oben + 2, 4);
  const punkte = [...d.matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
  assert.equal(punkte.length, 57);
  assert.deepEqual(punkte[0], [ZEICHNUNG.links, k.unten]);
  assert.deepEqual(punkte.at(-1), [ZEICHNUNG.rechts, k.unten]);
  for (const [, y] of punkte) assert.ok(y >= k.oben && y <= k.unten);
});
test('Schichten 5: Texte ohne Gedankenstrich (K-010)', () => {
  for (const t of [UNTERSCHRIFT, ...SCHICHTEN.flatMap((s) => [s.name, s.satz])]) assert.ok(!/[–—]| - /.test(t), t);
});
