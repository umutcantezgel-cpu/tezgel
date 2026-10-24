# E2-DOK-01 · Rückgabe Dokumentar

## GEÄNDERTE DATEIEN
Neu angelegt (25 Dateien, 2,0 MB), alle unter `_werkstatt/bilder/e2/`:
- `start/` (23 Dateien): zehn Geräte, zwölf Voll-Ausschnitte
- `gibt-es-nicht/` (2 Dateien)
Sonst keine Änderung. `git status` zeigt im Repo nur `_werkstatt/bilder/e2/` als neu. Diese Rückgabedatei ist die einzige weitere Schreibstelle.
Arbeitsdateien unter `$SCRATCH/E2-DOK-01/` (bildsatz, voll, erstelle.cjs).

## BILDLISTE (Name, Gerät, Maße, KB, Gegenstück E0)
Erster Bildschirm von `/`, Gerät je Datei:
| Name | Gerät | Maße | KB | Gegenstück E0 |
|---|---|---|---|---|
| start/m360.jpg | m360 | 360×740 | 33 | _werkstatt/bilder/e0/start/m360.jpg |
| start/m390.jpg | m390 | 390×844 | 36 | _werkstatt/bilder/e0/start/m390.jpg |
| start/m430.jpg | m430 | 430×932 | 40 | _werkstatt/bilder/e0/start/m430.jpg |
| start/q844.jpg | q844 | 844×390 | 35 | _werkstatt/bilder/e0/start/q844.jpg |
| start/t768.jpg | t768 | 768×1024 | 59 | _werkstatt/bilder/e0/start/t768.jpg |
| start/t1024.jpg | t1024 | 1024×768 | 67 | _werkstatt/bilder/e0/start/t1024.jpg |
| start/d1280.jpg | d1280 | 1280×800 | 83 | _werkstatt/bilder/e0/start/d1280.jpg |
| start/d1440.jpg | d1440 | 1440×900 | 89 | _werkstatt/bilder/e0/start/d1440.jpg |
| start/d1920.jpg | d1920 | 1440×810 | 64 | _werkstatt/bilder/e0/start/d1920.jpg |
| start/d2560.jpg | d2560 | 1440×810 | 59 | _werkstatt/bilder/e0/start/d2560.jpg |

`/gibt-es-nicht` auf m390 und d1440:
| gibt-es-nicht/m390.jpg | m390 | 390×844 | 28 | keins |
| gibt-es-nicht/d1440.jpg | d1440 | 1440×900 | 82 | keins |

Ganzseitig `/`, Ausschnitte mit höchstens 2000 px Höhe:
| start/m390-voll-1.jpg … -7.jpg | m390 | 390×1772 (Nr. 7: 390×1767) | 73, 77, 70, 64, 58, 54, 40 | keins |
| start/d1440-voll-1.jpg … -6.jpg | d1440 | 1440×1709 | 152, 133, 175, 110, 118, 118 | keins |

Alle Bilder sind JPEG Qualität 60 ohne Metadaten. Breite höchstens 1440 px.

## Prüfung
- Anzahl 25, höchstens 30. Breite jedes Bildes höchstens 1440 px.
- Jedes der zehn Geräte aus E0 hat sein Gegenstück in `e0/start/`.
- Keine EXIF-, XMP-, IPTC-, Kommentar- oder ICC-Einträge (`identify -verbose`).
- Einstellung nach Protokoll von `bildsatz.mjs`: Server 4311, Einwilligung abgelehnt, reduzierte Bewegung, DPR 1, Dev-Overlay aus.
- Überlauf 0, Überlappung 0, Aufnahmen ohne Fehler (161 Aufnahmen).

## GEMEINSAME DATEIEN
Keine gelesen oder geändert. Keine gemeinsame Datei berührt.

## OFFENE FRAGEN
1. Der Lauf `bildsatz.mjs` endet mit Exit 1, weil `/gibt-es-nicht` auf allen zehn Geräten HTTP 404 liefert. Das ist für diese Seite erwartet und nicht als Fehler behandelt. Die 15 Konsolenmeldungen sind alle „404 Not Found“ dieser Seite.
2. Der Schritt-2-Lauf zog 161 Aufnahmen, je Ansicht bis zu 12 Ausschnitte. Ich habe davon nur den ersten Bildschirm (Index 00) übernommen. Die übrigen Ausschnitte liegen in `$SCRATCH/E2-DOK-01/bildsatz/` und sind nicht im Repo.
3. Die Ausgangsbilder stammen aus bildsatz mit JPEG Qualität 70; sie sind auf Qualität 60 neu kodiert, wie im Briefing verlangt. Doppelte Kompression ist die Folge.
4. Die Nummerierung der Voll-Ausschnitte beginnt bei 1. E0 hat dafür kein Vorbild; bitte bestätigen.
5. Die Einstellungen sind gegen das Protokoll von `bildsatz.json` geprüft, nicht gegen eine Begleitdatei des E0-Satzes. Die E0-Bilder zeigen einen anderen Inhalt (alter Stand), Gerät und Leiste unten stimmen überein.

=== ENDE E2-DOK-01 · BEREIT ZUR RÜCKGABE ===
