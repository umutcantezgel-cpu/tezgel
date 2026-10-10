# P0-KUN-03 · Kundschafter · Stufe 1 · Modell: Haiku · Kern-Version: vorläufig (P0) · Schreibrechte: _relaunch/atlas/A03.md · Umfang: 17 Dateien

## 3 Aufgabe in einem Satz
Erfasse für den Bereich „Leistungen, Matrix, Standorte, Karten, Ausstellung“ jede der unten gelisteten Dateien vollständig nach dem Muster der Vorlage und schreibe den Atlas nach _relaunch/atlas/A03.md.

## 6 Vorlagenauftrag
Gemeinsamer Teil (Rollenbriefing, Projekt in fünf Sätzen, Grenzen, Muster, Slop-Katalog, Ausgabeformular, Selbstprüfung): _relaunch/pakete/_vorlage-kundschafter-P0.md – zuerst lesen.

## 9 Schritte
1. Lies die Vorlage.
2. Erfasse jede der 17 Dateien in der Reihenfolge der Liste. Seiten (page.*) nach dem Seiten-Muster; Komponenten mit: Zweck in einem Satz (aus dem Code, nicht geraten), wo eingebunden (grep nach dem Import), Icons, Bewegung, Zustände (hover/focus/disabled/loading/error/success vorhanden?), freie Werte, Slop-Kandidaten.
3. Am Ende von A03.md: Zählung (Dateien erfasst/gelistet), Summen je Slop-Kandidat, Liste aller lucide-Icons mit Häufigkeit.
4. Rückgabe = Ausgabeformular + letzte Zeile.

## Dateiliste
src/app/ausstellung/giessen/page.jsx
src/app/ausstellung/wetzlar/page.jsx
src/app/leistungen/[id]/[stadt]/page.tsx
src/app/leistungen/[id]/page.jsx
src/app/leistungen/layout.tsx
src/app/leistungen/page.jsx
src/app/standorte/[stadt]/page.tsx
src/app/standorte/page.tsx
src/components/legal/MapConsentGate.tsx
src/components/locations/LocationContact.tsx
src/components/locations/RouteVisualization.tsx
src/components/maps/ContactMapWrapper.tsx
src/components/maps/ContactPremiumMap.tsx
src/components/maps/InteractiveMap.tsx
src/components/maps/InteractiveServiceMap.tsx
src/components/maps/LocalDominanceMap.tsx
src/components/maps/ServiceMapWrapper.tsx
