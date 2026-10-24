GEÄNDERTE DATEIEN
- Neu: `/home/user/tezgel/_werkstatt/texte/balkon-terrasse.md`. Sonst nichts geändert. Arbeitsnotizen liegen unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-TEXT-05/notizen.md`.
- `git status --porcelain` vorher/nachher: neu ist nur `_werkstatt/texte/balkon-terrasse.md`. Kein Commit, kein Push.

WAS UND WARUM (Aufbau der Seite in sechs Zeilen)
1. Worum es geht: H1 „Ein neuer Belag für Balkon und Terrasse“, Vorspann mit Stelzlager-Fachwort, Hauptknopf „Termin vor Ort anfragen“ zu /kontakt, Anrufen, Bild balkon-einstieg.
2. Ihre Lage: Pfützen und wackelnde Platten als Alltagsbild, drei Unterseiten mit je einem Satz (Balkonsanierung, Terrassenplatten, Stelzlager).
3. Was wir tun: vier Aussagen (Gefälle, Stelzlager, Rutschhemmung, Abdichtung und Untergrund), Absatz zur Prüfung vor Ort, Großer Moment gefaelle-balkon mit Unterschrift „Der Regen läuft vom Balkon ab.“
4. So läuft es ab: drei Schritte im Muster, kostenfreier Termin, Angebot mit festem Preis, fester Ansprechpartner.
5. Beleg: vier Fotos, Einzelbild „So legen wir Platten auf Stelzen“, Stimme hasan-oe (Thema Balkon), Link Alle Arbeiten, Weiterlesen mit den Bestandslinks.
6. Nächster Schritt: „Deniz Tezgel ruft Sie zurück.“, ein Hauptknopf, Anrufen, Nachricht per WhatsApp.

Änderungen zum Bestand: „Aufmaß“ ist nach K-010 zu „Termin vor Ort“ geworden. Der Linktext „Barrierefreier Balkonaustritt“ wurde zu „Balkonaustritt ohne Stufe“, damit kein Fachwort ohne Erklärung steht. Seitentext rund 540 Wörter.

FAKTEN
- F-21: Gefälle mindestens 1,5 bis 2 % (Abschnitt 3).
- F-22: Rutschhemmung R10 oder R11, je nach Raum (Abschnitt 3).
- F-04: Telefon und WhatsApp nur als Firmendaten-Platzhalter (Abschnitt 1 und 6).
- F-08: Balkon und Terrasse, auch auf Stelzlagern; Untergrund und Abdichtung (Vorspann, Abschnitt 3).
- F-11: Planung vor Ort, Material und Fugen, Ausführung und Abnahme (Abschnitt 3 und 4).
- F-12: Termin vor Ort ist kostenfrei (Abschnitt 4).
- F-13: fester Ansprechpartner bis zur Abnahme (Abschnitt 4).
- F-17: besenreine Übergabe (Abschnitt 4).
- F-02: Deniz Tezgel (Abschnitt 4).
- Zusagen: „Angebot mit festem Preis“ (sinngleich Festpreisangebot, K-015) und „Deniz Tezgel ruft Sie zurück“ (K-015, Formulierung für neue Texte).

PRÜFUNG UND ERGEBNIS
Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/balkon-terrasse.md`, Exit 0.
```
_werkstatt/texte/balkon-terrasse.md · GRÜN · Stücke 26 · Sätze 36 · Flesch 70.2 · Satz Ø 7.9
  ok  Titel höchstens 58 Zeichen
  ok  Beschreibung 120 bis 155 Zeichen
  ok  kein Satz über 25 Wörter
  ok  mittlere Satzlänge höchstens 14 Wörter
  ok  Flesch nach Amstad mindestens 60 (erzaehl)
  ok  Absätze höchstens 4 Sätze
  ok  keine Gedankenstriche
  ok  keine Bindestrichwörter außerhalb der Liste K-010-B
  ok  keine Floskeln K-010-F
  ok  Fachwort-Kennungen im Glossar
  ok  Glossarwort beim ersten Vorkommen als Fachwort
  ok  Bild- und Stimmenkennungen bekannt
  Zahlen im Text (gegen K-015 prüfen): 1,5 · 2 · 10 · 11
```
Zahlen: 1,5 und 2 sind F-21, 10 und 11 sind F-22. Die Telefonnummer steht in einer Kontaktzeile und ist nicht in der Zahlenliste, gehört aber zu F-04. Ein früherer Lauf war ROT wegen einer Floskel in der Vorspann und wurde behoben.

GEMEINSAME DATEIEN (nicht geändert, Wünsche an den Orchestrator)
1. Link „Alle Arbeiten ansehen“ nutzt `/referenzen?raum=balkon-und-terrasse` wie im Muster. Im Checkout wurde keine Auswertung des Parameters `raum` gefunden (kein searchParams in src). Entscheiden: Parameter umsetzen oder Link auf `/referenzen` setzen.
2. `src/app/(bestand)/balkon-terrasse/page.jsx`: K-010-Ersetzungen beim Umbau übernehmen. Zeile 33 (Meta-Beschreibung „Vor-Ort-Aufmaß“), Zeile 148 („Aufmaß für Balkon oder Terrasse anfragen“), Zeile 301 („kostenfreies Aufmaß“).
3. Kein fehlendes Glossarwort für diesen Text.

OFFENE FRAGEN
1. Frostzahl „rund 9 %“ und die Zusage „Nur Platten mit geprüfter Frostbeständigkeit kommen ins Freie“: nicht in K-015, daher nicht im Text.
2. Suchbegriffe „frostsichere Keramik“ und „Naturstein“: K-015 nennt Naturstein nur als Leistung (F-08) und hat keinen Beleg für Frostsicherheit. Im Text fehlen beide. Sollen sie rein?
3. Plattenstärke „2 cm starke Platten“ (K-010-Ersetzung): die Zahl hat keine F-Nummer, daher weggelassen. Soll K-015 sie aufnehmen?
4. Splittbett und gebundene Verlegung samt Vergleichstabelle: Splittbett hat kein Glossarwort, daher nicht im Text. Soll das Glossar erweitert werden?
5. Stelzlager „höhenverstellbar“, „Platten einzeln abnehmbar“ und Gefälle-Richtung „vom Gebäude weg“: nicht in K-015, daher weggelassen.
6. Dachterrasse, Dachdecker, Tragwerksplaner, „pflegeleicht“, „schnell entwässernd“, „rutschhemmend auch bei Nässe“: ohne Beleg, daher weggelassen.
7. Linktext „Balkonaustritt ohne Stufe“ statt Bestand „Barrierefreier Balkonaustritt“: bestätigen oder zurücknehmen?

=== ENDE E3-TEXT-05 · BEREIT ZUR RÜCKGABE ===
