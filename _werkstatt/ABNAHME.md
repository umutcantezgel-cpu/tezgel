# ABNAHME · Definition of Done · Lauf „Universal Motion“

Stand 27.10.2026, E1, Fassung 2.0 (AUFTRAG.md Abschnitt 15). Jede Zeile: Kriterium · Methode · Schwelle · Beleg · E0 · Stand. Die Abnahmeliste des Vorlaufs liegt in `archiv/ABNAHME-verstaendlich-echt-ausgezeichnet.md`; ihre Kriterien Lesbarkeit (alt Z-12) und Adressen (alt Z-14) gehen hier in Z-02 und Z-11 auf. E0 dieses Laufs ist der Produktionsbau 7ceb5e41 (`belege/um-e0/`). Kriterien sinken nie still; erledigt ist nur, was geprüft ist. ENTFÄLLT gibt es nur bei Z-03.

## Kriterien

### Z-01 Plan
- Methode: Abgleich PLAN.md gegen Commits.
- Schwelle: 100 % der Pflichtpakete erledigt und abgenommen, jede Zeile mit Commit-Kennung; Kür abgearbeitet, bis sie leer ist oder die LAUFZEIT endet.
- Beleg: PLAN.md.
- E0: 0 von 48 Pflichtpaketen (PLAN 2.0). Stand: offen.

### Z-02 Bestand
- Methode: Prüfstufe C; Reinraum (`reinraum.sh`); Durchlauf der Funktionsliste (LAGEBILD Abschnitt 3); Adressprüfung aller 202 Adressen; Lesbarkeit der Hauptansichten; Element-Pässe aus Abschnitt 9.
- Schwelle: Build, Typprüfung, Linter und Tests mindestens so grün wie E0; keine Funktion schlechter; null neue Konsolenfehler; 202 Adressen mit dem Status aus E0 (200, 308 oder 410); Lesbarkeit grün bis auf die Ausnahmen A-1 und A-2 (Wortlaut des Auftraggebers); jedes Muss-Element zurückgeführt oder belegt zurückgestellt.
- Beleg: `belege/um-e5/reinraum.txt`, `belege/um-e5/funktionsliste.md`, `belege/um-e5/adressen.json`, `belege/um-e5/lesbarkeit.md`.
- E0: Reinraum 7ceb5e41 grün (Build, Typen, Linter, Tests, Graph Exit 0); `npm test` 210 von 210; Funktionssuite 393 bestanden, 0 rot, 25 übersprungen; Adressen 202 von 202 wie E0 des Vorlaufs (UM-E0-VERLUSTE); Lesbarkeit rot nur A-1, A-2; Muss-Verluste EP-1 bis EP-3 offen. Stand: offen.

### Z-03 Stack
- Methode: UPGRADE.md und `npm audit`.
- Schwelle: 100 % der direkten Abhängigkeiten auf der neuesten stabilen oder belegt auf der neuesten kompatiblen Version; Laufzeit auf aktueller LTS; null hohe oder kritische Befunde mit verfügbarem Fix; null Warnungen zu veralteten Schnittstellen der aktualisierten Pakete; jeder Pixelvergleich ohne unerklärte Abweichung.
- Beleg: UPGRADE.md mit Commit-Kennungen, `belege/um-e2/audit.json`, `belege/um-e2/pixelvergleich/`.
- E0: 20 von 32 Paketen nicht aktuell; Node 20 statt LTS 24; Audit 1 kritisch, 3 hoch. Stand: offen.

### Z-04 Designsystem
- Methode: `werte.mjs` (Regeldatei v4) über die geänderten Dateien, Stichprobe der neuen Komponenten.
- Schwelle: null Werte außerhalb des Designsystems in geänderten Dateien, ausgenommen UNANTASTBAR und Bildinhalte; jede neue Komponente nutzt das System; Skalen in den Grenzen aus Abschnitt 7 (Abstand ≤ 12, Schrift ≤ 10, Dauer ≤ 6, Radius, Schatten, Kurven je ≤ 4), Farben in OKLCH mit Abstufung.
- Beleg: `belege/um-e5/werte.json`, K-005.
- E0: Werte-Lauf über 409 Dateien 16 Befunde; Dauern 11 Werte, Kurven 5, Farben Hex (UM-E0-DESIGN). Stand: offen.

