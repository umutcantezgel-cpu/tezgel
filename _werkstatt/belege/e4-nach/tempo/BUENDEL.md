# BUENDEL · Erstladung Client-JavaScript je Hauptansicht (Build 3b10790)

Quelle: Reinraum `scratchpad/reinraum-3b10790` (Next 16.3.6, Turbopack, Produktion). Erstladung = Next-Liste `firstLoadChunkPaths` (route-bundle-stats.json), gegengeprüft gegen die `<script>`-Tags der prerenderten HTML; das Tag `0cz1d0mv5g_q7.js` (noModule-Polyfill) ist nicht Teil der Erstladung. Größen: roh = Dateigröße; gzip = gzip Stufe 6 (Node-Standard). KiB = Byte/1024. Lighthouse = Rohbericht `*-mobil-1` (laut Briefing Median aus drei Läufen).

## 1. Je Hauptansicht

| Route (Hauptansicht) | Chunks | Summe roh KiB | Summe gzip KiB | Lighthouse Skripte übertragen KiB (alle) | davon Erstladung ohne Kopf KiB | Nachladung in Lighthouse | ohne Modulzuordnung roh KiB |
|---|---:|---:|---:|---:|---:|---:|---:|
| / | 13 | 662.6 | 202.1 | 262.9 | 202.1 | 4 Dateien (107.4 KiB roh) | 0.0 |
| /bad | 10 | 587.0 | 175.5 | 282.3 | 175.5 | 9 Dateien (243.8 KiB roh) | 0.0 |
| /leistungen | 11 | 599.2 | 181.8 | 270.4 | 181.8 | 7 Dateien (189.2 KiB roh) | 0.0 |
| /leistungen/bad | 11 | 601.7 | 182.5 | 278.6 | 182.6 | 8 Dateien (207.6 KiB roh) | 0.0 |
| /standorte | 11 | 620.6 | 189.2 | 273.6 | 189.2 | 7 Dateien (178.1 KiB roh) | 0.0 |
| /standorte/wetzlar | 10 | 568.4 | 172.5 | 272.3 | 172.5 | 8 Dateien (226.5 KiB roh) | 0.0 |
| /fliesen | 11 | 592.6 | 179.6 | 291.8 | 179.6 | 10 Dateien (249.6 KiB roh) | 0.0 |
| /ueber-uns | 10 | 552.0 | 167.7 | 267.5 | 167.8 | 8 Dateien (226.5 KiB roh) | 0.0 |
| /kontakt | 12 | 650.8 | 197.9 | 262.9 | 197.9 | 5 Dateien (119.2 KiB roh) | 0.0 |
| /fliesen/konfigurator | 11 | 585.2 | 177.3 | 293.5 | 177.3 | 10 Dateien (264.8 KiB roh) | 0.0 |
| /blog | 13 | 926.1 | 263.3 | 377.7 | 264.2 | 9 Dateien (247.4 KiB roh) | 96.5 |
| /blog/rutschfeste-fliesen-r-klassen | 13 | 928.0 | 264.4 | 374.4 | 265.4 | 9 Dateien (235.8 KiB roh) | 96.5 |

Gegenprobe gzip: Lighthouse-transferSize = gzip6 lokal + konstanter Antwortkopf. Differenz je Datei median 1670 B (Spanne 1594–2333 B, 136 Paare). Nach Abzug des Kopfes weicht die gzip-Summe je Route um 0.0–0.4 % ab (Grenze 15 %).

## 2. Gemeinsame Chunks (in allen 12 Hauptansichten)

