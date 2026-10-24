# KERN · Lauf „Verständlich, echt, ausgezeichnet“ · Version 3.3

Stand 24.10.2026, E1. Quelle der Wahrheit für alle Pakete. Hervorgegangen aus KERN v2 „Verlegeplan“ (`archiv/2026-10-werkstatt/KERN.md`): Werte und Bausteine von v2 gelten weiter, soweit dieser Kern sie nicht ändert. Über dem Kern stehen Grenzen und Leitplanken, Bestand und Adressen, Verständlichkeit, Zugänglichkeit und Leistung und die Abnahmeliste (Auftrag Abschnitt 4). **[A]** = Annahme (offen in MENSCHEN.md). Jedes Paket nennt die Kern-Version, gegen die es gebaut wurde.

## Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## K-001 Leitidee
**Klar verlegt: Jede Seite legt dem Kunden eine Sache nach der anderen hin, Fliese für Fliese, im festen Fugenraster und an einer geraden Linie, bis das Ganze fertig daliegt wie ein Boden von Deniz Tezgel.**
- Herleitung: Der Anlass des Laufs ist Unverständlichkeit. Ein Fliesenleger schafft Ordnung, indem er eins nach dem anderen legt, im Verband, an einer Schnur oder Laserlinie, und am Ende sieht jeder sofort, ob es stimmt. Genau das braucht der Kunde: eine Sache je Schritt, in fester Reihenfolge, mit einer Linie, die führt. „Klar verlegt“ heißt gleichzeitig sauber gearbeitet und verständlich dargelegt.
- Folgen für jede Entscheidung: ein Gedanke je Block (eine Fliese); feste Reihenfolge nach der Seitenformel (Verband); Abstände aus Fliese und Fuge (Fugenraster); genau ein Versatz je Bildschirm als bewusster Bruch (Drittelverband); eine Laserlinie, die führt (Orientierung); Bewegung legt Dinge an ihren Platz und federt nie nach (Gummihammer); das Ergebnis zeigt sich in echten Fotos (fertig daliegen).
- Austauschprobe: Eine Bäckerei hat keinen Verband, keine Fuge, kein Gefälle und keine Laserlinie; ein Steuerbüro legt keine Fliesen. Seitenwechsel „Verlegen“, Intro „Logo zeichnet sich“, Schichtaufbau, Gefälle und Verlegemuster bestehen die Probe einzeln (Register K-007).

## K-002 Personen und Hauptaufgaben
- Marke: Fliesenverlegung Tezgel, Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar; eingetragen bei der Handwerkskammer Wiesbaden seit 2008 (K-015). Gefühl: ruhige Sorgfalt, ehrliches Handwerk, persönlich.
- Personen für Probeläufe (Auftrag Abschnitt 6), mit Ort für A6 und Standardgerät:
  - P1 Rentnerin, 72, will die Wanne durch eine bodengleiche Dusche ersetzen · Solms · m390 mit Systemschrift 200 %.
  - P2 junge Familie im Neubau, ganzes Haus fliesen · Gießen · t768.
  - P3 Vermieter, einzelne gesprungene Fliese und alte Fugen im Flur · Herborn · m360.
  - P4 Hausbesitzer, auf dessen Balkon Wasser steht · Braunfels · d1280.
  - P5 Kunde mit Deutsch als Zweitsprache, will einfach einen Termin · Limburg · m390.
  - Jede Person läuft zusätzlich in der anderen Gerätegruppe (mobil ↔ d1440).
- Hauptaufgaben: A1 in einem Satz sagen, was der Betrieb macht und wo · A2 Telefon oder WhatsApp finden · A3 einen Termin vor Ort anfragen, bis vor den Absendeknopf · A4 Bilder fertiger Arbeiten zur eigenen Lage finden · A5 verstehen, wie der Ablauf ist und ob der Termin vor Ort etwas kostet · A6 herausfinden, ob der Betrieb in einem bestimmten Ort arbeitet.
- Werkzeug: `_werkstatt/werkzeuge/probelauf.mjs`, Protokoll `werkzeuge/PROBELAUF.md`. Hauptansichten: `HAUPTANSICHTEN.json` (fest seit E0).

