# E4-W1-FORMULARE · Formulare bei 200 % Schrift und ohne Vorauswahl (Welle E4-W1-SICHT, E-065)

Herkunft: Browserprüfung der Welle E4-W0 am Reinraum cc7af669 (wf_e84975af-42f, Befunde in `$SCRATCH/e4w0-browser`, Ergebnis `tasks/wn1j451mk.output`). Bei 200 % Systemschrift (m390) brechen in den Auswahlkarten und Knöpfen der Formulare Wörter mitten im Wort und ohne Strich um, Knöpfe stehen Wort für Wort untereinander, und mehrere Formulare haben beim Laden schon eine Auswahl getroffen, die die Besucherin nie gemacht hat.

`$SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`

## Schon erledigt (Orchestrator, gemeinsame Bausteine, nicht noch einmal ändern)
- `src/components/kern/stile.ts`:
  - `KNOPF_BASIS` hat `hyphens-auto @max-3xs:px-3`.
  - `wahlKlassen` hat `hyphens-auto @max-3xs:px-2`.
  - `feldKlassen` nimmt schmal nur links Innenabstand weg (`@max-xs:pl-3`), ein `pr-12` für Pfeil oder Lupe bleibt.
- `src/app/globals.css`: `body` hat `hyphenate-limit-chars: 12 5 5`. Jedes Element mit `hyphens-auto` trennt nur Wörter ab 12 Zeichen, je Teil mindestens 5.
- Container-Abfragen: `@max-3xs` (unter 16rem) und `@max-xs` (unter 20rem) greifen nur innerhalb eines `@container`. Am Handy bei 200 % sind die Formularspalten 260 bis 330 px breit, also weit unter 16rem = 512 px. Bei 100 % greifen sie dort nicht.

## Regeln für alle Pakete
- Nur die Dateien des eigenen Pakets ändern (Liste je Paket). Die Spec des eigenen Formulars unter `_werkstatt/werkzeuge/tests/` gehört zum Paket. Gemeinsame Dateien (`src/components/kern/**`, `src/app/globals.css`, `bewegung.css`, `src/config/**`, `src/lib/email/**`, Testkonfiguration) nicht anfassen; wenn sie nötig wären, im Bericht vorschlagen.
- G8:
  - Pflichtfelder und Empfänger der Formulare bleiben unverändert.
  - Was Pflicht ist, bestimmt die Validierung im Formular (Sternchen, `required`, Fehlertexte) und serverseitig `src/lib/email/validation.ts`. Serverseitig ist nur der Kontakt Pflicht, alle Details sind optional.
  - Ein Feld ohne Vorauswahl bleibt so Pflicht oder frei wie vorher. War es Pflicht, muss die Besucherin jetzt selbst wählen: Der Weiter-Knopf zeigt dann wie bei jedem Pflichtfeld den Fehlertext, statt still die Vorauswahl zu schicken.
- G5: keine echten Sendungen; die Specs fangen Ziele ab.
- G7: keine Prüfung lockern; eine Spec, die die alte Vorauswahl erwartet, wird auf das neue Verhalten umgeschrieben, nicht übersprungen.
- Texte in Alltagssprache (K-010): kurz, ohne Gedankenstrich, ohne Bindestrichwörter, wo es geht. Neue Texte versprechen keine Fristen (M-07).
- Nichts committen, kein schreibender Git-Befehl.

## Prüfen (jedes Paket)
- Entwicklungsserver läuft auf `http://127.0.0.1:4320` (nicht starten, nicht stoppen).
- Einzelbilder vorher und nachher, aus `_werkstatt/werkzeuge`:
  `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers RELAUNCH_SCRATCH=$SCRATCH node einzelbild.mjs --base http://127.0.0.1:4320 --seite <seite> --ansichten m390 --voll --einwilligung abgelehnt --bewegung reduce --schrift 200 --ziel $SCRATCH/e4w1-form/<paket>/<vorher|nachher>`
  Dazu dasselbe ohne `--schrift` mit `--ansichten m390,d1440`, damit 100 % unverändert gut bleibt.
  Schneide die Formularstelle mit Python/PIL aus und sieh sie an (Read).
  Ziel bei 200 %:
  - kein Wort ohne Strich mitten im Wort getrennt;
  - kein Knopf, dessen Text Wort für Wort untereinander steht;
  - keine Ziffer oder Einheit allein in einer Zeile (zwischen Zahl und „m²“ ein geschütztes Leerzeichen);
  - Überlauf 0 und Überlappung 0 in `einzelbild.json`.
- Specs des Formulars: `RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_REPORT=$SCRATCH/e4w1-form/<paket>/spec.json RELAUNCH_OUTPUT=$SCRATCH/e4w1-form/<paket>/spec-ergebnisse npx playwright test -c playwright.config.mjs tests/<spec>` (aus `_werkstatt/werkzeuge`, Umgebung wie oben). Alle grün.
- Aus `/home/user/tezgel`: `npx tsc --noEmit -p .`, `npx eslint <geänderte Dateien>`, `npm test` (210 von 210 oder mehr).
- Bericht: geänderte Dateien, je Befund was geändert ist, Pfade der Vorher- und Nachher-Bilder, Ergebnis der Prüfungen, offene Punkte.

