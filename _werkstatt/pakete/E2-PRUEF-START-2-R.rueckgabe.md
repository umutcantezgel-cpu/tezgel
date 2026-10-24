E2-R2-R, Stufe 1 (Prüfer). Messung: Chromium über Playwright, Einwilligung abgelehnt, installSperre aktiv. Repo unverändert (git status leer).

ERGEBNIS JE PRÜFUNG

1. Laserlinie auf / (bestanden, Befund B1)
- d1440 (900 px): 17 Schritte à 600 px, Lot gefüllt in 12. Rote Unterkante in allen 12 zwischen 0 und 900. Farbe rgb(216, 32, 32). Rot im Bild: 14 von 17. Feinlauf 15 px: 471 gefüllte Stellungen, Spanne 105 bis 794 px, 0 Ausreißer.
- m390 (844 px): 21 Schritte, gefüllt 16, alle im Bereich. Farbe ok. Rot im Bild: 17 von 21. Feinlauf: 610 Stellungen, Spanne 102 bis 707 px, 0 Ausreißer.
- reduziert (d1440, m390): kein rotes Stück (Höhe 0) in allen Schritten.

2. Systemschrift 200 % (Breiten bestanden, Hauptknopf nicht, Befund B2)
- m390: Menü-Schalter 270 bis 358 px (Breite 390). Leiste: vier Felder 0 bis 390 px. scrollWidth 390. H1 64 px Schrift, 352 px hoch. Hauptknopf 1423 bis 1613 px bei Höhe 844.
- m360: Menü 240 bis 328 px. Leiste 0 bis 360 px, vier Felder. scrollWidth 360. H1 64 px, 422 px hoch. Hauptknopf 1494 bis 1683 px bei Höhe 740.

3. Mobilmenü 360×740 (bestanden)
- Öffnet. Liste scrollt nicht (scrollHeight 537 = clientHeight 537). Alle fünf Hauptpunkte vollständig im Bild (Oberkanten 89, 183, 276, 346, 417). Escape schließt.

4. Hauptaktion (bestanden für [data-hauptknopf], Befund B3)
- /: vier Knöpfe, alle „Termin vor Ort anfragen“ mit Ziel #termin.
- /gibt-es-nicht (404) und /bad: alle Ziel /kontakt, eine Beschriftung.
- Weitere Hauptform-Knöpfe: / 0, /gibt-es-nicht 0, /bad 4.

5. Fuß (bestanden)
- m390 mit JS: sieben Gruppen mit aria-expanded=false, 79 Links verborgen. Antippen von „Bad“ setzt true, 7 von 7 Links sichtbar. Gruppe „Rechtliches“ hat keinen Schalter und bleibt offen.
- d1440: kein sichtbarer Schalter. 90 von 91 Links sichtbar. Der fehlende Link „Cookie-Einstellungen“ ist mit lg:hidden absichtlich (Footer.jsx Zeile 178).
- m390 ohne JS: 91 von 91 Links sichtbar.
- Fußhöhe m390: zugeklappt 2320 px, nach Öffnen einer Gruppe 2599 px, ohne JS 5449 px (Vergleich 27639b6 rund 5400). d1440: 2025 px.

6. Lage-Fliesen (bestanden)
- m390: sechs Fliesen, Bildbereich gleich Fliesenhöhe (Abweichung 0,0 px). Höhen 122,7 px oder 96 px.
- t768: zwei Spalten (x 33 und 385 px).

7. Formular auf / (bestanden)
- Genau ein form. Name und Telefonnummer mit required. Absendeknopf type=submit „Termin vor Ort anfragen“.
- Gewählter Auswahlknopf (aria-pressed=true) hat background-color rgb(255, 255, 255), auch nach Wechsel der Auswahl. Die Auswahl zeigt sich nur über Tinte-Rand und 1 px Innenring.

8. Treffflächen m390 / (bestanden)
- 35 sichtbare a und button im main, 0 davon unter 44 px in Breite oder Höhe. Fließtext-Links gibt es keine.

