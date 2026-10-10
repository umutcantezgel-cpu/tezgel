STATUS · Branch claude/amazing-mendel-b0g40w · Etappe 1/9 (E0/E1 parallel) · Welle E0-W1 · Pflicht 2/111 · Kür 0/9 · Kriterien 0/10 · Ausnahmen 0 · Bestand grün · Nächster Schritt: Rückgaben E0-PRUEF-02a–d abnehmen, dann Ausgangswerte (E0-PRUEF-03/-04) und L0-Planprüfung

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