## K-003 Gestaltungsprinzipien
1. **Eine Fliese, ein Gedanke.** *Tun:* jeder Block trägt eine Aussage; jede Seite hat genau einen Hauptknopf; kurze Sätze, konkrete Dinge. *Lassen:* Sammelkarten mit drei Botschaften, Werbezeilen, Etiketten über jeder Überschrift.
2. **Erst die Lage, dann die Lösung.** *Tun:* Seiten beginnen bei der Situation des Kunden und folgen der Seitenformel (K-009). *Lassen:* Leistungskataloge als Einstieg, Fachbegriffe vor dem Nutzen.
3. **Echt zeigen.** *Tun:* echte Fotos als Hauptbild jeder Erzählseite; Zeichnungen erklären, was ein Foto nicht zeigen kann (Schichtaufbau, Gefälle, Verband). *Lassen:* generierte oder fremde Bilder, Symbolfotos, Text auf Bildern, Bildfilter.
4. **Fugenraster mit Versatz.** *Tun:* Abstände und Größen aus der Fliesenskala (K-005); Flächen stoßen mit einer Fuge aneinander; je Bildschirmhöhe genau ein Versatz um ein Drittel (Drittelverband) als bewusster Bruch. *Lassen:* freie Abstände, schwebende Karten mit Schatten, gleichförmige Kartenraster, drei gleich gebaute Abschnitte in Folge.
5. **Eine Linie führt.** *Tun:* die rote Laserlinie trennt, führt und markiert den aktuellen Ort (Navigation, Fortschritt, Schrittfolge); Rot sonst nur für Fehler. Der Hauptknopf ist eine tintendunkle Fläche. *Lassen:* rote Flächen, Verläufe, Leuchteffekte, Orange außerhalb des Logos.
6. **Bewegung legt, nie schwebt.** *Tun:* Dinge kommen kurz und fest an ihren Platz wie eine Fliese unter dem Gummihammer; jede Bewegung hat einen Zweck aus dem Register. *Lassen:* Federn, Schweben, Endlosschleifen, hochzählende Zahlen, Nachlauf-Cursor.
7. **Ruhige Hand auf Arbeitsseiten.** *Tun:* Formulare dicht, beschriftet, mit allen Zuständen; ein Weg je Aufgabe; nur Rückmeldung und Zustandswechsel. *Lassen:* Inszenierung, mehrere Formulare im selben Bildschirm.

## K-004 Stack und Konventionen
- Gilt aus v2 weiter (`archiv/2026-10-werkstatt/KERN.md` K-004): Next.js 16.3.6 App Router (Next liefert sein eigenes React 19.3 Canary aus), Tailwind 4.3 mit `@theme static` in `src/app/globals.css` als einziger Token-Quelle, Palette gesperrt (`--color-*: initial`), TypeScript strict mit `allowJs`, Seiten `src/app/(bestand)/**/page.(jsx|tsx)`, Daten in `src/config/*`, Telefon, Adresse und Öffnungszeiten nur aus `COMPANY_DATA`; keine Beliebigwerte, keine Hex-Werte im Code, kein Inline-`style` außer CSS-Variablen; Schriften `next/font/local`; Icons über das Sprite `src/components/icons/`; Bewegung zentral in `src/lib/motion/`; Weiterleitungen in `next.config.ts` (308), 410 über `src/proxy.ts` und `src/lib/wege.ts`.
- Vor jeder Next-API-Nutzung die passende Seite in `node_modules/next/dist/docs/` lesen (AGENTS.md).
- Neu in v3:
  - Seitenwechsel B-01: `src/components/verlegen/` (Client-Komponente im Root-Layout `_dokument.tsx`, außerhalb von `main`; reine Logik in `src/lib/verlegen/` mit Tests in `test/`).
  - Intro B-02: `src/components/intro/Intro.tsx` (Ersatz „Der erste Boden“, E-019; mit Vektordatei später `logo-pfade.ts`), Ablauf `src/lib/intro/ablauf.ts`; Startschalter im Kopfskript `src/lib/motion/kopfskript.ts`.
  - Bilder: Webfassungen unter `public/images/arbeiten/<raum>/<name>.jpg`, Bilddaten (Maße, Alt-Text, Platzhalter, Raum, Paar) in `src/config/arbeiten.ts`; Einbau nur über den Baustein `Bildfeld` (`next/image`).
  - Texte: Fachwörter nur über den Baustein `Fachwort` (`<dfn data-glossar>` plus Erklärung mit `data-erklaert`), Glossar maschinenlesbar in `src/config/glossar.ts` (gespiegelt in `_werkstatt/regeln/glossar.json`).
  - Erstes Bild: Die fünf Pflichtelemente tragen `data-erstes-bild="logo|ueberschrift|ort|hauptknopf|kontakt"`.
  - Hauptknopf: genau **eine Hauptaktion** je Seite. Alle Elemente mit `data-hauptknopf` einer Seite tragen dieselbe Beschriftung („Termin vor Ort anfragen“ oder seitengerechte Abwandlung aus K-010) und dasselbe Ziel; sie stehen im ersten Bildschirm (Kopf oder Einstieg, für „Erstes Bild“) und im Abschnitt 6 „Nächster Schritt“. Kein zweiter Knopf in Hauptform mit anderem Ziel (Prüfung in Z-11).
- Prüfwerkzeuge: `_werkstatt/werkzeuge` (EINRICHTUNG.md), Regeln für Texte in `_werkstatt/regeln/`.

## K-005 Designsystem
Alle Werte als Tokens in `globals.css`; neue Werte nur als Stufe einer Skala.

