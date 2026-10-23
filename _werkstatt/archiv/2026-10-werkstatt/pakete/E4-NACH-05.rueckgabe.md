# E4-NACH-05 · Rückgabe · Baumeister (Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/components/funnels/TezgelAnfrageFunnel/Schritt1.jsx` (einzige Änderung; HEAD-Kopie unter `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-05/alt-Schritt1.jsx`)

## WAS UND WARUM
- Raster: `grid gap-px border border-fuge bg-fuge` statt `gap-2`. Ab `sm` zwei Spalten, das fünfte Feld `sm:col-span-2`; ab `lg` sechs Spalten, die ersten drei `lg:col-span-2`, die letzten zwei `lg:col-span-3`. Das Loch ist weg, es gibt keine Zwischenräume.
- Eckmarken entfallen: `pt.badge` wird nicht mehr gerendert. Die Daten in `useAnfrageFunnel` bleiben unverändert. Mit dem Span entfallen der Import `etikettKlassen` und die Klasse `group`.
- Mobil (unter `sm`): je Option eine Zeile `flex items-center gap-4`, Fachzeichen links (`groesse={5}`), Titel und Untertitel rechts. `min-h-11`, mobil `py-3`, ab `sm` `py-4` (überschreibt `p-4` aus `projektClass`). Ab `sm` wie bisher Kachel mit Fachzeichen oben und Text unten; Fachzeichen dort `sm:size-6`.
- Layout-Wechsel liegt in einem inneren Span. So entstehen keine widersprüchlichen Klassen zu `projektClass` (`flex-col`, `justify-between`, `gap-6`).
- Unverändert: `type`, `aria-pressed`, `onClick`, `data-motion`, Reihenfolge, Titel, Untertitel, Knopftext „Weiter zu Schritt 2: Fläche & Ort“.

## MIKROTEXT-ENTFALL (alt → neu)
- Bad & Wellness: „Sehr beliebt“ → entfällt
- Wohnbereich & Neubau: „Großformat“ → entfällt
- Balkon & Terrasse: „Frostsicher“ → entfällt
- Treppen & Naturstein: „Präzision“ → entfällt
- Untergrund & Abdichtung: „DIN-Norm“ → entfällt

## GEMEINSAME DATEIEN
- Keine geändert. Bedarf: Entscheidung über den Eckmarken-Entfall im Textvergleich (Basis e0), siehe Prüfung und Offene Fragen 5.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A (`pruefe-a.sh E4-NACH-05 Schritt1.jsx -- /kontakt / /leistungen`), Log: `…/scratchpad/E4-NACH-05/pruefe-a.stdout`
- Typprüfung (tsc): GRÜN, 0 Fehler in eigenen Dateien, 0 übrige.
- Lint (eslint): GRÜN, 0 Fehler, 0 Warnungen.
- Funktionstests `funktion-express-funnel.spec.mjs`: GRÜN, erwartet 26, unerwartet 0, flaky 0.
- Bilder: GRÜN, HTTP 200 auf `/kontakt`, `/`, `/leistungen`; Konsole 0; Überlauf 0. Überlappung: `/kontakt` 0, `/leistungen` 0, `/` 25. Die 25 liegen in einem FAQ-Block bei y≈12430 („Fugenarme XXL-Fliesen …“), außerhalb von Schritt 1.
- Textvergleich: ROT. Auf allen drei Ansichten sind die fünf Eckmarken die einzigen „unerlaubt entfernt“-Einträge (5 je Seite, 15 gesamt). Die übrigen Abweichungen (242 Seiten, 250 „hinzu“) kommen aus dem Gesamtbestand gegen e0 und nicht aus dieser Datei. Gesamtergebnis ROT mit Exit 1, der Textgate wirkt darauf.
- `werte.mjs --dateien Schritt1.jsx`: 0 Befunde.
- Schreibrechte: `git status` zeigt aus meinem Paket nur Schritt1.jsx. Die übrigen geänderten Dateien sind parallele Arbeit, von mir nicht berührt. Werkzeug-Caches liegen unter `_werkstatt/cache/`.
- Dev-Server: 4320 und 4310 antworten mit HTTP 200.

## BILDBELEGE
- `/kontakt`, Express-Anfrage (Anker `#express-anfrage`): `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-05/bilder-funnel-kontakt/m390.jpg`, `t768.jpg`, `d1440.jpg`
- `/` bei 1440: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-05/bilder-funnel-start/d1440.jpg`
- Kopfbereich ohne Funnel (Prüfstufe A): `…/scratchpad/E4-NACH-05/bilder/{kontakt,start,leistungen}/{m390,d1440}.jpg`

## OFFENE FRAGEN
1. Mobile Höhe: Fünf Zeilen bei 390 px ergeben geschätzt rund 430 px. Zwei Untertitel (Bad & Wellness, Untergrund & Abdichtung) umbrechen auf zwei Zeilen, diese Zeilen sind etwa 98 px hoch, die übrigen etwa 77 px. Das Ziel „etwa 400 px“ wird um rund 30 px überschritten. Die letzte Zeile liegt im Bildausschnitt nicht vollständig, daher nicht per DOM gemessen. Optionen: so lassen, oder `gap-4` auf `gap-3` (nicht im Paket). Entscheidung nötig.
2. Der Eckmarken-Entfall ändert den ARIA-Namen der fünf Knöpfe, weil der Badge-Text aus dem Namen fällt. Der Bestandsschutz nennt ARIA-Namen von Knöpfen. Die Tests prüfen per Regex und sind grün. Bitte bestätigen.
3. Zellrand: `projektClass` bringt `border border-strich` mit (3,29:1). Zwischen zwei Feldern liegt damit Strich, 1 px Fuge, Strich. Im Bild wirkt das wie eine Linie. Eine Konfliktklasse `border-fuge` habe ich nicht eingefügt. Eine reine 1-px-Fuge bräuchte eine Änderung an `stile.ts`, das ist nicht mein Recht.
4. Mobile Fugen: `gap-px`, `border-fuge` und `bg-fuge` gelten auch für die mobilen Zeilen. Das Paket nennt die Fugen nur ab `sm`. Bitte bestätigen.
5. Der Textvergleich gegen die Basis e0 zählt die fünf Eckmarken als unerlaubten Entfall. Die Freigabe dieses Entfalls liegt beim Orchestrator.
