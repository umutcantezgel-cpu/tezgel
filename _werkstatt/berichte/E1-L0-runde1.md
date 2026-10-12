# E1-L0-runde1 · Planprüfung PLAN.md

Prüfer E1-PRUEF-01 · 2026-10-10 · Maßstab AUFTRAG 5/8, ABNAHME, KERN v2. Z. = Zeile in PLAN.md. 111 Tabellenzeilen ergeben 116 Pakete (92 ARBEITSMODELL, 24 ORCHESTRATOR).

## A · Kriterien: BEFUNDE
Alle Z-01 bis Z-10 haben Pakete. Z-02 bis Z-08 ausreichend; Z-10 mit Lücke.
1. Z-01 nein: Kür-Schwellen fehlen (21), Kür-Zeilen ohne Z-Kriterium (4).
2. Z-09 nein: Ersatzpfad-Lauf nur in Z. 62 (nur / und /kontakt). Vorschlag: „Ersatzpfad-Lauf Szenen-Ansichten (Z-09)“ in Z. 137 ergänzen.
3. Z-10: M-09 (MENSCHEN.md) fehlt in den Schreibrechten von E1-ORCH-01 (Z. 40). Vorschlag: ergänzen.

## B · Kriterium und Modell: BEFUNDE
4. Z. 128–136 (K-01 bis K-09): Kriterium „Nordstern (Kür)“ ist kein Z-Kriterium, Modell „ARBEITSMODELL bzw. ORCHESTRATOR“ mehrdeutig. Vorschlag: K-01 bis K-03 Z-04, K-04 Z-04/Z-05, K-05 Z-05, K-06 Z-02, K-07 Z-09, K-08 Z-07, K-09 Z-08; je Zeile ein Modell.
5. Sammelzeilen Z. 127 (drei Pakete; „|“ bricht die Zeile) und Z. 137 (vier Pakete). Vorschlag: je Paket eine Zeile.

## C · Dateihoheit: BEFUNDE
6. Überschneidungen: globals.css in Z. 42/43 (E2-W1, Z. 43 ohne Pfad); belege/e0 in Z. 36/37 (E0-W2); belege/c/** in Z. 137. Vorschlag: Z. 43 ohne globals.css; Z. 36 `ausgang/**`, Z. 37 `funktion/**`; Z. 137 je Paket Unterordner.
7. Z. 30 (E0-ORCH-01, `_werkstatt/*`, erledigt) überschneidet Z. 31 und 39. Vorschlag: Pfade präzisieren.
8. Z. 80–84: Welle „E3-W1/W2“, Schreibrechte „(Teil n)“. Vorschlag: eine Welle; Dateien laut E-011 nennen.
9. Importgraph (Z. 18) verletzt: Z. 65 importiert Funnel aus Z. 85–88; Z. 68/69 importieren Z. 90 (gleiche Welle); Z. 70/77 importieren Z. 80–84; Z. 71 importiert CompanyHistory (Z. 76, W2). Vorschlag: Komponenten vor Seiten schneiden.
10. Doppelte Eigentümer: `common/WaterCursor.tsx` (Z. 47, 59) und `maps/ContactMapWrapper.tsx` (Z. 58, 59; PLAN Z. 312). Vorschlag: Z. 47 streichen; Z. 58 ohne ContactMapWrapper.
11. Z. 59 (E2-AUF-01): nur Verweis statt Dateiliste. Vorschlag: 13 Pfade aus E0-KUN-03 Abschnitt 3 eintragen.
12. Z. 128–136: Schreibrechte „festgelegt beim Start der Kür“ (PLAN Z. 410 verlangt Liste). Vorschlag: je Zeile eintragen.
13. Z. 60 und 61 Welle „laufend“; Z. 61 Schreibrecht „Rückgabe“; Z. 127 Welle „Etappentor“. Vorschlag: konkrete Welle, Dateimuster.
14. E0-PRUEF-04 (Z. 37) schreibt `werkzeuge/tests/…`; PLAN Z. 483 legt Tests dem Orchestrator auf. Vorschlag: Test dem Orchestrator zuweisen.
Bestanden: globals.css, layout.tsx, next.config.ts, package.json nur bei ORCHESTRATOR (außer 6).

## D · Muster: BEFUNDE
15. Z. 78 (E3-BAU-09): Abhängig E2-ORCH-05c, kein Referenzpaket, kein Muster. Vorschlag: E2-Tor; Muster „/kontakt (E2-ORCH-09)“.
16. Z. 80–87 (E3-BAU-11 bis -18): „Formular-Muster“ ist undefiniert. Vorschlag: Pfad nennen (E2-ORCH-08).
17. Z. 53 (E2-GRAF-01): Ziel „telefon“, Schreibrecht „mail“. Vorschlag: angleichen.

## E · Abhängigkeiten: BEFUNDE
18. Zirkel: K-01 bis K-09 → „Pflicht erfüllt“ (Z. 13 zählt C dazu) → C-PRUEF (Z. 137) → „Kür“. Vorschlag: Z. 13 auf „E0–E6“; „Pflicht erfüllt“ → „E6-Ende“.
19. Zirkel: E3-PRUEF-B (Z. 91, „E3“) und E3-SICHT (Z. 92). Vorschlag: Z. 91 auf E3-BAU-01 bis -21 und E3-ORCH-01 bis -05.
20. Selbstbezug E6-ORCH-01 (Z. 126, „E4–E6“); „Etappe“ (Z. 127) ist unbestimmt. Vorschlag: Pakete nennen.
Übrige Referenzen existieren.

## F · Pflicht und Kür: BEFUNDE
21. K-02 bis K-07 (Z. 129–134) ohne Schwelle (Anhang Z. 351–356 ebenso). Vorschläge: K-02 „3 von 3 Verbänden ohne JS“; K-03 „Vorschau in 100 % der Schritte“; K-04 „8 von 8 Erzählansichten“; K-05 „100 % der 13 [stadt]-Paare“; K-06 „12 von 12 Hauptansichten“; K-07 „13 von 13 Ratgebern“.
22. K-08 (Z. 135): „ohne Befund“ ohne Messweg. Vorschlag: axe und Lauf ohne JS nennen. K-01 und K-09 erfüllt.

## Offene Fragen
- Gilt die Tabellenzahl (116) oder die Textzahl (≈140, Z. 22)?
- Register-Einträge (Z. 9) ohne Haiku-Paket.
- Anhang-Haiku-Spur (Z. 430–434) fehlt in der Tabelle.
- Prüfer „schreibt Tests“ (AUFTRAG 5) gegen Testhoheit (Z. 483).

Bildbelege: keine (reine Dokumentprüfung).
