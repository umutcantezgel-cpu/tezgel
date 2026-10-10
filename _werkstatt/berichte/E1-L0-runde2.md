# E1-L0-runde2 · Planprüfung PLAN.md (Runde 2, letzte Runde)

Prüfer E1-PRUEF-01 · 2026-10-10 · Maßstab AUFTRAG 5 und 8, ABNAHME Z-01 bis Z-10, KERN v2. Z. = Zeile in PLAN.md. Stand: 116 Tabellenzeilen (88 ARBEITSMODELL, 28 ORCHESTRATOR). PLAN.md nicht geändert.

## Ergebnis je Prüfpunkt
- A Kriterien → Pakete: BESTANDEN. Z-01 über KÜR-01 bis KÜR-09 und C-END; Z-09 über C-PRUEF-01, KÜR-07 und E4–E6-BAU; Z-10 über C-DOK-01, C-ORCH-01, C-END. M-09 (MENSCHEN.md) steht jetzt in den Schreibrechten von E1-ORCH-01.
- B Kriterium und Modell: BESTANDEN. Alle Zeilen haben ein Kriterium und ein eindeutiges Modell; Sammelzeilen aufgelöst.
- C Dateihoheit: BEFUNDE (C-1 bis C-4).
- D Muster und Maßstab: BEFUNDE (D-1).
- E Abhängigkeiten: BESTANDEN. Keine Zirkel; alle Referenzen existieren.
- F Pflicht und Kür: BESTANDEN. KÜR-01 bis KÜR-09 mit Schwelle; KÜR-08 mit Messweg.

## Status der 22 Befunde aus Runde 1
19 behoben. Befund 9 und 12 sind teilweise offen und werden als C-1 und C-4 geführt. Befund 7 (E0-ORCH-01, Paar erledigt) hat keine Wirkung mehr.

## Befunde
C-1. Importregel E3: E3-BAU-07 (W1, Z. 72, /ueber-uns) importiert CompanyHistory (`src/app/ueber-uns/page.jsx` Z. 7, 132). E3-ORCH-05 (W2, Z. 77) ändert CompanyHistory. Vorschlag: CompanyHistory-Umbau als Komponentenpaket nach E3-W1; E3-BAU-07 nach E3-W2; E3-ORCH-05 nach E3-W3.

C-2. Gleiche Welle E6-W: E6-BAU-08 (Z. 123, /login) importiert PageWrapper (`src/app/login/page.jsx` Z. 7). E6-BAU-11 (Z. 126) baut PageWrapper um, ohne Abhängigkeit. Vorschlag: E6-BAU-08 um E6-BAU-11 ergänzen.

C-3. Referenzen vor später umgebauten Komponenten: `/` (E2-ORCH-08, Z. 52) importiert GradientText und SpotlightCard (`src/app/page.tsx` Z. 42–43), die E6-BAU-11 umbaut. `/kontakt` (E2-ORCH-09, Z. 53) importiert LocationContact (`src/app/kontakt/page.jsx` Z. 7, 125), das E3-BAU-21 (Z. 91) umbaut. Vorschlag: E2-ORCH-08 und -09 ersetzen diese Imports durch Bausteine; Ziel-Text ergänzen.

C-4. KÜR-01 (Z. 131) hat keine Dateiliste („in der Aufteilung von E4-BAU-*/E5-BAU-*“). Die E5-Listen (Z. 105, 108, 110, 112) enthalten vier Hub-Seiten, die KÜR-04 (Z. 134) schreibt; KÜR-02 (Z. 132) und KÜR-05 (Z. 135) können ebenfalls betroffen sein. Vorschlag: exakte Liste der 30 Seiten; Überschneidungen streichen oder KÜR-01 nach KÜR-02, -04, -05 hängen.

D-1. KÜR-05 (Z. 135) und KÜR-07 (Z. 137) sind Stufe-2-Pakete ohne benanntes Muster. Vorschlag: KÜR-05 „Muster E3-ORCH-02“; KÜR-07 „Muster E3-BAU-10“ und Abhängig E3-BAU-10.

## Geprüft ohne Befund
- E3-W1 und E3-W2: Seiten gegen Komponenten derselben Welle ohne Verletzung. E3-W1: BAU-02, -03, -09, -10 importieren nur eigene oder E2-Komponenten. E3-W2: BAU-01, -04, -05, -06, -08 importieren W1-Komponenten mit deklarierter Abhängigkeit.
- Überschneidungen in allen Wellen: keine außer dem historischen E0-Paar.
- E3-W3 (ORCH-01, -03, -04): Abhängigkeit auf W2-Seitenpakete, keine Dateiüberschneidung.
- Zirkel: keine.

## Hinweise (keine Befunde)
E2-Tor und E3-Tor bilden nicht alle Pakete ihrer Etappe explizit ab (z. B. E2-BAU-01 bis -04); die Wellenfolge deckt sie. KÜR-04 nennt acht Hubs, die von den Erzählansichten in HAUPTANSICHTEN.json abweichen.

Methode: Auswertung der Tabelle per Skript (Abhängigkeiten, Schreibrechte je Welle), Importsuche in src/app (direkte Importe, CSS ausgenommen).
