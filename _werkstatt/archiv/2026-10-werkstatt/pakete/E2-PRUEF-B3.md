E2-PRUEF-B3 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Abschluss der Nachprüfung am E2-Tor (übernimmt E2-PRUEF-B2 ab Schritt 5) auf Reinraum-Build f8899dc (Port 4312) und Dev 4320
Schreibrechte (exakt): `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-B3/**`, `_werkstatt/belege/e2-tor/b2/**`, `_werkstatt/belege/e2-tor/bewegung/**`, `_werkstatt/belege/e2-tor/szene/**`, `_werkstatt/belege/e2-tor/PRUEFSTUFE-B2.md`, `_werkstatt/pakete/E2-PRUEF-B2.rueckgabe.md`, dazu die Rückgabe `_werkstatt/pakete/E2-PRUEF-B3.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Schließe die Nachprüfung ab: axe gegen den richtigen Server, Bewegungsbelege sichten und ergänzen, Szene im Dev-Schaufenster, Systemwerte, Texte und die Belegdatei – du behebst nichts.

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
- axe 0 ernste/kritische Knoten auf / und /kontakt in allen Zuständen; Register ohne Einträge „ohne data-motion“; reduziert 0 Bewegungsbefunde; Textvergleich GRÜN; werte.mjs 0 Befunde in den seit 1ad2e45 geänderten Dateien (Ausnahmeliste `werte-regeln.json` gilt).
- Berichtet wird, was die Werkzeuge ausgeben; keine Gestaltungsurteile.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Werkzeuge und Tests nicht ändern. Server weder starten noch stoppen: 4312 (Reinraum f8899dc), 4311 (GA-Variante f8899dc), 4310 (Ausgangsstand 745335f) und 4320 (Dev, Arbeitsbaum) laufen.
- WICHTIG Serveradresse: `axe.mjs` (und alle Werkzeuge, die `BASE` aus `lib.mjs` nutzen) kennen KEIN `--base`, sie lesen nur `RELAUNCH_BASE` (Standard 4310 = alter Stand!). Setze bei JEDEM Werkzeugaufruf `RELAUNCH_BASE=<Ziel>` und zusätzlich `--base <Ziel>`, wo das Werkzeug es kennt. Prüfe im Ergebnis, dass die Ziel-URL stimmt.
- Vorgänger-Paket E2-PRUEF-B2 nicht fortsetzen oder neu starten: Seine Ergebnisse der Schritte 1–4 stehen in seinem Scratchpad und unter `_werkstatt/belege/e2-tor/b2/` bzw. `bilder/` – übernimm sie nur in die Belegdatei.
- Die Prüfung läuft allein; dauert ein Schritt länger als 20 Minuten ohne Ausgabe, abbrechen und melden. Gib erst zurück, wenn alle Schritte fertig sind.

## Schritte
1. Lage: Läuft noch `bewegung-lauf.sh` (`pgrep -f bewegung-lauf.sh`)? Dann warten, bis er endet (in Schleifen von höchstens 5 Minuten prüfen). Lies `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-B2/bewegung-lauf.log` und die Ergebnisse unter `_werkstatt/belege/e2-tor/bewegung/`.
2. axe: `RELAUNCH_BASE=http://127.0.0.1:4312 node _werkstatt/werkzeuge/axe.mjs --satz e2-tor-n --seiten /,/kontakt --ansichten m390,d1440 --zustaende --ziel $S/axe` – ernste/kritische Knoten je Seite × Zustand mit Regel und Selektor (nur / und /kontakt werten). Kopie von axe.json nach `_werkstatt/belege/e2-tor/b2/axe/`. Vermerk: Der axe-Lauf von E2-PRUEF-B2 lief gegen 4310 (alter Stand) und ist verworfen.
3. Bewegung auf 4312 (RELAUNCH_BASE und --base http://127.0.0.1:4312): Prüfe, welche dieser Läufe im Belegordner vollständig und gegen 4312 vorliegen, und führe fehlende nach: `register` / und /kontakt (m390, d1440); `reduziert` / und /kontakt (m390, d1440); `einzelbilder --kennung sig-kreuzlinie --ausschnitt ansicht` (m390, d1440); `einzelbilder --kennung sig-flucht --ausschnitt ansicht` (d1440); `bildrate --wiederholungen 3` (m390). Zusammenfassung je Lauf; bei byte-gleichen Einzelbildern die md5.
4. Szene im Dev-Schaufenster auf 4320, Seite `/werkstatt-schaufenster/szene` (RELAUNCH_BASE und --base http://127.0.0.1:4320): `register` (m390, d1440), `reduziert` (m390, d1440), `einzelbilder --kennung szene-ablauf` (d1440; meldet das Werkzeug einen unbekannten Auslöser, so übernehmen). Dann `bildsatz.mjs --satz e3-szene --seiten /werkstatt-schaufenster/szene --base http://127.0.0.1:4320 --ziel $S/szene` und mit `--ersatzpfad` (Zahlen); 3 Bilder d1440 und 2 Bilder m390 nach `_werkstatt/belege/e2-tor/szene/`.
5. Systemwerte: `git diff --name-only 1ad2e45 f8899dc -- src` (nur .js/.jsx/.ts/.tsx/.css, vorhandene Dateien) und `node _werkstatt/werkzeuge/werte.mjs --basis 1ad2e45 --arbeitsbaum --ziel $S/werte` – Anzahl und Liste je Datei; zur Information die Gesamtzahl mit `--basis 745335f`.
6. Texte: `RELAUNCH_BASE=http://127.0.0.1:4312 node _werkstatt/werkzeuge/texte.mjs --satz e2-tor-n --seiten /,/kontakt --base http://127.0.0.1:4312 --ziel $S/texte`, dann `node _werkstatt/werkzeuge/texte-vergleich.mjs e0 e2-tor-n --vorher-ordner _werkstatt/belege/e0 --nachher-ordner $S/texte --erlaubt _werkstatt/texte-erlaubt.json` – erste Zeile, jede unerlaubte Abweichung (nur / und /kontakt) und die hinzugefügten Zeilen je Seite als Anzahl.
7. Belegdatei `_werkstatt/belege/e2-tor/PRUEFSTUFE-B2.md`: Tabelle Kriterium · Ergebnis · Belegpfad über alle Schritte. Schritte 1–4 aus E2-PRUEF-B2 übernehmen (Werkzeug-Option `--ausschnitt ansicht` in bewegung.mjs; Reinraum f8899dc und GA-Variante grün, npm test 26/26, 179 Seiten; Funktion 4312: 306/286/0 fehlgeschlagen/20 übersprungen davon 4 fixme; Tracking 4311: 8/8; Bildsatz 66 Aufnahmen, Fehler/Überlauf/Überlappung/Konsole 0; Ersatzpfad 66, alle 0) – die Zahlen in `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-B2/pw.json`, `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-B2/pw-ga.json`, `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-B2/bildsatz/` gegenprüfen und pw.json/pw-ga.json nach `_werkstatt/belege/e2-tor/b2/funktion/` kopieren.
8. Rückgabe `_werkstatt/pakete/E2-PRUEF-B2.rueckgabe.md` mit denselben Zahlen (Kopf: „E2-PRUEF-B2 · abgeschlossen durch E2-PRUEF-B3“); `git status --porcelain` prüfen.

## Schnellprüfung und Selbstprüfung
- Keine Werkzeugänderung; Belege unter `_werkstatt/belege/e2-tor/`.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Jede Zahl stammt aus einer genannten Datei; jede Messung nennt ihre Ziel-URL; Bilder ≤ 1.440 px.

## Ausgabeformular
In `_werkstatt/pakete/E2-PRUEF-B3.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E2-PRUEF-B3 · BEREIT ZUR RÜCKGABE ===
