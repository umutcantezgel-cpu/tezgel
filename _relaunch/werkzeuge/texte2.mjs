// texte2.mjs – Text-Invarianten der zweiten Generation (Paket P3-00e · Kern v1.2 · Kriterium Z-05, Z-06)
//
// Zweck
//   Erfasst alle ausgelieferten Texte layoutunabhängig aus dem Build-HTML (Textknoten, alt, title, aria-label,
//   placeholder, Metadaten, JSON-LD), ergänzt die nur clientseitig gerenderten Texte aus definierten Zuständen
//   im Browser (Banner, Mobilmenü, Mega-Menü, Akkordeons) und vergleicht zwei Sätze gegen eine Freigabeliste
//   (MIKROTEXTE.md). Prüft zusätzlich jedes interne Fragment-Ziel (N-18): `href="#ziel"` und `href="/pfad#ziel"`
//   müssen auf der Zielseite als id (oder <a name>) existieren.
//
// Nutzung
//   node texte2.mjs --build <pfad-zu-.next> --satz <name> [--aus <ordner>] [--seiten /,/bad] [--hash-befehle cookie-settings]
//                   [--anker /#express-anfrage,/kontakt#termin-buchen,…]   (Pflichtanker, Vorgabe aus N-18)
//   node texte2.mjs --zustaende --base <url> --satz <name> [--aus <ordner>] [--seiten /,/bad] [--nur geladen,mega,akkordeon,mobil,banner]
//                   [--global-seiten /,/bad] [--build-satz <satz>] [--probe <init-skript.js> (nur Gegenprobe)]
//   node texte2.mjs --vergleich <satzA> <satzB> [--freigabe _relaunch/MIKROTEXTE.md] [--aus <bericht.json>]
//                   [--volatil <regex>]… [--streng]
//   <satz> ist ein Ordner mit _satz.json oder ein Name (→ belege/<name>/texte2, sonst cache/texte2/<name>).
//
// Messbedingungen
//   Build: alle .next/server/app/**/*.html, geparst mit dem HTML-Parser von Chromium (DOMParser, Skripte laufen nicht,
//   keine Netzanfragen); React-Streaming ($RC/$RS) wird aufgelöst, d. h. Suspense-Inhalt steht an seiner Stelle und
//   der Ersatzinhalt entfällt. Ohne <script> (außer JSON-LD → Hash), <style>, <template>, <noscript>.
//   Normalisierung: U+00AD, U+200B, U+2060, U+FEFF entfernt; U+00A0, U+2007, U+202F → Leerzeichen; <br> → Leerzeichen;
//   Leerraum zusammengefasst; KEIN Groß/Klein-Angleich. Einträge = Blöcke (Block-Elemente trennen, Inline-Elemente
//   nicht); an einer Inline-Grenze ohne Leerraum steht ein Leerzeichen (<span>A</span><span>B</span> → „A B“), außer
//   nach öffnender oder vor schließender Zeichensetzung („<a>Impressum</a>.“ → „Impressum.“); <sup>/<sub> ohne Grenze.
//   Zustände: Chromium (Playwright 1.56.1), reducedMotion reduce, de-DE, Europe/Berlin, feste Uhr (lib.FESTE_ZEIT,
//   pausiert; Zeit läuft nur per clock.runFor), d1440 für geladen/Mega/Akkordeon/Banner, m375 für das Mobilmenü,
//   Einwilligung „abgelehnt“ (Banner: Erstbesuch ohne Cookie). Erfasst wird je Zustand nur, was im Zielbereich
//   (aria-controls-Ziel bzw. Dialog) und am Schalter selbst neu im DOM steht – also nur clientseitig gerenderter Text.
//   Schalter werden per DOM-Klick (el.click(), ohne Hover) betätigt, damit Hover-Menüs das Ergebnis nicht verfälschen.
//   Warten: Zustandsabfragen (aria-expanded, Dialog vorhanden), Netz-Ruhe (keine offene Anfrage über 300 ms, z. B.
//   nachgeladene dynamic()-Chunks) und DOM-Ruhe (MutationObserver-Zähler unverändert über 250 ms, Obergrenze 3 s).
//   Vergleich: je Seite LCS über die Eintragsfolge; nicht zugeordnete gleiche Einträge = verschoben/umgestellt;
//   gleicher Text anders auf Blöcke verteilt (Leerraum egal) = neu gegliedert (gelb); verbleibende Lücken gleichen
//   Typs = geändert. ROT: Entfernung/Änderung ohne Freigabe, jede hinzugekommene
//   Überschrift, jede zusätzliche H1, fehlende Seite, Statuswechsel, neues kaputtes Fragment-Ziel, verlorener Anker
//   (Ziel eines internen Links in A oder Pflichtanker), verlorener Zustand.
//   GELB: hinzugekommener sonstiger Text, Verschiebungen, neu Gegliedertes, vorbestehende Befunde, volatile Einträge.
//
// Kriterium: Z-05 (Bestand: Texte unantastbar, K-012) und Z-06 (Metadaten vollständig, keine kaputten internen Links).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { BASE, assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, bereit, grundmenge, slug, ensureDir, RELAUNCH, FESTE_ZEIT } from './lib.mjs';

const ARGV = process.argv.slice(2);
const arg = (k, d) => { const i = ARGV.indexOf(`--${k}`); return i > -1 && ARGV[i + 1] && !ARGV[i + 1].startsWith('--') ? ARGV[i + 1] : d; };
const args = (k) => ARGV.flatMap((x, i) => (x === `--${k}` && ARGV[i + 1] ? [ARGV[i + 1]] : []));
const hat = (k) => ARGV.includes(`--${k}`);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const jetzt = () => new Date().toISOString();
const rel = (p) => path.relative(RELAUNCH, p) || '.';
const SITE_HOSTS = ['www.tezgel.de', 'tezgel.de', '127.0.0.1', 'localhost'];
const HASH_BEFEHLE = (arg('hash-befehle', 'cookie-settings') || '').split(',').filter(Boolean);
// Pflichtanker (N-18, P2-GEG-02): müssen als id auf der Zielseite bleiben, auch ohne internen Link darauf
const PFLICHTANKER = (arg('anker', '/#express-anfrage,/kontakt#express-anfrage,/kontakt#termin-buchen,/referenzen#bewertungen') || '').split(',').filter(Boolean);
const META_OHNE = new Set(['charset', 'viewport', 'theme-color', 'color-scheme', 'x-build', 'next-size-adjust', 'format-detection']);

