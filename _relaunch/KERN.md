# KERN · Gestaltungskern Fliesenverlegung Tezgel · Version 1.2

Stand: 10.10.2026, P2 (v1.2 nach Gegenprüfung P2-GEG-02). Quelle der Richtung: E-008 (Grundsystem A „Fuge und Achse“ + Vertrauensschicht aus C). Er gewinnt gegen Plan und einzelne Vorlieben. Über ihm stehen Grenzen und Leitplanken, Bestand und Funktion, Barrierefreiheit und Leistung, Definition of Done und Wünsche. Jedes Paket nennt die Kern-Version, gegen die es gebaut wurde. **[A]** = Annahme, offen in MENSCHEN.md.

## Das Projekt in fünf Sätzen
1. Wir werten die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) zu einer eigenständigen, messbar besseren Seite auf, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Fotos und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (Lighthouse mobil ≥ 90), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## K-001 Leitidee
**Jede Seite ist ein Verlegeplan: ein Fugenraster, eine rote Laserachse – und alles fluchtet daran.**
- Herleitung: Die H1 der Startseite lautet „Perfektion auf jedem Quadratmeter.“ Kunden loben „sauber und präzise“. Präzision zeigt ein Fliesenleger nicht mit Adjektiven, sondern an der durchlaufenden Fuge und an der Achse, auf die alles ausgerichtet ist.
- Werkzeuge liefern die Formen: Kreuzlinienlaser (Waage und Lot), Fugenkreuz, Verlegeplan mit gleich breiten Passstücken, Anriss mit dem Stift.
- Vertrauensschicht: Das Wort der Kunden steht wörtlich da. Der *Anriss* markiert genau ein Schlüsselwort, die Randnotiz verweist auf Tezgels echten Ablauf.
- Austauschprobe: Ein Maler hat weder Fuge noch Passstück noch Verlegeplan. Ein anderer Fliesenleger hat nicht die Gleichung Laserrot = Logo-Rot, nicht das Schriftfeld mit Inhaber, HWK seit 2008 und Aßlar, und nicht die Stimmen, die auf Tezgels Ablauf verweisen. Jeder neue Einstieg und jeder Signaturmoment muss diese Probe einzeln bestehen.

## K-002 Marke, Zielgruppe, Besucheraufgaben
- Marke: Fliesenverlegung Tezgel, Inhaber Deniz Tezgel, Hohwardstraße, 35614 Aßlar. Eingetragener Fachbetrieb der HWK Wiesbaden seit 2008. Einzugsgebiet Mittelhessen. Gefühl: ruhige Präzision, ehrliches Handwerk, Verlässlichkeit. Motto (eigener Satz): „Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“
- Zielgruppe [A]: Eigentümer und Eigentümerinnen in Mittelhessen, 35–75 Jahre, mit Bad-, Boden-, Balkon- oder Treppenprojekt; oft erstmals mit einem Fliesenleger, oft am Handy.
- Fünf Besucheraufgaben [A] mit Zielweg:
  1. Passende Leistung finden → Hauptnavigation oder `/leistungen`, höchstens 2 Klicks.
  2. Vertrauen prüfen → Stimmen, HWK-Eintrag, Inhaber, Ablauf; auf jeder Erzählseite innerhalb von 2 Bildschirmhöhen.
  3. Aufmaß oder Anfrage stellen → auf jeder Seite höchstens 1 Klick bis zum Formular; mobil dauerhaft über die untere Leiste.
  4. Eigenen Ort prüfen → `/standorte` und `[stadt]`; Einzugsgebiet auf `/`.
  5. Ablauf, Förderung und Planung verstehen → Ablauf 01–03, `/foerderung`, Ratgeber.
- Seitenarten:
  - *Erzählseiten* (dürfen inszenieren): `/`, `/bad` + Bad-Unterseiten, `/leistungen` + `[id]` + `[id]/[stadt]`, `/fliesen` + Unterseiten, `/standorte` + `[stadt]`, `/ueber-uns`, `/unternehmen`, `/team`, Untergrund, Balkon/Terrasse, Naturstein, Treppen, Fliesenreparatur, Schadensanalyse, Musterbäder, Referenzen, Ausstellung, Karriere, Partner.
  - *Arbeitsseiten* (ruhig, dicht, schnell, ohne Signaturmomente): `/kontakt`, `/termin`, `/beratung`, `/faq`, `/preise`, Rechner und Konfigurator (`/bad/projekt-check`, `/bad/badplaner`, `/bad/badanfrage`, `/fliesen/konfigurator`, `/fliesen/festpreisangebot`), `/blog` (Liste), Blogartikel (Lesemodus), `/downloads`, `/login`, alle Rechtsseiten, 404.
  - `/foerderung` ist Erzählseite (Welle W5). Die Seitenart je URL steht verbindlich in `GRUNDMENGE.json` (Feld `seitenart`, ab P3-00).

