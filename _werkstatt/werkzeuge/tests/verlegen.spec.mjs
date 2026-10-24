// Ablauftest B-01 „Verlegen“ (KERN K-007, E-010, E-017, E-043, E-047), Paket E2-PRUEF-04. Prüft Zustandsfolge (data-zustand),
// Adresse, Fokus, Scroll, Sperre (inert), Ausnahmen, Zurück und Vor, reduzierte Bewegung und Layoutverschiebung, dazu den
// Ablauf Fliese für Fliese (E-043: von rechts belegen, in derselben Richtung einzeln abnehmen) und das Logo auf der Wand
// (E-047, Fall 23; reduziert in Fall 12).
// Keine Wartezeiten: Zustände protokolliert ein MutationObserver im Dokument, abgefragt wird nur der Zustand.
// Projekte mobil (390 px) und desktop (1440 px) aus playwright.config.mjs. Server: RELAUNCH_BASE (127.0.0.1:4320).
// Gegenprobe: VERLEGEN_GEGENPROBE=1 setzt in Fall (1) data-kein-verlegen am genutzten Link; Fall (1) muss dann scheitern.
import { test, expect, bedienbar } from './fixtures.mjs';
import { installSperre, setzeEinwilligung } from '../lib.mjs';

const START = '/bad';
const ZIEL = '/bad/badsanierung';
/** Ziele: Aufwärmen und Link für den Zurück-Fall (muss bei 400 px Scroll im Sichtfeld liegen). */
const ZIELE = ['/bad/badsanierung', '/bad/barrierefreies-bad', '/bad/fliesen', '/bad/bad-aus-einer-hand', '/bad/musterbaeder', '/bad/projekt-check', '/bad/badplaner'];
const VOLL = ['legen', 'bedeckt', 'abnehmen', 'ruhe'];
const GEGENPROBE = process.env.VERLEGEN_GEGENPROBE === '1';
/** Grenze für einen Folgewechsel (E-047: Gesamtdauer ab dem zweiten Wechsel 1800 ms statt 1400 ms): bisherige Grenze 3000 ms
 *  = 1400 ms + 1600 ms Puffer, also jetzt 1800 ms + 1600 ms. Der Puffer bleibt, die Grenze wächst nur um die längere Dauer. */
