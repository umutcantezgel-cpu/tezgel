# E4-NACH-13-PA · Rückgabe Prüfer (Prüfstufe A)

## GEÄNDERTE DATEIEN
Keine Projektdatei. Geschrieben nur nach `_werkstatt/belege/e4-nach/konfigurator/` (9 JPG, `konfigurator-bilder.json`) und in diese Rückgabe.

## WAS UND WARUM
- `pruefe-a.sh E4-NACH-13` mit den vier Dateien, Ansichten `/fliesen/konfigurator /fliesen/kueche /fliesen`, Scratch `E4-NACH-13/`.
- Bilder und Schritte 1–4 per Hilfsskript im Scratchpad (nicht im Repo), Anfragesperre aus `lib.mjs`, Einwilligung abgelehnt, Basis 4320. Nichts abgesendet.

## GEMEINSAME DATEIEN
Keine Änderung nötig. Mikrotext-Änderungen alt → neu (Vergleich gegen Basis e0), zur Entscheidung:
- `/fliesen/konfigurator` (Paketdatei `konfigurator/page.jsx`): neu Etikett „Ratgeber“ vor „Weiterführende Ratgeber zur Fliesenplanung“.
- Merkliste (`QualityPromise`, nicht im Arbeitsbaum, schon in HEAD): „Punkt 01“ bis „Punkt 08“ → „01“ bis „08“; „HWK Fachbetrieb · HWK Wiesbaden“ und „Garantierter Standard“ → eine Zeile „HWK Fachbetrieb · HWK Wiesbaden · Garantierter Standard“. Betrifft auch `/fliesen/kueche`.
- Kopf (alle drei Seiten, gemeinsam): „buchen“ entfällt; „WhatsApp“ und „Aufmaß anfragen“ neu.
- Fuß (alle drei Seiten, gemeinsam): „WhatsApp:“ und „Fax:“ entfallen; „Anschrift“, „Telefon“, „Mobil & WhatsApp“, „Fax“, „E-Mail“, „Zeiten“, „Betrieb seit 2008“ neu.
- Reihenfolge (keine Wortänderung): Der Ablauf „So funktioniert es“ steht auf `/fliesen/konfigurator` nach dem Werkzeug.

## PRÜFUNG UND ERGEBNIS
- Typprüfung (tsc): GRÜN, 0 Fehler (eigene 0, übrige 0). Inkrementell, 5 s.
- Lint (eslint): GRÜN, 0 Fehler, 0 Warnungen.
- Funktionstests: GRÜN. `funktion-konfigurator.spec.mjs`: erwartet 46, unerwartet 0, flaky 0. Skipped 4 = 2 `test.fixme` × 2 Projekte (mobil, desktop), nicht als Fehler gezählt.
- Bilder: GRÜN. HTTP 200 auf allen drei Seiten, Konsolenfehler 0, Überlauf 0. Überlappung (nicht gating): `/fliesen/konfigurator` 61 (390 px: 39, 1440 px: 22, Art „textkreuzung“ im Abschnitt Berechnung), `/fliesen/kueche` 0, `/fliesen` 40 (390 px).
- Texte: ROT (Gate). 242 Seiten mit Abweichung, davon 239 nur „fehlt“ (Lauf umfasst 3 Seiten). Zeilen entfernt 0, hinzu 97. Unerlaubt entfernte Spanne: 1, auf `/fliesen/konfigurator`. Wortvergleich: das einzige Wort ohne Gegenstück ist „Punkt“; die Ablaufpassage fehlt nicht, sie wurde verschoben.
- Gesamt pruefe-a: ROT (Exit 1), allein wegen des Textgates.

## BILDBELEGE (`_werkstatt/belege/e4-nach/konfigurator/`)
- `schritt1-d1440.jpg`: zwei Spalten, Vorschau rechts, nichts abgeschnitten; klebt bei Scroll +350 px auf 96 px.
- `schritt1-m390.jpg`: eine Spalte, Vorschau über dem Werkzeug, nichts abgeschnitten.
- `schritt2-d1440.jpg`: zwei Spalten, alle Untergrund-Fragen sichtbar.
- `schritt2-m390.jpg`: eine Spalte, vollständig.
- `schritt3-d1440.jpg`: zwei Spalten; Richtwert „ca. 12,6–13,8 m²“ sichtbar, die Zeile „aus 12 m² netto“ bricht um.
- `schritt3-m390.jpg`: eine Spalte, Formate, Muster und Mengenfeld sichtbar, nichts abgeschnitten.
- `schritt4-d1440.jpg`: zwei Spalten, Zusammenfassung vollständig.
- `schritt4-m390.jpg`: eine Spalte, vollständig; „Online absenden (mit E-Mail-Bestätigung)“ bricht zweizeilig um.
- `kueche-schritt1-d1440.jpg`: eingebettet einspaltig, Vorschau unter dem Kopf, nichts abgeschnitten.
- Vor jeder Eingabe zeigt die Vorschau „aus 20 m² netto“ (Vorgabe).

## OFFENE FRAGEN
1. Texte-Gate ROT: Soll die neue Reihenfolge und das Etikett „Ratgeber“ in die Erlaubnisliste? Basis e0 ist älter als HEAD; Merkliste, Kopf und Fuß stammen nicht aus dem Arbeitsbaum. Basis aktualisieren?
2. Überlappung 61 auf `/fliesen/konfigurator`: nicht visuell geprüft. Heuristik oder echter Konflikt im Abschnitt Berechnung, offen.
3. Scratch-Kennung `E4-NACH-13` war zeitweise parallel von einem fremden, verwaisten Lauf belegt. Ergebnisse stammen aus dem Lauf mit Start 02:22:59; Vorläuferdateien sind überschrieben.
4. `pruefe-a.sh` schreibt die Textstufe nach `_werkstatt/cache/texte/E4-NACH-13` (Symlink in den Scratchpad, außerhalb des Belegordners). Nur gemeldet.
5. `src/app/(bestand)/fliesen/page.jsx` war beim Start geändert, steht nicht in der Dateiliste und war am Ende nicht mehr im Status. Nicht geprüft.
6. Fremde Änderungen im Arbeitsbaum: `_werkstatt/werkzeuge/bewegung.mjs` (geändert), `_werkstatt/belege/e4-nach/bewegung2/` (neu). Nicht von mir.
