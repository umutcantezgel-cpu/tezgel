# E2-PRUEF-A-2 · Rückgabe

Belegordner (B): /tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-A-2/

## GEÄNDERTE DATEIEN
Keine Repo-Dateien. Nur in B sowie diese Rückgabe. `git status` nach dem Lauf leer.

## WAS UND WARUM
Prüfstufe A für 57 Dateien (Hauptlauf `pruefe-a.sh`, 1005 s), danach Konfigurator-Wiederholung auf dem Stand mit Fix 6e7c116 (Auftrag des Koordinators), dazu Weiterleitungen, Kopfzeile, Werte-Prüfung. Keine Änderungen.

## GEMEINSAME DATEIEN
Keine Änderung gewünscht. Der ESLint-Fehler in `FliesenKonfigurator/Erfolg.jsx:47` ist durch 6e7c116 behoben (Neu-Lint: 0 Fehler, 0 Warnungen, `eslint-erfolg-nach.json`).

## PRÜFUNG UND ERGEBNIS
Hauptlauf `pruefe-a.sh`: Exit 1, Gesamt ROT (`pruefe-a.log`, `pruefe-a.txt`).
- Typprüfung tsc: GRÜN, 0 Fehler (`tsc.txt` leer).
- Lint: ROT, 1 Fehler, 1 Warnung. Fehler: `Erfolg.jsx:47`, `react/jsx-no-undef`, 'ResultSummary' nicht definiert (behoben). Warnung: `src/app/globals.css` nicht von der ESLint-Konfiguration erfasst (`eslint.json`).
- Funktionstests: ROT. 304 Tests: 280 bestanden, 21 übersprungen, 3 unerwartet fehlgeschlagen, 0 flaky (`pw.json`). Alle drei in `funktion-konfigurator.spec.mjs`, Projekt mobil:
  - :150 „Gutfall online …“: `getByText('Konfiguration erfolgreich übermittelt')` nicht sichtbar
  - :197 „Gutfall nur Treppe …“: derselbe Locator nicht sichtbar
  - :242 „Server nimmt die Konfiguration an …“: `getByText(/TEZ-\d{2}-[A-Z0-9]+/).first()` nicht sichtbar
- Konfigurator vor dem Fix (Hauptlauf): mobil 20 bestanden, 3 fehlgeschlagen, 2 übersprungen (lief 20:30–20:33, Datei geändert 20:36:16).
- Konfigurator nach dem Fix (Wiederholung, `konf-nach.log`, `konf-nach.json`): mobil 23 bestanden, 0 fehlgeschlagen, 2 übersprungen; desktop 23 bestanden, 0 fehlgeschlagen, 2 übersprungen. Gesamt 46/0/4.
- Textvergleich gegen e0: ROT (`_werkstatt/cache/texte/E2-PRUEF-A-2/texte-vergleich-gegen-e0.json`). 242 Seiten mit Abweichung. Entfernt: 1 Zeile, 94 Spannen, davon 1 unerlaubt.
  - Unerlaubte Spanne: Seite `/`, Teil main, Text „wird geladen...“, kontext_vor „Herborn und ganz Hessen. Karte“, kontext_nach „Transparente Antworten Häufig gestellte Fragen“.
  - Entfernte Zeile: `/`, main_zeilen: „Karte wird geladen...“. Sitemap und robots unverändert, 0 kaputte Links.
- Werte (`werte.mjs`, 55 von 57 Dateien verarbeitet): 885 Befunde. Farbe 404, Schrift 221, Abstand 99, Größe 59, Radius 47, ohne_css 20, beliebig 20, Dauer 11, dauer_zahl 3, style_wert 1. Meiste: `Zusammenfassung.jsx` 98, `beratung/page.jsx` 74. Alle mit Datei, Zeile, Wert: `befunde-werte.tsv`.
- Bilder: GRÜN. 11 Ansichten, m390 und d1440 je HTTP 200, Überlauf 0. Konsole: `/` 4, `/kontakt` 4. Überlappung: `/fliesen/konfigurator` 40, `/blog` 3.
- Weiterleitungen/404: 308 → `/bad/projekt-check`; 308 → `/bad/barrierefreies-bad`; 404.
- Kopf (E-017): 1280 px: Kopf clientWidth 1280 = scrollWidth 1280, Rufnummer 185,84 px, Dokument 1280/1280. 1440 px: Kopf 1312/1312, Rufnummer 186,81 px, Dokument 1440/1440. Kein Überlauf (`kopf-check.json`).

## BILDBELEGE
`kopf-1280.png`, `kopf-1440.png`; `bilder/<seite>/m390.jpg` und `d1440.jpg` für 11 Ansichten.

## OFFENE FRAGEN
1. Zählung 304 Tests (280/21/3) weicht vom Ausgangswert E0-PRUEF-04 (292 Fälle, 279 bestanden, 8 übersprungen, 5 fixme) ab. Ursache nicht geklärt.
2. [BAU-04]-Kandidat: „Karte wird geladen...“ stammt im Code aus `src/components/maps/ServiceMapWrapper.tsx:117`, eingebunden über `src/app/page.tsx:39` und `:644`. Die Datei war zum Lauf unkommittiert. Zuordnung nicht bestätigt.
3. Überlappungswerte (40, 3): Ausgabe des Werkzeugs, die Stufe nennt nur Status und Überlauf. Einordnung offen.
4. Schreibort: `pruefe-a.sh` legt den Textvergleich in `_werkstatt/cache/texte/E2-PRUEF-A-2/` ab (Werkzeugvorgabe, git-ignoriert). `werte.mjs` habe ich mit `--ziel` nach B gelegt. Bitte bestätigen.
5. Briefing-Abweichungen: wörtliche curl-Form `%%{http_code}` gab `%{http_code}` aus, benutzt wurde `%{http_code}`. Die Einzelfall-Wiederholung wurde nicht separat ausgeführt; die Spec-Wiederholung deckt alle drei Fälle ab.
6. Der Hauptlauf (20:28–20:42) überschneidet sich mit dem Fix (20:36). Vor/nach-Zuordnung über Zeitstempel: mobil vor, desktop nach dem Fix.