### Farbe (aus v2, unverändert bis auf Ergänzungen)
| Token | Hex | Einsatz |
|---|---|---|
| `kalk` | #F4F4F5 | Seitengrund (neutral, hell; seit E-043, vorher #F5F4F0 mit Farbton Gelb, OKLCH 95°) |
| `fliese` | #FFFFFF | Felder, Formulare, Fliesen im Seitenwechsel |
| `fuge` | #DDDEE2 | Fugen, Trennlinien (nur Deko, 1,22:1) |
| `strich` | #818698 | Ränder von Bedienelementen, Grafik (≥ 3:1) |
| `tinte-2` | #43485F | Nebentext (8,19:1 auf Kalk, 9,01:1 auf Fliese; vorher #4B5067 mit 7,22:1, E-040) |
| `tinte` | #0A1129 | Text, Hauptknopf, Fokus |
| `laser` | #D82020 | Laserlinie der Seiten (nicht im Seitenwechsel, E-043), Grafik, große Schrift (4,61:1 auf Kalk) |
| `laser-tief` | #A8171C | Rot als Text, Fehler (6,80:1) |
| `abnahme` | #1D6B3F | Erfolg mit Haken und Text |
| `nacht-2` | #A9AEC0 | Text auf Tinte-Flächen |
| `nacht-fuge` | #2B3352 | Fugen auf Tinte |
| **neu** `fliese-glanz` | #FFFFFF bei Deckkraft 0,55 als Ebene | Hauch Glanz auf Fliesen des Seitenwechsels (eigene Ebene, nur Deckkraft) |
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

### Dauern und Kurven
- `dauer-1` 140 ms Rückmeldung · `dauer-2` 320 ms Zustandswechsel · `dauer-3` 600 ms Auftritt · `dauer-4` 800 ms großer Auftritt · `dauer-5` 1200 ms großer Moment (aus v2). Staffel `--staffel` 60 ms, höchstens 8 Elemente.
- Neu: `--verlegen-gesamt` 1800 ms (erster Wechsel einer Sitzung) und `--verlegen-gesamt-folge` 1400 ms (seit E-043, Wahl des Auftraggebers; vorher 1200 und 900 ms); `--intro-gesamt` 1600 ms Ziel, 2200 ms Obergrenze. Werte nur aus diesen Variablen lesen.
- Kurven: `ease-setzen` cubic-bezier(0.2, 0.8, 0.2, 1) · `ease-laser` cubic-bezier(0.7, 0, 0.2, 1) · `ease-weg` cubic-bezier(0.32, 0, 0.67, 0) (aus v2) · **neu** `ease-hammer` cubic-bezier(0.3, 0.9, 0.35, 1) (schnell ankommen, ohne Überschwingen) · `ease-aufsetzen` cubic-bezier(0.5, 0, 0.75, 0) (B-01: schweben, dann hart aufsetzen, E-043) · `ease-linear` (Fortschritt, scrollgebunden).

## K-006 Typografie und Komposition
- Familien unverändert: Archivo (Anzeige Breite 74 %, Gewicht 760; Text 400/600) und IBM Plex Mono 400. MUT: Display deutlich größer und ruhiger; Mono nur noch für Telefonnummern, Maße und Zahlen im Fließtext, nicht mehr als Etikett über jeder Überschrift (Verständlichkeit).
- Skala `text-fs-1` bis `text-fs-7` aus v2 (fs-7 Zeilenhöhe 1,1 laut Code). Fließtext ist `text-fs-3` (17 bis 19 px), mobil nie unter 16 px; Zeilenhöhe 1,6; Zeilenlänge `max-w-mass` (66ch).
- Satz: `text-wrap: balance` für Überschriften, `pretty` für Absätze, Silbentrennung im Fließtext; Display am längsten Wort bei 360 px geprüft.
- Komposition: Einstieg links bündig an der Laserlinie, Foto rechts (Desktop) oder darunter (mobil, nach Hauptknopf und Telefon); auf `/` als Planblatt (E-037): Plan rechts an der Waage, Foto unter der Schnittkante, mobil Überschrift, Ort, Hauptknopf, Telefon, Vorspann, Plan, Bild; ein Blickfang je Bildschirmhöhe; Abschnitte wechseln Struktur und Dichte; je Bildschirmhöhe genau ein Versatz. Mobil ist eine eigene Reihenfolge: Überschrift, Ort, Hauptknopf, Telefon, dann Bild.

## K-007 Bewegungssystem und Register
- Haltung: Bewegung legt Dinge an ihren Platz. Technik: nur `transform` und `opacity` (einzige Ausnahme: `stroke-dashoffset` für das Zeichnen der Logo-Kontur in B-02, weil die Kontur sich zeichnen soll). Startzustände nur unter `html.k-bewegung` (Kopfskript aus v2); ohne JavaScript ist alles sichtbar; scrollgebundene Szenen per `animation-timeline` mit Ersatzzweig = Endzustand. Reduzierte Bewegung: Überblendung `dauer-2` oder Sofortzustand. Hover nur bei `(hover: hover) and (pointer: fine)`.
- Jedes animierte Element trägt `data-motion="<Kennung>"`; Maschinenfassung `_werkstatt/register.json`.

