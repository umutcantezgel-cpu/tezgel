// Gemeinsame Fixtures: jede Testseite läuft hinter der Anfragesperre (G5) mit abgelehnter Einwilligung.
// `anfragen` sammelt alle POST /api/anfrage-Körper (Attrappe). Für Tests gegen die echte Route: test.use({ echteRoute: true }).
import { test as base, expect } from '@playwright/test';
import { installSperre, setzeEinwilligung, ATTRAPPE_ANFRAGE } from '../lib.mjs';

let ipZaehler = 0;
export const test = base.extend({
  echteRoute: [false, { option: true }],
  einwilligung: ['abgelehnt', { option: true }],
  protokoll: async ({}, use) => { await use([]); },
  anfragen: async ({}, use) => { await use([]); },
  context: async ({ context, echteRoute, einwilligung, protokoll, anfragen, baseURL }, use, testInfo) => {
    await installSperre(context, { protokoll, echteRoute });
    // Anfrage-Körper mitschneiden (vor der Sperre registriert → läuft zuerst)
    const ip = `10.99.${testInfo.workerIndex}.${(ipZaehler++ % 250) + 1}`; // eigene IP je Test → kein Rate-Limit
    await context.route('**/api/anfrage', async (route) => {
      const req = route.request();
      if (req.method() === 'POST') { try { anfragen.push(JSON.parse(req.postData() || '{}')); } catch { anfragen.push({ roh: req.postData() }); } }
      if (echteRoute) return route.continue({ headers: { ...req.headers(), 'x-real-ip': ip } });
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(ATTRAPPE_ANFRAGE) });
    });
    await setzeEinwilligung(context, einwilligung, baseURL);
    await use(context);
  },
});
export { expect };
// Echte Route: Bot-Schwelle (_t ≥ 1,5 s) in Echtzeit abwarten – nie page.clock benutzen.
export const warteBotSchwelle = (page) => page.waitForTimeout(1700);
export const istEchteReferenz = (id) => /^TEZ-\d{2}-[A-Z0-9]{4,}$/.test(id) && !/IGN/.test(id);
