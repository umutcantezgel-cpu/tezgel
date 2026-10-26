// FUNKTIONSTEST F-05 · BadProjektCheck (/bad/projekt-check und eingebettet auf /bad, Abschnitt #projekt-check).
// Kernaufgabe: Die Projektdaten (Größe, Sanierungsumfang, Ausstattung, Extras) gehen als POST /api/anfrage
// mit inquiryType „projekt_check“ und projektCheckDetails raus; Erfolg mit Referenz. Der WhatsApp-Knopf sendet
// nichts an die Anfrage-Route, sondern öffnet WhatsApp mit denselben Projektdaten.
// Geprüft wird Verhalten (Nutzlast, Zustand, Ziel-Link), nicht Aussehen. Altverhalten = Ausgangsstand 5a7a7b0.
import { test, expect, warteBotSchwelle, istEchteReferenz } from './fixtures.mjs';

// Desktop-Läufe brauchen bis ~45 s je Test (volle Seite mit Animationen); das Projekt-Timeout von 60 s ist dafür zu knapp.
test.setTimeout(120_000);

const SEITEN = ['/bad/projekt-check', '/bad'];
const WHATSAPP_NUMMER = '491726728504';

// Wurzel der Prüfung: auf /bad nur der eingebettete Projektcheck, sonst die ganze Seite.
const wurzel = (page, seite) => (seite === '/bad' ? page.locator('#projekt-check') : page);

// Bedienelemente über Labels, Rollen und sichtbare Texte (keine Gestaltungsklassen).
const groesse = (w) => w.getByLabel(/^1\. Größe des Badezimmers in Quadratmetern/);
const anfordern = (w) => w.getByRole('button', { name: 'Angebot mit Festpreis anfordern', exact: true });
const name = (w) => w.getByLabel('Ihr Name', { exact: true });
const telefon = (w) => w.getByLabel('Ihre Telefonnummer', { exact: true });
const email = (w) => w.getByLabel('Ihre E-Mail-Adresse (optional)', { exact: true });
const online = (w) => w.getByRole('button', { name: 'Online anfragen (mit E-Mail-Bestätigung)', exact: true });
const whatsapp = (w) => w.getByRole('button', { name: 'Anfrage per WhatsApp senden', exact: true });
const erfolg = (w) => w.getByText('Projektcheck übermittelt');

// Zählt im Browser synchron, ob /api/anfrage überhaupt angefragt wird (ohne Wartezeit).
async function zaehleAnfragen(page) {
  await page.evaluate(() => {
    window.__anfrageAufrufe = 0;
    const original = window.fetch.bind(window);
    window.fetch = (input, init) => {
      if (String(input).includes('/api/anfrage')) window.__anfrageAufrufe += 1;
      return original(input, init);
    };
  });
}
const anfrageAufrufe = (page) => page.evaluate(() => window.__anfrageAufrufe ?? 0);

