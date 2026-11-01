# Neue Bilder vom 31.10.2026 · Eingang per WhatsApp

> **Vermerk vom 01.11.2026:** Diese Fotos liegen auf ausdrückliche Anweisung des Auftraggebers (Umut, 01.11.2026) als **Originale im Repo**, damit die SEO-Runde sofort mit ihnen arbeiten kann. Das weicht bewusst von der bisherigen Werkstatt-Praxis ab, Originale nur unter `_eingang/` zu halten (`_werkstatt/ENTSCHEIDUNGEN.md`, BILDQUELLE; `_werkstatt/MENSCHEN.md`, M-01). Bitte **nicht** nach `_eingang/` verschieben, nicht löschen, nicht umbenennen, nicht überschreiben oder zuschneiden und keine Metadaten schreiben. Webfassungen entstehen mit `_werkstatt/werkzeuge/bilder.mjs` in einem Arbeitsordner außerhalb des Repos; nach `public/images/arbeiten/<raum>/` kommt nur die Basisdatei `<raum>/<name>.jpg` (Ablauf in [`docs/seo/KONTEXT.md`](../../../docs/seo/KONTEXT.md), Abschnitt 8). Im Ordner selbst kommen nur neue Dateien hinzu (zum Beispiel `auftrag-seo.json`); gepflegt werden Inventar und `projekte.md`.

## Herkunft

- Quelle: WhatsApp-Bilder von Deniz Tezgel, gespeichert am 31.10.2026 als „WhatsApp Image 2026-10-31 at …jpeg“ (129 Dateien).
- 2 Dateien waren byte-gleiche Doppel und wurden nicht übernommen; sie stehen in `zuordnung.csv` unter `weitere_identische_originale` (bei `nb-003` und `nb-004`).
- Unverändert kopiert: keine Neukodierung, kein Zuschnitt, keine Farbkorrektur. Keine EXIF-, GPS- oder XMP-Daten enthalten (WhatsApp entfernt sie).
- **Einzige Ausnahme `nb-079`:** Oben rechts war ein Straßenschild mit Straßennamen lesbar. Zusammen mit den Nachbarhäusern hätte es die Adresse eines Kunden verraten. Das Schild ist verpixelt, die Datei neu gespeichert (JPEG-Qualität 95). Das unbearbeitete Original liegt nur lokal beim Auftraggeber (Spalte `bearbeitung` in `zuordnung.csv`).
- JPEG, 720 × 960 bis 2048 × 1536 Pixel, 104 Hochformat und 23 Querformat, zusammen etwa 30 MB.
- Die Serie mischt neue Baustellen und ältere Arbeiten (etwa ab `nb-099`, teils mit kleinerer Auflösung bis hinunter zu 720 × 960). Datum und Ort der einzelnen Baustellen sind nicht bekannt.

## Dateien

| Datei | Inhalt |
|---|---|
| `nb-001.jpg` … `nb-127.jpg` | Originale, nummeriert in der Reihenfolge der WhatsApp-Zeitstempel („nb“ = neue Bilder) |
| `zuordnung.csv` | ID, WhatsApp-Dateiname, MD5, Breite, Höhe, KB, Ausrichtung, Helligkeit, Schärfe, dHash, Bearbeitung |
| `bildinventar.csv` | Sichtung je Bild in den Spalten des bestehenden `_werkstatt/bildinventar.csv`, ergänzt um Projekt, Verlegemuster, sichtbare Arbeiten, Datenschutzrisiko, Seitenvorschlag, Alt-Entwurf, Dateinamen-Vorschlag |
| `bildinventar.json` | dieselben Daten mit Listen als Arrays (für Skripte) |
| `projekte.md` | Gruppierung nach Baustellen, Vorher-Nachher-Paare, Lücken der Bildplätze, Top-Auswahl je Zweck |
| `_uebersicht/kontaktbogen-01.jpg` … `-08.jpg` | alle Bilder als Vorschau mit ID, je 16 pro Bogen |

## Kennwerte in `zuordnung.csv`

- `helligkeit`: mittlere Luminanz (Rec. 601) geteilt durch 255.
- `schaerfe`: Standardabweichung des 3 × 3-Laplace-Filters auf Graustufen (lange Kante 1000 px) geteilt durch 255. Nur innerhalb dieser Serie vergleichbar, nicht mit den Werten in `_werkstatt/bildinventar.csv`.
- `dhash`: 64-Bit-Differenz-Hash (9 × 8 Graustufen) zum Finden ähnlicher Bilder; kein Paar lag unter Abstand 12.

## Regeln für die Verwendung

- **Alt-Entwürfe und Dateinamen sind Vorschläge der Sichtung, nicht final.** Prüfen nach den Bildregeln in `_werkstatt/KERN.md` (Alt-Text höchstens 125 Zeichen, beschreibt was zu sehen ist, ohne Striche) und nach dem Konzept in `docs/seo/KONTEXT.md`.
- **Ort unbekannt:** keine Stadt in Alt-Text, Bildunterschrift oder Dateiname, bis Deniz Tezgel den Ort der Baustelle bestätigt. Ein Foto auf einer Ortsseite ist kein Beleg für eine Arbeit in diesem Ort.
- **Datenschutz und Freigaben:** Spalte `datenschutz_risiko` beachten. Personen, Hausnummern, Kennzeichen, Namen und fremde Logos vor der Veröffentlichung wegschneiden; bei `hoch` nur mit Freigabe verwenden. Bei Gewerbeprojekten vorher die Freigabe des Betreibers einholen (Gewerbeanlage P09: `nb-027` bis `nb-029`, `nb-032` bis `nb-037`).
- **Motiv-Entscheidung:** `nb-113` bis `nb-116` sind Mosaikbilder mit historischen und politischen Motiven (osmanische Reiter, Offiziersporträts, türkische Flaggen, Landkarte). `nb-116` trägt die Signatur „POSEIDON MOZAİK ATÖLYESİ“; die Bilder stammen also vermutlich aus einer Mosaikwerkstatt und wurden eingebaut. Nicht als eigene Kunst darstellen. Ob sie öffentlich erscheinen, entscheidet der Inhaber.
- **Wohnspuren:** Viele Bäder sind bewohnt fotografiert (Pflegeprodukte, Kinderbuch, Katzentoilette, Wäsche). Vor der Veröffentlichung wegschneiden; `nb-107` und `nb-121` sind dafür zu voll (`datenschutz_risiko` hoch).
- **Das Repository ist öffentlich.** Mit dem Commit vom 01.11.2026 sind alle 127 Originale über GitHub für jeden sichtbar und bleiben in der Git-Geschichte, auch die Bilder mit Datenschutzrisiko hoch und die Gewerbebilder (Auftrag: alle Bilder in einem Ordner ins Repo). Die Freigaberegeln oben gelten für die Website. Ob das Repo privat wird, entscheidet Umut (`docs/seo/KONTEXT.md`, S7).
