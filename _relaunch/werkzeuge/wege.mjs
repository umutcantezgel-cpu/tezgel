// Wege-Prüfung (P4-07, V-04, Z-06): 308-Weiterleitungen und 410 für Altadressen, gegen einen Reinraum-Build.
// 1. Statisch: Die kompilierten Proxy-matcher des Builds treffen jede entfernte Adresse und keine Seite, kein Asset,
//    keine API-Route („Hauptseiten laufen nicht durch den Proxy“).
// 2. HTTP (lokal am Server des Builds, oder --live mit ≤ 1 Anfrage/s, nur GET/HEAD):
//    410 samt Seite und Sicherheitsköpfen · 308 mit Ziel · Grenzfälle unverändert · (lokal) jede Sitemap-Adresse 200.
// Nutzung: node --experimental-strip-types wege.mjs --build <sha[-k]> [--base http://127.0.0.1:4331] [--live] [--satz <beleg>]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { RELAUNCH, assertLocal, ensureDir } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const SCRATCH = process.env.RELAUNCH_SCRATCH || '/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad';
const build = arg('build');
if (!build) { console.error('--build <sha> fehlt'); process.exit(2); }
const DIR = path.join(SCRATCH, `reinraum-${build}`);
const LIVE = process.argv.includes('--live');
const BASE = LIVE ? 'https://www.tezgel.de' : arg('base', 'http://127.0.0.1:4310');
if (!LIVE) assertLocal(BASE);
const satz = arg('satz', `wege-${build}${LIVE ? '-live' : ''}`);
const AUS = ensureDir(path.join(RELAUNCH, 'belege', satz));

const { ENTFERNTE_BEREICHE, ENTFERNTE_SEITEN, istEntfernt } = await import(pathToFileURL(path.join(DIR, 'src/lib/wege.ts')).href);
const lesen = (p) => JSON.parse(fs.readFileSync(path.join(DIR, '.next', p), 'utf8'));
const fehler = [];
const pruefe = (ok, text) => { if (!ok) fehler.push(text); return ok; };

// ---------- 1. statisch: kompilierte matcher ----------
function matcherAusBuild() {
  const kandidaten = [];
  (function lauf(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) lauf(p);
      else if (/manifest\.json$/.test(e.name)) {
        const text = fs.readFileSync(p, 'utf8');
        if (text.includes('"matchers"')) kandidaten.push(p);
      }
    }
  })(path.join(DIR, '.next'));
  const regexps = new Set();
  for (const p of kandidaten) {
    const suche = (o) => {
      if (!o || typeof o !== 'object') return;
      if (Array.isArray(o.matchers)) o.matchers.forEach((m) => m?.regexp && regexps.add(m.regexp));
      Object.values(o).forEach(suche);
    };
    suche(JSON.parse(fs.readFileSync(p, 'utf8')));
  }
  return { dateien: kandidaten.map((p) => path.relative(DIR, p)), regexps: [...regexps] };
}
const { dateien: manifeste, regexps } = matcherAusBuild();
pruefe(regexps.length > 0, 'keine Proxy-matcher im Build gefunden');
const trifft = (pfad) => regexps.some((r) => new RegExp(r).test(pfad));

const seiten = new Set();
try { Object.keys(lesen('prerender-manifest.json').routes).forEach((r) => seiten.add(r)); } catch { fehler.push('prerender-manifest fehlt'); }
try { Object.values(lesen('app-path-routes-manifest.json')).forEach((r) => seiten.add(r)); } catch { /* optional */ }
const ASSETS = ['/_next/static/chunks/beispiel.js', '/_next/static/media/beispiel.woff2', '/_next/image', '/images/beispiel.webp',
  '/api/anfrage', '/api/indexnow', '/sitemap.xml', '/robots.txt', '/llms.txt', '/video-sitemap.xml', '/icon.png', '/favicon.ico',
  '/bad/budgetkalkulator', '/blog/barrierefreies-bad-planung-zuschuesse'];
const unbeteiligt = [...seiten, ...ASSETS];
const fehlTreffer = unbeteiligt.filter((p) => trifft(p));
pruefe(fehlTreffer.length === 0, `matcher trifft unbeteiligte Adressen: ${fehlTreffer.join(', ')}`);
const entfernt = [...ENTFERNTE_BEREICHE, ...ENTFERNTE_BEREICHE.map((b) => `${b}/unterseite`), ...ENTFERNTE_SEITEN];
const verfehlt = entfernt.filter((p) => !trifft(p));
pruefe(verfehlt.length === 0, `matcher verfehlt entfernte Adressen: ${verfehlt.join(', ')}`);
const seitenEntfernt = [...seiten].filter((p) => istEntfernt(p));
pruefe(seitenEntfernt.length === 0, `istEntfernt trifft Seiten: ${seitenEntfernt.join(', ')}`);

