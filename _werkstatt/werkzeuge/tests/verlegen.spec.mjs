// Ablauftest B-01 „Wind“ (KERN K-007; E-042, Entscheidung des Auftraggebers; vorher „Verlegen“ mit ganz bedeckendem Boden,
// E-010, E-017). Ein Band aus Fliesen weht als View Transition über die Seite: alte Seite davor, neue dahinter. Geprüft:
// Zustandsfolge der Schicht (data-zustand: ruhe → warten → wehen → ruhe), Typ der View Transition (wind, wind-zurueck,
// wind-ruhig), die Animationen der Gruppen (Band wehen, neue Seite aufdecken), Adresse, Fokus, Scroll, Doppelklick,
// Ausnahmen, Zurück und Vor, reduzierte Bewegung, Browser ohne View Transitions und Layoutverschiebung.
// Keine Wartezeiten: Zustände protokolliert ein MutationObserver, View Transitions ein Init-Skript um startViewTransition.
// Projekte mobil (390 px) und desktop (1440 px) aus playwright.config.mjs. Server: RELAUNCH_BASE.
// Gegenprobe: VERLEGEN_GEGENPROBE=1 setzt in Fall (1) data-kein-verlegen am genutzten Link; Fall (1) muss dann scheitern.
import { test, expect, bedienbar } from './fixtures.mjs';
import { installSperre, setzeEinwilligung } from '../lib.mjs';

const START = '/bad';
const ZIEL = '/bad/badsanierung';
/** Ziele: Aufwärmen und Link für den Zurück-Fall (muss bei 400 px Scroll im Sichtfeld liegen). */
const ZIELE = ['/bad/badsanierung', '/bad/barrierefreies-bad', '/bad/fliesen', '/bad/bad-aus-einer-hand', '/bad/musterbaeder', '/bad/projekt-check', '/bad/badplaner'];
const VOLL = ['warten', 'wehen', 'ruhe'];
const GEGENPROBE = process.env.VERLEGEN_GEGENPROBE === '1';

// Aufwärmen: Der Entwicklungsserver kompiliert beim ersten Aufruf; jede Zielseite einmal direkt aufrufen.
test.beforeAll(async ({ browser }) => {
  const base = process.env.RELAUNCH_BASE || 'http://127.0.0.1:4310';
  const ctx = await browser.newContext({ baseURL: base, locale: 'de-DE', timezoneId: 'Europe/Berlin' });
  await installSperre(ctx);
  await setzeEinwilligung(ctx, 'abgelehnt', base);
  const seite = await ctx.newPage();
  for (const p of [START, ...ZIELE, '/']) await seite.goto(p, { waitUntil: 'load' });
  await ctx.close();
});

const pfad = (page) => page.evaluate(() => location.pathname + location.search);
const zustand = (page) => page.evaluate(() => document.querySelector('.verlegen')?.dataset.zustand ?? null);
const log = (page) => page.evaluate(() => window.__verlegen.log);
const laenge = (page) => page.evaluate(() => window.__verlegen.log.length);
const uebergaenge = (page) => page.evaluate(() => window.__vt);
const linkZu = (page, ziel) => page.locator(`#main-content a[href="${ziel}"]`).filter({ visible: true }).first();

