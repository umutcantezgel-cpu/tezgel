// Textprüfung (K-010, K-011, K-015-Hilfe): prüft Seitentexte im Format der Referenztexte (`_werkstatt/texte/*.md`) oder
// Texte in JSON (Ortstexte) ohne Browser, mit derselben Logik wie lesbarkeit.mjs (lesbarkeit-logik.mjs).
// Format: Texte stehen in Backticks; `[[id|Wort]]` = Fachwort mit Glossarerklärung (id aus regeln/glossar.json);
// `{Bild: id}` = Bildplatz (id aus _werkstatt/bilder/arbeiten-e2.json); `{Stimme: id}` = Kundenstimme wörtlich aus
// src/config/reviews.js; `{{COMPANY_DATA…}}` = Firmendaten aus dem Code. Meta: Zeilen „- Titel …: `…`“ und
// „- Beschreibung …: `…`“. Nicht geprüft werden Pfade (`/kontakt`), Kennungen und die Zeile „Suchbegriffe“.
// Nutzung: node textpruefung.mjs [--art erzaehl|wissen|ort|arbeit] [--json] <datei…>
//   --art bestimmt die Flesch-Schwelle (erzaehl, ort, arbeit ≥ 60; wissen ≥ 50; Standard erzaehl).
// Ausgabe: je Datei ein Bericht (Regel, Ergebnis, Fundstellen) und am Ende die Zahlen im Text (für den Abgleich mit dem
// Faktenblatt K-015 von Hand). Exit 1, wenn eine Regel in einer Datei verletzt ist.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { saetze, woerter, flesch, striche, bindestrichwoerter, floskeln, escapeRe } from './lesbarkeit-logik.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WERKSTATT = path.resolve(HIER, '..');
const REPO = path.resolve(WERKSTATT, '..');
const lies = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const GLOSSAR = lies(path.join(WERKSTATT, 'regeln/glossar.json')).eintraege;
const ERLAUBT = lies(path.join(WERKSTATT, 'regeln/bindestrich-erlaubt.json'));
const FLOSKELN = lies(path.join(WERKSTATT, 'regeln/floskeln.json'));
const BILDER = new Set(lies(path.join(WERKSTATT, 'bilder/arbeiten-e2.json')).map((b) => b.id));
const STIMMEN = new Set([...fs.readFileSync(path.join(REPO, 'src/config/reviews.js'), 'utf8').matchAll(/\bid:\s*'([^']+)'/g)].map((m) => m[1]));
const FIRMA = '06441 / 44 83 567';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const art = arg('art', 'erzaehl');
const alsJson = process.argv.includes('--json');
const dateien = process.argv.slice(2).filter((a, i, l) => !a.startsWith('--') && !['--art'].includes(l[i - 1]));
if (!dateien.length) { console.error('Nutzung: node textpruefung.mjs [--art erzaehl|wissen|ort|arbeit] [--json] <datei…>'); process.exit(2); }
const FLESCH_MIN = art === 'wissen' ? 50 : 60;

/** Textstücke einer Markdown-Datei im Referenzformat: { text, art }. Arten wie in lesbarkeit.mjs: 'absatz' und 'text'
 *  sind Fließtext (p, li); 'ueberschrift' (H1 bis H3, Schrittnamen, Kopfzeilen) zählt nur für die Floskel-Muster der
 *  Überschriften; 'meta-titel' und 'meta-beschreibung' nur für die Längen. Brotkrumen, Knöpfe und Links zählen nicht
 *  (Navigation und Bedienelemente prüft lesbarkeit.mjs auch nicht als Fließtext). */
function stueckeAusMarkdown(md) {
  const stuecke = [];
  let abschnitt = '';
  for (const zeile of md.split('\n')) {
    if (/^#{1,6}\s/.test(zeile)) { abschnitt = zeile.replace(/^#+\s*/, ''); continue; }
    if (/^>\s/.test(zeile)) continue; // Hinweise an den Leser des Musters
    if (/^\s*-\s*Suchbegriffe/i.test(zeile)) continue;
    const meta = /^\s*-\s*(Titel|Beschreibung)\b[^:`]*:\s*`([^`]+)`/.exec(zeile);
    if (meta) { stuecke.push({ text: meta[2], art: meta[1] === 'Titel' ? 'meta-titel' : 'meta-beschreibung', abschnitt }); continue; }
    if (/^meta$/i.test(abschnitt)) continue; // H1 der Meta-Liste steht in Abschnitt 1 noch einmal
    const etikett = (/^\s*(?:-|\d+\.)\s*([^`:]*?):?\s*`/.exec(zeile)?.[1] ?? '').trim();
    if (/^(Brotkrumen|Hauptknopf|Knopf|Kontakt|Link|Links|Knöpfe)\b/i.test(etikett)) continue;
    const ueberschrift = /^(H[1-6]|Kopfzeile|Überschrift)\b/i.test(etikett);
    const istAbsatz = /^Absatz\b/i.test(etikett);
    const segmente = [...zeile.matchAll(/`([^`]+)`/g)].map((m) => m[1].trim());
    // nummerierte Zeile „1. `Name` · `Satz`“: das erste Stück ist der Name des Schritts (Überschrift)
    const schritt = /^\s*\d+\.\s*`[^`]+`\s*·\s*`/.test(zeile);
    segmente.forEach((t, i) => {
      if (/^\//.test(t) || /^\{[^{]/.test(t) || /^[a-z0-9-]+$/.test(t) || /^https?:/.test(t)) return;
      stuecke.push({ text: t, art: ueberschrift || (schritt && i === 0) ? 'ueberschrift' : istAbsatz ? 'absatz' : 'text', abschnitt });
    });
  }
  return stuecke;
}

/** Textstücke aus JSON: alle Zeichenketten außer Kennungen, Pfaden und Feldern namens slug, id, href, bild. */
function stueckeAusJson(wert, schluessel = '', aus = []) {
  if (typeof wert === 'string') {
    if (['slug', 'id', 'href', 'bild', 'pfad'].includes(schluessel) || /^\//.test(wert) || /^[a-z0-9-]+$/.test(wert)) return aus;
    aus.push({ text: wert, art: schluessel === 'titel' ? 'meta-titel' : schluessel === 'beschreibung' ? 'meta-beschreibung' : /absatz|text/i.test(schluessel) ? 'absatz' : 'text', abschnitt: schluessel });
  } else if (Array.isArray(wert)) wert.forEach((w) => stueckeAusJson(w, schluessel, aus));
  else if (wert && typeof wert === 'object') for (const [k, v] of Object.entries(wert)) stueckeAusJson(v, k, aus);
  return aus;
}

/** Auszeichnungen auflösen: liefert Klartext und die Bereiche der Fachwörter. */
function aufloesen(text) {
  let klar = '';
  const fachwoerter = [];
  const fehler = [];
  let rest = text.replace(/\{\{[^}]+\}\}/g, FIRMA);
  const re = /\[\[([^|\]]+)\|([^\]]+)\]\]|\{(Bild|Stimme):\s*([^}]+)\}/g;
  let letzte = 0;
  for (const m of rest.matchAll(re)) {
    klar += rest.slice(letzte, m.index);
    if (m[1]) {
      fachwoerter.push({ id: m[1].trim(), start: klar.length, ende: klar.length + m[2].length, wort: m[2] });
      klar += m[2];
    } else {
      const id = m[4].trim();
      if (m[3] === 'Bild' && !BILDER.has(id)) fehler.push(`Bild-Kennung unbekannt: ${id}`);
      if (m[3] === 'Stimme' && !STIMMEN.has(id)) fehler.push(`Stimme unbekannt: ${id}`);
    }
    letzte = m.index + m[0].length;
  }
  klar += rest.slice(letzte);
  return { klar, fachwoerter, fehler };
}

function pruefe(datei) {
  const roh = fs.readFileSync(datei, 'utf8');
  const stuecke = datei.endsWith('.json') ? stueckeAusJson(JSON.parse(roh)) : stueckeAusMarkdown(roh);
  // Bild- und Stimmenkennungen stehen auch außerhalb von Backticks
  const kennFehler = [];
  const ohneHinweise = roh.split('\n').filter((z) => !/^>\s/.test(z)).join('\n');
  for (const m of ohneHinweise.matchAll(/\{(Bild|Stimme):\s*([^}]+)\}/g)) {
    const id = m[2].trim();
    if (m[1] === 'Bild' && !BILDER.has(id)) kennFehler.push(`Bild-Kennung unbekannt: ${id}`);
    if (m[1] === 'Stimme' && !STIMMEN.has(id)) kennFehler.push(`Stimme unbekannt: ${id}`);
  }
  const befunde = [];
  const regel = (name, ok, fundstellen = []) => befunde.push({ regel: name, ok, fundstellen });

  // Meta
  const titel = stuecke.filter((s) => s.art === 'meta-titel').map((s) => s.text);
  const beschr = stuecke.filter((s) => s.art === 'meta-beschreibung').map((s) => s.text);
  regel('Titel höchstens 58 Zeichen', titel.every((t) => [...t].length <= 58), titel.map((t) => `${[...t].length}: ${t}`));
  regel('Beschreibung 120 bis 155 Zeichen', beschr.every((t) => [...t].length >= 120 && [...t].length <= 155), beschr.map((t) => `${[...t].length}: ${t}`));

  // Klartext je Stück, Fachwortbereiche über den ganzen Text
  const teile = stuecke.filter((s) => s.art === 'absatz' || s.art === 'text').map((s) => ({ ...s, ...aufloesen(s.text) }));
  const ueberschriften = stuecke.filter((s) => s.art === 'ueberschrift').map((s) => aufloesen(s.text).klar);
  let gesamt = '';
  const fachwoerter = [];
  for (const t of teile) {
    for (const f of t.fachwoerter) fachwoerter.push({ ...f, start: f.start + gesamt.length, ende: f.ende + gesamt.length });
    gesamt += t.klar + '\n\n';
  }
  const alleSaetze = teile.flatMap((t) => saetze(t.klar));
  const laengen = alleSaetze.map((s) => ({ s, n: woerter(s).length }));
  const mittel = laengen.length ? laengen.reduce((a, b) => a + b.n, 0) / laengen.length : 0;
  const fl = flesch(teile.map((t) => t.klar).join('\n\n'));
  regel('kein Satz über 25 Wörter', laengen.every((l) => l.n <= 25), laengen.filter((l) => l.n > 25).map((l) => `${l.n}: ${l.s}`));
  regel('mittlere Satzlänge höchstens 14 Wörter', mittel <= 14, [`${mittel.toFixed(1)}`]);
  regel(`Flesch nach Amstad mindestens ${FLESCH_MIN} (${art})`, fl !== null && fl >= FLESCH_MIN, [`${fl}`]);
  const absaetze = teile.filter((t) => t.art === 'absatz').map((t) => ({ t: t.klar, n: saetze(t.klar).length }));
  regel('Absätze höchstens 4 Sätze', absaetze.every((a) => a.n <= 4), absaetze.filter((a) => a.n > 4).map((a) => `${a.n}: ${a.t.slice(0, 80)}`));
  const s = striche(gesamt);
  regel('keine Gedankenstriche', !s.length, s.map((x) => x.ausschnitt));
  const b = bindestrichwoerter(gesamt, ERLAUBT);
  regel('keine Bindestrichwörter außerhalb der Liste K-010-B', !b.length, b.map((x) => `${x.wort}: ${x.ausschnitt}`));
  const f = floskeln(gesamt, FLOSKELN, { ueberschriften });
  regel('keine Floskeln K-010-F', !f.length, f.map((x) => `${x.gefunden}: ${x.ausschnitt}`));

  // Glossar: unbekannte Kennungen; erstes Vorkommen jedes Begriffs als Fachwort mit derselben Kennung
  const ids = new Set(GLOSSAR.map((e) => e.id));
  const unbekannt = fachwoerter.filter((x) => !ids.has(x.id));
  regel('Fachwort-Kennungen im Glossar', !unbekannt.length, unbekannt.map((x) => `${x.id} (${x.wort})`));
  const luecken = [];
  for (const e of GLOSSAR) {
    let erstes = null;
    for (const begriff of e.begriffe) {
      const re = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(begriff).replace(/ /g, '\\s+')}(?:e|en|er|em|es|n|s)?(?![\\p{L}\\p{N}])`, 'iu');
      const m = re.exec(gesamt);
      if (m && (erstes === null || m.index < erstes.index)) erstes = { index: m.index, wort: m[0] };
    }
    if (!erstes) continue;
    const dfn = fachwoerter.find((x) => erstes.index >= x.start && erstes.index < x.ende);
    if (!dfn || dfn.id !== e.id) luecken.push(`${e.id}: erstes Vorkommen „${erstes.wort}“ ohne [[${e.id}|…]]`);
  }
  regel('Glossarwort beim ersten Vorkommen als Fachwort', !luecken.length, luecken);
  regel('Bild- und Stimmenkennungen bekannt', !kennFehler.length, kennFehler);

  const zahlen = [...new Set([...gesamt.matchAll(/\d[\d.,:/ ]*\d|\d/g)].map((m) => m[0].trim()))];
  return { datei: path.relative(REPO, path.resolve(datei)), art, stuecke: teile.length, saetze: alleSaetze.length, flesch: fl, mittel: Number(mittel.toFixed(1)), befunde, zahlen, ok: befunde.every((x) => x.ok) };
}

const ergebnisse = dateien.map(pruefe);
if (alsJson) console.log(JSON.stringify(ergebnisse, null, 1));
else for (const e of ergebnisse) {
  console.log(`\n${e.datei} · ${e.ok ? 'GRÜN' : 'ROT'} · Stücke ${e.stuecke} · Sätze ${e.saetze} · Flesch ${e.flesch} · Satz Ø ${e.mittel}`);
  for (const x of e.befunde) {
    console.log(`  ${x.ok ? 'ok ' : 'ROT'} ${x.regel}${x.fundstellen.length && (!x.ok || /Satzlänge|Flesch/.test(x.regel)) ? '' : ''}`);
    if (!x.ok) for (const fs2 of x.fundstellen.slice(0, 12)) console.log(`      · ${fs2}`);
  }
  console.log(`  Zahlen im Text (gegen K-015 prüfen): ${e.zahlen.join(' · ') || 'keine'}`);
}
process.exit(ergebnisse.every((e) => e.ok) ? 0 : 1);