### Z-05 Gestaltung
- Methode: Endprüfung durch einen frischen Opus-Agenten nach der Rubrik (Abschnitt 13) an den Nachher-Bildsätzen; Blindvergleich vorher/nachher, von einem Haiku-Dokumentar neutral benannt und gemischt, Schlüssel getrennt und erst nach dem Urteil übergeben.
- Schwelle: jede Hauptansicht ≥ 8,0, jede Erzählansicht unter ihnen ≥ 8,5, keine Kategorie unter 7,5, keine Ansicht der Stichprobe unter 7,5; im Blindvergleich auf jeder Hauptansicht der neue Stand vorgezogen.
- Beleg: `berichte/ABSCHLUSS-rubrik.md`, `bilder/abschluss/blind/`, Schlüssel getrennt.
- E0: Sichtabnahme des Vorlaufs (Tor E3, E-061) unter dem Ziel; Werte je Ansicht in der Sichtabnahme von E3 (UM-E3-B) als Ausgangspunkt. Stand: offen.

### Z-06 Bewegung und Übergänge
- Methode: Register gegen DOM (`bewegung.mjs --modus register`), reduzierte Bewegung und Bewegungsschalter (`--modus reduziert`, eigener Durchlauf mit `data-bewegung="ruhig"`), Bildrate mobil bei vierfacher Drosselung (`--modus bildrate`), Long Animation Frames, Bildfolgen neuer Momente.
- Schwelle: jede Animation mit `data-motion`-Kennung im Register; jeder Wechsel zwischen Erzählansichten mit Übergang und Rückfall; bei reduzierter Bewegung und ruhigem Schalter keine Lage- oder Größenänderung und alle Inhalte sichtbar; Bewegungsschalter und Pause-Knöpfe vorhanden; große Momente mobil bei vierfacher Drosselung mit höchstens 5 % verworfenen Bildern und ohne Long Animation Frame über 20 ms Skriptzeit aus Bewegungscode.
- Beleg: `belege/um-e5/bewegung/`.
- E0: Register 28 Einträge, 23 im Code; Bewegungsschalter fehlt; Bildrate und reduzierte Bewegung je Hauptansicht in `belege/um-e0/` (Messreihe). Stand: offen.

### Z-07 Scrollen und Cursor
- Methode: Prüfstufe C; geskriptetes Scrollen mobil bei vierfacher Drosselung; Tastatur, Anker, Seitensuche, Zurück-Taste, Positionswiederherstellung; Cursor-Zustände mit feinem Zeiger, Touch, Tastatur und erzwungenen Farben; Reaktionszeit (`reaktion.mjs`).
- Schwelle: höchstens 5 % verworfene Bilder; Tastatur, Anker, Seitensuche, Zurück und Wiederherstellung ohne Fehler; Cursor nur bei feinem Zeiger, Klickpunkt ohne Verzögerung, jeder Zustand im Register, ausgeblendet bei Tastatur und erzwungenen Farben; INP nicht schlechter als E0.
- Beleg: `belege/um-e5/scroll-cursor.md`, `belege/um-e5/reaktion/`.
- E0: kein Cursor-System; Reaktionszeit je Hauptansicht in `belege/um-e0/reaktion/reaktion.json`. Stand: offen.

### Z-08 Grafik
- Methode: Prüfstufe C; `svg.mjs` mit den SVGO-Konfigurationen; Kennungen je Ansicht im DOM.
- Schwelle: eine Icon-Familie im Formsystem; jede SVG-Datei Fixpunkt ihrer SVGO-Konfiguration; keine doppelten Kennungen in einer Ansicht; Zugänglichkeit vollständig (dekorativ `aria-hidden`, bedeutungstragend `role="img"` mit `title`); Budgets (Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip).
- Beleg: `belege/um-e5/svg.json`.
- E0: 51 Dateien, 14 Befunde; zwei Familien (Sprite und lucide-react in drei Dateien); zwei Logo-SVG mit eingebettetem PNG. Stand: offen.

### Z-09 Zugänglichkeit (keine Ausnahme)
- Methode: axe nach WCAG 2.2 AA in den vier Gerätegrößen, auch mit offenem Menü und Dialog; Probeläufe A1 bis A5 nur mit Tastatur; Kontraste; Reflow 320 px, Zoom 200 %, erzwungene Farben.
- Schwelle: null ernste oder kritische axe-Befunde auf den Hauptansichten; Hauptaufgaben nur mit Tastatur lösbar bei sichtbarem Fokus; Kontraste nach Abschnitt 7; Reflow, Zoom und erzwungene Farben ohne Verlust.
- Beleg: `belege/um-e5/axe/`, `belege/um-e5/tastatur.md`.
- E0: axe-Lauf in `belege/um-e0/axe/` (Messreihe). Stand: offen.

