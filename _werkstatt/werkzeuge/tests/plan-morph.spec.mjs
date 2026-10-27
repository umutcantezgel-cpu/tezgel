// Ablauftest Plan-Morph (K-007 seitenwechsel, zurück nach E-037; Paket E2-ORCH-09): Auf /leistungen gleitet der Verlegeplan
// eines Fachgewerks beim Klick auf „Fachdetails“ als View Transition (Typ plan-vor) in den Einstieg der Leistungsseite;
// B-01 „Verlegen“ startet sie selbst statt der Fliesen. Unter lg, bei reduzierter Bewegung, beim Zurück und Vor übernimmt B-01, und
// eine laufende View Transition endet, sobald B-01 legt. Nur gegen den Produktionsbau sinnvoll (RELAUNCH_BASE, Vorladen):
// Im Entwicklungsserver ohne Vorladen kann der Morph ausbleiben.
// Protokoll: ein Init-Skript umhüllt document.startViewTransition (Typen, Pseudo-Animationen mit Dauer), ein MutationObserver
// schreibt die Zustände der Schicht .verlegen mit; keine festen Wartezeiten außer im Fall „Zurück während des Morphs“.
import { test, expect, bedienbar } from './fixtures.mjs';
import { installSperre, setzeEinwilligung } from '../lib.mjs';

const START = '/leistungen';
const ZIEL = '/leistungen/bad';
const LINK = `a[data-uebergang="plan-vor"][href="${ZIEL}"]`;

/** Vor jedem Laden: startViewTransition protokollieren (Typen, Zeit, nach ready die Pseudo-Animationen mit Dauer). */
async function protokolliereUebergaenge(page) {
  await page.addInitScript(() => {
    window.__vt = [];
    const ursprung = Document.prototype.startViewTransition;
    if (!ursprung) return;
    Document.prototype.startViewTransition = function (arg) {
      const typen = arg && typeof arg === 'object' && arg.types ? [...arg.types] : [];
      const vt = ursprung.call(this, arg);
      const eintrag = { t: performance.now(), typen, gruppen: [], uebersprungen: false };
      window.__vt.push(eintrag);
      vt.ready
        .then(() => {
          eintrag.gruppen = document.documentElement
            .getAnimations({ subtree: true })
            .map((a) => ({ pseudo: a.effect?.pseudoElement ?? null, dauer: Number(a.effect?.getTiming?.().duration) || 0 }))
            .filter((g) => g.pseudo);
        })
        .catch(() => {
          eintrag.uebersprungen = true;
        });
      return vt;
    };
  });
}

async function oeffne(page, ziel = START, { reduziert = false } = {}) {
  await page.goto(ziel);
  // bei reduzierter Bewegung setzt das Kopfskript keine Bewegungsklassen, dann gibt es auch kein k-modul
  if (!reduziert) await expect(page.locator('html')).toHaveClass(/k-modul/);
  await bedienbar(page.locator('.verlegen'));
  await page.evaluate(() => {
    const schicht = document.querySelector('.verlegen');
    const v = (window.__verlegen = { log: [{ z: schicht.dataset.zustand, t: performance.now() }], ist: schicht.dataset.zustand, ls: [] });
    new MutationObserver(() => {
      const neu = schicht.dataset.zustand;
      if (neu === v.ist) return;
      v.ist = neu;
      v.log.push({ z: neu, t: performance.now(), vtAnimationen: document.documentElement.getAnimations({ subtree: true }).filter((a) => String(a.effect?.pseudoElement ?? '').startsWith('::view-transition')).length });
    }).observe(schicht, { attributes: true, attributeFilter: ['data-zustand'] });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) v.ls.push({ wert: e.value, eingabe: e.hadRecentInput });
    }).observe({ type: 'layout-shift', buffered: false });
  });
}

