# T2 + T3 · Kandidat-Tor Startseite `/` · Endstand 5421e5b-k · 11.10.2026

Kandidat: Reinraum-Kopie mit `freischalten.sh` (nur `/`), Basis a8e049f (Bestand = Live), Ausgangsstand 707a93d. Die Kette der Zwischenkandidaten und ihre Gründe stehen in `../t2-bcd8fcb/ERGEBNIS.md`, E-023 und E-024. Gegenüber bcd8fcb-k hinzugekommen (P3-16-GEG):
- „Verifizierter Kunde“ und „verifizierte Google-Rezensionen“ entfernt bzw. korrigiert (H-1).
- Unterzeile ab xl einzeilig (M-6).
- Kundenname als eigenes Element.
- Suspense-Grenzen versucht und zurückgenommen (ohne JS unsichtbar, LERNEN).

| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Reinraum (npm ci, Build, Typen, Lint, Test, qa:graph, nft) | grün | `scratchpad/reinraum-5421e5b-k.log` |
| Funktionssuite (11 Specs, ruhiges Fenster) | 350 grün · 0 rot · 16 übersprungen | `suite.json` |
| Sperrklinke | grün (Fälle 115, expect 501) | – |
| Mutationsproben | 9/9 (`../t2-ad80754/MUTATION.md`) und 11/11 (`../t2-bcd8fcb/MUTATION-2.md`) | – |
| Text v2 gegen Basis (MIKROTEXTE 43 Zeilen) | GRÜN · rot 0 · nur `/` weicht ab | `texte2-vergleich.json` |
| axe `/` (m375, d1440, Zustände) | 0 ernst/kritisch | `axe.json` |
| a11y-zusatz `/` | Fokus unsichtbar 0 · verdeckt 0 · Sprung 0 · Falle 0 · Reflow 0 · Textabstand 0 · forced-colors 0 · ohne JS grün · „dünn“ 1 (Stimmen-Bereich unter offenem Banner, 0,98·U statt 1,5·U; zählt nach E-018-Nachtrag als Information; Bestand 44) | `a11y-zusatz.json` |
| Klassen-Abdeckung · SVG | ok · `/` 0 harte SVG-Befunde (5 „Zugänglichkeit fehlt“ nur Logo-Dateien und Bestand) | `kern-klassen.json`, `svg.json` |
| Pixel andere Seiten (16 × 4 Ansichten) | 64 Vergleiche · 0 abweichend | – |
| Lighthouse verschränkt (10 + 10) | mobil 85 → **88** · LCP 4.193 → 3.461 ms (−17,5 %) · TBT 141 → 196 ms (Budget 200) · CLS 0 · Desktop 100 → 100 | `lighthouse-vergleich.json` |
| INP verschränkt (4×, je 5) | alle sechs Interaktionen unter Basis und Budget, max 56 ms | `inp.json` |
| Probeläufer: Basis-Wege am Endstand (15) | 13 gleich oder besser (a3 Tastatur 34 → 29, a1 Touch mit Kern-Weg 4 → 3, a5 Touch mit Kern-Namen 10 → 10); Tastatur a1 23 → 26, a5 114 → 117 (E-023, ABNAHME „Offene Abweichungen“) | `probelauf/` |
| Probeläufer frei (P3-16b, ad80754-k) | 15/15 gelöst | `../t2-bcd8fcb/probelauf/frei-ad80754/` |
| Fünf-Sekunden-Probe (blind) | siehe unten | `fuenf/` |
| Slop `/` · Jury | weich 5 / hart 0 (Basis 16/4) · 6,9 (Bestand 4,30) – an ad80754-k; danach nur Korrekturen aus Jury, Probelauf und Gegenprüfung | `../t2-ad80754/` |
| Gegenprüfer | Runde 1 P3-16-GEG: nein (H-1, M-1 … M-6) → umgesetzt; Runde 2: siehe `pakete/P3-16-GEG2.rueckgabe.md` | – |

Offene Abweichungen für spätere Tore (ABNAHME):
- Tastatur a1/a5 +3 (E-023).
- TBT liegt jetzt unter dem Budget, aber über dem Bestand (E-024).

Befunde für P6:
- Leerräume zwischen Abschnitten.
- „+“ als Auswahlzeichen.
- Mono überdehnt.
- Mehrere Anfrageformulare.
