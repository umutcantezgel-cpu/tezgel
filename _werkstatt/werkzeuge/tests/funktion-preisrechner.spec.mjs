// Funktionstest F-02 PricingCalculator (ohne Preise), Orte: /preise (Hauptort) und /faq (Gutfall).
// Kernaufgabe: Auswahl (Gewerk, Fläche, Vorarbeiten, Zeitraum, Freitext) → POST /api/anfrage
// mit inquiryType bad/general und Projektdetails in notes → Erfolg mit Referenz.
// Prüft Verhalten (Blockierung, gesendete Nutzlast, Erfolgszustand), nicht Aussehen.
// Die Einwilligungs-Checkbox wird in den Sendetests ausdrücklich gesetzt, nicht auf ihren Vorab-Haken vertraut.
import { test, expect, warteBotSchwelle, istEchteReferenz } from './fixtures.mjs';

// Rechner-Bereich: nächster Vorfahr des Namensfelds, der auch die Fläche (linke Spalte) enthält.
const rechnerVon = (page) =>
  page.locator('#calc-name').locator('xpath=ancestor::div[.//*[@id="calc-custom-area"]][1]');
const formularVon = (page) => page.locator('form').filter({ has: page.locator('#calc-name') });
const absendenKnopf = (page) => formularVon(page).locator('button[type="submit"]');

// Vor jedem Klick in die Bildmitte scrollen: der fixierte Kopfbereich würde den Knopf sonst überdecken.
async function klicken(loc) {
  await loc.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await loc.click();
}
async function haken(loc) {
  await loc.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await loc.check();
}
async function abhaken(loc) {
  await loc.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await loc.uncheck();
}

// Der Browser meldet „invalid“ für jedes Pflichtfeld, das ein Absenden blockiert. Das ist das Signal, auf das gewartet wird.
async function ungueltigeFelderMerken(page) {
  await page.addInitScript(() => {
    window.__ungueltig = [];
    document.addEventListener('invalid', (e) => window.__ungueltig.push(e.target.id), true);
  });
}

async function kontaktAusfuellen(page, { name = 'Prüf Person', telefon = '0170 0000000' } = {}) {
  await page.locator('#calc-name').fill(name);
  await page.locator('#calc-phone').fill(telefon);
}

