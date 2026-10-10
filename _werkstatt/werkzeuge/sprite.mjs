// Erzeugt das Icon-Sprite aus src/components/icons/svg/*.svg (KERN K-008).
// Nutzung: node _werkstatt/werkzeuge/sprite.mjs  → schreibt src/components/icons/sprite.svg und namen.ts
// Regeln je Datei: viewBox 0 0 24 24, keine eingebetteten Bilder, keine IDs; Strich-Attribute bleiben am <svg>
// und werden auf das <symbol> übertragen, damit currentColor und Strichstärke erhalten bleiben.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const QUELLE = path.join(REPO, 'src/components/icons/svg');
const ZIEL = path.join(REPO, 'src/components/icons');
const fehler = [];
const symbole = [];
const namen = [];
for (const datei of fs.readdirSync(QUELLE).filter((d) => d.endsWith('.svg')).sort()) {
  const name = datei.replace(/\.svg$/, '');
  if (!/^[a-z0-9-]+$/.test(name)) fehler.push(`${datei}: Dateiname nur a–z, 0–9, Bindestrich`);
  const roh = fs.readFileSync(path.join(QUELLE, datei), 'utf8').trim();
  const m = roh.match(/^<svg([^>]*)>([\s\S]*)<\/svg>$/);
  if (!m) { fehler.push(`${datei}: kein <svg>-Wurzelelement`); continue; }
  const [, attr, inhalt] = m;
  if (!/viewBox="0 0 24 24"/.test(attr)) fehler.push(`${datei}: viewBox muss 0 0 24 24 sein`);
  if (/<image|data:image|\sid=/.test(inhalt)) fehler.push(`${datei}: keine Bilder und keine IDs`);
  const uebernehmen = (attr.match(/\s(fill|stroke|stroke-width|stroke-linecap|stroke-linejoin)="[^"]*"/g) || []).join('');
  symbole.push(`<symbol id="${name}" viewBox="0 0 24 24"${uebernehmen}>${inhalt.replace(/\s+/g, ' ').trim()}</symbol>`);
  namen.push(name);
}
if (fehler.length) { console.error(fehler.join('\n')); process.exit(1); }
fs.writeFileSync(path.join(ZIEL, 'sprite.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${symbole.join('')}</svg>\n`);
fs.writeFileSync(path.join(ZIEL, 'namen.ts'), `// Erzeugt von _werkstatt/werkzeuge/sprite.mjs – nicht von Hand ändern.\nexport const ICON_NAMEN = ${JSON.stringify(namen)} as const;\nexport type IconName = (typeof ICON_NAMEN)[number];\n`);
console.log(`${namen.length} Icons → sprite.svg (${fs.statSync(path.join(ZIEL, 'sprite.svg')).size} Bytes)`);
