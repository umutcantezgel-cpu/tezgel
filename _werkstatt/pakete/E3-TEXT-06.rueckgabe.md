GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/texte/referenzen.md` (neu, nicht committet, nicht gepusht)
- Arbeitsnotizen: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-TEXT-06/notizen.md`
- `git status` vorher und nachher verglichen: neu ist nur `_werkstatt/texte/referenzen.md`. Fremde Einträge habe ich nicht gemeldet.

WAS UND WARUM
1. Worum es geht: H1 „Das sagen unsere Kunden, und so sieht unsere Arbeit aus.“. Die Vorspann nennt Bäder, Terrassen, Treppen, Großformate und 5,0 Sterne bei Google. Ein Hauptknopf „Termin vor Ort anfragen“ führt zu `/kontakt`. Bild `bad-einstieg`.
2. Ihre Lage: Die Leserin will wissen, ob die Arbeit hält. Antwort sind Fotos und Kundenstimmen.
3. Was wir tun: Untergrund und Großformate als Fachwörter, vier Bereiche als Links, barrierefreie Bäder, drei Belege.
4. So läuft es ab: drei Schritte, Termin kostenfrei, Angebot mit festem Preis, fester Ansprechpartner. „besenrein“ ist durch „sauber gefegt“ ersetzt (inhaltlich F-17 unverändert).
5. Beleg: Galerie mit fünf Raumfiltern, Vorher-Nachher-Regler mit Beschriftungen und Unterschrift, zwei Stimmen (`ute-t` Bad, `hasan-oe` Balkon), Bewertungsmaß, Motto.
6. Nächster Schritt: ein Hauptknopf zu `/kontakt`, dazu Anrufen und WhatsApp. „Deniz Tezgel ruft Sie zurück“, ohne Frist.

Meta: Titel 54 Zeichen, Beschreibung 133 Zeichen. Seitentext etwa 500 Wörter.

FAKTEN
- 5,0; 5 Sterne; 27 Bewertungen bei Google; Stand September 2026: F-10
- 16 Stimmen; 9,6 von 10 bei 25 Bewertungen (Trustlocal): F-10
- Seit 2008 bei der Handwerkskammer Wiesbaden: F-05, F-06
- Seit 2019 Abdichtung nach DIN 18534 als Standard: F-15
- Telefon über COMPANY_DATA: F-04; WhatsApp: F-10
- Termin vor Ort kostenfrei: F-12; drei Schritte: F-11; fester Ansprechpartner: F-13
- Angebot mit festem Preis: M-07 (sinngleich); Staubschutz und Übergabe: F-17
- Barrierefreie Bäder, Dusche ohne Stufe: F-08
- Großformate (Glossar): F-20, Vorbehalt M-06
- Aßlar und Wetzlar: F-03, F-09; Inhaber Deniz Tezgel: F-02; Motto: F-19
- Ohne K-015-Eintrag: „Mittelhessen“ (Oberbegriff zu F-09) und „Fotos unserer Arbeit“ (nur über M-08)
- Nicht übernommen: „verifizierte Google-Rezensionen“, Öffnungszeiten (F-07, M-03), Mitarbeiterzahl, „100 % unverbindlich“, Rückruf-Frist

PRÜFUNG UND ERGEBNIS
Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/referenzen.md` (Exit 0)
```
_werkstatt/texte/referenzen.md · GRÜN · Stücke 35 · Sätze 47 · Flesch 69.2 · Satz Ø 7.3
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
  Zahlen im Text (gegen K-015 prüfen): 5,0 · 2008 · 2019 · 18534 · 16 · 9,6 · 10 · 25 · 5 · 27 · 2026
```

GEMEINSAME DATEIEN
1. `_werkstatt/bilder/arbeiten-e2.json`: Kennungen `ref-vorher` und `ref-nachher` fehlen. E3-BILD-01 muss sie eintragen. Der Text setzt dafür bewusst keine {Bild}-Kennung.
2. `_werkstatt/bilder/arbeiten-e2.json`: Der Filter „So arbeiten wir“ hat kein passendes raum-Feld. Die Zuordnung legt der Bau fest.
3. Fehlende Glossarwörter: keine.
4. `_werkstatt/regeln/glossar.json` (K-011, Eintrag Großformat): Die Erklärung nennt „120 × 260 cm“, F-20 steht aber mit offener Annahme M-06 (260 oder 278 cm). Vor Freigabe klären.

OFFENE FRAGEN
1. M-08: „Fotos unserer Arbeit“ (Abschnitt 2, Galerie) hängt an der Annahme zur Herkunft der Fotos. Bestätigen?
2. Die Unterschrift „Dieselbe Außentreppe vor und nach der Arbeit“ stammt aus `bildplaetze.md`, nicht aus K-015. Bestätigen?
3. „Mittelhessen“ im Ort-Satz hat keinen K-015-Eintrag. Behalten oder streichen?
4. Die sechs Leistungsbeispiele (Platzhalter aus `projects.js`, Links auf `/referenzen/[id]`) kommen im Text nicht vor. Aufnehmen oder weglassen?
5. Ersetzt Abschnitt 6 den Bestands-Abschluss FinalCTA?
6. Die Filternamen der Bewertungen stehen im Code und nicht im Auftrag. Der Text nennt nur „das Bad“.
7. Ein Filter „Alle“ fehlt, weil der Auftrag genau fünf Räume nennt. Ergänzen?
8. In Abschnitt 3 trägt ein Satz zwei Fachwort-Klammern (Abdichtung und DIN 18534). Lektorat: lesbar genug?

=== ENDE E3-TEXT-06 · BEREIT ZUR RÜCKGABE ===
