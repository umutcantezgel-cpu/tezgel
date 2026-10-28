# UM-E3-CURSOR · Notiz des Baumeisters (28.10.2026)

Paket: Fugenkreuz-Cursor nach K-007 und K-008 (Regeln v4) mit sechs Zuständen, Register und Tests der Zustandsmaschine.
Briefing `pakete/UM-E3-W3.md`, Kern 4.3. Arbeitskopie `w3/baum`, Stand vorher `w3/vor-UM-E3-CURSOR`, Diff `w3/UM-E3-CURSOR.diff`.

## Entwurf

**Aufbau in drei Teilen**
- `src/components/cursor/Cursor.tsx` (neu, Client-Insel, rendert nichts):
  - Bei grobem Zeiger (`zeigerFein()` falsch) gibt es keinen Lauscher und kein Modul.
  - Sonst wartet ein passiver `pointermove`-Lauscher nach der Hydrierung auf die erste Bewegung einer Maus. Erst dann lädt `import('@/lib/motion/cursor')` das Modul.
  - Ein Seitenwechsel (`usePathname`) blendet das Schild aus, bis sich der Zeiger bewegt.
  - Schlägt das Nachladen fehl, bleibt es beim Systemzeiger.
- `src/lib/motion/cursor.ts` (neu):
  - Register `CURSOR_REGISTER` mit Beschriftung, Form, Orten, Zweck, Stufe und ruhiger Fassung je Zustand.
  - `zielZustand`: Zustand des Elements unter dem Zeiger.
  - Zustandsmaschine `weiter` und `anzeige` ohne DOM.
  - `kante` für den Fensterrand.
  - `starteCursor`: Schild, Lauscher und Beobachter.
- `src/app/(bestand)/layout.tsx` bindet `<Cursor />` ein. Die CSS steht in `src/app/bewegung.css`, Block „cursor“, vor dem Spiegel des Bewegungsschalters.

**Schild**
- Aufbau: `div.k-cursor` mit `position: fixed`, Ebene 50, `pointer-events: none`, `aria-hidden`, `data-motion="cursor"`. Darin liegt die Marke mit dem Schild: Tinte mit Kalk-Schrift und 1 px Kalk-Rand, Archivo `fs-1` in 600.
- Inhalt: das Fugenkreuz in CSS (12 Einheiten, Arme 2, wie `kern/Fugenkreuz.tsx`) und die Beschriftung.
- Das Schild steht rechts unter dem Zeiger, neben Pfeil und Hand. Am Fensterrand wechselt es die Seite (`data-cursor-kante` x und y). Der Wechsel verschiebt die Marke mit `translate` um ihre eigene Größe (−100 %); `left`, `top` und der Innenabstand bleiben, also keine Layout-Verschiebung (Nacharbeit 3).
- Der Abstand zum Zeiger ist Innenabstand der Marke, rundum gleich (`padding: calc(var(--spacing) * 4)`). So kommt er in der Größe vom ResizeObserver mit, und der Wert steht nicht doppelt in CSS und TS. Weil die Breite jetzt den Abstand auf beiden Seiten enthält, wechselt das Schild die Seite, sobald es näher als 4 Einheiten an den Rand käme (vorher erst am Rand).
- Das Modul hängt das Schild an `body`. Damit liegt es außerhalb von `main` und `inert` von B-01 trifft es nicht.

**Lage**
- `translate` wird im nächsten Bild des gemeinsamen Takts gesetzt (`naechstesBild`). Maßgeblich ist die letzte Zeigerlage, ohne Feder und ohne Nachlauf, in beiden Fassungen.
- Pro Bild liest das Modul kein Layout:
  - Größe der Marke aus dem ResizeObserver
  - Fenstergröße aus `resize`, einmal je Ereignis
- Außerhalb der Orte ruht der Takt: Ein Bild wird nur geplant, wenn vorher oder nachher etwas zu sehen ist.

**Zustände und Orte (Register)**

