// FUNKTIONSTEST F-09 · LeadQuickForm (Schnellanfrage, Honeypot `websiteUrl`) auf /standorte/wetzlar und /leistungen/bad/wetzlar.
// Kernaufgabe: Pflichtfelder und Einwilligung blockieren den Versand; gültige Angaben senden POST /api/anfrage
// mit inquiryType „general“ und der Quelle der Seite und zeigen Erfolg mit Referenz; gefülltes Honeypot-Feld → kein Versand im Client.
// Geprüft wird Verhalten (Nutzlast, Zustand), nicht Aussehen. Altverhalten = Ausgangsstand 5a7a7b0.
import { test, expect, warteBotSchwelle, istEchteReferenz, bedienbar } from './fixtures.mjs';

const ORTE = [
  { seite: '/standorte/wetzlar', quelle: 'standort-wetzlar' },
  { seite: '/leistungen/bad/wetzlar', quelle: 'leistung-bad-wetzlar' },
];

// Formular über sein (unsichtbares) Honeypot-Feld finden; Bedienelemente über Typ, Pflichtangabe und Rolle.
// Die Labels des Formulars sind nicht mit den Feldern verknüpft, daher keine getByLabel-Suche.
const formular = (page) => page.locator('form').filter({ has: page.locator('input[id^="websiteUrl-"]') });
const honeypot = (page) => formular(page).locator('input[id^="websiteUrl-"]');
const name = (page) => formular(page).locator('input[type="text"][required]');
const telefon = (page) => formular(page).locator('input[type="tel"]');
const email = (page) => formular(page).locator('input[type="email"]');
const plzOrt = (page) => formular(page).locator('input[type="text"]:not([required]):not([id^="websiteUrl-"])');
const notizen = (page) => formular(page).locator('textarea');
const einwilligung = (page) => formular(page).getByRole('checkbox');
const absenden = (page) => formular(page).locator('button[type="submit"]');
const erfolg = (page) => page.getByText('Anfrage erfolgreich übermittelt');

// Blockiert = Pflichtfeld ungültig (native Prüfung) oder eigene Validierungsmeldung da; beides gilt als „blockiert“.
async function warteAufBlockade(page, feld) {
  await expect
    .poll(async () => {
      const ungueltig = await feld.evaluate((el) => !el.checkValidity());
      const meldung = await formular(page).getByText(/Bitte füllen Sie Name und Telefonnummer aus/).count();
      return ungueltig || meldung > 0;
    })
    .toBe(true);
}

for (const { seite, quelle } of ORTE) {
  test.describe(`LeadQuickForm (${seite})`, () => {
    test('Name und Telefon leer: Versand blockiert, keine Anfrage', async ({ page, anfragen }) => {
      await page.goto(seite);
      await einwilligung(page).check();
      await absenden(page).click();
      await warteAufBlockade(page, name(page));
      expect(anfragen).toHaveLength(0);
    });

    test('Einwilligung fehlt: Versand blockiert, keine Anfrage', async ({ page, anfragen }) => {
      await page.goto(seite);
      await name(page).fill('Prüf Person');
      await telefon(page).fill('0170 0000000');
      await absenden(page).click();
      await warteAufBlockade(page, einwilligung(page));
      expect(anfragen).toHaveLength(0);
    });

    test('Name nur aus Leerzeichen: eigene Meldung, keine Anfrage', async ({ page, anfragen }) => {
      await page.goto(seite);
      await name(page).fill('   ');
      await telefon(page).fill('0170 0000000');
      await einwilligung(page).check();
      await absenden(page).click();
      await expect(formular(page).getByText(/Bitte füllen Sie Name und Telefonnummer aus/)).toBeVisible();
      expect(anfragen).toHaveLength(0);
    });

    test('vollständig: sendet Nutzlast an /api/anfrage und zeigt Erfolg mit Referenz (Attrappe)', async ({ page, anfragen }) => {
      await page.goto(seite);
      await name(page).fill('Prüf Person');
      await telefon(page).fill('0170 0000000');
      await email(page).fill('pruef@example.de');
      await plzOrt(page).fill('35578 Wetzlar');
      await notizen(page).fill('Badsanierung ca. 8 m²');
      await einwilligung(page).check();
      await absenden(page).click();
      await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
      expect(anfragen).toHaveLength(1);
      expect(anfragen[0]).toMatchObject({
        inquiryType: 'general',
        projectType: 'general',
        projectTitle: `Schnellanfrage: ${quelle}`,
        contact: { name: 'Prüf Person', phone: '0170 0000000', email: 'pruef@example.de', zipCity: '35578 Wetzlar' },
        notes: 'Badsanierung ca. 8 m²',
        privacyConsent: true,
        honeypot: '',
        source: quelle,
      });
      expect(typeof anfragen[0]._t).toBe('number');
    });

    test('Honeypot gefüllt: Erfolg wird vorgetäuscht, aber keine Anfrage geht raus', async ({ page, anfragen }) => {
      await page.goto(seite);
      // Ein Bot füllt verborgene Felder über das DOM aus (kein Fokus nötig); React erhält das Input-Ereignis.
      await bedienbar(honeypot(page));
      await honeypot(page).evaluate((el) => {
        const setze = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        setze.call(el, 'https://spam.example');
        el.dispatchEvent(new Event('input', { bubbles: true }));
      });
      await name(page).fill('Bot Person');
      await telefon(page).fill('0170 0000000');
      await einwilligung(page).check();
      await absenden(page).click();
      await expect(erfolg(page)).toBeVisible();
      expect(anfragen).toHaveLength(0);
    });
  });
}

test.describe('LeadQuickForm (/standorte/wetzlar) · Sonderfälle', () => {
  test('nur Pflichtfelder: optionale Angaben fehlen in der Nutzlast, Erfolg mit Referenz', async ({ page, anfragen }) => {
    await page.goto('/standorte/wetzlar');
    await name(page).fill('Prüf Person');
    await telefon(page).fill('0170 0000000');
    await einwilligung(page).check();
    await absenden(page).click();
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({
      inquiryType: 'general',
      source: 'standort-wetzlar',
      contact: { name: 'Prüf Person', phone: '0170 0000000' },
    });
    expect(anfragen[0].contact).not.toHaveProperty('email');
    expect(anfragen[0].contact).not.toHaveProperty('zipCity');
    expect(anfragen[0]).not.toHaveProperty('notes');
  });

  test.describe('echte Route (Mock-Modus ohne Resend-Schlüssel)', () => {
    test.use({ echteRoute: true });
    test('Server nimmt an und vergibt echte Referenz (kein Bot-/Spam-Ignorieren)', async ({ page, anfragen }) => {
      await page.goto('/standorte/wetzlar');
      await warteBotSchwelle(page);
      await name(page).fill(`Prüf ${Date.now() % 100000}`);
      await telefon(page).fill(`0170 ${String(Date.now()).slice(-7)}`);
      await einwilligung(page).check();
      await absenden(page).click();
      const vorgang = page.getByText(/Vorgangsnummer:/);
      await expect(vorgang).toBeVisible();
      const id = ((await vorgang.textContent()) || '').replace(/^.*Vorgangsnummer:\s*/, '').trim();
      expect(istEchteReferenz(id)).toBe(true);
      expect(anfragen).toHaveLength(1);
    });
  });
});
