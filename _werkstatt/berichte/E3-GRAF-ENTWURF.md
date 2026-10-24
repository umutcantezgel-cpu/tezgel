# E3-GRAF · Entwurf und Bau der neun großen Momente (24.10.2026)

**Quelle:** Workflow wf_1ecfccbb-113 (neun Entwurfsagenten, ein Abgleich). Vollständige Vorgaben und Abgleich: `_werkstatt/archiv/E3-GRAF-vorgaben/` (die dort genannten Scratchpad-Pfade sind vergänglich; ihre Inhalte stehen jetzt im Repo). Entscheidungen: E-045.

## Die Momente

| Paket | Kennung | Seite und Schlitz | Auslöser | JS |
|---|---|---|---|---|
| E3-GRAF-01 | schichten | /bad, momente.tun | scroll (view-timeline je Satz, Zeichnung klebt) | 0 |
| E3-GRAF-02 | weg | /bad/badsanierung, momente.ablauf | scroll (Laserlinie von Station zu Station) | 0 |
| E3-GRAF-03 | gefaelle-dusche | /bad/barrierefreies-bad, momente.tun | Sicht 0,4 (Tropfen zum Ablauf) | 0 |
| E3-GRAF-04 | gefaelle-balkon | /balkon-terrasse, momente.tun | Sicht 0,4 (Tropfen in die Rinne) | 0 |
| E3-GRAF-05 | formatregler | /leistungen, momente.tun | Regler (direkt) | Insel |
| E3-GRAF-06 | verband | /fliesen, Wissensblock | Auswahl ohne JS (:has) | 0 |
| E3-GRAF-07 | vorher-nachher | /referenzen, momente.belegZwei | Regler (direkt) | Insel |
| E3-GRAF-08 | galerie-filter | /referenzen, momente.beleg | Auswahl (Knöpfe) | Insel |
| E3-GRAF-09 | karte | /ueber-uns, momente.beleg | Sicht 0,4 (Ringe legen sich) | 0 |

Alle: nur transform und opacity, Endzustand ohne JavaScript, reduziert, im Notaus, im Druck und bei erzwungenen Farben; Zeichnungen ohne IDs und ohne Text im SVG; Beschriftung in HTML (wächst mit der Systemschrift).

## Bauweg

1. **Ablage:** Dateien maschinell aus den Vorgaben gezogen (Schnitt am längsten syntaktisch gültigen Stück), mit den geprüften Fassungen im Scratchpad verglichen (verband, karte, vorher-nachher, gefaelle-balkon: Test und Registerdatei aus dem Abgleich).
2. **E3-ORCH-02a (gemeinsame Dateien):** neun CSS-Blöcke in `bewegung.css` an Textankern in fester Reihenfolge, `.karte-marke` in `globals.css`, acht Registereinträge (`register.ts`, `register.json`), Bewegungstest mit drei Listen (Scroll, Sicht, Interaktion) und Tests 6 bis 8, Auslöser im Werkzeug `bewegung.mjs`, Vorlagen (Einleitung im Ablauf, Abstand im Beleg, Schlitz `belegZwei`).
3. **Probelauf aller Pakete zusammen:** Typprüfung und Linter ohne Befund, 52 von 52 Pakettests grün, Gesamtsuite 131 von 131.
4. **Schaufenster** je Moment (`/werkstatt-schaufenster/<kennung>`, nur Entwicklung), Schnellbilder m390, m390 bei 200 %, t768, d1440: überall 200, kein Überlauf, keine Konsolenfehler.

## Befunde der eigenen Sichtprüfung (behoben)

- formatregler: rechte Hälfte eine leere Fläche (einzige Fuge unter der Linie), Namen rechts neben statt über der Wand, Pfeil „Große Fliese →“ zeigte von der Zeichnung weg. Wand quer mit drei großen Fliesen, Namen über der Wand.
- schichten: Legende „Fuge“ glich der Legende „Fliese“.
- karte: Beschriftungen standen untereinander statt an ihren Punkten. Ursache war ein veralteter Stand von `globals.css` im Entwicklungsserver (Regel fehlte im ausgelieferten CSS); nach Neustart richtig.

## Weiter

Stufe A durch Haiku je Moment am Schaufenster (Bildsatz, 200 %, axe, `bewegung.mjs`, Tastatur bei den Inseln), Gegenprüfung des Codes, danach Commits je Paket und die Einträge in `package.json`. Bildbedarf E3-BILD-01: `ref-vorher` und `ref-nachher` aus IMG_2527 und IMG_2525 (ausgerichtet, sonst Zweierbild statt Regler), weitere Fotos für „Treppe und Eingang“.
