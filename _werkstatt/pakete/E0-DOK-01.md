E0-DOK-01 · Dokumentar · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Vorher-Bildsatz der 12 Hauptansichten (Basisstand 745335f) komprimiert ins Repo, mit Index
Schreibrechte (exakt): `_werkstatt/bilder/e0/** (neu)`, `_werkstatt/pakete/E0-DOK-01.rueckgabe.md`, dazu die Rückgabe `_werkstatt/pakete/E0-DOK-01.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Dokumentar
Du pflegst Bildsätze, Galerie und Berichte. Häufige Fehler: Behauptung ohne Belegpfad; Fachjargon; veraltete Zahlen.

## Aufgabe in einem Satz
Lege aus dem vorhandenen Bildsatz des Basisstands eine kompakte, vollständige Vorher-Auswahl aller 12 Hauptansichten in drei Größen ins Repo, so dass jede Ansicht später neben dem Nachher-Stand gezeigt werden kann.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## K-004 Stack und Konventionen
- Next.js 16.3.6 (App Router, statisch vorgerendert, Turbopack), React 19, Tailwind 4.3, TypeScript strict mit `allowJs` (Seiten überwiegend `.jsx`). Nur Deutsch (`lang="de"`), kein Dunkelmodus (`color-scheme: light`). Vor jeder API-Nutzung die passende Seite in `node_modules/next/dist/docs/` lesen (AGENTS.md).
- Struktur: Seiten `src/app/**/page.(jsx|tsx)`; Komponenten nach Bereich `src/components/<bereich>/`; neue Gestaltungsbausteine `src/components/kern/`; Icons `src/components/icons/` (je Icon eine SVG-Datei unter `src/components/icons/svg/`, erzeugtes Sprite `sprite.svg`, Komponente `Icon.tsx`); Bewegung `src/lib/motion/`; Pläne `src/lib/plaene/` (Planvorgaben als Daten). Inhalte und Daten `src/config/*` (u. a. `company.js` = COMPANY_DATA, `services.js`, `cities.ts`, `reviews.js`, `navigation.js`) – Telefon, Adresse und Öffnungszeiten nur aus COMPANY_DATA.
- Styling: Tailwind-Utilities über die Tokens aus K-005 (`@theme static` in `src/app/globals.css`, einzige Quelle). Keine Beliebigwerte (`p-[13px]`), keine Hex-/rgb-Werte im Code, kein Inline-`style` außer dem Setzen von CSS-Variablen (`style={{ '--plan-spalten': 6 }}`), keine Dauern als Zahl. Komponentenklassen nur in `globals.css` (`@layer components`) und nur, wenn ein Muster ≥ 3-mal vorkommt.
- Alt-System (bis zum Abbau in E6): `src/styles/tokens.css` liegt als `layer(alt)` unter dem Theme; alte Klassen (`btn-primary`, `btn-ghost`, `eyebrow*`, `glass-*`, `ambient-*`, `ceramic-*`, `icon-chip`, `text-ceramic-gradient`) sind Aliasse und werden nur entfernt, wenn die Suche über `src/`, `src/lib/email`, Tests und Analyse-Konfiguration null Nutzungen zeigt. Wirkungslose Klassen (`rounded-tile-*`, `eyebrow-orange`, `eyebrow-sky`, `ambient-glow-warm`, `shadow-tile`, `via-neutral-850`) werden in jeder berührten Datei entfernt, nie definiert.
- Schriften: `next/font/local` mit wörtlichen Pfaden unter `src/app/fonts/`, `adjustFontFallback: false`, eigene Ersatzschriften mit Metrik-Anpassung (K-006), nur Archivo vorgeladen. Variablen `--font-archivo`, `--font-plex-mono` an `<html>`.
- Bilder: `next/image`, `preload` nur für ein tatsächliches LCP-Bild (Standard: kein Bild ist LCP), `sizes` immer gesetzt, Qualität aus `images.qualities` ([75]), Seitenverhältnis der Datei.
- Client-Komponenten (`'use client'`) nur für Interaktion; Inhalte rendern auf dem Server und sind ohne JavaScript sichtbar. Provider nur dort, wo sie gebraucht werden (E-010).
- Bewegung: zentral `src/lib/motion/` (K-007). Startklasse per Inline-Skript im `<head>`, `<html suppressHydrationWarning>`. Keine Erkennung von Testumgebungen (kein `navigator.webdriver`, keine Sonderwege für Lighthouse oder Headless).
- Seitenwechsel: React `<ViewTransition>` (ohne Konfiguration im App Router), `Link` mit `transitionTypes={['nav-forward']}` für Vorwärts-Navigation zum Plan; Kopf mit `viewTransitionName: 'kopf'` verankert; `::view-transition { pointer-events: none }`.
- Wege: Weiterleitungen über `redirects()` in `next.config.ts` (308); 404 über `not-found.tsx` mit Status 404. Adressen bleiben erhalten.
- Vor dem Umbenennen/Entfernen von Klassen, IDs, `data-*`: Suche im ganzen Projekt einschließlich `src/lib/email`, `_werkstatt/werkzeuge/tests`, `TrackingScripts`, `cookie-inventory.ts`; Funde bleiben als Alias. Getestete Selektoren und Namen: `berichte/E0-KUN-05-qualitaet.md` Abschnitt 2 – bleiben exakt.
- Prüfen: `npm run build`, `typecheck`, `lint`, `npm test` (Node ≥ 22.6), `qa:graph`; Werkzeuge in `_werkstatt/werkzeuge` (EINRICHTUNG.md). Je Paket Prüfstufe A über `pruefe-a.sh`.

## Maßstab
- Quelle: `_werkstatt/cache/bildsatz/e0/<m390|t768|d1440>/<slug>/NN.jpg` und Index `_werkstatt/belege/e0/ausgang/bildsatz.json` (Aufnahmeprotokoll, Positionen, Seitenhöhe). Hauptansichten: `_werkstatt/HAUPTANSICHTEN.json`.
- Messprotokoll: `_werkstatt/ABNAHME.md` (Bildsätze: Einwilligung abgelehnt, reduzierte Bewegung, DPR 1, feste Scrollpositionen).

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Keine neuen Aufnahmen, kein Browserlauf: nur vorhandene Bilder auswählen, verkleinern, komprimieren. Python mit Pillow (`python3 -I`, System-Python) im Scratch-Skript.
- Gesamtgröße `_werkstatt/bilder/e0/` ≤ 12 MB; Breite ≤ 1440 px (Geräte m390 und t768 behalten ihre Breite); JPEG Qualität 60, progressiv, ohne Metadaten.
- Keine Bilder verändern außer Größe/Kompression (kein Zuschnitt, keine Markierungen).

## Schritte
1. Lies `bildsatz.json` und ermittle je Hauptansicht × Gerät die vorhandenen Ausschnitte (NN.jpg) und die Seitenhöhe.
2. Auswahl je Hauptansicht × Gerät: höchstens 8 Ausschnitte – immer 00 (erster Bildschirm) und der letzte (Fuß); dazwischen gleichmäßig verteilt (Formel und Auswahl je Ansicht in der Rückgabe). Bei ≤ 8 vorhandenen Ausschnitten alle.
3. Ablage: `_werkstatt/bilder/e0/<slug>/<geraet>-NN.jpg` (slug wie im Bildsatz; `/` = `start`). Verkleinern nur, wo breiter als 1440 px.
4. Index `_werkstatt/bilder/e0/index.json`: je Datei Ansicht, Gerät, Ausschnitt-Nr., Scrollposition (aus bildsatz.json), Breite × Höhe, Bytes, Quelle (Pfad im Cache), Messstand `745335f`. Dazu `_werkstatt/bilder/e0/LIESMICH.md` (5–10 Zeilen, ohne Fachjargon): was die Bilder zeigen, Aufnahmebedingungen, wie die Dateien benannt sind.
5. Prüfe: jede der 12 Hauptansichten hat in jedem der 3 Geräte mindestens den ersten Bildschirm und den Fuß; Summe ≤ 12 MB; jedes Bild öffnet fehlerfrei (Pillow `verify`).

## Schnellprüfung und Selbstprüfung
- `git status --porcelain` zeigt nur `_werkstatt/bilder/e0/**` und deine Rückgabe; `du -sh _werkstatt/bilder/e0` ≤ 12 MB.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Zählung: Ansichten 12 von 12, Geräte 3 von 3 je Ansicht, Bilder gesamt und Bytes gesamt in der Rückgabe; Stichprobe von 6 Bildern selbst angesehen (je Gerät 2) und in der Rückgabe benannt.

## Ausgabeformular
In `_werkstatt/pakete/E0-DOK-01.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E0-DOK-01 · BEREIT ZUR RÜCKGABE ===
