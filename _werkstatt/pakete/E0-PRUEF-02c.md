E0-PRUEF-02c · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v1 · Umfang: Lighthouse-Messkette und Textinvarianten erweitern
Schreibrechte (exakt): `_werkstatt/werkzeuge/lighthouse.mjs`, `_werkstatt/werkzeuge/texte.mjs`, `_werkstatt/werkzeuge/texte-vergleich.mjs`, dazu die Rückgabe `_werkstatt/pakete/E0-PRUEF-02c.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Erweitere `lighthouse.mjs` um echten Median aus 3 mit Aufwärmlauf, Spanne, LCP-Element, LCP-Teilzeiten, CLS-Quellen, JS je Route und Benchmark-Band, und `texte.mjs`/`texte-vergleich.mjs` um Wortfolgen je Block in zwei Ansichten – rückwärtskompatibel.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir werten die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) zu einer eigenständigen, messbar besseren Seite auf, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Fotos und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (Lighthouse mobil ≥ 90), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## K-013 Budgets
Lighthouse mobil ≥ 90 · LCP ≤ 2,5 s · CLS ≤ 0,1 · TBT ≤ 200 ms · INP ≤ 200 ms · zusätzliches JS für Bewegung ≤ 60 KB gzip · Schriften ≤ 250 KB gesamt · Icon-SVG ≤ 1,5 KB · Illustrations-SVG ≤ 40 KB gzip. Keine Hauptseite schlechter als im Ausgangsstand jenseits der Streuung (> 3 Punkte oder > 10 % LCP).

## Maßstab
- Vorhandene Werkzeuge als Muster für Stil und Anfragesperre: `_werkstatt/werkzeuge/lib.mjs` (installSperre, setzeEinwilligung, durchscrollen, bereit, ueberlauf, ANSICHTEN), `fotos.mjs`, `axe.mjs`.
- Hauptansichten: `_werkstatt/HAUPTANSICHTEN.json`; Bewegungsregister: `_werkstatt/register.json`; Einrichtung: `_werkstatt/werkzeuge/EINRICHTUNG.md`.
- Werkzeug-Abhängigkeiten: `_werkstatt/werkzeuge/node_modules` (Symlink, enthält @playwright/test 1.56.1, @axe-core/playwright, lighthouse 13.5.0, svgo 4.1.0, pngjs, pixelmatch); Projekt-Abhängigkeiten (u. a. tailwindcss 4, @tailwindcss/node) unter `/home/user/tezgel/node_modules` (per createRequire erreichbar). Browser: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Werkzeuge dürfen `_werkstatt/werkzeuge/package.json` NICHT ändern (keine neuen npm-Abhängigkeiten). Python-Hilfspakete nur in eine venv im Scratchpad.
- Jedes Werkzeug ruft `assertLocal(base)` auf und nutzt für jeden Browserlauf `installSperre` (Anfragesperre). Ergebnisse unter `_werkstatt/cache/…` (liegt außerhalb des Repos) oder dem per `--ziel` genannten Ordner.
- Deutsche Kommentare im Stil der vorhandenen Werkzeuge; Kopfkommentar mit Zweck und Aufruf.
- `lib.mjs` nicht ändern (gehört E0-PRUEF-02a); nur importieren.
- Lighthouse-Messläufe sind rechenintensiv: in diesem Paket höchstens 2 Seiten × 2 Formen × 3 Läufe als Beleg (keine vollständige Messung – die macht E0-PRUEF-03).

## Schritte
1. `lighthouse.mjs`: neue Optionen `--base URL` (Standard BASE, mit `assertLocal`), `--hauptansichten` (Seiten aus `_werkstatt/HAUPTANSICHTEN.json`), `--laeufe` Standard 3. Je Seite und Form vor den gezählten Läufen 1 Aufwärmlauf (nicht gezählt, nicht gespeichert). Median: bei ungerader Zahl das mittlere Element, bei gerader der Mittelwert der beiden mittleren. Zusätzlich je Kennzahl `spanne: [min, max]` im Medianblock.
2. Je Lauf zusätzlich speichern: `lcp_element` (Selektor und gekürzter Ausschnitt aus dem Audit `largest-contentful-paint-element` bzw. der LCP-Insight von Lighthouse 13 – die tatsächlich vorhandene Audit-ID im Code prüfen und verwenden), `lcp_phasen` (TTFB, Ladeverzögerung, Ladezeit, Renderverzögerung in ms, soweit vorhanden), `cls_quellen` (bis zu 5 Elemente mit Wert aus `layout-shifts`/CLS-Insight), `js_top` (5 größte Skripte: URL-Pfad und Übertragungsgröße in KB) – zusätzlich zu den vorhandenen Feldern.
3. Benchmark-Band: der Benchmark-Index des ersten gezählten Laufs der Sitzung ist die Referenz; weicht ein Lauf um mehr als ±15 % ab, wird er bis zu 2-mal wiederholt und im Ergebnis mit `benchmark_abweichung: true` markiert, falls es so bleibt.
4. Blockliste: alle Hosts aus `GESPERRTE_HOSTS` in `lib.mjs` als `blockedUrlPatterns` (in Lighthouse-Musterform `*host*`) zusätzlich zu den vorhandenen; Messbedingungen-Text im Ergebnis um „Aufwärmlauf, Median aus N, Benchmark-Band ±15 %“ ergänzen. Ergebnisdatei und -struktur (`belege/<satz>/lighthouse.json`, `seiten[pfad][form].median/laeufe`) bleiben erhalten.
5. `texte.mjs`: neue Optionen `--base URL` und `--ansichten m390,d1440` (Standard: nur d1440 wie bisher; bei mehreren Ansichten je Seite und Ansicht eine Datei `texte/<slug>@<ansicht>.json`, die bisherige Datei bleibt für d1440). Neues Feld `bloecke`: für `header`, `main`, `footer` (und jedes `[role=dialog]` sichtbar) die Wortfolge aus `textContent` (Leerraum zusammengefasst, Wörter als Array, ohne `<script>`/`<style>`/`[aria-hidden=true]`-Inhalte, ohne Einfluss von CSS `text-transform`). `--hauptansichten` wie oben.
6. `texte-vergleich.mjs`: zusätzlich je Seite und Block die Wortfolgen per LCS vergleichen und entfernte sowie hinzugefügte Wortspannen (zusammenhängend, mit 5 Wörtern Kontext) auflisten; `--erlaubt f.json` (Format: `[{seite, block, entfernt: "…", hinzugefuegt: "…"}]`) markiert erlaubte Spannen (protokollierte Mikrotexte). Neue Zusammenfassung: Anzahl unerlaubter entfernter Spannen je Seite. Bestehende Ausgaben bleiben.
7. Belege: `lighthouse.mjs --satz probe-lh --seiten /,/kontakt --laeufe 3 --base http://127.0.0.1:4310` (Ausgabe der Mediane mit Spanne, LCP-Element je Seite und Form); `texte.mjs --satz probe-t --seiten /,/kontakt --ansichten m390,d1440 --base http://127.0.0.1:4310` zweimal (Sätze probe-t1/probe-t2) und `texte-vergleich.mjs probe-t1 probe-t2` (erwartet: 0 Abweichungen). Hinweis: während der Lighthouse-Läufe laufen andere Prüfer – die Zahlen dienen nur als Funktionsbeleg.

## Schnellprüfung und Selbstprüfung
- Jedes neue oder geänderte Werkzeug einmal gegen eine echte Ansicht ausführen (Beleg: Ausgabepfad), `node --check` bzw. `bash -n` grün.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.

## Ausgabeformular
In `_werkstatt/pakete/E0-PRUEF-02c.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E0-PRUEF-02c · BEREIT ZUR RÜCKGABE ===
