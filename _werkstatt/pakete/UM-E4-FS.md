# UM-E4-FS · Darstellungsbefunde der Browserprüfung Runde 5 · Rolle Baumeister (Arbeitskopie) · Modell Sonnet · Kern-Version 4.4.1

Grundlage: `_werkstatt/berichte/UM-E4-FS-K.md` (Zuordnung je Datei und Zeile, mit Gegenprüfung und Vermerk des Orchestrators), die Belege `_werkstatt/belege/um-e0/runde5-befunde.json` (Nr. 3, 4, 7, 8, 9, 13, 14, 16) und die PLAN-Zeile UM-E4-FS mit den Hinweisen aus UM-E4-INHALT Teil B. Maßstab KERN K-004 (Bausteine), K-011 (Lesbarkeit), K-013 (200 % Schrift, m360 bis d2560). Die Zeilennummern im Bericht stammen von 1770c3cb; suche die Stellen im heutigen Stand.

Schon erledigt, nicht noch einmal anfassen: Nr. 2, 5, 6, 10, 11, 15 b/c, 16 (Wortteil), 17 (Trennfugen, UM-E4-INHALT-B und UM-E4-START) und Nr. 12 (Versalwörter in den Kundenstimmen, UM-E4-START).

## Entscheidungen des Orchestrators (verbindlich)
1. **Nr. 3 Ortsliste `/` bei 200 %:** In `src/components/vorlagen/teile/Einsatzorte.tsx` dieselbe Korrektur wie in `src/components/momente/karte/Einsatzkarte.tsx` (E-065: Mindesthöhe in schmalen Containern aufheben). Zielgröße der Links bleibt mindestens 24 × 24 px (WCAG 2.5.8).
2. **Nr. 4 Regler „Wie groß ist das Bad?“ (`BadProjektCheck/Schritt1.jsx`):**
   - Nur die Darstellung. Zustand, Startwert, Nutzlast, Prüfung und Text bleiben gleich (G8, Formulare). `useProjektCheck.ts` nicht ändern.
   - Solange keine Angabe gewählt ist, soll der Regler sichtbar „noch nicht gesetzt“ wirken (etwa Füllung und Griff in `fuge` statt Tinte, über Tokens), sobald gewählt in Tinte wie jetzt.
   - Kontrast der Bedienelemente mindestens 3 : 1 gegen den Grund (WCAG 1.4.11).
3. **Nr. 7 Foto „Fischgrät“ auf `/fliesen`:**
   - Prüfe in den 84 Originalen (`_eingang/entpackt/`, nur lesen), ob es eine schärfere Stelle mit demselben Verband gibt.
   - Wenn ja: neuer Zuschnitt über den Bildsatz (Eintrag in `_werkstatt/bilder/auftrag-e4.json`, Werkzeug `_werkstatt/werkzeuge/bildsatz.mjs` bzw. das Verfahren aus `EINRICHTUNG.md`), gleiche Kennung in `src/config/arbeiten.ts`, alter Zuschnitt bleibt als Datei liegen (G4, Vermerk in der Notiz).
   - Wenn nein: keine Codeänderung, nur der Befund mit den geprüften Kandidaten in der Notiz.
4. **Nr. 8 `/ueber-uns` „So sind wir gewachsen.“ bei 200 %:** Die doppelte Seitenkante (Abschnitt im Abschnitt) und der Innenabstand der Leitsatz-Karte lassen eine schmale Spalte. Kleinste Lösung in `src/components/sections/CompanyHistory.jsx` (z. B. innere Seitenkante entfällt, Innenabstand der Karte in schmalen Containern kleiner). `ArbeitsSeite.tsx` und `Abschnitt.tsx` nur, wenn es anders nicht geht, und dann ohne sichtbare Änderung auf anderen Seiten.
5. **Nr. 9 und Nr. 16 Pfeil im Knopf bricht allein um:**
   - In `src/components/kern/Knopf.tsx` bleibt der Pfeil mit dem letzten Wort zusammen (Muster `MitPfeil` in `src/components/vorlagen/teile/Schritt.tsx`). Der zugängliche Name bleibt gleich.
   - Im Sendeknopf von `src/components/forms/LeadQuickForm.tsx` steht „vor Ort“ als Gruppe (`zusammen()`), der Pfeil hängt am letzten Wort. Wortlaut und Verhalten gleich.
