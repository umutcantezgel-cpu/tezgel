ERGEBNIS JE PRÜFUNG

1. Systemschrift 200 % auf /: NICHT BESTANDEN. m390: scrollWidth 390 = innerWidth, aber 1 Element über der Fensterkante ("ca. 45 km", rechts 391), Lage-Pfeil Kachel 4 rechts 363 > Kachel 357, Telefonlink Termin rechts 363 > Rand 358. m360: scrollWidth 360 = innerWidth, 22 Elemente über der Fensterkante (7 Entfernungsangaben bis 390 px, Terminblock 331 px statt 296, Lage-Pfeil 323–363), 8 Textknoten, Lage-Pfeile Kachel 1 (bis 347) und 4 (bis 363) über Kachelkante 327. Bestanden: Kundenstimmen im Rahmen; Auswahlknöpfe ohne Überlappung (260/230 px breit); Telefonknopf Einstieg mit Symbol und Nummer im Rahmen; Lage-Satz 196–234 px (m390), 166–234 px (m360); Kachelhöhen 496–736 px; Pfeile „Was wir tun“ im Rahmen; „vor Ort“ in einer Zeile; Hauptknopf vor dem Vorspann, im zweiten Bildschirm (m390 y 956, m360 y 1026).
2. Mobilmenü: BESTANDEN. m390 200 %: Anrufen und WhatsApp vollständig im Knopf; 1 von 5 Bereichen ohne Scrollen ganz sichtbar (Scrollbereich 330 px, Inhalt 1333 px). m360 100 %: 5 von 5 ohne Scrollen, Fuß bis 740 px. Escape schließt in beiden.
3. Untere Leiste 200 % (m390): NICHT BESTANDEN. Keines der drei Felder zeigt ein Wort, „Termin“ nur Symbol (Wortbreite 1 px). Alle drei ganz im Bild (je 97 × 96 px). Bei 100 % sind alle drei Wörter sichtbar.
4. Hauptaktion: BESTANDEN. / → #termin, /gibt-es-nicht und /bad → /kontakt, je Seite eine Beschriftung. Erster Bildschirm m390 und t768: Termin 2 Flächen (Einstieg, Leiste), Anrufen 2, WhatsApp 1 (Leiste), Kopf 0. /badanfrage m390: keine Leiste, Telefon (y 392) und Hauptknopf (y 270) im Kopf sichtbar.
5. Ablauf: BESTANDEN. Abweichung Schrittlinie gegen Lot: m390 0,5 px, m430 0,5 px, t768 0,5 px.
6. Lage-Fliesen: BESTANDEN. m390 100 %: Bildhöhe = Kachelhöhe (0 px), Bildbreite 89 px. t768 100 %: zwei Spalten, Abweichung 0 px. m390 200 %: Streifen, Breite 324 = Kachel, Höhe 192 px.
7. Formular: BESTANDEN. Ein form (in main), Name und Telefon required, Absendeknopf „Termin vor Ort anfragen“, gewählter Knopf „Badsanierung“ mit weißem Hintergrund, nur Innenring in Tinte.
8. Treffflächen: NICHT BESTANDEN. / (51 Elemente) und /gibt-es-nicht (21): je drei Fuß-Links 23,3 px hoch („Fliesenverlegung Tezgel telefonisch anrufen“, „Mobil und WhatsApp: 0172 / 67 28 504“, „E-Mail an Fliesenverlegung Tezgel senden“). Keine unter 24 px Breite.
9. Querformat 844 × 390: BESTANDEN. Kopf 49 px + Leiste 45 px = 24,1 %. Kein Kopfelement mit y < 0.
10. Orte: BESTANDEN. d1440: Spalten 539,6 / 539,6 px, Lücke 0 / 0. t768: 538,2 / 538,2 px, Lücke 0 / 0.
11. Termin: BESTANDEN. d1440: Abstand Einleitung–„Lieber anrufen?“ 73 px (Soll ≤ 80), Rufnummer in einer Zeile. m390: Reihenfolge H2 (8408) → Formular (8710) → „Lieber anrufen?“ (9621), Rufnummer in einer Zeile.
12. Laserlinie: BESTANDEN. In allen Schritten mit gefülltem Bildschirm (d1440: 13, m390: 16) liegt die rote Unterkante im Bild (d1440 105–773 px, m390 102–698 px). reduce, d1440: kein rotes Stück (Höhe 0).