| Kennung | Zweck | Auslöser | Dauer · Kurve | Reduziert | Wo |
|---|---|---|---|---|---|
| **`verlegen`** (B-01 „Fliese für Fliese“, E-043) | Zusammenhang: Seitenwechsel | Klick auf internen Link; Zurück und Vor gespiegelt mit 70 % | gesamt 1800 ms (erster) bzw. 1400 ms (folgende): Belegen Fliese für Fliese von rechts (je Fliese `ease-aufsetzen`), Wechsel unter dem Boden, Abnehmen Fliese für Fliese von rechts (je Fliese `ease-weg`, zurück in den Hintergrund) | Überblendung 150 ms | global |
| **`intro`** (B-02) | Charakter: Logo zeichnet sich; bis zur Vektordatei Ersatz „Der erste Boden“ (E-018, E-019) | erster Besuch je Browser | Ersatz: Fläche 3 × 3 legt sich 80–624 ms (`ease-hammer`), Logo setzt sich 448–752 ms (`ease-setzen`), deckend bis 800 ms, Logo gleitet 800–1400 ms (`ease-setzen`), Reihen ziehen 800–1504 ms linear ab; alles Anteile von `--intro-gesamt` (1600 ms), Grenze 2200 ms | Kopf-Logo blendet in `dauer-2` ein, keine Schicht | jede Erstseite |
| `startbild` | Charakter: Startbild legt sich frei | Sichtbarkeit (IO 40 %, E-037), nur unter lg und ohne Intro; ab lg steht das Foto unter der Waage sofort frei | `dauer-4`, Fliesen ziehen im Drittelverband linear ab (E-036), Staffel ≤ 8 Spalten | Bild sofort sichtbar | `/` |
| `sig-kreuzlinie` (SIG-1, E-037) | Charakter: rote Waage und Lot wachsen aus dem Kreuzpunkt am Lot des Plans, die Waage knickt links ins Lot zur Leitachse; mobil wächst das Lot neben dem Text | Laden (CSS ab dem ersten Bild), mit Intro ab dem Freilegen (`--intro-gesamt` · 0,5) | `dauer-5` linear, Knick-Lot `dauer-2` danach, gesamt 1,52 s | Linien voll | `/` (Planblatt) |
| `sig-flucht` (SIG-1, E-037) | Hierarchie: die Zeilen der H1 rücken 12 px in die Flucht | Laden, mit Intro ab dem Freilegen | `dauer-4` · `ease-setzen`, Staffel 2/4/6 | Sofortzustand | `/` |
| `sig-plan` (E-037) | Orientierung: das Fugenbild des Verlegeplans rückt in die Flucht | Laden (`data-flucht="laden"`) bzw. Hover/Fokus, auf Touch IO 40 % (`zeigen`) | Laden `dauer-4` · `ease-setzen` nach `dauer-2`; Zeigen `dauer-3` | Raster in der Flucht | `/`, `/bad`, `/leistungen`, `/leistungen/[id]` |
| `seitenwechsel` (Plan-Morph, E-037) | Zusammenhang: derselbe Plan gleitet von der Übersicht in den Einstieg der Leistungsseite | Klick „Fachdetails“ (`data-uebergang="plan-vor"`, View Transition Typ plan-vor), nur ab lg bei erlaubter Bewegung und Browserunterstützung, sonst B-01 | Plan `dauer-4` · `ease-setzen`, Seite überblendet `dauer-2`, Kopf steht; nur vorwärts | B-01-Überblendung | `/leistungen` → `/leistungen/[id]` |
| `einzugsband` · `szene-ablauf` · `fugenband` (E-037) | Orientierung und Zusammenhang wie in v2 | Laden · Scroll · Scroll | wie v2 | Endzustand | `/standorte`, `/leistungen`, `/ueber-uns` |
| `schichten` | Zusammenhang: Was unter der Fliese steckt | Scroll (view-timeline) | linear an Scroll, je Schicht ein Satz | alle Schichten sichtbar | `/bad` |
| `weg` | Orientierung: Vom Anruf bis zur letzten Fuge | Scroll (view-timeline) | Laserlinie zieht von Station zu Station | Linie voll, alle Stationen | `/bad/badsanierung` |
| `gefaelle-dusche` | Zusammenhang: Wasser läuft zum Ablauf | Sichtbarkeit (IO 40 %) | Tropfen `dauer-5` linear, einmal | Pfeile statisch | `/bad/barrierefreies-bad` |
| `gefaelle-balkon` | Zusammenhang: Regen läuft vom Balkon ab | Sichtbarkeit (IO 40 %) | `dauer-5` linear, einmal | Pfeile statisch | `/balkon-terrasse` |
| `formatregler` | Rückmeldung: 60 × 60 gegen 120 × 260 | Regler (Zeiger und Tastatur) | direkt, ohne Verzögerung | gleich | `/leistungen` |
| `verband` | Rückmeldung: Verlegemuster wechselt | Auswahl (Radiogruppe) | `dauer-3` · `ease-setzen` | Sofortzustand | `/fliesen` |
| `vorher-nachher` | Rückmeldung: Vorher gegen Nachher | Regler (Zeiger und Tastatur) | direkt | gleich | `/referenzen` |
| `karte` | Orientierung: Einsatzgebiet ab Aßlar | Sichtbarkeit (IO 40 %) | Ringe `dauer-3` gestaffelt | Endzustand | `/ueber-uns`, `/standorte` |
| `galerie-filter` | Rückmeldung: Bilder nach Raum | Auswahl | `dauer-2` Überblendung | Sofortzustand | `/referenzen` |
| `leitachse` | Orientierung: Lesefortschritt | Scroll (scroll-timeline) | linear | Grundschicht, nichts gezogen | Erzählseiten (aus v2) |
| `auftritt` | Hierarchie: Abschnitt rückt 8 px ein | IO 20 % | `dauer-3` · `ease-setzen` | Überblendung | Erzählseiten (aus v2) |
| `aufklappen` | Rückmeldung | Klick, Taste | auf `dauer-2`, zu `dauer-1` | Sofortzustand | Menü, Akkordeon (aus v2) |
| `druck` · `zustand` · `notiert` · `laden` | Rückmeldung | `:active` · Hover/Fokus · Erfolg · Absenden | `dauer-1` · `dauer-1` · `dauer-3` · linear | wie v2 | alle Seiten (aus v2) |
| `anriss` | Hierarchie: Schlüsselwort einer Stimme | IO 50 % | `dauer-4` | Strich sofort | Stimmen (aus v2) |
- Nicht mehr entfallen (E-037, Entscheidung des Auftraggebers): `seitenwechsel` (Plan-Morph), `sig-plan`, `sig-kreuzlinie`, `sig-flucht`, `szene-ablauf`, `einzugsband`, `fugenband` sind fester Teil des Systems. Keine Seite wird auf eine Vorlage umgestellt, bevor die Vorlage sie trägt; nichts davon wird ohne Rückfrage entfernt. B-01 lässt Links mit `data-uebergang` durch, wenn ihr eigener Übergang möglich ist; beide laufen nie gleichzeitig (B-01 beendet eine laufende View Transition, sobald es legt).
- Große Momente: je Erzählseite genau einer je Bildschirm (Tabelle oben); Arbeitsseiten keine. Auf `/` ist SIG-1 (Kreuzlinie mit Flucht und Plan) der Moment des ersten Bildschirms, `startbild` der Moment beim Eintritt des Fotos (unter lg).

