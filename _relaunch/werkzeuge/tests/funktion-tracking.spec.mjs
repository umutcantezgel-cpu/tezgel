// F-11-Erweiterung · Tracking erst nach Einwilligung (E0-PRUEF-04, Teil B).
// Übernommen aus der Werkstatt-Suite (_werkstatt/werkzeuge/tests, E-038 Phase 1.1): eine Suite für alle Läufe.
// Zweck: belegt, dass das Analyse-Skript (Google Analytics 4, gtag.js) erst nach „Alle akzeptieren“ angefragt wird:
// nicht beim Erstbesuch ohne Entscheidung, nicht nach „Alle ablehnen“ (auch nach Neuladen und Seitenwechsel) und
// nach einem Widerruf nicht mehr nach Neuladen. Prüfgegenstand ist das Verhalten: Anfragen an die GA4-Hosts
// (Protokoll, art 'fremd'), die Kennung in der Skript-URL und der gespeicherte Zustand (Cookie tezgel_consent_status).
// Läuft nur gegen den Build mit Platzhalter-GA4-ID (127.0.0.1:4311 mit RELAUNCH_TRACKING=1); sonst übersprungen.
// Keine festen Wartezeiten: Zustandsabfragen (expect.poll) und Abwarten des Leerlaufs (lazyOnload-Skripte).
import { test, expect } from './fixtures.mjs';
import { durchscrollen } from '../lib.mjs';

const KENNUNG = 'G-TEST000000';
const COOKIE = 'tezgel_consent_status';
const GA_HOST = /googletagmanager\.com|google-analytics\.com/;
const GTAG = /googletagmanager\.com\/gtag\/js/;

// Bedienelemente über Rolle und Name, wie in funktion-einwilligung.spec.mjs.
const banner = (page) => page.getByRole('dialog', { name: /Cookie-Einwilligungsbanner/ });
const schalter = (page, name) => banner(page).getByRole('button', { name, exact: true });
const schild = (page) => page.getByRole('button', { name: 'Cookie-Einstellungen verwalten' });

// Gespeicherten Zustand lesen: der Cookie-Wert ist URL-kodiertes JSON.
async function lesEinwilligung(context) {
  const c = (await context.cookies()).find((k) => k.name === COOKIE);
  return c ? JSON.parse(decodeURIComponent(c.value)) : null;
}

// Anfragen an die Analyse-Hosts aus dem Protokoll der Sperre (G5); die Sperre beantwortet sie mit 204.
const gaAnfragen = (protokoll) => protokoll.filter((e) => e.art === 'fremd' && GA_HOST.test(e.url ?? ''));

// Das Protokoll speichert nur Host und Pfad; die Kennung steht in der Query und wird am Request gelesen.
function gtagAdressen(page) {
  const adressen = [];
  page.on('request', (r) => { if (GTAG.test(r.url())) adressen.push(r.url()); });
  return adressen;
}

// Leerlauf abwarten: lazyOnload-Skripte werden nach „load“ im Leerlauf eingefügt; danach ruht das Netz.
// Mit Obergrenze (timeout), damit der Leerlauf auch bei laufenden Animationen der Seite endet.
async function leerlauf(page) {
  await page.waitForLoadState('load');
  await page.evaluate(() => new Promise((fertig) => {
    const leer = () => new Promise((weiter) => {
      if (window.requestIdleCallback) window.requestIdleCallback(() => weiter(), { timeout: 1000 });
      else setTimeout(weiter, 0);
    });
    leer().then(leer).then(() => setTimeout(fertig, 0));
  }));
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
}

test.describe('Tracking erst nach Einwilligung (F-11-Erweiterung)', () => {
  test.skip(process.env.RELAUNCH_TRACKING !== '1', 'nur gegen den Build mit Platzhalter-GA4-ID');

  test.describe('Erstbesuch (kein Cookie)', () => {
    test.use({ einwilligung: 'erstbesuch' });

    test('(1) ohne Entscheidung: nach Laden und Scrollen keine Anfrage an GA4-Hosts', async ({ page, context, protokoll }) => {
      await page.goto('/');
      await expect(banner(page)).toBeVisible();
      await durchscrollen(page);
      await leerlauf(page);
      expect(await lesEinwilligung(context)).toBeNull();
      expect(gaAnfragen(protokoll)).toHaveLength(0);
    });

    test('(2) „Alle ablehnen“: auch nach Neuladen und Seitenwechsel keine Anfrage an GA4-Hosts', async ({ page, context, protokoll }) => {
      await page.goto('/');
      await expect(schalter(page, 'Alle ablehnen')).toBeVisible();
      await schalter(page, 'Alle ablehnen').click();
      await expect(banner(page)).toHaveCount(0);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ analytics: false, marketing: false });
      await page.reload();
      await durchscrollen(page);
      await leerlauf(page);
      expect(gaAnfragen(protokoll)).toHaveLength(0);
      // Seitenwechsel: vollständiger Aufruf von /kontakt. Der Fußlink ist mobil außerhalb des Sichtbereichs
      // (Ausgangsbefund, siehe Rückgabe), daher kein Klick.
      await page.goto('/kontakt');
      await durchscrollen(page);
      await leerlauf(page);
      expect(gaAnfragen(protokoll)).toHaveLength(0);
    });

    // Ausgangsverhalten (Einwilligungslogik, unantastbar): die Zustimmung wirkt ab dem nächsten Seitenaufruf
    // (useConsent übernimmt das Ereignis cookie_consent_updated beim Erstbesuch nicht) – daher Neuladen vor der Erwartung.
    // Ob GA im selben Besuch starten soll, entscheidet ein Mensch (MENSCHEN M-16).
    test('(3) „Alle akzeptieren“: ab dem nächsten Seitenaufruf Anfrage an gtag/js?id=G-TEST000000 (Sperre antwortet mit 204)', async ({ page, context, protokoll }) => {
      const adressen = gtagAdressen(page);
      await page.goto('/');
      await expect(schalter(page, 'Alle akzeptieren')).toBeVisible();
      await schalter(page, 'Alle akzeptieren').click();
      await expect(banner(page)).toHaveCount(0);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ analytics: true, marketing: true });
      await page.reload();
      await expect.poll(() => adressen.some((u) => new URL(u).searchParams.get('id') === KENNUNG), { timeout: 15_000 }).toBe(true);
      expect(gaAnfragen(protokoll).length).toBeGreaterThan(0);
    });
  });

  test.describe('Widerruf (Zustimmung vorhanden)', () => {
    test.use({ einwilligung: 'alle' });

    test('(4) „Cookie-Einstellungen verwalten“ → „Alle ablehnen“: nach Neuladen keine neue Anfrage an GA4-Hosts', async ({ page, context, protokoll }) => {
      await page.goto('/');
      await leerlauf(page);
      await expect(schild(page)).toBeVisible();
      await schild(page).click();
      await expect(schalter(page, 'Alle ablehnen')).toBeVisible();
      await schalter(page, 'Alle ablehnen').click();
      await expect(banner(page)).toHaveCount(0);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ analytics: false, marketing: false });
      const vorher = gaAnfragen(protokoll).length;
      await page.reload();
      await durchscrollen(page);
      await leerlauf(page);
      expect(gaAnfragen(protokoll)).toHaveLength(vorher);
    });
  });
});
