# UM-E3-LEISTUNG · Notiz (Kundschafter und Baumeister, Arbeitskopie)

Ursache mit Belegen: `…/scratchpad/leist/ursache.md`. Modell und Skripte: `…/scratchpad/leist-skripte/`. Skripte und Ausgaben der Nacharbeit: `…/scratchpad/leist-nach/`.

## Ergebnis in drei Sätzen
- Lantern rechnet den mobilen LCP als Ende des letzten Downloads im LCP-Graphen. Das Foto ist nicht der letzte Download. Der Graph enthält alles, was im ungedrosselten Lauf vor dem Malen fertig ist: 367 KB, davon 194 KB Skripte.
- Den Ausschlag geben drei Dinge:
  - React DOM (71 KB) und die Next-Laufzeit (46 KB), sobald sie vor dem beobachteten Malen ausgewertet werden;
  - die Schriften (72 KB), die sich die Leitung mit React DOM teilen;
  - ein Dokument von 54.296 B, das in der Rechnung eine Rundreise über der Stufe von 43.800 B liegt.
- Umgesetzt ist die einzige Maßnahme mit belegter Wirkung, die weder Inhalt noch Verhalten ändert: Archivo und Plex Mono als Teilmenge der genutzten Zeichen.
  - Erwartet ist eine gestufte Senkung je Lauf, meist −75 oder −150 ms. Schwerpunkt ist −150 ms, der Bereich reicht von 0 bis rund −220 ms. Das Vorzeichen ist stabil (Störrechnung, `ursache.md` 3.1).
  - Das Budget 2,5 s erreicht sie allein nur in Läufen ohne React DOM und ohne Laufzeit im Graphen. Das war 1 von 12 Läufen.

## Entwurf und Entscheidungen
- **Schriften als Teilmenge** (`src/app/fonts/archivo-variabel.woff2`, `src/app/fonts/plex-mono-400.woff2`):
  - Archivo 57.716 → 44.364 B, Plex Mono 13.420 → 10.692 B.
  - Zeichensatz:
    - alle Zeichen aus `.next/server/app` (HTML, RSC), `src/` und `.next/static/chunks`, geschnitten mit der bisherigen cmap;
    - dazu Buchstaben für Namen in Formularen: ç é è ê ë à â î ï ô û ù á í ó ú ñ ı œ und Großbuchstaben.
    - Arbeitsliste: `…/leist/schriften/zeichen-teilmenge.txt`, 233 Codepunkte. Wirksam sind nach dem Schnitt mit der alten cmap 169 (Archivo) bzw. 165 (Plex Mono). Die Liste kommt nicht ins Repository. `LIZENZEN.md` beschreibt, wie sie aus der cmap der aktuellen Datei entsteht.
  - Behalten: Achsen (wght 400–800, wdth 74–100), alle OpenType-Merkmale, Kerning, alle Namens-IDs, Hinting.
  - Gleich geblieben sind auch hhea/OS/2-Metriken, `fvar`, `avar` und `STAT`.
  - Gegenprobe `…/leist/schriften/vergleich.py`:
    - Umrisse (zerlegt), Vorschübe und Kerning-Paare aller 169 bzw. 165 behaltenen Zeichen sind gleich, bei sieben Instanzen von Archivo und statisch bei Plex.
    - 0 Abweichungen. Rund 1.400 Kerning-Paare je Instanz sind geprüft.
  - Abdeckung nach dem Bau: Kein Zeichen der gebauten Seiten, Quelltexte und Bündel fehlt. Einzige Meldung ist U+0000 aus `\u0000`-Escapes in drei Client-Bündeln, also kein Text.
  - Entfernt wurden 61 bzw. 58 ungenutzte Codepunkte. Die vollständige Liste steht jetzt in `LIZENZEN.md` (Nacharbeit). Darunter sind 19 Buchstaben, die Namen in Formularen brauchen können (A und O mit Tilde, A mit Ring, AE, I und O mit Gravis, Y mit Akut, y mit Trema, Eth, Thorn), dazu hoch drei, Mikro und die deutschen einfachen Anführungszeichen.
- **`LIZENZEN.md`**:
  - Herkunft und Verfahren;
  - die vollständige Liste der entfernten Codepunkte, als bewusste Abweichung;
  - ein Neubau in vier Schritten: Liste aus der cmap der aktuellen Datei, Quelle ist die volle Datei aus Commit 8bad2284, dann `pyftsubset`. Mit unveränderter Liste ergibt das Verfahren beide Dateien Byte für Byte neu (geprüft).
  - Die Codepunkte stehen als `U+XXXX`, damit die Datei selbst kein entferntes Zeichen enthält.
