# UM-E3-REG · Notiz des Baumeisters (28.10.2026)

Paket: Register v4 mit Zweck, Stufen, reduzierter Fassung und Cursor-Zuständen; `fugenband` entscheiden; Staffel `karte` ≤ 8 (PLAN-Zeile UM-E3-REG, Z-06). Schreibrechte laut PLAN: `src/lib/motion/register.ts`, `_werkstatt/register.json`, `src/app/bewegung.css`.
Briefing `pakete/UM-E3-W3.md`, Kern 4.3 (K-007, K-008, K-010, Regeln v4), E-067, E-078, E-080, E-081, E-082, AUFTRAG Abschnitt 8.
Arbeitskopie `w3/baum` (fortlaufend nach CURSOR, SCROLL, LEIT), Stand vorher `w3/vor-UM-E3-REG`, Diff `w3/UM-E3-REG.diff` (4 Dateien, 1341 Zeilen; nach der Nacharbeit neu gezogen, siehe Abschnitt „Nacharbeit nach der Prüfung“).
Stand vorher: `rsync` fehlt in der Umgebung, darum wie bei SCROLL und LEIT ein Abzug mit `tar` ohne `node_modules`. `diff -rq` gegen die Arbeitskopie war vor dem ersten Edit leer.

## Entwurf

**Zwei Teile in `register.ts`**
- `REGISTER` bleibt die kleine Laufzeitfassung (Auslöser, Schwellen, Aliase), die `bewegung.ts` im ersten Laden braucht. Neu ist nur `cursor: { ausloeser: 'interaktion' }`, und `SELBST` nennt `cursor` (das Cursor-Modul steuert sich selbst, ohne Beobachter und ohne Ladezustand).
- `REGISTER_V4` ist neu und wird von keinem Laufzeitcode importiert. Der Bau entfernt es (Turbopack im Bau: `turbopackRemoveUnusedExports` und Minify sind an, Doku `08-turbopack.md`). Je Kennung ohne Alias enthält es:
  - `zweck`: eine der fünf Arten aus AUFTRAG 8 (`orientierung`, `rueckmeldung`, `zusammenhang`, `hierarchie`, `charakter`);
  - `was`: ein Satz, was die Bewegung zeigt;
  - `stufen`: `dauer` (Namen der Dauer-Tokens aus globals.css oder `scroll` bzw. `eingabe`), `kurve` (Kurven-Tokens oder `linear`), `letzteStufe` (letzte Staffelstufe, nur wo gestaffelt wird);
  - `reduziert`: Art (`sofort`, `ueberblendung`, `gleich`, `grundform`) und Text; das gilt für reduzierte Bewegung und für „ruhig“;
  - `notaus`: Art (`endzustand`, `laeuft`, `ruhig`);
  - wahlweise `ohneOrt` (gebaut, aber auf keiner Seite, mit Grund) und `hinweis`;
  - beim Cursor `zustaende`: sechs Zustände mit Beschriftung, Ort, Zweck, Stufen und ruhiger Fassung.
- Aliase (`intro`, `startbild`) haben keinen eigenen Eintrag. Sie lösen über `aufgeloest` auf `eingang` auf.
- Regeln als Konstanten: `ZWECKE`, `DAUER_TOKENS`, `KURVEN`, `LETZTE_STUFE_HOECHSTENS = 7`, `REDUZIERT_ARTEN`, `NOTAUS_ARTEN`.

**`_werkstatt/register.json`**
- Neu erzeugt aus `register.ts` (Skript `w3/reg-pruef/json-erzeugen.mjs`, nicht Teil des Pakets).
- `kennungen` enthält jetzt `cursor`, `v4` enthält `cursor`, `quelle` und `hinweis` sind nachgeführt.
- Neu sind:
  - `register_v4.regeln` und `register_v4.eintraege` (Spiegel von `REGISTER_V4`);
  - `staffel_offen` mit den zwei Befunden über der Grenze, je mit Grund und Vorschlag;
  - `entscheidungen` mit `fugenband` und `staffel-karte`.
