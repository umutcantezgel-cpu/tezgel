STATUS · Branch claude/tezgel-website-redesign-iqxt8z · Etappe E0/E1 (1/7) · Welle Ausgangsmessung · Pflicht 9/291 · Kür 0/8 · Kriterien 0/14 · Ausnahmen 0 · Bestand grün (src unverändert committet) · Nächster Schritt: Ausgangswerte E0-PRUEF-03 und E0-PROBE, PLAN 1.1

# STATUS · Lauf „Verständlich, echt, ausgezeichnet“

## Auftrag in drei eigenen Sätzen
1. tezgel.de wird so umgebaut, dass jeder Laie, zuerst eine 72-jährige Kundin am Handy, ohne Hilfe versteht, was Fliesenverlegung Tezgel macht, wo der Betrieb arbeitet und wie man einen Termin vor Ort bekommt.
2. Echte Fotos, eine durchgehende Geschichte von der Lage des Kunden bis zur letzten Fuge, ein Intro mit sich zeichnendem Logo und Seitenwechsel, bei denen sich Fliesen verlegen, heben die Gestaltung deutlich sichtbar auf Award-Niveau.
3. Alle 170 Adressen, alle Funktionen, Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; jede Seite lädt schnell und ist zugänglich.

## Einstellungen und Annahmen (leere Felder = Standardwert)
- UMGEBUNG: Cloud-Sitzung (nicht lokal), Repository `/home/user/tezgel`
- BILDQUELLE: `_eingang/entpackt/` = 84 Originale aus 35af5cc (E-004); 81 Social-Zuschnitte in `bilder/referenzen/0*/` als Arbeitsmaterial
- LOGOQUELLE: `public/images/logo/tezgel-logo.png` (640×200) und `tezgel-mascot.png` (483×558); keine echte Vektordatei (die SVGs betten ein PNG ein)
- ARBEITSBRANCH: `claude/tezgel-website-redesign-iqxt8z` (E-001) · PUSH: nur dorthin, je Welle und stündlich · VERÖFFENTLICHUNG: nie
- AUSBAU maximal · MUT deutlich sichtbar neu · TEXTE alle Seiten direkt neu, Rechtstexte nur gestalterisch
- SEITENWECHSEL 30 × 60 quer, Drittelverband, rechts herein, links hinaus, ≤ 1.200 ms, ab dem zweiten ≤ 900 ms, KLANG aus · INTRO ≤ 2.200 ms, einmal je Browser
- FREIGABE: Plan im Chat freigegeben (23.10.2026)
- ORCHESTRATOR Opus 5.5 · ARBEITSMODELL Haiku 5.5 · HAIKU-PLÄTZE 5 (E-005)
- GERÄTEGRÖSSEN: 10 laut Auftrag (`HAUPTANSICHTEN.json`)
- BUDGETS: laut Auftrag Abschnitt 0; besserer E0-Wert gilt
- BERICHTE: Morgenbericht 07:00 Europe/Berlin in BERICHT.md
- Fehlender Auftragsteil: rekonstruiert (E-003)

## Einrichtung
Siehe `werkzeuge/EINRICHTUNG.md` (wird in E0-PRUEF-01 aktualisiert).

## Protokoll (stündlich, unten anfügen)
- 2026-10-23 23:30 CEST · E0 gestartet. Plan im Chat freigegeben. Erkundung lief schon vor der Freigabe nur lesend (9 Kundschafter, Bildtechnik, 5 Bildsichter, 2 Technikgutachten; Berichte in `berichte/`, Bilder in `bildinventar.csv`). Alter Lauf archiviert, Originale nach `_eingang/`, AUFTRAG.md mit Ergänzung, CLAUDE.md-Block erneuert.
- 2026-10-24 00:40 · Werkzeug-Welle abgenommen und gepusht (583656d); PLAN Fassung 1, ABNAHME, LAGEBILD-Entwurf; Planprüfung Runde 1: 25 Befunde; Ausgangsmessung und Probeläufe laufen; B-01-Vorarbeit im Arbeitsbaum.