### B-01 „Fliese für Fliese“ (Pflicht; seit E-043 auf Wunsch des Auftraggebers; Technik nach E-006 und E-010; E-042 „Wind“ ersetzt)
- Bild: Die ganze Seite wird Fliese für Fliese gefliest, von rechts nach links; ist alles belegt, wechselt darunter die Seite; dann werden die Fliesen in derselben Richtung Stück für Stück wieder abgenommen und verschwinden im Hintergrund, die neue Seite erscheint von rechts. Jede Fliese hat ihren eigenen Moment (tak, tak, tak), keine zwei beginnen gleichzeitig. Ganz neutral: weiße Fliesen, graue Fuge, Schatten in Tinte, Wartelinie in `strich`, kein Rot, kein Gelb.
- Fliese 2:1 quer, Drittelverband, Fuge 1 % der kurzen Seite, mindestens 2 px, Fugenfarbe `fuge`; Oberfläche `fliese` mit feiner Körnung (SVG-Rauschen, einmal zur Kachel gerastert) und Glanzebene `fliese-glanz`; etwa 3 Fliesen je Reihe bei 390 px, 8 bei 1440 px, höchstens 80.
- Legen: Spalte für Spalte von der Startkante her im gleichen Schlag (eine Spalte = je Reihe die Fliese im selben Band von einer Fliesenlänge; im Drittelverband eine Treppe, zusammen das Zickzack), mindestens 50 ms zwischen zwei Spalten (höchstens 20 Schläge je Sekunde); in der Spalte setzen die Fliesen von oben nach unten nacheinander auf, verteilt über den halben Schlag. Jede schwebt zuerst größer (1,12) und ein Stück zur Startkante hin (0,12 Fliesenlängen) mit Flugschatten `shadow-flug` über den schon gelegten und setzt nach einem Schlag mit `ease-aufsetzen` hart auf, ohne Nachfedern; wenn die übernächste Spalte beginnt, ist sie gelandet. Später gelegte liegen oben. Bei bis zu 80 Fliesen in 0,5 bis 0,9 s kann nicht jede Fliese einen eigenen hörbaren Schlag haben; deshalb ist jede Spalte ein Schlag und jede Fliese hat ihr eigenes Aufsetzen (Prüfung E-043).
- Wechsel: Seite wechselt unter der geschlossenen Fläche; Scroll oben (bei Zurück die gemerkte Stelle), Fokus auf der H1, Titel über Nexts Routen-Ansager. Ist die Seite nicht bereit: eine Linie in `strich` wandert ruhig über den Boden, höchstens 3 s, danach Wechsel ohne Fliesen.
- Abnehmen: dieselbe Reihenfolge wie beim Legen (Spalte für Spalte, in der Spalte von oben nach unten); jede Fliese weicht in 1,5 Schlägen in den Hintergrund zurück: Größe 1 → 0,6 mit `ease-setzen` (sichtbar kleiner, solange sie noch deckt), Deckkraft ab 40 % auf 0.
- Takt: gesamt (Legen und Abnehmen je zur Hälfte, Warten kommt dazu) 1800 ms beim ersten Wechsel einer Sitzung, 1400 ms ab dem zweiten, Zurück und Vor gespiegelt (von links nach rechts) mit 70 %. Logik `stueckplan` in `src/lib/verlegen/raster.ts`, Zustände in `automat.ts` (ruhe, legen, bedeckt, warten, abnehmen, abbruch). Zurück oder Vor während des Legens: das Ereignis wird nachgereicht, sobald der Boden liegt (statt des Klickziels); während bedeckt und warten übernimmt Next es, der Boden wartet auf die Seite aus dem Verlauf; während des Abnehmens läuft es ohne Boden, Scroll und Fokus folgen. Ein „bereit“ zählt nur für die zuletzt abgeschickte Navigation; führt sie auf den schon angezeigten Pfad, meldet B-01 selbst. Anker derselben Seite bekommen beim hashchange den Verlaufszustand der Seite, damit Zurück von einer anderen Seite sie wieder zeigt. Abbruch nach 3 s: die Schicht blendet aus, die Fliesen bleiben bis dahin liegen. Reduzierte Bewegung: keine wandernde Linie.
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

