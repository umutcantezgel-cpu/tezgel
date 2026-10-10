// Prüfwerkzeug Glyphenabdeckung (E0-PRUEF-02b). Sammelt alle Zeichen aus den Textfeldern eines Satzes
// (Überschriften, Absätze, Alt-Texte, Labels, Meta) und prüft je Schriftdatei, welche Zeichen fehlen.
// Die cmap liest glyphen.py mit fonttools im Scratchpad-venv. Kein Browserlauf.
// Nutzung: node glyphen.mjs --texte <satz-ordner> --schriften <woff2-Datei|Ordner>[,…] [--ziel DIR] [--python PFAD] [--fundstellen 3]
// Textquelle: <satz>/texte/*.json, ersatzweise <satz>/texte-index.json. Nicht geprüft: JSON-LD, Links (keine Anzeigetexte).
// Ausgabe: <ziel>/glyphen-ergebnis.json und <ziel>/zeichen.txt; Zusammenfassung auf stdout.
// Standardziel: _werkstatt/cache/glyphen/<satz-name>/ (liegt außerhalb des Repos).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE, RELAUNCH, assertLocal, ensureDir } from './lib.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const GLYPHEN_PY = path.join(HIER, 'glyphen.py');
const SCRATCH = process.env.RELAUNCH_SCRATCH || '/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad';
const META = ['title', 'description', 'og_title', 'og_description'];
const LISTEN = ['h1', 'ueberschriften', 'main_zeilen', 'header_zeilen', 'footer_zeilen', 'alt'];
const UNSICHTBAR = /[\p{Cc}\p{Cf}\p{Cs}\p{Co}\p{Cn}\p{Zl}\p{Zp}]/u;
const istAufruf = !!process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

function arg(argv, k, d) {
  const i = argv.indexOf(`--${k}`);
  return i > -1 && argv[i + 1] !== undefined && !argv[i + 1].startsWith('--') ? argv[i + 1] : d;
}

/** Werte eines Option-Blocks bis zum nächsten „--“, Komma-getrennt zusätzlich möglich. */
function argListe(argv, k) {
  const i = argv.indexOf(`--${k}`);
  if (i < 0) return [];
  const werte = [];
  for (let j = i + 1; j < argv.length && !argv[j].startsWith('--'); j++) werte.push(argv[j]);
  return werte.flatMap((s) => s.split(',')).map((s) => s.trim()).filter(Boolean);
}

/** Anzeigetexte aus texte/*.json (bevorzugt) oder texte-index.json. Überschriften ohne Präfix „h1:“. */
export function textfelder(satz) {
  const dir = path.join(satz, 'texte');
  const eintraege = [];
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    const dateien = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
    for (const f of dateien) {
      const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      const seite = d.seite || f.replace(/\.json$/, '');
      for (const k of META) if (typeof d[k] === 'string') eintraege.push({ seite, feld: `meta.${k}`, text: d[k] });
      for (const k of LISTEN) {
        for (const t of Array.isArray(d[k]) ? d[k] : []) {
          if (typeof t === 'string') eintraege.push({ seite, feld: k, text: t.replace(/^h[1-6]:\s*/, '') });
        }
      }
    }
    return { quelle: `texte/ (${dateien.length} Dateien)`, eintraege };
  }
  const index = path.join(satz, 'texte-index.json');
  if (fs.existsSync(index)) {
    const d = JSON.parse(fs.readFileSync(index, 'utf8'));
    for (const [seite, v] of Object.entries(d.seiten || {})) {
      for (const k of ['title', 'description']) if (typeof v[k] === 'string') eintraege.push({ seite, feld: `meta.${k}`, text: v[k] });
      for (const k of ['h1', 'main_zeilen']) {
        for (const t of Array.isArray(v[k]) ? v[k] : []) if (typeof t === 'string') eintraege.push({ seite, feld: k, text: t.replace(/^h[1-6]:\s*/, '') });
      }
    }
    return { quelle: 'texte-index.json (Ersatzquelle)', eintraege };
  }
  throw new Error(`weder texte/ noch texte-index.json in ${satz}`);
}

