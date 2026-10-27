// Ladeschwelle (K-010, UM-E3-ZUST-M): Anzeige erst nach 300 ms Laden, dann mindestens 500 ms; mit Scheinuhr.
import test from 'node:test';
import assert from 'node:assert/strict';
import { erzeugeLadeschwelle, LADE_VERZOEGERUNG_MS, LADE_MINDESTDAUER_MS } from '../src/lib/ladeschwelle.ts';

function scheinuhr() {
  let jetzt = 0;
  let naechsteId = 0;
  const auftraege = new Map();
  return {
    jetzt: () => jetzt,
    setTimeout: (fn, ms) => {
      naechsteId += 1;
      auftraege.set(naechsteId, { fn, zeit: jetzt + ms });
      return naechsteId;
    },
    clearTimeout: (id) => auftraege.delete(id),
    offen: () => auftraege.size,
    vor(ms) {
      const ziel = jetzt + ms;
      for (;;) {
        const faellig = [...auftraege.entries()].filter(([, a]) => a.zeit <= ziel).sort((a, b) => a[1].zeit - b[1].zeit)[0];
        if (!faellig) break;
        auftraege.delete(faellig[0]);
        jetzt = faellig[1].zeit;
        faellig[1].fn();
      }
      jetzt = ziel;
    },
  };
}

function aufbau() {
  const uhr = scheinuhr();
  const meldungen = [];
  const schwelle = erzeugeLadeschwelle((s) => meldungen.push([uhr.jetzt(), s]), uhr);
  return { uhr, meldungen, schwelle };
}

test('Ladeschwelle: Werte aus K-010 (300 ms, 500 ms)', () => {
  assert.equal(LADE_VERZOEGERUNG_MS, 300);
  assert.equal(LADE_MINDESTDAUER_MS, 500);
});

test('Ladeschwelle: kurzes Laden unter 300 ms zeigt nie etwas', () => {
  const { uhr, meldungen, schwelle } = aufbau();
  schwelle.setze(true);
  uhr.vor(299);
  schwelle.setze(false);
  uhr.vor(2000);
  assert.deepEqual(meldungen, []);
  assert.equal(schwelle.sichtbar, false);
  assert.equal(uhr.offen(), 0);
});

test('Ladeschwelle: langes Laden zeigt ab 300 ms und blendet nach dem Ende sofort aus, wenn 500 ms vorbei sind', () => {
  const { uhr, meldungen, schwelle } = aufbau();
  schwelle.setze(true);
  uhr.vor(1500);
  schwelle.setze(false);
  assert.deepEqual(meldungen, [[300, true], [1500, false]]);
});

test('Ladeschwelle: endet das Laden 50 ms nach dem Erscheinen, bleibt die Anzeige bis 500 ms stehen', () => {
  const { uhr, meldungen, schwelle } = aufbau();
  schwelle.setze(true);
  uhr.vor(350);
  schwelle.setze(false);
  uhr.vor(449);
  assert.equal(schwelle.sichtbar, true);
  uhr.vor(1);
  assert.deepEqual(meldungen, [[300, true], [800, false]]);
});

test('Ladeschwelle: neues Laden während der Haltezeit flackert nicht', () => {
  const { uhr, meldungen, schwelle } = aufbau();
  schwelle.setze(true);
  uhr.vor(350);
  schwelle.setze(false); // Haltezeit bis 800 ms
  uhr.vor(50);
  schwelle.setze(true); // bei 400 ms wieder laden: Anzeige bleibt ohne Unterbrechung
  uhr.vor(1000);
  assert.deepEqual(meldungen, [[300, true]]);
  schwelle.setze(false); // bei 1400 ms: 1100 ms sichtbar, also sofort aus
  assert.deepEqual(meldungen, [[300, true], [1400, false]]);
});

test('Ladeschwelle: gleiche Werte nacheinander ändern nichts', () => {
  const { uhr, meldungen, schwelle } = aufbau();
  schwelle.setze(true);
  uhr.vor(200);
  schwelle.setze(true); // startet die Schwelle nicht neu
  uhr.vor(100);
  assert.deepEqual(meldungen, [[300, true]]);
});

test('Ladeschwelle: beende hält die Uhr an (Abbau der Komponente)', () => {
  const { uhr, meldungen, schwelle } = aufbau();
  schwelle.setze(true);
  schwelle.beende();
  uhr.vor(1000);
  assert.deepEqual(meldungen, []);
  assert.equal(uhr.offen(), 0);
});
