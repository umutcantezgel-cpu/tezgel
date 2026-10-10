# E2-BAU-04 · Rückgabe (Baumeister, Stufe 2)

## GEÄNDERTE DATEIEN
- `src/components/legal/MapConsentGate.tsx`
- `src/components/maps/ContactPremiumMap.tsx`
- `src/components/maps/InteractiveMap.tsx`
- `src/components/maps/InteractiveServiceMap.tsx`
- `src/components/maps/LocalDominanceMap.tsx`
- `src/components/maps/ServiceMapWrapper.tsx`
- `_werkstatt/pakete/E2-BAU-04.rueckgabe.md` (neu)

Kein Commit, Push oder Serverstart.

## WAS UND WARUM
- **Einwilligungs-Tor:** Rahmen mit fester Höhe aus `height` (Standard 420 px, unverändert) für Platzhalter vor und nach Hydrierung und für die geladene Karte. `bg-fliese border-fuge`, eckig, Etikett „Karte“ in Mono, kein `animate-pulse`. Knopf `knopfKlassen('haupt')`, Hinweis `text-fs-2`. Einwilligungslogik, Props und Exporte bleiben.
- **Kartenkomponenten:** KERN-Tokens, keine Hex- oder rgb-Werte, keine lucide- oder framer-Importe, keine Schatten, Radien oder Pulse. Radar als SVG.
- **V-01:** Der Info-Kasten steht im Fluss unter der Karte. Am Knopf überdeckte er mobil vorher 15 von 15 Messpunkte, nachher 0.
- **CLS:** Stadtleiste (h-11, mb-4) und Kurzprofil stehen von Anfang an im Dokument; nur die Kartenfläche lädt nach. Das nachladende Kurzprofil hatte den Inhalt darunter um rund 440 px verschoben.
- **ServiceMapWrapper:** framer-motion entfällt; eigener IntersectionObserver (200 px, einmalig).
- **Daten und Zugänglichkeit:** Telefon und Adresse aus COMPANY_DATA (Werte identisch); Suchfeld mit `aria-label`; `aria-pressed` an Stadt-, Entfernungs- und Listenknöpfen.
- **Exporte (additiv):** `ServiceKarte`, `KARTE_HOEHE`, `STADT_KLASSEN`, `ServiceStadtleiste`, `ServiceKurzprofil`. Default-Exporte und Props bleiben.

## WORTLAUT (Mikrotexte)
- Neu: „Karte“ (Etikett); `aria-label` „Stadt oder Kreis filtern“.
- Entfernt: die zwölf Stadtknoten der Radar-Ansicht; die Namen stehen weiter in der Stadtleiste.
- Mono ohne Versalien: „STANDORT & EINSATZRADIUS“, „FIRMENSITZ & MEISTER-ERFAHRUNG“ (Wortlaut gleich).
- Erhalten: „Karte laden & zustimmen“, „Karte wird geladen...“, „Cookie-Einstellungen“, alle iframe-Titel; Abschnitt „Unser Hauptstandort in Aßlar“ (Seite, nicht in meinen Dateien).

## GEMEINSAME DATEIEN (exakte Liste)
1. `src/app/globals.css`, in `@layer components` vor den Utilities: `.karten-hoehe { height: var(--karten-hoehe); }`. Ohne diese Regel hat keine Kartenfläche eine Höhe.
2. `src/config/cities.ts`: Wetzlar hat `distanceKm: 0` und erscheint als „HQ“. Datenkorrektur durch den Orchestrator, nicht geändert.
3. `src/app/page.tsx` Z. 40: Ladezustand `min-h-[380px]`, sichtbar nur, solange der Chunk fehlt.

## PRÜFUNG UND ERGEBNIS
- tsc 0 Fehler; eslint 0 Fehler, 0 Warnungen; werte.mjs (6 Dateien) 0 Befunde. Der Werteprüfer erkennt die fehlende Klasse `karten-hoehe` nicht.
- Prüfstufe A (letzter Lauf): tsc, eslint, Funktionstests (33 erwartet, 0 unerwartet, 0 flaky) und Bilder GRÜN; alle Seiten HTTP 200, Überlauf 0, Überlappung 0. Gesamt ROT nur durch die Textstufe.
- V-01 (Scratch-Kopie ohne `test.fixme`): mobil und desktop GRÜN. Gegenprobe HEAD (4310): mobil ROT, der Info-Kasten fängt den Klick ab.
- Bedienprüfung (Scratch, Einwilligung „alle“, 390 und 1440): Stadtleiste, Radar, OSM, Suche, Filter, Auswahl, Anruf- und Routenlinks OK; keine Seitenfehler.
- Textstufe: /standorte nennt fünf Einwilligungstexte der Servicekarte als entfernt. Das Werkzeug lädt die Karte nicht nach. /standorte/wetzlar: eine Zeile in zwei Blöcken, Wortlaut gleich. Rest aus Fußzeile, Startseite und „Per WhatsApp schreiben“ (andere Pakete). Wortweise fehlt auf meinen Seiten nichts außer den Radar-Stadtknoten.
- Konsole: Hydrierungswarnung und blockierte Inspector-Ressource auf allen Seiten, auch `/leistungen/bad`; nur im Dev-Modus, Produktionsstand 4310 ohne Fehler.
- Mit Regel (Scroll-Durchlauf, 390 und 1440, abgelehnt und alle): Servicekarte 460/460, Standortkarte 400/400, Kontaktkarte 440/440 (390) bzw. 770/770 (1440). CLS: /standorte 0 (390), 0,005 (1440); /kontakt 0 bzw. 0,001; Startseite 0 bzw. 0,001; /standorte/wetzlar bis 0,002.
- Ohne Regel: Kontaktkarte mobil Platzhalter 357 px, geladen 152 px; Startseite mobil 110 px auf 357 px (CLS 0,39). Vollbild-Werkzeug: Textkreuzung im Radar (7 mobil, 4 Desktop); mit Regel keine Überlappung.

## BILDBELEGE (Scratchpad `E2-BAU-04/`)
- Werkzeug, Ist-Stand: `einzelbild-final/`; mit Regel: `einzelbild-css/`
- Ausschnitte: `ausschnitte/ist-*.png`, `ausschnitte/mit-*.png`
- Messung: `mess/hoehe-mit.txt`, `mess/hoehe-ohne-final.txt`

## OFFENE FRAGEN
1. Ohne die Regel in `globals.css` wirkt keine Kartenhöhe.
2. Kartenhöhen 400 bis 460 px sind keine KERN-Skalenwerte. Vorschlag: Token für Kartenhöhe.
3. Google-Pins nutzen `var(--color-…)`; der API-Schlüssel-Pfad ist ohne Schlüssel nicht prüfbar.
4. `max-h-56` in der Stadtliste (224 px) ist kein Skalenwert.
5. Fugenraster als Hintergrund fehlt: keine KERN-Klasse dafür.
6. `ContactMapWrapper.tsx` hat keinen Importeur und enthält Altwerte (`h-[450px]`, `animate-pulse`).
7. Radar-Stadtknoten entfernt; Rückholen nur als Liste oder mit Positionsvariablen.
8. Default-Export `InteractiveServiceMap` wird nicht genutzt; er bleibt aus Kompatibilität.
9. Startseitengewicht durch Stadtdaten und COMPANY_DATA nicht gemessen; kein Build erlaubt.
