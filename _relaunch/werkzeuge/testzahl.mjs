// Test-Sperrklinke (Plan Runde 2, Grundsatz 4): je Spec Fälle und expect() nie weniger, fixme/skip nie mehr als im Vorstand.
// Nutzung: node testzahl.mjs --basis   (schreibt belege/testzahl-basis.json)  |  node testzahl.mjs   (vergleicht, Exit 1 bei Verstoß)
// Laufzeit (P2-GEG-02 N-17): --bericht <playwright-json> vergleicht zusätzlich die ausgeführten Fälle je Spec und Projekt
//   (Schleifen zählen mit); --basis --bericht <json> legt diese Basis mit an.
import fs from 'node:fs';
import path from 'node:path';
import { WERKZEUGE, RELAUNCH } from './lib.mjs';

const dir = path.join(WERKZEUGE, 'tests');
const zaehle = (t) => ({
  faelle: (t.match(/\btest(?:\.fixme|\.skip)?\(\s*['"`]/g) || []).length,
  expects: (t.match(/\bexpect(?:\.poll|\.soft)?\(/g) || []).length,
  fixme: (t.match(/\btest\.fixme\(/g) || []).length,
  skip: (t.match(/\btest\.skip\(/g) || []).length,
});
const jetzt = {};
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.spec.mjs')).sort()) jetzt[f] = zaehle(fs.readFileSync(path.join(dir, f), 'utf8'));
const basisDatei = path.join(RELAUNCH, 'belege', 'testzahl-basis.json');
const iB = process.argv.indexOf('--bericht');
const laufzeit = (datei) => {
  const r = JSON.parse(fs.readFileSync(datei, 'utf8')); const z = {};
  const lauf = (s, f) => { for (const sp of s.specs || []) for (const t of sp.tests) { const k = `${f || s.file}::${t.projectName}`; z[k] = z[k] || { faelle: 0, gruen: 0, ausgelassen: 0 }; z[k].faelle++; const st = t.results.at(-1)?.status; if (st === 'passed') z[k].gruen++; else if (st === 'skipped' || (t.annotations || []).some((a) => a.type === 'fixme')) z[k].ausgelassen++; } for (const c of s.suites || []) lauf(c, f || s.file); };
  for (const s of r.suites) lauf(s, s.file);
  return z;
};
if (process.argv.includes('--basis')) {
  fs.writeFileSync(basisDatei, JSON.stringify({ erstellt: new Date().toISOString(), specs: jetzt, laufzeit: iB > -1 ? laufzeit(process.argv[iB + 1]) : undefined }, null, 1));
  console.log('Basis geschrieben:', Object.keys(jetzt).length, 'Specs');
  process.exit(0);
}
const basisAlles = JSON.parse(fs.readFileSync(basisDatei, 'utf8'));
const basis = basisAlles.specs;
const verstoesse = [];
for (const [f, b] of Object.entries(basis)) {
  const j = jetzt[f];
  if (!j) { verstoesse.push(`${f}: Spec fehlt`); continue; }
  if (j.faelle < b.faelle) verstoesse.push(`${f}: Fälle ${b.faelle} → ${j.faelle}`);
  if (j.expects < b.expects) verstoesse.push(`${f}: expect ${b.expects} → ${j.expects}`);
  if (j.fixme > b.fixme) verstoesse.push(`${f}: fixme ${b.fixme} → ${j.fixme}`);
  if (j.skip > b.skip) verstoesse.push(`${f}: skip ${b.skip} → ${j.skip}`);
}
if (iB > -1 && basisAlles.laufzeit) {
  const lz = laufzeit(process.argv[iB + 1]);
  for (const [k, b] of Object.entries(basisAlles.laufzeit)) {
    const j = lz[k];
    if (!j) { verstoesse.push(`${k}: im Lauf nicht ausgeführt`); continue; }
    if (j.faelle < b.faelle) verstoesse.push(`${k}: Fälle im Lauf ${b.faelle} → ${j.faelle}`);
    if (j.ausgelassen > b.ausgelassen) verstoesse.push(`${k}: ausgelassen ${b.ausgelassen} → ${j.ausgelassen}`);
  }
  console.log(`Laufzeit: ${Object.values(lz).reduce((n, x) => n + x.faelle, 0)} Fälle, ${Object.values(lz).reduce((n, x) => n + x.gruen, 0)} grün`);
}
const summe = (o, k) => Object.values(o).reduce((n, x) => n + x[k], 0);
console.log(`Specs ${Object.keys(jetzt).length} · Fälle ${summe(jetzt, 'faelle')} · expect ${summe(jetzt, 'expects')} · fixme ${summe(jetzt, 'fixme')} · skip ${summe(jetzt, 'skip')}`);
if (verstoesse.length) { console.log('SPERRKLINKE ROT:\n' + verstoesse.join('\n')); process.exit(1); }
console.log('Sperrklinke grün');
