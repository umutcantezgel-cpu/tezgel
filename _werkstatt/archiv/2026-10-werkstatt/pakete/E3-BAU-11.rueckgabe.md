# Rückgabe E3-BAU-11 · FliesenKonfigurator Schritt 1

**GEÄNDERTE DATEIEN**
- `src/components/funnels/FliesenKonfigurator/Schritt1.jsx` (einzige Änderung)

**WAS UND WARUM**
- Auswahlkarten (Raumauswahl, `aria-pressed` unverändert): Titel `text-fs-3 font-semibold` ohne eigene Farbe (erbt von der Karte). Nebentext `text-fs-2` mit `selected ? 'text-nacht-2' : 'text-tinte-2'`. Haken als `Icon` `haken` (groesse 4) statt lucide `Check`. Zwischenraum `gap-2`.
- Infokasten „Bad, Dusche, Gäste-WC“ → `Hinweis art="merk"`. Text, Links und `linkClass` unverändert.
- Hilfetext „Bitte wählen Sie …“ → `hilfeKlassen`. ID `konfigurator-step1-hint` unverändert, ohne role.
- Wurzel `flex flex-col gap-4` (vorher `space-y-5`, 20 px außerhalb der Skala). Fieldset `m-0 min-w-0 border-0 p-0` wie in der Kern-Ansicht. Legende bleibt `sr-only`, ebenso in `kern/formulare/d/KonfiguratorAnsicht.tsx`.
- Entfernt: slate-, orange- und sky-Farben, `font-black`, `text-xs`/`text-sm`, `mt-0.5`, `rounded-2xl`, lucide-Import.
- Unverändert: Texte, IDs, ARIA, Bedingungen, Reihenfolge, Hook-Aufrufe und Nutzlast (`update({ rooms: … })`). Keine `data-motion` (das Register `zustand` bringt eine Farbüberblendung, `bewegung.css` Z. 134), keine Transition-Klassen.

**GEMEINSAME DATEIEN**
- Keine Änderung nötig.

**PRÜFUNG UND ERGEBNIS**
- Textprobe gegen die Ursprungsfassung (HEAD vor `89c3101`): ENTFERNT 0. HINZU 1 = `A:name=haken` (Icon-Name, kein Text).
- Bezeichner-Probe: keine freien Namen. `werte.mjs`: 0 Befunde.
- Prüfstufe A (`pruefe-a.sh E3-BAU-11 … -- /fliesen/konfigurator`): Gesamt GRÜN, Exit 0.
  - tsc: 0 Fehler in eigenen Dateien, übrige 0.
  - eslint: 0 Fehler, 0 Warnungen.
  - Funktionstests `funktion-konfigurator`: erwartet 46, unerwartet 0, flaky 0.
  - Bilder: HTTP 200, Konsole 0, Überlauf 0. Überlappung 36 (m390) bzw. 4 (d1440), identisch zur Produktion (4310), also vorbestehend.
  - Textvergleich: GRÜN, entfernt 0, hinzu 11, alle in Kopf- und Fußzeile.
- Bewegungsregister (`bewegung.mjs --modus register`, d1440): unbekannte Kennungen 0, Animationen ohne data-motion 0.
- Mengen: 7 Auswahlkarten (ROOM_OPTIONS). Hinweis-Zweig bei „bad“, Hilfetext-Zweig bei leerer Auswahl.
- Mikrotexte alt → neu: keine. Zusatz durch den Baustein siehe OFFENE FRAGE 1.

**BILDBELEGE** (Scratchpad `…/E3-BAU-11/`)
- Seitenanfang: `bilder/fliesen__konfigurator/m390.jpg`, `d1440.jpg`
- Schritt-1-Ausschnitt (Anker `#konfigurator`): `bilder-schritt1/m390.jpg`, `bilder-schritt1/d1440.jpg`
- Zustand „gewählt“ und Bad-Hinweis sind nicht im Bild (siehe OFFENE FRAGE 2).

**OFFENE FRAGEN**
1. `kern/Hinweis.tsx` setzt ohne Titel ein sr-only „Hinweis: “ vor den Badhinweis (nur bei Auswahl „Bad“). Der Wortlaut der Datei ist unverändert. Soll der Zusatz bleiben?
2. Zustand „gewählt“ (Tinte-Fläche, Haken, nacht-2-Nebentext) und der Bad-Hinweis sind nur über Klassen und Funktionstests geprüft. `einzelbild.mjs` kennt keine Klicks, `bewegung.mjs` erfasst nur `data-motion`-Elemente, und die Raumkarten tragen keines.
3. Global, nicht Schritt 1: Der feste Knopf unten links (Schloss) überdeckt auf m390 beim Scrollen den Anfang des Kartentextes „Innen-…“ (Karte Treppe). Betrifft jede Seite. Zuständigkeit Layout bzw. Einwilligung.
4. Auf d1440 steht die siebte Karte (Bad) allein in der letzten Zeile. Gewollt?

Hinweis zum Git-Stand: Mein Stand ist bereits im Commit `89c3101` (ZWISCHENSTAND, 21:07 UTC, nicht von mir ausgelöst; enthält nur `Schritt1.jsx`). Arbeitsbaum und HEAD sind für diese Datei identisch. Ich habe nicht committet, gepusht oder zurückgesetzt. Die Textstufe schreibt nach `_werkstatt/cache/texte/E3-BAU-11` (Werkzeugvorgabe).
