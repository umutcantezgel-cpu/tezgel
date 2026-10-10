// Ebene 6: Lighthouse mobil + Desktop am lokalen Build (Standard 127.0.0.1:4310).
// Je Seite und Form: 1 Aufwärmlauf (nicht gezählt, nicht gespeichert), danach --laeufe gezählte Läufe (Standard 3).
// Median: ungerade Anzahl = mittleres Element, gerade = Mittelwert der beiden mittleren; zusätzlich spanne [min, max] je Kennzahl.
// Je Lauf zusätzlich: lcp_element, lcp_phasen, cls_quellen (bis 5), js_top (5 größte Skripte).
// Benchmark-Band ±15 %: Referenz ist der Benchmark-Index des ersten gezählten Laufs der Sitzung. Weicht ein Lauf ab,
// wird er bis zu 2-mal wiederholt; bleibt er außerhalb, trägt er benchmark_abweichung: true.
// Nutzung: CHROME_PATH=… node lighthouse.mjs --satz <name> [--seiten /,/bad | --hauptansichten] [--laeufe 3]
//          [--formen mobil,desktop] [--base URL] [--zusammenfuehren]
// Messbedingungen: Erstbesuch (Einwilligungsbanner sichtbar), Dritt-Hosts blockiert (Muster aus GESPERRTE_HOSTS in lib.mjs),
// lokale Auslieferung (next start, komprimiert). Lighthouse läuft über einen eigenen Chrome; die Sperre ist daher
// blockedUrlPatterns und nicht installSperre (das ist eine Playwright-API).
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, grundmenge, slug, ensureDir, RELAUNCH, GESPERRTE_HOSTS } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', BASE);
assertLocal(base);
const G = grundmenge();
const satz = arg('satz', 'adhoc');
if (process.argv.includes('--hauptansichten') && arg('seiten')) throw new Error('ABBRUCH: --seiten und --hauptansichten bitte nicht zusammen.');
const seiten = process.argv.includes('--hauptansichten')
  ? JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'HAUPTANSICHTEN.json'), 'utf8')).hauptansichten.map((x) => x.pfad)
  : arg('seiten') ? arg('seiten').split(',') : G.hauptseiten;
const laeufe = Number(arg('laeufe', '3'));
if (!Number.isInteger(laeufe) || laeufe < 1) throw new Error(`ABBRUCH: --laeufe braucht eine ganze Zahl ab 1 (erhalten: ${arg('laeufe')}).`);
const formen = (arg('formen') || 'mobil,desktop').split(',');
if (formen.some((f) => !['mobil', 'desktop'].includes(f))) throw new Error(`ABBRUCH: --formen nur mobil und/oder desktop (erhalten: ${formen.join(',')}).`);
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BAND = 0.15;        // Benchmark-Band ±15 %
const WIEDERHOLUNGEN = 2; // bei Abweichung je gezähltem Lauf höchstens 2 Wiederholungen
const ZAHLEN = ['perf', 'a11y', 'bp', 'seo', 'lcp', 'cls', 'tbt', 'fcp', 'si', 'js_kb', 'font_kb', 'gesamt_kb', 'benchmark'];
const rundung = (k, v) => (['lcp', 'tbt', 'fcp', 'si'].includes(k) ? Math.round(v) : k === 'cls' ? Number(v.toFixed(3)) : v);
const abweicht = (wert, ref) => Math.abs(wert - ref) / ref > BAND;

// Blockliste: bisherige Muster plus die Hosts aus GESPERRTE_HOSTS (lib.mjs) in Lighthouse-Form *host*.
// Eine Regel "(^|\.)x\.(a|b)$" wird zu x.a und x.b aufgelöst.
const BLOCKLISTE_BISHER = ['*google-analytics.com*', '*googletagmanager.com*', '*facebook.net*', '*facebook.com*', '*vercel-insights.com*', '*vercel-scripts.com*', '*googleapis.com*', '*gstatic.com*', '*openstreetmap.org*', '*whatsapp.com*', '*wa.me*'];
const alternativen = (s) => { const m = s.match(/\(([^()]*)\)/); return m ? m[1].split('|').flatMap((x) => alternativen(s.replace(m[0], x))) : [s]; };
const hostAusRegel = (re) => re.source.replace(/^\(\^\|\\\.\)/, '').replace(/\$$/, '').replace(/\\\./g, '.');
const blocked = [...new Set([...BLOCKLISTE_BISHER, ...GESPERRTE_HOSTS.flatMap((re) => alternativen(hostAusRegel(re))).map((h) => `*${h}*`)])];
const rawDir = ensureDir(path.join(RELAUNCH, 'cache', 'lighthouse', satz));

