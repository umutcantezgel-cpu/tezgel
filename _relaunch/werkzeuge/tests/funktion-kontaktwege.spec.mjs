// Funktionstests F-10 (WhatsApp-Links und Widget) und F-15 (Telefon/E-Mail).
// Prüft Ziele (href bzw. geöffnetes Ziel), vorbelegten Text und Versand, nicht Aussehen.
// Kein Formular: ein Test gegen die echte Route entfällt. Jeder Browserlauf läuft hinter der Sperre (G5).
import { test, expect, bedienbar } from './fixtures.mjs';

const WA_NUMMER = '491726728504';
const TEL_FESTNETZ = '4964414483567';
const TEL_MOBIL = '491726728504';
const MAIL = 'info@tezgel.de';

const WA_URL = /^https:\/\/(api\.whatsapp\.com\/send|wa\.me\/)/;

// Ziel einer WhatsApp-URL lesen: api.whatsapp.com/send?phone=… oder wa.me/…
function waZiel(url) {
  const u = new URL(url);
  const passt = u.protocol === 'https:' && ((u.hostname === 'api.whatsapp.com' && u.pathname === '/send') || u.hostname === 'wa.me');
  const nummer = u.hostname === 'wa.me' ? u.pathname.replace(/^\/+/, '') : u.searchParams.get('phone');
  return { url, passt, nummer, text: u.searchParams.get('text') ?? '' };
}

// Telefonziel ohne Leerzeichen und Trennzeichen (tel:+49 6441 4483567 → 4964414483567).
const telZiel = (href) => href.replace(/^tel:/i, '').replace(/\D/g, '');

async function hrefs(locator) {
  return locator.evaluateAll((els) => els.map((el) => el.getAttribute('href') || ''));
}

async function oeffnungen(page) {
  return page.evaluate(() => window.__relaunchOpened.length);
}

// WhatsApp-Aufruf auslösen und das Ziel erfassen. Am Desktop geht es über das abgefangene window.open,
// mobil über window.location.href (Navigation, die die Sperre mit 204 beantwortet). Beides wird gelesen.
async function waAufrufen(page, ausloeser) {
  const gesehen = [];
  const merken = (req) => { if (WA_URL.test(req.url())) gesehen.push(req.url()); };
  page.on('request', merken);
  try {
    await ausloeser();
    await expect.poll(async () => gesehen.length + (await oeffnungen(page))).toBeGreaterThan(0);
    const geoeffnet = await page.evaluate(() => window.__relaunchOpened.slice());
    return [...geoeffnet, ...gesehen];
  } finally {
    page.off('request', merken);
  }
}

// Der WhatsApp-Knopf der Seite in dieser Fassung (E-012, P3-07). Der Weg ist der, den ein Besucher hier sieht:
// der Kanal `#whatsapp-floating-btn` (Kern am Desktop, Bestand überall), sonst die untere Leiste (Kern mobil).
// Der Kern-Kanal weicht Formularen, der Hauptaktion und der Abschlusszeile aus (P3-07): am Desktop
// ist er je nach Scrollstand unsichtbar. Deshalb wird Stelle für Stelle durch die Seite gescrollt, bis er sichtbar
// ist. Namen wörtlich aus dem Bau (Kanal und Leiste).
const KANAL_NAME = 'WhatsApp-Nachricht an Fliesenverlegung Tezgel senden';
const LEISTE_NAME = 'WhatsApp-Chat starten';
const SCROLL_ANTEILE = [0.5, 0.25, 0.75, 0.125, 0.375, 0.625, 0.875, 1, 0];
async function wegWhatsApp(page) {
  const kanal = page.locator('#whatsapp-floating-btn');
  const leiste = page
    .getByRole('complementary', { name: 'Schnellkontakt Daumenleiste' })
    .getByRole('link', { name: LEISTE_NAME, exact: true });
  await bedienbar(kanal);
  for (const anteil of SCROLL_ANTEILE) {
    await page.evaluate((a) => window.scrollTo(0, (document.documentElement.scrollHeight - window.innerHeight) * a), anteil);
    if (await kanal.waitFor({ state: 'visible', timeout: 1000 }).then(() => true, () => false)) return { knopf: kanal, name: KANAL_NAME };
    if (await leiste.isVisible()) {
      await bedienbar(leiste);
      return { knopf: leiste, name: LEISTE_NAME };
    }
  }
  throw new Error('Kein sichtbarer WhatsApp-Weg auf dieser Seite: weder Kanal noch Leiste erreichbar');
}

// Seite → erwartetes Textmuster des vorbelegten Widget-Textes (kontextuell nach Pfad).
const WIDGET_SEITEN = [
  ['/', /Fliesen/],
  ['/kontakt', /Projekt anfragen|Beratungstermin/],
  ['/bad', /Badsanierung/],
];

