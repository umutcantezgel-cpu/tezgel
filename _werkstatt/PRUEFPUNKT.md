# PRUEFPUNKT

- HALT · 12.10.2026 09:40 CEST auf Anweisung („push alles auf main und höre sofort auf mit den arbeiten!“): alle Helfer gestoppt, Testläufe beendet, Routinen „Morgenbericht“ und „WEITER“ deaktiviert (nicht gelöscht). Push auf main auf Rückfrage: main war durch die Relaunch-Sitzung auf 5c3c359 weitergewandert (36 Commits, eigene /ueber-uns, Vermerk ÜBERGEBEN) – zusammengeführt, bei /ueber-uns und CompanyHistory gilt auf Entscheidung des Auftraggebers die Fassung von main, sonst der Werkstatt-Stand; Reinraum-Prüfung des Zusammenführungs-Stands vor dem Push. E5-BAU-02 mit grüner Prüfstufe A (Baumeister) aufgenommen, ohne Bildsichtung durch den Orchestrator; E5-BAU-03 unfertig verworfen (Patch nur im Scratchpad, geht mit dem Container verloren). Offen: E4-Tor (Prüfstufe B, Sichtabnahme), Ursache der sporadisch roten Aufklapper-Tests (Klick vor Hydrierung, FAQAccordion), E5-BAU-03…09/-11, E6, Abbau, Kür, Prüfstufe C.

> **ÜBERGEBEN – 11.10.2026 (Entscheidung des Auftraggebers).** Der Werkstatt-Lauf ist beendet: **nicht fortsetzen, nicht pushen.** Vorbild für alle Unterseiten ist die live laufende Fusions-Startseite (KERN v2, `_werkstatt/KERN.md`); nur die Relaunch-Sitzung baut weiter, Seite für Seite direkt auf `main` (`_relaunch/ENTSCHEIDUNGEN.md` E-037, E-038; Plan `_relaunch/PLAN.md`, Abschnitt „Vereinheitlichung“). Die Pakete E3–E6 und die Kür dieses PLANs werden dort als Gerüst übernommen; Werkzeuge in `_werkstatt/werkzeuge` werden weiter benutzt. Der WERKSTATT-Block in `CLAUDE.md` ist damit überholt.

## Vorheriger Stand (überholt)

- Etappe: E4 · Stand 12.10.2026 08:40 CEST · E4-N2-01…13 und E4-N2-02-PA abgenommen. E4 Familien: E4-BAU-01 (fb069cf), -02 (559975b), -03 (dc5f2ae), -04 (92ed276), -05 (4c1f614), -06 (691218b), -07 (48b76da) abgenommen; -08, -09, -10, -11 laufen (4 Plätze). main = 6156079 (live), Push nur auf den Arbeitsbranch.
- Jetzt: Rückgaben -08…-11 abnehmen (Prüfstufe A je Paket, Bildsichtung, Commit, Push). Danach: `_werkstatt/belege/adhoc/texte/` (Zwischenablage eines Textlaufs, nicht committen) entfernen, wenn keine Baumeister mehr laufen; 4310 auf HEAD neu starten (Reinraum durch Prüfer); E4-PRUEF-B (Prüfstufe B der Etappe); dann E5 (Spezifikationen im Generator, E5-BAU-10 [id]/[stadt] von Hand), E6.
- Kleinpunkte: `src/components/sections/CompanyHistory.jsx` verwaist → mit E6-BAU-11 entfernen; Rinne im Schnitt für `bad`/`untergrund` (vorgaben.ts); Leitachse mit Abschnittsbezug statt Verdeckung (/ueber-uns); mobil Einstieg der Arbeitsansichten kürzer (/blog erster Eintrag bei ~1150 px); bewegung.mjs-Schwelle für 1-px-Kanten; FinalCTA fehlt auf vielen Unterseiten (Vorschlag für später); Merkliste einspaltig mit langen Zeilen am Desktop (/fliesen/fliesenarten „Beim Kauf“).
- Briefings E4-BAU-01…11 liegen in `_werkstatt/pakete/` (Generator `scratchpad/orch/spez/e4/erzeuge.py`, dort auch E5-BAU-01…09/-11).
- Offene Menschen-Fragen: M-15 bis M-26; Textvorschläge in TEXTVORSCHLAEGE (neu: Musterbad-Größe `sizeM2`).

## Vorheriger Stand (überholt)

