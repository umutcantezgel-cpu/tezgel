# E2-PRUEF-B2 · abgeschlossen durch E2-PRUEF-B3

## GEÄNDERTE DATEIEN
Neu angelegt, nur innerhalb der Schreibrechte: `_werkstatt/belege/e2-tor/PRUEFSTUFE-B2.md` (Belegdatei), `_werkstatt/belege/e2-tor/b2/` (axe, funktion, bildsatz, bildsatz-ersatz, werte, texte), `_werkstatt/belege/e2-tor/szene/`, `_werkstatt/pakete/E2-PRUEF-B2.rueckgabe.md`, `_werkstatt/pakete/E2-PRUEF-B3.rueckgabe.md`. Keine Werkzeuge, Tests, Quelltexte oder Texte geändert. Kein Commit, kein Push, kein Server gestartet oder gestoppt.

## WAS UND WARUM
- Schritt 1: `bewegung-lauf.sh` endete 22:57 UTC, alle Läufe exit 0. Alle zwölf Ergebnisse tragen `base` 4312 und sind vollständig; übernommen, nicht wiederholt.
- Schritt 2: axe gegen 4312. Schritte 3 und 4: Bewegung und Szene wie unten.
- Fehler meinerseits: Der erste Szenenlauf mit `--ausschnitt ansicht` (nicht im Paket) erzeugte fünf Bilder bei Scrollposition 0. Ordner gelöscht, Wiederholung ohne Option.
- Schritte 5 bis 8: Systemwerte, Texte, Belegdatei, Rückgaben.

## GEMEINSAME DATEIEN
Keine Änderung beantragt.

## PRÜFUNG UND ERGEBNIS
- Reinraum f8899dc (4312): Build, Typecheck, Lint, npm test 26/26, qa:graph, nft grün; 179 Seiten. GA-Variante (4311): dieselben Stufen grün.
- Funktion 4312: 306 Tests, 286 bestanden, 0 fehlgeschlagen, 0 flaky, 20 übersprungen (4 fixme, 8 Tracking, 8 aus Werkzeugbegründung). Tracking 4311: 8/8.
- Bildsatz `/` und `/kontakt` (4312): 66 Aufnahmen; Fehler, Überlauf, Überlappung, Konsole je 0. Ersatzpfad: 66, alle 0.
- axe 4312: `/` 0 und `/kontakt` 0 ernste/kritische Knoten in allen fünf Zuständen. Zur Kenntnis: `/bad` 24, `/blog` 42 (color-contrast).
- Register: `/` 172 Elemente, 7 Kennungen; `/kontakt` 145, 3 Kennungen; ohne data-motion je 0. Reduziert: 0 Befunde auf `/`, `/kontakt` und der Szene.
- Bildrate m390 (3 Läufe): Median verworfene Bilder 0 %, Median 4258 Bilder, Median LoAF 0.
- Szene 4320: Register ohne data-motion d1440 2 Einträge, m390 1 (Transition outline-color). Bildsatz 19 Aufnahmen, 0 Befunde; Ersatzpfad 19, alle 0.
- werte.mjs seit 1ad2e45: 20 Dateien, 0 Befunde (je Datei 0, Liste in der Belegdatei). Zur Information (745335f): 713 Befunde in 23 Dateien.
- Texte GRÜN (Werkzeugurteil): entfernte Zeilen 0; unerlaubt entfernte Spannen `/` 0, `/kontakt` 0; hinzugefügte Zeilen `/` 135, `/kontakt` 16.
- Alle Maßstab-Punkte der Werkzeuge sind erfüllt. HEAD wechselte während des Laufs auf b7bae98 (nur Belege); `src/` unverändert.

## BILDBELEGE
- `_werkstatt/belege/e2-tor/bilder/`: 66 JPEG, `/` und `/kontakt`, m390/t768/d1440, ≤ 1.440 px; identisch mit dem Bildsatz 4312.
- `_werkstatt/belege/e2-tor/szene/`: `bildsatz-d1440-00..02.jpg`, `bildsatz-m390-00..01.jpg` (feste Reihenfolge), `einzel-szene-ablauf-d1440/` (5 Bilder).
- `_werkstatt/belege/e2-tor/bewegung/`: 15 JPEG (sig-kreuzlinie m390 und d1440, sig-flucht d1440); `werkzeug-ausschnitt/4320/` (5).

## OFFENE FRAGEN
1. `werte-regeln.json` nimmt `src/app/werkstatt-schaufenster/**` aus; `szene/page.dev.tsx` (seit 1ad2e45 geändert) wird damit nicht geprüft. Bleibt die Ausnahme?
2. Texte: 151 hinzugefügte Zeilen und 95 Spannen ohne Erlaubtlisten-Eintrag (`texte-erlaubt.json`: 88 Einträge, keiner mit „neu“). Gelten sie als protokolliert?
3. Tracking auf 4312 übersprungen (Platzhalter-Build). Genügt der Lauf auf 4311 (8/8)?
4. Einzelbilder sig-kreuzlinie m390: Bilder 2 bis 4 byte-gleich (PRUEFSTUFE-B: 0=1, 3=4). d1440: Bild 0 gleich sig-flucht Bild 0. Ursache ungeprüft.
5. Szene `szene-ablauf`: Werkzeug meldet den Auslöser als unbekannt („Scroll-Auslöser angenommen“).
6. Dev-Schaufenster: outline-color-Transitionen ohne data-motion (d1440 21 Vorkommen, m390 59). Auf `/` und `/kontakt` 0.
7. Reduziert `/`: anriss „außerhalb des Dokuments“ (m390 15, d1440 13) und druck „Deckkraft 0.40“. Bewertung offen.
8. Bildrate d1440 nicht ausführbar (Werkzeug bricht ab). Kundenstimmen-Kürzel auf den Bildbelegen nicht geprüft.
