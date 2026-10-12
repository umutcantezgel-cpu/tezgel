// Funktionstests F-07 (BookingCalendar auf /termin und /kontakt#termin-buchen) und F-08 (Termin-Formular auf /termin).
// Prüft Verhalten: Blockieren bei fehlenden Pflichtangaben, gesendete Nutzlast (Fixture `anfragen`), Erfolgszustand mit Referenz.
// Der Kalender zeigt Tage ab morgen (relativ zu heute): Datum und Slot werden aus der Auswahl gelesen, nicht fest vorgegeben.
// Bekannter Ausgangsfehler (Datum/Uhrzeit des Kalenders erreichen die Mail nicht): hier nicht als Soll festgeschrieben,
// geprüft wird nur, was der Client sendet, und welcher Zustand folgt.
import { test, expect, warteBotSchwelle, istEchteReferenz, bedienbar } from './fixtures.mjs';

const ORTE_KALENDER = [
  { ort: '/termin', url: '/termin', serviceType: 'Kostenfreies Vor-Ort-Aufmaß & Beratung' },
  { ort: '/kontakt#termin-buchen', url: '/kontakt#termin-buchen', serviceType: 'Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse' },
];

// Heutiges Datum in Europe/Berlin als YYYY-MM-DD (Kalender rechnet in derselben Zeitzone).
const heute = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(new Date());
const isoInTagen = (n) => {
  const [y, m, d] = heute().split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
};
const alsAnzeige = (iso) => iso.split('-').reverse().join('.');
const ungueltig = (locator) => locator.evaluate((el) => !el.checkValidity());

// Zählt Submit-Ereignisse des Formulars: Blockiert der Browser, feuert kein Submit (ohne Wartezeit prüfbar).
async function sammleSubmits(formular) {
  await formular.evaluate((f) => {
    window.__terminSubmits = 0;
    f.addEventListener('submit', () => { window.__terminSubmits += 1; });
  });
}
const submitsGezaehlt = (page) => page.evaluate(() => window.__terminSubmits ?? 0);

// ---------- F-07 BookingCalendar ----------
const kalenderFormular = (page) => page.locator('form').filter({ has: page.locator('#booking-consent') });

// Wählt Slot (zweiter Tag, damit das Datum nicht zufällig der erste Tag ist) und liefert Datum/Slot aus der Schritt-2-Überschrift.
async function kalenderZuKontaktdaten(page, uhrzeit = '15:00', tagIndex = 1) {
  await (await bedienbar(page.getByRole('button', { name: `${uhrzeit} Uhr`, exact: true }).nth(tagIndex))).click();
  const kopf = page.getByText(/Schritt 2: Kontaktdaten für \d{2}\.\d{2}\.\d{4} um \d{2}:\d{2} Uhr/);
  await expect(kopf).toBeVisible();
  const m = (await kopf.textContent()).match(/(\d{2})\.(\d{2})\.(\d{4}) um (\d{2}:\d{2}) Uhr/);
  return { iso: `${m[3]}-${m[2]}-${m[1]}`, anzeige: `${m[1]}.${m[2]}.${m[3]}`, zeit: m[4] };
}