// LCP-Element und -Phasen: Lighthouse 13 ersetzt den Audit largest-contentful-paint-element durch lcp-breakdown-insight.
// Dessen Details sind eine Liste aus Phasen-Tabelle (type table) und Knoten (type node).
const lcpListe = (a) => a['lcp-breakdown-insight']?.details?.items ?? [];
function lcpElement(a) {
  const knoten = lcpListe(a).find((x) => x.type === 'node');
  return knoten ? { selector: knoten.selector ?? null, ausschnitt: String(knoten.snippet ?? '').slice(0, 160) } : null;
}
function lcpPhasen(a) {
  const tabelle = lcpListe(a).find((x) => x.type === 'table');
  if (!tabelle) return null;
  const dauer = (teil) => { const z = tabelle.items.find((x) => x.subpart === teil); return typeof z?.duration === 'number' ? Math.round(z.duration) : null; };
  return { ttfb: dauer('timeToFirstByte'), ladeverzoegerung: dauer('resourceLoadDelay'), ladezeit: dauer('resourceLoadDuration'), renderverzoegerung: dauer('elementRenderDelay') };
}
// CLS-Quellen: Insight cls-culprits-insight (Liste aus Cluster-Tabellen; Zeile ohne Knoten = Clustersumme), sonst Audit layout-shifts.
function clsQuellen(a) {
  const d = a['cls-culprits-insight']?.details ?? a['layout-shifts']?.details;
  if (!d) return null;
  const zeilen = d.type === 'list' ? d.items.flatMap((t) => t.items ?? []) : (d.items ?? []);
  return zeilen.filter((z) => z.node?.type === 'node' && typeof z.score === 'number')
    .sort((x, y) => y.score - x.score).slice(0, 5)
    .map((z) => ({ selector: z.node.selector ?? null, wert: Number(z.score.toFixed(4)) }));
}
// Größte Skripte nach Übertragungsgröße (network-requests); Pfad ohne Host bei lokalen Dateien, KB mit einer Nachkommastelle.
function jsTop(a) {
  const zeilen = a['network-requests']?.details?.items;
  if (!zeilen) return null;
  const top = [];
  const skripte = zeilen.filter((z) => String(z.resourceType).toLowerCase() === 'script')
    .sort((x, y) => (y.transferSize || 0) - (x.transferSize || 0));
  for (const z of skripte) {
    if (top.length === 5) break;
    try {
      const u = new URL(z.url);
      const lokal = ['127.0.0.1', 'localhost'].includes(u.hostname);
      top.push({ pfad: u.pathname, ...(lokal ? {} : { host: u.hostname }), kb: Math.round((z.transferSize || 0) / 102.4) / 10 });
    } catch { /* ungültige URL überspringen */ }
  }
  return top;
}
// Kennzahlen eines Laufs aus dem Lighthouse-Ergebnis (LHR).
function werte(lhr) {
  const a = lhr.audits;
  const ressourcen = (typ) => Math.round((a['resource-summary']?.details?.items?.find((x) => x.resourceType === typ)?.transferSize || 0) / 1024);
  return {
    perf: Math.round(lhr.categories.performance.score * 100),
    a11y: Math.round(lhr.categories.accessibility.score * 100),
    bp: Math.round(lhr.categories['best-practices'].score * 100),
    seo: Math.round(lhr.categories.seo.score * 100),
    lcp: a['largest-contentful-paint'].numericValue, cls: a['cumulative-layout-shift'].numericValue, tbt: a['total-blocking-time'].numericValue,
    fcp: a['first-contentful-paint'].numericValue, si: a['speed-index'].numericValue,
    js_kb: ressourcen('script'), font_kb: ressourcen('font'), gesamt_kb: ressourcen('total'),
    benchmark: lhr.environment.benchmarkIndex,
    lcp_element: lcpElement(a), lcp_phasen: lcpPhasen(a), cls_quellen: clsQuellen(a), js_top: jsTop(a),
  };
}
// Median je Kennzahl (ungerade: mittleres Element; gerade: Mittelwert der beiden mittleren) und spanne [min, max].
// lcp_element stammt aus dem Lauf mit dem mittleren LCP-Wert.
function zusammenfassen(laufliste) {
  const median = {};
  const spanne = {};
  for (const k of ZAHLEN) {
    const s = laufliste.map((r) => r[k]).sort((x, y) => x - y);
    const n = s.length;
    const mitte = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
    median[k] = rundung(k, mitte);
    spanne[k] = [rundung(k, s[0]), rundung(k, s[n - 1])];
  }
  const nachLcp = [...laufliste].sort((x, y) => x.lcp - y.lcp);
  median.lcp_element = nachLcp[Math.floor((nachLcp.length - 1) / 2)].lcp_element;
  median.spanne = spanne;
  return median;
}
// Ein Lighthouse-Lauf; Messfehler des Werkzeugs (z. B. NO_NAVSTART) zählen nicht: bis zu 3 Wiederholungen.
async function messe(chrome, s, form, konfig) {
  let r;
  let versuch = 0;
  do {
    r = await lighthouse(base + s, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], blockedUrlPatterns: blocked, disableStorageReset: false }, konfig);
    versuch++;
  } while (r.lhr.runtimeError && versuch < 4);
  if (r.lhr.runtimeError) throw new Error(`${s} ${form}: ${r.lhr.runtimeError.code}`);
  return r.lhr;
}
const konfigFuer = async (form) => (form === 'desktop' ? (await import('lighthouse/core/config/desktop-config.js')).default : undefined);

