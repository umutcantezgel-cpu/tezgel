// Vergleicht zwei Text-/SEO-Sätze. Entfernte Textzeilen = möglicher Inhaltsverlust (Unantastbar!).
// Zusätzlich je Seite (Index-Schlüssel "/pfad" bzw. "/pfad@ansicht") und Block (header, main, footer, dialog:…) die Wortfolgen per LCS:
// entfernte und hinzugefügte Wortspannen, zusammenhängend, mit je 5 Wörtern Kontext. Sätze ohne Feld bloecke werden dafür nicht geprüft.
// Erlaubte Änderungen (protokollierte Mikrotexte) stehen in einer JSON-Liste, in zwei Formaten:
//   Zeilen:  [{ "seite": "*"|"/pfad", "alt": "…", "neu": "…"|null, "teil": "main_zeilen"|"header_zeilen"|…, "ansicht": "d1440"|"m390" }]
//            (teil und ansicht sind optional und engen den Eintrag ein; fehlen sie, gilt er für alle Teile bzw. Ansichten;
//             für entfernte Zeilen gilt nur ein Eintrag ohne "neu"; "vermerk" wird nicht ausgewertet und nennt den Beleg)
//   Spannen: [{ "seite": "*"|"/pfad", "block": "*"|"main"|…, "entfernt": "…", "hinzugefuegt": "…" }]  (block fehlt = "*")
//            oder mit "entfernt_muster" (regulärer Ausdruck über die ganze Spanne) – nur für tagesabhängige Inhalte
//            wie Kalendertage, die vom Abrufdatum abhängen; Seite und Block müssen dann ausdrücklich genannt sein.
//   Zeilen ebenso mit "alt_muster" (ganze Zeile) – nur mit ausdrücklicher Seite und Teil.
// "seite" ist der Pfad und gilt für alle Ansichten. Ein Eintrag mit entfernt/hinzugefuegt gehört zur Spannenregel.
// ROT wenn: Zeilen entfernt, SEO-Abweichung, Sitemap- oder robots-Änderung, kaputte interne Links oder unerlaubt entfernte Wortspannen.
// Ausgabe: belege/<nachher>/texte-vergleich-gegen-<vorher>.json (Abschnitt spannen je Seite und Block, unerlaubt_entfernt_je_seite).
// Nutzung: node texte-vergleich.mjs <satzVorher> <satzNachher> [--erlaubt datei.json] [--streng] [--vorher-ordner DIR] [--nachher-ordner DIR]
//   Ordner (Standard belege/<satz>): je Ordner texte-index.json und texte/. Die Ausgabe liegt im Nachher-Ordner
//   (Prüfstufe A: vorher _werkstatt/belege/e0, nachher _werkstatt/cache/texte/<Kennung>).
import fs from 'node:fs';
import path from 'node:path';
import { RELAUNCH, slug } from './lib.mjs';

const [, , A, B] = process.argv;
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const vorherOrdner = arg('vorher-ordner') ? path.resolve(arg('vorher-ordner')) : path.join(RELAUNCH, 'belege', A);
const nachherOrdner = arg('nachher-ordner') ? path.resolve(arg('nachher-ordner')) : path.join(RELAUNCH, 'belege', B);
const erlaubt = arg('erlaubt') ? JSON.parse(fs.readFileSync(arg('erlaubt'), 'utf8')) : [];
const zeilenErlaubt = erlaubt.filter((e) => !('entfernt' in e) && !('hinzugefuegt' in e) && !('entfernt_muster' in e) && !('alt_muster' in e));
const zeilenMuster = erlaubt.filter((e) => 'alt_muster' in e && e.seite && e.seite !== '*' && e.teil).map((e) => ({ ...e, re: new RegExp(`^(?:${e.alt_muster})$`) }));
const spannenErlaubt = erlaubt.filter((e) => 'entfernt' in e || 'hinzugefuegt' in e || 'entfernt_muster' in e);
const musterErlaubt = spannenErlaubt.filter((e) => 'entfernt_muster' in e && e.seite && e.seite !== '*' && e.block && e.block !== '*').map((e) => ({ ...e, re: new RegExp(`^(?:${e.entfernt_muster})$`) }));
const WORTKONTEXT = 5;
const ia = JSON.parse(fs.readFileSync(path.join(vorherOrdner, 'texte-index.json'), 'utf8'));
const ib = JSON.parse(fs.readFileSync(path.join(nachherOrdner, 'texte-index.json'), 'utf8'));
// Index-Schlüssel "/pfad" (d1440) oder "/pfad@ansicht" → Dateiname wie in texte.mjs
const pfadVon = (k) => k.split('@')[0];
const dateiVon = (k) => { const [p, a] = k.split('@'); return slug(p) + (a ? `@${a}` : '') + '.json'; };
const lade = (ordner, k) => JSON.parse(fs.readFileSync(path.join(ordner, 'texte', dateiVon(k)), 'utf8'));
const multiset = (arr) => { const m = new Map(); for (const x of arr) m.set(x, (m.get(x) || 0) + 1); return m; };
const differenz = (a, b) => { const mb = multiset(b); const r = []; for (const x of a) { const n = mb.get(x) || 0; if (n > 0) mb.set(x, n - 1); else r.push(x); } return r; };
const ansichtVon = (k) => k.split('@')[1] || 'd1440';
const istErlaubt = (seite, alt, neu, teil, ansicht) => zeilenErlaubt.some((e) => (e.seite === '*' || e.seite === seite) && (e.alt === alt || e.alt === undefined) && (e.neu === neu || e.neu === undefined)
  && (e.teil === undefined || teil === undefined || e.teil === teil) && (e.ansicht === undefined || ansicht === undefined || e.ansicht === ansicht));