- `bewegung.mjs --modus register` liest `kennungen`. Damit ist `cursor` dort bekannt, und die Übergabe aus CURSOR, Offene Frage 1, ist erledigt.

**`bewegung.css`**
- Karte: Die Staffel reicht jetzt bis Stufe 7 statt bis Stufe 13. Der Ring 25 km startet bei Stufe 3 statt 5. Die Punkte starten bei 2 (nah, vorher 4), 5 (mittel, vorher 9) und 7 (weit, vorher 13). Der Ablauf dauert 0,78 s statt 1,1 s. Die Reihenfolge von innen nach außen bleibt, ebenso jeder Punkt mit seinem Ring. Der Kommentar ist nachgeführt.
- Fugenband: Der Kommentar hält die Entscheidung fest. Die Regeln selbst sind unverändert.
- Kopf der Datei: ein Hinweis auf `REGISTER_V4` und auf die neue Staffelprüfung.
- Gebaut mit `@tailwindcss/postcss` unterscheidet sich das CSS vom Stand vorher nur in den vier `transition-delay` der Karte (normaler Bau, `diff`).

**`test/bewegung.test.mjs`** (steht nicht in der PLAN-Zeile, siehe Entscheidung 7)
- Bewegung 1, 1b und 1c sind um `cursor` erweitert, nicht gelockert.
- Neu sind Bewegung 10 bis 14:
  - **10:** Jede Kennung ohne Alias hat einen v4-Eintrag mit gültigem Zweck. Jedes Dauer- und Kurven-Token steht in globals.css. Scrollgebunden heißt linear, Regler haben keine Kurve. Die ruhige Fassung und das Notaus stammen aus den erlaubten Arten. B-01 und der Plan-Morph sind „Überblendung“, die Regler „gleich“, die Leitachse „Grundform“ und läuft im Notaus. Seit der Nacharbeit auch: Außer `register.ts` nennt kein Quelltext unter `src` (`.ts`, `.tsx`, `.js`, `.jsx`, ohne Kommentare) die v4-Werte `REGISTER_V4`, `ZWECKE`, `DAUER_TOKENS`, `KURVEN`, `LETZTE_STUFE_HOECHSTENS`, `REDUZIERT_ARTEN` oder `NOTAUS_ARTEN` (Z-10).
  - **11:** Die letzte Staffelstufe je Kennung wird aus bewegung.css gelesen. Jede Regel mit `var(--staffel)` braucht ein `data-motion` im Selektor; die Galerie zählt über `STAFFEL_MAX`. Der gelesene Wert ist gleich dem Registerwert, die Karte liegt höchstens bei 7. Die Kennungen über der Grenze sind genau die aus `register.json` `staffel_offen`. Das ist eine Sperrklinke: Wird ein Befund behoben, muss er dort heraus.
  - **12:** Die sechs Cursor-Zustände stehen in derselben Reihenfolge wie `CURSOR_ZUSTAENDE` (cursor.ts) und mit derselben Beschriftung wie `CURSOR_REGISTER`.
  - **13:** `register.json` spiegelt `REGISTER_V4` und die Regeln.
  - **14:** `fugenband` und `weg` sind die einzigen Einträge ohne Ort. Kein Bauteil in `src/components` oder `src/app` trägt `.fugenband`, `.fugenband-rot` oder `data-motion="fugenband"`, und das CSS bleibt bereit. `momente/weg` wird nur vom Schaufenster eingebunden.

## Entscheidungen

