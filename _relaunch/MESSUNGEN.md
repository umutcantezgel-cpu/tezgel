# MESSUNGEN

Alle Zahlen mit Messbedingungen. Median aus fünf, wo gefordert. Ausgangsstand = 5a7a7b0 (Messungen am Reinraum-Build 707a93d, funktional identisch: nur Arbeitsbereich + `x-build`-Meta, HTML/CSS normalisiert identisch).

## Zehnfach-Tafel
| Größe | Ausgangswert (P0) | Zielwert | Aktuell |
|---|---|---|---|
| Slop hart (statisch: freie Werte S-05, Emojis S-04, Platzhalter S-01) | 479 Fundstellen | 0 | 479 |
| Slop hart (Icon-Familien S-04) | lucide 122 Dateien + Phosphor 2 + eigene Inline-SVG 5 | eine Familie (Marken-Logos ausgenommen) | – |
| Slop hart (S-03 Kontrast/Fokus, axe) | 1.614 Kontrast-Knoten | 0 | – |
| Slop weich (statisch, Signaturen S-09/S-11/S-13) | 1.383 Fundstellen | −80 % (≤ 277), ≤ 2 je Hauptseite | 1.383 |
| Jury (gewichtet, je Hauptseite) | ausstehend | ≥ 8,0, keine Kategorie < 7,5 | – |
| Blindvergleich | – | ≥ 90 % Siege | – |
| Registerabdeckung (data-motion) | 0 Einträge, kein Register | 100 % | – |
| axe ernst/kritisch (Knoten, 4 Ansichten × 120 Seiten + Zustände) | 1.661 + 113 (Zustände) | 0 | – |
| Lighthouse mobil (Median, Hauptseiten) | ausstehend (ruhiges Messfenster) | ≥ 90, nie > 3 Punkte schlechter | – |
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
Beleg: `belege/p0-ausgangsstand/statisch.json`. Weiche Befunde je Seite (Katalog, Opus-Gegenprüfung) folgen mit dem Slop-Jäger.

## W0 · Aufräumen (cf38982, live)
Reinraum grün · Routentabelle identisch · HTML 172/172 identisch · 211 ungenutzte CSS-Selektoren, 46 Theme-Variablen, 1 Keyframe entfallen · Texte/SEO 120 Seiten GRÜN · Live-Rauchtest grün (x-build = cf38982).