const pfad = (page) => page.evaluate(() => location.pathname);
const zustaende = (page) => page.evaluate(() => window.__verlegen.log.map((e) => e.z));
const uebergaenge = (page) => page.evaluate(() => window.__vt);

async function linkInsBild(page) {
  const link = page.locator(LINK).first();
  await link.scrollIntoViewIfNeeded();
  // Zielseite vorladen, wie es next/link im Sichtfeld tut (der Morph braucht die Zielseite im selben Commit)
  await page.waitForTimeout(0);
  return link;
}

test.describe('Plan-Morph (E-037)', () => {
  // Die Konfiguration setzt reducedMotion: reduce; der Morph braucht Bewegung. Playwright 1.56 hat die Einstellung hier
  // nicht angewandt, ab 1.64 gilt sie (UM-E2-B, E-076): die Bedingung steht deshalb ausdrücklich im Test (wie verlegen.spec).
  // M6 schaltet reduzierte Bewegung selbst ein.
  test.use({ reducedMotion: 'no-preference' });
  test.beforeEach(async ({ context, baseURL }) => {
    await installSperre(context);
    await setzeEinwilligung(context, 'abgelehnt', baseURL);
  });

  test('M1 desktop: Klick auf Fachdetails gleitet als View Transition plan-vor, B-01 bleibt in Ruhe, danach Fokus auf der H1', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'nur ab lg');
    await protokolliereUebergaenge(page);
    await oeffne(page);
    const link = await linkInsBild(page);
    await expect.poll(() => page.evaluate((sel) => !!document.querySelector(sel), LINK)).toBe(true);
    await link.click();
    // während des Morphs: Kopf als eigene Gruppe benannt (steht still)
    const kopf = await page.evaluate(() => getComputedStyle(document.querySelector('header.kopf-anker')).viewTransitionName);
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    const vt = await uebergaenge(page);
    const morph = vt.find((e) => e.typen.includes('plan-vor'));
    expect(morph, 'eine View Transition mit Typ plan-vor').toBeTruthy();
    await expect.poll(async () => (await uebergaenge(page)).find((e) => e.typen.includes('plan-vor'))?.gruppen.length ?? 0).toBeGreaterThan(0);
    const gruppen = (await uebergaenge(page)).find((e) => e.typen.includes('plan-vor')).gruppen;
    const plan = gruppen.find((g) => g.pseudo === '::view-transition-group(plan-bad)');
    expect.soft(plan, 'Gruppe plan-bad').toBeTruthy();
    expect.soft(plan?.dauer, 'Plan gleitet dauer-4').toBe(800);
    expect.soft(kopf, 'Kopf als eigene Gruppe (steht still)').toBe('kopf');
    expect.soft(await zustaende(page), 'B-01 hat nicht gelegt').toEqual(['ruhe']);
    await expect.poll(() => page.evaluate(() => !!document.activeElement?.matches?.('#main-content h1')), { timeout: 5_000 }).toBe(true);
    const ls = await page.evaluate(() => window.__verlegen.ls.filter((e) => !e.eingabe).reduce((s, e) => s + e.wert, 0));
    expect.soft(ls, 'keine Layoutverschiebung').toBeLessThan(0.01);
  });

  test('M2 desktop: Zurück nach dem Morph läuft über B-01, ohne View Transition mit Typ', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'nur ab lg');
    await protokolliereUebergaenge(page);
    await oeffne(page);
    const link = await linkInsBild(page);
    await link.click();
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    await expect.poll(() => page.evaluate(() => document.documentElement.getAnimations({ subtree: true }).filter((a) => String(a.effect?.pseudoElement ?? '').startsWith('::view-transition')).length), { timeout: 5_000 }).toBe(0);
    await oeffneProtokollNeu(page);
    const vorher = (await uebergaenge(page)).length;
    await page.goBack();
    await expect.poll(() => pfad(page)).toBe(START);
    await expect.poll(async () => (await zustaende(page)).at(-1), { timeout: 10_000 }).toBe('ruhe');
    const z = await zustaende(page);
    expect.soft(z.length, 'B-01 lief beim Zurück').toBeGreaterThan(1);
    expect.soft((await uebergaenge(page)).slice(vorher).some((e) => e.typen.includes('plan-vor')), 'kein Rück-Morph').toBe(false);
  });

  test('M4 desktop: Zurück während des Morphs beendet die View Transition, sobald B-01 legt', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'nur ab lg');
    await protokolliereUebergaenge(page);
    await oeffne(page);
    const link = await linkInsBild(page);
    await link.click();
    // Zurück, sobald die neue Adresse steht, während der Plan noch gleitet (800 ms); früher gäbe es noch keinen Eintrag
    await expect.poll(() => pfad(page), { timeout: 5_000, intervals: [16] }).toBe(ZIEL);
    await page.goBack();
    await expect.poll(() => pfad(page), { timeout: 10_000 }).toBe(START);
    await expect.poll(async () => (await zustaende(page)).at(-1), { timeout: 10_000 }).toBe('ruhe');
    const log = await page.evaluate(() => window.__verlegen.log);
    const ab = log.findIndex((e) => e.z === 'legen' || e.z === 'bedeckt');
    if (ab > -1) expect.soft(log.slice(ab).every((e) => !e.vtAnimationen), 'keine View-Transition-Animationen, während B-01 liegt').toBe(true);
  });

  test('M9 desktop: Doppelklick auf Fachdetails ergibt genau einen Wechsel (ein neuer Verlaufseintrag)', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'nur ab lg');
    await protokolliereUebergaenge(page);
    await oeffne(page);
    const link = await linkInsBild(page);
    const vorher = await page.evaluate(() => history.length);
    await link.dblclick();
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    await expect.poll(() => page.evaluate(() => document.documentElement.getAnimations({ subtree: true }).filter((a) => String(a.effect?.pseudoElement ?? '').startsWith('::view-transition')).length), { timeout: 5_000 }).toBe(0);
    expect.soft(await page.evaluate(() => history.length), 'genau ein neuer Eintrag').toBe(vorher + 1);
    expect.soft((await uebergaenge(page)).filter((e) => e.typen.includes('plan-vor')).length, 'ein Morph').toBe(1);
    expect.soft(await zustaende(page), 'B-01 hat nicht gelegt').toEqual(['ruhe']);
  });

  test('M5 mobil: Fachdetails verlegt mit B-01, kein Morph', async ({ page }, info) => {
    test.skip(info.project.name !== 'mobil', 'nur unter lg');
    await protokolliereUebergaenge(page);
    await oeffne(page);
    const link = await linkInsBild(page);
    await link.click();
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    await expect.poll(async () => (await zustaende(page)).at(-1), { timeout: 10_000 }).toBe('ruhe');
    expect.soft(await zustaende(page)).toContain('legen');
    expect.soft((await uebergaenge(page)).some((e) => e.typen.includes('plan-vor')), 'kein Typ plan-vor').toBe(false);
  });

  test('M6 desktop, reduzierte Bewegung: B-01 überblendet, kein Morph', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'nur ab lg');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await protokolliereUebergaenge(page);
    await oeffne(page, START, { reduziert: true });
    const link = await linkInsBild(page);
    await link.click();
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    await expect.poll(async () => (await zustaende(page)).at(-1), { timeout: 10_000 }).toBe('ruhe');
    expect.soft((await uebergaenge(page)).some((e) => e.typen.includes('plan-vor')), 'kein Typ plan-vor').toBe(false);
  });
});

/** Zustandsprotokoll für den nächsten Schritt neu beginnen (nach einer Navigation hängt die Schicht weiter, das Fenster auch). */
async function oeffneProtokollNeu(page) {
  await page.evaluate(() => {
    const v = window.__verlegen;
    v.log = [{ z: document.querySelector('.verlegen').dataset.zustand, t: performance.now() }];
  });
}
