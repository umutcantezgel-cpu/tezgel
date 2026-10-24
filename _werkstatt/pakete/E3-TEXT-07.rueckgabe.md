GEÄNDERTE DATEIEN
- Neu: `/home/user/tezgel/_werkstatt/texte/ueber-uns.md`
- Arbeitsnotiz: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-TEXT-07/notizen.md`
- Keine Commits, keine Pushes. Neu in `git status` ist nur `_werkstatt/texte/ueber-uns.md`.

WAS UND WARUM (Aufbau der Seite)
- Meta: Titel 51 Zeichen, Beschreibung 153 Zeichen, H1 „Ihr Fliesenleger aus Aßlar kommt persönlich zu Ihnen.“
- 1 Worum es geht: Vorspann mit Deniz Tezgel, Hauptknopf „Termin vor Ort anfragen“ → /kontakt, Bild ueber-einstieg.
- 2 Ihre Lage: Die Frage „Wer kommt in Ihr Haus?“ und der feste Ansprechpartner.
- 3 Was wir tun: Gründung und Eintragung, Schwerpunkt große Fliesen, Abdichtung, Rutschhemmung, fünf Bereiche mit Links, Fliesenberatung in Wetzlar und Gießen.
- 4 So läuft es ab: drei Schritte, kostenfreier Termin, Angebot mit festem Preis, Staubschutz.
- 5 Beleg: zwei Stimmen per Id, Google-Kennzeile, Motto wörtlich, Großer Moment `karte` mit Einsatzgebiet.
- 6 Nächster Schritt: Rückruf, Hauptknopf, Anrufen, Anschrift.
- Fachwörter mit Auszeichnung: Abdichtung, DIN 18534, Rutschhemmung, bodengleiche Duschen. Fließtext grob 464 Wörter.

FAKTEN (K-015)
- F-02 Inhaber Deniz Tezgel. F-03 Aßlar, Hessen; Anschrift als Platzhalter.
- F-04 Telefon nur als Platzhalter.
- F-05 Handwerkskammer Wiesbaden; Fliesen, Platten, Mosaik.
- F-06 2008 Gründung und Eintragung in Aßlar.
- F-08 Leistungen (Bad, Küche, Wohnräume, Treppen, Naturstein, Balkon, Reparatur).
- F-09 Wetzlar, Gießen, Herborn und Umgebung (Unterschrift karte, Annahme M-04).
- F-10 5,0 von 5 Sternen, 27 Bewertungen, Stand September 2026 (Zahlen 5, 5,0, 27, 2026).
- F-11 drei Schritte. F-12 Termin vor Ort kostenfrei. F-13 fester Ansprechpartner bis zur Abnahme.
- F-15 2014 Schwerpunkt große Fliesen; 2019 DIN 18534 als Standard (Zahlen 2014, 2019, 18534).
- F-17 bewohnte Räume, Staubschutz, besenreine Übergabe.
- F-18 Fliesenberatung in Wetzlar und Gießen nach Terminvereinbarung.
- F-19 Motto wörtlich.
- F-22 Rutschhemmung R10 und R11 je nach Raum (Zahlen 10 und 11).
- Zusagen sinngleich: „Angebot mit festem Preis“ (verbindlicher Festpreis); „Deniz Tezgel ruft Sie zurück“ (Regel bis zur Antwort).
- Stimmen per Id `christian-s` und `ute-t`, Wortlaut nicht abgeschrieben.

PRÜFUNG UND ERGEBNIS
Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/ueber-uns.md` (Exit 0)

```
_werkstatt/texte/ueber-uns.md · GRÜN · Stücke 25 · Sätze 44 · Flesch 72.8 · Satz Ø 9.2
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
  Zahlen im Text (gegen K-015 prüfen): 2008 · 2014 · 2019 · 18534 · 10 · 11 · 5,0 · 5 · 27 · 2026 · 06441 / 44 83 567
```

GEMEINSAME DATEIEN (nur gemeldet, nicht geändert)
1. `regeln/glossar.json`: Eintrag „Handwerkskammer“ fehlt. Vorschlag: id `handwerkskammer`, Erklärung „Die Stelle, bei der sich Handwerksbetriebe offiziell eintragen lassen.“ Danach in Abschnitt 3 als `[[handwerkskammer|Handwerkskammer Wiesbaden]]` auszeichnen. Bis dahin unausgezeichnet, sonst wäre die Kennung ROT.
2. Route `/ausstellung` gibt es nicht (keine Seite, keine Zeile in `adressen-e0.csv`). Der Text verlinkt `/ausstellung/wetzlar` und `/ausstellung/giessen`. Das weicht von der Vorgabe „→ /ausstellung“ ab.
3. Bestand `src/app/(bestand)/ueber-uns/page.jsx` und `src/components/ueber-uns/*`: „Bis zu 12“ (M-05 offen), „Über 15 Jahre Praxiserfahrung“, „Vor-Ort-Aufmaß vereinbaren“, „Aufmaß anfragen“, „Walk-In-Duschen“, „XXL“, „Großprojekte“. In `company.js` und `QualityPromise.jsx`: „Millimetergenau“, „Markenkleber“, „Garantierter Standard“.
4. Werte, Zeitleiste und 8-Punkte-Liste des Bestands haben in der Sechs-Abschnitt-Formel keinen Platz. Entscheidung beim Orchestrator.

OFFENE FRAGEN
1. Titel und Beschreibung nennen „Fliesenleger-Fachbetrieb“ (E0-Suchbegriff). K-015 F-05 sagt „Handwerksbetrieb“. Bitte bestätigen oder ändern.
2. Die Unterschrift zu `karte` stützt sich auf F-09, das als Annahme M-04 markiert ist.
3. LAGEBILD F-12 sieht auf /ueber-uns eine Karte hinter Einwilligung vor. `karte` ist eine Zeichnung. Bitte klären, ob beides erscheint.
4. Bildalt: Die Bildplatz-Tabelle und `arbeiten-e2.json` weichen ab. Übernommen habe ich die Json-Fassung, mit „ein blaues Band“ statt „blaues Dichtband“, weil der Begriff sonst als Glossarlücke gemeldet wird.
5. Die Stimmenauswahl `christian-s` und `ute-t` ist ein Vorschlag.

=== ENDE E3-TEXT-07 · BEREIT ZUR RÜCKGABE ===
