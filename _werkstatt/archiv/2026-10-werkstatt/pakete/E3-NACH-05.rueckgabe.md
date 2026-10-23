# E3-NACH-05 · Rückgabe

## GEÄNDERTE DATEIEN
- src/components/funnels/TezgelAnfrageFunnel/Schritt1.jsx
- src/components/contact/BookingCalendar.tsx
- src/components/kern/Einzugsband.tsx
- src/components/maps/ContactPremiumMap.tsx
- _werkstatt/pakete/E3-NACH-05.rueckgabe.md

Keine Commits durch mich; Zwischenstände stehen in den Werkstatt-Commits (u. a. 52915e9).

## WAS UND WARUM
- **Befund 18 (Schritt1):** Haus-Icon → `fliese` (Wohnbereich). Treppen-Karte → `naturstein` (OFFENE FRAGE 1). Eckmarken als Mono-Etikett `text-tinte-2`, ohne Fläche und Rahmen; auf der gewählten Karte `text-nacht-2`.
- **Befund 19 (Einzugsband):** `truncate` entfernt; Namen brechen um (`wrap-break-word`, `hyphens-auto`; `break-words` gibt es in Tailwind 4 nicht). Entfernung bleibt rechts, rutscht bei Platzmangel darunter. Spalten ab md 3:3:4 statt 2:3:5 (OFFENE FRAGE 2). Kompakte Vorschau ohne vertikale Zeilenabstände; passt bei 768 px in den Platzhalter.
- **Befund 20 (Terminwahl):** Bei ungerader Slot-Zahl spannt der letzte Zeitknopf die Restbreite. Terminliste endet an einer Tagesfuge: Tageskopf `min-h-8`, Zeitknopf `h-12`, Listenhöhe `max-h-119 / sm:max-h-91 / md:max-h-94` (zwei Tage unter 768 px, drei ab 768 px). `hoehe-terminliste` entfällt hier.
- **Befund 22 (Kartenfilter):** Vier gleich breite Spalten im 1-px-Raster (Strich), Mindesthöhe 44 px, bei 390 px eine Zeile.
- **Über den Befund hinaus:** Die Städteliste der Karte kürzte bei 1024 px „Limburg an der Lahn“ und „Friedberg (Hessen)“. Linke Spalte ab lg 1/3 → 2/5, Zeilen px-4 → px-3 (Höhe 44 px bleibt). Gemessen bei 390, 700, 768, 1024, 1440 px ohne Kürzung.

## GEMEINSAME DATEIEN
1. `src/app/globals.css`: Utility `hoehe-terminliste` (Z. 138–141) entfernen; sie ist nach dieser Änderung ungenutzt.
2. Startseite, Servicegebiet (`src/components/start/Servicegebiet.tsx` bzw. `src/components/maps/ServiceMapWrapper.tsx`): Platzhalter neben der Stadtleiste ist bei 1024 px 166 px und bei 1440 px 164 px hoch, die Vorschau 240 bzw. 182 px → unten abgeschnitten. Wunsch: Platzhalter im lg mindestens 200 px. Zuständige Stelle nicht abschließend geprüft.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A (Endstand): GRÜN. tsc 0 Fehler; eslint 0 Fehler, 0 Warnungen; Funktionstests express-funnel, termin, einwilligung: 88 erwartet, 0 unerwartet, 0 flaky; Bilder ohne Konsolenfehler oder Überlauf (/kontakt, /standorte/wetzlar, /); Textvergleich GRÜN.
- Werte (werte.mjs, vier Dateien): 0 Befunde. Textprobe gegen a90e7e7: keine Abweichung.
- Eigene Messung (Dev 4320, 390–1440 px): Icons, Eckmarken, Filterzeile, Terminliste (476/364/376 px, ganze Tage), Ortsnamen ohne „…“ und ohne Überlauf; Einzugsband auf /kontakt im Platzhalter.
- Fremd: „Überlappung 25“ auf / (390 px) liegt im Akkordeon `src/components/start/Fachgewerke.tsx`. Im Arbeitsbaum fremd geändert: `standorte/[stadt]/page.tsx`, `CookieConsent.tsx`.

## BILDBELEGE (`…/scratchpad/E3-NACH-05/`)
- Vorher: `vorher/kontakt-{m390,t768,d1440}/`
- Nachher: `nachher8/kontakt-{m390,t768,b700,d1024,d1440}/`
- Prüfstufe A: `bilder/kontakt/`, `bilder/standorte__wetzlar/`, `bilder/start/`

## OFFENE FRAGEN
1. „Treppen & Naturstein“ mit `naturstein` statt `treppe`: Der Befund nennt Treppe generisch, die Liste führt `treppe` als Fachzeichen. Zurücksetzen?
2. Spaltenverhältnis 3:3:4 (ab md) statt K-007 2:3:5 bestätigen?
3. Die Listenhöhe hängt an festen Zeilenmaßen (`min-h-8`, `h-12`). Bei Änderung müssen die `max-h`-Klassen mit.
4. /standorte: Der Einzugsband ist dort noch nicht eingebunden (Kommentar in `standorte/page.tsx`, Z. 130, Orchestrator). Bei Einbindung den Platzhalter prüfen.
