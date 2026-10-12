E0-PRUEF-03 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Ausgangswerte nach Prüfstufe B für die 12 Hauptansichten (Stand E0 = Commit 745335f auf 4310) plus Textbasis aller Prüfseiten
Schreibrechte (exakt): `_werkstatt/belege/e0/ausgang/** (Berichte, Zusammenfassungen, JSON-Ergebnisse – keine Rohbilder)`, `_werkstatt/belege/e0/texte/** (Textbasis für pruefe-a.sh und den späteren Text-/SEO-Vergleich)`, `_werkstatt/werkzeuge/axe.mjs (nur: Zustände auf m390 statt m375, Option --hauptansichten, Option --ziel)`, `_werkstatt/werkzeuge/bildsatz.mjs (nur: Option --ersatzpfad, siehe Schritt 7)`, `_werkstatt/pakete/E0-PRUEF-03.rueckgabe.md`, dazu die Rückgabe `_werkstatt/pakete/E0-PRUEF-03.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Erhebe die Ausgangswerte aller Kriterien Z-02 bis Z-09 für die 12 Hauptansichten auf dem Produktionsserver 4310 (Build des Commits 745335f) nach dem Messprotokoll in ABNAHME.md und lege die Textbasis aller 120 Prüfseiten an.

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
- Messprotokoll und Kriterien: `_werkstatt/ABNAHME.md` (Abschnitt Messprotokoll, Tabelle Z-01…Z-10, Abschnitt Ausgangswerte mit den Vorlaufwerten als Plausibilitätsrahmen).
- Hauptansichten: `_werkstatt/HAUPTANSICHTEN.json`; Prüfseiten-Grundmenge: `grundmenge()` in `_werkstatt/werkzeuge/lib.mjs`; Register: `_werkstatt/register.json`.
- Werkzeuge (alle mit Kopfkommentar zur Nutzung): `bildsatz.mjs`, `axe.mjs`, `lighthouse.mjs`, `texte.mjs`, `bewegung.mjs`, `svg.mjs`, `glyphen.mjs`, `einzelbild.mjs`, `lib.mjs`; Einrichtung `EINRICHTUNG.md`. Browser: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; Lighthouse: CHROME_PATH=/opt/pw-browsers/chromium (bzw. der Pfad aus EINRICHTUNG.md).

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Alle Läufe gegen http://127.0.0.1:4310 (Produktion, Stand 745335f) – nie gegen 4320. Prüfe vorher `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4310/` = 200; sonst OFFENE FRAGE und Abbruch.
- Rohbilder und Rohdaten nur unter `_werkstatt/cache/…` (liegt außerhalb des Repos); ins Repo (`belege/e0/…`) nur Zusammenfassungen und JSON-Ergebnisse ohne Bilder, Gesamtgröße ≤ 15 MB.
- Lighthouse nur in einem Ruhefenster: unmittelbar vor jeder Seite `cat /proc/loadavg` lesen; ist der 1-Minuten-Wert > 1,5, bis zu 10 Minuten in 30-Sekunden-Schritten warten (mit `timeout`/Schleife, nicht mit einzelnem langem sleep) und den Wert protokollieren. Während Lighthouse läuft startest du keinen anderen Browserlauf.
- Werkzeugänderungen nur im genannten Umfang; bestehendes Verhalten der Werkzeuge bleibt gleich (Standardwerte unverändert).

## Schritte
1. Vorbereitung: Ordner `_werkstatt/belege/e0/ausgang/` anlegen. 4310 prüfen (200 auf `/` und auf allen 12 Hauptansichten). `git log -1 --format=%h` notieren (Arbeitsbranch-Stand) und festhalten, dass 4310 den Build von 745335f ausliefert (`_werkstatt/werkzeuge/server.sh status`, nur lesen).
2. Textbasis (Z-02): `node _werkstatt/werkzeuge/texte.mjs --satz e0 --seiten <alle Pfade aus grundmenge()> --ansichten d1440,m390 --base http://127.0.0.1:4310 --ziel _werkstatt/belege/e0/texte`. Anzahl Seiten und Dateien notieren. Danach `pruefe-a.sh` nicht ausführen – nur prüfen, dass `_werkstatt/belege/e0/texte/texte-index.json` existiert und je Seite Einträge hat. Falls `texte-vergleich.mjs` eine andere Ordnerstruktur der Basis erwartet (siehe Kopfkommentar, `--vorher-ordner`), die Basis so anlegen, dass `pruefe-a.sh` (Basis `_werkstatt/belege/e0`) sie findet; Abweichung in der Rückgabe nennen.
3. Bildsatz (Z-09): `node _werkstatt/werkzeuge/bildsatz.mjs --satz e0 --hauptansichten --base http://127.0.0.1:4310 --ziel _werkstatt/cache/bildsatz/e0`. `bildsatz.json` nach `belege/e0/ausgang/bildsatz.json` kopieren. Je Ansicht × Gerät: Status, Konsolenfehler, Überlauf, Überlappung (gesamt und je Art) in eine Tabelle.
4. axe (Z-07): zuerst `axe.mjs` anpassen (Zustände `menue` und `erstbesuch` auf m390 statt m375; Option `--hauptansichten` liest HAUPTANSICHTEN.json; Option `--ziel DIR`). Dann `node _werkstatt/werkzeuge/axe.mjs --satz e0 --hauptansichten --ansichten m390,d1440 --zustaende --ziel _werkstatt/belege/e0/ausgang/axe` gegen 4310. Je Ansicht und Zustand: Anzahl ernster und kritischer Knoten, häufigste Regeln.
5. Bewegung (Z-05): je Hauptansicht `bewegung.mjs --modus register` und `--modus reduziert` (m390), dazu `--modus bildrate` auf `/` und `/bad` (m390, 3 Wiederholungen). Ziel `_werkstatt/cache/bewegung/e0/…`; Kennzahlen in die Zusammenfassung.
6. SVG und Schriften (Z-06, Z-08): `svg.mjs --seiten <12 Hauptansichten> --base http://127.0.0.1:4310 --ziel _werkstatt/belege/e0/ausgang/svg` (IDs im DOM, ARIA, Budgets); Schriftbytes je Hauptansicht aus dem Lighthouse-Lauf (Schritt 8) oder per Netzwerkmitschnitt.
7. Ersatzpfad (Z-09): Finde die Chromium-Schalter, die `animation-timeline` und View Transitions abschalten (z. B. `--disable-blink-features=…`). Belege mit einer Testseite per `page.setContent`: `CSS.supports('animation-timeline: scroll()')` = false und `typeof document.startViewTransition` = 'undefined' mit Schalter, beides true/'function' ohne. Ergänze `bildsatz.mjs` um `--ersatzpfad` (setzt genau diese Schalter beim Browserstart; Standard unverändert) und mache einen Lauf `--satz e0-ersatzpfad --seiten /,/kontakt`. Die Schalter wörtlich in die Rückgabe.
8. Lighthouse (Z-08), zuletzt und im Ruhefenster: `node _werkstatt/werkzeuge/lighthouse.mjs --satz e0 --hauptansichten --formen mobil,desktop --laeufe 3 --base http://127.0.0.1:4310` (Ausgabe nach `belege/e0/ausgang/lighthouse/` oder Kopie dorthin). Je Ansicht × Form: Median und Spanne von LCP, CLS, TBT, Leistung, dazu LCP-Element, LCP-Teilzeiten, CLS-Quellen, JS je Route, Benchmark-Index und ob er im Band lag.
9. Zusammenfassung `_werkstatt/belege/e0/ausgang/AUSGANG.md`: eine Tabelle je Kriterium (Z-02 Texte/Seiten, Z-05, Z-06, Z-07, Z-08, Z-09) mit den Werten je Hauptansicht, dazu die Spanne der drei Lighthouse-Läufe (das ist später die erlaubte Abweichung nach Z-08) und alle Auffälligkeiten (z. B. LCP-Element ist das Banner, Werte außerhalb des Vorlauf-Rahmens).

## Schnellprüfung und Selbstprüfung
- `node --check` für jedes geänderte Werkzeug; je geändertes Werkzeug ein kurzer Lauf, der die neue Option belegt und zeigt, dass der Standardaufruf unverändert läuft.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Jede Zahl in AUSGANG.md hat einen Belegpfad (Datei unter belege/e0/ausgang oder cache).
- Alle 12 Hauptansichten in jeder Tabelle; fehlende Werte mit Grund markiert, nicht weggelassen.
- Lighthouse: genau 3 gezählte Läufe je Ansicht × Form nach einem Aufwärmlauf; Läufe außerhalb des Benchmark-Bands gekennzeichnet; Ladewerte (loadavg) protokolliert.

## Ausgabeformular
In `_werkstatt/pakete/E0-PRUEF-03.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E0-PRUEF-03 · BEREIT ZUR RÜCKGABE ===