/** Zustandsfolge ab Index `ab`, aufeinanderfolgende Doppelte zusammengefasst. */
function folge(l, ab) {
  const z = l.slice(ab).map((e) => e.z);
  return z.filter((x, i) => i === 0 || x !== z[i - 1]);
}
/** Dauer vom ersten Eintrag ab `ab` (Klick) bis zum letzten (ruhe), in ms. */
function dauer(l, ab) {
  const e = l.slice(ab);
  return e[e.length - 1].t - e[0].t;
}
function median(a) {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Vor jedem Laden: startViewTransition protokollieren (Typen; nach ready die Pseudo-Animationen mit Namen und Dauer). */
async function protokolliereUebergaenge(page, { ohne = false } = {}) {
  await page.addInitScript((ohne) => {
    window.__vt = [];
    if (ohne) {
      // Browser ohne View Transitions (Rückfall): die Methode fehlt
      delete Document.prototype.startViewTransition;
      return;
    }
    const ursprung = Document.prototype.startViewTransition;
    if (!ursprung) return;
    Document.prototype.startViewTransition = function (arg) {
      const typen = arg && typeof arg === 'object' && arg.types ? [...arg.types] : [];
      const vt = ursprung.call(this, arg);
      const eintrag = { t: performance.now(), typen, animationen: [], uebersprungen: false };
      window.__vt.push(eintrag);
      vt.ready
        .then(() => {
          eintrag.animationen = document.documentElement
            .getAnimations({ subtree: true })
            .filter((a) => a.effect?.pseudoElement)
            .map((a) => ({ pseudo: a.effect.pseudoElement, name: a.animationName ?? '', dauer: Number(a.effect.getTiming().duration) || 0 }));
        })
        .catch(() => {
          eintrag.uebersprungen = true;
        });
      return vt;
    };
  }, ohne);
}

/** Seite öffnen und bis zur Hydrierung warten (html.k-modul nur bei erlaubter Bewegung), Schicht als Client-Komponente. */
async function oeffne(page, ziel = START, { reduziert = false } = {}) {
  await page.goto(ziel);
  if (!reduziert) await expect(page.locator('html')).toHaveClass(/k-modul/);
  await bedienbar(page.locator('.verlegen'));
}

/** Protokoll je Schichtzustand: Zeit, Scroll, Adresse, Band (sichtbar, Name), Variablen des Winds, Fokus; Klicks; Verschiebungen. */
async function beobachte(page) {
  await page.evaluate(() => {
    const schicht = document.querySelector('.verlegen');
    const band = document.querySelector('.verlegen-band');
    const aufnahme = (z) => ({
      z,
      t: performance.now(),
      scroll: window.scrollY,
      pfad: location.pathname + location.search,
      bandSichtbar: getComputedStyle(band).display !== 'none',
      bandName: band.style.getPropertyValue('view-transition-name'),
      windDauer: document.documentElement.style.getPropertyValue('--wind-dauer'),
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
        v.klicks.push({ href: a?.getAttribute('href') ?? null, verhindert: e.defaultPrevented });
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

/** Kein Wechsel: Der Klick kam an, B-01 hat ihn nicht übernommen, Zustand bleibt ruhe, keine View Transition. */
async function ohneWechsel(page, href, ab, vtAb) {
  const k = (await page.evaluate(() => window.__verlegen.klicks)).at(-1);
  expect.soft(k.href, 'letzter Klick traf den Link').toBe(href);
  expect.soft(k.verhindert, 'B-01 hat den Klick nicht übernommen').toBe(false);
  expect.soft(await laenge(page), 'kein Eintrag im Zustandsprotokoll').toBe(ab);
  expect.soft(await zustand(page)).toBe('ruhe');
  expect.soft((await uebergaenge(page)).length, 'keine View Transition').toBe(vtAb);
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

/** Die Animationen eines Winds: Band (Gruppe wind) weht, neue Seite (new(root)) deckt auf, alte Seite steht. */
function pruefeWindAnimationen(eintrag, richtung) {
  const name = (pseudo) => eintrag.animationen.filter((a) => a.pseudo === pseudo).map((a) => a.name);
  expect.soft(name('::view-transition-group(wind)'), 'Band weht').toContain('wind-wehen');
  expect.soft(name('::view-transition-new(root)'), 'neue Seite deckt auf').toContain(richtung === 'vor' ? 'wind-aufdecken' : 'wind-aufdecken-zurueck');
  expect.soft(name('::view-transition-old(root)'), 'alte Seite steht (kein Überblenden)').toEqual([]);
  const band = eintrag.animationen.find((a) => a.pseudo === '::view-transition-group(wind)');
  expect.soft(band?.dauer ?? 0, 'Dauer des Winds aus den Tokens (1200, 900, Zurück 70 %)').toBeGreaterThanOrEqual(600);
}

test.describe('Bewegung an (Wind)', () => {
  // Die Konfiguration setzt reducedMotion: reduce. Ohne Überschreibung gäbe es keinen Wind und kein html.k-modul.
  test.use({ reducedMotion: 'no-preference' });
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await protokolliereUebergaenge(page);
  });

  test('(1) Klick auf internen Link: warten, wehen, ruhe; Typ wind; Band weht, neue Seite deckt auf; Adresse, Fokus H1, Scroll 0', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    if (GEGENPROBE) await link.evaluate((el) => el.setAttribute('data-kein-verlegen', ''));
    const vtAb = (await uebergaenge(page)).length;
    const ab = await wechsel(page, () => link.click(), ZIEL);
    const l = await log(page);
    expect.soft(folge(l, ab)).toEqual(VOLL);
    const wehen = l.slice(ab).find((e) => e.z === 'wehen');
    expect.soft(wehen?.bandSichtbar, 'Band sichtbar beim Wehen').toBe(true);
    expect.soft(wehen?.bandName, 'Band als eigene Gruppe').toBe('wind');
    const vt = (await uebergaenge(page)).slice(vtAb);
    expect.soft(vt.map((e) => e.typen), 'genau ein Wind').toEqual([['wind']]);
    if (vt[0]) pruefeWindAnimationen(vt[0], 'vor');
    const ende = l[l.length - 1];
    expect.soft(ende.scroll, 'Scroll bei ruhe').toBe(0);
    expect.soft(ende.bandSichtbar, 'Band nach dem Wind verborgen').toBe(false);
    expect.soft(ende.bandName, 'Band ohne Namen nach dem Wind').toBe('');
    expect.soft(ende.windDauer, 'Variablen des Winds aufgeräumt').toBe('');
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
  });

  test('(2) Zeit vom Klick bis ruhe: Mediane über fünf Vor- und fünf Zurück-Wechsel (nur Bericht)', async ({ page }, testInfo) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const vor = [];
    const zurueck = [];
    const bisWehen = [];
    const folgen = [];
    for (let i = 0; i < 5; i++) {
      const ab = await wechsel(page, () => link.click(), ZIEL);
      let l = await log(page);
      folgen.push({ richtung: 'vor', folge: folge(l, ab) });
      vor.push(dauer(l, ab));
      const w = l.slice(ab).find((e) => e.z === 'wehen');
      if (w) bisWehen.push(w.t - l[ab].t);
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
      medianKlickBisWehenMs: bisWehen.length ? r(median(bisWehen)) : null,
      folgen: folgen.map((f) => `${f.richtung}: ${f.folge.join(' → ')}`),
    };
    await testInfo.attach('messung-wind.json', { body: JSON.stringify(bericht, null, 2), contentType: 'application/json' });
    for (const f of folgen) expect.soft(f.folge, `Folge ${f.richtung}`).toEqual(VOLL);
  });

  test('(3) während des Winds fängt die Schicht der View Transition Klicks ab: ein Klick in die Mitte navigiert nicht', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const ab = await laenge(page);
    const hist = await page.evaluate(() => history.length);
    await link.click();
    await page.waitForFunction(() => document.querySelector('.verlegen').dataset.zustand === 'wehen', null, { timeout: 10_000, polling: 'raf' });
    const vp = page.viewportSize();
    await page.mouse.click(Math.round(vp.width / 2), Math.round(vp.height / 2));
    await warteAufRuhe(page, ab);
    expect.soft(await pfad(page), 'Adresse bleibt das Ziel des ersten Klicks').toBe(ZIEL);
    expect.soft((await page.evaluate(() => history.length)) - hist, 'genau ein neuer Verlaufseintrag').toBe(1);
    expect.soft(folge(await log(page), ab)).toEqual(VOLL);
  });

  test('(4) Doppelklick: genau ein Wechsel, ein Wind, history.length + 1', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const vtAb = (await uebergaenge(page)).length;
    const hist = await page.evaluate(() => history.length);
    const ab = await laenge(page);
    await link.dblclick();
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    await warteAufRuhe(page, ab);
    expect.soft((await page.evaluate(() => history.length)) - hist, 'history.length-Zuwachs').toBe(1);
    expect.soft((await uebergaenge(page)).slice(vtAb).length, 'ein Wind').toBe(1);
    expect.soft(folge(await log(page), ab)).toEqual(VOLL);
  });

  test('(5) tel:-Link: kein Wechsel', async ({ page }) => {
    await oeffne(page);
    const link = page.locator('#main-content a[href^="tel:"]').filter({ visible: true }).first();
    await bedienbar(link);
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    const vtAb = (await uebergaenge(page)).length;
    await link.click();
    await ohneWechsel(page, href, ab, vtAb);
    expect.soft(await pfad(page)).toBe(START);
  });

  test('(6) externer Link: kein Wechsel', async ({ page }) => {
    await oeffne(page);
    // Auf /bad tragen alle externen Links target="_blank" (Grund „target“). Damit der Grund „extern“ geprüft wird,
    // entfernt der Test dieses Attribut am Link (nur im Testlauf, nicht im Quelltext); die Sperre fängt die Anfrage ab.
    const link = page.locator('#main-content a[href^="https://"]').filter({ visible: true }).first();
    await bedienbar(link);
    await link.evaluate((el) => el.removeAttribute('target'));
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    const vtAb = (await uebergaenge(page)).length;
    await link.click();
    await ohneWechsel(page, href, ab, vtAb);
  });

  test('(7) Anker derselben Seite: kein Wechsel', async ({ page }) => {
    await oeffne(page);
    // Sprunglink #main-content (sichtbar erst im Fokus), aktiviert per Tastatur (Enter), wie ein Nutzer
    const link = page.locator('a[href="#main-content"]').first();
    await link.focus();
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    const vtAb = (await uebergaenge(page)).length;
    await page.keyboard.press('Enter');
    await ohneWechsel(page, href, ab, vtAb);
    expect.soft(await pfad(page)).toBe(START);
  });

  test('(8) Strg-Klick: neuer Tab, kein Wechsel', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    const vtAb = (await uebergaenge(page)).length;
    const [neu] = await Promise.all([page.context().waitForEvent('page'), link.click({ modifiers: ['Control'] })]);
    await neu.close();
    await ohneWechsel(page, href, ab, vtAb);
    expect.soft(await pfad(page)).toBe(START);
  });

  test('(9) data-kein-verlegen am Link: normale Navigation, kein Wind', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await link.evaluate((el) => el.setAttribute('data-kein-verlegen', ''));
    await beobachte(page);
    const href = await link.getAttribute('href');
    const ab = await laenge(page);
    const vtAb = (await uebergaenge(page)).length;
    await link.click();
    await expect.poll(() => pfad(page)).toBe(ZIEL);
    const k = (await page.evaluate(() => window.__verlegen.klicks)).at(-1);
    expect.soft(k.href).toBe(href);
    expect.soft(k.verhindert, 'B-01 hat den Klick nicht übernommen').toBe(false);
    expect.soft(await laenge(page), 'kein Eintrag im Zustandsprotokoll').toBe(ab);
    expect.soft((await uebergaenge(page)).slice(vtAb).filter((e) => e.typen.includes('wind')).length, 'kein Wind').toBe(0);
  });

  test('(10) Zurück nach einem Wechsel: Wind gespiegelt (wind-zurueck), Adresse zurück, Scroll wie vor dem Klick', async ({ page }) => {
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
    const vtAb = (await uebergaenge(page)).length;
    const ab2 = await wechsel(page, () => page.goBack(), START);
    const l = await log(page);
    expect.soft(folge(l, ab2), 'Folge Zurück').toEqual(VOLL);
    const vt = (await uebergaenge(page)).slice(vtAb);
    expect.soft(vt.map((e) => e.typen), 'ein Wind zurück').toEqual([['wind', 'wind-zurueck']]);
    if (vt[0]) pruefeWindAnimationen(vt[0], 'zurueck');
    expect.soft(Math.abs(l[l.length - 1].scroll - vor.scroll), 'Scroll nach Zurück gegen Scroll vor dem Klick (± 2 px)').toBeLessThanOrEqual(2);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
  });

  test('(11) Vor nach Zurück: Adresse wieder vorne, Zustandsfolge vollständig', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    await wechsel(page, () => link.click(), ZIEL);
    await wechsel(page, () => page.goBack(), START);
    const ab = await wechsel(page, () => page.goForward(), ZIEL);
    expect.soft(folge(await log(page), ab)).toEqual(VOLL);
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
});

