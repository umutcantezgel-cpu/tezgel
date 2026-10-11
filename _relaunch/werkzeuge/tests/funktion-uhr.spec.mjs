// UHR-SPEC (P4-06, I-19, Vorbild `uhr.mjs`): Vorgerendertes HTML darf nicht vom Datum abhängen. Die Browseruhr wird
// gegen heute um +1 und +30 Tage vorgestellt (page.clock.setSystemTime, Zeit läuft weiter); nach dem Hydrieren dürfen weder
// Seitenfehler noch Konsolenfehler auftreten (z. B. React #418, Hydrier-Abweichung wie bei Kalendertagen ab „morgen“).
// Seiten: „/“, „/termin“, „/kontakt“ und jede Hauptseite aus GRUNDMENGE.json. Keine Wartezeiten, nur Zustände:
// hydriert (oeffne/bedienbar am Sprunglink, beide Fassungen) und Ruhe im Netz (mit Obergrenze wie uhr.mjs).
import { test, expect, oeffne, sprunglink } from './fixtures.mjs';
import { grundmenge } from '../lib.mjs';

const TAG_MS = 86_400_000;
const VERSATZ_TAGE = [1, 30];
const SEITEN = [...new Set(['/', '/termin', '/kontakt', ...grundmenge().hauptseiten])];

for (const tage of VERSATZ_TAGE) {
  test.describe(`Browseruhr +${tage} Tage`, () => {
    for (const seite of SEITEN) {
      test(`${seite}: keine Seitenfehler und keine Konsolenfehler (React #418)`, async ({ page }) => {
        const fehler = [];
        page.on('pageerror', (e) => fehler.push(`seite: ${e.message}`));
        page.on('console', (m) => { if (m.type() === 'error') fehler.push(`konsole: ${m.text()}`); });
        const jetzt = new Date(Date.now() + tage * TAG_MS);
        await page.clock.setSystemTime(jetzt);
        await oeffne(page, seite, sprunglink(page));
        // Die vorgestellte Uhr gilt im Browser (sonst wäre der Fall trivial grün).
        expect(Math.abs((await page.evaluate(() => Date.now())) - jetzt.getTime())).toBeLessThan(TAG_MS / 2);
        await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
        expect(fehler).toEqual([]);
      });
    }
  });
}
