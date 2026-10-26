// FUNKTIONSTEST F-03 · TezgelAnfrageFunnel (3 Schritte). Hauptort /kontakt; Gutfall zusätzlich an /leistungen, /foerderung und /leistungen/bad (F-03 ohne /, LAGEBILD; /leistungen/bad
// ersetzt den entfallenen Ort /, E-028).
// Kernaufgabe: Schritte vor/zurück (Auswahl bleibt erhalten), Validierung im Kontaktschritt, Versand POST /api/anfrage
// mit inquiryType „general“ und Projektdaten, Erfolg mit Referenz; WhatsApp-Alternative (Ziel-Link mit vorbelegtem Text).
// Geprüft wird Verhalten (Nutzlast, Zustand, Ziel), nicht Aussehen. Bedienelemente über Rollen, Namen und IDs.
import { test, expect, warteBotSchwelle, istEchteReferenz } from './fixtures.mjs';

const SEITE = '/kontakt';
const ORTE = ['/kontakt', '/leistungen', '/foerderung', '/leistungen/bad'];

// Bedienelemente (Rollen, sichtbare Texte, IDs der Felder).
// Schritttitel in Alltagssprache (E3-WERKZEUG-TEXTE, „und“ statt „&“); weiter exakt geprüft
const SCHRITT_TITEL = { 1: 'Welches Projekt planen Sie?', 2: 'Fläche, Zeitraum und Ort', 3: 'Ihre Kontaktdaten' };
const schrittAnzeige = (page, n) => page.getByText(`Schritt ${n}: ${SCHRITT_TITEL[n]}`, { exact: true });
const weiterZu = (page, n) => page.getByRole('button', { name: new RegExp(`^Weiter zu Schritt ${n}:`) });
const projekt = (page, titel) => page.getByRole('button', { name: new RegExp(titel) });
const flaeche = (page, text) => page.getByRole('group', { name: 'Ungefähre Fläche in Quadratmetern' }).getByRole('button', { name: text, exact: true });
const zeitraum = (page, text) => page.getByRole('group', { name: 'Gewünschter Ausführungszeitraum' }).getByRole('button', { name: text, exact: true });
// „verbindlich“ entfällt: die Anfrage ist kostenlos und unverbindlich (Abnahme E4-W1, F4)
const absenden = (page) => page.getByRole('button', { name: 'Anfrage absenden', exact: true });
const whatsappDirekt = (page) => page.getByRole('button', { name: 'Direkt per WhatsApp', exact: true });

async function zuSchritt3(page) {
  await weiterZu(page, 2).click();
  await weiterZu(page, 3).click();
}

async function kontaktEintragen(page, { name = 'Prüf Person', telefon = '0170 0000000' } = {}) {
  await page.locator('#funnel-name').fill(name);
  await page.locator('#funnel-phone').fill(telefon);
}

