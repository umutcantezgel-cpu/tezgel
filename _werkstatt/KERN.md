# KERN · Lauf „Universal Motion“ · Version 4.4

Stand 27.10.2026, E1 (E-066, E-067; 4.0.1 nach L0: Adresszahl 202 statt 170, E-068; 4.0.2: K-009 nach UM-E2-SVGO, E-069; 4.1: K-005 Farben, Dauern und Kurven v4 und K-009 eine Icon-Familie nach UM-E3-DS und UM-E3-SVG, E-075; 4.2: Bewegungsschalter und Takt nach UM-E3-MOD, E-080; 4.3: Eingang ohne Vorhang nach UM-E3-EIN, E-081; 4.4: Cursor, Scrollen, Leitfaden und Register v4 nach UM-E3-W3, E-084). Quelle der Wahrheit für alle Pakete. Hervorgegangen aus KERN v3.6 des Vorlaufs „Verständlich, echt, ausgezeichnet“: Werte, Bausteine und Entscheidungen von v3.6 gelten weiter, soweit dieser Kern sie nicht ändert. Die alten Kennungen bleiben über die Brückentabelle am Ende gültig, damit Verweise im Code nicht ins Leere laufen. Über dem Kern stehen Grenzen und Leitplanken, Bestand, Zugänglichkeit und Leistung und die Abnahmeliste (AUFTRAG.md Abschnitt 4). **[A]** = Annahme (offen in MENSCHEN.md). Jedes Paket nennt die Kern-Version, gegen die es gebaut wurde.

## Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js, React und Tailwind 4 gebaut, wird über Vercel ausgeliefert und steht nach diesem Lauf auf dem neuesten stabilen Stand ihres Stacks.
2. Die Seite hat 202 Adressen – 168 Seiten, 2 Weiterleitungen und 32 dauerhaft entfernte –: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Prüfstein bleibt eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will: Sie versteht jede Seite ohne Hilfe, und jede Bewegung ist für sie verständlich, abschaltbar und nie im Weg.
4. Die Leitidee „Klar verlegt“ trägt den Seitenwechsel Fliese für Fliese, den Eingang an der Schnur, die rote Laserlinie als Leitfaden und das Fugenkreuz als Cursor; echte Fotos zeigen die Arbeit.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## K-001 Leitidee
**Klar verlegt: Jede Seite legt dem Kunden eine Sache nach der anderen hin, Fliese für Fliese, im festen Fugenraster und an einer geraden Linie, bis das Ganze fertig daliegt wie ein Boden von Deniz Tezgel.**
- Herleitung: Der Anlass des Laufs ist Unverständlichkeit. Ein Fliesenleger schafft Ordnung, indem er eins nach dem anderen legt, im Verband, an einer Schnur oder Laserlinie, und am Ende sieht jeder sofort, ob es stimmt. Genau das braucht der Kunde: eine Sache je Schritt, in fester Reihenfolge, mit einer Linie, die führt. „Klar verlegt“ heißt gleichzeitig sauber gearbeitet und verständlich dargelegt.
- Folgen für jede Entscheidung: ein Gedanke je Block (eine Fliese); feste Reihenfolge nach der Seitenformel (Verband); Abstände aus Fliese und Fuge (Fugenraster); genau ein Versatz je Bildschirm als bewusster Bruch (Drittelverband); eine Laserlinie, die führt (Orientierung); Bewegung legt Dinge an ihren Platz und federt nie nach (Gummihammer); das Ergebnis zeigt sich in echten Fotos (fertig daliegen).
- Austauschprobe: Eine Bäckerei hat keinen Verband, keine Fuge, kein Gefälle und keine Laserlinie; ein Steuerbüro legt keine Fliesen. Seitenwechsel „Verlegen“, Intro „Logo zeichnet sich“, Schichtaufbau, Gefälle und Verlegemuster bestehen die Probe einzeln (Register K-007).
- Signatur-Satz aus derselben Leitidee: K-007 (E-067-1).

## K-002 Marke, Zielgruppe und fünf Hauptaufgaben
- Marke: Fliesenverlegung Tezgel, Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar; eingetragen bei der Handwerkskammer Wiesbaden seit 2008 (K-015). Gefühl: ruhige Sorgfalt, ehrliches Handwerk, persönlich.
- Personen für Probeläufe (Auftrag Abschnitt 6), mit Ort für A6 und Standardgerät:
  - P1 Rentnerin, 72, will die Wanne durch eine bodengleiche Dusche ersetzen · Solms · m390 mit Systemschrift 200 %.
  - P2 junge Familie im Neubau, ganzes Haus fliesen · Gießen · t768.
  - P3 Vermieter, einzelne gesprungene Fliese und alte Fugen im Flur · Herborn · m360.
  - P4 Hausbesitzer, auf dessen Balkon Wasser steht · Braunfels · d1280.
  - P5 Kunde mit Deutsch als Zweitsprache, will einfach einen Termin · Limburg · m390.
  - Jede Person läuft zusätzlich in der anderen Gerätegruppe (mobil ↔ d1440).
- Zielgruppe (abgeleitet, [A]): vor allem ältere Eigentümerinnen und Eigentümer im Umkreis von Wetzlar, die einen verlässlichen Handwerker für einen Termin vor Ort suchen; daneben Familien im Neubau, Vermieter und Hausverwaltungen.
- Fünf Hauptaufgaben (v4; die sechs Aufgaben des Vorlaufs sind zusammengelegt, `probelauf.mjs` zählt A6 weiter als Teil von A1): A1 in einem Satz sagen, was der Betrieb macht und ob er im eigenen Ort arbeitet (alt A1 und A6) · A2 Telefon oder WhatsApp finden · A3 einen Termin vor Ort anfragen, bis vor den Absendeknopf · A4 Bilder fertiger Arbeiten zur eigenen Lage finden · A5 verstehen, wie der Ablauf ist und ob der Termin vor Ort etwas kostet.
- Werkzeug: `_werkstatt/werkzeuge/probelauf.mjs`, Protokoll `werkzeuge/PROBELAUF.md`. Hauptansichten: `HAUPTANSICHTEN.json` (fest seit E0).

## K-003 Gestaltungsprinzipien
1. **Eine Fliese, ein Gedanke.** *Tun:* jeder Block trägt eine Aussage; jede Seite hat genau einen Hauptknopf; kurze Sätze, konkrete Dinge. *Lassen:* Sammelkarten mit drei Botschaften, Werbezeilen, Etiketten über jeder Überschrift.
2. **Erst die Lage, dann die Lösung.** *Tun:* Seiten beginnen bei der Situation des Kunden und folgen der Seitenformel (K-009). *Lassen:* Leistungskataloge als Einstieg, Fachbegriffe vor dem Nutzen.
3. **Echt zeigen.** *Tun:* echte Fotos als Hauptbild jeder Erzählseite; Zeichnungen erklären, was ein Foto nicht zeigen kann (Schichtaufbau, Gefälle, Verband). *Lassen:* generierte oder fremde Bilder, Symbolfotos, Text auf Bildern, Bildfilter.
4. **Fugenraster mit Versatz.** *Tun:* Abstände und Größen aus der Fliesenskala (K-005); Flächen stoßen mit einer Fuge aneinander; je Bildschirmhöhe genau ein Versatz um ein Drittel (Drittelverband) als bewusster Bruch. *Lassen:* freie Abstände, schwebende Karten mit Schatten, gleichförmige Kartenraster, drei gleich gebaute Abschnitte in Folge.
5. **Eine Linie führt.** *Tun:* die rote Laserlinie trennt, führt und markiert den aktuellen Ort (Navigation, Fortschritt, Schrittfolge); Rot sonst nur für Fehler. Der Hauptknopf ist eine tintendunkle Fläche. *Lassen:* rote Flächen, Verläufe, Leuchteffekte, Orange außerhalb des Logos.
6. **Bewegung legt, nie schwebt.** *Tun:* Dinge kommen kurz und fest an ihren Platz wie eine Fliese unter dem Gummihammer; jede Bewegung hat einen Zweck aus dem Register. *Lassen:* Federn, Schweben, Endlosschleifen, hochzählende Zahlen, Nachlauf-Cursor.
7. **Ruhige Hand auf Arbeitsseiten.** *Tun:* Formulare dicht, beschriftet, mit allen Zuständen; ein Weg je Aufgabe; nur Rückmeldung und Zustandswechsel. *Lassen:* Inszenierung, mehrere Formulare im selben Bildschirm.
8. **Ruhe als Haltung** (alt K-016, E-047, Wunsch des Auftraggebers nach der Durchsicht der Live-Seite): siehe die Regeln unten. *Tun:* zwischen den Höhepunkten Stille; ein Dauermotiv höchstens je Erzählansicht; jede Bewegung abschaltbar. *Lassen:* Effektfeuer, Daueranimationen, laute Auftritte auf Arbeitsansichten.
- GESCHMACK (abgeleitet aus Rückmeldungen des Auftraggebers, [A]): Ruhe statt Effektfeuer; Seitenwechsel „Fliese für Fliese“ mit Logo auf der Wand, eher langsam; die alten SVG-Bewegungen bleiben (E-037); Kundenstimmen als langsames Karussell; keine Hausschrift außer dem Bestand.

### Ruhe-Regeln (alt K-016)
Geht K-005 und K-006 vor, wo sie sich widersprechen. Leitsatz: „Man soll genau sehen, wo man hinschaut, und nichts verwirrt.“
- **Fläche:** ein Gedanke je Bildschirm, viel freie Fläche. Nie zwei Stränge nebeneinander (Text links und Bild oder zweiter Text rechts zugleich); Köpfe der Abschnitte mittig (`Abschnitt mitte`), außer Ablauf-Treppe und Einsatzorte (gelobt, bleiben).
- **Einstieg:** mittig (`EinstiegMitte`): H1 in `fs-6`, darunter eine Zeile, was und wo; Hauptknopf, Anruf, WhatsApp; Bewertungszeile; dann das Foto vollständig.
- **Text:** weniger je Seite. Fachtext für Suchmaschinen weiter unten in „Mehr erfahren“ oder auf eigenen Unterseiten (z. B. Normen), nicht neben Zeichnungen. Firmendaten (Inhaber, Kammer, Betrieb seit) nur auf `/kontakt`, `/ueber-uns` und im Fuß. Keine Versprechen, die sich nicht halten lassen („zum Festpreis“, nicht „ohne Stress“).
- **Bilder:** immer vollständig im eigenen Seitenverhältnis, nie angeschnitten, nie aneinandergequetscht. Reihen von Fotos als Karussell, in dem jede sichtbare Karte ganz im Bild steht (Kartenbreite teilt die Zeile genau). Keine Unterschrift unter Galeriefotos: Name und Weg zur Leistung auf der Glasfläche (`Glasbild`, beim Darüberfahren; ohne Maus immer sichtbar). Jedes Bild mit eigenem Alt-Text. KI-Bilder nur als Stimmungsbilder, nie unter „Unsere Arbeiten“ oder bei Referenzen.
- **Karussells** (`Karussell`, Register `karussell`): langsam, von rechts nach links; Laufband 60 s je Durchlauf (Qualifikationen im Fuß), Reihe mit Selbstlauf alle 8 s (Kundenstimmen, gleich große Karten). Halten bei Maus und Fokus an, Knopf zum Anhalten (WCAG 2.2.2); reduziert, ohne JavaScript und im Notaus kein Selbstlauf.
- **Abläufe** auf einen Blick: Treppe bis vier Schritte; ab fünf Schritten Kopf und Satz mittig, darunter zwei Spalten (1 bis 3, 4 bis 6) oder eine Roadmap.
- **Zeichnungen** bleiben, mit einem Satz, was man sieht; keine Fachwörter im Einstieg ohne Not.
- **Seitenwechsel:** Fliesen neutral, größer, langsamer gelegt; auf der fertigen Wand Logo und Schriftzug (E3-B01-LOGO).

