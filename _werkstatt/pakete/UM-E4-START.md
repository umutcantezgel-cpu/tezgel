# UM-E4-START · Startseite `/` nach Sicht Anlauf 3 · Rolle Baumeister (Arbeitskopie) · Modell Opus · Kern-Version 4.4

Grundlage: die Befunde der beiden Prüfer in `_werkstatt/belege/um-e3-fix2/sicht-anlauf-3.json` (Stand 8bcca3c8; Bilder im Scratchpad unter `fix2/sicht3/`), die PLAN-Zeile UM-E4-START und `berichte/UM-E4-FS-K.md` Nr. 2, 6 und 12. Ziel des Pakets ist der Ansichtswert 8,5 auf `/` (Sicht 3 lag bei 7,5 und 7,6). Maßstab KERN K-003, K-004, K-006, K-007, K-008, K-016; E-047 (Einstieg mittig, Bild vollständig).

Seit Sicht 3 bereits erledigt, nicht noch einmal anfassen:
- doppelte Beschriftung von Cursor und Glasbild (E-093);
- `.kreuz-rot` bei erzwungenen Farben (E-093);
- Kantenkreuze im Takt (E-092);
- Register der Leitfaden-Marke (UM-E4-CHOR-FIX).

## Entscheidungen des Orchestrators (verbindlich)
1. **Erster Bildschirm mobil zeigt die Arbeit** (K-006: „Mobil … dann Bild“):
   - Reihenfolge unter lg: H1, Ort, Hauptknopf, Telefon, dann das Startfoto, danach Vorspann und Bewertung (wie am Desktop).
   - Den Abstand zwischen Ortslink und Hauptknopf auf dieselbe Fugenstufe setzen wie zwischen Ortszeile und Link.
   - Ziel: Die Oberkante des Fotos steht auf m390 (844 px Höhe, ohne die feste Leiste) sichtbar im ersten Bildschirm.
   - Das Foto bleibt das vorgeladene LCP-Bild (`priority`, `sizes` passend); kein neuer LCP-Kandidat, der später erscheint.
2. **Startfoto am Desktop:**
   - Ab lg ein echtes Querformat aus dem Bestand (`public/images/**`, die 84 Originale nach EINRICHTUNG), auf dem Boden und Wand vollständig zu sehen sind.
   - Vollständig im eigenen Seitenverhältnis (E-047), etwa zwei Drittel der Spalte breit, linke Kante in der Flucht von Ort-Satz und Lot.
   - Gibt es kein geeignetes Querformat in ausreichender Auflösung, bleibt das Hochformat. Dann wird es in das Raster eingehängt (Oberkante auf die Fuge am Lot-Ende, Kante in der Flucht), und die Notiz begründet das mit einer Liste der geprüften Kandidaten.
   - Ein zweites Foto (Nahaufnahme „ganz und nah“) nur, wenn eine echte, scharfe Nahaufnahme von Fuge oder Kante im Bestand liegt. Nie ein Stockfoto, nie eine Erfindung.
   - Mobil bleibt das bisherige Foto, wenn das Querformat dort schlechter wirkt (Bildauswahl je Breite mit `<picture>` oder `next/image` mit Art Direction).
3. **H1 an der Schnur:**
   - Die Grundlinie der letzten H1-Zeile steht genau auf der roten Schnur; die Unterlängen kreuzen sie.
   - Das 1-m²-Maß steht direkt hinter „Quadratmeter.“ auf der Schnur, etwa zwei Zeilenhöhen hoch, auch unter lg (dort kleiner).
   - Ab md ist die Anzeige eine Stufe größer als mobil (t768).
   - Das Lot reicht bis zum Foto.
   - Wortlaut der H1 unverändert (A-1, G8).
4. **Leitfaden mit Präsenz:**
   - Der aktive rote Abschnitt ist mobil und bei DPR 1 2 px stark, sonst bleibt er 1 px.
   - Das Lot steht mobil auf der Satzkante (16 px) statt am Rand.
   - Das Kantenkreuz des aktuellen Abschnitts wird rot, wenn der Strich es erreicht. Das gibt es schon über `kante-rot`; nur prüfen und bei Bedarf schärfen.
   - Die ruhige Fassung bleibt unverändert.
   - Lehre aus E-092: nur Animationen mit echter Änderung in den Keyframes, compositor-fähig.
5. **Eine Auswahlebene:**
   - Die Plan-Vignetten wandern in die Zeilen der Lagen-Liste „Was möchten Sie ändern?“: je Lage ihre Zeichnung links, Satz und Pfeil rechts. Die Ziele bleiben gleich.
   - „Wir kümmern uns um alles“ wird zu einer ruhigen Zeile mit den Leistungs-Links unter der Liste. Ihr Kopf steht mittig (K-016).
   - Die Texte bleiben im Wortlaut. Mobil kommt man so etwa zwei Bildschirmhöhen früher zum Ablauf.
6. **Ein Moment mit Gewicht in der Mitte:**
   - Die rote Stufenlinie der Treppe „So kommen Sie …“ reißt beim Eintritt einmal Stufe für Stufe an: Sichtbarkeit 40 %, je Stufe `dauer-3`, `ease-setzen`. Die Fugenkreuze setzen, wenn die Linie sie erreicht.
   - Kennung aus dem Register (`anriss`, sonst die passende vorhandene; neue Kennung nur mit Eintrag in `register.ts`, `_werkstatt/register.json` und KERN K-008).
   - Reduziert, ruhig und im Ersatzzweig steht die Linie voll.
   - Compositor-fähig (`transform` bzw. `clip-path`, nicht `stroke-dashoffset` auf dem Hauptthread).
   - Höchstens ein Auftritt mit Gewicht je Bildschirmhöhe (K-007).
