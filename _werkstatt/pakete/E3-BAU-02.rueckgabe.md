# E3-BAU-02 · Rückgabe (Baumeister, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/leistungen/page.jsx` (Seitenkörper neu; `"use client"` entfällt, weil keine Hooks oder Ereignis-Handler mehr vorkommen)
- `_werkstatt/pakete/E3-BAU-02.rueckgabe.md`

Kein Commit, Push, Build oder Serverstart durch mich.

## WAS UND WARUM
- Erzählansicht nach Startseiten-Muster: Einstieg mit Laserachse, H1 links, Vorspann, drei Knöpfe; rechts Verlegeplan „grossformat“ ohne Achse und ohne Text. Leitachse über alle Abschnitte.
- Fachgewerke als Feldraster: je Leistung eine Plan-Vignette statt Icon-Kachel, H2, Text, Unterpunkte, Merkmale mit Fugenkreuz, Textlink, Knopf. Die Leistungs-IDs stehen am umgebenden div, weil `Feld` keine `id` annimmt.
- Ablauf als Schrittfolge (waagrecht ab lg), Projekt mit Rechner, Express-Anfrage seitlich mit Funnel. Anker `#gewerke` und `#express-anfrage` bleiben.
- Entfernt: Glas- und Keramikklassen, Glows, Icon-Kacheln, Schatten, Verlauf, Pill-Badges. Unverändert: JSON-LD, Rechner, Funnel, FinalCTA. Kein Auftritt, kein großer Moment.

Mikrotexte alt → neu (Wortlaut gleich, außer genannt):
- Badges „{Kürzel} Fachbetrieb“ und „Aßlar · Wetzlar · Mittelhessen“ → ein Etikett; Trenner ist ein Fugenkreuz (kein Text).
- Eyebrows → Etiketten: „Geprüfte Fachkompetenz“, „Ausführungs-Standards“, „Projekt & Ausgangslage“, „Online-Bedarfsabfrage“.
- Subcategory-Tags → Mono-Liste mit Fugenkreuz.
- WhatsApp-Knopf: Icon (Sprechblase) → Markenlogo, dekorativ. Wortlaut „WhatsApp Schnellkontakt“ gleich.
- Schrittnummern „01“–„03“: vorher aria-hidden, jetzt lesbar (Verhalten des Bausteins).
- H1: Wortlaut gleich; die Gradientklasse am Teil „Fachgewerke Wetzlar“ entfällt.
- Neue IDs nur für aria-labelledby: `ablauf-heading`, `projekt-heading`, `anfrage-heading`. Erhalten: `gewerke`, `express-anfrage`, `bad`, `wohnen`, `aussen`, `untergrund`.

## GEMEINSAME DATEIEN
- `_werkstatt/werkzeuge/test-zuordnung.json`: vor dem ALLE-Eintrag einfügen: `{ "muster": "leistungen/page", "specs": ["funktion-express-funnel.spec.mjs", "funktion-navigation.spec.mjs"] }`. Ohne diesen Eintrag prüft pruefe-a die Seite nicht auf Funktionstests.
- Sonst keine Änderung nötig.

## PRÜFUNG UND ERGEBNIS
- `umbau.mjs`: Trockenlauf, dann `--schreiben`; die 4 ZU_PRUEFEN (Icon-Kacheln) von Hand gelöst.
- `textprobe` gegen HEAD: alle acht entfernten Textknoten (H1 und sechs Überschriften/Etiketten) stehen wortgleich als Prop wieder. `bezeichner`: ohne Befund. `werte.mjs`: 0 Befunde. eslint: 0 Fehler, 0 Warnungen.
- Prüfstufe A auf der Endfassung: Typprüfung GRÜN, Lint GRÜN, Bilder GRÜN (HTTP 200, Konsole 0, Überlauf 0, Überlappung 0), Textvergleich GRÜN, Funktionstests ÜBERSPRUNGEN (keine Zuordnung nach Dateipfad). Gesamt GRÜN.
- Manuell gegen 4320: `funktion-express-funnel` und `funktion-navigation` zusammen 67 bestanden, 5 vorab übersprungen, 0 Fehler. Diese Läufe liefen vor der letzten Korrektur der Kartenfußzeile (nur Klassen; Funnel, Links und IDs unberührt).
- Textvergleich zwischendurch ROT: meine H1-Abweichung (behoben) und die vorbestehende Spanne „Schnelle Reaktionszeit • Persönliche Betreuung vor Ort • HWK-Fachbetrieb“ (FinalCTA, im Ausgangsstand 4310 identisch). Die Spanne steht jetzt in `_werkstatt/texte-erlaubt.json` (Eintrag aus Commit af1b434, E3-BAU-07).
- Server 4320 `/leistungen`: HTTP 200; Leistungs-IDs und Anker je einmal, keine alten Klassen im HTML.

## BILDBELEGE
Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-02/`:
- Ansichten: `bilder/leistungen/m390.jpg`, `bilder/leistungen/d1440.jpg`
- Ganze Seite: `bilder-voll/d1440-voll.jpg`, `bilder-voll-m/m390-voll.jpg`
- Ausschnitte: `bilder-fuss-d/d1440.jpg`, `bilder-fuss-m/m390.jpg`

## OFFENE FRAGEN
1. Commit `bc9e0d1` („ZWISCHENSTAND“, 21:07) enthält die Seite in einem Zwischenstand; er ist nicht von mir ausgelöst. Der Arbeitsbaum hat die spätere Fußzeilen-Korrektur (1 Zeile). Den Endstand sichern entscheidet der Orchestrator. Ich habe nichts committet, geamendet oder zurückgesetzt.
2. Baustein `Abschnitt` (erzaehl) nutzt `py-16/lg:py-24`; der K-005-Text im Briefing nennt `py-24/lg:py-32`. Commit af1b434 spricht von einer K-005-Nachführung; Stand klären.
3. Die Vignette „wohnen“ zeigt eine rote Achse; neben der Leitachse entsteht je Bildschirm eine zweite rote Linie. Entscheidung: Vignette ohne Rot, oder Leitachse hier weglassen.
4. Der Preisrechner-Test deckt nur `/preise` ab; der Rechner auf `/leistungen` ist nur durch Bild belegt.