- Etappe: E4 · Stand 12.10.2026 ~08:05 CEST · zweiter Durchgang E4-N2-01…13 abgenommen (Commits im PLAN); Prüfstufe A der Bausteine (E4-N2-02-PA) läuft. E4 Familien: E4-BAU-01 (fb069cf), -02 (559975b), -03 (dc5f2ae) abgenommen; -04, -05, -06 laufen. main = 6156079 (live), Push nur auf den Arbeitsbranch.
- Jetzt: E4 Familien nach PLAN (E4-BAU-04…11, je Paket Prüfstufe A, Commit, Push; 4 Plätze); Rückgabe E4-N2-02-PA auswerten. Danach E4-PRUEF-B (Prüfstufe B der Etappe), E5 (Spezifikationen im Generator, E5-BAU-10 von Hand), E6.
- Kleinpunkte nach E4-N2: `src/components/sections/CompanyHistory.jsx` verwaist (Firmengeschichte steht jetzt in /ueber-uns) → mit E6-BAU-11 entfernen; Rinne im Schnitt für `bad`/`untergrund` (vorgaben.ts); Leitachse mit Abschnittsbezug statt Verdeckung (/ueber-uns); mobil Einstieg der Arbeitsansichten kürzer (/blog erster Eintrag bei ~1150 px).
- Briefings E4-BAU-01…11 liegen in `_werkstatt/pakete/` (Generator `scratchpad/orch/spez/e4/erzeuge.py`, dort auch E5-BAU-01…09/-11).
- Offene Menschen-Fragen: M-15 bis M-26.

## Vorheriger Stand (überholt)

- Etappe: E3 · Stand 12.10.2026 ~05:00 CEST · Nacharbeit E4-NACH-01…18 fertig (PLAN-Status mit Commits; Prüfstufe A je Paket grün, Tempo-Inseln 79742a4). main = 6156079 (live), Push nur auf den Arbeitsbranch.
- Jetzt: E3-Tor Anlauf 2 (letzter Anlauf, Workflow `e3-tor-2`): Prüfer Reinraum + Server 4310 neu auf dem Tor-Stand; Prüfer Funktion/Texte/axe/Werte; Prüfer Bilder (Abschnitte der 12 Hauptansichten, Bildsatz-Kennzahlen, Ersatzpfad, Bewegungsfolgen mit Echtzeit-Lademomenten); zwei frische Gutachter (Erzähl-/Arbeitsansichten, danach Abgleich mit den Befunden aus Anlauf 1); Lighthouse im Ruhefenster gegen e0 und e3-tor. Belege `_werkstatt/belege/e3-tor-2/`, Rohbilder `scratchpad/belege-roh/e3-tor-2/`, Berichte `berichte/E3-SICHT-2-*.md`.
- Vorbereitet: Briefings E4-BAU-01…11 (`_werkstatt/pakete/`, Spezifikationen und Generator `scratchpad/orch/spez/e4/erzeuge.py`, dort auch E5-BAU-01…09/-11; E5-BAU-10 [id]/[stadt] von Hand). Reinraum adacabf grün.
- Danach: E-026 (Ausgang); Befunde als zweiter und letzter Durchgang je Ansicht und Kategorie (Zählstand PLAN); Lighthouse-Budget nach zwei belegten Anläufen ggf. AUSNAHME mit Ersatzlösung; dann E4 Familien (Pfade der E4–E6-Zeilen auf `src/app/(bestand)/…` umstellen).
- Offene Kleinpunkte (Rückgaben): Feldraster-Restzellen grau; Abschnitt-Prop `titelGroesse` statt `[&_h2]:text-fs-5` (Konfigurator); auf [stadt] zwei Feldraster in Folge; Ortsleiste in InteractiveServiceMap abgeschnitten; Funktionsfall „Rechner auf /“ (Vorlage `belege/e4-nach/tempo-pa/rechner-probe.mjs`).
- Offene Menschen-Fragen: M-15 bis M-23; Textvorschläge in TEXTVORSCHLAEGE (Abschnitt Vorschläge).

## Vorheriger Stand (überholt)

- Etappe: E3 · Stand 12.10.2026 ~09:30 CEST · E3-Tor Anlauf 1 ausgewertet (E-025, Belege `belege/e3-tor/`, Berichte `berichte/E3-SICHT-*.md`). main = 6156079 (live), Push nur auf den Arbeitsbranch.
- Jetzt: Nacharbeit nach PLAN „Offene Punkte · E3-Tor, Anlauf 1“ (E4-NACH-01…15).
  1. Server: 4310 = Reinraum 8debc92 läuft; Dev 4320 für Prüfstufe A neu starten (`dev-server.sh start`).
  2. Welle N1: Orchestrator E4-NACH-01 (Planblatt-Einstieg, Rückfrage, Motive) und -02 (große Momente, Verbandszeichen); Baumeister -03 (Abschluss/Fuß), -04 (Qualitätsversprechen), -05 (Express-Anfrage), Prüfer -06 (Bündelanalyse); danach in freie Plätze -12 (/kontakt), -14 (/blog), -15 (Artikel).
  3. Welle N2 nach -01/-02: -07 (/bad), -08 (/leistungen, [id]), -09 (/standorte, [stadt]), -10 (/fliesen), -11 (/ueber-uns), -13 (Konfigurator).
  4. Tempo nach -06: frühe Skripte kürzen (Orchestrator), nachgeladene Funnels und spätes Zeichnen in den Seitenpaketen.
  5. Je Welle Reinraum, Prüfstufe A, Commit, Push. Danach E3-Tor Anlauf 2 (Reinraum, Funktion/Texte/axe, Bilder 12, Sichtabnahme, Lighthouse), dann E4 Familien (Pfade der E4–E6-Zeilen auf `src/app/(bestand)/…` umstellen).
