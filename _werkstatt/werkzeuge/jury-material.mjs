// Wählt je Seite höchstens 30 Bildschirmhöhen-Ausschnitte über alle Ansichten (gleichmäßig verteilt, Anfang zuerst).
// Nutzung: node jury-material.mjs <satz> [<quelle: belege|cache>] [<seiten>] [<ausgabe-satz>] → belege/<ausgabe-satz|satz>/jury-material.json
import fs from 'node:fs';
import path from 'node:path';
import { RELAUNCH, grundmenge, slug } from './lib.mjs';

const [, , satz, quelle = 'belege'] = process.argv;
const basis = quelle === 'cache' ? path.join(RELAUNCH, 'cache', 'fotos', satz) : path.join(RELAUNCH, 'belege', satz, 'fotos');
const KONTINGENT = { m375: 9, t768: 6, d1440: 8, d1920: 7 };
const verteilt = (liste, n) => { if (liste.length <= n) return liste; const r = [liste[0]]; for (let i = 1; i < n; i++) r.push(liste[Math.round((i * (liste.length - 1)) / (n - 1))]); return [...new Set(r)]; };
const G = grundmenge();
const seiten = process.argv[4] ? process.argv[4].split(',') : G.hauptseiten;
const material = {};
for (const s of seiten) {
  material[s] = [];
  for (const [a, n] of Object.entries(KONTINGENT)) {
    const d = path.join(basis, a, slug(s));
    if (!fs.existsSync(d)) continue;
    const bilder = fs.readdirSync(d).filter((f) => f.endsWith('.jpg')).sort();
    for (const b of verteilt(bilder, n)) material[s].push(path.join(d, b));
  }
}
const aus = process.argv[5] || satz;
fs.mkdirSync(path.join(RELAUNCH, 'belege', aus), { recursive: true });
fs.writeFileSync(path.join(RELAUNCH, 'belege', aus, 'jury-material.json'), JSON.stringify(material, null, 1));
for (const [s, l] of Object.entries(material)) console.log(s, l.length);
