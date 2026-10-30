# UM-E4-LEISTUNG · Schritt 2 · Notiz des Baumeisters (mit Nacharbeit)

Arbeitskopie `…/leist4/baum` gegen `…/leist4/vor` (gleich HEAD). Diff: `…/leist4/UM-E4-LEISTUNG.diff` (10 Dateien, nach der Nacharbeit neu erzeugt). Zusätzlich, nicht im Diff: `…/leist4/UM-E4-LEISTUNG-M5-option.diff` (Maßnahme 5, zur Entscheidung des Orchestrators, siehe 3.4).

Bauten der Nacharbeit (alle `next build`, Turbopack 16.4.3, mit echter `node_modules`-Kopie, nach dem Gebrauch gelöscht):
- vorher `…/leist4/nacharbeit/vorbau` (Port 4461), nachher `…/leist4/nacharbeit/nachbau` (Port 4460);
- für die Tracking-Specs je ein Bau mit Platzhalter-GA4-ID (`NEXT_PUBLIC_GA4_ID=G-TEST000000`): `vorbau-ga4` (4461), `nachbau-ga4` (4460);
- eine Probe für Weg (a) (`nacharbeit/probe-a`, siehe 3.1).

Messung im ausgelieferten HTML: `…/leist4/nacharbeit/vorher.json` und `…/leist4/nacharbeit/nachher.json` (Werkzeug `…/leist4/nacharbeit/werk/messe2.mjs`: gzip-Körper wie `next start`, Kopfzeilen getrennt gezählt, Skripte mit `nomodule` getrennt, zwölf Hauptansichten und die 13 Beitragsseiten). Die Zahlen der ersten Fassung (`…/leist4/mess/`) gelten für die Hauptansichten außer `/blog` unverändert (byte-gleich nachgezählt). Kein Lighthouse, keine Zeitmessung (E-076).

## 1 · Ursachen je Ansicht (aus dem Bericht des Kundschafters, ein Satz)

- `/` (2,85 s): Foto nach 0,2 s da, der simulierte LCP endet am Skript-Ende (React DOM 71 KB, Laufzeit 45 KB, Schriften 57 KB, Dokument 61 KB in der dritten Stufe); die zweite CSS-Datei seit START kostet 145 ms FCP.
- `/bad` (3,14 s): wie `/`, dazu Foto 22,9 KB, Projekt-Check und Funnel (16,4 KB) und Dokument 54,5 KB.
- `/bad/badsanierung` (3,13 s): Dokument 53,6 KB, Foto 18,8 KB, Funnel 10,7 KB; lange Aufgabe 259 ms in der Laufzeit.
- `/bad/barrierefreies-bad` (3,00 s): Dokument 49,7 KB (+17,5 KB gegen E0) und Funnel; Foto jetzt im Graphen.
- `/leistungen` (3,01 s): Dokument 56,6 KB und Formatregler mit Funnel (11,1 KB).
- `/fliesen` (3,01 s, TBT 168): Vorspann-Text ist LCP-Element; Konfigurator-Stücke 23,4 KB und Dokument 54,1 KB davor.
- `/balkon-terrasse` (3,00 s): LCP-Foto 49,7 KB bei w=750 (größtes) und Dokument 59,1 KB.
- `/referenzen` (2,86 s): Dokument 59,5 KB (rohes HTML 461 KB) und Galerie-Stück 6,8 KB.
- `/ueber-uns` (3,00 s): Foto 33,3 KB und Dokument 54,1 KB.
- `/kontakt` (2,79 s): Dokument unter der Stufe (38,5 KB); Rest gemeinsamer Anteil plus Funnel 9,5 KB.
- `/standorte/wetzlar` (4,88 s, 79): Bannertext ist LCP-Element und wird erst 400 ms nach dem Einhängen gezeichnet; das zieht 19 bis 20 Prefetch-Abrufe und 6 Skriptstücke in den Graphen.
- `/blog` (3,46 s, 89, TBT 200): Die Insel bringt über ContentContext und dataService den ganzen Inhaltsspeicher und zod mit (76,5 KB Skripte im Graphen).

## 2 · Umgesetzt

| # | Maßnahme | Dateien | Wirkung im eigenen Bau (belegt, ausgeliefertes HTML) |
|---|---|---|---|
| 1 | Ein render-blockierendes Stylesheet: Schriften als `<style>` im Kopf statt über `next/font/local` (Weg c) | `src/app/(bestand)/_dokument.tsx`, `src/types/schriften.d.ts` (neu), `test/stylesheets.test.mjs` (neu), `package.json` (Testliste) | alle 12 Ansichten und alle 13 Beitragsseiten: Stylesheets 2 → 1; Haupt-CSS byte-gleich (`3vic8i9diekr2.css`, 136.490 B roh, 23.641 B gz); `0nxicmqezp7pl.css` (478 B, eine Anfrage samt Kopfzeilen) entfällt |
| 2 | Banner nach dem nächsten Bild statt nach 400 ms (E-067; Entscheidung 2 des Orchestrators, Wortlaut in 3.2) | `src/hooks/useConsent.ts` | **alle Seiten ohne gültige Wahl** (der Banner hängt über `ClientWidgets` in `_dokument.tsx` überall ein): Banner erscheint ein Bild nach dem Einhängen statt 400 ms später. LCP-Wirkung nur dort, wo der Bannertext LCP-Element ist (Ortsseiten, ursache.md 5.2). Wortlaut, Knöpfe, Fokus, Wahl, Speicherung, Tracking und Wiederbesucher unverändert |
| 3 | `/blog` lädt nur, was die Liste nutzt: Lesen ohne Vorgaben und zod, Beiträge ohne ihren Text als Vorgabe von der Serverseite, Schreiben über dataService (mit zod) erst beim ersten Schreiben. Der Speicher umschließt seit der Nacharbeit nur die Liste (`page.jsx`), nicht mehr das Layout | `src/services/inhaltLesen.js` (neu), `src/services/dataService.js`, `src/contexts/ContentContext.jsx`, `src/app/(bestand)/blog/page.jsx`, `src/app/(bestand)/blog/layout.tsx` | `/blog`: Skripte im HTML 14 → 12, 293.301 → 229.355 B gz (−63.946 B); eigene Stücke 76,5 KB → 11,1 KB gz; Dokument 47.630 → 50.564 B gz (+2.934 B, gleiche Stufe). `/blog/[slug]` (13 Seiten): Skripte im HTML 14 → 11, 287.952 → 223.182 B gz (−64.770 B); Dokument +30 bis +44 B gz (der `<style>` aus Maßnahme 1, abzüglich des entfallenen Verweises auf den Speicher) |

