// Funktionstests F-07 (BookingCalendar auf /termin und /kontakt#termin-buchen) und F-08 (Termin-Formular auf /termin).
// Prüft Verhalten: Blockieren bei fehlenden Pflichtangaben, gesendete Nutzlast (Fixture `anfragen`), Erfolgszustand mit Referenz.
// Der Kalender zeigt Tage ab morgen (relativ zu heute): Datum und Slot werden aus der Auswahl gelesen, nicht fest vorgegeben.
// Bekannter Ausgangsfehler (Datum/Uhrzeit des Kalenders erreichen die Mail nicht): hier nicht als Soll festgeschrieben,
// geprüft wird nur, was der Client sendet, und welcher Zustand folgt.
import { test, expect, warteBotSchwelle, istEchteReferenz, bedienbar, oeffne, istKern } from './fixtures.mjs';

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

// Fassung je Seite (Lehre 10, P4-06): KERN_SEITEN (fixtures.mjs), nie das DOM. Weg zum Slot nach Fassung (P4-05c):
// Bestand = Slot-Knopf „15:00 Uhr“ des Tages (n-ter Knopf mit dem Namen); Kern = erst der Tag-Knopf („Di, 13.10.2026“,
// über den Namen gesucht, nicht über aria-pressed), dann das Radio der Uhrzeit. Texte, Felder und Nutzlast sind gleich.
const tagKnopf = (page, tagIndex) => page.getByRole('button', { name: /^\w{2}, \d{2}\.\d{2}\.\d{4}/ }).nth(tagIndex);
const ersterSchritt = (page, ort, uhrzeit = '15:00', tagIndex = 1) =>
  istKern(ort) ? tagKnopf(page, tagIndex) : page.getByRole('button', { name: `${uhrzeit} Uhr`, exact: true }).nth(tagIndex);
const oeffneKalender = (page, ort) => oeffne(page, ort, ersterSchritt(page, ort));

// Wählt Slot (zweiter Tag, damit das Datum nicht zufällig der erste Tag ist) und liefert Datum/Slot aus der Schritt-2-Überschrift.
async function kalenderZuKontaktdaten(page, ort, uhrzeit = '15:00', tagIndex = 1) {
  const schritt = await bedienbar(ersterSchritt(page, ort, uhrzeit, tagIndex));
  // Kern: Datum des angeklickten Tag-Knopfs („Di, 13.10.2026“). Die Auswahl muss genau diesen Tag treffen – sonst bliebe ein
  // Kalender, der immer den ersten Tag wählt, unbemerkt (Mutationsprobe P4-Tor, P2).
  const angeklickt = istKern(ort) ? (await schritt.textContent()).match(/\d{2}\.\d{2}\.\d{4}/)?.[0] : null;
  await schritt.click();
  if (istKern(ort)) await page.getByRole('radio', { name: `${uhrzeit} Uhr`, exact: true }).click();
  const kopf = page.getByText(/Schritt 2: Kontaktdaten für \d{2}\.\d{2}\.\d{4} um \d{2}:\d{2} Uhr/);
  await expect(kopf).toBeVisible();
  const m = (await kopf.textContent()).match(/(\d{2})\.(\d{2})\.(\d{4}) um (\d{2}:\d{2}) Uhr/);
  if (istKern(ort)) expect(`${m[1]}.${m[2]}.${m[3]}`, 'gewählter Tag = angeklickter Tag-Knopf').toBe(angeklickt);
  return { iso: `${m[3]}-${m[2]}-${m[1]}`, anzeige: `${m[1]}.${m[2]}.${m[3]}`, zeit: m[4] };
}

for (const { ort, url, serviceType } of ORTE_KALENDER) {
  test.describe(`BookingCalendar (F-07) auf ${ort}`, () => {
    test('ohne Name, Telefon und Einwilligung: Pflichtfelder blockieren, keine Anfrage', async ({ page, anfragen }) => {
      await oeffneKalender(page, url);
      await kalenderZuKontaktdaten(page, url);
      const formular = kalenderFormular(page);
      await sammleSubmits(formular);
      await formular.getByRole('button', { name: /Vor-Ort-Termin anfragen/ }).click();
      expect(await ungueltig(page.getByPlaceholder('Vor- und Nachname'))).toBe(true);
      expect(await submitsGezaehlt(page)).toBe(0);
      expect(anfragen).toHaveLength(0);
      await expect(page.getByText(/Schritt 2: Kontaktdaten für/)).toBeVisible();
    });

    test('nur Leerzeichen als Name: Fehlermeldung, keine Anfrage', async ({ page, anfragen }) => {
      await oeffneKalender(page, url);
      await kalenderZuKontaktdaten(page, url);
      await page.getByPlaceholder('Vor- und Nachname').fill('   ');
      await page.getByPlaceholder('0172 / 1234567').fill('0170 0000000');
      await page.locator('#booking-consent').check();
      await kalenderFormular(page).getByRole('button', { name: /Vor-Ort-Termin anfragen/ }).click();
      await expect(page.getByText('Bitte füllen Sie Name und Telefonnummer aus')).toBeVisible();
      expect(anfragen).toHaveLength(0);
    });

    test('ohne Einwilligung: Anfrage wird blockiert, keine Anfrage', async ({ page, anfragen }) => {
      await oeffneKalender(page, url);
      await kalenderZuKontaktdaten(page, url);
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
      await oeffneKalender(page, url);
      const { iso, anzeige, zeit } = await kalenderZuKontaktdaten(page, url);
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

// F-08: in beiden Fassungen gleich (P4-05c), kein Zweig nach Fassung.
async function zumTerminFormular(page) {
  const umschalter = page.getByRole('button', { name: /Individuelles Formular/ });
  await oeffne(page, '/termin', umschalter);
  await umschalter.click();
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
