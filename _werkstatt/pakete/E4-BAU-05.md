E4-BAU-05 · Baumeister · Modell: ARBEITSMODELL · Stufe 2 · Kern-Version: v2 · Umfang: Systemstand /fliesen/abnahme, /fliesen/auf-fussbodenheizung (E4, Familie Fliesen)
Schreibrechte (exakt): `src/app/(bestand)/fliesen/abnahme/page.jsx`, `src/app/(bestand)/fliesen/auf-fussbodenheizung/page.jsx`, dazu die Rückgabe `_werkstatt/pakete/E4-BAU-05.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Baumeister
Du baust einen Baustein oder eine Ansicht nach Referenz, Kern-Auszug und Konventionen des Projekts und machst die Schnellprüfung. Häufige Fehler: Werte außerhalb des Designsystems; Zustände und Mobilansicht vergessen; Dateien außerhalb der Schreibrechte ändern.

## Aufgabe in einem Satz
Baue die Seitenkörper von /fliesen/abnahme, /fliesen/auf-fussbodenheizung aus den KERN-Bausteinen nach dem Muster der Familienreferenz (`src/app/(bestand)/fliesen/page.jsx` und `src/app/(bestand)/leistungen/[id]/page.jsx`) um – Überschriften, Fließtexte, Links, IDs und die Lesefolge bleiben exakt; nur Systemwerte, eine Icon-Familie, kein neuer großer Moment.

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

## K-009 Komponenten, Zustände, Ansichtsarten
- Zustände für jedes Bedienelement: Ruhe, Hover, Fokus, gedrückt, deaktiviert, lädt, Fehler, Erfolg; Leerzustände; 404 mit Charakter (Plan mit verrutschter Fliese, Weg zurück). Fokus: `outline: 2px solid var(--color-tinte)`, `outline-offset: 2px`, auf Tinte-Flächen `kalk`; nie verdeckt (scroll-padding, keine überlagernden festen Ebenen); übersteht `forced-colors`.
- Knöpfe: Hauptknopf Tinte-Fläche mit Kalk-Text, `rounded-none`, min. 44 px hoch; Nebenknopf 1 px Strich-Rahmen; Textlink unterstrichen (Offset 3 px). Knöpfe sagen, was passiert („Aufmaß anfragen“, „Anrufen“, „Per WhatsApp schreiben“).
- Formulare: sichtbare Beschriftung über dem Feld (`htmlFor`/`id`), `autocomplete`, Hilfetext `tinte-2`, Fehler mit Versatz-Zeichen + Text + `role="alert"`, Erfolg „Notiert.“ mit Inhabername und Referenz; ein Formular je Bildschirm.
- Rahmen: Kopf (Logo unverändert, Hauptnavigation ab `lg` mit Mega-Menü als echte Links, Telefon in Mono, Knopf „Aufmaß anfragen“; mobil Menü-Schalter mit Popover-Menü, vor der Hydrierung bedienbar; fest, `shadow-fuge`); untere Leiste mobil (Anrufen · WhatsApp · Anfrage) als einzige weitere feste Ebene; Fuß auf Tinte mit Schriftfeld und Seitenindex; WhatsApp am Desktop flacher Knopf (`#whatsapp-floating-btn`); Einwilligungsbanner als Schriftfeld (Inhalt, Reihenfolge, gleichwertige Knöpfe unverändert; mobil über der Leiste, Desktop links unten ≤ 28rem; verdeckt nie die Hauptaktion des ersten Bildschirms).
- Bausteine (`src/components/kern/`): `Einstieg` (Erzählung | Arbeit), `Abschnitt` (Kopf mit Mono-Etikett + H2), `Feldraster`, `Merkliste` (Fugenkreuz), `Kennwerte` (Mono), `Schrittfolge`, `Kundenstimme` (Anriss, Quelle in Mono), `Schriftfeld`, `RatgeberListe`, `Tabelle` (Region mit Name und `tabindex=0` bei Überlauf), `Hinweis`, `Bildfeld`, `Knopf`, `Feld` (Eingabe, Auswahl, Textbereich, Kontrollkästchen, Radiogruppe), `Verlegeplan`, `Fugenkreuz`, `Laserachse`. Bestand an Ort und Stelle umgebaut: `FinalCTA` = Abschluss, `QualityPromise` = Merkliste, `ReviewCarousel`/`ReviewCard` = Kundenstimme, `FAQAccordion` = FAQ, `TrustStrip` = Schriftfeld, `GoogleReviewsBadge` = Kennwert.
- Erzählansicht: Einstieg mit Achse und H1 links bündig, Schriftfeld, wechselnde Abschnittsstrukturen, genau ein großer Moment, Leitachse. Arbeitsansicht: kompakter Kopf (H1 `text-fs-6`), Formular oder Liste im ersten Bildschirm, nur Rückmeldung und Zustandswechsel.

