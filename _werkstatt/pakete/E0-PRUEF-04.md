E0-PRUEF-04 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Funktionsliste als Ausgangswert (alle Funktionstests am Basisstand 745335f) und neuer Testfall: Tracking erst nach Einwilligung
Schreibrechte (exakt): `_werkstatt/werkzeuge/tests/funktion-tracking.spec.mjs (neue Testdatei, Regel „Testhoheit“ in PLAN.md)`, `_werkstatt/belege/e0/funktion/** (neu)`, `_werkstatt/pakete/E0-PRUEF-04.rueckgabe.md`, dazu die Rückgabe `_werkstatt/pakete/E0-PRUEF-04.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Erhebe die Funktionsliste F-01 bis F-19 als Ausgangswert gegen den Produktionsserver 4310 (Build 745335f) und schreibe einen neuen Playwright-Fall, der belegt, dass Analyse-Skripte (GA4) erst nach Einwilligung geladen werden – geprüft gegen den Build mit Platzhalter-ID auf 4311.

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
- Tests und Konfiguration (nur lesen, außer deiner neuen Datei): `_werkstatt/werkzeuge/tests/*.spec.mjs`, `fixtures.mjs` (Fixtures `protokoll` = abgefangene Fremdanfragen, `anfragen` = POST-Körper, Option `einwilligung`), `_werkstatt/werkzeuge/playwright.config.mjs` (Basis aus `RELAUNCH_BASE`, Projekte mobil/desktop), `lib.mjs` (`installSperre` beantwortet Fremd-Hosts mit 204 und protokolliert sie, `setzeEinwilligung`).
- Einwilligungslogik (UNANTASTBAR, nur lesen): `src/hooks/useConsent.ts`, `src/components/common/TrackingScripts.jsx` (GA4 nur bei `preferences.analytics` und gesetzter `NEXT_PUBLIC_GA4_ID`), `src/lib/cookie-inventory.ts`; Muster für Einwilligungstests: `_werkstatt/werkzeuge/tests/funktion-einwilligung.spec.mjs`.
- Server: 4310 = Basisstand ohne Analyse-ID; 4311 = derselbe Basisstand, gebaut mit `NEXT_PUBLIC_GA4_ID=G-TEST000000` (Platzhalter, keine echte Kennung). Erreichbarkeit vorher per `curl` prüfen; fehlt 4311, OFFENE FRAGE und nur Teil A ausführen.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Keine echte Anfrage an Google: alle Läufe nur über die Werkzeug-Konfiguration (Anfragesperre aus lib.mjs). Bestehende Testdateien nicht ändern.
- Läufe mit `--workers=1`; Ergebnisse und Rohdaten im Cache (`RELAUNCH_OUTPUT`, `RELAUNCH_REPORT` auf `_werkstatt/cache/…`), ins Repo nur Zusammenfassung und JSON-Bericht.

## Schritte
1. Teil A – Funktionsliste: `cd _werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4310 RELAUNCH_OUTPUT=../cache/e0-funktion RELAUNCH_REPORT=../cache/e0-funktion/pw.json PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx playwright test --workers=1` (alle Specs, beide Projekte). Bei einem unerwarteten Fehlschlag genau eine Wiederholung dieses einen Falls und beide Ergebnisse berichten.
2. Auswertung: je Spec und Projekt erwartet/bestanden/übersprungen/fixme/unerwartet; je F-Nummer (siehe Kopfkommentare der Specs) eine Zeile. Ablage `_werkstatt/belege/e0/funktion/FUNKTION.md` (Tabelle, Summen, Laufzeit, Liste aller `fixme` mit Grund) und `funktion.json` (kompakter Auszug aus pw.json: Titel, Projekt, Status, Dauer).
3. Teil B – neuer Fall `funktion-tracking.spec.mjs` (Kopfkommentar wie die übrigen Specs: Zweck, F-11-Erweiterung, Prüfgegenstand Verhalten). Er läuft nur, wenn `process.env.RELAUNCH_TRACKING === '1'` (sonst `test.skip` mit Begründung „nur gegen den Build mit Platzhalter-GA4-ID“), und prüft mit dem Fixture `protokoll` (abgefangene Fremdanfragen): (1) Erstbesuch ohne Entscheidung: keine Anfrage an `googletagmanager.com` bzw. `google-analytics.com` nach vollständigem Laden und Scrollen; (2) „Alle ablehnen“: auch nach Neuladen und einem Seitenwechsel keine solche Anfrage; (3) „Alle akzeptieren“: danach eine Anfrage an `googletagmanager.com/gtag/js?id=G-TEST000000` (die Sperre beantwortet sie mit 204); (4) Widerruf über „Cookie-Einstellungen verwalten“ → „Alle ablehnen“: nach Neuladen keine neue Anfrage. Nur Zustandsabfragen (`expect.poll`), keine festen Wartezeiten außer dem Abwarten des Leerlaufs (Skripte mit `lazyOnload`).
4. Beleg Teil B: Lauf `RELAUNCH_BASE=http://127.0.0.1:4311 RELAUNCH_TRACKING=1 … npx playwright test funktion-tracking.spec.mjs --workers=1` GRÜN in beiden Projekten; Gegenprobe gegen 4310 mit `RELAUNCH_TRACKING=1`: Fall (3) muss ROT werden (keine ID im Build) – das zeigt, dass der Test wirkt; Ergebnis beider Läufe in die Rückgabe.
5. Ablage der Belege von Teil B unter `_werkstatt/belege/e0/funktion/tracking.md` (Kurzbericht mit beiden Läufen).

## Schnellprüfung und Selbstprüfung
- `node --check` ist für Specs nicht möglich (ESM mit Playwright-Importen) – stattdessen `npx playwright test funktion-tracking.spec.mjs --list` ohne Fehler; `git status --porcelain` zeigt nur deine Dateien.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Summen in FUNKTION.md stimmen mit pw.json überein; jede F-Nummer hat eine Zeile; `fixme`-Fälle vollständig mit Grund.
- Neuer Test: ohne `RELAUNCH_TRACKING` übersprungen (nicht rot), mit 4311 grün, Gegenprobe 4310 rot in Fall (3).

## Ausgabeformular
In `_werkstatt/pakete/E0-PRUEF-04.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E0-PRUEF-04 · BEREIT ZUR RÜCKGABE ===
