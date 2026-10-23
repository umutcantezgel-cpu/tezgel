# E2-BILD-01

## 1. Kopfzeile
E2-BILD-01 · Rolle Bildbearbeiter · Modell Haiku 5.5 · Stufe 2 (Werkzeug nach Bildregeln) · Kern-Version v3.0 · Schreibrechte (exakt): `_werkstatt/werkzeuge/bilder.mjs` (neu), `_werkstatt/werkzeuge/tests-logik/bilder.test.mjs` (neu), `$SCRATCH/E2-BILD-01/**` · Umfang: ein Werkzeug mit drei Modi (bearbeiten, prüfen, Probe) und mindestens 10 Logik-Tests

## 2. Rollenbriefing
Du bist **Bildbearbeiter**: Du bearbeitest und exportierst Bilder nach Bildplatzliste per Skript.
- Gute Arbeit: Metadaten sind weg; der Zuschnitt trifft den Schwerpunkt; Farben bleiben natürlich.
- Die drei häufigsten Fehler: 1. Metadaten bleiben; 2. Schwerpunkt beim Zuschnitt verfehlt; 3. Farbstich verstärkt.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Baue das Bildwerkzeug `bilder.mjs`, das aus den Originalfotos Webfassungen nach Bildplatzliste erzeugt und ausgelieferte Bilder auf Metadaten prüft.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- K-012 Bildregeln (`_werkstatt/KERN.md`, Abschnitt K-012) und Auftrag Abschnitt 8 Bearbeitung: automatisch ausrichten, alle Metadaten entfernen (EXIF, XMP, IPTC, GPS, Bildtexte), sanfte Korrektur (nur Belichtung und Weißabgleich), Zuschnitt nach Platz und Schwerpunkt, Webfassung höchstens 2.560 px lange Kante, nie hochskalieren, sprechende Dateinamen.
- Quellen: `/home/user/tezgel/_eingang/entpackt/IMG_xxxx.PNG` (iPhone-Bildschirmfotos, meist 1320 px breit; manche haben einfarbige Ränder oder Balken, die weg müssen). Ziel später: `public/images/arbeiten/<raum>/<name>.jpg` (in diesem Paket nur Probeausgaben im Scratchpad).
- Bildplatzliste `_werkstatt/bildplaetze.md`: Spalten ID · Platz · Format (Breite : Höhe) · Original · Zuschnitt (Schwerpunkt in Prozent, was weg muss) · Alt-Text · `sizes` · Vorrang. Schwerpunkte stehen zusätzlich in `_werkstatt/bildinventar.csv` (Spalten `schwerpunkt_x_prozent`, `schwerpunkt_y_prozent`).
- Einbau später über `next/image` mit festen Maßen, `sizes` und unscharfem Platzhalter (`blurDataURL`); deshalb liefert das Werkzeug je Bild Breite, Höhe und einen kleinen Platzhalter als Daten-URL.

## 6. Maßstab
- Bibliothek: `sharp` 0.35.4 in `_werkstatt/werkzeuge/node_modules` (E2-ORCH-W0). Muster für Werkzeuge: `_werkstatt/werkzeuge/adressen.mjs` (Kopfkommentar mit Nutzung, `--probe`), `lib.mjs` (`REPO`, `SCRATCH`, `ensureDir`).
- Muster für Logik-Tests: `_werkstatt/werkzeuge/tests-logik/lesbarkeit.test.mjs` (Logik in exportierten Funktionen, Tests ohne Dateisystem, wo möglich).

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Fremde Prozesse nie beenden; `pkill -f next` und Ähnliches sind verboten. Server 4310 (Produktion, alter Stand bis E2) und 4320 (Entwicklung, zeigt den Arbeitsbaum) nur nutzen, nicht neu starten.
- Keine Dateien außerhalb von `/home/user/tezgel` und `$SCRATCH` anlegen, auch nicht im Wurzelverzeichnis `/`.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Nichts nach `public/` schreiben; die echten Webfassungen entstehen im Paket E2-BILD-02.
- Originale in `_eingang/` nur lesen; nie verändern, nie kopieren außer in den Scratchpad.
- Keine neuen Abhängigkeiten; nur `sharp` und Node-Bordmittel.

