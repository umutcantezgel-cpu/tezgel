// V-04 · Umbenannte Adressen leiten dauerhaft weiter (E2-ORCH-05c): Status 308, Ziel laut Location, Ziel erreichbar (200).
// Übernommen aus der Werkstatt-Suite (_werkstatt/werkzeuge/tests, E-038 Phase 1.1): eine Suite für alle Läufe.
// Belegte Umbenennungen aus dem Vorlauf (_relaunch/PLAN.md, „Wege“); Anfragen nur gegen den lokalen Server.
import { test, expect } from './fixtures.mjs';

const WEGE = [
  ['/bad/budgetkalkulator', '/bad/projekt-check'],
  ['/blog/barrierefreies-bad-planung-zuschuesse', '/bad/barrierefreies-bad'],
];

test.describe('V-04 Weiterleitungen', () => {
  for (const [alt, neu] of WEGE) {
    test(`${alt} → ${neu}: 308 und Ziel 200`, async ({ request }) => {
      const r = await request.get(alt, { maxRedirects: 0 });
      expect(r.status()).toBe(308);
      expect(new URL(r.headers()['location'], 'http://127.0.0.1').pathname).toBe(neu);
      const ziel = await request.get(neu);
      expect(ziel.status()).toBe(200);
    });
  }
});
