// Reaktionszeit (INP-Näherung) je Hauptansicht · Z-08 (ABNAHME.md) · Paket E2-PRUEF-INP
// Misst auf m390 mit 4-fach gedrosselter CPU (CDP Emulation.setCPUThrottlingRate, rate 4) fünf Handlungen je Seite:
//   hauptknopf  [data-hauptknopf] im main antippen. Ankerziel: die Seite bleibt. Linkziel: nur der Druck wird gemessen,
//               die Navigation fängt ein Klick-Abfang auf genau diesem Klick ab (preventDefault; nur die Reaktion zählt).
//   menue       Schalter „Menü öffnen“ antippen und mit Escape schließen (Fenster umfasst beide Eingaben).
//   akkordeon   erstes details > summary oder Schalter mit aria-expanded im main, falls vorhanden.
//   eingabe     erstes Textfeld im main antippen und 5 Zeichen tippen (kein Absenden).
//   link        ersten internen Link im main antippen; der Seitenwechsel läuft, gemessen wird die Reaktion des Klicks.
// Messung: PerformanceObserver vom Typ 'event' (durationThreshold 16, buffered). Je Handlung der größte duration-Wert der
//   Ereignisse mit interactionId > 0 im Zeitfenster der Handlung (Start vor dem Antippen bis Ruhe danach).
//   'first-input' läuft als Gegencheck mit: die erste Eingabe der Seite muss als gleicher Ereigniseintrag erscheinen.
// Je Seite und Handlung --laeufe Läufe (Standard 3), je Handlung der Median; Seitenwert = höchster Median; Schwelle ≤ 200 ms.
// Jeder Lauf: frischer Kontext, Intro-Speicher gesetzt (installSperre), Einwilligung „abgelehnt“, Warten bis hydriert
//   (ein Element mit __reactProps$-Schlüssel). Die Drosselung ist vor dem ersten Laden gesetzt.
// Nutzung: node reaktion.mjs --satz NAME (--seiten /a,/b | --hauptansichten) [--laeufe 3] [--base URL] [--ziel DIR]
//          node reaktion.mjs --probe [--laeufe 3] [--ziel DIR]   (Positivprobe: tests-logik/reaktion-probe.html per file://)
// Ausgabe: <ziel>/reaktion.json und Kurztabelle auf stdout. Standard-Ziel _werkstatt/belege/<satz>, bei --probe $SCRATCH/reaktion-probe.
// Exit 0: Lauf vollständig ohne Fehler (das Schwellenurteil steht in der Ausgabe). Bei --probe nur, wenn langsam > 200 ms,
//         schnell < 200 ms und die Drosselung wirksam ist (Rechenlast Rate 4 / Rate 1 ≥ 2). Exit 1: Fehler oder abweichende Probe.
//         Exit 2: falscher Aufruf.
// Voraussetzung: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers (wie bei den übrigen Werkzeugen).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { BASE, SCRATCH, RELAUNCH, REPO, WERKZEUGE, ANSICHTEN, assertLocal, installSperre, setzeEinwilligung, ensureDir, versteckeDevOverlay } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
const NUTZUNG = 'Nutzung: node reaktion.mjs --satz NAME (--seiten /a,/b | --hauptansichten) [--laeufe 3] [--base URL] [--ziel DIR]\n         node reaktion.mjs --probe [--laeufe 3] [--ziel DIR]';

const GERAET = 'm390';
const DROSSELUNG = 4;
const EREIGNIS_SCHWELLE_MS = 16;
const SCHWELLE_MS = 200;
const TOLERANZ_MS = 50;
const HANDLUNGEN = ['hauptknopf', 'menue', 'akkordeon', 'eingabe', 'link'];
const NAMEN = { hauptknopf: 'Hauptknopf', menue: 'Menü', akkordeon: 'Akkordeon', eingabe: 'Eingabe', link: 'Link' };
const PROBE_DATEI = path.join(WERKZEUGE, 'tests-logik', 'reaktion-probe.html');
const EINGABE_SEL = ['input:not([type])', 'input[type="text"]', 'input[type="search"]', 'input[type="email"]', 'input[type="tel"]', 'textarea']
  .map((s) => `main ${s}:not([disabled]):not([readonly])`).join(', ');

