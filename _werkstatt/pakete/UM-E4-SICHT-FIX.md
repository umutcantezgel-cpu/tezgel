# UM-E4-SICHT-FIX · Nacharbeit nach Tor E4 Anlauf 1 · Rollen Baumeister (Opus, Arbeitskopie), Prüfer (Sonnet), Orchestrator · Kern-Version 4.4.1 · Kostenklasse L

## Ziel (E-103, E-104, Abnahme Z-05)
Anlauf 2 der Sichtabnahme mit belegtem Fortschritt auf allen zwölf Hauptansichten. Ziel nach Z-05:
- jede Hauptansicht ≥ 8,0;
- jede Erzählansicht ≥ 8,5;
- keine Kategorie unter 7,5.

Die Technik bleibt bestanden (UM-E4-B): Funktionen, Barrierefreiheit, Bewegung, Werte und Ladezeit dürfen nicht schlechter werden. Die Ausnahme A-1 bleibt.

## Grundlage
- **Befunde:**
  - Bericht `berichte/UM-E4-SICHT.md`;
  - 163 Befunde in `belege/um-e4/sicht-anlauf-1.json`;
  - Bildsatz von Anlauf 1 unter `$SCRATCH/e4b/`.
- **Maßnahmenplan `belege/um-e4-sicht-fix/endplan.json`** ist verbindlich. Er enthält:
  - 22 Maßnahmen M-A1 bis M-C9, je mit Ansichten, Dateien, Beschreibung, Befunden, Wirkung, Leitplanken, Risiko, Priorität und Teil;
  - 28 begründete Nicht-Umsetzungen;
  - die Teile A, B und C mit Reihenfolge;
  - die Erwartung und die offenen Fragen.
- **Entstehung des Plans:** Bündelung (Opus), zwei Gegenprüfungen (Sonnet, `belege/um-e4-sicht-fix/gegenpruefungen.json`), Zusammenführung (Opus).
- **Die Nicht-Umsetzungen gelten.** Wer davon abweicht, braucht einen Entscheidungsvermerk und die Zustimmung des Orchestrators.

## Entscheidungen des Orchestrators zu den offenen Fragen (E-104)
1. **Schwelle für `/standorte/wetzlar`: 8,0.**
   - `HAUPTANSICHTEN.json` (seit E0 unveränderlich) führt die Ansicht als `ort`. Z-05 rechnet nach dieser Liste.
   - K-010 regelt für Ortsseiten nur, was die Bewegung darf.
2. **H1 der Figur-Einstiege ab md in `fs-7`, wie auf `/` (M-A1 Nr. 2).**
   - Unter sm gilt `fs-7` nur, wenn `erstesbild.mjs` bei m360 mit 200 % und bei q844 grün bleibt; sonst `fs-6`.
   - Die Ruhe-Regel in KERN (K-003, „H1 in fs-6“) wird entsprechend nachgezogen.
   - Der Wunsch des Auftraggebers „mittig und kleiner als vorher“ (E-047) bleibt erfüllt: Die Startseite steht seit E-097 so und ist abgenommen.
3. **Aufklapper für Muss-Rückführungen sind zulässig** (EP1 bis EP3: Vergleich, Qualitätsversprechen; M-B4).
   - Der Inhalt bleibt vollständig im DOM.
   - Schnitte und Namen des Vergleichs stehen offen.
   - `lesbarkeit.mjs` öffnet vor dem Lesen alle `details`; der Inhalt zählt also weiter mit (G7).
4. **F-04 bleibt erfüllt**, wenn die Badanfrage im geschlossenen Aufklapper unter dem Hauptknopf steht (M-B3).
   - Die Funktionsspecs (`funktion-badanfrage` u. a.) bleiben grün, ohne Änderung an den Specs.
5. **Leitfaden mobil (M-A4 Nr. 2, Welle 2):** Gebaut wird die Fassung mit Abschnittsmarken.
   - Der Baumeister legt Bilder bei m390 von beiden Fassungen ab: nur Marken, und Lot mit 8 px plus Marken.
   - Der Orchestrator entscheidet am Messpunkt.
6. **Keine Querformat-Zuschnitte aus den Originalen.**
   - Das folgt der Annahme zu UM-12 („kein Ausschnitt als Ersatz“).
   - Ein Zuschnitt aus Bildschirmfotos mit höchstens 1320 px Breite macht das Bild nicht schärfer.
   - M-A2 wählt nur unter den vorhandenen Bildern aus ARBEITEN.
7. **Textvorschläge:** Der Baumeister schreibt seine Vorschläge in die Notiz, mit Ansicht, Stelle, heutigem Wortlaut, Vorschlag und Grund.
   - Der Orchestrator trägt sie in `TEXTVORSCHLAEGE.md` ein.
   - Gewartet wird nicht; bis zur Antwort des Auftraggebers bleiben die Texte, wie sie sind (Auftrag Abschnitt 0, K-011).