- **Nicht umgesetzt, mit Grund** (Zahlen in `ursache.md`, Abschnitt 3):
  - Dokument kleiner: Die Stufe verlangt −10,5 KB gzip. Kopf und JSON-LD sind zusammen < 6 KB, darunter wirkt die Kürzung 0 ms.
  - CSS, App-Stück `43ze` (Einwilligung, G8), Foto w=640, Sprite, Logo-Vorladen: nach den Schriften 0 ms, solange React DOM im Graphen steht.
  - Vorladen und Priorität des Fotos sind schon richtig. Preload und `<img>` haben dieselben `imageSrcSet`/`imageSizes`, das Foto wird einmal geladen.
  - `sizes` wählt in der Lighthouse-Emulation (412 px, DPR 1,75) weiter w=750. Auf echten Telefonen gilt das nicht immer (Nacharbeit):
    - Bei 390 px und DPR 3 verlangt `100vw` 1.170 px, gewählt wird w=1200. Dargestellt sind 356 px, dafür würde w=1080 reichen. `100vw` zieht Rand (`px-4`) und Rahmen nicht ab.
    - Bei 360 px/DPR 3, 390 px/DPR 2,625 und 375 px/DPR 2 ist die Wahl schon die kleinste passende.
    - In diesem Paket gibt es keinen Eingriff: `EinstiegMitte.tsx` gehört nicht dazu, und die Messung ändert sich nicht.
    - Optional später: unter 640 px `calc(100vw - 2rem)`. Lighthouse bliebe bei w=750, 390 px mit DPR 3 käme auf w=1080.
  - Inline-CSS (V1) und Schrift ohne Vorladen (V2) sind schon gemessen schlechter (E-064).
  - Mehr Zeichen in der Teilmenge (die 19 Buchstaben für Namen): kostet in der Rechnung die Hälfte der Wirkung, siehe Offene Frage 3.
- **Keine Änderung** an Code, Einwilligung, Tracking, `/api/anfrage`, B-01, Eingang, Bewegungsschalter, Logo, `next.config.ts`, Bildfeld, Startbild.

## Nacharbeit nach der Prüfung (28.10.2026)
- Erwartung für den LCP: als Bereich mit Schwerpunkt, Median je Satz und Prüfkriterium. Grundlage ist eine eigene Störrechnung (`ursache.md` 3.1).
- Das Budget erreichen nur Läufe ohne React DOM **und** ohne Laufzeit. Der Wortlaut ist jetzt wie in `ursache.md` §3.
- `unused-javascript` nach den Schriften: Mit allen Skripten sagt das Modell 264 ms voraus, nicht 150.
  - Lighthouse rundet auf 10 ms (`byte-efficiency-audit.js`), nicht auf 50.
  - Die Erwartung ist angepasst.
- Leistungswert: „+1 Punkt gegenüber dem jeweiligen Lauf“ statt falscher Absolutwerte. Die Läufe der 3,2-s-Klasse haben 93, 90 und 92.
- `sizes` (siehe oben): Die Aussage gilt nur für die Lighthouse-Emulation. Der Code bleibt, wie er ist.
- `ursache.md`:
  - neuer Abschnitt 2.5 mit der beobachteten Zerlegung: Render-Verzögerung 107 bis 160 ms, 52 bis 68 % des beobachteten LCP;
  - „Wettlauf nicht steuerbar“ ist dort jetzt eine offene Annahme;
  - Abschnitt 3.1 mit der Störrechnung.
- `LIZENZEN.md`: das Verfahren ohne Scratchpad-Liste und alle entfernten Codepunkte (Befunde zu Neubau und Formularbuchstaben).

## Prüfzahlen (Arbeitskopie, neu erhoben in der Nacharbeit)
- `npm test`: 248 von 248 bestanden, 0 rot (Node 24.22.1).
- `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`: Exit 0, keine Ausgabe. Danach sind `next-env.d.ts` und `tsconfig.tsbuildinfo` gelöscht.
- `npx eslint` (ganzes Projekt): Exit 0, 0 Probleme. `LIZENZEN.md` und die woff2 liegen außerhalb der ESLint-Konfiguration. Einzeln aufgerufen meldet ESLint für `LIZENZEN.md` nur „File ignored“.
- `werte.mjs --arbeitsbaum --dateien` (LIZENZEN.md, beide woff2, `_dokument.tsx`): 4 Dateien, 0 Befunde. Der Bericht liegt unter `…/leist-nach/werte/`, nicht im Cache (`--ziel`).
- `npx next build`: läuft durch (Exit 0).
  - Kompiliert in 10,7 s, gesamt 29,5 s.
  - Gemessen mit Node-zlib, gzip Stufe 6; `vorher` ist mit derselben Methode aus `…/leist/pruef-ausgabe/next-vorher` gemessen:

