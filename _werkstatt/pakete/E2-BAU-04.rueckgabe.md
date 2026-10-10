# E2-BAU-04 · Rückgabe (Nacharbeit 2)

## GEÄNDERTE DATEIEN
- `src/components/legal/MapConsentGate.tsx`
- `src/components/maps/ContactPremiumMap.tsx`
- `src/components/maps/InteractiveMap.tsx`
- `src/components/maps/InteractiveServiceMap.tsx`
- `src/components/maps/LocalDominanceMap.tsx`
- `src/components/maps/ServiceMapWrapper.tsx`
- `_werkstatt/pakete/E2-BAU-04.rueckgabe.md`

Code-Stand = ZWISCHENSTAND 9dc0e0e, seitdem ohne Codeänderung. Kein Commit durch mich.

## WAS UND WARUM
- **Einwilligungs-Tor sofort:** `MapConsentGate` zeigt vor der Hydrierung das Tor mit Texten und Knöpfen. Die Karte erscheint nur nach Hydrierung und Einwilligung (`isHydrated && …`). Texte stehen im Server-HTML (geprüft auf `/`).
- **Nur die Karte lädt nach:** `ServiceMapWrapper` rendert das Tor direkt. `KarteBeimSehen` beobachtet den Rahmen (200 px, einmalig) und lädt `ServiceKarteInhalt` (neu aus `InteractiveServiceMap`). Props unverändert.
- **Früher:** framer-motion entfernt; Stadtleiste und Kurzprofil statisch (CLS); Info-Kasten im Fluss (V-01); zwölf Radar-Stadtknoten entfernt.
- **Gemeinsame Regel:** `.karten-hoehe` in `globals.css` wirkt (Commit E2-BAU-04-G).

## WORTLAUT (Mikrotexte)
- Neu: Etikett „Karte“ im Tor; `aria-label` „Stadt oder Kreis filtern“.
- Entfernt: zwölf Stadtknoten der Radar-Ansicht; die Namen bleiben in der Stadtleiste.
- Etiketten „Standort & Einsatzradius“, „Firmensitz & Meister-Erfahrung“ ohne Versalien-Klasse (vorher `uppercase`); Wortlaut gleich.
- Erhalten: „Karte laden & zustimmen“, „Cookie-Einstellungen“, alle iframe-Titel; „Karte wird geladen...“ nur nach Einwilligung im Blick.

## GEMEINSAME DATEIEN (exakte Liste)
1. `src/app/globals.css`: `.karten-hoehe` vorhanden; erledigt.
2. `src/config/cities.ts`: Wetzlar `distanceKm: 0` erscheint als „HQ“; Datenentscheidung beim Orchestrator.
3. `src/app/page.tsx` Z. 40: Ladezustand `min-h-[380px]`, Karte 460 px; sichtbar nur ohne Chunk.

## PRÜFUNG UND ERGEBNIS
- tsc 0 Fehler; eslint 0 Fehler, 0 Warnungen; werte.mjs (6 Dateien) 0 Befunde.
- Prüfstufe A, Lauf 4: tsc, eslint, Bilder GRÜN (HTTP 200, Überlauf 0, Überlappung 0). Funktionstests: 29 erwartet, 4 unerwartet; Lauf 3 gleich.
- Die vier: F-12 auf `/` (je zwei Tests, mobil und desktop). Testhelfer `ladeKnopf` wartet auf „Karte wird geladen...“, den `/` vor Einwilligung nicht mehr zeigt. Teständerung beim Orchestrator (Vorschlag: Scroll-Schritt streichen).
- V-01 (Scratch ohne `test.fixme`, `v01/lauf3.txt`): `/standorte`-Knopf mobil und desktop GRÜN.
- Textstufe (e0 neu, Erlaubnisliste genutzt): unerlaubt entfernte Spannen 2 (Lauf 3: 6, davon vier auf `/standorte`, jetzt 0).
  - `/`: „Karte wird geladen...“; Ausgangsstand ohne Scrollen sichtbar, jetzt erst nach Einwilligung. Vorschlag: erlauben.
  - `/standorte/wetzlar`: „Zentrum: Wetzlar (Lahn-Dill-Kreis) Fahrtzeit ab Aßlar: ca. 10 Min. ab Aßlar“; Wörter gleich, jetzt zwei Elemente statt einem.
- Entfernte Zeilen: `/` 8, davon „Karte wird geladen...“ und sieben aus `src/components/trust/TrustStrip.tsx` (nicht in meinen Dateien; im Server-HTML vorhanden, vermutlich Erfassungsunterschied). Übrige Seiten 0.
- Konsole: `/` 0; übrige Seiten je 4 (Dev-Modus, bekannt).
- Höhen (Endstand, ohne Injektion): Servicekarte 460 px, Standortkarte 400 px, Kontaktkarte 440 px (390) bzw. 770 px (1440); gleich vor und nach dem Laden. CLS (390 / 1440): `/standorte` 0 / 0,001–0,004; `/kontakt` 0 / 0,001; `/` 0 / 0,004; `/standorte/wetzlar` 0 / 0,002 (ohne Kartenfläche).

## BILDBELEGE (Scratchpad `E2-BAU-04/`)
- Lauf 4: `pruefe-a-lauf4.stdout`, `bilder/`; V-01: `v01/lauf3.txt`; Höhen: `mess/hoehe-final.txt`; Werte: `werte3/`.
- Textvergleich: `_werkstatt/cache/texte/E2-BAU-04/texte-vergleich-gegen-e0.json`.

## OFFENE FRAGEN
1. Testhelfer `ladeKnopf` für `/` anpassen (Test-Owner).
2. „Karte wird geladen...“ auf `/`: erlauben oder anders lösen.
3. Zentrum-Zeile: Gruppierung erlauben oder einzeilig zurückbauen.
4. Kartenhöhen 400, 440, 460, 770 px sind keine KERN-Skalenwerte; Vorschlag: Token für Kartenhöhe.
5. Google-Pins nutzen `var(--color-…)`; der API-Pfad ist ohne Schlüssel nicht prüfbar.
6. Fugenraster als Hintergrund fehlt: keine KERN-Klasse.
7. `ContactMapWrapper.tsx` ohne Importeur, mit Altwerten (`h-[450px]`, `animate-pulse`).
8. Default-Export `InteractiveServiceMap` ungenutzt; bleibt aus Kompatibilität.