6. **Nr. 13 `/preise`, Karte „Balkon & Terrasse“ und Nr. 14 Zusammenfassung des Rechners bei 200 %:** Erst messen (m390 und t768, 200 %, Bilder vorher). Nur einen belegten Fehler beheben, in `src/components/pricing/PriceCard.tsx` bzw. `src/components/pricing/PricingCalculator.tsx` (Werte in der `dl` linksbündig unter dem Begriff, sobald die Zeile umbricht). Ohne Beleg: Vermerk „nicht nachgestellt“ mit Bild.
7. **Hinweise aus UM-E4-INHALT Teil B:**
   - Zugänglicher Name der Einwilligung: Zwischen Satz und Link fehlt ein Leerzeichen, wo `{' '}` hinter einem Kommentar steht oder fehlt. Prüfe und berichtige in `src/components/contact/BookingCalendar.tsx`, `src/components/funnels/FliesenKonfigurator/Schritt4.jsx`, `src/components/funnels/BadanfrageFunnel/Schritt5.jsx`, `src/components/funnels/TezgelAnfrageFunnel/Schritt3.jsx` und `src/components/funnels/BadProjektCheck/Zusammenfassung.jsx`. Wortlaut gleich; Beleg: Name vorher und nachher aus dem Barrierebaum (Playwright `getByRole('checkbox', …)` bzw. `accessibleName`).
   - Kurzformular (`LeadQuickForm.tsx`): Die Zusage „Kostenfreie Erstberatung“ auf m360 bei 200 % ohne Trennung im Wortteil.
   - Rechner (`PricingCalculator.tsx`): lange Wörter über `mitFugen` (neue Wörter in `FUGEN`, `src/components/kern/zusammen.tsx`, nur ergänzen).

## Nicht ändern
- Wortlaut aller Texte, H1 A-1/A-2, Kundenstimmen, Bewertungszahlen, Einwilligung im Verhalten, Rechtstexte, Firmendaten, Formulare in Verhalten, Feldern, Prüfung und Nutzlast (G8). B-01 (E-078).
- Andere Seiten nur über gemeinsame Teile (Knopf) und dann ohne sichtbare Änderung bei 100 % Schrift, außer dem Pfeil, wenn er vorher allein stand.
- Keine Inhaltsdateien `src/inhalte/*` (die bearbeitet gleichzeitig UM-E4-NBSP).

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/fs/baum` (Abzug von HEAD, `node_modules` verlinkt).
- Vor dem ersten Edit `vor` anlegen:
  `mkdir -p …/fs/vor && (cd …/fs/baum && tar --exclude=./node_modules --exclude=./.next -cf - .) | (cd …/fs/vor && tar -xf -)`
- Am Ende:
  - `cd …/fs && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor baum > UM-E4-FS.diff` (neue Bilddateien zusätzlich als Liste in der Notiz)
  - Notiz `UM-E4-FS.notiz.md`: je Entscheidung umgesetzt wie, mit Bildpfad vorher und nachher.
- Bauen: eine echte Kopie `node_modules_echt` für Turbopack, danach Verweis zurück und `.next` löschen. Speicher ist knapp.
  - Server vorher (Bau von `vor` in einer eigenen Kopie `…/fs/vorbau`) auf 4451, nachher auf 4450; `npx next start -p <Port> -H 127.0.0.1`. Server per Prozessgruppe aus der eigenen PID-Datei beenden.
  - Bilder als PNG mit `installSperre` und `setzeEinwilligung` aus `_werkstatt/werkzeuge/lib.mjs`; 200 % Schrift wie in `_werkstatt/werkzeuge/lib.mjs` bzw. den Belegen von Runde 5; Geräte m360, m390, t768, d1440.
- Prüfen:
  - `npm test`, `npx eslint`, `npx tsc --noEmit` mit vorübergehender `next-env.d.ts`
  - `werte.mjs --arbeitsbaum --dateien …` mit 0 Befunden (aus der Arbeitskopie starten)
  - die Specs zu Formularen, Einwilligung und Preisen gegen den eigenen Bau: `RELAUNCH_BASE=http://127.0.0.1:4450 npx playwright test <specs>` im Ordner `_werkstatt/werkzeuge` des Repos (nur lesen)
- Das Repository liest du nur. Kein Git mit Schreibwirkung.

## Rückgabe
Prüfzahlen, Diff-Pfad und Dateien, je Entscheidung umgesetzt wie, mit Bildpfad, offene Fragen.