// ---------------------------------------------------------------------------------------------------------------
// Extraktor – läuft im Browser (DOMParser für Build-HTML, sonst das lebende DOM bzw. ein Teilbaum).
// Rückgabe: { eintraege: [[typ, wert]], ids: [], links: [], fehlt? }. typ: text | h1–h6 | alt | aria:<attr> | meta:<name> | text:value
function EXTRAKTOR(opt) {
  const MARK = '\u0001';
  const norm = (s) => String(s ?? '')
    .replace(/[­​⁠﻿]/g, '')
    .replace(/[   ]/g, ' ')
    // Inline-Grenze ohne Leerraum: Leerzeichen, außer nach öffnender bzw. vor schließender Zeichensetzung
    .replace(/(\S)\u0001+(?=\S)/gu, (m, x, off, s) => {
      const y = s[off + m.length];
      return x + ('([{„‚/-‑#@'.includes(x) || '.,;:!?)]}“‘\'"%/-‑…²³'.includes(y) ? '' : ' ');
    })
    .replace(/\u0001/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  let doc = document;
  let wurzel = null;
  if (opt && typeof opt.html === 'string') {
    doc = new DOMParser().parseFromString(opt.html, 'text/html');
    // React-Streaming auflösen: $RC("B:n","S:n") ersetzt den Ersatzinhalt der Grenze B:n durch den Inhalt von S:n.
    for (const [b, s] of opt.rc || []) {
      const tpl = doc.getElementById(b), seg = doc.getElementById(s);
      if (!tpl || !seg || !tpl.parentNode) continue;
      const parent = tpl.parentNode;
      let n = tpl.nextSibling, tiefe = 0;
      while (n) {
        const weiter = n.nextSibling;
        if (n.nodeType === 8) {
          if (n.data === '/$') { if (tiefe === 0) break; tiefe--; } else if (/^\$[?!]?$/.test(n.data)) tiefe++;
        }
        parent.removeChild(n);
        n = weiter;
      }
      while (seg.firstChild) parent.insertBefore(seg.firstChild, tpl);
      tpl.remove(); seg.remove();
    }
    for (const [s, p] of opt.rs || []) {
      const seg = doc.getElementById(s), ph = doc.getElementById(p);
      if (!seg || !ph || !ph.parentNode) continue;
      while (seg.firstChild) ph.parentNode.insertBefore(seg.firstChild, ph);
      ph.remove(); seg.remove();
    }
  } else if (opt && opt.wurzel) {
    wurzel = document.querySelector(opt.wurzel);
    if (!wurzel) return { eintraege: [], ids: [], links: [], fehlt: true };
  }
  const SKIP = new Set(['script', 'style', 'template', 'noscript']);
  const TRANSPARENT = new Set(['sup', 'sub']);
  const BLOCK = new Set(['address', 'article', 'aside', 'blockquote', 'body', 'button', 'canvas', 'caption', 'dd', 'details', 'dialog',
    'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'header', 'hgroup', 'hr', 'html', 'iframe', 'label', 'legend',
    'li', 'main', 'menu', 'nav', 'ol', 'optgroup', 'option', 'output', 'p', 'pre', 'search', 'section', 'select', 'summary', 'table',
    'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'tr', 'ul', 'video', 'audio', 'svg', 'text', 'foreignobject', 'g']);
  const out = [];
  const ids = [];
  const links = [];
  const push = (typ, wert) => { const w = norm(wert); if (w) out.push([typ, w]); };
  const ebene = (el) => {
    const m = /^h([1-6])$/.exec(el.localName);
    if (m) return +m[1];
    if (el.getAttribute('role') === 'heading') return Math.min(6, Math.max(1, parseInt(el.getAttribute('aria-level') || '2', 10) || 2));
    return 0;
  };
  const metaVon = (el) => {
    const t = el.localName;
    if (t === 'title') { push('meta:title', el.textContent); return true; }
    if (t === 'meta') {
      const name = (el.getAttribute('name') || el.getAttribute('property') || el.getAttribute('itemprop') || '').trim();
      if (name && !opt.metaOhne.includes(name.toLowerCase()) && el.hasAttribute('content')) push('meta:' + name, el.getAttribute('content'));
      return true;
    }
    if (t === 'link') {
      const r = (el.getAttribute('rel') || '').toLowerCase();
      if (r === 'canonical') push('meta:canonical', el.getAttribute('href'));
      else if (r === 'alternate' && el.getAttribute('hreflang')) push('meta:alternate:' + el.getAttribute('hreflang'), el.getAttribute('href'));
      return true;
    }
    return false;
  };
  const attribute = (el) => {
    const t = el.localName;
    if (el.id) ids.push(el.id);
    if (t === 'a' && el.getAttribute('name')) ids.push(el.getAttribute('name'));
    if ((t === 'a' || t === 'area') && el.hasAttribute('href')) links.push(el.getAttribute('href'));
    if ((t === 'img' || t === 'area' || (t === 'input' && el.getAttribute('type') === 'image')) && el.getAttribute('alt')) push('alt', el.getAttribute('alt'));
    if (el.hasAttribute('aria-label')) push('aria:aria-label', el.getAttribute('aria-label'));
    if (el.hasAttribute('title') && t !== 'title') push('aria:title', el.getAttribute('title'));
    if (el.hasAttribute('placeholder')) push('aria:placeholder', el.getAttribute('placeholder'));
    if (t === 'input' && /^(submit|button|reset)$/i.test(el.getAttribute('type') || '') && el.hasAttribute('value')) push('text:value', el.getAttribute('value'));
  };
  const lauf = (knoten, ctx) => {
    for (const k of knoten.childNodes) {
      if (k.nodeType === 3) { ctx.puffer.push(k.data); continue; }
      if (k.nodeType !== 1) continue;
      const t = k.localName.toLowerCase();
      if (t === 'script') {
        if ((k.getAttribute('type') || '').toLowerCase() === 'application/ld+json') { flush(ctx); out.push(['meta:json-ld', k.textContent]); }
        continue;
      }
      if (SKIP.has(t)) continue;
      if (t === 'head') { flush(ctx); for (const h of k.querySelectorAll('title, meta, link, script[type="application/ld+json"]')) { if (h.localName === 'script') out.push(['meta:json-ld', h.textContent]); else metaVon(h); } continue; }
      const imSvg = k.namespaceURI === 'http://www.w3.org/2000/svg';
      if (imSvg && (t === 'title' || t === 'desc')) { push(t === 'title' ? 'aria:svg-title' : 'aria:svg-desc', k.textContent); continue; }
      if (!imSvg && (t === 'title' || t === 'meta' || t === 'link')) { metaVon(k); continue; }
      attribute(k);
      if (t === 'br') { ctx.puffer.push(' '); continue; }
      if (t === 'wbr') continue;
      const h = ebene(k);
      if (h && !ctx.ueberschrift) {
        flush(ctx);
        const hctx = { puffer: [], ueberschrift: true };
        lauf(k, hctx);
        push('h' + h, hctx.puffer.join(''));
        continue;
      }
      if (BLOCK.has(t)) {
        if (ctx.ueberschrift) { ctx.puffer.push(' '); lauf(k, ctx); ctx.puffer.push(' '); } else { flush(ctx); lauf(k, ctx); flush(ctx); }
      } else if (TRANSPARENT.has(t)) {
        lauf(k, ctx);
      } else {
        ctx.puffer.push(MARK); lauf(k, ctx); ctx.puffer.push(MARK);
      }
    }
  };
  const flush = (ctx) => { if (ctx.puffer.length) { push('text', ctx.puffer.join('')); ctx.puffer = []; } };
  const ctx = { puffer: [], ueberschrift: false };
  if (wurzel) {
    // Teilbaum: Wurzel selbst mit auswerten
    const huelle = { childNodes: [wurzel] };
    lauf(huelle, ctx);
  } else {
    const html = doc.documentElement;
    if (html.getAttribute('lang')) push('meta:lang', html.getAttribute('lang'));
    lauf(html, ctx);
  }
  flush(ctx);
  return { eintraege: out, ids: [...new Set(ids)], links: [...new Set(links)] };
}

// Rohe Einträge in Objekte {art, wert, ebene|attr|name} umwandeln; JSON-LD als Hash.
function alsEintrag([typ, wert]) {
  if (typ === 'meta:json-ld') {
    let kanon = wert, typen = '';
    try { const j = JSON.parse(wert); kanon = JSON.stringify(j); const t = new Set(); JSON.stringify(j, (k, v) => { if (k === '@type') [].concat(v).forEach((x) => t.add(x)); return v; }); typen = [...t].slice(0, 8).join(','); } catch { /* ungültiges JSON bleibt roh */ }
    return { art: 'meta', name: 'json-ld', wert: `sha256:${sha(kanon)} ${kanon.length}Z${typen ? ' ' + typen : ''}` };
  }
  if (/^h[1-6]$/.test(typ)) return { art: 'ueberschrift', ebene: typ, wert };
  if (typ === 'text') return { art: 'text', wert };
  if (typ === 'text:value') return { art: 'text', attr: 'value', wert };
  if (typ === 'alt') return { art: 'alt', wert };
  if (typ.startsWith('aria:')) return { art: 'aria', attr: typ.slice(5), wert };
  if (typ.startsWith('meta:')) return { art: 'meta', name: typ.slice(5), wert };
  return { art: typ, wert };
}
const typVon = (e) => e.art === 'ueberschrift' ? e.ebene : e.art + (e.attr ? ':' + e.attr : '') + (e.name ? ':' + e.name : '');
const schluessel = (e) => typVon(e) + '\u0000' + e.wert;
const istUeberschrift = (e) => e.art === 'ueberschrift';

function routeAusDatei(relPfad) {
  let r = relPfad.replace(/\\/g, '/').replace(/\.html$/, '');
  r = r.split('/').filter((s) => !/^\(.*\)$/.test(s) && !s.startsWith('@')).join('/');
  if (r === 'index') return '/';
  return '/' + r.replace(/\/index$/, '');
}
function findeHtml(dir, basis = dir, liste = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) findeHtml(p, basis, liste);
    else if (e.name.endsWith('.html')) liste.push(path.relative(basis, p));
  }
  return liste.sort();
}
const streaming = (html) => ({
  rc: [...html.matchAll(/\$RC\("([^"]+)","([^"]+)"\)/g)].map((m) => [m[1], m[2]]),
  rs: [...html.matchAll(/\$RS\("([^"]+)","([^"]+)"\)/g)].map((m) => [m[1], m[2]]),
});
function satzOrdner(name, schreiben = false) {
  if (!name) throw new Error('Satzname fehlt');
  const kand = [path.resolve(name), path.join(RELAUNCH, 'belege', name, 'texte2'), path.join(RELAUNCH, 'cache', 'texte2', name)];
  if (!schreiben) {
    const f = kand.find((d) => fs.existsSync(path.join(d, '_satz.json')) || fs.existsSync(path.join(d, '_zustaende.json')));
    if (!f) throw new Error(`Satz ${name} nicht gefunden (gesucht: ${kand.map(rel).join(', ')})`);
    return f;
  }
  return kand[1];
}

// Fragment-Ziel eines href bestimmen: { route, id } oder null (extern, ohne Fragment, Hash-Befehl)
function fragmentZiel(href, vonRoute) {
  if (!href || !href.includes('#')) return null;
  if (/^(mailto|tel|javascript|data|sms|whatsapp):/i.test(href)) return null;
  let u;
  try { u = new URL(href, 'https://www.tezgel.de' + (vonRoute === '/' ? '/' : vonRoute)); } catch { return null; }
  if (!SITE_HOSTS.includes(u.hostname)) return null;
  const id = decodeURIComponent(u.hash.slice(1));
  if (!id || id.startsWith('!')) return null;
  let route = u.pathname.replace(/\/+$/, '') || '/';
  return { route, id, befehl: HASH_BEFEHLE.includes(id) };
}
function pruefeFragmente(seiten) {
  // seiten: Map route → { ids:Set, links:[] }
  const ergebnis = { gesamt: 0, ok: 0, befehle: [], fehlend: [], ziel_unbekannt: [], ziele: [] };
  const ziele = new Map();
  for (const [route, s] of seiten) {
    for (const href of s.links) {
      const z = fragmentZiel(href, route);
      if (!z) continue;
      ergebnis.gesamt++;
      if (z.befehl) { ergebnis.befehle.push({ seite: route, href }); continue; }
      const ziel = seiten.get(z.route);
      const k = `${z.route}#${z.id}`;
      if (!ziele.has(k)) ziele.set(k, { ziel: z.route, id: z.id, von: [] });
      ziele.get(k).von.push(route);
      if (!ziel) { ergebnis.ziel_unbekannt.push({ seite: route, href }); continue; }
      if (ziel.ids.has(z.id)) ergebnis.ok++;
      else ergebnis.fehlend.push({ seite: route, href, ziel: z.route, id: z.id });
    }
  }
  ergebnis.ziele = [...ziele.values()].map((z) => ({ ziel: z.ziel, id: z.id, verweise: z.von.length, von: [...new Set(z.von)].slice(0, 5) }))
    .sort((a, b) => b.verweise - a.verweise);
  return ergebnis;
}

// ---------------------------------------------------------------------------------------------------------------
// Modus --build
async function modusBuild() {
  const next = path.resolve(arg('build'));
  const appDir = path.join(next, 'server', 'app');
  if (!fs.existsSync(appDir)) throw new Error(`${appDir} fehlt – ist ${next} ein .next-Ordner?`);
  const satz = arg('satz', 'adhoc');
  const aus = ensureDir(arg('aus') ? path.resolve(arg('aus')) : satzOrdner(satz, true));
  const filter = arg('seiten') ? new Set(arg('seiten').split(',')) : null;
  const buildId = fs.existsSync(path.join(next, 'BUILD_ID')) ? fs.readFileSync(path.join(next, 'BUILD_ID'), 'utf8').trim() : null;
  let manifest = {};
  try { manifest = JSON.parse(fs.readFileSync(path.join(next, 'prerender-manifest.json'), 'utf8')).routes || {}; } catch { /* optional */ }
  const dateien = findeHtml(appDir).filter((d) => !filter || filter.has(routeAusDatei(d)));
  const bedingungen = {
    quelle: rel(next) + '/server/app/**/*.html', build_id: buildId, dateien: dateien.length,
    parser: 'Chromium DOMParser (Playwright 1.56.1), keine Skriptausführung, keine Netzanfragen',
    streaming: 'React $RC/$RS aufgelöst (Suspense-Inhalt an Ort, Ersatzinhalt entfernt)',
    ohne: ['script (JSON-LD als Hash)', 'style', 'template', 'noscript'],
    normalisierung: 'U+00AD/U+200B/U+2060/U+FEFF entfernt; U+00A0/U+2007/U+202F → Leerzeichen; <br> → Leerzeichen; Leerraum zusammengefasst; kein Groß/Klein-Angleich; Inline-Grenze ohne Leerraum → Leerzeichen (außer an Zeichensetzung)',
    meta_ohne: [...META_OHNE], hash_befehle: HASH_BEFEHLE,
  };
  assertLocal(BASE); // Browserlauf: nur lokal (G5); hier ohne Seitenaufruf, der Parser läuft auf about:blank
  const t0 = Date.now();
  const browser = await chromium.launch();
  const context = await browser.newContext({ locale: 'de-DE', timezoneId: 'Europe/Berlin' });
  const protokoll = [];
  await installSperre(context, { protokoll });
  const seiten = new Map();
  const index = {};
  let i = 0;
  const arbeite = async () => {
    const page = await context.newPage();
    await page.goto('about:blank');
    while (i < dateien.length) {
      const d = dateien[i++];
      const route = routeAusDatei(d);
      const html = fs.readFileSync(path.join(appDir, d), 'utf8');
      const roh = await page.evaluate(EXTRAKTOR, { html, ...streaming(html), metaOhne: [...META_OHNE] });
      let status = 200;
      const metaDatei = path.join(appDir, d.replace(/\.html$/, '.meta'));
      try { const m = JSON.parse(fs.readFileSync(metaDatei, 'utf8')); if (m.status) status = m.status; } catch { /* keine .meta */ }
      const mRoute = route === '/' ? '/' : route;
      if (manifest[mRoute]?.initialStatus) status = manifest[mRoute].initialStatus;
      const eintraege = roh.eintraege.map(alsEintrag);
      const h1 = eintraege.filter((e) => e.ebene === 'h1').map((e) => e.wert);
      const datei = slug(route) + '.json';
      const kopf = { satz, base: null, bedingungen: 'siehe _satz.json', erstellt: jetzt() };
      const zeilen = eintraege.map((e) => '  ' + JSON.stringify(e)).join(',\n');
      fs.writeFileSync(path.join(aus, datei),
        `{\n "satz": ${JSON.stringify(kopf.satz)}, "base": null, "bedingungen": "siehe _satz.json", "erstellt": ${JSON.stringify(kopf.erstellt)},\n` +
        ` "seite": ${JSON.stringify(route)}, "quelle": ${JSON.stringify(d)}, "status": ${status}, "im_manifest": ${!!manifest[mRoute]},\n` +
        ` "h1": ${JSON.stringify(h1)},\n "ids": ${JSON.stringify(roh.ids)},\n "links": ${JSON.stringify(roh.links)},\n "eintraege": [\n${zeilen}\n ]\n}\n`);
      seiten.set(route, { ids: new Set(roh.ids), links: roh.links });
      const zaehl = {};
      for (const e of eintraege) zaehl[e.art] = (zaehl[e.art] || 0) + 1;
      index[route] = { datei, quelle: d, status, im_manifest: !!manifest[mRoute], eintraege: eintraege.length, arten: zaehl, h1, hash: sha(eintraege.map(schluessel).join('\n')) };
      process.stdout.write('.');
    }
    await page.close();
  };
  await Promise.all([arbeite(), arbeite()]);
  await context.close();
  await browser.close();
  const fragmente = pruefeFragmente(seiten);
  fragmente.pflichtanker = PFLICHTANKER.map((a) => { const [r, id] = a.split('#'); const z = seiten.get(r || '/'); return { anker: a, ok: !!z && z.ids.has(id), seite_vorhanden: !!z }; });
  const sortiert = Object.fromEntries(Object.keys(index).sort().map((k) => [k, index[k]]));
  const summe = {
    dateien: dateien.length, im_manifest: Object.values(index).filter((s) => s.im_manifest).length,
    eintraege: Object.values(index).reduce((a, s) => a + s.eintraege, 0),
    seiten_mit_mehreren_h1: Object.entries(index).filter(([, s]) => s.h1.length > 1).map(([r, s]) => `${r} (${s.h1.length})`),
    seiten_ohne_h1: Object.entries(index).filter(([, s]) => s.h1.length === 0).map(([r]) => r),
    fragmente: { gesamt: fragmente.gesamt, ok: fragmente.ok, befehle: fragmente.befehle.length, fehlend: fragmente.fehlend.length, ziel_unbekannt: fragmente.ziel_unbekannt.length, pflichtanker_ok: `${fragmente.pflichtanker.filter((p) => p.ok).length}/${fragmente.pflichtanker.length}` },
    netz_protokoll: protokoll.length, laufzeit_s: Math.round((Date.now() - t0) / 100) / 10,
  };
  fs.writeFileSync(path.join(aus, '_satz.json'), JSON.stringify({ satz, base: null, bedingungen, erstellt: jetzt(), summe, fragmente, seiten: sortiert }, null, 1));
  console.log(`\n${JSON.stringify(summe)}\n→ ${rel(aus)}`);
}

// Fragment-Ziele aus clientseitig gerenderten Links (Zustände) gegen die ids eines Build-Satzes prüfen
function idsAusSatz(dir) {
  const S = dir && fs.existsSync(path.join(dir, '_satz.json')) ? JSON.parse(fs.readFileSync(path.join(dir, '_satz.json'), 'utf8')) : null;
  const cache = new Map();
  return (route) => {
    if (!S || !S.seiten[route]) return null;
    if (!cache.has(route)) cache.set(route, new Set(JSON.parse(fs.readFileSync(path.join(dir, S.seiten[route].datei), 'utf8')).ids));
    return cache.get(route);
  };
}
function clientFragmente(Z, idsVon) {
  const res = { gesamt: 0, ok: 0, befehle: 0, fehlend: [], ziel_unbekannt: [] };
  for (const [route, s] of Object.entries(Z.seiten)) {
    for (const [name, z] of Object.entries(s.zustaende || {})) {
      for (const href of (z && Array.isArray(z.links) ? z.links : [])) {
        const f = fragmentZiel(href, route);
        if (!f) continue;
        res.gesamt++;
        if (f.befehl) { res.befehle++; continue; }
        const ids = idsVon(f.route);
        const client = Z.seiten[f.route]?.zustaende?.ids_client || [];
        if (!ids && !client.length) { res.ziel_unbekannt.push({ seite: route, zustand: name, href }); continue; }
        if ((ids && ids.has(f.id)) || client.includes(f.id)) res.ok++;
        else res.fehlend.push({ seite: route, zustand: name, href, ziel: f.route, id: f.id });
      }
    }
  }
  return res;
}

// ---------------------------------------------------------------------------------------------------------------
// Modus --zustaende
const ZUSTAENDE = ['geladen', 'mega', 'akkordeon', 'mobil', 'banner'];
async function domRuhe(page, { ruhe = 250, max = 3000 } = {}) {
  await page.evaluate(() => {
    if (window.__texte2) return;
    window.__texte2 = { n: 0 };
    new MutationObserver((m) => { window.__texte2.n += m.length; })
      .observe(document, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['aria-expanded', 'hidden', 'open', 'aria-label'] });
  });
  const start = Date.now();
  let vorher = await page.evaluate(() => window.__texte2.n);
  while (Date.now() - start < max) {
    await new Promise((r) => setTimeout(r, ruhe)); // Abfrage-Takt, keine feste Wartezeit: Ende sobald unverändert
    const n = await page.evaluate(() => window.__texte2.n);
    if (n === vorher) return true;
    vorher = n;
  }
  return false;
}
// Multiset-Differenz in Reihenfolge von a: Einträge aus a, die (in dieser Anzahl) nicht in b stehen
function minus(a, b) {
  const m = new Map();
  for (const e of b) m.set(schluessel(e), (m.get(schluessel(e)) || 0) + 1);
  return a.filter((e) => { const k = schluessel(e); const n = m.get(k) || 0; if (n > 0) { m.set(k, n - 1); return false; } return true; });
}
async function extrahiere(page, wurzel) {
  const r = await page.evaluate(EXTRAKTOR, { wurzel, metaOhne: [...META_OHNE] });
  return { fehlt: !!r.fehlt, eintraege: r.eintraege.map(alsEintrag), ids: r.ids, links: r.links };
}
async function statisch(page, url) {
  const html = await (await fetch(url, { method: 'GET' })).text();
  const r = await page.evaluate(EXTRAKTOR, { html, ...streaming(html), metaOhne: [...META_OHNE] });
  return { eintraege: r.eintraege.map(alsEintrag), ids: r.ids, links: r.links };
}
const linksNeu = (nach, vor) => { const v = new Set(vor); return nach.filter((l) => !v.has(l)); };
// Schalter markieren (data-texte2-k) und beschreiben
async function markiere(page, bereichSel, art) {
  return page.evaluate(({ bereichSel, art }) => {
    const sichtbar = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const bereiche = bereichSel ? [...document.querySelectorAll(bereichSel)] : [document.body];
    const gesehen = new Set();
    const liste = [];
    const ausschluss = art === 'akkordeon' ? 'header, nav, footer, [role="dialog"], [aria-modal="true"], #mobile-menu' : '';
    const rx = /details|einsehen|mehr anzeigen|alle anzeigen|weiterlesen|ausklappen|mehr erfahren/i;
    for (const b of bereiche) {
      let kand = [];
      if (art === 'akkordeon') {
        kand = [...b.querySelectorAll('button[aria-expanded="false"], [role="button"][aria-expanded="false"], summary, [role="tab"][aria-selected="false"]')];
        kand.push(...[...b.querySelectorAll('button:not([aria-expanded]):not([type="submit"])')].filter((x) => rx.test(x.textContent || '')));
      } else if (art === 'mega') {
        kand = [...b.querySelectorAll('[aria-expanded="false"][aria-controls]')];
      } else if (art === 'kopf') {
        kand = [...b.querySelectorAll('button[aria-expanded="false"][aria-controls], [role="button"][aria-expanded="false"][aria-controls]')];
      } else if (art === 'innen') {
        kand = [...b.querySelectorAll('button[aria-expanded="false"], [role="button"][aria-expanded="false"]')];
        kand.push(...[...b.querySelectorAll('button:not([aria-expanded]):not([type="submit"])')].filter((x) => rx.test(x.textContent || '')));
      }
      for (const el of kand) {
        if (gesehen.has(el) || el.hasAttribute('aria-haspopup') && el.getAttribute('aria-haspopup') !== 'false' && art === 'akkordeon') continue;
        if (ausschluss && el.closest(ausschluss)) continue;
        if (el.localName === 'summary' && el.parentElement?.open) continue;
        if (el.closest('a[href]')) continue;
        if (!sichtbar(el) && el.localName !== 'summary') continue;
        gesehen.add(el);
        const k = (window.__texte2k = (window.__texte2k || 0) + 1);
        el.setAttribute('data-texte2-k', String(k));
        const ziel = el.getAttribute('aria-controls');
        liste.push({ k, ziel: ziel || null, label: (el.getAttribute('aria-label') || el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60) });
      }
    }
    return liste;
  }, { bereichSel, art });
}
// Einen Schalter betätigen; neu = (Zielbereich nachher − vorher) + (Schalter nachher − vorher)
async function betaetige(page, s, ersatzWurzel) {
  const sel = `[data-texte2-k="${s.k}"]`;
  const zielSel = s.ziel ? `[id="${s.ziel.replace(/"/g, '\\"')}"]` : (ersatzWurzel || null);
  const vorBereich = zielSel ? await extrahiere(page, zielSel) : await extrahiere(page, null);
  const vorSchalter = await extrahiere(page, sel);
  const urlVor = page.url();
  // DOM-Klick statt Mausklick: ein Mausklick löst vorher Hover aus (Mega-Menü öffnet per onMouseEnter, der Klick
  // schließt es wieder) – das Ergebnis hinge von der Mausposition ab. el.click() feuert nur das Klick-Ereignis.
  await page.evaluate((sel) => { const el = document.querySelector(sel); if (!el) return; el.scrollIntoView({ block: 'center' }); el.click(); }, sel);
  await page.clock.runFor(400).catch(() => {});
  await netzRuhe(page, { ruhe: 200, max: 4000 });
  if (s.ziel) await page.waitForFunction((sel) => { const el = document.querySelector(sel); return !el || el.getAttribute('aria-expanded') !== 'false'; }, sel, { timeout: 3000 }).catch(() => {});
  await domRuhe(page);
  if (page.url().split('#')[0] !== urlVor.split('#')[0]) return { navigiert: page.url(), neu: [] };
  const nachBereich = zielSel ? await extrahiere(page, zielSel) : await extrahiere(page, null);
  const nachSchalter = await extrahiere(page, sel);
  const neu = [...minus(nachBereich.eintraege, vorBereich.eintraege), ...minus(nachSchalter.eintraege, vorSchalter.eintraege)];
  return { neu: neu.map((e) => ({ ...e, bei: s.label })), links: linksNeu(nachBereich.links, vorBereich.links), geoeffnet: !nachBereich.fehlt };
}
async function neueSeite(browser, ansicht, einwilligung, protokoll) {
  const v = ANSICHTEN[ansicht];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, deviceScaleFactor: 1,
    reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin' });
  await installSperre(context, { protokoll });
  await setzeEinwilligung(context, einwilligung);
  // Nur für Gegenproben: Init-Skript, das im Testlauf Text verändert (das Produkt bleibt unberührt)
  if (arg('probe')) await context.addInitScript({ path: path.resolve(arg('probe')) });
  const page = await context.newPage();
  // Netz-Ruhe: offene Anfragen zählen (nachgeladene Chunks nach clock.runFor, z. B. dynamic()-Widgets)
  OFFEN.set(page, 0);
  page.on('request', () => OFFEN.set(page, OFFEN.get(page) + 1));
  const fertig = () => OFFEN.set(page, Math.max(0, OFFEN.get(page) - 1));
  page.on('requestfinished', fertig);
  page.on('requestfailed', fertig);
  await page.clock.install({ time: FESTE_ZEIT });
  await page.clock.pauseAt(new Date(FESTE_ZEIT.getTime() + 1000));
  return { context, page };
}
const OFFEN = new WeakMap();
async function netzRuhe(page, { ruhe = 300, max = 8000 } = {}) {
  const start = Date.now();
  let seit = Date.now();
  while (Date.now() - start < max) {
    await new Promise((r) => setTimeout(r, 50)); // Abfrage-Takt
    if ((OFFEN.get(page) || 0) > 0) seit = Date.now();
    else if (Date.now() - seit >= ruhe) return true;
  }
  return false;
}
async function lade(page, url) {
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await bereit(page);
  // virtuelle Zeit: Leerlauf-Widgets (requestIdleCallback ≤ 1,5 s) und Banner-Verzögerung; danach nachgeladene
  // Chunks abwarten (Netz-Ruhe) und den Effekten nach dem Laden noch einmal 500 ms virtuelle Zeit geben
  await page.clock.runFor(2500);
  await netzRuhe(page);
  await page.clock.runFor(500);
  await netzRuhe(page);
  await domRuhe(page);
  return resp?.status() ?? null;
}
async function findeDialog(page) {
  for (let n = 0; n < 8; n++) {
    const k = await page.evaluate(() => {
      const rx = /cookie|einwillig|consent/i;
      const imBild = (el) => {
        if (el.closest('[aria-hidden="true"], [inert]')) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.right > 0 && r.bottom > 0 && r.left < innerWidth && r.top < innerHeight;
      };
      const alle = [...document.querySelectorAll('[role="dialog"], [role="alertdialog"], dialog[open], [aria-modal]')].filter(imBild);
      const d = alle.find((el) => rx.test(el.getAttribute('aria-label') || '')) || alle.find((el) => rx.test(el.textContent || ''));
      if (!d) return null;
      d.setAttribute('data-texte2-dialog', '1');
      return '[data-texte2-dialog="1"]';
    });
    if (k) return k;
    await page.clock.runFor(500).catch(() => {});
    await domRuhe(page, { max: 1000 });
  }
  return null;
}
async function zustaendeSeite(browser, base, route, nur, global, protokoll) {
  const url = base + route;
  const z = {};
  const fehler = [];
  const sammle = async (name, fn) => { try { await fn(); } catch (e) { fehler.push(`${name}: ${String(e.message || e).split('\n')[0].slice(0, 160)}`); } };
  // Desktop, Einwilligung abgelehnt
  if (nur.has('geladen') || nur.has('mega') || nur.has('akkordeon')) {
    const { context, page } = await neueSeite(browser, 'd1440', 'abgelehnt', protokoll);
    try {
      const status = await lade(page, url);
      z.status = status;
      if (nur.has('geladen')) await sammle('geladen', async () => {
        const st = await statisch(page, url);
        const live = await extrahiere(page, null);
        z.geladen = { ansicht: 'd1440', neu: minus(live.eintraege, st.eintraege), fehlt: minus(st.eintraege, live.eintraege).length, links: linksNeu(live.links, st.links) };
        z.ids_client = linksNeu(live.ids, st.ids);
      });
      if (nur.has('mega') && global) await sammle('mega', async () => {
        const liste = await markiere(page, (await page.$('header nav, [role="banner"] nav')) ? 'header nav, [role="banner"] nav' : 'header, [role="banner"]', 'mega');
        const neu = [], links = [];
        for (const s of liste) {
          const r = await betaetige(page, s);
          if (r.navigiert) { fehler.push(`mega: Navigation ${r.navigiert}`); await lade(page, url); break; }
          neu.push(...r.neu); links.push(...(r.links || []));
          await page.keyboard.press('Escape').catch(() => {});
        }
        z.megamenue = { ansicht: 'd1440', schalter: liste.map((s) => s.label), neu, links: [...new Set(links)] };
      });
      if (nur.has('akkordeon')) await sammle('akkordeon', async () => {
        const hatMain = await page.evaluate(() => !!document.querySelector('main'));
        const liste = await markiere(page, hatMain ? 'main' : 'body', 'akkordeon');
        const neu = [], links = [];
        for (const s of liste) {
          const r = await betaetige(page, s, `[data-texte2-k="${s.k}"]`);
          if (r.navigiert) { fehler.push(`akkordeon: Navigation ${r.navigiert} bei „${s.label}“`); await lade(page, url); break; }
          neu.push(...r.neu); links.push(...(r.links || []));
        }
        z.akkordeons = { ansicht: 'd1440', schalter: liste.length, neu, links: [...new Set(links)] };
      });
    } finally { await context.close(); }
  }
  // Mobil, Einwilligung abgelehnt: Mobilmenü
  if (nur.has('mobil') && global) {
    const { context, page } = await neueSeite(browser, 'm375', 'abgelehnt', protokoll);
    try {
      await lade(page, url);
      await sammle('mobil', async () => {
        const liste = await markiere(page, 'header, [role="banner"]', 'kopf');
        const neu = [], links = [];
        const schalter = [];
        for (const s of liste) {
          const r = await betaetige(page, s);
          if (r.navigiert) { fehler.push(`mobil: Navigation ${r.navigiert}`); break; }
          schalter.push(s.label);
          neu.push(...r.neu); links.push(...(r.links || []));
          if (s.ziel) {
            const innen = await markiere(page, `[id="${s.ziel}"]`, 'innen');
            for (const t of innen) {
              const r2 = await betaetige(page, t, `[id="${s.ziel}"]`);
              if (r2.navigiert) { fehler.push(`mobil: Navigation ${r2.navigiert}`); break; }
              schalter.push(t.label);
              neu.push(...r2.neu); links.push(...(r2.links || []));
            }
          }
          await page.keyboard.press('Escape').catch(() => {});
        }
        z.mobilmenue = { ansicht: 'm375', schalter, neu, links: [...new Set(links)] };
      });
    } finally { await context.close(); }
  }
  // Banner: Erstbesuch, Einstellungen, Aufruf per #cookie-settings
  if (nur.has('banner') && global) {
    const { context, page } = await neueSeite(browser, 'd1440', 'erstbesuch', protokoll);
    try {
      await lade(page, url);
      await sammle('banner', async () => {
        const d = await findeDialog(page);
        if (!d) { z.banner_erstbesuch = { ansicht: 'd1440', gefunden: false, neu: [] }; return; }
        const erst = await extrahiere(page, d);
        z.banner_erstbesuch = { ansicht: 'd1440', gefunden: true, neu: erst.eintraege, links: erst.links };
        const knopf = await page.evaluate((d) => {
          const b = [...document.querySelector(d).querySelectorAll('button, [role="button"]')].find((x) => /einstellung|anpassen|individuell/i.test(x.textContent || '') && !/speichern|akzeptier|ablehn/i.test(x.textContent || ''));
          if (!b) return null;
          b.setAttribute('data-texte2-k', 'einst');
          return 'einst';
        }, d);
        if (!knopf) { z.banner_einstellungen = { ansicht: 'd1440', gefunden: false, neu: [] }; return; }
        const r = await betaetige(page, { k: 'einst', ziel: null, label: 'Einstellungen' }, d);
        const neu = [...r.neu], links = [...(r.links || [])];
        const innen = await markiere(page, d, 'innen');
        for (const t of innen) { const r2 = await betaetige(page, t, d); if (!r2.navigiert) neu.push(...r2.neu); links.push(...(r2.links || [])); }
        z.banner_einstellungen = { ansicht: 'd1440', gefunden: true, schalter: innen.length, neu, links: [...new Set(links)] };
      });
    } finally { await context.close(); }
    for (const befehl of HASH_BEFEHLE) {
      const { context: c2, page: p2 } = await neueSeite(browser, 'd1440', 'abgelehnt', protokoll);
      try {
        await lade(p2, url + '#' + befehl);
        await sammle('hash', async () => {
          const d = await findeDialog(p2);
          const e = d ? await extrahiere(p2, d) : { eintraege: [], links: [] };
          z['banner_hash_' + befehl] = { ansicht: 'd1440', gefunden: !!d, neu: e.eintraege, links: e.links };
        });
      } finally { await c2.close(); }
    }
  }
  return { zustaende: z, fehler };
}
async function modusZustaende() {
  const base = (arg('base', BASE) || BASE).replace(/\/$/, '');
  assertLocal(base);
  const satz = arg('satz', 'adhoc');
  const aus = ensureDir(arg('aus') ? path.resolve(arg('aus')) : satzOrdner(satz, true));
  const G = grundmenge();
  const nur = new Set((arg('nur') || ZUSTAENDE.join(',')).split(','));
  const seiten = arg('seiten') ? arg('seiten').split(',') : G.seiten;
  const globalSeiten = new Set(arg('seiten') ? seiten : (arg('global-seiten') ? arg('global-seiten').split(',') : G.hauptseiten));
  const protokoll = [];
  const t0 = Date.now();
  const browser = await chromium.launch();
  const ergebnis = {};
  let i = 0;
  const worker = async () => {
    while (i < seiten.length) {
      const s = seiten[i++];
      ergebnis[s] = await zustaendeSeite(browser, base, s, nur, globalSeiten.has(s), protokoll);
      process.stdout.write(ergebnis[s].fehler.length ? 'F' : '.');
    }
  };
  await Promise.all([worker(), worker()]); // höchstens 2 Browser-Kontexte gleichzeitig
  await browser.close();
  const sortiert = Object.fromEntries(seiten.filter((s) => ergebnis[s]).map((s) => [s, ergebnis[s]]));
  const zaehle = (k) => Object.values(sortiert).reduce((a, s) => a + (s.zustaende[k]?.neu?.length || 0), 0);
  const summe = {
    seiten: seiten.length, global_seiten: [...globalSeiten].filter((s) => seiten.includes(s)).length,
    neu_geladen: zaehle('geladen'), neu_megamenue: zaehle('megamenue'), neu_akkordeons: zaehle('akkordeons'), neu_mobilmenue: zaehle('mobilmenue'),
    neu_banner_erstbesuch: zaehle('banner_erstbesuch'), neu_banner_einstellungen: zaehle('banner_einstellungen'),
    neu_banner_hash: HASH_BEFEHLE.reduce((a, b) => a + zaehle('banner_hash_' + b), 0),
    seiten_mit_fehlern: Object.entries(sortiert).filter(([, s]) => s.fehler.length).map(([r]) => r),
    netz_protokoll: { fremd: protokoll.filter((p) => p.art === 'fremd').length, blockiert: protokoll.filter((p) => p.art === 'blockiert').length, anfrage: protokoll.filter((p) => p.art === 'anfrage').length },
    laufzeit_s: Math.round((Date.now() - t0) / 100) / 10,
  };
  const bedingungen = {
    browser: 'Chromium (Playwright 1.56.1)', ansichten: { geladen: 'd1440', mega: 'd1440', akkordeon: 'd1440', banner: 'd1440', mobil: 'm375' },
    einwilligung: 'abgelehnt (Banner: Erstbesuch ohne Cookie; Hash-Aufruf mit „abgelehnt“)', uhr: `fest ${FESTE_ZEIT.toISOString()}, pausiert; nach Laden runFor 2500 ms + Netz-Ruhe + 500 ms + Netz-Ruhe, je Schalter 400 ms + Netz-Ruhe`,
    reducedMotion: 'reduce', zustaende: [...nur], global_seiten: [...globalSeiten], sperre: 'installSperre (G5)', hash_befehle: HASH_BEFEHLE,
    probe: arg('probe') ? rel(path.resolve(arg('probe'))) + ' (GEGENPROBE – kein gültiger Messlauf)' : null,
    erfasst: 'je Zustand nur neu im DOM erschienene Einträge (Zielbereich per aria-controls bzw. Dialog, plus Schalter selbst); geladen = lebendes DOM − ausgeliefertes HTML',
  };
  const buildSatz = arg('build-satz') ? satzOrdner(arg('build-satz')) : (fs.existsSync(path.join(aus, '_satz.json')) ? aus : null);
  const fragmente = clientFragmente({ seiten: sortiert }, idsAusSatz(buildSatz));
  fragmente.gegen = buildSatz ? rel(buildSatz) : 'nur ids_client (kein Build-Satz)';
  summe.fragmente_client = { gesamt: fragmente.gesamt, ok: fragmente.ok, befehle: fragmente.befehle, fehlend: fragmente.fehlend.length, ziel_unbekannt: fragmente.ziel_unbekannt.length };
  fs.writeFileSync(path.join(aus, '_zustaende.json'), JSON.stringify({ satz, base, bedingungen, erstellt: jetzt(), summe, fragmente_client: fragmente, seiten: sortiert }, null, 1));
  console.log(`\n${JSON.stringify(summe)}\n→ ${rel(path.join(aus, '_zustaende.json'))}`);
}

