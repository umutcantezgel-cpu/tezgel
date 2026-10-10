# T2 Kandidat-Tor · P3-00p + P3-00q (8319525) · 10.10.2026

Inhalt: Hooks für WhatsApp-Kanal (F-10), Einwilligungsbanner (F-11) und Kurzformular (F-09); dazu ruhende Kern-Pakete P3-03/03b, P3-04, P3-07, P3-11 (nicht geroutet).

| Prüfung | Ergebnis |
|---|---|
| Reinraum (npm ci, Build, Typen, Lint, Test, qa:graph) | grün |
| build-vergleich 56fd0dd (= Live-Quelltext 57470f8) → 8319525 | HTML 172 normalisiert gleich, CSS weg 0 / neu 0; streng nur Chunk-Namen (Widget/Banner/Kurzformular), Beleg `../build-vergleich-56fd0dd-6d1539c-streng/` |
| Kern-Code im Build | keine Fundstelle von `k-icon-`, `sig-kreuzlinie`, `k-staffel-nr`, `kern-global` in `.next/static` und `.next/server/app` ⇒ ruhend |
| Funktionssuite (4314) | 296 Fälle: 282 grün, 13 übersprungen (je Ansicht), 1 rot unter Last (Express-Funnel „Gutfall auf /foerderung“, desktop; F-03 nicht Teil dieser Pakete) – Wiederholung der Spec nach Neustart des Containers: 13/13 grün |
| Sperrklinke (`testzahl.mjs`) | grün: Specs 11 · Fälle 111 · expect 462 · fixme 3 · skip 6 |
| Gegenprüfer P3-00pq-GEG (Opus, frisch) | beide Commits „Verhalten gleich: ja“; nur niedrige Befunde (Fast Refresh im Entwicklungsmodus, künftiger Server-Import, `sourceTag` Pflicht im Hook) |
| Mutationsprobe (Kopie `-m`, Port 4313, desktop, 46 Fälle) | W1 Kontexttext /bad → 1 rot · W2 Entprellung 0 → 1 rot · B1 Ablehnen ruft Annehmen → 2 rot · B2 Hash geändert → 1 rot · B3 Auswahl vertauscht → 1 rot · Q1 Honeypot-Prüfung aus → 2 rot · Q2 `inquiryType` → 3 rot ⇒ jede Mutation erkannt (11 rot, 33 grün, 2 übersprungen) |
| Pixel | entfällt: HTML und CSS gleich; Widget und Banner werden nur im Client gerendert, ihr Markup ist byte-gleich (Gegenprüfer) |
