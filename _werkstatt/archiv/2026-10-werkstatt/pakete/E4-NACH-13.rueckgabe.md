# E4-NACH-13 · Rückgabe Baumeister (Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/konfigurator/page.jsx`
- `src/components/funnels/FliesenKonfigurator/index.jsx`
- `src/components/funnels/FliesenKonfigurator/Schritt3.jsx`
- `src/components/funnels/FliesenKonfigurator/ResultSummary.jsx`
- Unverändert: `Schritt2.jsx`

## WAS UND WARUM
- **Reihenfolge (Befund 12/13):** Einstieg, dann direkt das Werkzeug, dann „Vier Schritte“. Text unverändert, nur verschoben.
- **Werkzeug und Ergebnis (Befund 12/14):** Werkzeug 8 Spalten links, Ergebnis-Spalte 4 Spalten rechts, ab lg klebend. Die bisherige Live-Vorschau wandert dorthin, ohne neue Berechnung. Ab Schritt 3 steht dort das Ergebnis, davor `<Rueckfrage />`.
- **Fliese und Knopf (Befund 14):** Ergebnis `border-fuge bg-fliese`, Werte in Mono; `ResultSummary` ebenfalls Fliese. Deaktivierter Knopf als Strich-Rahmen auf Fliese.
- **Fortschritt (Befund 19):** Nur die Kästchen sichtbar; „Schritt X von 4“ als `sr-only`; Balken entfällt. Laufender Schritt mit 2-px-Achsstück in Laser.
- **H1/H2 (Befund 11):** H1 blieb text-fs-6. Erklär-H2 per `[&_h2]:text-fs-5` eine Stufe kleiner.
- **Verbandszeichen (Befund 17):** In Tabelle und Musterwahl, dekorativ, `groesse={6}`; „Noch offen“ ohne Zeichen.
- **Verschnitt mobil (Befund 18):** unter sm Zeilenblöcke, ab sm Tabelle; Inhalt identisch.
- **Etikett (Befund 19):** `etikett="Ratgeber"` am Abschnitt „Weiterführende Ratgeber zur Fliesenplanung“.
- **Tempo:** Abschnitte nach dem Einstieg mit `spaet`; Konfigurator per `next/dynamic` (Muster `/`). Nicht im Umfang, siehe OFFENE FRAGEN.

## Mikrotext alt → neu
- Neu: `etikett="Ratgeber"`.
- Neu: `aria-label="Verschnitt-Richtwerte je Verlegemuster"` am mobilen Zeilenblock (gleich dem Tabellennamen).
- Neu: Ladetext „Anfrageformular wird geladen...“ (wie auf `/` und `/bad`).
- Textprobe gegen HEAD: 0 entfernt, genau diese 3 hinzu.

## GEMEINSAME DATEIEN
- `src/components/kern/Abschnitt.tsx`: H2 fest `text-fs-6`. Gewünscht: Prop (z. B. `titelGroesse`), dann entfällt die Arbitrary-Variante in `page.jsx`.
- Wirkung auf andere Seiten: `FliesenKonfigurator` ist auf zwölf weiteren `/fliesen/…`-Seiten eingebettet. Dort wirken Layout, Fortschritt, Knopf, Musterzeichen und Fliese mit. Die zuständigen Pakete sollten das wissen.

## PRÜFUNG UND ERGEBNIS
- `werte.mjs` (5 Dateien): 0 Befunde.
- Textprobe: siehe oben.
- `einzelbild.mjs` (4320): 390, 768, 1440 jeweils HTTP 200, Konsole 0, Überlauf 0.
- Überlappung 39 / 22 / 22, identisch zur Baseline auf 4310 (FAQ-Aufklapper, nicht von dieser Änderung).
- **Prüfstufe A: nicht abgeschlossen.** Der Lauf stand noch in der Typprüfung; ich habe ihn gestoppt. tsc, eslint und `funktion-konfigurator.spec.mjs` sind nicht bestätigt. Das muss der Orchestrator nachholen.
- Schritte 2–4 und die Musterwahl nicht gerendert (Interaktion nicht über das Einzelbild-Werkzeug möglich).

## BILDBELEGE (Scratch: `…/scratchpad/E4-NACH-13/`)
- `v1/d1440-voll.jpg`, `v1/m390-voll.jpg`, `v1/t768-voll.jpg`
- `v2k/d1440.jpg` (Werkzeug, Schritt 1, Rückfrage), `v3m/m390.jpg` (mobil), `v3r/m390.jpg` und `v3r/d1440.jpg` (Verschnitt mit Zeichen)
- `head/` (Baseline HEAD)

## OFFENE FRAGEN
1. Schritt 4: Die Ergebnis-Spalte zeigt denselben Stand wie `ResultSummary` im Formular. Soll dort `<Rueckfrage />` stehen?
2. Tempo (`spaet`, `dynamic`) ist aus dem Maßstab, nicht aus dem Umfang. Bitte bestätigen oder zurücknehmen.
3. Mobil: Ergebnis ab Schritt 3 zwischen Kopf und Formular; Rückfrage in Schritt 1–2 nach dem Formular. Bitte bestätigen.
4. Befund 12, „Schritt 1 ≤ 900 px“ bei 1440: nicht exakt vermessen.
