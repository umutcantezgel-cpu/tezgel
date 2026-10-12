# E4-NACH-06 · Rückgabe (Prüfer, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- Neu, nur in `_werkstatt/belege/e4-nach/tempo/`: `BUENDEL.json`, `BUENDEL.md`, `buendel.py`, `gen_md.py`, `reinraum/` (Logs).
- Diese Rückgabe. Sonst nichts. Kein Commit, kein Push.

## WAS UND WARUM
Erstladung je Route = Next-Liste `firstLoadChunkPaths` (Reinraum 3b10790). Lighthouse = Skripte mobil, Lauf 1.

| Hauptansicht | Chunks | roh KiB | gzip KiB | Lighthouse Skripte KiB (alle) |
|---|---:|---:|---:|---:|
| / | 13 | 662.6 | 202.1 | 262.9 |
| /bad | 10 | 587.0 | 175.5 | 282.3 |
| /leistungen | 11 | 599.2 | 181.8 | 270.4 |
| /leistungen/bad | 11 | 601.7 | 182.5 | 278.6 |
| /standorte | 11 | 620.6 | 189.2 | 273.6 |
| /standorte/wetzlar | 10 | 568.4 | 172.5 | 272.3 |
| /fliesen | 11 | 592.6 | 179.6 | 291.8 |
| /ueber-uns | 10 | 552.0 | 167.7 | 267.5 |
| /kontakt | 12 | 650.8 | 197.9 | 262.9 |
| /fliesen/konfigurator | 11 | 585.2 | 177.3 | 293.5 |
| /blog | 13 | 926.1 | 263.3 | 377.7 |
| /blog/rutschfeste-fliesen-r-klassen | 13 | 928.0 | 264.4 | 374.4 |

**Gemeinsame Chunks (in allen 12), roh/gzip KiB:**
- `075_81sg-x3zl.js` 221.3/69.3: React-DOM 196.0 (88,6 %).
- `2e_lrwr-bf1eq.js` 156.2/42.8: React-Server-DOM 22.6, segment-cache 22.5.
- `09xwkd34ca3em.js` 39.7/14.2: `src/config/company.js` 5.0.
- `31vzwod8ek0ex.js` 36.3/11.1 (wahrscheinlich): Header 6.3, MobileMenu 6.1.
- `0ef-0o-qsq-3j.js` 33.9/8.5: React 7.6.
- `3abuwfwr9lqmr.js` 26.3/9.3: `CookieConsent.tsx` 8.3.
- `0h2qsuyze9ds1.js` 14.0/3.6; `turbopack-2rkfwiq4peawj.js` 9.5/3.8; `0jvhpaew_uadu.js` (Bootstrap) 6.4/2.3 (manuell).

**Bibliotheken** (roh KiB, Spanne über 12): next 226.0 (inkl. Bootstrap), react-dom 200.1, eigener src 73.3–156.2, lucide-react 4.1–5.5. framer-motion, @phosphor-icons/react, date-fns, react-markdown fehlen in allen 12 Erstladungen.

**`use client`:** 101 Dateien in src; 47 mit Bytes im Client. Größte: `LeadQuickForm.tsx` 62.0 KiB (9 von 12 Hauptansichten), `CookieConsent.tsx` 16.6 KiB (12 von 12), `Header.jsx` 6.3 und `MobileMenu.jsx` 6.1 (je 12 von 12). Liste in `BUENDEL.md`, Abschnitt 4.

**Auffällig (nur Zahlen):** `21ludfwbeufxn.js` 276.8 KiB roh / 62.4 KiB gzip, nur /blog und /blog/[slug]; davon 275.8 KiB zod v4. Quelltext: `src/services/dataService.js` importiert `@/schemas/validation`, das `zod` importiert.

**Analyzer:** lief (15 MB, bleibt im Scratchpad unter `reinraum-3b10790/.next/diagnostics/analyze/`).

## GEMEINSAME DATEIEN
Keine geändert, keine Änderungswünsche.
Werkzeugfund (nicht geändert): `_werkstatt/werkzeuge/reinraum.sh` schreibt ohne zweites Argument in `_werkstatt/cache/reinraum-<sha>` im Arbeitsbaum. Vorschlag: Standard auf Scratchpad setzen.

## PRÜFUNG UND ERGEBNIS
- Reinraum 3b10790 frisch: npm ci, build, typecheck, lint, test, qa:graph alle 0; nft sauber. Log: `belege/e4-nach/tempo/reinraum/ergebnis.txt`.
- Summen roh und gzip je Route über Chunkliste und direkt über Dateien identisch (12 von 12).
- gzip Stufe 6 gegen Lighthouse: konstanter Kopf von median 1670 B je Anfrage; danach 0,0–0,4 % Abweichung (Grenze 15 %). Gegen die Lighthouse-Gesamtsumme liegt die Erstladung 23–40 % darunter (Nachladung plus Kopf).
- Analyzer deckt alle Erstladungs-Chunks auf 75 von 77 Routen ab (Ausnahme /blog, /blog/[slug]). Manifest-Gegenprobe: 44 von 49 Module.
- Server nur per GET geprüft (4310, 4320: beide 200), keine Starts, Stopps oder POST.

## BILDBELEGE
Keine. Reine Datenmessung ohne Browserlauf.

## OFFENE FRAGEN
1. Analyzer-Chunknamen stimmen mit dem Build nicht überein (1 von 46 identisch). Ursache unbekannt. Zuordnung: 35 belegt, 7 wahrscheinlich, 1 manuell, 3 ohne.
2. `1lp9zqdloocn9.js` (97.9 KiB roh, nur /blog-Seiten) hat keine vollständige Analyzer-Entsprechung. Die Teilmenge `29pdujpz0_5xi.js` (30.1 KiB) deckt etwa ein Drittel ab. Auf /blog bleiben 96.5 KiB ohne Modulliste.
3. Bootstrap `0jvhpaew_uadu.js` ist manuell `1lmb26yt83-ed.js` zugeordnet (gleiche Modulnamen, Größe -14,6 %). Grund der Abweichung offen.
4. Manifest-Gegenprobe: 5 von 49 Modulen weichen ab (Liste in JSON).
5. Lighthouse lädt Chunks nach, die nicht in der Erstladung stehen (z. B. `0hzy3txlh-w14.js`, `0hqhuou2qdgjl.js`). Ursache im Code nicht geprüft.
