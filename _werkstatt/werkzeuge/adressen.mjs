#!/usr/bin/env node
// E0-PRUEF-02c · Adress- und Linkprüfer (K-014). Nur HTTP über fetch (redirect: 'manual'), kein Browser.
// Nutzung: node adressen.mjs --satz <name> [--ziel DIR] [--csv DATEI] [--probe]
// Nur gegen lokale Server (assertLocal, G5). --probe startet einen eigenen Mini-Server und schreibt nur nach $SCRATCH.
//
// Festlegungen (Auslegung des Auftrags, im Bericht genannt):
// - Adressmenge: Sitemap ∪ Links (Breitensuche, gleiche Herkunft, ohne /api/ und /_next/, Fragment #… entfernt)
//   ∪ Quellen der Weiterleitungen aus next.config.ts ∪ 410-Adressen aus src/lib/wege.ts.
//   Platzhalter (:name) und Bereiche werden als Beispieladresse ".../beispiel" aufgelöst und als "wege-platzhalter" markiert.
// - quelle: erste zutreffende Marke in der Reihenfolge sitemap, link, weiterleitung, wege.
// - canonical_ok: "ja" nur, wenn der Canonical-Wert genau SITE + Pfad ohne Abschlussschrägstrich ist (Start: SITE ohne /).
// - jsonld_gueltig: "ja", wenn jeder JSON-LD-Block parsebar ist und @context hat; "nein" sonst; leer ohne Block.
// - eingehende_links: Zahl der verschiedenen Seiten, die auf die Adresse verlinken (ohne Selbstlink).
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { BASE, REPO, SCRATCH, assertLocal } from './lib.mjs';

const SITE = 'https://www.tezgel.de'; // src/lib/schema.ts (SITE_URL)
const EIGENE_HOSTS = ['tezgel.de', 'www.tezgel.de'];
const PARALLEL = 6;
const TIMEOUT_MS = 30000;
const UA = 'tezgel-adresspruefer/E0-PRUEF-02c';
const CSV_KOPF = ['adresse', 'status', 'ziel', 'titel', 'titel_laenge', 'beschreibung', 'beschreibung_laenge',
  'h1_anzahl', 'h1', 'canonical', 'canonical_ok', 'robots', 'jsonld_gueltig', 'jsonld_typen', 'in_sitemap',
  'eingehende_links', 'quelle'];

// ---------- HTML-Hilfen (ohne Abhängigkeiten) ----------
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', auml: 'ä', ouml: 'ö', uuml: 'ü',
  Auml: 'Ä', Ouml: 'Ö', Uuml: 'Ü', szlig: 'ß', ndash: '–', mdash: '—', bdquo: '„', ldquo: '“', rdquo: '”',
  hellip: '…', euro: '€', copy: '©', laquo: '«', raquo: '»' };

function entschluessle(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      try { return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)); }
      catch { return m; }
    }
    return ENT[e] ?? m;
  });
}

function reinText(s) {
  return entschluessle(s.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
}

function metaWert(html, name) {
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const n = /\sname=["']([^"']*)["']/i.exec(tag);
    if (!n || n[1].toLowerCase() !== name) continue;
    const c = /\scontent=(?:"([^"]*)"|'([^']*)')/i.exec(tag);
    return c ? entschluessle(c[1] ?? c[2] ?? '').trim() : '';
  }
  return null;
}

function canonicalWert(html) {
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/\srel=["']canonical["']/i.test(tag)) continue;
    const h = /\shref=(?:"([^"]*)"|'([^']*)')/i.exec(tag);
    return h ? entschluessle(h[1] ?? h[2] ?? '').trim() : '';
  }
  return null;
}

function hatContext(o) {
  return Array.isArray(o) ? o.length > 0 && o.every(hatContext) : !!o && typeof o === 'object' && '@context' in o;
}

function sammleTypen(o, out) {
  if (Array.isArray(o)) { o.forEach((x) => sammleTypen(x, out)); return; }
  if (!o || typeof o !== 'object') return;
  if ('@type' in o) {
    const t = o['@type'];
    (Array.isArray(t) ? t : [t]).forEach((x) => { if (typeof x === 'string') out.push(x); });
  }
  for (const v of Object.values(o)) if (v && typeof v === 'object') sammleTypen(v, out);
}

