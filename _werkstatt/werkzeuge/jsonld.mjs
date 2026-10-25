#!/usr/bin/env node
// E3-SEO-JSONLD · Prüfung der strukturierten Daten je Seite (E-049). Nur HTTP über fetch, kein Browser, nur lokale Server.
// Nutzung: node jsonld.mjs (--seiten /a,/b | --ordner bad,fliesen) [--ziel DIR]
// --ordner nimmt die Seite des Ordners und alle Unterseiten unter src/app/(bestand)/<ordner> (dynamische Routen mit dem
// ersten Wert aus --beispiel ordner/[param]=wert, sonst übersprungen und gemeldet).
//
// Regeln je Seite (Adresse U = SITE + Pfad, Startseite ohne Schrägstrich):
// 1. Jeder JSON-LD-Block ist parsebar.
// 2. Seitenknoten (WebPage, AboutPage, ContactPage, CollectionPage, ItemPage, FAQPage, ProfilePage): mindestens einer hat
//    url oder @id auf U (ohne #…); keiner zeigt auf eine andere Adresse (geerbte Knoten eines Ordner-Layouts).
// 3. Genau eine BreadcrumbList; ihr letztes Element zeigt auf U.
// 4. Kein @id doppelt mit verschiedenem Inhalt (zwei Blöcke für dieselbe Seite).
// 5. Die Beschreibung des eigenen Seitenknotens gleicht der Meta-Beschreibung der Seite (E3-SEO-META, E-053), sofern beide da sind.
// Ergebnis: Tabelle auf der Konsole und jsonld.json im Ziel; Exit 1, wenn eine Seite rot ist.
import fs from 'node:fs';
import path from 'node:path';
import { BASE, REPO, SCRATCH, assertLocal } from './lib.mjs';

const SITE = 'https://www.tezgel.de'; // src/lib/schema.ts (SITE_URL)
const SEITENTYPEN = new Set(['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage', 'ItemPage', 'FAQPage', 'ProfilePage']);

function argument(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}

/** Adressen aus den Ordnern: page.* unter src/app/(bestand)/<ordner>, ohne *.dev.*; dynamische Teile über --beispiel */
function ausOrdnern(ordner, beispiele) {
  const wurzel = path.join(REPO, 'src/app/(bestand)');
  const adressen = [];
  const uebersprungen = [];
  const lauf = (dir, teile) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) lauf(path.join(dir, e.name), [...teile, e.name]);
      else if (/^page\.(jsx?|tsx?)$/.test(e.name)) {
        const roh = '/' + teile.join('/');
        const pfad = roh.replace(/\[[^\]]+\]/g, (m) => beispiele[`${teile.slice(0, teile.indexOf(m)).join('/')}/${m}`] ?? m);
        if (/\[/.test(pfad)) uebersprungen.push(roh);
        else adressen.push(pfad);
      }
    }
  };
  for (const o of ordner) lauf(path.join(wurzel, o), [o]);
  return { adressen, uebersprungen };
}

const ohneFragment = (u) => String(u ?? '').split('#')[0].replace(/\/+$/, '');

function knotenAus(block) {
  const liste = [];
  const geh = (x) => {
    if (Array.isArray(x)) x.forEach(geh);
    else if (x && typeof x === 'object') {
      if (x['@type']) liste.push(x);
      if (x['@graph']) geh(x['@graph']);
    }
  };
  geh(block);
  return liste;
}

