// F-11 Einwilligung (Banner, Schaltflächen, #cookie-settings, Widerruf) und F-12 Karten hinter Einwilligung.
// Prüft Verhalten: gespeicherter Zustand (Cookie tezgel_consent_status), Anfragen an Karten-Hosts (Protokoll, art 'fremd'),
// Platzhalter vor und geladene Karte nach Einwilligung. Keine Gestaltungsklassen, keine festen Wartezeiten.
import { test, expect } from './fixtures.mjs';

const ORTE = ['/', '/standorte', '/kontakt'];
const COOKIE = 'tezgel_consent_status';
const KARTEN_HOST = /maps\.googleapis\.com|maps\.gstatic\.com|openstreetmap\.org|google\.(com|de)\/maps/;
const LADE_KNOPF = 'Karte laden & zustimmen';

// Bedienelemente über Rolle, Name und sichtbaren Text.
const banner = (page) => page.getByRole('dialog', { name: /Cookie-Einwilligungsbanner/ });
const schalter = (page, name) => banner(page).getByRole('button', { name, exact: true });
const schild = (page) => page.getByRole('button', { name: 'Cookie-Einstellungen verwalten' });
const standortKarte = (page) =>
  page.locator('section').filter({ has: page.getByRole('heading', { name: 'Unser Hauptstandort in Aßlar', exact: true }) });

// Gespeicherten Zustand lesen: der Cookie-Wert ist URL-kodiertes JSON.
async function lesEinwilligung(context) {
  const c = (await context.cookies()).find((k) => k.name === COOKIE);
  return c ? JSON.parse(decodeURIComponent(c.value)) : null;
}
const kartenAnfragen = (protokoll) => protokoll.filter((e) => e.art === 'fremd' && KARTEN_HOST.test(e.url ?? ''));
// Auf Ruhe im Netz warten (mit Obergrenze), bevor „keine Anfrage“ geprüft wird.
const ruhe = (page) => page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

// Platzhalter-Knopf der Karte am jeweiligen Ort. Die Servicegebiet-Karte der Startseite wird erst im Blick eingebunden.
async function ladeKnopf(page, ort) {
  // E2-BAU-04: auf / steht das Einwilligungs-Tor sofort im Dokument (vorher erst ein Ladehinweis) – Knopf in den Blick holen
  if (ort === '/') await page.getByRole('button', { name: LADE_KNOPF }).first().scrollIntoViewIfNeeded();
  const bereich = ort === '/standorte' ? standortKarte(page) : page;
  return bereich.getByRole('button', { name: LADE_KNOPF });
}

test.describe('Einwilligung (F-11, global)', () => {
  test.describe('Erstbesuch (kein Cookie)', () => {
    test.use({ einwilligung: 'erstbesuch' });

    for (const ort of ORTE) {
      test(`${ort}: Banner zeigt „Alle akzeptieren“, „Alle ablehnen“ und „Einstellungen“ in der ersten Ebene; ohne Wahl kein Cookie`, async ({ page, context }) => {
        await page.goto(ort);
        await expect(banner(page)).toBeVisible();
        await expect(schalter(page, 'Alle akzeptieren')).toBeEnabled();
        await expect(schalter(page, 'Alle ablehnen')).toBeEnabled();
        await expect(schalter(page, 'Einstellungen')).toBeEnabled();
        expect(await lesEinwilligung(context)).toBeNull();
      });
    }

    test('Schließen ohne Wahl setzt nur technisch notwendige Cookies (keine Voreinstellung für Analyse oder Marketing)', async ({ page, context }) => {
      await page.goto('/');
      await expect(banner(page)).toBeVisible();
      await banner(page).getByRole('button', { name: /Cookie-Banner schließen/ }).click();
      await expect(banner(page)).toHaveCount(0);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ essential: true, analytics: false, marketing: false });
    });

    test('Alle ablehnen: speichert Ablehnung in tezgel_consent_status, Banner schließt und bleibt nach Neuladen zu', async ({ page, context }) => {
      await page.goto('/');
      await expect(schalter(page, 'Alle ablehnen')).toBeVisible();
      await schalter(page, 'Alle ablehnen').click();
      await expect(banner(page)).toHaveCount(0);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ essential: true, analytics: false, marketing: false, version: '2.1.0' });
      await page.reload();
      await expect(schild(page)).toBeVisible();
      await expect(banner(page)).toHaveCount(0);
      expect(await lesEinwilligung(context)).toMatchObject({ analytics: false, marketing: false });
    });

    test('Alle akzeptieren: speichert Analyse und Marketing in tezgel_consent_status, Banner schließt', async ({ page, context }) => {
      await page.goto('/kontakt');
      await expect(schalter(page, 'Alle akzeptieren')).toBeVisible();
      await schalter(page, 'Alle akzeptieren').click();
      await expect(banner(page)).toHaveCount(0);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ essential: true, analytics: true, marketing: true, version: '2.1.0' });
    });

    test('#cookie-settings öffnet die Einstellungen direkt (Auswahl speichern und Zurück sichtbar)', async ({ page }) => {
      await page.goto('/#cookie-settings');
      await expect(banner(page)).toBeVisible();
      await expect(banner(page).getByText('Cookie-Einstellungen individuell anpassen')).toBeVisible();
      await expect(schalter(page, 'Auswahl speichern')).toBeEnabled();
      await expect(schalter(page, 'Zurück')).toBeEnabled();
    });

    test('Einstellungen: „Auswahl speichern“ übernimmt nur die gewählte Kategorie (Marketing an, Analyse aus)', async ({ page, context }) => {
      await page.goto('/');
      await expect(schalter(page, 'Einstellungen')).toBeVisible();
      await schalter(page, 'Einstellungen').click();
      await expect(schalter(page, 'Auswahl speichern')).toBeVisible();
      await banner(page).getByRole('button', { name: /Externe Medien & Marketing/ }).click();
      await schalter(page, 'Auswahl speichern').click();
      await expect(banner(page)).toHaveCount(0);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ analytics: false, marketing: true });
    });
  });

  test.describe('Widerruf (Zustimmung vorhanden)', () => {
    test.use({ einwilligung: 'alle' });

    test('Schild öffnet die Einstellungen mit aktuellem Stand; „Alle ablehnen“ entzieht Analyse und Marketing', async ({ page, context }) => {
      await page.goto('/standorte');
      await expect(schild(page)).toBeVisible();
      await expect(banner(page)).toHaveCount(0);
      await schild(page).click();
      // Einstellungsansicht zeigt den gespeicherten Stand: Analyse und Marketing sind als „Aktiviert“ markiert.
      await expect(banner(page).getByText('Aktiviert', { exact: true })).toHaveCount(2);
      await schalter(page, 'Alle ablehnen').click();
      await expect(banner(page)).toHaveCount(0);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ analytics: false, marketing: false });
    });
  });
});

