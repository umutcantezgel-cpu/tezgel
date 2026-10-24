**GEÄNDERTE DATEIEN**
- `/home/user/tezgel/_werkstatt/texte/referenzen.md`: 6 Zeilen geändert, 1 Absatz gestrichen.
- Vorher-Kopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-06/vorher.md`
- Notizen: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-06/notizen.md`

**CHECKLISTE**
1. Verständlichkeit für P1: Nicht ganz erreicht. Vorher fünf Hängepunkte, nachher einer. Der verbleibende Punkt ist Beleg 2 (zwei Fachwort-Klammern in einem Satz, siehe OFFENE FRAGEN).
2. Schreibregeln: Erfüllt. `textpruefung.mjs` ist GRÜN.
3. Fakten: Erfüllt. Alle Zahlen und Zusagen haben eine F-Nummer (F-05, F-06, F-08, F-10, F-11, F-12, F-13, F-15, F-17, F-19, F-20). Keine Treffer aus „Nicht verwenden“. Festpreis und Termin bleiben sinngleich, ohne Frist. Offen ist ein Satz ohne eigene F-Nummer (Frage 2).
4. Suchbegriffe: Erfüllt. Titel, Vorspann und Ortszeile enthalten Referenzen, Bewertungen, Fliesenleger, Tezgel, Aßlar, Wetzlar, Mittelhessen, Bäder, Terrassen, Treppen, Großformate und „Bewertungen bei Google“.
5. Seitenformel: Erfüllt. Meta und Abschnitte 1 bis 6 sind vollständig. Es gibt genau einen Hauptknopf in 1 und 6. Die Links `/kontakt`, `/bad`, `/leistungen/wohnen`, `/balkon-terrasse`, `/fliesenreparatur` und `#bewertungen` sind gültig. Die Vorspann hat jetzt zwei Sätze. Doppelt bleibt nur „5,0 Sterne bei Google“ (Vorspann und Kennzeile). Das habe ich bewusst belassen, weil die Kennzeile die Datenzeile mit Stand ist.
6. Glossarklammern: Erfüllt für Großformate, Untergrund, barrierefrei, Abdichtung und DIN 18534. Keine Klammer wiederholt den Satz.
7. Ton: Erfüllt. Sie-Form, wir-Form, keine Ich-Form. „sorgfältig“ ist entfernt.

**WICHTIGSTE ÄNDERUNGEN**
1. Vorspann auf zwei Sätze gekürzt (Seitenformel „ein bis zwei Sätze“). Die Frage ist gestrichen, weil die H1 sie trägt. „Referenzen“ bekommt den Zusatz „also fertige Arbeiten“ für P1.
2. Abschnitt 2, zweiter Absatz gestrichen. Er wiederholte die Vorspann (Fotos und Bewertungen).
3. Bild-Alt bad-einstieg: „WC an der Wand“ entfernt. Das ist in `bildplaetze.md` nicht belegt. Der Alt-Text stimmt jetzt mit dem Bildplatz überein.
4. Bereichslink „Balkon, Terrasse und Treppen“ zu „Balkon und Terrasse“. Das Ziel `/balkon-terrasse` enthält keine Treppen.
5. Schritt 3: „sorgfältig“ zu „Fliese für Fliese“. Das ist ein Werbeadjektiv ohne Beleg; die Formulierung stammt aus dem Erzählbogen K-010.
6. Regler-Unterschrift: „Dieselbe Außentreppe vor und nach der Arbeit.“ wiederholte die H2. Jetzt: „Schieben Sie den Regler hin und her. So sehen Sie den Unterschied.“
7. Stimmen-Satz: „16 Stimmen von Google“ zu „16 Stimmen aus unseren Bewertungen bei Google“. Sonst fragt der Leser, warum neben „27 Bewertungen“ nur 16 stehen. Die Aussage bleibt richtig (`reviews.js`: 16 Einträge, alle Google).

**PRÜFUNG UND ERGEBNIS**
Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/referenzen.md`
```
_werkstatt/texte/referenzen.md · GRÜN · Stücke 34 · Sätze 45 · Flesch 68.8 · Satz Ø 7.3
  ok Titel höchstens 58 Zeichen · Beschreibung 120 bis 155 · kein Satz über 25 Wörter
  ok mittlere Satzlänge höchstens 14 · Flesch ≥ 60 · Absätze höchstens 4 Sätze
  ok keine Gedankenstriche · keine Bindestrichwörter außerhalb K-010-B · keine Floskeln
  ok Fachwort-Kennungen im Glossar · Glossarwort beim ersten Vorkommen als Fachwort
  ok Bild- und Stimmenkennungen bekannt
  Zahlen im Text: 5,0 · 2008 · 2019 · 18534 · 16 · 9,6 · 10 · 25 · 5 · 27 · 2026
```
Vorher war das Ergebnis ebenfalls GRÜN (Flesch 69.2).

`git status` vor und nach der Arbeit weicht bei anderen Dateien ab, weil parallel andere Pakete committen. Ich habe nichts committet, gestasht oder zurückgesetzt. Mein einziger Schreibvorgang ist `referenzen.md`, die Datei ist weiterhin unverfolgt.

**GEMEINSAME DATEIEN** (gemeldet, nicht geändert)
- `_werkstatt/texte/REF-start.md`, Zeile 37: Dieselbe Bezeichnung „Balkon, Terrasse und Treppen“ zeigt auf `/balkon-terrasse`.
- `_werkstatt/regeln/glossar.json` und `src/config/glossar.ts`: Die Erklärung zu DIN 18534 hat nur einen Satz. K-011 hat einen zweiten Satz („So kommt kein Wasser in die Wände.“). `glossar.json` gibt aber 15 Wörter an, was zur Langfassung passt. Das muss abgeglichen werden.
- `src/app/(bestand)/referenzen/page.jsx`, Vorspann: „verifizierten Google-Rezensionen“. Das Wort „verifiziert“ steht nicht in K-015 (F-10).

**OFFENE FRAGEN**
1. Beleg 2 („Seit 2019 ist die Abdichtung nach DIN 18534 bei uns Standard.“) hat zwei Fachwort-Klammern im Satz. Eine Aufteilung in zwei Sätze würde gegen das Beleg-Format „je ein Satz“ verstoßen. Entscheidung bitte beim Orchestrator.
2. Abschnitt 3, Satz 1 („Wir nehmen die alten Fliesen heraus“) und Abschnitt 4 („prüft den Untergrund“, „gehen wir alles gemeinsam durch“) haben keinen eigenen K-015-Punkt. Ich habe sie stehen lassen und aus F-08, F-11 und F-12 abgeleitet. Bitte bestätigen oder streichen.
3. Treppen (`/treppen`) ist nach Änderung 4 nicht mehr verlinkt. Soll ein fünfter Bereichslink ergänzt werden?
4. Die Bestandsseite zeigt einen Abschnitt „Leistungsbeispiele“ mit Platzhalter-Projekten („Projektdokumentationen folgen“). Der Text erwähnt ihn nicht. Soll er aufgenommen werden?

=== ENDE E3-LEKT-06 · BEREIT ZUR RÜCKGABE ===
