# Fusionsregeln · Fusion II (E-039) · gelten für jeden Auftrag F-xx

Lies diese Datei ganz, dann `_relaunch/pakete/_seitenregeln.md` (gilt vollständig, mit den Abweichungen unten), bei
Formularen zusätzlich `_relaunch/pakete/_formularregeln.md`, dann deinen Auftrag und das Gutachten deiner Einheit.
Bei Widerspruch gilt dein Auftrag, dann diese Datei, dann die Seitenregeln. Bei Zweifel: OFFENE FRAGE statt raten.

## Lage
Zwei Sitzungen haben dieselbe Einheit unabhängig voneinander im KERN v2 gebaut. Der Auftraggeber hat entschieden:
**abschnittsweise blind vergleichen und fusionieren; Verbesserungen ohne Optik kommen aus beiden** (E-039).
- **Fassung A** liegt im Arbeitsbaum (`main`, live). Sie ist die Datei, die du änderst.
- **Fassung B** ist nur lesbar: `git show f53181e:<pfad>` (Dateien) und als laufender Build auf **http://127.0.0.1:4371**.
  Bausteine nur aus B (z. B. `src/components/leistungen/*`, `src/components/blog/BlogListe.jsx`) liegen schon im Baum,
  sind aber nicht eingebunden; dein Auftrag sagt, ob du sie nutzt, anpasst oder löschst.
- **Gutachten:** `_relaunch/belege/e039-gutachten/<einheit>.md` – je Abschnitt bzw. Zustand die Wahl (A, B, gleich, beide)
  mit Begründung, die Liste der Barrierefreiheits- und Verhaltensstärken beider Fassungen und ein Fusionsrezept.
  Das Gutachten ist verbindlich. Abweichen nur mit Begründung in der Rückgabe (z. B. technisch unvereinbar).

## Fusion – was gilt
1. **Grundgerüst** nach dem Rezept des Gutachtens. Übernimmst du einen Abschnitt aus B, übertrage ihn in die Struktur von
   A (gleiche Bausteine, gleiche Flächenfolge), nicht umgekehrt – es sei denn, das Rezept nennt B als Grundgerüst.
2. **Jede gewählte Fassung** eines Abschnitts muss in der Fusion sichtbar sein (gleiche Komposition, gleiche Bausteine);
   „beide“ heißt: die genannten Teile beider zusammen.
3. **Barrierefreiheit und Verhalten: Vereinigungsmenge.** Jede Stärke aus der Liste des Gutachtens (Fokusringe, Labels,
   `role="alert"`/`aria-live`, `autocomplete`, `aria-pressed`/`aria-valuetext`, Fokusführung, Überlauf-Fixes,
   Touch-Ziele) gehört in die Fusion. Ziel: in jeder Kennzahl mindestens so gut wie die bessere Fassung.
4. **Wortlaut, Anker, IDs, JSON-LD, Metadaten:** Vereinigungsmenge, nichts geht verloren; wo A und B im Wortlaut abweichen,
   gilt der Wortlaut des Live-Stands (A), außer der Unterschied ist ein freigegebener Mikrotext von B
   (`_relaunch/MIKROTEXTE.md`) – dann in der Rückgabe nennen.
5. **Werkstatt-Bausteine** (`Planblatt`, `Rueckfrage`, `Zeitband`, `VerbandUmschalter`, `Einstieg` mit `pfad`) und die
   Bausteine aus `src/components/kern/*` nutzen, statt Gleiches neu zu bauen.
6. **Tests:** Die Selektoren der Suite (`_relaunch/werkzeuge/tests/*.spec.mjs`) bleiben gültig. Lies vor dem Bauen die
   Fälle deiner Einheit; brauchst du einen anderen Selektor, melde das unter GEMEINSAME DATEIEN (Tests schreibt nur der
   Orchestrator), statt einen Test zu umgehen.

## Abweichungen von den Seitenregeln
- **Live-Stand = http://127.0.0.1:4360** (Build von 090858e, gleich www.tezgel.de 28ee443) statt 4337.
- Entwicklungsserver **http://127.0.0.1:4350** (Arbeitsbaum) wie dort.
- Prüfung 5 (Texttreue) gegen 4360 **und** gegen 4371: keine Textzeile, die in A oder B steht, fehlt in der Fusion
  (außer begründeten Mikrotexten).
- Prüfung 6 (Bilder): zusätzlich je gewähltem Abschnitt ein Bild der Fusion neben A und B (gleiche Ansicht), sichten.
- Zusätzlich Prüfung 10: `RELAUNCH_BASE=http://127.0.0.1:4350 node _relaunch/werkzeuge/a11y-zusatz.mjs --satz <kennung> --seiten <pfade>`
  und `node /tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad/e039/a11y-vergleich.mjs <A.json> <Fusion.json>`
  gegen die vom Orchestrator bereitgelegten Läufe von A und B (Pfade im Auftrag) → keine Kennzahl schlechter als die
  bessere Fassung; jede Ausnahme mit Ursache.

## Rückgabe
Wie in den Seitenregeln, zusätzlich vor PRÜFUNG ein Abschnitt **UMSETZUNG DES GUTACHTENS**: je Abschnitt/Zustand die Wahl
und wie sie umgesetzt ist (eine Zeile), dann je Stärke der a11y-Liste „übernommen: wo“.
