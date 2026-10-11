// Funktionstests F-13 (Navigation), F-14 (FAQ), F-16 (Blog-Werkzeuge), F-17 (404), F-18 (Login), F-19 (Bewertungs-Karussell).
// Prüft Verhalten (Zustand, Ziel, Status, Fehlermeldung, Fokus), nicht Aussehen. Keine Wartezeiten, nur Zustandsabfragen.
// Kein Test gegen die echte Route nötig: keines dieser Elemente sendet an /api/anfrage (Login wird clientseitig abgewiesen).
import { test, expect, bedienbar } from './fixtures.mjs';

const ARTIKEL = '/blog/fliesen-reinigen-pflegen';

// Hauptnavigation des Desktops (exakt benannt – die Mobilnavigation heißt „Hauptnavigation Kategorien“).
const hauptnav = (page) => page.getByRole('navigation', { name: 'Hauptnavigation', exact: true });
// Mobil-Drawer (Dialog); im geschlossenen Zustand per aria-hidden nicht im Accessibility-Baum.
const drawer = (page) => page.getByRole('dialog', { name: 'Hauptnavigation' });
const menueSchalter = (page) => page.getByRole('button', { name: /^Architektur-Menü (öffnen|schließen)$/ });
// Ein Klick vor der Hydrierung bleibt wirkungslos (Ausgangsstand, siehe PLAN V-06). Verhalten prüfen: Öffnen gelingt.
async function oeffneMenue(page) {
  const schalter = menueSchalter(page);
  await expect(async () => {
    if ((await schalter.getAttribute('aria-expanded')) !== 'true') await schalter.click();
    await expect(schalter).toHaveAttribute('aria-expanded', 'true', { timeout: 1500 });
  }).toPass({ timeout: 15_000 });
}

