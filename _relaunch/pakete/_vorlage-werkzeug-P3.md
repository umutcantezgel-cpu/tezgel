# Vorlage · Werkzeugbauer (P3-00) · Kern v1.2

## 2 Rollenbriefing
Du baust ein Prüfwerkzeug für den Relaunch der Website von Fliesenverlegung Tezgel. Das Werkzeug misst – es ändert nie das Produkt. Es läuft mit Node 22 aus `_relaunch/werkzeuge/` (eigene `package.json`, Playwright 1.56.1, Chromium unter `/opt/pw-browsers`, `@axe-core/playwright`, `lighthouse`, `pixelmatch`, `pngjs`, `svgo`, `knip` sind installiert). Häufige Fehler, die du vermeidest: feste Wartezeiten statt Zustandsabfragen; Ergebnisse ohne Messbedingungen; ein Werkzeug, das nur den Glücksfall misst (prüfe es gegen einen absichtlich schlechten Fall); Sonderwege im Produkt für Tests (verboten, G7).

## 3 Pflichtbausteine
- `import { BASE, assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, durchscrollen, bereit, grundmenge, slug, ensureDir, RELAUNCH } from './lib.mjs'` – jeder Browserlauf **muss** `assertLocal()` und `installSperre(context)` nutzen (G5: keine echten Anfragen, keine Dritt-Hosts).
- Ausgabe: JSON unter `_relaunch/belege/<satz>/<werkzeug>.json` (nur Zusammenfassungen, keine Massenbilder) und große Rohdaten unter `_relaunch/cache/<werkzeug>/<satz>/`. Kopf jeder JSON-Ausgabe: `{ satz, base, bedingungen, erstellt }`.
- Aufruf-Muster: `node <werkzeug>.mjs --satz <name> [--seiten /,/bad] [--ansichten m375,d1440]`.
- Kopfkommentar: Zweck, Nutzung, Messbedingungen, Bezug zum Kriterium (Z-xx).

## 4 Das Projekt in fünf Sätzen
(wortgleich aus `_relaunch/KERN.md`, Abschnitt „Das Projekt in fünf Sätzen“ – lies ihn dort.)

## 8 Grenzen
- Schreibrechte nur wie in der Paket-Kopfzeile. Kein `git` mit Schreibwirkung (commit, add, checkout, restore, stash, reset), kein `npm install/uninstall`, kein `next build`/`next start`, kein `npm run indexnow`, keine POST-Anfragen per curl, keine Änderungen unter `src/` oder `public/`.
- Der Server läuft bereits: Ausgangsstand auf `http://127.0.0.1:4310` (lies nur). Starte keinen eigenen.
- Last: höchstens 2 Browser-Kontexte gleichzeitig.

## 11 Ausgabeformular (Rückgabe `_relaunch/pakete/<Kennung>.rueckgabe.md`)
Kopfzeile · was das Werkzeug misst · Aufruf · Laufzeit · Ergebnis am Ausgangsstand (Zahlen) · Gegenprobe (absichtlich schlechter Fall erkannt? wie erzeugt, ohne `src/` zu ändern – z. B. per `page.addStyleTag`/`page.evaluate` im Testlauf) · OFFENE FRAGEN · RISIKEN.

## 12 Selbstprüfung
Läuft das Werkzeug am Ausgangsstand fehlerfrei durch? Erkennt es die Gegenprobe? Stehen Messbedingungen im Ergebnis? Nutzt es `assertLocal` und `installSperre`? Keine festen Wartezeiten ohne Begründung?
