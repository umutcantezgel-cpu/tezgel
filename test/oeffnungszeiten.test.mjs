import test from 'node:test';
import assert from 'node:assert/strict';
import { uhrzeit, oeffnungszeilen } from '../src/lib/oeffnungszeiten.ts';

// Öffnungszeiten als Text (K-010 Schreibregeln, Öffnungszeiten-Auftrag): Zeitspannen mit „bis“, kein Gedankenstrich,
// gleiche Tage werden zusammengefasst, geschlossene Tage fehlen. Erwartungen aus der Spezifikation, nicht aus der Umsetzung.

const NORMAL = (open, close) => ({ open, close, type: 'normal' });
const NACH_VEREINBARUNG = { open: '08:00', close: '14:00', type: 'appointment_only' };
const ZU = { open: '00:00', close: '00:00', type: 'closed' };

// Vollständige Woche; nicht genannte Tage sind geschlossen.
function woche(tage) {
  return Object.assign({ monday: ZU, tuesday: ZU, wednesday: ZU, thursday: ZU, friday: ZU, saturday: ZU, sunday: ZU }, tage);
}

// Bestandsdaten (Soll laut Auftrag, hier fest eingetragen).
const BESTAND = ['Mo bis Do 7:30 bis 18 Uhr', 'Fr 7:30 bis 17 Uhr', 'Sa nach Vereinbarung'];

test('Uhrzeit: „07:30“ wird „7:30“ und „18:00“ wird „18“', () => {
  assert.equal(uhrzeit('07:30'), '7:30');
  assert.equal(uhrzeit('18:00'), '18');
  assert.equal(uhrzeit('17:00'), '17');
  assert.equal(uhrzeit('08:00'), '8');
  assert.equal(uhrzeit('12:15'), '12:15');
});

test('Bestandsdaten ergeben genau die drei Sollzeilen in dieser Reihenfolge', () => {
  assert.deepEqual(oeffnungszeilen(), BESTAND);
});

test('gleiche Tage werden zu einer Zeitspanne mit „bis“ zusammengefasst', () => {
  const zeilen = oeffnungszeilen(woche({
    monday: NORMAL('08:00', '16:00'), tuesday: NORMAL('08:00', '16:00'), wednesday: NORMAL('08:00', '16:00'),
    thursday: NORMAL('08:00', '16:00'), friday: NORMAL('08:00', '16:00'),
  }));
  assert.deepEqual(zeilen, ['Mo bis Fr 8 bis 16 Uhr']);
});

test('ein einzelner offener Tag steht ohne „bis“ mit seinem Kurznamen', () => {
  const zeilen = oeffnungszeilen(woche({ wednesday: NORMAL('07:30', '18:00') }));
  assert.deepEqual(zeilen, ['Mi 7:30 bis 18 Uhr']);
});

test('ein geschlossener Tag fehlt und trennt die Zeitspanne davor und danach', () => {
  const zeilen = oeffnungszeilen(woche({
    monday: NORMAL('07:30', '18:00'), tuesday: NORMAL('07:30', '18:00'), wednesday: NORMAL('07:30', '18:00'),
    friday: NORMAL('07:30', '18:00'),
  }));
  assert.deepEqual(zeilen, ['Mo bis Mi 7:30 bis 18 Uhr', 'Fr 7:30 bis 18 Uhr']);
});

test('unterschiedliche Zeiten werden nicht zusammengefasst', () => {
  const zeilen = oeffnungszeilen(woche({
    monday: NORMAL('07:30', '18:00'), tuesday: NORMAL('07:30', '18:00'), wednesday: NORMAL('07:30', '17:00'),
    thursday: NORMAL('07:30', '18:00'), friday: NORMAL('07:30', '18:00'),
  }));
  assert.deepEqual(zeilen, ['Mo bis Di 7:30 bis 18 Uhr', 'Mi 7:30 bis 17 Uhr', 'Do bis Fr 7:30 bis 18 Uhr']);
});

test('„nach Vereinbarung“ steht ohne Uhrzeit, auch bei Tagen mit eigener Zeit', () => {
  assert.deepEqual(oeffnungszeilen(woche({ saturday: NACH_VEREINBARUNG })), ['Sa nach Vereinbarung']);
  assert.deepEqual(
    oeffnungszeilen(woche({ friday: NORMAL('07:30', '17:00'), saturday: NACH_VEREINBARUNG })),
    ['Fr 7:30 bis 17 Uhr', 'Sa nach Vereinbarung'],
  );
});

test('gleiche Tage „nach Vereinbarung“ werden ebenfalls zusammengefasst', () => {
  const zeilen = oeffnungszeilen(woche({ friday: NACH_VEREINBARUNG, saturday: NACH_VEREINBARUNG }));
  assert.deepEqual(zeilen, ['Fr bis Sa nach Vereinbarung']);
});

test('ohne einen offenen Tag gibt es keine Zeile', () => {
  assert.deepEqual(oeffnungszeilen(woche({})), []);
});

test('Zeilen enthalten keinen Gedankenstrich und keinen Bindestrich; jede Uhrzeit steht in einer Spanne mit „bis“', () => {
  const beispiele = [
    oeffnungszeilen(),
    oeffnungszeilen(woche({ monday: NORMAL('07:30', '18:00'), tuesday: NORMAL('07:30', '18:00'), friday: NORMAL('07:30', '17:00'), saturday: NACH_VEREINBARUNG })),
    oeffnungszeilen(woche({ wednesday: NORMAL('08:00', '12:00'), thursday: NORMAL('13:00', '16:30') })),
  ];
  for (const zeilen of beispiele) {
    for (const zeile of zeilen) {
      assert.doesNotMatch(zeile, /[–—-]/, `Strich in „${zeile}“`);
      if (/\d/.test(zeile)) assert.match(zeile, / bis /, `Zeitangabe ohne „bis“ in „${zeile}“`);
    }
  }
});