## K-004 Stack und Konventionen
- Gilt aus v2 weiter (`archiv/2026-10-werkstatt/KERN.md` K-004): Next.js 16.3.6 App Router (Next liefert sein eigenes React 19.3 Canary aus), Tailwind 4.3 mit `@theme static` in `src/app/globals.css` als einziger Token-Quelle, Palette gesperrt (`--color-*: initial`), TypeScript strict mit `allowJs`, Seiten `src/app/(bestand)/**/page.(jsx|tsx)`, Daten in `src/config/*`, Telefon, Adresse und Öffnungszeiten nur aus `COMPANY_DATA`; keine Beliebigwerte, keine Hex-Werte im Code, kein Inline-`style` außer CSS-Variablen; Schriften `next/font/local`; Icons über das Sprite `src/components/icons/`; Bewegung zentral in `src/lib/motion/`; Weiterleitungen in `next.config.ts` (308), 410 über `src/proxy.ts` und `src/lib/wege.ts`.
- Vor jeder Next-API-Nutzung die passende Seite in `node_modules/next/dist/docs/` lesen (AGENTS.md).
- Neu in v3:
  - Seitenwechsel B-01: `src/components/verlegen/` (Client-Komponente im Root-Layout `_dokument.tsx`, außerhalb von `main`; reine Logik in `src/lib/verlegen/` mit Tests in `test/`).
  - Eingang (ersetzt Intro B-02, E-081): Ablauf als CSS in `bewegung.css` (Block „eingang“), Namen und Grenzen in `src/lib/intro/ablauf.ts`, Klassen aus dem Kopfskript `src/lib/motion/kopfskript.ts`; `Intro.tsx` und `startbild.ts` entfallen. Früher: Intro B-02: `src/components/intro/Intro.tsx` (Ersatz „Der erste Boden“, E-019; mit Vektordatei später `logo-pfade.ts`), Ablauf `src/lib/intro/ablauf.ts`; Startschalter im Kopfskript `src/lib/motion/kopfskript.ts`.
  - Bilder: Webfassungen unter `public/images/arbeiten/<raum>/<name>.jpg`, Bilddaten (Maße, Alt-Text, Platzhalter, Raum, Paar) in `src/config/arbeiten.ts`; Einbau nur über den Baustein `Bildfeld` (`next/image`).
  - Texte: Fachwörter nur über den Baustein `Fachwort` (`<dfn data-glossar>` plus Erklärung mit `data-erklaert`), Glossar maschinenlesbar in `src/config/glossar.ts` (gespiegelt in `_werkstatt/regeln/glossar.json`).
  - Erstes Bild: Die fünf Pflichtelemente tragen `data-erstes-bild="logo|ueberschrift|ort|hauptknopf|kontakt"`.
  - Hauptknopf: genau **eine Hauptaktion** je Seite. Alle Elemente mit `data-hauptknopf` einer Seite tragen dieselbe Beschriftung („Termin vor Ort anfragen“ oder seitengerechte Abwandlung aus K-010) und dasselbe Ziel; sie stehen im ersten Bildschirm (Kopf oder Einstieg, für „Erstes Bild“) und im Abschnitt 6 „Nächster Schritt“. Kein zweiter Knopf in Hauptform mit anderem Ziel (Prüfung in Z-11).
- Prüfwerkzeuge: `_werkstatt/werkzeuge` (EINRICHTUNG.md), Regeln für Texte in `_werkstatt/regeln/`.
- Stack nach dem Upgrade: Stand je Paket in `UPGRADE.md`; dieser Abschnitt wird nach E2 mit den erreichten Versionen nachgeführt.
- Neu in v4: Bewegungsmodul mit Bewegungsschalter (`html[data-bewegung="ruhig"]`, gesetzt im Kopfskript vor dem ersten Rendern), gemeinsamer Takt `src/lib/motion/takt.ts` (eine rAF-Schleife für alle Skript-Animationen), Zeigerart aus `matchMedia('(hover: hover) and (pointer: fine)')`; Cursor `src/components/cursor/` (nur feiner Zeiger, E-067-1).

### Adressen und Suchmaschinen (alt K-014)
- Ausgangswert `adressen-e0.csv`. Jede Adresse bleibt 200 oder leitet mit 308 auf eine gleichwertige Seite (`next.config.ts`); entfernte Altadressen der Vorgängerfirma bleiben 410 (`src/lib/wege.ts`). Null kaputte interne Links.
- Je Seite genau eine H1, Titel (über `createMetadata`, `src/lib/metadata.ts`), Beschreibung, absolutes Canonical; strukturierte Daten gültig (`src/lib/schema.ts`), Bewertungen nur aus `src/config/reviews.js` (wörtlich, eine Quelle); Sitemap vollständig (`src/app/sitemap.ts`).
- Suchbegriffe je Seite (Titel, H1, Beschreibung aus E0) bleiben natürlich im neuen Text; Titel ≤ 60, Beschreibung 120 bis 155 (Test `test/titleLength.test.mjs` verlangt ≤ 58 und bleibt).

## K-005 Designsystem
Alle Werte als Tokens in `globals.css`; neue Werte nur als Stufe einer Skala.

### Farbe (v4, E-075: OKLCH-Stufen mit denselben gerenderten Werten wie v3)
Stufen je Familie, benannt nach der gerundeten Helligkeit L in Prozent. Nur diese Zeilen tragen Werte; alles andere verweist darauf. Die Stufen der v3-Farben rechnen nach CSS Color 4 auf deren sRGB-Wert zurück (Fehler unter 0,01 Farbstufen); vier Nachkommastellen sind nötig, weil gemischte Farben (Deckkraft, color-mix) bei gröberer Rundung um eine Stufe abweichen (E-075).

| Stufe | OKLCH | sRGB (v3) |
|---|---|---|
| `kalk-100` | oklch(100% 0 0) | #FFFFFF |
| `kalk-97` | oklch(96.7434% 0.001326 286.375) | #F4F4F5 |
| `kalk-90` | oklch(90.0981% 0.00553 274.959) | #DDDEE2 |
| `kalk-75` | oklch(75.2567% 0.026359 273.389) | #A9AEC0 |
| `tinte-62` | oklch(62.2012% 0.027699 273.263) | #818698 |
| `tinte-41` | oklch(40.6621% 0.039221 274.995) | #43485F |
| `tinte-33` | oklch(32.899% 0.056142 272.004) | #2B3352 |
| `tinte-19` | oklch(18.6546% 0.049864 268.945) | #0A1129 |
| `laser-95` | oklch(95% 0.022 27.7) | #FDE9E6 (neu in v4, noch ungenutzt) |
| `laser-57` | oklch(56.5879% 0.215442 27.702) | #D82020 |
| `laser-47` | oklch(47.0088% 0.177777 26.371) | #A8171C |
| `abnahme-95` | oklch(95% 0.03 154.1) | #E0F5E6 (neu in v4, noch ungenutzt) |
| `abnahme-47` | oklch(46.9322% 0.103239 154.146) | #1D6B3F |

| Rolle (Verweis) | Stufe | Einsatz |
|---|---|---|
| `kalk` | kalk-97 | Seitengrund (neutral, hell; seit E-043) |
| `fliese`, `white` | kalk-100 | Felder, Formulare, Fliesen im Seitenwechsel |
| `fuge` | kalk-90 | Fugen, Trennlinien (nur Deko, 1,22:1) |
| `strich` | tinte-62 | Ränder von Bedienelementen, Grafik (≥ 3:1) |
| `tinte-2` | tinte-41 | Nebentext (8,19:1 auf Kalk, 9,01:1 auf Fliese; E-040) |
| `tinte` | tinte-19 | Text, Hauptknopf |
| `laser` | laser-57 | Laserlinie der Seiten (nicht im Seitenwechsel, E-043), Grafik, große Schrift (4,61:1 auf Kalk) |
| `laser-tief` | laser-47 | Rot als Text (6,80:1) |
| `abnahme` | abnahme-47 | Erfolg mit Haken und Text |
| `nacht-2` | kalk-75 | Text auf Tinte-Flächen |
| `nacht-fuge` | tinte-33 | Fugen auf Tinte |
| `fliese-glanz` | fliese bei Deckkraft 0,55 (color-mix) | Hauch Glanz auf Fliesen des Seitenwechsels |

