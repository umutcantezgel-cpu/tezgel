# E3-SEO-META

## 1. Kopfzeile
E3-SEO-META-1 bis -3 · Rolle Lektor · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.6 · Schreibrechte (exakt, je Teilpaket, nichts sonst):
- **-1:** `src/inhalte/meta/blog.ts`, `$SCRATCH/E3-SEO-META-1/**`
- **-2:** `src/inhalte/meta/beispiele.ts`, `$SCRATCH/E3-SEO-META-2/**`
- **-3:** `src/inhalte/meta/leistungen.ts`; in `src/app/(bestand)/leistungen/[id]/[stadt]/page.tsx` nur der Ausdruck `const description = …` in `generateMetadata` (dazu bei Bedarf eine eigene Konstante für die Namen direkt darüber); `$SCRATCH/E3-SEO-META-3/**`

Umfang: Meta-Beschreibungen (das, was Google unter dem Titel zeigt) für Seiten, deren Beschreibung heute über 155 Zeichen lang ist und mit „...“ abgeschnitten wird (Scan vom 25.10., `_werkstatt/belege/meta-gekuerzt-2026-10-25.json`).

## 2. Rollenbriefing
Du bist **Lektor**: Du schreibst kurze Texte nach festen Regeln, ohne Gestaltung und ohne Technik darüber hinaus.
- Gute Arbeit: Jede Beschreibung sagt in einem oder zwei ruhigen Sätzen, was auf der Seite steht, mit dem Suchbegriff der Seite; `meta.mjs` ist für jede Seite deines Teilpakets GRÜN; `npm test` grün.
- Die drei häufigsten Fehler: 1. Fakten erfinden (Zahlen, Dauer, „Meister“, „Garantie“); 2. Werbesprache und Floskeln („Entdecken Sie“, „Perfektion“, Ausrufezeichen, „Jetzt … anfragen!“); 3. Gedankenstrich, „&“ oder Bindestrichwörter.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Schreibe je Adresse deines Teilpakets eine eigene Meta-Beschreibung von 120 bis 155 Zeichen in Alltagssprache in die Datei deines Teilpakets (Teilpaket -3 zusätzlich eine Vorlage für alle Seiten `/leistungen/<bereich>/<ort>`).

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar), gebaut mit Next.js 16.3.6.
2. Leserin ist zum Beispiel eine 72-jährige Frau am Handy: kurze Sätze, bekannte Wörter, keine Fachsprache ohne Erklärung.
3. `generatePageMetadata` in `src/lib/metadata.ts` nimmt für eine Adresse zuerst den Eintrag aus `META_BESCHREIBUNGEN` (`src/inhalte/meta/index.ts`, führt die drei Dateien zusammen), sonst die Beschreibung der Seite; dieselbe Beschreibung steht in den strukturierten Daten (`SeitenDaten`).
4. Sichtbare Texte (Anrisse, Vorspann, Projekttexte) bleiben unverändert; nur die Meta-Beschreibung bekommt einen eigenen Text.
5. `test/meta.test.mjs` prüft jeden Eintrag (Länge, Zeichen); `_werkstatt/werkzeuge/meta.mjs` liest Titel und Beschreibung aus der ausgelieferten Seite.

