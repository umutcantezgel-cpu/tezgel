// Ebene 6 · Leistung (Kriterium Z-12; AUFTRAG Abschnitt 11 Ebene 6, BUDGETS in AUFTRAG/KERN).
// Zweck: Lighthouse mobil + Desktop am lokalen Produktions-Build, Median aus 5 Läufen je Seite und Form; je Lauf das
//   LCP-Element (Selektor, Text, Art, Phasen) – im Median das häufigste Element.
// Modi:
//   einzeln (Standard)      – misst BASE (RELAUNCH_BASE, sonst 127.0.0.1:4310) → belege/<satz>/lighthouse.json
//   verschränkt (--vergleich http://127.0.0.1:<port>) – Läufe abwechselnd Basis/Kandidat (A B A B …) im selben Fenster und
//                             in derselben Chrome-Instanz, je --laeufe (Standard 5); Ergebnis mit Medianen beider Seiten und
//                             Differenz Kandidat − Basis; Hinweis „Grenzbereich“, wenn 2 ≤ |Δ Leistung| ≤ 5 Punkte (dann mit
//                             --laeufe 10 nachmessen); Bewertung nach Z-12 (schlechter jenseits der Streuung = > 3 Punkte
//                             oder > 10 % LCP) → belege/<satz>/lighthouse-vergleich.json
// Nutzung: CHROME_PATH=… node lighthouse.mjs --satz <name> [--seiten /,/bad] [--formen mobil,desktop] [--laeufe 5]
//          [--vergleich http://127.0.0.1:4311] [--aus <datei.json>] [--zusammenfuehren] [--ueberschreiben]
//   --aus: Zusammenfassung an diesen Pfad statt nach belege/<satz>/ (Probeläufe, z. B. nach cache/lighthouse/<satz>/).
//   --zusammenfuehren: vorhandenes Ergebnis laden, nur die gemessenen Seiten/Formen ersetzen.
//   Basis-Schutz: belege/p0-ausgangsstand/lighthouse.json wird nur mit --zusammenfuehren oder --ueberschreiben neu geschrieben.
// Messbedingungen: Erstbesuch (Einwilligungsbanner sichtbar, Speicher je Lauf zurückgesetzt), Dritt-Hosts blockiert,
//   lokale Auslieferung (next start, komprimiert), Lighthouse-Standarddrosselung (mobil simuliert 4× CPU + Slow 4G,
//   Desktop-Preset), Chromium headless. Werkzeugfehler (z. B. NO_NAVSTART) zählen nicht als Lauf: bis zu 3 Wiederholungen.
//   Stehen im Kopf der Ausgabe (bedingungen, umgebung). Rohberichte: cache/lighthouse/<satz>/.
// G5: assertLocal() für BASE und Kandidat; Dritt-Hosts über blockedUrlPatterns (Lighthouse steuert Chrome selbst,
//   installSperre() aus lib.mjs ist Playwright-spezifisch und greift hier nicht).
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { BASE, assertLocal, grundmenge, slug, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
assertLocal();
const KANDIDAT = arg('vergleich') ? arg('vergleich').replace(/\/$/, '') : null;
if (KANDIDAT) assertLocal(KANDIDAT);
const G = grundmenge();
const satz = arg('satz', 'adhoc');
const seiten = arg('seiten') ? arg('seiten').split(',') : G.hauptseiten;
const laeufe = Number(arg('laeufe', '5'));
const formen = (arg('formen') || 'mobil,desktop').split(',');
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const blocked = ['*google-analytics.com*', '*googletagmanager.com*', '*facebook.net*', '*facebook.com*', '*vercel-insights.com*', '*vercel-scripts.com*', '*googleapis.com*', '*gstatic.com*', '*openstreetmap.org*', '*whatsapp.com*', '*wa.me*'];
const rawDir = ensureDir(path.join(RELAUNCH, 'cache', 'lighthouse', satz));
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const ausDatei = arg('aus') ? path.resolve(arg('aus')) : path.join(RELAUNCH, 'belege', satz, KANDIDAT ? 'lighthouse-vergleich.json' : 'lighthouse.json');
const basisDatei = path.join(RELAUNCH, 'belege', 'p0-ausgangsstand', 'lighthouse.json');
if (path.resolve(ausDatei) === basisDatei && fs.existsSync(basisDatei) && !flag('zusammenfuehren') && !flag('ueberschreiben')) {
  throw new Error('ABBRUCH: belege/p0-ausgangsstand/lighthouse.json ist die Lighthouse-Basis – für Probeläufe eigenen --satz oder --aus wählen (oder --ueberschreiben).');
}
const GRENZBEREICH = [2, 5]; // |Δ Leistung| in Punkten: Grenzbereich → 10 Läufe empfehlen
const Z12 = { punkte: 3, lcp_anteil: 0.1 }; // Z-12: schlechter jenseits der Streuung

// ---------------------------------------------------------------- LCP-Element aus dem Bericht (LH 13: lcp-breakdown-insight, LH ≤ 12: largest-contentful-paint-element)
function lcpElement(lhr) {
  const a = lhr.audits;
  const listen = [a['lcp-breakdown-insight'], a['largest-contentful-paint-element']].filter(Boolean).flatMap((x) => x.details?.items || []);
  let knoten = listen.find((x) => x.type === 'node') || null;
  if (!knoten) for (const t of listen) { const n = (t.items || []).find((y) => y.node?.type === 'node'); if (n) { knoten = n.node; break; } }
  const phasenTabelle = listen.find((x) => x.type === 'table' && (x.items || []).some((y) => y.subpart || y.phase));
  const phasen = {};
  for (const p of phasenTabelle?.items || []) phasen[p.subpart || p.phase] = Math.round(p.duration ?? p.timing ?? 0);
  if (!knoten) return { element: null, phasen };
  const snippet = String(knoten.snippet || '');
  // Bild-LCP: Bild-/Video-Knoten oder eine Ressourcen-Phase (Ladeverzögerung/Ladedauer) in der Aufschlüsselung
  const bild = /^<(img|image|video)\b/i.test(snippet) || 'resourceLoadDuration' in phasen || 'loadDuration' in phasen;
  return {
    element: {
      selektor: knoten.selector || null,
      text: String(knoten.nodeLabel || '').replace(/\s+/g, ' ').trim().slice(0, 90),
      snippet: snippet.slice(0, 140),
      art: bild ? 'bild' : 'text',
      pfad: knoten.path || null,
      rechteck: knoten.boundingRect ? { top: knoten.boundingRect.top, left: knoten.boundingRect.left, width: knoten.boundingRect.width, height: knoten.boundingRect.height } : null,
    },
    phasen,
  };
}

// Häufigstes LCP-Element (nach Selektor + Text) mit Anteil
function haeufigstesElement(runs) {
  const zaehl = new Map();
  for (const r of runs) {
    const k = r.lcp_element ? `${r.lcp_element.selektor}␟${r.lcp_element.text}` : '—';
    const z = zaehl.get(k) || { n: 0, element: r.lcp_element };
    z.n++; zaehl.set(k, z);
  }
  const sortiert = [...zaehl.values()].sort((x, y) => y.n - x.n);
  return { ...(sortiert[0].element || { selektor: null }), anteil: `${sortiert[0].n}/${runs.length}`, abweichend: sortiert.slice(1).map((z) => ({ selektor: z.element?.selektor ?? null, text: z.element?.text ?? null, n: z.n })) };
}

const OHNE_MEDIAN = new Set(['reihenfolge', 'werkzeug_wiederholungen']); // Ordnungs-/Zählfelder, keine Messwerte
function medianAus(runs) {
  const m = {};
  for (const key of Object.keys(runs[0])) if (typeof runs[0][key] === 'number' && !OHNE_MEDIAN.has(key)) m[key] = median(runs.map((x) => x[key]));
  m.werkzeug_wiederholungen = runs.reduce((n, x) => n + (x.werkzeug_wiederholungen || 0), 0); // Summe, kein Median
  m.lcp = Math.round(m.lcp); m.tbt = Math.round(m.tbt); m.fcp = Math.round(m.fcp); m.si = Math.round(m.si); m.cls = Number(m.cls.toFixed(3));
  m.lcp_element = haeufigstesElement(runs);
  const phasenNamen = [...new Set(runs.flatMap((r) => Object.keys(r.lcp_phasen || {})))];
  m.lcp_phasen = Object.fromEntries(phasenNamen.map((p) => [p, median(runs.map((r) => r.lcp_phasen?.[p] ?? 0))]));
  m.streuung_perf = [Math.min(...runs.map((r) => r.perf)), Math.max(...runs.map((r) => r.perf))];
  return m;
}

// ---------------------------------------------------------------- Ein Lauf
const chrome = await chromeLauncher.launch({ chromePath: CHROME, chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
const desktopConfig = (await import('lighthouse/core/config/desktop-config.js')).default;
async function lauf(url, form) {
  const config = form === 'desktop' ? desktopConfig : undefined;
  let r, versuch = 0;
  do { r = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], blockedUrlPatterns: blocked, disableStorageReset: false }, config); versuch++; }
  while (r.lhr.runtimeError && versuch < 4);
  if (r.lhr.runtimeError) throw new Error(`${url} ${form}: ${r.lhr.runtimeError.code}`);
  const a = r.lhr.audits;
  const lcp = lcpElement(r.lhr);
  return {
    lhr: r.lhr,
    werte: {
      perf: Math.round(r.lhr.categories.performance.score * 100),
      a11y: Math.round(r.lhr.categories.accessibility.score * 100),
      bp: Math.round(r.lhr.categories['best-practices'].score * 100),
      seo: Math.round(r.lhr.categories.seo.score * 100),
      lcp: a['largest-contentful-paint'].numericValue, cls: a['cumulative-layout-shift'].numericValue, tbt: a['total-blocking-time'].numericValue,
      fcp: a['first-contentful-paint'].numericValue, si: a['speed-index'].numericValue,
      js_kb: Math.round((a['resource-summary']?.details?.items?.find((x) => x.resourceType === 'script')?.transferSize || 0) / 1024),
      font_kb: Math.round((a['resource-summary']?.details?.items?.find((x) => x.resourceType === 'font')?.transferSize || 0) / 1024),
      gesamt_kb: Math.round((a['resource-summary']?.details?.items?.find((x) => x.resourceType === 'total')?.transferSize || 0) / 1024),
      benchmark: r.lhr.environment.benchmarkIndex,
      werkzeug_wiederholungen: versuch - 1,
      lcp_element: lcp.element,
      lcp_phasen: lcp.phasen,
    },
  };
}