9. Querformat 844×390 (bestanden, knapp)
- Kopf 49 px plus Leiste 45 px = 94 px, also 24,1 %. Die beiden überlappen nicht.

10. Kopf (bestanden)
- Bei 1024, 1280, 1366, 1440, 1536 und 1920: kein Überlauf, kein Kopfelement über dem Rand. Kopfhöhe 65 px. Logohöhe 48 px bei 1024, 44 px bei 1280 bis 1920.

11. Startbild m390, wiederkehrend (bestanden, zwei Läufe)
- html.k-startbild und k-bewegung gesetzt. Belag ab der ersten Probe sichtbar. Verborgen ab 1158 ms (Lauf 1) und 1168 ms (Lauf 2) nach Navigationsbeginn, also vor 1,5 s. Siehe B4.

POSITIVPROBEN
- Die absichtlich falschen Sollwerte scheiterten in den Prüfungen 1 bis 4, 6, 7, 9, 10 und 11. Die Schwelle 100 px in Prüfung 8 ergab 31 Treffer, das Werkzeug wirkt.
- Ungültig und nicht gewertet: Prüfung 8 „Fließtext-Links“ (Sollwert gleich Ist), Prüfung 5 „d1440 ein Link verborgen“ (traf den absichtlich versteckten Cookie-Link), Prüfung 11 „sichtbar bis 300 ms“ (Zeitbasis war der Skriptstart), Prüfung 9 Flächenzeile (falsche Vereinigung, die Summe ist gültig).
- Ein erster Lauf der Prüfung 1 mit falscher Ansicht (1280×720) wurde verworfen. Alle Werte stammen aus den korrigierten Läufen.

BEFUNDE
- B1 (Prüfung 1): Die rote Spitze wächst im gefüllten Bereich nicht von oben nach unten, wie der Kommentar in src/app/bewegung.css Zeilen 43 bis 46 sagt. Bei Füllbeginn liegt sie 102 bis 105 px unter der Oberkante. Bei Füllende liegt sie 707 px (m390) bzw. 794 px (d1440) tief, also 137 bzw. 106 px über dem unteren Rand. Das Kriterium „zwischen 0 und innerHeight“ ist erfüllt.
- B2 (Prüfung 2): Bei 200 % liegt der Hauptknopf unter dem ersten Bildschirm (m390 oben 1423 px, m360 1494 px). Bei 100 % liegt er bei 460 px bzw. 454 px.
- B3 (Prüfung 4, /bad): Weitere Hauptform-Knöpfe mit anderem Ziel: „Bad-Projektcheck starten“ führt zu /bad/projekt-check, „Jetzt kostenfrei anrufen“ zu tel:. Dazu kommen die Funnel-Knöpfe „Angebot mit Festpreis anfordern“ und „Weiter zu Schritt 2“ (type=button, ohne Ziel).
- B4 (Prüfung 11): Der Belag ist 0,6 bis 0,8 s sichtbar, dann verborgen. Die Dauer ist dauer-4 = 800 ms (globals.css Zeile 81), nicht 1,5 s.

OFFENE FRAGEN
- Soll die Spitze bei Füllbeginn oben und bei Füllende unten stehen (B1), oder ist der gemessene Verlauf gewollt?
- Gilt B2 als Verstoß gegen „Erstes Bild“ (K-004)?
- Ist „1,5 s“ (B4) ein Höchstwert, den das Ist erfüllt, oder ein Sollzeitpunkt, den es verfehlt?
- Zählen die Funnel-Knöpfe auf /bad als Hauptaktion (Z-11)?
- Die 200-%-Messung nutzt die html-font-size-Näherung aus probelauf.mjs, nicht die echte Systemschrift.

BELEGE
/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr1.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr2.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr3.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr4.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr5.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr6.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr7.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr8.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr9.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr10.json, /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-R/pr11.json. Skripte: t1.mjs bis t11.mjs, t1b.mjs (Feinlauf), t2b.mjs (100-%-Vergleich), im selben Ordner.

=== ENDE E2-R2-R ===
