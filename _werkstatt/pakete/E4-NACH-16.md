E4-NACH-16 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Bewegungswerkzeug nachschärfen (Auslöser laden/Wahl/Scroll, Bildausschnitt, Scrollbereich, Bildrate-Kennzahl) und damit Prüfstufe A der Orchestrator-Pakete E4-NACH-01/-02 (Planblatt-Einstieg, große Momente)
Schreibrechte (exakt): `_werkstatt/werkzeuge/bewegung.mjs`, `_werkstatt/belege/e4-nach/bewegung/**`, dazu die Rückgabe `_werkstatt/pakete/E4-NACH-16.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Mache die Fünf-Bild-Folgen der großen Momente aussagekräftig (der Gutachter sah am E3-Tor nur Streifen oder fertige Zustände) und belege danach Prüfstufe A für E4-NACH-01/-02 – Werkzeug ändern ja, Projektdateien nie.

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
- Befunde am Werkzeug (Belege `_werkstatt/belege/e3-tor/BILDER-BEWEGUNG.md`, Gutachten `_werkstatt/berichte/E3-SICHT-ERZ.md`): (a) `einzugsband`, `fugenband`, `leitachse`, `verband` fehlen in `AUSLOESER` → Scroll angenommen; (b) `sig-kreuzlinie` m390 lieferte einen 80-px-Streifen, weil der Ausschnitt das schmale Lot-Element ist; (c) Scroll-Folgen von `szene-ablauf` deckten nur 315 px ab (Bereich „ganz sichtbar“), die view-timeline-Animationen laufen aber über `cover`; (d) Bildrate: Kopfwert = Median der Anteile, daneben Feldmediane – nicht vergleichbar.
- Neu in `bewegung.mjs`: `AUSLOESER` um `einzugsband: 'seite'`, `fugenband: 'scroll'`, `leitachse: 'scroll'`, `verband: 'wahl'` ergänzen (Register-Stand `src/lib/motion/register.ts`, KERN K-007). Auslöser `wahl`: im Element das zweite bzw. dritte Radiofeld `[data-verband-wahl]` anklicken (Wechsel Halb → Drittel und Drittel → Kreuz, je eine Folge), dann Zeitmodus über die Übergangsdauer. `sig-plan`: trägt das Element `data-flucht="laden"`, gilt `seite` (Ladeanimation), sonst `hover` wie bisher.
- Ausschnitt: Für Auslöser `seite` immer die ganze Ansicht bei Scrollposition 0 (wie `--ausschnitt ansicht`), es sei denn, das Element liegt unterhalb des ersten Bildschirms – dann Ausschnitt um das Element mit mindestens 400 px Höhe.
- Scrollmodus: Positionen über den ganzen Durchgang des Elements (Eintritt bis Austritt: Oberkante am unteren Fensterrand bis Unterkante am oberen) bei 10/30/50/70/90 % – auch wenn das Element ganz ins Fenster passt; Bild = ganze Ansicht an der Position (Zusammenhang sichtbar). Im Ergebnis je Bild `scroll_y` und Anteil.
- Bildrate: Kopfwert „Anteil verworfen“ als Median der Anteile je Lauf, daneben die Anteile je Lauf; die Feldmediane (Bilder, verworfen) bleiben, aber mit dem Hinweis „Median je Feld, nicht aus derselben Zeile“. Zusätzlich die Zählung aus PipelineReporter als zweite Quelle wie bisher.
- Danach Prüfstufe A der Orchestrator-Pakete gegen den Dev-Server 4320 (Stand Arbeitsbaum = HEAD d5aea3b plus laufende Baumeister-Pakete – nenne in der Rückgabe `git status --short`):
-   1. `bash _werkstatt/werkzeuge/pruefe-a.sh E4-NACH-01 src/components/kern/Einstieg.tsx src/components/kern/Planblatt.tsx src/components/kern/Rueckfrage.tsx src/components/kern/Zeitband.tsx src/components/kern/Schriftfeld.tsx src/components/kern/Einzugsband.tsx src/components/start/Einstieg.tsx src/lib/plaene/vorgaben.ts src/app/globals.css 'src/app/(bestand)/bad/page.jsx' 'src/app/(bestand)/leistungen/page.jsx' 'src/app/(bestand)/leistungen/[id]/page.jsx' 'src/app/(bestand)/standorte/page.tsx' 'src/app/(bestand)/standorte/[stadt]/page.tsx' 'src/app/(bestand)/fliesen/page.jsx' 'src/app/(bestand)/ueber-uns/page.jsx' src/app/bewegung.css src/components/kern/SzeneAblauf.tsx src/components/kern/VerbandUmschalter.tsx src/components/kern/Verlegeplan.tsx src/components/start/Ablauf.tsx src/lib/motion/register.ts test/bewegung.test.mjs -- / /bad /leistungen /leistungen/bad /standorte /standorte/wetzlar /fliesen /ueber-uns /kontakt` – Ergebnis je Stufe (tsc, Lint, `npm test`, Funktionstests laut Zuordnung, Bilder, Texte).
-   2. `node _werkstatt/werkzeuge/bewegung.mjs --modus einzelbilder` je Kennung und Seite: `/` sig-kreuzlinie (m390, d1440), `/bad` sig-plan (d1440, m390), `/leistungen/bad` sig-plan (d1440), `/leistungen` sig-plan (d1440, Hover), `/fliesen` verband (d1440, m390), `/standorte` einzugsband (d1440, m390), `/standorte/wetzlar` einzugsband (d1440), `/ueber-uns` fugenband (d1440, m390); Basis `--base http://127.0.0.1:4320`; Ziel `_werkstatt/belege/e4-nach/bewegung/einzel-<seite>-<kennung>-<ansicht>/`.
-   3. `--modus register` und `--modus reduziert` für `/`, `/bad`, `/fliesen`, `/standorte`, `/ueber-uns` (m390, d1440).
-   4. Kurze Tabelle `_werkstatt/belege/e4-nach/bewegung/BEWEGUNG.md`: je Folge die fünf Bilder mit einem Satz, was sich sichtbar ändert (nur beschreiben, nicht bewerten); Register-/Reduziert-Kennzahlen; Auffälligkeiten (z. B. Animation endet vor dem ersten Bild, Notaus gegriffen, Kennung ohne Element).

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/(bestand)/layout.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Nur `_werkstatt/werkzeuge/bewegung.mjs` ändern (keine anderen Werkzeuge, keine Tests, keine Projektdateien); kein Server-Start; keine Erlaubnisliste berühren.
- Die bestehenden Modi und Ausgabeformate bleiben rückwärtsverträglich (Felder ergänzen, nicht umbenennen).