// ---------------------------------------------------------------- Kopf
const require = createRequire(import.meta.url);
const umgebung = () => ({ lighthouse: require('lighthouse/package.json').version, chrome: CHROME.match(/chromium-(\d+)/)?.[1] ? `Chromium ${CHROME.match(/chromium-(\d+)/)[1]} (Playwright-Build)` : CHROME, node: process.version, cpus: os.cpus().length, last_1min: +os.loadavg()[0].toFixed(2) });
const BEDINGUNGEN = 'lokal next start (komprimiert), Erstbesuch mit Banner (Speicher je Lauf zurückgesetzt), Dritt-Hosts blockiert, Lighthouse-Standard-Drosselung (mobil: simuliert 4× CPU, Slow 4G; Desktop-Preset), Chromium headless --no-sandbox --disable-gpu, eine Chrome-Instanz für alle Läufe'
  + (KANDIDAT ? `; verschränkt: je Seite und Form ${laeufe} Paare, Reihenfolge A B A B … (A = Basis ${BASE}, B = Kandidat ${KANDIDAT}) im selben Messfenster` : '');
const vorhanden = flag('zusammenfuehren') && fs.existsSync(ausDatei) ? JSON.parse(fs.readFileSync(ausDatei, 'utf8')) : null;
const ergebnis = vorhanden || { satz, base: BASE, ...(KANDIDAT ? { kandidat: KANDIDAT } : {}), modus: KANDIDAT ? 'verschraenkt' : 'einzeln', bedingungen: BEDINGUNGEN, erstellt: null, laeufe, seiten: {} };
ergebnis.erstellt = new Date().toISOString();
ergebnis.umgebung = { ...umgebung(), last_1min_start: +os.loadavg()[0].toFixed(2) };
if (KANDIDAT) ergebnis.schwellen = { grenzbereich_punkte: GRENZBEREICH, z12_schlechter: `Δ Leistung < −${Z12.punkte} Punkte oder Δ LCP > +${Z12.lcp_anteil * 100} %` };

