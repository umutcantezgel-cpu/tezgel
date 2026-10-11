# Lehren aus P3 (Kandidat-Tor `/`) · Pflicht für alle Kern-Pakete ab P4

Jede Regel unten hat im Tor von `/` mindestens eine Runde gekostet. Halte sie beim Bauen ein, nicht erst beim Prüfen.

1. **Wahrheit (Rang 1):** Keine Prüf- oder Qualitätsbehauptung ohne Beleg, also kein „verifiziert“, „zertifiziert“, „Meister“, „#1“ oder Superlativ.
   - Steht so etwas im Bestand, übernimm es nicht. Trage stattdessen eine Zeile in `MIKROTEXTE.md` vor (Klasse 4, als Vorschlag in deiner Rückgabe), sonst bleibt es wörtlich.
   - Häkchen oder Siegel neben Namen nur, wenn die Sache belegt ist.
2. **Texteinheiten:** Jeder eigenständige Text (Name, Etikett, Zahl mit Einheit) steht in einem eigenen Element.
   - Zwei Inline-Spans ohne Trenner verschmelzen in den Text-Invarianten, z. B. „Elke S. Google Rezension“, und gelten dann als entfernt.
   - Im Flex- oder Grid-Behälter Blockelemente verwenden (`div`) oder ein Trennzeichen mit `aria-hidden` setzen.
3. **Ohne JavaScript lesbar:** Kein `<Suspense>` um statisch vorgerenderten Inhalt; Next legt ihn in `<div hidden>` und zeigt ihn erst per Skript. Bedienelemente, die ohne JS gehen können (Popover, `details`), nutzen die nativen Mittel.
4. **Fokus:**
   - Der Ring sitzt am fokussierten Element selbst, 2 px, mindestens 3:1, mit Abstand.
   - Er darf nicht abgeschnitten werden: weder durch `overflow` noch durch Nachbarn in Flex-Reihen (dort `focus-visible:relative focus-visible:z-10`) noch durch den Bildrand bei klebendem Kopf (dort innerer Ring).
   - Native, per `appearance-none` gezeichnete Kästchen tragen den Ring selbst.
5. **forced-colors:** Jedes Bedienelement nur aus Symbol (Logo-Link, Chevron, Telefon-Symbol, Menü-Schalter) bekommt `forced-colors:border`.
6. **Reflow 320 und Textabstände:** Lange Einzelwörter, besonders in Mono („Festpreisgarantie“, „Verbundabdichtung“), sprengen schmale Zellen. Darum `min-w-0` an Rasterkindern und `wrap-break-word hyphens-auto` an den Texten. Bei 320 px darf nichts breiter werden.
7. **Tab-Folge = Lesefolge:**
   - Kein Rücksprung über mehr als eine Bildschirmhöhe, also nicht links lange Spalte, rechts Formular.
   - Wichtige Felder stehen früh im DOM.
   - Das erste Formularfeld steht am Desktop (1440 × 900) möglichst im ersten Bildschirm.
8. **Leistung (INP/TBT):**
   - Keine `:has()`-Varianten mit `open`, `popover-open` oder `focus` auf großen Bäumen (`has-open:`, `group-has-open/*:`). Sie erzwingen Stil-Neuberechnung bei jedem Öffnen.
   - Große Blätter: zugeklappten Inhalt nicht rendern lassen (`content-visibility` über `data-motion="aufklappen"` macht das zentral).
   - Teure Kinder per `memo` mit stabilen Rückrufen.
9. **Verdecken:**
   - Feste Ebenen (WhatsApp-Kanal, Banner, Leiste) verdecken kein Bedienelement.
   - Der Kanal weicht allem aus, was `FREIHALTEN` trifft; eigene Hauptaktionen markierst du mit `data-hauptaktion`.
   - Im ersten Bildschirm muss trotz Banner ein vollständiger Anfrageweg frei sein (E-013 Nachtrag).
10. **Tests:** Jede Funktion wird in Kern **und** Bestand geprüft. Die Fassung je Seite kommt aus `KERN_SEITEN` in `_relaunch/werkzeuge/tests/fixtures.mjs`, nie aus DOM oder Laufzeitverhalten.
11. **Mikrotexte:**
    - Was nicht in `MIKROTEXTE.md` steht, bleibt wörtlich; das gilt auch für Ziffern in Legenden wie „1. …“.
    - Brauchst du eine Änderung, schlage sie in der Rückgabe als Zeile im Tabellenformat von `MIKROTEXTE.md` vor. Der Orchestrator trägt sie ein.
