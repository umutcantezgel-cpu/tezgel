# E2-BAU-04 · Rückgabe (Nacharbeit 3)

## GEÄNDERTE DATEIEN
- `src/components/legal/MapConsentGate.tsx`
- `src/components/maps/ContactPremiumMap.tsx`
- `src/components/maps/InteractiveMap.tsx`
- `src/components/maps/InteractiveServiceMap.tsx`
- `src/components/maps/LocalDominanceMap.tsx` (Nacharbeit 3)
- `src/components/maps/ServiceMapWrapper.tsx`
- `_werkstatt/pakete/E2-BAU-04.rueckgabe.md`

Kein Commit durch mich. Code-Stand: ZWISCHENSTAND 96155f9 (enthält Nacharbeit 3). Fremde Änderungen im Arbeitsbaum, nicht von mir: `MobileMenu.jsx`, `FAQAccordion.tsx`.

## WAS UND WARUM
- **Einwilligungs-Tor sofort:** `MapConsentGate` zeigt vor der Hydrierung das Tor mit Texten und Knöpfen; die Karte erscheint nur nach Hydrierung und Einwilligung. Texte stehen im Server-HTML.
- **Nur die Karte lädt nach:** `ServiceMapWrapper` rendert das Tor direkt; `KarteBeimSehen` lädt `ServiceKarteInhalt` (200 px, einmalig). Props unverändert.
- **Früher:** framer-motion entfernt; Stadtleiste und Kurzprofil statisch (CLS); Info-Kasten im Fluss (V-01); zwölf Radar-Stadtknoten entfernt.
- **Gemeinsame Regel:** `.karten-hoehe` (Commit E2-BAU-04-G). Höhen 400/440/460 px und Spaltenhöhe ab `lg` entsprechen E-018.

## NACHARBEIT 3
- **DOM-Reihenfolge:** Block „Zentrum / Fahrtzeit“ steht im DOM vor der Rangliste wie im Ausgangsstand (5a7a7b0). Sichtbar bleibt die Anordnung (Liste, Radar, Zentrum, Fußzeile) über `order-1` bis `order-4`; gemessen auf m390 und d1440.
- **Prüfstufe A** (`/standorte/wetzlar`, `/standorte/giessen`): GRÜN gesamt. tsc 0, eslint 0/0, Werte 0 Befunde, Funktionstests 34 erwartet, 0 unerwartet. Bilder GRÜN (HTTP 200, Überlauf 0, Überlappung 0). Textvergleich GRÜN, unerlaubt entfernt 0.
- Testhelfer `ladeKnopf`, V-01-`fixme`, „Karte wird geladen...“ auf `/` und Laufband-Duplikate: laut Orchestrator erledigt bzw. erlaubt.

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
- Höhen (ohne Injektion): Servicekarte 460 px, Standortkarte 400 px, Kontaktkarte 440 px (390) bzw. 770 px (1440); gleich vor und nach dem Laden.
- CLS (390 / 1440, vor Nacharbeit 3 gemessen; Anordnung optisch gleich): `/standorte` 0 / 0,001–0,004; `/kontakt` 0 / 0,001; `/` 0 / 0,004; `/standorte/wetzlar` 0 / 0,002.
- V-01 (Scratch ohne `test.fixme`): `/standorte`-Knopf mobil und desktop GRÜN.
- Konsole (Lauf 4): `/` 0; übrige Seiten je 4 (Dev-Modus, bekannt).

## BILDBELEGE (Scratchpad `E2-BAU-04/`)
- Nacharbeit 3: `pruefe-a-lauf5.stdout`, `bilder/standorte__wetzlar/`, `bilder/standorte__giessen/`, `order-check/radar-m390.png`, `order-check/radar-d1440.png`; Werte: `werte4/`.
- Höhen: `mess/hoehe-final.txt`; V-01: `v01/lauf3.txt`.
- Textvergleich: `_werkstatt/cache/texte/E2-BAU-04/texte-vergleich-gegen-e0.json`.

## OFFENE FRAGEN
1. Sichtbare Reihenfolge weicht von der DOM-Reihenfolge ab (`order-*`). Zentrum oben statt unten wäre ohne `order-*` möglich; Entscheidung beim Orchestrator.
2. Google-Pins nutzen `var(--color-…)`; der API-Pfad ist ohne Schlüssel nicht prüfbar.
3. Fugenraster als Hintergrund fehlt: keine KERN-Klasse.
4. `ContactMapWrapper.tsx` ohne Importeur, mit Altwerten (`h-[450px]`, `animate-pulse`).
5. Default-Export `InteractiveServiceMap` ungenutzt; bleibt aus Kompatibilität.
