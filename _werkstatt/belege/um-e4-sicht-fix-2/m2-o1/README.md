# M2-O1 · Prüfwerkzeug `sicht.mjs` (UM-E4-SICHT-FIX-2, Teil SF2-O)

- Übernommen aus `$SCRATCH/fix/sicht2/sicht.mjs` nach `_werkstatt/werkzeuge/sicht.mjs` und berichtigt: Im Modus `eingang` wartet das Skript nach `domcontentloaded` zwei Bilder ab (zweimal `requestAnimationFrame`, wie `rahmenAbwarten` in `einzelbild.mjs`) und hält erst dann die Animationen auf t an.
- Grund: Der Befund „Hauptnavigation verschwindet beim Erstbesuch“ (Anlauf 2, acht Ansichten) kam aus dem allerersten Rahmen vor der ersten Auswertung der Container-Abfrage `@7xl`. Er war ein Scheinbefund des Werkzeugs, keine Eigenschaft der Seite (endplan.json → nicht_umsetzen).
- Probe am 1.11.2026 gegen den Torstand a3c28d36 (Server 4324), `/bad`, d1440, alle neun Zeitpunkte 0 bis 1500 ms: Die Navigation steht in jedem Bild, auch bei 0 ms (`d1440-eingang-0000.png`, `-0150.png`). Keine Änderung an `Header.jsx`.
- Nutzung: `SICHT_BASE=http://127.0.0.1:<port> node sicht.mjs <ziel> eingang m390,d1440 <seite>` aus `_werkstatt/werkzeuge`.
