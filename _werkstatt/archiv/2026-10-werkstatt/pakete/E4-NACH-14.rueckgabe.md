# E4-NACH-14 · Rückgabe (Baumeister, Arbeitsmodell) – Stufe A abgeschlossen: Textvergleich ROT, übrige Gates GRÜN

## GEÄNDERTE DATEIEN
- `src/components/blog/BlogCard.jsx`
- `src/components/blog/BlogFilter.jsx`
- `src/components/blog/BlogSidebar.jsx`
- `src/app/(bestand)/blog/page.jsx` – unverändert (nicht nötig)
- `_werkstatt/pakete/E4-NACH-14.rueckgabe.md` (diese Datei)

## WAS UND WARUM
- **Titel ohne Unterstreichung** (Befund 20): Titel-Link `no-underline`, Zeigezustand `hover:underline focus-visible:underline decoration-strich underline-offset-4`; die ganze Zeile bleibt Linkziel (`after:inset-0`).
- **Kennzeile eine Mono-Zeile** (Befund 21): `font-mono text-fs-1`, Trenner „·“ (aria-hidden), Lesezeit mit `truncate`, Titel nie gekürzt. DOM-Reihenfolge Kategorie · Lesezeit · Datum unverändert.
- **Motiv statt Foto** (Befund 24): Listenbild und Hervorhebungsbild durch `Themenmotiv` (Verlegeplan ohne Achse, ohne Bemaßung, aria-hidden) ersetzt. Unter `sm` 3:2 über volle Breite, ab `sm` Quadrat links. Plan je Kategorie über die Konstante `KATEGORIE_MOTIV` in `BlogCard.jsx` (exportiert).
- **Fachzeichen** (Befund 26): Zeichen am Kategorie-Etikett der Zeile und an den Filterknöpfen (mobil und Seitenleiste), gleiche Konstante, aria-hidden.
- **Seitenleiste** (Befund 22/27): ein Feld mit `divide-y divide-fuge`, nicht haftend (das Feld ist ca. 900 px hoch, bei 1440×900 würde es unter den Kopf laufen).
- **Mobile Suche und Kategorien** (Befund 23): sichtbares `<label>` „Ratgeber durchsuchen“ über dem Feld, danach eine querlaufende Zeile (`flex overflow-x-auto snap-x`, Knöpfe `shrink-0`, Zeile `px-1 py-1` und `-mx-1` für Fokusring und Fluchtung).
- **„+Alle Themen“** (Befund 28): `gap-2` in den Auswahlknöpfen.
- Logik (`useBlogListe`), Texte, Links, Lesefolge, Leerzustand, Test-Selektoren und ARIA-Namen unverändert.

## GEMEINSAME DATEIEN
Keine Änderung nötig. Keine Bedarfsmeldung.

## PRÜFUNG UND ERGEBNIS
- `werte.mjs` auf die vier Dateien: 0 Befunde (Bericht im Scratchpad `E4-NACH-14/werte/`).
- `textprobe.cjs` gegen HEAD: BlogCard keine Entfernung, nur zwei „·“ hinzu; BlogFilter `aria-label` entfernt, `<label>` hinzu; BlogSidebar keine Änderung. Entfernte `alt`-Attribute mit Ausdruck (`alt={post.title}`) erscheint im Textprobe nicht; siehe Liste unten.
- `pruefe-a.sh E4-NACH-14 …` abgeschlossen (Exit 1, Gesamt ROT allein wegen Textvergleich):
  - Typprüfung (tsc): GRÜN, 0 Fehler in eigenen Dateien
  - Lint (eslint): GRÜN, 0 Fehler, 0 Warnungen
  - Funktionstests (funktion-navigation): GRÜN, 41 erwartet, 0 unerwartet, 0 flaky
  - Bilder 390/1440 für `/blog` und `/blog/rutschfeste-fliesen-r-klassen`: GRÜN
  - Textvergleich gegen e0: ROT. 21 Textspannen unerlaubt entfernt, 242 Seiten mit Abweichung. Ursache nicht geprüft; Abweichungen können aus Paketen anderer Baumeister im selben Arbeitsbaum stammen (z. B. `[slug]/page.jsx`, `RelatedPosts.jsx`). Bericht: `_werkstatt/cache/texte/E4-NACH-14/texte-vergleich-gegen-e0.json`
  - Quelle: `…/scratchpad/E4-NACH-14/pruefe-a.stdout`, Bilder `…/E4-NACH-14/bilder/blog/m390.jpg` und `d1440.jpg`.
- **Nicht geprüft**: Mobile Höhe der Filterzeile (≤ 60 px), Seitenleiste bei 1440×900, Titel-Unterstreichung im Browser, Lesezeit-Kürzung bei 390 px, Auflösung `h-full`/`h-auto` am Verlegeplan-SVG (Klassenkonflikt, im Browser zu prüfen).

## BILDBELEGE
Noch keine. Vorgesehen von pruefe-a.sh unter `_werkstatt/cache/einzelbild/…` bzw. im Scratchpad-Lauf `E4-NACH-14/bilder/`.

## MIKROTEXT-ÄNDERUNGEN (alt → neu)
1. Suchfeld mobil: `aria-label="Ratgeber durchsuchen"` → entfällt; sichtbares `<label>` „Ratgeber durchsuchen“ neu. Accessible Name bleibt identisch.
2. Listenbild: `alt={post.title}` → entfällt (Motiv dekorativ, aria-hidden).
3. Hervorhebungsbild: `alt={featuredPost.title}` → entfällt (Motiv dekorativ).
4. Neu: Trenner „·“ (aria-hidden) in der Kennzeile.

## OFFENE FRAGEN
1. **Pflege & Werterhalt** hat kein Fachzeichen (kein „fugen“ in der Icon-Familie). Befund 26 verlangt je Kategorie ein Zeichen. Bitte entscheiden, ob ein Zeichen ergänzt wird.
2. **Ratgeber & Kosten** und **Neuigkeiten** teilen Plan und Zeichen `grossformat` (Zuordnung „Allgemein → grossformat“ aus dem Briefing). Bitte bestätigen.
3. **Fliesen & Material** → Plan und Zeichen `naturstein` (Anker: Vergleichsartikel). Alternativ `grossformat`. Bitte bestätigen.
4. Befund 21 nennt die Reihenfolge Kategorie · Datum · Lesezeit und verlangt Kürzung am Ende. Umgesetzt ist die DOM-Reihenfolge (Lesefolge exakt). Umstellung nur mit Freigabe.
5. Seitenleiste ist nicht mehr haftend. Haften ginge nur mit einer kompakteren Seitenleiste oder einer höhenbegrenzten Kategorienliste (nicht im Designsystem).
6. Die Hervorhebung nutzt jetzt ebenfalls ein Motiv statt Foto, um „Kein Foto in der Liste“ zu erfüllen. Bitte bestätigen.
7. Bei 390 px kann die Lesezeit bei langen Kategorienamen stark gekürzt werden (Stufe A bzw. Browser-Messung offen).
8. Die Werte `-mx-1`, `px-1`, `py-1` für die Filterzeile sind außerhalb der Abstandsliste nicht gefunden, werte.mjs meldet trotzdem nichts. Bitte Bestätigung.
