// FUNKTIONSTEST F-06 · FliesenKonfigurator (/fliesen/konfigurator, 4 Schritte).
// Kernaufgabe: Materialrichtwert (m² netto + Verschnitt je Verlegemuster) wird korrekt berechnet und angezeigt;
// Versand POST /api/anfrage mit inquiryType „fliesen“ und fliesenDetails. Geprüft wird Verhalten, nicht Aussehen.
// Richtwert-Tabelle: aus dem Code berechnet (calculateArea + fmt, Ausgangsstand 5a7a7b0).
// Verschnitt: Kreuzfuge / Halb-Drittelverband / Wilder Verband 5–10 %, Diagonal / Fischgrät 10–15 %, Noch offen 5–15 %.
import { test, expect, warteBotSchwelle, istEchteReferenz } from './fixtures.mjs';

const SEITE = '/fliesen/konfigurator';

// Rechner-Pflicht: 12 Eingabekombinationen (Fläche, Verlegemuster) mit erwartetem Richtwert = heutiges Verhalten.
const RICHTWERT = [
  { flaeche: '20', muster: 'Kreuzfuge', netto: '20', richtwert: 'ca. 21–22 m²' },
  { flaeche: '20', muster: 'Diagonal', netto: '20', richtwert: 'ca. 22–23 m²' },
  { flaeche: '20', muster: 'Noch offen', netto: '20', richtwert: 'ca. 21–23 m²' },
  { flaeche: '24,5', muster: 'Fischgrät', netto: '24,5', richtwert: 'ca. 27–28,2 m²' },
  { flaeche: '24,5', muster: 'Halb- / Drittelverband', netto: '24,5', richtwert: 'ca. 25,7–27 m²' },
  { flaeche: '12', muster: 'Wilder Verband', netto: '12', richtwert: 'ca. 12,6–13,2 m²' },
  { flaeche: '3', muster: 'Kreuzfuge', netto: '3', richtwert: 'ca. 3,2–3,3 m²' },
  { flaeche: '150', muster: 'Diagonal', netto: '150', richtwert: 'ca. 165–172,5 m²' },
  { flaeche: '1234,5', muster: 'Noch offen', netto: '1.234,5', richtwert: 'ca. 1.296,2–1.419,7 m²' },
  { flaeche: '33,3', muster: 'Wilder Verband', netto: '33,3', richtwert: 'ca. 35–36,6 m²' },
  { flaeche: '75', muster: 'Halb- / Drittelverband', netto: '75', richtwert: 'ca. 78,8–82,5 m²' },
  { flaeche: '7,5', muster: 'Fischgrät', netto: '7,5', richtwert: 'ca. 8,3–8,6 m²' },
];

// Bedienelemente über Rollen, Namen und Labels; Gruppen über ihre Legende.
const schritt = (page, n) => page.getByText(`Schritt ${n} von 4`, { exact: true });
const weiter = (page, n) => page.getByRole('button', { name: `Weiter zu Schritt ${n}`, exact: true });
const raum = (page, anfang) => page.getByRole('button', { name: new RegExp(`^${anfang}`) });
const gruppe = (page, legende) => page.getByRole('group', { name: legende, exact: true });
// Live-Vorschau des Materialbedarfs (oben im Konfigurator, aria-live)
const vorschau = (page) => page.locator('[aria-live="polite"]').filter({ hasText: 'Materialbedarf inkl. Verschnitt' });
const onlineSenden = (page) => page.getByRole('button', { name: /Online absenden/ });

async function zuSchritt3(page, raumAnfang) {
  await page.goto(SEITE);
  await raum(page, raumAnfang).click();
  await weiter(page, 2).click();
  await expect(schritt(page, 2)).toBeVisible();
  await weiter(page, 3).click();
  await expect(schritt(page, 3)).toBeVisible();
}

async function kontaktAusfuellen(page, { mitEinwilligung = true } = {}) {
  await page.getByLabel(/^Name/).fill('Prüf Person');
  await page.getByLabel(/^Telefon/).fill('0170 0000000');
  await page.getByRole('textbox', { name: /^E-Mail-Adresse/ }).fill('pruef@example.de');
  await page.getByLabel(/^PLZ/).fill('Aßlar');
  await page.getByLabel(/^Notiz/).fill('Testnotiz Konfigurator');
  if (mitEinwilligung) await page.getByRole('checkbox', { name: /einverstanden/ }).check();
}

