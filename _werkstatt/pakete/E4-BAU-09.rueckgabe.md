# Rückgabe E4-BAU-09 · Baumeister · /fliesen/kueche, /fliesen/neubau

Vom Orchestrator aus der Antwort des Baumeisters abgelegt (der Baumeister hat keine Rückgabedatei geschrieben).

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/kueche/page.jsx`
- `src/app/(bestand)/fliesen/neubau/page.jsx`

## WAS UND WARUM
- Beide Seiten auf KERN-Bausteinen nach `fliesen/page.jsx`: Einstieg `art="erzaehl"` (Etikett = bisherige Kennzeile, H1-ID am Titel, Vorspann, Knöpfe), Planblatt mit Plan `wohnen` bzw. `untergrund` (Blatt „Küchenfliesen verlegen“ ohne Ortsangabe bzw. „Fliesen im Neubau verlegen lassen“), Abschnitte in der Leitachse.
- Küche: Anforderungen als Merkliste (5); Planung als Feldraster 2×2; Rutschhemmung seitlich auf Fliese; Kundenstimme als Zitat mit Quelle in Mono; Weiterführende als Merkliste 2×2; Konfigurator nachgeladen mit Rückfrage (8/4); Abschluss auf Tinte.
- Neubau: Bauablauf als Schrittfolge (senkrecht, Nummern stumm); Schnittstellen seitlich auf Fliese mit Fugenkreuz-Liste; Bausteine als Merkliste 2×3; Belegreife, Bemusterung, Festpreis, Abnahme als Feldraster 2×2; Weiterführende als Register; Qualitätsversprechen, dann Konfigurator mit Rückfrage.
- Entfallen: lucide-Icons, Icon-Kacheln, Umgebungsglanz, Alt-Klassen, Schatten, Verläufe, orange Hervorhebung des Schritts „Fliesenarbeiten“ (Gestaltung, kein Text). Keine Mikrotext-Änderung; Einstieg ohne `merkmale`.

## PRÜFUNG (Prüfstufe A, zweiter Lauf, GRÜN)
- tsc 0, ESLint 0/0; Funktionstests 72/0 (erster Lauf: ein Fehler im FAQ-Aufklapper auf /faq mobil, außerhalb des Pakets, im zweiten Lauf grün); Bilder HTTP 200, Konsole 0, Überlauf 0, Überlappung 0; Textvergleich entfernt 0, unerlaubt 0 (erster Lauf: „Direkt sprechen:“ fehlte, behoben); werte.mjs 0; bezeichner.cjs ohne Befund.
- Bilder: Scratchpad `E4-BAU-09/` (Erstanblick und Ganzseiten in Teilen).

## GEMEINSAME DATEIEN (Bedarf, nicht geändert)
- Baustein „Kundenstimme“ (K-009) fehlt in `src/components/kern/`; hier als `figure` im Abschnitt.
- Schrittfolge ohne Prop zum Hervorheben eines Schritts.
- Textbasis e0 enthält `https://wa.me/…`, die Konfiguration liefert `api.whatsapp.com` (Liste `links_entfernt`, ohne Wirkung auf das Ergebnis).

## OFFENE FRAGEN (Antwort Orchestrator)
1. Rückgabedatei: hiermit abgelegt.
2. Schlussknopf „Aufmaß anfragen“ auf Tinte in Variante „hell“: bestätigt (wie Referenz).
3. Kundenstimme mit Leerraum rechts: angenommen (Zitat in Lesebreite); ein Baustein „Kundenstimme“ ist als Kleinpunkt vermerkt.