### Z-10 Leistung
- Methode: Lighthouse mobil und Desktop als Median aus drei Läufen am Produktionsbau; Größe des Bewegungs-JavaScripts im ersten Laden.
- Schwelle: BUDGETS auf allen Hauptansichten (K-012); keine Hauptansicht schlechter als E0 um mehr als die Spanne der drei E0-Läufe.
- Beleg: `belege/um-e5/lighthouse/`.
- E0: `belege/um-e0/lighthouse.json` (Messreihe, letzter Schritt). Stand: offen.

### Z-11 Darstellung
- Methode: Bildsatz der Hauptansichten und der Stichprobe in allen Gerätegrößen (und den zehn Größen des Vorlaufs), 200 % Schrift, mit Überlauf- und Überlappungsprüfung.
- Schwelle: kein Überlauf, kein abgeschnittener oder überlappender Text.
- Beleg: `belege/um-e5/bildsatz.json`.
- E0: Bildsatz der vier Größen in `$SCRATCH/um-e0/bildsatz/` (Messreihe); Browserprüfung Runde 5 des Vorlaufs mit 17 geringen Befunden. Stand: offen.

### Z-12 Kontingent
- Methode: KONTINGENT.md.
- Schwelle: kein Limit-Ereignis außer im Endspurt eines Fensters oder als Kalibrierpunkt ohne Messwert; jedes abgeschlossene Fenster mit Messwert endet zwischen Fensterziel minus 10 Punkte und Fensterziel, außer es fehlten bereite Pakete.
- Beleg: KONTINGENT.md.
- E0: ein Limit-Ereignis am 26.10. (vor dem Auftrag, Kalibrierpunkt). Stand: offen.

### Z-13 Übergabe
- Methode: Endprüfung.
- Schwelle: BERICHT.md, KERN.md, UPGRADE.md, MENSCHEN.md und die Anleitung zum Zusammenführen und Zurückrollen vollständig.
- Beleg: die Dateien.
- E0: KERN v4.0, UPGRADE.md angelegt. Stand: offen.

## Umgebungsausnahmen (zählen nicht als AUSNAHME)
- U-1 Echte Zielgeräte (iPhone mit Safari, Android mit Chrome, Desktop mit Firefox und Safari): Ersatz sind Emulation in Chromium und, wenn installierbar, WebKit und Firefox in Playwright; echte Geräte in MENSCHEN.md.
- U-2 Grafikkartenpflichtige Bildraten: Ersatz ist Chromium ohne Grafikkarte mit vierfacher Prozessordrosselung (strenger als echte Geräte); Messung auf echten Geräten in MENSCHEN.md.
- U-3 Kontingent ohne Messwert: In der Cloud fehlt `~/.claude/kontingent.json`; Ersatz ist die Schätzung von `kontingent.mjs` mit Kalibrierung an Limit-Ereignissen und Meldungen. Z-12 wird für Fenster ohne Messwert an der Schätzung gemessen, mit Vermerk.

## Ausnahmen (höchstens zwei, keine für Z-02 und Z-09)
- Keine.

## Prüfmatrix
| Kriterium | Stufe A (Paket) | Stufe B (Etappe) | Stufe C (Ende) |
|---|---|---|---|
| Z-02 | Typen, Linter, betroffene Tests | Build, volle Suite, Konsole | Reinraum, Funktionsliste, Adressen, Lesbarkeit |
| Z-03 | – | Audit, Pixelvergleich (E2) | UPGRADE.md, Audit |
| Z-04 | `werte.mjs` der geänderten Dateien | `werte.mjs` der Etappe | alle geänderten Dateien |
| Z-05 | Bild mobil und Desktop | Sichtabnahme | Endprüfung, blind |
| Z-06 | Registereintrag | Bildfolgen, Bildrate, reduziert | Register, Schalter, Bildrate |
| Z-07 | – | Scrollen gedrosselt | Tastatur, Anker, Zurück, Cursor, INP |
| Z-08 | SVG des Pakets | SVG der Hauptansichten | alle SVG |
| Z-09 | – | axe vier Größen mit Menü und Dialog | axe, Tastatur, Reflow, Zoom, erzwungene Farben |
| Z-10 | Budget des Pakets | Lighthouse Median aus drei | Lighthouse Median aus drei |
| Z-11 | Bild mobil und Desktop | Bildsatz vier Größen | Bildsatz mit Stichprobe |