| Zustand | Beschriftung | Form | Ort ohne Attribut |
|---|---|---|---|
| handlung | (leer, nur Kreuz) oder `data-cursor-text` | Kreuz | keiner, nur `data-cursor="handlung"` |
| ansehen | Ansehen | Kreuz | `a.glasbild[href]`, `.verlegeplan[data-flucht="zeigen"]`, `.sig-plan-ziel .verlegeplan` |
| ziehen | Ziehen | Kreuz | `.formatregler-bild` |
| vergleichen | Vergleichen | Kreuz | `.vn-zone` |
| gesperrt | Nicht verfügbar | schräg (×) | `button:disabled`, `input:disabled`, `select:disabled`, Bedienelement mit `aria-disabled="true"` |
| laedt | Lädt | dreht sich (nur mit Bewegung) | Bedienelement mit `aria-busy="true"` |

- Das nächste entscheidende Element von innen nach außen gilt.
- Vorrang an einem Element: Textfeld (kein Schild, Textcursor bleibt nativ) vor ladend, ladend vor gesperrt, gesperrt vor eigener Wahl, eigene Wahl vor den Orten.
- `data-cursor="aus"` schaltet einen Ort ab. Unbekannte Werte zählen nicht.

**Ausblenden**
- Tastatur, außer reinen Zusatztasten wie Umschalt und Strg: Das Schild bleibt aus, bis sich der Zeiger an eine neue Stelle bewegt.
- Seitenwechsel: ebenso, bis zur nächsten Bewegung.
- Fenster verlassen (`pointerout` ohne `relatedTarget`), Fenster ohne Fokus (`blur` am Fenster, ohne capture) und verborgener Tab: Das Schild bleibt aus, bis die Maus sich wieder meldet. Ein Fokuswechsel zwischen Elementen blendet nicht aus (Nacharbeit 1).
- Finger oder Stift (`pointerType` nicht `mouse`): aus, bis wieder eine Maus kommt.
- Erzwungene Farben: Das Modul blendet aus (Medienabfrage mit `change`), und die CSS setzt `display: none`. Im Druck gilt `display: none` ebenso.

**Ruhig (reduziert und Schalter „ruhig“)**
- Die Lage ist dieselbe, denn eine Feder gibt es in keiner Fassung.
- Übergänge gibt es nur unter `html.k-bewegung:not(.k-notaus)`:
  - Einblenden in `dauer-1` mit `setzen`
  - Druck und Drehung des Kreuzes in `dauer-1` mit `setzen`
  - „lädt“ als Vierteldrehung je `dauer-5`, linear und endlos; wegen der Symmetrie ohne Sprung. Die Drehung hängt zusätzlich an `data-cursor-stand="an"`: Ausgeblendet läuft keine Endlosanimation, auch wenn `data-cursor-zustand="laedt"` stehen bleibt (Nacharbeit 2).
- Ausblenden geht immer sofort, also eine Stufe kürzer.
- `transition-property: none` an `.k-cursor` und an allen Teilen (`.k-cursor *`, `::before`, `::after`; die Eigenschaft erbt nicht) hält die Übergangsregel der ruhigen Fassung (0,01 ms) vom Schild fern. Sonst entstünden 0,01-ms-Übergänge auf `translate` (Schild und Marke) und `rotate`, und `bewegung.mjs` würde sie im reduzierten Lauf als Bewegung zählen (Nacharbeit 5).
- Die Beschriftung bleibt.
- Keine Regel hängt an `prefers-reduced-motion`, also braucht es keinen Spiegel. Der Wächter Schalter 4 bleibt grün.

**„lädt“ und die Ladeschwelle (K-010)**
- Die Schwelle kommt aus `erzeugeLadeschwelle` (`src/lib/ladeschwelle.ts`). Vor 300 ms gibt es kein Schild. Danach bleibt es mindestens 500 ms stehen, solange der Zeiger auf dem ladenden Element bleibt.
- Verlässt der Zeiger das Element, endet „lädt“ sofort.
- Ein Zustandswechsel ohne Bewegung (Klick auf Absenden, Knopf wird gesperrt oder frei) kommt über einen MutationObserver auf `aria-busy`, `disabled`, `aria-disabled`, `data-cursor` und `data-cursor-text`.

