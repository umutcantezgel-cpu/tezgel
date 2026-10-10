# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Phase: P3 (Durchstich `/`, ruhend) · L0 abgeschlossen
- Letzter grüner Commit live: 9542dd9 (Kern-Pakete ruhend, T1 streng gleich); letzter Bestandseingriff live: f213507 (Hooks WhatsApp/Banner/Kurzformular, T2 grün, Live-Browser grün)
- Ruhend auf main: Kern-Layout (Kopf B, Fuß, Leiste, WhatsApp-Kanal, Banner, Sprite), Grundbausteine, Icons, Motive, alle Startseiten-Abschnitte, Startseiten-Entwurf `(kern)/_entwurf/page.tsx`, Kern-404-Entwurf.
- Variantenwahl E-022: Kopf B + Einstieg B unter Auflagen; laufend: P3-06c (Kopf-Auflagen), P3-09c (Einstieg-Auflagen).
- Server: 4310 Ausgangsstand 707a93d · 4320 Vorschau 5acf806-v (ohne Kopf im Layout).
- Nächster exakter Schritt: nach P3-06c/P3-09c → Vorschau `VORSCHAU="/ …" reinraum.sh HEAD` (Port 4320), Fotos `/` in 4 Ansichten + Mega-Blatt + Mobilmenü + Banner-Erstbesuch, Selbstprüfung (Überlauf, Konsole, axe, Klassen-Abdeckung `kern-klassen.mjs`), dann Kandidat `KANDIDAT="/" reinraum.sh HEAD` (Port 4321) → P3-14a–d Testschreiber (Haiku) + Opus-Gegenprüfer → T2 voll (Suite, Text v2 mit MIKROTEXTE, SEO, Logo, axe + a11y-zusatz, Überlauf, Bewegung, SVG, Pixel 0 auf allen anderen Seiten, Lighthouse verschränkt auf `/`, Slop, Jury 3 + Lockvogel) → `KANDIDAT_BASIS=<sha> freischalten.sh --commit /` → Push → Live-Prüfung.
- Offen: Basis-Matrix Probeläufer (15 Läufe), Fünf-Sekunden-Probe, Slop-Stichprobe Vorlagen, INP-Basis im ruhigen Fenster (`node inp.mjs --satz p0-ausgangsstand --seiten /,/kontakt,/blog --ansichten m375`) – vor P3-16 nötig (T3).
- Werkzeug-Stand: server.sh beendet ganze Prozesskette (75bf4da); tor-t1.sh Importregel N-20 präzisiert (96cd58d).
