// Ablauftest B-01 „Verlegen“ (KERN K-007, E-010, E-017, E-043, E-047), Paket E2-PRUEF-04. Prüft Zustandsfolge (data-zustand),
// Adresse, Fokus, Scroll, Sperre (inert), Ausnahmen, Zurück und Vor, reduzierte Bewegung und Layoutverschiebung, dazu den
// Ablauf Fliese für Fliese (E-043: von rechts belegen, in derselben Richtung einzeln abnehmen) und das Logo auf der Wand
// (E-047, Fall 23; reduziert in Fall 12). Gegenprüfung E3-B01: Bildlaufleiste sichtbar (23b), Logo bei Zurück und Vor (24),
// Fokus nach dem Abbruch (19b), Tastatur im Abnehmen (25), Drehen beim Legen (26), Anker auf einer anderen Seite (27).
// E3-B01-FIX-2: Abbruch aus dem Verlauf (19c), Seite kurz vor Ablauf (19d), Höhe wächst beim Legen wenig (28), Enter im
// Abnehmen und dann Zurück (29).
// Keine Wartezeiten: Zustände protokolliert ein MutationObserver im Dokument, abgefragt wird nur der Zustand.
// Projekte mobil (390 px) und desktop (1440 px) aus playwright.config.mjs. Server: RELAUNCH_BASE (127.0.0.1:4320).
// Gegenprobe: VERLEGEN_GEGENPROBE=1 setzt in Fall (1) data-kein-verlegen am genutzten Link; Fall (1) muss dann scheitern.
import { chromium } from '@playwright/test';
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

/** Nächster interner Link im Inhalt, der bei 400 px Scroll vollständig im Sichtfeld liegt. Liegt dort keiner (der Aufbau der
 *  Seite hat sich geändert), rückt der erste sichtbare Link aus ZIELE unterhalb von 400 px in die Mitte der Ansicht; die
 *  Scrollstellung bleibt damit über 400 px, die Wiederherstellung wird weiter geprüft. Liefert Link und Scrollstellung. */
async function linkImSichtfeld(page) {
  const imBild = () =>
    page.evaluate((kandidaten) => {
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
  let treffer = await imBild();
  if (!treffer) {
    const tiefer = await page.evaluate((kandidaten) => {
      for (const k of kandidaten) {
        const el = [...document.querySelectorAll(`#main-content a[href="${k}"]`)].find((a) => a.getClientRects().length > 0 && a.getBoundingClientRect().top > 0);
        if (el) {
          el.scrollIntoView({ block: 'center', behavior: 'instant' });
          return k;
        }
      }
      return null;
    }, ZIELE);
    if (tiefer) treffer = await imBild();
  }
  expect(treffer, 'interner Link im Sichtfeld bei 400 px oder darunter').not.toBeNull();
  return { ziel: treffer, scroll: await page.evaluate(() => window.scrollY) };
}

/** Nimmt je Bild ab dem Verlassen von ruhe bis zurück in ruhe auf: Zustand, Deckkraft und Größe des Logos, Lage des Bilds,
 *  Fläche der Schicht (die Ansicht ohne Bildlaufleiste, Gegenprüfung E3-B01, Befund 2) und Breite der Bildlaufleiste; dazu
 *  die Bildzeit (document.timeline.currentTime) und beim Abnehmen die Startzeiten der Animationen von Fliesen und Logo auf
 *  derselben Zeitachse (Messung unabhängig von der Verspätung der Abtastung, E3-B01-FIX-2). */
async function logoAufnahme(page) {
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
        const flaeche = schicht.getBoundingClientRect();
        // beim Abnehmen: Startzeit der Fliesen (die Leg-Animationen sind dann beendet) und Start und Ende des Ausblendens am
        // Behälter des Logos, sobald der Browser sie gestartet hat (vorher ist startTime null)
        const animationen = z === 'abnehmen' ? document.getAnimations().filter((a) => a.startTime !== null) : [];
        const fliese = animationen.find((a) => a.effect?.target?.classList?.contains('verlegen-fliese'));
        const logoWeg = animationen.find((a) => a.effect?.target === behaelter);
        // Ende des Aufklatschens (Animation mit transform am Bild), sobald sie gestartet ist
        const klatsch = bild?.getAnimations().find((a) => a.startTime !== null && a.effect.getKeyframes().some((k) => k.transform && k.transform !== 'none'));
        v.push({
          t: performance.now(),
          tl: Number(document.timeline.currentTime),
          klatschEnde: klatsch ? Number(klatsch.startTime) + Number(klatsch.effect.getComputedTiming().endTime) : null,
          fliesenStart: fliese ? Number(fliese.startTime) : null,
          logoStart: logoWeg ? Number(logoWeg.startTime) : null,
          logoEnde: logoWeg ? Number(logoWeg.startTime) + Number(logoWeg.effect.getComputedTiming().endTime) : null,
          z,
          deckt: bild ? Number(s.opacity) * Number(getComputedStyle(behaelter).opacity) : 0,
          groesse: m ? Math.hypot(m.a, m.b) : 1,
          geladen: !!bild && bild.complete && bild.naturalWidth > 0,
          natur: bild ? [bild.naturalWidth, bild.naturalHeight] : null,
          box: r ? { x: r.left, y: r.top, b: r.width, h: r.height } : null,
          ansicht: [flaeche.width, flaeche.height],
          leiste: window.innerWidth - document.documentElement.clientWidth,
        });
      }
      if (!(v.length > 1 && z === 'ruhe')) requestAnimationFrame(bild1);
    };
    requestAnimationFrame(bild1);
  });
}

