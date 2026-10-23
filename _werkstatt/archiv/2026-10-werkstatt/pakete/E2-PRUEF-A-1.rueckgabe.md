# E2-PRUEF-A-1 · Rückgabe (Prüfstufe A, Lauf 1: E2-ORCH-01 bis -05a)

## GEÄNDERTE DATEIEN
Keine Repo-Datei außer dieser Rückgabe. Läufe schrieben nach Scratch und `_werkstatt/cache`.

## WAS UND WARUM
Umfang: 59 Dateien aus 8bad228, 75511cf, ac5ea17, 96070c6, 8c983b9, 53f66a1 (Start-HEAD a0180b0). Während des Laufs kamen 72ce2c4 (05a) und unkommittierte Baumeister-Dateien hinzu; Befunde daraus sind mit [BAU] markiert.

Paketurteile: 01 ROT (Systemwerte) · 02 GRÜN · 03 ROT (Darstellung) · 04 ROT (Text, Z-05) · 05a ROT (Text, Z-05).

Befunde nach Schwere:
- F1 Text (Z-02): 40 unerlaubt entfernte Textspannen (/ 27, /kontakt 5, /bad 4, /faq 4). Kundenstimmen-Fußzeilen (04, protokolliert in `_werkstatt/TEXTVORSCHLAEGE.md` Z. 8–9), Kopfzeilen (3 je Seite, 05a), Labels von Leiste/Abschluss („Kostenloses Vor-Ort-Aufmaß anfordern“; Quelle 04/05a nicht eindeutig), „verifizierte“ in `src/components/reviews/GoogleReviewsBadge.tsx` [BAU].
- F2 Test `_werkstatt/werkzeuge/tests/funktion-konfigurator.spec.mjs:150` [mobil]: Timeout 60 s; Wiederholung grün (7,2 s). Ursache offen.
- Z1 `/kontakt` m390: Überschrift „Direkter Kontakt“ #0A1129 auf #171717, ≈1,04:1 (berechnet); Karte nicht im Umfang.
- Z2 d1440 reduziert: 3 Chevrons, `src/components/common/Header.jsx:142` (`rotate-180`, `transition-transform`), Lage-Übergang (05a).
- Z3 Register (Z-05): ohne `data-motion` m390 5, d1440 9 Gruppen (`kern/stile.ts` 04, `input#sf-name` 04, WhatsApp-Puls 05b).
- Z4 SVG (Z-06): je Seite 1 dekoratives Inline-SVG ohne `focusable="false"`, vermutlich Cookie-Schild (`CookieConsent.tsx`, Bestand).
- S1 `werte.mjs` (Z-03): 11 Befunde, alle in `src/app/globals.css`. Getrennt: 8 bekannte Altblöcke (WhatsApp 458/462, WaterCursor 516–519, Laufband 550). Nicht zugeordnet: `.plate-enter` 435 (0,38 s, ungenutzt; Kommentar 418–422 nennt 05a), `.fugen-bevel` 439–441 (rgba ×2, ungenutzt, Bestand 745335f).
- D1 m390 `/`: Cookie-Schild überdeckt „S“ in „Staubschutzgarantie“; mobiler WhatsApp-Knopf (K-009: nur Leiste; 05b).
- D2 d1440 `/`: Laufband schneidet „Nivelliert…“ ab; der Überlauf-Check erkennt das nicht.
- D3 Schaufenster m390: „fussbodenheizung“ kollidiert mit „grossformat“ (`src/app/werkstatt-schaufenster/page.dev.tsx`, 03).
- D4 d1440 Kopf: Telefonnummer nur als Icon; K-009 verlangt „Telefon in Mono“ (05a).
- D5 m390 Überlappung nur mit Cookie-Schild und WhatsApp-Knopf (ohne `data-feste-ebene`, 05b); d1440 durchgehend 0.

## GEMEINSAME DATEIEN
- `src/app/globals.css`: Zeilen 434–436 (`.plate-enter`) und 438–441 (`.fugen-bevel`) entfernen; Laufband (549–550) zuordnen.
- `_werkstatt/werkzeuge/werte-regeln.json`: Ausnahmen `0s !important` (bewegung.css) und `lvh` (K-005 nennt nur dvh/svh) gegen ABNAHME Z-03 bestätigen. Die Ausnahme `src/app/werkstatt-schaufenster/**` steht nicht in der ABNAHME-Liste; ohne sie 0 Befunde.

## PRÜFUNG UND ERGEBNIS
- tsc GRÜN (0 Fehler). eslint GRÜN (0 Fehler; 24 Hinweise „File ignored“ für Nicht-JS). `npm test` 26/26 grün.
- Funktion, 292 Fälle: 278 grün, 13 übersprungen (fixme; Testdateien seit E0 unverändert), 1 Fehler (F2). ROT.
- Bilder m390/d1440: HTTP 200, Überlauf 0. Konsole `/`, `/kontakt`, `/faq`: je 4 Meldungen (je Ansicht Hydrierungswarnung plus gesperrte Dev-Anfrage); `/` und `/kontakt` wie Vorlauf (E2-AUF-01 Rückgabe Z. 43).
- Text ROT; Wiederholung gegen die eingefrorene HEAD-Basis identisch.
- SVG Dateien 38/38, 0 Befund. Bewegung `/werkstatt-schaufenster/bausteine`: 109 `data-motion`, 0 unbekannte Kennungen; reduziert m390 0 Befunde; Einzelbilder d1440: bei anriss, aufklappen, druck und zustand nur 12 Auslöser erfasst.

## BILDBELEGE
Unter `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-A-1/`: `crop/start-m390-erster-schirm.png` (D1) · `menue/d1440-mega-menue-offen.png` (D2) · `menue/m390-menueblatt-offen.png` und `menue/d1440-fokus-kopf.png` (ohne Befund) · `crop/kontakt-m390-600-920.png` (Z1) · `crop/schaufenster-m390-textkreuzung.png` (D3) · `einzelbild/*/{m390,t768,d1440}-voll.jpg`.

## OFFENE FRAGEN
1. Ursache F2? Der Zeitpunkt ist aus der Testreihenfolge geschätzt und fiel in die Phase der [BAU]-Schreibvorgänge (19:23–19:24).
2. `_werkstatt/belege/e0/texte/` (committed in db2619d): 364 Dateien im Arbeitsbaum geändert (Stand 20:01, Schreibzeit 19:58–20:01, Vorgang vermutlich noch aktiv). Urheber? Mein Vergleich mit der HEAD-Basis ist davon unberührt.
3. Laufband: Abbau in 05b (Briefing) oder E2-BAU-01 (Kommentar in globals.css)?
4. Z2: Rotation als Sofortzustand (0,01 ms) zulässig? D4 und Z2 nach 72ce2c4 (05a, nach Laufstart) neu prüfen.
5. Zuständigkeit für Z1 und D4.
6. `sig-flucht` (`src/components/kern/Einstieg.tsx:34`): fünf identische Einzelbilder. Erfassungsbeginn oder fehlende Animation?
7. PLAN nennt für 04 `kern/Feld.tsx` und `kern/Kundenstimme.tsx`; beide fehlen als Dateien (Feld in Feldraster.tsx, Kundenstimme in ReviewCarousel/ReviewCard). Bestätigen?
