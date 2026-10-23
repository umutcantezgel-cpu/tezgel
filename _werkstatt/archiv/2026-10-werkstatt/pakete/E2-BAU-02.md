E2-BAU-02 · Baumeister · Modell: ARBEITSMODELL · Stufe 2 · Kern-Version: v2 · Umfang: Neue Bausteine Schrittfolge, RatgeberListe, Hinweis nach den Referenzbausteinen, mit Schaufenster
Schreibrechte (exakt): `src/components/kern/Schrittfolge.tsx (neu)`, `src/components/kern/RatgeberListe.tsx (neu)`, `src/components/kern/Hinweis.tsx (neu)`, `src/app/werkstatt-schaufenster/schritte/page.dev.tsx (neu)`, `_werkstatt/pakete/E2-BAU-02.rueckgabe.md`, dazu die Rückgabe `_werkstatt/pakete/E2-BAU-02.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Baumeister
Du baust einen Baustein oder eine Ansicht nach Referenz, Kern-Auszug und Konventionen des Projekts und machst die Schnellprüfung. Häufige Fehler: Werte außerhalb des Designsystems; Zustände und Mobilansicht vergessen; Dateien außerhalb der Schreibrechte ändern.

## Aufgabe in einem Satz
Baue die Bausteine Schrittfolge (Ablauf in nummerierten Schritten an der Fuge), RatgeberListe (Artikelliste als Zeilen an der Fuge statt Karten) und Hinweis (Merk-, Warn- und Fehlerhinweis) exakt im Stil der Referenzbausteine und zeige sie im Dev-Schaufenster mit echten Daten.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
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
- Rand: mobil `px-4`, Tablett `md:px-8`, Desktop `lg:px-12`. Abschnittsabstand Erzählansicht `py-24`/`lg:py-32`, Arbeitsansicht `py-12`/`lg:py-16`.
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

## K-006 Typografie und Komposition
- Familien (OFL 1.1, selbst gehostet, woff2, Lizenzvermerk `src/app/fonts/LIZENZEN.md`):
  - **Archivo** variabel, beschnitten auf wdth 74–100 und wght 400–800 (`font-stretch: 74% 100%`), Teilmenge latin. Anzeige und Überschriften: Breite 74 %, Gewicht 760 (`font-anzeige`). Text: Breite 100 %, Gewicht 400/600 (`font-text`).
  - **IBM Plex Mono** 400 (optional 500) für Messbares und Belegbares: Normen, Rutschklassen, Telefonnummern, PLZ, Jahreszahlen, Bewertungen, Schrittnummern, Etiketten, Bildunterschriften. Nie für Fließtext; keine Versalien-Sperrung. Die Plex-Datei enthält kein ß (die Glyphe liest sich wie „B“); ß setzt automatisch Archivo. Zeichen außerhalb der Schriftabdeckung (Prüfung `glyphen.mjs`) werden nicht in Mono gesetzt oder durch ein Icon ersetzt (z. B. Stern).
  - Ersatzschriften (gemessen an Liberation Sans/Mono = Arial-/Courier-Metrik): `Archivo Ersatz` size-adjust 98,7 %, ascent 88,9 %, descent 21,3 %; `Archivo Anzeige Ersatz` (Arial Bold) size-adjust 79 %, ascent 111,2 %, descent 26,6 %; `Plex Ersatz` size-adjust 100 %, ascent 102,5 %, descent 27,5 %.
- Skala (7 Stufen, `--text-fs-N` mit eigener Zeilenhöhe; Max ≤ 2,5 × Min):

  | Klasse | Größe | Zeilenhöhe | Einsatz |
  |---|---|---|---|
  | `text-fs-1` | clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem) | 1.5 | Etiketten, Mono-Kleinangaben |
  | `text-fs-2` | clamp(0.9375rem, 0.9rem + 0.15vw, 1rem) | 1.55 | Nebentext, Formularhilfe |
  | `text-fs-3` | clamp(1.0625rem, 1.02rem + 0.2vw, 1.1875rem) | 1.6 | Fließtext |
  | `text-fs-4` | clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem) | 1.5 | Vorspann, H4 |
  | `text-fs-5` | clamp(1.5rem, 1.25rem + 1.1vw, 2.25rem) | 1.15 | H3 |
  | `text-fs-6` | clamp(2rem, 1.5rem + 2.2vw, 3.5rem) | 1.1 | H2; H1 auf Arbeitsansichten |
  | `text-fs-7` | clamp(2.75rem, 1.4rem + 5vw, 6.5rem) | 1.04 | H1 auf Erzählansichten |
- Laufweite: ≥ fs-6 −0,015 em, Mono +0. Maß Fließtext `max-w-mass` (66ch, 60–75 Zeichen).
- Satz: `text-wrap: balance` für Überschriften, `pretty` für Absätze; `hyphens: auto` (mit `lang="de"`) für Fließtext, Überschriften mit `&shy;` an Fugenstellen langer Komposita (Darstellung, Wortlaut gleich); Display-Größen mobil am längsten Wort bei 390 px geprüft. Typografische Zeichen: „…“, Gedankenstrich, geschütztes Leerzeichen vor Einheiten.
- Komposition: Einstieg links bündig an der Achse (nie zentriert mit zwei Knöpfen vor abstraktem Hintergrund); ein klarer Blickfang je Bildschirmhöhe; Abschnitte wechseln Struktur und Dichte (Feldraster ↔ Text an Achse ↔ Tabelle ↔ Plan); bewusste Brüche: Drittelverband, Plan über zwei Spalten hinaus, Schriftfeld rechts aus dem Raster. Mobil eigene Reihenfolge (H1 → Kennwerte → Hauptaktion → Plan).

## K-007 Bewegungssystem und Register
- Haltung: Bewegung richtet aus. Dinge rücken in die Flucht, der Laser schaltet ein, nichts federt, nichts schwebt.
- Technik: nur `transform`/`translate`/`scale`/`rotate` und `opacity`; Linien ziehen sich per `scaleX/scaleY` mit `transform-origin`; Aufklapphöhen über `grid-template-rows` (Registereintrag `aufklappen`). Auslöser über IntersectionObserver (`src/lib/motion/`); scroll-gebundene Szenen per CSS `animation-timeline: view()`/`scroll()`, Zweig `@supports not (animation-timeline: view())` = Zustand bei reduzierter Bewegung (Endzustand, alle Inhalte sichtbar).
- Sichtbarkeit: Inline-Head-Skript setzt `html.k-bewegung` vor dem ersten Rendern nur bei `prefers-reduced-motion: no-preference`. Startzustände hängen ausschließlich an dieser Klasse. Das Modul meldet sich mit `html.k-bereit`; meldet es sich nicht binnen 2 s, setzt das Head-Skript `k-bereit` selbst (alles sichtbar). Zustand eines Elements in `data-motion-stand="aus|an"` (von React nicht verwaltet); nach jedem Seitenwechsel neu beobachten. Im ersten Bildschirm nur Versatz ≤ 14 px bei Deckkraft 1 (LCP). `@media print` und `forced-colors` heben Startzustände auf. Ohne JavaScript ist alles sichtbar.
- Reduziert: Überblendung (dauer-2) oder Sofortzustand, gleiche Information, keine Lage- oder Größenänderung. Hover-Effekte nur bei `(hover: hover) and (pointer: fine)`; Touch bekommt `:active`-Rückmeldung. Was > 5 s automatisch läuft, hat einen sichtbaren Pause-Knopf (derzeit: nichts). Nichts blinkt öfter als 3 × pro Sekunde.
- Choreografie: Lesefluss, eine Richtung je Abschnitt, je Bildschirmhöhe höchstens ein Auftritt mit Gewicht; je Erzählansicht genau ein großer Moment; Arbeitsansichten nur `aufklappen`, `druck`, `zustand`, `laden`, `notiert`, `seitenwechsel`.
- Große Momente (≤ 1,6 s gesamt, halten keinen Inhalt zurück) mit Austauschprobe:

  | Ansicht | Moment | Austauschprobe |
  |---|---|---|
  | `/` | **SIG-1 Kreuzlinie**: Waage und Lot wachsen aus dem Kreuzpunkt, die Zeilen der H1 rücken in die Flucht; mobil nur das Lot | Laserrot = Logo-Rot; Achse auf Tezgels Plan mit Schriftfeld |
  | `/bad` | **Szene „Verlegeplan entsteht“** (scroll-gebunden): Aufmaß mit Prüfhaken Ebenheit · Restfeuchte · Tragfähigkeit → Fugenbild mit Passstücken → verlegt und abgenommen | Tezgels eigener Ablauftext 01–03 |
  | `/leistungen` | **SIG-3 Verlegeplan je Leistung**: Achse rückt auf die Mitte, Passstücke werden gleich (Hover/Fokus, mobil beim Eintritt) | genau Tezgels vier Leistungen, gezeichnet |
  | `/leistungen/[id]` | Plan des Einstiegs ist das gemeinsame Element des Seitenwechsels (Morph ab `lg`, vorwärts); beim Laden rückt er in die Flucht | Fortsetzung von SIG-3 |
  | `/standorte`, `/standorte/[stadt]` | **Einzugsband**: Fugenband mit Zonen ≤ 10 / ≤ 25 / ≤ 50 km ab Aßlar; Zonen setzen sich nacheinander, die eigene Stadt (auf `[stadt]`) bekommt das Fugenkreuz | Tezgels 13 Orte aus `cities.ts` |
  | `/fliesen` | **Verband-Umschalter**: Kreuzfuge · Halbverband · Drittelverband als Radiogruppe; die Reihen versetzen sich um ½ bzw. ⅓ Plattenlänge | Verlegemuster sind Tezgels Fachgebiet und Inhalt der Seite |
  | `/ueber-uns` | **Fugenband der Firmengeschichte**: Laser zieht beim Scrollen von 2008 bis heute, je Jahresmarke ein Fugenkreuz | Tezgels eigene Zeitleiste |
- Leitelement (alle Erzählansichten): **Laserachse** als Lot im Seitenfluss (`[data-leitachse]`), Grundschicht `fuge`, das rote Stück wächst mit dem Scrollfortschritt der Seite (`animation-timeline: scroll()`), rückwärts genauso; mobil ≥ 8 px Abstand zum Text; an Abschnittsgrenzen ein Fugenkreuz. Schneidet nie Text.
- Register (jedes animierte Element trägt `data-motion="<Kennung>"`; `register.json` ist die Maschinenfassung):

  | Kennung | Zweck | Auslöser | Dauer · Kurve | Reduziert |
  |---|---|---|---|---|
  | `sig-kreuzlinie` | Charakter (SIG-1) | Laden | dauer-5 · laser | Endzustand sofort |
  | `sig-flucht` | Hierarchie: H1-Zeilen in die Flucht | Laden | dauer-4 · setzen, Staffel | kein Versatz |
  | `szene-ablauf` | Zusammenhang: Plan entsteht im Ablauf | Scroll (view-timeline) | linear an Scroll | alle drei Zustände nebeneinander |
  | `sig-plan` | Orientierung: Plan richtet sich aus | Hover/Fokus, mobil IO 40 % | dauer-2 · setzen | Sofortzustand |
  | `einzugsband` | Orientierung: Zonen ab Aßlar | IO 30 % | dauer-3 · setzen, Staffel 3 | Endzustand sofort |
  | `verband` | Rückmeldung: Verband wechselt | Auswahl (Radiogruppe) | dauer-2 · setzen | Sofortzustand |
  | `fugenband` | Zusammenhang: Jahre an der Fuge | Scroll (view-timeline) | linear an Scroll | Endzustand |
  | `leitachse` | Orientierung: Lesefortschritt an der Achse | Scroll (scroll-timeline) | linear an Scroll | rotes Stück voll, statisch |
  | `anriss` | Hierarchie: Schlüsselwort einer Stimme | IO 50 % | dauer-4 · setzen | Strich sofort sichtbar |
  | `auftritt` | Hierarchie: Abschnitt rückt 8 px in die Flucht | IO 20 % | dauer-3 · setzen | Überblendung dauer-2 |
  | `aufklappen` | Rückmeldung: Menü, Akkordeon, Mega-Menü | Klick/Taste | auf: dauer-2 · setzen; zu: dauer-1 · weg | Sofortzustand |
  | `druck` | Rückmeldung: Knopf 1 px nach unten | `:active` | dauer-1 · setzen | Farbwechsel |
  | `zustand` | Rückmeldung: Hover/Fokus-Farbwechsel, Fuge → Strich | Hover/Fokus | dauer-1 · setzen | gleich (Farbe ist keine Bewegung) |
  | `notiert` | Rückmeldung: Erfolg, Haken zeichnet sich | Erfolg | dauer-3 · setzen | Haken sofort |
  | `laden` | Rückmeldung: Fuge läuft (ab 300 ms, ≥ 500 ms sichtbar) | Absenden | linear, wiederholt | statischer Text „Wird gesendet …“ |
  | `seitenwechsel` | Zusammenhang: Plan-Morph `/leistungen` → `[id]`, sonst Überblendung | Navigation | Morph dauer-3 · setzen; Überblendung dauer-2 | keine |

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

## K-010 Ton und Mikrotexte
- Überschriften und Fließtext sind unantastbar (nur Vorschlag in TEXTVORSCHLAEGE.md); Rechtstexte unverändert.
- Ton: Sie-Form, ruhig, konkret, fachlich; keine Floskeln („nahtlos“, „innovativ“, „ganzheitlich“, „Entdecken Sie …“), keine Superlative.
- Mikrotexte direkt (Protokoll alt → neu in TEXTVORSCHLAEGE.md): Knöpfe, Labels, Etiketten (vormals Badges – Wortlaut bleibt, Darstellung Mono), Alt-Texte, Zustände. Beispiele: „Aufmaß anfragen“, „Anrufen“, „Per WhatsApp schreiben“, „Wird gesendet …“, „Notiert. Ihre Anfrage liegt bei Deniz Tezgel.“ Getestete Namen bleiben exakt.
- Alt-Texte beschreiben, was zu sehen ist, und geben Bilder nicht als eigene Projektarbeit aus, solange ihre Herkunft offen ist (MENSCHEN M-02).

## Maßstab
- Referenzbausteine (Stil verbindlich): `src/components/kern/{Abschnitt,Feldraster,Einstieg,Knopf,Fugenkreuz,Verlegeplan}.tsx`, Klassen aus `src/components/kern/stile.ts`; Icons nur über `src/components/icons/Icon.tsx` (Namen in `src/components/icons/namen.ts`: u. a. hinweis, fehler, info, haken, pfeil-rechts, dokument, uhr).
- Muster für Listen an der Fuge: Menüblatt `src/components/common/MobileMenu.jsx` (Zeilen mit `border-b border-fuge`, Name + Beschreibung, Pfeil rechts), Schaufenster-Muster `src/app/werkstatt-schaufenster/bausteine/page.dev.tsx`.
- Daten fürs Schaufenster: `processSteps` aus `@/config/company` (Schrittfolge), `posts` aus `@/config/posts` und `categories` aus `@/config/blog` (RatgeberListe, die ersten 5 Artikel). Nichts erfinden; Hinweistexte im Schaufenster als erkennbare Beispieltexte („Beispiel: …“).

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Nur neue Dateien; keine bestehende Komponente ändern. Keine Werte außerhalb von KERN (`node _werkstatt/werkzeuge/werte.mjs --dateien <deine Dateien> --ziel <Scratch>` = 0 Befunde).
- Bewegung nur über das Register: Schrittfolge darf `data-motion="auftritt"` am Listenelement tragen (Prop `auftritt`, Standard aus); kein eigenes CSS, keine Keyframes.

## Schritte
1. `Schrittfolge.tsx`: `export default function Schrittfolge({ schritte, ausrichtung = 'senkrecht', auftritt = false, className })`, `schritte: { nummer?: string; titel: ReactNode; untertitel?: ReactNode; text?: ReactNode }[]` (Nummer Standard „01“, „02“ …). Senkrecht: geordnete Liste (`<ol>`), links eine 1-px-Fuge als Lot, an jedem Schritt ein Fugenkreuz `size-3` auf dem Lot, Nummer in Mono, Titel `text-fs-4 font-semibold`, Untertitel Mono, Text `text-fs-3 text-tinte-2`. Waagrecht (ab lg): Felder an der Fuge in einer Reihe (Feldraster-Optik), Nummer oben; mobil fällt waagrecht auf senkrecht zurück.
2. `RatgeberListe.tsx`: `export default function RatgeberListe({ artikel, ueberschriftEbene = 'h3', className })`, `artikel: { href: string; titel: string; anriss?: string; kategorie?: string; datum?: string; lesezeit?: string }[]`. Je Artikel eine Zeile an der Fuge: Kategorie und Datum/Lesezeit als Mono-Zeile, Titel als Überschrift der gewählten Ebene mit dem Link darin (`<h3><a href>`; die Tests der Blog-Liste suchen `h3 a[href^="/blog/"]`), Anriss `text-fs-3 text-tinte-2`, Pfeil rechts; ganze Zeile per Hover hervorgehoben (`hover:bg-fliese`, `data-motion="zustand"`), Fokus sichtbar am Link.
3. `Hinweis.tsx`: `export default function Hinweis({ art = 'merk', titel, children, rolle, className })`, Arten: merk (Icon info, Rand `border-strich`), warn (Icon hinweis, Rand `border-tinte`), fehler (Icon fehler, Rand und Icon `laser-tief`), erfolg (Icon haken, Farbe `abnahme`). Linke 2-px-Kante in der Artfarbe, Fläche `bg-fliese`, Titel `font-semibold`, Text `text-fs-2`. `rolle` setzt optional `role="alert"` bzw. `role="status"`; ohne Prop keine Rolle.
4. Schaufenster `schritte/page.dev.tsx` (Route `/werkstatt-schaufenster/schritte`, `metadata` mit `robots: { index: false, follow: false }` wie im Muster): Schrittfolge senkrecht und waagrecht mit `processSteps`; RatgeberListe mit 5 Artikeln aus `posts` (Kategorie-Name über `categories`); alle vier Hinweis-Arten, je einmal mit und ohne Titel.
5. Sichtprüfung: `node _werkstatt/werkzeuge/einzelbild.mjs --base http://127.0.0.1:4320 --seite /werkstatt-schaufenster/schritte --ansichten m390,d1440 --voll --ziel <Scratch>`; Bilder ansehen, Ungleichgewichte korrigieren (Abstände nur auf der Skala, ein Blickfang je Bildschirmhöhe).

