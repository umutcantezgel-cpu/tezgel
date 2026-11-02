import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePageMetadata } from '../src/lib/metadata.ts';
import { CITIES } from '../src/config/cities.ts';
import { SERVICES } from '../src/config/services.js';

test('1. Title Budget: Long raw titles are strictly clamped to <= 58 chars (SERP Budget)', () => {
  const meta = generatePageMetadata({
    title: 'Exklusive Fliesenverlegung und barrierefreie Badsanierung vom Meisterbetrieb in ganz Mittelhessen und Aßlar',
    description: 'Hochwertige Fliesenverlegung in Aßlar und Wetzlar.',
    path: '/test-long-title',
  });

  const titleStr = typeof meta.title === 'object' && meta.title && 'absolute' in meta.title
    ? String(meta.title.absolute)
    : String(meta.title);

  assert.ok(titleStr.length <= 58, `Title length ${titleStr.length} must be <= 58 chars: "${titleStr}"`);
});

test('2. Title Budget: City Landing Page titles satisfy 58-char budget', () => {
  for (const city of CITIES) {
    const meta = generatePageMetadata({
      title: `Fliesenverlegung & Badsanierung in ${city.name} | Fliesenverlegung Tezgel`,
      description: `Fachbetrieb für Fliesenverlegung und Badsanierung in ${city.name}.`,
      path: `/standorte/${city.slug}`,
    });

    const titleStr = typeof meta.title === 'object' && meta.title && 'absolute' in meta.title
      ? String(meta.title.absolute)
      : String(meta.title);

    assert.ok(
      titleStr.length <= 58,
      `City ${city.name} title "${titleStr}" (${titleStr.length} chars) exceeds 58-char budget!`
    );
  }
});

test('3. Title Budget: Service x City matrix titles satisfy 58-char budget', () => {
  for (const service of SERVICES) {
    for (const city of CITIES.slice(0, 5)) {
      const meta = generatePageMetadata({
        title: `${service.name} in ${city.name} | Fliesenverlegung Tezgel`,
        description: `${service.shortDescription} in ${city.name}.`,
        path: `/leistungen/${service.id}/${city.slug}`,
      });

      const titleStr = typeof meta.title === 'object' && meta.title && 'absolute' in meta.title
        ? String(meta.title.absolute)
        : String(meta.title);

      assert.ok(
        titleStr.length <= 58,
        `Service ${service.id} x ${city.name} title "${titleStr}" (${titleStr.length} chars) exceeds 58-char budget!`
      );
    }
  }
});

test('4. Legal Routes: index: false, follow: true is correctly configured', () => {
  const meta = generatePageMetadata({
    title: 'Impressum | Fliesenverlegung Tezgel',
    description: 'Impressum und rechtliche Anbieterkennzeichnung.',
    path: '/impressum',
    robots: { index: false, follow: true },
  });

  assert.equal(meta.robots?.index, false);
  assert.equal(meta.robots?.follow, true);
});

test('5. Markenzusatz (SEO-Runde T10): Auffüllung nur mit „| Fliesenverlegung Tezgel“ oder „· Tezgel“, nichts erfunden', () => {
  const titel = (t) => {
    const m = generatePageMetadata({ title: t, description: 'x', path: '/gibt-es-nicht' });
    return typeof m.title === 'object' && m.title && 'absolute' in m.title ? String(m.title.absolute) : String(m.title);
  };
  assert.equal(titel('Sind Fliesen gut für Allergiker?'), 'Sind Fliesen gut für Allergiker? | Fliesenverlegung Tezgel');
  assert.equal(titel('Fliesen auf Fußbodenheizung verlegen'), 'Fliesen auf Fußbodenheizung verlegen · Tezgel');
  assert.equal(titel('Impressum'), 'Impressum | Fliesenverlegung Tezgel');
  // bewusst gesetzte Titel mit Marke und 45 bis 58 Zeichen bleiben, wie sie sind
  assert.equal(titel('Großformatfliesen verlegen | Fliesenverlegung Tezgel'), 'Großformatfliesen verlegen | Fliesenverlegung Tezgel');
  const woerter = 'Fliesen Bad Dusche Treppe Balkon Terrasse verlegen sanieren abdichten Naturstein Fugen Küche Flur Wohnraum Neubau'.split(' ');
  for (let n = 1; n <= 9; n += 1) {
    const t = titel(woerter.slice(0, n).join(' '));
    assert.ok(t.length <= 58, `${t} (${t.length})`);
    assert.doesNotMatch(t, /Fachbetrieb Tezgel|Fliesen Tezgel|Hessen|[–—]/, t);
    if (/Tezgel/.test(t)) assert.match(t, /( \| Fliesenverlegung Tezgel| · Tezgel)$/, t);
  }
});