/** Aufnahme des Logos, sobald die Schicht wieder in ruhe ist. */
async function logoProtokoll(page) {
  await expect.poll(() => page.evaluate(() => window.__logo.length > 1 && window.__logo.at(-1).z === 'ruhe')).toBe(true);
  return page.evaluate(() => window.__logo);
}
const logoKurz = (b) => b.map((e) => `${e.z} ${Math.round(e.t)} ${e.deckt.toFixed(2)} ${e.groesse.toFixed(3)}`).join(' | ');

/** Fall (23): Klick auf START nach ZIEL, das Logo auf der Wand gegen E-047; mittig gemessen an der Fläche der Schicht. */
async function pruefeLogo(page) {
  await oeffne(page);
  const link = linkZu(page, ZIEL);
  await bedienbar(link);
  expect.soft(await page.locator('.verlegen img').count(), 'vor dem ersten Wechsel kein Bild in der Schicht (kein LCP-Kandidat)').toBe(0);
  await beobachte(page);
  const ab = await laenge(page);
  await logoAufnahme(page);
  await link.click();
  await warteAufRuhe(page, ab);
  const b = await logoProtokoll(page);
  const protokoll = logoKurz(b);
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
  // Fläche der Schicht, nicht innerWidth: bei sichtbarer Bildlaufleiste ist die Ansicht um deren Breite schmaler
  const [breite, hoehe] = f.ansicht;
  // für das Auge mittig: die Mitte des sichtbaren Inhalts der Datei (12 bis 587 von 640 px, LOGO_INHALT_MITTE in raster.ts)
  expect.soft(Math.abs(f.box.x + f.box.b * ((12 + 587) / 2 / 640) - breite / 2), `waagrecht mittig für das Auge (± 1 px, Fläche ${breite} px, Leiste ${f.leiste} px)`).toBeLessThanOrEqual(1);
  expect.soft(Math.abs(f.box.y + f.box.h / 2 - hoehe / 2), 'senkrecht mittig (± 1 px)').toBeLessThanOrEqual(1);
  expect.soft(Math.abs(f.box.b / f.box.h - 3.2), `unverzerrt wie die Datei 640 × 200 (${f.box.b} × ${f.box.h})`).toBeLessThan(0.02);
  expect.soft(Number.isInteger(f.box.x) && Number.isInteger(f.box.y) && Number.isInteger(f.box.b), `ganze Pixel (${JSON.stringify(f.box)})`).toBe(true);
  expect.soft(f.natur, 'Bilddatei in 640 × 200 (nicht kleiner als angezeigt bei einfacher Pixeldichte)').toEqual([640, 200]);
  expect.soft(f.box.b, 'Logo nicht breiter als die Datei').toBeLessThanOrEqual(640);
  expect.soft(f.box.b, 'Logo groß genug (mobil 60 % der Breite, sonst 352 px)').toBeGreaterThanOrEqual(breite < 600 ? 0.6 * breite : 352);
  // Zeiten auf der Zeitachse des Dokuments (Startzeiten der Animationen, Bildzeit document.timeline.currentTime) statt an der
  // Wanduhr der Abtastung (performance.now() im rAF-Rückruf): Unter Last kommt der Rückruf ein langes Bild später; gemessen
  // wurden 240,2 und 254,3 ms bei 200 ms Ausblenden und 424,9 ms bei 450 ms Stehen (erstes deckendes Bild 62 ms zu spät
  // abgetastet), ohne dass das Logo anders lief. Die Aussagen bleiben dieselben, ohne Spielraum für die Abtastung; die
  // abgetasteten Bilder müssen dazu passen (gemalte Deckkraft, nicht nur die geplante).
  const zeiten = b.find((e) => e.z === 'abnehmen' && e.fliesenStart !== null && e.logoStart !== null);
  expect(zeiten, `Startzeiten von Fliesen und Logo beim Abnehmen (${protokoll})`).toBeTruthy();
  // Mindestzeit: vom Ende des Aufklatschens bis zum Beginn des Ausblendens mindestens 450 ms (− 1 Bild wie bisher), und jedes
  // abgetastete Bild dazwischen zeigt das Logo deckend in voller Größe
  const klatschEnde = b.find((e) => e.klatschEnde !== null)?.klatschEnde ?? null;
  expect(klatschEnde, `Aufklatschen gestartet (${protokoll})`).not.toBeNull();
  expect.soft(zeiten.logoStart - klatschEnde, `Logo steht mindestens ${LOGO_STEHEN} ms deckend (${protokoll})`).toBeGreaterThanOrEqual(LOGO_STEHEN - BILD);
  const stehend = b.filter((e) => e.tl >= klatschEnde && e.tl < zeiten.logoStart);
  expect.soft(stehend.length, 'Bilder, in denen das Logo steht').toBeGreaterThan(0);
  expect.soft(stehend.filter((e) => !(e.deckt > 0.99 && Math.abs(e.groesse - 1) < 0.001)).map((e) => `${e.z} ${Math.round(e.tl)} ${e.deckt.toFixed(2)}`), 'Logo steht deckend in voller Größe').toEqual([]);
  const iVoll = b.indexOf(f);
  const weg = b.slice(iVoll).find((e) => e.deckt < 0.99);
  expect(weg, 'Logo geht wieder').toBeTruthy();
  expect.soft(weg.z, 'Logo geht erst mit dem Abnehmen').toBe('abnehmen');
  // geht mit den ersten abgenommenen Fliesen: Beginn ist die Startzeit der ersten abgenommenen Fliese; das Ausblenden des Logos
  // startet im selben Bild (± 1 Bild) und endet spätestens 200 ms nach dem Beginn (+ 1 Bild; vorher 2 Bilder an der Wanduhr);
  // jedes abgetastete Bild danach zeigt das Logo ohne Deckkraft
  const beginn = zeiten.fliesenStart;
  expect.soft(Math.abs(zeiten.logoStart - beginn), 'Logo beginnt mit der ersten abgenommenen Fliese (± 1 Bild)').toBeLessThanOrEqual(BILD);
  expect.soft(zeiten.logoEnde - beginn, `Logo weg ${LOGO_WEG} ms nach Beginn des Abnehmens (+ 1 Bild)`).toBeLessThanOrEqual(LOGO_WEG + BILD);
  const danach = b.filter((e) => e.z === 'abnehmen' && e.tl >= zeiten.logoEnde);
  expect(danach.length, `Bilder nach dem Ende des Ausblendens abgetastet (${protokoll})`).toBeGreaterThan(0);
  expect.soft(Math.max(...danach.map((e) => e.deckt)), 'nach dem Ende des Ausblendens ist das Logo ganz weg').toBeLessThan(0.01);
  expect.soft(b.at(-1).deckt, 'in ruhe kein Logo').toBe(0);
  expect.soft(await pfad(page)).toBe(ZIEL);
  return b;
}

