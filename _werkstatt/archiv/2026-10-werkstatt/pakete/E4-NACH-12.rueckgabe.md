# Rückgabe E4-NACH-12 · Baumeister

## GEÄNDERTE DATEIEN
- `src/components/legal/MapConsentGate.tsx`
- `src/components/maps/ServiceMapWrapper.tsx`
- `src/components/contact/BookingCalendar.tsx`
- `src/app/(bestand)/kontakt/page.jsx`

## WAS UND WARUM
- **MapConsentGate:** neue Prop `hoehenModus` (`fest` als Standard, daher für andere Aufrufer unverändert; `inhalt`). Der Platzhalter folgt dann dem Inhalt: unter md ohne Mindesthöhe, ab md mindestens `height`. Die geladene Karte bleibt auf fester Höhe. Die Fuge ist ein Innenumriss, damit die Höhe exakt stimmt. Neu `vorschauAb="immer"`: Vorschau auch mobil, nach dem Einwilligungstext.
- **Servicegebiet `/`:** `inhalt` plus `immer`. Gemessen: 1440 px Vorschau 198 von 198 px sichtbar; 1024 px 256 von 256 px; 768 px Platzhalter 460 px; 390 px 741 px, alle drei Zonen, kein Leerfeld.
- **Standorte `/standorte`:** `inhalt`. 390 px: Platzhalter 355 px statt fest 460 px (vorher rund 100 px Leerraum).
- **Terminwahl:** `sm:last:odd:col-span-2 md:last:odd:col-span-1`. Unter sm keine Breitenzelle: 16:30 gleich breit (150 px bei 390), rechts leere Zelle. Ab sm wie bisher. Uhrzeiten und die Rufnummer im Leer-Hinweis in `font-mono` per `span`.
- **page.jsx:** Rufnummer im Einstiegsknopf in `font-mono`.
- **Mikrotext:** keine Änderung. Textprobe: 0 entfernt, 0 hinzu.

## GEMEINSAME DATEIEN (Bedarf, nicht geändert)
`src/components/maps/ContactPremiumMap.tsx`, Zeilen um 183–193:
1. Wrapper: `karten-hoehe ` aus der Klasse entfernen und `style={{ "--karten-hoehe": KARTE_HOEHE }}` streichen.
2. `<MapConsentGate>`: `height="100%"` → `height={KARTE_HOEHE}`; zusätzlich `hoehenModus="inhalt"` und `vorschauAb="immer"`.
Erwartung, nicht im Browser geprüft: mobil kein Leerraum, Vorschau sichtbar. Ohne Änderung bleibt /kontakt bei 390 px mit 132 px Leerraum unter dem Text.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A, vollständiger Lauf vor der letzten Änderung: tsc GRÜN (0 Fehler), eslint GRÜN, Funktionstests GRÜN, Bilder GRÜN (HTTP 200, 0 Konsolenfehler, 0 Überlauf), Text GRÜN (entfernt 0).
- Nach der letzten Änderung (`h-full`, messbar ohne Wirkung): tsc und eslint GRÜN; `funktion-termin` und `funktion-einwilligung` 62 erwartet, 0 unerwartet, 0 flaky, direkt ausgeführt.
- `werte.mjs`: 0 Befunde. Überlappung 25 auf `/` (390 px) ist identisch zum Stand auf Port 4310, nicht meine Dateien.

## BILDBELEGE
Ordner `scratchpad/E4-NACH-12/` (absolut: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-12/`)
- vorher: `vorher-start-d1440-karte0.png` (Friedberg abgeschnitten)
- nachher: `nachher-start-1440-karte0.png`, `nachher-ausschnitt-1024.png`, `final-start-390-karte0.png`, `nachher-termin-390.png`

## OFFENE FRAGEN
1. **/kontakt (Befund 7, 10b):** nur über ContactPremiumMap.tsx lösbar. Wer macht das?
2. **CLS:** mobil ist der Platzhalter nicht mehr so hoch wie die geladene Karte: `/` 741 zu 460 px, `/standorte` 355 zu 460 px. Bitte mobil per Lighthouse prüfen oder entscheiden.
3. **`/` mobil:** Platzhalter 741 px lang (16 Orte). Gewollt?
4. **Prüflauf blockiert:** ein verwaister Prozess `einzelbild.mjs` (PID 26657, fremder Lauf, rund 35 min) belegt beide Semaphor-Plätze. Ich habe ihn nicht beendet. Bitte Orchestrator prüfen.
5. **Befund 1 außerhalb meiner Dateien:** Öffnungszeiten und Rufnummern in `DirectContactCard.tsx`, `LocationContact.tsx`, `FinalCTA.tsx` stehen noch in Textschrift.
6. **Fremde Dateien:** `start/Servicegebiet.tsx` nennt veraltet 440 px. Die Ortsliste ist kürzer als die Karte. In `kern/Einzugsband.tsx` brechen bei 1024 px Ortsnamen um.
