# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Phase: P3 (Durchstich `/`, ruhend) · L0 abgeschlossen
- Letzter grüner Commit live: 57470f8 (P3-00l Formular-Hooks; T2 grün, Live-Rauchtest + Live-Browser grün)
- Lokal, noch nicht gepusht: 70a77a8 P3-00p (Hooks F-10/F-11 – braucht T2), af2cf20 P3-04, 8f6f470 P3-03, 7dbfb18 P3-11, 6d1539c (Sprite im Kern-Layout, Staffel-Regel, Alt-Text) – Kern-Teile ruhend (T1 streng)
- Laufende Pakete: P3-03b (Zeichen an Icon-Familie, enter-sicherer SendeKnopf), P3-06a/b (Kopf-Varianten), P3-07 (Fuß, Leiste, WhatsApp-Kanal), P3-08 (Banner, Karten-Platzhalter)
- Server: 4310 Ausgangsstand 707a93d · 4311 a32b6de · 4312 56fd0dd (= Live-Quelltext) · 4320 Vorschau 444298e-v
- Nächster exakter Schritt: Reinraum 6d1539c + `build-vergleich 56fd0dd 6d1539c --streng` (läuft) → T2 P3-00p: volle Suite, Mutationsprobe (W1 Kontexttext /bad, W2 Entprellung 0, B1 Ablehnen→Annehmen, B2 Hash, B3 Auswahl vertauscht), Gegenprüfer P3-00p-GEG, Pixel-Stichprobe Banner Erstbesuch → Push nur auf main (E-005: kein Vorab-Push auf den Sitzungs-Branch) → Live-Rauchtest + Live-Browser. Danach Vorschau-Kandidat (p3-03, p3-04, p3-05, p3-11, später p3-06-a/b, p3-07, p3-08) fotografieren und prüfen.
- Offen danach: Basis-Matrix Probeläufer (15 Läufe), Fünf-Sekunden-Probe, Slop-Stichprobe Vorlagen, INP-Basis im ruhigen Fenster (`node inp.mjs --satz p0-ausgangsstand --seiten /,/kontakt,/blog --ansichten m375`).
- Ruhender Code auf main: `src/app/fonts/`, `src/styles/kern*.css`, `src/lib/motion/`, `src/lib/kern/`, `src/components/kern/`, `src/app/(kern)/` (nur Layout + `_entwurf`).