Nebenwirkung im Build (alle 12 Ansichten): Turbopack legt die zwei gemeinsamen Stücke `2n_l…` (11.913 B gz) und `1y-c…` (13.807 B gz) jetzt in eines (`3x_50esj4ygh3.js`, 23.946 B gz): eine Skript-Anfrage weniger, −1.774 B gz. Ursache ist Maßnahme 3; ein Probe-Bau nur mit Maßnahme 3 zeigt auf `/` ebenfalls 11 Skripte im HTML (Prüfer, Linse 1).

**Zählweise der Skripte:** Jede Seite nennt im HTML zusätzlich `0cz1d0mv5g_q7.js` (39.627 B gz) mit `noModule`. Browser mit Modulunterstützung, also Chromium und Lighthouse, laden es nie. „Skripte im HTML“ zählt es mit; geladen werden je Seite eines weniger und 39.627 B gz weniger (Tabelle in Abschnitt 5). Der Unterschied vorher gegen nachher ist davon nicht betroffen.

Nicht umgesetzt: 4, 5 (als Option), 6, 7, 8, 9, dazu INP, `spaet-zeichnen` und das App-Stück der Einwilligung; Begründung in Abschnitt 4.

## 3 · Entscheidungsvermerke (G6)

### 3.1 Maßnahme 1 · Schriften ohne `next/font/local` (kein Schalter in `next.config.ts`)
- **Ziel:** ein render-blockierendes Stylesheet auf allen Ansichten, unabhängig von der Größe des Haupt-CSS (E-097, FCP mobil +145 ms auf `/`).
- **Befund:** `next/font/local` legt je Schrift ein eigenes CSS-Modul an. Turbopack legt CSS-Module nur bis zu einer Grenze in eine Datei; seit das Haupt-CSS über ihr liegt (belegt zwischen 129.046 und 132.247 B), kommt das Schriftmodul als zweite Datei.
- **Alternativen (geprüft):**
  - (a) `experimental.cssChunking { type: 'graph', requestCost: 10000000 }` (`cssChunking.md`: für Turbopack nur `true` oder `'graph'`; `requestCost` in Byte je zusätzlicher Anfrage, größer heißt weniger Dateien). **Eigener Probe-Bau** in der Nacharbeit: Kopie von `vor`, nur diese Zeile in `experimental` ergänzt (`…/leist4/nacharbeit/probe-a.build.log`, Next meldet „Experiments · cssChunking“). Ergebnis: weiter zwei Dateien in `static/chunks`, `0nxicmqezp7pl.css` (478 B) und `3vic8i9diekr2.css` (136.490 B), beide als `<link rel="stylesheet">` auf `/`. Ohne Wirkung; der Prüfer der Linse 1 kam unabhängig zum selben Ergebnis.
  - `experimental.turbopackChunking.maxMergeChunkSize 400000`: ohne Wirkung; laut `turbopackChunking.md` steuert es nur JavaScript.
  - (b) Haupt-CSS unter die Grenze: −7,5 KB roh nötig, ohne belegtes totes CSS; kippt beim nächsten Paket wieder.
  - `experimental.inlineCss`: legt das ganze CSS ins Dokument (+23 KB gz je Seite, jede Ansicht eine Dokumentstufe höher; `inlineCss.md`: Stile doppelt in HTML und RSC).
  - `@font-face` in `globals.css` mit `url()`: Dann hängt die Gleichheit von Vorlade- und Schriftadresse an Turbopacks Benennung, und das Designsystem wird angefasst.
- **Gewählt (c):**
  - Die zwei `@font-face` und die zwei Variablen stehen wörtlich wie vorher von next/font erzeugt in einem `<style>` im Kopf: Familien `archivo` und `plexMono`, `font-display: swap`, Gewichte und `font-stretch`, `:root{--font-archivo:"archivo";--font-plex-mono:"plexMono"}`.
  - Die Dateien laden per `import … with { turbopackModuleType: 'asset' }` (`turbopack.md`, Abschnitt „Inline loader configuration with import attributes“).
  - Archivo ist per `preload()` aus `react-dom` vorgeladen (wie vorher next/font), Plex Mono nicht (wie vorher `preload: false`).
  - Danach ist `globals.css` das einzige CSS-Modul, also genau eine Datei, gleich wie groß sie wird. Belegt auch umgekehrt (Prüfer, Linse 1): Mit 692 KB zusätzlichen Regeln im Haupt-CSS (811.205 B) blieb es eine Datei.
- **Abweichung von KERN K-004 (beantragt):** K-004 (`_werkstatt/KERN.md` Zeile 55, aus v2) schreibt „Schriften `next/font/local`“ vor. Weg (c) ersetzt das. KERN schreibt nur der Orchestrator; nach dem Anwenden des Diffs stünde K-004 im Widerspruch zum Code. Vorschlag für den Satz in K-004: „Schriften als `@font-face` in einem `<style>` im Kopf von `_dokument.tsx` (Dateien per Turbopack-Asset-Import, Archivo per `preload()`); `globals.css` bleibt das einzige CSS-Modul (`test/stylesheets.test.mjs`, E-097, UM-E4-LEISTUNG)“, dazu ein Eintrag in `ENTSCHEIDUNGEN.md` mit Verweis auf E-097. Andere Teile von K-004 berührt der Diff nicht: Der `<style>` ist ein Element, kein Inline-`style`-Attribut; Farbwerte stehen keine darin.
- **Wirkung je Route (Build, ausgeliefertes HTML):**
  - Alle 12 und die 13 Beitragsseiten: Stylesheets 2 (136.968 B roh, 24.119 B gz-Körper) → 1 (136.490 B roh, 23.641 B gz), gleiche Datei `3vic8i9diekr2.css`.
  - Schriftdateien byte-gleich (geprüft mit `cmp`), neue Namen `archivo-variabel.1ydwlacuzh1hh.woff2` und `plex-mono-400.1_uxhdyxlqwk7.woff2`, weiter `Cache-Control: public, max-age=31536000, immutable`.
  - Der Vorladehinweis für Archivo steht wie vorher als erster Eintrag nach den Meta-Angaben; die Vorladehinweise sind auf allen 25 Seiten vorher und nachher gleich.
  - `<html>` trägt keine next/font-Klassen mehr.
  - Dokument +105 bis +173 B gz (der `<style>` steht in HTML und RSC-Fluss), keine Stufe gekreuzt.
  - `static/chunks` enthält nur noch eine CSS-Datei.
- **Risiko Regelreihenfolge:**
  - Das Haupt-CSS ist byte-gleich (gleiche Inhaltskennung), seine Reihenfolge also unverändert.
  - `@font-face` ist reihenfolgeunabhängig.
  - Die zwei Variablen standen vorher auf einer Klasse am `<html>` (Spezifität 0,1,0), jetzt auf `:root` (0,1,0), unlayered. Keine andere Regel setzt sie; `--font-text`, `--font-anzeige` und `--font-mono` in `@theme` lesen sie am selben Element.
  - Pixelvergleich: 48 Paare mit 0 abweichenden Pixeln (Abschnitt 5).
