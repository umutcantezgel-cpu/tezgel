// FUNKTIONSTEST F-04 · BadanfrageFunnel (/bad/badanfrage, 5 Schritte).
// Kernaufgabe: Schritte vor/zurück (Auswahl bleibt erhalten), Pflichtfelder blockieren den Versand,
// Gutfall sendet POST /api/anfrage mit inquiryType „bad“ und badDetails und zeigt Erfolg mit Referenz.
// Geprüft wird Verhalten (Nutzlast, Zustand), nicht Aussehen. Altverhalten = Ausgangsstand 5a7a7b0.
import { test, expect, warteBotSchwelle, istEchteReferenz, oeffne, istKern } from './fixtures.mjs';

const SEITE = '/bad/badanfrage';

// Fassung je Seite (Lehre 10, P4-06): Welche Seiten Kern sind, steht in KERN_SEITEN (fixtures.mjs), nie im DOM.
// Kern (P4-05a): Objektart, Umfang und Stufe sind Radios, die Wunschausstattung Ankreuzfelder (Bestand: Knöpfe mit
// aria-pressed). Beschriftungen, Knopfnamen, „Schritt n von 5“ und die Nutzlast sind in beiden Fassungen gleich.
const KERN = istKern(SEITE);

// Bedienelemente über Rollen, Namen und Labels; Schrittanzeige über den sichtbaren Text.
const schritt = (page, n) => page.getByText(new RegExp(`Schritt ${n} von 5`));
const weiter = (page, n) => page.getByRole('button', { name: `Weiter zu Schritt ${n}`, exact: true });
const zurueck = (page) => page.getByRole('button', { name: 'Zurück', exact: true });
const zurueckZu = (page, n) => page.getByRole('button', { name: `Zurück zu Schritt ${n}`, exact: true });
const option = (page, anfang) => page.getByRole(KERN ? 'radio' : 'button', { name: new RegExp(`^${anfang}`) });
// Gewählt: Kern über checked, Bestand über aria-pressed (dieselbe Aussage). Aufruf: gewaehlt(expect(option(…))).
const gewaehlt = (erwartung) => (KERN ? erwartung.toBeChecked() : erwartung.toHaveAttribute('aria-pressed', 'true'));
const ausstattung = (page, name) => page.getByRole(KERN ? 'checkbox' : 'button', { name, exact: true });
const absenden = (page) => page.getByRole('button', { name: 'Badanfrage jetzt absenden (Online)', exact: true });
const feld = {
  name: (page) => page.getByLabel(/^Vor- & Nachname/),
  telefon: (page) => page.getByLabel(/^Telefonnummer für Rückfragen/),
  email: (page) => page.getByLabel(/^E-Mail-Adresse/),
  strasse: (page) => page.getByLabel(/^Straße & Hausnummer/),
  plzOrt: (page) => page.getByLabel(/^PLZ & Ort/),
  anmerkungen: (page) => page.getByLabel(/^Anmerkungen/),
};

// Seite öffnen und erst bedienen, wenn React den Funnel übernommen hat (erster Knopf „Weiter zu Schritt 2“).
const oeffneSeite = (page) => oeffne(page, SEITE, weiter(page, 2));

// Vorwärts bis Schritt n (ohne Auswahl zu ändern); die Seite muss schon geöffnet sein.
async function bisSchritt(page, n) {
  for (let s = 2; s <= n; s++) {
    await weiter(page, s).click();
    await expect(schritt(page, s)).toBeVisible();
  }
}

