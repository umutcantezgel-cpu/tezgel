# E3-BAU-21 · Rückgabe · Baumeister (Arbeitsmodell) · Standorte-Baustein RouteVisualization

## GEÄNDERTE DATEIEN
- `src/components/locations/RouteVisualization.tsx` (neu gefasst). Der Stand steckt bereits im Zwischenstand-Commit `75a1e3d` des Orchestrators; der Arbeitsbaum ist sauber. Ich habe nichts committet oder gepusht.

## WAS UND WARUM
- Abschnittskopf über `Abschnitt` (art „arbeit“): Mono-Etikett mit Fugenkreuz „Kurze Anfahrtswege in Mittelhessen“, H2 „Schnell bei Ihnen in {Stadt}“, Einleitung unverändert.
- Die drei Schritte als Zeilen an der Fuge in einem Schriftfeld (Muster `LocationContact` und `DirectContactCard`): Mono-Etiketten „Startpunkt“, „Fahrtzeit & Strecke“, „Ihr Projekt“. Werte in Archivo, die Fahrzeit im Anzeigeschnitt.
- Icons der Familie: MapPin wird zu `ort`, Clock zu `uhr`. ShieldCheck entfällt laut Zuordnung (nur bei Abdichtung). Die Zeile hat keine Kachel; eine leere, verdeckte Spalte `size-5` hält den Text bündig. Das Navigation-Icon im Kopf ersetzt das Fugenkreuz des Abschnitts.
- Hauptknopf über `Knopf`: Ziel `siteConfig.contact.phone.link` (`tel:`), Pfeil `pfeil-rechts`, `data-motion="druck"`.
- Entfernt: lucide-Importe, Verlauf, Schatten, Rundungen, Orange/Emerald/Neutral-Farben, `sm:py-16`, Werte außerhalb der Skala (`mt-0.5`, `mb-10`, `max-w-2xl`, `text-xs`/`text-sm`/`text-2xl`).
- Unverändert: Props `city` und `className`, Wortlaut und Reihenfolge aller Texte, Ziele aus `siteConfig`, Fahrzeitformel `max(8, round(km × 1,3 + 5))`, Verzweigung `distanceKm === 0`, `"use client"`. Keine IDs und keine ARIA-Namen. Der Abschnitt hat keine `id`, daher entsteht keine neue Regionsbenennung.
- Mikrotext-Änderungen alt → neu: keine.

## PRÜFUNG UND ERGEBNIS
- Textprobe gegen HEAD: ENTFERNT 0. HINZU nur `name=ort` und `name=uhr`, also Icon-Namen und kein Text.
- Bezeichner-Probe: `RouteVisualizationProps` (lokaler Typ). HEAD liefert dasselbe Ergebnis, es ist eine Eigenheit des Werkzeugs.
- Werte-Prüfung: 0 Befunde.
- Prüfstufe A (Kennung E3-BAU-21, Lauf 21:34, Exit 1, Gesamt ROT):
  - Typprüfung GRÜN: 0 Fehler in der eigenen Datei, 0 übrige.
  - Lint GRÜN: 0 Fehler, 0 Warnungen.
  - Funktionstests ÜBERSPRUNGEN: keine Zuordnung in `test-zuordnung.json` für diese Datei.
  - Bilder GRÜN: `/standorte/wetzlar` und `/standorte/giessen`, m390 und d1440, je HTTP 200, Konsole 0, Überlauf 0, Überlappung 0.
  - Textvergleich ROT durch fremde Änderungen, nicht durch diese Datei (siehe OFFENE FRAGEN).
- Zehn Stichproben meiner Texte stehen im Basisstand e0 und im gerenderten Stand unverändert.
- Zustände (Ruhe, Hover, Fokus) kommen vom Baustein `Knopf`. Gesondert gemessen habe ich sie nicht.

## BILDBELEGE
Alle Pfade im Scratchpad unter `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-21/`:
- Desktop-Ausschnitt: `ausschnitt-d1440/d1440.jpg` (Scroll 1120)
- Mobil-Ausschnitte: `ausschnitt-m390/m390.jpg` (Scroll 1100) und `ausschnitt-m390-b/m390.jpg` (Scroll 1480)
- Ganzseiten: `voll-wetzlar/d1440-voll.jpg` und `voll-wetzlar/m390-voll.jpg`
- Prüfstufe A (Kopf, Scroll 0): `bilder/standorte__wetzlar/m390.jpg` und `bilder/standorte__wetzlar/d1440.jpg`

## GEMEINSAME DATEIEN
- Für diesen Baustein ist keine Änderung nötig.
- Textvergleich: Die Ursache liegt außerhalb meiner Datei. Der Untertitel „Schnelle Anfahrt nach {Stadt} • Festpreisangebot • HWK-Fachbetrieb“ (`src/app/(bestand)/standorte/[stadt]/page.tsx`, Zeile 337) erscheint im Stand 21:34 in einem anderen Block, der Wortlaut ist gleich. Ob dafür ein Eintrag in `_werkstatt/texte-erlaubt.json` nötig ist oder die Verschiebung zurückgenommen werden soll, entscheidet der Orchestrator.
- Durch die Prüfung entstanden, gitignored: `_werkstatt/cache/texte/E3-BAU-21/`. Kein Commit nötig.

## OFFENE FRAGEN
1. Der CTA-Text „Jetzt Vor-Ort-Termin für {Stadt} anfragen“ führt auf `tel:`, also zum Anruf. Text und Ziel sind unverändert. Ein passender Anruf-Text braucht Freigabe.
2. Der Kommentar nennt „1,5 min pro km + 5 min“, die Formel rechnet aber mit `× 1,3 + 5`. Der Code ist unverändert.
3. Der Abschnitt nutzt `art="arbeit"` (py-12/lg:py-16, wie `LocationContact`). Falls die Standortseite eine Erzählansicht ist, wäre `erzaehl` die Alternative. Entscheidung beim Orchestrator.
4. 242 Seiten zeigen im Gesamtstand Abweichungen. Sie stammen aus anderen Bausteinen und gehören nicht zu diesem Paket.
