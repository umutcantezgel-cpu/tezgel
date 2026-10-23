# E2-BAU-03 · Rückgabe (Baumeister, Stufe 2)

## GEÄNDERTE DATEIEN
- `src/components/kern/Tabelle.tsx` (neu)
- `src/components/kern/Bildfeld.tsx` (neu)
- `src/app/werkstatt-schaufenster/tabelle/page.dev.tsx` (neu)
- `_werkstatt/pakete/E2-BAU-03.rueckgabe.md` (neu, diese Datei)

Sonst nichts geändert. Kein Commit, kein Push, kein Server-Start. Prüfausgaben liegen im Scratchpad `E2-BAU-03/`. Die Prüfstufe A hat den Textlauf unter `_werkstatt/cache/texte/E2-BAU-03/` abgelegt; der Ordner ist gitignored.

## WAS UND WARUM
- **Tabelle**: Region `role="region"` mit `aria-label` und `tabIndex=0`, `caption` sr-only, Kopf in Mono mit 2-px-Hauptlinie, Zeilen durch 1-px-Fugen, erste Spalte als `th scope="row"`, Prop `ausrichtung` je Spalte (`rechts` = rechtsbündig in Mono). Kopf und Zahlen brechen nicht um, damit die Region auf 390 px scrollt statt Spalten zu stauchen. Im ersten Lauf hatte das „Tabelle / 3“ umgebrochen; das ist nachgebessert. Der Fokus kommt aus der globalen `:focus-visible`-Regel in `globals.css`.
- **Bildfeld**: `next/image` mit Breite und Höhe aus der Datei, `sizes` je `spalten`, `preload` nur bei `lcp`, keine `quality` (Standard 75), `alt` Pflicht; leerer `alt` setzt `aria-hidden` am `figure`. Beschriftung in Archivo, Quelle in Mono. Die Next-16-Doku (`image.md`) ist gelesen: `preload` statt `priority`.
- **Schaufenster**, nur Bestandsinhalte:
  - Tabelle breit (5 Spalten): `src/app/fliesen/abnahme/page.jsx`; Name Z. 206, Zeilen aus `TOLERANCES` Z. 54–59, Legende Z. 230 (Auszug).
  - Tabelle schmal (3 Spalten): zweite Tabelle derselben Seite, `src/app/fliesen/fliesenarten/page.jsx` Z. 279–296; Name ist die Überschrift Z. 272.
  - Bildfeld voll: `bad-freistehende-wanne.webp`, Alt aus `src/app/page.tsx` Z. 569, Beschriftung aus `src/config/musterbaeder.js` Z. 72.
  - Bildfeld halb: `walk-in-dusche.webp`, Alt aus `src/app/page.tsx` Z. 48, Beschriftung Tag Z. 49.
  - `robots: noindex, nofollow`.
- Keine bestehenden Texte geändert. Schaufenster-Etiketten und Abschnittsnamen sind neu und gelten nur für die Dev-Ansicht.

## GEMEINSAME DATEIEN (exakte Liste)
1. `_werkstatt/werkzeuge/werte-regeln.json`: Eintrag `"src/app/werkstatt-schaufenster/**"` aus `ausnahmen.dateien` streichen. Sonst überspringt `werte.mjs` jede Schaufenster-Seite. Mit einer Kopie ohne diesen Eintrag: 0 Befunde.
2. Optional `_werkstatt/werkzeuge/test-zuordnung.json`: Zuordnung für `Tabelle.tsx` und `Bildfeld.tsx` ergänzen (derzeit „Funktionstests ÜBERSPRUNGEN“).

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A (final, 19:42): **GRÜN**. tsc 0 Fehler (eigene 0, übrige 0). eslint 0 Fehler, 0 Warnungen. Bilder 390/1440: HTTP 200, Konsole 0, Überlauf 0. Textstufe GRÜN (entfernt 0, hinzu 0). Funktionstests ÜBERSPRUNGEN (keine Zuordnung).
- Wortgleich, maschinell gegen den Bestand geprüft: 4/4 Zeilen breit, 7/7 Zeilen schmal, 0 Abweichungen.
- werte.mjs: `Tabelle.tsx` und `Bildfeld.tsx` 0 Befunde. Die Seite war durch die Ausnahme ungeprüft; mit der Regelkopie 0 Befunde.
- Glyphen: alle Mono-Texte (Kopf, Zahlen, Legende, Quelle) in Plex Mono vollständig.
- einzelbild (4320): m390 HTTP 200, Konsole 0, Überlauf 0, Überlappung 15 (14 fixe Elemente, 1 Textkreuzung). d1440 HTTP 200, Konsole 0, Überlauf 0, Überlappung 0. Die Überlappungen betreffen WhatsApp-Knopf, untere Leiste und globale Fußzeile, nicht die Bausteine.
- axe (`RELAUNCH_BASE` 4320, m390 und d1440, WCAG 2.0–2.2 AA): 0 Verstöße. Keine `scrollable-region-focusable`, `table-*` oder `image-alt`.
- HTML: Wanne `width=2752 height=1536`, Dusche `2528×1696`, `sizes` gesetzt, `loading=lazy`, kein Preload. Je Tabelle `role=region`, `tabindex=0`, `caption`.
- Server 4310 und 4320 per GET erreichbar. Git nur lesend; `AGENTS.md` unverändert.

## BILDBELEGE (Scratchpad `E2-BAU-03/`)
- `einzelbild/m390-voll.jpg`, `einzelbild/d1440-voll.jpg`
- Ausschnitte: `ausschnitt-breit-m390.png`, `ausschnitt-schmal-m390.png`, `ausschnitt-d1440-oben.png`, `ausschnitt-d1440-unten.png`, `ausschnitt-d1440-halb.png`
- Prüfstufe A: `bilder/werkstatt-schaufenster__tabelle/m390.jpg`, `d1440.jpg`; axe: `axe/axe.json`

## OFFENE FRAGEN
1. Die Quelle „Fliesenverlegung Tezgel“ am Wannenbild stammt aus dem Alt-Text im Bestand. Einen Bildnachweis gibt es nicht. Bitte bestätigen oder leer lassen.
2. Beide Bestandsfotos zeigen unten rechts ein helles Stern-Symbol in der Bilddatei. Bitte prüfen, ob das ein Generator-Wasserzeichen ist.
3. Die schmale Bestandstabelle hat keine Caption; ihr Name ist die Überschrift darüber. Vorschlag: im Bestand eine `caption` ergänzen (nicht geändert).
4. Mobil überlagern fixe Elemente beim Scrollen Tabellenzellen. Das ist das globale Verhalten der Fixed-Schicht; Entscheidung beim Orchestrator.
5. Auslegung: Die Signatur in Schritt 1 nennt `ausrichtung` nicht, die Beschreibung verlangt es als Prop. Umgesetzt als Prop.