## 5. Kern-Auszug
- **Form:** Datei bleibt `export const META_… : Readonly<Record<string, string>> = { '<adresse>': '<text>', … };` mit genau den Adressen deines Teilpakets (Abschnitt 8), Reihenfolge wie dort, je Eintrag eine Zeile. Kopfkommentar der Datei bleibt.
- **Länge:** 120 bis 155 Zeichen je Text (mit Leerzeichen); ein oder zwei Sätze, je Satz höchstens 20 Wörter.
- **Inhalt:** Was steht auf der Seite, für wen ist das, wo (Ort nur, wenn die Seite einen nennt). Den wichtigsten Suchbegriff aus dem heutigen Titel oder der heutigen Beschreibung behalten (z. B. „Badsanierung“, „Fliesen auf Fußbodenheizung“, „Handwerkerbonus“, den Ortsnamen). Jeder Text ist anders; keine gleichen Satzanfänge in Folge.
- **Schreibregeln (K-010):** Sie-Anrede, wir-Form, ruhig. Kein Gedankenstrich (– —), kein Bindestrich als Gedankenstrich, kein „&“, kein Ausrufezeichen, kein „...“. Bindestrichwörter nur aus der Liste K-010-B (`_werkstatt/regeln/bindestrich-erlaubt.json`, z. B. „Gäste-WC“, „Lahn-Dill-Kreis“, „Marburg-Biedenkopf“). Keine Floskeln aus `_werkstatt/regeln/floskeln.json` (z. B. „Entdecken Sie“, „Ihr Partner für“, „Perfektion“, „Traumbad“, „höchste Qualität“). Ersetzungen: „Vor-Ort-Aufmaß“ → „Termin bei Ihnen vor Ort“; „Walk-In-Dusche“ → „bodengleiche Dusche“; „XXL-Fliesen“ oder „Großformate“ → „große Fliesen“; „2-cm-Platten“ → „2 cm starke Platten“.
- **Fakten (K-015, `_werkstatt/KERN.md` Abschnitt K-015):** nur, was dort steht. Erlaubt z. B.: Termin bei Ihnen vor Ort kostenfrei; verbindliches Festpreisangebot nach dem Termin; eingetragener Fachbetrieb der Handwerkskammer Wiesbaden; Abdichtung nach DIN 18534; Pflegekasse bis zu 4.180 € je Person. **Nicht:** Meister, Meisterbetrieb, Garantie, Festpreisgarantie, Jahreszahlen der Erfahrung, Zahl der Mitarbeitenden, Dauer einer Sanierung, „schlüsselfertig“.
- **Normen** nur mit Nutzen („Abdichtung nach der Norm für Bäder, DIN 18534“), nicht als Kette.
- **Teilpaket -3, Vorlage `/leistungen/<bereich>/<ort>`:** ersetze den Ausdruck `const description = …` (heute mit „Jetzt Vor-Ort-Aufmaß & Festpreisangebot anfragen!“ und `distanceLabel`, der einen Gedankenstrich enthält) durch eine Vorlage, die für **alle 52 Kombinationen** (4 Bereiche × 13 Orte) 120 bis 155 Zeichen ergibt und dieselben Regeln erfüllt. Nutze dafür eine eigene Konstante mit kurzen Namen je Bereich ohne „&“ und ohne Bindestrich (z. B. `bad: 'Badsanierung'`), nicht `serviceDisplayNames` (die bleibt für den Titel unverändert) und nicht `distanceLabel`. Titel, `path`, alles andere in der Datei unverändert. Die Einträge für `/leistungen/<bereich>/<ort>` kommen **nicht** in die Datei `leistungen.ts`.

