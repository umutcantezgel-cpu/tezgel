# E3-BAU-15 · Rückgabe (Baumeister, Arbeitsmodell)

**GEÄNDERTE DATEIEN**
- `src/components/funnels/FliesenKonfigurator/index.jsx` (Rahmen, Fortschritt, Navigation)
- `src/components/funnels/FliesenKonfigurator/Erfolg.jsx`
- `src/components/funnels/FliesenKonfigurator/WhatsAppGeoeffnet.jsx`
- Nicht von mir: Zwischenstand-Commit `d36c78c` (22:15, „werkstatt(E3-BAU-15): ZWISCHENSTAND“) enthält diese Endfassung. Ich habe nichts committet, gepusht oder gebaut und keinen Server angefasst.

**WAS UND WARUM**
- Rahmen: Glas- und Verlaufsklassen entfernt. Fläche `border-strich bg-fliese`, Kopf durch `border-fuge` getrennt. Fortschritt als Felder: aktuell Tinte-Fläche, erledigt Tinte-Umriss mit Haken, offen Strich-Umriss; die Leiste unten ist ein 1-px-Raster ohne Orange. Zurück `knopfKlassen('text', 'self-start')`, Weiter `knopfKlassen('haupt', 'w-full sm:w-auto')`, beide `data-motion="druck"`. Icons aus `Icon`, Eyebrow mit `Fugenkreuz` (wie BadanfrageFunnel).
- Erfolg und WhatsApp: Muster E3-BAU-18. Etikett mit `haken` bzw. `sprechblase`, Bestätigung als Randlinie (kein Hinweis-Kasten), Anruf und „Neue Konfiguration starten“ über `Knopf`, „Zurück zur Anfrage“ über `knopfKlassen('neben')` mit Pfeil. Sparkles durch `uhr`.
- Mikrotext alt → neu (freigegeben), Erfolg, Bestätigungszeile: „✉️ Eine ausführliche Bestätigung …“ → „Eine ausführliche Bestätigung …“. Sonst keine Änderung.
- Breite: `max-w-4xl mx-auto` entfällt, da kein Systemwert (siehe OFFENE FRAGEN).
- Unverändert: Logik, Ereignisse, Bedingungen, Reihenfolge, IDs, ARIA, Nutzlast, alle Texte. Knöpfe bleiben `type="button"` (im DOM geprüft).

**GEMEINSAME DATEIEN** (nicht geändert)
1. `src/app/(bestand)/fliesen/konfigurator/page.jsx`: Wrapper um `<FliesenKonfigurator />` auf eine Systembreite setzen. Der Rahmen füllt jetzt die Containerbreite (1166 px bei 1440).
2. Überschriften, nur Vorschlag (unantastbar): Schritt-Titel in `index.jsx` von `<p>` auf `<h3>` setzen, damit h2 nicht auf den `<h4>` „Treppe“ in `Schritt3.jsx:98` folgt. Zustandszeilen von Erfolg und WhatsApp als `<h2>`, damit die `<h4>` der ResultSummary eine Ebene darüber haben.

**PRÜFUNG UND ERGEBNIS**
- Prüfstufe A, Endlauf 22:19 (`pruefe-a.sh E3-BAU-15 … -- /fliesen/konfigurator`): GRÜN, Exit 0. tsc: 0 Fehler in meinen Dateien. eslint: 0 Fehler, 0 Warnungen. Funktionstests: 46 erwartet, 0 unerwartet, 0 flaky, 4 übersprungen (2 bekannte fixme-Fälle je Projekt). Bilder: HTTP 200, Konsole 0, Überlauf 0; Überlappung 40 (m390 36, d1440 4) im FAQ-Akkordeon des Seitenkörpers, nicht in meinen Dateien. Textvergleich GRÜN: entfernt 0, unerlaubt 0; hinzu 11 nur in Kopf und Fuß.
- textprobe gegen HEAD: ENTFERNT nur die Emoji-Zeile; HINZU nur `name=`-Props der Icons. bezeichner modul: keine freien Namen. werte.mjs: 0 Befunde.
- Eigener Browserlauf über die Sperre aus `lib.mjs` (Gutfall-Kette, m390 und d1440): Überlauf 0 in allen Zuständen. Erfolg: 1 Anfrage an die Attrappe, kein Versand. WhatsApp: 0 Anfragen, Fremdaufruf abgefangen. „Zurück zur Anfrage“ kehrt zu Schritt 4 zurück.

**BILDBELEGE** (`/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-15/`)
- `bilder-rahmen/<zustand>-<m390|d1440>.jpg`, Zustände: s1-leer, s1-gefuellt, s2-gefuellt, s3-leer, s3-gefuellt, s4-leer, s4-gefuellt, s4-zurueck, erfolg, whatsapp
- `bilder/fliesen__konfigurator/<m390|d1440>.jpg` (Prüfstufe A, Ausgangszustand)

**OFFENE FRAGEN**
1. Lesebreite: Soll die Seite die Breite des Konfigurators begrenzen? Ein Systemwert fehlt, `max-w-4xl` ist nicht im System. Entscheidung nötig.
2. Überschriftenfolge (Vorschlag oben): nicht umgesetzt, da Überschriften unantastbar sind.
3. Der Zwischenstand-Commit `d36c78c` enthält meine Dateien, bevor die Rückgabe fertig war. Bitte prüfen, ob das so gewollt ist.
4. Schritt 1 bei 390 px: Ein festes Schloss-Symbol am linken Rand überdeckt die Kante der Karte „Küche“. Vermutlich ein Bestandselement der Einwilligung. Nicht geprüft, nicht in meinen Dateien.
