// FUNKTIONSTEST F-03 · TezgelAnfrageFunnel (3 Schritte). Bedienfolge und Versand auf /kontakt (Bestand) und /#express-anfrage (Kern-Startseite);
// Gutfall zusätzlich an /leistungen und /foerderung (Bestand).
// Kernaufgabe: Schritte vor/zurück (Auswahl bleibt erhalten), Validierung im Kontaktschritt, Versand POST /api/anfrage
// mit inquiryType „general“ und Projektdaten, Erfolg mit Referenz; WhatsApp-Alternative (Ziel-Link mit vorbelegtem Text).
// Geprüft wird Verhalten (Nutzlast, Zustand, Ziel), nicht Aussehen. Bedienelemente über Rollen, Namen und IDs.
// P3-14a: Die Fassungen unterscheiden sich in der Rolle der Auswahl (Kern: Radio, Bestand: Knopf) und im Absende-Knopf
// („Anfrage senden“ nur Kern, MIKROTEXTE Z. 26; Bestand „Anfrage verbindlich absenden“). Die Hilfen unten wählen den Weg
// nach der Fassung der Seite (Liste KERN_SEITEN, P3-14e); die Erwartungen bleiben gleich.
// Bedienung erst nach der Hydrierung (bedienbar).
import { test, expect, bedienbar, warteBotSchwelle, istEchteReferenz, KERN_SEITEN, istKern } from './fixtures.mjs';

// Fassung je Seite (P3-14e, M-4): Welche Seiten des Ziels Kern sind, steht in dieser Liste – nie im DOM oder Laufzeitverhalten.
// Rolle einer Auswahl nach Fassung: Kern = Radio, Bestand = Knopf.
const auswahlRolle = (seite) => (istKern(seite) ? 'radio' : 'button');

// Bedienfolge: Bestand (/kontakt) und Kern-Startseite (Anker).
const SEITEN = ['/kontakt', '/#express-anfrage'];
// Gutfall je Ort: Bestand und Kern.
const ORTE = ['/kontakt', '/#express-anfrage', '/leistungen', '/foerderung'];

// Bedienelemente (Rollen, sichtbare Texte, IDs der Felder).
const SCHRITT_TITEL = { 1: 'Welches Projekt planen Sie?', 2: 'Fläche, Zeitraum & Ort', 3: 'Kontaktdaten & Absenden' };
const schrittAnzeige = (page, n) => page.getByText(`Schritt ${n}: ${SCHRITT_TITEL[n]}`, { exact: true });
const weiterZu = (page, n) => page.getByRole('button', { name: new RegExp(`^Weiter zu Schritt ${n}:`) });
// Funnel-Bereich: Abschnitt #express-anfrage (auf /kontakt und /). Auf / steht im Hero dasselbe Vorhaben als Auswahl,
// darum wird die Projektart nur innerhalb des Funnels gesucht.
const funnel = (page) => page.locator('#express-anfrage');
// Projektart: Kern-Radio bzw. Bestands-Knopf (Teilsuche über den Namen).
const projekt = (page, seite, titel) => funnel(page).getByRole(auswahlRolle(seite), { name: new RegExp(titel) });
// Gewählt: Kern über checked, Bestand über aria-pressed.
const projektGewaehlt = (page, seite, titel) =>
  istKern(seite)
    ? funnel(page).getByRole('radio', { name: new RegExp(titel), checked: true })
    : funnel(page).getByRole('button', { name: new RegExp(titel), pressed: true });
// Auswahl innerhalb einer Gruppe mit genauem Namen.
const wahlIn = (gruppe, seite, text) => gruppe.getByRole(auswahlRolle(seite), { name: text, exact: true });
const flaeche = (page, seite, text) => wahlIn(page.getByRole('group', { name: 'Ungefähre Fläche in Quadratmetern' }), seite, text);
const zeitraum = (page, seite, text) => wahlIn(page.getByRole('group', { name: 'Gewünschter Ausführungszeitraum' }), seite, text);
// Absende-Knopf, Name nach Fassung (N-1).
const absenden = (page, seite) =>
  page.getByRole('button', { name: istKern(seite) ? 'Anfrage senden' : 'Anfrage verbindlich absenden', exact: true });
const whatsappDirekt = (page) => page.getByRole('button', { name: 'Direkt per WhatsApp', exact: true });

// Seite öffnen und warten, bis der Funnel hydriert ist (erster Schritt-Knopf ist bedienbar).
async function bereit(page, pfad) {
  await page.goto(pfad);
  await bedienbar(weiterZu(page, 2));
}

// Jeder Schrittwechsel wird abgewartet (Überschrift des neuen Schritts sichtbar), bevor der nächste Knopf gedrückt wird.
async function zuSchritt3(page) {
  await weiterZu(page, 2).click();
  await expect(schrittAnzeige(page, 2)).toBeVisible();
  await weiterZu(page, 3).click();
  await expect(schrittAnzeige(page, 3)).toBeVisible();
}

async function kontaktEintragen(page, { name = 'Prüf Person', telefon = '0170 0000000' } = {}) {
  await page.locator('#funnel-name').fill(name);
  await page.locator('#funnel-phone').fill(telefon);
}