/** Ein langsames Ziel: Antworten auf `ziel` (RSC, auch das Vorladen) kommen erst nach 4,5 s, der Wechsel bricht nach 3 s ab. */
async function langsamesZiel(page, ziel = ZIEL, ms = 4500) {
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.replace(/\/+$/, '') === ziel && url.searchParams.has('_rsc')) await new Promise((r) => setTimeout(r, ms));
    await route.continue().catch(() => undefined);
  });
}

/** Wartet je Bild, bis der Boden liegt, und zählt Punkte der Schicht im Raster von 37 px (dazu die Ecken), die keine deckende
 *  Fliese trifft; dazu die Lage des Logo-Behälters. bisGedeckt: weiter abfragen, solange der Boden liegt, aber (noch) nicht
 *  deckt, bis er deckt oder abgenommen wird; sonst gilt das erste Bild nach dem Legen. */
function bodenDeckung(page, bisGedeckt) {
  return page
    .waitForFunction(
      (bisGedeckt) => {
        const s = document.querySelector('.verlegen');
        const z = s.dataset.zustand;
        if (z === 'legen') return false;
        const r = s.getBoundingClientRect();
        const punkte = [[r.width - 1, 1], [1, r.height - 1], [r.width - 1, r.height - 1]];
        for (let y = 1; y < r.height; y += 37) for (let x = 1; x < r.width; x += 37) punkte.push([x, y]);
        const offen = punkte.filter(
          ([x, y]) =>
            !document.elementsFromPoint(x, y).some((el) => {
              const f = el.closest('.verlegen-fliese');
              return !!f && Number(getComputedStyle(f).opacity) > 0.99;
            }),
        );
        const l = s.querySelector('.verlegen-logo').getBoundingClientRect();
        const ergebnis = { z, ansicht: [r.width, r.height], punkte: punkte.length, offen: offen.length, erster: offen[0] ?? null, logo: { x: l.left, y: l.top, b: l.width, h: l.height } };
        if (bisGedeckt && (z === 'bedeckt' || z === 'warten') && offen.length > 0) return false;
        return ergebnis;
      },
      bisGedeckt,
      { polling: 'raf', timeout: 10_000 },
    )
    .then((h) => h.jsonValue());
}

/** Während des Abnehmens: Fokus auf einen Link der neuen Seite (wie nach Tab von der H1) und den Stand im Augenblick seines
 *  Klicks merken (window.__enter). Gibt das Ziel des Links zurück. */
function linkImAbnehmen(page) {
  return page.evaluate((ziele) => {
    const el = ziele.map((z) => [...document.querySelectorAll(`#main-content a[href="${z}"]`)].find((a) => a.getClientRects().length > 0)).find(Boolean);
    if (!el) return null;
    el.focus({ preventScroll: true });
    const schicht = document.querySelector('.verlegen');
    document.addEventListener(
      'click',
      (e) => {
        window.__enter = { z: schicht.dataset.zustand, detail: e.detail, href: e.target.closest?.('a')?.getAttribute('href') ?? null };
      },
      { capture: true, once: true },
    );
    return el.getAttribute('href');
  }, ['/bad/barrierefreies-bad', '/bad/fliesen', '/bad/bad-aus-einer-hand', '/bad/musterbaeder', '/kontakt', '/bad']);
}