1. **`fugenband`: nicht einsetzen, registriert und bereit lassen, nicht entfernen.**
   - Bestand: Das CSS (`.fugenband`, `.fugenband-rot`) und der Registereintrag existieren, aber kein Element trägt sie. `CompanyHistory.jsx` nutzt nur die statische Fuge `.fugenband-linie` in Strich.
   - Bauen ginge nur in `CompanyHistory.jsx`, und die Datei liegt nicht in den Schreibrechten.
   - Der Inhalt spricht ebenfalls dagegen: Seit UM-E3-LEIT läuft auf `/ueber-uns` der Leitfaden mit Abschnittsmarke auch neben der Firmengeschichte, weil der Werkzeug-Abschnitt in der Leitachse liegt (ErzaehlSeite.tsx). Ein zweites rotes Lot im selben Bildschirm, mobil rund 16 px daneben, bräche K-003 Nr. 5 „Eine Linie führt“ und „ein Rot je Bildschirm“.
   - Entfernen verlangt nach E-037 eine Rückfrage. Außerdem prüft der Wächter Schalter 4 den Spiegel `.fugenband-rot`.
   - Darum bleibt der Eintrag Teil des Systems, ohne Ort und nach dem Muster von `weg` (E-048). Die Begründung steht in `REGISTER_V4.fugenband.ohneOrt`, `register.json` `entscheidungen` und im Kommentar in bewegung.css. Test 14 schlägt an, sobald jemand das Fugenband einsetzt, ohne Ort und Register nachzuführen.
2. **Staffelgrenze: letzte Stufe ≤ 7, also acht Takte (Stufen 0 bis 7).**
   - Grundlage sind die Vorgaben „höchstens acht Elemente“ (AUFTRAG 8, KERN Regeln v4) und der Befund `karte` „Stufen bis 13“. Gemessen wird also die Stufe. Dieselbe Lesart hat schon die Galerie (`STAFFEL_MAX = 7`, „Stufen 0 bis 7“).
   - Die Karte liegt mit 7 auch unter der PLAN-Formulierung „≤ 8“.
   - Mit 0,78 s liegt die Karte jetzt im Richtwert für Auftritte (500 bis 900 ms), vorher waren es 1,1 s.
3. **Zwei weitere Befunde über der Grenze, bewusst nicht geändert, weil sie nicht in der PLAN-Zeile stehen. Sie stehen in `staffel_offen` und laufen über die Sperrklinke in Test 11.**
   - `einzugsband`: letzte Stufe 10, also 1,2 s, auf `/standorte` und den Ortsseiten. Vorschlag: Stufen 0, 3 und 6 (0,96 s). Das sind zwei Zeilen in bewegung.css (`* 5` → `* 3`, `* 10` → `* 6`), dazu `letzteStufe: 6`, `staffel_offen` ohne den Eintrag und eine Bildfolge.
   - `eingang`: Die Knopfzeile liegt bei `dauer-1` + 8 Stufen. Der Eingang ist abgenommen (E-081, 1,40 s). Zwei Wege: die Knopfzeile auf Stufe 7, also 60 ms früher, oder die Grenze für den Eingang als Signaturablauf (bis 1,5 s, test/intro) eigens festhalten.
4. **Notaus-Spalte (Übergabe LEIT, Offene Frage 2): Der Leitfaden läuft im Notaus weiter.**
   - Er hat keinen Startzustand, verbirgt nichts und braucht kein Skript. Das ist die Entscheidung 5 von LEIT, jetzt im Register (`notaus: 'laeuft'` mit Hinweis).
   - Nur der Lesefortschritt steht im Notaus bei 0 (SCROLL). Die übrigen Einträge habe ich aus dem CSS abgelesen:
     - `endzustand`: Startzustände unter `:not(.k-notaus)`;
     - `laeuft`: reine Rückmeldung ohne Startzustand, nämlich druck, zustand, aufklappen, verband, notiert, laden, die Regler, SIG-1 und fugenband;
     - `ruhig`: B-01, Plan-Morph und Cursor.
