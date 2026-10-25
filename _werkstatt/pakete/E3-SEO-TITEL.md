# E3-SEO-TITEL

## 1. Kopfzeile
E3-SEO-TITEL · Rolle Lektor · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.6 · Schreibrechte (exakt): in den `page.*` und `layout.*` der Seiten aus Abschnitt 8 nur der Titel der Metadaten (`title` in `metadata`, `createMetadata(…)` oder `generateMetadata`) und, wo dieselbe Seite denselben Titeltext ein zweites Mal für die strukturierten Daten führt (`titel` von `SeitenDaten`, `name` eines Seitenknotens, Name der letzten Brotkrume in `SeitenDaten`), dieser zweite Text; in `src/app/(bestand)/bad/musterbaeder/[slug]/page.jsx` nur der Titelausdruck in den Metadaten (Zeile mit `title:` in der Funktion der Metadaten je Musterbad) und der Name der letzten Brotkrume in `SeitenDaten`. Arbeitsordner `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-SEO-TITEL/**`.

Umfang: 33 Seitentitel (Text im Browser-Tab und als blaue Zeile in Suchergebnissen), die gegen die Schreibregeln verstoßen: Gedankenstrich, Muster „Begriff: Erklärung“, Bindestrichwörter außerhalb der erlaubten Liste, ein Titel auf zwei Seiten. Liste mit Gründen: `_werkstatt/belege/titel-regeln-2026-10-25.json` (ohne `/referenzen/barrierefreies-duschbad`, dessen Titel zugleich die sichtbare Überschrift ist; der kommt mit der Bauwelle).

**Arbeitsordner:** Alle eigenen Dateien nur unter dem absoluten Pfad oben, nie unter `/E3-…` im Wurzelverzeichnis und nie im Repo.

## 2. Rollenbriefing
Du bist **Lektor**: Du schreibst kurze Texte nach festen Regeln, ohne Gestaltung und ohne Technik darüber hinaus.
- Gute Arbeit: Jeder neue Titel sagt klar, was auf der Seite steht, mit dem Suchbegriff am Anfang, ohne Regelverstoß, höchstens 58 Zeichen; kein Titel steht auf zwei Seiten; sichtbar ändert sich nichts.
- Die drei häufigsten Fehler: 1. die sichtbare Überschrift (H1) oder andere sichtbare Texte ändern statt nur des Titels der Metadaten; 2. den Suchbegriff verlieren (z. B. „Badplaner“, „DIN 18534“, „Estrich“, „Fugensanierung“); 3. Titel über 58 Zeichen (sie werden abgeschnitten).
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Formuliere die Titel der Seiten aus Abschnitt 8 nach den Regeln in Abschnitt 5 neu, nur in den Metadaten und in den gleichlautenden Texten der strukturierten Daten derselben Seite.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Inhaber Deniz Tezgel, Aßlar), gebaut mit Next.js 16.3.6.
2. Leserin ist zum Beispiel eine 72-jährige Frau am Handy: kurze, klare Wörter.
3. `generatePageMetadata` (`src/lib/metadata.ts`, `sanitizeTitle`) behält Titel von 45 bis 58 Zeichen mit „Tezgel“ unverändert, hängt sonst an kurze Titel „ · Tezgel“ an und kürzt Titel über 58 Zeichen; schreibe darum Titel von 45 bis 58 Zeichen, die „Tezgel“ enthalten.
4. „&“ ist in Titeln erlaubt (Platz im Titel, E-054); in Beschreibungen nicht.
5. `_werkstatt/werkzeuge/meta.mjs` liest Titel und Beschreibung aus der ausgelieferten Seite.