test.describe('Ohne View Transitions im Browser', () => {
  test.use({ reducedMotion: 'no-preference' });
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await protokolliereUebergaenge(page, { ohne: true });
  });

  test('(15) Rückfall: Klick und Zurück wechseln normal, Fokus auf der H1, Scroll nach Zurück wie vor dem Klick', async ({ page }) => {
    await oeffne(page);
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
    const ziel = await linkImSichtfeld(page);
    const link = linkZu(page, ziel);
    await bedienbar(link);
    await beobachte(page);
    const vorScroll = await page.evaluate(() => window.scrollY);
    await link.click();
    await expect.poll(() => pfad(page)).toBe(ziel);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
    expect.soft(await zustand(page), 'Schicht bleibt in Ruhe').toBe('ruhe');
    await page.goBack();
    await expect.poll(() => pfad(page)).toBe(START);
    await expect.poll(() => page.evaluate(() => window.scrollY), { message: 'Scroll nach Zurück (± 2 px)' }).toBeGreaterThanOrEqual(vorScroll - 2);
    expect.soft(Math.abs((await page.evaluate(() => window.scrollY)) - vorScroll)).toBeLessThanOrEqual(2);
  });
});

test.describe('Reduzierte Bewegung', () => {
  test.use({ reducedMotion: 'reduce' });
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await protokolliereUebergaenge(page);
  });

  test('(12) reduzierte Bewegung: Überblendung (Typ wind-ruhig, 150 ms), kein Band, Fokus H1, Scroll 0', async ({ page }) => {
    await oeffne(page, START, { reduziert: true });
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    // Unter reduce setzt das Kopfskript kein k-bewegung (also auch kein Bewegungsmodul)
    expect.soft(await page.evaluate(() => document.documentElement.classList.contains('k-bewegung')), 'kein k-bewegung').toBe(false);
    await beobachte(page);
    const vtAb = (await uebergaenge(page)).length;
    const ab = await wechsel(page, () => link.click(), ZIEL);
    const l = await log(page);
    expect.soft(folge(l, ab), 'Zustandsfolge').toEqual(VOLL);
    expect.soft(l.slice(ab).some((e) => e.bandSichtbar), 'kein Band').toBe(false);
    const vt = (await uebergaenge(page)).slice(vtAb);
    expect.soft(vt.map((e) => e.typen), 'Überblendung').toEqual([['wind-ruhig']]);
    const gruppe = vt[0]?.animationen.find((a) => a.pseudo === '::view-transition-group(root)' || a.pseudo === '::view-transition-new(root)');
    expect.soft(gruppe?.dauer ?? 150, 'Dauer der Überblendung').toBeLessThanOrEqual(150);
    expect.soft(l[l.length - 1].scroll, 'Scroll bei ruhe').toBe(0);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
  });
});
