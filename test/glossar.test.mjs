import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { GLOSSAR, istGlossarId } from '../src/config/glossar.ts';

// Glossar (KERN v3.0 K-011, Schreibregeln K-010) gegen die Spezifikation, nicht gegen die Umsetzung.
// Wörter werden wie in der Prüfliste _werkstatt/werkzeuge/lesbarkeit-logik.mjs (Funktion woerter) gezählt:
// Buchstaben- und Zahlenfolgen zählen, Satzzeichen und „×“ nicht.

const JSON_DATEI = fileURLToPath(new URL('../_werkstatt/regeln/glossar.json', import.meta.url));
const ERLAUBT_DATEI = fileURLToPath(new URL('../_werkstatt/regeln/bindestrich-erlaubt.json', import.meta.url));
const regelJson = JSON.parse(readFileSync(JSON_DATEI, 'utf8'));
const erlaubt = JSON.parse(readFileSync(ERLAUBT_DATEI, 'utf8'));

const WORT = /\p{N}+(?:[.,:]\p{N}+)+|[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu;
const woerterVon = (text) => text.match(WORT) ?? [];

// Vergleich für die Klammer: Satzzeichen weg, Groß und klein egal (kleiner Anfang der Klammer ist Format, K-011).
const kern = (text) => text.replace(/[.,;:!?]/g, ' ').split(/\s+/).filter(Boolean).map((w) => w.toLowerCase());

const EINTRAEGE = Object.entries(GLOSSAR);
const ERLAUBTE_WOERTER = new Set(erlaubt.woerter.map((e) => e.wort.toLowerCase()));
const ERLAUBTE_PRAEFIXE = erlaubt.praefixe_mit_bindestrich_erlaubt.map((p) => p.toLowerCase());

test('(a) glossar.ts und glossar.json haben dieselben Kennungen, Begriffe und Erklärungen', () => {
  const jsonIds = regelJson.eintraege.map((e) => e.id);
  assert.equal(new Set(jsonIds).size, jsonIds.length, 'Kennung in glossar.json doppelt');
  assert.deepEqual(Object.keys(GLOSSAR).sort(), [...jsonIds].sort());
  for (const e of regelJson.eintraege) {
    assert.deepEqual(GLOSSAR[e.id].begriffe, e.begriffe, `${e.id}: Begriffe weichen ab`);
    assert.equal(GLOSSAR[e.id].erklaerung, e.erklaerung, `${e.id}: Erklärung weicht ab`);
  }
});

test('(b) jede Erklärung hat höchstens 15 Wörter und endet mit einem Satzzeichen', () => {
  for (const [id, e] of EINTRAEGE) {
    const anzahl = woerterVon(e.erklaerung).length;
    assert.ok(anzahl <= 15, `${id}: Erklärung hat ${anzahl} Wörter, höchstens 15 erlaubt`);
    assert.match(e.erklaerung, /[.!?]$/, `${id}: Erklärung endet ohne Satzzeichen`);
  }
});

test('(c) jede Klammer hat höchstens 15 Wörter, keinen Schlusspunkt und denselben Inhalt wie die Erklärung', () => {
  for (const [id, e] of EINTRAEGE) {
    const anzahl = woerterVon(e.klammer).length;
    assert.ok(anzahl >= 1, `${id}: Klammer ist leer`);
    assert.ok(anzahl <= 15, `${id}: Klammer hat ${anzahl} Wörter, höchstens 15 erlaubt`);
    assert.doesNotMatch(e.klammer, /[.!?]$/, `${id}: Klammer hat einen Schlusspunkt`);
    assert.deepEqual(kern(e.klammer), kern(e.erklaerung), `${id}: Klammer hat nicht dieselben Wörter wie die Erklärung`);
  }
});

test('(d) keine Gedankenstriche; Bindestrichwörter in Erklärung und Klammer nur aus der erlaubten Liste', () => {
  const gedankenstriche = [];
  const bindestriche = [];
  for (const [id, e] of EINTRAEGE) {
    for (const feld of ['begriffe', 'erklaerung', 'klammer']) {
      const texte = feld === 'begriffe' ? e.begriffe : [e[feld]];
      for (const text of texte) {
        if (/[–—]|(?<=\s)-(?=\s)/.test(text)) gedankenstriche.push(`${id} ${feld}: ${text}`);
      }
    }
    for (const feld of ['erklaerung', 'klammer']) {
      for (const wort of e[feld].match(/[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)+/gu) ?? []) {
        const klein = wort.toLowerCase();
        const erlaubtesWort = ERLAUBTE_WOERTER.has(klein) || ERLAUBTE_PRAEFIXE.some((p) => klein.startsWith(p));
        if (!erlaubtesWort) bindestriche.push(`${id} ${feld}: ${wort}`);
      }
    }
  }
  assert.deepEqual(gedankenstriche, [], 'Gedankenstrich gefunden');
  assert.deepEqual(bindestriche, [], 'Bindestrichwort nicht in bindestrich-erlaubt.json');
});

test('(e) Begriffe einer Kennung kommen in keiner anderen Kennung vor', () => {
  const besitz = new Map();
  const doppelt = [];
  for (const [id, e] of EINTRAEGE) {
    for (const begriff of e.begriffe) {
      const k = begriff.toLowerCase();
      if (besitz.has(k) && besitz.get(k) !== id) doppelt.push(`${begriff}: ${besitz.get(k)} und ${id}`);
      besitz.set(k, id);
    }
  }
  assert.deepEqual(doppelt, [], 'Begriff in zwei Kennungen');

  const teilwort = [];
  for (const [ida, a] of EINTRAEGE) {
    for (const [idb, b] of EINTRAEGE) {
      if (ida === idb) continue;
      for (const begriffA of a.begriffe) {
        for (const begriffB of b.begriffe) {
          if (begriffB.toLowerCase().includes(begriffA.toLowerCase())) teilwort.push(`${begriffA} (${ida}) in ${begriffB} (${idb})`);
        }
      }
    }
  }
  assert.deepEqual(teilwort, [], 'Begriff steckt in einem Begriff einer anderen Kennung');
});

test('(f) istGlossarId erkennt jede Kennung und lehnt erfundene Kennungen ab', () => {
  for (const id of Object.keys(GLOSSAR)) assert.equal(istGlossarId(id), true, `${id} sollte erkannt werden`);
  for (const id of ['erfunden', 'abdichtung-neu', 'Abdichtung', 'abdichtung ', '', 'toString', 'constructor', '__proto__']) {
    assert.equal(istGlossarId(id), false, `„${id}“ sollte abgelehnt werden`);
  }
});