const schreiben = () => { ensureDir(path.dirname(ausDatei)); fs.writeFileSync(ausDatei, JSON.stringify(ergebnis, null, 1)); };
const fmtLcp = (e) => (e?.selektor ? `${e.selektor} „${(e.text || '').slice(0, 40)}“ ${e.anteil || ''}` : '—');

for (const s of seiten) {
  ergebnis.seiten[s] = ergebnis.seiten[s] || {};
  for (const form of formen) {
    if (!KANDIDAT) {
      const runs = [];
      for (let k = 0; k < laeufe; k++) {
        const { lhr, werte } = await lauf(BASE + s, form);
        runs.push(werte);
        fs.writeFileSync(path.join(rawDir, `${slug(s)}-${form}-${k}.report.json`), JSON.stringify(lhr));
        process.stdout.write('.');
      }
      ergebnis.seiten[s][form] = { median: medianAus(runs), laeufe: runs };
      console.log(`\n${s} ${form}: Leistung ${ergebnis.seiten[s][form].median.perf} · LCP ${ergebnis.seiten[s][form].median.lcp} ms · LCP-Element ${fmtLcp(ergebnis.seiten[s][form].median.lcp_element)}`);
    } else {
      const A = [], B = [];
      for (let k = 0; k < laeufe; k++) {
        for (const [seite, ziel, liste] of [['basis', BASE, A], ['kandidat', KANDIDAT, B]]) {
          const { lhr, werte } = await lauf(ziel + s, form);
          liste.push({ ...werte, reihenfolge: 2 * k + (seite === 'basis' ? 0 : 1) });
          fs.writeFileSync(path.join(rawDir, `${slug(s)}-${form}-${k}-${seite}.report.json`), JSON.stringify(lhr));
          process.stdout.write(seite === 'basis' ? 'A' : 'B');
        }
      }
      const mA = medianAus(A), mB = medianAus(B);
      const differenz = {};
      for (const key of Object.keys(mA)) if (typeof mA[key] === 'number' && typeof mB[key] === 'number' && !OHNE_MEDIAN.has(key)) differenz[key] = key === 'cls' ? Number((mB[key] - mA[key]).toFixed(3)) : Math.round((mB[key] - mA[key]) * 10) / 10;
      differenz.lcp_relativ = mA.lcp ? Number(((mB.lcp - mA.lcp) / mA.lcp).toFixed(3)) : null;
      const dPerf = Math.abs(differenz.perf);
      const grenz = dPerf >= GRENZBEREICH[0] && dPerf <= GRENZBEREICH[1];
      const schlechter = differenz.perf < -Z12.punkte || (differenz.lcp_relativ ?? 0) > Z12.lcp_anteil;
      const gleichesLcp = mA.lcp_element?.selektor === mB.lcp_element?.selektor;
      ergebnis.seiten[s][form] = {
        basis: { median: mA, laeufe: A }, kandidat: { median: mB, laeufe: B }, differenz,
        lcp_element_gleich: gleichesLcp,
        hinweis: grenz ? `Grenzbereich: |Δ Leistung| = ${dPerf} Punkte (${GRENZBEREICH[0]}–${GRENZBEREICH[1]}) – mit --laeufe 10 nachmessen` : null,
        z12: schlechter ? 'schlechter jenseits der Streuung' : 'innerhalb der Streuung oder besser',
      };
      console.log(`\n${s} ${form}: Basis ${mA.perf} · Kandidat ${mB.perf} · Δ ${differenz.perf} Punkte · Δ LCP ${differenz.lcp} ms (${(differenz.lcp_relativ * 100).toFixed(1)} %)${grenz ? ' · GRENZBEREICH' : ''} · Z-12: ${ergebnis.seiten[s][form].z12}`);
      console.log(`  LCP-Element A ${fmtLcp(mA.lcp_element)} · B ${gleichesLcp ? 'gleich' : fmtLcp(mB.lcp_element)}`);
    }
    schreiben(); // Zwischenstand nach jeder Seite/Form
  }
}
await chrome.kill();
// Absicherung: chrome-launcher beendet die Prozessgruppe; bliebe der Hauptprozess übrig, wird er hier beendet
try { process.kill(chrome.pid, 0); process.kill(chrome.pid, 'SIGKILL'); } catch { /* bereits beendet */ }
ergebnis.umgebung.last_1min_ende = +os.loadavg()[0].toFixed(2);
schreiben();
console.log(`→ ${path.relative(RELAUNCH, ausDatei)}`);
