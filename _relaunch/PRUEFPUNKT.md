# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Phase: P4 (Fundament, ruhend) · P3 abgeschlossen
- Live auf main: 544c42d (P4-07 Wege live: 308 × 2, 410 über proxy.ts; `/` im Kern, übrige Seiten Bestand). Server: 4331 = 74e768c (Live-Produkt), 4333 = ca8d5ff (P4-04/05a + ruhende P4-01/02/03).
- Tests: `KERN_SEITEN = ['/']` in `tests/fixtures.mjs` entspricht jetzt dem Live-Stand; Läufe gegen 4310/4323 mit `RELAUNCH_FASSUNG=bestand`.
- Laufend: P4-05b (Konfigurator) und P4-05c (Termin), Opus im Hintergrund. T2 für 570f24b…ca8d5ff (P4-04 Sprite, P4-05a Hooks, P4-01/02/03 ruhend): build-vergleich ohne Sprite gleich, strenger Vergleich nur Skripte /bad + CSS-Zusatzregeln, Mutationsprobe Hooks 3/3, Gegenprüfer ja; Pixel + Suite laufen.
- Nächster exakter Schritt: Pixel/Suite ca8d5ff auswerten → ERGEBNIS `belege/t2-ca8d5ff/` → `git push origin HEAD:main` → Live-Rauchtest. Dann Vorschau-Kandidat (`VORSCHAU="p4-01 p4-02 p4-03 p4-04 p4-05a" reinraum.sh HEAD`, Port 4320), Fotos prüfen, Briefing P4-10 (Vorlagen zusammenführen, Pläne einbinden, Tabelle `data-spalte`, `lg:w-sm` → Kern-Maß), P4-09 (Zuklappen nach transitionend), P4-06 (Tests Kern-Zweig + Mutationsprobe), P4-08 (Entwürfe Hauptseiten). Danach W1 `/bad`.
- Offene Abweichungen: ABNAHME „Offene Abweichungen“ (Z-04 Tastatur, Z-12 TBT).
