// Ebene 6: Lighthouse mobil + Desktop, Median aus 5 Läufen je Seite, am lokalen Produktions-Build.
// Nutzung: CHROME_PATH=… node lighthouse.mjs --satz <name> [--seiten /,/bad] [--laeufe 5]
// Messbedingungen: Erstbesuch (Einwilligungsbanner sichtbar), Dritt-Hosts blockiert, lokale Auslieferung (next start, komprimiert).
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, grundmenge, slug, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
assertLocal();
const G = grundmenge();
const satz = arg('satz', 'adhoc');
const seiten = arg('seiten') ? arg('seiten').split(',') : G.hauptseiten;
const laeufe = Number(arg('laeufe', '5'));
const formen = (arg('formen') || 'mobil,desktop').split(',');
// Messfehler des Werkzeugs (z. B. NO_NAVSTART) zählen nicht als Lauf: bis zu 3 Wiederholungen je Lauf
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const blocked = ['*google-analytics.com*', '*googletagmanager.com*', '*facebook.net*', '*facebook.com*', '*vercel-insights.com*', '*vercel-scripts.com*', '*googleapis.com*', '*gstatic.com*', '*openstreetmap.org*', '*whatsapp.com*', '*wa.me*'];
const rawDir = ensureDir(path.join(RELAUNCH, 'cache', 'lighthouse', satz));
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

const chrome = await chromeLauncher.launch({ chromePath: CHROME, chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
const vorhanden = process.argv.includes('--zusammenfuehren') && fs.existsSync(path.join(RELAUNCH, 'belege', satz, 'lighthouse.json')) ? JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'belege', satz, 'lighthouse.json'), 'utf8')) : null;
const ergebnis = vorhanden || { satz, base: BASE, laeufe, bedingungen: 'lokal next start (komprimiert), Erstbesuch mit Banner, Dritt-Hosts blockiert, Lighthouse-Standard-Drosselung (mobil: simuliert 4× CPU, Slow 4G; Desktop-Preset)', seiten: {} };
for (const s of seiten) {
  ergebnis.seiten[s] = ergebnis.seiten[s] || {};
  for (const form of formen) {
    const runs = [];
    for (let k = 0; k < laeufe; k++) {
      const config = form === 'desktop' ? (await import('lighthouse/core/config/desktop-config.js')).default : undefined;
      let r, versuch = 0;
      do { r = await lighthouse(BASE + s, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], blockedUrlPatterns: blocked, disableStorageReset: false }, config); versuch++; }
      while (r.lhr.runtimeError && versuch < 4);
      if (r.lhr.runtimeError) throw new Error(`${s} ${form}: ${r.lhr.runtimeError.code}`);
      const a = r.lhr.audits;
      runs.push({
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
      });
      fs.writeFileSync(path.join(rawDir, `${slug(s)}-${form}-${k}.report.json`), JSON.stringify(r.lhr));
      process.stdout.write('.');
    }
    const m = {};
    for (const key of Object.keys(runs[0])) m[key] = median(runs.map((x) => x[key]));
    m.lcp = Math.round(m.lcp); m.tbt = Math.round(m.tbt); m.fcp = Math.round(m.fcp); m.si = Math.round(m.si); m.cls = Number(m.cls.toFixed(3));
    ergebnis.seiten[s][form] = { median: m, laeufe: runs };
  }
  if (ergebnis.seiten[s].mobil && ergebnis.seiten[s].desktop) console.log(`\n${s}: mobil ${ergebnis.seiten[s].mobil.median.perf} (LCP ${ergebnis.seiten[s].mobil.median.lcp} ms, TBT ${ergebnis.seiten[s].mobil.median.tbt}, CLS ${ergebnis.seiten[s].mobil.median.cls}) · desktop ${ergebnis.seiten[s].desktop.median.perf}`);
}
await chrome.kill();
const out = ensureDir(path.join(RELAUNCH, 'belege', satz));
fs.writeFileSync(path.join(out, 'lighthouse.json'), JSON.stringify(ergebnis, null, 1));
