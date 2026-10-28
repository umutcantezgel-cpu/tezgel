// Gemeinsamer Takt (UM-E3-MOD, src/lib/motion/takt.ts): eine rAF-Schleife, einmalige und dauernde Aufgaben, Abmelden,
// Fehler, Selbstlauf-Zeitgeber. Scheinbild: requestAnimationFrame sammelt, bild() führt genau ein Bild aus.
import test from 'node:test';
import assert from 'node:assert/strict';
import { imTakt, naechstesBild, wiederhole } from '../src/lib/motion/takt.ts';

const angefordert = [];
let uhr = 0;
globalThis.requestAnimationFrame = (fn) => angefordert.push(fn);
const gemeldet = [];
globalThis.reportError = (fehler) => gemeldet.push(fehler);

/** Führt ein Bild aus; gibt zurück, wie viele rAF-Rückrufe darin liefen. */
function bild() {
  const jetzt = angefordert.splice(0);
  uhr += 16;
  for (const fn of jetzt) fn(uhr);
  return jetzt.length;
}
function leeren() {
  while (bild() > 0);
}

test('Takt 1: naechstesBild läuft genau einmal im nächsten Bild, in der Reihenfolge der Anmeldung, über eine rAF-Anforderung', () => {
  leeren();
  const lauf = [];
  naechstesBild(() => lauf.push('a'));
  naechstesBild(() => lauf.push('b'));
  naechstesBild((zeit) => lauf.push(`c@${zeit}`));
  assert.equal(angefordert.length, 1, 'eine Anforderung für alle');
  assert.deepEqual(lauf, [], 'nichts vor dem Bild');
  bild();
  assert.deepEqual(lauf, ['a', 'b', `c@${uhr}`]);
  assert.equal(bild(), 0, 'ohne Aufgaben ruht die Schleife');
  assert.deepEqual(lauf, ['a', 'b', `c@${uhr - 16}`]);
});

test('Takt 2: abgemeldet läuft nichts, auch nicht, wenn die Abmeldung im selben Bild geschieht', () => {
  leeren();
  const lauf = [];
  const ab = naechstesBild(() => lauf.push('weg'));
  ab();
  let abSpaeter = () => {};
  naechstesBild(() => abSpaeter());
  abSpaeter = naechstesBild(() => lauf.push('auch weg'));
  naechstesBild(() => lauf.push('bleibt'));
  bild();
  assert.deepEqual(lauf, ['bleibt']);
});

test('Takt 3: was eine Aufgabe im Lauf anmeldet, kommt im folgenden Bild dran', () => {
  leeren();
  const lauf = [];
  naechstesBild(() => {
    lauf.push(1);
    naechstesBild(() => lauf.push(2));
  });
  bild();
  assert.deepEqual(lauf, [1]);
  bild();
  assert.deepEqual(lauf, [1, 2]);
});

test('Takt 4: imTakt läuft in jedem Bild bis zur Abmeldung, danach ruht die Schleife', () => {
  leeren();
  let zaehler = 0;
  const ab = imTakt(() => zaehler++);
  bild();
  bild();
  bild();
  assert.equal(zaehler, 3);
  ab();
  bild();
  assert.equal(zaehler, 3);
  assert.equal(bild(), 0, 'keine weitere Anforderung');
});

test('Takt 5: ein Fehler hält die übrigen Aufgaben nicht auf und wird gemeldet', () => {
  leeren();
  gemeldet.length = 0;
  const lauf = [];
  naechstesBild(() => {
    throw new Error('kaputt');
  });
  naechstesBild(() => lauf.push('weiter'));
  bild();
  assert.deepEqual(lauf, ['weiter']);
  assert.equal(gemeldet.length, 1);
  assert.equal(gemeldet[0].message, 'kaputt');
});

test('Takt 6: wiederhole setzt bei verborgenem Tab aus und hält nach dem Anhalten an', (t) => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  const dokVorher = globalThis.document;
  globalThis.document = { visibilityState: 'visible' };
  try {
    let schritte = 0;
    const anhalten = wiederhole(1000, () => schritte++);
    t.mock.timers.tick(3000);
    assert.equal(schritte, 3);
    globalThis.document.visibilityState = 'hidden';
    t.mock.timers.tick(2000);
    assert.equal(schritte, 3, 'verborgen: kein Schritt');
    globalThis.document.visibilityState = 'visible';
    t.mock.timers.tick(1000);
    assert.equal(schritte, 4);
    anhalten();
    t.mock.timers.tick(5000);
    assert.equal(schritte, 4, 'angehalten');
  } finally {
    globalThis.document = dokVorher;
  }
});