// Treppe mit Stufenmaßen (14 Steigungen, 100 × 30 cm Trittstufen, 100 × 18 cm Setzstufen) und Setzstufen belegt.
async function treppeMasse(page) {
  await gruppe(page, 'Sollen auch die senkrechten Flächen der Stufen belegt werden?').getByRole('button', { name: 'Ja', exact: true }).click();
  await page.getByLabel('Anzahl Steigungen').fill('14');
  await page.getByLabel('Laufbreite (cm)').fill('100');
  await page.getByLabel('Auftrittstiefe inkl. Überstand (cm)').fill('30');
  await page.getByLabel('Steigungshöhe (cm)').fill('18');
}

// Gutfall-Kette: Küche + Flur, Zementestrich, Belag wird nicht entfernt, Großformat, Feinsteinzeug, Kreuzfuge, 24,5 m²,
// Zeitraum „In 1 – 3 Monaten“ → Schritt 4. Alles, was in der Kette gebraucht wird, wählt die Besucherin selbst (keine Vorauswahl).
async function bisSchritt4Gutfall(page, { fussbodenheizung = null } = {}) {
  await page.goto(SEITE);
  await raum(page, 'Küche').click();
  await raum(page, 'Flur & Diele').click();
  await weiter(page, 2).click();
  await expect(schritt(page, 2)).toBeVisible();
  await page.getByRole('button', { name: 'Neuer Zementestrich', exact: true }).click();
  if (fussbodenheizung) await gruppe(page, 'Ist eine Fußbodenheizung vorhanden oder geplant?').getByRole('button', { name: fussbodenheizung, exact: true }).click();
  await gruppe(page, 'Muss der alte Belag herausgenommen werden?').getByRole('button', { name: 'Nein', exact: true }).click();
  await weiter(page, 3).click();
  await expect(schritt(page, 3)).toBeVisible();
  await page.getByRole('button', { name: /^Großformat/ }).click();
  await gruppe(page, 'Material bzw. Optik:').getByRole('button', { name: 'Feinsteinzeug / Keramik', exact: true }).click();
  await gruppe(page, 'Verlegemuster:').getByRole('button', { name: 'Kreuzfuge', exact: true }).click();
  await page.getByLabel('Zu belegende Fläche in m²').fill('24,5');
  await page.getByRole('button', { name: 'Zur Zusammenfassung' }).click();
  await expect(schritt(page, 4)).toBeVisible();
  await gruppe(page, 'Gewünschter Zeitraum:').getByRole('button', { name: 'In 1 – 3 Monaten', exact: true }).click();
}