const imZustand = (page, z, timeout = 10_000) =>
  page.waitForFunction((z) => document.querySelector('.verlegen')?.dataset.zustand === z, z, { polling: 'raf', timeout });

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
    const { ziel, scroll } = await linkImSichtfeld(page);
    expect.soft(scroll, 'Scroll vor dem Klick mindestens 400 px').toBeGreaterThanOrEqual(398);
    const link = linkZu(page, ziel);
    await bedienbar(link);
    await beobachte(page);
    const ab = await wechsel(page, () => link.click(), ziel);
    const vor = (await log(page))[ab];
    expect.soft(Math.abs(vor.scroll - scroll), `Scroll vor dem Klick (${scroll} px ± 2)`).toBeLessThanOrEqual(2);
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
    // Einstieg der Seite aus dem Verlauf im Endzustand (Gegenprüfung E3-B01, Befund 6: ausVerlauf darf nicht verloren gehen)
    await expect.soft(page.locator('html'), `${fall}: k-verlauf`).toHaveClass(/k-verlauf/);
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
    await pruefeLogo(page);
  });

  test('(24) Zurück und Vor: das Logo klatscht ganz auf (deckend in voller Größe), bevor abgenommen wird, statt nach 0,2 s halb aufgeklatscht zu verblassen (Gegenprüfung E3-B01, Befund 1)', async ({ page }) => {
    await oeffne(page);
    await beobachte(page);
    await wechsel(page, () => linkZu(page, ZIEL).click(), ZIEL);
    for (const [richtung, aktion, ziel] of [
      ['Zurück', () => page.goBack(), START],
      ['Vor', () => page.goForward(), ZIEL],
    ]) {
      await logoAufnahme(page);
      const ab = await wechsel(page, aktion, ziel);
      const b = await logoProtokoll(page);
      const iVoll = b.findIndex((e) => e.deckt > 0.99 && Math.abs(e.groesse - 1) < 0.001);
      const iAb = b.findIndex((e) => e.z === 'abnehmen');
      expect.soft(iVoll, `${richtung}: Logo deckend in voller Größe (${logoKurz(b)})`).toBeGreaterThanOrEqual(0);
      expect.soft(iAb, `${richtung}: Fliesen abgenommen`).toBeGreaterThan(0);
      // im ersten Bild des Abnehmens hat das Ausblenden des Logos gerade erst begonnen (Deckkraft noch 1)
      expect.soft(iVoll >= 0 && iVoll <= iAb, `${richtung}: ganz aufgeklatscht, bevor es mit den Fliesen geht (${logoKurz(b)})`).toBe(true);
      expect.soft(ohneWarten(folge(await log(page), ab)), `${richtung}: Folge`).toEqual(VOLL);
    }
  });

  test('(25) Tastatur während des Abnehmens: Enter auf einem Link der neuen Seite wird vorgemerkt, der Wechsel dorthin folgt, sobald die Schicht frei ist (Gegenprüfung E3-B01, Befund 4)', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const ab = await laenge(page);
    await link.click();
    await imZustand(page, 'abnehmen');
    const weiter = await linkImAbnehmen(page);
    expect(weiter, 'interner Link auf der neuen Seite').not.toBeNull();
    await page.keyboard.press('Enter');
    expect(await page.evaluate(() => window.__enter), 'Enter kam als Klick der Tastatur an, während abgenommen wurde').toEqual({ z: 'abnehmen', detail: 0, href: weiter });
    await expect.poll(() => pfad(page), { timeout: 15_000 }).toBe(weiter);
    await warteAufRuhe(page, (await laenge(page)) - 1);
    expect.soft(ohneWarten(folge(await log(page), ab)), 'zwei vollständige Wechsel').toEqual([...VOLL, ...VOLL]);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
  });

  test('(26) Drehen während des Legens: der Boden deckt danach die ganze neue Ansicht, das Logo steht in ihrer Mitte (Gegenprüfung E3-B01, Befund 5)', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const ab = await laenge(page);
    const vorher = page.viewportSize();
    await link.click();
    await imZustand(page, 'legen', 5000);
    await page.setViewportSize({ width: vorher.height, height: vorher.width });
    const stand = await bodenDeckung(page, true);
    expect.soft(stand.ansicht, 'Schicht hat die neue Größe').toEqual([vorher.height, vorher.width]);
    expect.soft(['bedeckt', 'warten'], `Boden deckt, solange er liegt (${JSON.stringify(stand)})`).toContain(stand.z);
    expect.soft(stand.offen, `nicht gedeckte Punkte (${JSON.stringify(stand)})`).toBe(0);
    const [breite, hoehe] = stand.ansicht;
    expect.soft(Math.abs(stand.logo.x + stand.logo.b * ((12 + 587) / 2 / 640) - breite / 2), `Logo waagrecht mittig in der neuen Ansicht (${JSON.stringify(stand.logo)})`).toBeLessThanOrEqual(1);
    expect.soft(Math.abs(stand.logo.y + stand.logo.h / 2 - hoehe / 2), 'Logo senkrecht mittig in der neuen Ansicht').toBeLessThanOrEqual(1);
    await warteAufRuhe(page, ab);
    expect.soft(ohneWarten(folge(await log(page), ab))).toEqual(VOLL);
    expect.soft(await pfad(page)).toBe(ZIEL);
  });

  test('(27) Link mit Anker auf eine andere Seite (/standorte → /kontakt#express-anfrage): Ansicht und Fokus am Ankerziel, der erste Tab geht von dort weiter (Gegenprüfung E3-B01, Befund 7)', async ({ page }) => {
    await page.goto('/kontakt'); // aufwärmen: der Entwicklungsserver kompiliert beim ersten Aufruf
    await oeffne(page, '/standorte');
    const link = page.locator('#main-content a[href="/kontakt#express-anfrage"]').filter({ visible: true }).first();
    await bedienbar(link);
    await link.scrollIntoViewIfNeeded();
    await beobachte(page);
    const ab = await wechsel(page, () => link.click(), '/kontakt');
    expect.soft(ohneWarten(folge(await log(page), ab))).toEqual(VOLL);
    const stand = await page.evaluate(() => {
      const ziel = document.getElementById('express-anfrage');
      const aktiv = document.activeElement;
      const r = ziel?.getBoundingClientRect();
      return {
        hash: location.hash,
        imZiel: !!ziel && !!aktiv && (aktiv === ziel || ziel.contains(aktiv)),
        aktiv: aktiv ? aktiv.tagName + (aktiv.id ? `#${aktiv.id}` : '') : null,
        sichtbar: !!r && r.top < window.innerHeight && r.bottom > 0,
      };
    });
    expect.soft(stand.hash).toBe('#express-anfrage');
    expect.soft(stand.sichtbar, 'Ansicht am Ankerziel').toBe(true);
    expect.soft(stand.imZiel, `Fokus im Ankerziel statt auf der H1 (${stand.aktiv})`).toBe(true);
    await page.keyboard.press('Tab');
    const nachTab = await page.evaluate(() => {
      const ziel = document.getElementById('express-anfrage');
      const aktiv = document.activeElement;
      return { weiter: !!ziel && !!aktiv && !!(ziel.compareDocumentPosition(aktiv) & Node.DOCUMENT_POSITION_FOLLOWING), aktiv: aktiv?.outerHTML.slice(0, 80) ?? null };
    });
    expect.soft(nachTab.weiter, `erster Tab im Ankerziel oder dahinter, nicht zurück an den Anfang (${nachTab.aktiv})`).toBe(true);
  });

  test('(19) Abbruch nach 3 s (Zielseite antwortet nicht): der Boden blendet aus statt in einem Bild zu verschwinden, danach erscheint die Seite', async ({ page }) => {
    // vor dem Laden: auch das Vorladen des Links im Sichtfeld wartet, die Navigation hängt also sicher länger als 3 s
    await langsamesZiel(page);
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

  test('(19b) Abbruch nach 3 s, dann kommt die Seite doch: Fokus auf ihrer H1 statt auf body (Gegenprüfung E3-B01, Befund 3)', async ({ page }) => {
    await langsamesZiel(page);
    await oeffne(page);
    await beobachte(page);
    const ab = await laenge(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await link.click();
    await expect.poll(async () => (await log(page)).slice(ab).map((e) => e.z).join(' '), { timeout: 15_000 }).toContain('abbruch');
    await warteAufRuhe(page, ab);
    await expect.poll(() => pfad(page), { timeout: 10_000 }).toBe(ZIEL);
    await expect(page.locator('#main-content h1')).toBeFocused();
  });

  test('(19c) Abbruch aus dem Verlauf: Zurück auf eine Seite, die erst nach 4,5 s kommt; kommt sie doch, steht sie an der gemerkten Stelle, Fokus auf ihrer H1 (Gegenprüfung E3-B01, Befund 3)', async ({ page, browser }) => {
    const h1Start = await h1Von(browser, START);
    await oeffne(page);
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThanOrEqual(398);
    const { ziel, scroll } = await linkImSichtfeld(page);
    expect(scroll, 'Scroll vor dem Klick mindestens 400 px').toBeGreaterThanOrEqual(398);
    const link = linkZu(page, ziel);
    await bedienbar(link);
    await beobachte(page);
    await wechsel(page, () => link.click(), ziel);
    // Neu laden leert den Speicher des Routers: Zurück stellt dann eine RSC-Anfrage für START (sonst kommt die Seite aus dem
    // Speicher sofort). Gemessen (Sonde E3-B01-FIX-2): Zurück bleibt auch nach dem Neuladen ein popstate im selben Dokument,
    // danach GET /bad?_rsc=…
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/k-modul/);
    await bedienbar(page.locator('.verlegen'));
    await beobachte(page);
    await langsamesZiel(page, START);
    const ab = await laenge(page);
    await page.evaluate(() => history.back());
    await expect.poll(async () => (await log(page)).slice(ab).map((e) => e.z).join(' '), { timeout: 15_000 }).toContain('abbruch');
    // die Adresse zeigt START schon beim popstate; die Seite selbst kommt mit der Antwort
    const h1 = () => page.evaluate(() => document.querySelector('#main-content h1')?.textContent?.trim() ?? '');
    await expect.poll(h1, { timeout: 15_000 }).toBe(h1Start);
    await warteAufRuhe(page, ab);
    const l = (await log(page)).slice(ab);
    expect.soft(l.map((e) => e.z), 'Abbruch statt Abnehmen').not.toContain('abnehmen');
    expect.soft(await pfad(page)).toBe(START);
    expect.soft(Math.abs((await page.evaluate(() => window.scrollY)) - scroll), `Scroll an der gemerkten Stelle (${scroll} px ± 2)`).toBeLessThanOrEqual(2);
    await expect(page.locator('#main-content h1')).toBeFocused();
  });

  // (19d) Versatz der Antwort nach „bedeckt“ (zeit-ende kommt 3000 ms nach „bedeckt“, die Uhr startet mit navigiere im selben
  // Schritt). Damit „bereit“ erst nach zeit-ende käme, ist der Hauptfaden nach dem Einhängen beschäftigt (eine Kette kurzer
  // Aufgaben, wie Bilder und Skripte einer neuen Seite): requestIdleCallback in spaeterBereit läuft dann erst nach seiner Frist,
  // „bereit“ also frühestens 2 Bilder + 400 ms nach dem Einhängen. Gemessen (E3-B01-FIX-2, je 5 Läufe mobil und desktop,
  // Versatz 2650 ms): eingehängt 161 bis 269 ms nach der Freigabe (2811 bis 2919 ms nach „bedeckt“), Abbruch bei 3005 bis
  // 3131 ms. Mit 2550 ms liegt das Einhängen bei etwa 2710 bis 2820 ms: rund 200 ms vor zeit-ende, „bereit“ frühestens bei
  // etwa 3140 ms, also nach zeit-ende. Ohne die beschäftigte Kette kam „bereit“ rund 40 bis 100 ms nach dem Einhängen, vor
  // zeit-ende: kein Abbruch. Der Fall prüft selbst, dass die Seite vor dem Abbruch eingehängt war (sonst scheitert er laut).
  const VERSATZ_KNAPP = 2550;

  test('(19d) Seite kommt kurz vor Ablauf der 3 s, „bereit“ käme erst danach: Abbruch, Fokus auf der H1 der schon eingehängten Seite (Gegenprüfung E3-B01-FIX, seiteDa)', async ({ page, browser }, testInfo) => {
    const h1Ziel = await h1Von(browser, ZIEL);
    let freigabe;
    const tor = new Promise((r) => (freigabe = r));
    // der Server rechnet die Antwort sofort (route.fetch), ausgeliefert wird sie erst nach der Freigabe: so hängt der Zeitpunkt
    // des Einhängens nur noch an Übertragung und Rendern im Browser, nicht am Rechnen des Entwicklungsservers
    await page.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname.replace(/\/+$/, '') === ZIEL && url.searchParams.has('_rsc')) {
        const antwort = await route.fetch().catch(() => null);
        await tor;
        if (antwort) await route.fulfill({ response: antwort }).catch(() => undefined);
        else await route.continue().catch(() => undefined);
        return;
      }
      await route.continue().catch(() => undefined);
    });
    await oeffne(page);
    await beobachte(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await page.evaluate((ziel) => {
      const schicht = document.querySelector('.verlegen');
      const v = (window.__knapp = { bedeckt: null, da: null, abbruch: null, abnehmen: null });
      new MutationObserver(() => {
        const z = schicht.dataset.zustand;
        if (z in v && v[z] === null) v[z] = performance.now();
      }).observe(schicht, { attributes: true, attributeFilter: ['data-zustand'] });
      // Einhängen: Adresse und Inhalt wechseln im selben Schritt (der Pfad-Effekt läuft darin); der Beobachter meldet sich gleich
      // danach. Ab dann die Kette kurzer Aufgaben, bis der Wechsel entschieden ist (höchstens 1,5 s): keine Leerlaufzeit, Uhren
      // und Bilder laufen weiter.
      new MutationObserver(() => {
        if (v.da !== null || location.pathname !== ziel) return;
        v.da = performance.now();
        const kanal = new MessageChannel();
        const bis = v.da + 1500;
        kanal.port1.onmessage = () => {
          const z = schicht.dataset.zustand;
          if (performance.now() < bis && (z === 'bedeckt' || z === 'warten')) kanal.port2.postMessage(0);
        };
        kanal.port2.postMessage(0);
      }).observe(document.getElementById('main-content'), { childList: true, subtree: true });
    }, ZIEL);
    const ab = await laenge(page);
    await link.click();
    await page.waitForFunction((versatz) => window.__knapp.bedeckt !== null && performance.now() - window.__knapp.bedeckt >= versatz, VERSATZ_KNAPP, { polling: 'raf', timeout: 10_000 });
    freigabe();
    await warteAufRuhe(page, ab);
    await expect.poll(() => pfad(page), { timeout: 10_000 }).toBe(ZIEL);
    const k = await page.evaluate(() => window.__knapp);
    const relativ = Object.fromEntries(Object.entries(k).map(([n, t]) => [n, t === null ? null : Math.round(t - k.bedeckt)]));
    await testInfo.attach('knapp.json', { body: JSON.stringify({ versatz: VERSATZ_KNAPP, abBedeckt: relativ }, null, 2), contentType: 'application/json' });
    console.log(`(19d) ${testInfo.project.name}: ms ab bedeckt ${JSON.stringify(relativ)}`);
    // der Fall prüft nur, was er prüfen soll: eingehängt vor dem Abbruch, und abgebrochen statt abgenommen
    expect(k.abbruch, `Abbruch eingetreten (${JSON.stringify(relativ)})`).not.toBeNull();
    expect(k.da, `Seite vor dem Abbruch eingehängt (${JSON.stringify(relativ)})`).not.toBeNull();
    expect(k.da, `Seite vor dem Abbruch eingehängt (${JSON.stringify(relativ)})`).toBeLessThan(k.abbruch);
    expect.soft(k.abnehmen, 'nicht abgenommen').toBeNull();
    expect.soft((await page.locator('#main-content h1').first().textContent())?.trim(), 'Inhalt von ZIEL').toBe(h1Ziel);
    await expect(page.locator('#main-content h1')).toBeFocused();
  });

  test('(28) Höhe wächst beim Legen wenig (Adressleiste fährt ein): die Fliesen legen weiter statt in einem Bild zu liegen, danach deckt der Boden ganz (Gegenprüfung E3-B01-FIX)', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const ab = await laenge(page);
    const vorher = page.viewportSize();
    // 390 × 844 → 390 × 900, 1440 × 900 → 1440 × 960
    const neu = { width: vorher.width, height: vorher.height + (vorher.width < 600 ? 56 : 60) };
    await link.click();
    await imZustand(page, 'legen', 5000);
    await page.setViewportSize(neu);
    // zwei Bilder nach der Größenänderung (resize läuft im Bild vor den rAF-Rückrufen): Zustand, Fläche, laufende Leg-Animationen
    const direkt = await page.evaluate(
      () =>
        new Promise((fertig) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              const s = document.querySelector('.verlegen');
              const r = s.getBoundingClientRect();
              const fliesen = [...document.querySelectorAll('.verlegen-fliese')];
              fertig({
                z: s.dataset.zustand,
                ansicht: [r.width, r.height],
                laufend: document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.target?.closest?.('.verlegen-fliese')).length,
                gelegt: fliesen.filter((el) => Number(getComputedStyle(el).opacity) > 0.99).length,
                fliesen: fliesen.length,
              });
            }),
          ),
        ),
    );
    expect(direkt.ansicht, 'Schicht hat die neue Größe').toEqual([neu.width, neu.height]);
    expect(direkt.z, `Größe geändert, während gelegt wird (${JSON.stringify(direkt)})`).toBe('legen');
    expect.soft(direkt.laufend, `Leg-Animationen laufen weiter (${JSON.stringify(direkt)})`).toBeGreaterThan(0);
    expect.soft(direkt.gelegt, `kein Rest in einem Bild: noch nicht alle Fliesen liegen (${JSON.stringify(direkt)})`).toBeLessThan(direkt.fliesen);
    // das erste Bild nach dem Legen deckt schon die ganze neue Ansicht
    const stand = await bodenDeckung(page, false);
    expect.soft(['bedeckt', 'warten'], `Boden liegt (${JSON.stringify(stand)})`).toContain(stand.z);
    expect.soft(stand.ansicht, 'Fläche der Schicht').toEqual([neu.width, neu.height]);
    expect.soft(stand.offen, `nicht gedeckte Punkte im ersten Bild nach dem Legen (${JSON.stringify(stand)})`).toBe(0);
    await warteAufRuhe(page, ab);
    expect.soft(ohneWarten(folge(await log(page), ab))).toEqual(VOLL);
    expect.soft(await pfad(page)).toBe(ZIEL);
  });

  test('(29) Enter im Abnehmen auf einen Link, dann sofort Zurück: der Lauf endet auf der Seite des Zurück, kein zweiter Fliesenwechsel (Gegenprüfung E3-B01-FIX)', async ({ page, browser }) => {
    const h1Start = await h1Von(browser, START);
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const ab = await laenge(page);
    await link.click();
    await imZustand(page, 'abnehmen');
    const weiter = await linkImAbnehmen(page);
    expect(weiter, 'interner Link auf der neuen Seite').not.toBeNull();
    // Zustand beim popstate merken (Lauscher nach dem der Schicht; im Abnehmen hält sie das Ereignis nicht an)
    await page.evaluate(() => {
      const schicht = document.querySelector('.verlegen');
      window.addEventListener('popstate', () => (window.__zurueck ??= { z: schicht.dataset.zustand }), { capture: true });
    });
    await page.keyboard.press('Enter');
    await page.evaluate(() => history.back());
    expect(await page.evaluate(() => window.__enter), 'Enter kam als Klick der Tastatur an, während abgenommen wurde').toEqual({ z: 'abnehmen', detail: 0, href: weiter });
    await expect.poll(() => page.evaluate(() => window.__zurueck?.z ?? null), { message: 'Zurück kam, während abgenommen wurde' }).toBe('abnehmen');
    await warteAufRuhe(page, ab);
    // kein zweiter Wechsel: ein vorgemerkter Link begänne ein Bild nach freigeben; das Protokoll bleibt eine Weile stehen
    await page.waitForTimeout(800);
    expect.soft(ohneWarten(folge(await log(page), ab)), 'genau ein Fliesenwechsel').toEqual(VOLL);
    expect.soft(await pfad(page), 'Seite des Zurück').toBe(START);
    expect.soft((await page.locator('#main-content h1').first().textContent())?.trim(), 'Inhalt von START').toBe(h1Start);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
  });

  test('(30) Abbruch aus dem Verlauf, die Seite kommt nicht, dann ein Klick: der Wechsel läuft ganz durch, Fokus auf der H1 der neuen Seite (Befund E3-B01-FIX-2, F2)', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    await wechsel(page, () => link.click(), ZIEL);
    // wie (19c): nach dem Neuladen stellt Zurück eine RSC-Anfrage für START; hier antwortet START bis zum Ende des Falls nicht
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/k-modul/);
    await bedienbar(page.locator('.verlegen'));
    await beobachte(page);
    await langsamesZiel(page, START, 60_000);
    const ab = await laenge(page);
    await page.evaluate(() => history.back());
    await expect.poll(async () => (await log(page)).slice(ab).map((e) => e.z).join(' '), { timeout: 15_000 }).toContain('abbruch');
    await warteAufRuhe(page, ab);
    // angezeigt bleibt ZIEL (die Adresse zeigt START): ein sichtbarer Link dieser Seite, der weder auf START noch auf ZIEL führt
    const weiter = await page.evaluate(
      ([start, ziel]) =>
        [...document.querySelectorAll('#main-content a[href^="/"]')]
          .find((a) => {
            const h = a.getAttribute('href');
            return a.getClientRects().length > 0 && !h.includes('#') && !h.includes('?') && h !== start && h !== ziel;
          })
          ?.getAttribute('href') ?? null,
      [START, ZIEL],
    );
    expect(weiter, 'interner Link auf der angezeigten Seite').not.toBeNull();
    const ab2 = await laenge(page);
    await linkZu(page, weiter).click();
    await expect.poll(() => pfad(page)).toBe(weiter);
    await warteAufRuhe(page, ab2);
    expect.soft(ohneWarten(folge(await log(page), ab2)), 'voller Wechsel ohne Abbruch').toEqual(VOLL);
    await expect.soft(page.locator('#main-content h1')).toBeFocused();
    await page.unrouteAll({ behavior: 'ignoreErrors' });
  });

  test('(31) Breite wächst beim Legen um 60 px: im ersten Bild nach dem Legen deckt der Boden die ganze neue Ansicht, auch in den kürzeren Reihen des Drittelverbands (Befund E3-B01-FIX-2, F1)', async ({ page }) => {
    await oeffne(page);
    const link = linkZu(page, ZIEL);
    await bedienbar(link);
    await beobachte(page);
    const ab = await laenge(page);
    const vorher = page.viewportSize();
    // 390 × 844 → 450 × 844, 1440 × 900 → 1500 × 900
    const neu = { width: vorher.width + 60, height: vorher.height };
    await link.click();
    await imZustand(page, 'legen', 5000);
    await page.setViewportSize(neu);
    const stand = await bodenDeckung(page, false);
    expect.soft(['bedeckt', 'warten'], `Boden liegt (${JSON.stringify(stand)})`).toContain(stand.z);
    expect.soft(stand.ansicht, 'Fläche der Schicht').toEqual([neu.width, neu.height]);
    expect.soft(stand.offen, `nicht gedeckte Punkte im ersten Bild nach dem Legen (${JSON.stringify(stand)})`).toBe(0);
    await warteAufRuhe(page, ab);
    expect.soft(await pfad(page)).toBe(ZIEL);
  });
});

