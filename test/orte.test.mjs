import test from 'node:test';
import assert from 'node:assert/strict';
import { CITIES } from '../src/config/cities.ts';
import { CITY_HUB_DATA } from '../src/lib/maps/getMapEmbedUrl.ts';
import { REVIEWS } from '../src/config/reviews.js';
import { ARBEITEN } from '../src/config/arbeiten.ts';
import { zerlege } from '../src/lib/textmarken.ts';
import { ortsInhalt } from '../src/inhalte/orte.ts';
import { findCityConfig, getCityLandingPageSchema } from '../src/lib/schemaPyramid.ts';

const re = (s) => new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

// Ortsseiten (Muster REF-ort-wetzlar.md, E-024): alle 13 Orte aus derselben Funktion, geprüft gegen die Regeln
// K-014 (Titel ≤ 58 wie test/titleLength, Beschreibung 120 bis 155) und K-011 (gültige Textmarken), K-015 (keine
// erfundenen Angaben: nur Name, Landkreis, Entfernung ab Aßlar).

const inhalte = CITIES.map((c, i) => ortsInhalt(c, CITY_HUB_DATA[c.slug]?.distanceKm ?? c.distanceKm, i));

function texte(wert, aus = []) {
  if (typeof wert === 'string') aus.push(wert);
  else if (Array.isArray(wert)) wert.forEach((w) => texte(w, aus));
  else if (wert && typeof wert === 'object') Object.values(wert).forEach((w) => texte(w, aus));
  return aus;
}

test('Orte 1: dreizehn Orte, je eine Seite', () => {
  assert.equal(inhalte.length, 13);
  assert.equal(new Set(inhalte.map((o) => o.pfad)).size, 13);
});

test('Orte 2: Titel höchstens 58 Zeichen, Beschreibung 120 bis 155', () => {
  for (const o of inhalte) {
    assert.ok([...o.meta.titel].length <= 58, `${o.stadt}: Titel ${[...o.meta.titel].length}`);
    const n = [...o.meta.beschreibung].length;
    assert.ok(n >= 120 && n <= 155, `${o.stadt}: Beschreibung ${n}`);
  }
});

test('Orte 3: alle Texte mit gültigen Textmarken, keine Gedankenstriche', () => {
  for (const o of inhalte) for (const t of texte(o)) {
    zerlege(t);
    assert.doesNotMatch(t, /[–—]/, `${o.stadt}: ${t}`);
  }
});

test('Orte 4: drei verschiedene echte Fotos und eine vorhandene Stimme je Ort', () => {
  for (const o of inhalte) {
    const bilder = o.beleg.fotos.map((f) => f.bild);
    assert.equal(new Set(bilder).size, 3, `${o.stadt}: ${bilder}`);
    for (const b of bilder) assert.ok(ARBEITEN[b], b);
    for (const s of o.beleg.stimmen) assert.ok(REVIEWS.some((r) => r.id === s), s);
  }
});

test('Orte 5: Entfernung ab Aßlar im Ortssatz, der Sitz selbst ohne Entfernung', () => {
  for (const [i, c] of CITIES.entries()) {
    const o = inhalte[i];
    const km = CITY_HUB_DATA[c.slug]?.distanceKm ?? c.distanceKm;
    if (km === 0) assert.match(o.worum.ort, /Sitz in Aßlar/);
    else if (c.slug !== 'wetzlar') assert.match(o.worum.ort, re(`etwa ${km}\u00a0km bis ${c.name}.`));
    assert.match(o.lage.absaetze[0], re(`im ${c.region}.`));
  }
});

// SEO-Runde P3: Wetzlar verlinkt die vier Seiten Leistung × Wetzlar und dazu drei Fachseiten, alle anderen Orte wie bisher
test('Orte 6: Leistungslinks auf die vier Leistungen im Ort, Wetzlar zusätzlich auf drei Fachseiten', () => {
  for (const [i, c] of CITIES.entries()) {
    const hrefs = inhalte[i].tun.bereiche.map((b) => b.href);
    if (c.slug === 'wetzlar') {
      assert.deepEqual(hrefs, ['/leistungen/bad/wetzlar', '/bad/barrierefreies-bad', '/leistungen/wohnen/wetzlar', '/leistungen/aussen/wetzlar', '/leistungen/untergrund/wetzlar', '/treppen', '/fliesenreparatur']);
    } else {
      assert.deepEqual(hrefs, ['bad', 'wohnen', 'aussen', 'untergrund'].map((id) => `/leistungen/${id}/${c.slug}`));
    }
  }
});

