// Tests der reinen Bildlogik (node:test). Lauf: node --test _werkstatt/werkzeuge/tests-logik/bilder.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ausschnitt, zielbreiten, dateiname, slug, formatWerte, randAbschnitt, standardabweichungen,
  kanalMittel, korrekturGewinne, metadatenFunde, pngChunks, pngMetadatenChunks, auftragNormalisieren,
  RAND_MAX_ANTEIL, STANDARD_BREITEN,
} from '../bilder.mjs';

const basis = (extra = {}) => ({ id: 'x', original: 'IMG_1.PNG', raum: 'Bad', name: 'x-bad', format: '4:5', schwerpunkt: { x: 50, y: 50 }, alt: 'Bad', ...extra });

test('ausschnitt Hochformat: 4:5 im Originalfoto mit Balken oben und unten, Schwerpunkt 50/52', () => {
  const r = ausschnitt({ breite: 1320, hoehe: 2868 }, { format: '4:5', schwerpunkt: { x: 50, y: 52 }, rand: { oben: 584, unten: 532 } });
  assert.deepEqual(r, { links: 0, oben: 666, breite: 1320, hoehe: 1650, format: '4:5' });
});

test('ausschnitt Querformat: 4:5 in 1600 × 900, mittig zum Schwerpunkt', () => {
  const r = ausschnitt({ breite: 1600, hoehe: 900 }, { format: '4:5', schwerpunkt: { x: 50, y: 50 } });
  assert.deepEqual(r, { links: 440, oben: 0, breite: 720, hoehe: 900, format: '4:5' });
});

test('ausschnitt Querformat: 1:1 in 1600 × 900, mittig', () => {
  const r = ausschnitt({ breite: 1600, hoehe: 900 }, { format: '1:1', schwerpunkt: { x: 50, y: 50 } });
  assert.deepEqual(r, { links: 350, oben: 0, breite: 900, hoehe: 900, format: '1:1' });
});

test('ausschnitt: Schwerpunkt am rechten Rand, Rechteck bleibt im Bild', () => {
  const r = ausschnitt({ breite: 1600, hoehe: 900 }, { format: '4:5', schwerpunkt: { x: 100, y: 50 } });
  assert.equal(r.links + r.breite, 1600);
  assert.equal(r.breite, 720);
});

test('ausschnitt: Schwerpunkt oben links, Rechteck beginnt bei 0/0', () => {
  const r = ausschnitt({ breite: 1000, hoehe: 1000 }, { format: '4:5', schwerpunkt: { x: 0, y: 0 } });
  assert.deepEqual(r, { links: 0, oben: 0, breite: 800, hoehe: 1000, format: '4:5' });
});

test('ausschnitt: Schwerpunkt unten rechts, Rechteck endet am Bildrand', () => {
  const r = ausschnitt({ breite: 2000, hoehe: 1000 }, { format: '1:1', schwerpunkt: { x: 100, y: 100 } });
  assert.deepEqual(r, { links: 1000, oben: 0, breite: 1000, hoehe: 1000, format: '1:1' });
});

test('ausschnitt: Schwerpunkte an allen Rändern bleiben im Bild, Format exakt', () => {
  for (const format of ['4:5', '1:1', '16:9']) {
    for (const x of [0, 25, 50, 75, 100]) {
      for (const y of [0, 25, 50, 75, 100]) {
        const r = ausschnitt({ breite: 1320, hoehe: 2868 }, { format, schwerpunkt: { x, y } });
        assert.ok(r.links >= 0 && r.links + r.breite <= 1320, `x=${x} ${format}`);
        assert.ok(r.oben >= 0 && r.oben + r.hoehe <= 2868, `y=${y} ${format}`);
        const [a, b] = formatWerte(format);
        assert.equal(r.hoehe * a, r.breite * b, `Format ${format} bei ${x}/${y}`);
      }
    }
  }
});

test('ausschnitt: Ränder werden abgezogen, das Rechteck bleibt innerhalb des Restbildes', () => {
  const r = ausschnitt({ breite: 1000, hoehe: 800 }, { format: '1:1', schwerpunkt: { x: 50, y: 50 }, rand: { links: 100, oben: 50 } });
  assert.deepEqual(r, { links: 125, oben: 50, breite: 750, hoehe: 750, format: '1:1' });
});

test('ausschnitt: zu große Ränder brechen ab', () => {
  assert.throws(() => ausschnitt({ breite: 1000, hoehe: 800 }, { format: '1:1', schwerpunkt: { x: 50, y: 50 }, rand: { links: 1000 } }), /kein Bild|Ränder/);
});

test('formatWerte: 4-5 ist kein gültiges Format', () => {
  assert.throws(() => formatWerte('4-5'), /ungültig/);
  assert.deepEqual(formatWerte('4:5'), [4, 5]);
});

test('zielbreiten: nie hochskalieren, Quelle bleibt Obergrenze', () => {
  assert.deepEqual(zielbreiten(800, [640, 960, 1280]), [640]);
  assert.deepEqual(zielbreiten(500, [640, 960]), [500]);
  assert.deepEqual(zielbreiten(1320, STANDARD_BREITEN, '4:5'), [640, 960, 1280]);
});

test('zielbreiten: Obergrenze 2.560 px auf der langen Kante', () => {
  assert.deepEqual(zielbreiten(4000, [1280, 2560, 3000], '1:1'), [1280, 2560]);
  assert.deepEqual(zielbreiten(4000, [2048, 2560], '4:5'), [2048]);
});

