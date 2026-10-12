# E4-BAU-11 · Rückgabe

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/verlegemuster/page.jsx` (einzige geänderte Datei)
- `_werkstatt/pakete/E4-BAU-11.rueckgabe.md` (diese Rückgabe)

Kein Commit, kein Push.

## WAS UND WARUM
- Umbau nach Referenz `(bestand)/fliesen/page.jsx` und `(bestand)/bad/page.jsx`. Mechanischer Vorlauf mit `umbau.mjs` (Trockenlauf, dann `--schreiben`), danach Struktur von Hand.
- **Einstieg (erzaehl):** Etikett „Gestaltung & Planung“, H1 mit der bisherigen ID `verlegemuster-heading` (auf dem Span in der H1), Vorspann, zwei `Knopf`-Aktionen. Rechts das Planblatt „Fliesen-Verlegemuster“ mit Plan `naturstein` (`ohneAchse`, `bemassung={false}`, `interaktiv`).
- **Leitachse:**
  1. Verband-Umschalter als erster Abschnitt nach dem Einstieg, im Planblatt, begrenzt auf `max-w-md`.
  2. Muster: `Merkliste` mit zwei Spalten, je Muster Skizze, Name, Beschreibung. Chevron-Absatz danach.
  3. Fugenbild: `Feldraster` mit drei Feldern. Die Überschriften und IDs `vm-versatz`, `vm-fugenbreite`, `vm-achsen` bleiben erhalten.
  4. Abschlüsse: `Merkliste` mit einer Spalte, Verweise auf Flur und Innentreppe.
  5. Verschnitt: `Tabelle` auf Fläche Fliese. Zeilenköpfe und Zahlen in Mono.
  6. Ratgeber: `Merkliste` mit zwei Spalten, Verweise auf Bad und Wohnbereich.
  7. Konfigurator: `next/dynamic` mit Ladehinweis, `#konfigurator` erhalten, `Rueckfrage` in vier Spalten.
- Danach `QualityPromise` und der Abschluss auf Tinte mit drei `Knopf`-Varianten „hell“.
- Wrapper mit Umgebungsglanz, Eyebrow-Icons, Icon-Kacheln und Lucide-Importe entfallen. Icons nur noch aus der Icon-Familie (`fliese`, `pfeil-rechts`, `haken`, `telefon`).
- Musterskizzen bleiben als gezeichnete SVG-Schemata, mit Systemfarben statt Hex-Werten.
- Metadaten, Textfolge und Links unverändert.

## MIKROTEXTE ALT → NEU
- Keine Wortlautänderungen.
- Neu: Ladehinweis „Anfrageformular wird geladen...“ (wie in der Referenz).
- Tabellenname = Wortlaut der H2 „Verschnitt je Muster: Richtwerte für die Bestellung“ (Region und sr-only-Caption). Es gibt keinen neuen Wortlaut.

## GEMEINSAME DATEIEN
- Keine Änderungen erforderlich.
- Hinweis: Der Arbeitsbaum enthält Änderungen anderer Stränge, u. a. `src/components/kern/Einstieg.tsx`, `_werkstatt/werkzeuge/test-zuordnung.json` und weitere Fliesen-Seiten. Ich habe sie nicht angefasst. Die Prüfung lief gegen diesen Gesamtstand.