## Entscheidungen
1. **Der Systemzeiger bleibt der Klickpunkt.** Es gibt kein `cursor: none` und keinen eigenen CSS-Cursor. Das Schild ist nur Zusatz (AUFTRAG 8, K-007).
2. **Orte aus dem vorhandenen Markup.** Glasbild, Formatregler, Regler und Verlegeplan stehen nicht in der Dateiliste. Deshalb erkennt das Register sie an ihren Klassen. Für künftige Orte gibt es `data-cursor` und `data-cursor-text`; dafür muss das Register nicht geändert werden. Test Cursor 1 prüft, dass die Klassen in den Bausteinen wirklich stehen.
3. **Handlung hat keinen festen Ort.** Ein Schild über jedem Link widerspräche „Ruhe“. Den Link zeigt die Hand des Systems ohnehin an. Handlung gibt es nur über `data-cursor="handlung"`.
4. **Gesperrt und lädt an jedem Bedienelement, nicht an Textabschnitten.** Dort sagt der Systemzeiger nichts. Für Arbeitsansichten ist das Rückmeldung, kein Signaturmoment (K-007).
5. **Ebene 50, nicht 60.** Das Schild liegt über Inhalt, Banner und Menü und unter dem Seitenwechsel B-01. B-01 bleibt dabei unverändert (E-078).
6. **Nachladen bei der ersten Mausbewegung**, nicht gleich nach der Hydrierung (Z-10). Lighthouse, Touch und reine Tastatur laden kein Cursor-Skript. Im ersten Laden kommt nur die kleine Insel dazu; `schalter.ts` ist ohnehin geladen.
7. **Kein Scroll- oder Wheel-Lauscher.** Ändert sich das Ziel ohne Bewegung, nach Scrollen oder Seitenwechsel, kommen `pointerover` und das Ereignis `seite` zum Zug.
8. **Formen:** × für gesperrt, Drehung für lädt, beim Druck zieht sich das Kreuz auf 0,75 zusammen. Animiert werden nur `rotate`, `scale` und `opacity`. Zustandsregeln (`[data-cursor-…]`) setzen nur `opacity`, `translate`, `rotate`, `scale`, `transition` und `animation`, nie eine Layout-Eigenschaft (Test Cursor 11).
9. **Register mit Zweck, Stufe und ruhiger Fassung** je Zustand. REG kann es so übernehmen.
10. **`package.json`:** Nur `test/cursor.test.mjs` ist in das Testskript eingetragen, wie das Briefing es vorsieht.

## Offene Fragen und Übergaben
1. **REG (Übergabe, vom Prüfer bestätigt, bewusst nicht in diesem Paket):** Die Kennung `cursor` fehlt noch im Register. `register.ts` und `register.json` stehen in der PLAN-Zeile von UM-E3-REG („Cursor-Zustände“), nicht in der von CURSOR. Deshalb CURSOR nur zusammen mit REG als Stufe-A-Stand prüfen (`bewegung.mjs --modus register`).
   - Einzutragen in `register.ts` (Auslöser `interaktion`, in `SELBST`, ohne Beobachter) und `_werkstatt/register.json`, dazu die Zeile in KERN K-008. Dann passen die Tests „Bewegung 1“ und „1b“ an.
   - Bis dahin meldet `bewegung.mjs --modus register` am Desktop `cursor` als unbekannt, sobald eine Maus sich bewegt hat.
   - `pruefeSichtbarkeit` zählt das ruhende Schild (`data-cursor-stand="aus"`, Deckkraft 0) womöglich als unsichtbar. Vorschlag: eine Ausnahme im Werkzeug (Orchestrator).