// ---------- Aufruf ----------
const probe = flag('probe');
const satzName = arg('satz');
const base = arg('base', BASE);
const laeufe = Number(arg('laeufe', '3'));
if (!Number.isInteger(laeufe) || laeufe < 1) { console.error(`${NUTZUNG}\n--laeufe braucht eine ganze Zahl ab 1`); process.exit(2); }
assertLocal(base);
let seiten = [];
if (!probe) {
  if (flag('hauptansichten') && arg('seiten')) { console.error(`${NUTZUNG}\n--hauptansichten und --seiten schließen sich aus`); process.exit(2); }
  if (flag('hauptansichten')) seiten = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'HAUPTANSICHTEN.json'), 'utf8')).hauptansichten.map((h) => h.pfad);
  else if (arg('seiten')) seiten = arg('seiten').split(',').map((s) => s.trim());
  if (!satzName || !seiten.length) { console.error(NUTZUNG); process.exit(2); }
  if (seiten.some((s) => !s.startsWith('/'))) { console.error(`Seite muss mit / beginnen: ${seiten.join(' ')}`); process.exit(2); }
}
const satz = probe ? 'probe' : satzName;
const ziel = ensureDir(arg('ziel') ? path.resolve(arg('ziel')) : probe ? path.join(SCRATCH, 'reaktion-probe') : path.join(RELAUNCH, 'belege', satz));

// ---------- Bausteine ----------
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const runde = (n) => Math.round(n * 10) / 10;
const runde2 = (n) => Math.round(n * 100) / 100;
function median(werte) {
  const s = werte.filter(Number.isFinite).sort((a, b) => a - b);
  if (!s.length) return null;
  const m = Math.floor(s.length / 2);
  return runde(s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2);
}
const kontext = () => {
  const a = ANSICHTEN[GERAET];
  return {
    viewport: { width: a.width, height: a.height }, deviceScaleFactor: 1, isMobile: a.isMobile, hasTouch: a.hasTouch,
    reducedMotion: 'no-preference', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light',
  };
};

function gitStand() {
  try {
    const commit = execFileSync('git', ['-C', REPO, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
    const status = execFileSync('git', ['-C', REPO, '--no-optional-locks', 'status', '--porcelain'], { encoding: 'utf8' });
    return { commit, arbeitsbaum: status.trim() ? 'mit ungesicherten Änderungen' : 'sauber' };
  } catch { return { commit: null, arbeitsbaum: 'unbekannt' }; }
}

// Läuft vor jedem Dokument: Event-Timing-Einträge an Node melden (__reaktionEreignis). Abgefangen wird ein Klick nur,
// wenn der Lauf ihn ausdrücklich markiert (window.__reaktionAbfangen), und genau dieser eine Klick.
function seitenSkript() {
  window.__reaktionAbfangen = false;
  window.addEventListener('click', (e) => {
    if (window.__reaktionAbfangen) { window.__reaktionAbfangen = false; e.preventDefault(); }
  }, true);
  const melde = (typ) => (liste) => {
    for (const e of liste.getEntries()) {
      if (typeof window.__reaktionEreignis === 'function') {
        window.__reaktionEreignis({ typ, name: e.name, start: performance.timeOrigin + e.startTime, dauer: e.duration, interaktion: e.interactionId || 0 });
      }
    }
  };
  try { new PerformanceObserver(melde('event')).observe({ type: 'event', durationThreshold: 16, buffered: true }); } catch { /* ohne Event Timing */ }
  try { new PerformanceObserver(melde('first-input')).observe({ type: 'first-input', buffered: true }); } catch { /* ohne first-input */ }
}

// Wartet, bis keine neuen Ereigniseinträge mehr eintreffen (Meldungen kommen nach dem nächsten Bild, asynchron).
async function ruhe(ereignisse) {
  await pause(300);
  let letzte = ereignisse.length;
  let stabil = 0;
  const ende = Date.now() + 3000;
  while (Date.now() < ende) {
    await pause(150);
    if (ereignisse.length === letzte) { stabil += 1; if (stabil >= 2) return; } else { letzte = ereignisse.length; stabil = 0; }
  }
}

// Eine Handlung: Zeitfenster um die Aktion, danach Ruhe; größter Wert der Eingabe-Ereignisse im Fenster (0 = unter 16 ms).
async function misse(ereignisse, aktion) {
  const t0 = Date.now();
  await aktion();
  await ruhe(ereignisse);
  const t1 = Date.now();
  const im = ereignisse.filter((e) => e.typ === 'event' && e.interaktion > 0 && e.start >= t0 - TOLERANZ_MS && e.start <= t1 + TOLERANZ_MS);
  return { wert: im.length ? runde(Math.max(...im.map((e) => e.dauer))) : 0, eintraege: im.length, fenster: [t0, t1] };
}

async function warteHydriert(page) {
  await page.waitForFunction(() => {
    for (const el of document.body ? document.body.querySelectorAll('*') : []) {
      if (Object.keys(el).some((k) => k.startsWith('__reactProps$'))) return true;
    }
    return false;
  }, null, { timeout: 60000, polling: 250 });
}

// Drosselung nachweisen: feste Rechenlast bei Rate 1 gegen Rate 4 (Median aus 5). Ergebnis ≥ 2 heißt: die Drosselung wirkt.
async function drosselKontrolle(page, cdp) {
  const rechne = () => page.evaluate(() => {
    const t = performance.now();
    let s = 0;
    for (let i = 0; i < 3000000; i += 1) s += Math.sqrt(i);
    return performance.now() - t + (s < 0 ? 1 : 0);
  });
  const reihe = async (rate) => {
    await cdp.send('Emulation.setCPUThrottlingRate', { rate });
    const w = [];
    for (let i = 0; i < 5; i += 1) w.push(await rechne());
    return median(w);
  };
  const ohne = await reihe(1);
  const mit = await reihe(DROSSELUNG);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: DROSSELUNG });
  return { rate_1_median_ms: ohne, rate_4_median_ms: mit, verhaeltnis: runde2(mit / ohne) };
}

