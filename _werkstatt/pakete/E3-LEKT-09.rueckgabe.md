GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/texte/blog.md`: 8 Zeilen geändert (Zeilen 6, 7, 15, 21, 31, 42, 45, 52), gemessen mit `diff` gegen `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-09/vorher.md`
- Arbeitsnotiz: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-09/notizen.md`

CHECKLISTE
1. Verständlichkeit für P1: Vorher drei Hänger (Abdichtung-Erklärung im Relativsatz wiederholt, „Werterhalt“, „passende Formate“). Nachher null. Belassen: „(m/w/d)“ im Stellenanzeigen-Anriss, siehe OFFENE FRAGEN 2.
2. Schreibregeln: `textpruefung.mjs` GRÜN. Titel 56 Zeichen, Beschreibung 146, Flesch 63, mittlere Satzlänge 8,6.
3. Fakten: Zahlen 2019, DIN 18534, 2008, 5,0, 27 und „Stand September 2026“ sind in K-015 (F-15, F-06, F-10). Handwerkskammer Wiesbaden (F-05), kostenfreier Termin (F-12), Rückruf ohne Frist, Handwerkerbonus ohne Betrag (F-23 sinngleich). Gestrichen: „Danach bekommen Sie ein Angebot.“ (nicht in K-015). Keine Treffer aus „Nicht verwenden“. Keine Versprechen verschärft. `{Stimme: c-wolf}` unverändert, Firmendaten nur als Platzhalter.
4. Suchbegriffe: Alle E0-Begriffe kommen vor. Titel: Fliesenratgeber, Badsanierung, Abdichtung. H1: Fliesenratgeber, Badsanierung, Fliesenverlegung, Abdichtung. Vorspann: Praxis, Fachbetrieb, Aßlar. Beschreibung: Ratgeber, Praxiswissen, DIN 18534. Zwei Begriffe sind zusammengeschrieben, siehe OFFENE FRAGEN 1.
5. Seitenformel: Abschnitte 1 bis 6 vollständig. Genau ein Hauptknopf „Termin vor Ort anfragen“ in Abschnitt 1 und 6. Alle Links existieren unter `src/app/(bestand)/` (kontakt, faq, bad, fliesen, untergrund-abdichtung). Doppelaussage „ohne Fachbegriffe lernen“ gestrichen.
6. Glossarklammern: Jeder Satz mit Klammer gelesen, eine Wiederholung gestrichen. Erstes Vorkommen aller neun Fachwörter ist als `[[id|Wort]]` ausgezeichnet. Ton: Sie-Form, keine Ich-Form, keine Werbewörter („interessant“ entfernt).

WICHTIGSTE ÄNDERUNGEN
1. Vorspann: Relativsatz „die Ihre Wände trocken hält“ entfernt. Grund: wiederholt die Glossar-Erklärung und hängt für P1.
2. Titel: „DIN 18534“ und Doppelpunkt entfernt, neu „Fliesenratgeber für Badsanierung und Abdichtung | Tezgel“. Grund: Norm ohne Nutzen (K-010).
3. Beschreibung neu, Vorspann um „aus der Praxis unseres Fachbetriebs in Aßlar“ ergänzt. Grund: Suchbegriffe aus E0 fehlten.
4. Abschnitt 2: „Hier finden Sie Antworten, ohne vorher Fachbegriffe lernen zu müssen.“ gekürzt. Grund: doppelt zur Vorspann.
5. Filter „Pflege und Werterhalt“ zu „Pflege und Wert erhalten“. Grund: Alltagssprache.
6. Anriss gaeste-wc-fliesen: „passende Formate“ zu „passende Fliesengrößen“. Grund: Fachjargon.
7. Anriss fliesen-fuer-allergiker: „interessant macht“ zu „in Frage kommen“. Grund: vage, ohne Beleg.
8. Schritt 2: „Danach bekommen Sie ein Angebot.“ gestrichen. Grund: nicht in K-015.

PRÜFUNG UND ERGEBNIS
- `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art wissen _werkstatt/texte/blog.md`, Exit 0:
  `_werkstatt/texte/blog.md · GRÜN · Stücke 37 · Sätze 59 · Flesch 63 · Satz Ø 8.6`, alle 12 Prüfungen „ok“.
  Zahlen im Text: 2019 · 18534 · 2008 · 5,0 · 5 · 27 · 2026.
- Vorher: GRÜN, Flesch 62.7.
- `git status --porcelain`: vor dem Lauf leer. Während des Laufs standen `blog.md` und `kontakt.md` als geändert. Danach hat ein anderer Akteur beide mit Commit 030cc87 („ZWISCHENSTAND der Texte“) committet. Ich habe weder committet noch gepusht. Die Änderung an `kontakt.md` stammt nicht von mir.

GEMEINSAME DATEIEN (nicht geändert)
- `src/app/(bestand)/blog/page.jsx`: Hauptknopf „Projekt unverbindlich anfragen“ statt „Termin vor Ort anfragen“, Vorspann mit Werbewort „wertvollen“. Wird mit E4 ersetzt.
- `src/config/blog.js` (Filter „Alle Artikel“) und `BlogFilter.jsx` (mobil „Alle Themen“) widersprechen sich. Der Text übernimmt „Alle Artikel“.
- `_werkstatt/texte/ueber-uns.md` schreibt „Fliesenleger-Fachbetrieb“ mit Bindestrich. Abgleich nötig.

OFFENE FRAGEN
1. Die E0-Suchbegriffe „Fliesen-Ratgeber“ und „Fliesenleger-Fachbetrieb“ haben Bindestriche, die K-010-B nicht erlaubt. Umgesetzt als „Fliesenratgeber“ und „Fliesenlegerfachbetrieb“. Bitte bestätigen.
2. Anriss fliesenleger-gesucht-geselle-meister: „sucht … als Geselle (m/w/d)“ steht nicht in K-015. Belassen, weil der Artikel zu den 13 gehört. „(m/w/d)“ ist Pflichtangabe einer Stellenanzeige. Bitte bestätigen.
3. Ob ein Angebot Teil des Ablaufs ist, steht nicht in K-015 (F-11 nennt Planung, Material, Ausführung). Bei Bestätigung in K-015 aufnehmen.
4. Anriss fliesen-fuer-allergiker fragt „Können harte Böden Allergikern helfen?“. Das berührt einen Gesundheitsbezug, der nicht in K-015 steht. Bitte bestätigen oder streichen.
5. Der Filtername „Untergrund“ trägt den Glossar-Baustein, sein erstes Vorkommen liegt also im Filter. Bitte entscheiden, ob Fachwort-Klammern in Filterbezeichnungen gewollt sind.

=== ENDE E3-LEKT-09 · BEREIT ZUR RÜCKGABE ===