## Schritte
1. 1. Lies `bewegung.mjs`, `src/lib/motion/register.ts`, `src/app/bewegung.css` (Abschnitte sig-plan, verband, einzugsband, fugenband, sig-kreuzlinie) und die beiden Belege oben.
2. 2. Werkzeug ändern; mit einem Kurzlauf auf `/fliesen` verband und `/` sig-kreuzlinie m390 prüfen, dass die Bilder den Wechsel zeigen.
3. 3. Prüfstufe A und Läufe 1–4 wie im Maßstab.
4. 4. Rückgabe nach Ausgabeformular mit Belegpfaden; Werkzeugänderung als kurze Liste.

## Schnellprüfung und Selbstprüfung
- Jedes neue oder geänderte Werkzeug einmal gegen eine echte Ansicht ausführen (Beleg: Ausgabepfad), `node --check` bzw. `bash -n` grün.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Jede Folge hat fünf Bilder; mindestens zwei davon unterscheiden sich sichtbar oder der Befund nennt, warum nicht.
- Änderung an `bewegung.mjs` rückwärtsverträglich: ein Lauf mit alten Optionen funktioniert.

## Ausgabeformular
In `_werkstatt/pakete/E4-NACH-16.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E4-NACH-16 · BEREIT ZUR RÜCKGABE ===