| Größe | Arbeitskopie | vorher |
|---|---|---|
| HTML `/` roh | 373.459 B | 373.459 B |
| HTML `/` gzip | 52.557 B | 52.558 B |
| First-Load-JS `/` | 10 Skriptstücke, 592.840 B roh, 181.451 B gzip | gleich |
| `noModule`-Ersatz (laden moderne Browser nicht) | 39.627 B gzip | gleich |
| CSS roh | 119.334 B | 119.334 B |
| CSS gzip | 21.422 B | 21.419 B |

  - Beim CSS ändern sich nur die Schrift-URLs.
  - Die Inhaltsnamen der Skriptstücke sind gleich: `2tbu000sg63yb`, `3i7bb4yv5vlj-`, `43ze2r7l6z9o7`, `03thh847es-9q` ….
  - Schriften: `archivo_variabel.p.1ydwlacuzh1hh.woff2` 44.364 B und `plex_mono_400.1_uxhdyxlqwk7.woff2` 10.692 B.
  - Die gzip-Zahlen der ersten Fassung (52.226, 181.208, 21.416, 39.473) beruhen auf einer anderen gzip-Einstellung. Verglichen wird nur innerhalb einer Methode.
- Abdeckung (`…/leist-nach/abdeckung.py`): geprüft sind 1.216 Dateien aus `.next/server/app`, 500 aus `src/`, 4 aus `public/` und 48 Client-Bündel, mit HTML-Entitäten und `\u`-Escapes.
  - Kein Zeichen der alten Schriften fehlt in den neuen.
  - Ausnahme ist U+0000 (Plex Mono) aus `\u0000` in drei Bündeln, kein Text.
- Verfahren aus `LIZENZEN.md` nachgespielt (`…/leist-nach/verfahren/`): Beide Dateien entstehen Byte für Byte gleich.
- Hinweis zum Bau: Turbopack löst ein verlinktes `node_modules` außerhalb der Projektwurzel nicht auf. Für den Bau lag deshalb eine echte Kopie in `baum/node_modules`. Danach habe ich den Verweis wiederhergestellt und `.next` sowie `next-env.d.ts` gelöscht. Das Repository blieb unverändert (`git status` leer).

## Nachprüfbare Erwartung für die Messung (Lighthouse mobil `/`, gleiche Methode wie `belege/um-e3-w3`)
- Übertragung (sicher, Dateigrößen):
  - Archivo 59.261 → rund 45.900 B, Plex Mono 14.965 → rund 12.240 B.
  - `font_kb` 72 → 57, `gesamt_kb` 425 → rund 410.
  - `js_kb` 198 unverändert, Dokument 54.296 B unverändert (±20 B).
- LCP je Lauf (Rechnung, unsicher in der Größe):
  - Die Wirkung ist gestuft: In der Rechnung ist sie 0, −75 oder −150 ms, ohne React DOM auch rund −200 ms.
  - Schwerpunkt ist −150 ms in der häufigsten Klasse. Über alle Läufe ergibt die Störrechnung im Mittel rund −120 ms.
  - Das Modell liegt in drei Klassen 18 bis 115 ms über der Messung. Die Klasse eines Laufs ist erschlossen, nicht beobachtet.

| Klasse (bisher, Läufe) | Wirkung in der Störrechnung (p10 bis p90) | erwarteter LCP |
|---|---|---|
| 2,92 bis 3,01 s (React DOM, ohne Laufzeit; 7 von 12) | −150 bis −75 | rund 2,77 bis 2,94 s |
| 3,22 bis 3,23 s (alle Skripte; 3 von 12) | −150 bis −75, selten 0 | rund 3,07 bis 3,16 s |
| 2,79 s (ohne React DOM; 1 von 12) | −207 bis −75 | rund 2,58 bis 2,71 s |
| 2,56 s (ohne beide; 1 von 12) | −146 bis −126 | rund 2,42 bis 2,44 s |