const vorhanden = process.argv.includes('--zusammenfuehren') && fs.existsSync(path.join(RELAUNCH, 'belege', satz, 'lighthouse.json')) ? JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'belege', satz, 'lighthouse.json'), 'utf8')) : null;
const bedingungen = `lokal next start (komprimiert), Erstbesuch mit Banner, Dritt-Hosts blockiert, Lighthouse-Standard-Drosselung (mobil: simuliert 4× CPU, Slow 4G; Desktop-Preset), Aufwärmlauf, Median aus ${laeufe}, Benchmark-Band ±15 %`;
const ergebnis = { ...(vorhanden || { seiten: {} }), satz, base, laeufe, bedingungen, benchmark_band: BAND };
let referenz = null; // Benchmark-Index des ersten gezählten Laufs der Sitzung

const chrome = await chromeLauncher.launch({ chromePath: CHROME, chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
try {
  for (const s of seiten) {
    ergebnis.seiten[s] = ergebnis.seiten[s] || {};
    for (const form of formen) {
      const konfig = await konfigFuer(form);
      await messe(chrome, s, form, konfig); // Aufwärmlauf: nicht gezählt, nicht gespeichert
      process.stdout.write('a');
      const laufliste = [];
      for (let k = 0; k < laeufe; k++) {
        let lhr = await messe(chrome, s, form, konfig);
        let w = werte(lhr);
        referenz ??= w.benchmark;
        for (let v = 0; v < WIEDERHOLUNGEN && abweicht(w.benchmark, referenz); v++) {
          process.stdout.write('w');
          lhr = await messe(chrome, s, form, konfig);
          w = werte(lhr);
        }
        if (abweicht(w.benchmark, referenz)) w.benchmark_abweichung = true;
        laufliste.push(w);
        fs.writeFileSync(path.join(rawDir, `${slug(s)}-${form}-${k}.report.json`), JSON.stringify(lhr));
        process.stdout.write('.');
      }
      const block = { median: zusammenfassen(laufliste), laeufe: laufliste };
      if (laufliste.some((x) => x.benchmark_abweichung)) block.benchmark_abweichung = true;
      ergebnis.seiten[s][form] = block;
    }
    const e = ergebnis.seiten[s];
    console.log(`\n${s}`);
    for (const form of formen) {
      const m = e[form].median;
      const sp = (k) => `[${m.spanne[k][0]}–${m.spanne[k][1]}]`;
      console.log(`  ${form}: perf ${m.perf} ${sp('perf')} · LCP ${m.lcp} ms ${sp('lcp')} · TBT ${m.tbt} ms ${sp('tbt')} · CLS ${m.cls} ${sp('cls')} · LCP-Element ${m.lcp_element?.selector ?? '–'}${e[form].benchmark_abweichung ? ' · Benchmark außerhalb des Bands' : ''}`);
    }
    if (e.mobil && e.desktop) console.log(`${s}: mobil ${e.mobil.median.perf} (LCP ${e.mobil.median.lcp} ms, TBT ${e.mobil.median.tbt}, CLS ${e.mobil.median.cls}) · desktop ${e.desktop.median.perf}`);
  }
} finally {
  await chrome.kill();
}
ergebnis.benchmark_referenz = referenz;
const out = ensureDir(path.join(RELAUNCH, 'belege', satz));
fs.writeFileSync(path.join(out, 'lighthouse.json'), JSON.stringify(ergebnis, null, 1));
console.log(`\nErgebnis: ${path.join(out, 'lighthouse.json')} · Benchmark-Referenz ${referenz?.toFixed(1)}`);
