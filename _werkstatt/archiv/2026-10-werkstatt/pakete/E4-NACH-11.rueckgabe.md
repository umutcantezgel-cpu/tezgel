# E4-NACH-11 · Rückgabe Baumeister · /ueber-uns

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/ueber-uns/page.jsx` (einzige Änderung von mir; `fliesen/page.jsx` und die übrigen M-Einträge im Arbeitsbaum stammen von anderen Paketen)

## WAS UND WARUM
- **Befund 35 (Werte):** Feldraster mit „+“-Fugenkreuz je Feld ersetzt durch `Merkliste spalten={2} verband` (Titel und Text je Wert, ohne Nummern). Die drei Wege darunter bleiben.
- **Befund 36 (Leitachse):** Alle Abschnitte nach dem Einstieg bis vor den Abschluss stehen in `<Leitachse>`. `betrieb` und `werte` tragen `leitachse spaet`. CompanyHistory und QualityPromise nehmen keine Props an und bleiben unverändert; dafür setzt eine lokale Hülle `AchsenAbschnitt` die Marke (Fugenkreuz an der Oberkante auf `ACHSE_LAGE`) und die Tempo-Hülle `spaet-zeichnen`. Die Marke liegt außerhalb der Hülle, damit nichts abgeschnitten wird. FinalCTA bleibt außerhalb.
- **Befund 8 (Sterne):** `Icon name="stern"` → `stern-voll` im Kennwert (fünf gefüllte Sterne).
- **Tempo:** Alle Abschnitte nach dem Einstieg tragen `spaet` bzw. `spaet-zeichnen`. Auf dieser Seite gibt es keinen Anfrageweg, daher nichts nachzuladen.
- **Mikrotexte:** keine Änderung. Die Textprobe meldet nur `name=stern` → `stern-voll` (Icon-Attribut, kein sichtbarer Text).

## GEMEINSAME DATEIEN (nicht geändert)
1. **`src/components/kern/Merkliste.tsx`:** Titel im Halbverband werden als `<p>` gerendert. Im Bestand waren es sechs `<h3>`. Dadurch verliert die Seite sechs Überschriften, und der Textvergleich meldet „Überschriften entfernt“ (ROT). Vorschlag: Prop `titelAls?: 'p' | 'h3'` (Standard `p`), und /ueber-uns setzt `titelAls="h3"`. Ein `role="heading"`-Workaround löst den Textvergleich nicht.
2. Optional: `CompanyHistory.jsx` und `QualityPromise.jsx` nehmen `leitachse`/`spaet` als Props an. Dann entfällt die Hülle `AchsenAbschnitt` in page.jsx.
3. **Fugenband-Lot neben der Leitachse:** `.fugenband-linie` (CompanyHistory, `bewegung.css`) liegt 16 px neben der Leitachse (x 96 und 112 bei 1440; x 4 und 16 bei 390). Beide Linien sind in der Bandpassage grau. Eine Entscheidung des Orchestrators: zusammenlegen oder lassen.

## PRÜFUNG UND ERGEBNIS
- **Prüfstufe A** (`pruefe-a.sh E4-NACH-11`, Bericht `scratchpad/E4-NACH-11/pruefe-a.txt`):
  - Typprüfung GRÜN, 0 Fehler in meiner Datei.
  - Lint GRÜN, 0 Fehler, 0 Warnungen.
  - Funktionstests ÜBERSPRUNGEN, keine Spec zugeordnet.
  - Bilder GRÜN bei 390 und 1440: HTTP 200, Konsole 0, Überlauf 0, Überlappung 0.
  - Textvergleich ROT. Der einzige Grund sind die sechs `h3` → `p` (siehe GEMEINSAME DATEIEN 1). Unerlaubt entfernte Wortspannen: 0.
- `werte.mjs`: 0 Befunde.
- **Befund 37 (Fugenband bei 390):** Bei drei Scrollpositionen (Bandoberkante bei 85 %, 50 %, 15 % der Viewport-Höhe) ist das rote Stück 0, 0 und 280 px hoch. Es wächst also beim Scrollen. Bei 1440 px wächst es ebenfalls (Skala 0 → 0,05 → 0,39).
- **Leitachse und Fugenband-Rot:** Die Seite wurde bei 390 und 1440 über die ganze Scrollhöhe in 60-px-Schritten gemessen. An keiner Position sind beide roten Stücke gleichzeitig sichtbar. Maximal sichtbar: Leitachse 611 px (390) bzw. 458 px (1440), Fugenband 406 px bzw. 444 px. Die Vollseitenaufnahme zeigt beide rot; das ist ein Artefakt der statischen Aufnahme.
- Schreibrechte eingehalten. Keine Commits, kein Build, kein Serverstart. Meine Hilfsprozesse sind beendet.

## BILDBELEGE (`/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-11/`)
- Vollseite vorher/nachher: `vorher/m390-voll.jpg`, `vorher/d1440-voll.jpg`, `nachher/m390-voll.jpg`, `nachher/d1440-voll.jpg`
- Fugenband bei drei Scrollpositionen (Befund 37): `band/m390-f085.jpg`, `band/m390-f05.jpg`, `band/m390-f015.jpg`, `band/d1440-f085.jpg`, `band/d1440-f05.jpg`, `band/d1440-f015.jpg`
- Prüfstufe A: `bilder/ueber-uns/m390.jpg`, `bilder/ueber-uns/d1440.jpg`

## OFFENE FRAGEN
1. Soll die Überschriftenebene der Werte über `titelAls="h3"` in der Merkliste erhalten bleiben (GEMEINSAME DATEIEN 1)?
2. Fugenband-Lot neben der Leitachse: zusammenlegen oder lassen (GEMEINSAME DATEIEN 3)?
3. **Vorschlag, nicht geändert:** Der Leitsatz „Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“ steht auf dieser Seite viermal: Betrieb, Werte (als Wert „Kundenbegeisterung“), Geschichte und Fuß. Fließtext, nur als Vorschlag.
