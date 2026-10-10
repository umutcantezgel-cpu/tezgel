# E1-PRUEF-01 · Rückgabe · L0-Planprüfung Runde 1

GEÄNDERTE DATEIEN
- `_werkstatt/berichte/E1-L0-runde1.md` (neu)
- `_werkstatt/pakete/E1-PRUEF-01.rueckgabe.md` (neu)
Sonst nichts; PLAN.md, ABNAHME.md und KERN.md unverändert.

WAS UND WARUM
Planprüfung nach Checkliste A bis F. Der Plan ist erst nach der Korrektur unten reif für Runde 2. Blocker: zwei Zirkel (K-Positionen und C-PRUEF; E3-PRUEF-B und E3-SICHT), Z-01 und Z-09 nicht ausreichend, Überschneidungen in E0-W2, E2-W1 und C-PRUEF, Importverletzungen in E3-W1. Fundstellen und Begründungen: `_werkstatt/berichte/E1-L0-runde1.md`, Befunde 1 bis 22.

GEMEINSAME DATEIEN (nur Orchestrator; PLAN.md nicht geändert). Exakte Änderungen an `_werkstatt/PLAN.md`:
1. Z. 13: „alle Pakete E0–E6 und C der Liste unten“ → „alle Pakete E0–E6“.
2. Z. 128–136 (K-01 bis K-09): Abhängig „Pflicht erfüllt“ → „E6-Ende“; Modell eindeutig; Kriterium K-01 bis K-03 Z-04, K-04 Z-04/Z-05, K-05 Z-05, K-06 Z-02, K-07 Z-09, K-08 Z-07, K-09 Z-08, jeweils mit Z-01; Schreibrechte als Dateiliste.
3. Z. 129–134 (K-02 bis K-07): Schwelle nach Befund 21 ergänzen.
4. Z. 127: in drei Zeilen E4-, E5-, E6-PRUEF-B; Abhängig je E4-BAU, E5-BAU bzw. E6-BAU; Schreibrechte `belege/e4/**` usw. ohne „|“.
5. Z. 137: in vier Zeilen C-PRUEF-01 bis -04; Schreibrechte `_werkstatt/belege/c/01/**` bis `04/**`; Ziel um „Ersatzpfad-Lauf Szenen-Ansichten (Z-09)“ ergänzen.
6. Z. 91: Abhängig „E3“ → „E3-BAU-01 bis -21, E3-ORCH-01 bis -05“.
7. Z. 126: Abhängig „E4–E6“ → „E4-BAU-01 bis -11, E5-BAU-01 bis -11, E6-BAU-01 bis -11, E4/E5/E6-PRUEF-B“.
8. Z. 43 (E2-ORCH-02): Schreibrecht „globals.css“ streichen; Register-CSS nach `src/lib/motion/register.css`.
9. Z. 36, 37: E0-PRUEF-03 auf `_werkstatt/belege/e0/ausgang/**`, E0-PRUEF-04 auf `_werkstatt/belege/e0/funktion/**`; Testdatei `werkzeuge/tests/funktion-tracking.spec.mjs` dem Orchestrator zuweisen.
10. Z. 80–84: Welle „E3-W1/W2“ auf eine Welle setzen; Schreibrechte als exakte Dateiliste nach E-011.
11. Welle E3-W1 nach Befund 9 neu schneiden: Komponenten (Z. 80–90) vor Seiten (Z. 65, 68–71, 77).
12. Z. 47 (E2-ORCH-05b): `src/components/common/WaterCursor.tsx (entf.)` streichen (Eigentümer E2-AUF-01); Z. 58 (E2-BAU-04): `maps/**` ohne `ContactMapWrapper.tsx`.
13. Z. 59 (E2-AUF-01): 13 Pfade aus E0-KUN-03 Abschnitt 3 exakt eintragen.
14. Z. 60, 61: Welle „laufend“ durch konkrete Welle ersetzen; Z. 61 Schreibrecht „Rückgabe“ durch `_werkstatt/pakete/E2-PRUEF-W-*.rueckgabe.md`.
15. Z. 78 (E3-BAU-09): Abhängig „E2-ORCH-05c“ → „E2-Tor“; Muster „/kontakt (E2-ORCH-09)“ nennen.
16. Z. 80–87: „Formular-Muster“ durch Pfad ersetzen (E2-ORCH-08).
17. Z. 53 (E2-GRAF-01): „telefon“ an die Schreibrechte angleichen.
18. Z. 30 (E0-ORCH-01): Schreibrecht `_werkstatt/*` präzisieren.
19. Z. 40 (E1-ORCH-01): `_werkstatt/MENSCHEN.md` ergänzen (M-09).
20. Z. 22–23: Paketzahl 116 (92/24) und Kapazität neu rechnen.

PRÜFUNG UND ERGEBNIS
- A Kriterien: BEFUNDE. Z-01 und Z-09 nicht ausreichend; Z-02 bis Z-08 ausreichend; Z-10 mit Lücke.
- B Kriterium und Modell: BEFUNDE. 9 Kür-Zeilen, 2 Sammelzeilen.
- C Dateihoheit: BEFUNDE. 3 Überschneidungen, Importgraph in E3-W1, 2 doppelte Eigentümer, unvollständige Schreibrechte (K-Zeilen, E2-AUF-01, E2-PRUEF-W), Testdatei bei E0-PRUEF-04. Gemeinsame Dateien nur in ORCHESTRATOR-Zeilen, außer E2-W1.
- D Muster: BEFUNDE. 1 Paket ohne Referenz, 1 undefiniertes Muster, 1 Widerspruch; 61 Stufe-2-Zeilen geprüft.
- E Abhängigkeiten: BEFUNDE. 2 Zirkel, 1 Selbstbezug, 1 unbestimmte Angabe; übrige Referenzen existieren.
- F Pflicht und Kür: BEFUNDE. K-02 bis K-07 ohne Schwelle; K-01 und K-09 erfüllt; K-08 ohne Messweg.
- Zählung: 111 Tabellenzeilen, 116 Pakete, 10 Kriterien, 9 Kür-Positionen. Methode: Skript-Auswertung der Tabelle, Import-Suche in src/app.

BILDBELEGE
Keine. Reine Dokumentprüfung, kein Browser- oder Bildlauf.

OFFENE FRAGEN
1. Gilt die Tabellenzahl (116 Pakete) oder die Textzahl (≈140, Z. 22–23)?
2. Register-Einträge (Z. 9) brauchen ein Haiku-Paket; soll ein Grafiker sie setzen (AUFTRAG 5)?
3. Anhang-Haiku-Spur (Z. 430–434: Seitenpässe für 76 Seiten, Logik-Tests, Bausteine) fehlt in der Tabelle. Gewollt?
4. Prüferrolle „schreibt Tests“ (AUFTRAG 5) widerspricht der Testhoheit (Z. 483). Welche Regel gilt?
5. Icons: Z. 8 nennt ≈36; die Tabelle ergibt 12 Muster plus 25 Haiku-Icons. Zahl klären.
6. Kür-Kennungen K-01 bis K-09 ähneln KERN K-001 bis K-012. Umbenennen (z. B. KÜR-01)?

=== ENDE E1-PRUEF-01 · BEREIT ZUR RÜCKGABE ===
