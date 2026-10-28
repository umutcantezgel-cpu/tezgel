// Funktionstest Bewegungsschalter (UM-E3-MOD, E-080): „Bewegung: an | ruhig“ im Fuß und im Menü. Prüft Zustand und Wirkung
// (Attribut und Startklasse am Dokument, Speicher je Gerät, Sperre bei reduzierter Bewegung), nicht Aussehen. Der Eingang
// ist wie bei jedem Prüflauf als Wiederkehr vermerkt (lib.mjs installSperre).
import { test, expect } from './fixtures.mjs';

const gruppe = (bereich) => bereich.getByRole('group', { name: 'Bewegung', exact: true });
const knopf = (bereich, name) => gruppe(bereich).getByRole('button', { name, exact: true });

test.describe('Bewegungsschalter ohne Wunsch nach reduzierter Bewegung', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('Fuß: „ruhig“ gilt sofort und nach dem Neuladen, „an“ stellt die Bewegung wieder her', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const fuss = page.locator('footer');
    await expect(knopf(fuss, 'an')).toHaveAttribute('aria-pressed', 'true');
    await expect(html).toHaveClass(/(^|\s)k-bewegung(\s|$)/);

    await knopf(fuss, 'ruhig').click();
    await expect(knopf(fuss, 'ruhig')).toHaveAttribute('aria-pressed', 'true');
    await expect(knopf(fuss, 'an')).toHaveAttribute('aria-pressed', 'false');
    await expect(html).toHaveAttribute('data-bewegung', 'ruhig');
    await expect(html).not.toHaveClass(/(^|\s)k-bewegung(\s|$)/);

    await page.reload();
    await expect(html).toHaveAttribute('data-bewegung', 'ruhig');
    await expect(html).not.toHaveClass(/(^|\s)k-bewegung(\s|$)/);
    await expect(knopf(fuss, 'ruhig')).toHaveAttribute('aria-pressed', 'true');

    await knopf(fuss, 'an').click();
    await expect(html).not.toHaveAttribute('data-bewegung');
    await expect(html).toHaveClass(/(^|\s)k-bewegung(\s|$)/);
    await expect(knopf(fuss, 'an')).toHaveAttribute('aria-pressed', 'true');
  });

  test('Menü: der Schalter steht im Menüblatt und gilt für die ganze Seite', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Das Menüblatt öffnet der Menü-Schalter im Kopf, der nur bis 80 rem Kopfbreite steht');
    await page.goto('/');
    await page.locator('header').getByRole('button', { name: 'Menü öffnen' }).click();
    const blatt = page.getByRole('dialog', { name: 'Hauptnavigation', exact: true });
    await expect(gruppe(blatt)).toBeVisible();
    await knopf(blatt, 'ruhig').click();
    await expect(page.locator('html')).toHaveAttribute('data-bewegung', 'ruhig');
    await expect(knopf(blatt, 'ruhig')).toHaveAttribute('aria-pressed', 'true');
  });
});

test.describe('Bewegungsschalter bei reduzierter Bewegung des Geräts', () => {
  test.use({ reducedMotion: 'reduce' });

  test('„ruhig“ steht fest, „an“ ist nicht wählbar und nennt den Grund', async ({ page }) => {
    await page.goto('/');
    const fuss = page.locator('footer');
    await expect(knopf(fuss, 'ruhig')).toHaveAttribute('aria-pressed', 'true');
    const an = knopf(fuss, 'an');
    await expect(an).toHaveAttribute('aria-disabled', 'true');
    await expect(an).toHaveAccessibleDescription('Ihr Gerät ist auf weniger Bewegung eingestellt.');
    await an.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).not.toHaveClass(/(^|\s)k-bewegung(\s|$)/);
    await expect(an).toHaveAttribute('aria-pressed', 'false');
  });
});