## Maßstab
- Referenz der Familie: `src/app/(bestand)/fliesen/page.jsx` und `src/app/(bestand)/leistungen/[id]/page.jsx`.
- Bausteine in `src/components/kern/` (Props in den Dateien): Einstieg, Abschnitt, Leitachse, Feldraster/Feld, Knopf, Kennwerte, Schrittfolge, Merkliste (Prop `verband` = Zeilen im Halbverband, `nummeriert`, `titelAls`), Schriftfeld, Planblatt (+ `planfelder(blatt, plan)`), Rueckfrage, Tabelle, Bildfeld, Hinweis, RatgeberListe, Fugenkreuz, Verlegeplan; Klassen aus `kern/stile.ts`; Icons nur `@/components/icons/Icon` (Namen in `icons/namen.ts`, Bewertungssterne `stern-voll`).
- /fliesen/abnahme: Einstieg: `Einstieg art="erzaehl"` wie `(bestand)/bad/page.jsx` (etikett aus der bisherigen Kennzeile/Badge, titel mit der bisherigen H1-ID, vorspann, aktionen als `Knopf`, merkmale als Fugenkreuz-Liste). Randspalte (`rand`) als Planblatt mit dem Plan „fugen“: `<Planblatt felder={planfelder('<Blatt>', 'fugen')}><Verlegeplan plan="fugen" ohneAchse bemassung={false} interaktiv /></Planblatt>`; `<Blatt>` = Kurzname aus dem Seitentitel der Metadaten (Teil vor „:“, „–“ bzw. „|“; eine Ortsangabe am Ende wie „Wetzlar & Aßlar“ entfällt), wortgleich. Danach die Abschnitte in `<Leitachse>` mit `leitachse` am Abschnitt wie in der Referenz.
- /fliesen/auf-fussbodenheizung: Einstieg: `Einstieg art="erzaehl"` wie `(bestand)/bad/page.jsx` (etikett aus der bisherigen Kennzeile/Badge, titel mit der bisherigen H1-ID, vorspann, aktionen als `Knopf`, merkmale als Fugenkreuz-Liste). Randspalte (`rand`) als Planblatt mit dem Plan „fussbodenheizung“: `<Planblatt felder={planfelder('<Blatt>', 'fussbodenheizung')}><Verlegeplan plan="fussbodenheizung" ohneAchse bemassung={false} interaktiv /></Planblatt>`; `<Blatt>` = Kurzname aus dem Seitentitel der Metadaten (Teil vor „:“, „–“ bzw. „|“; eine Ortsangabe am Ende wie „Wetzlar & Aßlar“ entfällt), wortgleich. Danach die Abschnitte in `<Leitachse>` mit `leitachse` am Abschnitt wie in der Referenz.
- Komposition wie die Referenz: keine leere Rasterspalte (> 200 px) – neben Formularen und Funnels steht `Rueckfrage`; Feldraster ohne graue Restzellen (Zahl der Felder passt zu den Spalten, sonst `spanne={2}` am letzten Feld oder `spalten` anpassen); keine zwei gleich gebauten Abschnitte direkt nacheinander (Feldraster → Merkliste → Schrittfolge abwechseln); Merkmallisten in Textschrift (`font-text`), Werte und Maße in Mono; je Feld höchstens eine Aktion.
- Tempo (E-010): Steht `"use client"` in der Datei, ohne dass sie selbst Hooks (`use…`) oder Ereignis-Handler (`on…=`) nutzt, entfällt es. Funnels, Rechner, Kalender und Karten in einer Serverkomponente per `next/dynamic` mit Ladehinweis einbinden wie in der Referenz (`(bestand)/bad/page.jsx`: `const BadProjektCheck = dynamic(() => import(…), { loading: … })`). Abschnitte unterhalb des ersten Bildschirms tragen `spaet`.
- Text: Überschriften, Fließtexte, Links, IDs, ARIA und Lesefolge exakt (Elemente nicht umordnen – der Textvergleich prüft die Wortfolge); `node _werkstatt/werkzeuge/textprobe.cjs <(git show HEAD:<Datei>) -- <Datei>` je Datei zeigt nur ENTFERNT-Einträge, die als Prop (titel=, etikett=, einleitung …) wörtlich wiederkehren, und protokollierte Mikrotexte. Badge-Texte werden Mono-Etiketten mit gleichem Wortlaut; wertende Eckmarken nur als Vorschlag (OFFENE FRAGEN).
- Systemwerte: `werte.mjs` 0 Befunde in deinen Dateien; keine Beliebigwerte, kein Inline-style außer CSS-Variablen, keine Schatten, Verläufe, Rundungen, Leuchtkugeln (`ambient-glow-*`), `ceramic-*`, `eyebrow`, `btn-*`, Pill-Badges, Emoji-Deko; Abstände nur Skala 1/2/3/4/6/8/12/16/24/32, Schrift nur `text-fs-1…7`. lucide-Importe entfallen (eine Icon-Familie).

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/(bestand)/layout.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Nur die Dateien unter Schreibrechte ändern. Gemeinsame Bausteine und Komponenten (`src/components/**`, `src/lib/**`, `src/config/**`) nicht ändern – Bedarf als GEMEINSAME DATEIEN melden.
- Bestehende Komponenten (FAQAccordion, FinalCTA, ReviewCarousel, QualityPromise, Funnels, Rechner, Karten) unverändert einbinden; ihre Props nicht ändern.
- Mikrotexte (Etiketten statt Badges, Knopftexte) nur wortgleich übernehmen; jede Abweichung alt → neu in der Rückgabe.
- Kein großer Moment, keine neue Bewegung außer `interaktiv` am Plan im Planblatt und der Leitachse wie in der Referenz; `auftritt` höchstens einmal je Bildschirmhöhe.
- Metadaten, `generateStaticParams`, Datenzugriffe und strukturierte Daten (JSON-LD) unverändert.

