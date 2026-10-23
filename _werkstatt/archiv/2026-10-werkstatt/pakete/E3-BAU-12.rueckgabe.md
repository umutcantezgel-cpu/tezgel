# Rückgabe E3-BAU-12 · FliesenKonfigurator Schritt 2

**GEÄNDERTE DATEIEN**
- `src/components/funnels/FliesenKonfigurator/Schritt2.jsx` (einzige Änderung).
- Git: Mein Stand steht bereits als Commit `ba51fa0` (ZWISCHENSTAND), nicht von mir ausgelöst. Ich habe nicht committet, gepusht oder zurückgesetzt. Arbeitsbaum und HEAD sind für die Datei gleich.

**WAS UND WARUM**
- Vier OptionGroup-Chip-Gruppen durch den lokalen Baustein `Auswahlgruppe` im Kartenraster nach Schritt1 ersetzt: `fieldset m-0 min-w-0 border-0 p-0`, sichtbare Legende `labelKlassen`, Hinweis `hilfeKlassen`, Karten `cardOptionClass(selected)` mit `aria-pressed`, Titel `text-fs-3 font-semibold`, Haken `Icon haken` (groesse 4).
- Raster: Untergrund `grid-cols-1 sm:grid-cols-2` (wie zuvor). Fußbodenheizung und Altbelag (je drei Antworten) `grid-cols-1 sm:grid-cols-3` statt `grid-cols-2`, damit mobil keine Einzelkarte allein steht (Muster „Zeitraum“ im Anfrage-Funnel). Nassbereich `grid-cols-2` (wie zuvor).
- Wurzel `space-y-6` wird `flex flex-col gap-8` (Muster Anfrage-Funnel, Schritt 2).
- Unverändert: Legenden, Hinweis, Beschriftungen (`o.label ?? o.title`), Reihenfolge, `toggleInList`, `update`-Aufrufe, Kopplung Heizestrich → `floorHeating: 'ja'`, Nutzlast, `aria-pressed`, `type="button"`. Keine IDs, keine data-motion, keine Übergänge, keine neue Bewegung.
- Mikrotext alt → neu: keine.

**GEMEINSAME DATEIEN**
- `src/components/funnels/FliesenKonfigurator/index.jsx` (Hülle, nicht mein Umfang): Kopf, Fortschritt und Schritt-Navigation sind noch im Altmuster (21 Zeilen mit slate-/orange-Klassen, `btn-primary`/`btn-ghost`, lucide-Importe). Gewünscht: Umstellung nach `TezgelAnfrageFunnel/index.tsx` (Fortschritt als Mono-Felder, Knöpfe über `knopfKlassen` mit `data-motion="druck"`, `Icon` statt lucide). Texte und IDs bleiben.
- `OptionGroup.jsx` bleibt für Schritt3 und Schritt4 im Gebrauch, unverändert.

**PRÜFUNG UND ERGEBNIS**
- Textprobe gegen HEAD: ENTFERNT 0, HINZU `A:type=button` und `A:name=haken` (kein Text). Legenden und Hinweise erfasst die Probe nicht (sie sind Props), deshalb manuell verglichen: alle fünf wortgleich, entfernt wurde nur die Klasse `space-y-6`.
- Bezeichner-Probe: keine freien Namen. `werte.mjs`: 0 Befunde.
- Prüfstufe A (`pruefe-a.sh E3-BAU-12 … -- /fliesen/konfigurator`): GESAMT GRÜN, Exit 0. tsc 0 Fehler, eslint 0 Fehler und 0 Warnungen, Funktionstests `funktion-konfigurator` 46 erwartet, 0 unerwartet, 0 flaky, Bilder HTTP 200, Konsole 0, Überlauf 0, Überlappung 40 (wie beim Nachbarpaket). Textvergleich GRÜN, entfernt 0, hinzu 11.
- Zusatzlauf (Entwicklungsserver 4320, Anfragesperre aus `lib.mjs`, m390 und d1440): 15 Karten je Ansicht (7/3/3/2). Mehrfachauswahl schaltet um, zweiter Klick hebt auf, Heizestrich setzt Fußbodenheizung auf „Ja“, Einfachwahl je Gruppe korrekt. Protokoll: keine Anfrage, keine blockierten Schreibzugriffe. Konsole 0, Überlauf 0. Karten 61 px (m390) bzw. 64 px (d1440) hoch, Radius 0, kein Schatten.

**BILDBELEGE** (`…/scratchpad/E3-BAU-12/bilder/`)
- Schritt 2 gewählt: `schritt2-m390-gewaehlt.jpg`, `schritt2-d1440-gewaehlt.jpg`
- Schritt 2 Ausgangszustand: `schritt2-m390-ausgang.jpg`, `schritt2-d1440-ausgang.jpg`
- Prüfstufe A, Seitenanfang: `fliesen__konfigurator/m390.jpg`, `d1440.jpg` (zeigen den Kopf, nicht Schritt 2).

**OFFENE FRAGEN**
1. Die drei Ja/Nein-Fragen sind als Karten umgesetzt (Muster Schritt1). Die KERN-Ansicht `src/components/kern/formulare/d/KonfiguratorAnsicht.tsx` zeigt Ja/Nein als Zeilen und Einfachwahl als Radios. Bitte bestätigen, dass Karten gelten sollen.
2. Auf d1440 steht die siebte Karte „Unbekannt – bitte prüfen“ allein in der letzten Zeile (zwei Spalten ab sm). Gewollt? Gleiche Frage wie bei Schritt1.
3. Kopf und Fuß (nicht meine Dateien): Die Textstufe meldet Spannen, die gegen e0 abweichen. Kopf: „buchen“ → „anfragen“. Fuß: „WhatsApp:“ und „Fax:“ entfernt; „Anschrift“, „Telefon“, „WhatsApp“, „Fax“, „E-Mail“, „Zeiten“, „Betrieb seit 2008“ hinzu, alle außerhalb der Erlaubnisliste. Das Gate bleibt GRÜN, weil nichts unerlaubt entfernt wurde. Bitte prüfen.
4. Fremde Änderung im Arbeitsbaum: `_werkstatt/werkzeuge/bildsatz.mjs`. Nicht angefasst.
