# Seitenregeln · Vereinheitlichung (E-037/E-038) · gelten für jeden Seitenauftrag S-xx und Q-xx

Lies diese Datei ganz, dann deinen Auftrag. Bei Widerspruch gilt dein Auftrag, bei Zweifel: OFFENE FRAGE statt raten.

## Ziel
Jede Unterseite bekommt die Gestaltung der **live laufenden Startseite** `/` (Erzählansicht) bzw. von `/kontakt`
(Arbeitsansicht). Gleiche Inhalte, gleiche Funktionen, neues Gewand im Gestaltungssystem **KERN v2**.
Am Ende soll sich die Seite anfühlen, als käme sie aus demselben Guss wie die Startseite: Fugenraster statt Karten,
Mono-Etiketten, Archivo-Überschriften, Kalk/Fliese/Tinte, genau ein Rot je Bildschirm, keine Effekte.

## Pflichtlektüre (vor der ersten Zeile Code)
1. `_werkstatt/KERN.md`: K-004 (Stack, Konventionen), K-005 (Tokens), K-006 (Typografie, Komposition), K-007 (Bewegung,
   Register), K-009 (Bausteine, Zustände, Ansichtsarten). Die Prozessteile (Rollen, Wellen) brauchst du nicht.
2. Referenzseiten, so wie sie live laufen:
   - Erzählansicht: `src/app/(bestand)/page.tsx` mit `src/components/start/*.tsx`
   - Arbeitsansicht: `src/app/(bestand)/kontakt/page.jsx`
3. Bausteine (Stil verbindlich, flach): `src/components/kern/*.tsx` – vor allem `Einstieg`, `Abschnitt`, `Knopf`,
   `Feldraster`, `Merkliste`, `Kennwerte`, `Schriftfeld`, `Schrittfolge`, `Tabelle`, `Bildfeld`, `Hinweis`, `Fugenkreuz`,
   `Verlegeplan` – und die Klassen in `src/components/kern/stile.ts` (`knopfKlassen`, `etikettKlassen`, `linkKlassen`,
   `seitenKlassen`, `feldKlassen`, `labelKlassen`, `wahlKlassen` …). Icons: `@/components/icons/Icon` (Namen in
   `src/components/icons/namen.ts`), WhatsApp-Zeichen: `@/components/ui/WhatsAppLogo`.
4. Übersetzungsblatt `_werkstatt/pakete/FUSION-UEBERSETZUNG.md` (Werte- und Bausteintabelle). Es ist für die Kern-Klassen
   `k-*` geschrieben; dieselben Regeln gelten für das Altsystem des Bestands (siehe „Verboten“).
5. Next.js 16: vor jeder API-Nutzung die passende Seite unter `node_modules/next/dist/docs/` lesen (z. B. `next/image`:
   `preload` statt `priority`, `sizes` immer, Qualität nur 75).

## Ruhende Entwürfe (abgebaut) und Datenmodule
Die ruhenden Entwürfe der Relaunch-Sitzung im Klassensystem `k-*` (früher `src/app/(kern)/_entwurf/…`,
`src/components/kern/{basis,einwilligung,formulare,fuss,icons,kopf-b,motive,schale,seiten,start,vorlagen}/…`, `src/lib/kern/…`,
`src/styles/…`) sind abgebaut (E6-ORCH-01, Schritte 5–7: 81d3016, 51f2cad, 2026cd2). Vorlage sind allein die
Referenzseiten oben; lebende Bausteine liegen flach in `src/components/kern/*.tsx` und `src/components/kern/stile.ts`.
Importe aus den abgebauten Pfaden (`@/app/(kern)/…`, `@/lib/kern/…`, `@/styles/…`, `@/components/kern/<unterordner>/…`)
gibt es nicht mehr. Den alten Stand nur lesen, wenn dein Auftrag es ausdrücklich verlangt (`git show 81d3016~1:<pfad>`),
nie wiederherstellen. Reine Daten-/Logikmodule ohne Klassen: `@/lib/start/daten` (Startseiten-Daten),
`@/lib/formulare/*`, `@/lib/maps/*`, `@/config/*`, `@/lib/schema`, `@/lib/metadata`.

## Unantastbar
- **Wortlaut** aller Überschriften (H1–H6), Fließtexte, Knopf- und Linktexte, Etiketten, Listen, Zitate; jedes `href`.
  Nichts weglassen, nichts umformulieren, nichts erfinden. Reihenfolge von Abschnitten darf sich ändern, wenn die
  Komposition es verlangt (in der Rückgabe begründen); Doppelungen nur, wo der Bestand sie hat.
- **Metadaten** (`layout.tsx` der Route, `metadata`-Exporte) und **JSON-LD**: unverändert (Objekt und Reihenfolge der
  Schlüssel gleich).
- **IDs und Anker**, die es heute gibt (Sprungziele, `aria-labelledby`-Ziele, Test-Selektoren). Neue IDs sind erlaubt.
- Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligung), `src/config/*`,
  Hooks in `src/lib/formulare/*` (nur nutzen).
