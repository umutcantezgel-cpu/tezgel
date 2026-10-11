// F-11 Einwilligung (Banner, Schaltflächen, Widerruf über den Fußlink „Cookie-Einstellungen“ = #cookie-settings, E-020)
// und F-12 Karten hinter Einwilligung.
// Prüft Verhalten: gespeicherter Zustand (Cookie tezgel_consent_status), Anfragen an Karten-Hosts (Protokoll, art 'fremd'),
// Platzhalter vor und geladene Karte nach Einwilligung. Keine Gestaltungsklassen, keine festen Wartezeiten.
// Selektoren über Rolle und Name; Bedienung erst nach der Hydrierung (bedienbar aus fixtures.mjs).
import { test, expect, bedienbar, KERN_SEITEN, istKern, oeffne, sprunglink } from './fixtures.mjs';

const ORTE = ['/', '/standorte', '/kontakt'];
const COOKIE = 'tezgel_consent_status';
const KARTEN_HOST = /maps\.googleapis\.com|maps\.gstatic\.com|openstreetmap\.org|google\.(com|de)\/maps/;
const LADE_KNOPF = 'Karte laden & zustimmen';

// Fassung je Seite (P3-14e, M-4): Welche Seiten des Ziels Kern sind, steht in dieser Liste – nie im DOM oder Laufzeitverhalten.
// Banner-Fälle in beiden Fassungen (M-2): „/“ (Kern im Kandidaten) und „/kontakt“ (Bestand).
const BANNER_ORTE = ['/', '/kontakt'];

// Bedienelemente über Rolle, Name und sichtbaren Text.
const banner = (page) => page.getByRole('dialog', { name: /Cookie-Einwilligungsbanner/ });
const schalter = (page, name) => banner(page).getByRole('button', { name, exact: true });
// Kategorie „Externe Medien & Marketing“, Rolle nach Fassung (M-2): Kern = Basis-Checkbox, Bestand = Knopf.
const marketingFeld = (page, ort) => banner(page).getByRole(istKern(ort) ? 'checkbox' : 'button', { name: /Externe Medien & Marketing/ });
// Gewählt: Kern über checked, Bestand über das Etikett „Aktiviert“ in der Kategorie (dieselbe Aussage).
async function erwarteGewaehlt(page, ort) {
  if (istKern(ort)) await expect(marketingFeld(page, ort)).toBeChecked();
  else await expect(marketingFeld(page, ort).getByText('Aktiviert', { exact: true })).toBeVisible();
}
// Widerruf-Einstieg der Kern-Seiten: Fußlink „Cookie-Einstellungen“ (#cookie-settings, E-020).
const widerruf = (page) => page.getByRole('link', { name: 'Cookie-Einstellungen', exact: true });
// Schild der Bestandsseiten (Bestand-Banner). Kern-Seiten haben kein Schild, dort gilt der Fußlink.
const schild = (page) => page.getByRole('button', { name: 'Cookie-Einstellungen verwalten' });
// Weg nach Fassung: Kern → Fußlink (E-020). Bestand → Schild; dort öffnet der Fußlink das Bestand-Banner nicht
// (next/link ohne hashchange, im Ausgangsstand 4310 ebenso).
const einstieg = (page, ort) => (istKern(ort) ? widerruf(page) : schild(page));