## K-003 Gestaltungsprinzipien
1. **Fluchten statt Schmücken.** *Tun:* jedes Element an Raster und Achse ausrichten, Ordnung sichtbar machen. *Lassen:* Glow, Verläufe, Glas, Funkeln, schwebende Karten.
2. **Ein Rot, eine Achse.** *Tun:* Rot nur für Laserachse, Anriss, Fokus und Fehlerzeichen; je Bildschirmhöhe höchstens ein roter Blickfang. *Lassen:* rote Flächen, rote Knöpfe, Orange außerhalb des Logos.
3. **Maß statt Behauptung.** *Tun:* Belegbares in Mono setzen (DIN 18534, R10/R11, seit 2008, 5,0 bei 27 Google-Bewertungen); Stimmen wörtlich mit Quelle. *Lassen:* Superlative, Badges über Überschriften, hochzählende Kennzahlen, erfundene Maße (in Plänen „=“ statt Zahl).
4. **Gezeichnet statt generiert.** *Tun:* Verlegeplan-Zeichnungen, Fugenkreuz, Muster aus dem Formsystem tragen die Bildwelt. *Lassen:* neue generierte Bilder, Stock-Ästhetik, Bildinhalte retuschieren oder wegschneiden.
5. **Fuge statt Karte.** *Tun:* Inhalte in Feldern ohne Zwischenraum, getrennt durch 1-px-Fugen; Abschnitte unterscheiden sich in Struktur und Dichte. *Lassen:* gleichförmige Icon-Karten, Bento ohne Logik, Schatten.
6. **Ruhige Hand für Arbeitsseiten.** *Tun:* Formulare dicht, beschriftet, mit klaren Zuständen; ein Weg je Aufgabe. *Lassen:* Inszenierung, Signaturmomente, konkurrierende Formulare im selben Bildschirm.
7. **Mobil ist ein eigenes Blatt.** *Tun:* Achse als Lot am linken Rand, eigene Reihenfolge, untere Leiste als einzige feste Ebene neben dem Kopf. *Lassen:* gestapelter Desktop, überlagerte feste Ebenen (Bubble, Chat-Blase, Schild).

