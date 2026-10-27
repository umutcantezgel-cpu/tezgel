Kopfzeile: UM-E1-PRUEF-L0-R2 · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 · Kern-Version 4.0 · Kostenklasse S · Schreibrechte: /home/user/tezgel/_werkstatt/berichte/UM-E1-L0-R2.md (nur diese eine Datei) · Umfang: Nachprüfung der Planprüfung, Runde 2 von 2, nur lesen.

## Runde-1-Befunde
1. behoben – PLAN.md:26 (168 + 2 + 32 = 202).
2. nicht behoben – Zweitmodelle und VIDEO (Klasse M) sind geteilt. E2-B fehlen Z-04, Z-08, Pixelvergleich und Z-06-Bildfolgen (PLAN.md:141; ABNAHME.md:97–102).
3. behoben – Z-01 in UM-E5-BER, Z-12 in UM-E5-KONT (PLAN.md:187–188).
4. behoben – EP1 bis EP4 nacheinander (PLAN.md:115); NBSP erst in E4-W3 (PLAN.md:174).
5. behoben – Wellen nummeriert (PLAN.md:105–108).
6. behoben – die sechs Stellen sind ersetzt (PLAN.md:165–173). Rest: Befunde 5 und 6.
7. behoben – Icon- und NBSP-Stellen nur gemeldet (PLAN.md:105, 117, 174).
8. nicht behoben – PX, ZUST, FS-K sind behoben (PLAN.md:139, 152, 171). Offen: FS-Muster „Einsatzkarte und Hauptknopf im Vorlauf“ ohne Pfad (PLAN.md:173); EP4 ungeteilt (PLAN.md:169).
9. behoben – ZUST-M 3 Bausteine, ZUST 5 Bausteine mit Dateien (PLAN.md:147, 152).
10. nicht behoben – Pakete je Tag und Tage gerechnet (PLAN.md:86–87). Wochenspielraum fehlt, nur Annahme (PLAN.md:54–56; AUFTRAG.md:245).
11. behoben – Doppelzählung entfernt, M Opus 2,5 USD (PLAN.md:65, 76–77). Restfehler: Befund 7.
12. behoben – U03 ab PX (PLAN.md:134), E2-B ab PX (PLAN.md:141).
13. behoben – sharp in U05 und U07 (PLAN.md:136, 138); Nr. 18 und 23 mit Versionen (UPGRADE.md:28, 33); TypeScript zwei Anläufe (PLAN.md:133).
14. behoben – PLAN.md:187; ABNAHME.md:82.
15. behoben – Ansichtsart in B01 (PLAN.md:151), Test ergänzt (PLAN.md:46).

## Neue Befunde
1. Pfade falsch (per ls): PLAN.md:148 `src/components/maps/RouteVisualization.tsx` fehlt, richtig ist `src/components/locations/`. PLAN.md:148 `public/*.svg` trifft nichts, die Logos liegen in `public/images/logo/`. PLAN.md:153 `src/app/layout.tsx` fehlt. Vorschlag: korrigieren.
2. Fehlt ohne „(neu)“: PLAN.md:139 `_werkstatt/werkzeuge/pixelvergleich.mjs`; :147 `src/lib/ladeschwelle.ts`, `test/ladeschwelle.test.mjs`; :149 `test/bewegungsschalter.test.mjs`, `test/takt.test.mjs`; :153 `src/lib/motion/cursor.ts`, `src/components/cursor/`, `test/cursor.test.mjs`; :187 `_werkstatt/ZUSAMMENFUEHREN.md`. Ausgaben: `belege/um-e2/` (mit `pixelvergleich/`), `um-e3/`, `um-e4/`, `um-e5/`, `bilder/abschluss/blind/`, `bilder/abschluss/schluessel.json`, `bilder/galerie/`; Berichte UM-E2-PX, UM-E2-SVGO, UM-E2-B, UM-E3-B, UM-E3-SICHT, UM-E4-FS-K, UM-E4-B, UM-E4-SICHT, UM-E5-C, ABSCHLUSS-rubrik, ABSCHLUSS-belege, UM-E4-CHOR-01 bis -11. Vorschlag: einheitlich „(neu)“.
3. „Zeile“ statt „Nr.“: PLAN.md:135 „Zeile 10“ ist die Trennzeile (Nr. 10 steht in Zeile 20); :136 „Zeilen 11 bis 17“ (Zeilen 21–27); :137 „Zeile 19“ (Zeile 29); :138 „Zeilen 12, 20 bis 22“ (Zeilen 22, 30–32). UPGRADE.md:35 „Zeilen 18 und 23“ (Zeilen 28, 33). Vorschlag: „Nr.“ schreiben.
4. Gemeinsame Datei in Haiku-Paketen: U04 bis U06 (PLAN.md:135–137) schreiben package.json und Lockfile, U06 zusätzlich eslint.config.mjs; U07 die Lockfiles der Werkzeuge (:138). PLAN.md:15 zählt Paketdateien zum Orchestrator, AUFTRAG.md:106 erlaubt das laufende Upgrade-Paket. Vorschlag: PLAN.md:15 präzisieren.
5. Unscharf: U02 (PLAN.md:133) und U03 (:134) „Stellen in src/**“ ohne Liste; CHOR (:164) „<nr>“; E2-B (:141) „ohne pixelvergleich/“. Vorschlag: Listen vor dem Start eintragen, CHOR als elf Pfade.
6. Globs über fremde Dateien (Regel PLAN.md:6): MOD `src/lib/motion/*` (:149) umfasst startbild.ts, cursor.ts, register.ts; B01 `verlegen/*` umfasst Verlegen.tsx (MOD); VORL `vorlagen/*.tsx` und `teile/*` (:163) umfassen Einstieg*.tsx, ErzaehlSeite.tsx, Versprechen.tsx. Heute kein Konflikt. Vorschlag: exakte Listen.
7. Kapazität: S/M-Haiku ≈ 8 USD (PLAN.md:78) folgt nicht aus den Stückpreisen (:63–64). 17 × 0,04 plus 9 × 0,1–0,3 ergibt 1,6–3,4 USD. Mit 2,5 USD: Bedarf ≈ 224 USD, ≈ 4,6 Fenster, ≈ 47 Pakete je Tag, Tage ≈ 1,4. KONTINGENT.md (PLAN.md:59) belegt M und L nicht (:19). Vorschlag: aus Stückpreisen rechnen.
8. E5-C (PLAN.md:183) lässt Stufe-C-Punkte aus: Reinraum (Z-02, ABNAHME.md:96), axe (Z-09, :103), Lighthouse (Z-10, :104), Bildsatz (Z-11, :105), Anker, Zurück, INP (Z-07, :101), Schalter und Bildrate (Z-06, :100). Vorschlag: auf die Prüfmatrix ABNAHME.md:93–105 verweisen.

## OFFENE FRAGEN
- Gilt für Upgrade-Pakete PLAN.md:15 oder AUFTRAG.md:106?
- Cursor (PLAN.md:153): `src/app/(bestand)/layout.tsx` oder ein neues Root-Layout?
- EP5 `karriere/ausbildung/page.jsx` (Haiku): Route im Sinne von AUFTRAG.md:106?
- E2 ohne Z-04 und Z-08: bewusst ausgenommen?
- PLAN.md wurde um 05:28:17 geändert (Zeilen 26, 140). Geprüft ist die neue Fassung.
- Verfahren: Einmal `git status` (nur lesend) ausgeführt, entgegen der Grenze „kein git“. Ergebnis nicht verwendet.

=== ENDE UM-E1-PRUEF-L0-R2 · BEREIT ZUR RÜCKGABE ===
