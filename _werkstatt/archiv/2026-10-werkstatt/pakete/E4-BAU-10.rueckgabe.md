# E4-BAU-10 · Rückgabe (Baumeister, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/renovierung/page.jsx`
- `src/app/(bestand)/fliesen/verlegetechnik/page.jsx`

Keine Commits, keine Pushes. Andere geänderte Dateien im Arbeitsbaum stammen von anderen Agenten und wurden nicht angefasst.

## WAS UND WARUM
- Beide Seiten auf Erzählansicht umgebaut: Einstieg mit `Einstieg art="erzaehl"`, Etikett aus der bisherigen Kennzeile, H1 mit bisheriger ID, Vorspann, Knöpfe als `Knopf`. Randspalte als `Planblatt` mit `planfelder` und Plan „reparatur“ bzw. „fugen“, jeweils `ohneAchse bemassung={false} interaktiv`.
- Blattname aus dem Seitentitel: „Fliesen Renovierung“ bzw. „Verlegetechnik Fliesen“.
- Badges und H2 zu `Abschnitt` (Etikett, Titel, Einleitung, `titelId` = bisherige ID). Kartenraster zu `Feldraster`/`Feld`, Merkmalslisten zu Fugenkreuz-Listen, Ablauf zu `Schrittfolge`, Fugenmörtel-Vergleich zu `Tabelle`, Ratgeber zu `Merkliste`.
- Leitachse über die Abschnitte, `spaet` ab dem ersten Bildschirm. Konfigurator per `next/dynamic` mit Ladehinweis, Rückfrage neben dem Konfigurator (Regel „keine leere Spalte“).
- Lucide-Icons entfernt, Icon-Kacheln und Ambient-Ebenen entfallen. Klassen auf Systemwerte umgestellt (Mechanik per `umbau.mjs`, danach von Hand nachgezogen).
- Reihenfolge und Wortlaut der Seiten unverändert. Der Hinweis zu Schadstoffen steht als Box mit Kern-Klassen, nicht als Hinweis-Baustein, damit der Text in einer Zeile bleibt.

## GEMEINSAME DATEIEN (Bedarf, nicht geändert)
1. `src/components/kern/Hinweis.tsx`: ohne `titel` setzt der Baustein ein `sr-only`-Präfix („Warnung: “) vor den Text. Gewünscht: eine Option, die dieses Präfix abschaltet, wenn der Text seine Art selbst nennt. Dann kann der Hinweis zu Schadstoffen den Baustein nutzen.

## PRÜFUNG UND ERGEBNIS
Prüfstufe A, zweiter Lauf nach Korrektur (erster Lauf: Textvergleich ROT wegen zwei Zeilen, siehe unten):
- Typprüfung tsc: GRÜN, 0 Fehler in eigenen Dateien, 0 übrige.
- Lint eslint: GRÜN, 0 Fehler, 0 Warnungen.
- Funktionstests (funktion-navigation, funktion-kontaktwege): GRÜN, 72 erwartet, 0 unerwartet, 0 flaky.
- Bilder 390/1440: GRÜN, HTTP 200/200, Konsole 0, Überlauf 0, Überlappung 0.
- Textvergleich gegen e0: GRÜN, entfernt 0 (Seiten: `main_zeilen.entfernt` leer), unerlaubt entfernt 0.
- `werte.mjs`: 0 Befunde. `bezeichner.cjs`: keine Befunde.
- Erster Lauf: ROT, weil der Hinweis (Überschrift als eigener Block) und die Zeile „Direkt sprechen“ (Icon im Link) im Zeilenvergleich als entfernt galten. Behoben durch Rückbau auf die bisherige Struktur, Lauf wiederholt.
- Textprobe (`textprobe.cjs` gegen HEAD): Alle ENTFERNT-Einträge kehren als `etikett=`/`titel=`/`name=` mit gleichem Wortlaut wieder. IDs stehen jetzt als `titelId` am H2; im ausgelieferten HTML kommt jede ID genau einmal vor (per GET geprüft).
- Die H1 ist wortgleich: „Fliesenboden im Bestand erneuern: Ablauf im bewohnten Haus“ und „Verlegetechnik und Werkstoffe: Kleber, Bettung und Fugenmörtel“.

## BILDBELEGE
Erster Bildschirm (Hero und Planblatt, beide Seiten, 390 und 1440), Scratchpad:
- `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-BAU-10/bilder/fliesen__renovierung/m390.jpg`
- `…/bilder/fliesen__renovierung/d1440.jpg`
- `…/bilder/fliesen__verlegetechnik/m390.jpg`
- `…/bilder/fliesen__verlegetechnik/d1440.jpg`

Vollbilder (Ganzseite) und Ausschnitte zur Prüfung auf graue Restzellen und Leerspalten, im selben Scratchpad-Ordner:
- `voll_fliesen_renovierung/d1440-voll.jpg`, `voll_fliesen_verlegetechnik/d1440-voll.jpg`, `voll_…/m390-voll.jpg`
- `crop-vt-kleber.jpg` (Kleber-Raster mit über zwei Spalten laufendem letztem Feld, Verformbarkeit): sauber.
- `crop-rg-technik2.jpg` (Technik, Hinweis, Ratgeber-Raster): sauber.

## MIKROTEXT-ÄNDERUNGEN (alt → neu)
- Ladehinweis des Konfigurators (vorher nicht vorhanden): neu „Anfrageformular wird geladen...“, wortgleich wie in der Referenz `(bestand)/bad/page.jsx`.
- Tabelle „Vergleich zementärer Fugenmörtel …“: vorher sichtbare Caption (sr-only), jetzt Name der Region (`aria-label`) und Caption, gleicher Wortlaut.
- Schrittnummern „01“–„04“: vorher `aria-hidden`, jetzt über `nummerStumm` weiterhin `aria-hidden`. Keine Wortänderung.
- Sonst keine Mikrotext-Änderungen; alle Knopftexte, Etiketten und Zustandsmeldungen unverändert.

## OFFENE FRAGEN
1. Einstieg ohne Merkmalsliste: Die bisherigen Hero-Bereiche beider Seiten haben keine Zusagen. Eine Fugenkreuz-Liste im Einstieg wäre neuer Text und wurde deshalb nicht ergänzt. Soll eine Liste ergänzt werden, bitte mit Wortlaut.
2. Rückfrage neu: Die Rückfrage (Ansprechpartner, Telefon, E-Mail) steht jetzt neben dem Konfigurator. Das ist Regel, aber neuer sichtbarer Text auf beiden Seiten.
3. Heading-Ebenen: Grundierung und Hohlstellen (Verlegetechnik) stehen als H2 direkt im Feldraster ohne eigenen Abschnittskopf. Das entspricht dem Bestand, wäre aber eine Frage an die Gliederung.