// ---------- 2. HTTP ----------
const warte = (ms) => new Promise((r) => setTimeout(r, ms));
let letzte = 0;
async function holen(pfad, { methode = 'GET' } = {}) {
  if (LIVE) { const rest = 1100 - (Date.now() - letzte); if (rest > 0) await warte(rest); letzte = Date.now(); } // G1
  const r = await fetch(new URL(pfad, BASE), { method: methode, redirect: 'manual' });
  const text = methode === 'HEAD' ? '' : await r.text();
  return { status: r.status, kopf: Object.fromEntries(r.headers), text };
}
const http = [];
const notiere = (pfad, erwartet, r, ok) => { http.push({ pfad, erwartet, status: r.status, ort: r.kopf.location ?? null, ok }); pruefe(ok, `${pfad}: erwartet ${erwartet}, erhalten ${r.status}${r.kopf.location ? ` → ${r.kopf.location}` : ''}`); };

const proben410 = LIVE
  ? [...ENTFERNTE_BEREICHE, '/heizung/waermepumpe', ENTFERNTE_SEITEN[0], ENTFERNTE_SEITEN[ENTFERNTE_SEITEN.length - 1]]
  : [...entfernt, '/heizung/waermepumpe/'];
for (const p of proben410) {
  const r = await holen(p);
  // Abschließender Schrägstrich: Next leitet zuerst auf die Form ohne Schrägstrich (308), die dann 410 liefert.
  if (p.endsWith('/') && p !== '/') { notiere(p, '308 → ohne /', r, r.status === 308 && (r.kopf.location ?? '').endsWith(p.slice(0, -1))); continue; }
  const ok = r.status === 410
    && /text\/html/.test(r.kopf['content-type'] ?? '')
    && r.text.includes('<h1>Seite dauerhaft entfernt</h1>')
    && r.text.includes('href="/"')
    && /noindex/.test(r.kopf['x-robots-tag'] ?? '')
    && Boolean(r.kopf['content-security-policy']) && Boolean(r.kopf['strict-transport-security']) && Boolean(r.kopf['x-content-type-options']);
  notiere(p, '410 + Seite + Köpfe', r, ok);
}
{ const r = await holen(ENTFERNTE_BEREICHE[0], { methode: 'HEAD' }); notiere(`HEAD ${ENTFERNTE_BEREICHE[0]}`, '410', r, r.status === 410); }

for (const [quelle, ziel] of [['/bad/budgetkalkulator', '/bad/projekt-check'], ['/blog/barrierefreies-bad-planung-zuschuesse', '/bad/barrierefreies-bad']]) {
  const r = await holen(quelle);
  notiere(quelle, `308 → ${ziel}`, r, r.status === 308 && new URL(r.kopf.location ?? '', BASE).pathname === ziel);
  const z = await holen(ziel);
  notiere(ziel, '200', z, z.status === 200);
}
for (const [p, s] of [['/heizungen', 404], ['/energie-sparen', 404], ['/referenzen/project-007', 404], ['/blog/fliesen-reinigen-pflegen', 200], ['/', 200]]) {
  const r = await holen(p);
  notiere(p, String(s), r, r.status === s && !r.text.includes('Seite dauerhaft entfernt'));
}

let sitemapZahl = 0;
if (!LIVE) {
  const xml = (await holen('/sitemap.xml')).text;
  const adressen = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  sitemapZahl = adressen.length;
  for (const p of adressen) {
    const r = await holen(p);
    if (r.status !== 200 || r.text.includes('Seite dauerhaft entfernt')) notiere(p, '200 (Sitemap)', r, false);
  }
}

const ergebnis = { build, base: BASE, live: LIVE, manifeste, matcher: regexps.length, unbeteiligt: unbeteiligt.length, entfernt: entfernt.length, sitemap: sitemapZahl, http, fehler };
fs.writeFileSync(path.join(AUS, 'wege.json'), JSON.stringify(ergebnis, null, 2));
console.log(`matcher ${regexps.length} (${manifeste.join(', ')}) · unbeteiligt ${unbeteiligt.length}, Treffer ${fehlTreffer.length} · entfernt ${entfernt.length}, verfehlt ${verfehlt.length}`);
console.log(`HTTP ${http.length} Proben, rot ${http.filter((h) => !h.ok).length}${LIVE ? '' : ` · Sitemap ${sitemapZahl} Adressen geprüft`}`);
console.log(fehler.length ? `ROT\n- ${fehler.join('\n- ')}` : 'GRÜN');
console.log(`→ ${path.relative(RELAUNCH, AUS)}/wege.json`);
process.exit(fehler.length ? 1 : 0);