2. **Glasbild doppelt „Ansehen“:** Beim Darüberfahren zeigt das Foto schon „Ansehen →“, und das Schild wiederholt das Wort (K-007 wörtlich). Bitte in der Sichtprüfung (Stufe B) ansehen. Ausweichen ginge mit einer Zeile im Register: Glasbild als `handlung` ohne Beschriftung.
3. **Pläne in Karten** (`/leistungen`, Gewerke): Das Schild sagt „Ansehen“, obwohl der Plan kein Link ist; er rückt nur in die Flucht. Passt das Wort, oder soll das Schild dort entfallen?
4. **Gesperrt und lädt auf Arbeitsansichten:** Zum Beispiel „Nicht verfügbar“ am Schalter „an“ bei reduzierter Bewegung oder an gesperrten Weiter-Knöpfen der Rechner, und „Lädt“ am Absendeknopf nach 300 ms. Bitte bestätigen, dass das als Rückmeldung erwünscht ist.
5. **Stufe A im Browser:**
   - Wechselt das Ziel nach Scrollen ohne Mausbewegung? Chromium sendet dabei Grenzereignisse.
   - Kommen Zeigerereignisse an gesperrten Formularelementen an? Wenn nicht, bleibt das Schild dort einfach aus.
   - Firefox und WebKit (UM-4).
   - INP und Bildrate mit Maus über Galerie und Reglern.
6. **Specs und Pixel:** Specs, die die Maus bewegen, sehen das Schild. Klicks beeinflusst es nicht (`pointer-events: none`). Pixelaufnahmen ohne Mausbewegung bleiben gleich, weil die Insel nichts rendert.
7. **Hybride Geräte:** Ist der Hauptzeiger beim Laden grob (Tablet), lädt der Cursor auch später nicht, wenn eine Maus dazukommt. Das ist bewusst so, wegen der Leistung mobil.

## Nacharbeit nach der Prüfung (zwei Prüfer, 28.10.2026)
Jeder Befund wurde am Code nachvollzogen; die Browsermessungen der Prüfer stehen in `scratchpad/pruef-cursor-lens/` (`blur.mjs`, `cls2.mjs`, `sonde.mjs`) und sind in Stufe A zu wiederholen (in diesem Paket kein Browser).
1. **`blur` mit capture (mittel, zwei Prüfer): behoben.** Am Fenster mit `capture: true` kommt jeder blur eines Elements an (blur steigt nicht auf, durchläuft aber die Capture-Phase); jeder Fokuswechsel meldete „verlassen“. Jetzt `window.addEventListener('blur', weg, nurFenster)` mit `nurFenster = { passive: true, capture: false }`, Abmeldung mit demselben Objekt. Alle übrigen Lauscher bleiben `passiv` (capture). `capture: false` steht ausdrücklich da, weil `removeEventListener` ein Objekt nur mit `passive` nicht annimmt (TS 2769). Test Cursor 9 prüft jetzt `nurFenster` ohne capture, `blur` nur am Fenster und für jeden Lauscher die Abmeldung mit denselben Optionen.
2. **„lädt“ dreht unsichtbar weiter (mittel): behoben.** `zeichne()` schreibt im Aus nichts, also blieb `data-cursor-zustand="laedt"` stehen, und die Endlosanimation lief bei Deckkraft 0 weiter. Die Regel heißt jetzt `html.k-bewegung:not(.k-notaus) .k-cursor[data-cursor-stand="an"][data-cursor-zustand="laedt"] .k-cursor-kreuz`. Test Cursor 11: jede Regel mit `infinite` hängt an `data-cursor-stand="an"`.
3. **Kantenwechsel über Layout-Eigenschaften (mittel): behoben.** Die Kantenregeln setzen nur noch `translate` an der Marke (`-100% 0`, `0 -100%`, für beide `-100% -100%`), die Marke hat rundum denselben Innenabstand. Damit ändert weder der Seitenwechsel noch eine neue Beschriftung bei rechter Kante eine Layout-Lage. Test Cursor 11: Zustandsregeln setzen nur Deckkraft und Transformation, die drei Kantenregeln nur `translate`, die Marke hat `padding` rundum und keinen einseitigen Innenabstand.
4. **Kennung `cursor` fehlt im Register (gering): nicht in diesem Paket**, siehe Offene Fragen 1 (Dateien von UM-E3-REG).
5. **`transition-property` erbt nicht (gering): behoben.** Neue Regel `.k-cursor *, .k-cursor *::before, .k-cursor *::after { transition-property: none; }`; die Angabe an `.k-cursor-kreuz` entfällt dafür. Die Regeln unter `html.k-bewegung:not(.k-notaus)` sind spezifischer und setzen ihre Übergänge weiter. Test Cursor 11 prüft die Regel.
6. **`blur` mit capture (gering, zweiter Prüfer):** derselbe Befund wie 1, mit 1 behoben.

