import test from 'node:test';
import assert from 'node:assert/strict';
import { fugenbild, passstueckeGleich, reihenversatz, startversatz } from '../src/lib/plaene/geometrie.ts';
import { PLAENE } from '../src/lib/plaene/vorgaben.ts';

test('Plan 1: Startversatz legt die Achse auf eine Fuge', () => {
  assert.equal(startversatz(30, 6), 3);
  assert.equal(startversatz(24, 6), 0);
  assert.equal(startversatz(20, 3), 1);
});

test('Plan 2: Reihenversatz je Verband', () => {
  assert.deepEqual([0, 1, 2, 3].map((i) => reihenversatz('kreuz', i)), [0, 0, 0, 0]);
  assert.deepEqual([0, 1, 2, 3].map((i) => reihenversatz('halb', i)), [0, 0.5, 0, 0.5]);
  assert.deepEqual([0, 1, 2, 3].map((i) => reihenversatz('drittel', i)).map((v) => Math.round(v * 100) / 100), [0, 0.33, 0.67, 0]);
});

test('Plan 3: Im Kreuzverband sind die Passstücke an beiden Rändern gleich breit', () => {
  for (const name of ['fugen', 'reparatur', 'untergrund', 'aussen', 'fussbodenheizung']) {
    const bild = fugenbild(PLAENE[name]);
    assert.ok(passstueckeGleich(bild), `${name}: gleiche Passstücke`);
    assert.ok(bild.senkrecht.some(([x]) => x === bild.achseX), `${name}: Lot liegt auf einer Fuge`);
  }
});

test('Plan 4: Fugen liegen innerhalb des Raums, Passstücke sind schmaler als eine Platte', () => {
  for (const [name, plan] of Object.entries(PLAENE)) {
    const bild = fugenbild(plan);
    for (const [x, y1, y2] of bild.senkrecht) assert.ok(x > 0 && x < plan.raum.b && y1 < y2, `${name}: senkrechte Fuge im Raum`);
    for (const y of bild.waagrecht) assert.ok(y > 0 && y < plan.raum.h, `${name}: waagrechte Fuge im Raum`);
    for (const [, , b] of bild.passstuecke) assert.ok(b > 0 && b < plan.platte.b, `${name}: Passstück schmaler als Platte`);
  }
});
