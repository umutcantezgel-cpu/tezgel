# E2-BAU-01 · Rückgabe

## GEÄNDERTE DATEIEN
- neu: `src/components/kern/Merkliste.tsx`, `src/components/kern/Schriftfeld.tsx`, `src/components/kern/Kennwerte.tsx`, `src/app/werkstatt-schaufenster/merkliste/page.dev.tsx`
- geändert: `src/components/sections/QualityPromise.jsx`, `src/components/reviews/GoogleReviewsBadge.tsx`
- Rückgabe: `_werkstatt/pakete/E2-BAU-01.rueckgabe.md`

Kein Commit, kein Push.

## WAS UND WARUM
- **Merkliste:** Signatur wie im Paket. 1 Spalte: Liste mit Fugenkreuz `size-3` als Marke. 2 und 4 Spalten: Feldraster, `nummeriert` als Mono-Etikett, `fuss` an einer Fuge. `tinte` wie FinalCTA.
- **Schriftfeld:** Stempelfeld (`dl`), Mono-Etikett über dem Wert, `breit`. `SchriftfeldBetrieb` nur aus COMPANY_DATA.
- **Kennwerte:** Wert `font-anzeige text-fs-6 font-semibold` (Muster Header.jsx:189), Etikett und Quelle Mono.
- **QualityPromise:** Abschnitt mit `id="qualitaet"` und `titelId`, Merkliste 4 Spalten nummeriert, Fuß „Garantierter Standard“ mit Fugenkreuz, Abschluss als Feld mit `neben` (Telefon) und `haupt` („Aufmaß anfragen“). Verlauf und lucide entfernt; Export, Texte und Links wortgleich.
- **GoogleReviewsBadge:** eckiger Kennwert-Link, Google-Logo unverändert, „5,0“ in Anzeigeschrift, Mono-Zeilen „5,0 von 5“ und Anzahl. Hover `border-tinte` (`zustand`). Props, href, target, rel, title unverändert.
- **Schaufenster:** alle Varianten, noindex, nur `next dev`.

## MIKROTEXTE (alt → neu)
1. Badge: „{count} verifizierte Google-Rezensionen“ → „{count} Google-Rezensionen“ (erlaubt).
2. Badge: Sternsymbole → „{rating} von 5“ in Mono (erlaubt).
3. QualityPromise: „PUNKT 01“ (CSS-Versalien) → „Punkt 01“ in Mono. Quelltext gleich; der Textvergleich liest den gerenderten Text.

Neu aus dem Paket: „Punkt NN“, Inhaber, Kammer, Betrieb seit, Sitz.

## GEMEINSAME DATEIEN
Keine Änderung nötig. Optional, offen: `src/app/globals.css`, Utility `font-anzeige` um Breite 74 % und Gewicht 760 ergänzen.

## PRÜFUNG UND ERGEBNIS
- Gelesen: Kern-Bausteine, Muster, Icon-System, Konfiguration, Next-16-Doku.
- Selektoren: Keine Spec nennt die Texte. `funktion-termin` nutzt den Titel des ersten Punkts (unverändert), `funktion-kontaktwege` die tel-Links (unverändert).
- `werte.mjs`: 0 Befunde in fünf Dateien, auch Schaufenster ohne Ausnahme; Gegenprobe 8 Befunde. ESLint 0/0. Keine lucide-Importe.
- Wortlaut gegen HEAD per Syntaxanalyse: nur die erlaubten Änderungen.
- **Prüfstufe A, Endstand (zweiter Lauf):** Typprüfung GRÜN, Lint GRÜN, Funktionstests GRÜN (41/0), Bilder GRÜN, **Textvergleich ROT**, Gesamt ROT.
- Textvergleich: nur zwei Pfade gecrawlt; die übrigen der 242 Seiten im Vergleich gelten als „fehlt“. Auf `/fliesen` vier unerlaubte Spannen in FinalCTA und Footer; beide gegenüber HEAD unverändert, nicht Teil des Pakets, kein QualityPromise-Text. Dazu die Punkt-Darstellung.
- Server 4310 und 4320: HTTP 200. Kein Build, kein Start oder Stopp.
- `git status`: nur meine Dateien geändert; übrige Einträge nicht von mir.

## BILDBELEGE
Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-BAU-01/`:
- Prüfstufe A: `bilder/fliesen/m390.jpg`, `bilder/fliesen/d1440.jpg`, `bilder/werkstatt-schaufenster__merkliste/m390.jpg`, `…/d1440.jpg`
- Ganzseite Endstand: `bilder-final/m390-voll.jpg`, `bilder-final/d1440-voll.jpg`
- Ausschnitte: `crops/final-schriftfeld.jpg`, `crops/final-liste1.jpg`
- Mobil 31/33 Überlappungen durch feste Ebenen beim Scrollen; je eine vorbestehende Textkreuzung im Footer; Desktop 0.

## OFFENE FRAGEN
1. `src/components/kern/Abschnitt.tsx` (fremd, nicht geändert): Bei `flaeche="tinte"` gewinnt `text-tinte-2` über `text-nacht-2`, die Kennzeile ist kaum lesbar. Vorschlag: für Tinte eigene Klassenliste ohne `text-tinte-2`.
2. Im Footer wird das Etikett „Handwerkskammer Wiesbaden“ auf 390 px überschnitten (fremd, vorbestehend). Ein Kopf-Überlauf aus der ersten Aufnahme trat in den Endläufen nicht mehr auf.
3. QualityPromise: Abschnittsart `erzaehl` (py-24, lg:py-32) als Standard, nicht im Paket genannt. `arbeit` könnte passender sein.
4. Schriftfeld: Leere Zelle zeigt graue Fuge; der Verbraucher gleicht mit `breit` aus. Soll die Komponente das übernehmen?
5. `test-zuordnung.json` hat kein Muster für QualityPromise und Merkliste.
6. Erster Lauf: ein Mega-Menü-Test rot, Ursache ungeklärt; Einzellauf 4310 und 4320 grün, zweiter Lauf grün.
7. Textvergleich bei Teilläufen ist immer rot, weil nicht gecrawlte Seiten als „fehlt“ gelten.
