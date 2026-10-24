// Funktionstests F-13 (Navigation), F-14 (FAQ), F-16 (Blog-Werkzeuge), F-17 (404), F-18 (Login), F-19 (Stimmen auf /).
// Prüft Verhalten (Zustand, Ziel, Status, Fehlermeldung, Fokus), nicht Aussehen. Keine Wartezeiten, nur Zustandsabfragen.
// Kein Test gegen die echte Route nötig: keines dieser Elemente sendet an /api/anfrage (Login wird clientseitig abgewiesen).
import { test, expect, bedienbar } from './fixtures.mjs';
import fs from 'node:fs';
// Wortlaut der Stimmen aus src/config/reviews.js: die Quelldatei lesen und das Feld REVIEWS auswerten. Die Datei wird
// nicht als Modul geladen (kein „type“ im Repo-Paket, dadurch ESM-Import unmöglich); die Datei enthält keine Importe.
const reviewsQuelle = fs.readFileSync(new URL('../../../src/config/reviews.js', import.meta.url), 'utf8');
const REVIEWS = new Function(
  `${reviewsQuelle.replace(/^export default .*$/m, '').replace(/^export (const|function) /gm, '$1 ')}\nreturn REVIEWS;`,
)();

const ARTIKEL = '/blog/fliesen-reinigen-pflegen';

// Hauptnavigation im Kopf (ab 80 rem Kopfbreite). Das Menüblatt trägt denselben Namen als Dialog.
const hauptnav = (page) => page.getByRole('navigation', { name: 'Hauptnavigation', exact: true });
// Menüblatt (Popover-Dialog „Hauptnavigation“); geschlossen steht es nicht im Accessibility-Baum.
const drawer = (page) => page.getByRole('dialog', { name: 'Hauptnavigation', exact: true });
// Menü-Schalter im Kopf (liegt außerhalb des Blatts; im Blatt heißt der Schalter zum Schließen ebenso).
const menueSchalter = (page) => page.locator('header').getByRole('button', { name: /^Menü (öffnen|schließen)$/ });
// Schalter „Unterpunkte zu …“ eines Bereichs, im Kopf oder im Blatt.
const untermenue = (bereich, name) => bereich.getByRole('button', { name: new RegExp(`^Unterpunkte zu ${name} (öffnen|schließen)$`) });

