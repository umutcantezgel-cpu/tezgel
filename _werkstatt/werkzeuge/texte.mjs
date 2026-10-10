// Text- und SEO-Invarianten (Ebene 7 + Unantastbar-Schutz): extrahiert je Seite und Ansicht Texte, Metadaten, JSON-LD, Links
// sowie die Wortfolge je Block (header, main, footer und jedes sichtbare [role=dialog]).
// Nutzung: node texte.mjs --satz <name> [--seiten /,/bad | --hauptansichten] [--ansichten d1440,m390] [--base URL] [--ziel DIR]
//   Ziel (Standard belege/<satz>, mit --ziel DIR stattdessen DIR; so schreibt Prüfstufe A nach _werkstatt/cache/texte/<Kennung>).
//   d1440 (Standard): <ziel>/texte/<slug>.json (bisheriger Dateiname).
//   Mehrere Ansichten: je Ansicht <ziel>/texte/<slug>@<ansicht>.json, d1440 zusätzlich als <slug>.json.
//   Index: <ziel>/texte-index.json (Schlüssel "/pfad" für d1440, sonst "/pfad@ansicht").
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { BASE, ANSICHTEN, assertLocal, installSperre, setzeEinwilligung, bereit, grundmenge, slug, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', BASE);
assertLocal(base);
const G = grundmenge();
const satz = arg('satz', 'adhoc');
if (process.argv.includes('--hauptansichten') && arg('seiten')) throw new Error('ABBRUCH: --seiten und --hauptansichten bitte nicht zusammen.');
const seiten = process.argv.includes('--hauptansichten')
  ? JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'HAUPTANSICHTEN.json'), 'utf8')).hauptansichten.map((x) => x.pfad)
  : arg('seiten') ? arg('seiten').split(',') : G.seiten;
const ansichten = (arg('ansichten') || 'd1440').split(',');
if (ansichten.some((a) => !ANSICHTEN[a])) throw new Error(`ABBRUCH: unbekannte Ansicht in --ansichten (erlaubt: ${Object.keys(ANSICHTEN).join(', ')}).`);
const ziel = arg('ziel') ? path.resolve(arg('ziel')) : path.join(RELAUNCH, 'belege', satz);
const out = ensureDir(path.join(ziel, 'texte'));
const h = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
// Index-Schlüssel: d1440 bleibt "/pfad" (bisherige Datei), andere Ansichten "/pfad@ansicht".
const schluessel = (s, a) => (a === 'd1440' ? s : `${s}@${a}`);
// Dateien: d1440 immer als <slug>.json (bisherige Datei); bei mehreren Ansichten zusätzlich <slug>@d1440.json; andere Ansichten als <slug>@<ansicht>.json.
const dateien = (s, a) => [...(a === 'd1440' ? [`${slug(s)}.json`] : []), ...(a !== 'd1440' || ansichten.length > 1 ? [`${slug(s)}@${a}.json`] : [])];

