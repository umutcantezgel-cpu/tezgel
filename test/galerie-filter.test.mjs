import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ARBEITEN } from '../src/config/arbeiten.ts';
import { GLOSSAR } from '../src/config/glossar.ts';
import { GALERIE, GRUPPEN, SATZ, STAFFEL_MAX, ZUERST, anzahl, ansage, blendetEin, istSichtbar, mehrMarke, stufen, stufenNachzeigen } from '../src/components/momente/galerie-filter/daten.ts';
import { REFERENZEN } from '../src/inhalte/referenzen.ts';

// Großer Moment galerie-filter (KERN v3.4 K-007, E3-GRAF-08): Daten und Logik der Galerie „Unsere Arbeiten“ auf /referenzen.
// referenzen.md, Abschnitt 5; dazu „Wohnräume und Küche“ für die neuen Fotos (SEO-Runde P5, Freigabe Umut 02.11.2026)
const FILTER = ['Bad', 'Dusche', 'Balkon und Terrasse', 'Treppe und Eingang', 'Wohnräume und Küche', 'So arbeiten wir'];
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

// UM-E4-SICHT-FIX M-C3 Nr. 2: eingeklappt drei Reihen (schmal 6, im Dreierraster 9), die übrigen tragen ihre Marke; beim
// Nachzeigen blenden die neuen Fotos in Lesefolge ein, höchstens 8 Stufen (Register galerie-filter)
test('Galerie 8: eingeklappt 6 bzw. 9 Fotos, Nachzeigen gestaffelt', () => {
  assert.deepEqual(ZUERST, { schmal: 6, breit: 9 });
  assert.equal(ZUERST.breit % 3, 0, 'volle Reihen im Dreierraster');
  assert.equal(ZUERST.schmal % 2, 0, 'volle Reihen im Zweierraster');
  const marken = GALERIE.map((_, i) => mehrMarke(i));
  assert.equal(marken.filter((m) => m === undefined).length, ZUERST.schmal);
  assert.equal(marken.filter((m) => m === 'schmal').length, ZUERST.breit - ZUERST.schmal);
  assert.equal(marken.filter((m) => m === 'breit').length, GALERIE.length - ZUERST.breit);
  for (const ab of [ZUERST.schmal, ZUERST.breit]) {
    const s = stufenNachzeigen(GALERIE.length, ab);
    assert.ok(s.slice(0, ab).every((x) => x === null));
    assert.deepEqual(s.slice(ab, ab + 3), [0, 1, 2]);
    assert.ok(s.every((x) => x === null || x <= STAFFEL_MAX));
  }
  // eingeklappt zeigt „Alle“ nur fertige Arbeiten (die Baustelle steht am Ende)
  assert.ok(GALERIE.slice(0, ZUERST.breit).every((f) => f.gruppe !== 'so-arbeiten-wir'));
});

// Spaltengrenzen (UM-E4-SICHT-FIX R-1, E-111): Die Liste in GalerieWahl wechselt bei @2xl (42rem) auf zwei und bei @5xl
// (64rem) auf drei Spalten; Einklappen und Platzhalterhöhe in globals.css müssen dieselben Grenzen nennen, sonst stehen
// eingeklappt halbe Reihen oder die übersprungenen Kacheln springen beim ersten Zeichnen.
test('Galerie 9: Spaltengrenzen der Liste gleich in GalerieWahl und globals.css', () => {
  const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  const wahl = readFileSync(new URL('../src/components/momente/galerie-filter/GalerieWahl.tsx', import.meta.url), 'utf8');
  const theme = readFileSync(new URL('../node_modules/tailwindcss/theme.css', import.meta.url), 'utf8');
  assert.match(theme, /--container-2xl:\s*42rem;/);
  assert.match(theme, /--container-5xl:\s*64rem;/);
  assert.doesNotMatch(css, /--container-(2xl|5xl):/, 'eigene Containergrößen verschieben die Grenzen');
  assert.match(wahl, /galerie-liste[^"]*@2xl:grid-cols-2[^"]*@5xl:grid-cols-3/);
  const block = (abfrage) => css.split(abfrage).slice(1).map((teil) => teil.slice(0, 400));
  assert.ok(block('@container (width < 64rem) {').some((b) => b.includes('[data-galerie-mehr="schmal"]')), 'Einklappen schmal bis 64rem');
  assert.ok(block('@container (width >= 42rem) {').some((b) => b.includes('[data-galerie-mehr]') && b.includes('/ 2 - 1px')), 'Platzhalter zwei Spalten ab 42rem');
  assert.ok(block('@container (width >= 64rem) {').some((b) => b.includes('[data-galerie-mehr]') && b.includes('/ 3 - 1px')), 'Platzhalter drei Spalten ab 64rem');
});

// SEO-Runde P5 (Gegenprüfung C-5): Jede Datei aus ARBEITEN liegt unter public, Breite und Höhe stimmen mit dem JPEG überein, der
// Platzhalter ist eine WebP-Daten-URL. Ein Tippfehler im Pfad käme sonst durch Typprüfung und Bau (next/image prüft lokale Dateien
// nicht) und zeigte live ein kaputtes Bild.
function jpegMasse(puffer) {
  if (puffer[0] !== 0xff || puffer[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < puffer.length) {
    if (puffer[i] !== 0xff) return null;
    const marke = puffer[i + 1];
    if (marke === 0xff) { i += 1; continue; }
    const laenge = puffer.readUInt16BE(i + 2);
    if (marke >= 0xc0 && marke <= 0xcf && marke !== 0xc4 && marke !== 0xc8 && marke !== 0xcc) {
      return { hoehe: puffer.readUInt16BE(i + 5), breite: puffer.readUInt16BE(i + 7) };
    }
    i += 2 + laenge;
  }
  return null;
}
test('Galerie 10: jede Datei aus ARBEITEN liegt in public, Maße wie die Datei, Platzhalter WebP', () => {
  for (const [id, a] of Object.entries(ARBEITEN)) {
    const masse = jpegMasse(readFileSync(new URL(`../public${a.src}`, import.meta.url)));
    assert.ok(masse, `${id}: kein lesbarer JPEG-Kopf in ${a.src}`);
    assert.deepEqual([masse.breite, masse.hoehe], [a.breite, a.hoehe], `${id}: Maße von ${a.src}`);
    assert.match(a.blur, /^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/, `${id}: Platzhalter`);
  }
});
