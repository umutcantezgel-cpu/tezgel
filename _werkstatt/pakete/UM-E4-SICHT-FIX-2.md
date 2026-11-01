# UM-E4-SICHT-FIX-2 · Zweite und letzte Nacharbeitsrunde nach Tor E4 Anlauf 2 · Rollen Baumeister (Opus, Arbeitskopie), Prüfer (Sonnet), Orchestrator · Kostenklasse L

## Ziel (E-105, E-113, Abnahme Z-05)
Die konkreten Mängel aus Anlauf 2 beheben und den Abstand zu 8,0 verkleinern. Ein dritter Toranlauf folgt nicht (L3); die Bewertung übernimmt UM-E5-END. Ziel nach Z-05 bleibt:
- jede Hauptansicht ≥ 8,0;
- jede Erzählansicht ≥ 8,5;
- keine Kategorie unter 7,5.

Die Technik darf nicht schlechter werden (Funktionen, Barrierefreiheit, Bewegung, Werte, Ladezeit). Die Ausnahme A-1 bleibt.

## Grundlage
- **Befunde:** Bericht `berichte/UM-E4-SICHT-2.md`; 167 Befunde in `belege/um-e4/sicht-anlauf-2.json`; Bildsatz von Anlauf 2 unter `$SCRATCH/sfix/sicht2/`.
- **Maßnahmenplan `belege/um-e4-sicht-fix-2/endplan.json`** ist verbindlich: 25 Maßnahmen M2-A1 bis M2-O1 je mit Ansichten, Dateien, Beschreibung, Befunden, Wirkung, Leitplanken, Risiko, Priorität und Teil; 31 begründete Nicht-Umsetzungen; Teile SF2-A, SF2-B, SF2-C, SF2-O; Erwartung; offene Fragen.
- **Entscheidungen des Orchestrators: E-113** (`ENTSCHEIDUNGEN.md`). Kurz: Projektcheck bleibt offen (1 nein); Eingang „An der Schnur“ nur auf den Ortsseiten (2); Satzspiegel v2 ja (3); kein zweites Hochformat im Einstieg (4 nein, M2-B8 entfällt); Motto bleibt „bestand“ (5 nein); Plan „Laden“ mit Abbruchkriterium (6); Bildtabelle angenommen (7); Fotos auf `/blog` ja (8); Tropfen im Ablauf ja (9).
- **Die Nicht-Umsetzungen gelten.** Wer davon abweicht, braucht einen Entscheidungsvermerk und die Zustimmung des Orchestrators.
- Frühere Runde: `pakete/UM-E4-SICHT-FIX.md`, Notizen `berichte/UM-E4-SICHT-FIX-*.notiz.md`, Entscheidungen E-104, E-108, E-111, E-112.

## Stufen und Bauteile (E-113)

| Stufe | Bauteil | Maßnahmen in Reihenfolge | Grundlage |
|---|---|---|---|
| 1 | SF2-A1 | M2-A6 (Typen aller Teile) → M2-A1 (Satzspiegel v2, mit den entfallenden `tun.satz`-Überschreibungen in `barrierefreies-bad.ts`, `balkon-terrasse.ts`, `referenzen.ts`) | HEAD |
| Sicht | Orchestrator | `/bad/badsanierung`, `/fliesen`, `/referenzen` bei d1440, d1920, t1024 und m390; danach Einspielen | |
| 2 | SF2-A2 | M2-A2 → M2-A3 → M2-A8 → M2-A4 → M2-A5 → M2-A7 → M2-A9 → M2-A10 | HEAD nach Stufe 1 |
| 2 | SF2-B, parallel | M2-B1 → M2-B2 (nur Ortsseiten) → M2-B7 → M2-B3 → M2-B4 (Rückfall) → M2-B5 → M2-B6 | HEAD nach Stufe 1 |
| 2 | SF2-C, parallel | M2-C1 → M2-C2 → M2-C3 (ohne Motto-Stufe) → M2-C4 (Plan „Laden“ als Schalter, ohne Zeilenmaske) → M2-C5 | HEAD nach Stufe 1 |