// ---------- Positivprobe ----------
async function probeLauf(browser) {
  const context = await browser.newContext(kontext());
  const protokoll = [];
  await installSperre(context, { protokoll });
  await context.addInitScript(seitenSkript);
  const ereignisse = [];
  const page = await context.newPage();
  await page.exposeFunction('__reaktionEreignis', (e) => { ereignisse.push(e); });
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: DROSSELUNG });
  await page.goto(pathToFileURL(PROBE_DATEI).href, { waitUntil: 'load', timeout: 30000 });
  const kontrolle = await drosselKontrolle(page, cdp);
  const langsam = await misse(ereignisse, () => page.locator('#langsam').tap({ timeout: 10000 }));
  const schnell = await misse(ereignisse, () => page.locator('#schnell').tap({ timeout: 10000 }));
  const erste = ereignisse.find((e) => e.typ === 'first-input');
  await context.close();
  return { langsam, schnell, kontrolle, erste_eingabe: erste ? { name: erste.name, dauer: runde(erste.dauer) } : null, protokoll: protokoll.length };
}

// ---------- Seitenlauf ----------
async function laufSeite(browser, seite, nummer) {
  const context = await browser.newContext(kontext());
  const protokoll = [];
  await installSperre(context, { protokoll });
  await context.addInitScript(seitenSkript);
  await setzeEinwilligung(context, 'abgelehnt', base);
  const ereignisse = [];
  const page = await context.newPage();
  await page.exposeFunction('__reaktionEreignis', (e) => { ereignisse.push(e); });
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: DROSSELUNG });
  const ergebnis = { lauf: nummer, seite, status: null, handlungen: {}, rueckkehr: 0, fehler: null, gegencheck: null };
  let startUrl = null;
  try {
    const resp = await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    ergebnis.status = resp?.status() ?? null;
    if (ergebnis.status !== 200) throw new Error(`HTTP ${ergebnis.status}`);
    await versteckeDevOverlay(page);
    await warteHydriert(page);
    startUrl = page.url();
    const startPfad = new URL(startUrl).pathname;

    const H = {
      hauptknopf: async () => {
        const loc = page.locator('main [data-hauptknopf]').filter({ visible: true }).first();
        if (!(await loc.count())) return null;
        const art = await loc.evaluate((el) => {
          if (el.tagName !== 'A') return 'schaltflaeche';
          const u = new URL(el.getAttribute('href') || '', location.href);
          return u.pathname === location.pathname && u.search === location.search && u.hash ? 'anker' : 'link';
        });
        return {
          ziel: art,
          aktion: async () => {
            if (art === 'link') await page.evaluate(() => { window.__reaktionAbfangen = true; });
            try { await loc.tap({ timeout: 10000 }); } finally {
              await page.evaluate(() => { window.__reaktionAbfangen = false; }).catch(() => {});
            }
          },
        };
      },
      menue: async () => {
        const loc = page.locator('button[popovertarget="mobile-menu"]')
          .or(page.getByRole('button', { name: 'Menü öffnen', exact: true })).filter({ visible: true }).first();
        if (!(await loc.count())) return null;
        return {
          ziel: 'schalter',
          aktion: async () => { await loc.tap({ timeout: 10000 }); await page.keyboard.press('Escape'); },
          danach: async () => ({ offen_nach_escape: (await loc.getAttribute('aria-expanded')) === 'true' }),
        };
      },
      akkordeon: async () => {
        const loc = page.locator('main details > summary, main button[aria-expanded]').filter({ visible: true }).first();
        if (!(await loc.count())) return null;
        return { ziel: 'schalter', aktion: () => loc.tap({ timeout: 10000 }) };
      },
      eingabe: async () => {
        const loc = page.locator(EINGABE_SEL).filter({ visible: true }).first();
        if (!(await loc.count())) return null;
        return {
          ziel: 'eingabe',
          aktion: async () => { await loc.tap({ timeout: 10000 }); await page.keyboard.type('Hallo', { delay: 60 }); },
        };
      },
      link: async () => {
        const kandidaten = page.locator('main a[href^="/"]:not([href^="//"]):not([download])').filter({ visible: true });
        const anzahl = await kandidaten.count();
        let loc = null;
        for (let i = 0; i < anzahl && !loc; i += 1) {
          const href = await kandidaten.nth(i).getAttribute('href');
          if (new URL(href, startUrl).pathname !== startPfad) loc = kandidaten.nth(i);
        }
        if (!loc) return null;
        return {
          ziel: 'link',
          aktion: async () => {
            await loc.tap({ timeout: 10000 });
            await page.waitForURL((u) => u.pathname !== startPfad, { timeout: 10000 }).catch(() => {});
          },
          danach: async () => ({ navigiert_zu: new URL(page.url()).pathname, seitenwechsel: new URL(page.url()).pathname !== startPfad }),
        };
      },
    };

    for (const h of HANDLUNGEN) {
      let akt = null;
      try { akt = await H[h](); } catch (e) { ergebnis.handlungen[h] = { fehler: `Suche: ${String(e.message).split('\n')[0]}`.slice(0, 200) }; continue; }
      if (!akt) { ergebnis.handlungen[h] = { nicht_vorhanden: true }; continue; }
      try {
        const m = await misse(ereignisse, akt.aktion);
        const eintrag = { wert: m.wert, eintraege: m.eintraege, ziel: akt.ziel, fenster: m.fenster };
        if (akt.danach) Object.assign(eintrag, await akt.danach());
        ergebnis.handlungen[h] = eintrag;
      } catch (e) {
        ergebnis.handlungen[h] = { fehler: String(e.message).split('\n')[0].slice(0, 200), ziel: akt.ziel };
      }
      // Ungewollter Seitenwechsel (außer bei der Handlung „link“): zurück auf die Startseite, bevor die nächste Handlung läuft
      if (h !== 'link' && new URL(page.url()).pathname !== new URL(startUrl).pathname) {
        ergebnis.rueckkehr += 1;
        await page.goto(startUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await warteHydriert(page);
      }
    }

    // Gegencheck: die erste Eingabe der Seite (first-input) muss als gleicher Ereigniseintrag im Observer stehen
    const erste = ereignisse.find((e) => e.typ === 'first-input');
    if (erste) {
      const passend = ereignisse.some((e) => e.typ === 'event' && Math.abs(e.start - erste.start) < 1 && Math.abs(e.dauer - erste.dauer) < 0.5);
      const im = Object.entries(ergebnis.handlungen).find(([, v]) => v.fenster
        && erste.start >= v.fenster[0] - TOLERANZ_MS && erste.start <= v.fenster[1] + TOLERANZ_MS);
      ergebnis.gegencheck = {
        erste_eingabe_ms: runde(erste.dauer), handlung: im ? im[0] : null,
        eintrag_im_observer: erste.dauer < EREIGNIS_SCHWELLE_MS ? 'unter Schwelle' : passend ? 'ja' : 'nein',
      };
    }
  } catch (e) {
    ergebnis.fehler = String(e.message).split('\n')[0].slice(0, 300);
  } finally {
    await context.close();
  }
  return ergebnis;
}

