# Rückgabe E3-BAU-13 · FliesenKonfigurator Schritt 3

**GEÄNDERTE DATEIEN**
- `src/components/funnels/FliesenKonfigurator/Schritt3.jsx`
- `_werkstatt/pakete/E3-BAU-13.rueckgabe.md`

Git nur lesend, nicht committet und nicht gepusht. Auf HEAD liegen die Zwischenstand-Commits `e17a188` (Schritt 3) und `0b4533b` (Rückgabe-Entwurf), beide nicht von mir ausgelöst. Der Arbeitsbaum entspricht für Schritt3.jsx dem HEAD. Fremde Dateien nicht angefasst. Diese Fassung ersetzt den committeten Entwurf.

**WAS UND WARUM**
- Format, Material, Verlegemuster, Bauart der Treppe, Lage, Treppenform, Belag, Setzstufen und Treppensockel als Karten im Muster von Schritt1/2: lokaler Baustein `Auswahlgruppe` (wie Schritt2, zusätzlich Nebentext `desc` mit `text-nacht-2` bzw. `text-tinte-2`), `cardOptionClass`, `aria-pressed`, `type="button"`, Haken `Icon haken` (groesse 4).
- Raster: Format, Material, Muster `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`; Bauart `grid-cols-1 lg:grid-cols-3`; Lage und Treppenform `grid-cols-1 lg:grid-cols-2`; Belag `grid-cols-1`; Setzstufen und Treppensockel `grid-cols-2`. Begründung (rechnerisch, nicht getestet): In einer halben Spalte reicht die Breite bei zwei oder drei Kartenspalten nicht für „Außentreppe“ oder „Standardformat“ mit Haken.
- Zahlenfelder: `inputClass tabular-nums` wie E3-BAU-17, auch bei Textfeldern mit `inputMode`. Labels `labelKlassen`, Hilfetexte `hilfeKlassen`.
- Schieberegler: Orange, Slate, `rounded-lg`, `h-2.5` und `appearance-none` entfernt; nun `w-full min-h-11 cursor-pointer accent-tinte`. Skalenbeschriftung `font-mono text-fs-1 text-tinte-2`.
- Blockstufen-Infokasten (sky) wird `Hinweis art="merk"` mit unverändertem Absatz.
- Zwischenüberschrift „Treppe“: `text-fs-3 font-semibold text-tinte`; Element und Text unverändert.
- Fieldsets `m-0 min-w-0 border-0 p-0`, Legenden `legendClass` bzw. `labelKlassen`, Trennlinie `border-fuge`, Abstände auf der Skala.
- Unverändert: IDs, Labels, Hilfetexte, Platzhalter, `aria-describedby`, Gruppennamen, `update`-Aufrufe und Nutzlast, Reihenfolge, Bedingungen, Props. Keine Bewegung, kein `data-motion`.
- Attributvergleich HEAD ↔ neu (ohne `className`): Eingabefelder, IDs, `aria-*` und Ereignisse wörtlich gleich. Geändert sind nur Gruppen, Karten, Hinweis und Icon.

**MIKROTEXT alt → neu**
Keine. Textprobe: ENTFERNT 3, HINZU 1. `T:Fliesenformat:` und `T:Bauart der Treppe:` stehen jetzt wortgleich als Prop `legend=` (die Probe erfasst diesen Prop nicht). `A:type=button` sank von 2 auf 1 Vorkommen, weil der Button im Baustein steht. `A:name=haken` ist der Icon-Name. Kein Text verloren.

**GEMEINSAME DATEIEN** (gewünscht, nicht geändert)
1. `Auswahlgruppe` steht jetzt in Schritt2.jsx und Schritt3.jsx. Vorschlag: als gemeinsame Datei `src/components/funnels/FliesenKonfigurator/Auswahlgruppe.jsx` auslagern.
2. `Schritt4.jsx` nutzt noch `OptionGroup.jsx` (Chips). Gleiche Umstellung wie Schritt 3; danach kann `OptionGroup.jsx` entfallen.
3. `index.jsx` (Hülle, offen seit E3-BAU-12): Fortschritt, Knöpfe, lucide-Importe und slate/orange-Klassen sind noch im Altmuster.

**PRÜFUNG UND ERGEBNIS**
- Prüfstufe A (`pruefe-a.sh E3-BAU-13 Schritt3.jsx -- /fliesen/konfigurator`): GESAMT GRÜN, Exit 0.
  - tsc: 0 Fehler (eigene 0, übrige 0). eslint: 0 Fehler, 0 Warnungen.
  - Funktionstest `funktion-konfigurator`: 46 erwartet, 0 unerwartet, 0 flaky, 4 übersprungen (die zwei `fixme`-Fälle in beiden Projekten).
  - Bilder Seitenanfang: HTTP 200, Konsole 0, Überlauf 0, Überlappung 40 (wie bei E3-BAU-12, nicht Schritt 3).
  - Textvergleich gegen e0: entfernt 0, unerlaubt entfernt 0, hinzu 11. Spannen nur in Kopf („buchen“ → „anfragen“) und Fuß, nicht in Schritt 3.
  - Die Läufe schreiben in den gitignorierten Cache `_werkstatt/cache/texte/E3-BAU-13`.
- `bezeichner.cjs modul`: `[]`. `werte.mjs --dateien`: 0 Befunde (77 Klassenvorkommen, 38 eindeutig).
- Hilfslauf (Scratchpad-Skript, Sperre aus `lib.mjs`, Port 4320, keine Anfrage gesendet): Ausgang, gewählte Karten, Treppe und Blockstufen bei m390, t768 und d1440. Keine Karte ragt über den Rand, Überlauf 0 in allen Zuständen. Haken und Tinte-Fläche wie vorgesehen. Bei Blockstufen verschwinden Belag und Setzstufen, der Hinweis erscheint.

**BILDBELEGE** (`…/scratchpad/E3-BAU-13/bilder/`)
- Schritt 3: `m390-schritt3-ausgang.png`, `m390-schritt3-gewaehlt.png`, `m390-treppe-gewaehlt.png`, `m390-blockstufen.png`; `d1440-…` (gleiche vier Zustände).
- Prüfstufe A: `fliesen__konfigurator/m390.jpg` und `d1440.jpg` (Seitenanfang, nicht Schritt 3).

**OFFENE FRAGEN**
1. Raster bestätigen? Bei zwei Spalten (sm) bleibt bei Format und Muster „Noch offen“ allein in der letzten Zeile.
2. Blockstufen-Hinweis: Der Baustein `Hinweis` setzt ohne Titel ein sr-only „Hinweis: “ vor den Absatz. Der sichtbare Text bleibt unverändert, wie beim Bad-Hinweis in Schritt1. Zulässig?
3. Überschriftenfolge h2 → h4 („Treppe“) besteht im Bestand und ist nicht geändert. Soll ein h3 folgen?
4. `tabular-nums` gilt auch für Textfelder mit `inputMode`, nicht nur für `type="number"`. Bestätigen?
