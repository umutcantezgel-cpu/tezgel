E4-NACH-13 · Baumeister · Modell: ARBEITSMODELL · Stufe 2 · Kern-Version: v2 · Umfang: /fliesen/konfigurator: H1 und H2 ruhiger, Werkzeug direkt unter dem Kopf mit Ergebnis-Spalte, Ergebnis als Fliese mit Fugenrahmen, Verbandszeichen in Tabelle und Musterwahl, Verschnitttabelle mobil als Zeilenblöcke, eine Fortschrittsanzeige, Etikett in „Weiterführende Ratgeber“ (E3-SICHT-ARB Befunde 11–14, 17–19)
Schreibrechte (exakt): `src/app/(bestand)/fliesen/konfigurator/page.jsx`, `src/components/funnels/FliesenKonfigurator/index.jsx`, `src/components/funnels/FliesenKonfigurator/Schritt2.jsx`, `src/components/funnels/FliesenKonfigurator/Schritt3.jsx`, `src/components/funnels/FliesenKonfigurator/ResultSummary.jsx`, dazu die Rückgabe `_werkstatt/pakete/E4-NACH-13.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Baumeister
Du baust einen Baustein oder eine Ansicht nach Referenz, Kern-Auszug und Konventionen des Projekts und machst die Schnellprüfung. Häufige Fehler: Werte außerhalb des Designsystems; Zustände und Mobilansicht vergessen; Dateien außerhalb der Schreibrechte ändern.

## Aufgabe in einem Satz
Mache die Arbeitsansicht Konfigurator zu einem Werkzeug, das sofort beginnt: Werkzeug oben, Ergebnis daneben, Verbände als Zeichen – Rechenwerte, Nutzlast, Texte und IDs bleiben.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## K-003 Gestaltungsprinzipien (GESCHMACK: keine Vorgabe)
1. **Fluchten statt Schmücken.** *Tun:* jedes Element an Raster und Achse ausrichten, Ordnung sichtbar machen. *Lassen:* Leuchtkugeln, Verläufe, Glas, Funkeln, schwebende Karten, Hover-Anheben.
2. **Ein Rot, eine Achse.** *Tun:* Rot nur für Laserachse, Anriss, Fokus-Akzent und Fehlerzeichen; je Bildschirmhöhe höchstens ein roter Blickfang (die Achse ist dabei Grundschicht in Fugengrau, rot nur das gezogene Stück). *Lassen:* rote Flächen, rote Knöpfe, Orange außerhalb des Logos.
3. **Maß statt Behauptung.** *Tun:* Belegbares in Mono setzen (DIN 18534, R10/R11, seit 2008, 5,0 bei 27 Google-Bewertungen); Stimmen wörtlich mit Quelle. *Lassen:* Superlative, Badges über Überschriften, hochzählende Kennzahlen, erfundene Maße (in Plänen „=“ statt Zahl).
4. **Gezeichnet statt generiert.** *Tun:* Verlegeplan-Zeichnungen, Fugenkreuz, Verbände aus dem Formsystem tragen die Bildwelt; vorhandene Fotos sparsam, einheitlich gerahmt, mit ehrlichem Alt-Text. *Lassen:* neue generierte Bilder, Stock-Ästhetik, Text auf Bild, Bildfilter.
5. **Fuge statt Karte.** *Tun:* Inhalte in Feldern ohne Zwischenraum, getrennt durch 1-px-Fugen; benachbarte Abschnitte unterscheiden sich in Struktur und Dichte. *Lassen:* gleichförmige Icon-Karten, Bento ohne Logik, Schatten, drei gleich gebaute Abschnitte in Folge.
6. **Ruhige Hand für Arbeitsansichten.** *Tun:* Formulare dicht, beschriftet, mit allen Zuständen; ein Weg je Aufgabe. *Lassen:* Inszenierung, Auftritte, konkurrierende Formulare im selben Bildschirm.
7. **Mobil ist ein eigenes Blatt.** *Tun:* Achse als Lot links mit Abstand zum Text, eigene Reihenfolge, untere Leiste als einzige feste Ebene neben dem Kopf. *Lassen:* gestapelter Desktop, überlagerte feste Ebenen (Bubble, Chat-Blase, Schild).

## K-005 Designsystem (Tokens in `globals.css`, `@theme static`)

### Farbe
Neutrale auf Farbton 228°, gestuft nach Soll-Kontrast gegen Kalk; genau ein Akzent (Laser = Logo-Rot); Orange nur im Logo.

| Token (Klasse) | Hex | Kontrast Kalk / Fliese | Einsatz |
|---|---|---|---|
| `kalk` | #F5F4F0 | – | Seitengrund |
| `fliese` | #FFFFFF | – | Felder, Formulare |
| `fuge` | #DDDEE2 | 1,22 | nur Deko-Linien, Rasterfugen, Grundschicht der Achse |
| `strich` | #818698 | 3,29 / 3,62 | Feld- und Bedienelement-Ränder, Grafik (≥ 3:1) |
| `tinte-2` | #4B5067 | 7,22 / 7,95 | Nebentext, Hilfetexte |
| `tinte` | #0A1129 | 16,96 / 18,66 | Text, Hauptknopf, Fokus (= Logo-Navy) |
| `laser` | #D82020 | 4,60 / 5,06 · 3,69 auf Tinte | Achse, Linien, Fokus-Akzent – nur Grafik und große Schrift |
| `laser-tief` | #A8171C | 6,80 / 7,49 | Rot als Text, Anriss, Fehlertext |
| `abnahme` | #1D6B3F | 5,91 / 6,51 | Erfolg (immer mit Haken und Text) **[A]** |
| `nacht-2` | #A9AEC0 | 8,45 auf Tinte | Text auf Tinte-Flächen |
| `nacht-fuge` | #2B3352 | Deko | Fugen auf Tinte |
| `white`, `transparent`, `current`, `inherit` | – | – | Hilfswerte |

- Bedeutung nie nur über Farbe: Fehler = Rahmen + Versatz-Zeichen + Text; Erfolg = Haken + Text. Auswahl (`::selection`): Tinte auf Fuge.
- Markenfarben fremder Logos (WhatsApp, Google) nur im jeweiligen Logo, nie als Fläche.

### Abstände, Größen, Raster
- Abstandsskala (margin, padding, gap, space, inset, translate, scroll-margin): Tailwind-Stufen `0 · px · 1 · 2 · 3 · 4 · 6 · 8 · 12 · 16 · 24 · 32` = 0 · 1 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px. Alle anderen Stufen gelten als Wert außerhalb des Systems.
- Größen (w, h, size, min-*, max-w): Icons `size-4 | size-5 | size-6` (16/20/24 px); Touch-Ziel `size-11`/`min-h-11` (44 px); Flächen und Bildhöhen auf der Abstandsskala (`1 · 2 · 3 · 4 · 6 · 8 · 12 · 16 · 24 · 32`, z. B. Kopf `h-16`, Logo `h-12`, Fugenkreuz-Marke `size-3`); Breiten `max-w-seite` (82rem), `max-w-mass` (66ch), `max-w-md` (28rem: Menüblatt, Banner), Brüche (1/5 … 4/5, 1/4 … 3/4, 1/3, 2/3, 1/2) und `full/auto/fit/min/max/screen/dvh/svh`.
- Kartenflächen (E-018): feste Höhe über die Variable `--karten-hoehe` mit der Klasse `karten-hoehe` – 400 px (Standortkarte), 440 px (Kontaktkarte mobil), 460 px (Servicekarte), Kontaktkarte ab `lg` Spaltenhöhe; Platzhalter und geladene Karte sind gleich hoch (CLS). Keine weiteren Werte.
- Rand: mobil `px-4`, Tablett `md:px-8`, Desktop `lg:px-12`. Abschnittsabstand Erzählansicht `py-16`/`lg:py-24` (seit E-019, Takt), Arbeitsansicht `py-12`/`lg:py-16`.
- Raster: 12 Spalten ab `lg` (1024), 8 ab `md` (768), 4 mobil; Spalten ohne Zwischenraum, Gliederung durch 1-px-Fugen (`border-fuge`, `divide-fuge`). Verbände als Rastervarianten: Kreuzfuge (Standard), Halbverband (Listen), Drittelverband (Großformat-Seiten).
- Ebenen: `z-0` Inhalt · `z-10` Inhalt über Deko · `z-30` untere Leiste · `z-40` Kopf · `z-50` Dialoge, Menü, Banner. Keine anderen.
- `scroll-padding-top` = Kopfhöhe + 16 px (in `globals.css`). Touch-Ziele ≥ 44 × 44 px, wo das Layout es erlaubt.

### Formen und Tiefe
- Radien: `rounded-none` (Standard: Felder, Bilder, Knöpfe) und `rounded-r1` = 2 px (Eingabefelder). Keine weiteren.
- Schatten: `shadow-fuge` = `0 1px 0 var(--color-fuge)` (fester Kopf). Keine Tiefe sonst. Keine Verläufe, keine Unschärfe, keine Körnung.
- Linien: 1 px Fuge (Gliederung), 1 px Strich (Bedienränder), 2 px Tinte (Fokus, Hauptlinie), 2 px Laser (Achse).

### Dauern und Kurven (Bewegung, siehe K-007)
- `--dauer-1` 140 ms (Rückmeldung) · `--dauer-2` 320 ms (Zustandswechsel) · `--dauer-3` 600 ms (Auftritt) · `--dauer-4` 800 ms (Flucht) · `--dauer-5` 1200 ms (Laser). Utilities `dauer-1 … dauer-5` (setzen `transition-duration` und `--dauer`). Staffel `--staffel` 60 ms, höchstens 8 Elemente.
- Kurven als Tailwind-Ease-Tokens: `ease-setzen` cubic-bezier(0.2, 0.8, 0.2, 1) (ausklingend) · `ease-laser` cubic-bezier(0.7, 0, 0.2, 1) (wechselnd) · `ease-weg` cubic-bezier(0.32, 0, 0.67, 0) (beschleunigend, Ausgänge eine Dauerstufe kürzer) · `ease-linear` (Fortschritt, scroll-gebunden).

## K-008 SVG-Formsystem
- Grundgeometrie: 24er-Raster, Lebensbereich 2,75–21,25, Strich 1,5 px auf Halbpixel, Enden `square`, Ecken `miter`, fast nur 0°/90° (45° nur bei Pfeilspitzen und Tropfen). Farbe `currentColor`; skalierte Pläne mit `vector-effect: non-scaling-stroke`.
- Gefülltes Zeichen nur das **Fugenkreuz** (Markierung, Aufzählung, Kreuzpunkt der Achse, Trenner „Fugenlinie mit Kreuz“).
- Icon-Familie (eigene; ersetzt lucide und Phosphor): je Icon eine Datei `src/components/icons/svg/<name>.svg`, Sprite `src/components/icons/sprite.svg` per Skript erzeugt, eingebunden per `import sprite from './sprite.svg'` und `<use href={`${sprite.src}#<name>`}/>` in `Icon.tsx` (keine IDs im DOM, cachebar). UI-Icons: telefon, mail, sprechblase, ort, uhr, kalender, pfeil-rechts, pfeil-links, winkel-unten, winkel-rechts, schliessen, menue, haken, hinweis, fehler (Versatz-Zeichen), plus, minus, stern, download, suche, teilen, link-extern, haus, dokument, schloss. Fachzeichen (vom Orchestrator): bad, dusche-rinne, grossformat, abdichtung, untergrund, treppe, balkon, naturstein, reparatur, fussbodenheizung. Markenlogos (WhatsApp, Google, Facebook, LinkedIn, X) bleiben in ihrer Form unverändert und zählen nicht zur Familie. Zuordnung aller bisherigen lucide-Namen: `src/components/icons/zuordnung.ts`.
- Motive: **Verlegeplan** (Draufsicht mit Achse, schraffierten Passstücken, Bemaßung „=“) als parametrische Komponente `src/components/kern/Verlegeplan.tsx` mit Planvorgaben `src/lib/plaene/*.ts` je Thema; Verbände Kreuzfuge, Halbverband, Drittelverband; Zustandsgrafiken laden (Fuge läuft), notiert (Haken), fehler (Versatz); 404-Plan (eine Fliese verrutscht).
- Zugänglichkeit: dekorativ `aria-hidden="true" focusable="false"`; bedeutungstragend `role="img"` + Name (`aria-label` oder `<title>` mit `useId`). IDs je Instanz eindeutig.
- Optimierung: SVGO (Voreinstellung; animierte Grafiken mit erhaltenen IDs/Klassen), keine eingebetteten Pixelbilder, keine nachgezeichneten Bitmaps. Budget: Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip. Prüfung `svg.mjs`.

## K-009 Komponenten, Zustände, Ansichtsarten
- Zustände für jedes Bedienelement: Ruhe, Hover, Fokus, gedrückt, deaktiviert, lädt, Fehler, Erfolg; Leerzustände; 404 mit Charakter (Plan mit verrutschter Fliese, Weg zurück). Fokus: `outline: 2px solid var(--color-tinte)`, `outline-offset: 2px`, auf Tinte-Flächen `kalk`; nie verdeckt (scroll-padding, keine überlagernden festen Ebenen); übersteht `forced-colors`.
- Knöpfe: Hauptknopf Tinte-Fläche mit Kalk-Text, `rounded-none`, min. 44 px hoch; Nebenknopf 1 px Strich-Rahmen; Textlink unterstrichen (Offset 3 px). Knöpfe sagen, was passiert („Aufmaß anfragen“, „Anrufen“, „Per WhatsApp schreiben“).
- Formulare: sichtbare Beschriftung über dem Feld (`htmlFor`/`id`), `autocomplete`, Hilfetext `tinte-2`, Fehler mit Versatz-Zeichen + Text + `role="alert"`, Erfolg „Notiert.“ mit Inhabername und Referenz; ein Formular je Bildschirm.
- Rahmen: Kopf (Logo unverändert, Hauptnavigation ab `lg` mit Mega-Menü als echte Links, Telefon in Mono, Knopf „Aufmaß anfragen“; mobil Menü-Schalter mit Popover-Menü, vor der Hydrierung bedienbar; fest, `shadow-fuge`); untere Leiste mobil (Anrufen · WhatsApp · Anfrage) als einzige weitere feste Ebene; Fuß auf Tinte mit Schriftfeld und Seitenindex; WhatsApp am Desktop flacher Knopf (`#whatsapp-floating-btn`); Einwilligungsbanner als Schriftfeld (Inhalt, Reihenfolge, gleichwertige Knöpfe unverändert; mobil über der Leiste, Desktop links unten ≤ 28rem; verdeckt nie die Hauptaktion des ersten Bildschirms).
- Bausteine (`src/components/kern/`): `Einstieg` (Erzählung | Arbeit), `Abschnitt` (Kopf mit Mono-Etikett + H2), `Feldraster`, `Merkliste` (Fugenkreuz), `Kennwerte` (Mono), `Schrittfolge`, `Kundenstimme` (Anriss, Quelle in Mono), `Schriftfeld`, `RatgeberListe`, `Tabelle` (Region mit Name und `tabindex=0` bei Überlauf), `Hinweis`, `Bildfeld`, `Knopf`, `Feld` (Eingabe, Auswahl, Textbereich, Kontrollkästchen, Radiogruppe), `Verlegeplan`, `Fugenkreuz`, `Laserachse`. Bestand an Ort und Stelle umgebaut: `FinalCTA` = Abschluss, `QualityPromise` = Merkliste, `ReviewCarousel`/`ReviewCard` = Kundenstimme, `FAQAccordion` = FAQ, `TrustStrip` = Schriftfeld, `GoogleReviewsBadge` = Kennwert.
- Erzählansicht: Einstieg mit Achse und H1 links bündig, Schriftfeld, wechselnde Abschnittsstrukturen, genau ein großer Moment, Leitachse. Arbeitsansicht: kompakter Kopf (H1 `text-fs-6`), Formular oder Liste im ersten Bildschirm, nur Rückmeldung und Zustandswechsel.

## Maßstab
- Referenz Erzählansicht: `src/app/(bestand)/page.tsx` mit `src/components/start/*` und der Planblatt-Einstieg auf `/bad` bzw. `/leistungen/bad` (E4-NACH-01). Bausteine in `src/components/kern/` (Props in den Dateien): Einstieg, Abschnitt (Eigenschaften `leitachse`, `spaet`, `kopf`, `flaeche`), Leitachse, Feldraster/Feld, Merkliste (auch `spalten={2} verband nummeriert`), Schriftfeld, Planblatt + `planfelder()`, **Rueckfrage** (Ansprechpartner-Spalte neben Anfragewegen, ab lg klebend), Zeitband, Einzugsband (`form="stapel"`, `kompakt`, `aktuell`), Verlegeplan (Props `plan` – Name aus `src/lib/plaene/vorgaben.ts` oder eigene `Planvorgabe` nach `src/lib/plaene/typen.ts`, `ohneAchse`, `bemassung`, `zustand`), Knopf, Hinweis, Fugenkreuz; Klassen aus `kern/stile.ts`; Icons nur `@/components/icons/Icon` (Namen in `icons/namen.ts`, u. a. `stern-voll`, `verband-*`, Fachzeichen bad, fliese, abdichtung, balkon, treppe, naturstein, reparatur, grossformat, untergrund, fussbodenheizung, dusche-rinne).
- Referenz Arbeitsansicht: `src/app/(bestand)/kontakt/page.jsx` (Einstieg art="arbeit" – H1 text-fs-6, Abschnitt kopf="seitlich"); Konfigurator-Logik im Hook `src/lib/formulare/useFliesenKonfigurator.ts` und `logik.js` (gesperrt).
- Befund 11: H1 der Seite in der Arbeitsstufe (`Einstieg art="arbeit"` → text-fs-6; ist sie schon arbeit, dann prüfen) und die H2 der Erklärabschnitte eine Stufe kleiner als bisher (`text-fs-5` statt `text-fs-6`).
- Befund 12/13 (Komposition, Reihenfolge ausdrücklich erlaubt): Das Werkzeug beginnt erst bei ≈ 1 500 px (Desktop) bzw. ≈ 2 000 px (mobil) nach Einstieg und „Vier Schritte bis zur strukturierten Anfrage“. Neu: Der Abschnitt mit dem Konfigurator steht direkt nach dem Einstieg; „Vier Schritte …“ folgt danach (Text unverändert, nur verschoben – in der Rückgabe melden). Das Werkzeug belegt 8 Spalten, rechts (4 Spalten, ab lg klebend) steht die Ergebnis-Zusammenfassung des aktuellen Stands, soweit `index.jsx` sie heute schon zeigt (ResultSummary bzw. Ergebnisfläche) – nur umplatzieren, keine neue Berechnung; gibt es vor Schritt 3 kein Ergebnis, steht dort `<Rueckfrage />`.
- Befund 14 (Farbe): Ergebnisfläche grau, deaktivierter Knopf grau. Neu: Ergebnis als Fliese mit Fugenrahmen (`border border-fuge bg-fliese`), Werte in Mono; der deaktivierte Knopf als Strich-Rahmen (`border border-strich bg-fliese text-tinte-2`) statt grauer Fläche; der laufende Schritt im Fortschritt mit rotem Achsstück (eine 2-px-Linie in `bg-laser` am aktiven Schritt) – das ist der eine rote Blickfang der Ansicht.
- Befund 17 (Grafik): Verbandszeichen in der Verschnitttabelle der Seite und in der Musterwahl (Schritt mit Verlegemuster): Icons `verband-kreuz`, `verband-halb` (für „Halb- / Drittelverband“ beide Zeichen nebeneinander oder `verband-halb`), `verband-wild`, `verband-diagonal`, `verband-fischgraet` (dekorativ, `aria-hidden`), `groesse={6}` vor dem Namen.
- Befund 18 (m390): Die Spalte „Warum“ der Verschnitttabelle ist mitten im Buchstaben angeschnitten. Neu: unter sm als Zeilenblöcke (je Muster: Zeichen + Name + Wert in einer Zeile, darunter „Warum“ als Text), ab sm Tabelle; Inhalt identisch.
- Befund 19: Der Fortschritt steht dreifach da (Kästchen 1–4, Balken, „Schritt 1 von 4“). Neu: genau eine sichtbare Anzeige – die Kästchen bleiben; „Schritt X von 4“ bleibt für Screenreader (`sr-only`), der Balken entfällt nur, wenn er rein dekorativ ist (sonst melden). Abschnitt „Weiterführende Ratgeber …“ bekommt ein Mono-Etikett wie die übrigen Abschnitte (Mikrotext, melden).
- Tempo (Z-08, E-025): Jeder Abschnitt nach dem Einstieg trägt `spaet` (Abschnitt-Eigenschaft; bei eigenen `<section>`-Hüllen die Klasse `spaet-zeichnen` am inneren Rahmen ohne überstehende Zeichen). Anfragewege (Funnels, Konfigurator, Express-Anfrage) werden nachgeladen wie auf `/`: `const X = dynamic(() => import('…'), { loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Anfrageformular wird geladen...</p> })` mit `import dynamic from 'next/dynamic'` (Muster `src/app/(bestand)/page.tsx` Zeile 27); Lade-Text als Mikrotext melden.
- Systemwerte: `werte.mjs` 0 Befunde in deinen Dateien; keine Beliebigwerte, keine Schatten, Verläufe, Rundungen, Pill-Badges, Plus-Kartenraster (Feld mit einzelnem „+“ oben als Schmuck); Abstände nur Skala 1/2/3/4/6/8/12/16/24/32; Schrift nur `text-fs-1…7`; Zahlen, Maße, Normen, Zeiten in `font-mono`; je Bildschirm höchstens ein roter Blickfang (die Leitachse) – keine weiteren roten Linien.
- Text: Überschriften, Fließtexte, Links, IDs, ARIA und Lesefolge der Inhalte exakt; Abschnitte dürfen ihre Darstellung wechseln, nicht ihre Reihenfolge (außer wo der Maßstab es ausdrücklich erlaubt). `node _werkstatt/werkzeuge/textprobe.cjs <(git show HEAD:<Datei>) -- <Datei>` je Datei, ENTFERNT nur bei wortgleicher Wiederkehr oder gemeldetem Mikrotext.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/(bestand)/layout.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Keine Änderung an Daten (`src/config/*`), Hooks (`src/lib/formulare/*`), Funnel-Innerem (`src/components/funnels/**` nur importieren) und an gemeinsamen Bausteinen in `src/components/kern/*` – Bedarf als GEMEINSAME DATEIEN melden.
- Getestete Namen (Liste unten) bleiben; die Funktionstests deiner Seiten müssen grün bleiben.
- Keine neue Bewegung außer den ausdrücklich genannten; das Planblatt des Einstiegs (E4-NACH-01/-02) nicht verändern.
- `logik.js`, `stile.js`, `OptionGroup.jsx`, `Auswahlgruppe.jsx`, `Schritt1.jsx`, `Schritt4.jsx`, `Erfolg.jsx`, `WhatsAppGeoeffnet.jsx` und der Hook nur lesen.
- Test `funktion-konfigurator.spec.mjs` (46 Fälle, darunter 2 bekannte fixme) muss grün bleiben; Namen, IDs, `aria-*` der Felder unverändert.

## Schritte
1. 1. Lies deine Dateien vollständig, die Referenz und die genannten Bausteine; die Specs, die deine Seiten abdecken (`grep -rln '<pfad>' _werkstatt/werkzeuge/tests`).
2. 2. Befunde einzeln umsetzen; im Dev-Server (4320) jede deiner Seiten bei 390, 768 und 1440 px über die ganze Höhe ansehen (Bilder in den Scratch-Ordner, `node _werkstatt/werkzeuge/einzelbild.mjs --base http://127.0.0.1:4320 --seite <pfad> --voll`).
3. 3. Prüfstufe A: `bash _werkstatt/werkzeuge/pruefe-a.sh E4-NACH-13 'src/app/(bestand)/fliesen/konfigurator/page.jsx' 'src/components/funnels/FliesenKonfigurator/index.jsx' 'src/components/funnels/FliesenKonfigurator/Schritt2.jsx' 'src/components/funnels/FliesenKonfigurator/Schritt3.jsx' 'src/components/funnels/FliesenKonfigurator/ResultSummary.jsx' -- /fliesen/konfigurator` – Ergebnis je Stufe.
4. 4. `node _werkstatt/werkzeuge/werte.mjs --dateien <deine Dateien, kommagetrennt>` – 0 Befunde.
5. 5. Rückgabe nach Ausgabeformular; jede Mikrotext-Änderung als Liste alt → neu.

## Schnellprüfung und Selbstprüfung
- Prüfstufe A mit `bash _werkstatt/werkzeuge/pruefe-a.sh <Kennung> <geänderte Dateien…> -- <Ansichten…>` (Typprüfung, Lint der Dateien, betroffene Funktionstests gegen 4320, Bilder 390/1440, Textvergleich der eigenen Seiten). Ergebnis und Bildpfade in die Rückgabe.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Textprobe je Datei gegen HEAD: nur gemeldete Mikrotexte entfernt.
- Je Bildschirm bei 1440 und 390 px: keine leere Rasterspalte > 200 px, keine zwei gleich gebauten Abschnitte in Folge, nichts abgeschnitten.

## Bestandsschutz: getestete Selektoren und Namen (müssen erhalten bleiben)
Vollständige Liste: `_werkstatt/berichte/E0-KUN-05-qualitaet.md`, Abschnitt 2. IDs (`#hero-name`, `#calc-*`, `#funnel-*`, `#termin-*`, `#booking-consent`, `#projekt-check`, `#whatsapp-floating-btn`, `#cookie-settings`, `#main-content`), ARIA-Namen von Knöpfen, Dialogen, Gruppen und Labels, `aria-pressed`/`aria-current`/`aria-live`-Verhalten und Nutzlast-Schlüssel bleiben exakt gleich.

## Ausgabeformular
In `_werkstatt/pakete/E4-NACH-13.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E4-NACH-13 · BEREIT ZUR RÜCKGABE ===
