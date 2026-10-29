# UM-E4-CHOR-FIX · Befunde der Choreografie-Berichte umsetzen · Rolle Baumeister (Arbeitskopie) · Modell Opus · Kern-Version 4.4

Grundlage: `_werkstatt/berichte/UM-E4-CHOR-SAMMLUNG.md` (bestätigte Befunde mit Datei, Zeile und Bild) und die elf Berichte `berichte/UM-E4-CHOR-01.md` bis `-11.md`. Maßstab KERN K-003 (Prinzip 4 Rhythmus), K-007 (Leitfaden, Signatur), K-008 (Register), K-016 (Ruhe). Referenz ist `/`.

Der Stand enthält bereits UM-E4-INHALT Teil A (neue Abschnitte für Vergleich, Werte, Versprechen). Die Flächenfolge prüfst du daher am aktuellen Stand der Arbeitskopie, nicht an den Zahlen der Berichte.

## Entscheidungen des Orchestrators (verbindlich)
1. **Register der Leitfaden-Marke:** `data-motion="leitachse"` am Behälter `.leitfaden-bahn` in `src/components/kern/Abschnitt.tsx`. Nicht an der Marke selbst. Danach meldet `bewegung.mjs --modus register --ansicht d1440` auf `/`, `/bad`, `/blog`, `/leistungen` und `/standorte/wetzlar` keine Animation ohne Kennung mehr. Der Ruhezustand bleibt pixelgleich.
2. **Flächenfolge wie auf `/` (strikt wechselnd ab dem Einstieg):**
   - `aufFliese: true` im Block `lage` von `src/inhalte/bad-badsanierung.ts`, `barrierefreies-bad.ts`, `ueber-uns.ts`, `balkon-terrasse.ts` und im Orts-Inhalt `src/inhalte/orte.ts`.
   - Für `orte.ts` zusätzlich `anDerLinie: true` im Block `tun` (wie `start.ts`).
   - Die Wissensvorlage (`WissensSeite.tsx`) reicht `aufFliese` wie die Erzählvorlage an `Lage` und als `fugeUnten` an den Einstieg weiter. Gesetzt wird es in `src/inhalte/blog.ts`. Für `/fliesen` nur, wenn die Folge dort sonst drei gleiche Flächen in Folge hat.
   - Danach je Seite die tatsächliche Folge messen (Hintergrund und Kante je Abschnitt bei d1440). Ziel: keine drei gleich gebauten Abschnitte in Folge und ein bewusster Bruch je Desktop-Bildschirm.
3. **Ende der Bad-Seiten** (Kundenstimmen, Schritt und Anfrage alle auf Fliese): Bleiben nach Punkt 2 drei gleiche Flächen in Folge, kommen die Kundenstimmen auf Kalk, nur die Fläche. Die Anfrage (Werkzeug mit Formular) kommt nie auf Kalk, weil dort die Abschnittsmarke neben dem Formular stünde. Gilt auch für `/blog` am Ende.
4. **Fotoreihen mit Drittelversatz:** `fotosVersatz: true` im Block `beleg` von `bad-badsanierung.ts`, `leistungen.ts` und `balkon-terrasse.ts` (je mindestens drei Fotos). `/bad/barrierefreies-bad` hat zwei Fotos: keine Änderung an `Beleg.tsx`. Nach Punkt 2 reicht dort der Flächenwechsel als Bruch; in der Notiz vermerken.
5. **Kopf-Pausen** (Kopf nie neben Überschrift oder Formular), nach dem Muster in `BlogFilter.jsx` und `Einsatzkarte.tsx`:
   - `data-kopf-pause="ganz"` an der Hülle der Musterwahl auf `/fliesen` (`VerbandProbe` über `Wissen.tsx`);
   - am Zweierbild mit Bildunterschrift in `Beleg.tsx`;
   - an der Hülle von Satz, Filterknöpfen und Statuszeile in `src/components/momente/galerie-filter/GalerieWahl.tsx`.
   - Nachweis mit Bildern an den in der Sammlung genannten Scrollpositionen (d1440): Dort steht kein Kopfkreuz mehr.
