# E2-PRUEF-B4 · Rückgabe · Prüfstufe A ROT, Abbruch nach Schritt 2

## GEÄNDERTE DATEIEN
Keine Repo-Datei geändert (`git status --porcelain` leer). Geschrieben nur: Scratchpad `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-B4/` und diese Rückgabe. Der Textschritt des Werkzeugs legt `_werkstatt/cache/texte/E2-PRUEF-B4` an (gitignoriert, Symlink außerhalb des Repos).

## WAS UND WARUM
- Schritt 1: 4320 `/` 200, `/kontakt` 200.
- Schritt 2: `pruefe-a.sh E2-ORCH-10` mit 30 Dateien und `-- / /kontakt`. Wegen `globals.css` und `layout.tsx` liefen alle 13 Funktionstest-Specs. Der Lauf dauerte 840 s und überschritt die 600-s-Grenze der Vordergrundausführung. Er lief deshalb im Hintergrund, Ende per Monitor abgewartet (Abweichung vom Briefing, Nichts vorzeitig abgegeben).
- Ergebnis Schritt 2: ROT. Abbruch wie vorgesehen. Schritte 3 bis 10 (Reinraum, Funktionstests 4312, Bildsatz, axe, Bewegung, werte, Texte, Belegdatei) nicht ausgeführt. Keine Belege unter `_werkstatt/belege/e2-tor-2/`.

## PRÜFUNG UND ERGEBNIS (Prüfstufe A, Dev 4320)
- Typprüfung (tsc): GRÜN, 0 Fehler, 0 übrige, 12 s.
- Lint (eslint): GRÜN, 0 Fehler. Die 3 „Warnungen“ sind Hinweise „File ignored because no matching configuration“ für `package.json`, `bewegung.css`, `globals.css`, also keine Lint-Befunde.
- Funktionstests: ROT. 306 Tests, erwartet 285, unerwartet 1, flaky 0, übersprungen 20 (Gründe nicht aufgeschlüsselt). Fehlschlag: `funktion-einwilligung.spec.mjs`, Projekt mobil, „Schild öffnet die Einstellungen mit aktuellem Stand; „Alle ablehnen“ entzieht Analyse und Marketing“. Erwartet 2 Treffer für `getByText('Aktiviert')` im Dialog „Cookie-Einwilligungsbanner“, erhalten 0. Einzelwiederholung (`--project=mobil --grep`, gegen 4320): wieder rot, gleiche Meldung. Die Desktop-Variante desselben Tests ist bestanden. Kein fixme betroffen.
- Bilder (Gate nur HTTP): `/` HTTP 200/200, Konsole 0, Überlauf 0, Überlappung 4. Die 4 sind je 2 in m390 und d1440, Art „textkreuzung“, Texte „Perfektion“ und „auf jedem“, Selektor `h1 … > span.block`. `/kontakt` HTTP 200/200, Konsole 0, Überlauf 0, Überlappung 0.
- Texte gegen e0 (Basis Dev 4320): `{"seiten_mit_abweichung":242,"entfernt":0,"hinzu":190,"meta":0,"seo":0,"spannen_entfernt":82,"spannen_hinzu":101,"spannen_unerlaubt_entfernt":0,"sitemap_entfernt":0,"sitemap_hinzu":0,"robots_geaendert":false,"kaputte_links":0,"ergebnis":"GRÜN"}`.

Belege (Scratchpad): `…/E2-PRUEF-B4/pruefe-a-run.out`, `…/E2-PRUEF-B4/pw.json`, `…/E2-PRUEF-B4/pw.log`, `…/E2-PRUEF-B4/eslint.json`, `…/E2-PRUEF-B4/tsc.txt`, `…/E2-PRUEF-B4/einzelbild.json` (Ordner `bilder/start`, `bilder/kontakt`), `…/E2-PRUEF-B4/wiederholung/pw.json`, `…/E2-PRUEF-B4/wiederholung/pw.log`.

## BILDBELEGE
Aufnahmen aus Prüfstufe A, nicht nach `_werkstatt/belege/e2-tor-2/` kopiert (Schritt 5 nicht erreicht):
- `…/E2-PRUEF-B4/bilder/start/m390.jpg`
- `…/E2-PRUEF-B4/bilder/start/d1440.jpg`
- `…/E2-PRUEF-B4/bilder/kontakt/m390.jpg`
- `…/E2-PRUEF-B4/bilder/kontakt/d1440.jpg`

## GEMEINSAME DATEIEN
Keine Änderung beantragt. Der fehlschlagende Test liegt in `_werkstatt/werkzeuge/tests/` (gemeinsam). Ursache nicht geprüft.

## OFFENE FRAGEN
1. Einwilligungs-Fehlschlag: Die Schild-Einstellungsansicht soll zwei „Aktiviert“-Markierungen zeigen (Analyse, Marketing). Ob `src/components/common/CookieConsent.tsx` (in der Änderungsmenge) das noch so rendert, ist nicht geprüft. Entscheidung beim Orchestrator.
2. Überlappung 4 auf `/` (H1-Spans „Perfektion“, „auf jedem“). Das Bild-Gate von Prüfstufe A prüft nur HTTP. In Prüfstufe B ist Überlappung 0 Maßstab. Bewertung offen.
3. Ob Prüfstufe B nach dem bestätigten Rot ausgesetzt wird, entscheidet der Orchestrator.
