# UM-E3-LEISTUNG · Rolle Kundschafter und Baumeister (Arbeitskopie) · Modell Opus · Stufe 3 · Kern-Version 4.4 · Kostenklasse L

## Ziel (PLAN-Zeile UM-E3-LEISTUNG, KERN K-012 BUDGETS)
Auf `/` mobil: LCP ≤ 2,5 s, Leistung ≥ 90, Reaktion ≤ 200 ms. Kein Inhalt fällt weg. Einwilligung und Logo bleiben in Inhalt und Verhalten gleich (G8).

Heute, Lighthouse mobil, Mediane, HEAD 702dc965, Belege `_werkstatt/belege/um-e3-w3/nach-a|nach-b/lighthouse.json`:
- LCP 2,94 und 3,23 s
- Leistung 93 und 92
- TBT 139 bis 144 ms
- CLS 0
- LCP-Element: das Foto im Einstieg

Reaktion liegt schon unter 200 ms (Bericht `berichte/UM-E3-LCP-K.md`, Tabelle 4). Hebel H1 bis H3 stehen dort.

## Schritt 1 · Ursache belegen (Kundschafter)
- Rohberichte: `_werkstatt/cache/lighthouse/um-e3-w3/nach-a/start-mobil-{0,1,2}.report.json` und `nach-b/…` (HEAD) sowie `vor-a`/`vor-b` (Stand davor).
- Daraus die Kette bis zum LCP-Bild rekonstruieren:
  - Audits `network-requests`, `critical-request-chains`, `largest-contentful-paint-element`, `lcp-breakdown-insight`, `render-blocking-insight`, `document-latency-insight`, `image-delivery-insight`, `network-dependency-tree-insight`;
  - die simulierte Drosselung: Lighthouse rechnet LCP mobil simuliert aus dem Netzgraphen.
- Fragen:
  - Welche Anfragen stehen vor dem Bild?
  - Wann ist das Bild entdeckt, wann geladen?
  - Wie groß sind HTML, CSS, Schriften und JS vor dem ersten Bild?
  - Welche davon verschiebt der Simulator vor das Bild?
- Den Weg im Code nachvollziehen:
  - `src/components/start/Startbild.tsx`, `src/components/kern/Bildfeld.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`;
  - `next/image`: `preload`/`fetchPriority`, `sizes`, Qualität, Formate;
  - Schriften: `next/font/local` mit `preload`;
  - Inline-Skripte und JSON-LD im Kopf.
- Die Dokumentation von Next 16 liegt in `node_modules/next/dist/docs/` (AGENTS.md: Dieses Next.js ist nicht das aus deinen Trainingsdaten).
- Ergebnis: `…/leist/ursache.md` mit belegten Zahlen und einer geordneten Liste der Maßnahmen samt erwarteter Wirkung in ms.

## Schritt 2 · Bauen (Baumeister)
- Die Maßnahmen mit der größten belegten Wirkung umsetzen, bis die Rechnung unter 2,5 s liegt.
- Zum Beispiel: Vorladen des LCP-Bilds im Kopf mit hoher Priorität, passende `sizes`, kleineres Kopf-HTML (JSON-LD und Inline-Skripte prüfen), kritisches CSS kleiner, Schriften nicht vor dem Bild.
- Nur, was die Daten tragen. Keine experimentellen Schalter ohne Denkprotokoll (G6).

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/leist/baum`. Abzug von HEAD mit verlinkten `node_modules`; die Vergleichskopie `…/leist/vorher` liegt bereit.
- Am Ende: `cd …/leist && diff -ruN --exclude=node_modules --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vorher baum > UM-E3-LEISTUNG.diff`.
- Dazu die Notiz `…/leist/UM-E3-LEISTUNG.notiz.md`.
- Das Repository liest du nur. Kein Git mit Schreibwirkung.
- Kein Browser, kein Server, kein Lighthouse. Das Messen macht der Orchestrator danach als Skript (E-076). Gib deshalb eine nachprüfbare Erwartung an: Welche Werte sollen sich ändern?
- Prüfen in der Arbeitskopie wie in `pakete/UM-E3-W3.md`:
  - `npm test`
  - `npx eslint`
  - `werte.mjs`
  - `npx tsc` mit vorübergehender `next-env.d.ts`
  - dazu `npx next build`: Läuft er durch, und wie groß sind HTML und First-Load-JS von `/`?

## Leitplanken
- Wie in `pakete/UM-E3-W3.md`.
- B-01 bleibt eingefroren (E-078). Der Eingang (E-081) darf das Foto nicht verdecken. Der Bewegungsschalter (E-080) bleibt, wie er ist.
- Einwilligung, Tracking-Verhalten und `/api/anfrage` bleiben unberührt (G8).

## Rückgabe
- Ursache in drei Sätzen, Maßnahmen mit erwarteter Wirkung
- Prüfzahlen
- Diff-Pfad und Dateien
- offene Fragen