## Pakete

### F1 · Badanfrage (BadanfrageFunnel)
- Seiten: `/bad/badsanierung` (Abschnitt „Badanfrage“), `/bad/barrierefreies-bad`, `/bad`.
- Dateien:
  - `src/components/funnels/BadanfrageFunnel/**`
  - `src/lib/formulare/useBadanfrage.ts`
  - Spec `tests/funktion-badanfrage.spec.mjs`
- Befunde:
  1. Schritt 1, Kacheln „Um welche Art von Immobilie …“: „Einfamilie|nhaus“, „Eigentum|swohnun|g“, „Mehrfamil|ienhaus“, „Hausverwaltu|ng“ ohne Strich. Ursache: `kachelInhaltClass` mit `wrap-break-word` ohne Trennung, schmale Spalte. Ziel: Trennung mit Strich (`hyphens-auto`). Bei schmalem Container eine Spalte und weniger Innenabstand der Kachel, wenn nötig.
  2. Knopf „Weiter zu Schritt 2“ auf vier Zeilen, die „2“ allein. Ziel: höchstens zwei Zeilen, nie eine Ziffer allein (geschütztes Leerzeichen zwischen „Schritt“ und Zahl).
  3. „Einfamilienhaus“ ist beim Laden gewählt (`objectType: 'efh'` in `useBadanfrage.ts`). Ziel: keine Vorauswahl. Pflicht bleibt Pflicht (siehe Regeln). Die Zusammenfassung und die Nachricht nennen ungewählte freie Felder „keine Angabe“.

### F2 · Projektcheck fürs Bad (BadProjektCheck)
- Seite: `/bad`.
- Dateien:
  - `src/components/funnels/BadProjektCheck/**`
  - `src/lib/formulare/useProjektCheck.ts`
  - Spec `tests/funktion-projektcheck.spec.mjs`
- Befunde:
  1. Schritte 2 bis 4 und Zusammenfassung bei 200 %: Spalten der Auswahlkarten zu schmal (äußerer Kasten, innerer Rand, Kartenrand, Kästchen). „Komplettba|d“, „Schlüsselfert|ig“, „Teilsanieru|ng“, „Boden|gleich|e Dusch|e“. Ziel: bei schmalem Container eine Spalte, weniger Innenabstand, Kästchen über oder neben dem Text so, dass ganze Wörter Platz haben. Lange Wörter mit Strich.
  2. Schritt 1, Skala unter dem Regler: Die vier Werte stehen in einem 2 × 2-Raster; „8,2 m²“ steht rechts, der Reglerknopf für 8,2 m² aber nahe am linken Ende. Ziel: Die Beschriftungen stehen in der Reihenfolge des Reglers. Am Handy zum Beispiel als Liste von links nach rechts beziehungsweise von oben nach unten, die nicht so tut, als lägen die Werte an der Reglerstelle.
  3. Vorauswahl beim Laden: „Komplettbad“, „Gehoben“, 8,2 m² und vier Extras. Die Zusammenfassung zeigt sie als Wünsche.
     - Ziel: Bereich, Ausstattung und Extras ohne Vorauswahl.
     - Die Zusammenfassung zeigt ungewählte Angaben als „noch keine Angabe“.
     - Der Regler braucht einen Wert. Er darf auf einem Startwert stehen, die Zusammenfassung nennt die Fläche aber erst, wenn die Besucherin den Regler bewegt hat. Bis dahin steht dort „noch keine Angabe“.
     - Die Preisspanne bzw. das passende Musterbad erscheint erst, wenn die Angaben dafür gewählt sind. Bis dahin steht ein Satz, was noch fehlt.
     - Die gesendete Nachricht enthält nur, was gewählt wurde.

### F3 · Konfigurator für Fliesen (FliesenKonfigurator)
- Seite: `/fliesen` (Abschnitt Konfigurator).
- Dateien:
  - `src/components/funnels/FliesenKonfigurator/**`
  - `src/lib/formulare/useFliesenKonfigurator.ts`
  - Spec `tests/funktion-konfigurator.spec.mjs`
- Befunde:
  1. Schritt 1, Karten „Küche“ und „Bad, Dusche, …“: „Küchenrückwa|nd“, „Planungswerkz|euge“ ohne Strich. Ziel: Trennung mit Strich, schmal weniger Innenabstand.
  2. Knopf „Weiter zu Schritt 2“ auf vier Zeilen. Ziel: höchstens zwei Zeilen.
  3. Schrittanzeige „1 2 3 4“: Die „4“ rutscht allein in die zweite Zeile. Ziel: alle Schritte in einer Zeile oder gleichmäßig verteilt (zum Beispiel 2 × 2), nie eine Ziffer allein.
  4. Prüfen, ob beim Laden etwas vorausgewählt ist. Wenn ja: wie F1 Punkt 3.