test.describe('Mega-Menü (Desktop, ab lg)', () => {
  test.skip(({ isMobile }) => isMobile, 'Mega-Menü ist mobil ausgeblendet (hidden lg:flex)');

  test('Hover öffnet das Untermenü, Escape schließt es', async ({ page }) => {
    await page.goto('/');
    const nav = hauptnav(page);
    const schalter = nav.getByRole('button', { name: /^Untermenü Badsanierung (öffnen|schließen)$/ });
    const punkt = nav.getByRole('link', { name: /^Badsanierung komplett/ });
    // Blockierfall: ohne Auslöser bleibt das Menü zu.
    await expect(schalter).toHaveAttribute('aria-expanded', 'false');
    await expect(punkt).toHaveCount(0);
    await nav.getByRole('link', { name: 'Badsanierung', exact: true }).hover();
    await expect(schalter).toHaveAttribute('aria-expanded', 'true');
    await expect(punkt).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(schalter).toHaveAttribute('aria-expanded', 'false');
    await expect(punkt).toHaveCount(0);
  });

  test('Tastatur: Schalter per Enter öffnen, Escape schließt, Fokus bleibt am Schalter', async ({ page }) => {
    await page.goto('/');
    const nav = hauptnav(page);
    const schalter = nav.getByRole('button', { name: /^Untermenü Badsanierung (öffnen|schließen)$/ });
    await schalter.focus();
    await page.keyboard.press('Enter');
    await expect(schalter).toHaveAttribute('aria-expanded', 'true');
    await expect(nav.getByRole('link', { name: /^Badsanierung komplett/ })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(schalter).toHaveAttribute('aria-expanded', 'false');
    await expect(schalter).toBeFocused();
  });

  test('Klick auf einen Untermenü-Punkt führt zum Ziel und schließt das Menü', async ({ page }) => {
    await page.goto('/');
    const nav = hauptnav(page);
    await (await bedienbar(nav.getByRole('link', { name: 'Badsanierung', exact: true }))).hover();
    await nav.getByRole('link', { name: /^Badsanierung komplett/ }).click();
    await expect(page).toHaveURL(/\/bad\/badsanierung$/);
    await expect(nav.getByRole('button', { name: /^Untermenü Badsanierung (öffnen|schließen)$/ })).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Mobilmenü (Drawer)', () => {
  // Ab xl steht die Hauptnavigation offen und der Schalter ist ausgeblendet (Fusion E-020: kein doppelter Zugang).
  // Im Desktop-Projekt wird der Drawer deshalb bei 1024 px geprüft (unter xl, Schalter sichtbar) – gleiche Schritte,
  // gleiche Erwartungen, gleiche Strenge; mobil unverändert bei 390 px.
  test.beforeEach(async ({ page, isMobile }) => {
    if (!isMobile) await page.setViewportSize({ width: 1024, height: 900 });
  });

  test('mobil: Desktop-Navigation ist ausgeblendet, der Drawer ist der Zugang', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'nur im Projekt mobil');
    await page.goto('/');
    await expect(hauptnav(page)).toBeHidden();
    await expect(menueSchalter(page)).toBeVisible();
  });

  test('Schalter öffnet den Drawer, Escape schließt ihn', async ({ page }) => {
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

  test('Kategorie aufklappen, Link folgen: Ziel wird geöffnet, Drawer schließt', async ({ page }) => {
    await page.goto('/');
    await oeffneMenue(page);
    const dialog = drawer(page);
    await expect(dialog).toBeVisible();
    // Zustand statt Wartezeit: Einblend-Übergang des Drawers abschließen lassen, dann aufklappen
    await dialog.evaluate((el) => Promise.all(el.getAnimations({ subtree: true }).map((a) => a.finished.catch(() => null))));
    const kategorie = dialog.getByRole('button', { name: /^Badsanierung/ });
    // Der Drawer wird beim ersten Öffnen nachgeladen und kann einmal neu einhängen (Zustand zurückgesetzt).
    // Verhalten „Kategorie lässt sich aufklappen“ prüfen: Klick wiederholen, bis aufgeklappt (max. 10 s).
    await expect(async () => {
      if ((await kategorie.getAttribute('aria-expanded')) !== 'true') await kategorie.click();
      await expect(kategorie).toHaveAttribute('aria-expanded', 'true', { timeout: 1500 });
    }).toPass({ timeout: 10_000 });
    await dialog.getByRole('link', { name: /^Badsanierung komplett/ }).click();
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

  test('Startseite: Akkordeon-Frage wechselt aria-expanded und blendet die Antwort ein/aus', async ({ page }) => {
    const frageStart = 'Wie garantieren Sie den Staubschutz bei bewohnten Sanierungen?';
    await page.goto('/');
    const knopf = page.getByRole('button', { name: frageStart });
    const bereich = page.getByRole('region', { name: frageStart });
    await expect(knopf).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(() => bereich.evaluate((el) => el.getBoundingClientRect().height)).toBe(0);
    await knopf.click();
    await expect(knopf).toHaveAttribute('aria-expanded', 'true');
    await expect.poll(() => bereich.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThan(0);
    await knopf.click();
    await expect(knopf).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(() => bereich.evaluate((el) => el.getBoundingClientRect().height)).toBe(0);
  });
});

test.describe('404', () => {
  test('unbekannte Adresse liefert Status 404 mit Hinweis und Wegen zurück', async ({ page }) => {
    const antwort = await page.goto('/gibt-es-nicht');
    expect(antwort.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Seite nicht gefunden' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Zur Startseite', exact: true })).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: 'Zur Leistungsübersicht', exact: true })).toHaveAttribute('href', '/leistungen');
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

test.describe('Bewertungs-Karussell (/)', () => {
  const weiter = (page) => page.getByRole('button', { name: 'Nächste Rezensionen', exact: true });
  const zurueck = (page) => page.getByRole('button', { name: 'Vorherige Rezensionen', exact: true });
  // Spur mit den Karten: Geschwister des Steuerungsbereichs.
  const spur = (page) => weiter(page).locator('xpath=../../following-sibling::div[1]');

  test('am Anfang ist „Vorherige“ gesperrt, „Nächste“ frei', async ({ page }) => {
    await page.goto('/');
    await expect(zurueck(page)).toBeDisabled();
    await expect(weiter(page)).toBeEnabled();
    // Startposition: mobil rastet die Spur bei 4 px ein, nicht bei 0 px.
    await expect.poll(() => spur(page).evaluate((el) => el.scrollLeft)).toBeLessThanOrEqual(10);
  });

  test('„Nächste“ blättert vor, „Vorherige“ führt zurück und sperrt sich am Anfang', async ({ page }) => {
    await page.goto('/');
    const position = () => spur(page).evaluate((el) => el.scrollLeft);
    await weiter(page).click();
    await expect(zurueck(page)).toBeEnabled();
    const vorher = await position();
    await zurueck(page).click();
    await expect.poll(position).toBeLessThan(vorher);
    // Der Schritt (360 px) passt nicht genau auf die Kartenraster; bis zum Anfang zurückblättern.
    // Ein Klick auf einen inzwischen gesperrten Knopf wartet sonst bis zum Testlimit: kurz begrenzen und neu prüfen.
    await expect.poll(async () => {
      if (await zurueck(page).isEnabled()) await zurueck(page).click({ timeout: 1000 }).catch(() => {});
      return zurueck(page).isDisabled();
    }).toBe(true);
    await expect.poll(position).toBeLessThanOrEqual(10);
  });

  test('Tastatur: „Nächste“ mit Enter blättert vor', async ({ page }) => {
    await page.goto('/');
    await weiter(page).focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => spur(page).evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
    await expect(weiter(page)).toBeFocused();
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
