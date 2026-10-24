import test from 'node:test';
import assert from 'node:assert/strict';
import { HALB, R_AUSSEN, RINGE_KM, LAGE, radius, richtung, punkt, prozent, fugenraster, kartenorte } from '../src/components/momente/karte/geometrie.ts';
import { CITIES } from '../src/config/cities.ts';
import { CITY_COORDINATES, CITY_HUB_DATA, TEZGEL_HQ_COORDS } from '../src/lib/maps/getMapEmbedUrl.ts';
import { mitEntfernungAbSitz } from '../src/lib/einzugszonen.ts';

// Großer Moment `karte` (E3-GRAF-09): Geometrie der Einsatzkarte, Aßlar in der Mitte, Wurzelmaßstab bis 45 km.
const ORTE = kartenorte(mitEntfernungAbSitz(CITIES, CITY_HUB_DATA), CITY_COORDINATES, TEZGEL_HQ_COORDS);
const ort = (slug) => ORTE.find((o) => o.slug === slug);

test('Karte 1: Radius im Wurzelmaßstab, gekappt bei 45 km', () => {
  assert.equal(radius(0), 0);
  assert.equal(radius(10), 84.9);
  assert.equal(radius(25), 134.2);
  assert.equal(radius(45), R_AUSSEN);
  assert.equal(radius(60), R_AUSSEN);
  assert.equal(radius(-5), 0);
  assert.deepEqual([...RINGE_KM], [10, 25]);
});

test('Karte 2: Norden oben, Osten rechts, ohne -0', () => {
  assert.deepEqual(punkt(25, 0), { x: 134.2, y: 0 });
  assert.deepEqual(punkt(10, Math.PI / 2), { x: 0, y: -84.9 });
  assert.ok(Math.abs(richtung(TEZGEL_HQ_COORDS, CITY_COORDINATES.giessen)) < 0.05, 'Gießen liegt östlich');
  const w = richtung(TEZGEL_HQ_COORDS, CITY_COORDINATES.herborn);
  assert.ok(w > Math.PI / 2 && w < Math.PI, 'Herborn liegt nordwestlich');
});

test('Karte 3: Prozent der Zeichenfläche', () => {
  assert.equal(prozent(0), '50%');
  assert.equal(prozent(-HALB), '0%');
  assert.equal(prozent(HALB), '100%');
  assert.equal(prozent(100), '75%');
});

test('Karte 4: jeder Ort aus CITIES steht genau einmal in der Zeichnung, in seiner Zone und im Bild', () => {
  assert.equal(ORTE.length, CITIES.length);
  assert.equal(new Set(ORTE.map((o) => o.slug)).size, CITIES.length);
  assert.deepEqual({ x: ort('asslar').x, y: ort('asslar').y, km: ort('asslar').km }, { x: 0, y: 0, km: 0 });
  assert.deepEqual(ort('wetzlar'), { slug: 'wetzlar', name: 'Wetzlar', km: 5, zone: 'nah', x: 41.7, y: 43.1 });
  assert.deepEqual(ort('giessen'), { slug: 'giessen', name: 'Gießen', km: 25, zone: 'mittel', x: 134.2, y: 2.6 });
  assert.deepEqual(ort('herborn'), { slug: 'herborn', name: 'Herborn', km: 20, zone: 'mittel', x: -88.4, y: -81.2 });
  assert.equal(ort('friedberg').zone, 'weit');
  for (const o of ORTE) {
    assert.ok(Math.abs(o.x) <= R_AUSSEN && Math.abs(o.y) <= R_AUSSEN, `${o.slug} liegt in der Fläche`);
    assert.ok(Math.abs(Math.hypot(o.x, o.y) - radius(o.km)) <= 0.2, `${o.slug}: Abstand passt zur Entfernung`);
  }
});

test('Karte 5: Orte ohne Koordinaten fallen aus der Zeichnung', () => {
  assert.deepEqual(kartenorte([{ slug: 'x', name: 'X', distanceKm: 12 }], {}, TEZGEL_HQ_COORDS), []);
});

test('Karte 6: jede Beschriftung hat eine Lage', () => {
  for (const c of CITIES) assert.ok(['oben', 'unten', 'links', 'rechts'].includes(LAGE[c.slug]), `Lage fehlt: ${c.slug}`);
});

test('Karte 7: Fugenraster im Drittelverband (9 Lagerfugen, 46 Stoßfugen)', () => {
  const d = fugenraster();
  assert.equal((d.match(/H200/g) ?? []).length, 9);
  assert.equal((d.match(/v40/g) ?? []).length, 46);
  assert.ok(!d.includes('NaN'));
});
