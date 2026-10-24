GEÄNDERTE DATEIEN
- Neu: `/home/user/tezgel/_werkstatt/texte/blog.md` (meine einzige Änderung im Repo; nicht committet, nicht gepusht)
- Arbeitsnotiz außerhalb des Repos: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-TEXT-09/notizen.md`

WAS UND WARUM
1. Kopf: Titel (52 Zeichen) und Beschreibung (136 Zeichen), H1 „Fliesenratgeber für Badsanierung, Fliesenverlegung und Abdichtung“, Vorspann mit Abdichtung als Fachwort, Hauptknopf „Termin vor Ort anfragen“ zu /kontakt, Telefon.
2. Ihre Lage: Die Kundin will eine Wanne gegen eine bodengleiche Dusche tauschen und hat viele Fragen; die Seite beantwortet sie ohne Vorwissen.
3. Was wir tun: acht Filter-Themen mit Kennung (all bis news, Namen mit „und“ statt „&“), danach 13 Artikel-Anrisse in der Reihenfolge der Daten; Artikeltitel nicht im Text.
4. So läuft es ab: drei Schritte, Termin vor Ort kostenfrei, Betreuung durch Deniz Tezgel.
5. Beleg: Foto `start-galerie-1`, Stimme `c-wolf` (Quelle Google), Google-Kennzeile, Sätze zu 2019 und 2008.
6. Nächster Schritt: Rückruf ohne Frist, derselbe Hauptknopf wie in Abschnitt 1, Nebenknopf „Häufige Fragen“ zu /faq, verwandte Seiten.

FAKTEN (jede Zahl und Zusage)
- 2019, Abdichtung nach DIN 18534 als Standard: F-15
- 2008, eingetragen bei der Handwerkskammer Wiesbaden: F-05, F-06
- 5,0 von 5 Sternen, 27 Bewertungen bei Google, Stand September 2026: F-10
- drei Schritte: F-11
- Termin vor Ort kostenfrei: F-12
- persönliche Betreuung von der ersten Skizze an (Ende der Arbeiten statt „Abnahme“ im Text): F-13
- Handwerkerbonus im Anriss ohne Betrag, sinngleich: F-23
- Telefon nur als `{{COMPANY_DATA.contact.phone}}`: F-04
- Rückruf nur als „Deniz Tezgel ruft Sie zurück“, ohne Frist: Versprechen nach K-015
- Zahlen aus den Artikeln (fünf Warnzeichen, fünf Mythen, R9 bis R13) bewusst weggelassen

PRÜFUNG UND ERGEBNIS
Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art wissen _werkstatt/texte/blog.md`

```
_werkstatt/texte/blog.md · GRÜN · Stücke 37 · Sätze 60 · Flesch 62.7 · Satz Ø 8.6
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
  Zahlen im Text (gegen K-015 prüfen): 2019 · 18534 · 2008 · 5,0 · 5 · 27 · 2026
```
Exit 0. Sichtbarer Text etwa 620 Wörter.

GEMEINSAME DATEIEN (nicht geändert, nur Vorschläge)
1. `src/app/(bestand)/blog/page.jsx`: Einstieg-Hauptknopf „Projekt unverbindlich anfragen“ auf „Termin vor Ort anfragen“ (Ziel /kontakt) ändern; „Häufige Fragen“ bleibt als Nebenknopf.
2. `src/components/blog/BlogFilter.jsx`: mobile Schaltfläche „Alle Themen“ auf „Alle Artikel“ ändern (wie `src/config/blog.js` und Seitenleiste).
3. `src/config/blog.js`, nur wenn die Buttons die Alltagssprache übernehmen: „Bad & Dusche“ zu „Bad und Dusche“, „Fliesen & Material“ zu „Fliesen und Material“, „Untergrund & Abdichtung“ zu „Untergrund und Abdichtung“, „Balkon & Terrasse“ zu „Balkon und Terrasse“, „Pflege & Werterhalt“ zu „Pflege und Werterhalt“, „Ratgeber & Kosten“ zu „Ratgeber und Kosten“.
4. `src/config/posts/` (Daten): zwei Beiträge mit `featured: true` (handwerkerbonus-fliesenarbeiten, fliesen-mythen-faktencheck); `useBlogListe.ts` zeigt nur den ersten. Eine Kennzeichnung entfernen oder bewusst lassen.
5. Glossar: keine fehlenden Wörter für diesen Text.

OFFENE FRAGEN
1. Der Suchbegriff „Fliesen-Ratgeber“ (adressen-e0.csv) hat einen Bindestrich, der nicht in K-010-B steht. Der Text schreibt „Fliesenratgeber“ in Titel und H1. Soll der Bindestrich bleiben und K-010-B ergänzt werden?
2. „Untergrund“ ist im Filtername das erste Fachwort. Wird der Name als Schaltfläche gerendert, würde die Erklärung in der Schaltfläche stehen. Erklärung nur im Fließtext, oder Filtername ohne Auszeichnung?
3. Der Beitrag fliesenleger-gesucht-geselle-meister ist eine Stellenanzeige (Kategorie Neuigkeiten). Soll er in der Ratgeber-Übersicht stehen? Der Anriss ist neutral gehalten.
4. Aussagen aus den Artikeln, die nicht in K-015 stehen (Feuchte-Warnzeichen, Hausstaubmilben, Rutschklassen, Balkonschwelle), sind nur als Themen formuliert, nicht als Behauptung. Bitte bestätigen, dass das reicht.

=== ENDE E3-TEXT-09 · BEREIT ZUR RÜCKGABE ===