test.describe('PricingCalculator (/preise)', () => {
  test('ohne Name: Pflichtfeld blockiert, keine Anfrage', async ({ page, anfragen }) => {
    await ungueltigeFelderMerken(page);
    await page.goto('/preise');
    await page.locator('#calc-phone').fill('0170 0000000');
    await klicken(absendenKnopf(page));
    await expect.poll(() => page.evaluate(() => window.__ungueltig)).toContain('calc-name');
    expect(await page.locator('#calc-name').evaluate((el) => el.validity.valueMissing)).toBe(true);
    expect(anfragen).toHaveLength(0);
  });

  test('ohne Telefonnummer: Pflichtfeld blockiert, keine Anfrage', async ({ page, anfragen }) => {
    await ungueltigeFelderMerken(page);
    await page.goto('/preise');
    await page.locator('#calc-name').fill('Prüf Person');
    await klicken(absendenKnopf(page));
    await expect.poll(() => page.evaluate(() => window.__ungueltig)).toContain('calc-phone');
    expect(await page.locator('#calc-phone').evaluate((el) => el.validity.valueMissing)).toBe(true);
    expect(anfragen).toHaveLength(0);
  });

  test('Name nur aus Leerzeichen: eigene Fehlermeldung, keine Anfrage', async ({ page, anfragen }) => {
    await page.goto('/preise');
    await kontaktAusfuellen(page, { name: '   ' });
    await haken(page.locator('#calc-privacy'));
    await klicken(absendenKnopf(page));
    await expect(formularVon(page).getByText(/Namen an\./)).toBeVisible();
    expect(anfragen).toHaveLength(0);
  });

  // Kennung E-014 aus _relaunch/ENTSCHEIDUNGEN.md (übernommen mit dem Merge von main).
  test('Einwilligung startet leer (E-014): ohne eigenen Haken Fehlermeldung, keine Anfrage', async ({ page, anfragen }) => {
    await page.goto('/preise');
    await expect(page.locator('#calc-privacy')).not.toBeChecked();
    await kontaktAusfuellen(page);
    await klicken(absendenKnopf(page));
    await expect(formularVon(page).getByText(/willigen Sie in die Datenverarbeitung/)).toBeVisible();
    expect(anfragen).toHaveLength(0);
  });

  test('ohne Einwilligung abgewählt: Fehlermeldung, keine Anfrage', async ({ page, anfragen }) => {
    await page.goto('/preise');
    await kontaktAusfuellen(page);
    await abhaken(page.locator('#calc-privacy'));
    await klicken(absendenKnopf(page));
    await expect(formularVon(page).getByText(/willigen Sie in die Datenverarbeitung/)).toBeVisible();
    expect(anfragen).toHaveLength(0);
  });

  test('Vorauswahl Bad: sendet inquiryType "bad" mit Projektdetails in notes, Erfolg mit Referenz (Attrappe)', async ({ page, anfragen }) => {
    await page.goto('/preise');
    await kontaktAusfuellen(page);
    await haken(page.locator('#calc-privacy'));
    await klicken(absendenKnopf(page));
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({
      inquiryType: 'bad',
      projectType: 'bad',
      projectTitle: 'Badsanierung & Walk-In Dusche (Standard-Raum / Bad)',
      area: 'ca. 10 - 25 m²',
      timing: 'In den nächsten 1 - 3 Monaten',
      contact: { name: 'Prüf Person', phone: '0170 0000000', location: 'Aßlar / Wetzlar / Hessen' },
    });
    expect(anfragen[0].contact.email).toBeUndefined();
    expect(anfragen[0].notes).toContain('Gewerk: Badsanierung & Walk-In Dusche');
    expect(anfragen[0].notes).toContain('Fläche / Umfang: ca. 10 - 25 m²');
    expect(anfragen[0].notes).toContain('Zeitrahmen: In den nächsten 1 - 3 Monaten');
    expect(anfragen[0].notes).toContain('- Untergrundausgleich / Estrich nötig');
    expect(typeof anfragen[0]._t).toBe('number');
  });

  test('anderes Gewerk mit Fläche, Zeitraum, Vorarbeiten und Freitext: inquiryType "general", Details in notes, Erfolg', async ({ page, anfragen }) => {
    await page.goto('/preise');
    const rechner = rechnerVon(page);
    await klicken(rechner.getByRole('button', { name: 'Balkon, Terrasse & Außen' }));
    await klicken(rechner.getByRole('button', { name: 'Großraum / Wohnbereich' }));
    await klicken(rechner.getByRole('button', { name: 'Staubschutz im bewohnten Wohnbereich' }));
    await klicken(rechner.getByRole('button', { name: 'Altfliesen entfernen & entsorgen' }));
    await rechner.locator('#situation-notes').fill('Alte Terrassenplatten, Gefälle unklar');
    await page.locator('#calc-timing').selectOption('Schnellstmöglich');
    await kontaktAusfuellen(page);
    await haken(page.locator('#calc-privacy'));
    await klicken(absendenKnopf(page));
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({
      inquiryType: 'general',
      projectType: 'balkon',
      projectTitle: 'Balkon, Terrasse & Außen (Großraum / Wohnbereich)',
      area: 'ca. 25 - 50 m²',
      timing: 'Schnellstmöglich',
    });
    const notes = anfragen[0].notes;
    expect(notes).toContain('Alte Terrassenplatten, Gefälle unklar');
    expect(notes).toContain('Gewerk: Balkon, Terrasse & Außen');
    expect(notes).toContain('Zeitrahmen: Schnellstmöglich');
    expect(notes).toContain('- Altfliesen entfernen & entsorgen');
    expect(notes).not.toContain('Staubschutz im bewohnten Wohnbereich');
  });

  test.describe('echte Route (Mock-Modus ohne Resend-Schlüssel)', () => {
    test.use({ echteRoute: true });
    test('Server nimmt an und vergibt echte Referenz (kein Bot-/Spam-Ignorieren)', async ({ page, anfragen }) => {
      await page.goto('/preise');
      await warteBotSchwelle(page, page.locator('#calc-name'));
      await kontaktAusfuellen(page, {
        name: `Prüf ${Date.now() % 100000}`,
        telefon: `0170 ${String(Date.now()).slice(-7)}`,
      });
      await haken(page.locator('#calc-privacy'));
      await klicken(absendenKnopf(page));
      const ref = page.getByText(/Referenz:\s*TEZ-\d{2}-[A-Z0-9]+/).first();
      await expect(ref).toBeVisible();
      expect(anfragen).toHaveLength(1);
      // Die Referenz steht im Text zusammen mit dem Präfix „Referenz:“; nur die Kennung prüfen.
      const id = ((await ref.textContent()) || '').match(/TEZ-\d{2}-[A-Z0-9]+/)?.[0] ?? '';
      expect(istEchteReferenz(id)).toBe(true);
    });
  });
});

test.describe('PricingCalculator (/faq)', () => {
  test('Gutfall: Anfrage wird gesendet und mit Referenz bestätigt (Attrappe)', async ({ page, anfragen }) => {
    await page.goto('/faq');
    await kontaktAusfuellen(page);
    await haken(page.locator('#calc-privacy'));
    await klicken(absendenKnopf(page));
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({
      inquiryType: 'bad',
      contact: { name: 'Prüf Person', phone: '0170 0000000' },
    });
    expect(anfragen[0].notes).toContain('Gewerk: Badsanierung & Walk-In Dusche');
  });
});