- **G7:** Die Maßnahme ändert, was Nutzer laden, nicht nur die Messung: beim Erstbesuch eine render-blockierende Anfrage weniger, gleiche Schriften, gleiche Darstellung. Im echten Browser belegt ist hier nur die Zahl der Anfragen (2 → 1); die −145 ms FCP sind eine Lantern-Zahl (Lighthouse mobil simuliert, 4324 gegen 4325).
- **Nur Turbopack:** Das Import-Attribut gibt es nur in Turbopack; `next build --webpack` würde an dieser Datei scheitern. Turbopack ist der Standard von Next 16; in `package.json`, `.github` und `vercel.json` gibt es keinen webpack-Aufruf.
- **Absicherung:** `test/stylesheets.test.mjs` (in `npm test` aufgenommen):
  - Quelle, läuft immer: `globals.css` ist der einzige Import einer Stildatei in `src/`; erkannt werden statische und dynamische Importe sowie `require` von `.css`, `.scss`, `.sass` und `.less`, auch mit Abfrage (seit der Nacharbeit; vorher nur statische `.css`-Importe am Zeilenanfang). Dazu keine `.module.css`, kein `next/font`; der `<style>`, `preload()` und die Variablen stehen in `_dokument.tsx`. Ein Paket-Stil ohne Endung (etwa `'paket/css'`) fällt erst dem Build-Teil auf.
  - Build, nur wenn `.next/server/app/index.html` existiert, sonst übersprungen (kein roter Fall): genau ein `<link rel="stylesheet">`, ein Archivo-Vorladehinweis und zwei `@font-face` im Kopf, auf allen 12 Hauptansichten. Er greift also nur, wo vor `npm test` gebaut wird: im Reinraum (`werkzeuge/reinraum.sh` ruft `npm run build` in Zeile 18 vor `npm test` in Zeile 21). `.github/workflows/security.yml` führt nur lint aus, der Vercel-Bau keine Tests. Beim Paketabschluss im Reinraum auf „skipped 0“ achten.
  - Gegenprobe: im Vorher-Bau alle drei Teile rot (zwei Stylesheets, next/font); im Nachher-Bau alle drei grün. Mutationsproben für die erweiterte Quellprüfung (dynamischer Import einer `.css`, `require` einer `.scss?inline`, mehrzeiliger Import einer `.css`): je rot.
- **Rückweg:** Hunk in `_dokument.tsx` zurück (zwei `localFont`-Aufrufe und `className` am `<html>`), `src/types/schriften.d.ts` löschen, `test/stylesheets.test.mjs` und den Eintrag in `package.json` entfernen, K-004 bleibt dann wie es ist. Sonst hängt nichts daran.

### 3.2 Maßnahme 2 · Banner nach dem nächsten Bild (`useConsent.ts`)
- **Quelle der Vorgabe:** Entscheidung 2 des Orchestrators zu den offenen Fragen des Kundschafters, im Bau-Auftrag dieses Pakets (Workflow `…/leist4/leist4-wf.js`, Zeile 44 ff., „verbindlich“). Wortlaut: „Wetzlar: Die Textblöcke des Banners NICHT teilen, nur damit Lighthouse ein anderes Element wählt (G7: sichtbar gleich, nur die Messung ändert sich). Zulässig ist nach E-067 ein früheres Zeichnen des Banners: den Aufschub von 400 ms in src/hooks/useConsent.ts kürzen oder durch das Malen nach dem ersten Bild ersetzen, wenn Wortlaut, Knöpfe, Fokusverhalten, Wirkung der Wahl, Speicherung und Tracking-Verhalten gleich bleiben und Wiederbesucher mit gültiger Wahl den Banner nie sehen. […] Reicht das nicht für Leistung 90, melde Wetzlar als offenen Punkt; keine Gestaltungsänderung der Ortsseite.“ In `ENTSCHEIDUNGEN.md`, `STATUS.md`, `PRUEFPUNKT.md` und `AUFTRAG.md` steht sie noch nicht; das Nachtragen ist Sache des Orchestrators.
- **Ziel:** Auf den Ortsseiten ist der Bannertext das LCP-Element. Die 400 ms Wartezeit schoben den beobachteten LCP auf 807 ms und zogen Prefetch und Skripte in den Graphen.
- **Varianten im Nachbau des Kundschafters** (`ursache.md` 5.2, 6 und 8.4, Wetzlar, Lantern):

  | Variante | Nachbau LCP | Leistung (gerechnet) | Stand |
  |---|---|---|---|
  | HEAD (Banner +400 ms) | 4.941 ms (Median gemessen 4,88 s) | 79 | vorher |
  | früher einblenden (Grenze 400 ms) | 3.816 ms | 84 bis 86 | **gebaut** |
  | Textblöcke des Banners teilen (Vorspann bleibt LCP) | 3.255 ms | 90 bis 92 | nicht freigegeben (Entscheidung 2) |

  `ursache.md` 8.4 nennt das frühere Einblenden „schlechter“ im Vergleich zur Teilung; gegenüber HEAD ist es ein Gewinn von rund 1,1 s im Nachbau. Die Teilungsvariante bleibt eine Frage an den Orchestrator (Abschnitt 7, Punkt 1).
- **Gewählt:** `setTimeout(…, 400)` → `requestAnimationFrame(…)`, mit Aufräumen über `cancelAnimationFrame`; Kommentar mit Begründung.
  - Der Hook hängt erst nach der Hydrierung ein (`dynamic(…, { ssr: false })`); Überschrift und Foto sind dann längst gezeichnet. Der ursprüngliche Zweck („Hero first“) bleibt also erfüllt.