- Offene Menschen-Fragen: M-15 bis M-22; Textvorschläge in TEXTVORSCHLAEGE (Abschnitt Vorschläge).

## Vorheriger Stand (überholt)

- Etappe: E3 · Stand 12.10.2026 ~01:00 CEST · alle E3-Baupakete abgenommen (E3-BAU-01…21), Nacharbeiten E3-NACH-03/-05 abgenommen; E3-ORCH-01…05 und E3-NACH-01/-02/-04/-06/-07 umgesetzt, Abnahme am E3-Tor (E-022…E-024). main = 6156079 (live), Push nur auf den Arbeitsbranch.
- Jetzt: E3-Tor (Workflow): Prüfer A Reinraum + Server 4310 neu (+ Nachweis server.sh-Stop schont 4310), Prüfer B Funktion/Texte/axe/Werte, Prüfer C Bilder (Abschnitte 12 Hauptansichten, Bildsatz-Kennzahlen, Ersatzpfad, Bewegung), zwei Gutachter (Erzähl-/Arbeitsansichten), Lighthouse im Ruhefenster (12 Ansichten gegen e0). Bilder im Scratchpad `belege-roh/e3-tor/`, Berichte unter `_werkstatt/belege/e3-tor/` und `_werkstatt/berichte/E3-SICHT-*.md`.
- Danach: Befunde → Nacharbeit (höchstens 2 je Ansicht und Kategorie), dann E4 (Familien auf Systemstand).
- Offene Menschen-Fragen: M-15 bis M-22; Textvorschläge in TEXTVORSCHLAEGE (Abschnitt Vorschläge).

## Vorheriger Stand (überholt)

- Etappe: E3 · Stand 11.10.2026 22:50 CEST · Branch = 5324b62 + Werkstatt-Dokumente; main = 6156079 (live). Push nur auf den Arbeitsbranch (G2/G3 gelten wieder; main nur auf neue ausdrückliche Anweisung).
- E2-Tor abgeschlossen nach Anlauf 2 (E-021): Sichtabnahme `/` 6,7 · 6,2, `/kontakt` 5,7 · 5,8; Lighthouse `belege/e2-tor-3/LIGHTHOUSE.md`. Befunde → PLAN „Offene Punkte“: E3-NACH-01…07, E3-PRUEF-W1.
- Jetzt E3 Welle 1:
  1. Server: 4310 = Reinraum 5324b62 (Produktion, Stand des letzten src-Commits), 4320 = Dev (Arbeitsbaum). 4312 frei.
  2. Baumeister (ARBEITSMODELL, 4 Plätze): E3-BAU-11, -16, -02, -07 aus `scratchpad/orch/spez/e3/` (Briefing mit `briefing.mjs`, nie umleiten). Danach Welle 2: -12, -17, -03, -21 → -13, -18, -09, -10 → -14, -19, -15, -20; E3-NACH-03/-05 und E3-PRUEF-W1 in freie Plätze.
  3. Orchestrator-Spur parallel (keine Dateiüberschneidung): E3-NACH-07 (Tempo /), -01 (Komposition /), -02 (Bewegung /), -04 (/kontakt).
  4. Je Welle Reinraum (Prüfer), Prüfstufe A, Commit und Push auf den Arbeitsbranch.
- Offene Menschen-Fragen: M-15 bis M-22.
- Bei Wiederaufnahme nach Abbruch: laufende Pakete in ihren Dateien auf den letzten Commit zurücksetzen und neu starten; Server nach `_werkstatt/werkzeuge/EINRICHTUNG.md`.

## Vorheriger Stand (überholt)

