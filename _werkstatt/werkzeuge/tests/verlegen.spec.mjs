// Ablauftest B-01 „Verlegen“ (KERN K-007, E-010, E-017), Paket E2-PRUEF-04. Prüft Zustandsfolge (data-zustand),
// Adresse, Fokus, Scroll, Sperre (inert), Ausnahmen, Zurück und Vor, reduzierte Bewegung und Layoutverschiebung.
// Keine Wartezeiten: Zustände protokolliert ein MutationObserver im Dokument, abgefragt wird nur der Zustand.
// Projekte mobil (390 px) und desktop (1440 px) aus playwright.config.mjs. Server: RELAUNCH_BASE (127.0.0.1:4320).
// Gegenprobe: VERLEGEN_GEGENPROBE=1 setzt in Fall (1) data-kein-verlegen am genutzten Link; Fall (1) muss dann scheitern.
import { test, expect, bedienbar } from './fixtures.mjs';
import { installSperre, setzeEinwilligung } from '../lib.mjs';

const START = '/bad';
const ZIEL = '/bad/badsanierung';
/** Ziele: Aufwärmen und Link für den Zurück-Fall (muss bei 400 px Scroll im Sichtfeld liegen). */
const ZIELE = ['/bad/badsanierung', '/bad/barrierefreies-bad', '/bad/fliesen', '/bad/bad-aus-einer-hand', '/bad/musterbaeder', '/bad/projekt-check', '/bad/badplaner'];
const VOLL = ['legen', 'bedeckt', 'ziehen', 'ruhe'];
const GEGENPROBE = process.env.VERLEGEN_GEGENPROBE === '1';

// Aufwärmen: Der Entwicklungsserver kompiliert beim ersten Aufruf; jede Zielseite einmal direkt aufrufen.
test.beforeAll(async ({ browser }) => {
  const base = process.env.RELAUNCH_BASE || 'http://127.0.0.1:4310';
  const ctx = await browser.newContext({ baseURL: base, locale: 'de-DE', timezoneId: 'Europe/Berlin' });
  await installSperre(ctx);
  await setzeEinwilligung(ctx, 'abgelehnt', base);
  const seite = await ctx.newPage();
  for (const p of [START, ...ZIELE]) await seite.goto(p, { waitUntil: 'load' });
  await ctx.close();
});

const pfad = (page) => page.evaluate(() => location.pathname + location.search);
const zustand = (page) => page.evaluate(() => document.querySelector('.verlegen')?.dataset.zustand ?? null);
const log = (page) => page.evaluate(() => window.__verlegen.log);
const laenge = (page) => page.evaluate(() => window.__verlegen.log.length);
const linkZu = (page, ziel) => page.locator(`#main-content a[href="${ziel}"]`).filter({ visible: true }).first();