## K-008 Formsystem
- Grundraster: Fugenraster aus K-005; Linien 1 px Fuge, 1 px Strich, 2 px Tinte (Fokus), 2 px Laser (Laserlinie).
- Icon-Familie aus v2 (45 Icons, 24er Raster, Strich 1,5 px, Enden `square`, Ecken `miter`, `currentColor`, Sprite). Neue Icons nur in dieser Familie. Markenlogos (WhatsApp, Google) bleiben unverändert und zählen nicht zur Familie.
- Zeichnungen (neu, alle aus Fliese, Fuge und Laserlinie): Schichtaufbau (Untergrund, Abdichtung, Kleber, Fliese, Fuge), Duschboden mit Gefälle und Ablauf, Balkon mit Gefälle, vier Verlegemuster (Kreuzfuge, Halbverband, Drittelverband, Fischgrät), Formatvergleich, Einsatzkarte (Aßlar in der Mitte, Ringe), Fliesenkomposition als Bildplatz ohne Foto, 404 (eine verrutschte Fliese).
- Zugänglichkeit: dekorativ `aria-hidden="true" focusable="false"`; bedeutungstragend `role="img"` mit Namen; IDs je Instanz eindeutig. Budgets: Icon ≤ 1,5 KB, Zeichnung ≤ 40 KB gzip; SVGO.

## K-009 Informationsarchitektur
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