## 5. Kern-Auszug
- **Form:** „<Suchbegriff und Thema> | <Marke>“ oder „<Thema> · Tezgel“, 45 bis 58 Zeichen, mit „Tezgel“. Marke wie bisher auf der Seite („Fliesenverlegung Tezgel“, „Tezgel“).
- **Nicht:** Gedankenstrich (– —) oder „ - “; Doppelpunkt nach einem Schlagwort („Badplaner: Bad online planen“ → „Bad online planen mit dem Badplaner | …“); Bindestrichwörter außerhalb `_werkstatt/regeln/bindestrich-erlaubt.json` („XXL-Großformate“ → „große Fliesen“, „Fliesen-Konfigurator“ → „Fliesenkonfigurator“ oder „Konfigurator für Fliesen“, „Estrich-Belegreife“ → „Belegreife des Estrichs“, „CM-Messung“ weglassen oder „Feuchtemessung“, „Fliesenleger-Fachbetrieb“ → „Fachbetrieb für Fliesen“, „Bad-Projektcheck“ → „Projektcheck fürs Bad“); kein „FAQ:“; keine Floskeln (`_werkstatt/regeln/floskeln.json`).
- **Doppelter Titel:** `/bad` (Übersicht des Bereichs Bad) und `/bad/badsanierung` (die Badsanierung selbst) bekommen verschiedene Titel; der Suchbegriff „Badsanierung“ bleibt bei `/bad/badsanierung` vorn.
- **Musterbäder (12 Seiten, ein Ausdruck):** heute `Musterbad ${bath.title} – Komplettbad & Badsanierung | Tezgel` mit `bath.title` wie „Basic-Bad 4,6 ㎡“. Neu ohne Gedankenstrich und ohne Bindestrichwort, z. B. aus der Linie (Basic, Komfort oder Premium, Luxus, wie sie die Seite zeigt) und der Größe gebildet: „Musterbad Basic mit 4,6 m² | Badsanierung Tezgel“. `bath.title` selbst und die Daten in `src/config/musterbaeder.js` bleiben unverändert (sichtbare Überschrift); leite die Linie im Ausdruck ab (z. B. erstes Wort von `bath.title` vor dem Bindestrich). Prüfe alle 12 Ergebnisse (Länge 45 bis 58).
- **Gleich in den strukturierten Daten:** Führt dieselbe Seite den alten Titeltext noch einmal wörtlich (z. B. `titel="…"` in `SeitenDaten` oder eine Konstante), ändere ihn gleich mit oder nutze dieselbe Konstante; sichtbare Brotkrumen und H1 bleiben.

## 6. Maßstab
- `node _werkstatt/werkzeuge/meta.mjs --liste <Arbeitsordner>/seiten.txt --ziel <Arbeitsordner>/meta` (Liste der 33 Adressen aus der Belegdatei): jeder Titel neu, 45 bis 58 Zeichen, ohne Verstoß nach Abschnitt 5; ein eigenes kleines Skript im Arbeitsordner prüft die Regeln aus `meta.json`.
- Kein Titel doppelt: `meta.mjs` über alle 163 Adressen (`/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/sitemap-pfade.txt`) und Zählung der Titel.
- `node _werkstatt/werkzeuge/jsonld.mjs --seiten <die 33 Adressen> --ziel <Arbeitsordner>/jsonld`: alle GRÜN.
- `npm test` grün (darin `test/titleLength.test.mjs`); `npx tsc --noEmit -p .` und `npx eslint <deine Dateien>` ohne Fehler.
- `git diff -- <deine Dateien>`: nur Titelzeilen und gleichlautende Texte der strukturierten Daten.

## 7. Grenzen
- Nur die Titelzeilen nach Abschnitt 1 ändern. Fremde geänderte Dateien in `git status` sind normal und bleiben unberührt.
- `src/lib/*`, `src/config/*`, `src/inhalte/*`, `src/components/*`, `test/*` und Konfiguration nur lesen; Wünsche unter GEMEINSAME DATEIEN.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean`. Keine `.env*`-Dateien lesen. Keine Datei löschen.
- Server 4320 nur nutzen, nie starten, beenden oder neu starten; Port 4311 nicht benutzen (dort läuft eine Prüfung); kein `next build`.
- Umgebung in jeder Shell: `cd /home/user/tezgel && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`.

## 8. Adressen
Alle Adressen aus `_werkstatt/belege/titel-regeln-2026-10-25.json` außer `/referenzen/barrierefreies-duschbad` (33). Die Titel stehen in `src/app/(bestand)/<adresse>/page.*` oder im `layout.*` desselben Ordners; die Musterbäder im Ausdruck in `src/app/(bestand)/bad/musterbaeder/[slug]/page.jsx`.

## 9. Schritte
1. Ausgangslauf: `meta.mjs` über die 33 Adressen; je Seite Fundstelle des Titels notieren (Datei, Zeile).
2. Je Seite: H1 und Thema lesen, Suchbegriff bestimmen, neuen Titel schreiben, Länge zählen.
3. Einsetzen, Prüfungen nach Abschnitt 6, nacheinander. Rot → beheben, wiederholen.

## 10. Schnellprüfung und Selbstprüfung
- `git -C /home/user/tezgel status --porcelain` vorher und nachher: neu geändert sind nur Dateien der Seiten aus Abschnitt 8.
- Lies jeden Titel einmal laut: Weiß man, was auf der Seite steht?

## 11. Ausgabeformular
Höchstens 500 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM (Tabelle alt → neu mit Länge) · GEMEINSAME DATEIEN · PRÜFUNG UND ERGEBNIS · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 12. Letzte Zeile
=== ENDE E3-SEO-TITEL · BEREIT ZUR RÜCKGABE ===