## 8. Schritte
1. Lies K-012, den Kopf von `bildplaetze.md` und die Spalten von `bildinventar.csv`.
2. Baue `bilder.mjs` mit exportierten, reinen Funktionen für die Rechnung (ohne sharp prüfbar): `ausschnitt({breite, hoehe}, {format: "4:5", schwerpunkt: {x, y}, rand})` liefert das größte Rechteck im gewünschten Format innerhalb des Bildes (nach Abzug der Ränder), so mittig zum Schwerpunkt wie möglich, nie über den Bildrand; `zielbreiten(quellbreite, wunsch)` liefert nur Breiten ≤ Quellbreite (nie hochskalieren), lange Kante ≤ 2.560 px; `dateiname(raum, name)` liefert Kleinbuchstaben, Ziffern und Bindestriche (Umlaute ä→ae, ö→oe, ü→ue, ß→ss).
3. Modus `--auftrag <datei.json> --ziel <ordner>`: Liste von Aufträgen `{ id, original, raum, name, format, schwerpunkt: {x, y}, ausschnitt?: {links, oben, rechts, unten} in Prozent (Bereiche, die weg müssen), breiten: [640, 960, 1280], alt }`. Je Auftrag: lesen, `rotate()` (Ausrichtung), einfarbige Ränder erkennen und abschneiden (Zeilen und Spalten mit Standardabweichung der Helligkeit unter einer Schwelle am Rand), optionalen Ausschnitt abziehen, Zuschnitt nach `ausschnitt()`, sanfte Korrektur (Weißabgleich und Belichtung je Kanal höchstens ±8 %, abschaltbar mit `"korrektur": false`), Ausgabe als JPEG (mozjpeg, Qualität 78, progressiv, sRGB) je Breite unter `<ziel>/<raum>/<name>-<breite>.jpg` und die größte zusätzlich als `<name>.jpg`; ohne Metadaten. Danach schreibt es `<ziel>/bilder.json`: je Auftrag `{ id, src: "/images/arbeiten/<raum>/<name>.jpg", breite, hoehe, alt, raum, blurDataURL }` (Platzhalter: 16 px breit, WebP, als Daten-URL).
4. Modus `--pruefe <ordner>`: alle JPEG, PNG und WebP darunter mit `sharp().metadata()` auf `exif`, `xmp`, `iptc` und Bildtexte prüfen; Ausgabe je Datei, Exit 1 bei einem Fund.
5. Modus `--probe`: erzeugt im Scratchpad ein Testbild mit EXIF (Bildtext und GPS über `withExif`), einfarbigem Rand und bekanntem Schwerpunkt, führt einen Auftrag damit aus und zeigt: Rand weg, Format stimmt, Metadaten weg (`--pruefe` findet vorher etwas, danach nichts), keine Breite über der Quelle. Ausgabe „PROBE OK“ oder Abbruch mit Grund.
6. Tests `tests-logik/bilder.test.mjs` (mindestens 10 Fälle): `ausschnitt` für Hoch- und Querformat, Schwerpunkt am Rand (Rechteck bleibt im Bild), Ausschnitt mit Rändern, `zielbreiten` (keine Hochskalierung, Obergrenze 2.560), `dateiname` mit Umlauten und Leerzeichen.
7. Rauchlauf mit zwei echten Originalen: `start-dusche` (IMG_2578, 4:5, Schwerpunkt 50/52) und `lage-balkon` (IMG_2545, 1:1, Stange in der Mitte wegschneiden: wähle einen Ausschnitt links davon und begründe ihn). Ausgabe nur nach `$SCRATCH/E2-BILD-01/rauch/`. Sieh dir beide Ergebnisse mit dem Read-Werkzeug an und beschreibe Zuschnitt, Farbe und Schärfe in je einem Satz.

## 9. Schnellprüfung und Selbstprüfung
- `node --check bilder.mjs`; `node --test tests-logik/bilder.test.mjs` alle grün; `node bilder.mjs --probe` mit „PROBE OK“; `node bilder.mjs --pruefe $SCRATCH/E2-BILD-01/rauch` ohne Fund.
- Größe der Rauchlauf-Bilder in KB je Breite (Startbild mobil höchstens 200 KB bei der kleinsten Breite, K-013).
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert sind nur Dateien aus deinen Schreibrechten (fremde Einträge, etwa Arbeit des Orchestrators unter `src/`, bleiben unberührt und werden nicht gemeldet).

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS (Befehl und Ergebnis je Prüfung) · BILDBELEGE (Pfade) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E2-BILD-01 · BEREIT ZUR RÜCKGABE ===