8. **Prüfmaterial für Anlauf 2:** Erstbesuch-Bildfolgen von 0 bis 1500 ms für alle Erzählansichten, B-01 von 0 bis 2400 ms und die Cursor-Zustände. Das baut der Orchestrator als Skript.
9. **`einzugsband` auf den Ortsseiten** löst bei Sichtbarkeit aus (IO 40 %), wenn das Band in die Lage rückt (M-C6). Nachgezogen werden:
   - `register.json`;
   - KERN K-008;
   - die Registertests.
10. **Keine Einsatzkarte als Ortsmoment auf den Ortsseiten.**
    - Nach E-037 wäre dafür eine Rückfrage nötig.
    - Das Einzugsband mit „Sie sind hier“ trägt den Ortsmoment (M-C6 Nr. 2).
11. **Schnittlinie:**
    - Priorität 1 bildet Welle 1, Priorität 2 bildet Welle 2.
    - M-B5 und M-B8 (Priorität 3) gehören nicht zu diesem Paket; sie kommen nur, wenn nach Welle 2 Kontingent bleibt.

## Wellen und Bauteile

| Welle | Bauteil | Maßnahmen in Reihenfolge | Grundlage |
|---|---|---|---|
| 1 | SF-A | M-A3 Nr. 1 (Schnurebene) → M-A1 → M-A2 → M-A3 übrige Punkte (`/fliesen`, `/blog`, Prop für `/kontakt`; ohne Ortsseiten) | HEAD |
| 1 | SF-B, parallel zu SF-A | M-B7 → M-B3 → M-B4 | HEAD |
| 1 | SF-C1 | M-C6 mit dem Ortsseiten-Teil von M-A3 → M-C1 → M-C3 → M-C8 | HEAD nach A und B |
| 1 | SF-C2, parallel zu SF-C1 | M-C2 → M-C5 mit M-C4 (Einsatzkarte als ein Bauteil) → M-C7 | HEAD nach A und B |
| Messpunkt | Orchestrator | Prüfkette Stufe A, Lighthouse mobil allein, CSS-Zuwachs gegen 4 KB gzip, kleiner Bildsatz. Danach Entscheidung über Welle 2 nach Kontingent | |
| 2 | SF-A2 | M-A5 → M-A4 | HEAD nach Welle 1 |
| 2 | SF-B2 | M-B2 → M-B1 → M-B6 | HEAD nach Welle 1 |
| 2 | SF-C3 | M-C9 | HEAD nach Welle 1 |

Danach folgen in dieser Reihenfolge:
1. die volle Prüfkette;
2. der Bildsatz für Anlauf 2 (Muster `$SCRATCH/e4b/e4b-2.sh` und `e4b-3.sh`, ergänzt nach Entscheidung 8);
3. UM-E4-SICHT Anlauf 2 mit frischen Opus-Prüfern;
4. das Tor E4 als E-105.

Nach L3 ist Anlauf 2 der letzte. Ist er nicht bestanden, geht die Arbeit mit E5 weiter, und die Lücke steht als offener Punkt in PLAN.

**Grenzen zwischen parallelen Bauteilen**, damit die Diffs zusammengehen:
- SF-A ändert in `ErzaehlSeite.tsx` und `WissensSeite.tsx` nur den Aufruf des Einstiegs und in `inhalt.ts` nur `WorumInhalt`.
- SF-B ändert in denselben Dateien alles andere. `ArbeitsSeite.tsx` ändert SF-B nur im Typ `Arbeitsabschnitt` und in der Funktion `Werkzeug`.
- SF-C1 und SF-C2 teilen keine Dateien bis auf die gemeinsamen CSS-Dateien. `Schritt1.jsx` und die Einsatzkarte gehören beide SF-C2.
- In `globals.css`, `bewegung.css` und `register.json` legt jedes Bauteil nur eigene, abgegrenzte Blöcke an oder ändert die Blöcke seiner Maßnahmen. Keine Umordnung, keine Formatierung fremder Blöcke.

## Arbeitsweise je Bauteil
- **Arbeitskopien:**
  - `$SCRATCH/sfix/<bauteil>/baum`: Abzug von HEAD, `node_modules` verlinkt.
  - `$SCRATCH/sfix/<bauteil>/vor`: gleicher Stand, unverändert, für Vergleich und Vorher-Bilder.
  - Ports nennt das Workflow-Briefing.
- **Schreibrechte:**
  - Der Baumeister ändert in seiner Arbeitskopie die Dateien seines Bauteils laut Spalte `dateien` der Maßnahmen.
  - Dazu gehören die gemeinsamen Dateien, die der Plan dem Orchestrator zuweist: `globals.css`, `bewegung.css`, `register.json`, `KERN.md` und die genannten Tests. So wird die Wirkung im Bau prüfbar.
  - Ins Repository schreibt nur der Orchestrator, indem er den Diff anwendet.
  - Kein Git mit Schreibwirkung.
