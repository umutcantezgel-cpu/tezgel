# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Phase: P4 (Fundament, ruhend) · P3 abgeschlossen
- Live auf main: d4da429 (`/` im Kern, alle anderen Seiten Bestand). Server: 4310 Ausgangsstand 707a93d · 4323 Basis a8e049f (Bestand-Startseite, nur noch für Vergleiche) · neue Basis für W1 = Reinraum am Live-Stand (`reinraum.sh HEAD`, ohne KANDIDAT) bauen.
- Tests: `KERN_SEITEN = ['/']` in `tests/fixtures.mjs` entspricht jetzt dem Live-Stand; Läufe gegen 4310/4323 mit `RELAUNCH_FASSUNG=bestand`.
- Laufend: P4-01, P4-02, P4-03, P4-04, P4-05a (Opus, Hintergrund, seit 05:31 UTC) – Rückgaben abnehmen (prüfen, Vorschau, T1/T2, Commit, Push).
- Nächster exakter Schritt: P4-07 Wege (244aec3, lokal) – Reinraum 0f44c9b gegen 244aec3, `build-vergleich --streng`, `wege.mjs` lokal, Suite-Stichprobe, Mutationsprobe (Liste, matcher), dann `git push origin HEAD:main`, `live-rauchtest.sh`, `wege.mjs --live`. Danach P4-05b, P4-06, P4-09, P4-08; dann W1 `/bad`.
- Offene Abweichungen: ABNAHME „Offene Abweichungen“ (Z-04 Tastatur, Z-12 TBT).
