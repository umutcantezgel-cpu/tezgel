# E3-BAU-16 · Rückgabe · BadanfrageFunnel Schritte 1–2

## GEÄNDERTE DATEIEN
- `src/components/funnels/BadanfrageFunnel/Schritt1.jsx`
- `src/components/funnels/BadanfrageFunnel/Schritt2.jsx`
- `_werkstatt/pakete/E3-BAU-16.rueckgabe.md` (diese Datei)

Kein Commit, kein Push, kein Build, keine Serverstarts.

## WAS UND WARUM
- Frage (`<p>`): `labelKlassen` aus `kern/stile.ts`, wie die Gruppen-Beschriftung im Maßstab TezgelAnfrageFunnel/Schritt2. Vorher `text-base sm:text-lg font-black text-slate-900`.
- Raster: `grid-cols-1 gap-2 sm:grid-cols-2` (vorher `gap-4`), vier Karten je Schritt.
- Karten: `optionClass(gewaehlt)` aus dem Funnel-Stilmodul, unverändert. Gewählt = Tinte. Titel `mb-1 block font-semibold` ohne eigene Farbe. Nebentext `block text-fs-1` mit `text-nacht-2` (gewählt) bzw. `text-tinte-2`.
- Entfernt: `text-slate-*`, `group-hover:text-orange-600`, `transition-colors`, `font-black`, `text-xs`, `text-sm sm:text-base`.
- `data-motion="zustand"` auf den Auswahlknöpfen (Register K-007, nur Farbwechsel, dauer-1). Vorher animierte nur der Titel per `transition-colors`.
- Unverändert: Texte, Reihenfolge, `aria-pressed`, Handler und Nutzlast, Bedingungen, Hilfsnamen. Keine neuen IDs oder ARIA-Attribute. Keine Icons (Daten ohne Icon-Feld, vorher ohne Icon).
- Mikrotext-Änderungen: keine.

## GEMEINSAME DATEIEN (nicht geändert)
In `src/components/funnels/BadanfrageFunnel/index.jsx` (nicht in meinen Rechten) nötig:
1. Fortschrittsbalken: `bg-orange-600` / `bg-neutral-200`, `rounded-full`, `transition-all duration-300` ersetzen durch `bg-tinte` / `bg-fliese`, `border border-strich`, ohne Radius und Übergang.
2. Zurück: `knopfKlassen('text')` mit `data-motion="druck"`, Icon `pfeil-links` statt `ArrowLeft`.
3. Weiter: `btn-primary px-6 py-3 text-xs` ersetzen durch `knopfKlassen('haupt', 'w-full sm:w-auto')` mit `data-motion="druck"`, Icon `pfeil-rechts` statt `ArrowRight`.
4. `glass-bezel-*`, `ceramic-band`, `eyebrow`, `text-neutral-900`, `border-slate-200` durch Systemklassen ersetzen (Fliese, 1-px-Fuge, `text-tinte`, `text-fs-*`).
5. Lucide-Importe `ArrowRight`, `ArrowLeft`, `Sparkles` entfallen. Icons nur aus `@/components/icons/Icon`.

Weitere Altklassen, Zeilen mit Treffern per grep, nicht geprüft: Schritt3 (7), Schritt4 (10), Schritt5 (19), Erfolg.jsx (18), WhatsAppGeoeffnet.jsx (9).

## PRÜFUNG UND ERGEBNIS
- Textprobe gegen HEAD: Schritt1 ENTFERNT 0 / HINZU 0; Schritt2 ENTFERNT 0 / HINZU 0.
- Bezeichner-Probe: `[]` in beiden Dateien.
- Werte-Prüfung (`werte.mjs`): vorher 18 Befunde (8 Farbe, 10 Schrift), nachher 0.
- Prüfstufe A (`pruefe-a.sh E3-BAU-16 … -- /bad/badanfrage`):
  - tsc: GRÜN, 0 Fehler (28 s). eslint: GRÜN, 0 Fehler, 0 Warnungen.
  - Funktionstest `funktion-badanfrage.spec.mjs`: 14 erwartet, 0 unerwartet, 0 flaky.
  - Bilder m390 und d1440: HTTP 200, Konsole 0, Überlauf 0, Überlappung 0.
  - Textvergleich gegen `_werkstatt/belege/e0`: GRÜN (Gate). Für /bad/badanfrage: entfernt 0, unerlaubt entfernt 0, Hauptinhalt ohne Abweichung. Hinzu 11, nur in Kopf- und Fußzeile (gemeinsame Komponenten). Die Summe „seiten_mit_abweichung 242“ entsteht, weil 241 Seiten im Lauf fehlen.
- Hilfslauf für Schritt 2 (Skript im Scratchpad, nutzt `lib.mjs` mit Anfragesperre, nur Klicks auf Karten und „Weiter“, kein Absenden): 390 × 844 und 1440 × 900, kein horizontaler Überlauf, Konsolenfehler 0, Sperrprotokoll leer. Gewählte Karte: Fläche rgb(10,17,41), Text rgb(245,244,240), Nebentext rgb(169,174,192). Ungewählte Karte: Fläche rgb(255,255,255), Rahmen rgb(129,134,152), Nebentext rgb(75,80,103). Kartenhöhe mindestens 105 px.
- Git: meine Änderungen nur in den zwei Dateien. Andere geänderte Dateien im Arbeitsbaum (z. B. `src/app/globals.css`, `FliesenKonfigurator/Schritt1.jsx`) stammen nicht von mir und sind unangetastet.

## BILDBELEGE
Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-16/bilder/`:
- Prüfstufe A: `bad__badanfrage/m390.jpg`, `bad__badanfrage/d1440.jpg` (Schritt 1, Standardauswahl)
- Hilfslauf: `schritt1-m390.png`, `schritt1-d1440.png`, `schritt2-m390.png`, `schritt2-d1440.png`

## OFFENE FRAGEN
1. Schrifthierarchie: Frage (`labelKlassen`, fs-2 semibold) und Kartentitel (fs-2 semibold) sind gleich groß. Der Bestand war größer. Alternative für die Frage: `font-text text-fs-3 font-semibold text-tinte`. Entscheidung offen.
2. `data-motion="zustand"` auf den Auswahlknöpfen folgt Maßstab und Register (Farbe, keine Bewegung). Bei strikter Lesart von „Keine neue Bewegung“ bitte streichen.
3. `src/components/kern/formulare/c/BadanfrageAnsicht.tsx` (Kern-Ansicht, gleicher Hook) nutzt Radiogruppen statt `aria-pressed` und eigene `k-*`-Werte. Der Bestand verlangt `aria-pressed` (E0-KUN-05, funktion-badanfrage). ARIA nicht angefasst. Angleichung beider Ansichten offen.
4. Kopf- und Fußzeile zeigen gegen die Basis e0 elf als nicht erlaubt markierte Zusätze (u. a. „Aufmaß anfragen“, Anschrift, Telefon, Fax, E-Mail, „Betrieb seit 2008“). Die Ursache liegt außerhalb von Schritt 1–2. Bitte im Gesamt-Textvergleich prüfen.
