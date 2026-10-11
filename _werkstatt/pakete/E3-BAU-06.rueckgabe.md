# E3-BAU-06 · Rückgabe (Baumeister, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/page.jsx` (Seitenkörper neu; Metadaten, Daten und Wortlaut unverändert)
- `_werkstatt/pakete/E3-BAU-06.rueckgabe.md`

Kein Commit, Push, Build oder Serverstart durch mich. Drei automatische „ZWISCHENSTAND“-Commits (47395eb, a6d614a, f56ecb4; 22:32–22:42 UTC) enthalten meinen Zwischenstand; ausgelöst habe ich sie nicht. HEAD trägt die Endfassung.

## WAS UND WARUM
- Einstieg (Erzählansicht, Laserachse): Etikett in Mono, H1 als ein Stück. `Einstieg` nimmt keine H1-ID an, daher `id="fliesen-hub-heading"` am inneren span. Vorspann, zwei Knöpfe, rechts der Verlegeplan `wohnen` ohne Achse und ohne Bemaßung.
- Leitachse über die Abschnitte:
  - Alle Themen: Register mit 14 Zeilen (Name, Beschreibung, Pfeil).
  - Wissen kompakt: Feldraster mit zwei Spalten, sechs Felder (fünf Ratgeber plus Bad), 19 Textlinks als `Knopf`.
  - Weitere Fachthemen: Register mit 5 Zeilen (Name, Beschreibung, Seitenzahl in Mono).
  - Vom Ratgeber zum Projekt: seitlich auf Fläche Fliese, 3 Merkmale mit Fugenkreuz, Bewertungskarte mit den Originalwörtern, 3 Knöpfe.
  - Weiterführende Ratgeber: Merkliste mit 2 Spalten (4 Links), darunter der Absatz mit 2 Links.
  - Konfigurator: `kopf="seitlich"` (8 Spalten, Lesebreite); `id="konfigurator"` und `aria-label` unverändert.
- QualityPromise und FinalCTA unverändert nach der Leitachse.
- Entfernt: Lucide-Icons und Icon-Kacheln (`PAGE_ICONS`), Glows, Glas- und Keramikklassen, Verläufe, Schatten, Pill-Links. Keine Hooks, daher kein `"use client"`.
- Abweichungen mit Grund: Register statt Kartenraster, weil sonst eine leere Zelle bliebe (14 und 5 Einträge; Muster sind die Fachbereiche der Startseite). Google-Wert weder als `Kennwerte` (die Lesefolge änderte sich) noch als `GoogleReviewsBadge` (neuer externer Link, andere Wörter). Schriftfeld nicht eingesetzt (bräuchte neue Etiketten).
- Keine Bewegung, kein `auftritt`, kein großer Moment, kein Verband-Umschalter. Mikrotexte: Wortlaut unverändert, Badges sind Etiketten in Mono.

## GEMEINSAME DATEIEN
In `_werkstatt/werkzeuge/test-zuordnung.json` vor dem ALLE-Eintrag einfügen:
```json
  {
    "muster": "app/\\(bestand\\)/fliesen/page",
    "specs": ["funktion-konfigurator.spec.mjs", "funktion-kontaktwege.spec.mjs"]
  },
```
Ohne diesen Eintrag laufen für `/fliesen` in Prüfstufe A keine Funktionstests.

## PRÜFUNG UND ERGEBNIS
- `umbau.mjs`: Trockenlauf mit 0 ZU_PRUEFEN, dann `--schreiben`; der Seitenkörper danach von Hand neu aufgebaut.
- Textprobe gegen das Original (2e5317f; HEAD ist inzwischen mein Zwischenstand): ENTFERNT 17, HINZU 12. Jeder entfernte Text steht als Prop (`etikett=`, `titel=`) oder als ein Stück (H1) wieder da; die H2-IDs laufen über `titelId`. Kein Wort geändert.
- Bezeichner-Probe leer; `werte.mjs` 0 Befunde; eslint 0 Fehler, 0 Warnungen.
- Prüfstufe A auf der Endfassung: GRÜN. tsc: 0 Fehler in meiner Datei. Bilder 390 und 1440: HTTP 200, Konsole 0, Überlauf 0, Überlappung 0. Textvergleich GRÜN, 0 unerlaubt entfernte Spannen. Funktionstests: keine Zuordnung.
- Links Produktion 4310 gegen Entwicklung 4320: 216 zu 216, keine Abweichung. Sichtbare Wortfolge identisch bis auf ein zusätzliches „WhatsApp“ im Kopf (sr-only aus dem Layout-Widget `FloatingWhatsAppWidget`, nicht aus dieser Seite). Alle 13 IDs je einmal vorhanden.
- Funktionstests von Hand gegen 4320, workers=1:
  - `funktion-konfigurator` (Endfassung): 45 bestanden, 4 übersprungen, 1 Timeout bei „Rechner 3“ (Desktop, Knopf „nicht stabil“). Wiederholung: 2 von 2 grün. Die Route `/fliesen/konfigurator` liegt außerhalb meiner Datei.
  - `funktion-kontaktwege`, Test „Widget /kontakt“: im ersten Lauf Timeout; einzeln 4 von 4 grün auf 4310 und 4 von 4 grün auf 4320.
  - Beide Befunde sind transient und nicht durch meine Datei verursacht.

## BILDBELEGE
Unter `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-06/`:
- Erstansicht: `bilder/fliesen/m390.jpg`, `bilder/fliesen/d1440.jpg`
- Ganze Seite (Endfassung): `voll2/m390-voll.jpg`, `voll2/d1440-voll.jpg`

## OFFENE FRAGEN
1. Google-Wert als `Kennwerte` nur mit Freigabe der geänderten Lesefolge (Etikett vor Wert).
2. Schriftfeld nur mit Freigabe der Etiketten Inhaber, Kammer, Betrieb seit und Sitz.
3. Verband-Umschalter: Der Einstieg zeigt den Plan `wohnen` (Halbverband). Welcher Plan gesteuert wird, entscheidet der Orchestrator.
4. Prüfstufe A meldet „übrige 1“ bei tsc: Fehler in der fremden Datei `src/app/(bestand)/standorte/[stadt]/page.tsx` (Import `LucideIcon` mit lokaler Deklaration). Nicht geändert.
5. Die ZWISCHENSTAND-Commits sichern den Stand; das entscheidet der Orchestrator.
