// Hilfsskript E4-NACH-17 (Prüfung): Kartenplatz-Messung bei 390 px, je Lauf eine frische Browsersitzung.
// Nutzung: node mobil-messung.mjs <Ausgabeordner> [Wiederholungen]
// Browser und Sperre kommen aus den Werkzeugen (lib.mjs: Anfragesperre, Einwilligung, Entwicklungs-Overlay).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const WERKZEUGE = '/home/user/tezgel/_werkstatt/werkzeuge';
const require = createRequire(path.join(WERKZEUGE, 'package.json'));
const { chromium } = require('@playwright/test');
const L = await import(path.join(WERKZEUGE, 'lib.mjs'));

const ziel = path.resolve(process.argv[2]);
const wiederholungen = Number(process.argv[3] || '3');
const base = 'http://127.0.0.1:4320';
L.assertLocal(base);
fs.mkdirSync(ziel, { recursive: true });

const SEITEN = [
  { seite: '/', kennung: 'start', anker: '#servicegebiet' },
  { seite: '/kontakt', kennung: 'kontakt', anker: null },
];
const ANSICHT = { width: 390, height: 844, isMobile: true, hasTouch: true };

// Messung im Seitenkontext: Kartenplatz = Wurzel des Einwilligungs-Tors (Knopf „Karte laden & zustimmen“).
const messe = () => {
  const sichtbar = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const knopf = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Karte laden & zustimmen');
  if (!knopf) return { fehler: 'kein Einwilligungs-Tor gefunden' };
  // Wurzel = erster Vorfahr mit der Kartenstil-Variable (rahmenStil setzt --karten-hoehe am Rahmen)
  let wurzel = knopf.parentElement;
  while (wurzel && !wurzel.style.getPropertyValue('--karten-hoehe')) wurzel = wurzel.parentElement;
  if (!wurzel) return { fehler: 'Wurzel nicht bestimmbar' };
  const wr = wurzel.getBoundingClientRect();
  const top0 = wr.top + window.scrollY;
  const bloecke = [];
  wurzel.querySelectorAll('*').forEach((el) => {
    if (el.children.length > 0) return;
    if (!sichtbar(el)) return;
    const r = el.getBoundingClientRect();
    bloecke.push([r.top + window.scrollY - top0, r.bottom + window.scrollY - top0, el.tagName.toLowerCase()]);
  });
  bloecke.sort((a, b) => a[0] - b[0]);
  // verschmelzen, Lücken zwischen den belegten Bändern (Blatt-Elemente) bestimmen
  const baender = [];
  for (const [a, b] of bloecke) {
    const letzt = baender[baender.length - 1];
    if (letzt && a <= letzt[1] + 0.5) letzt[1] = Math.max(letzt[1], b);
    else baender.push([a, b]);
  }
  const hoehe = wr.height;
  const luecken = [];
  let cursor = 0;
  for (const [a, b] of baender) { if (a - cursor > 0) luecken.push(a - cursor); cursor = Math.max(cursor, b); }
  if (hoehe - cursor > 0) luecken.push(hoehe - cursor);
  const listen = [...wurzel.querySelectorAll('ul,ol')].filter(sichtbar);
  const zonen = [...wurzel.querySelectorAll('.einzugsband-zone')].filter(sichtbar).length;
  const zonenGesamt = wurzel.querySelectorAll('.einzugsband-zone').length;
  const sichtbareOrte = [...wurzel.querySelectorAll('li')].filter(sichtbar).map((li) => li.innerText.trim()).filter(Boolean);
  const text = wurzel.innerText.replace(/\s+/g, ' ').trim();
  return {
    rahmenHoehe: Math.round(hoehe),
    leerfeldMaxPx: luecken.length ? Math.round(Math.max(...luecken)) : 0,
    leerfeldLuecken: luecken.map((g) => Math.round(g)),
    sichtbareListen: listen.length,
    sichtbareListenElemente: sichtbareOrte.length,
    zonenSichtbar: zonen,
    zonenImDOM: zonenGesamt,
    sichtbareOrte: sichtbareOrte.slice(0, 12),
    textAusschnitt: text.slice(0, 260),
    scrollBreite: document.documentElement.scrollWidth,
    fensterBreite: window.innerWidth,
    kartenTitel: wurzel.innerText.split('\n')[0],
  };
};

