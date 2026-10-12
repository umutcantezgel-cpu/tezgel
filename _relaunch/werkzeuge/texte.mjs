// Text- und SEO-Invarianten (Ebene 7 + Unantastbar-Schutz): extrahiert je Seite Texte, Metadaten, JSON-LD, Links.
// Nutzung: node texte.mjs --satz <name> [--seiten /,/bad]  → belege/<satz>/texte/*.json + texte-index.json
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { BASE, assertLocal, installSperre, setzeEinwilligung, bereit, grundmenge, slug, ensureDir, RELAUNCH, spaetZeichnen } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
assertLocal();
const G = grundmenge();
const satz = arg('satz', 'adhoc');
const seiten = arg('seiten') ? arg('seiten').split(',') : G.seiten;
const out = ensureDir(path.join(RELAUNCH, 'belege', satz, 'texte'));
const h = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);

const browser = await chromium.launch();
const index = {};
let i = 0;
const ergebnisse = [];
async function bearbeite(s) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin' });
  await installSperre(context);
  await setzeEinwilligung(context, 'abgelehnt');
  const page = await context.newPage();
  const resp = await page.goto(BASE + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await bereit(page);
  await spaetZeichnen(page);
  // Aufklappbares öffnen, damit FAQ- und Akkordeon-Texte im Text stehen (nur lesen, keine Navigation)
  await page.evaluate(() => { document.querySelectorAll('details').forEach((d) => d.setAttribute('open', '')); });
  const d = await page.evaluate(() => {
    const norm = (t) => (t || '').replace(/[\u00AD\u200B\u2060\uFEFF]/g, '').replace(/ /g, ' ').replace(/[ \t]+/g, ' ').trim();
    const meta = (sel, attr = 'content') => document.querySelector(sel)?.getAttribute(attr) ?? null;
    const zeilen = (el) => (el ? el.innerText.split('\n').map(norm).filter((z) => z.length > 0) : []);
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
      header_zeilen: zeilen(document.querySelector('header')),
      footer_zeilen: zeilen(document.querySelector('footer')),
      alt: [...document.querySelectorAll('img')].map((x) => x.getAttribute('alt')),
      jsonld: ld,
      links: [...new Set(links)].sort(),
    };
  });
  d.status = resp?.status() ?? null;
  d.seite = s;
  d.jsonld_hash = h(JSON.stringify(d.jsonld));
  d.main_hash = h([...d.main_zeilen].sort().join('\n'));
  fs.writeFileSync(path.join(out, slug(s) + '.json'), JSON.stringify(d, null, 1));
  index[s] = { status: d.status, title: d.title, description: d.description, canonical: d.canonical, robots: d.robots, h1: d.h1, jsonld_hash: d.jsonld_hash, main_hash: d.main_hash, main_zeilen: d.main_zeilen.length, links: d.links.length };
  ergebnisse.push(d);
  await context.close();
  process.stdout.write('.');
}
await Promise.all(Array.from({ length: 3 }, async () => { while (i < seiten.length) await bearbeite(seiten[i++]); }));

// Sitemap, robots, interner Linkgraph (kaputte interne Links)
const sitemapTxt = await (await fetch(BASE + '/sitemap.xml')).text();
const sitemap = [...sitemapTxt.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
const robots = await (await fetch(BASE + '/robots.txt')).text();
const intern = new Set();
for (const d of ergebnisse) for (const l of d.links) {
  if (!l || l.startsWith('#') || /^(mailto|tel|javascript):/.test(l)) continue;
  try { const u = new URL(l, BASE + d.seite); if (['127.0.0.1', 'localhost', 'www.tezgel.de', 'tezgel.de'].includes(u.hostname)) intern.add(u.pathname); } catch {}
}
const kaputt = [];
for (const p of [...intern].sort()) {
  const r = await fetch(BASE + p, { method: 'GET', redirect: 'manual' });
  if (r.status >= 400) kaputt.push(`${p} ${r.status}`);
}
await browser.close();
fs.writeFileSync(path.join(RELAUNCH, 'belege', satz, 'texte-index.json'), JSON.stringify({ satz, base: BASE, seiten: index, sitemap, sitemap_anzahl: sitemap.length, robots_hash: h(robots), interne_ziele: intern.size, kaputte_links: kaputt }, null, 1));
console.log(`\nSeiten ${seiten.length} · Sitemap ${sitemap.length} · interne Ziele ${intern.size} · kaputte Links ${kaputt.length}`);
if (kaputt.length) console.log(kaputt.slice(0, 20).join('\n'));
