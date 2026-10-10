STATUS · Branch claude/amazing-mendel-b0g40w · Etappe 2/9 (E2 Referenz) · Welle E2-W2/W3 · Pflicht 12/100 · Kür 0/9 · Kriterien 0/10 · Ausnahmen 0 · Bestand grün · Nächster Schritt: nach Prüfstufe A E2-ORCH-05b (Banner als Schriftfeld, flacher WhatsApp-Knopf, Physik und Wasser-Cursor raus), dann -05c, -06

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
- 2026-10-10 21:42 CEST · L0 abgeschlossen (Runde 2: 5 Befunde eingearbeitet, KÜR-01 in a–d); E2-GRAF-02 abgenommen (Icon-Familie vollständig, 38 Zeichen); E2-ORCH-05a Rahmen (Kopf mit Popover-Menü, Mega-Menü, Leiste, Fuß mit Schriftfeld) und E2-ORCH-07 Umbauskript (Trockenlauf 129 Dateien, Text-Fingerabdruck unverändert) committet; KERN v2.1 (Größenstufen); E2-AUF-01 zurückgestellt (Löschfreigabe M-15); laufend: E0-PRUEF-03 (ohne Lighthouse), E2-PRUEF-A-1, E2-BAU-01, E2-BAU-02; Lighthouse-Ausgangswerte folgen in eigenem Ruhefenster (E0-PRUEF-03L).