## Schritte
1. Lies die Referenz (`src/app/(bestand)/fliesen/page.jsx` und `src/app/(bestand)/leistungen/[id]/page.jsx`), `src/components/kern/stile.ts`, `Einstieg.tsx`, `Planblatt.tsx`, `Abschnitt.tsx`, dann deine Dateien vollständig.
2. Mechanischer Vorlauf je Datei: `node _werkstatt/werkzeuge/umbau.mjs --dateien <Datei>` (Trockenlauf, Bericht lesen), dann mit `--schreiben`. ZU_PRUEFEN-Stellen im nächsten Schritt von Hand lösen.
3. Struktur von Hand: Einstieg (siehe Maßstab); Badge + H2 → `Abschnitt` (etikett, titel, einleitung, titelId = bisherige Überschriften-ID); Kartenraster → `Feldraster`/`Feld`; Merkmalslisten → `Merkliste` oder Fugenkreuz-Liste; Zahlen → `Kennwerte`; Abläufe → `Schrittfolge`; Fotos → `Bildfeld` (Maße der Datei); Handlungsaufrufe → `Knopf`.
4. Textprobe je Datei und `node _werkstatt/werkzeuge/bezeichner.cjs modul < '<Datei>'` je Datei (nur Browser-Globale erlaubt); Pfade mit `(bestand)` immer in Anführungszeichen.
5. Prüfstufe A: `bash _werkstatt/werkzeuge/pruefe-a.sh E4-BAU-05 'src/app/(bestand)/fliesen/abnahme/page.jsx' 'src/app/(bestand)/fliesen/auf-fussbodenheizung/page.jsx' -- /fliesen/abnahme /fliesen/auf-fussbodenheizung` (Pfade in einfachen Anführungszeichen wegen der Klammern) und Bilder ansehen (m390, d1440): kein Überlauf, keine Überlappung, keine leere Spalte, keine grauen Restzellen.
6. Rückgabe nach Ausgabeformular; Mikrotext-Änderungen als Liste alt → neu.

## Schnellprüfung und Selbstprüfung
- Prüfstufe A mit `bash _werkstatt/werkzeuge/pruefe-a.sh <Kennung> <geänderte Dateien…> -- <Ansichten…>` (Typprüfung, Lint der Dateien, betroffene Funktionstests gegen 4320, Bilder 390/1440, Textvergleich der eigenen Seiten). Ergebnis und Bildpfade in die Rückgabe.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.

## Bestandsschutz: getestete Selektoren und Namen (müssen erhalten bleiben)
Vollständige Liste: `_werkstatt/berichte/E0-KUN-05-qualitaet.md`, Abschnitt 2. IDs (`#hero-name`, `#calc-*`, `#funnel-*`, `#termin-*`, `#booking-consent`, `#projekt-check`, `#whatsapp-floating-btn`, `#cookie-settings`, `#main-content`), ARIA-Namen von Knöpfen, Dialogen, Gruppen und Labels, `aria-pressed`/`aria-current`/`aria-live`-Verhalten und Nutzlast-Schlüssel bleiben exakt gleich.

## Ausgabeformular
In `_werkstatt/pakete/E4-BAU-05.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E4-BAU-05 · BEREIT ZUR RÜCKGABE ===
