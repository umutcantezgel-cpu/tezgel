E4-NACH-18 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Bewegungswerkzeug: Echtzeit-Folgen für Lade-Momente (Seek wirkt bei composited Animationen nicht) und Ausschnitt bei teilweise verdeckten Elementen (Rückgabe E4-NACH-16, Fragen 1 und 2)
Schreibrechte (exakt): `_werkstatt/werkzeuge/bewegung.mjs`, `_werkstatt/belege/e4-nach/bewegung2/**`, dazu die Rückgabe `_werkstatt/pakete/E4-NACH-18.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Sorge dafür, dass die Fünf-Bild-Folgen der Lade-Momente die Zwischenstände wirklich zeigen – nur das Werkzeug ändern, keine Projektdateien.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
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
  | `/bad` | **Planblatt in die Flucht** (E4-NACH-02; die Szene „Verlegeplan entsteht“ braucht einen Ablauftext, den `/bad` im Bestand nicht hat – E-023): beim Laden schließt das Fugenbild die Lücke an der Wand, beide Passstücke werden gleich | Tezgels Badgrundriss mit bodengleicher Dusche |
  | `/leistungen` | **SIG-3 Verlegeplan je Leistung**: Achse rückt auf die Mitte, Passstücke werden gleich (Hover/Fokus, mobil beim Eintritt) | genau Tezgels vier Leistungen, gezeichnet |
  | `/leistungen/[id]` | Plan des Einstiegs ist das gemeinsame Element des Seitenwechsels (Morph ab `lg`, vorwärts); beim Laden rückt er in die Flucht | Fortsetzung von SIG-3 |
  | `/standorte`, `/standorte/[stadt]` | **Einzugsband**: Fugenband mit Zonen ≤ 10 / ≤ 25 / ≤ 50 km ab Aßlar; Zonen setzen sich nacheinander, die eigene Stadt (auf `[stadt]`) bekommt das Fugenkreuz | Tezgels 13 Orte aus `cities.ts` |
  | `/fliesen` | **Verband-Umschalter**: Kreuzfuge · Halbverband · Drittelverband als Radiogruppe; die Reihen versetzen sich um ½ bzw. ⅓ Plattenlänge (ein Plan, Reihen gleiten; E4-NACH-02) | Verlegemuster sind Tezgels Fachgebiet und Inhalt der Seite |
  | `/ueber-uns` | **Fugenband der Firmengeschichte**: Laser zieht beim Scrollen von 2008 bis heute, je Jahresmarke ein Fugenkreuz | Tezgels eigene Zeitleiste |
- Leitelement (alle Erzählansichten): **Laserachse** als Lot im Seitenfluss (`[data-leitachse]`), Grundschicht `fuge`, das rote Stück wächst mit dem Scrollfortschritt der Seite (`animation-timeline: scroll()`), rückwärts genauso; mobil ≥ 8 px Abstand zum Text; an Abschnittsgrenzen ein Fugenkreuz. Schneidet nie Text.
- Register (jedes animierte Element trägt `data-motion="<Kennung>"`; `register.json` ist die Maschinenfassung):

  | Kennung | Zweck | Auslöser | Dauer · Kurve | Reduziert |
  |---|---|---|---|---|
  | `sig-kreuzlinie` | Charakter (SIG-1) | Laden (CSS ab dem ersten Bild, E-022) | dauer-5 · linear (Laser zieht gleichmäßig) | Endzustand sofort |
  | `sig-flucht` | Hierarchie: H1-Zeilen in die Flucht | Laden (CSS ab dem ersten Bild, E-022) | dauer-4 · setzen, Staffel | kein Versatz |
  | `szene-ablauf` | Zusammenhang: Plan entsteht im Ablauf (nur wo es der große Moment ist; auf `/` ruhig, E4-NACH-02) | Scroll (view-timeline) | linear an Scroll | alle drei Zustände nebeneinander |
  | `sig-plan` | Orientierung: Plan richtet sich aus (Raster um ein gutes Drittel Plattenbreite versetzt → Flucht, Passstücke gleich) | Hover/Fokus, mobil IO 40 %; im Planblatt des Einstiegs Laden (`data-flucht="laden"`) | Übergang dauer-3 · setzen; Laden dauer-4 · setzen nach dauer-2 | Sofortzustand (Flucht) |
  | `einzugsband` | Orientierung: Zonen ab Aßlar | Laden (CSS ab dem ersten Bild, Planblatt des Einstiegs; E4-NACH-02) | Abdeckung schrumpft, dauer-3 · setzen, Staffel 5 je Zone | Endzustand sofort |
  | `verband` | Rückmeldung: Verband wechselt, Reihen gleiten um ½ bzw. ⅓ Platte | Auswahl (Radiogruppe) | dauer-3 · setzen | Sofortzustand |
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
- Befund E4-NACH-16: Bei Auslöser `seite` (sig-kreuzlinie, sig-flucht, sig-plan mit `data-flucht="laden"`, einzugsband) ändern JS-Pause, JS-Seek und CDP-Seek das Bild nicht (composited Animationen); Bilder 2–4 sind identisch.
- Neu für Auslöser `seite`: Echtzeit-Abtastung wie beim Auslöser `wahl` – je Bild eine frische Seite (gleicher Kontext, Einwilligung abgelehnt, reduzierte Bewegung aus), `page.goto(url, { waitUntil: 'commit' })`, warten bis das Element im DOM ist, dann `t_k` ms warten und die ganze Ansicht aufnehmen. `t_k` aus der längsten Gesamtdauer der Animationen der Kennung (Dauer + Verzögerung aus `getComputedStyle`, nicht aus `getAnimations`): 0 %, 25 %, 50 %, 75 %, 100 % plus 150 ms Puffer am Ende. Feld `ms_nach_dom` je Bild. CPU-Drosselung 4× per CDP (`Emulation.setCPUThrottlingRate`), damit die Zwischenstände lange genug stehen; im Ergebnis vermerken.
- Ausschnitt: liegt das Element nicht vollständig im sichtbaren Bereich (Unterkante unter der Fensterhöhe abzüglich fester Ebenen am unteren Rand, z. B. der Leiste unter lg), dann vor dem Laden bzw. vor dem ersten Bild so scrollen, dass die Oberkante 80 px unter dem Kopf steht, und den Ausschnitt um das Element (mindestens 400 px hoch) aufnehmen; bei Lade-Momenten ist dann `goto` + Scroll vor `t_k` erlaubt (der Moment läuft ab dem ersten Bild).
- Danach Läufe gegen 4320 (Dev): `/` sig-kreuzlinie (m390, d1440), `/bad` sig-plan (d1440, m390), `/leistungen/bad` sig-plan (d1440), `/standorte` einzugsband (m390, d1440), `/leistungen` sig-plan (d1440, Hover), `/fliesen` verband (d1440); Ziel `_werkstatt/belege/e4-nach/bewegung2/einzel-<seite>-<kennung>-<ansicht>/`, kurze Tabelle `BEWEGUNG2.md` (je Folge: was sich zwischen den Bildern sichtbar ändert, Anteil geänderter Pixel je Bildpaar).

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/(bestand)/layout.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Nur `bewegung.mjs` und der Belegordner; bestehende Felder und Modi rückwärtsverträglich.
- Kein Server-Start; keine Projektdateien.

## Schritte
1. 1. Lies `bewegung.mjs` (Stand nach E4-NACH-16) und die Rückgabe `_werkstatt/pakete/E4-NACH-16.rueckgabe.md`.
2. 2. Umsetzen; Kurzlauf `/` sig-kreuzlinie m390: die Bilder 1–3 zeigen die Linie teilweise.
3. 3. Läufe laut Maßstab, Tabelle schreiben.
4. 4. Rückgabe nach Ausgabeformular.

## Schnellprüfung und Selbstprüfung
- Jedes neue oder geänderte Werkzeug einmal gegen eine echte Ansicht ausführen (Beleg: Ausgabepfad), `node --check` bzw. `bash -n` grün.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Jede Lade-Folge: mindestens drei der fünf Bilder unterscheiden sich sichtbar (Pixelanteil > 0,5 %) oder der Befund nennt, warum nicht.

## Ausgabeformular
In `_werkstatt/pakete/E4-NACH-18.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E4-NACH-18 · BEREIT ZUR RÜCKGABE ===
