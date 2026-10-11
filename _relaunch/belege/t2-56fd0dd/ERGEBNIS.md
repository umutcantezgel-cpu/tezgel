# T2 Kandidat-Tor · P3-00l (56fd0dd) · 10.10.2026

| Prüfung | Ergebnis |
|---|---|
| Reinraum (npm ci, Build, Typen, Lint, Test, qa:graph) | grün |
| build-vergleich 444298e → 56fd0dd | HTML 172 gleich, CSS weg 0 / neu 0 (Beleg `../build-vergleich-444298e-56fd0dd/`) |
| Funktionssuite (4312) | 296 Fälle: 281 grün, 13 übersprungen (je Ansicht), 2 rot unter Last (Last ≈ 12 auf 4 CPUs): `funktion-konfigurator` Rechner 1 (desktop), `funktion-projektcheck` /bad WhatsApp (desktop) – beide Formulare nicht Teil von P3-00l; Wiederholung einzeln: 32/32 grün |
| Sperrklinke (`testzahl.mjs`) | grün: Specs 11 · Fälle 111 · expect 462 · fixme 3 · skip 6 |
| Gegenprüfer P3-00l-GEG (Opus, frisch) | „Verhalten gleich: ja“, keine offenen Befunde |
| Mutationsprobe (Reinraum-Kopie `-m`, Port 4313, desktop) | M1 Hero `inquiryType` → 1 rot · M2 Funnel `inquiryType` → 6 rot · M3 Preisrechner Einwilligungsprüfung aus → 2 rot · M4 Karte immer freigegeben → 7 rot · übrige 26 grün ⇒ jede Mutation erkannt |
| Pixel | entfällt: HTML aller 172 Dateien und CSS gleich |

Lernpunkt: Der erste Mutationslauf traf einen alten Erprobungsserver auf demselben Port (EADDRINUSE im Log des neuen Servers) und war ungültig. `server.sh` prüft künftig das Server-Log auf `EADDRINUSE` und das Arbeitsverzeichnis des lauschenden Prozesses.

> **Berichtigung (E-036, 11.10.2026):** Die Pixelvergleiche in diesem Beleg sind ungültig. Die Maske von `pixel.mjs` blendete die ganze Seite aus; erkannt wurden nur Höhenänderungen. Nachgeprüft mit dem berichtigten Werkzeug: `../p4-tor-r2/pixel/` (Stichprobe und rückwirkend gegen den Ausgangsstand).