// „Nie erschienen“ zustandsbasiert (M-1): Ein MutationObserver hält ab Dokumentbeginn fest, ob der Banner-Dialog je im DOM
// war, bevor der Test den Einstieg betätigt. Vorher wäre „nie erschienen“ trivial, darum zählt das Skript zusätzlich die
// angemeldeten Fenster-Ereignisse und der Test wartet auf den Zustand „Banner hat entschieden“:
// - Jede Einwilligungslogik (useConsent) meldet nach dem Mount „openCookieSettings“ und „cookie_consent_updated“ an, aber
//   nur, wenn sie einen gültigen gespeicherten Stand gelesen hat (ohne Stand: Banner nach 400 ms, keine Anmeldung).
// - Die Banner-Steuerung (useEinwilligungsBanner, Kern und Bestand) meldet nach dem Mount nur „openCookieSettings“ an.
// Also: openCookieSettings − cookie_consent_updated ≥ 1 heißt „Banner gemountet“ (ein beim Mount gezeigter Dialog stünde
// dann schon im DOM), cookie_consent_updated ≥ 1 heißt „gespeicherter Stand gelesen“. Probe (Kandidat): mit „#cookie-settings“
// ist der Dialog zu diesem Zeitpunkt schon erfasst, ohne Cookie wird der Zustand nie erreicht.
async function beobachteBanner(page) {
  await page.addInitScript(() => {
    const w = window;
    w.__relaunchBanner = { vorEinstieg: false, einstieg: false, angemeldet: {} };
    const anmelden = w.addEventListener.bind(w);
    w.addEventListener = (typ, ...rest) => { w.__relaunchBanner.angemeldet[typ] = (w.__relaunchBanner.angemeldet[typ] || 0) + 1; return anmelden(typ, ...rest); };
    const pruefe = () => {
      if (!w.__relaunchBanner.einstieg && document.querySelector('[role="dialog"][aria-label^="Cookie-Einwilligungsbanner"]')) w.__relaunchBanner.vorEinstieg = true;
    };
    new MutationObserver(pruefe).observe(document, { childList: true, subtree: true, attributes: true });
  });
}
const bannerStand = (page) => page.evaluate(() => window.__relaunchBanner);
async function bannerHatEntschieden(page) {
  await expect.poll(async () => {
    const { angemeldet: a } = await bannerStand(page);
    const gelesen = a.cookie_consent_updated ?? 0;
    return gelesen >= 1 && (a.openCookieSettings ?? 0) - gelesen >= 1;
  }).toBe(true);
}
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
// Bedienung erst nach der Hydrierung: bedienbar wartet, bis React das Element übernommen hat.
async function klick(ziel) {
  await bedienbar(ziel);
  await ziel.click();
}

// Platzhalter-Knopf der Karte am jeweiligen Ort. Die Servicegebiet-Karte der Startseite wird erst im Blick eingebunden.
async function ladeKnopf(page, ort) {
  if (ort === '/') await page.getByText('Karte wird geladen...').first().scrollIntoViewIfNeeded();
  const bereich = ort === '/standorte' ? standortKarte(page) : page;
  return bereich.getByRole('button', { name: LADE_KNOPF });
}

