E3-NACH-03 · Baumeister · Modell: ARBEITSMODELL · Stufe 2 · Kern-Version: v2 · Umfang: Startseite: Anriss nur auf der aktiven Kundenstimme, Fachgewerke mobil kompakter, Platzhalter bei 390 px ohne Schnitt (Sichtabnahme E2-SICHT-2, Befunde 4, 9, 13)
Schreibrechte (exakt): `src/components/reviews/ReviewCarousel.tsx`, `src/components/reviews/ReviewCard.tsx`, `src/components/start/Fachgewerke.tsx`, `src/components/forms/HeroContactForm.tsx`, dazu die Rückgabe `_werkstatt/pakete/E3-NACH-03.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Baumeister
Du baust einen Baustein oder eine Ansicht nach Referenz, Kern-Auszug und Konventionen des Projekts und machst die Schnellprüfung. Häufige Fehler: Werte außerhalb des Designsystems; Zustände und Mobilansicht vergessen; Dateien außerhalb der Schreibrechte ändern.

## Aufgabe in einem Satz
Setze drei Befunde der Sichtabnahme auf der Startseite um – je Bildschirmhöhe höchstens ein roter Blickfang, das Fachgewerke-Raster mobil kürzer, keine abgeschnittenen Platzhalter – ohne Text, Verhalten oder getestete Namen zu verlieren.

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
  | `sig-kreuzlinie` | Charakter (SIG-1) | Laden (CSS ab dem ersten Bild, E-022) | dauer-5 · linear (Laser zieht gleichmäßig) | Endzustand sofort |
  | `sig-flucht` | Hierarchie: H1-Zeilen in die Flucht | Laden (CSS ab dem ersten Bild, E-022) | dauer-4 · setzen, Staffel | kein Versatz |
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

## Maßstab
- Referenz: src/app/(bestand)/page.tsx mit src/components/start/*; Bausteine in src/components/kern/*; Register src/app/bewegung.css (Einträge anriss, aufklappen).
- Befund 4 (d1440): In der Kundenstimmen-Leiste trägt nur die erste sichtbare Stimme den roten Anriss (`<mark data-motion="anriss">`); die übrigen zeigen denselben Text ohne Markierung (gleiches DOM, nur ohne mark-Element). Umsetzung: ReviewCard bekommt die Eigenschaft `mitAnriss` (Standard true, damit andere Einbindungen gleich bleiben); ReviewCarousel übergibt `mitAnriss` nur für die Karte, deren Index der ersten sichtbaren Stimme entspricht (vorhandener Zustand für die Anzeige „{n} von {N}“). Kriterium: jede Aufnahme der Leiste zeigt höchstens einen Anriss.
- Befund 9 (m390): Das Fachgewerke-Raster ist mobil 2,5 Bildschirmhöhen lang. Unter md: die Vignetten der drei Nebenfelder ausblenden (`hidden md:flex`, dekorativ, kein Text); die Merkmalliste jedes Felds unter md in einem Aufklapper (`<details>` mit `<summary>` „Leistungsumfang“, Muster `src/components/ui/FAQAccordion.tsx` und Registereintrag `aufklappen`), ab md wie bisher offen sichtbar. Ist ein Aufklapper nur unter md technisch nicht ohne Doppelung lösbar, die Liste zweimal rendern (einmal `md:hidden` im Aufklapper, einmal `hidden md:grid`) – nie Text entfernen. Kriterium: Raster bei 390 px höchstens etwa 1,3 Bildschirmhöhen (Messung in der Rückgabe), ab 768 px unverändert.
- Befund 13 (m390): Platzhalter der Projektnotiz im Einstiegsformular wird bei 390 px abgeschnitten. Neu (freigegebener Mikrotext): „z. B. 15 m², Altbau, Walk-In Dusche“ statt „z. B. ca. 15 m² Fliesen, Altbau, Walk-In Dusche“. Weitere Platzhalter nur kürzen, wenn sie bei 390 px abgeschnitten sind; jede Änderung alt → neu in der Rückgabe.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/(bestand)/layout.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Struktur der Kundenstimmen-Leiste bleibt (Region „Kundenstimmen“, Knöpfe „Vorherige/Nächste Rezensionen“, Zähler, Tastaturbedienung); der Test `funktion-bewertungen*.spec.mjs` bzw. die Tests, die ReviewCarousel abdecken, bleiben grün.
- Fachgewerke: Überschriften, Texte, Links, IDs (`leistungen`, `leistungen-heading`, `leistung-*`) und `data-motion="auftritt"` bleiben; keine neue Bewegung außer dem registrierten `aufklappen`.
- HeroContactForm: Felder, IDs, Labels, Validierung, Nutzlast unverändert; nur der Platzhalter.

## Schritte
1. 1. Lies die vier Dateien vollständig, dazu FAQAccordion.tsx, den Registereintrag `aufklappen` in bewegung.css und die Tests, die ReviewCarousel und HeroContactForm abdecken (grep in `_werkstatt/werkzeuge/tests`).
2. 2. Befund 4 umsetzen; im Dev-Server (4320) prüfen, dass bei 1440 px nur eine Stimme den Anriss trägt und nach „Nächste Rezensionen“ wieder nur eine.
3. 3. Befund 9 umsetzen; Höhe des Rasters bei 390 und 768 px vorher/nachher messen (Playwright über `_werkstatt/werkzeuge/lib.mjs`).
4. 4. Befund 13 umsetzen; bei 390 px prüfen, dass kein Platzhalter abgeschnitten ist (scrollWidth ≤ clientWidth des Felds).
5. 5. Prüfstufe A: `bash _werkstatt/werkzeuge/pruefe-a.sh E3-NACH-03 src/components/reviews/ReviewCarousel.tsx src/components/reviews/ReviewCard.tsx src/components/start/Fachgewerke.tsx src/components/forms/HeroContactForm.tsx -- /` – Ergebnis je Stufe.
6. 6. `node _werkstatt/werkzeuge/werte.mjs --dateien <die vier Dateien, kommagetrennt>` – 0 Befunde.

## Schnellprüfung und Selbstprüfung
- Prüfstufe A mit `bash _werkstatt/werkzeuge/pruefe-a.sh <Kennung> <geänderte Dateien…> -- <Ansichten…>` (Typprüfung, Lint der Dateien, betroffene Funktionstests gegen 4320, Bilder 390/1440, Textvergleich der eigenen Seiten). Ergebnis und Bildpfade in die Rückgabe.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Textvergleich: der neue Platzhalter steht als Mikrotext-Änderung in der Rückgabe; sonst kein Text entfernt.
- Register: `node _werkstatt/werkzeuge/bewegung.mjs --modus register --seite / --base http://127.0.0.1:4320` ohne unbekannte Kennung.

## Bestandsschutz: getestete Selektoren und Namen (müssen erhalten bleiben)
Vollständige Liste: `_werkstatt/berichte/E0-KUN-05-qualitaet.md`, Abschnitt 2. IDs (`#hero-name`, `#calc-*`, `#funnel-*`, `#termin-*`, `#booking-consent`, `#projekt-check`, `#whatsapp-floating-btn`, `#cookie-settings`, `#main-content`), ARIA-Namen von Knöpfen, Dialogen, Gruppen und Labels, `aria-pressed`/`aria-current`/`aria-live`-Verhalten und Nutzlast-Schlüssel bleiben exakt gleich.

## Ausgabeformular
In `_werkstatt/pakete/E3-NACH-03.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E3-NACH-03 · BEREIT ZUR RÜCKGABE ===