const norm = (t) => String(t ?? '').split(/\s+/).filter(Boolean).join(' ');

// LCS-Differenz zweier Wortfolgen: Indizes der Wörter, die nur in a (entfernt) bzw. nur in b (hinzu) stehen.
// Gemeinsamer Präfix und Suffix werden vorab abgezogen, damit kleine Änderungen in großen Blöcken schnell bleiben.
function lcsDifferenz(a, b) {
  let p = 0;
  while (p < a.length && p < b.length && a[p] === b[p]) p++;
  let s = 0;
  while (s < a.length - p && s < b.length - p && a[a.length - 1 - s] === b[b.length - 1 - s]) s++;
  const n = a.length - p - s;
  const m = b.length - p - s;
  const breite = m + 1;
  const L = new Uint32Array((n + 1) * breite);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      L[i * breite + j] = a[p + i] === b[p + j] ? L[(i + 1) * breite + j + 1] + 1 : Math.max(L[(i + 1) * breite + j], L[i * breite + j + 1]);
    }
  }
  const entfernt = [];
  const hinzu = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[p + i] === b[p + j]) { i++; j++; }
    else if (L[(i + 1) * breite + j] >= L[i * breite + j + 1]) entfernt.push(p + i++);
    else hinzu.push(p + j++);
  }
  while (i < n) entfernt.push(p + i++);
  while (j < m) hinzu.push(p + j++);
  return { entfernt, hinzu };
}
// Zusammenhängende Indexbereiche (aufsteigende Indizes, Enden inklusive)
function spannenVon(indizes) {
  const r = [];
  for (const k of indizes) {
    const letzte = r[r.length - 1];
    if (letzte && letzte.ende === k - 1) letzte.ende = k;
    else r.push({ anfang: k, ende: k });
  }
  return r;
}
// Erlaubt: ein Spannen-Eintrag trägt den Text (entfernt bzw. hinzugefuegt), oder eine entfernte Spanne liegt in einer erlaubten Zeile (alt).
function spanneErlaubt(art, seite, block, text) {
  const feld = art === 'entfernt' ? 'entfernt' : 'hinzugefuegt';
  const t = norm(text);
  if (spannenErlaubt.some((e) => (e.seite === '*' || e.seite === seite) && (e.block === undefined || e.block === '*' || e.block === block) && e[feld] !== undefined && norm(e[feld]) === t)) return true;
  if (art === 'entfernt' && musterErlaubt.some((e) => e.seite === seite && e.block === block && e.re.test(t))) return true;
  return art === 'entfernt' && zeilenErlaubt.some((e) => (e.seite === '*' || e.seite === seite) && typeof e.alt === 'string' && ` ${norm(e.alt)} `.includes(` ${t} `));
}
function spanneBericht(woerter, sp, art, seite, block) {
  const text = woerter.slice(sp.anfang, sp.ende + 1).join(' ');
  return {
    text,
    kontext_vor: woerter.slice(Math.max(0, sp.anfang - WORTKONTEXT), sp.anfang).join(' '),
    kontext_nach: woerter.slice(sp.ende + 1, sp.ende + 1 + WORTKONTEXT).join(' '),
    erlaubt: spanneErlaubt(art, seite, block, text),
  };
}

