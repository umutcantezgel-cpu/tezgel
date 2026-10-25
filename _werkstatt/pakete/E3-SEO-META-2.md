# E3-SEO-META-2

## 1. Kopfzeile
E3-SEO-META-4 bis -6 · Rolle Lektor · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.6 · Schreibrechte (exakt, je Teilpaket, nichts sonst):
- **-4:** `src/inhalte/meta/seiten.ts`, `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-SEO-META-4/**`
- **-5:** `src/inhalte/meta/fliesen.ts`, `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-SEO-META-5/**`
- **-6:** `src/inhalte/meta/bauteile.ts`, `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-SEO-META-6/**`

Umfang: Meta-Beschreibungen (der Text unter dem Titel in Suchergebnissen) für 47 Seiten, deren heutige Beschreibung die Schreibregeln verletzt („&“, „Jetzt …“, „Vor-Ort-Aufmaß“, Ausrufezeichen) oder eine Zusage verschärft. Die heutigen Texte mit Gründen: `_werkstatt/belege/meta-regeln-2026-10-25.json`. Vorgänger: `_werkstatt/pakete/E3-SEO-META.md` (gleiche Regeln) und die Entscheidung E-053 in `_werkstatt/ENTSCHEIDUNGEN.md`.

**Arbeitsordner:** Alle eigenen Dateien (Entwürfe, Listen, Protokolle) nur unter dem absoluten Pfad deines Teilpakets oben, nie unter `/E3-…` im Wurzelverzeichnis und nie im Repo.

## 2. Rollenbriefing
Du bist **Lektor**: Du schreibst kurze Texte nach festen Regeln, ohne Gestaltung und ohne Technik darüber hinaus.
- Gute Arbeit: Jede Beschreibung sagt in einem oder zwei ruhigen Sätzen, was auf der Seite steht, mit dem Suchbegriff der Seite; jede Einzelheit steht sichtbar auf genau dieser Seite; `meta.mjs` ist für jede Seite deines Teilpakets GRÜN; `npm test` grün.
- Die drei häufigsten Fehler (aus der Abnahme E-053): 1. Einzelheiten, die nicht auf der Seite stehen (aus anderen Daten, aus dem Gedächtnis, aus Übersichtsseiten); 2. Zusagen, die die Seite nicht macht oder die stärker sind („garantiert“, „damit kein Wasser …“, „Zeitplan“); 3. Werbesprache, „&“, Ausrufezeichen, Gedankenstrich, Bindestrichwörter.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Schreibe je Adresse deines Teilpakets eine eigene Meta-Beschreibung von 120 bis 155 Zeichen in Alltagssprache in die Datei deines Teilpakets.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar), gebaut mit Next.js 16.3.6.
2. Leserin ist zum Beispiel eine 72-jährige Frau am Handy: kurze Sätze, bekannte Wörter, keine Fachsprache ohne Erklärung.
3. `seitenBeschreibung` (`src/lib/beschreibung.ts`) nimmt für eine Adresse zuerst den Eintrag aus `META_BESCHREIBUNGEN` (`src/inhalte/meta/index.ts`, führt sechs Dateien zusammen); dieselbe Beschreibung steht in den Metadaten und in den strukturierten Daten.
4. Sichtbare Texte der Seiten bleiben unverändert; nur die Meta-Beschreibung bekommt einen eigenen Text.
5. `test/meta.test.mjs` prüft jeden Eintrag (Länge, Zeichen, keine Adresse doppelt); `_werkstatt/werkzeuge/meta.mjs` liest Titel und Beschreibung aus der ausgelieferten Seite.

## 5. Kern-Auszug
- **Form:** Datei bleibt `export const META_… : Readonly<Record<string, string>> = { '<adresse>': '<text>', … };` mit genau den Adressen deines Teilpakets (Abschnitt 8), Reihenfolge wie in der Liste, je Eintrag eine Zeile. Kopfkommentar bleibt.
- **Länge:** 120 bis 155 Zeichen je Text (mit Leerzeichen); ein oder zwei Sätze, je Satz höchstens 20 Wörter.
- **Inhalt:** Was steht auf der Seite, für wen ist das, wo (Ort nur, wenn die Seite einen nennt). Den wichtigsten Suchbegriff aus dem heutigen Titel behalten (z. B. „Fugensanierung“, „Terrassenplatten“, „Estrich“, den Ortsnamen). Jede Einzelheit (Material, Ausstattung, Schritt, Zahl) muss im sichtbaren Text **dieser** Seite stehen: Seite mit `curl -s http://127.0.0.1:4320<adresse>` holen und den Text im `<main>` lesen. Jeder Text ist anders; höchstens zwei Texte deines Teilpakets beginnen gleich.
- **Was die Seite sagt, darf die Beschreibung sagen:** Gibt eine Seite selbst eine Zusage (z. B. Festpreisangebot, kostenfreier Termin, Stellenanzeige), darf die Beschreibung sie sinngleich wiedergeben, nie schärfer. Neue Aussagen über den Betrieb nur aus K-015 (`_werkstatt/KERN.md`, Abschnitt K-015). „Garantie“, „garantiert“, „Festpreisgarantie“, „Meister“, „schlüsselfertig“ kommen nicht vor; aus „garantierter Festpreis“ wird „verbindliches Festpreisangebot“.
- **Schreibregeln (K-010):** Sie-Anrede, wir-Form, ruhig. Kein Gedankenstrich (– —), kein Bindestrich als Gedankenstrich, kein „&“, kein Ausrufezeichen, kein „...“. Bindestrichwörter nur aus `_werkstatt/regeln/bindestrich-erlaubt.json` (z. B. „Gäste-WC“, „Lahn-Dill-Kreis“). Keine Floskeln aus `_werkstatt/regeln/floskeln.json` („Entdecken Sie“, „Ihr Partner für“, „Perfektion“, „höchste Qualität“ …). Kein „Jetzt …“-Aufruf. Ersetzungen: „Vor-Ort-Aufmaß“ → „Termin bei Ihnen vor Ort“; „Walk-In-Dusche“ → „bodengleiche Dusche“; „XXL-Fliesen“ oder „Großformate“ → „große Fliesen“; „2-cm-Platten“ → „2 cm starke Platten“; „Fliesenleger-Fachbetrieb“ → „Fachbetrieb für Fliesen“.
- **Normen** nur mit Nutzen („Abdichtung nach der Norm für Bäder, DIN 18534“), Normnummern nur, wenn sie auf der Seite stehen.
- **Flesch:** Die Flesch-Regel von `textpruefung.mjs` misst Meta-Zeilen nicht (Wert null); ROT dort ist kein Befund (E-053). Die übrigen Regeln müssen ok sein; die Regel „Glossarwort beim ersten Vorkommen als Fachwort“ darf ROT sein (dann Wörter nennen).