// Auswahl ohne Vorauswahl (E4-W1, F2): 3,5 m², Wanne zu Dusche, Exklusiv, Spiegel mit Licht und Badewanne, alles von Hand gewählt.
async function konfiguriere(w) {
  await groesse(w).press('Home');
  await expect(w.getByText('3,5 m²', { exact: true })).toBeVisible();
  await w.getByRole('button', { name: /^Wanne zu Dusche/ }).click();
  await w.getByRole('button', { name: /^Exklusiv/ }).click();
  await w.getByRole('button', { name: 'Spiegel mit Licht', exact: true }).click();
  await w.getByRole('button', { name: 'Badewanne oder Komfortwanne', exact: true }).click();
  await expect(w.getByRole('button', { name: /^Wanne zu Dusche/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(w.getByRole('button', { name: /^Exklusiv/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(w.getByRole('button', { name: 'Spiegel mit Licht', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(w.getByRole('button', { name: 'Badewanne oder Komfortwanne', exact: true })).toHaveAttribute('aria-pressed', 'true');
}

// Kontaktformular öffnen und ausfüllen.
async function kontaktAusfuellen(w, { mitEmail = true } = {}) {
  await anfordern(w).click();
  await name(w).fill('Prüf Person');
  await telefon(w).fill('0170 0000000');
  if (mitEmail) await email(w).fill('pruef@example.de');
}

test.describe('BadProjektCheck (/bad/projekt-check)', () => {
  test('ohne Name und Telefon: Online- und WhatsApp-Weg blockiert, keine Anfrage, kein WhatsApp', async ({ page, anfragen, protokoll }) => {
    await page.goto('/bad/projekt-check');
    await zaehleAnfragen(page);
    await anfordern(page).click();
    await online(page).click();
    await expect(name(page)).toBeFocused();
    expect(await name(page).evaluate((el) => !el.checkValidity())).toBe(true);
    await whatsapp(page).click();
    await expect(name(page)).toBeFocused();
    await expect(page.getByText('WhatsApp wurde geöffnet')).toHaveCount(0);
    expect(protokoll.filter((e) => String(e.url ?? '').includes('api.whatsapp.com'))).toHaveLength(0);
    expect(await anfrageAufrufe(page)).toBe(0);
    expect(anfragen).toHaveLength(0);
  });

  test('Telefonnummer unter 6 Zeichen: Versand blockiert, keine Anfrage', async ({ page, anfragen }) => {
    await page.goto('/bad/projekt-check');
    await zaehleAnfragen(page);
    await anfordern(page).click();
    await name(page).fill('Prüf Person');
    await telefon(page).fill('0170');
    await online(page).click();
    await expect(telefon(page)).toBeFocused();
    expect(await telefon(page).evaluate((el) => !el.checkValidity())).toBe(true);
    expect(await anfrageAufrufe(page)).toBe(0);
    expect(anfragen).toHaveLength(0);
  });

  test('ungültige E-Mail-Adresse: Versand blockiert, keine Anfrage', async ({ page, anfragen }) => {
    await page.goto('/bad/projekt-check');
    await zaehleAnfragen(page);
    await anfordern(page).click();
    await name(page).fill('Prüf Person');
    await telefon(page).fill('0170 0000000');
    await email(page).fill('keine-adresse');
    await online(page).click();
    await expect(email(page)).toBeFocused();
    expect(await email(page).evaluate((el) => !el.checkValidity())).toBe(true);
    expect(await anfrageAufrufe(page)).toBe(0);
    expect(anfragen).toHaveLength(0);
  });

  test('nur Pflichtangaben: ohne Auswahl wird nur der Kontakt gesendet, ohne E-Mail, keine Bestätigungs-E-Mail angekündigt', async ({ page, anfragen }) => {
    await page.goto('/bad/projekt-check');
    const w = wurzel(page, '/bad/projekt-check');
    await kontaktAusfuellen(w, { mitEmail: false });
    await online(w).click();
    await expect(erfolg(w)).toBeVisible();
    await expect(w.getByText('TEZ-26-TEST')).toBeVisible();
    expect(anfragen).toHaveLength(1);
    expect(anfragen[0]).toMatchObject({
      inquiryType: 'projekt_check',
      projectType: 'bad',
      projectTitle: 'Bad-Projektcheck',
      contact: { name: 'Prüf Person', phone: '0170 0000000' },
      projektCheckDetails: { extras: [] },
      timing: 'Nach Aufmaß',
    });
    // Keine Vorauswahl: Größe, Umfang und Ausstattung fehlen in der Nutzlast, es gibt keine Fläche.
    expect(anfragen[0].projektCheckDetails.sqm).toBeUndefined();
    expect(anfragen[0].projektCheckDetails.scope).toBeUndefined();
    expect(anfragen[0].projektCheckDetails.tier).toBeUndefined();
    expect(anfragen[0].area).toBeUndefined();
    expect(anfragen[0].contact.email).toBeUndefined();
    await expect(w.getByText('pruef@example.de', { exact: true })).toHaveCount(0);
  });

  test('beim Laden ist nichts gewählt: Größe, Umfang, Ausstattung und Extras; Zusammenfassung nennt „noch keine Angabe“', async ({ page }) => {
    await page.goto('/bad/projekt-check');
    const w = wurzel(page, '/bad/projekt-check');
    await expect(w.getByText('noch keine Angabe').first()).toBeVisible();
    for (const knopf of [/^Komplettbad/, /^Teilsanierung/, /^Wanne zu Dusche/, /^Solide/, /^Gehoben/, /^Exklusiv/]) {
      await expect(w.getByRole('button', { name: knopf })).toHaveAttribute('aria-pressed', 'false');
    }
    await expect(w.getByRole('button', { name: 'Spiegel mit Licht', exact: true })).toHaveAttribute('aria-pressed', 'false');
    await expect(w.getByRole('button', { name: /^Bodengleiche Dusche/ })).toHaveAttribute('aria-pressed', 'false');
    // Das passende Musterbad fehlt, solange die Größe nicht gewählt ist; ein Satz sagt, was fehlt.
    await expect(w.getByText('Für das passende Musterbad fehlt noch die Größe des Bads.')).toBeVisible();
    await expect(w.getByText(/^Passend:/)).toHaveCount(0);
  });

  test.describe('echte Route (Mock-Modus ohne Resend-Schlüssel)', () => {
    test.use({ echteRoute: true });
    test('Server nimmt Projektcheck an und vergibt echte Referenz (kein Bot-/Spam-Ignorieren)', async ({ page }) => {
      await page.goto('/bad/projekt-check');
      await warteBotSchwelle(page);
      await anfordern(page).click();
      await name(page).fill(`Prüf ${Date.now() % 100000}`);
      await telefon(page).fill(`0170 ${String(Date.now()).slice(-7)}`);
      await online(page).click();
      const ref = page.getByText(/TEZ-\d{2}-[A-Z0-9]+/).first();
      await expect(ref).toBeVisible();
      const id = (await ref.textContent()).match(/TEZ-\d{2}-[A-Z0-9]+/)?.[0] ?? '';
      expect(istEchteReferenz(id)).toBe(true);
    });
  });
});

test.describe('BadProjektCheck · Gutfall und WhatsApp auf beiden Seiten', () => {
  for (const seite of SEITEN) {
    test(`${seite}: Auswahl und Kontakt gehen als POST /api/anfrage (projekt_check, projektCheckDetails), Erfolg mit Referenz`, async ({ page, anfragen }) => {
      await page.goto(seite);
      const w = wurzel(page, seite);
      await konfiguriere(w);
      await kontaktAusfuellen(w);
      await online(w).click();
      await expect(erfolg(w)).toBeVisible();
      await expect(w.getByText('TEZ-26-TEST')).toBeVisible();
      await expect(w.getByText('pruef@example.de', { exact: true })).toBeVisible();
      expect(anfragen).toHaveLength(1);
      expect(anfragen[0]).toMatchObject({
        inquiryType: 'projekt_check',
        projectType: 'bad',
        projectTitle: 'Bad-Projektcheck (ca. 3,5 m²)',
        contact: { name: 'Prüf Person', phone: '0170 0000000', email: 'pruef@example.de' },
        projektCheckDetails: {
          sqm: '3,5',
          scope: 'dusche-nur',
          scopeLabel: 'Wanne zu Dusche',
          tier: 'luxus',
          tierLabel: 'Exklusiv',
          extras: ['Badewanne / Komfortwanne', 'LED-Lichtspiegel'],
        },
        area: 'ca. 3,5 m²',
        timing: 'Nach Aufmaß',
      });
    });

    test(`${seite}: WhatsApp-Knopf öffnet WhatsApp mit den Projektdaten, sendet keine Anfrage an die Route`, async ({ page, anfragen }) => {
      await page.goto(seite);
      const w = wurzel(page, seite);
      await zaehleAnfragen(page);
      await konfiguriere(w);
      await kontaktAusfuellen(w, { mitEmail: false });
      const waZiel = page.waitForRequest((r) => r.url().startsWith('https://api.whatsapp.com/send'));
      await whatsapp(w).click();
      const ziel = new URL((await waZiel).url());
      expect(ziel.origin + ziel.pathname).toBe('https://api.whatsapp.com/send');
      expect(ziel.searchParams.get('phone')).toBe(WHATSAPP_NUMMER);
      const text = ziel.searchParams.get('text') ?? '';
      expect(text).toContain('Hallo Herr Tezgel');
      expect(text).toContain('Badgröße: ca. 3,5 m²');
      expect(text).toContain('Sanierungsumfang: Wanne zu Dusche');
      expect(text).toContain('Ausstattungsniveau: Exklusiv');
      expect(text).toContain('Wunschausstattung: Badewanne / Komfortwanne, LED-Lichtspiegel');
      expect(text).toContain('Name: Prüf Person');
      expect(text).toContain('Telefon: 0170 0000000');
      expect(text).toContain('E-Mail: Nicht angegeben');
      await expect(w.getByText('WhatsApp wurde geöffnet')).toBeVisible();
      expect(await anfrageAufrufe(page)).toBe(0);
      expect(anfragen).toHaveLength(0);
    });
  }
});