Bedeutungs-Tokens verweisen nur auf Stufen: `fehler` laser-47 · `fehler-flaeche` laser-95 · `erfolg` abnahme-47 · `erfolg-flaeche` abnahme-95 · `rand` tinte-62 · `fokus` tinte-19. `test/designsystem.test.mjs` prüft: jede Stufe ist OKLCH, jede Rolle und jedes Bedeutungs-Token ist ein Verweis.
- Logo-Farben bleiben exakt im Logo (#0F172A Navy, #DC2626 Rot, Maskottchen-Farben aus dem PNG) und werden nicht als Tokens verwendet. Die nahen Tokens `tinte` und `laser` bleiben (Kontrast geprüft, Wiedererkennung über das Logo).
- Bedeutung nie nur über Farbe.

### Fliesenskala für Abstände und Größen (neu, ersetzt die freie Lesart der v2-Stufen)
Bezug ist eine Fliese 30 × 60 cm im Maßstab 1 cm = 3,2 px: kurze Seite **F = 96 px**, lange Seite **2F = 192 px**, Fuge 3 mm ≈ 1 px (Linien 1 px, im Seitenwechsel mindestens 2 px). Die Tailwind-Stufen von v2 sind genau Bruchteile davon und bleiben die einzige Abstandsskala:

| Stufe | px | Fliesenmaß | Einsatz |
|---|---|---|---|
| `1` | 4 | Fuge × 4 | Abstand Icon und Text |
| `2` | 8 | F/12 | enge Abstände in Bedienelementen |
| `3` | 12 | F/8 | Feldinnenabstand klein |
| `4` | 16 | F/6 | Rand mobil, Feldinnenabstand |
| `6` | 24 | F/4 | Absatzabstand groß |
| `8` | 32 | F/3 | Rand Tablet, kleiner Versatz |
| `12` | 48 | F/2 | Rand Desktop, Abschnittskopf |
| `16` | 64 | 2F/3 = Drittelversatz | **Versatz** im Drittelverband, Abschnittsabstand mobil |
| `24` | 96 | F | Abschnittsabstand Desktop, Fliesenhöhe |
| `32` | 128 | 4F/3 | großer Abschnittsabstand |
- Versatz: Der eine bewusste Bruch je Bildschirmhöhe verschiebt einen Block um `16` (64 px = ein Drittel der langen Fliesenseite) oder um ein Drittel der Spaltenbreite.
- Raster: 12 Spalten ab `lg`, 8 ab `md`, 4 mobil, ohne Zwischenraum, getrennt durch 1-px-Fugen (aus v2).

### Formen, Tiefe, Ebenen
- Radien: `rounded-none` (Standard) und `r1` = 2 px (Eingaben). Keine weiteren.
- Schatten (neu als Skala, nur als Ebenen mit Deckkraft animiert): `shadow-fuge` (Kopf, aus v2) · `shadow-gesetzt` 0 1px 2px tinte/22 % (eine gelegte Fliese) · `shadow-flug` 0 10px 24px tinte/18 % (eine Fliese im Flug). Für den Seitenwechsel.
- Ebenen: `z-0` Inhalt · `z-10` Inhalt über Deko · `z-30` untere Leiste · `z-40` Kopf · `z-50` Dialoge, Menü, Banner · **neu** `z-60` Seitenwechsel und Intro.

### Dauern und Kurven (v4, E-075)
- Sechs Stufen: `dauer-0` 0 ms (sofort, ruhiger Bewegungsschalter) · `dauer-1` 140 ms Rückmeldung · `dauer-2` 320 ms Zustandswechsel · `dauer-3` 600 ms Auftritt · `dauer-4` 800 ms großer Auftritt · `dauer-5` 1200 ms großer Moment. `--staffel` 60 ms ist ein Abstand zwischen Auftritten, keine Dauerstufe (höchstens 8 Elemente).
- Ablauflängen sind Vielfache der Stufen und stehen als Zahl in `globals.css`, weil `Verlegen.tsx` sie als Zeit liest: `--verlegen-gesamt` 2400 ms (2 × dauer-5, erster Wechsel einer Sitzung) · `--verlegen-gesamt-folge` 1800 ms (dauer-5 + dauer-3; beide E-047) · `--verlegen-ruhig` 150 ms (eingefroren wie der ganze Seitenwechsel B-01, E-078) · `--intro-gesamt` 1600 ms (2 × dauer-4; Obergrenze 2200 ms) · `--band-durchlauf` 60 s (50 × dauer-5). Werte nur aus diesen Variablen lesen; `test/designsystem.test.mjs` prüft die Rechnung.
- Vier Kurven: `ease-setzen` cubic-bezier(0.2, 0.8, 0.2, 1) ausklingend · `ease-laser` cubic-bezier(0.7, 0, 0.2, 1) wechselnd · `ease-weg` cubic-bezier(0.32, 0, 0.67, 0) beschleunigend · `ease-aufsetzen` cubic-bezier(0.5, 0, 0.75, 0) nur B-01 (schweben, dann hart aufsetzen, E-043). `ease-hammer` ist ein Alias auf `ease-setzen` (v3-Name); `linear` ist Plattformkurve (Fortschritt, scrollgebunden).

### Ziel v4 (E-067-5; Farben, Dauern und Kurven umgesetzt in UM-E3-DS, E-075)
- Abstand: zwölf Stufen der Fliesenskala; `werte.mjs` prüft die Grenze (Regeldatei nachgeführt).
- Themen: hell (Pflicht); Dunkelmodus in der Kür.
- Bedienung: Ladeanzeige erst nach 300 ms, dann mindestens 500 ms; Touch-Ziele 44 × 44 (nie unter 24 × 24).

## K-006 Typografie, Komposition und Bild
- Familien unverändert: Archivo (Anzeige Breite 74 %, Gewicht 760; Text 400/600) und IBM Plex Mono 400. MUT: Display deutlich größer und ruhiger; Mono nur noch für Telefonnummern, Maße und Zahlen im Fließtext, nicht mehr als Etikett über jeder Überschrift (Verständlichkeit).
- Skala `text-fs-1` bis `text-fs-7` aus v2 (fs-7 Zeilenhöhe 1,1 laut Code). Fließtext ist `text-fs-3` (17 bis 19 px), mobil nie unter 16 px; Zeilenhöhe 1,6; Zeilenlänge `max-w-mass` (66ch).
- Satz: `text-wrap: balance` für Überschriften, `pretty` für Absätze, Silbentrennung im Fließtext; Display am längsten Wort bei 360 px geprüft.
- Komposition: Einstieg links bündig an der Laserlinie, Foto rechts (Desktop) oder darunter (mobil, nach Hauptknopf und Telefon); auf `/` als Planblatt (E-037): Plan rechts an der Waage, Foto unter der Schnittkante, mobil Überschrift, Ort, Hauptknopf, Telefon, Vorspann, Plan, Bild; ein Blickfang je Bildschirmhöhe; Abschnitte wechseln Struktur und Dichte; je Bildschirmhöhe genau ein Versatz. Mobil ist eine eigene Reihenfolge: Überschrift, Ort, Hauptknopf, Telefon, dann Bild.
- Mikrotypografie (v4): geschütztes Leerzeichen vor Einheiten und zwischen Zahl und Einheit („12\u00a0m²“), nicht in Kundenstimmen (G8); Zeilenmasken mit Innenabstand, damit Unterlängen und Umlautpunkte nicht abgeschnitten werden.

### Bildregeln (alt K-012)
- Nur echte Bilder aus `_eingang/entpackt/` (84 Originale) und dem Bestand; nie die 11 Generatorbilder aus `public/images/bad/` (E-013), nie Stock oder generierte Bilder.
- Bearbeitung per Skript (`werkzeuge/bilder.mjs`, sharp): Ränder der Bildschirmfotos entfernen, Ausrichtung, sanfte Belichtung und Weißabgleich, Geraderichten, Zuschnitt nach Bildplatz und Schwerpunkt aus `bildinventar.csv`, nie hochskalieren (Quellen ≤ 1320 px breit), alle Metadaten entfernen, JPEG Qualität 82 als Webfassung (Next erzeugt AVIF/WebP); sprechende Namen.
- Nicht verwenden oder wegschneiden: erkennbare Personen und Gesichter, Kind im Hintergrund, Hausnummern, Kennzeichen, Namen, fremde Firmenlogos und Markenaufdrucke. Bis zur Klärung nicht verwenden: Schiefer-Dusche mit Glaswand (wirkt wie Herstellerfoto), IMG_2577 (Bildbetrachter), Dubletten IMG_2594 und IMG_2581.
- Einbau nur über `Bildfeld` (`next/image`): feste Maße, `sizes`, unscharfer Platzhalter; seit dem mittigen Einstieg (K-016) ist das Foto unter den Knöpfen auf allen acht Seiten mit `EinstiegMitte` und auf der Startseite das LCP-Element und lädt mit Vorrang (`lcp`, E-061; vorher E-037 und E-041 ohne Vorrang); die übrigen Einstiegsbilder ebenso (`lcp`, E-034). Alt-Text in Alltagssprache ≤ 125 Zeichen nach den Zeichenregeln, ehrlich (zum Beispiel „Sanitärmontage noch offen“), keine erfundenen Orte; dekorativ ohne Alt-Text.
- Bildplätze: `_werkstatt/bildplaetze.md`. Wo kein passendes Foto da ist: Fliesenkomposition aus dem Formsystem, nie graue Kästen. Als Zeichnung neben Text (Bereichsfliesen) die Plan-Vignetten aus v2 (`kern/vignetten`: Bad, Wohnen, Außen, Untergrund, dazu Reparatur neu; Linien 1,5 px non-scaling, currentColor, Fugen und Schraffur in Strich, kein Rot, keine IDs; E-037); sonst Fliesenkomposition mit `deutlich` (Fugen in Strich, rote Laserlinie oder roter Riss; E-036).

## K-007 Signatur-Satz (E-067-1)
| Glied | Name | Gestalt | Wo | Ruhig |
|---|---|---|---|---|
| Übergangsgeste | „Fliese für Fliese“ (B-01) | Die Seite wird Fliese für Fliese von rechts belegt, das Logo steht auf der Wand, dann werden die Fliesen einzeln abgenommen (K-008 B-01); Dauer nach Wunsch des Auftraggebers | Wechsel zwischen Erzählansichten | Überblendung `dauer-2` oder Sofortwechsel |
| Enthüllungsgeste | „Setzen“ | Ein Block kommt kurz und fest an seinen Platz (`ease-setzen`, 8 px, `dauer-3`), unter ihm zieht sich die Fuge als 1-px-Linie (`anriss`) | höchstens ein Auftritt mit Gewicht je Bildschirmhöhe, höchstens die Hälfte der Abschnitte | Sofortzustand |
| Leitfaden-Motiv | Laserlinie | Die rote Linie führt durch alle Erzählansichten, wächst beim Scrollen mit (`leitachse`) und markiert den aktuellen Abschnitt | alle Erzählansichten | steht vollständig |
| Cursor-Charakter | Fugenkreuz | Systemzeiger als Klickpunkt; über Fotos, Reglern und Plänen ein kleines Fugenkreuz mit Beschriftung („Ansehen“, „Ziehen“, „Vergleichen“), folgt ohne Feder | nur `(hover: hover) and (pointer: fine)` | ohne Nachlauf, Beschriftung bleibt |
| Typografischer Moment | „An der Schnur“ | Die H1-Zeilen (`titelZeilen`) erscheinen hinter Zeilenmasken eine nach der anderen an der Laserlinie, höchstens 1,5 s mit Ort und Hauptknopf | Einstieg der Erzählansichten | Sofortzustand |
- Arbeitsansichten (K-010) bekommen keinen Signaturmoment, nur Rückmeldung und Zustandswechsel.

## K-008 Bewegungssystem und Register mit Übergängen, Scrollen und Cursor
- Haltung: Bewegung legt Dinge an ihren Platz. Technik: nur `transform` und `opacity` (einzige Ausnahme: `stroke-dashoffset` für das Zeichnen der Logo-Kontur in B-02, weil die Kontur sich zeichnen soll). Startzustände nur unter `html.k-bewegung` (Kopfskript aus v2); ohne JavaScript ist alles sichtbar; scrollgebundene Szenen per `animation-timeline` mit Ersatzzweig = Endzustand. Reduzierte Bewegung: Überblendung `dauer-2` oder Sofortzustand. Hover nur bei `(hover: hover) and (pointer: fine)`.
- Jedes animierte Element liegt in einem Element mit `data-motion="<Kennung>"` (am Element selbst oder am Behälter des Moments: das Bewegungsmodul setzt `data-motion-stand` am Träger des Attributs, die CSS-Regeln greifen von dort auf die Teile, v3.5); Maschinenfassung `_werkstatt/register.json`, Bauvorgabe je großem Moment in `_werkstatt/register/<kennung>.json`.

| Kennung | Zweck | Auslöser | Dauer · Kurve | Reduziert | Wo |
|---|---|---|---|---|---|
| **`verlegen`** (B-01 „Fliese für Fliese“, E-043; v3 E-047) | Zusammenhang: Seitenwechsel | Klick auf internen Link; Zurück und Vor gespiegelt mit 70 % | gesamt 2400 ms (erster) bzw. 1800 ms (folgende): Belegen mit großen neutralen Fliesen einzeln von rechts (je Fliese `ease-aufsetzen`), auf der fertigen Wand klatscht das Logo auf (1,15 → 1 in 220 ms, steht mindestens 450 ms nach einem Klick; bei Zurück und Vor ohne Mindestzeit, das Aufklatschen läuft aber zu Ende), Wechsel unter dem Boden, Abnehmen Fliese für Fliese (je Fliese `ease-setzen`), das Logo geht mit den ersten Fliesen | Überblendung 150 ms, Logo nur eingeblendet | global |
| **`intro`** (B-02) | Charakter: Logo zeichnet sich; bis zur Vektordatei Ersatz „Der erste Boden“ (E-018, E-019) | erster Besuch je Browser | Ersatz: Fläche 3 × 3 legt sich 80–624 ms (`ease-hammer`), Logo setzt sich 448–752 ms (`ease-setzen`), deckend bis 800 ms, Logo gleitet 800–1400 ms (`ease-setzen`), Reihen ziehen 800–1504 ms linear ab; alles Anteile von `--intro-gesamt` (1600 ms), Grenze 2200 ms | Kopf-Logo blendet in `dauer-2` ein, keine Schicht | jede Erstseite · **Seit 4.3 (E-081) Alias von `eingang`**, die Zeile beschreibt den früheren Stand |
| `startbild` | Charakter: Startbild legt sich frei | Sichtbarkeit (IO 40 %, E-037), ohne Intro, auf allen Breiten (seit E-047 steht das Foto vollständig unter dem mittigen Einstieg) | `dauer-4`, Fliesen ziehen im Drittelverband linear ab (E-036), Staffel ≤ 8 Spalten | Bild sofort sichtbar | `/` · **Seit 4.3 (E-081) Alias von `eingang`**, die Zeile beschreibt den früheren Stand |
| `sig-kreuzlinie` (SIG-1, E-037) | Charakter: rote Waage und Lot wachsen aus dem Kreuzpunkt am Lot des Plans, die Waage knickt links ins Lot zur Leitachse; mobil wächst das Lot neben dem Text | Laden (CSS ab dem ersten Bild), mit Intro ab dem Freilegen (`--intro-gesamt` · 0,5, `html.k-intro-sig`) | `dauer-5` linear, Knick-Lot `dauer-2` danach, gesamt 1,52 s | Linien voll | Erzählseiten mit Planblatt (`teile/EinstiegPlanblatt`, E-044); auf `/` seit E-047 nicht mehr (mittiger Einstieg) |
| `sig-flucht` (SIG-1, E-037) | Hierarchie: die Zeilen der H1 rücken 12 px in die Flucht | Laden, mit Intro ab dem Freilegen | `dauer-4` · `ease-setzen`, Staffel 2/4/6 | Sofortzustand | `/` (mittiger Einstieg `teile/EinstiegMitte`, E-047) und Erzählseiten mit Planblatt (E-044) |
| `sig-plan` (E-037) | Orientierung: das Fugenbild des Verlegeplans rückt in die Flucht | Laden (`data-flucht="laden"`) bzw. Hover/Fokus, auf Touch IO 40 % (`zeigen`) | Laden `dauer-4` · `ease-setzen` nach `dauer-2`; Zeigen `dauer-3` | Raster in der Flucht | `/bad`, `/leistungen`, `/leistungen/[id]`; Planblatt-Einstiege (laden), Wissensseiten mit Plan (zeigen, E-044); auf `/` seit E-047 nicht mehr |
| `seitenwechsel` (Plan-Morph, E-037) | Zusammenhang: derselbe Plan gleitet von der Übersicht in den Einstieg der Leistungsseite | Klick „Fachdetails“ (`data-uebergang="plan-vor"`, View Transition Typ plan-vor), nur ab lg bei erlaubter Bewegung und Browserunterstützung, sonst B-01 | Plan `dauer-4` · `ease-setzen`, Seite überblendet `dauer-2`, Kopf steht; nur vorwärts | B-01-Überblendung | `/leistungen` → `/leistungen/[id]` |
| `einzugsband` · `szene-ablauf` · `fugenband` (E-037) | Orientierung und Zusammenhang wie in v2 | Laden · Scroll · Scroll | wie v2 | Endzustand | `/standorte`, `/leistungen`, `/ueber-uns` |
| `schichten` | Zusammenhang: Was unter der Fliese steckt | Scroll (view-timeline je Satz, Zeichnung klebt) | linear an Scroll, je Schicht ein Satz (cover 15 bis 45 %) | alle Schichten sichtbar, nichts klebt | `/bad` |
| `weg` | Orientierung: Vom Anruf bis zur letzten Fuge | Scroll (view-timeline) | Laserlinie zieht von Station zu Station | Linie voll, alle Stationen | vorerst keiner (E-048: für K-016 zu unruhig, `/bad/badsanierung` zeigt 3 + 3; gebaut, Schaufenster) |
| `gefaelle-dusche` | Zusammenhang: Wasser läuft zum Ablauf | Sichtbarkeit (IO 40 %) | Tropfen `dauer-5` linear, einmal; Pfeile `dauer-2` · `ease-setzen` hinter dem Tropfen | Pfeile statisch; Zurück/Vor Endzustand | `/bad/barrierefreies-bad` |
| `gefaelle-balkon` | Zusammenhang: Regen läuft vom Balkon ab | Sichtbarkeit (IO 40 %) | `dauer-5` linear, einmal | Pfeile statisch, Tropfen in der Rinne; Zurück/Vor Endzustand | `/balkon-terrasse` |
| `formatregler` | Rückmeldung: kleine Fliese gegen große Fliese bis 120 × 260 (Wand quer, ohne Zahlen, E-045) | Regler (Zeiger und Tastatur) | direkt, ohne Verzögerung | gleich | `/leistungen` |
| `verband` | Rückmeldung: Verlegemuster wechselt (vier Muster, Fischgrät als eigene Ebene) | Auswahl (Radiogruppe, ohne JS) | gehende Ebene `dauer-1` · `ease-weg`, danach die gewählte `dauer-3` · `ease-setzen` (nie zwei Raster zugleich, E-062) | Sofortzustand | `/fliesen` |
| `vorher-nachher` | Rückmeldung: Vorher gegen Nachher (Lot in Tinte, eigener Abschnitt mit H2, E-045) | Regler (Zeiger und Tastatur) | direkt | gleich | `/referenzen` |
| `karte` | Orientierung: Einsatzgebiet ab Aßlar | Sichtbarkeit (IO 40 %) | Ringe `dauer-3` · `ease-setzen` von innen nach außen, Punkte je Zone `dauer-2` | Endzustand; Zurück/Vor Endzustand | `/ueber-uns` und `/kontakt` (ohne Liste, seit E-062); auf `/standorte` nur nach Rückfrage (E-037); auf `/` bleiben die Einsatzorte (K-016) |
| `galerie-filter` | Rückmeldung: Bilder nach Raum | Auswahl (Knöpfe mit `aria-pressed`) | `dauer-2` · `ease-setzen` Überblendung in Lesefolge, Staffel höchstens 8 Stufen | Sofortzustand | `/referenzen` |
| `leitachse` | Orientierung: Lesefortschritt | Scroll (scroll-timeline) | linear | Grundschicht, nichts gezogen | Erzählseiten (aus v2) |
| `auftritt` | Hierarchie: Abschnitt rückt 8 px ein | IO 20 % | `dauer-3` · `ease-setzen` | Überblendung | Erzählseiten (aus v2) |
| `aufklappen` | Rückmeldung | Klick, Taste | auf `dauer-2`, zu `dauer-1` | Sofortzustand | Menü, Akkordeon (aus v2) |
| `druck` · `zustand` · `notiert` · `laden` | Rückmeldung | `:active` · Hover/Fokus · Erfolg · Absenden | `dauer-1` · `dauer-1` · `dauer-3` · linear | wie v2 | alle Seiten (aus v2) |
| `anriss` | Hierarchie: Schlüsselwort einer Stimme | IO 50 % | `dauer-4` | Strich sofort | Stimmen (aus v2) |
| `karussell` (K-016, E-047) | Ruhe: Qualifikationen und Kundenstimmen laufen langsam von rechts nach links | Band: läuft ab dem Laden endlos; Reihe: alle 8 s eine Karte weiter, nur wenn sie zur Hälfte im Fenster steht und niedriger ist als das Fenster. Beide halten bei Maus, Fokus und Knopf an, nach einer Berührung bleibt der Selbstlauf aus | Band `--band-durchlauf` (60 s) linear, nur `translate`; Reihe Scrollposition `smooth` | Band als umbrechende Liste ohne Kopie, Reihe nur von Hand; ebenso ohne JavaScript, im Notaus, im Druck und bei erzwungenen Farben | Fuß (alle Seiten), Kundenstimmen und Fotos im Beleg |
| `glasbild` (K-016, E-047) | Rückmeldung: Name und Weg zur Leistung auf dem Foto statt einer Unterschrift | Hover und Fokus, nur bei Fotos mit Link und `(hover: hover)` | `dauer-2` · `ease-setzen`, nur `opacity` | Name immer unten auf einem Verlauf (auch auf Touch und ohne Link); erzwungene Farben: Foto frei, Text auf Canvas | Fotos im Beleg, Galerie mit Filter (`/referenzen`, Link je Gruppe zur Leistungsseite) |
- Nicht mehr entfallen (E-037, Entscheidung des Auftraggebers): `seitenwechsel` (Plan-Morph), `sig-plan`, `sig-kreuzlinie`, `sig-flucht`, `szene-ablauf`, `einzugsband`, `fugenband` sind fester Teil des Systems. Keine Seite wird auf eine Vorlage umgestellt, bevor die Vorlage sie trägt; nichts davon wird ohne Rückfrage entfernt. B-01 lässt Links mit `data-uebergang` durch, wenn ihr eigener Übergang möglich ist; beide laufen nie gleichzeitig (B-01 beendet eine laufende View Transition, sobald es legt).
- Große Momente: je Erzählseite genau einer je Bildschirm (Tabelle oben); Arbeitsseiten keine. Auf `/` ist seit E-047 die H1 mit `sig-flucht` im mittigen Einstieg der Moment des ersten Bildschirms, `startbild` der Moment beim Eintritt des Fotos (auf allen Breiten); Kreuzlinie und Plan (SIG-1) tragen weiter die Planblatt-Einstiege der Erzählseiten.

### B-01 „Fliese für Fliese“ (Pflicht; seit E-043 auf Wunsch des Auftraggebers; Technik nach E-006 und E-010; E-042 „Wind“ ersetzt)
- Bild: Die ganze Seite wird Fliese für Fliese gefliest, von rechts nach links; ist alles belegt, wechselt darunter die Seite; dann werden die Fliesen in derselben Richtung Stück für Stück wieder abgenommen und verschwinden im Hintergrund, die neue Seite erscheint von rechts. Jede Fliese hat ihren eigenen Moment (tak, tak, tak), keine zwei beginnen gleichzeitig. Ganz neutral: weiße Fliesen, graue Fuge, Schatten in Tinte, Wartelinie in `strich`, kein Rot, kein Gelb.
- Fliese 2:1 quer, Drittelverband, Fuge 1 % der kurzen Seite, mindestens 2 px, Fugenfarbe `fuge`; Oberfläche `fliese` mit feiner Körnung (SVG-Rauschen, einmal zur Kachel gerastert) und Glanzebene `fliese-glanz`; etwa 3 Fliesen je Reihe bei 390 px, 6 bis 7 bei 1440 px (v3, E-047), höchstens 80.
- Legen: Spalte für Spalte von der Startkante her im gleichen Schlag (eine Spalte = je Reihe die Fliese im selben Band von einer Fliesenlänge; im Drittelverband eine Treppe, zusammen das Zickzack), mindestens 50 ms zwischen zwei Spalten (höchstens 20 Schläge je Sekunde); in der Spalte setzen die Fliesen von oben nach unten nacheinander auf, verteilt über den ganzen Schlag (v3, E-047; vorher der halbe). Jede schwebt zuerst größer (1,12) und ein Stück zur Startkante hin (0,12 Fliesenlängen) mit Flugschatten `shadow-flug` über den schon gelegten und setzt nach einem halben Schlag mit `ease-aufsetzen` hart auf, ohne Nachfedern; wenn die nächste Spalte zur Hälfte begonnen hat, ist sie gelandet (v3, E-047). Später gelegte liegen oben. Bei bis zu 80 Fliesen in 0,5 bis 0,9 s kann nicht jede Fliese einen eigenen hörbaren Schlag haben; deshalb ist jede Spalte ein Schlag und jede Fliese hat ihr eigenes Aufsetzen (Prüfung E-043).
- Wechsel: Seite wechselt unter der geschlossenen Fläche; Scroll oben (bei Zurück die gemerkte Stelle), Fokus auf der H1, Titel über Nexts Routen-Ansager. Ist die Seite nicht bereit: eine Linie in `strich` wandert ruhig über den Boden, höchstens 3 s, danach Wechsel ohne Fliesen.
- Abnehmen: dieselbe Reihenfolge wie beim Legen (Spalte für Spalte, in der Spalte von oben nach unten); jede Fliese weicht in 1,5 Schlägen in den Hintergrund zurück: Größe 1 → 0,6 mit `ease-setzen` (sichtbar kleiner, solange sie noch deckt), Deckkraft ab 40 % auf 0.
- Takt (v3, E-047): gesamt (Legen und Abnehmen je zur Hälfte, Logo-Zeit und Warten kommen dazu) 2400 ms beim ersten Wechsel einer Sitzung, 1800 ms ab dem zweiten; Fliesen etwa 3 je Reihe mobil und 6 bis 7 am Desktop, höchstens 6 zugleich in der Luft; Logo der Firma (dieselbe Datei wie im Kopf, für das Auge mittig) auf der fertigen Wand; Zurück und Vor gespiegelt (von links nach rechts) mit 70 %. Logik `stueckplan` in `src/lib/verlegen/raster.ts`, Zustände in `automat.ts` (ruhe, legen, bedeckt, warten, abnehmen, abbruch). Zurück oder Vor während des Legens: das Ereignis wird nachgereicht, sobald der Boden liegt (statt des Klickziels); während bedeckt und warten übernimmt Next es, der Boden wartet auf die Seite aus dem Verlauf; während des Abnehmens läuft es ohne Boden, Scroll und Fokus folgen. Ein „bereit“ zählt nur für die zuletzt abgeschickte Navigation; führt sie auf den schon angezeigten Pfad, meldet B-01 selbst. Anker derselben Seite bekommen beim hashchange den Verlaufszustand der Seite, damit Zurück von einer anderen Seite sie wieder zeigt. Abbruch nach 3 s: die Schicht blendet aus, die Fliesen bleiben bis dahin liegen; danach Fokus auf der H1 (bei Zurück und Vor mit der gemerkten Scrollstellung). Enter auf einem Link während des Abnehmens wird vorgemerkt und startet nach dem Freigeben. Anker auf einer anderen Seite: Fokus auf das Ankerziel statt auf die H1. Maße von Belag und Logo aus der Fläche der Schicht (ohne Bildlaufleiste); wächst die Ansicht beim Legen, wird neu vermessen. Reduzierte Bewegung: keine wandernde Linie.
- Technik: feste Schicht (z-60) außerhalb von `main`, Fliesen als DOM-Elemente erst beim ersten Wechsel, nur `transform` und `opacity` über WAAPI. Klick-Abfang in der Capture-Phase, Zurück und Vor per Aufschub des popstate (gespiegelt). Der Plan-Morph (View Transition Typ `plan-vor`) bleibt daneben; beide laufen nie gleichzeitig.
- Nie bei erstem Laden, Ankern derselben Seite, externen Links, `tel:`, `mailto:`, WhatsApp, Downloads, neuem Tab (Zusatztasten, `target`), Formularen, Links mit `data-kein-verlegen`; Doppelklicks lösen keinen zweiten Wechsel aus.
- Zugänglichkeit: Schicht `aria-hidden`, während des Wechsels fängt sie Klicks ab, `header`, `main` und `footer` sind `inert`; Tastatur unberührt; reduzierte Bewegung und Notaus: Überblendung 150 ms über eine Kalkfläche.

### B-02 „Logo zeichnet sich“ (Pflicht)
- Nur beim ersten Besuch je Browser (Speicher `localStorage`, Schlüssel `tezgel-intro`, im Fehlerfall kein Intro); Klasse `k-intro` an `html` durch das Kopfskript vor dem ersten Bild.
- Kontur in der Reihenfolge Kopf und Haare, Gesicht, Körper, Arm mit Fliese, Beine, dann Wortmarke Buchstabe für Buchstabe; dann Flächen; dann gleitet das Logo per FLIP an den Platz des Kopf-Logos, während Fliesen die Decke von der Seite abziehen.
- Jeder Klick, Tipp, Tastendruck oder Scroll beendet sofort (Lauscher im Kopfskript, passiv, `once`). Reduziert: Einblenden in 300 ms.
- Logotreue: Vektor ≥ 98 % deckungsgleich bei doppelter Größe, Farben exakt; sonst Ersatz-Intro „Der erste Boden“ (E-011).
- Stand (E-018, E-019): Ersatz-Intro gebaut. Kalkblatt mit Fugenraster, Fläche 3 × 3 im Drittelverband, Original-Logo als Bild, Gleiten per FLIP (Zielmaß vom Inline-Skript nach dem Kopf), Reihen ziehen ab wie B-01. Serverkomponente `src/components/intro/Intro.tsx`, Ablauf `src/lib/intro/ablauf.ts`, Schalter, Abbruch und Grenze im Kopfskript; Ablauf als CSS in `bewegung.css` ab dem ersten Bild.
- Stand (E-036): Fliese am Desktop mit der Breite wachsend (bis 15rem), Fuge 1/80 der Fliese je Seite. Startseite ab lg (`html.k-intro-start`): Reihe = Zeilenhöhe der H1, Fliese = zwei Reihen, Reihengrenze auf der Oberkante der H1, nur CSS vor dem ersten Bild (kein Umrechnen danach).

### Regeln v4 (AUFTRAG.md Abschnitt 8, E-067-2 bis E-067-4)
- Bewegungsschalter „Bewegung: an/ruhig“ im Fuß und im Menü; Start nach `prefers-reduced-motion`, Wahl je Gerät in `localStorage`; ruhig gilt wie reduzierte Bewegung (Überblendung oder Sofortzustand, kein Parallax, kein Autoplay, kein Cursor-Nachlauf).
  - Stand 4.2 (E-080): `html[data-bewegung="ruhig"]` aus dem Kopfskript, ohne `k-bewegung`. Das Gerät geht vor, „an“ ist dann nicht wählbar [A] UM-7. Regeln, die nur an `prefers-reduced-motion` hängen, brauchen einen Spiegel im Block „Bewegungsschalter“ von `bewegung.css` oder die Variante `ruhig:`. Der Wächter `test/bewegungsschalter.test.mjs` prüft das. Neue Skripte lesen den Zustand über `src/lib/motion/schalter.ts`.
- Gemeinsamer Takt für alle Skript-Animationen; passive Listener; keine Scroll-Ereignisse für Effekte (scrollgebunden nur über `animation-timeline` mit IntersectionObserver-Rückfall).
  - Stand 4.2 (E-080): `src/lib/motion/takt.ts` mit `naechstesBild` (einmal), `imTakt` (jedes Bild) und `wiederhole` (Selbstlauf, setzt bei verborgenem Tab aus). Neuer Code ruft `requestAnimationFrame` nicht selbst auf; Ausnahme ist B-01 (eingefroren, E-078).
  - Stand 4.4 (E-084): Cursor `src/lib/motion/cursor.ts` + `src/components/cursor/Cursor.tsx` (nur feiner Zeiger, nachgeladen bei der ersten Mausbewegung, Systemzeiger bleibt, sechs Zustände im `CURSOR_REGISTER`, `data-cursor` für eigene Orte). Scrollen ohne `scrollbar-gutter` (B-01, E-084), Speculation Rules nur prefetch. Leitfaden `Leitachse.tsx` auf `/`. Register v4 mit Zweck, Stufe und ruhiger Fassung je Kennung, `register.json` gleich `register.ts`.
- Eingang ohne Vorhang (E-067-4): Logo baut sich im Kopf auf, H1-Zeilen hinter Zeilenmasken, LCP-Foto vom ersten Bild an sichtbar, gesamt höchstens 1,5 s, Zeitlimit 2 s, beim Wiederkehren kürzer.
  - Stand 4.3 (E-081): gebaut. Voll 1,40 s, Wiederkehr im selben Besuch (`sessionStorage`) 0,44 bis 0,68 s ohne Logo-Aufbau. Startzustände nur unter `html.k-eingang.k-bewegung:not(.k-notaus)`. Kennungen `eingang` und `zeilenmaske`, Alias `intro` und `startbild`. `--intro-gesamt` ist unbenutzt; er bleibt, bis der Designsystem-Test ihn mit einem Paket ablöst. Annahmen [A] UM-8.
- B-01 (E-067-3): Tippen, Klick oder Taste beendet den Übergang sofort; Navigation startet beim Klick; Arbeitsansichten (K-010) wechseln schlicht; nach dem Wechsel Fokus auf die h1; Zurück-Taste und Scrollposition wie ohne Übergang.
- Scrollen: natives Scrollen, kein Lenis (E-067-2); `scrollbar-gutter: stable`; `overscroll-behavior: contain` für Dialoge und Menü; erster Bildschirm und Sticky-Szenen in `svh`; Sprungziele mit `scroll-margin` unter festen Leisten; lange Seiten mit `content-visibility` und reservierter Größe; Vorrendern über Speculation Rules nur für öffentliche GET-Seiten (nie Formulare, `/api`, `/login`).
- Cursor (E-067-1): Zustände Handlung, Ansehen, Ziehen, Vergleichen, nicht verfügbar, lädt im Register; ausgeblendet beim Verlassen des Fensters, bei Tastaturbedienung und in erzwungenen Farben; Textcursor bleibt nativ; keine Mischmodi.
- Staffel höchstens acht Elemente (Befund `karte` mit Stufen bis 13 wird angepasst).

## K-009 SVG-Formsystem
- Grundraster: Fugenraster aus K-005; Linien 1 px Fuge, 1 px Strich, 2 px Tinte (Fokus), 2 px Laser (Laserlinie).
- Icon-Familie aus v2 (47 Icons, 24er Raster, Strich 1,5 px, Enden `square`, Ecken `miter`, `currentColor`, Sprite). Neue Icons nur in dieser Familie. Markenlogos (WhatsApp, Google) bleiben unverändert und zählen nicht zur Familie.
- Zeichnungen (neu, alle aus Fliese, Fuge und Laserlinie): Schichtaufbau (Untergrund, Abdichtung, Kleber, Fliese, Fuge), Duschboden mit Gefälle und Ablauf, Balkon mit Gefälle, vier Verlegemuster (Kreuzfuge, Halbverband, Drittelverband, Fischgrät), Formatvergleich, Einsatzkarte (Aßlar in der Mitte, Ringe), Fliesenkomposition als Bildplatz ohne Foto, 404 (eine verrutschte Fliese).
- Zugänglichkeit: dekorativ `aria-hidden="true" focusable="false"`; bedeutungstragend `role="img"` mit Namen; IDs je Instanz eindeutig. Budgets: Icon ≤ 1,5 KB, Zeichnung ≤ 40 KB gzip; SVGO.
- v4 (umgesetzt in UM-E3-SVG, E-075): eine Icon-Familie (eigenes Sprite, Raster 24, Strich 1,5); `lucide-react` ist entfernt, Icon-Felder in Daten tragen Sprite-Namen (`src/components/icons/zuordnung.ts`). SVGO in zwei Konfigurationen unter `_werkstatt/werkzeuge/svgo-statisch.config.mjs` (behält `role` und die Kennungen von `title` und `desc`) und `svgo-animiert.config.mjs`. Jede SVG-Datei ist Fixpunkt ihrer Konfiguration, das heißt, SVGO ändert sie nicht mehr (Spalte „optimiert“ in `svg.mjs`). Animiert ist nur das Sprite: Die animierte Konfiguration behält `<symbol>` und alle Kennungen (`removeHiddenElems` aus), `sprite.mjs` wendet sie beim Erzeugen an, und das Icon-Budget gilt dort je Symbol (E-069). Keine eingebetteten Pixelbilder: Die beiden ungenutzten Logo-SVG mit eingebettetem PNG sind entfernt, ihre Adressen führen per 308 auf `tezgel-logo.png` und `tezgel-logo-dark.png` (gleiches Logo in Form, Proportion und Farbe, G8).

## K-010 Komponenten, Zustände und Ansichtsarten
- Bausteine: `src/components/kern/` (Knopf, Hauptknopf, Abschnitt, Bildfeld, Glasbild, Karussell, Fachwort, Textmarken, Einzugsband, Leitachse), Vorlagen `src/components/vorlagen/` (Erzähl-, Wissens-, Orts- und Arbeitsseite), Formulare `src/components/funnels/` und `src/components/forms/`.
- Zustände (Pflicht für jedes interaktive Element, AUFTRAG.md Abschnitt 7): Ruhe, Hover, Fokus (`focus-visible`, 2 px, 3:1), gedrückt, deaktiviert, lädt (nach 300 ms, mindestens 500 ms), Fehler, Erfolg; dazu leere Zustände und die Fehlerseite.
- Ansichtsarten:
  - Erzählansichten (dürfen inszenieren): `/`, `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/leistungen`, `/balkon-terrasse`, `/referenzen`, `/ueber-uns`, `/standorte/[stadt]`, die Bereichs- und Fachseiten unter `/bad`, `/fliesen`, `/treppen`, `/naturstein`, `/untergrund-abdichtung`, `/balkon-terrasse`, `/leistungen/[id]`, `/referenzen/[id]`, `/ausstellung/*`.
  - Wissensansichten (ruhige Erzählung, Übergangsgeste ja, große Momente nur nach Register): `/fliesen`, `/blog`, `/blog/[slug]`, `/faq`, `/foerderung`.
  - Arbeitsansichten (ruhig, dicht, schnell; kein Signaturmoment; Wechsel schlicht, `data-kein-verlegen`): `/kontakt`, `/termin`, `/preise`, `/bad/badanfrage`, `/bad/badplaner`, `/bad/projekt-check`, `/fliesen/konfigurator`, `/login`, `/downloads`, Rechtstexte `/impressum`, `/datenschutz`, `/agb`, `/widerruf`, `/cookie-richtlinie`, `/barrierefreiheit`.

### Informationsarchitektur (alt K-009)
- **Navigation** (fünf Hauptpunkte, je höchstens eine Aufklappebene, kein Thema doppelt), bestätigt im Baumtest E1-PROBE-IA (`berichte/E1-PROBE-IA-baumtest.json`: 5 von 5 Personen ziehen sie vor, 25 von 25 Aufgaben gefunden):
  1. **Bad** → `/bad`: Bad komplett erneuern (`/bad/badsanierung`) · Dusche statt Wanne (`/bad/barrierefreies-bad`) · Große Fliesen im Bad (`/bad/fliesen`) · Alles aus einer Hand (`/bad/bad-aus-einer-hand`) · Ideen nach Badgröße (`/bad/musterbaeder`; „Beispielbäder“ wurde im Baumtest mit echten Arbeiten verwechselt)
  2. **Böden und Wände** → `/leistungen/wohnen`: Küche (`/fliesen/kueche`) · Flur und Diele (`/fliesen/flur-diele`) · Neubau (`/fliesen/neubau`) · Treppen (`/treppen`) · Naturstein (`/naturstein`) · Reparatur und Fugen (`/fliesenreparatur`)
  3. **Balkon und Terrasse** → `/balkon-terrasse`: Balkon erneuern (`/balkon-terrasse/balkonsanierung`) · Terrassenplatten (`/balkon-terrasse/terrassenplatten`) · Platten auf Stelzen (`/balkon-terrasse/stelzlager`)
  4. **Unsere Arbeiten** → `/referenzen` (ohne Aufklappmenü)
  5. **Über uns** → `/ueber-uns`: Deniz Tezgel und Team (`/ueber-uns`) · Wo wir arbeiten (`/standorte`) · Ablauf und Kosten (`/preise`) · Ratgeber (`/blog`) · Fragen und Antworten (`/faq`) · Kontakt (`/kontakt`)
  - Immer sichtbar: Hauptknopf „Termin vor Ort anfragen“ → `/kontakt` und Telefon (06441 / 44 83 567; mit voller Navigation ab 80 rem Kopfbreite als Feld mit der Nummer im Namen und im Hinweis, die Nummer selbst steht im ersten Bildschirm jeder Seite, E-030); am Desktop ab lg dazu der WhatsApp-Knopf (F-10); mobil zusätzlich die untere Leiste (Anrufen · WhatsApp · Termin).
  - Nicht im Kopf, aber im Fuß und in den Seiten: Fachthemen (`/fliesen` und Unterseiten, `/untergrund-abdichtung` und Unterseiten, `/leistungen`, `/leistungen/[id]`), Werkzeuge, Ausstellung, Team, Unternehmen, Karriere, Partner, Förderung, Downloads, Rechtliches.
  - Aktuelle Seite: Laserlinie unter dem Hauptpunkt und `aria-current="page"`. Mobilmenü passt auf 360 × 740 ohne Scrollen und bei 200 % Systemschrift auf 390 px alle fünf Punkte im ersten Bild, auf 360 px drei mit dem Hinweis „Mehr darunter“ (fünf Punkte als Liste, Unterpunkte aufklappbar, Unterzeilen nur ab 20 rem Blattbreite, Hauptknopf fest unten im Blatt, Anrufen und WhatsApp am Ende der Liste; E-023, E-026).
- **Seitenarten:** Erzählseiten (`/`, `/bad` und Bad-Unterseiten ohne Werkzeuge, `/leistungen`, `/leistungen/[id]`, `/balkon-terrasse`, `/naturstein`, `/treppen`, `/fliesenreparatur`, `/schadensanalyse`, `/referenzen`, `/ueber-uns`, `/unternehmen`, `/team`, `/karriere`, `/partner`, `/ausstellung/*`) inszenieren; Wissensseiten (`/fliesen` und Unterseiten außer Konfigurator und Festpreisangebot, `/untergrund-abdichtung` und Unterseiten, Unterseiten von Balkon, Naturstein und Treppen, `/blog` und Artikel, `/faq`, `/foerderung`, `/bad/musterbaeder` und Unterseiten) erklären ruhig; Ortsseiten (`/standorte`, `/standorte/[stadt]`, `/leistungen/[id]/[stadt]`); Arbeitsseiten (`/kontakt`, `/termin`, `/beratung`, `/preise`, `/downloads`, `/login`, `/bad/badanfrage`, `/bad/badplaner`, `/bad/projekt-check`, `/fliesen/konfigurator`, `/fliesen/festpreisangebot`, Rechtstexte, 404) sind ruhig, dicht und schnell. Maschinenfassung: Regel in `werkzeuge/lesbarkeit.mjs`.
- **Seitenformel** (Erzähl-, Wissens- und Ortsseiten): 1 Worum es geht (H1 in Alltagssprache, ein bis zwei Sätze) · 2 Ihre Lage · 3 Was wir tun · 4 So läuft es ab · 5 Beleg (Fotos und Stimmen) · 6 Nächster Schritt (die eine Hauptaktion der Seite, K-004). Baustein `Seitenformel` mit sechs benannten Abschnitten.
- **Anfrage:** Hauptweg „Termin vor Ort anfragen“ = Formular der vorhandenen Logik `HeroContactForm` (Pflicht Name und Telefon, Ziel `general`, Empfänger unverändert) oben auf `/kontakt` und einmal unten auf der Startseite; daneben Anruf und WhatsApp. Werkzeuge (Badanfrage, Projektcheck, Konfigurator, Preisrechner, Kalender) bleiben als „Hilfen“ erreichbar und konkurrieren nicht (E-012).
- **Erstes Bild:** Logo, H1, Ort, Hauptknopf, Telefon oder WhatsApp vollständig im ersten Bildschirm jeder Hauptansicht in jeder Gerätegröße; Handy quer: Kopf und Leisten ≤ ein Viertel der Höhe.
- **Orientierung:** Brotkrumen ab der zweiten Ebene (sichtbar und als `BreadcrumbList`); 404 mit verrutschter Fliese und den Wegen Startseite, Termin anfragen, Anrufen; Fuß als vollständige, geordnete Übersicht aller Bereiche.

## K-011 Ton und Mikrotexte
- **Erzählbogen:** Sie haben ein Bad, einen Boden oder einen Balkon, der nicht mehr passt, und wissen nicht, wo Sie anfangen sollen. Deniz Tezgel kommt aus Aßlar zu Ihnen, schaut sich alles an, erklärt in einfachen Worten, was zu tun ist, und verlegt mit seinem Team Fliese für Fliese. Fotos fertiger Arbeiten und die Worte unserer Kunden zeigen, wie das am Ende aussieht.
- **Ton:** Sie-Anrede, wir-Form, warm, ruhig, selbstbewusst; kurze Sätze; konkrete Dinge statt Adjektive; Zahlen nur aus K-015.
- **Schreibregeln** (gemessen mit `werkzeuge/lesbarkeit.mjs` über die gerenderte Seite): Flesch nach Amstad ≥ 60 (Erzähl- und Ortsseiten), ≥ 50 (Wissensseiten); mittlere Satzlänge ≤ 14 Wörter; kein Satz über 25 Wörter; Absätze ≤ 4 Sätze; jedes Glossarwort beim ersten Vorkommen je Seite mit Alltagserklärung ≤ 15 Wörter (Baustein `Fachwort`), Normen nur mit ihrem Nutzen; kein Gedankenstrich und kein Bindestrich als Gedankenstrich in sichtbarem Text, Alt-Texten, Titeln, Beschreibungen und Bedienbeschriftungen; Zeitspannen mit „bis“, Maße ohne Kette; Titel ≤ 60 Zeichen, Beschreibung 120 bis 155; Suchbegriffe aus `adressen-e0.csv` bleiben natürlich im Text; Ortsseiten unterscheiden sich nur durch echte Angaben; Kundenstimmen wörtlich, gekürzt nur mit „…“. Ausgenommen: Rechtstexte und wörtliche Stimmen (`data-zitat`).
- **K-010-B · erlaubte Bindestrichwörter** (Maschinenfassung `regeln/bindestrich-erlaubt.json`): E-Mail (Rechtschreibung) · Gäste-WC (Rechtschreibung, Abkürzung) · Lahn-Dill-Kreis (Eigenname) · Marburg-Biedenkopf (Eigenname) · Limburg-Weilburg (Eigenname, Landkreis) · WhatsApp-Nachricht nicht nötig („Nachricht per WhatsApp“) · Cookie-Richtlinie und Cookie-Einstellungen (Rechtstext und Bedienbeschriftung der Einwilligung, G8) · Normbezeichnungen mit Teilnummer („DIN 18040-2“, E-057) · „Walk-in-Dusche“ nur, wo sie Suchbegriff der Seite ist (Rechtschreibung bei englischem Bestandteil), sonst „bodengleiche Dusche“.
- **K-010-F · Floskeln und KI-Spuren** (Maschinenfassung `regeln/floskeln.json`): nahtlos, ganzheitlich, maßgeschneidert, Entdecken Sie, Ihr Partner für, höchste Qualität, Perfektion, von A bis Z, rundum sorglos, nicht nur … sondern auch, erstklassig, innovativ, Traumbad; keine Dreierketten von Adjektiven, keine Überschriften „Begriff: Erklärung“, kein Stakkato („Dicht. Sauber. Termintreu.“).
- **Ersetzungen im Bestand:** „Vor-Ort-Aufmaß“ → „Termin bei Ihnen vor Ort“ (in Knöpfen „Termin vor Ort anfragen“); „Walk-In-Dusche“ → „bodengleiche Dusche“ (außer Suchbegriff); „XXL-Fliesen“ → „große Fliesen“; „2-cm-Platten“ → „2 cm starke Platten“; „Fachgewerke“ → Bereichsnamen der Navigation.
- **Mikrotexte:** Hauptknopf „Termin vor Ort anfragen“; Telefon „Anrufen: 06441 / 44 83 567“; WhatsApp „Nachricht per WhatsApp“; Absenden „Anfrage senden“ (bestehender Text bleibt, wenn Tests ihn prüfen); Laden „Wird gesendet …“; Erfolg aus dem Bestand.
- v4 (AUFTRAG.md Abschnitt 0 TEXTE): Mikrotexte (Knöpfe, Beschriftungen, Hinweise, Cursor-Beschriftungen, Fehlermeldungen, Bewegungsschalter) ändere ich direkt; alle übrigen Texte nur als Vorschlag in `TEXTVORSCHLAEGE.md`. Die Texte des Vorlaufs sind abgenommen und gelten als Bestand.

## K-012 Budgets
- Gerätegrößen (10) aus `HAUPTANSICHTEN.json`. Mobil eigene Komposition; kein seitliches Scrollen; Fließtext ≥ 16 px; Touchziele ≥ 44 × 44; sichere Ränder (`env(safe-area-inset-*)`); Vollbildhöhen mit `svh`/`dvh`; Kopf verdeckt keine Anker (`scroll-padding-top`); Systemschrift 200 % lesbar und bedienbar (untere Leiste unter 20em: Anrufen und Termin mit Wort, WhatsApp tritt zurück, E-036); Handy quer: Kopf und Leisten ≤ ¼ der Höhe, Variante `flach:` (Querformat, Höhe ≤ 32rem) für einen dichteren ersten Bildschirm (E-036); große Bildschirme mit begrenzter Textbreite.
- Budgets (mobil, Median aus 3, frisches Profil, mit Intro): LCP ≤ 2,5 s · CLS ≤ 0,1 · TBT/INP ≤ 200 ms · Lighthouse mobil Leistung ≥ 90, Zugänglichkeit ≥ 95, Best Practices ≥ 95, SEO 100 · zusätzlicher Code für Bewegung (B-01, B-02, große Momente) ≤ 60 KB gzip · Startbild mobil ≤ 200 KB · Icon ≤ 1,5 KB · Zeichnung ≤ 40 KB gzip. Besserer E0-Wert gilt.
- v4 (AUFTRAG.md Abschnitt 0, strengerer Wert gilt): Lighthouse mobil ≥ 90 · LCP ≤ 2,5 s · CLS ≤ 0,1 · INP ≤ 200 ms · TBT ≤ 200 ms · JavaScript für Bewegung im ersten Laden ≤ 60 KB gzip, nachgeladene Szenen einer Erzählansicht zusammen ≤ 120 KB gzip · Schriften ≤ 250 KB (Bestand 71 KB) · Icon-SVG ≤ 1,5 KB je Icon · Illustrations-SVG ≤ 40 KB gzip; keine Hauptansicht schlechter als in E0 des Laufs (`belege/um-e0/`) um mehr als die Spanne der drei Läufe.
- Gerätegrößen: 390 × 844, 768 × 1024, 1440 × 900, 1920 × 1080 (Pflicht); die zehn Größen des Vorlaufs für Darstellungsprüfungen.

## K-013 Glossar (Alltagserklärung ≤ 15 Wörter)
Maschinenfassung `src/config/glossar.ts` (Quelle) und `regeln/glossar.json` (Prüfung). Erklärung steht beim ersten Vorkommen je Seite direkt dabei. Sie steht in Klammern in Größe und Farbe des Satzes (Baustein `kern/Fachwort`; E-061: graue Klammern unterbrachen den Lesefluss).

| Begriff | Erklärung |
|---|---|
| Abdichtung, Verbundabdichtung, AIV | Eine wasserdichte Schicht direkt unter den Fliesen, damit kein Wasser in Wand und Boden dringt. |
| DIN 18534 | Die Regel für Abdichtungen in Bad und Dusche. So kommt kein Wasser in die Wände. |
| DIN 18040 | Die Regel für barrierefreies Bauen: ohne Stufen, mit genug Platz zum Bewegen. |
| DIN 18157 | Die Regel, wie Fliesen im Kleberbett fest und dauerhaft verlegt werden. |
| barrierefrei, barrierearm | So gebaut, dass man es auch mit Rollator oder Rollstuhl gut nutzen kann. |
| bodengleiche Dusche, Walk-in-Dusche | Eine Dusche ohne Stufe, auf gleicher Höhe wie der Boden im Bad. |
| C2TE S1, Kleberklasse | Gibt an, wie fest ein Fliesenkleber hält und wie gut er nachgibt. |
| Stelzlager | Kleine Füße, auf denen Terrassenplatten liegen. Regen läuft darunter ab. |
| Rutschhemmung, R9, R10, R11 | Wie rutschfest eine Fliese ist. Je höher die Zahl nach dem R, desto sicherer. |
| EN 16165 | Ein Prüfverfahren dafür, wie rutschfest ein Bodenbelag ist. |
| Nivelliersystem | Kleine Klemmen, die große Fliesen beim Verlegen genau auf eine Höhe bringen. |
| Vakuumhebetechnik | Saugheber, mit denen wir sehr große Fliesen sicher anheben und ablegen. |
| Untergrund | Alles, was unter der Fliese liegt, zum Beispiel Estrich, Putz oder alte Fliesen. |
| Estrich, Heizestrich, Calciumsulfatestrich | Die glatte Schicht auf dem Rohboden, auf die später die Fliesen kommen. |
| Belegreife, Restfeuchte, CM-Messung | Wir messen, ob der Estrich trocken genug ist, damit die Fliesen sicher halten. |
| Ausgleichsmasse | Eine flüssige Masse, die Unebenheiten im Boden glättet, bevor wir fliesen. |
| Entkopplung | Eine Matte unter den Fliesen, die kleine Risse im Untergrund abfängt. |
| Drainage | Eine Schicht, durch die Wasser unter dem Belag abfließen kann. |
| Gefälle | Der Boden neigt sich leicht, damit Wasser von selbst zum Ablauf fließt. |
| Feinsteinzeug | Sehr harte, dichte Fliesen, die kaum Wasser aufnehmen und lange halten. |
| Großformat | Große Fliesen, zum Beispiel 120 × 260 cm. Es gibt dann weniger Fugen. |
| Kuvertschnitt | Die Fliesen sind schräg zum Ablauf geschnitten, damit das Wasser gut abläuft. |
| Gehrung | Zwei Fliesenkanten sind schräg geschnitten und bilden an der Ecke eine saubere Kante. |
| Silikonfuge | Die weiche Fuge in Ecken und an Wanne oder Dusche. |
| Epoxidharz | Ein sehr fester Kunststoff für Fugen, die viel aushalten müssen. |
| Haftbrücke, Grundierung | Ein Anstrich auf dem Untergrund, damit Kleber oder Spachtel gut halten. |
| Dichtband, Dichtmanschette | Bänder und Stücke, die Ecken, Rohre und Abläufe in der Abdichtung dicht machen. |
| Duschrinne | Ein schmaler, langer Ablauf im Boden der Dusche. |
| Punktablauf | Ein kleiner, quadratischer Ablauf im Boden der Dusche. |
| Vorwand | Eine vorgesetzte Wand, in der Rohre und der Spülkasten verschwinden. |
| Trockenbau | Wände aus Platten statt aus Stein, zum Beispiel für Vorwände und Nischen. |
| Imprägnierung | Ein Schutzmittel, das Naturstein vor Flecken und Wasser schützt. |
| Ausblühung | Weiße Flecken auf Platten oder Fugen, die durch Wasser im Untergrund entstehen. |
| Dünnbett, Mittelbett, Mörtelbett | Wie dick die Kleberschicht unter der Fliese ist: dünn, mittel oder dick. |
| Buttering | Wir streichen Kleber zusätzlich auf die Rückseite der Fliese, damit sie voll aufliegt. |
| Passstück | Eine zugeschnittene Fliese am Rand einer Fläche. |
| Fugenachse, Fugenraster | Die Linien, die die Fugen über die ganze Fläche bilden. |
| Überzähne | Fliesenkanten, die höher stehen als die Nachbarfliese. |
| Blockstufe | Eine Treppenstufe aus einem massiven Stück. |
| Rissverharzung | Risse im Estrich werden mit Harz gefüllt und dauerhaft verschlossen. |
| Randfuge | Ein schmaler Spalt am Rand, damit sich der Boden bewegen kann. |
| Sinterschicht | Eine dünne, feste Haut auf neuem Estrich, die wir vor dem Fliesen abschleifen. |
| Klopfprobe | Wir klopfen auf die Fliesen. Klingt es hohl, hält die Fliese nicht mehr. |
| Bodenrost | Ein Gitter vor der Tür, unter dem Regenwasser abläuft. |
| Schadensanalyse | Wir suchen vor Ort die Ursache eines Schadens, bevor wir etwas reparieren. |
| Wassereinwirkungsklasse (W0-I bis W3-I) | Gruppe einer Fläche danach, wie viel Wasser auf sie trifft, von wenig bis sehr viel. |

## Anhang F · Faktenblatt (alt K-015; nur diese Fakten; Fundstellen im Code)
| Nr | Fakt | Fundstelle |
|---|---|---|
| F-01 | Firma „Fliesenverlegung Tezgel“ | `src/config/company.js:8` |
| F-02 | Inhaber Deniz Tezgel, „Inhaber & Fachbetriebsleiter“ | `company.js:10-14` |
| F-03 | Hohwardstraße 14, 35614 Aßlar, Hessen | `company.js:19-24` |
| F-04 | Telefon 06441 / 44 83 567 · Mobil und WhatsApp 0172 / 67 28 504 · Fax 06441 / 44 83 548 · info@tezgel.de | `company.js:25-32` |
| F-05 | Eingetragener Handwerksbetrieb bei der Handwerkskammer Wiesbaden (Fliesen-, Platten- und Mosaiklegerbetrieb) | `company.js:52-60` |
| F-06 | Gründung und Eintragung 2008 in Aßlar | `company.js:95`, `:225` |
| F-07 | Öffnungszeiten Mo bis Do 7:30 bis 18 Uhr, Fr 7:30 bis 17 Uhr, Sa 8 bis 14 Uhr nur nach Vereinbarung **[A, M-03: Fr 17 oder 18 Uhr]** | `company.js:121-126` (gegen `:128`) |
| F-08 | Leistungen: Bad (Sanierung, bodengleiche Duschen, barrierefreie Bäder), große Fliesen, Wohnräume, Neubau, Küchen, Treppen, Balkon und Terrasse (auch auf Stelzlagern), Untergrund und Abdichtung, Naturstein, Fliesenreparatur, Schadensanalyse | `company.js:69-76`, `src/config/topics.js` |
| F-09 | Einsatzgebiet: 13 Orte mit Entfernung (Bezug Wetzlar Stadtmitte): Wetzlar 0, Aßlar 5, Solms 8, Braunfels 10, Herborn 20, Gießen 25, Dillenburg 25, Haiger 30, Limburg 35, Butzbach 35, Marburg 40, Bad Nauheim 40, Friedberg 45 km; dazu Ehringshausen, Hüttenberg, Lahnau; Radius 45 km **[A, M-04: Bezugspunkt und Radius]** | `src/config/cities.ts`, `company.js:79-93`, `src/lib/maps/getMapEmbedUrl.ts:35` |
| F-10 | Google 5,0 bei 27 Rezensionen; Trustlocal 9,6 von 10 bei 25; Stand September 2026; 16 wörtliche Stimmen | `src/config/reviews.js:9-27`, `:29-153` |
| F-11 | Ablauf in drei Schritten: Planung und Aufmaß vor Ort · Material und Fugenbild · Ausführung und Abnahme | `company.js:196-214` |
| F-12 | Der Termin vor Ort (Aufmaß und Schadensanalyse) ist kostenfrei | `company.js:154`, `src/lib/config.ts:166` |
| F-13 | Persönliche Betreuung durch Deniz Tezgel, ein fester Ansprechpartner von der ersten Skizze bis zur Abnahme | `company.js:184-186` |
| F-14 | Team: Inhaber und Verlegeteam; keine Zahl nennen **[A, M-05: 5 oder bis zu 12]** | `company.js:219-220` |
| F-15 | 2014 Schwerpunkt große Fliesen (Schneid- und Vakuumhebetechnik); 2019 Abdichtung nach DIN 18534 als Standard | `company.js:228-236` |
| F-16 | Fliesenkleber der Klassen C2-TE-S1/S2, verfärbungsfreie Fugenmassen | `company.js:179` |
| F-17 | Staubschutz bei bewohnten Räumen: Staubschutzwände oder -türen, Luftreiniger, Schutzabdeckungen; besenreine Übergabe | `company.js:145-147`, `:175-176` |
| F-18 | Fliesenberatung in Wetzlar und Gießen nach Terminvereinbarung (ohne Adresse) | `ausstellung/*/page.jsx` |
| F-19 | Motto: „Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“ | `company.js:65` |
| F-20 | Große Fliesen bis 120 × 260 cm **[A, M-06: 260 oder 278 cm]** | `src/components/pricing/pricing.constants.ts:52` (gegen `services.js:23`) |
| F-21 | Gefälle auf Balkon und Terrasse mindestens 1,5 bis 2 % | `src/config/services.js:91` |
| F-22 | Rutschhemmung R10 und R11 je nach Raum | `company.js:207` |
| F-23 | Förderung laut Bestand: Pflegekasse bis zu 4.180 € je Person; KfW 159; Handwerkerbonus 20 % bis 1.200 € je Jahr (nur sinngleich übernehmen) | `foerderung/page.jsx:28`, `:46`, `preise/page.jsx:219` |
| F-24 | Instagram-Profil `fliesenverlegung_tezgel` | `company.js:113` |
| F-25 | Barrierefreies Bad: Planung nach DIN 18040-2; Zuschuss der Pflegekasse ab Pflegegrad 1 bis 4.180 € je Person, bei zwei Personen mit Pflegegrad bis 8.360 € (sinngleich) | `src/app/(bestand)/bad/barrierefreies-bad/page.jsx:27-28`, `:50`, `:91` |
| F-26 | Landkreis je Ort (Feld `region`): zum Beispiel Wetzlar im Lahn-Dill-Kreis, Gießen im Landkreis Gießen | `src/config/cities.ts:16`, `:24` und folgende |
| F-27 | Bodengleiche Dusche mit Gefälle zum Ablauf (ohne Zahl) | `src/app/(bestand)/bad/page.jsx:46` |
| F-28 | Bezeichnung „Fachbetrieb“ („Eingetragener Fachbetrieb der HWK Wiesbaden“); Region „Mittelhessen“ | `src/config/company.js:61`, `:84` |
- **Versprechen mit rechtlicher Bindung** (bleiben sinngleich, nie verschärft, Bestätigung M-07): verbindlicher Festpreis bzw. Festpreisangebot · Rückruf „innerhalb von 24 Stunden“ (HeroContactForm, Schnellanfrage, FinalCTA, Ortsseiten) gegen „binnen 24 bis 48 Stunden“ (Konfigurator, Express-Anfrage, Projektcheck) · Staubschutz-Garantie · „Feste Zusagen für Baustart und Fertigstellung“ · kostenfreier Termin vor Ort · „100 % unverbindlich“. Regel bis zur Antwort: jedes Formular behält seine eigene Zusage; neue Texte nennen keine Frist, sondern „Deniz Tezgel ruft Sie zurück“.
- **Allgemeines Fachwissen** (E-027): Wie ein Material aussieht, wofür ein Verlegemuster passt, wozu eine Schicht dient, darf auf Wissens- und Erzählseiten stehen, ohne Zahl und ohne Zusage. Zahlen, Zusagen und Aussagen über den Betrieb nur aus diesem Faktenblatt.
- **Nicht verwenden** (nicht belegt): Meisterbrief oder „Meisterbetrieb“, Zahl der Mitarbeitenden, „über 15 Jahre“, Zertifikate, Partnerstatus der Marken, Projektorte zu Fotos, Dauer einer Badsanierung.

## Brückentabelle der Kennungen (v3.6 → v4.0)
| alt (v3.6, Vorlauf) | neu (v4.0) |
|---|---|
| K-001 Leitidee | K-001 |
| K-002 Personen und Hauptaufgaben (A1 bis A6) | K-002 (fünf Aufgaben; A6 in A1) |
| K-003 Gestaltungsprinzipien | K-003 |
| K-004 Stack und Konventionen | K-004 |
| K-005 Designsystem | K-005 |
| K-006 Typografie und Komposition | K-006 |
| K-007 Bewegungssystem und Register (B-01, B-02) | K-008 |
| K-008 Formsystem | K-009 |
| K-009 Informationsarchitektur | K-010, Unterabschnitt Informationsarchitektur |
| K-010 Ton, Erzählbogen, Schreibregeln | K-011 |
| K-011 Glossar | K-013 |
| K-012 Bildregeln | K-006, Unterabschnitt Bildregeln |
| K-013 Geräte und Budgets | K-012 |
| K-014 Adressen und Suchmaschinen | K-004, Unterabschnitt Adressen |
| K-015 Faktenblatt | Anhang F |
| K-016 Ruhe | K-003 Prinzip 8 und Ruhe-Regeln |
- Verweise in Code-Kommentaren und Werkzeugen (zum Beispiel `lesbarkeit.mjs` auf K-010 und K-011) meinen die alte Zählung; sie bleiben über diese Tabelle gültig und werden nur bei sowieso fälligen Änderungen der Datei nachgezogen.

## Markierte Annahmen
F-07, F-09, F-14, F-20 und die Versprechen bis zur Antwort (MENSCHEN.md); Herkunft einzelner Fotos (M-08).
- v4: Zielgruppe, GESCHMACK und UNANTASTBAR sind aus dem Vorlauf abgeleitet (STATUS.md, Abschnitt Einstellungen).

## Änderungsprotokoll
- v3.6 (25.10.2026, E-047): K-016 Ruhe (Einstieg mittig, Bilder vollständig, Karussells, weniger Text, Firmendaten nur an drei Orten); Register `karussell`; Startseite danach umgebaut (E3-RUHE-01); Register nachgezogen nach der Gegenprüfung (Zeilen `karussell` und `glasbild`, `startbild` auf allen Breiten, SIG-1 und `sig-plan` nicht mehr auf `/`, B-01 v3: 6 bis 7 Fliesen je Reihe, Kaskade über den ganzen Schlag, Abnehmen `ease-setzen`).
- v3.5 (24.10.2026, E-045): große Momente gebaut (E3-GRAF-01 bis 09); Regel zu `data-motion` am Behälter; Registerzeilen genauer (Dauer, Kurve, Zurück/Vor); formatregler ohne Fugenmeter, vorher-nachher mit Lot in Tinte als eigener Abschnitt.
- v3.4 (24.10.2026, E-044): Vorlagen tragen die SVG-Bewegungen (Planblatt-Einstieg mit SIG-1, Wissensseiten mit Plan „zeigen“, Ortsseiten mit Einzugsband im Schlitz); Verzögerung hinter dem Intro auf jeder Seite (`k-intro-sig`), Geometrie an `/` (`k-intro-start`); Startseite über die Vorlage ErzaehlSeite; K-012 Ladevorrang nach E-037/E-041 nachgezogen.
- v3.3 (24.10.2026, E-043): B-01 „Fliese für Fliese“ (Entscheidung des Auftraggebers): ganze Seite Fliese für Fliese von rechts belegen, dann einzeln abnehmen, 1800/1400 ms; Kalk neutral #F4F4F5; Wartelinie in `strich`; Token `ease-aufsetzen`, `ease-wind` entfällt.
- v3.2 (24.10.2026, E-042): B-01 als „Wind“ (Entscheidung des Auftraggebers): Band aus Fliesen weht über die Seite, alte Seite davor, neue dahinter; Token `ease-wind`.
- v3.1 (24.10.2026, E-037): SVG-Bewegungen aus v2 und Plan-Morph zurück (Entscheidung des Auftraggebers), Planblatt im Einstieg von `/`, Plan-Vignetten in den Bereichsfliesen, Rauschtextur der Fliesen in B-01 (einmal gerastert), startbild über Sichtbarkeit.
- v3.0 (23.10.2026, E1): neue Leitidee „Klar verlegt“ aus dem Auftrag „Verständlich, echt, ausgezeichnet“; Personen P1 bis P5 mit Aufgaben A1 bis A6; Prinzipien neu; Fliesenskala als Lesart der v2-Abstände; Schatten-, Ebenen-, Dauer- und Kurvenstufen ergänzt; Register mit B-01, B-02 und neun großen Momenten, sieben v2-Einträge entfallen; Navigation mit fünf Hauptpunkten; Seitenarten und Seitenformel; Schreibregeln, K-010-B, K-010-F, Glossar; Bildregeln; Faktenblatt.
- 4.0 (27.10.2026, E1 Lauf „Universal Motion“, E-066, E-067): Gliederung nach AUFTRAG.md Abschnitt 10 mit Brückentabelle; fünf Hauptaufgaben; Ruhe als Prinzip 8; neu K-007 Signatur-Satz, K-010 Komponenten, Zustände und Ansichtsarten; Regeln v4 für Bewegung, Eingang, B-01, Scrollen, Cursor, SVG, Designsystem und Budgets.