## K-004 Plattformregeln
- Next.js 16.3.6, App Router, statisch vorgerendert (SSG), Turbopack. React 19. Tailwind 4.3. Kein Dunkelmodus, keine Mehrsprachigkeit, `lang="de"`. Vor jeder Arbeit die passende Seite in `node_modules/next/dist/docs/` lesen.
- Seiten: Bestand in `src/app/(bestand)/**/page.(jsx|tsx)`, Kern in `src/app/(kern)/**` – ruhende Entwürfe in `src/app/(kern)/_entwurf/<route>/` (E-015). Kern-Code nutzt nur Kern-Tokens und Kern-Bausteine; Bestands-Code bleibt bis zu seiner Freischaltung unverändert. Komponenten nach Bereich: `src/components/<bereich>/`. Daten und Inhalte: `src/config/*.js` (u. a. `company.js` = COMPANY_DATA, `services.js`, `cities.ts`, `reviews.js`, `navigation.js`). Telefonnummern, Adressen und Öffnungszeiten nur aus COMPANY_DATA, nie fest im Markup.
- Styling: Tailwind-Klassen. Tokens als CSS-Variablen mit Präfix `k-` in `@theme` von `src/styles/kern.css`, eingebunden **nur** über `src/app/(kern)/kern-global.css` (`source(none)`, `@source` nur auf Kern-Ordner, nicht auf `_entwurf`). `globals.css` und `tokens.css` bleiben eingefroren (E-015, Plan Runde 3). Keine freien Werte (`p-[13px]`, Hex im Code, Inline-`style`, Dauern als Zahl). Ausnahme: dynamische Werte über eine CSS-Variable im `style`-Attribut, z. B. `style={{'--k-achse-x': x}}`.
- Schriften: `next/font/local` mit wörtlichen Pfaden unter `src/app/fonts/`, `display: 'swap'`, `adjustFontFallback`, höchstens zwei vorgeladene Schnitte. Eingebunden am `<html>` des Kern-Layouts `src/app/(kern)/layout.tsx` (`.variable` beider Familien); Bestandsseiten laden sie nie.
- Bilder: `next/image`, `preload` statt `priority` für das LCP-Bild, `sizes` gesetzt, Qualitäten nur aus `images.qualities` (Standard [75]), feste Seitenverhältnisse.
- Client-Komponenten (`'use client'`) nur für Interaktion. Inhalte werden auf dem Server gerendert und sind ohne JavaScript sichtbar.
- Bewegung: zentrales Modul `src/lib/motion/` (E-009). Startklasse über ein Inline-Skript im `<head>` (`dangerouslySetInnerHTML`, `<html suppressHydrationWarning>`). CSP erlaubt Inline-Skripte bereits.
- Wege: Weiterleitungen über `redirects()` in `next.config.ts` (308); 410 über `proxy.ts`; 404: `src/app/(kern)/not-found.tsx` für `notFound()` in Kern-Seiten, `src/app/global-not-found.tsx` für unbekannte Adressen (bis W10 mit Bestands-Schale), Status 404.
- Prüfungen: `npm run build`, `typecheck`, `lint`, `npm test` (Node ≥ 22.6), `qa:graph`; dazu die Werkzeuge in `_relaunch/werkzeuge`. **Keine Erkennung von Testumgebungen im Produkt** (kein `navigator.webdriver`, keine Sonderwege für Lighthouse oder Headless). Endzustände für Standbilder entstehen allein über reduzierte Bewegung und das 2-s-Zeitlimit.
- Vor dem Umbenennen oder Entfernen von Klassen, IDs und data-Attributen: Nutzung in E-Mail-Vorlagen (`src/lib/email`), Tests, Analyse-Konfiguration (`TrackingScripts`, `cookie-inventory.ts`) suchen; Funde bleiben als Alias.
- Tote Klassen `rounded-tile-*`, `eyebrow-orange`, `ambient-glow-warm` werden nie definiert; ihre Zahl darf nur sinken.

## K-005 Typografie
- Familien (OFL, selbst gehostet, woff2, Teilmenge Latin (enthält ß und Umlaute), Lizenzvermerk in `src/app/fonts/LIZENZEN.md`):
  - **Archivo** variabel (wght 100–900, wdth 62–125). Anzeige und Überschriften in Breite 74 %, Gewicht 760. Text in Breite 100 %, Gewicht 400/600.
  - **IBM Plex Mono** 400 (optional 500) für Messbares und Belegbares: Normen, Rutschklassen, Telefonnummern, PLZ, Jahreszahlen, Bewertungen, Schrittnummern, Bildunterschriften. Nie für Fließtext, nur Satzschreibung, keine Versalien-Sperrung.
  - Kaufempfehlung in MENSCHEN.md [A]: keine lizenzierte Hausschrift bekannt.
- Teilmenge: **Latin genügt** (geprüft P3-01: alle Seitentexte des Ausgangsstands liegen darin; Pfeile, ≤, ★, ㎡ und Emojis fallen auf Systemschriften und sind ohnehin Slop- bzw. Satzfälle). Ersatzschrift: Archivo → Arial mit von next/font berechnetem `size-adjust` und Metrik-Overrides (`adjustFontFallback: 'Arial'`); Plex Mono → Courier New ohne Anpassung (gleiche Zeichenbreite 0,6 em, kein Umbruchsprung; `adjustFontFallback: false`), so gebaut in `src/app/fonts/kern.ts`. Vorgeladen: Archivo und Plex Mono 400 (zwei Dateien).
- Skala (7 Stufen, `clamp` mit rem-Anteil, Max ≤ 2,5 × Min):

  | Token | Wert | Einsatz |
  |---|---|---|
  | `--k-fs-1` | clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem) | Etiketten, Mono-Kleinangaben |
  | `--k-fs-2` | clamp(0.9375rem, 0.9rem + 0.15vw, 1rem) | Nebentext, Formularhilfe |
  | `--k-fs-3` | clamp(1.0625rem, 1.02rem + 0.2vw, 1.1875rem) | Fließtext |
  | `--k-fs-4` | clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem) | Vorspann, H4 |
  | `--k-fs-5` | clamp(1.5rem, 1.25rem + 1.1vw, 2.25rem) | H3 |
  | `--k-fs-6` | clamp(2rem, 1.5rem + 2.2vw, 3.5rem) | H2 |
  | `--k-fs-7` | clamp(2.75rem, 1.4rem + 5vw, 6.5rem) | H1 Erzählseiten (Arbeitsseiten: `--k-fs-6`) |