const browser = await chromium.launch();
const index = {};
const ergebnisse = [];
const aufgaben = seiten.flatMap((s) => ansichten.map((a) => [s, a]));
let i = 0;
async function bearbeite(s, a) {
  const v = ANSICHTEN[a];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin' });
  await installSperre(context);
  await setzeEinwilligung(context, 'abgelehnt', base);
  const page = await context.newPage();
  const resp = await page.goto(base + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await bereit(page);
  // Aufklappbares öffnen, damit FAQ- und Akkordeon-Texte im Text stehen (nur lesen, keine Navigation)
  await page.evaluate(() => { document.querySelectorAll('details').forEach((d) => d.setAttribute('open', '')); });
  const d = await page.evaluate(() => {
    const norm = (t) => (t || '').replace(/ /g, ' ').replace(/[ \t]+/g, ' ').trim();
    const meta = (sel, attr = 'content') => document.querySelector(sel)?.getAttribute(attr) ?? null;
    const zeilen = (el) => (el ? el.innerText.split('\n').map(norm).filter((z) => z.length > 0) : []);
    // Wortfolge eines Blocks: textContent (daher ohne Einfluss von CSS text-transform), ohne script/style/aria-hidden, Leerraum zusammengefasst
    const wortfolge = (el) => {
      if (!el) return null;
      const kopie = el.cloneNode(true);
      kopie.querySelectorAll('script, style, [aria-hidden="true"]').forEach((n) => n.remove());
      // je Textknoten getrennt, damit Wörter an Elementgrenzen nicht zusammenkleben („anfragenAnrufen“)
      const woerter = [];
      const gang = document.createTreeWalker(kopie, NodeFilter.SHOW_TEXT);
      for (let n = gang.nextNode(); n; n = gang.nextNode()) woerter.push(...(n.nodeValue || '').split(/\s+/).filter(Boolean));
      return woerter;
    };
    // Kopf und Fuß der Seite: das header/footer-Element auf Seitenebene (nicht in main, article, section, nav, aside oder Dialogen)
    const seitenebene = (tag) => [...document.querySelectorAll(tag)].find((el) => !el.parentElement?.closest('main, article, aside, section, nav, [role="dialog"]')) || null;
    const kopf = seitenebene('header');
    const fuss = seitenebene('footer');
    // Sichtbar: nicht aria-hidden/inert (geschlossenes Mobilmenü), nicht ausgeblendet, im Viewport
    const sichtbar = (el) => {
      if (el.closest('[aria-hidden="true"], [inert]')) return false;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.right > 0 && r.bottom > 0 && r.left < window.innerWidth && r.top < window.innerHeight;
    };
    const bloecke = { header: wortfolge(kopf), main: wortfolge(document.querySelector('main')), footer: wortfolge(fuss) };
    [...document.querySelectorAll('[role="dialog"]')].filter(sichtbar).forEach((el, n) => { bloecke[`dialog:${el.id || el.getAttribute('aria-label') || n + 1}`] = wortfolge(el); });
    const main = document.querySelector('main');
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((x) => x.textContent.trim());
    const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
    return {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: meta('link[rel="canonical"]', 'href'),
      robots: meta('meta[name="robots"]'),
      og_title: meta('meta[property="og:title"]'),
      og_description: meta('meta[property="og:description"]'),
      lang: document.documentElement.lang,
      ueberschriften: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((x) => `${x.tagName.toLowerCase()}: ${norm(x.textContent)}`),
      h1: [...document.querySelectorAll('h1')].map((x) => norm(x.textContent)),
      main_zeilen: zeilen(main),
      header_zeilen: zeilen(kopf),
      footer_zeilen: zeilen(fuss),
      alt: [...document.querySelectorAll('img')].map((x) => x.getAttribute('alt')),
      jsonld: ld,
      links: [...new Set(links)].sort(),
      bloecke,
    };
  });
  d.status = resp?.status() ?? null;
  d.seite = s;
  d.ansicht = a;
  d.jsonld_hash = h(JSON.stringify(d.jsonld));
  d.main_hash = h([...d.main_zeilen].sort().join('\n'));
  for (const datei of dateien(s, a)) fs.writeFileSync(path.join(out, datei), JSON.stringify(d, null, 1));
  index[schluessel(s, a)] = { status: d.status, title: d.title, description: d.description, canonical: d.canonical, robots: d.robots, h1: d.h1, jsonld_hash: d.jsonld_hash, main_hash: d.main_hash, main_zeilen: d.main_zeilen.length, links: d.links.length };
  ergebnisse.push(d);
  await context.close();
  process.stdout.write('.');
}
await Promise.all(Array.from({ length: 3 }, async () => { while (i < aufgaben.length) { const [s, a] = aufgaben[i++]; await bearbeite(s, a); } }));

// Sitemap, robots, interner Linkgraph (kaputte interne Links)
const sitemapTxt = await (await fetch(base + '/sitemap.xml')).text();
const sitemap = [...sitemapTxt.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
const robots = await (await fetch(base + '/robots.txt')).text();
const intern = new Set();
for (const d of ergebnisse) for (const l of d.links) {
  if (!l || l.startsWith('#') || /^(mailto|tel|javascript):/.test(l)) continue;
  try { const u = new URL(l, base + d.seite); if (['127.0.0.1', 'localhost', 'www.tezgel.de', 'tezgel.de'].includes(u.hostname)) intern.add(u.pathname); } catch {}
}
const kaputt = [];
for (const p of [...intern].sort()) {
  const r = await fetch(base + p, { method: 'GET', redirect: 'manual' });
  if (r.status >= 400) kaputt.push(`${p} ${r.status}`);
}
await browser.close();
fs.writeFileSync(path.join(ziel, 'texte-index.json'), JSON.stringify({ satz, base, ansichten, seiten: index, sitemap, sitemap_anzahl: sitemap.length, robots_hash: h(robots), interne_ziele: intern.size, kaputte_links: kaputt }, null, 1));
console.log(`\nSeiten ${seiten.length} · Ansichten ${ansichten.join(',')} · Sitemap ${sitemap.length} · interne Ziele ${intern.size} · kaputte Links ${kaputt.length} · Ziel ${ziel}`);
if (kaputt.length) console.log(kaputt.slice(0, 20).join('\n'));
