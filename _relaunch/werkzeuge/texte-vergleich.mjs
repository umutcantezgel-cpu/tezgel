// Vergleicht zwei Text-/SEO-Sätze. Entfernte Textzeilen = möglicher Inhaltsverlust (Unantastbar!).
// Erlaubte Mikrotext-Änderungen stehen in einer JSON-Liste: [{ "seite": "*"|"/pfad", "alt": "…", "neu": "…"|null }]
// Nutzung: node texte-vergleich.mjs <satzVorher> <satzNachher> [--erlaubt datei.json] [--streng]
import fs from 'node:fs';
import path from 'node:path';
import { RELAUNCH } from './lib.mjs';

const [, , A, B] = process.argv;
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const erlaubt = arg('erlaubt') ? JSON.parse(fs.readFileSync(arg('erlaubt'), 'utf8')) : [];
const ia = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'belege', A, 'texte-index.json'), 'utf8'));
const ib = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'belege', B, 'texte-index.json'), 'utf8'));
const lade = (satz, s) => JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'belege', satz, 'texte', (s === '/' ? 'start' : s.replace(/^\//, '').replace(/\//g, '__')) + '.json'), 'utf8'));
const multiset = (arr) => { const m = new Map(); for (const x of arr) m.set(x, (m.get(x) || 0) + 1); return m; };
const differenz = (a, b) => { const mb = multiset(b); const r = []; for (const x of a) { const n = mb.get(x) || 0; if (n > 0) mb.set(x, n - 1); else r.push(x); } return r; };
const istErlaubt = (seite, alt, neu) => erlaubt.some((e) => (e.seite === '*' || e.seite === seite) && (e.alt === alt || e.alt === undefined) && (e.neu === neu || e.neu === undefined));

const bericht = { vorher: A, nachher: B, seiten: {}, summe: { entfernt: 0, hinzu: 0, meta: 0, seo: 0 } };
const felderMeta = ['title', 'description', 'canonical', 'robots', 'og_title', 'og_description', 'lang'];
for (const s of Object.keys(ia.seiten)) {
  if (!ib.seiten[s]) { bericht.seiten[s] = { fehlt: true }; continue; }
  const a = lade(A, s), b = lade(B, s);
  const e = {};
  for (const f of felderMeta) if (a[f] !== b[f] && !istErlaubt(s, a[f], b[f])) e[f] = { alt: a[f], neu: b[f] };
  if (a.status !== b.status) e.status = { alt: a.status, neu: b.status };
  if (a.jsonld_hash !== b.jsonld_hash) e.jsonld = 'geändert';
  if (JSON.stringify(a.h1) !== JSON.stringify(b.h1) && !istErlaubt(s, a.h1.join(' | '), b.h1.join(' | '))) e.h1 = { alt: a.h1, neu: b.h1 };
  for (const teil of ['main_zeilen', 'header_zeilen', 'footer_zeilen', 'alt', 'ueberschriften']) {
    const weg = differenz(a[teil].map(String), b[teil].map(String)).filter((x) => !istErlaubt(s, x, undefined));
    const neu = differenz(b[teil].map(String), a[teil].map(String)).filter((x) => !istErlaubt(s, undefined, x));
    if (weg.length || neu.length) e[teil] = { entfernt: weg, hinzu: neu };
    bericht.summe.entfernt += weg.length; bericht.summe.hinzu += neu.length;
  }
  const linksWeg = differenz(a.links, b.links);
  if (linksWeg.length) e.links_entfernt = linksWeg;
  if (Object.keys(e).length) bericht.seiten[s] = e;
  bericht.summe.meta += felderMeta.filter((f) => e[f]).length;
  bericht.summe.seo += (e.jsonld ? 1 : 0) + (e.h1 ? 1 : 0) + (e.canonical ? 1 : 0) + (e.robots ? 1 : 0) + (e.status ? 1 : 0);
}
const sitemapWeg = differenz(ia.sitemap, ib.sitemap);
const sitemapNeu = differenz(ib.sitemap, ia.sitemap);
bericht.sitemap = { entfernt: sitemapWeg, hinzu: sitemapNeu };
bericht.robots_geaendert = ia.robots_hash !== ib.robots_hash;
bericht.kaputte_links = ib.kaputte_links;
const ziel = path.join(RELAUNCH, 'belege', B, `texte-vergleich-gegen-${A}.json`);
fs.writeFileSync(ziel, JSON.stringify(bericht, null, 1));
const rot = bericht.summe.entfernt > 0 || bericht.summe.seo > 0 || sitemapWeg.length > 0 || bericht.robots_geaendert || ib.kaputte_links.length > 0;
console.log(JSON.stringify({ seiten_mit_abweichung: Object.keys(bericht.seiten).length, ...bericht.summe, sitemap_entfernt: sitemapWeg.length, sitemap_hinzu: sitemapNeu.length, robots_geaendert: bericht.robots_geaendert, kaputte_links: ib.kaputte_links.length, ergebnis: rot ? 'ROT' : 'GRÜN' }));
process.exit(rot && process.argv.includes('--streng') ? 1 : 0);
