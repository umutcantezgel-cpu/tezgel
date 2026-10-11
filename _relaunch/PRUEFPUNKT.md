# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Phase: P3-16 (Kandidat-Tor `/`) · L0 abgeschlossen
- Live auf main: 493e1e0 (alles Kern ruhend, T1 streng gleich). Lokal darüber: 30c3ee3 (scroll-padding-bottom, ruhend), 00dea2c (Briefing P3-16a).
- Kandidat `/`: 926059b-k (Port 4324), Basis a8e049f (4323), Ausgangsstand 707a93d (4310). Grün auf `/`: Text v2 (MIKROTEXTE), Pixel 0 auf allen anderen Seiten, SVG (2 begründete Abweichungen), axe, kern-klassen.
- a11y-zusatz `/` (belege/t2-926059b): besser bei Fokus unsichtbar 191→16, verdeckt 130→17; schlechter: Sprung rückwärts 0→2, Reflow 320 0→1, Textabstand 0→1, forced ohne Grenze 7→9, Fokus < 2 px 44→45 → Paket P3-16a läuft (Opus).
- Laufend: P3-16a (Barrierefreiheit), P3-14d (Navigationstests gegen 4321), P3-00g-B (Probeläufer-Basismatrix gegen 4310).
- Nächster exakter Schritt: P3-16a abnehmen → commit → neuer Kandidat `KANDIDAT="/" reinraum.sh HEAD` (freier Port) → a11y-zusatz `--seiten / --ansichten m375,d1440` gegen p0-ausgangsstand, axe, fotos, Text v2 → P3-14d abnehmen → Suite + Sperrklinke gegen Kandidat → Mutationsprobe Kern-Ansichten → bewegung.mjs → Lighthouse verschränkt (ruhiges Fenster) → Slop (statisch + Jäger) → Jury 3 + Lockvogel → Probeläufer Kandidat → Fünf-Sekunden-Probe → INP → Gegenprüfer → `KANDIDAT_BASIS=<sha> freischalten.sh --commit /` → Push main → live-rauchtest + live-browser.
- Offen daneben: Test „Cookie-Einstellungen“ im Kartenplatzhalter (Kern `/`), Fünf-Sekunden-Probe Basis, INP-Basis, Slop-Stichprobe Vorlagen.
