STATUS · Branch claude/amazing-mendel-b0g40w · Etappe 2/9 (E2) · Zusammenführung mit main (E-020): Startseite fusioniert, Branch enthält main · main = Branch (Push auf Anweisung) · Bestand grün (289/290, 1 Ausreißer) · Nächster Schritt: Vercel-Status, dann Tor Anlauf 2

# STATUS · Werkstatt-Lauf „Tezgel auf Spitzenniveau“

## VORHABEN in drei eigenen Sätzen
1. Die Website von Fliesenverlegung Tezgel verlässt den generischen KI-Look (Leuchtkugeln, Verläufe, Pill-Badges, Kartenraster, Stockanmutung) und wird auf allen Seiten zum Verlegeplan-System: eigene Schrift, Raster, Fugen, ein Rot, eigene Icons, gezeichnete Pläne.
2. Bewegung, interaktive Grafik und ein durchgehendes Leitelement – die Laserachse – erzählen Präzision; Arbeitsansichten bleiben ruhig, dicht und schnell.
3. Texte, Adressen, Funktionen und Logo bleiben erhalten; Tempo und Zugänglichkeit werden messbar besser.

## Einstellungen und Annahmen (leere Felder = Standardwert)
- VORHABEN: Standard (oben geschärft) · SCHWERPUNKT: alles · BEREICH: ganzes Projekt · AUSBAU: maximal (Konkretisierung E-007)
- MARKE UND ZIELGRUPPE: abgeleitet (Annahme) – Fliesenverlegung Tezgel, Inhaber Deniz Tezgel, Aßlar, HWK Wiesbaden seit 2008; Eigentümer in Mittelhessen, 35–75 Jahre, oft am Handy
- GESCHMACK: keiner
- UNANTASTBAR: Standard – Logo, Rechtstexte, Geschäftslogik (Anfrage-Route, Validierung, E-Mail, Einwilligungslogik), Verhalten der Datenmodelle, Schnittstellen nach außen; dazu Überschriften und Fließtext (TEXTE-Regel)
- TEXTE: Mikrotexte direkt (Protokoll in TEXTVORSCHLAEGE.md), sonst Vorschlag; Badge-Texte = Mikrotext (werden Mono-Etikett, Wortlaut bleibt)
- FREIGABE: nein (die Plan-Freigabe im Chat ersetzt den Halt) · LAUFZEIT: bis Pflicht und Kür erfüllt
- ORCHESTRATOR / ARBEITSMODELL: laut Auftrag Abschnitt 0 (in Repo-Dateien nur als Rollen benannt, E-012)
- HAIKU-PLÄTZE: 4 · ARBEITSBRANCH: claude/amazing-mendel-b0g40w · PUSH: nur dorthin, je Welle und stündlich · VERÖFFENTLICHUNG: nie
- GERÄTEGRÖSSEN: 390×844 · 768×1024 · 1440×900
- BUDGETS (Projekt, KERN v1 K-013): mobil LCP ≤ 2,5 s · CLS ≤ 0,1 · TBT/INP ≤ 200 ms · Lighthouse mobil ≥ 90 · Bewegungs-JS ≤ 60 KB gzip · Schriften ≤ 250 KB · Icon ≤ 1,5 KB · Illustration ≤ 40 KB gzip
- BERICHTE: Morgenbericht 07:00 Europe/Berlin in BERICHT.md

## Einrichtung (reproduzierbar)
Siehe `_werkstatt/werkzeuge/EINRICHTUNG.md` (entsteht in E0-PRUEF-01). Kurz: `npm ci` · Werkzeuge `npm ci` in `_werkstatt/werkzeuge` mit `node_modules` als Symlink in den Scratchpad · `_werkstatt/cache` = Symlink in den Scratchpad · Produktionsserver 4310 (`server.sh start HEAD`) · Dev-Server 4320 (`dev-server.sh start`).

## Protokoll (stündlich, unten anfügen)
- 2026-10-10 19:30 CEST · E0 gestartet: Plan im Chat freigegeben; `_werkstatt` angelegt, Werkzeuge aus `_relaunch` übernommen (git mv), Ausschlüsse gesetzt, CLAUDE.md-Block, Kundschafter- und Planprüfberichte abgelegt; E0-PRUEF-01 läuft.
- 2026-10-10 21:15 CEST · E0-PRUEF-01 committet (Reinraum grün, Server 4310/4320); E0-PRUEF-02a–d laufen (4 Plätze); Next-16-Doku gelesen (View Transitions ohne Konfiguration, `transitionTypes`, `next/font/local`, `preload`, `qualities`, `redirects`, `agentRules`); KERN v2, PLAN v1 (111 Pakete), ABNAHME, Denkprotokolle E-004–E-013 geschrieben (ZWISCHENSTAND).

