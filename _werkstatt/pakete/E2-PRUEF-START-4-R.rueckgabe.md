VORAB: bestanden. Der Server liefert `src_app_1s6nba_._.css` mit „hyphenate-limit-chars: 12 5 5“. Zwischen 58df170 und dem aktuellen HEAD (9221848) gibt es keine Änderungen an `src/` oder `public/`.

ERGEBNIS JE PRÜFUNG

1. Schrift 200 %, ganz durchgescrollt: teilweise bestanden.
- m390: scrollWidth 390 = innerWidth, kein Element über dem Fenster. Kundenstimmen 32–358 px, Auswahlknöpfe 276 px breit ohne Überschneidung. Telefon: Symbol 81–121 px, Text 137–299 px, im Rahmen 32–358. Lage-Fliesen: Satz 276 px, Fliesen 476–656 px hoch, Bild als Streifen 324 × 192 px. „Was wir tun“: Name bis 278 px, Pfeil 310–358 px. Hauptknopf bei y 956 px (zweiter Bildschirm, Vorspann bei 1425), „vor Ort“ in einer Zeile.
- m360: wie m390, aber 14 Elemente reichen über 360 px (bis 363,2 px), siehe B1. Hauptknopf y 1026 px, vor dem Vorspann (1495 px).

2. Mobilmenü: bestanden (Messwerte).
- 200 % m390: 3 von 5 Hauptpunkten ohne Scrollen vollständig. 200 % m360: 2 von 5. 100 % m360: 5 von 5.
- Hauptknopf im Blattfuß: Text und Pfeil innen, scrollWidth = clientWidth. Anrufen und WhatsApp am Listenende: Text innen. Escape schließt. „Klick daneben“ nicht prüfbar, das Blatt nimmt die volle Breite ein.

3. Untere Leiste 200 % m390: bestanden. „Termin“ als Wort sichtbar (82 px). Anrufen und WhatsApp nur Symbol, Name im aria-label. Felder 80,8 bzw. 129,5 px breit, alle im Bild, nichts überdeckt.

4. Hauptaktion: teilweise bestanden.
- Je Seite eine Beschriftung und ein Ziel: / → #termin, /gibt-es-nicht und /bad → /kontakt.
- Erster Bildschirm auf / bei m390 und t768: Kopf 0, Einstieg Termin 1 und Anrufen 1, Leiste Termin, Anrufen, WhatsApp je 1. Insgesamt Termin 2, Anrufen 2, WhatsApp 1.
- /bad/badanfrage bei m390: keine Leiste, Telefon und Hauptknopf im Kopf unsichtbar (B2).

5. Ablauf-Lot: bestanden. Abweichung 0,5 px bei m390, m430 und t768.

6. Lage-Fliesen: bestanden. m390 100 %: Bild so hoch wie Fliese (0 px Abweichung), eine Spalte. 200 %: Streifen 324 × 192 px. t768: zwei Spalten bei x 33 und 384,5, Abweichung 0 px.

7. Formular: bestanden. Ein form. Name und Telefon sind required. Absendeknopf „Termin vor Ort anfragen“, Hintergrund Tinte. Gewählter Auswahlknopf (aria-pressed=true) hat Fliese als Hintergrund, keine Tinte-Fläche. Nicht abgesendet.

8. Treffflächen: bestanden. / 135 Bedienflächen, /gibt-es-nicht 102, keine unter 44 px oder 24 px. Ausgenommen je ein Fließtext-Link „Coday, Wetzlar“ im Fuß (27,5 px hoch).

9. Querformat 844 × 390: teilweise bestanden. / und /bad: Kopf 49 px plus Leiste 45 px = 24,1 % (Soll ≤ 25 %), kein Element über dem Rand. /bad/badanfrage, /bad/projekt-check, /bad/badplaner: Hauptknopf im Kopf 1,1 px über dem oberen Rand (B3).

10. Orte: bestanden. d1440: zwei Spalten je 539,6 px hoch (Differenz 0), keine Fuge unter der letzten Gruppe. t768: 538,2 px, Differenz 0. m390 200 %: gestapelt, alle 13 Entfernungen in Fliese und Fenster, kein Ortsname getrennt.

