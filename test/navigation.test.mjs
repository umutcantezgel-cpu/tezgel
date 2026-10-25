import test from 'node:test';
import assert from 'node:assert/strict';
import { hauptziel } from '../src/config/navigation.js';
import { CITIES } from '../src/config/cities.ts';

// Hauptziel je Seite (K-004, Z-11; E-049): Kopf, Menü und Leiste führen dorthin, wohin der Knopf im Einstieg führt.
test('Hauptziel: Seiten mit eigenem Anfrageformular führen zu diesem Formular', () => {
  assert.equal(hauptziel('/'), '#termin');
  assert.equal(hauptziel('/kontakt'), '#express-anfrage');
  assert.equal(hauptziel('/kontakt/'), '#express-anfrage');
  for (const c of CITIES) {
    assert.equal(hauptziel(`/standorte/${c.slug}`), '#anfrage', c.slug);
    assert.equal(hauptziel(`/standorte/${c.slug}/`), '#anfrage', `${c.slug}/`);
  }
});

test('Hauptziel: alle anderen Seiten, die Ortsübersicht und unbekannte Orte (404 ohne #anfrage) führen zu /kontakt', () => {
  for (const p of ['/bad', '/bad/badsanierung', '/leistungen', '/fliesen', '/blog', '/standorte', '/standorte/', '/standorte/gibt-es-nicht', '/standorte/wetzlar/extra']) {
    assert.equal(hauptziel(p), '/kontakt', p);
  }
});