const ergebnisse = [];
for (const s of SEITEN) {
  for (let lauf = 1; lauf <= wiederholungen; lauf++) {
    const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
    const context = await browser.newContext({
      viewport: { width: ANSICHT.width, height: ANSICHT.height },
      deviceScaleFactor: 1, isMobile: ANSICHT.isMobile, hasTouch: ANSICHT.hasTouch,
      reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin',
    });
    const protokoll = [];
    await L.installSperre(context, { protokoll });
    await L.setzeEinwilligung(context, 'abgelehnt', base);
    const page = await context.newPage();
    const konsole = [];
    page.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text().slice(0, 200)); });
    const antwort = await page.goto(base + s.seite, { waitUntil: 'load', timeout: 120000 });
    await L.versteckeDevOverlay(page);
    await L.bereit(page);
    await page.waitForTimeout(400);
    const messung = await page.evaluate(messe);
    const ziel1 = path.join(ziel, s.kennung);
    fs.mkdirSync(ziel1, { recursive: true });
    if (lauf === 1 && !messung.fehler) {
      const knopf = page.getByRole('button', { name: 'Karte laden & zustimmen' });
      await knopf.scrollIntoViewIfNeeded();
      const wurzel = await page.evaluateHandle(() => {
        const k = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Karte laden & zustimmen');
        let w = k.parentElement;
        while (w && !w.style.getPropertyValue('--karten-hoehe')) w = w.parentElement;
        return w;
      });
      await wurzel.asElement().screenshot({ path: path.join(ziel1, 'kartenplatz-m390.png') });
      if (s.anker) {
        const abschnitt = page.locator(s.anker);
        if (await abschnitt.count()) await abschnitt.first().screenshot({ path: path.join(ziel1, 'abschnitt-m390.png') });
      }
    }
    ergebnisse.push({ seite: s.seite, lauf, status: antwort ? antwort.status() : null, ...messung, konsoleFehler: konsole.length, fremdAnfragen: protokoll.filter((p) => p.art === 'fremd').length, blockiert: protokoll.filter((p) => p.art === 'blockiert').length });
    await browser.close();
  }
}

const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const zusammen = SEITEN.map((s) => {
  const rs = ergebnisse.filter((e) => e.seite === s.seite && !e.fehler);
  return {
    seite: s.seite,
    laeufe: rs.length,
    leerfeldMaxPx_median: median(rs.map((r) => r.leerfeldMaxPx)),
    leerfeldMaxPx_werte: rs.map((r) => r.leerfeldMaxPx),
    sichtbareListen_werte: rs.map((r) => r.sichtbareListen),
    sichtbareListenElemente_werte: rs.map((r) => r.sichtbareListenElemente),
    zonenSichtbar_werte: rs.map((r) => r.zonenSichtbar),
    zonenImDOM_werte: rs.map((r) => r.zonenImDOM),
    scrollBreite_werte: rs.map((r) => r.scrollBreite),
    rahmenHoehe_median: median(rs.map((r) => r.rahmenHoehe)),
    konsoleFehler_summe: rs.reduce((n, r) => n + r.konsoleFehler, 0),
    fremdAnfragen_summe: rs.reduce((n, r) => n + r.fremdAnfragen, 0),
  };
});
const bericht = { erzeugt: new Date().toISOString(), basis: base, ansicht: '390x844 mobil, Einwilligung abgelehnt', zusammen, laeufe: ergebnisse };
fs.writeFileSync(path.join(ziel, 'messung.json'), JSON.stringify(bericht, null, 2));
console.log(JSON.stringify(zusammen, null, 2));