for (const { ort, url, serviceType } of ORTE_KALENDER) {
  test.describe(`BookingCalendar (F-07) auf ${ort}`, () => {
    test('ohne Name, Telefon und Einwilligung: Pflichtfelder blockieren, keine Anfrage', async ({ page, anfragen }) => {
      await page.goto(url);
      await kalenderZuKontaktdaten(page);
      const formular = kalenderFormular(page);
      await sammleSubmits(formular);
      await formular.getByRole('button', { name: /Vor-Ort-Termin anfragen/ }).click();
      expect(await ungueltig(page.getByPlaceholder('Vor- und Nachname'))).toBe(true);
      expect(await submitsGezaehlt(page)).toBe(0);
      expect(anfragen).toHaveLength(0);
      await expect(page.getByText(/Schritt 2: Kontaktdaten für/)).toBeVisible();
    });

    test('nur Leerzeichen als Name: Fehlermeldung, keine Anfrage', async ({ page, anfragen }) => {
      await page.goto(url);
      await kalenderZuKontaktdaten(page);
      await page.getByPlaceholder('Vor- und Nachname').fill('   ');
      await page.getByPlaceholder('0172 / 1234567').fill('0170 0000000');
      await page.locator('#booking-consent').check();
      await kalenderFormular(page).getByRole('button', { name: /Vor-Ort-Termin anfragen/ }).click();
      await expect(page.getByText('Bitte füllen Sie Name und Telefonnummer aus')).toBeVisible();
      expect(anfragen).toHaveLength(0);
    });

    test('ohne Einwilligung: Anfrage wird blockiert, keine Anfrage', async ({ page, anfragen }) => {
      await page.goto(url);
      await kalenderZuKontaktdaten(page);
      await page.getByPlaceholder('Vor- und Nachname').fill('Prüf Person');
      await page.getByPlaceholder('0172 / 1234567').fill('0170 0000000');
      const formular = kalenderFormular(page);
      await sammleSubmits(formular);
      await formular.getByRole('button', { name: /Vor-Ort-Termin anfragen/ }).click();
      expect(await ungueltig(page.locator('#booking-consent'))).toBe(true);
      expect(await submitsGezaehlt(page)).toBe(0);
      expect(anfragen).toHaveLength(0);
    });

    test('gültig: gewählter Tag und Slot gehen als termin-Anfrage raus, Erfolg mit Referenz', async ({ page, anfragen }) => {
      await page.goto(url);
      const { iso, anzeige, zeit } = await kalenderZuKontaktdaten(page);
      await page.getByPlaceholder('Vor- und Nachname').fill('Prüf Person');
      await page.getByPlaceholder('0172 / 1234567').fill('0170 0000000');
      await page.locator('#booking-consent').check();
      await kalenderFormular(page).getByRole('button', { name: /Vor-Ort-Termin anfragen/ }).click();
      await expect(page.getByText('Terminanfrage bestätigt!')).toBeVisible();
      await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
      expect(anfragen).toHaveLength(1);
      expect(anfragen[0]).toMatchObject({
        inquiryType: 'termin',
        projectType: 'termin',
        terminDetails: { preferredDate: iso, timeSlot: zeit, serviceType },
        contact: { name: 'Prüf Person', phone: '0170 0000000' },
        privacyConsent: true,
        honeypot: '',
      });
      expect(typeof anfragen[0]._t).toBe('number');
      // Gewählter Tag ist ein Werktag (kein Sonntag) ab morgen.
      expect(new Date(`${iso}T12:00:00Z`).getUTCDay()).not.toBe(0);
      expect(iso > heute()).toBe(true);
      // Bestätigung nennt denselben Tag und Slot wie die Auswahl.
      await expect(page.getByText(`${anzeige} um ${zeit} Uhr`)).toBeVisible();
    });
  });
}

// ---------- F-08 Termin-Formular ----------
const termin = (page) => page.locator('form').filter({ has: page.locator('#termin-name') });

async function zumTerminFormular(page) {
  await page.goto('/termin');
  await page.getByRole('button', { name: /Individuelles Formular/ }).click();
  await expect(page.locator('#termin-name')).toBeVisible();
}