7. **Galerie „So sieht unsere Arbeit aus.“:** Auf allen Geräten ohne Hover zeigt der Name denselben kurzen Verlauf wie mobil, höchstens zwei Zeilen; der Boden bleibt sichtbar. Desktop mit Hover unverändert.
8. **Kundenstimmen:**
   - Die Karte steht um ein Drittel versetzt (bewusster Bruch).
   - Der gezeigte Ausschnitt endet an einem Satzende. Der Wortlaut der Stimme bleibt Zeichen für Zeichen gleich, nur die Länge des Ausschnitts ändert sich (G8).
   - FS-K Nr. 12 (Versalwort im Zitat) über CSS ohne Wortlautänderung.
9. **Leiste „Cookies“ (Auftraggeber M-28, bleibt in der Leiste):**
   - Das Feld steht ab dem ersten Bild stabil, ohne Ein- und Ausblenden beim Erstbesuch. Etwa so: Der Platz `#leiste-schild` zeigt serverseitig dasselbe Schloss mit „Cookies“ (inert), bis die Einwilligung ihren Knopf einhängt, ohne sichtbaren Wechsel.
   - Auf q844 stehen Symbol und Text wie in den anderen Feldern.
   - Verhalten der Einwilligung unverändert (G8): Name, Öffnen der Einstellungen, Speicherung.
   - Specs `funktion-einwilligung` und `funktion-tracking` grün.
10. **Trennfugen FS-K Nr. 2 und 6:** Wörter in `FUGEN` (`src/components/kern/zusammen.tsx`), Einbindung über `mitFugen` in `Tun.tsx` und `Ablauf.tsx`.
11. **Hauptthread-Schub** etwa 2,7 s nach Beginn der Scroll-Geste (E-092, auch ohne Kantenkreuze):
   - mit einer Spur (Performance-Profil) die Ursache finden;
   - beheben, wenn sie im eigenen Code liegt und die Behebung klein ist;
   - sonst Befund mit Beleg in der Notiz.

## Nicht ändern
- Wortlaut aller Texte, H1 A-1, Kundenstimmen (nur Ausschnittlänge), Bewertungszahlen, Einwilligung im Verhalten, Rechtstexte, Firmendaten, Formulare (G8).
- B-01 (E-078).
- Andere Seiten nur über gemeinsame Teile und dann ohne sichtbare Änderung im Ruhezustand. Ausnahme: Punkt 9 wirkt auf allen Seiten, nur beim Erstbesuch.

## Messen (Pflicht, vor und nach, in derselben Reihenfolge abwechselnd)
- LCP `/` mobil und Desktop (Lighthouse allein auf dem Rechner, je 3 Läufe; `_werkstatt/werkzeuge/lighthouse.mjs`). Darf nicht schlechter werden; Ziel ≤ 2,5 s mobil.
- `bewegung.mjs --modus bildrate --seite /` (verworfen < 1 %; vorher 0,07 %).
- `bewegung.mjs` register, reduziert und ruhig auf `/`.

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/start/baum` (Abzug von HEAD, `node_modules` verlinkt).
- Vor dem ersten Edit `vor` anlegen:
  `mkdir -p …/start/vor && (cd …/start/baum && tar --exclude=./node_modules --exclude=./.next -cf - .) | (cd …/start/vor && tar -xf -)`
- Am Ende:
  - `cd …/start && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor baum > UM-E4-START.diff`
  - Notiz `UM-E4-START.notiz.md`: je Entscheidung umgesetzt wie, Bildpfade vorher und nachher, Messwerte.
- Bauen: eine echte Kopie `node_modules_echt` für Turbopack, danach Verweis zurück und `.next` löschen. Speicher ist knapp.
  - Server vorher (Bau von `vor` in eigener Kopie `…/start/vorbau`) auf 4421, nachher auf 4420; `npx next start -p <Port> -H 127.0.0.1`.
  - Server per Prozessgruppe aus der eigenen PID-Datei beenden.
  - Bilder als PNG mit `installSperre` und `setzeEinwilligung` aus `_werkstatt/werkzeuge/lib.mjs`.
  - Erstbesuch (voller Eingang) und Wiederbesuch; m360, m390, q844, t768, t1024, d1440, d1920.
- Prüfen:
  - `npm test`
  - `npx eslint`
  - `npx tsc` mit vorübergehender `next-env.d.ts`
  - `werte.mjs --arbeitsbaum --dateien …` mit 0 Befunden
  - die Specs zu Start, Einwilligung, Tracking, Leiste und Verlegen gegen den eigenen Bau: `RELAUNCH_BASE=http://127.0.0.1:4420 npx playwright test <specs>` im Ordner `_werkstatt/werkzeuge` des Repos (nur lesen)
- Das Repository liest du nur. Kein Git mit Schreibwirkung.

## Rückgabe
Prüfzahlen, Messwerte vorher und nachher, Diff-Pfad und Dateien, je Entscheidung umgesetzt wie, mit Bildpfad, offene Fragen.