11. Termin: bestanden. d1440: Abstand 73 px (Soll ≤ 80). Rufnummer in einer Zeile. m390: Reihenfolge H2, Formular, „Lieber anrufen?“.

12. Laserlinie: bestanden. Erlaubte Bewegung: Solange das Lot den Bildschirm füllt, liegt die Spitze im Bild (d1440 13 von 13, m390 19 von 19). Reduziert: rotes Stück 0 px hoch.

13. Kopf: bestanden. Logo 140,8 px bei allen fünf Breiten. Hauptknopf eine Zeile, zwei Spans, Wortabstand 0,95–0,96 Leerzeichen. scrollWidth = innerWidth.

14. Galerie: bestanden. m390 100 % und 200 %: eine Spalte, Fotos 356 bzw. 324 px breit. d1440: drei Spalten, Fotos 404 px breit. Unterschriften ohne Trennung.

POSITIVPROBEN
Jede Prüfung hat eine. 1: eingefügtes 600-px-Element und Textkasten werden erkannt. 2: 40-px-Knopf meldet „Text nicht innen“, Escape schließt nur bei offenem Blatt. 3: elementFromPoint im Feld liefert den Link. 4: Telefon ab 640 px sichtbar, bei 390 px nicht. 5: 6-px-Verschiebung ergibt 6,5 px. 6: 50-px-Bild ergibt 26,7 px. 7: Tinte-Testelement erkannt. 8: 20-px-Knopf gemeldet. 9: Soll 5 % scheitert (24,1 %), top −10 px gemeldet. 10: Umbruch in 5 Zeilen gemeldet. 11: +100 px ergibt 173 px. 12: scale 1 1 ergibt 8282 px sichtbar. 13: word-spacing 0,5 em ergibt 2,0. 14: hyphens auto meldet Trennung.

BEFUNDE
- B1 (1, m360, 200 %): Rufnummer „06441 / 44 83 567“ im Abschnitt Termin reicht bis 363,2 px, Fenster 360 px. body hat overflow-x: clip, daher kein Scrollen, die letzte Stelle wird um 3,2 px abgeschnitten. Beleg: c1-schrift200.json, c1b-nachmessung.json; Quelle src/components/start/TerminAnfrage.tsx.
- B2 (4): /bad/badanfrage, /bad/projekt-check, /bad/badplaner ohne Leiste zeigen Telefon und Hauptknopf im Kopf erst ab 640 px. Bei 360, 390 und 430 px fehlen beide. Ursache: src/components/common/Header.jsx Zeilen 218 und 233 (sm:inline-flex, max-sm:hidden bei leisteAus). Der Weg führt nur über das Menü. Beleg: c4-hauptaktion.json, c4b-kopf-ohne-leiste.json.
- B3 (9): Auf den drei Seiten ist der Hauptknopf im Kopf 50,3 px hoch in einer 48-px-Zeile, Oberkante −1,1 px. Beleg: c9-querformat.json (gemessen auf /bad/badanfrage; die beiden anderen Seiten nur stichprobenartig).

OFFENE FRAGEN
- /konfigurator ist keine Route (404). src/config/navigation.js:77 führt den Eintrag trotzdem. Die Komponente liegt unter src/components/funnels/FliesenKonfigurator.
- Leiste bei 200 %: Anrufen und WhatsApp zeigen nur Symbole. Das entspricht dem CSS-Kommentar, ist aber kein Soll des Auftrags.
- Das Schild #leiste-schild (96 px) ist leer gemessen. Inhalt bei Einwilligung nicht geprüft.

AUFRÄUMEN (bitte von Hand)
Beim Start war $SCRATCH in der Shell leer. Dadurch entstanden /E2-R4-R/hilfe.mjs, /E2-R4-R/probe0.mjs und das Verzeichnis /E2-R4-R außerhalb der erlaubten Ordner. Das Löschen wurde von der Sicherheitsprüfung abgelehnt und nicht umgangen. Bitte /E2-R4-R entfernen (enthält nur diese zwei Dateien).

Ausgaben und Skripte: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-R/ (c1-schrift200.json bis c14-galerie.json, c1.mjs bis c14.mjs, hilfe.mjs). Im Repo nichts geändert, nichts committet.

=== ENDE E2-R4-R ===
