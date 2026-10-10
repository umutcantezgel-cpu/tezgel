# MESSUNGEN

Alle Zahlen mit Messbedingungen. Median aus fünf, wo gefordert. Ausgangsstand = 5a7a7b0 (Messungen am Reinraum-Build 707a93d, funktional identisch: nur Arbeitsbereich + `x-build`-Meta, HTML/CSS normalisiert identisch).

## Zehnfach-Tafel
| Größe | Ausgangswert (P0) | Zielwert | Aktuell |
|---|---|---|---|
| Slop hart (statisch: freie Werte S-05, Emojis S-04, Platzhalter S-01) | 479 Fundstellen | 0 | 479 |
| Slop hart (Icon-Familien S-04) | lucide 122 Dateien + Phosphor 2 + eigene Inline-SVG 5 | eine Familie (Marken-Logos ausgenommen) | – |
| Slop hart (S-03 Kontrast/Fokus, axe) | 1.614 Kontrast-Knoten | 0 | – |
| Slop weich (statisch, Signaturen S-09/S-11/S-13) | 1.383 Fundstellen | −80 % (≤ 277) | 1.383 |
| Slop weich (Slop-Jäger + Opus-Gegenprüfer, Hauptseiten) | 74 (/ 16 · /bad 7 · /leistungen 15 · /standorte 8 · /blog 8 · /ueber-uns 12 · /kontakt 8) | −80 % (≤ 14), ≤ 2 je Hauptseite | 74 |
| Jury (gewichtet, je Hauptseite) | 4,15–4,40 (/ 4,30 · /bad 4,20 · /leistungen 4,40 · /standorte 4,40 · /blog 4,35 · /ueber-uns 4,15 · /kontakt 4,40) | ≥ 8,0, keine Kategorie < 7,5 | – |
| Blindvergleich | – | ≥ 90 % Siege | – |
| Registerabdeckung (data-motion) | 0 Einträge, kein Register | 100 % | – |
| axe ernst/kritisch (Knoten, 4 Ansichten × 120 Seiten + Zustände) | 1.661 + 113 (Zustände) | 0 | – |
| Lighthouse mobil (Median aus 5, Hauptseiten) | 67–88 (/ 87 · /bad 88 · /leistungen 88 · /standorte 67 · /blog 72 · /ueber-uns 88 · /kontakt 80) | ≥ 90 überall, nie > 3 Punkte schlechter | 67–88 |
| LCP mobil (Median) | 3,4–6,6 s (alle Hauptseiten über Budget) | ≤ 2,5 s | – |
| CLS mobil (Median) | 0 · /standorte 0,516 | ≤ 0,1 | – |
| Element-Abdeckung | ENTFÄLLT (E-000) | – | – |

## P0 · Ebene 1 Bestand (Reinraum 5a7a7b0)
`npm ci` ✔ · `next build` ✔ (36 s) · `typecheck` 0 Fehler · `lint` 0 Befunde · `npm test` 17/17 · `qa:graph` ✔ · Routentabelle: `belege/p0/reinraum-ausgangsstand/routen.txt` (105 Zeilen; 170 HTML-Seiten).