5. **Leitachse ruhig (Übergabe LEIT, Offene Frage 5):**
   - Im Register steht „Grundschicht: das graue Lot steht vollständig, kein Rot gezogen, keine Marke“.
   - Damit sind K-007 „steht vollständig“ (gemeint ist das graue Lot) und K-008 „Grundschicht, nichts gezogen“ vereinbar.
   - KERN selbst schreibe ich nicht; der Textvorschlag steht unten.
6. **Register v4 gibt das gebaute Verhalten wieder, nicht den älteren KERN-Text.**
   - `auftritt` ist reduziert ein Sofortzustand, denn ohne `k-bewegung` gibt es weder Startzustand noch Übergang. K-008 nennt dafür „Überblendung“; Vorschlag unten.
   - `karussell` hat in KERN den Zweck „Ruhe“. Das ist keine der fünf Arten. Gewählt ist `orientierung` (die Reihe geht weiter). Bitte bestätigen.
7. **`test/bewegung.test.mjs` außerhalb der Dateiliste.**
   - Ohne die Änderung bricht der Eintrag `cursor` die Tests Bewegung 1, 1b und 1c. Die vergleichen die Kennungsliste genau.
   - Bisher hatte jedes Register-Paket diese Datei in seinen Schreibrechten (E2-ORCH-01b, E3-ORCH-02a). Auch die CURSOR-Notiz kündigt die Anpassung an, Übergabe 1.
   - Bestehende Prüfungen sind nur erweitert, keine ist gelockert (G7). `package.json` bleibt unverändert, denn die Datei steht schon im Testskript.
   - Bitte in der PLAN-Zeile nachtragen.
8. **Zahlen ohne Dauer heißen nicht `staffel`.**
   - `werte.mjs` (Regel `dauer_zahl`) hält jede Zahl in einer Eigenschaft namens `…staffel…` für eine Dauer. Mit `staffel: 8` gab es 8 Befunde; die Galerie hat denselben Befund schon bei `STAFFEL_MAX` (Bestand, nicht in diesem Paket).
   - Eine Stufe ist ein Zähler, darum heißen die Felder `letzteStufe` und `LETZTE_STUFE_HOECHSTENS`. Danach gab es 0 Befunde. Das ist richtig benannt und keine Ausnahme in der Regeldatei.
9. **Token-Namen mit `--`.**
   - Tailwind liest auch `register.ts`. Zeichenketten wie `'dauer-4'`, `'ease-laser'`, `'ease-weg'` oder `'ease-aufsetzen'` erzeugten vier Hilfsklassen, die keine Seite braucht. Das hat der CSS-Bau gezeigt, ebenso ein Kommentar, der die Namen aufzählte.
   - Die Stufen tragen jetzt den Namen der CSS-Variable (`'--dauer-4'`). Danach unterscheidet sich das gebaute CSS nur noch in den vier Karten-Verzögerungen.
10. **Cursor-Zustände doppelt, aber geprüft.**
    - `register.ts` importiert `cursor.ts` nicht. Das Modul wird nachgeladen (Z-10) und darf nicht über `bewegung.ts` in den ersten Laden rutschen.
    - Die sechs Namen und Beschriftungen stehen darum im Register ein zweites Mal. Test 12 hält sie gleich.

## Offene Fragen und Übergaben (Orchestrator)

