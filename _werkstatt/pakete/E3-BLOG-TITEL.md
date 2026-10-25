# E3-BLOG-TITEL

## 1. Kopfzeile
E3-BLOG-TITEL · Rolle Lektor · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.6 · Schreibrechte (exakt): in `src/config/posts/*.js` nur der Wert des Feldes `"title"` (je Datei eine Zeile); `$SCRATCH/E3-BLOG-TITEL/**`.

Umfang: die 13 Titel der Ratgeber-Artikel. Der Titel ist zugleich die Überschrift (H1) des Artikels, der Titel der Karte in der Liste `/blog` und der Seitentitel für Suchmaschinen.

## 2. Rollenbriefing
Du bist **Lektor**: Du schreibst kurze Texte nach festen Regeln, ohne Gestaltung und ohne Technik darüber hinaus.
- Gute Arbeit: Jeder Titel ist eine klare Frage oder Aussage in Alltagssprache, die sagt, worum es im Artikel geht, mit dem Suchbegriff des Artikels; die Lesbarkeit von `/blog` steigt; nichts anderes in den Dateien ändert sich.
- Die drei häufigsten Fehler: 1. das Muster „Begriff: Erklärung“ behalten oder neu bauen; 2. den Suchbegriff verlieren (z. B. „Handwerkerbonus“, „Duschrinne“, „rutschfeste Fliesen“); 3. außer dem Titel etwas in der Datei ändern (Anriss, Text, Adresse, Datum).
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Formuliere die 13 Titel der Ratgeber-Artikel in `src/config/posts/*.js` nach den Regeln in Abschnitt 5 neu, ohne sonst etwas zu ändern.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Inhaber Deniz Tezgel, Aßlar), gebaut mit Next.js 16.3.6.
2. Leserin ist zum Beispiel eine 72-jährige Frau am Handy: kurze Sätze, bekannte Wörter.
3. Der Ratgeber `/blog` listet 13 Artikel; jeder Artikel steht in einer eigenen Datei unter `src/config/posts/`.
4. Die Adresse eines Artikels (`slug`, Dateiname) bleibt unverändert, damit Links und Suchmaschinen ihn weiter finden.
5. `createMetadata` (`src/lib/metadata.ts`) hängt an Titel bis 49 Zeichen „ · Tezgel“ an und kürzt Titel über 58 Zeichen; darum zählt die Länge.

## 5. Kern-Auszug
- **Länge:** 30 bis 49 Zeichen (mit Leerzeichen); höchstens 58, wenn es anders nicht verständlich geht (dann ohne „ · Tezgel“).
- **Form:** eine Frage („Welche rutschfesten Fliesen passen wohin?“) oder eine Aussage („So reinigen Sie Fliesen richtig“). Kein Doppelpunkt nach einem Schlagwort („Begriff: Erklärung“), keine zwei Sätze, kein Gedankenstrich, kein „&“, kein Ausrufezeichen.
- **Wörter:** Bindestrichwörter nur aus K-010-B (`_werkstatt/regeln/bindestrich-erlaubt.json`, z. B. „Gäste-WC“); „R-Klasse“ → „Rutschfestigkeit“ oder „rutschfeste Fliesen“; keine Floskeln aus `_werkstatt/regeln/floskeln.json`; keine Ziffern am Anfang („5 Mythen“ → „Fünf Irrtümer über Fliesenböden“ oder ähnlich). Fachwörter nur, wenn sie der Suchbegriff sind (Duschrinne, Punktablauf, Feinsteinzeug, Naturstein, Handwerkerbonus).
- **Suchbegriff behalten:** das Wort, nach dem jemand sucht, steht im neuen Titel (heute meist am Anfang des Titels oder im Dateinamen).
- **Prüftext:** Der Titel von `fliesen-reinigen-pflegen.js` behält die Wörter „Fliesen richtig reinigen“ in dieser Reihenfolge (die Funktionsprüfung „Teilen“ sucht sie).
- **Stellenanzeige** `fliesenleger-gesucht-geselle-meister.js`: „(m/w/d)“ bleibt; Titel als Aussage („Wir suchen einen Fliesenleger (m/w/d)“ oder ähnlich), nicht „Fliesenleger/in“.
- **Fakten:** keine neuen Aussagen über den Betrieb; der Titel verspricht nichts, was der Artikel nicht hält.

## 6. Maßstab
- `npm test` grün (`test/titleLength.test.mjs` prüft Titellängen), `npx eslint src/config/posts/*.js` ohne Fehler.
- `node _werkstatt/werkzeuge/textpruefung.mjs --art wissen $SCRATCH/E3-BLOG-TITEL/titel.md` mit den 13 neuen Titeln als Zeilen ``- `<titel>` ``: alle Regeln ok (die Regel „Glossarwort beim ersten Vorkommen als Fachwort“ darf ROT sein; dann nenne die Wörter).
- `node _werkstatt/werkzeuge/lesbarkeit.mjs --seite /blog --ziel $SCRATCH/E3-BLOG-TITEL/lesbarkeit` vorher und nachher (Werte notieren); `node _werkstatt/werkzeuge/meta.mjs --seiten <die 13 Adressen /blog/<slug>> --ziel $SCRATCH/E3-BLOG-TITEL/meta`: notiere die Titel, wie sie ausgeliefert werden (die Beschreibung schreibt ein anderer Lektor, ROT bei der Beschreibung ist hier kein Befund).
- `git diff -- src/config/posts/`: je Datei genau eine geänderte Zeile, das Feld `"title"`.

## 7. Grenzen
- Nur die Zeilen `"title"` in `src/config/posts/*.js` ändern; drei andere Lektoren schreiben gleichzeitig Meta-Beschreibungen in `src/inhalte/meta/*`. Fremde geänderte Dateien in `git status` sind normal und bleiben unberührt.
- `src/config/posts.js`, Seiten, Bausteine, Tests und Konfiguration nur lesen; Wünsche unter GEMEINSAME DATEIEN.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean`. Keine `.env*`-Dateien lesen. Keine Datei löschen.
- Server 4320 nur nutzen, nie starten, beenden oder neu starten; kein `next build`.
- Umgebung in jeder Shell: `cd /home/user/tezgel && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_SCRATCH=$SCRATCH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`.

## 8. Schritte
1. Ausgangslauf: `lesbarkeit.mjs` auf `/blog`; die 13 heutigen Titel mit Länge notieren.
2. Je Artikel: Anriss und Anfang des Textes lesen, Suchbegriff bestimmen, neuen Titel schreiben, Länge zählen.
3. Titel einsetzen, Prüfungen nach Abschnitt 6, nacheinander. Rot → beheben, wiederholen.

## 9. Schnellprüfung und Selbstprüfung
- `git -C /home/user/tezgel status --porcelain` vorher und nachher: neu geändert sind nur Dateien unter `src/config/posts/`.
- Lies jeden Titel einmal laut: Versteht ihn jemand ohne Fachwissen? Weiß man, was im Artikel steht?

## 10. Ausgabeformular
Höchstens 500 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM (Tabelle alt → neu mit Länge) · GEMEINSAME DATEIEN · PRÜFUNG UND ERGEBNIS (Lesbarkeit vorher und nachher, `npm test`, Textprüfung, ausgelieferte Titel) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E3-BLOG-TITEL · BEREIT ZUR RÜCKGABE ===