## P0 · Ebene 3 Darstellung (Fotos)
Bedingungen: lokaler Produktionsserver (`next start`, 127.0.0.1:4310), Chromium 1194, DPR 1, `reducedMotion: reduce`, Einwilligung „abgelehnt“, durchgescrollt, Bildschirmhöhen-Ausschnitte JPEG q70, keine feste Uhrzeit (sonst künstlicher Hydrationsfehler, siehe LERNEN).
Ergebnis: 480 Aufnahmen (120 Seiten × 4 Ansichten) · 0 Ladefehler · 0 Status ≠ 200 · **0 Überlauf** · **0 Konsolenfehler**. Beleg: `belege/p0-ausgangsstand/fotos-zusammenfassung.json`, Belegfotos `belege/p0-ausgangsstand/fotos/` (Hauptseiten + je Vorlage zwei Seiten).
Hinweis: `/kontakt` erzeugt einen Hydrationsfehler (React #418), sobald die Client-Uhr auf einem anderen Tag steht als der Build (statisch vorgerenderter Kalender) – latenter Fehler im Ausgangsstand, tritt live für Besucher an jedem Tag nach dem Build auf → Paket in P5 (Arbeitsseiten).

## P0 · Ebene 5 Zugänglichkeit (axe 4.11, Tags wcag2a/aa, 21a/aa, 22aa)
Bedingungen wie Fotos, 4 Ansichten, 120 Seiten; Zustände: Mobilmenü offen (m375), Erstbesuch mit Banner (m375, d1440) auf den 7 Hauptseiten.
- 501 Läufe · **1.661 ernst/kritische Knoten** (serious: color-contrast 1.614, aria-prohibited-attr 28, scrollable-region-focusable 19) · 89 von 120 Seiten betroffen.
- Zustände (21 Läufe): 113 Knoten (color-contrast 110, scrollable-region-focusable 3).
- Hauptseiten (Knoten über 4 Ansichten): `/` 6 · `/bad` 36 · `/leistungen` 0 · `/standorte` 61 · `/blog` 84 · `/ueber-uns` 0 · `/kontakt` 30.
Beleg: `belege/p0-ausgangsstand/axe.json`, `axe-zustaende.json`.

## P0 · Ebene 7 Suche (Texte/SEO)
120 Seiten · Sitemap 163 URLs · 168 interne Linkziele · **0 kaputte interne Links** · robots.txt-Hash gespeichert. Beleg: `belege/p0-ausgangsstand/texte-index.json`, je Seite `texte/*.json`.

## P0 · Ebene 8 Konsistenz (statisch, `werkzeuge/statisch.mjs`, 254 Dateien in src/)
| Signatur | Fundstellen | Dateien |
|---|---|---|
| S-05 Tailwind-Beliebigwert | 342 | 104 |
| S-05 Hex-Farbe im Code | 51 | 12 |
| S-05 rgb/rgba/hsl im Code | 19 | 6 |
| S-05 Inline-style | 34 | 19 |
| S-05 Bewegungswert als Zahl | 7 | 5 |
| S-04 lucide-Import | 124 | 122 |
| S-04 Phosphor-Import | 2 | 2 |
| S-04 Inline-`<svg>` | 17 | 5 |
| S-04 Emoji | 20 | 11 |
| S-01 Platzhalter | 6 | 1 |
| S-09 Verlaufstext | 96 | 70 |
| S-09 Glow/Leuchtkugel | 162 | 80 |
| S-09 Glas/Unschärfe | 258 | 98 |
| S-09 Funkeln-Icon (Sparkles) | 92 | 40 |
| S-09 Laufband | 4 | 2 |
| S-09 Nachlaufcursor | 1 | 1 |
| S-09 Badge über Überschrift (eyebrow) | 462 | 86 |
| S-11 Icon-Kachel | 135 | 64 |
| S-13 Floskel | 41 | 22 |
| S-09 Hover-Anheben | 132 | 80 |
Beleg: `belege/p0-ausgangsstand/statisch.json`.

### Slop-Jäger (Bildbefund) · Hauptseiten
Bedingungen: ≤ 30 Bildschirmhöhen-Ausschnitte je Seite über 4 Ansichten (Jury-Material) + Seitentext; Haiku zählt nach Katalog, frischer Opus-Gegenprüfer erkennt an, verwirft oder trägt nach (Workflow `tezgel-slop`). Gleiches Element in mehreren Ansichten = 1 Fund; gleichartige Karten je Abschnitt = 1 Fund.
| Seite | weich | hart (sichtbar) | gemeldet / verworfen / nachgetragen | Schwerpunkte |
|---|---|---|---|---|
| / | 16 | 4 | 19 / 6 / 7 | S-09 ×8 (Verlaufstext, Glow, Badge über H1, Laufband), S-11 ×2, S-13 ×3, S-14 ×2 |
| /bad | 7 | 0 | 9 / 2 / 0 | S-09 ×4 |
| /leistungen | 15 | 2 | 19 / 7 / 5 | S-13 ×6, S-09 ×5 |
| /standorte | 8 | 6 | 11 / 2 / 5 | S-03 ×6 (Kontrast), S-09 ×3 |
| /blog | 8 | 4 | 13 / 3 / 2 | S-09 ×4 |
| /ueber-uns | 12 | 0 | 13 / 3 / 2 | S-09 ×7 |
| /kontakt | 8 | 1 | 8 / 0 / 1 | S-09 ×6 |
| **Summe** | **74** | **17** | 92 / 23 / 22 | |
Beleg: `belege/p0-ausgangsstand/slop-jaeger.json` (jeder Fund mit Ort und Begründung). Übrige Seiten: Stichprobe je Vorlage folgt in P3-00 (E-016).

## W0 · Aufräumen (cf38982, live)
Reinraum grün · Routentabelle identisch · HTML 172/172 identisch · 211 ungenutzte CSS-Selektoren, 46 Theme-Variablen, 1 Keyframe entfallen · Texte/SEO 120 Seiten GRÜN · Live-Rauchtest grün (x-build = cf38982).

## P0 · Jury Ausgangsstand (3 frische Opus-Jurys je Hauptseite, nur Bildmaterial, ≤ 30 Ausschnitte über 4 Ansichten)
| Seite | gewichtet (Median) | Design | Bedienbarkeit | Kreativität | Inhalt | Einzelurteile |
|---|---|---|---|---|---|---|
| / | 4,30 | 4,5 | 4,5 | 3,0 | 5,5 | 4,45 · 3,95 · 4,40 |
| /bad | 4,20 | 4,0 | 5,0 | 3,0 | 5,0 | 4,20 · 4,20 · 4,35 |
| /leistungen | 4,40 | 4,5 | 5,0 | 3,0 | 5,0 | 4,55 · 4,40 · 4,40 |
| /standorte | 4,40 | 4,5 | 5,0 | 3,0 | 5,0 | 4,20 · 4,40 · 4,40 |
| /blog | 4,35 | 4,5 | 5,0 | 3,0 | 4,5 | 4,50 · 4,50 · 4,35 |
| /ueber-uns | 4,15 | 4,0 | 5,0 | 3,0 | 4,5 | 4,20 · 4,35 · 4,15 |
| /kontakt | 4,40 | 4,5 | 4,5 | 3,5 | 5,5 | 4,50 · 4,55 · 4,45 |
Wiederkehrende Schwächen (alle Jurys): generisches Muster (Pill-Badge + zentrierte Überschrift vor jeder Sektion, gleiche Kartenraster), kein Bild/keine Leitidee aus dem Gewerk, Stock-/KI-Bildanmutung, mobil vier überlagerte feste Ebenen (Leiste, WhatsApp-Bubble mit Badge, Chat-Blase, Cookie-Schild) verdecken Formularfelder und Knöpfe, drei konkurrierende Anfrageformulare auf der Startseite, abgeschnittene Chip-/Vertrauensleisten. Beleg: `belege/p0-ausgangsstand/jury.json` (alle Belege und Reparaturvorschläge).

## P0 · Ebene 6 Leistung (Lighthouse 12, Median aus 5 je Seite und Form)
Bedingungen: lokaler Produktions-Build 707a93d (`next start`, komprimiert, 127.0.0.1:4310), Chromium 1194 headless, Erstbesuch mit Einwilligungsbanner, Dritt-Hosts blockiert, Lighthouse-Standarddrosselung (mobil simuliert: 4× CPU, Slow 4G; Desktop-Preset), Benchmark-Index 2.190–2.385, ruhiges Messfenster (kein Unteragent, keine Browserläufe). Werkzeugfehler (`NO_NAVSTART`) zählen nicht als Lauf und werden wiederholt (3 Fälle nachgemessen). Beleg: `belege/p0-ausgangsstand/lighthouse.json`, Rohberichte im Cache.

| Seite | mobil Leistung | LCP | TBT | CLS | Zugängl. | JS (Übertragung) | Desktop Leistung | Desktop LCP |
|---|---|---|---|---|---|---|---|---|
| / | 87 | 3.410 ms | 164 ms | 0 | 100 | 413 KB | 99 | 840 ms |
| /bad | 88 | 3.688 ms | 158 ms | 0 | 97 | 431 KB | 100 | 763 ms |
| /leistungen | 88 | 3.765 ms | 111 ms | 0 | 100 | 428 KB | 100 | 763 ms |
| /standorte | 67 | 3.789 ms | 112 ms | **0,516** | 95 | 427 KB | 100 | 737 ms |
| /blog | 72 | **6.574 ms** | **255 ms** | 0 | 97 | 597 KB | 100 | 755 ms |
| /ueber-uns | 88 | 3.687 ms | 121 ms | 0 | 100 | 425 KB | 100 | 753 ms |
| /kontakt | 80 | 4.836 ms | 178 ms | 0 | 95 | 413 KB | 96 | 1.389 ms |

Bewährte Praktiken und SEO je 100. Schriften 77 KB (Inter + Plus Jakarta Sans). Streuung: /standorte mobil zweigipflig (Leistung 64–88, CLS 0 oder 0,516 je Lauf) → Layoutsprung, der nur in einem Teil der Läufe auftritt (Kandidat: nachgeladene Karte oder Banner). Budgets gerissen: LCP mobil auf allen 7 Hauptseiten, CLS auf /standorte, TBT auf /blog.

## P0 · Ebene 4 Bewegung (`bewegung.mjs`, 7 Hauptseiten × m375/d1440)
Registriert 0/93 animierte Elemente (keines mit `data-motion`) · Layout-Eigenschaften 0 · verworfene Frames mobil 4× 6,73 % (2,9–10,6 % je Seite; Soll ≤ 5 %; unter Last gemessen, ±3 Pp., Nachmessung im ruhigen Fenster) · LoAF aus Bewegungscode ≤ 8 ms · reduzierte Bewegung: 10 Verstöße (alle /ueber-uns, `CompanyHistory`, framer-motion) · Desktop-Frames 100 % verworfen durch WaterCursor-WebGL ohne GPU (nur Information). Beleg `belege/p0-ausgangsstand/bewegung.json`.

## P0 · Ebene 5 Zusatz (`a11y-zusatz.mjs`, 7 Hauptseiten, 91 Läufe)
Fokus nicht sichtbar 64 (abgelehnt) bzw. 472 (m375 Erstbesuch, Banner) · Fokusring dünn/unter 3:1 270 · WhatsApp-Knopf ohne Fokusstil 28 · Fokus verdeckt durch feste Ebene 582 (untere Leiste 151, Banner 426) · Reihenfolge 2 · Falle 0 · Sprunglink 28/28 · Reflow 320: 7 (mobile Leiste) · Textabstände abgeschnitten 46 (33 line-clamp), Überlauf 14 · forced-colors ohne Grenze 48 (Icon-Knöpfe), Felder 2 · ohne JS grün (Textanteil ≥ 0,863) · Zoom (Information) 71/139. Beleg `belege/p0-ausgangsstand/a11y-zusatz.json`.

## P0 · Ebene 10 SVG (`svg.mjs`)
21.699 SVG-Einheiten · viewBox fehlt 0 · feste Farbe 8 · Pixelbild 2 (Logo-Hüllen) · ID-Kollision 0 · Zugänglichkeit nicht belegt 44 · Strichstärke ≠ 1,5: 21.676 · Icon-Budget 0 über · 171 Seiten mit zwei Icon-Familien (lucide + eigene). Beleg `belege/p0-ausgangsstand/svg.json`.