1. **KERN K-008 und K-007** (Werkstattdatei, Textvorschläge):
   - Zeile `karte`, Dauer: „Ringe `dauer-3` · `ease-setzen` von innen nach außen (25 km bei Stufe 3), Punkte je Zone `dauer-2` (nah 2, mittel 5, weit 7); gesamt 0,78 s“.
   - Zeile `einzugsband · szene-ablauf · fugenband`, Wo für `fugenband`: „vorerst keiner (UM-E3-REG: auf `/ueber-uns` führt der Leitfaden; gebaut, nur CSS)“.
   - Neue Zeile `cursor` (E-067-1):
     - Zweck: Rückmeldung.
     - Auslöser: Zeiger, nur `(hover: hover) and (pointer: fine)`, Modul ab der ersten Mausbewegung.
     - Dauer: Einblenden und Druck `dauer-1` · `ease-setzen`; „lädt“ eine Vierteldrehung je `dauer-5` linear; Lage ohne Feder.
     - Reduziert: ohne Übergänge, die Beschriftung bleibt, „lädt“ steht still.
     - Wo: alle Seiten. Zustände: Handlung, Ansehen, Ziehen, Vergleichen, nicht verfügbar, lädt.
   - Zeile `leitachse`:
     - Reduziert: „Grundschicht: graues Lot vollständig, kein Rot, keine Marke“.
     - Wo: „Erzählseiten; auf den Erzählseiten der Vorlage Leselinie 40 % mit Abschnittsmarke (UM-E3-LEIT); im Notaus läuft sie weiter“.
     - K-007, Spalte Ruhig: „Grundschicht, graues Lot vollständig“.
   - Zeile `auftritt`, Reduziert: „Sofortzustand“.
   - Regeln v4, Punkt Staffel: „höchstens acht Takte (Stufen 0 bis 7 in Vielfachen von `--staffel`); `karte` angepasst (UM-E3-REG, 13 → 7); offen: `einzugsband` (10), `eingang` (8), siehe `register.json` `staffel_offen`“.
   - Einleitung K-008: Maschinenfassung auch `src/lib/motion/register.ts` (`REGISTER_V4`: Zweck, Stufen, ruhige Fassung, Notaus, Cursor-Zustände).
2. **Bauvorgabe `_werkstatt/register/karte.json`** (nicht in den Schreibrechten): Das Feld `dauer` ist veraltet. Neuer Wortlaut: „Ring 10 km dauer-3 ab 0 ms; Ring 25 km dauer-3 ab staffel × 3; Punkte nah dauer-2 ab staffel × 2, mittel ab staffel × 5, weit ab staffel × 7; gesamt 780 ms“.
3. **Werkzeug `bewegung.mjs`** (Orchestrator):
   - `AUSLOESER` kennt `cursor` noch nicht. Vorschlag: `cursor: 'selbst'`; ohne den Eintrag nimmt das Werkzeug Scroll an und vermerkt es.
   - Für `pruefeSichtbarkeit` gilt der Vorschlag aus der CURSOR-Notiz weiter: eine Ausnahme für das ruhende Schild (`data-cursor-stand="aus"`).
4. **Entscheidung zu Befund 3 oben:** `einzugsband` nach Vorschlag anpassen, und den Eingang anpassen oder als Ausnahme festhalten? Für beides steht der fertige Vorschlag in `staffel_offen`.
5. **Rückfrage an den Auftraggeber (MENSCHEN, Vorschlag):** Das Fugenband ist gebaut, steht aber auf keiner Seite, weil der Leitfaden die Rolle auf `/ueber-uns` schon trägt. Darf das CSS mit dem nächsten Abbau-Paket entfallen, nach E-037 nur mit Zustimmung?
6. **Stufe A, ohne Browser nicht belegbar:**
   - Bildfolge `karte` auf `/ueber-uns` und `/kontakt` in m390 und d1440 (Z-06): Ringe und Punkte von innen nach außen, gesamt rund 0,78 s.
   - Pixelvergleich: Ruhezustände und reduzierte Bewegung bleiben 0 Pixel, denn die Endzustände sind unverändert. Unterschiede gibt es nur in Aufnahmen während des Auftritts.
   - `bewegung.mjs --modus register` am Desktop nach einer Mausbewegung: `cursor` ist nicht mehr unbekannt, sobald `register.json` übernommen ist.
   - Prüfung, dass `REGISTER_V4` nicht ausgeliefert wird: nach `next build` zum Beispiel `grep -l "grundform" .next/static/chunks/*.js`, Erwartung leer. Für den jetzigen Stand hat ein Prüfer das schon belegt (eigener Produktionsbau, Next 16.4.3 mit Turbopack, `w3/funk-pruef`: kein Chunk nennt `ueberblendung`, `letzteStufe`, `grundform`, `orientierung` oder `rueckmeldung`). Seit der Nacharbeit sichert Bewegung 10 die Voraussetzung im Quelltext; der Bauschritt bleibt der Beleg für Turbopack. Würde es mitgebaut, kostete es rund 3 KB gzip im ersten Laden (Messung `register.json` `eintraege`: 10.824 Byte roh, 3.068 gzip). Dann gehört der Teil in eine eigene Datei, zum Beispiel `src/lib/motion/register-v4.ts`; die braucht neue Schreibrechte.
