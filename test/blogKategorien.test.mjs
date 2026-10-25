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