## PRÜFUNG UND ERGEBNIS
- `umbau.mjs`: 79 Klassenlisten, 7 Icons, 5 Elemente entfernt, 0 ZU_PRÜFEN.
- `textprobe.cjs` (gegen HEAD): 22 Texte kehren als Prop wörtlich wieder, 14 kommen hinzu (Props und Ladehinweis).
- Eigener Wortvergleich über JSXText und Stringliterale: 98 Texte aus HEAD, alle wortgleich vorhanden. Nicht gefunden wurden nur Klassennamen und Importe, die bewusst entfallen.
- `bezeichner.cjs modul`: keine Befunde. `werte.mjs`: 0 Befunde.
- `pruefe-a.sh E4-BAU-11`: GRÜN, Exit 0.
  - tsc: 0 Fehler in eigenen Dateien, 0 übrige.
  - eslint: 0 Fehler, 0 Warnungen.
  - Funktionstests: 72 erwartet, 0 unerwartet, 0 flaky.
  - Bilder: HTTP 200, Konsole 0, Überlauf 0, Überlappung 0.
  - Textvergleich: GRÜN, entfernt 0, unerlaubt entfernte Spannen 0. Die Textstufe meldet 242 Seiten mit Abweichung gegen e0. Das betrifft die ganze Website im Arbeitsbaum, nicht nur diese Seite.
- `einzelbild.mjs --voll` (Dev 4320): m390 und d1440 HTTP 200, Konsole 0, Überlauf 0, Überlappung 0.
- Schreibrechte: `git status` zeigt von mir nur die eine Seitendatei. Keine Server gestartet oder gestoppt.

## BILDBELEGE
- Erste Bildschirme: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-BAU-11/bilder/fliesen__verlegemuster/m390.jpg` und `d1440.jpg`.
- Ganzseite: `.../scratchpad/E4-BAU-11/voll/m390-voll.jpg` und `voll/d1440-voll.jpg`.
- Ausschnitte d1440: `.../scratchpad/E4-BAU-11/crop-umschalter-muster.jpg` und `crop-fugen-abschluesse.jpg`.
- Die Ganzseite m390 habe ich nur verkleinert gesichtet. Dort stützt sich die Prüfung auf die Werkzeugwerte.

## OFFENE FRAGEN
1. **Verband-Umschalter:** Das Paket verlangt ihn als ersten Abschnitt nach dem Einstieg. Auf /fliesen steht er im Randblatt des Einstiegs, hier gehört der Rand dem Plan „naturstein“. Umgesetzt im Planblatt mit `max-w-md`. Auf dem Desktop bleibt rechts eine große freie Fläche. Bitte entscheiden, ob so belassen.
2. **Musterskizzen:** Die sechs Schemata bleiben als SVG erhalten. Die Icon-Familie `verband-*` wäre mit maximal 24 px zu klein. Der Verlegeplan kennt nur Kreuz-, Halb- und Drittelverband, Diagonal, Fischgrät und Wilder Verband fehlen dort.
3. **ID-Bezug:** `verlegemuster-heading` steht jetzt auf dem Span in der H1. Das frühere `aria-labelledby` des Hero-Abschnitts entfällt, weil der Einstieg ein `header` ist. Das entspricht der Form auf /fliesen.
4. **Tabelle:** Die Tabellenkomponente legt eine benannte Region an. Sie trägt den Wortlaut der H2 und ist ein neuer Landmark ohne neuen Text.
5. **Skizzenbreite:** Die Skizzen sind mit `w-1/2 lg:w-1/3` schmal. Auf dem Desktop bleibt rechts Leerraum. Feinjustierung optional.

## Nachtrag Orchestrator (Abnahme)
- Offene Frage 1: Der Verband-Umschalter stand als eigene Zeile mit großer leerer Fläche daneben. Orchestrator hat ihn wie auf /fliesen in das Planblatt des Einstiegs verlegt (Schriftfeld ohne Plan: Sitz statt Verband); der Plan „naturstein“ entfällt auf dieser Seite. Prüfstufe A nach der Änderung (E4-BAU-11-NACH, Prüfer): tsc/ESLint 0, Funktionstests 72/0, Bilder ohne Überlauf und Überlappung, Textvergleich 0 unerlaubt entfernt, Werte 0 (`_werkstatt/pakete/E5-BAU-10.pruefung.md`).
- Fragen 2–5: so angenommen (Skizzen als SVG-Schemata in Systemfarben; ID an der H1 wie auf /fliesen; Tabellenbereich mit Wortlaut der Überschrift; Skizzenbreite bleibt).
