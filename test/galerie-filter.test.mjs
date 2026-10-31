import test from 'node:test';
import assert from 'node:assert/strict';
import { ARBEITEN } from '../src/config/arbeiten.ts';
import { GLOSSAR } from '../src/config/glossar.ts';
import { GALERIE, GRUPPEN, SATZ, STAFFEL_MAX, anzahl, ansage, blendetEin, istSichtbar, stufen } from '../src/components/momente/galerie-filter/daten.ts';
import { REFERENZEN } from '../src/inhalte/referenzen.ts';

// Großer Moment galerie-filter (KERN v3.4 K-007, E3-GRAF-08): Daten und Logik der Galerie „Unsere Arbeiten“ auf /referenzen.
const FILTER = ['Bad', 'Dusche', 'Balkon und Terrasse', 'Treppe und Eingang', 'So arbeiten wir']; // referenzen.md, Abschnitt 5
const STRICH = /[‒-―]|\s-\s/;
const FACHWOERTER = Object.values(GLOSSAR).flatMap((e) => e.begriffe.map((b) => b.toLowerCase()));

test('Galerie 1: Filter und Satz wörtlich aus dem Seitentext, „Alle Fotos“ zuerst', () => {
  assert.deepEqual(GRUPPEN.map((g) => g.name), ['Alle Fotos', ...FILTER]);
  assert.equal(GRUPPEN[0].id, 'alle');
  assert.equal(SATZ, 'Wählen Sie einen Raum. Dann sehen Sie nur die Fotos aus diesem Raum.');
});

test('Galerie 2: jedes Foto aus ARBEITEN, Format 4 : 5, jede Bilddatei einmal, ohne Einstiegsbild', () => {
  const ids = GALERIE.map((f) => f.bild);
  assert.equal(new Set(ids).size, ids.length, 'Kennung doppelt');
  for (const id of ids) {
    const a = ARBEITEN[id];
    assert.ok(a, `${id} fehlt in ARBEITEN`);
    assert.equal(a.breite * 5, a.hoehe * 4, `${id} ist nicht 4 : 5`);
  }
  const dateien = ids.map((id) => ARBEITEN[id].src);
  assert.equal(new Set(dateien).size, dateien.length, 'Bilddatei doppelt');
  // an das Einstiegsbild der Seite gebunden statt an eine Kennung (UM-E4-SICHT-FIX M-A2: der Einstieg wechselt die Kennung,
  // die Anforderung bleibt gleich)
  assert.ok(REFERENZEN.worum.bild, 'Einstiegsbild der Seite');
  assert.ok(!dateien.includes(ARBEITEN[REFERENZEN.worum.bild].src), 'Einstiegsbild der Seite steht nicht in der Galerie');
});

test('Galerie 3: jede Gruppe hat Fotos, die Zahlen gehen auf', () => {
  for (const g of GRUPPEN) assert.ok(anzahl(g.id, GALERIE) > 0, `${g.name} ohne Foto`);
  assert.equal(anzahl('alle', GALERIE), GALERIE.length);
  const summe = GRUPPEN.filter((g) => g.id !== 'alle').reduce((s, g) => s + anzahl(g.id, GALERIE), 0);
  assert.equal(summe, GALERIE.length);
});

test('Galerie 4: Unterschriften kurz, ohne Gedankenstrich und ohne Fachwort', () => {
  for (const f of GALERIE) {
    assert.ok(f.unterschrift.length > 0 && f.unterschrift.length <= 80, `${f.bild}: Länge`);
    assert.ok(!STRICH.test(f.unterschrift), `${f.bild}: Strich`);
    const klein = f.unterschrift.toLowerCase();
    for (const w of FACHWOERTER) assert.ok(!klein.includes(w), `${f.bild}: Fachwort „${w}“`);
  }
});

test('Galerie 5: sichtbar und einblenden', () => {
  assert.equal(istSichtbar('bad', 'alle'), true);
  assert.equal(istSichtbar('bad', 'dusche'), false);
  assert.equal(blendetEin('bad', 'alle', null), false, 'beim Laden blendet nichts ein');
  assert.equal(blendetEin('bad', 'bad', 'alle'), true, 'ein Raum legt seine Fotos neu');
  assert.equal(blendetEin('bad', 'alle', 'bad'), false, 'bei „Alle Fotos“ bleiben stehende Fotos ruhig');
  assert.equal(blendetEin('dusche', 'alle', 'bad'), true, 'bei „Alle Fotos“ blenden die vorher verborgenen ein');
  assert.equal(blendetEin('bad', 'dusche', 'bad'), false, 'verborgene Fotos blenden nicht ein');
});

test('Galerie 6: Staffel in Lesefolge, höchstens 8 Stufen', () => {
  assert.ok(stufen(GALERIE, 'alle', null).every((s) => s === null));
  const s = stufen(GALERIE, 'alle', 'treppe-und-eingang').filter((x) => x !== null);
  assert.equal(s.length, GALERIE.length - anzahl('treppe-und-eingang', GALERIE));
  assert.deepEqual(s.slice(0, 8), [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.ok(s.every((x) => x <= STAFFEL_MAX));
  assert.equal(STAFFEL_MAX, 7);
});

test('Galerie 7: Statuszeile', () => {
  assert.equal(ansage('alle', 25), 'Sie sehen alle 25 Fotos.');
  assert.equal(ansage('bad', 7), 'Sie sehen 7 Fotos aus dem Bad.');
  assert.equal(ansage('treppe-und-eingang', 1), 'Sie sehen 1 Foto von Treppe und Eingang.');
  for (const g of GRUPPEN) assert.ok(!STRICH.test(ansage(g.id, 2)));
});
