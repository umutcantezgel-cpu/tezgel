# P3-16-GEG · Frischer Gegenprüfer Kandidat-Tor `/` · Stufe 3 · Modell: Opus (frisch) · Schreibrechte: `_relaunch/pakete/P3-16-GEG.rueckgabe.md` · Kriterien: Freischalt-Schwelle (E-017), T3-Anteile P3

## Auftrag
Prüfe adversarial, ob die Startseite `/` freigeschaltet werden darf. Gefragt sind zwei Urteile:
1. „Freischalt-Schwelle erfüllt: ja/nein“, je Rang 1–4 begründet.
2. „Nichts schlechter als der Bestand: ja/nein“.

Bestätige nur, was ein Beleg trägt. Übernimm keine Behauptung aus dem Ergebnisprotokoll ungeprüft: Öffne die Belegdatei und vergleiche die Zahlen.

## Material
- Ergebnis: `_relaunch/belege/t2-bcd8fcb/ERGEBNIS.md`, Entscheidung E-023 (und E-013, E-017, E-018, E-020, E-021, E-022) in `_relaunch/ENTSCHEIDUNGEN.md`
- Belege: `_relaunch/belege/t2-bcd8fcb/`, `_relaunch/belege/t2-ad80754/`, Basis `_relaunch/belege/p0-ausgangsstand/`
- Regeln: `_relaunch/AUFTRAG.md` (Abschnitte 6, 7, 11; Z-01 … Z-14), `_relaunch/PLAN.md` (Tore T2/T3), `_relaunch/KERN.md`, `_relaunch/MIKROTEXTE.md`, `_relaunch/PROBELAUF.md`
- Freischalt-Diff: Die Kandidat-Kopie `/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad/reinraum-bcd8fcb-k/` gegen das Repo (`git diff`/`diff -r` nur lesend über `src/`). Prüfe, was `freischalten.sh` verschiebt und entfernt und ob Bestandsseiten unter `/` betroffen sind (N-08).
- Quelltext: `git diff 1efad2a~40..HEAD -- src/` (Kern ruhend seit vielen Commits; maßgeblich ist, was mit `/` live geht).

## Besonders prüfen
- **UNANTASTBAR:**
  - Logo, Rechts- und Fließtexte, Überschriften auf `/` unverändert. Erlaubt sind nur MIKROTEXTE-Zeilen (Text v2).
  - Geschäftslogik nur über die gemeinsamen Hooks (G9).
  - Einwilligung: Inhalt, Kategorien und gleichwertige Knöpfe unverändert (E-013).
- **G5/G4:** keine neuen Drittanbieter, keine Tracking-Änderung, keine Geheimnisse. Kein Sonderverhalten für Prüfumgebungen (navigator.webdriver o. Ä.).
- **Messregeln:**
  - Probelauf-Gegenprobe (E-023) und die Tastatur-Abweichung: tragfähig oder Schönrechnen?
  - Kann der verbleibende Fokus-Befund „dünn“ wie behauptet zugelassen werden?
  - Text-v2-Werkzeugänderung e35370b: zu großzügig?
- **Tests:** P3-14e und Mutationsprobe 2. Ist jede live erreichbare Funktion F-01…F-19 in Kern **und** Bestand geprüft?

## Grenzen
- Nur lesen.
- Lokale GET-Anfragen an `127.0.0.1:4331` (Kandidat) und `127.0.0.1:4323` (Basis) per `curl -s` sind erlaubt, höchstens 1 pro Sekunde.
- Keine POST-Anfragen, kein Browserlauf, kein Build oder Start, kein git mit Schreibwirkung.

## Rückgabe `_relaunch/pakete/P3-16-GEG.rueckgabe.md`
- Die beiden Urteile.
- Befunde mit Schwere hoch/mittel/niedrig, je mit Ort, Beleg und Vorschlag.
- Eine Liste dessen, was du **nicht** prüfen konntest.