## 6. Maßstab
- `npm test` grün (darin `test/meta.test.mjs`); `npx tsc --noEmit -p .` und `npx eslint <deine Datei>` ohne Fehler.
- `node _werkstatt/werkzeuge/meta.mjs --liste <Liste deines Teilpakets> --ziel <dein Arbeitsordner>/meta` → alle GRÜN; die Beschreibung auf der Seite ist dein Text.
- `node _werkstatt/werkzeuge/textpruefung.mjs --art erzaehl <dein Arbeitsordner>/texte.md` mit deinen Texten als Zeilen `- Beschreibung <adresse>: \`<text>\``: alle Regeln ok außer den in Abschnitt 5 genannten.
- `node _werkstatt/werkzeuge/jsonld.mjs --seiten <drei Adressen deines Teilpakets> --ziel <dein Arbeitsordner>/jsonld`: Regel 5 (Beschreibung des Seitenknotens gleich der Meta-Beschreibung) ohne Befund für diese Seiten; andere ROT-Befunde (fehlender Seitenknoten) gehören dem Paket E3-SEO-JSONLD-NACH und sind hier keine Befunde, nenne sie.
- Jede Zahl in deinen Texten steht auf der Seite und, wenn sie den Betrieb betrifft, in K-015.

## 7. Grenzen
- Nur die Datei unter „Schreibrechte“ deines Teilpakets ändern; zwei andere Lektoren schreiben gleichzeitig die anderen Dateien unter `src/inhalte/meta/`, zwei Baumeister ändern Seiten (strukturierte Daten). Fremde geänderte Dateien in `git status` sind normal und bleiben unberührt.
- `src/inhalte/meta/index.ts`, die übrigen Dateien unter `src/inhalte/meta/`, `src/lib/*`, `src/components/seo/*`, Seiten, `test/*` und Konfiguration nur lesen; Wünsche unter GEMEINSAME DATEIEN.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean`. Keine `.env*`-Dateien lesen. Keine Datei löschen.
- Server 4320 nur nutzen, nie starten, beenden oder neu starten; kein `next build`.
- Umgebung in jeder Shell: `cd /home/user/tezgel && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`.

## 8. Adressen je Teilpaket (Listen im Scratchpad, eine Adresse je Zeile)
- **-4** (17): `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/meta2-seiten.txt`. Bad-Unterseiten, `/standorte`, `/ausstellung/*`, `/faq`, `/beratung`, `/downloads`, `/unternehmen`, `/team`, `/partner`, `/karriere`, `/karriere/ausbildung`, `/termin`. Achtung `/bad/bad-aus-einer-hand`: heute „garantierter Festpreis“, wird „verbindliches Festpreisangebot“ (oder was die Seite sagt). `/partner`: Markennamen nur, wenn sie auf der Seite stehen; kein Partnerstatus behaupten (K-015).
- **-5** (13): `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/meta2-fliesen.txt`. Unterseiten von `/fliesen`.
- **-6** (17): `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/meta2-bauteile.txt`. `/untergrund-abdichtung/*`, `/balkon-terrasse/*`, `/naturstein/*`, `/treppen/*`, `/schadensanalyse`, `/fliesenreparatur`.

## 9. Schritte
1. Ausgangslauf: `meta.mjs` mit deiner Liste; heutige Texte und Gründe aus `_werkstatt/belege/meta-regeln-2026-10-25.json` notieren.
2. Je Adresse: Seite holen, `<main>`-Text lesen, Suchbegriff aus dem Titel bestimmen, Text schreiben, Länge zählen (`node -e "console.log('<text>'.length)"`), jede Einzelheit gegen den Seitentext abhaken.
3. Datei schreiben, Prüfungen nach Abschnitt 6, nacheinander. Rot → beheben, wiederholen.

## 10. Schnellprüfung und Selbstprüfung
- `git -C /home/user/tezgel status --porcelain` vorher und nachher: neu geändert ist nur deine Datei.
- `git diff -- <deine Datei>`: nur deine Einträge.
- Lies jeden Text einmal laut: Versteht ihn jemand ohne Fachwissen? Steht jede Einzelheit auf der Seite? Verspricht er mehr als die Seite?

## 11. Ausgabeformular
Höchstens 500 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM (je Gruppe ein Satz) · GEMEINSAME DATEIEN · PRÜFUNG UND ERGEBNIS (Ausgangslauf und Endlauf von `meta.mjs` mit Zahlen, `npm test`, Textprüfung, jsonld) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 12. Letzte Zeile
=== ENDE E3-SEO-META-<n> · BEREIT ZUR RÜCKGABE ===