- Etappe: E2 · Zusammenführung mit main (E-020) · Stand 11.10.2026 ~14:30 CEST
- Arbeitsbranch `claude/amazing-mendel-b0g40w` = zusammengeführter Stand (Werkstatt + Relaunch main bis ecdc508 + Fusion der Startseite). Push auf `main` am 11.10. auf ausdrückliche Anweisung: main = Branch = 6156079 (Fast-Forward), Vercel success, live geprüft. Probe-Worktree entfernt; Prüfserver gestoppt (für weitere Arbeit nach EINRICHTUNG.md neu starten).
- Gesamtprüfung auf cf91c38 (Belege im Scratchpad `vergleich/`): Reinraum grün; Funktionstests 289 bestanden, 1 Ausreißer (Mega-Menü Tastatur, einzeln bestanden); Sitemap 163 × 200; axe / und /kontakt 0; Register ohne Lücke; Unterseiten-Stichprobe ohne Bruch (Altbefunde auf din-18534/Blog unverändert); Fremdsuite 337/45 (erwartet: sie prüft die Kern-Startseite, M-21); Fusionsgutachten Desktop 6,5 (A 6, B 5,5), Handy 7 (A 6, B 5,5).
- Nacharbeit nach dem Gutachten eingespielt (Rechnerspalte volle Höhe, Kennzeilen einheitlich, Großformat ohne zweites Motiv, Kennwert ohne Doppelung, Karten-Vorschau, Abschluss-Knopf, Einstiegsformular); danach Reinraum und betroffene Funktionstests erneut.
- Danach Werkstatt-Lauf weiter: Tor Anlauf 2 (Sichtabnahme auf dem zusammengeführten Stand), Lighthouse-Ruhefenster, E3. Probe-Worktree `scratchpad/merge-probe` nach dem Push auf main entfernen.
- Offene Menschen-Fragen: M-15 bis M-22 (neu: M-21 Zusammenführung/andere Sitzung, M-22 Fotos fürs Großformat).

## Vorheriger Stand (überholt)

- Etappe: E2 Referenz, Tor Anlauf 2 · Stand 11.10.2026 02:00 CEST
- Prüfstufe B am Tor abgeschlossen und grün auf f8899dc (Belege `_werkstatt/belege/e2-tor/PRUEFSTUFE-B2.md`; Lauf 1 auf 1ad2e45 in `PRUEFSTUFE-B.md`).
- Server: 4310 = Reinraum 745335f (Ausgang), 4311 = GA-Variante f8899dc, 4312 = Reinraum f8899dc, 4320 = Dev.
- Sichtabnahme Anlauf 1: / 5,7, /kontakt 5,0 (`_werkstatt/berichte/E2-SICHT.md`). Nacharbeit E2-ORCH-10 (e8e717f, E-019) eingespielt.
- Laufend: E2-PRUEF-B4 (Prüfstufe A auf 4320, dann B auf Reinraum e8e717f, Port 4312; Belege `_werkstatt/belege/e2-tor-2/`). Während des Laufs keine Änderungen unter `src/` (Dev-Server).
- Danach Sichtabnahme Anlauf 2 mit Bildern aus `belege/e2-tor-2/` (Briefing wie `_werkstatt/pakete/E2-SICHT.md`, neue Pfade); nach Anlauf 2 geht es weiter, Kategorien < 8 werden Pakete.
- Danach:
  1. Ansichtswert ≥ 8 → E2-PRUEF-L1 Lighthouse im Ruhefenster (kein anderer Agent): e0 12 Ansichten auf 4310, E2 / und /kontakt auf 4312 (Spezifikation `scratchpad/orch/spez/E2-PRUEF-L1.json`, COMMIT 1ad2e45 → auf f8899dc ändern). Kategorien < 8 werden Pakete (≤ 2 je Ansicht und Kategorie); Ansichtswert < 8 → Nacharbeit und zweiter Anlauf.
  2. E2-DOK-01 (Referenz-Bildsatz nach `_werkstatt/bilder/e2/`), Prüfstufe A E3-ORCH-00/01 ist durch Lauf 2 abgedeckt (Build, Funktion, Szene im Schaufenster).
  3. E3-Welle 1 aus `scratchpad/orch/spez/e3/` (16 Pakete; `briefing.mjs` nicht umleiten). Reihenfolge: -11, -16, -02, -07 → -12, -17, -03, -21 → -13, -18, -09, -10 → -14, -19, -15, -20.
- Entwürfe E3: `scratchpad/orch/entwurf/e3/` (Einzugsband mit Logik und Test; Szene ist eingespielt, dd0c0d0).
- Offene Menschen-Fragen: M-15, M-16, M-17, M-18 (Fotos je Gewerk).
- Bei Wiederaufnahme nach Abbruch: laufende Pakete in ihren Dateien auf den letzten Commit zurücksetzen und neu starten; Server nach `_werkstatt/werkzeuge/EINRICHTUNG.md`.
