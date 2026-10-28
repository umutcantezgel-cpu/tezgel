# UM-E3-FIX · Nacharbeit nach Tor E3 Anlauf 1 (E-086) · Rolle Baumeister (Gestaltung, Arbeitskopie) · Modell Opus · Kern-Version 4.4

## Ausgangslage
Die Sichtabnahme von `/` lag bei 6,7 und 6,9, Ziel ≥ 8,5. Befunde und Begründungen stehen in `_werkstatt/belege/um-e3/b/sicht-anlauf-1.json` (zwei Prüfer). Lies sie ganz. Bilder des Anlaufs: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/e3b/bildsatz/<gerät>/start/` und `…/e3b/einzel/`. Stärken, die bleiben: Ablauf-Treppe mit Laserlinie, Entfernungslineal der Einsatzorte, Plan-Vignetten, mobiler erster Bildschirm.

## Teil A · Erster Bildschirm und Leitidee
- **F1 (hoch) · Einstieg ab t1024:**
  - Die Mitte bleibt (E-047 Ruhe: Einstieg mittig, Bilder vollständig, kein Beschnitt).
  - Die H1 ab lg deutlich größer (Stufe `fs-7` oder die größte passende).
  - Das Foto bekommt Gewicht: ein Querformat in voller Inhaltsbreite und eigenem Seitenverhältnis oder mindestens zwei Drittel der Spalte. Es bleibt vollständig und bleibt das LCP-Bild mit Vorladen (E-085, `next/image`, `sizes` passend).
  - Eine sichtbare rote 1-px-Schnur (Laser) als Grundlinie unter der H1, die in die Leitachse übergeht.
  - Fotos stehen in `src/data/arbeiten.ts`; die Bildverteilung (E4-W0, keine Doppelung über Hauptseiten) bleibt gültig.
- **F2 (mittel) · Eingang „An der Schnur“ (K-007):** Die rote Linie zieht in `dauer-3` durch die Grundlinie der ersten Zeile, die Zeilen setzen nacheinander mit `ease-setzen` darauf auf, und die Linie bleibt als Leitfaden stehen.
  - Nur CSS, unter `html.k-eingang.k-bewegung:not(.k-notaus)`.
  - Endzustand gleich dem Ruhezustand mit Schnur.
  - Gesamt ≤ 1,5 s; ruhig und reduziert ohne Bewegung (E-080, E-081).
  - Den Logo-Aufbau beim Erstbesuch prüfen; er liegt in den ersten 800 ms.
- **F3 (mittel) · Leitachse mobil:** Linie und Kreuze mit mindestens 8 px Abstand zum Text. Abschnittskreuze nur auf den Trennlinien, das Kopfkreuz nicht neben Textzeilen. Im Zustand „ruhig“ keine verlorenen Kreuze. Die doppelte Marke neben der Kilometerskala am Desktop (16 px Abstand) auflösen.

## Teil B · Rhythmus, Wegweiser, Fuß, große Bildschirme
- **F4 (mittel) · Keine drei gleichförmigen Kartenraster in Folge** (K-003 Prinzip 4): Galerie und Stimmen bekommen je Bildschirm einen Drittelversatz oder einen anderen Aufbau.
- **F5 (mittel) · Mobil:** Lagen und Leistungskarten überschneiden sich (etwa 1200 px). Den Leistungsblock mobil verdichten, ohne Inhalt zu streichen (Kerninhalt bleibt erreichbar).
- **F6 (mittel) · Fuß:**
  - Die Linkwand (rund 70 Einträge) gliedern.
  - Mobil zum Beispiel aufklappbare Gruppen mit nativem `details`, wenn die Navigation es trägt.
  - Am Desktop das leere Feld links füllen bzw. die Spalten ausgleichen.
  - Ziele und Wortlaut der Links bleiben, keine Adresse fällt weg (G8, Adressen).
- **F7 (gering) · Telefonnummern** im Fuß brechen nicht um.
- **F8 (mittel) · Große Bildschirme (d1920, d2560):** Der Inhalt soll nicht als kleine Insel wirken. Breite und Schriftstufen wachsen maßvoll über Tokens (`globals.css`, Designsystem).
- **F9 (mittel) · Einsatzorte in zwei Spalten:** Die Lesefolge muss der Entfernung folgen (bis 10 km, bis 25 km, mehr als 25 km).
- **F10 (gering) · Kundenstimmen:** Ein Weg zum ganzen Text, zum Beispiel ein Link „Ganze Bewertung“ zur Quelle oder nach `/referenzen`. Der Wortlaut bleibt unverändert (G8).

## Nicht ändern
- Wortlaut der H1 A-1/A-2 (G8).
- Logo-Datei.
- Cookie-Einwilligung samt Schloss-Symbol (M-28 offen).
- Rechtstexte, Firmendaten, Formulare und `/api/anfrage`.
- B-01 und `src/components/verlegen/**` (E-078).

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/fix/baum`. Abzug von HEAD mit verlinkten `node_modules`; Vergleich in `…/fix/vorher`.
- Teil A und B laufen nacheinander in derselben Kopie.
- Vor dem ersten Edit eines Teils: `rsync -a --exclude node_modules --exclude .next …/fix/baum/ …/fix/vor-<TEIL>/`.
- Am Ende eines Teils:
  - `cd …/fix && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor-<TEIL> baum > UM-E3-FIX-<TEIL>.diff`
  - dazu `UM-E3-FIX-<TEIL>.notiz.md`.
- **Sichtabgleich erlaubt:**
  - Du darfst in der Arbeitskopie bauen. Turbopack braucht eine echte Kopie von `node_modules` (`cp -a /home/user/tezgel/node_modules …/fix/baum/node_modules_echt`, dann tauschen); danach den Verweis wiederherstellen und `.next` löschen.
  - Starten mit `npx next start -p 4391`.
  - Bildschirmfotos mit Playwright nur über `installSperre` und `setzeEinwilligung` aus `/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs` (G5) und nur gegen 127.0.0.1:4391.
  - Den Server am Ende beenden, per Prozessnummer, nie mit `pkill -f` und einem Muster aus der eigenen Befehlszeile.
- Das Repository liest du nur. Kein Git mit Schreibwirkung.
- Prüfen:
  - `npm test`
  - `npx eslint`
  - `werte.mjs` über die geänderten Dateien (0 Befunde)
  - `npx tsc` mit vorübergehender `next-env.d.ts`
- Leitplanken wie in `pakete/UM-E3-W3.md`: Tokens, Bewegung nur über Register, Takt und Schalter, Spiegel für „ruhig“, CLS 0, Zugänglichkeit (Fokus 3:1, Reihenfolge, Namen).
- Keine Lage- oder Größenänderung durch Bewegung; Änderungen der Gestaltung im Ruhezustand sind gewollt.

## Rückgabe je Teil
- Prüfzahlen
- Diff-Pfad und Dateien
- je Befund F1 bis F10: umgesetzt, wie, und Pfad eines Bildschirmfotos aus dem Sichtabgleich
- offene Fragen
