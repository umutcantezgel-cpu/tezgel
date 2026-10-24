# PRUEFPUNKT

- Lauf „Verständlich, echt, ausgezeichnet“ · Etappe E2 (Referenz) · Stand 2026-10-24 04:27 CEST
- Letzter grüner Commit (src): c53faf4 (src gleich main 388fa7b). HEAD 27639b6 und folgende = Zwischenstände E2 (gepusht): Startseite, Startbild und 404 nachgebessert, im Prüf-Workflow.
- E0 abgeschlossen bis auf Lighthouse: E0-PRUEF-03 und E0-PROBE-01…10 zurück und gesichert (`pakete/*.rueckgabe.md`), Werte in LAGEBILD Abschnitt 4 und 5, ABNAHME Z-11.
- Laufend (04:27): Workflow Prüfrunde 4 (wf_531f3308-f5d, Skript `$SCRATCH/orch/runde4.js`, Stand 58df170; Ordner `$SCRATCH/E2-R4-{W,R,SICHT}`). Runde 3 ergab 7/8/7/7/8/7/6 (E-023), alle Befunde umgesetzt (Commits bis 237ce94). Entwicklungsserver 4320 mit geleertem `.next/dev` neu gestartet (veraltetes CSS). Bricht der Workflow ab: mit `resumeFromRunId` fortsetzen. Danach Befunde umsetzen, E2-PRUEF-TESTS, Stufe A (Briefings A1 bis A3), Reinraum, INP des Ankerknopfs im Produktionsbau, E2-PRUEF-00,
- Im Zwischenstand cce868a (Orchestrator), je Paket:
  - E2-ORCH-01 Tokens (`globals.css`), E2-ORCH-01b Register (`register.ts`, `test/bewegung.test.mjs`, `_werkstatt/register.json`, `werte-regeln.json`).
  - E2-FIX-01a bis c (GoogleReviewsBadge, FinalCTA, LocalDominanceMap, llms.txt, schema.ts, standorte/[stadt]).
  - E2-ORCH-04 B-01 (`src/lib/verlegen/*`, `src/components/verlegen/Verlegen.tsx`, `bewegung.css`, `_dokument.tsx`, `package.json`), E2-TEST-04 (`test/verlegen.test.mjs`), Spec `werkzeuge/tests/verlegen.spec.mjs` (E2-PRUEF-04, 26/26 nach Korrektur E-020).
  - E2-ORCH-04b Plan-Morph entfernt (`Gewerk.tsx`, `leistungen/[id]/page.jsx`, `Planfeld.tsx`, `Planblatt.tsx`, `Knopf.tsx`, `bewegung.css`, `globals.css`; `PlanUebergang.jsx` per `git rm` vorgemerkt).
  - E2-ORCH-05 Ersatz-Intro (`src/lib/intro/ablauf.ts`, `src/components/intro/Intro.tsx`, `kopfskript.ts`, `bewegung.css`, `_dokument.tsx`, `test/intro.test.mjs`), Werkzeuge `lib.mjs` (Intro „gesehen“) und `probelauf.mjs` (Erstbesuch).
  - E2-ORCH-02a bis h Bausteine (Fachwort, Seitenformel, Abschnitt, Hauptknopf, Brotkrumen, Fliesenkomposition, glossar.ts, Schaufenster), E2-ORCH-02c Bildfeld v3 und `src/config/arbeiten.ts`, E2-BILD-02 `public/images/arbeiten/**`.
  - E2-ORCH-03a bis e Navigation, Kopf, Menü, Leiste, Fuß, `oeffnungszeiten.ts`; Hauptziel je Seite (`hauptziel` in `navigation.js`).
  - E2-ORCH-06 Startseite (`page.tsx`, `src/components/start/{StartEinstieg,Lagefliesen,WasWirTun,StartBeleg,TerminAnfrage}.tsx`), noch nicht im Browser geprüft; alte Startbausteine (Einstieg, Fachbereiche, Fachgewerke, Ablauf, Grossformat, Stimmen, Servicegebiet, vignetten) unbenutzt, Löschung nach Prüfung.
  - E2-ORCH-07 404 (`not-found.tsx`, `global-not-found.tsx`), ungeprüft.
- Sicherung des Entwurfs: `$SCRATCH/orch/src-entwurf/` (Stand vor E2-ORCH-05; bei neuer Umgebung ist der Rest verloren und wird nach diesen Notizen neu gebaut).
- Danach: Lighthouse-Werte in LAGEBILD Abschnitt 4 und ABNAHME Z-08; Startseite und 404 im Browser prüfen (Bildsatz, Erstes Bild, Konsole); src-Commits je Paket mit Pfadangabe (`git commit -- <pfade>`; vorgemerkte Löschung von PlanUebergang.jsx nur mit E2-ORCH-04b); Reinraum und Stufe A (E2-PRUEF-A1, -A2, -A3); E2-PRUEF-00 LCP-Spur auf dem neuen `/`; E2-PRUEF-TESTS; E2-PRUEF-INP; E2-ORCH-06b Startbild; Tor E2.
- Bei Wiederaufnahme (L5): Branch sicherstellen, Bildquelle nach EINRICHTUNG.md wiederherstellen, an „Laufend“ fortsetzen; läuft Lighthouse nicht mehr und fehlt `lh-belege/lighthouse.json`, Lauf neu starten.
