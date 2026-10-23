E2-PRUEF-B · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Prüfstufe B am E2-Tor für die Referenzansichten / und /kontakt auf dem Reinraum-Build 1ad2e45 (Port 4312)
Schreibrechte (exakt): `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-B/**`, `_werkstatt/belege/e2-tor/** (Belege: JSON, Logs, verkleinerte Bilder ≤ 1.440 px)`, dazu die Rückgabe `_werkstatt/pakete/E2-PRUEF-B.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Führe Prüfstufe B (AUFTRAG Abschnitt 9) für die Referenzansichten / und /kontakt auf dem Reinraum-Build von 1ad2e45 aus und lege die Belege unter `_werkstatt/belege/e2-tor/` ab – du behebst nichts. Lighthouse ist NICHT Teil dieses Pakets (eigenes Ruhefenster).

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

## Maßstab
- Build, Typprüfung, Lint, npm test, qa:graph grün (reinraum.sh); Funktionstests vollständig grün bis auf bekannte fixme; 0 Konsolenfehler; 0 Überlauf und 0 Überlappung mit Text in 390/768/1440; axe WCAG 2.2 AA: 0 ernste/kritische Befunde, auch mit offenem Menü und Banner; reduziert: keine Lage- oder Größenänderung, alles sichtbar; SIG-1: fünf Einzelbilder, Bildrate bei 4× CPU ≤ 5 % verworfene Bilder; Textvergleich gegen e0 auf / und /kontakt GRÜN (nur protokollierte Mikrotexte); werte.mjs: 0 Befunde in den seit 745335f geänderten Dateien.
- Berichtet wird, was die Werkzeuge ausgeben; keine Gestaltungsurteile.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Werkzeuge und Tests nicht ändern.
- Server: nur `PORT=4312 bash _werkstatt/werkzeuge/server.sh start 1ad2e45` (Reinraum-Build, ausdrücklich erlaubt) und am Ende NICHT stoppen; 4310 und 4320 nicht anfassen.
- Ausnahme zu „kein Build“: `reinraum.sh` (Schritt 1) baut in einer eigenen Kopie im Scratchpad und ist ausdrücklich erlaubt; sonst kein Build. Werkzeugoptionen (`--base`, `--ansichten` usw.) vorher mit dem Kopf der jeweiligen Datei bzw. `--help` klären; fehlt eine Option, `RELAUNCH_BASE=http://127.0.0.1:4312` setzen.
- Die Prüfung läuft allein; dauert ein Schritt länger als 20 Minuten ohne Ausgabe, abbrechen und melden.

## Schritte
1. Reinraum: `bash _werkstatt/werkzeuge/reinraum.sh 1ad2e45 $S/reinraum` – Ergebnis je Stufe (Build, tsc, Lint, npm test, qa:graph) und Routenzahl.
2. Server: `PORT=4312 bash _werkstatt/werkzeuge/server.sh start 1ad2e45`, dann `curl` auf / und /kontakt (200).
3. Funktionstests gegen 4312: in `_werkstatt/werkzeuge` `RELAUNCH_BASE=http://127.0.0.1:4312 RELAUNCH_OUTPUT=$S/pw RELAUNCH_REPORT=$S/pw.json npx playwright test --workers=1` – Summen (bestanden, fehlgeschlagen, übersprungen, fixme) und jeder Fehlschlag mit Spec, Titel, Projekt, Meldung; ein Fehlschlag einmal einzeln wiederholen.
4. Bildsatz: `node _werkstatt/werkzeuge/bildsatz.mjs --satz e2-tor --seiten /,/kontakt --base http://127.0.0.1:4312 --ziel $S/bildsatz` – je Seite × Gerät Status, Konsolenfehler, Überlauf, Überlappung; Bilder verkleinert nach `_werkstatt/belege/e2-tor/bilder/`.
5. Ersatzpfad: dasselbe mit `--ersatzpfad --satz e2-tor-ersatz --ziel $S/bildsatz-ersatz` (nur Zahlen).
6. axe: `node _werkstatt/werkzeuge/axe.mjs --satz e2-tor --seiten /,/kontakt --ansichten m390,d1440 --zustaende --ziel $S/axe` gegen 4312 (Option --base, falls vorhanden; sonst RELAUNCH_BASE) – ernste/kritische Knoten je Seite × Zustand, Regeln.
7. Bewegung: auf 4312 für / `--modus register`, `--modus reduziert` (m390 und d1440), `--modus einzelbilder --kennung sig-kreuzlinie` und `--kennung sig-flucht` (d1440), `--modus bildrate --wiederholungen 3` (m390 und d1440); für /kontakt `register` und `reduziert`. Zusammenfassungen übernehmen, Einzelbilder nach `_werkstatt/belege/e2-tor/bewegung/`.
8. Systemwerte: `node _werkstatt/werkzeuge/werte.mjs --basis 745335f --arbeitsbaum --ziel $S/werte` – Anzahl und Liste.
9. Texte: auf 4312 `node _werkstatt/werkzeuge/texte.mjs --satz e2-tor --seiten /,/kontakt --base http://127.0.0.1:4312 --ziel $S/texte` (RELAUNCH_BASE ebenso setzen), dann `node _werkstatt/werkzeuge/texte-vergleich.mjs e0 e2-tor --vorher-ordner _werkstatt/belege/e0 --nachher-ordner $S/texte --erlaubt _werkstatt/texte-erlaubt.json` – erste Zeile (Ergebnis, Summen) und jede unerlaubte Abweichung mit Seite, Teil, Text. Hinweis: Die Basis e0 enthält alle 121 Seiten; gewertet werden nur / und /kontakt.
10. Belege: alle Zusammenfassungen als `_werkstatt/belege/e2-tor/PRUEFSTUFE-B.md` (Tabelle Kriterium · Ergebnis · Belegpfad); Rückgabe mit denselben Zahlen.

## Schnellprüfung und Selbstprüfung
- Keine Werkzeugänderung; Belege unter `_werkstatt/belege/e2-tor/`.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Jede Zahl stammt aus einer genannten Datei; Bilder ≤ 1.440 px; keine Bilder mit personenbezogenen Daten.

## Ausgabeformular
In `_werkstatt/pakete/E2-PRUEF-B.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E2-PRUEF-B · BEREIT ZUR RÜCKGABE ===
