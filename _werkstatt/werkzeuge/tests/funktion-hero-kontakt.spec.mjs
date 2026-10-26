// Funktionstest F-01 HeroContactForm auf der Startseite: Abschnitt „Termin vor Ort anfragen“ (H2 #termin, unten auf /).
// Prüft Verhalten (Pflichtfelder, gesendete Nutzlast, Erfolgszustand mit Referenz), nicht Aussehen.
import { test, expect, bedienbar, warteBotSchwelle, istEchteReferenz } from './fixtures.mjs';

test.describe('HeroContactForm (/)', () => {
  test('Anker #termin: der Abschnitt „Termin vor Ort anfragen“ steht im Bild und enthält das Formular', async ({ page }) => {
    await page.goto('/#termin');
    await expect(page.locator('#termin')).toHaveText(/Termin vor Ort anfragen/);
    await expect(page.locator('#termin')).toBeInViewport();
    const imAbschnitt = await page.evaluate(() => {
      const abschnitt = document.getElementById('termin')?.closest('section');
      return Boolean(abschnitt && abschnitt.querySelector('#hero-name') && abschnitt.querySelector('#hero-phone'));
    });
    expect(imAbschnitt).toBe(true);
    await expect(page.locator('#hero-name')).toBeVisible();
  });

  test('ohne Name/Telefon: Fehlermeldung, keine Anfrage', async ({ page, anfragen }) => {
    await page.goto('/#termin');
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
    await page.goto('/#termin');
    await page.locator('#hero-name').fill('Prüf Person');
    await page.locator('#hero-phone').fill('0170 0000000');
    await page.locator('#hero-location').fill('Wetzlar');
    await page.locator('form').filter({ has: page.locator('#hero-name') }).locator('button[type="submit"]').click();
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({ inquiryType: 'general', contact: { name: 'Prüf Person', phone: '0170 0000000', location: 'Wetzlar' } });
    // ohne Wahl kein Vorhaben, keine Fläche, kein Zeitraum (Abnahme E4-W1, F4); der Erfolg nennt kein Vorhaben
    for (const feld of ['projectType', 'projectTitle', 'area', 'timing']) expect(anfragen[0]).not.toHaveProperty(feld);
    await expect(page.getByText('Ihre Anfrage ist direkt bei Herrn Deniz Tezgel eingegangen.')).toBeVisible();
    expect(typeof anfragen[0]._t).toBe('number');
  });

  test.describe('echte Route (Mock-Modus ohne Resend-Schlüssel)', () => {
    test.use({ echteRoute: true });
    test('Server nimmt an und vergibt echte Referenz (kein Bot-/Spam-Ignorieren)', async ({ page }) => {
      await page.goto('/#termin');
      // Die Bot-Schwelle zählt ab dem Einhängen des Formulars (useState in HeroContactForm): erst bedienbar warten, dann 1,5 s.
      await bedienbar(page.locator('#hero-name'));
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
