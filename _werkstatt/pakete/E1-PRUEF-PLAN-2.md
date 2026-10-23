# E1-PRUEF-PLAN-2

## 1. Kopfzeile
E1-PRUEF-PLAN-2 · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 (Prüfung nach Checkliste) · Kern-Version v3.0 · Schreibrechte (exakt): `$SCRATCH/E1-PRUEF-PLAN-2/**` (nur Arbeitsnotizen; dein Bericht ist deine Antwort) · Umfang: `_werkstatt/PLAN.md` (Fassung 1.1, 384 Zeilen) und `_werkstatt/ABNAHME.md` (Z-01 bis Z-14) gegen 7 Prüfpunkte, Runde 2 von höchstens 2 (letzte Runde)

## 2. Rollenbriefing
Du bist **Prüfer**: Du führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegen (Datei und Zeile).
- Gute Arbeit: Jeder Befund nennt Fundstelle, Regel aus dem Auftrag und einen konkreten Änderungsvorschlag; du prüfst gegen den Auftrag, nicht gegen deinen Geschmack; Zählungen machst du per Befehl, nicht per Schätzung.
- Die drei häufigsten Fehler: 1. deuten statt berichten (Stilfragen sind kein Befund); 2. einzelne Zeilen prüfen statt die ganze Tabelle per Skript; 3. über die eigene Stufe hinaus prüfen oder Dateien ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Prüfe, ob PLAN.md Fassung 1.1 und ABNAHME.md die 25 Befunde aus Runde 1 (`_werkstatt/pakete/E1-PRUEF-PLAN.rueckgabe.md`) erledigen und keine neuen Verstöße gegen den Auftrag enthalten, und liefere eine Befundliste.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- K-004 Konventionen (Auszug): Seitendateien unter `src/app/(bestand)/**/page.*`; gemeinsame Dateien (Designsystem, globale Stile, Navigation, Routen, Weiterleitungen, gemeinsame Text- und Datendateien, KERN) schreibt nur der Orchestrator.
- K-009 Seitenarten: Erzähl-, Wissens-, Orts- und Arbeitsseiten; Rechtstexte nur gestalterisch.
- K-007 Register (Auszug): B-01 `verlegen`, B-02 `intro`, `startbild` und 9 große Momente (`schichten`, `weg`, `gefaelle-dusche`, `gefaelle-balkon`, `formatregler`, `verband`, `vorher-nachher`, `galerie-filter`, `karte`).

## 6. Maßstab
- `_werkstatt/AUFTRAG.md`: Abschnitt 5 (Rollen, Modelle, Paket-Bauplan, Dateihoheit), Abschnitt 13 (Ablauf), Abschnitt 14 und Ergänzung (Stufen A, B, C), Abschnitt 15 (Regelkreise), Abschnitt 16 (Z-01 bis Z-14).
- `_werkstatt/PLAN.md` (Fassung 1, Tabellen „E2“ bis „Abschluss“ und „Kür“), `_werkstatt/ABNAHME.md`.
- `_werkstatt/adressen-e0.csv` (alle Adressen), `src/app/(bestand)/**/page.*` (alle Seitendateien), `src/config/posts/` (13 Artikel), `_werkstatt/bildplaetze.md`.

