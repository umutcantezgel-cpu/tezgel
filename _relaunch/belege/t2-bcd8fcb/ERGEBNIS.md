# T2 + T3 · Kandidat-Tor Startseite `/` · Kandidat bcd8fcb-k (Quelltext = Freischalt-Basis) · 11.10.2026

Kandidat: Reinraum-Kopie mit `freischalten.sh` (nur `/`), Basis a8e049f (Quelltext = Live 1efad2a), Ausgangsstand 707a93d. Zwischenkandidaten 926059b → 487eb2e → ad80754 → bf63dbe → d548bab → 21f1f01 → bf1ad72 → bcd8fcb; Gründe stehen unten und in E-023.

| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Reinraum (npm ci, Build, Typen, Lint, Test, qa:graph, nft) | grün | `scratchpad/reinraum-k7.log` |
| Funktionssuite (alle 11 Specs, ruhiges Fenster) | 350 grün · 0 rot · 16 übersprungen (fixme/skip je Projekt) | `suite.json` |
| Sperrklinke `testzahl.mjs` | grün · Fälle 115 · expect 501 · fixme 3 · skip 6 | – |
| Tests nach Gegenprüfung P3-14-GEG | P3-14e: jede Funktion in Kern und Bestand; Kandidat 180/0, Basis (RELAUNCH_FASSUNG=bestand) 174/0 | `pakete/P3-14e.rueckgabe.md` |
| Mutationsprobe 1 (9 Kern-Mutationen) | 9/9 erkannt, 50 Fälle rot | `../t2-ad80754/MUTATION.md` |
| Mutationsprobe 2 (7 Kern + 4 Bestand, ungedeckte Fälle) | 11/11 erkannt, 28 Fälle rot | `MUTATION-2.md` |
| Text v2 gegen Basis (MIKROTEXTE, 42 Zeilen) | GRÜN · rot 0 · nur `/` weicht ab; „seite-neu“ `/blog/gibt-es-nicht` = vom Testlauf erzeugter ISR-Eintrag im `.next`, kein Quelltext | `texte2-vergleich.json` |
| SEO `/` | Titel, Canonical, robots, OG-Titel, JSON-LD-Hash, Status gleich; Beschreibung = Wahrheitskorrektur (MIKROTEXTE Kl. 4); interne Links: keiner weg, 2 neu | `../t2-ad80754/texte/start.json` |
| axe `/` (m375, d1440, Zustände) | 0 ernst/kritisch (110 Knoten nur auf Bestandsseiten der Zustandsläufe, wie Basis) | `axe.json` |
| a11y-zusatz harte Kennzahlen `/` | Fokus unsichtbar 0 · verdeckt 0 · Sprung 0 · Falle 0 · Reflow 320 0 · Textabstand 0 · forced-colors 0 · ohne JS grün; Rest „dünn“ 1 (Ring zu 2 % unter offenem Banner, Element höher als freie Fläche; Bestand 44) | `a11y-zusatz.json` |
| Klassen-Abdeckung | ok | `kern-klassen.json` |
| SVG `/` | 2 begründete Abweichungen (viewBox 1, Strich ≠ 1,5 1), Logos unverändert | `../t2-ad80754/svg.json` |
| Pixel andere Seiten (16 Seiten × 4 Ansichten) | 64 Vergleiche · 0 abweichend (ad80754; danach nur Kern-Dateien geändert, T1 streng gleich) | – |
| Bewegung `/` | 17/17 registriert (mit Vorfahr), Technik 0, reduziert 0 Verstöße | `../t2-ad80754/bewegung.json` |
| Lighthouse verschränkt (5 + 5) | mobil 84 → 84 (LCP −7,8 %, TBT 140 → 224) · Desktop 99 → 100 | `lighthouse-vergleich.json` |
| INP verschränkt (4×, je 5) | alle sechs Interaktionen unter Basis und Budget, max 64 ms (Menü mobil 96 → 48) | `inp.json` |
| Slop `/` (Jäger + Opus-Gegenprüfer) | weich 5 · hart 0 (Basis 16/4); statisch: 1 echter Fund behoben (freier Wert Kopf) | `../t2-ad80754/slop-jaeger.json`, `../p316-statisch/BEWERTUNG.md` |
| Jury 3 + Lockvogel (ad80754) | 6,9 (Bestand 4,30, Lockvogel 4,85) ≥ Schwelle 6,30; Korrekturen aus allen drei Urteilen umgesetzt | `../t2-ad80754/jury.json` |
| Fünf-Sekunden-Probe (blind) | 10/10 alle drei richtig (Basis 10/10); regional m375 5/5 (Basis 0/5), d1440 0/5 (Basis 5/5, Banner) | `../t2-ad80754/fuenf/` |
| Probeläufer (15 Läufe) | frei: 15/15 gelöst; Gegenprobe auf Basis-Wegen: alle gleich bis auf Tastatur a1/a5 +3 (Fokus am Dokumentanfang nach Wurzel-Wechsel, E-023) | `probelauf/` |
| Gegenprüfer P3-16-GEG | siehe `pakete/P3-16-GEG.rueckgabe.md` | – |

Befunde für spätere Pakete (nicht blockierend):
- Region am Desktop-Erstbildschirm unter dem Banner.
- Leerräume zwischen Abschnitten; „+“ als Auswahlzeichen; Mono überdehnt.
- Mehrere Anfrageformulare auf derselben Seite.
- TBT mobil 224 ms (Budget 200).
- Lighthouse mobil 84 (Ziel ≥ 90).

> **Berichtigung (E-036, 11.10.2026):** Die Pixelvergleiche in diesem Beleg sind ungültig. Die Maske von `pixel.mjs` blendete die ganze Seite aus; erkannt wurden nur Höhenänderungen. Nachgeprüft mit dem berichtigten Werkzeug: `../p4-tor-r2/pixel/` (Stichprobe und rückwirkend gegen den Ausgangsstand).
