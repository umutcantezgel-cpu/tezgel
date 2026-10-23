# Referenzfotos Fliesenverlegung Tezgel – Übergabe

Stand 23.10.2026. Die Bilder sind gesichtet, sortiert, zugeschnitten und betextet. Für die Website sind sie **noch nicht optimiert und nicht eingebunden** – das ist die nächste Aufgabe.

## Inhalt dieses Ordners

| Pfad | Inhalt |
|---|---|
| `originale/` | 84 unveränderte iPhone-Screenshots (meist 1320×2868 PNG mit schwarzen Rändern, ca. 171 MB). Quelle für alle Ableitungen. |
| `01_treppen-eingaenge/` | 5 Bilder |
| `02_balkon-terrasse/` | 10 Bilder |
| `03_bad-dusche/` | 45 Bilder (Fliesenarbeit fertig, Sanitärmontage teils noch offen) |
| `04_baustelle-vorher/` | 21 Bilder (sichtbar unfertig oder Vorher-Zustand) |
| `referenzen_tracking.csv` | Eine Zeile je Original: Kategorie, neue Datei, Format, Zuschnitt im Original, Titel/Alt-Text, Bildtext, Hashtags. Semikolon-getrennt, UTF-8 mit BOM. |

Die 81 JPGs in `01_`–`04_`: Ränder entfernt, Social-Formate 4:5 (1080×1350) oder 1:1 (1080×1080, bei schmalen Quellen 642×642), Kontrast und Schärfe leicht angehoben. Der Bildtext steckt in EXIF (`ImageDescription`, `XPTitle`, `XPComment`, `UserComment`) und XMP (`dc:title`, `dc:description`, `dc:subject`).

## Nicht bearbeitet

- `IMG_2577.jpg`: Screenshot aus dem Google-Bildbetrachter (Lupen-Symbole), vermutlich kein eigenes Foto. Herkunft klären, bevor es verwendet wird.
- `IMG_2594.PNG`: pixelgleich mit `IMG_2593.PNG`.
- `IMG_2581.PNG`: praktisch identisch mit `IMG_2580.PNG`.

## Offen: Performance

- Web-Ableitungen aus `originale/` erzeugen. Die 4:5- und 1:1-Zuschnitte sind für Social Media gedacht, für Galerien passt eventuell ein anderes Seitenverhältnis (der Zuschnitt im Original steht in der CSV).
- AVIF/WebP, responsive Breiten (`srcset`/`sizes`), feste Breite und Höhe gegen CLS, Lazy Loading unterhalb des sichtbaren Bereichs, Platzhalter. Budgets laut `_werkstatt/STATUS.md`: LCP mobil ≤ 2,5 s, CLS ≤ 0,1, Lighthouse mobil ≥ 90.
- Die Quellen sind Screenshots mit höchstens 1320 px Breite, Querformate teils nur 642 px hoch. Nicht hochskalieren und nicht als Hero-Bild verwenden.
- In den Web-Ableitungen die Metadaten entfernen.
- `_werkstatt/` steht in `.vercelignore`. Für die Website die Bilder nach `public/` übernehmen oder in `src/` importieren.

## Offen: SEO

- Alt-Texte: Die Spalte `titel_alt_text` ist der Ausgangspunkt. Gegen die Textregeln des Projekts prüfen (Sie-Form, keine Emojis).
- Die Bildtexte sind für Social Media geschrieben (mit CTA und Hashtags). Auf der Website ohne Hashtags und CTA verwenden.
- Dateinamen: Präfix `fliesenleger-tezgel-asslar-` plus Motiv. Bei der Übernahme ggf. kürzen.
- Strukturierte Daten (`ImageObject`), Bild-Sitemap und Zuordnung zu den bestehenden Referenzseiten unter `/referenzen/…`.
- Die Projektorte sind unbekannt. „Aßlar“ steht nur für den Firmensitz, also keine Orte erfinden.

## Hinweise

- Vorher/Nachher-Paare: `IMG_2527` → `IMG_2525` (Außentreppe), `IMG_2555` → `IMG_2549` (bodengleiche Dusche).
- Personen sind auf `IMG_2542`, `IMG_2543` und `IMG_2547` zu sehen, ein Autohaus-Logo auf `IMG_2530` und `IMG_2531`. Vor der Veröffentlichung auf der Website freigeben lassen.
