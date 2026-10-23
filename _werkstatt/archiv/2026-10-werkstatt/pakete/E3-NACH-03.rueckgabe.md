# E3-NACH-03 · Rückgabe Baumeister

## GEÄNDERTE DATEIEN
src/components/reviews/ReviewCard.tsx · src/components/reviews/ReviewCarousel.tsx · src/components/start/Fachgewerke.tsx · src/components/forms/HeroContactForm.tsx. Rückgabe: _werkstatt/pakete/E3-NACH-03.rueckgabe.md. Die Dateien stehen im Orchestrator-Zwischenstand ddd17b3; ich habe nichts committet oder gepusht.

## WAS UND WARUM
- Befund 4: ReviewCard mit `mitAnriss` (Standard true; ohne Anriss gleicher Text ohne mark). ReviewCarousel übergibt `mitAnriss={idx === erste - 1}`. Bei 1440 px vorher 3 sichtbare Anrisse, nachher 1; nach „Nächste“ wieder 1 (Zähler 1 von 16 → 2 von 16).
- Befund 9: unter md Vignetten der Nebenfelder aus (`hidden md:flex`), Bad bleibt. Merkmale je Feld in `<details>`/`<summary>` „Leistungsumfang“ (Plus/Minus per group-open); ab md zweite Liste `hidden md:grid`. Doppelung nötig, weil geschlossene Aufklapper per CSS nicht zuverlässig öffnen. Kein Text entfernt.
- Raster-Höhe: 390 px vorher 3137 px (3,72 Bildschirmhöhen), nachher 1724 px (2,04); 768 px 2059 px und 1440 px 1285 px unverändert.
- Befund 13: Projektnotiz bei 390 px vorher 349 px Text in 274 px Breite (abgeschnitten), nachher 264 px. Andere Platzhalter passen (121–204 px), unverändert.
- Mikrotexte alt → neu: Platzhalter #hero-notes „z. B. ca. 15 m² Fliesen, Altbau, Walk-In Dusche“ → „z. B. 15 m², Altbau, Walk-In Dusche“. Neu: Aufklapper „Leistungsumfang“ (Paketvorgabe). Keine Überschrift oder Fließtext geändert.

## GEMEINSAME DATEIEN
1. `_werkstatt/texte-erlaubt.json` (nur bei Zulassung, siehe Frage 3): `{"seite": "*", "teil": "main_zeilen", "alt": "XXL", "vermerk": "E3-NACH-03: XXL-Zeile im Großformat-Kopf entfällt"}`
2. `_werkstatt/ENTSCHEIDUNGEN.md`: Platzhalter-Mikrotext und „Leistungsumfang“ protokollieren.
3. `_werkstatt/werkzeuge/test-zuordnung.json`: keine Zuordnung für `start/Fachgewerke`. Vorschlag: `start/Fachgewerke` → `funktion-navigation.spec.mjs`.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A (`-- /`): tsc GRÜN, eslint GRÜN (0/0), Funktionstests GRÜN (47 erwartet, 0 unerwartet), Bilder GRÜN. Texte ROT, Exit 1.
- Texte ROT wegen einer entfernten Zeile „XXL“ (Großformat-Kopf der Startseite, nicht meine Datei). 170 Zugaben sind gate-neutral.
- werte.mjs: 0 Befunde. bewegung.mjs register: 0 unbekannte Kennungen.
- Erster Aufruf vor den Änderungen (ohne Nur-Specs-Schalter): ein roter Test „Teilen-Menü“ (Blog) in funktion-navigation; im offiziellen Lauf grün. Ursache offen, nicht meine Dateien.
- Aufklapper per Klick, Enter und Leertaste geprüft; Browserläufe mit installSperre.

## BILDBELEGE (scratchpad/E3-NACH-03/)
- Prüfstufe A: bilder/start/m390.jpg, bilder/start/d1440.jpg
- vorher: messung/vorher/fachgewerke-m390.png, kundenstimmen-d1440-1.png, formular-m390.png
- nachher: messung/nachher/fachgewerke-m390.png, fachgewerke-t768.png, kundenstimmen-d1440-1.png, kundenstimmen-d1440-2.png, formular-m390.png

## OFFENE FRAGEN
1. Befund 9: Zielwert (ca. 1,3 Bildschirmhöhen) nicht erreicht (2,04). Das Paket nennt 2,5 als Ausgangswert, gemessen wurden 3,72. Hebel, nicht umgesetzt: Bad-Vignette unter md aus (−285 px), Fuß des Bad-Felds (142 px) verdichten, py-6 → py-4 unter md. Grobe Schätzung danach ca. 1,5.
2. Aufklappen ohne Höhenanimation (nativ `details`); Register `aufklappen` nicht genutzt. Eine Animation bräuchte ein Client-Akkordeon.
3. „XXL“ fehlt, weil `src/components/start/Grossformat.tsx` in 17297d0 (anderes Paket) geändert wurde. Zulassen oder Quelle korrigieren?
4. funktion-hero-kontakt enthält den Test „echte Route“, der eine echte POST an /api/anfrage schickt (Mock-Modus). Er lief in meinem ersten Aufruf und im offiziellen Lauf. Bitte bestätigen.
5. Das Kriterium scrollWidth ≤ clientWidth sagt bei Eingabefeldern nichts (306 = 306, auch bei abgeschnittenem Text). Gemessen habe ich Textbreite gegen nutzbare Breite (Canvas).
6. BookingCalendar.tsx und Einzugsband.tsx sind von anderen Agenten geändert; nicht angefasst.