6. **`/leistungen`, zwei Kartenraster in Folge:**
   - Zuerst prüfen, ob `Ablauf` eine vorhandene Treppen-Darstellung wie auf `/` kennt. Wenn ja, `/leistungen` damit setzen (nur der Inhalt von `leistungen.ts`).
   - Wenn nicht, bleibt `SzeneAblauf` unverändert (wird auch anderswo genutzt). Dann reicht der Bruch aus Punkt 4 (Fotoversatz); in der Notiz begründen.
7. **`/leistungen` mobil, zwei Plan-Auftritte in einer Bildschirmhöhe** (`Leistungsplaene.tsx`, `sig-plan`, nur grob): Auf Touch höchstens ein Auftritt je Bildschirmhöhe. Kleinste Lösung im Rahmen des Registers, z. B. die Reihe als ein Auftritt. Desktop unverändert. Register und `register.json` nur nachziehen, wenn sich die Kennung ändert.
8. **`/referenzen`, Galerie, Vorher-Nachher und Bewertungen auf derselben Fläche:** Vorher-Nachher kommt auf Fliese, nur die Fläche des Abschnitts in `src/app/(bestand)/referenzen/page.jsx`. Ergebnis: Kalk, Fliese, Kalk, dann Schritt auf Fliese. Wortlaut, Kundenstimmen und Bewertungszahlen bleiben unverändert (G8).
9. **`/blog`, lange Artikelliste:** Die Liste ist ein Werkzeug (K-016); sie wird nicht geteilt. Der Bruch entsteht über Punkt 2 (Flächenfolge). Vermerk in der Notiz.
10. **`/kontakt`:** keine Codeänderung.
    - Die Einsatzkarte bleibt; die Ausnahme aus E-062 trägt der Orchestrator in KERN nach.
    - Die drei gleich gebauten Arbeitsabschnitte sind bewusst nach K-016.

## Nicht ändern
- Wortlaut aller Texte, Kundenstimmen, Bewertungszahlen, Einwilligung, Rechtstexte, Firmendaten, Formulare, H1 A-1/A-2 (G8).
- B-01 (E-078).
- `/` nur über gemeinsame Teile und dann ohne sichtbare Änderung im Ruhezustand (Punkt 1 darf `/` nicht verändern).
- Die Inhalte aus UM-E4-INHALT Teil A (Vergleich, Werte, Versprechen) nur in ihrer Fläche, nicht im Inhalt.

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/chorfix/baum` (Abzug von HEAD, `node_modules` verlinkt).
- Vor dem ersten Edit `vor` anlegen:
  `mkdir -p …/chorfix/vor && (cd …/chorfix/baum && tar --exclude=./node_modules --exclude=./.next -cf - .) | (cd …/chorfix/vor && tar -xf -)`
- Am Ende:
  - `cd …/chorfix && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor baum > UM-E4-CHOR-FIX.diff`
  - Notiz `UM-E4-CHOR-FIX.notiz.md`: je Entscheidung, was umgesetzt wurde und wie, mit Bildpfad; gemessene Flächenfolge je Seite vorher und nachher.
- Bauen: eine echte Kopie `node_modules_echt` für Turbopack, danach Verweis zurück und `.next` löschen. Server `npx next start -p 4410 -H 127.0.0.1`, per Prozessgruppe aus der eigenen PID-Datei beenden. Bilder als PNG mit `installSperre` und `setzeEinwilligung` aus `_werkstatt/werkzeuge/lib.mjs`.
- Prüfen:
  - `npm test`
  - `npx eslint`
  - `npx tsc` mit vorübergehender `next-env.d.ts`
  - `werte.mjs --arbeitsbaum --dateien …` mit 0 Befunden
  - `bewegung.mjs` register (d1440 und m390), reduziert und ruhig auf den geänderten Seiten und auf `/`
- Das Repository liest du nur. Kein Git mit Schreibwirkung.

## Rückgabe
Prüfzahlen, Diff-Pfad und Dateien, je Entscheidung umgesetzt wie, mit Bildpfad, offene Fragen.
