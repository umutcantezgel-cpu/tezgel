import test from 'node:test';
import assert from 'node:assert/strict';
import { zerlege, klartext } from '../src/lib/textmarken.ts';

// Textmarken (K-011): Format der Seitentexte `[[id|Wort]]`, Spezifikation aus _werkstatt/texte/REF-*.md.

test('Textmarken 1: Text ohne Marke bleibt ein Stück', () => {
  assert.deepEqual(zerlege('Wir verlegen Fliesen.'), [{ art: 'text', text: 'Wir verlegen Fliesen.' }]);
});

test('Textmarken 2: Fachwort mitten im Satz, Beugung des Worts bleibt', () => {
  assert.deepEqual(zerlege('Unter die Fliesen kommt eine [[abdichtung|Abdichtung]] nach Regel.'), [
    { art: 'text', text: 'Unter die Fliesen kommt eine ' },
    { art: 'fachwort', id: 'abdichtung', wort: 'Abdichtung' },
    { art: 'text', text: ' nach Regel.' },
  ]);
});

test('Textmarken 3: zwei Marken, am Anfang und am Ende', () => {
  const s = zerlege('[[untergrund|Untergrund]] und [[din-18534|DIN 18534]]');
  assert.equal(s.length, 3);
  assert.equal(s[0].art, 'fachwort');
  assert.equal(s[2].wort, 'DIN 18534');
});

test('Textmarken 4: unbekannte Kennung bricht ab', () => {
  assert.throws(() => zerlege('Ein [[gibt-es-nicht|Wort]].'), /unbekannter Glossarkennung/);
});

test('Textmarken 5: unvollständige Marke bricht ab', () => {
  assert.throws(() => zerlege('Ein [[abdichtung|Wort ohne Ende.'), /Unvollständige Textmarke/);
});

test('Textmarken 6: Klartext ohne Auszeichnung', () => {
  assert.equal(klartext('Eine [[abdichtung|Abdichtung]] nach [[din-18534|DIN 18534]].'), 'Eine Abdichtung nach DIN 18534.');
});

test('Textmarken 7: alle Referenztexte zerlegen sich ohne Fehler', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const ordner = new URL('../_werkstatt/texte/', import.meta.url);
  const dateien = readdirSync(ordner).filter((d) => d.startsWith('REF-') && d.endsWith('.md'));
  assert.ok(dateien.length >= 4);
  for (const d of dateien) {
    // Hinweiszeilen (`> …`) beschreiben das Format und sind kein Seitentext
    const md = readFileSync(new URL(d, ordner), 'utf8').split('\n').filter((z) => !z.startsWith('>')).join('\n');
    for (const m of md.matchAll(/`([^`]*\[\[[^`]*)`/g)) zerlege(m[1]);
  }
});
