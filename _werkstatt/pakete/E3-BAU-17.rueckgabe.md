# E3-BAU-17 · Rückgabe · BadanfrageFunnel Schritte 3–5 (V-03)

## GEÄNDERTE DATEIEN
- `src/components/funnels/BadanfrageFunnel/Schritt3.jsx`
- `src/components/funnels/BadanfrageFunnel/Schritt4.jsx`
- `src/components/funnels/BadanfrageFunnel/Schritt5.jsx`
- `_werkstatt/pakete/E3-BAU-17.rueckgabe.md`

Kein Commit, Push, Build oder Serverstart von mir. Während des Laufs entstanden die Zwischenstand-Commits `faba676` und `09371e4` („ZWISCHENSTAND“), nicht von mir. `09371e4` enthält den Endstand aller drei Dateien; HEAD und Arbeitsbaum stimmen für sie überein.

## WAS UND WARUM
- **Schritt 3:** Frage und Beschriftungen `labelKlassen`, Eingaben `inputClass` (Zahlenfelder zusätzlich `tabular-nums`). Infokasten (sky) wird `Hinweis titel="Berechnete Grundfläche:"`; `aria-live` bleibt am Wert.
- **Schritt 4:** Frage und Legende `labelKlassen`. Qualitätskarten über `optionClass` (`p-4`), Nebentext `text-fs-1` in `text-nacht-2`/`text-tinte-2`. Ausstattung: `wahlKlassen` mit `Icon` haken/plus statt lucide Check/Plus. Raster: 1 Spalte mobil, 2 ab `sm`, 3 ab `lg`, weil bei zwei Spalten am Handy einzelne Wörter („Fußbodenheizung“) über den Rand liefen. `data-motion="zustand"` auf Karten und Chips wie in Schritt 1–2.
- **Schritt 5:** Labels `labelKlassen`, Pflichtmarke `pflichtKlassen`. Sendefehler (V-03) wird `Hinweis art="fehler" rolle="alert"`, Text unverändert. Knöpfe über `knopfKlassen` mit `data-motion="druck"`; `glass-button-whatsapp` entfällt. Ladezustand: Text wie bisher, Spinner durch KERN-Ladefuge `laden-fuge`. Kein `aria-busy`, damit ARIA gleich bleibt. Icons: Send → `pfeil-rechts` (wie TezgelAnfrage), MessageCircle → `sprechblase`, Lock → `schloss`, ArrowLeft → `pfeil-links`.
- **Alle drei:** Farben, `font-black`/`bold`, `text-xs` bis `lg`, `rounded-*`, `shadow-*`, `transition-*`, lucide-Importe entfernt.
- **Mikrotexte:** keine geändert. Textprobe gegen Vorher-Stand: Schritt 3 „Berechnete Grundfläche:“ wechselt von Text zu `titel`-Prop (gleicher Wortlaut). Schritt 4: 0/0. Schritt 5: 0 entfernt, 4 „HINZU“ sind Icon-Namen (Attribut `name`).

## GEMEINSAME DATEIEN (nicht geändert)
`src/components/funnels/BadanfrageFunnel/index.jsx` ist nicht in meinen Rechten. Die E3-BAU-16-Punkte bleiben offen: Zeilen 4, 97, 110 (lucide-Pfeile, `Sparkles`); 45–48 `glass-bezel-*`, `ceramic-band`; 50–54 `eyebrow`; 58 `text-neutral-900`; 67–68 Fortschrittsbalken (`bg-orange-600`, `bg-neutral-200`, `transition-all`); 90 `border-slate-200`; 107 `btn-primary`. Ersatz: `knopfKlassen` (haupt/text), `Icon`, Systemtokens.
Der Textvergleich zeigt 11 „HINZU“-Texte in Kopf und Fuß (z. B. „Aufmaß anfragen“, Anschrift). Sie stammen nicht aus meinen Schritten.

## PRÜFUNG UND ERGEBNIS
- **Prüfstufe A** (`pruefe-a.sh E3-BAU-17 … -- /bad/badanfrage`, Endstand): GRÜN, Exit 0. tsc: 0 Fehler (eigene 0, übrige 0). eslint: 0 Fehler, 0 Warnungen. Funktionstest `funktion-badanfrage`: 14 erwartet, 0 unerwartet, 0 flaky. Bilder m390/d1440: HTTP 200/200, Konsole 0, Überlauf 0, Überlappung 0. Textvergleich gegen e0: entfernt 0, unerlaubt entfernt 0.
- `bezeichner.cjs`: `[]` in allen drei Dateien. `werte.mjs`: 0 Befunde.
- Strukturvergleich ohne className: nur beabsichtigte Änderungen. IDs, Labels, `aria-pressed`, `aria-live`, `role="alert"`, Handler, Bedingungen und Reihenfolge gleich. Mengen: S3 3 Felder und Hinweis; S4 3 Karten und 6 Chips; S5 6 Felder, Honeypot, 2 Absendeknöpfe, Zurück.
- Hilfslauf (Scratchpad, `lib.mjs`-Sperre; nur Weiter und Auswahl; Absenden nur als lokal beantwortete Fehlerattrappe, 1 Versuch, nichts ans Netz; die Sperre blockierte einen Dev-Overlay-POST): Schritte 3–5, Fehler- und Ladezustand bei 390 und 1440 ohne Überlauf. Fehlermeldung mit `role="alert"` sichtbar; Ladeknopf gesperrt, 308 × 59 px.
- Server: 4320 und 4310 antworten mit HTTP 200 (nicht gestartet).

## BILDBELEGE
Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-17/bilder/`
- Prüfstufe A: `bad__badanfrage/m390.jpg`, `d1440.jpg` (Schritt 1)
- `hilfslauf/`: `schritt3-m390.png`, `schritt4-gewaehlt-m390.png`, `schritt4-gewaehlt-d1440.png`, `schritt5-m390.png`, `schritt5-d1440.png`, `schritt5-fehler-m390.png`, `schritt5-laedt-m390.png`
- `ausschnitte/`: Detailansichten

## OFFENE FRAGEN
1. `Hinweis` ohne `titel` setzt im Baustein ein sr-only „Fehler: “ vor die Meldung; der sichtbare Text bleibt. Zulässig? Sonst Änderung am Baustein `kern/Hinweis.tsx` (nicht meine Datei).
2. Ladezustand: Spinner durch `laden-fuge` ersetzt (aria-hidden). Bestätigen?
3. `data-motion="zustand"` auf Karten und Chips in Schritt 4, wie in Schritt 1–2 (offen seit E3-BAU-16, Frage 2).
4. Grundfläche als `Hinweis` mit Titel oben und großem Wert. Bestätigen? Der Baustein `Kennwerte` würde den Text verändern.
5. Pflichtmarke ohne sr-Zusatz „Pflichtfeld“ (K-009 sieht ihn vor, der Maßstab nicht). Nicht ergänzt, da neuer Text.
6. Schrifthierarchie der Schrittfragen (`labelKlassen`, wie E3-BAU-16, Frage 1): Entscheidung offen.
7. Die Zwischenstand-Commits liegen auf HEAD, ohne dass ich committet habe. Abnahme-Commit und Prüfung der Historie durch den Orchestrator.
