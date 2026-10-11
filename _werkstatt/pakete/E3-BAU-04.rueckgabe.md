# E3-BAU-04 · Rückgabe · /standorte

**GEÄNDERTE DATEIEN**
- `src/app/(bestand)/standorte/page.tsx`: Seitenkörper aus KERN-Bausteinen neu aufgebaut; Metadaten und JSON-LD unverändert.
- `_werkstatt/pakete/E3-BAU-04.rueckgabe.md` (diese Datei).
- Kein Commit, kein Push von mir. Seit 22:32:29 liegt auf dem Branch der Zwischenstand `1508894` mit genau dieser Datei; ich habe ihn nicht ausgelöst.

**WAS UND WARUM**
- Einstieg (`Einstieg`, erzaehl): Etikett, H1 an der Laserachse, Vorspann, Knöpfe „Vor-Ort-Aufmaß anfragen“ und Telefon. Rechts ein Verlegeplan `wohnen` ohne Achse, damit Rot nur einmal erscheint.
- Leitachse über die Abschnitte: Gebietskarte (`ServiceMapWrapper`, unverändert hinter der Einwilligung), Städte als `Feldraster` mit je einem Link über das ganze Feld, Leistungen als `Merkliste` auf Fliese, „Weitere Orte auf Anfrage“ seitlich mit Telefon- und Beratungsknopf, Anfahrt mit `InteractiveMap` (400 px), `LocationContact` unverändert.
- Abschluss `FinalCTA` unverändert, außerhalb der Leitachse.
- IDs `karte-ueberschrift` und `leistungen-ueberall` bleiben über `titelId` erhalten. Die Anfahrt erhält neu `hauptsitz-heading`.
- Entfernt: Schatten, Verläufe, Glasflächen, Leuchtebenen (`ambient-glow`), rotes Städte-Etikett, Pill-Badges, Hover-Versatz, `bg-neutral-50` am Regionalkontakt (Wert außerhalb des Systems).
- Mikrotexte: keine Änderung. Überschriften, Fließtexte, Knopf- und Linktexte, Etiketten und Lesefolge sind wortgleich.
- Kein großer Moment, keine neue Bewegung, kein `auftritt`.

**GEMEINSAME DATEIEN**
- `_werkstatt/werkzeuge/test-zuordnung.json`: nach dem Eintrag `leistungen/page` ergänzen: `{"muster": "standorte/page", "specs": ["funktion-einwilligung.spec.mjs"]}`. Danach läuft die passende Spec in Prüfstufe A automatisch.
- Sonst keine gemeinsamen Dateien berührt.

**PRÜFUNG UND ERGEBNIS**
- Mechanischer Umbau (`umbau.mjs`, Trockenlauf, dann Schreiben): 7 Icons, 45 Klassenlisten, 0 ZU_PRUEFEN. Danach Aufbau von Hand.
- Textprobe gegen HEAD: kein Textverlust; 10 Überschriften und Etiketten wandern als Props weiter. Entfällt nur `aria-label="Anfahrt und Hauptsitz"`.
- Bezeichner-Probe: 0 offene Namen. Werte-Prüfung: 0 Befunde.
- Prüfstufe A (`pruefe-a.sh E3-BAU-04`): tsc grün (0 Fehler), eslint grün (0 Fehler, 0 Warnungen), Bilder grün (HTTP 200, Konsole 0, Überlauf 0, Überlappung 0), Textvergleich grün (entfernt 0, unerlaubt entfernt 0). Funktionstests ohne Zuordnung übersprungen. Gesamt grün, Exit 0.
- Funktionstest von Hand, `funktion-einwilligung.spec.mjs` gegen 4320, `--workers=1`: 34 bestanden, 0 fehlgeschlagen (2,4 min, Exit 0), mobil und desktop.
- Ausgeliefertes HTML: 13 Stadtlinks `/standorte/<slug>`, `/kontakt` 8×, `/leistungen` 7×, `tel:` 9×; IDs und Überschriften in Reihenfolge; keine Altklassen.

**BILDBELEGE** (Scratchpad `E3-BAU-04`)
- Erstbildschirm: `bilder/standorte/m390.jpg`, `bilder/standorte/d1440.jpg`
- Ganze Seite: `voll/m390-voll.jpg`, `voll/d1440-voll.jpg`

**OFFENE FRAGEN**
1. Einzugsband (großer Moment, E3-ORCH-03): nicht eingebunden. Stelle markiert im Abschnitt „Wählen Sie Ihre Stadt oder Gemeinde“ vor dem Städteraster (Kommentar in der Datei). Bitte Position und Form bestätigen. Zuvor klären: Das Band nutzt die Entfernungen aus `CITIES` (laut `src/config/cities.ts` ab Wetzlar), trägt aber die Überschrift „Firmensitz Aßlar“; Aßlar erscheint dort mit „ca. 5 km“.
2. Bereichsname Anfahrt: Der `aria-label` „Anfahrt und Hauptsitz“ entfällt, der Bereich heißt nun nach seiner H2. Soll der alte Name erhalten bleiben?
3. Städteraster: 13 Felder lassen in der letzten Zeile zwei Flächen in Fugenfarbe leer. Das Bestandsraster hatte die Lücke ebenso. Lassen oder Aßlar über zwei Spalten?
4. Motiv im Einstieg: `wohnen`. Bitte bestätigen oder ersetzen.