const bericht = { vorher: A, nachher: B, seiten: {}, summe: { entfernt: 0, hinzu: 0, meta: 0, seo: 0, spannen_entfernt: 0, spannen_hinzu: 0, spannen_unerlaubt_entfernt: 0 }, unerlaubt_entfernt_je_seite: {} };
const felderMeta = ['title', 'description', 'canonical', 'robots', 'og_title', 'og_description', 'lang'];
for (const k of Object.keys(ia.seiten)) {
  if (!ib.seiten[k]) { bericht.seiten[k] = { fehlt: true }; continue; }
  const seite = pfadVon(k);
  const a = lade(vorherOrdner, k), b = lade(nachherOrdner, k);
  const e = {};
  const ansicht = ansichtVon(k);
  for (const f of felderMeta) if (a[f] !== b[f] && !istErlaubt(seite, a[f], b[f], f, ansicht)) e[f] = { alt: a[f], neu: b[f] };
  if (a.status !== b.status) e.status = { alt: a.status, neu: b.status };
  if (a.jsonld_hash !== b.jsonld_hash) e.jsonld = 'geändert';
  if (JSON.stringify(a.h1) !== JSON.stringify(b.h1) && !istErlaubt(seite, a.h1.join(' | '), b.h1.join(' | '), 'h1', ansicht)) e.h1 = { alt: a.h1, neu: b.h1 };
  for (const teil of ['main_zeilen', 'header_zeilen', 'footer_zeilen', 'alt', 'ueberschriften']) {
    const weg = differenz(a[teil].map(String), b[teil].map(String)).filter((x) => !istErlaubt(seite, x, undefined, teil, ansicht) && !zeilenMuster.some((e) => e.seite === seite && e.teil === teil && e.re.test(x)));
    const neu = differenz(b[teil].map(String), a[teil].map(String)).filter((x) => !istErlaubt(seite, undefined, x, teil, ansicht));
    if (weg.length || neu.length) e[teil] = { entfernt: weg, hinzu: neu };
    bericht.summe.entfernt += weg.length; bericht.summe.hinzu += neu.length;
  }
  const linksWeg = differenz(a.links, b.links);
  if (linksWeg.length) e.links_entfernt = linksWeg;
  // Wortspannen je Block (nur, wenn beide Sätze das Feld bloecke haben)
  if (a.bloecke && b.bloecke) {
    const spannen = {};
    let unerlaubt = 0;
    for (const block of [...new Set([...Object.keys(a.bloecke), ...Object.keys(b.bloecke)])].sort()) {
      const wa = a.bloecke[block] || [];
      const wb = b.bloecke[block] || [];
      const d = lcsDifferenz(wa, wb);
      const weg = spannenVon(d.entfernt).map((sp) => spanneBericht(wa, sp, 'entfernt', seite, block));
      const neu = spannenVon(d.hinzu).map((sp) => spanneBericht(wb, sp, 'hinzugefuegt', seite, block));
      if (weg.length || neu.length) spannen[block] = { entfernt: weg, hinzugefuegt: neu };
      bericht.summe.spannen_entfernt += weg.length; bericht.summe.spannen_hinzu += neu.length;
      unerlaubt += weg.filter((x) => !x.erlaubt).length;
    }
    if (Object.keys(spannen).length) e.spannen = spannen;
    bericht.summe.spannen_unerlaubt_entfernt += unerlaubt;
    bericht.unerlaubt_entfernt_je_seite[k] = unerlaubt;
  } else {
    bericht.unerlaubt_entfernt_je_seite[k] = null; // ohne Feld bloecke nicht geprüft
  }
  if (Object.keys(e).length) bericht.seiten[k] = e;
  bericht.summe.meta += felderMeta.filter((f) => e[f]).length;
  bericht.summe.seo += (e.jsonld ? 1 : 0) + (e.h1 ? 1 : 0) + (e.canonical ? 1 : 0) + (e.robots ? 1 : 0) + (e.status ? 1 : 0);
}
const sitemapWeg = differenz(ia.sitemap, ib.sitemap);
const sitemapNeu = differenz(ib.sitemap, ia.sitemap);
bericht.sitemap = { entfernt: sitemapWeg, hinzu: sitemapNeu };
bericht.robots_geaendert = ia.robots_hash !== ib.robots_hash;
bericht.kaputte_links = ib.kaputte_links;
const ziel = path.join(nachherOrdner, `texte-vergleich-gegen-${A}.json`);
fs.writeFileSync(ziel, JSON.stringify(bericht, null, 1));
const rot = bericht.summe.entfernt > 0 || bericht.summe.seo > 0 || sitemapWeg.length > 0 || bericht.robots_geaendert || ib.kaputte_links.length > 0 || bericht.summe.spannen_unerlaubt_entfernt > 0;
console.log(JSON.stringify({ seiten_mit_abweichung: Object.keys(bericht.seiten).length, ...bericht.summe, sitemap_entfernt: sitemapWeg.length, sitemap_hinzu: sitemapNeu.length, robots_geaendert: bericht.robots_geaendert, kaputte_links: ib.kaputte_links.length, ergebnis: rot ? 'ROT' : 'GRÜN' }));
console.log('unerlaubt entfernte Spannen je Seite: ' + Object.entries(bericht.unerlaubt_entfernt_je_seite).map(([k, n]) => `${k} ${n ?? 'nicht geprüft'}`).join(' · '));
console.log(`Ergebnis: ${ziel}`);
process.exit(rot && process.argv.includes('--streng') ? 1 : 0);
