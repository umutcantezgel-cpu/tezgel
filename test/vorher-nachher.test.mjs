import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { START, SCHRITT_TASTE, begrenze, wertAusZeiger, schrittFuerTaste, wertText } from '../src/components/momente/vorher-nachher/teilung.ts';

// Großer Moment `vorher-nachher` (E3-GRAF-07): Logik des Reglers und Regeln der Quelltexte.
const lies = (datei) => fs.readFileSync(new URL(`../src/components/momente/vorher-nachher/${datei}`, import.meta.url), 'utf8');

test('Vorher-Nachher 1: Start in der Mitte, Pfeiltasten in Schritten von 5', () => {
  assert.equal(START, 50);
  assert.equal(SCHRITT_TASTE, 5);
});

test('Vorher-Nachher 2: Werte bleiben zwischen 0 und 100, ganzzahlig', () => {
  assert.equal(begrenze(-5), 0);
  assert.equal(begrenze(104), 100);
  assert.equal(begrenze(49.6), 50);
  assert.equal(begrenze(Number.NaN), 50);
});

test('Vorher-Nachher 3: Zeigerlage in Prozent der Bühne', () => {
  assert.equal(wertAusZeiger(150, 100, 200), 25);
  assert.equal(wertAusZeiger(50, 100, 200), 0);
  assert.equal(wertAusZeiger(400, 100, 200), 100);
  assert.equal(wertAusZeiger(150, 100, 0), 50);
});

test('Vorher-Nachher 4: nur die Pfeiltasten verschieben selbst', () => {
  for (const k of ['ArrowLeft', 'ArrowDown']) assert.equal(schrittFuerTaste(k), -5, k);
  for (const k of ['ArrowRight', 'ArrowUp']) assert.equal(schrittFuerTaste(k), 5, k);
  for (const k of ['Home', 'End', 'PageUp', 'PageDown', 'Tab', 'a']) assert.equal(schrittFuerTaste(k), 0, k);
});

test('Vorher-Nachher 5: Ansage in Worten, ohne Striche', () => {
  assert.equal(wertText(50), '50 Prozent vorher, 50 Prozent nachher');
  assert.equal(wertText(0), '0 Prozent vorher, 100 Prozent nachher');
  assert.equal(wertText(130), '100 Prozent vorher, 0 Prozent nachher');
  for (const w of [0, 1, 50, 99, 100]) assert.ok(!/[–—]| - /.test(wertText(w)));
});

test('Vorher-Nachher 6: Hülle ohne Client, Regler als Insel, keine festen Werte, kein Übergang', () => {
  const huelle = lies('VorherNachher.tsx');
  const regler = lies('Regler.tsx');
  assert.ok(huelle.includes('data-motion="vorher-nachher"'));
  assert.ok(!/['"]use client['"]/.test(huelle), 'VorherNachher ist Serverkomponente');
  assert.ok(regler.startsWith("'use client'"), 'Regler beginnt mit use client');
  for (const q of [huelle, regler]) {
    assert.ok(!/#[0-9a-fA-F]{3,8}\b/.test(q), 'keine Hex-Werte');
    assert.ok(!/className="[^"]*\[/.test(q), 'keine Beliebigwerte');
    assert.ok(!/\b(transition|animate|duration|dauer)-/.test(q), 'kein Übergang');
  }
});