## K-010 Ton, Erzählbogen, Schreibregeln
- **Erzählbogen:** Sie haben ein Bad, einen Boden oder einen Balkon, der nicht mehr passt, und wissen nicht, wo Sie anfangen sollen. Deniz Tezgel kommt aus Aßlar zu Ihnen, schaut sich alles an, erklärt in einfachen Worten, was zu tun ist, und verlegt mit seinem Team Fliese für Fliese. Fotos fertiger Arbeiten und die Worte unserer Kunden zeigen, wie das am Ende aussieht.
- **Ton:** Sie-Anrede, wir-Form, warm, ruhig, selbstbewusst; kurze Sätze; konkrete Dinge statt Adjektive; Zahlen nur aus K-015.
- **Schreibregeln** (gemessen mit `werkzeuge/lesbarkeit.mjs` über die gerenderte Seite): Flesch nach Amstad ≥ 60 (Erzähl- und Ortsseiten), ≥ 50 (Wissensseiten); mittlere Satzlänge ≤ 14 Wörter; kein Satz über 25 Wörter; Absätze ≤ 4 Sätze; jedes Glossarwort beim ersten Vorkommen je Seite mit Alltagserklärung ≤ 15 Wörter (Baustein `Fachwort`), Normen nur mit ihrem Nutzen; kein Gedankenstrich und kein Bindestrich als Gedankenstrich in sichtbarem Text, Alt-Texten, Titeln, Beschreibungen und Bedienbeschriftungen; Zeitspannen mit „bis“, Maße ohne Kette; Titel ≤ 60 Zeichen, Beschreibung 120 bis 155; Suchbegriffe aus `adressen-e0.csv` bleiben natürlich im Text; Ortsseiten unterscheiden sich nur durch echte Angaben; Kundenstimmen wörtlich, gekürzt nur mit „…“. Ausgenommen: Rechtstexte und wörtliche Stimmen (`data-zitat`).
- **K-010-B · erlaubte Bindestrichwörter** (Maschinenfassung `regeln/bindestrich-erlaubt.json`): E-Mail (Rechtschreibung) · Gäste-WC (Rechtschreibung, Abkürzung) · Lahn-Dill-Kreis (Eigenname) · Marburg-Biedenkopf (Eigenname) · Limburg-Weilburg (Eigenname, Landkreis) · WhatsApp-Nachricht nicht nötig („Nachricht per WhatsApp“) · Cookie-Richtlinie und Cookie-Einstellungen (Rechtstext und Bedienbeschriftung der Einwilligung, G8) · „Walk-in-Dusche“ nur, wo sie Suchbegriff der Seite ist (Rechtschreibung bei englischem Bestandteil), sonst „bodengleiche Dusche“.
- **K-010-F · Floskeln und KI-Spuren** (Maschinenfassung `regeln/floskeln.json`): nahtlos, ganzheitlich, maßgeschneidert, Entdecken Sie, Ihr Partner für, höchste Qualität, Perfektion, von A bis Z, rundum sorglos, nicht nur … sondern auch, erstklassig, innovativ, Traumbad; keine Dreierketten von Adjektiven, keine Überschriften „Begriff: Erklärung“, kein Stakkato („Dicht. Sauber. Termintreu.“).
- **Ersetzungen im Bestand:** „Vor-Ort-Aufmaß“ → „Termin bei Ihnen vor Ort“ (in Knöpfen „Termin vor Ort anfragen“); „Walk-In-Dusche“ → „bodengleiche Dusche“ (außer Suchbegriff); „XXL-Fliesen“ → „große Fliesen“; „2-cm-Platten“ → „2 cm starke Platten“; „Fachgewerke“ → Bereichsnamen der Navigation.
- **Mikrotexte:** Hauptknopf „Termin vor Ort anfragen“; Telefon „Anrufen: 06441 / 44 83 567“; WhatsApp „Nachricht per WhatsApp“; Absenden „Anfrage senden“ (bestehender Text bleibt, wenn Tests ihn prüfen); Laden „Wird gesendet …“; Erfolg aus dem Bestand.

## K-011 Glossar (Alltagserklärung ≤ 15 Wörter)
Maschinenfassung `src/config/glossar.ts` (Quelle) und `regeln/glossar.json` (Prüfung). Erklärung steht beim ersten Vorkommen je Seite direkt dabei.

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

## K-012 Bildregeln
- Nur echte Bilder aus `_eingang/entpackt/` (84 Originale) und dem Bestand; nie die 11 Generatorbilder aus `public/images/bad/` (E-013), nie Stock oder generierte Bilder.
- Bearbeitung per Skript (`werkzeuge/bilder.mjs`, sharp): Ränder der Bildschirmfotos entfernen, Ausrichtung, sanfte Belichtung und Weißabgleich, Geraderichten, Zuschnitt nach Bildplatz und Schwerpunkt aus `bildinventar.csv`, nie hochskalieren (Quellen ≤ 1320 px breit), alle Metadaten entfernen, JPEG Qualität 82 als Webfassung (Next erzeugt AVIF/WebP); sprechende Namen.
- Nicht verwenden oder wegschneiden: erkennbare Personen und Gesichter, Kind im Hintergrund, Hausnummern, Kennzeichen, Namen, fremde Firmenlogos und Markenaufdrucke. Bis zur Klärung nicht verwenden: Schiefer-Dusche mit Glaswand (wirkt wie Herstellerfoto), IMG_2577 (Bildbetrachter), Dubletten IMG_2594 und IMG_2581.
- Einbau nur über `Bildfeld` (`next/image`): feste Maße, `sizes`, unscharfer Platzhalter; nur das Startbild lädt sofort mit hoher Priorität (`loading="eager"`, `fetchPriority="high"` statt `preload`, E-034). Alt-Text in Alltagssprache ≤ 125 Zeichen nach den Zeichenregeln, ehrlich (zum Beispiel „Sanitärmontage noch offen“), keine erfundenen Orte; dekorativ ohne Alt-Text.
- Bildplätze: `_werkstatt/bildplaetze.md`. Wo kein passendes Foto da ist: Fliesenkomposition aus dem Formsystem, nie graue Kästen. Als Zeichnung neben Text (Bereichsfliesen) die Plan-Vignetten aus v2 (`kern/vignetten`: Bad, Wohnen, Außen, Untergrund, dazu Reparatur neu; Linien 1,5 px non-scaling, currentColor, Fugen und Schraffur in Strich, kein Rot, keine IDs; E-037); sonst Fliesenkomposition mit `deutlich` (Fugen in Strich, rote Laserlinie oder roter Riss; E-036).

