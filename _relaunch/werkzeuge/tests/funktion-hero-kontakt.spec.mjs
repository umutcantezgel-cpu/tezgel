// MUSTER (Testschreiber): Funktionstest der Kernaufgabe „Direktanfrage aus dem Einstieg der Startseite“.
// Prüft Verhalten (Pflichtfelder, gesendete Nutzlast, Erfolgszustand mit Referenz), nicht Aussehen.
// P3-14a: Die Startseite `/` ist im Kandidaten Kern (HeroKontakt als Client-Insel). Felder und Absende-Knopf sind dort
// wie im Bestand (`#hero-*`, `button[type=submit]` im Formular). Das Vorhaben ist im Kern ein Radio, im Bestand ein Knopf;
// `vorhaben()` nimmt beides. Bedienung erst nach der Hydrierung (bedienbar), sonst liefe ein Absenden als normales Formular.
import { test, expect, warteBotSchwelle, istEchteReferenz, oeffne } from './fixtures.mjs';

const formular = (page) => page.locator('form').filter({ has: page.locator('#hero-name') });
// Vorhaben: Kern-Radio oder Bestands-Knopf mit gleichem Namen.
const vorhaben = (page, titel) => formular(page).getByRole('radio', { name: titel }).or(formular(page).getByRole('button', { name: titel }));

test.describe('HeroContactForm (/)', () => {
  test('ohne Name/Telefon: Fehlermeldung, keine Anfrage', async ({ page, anfragen }) => {
    await oeffne(page, '/', page.locator('#hero-name'));
    const form = page.locator('form').filter({ has: page.locator('#hero-name') });
    await form.locator('button[type="submit"]').click();
    // Native Pflichtfeld-Prüfung (required) oder eigene Fehlermeldung – beides gilt als Verhalten „blockiert“.
    const nameUngueltig = await page.locator('#hero-name').evaluate((el) => !el.checkValidity());
    const meldung = await form.getByText(/Namen und Ihre Telefonnummer/).count();
    expect(nameUngueltig || meldung > 0).toBe(true);
    await page.waitForTimeout(300);
    expect(anfragen).toHaveLength(0);
  });

  test('gültig: sendet Anfrage an /api/anfrage und zeigt Erfolg mit Referenz (Attrappe)', async ({ page, anfragen }) => {
    await oeffne(page, '/', page.locator('#hero-name'));
    await page.locator('#hero-name').fill('Prüf Person');
    await page.locator('#hero-phone').fill('0170 0000000');
    await page.locator('#hero-location').fill('Wetzlar');
    await page.locator('form').filter({ has: page.locator('#hero-name') }).locator('button[type="submit"]').click();
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({ inquiryType: 'general', contact: { name: 'Prüf Person', phone: '0170 0000000', location: 'Wetzlar' } });
    expect(typeof anfragen[0]._t).toBe('number');
  });

  test('Vorhaben „Balkon & Terrasse“ landet als projectType in der Nutzlast (Attrappe)', async ({ page, anfragen }) => {
    await oeffne(page, '/', page.locator('#hero-name'));
    await vorhaben(page, 'Balkon & Terrasse').click();
    await page.locator('#hero-name').fill('Prüf Person');
    await page.locator('#hero-phone').fill('0170 0000000');
    await formular(page).locator('button[type="submit"]').click();
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({ inquiryType: 'general', projectType: 'aussen' });
  });

  test.describe('echte Route (Mock-Modus ohne Resend-Schlüssel)', () => {
    test.use({ echteRoute: true });
    test('Server nimmt an und vergibt echte Referenz (kein Bot-/Spam-Ignorieren)', async ({ page }) => {
      await oeffne(page, '/', page.locator('#hero-name'));
      await warteBotSchwelle(page);
      await page.locator('#hero-name').fill(`Prüf ${Date.now() % 100000}`);
      await page.locator('#hero-phone').fill(`0170 ${String(Date.now()).slice(-7)}`);
      await page.locator('form').filter({ has: page.locator('#hero-name') }).locator('button[type="submit"]').click();
      const ref = page.getByText(/TEZ-\d{2}-[A-Z0-9]+/).first();
      await expect(ref).toBeVisible();
      expect(istEchteReferenz((await ref.textContent()).trim())).toBe(true);
    });
  });
});
