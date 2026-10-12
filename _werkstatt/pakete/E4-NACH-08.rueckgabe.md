# E4-NACH-08 · Rückgabe (Baumeister, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/leistungen/page.jsx`
- `src/app/(bestand)/leistungen/[id]/page.jsx`

Sonst nichts. `git status` zeigt für meinen Umfang genau diese zwei Dateien; die übrigen Modifikationen im Baum stammen von anderen Paketen. Kein Commit, kein Push.

## WAS UND WARUM
**/leistungen (Übersicht)**
- Merkmalsliste der Unterpunkte (Befund 19) in Textschrift `font-text text-fs-2 text-tinte`, Fugenkreuz in `text-strich`. Mono bleibt nur bei Maßen, Normen, Zahlen.
- Je Feld eine Aktion: „Fachdetails & Ratgeber“ ist Knopf `neben` mit `transitionTypes={['plan-vor']}` (Seitenwechsel unverändert). „Aufmaß anfragen“ wird Textlink `linkKlassen` (min-h-11) in derselben Zeile. Der Knopf trägt `min-w-0 sm:flex-1`, damit die Zeile auf dem Desktop nicht umbricht.
- Express-Anfrage nachgeladen (`dynamic`, Lade-Text wie Startseite). Alle Abschnitte nach dem Einstieg tragen `spaet`.

**/leistungen/[id]**
- Spezialisierungen: Feldraster mit Fugenkreuz ersetzt durch `Merkliste spalten={2} verband` ohne Nummern (Befund 20).
- Fachkompetenz auf Fläche `fliese`, damit die Folge nach den Spezialisierungen den Flächenwechsel hat.
- Weitere Gewerke: Feldraster, je Feld ein kleiner Verlegeplan (`w-32`, dekorativ) und der Name als einziger Link in einer H3 `font-anzeige text-fs-4 text-tinte` (Befund 20, 22, Linktext). Die einzige H3-Stufe der Seite.
- Region: 13 Kästen ersetzt durch Liste an der Fuge, ab md zwei Spalten (7 + 6 über CSS-Spalten), Ort links, Pfeil rechts, Link ist der Ortsname. Die Waisenzelle entfällt (Befund 20).
- Direktkontakt: Leitsatz unter die Einleitung in die Kopfspalte verlegt, rechte Spalte trägt nur noch die Knöpfe (Befund 20b, Maßstab erlaubt die Verschiebung).
- Express-Anfrage nachgeladen, `spaet` auf allen Abschnitten nach dem Einstieg.

**Unverändert:** Einstieg und Planblatt, Seitenwechsel (`ViewTransition name plan-${id}`, `share`, `transitionTypes`), IDs und Anker (`#express-anfrage`, `#gewerke`), Überschriften, Fließtexte, Daten, Metadaten.

## GEMEINSAME DATEIEN
Nichts geändert. Gewünscht:
- `src/components/kern/Schrittfolge.tsx`: Die Schritt-H3 des Ablaufs auf /leistungen stehen in `font-text`. Für „alle H3 in einer Stufe“ bräuchte die Komponente `font-anzeige text-fs-4 text-tinte` als Standard oder eine Prop. Nicht umgesetzt.

## MIKROTEXT alt → neu
- [id], je Seite drei Mal: Linktext „Gewerk {Name} ansehen“ entfällt, der Name ist der Link (Paketvorgabe).
- neu: „Anfrageformular wird geladen...“ als Lade-Text der nachgeladenen Express-Anfrage (Muster Startseite).
- /leistungen: Knopf- und Linktexte unverändert, nur die Darstellung der zweiten Aktion ändert sich.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A, Endstand (`pruefe-a.sh E4-NACH-08 … -- /leistungen /leistungen/bad /leistungen/untergrund`):
  - Typprüfung GRÜN (0 Fehler in eigenen Dateien, 0 übrige)
  - Lint GRÜN (0 Fehler, 0 Warnungen)
  - Funktionstests GRÜN (116 erwartet, 0 unerwartet, 0 flaky)
  - Bilder GRÜN (HTTP 200, Konsole 0, Überlauf 0, Überlappung 0)
  - Textvergleich ROT, siehe Offene Frage 2
- `werte.mjs`: 0 Befunde (2 Dateien, 157 Klassenvorkommen).
- `textprobe.cjs` gegen HEAD: [id] entfernt nur „Gewerk“ und „ansehen“, hinzu nur der Lade-Text. Übersicht: nur der Lade-Text.
- Sichtprüfung im Dev-Server (4320) bei 390, 768, 1440 px über die ganze Höhe. Keine leere Rasterspalte über 200 px (seitliche Abschnitte haben Inhalt ab lg auf 8 Spalten). Keine zwei gleich gebauten Abschnitte in Folge.
- Kein Build, kein Serverstart, kein Commit.

## BILDBELEGE
Basis: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-08/`
- Vorher: `vorher/bad/{d1440,m390}-voll.jpg`, `vorher/uebersicht/{d1440,m390}-voll.jpg`
- Nachher [id]: `nachher_leistungen_bad/{m390,t768,d1440}-voll.jpg`
- Nachher Übersicht: `nachher2_leistungen/{d1440,m390}-voll.jpg`
- Ausschnitte: `crop/nach_*.jpg`, `crop/nach2_aktionen.jpg`, `crop/mobil_*.jpg`
- Prüfbilder: `bilder/leistungen/`, `bilder/leistungen__bad/`, `bilder/leistungen__untergrund/` (je m390, d1440)

## OFFENE FRAGEN
1. Lesefolge [id] Direktkontakt: Das Zitat steht jetzt vor den Knöpfen (Kopfspalte). Der Maßstab sieht das vor. Bitte bestätigen.
2. Textvergleich ROT: 8 unerlaubt entfernte Spannen, je 4 auf `/leistungen/bad` und `/leistungen/untergrund`. Davon 6× „Gewerk … ansehen“ (Linktext, Paketvorgabe) und 2× die Zitat-Verschiebung aus Frage 1. Das Werkzeug kennt keine Freigabe. Bitte als gewollt bestätigen oder die Regel ergänzen.
3. Der Ansichtspfad `/leistungen/abdichtung` aus dem Paketaufruf ist kein Leistungs-Slug (HTTP 404). Die Prüfung lief deshalb mit `/leistungen/untergrund` (HTTP 200). Im Aufruf bitte korrigieren.
4. Schrittfolge-H3 (siehe Gemeinsame Dateien).
5. Der Fachdetails-Knopf wurde von Textlink auf `neben` angehoben, damit die Rangfolge „eine Aktion je Feld“ klar ist. Bitte bestätigen, falls `haupt` gewünscht ist.