async function pruefe(pfad) {
  const u = pfad === '/' ? SITE : SITE + pfad;
  const befunde = [];
  const antwort = await fetch(BASE + pfad, { redirect: 'manual' });
  if (antwort.status !== 200) return { pfad, status: antwort.status, gruen: false, befunde: [`HTTP ${antwort.status}`] };
  const html = await antwort.text();
  const bloecke = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const knoten = [];
  for (const b of bloecke) {
    try {
      knoten.push(...knotenAus(JSON.parse(b)));
    } catch {
      befunde.push('JSON-LD-Block nicht parsebar');
    }
  }
  const typ = (k) => [].concat(k['@type']);
  const seiten = knoten.filter((k) => typ(k).some((t) => SEITENTYPEN.has(t)));
  const eigene = seiten.filter((k) => ohneFragment(k.url ?? k['@id']) === ohneFragment(u));
  const fremde = seiten.filter((k) => ohneFragment(k.url ?? k['@id']) !== ohneFragment(u));
  if (eigene.length === 0) befunde.push('kein Seitenknoten (WebPage …) für diese Adresse');
  const ent = (x) => x.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const meta = ent((/<meta name="description" content="([^"]*)"/.exec(html) || [])[1] ?? '');
  for (const k of eigene) {
    if (meta && typeof k.description === 'string' && k.description !== meta) {
      befunde.push(`Beschreibung des Seitenknotens weicht von der Meta-Beschreibung ab: „${k.description.slice(0, 60)}…“`);
    }
  }
  for (const k of fremde) befunde.push(`Seitenknoten einer anderen Adresse: ${typ(k).join('/')} ${k.url ?? k['@id']}`);
  const kruemel = knoten.filter((k) => typ(k).includes('BreadcrumbList'));
  if (kruemel.length !== 1) befunde.push(`${kruemel.length} BreadcrumbList (genau eine erwartet)`);
  for (const k of kruemel) {
    const elemente = [].concat(k.itemListElement ?? []);
    const letztes = elemente[elemente.length - 1];
    const ziel = ohneFragment(typeof letztes?.item === 'string' ? letztes.item : letztes?.item?.['@id']);
    if (ziel !== ohneFragment(u)) befunde.push(`BreadcrumbList endet auf ${ziel || '(leer)'} statt auf ${u}`);
  }
  const ids = new Map();
  for (const k of knoten) {
    if (!k['@id']) continue;
    const inhalt = JSON.stringify(k);
    if (ids.has(k['@id']) && ids.get(k['@id']) !== inhalt) befunde.push(`@id doppelt mit verschiedenem Inhalt: ${k['@id']}`);
    ids.set(k['@id'], inhalt);
  }
  return {
    pfad,
    status: 200,
    gruen: befunde.length === 0,
    bloecke: bloecke.length,
    typen: [...new Set(knoten.flatMap(typ))],
    befunde,
  };
}

assertLocal();
const ziel = argument('ziel') ?? path.join(SCRATCH, 'jsonld');
const beispiele = Object.fromEntries((argument('beispiel') ?? '').split(',').filter(Boolean).map((p) => p.split('=')));
let adressen = (argument('seiten') ?? '').split(',').filter(Boolean);
let uebersprungen = [];
if (argument('ordner')) {
  const r = ausOrdnern(argument('ordner').split(',').filter(Boolean), beispiele);
  adressen = [...adressen, ...r.adressen];
  uebersprungen = r.uebersprungen;
}
if (adressen.length === 0) {
  console.error('Aufruf: node jsonld.mjs (--seiten /a,/b | --ordner bad,fliesen) [--beispiel "blog/[slug]=fliesen-reinigen-pflegen"] [--ziel DIR]');
  process.exit(2);
}
const ergebnisse = [];
for (const a of adressen) ergebnisse.push(await pruefe(a));
fs.mkdirSync(ziel, { recursive: true });
fs.writeFileSync(path.join(ziel, 'jsonld.json'), JSON.stringify({ base: BASE, ergebnisse, uebersprungen }, null, 2));
for (const r of ergebnisse) console.log(`${r.gruen ? 'GRÜN' : 'ROT '} ${r.pfad}${r.befunde.length ? '\n     ' + r.befunde.join('\n     ') : ''}`);
for (const u of uebersprungen) console.log(`ÜBERSPRUNGEN ${u} (dynamisch, ohne --beispiel)`);
const rot = ergebnisse.filter((r) => !r.gruen).length;
console.log(`Seiten ${ergebnisse.length} · GRÜN ${ergebnisse.length - rot} · ROT ${rot} · Ziel ${ziel}`);
process.exit(rot ? 1 : 0);