- **Verbindlich je Maßnahme:** Beschreibung, Leitplanken und Risiko aus `endplan.json`. Jede Abweichung braucht einen Entscheidungsvermerk in der Notiz: Ziel, Alternativen, Wirkung, Risiko, Rückweg.
- **Nachweise im Bau:**
  - `npm test`, `npx tsc --noEmit`, `npx eslint` und `werte.mjs` über die geänderten Dateien;
  - `next build`;
  - `erstesbild.mjs` für jede betroffene Ansicht (m360 mit 200 %, q844, m390, d1440);
  - Bildschirmfotos vorher und nachher, d1440 und m390, je betroffener Ansicht, im ruhigen Zustand und mit Bewegung im Endzustand;
  - keine Lighthouse- und keine Zeitmessung; die macht der Orchestrator allein auf dem Rechner (E-076).
- **Ergebnis:**
  - Diff `$SCRATCH/sfix/<bauteil>/UM-E4-SICHT-FIX-<bauteil>.diff` (gegen `vor`, ohne `node_modules` und `.next`).
  - Notiz `…/UM-E4-SICHT-FIX-<bauteil>.notiz.md` mit:
    - Maßnahmen mit Stand;
    - Entscheidungsvermerken;
    - gewollten Pixeländerungen je Ansicht;
    - Textvorschlägen;
    - offenen Fragen;
    - Prüfzahlen.
- **Prüfung:** zwei unabhängige Prüfer (Sonnet) je Welle, danach Nacharbeit durch den Baumeister.
  - Linse 1, Wirkung: Sind die Befunde behoben, belegt mit Bildern vorher und nachher, gemessen an der Rubrik aus Abschnitt 13?
  - Linse 2, Leitplanken: siehe unten.

## Leitplanken (verbindlich)
- **G8 Unantastbar:**
  - Logo, Rechtstexte, Firmendaten, Adressen und Einwilligung (Wortlaut, Knöpfe, Wirkung);
  - Geschäftslogik, Formulare und `/api/anfrage`;
  - Wortlaut der Kundenstimmen, Bewertungszahlen;
  - H1 auf `/` und `/bad/badsanierung` im Wortlaut.
- **B-01 ist eingefroren (E-078):** `Verlegen.tsx` und der Seitenwechsel bleiben unberührt. Der Eingang (E-081) und der Bewegungsschalter (E-080) behalten ihr Verhalten.
- **G7:** Tests, Linter und Prüfungen werden nicht gelockert. Nichts wird nur für eine Messung gebaut.
- **G4:** Kein Inhalt fällt weg. Ein Aufklapper behält den Inhalt im DOM; ein Tausch von Fotos ist keine Entfernung.
- **Bilder:** Keine neuen Bilder, keine Zuschnitte, keine Generatorbilder (E-013). Alt-Texte bleiben wie in ARBEITEN. Kein Foto zweimal auf derselben Seite.
- **Gestaltung und Bewegung:**
  - nur Tokens: Fliesenstufen, `fs-*`, Farben, Dauern, Kurven; keine Beliebigwerte (Z-04);
  - Bewegung nur über `transform` und `opacity`;
  - jede Kennung steht im Register;
  - `ruhig` und reduziert zeigen den Endzustand ohne Lage- oder Größenänderung;
  - Hover nur bei feinem Zeiger.
- **Ladezeit:**
  - kein zusätzliches JavaScript für Gestaltung: Serverkomponenten und CSS, Aufklapper als `details`;
  - das gebaute Stylesheet wächst über alle Bauteile zusammen höchstens um 4 KB gzip;
  - es bleibt ein Stylesheet je Seite (`test/stylesheets.test.mjs`, E-101);
  - Lighthouse mobil hält ≥ 90, wo es heute ≥ 90 ist.
- **Erstes Bild (K-010):** Hauptknopf und Telefon stehen im ersten Bildschirm jeder Hauptansicht; LCP-Kandidaten starten nie unsichtbar (E-067-4).
- **Funktionsliste und Muss-Rückführungen** (F-01 bis F-n, EP1 bis EP5, E-094): jede Funktion bleibt erhalten; nur ihr Platz und ihre Form ändern sich.
- **Texte:** Direkt geändert werden nur Mikrotexte, alles andere geht als Vorschlag in die Notiz.

## Abnahme durch den Orchestrator (je Welle)
1. Diffs mit `patch -p1 --dry-run` prüfen, dann anwenden; je Bauteil ein Commit mit Kennung `UM-E4-SICHT-FIX-<bauteil>`.
2. Prüfkette nach dem Muster `belege/um-e4-leistung/` (`pruefkette.sh`), vorher gegen nachher:
   - Reinraum, `npm test`, tsc, eslint, werte;
   - Suiten in beiden Bewegungszuständen;
   - axe `--zustaende`, G8-Abgleich, Register, ruhig und reduziert, Bildrate;
   - Lesbarkeit;
   - Pixel: gewollte Änderungen je Ansicht laut Notiz; `/` bleibt bis auf M-A5 pixelgleich;
   - Strukturdaten;
   - Lighthouse allein im Wechsel, Reaktion (INP).
   - Hintergrundaufgaben dauern höchstens 2 h; die Kette wird geteilt.
3. Entscheidung in ENTSCHEIDUNGEN, PLAN-Zeile, Belege unter `belege/um-e4-sicht-fix/`.