test.describe('TezgelAnfrageFunnel (F-03, /kontakt)', () => {
  test('Schritte vor und zurück: Auswahl bleibt erhalten, „Ändern“ führt zu Schritt 2', async ({ page }) => {
    await page.goto(SEITE);
    await expect(schrittAnzeige(page, 1)).toBeVisible();
    await projekt(page, 'Balkon & Terrasse').click();
    await weiterZu(page, 2).click();
    await expect(schrittAnzeige(page, 2)).toBeVisible();
    await expect(page.locator('[aria-label="Fortschritt"] [aria-current="step"]')).toHaveText('2');
    // angezeigt wird die Spanne mit „bis“ (anzeige.ts, E-057); gesendet wird weiter „35 - 75 m²“
    await flaeche(page, '35 bis 75 m²').click();
    await weiterZu(page, 3).click();
    await expect(schrittAnzeige(page, 3)).toBeVisible();
    await expect(page.getByText(/Projekt: Balkon & Terrasse/)).toBeVisible();
    await expect(page.getByText(/Umfang: 35 bis 75 m²/)).toBeVisible();

    await page.getByRole('button', { name: 'Zurück zu Schritt 2', exact: true }).click();
    await expect(schrittAnzeige(page, 2)).toBeVisible();
    await page.getByRole('button', { name: 'Zurück', exact: true }).click();
    await expect(schrittAnzeige(page, 1)).toBeVisible();
    await expect(projekt(page, 'Balkon & Terrasse')).toHaveAttribute('aria-pressed', 'true');

    await weiterZu(page, 2).click();
    await weiterZu(page, 3).click();
    await expect(page.getByText(/Umfang: 35 bis 75 m²/)).toBeVisible();
    await page.getByRole('button', { name: 'Ändern', exact: true }).click();
    await expect(schrittAnzeige(page, 2)).toBeVisible();
  });

  test('Kontaktschritt ohne Name und Telefon: Pflichtfelder blockieren, keine Anfrage', async ({ page, anfragen }) => {
    await page.goto(SEITE);
    await zuSchritt3(page);
    await absenden(page).click();
    const nameUngueltig = await page.locator('#funnel-name').evaluate((el) => !el.checkValidity());
    const telefonUngueltig = await page.locator('#funnel-phone').evaluate((el) => !el.checkValidity());
    expect(nameUngueltig && telefonUngueltig).toBe(true);
    await expect(schrittAnzeige(page, 3)).toBeVisible();
    await expect(absenden(page)).toBeVisible();
    expect(anfragen).toHaveLength(0);
  });

  test('Telefonnummer unter 6 Zeichen: Versand blockiert, keine Anfrage', async ({ page, anfragen }) => {
    await page.goto(SEITE);
    await zuSchritt3(page);
    await kontaktEintragen(page, { telefon: '0170' });
    await absenden(page).click();
    const zuKurz = await page.locator('#funnel-phone').evaluate((el) => el.validity.tooShort);
    expect(zuKurz).toBe(true);
    await expect(schrittAnzeige(page, 3)).toBeVisible();
    expect(anfragen).toHaveLength(0);
  });

  test('ungültige E-Mail-Adresse: Versand blockiert, keine Anfrage', async ({ page, anfragen }) => {
    await page.goto(SEITE);
    await zuSchritt3(page);
    await kontaktEintragen(page);
    await page.locator('#funnel-email').fill('keine-adresse');
    await absenden(page).click();
    const ungueltig = await page.locator('#funnel-email').evaluate((el) => el.validity.typeMismatch);
    expect(ungueltig).toBe(true);
    await expect(absenden(page)).toBeVisible();
    expect(anfragen).toHaveLength(0);
  });

  test('WhatsApp ohne Name und Telefon: Hinweis statt Öffnen, kein WhatsApp-Aufruf', async ({ page, anfragen }) => {
    await page.goto(SEITE);
    await zuSchritt3(page);
    await whatsappDirekt(page).click();
    await expect(page.getByText('Bitte tragen Sie zumindest Ihren Namen und eine Telefonnummer ein.')).toBeVisible();
    await expect(page.getByText('WhatsApp geöffnet')).toHaveCount(0);
    const geoeffnet = await page.evaluate(() => window.__relaunchOpened);
    expect(geoeffnet).toEqual([]);
    expect(anfragen).toHaveLength(0);
  });

  for (const ort of ORTE) {
    test(`Gutfall auf ${ort} ohne Wahl: POST general nur mit Kontakt, Erfolg mit Referenz`, async ({ page, anfragen }) => {
      await page.goto(ort);
      await zuSchritt3(page);
      await kontaktEintragen(page);
      await absenden(page).click();
      await expect(page.getByText('Vielen Dank, Prüf Person!')).toBeVisible();
      await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
      expect(anfragen).toHaveLength(1);
      // E4-W1 (F4): keine Vorauswahl mehr. Ungewählte Angaben fehlen in der Nutzlast, Kontakt bleibt.
      expect(anfragen[0]).toMatchObject({
        inquiryType: 'general',
        contact: { name: 'Prüf Person', phone: '0170 0000000' },
      });
      for (const feld of ['projectType', 'projectTitle', 'area', 'timing', 'notes']) expect(anfragen[0]).not.toHaveProperty(feld);
      expect(anfragen[0].contact).not.toHaveProperty('location');
      expect(anfragen[0].contact).not.toHaveProperty('email');
      expect(typeof anfragen[0]._t).toBe('number');
    });
  }

  test('keine Vorauswahl beim Laden: nichts ist gewählt, die Zusammenfassung nennt „keine Angabe“', async ({ page }) => {
    await page.goto(SEITE);
    for (const titel of ['Bad & Wellness', 'Wohnbereich & Neubau', 'Balkon & Terrasse', 'Treppen & Naturstein', 'Untergrund & Abdichtung']) {
      await expect(projekt(page, titel)).toHaveAttribute('aria-pressed', 'false');
    }
    await weiterZu(page, 2).click();
    for (const text of ['Bis 15 m²', '15 bis 35 m²', '35 bis 75 m²', 'Über 75 m²']) {
      await expect(flaeche(page, text)).toHaveAttribute('aria-pressed', 'false');
    }
    for (const text of ['Schnellstmöglich', 'In 1 bis 3 Monaten', 'In mehr als 3 Monaten oder noch offen']) {
      await expect(zeitraum(page, text)).toHaveAttribute('aria-pressed', 'false');
    }
    await expect(page.locator('#funnel-location')).toHaveValue('');
    await weiterZu(page, 3).click();
    await expect(page.getByText('Projekt: keine Angabe')).toBeVisible();
    await expect(page.getByText('Umfang: keine Angabe')).toBeVisible();
    await expect(page.getByText('Ort: keine Angabe')).toBeVisible();
  });

  test('WhatsApp ohne Wahl: die Nachricht nennt die offenen Angaben als „keine Angabe“, kein Versand', async ({ page, anfragen }) => {
    await page.goto(SEITE);
    await zuSchritt3(page);
    await kontaktEintragen(page);
    const waAnfrage = page.waitForRequest((r) => r.url().startsWith('https://api.whatsapp.com/send'), { timeout: 10_000 });
    await whatsappDirekt(page).click();
    const text = new URL((await waAnfrage).url()).searchParams.get('text') ?? '';
    expect(text).toContain('Projekt: keine Angabe');
    expect(text).toContain('Fläche: keine Angabe');
    expect(text).toContain('Ort: keine Angabe');
    expect(text).toContain('Gewünschter Zeitraum: keine Angabe');
    expect(text).toContain('Name: Prüf Person');
    expect(anfragen).toHaveLength(0);
  });

  test('Gutfall mit allen Angaben: Projekt, Fläche, Zeitraum, Ort, Kontakt und Notiz landen in der Nutzlast', async ({ page, anfragen }) => {
    await page.goto(SEITE);
    await projekt(page, 'Balkon & Terrasse').click();
    await weiterZu(page, 2).click();
    await page.locator('#funnel-custom-area').fill('24');
    await zeitraum(page, 'Schnellstmöglich').click();
    await page.locator('#funnel-location').fill('35614 Aßlar');
    await weiterZu(page, 3).click();
    await kontaktEintragen(page);
    await page.locator('#funnel-email').fill('pruef@example.de');
    await page.locator('#funnel-notes').fill('Altbelag vorhanden');
    await absenden(page).click();
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
    await page.goto(SEITE);
    await projekt(page, 'Balkon & Terrasse').click();
    await weiterZu(page, 2).click();
    await page.locator('#funnel-custom-area').fill('24');
    await zeitraum(page, 'Schnellstmöglich').click();
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
    await page.goto(SEITE);
    await zuSchritt3(page);
    await kontaktEintragen(page);
    await absenden(page).click();
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
      await page.goto(SEITE);
      await warteBotSchwelle(page, weiterZu(page, 2));
      await zuSchritt3(page);
      await kontaktEintragen(page, { name: `Prüf ${Date.now() % 100000}`, telefon: `0170 ${String(Date.now()).slice(-7)}` });
      await absenden(page).click();
      const ref = page.getByText(/TEZ-\d{2}-[A-Z0-9]+/).first();
      await expect(ref).toBeVisible();
      const id = ((await ref.textContent()) ?? '').match(/TEZ-\d{2}-[A-Z0-9]+/)?.[0] ?? '';
      expect(istEchteReferenz(id)).toBe(true);
    });
  });
});
