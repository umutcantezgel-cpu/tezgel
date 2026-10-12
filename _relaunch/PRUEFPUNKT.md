# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Vereinheitlichung (E-037, E-038) · **Fusion II (E-039)**: Beide Sitzungsstände werden ohne Verlust zusammengeführt. Plan: `PLAN.md`, Abschnitt „Fusion II“ (F0–F3).
- Live: a1aeda6 (Werkstatt, enthält 5c3c359). Die Werkstatt steht auf HALT (bestätigt in `_werkstatt/PRUEFPUNKT.md`/`STATUS.md`); nur diese Sitzung pusht.
- **F0 abgeschlossen (Tor m-e039 grün, `belege/m-e039/ERGEBNIS.md`):**
  - Merge-Commit c4f2a04 + 090858e: die 29 Konflikte vorläufig in der Werkstatt-Fassung; N-01/N-01b, Suite und Werkzeuge sind mitgemischt. Sichtbar gegenüber a1aeda6 nur die Phasenleiste des Preisrechners.
  - Fassung B dieser Sitzung: f53181e. WIP S-05/S-08/S-10 gesichert in `scratchpad/wip-e039/`.
  - Push von M auf main, dann Live-Prüfung und Meldung.
- **F1 abgeschlossen:** Gutachten U1–U8 in `belege/e039-gutachten/` (Grundgerüst: U1 A, U2 B, U3 A, U4–U8 B). **F2 abgeschlossen:** F-01–F-07 committet. **Lieferung 1 live (e41b65f):** F-01 `/leistungen`, F-02 `/leistungen/[id]`, F-03 `/blog`, F-04 Badanfrage, F-05 Projekt-Check (Tor `belege/l1-e039`, Lighthouse `belege/l1-e039-lh*`). **Lieferung 2 im Tor (`l2-e039`, Port 4362, Pixel gegen 4361 = 0403de3):** F-06 Konfigurator, F-07 Schnellanfrage + Routenkarte. Danach Paket R-01 „Rahmen und geteilte Bausteine“ (Express-Fokus, FinalCTA-Telefon + SSR der Schnellanfrage, SSR der Formulare auf /bad und /fliesen-Seiten, Pflichtsternchen, Knopffolge, Abschnitt-scroll-mt, Leitachse-Ebene, Banner/Fokus verdeckt, Fuß-Textabstand, spaet auf /leistungen/[id] mit korrigiertem Zoom-Werkzeug). Server: 4360 = 090858e, 4361 = 0403de3 (= Produkt live e41b65f), 4362 = Tor, 4370 = M, 4371 = B, 4350 = next dev.
- Lokaler `CLAUDE.md`-Block (E-039 ergänzt), nie committen.
- Offen für den Auftraggeber: M-20, WM-15–WM-22 (siehe MENSCHEN.md); dazu Fotos, Kalender-Termin, IndexNow-Geheimwort, Datenschutzerklärung (Morgenbericht 12.10.).
- 2026-10-12 10:55 CEST · Tor m-e039 grün (380/0 Specs, Pixel nur Preisrechner m375, a11y hart 0, Lighthouse `/` mobil 92 / TBT 139 ms, Desktop 100 gleich). F1-Gutachten der Formulare läuft. Push M.
- 2026-10-12 12:20 CEST · M live (28ee443, Live-Prüfung grün). Gutachten U1–U8 fertig; Baumeister F-01–F-05 laufen.
- 2026-10-12 14:50 CEST · Lieferung 1 live (e41b65f, Live-Prüfung grün). Lieferung 2 im Tor.