function aggregiere(seite, laeufeListe) {
  const handlungen = {};
  for (const h of HANDLUNGEN) {
    const alle = laeufeListe.map((l) => l.handlungen[h]);
    if (alle.length && alle.every((x) => x && x.nicht_vorhanden)) { handlungen[h] = { nicht_vorhanden: true }; continue; }
    const gueltig = alle.filter((x) => x && typeof x.wert === 'number');
    handlungen[h] = {
      werte: gueltig.map((x) => x.wert),
      median: median(gueltig.map((x) => x.wert)),
      fehlende_laeufe: laeufeListe.length - gueltig.length,
      ziel: (gueltig[0] || alle.find(Boolean) || {}).ziel ?? null,
    };
  }
  const mediane = HANDLUNGEN.filter((h) => handlungen[h].median !== null && handlungen[h].median !== undefined);
  const hoechste = mediane.reduce((a, h) => (a === null || handlungen[h].median > handlungen[a].median ? h : a), null);
  const hoechsterMedian = hoechste ? handlungen[hoechste].median : null;
  const unvollstaendig = laeufeListe.some((l) => l.fehler)
    || HANDLUNGEN.some((h) => handlungen[h].fehlende_laeufe > 0 && !handlungen[h].nicht_vorhanden);
  return {
    seite, handlungen, hoechster_median: hoechsterMedian, hoechste_handlung: hoechste,
    bestanden: hoechsterMedian !== null && hoechsterMedian <= SCHWELLE_MS,
    unvollstaendig, laeufe: laeufeListe,
  };
}

