# Rückgabe E4-NACH-04 · Baumeister (Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/components/kern/Merkliste.tsx`
- `src/components/sections/QualityPromise.jsx`

## WAS UND WARUM
- **Merkliste:** neue Eigenschaft `verband` (mit `spalten={2}`). Liste als `grid grid-cols-1 md:grid-cols-2 md:gap-x-12`, je Eintrag `border-t py-6`, letzte Zeile je Spalte zusätzlich `border-b`, Nummer als Mono-Marke in `w-8 shrink-0`, Titel `font-anzeige text-fs-4`, Text `text-fs-2`. Ab md `md:even:mt-12`: rechte Spalte um eine halbe Zeile versetzt, DOM-Reihenfolge 1 … n. Keine Flächen, Kästen oder Fugenkreuze; `fuss` entfällt bei `verband`. Die übrigen Varianten sind unverändert (reiner Zusatz im Diff).
- **QualityPromise:** `Merkliste spalten={2} verband nummeriert` ohne `fuss`. Fugenkreuz-Import entfernt (nicht mehr genutzt). Schlusszeile ohne Kasten: `mt-12 border-t border-strich pt-8`, Text linksbündig, `md:flex-row md:items-center md:justify-between`. Knöpfe `w-full sm:w-auto` (unter sm untereinander, volle Breite). `sm:justify-center` entfernt.
- **Bestand unverändert:** IDs `qualitaet` und `quality-promise-heading`, Überschrift, Einleitung, Schlusssatz, Knopftexte, Links, Daten aus `COMPANY_DATA.qualityPromises`.

**Mikrotext-Änderungen (alt → neu):**
1. Abschnittsetikett: „HWK Fachbetrieb · HWK Wiesbaden“ → „HWK Fachbetrieb · HWK Wiesbaden · Garantierter Standard“ (Mikrotext-Verschiebung nach Briefing).
2. Marke je Punkt: „Punkt 01“ … „Punkt 08“ → „01“ … „08“.
3. Fuß je Punkt: „Garantierter Standard“ 8× → entfällt. Textprobe gerendert: 8 → 1 (nur im Etikett).

## GEMEINSAME DATEIEN
Keine geändert. Gewünscht:
- Erlaubnisliste des Textvergleichs (`texte-vergleich.mjs --erlaubt`) für E4-NACH-04 um die drei Mikrotext-Änderungen oben ergänzen. Ohne sie bleibt der Textvergleich ROT.

## PRÜFUNG UND ERGEBNIS
- **Prüfstufe A** (`pruefe-a.sh E4-NACH-04 … -- /fliesen /ueber-uns /standorte/wetzlar /blog`). Gesamt ROT, Exit 1, allein durch den Textvergleich.
  - Typprüfung: GRÜN, 0 Fehler (eigene 0, übrige 0).
  - Lint: GRÜN, 0 Fehler, 0 Warnungen.
  - Funktionstests: ÜBERSPRUNGEN, keine Zuordnung für diese Dateien.
  - Bilder: GRÜN, HTTP 200, Konsole 0, Überlauf 0. Auf /blog d1440 zwei sticky-Überlappungen (Kopf-CTA über Seitenspalte), im Produktionsstand 4310 identisch, also vorbestehend.
  - Textvergleich: ROT. Je Seite 9 unerlaubt entfernte Zeilen: die acht Punkt-Nummern und acht Fuß-Zeilen (beabsichtigt, siehe oben). Hinzu kommen Kopf- und Fußabweichungen gegen e0 aus fremden Dateien.
- **werte.mjs** `--dateien` für beide Dateien: 0 Befunde.
- Dev 4320 und Produktion 4310 erreichbar. Nicht gestartet oder gestoppt. Keine Formulare gesendet.
- Mengen: 8 Punkte in 2 Spalten, 1× „Garantierter Standard“.

## BILDBELEGE
Basis: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-04/`
- `wetzlar/m390.jpg`, `wetzlar/t768.jpg`, `wetzlar/d1440.jpg`: Ansicht ab `#qualitaet`.
- `voll/m390-voll.jpg`, `voll/d1440-voll.jpg`: Gesamtseiten. `voll/m390-sheet.png`, `voll/d1440-sheet.png`: Übersichten. `voll/d1440-schluss.png`: Schlusszeile bei 1440.
- `schaufenster/d1440.jpg`: unveränderte Zwei-Spalten-Variante mit Kästen (Vergleich).
- `bilder/{fliesen,ueber-uns,standorte__wetzlar,blog}/{m390,d1440}.jpg`: Prüfstufe A.
- Befund: 390 eine Spalte, Nummer links, keine Versätze, Knöpfe untereinander. 768 und 1440 zwei Spalten, rechte Spalte um 48 px versetzt, Nummern fluchten, kein Kasten, keine Fläche.

## OFFENE FRAGEN
1. Wer trägt die Erlaubnisliste für den Textvergleich ein? (Siehe GEMEINSAME DATEIEN.)
2. Während meines Laufs erschienen im Arbeitsbaum viele Änderungen fremder Pakete, u. a. `src/components/common/CookieConsent.tsx`, `src/components/common/Footer.jsx`, `src/components/ui/FinalCTA.tsx`, `src/app/(bestand)/fliesen/page.jsx` (dort Merkliste-Nutzung), `src/app/globals.css`, `src/components/kern/Einstieg.tsx`, `src/components/kern/Schriftfeld.tsx`. Ich habe keine davon angefasst. Die Kopf- und Fußabweichungen im Textvergleich stammen daher. Die Zuordnung zu einzelnen Paketen ist nicht geprüft. Die Prüfung der Merkliste-Nutzung auf /fliesen wurde mit diesem Stand gefahren.
3. `test-zuordnung.json` kennt weder `QualityPromise.jsx` noch `Merkliste.tsx`. Dadurch gibt es keine Funktionstests für diese Änderung.
4. Die Höhe der Mobilliste im Vergleich zu vorher wurde nicht gemessen (Auflage „höchstens so hoch wie heute“).