- **Geltungsbereich:** nicht nur die Ortsseiten. Der Hook gilt auf jeder Seite ohne gespeicherte gültige Wahl (eingehängt über `ClientWidgets` in `_dokument.tsx`): Der Banner erscheint überall ein Bild nach dem Einhängen statt 400 ms später. Das ist eine sichtbare, gewollte Änderung beim Erstbesuch (E-067); im Ruhezustand nach der Wahl ändert sich nichts. Auf den elf übrigen Hauptansichten ist der Banner nicht LCP-Element (dort gewinnt Foto oder Vorspann, `ursache.md` 5.1 und 5.2); eine Wirkung auf ihre Metriken ist nicht belegt und nicht erwartet.
- **G7:** Die Messung ändert sich, weil sich das Erlebte ändert: Nutzer ohne Wahl sehen den Banner früher. Kein Element wird nur für Lighthouse versteckt, verkleinert oder verschoben.
- **Unverändert:**
  - Wortlaut, Knöpfe, Fokusverhalten (keine Fokusführung beim Einblenden, wie vorher) und Wirkung der Wahl.
  - Speicherung (Cookie `tezgel_consent_status`, Spiegel in localStorage) und Tracking.
  - Wiederbesucher mit gültiger Wahl: Der Zweig wird gar nicht betreten, der Banner erscheint nie; `#cookie-settings` öffnet wie vorher sofort.
  - Der Platzhalter „Cookies“ in der Leiste bleibt ruhend: Platzhalter und Knopf sehen gleich aus (UM-E4-START).
  - Unabhängig bestätigt (Prüfer, Linse 1, Chromium 412 px, DPR 1,75, auf `/`, `/blog`, `/standorte/wetzlar`): Wortlaut, vier Knöpfe, Cookie, Fokus, Verschwinden nach der Wahl, kein Banner nach Neuladen, Öffnen mit `#cookie-settings` vorher und nachher gleich.
- **Beleg:** `funktion-einwilligung.spec.mjs` und `funktion-tracking.spec.mjs` gegen Bauten mit Platzhalter-GA4-ID (`RELAUNCH_TRACKING=1`), reduziert und mit Bewegung: je 44 bestanden, 0 übersprungen, vorher (4461) wie nachher (4460). Die acht Tracking-Fälle, in der ersten Fassung übersprungen, laufen damit mit.
- **Grenze:** Der Banner bleibt auf den Ortsseiten LCP-Element. Erwartung und Prüfkriterien siehe Abschnitt 6.
- **Rückweg:** die drei Zeilen zurück auf `setTimeout(…, 400)`.

### 3.3 Maßnahme 3 · `/blog` (keine Konfiguration; Begründung zu G8/G9)
- `/blog` liest die Überschreibungen. `useBlogListe` und `BlogCard` lesen `blogCategories` und `blogPosts` über `useContent` (`BlogSidebar` ebenso, wird aber nirgends eingebunden). Deshalb bleiben ContentProvider und die Überschreibungen aus localStorage.
- **Geteilt:** `inhaltLesen.js` enthält die Schlüssel und das Lesen, wörtlich aus `dataService.get` herausgelöst. `dataService.get` nutzt dieselbe Funktion; der Sonderfall Seitendaten bleibt in `dataService`, Fehler führen wie vorher zur Vorgabe.
- **ContentContext:** Er liest nur noch Kategorien und Beiträge.
  - Die übrigen Felder (`siteConfig`, `services`, `company`, `projects`, `team`, `settings`) las kein Verbraucher (Suche in `src/`).
  - `updateContent`, `resetContent` und `clearAllContent` laden `dataService` mit zod per `import()`. Sie geben wie vorher nichts zurück; der neue Stand kommt wie vorher über `content-updated`. Außerhalb des Kontexts haben sie keinen Aufrufer.
  - Das Effekt-Abo hängt jetzt an `[vorgaben]` statt `[]`: Die Vorgaben sind fest, Grund ist die eslint-Regel `exhaustive-deps`.
- **Vorgaben:** Die Serverseite `blog/page.jsx` reicht Kategorien und Beiträge ohne `content` herein. Den Beitragstext liest kein Leser der Liste; die Beitragsseite liest ihn serverseitig aus `@/config/posts`. So kommen rund 28 KB gz Beitragstext nicht ins Client-Bündel; dafür steht die Liste (ohne Text) im RSC-Fluss von `/blog`.
- **Ort des Speichers (Nacharbeit):** In der ersten Fassung stand der Speicher mit den Vorgaben im Layout `blog/layout.tsx`. Das Layout gilt auch für die 13 Beitragsseiten, die `useContent` nicht lesen: Jede trug die Liste im RSC-Fluss (+2,4 bis +2,5 KB gz Dokument, Befund Linse 1), und `/blog/fliesenleger-gesucht-geselle-meister` kam mit Kopfzeilen über die Stufe von 43.800 B. Jetzt umschließt der Speicher nur `BlogFilter` in `page.jsx`; das Layout gibt nur noch seine Kinder aus (Metadaten wie vorher).
  - Beitragsseiten: Dokument +30 bis +44 B gz gegen vorher (der `<style>` aus Maßnahme 1, abzüglich des entfallenen Verweises auf den Speicher); der genannte Beitrag 42.395 → 42.432 B mit Kopfzeilen, unter der Stufe wie vorher. Skripte im HTML 14 → 11, eines weniger als in der ersten Fassung (12); der Speicher ist dort nicht mehr eingebunden. RSC-Segment `_full` der Beitragsseiten 118.351 → 117.820 B roh.
  - `/blog`: Daten gleich (Dokument roh 365.090 B, erste Fassung 365.066 B), gzip aber 50.564 statt 50.110 B (+454 B), weil die Liste jetzt im Seitensegment statt am Anfang des Flusses steht; gleiche Stufe (52.259 B mit Kopfzeilen). Das Layout-Segment `blog.segments/!KGJlc3RhbmQp/blog.segment.rsc` der ersten Fassung entfällt wieder (wie in HEAD); dafür wächst das Seitensegment `…/blog/__PAGE__.segment.rsc` 54.552 → 61.346 B roh. Das trifft einen Vorabruf von `/blog` aus anderen Seiten (nicht im Browser gemessen).
  - Die Zustände beim Wechsel zwischen Liste und Beitrag: Der Speicher wird beim Zurück zur Liste neu gelesen (vorher blieb er im Layout erhalten). Die Liste hing schon vorher neu ein; gelesen wird derselbe Stand aus localStorage.