## K-013 Geräte und Budgets
- Gerätegrößen (10) aus `HAUPTANSICHTEN.json`. Mobil eigene Komposition; kein seitliches Scrollen; Fließtext ≥ 16 px; Touchziele ≥ 44 × 44; sichere Ränder (`env(safe-area-inset-*)`); Vollbildhöhen mit `svh`/`dvh`; Kopf verdeckt keine Anker (`scroll-padding-top`); Systemschrift 200 % lesbar und bedienbar (untere Leiste unter 20em: Anrufen und Termin mit Wort, WhatsApp tritt zurück, E-036); Handy quer: Kopf und Leisten ≤ ¼ der Höhe, Variante `flach:` (Querformat, Höhe ≤ 32rem) für einen dichteren ersten Bildschirm (E-036); große Bildschirme mit begrenzter Textbreite.
- Budgets (mobil, Median aus 3, frisches Profil, mit Intro): LCP ≤ 2,5 s · CLS ≤ 0,1 · TBT/INP ≤ 200 ms · Lighthouse mobil Leistung ≥ 90, Zugänglichkeit ≥ 95, Best Practices ≥ 95, SEO 100 · zusätzlicher Code für Bewegung (B-01, B-02, große Momente) ≤ 60 KB gzip · Startbild mobil ≤ 200 KB · Icon ≤ 1,5 KB · Zeichnung ≤ 40 KB gzip. Besserer E0-Wert gilt.

## K-014 Adressen und Suchmaschinen
- Ausgangswert `adressen-e0.csv`. Jede Adresse bleibt 200 oder leitet mit 308 auf eine gleichwertige Seite (`next.config.ts`); entfernte Altadressen der Vorgängerfirma bleiben 410 (`src/lib/wege.ts`). Null kaputte interne Links.
- Je Seite genau eine H1, Titel (über `createMetadata`, `src/lib/metadata.ts`), Beschreibung, absolutes Canonical; strukturierte Daten gültig (`src/lib/schema.ts`), Bewertungen nur aus `src/config/reviews.js` (wörtlich, eine Quelle); Sitemap vollständig (`src/app/sitemap.ts`).
- Suchbegriffe je Seite (Titel, H1, Beschreibung aus E0) bleiben natürlich im neuen Text; Titel ≤ 60, Beschreibung 120 bis 155 (Test `test/titleLength.test.mjs` verlangt ≤ 58 und bleibt).

## K-015 Faktenblatt (nur diese Fakten; Fundstellen im Code)
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

## Markierte Annahmen
F-07, F-09, F-14, F-20 und die Versprechen bis zur Antwort (MENSCHEN.md); Herkunft einzelner Fotos (M-08).

## Änderungsprotokoll
- v3.3 (24.10.2026, E-043): B-01 „Fliese für Fliese“ (Entscheidung des Auftraggebers): ganze Seite Fliese für Fliese von rechts belegen, dann einzeln abnehmen, 1800/1400 ms; Kalk neutral #F4F4F5; Wartelinie in `strich`; Token `ease-aufsetzen`, `ease-wind` entfällt.
- v3.2 (24.10.2026, E-042): B-01 als „Wind“ (Entscheidung des Auftraggebers): Band aus Fliesen weht über die Seite, alte Seite davor, neue dahinter; Token `ease-wind`.
- v3.1 (24.10.2026, E-037): SVG-Bewegungen aus v2 und Plan-Morph zurück (Entscheidung des Auftraggebers), Planblatt im Einstieg von `/`, Plan-Vignetten in den Bereichsfliesen, Rauschtextur der Fliesen in B-01 (einmal gerastert), startbild über Sichtbarkeit.
- v3.0 (23.10.2026, E1): neue Leitidee „Klar verlegt“ aus dem Auftrag „Verständlich, echt, ausgezeichnet“; Personen P1 bis P5 mit Aufgaben A1 bis A6; Prinzipien neu; Fliesenskala als Lesart der v2-Abstände; Schatten-, Ebenen-, Dauer- und Kurvenstufen ergänzt; Register mit B-01, B-02 und neun großen Momenten, sieben v2-Einträge entfallen; Navigation mit fünf Hauptpunkten; Seitenarten und Seitenformel; Schreibregeln, K-010-B, K-010-F, Glossar; Bildregeln; Faktenblatt.