/** Zustandsfolge ab Index `ab`, aufeinanderfolgende Doppelte zusammengefasst. */
function folge(l, ab) {
  const z = l.slice(ab).map((e) => e.z);
  return z.filter((x, i) => i === 0 || x !== z[i - 1]);
}
const ohneWarten = (f) => f.filter((z) => z !== 'warten');
/** Dauer von „legen“ bis zum letzten Eintrag (ruhe), in ms. */
function dauer(l, ab) {
  const e = l.slice(ab);
  return e[e.length - 1].t - e[0].t;
}
function median(a) {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Seite öffnen und bis zur Hydrierung warten: html.k-modul (Bewegungsmodul) und die Schicht als Client-Komponente. */
async function oeffne(page, ziel = START) {
  await page.goto(ziel);
  await expect(page.locator('html')).toHaveClass(/k-modul/);
  await bedienbar(page.locator('.verlegen'));
}

/** Protokoll je Schichtzustand: Zeit, Scroll, Adresse, Deckkraft der Blende, Fliesen, inert, Fokus, Klicks, Layoutverschiebung. */
async function beobachte(page) {
  await page.evaluate(() => {
    const schicht = document.querySelector('.verlegen');
    const blende = document.querySelector('.verlegen-blende');
    const inertStand = () => ({
      header: !!document.querySelector('body header')?.inert,
      main: !!document.getElementById('main-content')?.inert,
      footer: !!document.querySelector('body footer')?.inert,
      alle: document.querySelectorAll('[inert]').length,
    });
    const aufnahme = (z) => ({
      z,
      t: performance.now(),
      scroll: window.scrollY,
      pfad: location.pathname + location.search,
      blende: Number(getComputedStyle(blende).opacity),
      fliesen: document.querySelectorAll('.verlegen-fliese').length,
      animFliesen: document.getAnimations().filter((a) => a.effect?.target?.closest?.('.verlegen-fliese')).length,
      inert: inertStand(),
      fokusH1: !!document.activeElement?.matches?.('#main-content h1'),
    });
    const v = (window.__verlegen = { log: [], klicks: [], ls: [], ist: schicht.dataset.zustand });
    v.log.push(aufnahme(v.ist));
    new MutationObserver(() => {
      const neu = schicht.dataset.zustand;
      if (neu === v.ist) return;
      v.ist = neu;
      v.log.push(aufnahme(neu));
    }).observe(schicht, { attributes: true, attributeFilter: ['data-zustand'] });
    document.addEventListener(
      'click',
      (e) => {
        const a = e.target.closest?.('a');
        v.klicks.push({ href: a?.getAttribute('href') ?? null, schicht: !!e.target.closest?.('.verlegen'), verhindert: e.defaultPrevented });
      },
      true,
    );
    v.po = new PerformanceObserver((l) => {
      for (const e of l.getEntries()) v.ls.push({ t: e.startTime, wert: e.value, eingabe: e.hadRecentInput });
    });
    v.po.observe({ type: 'layout-shift', buffered: true });
  });
}

async function warteAufRuhe(page, ab) {
  await expect
    .poll(async () => {
      const l = await log(page);
      return l.length > ab && l[l.length - 1].z === 'ruhe';
    }, { timeout: 15_000 })
    .toBe(true);
}

/** Löst eine Navigation aus (Klick oder Zurück/Vor) und wartet auf Adresse, Zustandswechsel und ruhe. Gibt den Index zurück. */
async function wechsel(page, aktion, ziel) {
  const ab = await laenge(page);
  await aktion();
  await expect.poll(() => pfad(page)).toBe(ziel);
  await expect.poll(() => laenge(page), { timeout: 10_000 }).toBeGreaterThan(ab);
  await warteAufRuhe(page, ab);
  return ab;
}

/** Kein Wechsel: Der Klick kam an, Verlegen hat ihn nicht übernommen, Zustand bleibt ruhe, kein Eintrag im Protokoll. */
async function ohneWechsel(page, href, ab) {
  const k = (await page.evaluate(() => window.__verlegen.klicks)).at(-1);
  expect.soft(k.href, 'letzter Klick traf den Link').toBe(href);
  expect.soft(k.verhindert, 'Verlegen hat den Klick nicht übernommen').toBe(false);
  expect.soft(await laenge(page), 'kein Eintrag im Zustandsprotokoll').toBe(ab);
  expect.soft(await zustand(page)).toBe('ruhe');
}

/** Nächster interner Link im Inhalt, der bei 400 px Scroll vollständig im Sichtfeld liegt. */
async function linkImSichtfeld(page) {
  const treffer = await page.evaluate((kandidaten) => {
    const h = window.innerHeight;
    return (
      kandidaten.find((k) =>
        [...document.querySelectorAll(`#main-content a[href="${k}"]`)].some((el) => {
          const r = el.getBoundingClientRect();
          return el.getClientRects().length > 0 && r.top >= 0 && r.bottom <= h;
        }),
      ) ?? null
    );
  }, ZIELE);
  expect(treffer, 'interner Link im Sichtfeld bei 400 px').not.toBeNull();
  return treffer;
}

test.describe('Bewegung an (Wechsel mit Fliesen)', () => {
  // Die Konfiguration setzt reducedMotion: reduce. Ohne Überschreibung gäbe es keine Fliesen und kein html.k-modul.
  // Die Option aus test.use wirkte im Lauf nicht zuverlässig (matchMedia meldete reduce nicht), daher zusätzlich
  // page.emulateMedia vor jeder Seite: die Bedingung steht im Test und nicht nur in der Konfiguration.
  test.use({ reducedMotion: 'no-preference' });
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  });

  test('(1) Klick auf internen Link: Zustandsfolge, Adresse, Fokus H1, Scroll 0, danach ruhe ohne inert', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    if (GEGENPROBE) await link.evaluate((el) => el.setAttribute('data-kein-verlegen', ''));
    const ab = await wechsel(page, () => link.click(), ZIEL);
    const l = await log(page);
    expect.soft(ohneWarten(folge(l, ab))).toEqual(VOLL);
    for (const e of l.slice(ab).filter((e) => e.z === 'legen' || e.z === 'bedeckt')) {
      expect.soft(e.inert, `inert während ${e.z}`).toMatchObject({ header: true, main: true, footer: true });
    }
    const ende = l[l.length - 1];
    expect.soft(ende.scroll, 'Scroll bei ruhe').toBe(0);
    // Sperre gelöst: header, main, footer wieder offen. Zusätzlich darf nichts inert geblieben sein: Die Zahl der
    // [inert]-Elemente entspricht dem Stand vor dem Klick (vor dem Klick sind die eingeklappten Akkordeon-Panels der
    // Navigation inert, das ist Ausgangsstand und kein Verlegen-Effekt).
    expect.soft(ende.inert, 'header, main, footer bei ruhe offen').toMatchObject({ header: false, main: false, footer: false });
    expect.soft(ende.inert.alle, 'keine zusätzlichen inert-Elemente nach dem Wechsel').toBe(l[0].inert.alle);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
  });

  test('(2) Zeit vom Klick bis ruhe: Mediane über fünf Vor- und fünf Zurück-Wechsel (nur Bericht)', async ({ page }, testInfo) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const vor = [];
    const zurueck = [];
    const folgen = [];
    for (let i = 0; i < 5; i++) {
      const ab = await wechsel(page, () => link.click(), ZIEL);
      let l = await log(page);
      folgen.push({ richtung: 'vor', folge: folge(l, ab) });
      vor.push(dauer(l, ab));
      const ab2 = await wechsel(page, () => page.goBack(), START);
      l = await log(page);
      folgen.push({ richtung: 'zurueck', folge: folge(l, ab2) });
      zurueck.push(dauer(l, ab2));
    }
    const r = (x) => Math.round(x);
    const bericht = {
      vorMs: vor.map(r),
      zurueckMs: zurueck.map(r),
      medianVorMs: r(median(vor)),
      medianZurueckMs: r(median(zurueck)),
      folgen: folgen.map((f) => `${f.richtung}: ${f.folge.join(' → ')}`),
    };
    await testInfo.attach('messung-verlegen.json', { body: JSON.stringify(bericht, null, 2), contentType: 'application/json' });
    for (const f of folgen) expect.soft(ohneWarten(f.folge), `Folge ${f.richtung}`).toEqual(VOLL);
  });

  test('(3) während legen: header, #main-content und footer inert, ein Klick auf die Mitte trifft die Schicht', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const ab = await laenge(page);
    // Der Belag startet nach dem nächsten gemalten Bild, nicht im Klick selbst (Reaktion, E-031): Gezählt werden die Bilder
    // (requestAnimationFrame) vom Klick bis „legen“; erlaubt sind höchstens drei (das Bild nach dem Klick, das Bild mit dem
    // Start und eines Spielraum für ein langes Bild auf belastetem Rechner). Millisekunden schwanken hier zu stark (67 bis 163 ms).
    await page.evaluate(() => {
      window.__bilderBisLegen = -1;
      document.addEventListener('click', () => {
        let bilder = 0;
        const zaehle = () => {
          if (document.querySelector('.verlegen').dataset.zustand === 'legen') { window.__bilderBisLegen = bilder; return; }
          bilder += 1;
          if (bilder < 60) requestAnimationFrame(zaehle);
        };
        requestAnimationFrame(zaehle);
      }, { capture: true, once: true });
    });
    await link.click();
    await page.waitForFunction(() => window.__bilderBisLegen >= 0, null, { timeout: 3000 });
    expect.soft(await page.evaluate(() => window.__bilderBisLegen), 'Bilder vom Klick bis legen').toBeLessThanOrEqual(3);
    const mitte = await page.evaluate(() => {
      const x = Math.round(window.innerWidth / 2);
      const y = Math.round(window.innerHeight / 2);
      const el = document.elementFromPoint(x, y);
      return {
        x,
        y,
        zustand: document.querySelector('.verlegen').dataset.zustand,
        header: !!document.querySelector('body header')?.inert,
        main: !!document.getElementById('main-content')?.inert,
        footer: !!document.querySelector('body footer')?.inert,
        trifft: !!el?.closest('.verlegen'),
      };
    });
    expect.soft(mitte.zustand, 'Zustand während des Legens').toBe('legen');
    expect.soft([mitte.header, mitte.main, mitte.footer], 'inert header, main, footer').toEqual([true, true, true]);
    expect.soft(mitte.trifft, 'Element in der Mitte gehört zur Schicht').toBe(true);
    await page.mouse.click(mitte.x, mitte.y);
    const k = (await page.evaluate(() => window.__verlegen.klicks)).at(-1);
    expect.soft(k.schicht, 'Klick auf die Mitte traf die Schicht').toBe(true);
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    await warteAufRuhe(page, ab);
    expect.soft(ohneWarten(folge(await log(page), ab))).toEqual(VOLL);
  });

  test('(4) Doppelklick: genau ein Wechsel, history.length + 1', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const hist = await page.evaluate(() => history.length);
    const ab = await laenge(page);
    await link.dblclick();
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    await warteAufRuhe(page, ab);
    const zuwachs = (await page.evaluate(() => history.length)) - hist;
    expect.soft(zuwachs, 'history.length-Zuwachs').toBe(1);
    expect.soft(ohneWarten(folge(await log(page), ab))).toEqual(VOLL);
  });

  test('(5) tel:-Link: kein Wechsel', async ({ page }) => {
    await oeffne(page);
    const link = page.locator('#main-content a[href^="tel:"]').filter({ visible: true }).first();
    await bedienbar(link);
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    await link.click();
    await ohneWechsel(page, href, ab);
    expect.soft(await pfad(page)).toBe(START);
  });

  test('(6) externer Link: kein Wechsel', async ({ page }) => {
    await oeffne(page);
    // Auf /bad tragen alle externen Links target="_blank" (Grund „target“). Damit der Grund „extern“ geprüft wird,
    // entfernt der Test dieses Attribut am Link (nur im Testlauf, nicht im Quelltext).
    const link = page.locator('#main-content a[href^="https://"]').filter({ visible: true }).first();
    await bedienbar(link);
    await link.evaluate((el) => el.removeAttribute('target'));
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    await link.click();
    await ohneWechsel(page, href, ab);
    expect.soft(await pfad(page)).toBe(START);
  });

  test('(7) Anker derselben Seite: kein Wechsel', async ({ page }) => {
    await oeffne(page);
    // Sprunglink #main-content: auf /bad das einzige Ankerziel, das auf beiden Projekten vorhanden ist (sichtbar erst im
    // Fokus). Der Cookie-Anker in der Fußzeile gibt es nur mobil (lg:hidden). Aktiviert per Tastatur (Enter), wie ein Nutzer.
    const link = page.locator('a[href="#main-content"]').first();
    await link.focus();
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    await page.keyboard.press('Enter');
    await ohneWechsel(page, href, ab);
    expect.soft(await pfad(page)).toBe(START);
  });

  test('(8) Strg-Klick: neuer Tab, kein Wechsel', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    const [neu] = await Promise.all([page.context().waitForEvent('page'), link.click({ modifiers: ['Control'] })]);
    await neu.close();
    await ohneWechsel(page, href, ab);
    expect.soft(await pfad(page)).toBe(START);
  });

  test('(9) data-kein-verlegen am Link: normale Navigation, kein Wechsel', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await link.evaluate((el) => el.setAttribute('data-kein-verlegen', ''));
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    await link.click();
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    const k = (await page.evaluate(() => window.__verlegen.klicks)).at(-1);
    expect.soft(k.href).toBe(href);
    expect.soft(k.verhindert, 'Verlegen hat den Klick nicht übernommen').toBe(false);
    expect.soft(await laenge(page), 'kein Eintrag im Zustandsprotokoll').toBe(ab);
    expect.soft(await zustand(page)).toBe('ruhe');
  });

  test('(10) Zurück nach einem Wechsel: Schicht verlässt ruhe, Adresse zurück, Scroll wie vor dem Klick', async ({ page }) => {
    await oeffne(page);
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThanOrEqual(398);
    const ziel = await linkImSichtfeld(page);
    const link = linkZu(page, ziel);
    await bedienbar(link);
    await beobachte(page);
    const ab = await wechsel(page, () => link.click(), ziel);
    const vor = (await log(page))[ab];
    expect.soft(Math.abs(vor.scroll - 400), 'Scroll vor dem Klick (400 px ± 2)').toBeLessThanOrEqual(2);
    expect.soft(ohneWarten(folge(await log(page), ab))).toEqual(VOLL);
    const ab2 = await wechsel(page, () => page.goBack(), START);
    const l = await log(page);
    expect.soft(ohneWarten(folge(l, ab2)), 'Folge Zurück').toEqual(VOLL);
    expect.soft(Math.abs(l[l.length - 1].scroll - vor.scroll), 'Scroll nach Zurück gegen Scroll vor dem Klick (± 2 px)').toBeLessThanOrEqual(2);
  });

  test('(11) Vor nach Zurück: Adresse wieder vorne, Zustandsfolge vollständig', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    await wechsel(page, () => link.click(), ZIEL);
    await wechsel(page, () => page.goBack(), START);
    const ab = await wechsel(page, () => page.goForward(), ZIEL);
    expect.soft(ohneWarten(folge(await log(page), ab))).toEqual(VOLL);
    expect.soft(await pfad(page)).toBe(ZIEL);
    expect.soft(await zustand(page)).toBe('ruhe');
  });

  test('(13) Layoutverschiebung: Summe ohne hadRecentInput zwischen Klick und ruhe = 0', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const ab = await wechsel(page, () => link.click(), ZIEL);
    const ls = await page.evaluate(() => [
      ...window.__verlegen.ls,
      ...window.__verlegen.po.takeRecords().map((e) => ({ t: e.startTime, wert: e.value, eingabe: e.hadRecentInput })),
    ]);
    const l = await log(page);
    const t0 = l[ab].t;
    const t1 = l[l.length - 1].t;
    const im = ls.filter((e) => e.t >= t0 && e.t <= t1);
    const summe = im.filter((e) => !e.eingabe).reduce((s, e) => s + e.wert, 0);
    console.log(`layout-shift zwischen Klick und ruhe: ${im.length} Einträge, ohne Eingabe Summe ${summe}`);
    expect.soft(summe, 'Summe ohne hadRecentInput').toBe(0);
  });
});

test.describe('Reduzierte Bewegung', () => {
  test.use({ reducedMotion: 'reduce' });
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('(12) reduzierte Bewegung: Wechsel vollständig, Überblendung über .verlegen-blende, keine Fliesen-Animation', async ({ page }) => {
    await page.goto(START);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    // Unter reduce setzt das Bewegungsmodul html.k-modul nicht (kein k-bewegung, also kein Modul).
    expect.soft(await page.evaluate(() => document.documentElement.classList.contains('k-bewegung')), 'kein k-bewegung').toBe(false);
    await beobachte(page);
    const ab = await wechsel(page, () => link.click(), ZIEL);
    const l = await log(page);
    expect.soft(ohneWarten(folge(l, ab)), 'Zustandsfolge').toEqual(VOLL);
    expect.soft(Math.max(...l.slice(ab).map((e) => e.blende)), 'Deckkraft der Blende während des Wechsels').toBeGreaterThan(0);
    expect.soft(Math.max(...l.map((e) => e.animFliesen)), 'laufende Animationen auf .verlegen-fliese').toBe(0);
    expect.soft(l[l.length - 1].scroll, 'Scroll bei ruhe').toBe(0);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
  });
});