- **Mikrotexte** (aria-label, alt, title, placeholder, Zustandsmeldungen) nur ändern, wenn es der Barrierefreiheit dient;
  dann jede Änderung „alt → neu“ mit Grund in der Rückgabe (Abschnitt MIKROTEXTE). Ein bisher unsichtbarer Name, der jetzt
  als sichtbare Beschriftung erscheint, ist erlaubt.
- Vorschläge für bessere Texte nur in der Rückgabe (Abschnitt TEXTVORSCHLÄGE), nie im Code.

## Gestaltung (KERN v2, prüfbar)
- Nur Tokens: Farben `kalk fliese fuge strich tinte-2 tinte laser laser-tief abnahme nacht-2 nacht-fuge` (+ `white`,
  `transparent`, `current`); Schrift `text-fs-1 … text-fs-7`, `font-anzeige|font-text|font-mono`; Abstände nur Stufen
  `0 px 1 2 3 4 6 8 12 16 24 32`; Breiten `max-w-seite`, `max-w-mass`, `max-w-md`, Brüche; Radien `rounded-none`/`rounded-r1`;
  Schatten nur `shadow-fuge`; Ebenen `z-0 z-10 z-30 z-40 z-50`; Dauern `dauer-1…5`, Kurven `ease-setzen|laser|weg|linear`.
- **Verboten:** Beliebigwerte `[…]`, Tailwind-Standardfarben (`slate-*`, `neutral-*`, `orange-*`, `amber-*`, `gray-*` …),
  Hex/rgb im Code, Verläufe, Unschärfe, Glas, Glühen, Schatten-Tiefe, `hover:-translate-*`/`scale` beim Hover,
  `rounded-xl/2xl/full/tile-*`, `line-clamp` ohne Grund, `uppercase tracking-*`-Etiketten, Emojis;
  Altklassen `glass-* ambient-* ceramic-* eyebrow* btn-primary btn-ghost icon-chip text-ceramic-gradient glass-button-*`;
  Importe aus `lucide-react`, `framer-motion`, `@phosphor-icons/*`.
- Inline-`style` nur zum Setzen von CSS-Variablen.
- **Komposition** wie die Referenz:
  - Erzählansicht: `Einstieg` (art „erzaehl“, H1 `text-fs-7` links bündig an der Laserachse, Etikett, Vorspann, Aktionen,
    Randspalte), danach Abschnitte, die in Struktur und Dichte wechseln (Feldraster ↔ Text an der Fuge ↔ Zeitleiste ↔ Plan),
    Flächen `kalk`/`fliese` im Wechsel, genau **ein großer Moment** je Seite (nur wo der Auftrag ihn nennt).
  - Arbeitsansicht: `Einstieg` art „arbeit“ (H1 `text-fs-6`), Formular bzw. Liste im ersten Bildschirm, Abschnitte
    `art="arbeit"`, nur Rückmeldung und Zustandswechsel als Bewegung.
  - Abschnittsköpfe über `Abschnitt` (Etikett in Mono mit Fugenkreuz, H2 `text-fs-6`) oder gleichwertig von Hand.
  - Felder statt Karten: Raster mit 1-px-Fugen (`gap-px bg-fuge border border-fuge` bzw. `border-t border-l` + Felder
    `border-r border-b`), Felder `bg-fliese`/`bg-kalk`, kein Abheben.
  - Knöpfe nur über `Knopf` bzw. `knopfKlassen` (Hauptknopf Tinte, Nebenknopf Strich-Rahmen, Textlink). Je Bildschirm
    ein Hauptknopf.
  - Höchstens **ein rotes Element je Bildschirmhöhe** (Laserachse zählt).
  - Mobil (375/390): eigene sinnvolle Reihenfolge, nichts läuft über, Touch-Ziele ≥ 44 px (`min-h-11`), keine
    Wortbrüche in Überschriften (lange Komposita: Spaltenbreite oder Satz anpassen, nicht den Text).
- **Bewegung** nur über das Register (`src/lib/motion/register.ts`, `src/app/bewegung.css`): `auftritt` (höchstens jeder
  zweite Abschnitt), `druck` (trägt `Knopf` selbst), `zustand` (jedes Element mit `transition-*`, z. B. Farbwechsel von
  Links). Keine eigenen Keyframes, keine neuen Kennungen. Ohne JS und bei reduzierter Bewegung ist alles sofort sichtbar.
- **Server zuerst:** Seiten und Abschnitte ohne Zustand sind Serverkomponenten. `'use client'` nur auf Inseln mit
  Zustand (Filter, Formulare). Bestandskomponenten, die schon Client sind (Formulare), unverändert einbinden.

