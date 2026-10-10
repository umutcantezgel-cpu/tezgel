# ENTSCHEIDUNGEN · Werkstatt-Lauf

Chronologisch. Folgenreiche Entscheidungen mit Denkprotokoll (Ziel → drei Wege → Bewertung nach Nordstern, Kriterien, Risiko, Aufwand → Umkehrprobe → Folgen zweiter Ordnung). Vorentscheidungen des Vorlaufs stehen in `_relaunch/ENTSCHEIDUNGEN.md` (E-000 bis E-013) und gelten nur, soweit hier übernommen.

---

## E-001 · Vorlauf übernehmen statt neu erkunden und neu wählen (Denkprotokoll)
- **Ziel:** Laufzeit in auslieferbare Verbesserungen statt Varianten und Doppelprüfungen (Nordstern), ohne die Pflicht „selbst erkunden“ zu verletzen.
- **Wege:** (1) Vollständige Neuerkundung und neue Richtungswahl. (2) Vorlauf-Ergebnisse ungeprüft übernehmen. (3) Vorlauf übernehmen, aber gezielt gegen den heutigen Code prüfen und Lücken schließen.
- **Bewertung:** (1) wiederholt 3.600 Zeilen Atlas, drei Stilkacheln und eine Jury – genau die „Varianten und Doppelprüfungen“, die der Auftrag vermeiden will; der Code ist seit dem Atlas nur um ungenutzte Dateien geschrumpft. (2) riskiert veraltete Befunde. (3) kostet fünf Kundschafter-Pakete, belegt die Aktualität (Stichprobe 9/10 korrekt, 1 teilweise; E0-KUN-05) und schließt die Lücken des neuen Auftrags (Werkzeuge, Gerätegrößen, Hauptansichten).
- **Wahl: (3).** Richtung E-008 (Grundsystem „Fuge und Achse“ + Vertrauensschicht) und KERN v1 gelten; KERN v2 überführt v1 in die Gliederung K-001–K-012 dieses Auftrags und erweitert für AUSBAU maximal. Atlas, Funktionsliste, Funktionstests, Werkzeuge und Messbasis werden weiter genutzt. Berichte: `berichte/E0-KUN-01…05`.
- **Umkehrprobe:** Erweist sich die Richtung am Referenz-Tor als nicht tragfähig (Sichtabnahme < 8 nach zwei Anläufen), wird sie an der Referenz geschärft – nicht verworfen; ein Richtungswechsel wäre ein Planwechsel nur bei unerreichbarem Kriterium.
- **Folgen zweiter Ordnung:** Die Ausgangswerte müssen in den neuen Gerätegrößen und für 12 statt 7 Hauptansichten neu erhoben werden (E0-PRUEF-03); die Vorlauf-Messungen bleiben Vergleichsmaterial.

## E-002 · Was aus dem Vorlauf nicht mehr gilt
- Push auf `main`/Live-Gang je Welle (Vorlauf E-000, E-003, E-005) – dieser Auftrag: nur ARBEITSBRANCH, nie veröffentlichen.
- Rückführung, alte Jury-Rubrik (4 Kategorien), Slop-Katalog S-xx, Phasen P3–P7 – ersetzt durch Rubrik (6 Kategorien), Katalog „Generisches“ und Etappen E2 ff. dieses Auftrags.
- Übernommen als Pflicht: Vorrat V-01 bis V-06 (`_relaunch/PLAN.md`, Abschnitt Vorrat).

## E-003 · Arbeitsordner `_werkstatt/`
- `_relaunch/werkzeuge` → `_werkstatt/werkzeuge` per `git mv` (Historie bleibt), Pfade angepasst; `_relaunch/` bleibt unverändert als Archiv des Vorlaufs; `GRUNDMENGE.json` als Kopie nach `_werkstatt/` (von `lib.mjs` relativ gelesen).
- Ausschluss von `_werkstatt` aus Build, Lint, Typprüfung, Tailwind-Quellen und Vercel (tsconfig `exclude`, eslint `globalIgnores`, `@source not`, `.vercelignore`).
- `_werkstatt/cache` und `_werkstatt/werkzeuge/node_modules` sind Symlinks in den Scratchpad (gitignored) – Rohbilder, Messrohdaten und Werkzeug-Abhängigkeiten liegen außerhalb des Repos.

## E-004 bis E-012 · Systementscheidungen
Im genehmigten Grobplan (`PLAN.md`, Abschnitt Grundsatzentscheidungen) festgelegt; die vollständigen Denkprotokolle folgen in E1 zusammen mit KERN v2:
E-004 Designsystem global mit eindeutigen Namen · E-005 Bewegung CSS-first · E-006 eigene Icon-Familie · E-007 AUSBAU maximal konkret (3D/Shader entfallen) · E-008 WaterCursor/WhatsApp/Banner · E-009 Menü vor Hydrierung (Popover) · E-010 Tempo an der Ursache (Provider verlegen, Schriften) · E-011 Funnels zerlegen vor Gestaltung · E-012 Modellnamen nur als Rollen.

## L6 · Lernen
| Datum | Rolle | Pakettyp | Fehler | Häufigkeit | Maßnahme |
|---|---|---|---|---|---|
| 10.10. | Kundschafter (Planung) | Workflow-Agent | Leerer Auftrag („NaN“) bei einem von fünf Agenten | 1 | Paket über Agent-Werkzeug neu gestartet; Briefings künftig als Datei + kurzer Verweis |