// Sichtbare Bildlaufleiste (Gegenprüfung E3-B01, Befund 2): Playwright blendet sie sonst aus (--hide-scrollbars), dann fiele
// ein Logo, das nach innerWidth statt nach der Fläche der Schicht mittig steht, nicht auf. launchOptions gelten je Worker und
// sind in einem describe nicht erlaubt, darum ein eigener Browser ohne den Schalter, mit Anfragesperre wie die Fixtures.
test.describe('Bildlaufleiste sichtbar', () => {
  test('(23b) Logo mittig in der Fläche der Schicht, auch mit sichtbarer Bildlaufleiste', async ({}, testInfo) => {
    test.skip(testInfo.project.name === 'mobil', 'mobil liegt die Bildlaufleiste über dem Inhalt (keine Breite)');
    const base = process.env.RELAUNCH_BASE || 'http://127.0.0.1:4310';
    const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, ignoreDefaultArgs: ['--hide-scrollbars'] });
    try {
      const ctx = await browser.newContext({
        baseURL: base,
        locale: 'de-DE',
        timezoneId: 'Europe/Berlin',
        viewport: testInfo.project.use.viewport,
        reducedMotion: 'no-preference',
      });
      await installSperre(ctx);
      await setzeEinwilligung(ctx, 'abgelehnt', base);
      const page = await ctx.newPage();
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const b = await pruefeLogo(page);
      expect(b[0].leiste, 'Bildlaufleiste sichtbar (Breite in px)').toBeGreaterThan(0);
    } finally {
      await browser.close();
    }
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