test('dateiname: Umlaute, ß und Leerzeichen werden zu Kleinbuchstaben und Bindestrichen', () => {
  assert.equal(dateiname('Balkon und Terrasse', 'Große Platten für Stelzlager'), 'balkon-und-terrasse/grosse-platten-fuer-stelzlager');
  assert.equal(slug('  Ärger & Öl: Übergabe ß  '), 'aerger-oel-uebergabe-ss');
  assert.equal(slug('Start Dusche (neu)'), 'start-dusche-neu');
});

test('slug: leerer Name bricht ab', () => {
  assert.throws(() => slug('  -- '), /keinen Dateinamen/);
});

test('randAbschnitt: zählt einfarbige Randzeilen, höchstens RAND_MAX_ANTEIL', () => {
  const kurz = Array(40).fill(9);
  kurz[0] = 0; kurz[1] = 0; kurz[2] = 0;
  assert.equal(randAbschnitt(kurz), 3);
  assert.equal(randAbschnitt(Array(40).fill(0)), Math.floor(40 * RAND_MAX_ANTEIL));
  assert.equal(randAbschnitt([9, 0, 0]), 0);
});

test('standardabweichungen: einfarbige Zeile hat 0, gemusterte Zeile viel mehr', () => {
  const data = Buffer.from([100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    0, 0, 0, 255, 255, 255, 0, 0, 0, 255, 255, 255]);
  const s = standardabweichungen({ data, w: 4, h: 2, c: 3 });
  assert.equal(s.zeilen[0], 0);
  assert.ok(s.zeilen[1] > 100);
  assert.ok(s.spalten[0] > 0);
});

test('kanalMittel: Mittel je Kanal über alle Pixel', () => {
  assert.deepEqual(kanalMittel([10, 20, 30, 30, 40, 50], 3), [20, 30, 40]);
});

test('korrekturGewinne: neutrales Bild bleibt unverändert, Band 100 bis 170 wirkt nicht', () => {
  assert.deepEqual(korrekturGewinne([134, 134, 134]), [1, 1, 1]);
  assert.deepEqual(korrekturGewinne([150, 140, 130]), [0.9333, 1, 1.0769]);
});

test('korrekturGewinne: Farbstich wird verringert, je Kanal höchstens ±8 %', () => {
  const g = korrekturGewinne([100, 120, 140]);
  assert.deepEqual(g, [1.08, 1, 0.92]);
  const vorher = 140 - 100;
  const nachher = 140 * g[2] - 100 * g[0];
  assert.ok(Math.abs(nachher) < vorher, 'Farbstich wird kleiner');
  for (const v of korrekturGewinne([10, 250, 128])) assert.ok(v >= 0.92 && v <= 1.08);
});

test('korrekturGewinne: zu dunkel wird hochgezogen, zu hell gedämpft, jeweils gedeckelt', () => {
  assert.deepEqual(korrekturGewinne([60, 60, 60]), [1.08, 1.08, 1.08]);
  assert.deepEqual(korrekturGewinne([200, 200, 200]), [0.92, 0.92, 0.92]);
});

test('metadatenFunde: leere Felder zählen nicht, gefüllte schon', () => {
  assert.deepEqual(metadatenFunde({}), []);
  assert.deepEqual(metadatenFunde({ exif: Buffer.from('x'), xmp: Buffer.alloc(0), iptc: Buffer.from('y') }), ['exif', 'iptc']);
});

test('pngChunks: erkennt Textchunks und lässt Bild-Chunks außen vor', () => {
  const chunk = (typ, daten = Buffer.alloc(0)) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(daten.length);
    return Buffer.concat([len, Buffer.from(typ, 'latin1'), daten, Buffer.alloc(4)]);
  };
  const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', Buffer.alloc(13)), chunk('tEXt', Buffer.from('Comment\0x')), chunk('IEND')]);
  assert.deepEqual(pngChunks(png), ['IHDR', 'tEXt', 'IEND']);
  assert.deepEqual(pngMetadatenChunks(png), ['tEXt']);
  assert.deepEqual(pngChunks(Buffer.from('GIF89a')), []);
});

test('auftragNormalisieren: Standardwerte und gültiger Auftrag', () => {
  const [a] = auftragNormalisieren([basis()]);
  assert.deepEqual(a.breiten, STANDARD_BREITEN);
  assert.equal(a.korrektur, true);
  assert.deepEqual(a.ausschnitt, { links: 0, oben: 0, rechts: 0, unten: 0 });
});

test('auftragNormalisieren: Alt-Text über 125 Zeichen bricht ab, genau 125 ist erlaubt', () => {
  assert.throws(() => auftragNormalisieren([basis({ alt: 'x'.repeat(126) })]), /alt hat 126 Zeichen/);
  assert.equal(auftragNormalisieren([basis({ alt: 'x'.repeat(125) })])[0].alt.length, 125);
});

test('auftragNormalisieren: doppelte id, fehlender Schwerpunkt und leerer Ausschnitt brechen ab', () => {
  assert.throws(() => auftragNormalisieren([basis(), basis()]), /doppelt/);
  assert.throws(() => auftragNormalisieren([basis({ schwerpunkt: undefined })]), /schwerpunkt/);
  assert.throws(() => auftragNormalisieren([basis({ ausschnitt: { links: 60, rechts: 50 } })]), /kein Bild übrig/);
});