7. **Leselinie für `weg`** (LEIT, Offene Frage 4): nicht in diesem Paket. `weg` steht weiter ohne Ort (E-048). Das gilt erst, wenn ein Paket `weg` auf eine Seite bringt.
8. **Zweckzuordnung bestätigen:**
   - `karussell` als `orientierung` (KERN „Ruhe“).
   - `szene-ablauf`, `schichten` und beide `gefaelle` als `zusammenhang`; KERN nennt für `szene-ablauf` „Orientierung und Zusammenhang“.

## Nacharbeit nach der Prüfung (28.10.2026)

Zwei Prüfer, vier Befunde, alle „gering“. Jeden Befund habe ich am Code nachgeprüft.

1. **`register.json` `hinweis` doppelt (Befunde 1 und 3, bestätigt, behoben).**
   - Nachgezählt: Beide neuen Sätze standen zweimal im Feld, im Stand vorher keiner.
   - Ursache: `w3/reg-pruef/json-erzeugen.mjs` hängte den Zusatz an `alt.hinweis` an und lief auf der schon fortgeschriebenen Datei ein zweites Mal.
   - Das Skript ist jetzt wiederholbar. Es schneidet `hinweis` vor dem ersten Vorkommen von „ Seit UM-E3-CURSOR gibt es cursor“ ab und hängt den festen Zusatz genau einmal an.
   - Dann zweimal hintereinander gelaufen: Beide Läufe ergeben dieselbe Datei (`cmp`). Jeder Satz steht einmal da. `hinweis` beginnt wortgleich mit dem Stand vorher. Alle übrigen Felder sind gleich wie vor der Nacharbeit, Test 13 bleibt also unverändert grün.
2. **Z-10 hängt nur am Tree-Shaking (Befund 2, bestätigt als fehlende Absicherung, behoben).**
   - Heute liest kein Quelltext außerhalb von `register.ts` die v4-Werte (`grep` über `src`: leer). Der Prüferbau zeigt, dass Turbopack sie weglässt. Ein Test dafür fehlte aber.
   - Bewegung 10 prüft jetzt alle Quelltexte unter `src` (`quelltexte()` aus Test 14, Kommentare entfernt). Außer `register.ts` darf keiner `REGISTER_V4`, `ZWECKE`, `DAUER_TOKENS`, `KURVEN`, `LETZTE_STUFE_HOECHSTENS`, `REDUZIERT_ARTEN` oder `NOTAUS_ARTEN` nennen. Das sind alle Werte, die nur Register v4 betreffen. Typen löscht der Bau ohnehin.
   - Eine Gegenprüfung stellt sicher, dass der Scan `lib/motion/bewegung.ts` erfasst.
   - Das Entfernen der Kommentare steht jetzt in der Hilfsfunktion `ohneKommentare()`. Test 14 nutzt sie mit demselben Ausdruck wie vorher, sein Verhalten ändert sich nicht (Gegenprobe 4 unten).
   - Der Kopfkommentar in `register.ts` nennt jetzt Bewegung 10 als Sicherung, statt nur „der Bau lässt es weg“ zu behaupten.
