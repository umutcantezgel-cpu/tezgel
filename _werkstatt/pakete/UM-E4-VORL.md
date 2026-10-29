# UM-E4-VORL · Bewegung der Vorlagen auf den Stand von `/` · Rolle Baumeister (Arbeitskopie) · Modell Opus · Kern-Version 4.4

## Ziel (PLAN E4-W1)
Die vier Vorlagen haben dieselben Bewegungsbausteine wie die Referenz `/`. Die Vorlagen sind `ErzaehlSeite`, `WissensSeite`, `OrtsSeite` und `ArbeitsSeite` in `src/components/vorlagen/`, mit ihren Teilen unter `teile/`. Es geht um vier Bausteine:
1. **Eingang** (E-081, E-090 N6): Beim Erstbesuch läuft der Eingang ohne Vorhang, mit Startklassen nur unter `html.k-eingang.k-bewegung:not(.k-notaus):not(.k-wiederkehr)` und gesamt ≤ 1,5 s.
   - Mobil kommen nur die H1-Zeilen herein.
   - LCP-Kandidaten starten nie unsichtbar (E-067-4).
   - Für jede Einstiegsart einzeln prüfen: `Einstieg`, `EinstiegMitte`, `EinstiegPlanblatt` und den Einstieg der Orts- und Arbeitsseite.
   - Was dort fehlt, mit `data-eingang` nachziehen. Eine Einstiegsart mit eigenem Signaturmoment (Planblatt: Waage und Lot) behält ihn.
2. **Zeilenmaske** der H1 in der Wiederkehr: auf allen Einstiegsarten gleich (Register `zeilenmaske`).
3. **Leitfaden:** Kopf nur auf gezeichneter Achse, Fangbereich an den Kanten und genau ein rotes Kreuz an Skalenursprüngen, so wie auf `/` nach UM-E3-FIX2 N1 und UM-E3-TAKT.
   - Im Compositor: Animationen nur mit echter Änderung in den Keyframes und Füllung `both` (Lehre aus E-092).
   - Mit Spiegeln für „ruhig“, reduziert, Druck und erzwungene Farben.
   - Prüfe, ob die Vorlagen Abschnitte und Bahnen so setzen, dass die Regeln greifen. Weiße Abschnitte haben keinen Kopf.
4. **Cursor-Ziele** (E-084): jedes Foto mit Glasfläche „Ansehen“, Regler „Ziehen“, Vorher-Nachher „Vergleichen“, nicht verfügbare Knöpfe „nicht verfügbar“, ladende „lädt“, über das vorhandene `data-cursor`-Muster. Fehlende Ziele in den Vorlagen-Teilen nachziehen, sonst nichts erfinden.
   - Doppelte Beschriftung vermeiden: Hat eine Glasfläche schon „Ansehen →“, braucht der Zeiger kein zweites „Ansehen“. Befund der Sicht Anlauf 3 (`belege/um-e3-fix2/sicht-anlauf-3.json`) prüfen und entscheiden; Begründung in die Notiz.

## Prüfseiten
Je Vorlage mindestens eine Hauptansicht aus `_werkstatt/HAUPTANSICHTEN.json`, z. B. `/bad`, `/leistungen`, `/standorte/wetzlar`, `/referenzen` und `/blog/<erster Artikel>`; Zuordnung im Code nachsehen. `/` muss unverändert bleiben (Pixel der Ruhezustände).

## Nicht ändern
- Wortlaut, Einwilligung, Rechtstexte, Firmendaten, Formulare und Kundenstimmen (G8).
- B-01 und `src/components/verlegen/**` (E-078).
- Gestaltung im Ruhezustand außerhalb dessen, was die Bewegung braucht; Rhythmus der Abschnitte bleibt Sache von CHOR.
- `/` nur, wenn eine gemeinsame Datei es erzwingt; dann ohne sichtbare Änderung.

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/vorl/baum` (Abzug von HEAD, `node_modules` verlinkt) und `…/vorl/vor` als Vergleich.
- Bauen: Turbopack braucht eine echte Kopie `node_modules_echt`. Danach den Verweis wiederherstellen und `.next` löschen; Speicher ist knapp.
- Server `npx next start -p 4398 -H 127.0.0.1`. Bildschirmfotos als PNG nur mit `installSperre` und `setzeEinwilligung` aus `/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs`.
- Vorlagen für Aufnahmen:
  - `…/fix/sicht2/bewegt.mjs`
  - `…/fix/sicht2/sicht.mjs` (Erstbesuch, `SICHT_BASE`)
  - `_werkstatt/werkzeuge/bewegung.mjs` (`--modus register|reduziert|bildrate`, `--schalter ruhig`)
- Server per Prozessgruppe aus der eigenen PID-Datei beenden, nie mit `pkill -f`.
- Am Ende:
  - `cd …/vorl && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor baum > UM-E4-VORL.diff`
  - Notiz `UM-E4-VORL.notiz.md`
- Prüfen:
  - `npm test`
  - `npx eslint` über die geänderten Code-Dateien
  - `werte.mjs --arbeitsbaum --dateien …` (0 Befunde)
  - `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`
  - `bewegung.mjs` register, reduziert und ruhig je Prüfseite
  - Bildrate auf zwei Prüfseiten und auf `/`, je vorher gegen nachher im Wechsel: ≤ 1 % oder nicht schlechter als vorher
- Das Repository liest du nur. Kein Git mit Schreibwirkung.

## Rückgabe
- je Vorlage und Baustein: vorher, nachher, Bildpfad;
- Prüfzahlen und Messreihe;
- Diff-Pfad und Dateien;
- offene Fragen.