test.describe('FliesenKonfigurator (/fliesen/konfigurator)', () => {
  test('Schritt 1: „Weiter“ ist ohne Bereich gesperrt, mit Bereich freigegeben', async ({ page, anfragen }) => {
    await page.goto(SEITE);
    await expect(weiter(page, 2)).toBeDisabled();
    await expect(page.getByText('Bitte wählen Sie mindestens einen Bereich aus.')).toBeVisible();
    await raum(page, 'Küche').click();
    await expect(weiter(page, 2)).toBeEnabled();
    expect(anfragen).toHaveLength(0);
  });

  test('Schritt 3: Fläche ohne gültige Zahl → Hinweis statt Richtwert', async ({ page }) => {
    await zuSchritt3(page, 'Küche');
    await page.getByLabel('Zu belegende Fläche in m²').fill('abc');
    await expect(vorschau(page)).toContainText('Fläche in Schritt 3 eingeben.');
    await expect(vorschau(page)).not.toContainText('ca.');
  });

  test('Schritt 3: Treppe mit Stufenmaßen → Treppen-Richtwert (Trittstufen + Setzstufen)', async ({ page }) => {
    // 14 Steigungen → 13 Trittstufen à 100 × 30 cm = 3,90 m²; 14 Setzstufen à 100 × 18 cm = 2,52 m²; Summe 6,42 m²
    await zuSchritt3(page, 'Treppe');
    await treppeMasse(page);
    await expect(vorschau(page)).toContainText('6,42 m² netto (ohne Verschnitt)');
  });

  test('Schritt 3: Blockstufen → keine m²-Menge im Richtwert', async ({ page }) => {
    await zuSchritt3(page, 'Treppe');
    await treppeMasse(page);
    await expect(vorschau(page)).toContainText('6,42 m² netto');
    await page.getByRole('button', { name: /^Blockstufen/ }).click();
    await expect(vorschau(page)).toContainText('Menge nach Stufenmaßen bzw. beim Aufmaß');
    await expect(vorschau(page)).not.toContainText('6,42');
  });

  for (const [i, r] of RICHTWERT.entries()) {
    test(`Rechner ${i + 1}: ${r.flaeche} m² · ${r.muster} → ${r.richtwert} (netto ${r.netto} m²)`, async ({ page }) => {
      await zuSchritt3(page, 'Küche');
      await page.getByLabel('Zu belegende Fläche in m²').fill(r.flaeche);
      await gruppe(page, 'Verlegemuster:').getByRole('button', { name: r.muster, exact: true }).click();
      await expect(gruppe(page, 'Verlegemuster:').getByRole('button', { name: r.muster, exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(vorschau(page)).toContainText(r.richtwert);
      await expect(vorschau(page)).toContainText(`aus ${r.netto} m² netto`);
    });
  }

  test('Schritt 4: leere Pflichtfelder blockieren den Versand, keine Anfrage', async ({ page, anfragen }) => {
    await bisSchritt4Gutfall(page);
    await page.getByLabel(/^Name/).fill('');
    await page.getByLabel(/^Telefon/).fill('');
    await onlineSenden(page).click();
    await expect(page.getByLabel(/^Name/)).toBeFocused();
    expect(await page.getByLabel(/^Name/).evaluate((el) => !el.checkValidity())).toBe(true);
    await expect(schritt(page, 4)).toBeVisible();
    expect(anfragen).toHaveLength(0);
  });

  test('Schritt 4: Telefonnummer unter 6 Zeichen blockiert den Versand', async ({ page, anfragen }) => {
    await bisSchritt4Gutfall(page);
    await kontaktAusfuellen(page);
    await page.getByLabel(/^Telefon/).fill('0170');
    await onlineSenden(page).click();
    await expect(page.getByLabel(/^Telefon/)).toBeFocused();
    expect(await page.getByLabel(/^Telefon/).evaluate((el) => !el.checkValidity())).toBe(true);
    expect(anfragen).toHaveLength(0);
  });

  test('Schritt 4: ohne Einwilligung blockiert der Versand, keine Anfrage', async ({ page, anfragen }) => {
    await bisSchritt4Gutfall(page);
    await kontaktAusfuellen(page, { mitEinwilligung: false });
    await onlineSenden(page).click();
    await expect(page.getByRole('checkbox', { name: /einverstanden/ })).toBeFocused();
    expect(anfragen).toHaveLength(0);
  });

  test('Gutfall online: POST /api/anfrage mit inquiryType „fliesen“, Richtwert-Eingaben und Erfolg mit Referenz', async ({ page, anfragen }) => {
    await bisSchritt4Gutfall(page);
    await kontaktAusfuellen(page);
    await onlineSenden(page).click();
    await expect(page.getByText('Konfiguration erfolgreich übermittelt')).toBeVisible();
    await expect(page.getByText('Vielen Dank, Prüf Person!')).toBeVisible();
    await expect(page.getByText('TEZ-26-TEST')).toBeVisible();
    // Richtwert 24,5 m² Kreuzfuge (5–10 %) = ca. 25,7–27 m²
    await expect(page.getByText('ca. 25,7–27 m²')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    // Angaben ohne eigenes Mail-Feld kommen über die Anmerkungen an (Abnahme E4-W1, F3)
    for (const zeile of ['Nassbereich: ', 'Verlegemuster: ', 'Format: ']) expect(anfragen[0].notes).toContain(zeile);
    expect(anfragen[0]).toMatchObject({
      inquiryType: 'fliesen',
      projectType: 'fliesen',
      projectTitle: 'Fliesen-Konfiguration (Küche, Flur & Diele)',
      timing: 'In 1 – 3 Monaten',
      area: '24,5 m²',
      // Notiz zuerst, danach alle Angaben der Zusammenfassung (Abnahme E4-W1, F3)
      notes: expect.stringMatching(/^Testnotiz Konfigurator\n\nAngaben aus dem Fliesen-Konfigurator:\n/),
      contact: { name: 'Prüf Person', phone: '0170 0000000', email: 'pruef@example.de', zipCity: 'Aßlar', location: 'Aßlar' },
      fliesenDetails: {
        rooms: ['kueche', 'flur'],
        roomLabels: ['Küche', 'Flur & Diele'],
        sqm: '24,5',
        substrate: 'zement',
        substrateLabel: 'Neuer Zementestrich',
        tileType: 'feinsteinzeug',
        tileTypeLabel: 'Feinsteinzeug / Keramik (Großformat)',
        removal: 'nein',
        timing: 'In 1 – 3 Monaten',
        timingLabel: 'In 1 – 3 Monaten',
      },
    });
  });

  test('Gutfall WhatsApp: vorbereitete Nachricht enthält den Richtwert, kein Versand an /api/anfrage', async ({ page, anfragen }) => {
    await bisSchritt4Gutfall(page);
    await kontaktAusfuellen(page);
    const whatsappAnfrage = page.waitForRequest((r) => r.url().startsWith('https://api.whatsapp.com/send'));
    await page.getByRole('button', { name: /Per WhatsApp senden/ }).click();
    const url = new URL((await whatsappAnfrage).url());
    expect(url.searchParams.get('phone')).toBe('491726728504');
    const text = url.searchParams.get('text') ?? '';
    expect(text).toContain('Fläche: 24,5 m² netto; Richtwert inkl. Verschnitt (5–10 %): ca. 25,7–27 m²');
    expect(text).toContain('Name: Prüf Person');
    await expect(page.getByText('WhatsApp wurde geöffnet – bitte absenden')).toBeVisible();
    expect(anfragen).toHaveLength(0);
  });

  test('Gutfall nur Treppe: Versand als POST „fliesen“ mit Bereich „treppe“', async ({ page, anfragen }) => {
    await zuSchritt3(page, 'Treppe');
    await page.getByRole('button', { name: 'Zur Zusammenfassung' }).click();
    await expect(schritt(page, 4)).toBeVisible();
    await kontaktAusfuellen(page);
    await onlineSenden(page).click();
    await expect(page.getByText('Konfiguration erfolgreich übermittelt')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({ inquiryType: 'fliesen', fliesenDetails: { rooms: ['treppe'] } });
  });

  // Keine Vorauswahl (G8): Beim Laden und in jedem Schritt ist außer dem selbst gewählten Bereich nichts gedrückt.
  test('Keine Vorauswahl: nur der selbst gewählte Bereich ist gedrückt, Zusammenfassung nennt „Keine Angabe“', async ({ page }) => {
    await page.goto(SEITE);
    const gedrueckt = page.locator('fieldset button[aria-pressed="true"]');
    await expect(gedrueckt).toHaveCount(0);
    await raum(page, 'Küche').click();
    await expect(gedrueckt).toHaveCount(1);
    await weiter(page, 2).click();
    await expect(schritt(page, 2)).toBeVisible();
    await expect(gedrueckt).toHaveCount(0);
    await weiter(page, 3).click();
    await expect(schritt(page, 3)).toBeVisible();
    await expect(gedrueckt).toHaveCount(0);
    await expect(vorschau(page)).toContainText('Fläche in Schritt 3 eingeben.');
    await page.getByRole('button', { name: 'Zur Zusammenfassung' }).click();
    await expect(schritt(page, 4)).toBeVisible();
    await expect(gedrueckt).toHaveCount(0);
    await expect(page.getByText('Keine Angabe').first()).toBeVisible();
    await expect(page.getByText('Fläche: Noch keine Angabe in m²')).toBeVisible();
  });

  // Befund (Ausgangsstand): „Weiß nicht“ (Voreinstellung) wurde als „Nein“ übermittelt. Jetzt wird nur gesendet, was gewählt wurde.
  test('Fußbodenheizung „Weiß nicht“ wird im Versand als „Weiß nicht“ gemeldet', async ({ page, anfragen }) => {
    await bisSchritt4Gutfall(page, { fussbodenheizung: 'Weiß nicht' });
    await kontaktAusfuellen(page);
    await onlineSenden(page).click();
    await expect(page.getByText('Konfiguration erfolgreich übermittelt')).toBeVisible();
    expect(anfragen[0].fliesenDetails.underfloorHeating).toBe('unklar');
    expect(anfragen[0].fliesenDetails.underfloorHeatingLabel).toBe('Weiß nicht');
  });

  test('Fußbodenheizung ohne Wahl wird im Versand als „Keine Angabe“ gemeldet', async ({ page, anfragen }) => {
    await bisSchritt4Gutfall(page);
    await kontaktAusfuellen(page);
    await onlineSenden(page).click();
    await expect(page.getByText('Konfiguration erfolgreich übermittelt')).toBeVisible();
    expect(anfragen[0].fliesenDetails.underfloorHeating).toBeUndefined();
    expect(anfragen[0].fliesenDetails.underfloorHeatingLabel).toBe('Keine Angabe');
  });

  // Befund (Ausgangsstand): Ohne m²-Angabe (reine Treppe) ging die Vorgabe „20“ als Fläche raus.
  test('Nur Treppe: keine erfundene Fläche (Vorgabe 20 m²) in der Nutzlast', async ({ page, anfragen }) => {
    await zuSchritt3(page, 'Treppe');
    await page.getByRole('button', { name: 'Zur Zusammenfassung' }).click();
    await expect(schritt(page, 4)).toBeVisible();
    await kontaktAusfuellen(page);
    await onlineSenden(page).click();
    await expect(page.getByText('Konfiguration erfolgreich übermittelt')).toBeVisible();
    expect(anfragen[0].area).toBeUndefined();
    expect(anfragen[0].fliesenDetails.sqm).toBeUndefined();
  });

  // Offen (nicht F3-Befund): Treppendaten (Stufen, Maße) fehlen in der Online-Nutzlast; die Angaben gehen nur in die Nachricht.
  test.fixme(
    'Nur Treppe: Treppendaten (Stufen, Maße) gehen in der Online-Nutzlast mit',
    { annotation: { type: 'fixme', description: 'Ausgangsstand: fliesenDetails enthält keine Stufen- oder Maßangaben. Siehe OFFENE FRAGEN.' } },
    async ({ page, anfragen }) => {
      await zuSchritt3(page, 'Treppe');
      await treppeMasse(page);
      await page.getByRole('button', { name: 'Zur Zusammenfassung' }).click();
      await expect(schritt(page, 4)).toBeVisible();
      await kontaktAusfuellen(page);
      await onlineSenden(page).click();
      await expect(page.getByText('Konfiguration erfolgreich übermittelt')).toBeVisible();
      expect(Object.keys(anfragen[0].fliesenDetails).some((k) => /stufe|treppe|stair/i.test(k))).toBe(true);
    }
  );

  test.describe('echte Route (Mock-Modus ohne Resend-Schlüssel)', () => {
    test.use({ echteRoute: true });
    test('Server nimmt die Konfiguration an und vergibt echte Referenz', async ({ page }) => {
      await bisSchritt4Gutfall(page);
      await kontaktAusfuellen(page);
      await warteBotSchwelle(page);
      await onlineSenden(page).click();
      const ref = page.getByText(/TEZ-\d{2}-[A-Z0-9]+/).first();
      await expect(ref).toBeVisible();
      const id = ((await ref.textContent()) ?? '').match(/TEZ-\d{2}-[A-Z0-9]+/)?.[0] ?? '';
      expect(istEchteReferenz(id)).toBe(true);
    });
  });
});