POSITIVPROBEN
- 1: falsches Soll scheitert; eingehängtes 600-px-Element und überlaufender Text im Box-Element werden in beiden Breiten gefunden.
- 2: falsche Textlage scheitert.
- 3: falsche Anzahl Wortfelder (Soll 3, Ist 0) scheitert.
- 4: falsche Anzahl Termin-Flächen scheitert.
- 5: Lot um 12 px verschoben, Abweichung 11,5 px erkannt.
- 6: Bild auf 40 px gesetzt, Abweichung 27 px erkannt.
- 7: dunkler Hintergrund am gewählten Knopf (Leuchtdichte 0,008) erkannt.
- 8: eingesetzter 20-px-Link erkannt.
- 9: Anteil gegen Soll 10 % scheitert (Ist 24,1).
- 10: Spalte ohne Füllen, Lücke 157,8 px erkannt.
- 11: falsche Reihenfolge und falscher Abstand scheitern.
- 12: rotes Stück um 2000 px verschoben, 5 von 8 gefüllten Schritten außerhalb erkannt.

BEFUNDE (mit Beleg)
- B1 (hoch, Prüfung 1): Überlauf wird abgeschnitten, nicht gerollt. Ursache: `overflow-x: clip` auf body > main und body > footer, /home/user/tezgel/src/app/globals.css:200–212. Deshalb besteht scrollWidth ≤ innerWidth, obwohl Inhalt fehlt. Betroffen sind die Entfernungsangaben in den Orten (/home/user/tezgel/src/components/start/StartBeleg.tsx:123–146). Belege: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-R/bilder/m360-orte-gruppe.png und .../pr1.json.
- B2 (mittel): Lage-Pfeile verlassen die Kachel bei 200 % (m360 Kacheln 1 und 4, m390 Kachel 4). Bei m360 ist der Pfeil der Kachel 4 nicht im Bild (.../bilder/m360-lage-kachel4.png). Quelle: /home/user/tezgel/src/components/start/Lagefliesen.tsx. Ursache offen.
- B3 (mittel): Terminblock bei 200 % 331 px breit (Inhalt 296 px bei m360). Die Rufnummer endet bei 363 px, also 3 px über dem Fenster (.../bilder/m360-termin-unterkopf.png). Ursache wahrscheinlich die nowrap-Spans in /home/user/tezgel/src/components/kern/Rufnummer.tsx.
- B4 (hoch, Prüfung 3): Im ausgelieferten CSS fehlt die Einschränkung `a:not([data-hauptknopf])` der Regel `.leiste-text` und die Regel `[data-hauptknopf]{flex-grow:2}`. Quelle globals.css:405–417. Beleg: .../bilder/m390-200-leiste.png.
- B5 (mittel, Prüfung 8): Drei Fuß-Links unter 44 px Höhe (Footer.jsx:88–118).
- B6 (Info): Im ersten Bildschirm erscheinen Termin und Anrufen doppelt (Einstieg und Leiste). /gibt-es-nicht d1440 hat zwei Hauptknöpfe im Kopfbereich (y 7 und 325). Beleg: .../scratchpad/E2-R3-R/pr4.json.
- B7 (Info): Das Menü braucht bei 200 % Scrollen (Prüfung 2).

OFFENE FRAGEN
- Soll das Menü bei 200 % ohne Scrollen passen? Die Vorgabe nennt nur 360 × 740.
- Sind zwei Termin- und Anruf-Flächen im ersten Bildschirm (Einstieg und Leiste) gewollt?
- Die Laser-Spitze wandert von 105 px auf 773 px (d1440), nicht vom oberen zum unteren Rand wie der Kommentar in /home/user/tezgel/src/app/bewegung.css beschreibt. Ist das gewollt?
- „Badsanierung“ in „Was wir tun“ reicht bis 287 px, die Pfeilbox beginnt bei 280 px (m360 200 %). Visuell kein Zusammenstoß (.../bilder/m360-was-wir-tun-1.png). Zählt das als Befund?

Werkzeuge und Messskripte liegen unter .../scratchpad/E2-R3-R/ (rahmen.mjs, pr1.mjs bis pr9.mjs). Repo unverändert, git status sauber.

=== ENDE E2-R3-R ===