- 2026-10-10 20:52 CEST · Korrektur: der vorige Eintrag trägt fälschlich 21:15, richtig war etwa 20:17 CEST. Seitdem: E0-PRUEF-02a–d abgenommen und committet (Werkzeugkette vollständig: Prüfstufe A, Bildsatz, Überlappung, Bewegung, Glyphen, Lighthouse, Texte, Werte, SVG); E2-ORCH-01–04 als ZWISCHENSTAND committet (Fundament, Bewegungssystem, Formsystem, Referenzbausteine); E2-GRAF-01 (12 Icons) abgenommen; L0-Runde 1 mit 22 Befunden in PLAN.md eingearbeitet (Tabellenzahl 116, Pflicht = 100 Zeilen E0–E6, KÜR-01…09 mit Schwellen); laufend: E0-PRUEF-03, E1-PRUEF-01 Runde 2, E2-GRAF-02, E2-AUF-01.
- 2026-10-10 21:30 CEST · L0 abgeschlossen (Runde 2: 5 Befunde eingearbeitet, KÜR-01 in a–d); E2-GRAF-02 abgenommen (Icon-Familie vollständig, 38 Zeichen); E2-ORCH-05a Rahmen (Kopf mit Popover-Menü, Mega-Menü, Leiste, Fuß mit Schriftfeld) und E2-ORCH-07 Umbauskript (Trockenlauf 129 Dateien, Text-Fingerabdruck unverändert) committet; KERN v2.1 (Größenstufen); E2-AUF-01 zurückgestellt (Löschfreigabe M-15); laufend: E0-PRUEF-03 (ohne Lighthouse), E2-PRUEF-A-1, E2-BAU-01, E2-BAU-02; Lighthouse-Ausgangswerte folgen in eigenem Ruhefenster (E0-PRUEF-03L).
- 2026-10-10 22:27 CEST · E2-PRUEF-A-1 ausgewertet (Nacharbeiten N1/N2: Etikett auf Tinte, Fuß bei 390, Rufnummer im Kopf in Mono, Pfeil reduziert, Register E-016/E-017); E0-PRUEF-04 committet (Funktionsliste 292/279/8/5, Tracking-Test, M-16); Textwerkzeug zweimal korrigiert (Kopf/Fuß auf Seitenebene, Wortgrenzen an Blöcken, Zeilen ohne CSS-Großschreibung) und Basis e0 neu erhoben (E2-PRUEF-T-1/-T-2, Probe GRÜN); Kundenstimme und Fuß in Bestands-Lesefolge; E2-ORCH-05b (Banner, WhatsApp-Knopf, Wasser-Cursor raus), -05c (Provider verlegt, 404, Weiterleitungen 308 + Test V-04) und -06 (Funnels zerlegt, Fingerabdrücke identisch) committet; Entwürfe E2-ORCH-08 (Startseite mit SIG-1, Formular, Rechner, Express-Anfrage) und Teile von -09 fertig. Laufend: E2-PRUEF-A-2, E2-BAU-04.
- 2026-10-10 23:19 CEST · Rahmen 04/05a/05b/05c/06 abgenommen (E2-PRUEF-A-2; Konfigurator-Import nachgezogen, L6); Startseite E2-ORCH-08 eingespielt und abgenommen (E2-PRUEF-A-3: Werte 0, Register lückenlos, Text grün; N1 Anzeigeschnitt, N2 Drehungen nur bei erlaubter Bewegung); Kartenpaket E2-BAU-04 nach drei Nacharbeiten abgenommen (Tor sofort, V-01, Kartenhöhen E-018); /kontakt E2-ORCH-09 eingespielt (Kalender V-02/V-05, Kontaktkarte lesbar), Prüfstufe A läuft. Neu in MENSCHEN: M-17 (Wetzlar als „HQ“).
- 2026-10-10 23:52 CEST · /kontakt (E2-ORCH-09) abgenommen (E2-PRUEF-A-4; N1 scroll-padding, N2 Drehpfeile ohne Übergang bei reduzierter Bewegung). E2-Tor gestartet: E2-PRUEF-B auf Reinraum 1ad2e45 (Port 4312). Parallel E3 vorbereitet: Funnel-Stilmodule und Markenlogos (E3-ORCH-00, Zwischenstand b34f429), 16 Paket-Spezifikationen der Welle E3-W1.
- 2026-10-11 00:49 CEST · E2-PRUEF-B (Lauf 1, 1ad2e45) ausgewertet und committet; Nacharbeiten E2-ORCH-09-N3 (LocationContact als Schriftfeld, Karten-Register) und E2-ORCH-08-N2 (Fotos nur beim passenden Gewerk, M-18; Kennwert neben Vertrauensleiste; Rechner-Etikett). Nachprüfung auf f8899dc: Build, GA-Variante, Funktion 286/0, Tracking 8/8, Bildsatz 0 Befunde; axe-Lauf des Vorgängers gegen falschen Server verworfen, Abschluss durch E2-PRUEF-B3 läuft. E3-Entwürfe: Einzugsband (Logik + Test).
- 2026-10-11 01:26 CEST · Prüfstufe B am Tor grün (f8899dc). Sichtabnahme Anlauf 1: / 5,7, /kontakt 5,0. Nacharbeit E2-ORCH-10 (E-019): Leitachse und gemeinsame Flucht, Rot-Disziplin, Fotos mit Generatorzeichen ersetzt (M-19), Leiste bis lg mit Widerruf-Schild, Abschnittstakt, Vertrauensraster, Einzugsband mit Zonenlogik und Test, /kontakt mobil einspaltig, Zonen 10/25/50, M-20 Öffnungszeiten. Prüfung E2-PRUEF-B4 läuft.
