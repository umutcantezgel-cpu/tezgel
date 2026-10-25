import test from 'node:test';
import assert from 'node:assert/strict';
import { META_BESCHREIBUNGEN, META_TEILE } from '../src/inhalte/meta/index.ts';
import { generatePageMetadata } from '../src/lib/metadata.ts';

// Eigene Meta-Beschreibungen (E3-SEO-META, E-050): vollständig, ohne Kürzung, in Alltagssprache (K-010).
const eintraege = Object.entries(META_BESCHREIBUNGEN);

test('Meta 1: Adressen beginnen mit „/“, ohne Schrägstrich am Ende', () => {
  for (const [pfad] of eintraege) assert.match(pfad, /^\/[a-z0-9\-/_]*[a-z0-9_]$/, pfad);
});

test('Meta 2: 120 bis 155 Zeichen, ohne Auslassung, Gedankenstrich, „&“ und Ausrufezeichen', () => {
  for (const [pfad, text] of eintraege) {
    assert.ok(text.length >= 120 && text.length <= 155, `${pfad}: ${text.length} Zeichen`);
    assert.doesNotMatch(text, /\.\.\.|…|\s[–—-]\s|&|!/, pfad);
    assert.equal(text, text.trim().replace(/\s+/g, ' '), `${pfad}: Leerraum`);
  }
});

test('Meta 3: generatePageMetadata liefert den Eintrag zur Adresse unverändert, auch bei langer Datenbeschreibung', () => {
  for (const [pfad, text] of eintraege) {
    const meta = generatePageMetadata({ title: 'Prüfseite Fliesenverlegung Tezgel in Aßlar', description: 'x '.repeat(120), path: pfad });
    assert.equal(meta.description, text, pfad);
    assert.equal(meta.openGraph?.description, text, pfad);
  }
});

test('Meta 4: ohne Eintrag bleibt die übergebene Beschreibung maßgeblich', () => {
  const beschreibung = 'Wir verlegen Fliesen in Bad, Küche und Flur. Der Termin bei Ihnen vor Ort ist kostenfrei, das Angebot bekommen Sie danach schriftlich.';
  assert.equal(generatePageMetadata({ title: 'Prüfseite Fliesenverlegung Tezgel in Aßlar', description: beschreibung, path: '/gibt-es-nicht' }).description, beschreibung);
});

test('Meta 5: jede Adresse steht in genau einer Teildatei (sonst überschreibt die spätere still die frühere)', () => {
  const gesehen = new Map();
  for (const [teil, eintraege] of Object.entries(META_TEILE)) {
    for (const pfad of Object.keys(eintraege)) {
      assert.ok(!gesehen.has(pfad), `${pfad} in ${gesehen.get(pfad)} und ${teil}`);
      gesehen.set(pfad, teil);
    }
  }
  assert.equal(gesehen.size, Object.keys(META_BESCHREIBUNGEN).length);
});
