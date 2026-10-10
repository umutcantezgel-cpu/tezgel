# E0-PRUEF-02c · Rückgabe

## GEÄNDERTE DATEIEN
- `_werkstatt/werkzeuge/lighthouse.mjs`
- `_werkstatt/werkzeuge/texte.mjs`
- `_werkstatt/werkzeuge/texte-vergleich.mjs`
- `_werkstatt/pakete/E0-PRUEF-02c.rueckgabe.md` (neu)

## WAS UND WARUM
- **lighthouse.mjs:** `--base`, `--hauptansichten`, `--laeufe` (Standard 3), ungezählter Aufwärmlauf je Seite und Form. Median: gerade Anzahl = Mittelwert (vorher oberes Element). `spanne` je Kennzahl. Je Lauf `lcp_element` und `lcp_phasen` aus `lcp-breakdown-insight` (Lighthouse 13 ersetzt `largest-contentful-paint-element`), `cls_quellen` aus `cls-culprits-insight` (Rückfall `layout-shifts`), `js_top` aus `network-requests`. Benchmark-Band ±15 %, bis zu 2 Wiederholungen, dann `benchmark_abweichung: true`. Blockliste um 9 Hosts aus GESPERRTE_HOSTS.
- **texte.mjs:** `--base`, `--ansichten` (Standard d1440). d1440 bleibt `<slug>.json`. Bei mehreren Ansichten zusätzlich `<slug>@<ansicht>.json` je Ansicht. Neues Feld `bloecke` (header, main, footer, sichtbare Dialoge). Sichtbar heißt: nicht aria-hidden oder inert, nicht ausgeblendet, im Viewport.
- **texte-vergleich.mjs:** LCS-Wortspannen je Seite und Block mit 5 Wörtern Kontext. `--erlaubt` in beiden Formaten. Neu: `unerlaubt_entfernt_je_seite`. ROT auch bei unerlaubt entfernten Spannen. Sätze ohne `bloecke` gelten als „nicht geprüft“. Bestehende Ausgaben unverändert.

## GEMEINSAME DATEIEN
Keine Änderung nötig. Wünsche:
1. Neu `_werkstatt/werkzeuge/tests/e0-02c-logik.mjs` aus den Scratch-Prüfungen `E0-PRUEF-02c/test-*.mjs` (lesen die Quelltexte; für das Repo auf relative Pfade umstellen).
2. `.gitignore`: `/_werkstatt/belege/`, falls Messbelege nicht committet werden.

## PRÜFUNG UND ERGEBNIS
- `node --check` grün für alle drei Werkzeuge.
- Scratch-Prüfungen grün: Blockliste, Median und Spanne (gerade und ungerade), LCP-, CLS- und js_top-Extraktion, Band ±15 %; LCS gegen naive Referenz (4000 Fälle); Vergleich in simulierter Ordnerstruktur (Spannen, `--erlaubt`, Rückwärtskompatibilität, `--streng`).
- **Lighthouse** `--satz probe-lh --seiten /,/kontakt --laeufe 3 --base http://127.0.0.1:4310`: 12 gezählte Läufe, 4 Aufwärmläufe, 4 Wiederholungen, 1 Lauf markiert. Referenz 1597. Beleg `_werkstatt/belege/probe-lh/lighthouse.json`, Rohberichte (12) in `_werkstatt/cache/lighthouse/probe-lh/`.

| Seite / Form | perf (Spanne) | LCP ms (Spanne) | TBT | CLS | LCP-Element (gekürzt) |
|---|---|---|---|---|---|
| / mobil | 83 (82–84) | 3788 (3428–4155) | 252 | 0 | `p.text-base` |
| / desktop | 99 (99–100) | 847 (759–849) | 42 | 0 | `h1.text-4xl` |
| /kontakt mobil | 70 (65–77) | 4893 (4863–4993) | 484 | 0 | `p#cookie-consent-description` |
| /kontakt desktop | 95 (93–96) | 1479 (1446–1668) | 66 | 0 | dito, 1 Lauf markiert |

- **texte** `probe-t1`/`probe-t2` (`--ansichten m390,d1440`), dann `texte-vergleich probe-t1 probe-t2`: Erwartung 0 **nicht erfüllt**. Eine Abweichung auf `/kontakt` (d1440): Karten-Platzhalter „Interaktive Karte geschützt“ in t1, in t2 nicht. Diagnose (Scratch `probe-karte.mjs`, sechs identische Aufrufe): Platzhalter 5-mal da, 1-mal weg, und der Einwilligungsbanner trat genau in diesen Läufen auf. Die Anzeige ist nicht reproduzierbar; das Werkzeug meldet korrekt ROT. Beleg `_werkstatt/belege/probe-t2/texte-vergleich-gegen-probe-t1.json`.
- **git status** (eigener Bereich): ` M` für die drei Werkzeuge, `??` für `_werkstatt/belege/` und diese Rückgabe. Übrige Einträge stammen von anderen Prüfern oder vom Orchestrator und sind unangetastet. Nichts committet.

## BILDBELEGE
Keine (Messwerkzeuge, keine Screenshots). Belege siehe oben.

## OFFENE FRAGEN
1. **Einwilligung beeinflusst Messung und Text-Probe:** Die Anzeige schwankt zwischen identischen Aufrufen (vermutlich `setzeEinwilligung` in lib.mjs oder die Einwilligungslogik). Der LCP von `/kontakt` ist der Banner-Text, die Messung hängt also daran. Wer behebt das?
2. **ROT-Regel:** Die Zeilenregel ist unverändert. Ein protokollierter Mikrotext braucht für GRÜN weiterhin einen alt-Zeileneintrag. Auf Spannen umstellen?
3. **Wortgrenzen:** `textContent` verklebt Wörter an Elementgrenzen („Projekt.RouteAnrufen“). Wortlaut beibehalten; Trennzeichen je Textknoten wären genauer.
4. **Sperre bei Lighthouse:** nur blockedUrlPatterns, keine installSperre (Playwright-API). Lokale POST-Anfragen werden nicht abgefangen. Akzeptiert?
5. **Belege im Repo:** `_werkstatt/belege/` ist nicht ignoriert. Ignorieren oder committen?
6. **Rundung:** cls_quellen auf 4 Nachkommastellen, kleine Beiträge zeigen 0. Auf 6 erhöhen?
7. **LCP-Phasen:** ladeverzoegerung und ladezeit sind bei Textknoten-LCP null (Lighthouse-Verhalten). Der Bildfall ist nur im Scratch-Test geprüft.
8. **Auslegung:** „Sitzung“ = ein Werkzeugaufruf. Ein Altformat-Eintrag mit alt und neu erlaubt weder Entfernen noch Hinzufügen (bestehende Logik, unverändert).
9. **Doku nicht geändert:** `_werkstatt/berichte/E0-KUN-01-stack-werkzeuge.md` nennt Standard 5 und den alten Median.
