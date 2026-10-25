# E3-DOK-01 · Rückgabe Dokumentar

## GEÄNDERTE DATEIEN
- Repo: nur `/home/user/tezgel/_werkstatt/pakete/E3-DOK-01.rueckgabe.md` (neu).
- Cache: `/home/user/tezgel/_werkstatt/cache/bilder/e3/` mit 483 Bildern und `liste.md`. Der Cache ist ein Symlink auf `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/werkstatt-cache`.
- Arbeitsdateien: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-DOK-01/` (Rohaufnahmen, Skript `bauen.mjs`, Logs, Vergleichsläufe).

## BILDLISTE
Quelle: Produktionsbau 127.0.0.1:4311. Der Server wurde nicht gestartet, beendet oder neu gestartet; Port 4320 nicht genutzt. Einstellungen wie E0: Einwilligung „abgelehnt“, reduzierte Bewegung, DPR 1, de-DE, Europe/Berlin, hell. Der E0-Satz stammt laut `E0-PRUEF-03.rueckgabe.md` aus dem Standardlauf von `bildsatz.mjs` (`_werkstatt/cache/bildsatz/e0`, reduziert). Alle Bilder höchstens 1440 px breit, JPEG Qualität 60, ohne Metadaten (geprüft).

Gesamt 483 Bilder: 122 erste Bildschirme (12 Hauptansichten × 10 Geräte, dazu gibt-es-nicht m390 und d1440) und 361 Ausschnitte.

| Hauptansicht | Bilder | erste Bildschirme | Ausschnitte m390 und d1440 | Ausschnitte s200 | KB Summe |
| --- | ---: | ---: | ---: | ---: | ---: |
| / (start) | 36 | 10 | 11 | 15 | 1994 |
| /bad | 46 | 10 | 15 | 21 | 2815 |
| /bad/badsanierung | 38 | 10 | 12 | 16 | 2239 |
| /bad/barrierefreies-bad | 36 | 10 | 12 | 14 | 2081 |
| /leistungen | 50 | 10 | 16 | 24 | 3101 |
| /fliesen | 41 | 10 | 14 | 17 | 2554 |
| /balkon-terrasse | 34 | 10 | 10 | 14 | 2107 |
| /referenzen | 50 | 10 | 19 | 21 | 3500 |
| /ueber-uns | 40 | 10 | 12 | 18 | 2537 |
| /kontakt | 34 | 10 | 10 | 14 | 2085 |
| /standorte/wetzlar | 33 | 10 | 10 | 13 | 1782 |
| /blog | 43 | 10 | 14 | 19 | 2754 |
| /gibt-es-nicht | 2 | 2 | 0 | 0 | 111 |

Maße: erste Bildschirme je Gerät im Viewport, von 360 × 740 bis 1440 × 900; d1920 und d2560 auf 1440 × 810 verkleinert (wie E0). Ausschnitte: m390 und s200 390 px breit, d1440 1440 px breit, je höchstens 2000 px hoch, Nummerierung ab 1. Gegenstück in E0: alle 120 ersten Bildschirme der zwölf Hauptansichten (`_werkstatt/bilder/e0/{slug}/{gerät}.jpg`); gibt-es-nicht und alle Ausschnitte „keins“. Ordnernamen wie in E0; das Werkzeug schreibt `bad__badsanierung`, das ist umbenannt. Vollständige Liste mit Bildname, Gerät, Maßen, KB und Gegenstück: `/home/user/tezgel/_werkstatt/cache/bilder/e3/liste.md`.

Werkzeugmeldungen, ohne Bewertung: Überlauf 0 bei allen ersten Bildschirmen und allen 100-%-Ausschnitten. Bei 200 % Systemschrift (m390) 20 Überlauf-Befunde auf /bad, /blog, /kontakt, /leistungen und /standorte/wetzlar. Textkreuzungen: 32 auf q844 und t768 (acht Seiten), 10 bei 200 % (neun Seiten). Konsole: nur die 404-Meldung von /gibt-es-nicht.

## GEMEINSAME DATEIEN
keine

## OFFENE FRAGEN
1. `git status --porcelain` zeigt neben der Rückgabedatei sechs fremde untracked Dateien unter `_werkstatt/belege/e3/` (`adressen.json`, `bewegung-reduziert.json`, `bildsatz.json`, `erstes-bild.json`, `konsole.json`, `schrift200.json`). Ich habe sie nicht angelegt und nicht angefasst; die Prüfung „git status zeigt nur die Rückgabedatei“ ist deshalb nicht erfüllt.
2. Bewegung: Mit normaler Bewegung unterscheidet sich der erste Bildschirm auf /fliesen, /kontakt, /standorte/wetzlar und /blog sichtbar von der reduzierten Fassung (Spitzenwert 231 von 255). Auf den übrigen acht Seiten ist er gleich. Der Satz folgt E0 (reduziert). Soll die Abnahme zusätzlich normale Bewegung zeigen?
3. Die Ausschnitte haben kein Gegenstück im E0-Satz `_werkstatt/bilder/e0/`. Im Cache liegt der E0-Bildsatz mit Ausschnitten (`_werkstatt/cache/bildsatz/e0/{gerät}/{slug}/NN.jpg`, gleiches Protokoll). Soll der Vergleich dagegen laufen?
4. Der Lauf mit `--seiten /gibt-es-nicht` endet mit Exit 1, weil die Seite 404 liefert. Das ist erwartet.

=== ENDE E3-DOK-01 · BEREIT ZUR RÜCKGABE ===
