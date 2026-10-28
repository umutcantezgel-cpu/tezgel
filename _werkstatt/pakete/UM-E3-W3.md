# UM-E3-W3 · Gemeinsames Briefing für UM-E3-CURSOR, UM-E3-SCROLL, UM-E3-LEIT, UM-E3-REG · Kern-Version 4.3

Auftraggeber am 28.10.2026: „finalisiere alles“, also alle Pakete bis zur Endabnahme. Die vier Pakete laufen nacheinander in **einer** fortlaufenden Arbeitskopie. Jedes Paket baut auf dem Stand des vorigen auf.

## Inhalt je Paket
- Was zu tun ist, steht in der PLAN-Zeile des Pakets (`/home/user/tezgel/_werkstatt/PLAN.md`): Beschreibung, Dateien, Kriterium.
- Dazu gelten:
  - KERN 4.3 (`_werkstatt/KERN.md`): K-007, K-008, K-010, Abschnitt „Regeln v4“;
  - die Entscheidungen E-067 (Teile 1 bis 5), E-078, E-080, E-081 und E-082 in `_werkstatt/ENTSCHEIDUNGEN.md`;
  - AUFTRAG Abschnitt 8 (Bewegung, Scrollen, Cursor) in `_werkstatt/AUFTRAG.md`.
- Bestehende Bausteine wiederverwenden:
  - `src/lib/motion/schalter.ts`: `zeigerFein()`, `bewegungRuhig()`, `abonniereBewegung()`;
  - `src/lib/motion/takt.ts`: `imTakt`, `naechstesBild`, `wiederhole`;
  - `src/lib/motion/register.ts`;
  - `src/components/kern/stile.ts`;
  - Tokens in `src/app/globals.css`.

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/w3/baum`. Das ist ein Abzug von HEAD mit verlinkten `node_modules`.
- Vor dem ersten Edit eines Pakets legst du den Stand ab: `rsync -a --exclude node_modules …/w3/baum/ …/w3/vor-<PAKET>/`.
- Am Ende des Pakets: `cd …/w3 && diff -ruN --exclude=node_modules --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor-<PAKET> baum > <PAKET>.diff`.
- Dazu die Notiz `…/w3/<PAKET>.notiz.md` mit Entwurf, Entscheidungen, offenen Fragen und Prüfzahlen. Diese Datei gehört zu deinem Auftrag.
- Das Repository `/home/user/tezgel` liest du nur. Kein Git mit Schreibwirkung, kein Commit, kein Push.
- Kein Browser und kein Server. Messen, Bildfolgen und Funktionssuite macht der Orchestrator in Stufe A.
- Prüfen in der Arbeitskopie mit `export PATH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/node-lts/aktuell/bin:$PATH`:
  - `npm test`
  - `npx eslint <geänderte Dateien>`
  - `node _werkstatt/werkzeuge/werte.mjs --arbeitsbaum --dateien <geänderte Dateien>`
  - Für `npx tsc --noEmit -p .` vorübergehend `printf '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n' > next-env.d.ts` anlegen und danach wieder löschen.
- Neue Tests gehören dem Paket, wenn die PLAN-Zeile sie nennt (`test/<name>.test.mjs`, in das Skript `test` von `package.json` eintragen). Kein Test wird gelockert (G7).

## Leitplanken
- **B-01 eingefroren (E-078):** `src/components/verlegen/**` und die Verlegen-Regeln in `bewegung.css` nicht anfassen.
- **Bewegungsschalter (E-080):** Bei reduzierter Bewegung oder „ruhig“ gibt es keine Bewegung, keinen Cursor-Nachlauf, kein Parallax und kein Autoplay.
  - Neue Startzustände hängen an `html.k-bewegung:not(.k-notaus)`.
  - Regeln an der Medienabfrage brauchen einen Spiegel. Die Wächtertests in `test/bewegungsschalter.test.mjs` bleiben grün.
- **Skript-Animationen** nur über `takt.ts`, kein eigenes `requestAnimationFrame`. Listener passiv. Keine Scroll-Ereignisse für Effekte; scrollgebunden nur über `animation-timeline`, mit IntersectionObserver als Rückfall.
- **Animiert** werden nur transform/translate/scale/opacity, clip-path nur als Maske. Keine Lage- oder Größenänderung im Endzustand, CLS 0. Ohne JavaScript, im Druck und bei erzwungenen Farben gilt der Endzustand.
- **Dauern, Kurven und Farben** nur über Tokens. `werte.mjs` muss 0 Befunde zeigen.
- **Unantastbar (G8):** Logo, Rechtstexte, Firmendaten, Cookie-Einwilligung, Adressen, Formulare und `/api/anfrage`, Wortlaut der Kundenstimmen, H1 A-1/A-2.
- **Zugänglichkeit:** Fokus sichtbar mit 3:1. Der Cursor ersetzt nie den Systemzeiger für Tastatur und Touch; er ist nur Zusatz bei feinem Zeiger und blendet bei Tastaturbedienung, beim Verlassen des Fensters und in erzwungenen Farben aus (KERN „Regeln v4“).
- **Leistung (Z-10):** so wenig JavaScript im ersten Laden wie möglich. Den Cursor lädst du erst nach der Hydrierung und nur bei feinem Zeiger, zum Beispiel per dynamischem Import.

## Rückgabe je Paket
- Prüfzahlen (npm test, tsc, eslint, werte)
- Pfad des Diffs und Liste der Dateien
- offene Fragen