test.describe('Aufklappblatt im Kopf (ab 80 rem Kopfbreite)', () => {
  test.skip(({ isMobile }) => isMobile, 'Die Hauptnavigation im Kopf ist mobil ausgeblendet');

  test('Zeiger: Hover öffnet das Aufklappblatt, Escape schließt es', async ({ page }) => {
    await page.goto('/');
    const nav = hauptnav(page);
    const schalter = untermenue(nav, 'Bad');
    const punkt = nav.getByRole('link', { name: /^Bad komplett erneuern/ });
    // Blockierfall: ohne Auslöser bleibt das Blatt zu.
    await expect(schalter).toHaveAttribute('aria-expanded', 'false');
    await expect(punkt).toHaveCount(0);
    await nav.getByRole('link', { name: 'Bad', exact: true }).hover();
    await expect(schalter).toHaveAttribute('aria-expanded', 'true');
    await expect(punkt).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(schalter).toHaveAttribute('aria-expanded', 'false');
    await expect(punkt).toHaveCount(0);
  });

  test('Tastatur: Schalter per Enter öffnen, Escape schließt, Fokus bleibt am Schalter', async ({ page }) => {
    await page.goto('/');
    const nav = hauptnav(page);
    const schalter = untermenue(nav, 'Bad');
    // Zustand statt Wartezeit: erst nach dem Hydrieren bedienen (vor dem Hydrieren ist das Blatt noch nicht bedienbar).
    await bedienbar(schalter);
    await schalter.focus();
    await page.keyboard.press('Enter');
    await expect(schalter).toHaveAttribute('aria-expanded', 'true');
    await expect(nav.getByRole('link', { name: /^Bad komplett erneuern/ })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(schalter).toHaveAttribute('aria-expanded', 'false');
    await expect(schalter).toBeFocused();
  });

  test('Klick auf einen Eintrag führt zum Ziel und schließt das Blatt', async ({ page }) => {
    await page.goto('/');
    const nav = hauptnav(page);
    await (await bedienbar(nav.getByRole('link', { name: 'Bad', exact: true }))).hover();
    await nav.getByRole('link', { name: /^Bad komplett erneuern/ }).click();
    await expect(page).toHaveURL(/\/bad\/badsanierung$/);
    await expect(untermenue(hauptnav(page), 'Bad')).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Menüblatt (unter 80 rem Kopfbreite)', () => {
  // Ab 80 rem steht die Hauptnavigation im Kopf und der Menü-Schalter ist ausgeblendet. Im Desktop-Projekt wird das
  // Menüblatt deshalb bei 1024 px geprüft (Kopf schmaler als 80 rem, Schalter sichtbar) – gleiche Schritte, gleiche Erwartungen.
  test.beforeEach(async ({ page, isMobile }) => {
    if (!isMobile) await page.setViewportSize({ width: 1024, height: 900 });
  });

  // Ein Klick vor der Hydrierung kann wirkungslos bleiben; das Blatt öffnet nativ über popovertarget.
  async function oeffneMenue(page) {
    const schalter = menueSchalter(page);
    await expect(async () => {
      if ((await schalter.getAttribute('aria-expanded')) !== 'true') await schalter.click();
      await expect(schalter).toHaveAttribute('aria-expanded', 'true', { timeout: 1500 });
    }).toPass({ timeout: 15_000 });
  }

  test('mobil: Desktop-Navigation ist ausgeblendet, der Menü-Schalter ist der Zugang', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'nur im Projekt mobil');
    await page.goto('/');
    await expect(hauptnav(page)).toBeHidden();
    await expect(menueSchalter(page)).toBeVisible();
  });

  test('Schalter öffnet das Menüblatt, Escape schließt es', async ({ page }) => {
    await page.goto('/');
    const schalter = menueSchalter(page);
    await expect(schalter).toHaveAttribute('aria-expanded', 'false');
    await expect(drawer(page)).toHaveCount(0);
    await oeffneMenue(page);
    await expect(drawer(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(schalter).toHaveAttribute('aria-expanded', 'false');
    await expect(drawer(page)).toHaveCount(0);
  });

  test('Schließen-Knopf im Blatt schließt es', async ({ page }) => {
    await page.goto('/');
    await oeffneMenue(page);
    await expect(drawer(page)).toBeVisible();
    await drawer(page).getByRole('button', { name: 'Menü schließen', exact: true }).click();
    await expect(drawer(page)).toHaveCount(0);
    await expect(menueSchalter(page)).toHaveAttribute('aria-expanded', 'false');
  });

  test('Bereich aufklappen, Link folgen: Ziel wird geöffnet, Menüblatt schließt', async ({ page }) => {
    await page.goto('/');
    await oeffneMenue(page);
    const dialog = drawer(page);
    await expect(dialog).toBeVisible();
    // Zustand statt Wartezeit: Einblend-Übergang des Blatts abschließen lassen, dann aufklappen
    await dialog.evaluate((el) => Promise.all(el.getAnimations({ subtree: true }).map((a) => a.finished.catch(() => null))));
    const bereich = untermenue(dialog, 'Bad');
    // Der Blatt-Inhalt wird beim ersten Öffnen nachgeladen und kann einmal neu einhängen (Zustand zurückgesetzt).
    // Verhalten „Bereich lässt sich aufklappen“ prüfen: Klick wiederholen, bis aufgeklappt (max. 10 s).
    await expect(async () => {
      if ((await bereich.getAttribute('aria-expanded')) !== 'true') await bereich.click();
      await expect(bereich).toHaveAttribute('aria-expanded', 'true', { timeout: 1500 });
    }).toPass({ timeout: 10_000 });
    await dialog.getByRole('link', { name: /^Bad komplett erneuern/ }).click();
    await expect(page).toHaveURL(/\/bad\/badsanierung$/);
    await expect(drawer(page)).toHaveCount(0);
  });
});

test.describe('Sprunglink', () => {
  test('erster Tabstopp, führt zu #main-content', async ({ page }) => {
    await page.goto('/leistungen');
    await page.keyboard.press('Tab');
    const sprung = page.getByRole('link', { name: 'Zum Hauptinhalt springen', exact: true });
    await expect(sprung).toBeFocused();
    await expect(sprung).toHaveAttribute('href', '#main-content');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main-content$/);
    await expect(page.locator(':target')).toHaveAttribute('id', 'main-content');
  });
});

test.describe('FAQ-Akkordeon (/faq)', () => {
  const frage = 'Welche Fliesenkleber und Fugenmassen verwenden Sie?';
  const antwort = 'Wir verwenden ausschließlich flexible C2-TE-S1/S2 Fliesenkleber';

  test('Frage öffnet die Antwort, zweiter Klick schließt sie (aria-expanded)', async ({ page }) => {
    await page.goto('/faq');
    const knopf = page.getByRole('button', { name: frage });
    await expect(knopf).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByText(antwort)).toHaveCount(0);
    await knopf.click();
    await expect(knopf).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText(antwort)).toBeVisible();
    await knopf.click();
    await expect(knopf).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByText(antwort)).toHaveCount(0);
  });

  test('Kategorie wechseln zeigt nur deren Fragen', async ({ page }) => {
    await page.goto('/faq');
    const bad = page.getByRole('button', { name: 'Bad & Walk-In-Dusche', exact: true });
    await expect(page.getByRole('button', { name: frage })).toBeVisible();
    await bad.click();
    await expect(bad).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: frage })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /Gibt es Zuschüsse für barrierefreie Bäder/ })).toBeVisible();
  });

  test('Suche liefert Treffer aus Frage und Antwort; ohne Treffer klare Meldung', async ({ page }) => {
    await page.goto('/faq');
    const suche = page.getByLabel('Frage oder Stichwort suchen', { exact: true });
    // Stichwort steht nur in den Antworten zweier Fragen (Pflegekasse).
    await suche.fill('Pflegekasse');
    await expect(page.getByRole('button', { name: /Gibt es Zuschüsse für barrierefreie Bäder/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Unterstützen Sie bei der Beantragung/ })).toBeVisible();
    await expect(page.getByRole('button', { name: frage })).toHaveCount(0);
    await suche.fill('xqzwjkpv');
    await expect(page.getByText('Keine passenden Fragen gefunden')).toBeVisible();
  });
});

