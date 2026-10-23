E2-BAU-03 · Baumeister · Modell: ARBEITSMODELL · Stufe 2 · Kern-Version: v2 · Umfang: Neue Bausteine Tabelle (Region mit Name und tabindex bei Überlauf) und Bildfeld (next/image im Raster), mit Schaufenster
Schreibrechte (exakt): `src/components/kern/Tabelle.tsx (neu)`, `src/components/kern/Bildfeld.tsx (neu)`, `src/app/werkstatt-schaufenster/tabelle/page.dev.tsx (neu)`, `_werkstatt/pakete/E2-BAU-03.rueckgabe.md`, dazu die Rückgabe `_werkstatt/pakete/E2-BAU-03.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Baumeister
Du baust einen Baustein oder eine Ansicht nach Referenz, Kern-Auszug und Konventionen des Projekts und machst die Schnellprüfung. Häufige Fehler: Werte außerhalb des Designsystems; Zustände und Mobilansicht vergessen; Dateien außerhalb der Schreibrechte ändern.

## Aufgabe in einem Satz
Baue die Bausteine Tabelle und Bildfeld exakt im Stil der Referenzbausteine, zugänglich (axe: scrollable-region-focusable gelöst) und ohne Layoutverschiebung, und zeige sie im Dev-Schaufenster mit echten Inhalten aus dem Bestand.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## K-004 Stack und Konventionen
- Next.js 16.3.6 (App Router, statisch vorgerendert, Turbopack), React 19, Tailwind 4.3, TypeScript strict mit `allowJs` (Seiten überwiegend `.jsx`). Nur Deutsch (`lang="de"`), kein Dunkelmodus (`color-scheme: light`). Vor jeder API-Nutzung die passende Seite in `node_modules/next/dist/docs/` lesen (AGENTS.md).
- Struktur: Seiten `src/app/**/page.(jsx|tsx)`; Komponenten nach Bereich `src/components/<bereich>/`; neue Gestaltungsbausteine `src/components/kern/`; Icons `src/components/icons/` (je Icon eine SVG-Datei unter `src/components/icons/svg/`, erzeugtes Sprite `sprite.svg`, Komponente `Icon.tsx`); Bewegung `src/lib/motion/`; Pläne `src/lib/plaene/` (Planvorgaben als Daten). Inhalte und Daten `src/config/*` (u. a. `company.js` = COMPANY_DATA, `services.js`, `cities.ts`, `reviews.js`, `navigation.js`) – Telefon, Adresse und Öffnungszeiten nur aus COMPANY_DATA.
- Styling: Tailwind-Utilities über die Tokens aus K-005 (`@theme static` in `src/app/globals.css`, einzige Quelle). Keine Beliebigwerte (`p-[13px]`), keine Hex-/rgb-Werte im Code, kein Inline-`style` außer dem Setzen von CSS-Variablen (`style={{ '--plan-spalten': 6 }}`), keine Dauern als Zahl. Komponentenklassen nur in `globals.css` (`@layer components`) und nur, wenn ein Muster ≥ 3-mal vorkommt.
- Alt-System (bis zum Abbau in E6): `src/styles/tokens.css` liegt als `layer(alt)` unter dem Theme; alte Klassen (`btn-primary`, `btn-ghost`, `eyebrow*`, `glass-*`, `ambient-*`, `ceramic-*`, `icon-chip`, `text-ceramic-gradient`) sind Aliasse und werden nur entfernt, wenn die Suche über `src/`, `src/lib/email`, Tests und Analyse-Konfiguration null Nutzungen zeigt. Wirkungslose Klassen (`rounded-tile-*`, `eyebrow-orange`, `eyebrow-sky`, `ambient-glow-warm`, `shadow-tile`, `via-neutral-850`) werden in jeder berührten Datei entfernt, nie definiert.
- Schriften: `next/font/local` mit wörtlichen Pfaden unter `src/app/fonts/`, `adjustFontFallback: false`, eigene Ersatzschriften mit Metrik-Anpassung (K-006), nur Archivo vorgeladen. Variablen `--font-archivo`, `--font-plex-mono` an `<html>`.
- Bilder: `next/image`, `preload` nur für ein tatsächliches LCP-Bild (Standard: kein Bild ist LCP), `sizes` immer gesetzt, Qualität aus `images.qualities` ([75]), Seitenverhältnis der Datei.
- Client-Komponenten (`'use client'`) nur für Interaktion; Inhalte rendern auf dem Server und sind ohne JavaScript sichtbar. Provider nur dort, wo sie gebraucht werden (E-010).
- Bewegung: zentral `src/lib/motion/` (K-007). Startklasse per Inline-Skript im `<head>`, `<html suppressHydrationWarning>`. Keine Erkennung von Testumgebungen (kein `navigator.webdriver`, keine Sonderwege für Lighthouse oder Headless).
- Seitenwechsel: React `<ViewTransition>` (ohne Konfiguration im App Router), `Link` mit `transitionTypes={['nav-forward']}` für Vorwärts-Navigation zum Plan; Kopf mit `viewTransitionName: 'kopf'` verankert; `::view-transition { pointer-events: none }`.
- Wege: Weiterleitungen über `redirects()` in `next.config.ts` (308); 404 über `not-found.tsx` mit Status 404. Adressen bleiben erhalten.
- Vor dem Umbenennen/Entfernen von Klassen, IDs, `data-*`: Suche im ganzen Projekt einschließlich `src/lib/email`, `_werkstatt/werkzeuge/tests`, `TrackingScripts`, `cookie-inventory.ts`; Funde bleiben als Alias. Getestete Selektoren und Namen: `berichte/E0-KUN-05-qualitaet.md` Abschnitt 2 – bleiben exakt.
- Prüfen: `npm run build`, `typecheck`, `lint`, `npm test` (Node ≥ 22.6), `qa:graph`; Werkzeuge in `_werkstatt/werkzeuge` (EINRICHTUNG.md). Je Paket Prüfstufe A über `pruefe-a.sh`.

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

## K-009 Komponenten, Zustände, Ansichtsarten
- Zustände für jedes Bedienelement: Ruhe, Hover, Fokus, gedrückt, deaktiviert, lädt, Fehler, Erfolg; Leerzustände; 404 mit Charakter (Plan mit verrutschter Fliese, Weg zurück). Fokus: `outline: 2px solid var(--color-tinte)`, `outline-offset: 2px`, auf Tinte-Flächen `kalk`; nie verdeckt (scroll-padding, keine überlagernden festen Ebenen); übersteht `forced-colors`.
- Knöpfe: Hauptknopf Tinte-Fläche mit Kalk-Text, `rounded-none`, min. 44 px hoch; Nebenknopf 1 px Strich-Rahmen; Textlink unterstrichen (Offset 3 px). Knöpfe sagen, was passiert („Aufmaß anfragen“, „Anrufen“, „Per WhatsApp schreiben“).
- Formulare: sichtbare Beschriftung über dem Feld (`htmlFor`/`id`), `autocomplete`, Hilfetext `tinte-2`, Fehler mit Versatz-Zeichen + Text + `role="alert"`, Erfolg „Notiert.“ mit Inhabername und Referenz; ein Formular je Bildschirm.
- Rahmen: Kopf (Logo unverändert, Hauptnavigation ab `lg` mit Mega-Menü als echte Links, Telefon in Mono, Knopf „Aufmaß anfragen“; mobil Menü-Schalter mit Popover-Menü, vor der Hydrierung bedienbar; fest, `shadow-fuge`); untere Leiste mobil (Anrufen · WhatsApp · Anfrage) als einzige weitere feste Ebene; Fuß auf Tinte mit Schriftfeld und Seitenindex; WhatsApp am Desktop flacher Knopf (`#whatsapp-floating-btn`); Einwilligungsbanner als Schriftfeld (Inhalt, Reihenfolge, gleichwertige Knöpfe unverändert; mobil über der Leiste, Desktop links unten ≤ 28rem; verdeckt nie die Hauptaktion des ersten Bildschirms).
- Bausteine (`src/components/kern/`): `Einstieg` (Erzählung | Arbeit), `Abschnitt` (Kopf mit Mono-Etikett + H2), `Feldraster`, `Merkliste` (Fugenkreuz), `Kennwerte` (Mono), `Schrittfolge`, `Kundenstimme` (Anriss, Quelle in Mono), `Schriftfeld`, `RatgeberListe`, `Tabelle` (Region mit Name und `tabindex=0` bei Überlauf), `Hinweis`, `Bildfeld`, `Knopf`, `Feld` (Eingabe, Auswahl, Textbereich, Kontrollkästchen, Radiogruppe), `Verlegeplan`, `Fugenkreuz`, `Laserachse`. Bestand an Ort und Stelle umgebaut: `FinalCTA` = Abschluss, `QualityPromise` = Merkliste, `ReviewCarousel`/`ReviewCard` = Kundenstimme, `FAQAccordion` = FAQ, `TrustStrip` = Schriftfeld, `GoogleReviewsBadge` = Kennwert.
- Erzählansicht: Einstieg mit Achse und H1 links bündig, Schriftfeld, wechselnde Abschnittsstrukturen, genau ein großer Moment, Leitachse. Arbeitsansicht: kompakter Kopf (H1 `text-fs-6`), Formular oder Liste im ersten Bildschirm, nur Rückmeldung und Zustandswechsel.

## K-011 Budgets
Mobil (Lighthouse, Median aus 3): LCP ≤ 2,5 s · CLS ≤ 0,1 · TBT ≤ 200 ms · Leistung ≥ 90 · Eingabeverzögerung ≤ 200 ms. Zusätzliches JS für Bewegung ≤ 60 KB gzip · Schriften ≤ 250 KB gesamt · Icon-SVG ≤ 1,5 KB · Illustrations-SVG ≤ 40 KB gzip. Keine Hauptansicht schlechter als E0 um mehr als die Spanne der drei E0-Läufe. Je Paket mit neuer Grafik oder Bewegung: Budget im Paket genannt.

## Maßstab
- Referenzbausteine (Stil verbindlich): `src/components/kern/{Abschnitt,Feldraster,Einstieg,Knopf}.tsx`, Klassen aus `src/components/kern/stile.ts`; Schaufenster-Muster `src/app/werkstatt-schaufenster/bausteine/page.dev.tsx`.
- Bestandstabellen als Anschauung (nicht ändern): `src/app/fliesen/verlegetechnik/page.jsx`, `src/app/untergrund-abdichtung/din-18534/page.jsx`, `src/app/fliesen/holzoptik/page.jsx` (Suche nach `<table`).
- Next 16 Bilder: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` (u. a. `preload` statt `priority`, `sizes`, `quality` muss in `images.qualities` stehen – hier nur 75). Bilder des Projekts unter `public/images/bad/` (Seitenverhältnis aus der Datei lesen, nicht schätzen).

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Nur neue Dateien. Keine Werte außerhalb von KERN (`werte.mjs` = 0 Befunde). Keine erfundenen Tabelleninhalte: im Schaufenster eine Tabelle aus einer Bestandsseite wortgleich übernehmen und die Quelle im Code-Kommentar nennen.

## Schritte
1. `Tabelle.tsx`: `export default function Tabelle({ name, kopf, zeilen, legende, ersteSpalteKopf = true, className })`, `kopf: ReactNode[]`, `zeilen: ReactNode[][]`, optional `legende` (unter der Tabelle, Mono `text-fs-1`). Aufbau: äußerer `<div role="region" aria-label={name} tabIndex={0}>` mit `overflow-x-auto` und sichtbarem Fokus; darin `<table>` mit `<caption class="sr-only">{name}</caption>`, Kopfzeile in Mono `text-fs-1 text-tinte-2`, Zellen `text-fs-2`, Zeilentrennung als Fuge (`border-b border-fuge`), erste Spalte bei `ersteSpalteKopf` als `<th scope="row">`, Zahlen rechtsbündig in Mono (Prop je Spalte `ausrichtung?: ('links'|'rechts')[]`). Mobil: Tabelle behält ihre Spalten und scrollt in der Region; rechter Rand zeigt per Fuge, dass mehr kommt.
2. `Bildfeld.tsx`: `export default function Bildfeld({ src, alt, breite, hoehe, spalten = 'voll', lcp = false, beschriftung, quelle, className })`. Nutzt `next/image` mit festen `width/height` aus der Datei (Seitenverhältnis bleibt, kein Zuschnitt per CSS), `sizes` passend zu `spalten` ('voll' = `(min-width: 1312px) 1312px, 100vw`, 'halb' = `(min-width: 768px) 50vw, 100vw`, 'drittel' entsprechend), `preload` nur wenn `lcp`, sonst Standard-Lazy-Loading; `quality` nicht setzen (Standard 75). Rahmen: `border border-fuge bg-fliese`, Beschriftung als `<figcaption>` (Text `text-fs-2`, Quelle Mono `text-fs-1`). `alt` ist Pflicht (leerer String nur bei rein dekorativen Bildern, dann `aria-hidden` am figure).
3. Schaufenster `tabelle/page.dev.tsx` (Route `/werkstatt-schaufenster/tabelle`, `metadata` mit `robots: { index: false, follow: false }`): eine Bestandstabelle wortgleich als `Tabelle` (Quelle im Kommentar), eine schmale Tabelle (3 Spalten, gleiche Quelle oder zweite Bestandsseite), zwei Bildfelder (voll und halb) mit Bildern aus `public/images/bad/` und deren vorhandenen Alt-Texten aus dem Bestand (Fundstelle per Suche nach dem Dateinamen in `src/`).
4. Sichtprüfung: `node _werkstatt/werkzeuge/einzelbild.mjs --base http://127.0.0.1:4320 --seite /werkstatt-schaufenster/tabelle --ansichten m390,d1440 --voll --ziel <Scratch>`; dazu axe auf der Schaufensterseite (keine Befunde `scrollable-region-focusable`, `table-*`, `image-alt`).

## Schnellprüfung und Selbstprüfung
- Prüfstufe A mit `bash _werkstatt/werkzeuge/pruefe-a.sh <Kennung> <geänderte Dateien…> -- <Ansichten…>` (Typprüfung, Lint der Dateien, betroffene Funktionstests gegen 4320, Bilder 390/1440, Textvergleich der eigenen Seiten). Ergebnis und Bildpfade in die Rückgabe.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- `_werkstatt/werkzeuge/pruefe-a.sh E2-BAU-03 <deine neuen Dateien> -- /werkstatt-schaufenster/tabelle` GRÜN (Textstufe darf mangels Basis ÜBERSPRUNGEN sein).
- `werte.mjs` über deine Dateien: 0 Befunde; Bildfeld ohne Layoutverschiebung (feste Maße im HTML sichtbar).

## Ausgabeformular
In `_werkstatt/pakete/E2-BAU-03.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E2-BAU-03 · BEREIT ZUR RÜCKGABE ===
