// Tests der reinen Lesbarkeitslogik (node:test). Lauf: node --test _werkstatt/werkzeuge/tests-logik/lesbarkeit.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  silben, saetze, woerter, flesch, striche, bindestrichwoerter, floskeln,
} from '../lesbarkeit-logik.mjs';

const REGELN = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'regeln');
const floskelRegeln = JSON.parse(fs.readFileSync(path.join(REGELN, 'floskeln.json'), 'utf8'));
const erlaubt = JSON.parse(fs.readFileSync(path.join(REGELN, 'bindestrich-erlaubt.json'), 'utf8'));

test('silben: Fliese, Badezimmer, Abdichtung, bodengleiche, Dusche, Ausgleich, Aßlar', () => {
  assert.equal(silben('Fliese'), 2);
  assert.equal(silben('Badezimmer'), 4);
  assert.equal(silben('Abdichtung'), 3);
  assert.equal(silben('bodengleiche'), 4);
  assert.equal(silben('Dusche'), 2);
  assert.equal(silben('Ausgleich'), 2);
  assert.equal(silben('Aßlar'), 2);
});

test('silben: Doppelvokal ea ist keine Diphthong-Gruppe (Theater = 3)', () => {
  assert.equal(silben('Theater'), 3);
});

test('silben: mindestens 1, auch ohne Vokal', () => {
  assert.equal(silben('Bst'), 1);
  assert.equal(silben(''), 1);
});

test('saetze: z. B. und am Montag ergeben 2 Sätze', () => {
  assert.equal(saetze('Wir kommen z. B. am Montag. Dann messen wir.').length, 2);
});

test('saetze: 1.200 teilt nicht, ergibt 1 Satz', () => {
  assert.equal(saetze('Das kostet 1.200 Euro.').length, 1);
});

test('saetze: Ordinalzahl „23. Oktober“ teilt nicht, der Satz nach dem Oktober-Punkt schon', () => {
  assert.equal(saetze('Wir starten am 23. Oktober. Dann messen wir.').length, 2);
});

test('saetze: Dr. teilt nicht, Schulz. teilt', () => {
  assert.deepEqual(saetze('Das ist Dr. Schulz. Er kommt.'), ['Das ist Dr. Schulz.', 'Er kommt.']);
});

test('woerter: Zahl mit Tausenderpunkt zählt als ein Wort (4 Wörter)', () => {
  const w = woerter('Das kostet 1.200 Euro');
  assert.equal(w.length, 4);
  assert.ok(w.includes('1.200'));
});

test('striche: Bad – fertig ergibt 1', () => {
  assert.equal(striche('Bad – fertig').length, 1);
});

test('striche: ASCII-Bindestrich nur mit Leerzeichen davor und danach zählt', () => {
  assert.equal(striche('Bad - fertig').length, 1);
  assert.equal(striche('Bad-fertig').length, 0);
});

test('bindestrichwoerter: Vor-Ort-Aufmaß und E-Mail ergibt genau Vor-Ort-Aufmaß', () => {
  const treffer = bindestrichwoerter('Vor-Ort-Aufmaß und E-Mail', erlaubt);
  assert.deepEqual(treffer.map((t) => t.wort), ['Vor-Ort-Aufmaß']);
});

test('bindestrichwoerter: URL, Datum, Telefonnummer und E-Mail-Adresse sind ausgenommen', () => {
  const text = 'Mehr unter https://www.tezgel.de/untergrund-abdichtung/din-18534, Stand 2026-10-23, Tel. 06441-12345, info@tezgel.de';
  assert.deepEqual(bindestrichwoerter(text, erlaubt), []);
});

test('bindestrichwoerter: Präfix E-Mail- zählt als erlaubt, Groß und klein egal', () => {
  assert.deepEqual(bindestrichwoerter('E-Mail-Adresse angeben', erlaubt), []);
  assert.deepEqual(bindestrichwoerter('e-mail schreiben', erlaubt), []);
});

// Die Liste führt seit 583656d auch die gebeugten Formen (nahtlose, nahtloser …); der Test nahm „nahtloser“ noch als
// Gegenbeispiel und war seitdem rot (E-032). Gegenbeispiel für die Wortgrenze ist jetzt ein Wort, das nicht in der Liste steht.
test('floskeln: nahtlos wird nur als ganzes Wort gefunden („Nahtlosigkeit“ nicht), gebeugte Formen der Liste schon', () => {
  assert.equal(floskeln('Eine Nahtlosigkeit gibt es nicht', floskelRegeln).length, 0);
  const treffer = floskeln('Das passt nahtlos.', floskelRegeln);
  assert.deepEqual(treffer.map((t) => t.treffer), ['nahtlos']);
  assert.deepEqual(floskeln('Ein nahtloser Übergang', floskelRegeln).map((t) => t.treffer), ['nahtloser']);
});

test('floskeln: Stakkato „Dicht. Sauber. Termintreu.“ und „nicht nur … sondern auch“ werden gefunden', () => {
  assert.deepEqual(floskeln('Dicht. Sauber. Termintreu.', floskelRegeln).map((t) => t.treffer), ['Stakkato aus kurzen Ein-Wort-Sätzen']);
  assert.deepEqual(floskeln('Wir bieten nicht nur Fliesen, sondern auch Bäder.', floskelRegeln).map((t) => t.treffer), ['nicht nur … sondern auch']);
});

test('floskeln: Muster „Begriff: Erklärung“ nur auf Überschriften', () => {
  assert.equal(floskeln('Begriff: Erklärung im Fließtext', floskelRegeln).length, 0);
  const treffer = floskeln('Text ohne Doppelpunkt', floskelRegeln, { ueberschriften: ['Was wir tun: Bad und Dusche'] });
  assert.deepEqual(treffer.map((t) => t.art), ['muster']);
});

test('flesch: Die Dusche ist barrierefrei. Wir messen den Untergrund. ergibt 66,3 (±0,5, von Hand gerechnet)', () => {
  // Hand: 2 Sätze, 8 Wörter, Silben 1+2+1+4 und 1+2+1+3 = 15; mittlere Satzlänge 4; Silben je Wort 15/8 = 1,875.
  // 180 − 4 − 58,5 × 1,875 = 66,3125.
  assert.ok(Math.abs(flesch('Die Dusche ist barrierefrei. Wir messen den Untergrund.') - 66.3) <= 0.5);
});

test('flesch: Wir messen. Dann bauen wir. ergibt 95,6 (±0,5, von Hand gerechnet)', () => {
  // Hand: 2 Sätze, 5 Wörter, Silben 1+2 und 1+2+1 = 7; mittlere Satzlänge 2,5; Silben je Wort 7/5 = 1,4.
  // 180 − 2,5 − 58,5 × 1,4 = 95,6.
  assert.ok(Math.abs(flesch('Wir messen. Dann bauen wir.') - 95.6) <= 0.5);
});
