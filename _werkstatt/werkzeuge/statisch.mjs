// Ebene 8 (statisch): Freie-Werte-Lint (S-05), Icon-Familien und Emojis (S-04), Platzhalter (S-01), Bewegungswerte,
// Slop-Signaturen (S-09/S-10/S-11/S-13) als Zählung mit Fundstellen.
// Nutzung: node statisch.mjs --satz <name> [--wurzel <repo>]
import fs from 'node:fs';
import path from 'node:path';
import { REPO, RELAUNCH, ensureDir } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const satz = arg('satz', 'adhoc');
const wurzel = arg('wurzel', REPO);
const SRC = path.join(wurzel, 'src');
const dateien = [];
(function lauf(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) lauf(p); else if (/\.(tsx|jsx|ts|js|css)$/.test(e.name)) dateien.push(p); } })(SRC);

// Token-Dateien (dort sind Rohwerte erlaubt, weil sie die Skala definieren)
const TOKENDATEIEN = [/src\/styles\/tokens\.css$/, /src\/app\/globals\.css$/, /src\/styles\/kern[^/]*\.css$/];
// Unantastbares / Einbettungen / Bildinhalte: E-Mail-Vorlagen (Geschäftslogik, Mail-Clients brauchen Inline-Werte), Marken-Icons
const AUSGENOMMEN = [/src\/lib\/email\//, /GoogleIcon\.tsx$/];

const regeln = {
  'S-05 Tailwind-Beliebigwert': /(?<![\w-])(?:-?[a-z][a-z0-9-]*:)*-?[a-z][a-z0-9-]*-\[[^\]\s]+\]/g,
  'S-05 Hex-Farbe im Code': /#[0-9a-fA-F]{3,8}\b/g,
  'S-05 rgb/rgba/hsl im Code': /\b(?:rgba?|hsla?)\(/g,
  'S-05 Inline-style': /style=\{\{/g,
  'S-05 Bewegungswert (Zahl in duration/delay/stagger)': /\b(?:duration|delay|staggerChildren|delayChildren)\s*:\s*[0-9.]+/g,
  'S-04 lucide-Import': /from\s+['"]lucide-react['"]/g,
  'S-04 phosphor-Import': /from\s+['"]@phosphor-icons\/react[^'"]*['"]/g,
  'S-04 Inline-<svg>': /<svg\b/g,
  'S-04 Emoji': /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/gu,
  'S-01 Platzhalter': /\b(?:lorem ipsum|Beispieltext|Platzhalter|placeholder:\s*true|TODO:? text)\b/gi,
  'S-09 Verlaufstext': /text-ceramic-gradient|bg-clip-text|<GradientText\b/g,
  'S-09 Glow/Leuchtkugel': /ambient-glow-[a-z]+|blur-3xl|blur-\[\d+px\]/g,
  'S-09 Glas/Unschärfe': /backdrop-blur[\w-]*|glass-surface[\w-]*/g,
  'S-09 Funkeln-Icon': /\bSparkles\b/g,
  'S-09 Laufband': /animate-marquee|marquee/g,
  'S-09 Nachlaufcursor': /<WaterCursor\b/g,
  'S-09 Badge über Überschrift (eyebrow)': /\beyebrow[\w-]*/g,
  'S-11 Icon-Kachel': /\bicon-chip\b/g,
  'S-13 Floskel': /\b(?:nahtlos|innovativ\w*|ganzheitlich\w*|maßgeschneidert\w*|Entdecken Sie|nächste[ns]? Level|Premium|High-End|Perfektion|exklusiv\w*|erstklassig\w*|unübertroffen\w*|modernste\w*)\b/g,
  'S-09 Hover-Anheben': /hover:-translate-y-[\w.\[\]-]+|group-hover:scale-[\w.\[\]-]+|hover:scale-[\w.\[\]-]+/g,
};

const funde = {};
for (const r of Object.keys(regeln)) funde[r] = { anzahl: 0, dateien: {} };
for (const datei of dateien) {
  const rel = path.relative(wurzel, datei);
  const istToken = TOKENDATEIEN.some((t) => t.test(datei));
  const aus = AUSGENOMMEN.some((t) => t.test(datei));
  const text = fs.readFileSync(datei, 'utf8');
  const zeilen = text.split('\n');
  for (const [name, re] of Object.entries(regeln)) {
    if (name.startsWith('S-05') && (istToken || aus)) continue;
    if (name === 'S-04 Emoji' && aus) continue;
    zeilen.forEach((z, idx) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(z) && !name.startsWith('S-13')) return; // Kommentare zählen nicht
      const m = z.match(re);
      if (m) {
        funde[name].anzahl += m.length;
        (funde[name].dateien[rel] ||= []).push(`${idx + 1}: ${m.slice(0, 4).join(' ')}`);
      }
    });
  }
}
// Icon-Familien zählen (Dateien je Familie)
const familien = {
  lucide: Object.keys(funde['S-04 lucide-Import'].dateien).length,
  phosphor: Object.keys(funde['S-04 phosphor-Import'].dateien).length,
  inline_svg_dateien: Object.keys(funde['S-04 Inline-<svg>'].dateien).length,
};
const out = ensureDir(path.join(RELAUNCH, 'belege', satz));
const kurz = Object.fromEntries(Object.entries(funde).map(([k, v]) => [k, { anzahl: v.anzahl, dateien: Object.keys(v.dateien).length }]));
fs.writeFileSync(path.join(out, 'statisch.json'), JSON.stringify({ satz, wurzel, dateien: dateien.length, familien, kurz, funde }, null, 1));
console.log(JSON.stringify({ dateien: dateien.length, familien }, null, 0));
for (const [k, v] of Object.entries(kurz)) console.log(`${k.padEnd(52)} ${String(v.anzahl).padStart(5)}  in ${v.dateien} Dateien`);
