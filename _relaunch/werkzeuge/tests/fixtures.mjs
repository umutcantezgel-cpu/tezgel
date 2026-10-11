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
// Seitenaufruf mit Wartebedingung (P4-06, LERNEN 11.10. „Klicks vor dem Hydrieren“): Nach jedem page.goto erst bedienen,
// wenn React das erste Bedienelement übernommen hat. `erstesBedienelement` ist ein Locator oder (page) => Locator; ohne
// Element bricht der Aufruf ab (die Wartebedingung ist Pflicht). Liefert die Antwort von page.goto (z. B. Status 404).
// Ausnahme nur für Prüfungen des Zustands vor dem Hydrieren (ohne JavaScript): dort page.goto mit Kommentar.
export async function oeffne(page, pfad, erstesBedienelement) {
  if (!erstesBedienelement) throw new Error(`oeffne(${pfad}): erstes Bedienelement fehlt`);
  const antwort = await page.goto(pfad);
  await bedienbar(typeof erstesBedienelement === 'function' ? erstesBedienelement(page) : erstesBedienelement);
  return antwort;
}
// Erstes Bedienelement jeder Seite in beiden Fassungen (Bestand SkipNav, Kern Sprunglink): für Seiten, deren eigentliche
// Bedienelemente erst später eingehängt werden (Banner, Karte im Blick) oder die nur gelesen werden (Links, Status).
export const sprunglink = (page) => page.getByRole('link', { name: 'Zum Hauptinhalt springen', exact: true });
export const warteBotSchwelle = (page) => page.waitForTimeout(1700);
export const istEchteReferenz = (id) => /^TEZ-\d{2}-[A-Z0-9]{4,}$/.test(id) && !/IGN/.test(id);

// Fassung je Seite (P3-14e): Im Kandidaten ist nur „/“ Kern, alle anderen Seiten sind Bestand. Läufe gegen ein Ziel ganz im
// Bestand (Basis, Ausgangsstand) mit RELAUNCH_FASSUNG=bestand – dann ist die Liste leer. Nach jeder Freischaltung erweitern.
// Vorschau-Kandidaten (P4-Tor): RELAUNCH_FASSUNG=vorschau und RELAUNCH_KERN_SEITEN="/,/bad,…" = die Routen aus dem
// Stempel `.kandidat-stempel` des Builds (plus „/“, das live Kern ist). Ohne Liste bricht der Lauf ab.
const FASSUNG = process.env.RELAUNCH_FASSUNG ?? 'kandidat';
if (!['kandidat', 'bestand', 'vorschau'].includes(FASSUNG)) throw new Error(`RELAUNCH_FASSUNG unbekannt: ${FASSUNG}`);
const VORSCHAU_SEITEN = (process.env.RELAUNCH_KERN_SEITEN ?? '').split(',').map((s) => s.trim()).filter(Boolean);
if (FASSUNG === 'vorschau' && (!VORSCHAU_SEITEN.length || VORSCHAU_SEITEN.some((s) => !s.startsWith('/')))) {
  throw new Error('RELAUNCH_FASSUNG=vorschau braucht RELAUNCH_KERN_SEITEN="/,/bad,…"');
}
export const KERN_SEITEN = FASSUNG === 'bestand' ? [] : FASSUNG === 'vorschau' ? VORSCHAU_SEITEN : ['/'];
export const istKern = (pfad) => KERN_SEITEN.includes(new URL(pfad, 'http://pfad.invalid').pathname);
