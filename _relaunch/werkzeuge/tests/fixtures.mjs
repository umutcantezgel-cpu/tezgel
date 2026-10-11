// Gemeinsame Fixtures: jede Testseite läuft hinter der Anfragesperre (G5) mit abgelehnter Einwilligung.
// `anfragen` sammelt alle POST /api/anfrage-Körper (Attrappe). Für Tests gegen die echte Route: test.use({ echteRoute: true }).
import { test as base, expect } from '@playwright/test';
import { installSperre, setzeEinwilligung, ATTRAPPE_ANFRAGE } from '../lib.mjs';

let ipZaehler = 0;
// Zweites Oktett je Lauf verschieden (Startsekunde des Worker-Prozesses): Wiederholte Läufe gegen denselben Server teilen
// sonst IPs und laufen in dessen Rate-Limit (5 je IP in 10 min; Befund P3-14a).
const LAUF_OKTETT = 20 + (Math.floor(Date.now() / 1000) % 200);
export const test = base.extend({
  echteRoute: [false, { option: true }],
  einwilligung: ['abgelehnt', { option: true }],
  protokoll: async ({}, use) => { await use([]); },
  anfragen: async ({}, use) => { await use([]); },
  context: async ({ context, echteRoute, einwilligung, protokoll, anfragen, baseURL }, use, testInfo) => {
    await installSperre(context, { protokoll, echteRoute });
    // Anfrage-Körper mitschneiden (vor der Sperre registriert → läuft zuerst)
    const ip = `10.${LAUF_OKTETT}.${testInfo.workerIndex}.${(ipZaehler++ % 250) + 1}`; // eigene IP je Test → kein Rate-Limit
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
// Zustand statt Wartezeit: Element ist von React übernommen (hydriert), Ereignisse kommen an.
export async function bedienbar(locator) {
  await expect.poll(() => locator.first().evaluate((el) => Object.keys(el).some((k) => k.startsWith('__reactProps$'))), { timeout: 15_000 }).toBe(true);
  return locator;
}
export const warteBotSchwelle = (page) => page.waitForTimeout(1700);
export const istEchteReferenz = (id) => /^TEZ-\d{2}-[A-Z0-9]{4,}$/.test(id) && !/IGN/.test(id);