| Chunk | Zuordnung | roh KiB | gzip KiB | Top-Module (Anteil am Chunk) |
|---|---|---:|---:|---|
| `075_81sg-x3zl.js` | belegt | 221.3 | 69.3 | `node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.production.js` 196.0 KiB (88.6 %); `node_modules/next/dist/client/components/app-router.js` 5.4 KiB (2.4 %); `node_modules/next/dist/client/app-index.js` 3.6 KiB (1.6 %) |
| `2e_lrwr-bf1eq.js` | belegt | 156.2 | 42.8 | `node_modules/next/dist/compiled/react-server-dom-turbopack/cjs/react-server-dom-turbopack-client.browser.production.js` 22.6 KiB (14.5 %); `node_modules/next/dist/client/components/segment-cache/cache.js` 22.5 KiB (14.5 %); `node_modules/next/dist/client/components/segment-cache/scheduler.js` 13.2 KiB (8.5 %) |
| `09xwkd34ca3em.js` | belegt | 39.7 | 14.2 | `src/config/company.js` 5.0 KiB (12.6 %); `src/config/cities.ts` 3.8 KiB (9.6 %); `node_modules/next/dist/client/app-dir/link.js` 3.3 KiB (8.3 %) |
| `31vzwod8ek0ex.js` | wahrscheinlich | 36.3 | 11.1 | `src/components/common/Header.jsx` 6.3 KiB (17.6 %); `src/components/common/MobileMenu.jsx` 6.1 KiB (16.9 %); `src/config/navigation.js` 4.4 KiB (12.2 %) |
| `0ef-0o-qsq-3j.js` | belegt | 33.9 | 8.5 | `node_modules/next/dist/compiled/react/cjs/react.production.js` 7.6 KiB (22.5 %); `node_modules/next/dist/client/components/navigation.js` 2.7 KiB (7.9 %); `node_modules/next/dist/compiled/process/browser.js` 1.9 KiB (5.5 %) |
| `3abuwfwr9lqmr.js` | belegt | 26.3 | 9.3 | `src/components/common/CookieConsent.tsx` 8.3 KiB (31.7 %); `node_modules/next/dist/shared/lib/get-img-props.js` 4.7 KiB (18.1 %); `node_modules/next/dist/client/image-component.js` 3.5 KiB (13.2 %) |
| `0h2qsuyze9ds1.js` | belegt | 14.0 | 3.6 | `node_modules/next/dist/client/components/layout-router.js` 5.1 KiB (36.7 %); `node_modules/next/dist/client/components/http-access-fallback/error-boundary.js` 1.7 KiB (12.1 %); `node_modules/next/dist/client/components/bfcache-state-manager.js` 0.9 KiB (6.2 %) |
| `turbopack-2rkfwiq4peawj.js` | belegt | 9.5 | 3.8 | `[turbopack]/shared/runtime/runtime-utils.ts` 4.3 KiB (44.8 %); `[turbopack]/browser/runtime/dom/runtime-backend-dom.ts` 2.7 KiB (27.8 %); `[turbopack]/browser/runtime/base/runtime-base.ts` 2.0 KiB (21.2 %) |
| `0jvhpaew_uadu.js` | manuell (Inhalt, Groesse abweichend) | 6.4 | 2.3 | `node_modules/next/dist/client/components/builtin/error-styles.js` 2.8 KiB (51.5 %); `node_modules/next/dist/client/components/builtin/global-error.js` 1.5 KiB (27.1 %); `node_modules/next/dist/client/set-attributes-from-props.js` 0.9 KiB (17.1 %) |

Vollständige Top-10-Listen je Chunk: `BUENDEL.json`, Schlüssel `gemeinsame_chunks_alle_12` und `hauptansichten[].chunks[].top10`.

## 3. Bibliotheken im Client (Modulbytes roh, Erstladung)

| Bibliothek | min–max je Hauptansicht KiB |
|---|---:|
| zod | 0.0–275.8 |
| next | 226.0–226.0 |
| next/compiled:react-dom | 200.1–200.1 |
| src (eigener Code) | 73.3–156.2 |
| (Chunks ohne Modulzuordnung, roh) | 0.0–96.5 |
| @vis.gl/react-google-maps | 0.0–48.3 |
| tailwind-merge | 0.0–26.4 |
| next/compiled:react-server-dom-turbopack | 22.7–22.7 |
| Turbopack-Laufzeit | 9.5–9.5 |
| next/compiled:react | 8.0–8.0 |
| lucide-react | 4.1–5.5 |
| next/compiled:scheduler | 3.4–3.4 |
| next/compiled:process | 1.9–1.9 |
| @swc/helpers | 0.8–0.8 |
| clsx | 0.5–0.5 |

## 4. `use client`-Module aus src (Größe in Client-Chunks, Routen)

101 Dateien mit `use client`; 47 davon in mindestens einem Client-Chunk des Analyzers, 54 ohne Modulknoten im Client-Graph (Liste in JSON, `client_module_src_ohne_bundle`).

