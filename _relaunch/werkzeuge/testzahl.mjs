// Test-Sperrklinke (Plan Runde 2, Grundsatz 4): je Spec Fälle und expect() nie weniger, fixme/skip nie mehr als im Vorstand.
// Nutzung: node testzahl.mjs --basis   (schreibt belege/testzahl-basis.json)  |  node testzahl.mjs   (vergleicht, Exit 1 bei Verstoß)
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
if (process.argv.includes('--basis')) {
  fs.writeFileSync(basisDatei, JSON.stringify({ erstellt: new Date().toISOString(), specs: jetzt }, null, 1));
  console.log('Basis geschrieben:', Object.keys(jetzt).length, 'Specs');
  process.exit(0);
}
const basis = JSON.parse(fs.readFileSync(basisDatei, 'utf8')).specs;
const verstoesse = [];
for (const [f, b] of Object.entries(basis)) {
  const j = jetzt[f];
  if (!j) { verstoesse.push(`${f}: Spec fehlt`); continue; }
  if (j.faelle < b.faelle) verstoesse.push(`${f}: Fälle ${b.faelle} → ${j.faelle}`);
  if (j.expects < b.expects) verstoesse.push(`${f}: expect ${b.expects} → ${j.expects}`);
  if (j.fixme > b.fixme) verstoesse.push(`${f}: fixme ${b.fixme} → ${j.fixme}`);
  if (j.skip > b.skip) verstoesse.push(`${f}: skip ${b.skip} → ${j.skip}`);
}
const summe = (o, k) => Object.values(o).reduce((n, x) => n + x[k], 0);
console.log(`Specs ${Object.keys(jetzt).length} · Fälle ${summe(jetzt, 'faelle')} · expect ${summe(jetzt, 'expects')} · fixme ${summe(jetzt, 'fixme')} · skip ${summe(jetzt, 'skip')}`);
if (verstoesse.length) { console.log('SPERRKLINKE ROT:\n' + verstoesse.join('\n')); process.exit(1); }
console.log('Sperrklinke grün');