test.describe('Karten hinter Einwilligung (F-12)', () => {
  test.describe('Erstbesuch (keine Entscheidung)', () => {
    test.use({ einwilligung: 'erstbesuch' });

    test('/kontakt: vor jeder Entscheidung Platzhalter statt Karte und keine Anfrage an Karten-Hosts', async ({ page, protokoll }) => {
      await page.goto('/kontakt');
      await expect(banner(page)).toBeVisible();
      const knopf = await ladeKnopf(page, '/kontakt');
      await expect(knopf).toBeVisible();
      await ruhe(page);
      expect(kartenAnfragen(protokoll)).toHaveLength(0);
    });
  });

  test.describe('ohne Marketing-Einwilligung (abgelehnt)', () => {
    for (const ort of ORTE) {
      test(`${ort}: Zwei-Klick-Platzhalter statt Karte, keine Anfrage an Karten-Hosts`, async ({ page, protokoll }) => {
        await page.goto(ort);
        const knopf = await ladeKnopf(page, ort);
        await expect(knopf).toBeVisible();
        await expect(page.locator('iframe[src*="openstreetmap.org"], iframe[src*="google.com/maps"]')).toHaveCount(0);
        await ruhe(page);
        expect(kartenAnfragen(protokoll)).toHaveLength(0);
      });
    }

    test('/standorte: „Karte laden & zustimmen“ setzt Marketing-Einwilligung und lädt die Karte (Anfrage an Karten-Host)', async ({ page, context, protokoll }) => {
      // V-01 behoben (E2-BAU-04): Der Info-Kasten steht im Fluss unter der Karte und überdeckt den Knopf nicht mehr;
      // der Ausgangsbefund (Smartphone-Breite, Kasten absolut über dem Knopf) gilt damit als Abnahmetest auch mobil.
      await page.goto('/standorte');
      const knopf = await ladeKnopf(page, '/standorte');
      await knopf.click();
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ marketing: true });
      await expect(standortKarte(page).getByRole('button', { name: LADE_KNOPF })).toHaveCount(0);
      await expect.poll(() => kartenAnfragen(protokoll).length).toBeGreaterThan(0);
    });

    test('/kontakt: „Karte laden & zustimmen“ setzt Marketing-Einwilligung und lädt die Karte (Anfrage an Karten-Host)', async ({ page, context, protokoll }) => {
      await page.goto('/kontakt');
      const knopf = await ladeKnopf(page, '/kontakt');
      await knopf.click();
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ marketing: true });
      await expect(page.getByRole('button', { name: LADE_KNOPF })).toHaveCount(0);
      await expect.poll(() => kartenAnfragen(protokoll).length).toBeGreaterThan(0);
    });

    test('/: „Karte laden & zustimmen“ im Servicegebiet setzt Marketing-Einwilligung und ersetzt den Platzhalter', async ({ page, context }) => {
      await page.goto('/');
      const knopf = await ladeKnopf(page, '/');
      await knopf.click();
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ marketing: true });
      await expect(page.getByRole('button', { name: LADE_KNOPF })).toHaveCount(0);
    });
  });

  test.describe('mit Marketing-Einwilligung (alle)', () => {
    test.use({ einwilligung: 'alle' });

    test('/standorte: Karte ohne Platzhalter, Anfrage an Karten-Host', async ({ page, protokoll }) => {
      await page.goto('/standorte');
      await standortKarte(page).scrollIntoViewIfNeeded();
      await expect(standortKarte(page).getByRole('button', { name: LADE_KNOPF })).toHaveCount(0);
      await expect.poll(() => kartenAnfragen(protokoll).length).toBeGreaterThan(0);
    });
  });
});
