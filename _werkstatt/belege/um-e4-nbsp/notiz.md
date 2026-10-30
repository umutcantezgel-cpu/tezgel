# UM-E4-NBSP · Notiz zur Arbeitskopie (Baumeister, Haiku)

Stand: 2026-10-30, Nachlauf nach der Gegenprüfung (Befunde zu `orte.ts:27` und zur Schreibweise des Escapes). Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/nbsp/baum` (Abzug von HEAD, `node_modules` verlinkt). Vorlage: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/nbsp/vor`. Diff: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/nbsp/UM-E4-NBSP.diff`. Das Repository unter `/home/user/tezgel` ist nicht verändert.

## 1. Ergebnis

- 13 Inhaltsdateien (`src/inhalte/*.ts` ohne `meta/`) geprüft.
- Sichtbare Stellen: 8. Lauf 1 hatte 7. Die Stelle `src/inhalte/orte.ts:27` (`etwa ${kmAbSitz} km bis ${name}.`) fehlte, weil die Suche nur mit Ziffern arbeitete und Ausdrücke wie `${…}` übersah.
- Gesetzt als U+00A0 im Quelltext, als Escape `\u00A0`: 7. Davon neu gesetzt: 4 (in 3 Dateien). Vorhanden und in diesem Lauf ebenfalls auf Escape umgestellt: 3 (`balkon-terrasse.ts` Zeilen 84, 95, 114).
- Offen, nicht gesetzt: 1 (`orte.ts:27`). Das Setzen bricht `test/orte.test.mjs:59`; Tests sind nicht Teil des Pakets. Siehe Abschnitt 8, Punkt 2, und Abschnitt 9.
- Kommentarzeilen mit einer Stelle: 2 (`balkon-terrasse.ts:60`, `fliesen.ts:24`). Kein sichtbarer Text, unverändert.
- Ersetzt wird nur das Leerzeichen zwischen Zahl und Einheit. Sonst nichts geändert.

## 2. Zählung je Datei

| Datei | sichtbar gesamt | gesetzt (Escape `\u00A0`) | offen (nicht gesetzt) | nur Kommentar |
|---|---|---|---|---|
| bad.ts | 1 | 1 | 0 | 0 |
| bad-badsanierung.ts | 0 | 0 | 0 | 0 |
| balkon-terrasse.ts | 4 | 4 | 0 | 1 |
| barrierefreies-bad.ts | 2 | 2 | 0 | 0 |
| blog.ts | 0 | 0 | 0 | 0 |
| fliesen.ts | 0 | 0 | 0 | 1 |
| galerie.ts | 0 | 0 | 0 | 0 |
| kontakt.ts | 0 | 0 | 0 | 0 |
| leistungen.ts | 0 | 0 | 0 | 0 |
| orte.ts | 1 | 0 | 1 | 0 |
| referenzen.ts | 0 | 0 | 0 | 0 |
| start.ts | 0 | 0 | 0 | 0 |
| ueber-uns.ts | 0 | 0 | 0 | 0 |
| **Summe** | **8** | **7** | **1** | **2** |

Davon neu gesetzt in dieser Arbeit: 4 (`bad.ts` 1, `balkon-terrasse.ts` 1, `barrierefreies-bad.ts` 2). Vorhanden, jetzt als Escape: 3 (`balkon-terrasse.ts` Zeilen 84, 95, 114).

Stellen im Einzelnen:

- `src/inhalte/bad.ts:79`: „4.180\u00A0€“ (neu).
- `src/inhalte/balkon-terrasse.ts:50`: „2\u00A0%“ (neu).
- `src/inhalte/balkon-terrasse.ts:84`, `:95`, `:114`: „2\u00A0cm“ (vorhanden, jetzt Escape).
- `src/inhalte/barrierefreies-bad.ts:55`: „4.180\u00A0€“ und „8.360\u00A0€“ (neu).
- `src/inhalte/orte.ts:27`: „etwa ${kmAbSitz} km“ (offen, siehe Abschnitt 8, Punkt 2).

## 3. Wortlaut-Vergleich

Prüfskript: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/nbsp/werkzeug/wortlaut.cjs` (Aufruf: `node …/werkzeug/wortlaut.cjs …/nbsp/baum …/nbsp/vor`). Es prüft alle 13 Dateien auf zwei Arten:

1. Quelltext: Escape `\u00A0` und rohes U+00A0 durch ein Leerzeichen ersetzt, dann Zeichen für Zeichen gleich wie `vor`.
2. Laufzeitwerte (TypeScript-AST, alle Zeichenketten inklusive Template-Teile): gleich in Anzahl und Reihenfolge; nach Abbildung U+00A0 auf Leerzeichen gleich; Rohunterschiede nur dort, wo `baum` U+00A0 hat und `vor` ein Leerzeichen.

Ergebnis: 13 von 13 Dateien bestanden, Fehler 0. Ausgabe:

`Dateien geprüft: 13; Escapes gesamt: 7; NBSP in Werten vor: 3, baum: 7; Rohunterschiede gesamt: 3; Fehler: 0`

Die Rohunterschiede liegen in drei Werten (`bad.ts`, `balkon-terrasse.ts`, `barrierefreies-bad.ts`) und umfassen genau die vier neuen Stellen. Die drei vorhandenen Stellen in `balkon-terrasse.ts` sind in beiden Fassungen gleich.

Hinweis: Der erste Prüflauf verglich die Rohwerte und meldete die neuen Stellen zu Unrecht als Fehler. Die Prüfung ist korrigiert; an den Dateien wurde dafür nichts geändert.

## 4. Liste src/config/* (nur gemeldet, nicht geändert)

Treffer: 107 (105 sichtbarer Text, 2 Kommentar). Kein Treffer in `src/config/reviews.js`. Format: Datei, Zeile, Ausschnitt (Zeile gekürzt auf 140 Zeichen um die Stelle).

- `src/config/glossar.ts:115` — „erklaerung: "Große Fliesen, zum Beispiel 120 × 260 cm. Es gibt dann weniger Fugen.",“
- `src/config/glossar.ts:116` — „klammer: "große Fliesen, zum Beispiel 120 × 260 cm; es gibt dann weniger Fugen",“
- `src/config/musterbaeder.js:4` (Kommentar) — „…Complete 12-variant catalogue across 4 room sizes (4.6, 7.0, 8.2, 15.9 m²) and 3 tiers (Basic, Premium, Luxus)“
- `src/config/musterbaeder.js:20` — „"Design-Badheizkörper 177 × 60 cm (RAL 9016)",“
- `src/config/musterbaeder.js:22` — „"Stahl-Duschwanne 90 × 90 cm mit Eckeinstieg aus Sicherheitsglas",“
- `src/config/musterbaeder.js:30` — „"Stahl-Duschwanne 90 × 90 × 3,2 cm mit Wannenträger, weiß, inkl. Ablaufgarnitur mit Siphon und Abdeck…“
- `src/config/musterbaeder.js:31` — „"Eckeinstieg aus 2 Schiebetür-Hälften 87–89 × 200 cm, Einscheibensicherheitsglas (ESG) mit Abperl-Beschichtung, Profile…“
- `src/config/musterbaeder.js:32` — „…ühles Armaturengehäuse), verchromt, inkl. Brausegarnitur mit Stange 90 cm, Schlauch und 3-fach verstellbarer Handbrause"“
- `src/config/musterbaeder.js:38` — „"Keramik-Waschtisch 65 × 48 cm, weiß mit pflegeleichter Glasur, Halbsäule weiß sowie Röhrensiphon…“
- `src/config/musterbaeder.js:40` — „"LED-Lichtspiegel 65 × 80 cm, 4-seitig umlaufende Beleuchtung (3 cm) und hinterleuchtet, 4.000…“
- `src/config/musterbaeder.js:40` — „…"LED-Lichtspiegel 65 × 80 cm, 4-seitig umlaufende Beleuchtung (3 cm) und hinterleuchtet, 4.000 Kelvin"“
- `src/config/musterbaeder.js:47` — „"Vorwandelement mit Unterputz-Spülkasten (112 cm) und Betätigungsplatte seidenmatt für 2-Mengen-Spülung"“
- `src/config/musterbaeder.js:53` — „"Design-Badheizkörper 177 × 60 cm (RAL 9016)"“
- `src/config/musterbaeder.js:60` — „"Handtuchhalter 45 cm, starr, und Flüssigseifenspender mit Glasbehälter, verchromt"“
- `src/config/musterbaeder.js:75` — „"Stahl-Körperform-Badewanne 170 × 75 cm",“
- `src/config/musterbaeder.js:76` — „"Stahl-Duschwanne 120 × 90 cm mit Glas-Duschabtrennung",“
- `src/config/musterbaeder.js:79` — „"Design-Badheizkörper 140 × 60 cm"“
- `src/config/musterbaeder.js:85` — „"Stahl-Körperform-Badewanne 170 × 75 cm, weiß, inkl. Wannenträger sowie Ab- und Überlaufgarnitur",“
- `src/config/musterbaeder.js:92` — „"Stahl-Duschwanne 120 × 90 × 3,5 cm, Ablauf mittig an der kurzen Seite, weiß, inkl. Wannenträger und A…“
- `src/config/musterbaeder.js:93` — „…sethermostat mit Sicherheitsablage, inkl. Brausegarnitur mit Stange 90 cm, Schlauch und 3-fach verstellbarer Handbrause, verchromt",“
- `src/config/musterbaeder.js:94` — „…"Duschabtrennung aus zweiteiliger Seitenwand 90 × 195 cm und Pendeltür mit Festfeld links, Profile silber matt, ESG klar mi…“
- `src/config/musterbaeder.js:100` — „…neralguss-Waschtisch in Alpinweiß und Waschtischunterschrank 82 × 51,5 cm in Weiß Hochglanz inkl. Eckventil",“
- `src/config/musterbaeder.js:108` — „…"Vorwandelement für den Trockenbau mit Unterputz-Spülkasten (112 cm) und Betätigungsplatte seidenmatt für 2-Mengen-Spülung"“
- `src/config/musterbaeder.js:114` — „"Design-Badheizkörper 140 × 60 cm (RAL 9016)"“
- `src/config/musterbaeder.js:131` — „"Duschbereich mit ESG-Glasseitenwand 120 × 200 cm",“
- `src/config/musterbaeder.js:139` — „"Stahl-Duschwanne 120 × 90 × 3,5 cm, weiß, mit Ablaufgarnitur und verchromter Abdeckung",“
- `src/config/musterbaeder.js:140` — „…vierungsset mit Aufputz-Brausethermostat und Brausegarnitur (Stange 90 cm, 3-fach verstellbare Handbrause)",“
- `src/config/musterbaeder.js:141` — „"Glas-Seitenwand 120 × 200 cm, Profile silber Hochglanz, ESG klar"“
- `src/config/musterbaeder.js:147` — „…neralguss-Waschtisch in Alpinweiß und Waschtischunterschrank 82 × 51,5 cm in Anthrazit Hochglanz mit Siphon und Eckventil",“
- `src/config/musterbaeder.js:149` — „…"2 Hochschränke in Anthrazit Hochglanz, 30 × 32 × 160 cm"“
- `src/config/musterbaeder.js:156` — „…"Vorwandelement mit Unterputz-Spülkasten, Bauhöhe 112 cm",“
- `src/config/musterbaeder.js:163` — „"Design-Badheizkörper 176,4 × 60 cm (RAL 9016)"“
- `src/config/musterbaeder.js:184` — „"Stahl-Mittelablauf-Badewanne 180 × 80 cm mit Design-Wannenarmatur",“
- `src/config/musterbaeder.js:185` — „"Rutschhemmende Mineralguss-Duschwanne 120 × 100 cm mit Nischen-Schwenktür",“
- `src/config/musterbaeder.js:186` — „"Möbelwaschtisch-Set 140 cm in Metallic-Braun mit großem Wandspiegel",“
- `src/config/musterbaeder.js:188` — „"Badheizkörper 180 × 60 cm (RAL 9016)"“
- `src/config/musterbaeder.js:194` — „"Stahl-Mittelablauf-Badewanne 180 × 80 cm, weiß, mit Wannenträger sowie Ab- und Überlaufgarnitur mit verchro…“
- `src/config/musterbaeder.js:202` — „…Mineralguss-Duschwanne mit rutschhemmender Oberfläche, 120 × 100 × 3,2 cm, weiß, mit Ablaufgarnitur und Abdeckung",“
- `src/config/musterbaeder.js:203` — „…"Schwenktür für Nischeneinbau, Anschlag rechts, 100 × 195 cm, Profile chrom/Alu Hochglanz, ESG klar",“
- `src/config/musterbaeder.js:204` — „…"Design-Aufputz-Brausearmatur (Einhebel) mit Brausestangen-Set 60 cm, chrom"“
- `src/config/musterbaeder.js:210` — „…"Möbelwaschtisch-Set aus Waschtisch und Unterschrank 140 cm in Metallic-Braun, mit Röhrensiphon und Eckventil",“
- `src/config/musterbaeder.js:212` — „"Wandspiegel 140 × 72,5 cm mit Rahmen passend in Metallic-Braun"“
- `src/config/musterbaeder.js:219` — „"Vorwandelement mit Unterputz-Spülkasten (112 cm) und Betätigungsplatte seidenmatt"“
- `src/config/musterbaeder.js:225` — „"Badheizkörper 180 × 60 cm, weiß (RAL 9016)"“
- `src/config/musterbaeder.js:250` — „"Barrierefreies Fünfeck-Duschelement 90 cm mit teilgerahmter Glasabtrennung",“
- `src/config/musterbaeder.js:251` — „"Asymmetrischer Waschtisch 100 cm mit Edelstahl-Armatur (gebürstet)",“
- `src/config/musterbaeder.js:252` — „"4-seitig hinterleuchteter LED-Lichtspiegel 100 × 80 cm",“
- `src/config/musterbaeder.js:254` — „"Design-Badheizkörper 175,4 × 50 cm (RAL 9016)"“
- `src/config/musterbaeder.js:260` — „"Fünfeck-Duschelement 90 cm, rollstuhlbefahrbar, Ablauf waagerecht",“
- `src/config/musterbaeder.js:262` — „"Teilgerahmte Fünfeck-Duschabtrennung 90 × 200 cm, 2-teilig mit Festfeld, Profile silber Hochglanz, ESG mit Abperl-B…“
- `src/config/musterbaeder.js:268` — „…ischer Mineralguss-Waschtisch mit Waschtischunterschrank 57 × 48 × 100 cm in Weiß Hochglanz, mit Eckventil und Siphon",“
- `src/config/musterbaeder.js:270` — „"LED-Lichtspiegel 100 × 80 cm, 4-seitig hinterleuchtet"“
- `src/config/musterbaeder.js:276` — „"Kompakt-Wand-Tiefspül-WC (Ausladung 48 cm), weiß mit pflegeleichter Glasur, WC-Sitz mit Absenkautomatik und…“
- `src/config/musterbaeder.js:283` — „"Design-Badheizkörper 175,4 × 50 cm (RAL 9016)"“
- `src/config/musterbaeder.js:304` — „"Waschtischanlage 100 cm mit LED-Lichtspiegel und Touch-Bedienung",“
- `src/config/musterbaeder.js:314` — „…he Walk-In-Dusche mit Edelstahl-Designrinne und Festglaswand 100 × 200 cm",“
- `src/config/musterbaeder.js:321` — „"Möbelwaschtisch 100 cm mit Softclose-Schubladen, Front samtweiß lackiert",“
- `src/config/musterbaeder.js:345` — „"Möbelwaschtisch 120 cm mit samtweißer Front",“
- `src/config/musterbaeder.js:346` — „"LED-Lichtspiegel 120 × 75 cm mit Lichtband und Dimmfunktion",“
- `src/config/musterbaeder.js:355` — „…"Edelstahl-Duschrinne mit Walk-In-Glaswand 120 × 200 cm",“
- `src/config/musterbaeder.js:356` — „"Duschthermostat mit Regen-Kopfbrause (Ø 25 cm) und 2-strahliger Handbrause"“
- `src/config/musterbaeder.js:362` — „"Waschtischanlage 120 cm mit Doppel-Schublade und Mineralguss-Becken",“
- `src/config/musterbaeder.js:364` — „"LED-Lichtspiegel 120 cm mit stufenlos einstellbarer Lichtfarbe"“
- `src/config/musterbaeder.js:371` — „"Vorwandelement 112 cm mit Unterputz-Spülkasten und Glas-Betätigungsplatte"“
- `src/config/musterbaeder.js:377` — „"Drehbarer Design-Badheizkörper 175,4 × 60 cm",“
- `src/config/musterbaeder.js:393` — „"Möbel-Doppelwaschtisch 140 cm mit pflegeleichter Oberfläche & LED-Lichtspiegel (2.700–6.500 K)",“
- `src/config/musterbaeder.js:394` — „"Große Stahl-Badewanne 190 × 90 cm mit Wannenfüllung über den Überlauf",“
- `src/config/musterbaeder.js:395` — „"Bodengleiche Walk-In-Dusche mit Edelstahl-Duschrinne 100 cm",“
- `src/config/musterbaeder.js:396` — „"LED-Kopfbrause Ø 30 cm mit Nachtropf-Stopp",“
- `src/config/musterbaeder.js:397` — „"Drehbarer Design-Badheizkörper 175,4 × 75 cm"“
- `src/config/musterbaeder.js:403` — „"Stahl-Badewanne 190 × 90 cm, Mittelablauf, weiß, mit Wannenträger und Ab- und Überlaufgarnitur…“
- `src/config/musterbaeder.js:410` — „"Edelstahl-Duschrinne 100 cm mit Designrost",“
- `src/config/musterbaeder.js:411` — „"Thermostat-Duschsystem mit LED-Kopfbrause Ø 30 cm (Nachtropf-Stopp), Design-Brauseschlauch verchromt und 2-strahlige…“
- `src/config/musterbaeder.js:411` — „…opp), Design-Brauseschlauch verchromt und 2-strahliger Handbrause Ø 12 cm",“
- `src/config/musterbaeder.js:419` — „"Mineralguss-Möbel-Doppelwaschtisch 140 × 49 cm, weiß mit pflegeleichter Oberfläche, inkl. Eckventilen",“
- `src/config/musterbaeder.js:420` — „"Waschtischunterschrank 56,6 × 50 × 140 cm, samtweiß matt",“
- `src/config/musterbaeder.js:422` — „"LED-Lichtspiegel 140 × 75 cm mit Lichtband oben und einstellbarer Lichtfarbe 2.700–6.500 K (war…“
- `src/config/musterbaeder.js:429` — „"Vorwandelement mit Unterputz-Spülkasten (112 cm)",“
- `src/config/musterbaeder.js:436` — „"Drehbarer Design-Badheizkörper 175,4 × 75 cm (RAL 9016)"“
- `src/config/musterbaeder.js:443` — „"Handtuchhalter 1-armig, starr (48 cm), und Wand-Seifenspender mit weißer Keramik, verchromt"“
- `src/config/musterbaeder.js:473` — „…"Rahmenlose Glasfront aus Einscheibensicherheitsglas (100 × 210 cm) mit Abperl-Beschichtung",“
- `src/config/musterbaeder.js:513` — „"Doppelwaschtischanlage 120 cm samtweiß mit LED-Ambientebeleuchtung",“
- `src/config/musterbaeder.js:529` — „"Rahmenlose Glasabtrennung 120 × 205 cm"“
- `src/config/musterbaeder.js:535` — „"Doppelbecken-Möbelanlage 120 cm mit Softclose-Auszügen und matter Oberfläche",“
- `src/config/musterbaeder.js:561` — „"Design-Waschtisch 140 cm in Mattlack mit LED-Schattenfuge",“
- `src/config/musterbaeder.js:575` — „…"Bodengleiche Walk-In-Duschzone mit Decken-Regenhimmel 40 × 40 cm",“
- `src/config/musterbaeder.js:576` — „"Rahmenlose Echtglaswand 140 cm mit Abperl-Beschichtung"“
- `src/config/musterbaeder.js:582` — „"Design-Doppelwaschtisch 140 cm in samtmatten Lackfarben mit Push-to-Open-Auszügen",“
- `src/config/musterbaeder.js:622` — „"Rahmenlose Echtglas-Abtrennung 140 × 210 cm"“
- `src/config/navigation.js:164` — „{ name: 'Bad in 2 Minuten beschreiben', path: '/bad/projekt-check' },“
- `src/config/posts/barrierefreier-balkonaustritt.js:30` — „- Die Abdichtung wird an Türen **in der Regel mindestens 15 cm über die Oberfläche des Belags** hochgeführt.“
- `src/config/posts/barrierefreier-balkonaustritt.js:31` — „- Die Anschlusshöhe darf auf **mindestens 5 cm reduziert** werden, wenn unmittelbar vor der Tür eine dauerhaft fu…“
- `src/config/posts/barrierefreier-balkonaustritt.js:38` — „…n werden. Sind sie **technisch unabdingbar**, dürfen sie **höchstens 2 cm** hoch sein.“
- `src/config/posts/barrierefreier-balkonaustritt.js:44` — „\| Regelanschluss Abdichtung \| in der Regel ca. 15 cm über Belag \|“
- `src/config/posts/barrierefreier-balkonaustritt.js:45` — „\| Reduzierter Anschluss \| ca. 5 cm, mit Entwässerungsrinne direkt vor der Tür \|“
- `src/config/posts/barrierefreier-balkonaustritt.js:46` — „…ierefreiheit (DIN 18040-2) \| keine Schwelle, falls unvermeidbar max. 2 cm \|“
- `src/config/posts/barrierefreier-balkonaustritt.js:77` — „…ne Frage des Belags allein. Die Fachregeln sehen normalerweise rund 15 cm Anschlusshöhe vor, mit Entwässerungsrinne direkt vor der Tür sind…“
- `src/config/posts/barrierefreier-balkonaustritt.js:77` — „…schlusshöhe vor, mit Entwässerungsrinne direkt vor der Tür sind etwa 5 cm möglich, niveaugleiche Übergänge sind eine gesondert zu planende S…“
- `src/config/posts/feinsteinzeug-oder-naturstein-vergleich.js:25` (Kommentar) — „…is ist ein dichter Scherben mit einer Wasseraufnahme von höchstens 0,5 % (Gruppe BIa nach DIN EN 14411). Oberfläche und Farbe werden industr…“
- `src/config/posts/handwerkerbonus-fliesenarbeiten.js:33` — „- **20 %** der begünstigten Aufwendungen“
- `src/config/posts/handwerkerbonus-fliesenarbeiten.js:34` — „- **höchstens 1.200 € Steuerermäßigung pro Jahr** und Haushalt“
- `src/config/posts/handwerkerbonus-fliesenarbeiten.js:35` — „- Der Höchstbetrag ist damit bei 6.000 € begünstigten Arbeitskosten im Jahr ausgeschöpft“
- `src/config/posts/handwerkerbonus-fliesenarbeiten.js:90` — „…EStG macht Fliesenarbeiten im bewohnten Zuhause spürbar günstiger: 20 % der Arbeits-, Fahrt- und Maschinenkosten inklusive Umsatzsteuer, bi…“
- `src/config/posts/handwerkerbonus-fliesenarbeiten.js:90` — „…eits-, Fahrt- und Maschinenkosten inklusive Umsatzsteuer, bis zu 1.200 € Steuerermäßigung pro Jahr. Entscheidend sind eine Rechnung mit ausg…“
- `src/config/services.js:23` — „"Fugenarme XXL-Fliesen (bis 120 x 278 cm) für edle, monolithische Optik",“
- `src/config/services.js:83` — „{ id: "stelzlager", name: "20 mm Platten auf Stelzlagern", path: "/balkon-terrasse/stelzlager", ico…“
- `src/config/services.js:91` — „"Normgerechte Gefälleherstellung (mind. 1,5 bis 2 %) vom Gebäude weg",“

## 5. Prüfzahlen (Nachlauf nach der Gegenprüfung)

- `npm test`: 258 bestanden, 0 fehlgeschlagen, 0 übersprungen, Exit 0. Log: `…/nbsp/werkzeug/npmtest.log`.
- `npx eslint` gesamt: Exit 0 (`…/nbsp/werkzeug/eslint-gesamt.log`). Die drei geänderten Dateien: Exit 0 (`…/nbsp/werkzeug/eslint.log`).
- `npx tsc --noEmit`: Exit 0, keine Ausgabe (`…/nbsp/werkzeug/tsc.log`). `next-env.d.ts` wurde dafür vorübergehend angelegt und danach entfernt.
- `next build` in diesem Lauf nicht erneut ausgeführt. Begründung: Die Laufzeitwerte sind dieselben wie in der gebauten Fassung, denn die gebaute Fassung hatte rohes U+00A0 an denselben Stellen und der Escape ergibt dasselbe Zeichen (Abschnitt 3, NBSP in Werten baum: 7). Die Bildschirmfotos aus Abschnitt 6 gelten weiter.
- Zum Vergleich, Lauf 1 (vor der Gegenprüfung): `npm test` 258/0, eslint 0, tsc 0, `next build` 0 (179 statische Seiten).

## 6. Bildschirmfotos (m390, 390 × 844, DPR 1, de-DE, Europe/Berlin, 200 % Schrift, `installSperre`, Einwilligung „abgelehnt“)

Schriftgröße gemessen: 32 px (200 %). Kein horizontaler Überlauf auf m390. Die Prüfung misst Zahl und Einheit über ein Range-Rechteck: liegt das Paar in einer Zeile, ist das Rechteck eine Zeile hoch.

| Seite | Stelle | Fundort | Gesetzt | Zeilen | Bild |
|---|---|---|---|---|---|
| /balkon-terrasse | „2 cm starke Platten aus Feinsteinzeug …“ | `src/inhalte/balkon-terrasse.ts:84` | ja (vorhanden) | 1 | `…/nbsp/bilder/balkon-terrasse-2cm-platten.png` |
| /balkon-terrasse | „von mindestens 1,5 bis 2 %.“ | `src/inhalte/balkon-terrasse.ts:50` | ja (neu) | 1 | `…/nbsp/bilder/balkon-terrasse-2-prozent.png` |
| /bad/badsanierung | „120 × 260 cm“ (Glossar) | `src/config/glossar.ts:115` | nein (config) | 1 | `…/nbsp/bilder/bad-badsanierung-260cm-glossar.png` |

Auf /bad/badsanierung gibt es keine Stelle aus den 13 Inhaltsdateien. Die einzige sichtbare Zahl-Einheit-Stelle dort kommt aus `src/config/glossar.ts` und hat ein normales Leerzeichen. In dieser Breite brach sie nicht um, geschützt ist sie aber nicht.

## 7. Aufräumen

- Server auf Port 4440 gestoppt. Gestoppt wurde die Prozessgruppe 10039, die den Listener (PID 10052) enthält. Die PID-Datei enthielt 10038, den `setsid`-Wrapper. Die Server auf 4324, 4325, 4450 und 4451 gehören anderen Läufen und sind unberührt.
- `.next` gelöscht. Kopie `node_modules` gelöscht. Verweis `node_modules` → `/home/user/tezgel/node_modules` wiederhergestellt (der echte Ordner des Repos ist unverändert, 384 Einträge). `next-env.d.ts` entfernt.
- `/home/user/tezgel` nur gelesen, nichts geschrieben.
- Nachlauf: keine neue Kopie, kein Server, kein `.next`. `next-env.d.ts` für `tsc` vorübergehend angelegt und wieder entfernt. `node_modules` in der Arbeitskopie ist weiterhin der Verweis auf `/home/user/tezgel/node_modules`.

## 8. Offene Fragen an den Orchestrator

1. **Zählgrundlage „101“ nicht reproduzierbar.** Lauf 1: Eine Ziffernsuche in `src/` (ohne `src/inhalte/meta/`) ergab 386 Treffer, davon 303 sichtbar und 83 Kommentar. Aufgeteilt: 13 Inhaltsdateien 7 sichtbar und 2 Kommentar; `src/config/*` 107 (105 sichtbar, 2 Kommentar); Rest von `src/` 270 (191 sichtbar, 79 Kommentar). Mit `orte.ts:27` steigt die Ziffernsuche auf 387 (304 sichtbar, 83 Kommentar). Dazu kommen Ausdrucksstellen, die die Ziffernsuche nicht erfasst (`${…}` mit Einheit): 72 Zeilen in `src/`, davon 1 in den Inhaltsdateien (`orte.ts:27`), 0 in `src/config/*` und 71 außerhalb des Pakets (Komponenten, App-Seiten, E-Mail-Vorlagen, Formularlogik). Liste: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/nbsp/werkzeug/ausdruckstellen-src.txt`. Bitte die Zählgrundlage der PLAN-Zahl 101 bestätigen und entscheiden, ob die 71 Stellen außerhalb des Pakets in den Plan gehören.
2. **`src/inhalte/orte.ts:27` nicht gesetzt. Entscheidung nötig.** Die Stelle `etwa ${kmAbSitz} km bis ${name}.` steht im Ortssatz. Er wird über `mitFugen(ort)` in `src/components/vorlagen/teile/Einstieg.tsx:85-86` sichtbar. Sie zählt als Stelle (Zahl und Einheit). Gesetzt würde sie als `${kmAbSitz}\u00A0km`. Dann bricht `test/orte.test.mjs:59`: Der Helfer `re()` escapiert den Text und sucht ein normales Leerzeichen. Geprüft mit Node: „etwa 25 km bis Gießen.“ trifft, die Form mit U+00A0 trifft nicht. Die Testdatei ist laut Briefing nicht Teil des Pakets (keine Tests), daher unverändert. Optionen: (a) Orchestrator setzt `orte.ts:27` und passt `test/orte.test.mjs:59` auf die Form mit `\u00A0` an; (b) die Stelle bleibt bewusst ohne Schutz und wird als Ausnahme festgehalten. Zählung bis dahin: 8 sichtbar, 7 gesetzt, 1 offen.
3. **`src/config/*` ungeändert.** Die 107 Treffer stehen in Abschnitt 4 (nur gemeldet). Die Ausdruckssuche findet dort keine weitere Stelle. Betroffen sind u. a. `/bad/badsanierung` (Glossar) und die Navigation „Bad in 2 Minuten beschreiben“ (`src/config/navigation.js:164`).
4. **Kommentarzeilen ungeändert.** `src/inhalte/balkon-terrasse.ts:60` und `src/inhalte/fliesen.ts:24` enthalten Stellen nur im Kommentar. Bitte bestätigen, dass Kommentare nicht geändert werden sollen.
5. **Build-Vorgabe angepasst.** Die Kopie für Turbopack muss `node_modules` heißen, nicht `node_modules_echt`. Die Briefing-Angabe bitte entsprechend ändern.
6. **Schreibweise des Escapes.** Das Briefing schreibt „als Escape“ und setzt zwischen die Backticks ein rohes Zeichen. Umgesetzt als `\u00A0`, wie in der Repo-Konvention (z. B. `src/components/locations/RouteVisualization.tsx:33`). Bitte bestätigen.

## 9. Nachlauf: Befunde der Gegenprüfung

| Befund | Schwere | Prüfung | Ergebnis |
|---|---|---|---|
| `src/inhalte/orte.ts:27`: Zahl und Einheit (`${kmAbSitz} km`) nicht gezählt und nicht gesetzt | mittel | Bestätigt. Die Stelle ist sichtbar. Setzen bricht `test/orte.test.mjs:59` (Node-Prüfung des Helfers `re()`, Abschnitt 8, Punkt 2). Gegenprobe über alle Einheiten: außer dieser Stelle keine weitere sichtbare Stelle in den 13 Inhaltsdateien. | Nicht behoben. Behebung nur mit Änderung an einer Testzeile, und Tests gehören nicht zum Paket. Entscheidung beim Orchestrator (Abschnitt 8, Punkt 2). |
| Vier neue Stellen als rohes U+00A0 statt Escape; im Diff sind die Zeilen -/+ nicht zu unterscheiden | gering | Bestätigt. Das Briefing verlangt einen Escape. Die drei vorhandenen Stellen in `balkon-terrasse.ts` (84, 95, 114) sind von derselben Art. | Behoben. Alle sieben Stellen sind `\u00A0` (Abschnitt 3 bestätigt den Wortlaut). |

Gegenprobe nach der Umstellung (`…/nbsp/werkzeug/suche2.py baum`): 8 Treffer. Davon 2 Kommentar (`balkon-terrasse.ts:60`, `fliesen.ts:24`), 1 offen (`orte.ts:27`) und 5 Fehltreffer (Kennungen wie `v3 K-009` in Kopfkommentaren; `index % 2` in `orte.ts:34`). Vor der Umstellung: 15 Treffer, davon 7 gesetzt.

Der Diff wurde neu erzeugt. Geändert sind `bad.ts`, `balkon-terrasse.ts` und `barrierefreies-bad.ts`, insgesamt sechs Zeilen. Die Zählung in Abschnitt 2 gilt für diesen Stand.
