# UM-E3-FIX2 · Nacharbeit nach Tor E3 Anlauf 2 (E-088) · Rolle Baumeister (Gestaltung, Arbeitskopie) · Modell Opus · Kern-Version 4.4

## Ausgangslage
- Sicht Anlauf 2 liegt bei 7,3 und 7,5, Ziel ≥ 8,5. Anlauf 1 lag bei 6,9 und 6,7.
- Befunde, Begründungen und `bis_85` beider Prüfer stehen in `_werkstatt/belege/um-e3-fix/sicht-anlauf-2.json`. Lies sie ganz.
- Bilder des Anlaufs (PNG, Stand 904eb1f1) liegen unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/fix/sicht2/`:
  - `bewegt/<gerät>/start/NN.png` (Bewegung an),
  - `bildsatz/…` (reduziert),
  - `erstbesuch/`, `b01/`, `detail/`, `cursor/`.
- Was UM-E3-FIX gebaut hat und warum, steht in `_werkstatt/ENTSCHEIDUNGEN.md` E-087 und in den Notizen `_werkstatt/belege/um-e3-fix/notiz-teil-a.md` und `notiz-teil-b.md`.
- **Stärken, die bleiben:**
  - Einstieg mit großer H1 auf der roten Schnur und Eingang „An der Schnur“ am Desktop,
  - Ablauf-Treppe, Entfernungslineal, Plan-Vignetten,
  - Lagen in Ich-Sätzen,
  - Galerie im Drittelverband,
  - Farb- und Formdisziplin,
  - ruhiger Rückfall.

## Teil A · Leitfaden und erster Bildschirm
- **N1 (hoch) · Kopf der Leitachse:** Der rote Kopf (Lot-Kreuz bei etwa 40 % der Fensterhöhe) steht nur dort, wo er auf einer gezeichneten Achse sitzt.
  - In weißen Abschnitten ohne Achse ist er weg, oder die Achse läuft dort als graue Grundschicht weiter. Wähle, was sich als geführte Laserlinie liest.
  - Nie zwei Kreuze näher als eine Fliesenstufe: Ein Fangbereich lässt nur ein Kreuz stehen, wenn der Kopf einem Abschnitts- oder Skalenkreuz näher als 24 px kommt.
  - Nie ein Kreuz neben einer Überschrift oder neben dem Formular.
  - Am Ursprung der Entfernungsskala steht genau ein rotes Kreuz.
  - Belege: `bewegt/d1440/start/07.png`, `08.png`; `t1024/05`, `09`, `10`; `d1920/03`, `05` bis `08`.
  - Nur CSS (Scroll- oder View-Timeline) unter `k-bewegung`, mit Spiegel für „ruhig“ und reduziert. Kein JavaScript je Bild; wenn doch, dann über `takt.ts`.
- **N2 (mittel) · Achse mobil:** Sie liegt nicht 4 px vom Rand, sondern mittig im Rand vor dem Satz (8 px bei 16 px Satzkante) oder an einer anderen Stelle, die sich als gesetzte Linie liest.
  - Kreuze stehen ganz im Bild und nie auf Höhe einer Textzeile.
  - Die Schnur endet passend dazu.
- **N3 (mittel) · Lot am Desktop:** Es ist heute 26 px lang. Es soll bis unter die Knopfreihe reichen, sodass Ort und Hauptknopf sichtbar an der Linie stehen und der Übergang in die Leitachse lesbar ist.
- **N4 (mittel) · Erster Bildschirm am Desktop (t1024 bis d2560):** Im ersten Bildschirm soll Fliesenarbeit stehen, nicht die Zimmerdecke.
  - Den Einstieg senkrecht straffen: Abstände, Vorspann und Bewertung in einer Zeile oder unter dem Foto.
  - Oder ein Startbild wählen, dessen obere Hälfte Fliesen zeigt. Bestand in `src/data/arbeiten.ts` und `public/images/arbeiten/`; die Bildverteilung E4-W0 (keine Doppelung über Hauptseiten) bleibt, also Verwendungen prüfen.
  - Das Foto bleibt vollständig, ohne Beschnitt (E-047), und bleibt das vorgeladene LCP-Bild (`EINSTIEG_MITTE_SIZES`, `fetchPriority`).
  - Die Leere unter dem Foto schrumpft auf eine Fliesenstufe.
- **N5 (mittel) · Eigener Moment für `/`:** eine Strichzeichnung eines Quadratmeters mit Bemaßung („100 cm“, Maßpfeile und Strich wie in den Plan-Vignetten) an der Schnur. Die rote Laserlinie ist dabei die Waage; die Zeichnung belegt die H1 „Perfektion auf jedem Quadratmeter.“.
  - Nur auf `/` (Eigenschaft im Inhalt, wie `titelGross`).
  - Inline-SVG mit Tokens, `aria-hidden`, kein CLS.
  - Sie darf weder LCP-Element werden noch das Foto verzögern.
  - Im Eingang entsteht sie mit der Schnur: Striche zeichnen sich, Kennung im Register. Ruhig und reduziert steht sie fertig.
  - Mobil nur, wenn sie die H1 nicht bedrängt; sonst ab md oder lg.
- **N6 (mittel) · Eingang mobil (unter sm):** Alles unter der Schnur steht ab 0 ms: Ort, Knöpfe, Vorspann, Bewertung. Nur Schnur und H1-Zeilen kommen herein; mobil gesamt ≤ 0,9 s.
  - Am Desktop beginnt die erste H1-Zeile, sobald die Schnur halb gezogen ist, damit 0 bis 450 ms keine halbe Linie über leerer Fläche zeigen.
  - LCP-Kandidaten starten nie unsichtbar (E-067-4). Der Logo-Aufbau bleibt.
- **N7 (gering) · H1 mobil:** größer, sodass „Quadratmeter.“ bei m360 und m390 etwa 90 % der Spalte füllt (rund 38 bis 40 px).
  - Längstes Wort bei 360 px und bei 200 % Schrift ohne Überlauf prüfen.

## Teil B · Rhythmus und Feinheiten
- **N8 (mittel) · Bruch nach dem Einstieg:** Einstieg, „Was möchten Sie ändern?“ und „Wir kümmern uns um alles …“ liegen auf derselben grauen Fläche mit drei mittigen Köpfen. Die Grenze muss sichtbar werden: Kalkweiß für einen Abschnitt oder dieselbe Fuge mit Kreuz wie bei den späteren Wechseln.
  - Je Desktop-Bildschirm ein bewusster Bruch.
- **N9 (mittel) · Leistungen:** vier gleiche Karten werden ein ungleiches Raster im Drittelverband, zum Beispiel eine große Fliese „Bad“ mit großer Plan-Zeichnung und drei schmale, oder ein linksbündiger Abschnitt an der Laserlinie.
  - Tablet (t768 bis t1024, q844): kein 2×2 mit 300 px hohen Zeichnungen. Stattdessen die mobile Querkarte in zwei Spalten oder Zeichnungen um 180 px.
  - Auf q844 ist keine Karte höher als der Bildschirm.
  - Alle vier Bereiche mit Zeichnung und Ziel bleiben.
- **N10 (gering) · Doppelte Wahl:** Lagen und Leistungen folgen direkt aufeinander. Wenn N9 es natürlich ergibt, die Leistungen sichtbar nachrangig setzen; kein Inhalt fällt weg (G4).
- **N11 (gering) · Kundenstimme einzeln:**
  - Die linke Zelle mit Sternen und Namen ist am Desktop fast leer. Karte niedriger oder Zelle schmaler.
  - Der Link „Alle Bewertungen bei Google lesen“ steht sichtbar nah an der Stimme, einmal je Seite.
  - Der Wortlaut bleibt ungekürzt und unverändert (G8).
- **N12 (gering) · Fuß, Firmendaten:** Die untere Zeile (Kammer, Betrieb seit, USt-IdNr.) fluchtet auf dieselben Fugen wie die Kontaktfelder darüber.
  - Inhalte und Reihenfolge der Angaben bleiben (G8).

## Nicht ändern
- Wortlaut der H1 A-1/A-2 (Auftraggeber, G8).
- Logo-Datei.
- Cookie-Einwilligung samt Schloss-Symbol in der Leiste (M-28 offen).
- Rechtstexte, Firmendaten, Formulare und `/api/anfrage`.
- Wortlaut der Kundenstimmen.
- B-01 und `src/components/verlegen/**` (E-078).

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/fix2/baum`. Abzug von HEAD mit verlinkten `node_modules`; Vergleich in `…/fix2/vorher`.
- Teil A und B laufen nacheinander in derselben Kopie.
- Vor dem ersten Edit eines Teils: `mkdir -p …/fix2/vor-<TEIL> && (cd …/fix2/baum && tar --exclude=./node_modules --exclude=./.next -cf - .) | (cd …/fix2/vor-<TEIL> && tar -xf -)`. rsync fehlt.
- Am Ende eines Teils:
  - `cd …/fix2 && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor-<TEIL> baum > UM-E3-FIX2-<TEIL>.diff`
  - dazu `UM-E3-FIX2-<TEIL>.notiz.md`.
- **Sichtabgleich erlaubt:**
  - Du darfst in der Arbeitskopie bauen. Turbopack braucht eine echte Kopie von `node_modules` (`cp -a /home/user/tezgel/node_modules …/fix2/baum/node_modules_echt`, dann tauschen); danach den Verweis wiederherstellen und `.next` löschen.
  - Starten mit `npx next start -p 4393 -H 127.0.0.1`.
  - Bildschirmfotos mit Playwright nur über `installSperre` und `setzeEinwilligung` aus `/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs` (G5), nur gegen 127.0.0.1:4393, als PNG.
  - Vorlagen für Aufnahmen: `…/fix/sicht2/bewegt.mjs` (Bewegung an), `…/fix/sicht2/sicht.mjs` (Erstbesuch mit `eingang`), `…/fix/sicht2/detail.mjs`. Sie nehmen den Port als Argument bzw. `SICHT_BASE`.
  - Den Server am Ende per Prozessgruppe aus der PID-Datei beenden, nie mit `pkill -f`.
- Das Repository liest du nur. Kein Git mit Schreibwirkung.
- Prüfen:
  - `npm test`
  - `npx eslint` über die geänderten Dateien
  - `werte.mjs --arbeitsbaum --dateien …` (0 Befunde)
  - `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`
  - `ueberlappung.mjs` auf `/` (m360, m390, t1024, d1440, d1920)
- Leitplanken wie in `pakete/UM-E3-W3.md`: Tokens, Bewegung nur über Register, Takt und Schalter, Spiegel für „ruhig“ (Wächtertests Schalter 4 und 5), CLS 0, Zugänglichkeit (Fokus 3:1, Reihenfolge, Namen).

## Rückgabe je Teil
- Prüfzahlen
- Diff-Pfad und Dateien
- je Befund: umgesetzt, wie, und Pfad eines Bildschirmfotos (PNG) aus dem Sichtabgleich
- offene Fragen
