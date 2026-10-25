#!/usr/bin/env node
// E3-SEO-META · Titel und Meta-Beschreibung je Seite aus dem ausgelieferten HTML (nur HTTP, nur lokale Server, E-050).
// Nutzung: node meta.mjs --seiten /a,/b | --liste datei.txt (eine Adresse je Zeile) [--ziel DIR]
// Je Seite: Status, Titel mit Länge, Beschreibung mit Länge; ROT bei Beschreibung außerhalb 120 bis 155 Zeichen, mit
// „...“ oder „…“ am Ende (abgeschnitten) oder bei Status ≠ 200. Ergebnis auf der Konsole und meta.json im Ziel; Exit 1 bei ROT.
import fs from 'node:fs';
import path from 'node:path';
import { BASE, SCRATCH, assertLocal } from './lib.mjs';

const argument = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const ent = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

assertLocal();
let seiten = (argument('seiten') ?? '').split(',').filter(Boolean);
if (argument('liste')) seiten = [...seiten, ...fs.readFileSync(argument('liste'), 'utf8').split('\n').map((z) => z.trim()).filter(Boolean)];
if (seiten.length === 0) {
  console.error('Aufruf: node meta.mjs --seiten /a,/b | --liste datei.txt [--ziel DIR]');
  process.exit(2);
}
const ziel = argument('ziel') ?? path.join(SCRATCH, 'meta');
const ergebnisse = [];
for (const pfad of seiten) {
  const antwort = await fetch(BASE + pfad, { redirect: 'manual' });
  const html = antwort.status === 200 ? await antwort.text() : '';
  const titel = ent((/<title>([^<]*)<\/title>/.exec(html) || [])[1] ?? '');
  const beschreibung = ent((/<meta name="description" content="([^"]*)"/.exec(html) || [])[1] ?? '');
  const befunde = [];
  if (antwort.status !== 200) befunde.push(`HTTP ${antwort.status}`);
  if (/(\.\.\.|…)$/.test(beschreibung)) befunde.push('Beschreibung abgeschnitten');
  if (beschreibung.length < 120 || beschreibung.length > 155) befunde.push(`Beschreibung ${beschreibung.length} Zeichen`);
  ergebnisse.push({ pfad, status: antwort.status, titel, titelLaenge: titel.length, beschreibung, laenge: beschreibung.length, gruen: befunde.length === 0, befunde });
}
fs.mkdirSync(ziel, { recursive: true });
fs.writeFileSync(path.join(ziel, 'meta.json'), JSON.stringify({ base: BASE, ergebnisse }, null, 2));
for (const r of ergebnisse) {
  console.log(`${r.gruen ? 'GRÜN' : 'ROT '} ${r.pfad}\n     Titel (${r.titelLaenge}): ${r.titel}\n     Beschreibung (${r.laenge}): ${r.beschreibung}${r.befunde.length ? '\n     ' + r.befunde.join(' · ') : ''}`);
}
const rot = ergebnisse.filter((r) => !r.gruen).length;
console.log(`Seiten ${ergebnisse.length} · GRÜN ${ergebnisse.length - rot} · ROT ${rot} · Ziel ${ziel}`);
process.exit(rot ? 1 : 0);