| Datei | roh KiB (alle Chunks) | Hauptansichten (von 12) | Routen gesamt (von 77) |
|---|---:|---|---:|
| `src/components/forms/LeadQuickForm.tsx` | 62.0 | 9 | 22 |
| `src/components/contact/BookingCalendar.tsx` | 16.9 | 1 | 2 |
| `src/components/common/CookieConsent.tsx` | 16.6 | 12 | 77 |
| `src/components/pricing/PricingCalculator.tsx` | 13.3 | 3 | 5 |
| `src/app/(bestand)/termin/page.jsx` | 11.8 | 0 | 1 |
| `src/components/maps/ServiceMapWrapper.tsx` | 9.5 | 2 | 2 |
| `src/app/(bestand)/faq/page.jsx` | 8.9 | 0 | 1 |
| `src/components/funnels/TezgelAnfrageFunnel/index.tsx` | 8.9 | 4 | 5 |
| `src/app/(bestand)/beratung/page.jsx` | 8.5 | 0 | 1 |
| `src/components/locations/LocationContact.tsx` | 7.6 | 3 | 3 |
| `src/components/ui/FAQAccordion.tsx` | 7.2 | 2 | 3 |
| `src/components/forms/HeroContactForm.tsx` | 6.6 | 1 | 1 |
| `src/components/legal/MapConsentGate.tsx` | 6.6 | 3 | 3 |
| `src/components/maps/ContactPremiumMap.tsx` | 6.5 | 1 | 1 |
| `src/components/common/Header.jsx` | 6.3 | 12 | 77 |
| `src/components/maps/InteractiveServiceMap.tsx` | 6.1 | 0 | 0 |
| `src/components/common/MobileMenu.jsx` | 6.1 | 12 | 77 |
| `src/app/(bestand)/widerruf/page.jsx` | 5.1 | 0 | 1 |
| `src/components/funnels/BadanfrageFunnel/index.jsx` | 5.1 | 1 | 8 |
| `src/components/sections/ReviewsSection.jsx` | 5.0 | 0 | 1 |
| `src/components/funnels/FliesenKonfigurator/index.jsx` | 4.7 | 2 | 13 |
| `src/components/funnels/BadProjektCheck/index.jsx` | 3.9 | 1 | 2 |
| `src/components/blog/BlogFilter.jsx` | 3.5 | 1 | 1 |
| `src/components/blog/ShareButtons.jsx` | 3.4 | 1 | 1 |
| `src/hooks/useConsent.ts` | 3.3 | 12 | 77 |

## 5. Auffällig (nur Zahlen, keine Empfehlung)

- `21ludfwbeufxn.js`: 276.8 KiB roh / 62.4 KiB gzip, nur auf /blog, /blog/rutschfeste-fliesen-r-klassen; 275.8 KiB davon Module `node_modules/zod/…` (v4 core und classic, inkl. to-json-schema). Importkette laut Quelltext: `src/services/dataService.js` importiert `@/schemas/validation`, das `zod` importiert.
- `075_81sg-x3zl.js`: react-dom (`next/compiled`) mit 196.0 KiB in einem Chunk, auf allen 12 Routen.

## 6. Offene Fragen

- Analyzer-Chunknamen stimmen nicht mit den Dateinamen im Build überein (1 von 46 gleich). Zuordnung Analyzer-Chunk zu Datei über Modulgröße (Abweichung <= 3 %) und Routen-Konsistenz: belegt 35, wahrscheinlich 7, manuell 1, ohne Zuordnung 3. Ursache der Namensabweichung nicht geklärt.
- Prüfung Analyzer gegen Erstladung: 75 von 77 Routen enthalten alle Erstladungs-Chunks; fehlend sind nur `1lp9zqdloocn9.js` und `42-7acnlu3ns8.js` (auf /blog und /blog/[slug]).
- `1lp9zqdloocn9.js` (97,9 KiB roh, nur /blog und /blog/[slug]) hat im Analyzer kein vollständiges Gegenstück. Eine Teilmenge (Analyzer-Chunk `29pdujpz0_5xi.js`, 30,1 KiB, 25 Module u. a. `src/config/services.js`, `src/config/projects.js`, `src/contexts/ContentContext.jsx`, `src/services/dataService.js`) deckt nur rund ein Drittel ab. Modulliste dieses Chunks daher nicht belegt; Ursache offen.
- `0jvhpaew_uadu.js` (Bootstrap, 6,4 KiB roh, auf allen 12 Routen): manuell dem Analyzer-Chunk `1lmb26yt83-ed.js` zugeordnet (gleiche Modulnamen error-styles/global-error; Größe -14,6 %).
- Gegenprobe `page_client-reference-manifest` (Modul zu Chunk): 44 von 49 Modulen bestätigt, 5 Abweichungen (Liste in JSON `validierung_manifest_modul_zu_chunk`).
- Lighthouse lädt je Route 4–10 Skripte nach, die nicht in der Erstladung stehen (z. B. `0hzy3txlh-w14.js`, `0hqhuou2qdgjl.js`, `0b7t2p0gmvh-g.js`). Sie sind nur in der Spalte "alle" enthalten.