test.describe('Einwilligung (F-11, global)', () => {
  test.describe('Erstbesuch (kein Cookie)', () => {
    test.use({ einwilligung: 'erstbesuch' });

    for (const ort of ORTE) {
      test(`${ort}: Banner zeigt „Alle akzeptieren“, „Alle ablehnen“ und „Einstellungen“ in der ersten Ebene; ohne Wahl kein Cookie`, async ({ page, context }) => {
        await oeffne(page, ort, schalter(page, 'Alle akzeptieren'));
        await expect(banner(page)).toBeVisible();
        await expect(schalter(page, 'Alle akzeptieren')).toBeEnabled();
        await expect(schalter(page, 'Alle ablehnen')).toBeEnabled();
        await expect(schalter(page, 'Einstellungen')).toBeEnabled();
        expect(await lesEinwilligung(context)).toBeNull();
      });
    }

    for (const ort of BANNER_ORTE) {
      test(`${ort}: Schließen ohne Wahl setzt nur technisch notwendige Cookies (keine Voreinstellung für Analyse oder Marketing)`, async ({ page, context }) => {
        await oeffne(page, ort, banner(page).getByRole('button', { name: /Cookie-Banner schließen/ }));
        await expect(banner(page)).toBeVisible();
        await klick(banner(page).getByRole('button', { name: /Cookie-Banner schließen/ }));
        await expect(banner(page)).toHaveCount(0);
        await expect.poll(() => lesEinwilligung(context)).toMatchObject({ essential: true, analytics: false, marketing: false });
      });

      test(`${ort}: Alle ablehnen: speichert Ablehnung in tezgel_consent_status, Banner schließt und bleibt nach Neuladen zu`, async ({ page, context }) => {
        await beobachteBanner(page);
        await oeffne(page, ort, schalter(page, 'Alle ablehnen'));
        await expect(schalter(page, 'Alle ablehnen')).toBeVisible();
        await klick(schalter(page, 'Alle ablehnen'));
        await expect(banner(page)).toHaveCount(0);
        await expect.poll(() => lesEinwilligung(context)).toMatchObject({ essential: true, analytics: false, marketing: false, version: '2.1.0' });
        await page.reload();
        // Zustand statt Wartezeit: Banner gemountet und gespeicherter Stand gelesen (siehe beobachteBanner).
        await bannerHatEntschieden(page);
        // Widerruf-Einstieg nach dem Neuladen: Kern Fußlink (E-020), Bestand Schild (erscheint erst, wenn der Banner zu bleibt).
        await bedienbar(einstieg(page, ort));
        await expect(einstieg(page, ort)).toBeVisible();
        await expect(banner(page)).toHaveCount(0);
        await expect.poll(async () => (await bannerStand(page)).vorEinstieg).toBe(false);
        expect(await lesEinwilligung(context)).toMatchObject({ analytics: false, marketing: false });
        // Der Einstieg öffnet die Einstellungen mit dem gelesenen Stand: nichts aktiviert, und erst jetzt erscheint der Dialog.
        await page.evaluate(() => { window.__relaunchBanner.einstieg = true; });
        await einstieg(page, ort).click();
        await expect(banner(page).getByText('Cookie-Einstellungen individuell anpassen')).toBeVisible();
        await expect(banner(page).getByText('Aktiviert', { exact: true })).toHaveCount(0);
        expect((await bannerStand(page)).vorEinstieg).toBe(false);
      });
    }

    test('Alle akzeptieren: speichert Analyse und Marketing in tezgel_consent_status, Banner schließt', async ({ page, context }) => {
      await oeffne(page, '/kontakt', schalter(page, 'Alle akzeptieren'));
      await expect(schalter(page, 'Alle akzeptieren')).toBeVisible();
      await klick(schalter(page, 'Alle akzeptieren'));
      await expect(banner(page)).toHaveCount(0);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ essential: true, analytics: true, marketing: true, version: '2.1.0' });
    });

    for (const ort of BANNER_ORTE) {
      test(`${ort}: #cookie-settings öffnet die Einstellungen direkt (Auswahl speichern und Zurück sichtbar)`, async ({ page }) => {
        await oeffne(page, `${ort}#cookie-settings`, schalter(page, 'Auswahl speichern'));
        await expect(banner(page)).toBeVisible();
        await expect(banner(page).getByText('Cookie-Einstellungen individuell anpassen')).toBeVisible();
        await expect(schalter(page, 'Auswahl speichern')).toBeEnabled();
        await expect(schalter(page, 'Zurück')).toBeEnabled();
      });

      test(`${ort}: Einstellungen: „Auswahl speichern“ übernimmt nur die gewählte Kategorie (Marketing an, Analyse aus)`, async ({ page, context }) => {
        await oeffne(page, ort, schalter(page, 'Einstellungen'));
        await expect(schalter(page, 'Einstellungen')).toBeVisible();
        await klick(schalter(page, 'Einstellungen'));
        await expect(schalter(page, 'Auswahl speichern')).toBeVisible();
        await klick(marketingFeld(page, ort));
        await erwarteGewaehlt(page, ort);
        await klick(schalter(page, 'Auswahl speichern'));
        await expect(banner(page)).toHaveCount(0);
        await expect.poll(() => lesEinwilligung(context)).toMatchObject({ analytics: false, marketing: true });
      });
    }
  });

  test.describe('Widerruf (Zustimmung vorhanden)', () => {
    test.use({ einwilligung: 'alle' });

    // Weg nach Fassung (Liste KERN_SEITEN): Kern der Fußlink (E-020), Bestand das Schild.
    const titel = (ort) => (istKern(ort) ? 'Fußlink „Cookie-Einstellungen“' : 'Schild „Cookie-Einstellungen verwalten“');
    for (const ort of ['/', '/standorte']) {
      test(`${ort}: ${titel(ort)} öffnet die Einstellungen mit aktuellem Stand; „Alle ablehnen“ entzieht Analyse und Marketing`, async ({ page, context }) => {
        await oeffne(page, ort, einstieg(page, ort));
        await expect(einstieg(page, ort)).toBeVisible();
        await expect(banner(page)).toHaveCount(0);
        await klick(einstieg(page, ort));
        // Einstellungsansicht zeigt den gespeicherten Stand: Analyse und Marketing sind als „Aktiviert“ markiert.
        await expect(banner(page).getByText('Aktiviert', { exact: true })).toHaveCount(2);
        await klick(schalter(page, 'Alle ablehnen'));
        await expect(banner(page)).toHaveCount(0);
        await expect.poll(() => lesEinwilligung(context)).toMatchObject({ analytics: false, marketing: false });
      });
    }
  });
});