// UM-E4-SICHT-FIX M-C6 Nr. 1 und 4: Einstieg mit Foto, höchstens drei Aufmacher über die 13 Orte, keiner doppelt mit der
// Fotoreihe derselben Seite (auch nicht über ein anderes Bild aus demselben Original, _werkstatt/bilder/auftrag-e4.json);
// die Fotoreihe beginnt nie mit dem dunklen Gäste-WC
const GLEICHES_ORIGINAL = { 'balkon-beleg-3': 'ort-terrasse-erdtoene' };
test('Orte 7: Aufmacher je Ort, höchstens drei, nicht in der eigenen Fotoreihe; Fotoreihe nicht mit dem Gäste-WC vorn', () => {
  const aufmacher = new Set();
  for (const o of inhalte) {
    assert.ok(o.worum.bild && ARBEITEN[o.worum.bild], `${o.stadt}: Aufmacher ${o.worum.bild}`);
    aufmacher.add(o.worum.bild);
    const reihe = o.beleg.fotos.map((f) => f.bild);
    assert.ok(!reihe.includes(o.worum.bild), `${o.stadt}: Aufmacher in der Fotoreihe`);
    const zwilling = GLEICHES_ORIGINAL[o.worum.bild];
    assert.ok(!zwilling || !reihe.includes(zwilling), `${o.stadt}: ${zwilling} ist dasselbe Original wie der Aufmacher`);
    assert.notEqual(reihe[0], 'ort-gaeste-wc', `${o.stadt}: Gäste-WC vorn`);
    assert.ok(!o.tun.anDerLinie, `${o.stadt}: „Das machen wir“ mittig`);
    assert.ok(o.tun.bereiche.every((b) => b.vignette && !b.motiv), `${o.stadt}: Zeilen mit Plan-Vignetten`);
  }
  assert.ok(aufmacher.size <= 3, `höchstens drei Aufmacher: ${[...aufmacher]}`);
});

// SEO-Runde P1 (T03, T04): Jeder Ort hat Angaben für die strukturierten Daten der Ortsseite. Ohne sie bricht der Bau der
// Ortsseite ab (src/app/(bestand)/standorte/[stadt]/page.tsx); früher stand dort ein Ersatzzweig mit eigenem Knoten.
test('Orte 8: jeder Ort mit Angaben in HESSEN_GEO_HIERARCHY, Service mit provider und areaServed auf den Ort', () => {
  for (const c of CITIES) {
    const conf = findCityConfig(c.slug);
    assert.ok(conf, `${c.slug}: keine Angaben in HESSEN_GEO_HIERARCHY`);
    assert.match(conf.wikidataId ?? '', /^Q\d+$/, `${c.slug}: Wikidata-Kennung`);
    const graph = getCityLandingPageSchema(conf)['@graph'];
    const ort = graph.find((k) => k['@type'] === 'City');
    const dienst = graph.find((k) => k['@type'] === 'Service');
    assert.ok(ort && dienst, `${c.slug}: City und Service`);
    assert.equal(dienst.areaServed['@id'], ort['@id'], `${c.slug}: areaServed auf den Ort`);
    assert.match(dienst.provider['@id'], /\/#local-business$/, `${c.slug}: provider ist der eine Betrieb`);
    assert.ok(!graph.some((k) => [].concat(k['@type']).includes('LocalBusiness')), `${c.slug}: kein zweites LocalBusiness`);
  }
});
test('Orte 11 (SEO-Runde P3): eigene Inhalte nur für Wetzlar, Zahlen wie die Daten, Förderung wie im Bestand, Fototitel ohne Ort', async () => {
  const { EIGENE_ORTSINHALTE } = await import('../src/inhalte/orte-eigen.ts');
  assert.deepEqual(Object.keys(EIGENE_ORTSINHALTE), ['wetzlar']);
  const w = CITIES.findIndex((c) => c.slug === 'wetzlar');
  const wetzlar = inhalte[w];
  assert.match(wetzlar.worum.vorspann, /Duschen ohne Stufe/);
  assert.match(wetzlar.lage.absaetze[0], re(`Stadtmitte von Wetzlar sind es etwa ${CITY_HUB_DATA.wetzlar.distanceKm}\u00a0km.`));
  // Förderung nur sinngleich wie auf /bad und /bad/barrierefreies-bad („kann … dazugeben“, F-23, F-25)
  const saetze = wetzlar.tun.bereiche.map((b) => b.satz ?? '');
  assert.ok(saetze.some((s) => s.includes('kann die Pflegekasse bis zu 4.180\u00a0€ je Person')));
  assert.equal(saetze.some((s) => /\bzahlt\b/.test(s)), false);
  for (const [i, o] of inhalte.entries()) {
    // kein Foto hat einen bestätigten Ort (Leitplanke Wahrheit): der Titel über den Fotos nennt keinen
    assert.doesNotMatch(o.beleg.titel, re(o.stadt), `${o.stadt}: ${o.beleg.titel}`);
    if (i === w) continue;
    for (const t of texte(o)) assert.doesNotMatch(t, /direkt neben Wetzlar|Stadtmitte von Wetzlar|Duschen ohne Stufe/, `${o.stadt}: ${t}`);
  }
});