function jsonLd(html) {
  const bloecke = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (!bloecke.length) return { gueltig: '', typen: '' };
  let gueltig = true;
  const typen = [];
  for (const b of bloecke) {
    let obj;
    try { obj = JSON.parse(b); } catch { gueltig = false; continue; }
    if (!hatContext(obj)) gueltig = false;
    sammleTypen(obj, typen);
  }
  return { gueltig: gueltig ? 'ja' : 'nein', typen: [...new Set(typen)].join(', ') };
}

function seitenDaten(html) {
  const titelM = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => reinText(m[1]));
  return {
    titel: titelM ? reinText(titelM[1]) : '',
    beschreibung: metaWert(html, 'description') ?? '',
    h1Anzahl: h1s.length,
    h1: h1s[0] ?? '',
    canonical: canonicalWert(html),
    robots: metaWert(html, 'robots') ?? '',
    jsonld: jsonLd(html),
  };
}

// Links: nur <a href>, Fragment fällt weg (URL-Parser), gleiche Herkunft, ohne /api/ und /_next/.
function linksAus(html, quelle, base, origin) {
  const ziele = [];
  const absolut = [];
  for (const m of html.matchAll(/<a\b[^>]*?\shref=(?:"([^"]*)"|'([^']*)')/gi)) {
    const roh = entschluessle(m[1] ?? m[2] ?? '').trim();
    let u;
    try { u = new URL(roh, base + quelle); } catch { continue; }
    if (u.origin !== origin) {
      if (/^https?:$/.test(u.protocol) && EIGENE_HOSTS.includes(u.hostname)) absolut.push(u.pathname + u.search);
      continue;
    }
    if (u.pathname === '/api' || u.pathname.startsWith('/api/') || u.pathname.startsWith('/_next/')) continue;
    ziele.push(u.pathname + u.search);
  }
  return { ziele, absolut };
}

function normalZiel(loc, base, p) {
  try {
    const u = new URL(loc, base + p);
    return u.origin === new URL(base).origin ? u.pathname + u.search : loc;
  } catch { return loc; }
}

