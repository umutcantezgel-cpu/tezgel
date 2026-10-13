# Tor e6o1-a1 · E6-ORCH-01 Schritte 1–3 · live 95d6f01 (Produkt 9988385) → f7822f5 · 13.10.2026

Inhalt: a09d483 (25 verwaiste Dateien gelöscht), 59657b6 (framer-motion und @phosphor-icons/react deinstalliert,
optimizePackageImports entfällt, MIT-Lizenz der Phosphor-Pfade beigelegt), f7822f5 (ErrorBoundary-Fehlerbild im KERN v2).
Umsetzung und je ein unabhängiger Gegenprüfer im Workflow (abgenommen, kein blockierender Befund), Belege `e6-orch-01/1-*`,
`2-*`, `3-*`, knip-Basis `knip-vor*.json` (56 → 31 ungenutzte Dateien nach Schritt 1, nur Wegfälle).

## Automatische Stufen (tor-s.sh, BEREICH_AUCH='*', TOR_PORT 4367, Pixel gegen live 4366) – alle grün
- Bereich/build-vergleich: **HTML 172 Seiten gleich**, nur_vorher/nur_nachher 0, **css_weg 161, css_neu 0, var_weg 77,
  var_neu 0, keyframes_weg pulse/spin** – wie von der Karte vorhergesagt (≈158/≈71).
- Werte 0, Altsystem 0, texte2 rot 0, axe 0, Wortbruch 0, Fotos 32/0, **Specs 380/0**.
- a11y: harte Kennzahlen 0; forced-Felder 6 auf /fliesen (wie live, seit R-01 bekannt); ohne JS /bad (Funnel nachgeladen,
  wie live).
- Pixel 12 Vergleiche, 1 abweichend: /standorte/giessen d1440 4399 px (Rückfrage-Zeilen) – bekanntes Messrauschen:
  Wiederholung 4366 gegen 4367 einmal 0, einmal 4399; 4366 gegen 4366 0. Seite und Bausteine unverändert.

## Ergebnis
Grün. Push; Lighthouse folgt gesammelt am Ende der Lieferung (hier nur Wegfall ungenutzten Codes und CSS).
