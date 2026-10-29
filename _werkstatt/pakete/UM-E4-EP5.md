# UM-E4-EP5 · Stellenangebot `/karriere/ausbildung` mit strukturierten Daten · Rolle Baumeister · Modell Haiku · Kern-Version 4.4

## Ziel (Soll, PLAN E4)
Die Seite `src/app/(bestand)/karriere/ausbildung/page.jsx` trägt strukturierte Daten:
- einen Knoten `JobPosting` mit `hiringOrganization` (Verweis auf `ORG_ID`) und `jobLocation` als `Place` mit der Anschrift des Betriebs;
- einen Knoten `FAQPage` aus den Fragen und Antworten, die schon auf der Seite stehen. Nur sichtbarer Inhalt, nichts erfinden.

## Regeln
- Angaben nur aus den Firmendaten: `src/config/company.js` und `src/lib/config` nur lesen (G8). Keine erfundenen Felder: kein Gehalt ohne Angabe, kein Startdatum ohne Angabe; `datePosted` nur, wenn ein Datum im Bestand steht.
- Muster für Knoten und Einbindung: `buildServiceNode`, `buildGraph`, `ORG_ID` und `SITE_URL` in `src/lib/schema.ts` (nur lesen); dazu die Einbindung auf anderen Seiten, etwa `grep -rn "buildGraph" src/app`.
- Regeln der Prüfung `_werkstatt/werkzeuge/jsonld.mjs` (Kopf der Datei lesen):
  - der Seitenknoten zeigt auf die eigene Adresse;
  - genau eine BreadcrumbList;
  - kein doppeltes `@id`.
- Du änderst nur `src/app/(bestand)/karriere/ausbildung/page.jsx`. Kein Git mit Schreibwirkung, kein Commit.

## Prüfen
- `npm test`
- `npx eslint "src/app/(bestand)/karriere/ausbildung/page.jsx"`
- `npm run -s typecheck`

PATH mit `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/node-lts/aktuell/bin` voran.

## Rückgabe
Was eingebaut ist (Knoten, Felder, Quelle je Feld), Prüfzahlen, offene Fragen.