// ---------------------------------------------------------------------------------------------------------------
// Freigabeliste (MIKROTEXTE.md): Markdown-Tabelle | Seite oder * | alt | neu | Klasse (K-012) | Paket |
function ladeFreigabe(datei) {
  if (!datei) return { datei: null, zeilen: [], warnungen: [] };
  const text = fs.readFileSync(datei, 'utf8');
  const zeilen = [];
  const warnungen = [];
  const zelle = (s) => {
    let v = s.replace(/\\\|/g, '|').trim();
    for (let n = 0; n < 2; n++) {
      const m = /^(`+)([\s\S]*)\1$/.exec(v) || /^"([\s\S]*)"$/.exec(v) || /^„([\s\S]*)[“”]$/.exec(v) || /^»([\s\S]*)«$/.exec(v) || /^‚([\s\S]*)[‘’]$/.exec(v);
      if (m) v = (m.length === 3 ? m[2] : m[1]).trim();
    }
    if (/^(–|-|—|∅|\(leer\)|leer)$/i.test(v)) return '';
    return v.replace(/[­]/g, '').replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
  };
  text.split('\n').forEach((l, n) => {
    if (!/^\s*\|/.test(l)) return;
    const teile = l.trim().replace(/^\|/, '').replace(/\|\s*$/, '').split(/(?<!\\)\|/);
    if (teile.length < 4) return;
    if (teile.every((t) => /^\s*:?-{2,}:?\s*$/.test(t))) return;
    const [seite, alt, neu, klasse, paket] = teile.map(zelle);
    if (/^seite/i.test(seite)) return;
    const k = parseInt((/[1-4]/.exec(klasse) || [])[0], 10) || null;
    const z = { zeile: n + 1, seite: seite || '*', alt, neu, klasse: k, paket: paket || '' };
    if (!k) warnungen.push(`Zeile ${n + 1}: Klasse „${klasse}“ ist keine K-012-Klasse 1–4 – Zeile unwirksam`);
    else if (k === 3 && alt !== neu) warnungen.push(`Zeile ${n + 1}: Klasse 3 (Etiketten/Badges): Wortlaut bleibt – Zeile unwirksam`);
    if (!alt && !neu) warnungen.push(`Zeile ${n + 1}: alt und neu leer – Zeile unwirksam`);
    z.wirksam = !!k && !(k === 3 && alt !== neu) && !!(alt || neu);
    zeilen.push(z);
  });
  return { datei, zeilen, warnungen };
}
const seitePasst = (muster, route) => muster === '*' || muster === route || (muster.endsWith('/*') && (route === muster.slice(0, -2) || route.startsWith(muster.slice(0, -1))));
function freigabeAenderung(F, route, a, b) {
  const kand = F.zeilen.filter((z) => z.wirksam && z.alt && seitePasst(z.seite, route) && a.wert.includes(z.alt));
  if (!kand.length) return null;
  const n = (s) => s.replace(/\s+/g, ' ').trim();
  for (const z of kand) if (n(a.wert.split(z.alt).join(z.neu)) === b.wert) return [z.zeile];
  let w = a.wert;
  for (const z of kand) w = w.split(z.alt).join(z.neu);
  return n(w) === b.wert ? kand.map((z) => z.zeile) : null;
}
function freigabeEntfernung(F, route, a) {
  const z = F.zeilen.find((z) => z.wirksam && z.alt && !z.neu && seitePasst(z.seite, route) && a.wert === z.alt);
  return z ? [z.zeile] : null;
}
function freigabeHinzu(F, route, b) {
  const z = F.zeilen.find((z) => z.wirksam && !z.alt && z.neu && seitePasst(z.seite, route) && b.wert === z.neu);
  return z ? [z.zeile] : null;
}

// LCS-Ausrichtung zweier Schlüssel-Folgen → Paare [i, j]
function lcs(a, b) {
  const paare = [];
  let s = 0;
  while (s < a.length && s < b.length && a[s] === b[s]) { paare.push([s, s]); s++; }
  let ea = a.length, eb = b.length;
  const ende = [];
  while (ea > s && eb > s && a[ea - 1] === b[eb - 1]) { ea--; eb--; ende.push([ea, eb]); }
  const n = ea - s, m = eb - s;
  if (n > 0 && m > 0) {
    if (n * m <= 40e6 && n < 65535 && m < 65535) {
      const ids = new Map();
      const id = (x) => { if (!ids.has(x)) ids.set(x, ids.size); return ids.get(x); };
      const A = Int32Array.from({ length: n }, (_, i) => id(a[s + i]));
      const B = Int32Array.from({ length: m }, (_, j) => id(b[s + j]));
      const W = m + 1;
      const T = new Uint16Array((n + 1) * W);
      for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
        T[i * W + j] = A[i] === B[j] ? T[(i + 1) * W + j + 1] + 1 : Math.max(T[(i + 1) * W + j], T[i * W + j + 1]);
      }
      let i = 0, j = 0;
      while (i < n && j < m) {
        if (A[i] === B[j]) { paare.push([s + i, s + j]); i++; j++; } else if (T[(i + 1) * W + j] >= T[i * W + j + 1]) i++; else j++;
      }
    } else {
      // sehr große Mitte: gieriger Vorwärtsabgleich (selten; im Bericht vermerkt)
      const pos = new Map();
      for (let j = s; j < eb; j++) { if (!pos.has(b[j])) pos.set(b[j], []); pos.get(b[j]).push(j); }
      let j0 = s;
      for (let i = s; i < ea; i++) { const l = pos.get(a[i]); if (!l) continue; const j = l.find((x) => x >= j0); if (j !== undefined) { paare.push([i, j]); j0 = j + 1; } }
    }
  }
  return paare.concat(ende.reverse());
}

// Zwei Eintragsfolgen vergleichen → Befunde
function vergleicheFolge(route, A, B, F, volatil, kontext = '') {
  const ka = A.map(schluessel), kb = B.map(schluessel);
  const paare = lcs(ka, kb);
  const abschnitt = (L) => { let h = '(Anfang)'; return L.map((e) => { if (istUeberschrift(e)) h = `${e.ebene}: ${e.wert}`; return h; }); };
  const absA = abschnitt(A), absB = abschnitt(B);
  const istVolatil = (e) => volatil.some((r) => r.test(e.wert));
  // Lücken zwischen den Paaren
  const luecken = [];
  let pi = 0, pj = 0;
  for (const [i, j] of [...paare, [A.length, B.length]]) {
    if (i > pi || j > pj) luecken.push({ a: range(pi, i), b: range(pj, j) });
    pi = i + 1; pj = j + 1;
  }
  // 1) Verschiebungen: gleicher Schlüssel in irgendeiner Lücke von A und von B
  const freiA = new Set(luecken.flatMap((l) => l.a)), freiB = new Set(luecken.flatMap((l) => l.b));
  const befunde = [];
  const posB = new Map();
  for (const j of freiB) { const k = kb[j]; if (!posB.has(k)) posB.set(k, []); posB.get(k).push(j); }
  for (const i of [...freiA].sort((x, y) => x - y)) {
    const l = posB.get(ka[i]);
    if (!l || !l.length) continue;
    const j = l.shift();
    freiA.delete(i); freiB.delete(j);
    const gleich = absA[i] === absB[j];
    befunde.push({ farbe: 'gelb', art: gleich ? 'umgestellt' : 'verschoben', typ: typVon(A[i]), wert: A[i].wert, abschnitt_alt: absA[i], abschnitt_neu: absB[j], kontext });
  }
  // 1b) Neu gegliedert: gleicher Text, anders auf Blöcke verteilt (z. B. <span> → <div>) – Vergleich der Textfolgen
  //     einer Lücke ohne Leerraum; nur Einträge der Art text, andere Arten dazwischen werden übersprungen
  const ohneLeer = (w) => w.replace(/\s+/g, '');
  for (const l of luecken) {
    const la = l.a.filter((i) => freiA.has(i) && A[i].art === 'text' && !A[i].attr), lb = l.b.filter((j) => freiB.has(j) && B[j].art === 'text' && !B[j].attr);
    let x = 0, y = 0;
    while (x < la.length && y < lb.length) {
      let sa = ohneLeer(A[la[x]].wert), sb = ohneLeer(B[lb[y]].wert);
      if (!sa.startsWith(sb) && !sb.startsWith(sa)) { if (sa.length >= sb.length) y++; else x++; continue; }
      const ga = [la[x]], gb = [lb[y]];
      let xa = x + 1, yb = y + 1;
      while (sa !== sb) {
        if (sa.length < sb.length && xa < la.length && sb.startsWith(sa + ohneLeer(A[la[xa]].wert))) { sa += ohneLeer(A[la[xa]].wert); ga.push(la[xa++]); }
        else if (sb.length < sa.length && yb < lb.length && sa.startsWith(sb + ohneLeer(B[lb[yb]].wert))) { sb += ohneLeer(B[lb[yb]].wert); gb.push(lb[yb++]); }
        else break;
      }
      if (sa === sb) {
        ga.forEach((i) => freiA.delete(i)); gb.forEach((j) => freiB.delete(j));
        befunde.push({ farbe: 'gelb', art: 'neu-gegliedert', typ: 'text', alt: ga.map((i) => A[i].wert), neu: gb.map((j) => B[j].wert), kontext });
        x = xa; y = yb;
      } else { x++; }
    }
  }
  // 2) Änderungen: in derselben Lücke, gleicher Typ, nach größter Ähnlichkeit gepaart (Bigramm-Dice ≥ 0,3,
  //    oder genau ein Kandidat je Seite der Lücke)
  for (const l of luecken) {
    const la = l.a.filter((i) => freiA.has(i)), lb = l.b.filter((j) => freiB.has(j));
    for (const i of la) {
      const gleicherTyp = lb.filter((x) => freiB.has(x) && typVon(B[x]) === typVon(A[i]));
      let j, bs = -1;
      for (const x of gleicherTyp) { const sim = aehnlich(A[i].wert, B[x].wert); if (sim > bs) { bs = sim; j = x; } }
      const einzeln = gleicherTyp.length === 1 && la.filter((y) => freiA.has(y) && typVon(A[y]) === typVon(A[i])).length === 1;
      if (j === undefined || (bs < 0.3 && !einzeln)) continue;
      freiA.delete(i); freiB.delete(j);
      const a = A[i], b = B[j];
      const f = istUeberschrift(a) ? null : freigabeAenderung(F, route, a, b);
      if (f) befunde.push({ farbe: 'gruen', art: 'geaendert', typ: typVon(a), alt: a.wert, neu: b.wert, freigabe: f, kontext });
      else if (istVolatil(a) && istVolatil(b)) befunde.push({ farbe: 'gelb', art: 'geaendert', typ: typVon(a), alt: a.wert, neu: b.wert, grund: 'volatil', kontext });
      else befunde.push({ farbe: 'rot', art: 'geaendert', typ: typVon(a), alt: a.wert, neu: b.wert, abschnitt: absA[i], grund: istUeberschrift(a) ? 'Überschrift – keine Mikrotext-Klasse (K-012)' : 'nicht in der Freigabeliste', kontext });
    }
  }
  // 3) Rest: entfernt / hinzu
  for (const i of [...freiA].sort((x, y) => x - y)) {
    const a = A[i];
    const f = istUeberschrift(a) ? null : freigabeEntfernung(F, route, a);
    if (f) befunde.push({ farbe: 'gruen', art: 'entfernt', typ: typVon(a), alt: a.wert, freigabe: f, kontext });
    else if (istVolatil(a)) befunde.push({ farbe: 'gelb', art: 'entfernt', typ: typVon(a), alt: a.wert, grund: 'volatil', kontext });
    else befunde.push({ farbe: 'rot', art: 'entfernt', typ: typVon(a), alt: a.wert, abschnitt: absA[i], grund: istUeberschrift(a) ? 'Überschrift entfernt' : 'nicht in der Freigabeliste', kontext });
  }
  for (const j of [...freiB].sort((x, y) => x - y)) {
    const b = B[j];
    if (istUeberschrift(b)) { befunde.push({ farbe: 'rot', art: 'hinzu', typ: typVon(b), neu: b.wert, abschnitt: absB[j], grund: 'hinzugekommene Überschrift', kontext }); continue; }
    const f = freigabeHinzu(F, route, b);
    const doppelt = kb.indexOf(kb[j]) !== j;
    befunde.push({ farbe: f ? 'gruen' : 'gelb', art: 'hinzu', typ: typVon(b), neu: b.wert, abschnitt: absB[j], ...(f ? { freigabe: f } : {}), ...(doppelt ? { grund: 'Dublette eines vorhandenen Eintrags' } : istVolatil(b) ? { grund: 'volatil' } : {}), kontext });
  }
  // 3b) Enthaltensein (P3-16): Ein roter Text-Befund (entfernt oder geändert, keine Überschrift), dessen alter Wortlaut
  //     (mindestens 8 Zeichen) vollständig in einem Text-Eintrag des neuen Stands steht oder genau der Folge von bis zu
  //     4 aufeinanderfolgenden neuen Text-Einträgen entspricht, ist neu gegliedert, nicht verloren → GELB mit Grund.
  //     Überschriften, Attribute (alt, aria-*, title) und Metadaten bleiben streng.
  const n1 = (w) => w.replace(/\s+/g, ' ').trim();
  const textB = B.filter((e) => typVon(e) === 'text').map((e) => n1(e.wert));
  const enthalten = (alt) => {
    const t = n1(alt || '');
    if (t.length < 8) return false;
    if (textB.some((w) => w.includes(t))) return true;
    for (let k = 0; k < textB.length; k++) {
      let folge = '';
      for (let m = k; m < Math.min(k + 4, textB.length); m++) {
        folge = n1(`${folge} ${textB[m]}`);
        if (folge === t) return true;
        if (folge.length > t.length) break;
      }
    }
    return false;
  };
  for (const b of befunde) {
    if (b.farbe !== 'rot' || !['entfernt', 'geaendert'].includes(b.art) || b.typ !== 'text' || !enthalten(b.alt)) continue;
    b.farbe = 'gelb'; b.art_vorher = b.art; b.art = 'neu-gegliedert'; b.grund = 'Wortlaut vollständig im neuen Stand enthalten (Block zusammengefasst oder geteilt)';
  }
  // 4) zusätzliche H1
  const h1A = A.filter((e) => e.ebene === 'h1').length, h1B = B.filter((e) => e.ebene === 'h1').length;
  if (h1B > 1 && h1B > h1A) befunde.push({ farbe: 'rot', art: 'h1-doppelt', anzahl_alt: h1A, anzahl_neu: h1B, grund: 'jede zweite H1', kontext });
  else if (h1B > 1) befunde.push({ farbe: 'gelb', art: 'h1-doppelt', anzahl_alt: h1A, anzahl_neu: h1B, grund: 'vorbestehend', kontext });
  if (h1A >= 1 && h1B === 0 && !kontext) befunde.push({ farbe: 'rot', art: 'h1-fehlt', anzahl_alt: h1A, anzahl_neu: 0, kontext });
  return befunde;
}
function range(a, b) { const r = []; for (let x = a; x < b; x++) r.push(x); return r; }
const bigramme = (t) => { const m = new Map(); const s = t.toLowerCase(); for (let i = 0; i < s.length - 1; i++) { const g = s.slice(i, i + 2); m.set(g, (m.get(g) || 0) + 1); } return m; };
function aehnlich(a, b) {
  if (a === b) return 1;
  const A = bigramme(a), B = bigramme(b);
  let gem = 0, na = 0, nb = 0;
  for (const v of A.values()) na += v;
  for (const v of B.values()) nb += v;
  for (const [g, v] of A) gem += Math.min(v, B.get(g) || 0);
  return na + nb ? (2 * gem) / (na + nb) : 0;
}

// Vergleichsregel (P3-16): Anführungszeichen sind Satz, nicht Wortlaut – „…“, “…”, »…«, ‚…‘ und gerade "…" werden vor dem
// Vergleich auf " vereinheitlicht (Kundenstimmen im Kern typografisch, im Bestand gerade). Alles andere bleibt Zeichen für Zeichen.
const ANFUEHRUNG = /[„“”‟«»"]/gu;
function vereinheitlicheZitat(e) { return typeof e?.wert === 'string' ? { ...e, wert: e.wert.replace(ANFUEHRUNG, '"') } : e; }
function ladeSeite(dir, datei) {
  const p = JSON.parse(fs.readFileSync(path.join(dir, datei), 'utf8'));
  if (Array.isArray(p.eintraege)) p.eintraege = p.eintraege.map(vereinheitlicheZitat);
  return p;
}
function modusVergleich() {
  const i = ARGV.indexOf('--vergleich');
  const nameA = ARGV[i + 1], nameB = ARGV[i + 2];
  const dirA = satzOrdner(nameA), dirB = satzOrdner(nameB);
  const F = ladeFreigabe(arg('freigabe') ? path.resolve(arg('freigabe')) : null);
  const volatil = args('volatil').map((r) => new RegExp(r, 'u'));
  const t0 = Date.now();
  const seiten = {};
  const add = (route, bs) => { if (!bs.length) return; (seiten[route] ||= []).push(...bs); };
  let SA = null, SB = null;
  if (fs.existsSync(path.join(dirA, '_satz.json')) && fs.existsSync(path.join(dirB, '_satz.json'))) {
    SA = JSON.parse(fs.readFileSync(path.join(dirA, '_satz.json'), 'utf8'));
    SB = JSON.parse(fs.readFileSync(path.join(dirB, '_satz.json'), 'utf8'));
    const idsB = new Map();
    const linksB = new Map();
    for (const route of Object.keys(SB.seiten)) { const p = ladeSeite(dirB, SB.seiten[route].datei); idsB.set(route, new Set(p.ids)); linksB.set(route, p.links); }
    for (const route of Object.keys(SA.seiten)) {
      const sa = SA.seiten[route], sb = SB.seiten[route];
      if (!sb) { add(route, [{ farbe: 'rot', art: 'seite-fehlt', quelle: sa.quelle }]); continue; }
      if (sa.status !== sb.status) add(route, [{ farbe: 'rot', art: 'status', alt: sa.status, neu: sb.status }]);
      if (sa.hash === sb.hash) continue;
      const pa = ladeSeite(dirA, sa.datei), pb = ladeSeite(dirB, sb.datei);
      add(route, vergleicheFolge(route, pa.eintraege, pb.eintraege, F, volatil));
    }
    for (const route of Object.keys(SB.seiten)) {
      if (SA.seiten[route]) continue;
      const pb = ladeSeite(dirB, SB.seiten[route].datei);
      const h1 = pb.eintraege.filter((e) => e.ebene === 'h1').length;
      add(route, [{ farbe: 'gelb', art: 'seite-neu', quelle: SB.seiten[route].quelle, eintraege: pb.eintraege.length }, ...(h1 > 1 ? [{ farbe: 'rot', art: 'h1-doppelt', anzahl_neu: h1 }] : [])]);
    }
    // Fragmente (N-18): neue kaputte Ziele in B rot, vorbestehende gelb; Anker, auf die A verweist, müssen in B bleiben
    const fehlendA = new Set((SA.fragmente?.fehlend || []).map((f) => `${f.seite} ${f.href}`));
    for (const f of SB.fragmente?.fehlend || []) add(f.seite, [{ farbe: fehlendA.has(`${f.seite} ${f.href}`) ? 'gelb' : 'rot', art: 'fragment-fehlt', href: f.href, ziel: f.ziel, id: f.id, ...(fehlendA.has(`${f.seite} ${f.href}`) ? { grund: 'vorbestehend' } : {}) }]);
    for (const z of SA.fragmente?.ziele || []) {
      if (!SA.seiten[z.ziel]) continue;
      const pa = idsB.get(z.ziel);
      const warDa = !(SA.fragmente.fehlend || []).some((f) => f.ziel === z.ziel && f.id === z.id);
      if (warDa && (!pa || !pa.has(z.id))) add(z.ziel, [{ farbe: 'rot', art: 'anker-verloren', id: z.id, verweise_in_A: z.verweise, von: z.von }]);
    }
    const pflichtA = new Map((SA.fragmente?.pflichtanker || []).map((p) => [p.anker, p.ok]));
    for (const anker of new Set([...pflichtA.keys(), ...PFLICHTANKER])) {
      const [r, id] = anker.split('#');
      const okB = !!idsB.get(r || '/')?.has(id);
      if (!okB) add(r || '/', [{ farbe: pflichtA.get(anker) ? 'rot' : 'gelb', art: 'pflichtanker-fehlt', anker, ...(pflichtA.get(anker) ? {} : { grund: 'fehlte schon in A' }) }]);
    }
    const befA = new Set((SA.fragmente?.befehle || []).map((b) => b.href));
    const befB = new Set((SB.fragmente?.befehle || []).map((b) => b.href));
    for (const h of befA) if (!befB.has(h)) add('*', [{ farbe: 'gelb', art: 'hash-befehl-ohne-link', href: h, grund: 'kein Link mehr auf diesen Hash-Befehl (Funktion per Zustand banner_hash prüfen)' }]);
  }
  // Zustände
  const ZA = fs.existsSync(path.join(dirA, '_zustaende.json')) ? JSON.parse(fs.readFileSync(path.join(dirA, '_zustaende.json'), 'utf8')) : null;
  const ZB = fs.existsSync(path.join(dirB, '_zustaende.json')) ? JSON.parse(fs.readFileSync(path.join(dirB, '_zustaende.json'), 'utf8')) : null;
  let zustaendeVerglichen = 0;
  if (ZA && ZB) {
    for (const [route, sa] of Object.entries(ZA.seiten)) {
      const sb = ZB.seiten[route];
      if (!sb) { add(route, [{ farbe: 'gelb', art: 'zustaende-nicht-gemessen', grund: 'Seite fehlt im Zustandslauf B' }]); continue; }
      for (const [name, za] of Object.entries(sa.zustaende)) {
        if (!za || typeof za !== 'object' || !Array.isArray(za.neu)) continue;
        const zb = sb.zustaende[name];
        zustaendeVerglichen++;
        if (!zb) {
          // nicht gemessen (Teil-Lauf mit --nur bzw. Seite nicht in --global-seiten) ist gelb, sonst fehlt der Zustand
          const gruppe = name === 'megamenue' ? 'mega' : name === 'akkordeons' ? 'akkordeon' : name === 'mobilmenue' ? 'mobil' : name.startsWith('banner') ? 'banner' : name;
          const gemessen = (ZB.bedingungen?.zustaende || []).includes(gruppe) && (!['mega', 'mobil', 'banner'].includes(gruppe) || (ZB.bedingungen?.global_seiten || []).includes(route));
          add(route, [{ farbe: gemessen && za.neu.length ? 'rot' : 'gelb', art: gemessen ? 'zustand-fehlt' : 'zustand-nicht-gemessen', zustand: name, eintraege_alt: za.neu.length }]);
          continue;
        }
        if (za.gefunden && zb.gefunden === false) add(route, [{ farbe: 'rot', art: 'zustand-nicht-erreicht', zustand: name }]);
        // Ein Eintrag, der im Bestand erst im Zustand erscheint (z. B. Mobilmenü), im neuen Stand aber schon im Grundzustand
        // der Seite steht (serverseitig gerendertes Menü), ist vorhanden, nicht entfernt → GELB mit Grund.
        const basisB = SB && SB.seiten[route] ? ladeSeite(dirB, SB.seiten[route].datei).eintraege || [] : [];
        const nz = (w) => String(w || '').replace(/\s+/g, ' ').trim();
        const imGrundB = (alt, typ) => { const t = nz(alt); return basisB.some((e) => typVon(e) === typ && (nz(e.wert) === t || (typ === 'text' && t.length >= 8 && nz(e.wert).includes(t)))); };
        add(route, vergleicheFolge(route, za.neu, zb.neu, F, volatil, name).filter((b) => b.art !== 'h1-fehlt')
          .map((b) => (b.farbe === 'rot' && b.art === 'entfernt' && imGrundB(b.alt, b.typ) ? { ...b, farbe: 'gelb', grund: 'im Grundzustand des neuen Stands bereits vorhanden' } : b)));
      }
    }
    // Erst nach dem Laden vorhanden: Ein im Build-HTML „entfernter“ Eintrag, den der neue Stand im Zustand „geladen“ zeigt
    // (clientseitig ergänzte Bedienelemente, z. B. Karussell-Knöpfe), ist für Besucher vorhanden → GELB mit Grund.
    for (const [route, liste] of Object.entries(seiten)) {
      const geladen = ZB?.seiten?.[route]?.zustaende?.geladen?.neu || [];
      if (!geladen.length) continue;
      for (const b of liste) {
        if (b.farbe === 'rot' && b.art === 'entfernt' && !b.kontext && geladen.some((e) => typVon(e) === b.typ && e.wert === b.alt)) {
          b.farbe = 'gelb'; b.grund = 'im neuen Stand erst nach dem Laden vorhanden (Zustand „geladen“)';
        }
      }
    }
    const fa = clientFragmente(ZA, idsAusSatz(fs.existsSync(path.join(dirA, '_satz.json')) ? dirA : null));
    const fb = clientFragmente(ZB, idsAusSatz(fs.existsSync(path.join(dirB, '_satz.json')) ? dirB : null));
    const warFehlend = new Set(fa.fehlend.map((f) => `${f.seite} ${f.href}`));
    for (const f of fb.fehlend) add(f.seite, [{ farbe: warFehlend.has(`${f.seite} ${f.href}`) ? 'gelb' : 'rot', art: 'fragment-fehlt', zustand: f.zustand, href: f.href, ziel: f.ziel, id: f.id, ...(warFehlend.has(`${f.seite} ${f.href}`) ? { grund: 'vorbestehend' } : {}) }]);
  }
  // Summen
  const alle = Object.entries(seiten).flatMap(([r, bs]) => bs.map((b) => ({ seite: r, ...b })));
  const zahl = (farbe, art) => alle.filter((b) => b.farbe === farbe && (!art || b.art === art)).length;
  const summe = {
    rot: zahl('rot'), gelb: zahl('gelb'), gruen_freigegeben: zahl('gruen'),
    seiten_rot: [...new Set(alle.filter((b) => b.farbe === 'rot').map((b) => b.seite))].length,
    rot_nach_art: Object.fromEntries([...new Set(alle.filter((b) => b.farbe === 'rot').map((b) => b.art))].map((a) => [a, zahl('rot', a)])),
    gelb_nach_art: Object.fromEntries([...new Set(alle.filter((b) => b.farbe === 'gelb').map((b) => b.art))].map((a) => [a, zahl('gelb', a)])),
    seiten_verglichen: SA ? Object.keys(SA.seiten).length : 0, zustaende_verglichen: zustaendeVerglichen,
    freigabe_zeilen: F.zeilen.length, freigabe_warnungen: F.warnungen.length, laufzeit_s: Math.round((Date.now() - t0) / 100) / 10,
  };
  const ergebnis = summe.rot ? 'ROT' : 'GRÜN';
  const bericht = {
    satz: `${nameA} → ${nameB}`, base: ZB?.base ?? null,
    bedingungen: { a: rel(dirA), b: rel(dirB), freigabe: F.datei ? rel(F.datei) : null, volatil: args('volatil'), regeln: 'Anführungszeichen vor dem Vergleich vereinheitlicht. ROT: Entfernung/Änderung ohne Freigabe, hinzugekommene Überschrift, zusätzliche H1, fehlende Seite, Statuswechsel, neues kaputtes Fragment, verlorener Anker, verlorener Zustand. GELB: hinzugekommener sonstiger Text, Verschiebung, neu gegliedert (auch: alter Text vollständig in neuem Block enthalten), vorbestehend, volatil. GRÜN: per Freigabeliste.' },
    erstellt: jetzt(), ergebnis, summe, freigabe: { datei: F.datei ? rel(F.datei) : null, warnungen: F.warnungen, genutzt: [...new Set(alle.flatMap((b) => b.freigabe || []))].sort((x, y) => x - y) },
    seiten: Object.fromEntries(Object.entries(seiten).sort(([x], [y]) => x.localeCompare(y)).map(([r, bs]) => [r, { rot: bs.filter((b) => b.farbe === 'rot'), gelb: bs.filter((b) => b.farbe === 'gelb'), gruen: bs.filter((b) => b.farbe === 'gruen') }])),
  };
  const ziel = arg('aus') ? path.resolve(arg('aus')) : path.join(ensureDir(path.join(RELAUNCH, 'cache', 'texte2', 'vergleiche')), `${path.basename(nameA)}__${path.basename(nameB)}.json`);
  ensureDir(path.dirname(ziel));
  fs.writeFileSync(ziel, JSON.stringify(bericht, null, 1));
  console.log(JSON.stringify({ ergebnis, ...summe }));
  for (const b of alle.filter((x) => x.farbe === 'rot').slice(0, 15)) console.log(`ROT ${b.seite} ${b.kontext ? '[' + b.kontext + '] ' : ''}${b.art} ${b.typ || ''} ${b.alt !== undefined ? '„' + String(b.alt).slice(0, 70) + '“' : ''}${b.neu !== undefined ? ' → „' + String(b.neu).slice(0, 70) + '“' : ''}${b.href ? b.href : ''}${b.id ? ' #' + b.id : ''}`);
  for (const w of F.warnungen) console.log('WARNUNG Freigabe ' + w);
  console.log('→ ' + rel(ziel));
  process.exit(summe.rot && hat('streng') ? 1 : 0);
}

// ---------------------------------------------------------------------------------------------------------------
if (hat('build')) await modusBuild();
else if (hat('zustaende')) await modusZustaende();
else if (hat('vergleich')) modusVergleich();
else {
  console.log('Nutzung: node texte2.mjs --build <.next> --satz <name> | --zustaende --base <url> --satz <name> | --vergleich <satzA> <satzB> [--freigabe MIKROTEXTE.md]');
  process.exit(2);
}