## Prüfzahlen (Arbeitskopie, Node 24.22.1, nach der Nacharbeit)
- `npm test`: 243 von 243 bestanden, 0 Fehler. Vorher waren es 232; neu sind die 11 Tests in `test/cursor.test.mjs` (Cursor 9 und 11 in der Nacharbeit verschärft). Kein Test wurde gelockert.
- `npx tsc --noEmit -p .`: 0 Fehler. `next-env.d.ts` wurde dafür vorübergehend angelegt und wieder gelöscht, ebenso `tsconfig.tsbuildinfo`.
- `npx eslint` (cursor.ts, Cursor.tsx, layout.tsx, cursor.test.mjs): 0.
- `werte.mjs --arbeitsbaum` (cursor.ts, Cursor.tsx, layout.tsx, bewegung.css): 0 Befunde.
- Gegenproben: 11 Mutationen aus dem ersten Lauf, alle rot. Geprüft wurden Tastatur bis Bewegung, erzwungene Farben, Touch, Vorrang „lädt“, Textfeld nativ, Ladeschwelle, Verlassen, ruhige Übergangsregel, Übergang ohne Bewegungsklasse, nur Maus und Ebene unter B-01.
- Gegenproben der Nacharbeit: 7 Mutationen, alle rot (je 1 Fehler, Kontrolle 0): `blur` wieder mit `passiv`, Abmeldung mit `passiv`, `nurFenster` mit capture, „lädt“ ohne `data-cursor-stand="an"`, Kante mit `left`/`right`, ohne Regel für die Teile, Marke mit einseitigem Innenabstand.
- CSS-Block mit lightningcss geparst: gültig, 0 Warnungen.
- Rauchprobe des DOM-Teils mit nachgebautem Dokument (`w3/rauch/adapter-rauch.mjs`, nicht Teil des Pakets): nach der Nacharbeit erneut bestanden. Sie kennt keine Capture-Phase und keine Layout-Verschiebung; die Befunde 1 bis 3 sind deshalb nur im Browser zu belegen (Stufe A mit den Skripten der Prüfer).
  - Schild, passive Lauscher, kein Scroll-Lauscher
  - Lage, Takt ruht außerhalb der Orte
  - Taste, Fensterrand, Druck, Verlassen, Finger, erzwungene Farben, Seitenwechsel
  - „lädt“ nach 300 ms mit Mindestdauer, gesperrt
  - `stopp` räumt alles ab
- Selektoren des Registers mit lightningcss geparst: gültig.
- Der Diff (neu erzeugt nach der Nacharbeit, 1058 Zeilen) lässt sich auf den Stand vorher anwenden (`patch --dry-run`), und das Ergebnis gleicht der Arbeitskopie Datei für Datei. Das Repository blieb unberührt.

## Dateien
- `src/lib/motion/cursor.ts` (neu)
- `src/components/cursor/Cursor.tsx` (neu)
- `src/app/(bestand)/layout.tsx`
- `src/app/bewegung.css` (Block „cursor“, B-01-Regeln unberührt)
- `test/cursor.test.mjs` (neu)
- `package.json` (nur das Testskript)
