E4-NACH-06 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Tempo-Diagnose: Bündelanalyse des Produktionsbuilds 3b10790 – welche Client-Skripte die 12 Hauptansichten früh laden und woraus die großen gemeinsamen Pakete bestehen
Schreibrechte (exakt): `_werkstatt/belege/e4-nach/tempo/**`, dazu die Rückgabe `_werkstatt/pakete/E4-NACH-06.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Liefere belegte Zahlen, woraus die rund 220–380 KB (übertragen) Client-JavaScript je Hauptansicht bestehen – nur messen und berichten, nichts am Projekt ändern.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
(K-013 nicht gefunden in KERN.md)

## Maßstab
- Ausgangslage (Lighthouse e3-tor, Rohberichte unter `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/werkstatt-cache/lighthouse/e3-tor/*-mobil-1.report.json`): größtes Paket `075_81sg-x3zl.js` mit 430–850 ms Skriptzeit (gedrosselt), daneben `2e_lrwr-bf1eq.js` und `turbopack-*.js`; Skript übertragen: / 263 KB, /blog 378 KB, /fliesen 292 KB.
- Werkzeug: Next.js Bundle Analyzer für Turbopack (`npx next experimental-analyze --output`, Doku `node_modules/next/dist/docs/01-app/02-guides/package-bundling.md`) – schreibt nach `.next/diagnostics/analyze`. Nur in einem frischen Reinraum-Ordner im Scratchpad ausführen (Muster `bash _werkstatt/werkzeuge/reinraum.sh 3b10790` erzeugt `scratchpad/reinraum-3b10790` mit `npm ci`; danach dort den Analyzer), nie im Arbeitsbaum `/home/user/tezgel`.
- Ermittle je Hauptansicht (Liste `_werkstatt/HAUPTANSICHTEN.json`): die Client-Chunks der Erstladung mit Größe roh/gzip; je Chunk die zehn größten Module (Pfad, Größe) – besonders für die gemeinsamen Pakete; alle Module mit `"use client"` aus `src/` mit Größe und den Routen, die sie laden; Bibliotheken aus `node_modules` im Client mit Größe (u. a. react-dom, next, framer-motion, lucide-react, @phosphor-icons/react, zod, clsx, date-fns – soweit vorhanden).
- Gegenprobe ohne Analyzer, falls er scheitert: `.next/static/chunks/*.js` Größen roh/gzip und Zuordnung über `.next/server/app/**/page_client-reference-manifest.js` bzw. `app-build-manifest.json`; in der Rückgabe sagen, welcher Weg gegangen wurde.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/(bestand)/layout.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Kein Eingriff in `/home/user/tezgel` außer dem Belegordner `_werkstatt/belege/e4-nach/tempo/`; kein Server-Start auf 4310/4320; Build nur im Reinraum-Ordner.
- Keine Deutung über die Zahlen hinaus; Empfehlungen höchstens als „auffällig“ markieren.

## Schritte
1. 1. Reinraum für 3b10790 im Scratchpad (`reinraum.sh` liefert Build und Prüfungen; ist der Ordner schon vorhanden und grün, wiederverwenden).
2. 2. Analyzer mit `--output` im Reinraum-Ordner; Ausgabe nach `_werkstatt/belege/e4-nach/tempo/analyze/` kopieren nur, wenn kleiner als 5 MB, sonst im Scratchpad lassen und den Pfad nennen.
3. 3. Auswertung per Skript (im Scratch-Ordner) in `_werkstatt/belege/e4-nach/tempo/BUENDEL.json` und eine kurze Tabelle `BUENDEL.md` (je Route: Chunks und Summe gzip; Top-Module der gemeinsamen Pakete; Client-Module aus src mit Größe und Routen; Bibliotheken).
4. 4. Rückgabe: die Tabellen und Pfade; Selbstprüfung mit zwei nachgerechneten Summen.

## Schnellprüfung und Selbstprüfung
- Jedes neue oder geänderte Werkzeug einmal gegen eine echte Ansicht ausführen (Beleg: Ausgabepfad), `node --check` bzw. `bash -n` grün.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Summe gzip je Route weicht von der übertragenen Skriptmenge der Lighthouse-Rohberichte höchstens um 15 % ab (sonst Grund nennen).

## Ausgabeformular
In `_werkstatt/pakete/E4-NACH-06.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E4-NACH-06 · BEREIT ZUR RÜCKGABE ===