3. **`test/bewegung.test.mjs` außerhalb der PLAN-Zeile (Befund 4, bestätigt, kein Eingriff am Diff).**
   - Der Prüfer schlägt selbst keine Änderung vor und bestätigt, dass nichts gelockert ist.
   - Die Entscheidung ist formal und liegt beim Orchestrator: die Datei in der PLAN-Zeile nachtragen, wie in Entscheidung 7 erbeten, oder Pflichtteil (Bewegung 1, 1b, 1c) und neue Tests (10 bis 14) trennen.
   - Die Nacharbeit zu Befund 2 erweitert dieselbe Datei um eine Prüfung in Bewegung 10. Neue Testnamen oder neue Testdateien gibt es nicht. `package.json` bleibt unverändert.

**Gegenproben der Nacharbeit**, nur `test/bewegung.test.mjs`, vorher 16 von 16 grün:
1. `import { REGISTER_V4 } from './register'` in `bewegung.ts`: Bewegung 10 rot.
2. `REGISTER_V4`, `KURVEN` und `DAUER_TOKENS` nur in Kommentaren von `bewegung.ts`: grün, wie gewollt.
3. `DAUER_TOKENS` in `CompanyHistory.jsx`: Bewegung 10 rot.
4. `"fugenband-rot"` in `CompanyHistory.jsx`: Bewegung 14 rot, also unverändert nach dem Umbau auf `ohneKommentare()`.
- Kontrolle danach: 16 von 16 grün. `cmp` zeigt, dass beide Dateien wieder im alten Zustand sind.

## Prüfzahlen (Arbeitskopie, Node 24.22.1; nach der Nacharbeit neu erhoben)
- `npm test`: 248 von 248 bestanden, 0 Fehler. Die Zahl ist gleich geblieben, denn die neue Prüfung steht in Bewegung 10.
  - Vorher waren es 243. Neu sind Bewegung 10 bis 14; Bewegung 1, 1b und 1c sind um `cursor` erweitert.
  - Kein Test ist gelockert. Die Wächter Schalter 4 und 5, die Eingangs-Tests und `cursor.test.mjs` bleiben grün.
- `npx tsc --noEmit -p .`: 0 Fehler. `next-env.d.ts` war vorübergehend angelegt und ist wieder gelöscht, ebenso `tsconfig.tsbuildinfo`.
- `npx eslint src/lib/motion/register.ts test/bewegung.test.mjs`: 0 Fehler, 0 Warnungen. `bewegung.css` und `register.json` liegen außerhalb der ESLint-Konfiguration.
- `node _werkstatt/werkzeuge/werte.mjs --arbeitsbaum --dateien src/lib/motion/register.ts,src/app/bewegung.css,test/bewegung.test.mjs`: 0 Befunde. Zwischenstand mit dem Feld `staffel`: 8 Befunde `dauer_zahl`, siehe Entscheidung 8.
- **CSS-Bau** mit `@tailwindcss/postcss`, normal und minifiziert, über `w3/reg-pruef/css-bau.mjs`:
  - ohne Warnung;
  - gegen den Stand vorher nur die vier `transition-delay` der Karte (4 → 2, 5 → 3, 9 → 5, 13 → 7).
  - Ein Zwischenstand hatte vier zusätzliche Hilfsklassen, siehe Entscheidung 9.
  - Nach der Nacharbeit (neuer Kommentar in `register.ts`) neu gebaut, normal und minifiziert (`w3/reg-pruef/nacharbeit/css/`): keine Warnung, Byte für Byte gleich wie der Bau vor der Nacharbeit (`cmp`).
- **Staffelstufen** aus bewegung.css, gelesen mit dem Verfahren des Tests:
  - vorher: Galerie 7, Eingang 2/6/8, Zeilenmaske 6, Einzugsband 5/10, Karte 4/5/9/13, sig-flucht 2/4/6;
  - nachher dieselben Werte, nur die Karte hat 2/3/5/7.