for (const seite of SEITEN) {
  test.describe(`TezgelAnfrageFunnel (F-03, ${seite})`, () => {
    test('Schritte vor und zurück: Auswahl bleibt erhalten, „Ändern“ führt zu Schritt 2', async ({ page }) => {
      await bereit(page, seite);
      await expect(schrittAnzeige(page, 1)).toBeVisible();
      await projekt(page, seite, 'Balkon & Terrasse').click();
      await weiterZu(page, 2).click();
      await expect(schrittAnzeige(page, 2)).toBeVisible();
      await expect(page.locator('[aria-label="Fortschritt"] [aria-current="step"]')).toHaveText('2');
      await flaeche(page, seite, '35 - 75 m²').click();
      await weiterZu(page, 3).click();
      await expect(schrittAnzeige(page, 3)).toBeVisible();
      await expect(page.getByText(/Projekt: Balkon & Terrasse/)).toBeVisible();
      await expect(page.getByText(/Umfang: 35 - 75 m²/)).toBeVisible();

      await page.getByRole('button', { name: 'Zurück zu Schritt 2', exact: true }).click();
      await expect(schrittAnzeige(page, 2)).toBeVisible();
      await page.getByRole('button', { name: 'Zurück', exact: true }).click();
      await expect(schrittAnzeige(page, 1)).toBeVisible();
      await expect(projektGewaehlt(page, seite, 'Balkon & Terrasse')).toHaveCount(1);

      await weiterZu(page, 2).click();
      await weiterZu(page, 3).click();
      await expect(page.getByText(/Umfang: 35 - 75 m²/)).toBeVisible();
      await page.getByRole('button', { name: 'Ändern', exact: true }).click();
      await expect(schrittAnzeige(page, 2)).toBeVisible();
    });

    test('Kontaktschritt ohne Name und Telefon: Pflichtfelder blockieren, keine Anfrage', async ({ page, anfragen }) => {
      await bereit(page, seite);
      await zuSchritt3(page);
      await absenden(page, seite).click();
      const nameUngueltig = await page.locator('#funnel-name').evaluate((el) => !el.checkValidity());
      const telefonUngueltig = await page.locator('#funnel-phone').evaluate((el) => !el.checkValidity());
      expect(nameUngueltig && telefonUngueltig).toBe(true);
      await expect(schrittAnzeige(page, 3)).toBeVisible();
      await expect(absenden(page, seite)).toBeVisible();
      expect(anfragen).toHaveLength(0);
    });

    test('Telefonnummer unter 6 Zeichen: Versand blockiert, keine Anfrage', async ({ page, anfragen }) => {
      await bereit(page, seite);
      await zuSchritt3(page);
      await kontaktEintragen(page, { telefon: '0170' });
      await absenden(page, seite).click();
      const zuKurz = await page.locator('#funnel-phone').evaluate((el) => el.validity.tooShort);
      expect(zuKurz).toBe(true);
      await expect(schrittAnzeige(page, 3)).toBeVisible();
      expect(anfragen).toHaveLength(0);
    });

    test('ungültige E-Mail-Adresse: Versand blockiert, keine Anfrage', async ({ page, anfragen }) => {
      await bereit(page, seite);
      await zuSchritt3(page);
      await kontaktEintragen(page);
      await page.locator('#funnel-email').fill('keine-adresse');
      await absenden(page, seite).click();
      const ungueltig = await page.locator('#funnel-email').evaluate((el) => el.validity.typeMismatch);
      expect(ungueltig).toBe(true);
      await expect(absenden(page, seite)).toBeVisible();
      expect(anfragen).toHaveLength(0);
    });

    test('WhatsApp ohne Name und Telefon: Hinweis statt Öffnen, kein WhatsApp-Aufruf', async ({ page, anfragen }) => {
      await bereit(page, seite);
      await zuSchritt3(page);
      await whatsappDirekt(page).click();
      await expect(page.getByText('Bitte tragen Sie zumindest Ihren Namen und eine Telefonnummer ein.')).toBeVisible();
      await expect(page.getByText('WhatsApp geöffnet')).toHaveCount(0);
      const geoeffnet = await page.evaluate(() => window.__relaunchOpened);
      expect(geoeffnet).toEqual([]);
      expect(anfragen).toHaveLength(0);
    });

    test('Gutfall mit allen Angaben: Projekt, Fläche, Zeitraum, Ort, Kontakt und Notiz landen in der Nutzlast', async ({ page, anfragen }) => {
      await bereit(page, seite);
      await projekt(page, seite, 'Balkon & Terrasse').click();
      await weiterZu(page, 2).click();
      await page.locator('#funnel-custom-area').fill('24');
      await zeitraum(page, seite, 'Schnellstmöglich').click();
      await page.locator('#funnel-location').fill('35614 Aßlar');
      await weiterZu(page, 3).click();
      await kontaktEintragen(page);
      await page.locator('#funnel-email').fill('pruef@example.de');
      await page.locator('#funnel-notes').fill('Altbelag vorhanden');
      await absenden(page, seite).click();
      await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
      expect(anfragen).toHaveLength(1);
      expect(anfragen[0]).toMatchObject({
        inquiryType: 'general',
        projectType: 'balkon',
        projectTitle: 'Balkon & Terrasse',
        area: '24 m²',
        timing: 'Schnellstmöglich',
        notes: 'Altbelag vorhanden',
        contact: { name: 'Prüf Person', phone: '0170 0000000', email: 'pruef@example.de', location: '35614 Aßlar' },
      });
    });

    test('WhatsApp-Alternative mit gültigen Angaben: Ziel mit vorbelegtem Text, Zustand „WhatsApp geöffnet“, kein Versand', async ({ page, anfragen }) => {
      await bereit(page, seite);
      await projekt(page, seite, 'Balkon & Terrasse').click();
      await weiterZu(page, 2).click();
      await page.locator('#funnel-custom-area').fill('24');
      await zeitraum(page, seite, 'Schnellstmöglich').click();
      await page.locator('#funnel-location').fill('35614 Aßlar');
      await weiterZu(page, 3).click();
      await kontaktEintragen(page);
      const waAnfrage = page.waitForRequest((r) => r.url().startsWith('https://api.whatsapp.com/send'), { timeout: 10_000 });
      await whatsappDirekt(page).click();
      const ziel = new URL((await waAnfrage).url());
      expect(ziel.searchParams.get('phone')).toBe('491726728504');
      const text = ziel.searchParams.get('text') ?? '';
      expect(text).toContain('Projekt: Balkon & Terrasse');
      expect(text).toContain('Fläche: ca. 24 m²');
      expect(text).toContain('Ort: 35614 Aßlar');
      expect(text).toContain('Gewünschter Zeitraum: Schnellstmöglich');
      expect(text).toContain('Name: Prüf Person');
      expect(text).toContain('Telefon: 0170 0000000');
      await expect(page.getByText('WhatsApp geöffnet')).toBeVisible();
      expect(anfragen).toHaveLength(0);
    });

    test('Serverfehler: Fehlermeldung mit WhatsApp-Alternative, Eingaben bleiben erhalten, kein Erfolg', async ({ page }) => {
      const versuche = [];
      await page.route('**/api/anfrage', async (route) => {
        versuche.push(route.request().postDataJSON());
        await route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ success: false, error: 'Test-Ausfall' }) });
      });
      await bereit(page, seite);
      await zuSchritt3(page);
      await kontaktEintragen(page);
      await absenden(page, seite).click();
      await expect(page.getByText('Fehler beim Absenden:')).toBeVisible();
      await expect(page.getByRole('button', { name: 'WhatsApp senden', exact: true })).toBeVisible();
      await expect(page.locator('#funnel-name')).toHaveValue('Prüf Person');
      await expect(page.getByText('Vielen Dank, Prüf Person!')).toHaveCount(0);
      expect(versuche).toHaveLength(1);
      expect(versuche[0]).toMatchObject({ inquiryType: 'general', contact: { name: 'Prüf Person', phone: '0170 0000000' } });
    });

    test.describe('echte Route (Mock-Modus ohne Resend-Schlüssel)', () => {
      test.use({ echteRoute: true });
      test('Server nimmt Anfrage an und vergibt echte Referenz (kein Bot-/Spam-Ignorieren)', async ({ page }) => {
        await bereit(page, seite);
        await warteBotSchwelle(page);
        await zuSchritt3(page);
        await kontaktEintragen(page, { name: `Prüf ${Date.now() % 100000}`, telefon: `0170 ${String(Date.now()).slice(-7)}` });
        await absenden(page, seite).click();
        const ref = page.getByText(/TEZ-\d{2}-[A-Z0-9]+/).first();
        await expect(ref).toBeVisible();
        const id = ((await ref.textContent()) ?? '').match(/TEZ-\d{2}-[A-Z0-9]+/)?.[0] ?? '';
        expect(istEchteReferenz(id)).toBe(true);
      });
    });
  });
}

test.describe('TezgelAnfrageFunnel (F-03, Gutfall je Ort)', () => {
  for (const ort of ORTE) {
    test(`Gutfall auf ${ort}: POST general mit Standardauswahl, Erfolg mit Referenz`, async ({ page, anfragen }) => {
      await bereit(page, ort);
      await zuSchritt3(page);
      await kontaktEintragen(page);
      await absenden(page, ort).click();
      await expect(page.getByText('Vielen Dank, Prüf Person!')).toBeVisible();
      await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
      expect(anfragen).toHaveLength(1);
      expect(anfragen[0]).toMatchObject({
        inquiryType: 'general',
        projectType: 'bad',
        projectTitle: 'Bad & Wellness',
        area: '15 - 35 m²',
        timing: 'In 1 - 3 Monaten',
        contact: { name: 'Prüf Person', phone: '0170 0000000', location: 'Aßlar / Wetzlar / Hessen' },
      });
      expect(anfragen[0]).not.toHaveProperty('notes');
      expect(anfragen[0].contact).not.toHaveProperty('email');
      expect(typeof anfragen[0]._t).toBe('number');
    });
  }
});