## Schnellprüfung und Selbstprüfung
- Prüfstufe A mit `bash _werkstatt/werkzeuge/pruefe-a.sh <Kennung> <geänderte Dateien…> -- <Ansichten…>` (Typprüfung, Lint der Dateien, betroffene Funktionstests gegen 4320, Bilder 390/1440, Textvergleich der eigenen Seiten). Ergebnis und Bildpfade in die Rückgabe.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- `_werkstatt/werkzeuge/pruefe-a.sh E2-BAU-02 <deine neuen Dateien> -- /werkstatt-schaufenster/schritte` GRÜN (Textstufe darf mangels Basis ÜBERSPRUNGEN sein).
- `werte.mjs` über deine Dateien: 0 Befunde; axe-Kurzprüfung der Schaufensterseite (z. B. `node _werkstatt/werkzeuge/axe.mjs --satz e2-bau-02 --seiten /werkstatt-schaufenster/schritte --ansichten m390,d1440 --base http://127.0.0.1:4320` mit Ziel im Scratch, falls das Werkzeug `--ziel` kennt): 0 ernste oder kritische Befunde in deinen Bausteinen.

## Ausgabeformular
In `_werkstatt/pakete/E2-BAU-02.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E2-BAU-02 · BEREIT ZUR RÜCKGABE ===
