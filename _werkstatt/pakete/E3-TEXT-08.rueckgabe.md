**GEÄNDERTE DATEIEN**
- `/home/user/tezgel/_werkstatt/texte/kontakt.md` (neu)
- Notizen: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-TEXT-08/notizen.md`
- Prüfausgaben: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-TEXT-08/pruefung-2.txt` (letzter Lauf)

**WAS UND WARUM**
Arbeitsseite mit fünf Abschnitten statt sechs, weil die Seite selbst zum Formular führt:
1. Worum es geht: H1 „Nehmen Sie Kontakt auf. Wir kommen für einen Termin zu Ihnen.“. Vorspann mit dem Prüfstein (Badewanne gegen Dusche ohne Stufe). Hauptknopf auf `#termin`. Telefon und WhatsApp im ersten Bildschirm.
2. Formular „Termin vor Ort anfragen“: nur der Satz davor, das Formular bleibt unverändert.
3. Andere Wege: Telefon, Mobil und WhatsApp, E-Mail, Adresse, Einsatzgebiet, Eintragung, Karte hinter Einwilligung, Öffnungszeiten, Bild `kontakt-eingang`.
4. Hilfen: Anfrage in drei Schritten (`#express-anfrage`), Termin im Kalender (`/kontakt#termin-buchen`).
5. Was nach Ihrer Anfrage passiert: drei Schritte wie auf der Startseite, Staubschutz-Satz, fester Ansprechpartner.

Telefon und WhatsApp stehen bewusst in Abschnitt 1 und 3 (K-009, Erstes Bild). Firmendaten sind nur Platzhalter, die Öffnungszeiten stehen als Text (M-03). Kundenstimmen gibt es nicht, weil die Arbeitsseite keine hat. Glossar: einziges Fachwort ist Untergrund in Abschnitt 5.

**FAKTEN**
- Telefon, Mobil und WhatsApp, E-Mail, Adresse: K-015 F-03, F-04 (nur als Platzhalter).
- Seit 2008 bei der Handwerkskammer Wiesbaden eingetragen: F-05, F-06.
- Öffnungszeiten Montag bis Donnerstag 7:30 bis 18 Uhr, Freitag 7:30 bis 17 Uhr, Samstag nach Vereinbarung: F-07. Freitag 17 Uhr wie im Bestand, M-03 offen.
- Einsatzgebiet Aßlar, Wetzlar, Gießen, Herborn, Dillenburg und Orte rundherum: F-09. „Aßlar in Hessen“: F-03.
- Termin vor Ort kostenfrei: F-12. Drei Schritte: F-11. Fester Ansprechpartner, persönlich: F-13. Staubschutz bei bewohnten Räumen, ohne Garantie-Wort: F-17.
- Angebot mit festem Preis: M-07 offen.
- Keine Frist im Text. Die Zusage „Rückruf innerhalb von 24 Stunden“ steht im Formular selbst (HeroContactForm.tsx Zeilen 77 und 108).
- Funktionen (LAGEBILD Abschnitt 3, nicht K-015): F-01 Formular, F-03 Express-Anfrage, F-07 Kalender, F-10 WhatsApp, F-11 Einwilligung, F-12 Karte hinter Einwilligung, F-15 Telefon und E-Mail.
- Zahlen des Prüfers: 2008 (F-06), 7:30, 18, 17 (F-07).

**PRÜFUNG UND ERGEBNIS**
Befehl: `cd /home/user/tezgel && node _werkstatt/werkzeuge/textpruefung.mjs --art arbeit _werkstatt/texte/kontakt.md`, Exit 0.
```
_werkstatt/texte/kontakt.md · GRÜN · Stücke 21 · Sätze 30 · Flesch 72.5 · Satz Ø 9.1
  ok  Titel höchstens 58 Zeichen
  ok  Beschreibung 120 bis 155 Zeichen
  ok  kein Satz über 25 Wörter
  ok  mittlere Satzlänge höchstens 14 Wörter
  ok  Flesch nach Amstad mindestens 60 (arbeit)
  ok  Absätze höchstens 4 Sätze
  ok  keine Gedankenstriche
  ok  keine Bindestrichwörter außerhalb der Liste K-010-B
  ok  keine Floskeln K-010-F
  ok  Fachwort-Kennungen im Glossar
  ok  Glossarwort beim ersten Vorkommen als Fachwort
  ok  Bild- und Stimmenkennungen bekannt
  Zahlen im Text (gegen K-015 prüfen): 06441 / 44 83 567 · 2008 · 7:30 · 18 · 17
```
Titel 54 Zeichen, Beschreibung 146 Zeichen. Grep auf En- und Gedankenstriche ohne Treffer. Selbstprüfung: neu ist nur `_werkstatt/texte/kontakt.md`.

**GEMEINSAME DATEIEN** (nicht von mir geändert)
1. `_werkstatt/regeln/bindestrich-erlaubt.json` und KERN K-010-B, Eintrag: `{"wort": "Express-Anfrage", "grund": "Name der Funktion F-03 (Bedienbeschriftung „Zur Express-Anfrage“)"}`.
2. `src/config/company.js:128-129`: `formattedWeekdays` nennt Freitag bis 18 Uhr, der Tageswert in Zeile 125 sagt 17 Uhr. Außerdem steht „–“ statt „bis“ (K-010). Vorschlag: nach M-03 angleichen.
3. `_werkstatt/bildplaetze.md:63` beschreibt `kontakt-eingang` als Hauseingang. `_werkstatt/bilder/arbeiten-e2.json` zeigt eine Treppe mit dem Alt „Treppenstufen mit beigen Fliesen und hellen Profilkanten“. Mein Text nutzt den Alt aus der JSON.
4. Für den Umbau von `src/app/(bestand)/kontakt/page.jsx`: die Anker `termin`, `express-anfrage` und `termin-buchen` sowie der Kartenplatz hinter der Einwilligung müssen im neuen Aufbau vorhanden sein.

Fehlende Glossarwörter: keine.

**OFFENE FRAGEN**
1. Länge: rund 330 Wörter, unter dem Richtwert von 450. Die Arbeitsseite hat keine Erzählteile und keine Stimmen, ich habe nicht aufgefüllt. Soll eine dritte Hilfe rein, etwa die Fliesenberatung in Wetzlar und Gießen nach Terminvereinbarung (K-015 F-18)?
2. Maßstab Abschnitt 6 passt nicht zur Arbeitsseite. Der Hauptknopf zeigt auf `#termin` statt auf `/kontakt`, wie es die Seitenbesonderheiten verlangen. Bitte bestätigen.
3. M-03: Freitag 17 oder 18 Uhr. Der Text nutzt 17 Uhr.
4. M-07: „Angebot mit festem Preis“ in Schritt 2 bestätigen oder streichen.
5. Der Bestand-Block „Qualitätsversprechen“ (Motto, Staubschutz-Garantie, DIN 18534, Eintragung) ist nicht übernommen. Soll er zurück?

=== ENDE E3-TEXT-08 · BEREIT ZUR RÜCKGABE ===
