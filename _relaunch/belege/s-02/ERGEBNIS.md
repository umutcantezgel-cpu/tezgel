# S-02 · `/ueber-uns` · Prüftor T2-S · 12.10.2026 · Commit 3c02fe5 gegen live c27fc77

Rohdaten: `tor/ergebnis.txt` und Logs in `tor/`.

| Stufe | Ergebnis |
|---|---|
| Sperrklinke | grün |
| Reinraum (npm ci, Build, Typen, Lint, `npm test`, qa:graph) | grün |
| build-vergleich | HTML-Abweichung nur `ueber-uns.html`; CSS 14 Selektoren weg (framer-motion/Altklassen der Seite), 19 neu (KERN-v2-Utilities); keine Keyframes |
| werte.mjs | 0 Befunde |
| Altsystem-Suche | 0 |
| texte2 (Build gegen Build, Freigabe MIKROTEXTE) | grün (rot 0) |
| axe mit Zuständen | `/ueber-uns` 0 ernst/kritisch in allen Ansichten und Zuständen. Die 110 gezählten Knoten liegen auf `/bad` (8 je Zustand) und `/blog` (14 je Zustand) im Bestand-Markup (Zustandsläufe nutzen die Grundmenge) – unverändert gegenüber live, eigene Schritte. Werkzeug zählt seit diesem Tor nur die Seiten des Schritts. |
| a11y-zusatz | Status identisch mit live (`belege/s-02-live/a11y-zusatz.json`): rot sind auf live wie hier fokus_sichtbar, fokus_2px, fokus_verdeckt, zoom.css, textabstand, forced – Ursachen im gemeinsamen Rahmen (feste Leiste/Banner verdecken den Fokus, 56 Fälle live). Unterschiede: fokus_verdeckt 56 → 57 (d1440 Erstbesuch: der Adressknopf im Einstieg liegt unter dem Banner), textabstand abgeschnitten 1 → 0, Überhang 1 → 0. → Rahmenpaket R-01 „Fokus nie verdeckt“. |
| Wortbruch | 0 |
| Fotos m375/t768/d1440/d1920 | 4 Aufnahmen, 0 Fehler, 0 Überlauf, 0 Konsole; Sichtung durch den Orchestrator (Bilder der Rückgabe): aus einem Guss mit `/` |
| Funktionstests funktion-navigation | 53 bestanden, 9 übersprungen, 0 fehlgeschlagen |

**Urteil:** grün für den Push. Offene Kleinigkeiten (Sichtung): leere Fläche rechts oben im Einstieg ab lg, Sternreihe bricht bei 1024 px; Flächenwechsel Geschichte/Qualitätsversprechen beide Kalk. Sammeln für die Sichtabnahme.