## 6. Maßstab
- `npm test` grün (darin `test/meta.test.mjs`); `npx tsc --noEmit -p .` und `npx eslint <deine Dateien>` ohne Fehler.
- `node _werkstatt/werkzeuge/meta.mjs --liste <Liste deines Teilpakets> --ziel $SCRATCH/<Teilpaket>/meta` → alle GRÜN; die Beschreibung auf der Seite ist dein Text (Teilpaket -3: auch alle 52 Ortsseiten, Liste `$SCRATCH/meta-leistungen-orte.txt`).
- `node _werkstatt/werkzeuge/textpruefung.mjs --art erzaehl $SCRATCH/<Teilpaket>/texte.md`: deine Texte als Zeilen `- Beschreibung <adresse>: \`<text>\`` (Teilpaket -3: dazu die erzeugten Texte von vier Ortsseiten, je Bereich eine). Alle Regeln ok; die Regel „Glossarwort beim ersten Vorkommen als Fachwort“ darf hier ROT sein (Meta-Beschreibungen können kein Fachwort-Markup tragen), dann nenne die Wörter unter PRÜFUNG.
- Jede Zahl in deinen Texten steht in K-015.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ deines Teilpakets ändern; zwei andere Lektoren arbeiten gleichzeitig an den anderen Dateien unter `src/inhalte/meta/`, ein dritter an Ratgeber-Titeln. Fremde geänderte Dateien in `git status` sind normal und bleiben unberührt.
- `src/inhalte/meta/index.ts`, `src/lib/metadata.ts`, `src/components/seo/*`, `test/*` und Konfiguration nur lesen; Wünsche unter GEMEINSAME DATEIEN.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean`. Keine `.env*`-Dateien lesen. Keine Datei löschen.
- Server 4320 nur nutzen, nie starten, beenden oder neu starten; kein `next build`.
- Umgebung in jeder Shell: `cd /home/user/tezgel && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_SCRATCH=$SCRATCH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`.

## 8. Adressen je Teilpaket
- **-1** (Liste `$SCRATCH/meta-blog.txt`, 13): alle Adressen dieser Liste. Inhalt der Seite: `src/config/posts/<slug>.js` (Felder `title`, `excerpt`, Text). Achtung: Die Titel ändert gleichzeitig ein anderer Lektor; beschreibe den Inhalt, nicht den Titel.
- **-2** (Liste `$SCRATCH/meta-beispiele.txt`, 18): Musterbäder `/bad/musterbaeder/<slug>` (Inhalt `src/config/musterbaeder.*`: `title`, `headline`, Größe, Ausstattung) und Projektbeispiele `/referenzen/<id>` (Inhalt `src/config/projects.*`: `title`, `description`, Ort nur, wenn dort angegeben).
- **-3** (Liste `$SCRATCH/meta-leistungen.txt`, 14): davon die acht Adressen ohne Ort (`/leistungen/bad`, `/leistungen/wohnen`, `/leistungen/aussen`, `/leistungen/untergrund`, `/bad/badanfrage`, `/foerderung`, `/fliesen/auf-fussbodenheizung`, `/naturstein`) als Einträge in `leistungen.ts`; die sechs Ortsseiten der Liste und alle übrigen über die Vorlage (Abschnitt 5). Inhalt: `src/config/services.js`, die jeweilige `page.*` und ihr `layout.*`. Steht eine der acht Adressen nicht in der Liste, trotzdem einen Eintrag schreiben, wenn `meta.mjs` sie ROT meldet; sonst nicht.

## 9. Schritte
1. Ausgangslauf: `meta.mjs` mit deiner Liste (Teilpaket -3 zusätzlich mit `$SCRATCH/meta-leistungen-orte.txt`); Ergebnis notieren.
2. Je Adresse: Seite und Daten lesen, Text schreiben, Länge zählen (`node -e "console.log('<text>'.length)"`).
3. Datei schreiben (Teilpaket -3: Vorlage einsetzen), Prüfungen nach Abschnitt 6, nacheinander. Rot → beheben, wiederholen.

## 10. Schnellprüfung und Selbstprüfung
- `git -C /home/user/tezgel status --porcelain` vorher und nachher: neu geändert sind nur Dateien aus deinen Schreibrechten.
- `git diff -- <deine Dateien>`: nur deine Einträge (Teilpaket -3: nur der Ausdruck `description` und die Namenskonstante).
- Lies jeden Text einmal laut: Versteht ihn jemand ohne Fachwissen? Steht etwas darin, das nicht in K-015 steht?

## 11. Ausgabeformular
Höchstens 500 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM (je Gruppe ein Satz) · GEMEINSAME DATEIEN · PRÜFUNG UND ERGEBNIS (Ausgangslauf und Endlauf von `meta.mjs` mit Zahlen, `npm test`, Textprüfung) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 12. Letzte Zeile
=== ENDE E3-SEO-META-<n> · BEREIT ZUR RÜCKGABE ===