/** Zeichen, die eine Schrift liefern muss: Leerraum und Steuerzeichen entfallen, das geschützte Leerzeichen U+00A0 nicht. */
const relevant = (c) => c === ' ' || (!/\s/u.test(c) && !UNSICHTBAR.test(c));
const hex = (cp) => `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;

function auszug(text, pos, len) {
  const von = Math.max(0, pos - 30);
  const bis = Math.min(text.length, pos + len + 30);
  return `${von > 0 ? '…' : ''}${text.slice(von, bis)}${bis < text.length ? '…' : ''}`;
}

/** Häufigkeit je Zeichen und bis zu maxFund Fundstellen (Seite, Feld, Textauszug). */
export function sammle(eintraege, maxFund = 3) {
  const stat = new Map();
  for (const e of eintraege) {
    let idx = 0;
    for (const c of e.text) {
      if (relevant(c)) {
        let s = stat.get(c);
        if (!s) { s = { zeichen: c, cp: hex(c.codePointAt(0)), haeufigkeit: 0, fundstellen: [], schluessel: [] }; stat.set(c, s); }
        s.haeufigkeit += 1;
        const schl = `${e.seite}|${e.feld}|${e.text}`;
        if (s.fundstellen.length < maxFund && !s.schluessel.includes(schl)) {
          s.schluessel.push(schl);
          s.fundstellen.push({ seite: e.seite, feld: e.feld, auszug: auszug(e.text, idx, c.length) });
        }
      }
      idx += c.length;
    }
  }
  return stat;
}

/** Schriftdateien; ein Ordner liefert seine woff2-, woff-, ttf- und otf-Dateien. */
export function schriftenListe(eingaben) {
  const out = [];
  for (const e of eingaben) {
    const p = path.resolve(e);
    if (!fs.existsSync(p)) throw new Error(`Schrift fehlt: ${p}`);
    if (fs.statSync(p).isDirectory()) {
      for (const f of fs.readdirSync(p).sort()) if (/\.(woff2|woff|ttf|otf)$/i.test(f)) out.push(path.join(p, f));
    } else out.push(p);
  }
  if (!out.length) throw new Error('keine Schriftdateien gefunden');
  return out;
}

/** Ruft glyphen.py mit dem venv-Python auf und ordnet die Ergebnisse den Häufigkeiten zu. */
export function pruefeSchriften({ stat, zeichenDatei, schriften, python }) {
  const roh = execFileSync(python, ['-I', GLYPHEN_PY, zeichenDatei, ...schriften], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const json = JSON.parse(roh);
  const ergebnis = {};
  for (const s of schriften) {
    const liste = json[s] || [];
    if (liste.length === 1 && liste[0].startsWith('FEHLER:')) { ergebnis[s] = { fehler: liste[0] }; continue; }
    const fehlend = liste.map((z) => {
      const cp = parseInt(z.split(' ')[0].slice(2), 16);
      const ch = String.fromCodePoint(cp);
      const st = stat.get(ch);
      return {
        zeichen: ch, cp: hex(cp), haeufigkeit: st ? st.haeufigkeit : 0,
        fundstellen: st ? st.fundstellen.map(({ seite, feld, auszug: a }) => ({ seite, feld, auszug: a })) : [],
      };
    }).sort((a, b) => b.haeufigkeit - a.haeufigkeit || a.cp.localeCompare(b.cp));
    ergebnis[s] = { fehlend_anzahl: fehlend.length, vorhanden_anzahl: stat.size - fehlend.length, fehlend };
  }
  return ergebnis;
}

/** Öffentliche Schnittstelle: sammelt, schreibt zeichen.txt, prüft und schreibt glyphen-ergebnis.json. */
export function glyphenLauf({ texte, schriften, ziel = null, python = null, fundstellen = 3 }) {
  assertLocal(BASE);
  const satz = path.resolve(texte);
  const satzName = path.basename(satz);
  const { quelle, eintraege } = textfelder(satz);
  const stat = sammle(eintraege, fundstellen);
  const verzeichnis = ensureDir(ziel ? path.resolve(ziel) : path.join(RELAUNCH, 'cache', 'glyphen', satzName));
  const zeichenDatei = path.join(verzeichnis, 'zeichen.txt');
  const zeichen = [...stat.keys()].sort((a, b) => a.codePointAt(0) - b.codePointAt(0));
  fs.writeFileSync(zeichenDatei, `${zeichen.join('\n')}\n`, 'utf8');
  const py = python || path.join(SCRATCH, 'venv-glyphen', 'bin', 'python');
  if (!fs.existsSync(py)) {
    throw new Error(`Python fehlt: ${py}. Anlegen: python3 -m venv $SCRATCH/venv-glyphen && $SCRATCH/venv-glyphen/bin/pip install fonttools brotli`);
  }
  const liste = schriftenListe(schriften);
  const ergebnis = pruefeSchriften({ stat, zeichenDatei, schriften: liste, python: py });
  const aus = {
    satz: satzName, quelle, eintraege: eintraege.length, zeichen_verschieden: stat.size, python: py,
    zeichen_datei: zeichenDatei, schriften: ergebnis, zeitpunkt: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(verzeichnis, 'glyphen-ergebnis.json'), JSON.stringify(aus, null, 1));
  return { aus, verzeichnis };
}

if (istAufruf) {
  const argv = process.argv.slice(2);
  const texte = arg(argv, 'texte', null);
  const schriften = argListe(argv, 'schriften');
  if (!texte || !schriften.length) {
    console.error('Aufruf: node glyphen.mjs --texte <satz-ordner> --schriften <woff2-Datei|Ordner>[,…] [--ziel DIR] [--python PFAD] [--fundstellen 3]');
    process.exit(2);
  }
  try {
    const { aus, verzeichnis } = glyphenLauf({
      texte, schriften, ziel: arg(argv, 'ziel', null), python: arg(argv, 'python', null), fundstellen: Number(arg(argv, 'fundstellen', '3')),
    });
    console.log(`Satz ${aus.satz} (${aus.quelle}): ${aus.eintraege} Textfelder, ${aus.zeichen_verschieden} verschiedene Zeichen`);
    for (const [schrift, e] of Object.entries(aus.schriften)) {
      console.log(`\nSchrift ${path.basename(schrift)}`);
      if (e.fehler) { console.log(`  ${e.fehler}`); continue; }
      console.log(`  fehlend ${e.fehlend_anzahl} von ${aus.zeichen_verschieden} Zeichen (vorhanden ${e.vorhanden_anzahl})`);
      for (const z of e.fehlend.slice(0, 15)) {
        const f = z.fundstellen[0];
        console.log(`  ${z.cp} ${JSON.stringify(z.zeichen)} ×${z.haeufigkeit}${f ? `  ${f.seite} [${f.feld}]: ${f.auszug}` : ''}`);
      }
    }
    console.log(`\nErgebnis: ${path.join(verzeichnis, 'glyphen-ergebnis.json')}`);
  } catch (e) {
    console.error(`ABBRUCH: ${e.message}`);
    process.exit(1);
  }
}