- **Gegenproben**, alle rot, Kontrolle danach grün (16 von 16):
  1. Karte im CSS zurück auf 13;
  2. Karte bei 8 ohne Registerwert;
  3. eine Staffel-Regel ohne `data-motion`;
  4. Einzugsband behoben, aber `staffel_offen` nicht nachgeführt (Sperrklinke);
  5. `register.json` weicht ab;
  6. Cursor-Beschriftung geändert;
  7. unbekanntes Token `--dauer-6`;
  8. Fugenband in CompanyHistory eingesetzt;
  9. `cursor` aus `REGISTER` entfernt;
  10. scrollgebunden mit Kurve `setzen`;
  11. Regler ruhig „sofort“ statt „gleich“.
  - Jede geänderte Datei wurde danach zurückgesetzt, `cmp` meldete keine Abweichung.
- **Diff** (`w3/UM-E3-REG.diff`, mit dem Befehl aus dem Briefing):
  - Auf einer frischen Kopie des Stands vorher angewendet (`patch -p1`), gleicht das Ergebnis der Arbeitskopie Datei für Datei.
  - Korrektur in der Nacharbeit: Allein auf das Repository angewendet, gilt er nicht. Das galt schon für den ersten Diff, die frühere Aussage war falsch.
    - `git apply --check` meldet „patch failed: src/app/bewegung.css:156“, und zwar beim neuen wie beim alten Diff.
    - Grund: Im Repository ist `bewegung.css` noch auf dem Stand vor CURSOR. SCROLL und LEIT fehlen dort.
    - Der Diff gilt also nur in der Reihenfolge der Welle. Gegenprobe auf einer Kopie von HEAD b242cfe2 (`git archive`): CURSOR, SCROLL, LEIT und REG nacheinander mit `patch -p1` angewendet, jeweils ohne Fehler und ohne `.rej`. Danach gleichen die vier Dateien der Arbeitskopie (`cmp`).
  - Nach der Nacharbeit neu gezogen: 4 Dateien, 1341 Zeilen. Auf einer frischen Kopie von `vor-UM-E3-REG` angewendet, gleicht das Ergebnis der Arbeitskopie.
  - Das Repository blieb unberührt (`git status` leer, HEAD b242cfe2).

## Dateien
- `src/lib/motion/register.ts`: `cursor` in `REGISTER` und `SELBST`; Register v4 mit `REGISTER_V4`, Regeln und Typen; Kopfkommentar, der seit der Nacharbeit Bewegung 10 als Sicherung nennt.
- `_werkstatt/register.json`: aus `register.ts` erzeugt; `cursor`, `register_v4`, `staffel_offen`, `entscheidungen`. Seit der Nacharbeit steht der Zusatz in `hinweis` nur einmal.
- `src/app/bewegung.css`: Staffel der Karte (13 → 7) mit Kommentar; Kommentar zur Fugenband-Entscheidung; Hinweis im Kopf.
- `test/bewegung.test.mjs`: außerhalb der PLAN-Liste, siehe Entscheidung 7. Bewegung 1, 1b und 1c erweitert, Bewegung 10 bis 14 neu. Bewegung 10 hat seit der Nacharbeit einen Quelltext-Scan (Z-10); die Hilfsfunktion `ohneKommentare()` nutzen Test 10 und Test 14.
- Hilfsdateien, nicht Teil des Pakets:
  - `w3/reg-pruef/` (`json-erzeugen.mjs`, seit der Nacharbeit wiederholbar; `css-bau.mjs`, `stufen.mjs`, Bauergebnisse);
  - `w3/reg-pruef/nacharbeit/`: Sicherungen vor der Nacharbeit (`register.vorher.json`, `register.vorher.ts`, `bewegung.test.vorher.mjs`, `UM-E3-REG.vorher.diff`, `UM-E3-REG.notiz.vorher.md`), Lauf 1 des Skripts und `tsc.txt`.