- **G7:** Nutzer laden auf `/blog` rund 64 KB gz weniger JavaScript, auf jeder Beitragsseite rund 65 KB gz; die Darstellung ist gleich (Pixel 0, auch drei Beitragsseiten).
- **Beleg** (`…/leist4/werk/blogcheck.mjs`, vorher gegen nachher byte-gleiche Ausgabe, `…/leist4/nacharbeit/blog-4461.txt` und `blog-4460.txt`):
  - Titel und Filter der Liste mit Vorgaben;
  - mit Überschreibung von Beiträgen und Kategorien in localStorage vor dem Laden;
  - nach Schreiben in localStorage plus Ereignis `content-updated`.
  - Seitenfehler: Im Fall „Überschreibung vor dem Laden“ meldet React einen Hydrierungsfehler (#418), **vorher wie nachher** (Bestand: der Speicher liest localStorage im ersten Rendern). Die erste Fassung schrieb hier „keine Seitenfehler“; das war falsch. Die beiden anderen Fälle sind fehlerfrei.
  - Beitragsseiten (`…/leist4/nacharbeit/werk/artikel.mjs`): alle 13 mit Status 200, gleicher H1, gleiche Zahl von H2 und Links, keine Seitenfehler, vorher gleich nachher.
- **Rückweg:** die fünf Dateien aus `vor` zurück, `inhaltLesen.js` löschen.

### 3.4 Maßnahme 5 · nicht im Diff, als Option (`UM-E4-LEISTUNG-M5-option.diff`)
- **Inhalt:**
  - `next.config.ts`: `images.deviceSizes: [640, 680, 750, 828, 1080, 1200, 1920, 2048, 3840]` (Standard plus 680).
  - `EinstiegMitte.tsx`: `sizes` unter sm `min(calc(100vw - 2.125rem), 28rem)` statt `100vw`. Gemessen 320 bis 480 px: Foto = Viewport − 34 px, ab 480 px 446 px.
- **Wirkung belegt (eigener Bau):**
  - Bei 412 px und DPR 1,75 lädt jede der 8 Foto-Ansichten w=680 statt w=750, eine einzige Anfrage (Vorladen passt zum `img`); bei 390 px und DPR 3 w=1080 statt w=1200.
  - Bytes AVIF w=750 → w=680:

    | Ansicht | w=750 | w=680 | Ersparnis |
    |---|---|---|---|
    | `/` | 13.105 | 11.544 | −11 % |
    | `/bad` | 22.704 | 19.601 | −13 % |
    | `/bad/badsanierung` | 18.441 | 16.035 | −13 % |
    | `/bad/barrierefreies-bad` | 9.701 | 8.808 | −9 % |
    | `/leistungen` | 7.485 | 6.671 | −10 % |
    | `/balkon-terrasse` | 50.112 | 41.833 | −16 % |
    | `/referenzen` | 12.466 | 10.755 | −13 % |
    | `/ueber-uns` | 33.348 | 28.725 | −13 % |

  - Bei 204,8 KB/s sind das 4 bis 40 ms, unter einer Lantern-Stufe (75 ms).
- **Warum nicht übernommen:** Der Pixelvergleich mit M5 (`…/leist4/pixel-m5/`) zeigt 14 von 48 Paaren mit Abweichung (m390 und d1440, `/referenzen` auch t768).
  - Gegenprobe mit unsichtbaren Bildern (`…/leist4/werk/ohnebilder.mjs`): Auf `/` m390 und auf `/bad`, `/bad/barrierefreies-bad` und `/leistungen` d1440 bleiben 33.619 bis 260.796 Pixel.
  - Ursache: Die Seite verschiebt sich um Bruchteile eines Pixels. Das geladene Bild bestimmt das Seitenverhältnis des Kastens, und die kleinere Variante hat eine anders gerundete Höhe; die Seitenhöhe ändert sich um ±0,4 px.
  - Das ist eine (kleine) sichtbare Änderung im Ruhezustand, und der Gewinn liegt unter der Messauflösung.
- **Optionaler Vermerk zu `next.config.ts`:**
  - Ziel: genauere Breite ohne Qualitätsverlust.
  - Wirkung: auf jeder Route bei jedem Bild mit `sizes`, wenn der Bedarf in (640, 680] liegt; das HTML wächst um 85 bis 170 B gz je Seite (ein Eintrag mehr je `srcset`).
  - Regelreihenfolge: nicht berührt.
  - Rückweg: Zeile löschen.

## 4 · Nicht umgesetzt (Begründung)

- **4 · Dokumentstufe:** Kein billiger, inhaltsgleicher Hebel ohne Umbau belegt (Kundschafter 5.5); Maßnahme 1 kostet +0,1 bis +0,2 KB gz, Maßnahme 3 auf `/blog` +2,9 KB gz. Keine Ansicht und keine Beitragsseite kreuzt dadurch eine Stufe (mit Kopfzeilen: `/kontakt` 39.585 B und `/blog/fliesenleger-gesucht-geselle-meister` 42.432 B unter 43.800 B wie vorher; alle übrigen bleiben zwischen 43.800 und 74.460 B). Brotli-Zweitmessung beim Orchestrator (E-085).
- **5:** siehe 3.4.
- **6 · gemeinsame Skriptposten:** Kopf, Menü, Leiste und Navigation sind gemeinsame Dateien. Wirkung unsicher (rund 9 KB gz erreichbar), kein Beleg im Bündel erhoben. Die Nebenwirkung von 3 spart auf allen Ansichten schon eine Anfrage und 1,8 KB gz.
- **7:** laut Entscheidung 6 nicht umgesetzt (Navigation, B-01).
- **8 · Plex-Ersatz:** Ohne Messung in der Lighthouse-Umgebung ist nicht belegt, welche Ersatzschrift dort greift. Die Metriken in `globals.css` Z. 243 ff. bestehen schon; keine sichere Änderung ohne Beleg.
- **9 · Kopfskript vor dem Stylesheet:** nicht ohne Umweg. React stellt Vorladehinweise und Stylesheets vor die Kinder von `<head>`; das zeigt auch der neue `<style>`, der hinter dem Stylesheet steht.
- **Reaktion (INP ≤ 200 ms):** nicht gemessen; INP steht in keinem Rohbericht (Navigationsmessung, `ursache.md` 1 und 8.7). Der Orchestrator fährt `werkzeuge/reaktion.mjs` gegen die Hauptansichten. Erwartung: Maßnahme 1 berührt keine Interaktion. Maßnahme 2 ändert nur den Zeitpunkt des Einblendens: Das Rendern des Banners (gleiche Arbeit wie vorher) rückt um 400 ms näher an die Hydrierung; ob es dort mit einer frühen Eingabe zusammenfällt, zeigt `reaktion.mjs`. Maßnahme 3 nimmt auf `/blog` rund 64 KB gz Skript aus dem Start; die Handler von Suche und Filter sind unverändert. Eine Verschlechterung ist nicht zu erwarten, eine Verbesserung nicht belegt.
- **Platzhalterhöhe von `spaet-zeichnen` (50rem, PLAN-Zeile, E-087):** von `ursache.md` nicht als Ursache einer Budgetverfehlung belegt (Stichwort dort nicht genannt; CLS ist überall 0), ein axe-Messartefakt ohne Lighthouse-Wirkung. Nicht angefasst; offen für den Orchestrator (Abschnitt 7).
- **App-Stück der Einwilligung (E-085, G8, „nur ohne Verhaltensänderung“):** zugeordnet zu Maßnahme 2 (Zeitpunkt des Einblendens, ohne Verhaltensänderung). Das Stück selbst (Einwilligung 3,0 KB gz und `cookie-inventory` 2,3 KB gz im gemeinsamen Stück, `ursache.md` 5.6) lädt schon per `dynamic(…, { ssr: false })` nach der Hydrierung; ein weiterer Hebel daran ist nicht belegt. Nicht weiter angefasst.

## 5 · Prüfzahlen (nach der Nacharbeit neu erhoben)

- **`npm test` (baum, ohne Bau):** 261 Tests, 260 bestanden, 0 fehlgeschlagen, 1 übersprungen (Build-Teil des neuen Tests, kein `.next` in baum). Log `…/leist4/nach-npmtest.log`.
- **`npm test` im Nachher-Bau** (mit `.next`, `_werkstatt` aus baum verlinkt, weil `bau.sh` es nicht kopiert): 261 Tests, 261 bestanden, 0 übersprungen. Log `…/leist4/nacharbeit/nachbau-npmtest.log`.
- **`test/stylesheets.test.mjs`:** im Nachher-Bau 3/3 bestanden; im Vorher-Bau 3/3 rot (Gegenprobe); Mutationsproben der Quellprüfung je rot (3.1).
- **`npx tsc --noEmit`** (mit vorübergehender `next-env.d.ts`, danach gelöscht): 0 Fehler.
- **`npx eslint .`** (ganzes Projekt): 0 Fehler, 0 Warnungen.
- **`werte.mjs --arbeitsbaum --dateien`** (8 geänderte Dateien unter `src/`, Werkzeug-Kopie in baum): 0 Befunde (`…/leist4/nacharbeit/werte/2026-10-30T17-04-07-829Z.json`). Die erste Fassung meldete hier 1 Befund (`farbe_literal` `#F4F4F5`, `themeColor`); das war ein Fehler des Aufrufs: Ich hatte das Werkzeug des Repos mit Pfaden außerhalb des Repos aufgerufen, und die Zeilenausnahme `themeColor` in `werte-regeln.json` greift nur auf Repo-relative Pfade. Richtig ist 0.
- **`npx next build`:** läuft durch (vorher 24 s, nachher 22 s; mit GA4-Platzhalter 25 und 24 s), keine Warnung, Routenliste vorher gleich nachher (179 Seiten).
- **Pixelvergleich 100 %** (`pixelvergleich.mjs --hauptansichten`, 4461 gegen 4460, ohne parallele Last): 48 Paare, 0 abweichende Pixel, alle Seitenhöhen gleich (`…/leist4/nacharbeit/pixel/pixelvergleich.json`). Drei Beitragsseiten (`fliesenleger-gesucht-geselle-meister`, `handwerkerbonus-fliesenarbeiten`, `rutschfeste-fliesen-r-klassen`) auf m390 und d1440: 6 Paare, 0 Pixel (`…/leist4/nacharbeit/pixel-artikel/`). Erste Fassung: 48 Paare, 0 Pixel (`…/leist4/pixel/`); mit Option M5 14 Paare mit Abweichung (`…/leist4/pixel-m5/`, siehe 3.4).
- **Einwilligung und Tracking** (Bauten mit `NEXT_PUBLIC_GA4_ID=G-TEST000000`, `RELAUNCH_TRACKING=1`): `funktion-einwilligung` und `funktion-tracking` je 44 bestanden, 0 übersprungen, reduziert und mit Bewegung, vorher und nachher (`…/leist4/nacharbeit/specs/pw-446{0,1}-{reduziert,an}.log`).
- **Navigation und Weiterleitungen** (nachher, GA4-Bau): 51 bestanden, 5 übersprungen (projektbedingt: Kopf-Navigation mobil ausgeblendet, Inhaltsverzeichnis mobil ausgeblendet), reduziert und mit Bewegung.
- **`/blog` mit Überschreibungen:** vorher gleich nachher (3.3); Beitragsseiten vorher gleich nachher.

### HTML je Hauptansicht (Nacharbeit; gzip-Körper; vorher → nachher)

„Skripte im HTML“ zählt das `nomodule`-Stück (39.627 B gz) mit; „geladen“ ohne es, so wie Chromium und Lighthouse laden. Vorladehinweise auf allen Ansichten vorher gleich nachher (Schrift, Bilder, Skript).

| Ansicht | Stylesheets n | Skripte im HTML n (gz B) | davon geladen n (gz B) | Dokument gz B | mit Kopfzeilen B |
|---|---|---|---|---|---|
| / | 2 → 1 | 12 → 11 (224.037 → 222.263) | 11 → 10 (184.410 → 182.636) | 60.769 → 60.919 (+150) | 62.464 → 62.615 |
| /bad | 2 → 1 | 13 → 12 (233.349 → 231.575) | 12 → 11 (193.722 → 191.948) | 54.023 → 54.190 (+167) | 55.718 → 55.885 |
| /bad/badsanierung | 2 → 1 | 13 → 12 (227.588 → 225.814) | 12 → 11 (187.961 → 186.187) | 53.172 → 53.277 (+105) | 54.867 → 54.972 |
| /bad/barrierefreies-bad | 2 → 1 | 13 → 12 (227.588 → 225.814) | 12 → 11 (187.961 → 186.187) | 49.152 → 49.263 (+111) | 50.847 → 50.959 |
| /leistungen | 2 → 1 | 12 → 11 (229.582 → 227.808) | 11 → 10 (189.955 → 188.181) | 56.201 → 56.336 (+135) | 57.897 → 58.031 |
| /fliesen | 2 → 1 | 14 → 13 (238.873 → 237.099) | 13 → 12 (199.246 → 197.472) | 53.654 → 53.827 (+173) | 55.350 → 55.522 |
| /balkon-terrasse | 2 → 1 | 12 → 11 (220.171 → 218.397) | 11 → 10 (180.544 → 178.770) | 58.805 → 58.948 (+143) | 60.501 → 60.643 |
| /referenzen | 2 → 1 | 12 → 11 (225.171 → 223.397) | 11 → 10 (185.544 → 183.770) | 59.163 → 59.331 (+168) | 60.859 → 61.026 |
| /ueber-uns | 2 → 1 | 11 → 10 (219.844 → 218.070) | 10 → 9 (180.217 → 178.443) | 53.622 → 53.779 (+157) | 55.317 → 55.475 |
| /kontakt | 2 → 1 | 12 → 11 (227.956 → 226.182) | 11 → 10 (188.329 → 186.555) | 37.721 → 37.890 (+169) | 39.416 → 39.585 |
| /standorte/wetzlar | 2 → 1 | 12 → 11 (223.630 → 221.856) | 11 → 10 (184.003 → 182.229) | 48.619 → 48.770 (+151) | 50.314 → 50.465 |
| /blog | 2 → 1 | 14 → 12 (293.301 → 229.355) | 13 → 11 (253.674 → 189.728) | 47.630 → 50.564 (+2.934) | 49.325 → 52.259 |
| /blog/[slug] (13, je gleich) | 2 → 1 | 14 → 11 (287.952 → 223.182) | 13 → 10 (248.325 → 183.555) | +30 bis +44 | höchstens 50.980 (`rutschfeste-fliesen-r-klassen`) |

Stylesheet je Seite vorher: `0nxicmqezp7pl.css` (478 B roh) und `3vic8i9diekr2.css` (136.490 B roh), zusammen 136.968 B roh, 24.119 B gz; nachher nur `3vic8i9diekr2.css`, 23.641 B gz. Kopfzeilen der Dokumentantwort rund 1.695 B (aus den Kopfzeilen von `next start` gerechnet).

## 6 · Erwartung je Ansicht (nachprüfbar)

Gemeinsam für alle 12 Ansichten:
- render-blockierende Anfragen 2 → 1: `render-blocking-insight` nennt nur noch `3vic8i9diekr2.css`, rund 25,3 KB statt 27,3 KB Übertragung mit Kopfzeilen (Lighthouse-Zahlen der Grundmessung: 25.278 + 2.056 B);
- im Graphen eine Anfrage weniger für CSS und eine für Skripte (Lighthouse lädt das `nomodule`-Stück nicht; geladene Skripte z. B. auf `/` 11 → 10);
- FCP mobil −145 ms (Lantern-Zahl, belegt für `/` aus 4324/4325, Stufe 1,36 → 1,21 s; `/kontakt` 1,21 → etwa 1,06 s); im echten Browser ist nur die Zahl der Anfragen belegt;
- LCP 0 bis −80 ms aus Maßnahme 1 (Nachbau des Kundschafters, nicht sicher);
- Leistung +0,1 bis +0,7;
- CLS und TBT unverändert, außer wo genannt; INP nicht gemessen (Abschnitt 4).

| Ansicht | Prüfbar im Bau | Erwartung Lighthouse mobil (Median) |
|---|---|---|
| / | CSS 2 → 1, JS im HTML 12 → 11 (geladen 11 → 10), Dok +150 B | FCP 1,36 → 1,21 s; LCP 2,85 → 2,77 bis 2,85 s; Leistung 94 → 94 bis 95 |
| /bad | CSS 2 → 1, JS 13 → 12 (geladen 12 → 11) | FCP −145 ms; LCP 3,14 → 3,06 bis 3,14 s; 93 → 93 bis 94 |
| /bad/badsanierung | CSS 2 → 1, JS 13 → 12 (geladen 12 → 11) | FCP −145 ms; LCP 3,13 → 3,05 bis 3,13 s; 92 → 92 bis 93 |
| /bad/barrierefreies-bad | CSS 2 → 1, JS 13 → 12 (geladen 12 → 11) | FCP −145 ms; LCP 3,00 → 2,92 bis 3,00 s; 93 → 93 bis 94 |
| /leistungen | CSS 2 → 1, JS 12 → 11 (geladen 11 → 10) | FCP −145 ms; LCP 3,01 → 2,93 bis 3,01 s; 94 → 94 bis 95 |
| /fliesen | CSS 2 → 1, JS 14 → 13 (geladen 13 → 12) | FCP −145 ms; LCP (Text) 3,01 → 2,93 bis 3,01 s; 92 → 92 bis 93 |
| /balkon-terrasse | CSS 2 → 1, JS 12 → 11 (geladen 11 → 10); Foto bleibt w=750 (50.112 B) | FCP −145 ms; LCP 3,00 → 2,93 bis 3,00 s; 93 → 93 bis 94 (mit Option M5 weitere −8,3 KB Foto) |
| /referenzen | CSS 2 → 1, JS 12 → 11 (geladen 11 → 10) | FCP −145 ms; LCP 2,86 → 2,80 bis 2,86 s; 95 → 95 |
| /ueber-uns | CSS 2 → 1, JS 11 → 10 (geladen 10 → 9) | FCP −145 ms; LCP 3,00 → 2,92 bis 3,00 s; 94 → 94 |
| /kontakt | CSS 2 → 1, JS 12 → 11 (geladen 11 → 10), Dok 39.585 B mit Kopfzeilen (unter 43.800) | FCP 1,21 → etwa 1,06 s; LCP 2,79 → 2,71 bis 2,79 s; 95 → 95 bis 96 |
| /standorte/wetzlar | CSS 2 → 1, JS 12 → 11 (geladen 11 → 10); Banner ein Bild nach dem Einhängen statt +400 ms | LCP-Element bleibt der Bannertext (`p#cookie-consent-description > span.block`). Beobachteter LCP 807 bis 835 → etwa 410 bis 450 ms (Hydrierungsende plus ein Bild; vorher 807 bis 835 minus 400 = 407 bis 435 ms). Graph kleiner (Nachbau „Grenze 400 ms“: 29 statt 45 Anfragen, weniger Prefetch-Abrufe). Simuliert 4,88 → etwa 3,8 s (Nachbau 3.816 ms); Leistung 79 → etwa 84 bis 86 (nachgerechnet: LCP-Wert 0,29 → 0,55, mal 0,25 gleich +6,5 Punkte). **Nicht ≥ 90: Budgetabweichung**, Abschnitt 7 Punkt 1 |
| /blog | CSS 2 → 1, JS im HTML 14 → 12 (geladen 13 → 11, −63.946 B gz), Dok +2.934 B gz (gleiche Stufe) | eigene Skripte im Graphen 76,5 → 11 KB: LCP 3,46 → etwa 3,0 bis 3,15 s (Nachbau −300 bis −390 ms, dazu Maßnahme 1); TBT 200 → etwa 130 bis 160 ms; Leistung 89 → etwa 92 bis 94 |
| /blog/[slug] (keine Hauptansicht; bei der Messung einen mitnehmen, z. B. `fliesenleger-gesucht-geselle-meister`) | CSS 2 → 1, JS im HTML 14 → 11 (geladen 13 → 10, −64.770 B gz), Dok +30 bis +44 B gz | FCP −145 ms; weniger Skript im Graphen; keine Stufe gekreuzt (42.432 B mit Kopfzeilen) |

**Prüfkriterien Wetzlar nach der Messung:** Trägt die Annahme „Grenze 400 ms“ des Nachbaus, dann liegt `observedLargestContentfulPaint` im Medianlauf bei etwa 410 bis 450 ms und der LCP-Graph bei rund 29 Anfragen; der simulierte LCP dann bei etwa 3,8 s. Liegt der beobachtete LCP deutlich höher, wächst der Graph wieder und die Erwartung 84 bis 86 sinkt.

LCP ≤ 2,5 s erreicht nach dem Nachbau des Kundschafters keine Ansicht (React DOM und Laufzeit im Graphen, G7). Die Entscheidung über A-1 liegt beim Orchestrator (Entscheidung 7).

## 7 · Offene Punkte

1. **Budgetabweichung Wetzlar und alle Ortsseiten (Leistung ≥ 90 verfehlt):**
   - Mit den zulässigen Mitteln (früheres Zeichnen nach Entscheidung 2, keine Teilung der Textblöcke) bleibt der Banner LCP-Element. Erwartet ist Leistung 84 bis 86, nicht 90.
   - Frage an den Orchestrator: entweder die Teilungsvariante aus `ursache.md` (6, Nr. 2: Wortlaut, Knöpfe und Wirkung gleich; Nachbau 3.255 ms, 90 bis 92) gegen G7 abwägen und freigeben, oder die Abweichung als Budgetausnahme führen. Weitere Hebel wären ein serverseitig gezeichneter Banner, den ein Kopfskript für Wiederbesucher ausblendet; nicht freigegeben.
   - Nach der Messung die Prüfkriterien aus Abschnitt 6 abgleichen.
2. **Tracking:** erledigt in der Nacharbeit. Die acht Tracking-Fälle laufen gegen einen Bau mit `NEXT_PUBLIC_GA4_ID=G-TEST000000` und `RELAUNCH_TRACKING=1` ohne Nacharbeit grün (44/0 vorher und nachher). Vorschlag: diesen Bau ins Tor aufnehmen.
3. **Option M5** (`UM-E4-LEISTUNG-M5-option.diff`): übernehmen nur, wenn die Pixelverschiebungen um Bruchteile eines Pixels (Seitenhöhe ±0,4 px) unter und neben Fotos auf m390 und d1440 hingenommen werden. Gewinn 4 bis 40 ms (Rechnung über die Bandbreite); für echte Nutzer mit DPR 3 lädt das Einstiegsfoto eine Stufe kleiner.
4. **Gemeinsame Dateien im Diff und KERN:**
   - `package.json` (neuer Test in der Liste von `npm test`) und `test/stylesheets.test.mjs`. Der Build-Teil des Tests läuft nur, wenn ein Produktionsbau in `.next` liegt; im Reinraum nach `next build` (so `reinraum.sh`), dort auf 0 übersprungene Tests achten.
   - KERN K-004 („Schriften `next/font/local`“) beim Anwenden anpassen, Vorschlag in 3.1, dazu ein Eintrag in `ENTSCHEIDUNGEN.md` mit Verweis auf E-097.
   - Entscheidung 2 des Orchestrators (Wortlaut in 3.2) in `ENTSCHEIDUNGEN.md` nachtragen.
5. **Nebenwirkung Stückbildung:** Das Zusammenlegen der zwei gemeinsamen Skriptstücke kommt aus Maßnahme 3 (Probe-Bau des Prüfers). Bitte im Reinraum-Bau gegenprüfen: 11 statt 12 Skripte im HTML auf `/` (10 statt 11 geladen).
6. **`spaet-zeichnen` (50rem, E-087):** nicht Teil dieser Maßnahmen, von `ursache.md` nicht belegt; offen, ob ein eigenes Paket es aufnimmt.
7. **Hydrierungsfehler #418 auf `/blog` bei Überschreibungen aus localStorage:** Bestand (HEAD gleich), nicht durch dieses Paket entstanden und hier nicht behoben (G9, keine Logikänderung). Betrifft nur Besucher mit Überschreibungen (Admin).

## 8 · Nacharbeit nach der Prüfung (zwei Linsen, 9 Befunde)

| # | Schwere | Befund (kurz) | Nachgeprüft | Umgang |
|---|---|---|---|---|
| 1 | mittel | Maßnahme 2 ist nicht die belegte Variante von `ursache.md` (Teilung), Wetzlar bleibt unter 90; „Entscheidung 2“ in keiner Datei zu finden | bestätigt: Rechnung stimmt (84 bis 86); die Entscheidung steht im Bau-Auftrag (Workflow), nicht in den Werkstattdateien | Quelle und Wortlaut in 3.2, Variantenvergleich, Wetzlar als Budgetabweichung mit Prüfkriterien (6, 7.1). Die Teilung selbst nicht gebaut: Entscheidung 2 untersagt sie, freigeben kann nur der Orchestrator |
| 2 | gering | Geltungsbereich von Maßnahme 2 zu eng, G7 je Maßnahme fehlt, FCP −145 ms ist Lantern | bestätigt (`ClientWidgets` in `_dokument.tsx`) | 2, 3.1, 3.2, 3.3 und 6 ergänzt |
| 3 | gering | Maßnahme 3 belastet die 13 Beitragsseiten (+2,4 KB gz Dokument, ein Beitrag über der Stufe) und legt ein Layout-Segment an | bestätigt (eigener Bau der ersten Fassung, Zahlen des Prüfers) | **behoben im Code:** Speicher aus dem Layout in `page.jsx` um `BlogFilter`; Beitragsseiten jetzt +30 bis +44 B gz, Skripte 14 → 11; `/blog` +454 B gz mehr als in der ersten Fassung (3.3) |
| 4 | gering | Skriptzahlen zählen das `nomodule`-Stück mit | bestätigt (39.627 B gz, `noModule`) | Tabelle in 5 mit beiden Zählweisen, Erwartung in 6, Punkt 7.5 „im HTML“ |
| 5 | gering | Beleg für Weg (a) fehlt in der Notiz | bestätigt | eigener Probe-Bau, eine Zeile mit Konfiguration und Ergebnis in 3.1 |
| 6 | gering | Build-Teil der Absicherung wird ohne Bau still übersprungen; Quellteil kennt nur `.css`-Importe am Zeilenanfang | bestätigt | Quellteil erweitert (dynamisch, `require`, `.scss`/`.sass`/`.less`, Abfrage; Mutationsproben rot), Kopfkommentar und 3.1 nennen, wo der Build-Teil greift; Überspringen ohne Bau bleibt (sonst wäre `npm test` ohne Bau rot) |
| 7 | gering | INP, `spaet-zeichnen` und App-Stück der Einwilligung fehlen in der Notiz | bestätigt | je ein Absatz in 4, Punkte 7.6 |
| 8 | gering | Abweichung von KERN K-004 (`next/font/local`) nicht genannt | bestätigt (KERN Zeile 55) | Abweichung und Formulierungsvorschlag in 3.1, Punkt 7.4; KERN schreibt der Orchestrator |
| 9 | gering | `werte` meldet 0 Befunde, nicht 1; Tracking-Fälle laufen mit GA4-Platzhalter | bestätigt (Ursache: Aufruf mit Pfaden außerhalb des Repos) | Zahl in 5 berichtigt (0); GA4-Bauten gefahren, 44/0 vorher und nachher |

Dabei selbst gefunden und berichtigt: Die erste Fassung schrieb „keine Seitenfehler“ für den `/blog`-Vergleich; im Fall „Überschreibung vor dem Laden“ steht vorher wie nachher ein Hydrierungsfehler #418 (3.3, 7.7).
