# E4-NACH-18 · Rückgabe Prüfer (Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `_werkstatt/werkzeuge/bewegung.mjs` (einzige Werkzeugdatei)
- `_werkstatt/belege/e4-nach/bewegung2/**` (Folgen, `BEWEGUNG2.md`, `anteile.py`, `lotband.py`, `anker-dom-pruefung/`)
- `_werkstatt/pakete/E4-NACH-18.rueckgabe.md`

Keine Projektdateien, kein Commit, kein Serverstart oder -stopp, keine Hilfsprozesse offen.

## WAS UND WARUM
- Auslöser `seite` (Lade-Momente) läuft über `echtzeitLaden()`. Ein Vorlauf misst längste Dauer (Dauer + Verzögerung, nur gerenderte Elemente) und Lage. Danach je Bild eine frische Seite im selben Kontext, Zeitpunkte 0/25/50/75 % sowie 100 % + 150 ms. Ausschnitt nach Lage: Oberkante 80 px unter dem Kopf, mindestens 400 px hoch, Scroll 0 als Grenze. Neue Felder: `ist_ms`, `ist_nach_aufnahme_ms`, `ms_nach_dom`, `scroll_y`, `oberkante_unter_kopf_px`, `pixel.paare`, `sichtbare_bilder`.
- **Abweichung 1 (begründet):** Der Maßstab (Anker Element im DOM, danach t_k warten, CPU 4×) zeigt hier keine Zwischenstände. Alle Bilder stehen bei Animationszeit 1200 ms, Paare 0 %. Umgesetzt: Anker ist der Beginn der Animation, `--cpu 1`, `--zeitlupe 0.1` (CDP-Wiedergabegeschwindigkeit, Zustände identisch). Der Maßstab bleibt mit `--anker dom --cpu 4`.
- **Abweichung 2:** `sichtbar` = Bild mit Nachbarpaar über 0,5 %; Lade-Folge erfüllt bei ≥ 3 von 5.
- Hover (`sig-plan`, Zeitmodus) und Wahl (`verband`) unverändert. Der Zweig `hoch` in `ausschnitt` entfällt.

## GEMEINSAME DATEIEN
Nichts geändert. Gewünscht:
1. `src/app/bewegung.css` (sig-kreuzlinie, Lot): Auf `/` m390 ist das Lot 2516 px hoch, sichtbar sind nur 96 bis 782 px. Es erreicht die Leiste nach etwa 0,33 s. Vorschlag: Lot-Länge auf die sichtbare Höhe begrenzen.
2. `_werkstatt/werkzeuge/tests/`: neue Datei mit den reinen Funktionen `zeitpunkteLade`, `scrollZiel`, `clipFuerAusschnitt`, `sichtbareBilder`. Inhalt besteht in `scratchpad/E4-NACH-18/pruefe-logik.mjs`.

## PRÜFUNG UND ERGEBNIS
- `node --check` grün. Logikprüfung der reinen Funktionen grün (Scratchpad).
- Läufe gegen 4320 (Dev), Ansichten wie im Maßstab. Kurzlauf `/` sig-kreuzlinie m390: Bild 1 (305 ms) Lot bis 776 px, Bild 2 (605 ms) bis zur Leiste, Bilder 3 und 4 im Bild unverändert. Die Erwartung „Bilder 1–3 teilweise“ trifft nur auf die Bilder 1 und 2 zu.
- Lade-Folgen, sichtbar von 5: `/` sig-kreuzlinie m390 4 · d1440 3 · `/bad` sig-plan m390 4 · d1440 0 · `/leistungen/bad` d1440 2 · `/standorte` einzugsband m390 2 · d1440 0. Ab 3 erfüllt: `/` m390, `/` d1440, `/bad` m390. Die übrigen Befunde nennen die Ursache (Linienbreite, Verzögerung, geringer Kontrast).
- Hover `/leistungen` sig-plan d1440: 2 von 5, Zeitmodus, nicht Echtzeit. Wahl `/fliesen` verband d1440: je Folge 5 von 5.
- Gesperrte Anfragen in allen Läufen 0. `git status` zeigt von mir nur `bewegung.mjs` und `bewegung2/`. Fremde Änderungen (u. a. `src/app/(bestand)/fliesen/konfigurator/page.jsx`, `src/components/funnels/FliesenKonfigurator/*`, Belege `konfigurator/`, `tempo-pa/`, `E4-NACH-13-PA.rueckgabe.md`) habe ich nicht berührt.

## BILDBELEGE
`_werkstatt/belege/e4-nach/bewegung2/`: `BEWEGUNG2.md` (Tabelle, Zeitbezug, Auffälligkeiten, Versuche). Je Ordner Bilder, `ergebnis.json` und `kontakt.jpg`. `anker-dom-pruefung/` zeigt den Maßstab (4×, Anker dom: alle Bilder bei 1200 ms, Paare 0 %) und die Abweichung (4×, Anker animation, 0,1×).

## OFFENE FRAGEN
1. Anker und Drosselung: Abweichung 1 akzeptieren oder den Maßstab trotz fehlender Zwischenstände umsetzen?
2. Lot `/` m390 (gemeinsame Datei, Punkt 1): ohne Änderung bleiben die Bilder 3 und 4 gleich.
3. Schwelle 0,5 % je Gesamtbild: Linien und Raster-Versatz erreichen sie oft nicht. Auf Bandmessung je Zone umstellen oder bei den Befunden bleiben?
4. `/` d1440 dauert 1,8 s (Verzögerung 1,2 s + 0,6 s), der Maßstab sagt höchstens 1,6 s. Ändern?
5. Hover-Folgen (`/leistungen` sig-plan): mit Echtzeit-Verfahren prüfen? Dann mit Messung der Zeit.