## Grenzen
- Repository `/home/user/tezgel`, Branch `main`. Git nur lesend (`status`, `diff`, `log`, `show`). Kein Commit.
- Nur die Dateien deiner **Schreibrechte** anlegen/ändern. Gemeinsame Dateien (`src/app/globals.css`,
  `src/app/bewegung.css`, Layouts außerhalb deiner Route, `next.config.ts`, `package.json`, `src/config/*`,
  `src/components/kern/*`, `src/components/start/*`, Tests, Werkzeuge) nie ändern – Bedarf als exakte Liste unter
  GEMEINSAME DATEIEN melden. Fehler in fremden Dateien melden, nicht beheben.
- Kein `npm install`, kein `next build`/`npm run build` im Repo, keine Server starten oder stoppen.
  Server: **Entwicklung http://127.0.0.1:4350** (Arbeitsbaum, zeigt deine Änderungen nach dem Speichern),
  **Live-Stand http://127.0.0.1:4337** (Build von c27fc77 = www.tezgel.de, Vergleichsbasis). Nicht erreichbar → melden.
- Keine `.env*`-Dateien lesen/anlegen. Keine POST-Anfragen, keine echten Formularsendungen. Browser nur über die
  Werkzeuge unten (Anfragesperre aus `lib.mjs`).
- Hilfsdateien nur in `/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad/<Kennung>/`.

## Prüfen (Pflicht, Ergebnisse wörtlich in die Rückgabe)
Umgebung: `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad`
1. Typen: `cd /home/user/tezgel && flock $RELAUNCH_SCRATCH/tsc.lock npx tsc --noEmit -p .` → 0 Fehler in deinen Dateien.
2. Lint: `npx eslint <deine Dateien>` → 0 Fehler, 0 Warnungen.
3. Werte: `node _werkstatt/werkzeuge/werte.mjs --dateien <deine Dateien, kommagetrennt>` → Exit 0 (0 Befunde).
4. Altsystem: `grep -nE "lucide-react|framer-motion|@phosphor|glass-|ambient-|ceramic-|eyebrow|btn-primary|btn-ghost|icon-chip|gradient|backdrop|blur|shadow-\[|rounded-(sm|md|lg|xl|2xl|3xl|full|tile)|(slate|neutral|orange|amber|gray|red|zinc|stone)-[0-9]" <deine Dateien>` → keine Treffer.
5. Texttreue gegen Live: `RELAUNCH_BASE=http://127.0.0.1:4337 node _relaunch/werkzeuge/texte.mjs --satz <kennung>-vorher --seiten <pfade>`,
   dann dasselbe mit `RELAUNCH_BASE=http://127.0.0.1:4350` und `--satz <kennung>-nachher`, dann
   `node _relaunch/werkzeuge/texte-vergleich.mjs <kennung>-vorher <kennung>-nachher` → keine entfernte Textzeile außer
   begründeten Mikrotexten; Metadaten und JSON-LD gleich.
6. Bilder: `node _werkstatt/werkzeuge/einzelbild.mjs --base http://127.0.0.1:4350 --seite <pfad> --ansichten m390,t768,d1440 --voll --ziel $RELAUNCH_SCRATCH/<kennung>/bilder`
   → alle 200, `ueberlauf` leer, `ueberlappung` 0. **Sieh dir jedes Bild selbst an** (Read-Werkzeug) und vergleiche mit
   der Startseite (`--seite /`): Wirkt die Seite wie aus einem Guss? Beschreibe in der Rückgabe in 3–5 Sätzen, was du
   siehst, und was dich noch stört.
7. Wortbruch: `node _relaunch/werkzeuge/wortbruch.mjs --base http://127.0.0.1:4350 --seiten <pfade>` → 0.
8. Funktionstests, die deine Seite berühren (Auftrag nennt sie): `cd /home/user/tezgel/_relaunch/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4350 npx playwright test tests/<spec> --reporter=line`
   → grün (Dev-Server ist langsamer: bei Zeitüberschreitung einmal wiederholen und das melden).
9. `git status --porcelain` zeigt nur Dateien aus deinen Schreibrechten (plus `CLAUDE.md`, die gehört nicht dir).

## Rückgabe `_relaunch/pakete/<Kennung>.rueckgabe.md` (höchstens 700 Wörter) und als letzte Antwort
GEÄNDERTE DATEIEN · KOMPOSITION (Abschnittsfolge, Ansichtsart, großer Moment, Flächenwechsel) · WAS UND WARUM ·
MIKROTEXTE (alt → neu, Grund) · GEMEINSAME DATEIEN (gewünschte Änderungen) · PRÜFUNG UND ERGEBNIS (1–9 wörtlich) ·
BILDBELEGE (Pfade + eigene Sichtung) · TEXTVORSCHLÄGE · OFFENE FRAGEN

## Ablage
Bilder und andere große Belege (JPG/PNG, Spuren) nur im Scratchpad `…/scratchpad/<kennung>/`, nie unter `_relaunch/belege/` – dort nur JSON/Text (≤ 200 KB je Datei). Pfade in der Rückgabe nennen.
