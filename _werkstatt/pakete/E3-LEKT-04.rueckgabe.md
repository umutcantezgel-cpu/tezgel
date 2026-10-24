GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/texte/fliesen.md` (20 Zeilen entfernt, 20 eingefügt)
- Vorfassung: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-04/vorher.md`
- Diff: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-04/diff.txt`
- Notizen: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-04/notizen.md`

CHECKLISTE
1. Verständlichkeit für P1: 15 Stellen notiert, nach meiner Lesart 0 offen. Eine Grenzstelle bleibt bewusst (siehe OFFENE FRAGEN).
2. Schreibregeln: textpruefung GRÜN.
3. Fakten: Jede Zahl und jeder Ort hat eine F-Nummer (2014 F-15, 2008 F-06, Handwerkskammer F-05, 5,0 / 27 / September 2026 F-10, Aßlar und Hessen F-03, Telefon F-04, kostenfrei F-12, drei Schritte F-11, Ansprechpartner F-13, Staubschutz F-17, Konfigurator F-06). Festpreis-Zusage ohne F-Nummer, siehe OFFENE FRAGEN. Keine Treffer aus „Nicht verwenden“. Keine Zusage verschärft.
4. Suchbegriffe: alle neun Begriffe der Zeile `/fliesen` vorhanden. Fliesenverlegung und Fliesenleger im Titel, Ratgeber in H1 und Beschreibung, Fachwissen, Großformate, Feinsteinzeug, Holzoptik, Verlegetechniken und Hessen im Vorspann.
5. Seitenformel: Abschnitte 1 bis 6 vorhanden. „Termin vor Ort anfragen“ genau einmal in Abschnitt 1 und 6. 12 von 12 Unterseiten verlinkt (ohne konfigurator und festpreisangebot), alle Ziele existieren. „Untergrund prüfen“ war dreimal genannt, jetzt einmal. Abschnitt-2-Überschrift und erster Absatz sagen Ähnliches, bewusst belassen.
6. Glossarklammern: Feinsteinzeug und Großformate (Vorspann), Estrich (Abschnitt 2), Untergrund (Abschnitt 3). Kein Satz danach wiederholt die Erklärung.
7. Ton: Sie-Form, wir-Form, keine Ich-Form, keine Werbewörter, keine neuen Bindestrichwörter.

WICHTIGSTE ÄNDERUNGEN
1. Vorspann: „Material und Format“ wurde „Material und Größe“, Verlegetechniken und Fachwissen stehen jetzt im Vorspann und werden erklärt. Grund: „Format“ ist für P1 unklar, Suchbegriffe fehlten.
2. Meta-Beschreibung (154 Zeichen), Meta-H1 und H1 in Abschnitt 1 mit Ratgeber. Grund: Suchbegriffe Ratgeber, Fachwissen, Verlegetechniken, Hessen.
3. Holzoptik: „bleiben keramisch und pflegeleicht“ wurde „sind aber Fliesen“. Grund: „pflegeleicht“ steht nicht in K-015.
4. Schritt 2: „Festpreisangebot“ wurde „Angebot mit festem Preis“. Grund: Wortungetüm, sinngleich.
5. Untergrund-Prüfung nur noch im Absatz von Abschnitt 3, Schritt 1 sagt „sehen uns den Boden an“. Grund: keine Aussage doppelt.
6. „belastbare Fugen“, „Trittsicherheit“, „Aufbau“, „Belag“ durch Alltagswörter ersetzt. Grund: Verständlichkeit für P1.
7. Drittelverband: „um ein Drittel einer Fliese versetzt“. Großformate: „Fliese“ statt „Platte“, „ebener“ statt „stimmen“. Grund: Bezug und Begriffe.
8. Abschnitt 6: „Schreiben Sie uns“ wurde „Nennen Sie uns“, „Format“ im Hilfssatz wurde „Fliesengröße“. Grund: P1 könnte an einen Brief denken.

PRÜFUNG UND ERGEBNIS
Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art wissen _werkstatt/texte/fliesen.md` (Exit 0)
```
_werkstatt/texte/fliesen.md · GRÜN · Stücke 34 · Sätze 48 · Flesch 64.6 · Satz Ø 10.2
  ok  Titel höchstens 58 Zeichen
  ok  Beschreibung 120 bis 155 Zeichen
  ok  kein Satz über 25 Wörter
  ok  mittlere Satzlänge höchstens 14 Wörter
  ok  Flesch nach Amstad mindestens 50 (wissen)
  ok  Absätze höchstens 4 Sätze
  ok  keine Gedankenstriche
  ok  keine Bindestrichwörter außerhalb der Liste K-010-B
  ok  keine Floskeln K-010-F
  ok  Fachwort-Kennungen im Glossar
  ok  Glossarwort beim ersten Vorkommen als Fachwort
  ok  Bild- und Stimmenkennungen bekannt
  Zahlen im Text (gegen K-015 prüfen): 2014 · 2008 · 5,0 · 5 · 27 · 2026
```
`git status --porcelain` vorher und nachher verglichen: einzige neue Änderung ist `_werkstatt/texte/fliesen.md`. Stimmen (`rabia-oe`), Bilder und `{{COMPANY_DATA…}}` unverändert.

GEMEINSAME DATEIEN
- `_werkstatt/regeln/glossar.json`, Eintrag „grossformat“: nennt „120 × 260 cm“, während K-015 F-20 dies als offen (M-06, 260 oder 278 cm) markiert. Nicht geändert.

OFFENE FRAGEN
1. Die Zusage „Angebot mit festem Preis“ (vorher „Festpreisangebot“) steht in K-015 nur unter „Versprechen mit rechtlicher Bindung“, ohne F-Nummer. Bitte bestätigen, dass Schritt 2 so bleibt.
2. Die Großformat-Erklärung aus dem Glossar (nur über den Baustein `Fachwort` sichtbar) nennt 120 × 260 cm. Bitte M-06 klären.
3. Abschnitt 2, Neubau: „Wir fliesen, wenn der Estrich fertig ist“ bleibt. Soll „trocken genug“ ausdrücklich dastehen?
4. Fugensanierung und Fußbodenheizung haben in K-015 keine eigene F-Nummer. Bitte bestätigen, dass die Leistungen ohne Zusatz genannt werden dürfen.

=== ENDE E3-LEKT-04 · BEREIT ZUR RÜCKGABE ===
