# E4-BAU-02 · Rückgabe (Baumeister, Arbeitsmodell)

Status: Prüfstufe A Lauf 2 (mit allen Änderungen) abgeschlossen. Gate ROT nur wegen Textschritt, und dort nicht auf meinen Seiten (siehe PRÜFUNG).

## GEÄNDERTE DATEIEN
- src/app/(bestand)/bad/barrierefreies-bad/page.jsx
- src/app/(bestand)/bad/fliesen/page.jsx
- _werkstatt/pakete/E4-BAU-02.rueckgabe.md (diese Datei)
Kein Commit, kein Push. Keine anderen Dateien geändert.

## WAS UND WARUM
- Beide Seiten auf KERN-v2-Bausteine nach dem Muster /bad/page.jsx: Einstieg art="erzaehl" (Etikett = bisherige Kennzeile, H1 mit bisheriger ID), Planblatt mit Verlegeplan (abdichtung bzw. grossformat, ohneAchse, interaktiv), Leitachse mit Abschnitten, Feldraster, Schrittfolge (Fliesen), Knopf, Rueckfrage neben dem Funnel. Funnel per next/dynamic mit Ladehinweis aus der Referenz.
- Entfernt: lucide, ambient-glow, icon-chip, Schatten, Verläufe, btn-/eyebrow-/ceramic-/glass-Klassen. Eine Icon-Familie (stern-voll, pfeil-rechts, telefon).
- Einzel-Icons der Karten entfallen (vom Orchestrator bestätigt). Keine Merkmalsliste im Einstieg, weil der Bestand keine hat (vom Orchestrator bestätigt).
- Zuschuss-Abschnitt seitlich auf Fliese; Badanfrage mit Rückfrage im Raster.
- Metadaten, Texte, Überschriften, Links, IDs und Reihenfolge unverändert. Textprobe: keine Wörter entfernt.

## GEMEINSAME DATEIEN (Bedarf, nicht geändert)
1. src/components/kern/Schrittfolge.tsx: Die Schrittnummer ist jetzt vorlesbar (im Bestand aria-hidden). Erbeten: aria-hidden="true" am Nummer-Element.
2. Fuß (gemeinsam): Der Textvergleich meldet gegen e0 einen fehlenden Link https://wa.me/491726728504 und eine fehlende Fax-Zeile sowie neue Fußzeilen (Anschrift, Telefon, Zeiten). Bitte im Fuß prüfen.

## MIKROTEXT-ÄNDERUNGEN ALT → NEU
- Blatt (Schriftfeld, Einstieg): „Barrierefreies Bad Wetzlar & Aßlar“ → „Barrierefreies Bad“ (Auftrag Orchestrator). Badfliesen unverändert: „Badfliesen & XXL-Großformate“.
- Neu, aus der Referenz: Ladehinweis „Anfrageformular wird geladen...“.
- Badge → Mono-Etikett mit gleichem Wortlaut (Großschreibung war CSS).
- <br /> in der H1 des barrierefreien Bades → zwei Blockzeilen, gleiche Wörter.

## PRÜFUNG UND ERGEBNIS (Lauf 2, mit Blatt-Änderung)
- Typprüfung tsc: GRÜN, 0 Fehler in eigenen Dateien, 0 übrige.
- Lint: GRÜN, 0 Fehler, 0 Warnungen.
- werte.mjs: 0 Befunde. bezeichner: leer.
- Funktionstests: GRÜN, 86 erwartet, 0 unerwartet, 0 flaky.
- Bilder m390 und d1440 je Seite: HTTP 200, 0 Konsole, 0 Überlauf, 0 Überlappung. GRÜN.
- Textvergleich: Gesamt-ROT mit entfernt 1 und seo 1. Auf meinen Seiten: main_zeilen entfernt leer, unerlaubt entfernt je Seite 0 (barrierefreies-bad 0, fliesen 0). Die Zeile und der SEO-Eintrag liegen nicht auf meinen Seiten; ich habe sie nicht lokalisiert. Bitte den Orchestrator prüfen.
- Gesamt: ROT, Exit 1, nur durch den Textschritt (Summe entfernt 1, seo 1, nicht auf meinen Seiten).
- DOM am Dev-Server: Heading-IDs je einmal, aria-labelledby zeigt darauf, Regionen Badanfrage, Kundenstimme, Ansprechpartner vorhanden.
- Bilder visuell geprüft (m390, d1440 beider Seiten): kein Überlauf, keine Überlappung, Planblatt mit Blatt-Namen sichtbar.

## BILDBELEGE (scratchpad E4-BAU-02/bilder/)
- bad__barrierefreies-bad/m390.jpg, d1440.jpg
- bad__fliesen/m390.jpg, d1440.jpg

## OFFENE FRAGEN
1. Schrittnummer vorlesbar (GEMEINSAME DATEIEN 1).
2. Textgate Gesamt ROT: entfernt 1 und seo 1 liegen auf einer anderen Seite. Orchestrator bitte Seite bestimmen.
