import test from 'node:test';
import assert from 'node:assert/strict';
import { ZONEN, zoneFuer, gruppiereNachZone } from '../src/lib/einzugszonen.ts';
import { CITIES } from '../src/config/cities.ts';

test('Zonen 1: Grenzen sind einschließlich und aufsteigend', () => {
  assert.deepEqual(ZONEN.map((z) => z.bis), [10, 25, 50]);
  assert.equal(zoneFuer(0).id, 'nah');
  assert.equal(zoneFuer(10).id, 'nah');
  assert.equal(zoneFuer(11).id, 'mittel');
  assert.equal(zoneFuer(25).id, 'mittel');
  assert.equal(zoneFuer(26).id, 'weit');
  assert.equal(zoneFuer(50).id, 'weit');
});

test('Zonen 2: Orte jenseits der letzten Grenze gehen nicht verloren', () => {
  assert.equal(zoneFuer(80).id, 'weit');
});

test('Zonen 3: alle Orte der Konfiguration erscheinen genau einmal', () => {
  const gruppen = gruppiereNachZone(CITIES);
  const namen = gruppen.flatMap((g) => g.orte.map((o) => o.slug));
  assert.equal(namen.length, CITIES.length);
  assert.equal(new Set(namen).size, CITIES.length);
});

test('Zonen 4: innerhalb einer Zone nach Entfernung, dann alphabetisch', () => {
  const gruppen = gruppiereNachZone([
    { name: 'B', distanceKm: 20 }, { name: 'A', distanceKm: 20 }, { name: 'C', distanceKm: 12 }, { name: 'D', distanceKm: 5 },
  ]);
  assert.deepEqual(gruppen[0].orte.map((o) => o.name), ['D']);
  assert.deepEqual(gruppen[1].orte.map((o) => o.name), ['C', 'A', 'B']);
  assert.deepEqual(gruppen[2].orte, []);
});