test.describe('404', () => {
  test('unbekannte Adresse liefert Status 404 mit Hinweis und drei Wegen zurück', async ({ page }) => {
    const antwort = await page.goto('/gibt-es-nicht');
    expect(antwort.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Seite nicht gefunden', level: 1 })).toBeVisible();
    // Die drei Wege stehen im Hauptbereich in dieser Reihenfolge: Termin vor Ort anfragen, Startseite, Anruf.
    const wege = page.getByRole('main').getByRole('link');
    await expect(wege).toHaveCount(3);
    await expect(wege.nth(0)).toHaveAccessibleName(/Termin vor Ort anfragen/);
    await expect(wege.nth(0)).toHaveAttribute('href', '/kontakt');
    await expect(wege.nth(1)).toHaveAccessibleName('Zur Startseite');
    await expect(wege.nth(1)).toHaveAttribute('href', '/');
    await expect(wege.nth(2)).toHaveAccessibleName(/^Anrufen: /);
    await expect(wege.nth(2)).toHaveAttribute('href', /^tel:/);
  });

  test('Link „Zur Startseite“ führt zurück zur Startseite', async ({ page }) => {
    await page.goto('/gibt-es-nicht');
    await page.getByRole('link', { name: 'Zur Startseite', exact: true }).click();
    await expect.poll(() => new URL(page.url()).pathname).toBe('/');
    await expect(page.getByRole('heading', { name: 'Seite nicht gefunden' })).toHaveCount(0);
  });

  test('unbekannter Ratgeber-Artikel liefert ebenfalls Status 404', async ({ page }) => {
    const antwort = await page.goto('/blog/gibt-es-nicht');
    expect(antwort.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Seite nicht gefunden' })).toBeVisible();
  });
});

test.describe('Login (deaktiviert)', () => {
  test('leere Pflichtfelder: Anmeldung wird nicht ausgelöst', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Anmelden', exact: true }).click();
    const benutzer = page.getByLabel('Benutzername', { exact: true });
    expect(await benutzer.evaluate((el) => !el.checkValidity())).toBe(true);
    // Next.js legt einen leeren role="alert"-Routenankündiger an; gezählt werden nur Meldungen mit Text.
    await expect(page.getByRole('alert').filter({ hasText: /\S/ })).toHaveCount(0);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('falsche Daten: Meldung, Passwort wird geleert, kein Absturz', async ({ page }) => {
    const fehler = [];
    page.on('pageerror', (e) => fehler.push(String(e)));
    await page.goto('/login');
    await page.getByLabel('Benutzername', { exact: true }).fill('pruefer');
    await page.getByLabel('Passwort', { exact: true }).fill('geheim-123');
    await page.getByRole('button', { name: 'Anmelden', exact: true }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'Ungültige Anmeldedaten' })).toBeVisible();
    await expect(page.getByLabel('Passwort', { exact: true })).toHaveValue('');
    await expect(page.getByLabel('Benutzername', { exact: true })).toHaveValue('pruefer');
    await expect(page.getByRole('button', { name: 'Anmelden', exact: true })).toBeEnabled();
    await expect(page).toHaveURL(/\/login$/);
    expect(fehler).toEqual([]);
  });
});

test.describe('Stimmen auf / (F-19, ruhige Stimmenreihe statt Karussell)', () => {
  // Drei Stimmen, Wortlaut wörtlich aus src/config/reviews.js; die große Stimme steht zuerst (c-wolf).
  const STIMMEN = ['c-wolf', 'rabia-oe', 'elke-s'];
  const wortlaut = (id) => REVIEWS.find((r) => r.id === id)?.text;
  const zitate = (page) => page.locator('#kundenstimmen blockquote');

  test('drei Stimmen auf /, Wortlaut wörtlich aus REVIEWS, in der Reihenfolge c-wolf, rabia-oe, elke-s', async ({ page }) => {
    await page.goto('/');
    await expect(zitate(page)).toHaveCount(3);
    const gelesen = await zitate(page).evaluateAll((els) => els.map((el) => el.textContent?.trim() ?? ''));
    expect(gelesen).toEqual(STIMMEN.map(wortlaut));
  });

  test('c-wolf ist die große Stimme: ihre Schrift ist größer als die der beiden anderen', async ({ page }) => {
    await page.goto('/');
    await expect(zitate(page)).toHaveCount(3);
    const groesse = await zitate(page).evaluateAll((els) => els.map((el) => parseFloat(getComputedStyle(el).fontSize)));
    expect(groesse[0]).toBeGreaterThan(groesse[1]);
    expect(groesse[1]).toBe(groesse[2]);
  });

  test('statt Karussell: keine Blätter-Knöpfe auf /', async ({ page }) => {
    await page.goto('/');
    await expect(zitate(page)).toHaveCount(3);
    await expect(page.getByRole('button', { name: 'Nächste Rezensionen', exact: true })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Vorherige Rezensionen', exact: true })).toHaveCount(0);
  });
});

test.describe('Blog-Übersicht (/blog)', () => {
  const suche = (page) => page.getByRole('textbox', { name: /Ratgeber durchsuchen|Artikel suchen/ });
  const karten = (page) => page.locator('h3 a[href^="/blog/"]');
  const alleKnopf = (page) => page.getByRole('button', { name: /^Alle (Themen|Artikel)$/ });

  test('Suche filtert Artikel; ohne Treffer klare Meldung; „Filter zurücksetzen“ stellt alles wieder her', async ({ page }) => {
    await page.goto('/blog');
    await expect(karten(page).first()).toBeVisible();
    const gesamt = await karten(page).count();
    await suche(page).fill('Feinsteinzeug');
    await expect(page.locator('h3 a[href="/blog/feinsteinzeug-oder-naturstein-vergleich"]')).toBeVisible();
    await expect.poll(() => karten(page).count()).toBeLessThan(gesamt);
    await suche(page).fill('xqzwjkpv');
    await expect(page.getByText('Keine Artikel zur Suchanfrage gefunden.')).toBeVisible();
    await expect(karten(page)).toHaveCount(0);
    await page.getByRole('button', { name: 'Filter zurücksetzen', exact: true }).click();
    await expect(suche(page)).toHaveValue('');
    await expect.poll(() => karten(page).count()).toBe(gesamt);
  });

  test('Kategorie-Filter zeigt nur Artikel dieser Kategorie; „Alle“ setzt zurück', async ({ page }) => {
    await page.goto('/blog');
    await expect(karten(page).first()).toBeVisible();
    const gesamt = await karten(page).count();
    const kategorie = page.getByRole('button', { name: 'Pflege & Werterhalt', exact: true });
    await kategorie.click();
    await expect(kategorie).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator(`h3 a[href="${ARTIKEL}"]`)).toBeVisible();
    await expect.poll(() => karten(page).count()).toBeLessThan(gesamt);
    await alleKnopf(page).click();
    await expect(kategorie).toHaveAttribute('aria-pressed', 'false');
    await expect.poll(() => karten(page).count()).toBe(gesamt);
  });
});

test.describe('Blog-Artikel (/blog/fliesen-reinigen-pflegen)', () => {
  test('Teilen-Menü: Ziele tragen Artikel-Adresse und Titel; „Schließen“ schließt', async ({ page }) => {
    await page.goto(ARTIKEL);
    const artikelUrl = page.url();
    const teilen = page.getByRole('button', { name: 'Teilen', exact: true });
    await expect(teilen).toHaveAttribute('aria-expanded', 'false');
    await teilen.click();
    await expect(teilen).toHaveAttribute('aria-expanded', 'true');

    const facebook = page.getByRole('link', { name: 'Facebook', exact: true });
    await expect(facebook).toBeVisible();
    expect(new URL(await facebook.getAttribute('href')).searchParams.get('u')).toBe(artikelUrl);

    const whatsapp = page.getByRole('link', { name: 'WhatsApp', exact: true });
    const waText = new URL(await whatsapp.getAttribute('href')).searchParams.get('text') ?? '';
    expect(waText).toContain('Fliesen richtig reinigen');
    expect(waText).toContain(artikelUrl);

    const mail = new URL(await page.getByRole('link', { name: 'E-Mail', exact: true }).getAttribute('href'));
    expect(mail.protocol).toBe('mailto:');
    expect(mail.searchParams.get('subject')).toContain('Fliesen richtig reinigen');
    expect(mail.searchParams.get('body')).toContain(artikelUrl);

    await page.getByRole('button', { name: 'Schließen', exact: true }).click();
    await expect(teilen).toHaveAttribute('aria-expanded', 'false');
    await expect(facebook).toHaveCount(0);
  });

  test('Inhaltsverzeichnis: Klick springt zur Überschrift', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Inhaltsverzeichnis ist mobil ausgeblendet (hidden lg:block)');
    await page.goto(ARTIKEL);
    const verzeichnis = page.getByRole('navigation', { name: 'Inhaltsverzeichnis', exact: true });
    const ziel = page.getByRole('heading', { name: 'Silikonfugen als Wartungsfugen im Blick behalten', exact: true });
    await expect(ziel).not.toBeInViewport();
    await verzeichnis.getByRole('link', { name: 'Silikonfugen als Wartungsfugen im Blick behalten', exact: true }).click();
    await expect(ziel).toBeInViewport();
  });
});