### F4 · Kurze Anfrage in drei Schritten (TezgelAnfrageFunnel)
- Seiten: `/leistungen`, `/kontakt`, `/` (Formular unten), `/standorte/wetzlar`.
- Dateien:
  - `src/components/funnels/TezgelAnfrageFunnel/**`
  - `src/lib/formulare/useAnfrageFunnel.ts`
  - `src/lib/formulare/useHeroKontakt.ts` (nur wenn dort dieselbe Vorauswahl steht)
  - Spec `tests/funktion-express-funnel.spec.mjs`
- Befunde:
  1. Knopf „Weiter zu Schritt 2: Fläche und Ort“ bei 200 % in sieben Zeilen, ein Wort je Zeile, der Pfeil hängt mittendrin. Ursache: Rand der Seite, Kartenrahmen und Innenabstand lassen nur rund 228 px bzw. 110 px. Ziel: höchstens drei Zeilen, Pfeil hinter dem letzten Wort oder darüber, Text als Satz lesbar.
  2. Kachel „Bad & Wellness“ ist beim Laden gewählt (`useState('bad')`). Ziel: keine Vorauswahl, wie F1 Punkt 3.

### F5 · Preisrechner und Seite `/preise`
- Seite: `/preise`.
- Dateien:
  - `src/app/(bestand)/preise/**`
  - `src/components/pricing/**`
  - `src/lib/formulare/usePreisrechner.ts`
  - Spec `tests/funktion-preisrechner.spec.mjs`
- Befunde bei 200 %:
  1. Abschluss-Kasten unten („Planen Sie ein Fliesen- oder Badprojekt? Sprechen Sie direkt mit F…“): „Fachbetriebsleiter“ läuft über den Rand, „Badprojekt?“ ragt hinaus.
  2. Fragen und Antworten, letzte Frage: „Fördermöglichkeiten“ läuft unter das Plus-Zeichen, „Steuererleichterungen?“ läuft über den Bildschirmrand.
  3. Auswahlfeld „Gewünschter Zeitraum“ zeigt „In den näch…“, der Pfeil liegt auf dem Text. Teilweise schon durch `feldKlassen` behoben; prüfen.
  4. Textfeld „4. Beschreiben Sie kurz …“: Der Beispieltext ist mitten in einer Zeile abgeschnitten, auch bei 100 %. Ziel: Er passt ganz hinein (Zeilenzahl), oder er ist kürzer.
  5. „m²“ steht allein in einer Zeile. Ziel: geschütztes Leerzeichen.
- Vorauswahl: Projektart (`serviceType: 'bad'`) und Zeitraum („In den nächsten 1 - 3 Monaten“) sind beim Laden gewählt. Gleichzeitig steht „Auswahl erforderlich“ daneben. Ziel: keine Vorauswahl, Regeln wie oben. Raumgröße und Zusatzoptionen sind seit E-062 schon ohne Vorauswahl.
- Texte der Seite (Lesbarkeit rot):
  - Problemstellen:
    - 4 Sätze über 25 Wörter (26, 30, 31, 32);
    - 4 Gedankenstriche;
    - 20 Bindestrichwörter, darunter „Vor-Ort-Aufmaß“ viermal, „XXL-Großformate“, „C2-TE“, „Spezial-Vakuumhebetechnik“, „Bad-Sanierung“, „Norm-Abdichtung“, „Walk-In“, „VOB-Gewährleistung“, „HWK-Fachbetrieb“, „Google-Bewertung“;
    - 2 Floskeln: „Perfekte Unterlüftung“, „perfekten Fuge“;
    - 13 Fachwörter ohne Erklärung: Abdichtung, DIN 18534, Untergrund, Drainage, Feinsteinzeug, Vakuumhebetechnik, Nivelliersystem, Dichtmanschetten und weitere.
  - Ziel:
    - Sätze höchstens 25 Wörter, keine Gedankenstriche, Bindestrichwörter auflösen (zum Beispiel „Termin vor Ort“ statt „Vor-Ort-Aufmaß“), Floskeln ersetzen.
    - Fachwörter mit dem Baustein `Fachwort` (`src/components/kern/Fachwort.tsx`, Einträge in `src/config/glossar.ts`) einbinden, wenn es einen Eintrag gibt; sonst in Alltagssprache umschreiben.
    - Firmendaten, Preise, Versprechen und rechtliche Angaben bleiben inhaltlich gleich (G8, M-07).
  - Prüfung: `node lesbarkeit.mjs --satz e4w1-preise --seiten /preise --base http://127.0.0.1:4320 --ziel $SCRATCH/e4w1-form/F5/lesbarkeit` (aus `_werkstatt/werkzeuge`), Ziel grün.
