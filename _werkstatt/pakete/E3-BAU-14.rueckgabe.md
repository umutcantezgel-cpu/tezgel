# E3-BAU-14 · Rückgabe (Baumeister, Arbeitsmodell)

**GEÄNDERTE DATEIEN**
- `src/components/funnels/FliesenKonfigurator/Schritt4.jsx`
- `src/components/funnels/FliesenKonfigurator/ResultSummary.jsx`
- Der Stand steht laut git bereits im Commit `0692fb0` („ZWISCHENSTAND“). Ich habe nichts committet, gepusht oder gebaut und keinen Server angefasst.

**WAS UND WARUM**
- Schritt 4 auf das KERN-Muster der Schritte 1–3 umgestellt: Felder mit `labelKlassen`/`inputClass`, Pflichtmarken `pflichtKlassen`, Hilfetext `hilfeKlassen`, Einwilligung `kontrollKlassen`. „Gewünschter Zeitraum:“ läuft über `Auswahlgruppe` statt `OptionGroup`.
- V-03: Sendefehler in `<Hinweis art="fehler" rolle="alert">`, Text unverändert.
- Absende-Knöpfe über `knopfKlassen` mit `data-motion="druck"`. `name`/`value` bleiben, weil der Hook den Absendeweg daran liest. Online = Haupt-, WhatsApp = Neben-Knopf, kein Markengrün.
- Ladezustand: Spinner durch den Kern-Ladebalken ersetzt (`laden-fuge`, `data-motion="laden"`; in `src/lib/kern/icons.ts` als Ersatz für Loader2 geführt).
- ResultSummary: ein Feld mit drei Abschnitten, getrennt durch 1-px-Fugen. Orange, Slate und Sky entfernt, lucide durch `dokument`, `aufmass`, `info`, `haken` ersetzt, Zeilen im Raster `sm:grid-cols-3` ohne arbitrary value.
- Unverändert: Logik, Nutzlast, IDs, ARIA, Bedingungen, Reihenfolge, alle Texte.

**GEMEINSAME DATEIEN** (nicht geändert)
- `index.jsx`: Rahmen, Schrittleiste und Weiter-Knöpfe noch im alten Stil. Bedarf eigene Umstellung.
- `OptionGroup.jsx` hat keinen Importeur mehr, `chipOptionClass` in `stile.js` ist ohne Verwendung. Behalten oder entfernen entscheidet der Orchestrator.
- `ResultSummary.jsx` wird auch in `Erfolg.jsx` und `WhatsAppGeoeffnet.jsx` genutzt. Deren Zusammenfassung ändert sich mit, Texte bleiben gleich.

**PRÜFUNG UND ERGEBNIS**
- Prüfstufe A (`pruefe-a.sh E3-BAU-14 … -- /fliesen/konfigurator`): GRÜN, Exit 0. tsc 0 Fehler, eslint 0 Fehler und 0 Warnungen, Funktionstests `funktion-konfigurator.spec.mjs` 46 erwartet, 0 unerwartet, 0 flaky. Bilder HTTP 200, Konsole 0, Überlauf 0. Textvergleich gegen e0 GRÜN, entfernt 0.
- Überlappung 40 liegt im FAQ-Akkordeon der Startansicht, nicht in meinen Dateien. Das Gate wertet sie nicht.
- textprobe gegen HEAD: ENTFERNT 0. HINZU nur die `name=`-Props der Icons, kein neuer Text. bezeichner: keine freien Namen. werte.mjs: 0 Befunde bei 122 Klassenvorkommen.
- Mengen unverändert: 4 Felder, 3 Zeitraum-Optionen, 1 Notiz, 1 Kontrollkästchen, 2 Absende-Knöpfe, 1 Zurück-Knopf. ResultSummary: 3 Abschnitte, gleiche Zeilen- und Listenzahl.
- Eigener Browserlauf über die Sperre aus `lib.mjs` (Gutfall-Kette, m390 und d1440): leer, gefüllt, Ladezustand, Sendefehler per Antwort-Attrappe, Erfolg, WhatsApp-Ansicht. Ohne Überlauf. Protokoll nur Attrappe bei `POST /api/anfrage`, WhatsApp-Aufruf abgefangen, nichts versendet.
- Der Hinweis-Baustein ergänzt für Screenreader ein unsichtbares „Fehler: “ vor dem Sendefehler (Kern-Verhalten).
- Der Test „echte Route“ sendet eine POST an den lokalen Dev-Server im Mock-Modus, ohne Versand. Bestand des Tests.

**MIKROTEXT-ÄNDERUNGEN** (alt → neu): keine.

**BILDBELEGE** (Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-14/`)
- Vorher: `bilder-vorher/s4-*-{m390,d1440}.jpg`
- Nachher: `bilder-nachher/s4-{leer,gefuellt,laden,fehler,erfolg,whatsapp}-{m390,d1440}.jpg`
- Prüfstufe A: `bilder/fliesen__konfigurator/{m390,d1440}.jpg`

**OFFENE FRAGEN**
1. Pflichtmarke: `src/components/kern/stile.ts` verlangt einen Screenreader-Text „Pflichtfeld“ hinter dem Stern. Die Nachbarn tun das nicht. Nicht ergänzt, weil Mikrotext. Bitte entscheiden.
2. Ladebalken als registriertes Motiv `laden` statt Spinner: bitte bestätigen.
3. Materialbedarf (früher orange) und Prüfliste (früher sky) sind Abschnitte, keine `Hinweis`-Kästen. Bei Wunsch `Hinweis art="merk"` bitte melden.
