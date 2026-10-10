// Vergleicht zwei Reinraum-Builds deterministisch: vorgerendertes HTML (normalisiert) und CSS-Selektoren.
// Für Wellen ohne sichtbare Änderung (z. B. W0 Aufräumen) stärker als ein Pixelvergleich.
// Nutzung: node build-vergleich.mjs <shaVorher> <shaNachher>
import fs from 'node:fs';
import path from 'node:path';
import { RELAUNCH, ensureDir } from './lib.mjs';

const SCRATCH = process.env.RELAUNCH_SCRATCH || '/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad';
const [, , A, B] = process.argv;
const dir = (s) => path.join(SCRATCH, `reinraum-${s}`, '.next');
const liste = (d, ext) => { const r = []; (function w(x) { for (const e of fs.readdirSync(x, { withFileTypes: true })) { const p = path.join(x, e.name); if (e.isDirectory()) w(p); else if (p.endsWith(ext)) r.push(p); } })(d); return r; };
const norm = (h) => h
  // RSC-Nutzlast (Flight-Skripte) ist Rauschen; verglichen wird das gerenderte Markup + JSON-LD.
  .replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, '')
  .replace(/\/_next\/static\/[^"'\s)]+/g, '/_next/static/X')
  .replace(/"buildId":"[^"]+"/g, '"buildId":"X"')
  .replace(/<meta name="x-build" content="[^"]*"\/?>/g, '')
  .replace(/data-dpl-id="[^"]*"/g, '')
  .replace(/\?dpl=[^"&]+/g, '')
  .replace(/[a-z0-9]{8,}-module__[A-Za-z0-9_-]+__variable/g, 'FONTVAR')
  // React-useId-Werte hängen von der Baumtiefe ab (z. B. nach Umzug in eine Routen-Gruppe); Paare bleiben konsistent
  .replace(/_R_[0-9a-z]+_/g, '_R_X_')
  // leere Suspense-Grenzen tragen keinen Inhalt
  .replace(/<!--\$--><!--\/\$-->/g, '')
  .replace(/\\"b\\":\\"[A-Za-z0-9_-]{15,}\\"/g, '\\"b\\":\\"X\\"')
  .replace(/\[\\"\$\\",\\"meta\\",\\"\d+\\",\{\\"name\\":\\"x-build\\",\\"content\\":\\"[^\\]*\\"\}\],?/g, '')
  .replace(/\\"\$\\",\\"([a-z]+)\\",\\"\d+\\"/g, (m, t) => `\\"$\\",\\"${t}\\",\\"N\\"`);
const htmlA = Object.fromEntries(liste(path.join(dir(A), 'server', 'app'), '.html').map((p) => [path.relative(path.join(dir(A), 'server', 'app'), p), p]));
const htmlB = Object.fromEntries(liste(path.join(dir(B), 'server', 'app'), '.html').map((p) => [path.relative(path.join(dir(B), 'server', 'app'), p), p]));
const nurA = Object.keys(htmlA).filter((k) => !htmlB[k]);
const nurB = Object.keys(htmlB).filter((k) => !htmlA[k]);
const anders = [];
for (const k of Object.keys(htmlA)) if (htmlB[k]) { const a = norm(fs.readFileSync(htmlA[k], 'utf8')); const b = norm(fs.readFileSync(htmlB[k], 'utf8')); if (a !== b) { let i = 0; while (i < a.length && a[i] === b[i]) i++; anders.push({ datei: k, ab: i, vorher: a.slice(Math.max(0, i - 80), i + 120), nachher: b.slice(Math.max(0, i - 80), i + 120) }); } }
// Selektorlisten nur an Kommas außerhalb von Klammern trennen (z. B. shadow-[0_1px_rgba(0,0,0,.1)]).
const trenne = (t) => { const r = []; let tiefe = 0, akt = ''; for (const c of t) { if (c === '(' || c === '[') tiefe++; if (c === ')' || c === ']') tiefe--; if (c === ',' && tiefe === 0) { r.push(akt); akt = ''; } else akt += c; } r.push(akt); return r; };
const cssText = (d) => liste(path.join(d, 'static'), '.css').map((f) => fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')).join('\n');
const selektoren = (d) => { const s = new Set(); const css = cssText(d); for (const m of css.matchAll(/([^{}]+)\{/g)) for (const sel of trenne(m[1])) { const t = sel.trim().replace(/^\.([a-z_]+)_[0-9a-f]{8}-module__[A-Za-z0-9_-]+__(className|variable)$/, '.$1_FONT__$2'); if (t && !t.startsWith('@')) s.add(t); } return s; };
const eigenschaften = (d) => new Set([...cssText(d).matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)].map((m) => m[1]));
const keyframes = (d) => new Set([...cssText(d).matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g)].map((m) => m[1]));
const sa = selektoren(dir(A)), sb = selektoren(dir(B));
const weg = [...sa].filter((x) => !sb.has(x)).sort(), neu = [...sb].filter((x) => !sa.has(x)).sort();
const ea = eigenschaften(dir(A)), eb = eigenschaften(dir(B)), ka = keyframes(dir(A)), kb = keyframes(dir(B));
const varWeg = [...ea].filter((x) => !eb.has(x)).sort(), varNeu = [...eb].filter((x) => !ea.has(x)).sort();
const kfWeg = [...ka].filter((x) => !kb.has(x)).sort(), kfNeu = [...kb].filter((x) => !ka.has(x)).sort();
const bericht = { vorher: A, nachher: B, variablen_weg: varWeg, variablen_neu: varNeu, keyframes_weg: kfWeg, keyframes_neu: kfNeu, html_dateien: Object.keys(htmlA).length, nur_vorher: nurA, nur_nachher: nurB, html_abweichend: anders.length, abweichungen: anders.slice(0, 40), css_selektoren_weg: weg, css_selektoren_neu: neu };
const out = ensureDir(path.join(RELAUNCH, 'belege', `build-vergleich-${A}-${B}`));
fs.writeFileSync(path.join(out, 'bericht.json'), JSON.stringify(bericht, null, 1));
console.log(JSON.stringify({ html: bericht.html_dateien, nur_vorher: nurA.length, nur_nachher: nurB.length, html_abweichend: anders.length, css_weg: weg.length, css_neu: neu.length, var_weg: varWeg.length, var_neu: varNeu.length, keyframes_weg: kfWeg.length, keyframes_neu: kfNeu.length }));
for (const a of anders.slice(0, 5)) console.log('≠', a.datei, '\n  vorher: ', a.vorher.replace(/\n/g, ' '), '\n  nachher:', a.nachher.replace(/\n/g, ' '));
