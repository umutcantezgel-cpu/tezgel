# ABNAHME · Definition of Done (Z-01 bis Z-10)

Kriterium · Methode · Schwelle · Beleg · Status. Erledigt ist nur, was geprüft ist; Kriterien sinken nie still. Status: ☐ offen · ☑ erfüllt (mit Beleg) · AUSNAHME (nach L7, höchstens zwei, keine für Z-02) · UMGEBUNGSAUSNAHME (unten, mit Ersatzprüfung).

## Messprotokoll (gilt für Ausgangswerte und alle späteren Messungen)
- Lokaler Produktionsserver (`server.sh`, Reinraum-Build des gemessenen Commits), 127.0.0.1:4310, komprimiert.
- Lighthouse 13 Standardprofile (mobil: simuliert 4× CPU, Slow 4G; Desktop-Preset), Erstbesuch mit Einwilligungsbanner, Dritt-Hosts gesperrt (`GESPERRTE_HOSTS`), Aufwärmlauf, dann Median aus 3; Spanne je Kennzahl; Benchmark-Band ±15 % (sonst Wiederholung).
- Bildsätze: Aufnahmeprotokoll `bildsatz.mjs` (Einwilligung „abgelehnt“, reduzierte Bewegung, m390/t768/d1440, DPR 1, feste Scrollpositionen) – gleich für vorher und nachher.
- Während Messungen läuft kein Build und kein weiterer Browser-Agent.

## Kriterien

| Nr | Kriterium | Methode | Schwelle | Beleg | Status |
|---|---|---|---|---|---|
| Z-01 | Plan | Abgleich mit PLAN.md | 100 % der Pflichtpakete erledigt und abgenommen; jede Kür-Position KÜR-01…KÜR-09 erreicht ihre Schwelle | PLAN.md mit Commit-Kennungen | ☐ |
| Z-02 | Bestand | Prüfstufe C: Reinraum (build, typecheck, lint, `npm test`, `qa:graph`), Funktionstests F-01…F-19 + neue Fälle gegen 4310 (Attrappe und echte Route im Mock-Modus), Konsole, Text-/SEO-Vergleich gegen E0 | alles grün; `npm test` alle grün und ≥ 17 Fälle; bekannte Altfehler-`fixme` nehmen nicht zu, V-01 aufgelöst; 0 neue Konsolenfehler; Sitemap 163, 0 kaputte interne Links; Textabweichungen nur protokollierte Mikrotexte; Abnahmetests V-01…V-06 grün | `belege/c/` | ☐ |
| Z-03 | Designsystem | `werte.mjs --basis 745335f --arbeitsbaum` über alle geänderten Dateien + Stichprobe | 0 Werte außerhalb von KERN, 0 Klassen ohne CSS; jede neue Komponente nutzt das System; Ausnahmen nur laut `werte-regeln.json` (E-Mail-Vorlagen, SVG-Koordinaten, `next/og`) | `belege/c/werte.json` | ☐ |
| Z-04 | Gestaltung | Frischer Opus-Endprüfer, nur Bilder (Bildsatz Abschluss) + 5-Bild-Folgen der großen Momente, Rubrik Abschnitt 9; Blindvergleich vorher/nachher, neutral benannt, zufällige Reihenfolge, Schlüssel getrennt | jede Hauptansicht Ansichtswert ≥ 8, keine Kategorie < 7; auf jeder Hauptansicht wird der neue Stand vorgezogen | `bilder/abschluss/`, `bilder/blind/`, `berichte/C-ENDPRUEFUNG.md` | ☐ |
| Z-05 | Bewegung | `bewegung.mjs` Modi register (beide Richtungen), reduziert, einzelbilder, bildrate (m390, 4× CPU, Tracing beim Scrollen) | jede Animation im Register; bei reduzierter Bewegung keine Lage-/Größenänderung, alle Inhalte sichtbar; große Momente ≤ 5 % verworfene Bilder | `belege/c/bewegung/` | ☐ |
| Z-06 | Grafik | `svg.mjs` (Dateien + Seiten), Paketprüfung | eine Icon-Familie (lucide und Phosphor deinstalliert; Markenlogos ausgenommen), alle SVG optimiert (Fixpunkt) und zugänglich, 0 doppelte IDs je Ansicht, Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip | `belege/c/svg.json` | ☐ |
| Z-07 | Zugänglichkeit | `axe.mjs` WCAG 2.2 AA auf den Hauptansichten inkl. Zustände Menü offen und Banner; Probelauf der Hauptaufgaben K-002 nur mit Tastatur, mobil und Desktop | 0 ernste oder kritische Befunde; alle Hauptaufgaben lösbar bei sichtbarem Fokus; Kontraste nach Abschnitt 6 | `belege/c/axe.json`, `belege/c/hauptaufgaben.md` | ☐ |
| Z-08 | Leistung | `lighthouse.mjs --hauptansichten` nach Messprotokoll | mobil auf allen Hauptansichten LCP ≤ 2,5 s, CLS ≤ 0,1, TBT ≤ 200 ms; je Kennzahl mobil und Desktop nicht schlechter als E0 um mehr als die Spanne der drei E0-Läufe. Belegfelder: Leistung ≥ 90, Schriften ≤ 250 KB, Bewegungs-JS ≤ 60 KB gzip | `belege/c/lighthouse.json` | ☐ |
| Z-09 | Darstellung | `bildsatz.mjs` Hauptansichten + 10 %-Stichprobe der übrigen Ansichten (≥ 5, nach Familien geschichtet, feste Saat), Überlauf und Überlappung; Ersatzpfad-Lauf ohne `animation-timeline`/View Transitions für die Szenen-Ansichten | 0 Überlauf, 0 Überlappung, kein abgeschnittener Text in 390/768/1440; Ersatzpfad ohne Befund und axe-sauber | `belege/c/bildsatz.json` | ☐ |
| Z-10 | Übergabe | Endprüfung | BERICHT.md mit Galerie-Seite `bilder/galerie.html`, KERN.md, MENSCHEN.md, Anleitung zum Zusammenführen und Zurückrollen vollständig | Dateien | ☐ |

## UMGEBUNGSAUSNAHMEN (E1; zählen nicht als AUSNAHME; Eintrag in MENSCHEN M-09)
- **Echte Geräte, Safari/WebKit, Firefox** sind in der Cloud nicht installierbar. Ersatzprüfung: Chromium mit Geräteemulation (Touch, DPR) in allen GERÄTEGRÖSSEN; Ersatzpfad-Lauf ohne `animation-timeline` und View Transitions (Darstellung wie Safari < 26 / Firefox).
- **Bildrate auf echter Grafikhardware** ist nicht messbar. Ersatzprüfung: Software-Rendering bei 4× CPU-Drosselung mit Frame-Tracing und Long Animation Frames.
- **INP im Feld** ist im Labor nicht messbar. Ersatzprüfung: TBT plus gemessene Eingabeverzögerung beim Klick auf die Hauptknöpfe.

## Ausgangswerte (E0)
_Werden von E0-PRUEF-03 erhoben (12 Hauptansichten, neue Gerätegrößen) und hier eingetragen. Vergleichswerte des Vorlaufs (7 Seiten, 375 px, Median aus 5): mobil LCP 3,4–6,6 s, CLS 0 bis 0,516 (/standorte), TBT 111–255 ms, Leistung 67–88; axe 1.661 ernste/kritische Knoten (120 Seiten, 4 Ansichten); Funktionstests 292 Fälle grün bis auf Altfehler-`fixme`; `npm test` 17/17._

## AUSNAHMEN
_keine_