Danach folgen die volle Prüfkette (Lighthouse allein, Abbruchkriterium aus E-113 Nr. 6, Rückweg je Ansicht) und E5.

**Grenzen zwischen parallelen Bauteilen:** Jedes Bauteil ändert nur die Dateien seines Teils laut `endplan.json` → `teile[].dateien`. In `globals.css`, `bewegung.css`, `stile.ts`, `register.ts`, `register.json`, `KERN.md` und den Tests legt jedes Bauteil nur eigene, abgegrenzte Blöcke an oder ändert die Blöcke seiner Maßnahmen. Keine Umordnung, keine Formatierung fremder Blöcke. Typen aus M2-A6 ändert in Stufe 2 niemand mehr; fehlt etwas, Entscheidungsvermerk und kleinste Ergänzung.

## Arbeitsweise je Bauteil
- **Arbeitskopien:**
  - `$SCRATCH/sfix2/<bauteil>/baum`: Abzug von HEAD, `node_modules` verlinkt.
  - `$SCRATCH/sfix2/<bauteil>/vor`: gleicher Stand, unverändert, für Vergleich und Vorher-Bilder.
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
  - Bildschirmfotos vorher und nachher, d1440, d1920 und m390 (Stufe 1 zusätzlich t1024), je betroffener Ansicht, im ruhigen Zustand und mit Bewegung im Endzustand;
  - keine Lighthouse- und keine Zeitmessung; die macht der Orchestrator allein auf dem Rechner (E-076).
- **Ergebnis:**
  - Diff `$SCRATCH/sfix2/<bauteil>/UM-E4-SICHT-FIX-2-<bauteil>.diff` (gegen `vor`, ohne `node_modules` und `.next`).
  - Notiz `…/UM-E4-SICHT-FIX-2-<bauteil>.notiz.md` mit:
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
  - das gebaute Stylesheet wächst über alle Bauteile zusammen höchstens um 4 KB gzip gegenüber 4d2d3fef; für diese Runde bleiben rund 2,3 KB (Richtwerte E-113);
  - es bleibt ein Stylesheet je Seite (`test/stylesheets.test.mjs`, E-101);
  - Lighthouse mobil hält ≥ 90, wo es heute ≥ 90 ist.
- **Erstes Bild (K-010):** Hauptknopf und Telefon stehen im ersten Bildschirm jeder Hauptansicht; LCP-Kandidaten starten nie unsichtbar (E-067-4).
- **Funktionsliste und Muss-Rückführungen** (F-01 bis F-n, EP1 bis EP5, E-094): jede Funktion bleibt erhalten; nur ihr Platz und ihre Form ändern sich.
- **Texte:** Direkt geändert werden nur Mikrotexte, alles andere geht als Vorschlag in die Notiz.

## Abnahme durch den Orchestrator
1. Diffs mit `patch -p1 --dry-run` prüfen, dann anwenden; je Bauteil ein Commit mit Kennung `UM-E4-SICHT-FIX-2-<bauteil>`. Textvorschläge nach `TEXTVORSCHLAEGE.md`, Notizen nach `berichte/`.
2. Prüfkette nach dem Muster `belege/um-e4-sicht-fix/messpunkt-w2/` (`kette.sh`), vorher a3c28d36 gegen nachher: Reinraum, Suiten in beiden Bewegungszuständen, axe `--zustaende` (Haupt- und Zusatzseiten), G8-Abgleich, Register, ruhig und reduziert, Bildrate, Lesbarkeit, Strukturdaten, Werte, Pixel (gewollt laut Notizen), CSS gzip; am Ende allein Lighthouse mobil V N N V und Desktop sowie Reaktion.
3. Entscheidung in ENTSCHEIDUNGEN, PLAN-Zeile, Belege unter `belege/um-e4-sicht-fix-2/`.
