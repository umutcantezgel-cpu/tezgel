# PRUEFPUNKT

- Etappe: E2 Referenz, Tor Anlauf 2 · Stand 11.10.2026 02:00 CEST
- Prüfstufe B am Tor abgeschlossen und grün auf f8899dc (Belege `_werkstatt/belege/e2-tor/PRUEFSTUFE-B2.md`; Lauf 1 auf 1ad2e45 in `PRUEFSTUFE-B.md`).
- Server: 4310 = Reinraum 745335f (Ausgang), 4311 = GA-Variante f8899dc, 4312 = Reinraum f8899dc, 4320 = Dev.
- Sichtabnahme Anlauf 1: / 5,7, /kontakt 5,0 (`_werkstatt/berichte/E2-SICHT.md`). Nacharbeit E2-ORCH-10 (e8e717f, E-019) eingespielt.
- Laufend: E2-PRUEF-B4 (Prüfstufe A auf 4320, dann B auf Reinraum e8e717f, Port 4312; Belege `_werkstatt/belege/e2-tor-2/`). Während des Laufs keine Änderungen unter `src/` (Dev-Server).
- Danach Sichtabnahme Anlauf 2 mit Bildern aus `belege/e2-tor-2/` (Briefing wie `_werkstatt/pakete/E2-SICHT.md`, neue Pfade); nach Anlauf 2 geht es weiter, Kategorien < 8 werden Pakete.
- Danach:
  1. Ansichtswert ≥ 8 → E2-PRUEF-L1 Lighthouse im Ruhefenster (kein anderer Agent): e0 12 Ansichten auf 4310, E2 / und /kontakt auf 4312 (Spezifikation `scratchpad/orch/spez/E2-PRUEF-L1.json`, COMMIT 1ad2e45 → auf f8899dc ändern). Kategorien < 8 werden Pakete (≤ 2 je Ansicht und Kategorie); Ansichtswert < 8 → Nacharbeit und zweiter Anlauf.
  2. E2-DOK-01 (Referenz-Bildsatz nach `_werkstatt/bilder/e2/`), Prüfstufe A E3-ORCH-00/01 ist durch Lauf 2 abgedeckt (Build, Funktion, Szene im Schaufenster).
  3. E3-Welle 1 aus `scratchpad/orch/spez/e3/` (16 Pakete; `briefing.mjs` nicht umleiten). Reihenfolge: -11, -16, -02, -07 → -12, -17, -03, -21 → -13, -18, -09, -10 → -14, -19, -15, -20.
- Entwürfe E3: `scratchpad/orch/entwurf/e3/` (Einzugsband mit Logik und Test; Szene ist eingespielt, dd0c0d0).
- Offene Menschen-Fragen: M-15, M-16, M-17, M-18 (Fotos je Gewerk).
- Bei Wiederaufnahme nach Abbruch: laufende Pakete in ihren Dateien auf den letzten Commit zurücksetzen und neu starten; Server nach `_werkstatt/werkzeuge/EINRICHTUNG.md`.
