// Erzeugt ein Paket-Briefing nach dem festen Bauplan (AUFTRAG Abschnitt 5) aus einer kleinen JSON-Spezifikation.
// Nutzung: node briefing.mjs <spez.json>   → schreibt _werkstatt/pakete/<kennung>.md und gibt den Pfad aus.
// Spez-Felder: kennung, rolle (Kundschafter|Baumeister|Grafiker|Prüfer|Dokumentar), stufe (1|2), umfang, schreibrechte[],
//   aufgabe, kernAuszug[] (K-Kennungen, z. B. "K-005"), massstab[], grenzen[] (zusätzlich), schritte[], selbstpruefung[] (zusätzlich),
//   schnellpruefung (Text; Standard je Rolle), selektoren (true → Liste getesteter Namen anhängen)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WERKZEUGE = path.dirname(fileURLToPath(import.meta.url));
const WERKSTATT = path.resolve(WERKZEUGE, '..');
const spez = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

const kernPfad = fs.existsSync(path.join(WERKSTATT, 'KERN.md')) ? path.join(WERKSTATT, 'KERN.md') : path.resolve(WERKSTATT, '../_relaunch/KERN.md');
const kern = fs.readFileSync(kernPfad, 'utf8');
const version = (kern.match(/Version\s+([\d.]+)/) || [, '1'])[1];
const abschnitt = (titelAnfang) => {
  const zeilen = kern.split('\n');
  const start = zeilen.findIndex((z) => z.startsWith('## ') && z.slice(3).startsWith(titelAnfang));
  if (start < 0) return `(${titelAnfang} nicht gefunden in ${path.basename(kernPfad)})`;
  let ende = zeilen.findIndex((z, i) => i > start && z.startsWith('## '));
  if (ende < 0) ende = zeilen.length;
  return zeilen.slice(start, ende).join('\n').trim();
};
const fuenf = abschnitt('Das Projekt in fünf Sätzen').split('\n').slice(1).join('\n').trim();

const ROLLEN = {
  Kundschafter: 'Du erfasst einen Bereich vollständig mit Fundstellen. Häufige Fehler: zusammenfassen statt auflisten; Vermutung als Befund; Teile übersehen, die nicht über die Navigation erreichbar sind.',
  Baumeister: 'Du baust einen Baustein oder eine Ansicht nach Referenz, Kern-Auszug und Konventionen des Projekts und machst die Schnellprüfung. Häufige Fehler: Werte außerhalb des Designsystems; Zustände und Mobilansicht vergessen; Dateien außerhalb der Schreibrechte ändern.',
  Grafiker: 'Du setzt Bewegungseinträge und SVG-Arbeiten nach Register und Formsystem um. Häufige Fehler: mehr animieren als das Register vorsieht; reduzierte Bewegung vergessen; uneinheitliche Strichstärken.',
  Prüfer: 'Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.',
  Dokumentar: 'Du pflegst Bildsätze, Galerie und Berichte. Häufige Fehler: Behauptung ohne Belegpfad; Fachjargon; veraltete Zahlen.',
};
const GRENZEN = [
  'Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).',
  'Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/(bestand)/layout.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.',
  'Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.',
  'Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.',
  'UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.',
  'Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).',
];
const SCHNELL = {
  Baumeister: 'Prüfstufe A mit `bash _werkstatt/werkzeuge/pruefe-a.sh <Kennung> <geänderte Dateien…> -- <Ansichten…>` (Typprüfung, Lint der Dateien, betroffene Funktionstests gegen 4320, Bilder 390/1440, Textvergleich der eigenen Seiten). Ergebnis und Bildpfade in die Rückgabe.',
  Grafiker: 'Prüfstufe A mit `bash _werkstatt/werkzeuge/pruefe-a.sh <Kennung> <geänderte Dateien…> -- <Ansichten…>`; zusätzlich `node _werkstatt/werkzeuge/svg.mjs --dateien <svg-Dateien>` für SVG-Arbeiten.',
  Prüfer: 'Jedes neue oder geänderte Werkzeug einmal gegen eine echte Ansicht ausführen (Beleg: Ausgabepfad), `node --check` bzw. `bash -n` grün.',
  Kundschafter: 'Keine Prüfstufe; Fundstellen stichprobenartig (5) gegenprüfen.',
  Dokumentar: 'Bildpfade existieren, Bilder ≤ 1.440 px breit, komprimiert (JPEG q70 oder WebP).',
};

const z = [];
z.push(`${spez.kennung} · ${spez.rolle} · Modell: ARBEITSMODELL · Stufe ${spez.stufe} · Kern-Version: v${version} · Umfang: ${spez.umfang}`);
z.push(`Schreibrechte (exakt): ${spez.schreibrechte.map((d) => '`' + d + '`').join(', ')}, dazu die Rückgabe \`_werkstatt/pakete/${spez.kennung}.rueckgabe.md\`. Sonst nichts.`);
z.push('', `## Rollenbriefing · ${spez.rolle}`, ROLLEN[spez.rolle]);
z.push('', '## Aufgabe in einem Satz', spez.aufgabe);
z.push('', '## Das Projekt in fünf Sätzen (wortgleich aus KERN)', fuenf);
z.push('', '## Kern-Auszug (unveränderlich)');
for (const k of spez.kernAuszug || []) z.push(abschnitt(k), '');
z.push('## Maßstab', ...(spez.massstab || ['–']).map((m) => `- ${m}`));
z.push('', '## Grenzen', ...[...GRENZEN, ...(spez.grenzen || [])].map((g) => `- ${g}`));
z.push('', '## Schritte', ...spez.schritte.map((s, i) => `${i + 1}. ${s}`));
z.push('', '## Schnellprüfung und Selbstprüfung', `- ${spez.schnellpruefung || SCHNELL[spez.rolle]}`,
  '- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.',
  ...(spez.selbstpruefung || []).map((s) => `- ${s}`));
if (spez.selektoren) {
  z.push('', '## Bestandsschutz: getestete Selektoren und Namen (müssen erhalten bleiben)',
    'Vollständige Liste: `_werkstatt/berichte/E0-KUN-05-qualitaet.md`, Abschnitt 2. IDs (`#hero-name`, `#calc-*`, `#funnel-*`, `#termin-*`, `#booking-consent`, `#projekt-check`, `#whatsapp-floating-btn`, `#cookie-settings`, `#main-content`), ARIA-Namen von Knöpfen, Dialogen, Gruppen und Labels, `aria-pressed`/`aria-current`/`aria-live`-Verhalten und Nutzlast-Schlüssel bleiben exakt gleich.');
}
z.push('', '## Ausgabeformular', `In \`_werkstatt/pakete/${spez.kennung}.rueckgabe.md\` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN`);
z.push('', 'Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.');
z.push('', `=== ENDE ${spez.kennung} · BEREIT ZUR RÜCKGABE ===`, '');

const ziel = path.join(WERKSTATT, 'pakete', `${spez.kennung}.md`);
fs.writeFileSync(ziel, z.join('\n'));
console.log(ziel);