const GESAMT_FOLGE = 1800;
const PUFFER_FOLGE = 3000 - 1400;
const GRENZE_FOLGE = GESAMT_FOLGE + PUFFER_FOLGE;
/** Logo auf der Wand (E-047): steht nach einem Klick mindestens so lange deckend, geht beim Abnehmen in so vielen ms. */
const LOGO_STEHEN = 450;
const LOGO_WEG = 200;
/** Ein Bild Messspielraum (Abtastung je requestAnimationFrame). */
const BILD = 20;

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
    /** sichtbare Deckkraft des Logos (Bild mal Behälter), 0 ohne Bild */
    const logoDeckt = () => {
      const behaelter = document.querySelector('.verlegen-logo');
      const bild = behaelter?.querySelector('img');
      return bild ? Number(getComputedStyle(bild).opacity) * Number(getComputedStyle(behaelter).opacity) : 0;
    };
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
      animLinie: document.getAnimations().filter((a) => a.effect?.target?.classList?.contains('verlegen-laser')).length,
      logo: logoDeckt(),
      logoBewegt: document
        .getAnimations()
        .filter((a) => a.effect?.target?.classList?.contains('verlegen-logo-bild') && a.effect.getKeyframes().some((k) => k.transform && k.transform !== 'none')).length,
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

  test('(16) Fliese für Fliese (E-043): beim Legen liegen rechts schon Fliesen und links noch keine, Fliesen im Flug sind größer; beim Abnehmen fehlen rechts schon Fliesen und links liegen sie noch, Fliesen weichen kleiner zurück', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const ab = await laenge(page);
    // erster Augenblick der Phase, in dem mindestens drei Fliesen ganz liegen und drei ganz fehlen (je Bild abgefragt)
    const stand = (phase) =>
      page
        .waitForFunction(
          (phase) => {
            if (document.querySelector('.verlegen')?.dataset.zustand !== phase) return false;
            const fl = [...document.querySelectorAll('.verlegen-fliese')].map((el) => {
              const s = getComputedStyle(el);
              const m = new DOMMatrixReadOnly(s.transform === 'none' ? undefined : s.transform);
              return { x: Number.parseFloat(el.style.translate) || 0, deckt: Number(s.opacity), groesse: Math.hypot(m.a, m.b) };
            });
            const da = fl.filter((f) => f.deckt > 0.99);
            const weg = fl.filter((f) => f.deckt < 0.01);
            if (da.length < 3 || weg.length < 3) return false;
            const mitte = (a) => a.reduce((summe, f) => summe + f.x, 0) / a.length;
            const sichtbar = fl.filter((f) => f.deckt > 0.01);
            return {
              da: da.length,
              weg: weg.length,
              xDa: mitte(da),
              xWeg: mitte(weg),
              groesser: sichtbar.filter((f) => f.groesse > 1.01).length,
              kleiner: sichtbar.filter((f) => f.groesse < 0.99).length,
            };
          },
          phase,
          { polling: 'raf', timeout: 10_000 },
        )
        .then((h) => h.jsonValue());
    const klick = link.click();
    const legen = await stand('legen');
    const abnehmen = await stand('abnehmen');
    await klick;
    await warteAufRuhe(page, ab);
    expect.soft(legen.xDa, `beim Legen: gelegte Fliesen rechts der fehlenden (${JSON.stringify(legen)})`).toBeGreaterThan(legen.xWeg);
    expect.soft(legen.groesser, 'beim Legen: Fliesen im Flug größer als ihr Platz').toBeGreaterThan(0);
    expect.soft(abnehmen.xWeg, `beim Abnehmen: abgenommene Fliesen rechts der liegenden (${JSON.stringify(abnehmen)})`).toBeGreaterThan(abnehmen.xDa);
    expect.soft(abnehmen.kleiner, 'beim Abnehmen: Fliesen weichen kleiner zurück').toBeGreaterThan(0);
    expect.soft(await pfad(page)).toBe(ZIEL);
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

  test('(14) Zurück und Vor nach /: Einstieg im Endzustand (k-verlauf), Vorwärtswechsel nach / wieder mit Bewegung (E3-START-04)', async ({ page }) => {
    // Bewegungen des Einstiegs: Waage und Lote (sig-kreuzlinie), Flucht der H1 (sig-flucht); getAnimations zählt auch
    // beendete Animationen mit Füllung, „keine“ heißt also: nie gestartet (animation: none)
    const sig = () => page.evaluate(() => document.getAnimations().filter((a) => a.effect?.target?.closest?.('[data-motion="sig-kreuzlinie"], [data-motion="sig-flucht"]')).length);
    await oeffne(page, '/');
    await beobachte(page);
    expect.soft(await sig(), 'beim Laden laufen Waage, Lot und Flucht').toBeGreaterThan(0);
    const link = page.locator('#main-content a[href^="/bad/"]').filter({ visible: true }).first();
    await link.scrollIntoViewIfNeeded();
    const ziel = await link.getAttribute('href');
    await wechsel(page, () => link.click(), ziel);
    await expect(page.locator('html')).not.toHaveClass(/k-verlauf/);
    await wechsel(page, () => page.goBack(), '/');
    await expect(page.locator('html')).toHaveClass(/k-verlauf/);
    expect.soft(await sig(), 'nach Zurück stehen Waage, Lot und Flucht im Endzustand').toBe(0);
    await wechsel(page, () => page.goForward(), ziel);
    const logo = page.locator('header a[href="/"]').filter({ visible: true }).first();
    await wechsel(page, () => logo.click(), '/');
    await expect(page.locator('html')).not.toHaveClass(/k-verlauf/);
    expect.soft(await sig(), 'Vorwärtswechsel nach /: Bewegung wie beim Laden').toBeGreaterThan(0);
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
  /** H1 einer Adresse, direkt geladen (Vergleich: zeigt die Seite nach Zurück den Inhalt ihrer Adresse?). */
  async function h1Von(browser, pfadUndSuche) {
    const ctx = await browser.newContext({ baseURL: process.env.RELAUNCH_BASE || 'http://127.0.0.1:4310', locale: 'de-DE' });
    await installSperre(ctx);
    const p = await ctx.newPage();
    await p.goto(pfadUndSuche);
    const text = (await p.locator('#main-content h1').first().textContent())?.trim() ?? '';
    await ctx.close();
    return text;
  }

  /**
   * Zweiter Wechsel nach ZIEL: Klick auf einen weiteren internen Link, Zurück im Browser im selben Bild, in dem die Schicht
   * einen der `zustaende` erreicht (mit `eingehaengt`: erst wenn die neue Seite unter dem Boden steht, Adresse = Ziel).
   * Danach: Adresse und Inhalt passen, Zurück hat gewirkt (Ziel oder Start, je nachdem, ob die neue Seite schon im Verlauf
   * stand), kein Abbruch, Wechsel vor Ablauf der 3 s fertig, Scroll wie beim Verlassen, Fokus auf der H1 (Prüfung E-043).
   */
  async function zurueckIn(page, browser, zustaende, eingehaengt = false) {
    await oeffne(page);
    await beobachte(page);
    const ab0 = await wechsel(page, () => linkZu(page, ZIEL).click(), ZIEL);
    const scrollStart = (await log(page))[ab0 + 1]?.scroll ?? 0;
    const weiter = await page.evaluate((ziele) => {
      const hier = location.pathname;
      return ziele.find((z) => z !== hier && [...document.querySelectorAll(`#main-content a[href="${z}"]`)].some((el) => el.getClientRects().length > 0)) ?? null;
    }, ['/bad/barrierefreies-bad', '/bad/fliesen', '/bad/bad-aus-einer-hand', '/bad/musterbaeder', '/kontakt', '/bad']);
    expect(weiter, 'weiterer interner Link auf der Zielseite').not.toBeNull();
    await page.locator(`#main-content a[href="${weiter}"]`).filter({ visible: true }).first().scrollIntoViewIfNeeded();
    const scrollZiel = await page.evaluate(() => window.scrollY);
    const ab = await laenge(page);
    // Klick und Zurück im Browser selbst: Erkennen und history.back() im selben Bild, ohne Rundreise
    const vor = await page.evaluate(
      ([href, z, e]) =>
        new Promise((fertig) => {
          [...document.querySelectorAll(`#main-content a[href="${href}"]`)].find((el) => el.getClientRects().length > 0).click();
          const t0 = performance.now();
          const bild = () => {
            const zustand = document.querySelector('.verlegen')?.dataset.zustand;
            if (z.includes(zustand) && (!e || location.pathname === href)) {
              const info = { zustand, pfad: location.pathname, t: performance.now() };
              history.back();
              fertig(info);
            } else if (performance.now() - t0 > 8000) fertig(null);
            else requestAnimationFrame(bild);
          };
          bild();
        }),
      [weiter, zustaende, eingehaengt],
    );
    expect(vor, `Zustand ${zustaende.join('/')} erreicht`).not.toBeNull();
    await warteAufRuhe(page, ab);
    await page.waitForTimeout(300);
    const l = (await log(page)).slice(ab);
    const fall = `Zurück in ${vor.zustand} (Adresse beim Zurück ${vor.pfad})`;
    expect.soft(l.map((e) => e.z), `${fall}: kein Abbruch`).not.toContain('abbruch');
    expect.soft(l.map((e) => e.z), `${fall}: Fliesen abgenommen`).toContain('abnehmen');
    expect.soft(l[l.length - 1].t - vor.t, `${fall}: fertig vor ${GRENZE_FOLGE} ms (Folgewechsel ${GESAMT_FOLGE} ms + Puffer)`).toBeLessThan(GRENZE_FOLGE);
    const adresse = await pfad(page);
    const erwartet = vor.pfad === weiter ? ZIEL : START;
    expect.soft(adresse, `${fall}: Zurück wirkt`).toBe(erwartet);
    const h1 = (await page.locator('#main-content h1').first().textContent())?.trim() ?? '';
    expect.soft(h1, `${fall}: Inhalt passt zur Adresse ${adresse}`).toBe(await h1Von(browser, adresse));
    const sollScroll = erwartet === ZIEL ? scrollZiel : scrollStart;
    expect.soft(Math.abs((await page.evaluate(() => window.scrollY)) - sollScroll), `${fall}: Scroll wie beim Verlassen (${sollScroll} ± 2)`).toBeLessThanOrEqual(2);
    await expect.soft(page.locator('#main-content h1'), `${fall}: Fokus auf der H1`).toBeFocused();
    expect.soft(await zustand(page)).toBe('ruhe');
    return { ...vor, adresse, weiter };
  }

  test('(17) Zurück im Browser, während der Boden liegt und die neue Seite geladen wird (bedeckt, warten), vor und nach dem Einhängen der neuen Seite (Prüfung E-043)', async ({ page, browser }) => {
    await zurueckIn(page, browser, ['bedeckt', 'warten']);
    await zurueckIn(page, browser, ['bedeckt', 'warten'], true);
  });

  test('(18) Zurück im Browser, während der Boden gelegt wird: Zurück wirkt, Vor führt wieder auf die verlassene Seite (Prüfung E-043)', async ({ page, browser }) => {
    const { adresse } = await zurueckIn(page, browser, ['legen']);
    expect.soft(adresse, 'Zurück aus der Zielseite führt auf die Startseite des Falls').toBe(START);
    const ab = await laenge(page);
    await page.evaluate(() => history.forward());
    await expect.poll(() => pfad(page), { timeout: 10_000 }).toBe(ZIEL);
    await warteAufRuhe(page, ab);
    const h1 = (await page.locator('#main-content h1').first().textContent())?.trim() ?? '';
    expect.soft(h1, 'Vor zeigt die verlassene Seite').toBe(await h1Von(browser, ZIEL));
  });

  test('(20) Zurück im Browser, während die Fliesen abgenommen werden: Adresse, Inhalt, Scroll und Fokus (Prüfung E-043)', async ({ page, browser }) => {
    const { adresse } = await zurueckIn(page, browser, ['abnehmen']);
    expect.soft(adresse).toBe(ZIEL);
  });

  test('(21) Abbruch, dann derselbe Link noch einmal; die erste Seite kommt während des Legens an: kein zweiter Abbruch, der Boden geht ab (Prüfung E-043)', async ({ page }) => {
    let freigabe;
    const tor = new Promise((r) => (freigabe = r));
    await page.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname.replace(/\/+$/, '') === ZIEL && url.searchParams.has('_rsc')) await tor;
      await route.continue().catch(() => undefined);
    });
    await oeffne(page);
    await beobachte(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    const ab = await laenge(page);
    await link.click();
    await expect.poll(async () => (await log(page)).slice(ab).map((e) => e.z).join(' '), { timeout: 15_000 }).toContain('abbruch');
    await warteAufRuhe(page, ab);
    expect.soft(await pfad(page), 'nach dem Abbruch noch auf der Startseite').toBe(START);
    const ab2 = await laenge(page);
    await link.click();
    await page.waitForFunction(() => document.querySelector('.verlegen')?.dataset.zustand === 'legen', null, { polling: 'raf', timeout: 5000 });
    freigabe();
    await warteAufRuhe(page, ab2);
    const l = (await log(page)).slice(ab2);
    expect.soft(l.map((e) => e.z), 'zweiter Wechsel ohne Abbruch').not.toContain('abbruch');
    expect.soft(l.map((e) => e.z), 'Fliesen abgenommen').toContain('abnehmen');
    expect.soft(l[l.length - 1].t - l[0].t, `zweiter Wechsel vor ${GRENZE_FOLGE} ms fertig (Folgewechsel ${GESAMT_FOLGE} ms + Puffer)`).toBeLessThan(GRENZE_FOLGE);
    expect.soft(await pfad(page)).toBe(ZIEL);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
  });

  test('(22) Anker derselben Seite, dann Wechsel, dann Zurück: Adresse und Inhalt der Seite mit dem Anker (Prüfung E-043)', async ({ page, browser }) => {
    await oeffne(page, '/');
    await beobachte(page);
    const anker = page.locator('#main-content a[href^="#"]').filter({ visible: true }).first();
    const ziel = await anker.getAttribute('href');
    await anker.click();
    await expect.poll(() => page.evaluate(() => location.hash)).toBe(ziel);
    // nächster sichtbarer interner Link einer anderen Seite (Scrollen legt keinen Verlaufseintrag an)
    const weiter = await page.evaluate(() =>
      [...document.querySelectorAll('#main-content a[href^="/"]')]
        .find((el) => el.getClientRects().length > 0 && !/^\/(#|$)/.test(el.getAttribute('href')))
        ?.getAttribute('href') ?? null,
    );
    expect(weiter, 'interner Link einer anderen Seite').not.toBeNull();
    await page.locator(`#main-content a[href="${weiter}"]`).filter({ visible: true }).first().scrollIntoViewIfNeeded();
    await wechsel(page, () => page.locator(`#main-content a[href="${weiter}"]`).filter({ visible: true }).first().click(), weiter);
    const ab = await laenge(page);
    await page.evaluate(() => history.back());
    await expect.poll(() => pfad(page), { timeout: 10_000 }).toBe('/');
    await warteAufRuhe(page, ab);
    await page.waitForTimeout(300);
    const h1 = (await page.locator('#main-content h1').first().textContent())?.trim() ?? '';
    expect.soft(h1, 'Inhalt der Startseite unter der Adresse /' + ziel).toBe(await h1Von(browser, '/'));
  });

  test('(23) Logo auf der Wand (E-047): erst wenn der Boden liegt, mittig, geladen, unverzerrt, klatscht von größer auf, steht in bedeckt mindestens 450 ms deckend und geht mit dem Abnehmen; vor dem ersten Wechsel kein Bild in der Schicht', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    expect.soft(await page.locator('.verlegen img').count(), 'vor dem ersten Wechsel kein Bild in der Schicht (kein LCP-Kandidat)').toBe(0);
    await beobachte(page);
    const ab = await laenge(page);
    // je Bild ab dem Verlassen von ruhe bis zurück in ruhe: Zustand, Deckkraft und Größe des Logos, Lage des Bilds
    await page.evaluate(() => {
      const v = (window.__logo = []);
      const schicht = document.querySelector('.verlegen');
      const behaelter = document.querySelector('.verlegen-logo');
      const bild1 = () => {
        const z = schicht.dataset.zustand;
        if (z !== 'ruhe' || v.length) {
          const bild = behaelter.querySelector('img');
          const s = bild ? getComputedStyle(bild) : null;
          const m = s && s.transform !== 'none' ? new DOMMatrixReadOnly(s.transform) : null;
          const r = bild?.getBoundingClientRect();
          v.push({
            t: performance.now(),
            z,
            deckt: bild ? Number(s.opacity) * Number(getComputedStyle(behaelter).opacity) : 0,
            groesse: m ? Math.hypot(m.a, m.b) : 1,
            geladen: !!bild && bild.complete && bild.naturalWidth > 0,
            natur: bild ? [bild.naturalWidth, bild.naturalHeight] : null,
            box: r ? { x: r.left, y: r.top, b: r.width, h: r.height } : null,
            ansicht: [window.innerWidth, window.innerHeight],
          });
        }
        if (!(v.length > 1 && z === 'ruhe')) requestAnimationFrame(bild1);
      };
      requestAnimationFrame(bild1);
    });
    await link.click();
    await warteAufRuhe(page, ab);
    await expect.poll(() => page.evaluate(() => window.__logo.at(-1)?.z)).toBe('ruhe');
    const b = await page.evaluate(() => window.__logo);
    const kurz = (e) => `${e.z} ${Math.round(e.t)} ${e.deckt.toFixed(2)} ${e.groesse.toFixed(3)}`;
    const protokoll = b.map(kurz).join(' | ');
    const legen = b.filter((e) => e.z === 'legen');
    expect.soft(Math.max(0, ...legen.map((e) => e.deckt)), 'beim Legen ist noch kein Logo zu sehen').toBeLessThan(0.01);
    const erstesBedeckt = b.find((e) => e.z === 'bedeckt');
    expect(erstesBedeckt, 'Zustand bedeckt erreicht').toBeTruthy();
    expect.soft(erstesBedeckt.geladen, 'Logo-Bild geladen, sobald der Boden liegt').toBe(true);
    // Aufklatschen: von größer und durchsichtig auf 1 und deckend
    expect.soft(b.some((e) => e.z === 'bedeckt' && e.deckt > 0.01 && e.groesse > 1.01), `Logo kommt größer an (${protokoll})`).toBe(true);
    const voll = b.filter((e) => (e.z === 'bedeckt' || e.z === 'warten') && e.deckt > 0.99 && Math.abs(e.groesse - 1) < 0.001);
    expect(voll.length, `Logo deckend in voller Größe (${protokoll})`).toBeGreaterThan(0);
    expect.soft(voll.some((e) => e.z === 'bedeckt'), 'Logo sichtbar in bedeckt').toBe(true);
    const f = voll[0];
    const [breite, hoehe] = f.ansicht;
    // für das Auge mittig: die Mitte des sichtbaren Inhalts der Datei (12 bis 587 von 640 px, LOGO_INHALT_MITTE in raster.ts)
    expect.soft(Math.abs(f.box.x + f.box.b * ((12 + 587) / 2 / 640) - breite / 2), 'waagrecht mittig für das Auge (± 1 px)').toBeLessThanOrEqual(1);
    expect.soft(Math.abs(f.box.y + f.box.h / 2 - hoehe / 2), 'senkrecht mittig (± 1 px)').toBeLessThanOrEqual(1);
    expect.soft(Math.abs(f.box.b / f.box.h - 3.2), `unverzerrt wie die Datei 640 × 200 (${f.box.b} × ${f.box.h})`).toBeLessThan(0.02);
    expect.soft(Number.isInteger(f.box.x) && Number.isInteger(f.box.y) && Number.isInteger(f.box.b), `ganze Pixel (${JSON.stringify(f.box)})`).toBe(true);
    expect.soft(f.natur, 'Bilddatei in 640 × 200 (nicht kleiner als angezeigt bei einfacher Pixeldichte)').toEqual([640, 200]);
    expect.soft(f.box.b, 'Logo nicht breiter als die Datei').toBeLessThanOrEqual(640);
    expect.soft(f.box.b, 'Logo groß genug (mobil 60 % der Breite, sonst 352 px)').toBeGreaterThanOrEqual(breite < 600 ? 0.6 * breite : 352);
    // Mindestzeit: vom ersten deckenden Bild bis zum ersten Bild, in dem es wieder schwächer wird
    const iVoll = b.indexOf(f);
    const weg = b.slice(iVoll).find((e) => e.deckt < 0.99);
    expect(weg, 'Logo geht wieder').toBeTruthy();
    expect.soft(weg.t - f.t, `Logo steht mindestens ${LOGO_STEHEN} ms deckend (${protokoll})`).toBeGreaterThanOrEqual(LOGO_STEHEN - BILD);
    expect.soft(weg.z, 'Logo geht erst mit dem Abnehmen').toBe('abnehmen');
    // geht mit den ersten abgenommenen Fliesen: spätestens 200 ms (und ein Bild) nach dem Beginn des Abnehmens ganz weg
    const abnehmen = b.find((e) => e.z === 'abnehmen');
    const fort = b.find((e) => e.z === 'abnehmen' && e.deckt < 0.01);
    expect(fort, 'Logo beim Abnehmen ganz weg').toBeTruthy();
    expect.soft(fort.t - abnehmen.t, `Logo weg ${LOGO_WEG} ms nach Beginn des Abnehmens (± 2 Bilder)`).toBeLessThanOrEqual(LOGO_WEG + 2 * BILD);
    expect.soft(b.at(-1).deckt, 'in ruhe kein Logo').toBe(0);
    expect.soft(await pfad(page)).toBe(ZIEL);
  });

  test('(19) Abbruch nach 3 s (Zielseite antwortet nicht): der Boden blendet aus statt in einem Bild zu verschwinden, danach erscheint die Seite', async ({ page }) => {
    // vor dem Laden: auch das Vorladen des Links im Sichtfeld wartet, die Navigation hängt also sicher länger als 3 s
    await page.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname.replace(/\/+$/, '') === ZIEL && url.searchParams.has('_rsc')) await new Promise((r) => setTimeout(r, 4500));
      await route.continue().catch(() => undefined);
    });
    await oeffne(page);
    await beobachte(page);
    const ab = await laenge(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    // je Bild: Zustand, deckende Fliesen und Deckkraft der Schicht, ab dem Abbruch
    await page.evaluate(() => {
      const v = (window.__abbruch = []);
      const schritt = () => {
        const s = document.querySelector('.verlegen');
        if (s.dataset.zustand === 'abbruch' || v.length) {
          v.push({
            z: s.dataset.zustand,
            schicht: Number(getComputedStyle(s).opacity),
            fliesen: [...document.querySelectorAll('.verlegen-fliese')].filter((el) => Number(getComputedStyle(el).opacity) > 0.99).length,
          });
        }
        if (v.length < 40) requestAnimationFrame(schritt);
      };
      requestAnimationFrame(schritt);
    });
    await link.click();
    await expect.poll(() => page.evaluate(() => window.__abbruch.length), { timeout: 15_000 }).toBeGreaterThanOrEqual(5);
    await warteAufRuhe(page, ab);
    const b = await page.evaluate(() => window.__abbruch);
    const imAbbruch = b.filter((e) => e.z === 'abbruch');
    expect.soft(imAbbruch.length, `Bilder im Abbruch (${JSON.stringify(b.slice(0, 12))})`).toBeGreaterThan(1);
    expect.soft(imAbbruch.some((e) => e.schicht > 0.05 && e.schicht < 0.95), 'Schicht blendet über Zwischenwerte aus').toBe(true);
    expect.soft(Math.min(...imAbbruch.map((e) => e.fliesen)), 'Fliesen liegen, solange die Schicht ausblendet').toBeGreaterThan(0);
    await expect.poll(() => pfad(page), { timeout: 10_000 }).toBe(ZIEL);
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
    expect.soft(Math.max(...l.map((e) => e.animLinie)), 'keine wandernde Wartelinie bei reduzierter Bewegung').toBe(0);
    // Logo (E-047): mit der Blende eingeblendet, ohne Aufklatschen (keine Animation mit transform), in ruhe wieder weg
    const bedeckt = l.slice(ab).find((e) => e.z === 'bedeckt');
    expect.soft(bedeckt?.logo, 'Logo deckend, sobald die Blende liegt').toBeGreaterThan(0.99);
    expect.soft(Math.max(...l.map((e) => e.logoBewegt)), 'Logo ohne Aufklatschen (keine transform-Animation)').toBe(0);
    expect.soft(l[l.length - 1].logo, 'in ruhe kein Logo').toBe(0);
    expect.soft(l[l.length - 1].scroll, 'Scroll bei ruhe').toBe(0);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
  });
});