- Zeilenhöhen: Anzeige 1,08 · Kopf 1,1 · Vorspann 1,5 · Text 1,6. Maß 66ch. Große Größen Laufweite −0,01 em bis −0,02 em.
- Satz: `text-wrap: balance` für Überschriften, `pretty` für Absätze. `hyphens: auto` mit `lang="de"`; lange Komposita in Überschriften tragen `&shy;` an der Fugenstelle (nur Darstellung, Wortlaut gleich). Mobil die längsten Wörter je Überschrift bei 320 px prüfen. „…“, Gedankenstrich, geschütztes Leerzeichen vor Einheiten („8 m²“). Zeilenmasken mit Innenabstand für Unterlängen und Umlautpunkte.

## K-006 Farbe
Regel: Neutrale auf Farbton 228°, gestuft nach Soll-Kontrast gegen Kalk. Genau ein Akzent (Laser). Orange kommt nur im Logo vor.

| Rolle | Token | Hex | Kontrast | Einsatz |
|---|---|---|---|---|
| Grund | `--k-kalk` | #F5F4F0 | – | Seitengrund |
| Fläche | `--k-fliese` | #FFFFFF | – | Felder, Formulare |
| Fuge | `--k-fuge` | #DDDEE2 | 1,22 | nur Deko-Linien, Rasterfugen |
| Strich | `--k-strich` | #818698 | 3,29 Kalk / 3,62 Fliese | Feldränder, Bedienelement-Ränder, Grafik |
| Nebentext | `--k-tinte-2` | #4B5067 | 7,22 / 7,95 | Nebentext, Hilfetexte |
| Tinte (= Logo-Navy) | `--k-tinte` | #0A1129 | 16,96 / 18,66 | Text, Hauptknopf, Fokus |
| Laser (= Logo-Rot) | `--k-laser` | #D82020 | 4,60 / 5,06 · 3,69 auf Tinte | Achse, Linien, Fokus-Akzent, nur Grafik |
| Laser tief | `--k-laser-tief` | #A8171C | 6,80 / 7,49 | Rot als Text, Anriss, Fehlertext |
| Abnahme | `--k-abnahme` | #1D6B3F | 5,91 / 6,51 | Erfolg (immer mit Haken und Text) [A] |
| Nacht-Text | `--k-nacht-2` | #A9AEC0 | 8,45 auf Tinte | Text auf Tinte-Flächen (Fuß) |
| Nacht-Fuge | `--k-nacht-fuge` | #2B3352 | Deko | Fugen auf Tinte |

- Bedeutung nie nur über Farbe: Fehler = Rahmen + Versatz-Zeichen + Text, Erfolg = Haken + Text.
- Fokus: `outline: 2px solid var(--k-tinte)`, `outline-offset: 2px`; auf Tinte `--k-kalk`. Übersteht `forced-colors`.
- Auswahlfarbe: Tinte auf Fuge.

