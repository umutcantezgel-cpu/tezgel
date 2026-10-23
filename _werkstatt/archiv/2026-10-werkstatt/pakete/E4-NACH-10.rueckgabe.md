# E4-NACH-10 · Rückgabe (Baumeister, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/page.jsx` (einzige geänderte Datei; kein Commit, kein Push)

## WAS UND WARUM
- **Wissen kompakt:** Jedes der sechs Felder trägt oben einen kleinen Verlegeplan (`Verlegeplan`, `ohneAchse`, `bemassung={false}`, dekorativ). Zuordnung: Räume → `wohnen`, Neubau oder Bestand → `untergrund`, Formate → `grossformat`, Verlegetechnik → `fussbodenheizung`, Planung & Qualität → `fugen`, Bad → `bad`. Feste Höhe `h-32` plus `min-h-full` am Plan, damit Etiketten und Überschriften einer Zeile fluchten (sonst etwa 10 px Versatz).
- **Mobil (unter md):** Etikett, Plan und Überschrift als Zusammenfassung eines `details` (Muster Fachgewerke, Plus/Minus). Text und Links liegen im Aufklapper und sind zu. Ab md stehen sie offen; dafür gibt es eine zweite Fassung mit `hidden md:flex`.
- **Weitere Fachthemen:** `kopf="seitlich"`; in der Kopfspalte unter der Einleitung ein Verlegeplan im Schnitt (`abdichtung`, `schnitt`, `ohneAchse`, ohne rote Zusatzachse).
- **Konfigurator:** Der Abschnitt hat keinen Kopf mehr. Darin ein Raster `lg:grid-cols-12`: Konfigurator `lg:col-span-8`, `<Rueckfrage />` `lg:col-span-4`; mobil darunter. ID `konfigurator` und ARIA-Name bleiben. Der Konfigurator wird per `next/dynamic` nachgeladen (Muster `/`).
- **Befund 8:** Die fünf Sterne sind `stern-voll`.
- **Tempo:** Jeder Abschnitt nach dem Einstieg trägt `spaet`.
- **Register „Weitere Fachthemen“:** Die Anzahl „n Seiten“ ist `whitespace-nowrap`, damit sie in der schmaleren Spalte nicht umbricht.
- Texte, Links, IDs und Lesefolge unverändert.

## MIKROTEXT alt → neu
- Neu: „Anfrageformular wird geladen...“ als Lade-Text des nachgeladenen Konfigurators (Muster `/` und Leistungen).
- Keine bestehenden Mikrotexte geändert.

## GEMEINSAME DATEIEN
- `src/components/kern/VerbandUmschalter.tsx` (bzw. dessen Stil): Im 390-px-Planblatt des Einstiegs füllt „Drittelverband“ seine Zelle bis an den Rand, ohne Innenabstand. Gewünscht: Innenabstand zur Zellkante in der Abstandsskala (z. B. `px-2`/`px-3`) oder Zellbreite prüfen. Bild: `…/scratchpad/E4-NACH-10/nachher3/m390-verband.png`.

## PRÜFUNG UND ERGEBNIS
- **Prüfstufe A (`pruefe-a.sh E4-NACH-10`):**
  - Typprüfung GRÜN (0 eigene, 0 übrige Fehler).
  - Lint GRÜN (0 Fehler, 0 Warnungen).
  - Bilder GRÜN (HTTP 200, Konsole 0, Überlauf 0).
  - Textvergleich GRÜN (entfernt 0).
  - Funktionstests ROT: zwei Zeitüberschreitungen in `funktion-konfigurator.spec.mjs` auf `/fliesen/konfigurator` (nicht meine Seite). Einzelwiederholung 4/4 GRÜN; vermutlich Last durch parallele Läufe.
- **Überlappung 40 bei 390 px:** Fehlalarm. Die Texte in den geschlossenen Aufklappern werden vom Detektor gezählt. Im Browser ist `checkVisibility()` für sie `false`, und die Höhe des Aufklappers entspricht der Zusammenfassung.
- `werte.mjs`: 0 Befunde.
- **Textprobe gegen HEAD:** ENTFERNT `A:id=guide-bad` (die ID wird jetzt aus `guide-${id}` gebildet, die gerenderte ID bleibt `guide-bad`) und `A:name=stern` (Icon-Wechsel zu `stern-voll`). HINZU: der Lade-Text, `plus`, `minus`, `stern-voll`.
- Schreibrechte: nur `page.jsx` geändert. Eigene Hilfsprozesse beendet; fremde Läufe (E4-NACH-13, E4-NACH-01) nicht angefasst.
- 390/768/1440: keine leere Rasterspalte über 200 px, nichts abgeschnitten.

## BILDBELEGE
Ordner: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-10/`
- Ganze Seite vorher/nachher: `vorher/` und `nachher3/` (`{m390,t768,d1440}-voll.jpg`)
- Wissen 1440 (Etiketten fluchten): `nachher2/d1440-wissen.png`
- Weitere Fachthemen und Konfigurator 1440: `nachher3/d1440-konf2.png`
- Mobil Wissen, Weitere, Konfigurator: `nachher3/m390-tafel.png`, `nachher3/m390-weitere.png`
- Verband-Umschalter 390: `nachher3/m390-verband.png`
- Prüfstufe A: `bilder/fliesen/m390.jpg`, `bilder/fliesen/d1440.jpg` (im Ordner `E4-NACH-10/`)

## OFFENE FRAGEN
1. „Neubau oder Bestand“ → `untergrund`: Das Mapping nennt dafür keinen Plan (dort nur „Untergrund/Abdichtung → abdichtung“). `abdichtung` steht im Schnitt von Abschnitt 04. Bitte bestätigen oder ändern.
2. Abschnitt 04 und 05 stehen beide seitlich nacheinander. Sie unterscheiden sich nur in der Fläche (kalk/fliese) und im Inhalt. Entscheidung zur Regel „keine zwei gleich gebauten Abschnitte in Folge“ bitte beim Orchestrator.
3. Der Aufklapper-Inhalt steht mobil und ab md je einmal im Markup (nur eine Fassung ist sichtbar), nach dem Muster Fachgewerke. Das ist bewusst gewählt, weil ein geschlossener `details` per CSS nicht zuverlässig öffnet.
4. „Schnitt“ habe ich als `schnitt`-Modus des Verlegeplans verstanden. Die rote Plan-Achse ist aus, damit je Bildschirm nur die Leitachse rot bleibt.
5. Die zwei Zeitüberschreitungen im Konfigurator-Test bitte bei einer erneuten Prüfstufe A im Blick behalten.
