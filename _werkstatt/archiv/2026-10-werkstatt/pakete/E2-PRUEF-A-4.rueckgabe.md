# E2-PRUEF-A-4 · Rückgabe

**GEÄNDERTE DATEIEN**
Keine. `git status --porcelain` ist leer. Belege liegen in `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-A-4/`.

**WAS UND WARUM**
Prüfstufe A für E2-ORCH-09 und E2-ORCH-04-N2 (Dateien laut Briefing, Routen /kontakt, /termin, /, /faq), dazu V-02, Textvergleich, Bilder, Bewegung und Werte. Nichts behoben.

**GEMEINSAME DATEIEN**
Keine Änderungswünsche.

**PRÜFUNG UND ERGEBNIS**
Gesamt ROT (Exit 1), allein wegen der Funktionstests. Laufzeit 851 s.
- Typprüfung (tsc): GRÜN, 0 Fehler, 0 in eigenen Dateien. `pruefe-a.log`, `tsc.txt`.
- Lint (eslint): GRÜN, 0 Fehler, 1 Hinweis (siehe OFFENE FRAGEN 3). `eslint.json`.
- Funktionstests: ROT. 306 Tests: 283 erwartet, 3 unerwartet, 20 übersprungen, 0 flaky. 13 Specs (ALLE, wegen globals.css). `pw.json`.
  Alle 3 Fehlschläge: `funktion-express-funnel.spec.mjs`, Projekt desktop, F-03 /kontakt.
  1. „Schritte vor und zurück: Auswahl bleibt erhalten, „Ändern“ führt zu Schritt 2“. Meldung: `expect(locator).toBeVisible() failed`, Locator `getByText(/Projekt: Balkon & Terrasse/)`. Einzelwiederholung: GRÜN, 2 von 2 (mobil und desktop). `wiederholung.json`.
  2. „Gutfall mit allen Angaben: Projekt, Fläche, Zeitraum, Ort, Kontakt und Notiz landen in der Nutzlast“. Meldung: `expect(received).toMatchObject(expected)`, `- Expected - 2`. Nicht wiederholt.
  3. „WhatsApp-Alternative mit gültigen Angaben: Ziel mit vorbelegtem Text, Zustand „WhatsApp geöffnet“, kein Versand“. Meldung: `expect(received).toContain(expected)`, Substring „Projekt: Balkon & Terrasse“. Nicht wiederholt.
- Bilder: GRÜN. HTTP 200 für /kontakt, /termin, /, /faq in m390 und d1440; Überlauf 0; Überlappung 0.
- Textvergleich gegen e0: GRÜN. Unerlaubt entfernte Spannen: 0. Entfernte Zeilen: 0 (alle 242 Seitenschlüssel). Erlaubt entfernte Spannen: 78. Hinzugefügte Zeilen: 174.
- V-02 gezielt (`funktion-termin`, 2 Projekte): 2 von 2 GRÜN. `v02.json`.
- F-12 aus dem Hauptlauf (`funktion-einwilligung`): 16 erwartet, 0 unerwartet, beide Projekte.
- Werte (6 Dateien): 530 Klassenvorkommen (138 eindeutig), 0 Befunde.

**BILDBELEGE**
- Vollbild /kontakt: `voll-kontakt/m390-voll.jpg`, `t768-voll.jpg`, `d1440-voll.jpg`
- #termin-buchen: `termin/m390.jpg`, `t768.jpg`, `d1440.jpg`
- Prüfstufe A: `bilder/{kontakt,termin,start,faq}/{m390,d1440}.jpg`
- Bewegung (je `ergebnis.json`): `bewegung-{register,reduziert}-{m390,d1440}/`
- Register /kontakt: m390 hat 3 erkannte Kennungen (aufklappen, druck, zustand), 0 unbekannt, 6 Übergangsgruppen ohne data-motion (outline-*); d1440 gleiche Kennungen, 1 Gruppe ohne data-motion. Hover 20 geprüft, 0 Fehler.
- Reduziert /kontakt: m390 0 Befunde (134 geprüft). d1440 1 Befund: `svg.inline-block.shrink-0`, Kennung zustand, Eigenschaft rotate, 3 Elemente.
- Konsole /kontakt (Einzelbild, echte Uhr): je Ansicht 2 Meldungen, React-Hydrierungsmeldung („A tree hydrated but some attributes of the server rendered HTML didn't match the client properties“) und „ERR_BLOCKED_BY_CLIENT.Inspector“. In Prüfstufe A: /kontakt 4 (2 je Ansicht), die übrigen Routen 0.

**OFFENE FRAGEN**
1. Die drei Fehlschläge betreffen denselben Text „Projekt: Balkon & Terrasse“ (desktop). Nur einer wurde wiederholt (grün). Ob die anderen zwei stabil fehlschlagen, ist nicht geprüft.
2. Die Hydrierungsmeldung auf /kontakt erscheint bei echter Uhr (2026-10-10), in V-02 (Uhr auf heute + 1) nicht. Ob das die V-02-Fehlerklasse ist, deute ich nicht.
3. eslint meldet für `src/app/globals.css` „File ignored because no matching configuration was supplied“. Das ist ein Konfigurationshinweis, keine Codewarnung.
4. Werkzeug-Nebenwirkungen (vorgegeben, außerhalb von `$S`): Semaphor-Dateien `pruefe-a.slot1/2` im Scratchpad-Wurzelordner; Textcache über den Symlink `_werkstatt/cache` → `scratchpad/werkstatt-cache/texte/E2-PRUEF-A-4/`.
5. Die 20 übersprungenen Tests sind nicht einzeln den fixme-Einträgen zugeordnet.
6. [BAU-04]: keine Befunde aus `LocalDominanceMap.tsx`.