## K-007 Raster und Abstände
- Raster: 12 Spalten (Desktop ≥ 1024), 8 (Tablett 768), 4 (mobil). Spalten ohne Zwischenraum, getrennt nur durch 1-px-Fugen (`--k-fuge`). Seitenbreite `--k-seite` 82rem. Rand `--k-rand`: mobil `--k-s-4`, Tablett `--k-s-6`, Desktop `--k-s-7`.
- Abstandsskala (10 Stufen): `--k-s-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 24 · `-6` 32 · `-7` 48 · `-8` 64 · `-9` 96 · `-10` 128 px. Abschnittsabstand Erzählseite `--k-s-9`/`-10`, Arbeitsseite `--k-s-7`/`-8`.
- Achse: eine sichtbare Achse je Erzählseite. Desktop als Waage oder Lot an einer Spaltengrenze, mobil als Lot am linken Rand (`--k-rand` − 1 px). Die Achse schneidet nie Text.
- Bewusste Brüche: Verbände als Rastervarianten – Kreuzfuge (Standard), Halbverband (Listen), Drittelverband (Großformat-Seiten, Reihenversatz 4/12 Spalten).
- `scroll-padding-top` = Kopfhöhe + `--k-s-4`. Touch-Ziele ≥ 44 × 44 px.

## K-008 Formen, Flächen, Tiefe
- Radien: `--k-r-0` 0 (Standard, Felder, Bilder, Knöpfe), `--k-r-1` 2 px (Eingabefelder, Fokus-Ecken). Keine weiteren.
- Schatten: `--k-schatten-0` keiner, `--k-schatten-1` = 1-px-Fuge unten (`0 1px 0 var(--k-fuge)`) für den festen Kopf. Keine Tiefe sonst.
- Flächen: Kalk (Grund), Fliese (Feld), Tinte (Fuß, Schriftfeld-Kopf, Hauptknopf). Keine Verläufe, keine Unschärfe, keine Körnung.
- Bilder: nur rechtwinklig auf ganze Spalten, Rahmen 2:1 oder 1:1, 1-px-Fugenrahmen, keine Filter, kein Text auf Bild; Bildunterschrift in Mono nur mit belegten Angaben. Zuschnitt auf den Rahmen (`object-fit: cover`) ist erlaubt; Kennzeichnungen im Bild bleiben sichtbar – würde der Zuschnitt sie abschneiden, steht das Bild ungeschnitten (`contain`) auf Kalk. Vorhandene Bilder bleiben inhaltlich, wo sie Inhalt sind, und werden einheitlich behandelt; keine Retusche oder Beschnitt von Bildinhalten.
- Schriftfeld: Tezgels Stempelfeld (Inhaber · HWK Wiesbaden seit 2008 · 35614 Aßlar · 5,0 bei 27 Google-Bewertungen) als Tabelle mit Fugen, auf Erzählseiten einmal, im Fuß dauerhaft. Die Zahlen kommen aus einer Datenquelle (Bestand, Single Source).

## K-009 Bewegung
- Haltung: Bewegung richtet aus. Dinge rücken in die Flucht, der Laser schaltet ein, nichts federt, nichts schwebt.
- Dauer-Tokens (5): `--k-dauer-1` 140 ms (Rückmeldung) · `-2` 320 ms (Zustandswechsel) · `-3` 600 ms (Auftritt) · `-4` 800 ms (Flucht) · `-5` 1200 ms (Laser). Signaturabläufe ≤ 1600 ms gesamt. Staffel `--k-staffel` 60 ms, höchstens 8 Elemente.
- Kurven (4): `--k-kurve-setzen` cubic-bezier(0.2, 0.8, 0.2, 1) (ausklingend) · `--k-kurve-laser` cubic-bezier(0.7, 0, 0.2, 1) (wechselnd) · `--k-kurve-weg` cubic-bezier(0.32, 0, 0.67, 0) (beschleunigend, Ausgänge eine Dauerstufe kürzer) · `linear` (Fortschritt, scroll-gebunden).
- Technik: nur `transform` und `opacity`. Aufklapphöhen über `grid-template-rows` (Registereintrag). Auslöser über IntersectionObserver. Seitenwechsel über React `<ViewTransition>` nur optional (P6) und nur innerhalb der Kern-Gruppe, als progressive Verbesserung; nach clientseitigem Wechsel Fokus auf die h1 (nicht beim ersten Laden, nicht bei Hash oder Zurück).
- Sichtbarkeit: Inline-Head-Skript setzt `html.k-bewegung` vor dem ersten Rendern, nur wenn `prefers-reduced-motion: no-preference`. Startzustände hängen nur an dieser Klasse. Nach 2 s setzt ein Zeitlimit `k-bereit` und zeigt alles. Das LCP-Element startet nie unsichtbar (nur Versatz ≤ 14 px, Deckkraft 1). Ohne JavaScript ist alles sichtbar.
- Reduziert: Überblendung oder Sofortzustand, gleiche Information. Hover-Effekte nur bei `(hover: hover) and (pointer: fine)`; Touch bekommt `:active`-Rückmeldung.
- Choreografie: Reihenfolge nach Lesefluss, eine Richtung je Abschnitt, je Bildschirmhöhe höchstens ein Auftritt mit Gewicht, Scroll-Auftritte auf höchstens der Hälfte der Abschnitte einer Seite (S-02).
- Signaturmomente (AUSBAUSTUFE Voll: drei, nur Erzählseiten, **höchstens einer je Seite**): `/` = SIG-1 · `/bad` = SIG-2 · `/leistungen` und `/leistungen/[id]` = SIG-3. Ablaufabschnitte anderer Seiten (auch auf `/`) nutzen `auftritt` und statische Prüfhaken.
  - **SIG-1 Kreuzlinie** (`/`): Waage und Lot wachsen aus dem Kreuzpunkt (`--k-dauer-5`, `--k-kurve-laser`), die Zeilen der H1 rücken aus 7–14 px Versatz in die Flucht (`--k-dauer-4`, Staffel). Mobil nur das Lot. *Austauschprobe:* bestanden (Laserrot = Logo-Rot, Achse auf dem Plan).
  - **SIG-2 Laser zieht den Ablauf** (`/bad`): Beim Erreichen zieht der Laser die Achse (Desktop Waage, mobil Lot); an jeder Schrittfuge setzt sich ein Fugenkreuz, die Prüfhaken Ebenheit · Restfeuchte · Tragfähigkeit werden gesetzt. *Austauschprobe:* bestanden (Tezgels eigener Ablauftext).
  - **SIG-3 Verlegeplan je Leistung** (`/leistungen`, `/leistungen/[id]`; auf übrigen Fachseiten steht der Plan ruhend): Jede Leistung hat ihren gezeichneten Plan; bei Fokus oder Hover rückt die Achse auf die Mitte, die Passstücke werden gleich. *Austauschprobe:* bestanden (genau Tezgels Leistungen, gezeichnet).
- Bewegungsregister (jedes animierte Element trägt `data-motion="<Kennung>"`):

  | Kennung | Zweck | Auslöser | Dauer · Kurve | Reduziert |
  |---|---|---|---|---|
  | `sig-kreuzlinie` | SIG-1 | Laden (Startklasse) | dauer-5 · laser | Endzustand sofort |
  | `sig-flucht` | H1-Zeilen in die Flucht | Laden | dauer-4 · setzen, Staffel | kein Versatz |
  | `sig-ablauf` | SIG-2 | IO 30 % | dauer-5 · laser, Staffel | Endzustand sofort |
  | `sig-plan` | SIG-3 | Fokus/Hover | dauer-2 · setzen | Sofortzustand |
  | `anriss` | Schlüsselwort einer Kundenstimme anstreichen | IO 50 % | dauer-4 · setzen | Strich sofort sichtbar |
  | `auftritt` | Abschnitt rückt 8 px in die Flucht | IO 20 % | dauer-3 · setzen | Überblendung dauer-2 |
  | `aufklappen` | Menü, Akkordeon, Mega-Menü | Klick/Taste | dauer-2 · setzen; zu: dauer-1 · weg | Sofortzustand |
  | `druck` | Knopf-Rückmeldung (1 px nach unten) | :active | dauer-1 · setzen | keine Bewegung, Farbwechsel |
  | `zustand` | Hover/Fokus-Farbwechsel, Fuge wird Strich | Hover/Fokus | dauer-1 · setzen | gleich (Farbe ist keine Bewegung) |
  | `notiert` | Erfolg: Haken zeichnet sich | Erfolg | dauer-3 · setzen | Haken sofort |
  | `laden` | Ladeanzeige (Fuge läuft) ab 300 ms, ≥ 500 ms sichtbar | Absenden | linear, endlos | statischer Text „Wird gesendet …“ |
  | `seitenwechsel` | Überblendung zwischen Seiten | Navigation | dauer-2 · setzen | keine |

## K-010 SVG-Formsystem
- Grundgeometrie: 24er-Raster, Lebensbereich 2,75–21,25, Strich 1,5 px auf Halbpixel, Enden `square`, Ecken `miter`, fast nur 0° und 90° (45° nur bei Pfeilspitzen und Tropfen). Farbe `currentColor`. `vector-effect: non-scaling-stroke` bei skalierten Plänen.
- Gefülltes Zeichen nur das **Fugenkreuz** (Markierung, Aufzählung, Kreuzpunkt der Achse, Trenner „Fugenlinie mit Kreuz“).
- Icon-Familie (eigene, ersetzt lucide und Phosphor; E-010): Grundbestand Telefon, Mail, Sprechblase, WhatsApp (Markenlogo, unverändert, zählt nicht zur Familie), Ort, Uhr, Kalender, Pfeil, Winkel (Chevron), Schließen, Menü, Haken, Hinweis, Fehler (Versatz-Zeichen), Plus/Minus, Stern (Bewertung), Download, Suche, Teilen, sowie Fachzeichen Bad, Dusche/Rinne, Großformat, Abdichtung, Untergrund, Treppe, Balkon, Naturstein, Reparatur, Fußbodenheizung. Über `<symbol>` + `<use>` (Sprite) und eine Komponente `Icon`; `iconMapper`-Strings werden auf diese Namen abgebildet. Je Icon ≤ 1,5 KB.
- Motive: **Verlegeplan** (Draufsicht mit Achse, schraffierten Passstücken, Bemaßung „=“) je Leistung; Muster Kreuzfuge, Halbverband, Drittelverband (CSS-Linien, keine Verläufe sichtbar). Illustrationen ≤ 40 KB gzip.
- Zugänglichkeit: dekorativ `aria-hidden="true"`; bedeutungstragend `role="img"` + `<title>` über `aria-labelledby`. IDs je Instanz eindeutig (`useId`).
- Optimierung: zwei SVGO-Konfigurationen (statisch/animiert) nach AUFTRAG Abschnitt 7.

## K-011 Komponenten, Zustände, Seitenarten
- Zustände für jedes Bedienelement: Ruhe, Hover, Fokus, aktiv, deaktiviert, lädt, Fehler, Erfolg; Leerzustände; 404 mit Charakter (Plan mit verrutschter Fliese, Weg zurück).
- Kopf: Logo (unverändert), Hauptnavigation ab `lg` mit Mega-Menü, Telefon in Mono, Knopf „Aufmaß anfragen“. Hamburger nur unter `lg`. Fest, 1-px-Fuge unten. Mobil schlank.
- Mobil unten: eine Leiste (Anrufen · WhatsApp · Anfrage), die einzige feste Ebene neben dem Kopf. WhatsApp-Bubble und Chat-Blase entfallen mobil, ihre Funktion liegt in der Leiste (E-012).
- Knöpfe: Hauptknopf Tinte auf Kalk, Text Kalk, `--k-r-0`; Nebenknopf Rahmen 1 px Strich; Textlink mit Unterstreichung. Knöpfe sagen, was passiert.
- Formulare: sichtbare Beschriftung über dem Feld, `autocomplete`, Hilfetext in Tinte-2, Fehler mit Versatz-Zeichen + Text + `role="alert"`, Erfolg „Notiert.“ mit Inhabername und Referenz. Ein Formular je Bildschirm; vier Anfrage-Einstiege auf `/` bleiben erhalten, klar gestaffelt (P3-13).
- Kundenstimme: wörtliches Zitat, Name und Quelle in Mono, ein Anriss je Stimme, Randnotiz mit Verweis auf Ablauf oder Leistung.
- Einwilligungsbanner: Inhalt, Reihenfolge und Gleichwertigkeit der Knöpfe unverändert; Form als Schriftfeld (mobil unten über der Leiste, Desktop links unten, ≤ 28rem); keine Wurfphysik; verdeckt nie die Hauptaktion des ersten Bildschirms (E-013).
- Erzählseite: Einstieg mit Achse und H1 links bündig (nie zentriert mit zwei Knöpfen vor abstraktem Hintergrund), Schriftfeld, Abschnitte wechseln Struktur und Dichte, ein Signaturmoment höchstens je Seite.
- Arbeitsseite: kompakter Kopf (H1 `--k-fs-6`), Formular oder Liste im ersten Bildschirm, keine Auftritte außer `aufklappen`, `druck`, `zustand`, `laden`, `notiert`.

## K-012 Inhalte, Ton, Mikrotexte
- Überschriften und Fließtext sind unantastbar; Änderungen nur als Vorschlag in TEXTVORSCHLAEGE.md. Rechtstexte unverändert.
- Ton: Sie-Form, ruhig, konkret, fachlich. Keine Floskeln (S-13), keine Superlative.
- **Mikrotext-Klassen (abschließend):** (1) Beschriftungen von Bedienelementen – Knöpfe, Navigationseinträge, Formular-Labels, Platzhalter, Hilfe-, Fehler- und Zustandstexte; (2) Alt-Texte und `aria-label`; (3) Etiketten und Badges (auch Eyebrows) – **Wortlaut bleibt**, nur Form und Ort ändern sich (Mono-Etikett, Schriftfeld, Feldkopf); Streichen nur als Textvorschlag; (4) Wahrheitskorrekturen in Metadaten und Badges (protokolliert, Liste intern). Kein Mikrotext: Überschriften, Absätze, Listen- und Tabelleninhalte, FAQ, Kundenstimmen, Rechtstexte. Jede Mikrotext-Änderung steht vorab in `_relaunch/MIKROTEXTE.md`; Text-Invarianten und Tests lesen diese Liste.
- Randnotiz zur Kundenstimme: nur als Verweis mit vorhandenem Wortlaut (z. B. „→ 01 Planung & Aufmaß vor Ort“ = bestehender Schritttitel), kein neuer Satz.
- Mikrotexte dürfen direkt verbessert werden: „Aufmaß anfragen“, „Anrufen“, „Per WhatsApp schreiben“, „Wird gesendet …“, „Notiert. Ihre Anfrage liegt bei Deniz Tezgel.“ Wahrheitskorrekturen in Metadaten und Badges werden protokolliert (Liste intern).
- Alt-Texte beschreiben, was zu sehen ist, und geben generierte Bilder nicht als eigene Arbeit aus.

## K-013 Budgets
Lighthouse mobil ≥ 90 · LCP ≤ 2,5 s · CLS ≤ 0,1 · TBT ≤ 200 ms · INP ≤ 200 ms · zusätzliches JS für Bewegung ≤ 60 KB gzip · Schriften ≤ 250 KB gesamt · Icon-SVG ≤ 1,5 KB · Illustrations-SVG ≤ 40 KB gzip. Keine Hauptseite schlechter als im Ausgangsstand jenseits der Streuung (> 3 Punkte oder > 10 % LCP).

## K-014 Wünsche
- Auftraggeber (10.10.2026): „Werte einfach die Webseite speziell für Fliesenverlegung tezgel auf, nur noch für ihn das repo weil der rest kann entfernt werde“ → nur Tezgel im Repo (W0 erledigt), Aufwertung ohne Rückführung (E-000).
- Push nach jeder grünen Welle auf `main` (live).

## K-015 Glossar
- **Fuge:** 1-px-Linie zwischen Feldern; die einzige Gliederung.
- **Achse / Laser:** die eine rote Linie je Seite, an der alles fluchtet; Waage (waagrecht) oder Lot (senkrecht).
- **Fugenkreuz:** das einzige gefüllte Zeichen; Kreuzpunkt, Markierung, Aufzählung.
- **Passstück:** Randfliese; im Plan schraffiert, an beiden Rändern gleich breit.
- **Verlegeplan:** gezeichnete Draufsicht je Leistung, Bemaßung „=“.
- **Anriss:** handgeführte Unterstreichung in Laser tief an einem Schlüsselwort einer Kundenstimme.
- **Schriftfeld:** Stempelfeld mit Inhaber, HWK seit 2008, Ort, Bewertung.
- **Kalk / Fliese / Tinte:** Grund / Feld / Text.
- **Verband:** Kreuzfuge, Halbverband, Drittelverband – Rastervarianten.
- **Flucht:** Zustand, in dem Elemente auf Raster und Achse ausgerichtet sind; Ziel jeder Bewegung.

## Änderungsprotokoll
- v1 (10.10.2026, P2): erste Fassung nach E-008.
- v1.2 (10.10.2026, P2): nach P2-GEG-02 – Tokens nur im Kern-CSS, Schriften am Kern-`<html>`, 404-Weg unter E-015, Teilmenge und Ersatzschrift so wie gebaut, Seitenwechsel optional nur im Kern. Betroffene Pakete: P3-00-Aufträge verweisen auf v1.2.
- v1.1 (10.10.2026, P2): nach P2-GEG-01 – Seitenart je URL, ein Signaturmoment je Seite (SIG-1 `/`, SIG-2 `/bad`, SIG-3 Leistungen), Mikrotext-Klassen und Badge-Regel, Randnotiz nur als Verweis, Schriftteilmenge und Ersatzschrift, Bildregel, Bauweise E-015 in K-004. Betroffene Pakete: noch keine gebaut.
