// P4-13: Banner-Aufgabe in den Spuren finden – lange Aufgaben nach der Hydrierung mit Stilneuberechnung über ≥ 2000 Elemente.
// Nutzung: node spur-banner.mjs spuren/<name>.json
import fs from 'node:fs';
const z = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const aus = {};
for (const [base, s] of Object.entries(z.je_server)) {
  const laeufe = s.ergebnisse.map((e) => {
    const voll = e.lang.filter((l) => l.stil_layout.some((x) => x.art === 'stil' && (x.elemente ?? 0) >= 2000));
    // Banner-Aufgabe: nach der großen Skriptaufgabe (Hydrierung) und mit voller Stilneuberechnung
    const hyd = e.lang.find((l) => (l.arten.skript ?? 0) > 100);
    const banner = voll.filter((l) => hyd && l.start > hyd.start);
    return { tbt_wand: e.tbt_wand, lange_aufgaben: e.lang.filter((l) => l.wand > 50).length, hydrierung_ms: hyd?.wand ?? null, banner_aufgaben: banner.map((l) => ({ start: l.start, wand: l.wand, stil: l.arten.stil, elemente: l.stil_layout.filter((x) => x.art === 'stil').map((x) => x.elemente) })) };
  });
  aus[base] = laeufe;
  console.log(base);
  for (const l of laeufe) console.log('  ', JSON.stringify(l));
}
fs.writeFileSync(process.argv[2].replace(/\.json$/, '-banner.json'), JSON.stringify(aus, null, 1));
