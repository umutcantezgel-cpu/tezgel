# Rückgabe P0-TEST-08 F-10/F-15 (Kurzfassung)
- 16 Tests: desktop 14/14 (+2 nur mobil übersprungen), mobil 15/15 (+1 nur desktop); Mutationsprobe durch den Testschreiber (falsche Nummern → 4 Tests rot) bestanden.
- Befunde: nur das Widget belegt den WhatsApp-Text vor (Hero, FinalCTA, Fußbereich, Mobil-Leiste ohne Text) – Ausgangsstand, keine Funktion verloren; `tel:+49 6441 4483567` mit Leerzeichen in DirectContactCard (aus src/shared/config/site.ts) → in P5 vereinheitlichen (Mikrotext/Attribut, gleiches Ziel); FloatingDock toter Code (P4).
