# Rückgabe E3-BAU-08 · Fliesen-Konfigurator (Seitenkörper, Arbeitsansicht nach /kontakt)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/konfigurator/page.jsx`

## WAS UND WARUM
- Seitenkörper auf die Arbeitsansicht umgestellt: Einstieg `art="arbeit"` (H1 `text-fs-6`, ohne Ambient-Glows und ohne Glas-Karten); Abschnitte über `Abschnitt`; Ablauf als `Feldraster` mit vier Feldern an der Fuge (statt Karten mit Schatten); Berechnung mit `Tabelle` (benannte Region, rechtsbündige Zahlen in Mono); Treppen als Fugenliste mit fettem Einstieg; Aufmaß-Schritte als `Schrittfolge` (waagrecht ab `lg`); FAQ als nativer Aufklapper mit Kern-Klassen; Ratgeber als `Feldraster` mit Links.
- Konfigurator (`FliesenKonfigurator`) in Lesebreite: `Abschnitt kopf="seitlich"` mit 8 Spalten, links ohne Kopftext (siehe OFFENE FRAGEN). Der Konfigurator selbst ist unverändert.
- lucide-Icons entfernt; das Projekt-Icon nur noch für Plus/Minus der FAQ.
- Reihenfolge, Texte, Links, IDs (`konfigurator`, `ablauf-heading`, `rechnung-heading`, `treppen-heading`, `weiter-heading`, `faq-heading`, `ratgeber-heading`) und `aria-label="Fliesen-Konfigurator"` unverändert. `QualityPromise` bleibt am Ende.
- Mikrotexte: keine Änderung (alt → neu: keine).
- Keine neuen Überschriften: h1 1/1, h2 8/8, h3 7/7 gegenüber dem Produktionsstand, dieselben h3-Texte.
- Keine neue Bewegung; Knöpfe laufen über `Knopf` (`data-motion="druck"`).
- Strukturelle Folgen (kein Wortlautwechsel): Die Spalte „Warum“ der Verschnitt-Tabelle ist jetzt auch mobil sichtbar (in der scrollenden Tabellenregion; vorher `hidden sm:table-cell`). Die Schrittnummern 01–03 erzeugt jetzt der Baustein `Schrittfolge` (gleicher Wortlaut).

## GEMEINSAME DATEIEN
Bitte in `_werkstatt/werkzeuge/test-zuordnung.json` ergänzen (heute fehlt eine Zuordnung, Prüfstufe A lief ohne Funktionstest; die Datei wurde während des Laufs von anderer Stelle geändert, daher gegen den aktuellen Stand einfügen):
```json
{
  "muster": "\\(bestand\\)/fliesen/konfigurator/page\\.jsx$",
  "specs": [
    "funktion-konfigurator.spec.mjs"
  ]
}
```

## PRÜFUNG UND ERGEBNIS
- `pruefe-a.sh E3-BAU-08` (endgültige Fassung): Typprüfung GRÜN (0 Fehler in eigenen Dateien), Lint GRÜN (0 Fehler, 0 Warnungen), Bilder GRÜN (HTTP 200/200, Konsole 0, Überlauf 0), Textvergleich GRÜN (entfernt 0; hinzu 13, alle aus Kopf und Fuß der gemeinsamen Ebene), Gesamt Exit 0.
- Funktionstest: nicht über die Zuordnung, daher von Hand `funktion-konfigurator.spec.mjs` gegen 4320, `--workers=1`: auf der endgültigen Fassung 46 bestanden, 0 fehlgeschlagen, 0 unerwartet, 0 flaky, 4 `test.fixme` (Ausgangsstand, siehe OFFENE FRAGEN 4). Ein früherer Lauf hatte einen Fehler bei „Rechner 7“ (desktop) während der Neuübersetzung des Entwicklungsservers nach meiner Änderung; auf der endgültigen Fassung trat er nicht mehr auf.
- `textprobe.cjs` gegen HEAD: nur Umzüge mit gleichem Wortlaut (Text als `etikett=`, `titel=`, `name=`), dazu `T:0` (alte Schrittnummer). `bezeichner.cjs`: keine offenen Namen. Datenstrings alt/neu identisch (59/59). `werte.mjs`: 0 Befunde.
- Git: HEAD enthält die endgültige Fassung bereits (Commit 0f96f4e „ZWISCHENSTAND“, nicht von mir). Ich habe nicht committet und nicht gepusht.
- Bildlauf meldet Überlappung 61. Messartefakt: Das Werkzeug setzt für Ganzseitenbilder `content-visibility` und misst dadurch geschlossene Aufklapper. Die Produktionsseite zeigt dasselbe Muster (36 / 4). In der echten Darstellung (Anker-Ausschnitte) ist keine Überlappung sichtbar.

## BILDBELEGE
- Kopf: `…/scratchpad/E3-BAU-08/bilder/fliesen__konfigurator/m390.jpg`, `…/d1440.jpg`
- Ausschnitte (echte Darstellung): `…/E3-BAU-08/anker-konfigurator/{m390,d1440}.jpg`, `anker-ablauf-heading/d1440.jpg`, `anker-rechnung-heading/d1440.jpg`, `anker-treppen-heading/{m390,d1440}.jpg`, `anker-faq-heading/{m390,d1440}.jpg`

## OFFENE FRAGEN
1. Erster Bildschirm: Der Konfigurator bleibt wegen der festen Reihenfolge nach dem Ablaufblock. Im ersten Bildschirm (m390, d1440) stehen Einstieg und Ablauf, das Formular beginnt darunter. Soll der Konfigurator vor den Ablauf rücken? Das wäre eine Reihenfolge-Änderung und ist nicht umgesetzt.
2. Konfigurator-Abschnitt: links ohne Kopf, 8 Spalten. Ein Kopftext (rechts) bräuchte einen neuen Text; den habe ich nicht erfunden.
3. FAQ: `FAQAccordion` nicht verwendet, weil es je Antwort einen Anruf-Satz („Haben Sie eine Frage …“) ergänzt und eigene Zustandslogik hat. Stattdessen nativer Aufklapper ohne Animation (Sofortzustand).
4. Befunde im Ausgangsstand des Konfigurators (`test.fixme` in `funktion-konfigurator.spec.mjs`, außerhalb meiner Schreibrechte, nicht behoben): „Weiß nicht“ bei Fußbodenheizung wird als „Nein“ übermittelt; bei reiner Treppe geht die Vorgabe 20 m² als Fläche raus.
5. Textvergleich gegen die Basis e0 zeigt 13 Hinzufügungen in Kopf und Fuß. Die stammen aus der gemeinsamen Ebene, nicht von dieser Seite. Basis e0 bitte prüfen.