- Median aus drei Läufen, je nach Mischung der Klassen:
  - wie Satz nach-a (zwei 2,9-s-Läufe, einer 3,2 s): rund 2,8 s (2,79 bei −145 ms, 2,86 bei −75 ms);
  - wie Satz nach-b (zwei 3,2-s-Läufe, einer 2,9 s): rund 3,1 s (3,08 bei −145 ms, 3,15 bei −75 ms).
  - In beiden Fällen bleibt er über 2,5 s.
- Prüfkriterium:
  - Kein Lauf ist schlechter als seine bisherige Klasse. Insbesondere liegt kein Lauf über 3,24 s, und kein Lauf mit `unused-javascript` LCP 0 liegt über 2,79 s.
  - Im Mittel liegt die Senkung bei rund −75 bis −150 ms.
  - Ein einzelner Wert von −75 oder −200 ms ist weder ein Fehlschlag noch ein Zeichen einer falschen Diagnose.
- Leistung: +1 Punkt gegenüber dem jeweiligen Lauf.
  - Nachgerechnet mit den Bewertungskurven von Lighthouse 13.5, alle übrigen Metriken des Laufs unverändert.
  - Bei −145 ms gewinnen alle 12 Läufe 1 Punkt: nach-a 93/93/93 → 94/94/94, nach-b 90/92/93 → 91/93/94.
  - Bei −75 ms bleiben einzelne Läufe gleich, bei −210 ms gewinnen einige 2 Punkte.
  - nach-b 0 liegt mit 0,900 genau auf der Grenze.
  - TBT und FCP bleiben in der Streuung, CLS bleibt 0.
- `unused-javascript` (LCP-Ersparnis) als Kennzeichen der Struktur:
  - 0 ms heißt weiter: React DOM steht nicht im Graphen.
  - Mit React DOM sind nach den Schriften 150 ms oder 250 bis 300 ms zu erwarten.
  - Im Modell: ohne Laufzeit meist 150 ms. Mit allen Skripten ungestört 264 ms, gestört je etwa zur Hälfte 130 bis 150 ms und 250 bis 300 ms.
  - Ein Wert über 150 ms zeigt also keine geänderte Struktur an.
- Die Schriften gelten auf allen Seiten. Auf dem Ratgeber und den übrigen Hauptansichten ist eine ähnliche Senkung zu erwarten; das habe ich nicht modelliert.

## Übernahme ins Repository
- `UM-E3-LEISTUNG.diff`: das vorgeschriebene `diff -ruN`, zusätzlich mit `--exclude=.next`, neu erzeugt nach der Nacharbeit. Die woff2-Dateien erscheinen dort nur als „Binary files … differ“.
- Die Schriften lassen sich auf zwei Wegen übernehmen:
  - `UM-E3-LEISTUNG.binaer.diff` (`git diff --no-index --binary`, nur lesend erzeugt):
    - neu erzeugt, mit der neuen `LIZENZEN.md`;
    - in einer Scratch-Kopie mit `git apply -p2` geprüft (`…/leist-nach/applytest`): Ergebnis gleich `baum`, Prüfsummen gleich;
    - anwenden aus der Repo-Wurzel mit `git apply -p2 …/leist/UM-E3-LEISTUNG.binaer.diff`.
  - Oder die Dateien aus `…/leist/schriften/` kopieren (die Dateien sind in der Nacharbeit unverändert):
    - `archivo-variabel.woff2`, sha256 `5bc05b82a80e885dab90ced8ca4886908227c59484745af340924f043dfe67d0`
    - `plex-mono-400.woff2`, sha256 `cacda6313ce10f783792d99f1b1ee2e7517d5fde01c75aaf40c1724258af3827`
    - `LIZENZEN.md` dann aus `…/leist/baum/src/app/fonts/` nehmen.
- In der PLAN-Zeile als „weitere Stellen“ eintragen: `src/app/fonts/archivo-variabel.woff2`, `src/app/fonts/plex-mono-400.woff2`, `src/app/fonts/LIZENZEN.md`.

