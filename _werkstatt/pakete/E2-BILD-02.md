# E2-BILD-02

## 1. Kopfzeile
E2-BILD-02 · Rolle Bildbearbeiter · Modell Haiku 5.5 · Stufe 2 (Bildbearbeitung nach Bildplatzliste) · Kern-Version v3.0 · Schreibrechte (exakt): `public/images/arbeiten/**` (neu), `_werkstatt/bilder/arbeiten-e2.json` (neu), `_werkstatt/bilder/auftrag-e2.json` (neu), `$SCRATCH/E2-BILD-02/**` · Umfang: alle Bildplätze mit Foto in den Abschnitten „Startseite“, „/bad“, „/bad/badsanierung“, „/bad/barrierefreies-bad“, „/leistungen“, „/fliesen“, „/balkon-terrasse“, „/ueber-uns“ und „/kontakt“ von `_werkstatt/bildplaetze.md` (Bereiche „…1…n“ zählen als n Plätze)

## 2. Rollenbriefing
Du bist **Bildbearbeiter**: Du bearbeitest und exportierst Bilder nach Bildplatzliste per Skript.
- Gute Arbeit: Metadaten sind weg; der Zuschnitt trifft den Schwerpunkt; Farben bleiben natürlich.
- Die drei häufigsten Fehler: 1. Metadaten bleiben; 2. Schwerpunkt beim Zuschnitt verfehlt; 3. Farbstich verstärkt.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Erzeuge mit `bilder.mjs` die Webfassungen aller Fotoplätze von Startseite und Hauptansichten nach der Bildplatzliste und prüfe jedes Ergebnis mit eigenen Augen.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- K-012 Bildregeln (`_werkstatt/KERN.md`, Abschnitt K-012): echte Fotos, ehrliche Alt-Texte (≤ 125 Zeichen, ohne Gedanken- und Bindestriche außerhalb von `_werkstatt/regeln/bindestrich-erlaubt.json`), keine erkennbaren Personen, Hausnummern, Kennzeichen, Namen, Dokumente oder fremden Logos, keine Hochskalierung, Metadaten weg.
- Bildplatzliste `_werkstatt/bildplaetze.md`: Spalten ID · Platz · Format · Original · Zuschnitt · Alt-Text · `sizes` · Vorrang. Plätze mit „—“ beim Original sind Fliesenkompositionen und kein Auftrag. Bereiche wie `bad-beleg-1…4` mit vier Originalen ergeben vier Aufträge `bad-beleg-1` bis `bad-beleg-4`; ihr Alt-Text steht nicht in der Liste („aus `arbeiten.ts`“): Schreibe ihn selbst aus dem Bild und der Zeile in `_werkstatt/bildinventar.csv` (Spalte `motiv`), ehrlich (zum Beispiel „noch ohne Armaturen“, wenn Anschlüsse offen sind).
- Ablage: `public/images/arbeiten/<raum>/<name>.jpg` mit sprechendem Namen (Raum aus der Liste oder dem Inventar: bad, dusche, balkon-und-terrasse, treppe, wohnen, baustelle).

## 6. Maßstab
- Werkzeug `_werkstatt/werkzeuge/bilder.mjs` (Kopfkommentar lesen; Modus `--auftrag`, `--pruefe`); Rückgabe des Werkzeugbaus `_werkstatt/pakete/E2-BILD-01.rueckgabe.md` (Ränder, Korrektur, Qualität 82).
- Originale in `/home/user/tezgel/_eingang/entpackt/`; Schwerpunkte in Prozent des ganzen Originals (Spalten `schwerpunkt_x_prozent`, `schwerpunkt_y_prozent` in `_werkstatt/bildinventar.csv`, Zeile mit dem Original in Spalte `original`), sofern die Bildplatzliste keinen eigenen Wert nennt.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Fremde Prozesse nie beenden; `pkill -f next` und Ähnliches sind verboten. Server 4310 (Produktion, alter Stand bis E2) und 4320 (Entwicklung, zeigt den Arbeitsbaum) nur nutzen, nicht neu starten.
- Keine Dateien außerhalb von `/home/user/tezgel` und `$SCRATCH` anlegen, auch nicht im Wurzelverzeichnis `/`.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Nur `public/images/arbeiten/` unter `public/` schreiben; vorhandene Bilder unter `public/images/` nie ändern oder löschen.
- Originale nur lesen.
- `_werkstatt/bildplaetze.md` nicht ändern; Abweichungen unter GEMEINSAME DATEIEN melden.

## 8. Schritte
1. Lies K-012, die Bildplatzliste (alle genannten Abschnitte) und die Rückgabe E2-BILD-01.
2. Schreibe `_werkstatt/bilder/auftrag-e2.json` mit einem Auftrag je Fotoplatz: `id` aus der Liste, `original`, `raum`, `name` (sprechend, zum Beispiel `dusche-ohne-stufe-graue-fliesen`), `format`, `schwerpunkt`, `ausschnitt` (wo die Liste etwas wegschneiden lässt), `breiten` (Plätze mit `sizes` bis 100vw: 640, 960, 1280; sonst 480, 800), `alt`. Zähle die Aufträge und vergleiche mit der Zahl der Fotoplätze in den Abschnitten; nenne beide Zahlen.
3. Führe `node _werkstatt/werkzeuge/bilder.mjs --auftrag _werkstatt/bilder/auftrag-e2.json --ziel public/images/arbeiten` aus. Kopiere danach `public/images/arbeiten/bilder.json` nach `_werkstatt/bilder/arbeiten-e2.json` und lösche die Datei unter `public/` (Bilddaten werden nicht ausgeliefert).
4. Sieh dir jedes erzeugte Bild in der größten Breite mit dem Read-Werkzeug an. Prüfe je Bild: Schwerpunkt getroffen, nichts Gesperrtes sichtbar (Personen von vorn, Gesichter, Hausnummern, Kennzeichen, Namen, Dokumente, fremde Logos, Markenaufdrucke im Vordergrund), Alt-Text stimmt mit dem Bild überein. Bei einem Treffer: Ausschnitt im Auftrag anpassen und neu erzeugen; geht es nicht, den Platz unter GEMEINSAME DATEIEN melden und das Bild löschen.
5. Führe `node _werkstatt/werkzeuge/bilder.mjs --pruefe public/images/arbeiten` aus (kein Fund erwartet) und notiere Größe in KB je Datei; das Startbild `start-dusche` in der kleinsten Breite höchstens 200 KB.
6. Liste je Platz: ID, Datei, Breite × Höhe, KB, Alt-Text, Urteil in einem Satz.

## 9. Schnellprüfung und Selbstprüfung
- `--pruefe public/images/arbeiten` ohne Fund, Exit 0.
- Zahl der Aufträge gleich der Zahl der Fotoplätze der genannten Abschnitte.
- `git status --porcelain` zeigt neu nur `public/images/arbeiten/**`, `_werkstatt/bilder/arbeiten-e2.json` und `_werkstatt/bilder/auftrag-e2.json`.
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert sind nur Dateien aus deinen Schreibrechten (fremde Einträge, etwa Arbeit des Orchestrators unter `src/`, bleiben unberührt und werden nicht gemeldet).

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS (Befehl und Ergebnis je Prüfung) · BILDBELEGE (Pfade) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E2-BILD-02 · BEREIT ZUR RÜCKGABE ===