test.describe('Karten hinter Einwilligung (F-12)', () => {
  test.describe('Erstbesuch (keine Entscheidung)', () => {
    test.use({ einwilligung: 'erstbesuch' });

    test('/kontakt: vor jeder Entscheidung Platzhalter statt Karte und keine Anfrage an Karten-Hosts', async ({ page, protokoll }) => {
      await oeffne(page, '/kontakt', schalter(page, 'Alle akzeptieren'));
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
        // Die Karte der Startseite wird erst im Blick eingehängt: Wartebedingung am Sprunglink (jede Seite, beide Fassungen).
        await oeffne(page, ort, sprunglink(page));
        const knopf = await ladeKnopf(page, ort);
        await expect(knopf).toBeVisible();
        await expect(page.locator('iframe[src*="openstreetmap.org"], iframe[src*="google.com/maps"]')).toHaveCount(0);
        await ruhe(page);
        expect(kartenAnfragen(protokoll)).toHaveLength(0);
      });
    }

    test('/standorte: „Karte laden & zustimmen“ setzt Marketing-Einwilligung und lädt die Karte (Anfrage an Karten-Host)', async ({ page, context, protokoll, isMobile }) => {
      // Befund (Ausgangsstand 5a7a7b0, gemessen): Auf Smartphone-Breite (375, 390, 430 px) deckt der Info-Kasten der
      // Standortkarte (absolut unten, z-10) den Knopf vollständig ab; ein Tipp trifft den Kasten. Desktop ist nicht
      // betroffen. Siehe OFFENE FRAGEN. Im Kern steht der Kasten neben bzw. unter der Karte (P4-08c) – dort läuft der Fall auch
      // mobil (P4-GEG M1); `fixme` gilt nur noch für die Bestandsfassung.
      test.fixme(isMobile && !istKern('/standorte'), 'Ausgangsstand: Info-Kasten der Standortkarte überdeckt den Platzhalter-Knopf auf Smartphone-Breite (OFFENE FRAGE)');
      await oeffne(page, '/standorte', standortKarte(page).getByRole('button', { name: LADE_KNOPF }));
      const knopf = await ladeKnopf(page, '/standorte');
      await klick(knopf);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ marketing: true });
      await expect(standortKarte(page).getByRole('button', { name: LADE_KNOPF })).toHaveCount(0);
      await expect.poll(() => kartenAnfragen(protokoll).length).toBeGreaterThan(0);
    });

    test('/kontakt: „Karte laden & zustimmen“ setzt Marketing-Einwilligung und lädt die Karte (Anfrage an Karten-Host)', async ({ page, context, protokoll }) => {
      await oeffne(page, '/kontakt', page.getByRole('button', { name: LADE_KNOPF }));
      const knopf = await ladeKnopf(page, '/kontakt');
      await klick(knopf);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ marketing: true });
      await expect(page.getByRole('button', { name: LADE_KNOPF })).toHaveCount(0);
      await expect.poll(() => kartenAnfragen(protokoll).length).toBeGreaterThan(0);
    });

    test('/: „Karte laden & zustimmen“ im Servicegebiet setzt Marketing-Einwilligung und ersetzt den Platzhalter', async ({ page, context }) => {
      await oeffne(page, '/', sprunglink(page));
      const knopf = await ladeKnopf(page, '/');
      await klick(knopf);
      await expect.poll(() => lesEinwilligung(context)).toMatchObject({ marketing: true });
      await expect(page.getByRole('button', { name: LADE_KNOPF })).toHaveCount(0);
    });

    // Befund M-16: Im Bestand öffnet dieser Knopf nur eine eigene Hook-Instanz und erreicht den Banner nicht.
    // Im Kern geht er über #cookie-settings wie der Fußlink; die Einwilligung bleibt dabei unverändert.
    // Nur Kern: der Fall läuft für jede Kern-Seite mit Servicegebiet-Karte aus KERN_SEITEN (im Kandidaten „/“); ein Ziel
    // ganz im Bestand hat keine, dort entfällt er über die Liste (diese Datei hat kein skip-Kontingent, Sperrklinke).
    for (const ort of KERN_SEITEN.filter((s) => s === '/')) {
      test(`${ort}: „Cookie-Einstellungen“ im Kartenplatzhalter öffnet die Einstellungen, ohne die Einwilligung zu ändern`, async ({ page, context }) => {
        await oeffne(page, ort, sprunglink(page));
        await ladeKnopf(page, ort);
        const vorher = await lesEinwilligung(context);
        expect(vorher).toMatchObject({ analytics: false, marketing: false });
        await klick(page.locator('#servicegebiet').getByRole('button', { name: 'Cookie-Einstellungen', exact: true }));
        await expect(banner(page).getByText('Cookie-Einstellungen individuell anpassen')).toBeVisible();
        // Einstellungen zeigen den gespeicherten Stand; erst wenn sie bedienbar sind, ist ein Nachschreiben ausgeschlossen (N-3).
        await bedienbar(marketingFeld(page, ort));
        await expect(marketingFeld(page, ort)).not.toBeChecked();
        await expect.poll(() => lesEinwilligung(context)).toEqual(vorher);
      });
    }
  });

  test.describe('mit Marketing-Einwilligung (alle)', () => {
    test.use({ einwilligung: 'alle' });

    test('/standorte: Karte ohne Platzhalter, Anfrage an Karten-Host', async ({ page, protokoll }) => {
      await oeffne(page, '/standorte', sprunglink(page));
      await standortKarte(page).scrollIntoViewIfNeeded();
      // Erst die geladene Karte abwarten (N-2), dann „kein Platzhalter“ prüfen.
      await expect(standortKarte(page).locator('iframe')).toBeAttached();
      await expect(standortKarte(page).getByRole('button', { name: LADE_KNOPF })).toHaveCount(0);
      await expect.poll(() => kartenAnfragen(protokoll).length).toBeGreaterThan(0);
    });

    // Nur Kern (Liste KERN_SEITEN): Die Kern-Startseite bettet nach Einwilligung die OpenStreetMap-Ansicht ein. Die
    // Bestand-Startseite zeigt ohne API-Schlüssel nur die Vektor-Karte ohne Karten-Host (P3-14c); der Bestand ist mit
    // „/standorte“ oben geprüft.
    for (const ort of KERN_SEITEN.filter((s) => s === '/')) {
      test(`${ort}: Karte ohne Platzhalter, Anfrage an Karten-Host (Servicegebiet im Blick)`, async ({ page, protokoll }) => {
        await oeffne(page, ort, sprunglink(page));
        await page.locator('#servicegebiet').scrollIntoViewIfNeeded();
        // Erst die geladene Karte abwarten (N-2), dann „kein Platzhalter“ prüfen.
        await expect(page.locator('#servicegebiet iframe')).toBeAttached();
        await expect(page.getByRole('button', { name: LADE_KNOPF })).toHaveCount(0);
        await expect.poll(() => kartenAnfragen(protokoll).length).toBeGreaterThan(0);
      });
    }
  });
});