// ---------- Ausführung ----------
const { commit, arbeitsbaum } = gitStand();
const browser = await chromium.launch({ args: ['--font-render-hinting=none'], executablePath: process.env.CHROME_PATH || undefined });
const bedingungen = {
  geraet: GERAET, viewport: { width: ANSICHTEN[GERAET].width, height: ANSICHTEN[GERAET].height }, mobil_mit_touch: true, dpr: 1,
  cpu_drosselung: DROSSELUNG, ereignis_schwelle_ms: EREIGNIS_SCHWELLE_MS, schwelle_ms: SCHWELLE_MS, laeufe,
  einwilligung: 'abgelehnt', intro: 'gesehen (Speicher tezgel-intro gesetzt)', hydriert: 'Element mit __reactProps$ vorhanden',
  eingabe: 'antippen (tap, Touch-Emulation); Eingabefeld: 5 Zeichen „Hallo“, kein Absenden',
  messung: 'größter duration-Wert der Ereignisse mit interactionId > 0 im Zeitfenster der Handlung; Median je Handlung über die Läufe; Seitenwert = höchster Median',
  handlungen: HANDLUNGEN, commit, arbeitsbaum, chromium: browser.version(), basisadresse: base,
};

try {
  if (probe) {
    const laeufeProbe = [];
    for (let i = 0; i < laeufe; i += 1) laeufeProbe.push(await probeLauf(browser));
    const med = (f) => median(laeufeProbe.map(f));
    const langsamMed = med((l) => l.langsam.wert);
    const schnellMed = med((l) => l.schnell.wert);
    const verhaeltnisMed = med((l) => l.kontrolle.verhaeltnis);
    const genau = langsamMed > SCHWELLE_MS && schnellMed < SCHWELLE_MS && verhaeltnisMed >= 2;
    console.log(`Probe ${GERAET} · CPU ${DROSSELUNG}× · ${laeufe} Läufe (Median) · Ereignisschwelle ${EREIGNIS_SCHWELLE_MS} ms`);
    console.log(`  langsam (300 ms Rechenschleife): ${langsamMed} ms · Einträge ${laeufeProbe.map((l) => l.langsam.eintraege).join('/')}`);
    console.log(`  schnell (sofortige Antwort):     ${schnellMed} ms · Einträge ${laeufeProbe.map((l) => l.schnell.eintraege).join('/')}`);
    console.log(`  Drosselung: Rechenlast Rate 4 / Rate 1 = ${verhaeltnisMed} (Median; ≥ 2 heißt wirksam)`);
    console.log(`  erste Eingabe (first-input): ${JSON.stringify(laeufeProbe[0].erste_eingabe)}`);
    console.log(genau
      ? `PROBE OK: langsam > ${SCHWELLE_MS} ms, schnell < ${SCHWELLE_MS} ms, Drosselung wirksam.`
      : `PROBE ABWEICHEND: langsam > ${SCHWELLE_MS} ms und schnell < ${SCHWELLE_MS} ms und Verhältnis ≥ 2 erwartet.`);
    const datei = path.join(ziel, 'reaktion.json');
    fs.writeFileSync(datei, JSON.stringify({
      satz, base: pathToFileURL(PROBE_DATEI).href, ziel, erstellt: new Date().toISOString(), bedingungen,
      probe: { langsam_median_ms: langsamMed, schnell_median_ms: schnellMed, verhaeltnis_median: verhaeltnisMed, laeufe: laeufeProbe },
      genau,
    }, null, 1));
    console.log(`Belege: ${datei}`);
    process.exitCode = genau ? 0 : 1;
  } else {
    const seitenErgebnisse = [];
    for (const seite of seiten) {
      const laeufeListe = [];
      for (let n = 1; n <= laeufe; n += 1) {
        const r = await laufSeite(browser, seite, n);
        laeufeListe.push(r);
        process.stdout.write(r.fehler ? 'F' : '.');
      }
      seitenErgebnisse.push(aggregiere(seite, laeufeListe));
    }
    console.log('');
    const bestanden = seitenErgebnisse.filter((s) => s.bestanden && !s.unvollstaendig).length;
    const unvollstaendig = seitenErgebnisse.filter((s) => s.unvollstaendig).length;
    const zusammenfassung = { seiten: seitenErgebnisse.length, bestanden, nicht_bestanden: seitenErgebnisse.length - bestanden - unvollstaendig, unvollstaendig };
    const datei = path.join(ziel, 'reaktion.json');
    fs.writeFileSync(datei, JSON.stringify({ satz, base, ziel, erstellt: new Date().toISOString(), bedingungen, zusammenfassung, seiten: seitenErgebnisse }, null, 1));

    console.log(`\nSatz ${satz} · ${GERAET} · CPU ${DROSSELUNG}× · Median aus ${laeufe} Läufen je Handlung · Schwelle ≤ ${SCHWELLE_MS} ms (ms)`);
    console.log('Seite'.padEnd(26) + HANDLUNGEN.map((h) => NAMEN[h].padStart(10)).join('') + 'Höchster'.padStart(10) + '  Urteil');
    for (const s of seitenErgebnisse) {
      const zellen = HANDLUNGEN.map((h) => {
        const x = s.handlungen[h];
        if (x.nicht_vorhanden) return '—';
        if (x.median === null || x.median === undefined) return 'Fehler';
        return String(x.median);
      });
      const urteil = s.unvollstaendig ? 'unvollständig' : s.bestanden ? 'ok' : `über ${SCHWELLE_MS} ms`;
      console.log(s.seite.padEnd(26) + zellen.map((z) => z.padStart(10)).join('') + String(s.hoechster_median ?? '—').padStart(10) + `  ${urteil}`);
    }
    const fehlerListe = seitenErgebnisse.flatMap((s) => s.laeufe.filter((l) => l.fehler).map((l) => `${s.seite} Lauf ${l.lauf}: ${l.fehler}`));
    if (fehlerListe.length) console.log(`\nLauffehler:\n  ${fehlerListe.join('\n  ')}`);
    console.log(`\nBelege: ${datei}`);
    process.exitCode = fehlerListe.length ? 1 : 0;
  }
} finally {
  await browser.close();
}
