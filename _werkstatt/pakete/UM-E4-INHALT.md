# UM-E4-INHALT · EP1 bis EP4, VIDEO, FS-FUGEN · Rolle Baumeister (Arbeitskopie) · Modell Opus · Kern-Version 4.4

Gilt für zwei Teile: Teil A (EP1, EP2, EP3; erledigt, E-094) und Teil B (EP4, VIDEO, FS-FUGEN). Teil B läuft in einer neuen Arbeitskopie von HEAD (`…/inhalt/baum-b`, Vergleich `…/inhalt/vor-B`), Server auf Port 4430, Prüfer 4431 und 4432; wo unten `baum` steht, gilt für Teil B `baum-b`. Die PLAN-Zeilen in `_werkstatt/PLAN.md` (UM-E4-EP1 bis EP4, VIDEO, FS-FUGEN) nennen Ziel und Dateien; lies sie.

## Teil A · Rückführungen (Muss, UM-5)
- **EP1 · `/balkon-terrasse`:** Vergleich der Aufbauten.
  - Das Wesen des alten Abschnitts in neuer Form als Vorlagen-Teil `Vergleich.tsx` (Tokens, Planzeichnung im Stil der Plan-Vignetten erlaubt, keine neue Bibliothek).
  - Wortlaut aus der Quelle vor dem Relaunch: in der Git-Geschichte suchen (`git log -S`, frühe Fassungen von `src/app/(bestand)/balkon-terrasse/**`, Archiv unter `_werkstatt/archiv/`); Fundstelle mit Commit in die Notiz.
  - Die Brotkrumen der Unterseiten bleiben gültig.
- **EP2 · `/ueber-uns`:** Werte-Block mit Vertrauensliste (HWK, DIN) in `src/components/ueber-uns/Werte.tsx` und `src/inhalte/ueber-uns.ts`.
- **EP3 · Qualitätsversprechen** auf sechs Hauptansichten (`/bad/badsanierung`, `/fliesen`, `/balkon-terrasse`, `/ueber-uns`, `/standorte/[stadt]`, `/blog`).
  - Wortlaut aus `COMPANY_DATA.qualityPromises` (`src/config/company.js`, nur lesen).
  - Ein Vorlagen-Teil `Versprechen.tsx`, eingebunden über `inhalt.ts` der Vorlagen.
- **Garantie-Wörter** („Staubschutz-Garantie“, „Garantierter Standard“, „verbindlicher Festpreis“) erscheinen nicht, solange M-07 offen ist. Sinngleiche Formulierung ohne Garantie-Versprechen; Stellen in der Notiz nennen.
- **Gestaltung:** ein ruhiger, eigener Abschnitt je Inhalt, keine dritte gleichförmige Kartenreihe (K-003 Prinzip 4). Bewegung nur aus dem Register, mit Spiegeln. Die Lehre aus E-092 gilt: Animationen nur mit echter Änderung in den Keyframes.

## Teil B · Technik
- **EP4 · Service-Strukturdaten** (Soll, E-068): je Leistungsseite ein Knoten `Service` über die Ordner-Layouts wie in E0, ohne Doppelknoten auf Seiten mit eigenem Knoten.
  - Zielwert 113 Seiten mit Typ Service wie in E0; Zählung mit `_werkstatt/werkzeuge/jsonld.mjs`.
  - Muster: `buildServiceNode` in `src/lib/schema.ts`; keine erfundenen Werte (E-091).
- **VIDEO:** `src/app/video-sitemap.xml/route.ts` verweist auf eine fehlende Datei. Den Eintrag entfernen und mit Vermerk begründen (G4).
- **FS-FUGEN:** Trennfugen nach `_werkstatt/berichte/UM-E4-FS-K.md`, Nr. 5, 10, 11, 15 (b, c nur nach Messung bei 200 %), 16 und 17. Nr. 2, 6 und 12 (Tun, Ablauf, Stimmen) übernimmt UM-E4-START, damit die beiden Pakete keine Datei teilen; `Tun.tsx`, `Ablauf.tsx` und `Stimmen.tsx` fasst Teil B nicht an. `zusammen.tsx` teilen sich beide: Teil B ergänzt nur die Wörter seiner Nummern, am Ende der Liste `FUGEN`.
  - Wörter in `FUGEN` (`src/components/kern/zusammen.tsx`) und Einbindung über `mitFugen` an den genannten Stellen.
  - Nr. 15 (a) „Vakuumhebetechnik“ bleibt nach E-065 offen.

## Nicht ändern
- Wortlaut der Kundenstimmen, Einwilligung, Rechtstexte, Firmendaten, Formulare, H1 A-1/A-2 (G8).
- B-01 (E-078).
- `/` außer über gemeinsame Teile; dann ohne sichtbare Änderung an `/`.

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/inhalt/baum` (Abzug von HEAD, `node_modules` verlinkt).
- Vor dem ersten Edit eines Teils: `mkdir -p …/inhalt/vor-<TEIL> && (cd …/inhalt/baum && tar --exclude=./node_modules --exclude=./.next -cf - .) | (cd …/inhalt/vor-<TEIL> && tar -xf -)`.
- Am Ende eines Teils:
  - `cd …/inhalt && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor-<TEIL> baum > UM-E4-INHALT-<TEIL>.diff`
  - Notiz `UM-E4-INHALT-<TEIL>.notiz.md`.
- Bauen:
  - Eine echte Kopie `node_modules_echt` für Turbopack, danach Verweis zurück und `.next` löschen. Speicher ist knapp, unter 5 GB frei.
  - Server `npx next start -p 4400 -H 127.0.0.1`; Bilder als PNG mit `installSperre` und `setzeEinwilligung`.
  - Server per Prozessgruppe aus der eigenen PID-Datei beenden.
- Prüfen:
  - `npm test`
  - `npx eslint`
  - `werte.mjs --arbeitsbaum --dateien …` mit 0 Befunden
  - `npx tsc` mit vorübergehender `next-env.d.ts`
  - `jsonld.mjs` auf den betroffenen Seiten
  - `bewegung.mjs` register, reduziert und ruhig auf den betroffenen Seiten
- Das Repository liest du nur. Kein Git mit Schreibwirkung.

## Rückgabe je Teil
Prüfzahlen, Diff-Pfad und Dateien, je Paket umgesetzt wie, mit Bildpfad, offene Fragen.