test.describe('Termin-Formular (F-08) auf /termin', () => {
  test('ohne Name, Telefon und Einwilligung: Pflichtfelder blockieren, keine Anfrage', async ({ page, anfragen }) => {
    await zumTerminFormular(page);
    await sammleSubmits(termin(page));
    await termin(page).getByRole('button', { name: /Termin online anfragen/ }).click();
    expect(await ungueltig(page.locator('#termin-name'))).toBe(true);
    expect(await ungueltig(page.locator('#termin-phone'))).toBe(true);
    expect(await submitsGezaehlt(page)).toBe(0);
    expect(anfragen).toHaveLength(0);
  });

  test('Telefonnummer unter 6 Zeichen: blockiert, keine Anfrage', async ({ page, anfragen }) => {
    await zumTerminFormular(page);
    await page.locator('#termin-name').fill('Prüf Person');
    await page.locator('#termin-phone').fill('01701');
    await termin(page).getByRole('checkbox').check();
    await sammleSubmits(termin(page));
    await termin(page).getByRole('button', { name: /Termin online anfragen/ }).click();
    expect(await ungueltig(page.locator('#termin-phone'))).toBe(true);
    expect(await submitsGezaehlt(page)).toBe(0);
    expect(anfragen).toHaveLength(0);
  });

  test('ohne Einwilligung: blockiert, keine Anfrage', async ({ page, anfragen }) => {
    await zumTerminFormular(page);
    await page.locator('#termin-name').fill('Prüf Person');
    await page.locator('#termin-phone').fill('0170 0000000');
    await sammleSubmits(termin(page));
    await termin(page).getByRole('button', { name: /Termin online anfragen/ }).click();
    expect(await ungueltig(termin(page).getByRole('checkbox'))).toBe(true);
    expect(await submitsGezaehlt(page)).toBe(0);
    expect(anfragen).toHaveLength(0);
  });

  test('gültig: Termin-Anfrage mit terminDetails geht raus, Erfolg mit Referenz', async ({ page, anfragen }) => {
    await zumTerminFormular(page);
    const datum = isoInTagen(7);
    await page.locator('#termin-topic').selectOption('grossformate');
    await page.locator('#termin-date').fill(datum);
    await page.locator('#termin-slot').selectOption('nachmittags');
    await page.locator('#termin-name').fill('Prüf Person');
    await page.locator('#termin-phone').fill('0170 0000000');
    await page.locator('#termin-email').fill('pruef@beispiel.de');
    await page.locator('#termin-zip').fill('35614 Aßlar');
    await page.locator('#termin-notes').fill('Testnotiz');
    await termin(page).getByRole('checkbox').check();
    await termin(page).getByRole('button', { name: /Termin online anfragen/ }).click();
    await expect(page.getByText('Terminanfrage erfolgreich übermittelt')).toBeVisible();
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({
      inquiryType: 'termin',
      projectType: 'termin',
      contact: { name: 'Prüf Person', phone: '0170 0000000', email: 'pruef@beispiel.de', zipCity: '35614 Aßlar', location: '35614 Aßlar' },
      terminDetails: { topic: 'grossformate', date: datum, formattedDate: alsAnzeige(datum), timeSlot: 'nachmittags' },
      notes: 'Testnotiz',
    });
    expect(typeof anfragen[0].terminDetails.topicLabel).toBe('string');
    expect(typeof anfragen[0].terminDetails.timeSlotLabel).toBe('string');
  });

  test.describe('echte Route (Mock-Modus ohne Resend-Schlüssel)', () => {
    test.use({ echteRoute: true });
    test('Server nimmt Termin-Formular an und vergibt echte Referenz', async ({ page }) => {
      await zumTerminFormular(page);
      await warteBotSchwelle(page);
      await page.locator('#termin-name').fill(`Prüf ${Date.now() % 100000}`);
      await page.locator('#termin-phone').fill(`0170 ${String(Date.now()).slice(-7)}`);
      await termin(page).getByRole('checkbox').check();
      await termin(page).getByRole('button', { name: /Termin online anfragen/ }).click();
      const ref = page.getByText(/Vorgangs-Nr\.: TEZ-\d{2}-[A-Z0-9]+/);
      await expect(ref).toBeVisible();
      const id = (await ref.textContent()).match(/TEZ-\d{2}-[A-Z0-9]+/)[0];
      expect(istEchteReferenz(id)).toBe(true);
    });
  });
});

// ---------- V-02 Kalender und Uhr (E2-ORCH-09) ----------
// Vorher: Der vorgerenderte Kalender rechnete mit dem Build-Tag; lag der Besuchstag danach, meldete React einen
// Hydrierungsfehler (#418). Abnahme: Uhr des Browsers einen Tag nach heute (also sicher nach dem Build-Tag) –
// keine Hydrierungsmeldung, und der erste angebotene Tag ist der Werktag nach dem Besuchstag.
test.describe('V-02 Kalender rechnet mit dem Besuchstag', () => {
  test('/kontakt#termin-buchen mit Uhr auf heute + 1: kein Hydrierungsfehler, erster Tag = Besuchstag + 1 (ohne Sonntag)', async ({ page }) => {
    const meldungen = [];
    page.on('console', (m) => { if (m.type() === 'error') meldungen.push(m.text()); });
    page.on('pageerror', (e) => meldungen.push(String(e)));
    const [y, m, d] = heute().split('-').map(Number);
    // 12:00 Uhr Berliner Zeit am Folgetag (Mittag vermeidet Tagesgrenzen durch Zeitzonen)
    await page.clock.install({ time: new Date(Date.UTC(y, m - 1, d + 1, 10, 0, 0)) });
    await page.goto('/kontakt#termin-buchen');
    const ersterTag = page.getByRole('region', { name: 'Verfügbare Termine' }).getByRole('group').first();
    await expect(ersterTag.getByRole('button', { name: '08:30 Uhr', exact: true })).toBeVisible();
    let erwartet = isoInTagen(2);
    if (new Date(`${erwartet}T12:00:00Z`).getUTCDay() === 0) erwartet = isoInTagen(3);
    await expect(ersterTag).toHaveAttribute('aria-label', new RegExp(`${alsAnzeige(erwartet).replace(/\./g, '\\.')}$`));
    expect(meldungen.filter((t) => /418|hydrat/i.test(t))).toEqual([]);
  });
});
