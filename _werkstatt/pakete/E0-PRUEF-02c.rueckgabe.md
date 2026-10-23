GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/werkzeuge/adressen.mjs` (neu)
- `/home/user/tezgel/_werkstatt/adressen-e0.csv` (neu, 202 Datenzeilen plus Kopf)
- `/home/user/tezgel/_werkstatt/belege/e0/links.json` (neu)
- `/home/user/tezgel/_werkstatt/belege/e0/adressen-zusammenfassung.md` (neu)
- Probe-Ausgaben nur unter `$SCRATCH/E0-PRUEF-02c/probe/`. Nichts committet, nichts gepusht, keine fremden Dateien geändert.

WAS UND WARUM
Das Werkzeug `adressen.mjs` nutzt `fetch` mit `redirect: 'manual'`, ohne Browser, und ruft `assertLocal` auf. Die Adressmenge folgt dem Auftrag: Sitemap 163, Links 5, Weiterleitungsquellen 2 aus `next.config.ts` und 25 literale 410-Adressen aus `src/lib/wege.ts`. Dazu kommen 7 Platzhalter-Beispiele `…/beispiel`, markiert als `wege-platzhalter`. Zusammen sind es 202. Die 170 Adressen des Auftrags entsprechen 163 + 5 + 2.
Lauf: `node adressen.mjs --satz e0` gegen `http://127.0.0.1:4310`.

GEMEINSAME DATEIEN
Keine gewünschten Änderungen.

PRÜFUNG UND ERGEBNIS
- `node --check adressen.mjs`: ok.
- `node adressen.mjs --probe`: Exit 0, "PROBE BESTANDEN". Die vier Probeseiten plus Sitemap und 404 ergeben genau die erwarteten Befunde: H1-Zahl 2 auf `/zwei-h1`, kaputter Link `/kaputt` auf `/fehlt` (404), 308 `/alt` auf `/neu`, ungültiges JSON-LD auf `/jsonld`, Absolutlink `/` auf `/bad`. Keine Zusatzbefunde.
- Lauf e0, einmal ausgeführt. Es werden Zählungen berichtet, keine Zeitmessungen, daher keine Mediane:
  - Adressen gesamt 202, CSV 202 Datenzeilen (übereinstimmend).
  - Status: 200 = 168, 308 = 2, andere 3xx = 0, 404 = 0, 410 = 32, andere = 0.
  - Seiten mit Status 200: H1-Zahl ungleich 1 = 0; Canonical fehlt oder abweicht = 0; Titel über 60 Zeichen = 0; Titel fehlt = 0; Beschreibung außerhalb 120 bis 155 = 0 (gemessene Spanne 124 bis 155); JSON-LD ungültig = 0 (alle 168 parsebar mit `@context`).
  - Kaputte interne Links (4xx, 5xx, Fehler, ohne 410) = 0. Links auf 410-Adressen = 0.
  - Absolute Links auf tezgel.de, nicht geprüft = 2 (`/barrierefreiheit` → `/`, `/cookie-richtlinie` → `/`).
  - 308: `/bad/budgetkalkulator` → `/bad/projekt-check`; `/blog/barrierefreies-bad-planung-zuschuesse` → `/bad/barrierefreies-bad`.
  - Alle 32 Adressen aus `wege.ts` liefern 410.
  - Quellen: sitemap 163, link 5, weiterleitung 2, wege 25, wege-platzhalter 7.
  - Die Feldextraktion ist stichprobenweise plausibel: Titel, H1, Canonical und JSON-LD-Typen sind befüllt.
- Selbstprüfung: `git status --porcelain` zählt 44 Einträge. Meine Dateien sind die drei neuen Dateien plus `_werkstatt/belege/`. Die übrigen Einträge stammen aus anderer Arbeit (geänderte `werkzeuge/*`, PROBE- und PRUEF-Pakete). Der Symlink `node_modules` ist ignoriert.

BILDBELEGE
Keine. Es handelt sich um eine reine HTTP-Prüfung ohne Bilder.

OFFENE FRAGEN
1. Die Rückgabedatei `_werkstatt/pakete/E0-PRUEF-02c.rueckgabe.md` habe ich nicht geschrieben. Sie liegt außerhalb der Schreibrechte, und die Systemvorgabe verbietet Berichtsdateien. Dieser Text ist die Rückgabe. Bitte der Orchestrator ablegen, falls gewünscht.
2. Auslegungen zur Bestätigung: Fragmente werden entfernt (`/x#y` wird zu `/x`). `canonical_ok` verlangt exakt `SITE` plus Pfad ohne Abschlussschrägstrich, Start also `https://www.tezgel.de`. `eingehende_links` zählt verschiedene verlinkende Seiten ohne Selbstlink. Für Platzhalter steht `quelle` auf `wege-platzhalter`, das ist nicht Teil der Vierliste.
3. Die zwei absoluten Links auf tezgel.de werden lokal nicht geprüft. Soll das Werkzeug sie auf den lokalen Port abbilden?

=== ENDE E0-PRUEF-02c · BEREIT ZUR RÜCKGABE ===