## Offene Fragen
1. **Budget 2,5 s:** Mit den Schriften allein ist es nicht sicher erreichbar, nur in der Klasse ohne React DOM und ohne Laufzeit (bisher 1 von 12 Läufen).
   - Der Rest liegt an React DOM und der Laufzeit im Graphen und an der Stufe des Dokuments.
   - Ob die Seite den Wettlauf im beobachteten Lauf beeinflussen kann, ist offen (siehe Frage 6).
   - Mögliche Wege, alle mit Entscheidung:
     - (a) Dokument ≤ 43.800 B über gebündelte Klassenketten im Designsystem. Klassen machen 7,7 + 5,3 KB gzip in HTML und RSC aus. Wirkung −150 ms, Aufwand groß, Dateien des Orchestrators.
     - (b) Messung wie in Produktion mit Brotli. Das Dokument hätte dann 30 bis 35 KB, Wirkung −150 ms. Das ist eine Frage der Methode, nicht der Seite.
     - (c) Begründete Abweichung vom Budget.
2. **Wächter für die Zeichen:** Kein Test merkt, wenn ein neuer Text ein Zeichen außerhalb der Teilmenge braucht. Dann setzt die Ersatzschrift das Zeichen.
   - Wäre ein Test in einem späteren Paket gewünscht, das die Testkonfiguration besitzt? Er könnte die cmap lesen, etwa über Node-zlib (Brotli) oder mit einem erweiterten `glyphen.mjs`, und sie mit den Zeichen aus `src/` und den gebauten Seiten vergleichen.
   - `LIZENZEN.md` müsste er auslassen, denn sie nennt Zeichen, die die Schrift bewusst nicht hat.
   - Vorlage: `…/leist-nach/abdeckung.py`.
3. **Eingaben in Formularen:** Zeichen außerhalb der Teilmenge erscheinen in der metrisch angepassten Ersatzschrift. Das betrifft ã å æ ò õ ý ÿ ð þ und die übrigen Buchstaben in `LIZENZEN.md`, wie bisher schon ş und ğ. Ist das nach K-006 so in Ordnung?
   - Entscheidungsgrundlage (Nacharbeit, `…/leist-nach/font/`, `varianten.mjs`), LCP im Modell je Klasse (ohne React DOM / ohne Laufzeit / ohne beide / alle):

| Variante | Archivo | Plex Mono | LCP im Modell (ms) |
|---|---|---|---|
| vorher | 57.716 B | 13.420 B | 2874 / 3030 / 2574 / 3330 |
| jetzt | 44.364 B | 10.692 B | 2730 / 2880 / 2430 / 3180 |
| + 19 Buchstaben für Namen | 48.488 B (+4.124) | 11.368 B (+676) | 2730 / 2955 / 2499 / 3255 |
| + dazu ³ µ ‚ ‘ ” ® ™ £ ′ ″ | 50.076 B | 12.032 B | 2736 / 3030 / 2574 / 3330 |

   - Die Buchstaben kosten also in der häufigsten Klasse die Hälfte der Wirkung. Mit den Zeichen dazu ist die Wirkung dort ganz weg.
   - Ein Weg ohne diese Kosten wäre eine kleine Ergänzungsschrift mit `unicode-range`. Der Browser lädt sie nur, wenn ein solches Zeichen vorkommt. Sie berührt `_dokument.tsx` und die Schrift-Tokens, also Dateien des Orchestrators. Nicht gebaut.
4. **Kopfskript nach dem Stylesheet:**
   - React setzt die Ressourcen vor die Kinder des Kopfes. Das Inline-`KOPFSKRIPT` steht deshalb nach `<link rel="stylesheet">` und hält den Parser im Kopf an, bis das CSS da ist.
   - Lantern bildet das nicht ab, für echte Nutzer beginnt das Lesen des Body aber erst danach.
   - Ich habe es nicht angefasst (E-080, Bewegungsschalter). Ist ein eigenes Paket gewünscht?
5. **`berichte/UM-E3-LCP-K.md`, Hebel H1:** Er liest `lcpLoadDelay`/`lcpLoadDuration` als Dauern. Es sind beobachtete Zeitstempel × LCP_sim/LCP_beob (`lcp-breakdown.js`). Soll der Bericht einen Vermerk bekommen?
6. **Render-Verzögerung (neu, `ursache.md` 2.5):**
   - Im beobachteten Lauf ist das Foto nach 75 bis 118 ms fertig, gemalt wird erst 107 bis 160 ms später. In diese Zeit fällt eine Hauptthread-Aufgabe von 50 bis 74 ms.
   - Ob sie Layout oder Skript ist und wann React DOM und die Laufzeit ausgewertet werden, steht nicht in den Rohberichten.
   - Soll die nächste Messung eine Spur (Trace) mitschreiben? Erst damit lässt sich prüfen, ob ein echtes früheres Malen möglich ist. Eine Maßnahme dafür ist hier nicht belegt und nicht gebaut.
