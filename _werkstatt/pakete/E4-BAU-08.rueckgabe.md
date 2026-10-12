# Rückgabe E4-BAU-08 · Baumeister · Familie Fliesen (Großformat, Holzoptik)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/grossformat/page.jsx`
- `src/app/(bestand)/fliesen/holzoptik/page.jsx`
- Keine Commits, kein Push. Nur die Schreibrechte wurden genutzt.

## WAS UND WARUM
- Beide Seiten auf KERN-Bausteinen nach dem Muster von `fliesen/page.jsx` und `leistungen/[id]/page.jsx`:
  - Einstieg `art="erzaehl"`: Etikett aus dem bisherigen Eyebrow, H1 mit bisheriger ID, zwei Knöpfe, rechts das Planblatt mit Plan `grossformat` bzw. `wohnen` (`ohneAchse bemassung={false} interaktiv`).
  - Leitachse über alle Abschnitte; `leitachse` und `spaet` je Abschnitt.
  - Kartenraster als `Feldraster`/`Feld`, Merkmalslisten und Ratgeber-Verweise als `Merkliste`, Holzoptik-Pflegetabelle als `Tabelle` (benannter Bereich), Konfigurator mit `Rueckfrage` in der Spalte daneben.
  - Abschlussblock als Abschnitt mit Bestandswortlaut (nicht `FinalCTA`, sonst ginge der Text verloren).
- Konfiguratoren per `next/dynamic` mit Ladehinweis wie in der Referenz.
- Lucide-Icons und Icon-Kacheln entfallen (dekorativ). Fugenkreuz als Marke im Zuschnitt-Absatz. Keine Schatten, Verläufe oder Glows mehr.
- Lesefolge, Überschriften, Links, Knopftexte und IDs sind unverändert. Die IDs der Überschriften stehen jetzt über `titelId`.
- Feldraster mit 3 bzw. 5 Feldern: das letzte Feld füllt die Zeile (`md:col-span-2 lg:col-span-1` bzw. `lg:col-span-2`), keine grauen Restzellen.
- Abweichungen: Keine `merkmale`-Liste im Einstieg, denn der Bestand hat keine Merkmalsliste im Vorspann. Die FAQ bleibt als `details` (siehe OFFENE FRAGEN).

## GEMEINSAME DATEIEN
- Keine Änderung nötig.
- Optional, nur falls gewünscht: `src/components/ui/FAQAccordion.tsx` mit einer Variante ohne die Zusatzzeile „Haben Sie eine Frage …“ (Entscheidung beim Orchestrator).

## PRÜFUNG UND ERGEBNIS
- Textprobe gegen HEAD: keine Textentnahme. Alle ENTFERNT-Einträge (Überschriften, Eyebrows, Tabellenköpfe, IDs) kehren wortgleich als `etikett=`/`titel=`/Array-Werte bzw. über `titelId` zurück. Textvergleich gegen e0: entfernt 0, Ergebnis GRÜN.
- H1 wortgleich: „Großformatfliesen verlegen: fugenarm, planeben, präzise“ und „Fliesen in Holzoptik: Dielenlook mit keramischer Robustheit“.
- `bezeichner.cjs`: keine Befunde. `werte.mjs` (2 Dateien): 0 Befunde.
- Prüfstufe A, Lauf 2 (Kennung E4-BAU-08): Gesamt GRÜN, Exit 0.
  - tsc GRÜN (0 Fehler), eslint GRÜN (0 Fehler, 0 Warnungen).
  - Funktionstests GRÜN (72 erwartet, 0 unerwartet).
  - Bilder GRÜN (HTTP 200, keine Konsolenfehler, kein Überlauf).
  - Textvergleich GRÜN.
- Lauf 1 war ROT durch einen einzelnen unerwarteten Test (`funktion-navigation`, „Blog-Übersicht / Suche“, /blog). Der Test ist nicht Teil meiner Seiten, im Einzellauf grün und im Lauf 2 grün.
- Überlappung: `/fliesen/grossformat` meldet 8 Textkreuzungen (4 mobil, 4 Desktop). Alle liegen in den geschlossenen FAQ-Antworten (`details`). Die Produktion (letzter Commit) meldet dasselbe Muster (6 mobil). Die geschlossenen Antworten sind im Bild nicht gemalt, die Ansicht ist sauber. Keine Korrektur.
- Mengenmessung Feldraster: 390 px und 1440 px, keine Restzellen. Im Formate-Raster bei 1440 px sind die Felder 264 px breit (Kopf seitlich). Lesbar, aber schmal.

## BILDBELEGE
- `scratchpad/E4-BAU-08/bilder/fliesen__grossformat/m390.jpg`, `d1440.jpg`
- `scratchpad/E4-BAU-08/bilder/fliesen__holzoptik/m390.jpg`, `d1440.jpg`
- Ausschnitte: `grid-gf/d1440-1.png` (Formate), `grid-ho/d1440-0.png` (Eigenschaften), `probe/faq-new-d.png` (FAQ)
- Pfade jeweils unter `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/`.

## MIKROTEXT-ÄNDERUNGEN (alt → neu)
- Keine Knopf-, Label-, Alt- oder Zustandstexte geändert.
- Neu: „Anfrageformular wird geladen...“ (Ladehinweis der nachgeladenen Konfiguratoren, Vorgabe des Briefings; im Bestand nicht vorhanden).
- Neu: Tabellenbereich „Pflege im Vergleich zu Echtholz“ (Name und Beschriftung der Tabelle; wortgleich zur Überschrift).
- Neu: Planblatt-Schriftfeld des Kerns mit Blatt („Großformatfliesen verlegen lassen“ bzw. „Fliesen in Holzoptik verlegen“), Verband, Betrieb, Inhaber, Kammer, Betrieb seit (Werte aus `COMPANY_DATA`).

## OFFENE FRAGEN
1. FAQ: Bestand-Aufklapper (`details`) statt `FAQAccordion`. `FAQAccordion` ergänzt „Haben Sie eine Frage zu Ihrem Bauvorhaben?“ mit Telefonlink, also einen neuen Mikrotext. Soll das Kern-Muster mit diesem Zusatztext übernommen werden?
2. Planblatt-Schriftfeld: Die Standardfelder (Blatt, Verband, Betrieb …) sind neue sichtbare Wörter. Bitte bestätigen.
3. Abschlussblock: als Abschnitt mit Bestandswortlaut statt `FinalCTA`. Bitte bestätigen.
4. Der Blog-Test in `funktion-navigation` war einmal rot (Zeitüberschreitung bei der Suche). Das liegt nicht an dieser Änderung, sollte aber beobachtet werden.