test.describe('BadanfrageFunnel (/bad/badanfrage)', () => {
  test('Schritte vor und zurück: Auswahl und Maße bleiben erhalten, keine Anfrage', async ({ page, anfragen }) => {
    await oeffneSeite(page);
    await option(page, 'Gewerbeobjekt').click();
    await gewaehlt(expect(option(page, 'Gewerbeobjekt')));
    await weiter(page, 2).click();
    await expect(schritt(page, 2)).toBeVisible();
    await option(page, 'Barrierefreies Bad').click();
    await weiter(page, 3).click();
    await expect(schritt(page, 3)).toBeVisible();
    await page.getByLabel('Länge (m)', { exact: true }).fill('4');
    await page.getByLabel('Breite (m)', { exact: true }).fill('2');
    await expect(page.getByText('8.0 m²', { exact: true })).toBeVisible();
    await weiter(page, 4).click();
    await expect(schritt(page, 4)).toBeVisible();
    await option(page, 'Basic').click();
    await weiter(page, 5).click();
    await expect(schritt(page, 5)).toBeVisible();

    await zurueckZu(page, 4).click();
    await expect(schritt(page, 4)).toBeVisible();
    await gewaehlt(expect(option(page, 'Basic')));
    await zurueck(page).click();
    await expect(schritt(page, 3)).toBeVisible();
    await expect(page.getByLabel('Länge (m)', { exact: true })).toHaveValue('4');
    await expect(page.getByLabel('Breite (m)', { exact: true })).toHaveValue('2');
    await zurueck(page).click();
    await expect(schritt(page, 2)).toBeVisible();
    await gewaehlt(expect(option(page, 'Barrierefreies Bad')));
    await zurueck(page).click();
    await expect(schritt(page, 1)).toBeVisible();
    await gewaehlt(expect(option(page, 'Gewerbeobjekt')));
    expect(anfragen).toHaveLength(0);
  });

  test('Pflichtfelder: leerer Name und leere Telefonnummer blockieren den Versand, keine Anfrage', async ({ page, anfragen }) => {
    await oeffneSeite(page);
    await bisSchritt(page, 5);
    await absenden(page).click();
    await expect(feld.name(page)).toBeFocused();
    expect(await feld.name(page).evaluate((el) => !el.checkValidity())).toBe(true);
    await expect(schritt(page, 5)).toBeVisible();
    expect(anfragen).toHaveLength(0);
  });

  test('Telefonnummer unter 6 Zeichen blockiert den Versand, keine Anfrage', async ({ page, anfragen }) => {
    await oeffneSeite(page);
    await bisSchritt(page, 5);
    await feld.name(page).fill('Prüf Person');
    await feld.telefon(page).fill('0170');
    await absenden(page).click();
    await expect(feld.telefon(page)).toBeFocused();
    expect(await feld.telefon(page).evaluate((el) => !el.checkValidity())).toBe(true);
    expect(anfragen).toHaveLength(0);
  });

  test('ungültige E-Mail-Adresse blockiert den Versand, keine Anfrage', async ({ page, anfragen }) => {
    await oeffneSeite(page);
    await bisSchritt(page, 5);
    await feld.name(page).fill('Prüf Person');
    await feld.telefon(page).fill('0170 0000000');
    await feld.email(page).fill('keine-adresse');
    await absenden(page).click();
    await expect(feld.email(page)).toBeFocused();
    expect(await feld.email(page).evaluate((el) => !el.checkValidity())).toBe(true);
    expect(anfragen).toHaveLength(0);
  });

  test('Gutfall online: POST /api/anfrage mit inquiryType „bad“ und badDetails, Erfolg mit Referenz', async ({ page, anfragen }) => {
    await oeffneSeite(page);
    await option(page, 'Eigentumswohnung').click();
    await weiter(page, 2).click();
    await option(page, 'Wanne zu Dusche').click();
    await weiter(page, 3).click();
    await page.getByLabel('Länge (m)', { exact: true }).fill('2.5');
    await page.getByLabel('Breite (m)', { exact: true }).fill('4');
    await page.getByLabel('Personen im Haushalt', { exact: true }).selectOption('3-4');
    await weiter(page, 4).click();
    await option(page, 'Luxus').click();
    await ausstattung(page, 'Badewanne').click();
    await ausstattung(page, 'LED-Lichtspiegel').click();
    await weiter(page, 5).click();
    await expect(schritt(page, 5)).toBeVisible();
    await feld.name(page).fill('Prüf Person');
    await feld.telefon(page).fill('0170 0000000');
    await feld.email(page).fill('pruef@example.de');
    await feld.strasse(page).fill('Musterweg 3');
    await feld.plzOrt(page).fill('35614 Aßlar');
    await feld.anmerkungen(page).fill('Testnotiz Badanfrage');
    await absenden(page).click();
    await expect(page.getByText('Badanfrage erfolgreich übermittelt')).toBeVisible();
    await expect(page.getByText('Vielen Dank, Prüf Person!')).toBeVisible();
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({
      inquiryType: 'bad',
      projectType: 'bad',
      projectTitle: 'Badsanierung (Wanne zu Dusche · Luxus)',
      contact: {
        name: 'Prüf Person',
        phone: '0170 0000000',
        email: 'pruef@example.de',
        street: 'Musterweg 3',
        zipCity: '35614 Aßlar',
        location: 'Musterweg 3, 35614 Aßlar',
      },
      badDetails: {
        scope: 'dusche',
        scopeLabel: 'Wanne zu Dusche',
        tier: 'luxus',
        tierLabel: 'Luxus',
        sqm: '10.0',
        length: '2.5',
        width: '4',
        persons: '3-4',
        personsLabel: '3 - 4 Personen (Familie)',
        propertyType: 'etw',
        propertyTypeLabel: 'Eigentumswohnung',
        features: ['walkin', 'wanne'],
        featureLabels: ['Bodengleiche Walk-In-Dusche', 'Badewanne'],
      },
      notes: 'Testnotiz Badanfrage',
    });
  });

  test('Gutfall nur Pflichtangaben: Standardauswahl wird gesendet, optionale Felder fehlen', async ({ page, anfragen }) => {
    await oeffneSeite(page);
    await bisSchritt(page, 5);
    await feld.name(page).fill('Prüf Person');
    await feld.telefon(page).fill('0170 0000000');
    await absenden(page).click();
    await expect(page.getByText('Badanfrage erfolgreich übermittelt')).toBeVisible();
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({
      inquiryType: 'bad',
      badDetails: {
        scope: 'komplett',
        tier: 'premium',
        propertyType: 'efh',
        persons: '2',
        length: '3.0',
        width: '2.5',
        sqm: '7.5',
        features: ['walkin', 'led-spiegel'],
      },
    });
    expect(anfragen[0].contact.email).toBeUndefined();
    expect(anfragen[0].contact.street).toBeUndefined();
    expect(anfragen[0].notes).toBeUndefined();
  });

  test.describe('echte Route (Mock-Modus ohne Resend-Schlüssel)', () => {
    test.use({ echteRoute: true });
    test('Server nimmt Badanfrage an und vergibt echte Referenz (kein Bot-/Spam-Ignorieren)', async ({ page }) => {
      await oeffneSeite(page);
      await warteBotSchwelle(page);
      await bisSchritt(page, 5);
      await feld.name(page).fill(`Prüf ${Date.now() % 100000}`);
      await feld.telefon(page).fill(`0170 ${String(Date.now()).slice(-7)}`);
      await absenden(page).click();
      const ref = page.getByText(/TEZ-\d{2}-[A-Z0-9]+/).first();
      await expect(ref).toBeVisible();
      const id = (await ref.textContent()).match(/TEZ-\d{2}-[A-Z0-9]+/)?.[0] ?? '';
      expect(istEchteReferenz(id)).toBe(true);
    });
  });
});
