# UM-E3-EIN · Rolle Baumeister (Entwurf und Bau in Arbeitskopie) · Modell Opus · Stufe 3 · Kern-Version 4.2 · Kostenklasse L

## Ziel
Eingang ohne Vorhang nach E-067-4 Weg (a) (`_werkstatt/ENTSCHEIDUNGEN.md`, Abschnitt E-067-4; PLAN-Zeile UM-E3-EIN; KERN 4.2 „Regeln v4“ und K-007 Intro/Startbild):
- Das Logo baut sich im Kopf auf; der Endzustand ist exakt das Original-Logo (PNG, eine Vektordatei fehlt: MENSCHEN M-09).
- Die H1-Zeilen erscheinen hinter Zeilenmasken, Ort und Hauptknopf folgen. Alles dauert höchstens 1,5 s.
- Das LCP-Foto ist vom ersten Bild an sichtbar, höchstens begleitet von einem Fugenriss am Rand. Der Startbild-Belag deckt es nicht mehr ab.
- Zeitlimit 2 s im Kopfskript: Danach gilt sofort der Endzustand.
- Wiederkehr im selben Besuch: kürzer, nur Zeilenmasken, ohne Logo-Aufbau.
- Die Intro-Schicht B-02 (Kalkblatt) und der Startbild-Belag entfallen als Vorhang; ihre Kennungen bleiben als Alias im Register.

## Arbeitsweise (verbindlich)
- Du arbeitest NUR in der Arbeitskopie `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/ein/baum`. Sie ist ein Abzug von HEAD 1192d222 mit verlinkten `node_modules`.
- Im Repository `/home/user/tezgel` liest du höchstens. Du schreibst dort nichts, auch keine Git-Befehle mit Schreibwirkung. Kein Commit, kein Push.
- Prüfen in der Arbeitskopie mit Node 24: `export PATH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/node-lts/aktuell/bin:$PATH`, dann:
  - `npm test`
  - `npx tsc --noEmit -p .`
  - `npx eslint <geänderte Dateien>`
  - `node _werkstatt/werkzeuge/werte.mjs --arbeitsbaum --dateien <geänderte Dateien>`
- Kein Browser, kein Server, kein Build; Stufe A macht der Orchestrator.
- Ergebnis:
  - `…/scratchpad/ein/ein.diff`, erzeugt mit `cd …/scratchpad/ein && diff -ruN --exclude=node_modules <Abzug von HEAD> baum`, oder als Liste der geänderten Dateien. Am einfachsten: vor dem ersten Edit eine zweite Kopie `…/scratchpad/ein/vorher` mit `cp -a` (ohne node_modules) anlegen und am Ende `diff -ruN` bilden.
  - Dazu `…/scratchpad/ein/notiz.md` mit Entwurf, Entscheidungen, offenen Fragen und Prüfergebnissen.

## Leitplanken
- **B-01 „Verlegen“ ist eingefroren (E-078):** `src/components/verlegen/**` und die Verlegen-Regeln in `bewegung.css` bleiben unverändert. Heute nimmt B-01 `k-startbild` beim ersten Seitenwechsel weg. Gibt es `k-startbild` nicht mehr, darf das ins Leere laufen; es darf aber keinen Fehler werfen.
- **Bewegungsschalter (E-080):** Bei reduzierter Bewegung oder „ruhig“ (`html[data-bewegung="ruhig"]`, ohne `k-bewegung`) gibt es keinen Eingang, sofort den Endzustand.
  - Neue Startzustände hängen an `html.k-bewegung:not(.k-notaus)`.
  - Neue Regeln unter `prefers-reduced-motion: no-preference` ohne `k-bewegung` brauchen einen Spiegel im Block „Bewegungsschalter“ am Ende von `bewegung.css`. Der Test `test/bewegungsschalter.test.mjs` prüft das.
  - Zustand nur über `src/lib/motion/schalter.ts`, Zeitsteuerung im Skript nur über `src/lib/motion/takt.ts`, kein eigenes `requestAnimationFrame`.
- **Animiert werden nur transform/translate/scale, opacity und clip-path als Maske.** Keine Lage- oder Größenänderung im Endzustand gegenüber heute, keine Layoutverschiebung (CLS 0).
  - Das LCP-Foto startet nie mit opacity 0 oder verdeckt.
  - Die H1 bleibt als Text im DOM lesbar (Screenreader, ohne JavaScript).
  - Ohne JavaScript, im Druck und bei erzwungenen Farben gilt der Endzustand.
- **Dauern und Kurven nur über Tokens** (`--dauer-*`, `--ease-*`, `--staffel`, KERN K-005). Keine Zahlenwerte in CSS-Dauern, `werte.mjs` muss 0 Befunde zeigen.
- **Unantastbar (G8):** Logo-Datei, Wortlaut der H1 (A-1/A-2), Firmendaten, Formulare und Einwilligung. Du änderst nur die Darstellung des Eingangs.
- **Register:** Neue Kennungen in `src/lib/motion/register.ts` und `_werkstatt/register.json` eintragen. `intro` und `startbild` bleiben als Alias, Test `test/bewegung.test.mjs` anpassen. Kennungen nur entfernen, wenn der Test es erlaubt, sonst als Alias führen.
- **Tests:** `test/intro.test.mjs` auf den neuen Eingang umstellen: Dauer ≤ 1,5 s, Zeitlimit 2 s, Wiederkehr kürzer, kein Startzustand für das LCP-Foto, Abbruch durch Eingabe. Kopfskript-Tests in `test/bewegung.test.mjs` und `test/bewegungsschalter.test.mjs` müssen grün bleiben. Kein Test wird gelockert (G7).
- **Leistung (Z-10):** kein zusätzliches JavaScript im ersten Laden über wenige hundert Byte. Der Eingang läuft als CSS ab dem ersten Bild; das Kopfskript setzt nur Klassen.

## Dateien (PLAN)
`src/components/intro/Intro.tsx`, `src/lib/intro/ablauf.ts`, `src/components/start/Startbild.tsx`, `src/lib/motion/startbild.ts`, `src/components/vorlagen/teile/Einstieg.tsx`, `EinstiegMitte.tsx`, `EinstiegPlanblatt.tsx`, `src/app/bewegung.css`, `test/intro.test.mjs`. Dazu bei Bedarf: `src/lib/motion/kopfskript.ts`, `src/lib/motion/register.ts`, `_werkstatt/register.json`, `test/bewegung.test.mjs`, `src/components/common/Header.jsx` (Logo-Aufbau) und `src/app/(bestand)/_dokument.tsx` (Einbindung der Intro-Schicht und des Zielskripts `INTRO_ZIEL`, das entfallen kann).

## Rückgabe
Am Ende drei Zeilen:
- Ergebnis mit Prüfzahlen (`npm test`, tsc, eslint, werte)
- Pfad des Diffs und Liste der Dateien
- Offene Fragen an den Orchestrator