test.describe('F-10 WhatsApp-Links und Widget', () => {
  for (const [pfad, textMuster] of WIDGET_SEITEN) {
    test(`Widget ${pfad}: Klick öffnet WhatsApp mit Firmennummer und seitenbezogenem Text, ohne Anfrage`, async ({ page, anfragen }) => {
      await page.goto(pfad);
      const { knopf } = await wegWhatsApp(page);
      const ziele = await waAufrufen(page, () => knopf.click());
      const z = waZiel(ziele[0]);
      expect(z.passt, z.url).toBe(true);
      expect(z.nummer).toBe(WA_NUMMER);
      expect(z.text).toMatch(textMuster);
      expect(anfragen).toHaveLength(0);
    });
  }

  test('Widget: kein vorgetäuschtes Benachrichtigungs-Abzeichen (E-012)', async ({ page }) => {
    await page.goto('/');
    const { knopf, name } = await wegWhatsApp(page);
    await expect(knopf).toBeVisible();
    await expect(knopf).toHaveAttribute('aria-label', name);
    // Das Abzeichen saß im Knopf selbst (Ausgangsstand: ein Element mit Text „1“); Schrittnummern der Seite zählen nicht.
    await expect(knopf.getByText('1', { exact: true })).toHaveCount(0);
  });

  test('Widget: Doppelklick löst nur einen WhatsApp-Aufruf aus (Entprellung)', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'Am Desktop über window.open synchron prüfbar; mobil ist es eine Navigation');
    await page.goto('/');
    const { knopf } = await wegWhatsApp(page);
    await knopf.dblclick();
    expect(await oeffnungen(page)).toBe(1);
  });

  for (const pfad of ['/', '/kontakt', '/bad']) {
    test(`${pfad}: alle WhatsApp-Links (Hero, FinalCTA, Leiste, Fußbereich) zeigen auf die Firmennummer`, async ({ page }) => {
      await page.goto(pfad);
      const alle = (await hrefs(page.locator('a[href*="whatsapp.com"], a[href*="wa.me"]'))).map(waZiel);
      expect(alle.length).toBeGreaterThan(0);
      expect(alle.filter((z) => !z.passt || z.nummer !== WA_NUMMER).map((z) => z.url)).toEqual([]);
    });
  }

  test('Mobil-Leiste: WhatsApp-Knopf öffnet Chat mit Firmennummer', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobil', 'MobileBottomBar ist nur mobil sichtbar');
    await page.goto('/');
    const knopf = page
      .getByRole('complementary', { name: 'Schnellkontakt Daumenleiste' })
      .getByRole('link', { name: 'WhatsApp-Chat starten' });
    const ziele = await waAufrufen(page, () => knopf.click());
    const z = waZiel(ziele[0]);
    expect(z.passt, z.url).toBe(true);
    expect(z.nummer).toBe(WA_NUMMER);
  });
});

test.describe('F-15 Telefon und E-Mail', () => {
  for (const pfad of ['/', '/kontakt', '/bad']) {
    test(`${pfad}: alle Telefonlinks zeigen auf Festnetz oder Mobilnummer, mindestens einer auf Festnetz`, async ({ page }) => {
      await page.goto(pfad);
      const ziele = (await hrefs(page.locator('a[href^="tel:"]'))).map(telZiel);
      expect(ziele).toContain(TEL_FESTNETZ);
      expect(ziele.filter((z) => z !== TEL_FESTNETZ && z !== TEL_MOBIL)).toEqual([]);
    });

    test(`${pfad}: alle E-Mail-Links zeigen auf ${MAIL}`, async ({ page }) => {
      await page.goto(pfad);
      const mails = await hrefs(page.locator('a[href^="mailto:"]'));
      expect(mails.length).toBeGreaterThan(0);
      expect(mails.filter((m) => m !== `mailto:${MAIL}`)).toEqual([]);
    });
  }

  test('/bad Fußbereich: Festnetz, E-Mail und WhatsApp sind verlinkt', async ({ page }) => {
    await page.goto('/bad');
    const fuss = page.getByRole('contentinfo');
    const tel = (await hrefs(fuss.locator('a[href^="tel:"]'))).map(telZiel);
    const mail = await hrefs(fuss.locator('a[href^="mailto:"]'));
    const wa = (await hrefs(fuss.locator('a[href*="whatsapp.com"], a[href*="wa.me"]'))).map(waZiel);
    expect(tel).toContain(TEL_FESTNETZ);
    expect(mail).toContain(`mailto:${MAIL}`);
    expect(wa.length).toBeGreaterThan(0);
    expect(wa.filter((z) => !z.passt || z.nummer !== WA_NUMMER).map((z) => z.url)).toEqual([]);
  });

  test('Mobil-Leiste: Anrufen zeigt auf die Festnetznummer', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobil', 'MobileBottomBar ist nur mobil sichtbar');
    await page.goto('/');
    const anrufen = page.locator('aside[aria-label="Schnellkontakt Daumenleiste"] a[href^="tel:"]');
    expect(await hrefs(anrufen)).toEqual([`tel:+${TEL_FESTNETZ}`]);
  });
});