// ---------- Quellen aus dem Repo (nur lesen) ----------
function quellenAusRepo() {
  const wegeText = fs.readFileSync(path.join(REPO, 'src/lib/wege.ts'), 'utf8');
  const block = (name) => {
    const m = wegeText.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`));
    if (!m) throw new Error(`ABBRUCH: ${name} in src/lib/wege.ts nicht gefunden`);
    return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
  };
  const aufloesen = (p) => p.replace(/\/:\w+\*?/g, '/beispiel');
  const wege = new Map();
  for (const b of block('ENTFERNTE_BEREICHE')) {
    wege.set(b, 'wege');
    wege.set(`${b}/beispiel`, 'wege-platzhalter'); // Bereich: Unterseite als Beispiel, markiert
  }
  for (const s of block('ENTFERNTE_SEITEN')) {
    if (/\/:\w/.test(s)) wege.set(aufloesen(s), 'wege-platzhalter');
    else wege.set(s, 'wege');
  }
  const cfgText = fs.readFileSync(path.join(REPO, 'next.config.ts'), 'utf8');
  const rm = cfgText.match(/async redirects\(\) \{([\s\S]*?)\n  \},/);
  if (!rm) throw new Error('ABBRUCH: redirects() in next.config.ts nicht gefunden');
  const weiterleitungQuellen = [...rm[1].matchAll(/source:\s*'([^']+)',\s*destination:\s*'([^']+)'/g)]
    .map((m) => (/\/:\w/.test(m[1]) ? aufloesen(m[1]) : m[1]));
  return { wege, weiterleitungQuellen };
}

// ---------- Abruf und Lauf ----------
async function abrufen(base, pfad) {
  try {
    const r = await fetch(base + pfad, {
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': UA, accept: 'text/html,*/*;q=0.5' },
    });
    const location = r.headers.get('location');
    const ct = r.headers.get('content-type') || '';
    const text = await r.text();
    return { status: r.status, location, html: ct.includes('text/html') ? text : '' };
  } catch (e) {
    return { status: 0, location: null, html: '', fehler: String(e.cause?.code || e.message) };
  }
}

async function laufe(liste, n, fn) {
  const out = new Map();
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, liste.length) }, async () => {
    while (i < liste.length) {
      const p = liste[i++];
      out.set(p, await fn(p));
    }
  }));
  return out;
}

async function pruefe({ base, weiterleitungQuellen, wege }) {
  const origin = new URL(base).origin;
  const sRes = await fetch(`${base}/sitemap.xml`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!sRes.ok) throw new Error(`ABBRUCH: ${base}/sitemap.xml liefert ${sRes.status}`);
  const sitemap = new Set([...(await sRes.text()).matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
    .map((m) => new URL(entschluessle(m[1])).pathname));

  const info = new Map();
  const k = (p) => {
    if (!info.has(p)) info.set(p, { sitemap: false, link: false, weiterleitung: false, wege: '', eingehend: new Set() });
    return info.get(p);
  };
  const seen = new Set();
  let queue = [];
  const vormerken = (p) => { if (!seen.has(p)) { seen.add(p); queue.push(p); } };
  vormerken('/');
  for (const p of sitemap) { k(p).sitemap = true; vormerken(p); }
  for (const p of weiterleitungQuellen) { k(p).weiterleitung = true; vormerken(p); }
  for (const [p, marke] of wege) { k(p).wege = marke; vormerken(p); }

  const antwort = new Map();
  const absolutGesamt = new Set();
  while (queue.length) {
    const charge = queue;
    queue = [];
    const ergebnisse = await laufe(charge, PARALLEL, (p) => abrufen(base, p));
    for (const [p, a] of ergebnisse) {
      antwort.set(p, a);
      if (a.location) {
        const t = normalZiel(a.location, base, p);
        if (t.startsWith('/') && !t.startsWith('//')) { k(t).weiterleitung = true; vormerken(t); }
      }
      if (a.html) {
        const { ziele, absolut } = linksAus(a.html, p, base, origin);
        for (const z of new Set(ziele)) {
          k(z).link = true;
          if (z !== p) k(z).eingehend.add(p);
          vormerken(z);
        }
        for (const x of absolut) absolutGesamt.add(`${p} → ${x}`);
      }
    }
  }

  const adressen = [...seen].sort();
  const seiteSet = new Set();
  const zeilen = adressen.map((p) => {
    const a = antwort.get(p);
    const i = k(p);
    const seite = a.status === 200 && a.html !== '';
    if (seite) seiteSet.add(p);
    const quelle = i.sitemap ? 'sitemap' : i.link ? 'link' : i.weiterleitung ? 'weiterleitung' : (i.wege || 'unbekannt');
    const z = {
      adresse: p, status: a.status, ziel: a.location ? normalZiel(a.location, base, p) : '',
      titel: '', titel_laenge: '', beschreibung: '', beschreibung_laenge: '', h1_anzahl: '', h1: '',
      canonical: '', canonical_ok: '', robots: '', jsonld_gueltig: '', jsonld_typen: '',
      in_sitemap: i.sitemap ? 'ja' : 'nein', eingehende_links: i.eingehend.size, quelle,
    };
    if (seite) {
      const d = seitenDaten(a.html);
      const erwartet = SITE + (p === '/' ? '' : p);
      Object.assign(z, {
        titel: d.titel, titel_laenge: d.titel.length,
        beschreibung: d.beschreibung, beschreibung_laenge: d.beschreibung.length,
        h1_anzahl: d.h1Anzahl, h1: d.h1,
        canonical: d.canonical ?? '', canonical_ok: d.canonical === erwartet ? 'ja' : 'nein',
        robots: d.robots, jsonld_gueltig: d.jsonld.gueltig, jsonld_typen: d.jsonld.typen,
      });
    }
    return z;
  });

  const befund = {
    gesamt: zeilen.length, status: {}, h1_nicht_eins: [], canonical_auffaellig: [], titel_fehlt: [],
    titel_zu_lang: [], beschreibung_ausserhalb: [], jsonld_ungueltig: [], weiterleitungen: [], kaputt: [],
    entfernt_410: [], andere: [], absolut: [...absolutGesamt].sort(),
  };
  for (const z of zeilen) {
    const st = z.status;
    befund.status[st] = (befund.status[st] || 0) + 1;
    if (st >= 300 && st < 400) befund.weiterleitungen.push({ adresse: z.adresse, status: st, ziel: z.ziel });
    if (!(st === 200 || st === 404 || st === 410 || (st >= 300 && st < 400))) befund.andere.push({ adresse: z.adresse, status: st });
    if (seiteSet.has(z.adresse)) {
      if (z.h1_anzahl !== 1) befund.h1_nicht_eins.push({ adresse: z.adresse, anzahl: z.h1_anzahl });
      if (z.canonical_ok !== 'ja') befund.canonical_auffaellig.push({ adresse: z.adresse, canonical: z.canonical || '(fehlt)' });
      if (z.titel_laenge === 0) befund.titel_fehlt.push(z.adresse);
      else if (z.titel_laenge > 60) befund.titel_zu_lang.push({ adresse: z.adresse, laenge: z.titel_laenge });
      if (z.beschreibung_laenge < 120 || z.beschreibung_laenge > 155) befund.beschreibung_ausserhalb.push({ adresse: z.adresse, laenge: z.beschreibung_laenge });
      if (z.jsonld_gueltig === 'nein') befund.jsonld_ungueltig.push(z.adresse);
    }
  }
  for (const p of adressen) {
    const st = antwort.get(p).status;
    const quellen = [...k(p).eingehend].sort();
    if (st === 410) for (const q of quellen) befund.entfernt_410.push({ quelle: q, ziel: p, status: 410 });
    else if (st >= 400 || st === 0) for (const q of quellen) befund.kaputt.push({ quelle: q, ziel: p, status: st });
  }

  const quelleZaehl = {};
  for (const z of zeilen) quelleZaehl[z.quelle] = (quelleZaehl[z.quelle] || 0) + 1;
  return {
    zeilen, befund, quelleZaehl,
    seeds: { sitemap: sitemap.size, weiterleitungQuellen: weiterleitungQuellen.length, wege: wege.size },
    platzhalter: adressen.filter((p) => k(p).wege === 'wege-platzhalter'),
    stand: new Date().toISOString(),
  };
}

// ---------- Ausgabe ----------
function csvFeld(v) {
  const s = v === null || v === undefined ? '' : String(v);
  return /[;"\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function zusammenfassung({ satz, base, lauf }) {
  const b = lauf.befund;
  const L = [];
  const liste = (arr, f) => (arr.length ? arr.map((x) => `- ${f(x)}`) : ['- keine']);
  const anz3xx = b.weiterleitungen.length;
  const n308 = b.weiterleitungen.filter((w) => w.status === 308).length;
  const seiten = lauf.zeilen.filter((z) => z.status === 200 && z.titel !== undefined && z.canonical_ok !== '').length;
  L.push(`# Adressen-Zusammenfassung · Satz ${satz}`, '');
  L.push(`Werkzeug: _werkstatt/werkzeuge/adressen.mjs · Basis: ${base} · Stand: ${lauf.stand}`, '');
  L.push('## Adressen und Status', '');
  L.push(`- Adressen gesamt: ${b.gesamt}`);
  L.push(`- 200: ${b.status[200] || 0}`);
  L.push(`- 308: ${n308}`);
  L.push(`- andere Weiterleitungen (3xx): ${anz3xx - n308}`);
  L.push(`- 404: ${b.status[404] || 0}`);
  L.push(`- 410: ${b.status[410] || 0}`);
  L.push(`- andere: ${b.andere.length}`);
  L.push(...liste(b.andere, (x) => `${x.adresse} (Status ${x.status})`), '');
  L.push(`Status-Verteilung roh: ${Object.entries(b.status).map(([c, n]) => `${c}=${n}`).join(', ')}`);
  L.push(`Quelle der Adressen: ${Object.entries(lauf.quelleZaehl).map(([q, n]) => `${q}=${n}`).join(', ')}`);
  L.push(`Startmengen: Sitemap ${lauf.seeds.sitemap}, Weiterleitungsquellen ${lauf.seeds.weiterleitungQuellen}, 410-Einträge aus wege.ts ${lauf.seeds.wege}`);
  L.push(`Platzhalter-Beispieladressen (markiert): ${lauf.platzhalter.join(', ') || 'keine'}`, '');
  L.push(`## Seiten (Status 200, HTML): ${seiten}`, '');
  L.push(`- H1-Zahl ungleich 1: ${b.h1_nicht_eins.length}`);
  L.push(...liste(b.h1_nicht_eins, (x) => `${x.adresse} (${x.anzahl} H1)`));
  L.push(`- ohne Canonical oder Canonical abweichend: ${b.canonical_auffaellig.length}`);
  L.push(...liste(b.canonical_auffaellig, (x) => `${x.adresse}: ${x.canonical}`));
  L.push(`- Titel über 60 Zeichen: ${b.titel_zu_lang.length}`);
  L.push(...liste(b.titel_zu_lang, (x) => `${x.adresse} (${x.laenge} Zeichen)`));
  L.push(`- Titel fehlt: ${b.titel_fehlt.length}`);
  L.push(...liste(b.titel_fehlt, (x) => x));
  L.push(`- Beschreibung außerhalb 120 bis 155 Zeichen (fehlend zählt mit): ${b.beschreibung_ausserhalb.length}`);
  L.push(...liste(b.beschreibung_ausserhalb, (x) => `${x.adresse} (${x.laenge} Zeichen)`));
  L.push(`- JSON-LD ungültig (kein Parse oder ohne @context): ${b.jsonld_ungueltig.length}`);
  L.push(...liste(b.jsonld_ungueltig, (x) => x), '');
  L.push('## Links', '');
  L.push(`- kaputte interne Links (4xx, 5xx, Fehler; ohne 410): ${b.kaputt.length}`);
  L.push(...liste(b.kaputt, (x) => `${x.quelle} → ${x.ziel} (${x.status})`));
  L.push(`- Links auf absichtlich entfernte Adressen (410): ${b.entfernt_410.length}`);
  L.push(...liste(b.entfernt_410, (x) => `${x.quelle} → ${x.ziel} (410)`));
  L.push(`- absolute Links auf tezgel.de (nicht geprüft, andere Herkunft als ${base}): ${b.absolut.length}`);
  L.push(...liste(b.absolut, (x) => x), '');
  L.push('## Weiterleitungen (3xx)', '');
  L.push(...liste(b.weiterleitungen, (x) => `${x.adresse} → ${x.ziel} (${x.status})`), '');
  return L.join('\n');
}

function schreibe({ ziel, csv, lauf, satz, base }) {
  fs.mkdirSync(ziel, { recursive: true });
  fs.mkdirSync(path.dirname(csv), { recursive: true });
  const zeile = (werte) => werte.map(csvFeld).join(';');
  fs.writeFileSync(csv, [zeile(CSV_KOPF), ...lauf.zeilen.map((z) => zeile(CSV_KOPF.map((k) => z[k])))].join('\n') + '\n', 'utf8');
  const links = {
    satz, basis: base, stand: lauf.stand,
    kaputt: lauf.befund.kaputt,
    entfernt_410: lauf.befund.entfernt_410,
    absolut_selber_host_ungeprueft: lauf.befund.absolut,
  };
  fs.writeFileSync(path.join(ziel, 'links.json'), JSON.stringify(links, null, 2) + '\n', 'utf8');
  fs.writeFileSync(path.join(ziel, 'adressen-zusammenfassung.md'), zusammenfassung({ satz, base, lauf }), 'utf8');
}

// ---------- Positivprobe ----------
const PROBE_BESCHR = 'Probeseite des Adressprüfers mit einer Beschreibung, die ungefähr so lang ist wie eine echte Seitenbeschreibung auf tezgel.de.';
function probeHtml(titel, pfad, koerper) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${titel}</title><meta name="description" content="${PROBE_BESCHR}"><link rel="canonical" href="${SITE}${pfad === '/' ? '' : pfad}"></head><body>${koerper}</body></html>`;
}
const PROBE_SEITEN = {
  '/': () => probeHtml('Probe Start', '/', '<h1>Start</h1><a href="/zwei-h1">a</a><a href="/kaputt">b</a><a href="/alt">c</a><a href="/jsonld">d</a><a href="/neu">e</a><a href="/#oben">f</a><a href="/api/anfrage">g</a><a href="https://beispiel-extern.invalid/">h</a><a href="https://www.tezgel.de/bad">i</a>'),
  '/zwei-h1': () => probeHtml('Probe zwei H1', '/zwei-h1', '<h1>Erster</h1><h1>Zweiter</h1>'),
  '/kaputt': () => probeHtml('Probe kaputt', '/kaputt', '<h1>Kaputt</h1><a href="/fehlt">fehlt</a>'),
  '/neu': () => probeHtml('Probe neu', '/neu', '<h1>Neu</h1>'),
  '/jsonld': () => probeHtml('Probe JSON', '/jsonld', '<h1>JSON</h1><script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage",}</script>'),
};

function probeServer() {
  return http.createServer((req, res) => {
    const pfad = new URL(req.url, 'http://probe.invalid').pathname;
    if (pfad === '/alt') { res.writeHead(308, { Location: '/neu' }); return res.end(); }
    if (pfad === '/sitemap.xml') {
      res.writeHead(200, { 'content-type': 'application/xml; charset=utf-8' });
      const locs = ['/', '/zwei-h1', '/kaputt', '/jsonld', '/neu'].map((p) => `<url><loc>${SITE}${p === '/' ? '' : p}</loc></url>`).join('');
      return res.end(`<?xml version="1.0" encoding="UTF-8"?><urlset>${locs}</urlset>`);
    }
    const seite = PROBE_SEITEN[pfad];
    if (seite) { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(seite()); }
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('nicht gefunden');
  });
}

function kanon(x) {
  return JSON.stringify(x, (k, v) => (v && typeof v === 'object' && !Array.isArray(v)
    ? Object.fromEntries(Object.keys(v).sort().map((s) => [s, v[s]])) : v));
}

async function probe() {
  const srv = probeServer();
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${srv.address().port}`;
  let lauf;
  try {
    lauf = await pruefe({ base, weiterleitungQuellen: [], wege: new Map() });
  } finally {
    srv.close();
    srv.closeAllConnections();
  }
  const ziel = path.join(SCRATCH, 'E0-PRUEF-02c', 'probe');
  schreibe({ ziel, csv: path.join(ziel, 'adressen-probe.csv'), lauf, satz: 'probe', base });
  const b = lauf.befund;
  const ist = {
    gesamt: b.gesamt, status: b.status, h1_nicht_eins: b.h1_nicht_eins, canonical_auffaellig: b.canonical_auffaellig,
    titel_fehlt: b.titel_fehlt, titel_zu_lang: b.titel_zu_lang, beschreibung_ausserhalb: b.beschreibung_ausserhalb,
    jsonld_ungueltig: b.jsonld_ungueltig, weiterleitungen: b.weiterleitungen, kaputt: b.kaputt,
    entfernt_410: b.entfernt_410, andere: b.andere, absolut: b.absolut,
  };
  const erwartet = {
    gesamt: 7, status: { 200: 5, 308: 1, 404: 1 },
    h1_nicht_eins: [{ adresse: '/zwei-h1', anzahl: 2 }],
    canonical_auffaellig: [], titel_fehlt: [], titel_zu_lang: [], beschreibung_ausserhalb: [],
    jsonld_ungueltig: ['/jsonld'],
    weiterleitungen: [{ adresse: '/alt', status: 308, ziel: '/neu' }],
    kaputt: [{ quelle: '/kaputt', ziel: '/fehlt', status: 404 }],
    entfernt_410: [], andere: [], absolut: ['/ → /bad'],
  };
  const ok = kanon(ist) === kanon(erwartet);
  console.log(`PROBE ${ok ? 'BESTANDEN' : 'FEHLGESCHLAGEN'} · Ausgabe ${ziel}`);
  if (!ok) {
    console.log('ist:', kanon(ist));
    console.log('erwartet:', kanon(erwartet));
  }
  process.exitCode = ok ? 0 : 1;
}

// ---------- Start ----------
function argumente(argv) {
  const opt = { satz: null, ziel: null, csv: null, probe: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--probe') opt.probe = true;
    else if (a === '--satz') opt.satz = argv[++i];
    else if (a === '--ziel') opt.ziel = argv[++i];
    else if (a === '--csv') opt.csv = argv[++i];
    else throw new Error(`unbekannte Option ${a}`);
  }
  return opt;
}

async function main() {
  const opt = argumente(process.argv.slice(2));
  assertLocal(BASE);
  if (opt.probe) return probe();
  if (!opt.satz) throw new Error('ABBRUCH: --satz fehlt');
  const ziel = path.resolve(REPO, opt.ziel || `_werkstatt/belege/${opt.satz}`);
  const csv = path.resolve(REPO, opt.csv || `_werkstatt/adressen-${opt.satz}.csv`);
  const { weiterleitungQuellen, wege } = quellenAusRepo();
  const lauf = await pruefe({ base: BASE, weiterleitungQuellen, wege });
  schreibe({ ziel, csv, lauf, satz: opt.satz, base: BASE });
  console.log(`Adressen gesamt ${lauf.befund.gesamt} · CSV ${csv} · Belege ${ziel}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});
