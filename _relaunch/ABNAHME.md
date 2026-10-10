# ABNAHME · Definition of Done (Lauf 1, angepasst)

Kriterium · Methode · Schwelle · Beleg · Status. Erledigt ist nur, was geprüft ist. Kriterien sinken nie still.
Status: ☐ offen · ☑ erfüllt (mit Beleg) · ENTFÄLLT (nur durch Entscheidung des Auftraggebers, E-000) · AUSNAHME (nach L7, höchstens zwei, nie Z-03/Z-05/Z-11).

| Nr | Kriterium | Methode | Schwelle | Beleg | Status |
|---|---|---|---|---|---|
| Z-01 | Verlustatlas | – | – | E-000: „Nur aufwerten, ohne Rückführung“ (Antwort des Auftraggebers, 10.10.2026) | ENTFÄLLT |
| Z-02 | Rückführung | – | – | E-000 (wie Z-01) | ENTFÄLLT |
| Z-03 | Funktion | Ebene 2: je Funktion der Funktionsliste ein Test der Kernaufgabe (Formulare gegen Attrappe und gegen echte Route im Mock-Modus); Mutationsprobe | 100 % grün, Mutationsprobe bestanden; „Altverhalten“ = Ausgangsstand 5a7a7b0 | `belege/*/funktion*.json`, Mutationsprotokoll | ☐ |
| Z-04 | Besucheraufgaben | Probeläufer (Haiku) mobil + Desktop, Touch/Maus/Tastatur; Fünf-Sekunden-Probe je Hauptseite | alle 5 Aufgaben lösbar, Schrittzahl ≤ Ausgangsstand, 0 Befunde „hoch“; frischer Haiku nennt Angebot, Zielgruppe, nächsten Schritt richtig | Protokoll | ☐ |
| Z-05 | Bestand | Ebene 1: Reinraum-Build, typecheck, lint, `npm test`, `qa:graph`; Konsolenfehler aus Plattform-Code; Funktionsliste | mindestens wie P0 (alles grün, 17/17 Tests), 0 Konsolenfehler, Funktionsliste 100 % | `belege/p0/reinraum-ausgangsstand/`, Wellen-Logs | ☐ |
| Z-06 | Suche | Ebene 7: Texte-/SEO-Invarianten, Sitemap (163), robots, Canonical, JSON-LD, interne Links; alte URLs: Batherm-Pfade → 410, `/bad/budgetkalkulator` → 308, Original-tezgel.de → M-08 | 100 % der alten URLs 200/308/410; Metadaten vollständig; 0 kaputte interne Links | `belege/*/texte-index.json`, Prüfliste URLs | ☐ |
| Z-07 | Slop | `statisch.mjs` + Slop-Jäger (Haiku) über Grundmenge in allen Ansichten, Opus-Gegenprüfer für weiche | 0 harte; weiche −80 % ggü. P0, ≤ 2 je Hauptseite mit anerkannter Begründung; S-13/S-14 mit Eintrag gelten als bearbeitet | MESSUNGEN.md (Zählung vorher/nachher) | ☐ |
| Z-08 | Jury | 3 Opus-Jurys je Hauptseite (Rubrik, nur Bilder, Lockvogel), Blindvergleich | gewichtet ≥ 8,0, keine Kategorie < 7,5; Blindvergleich ≥ 90 % | MESSUNGEN.md | ☐ |
| Z-09 | Bewegung | Ebene 4: Register-Abgleich data-motion, Framezeiten 4× CPU mobil, LoAF, reduzierte Bewegung | 100 % registriert; ≤ 5 % verworfene Frames; kein LoAF > 20 ms Skript aus Bewegungscode; bei reduce keine Positions-/Größenänderung | Messprotokoll, Bildfolgen | ☐ |
| Z-10 | SVG | Ebene 8: SVG-Prüfskript, SVGO-Fixpunkt, IDs im DOM, Zugänglichkeit | 100 % Formsystem, 0 ID-Kollisionen, eine Icon-Familie, Budgets (Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip) | Prüfskript-Ausgabe | ☐ |
| Z-11 | Barrierefreiheit | Ebene 5: axe (wcag2a/aa, 21a/aa, 22aa) alle Ansichten + Menü/Dialog/Fehler; Tastatur; Reflow 320; Zoom 200 %; Textabstände; forced-colors; ohne JS | 0 ernste/kritische; ohne Verlust | `belege/*/axe.json` | ☐ |
| Z-12 | Leistung | Ebene 6: Lighthouse mobil/Desktop, Median aus 5, lokaler Produktions-Build | Budgets auf allen Hauptseiten; keine Seite > 3 Punkte oder > 10 % LCP schlechter als P0 | `belege/*/lighthouse.json` | ☐ |
| Z-13 | Darstellung | Ebene 3: Fotos aller Ansichten, Überlaufprüfung | 0 Überlauf, kein abgeschnittener/überlappender Text auf allen 120 Seiten | `belege/*/fotos-zusammenfassung.json` | ☐ |
| Z-14 | Übergabe | frischer Opus-Gegenprüfer | BERICHT mit Galerie, KERN als Doku, MENSCHEN vollständig, Anleitung Zurückrollen | Dateien | ☐ |

Geltungsbereich: Z-05 und Z-11 gelten für alles, was der Lauf ändern darf. Vorbestehende Befunde in Unantastbarem, Geschäftslogik und Einbettungen dürfen nicht zunehmen und stehen mit Fundstelle in MENSCHEN.md bzw. `intern/`.
