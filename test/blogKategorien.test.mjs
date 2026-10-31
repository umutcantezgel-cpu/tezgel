// Ratgeber-Themen (E4-W0-BLOG, E-062): genau vier Themen und „Alle Artikel“, jeder Beitrag in einem vorhandenen Thema, kein
// Platzhalterdatum (alle Beiträge trugen den Tag ihrer Anlage; echte Daten nach M-27).
import test from 'node:test';
import assert from 'node:assert/strict';
import { categories } from '../src/config/blog.js';
import { posts } from '../src/config/posts.js';

test('Blog 1: vier Themen und „Alle Artikel“, Namen mit „und“ statt „&“', () => {
  assert.deepEqual(categories.map((c) => c.id), ['all', 'bad', 'fliesen', 'aussen', 'ratgeber']);
  for (const c of categories) assert.ok(!c.name.includes('&'), c.name);
});

test('Blog 2: jeder Beitrag gehört zu einem vorhandenen Thema, jedes Thema hat mindestens einen Beitrag', () => {
  const ids = new Set(categories.map((c) => c.id));
  for (const p of posts) assert.ok(ids.has(p.category), `${p.slug}: ${p.category}`);
  for (const c of categories.filter((k) => k.id !== 'all')) assert.ok(posts.some((p) => p.category === c.id), c.id);
});

test('Blog 3: kein gemeinsames Platzhalterdatum an den Beiträgen', () => {
  const daten = posts.map((p) => p.date ?? p.publishedAt).filter(Boolean);
  assert.ok(daten.length === 0 || new Set(daten).size === daten.length, 'mehrere Beiträge mit demselben Datum');
});

// UM-E4-SICHT-FIX M-C8 Nr. 2: Liste nach Thema, serverseitig vorsortiert; „Ratgeber und Neuigkeiten“ zuletzt, die
// Stellenanzeige als letzter Eintrag; innerhalb eines Themas bleibt die Folge der Daten; jedes Thema hat eine Zeichnung
test('Blog 4: nach Thema vorsortiert, Stellenanzeige zuletzt', async () => {
  const { nachThema, STELLENANZEIGE, THEMEN_ZEICHNUNG } = await import('../src/inhalte/blog.ts');
  const folge = nachThema(posts, categories);
  assert.equal(folge.length, posts.length);
  const rang = (p) => categories.findIndex((c) => c.id === p.category);
  for (let i = 1; i < folge.length; i++) assert.ok(rang(folge[i - 1]) <= rang(folge[i]), `${folge[i].slug} nach Thema`);
  assert.equal(folge.at(-1).slug, STELLENANZEIGE);
  assert.equal(categories.at(-1).id, 'ratgeber');
  for (const c of categories.filter((c) => c.id !== 'all')) {
    const ohne = (l) => l.filter((p) => p.category === c.id && p.slug !== STELLENANZEIGE).map((p) => p.slug);
    assert.deepEqual(ohne(folge), ohne(posts), `${c.id}: Folge der Daten`);
    assert.ok(THEMEN_ZEICHNUNG[c.id], `${c.id}: Zeichnung`);
  }
});

// Nacharbeit SF-C1 (Prüfung: je Thema vier- bis fünfmal dieselbe Zeichnung): jeder Beitrag hat eine Zeichnung aus den
// Plan-Vignetten (Typ VignettenName, prüft tsc); innerhalb eines Themas (ohne den Leitartikel) keine zweimal, und in der Folge nach Thema stehen nie zwei
// gleiche direkt hintereinander
test('Blog 5: Zeichnung je Beitrag, im Thema keine zweimal', async () => {
  const { nachThema, zeichnungFuer } = await import('../src/inhalte/blog.ts');
  const leit = posts.find((p) => p.featured);
  const zeilen = nachThema(posts, categories).filter((p) => p !== leit);
  for (const p of zeilen) assert.ok(zeichnungFuer(p.slug, p.category), `${p.slug}: Zeichnung`);
  for (const c of categories.filter((c) => c.id !== 'all')) {
    const namen = zeilen.filter((p) => p.category === c.id).map((p) => zeichnungFuer(p.slug, p.category));
    assert.equal(new Set(namen).size, namen.length, `${c.id}: ${namen}`);
  }
  for (let i = 1; i < zeilen.length; i++) {
    assert.notEqual(zeichnungFuer(zeilen[i].slug, zeilen[i].category), zeichnungFuer(zeilen[i - 1].slug, zeilen[i - 1].category), `${zeilen[i].slug} nach ${zeilen[i - 1].slug}`);
  }
});
