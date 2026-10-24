import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ENDE, ESTRICH, PFEILE, TROPFEN, TROPFEN_RADIUS, WEG, plattenOben } from '../src/components/momente/gefaelle-balkon/geometrie.ts';

// Großer Moment `gefaelle-balkon` (E3-GRAF-04): Kontrollwerte, Weg des Tropfens, Pfeile und Keyframes in bewegung.css.
const nah = (a, b, eps = 0.01) => Math.abs(a - b) <= eps;
const px = (n) => (nah(n, 0) ? '0' : `${Math.round(n * 100) / 100}px`);

test('Gefälle Balkon 1: Kontrollwerte der Pfade', () => {
  assert.equal(ESTRICH, 'M28 80L200 92.04V96');
  assert.equal(TROPFEN, 'M209 109.64L212.18 112.82A4.5 4.5 0 1 1 205.82 112.82Z');
  assert.equal(PFEILE[0].d, 'M64 51.52L88 53.2M84.72 49.43L88 53.2L84.23 56.48');
});

test('Gefälle Balkon 2: der Tropfen landet auf den Platten und gleitet auf ihnen bis zur Kante', () => {
  for (const n of ['landet', 'kante']) {
    const w = WEG.find((e) => e.name === n);
    assert.ok(nah(w.y + TROPFEN_RADIUS, plattenOben(w.x)), n);
  }
});

test('Gefälle Balkon 3: der Weg beginnt bei 0 und endet bei 1 in der Rinne, die Anteile steigen', () => {
  assert.equal(WEG[0].anteil, 0);
  assert.equal(WEG.at(-1).anteil, 1);
  assert.deepEqual([WEG.at(-1).x, WEG.at(-1).y], [ENDE.x, ENDE.y]);
  WEG.slice(1).forEach((w, i) => assert.ok(w.anteil > WEG[i].anteil, w.name));
});

test('Gefälle Balkon 4: jeder Pfeil erscheint, wenn der Tropfen ihn erreicht', () => {
  const l = WEG.find((e) => e.name === 'landet');
  const k = WEG.find((e) => e.name === 'kante');
  for (const p of PFEILE.filter((e) => e.von !== undefined)) {
    const t = l.anteil + ((p.von - l.x) / (k.x - l.x)) * (k.anteil - l.anteil);
    assert.ok(nah(t, p.ab), `Pfeil ab ${p.von}: ${t.toFixed(3)}`);
  }
  assert.equal(PFEILE.at(-1).ab, WEG.find((e) => e.name === 'ueber-kante').anteil);
});

test('Gefälle Balkon 5: Keyframes in bewegung.css = WEG minus ENDE', () => {
  const css = fs.readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8');
  const i = css.indexOf('@keyframes gefaelle-balkon-tropfen');
  assert.ok(i >= 0, 'Keyframes gefaelle-balkon-tropfen fehlen in bewegung.css');
  const zeilen = css.slice(i, css.indexOf('@keyframes gefaelle-balkon-pfeil')).split('\n');
  for (const w of WEG) {
    const soll = `translate: ${px(w.x - ENDE.x)} ${px(w.y - ENDE.y)};`;
    assert.ok(zeilen.some((z) => z.trim().startsWith(`${Math.round(w.anteil * 100)}% {`) && z.includes(soll)), `${w.name}: ${soll}`);
  }
});