## 7. Grenzen
- Nur lesen. Keine Datei im Repo ändern oder anlegen; Notizen nur unter `$SCRATCH/E1-PRUEF-PLAN/`.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash`. Keine `.env*`-Dateien lesen.
- Keine Server starten, keine Builds, keine Browser. Diese Prüfung braucht nur Lesen und Zählen (grep, python3, node).
- Umgebung: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.

## 8. Schritte
0. **Runde 1:** Lies `_werkstatt/pakete/E1-PRUEF-PLAN.rueckgabe.md` und den Abschnitt „Regeln dieses Plans“ in PLAN.md. Für jeden der 25 Befunde: erledigt, teilweise oder offen, mit Fundstelle. Die Regel „Pakete derselben Welle mit derselben Datei sind Orchestrator-Pakete und hängen nacheinander voneinander ab“ ist zulässig (Abschnitt 5 verbietet nur gleichzeitige Pakete); prüfe dann nur, ob die Abhängigkeit wirklich in der Spalte steht.
1. **Abdeckung der Seiten:** Liste alle Seitendateien (`find src/app/\(bestand\) -name 'page.*'`). Prüfe per Skript, dass jede Seitendatei in PLAN.md in genau einem Baumeister-Paket (`E2-ORCH-06`, `E3-BAU-*`, `E4-BAU-*`) unter „Schreibrechte“ steht. Melde jede fehlende und jede doppelt vergebene Datei.
2. **Abdeckung der Texte:** Prüfe, dass jede Seite außer den 6 Rechtstexten ein Texter- und ein Lektorpaket hat und dass die 13 Artikel aus `src/config/posts/` je ein Texter- und Lektorpaket haben. Melde Lücken.
3. **Dateihoheit:** Prüfe je Welle (Spalte „Welle“), dass keine zwei Pakete dieselbe Datei in den Schreibrechten haben. Haiku-Pakete dürfen keine gemeinsamen Dateien (Abschnitt 5 Dateihoheit) in den Schreibrechten haben; melde jeden Fall mit Kennung.
4. **Modelle und Stufen:** Prüfe jede Zeile gegen Abschnitt 5: Stufe 1 und 2 nur Haiku, Stufe 3 nur Opus; Opus-Unteragenten nur für Sichtabnahme der Referenz und Endprüfung. Zähle Haiku und Opus und vergleiche mit den Zahlen unter „Modellanteil“.
5. **Abhängigkeiten:** Prüfe, dass jede Kennung in „Abhängig von“ existiert (Platzhalter mit `*` zählen als Gruppe) und dass es keinen Kreis gibt. Prüfe den kritischen Pfad gegen die Tabellen.
6. **Kriterien:** Prüfe, dass jedes Kriterium Z-01 bis Z-14 in mindestens einem Pflichtpaket in der Spalte „Kriterium“ vorkommt und in ABNAHME.md Methode, Schwelle und Beleg hat. Prüfe, dass jede Schwelle aus Abschnitt 0 (BUDGETS) und Abschnitt 16 in ABNAHME.md wörtlich gleich oder strenger steht. Prüfe, dass Z-02, Z-11 und Z-14 keine Ausnahme zulassen.
7. **Platzhalter und Ausführbarkeit:** Suche in den Spalten „Gegenstand“ und „Schreibrechte“ nach „usw.“, „analog“, „folgt“, „etc.“ und nach Paketen, deren Gegenstand mehr als einen Gegenstand oder mehr als eine Rolle nennt (Abschnitt 5: ein Paket, ein Gegenstand, eine Rolle). Melde jeden Fund.

## 9. Schnellprüfung und Selbstprüfung
- Jede Zählung steht mit dem Befehl, der sie erzeugt hat, in `$SCRATCH/E1-PRUEF-PLAN/zaehlung.txt`.
- `git status --porcelain` vor und nach deiner Arbeit: Du hast nichts im Repo geändert.

## 10. Ausgabeformular
Antworte mit genau diesen Abschnitten, höchstens 600 Wörter:
- GEÄNDERTE DATEIEN (nur Scratchpad)
- WAS UND WARUM (ein Satz)
- GEMEINSAME DATEIEN: Befunde als nummerierte Liste, je Befund: Prüfpunkt (1 bis 7) · Fundstelle (Datei:Zeile oder Kennung) · Regel (Abschnitt im Auftrag) · Vorschlag. Schwere: muss (verletzt den Auftrag) oder soll (Lücke ohne Regelverstoß).
- PRÜFUNG UND ERGEBNIS: zuerst eine Zeile je Befund aus Runde 1 (Nummer, erledigt/teilweise/offen), dann je Prüfpunkt eine Zeile mit Zahl der Befunde und dem Zählbefehl
- BILDBELEGE: keine
- OFFENE FRAGEN

## 11. Letzte Zeile
=== ENDE E1-PRUEF-PLAN-2 · BEREIT ZUR RÜCKGABE ===
