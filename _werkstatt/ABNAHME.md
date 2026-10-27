# ABNAHME · Definition of Done · Lauf „Universal Motion“

Stand 27.10.2026, E1, Fassung 2.1 (AUFTRAG.md Abschnitt 15; L0 Runde 1 eingearbeitet). Jede Zeile: Kriterium · Methode · Schwelle · Beleg · E0 · Stand. Die Abnahmeliste des Vorlaufs liegt in `archiv/ABNAHME-verstaendlich-echt-ausgezeichnet.md`; ihre Kriterien Lesbarkeit (alt Z-12) und Adressen (alt Z-14) gehen hier in Z-02 und Z-11 auf. E0 dieses Laufs ist der Produktionsbau 7ceb5e41 (`belege/um-e0/`). Kriterien sinken nie still; erledigt ist nur, was geprüft ist. ENTFÄLLT gibt es nur bei Z-03.

## Kriterien

### Z-01 Plan
- Methode: Abgleich PLAN.md gegen Commits.
- Schwelle: 100 % der Pflichtpakete erledigt und abgenommen, jede Zeile mit Commit-Kennung; Kür abgearbeitet, bis sie leer ist oder die LAUFZEIT endet.
- Beleg: PLAN.md; Abgleich in UM-E5-BER.
- E0: 0 von 58 Pflichtpaketen (PLAN 2.2). Stand: offen.

### Z-02 Bestand
- Methode: Prüfstufe C; Reinraum (`reinraum.sh`); Durchlauf der Funktionsliste (LAGEBILD Abschnitt 3); Adressprüfung aller 202 Adressen; Lesbarkeit der Hauptansichten; Element-Pässe aus Abschnitt 9.
- Schwelle: Build, Typprüfung, Linter und Tests mindestens so grün wie E0; keine Funktion schlechter; null neue Konsolenfehler; 202 Adressen mit dem Status aus E0 (200, 308 oder 410); Lesbarkeit grün; die H1 A-1 und A-2 sind Wortlaut des Auftraggebers und UNANTASTBAR (G8), die Lesbarkeitsprüfung nimmt sie deshalb aus. Das ist keine AUSNAHME nach L7; jedes Muss-Element zurückgeführt oder belegt zurückgestellt.
- Beleg: `belege/um-e5/reinraum.txt`, `belege/um-e5/funktionsliste.md`, `belege/um-e5/adressen.json`, `belege/um-e5/lesbarkeit.md`.
- E0: Reinraum 7ceb5e41 grün (Build, Typen, Linter, Tests, Graph Exit 0); `npm test` 210 von 210; Funktionssuite 393 bestanden, 0 rot, 25 übersprungen; Adressen 202 von 202 wie E0 des Vorlaufs (UM-E0-VERLUSTE); Lesbarkeit rot nur A-1, A-2; Muss-Verluste EP-1 bis EP-3 offen. Stand: offen; Tor E2 (E-076): Reinraum 51355ef7 grün, `npm test` 216/216, Suite 393/0/25 in beiden Bewegungszuständen (`belege/um-e2-b2/`).

### Z-03 Stack
- Methode: UPGRADE.md und `npm audit`.
- Schwelle: 100 % der direkten Abhängigkeiten auf der neuesten stabilen oder belegt auf der neuesten kompatiblen Version; Laufzeit auf aktueller LTS; null hohe oder kritische Befunde mit verfügbarem Fix; null Warnungen zu veralteten Schnittstellen der aktualisierten Pakete; jeder Pixelvergleich ohne unerklärte Abweichung.
- Beleg: UPGRADE.md mit Commit-Kennungen, `belege/um-e2/audit.json`, `belege/um-e2/pixelvergleich/`.
- E0: 20 von 32 Paketen nicht aktuell; Node 20 statt LTS 24; Audit 1 kritisch, 3 hoch. Stand: offen; Tor E2 (E-076): Audit 0 hoch/kritisch, Pixelvergleich E0 gegen HEAD 48 Paare ohne Abweichung; UPGRADE 29 von 32 auf latest, 3 belegt neueste kompatible (TypeScript 7, ESLint 10 über Peers).

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
- E0 (`belege/um-e0/bewegung/`, m390, 4× Drosselung, Median aus drei): Register 28 Einträge, 23 im Code; je Hauptansicht 0 unbekannte Kennungen, auf 11 von 12 Ansichten 1 Übergang ohne Registereintrag (`outline-color` am Karussellknopf). Bewegungsschalter fehlt. Reduzierte Bewegung: 0 Lage- oder Größenänderungen auf allen 12 Ansichten; die 6 bis 10 „unsichtbaren“ Elemente je Ansicht sind geschlossene Menüs und ausgeblendete Knöpfe (`display: none`), kein Inhalt. Verworfene Bilder beim Scrollen 0 bis 1,77 % (höchster Wert `/bad`, ein Lauf 9,31 %); Long Animation Frames je Ansicht 0 bis 3, Summe höchstens 200 ms (`/referenzen`). Stand: offen.

### Z-07 Scrollen und Cursor
- Methode: Prüfstufe C; geskriptetes Scrollen mobil bei vierfacher Drosselung; Tastatur, Anker, Seitensuche, Zurück-Taste, Positionswiederherstellung; Cursor-Zustände mit feinem Zeiger, Touch, Tastatur und erzwungenen Farben; Reaktionszeit (`reaktion.mjs`).
- Schwelle: höchstens 5 % verworfene Bilder; Tastatur, Anker, Seitensuche, Zurück und Wiederherstellung ohne Fehler; Cursor nur bei feinem Zeiger, Klickpunkt ohne Verzögerung, jeder Zustand im Register, ausgeblendet bei Tastatur und erzwungenen Farben; INP nicht schlechter als E0.
- Beleg: `belege/um-e5/scroll-cursor.md`, `belege/um-e5/reaktion/`.
- E0: kein Cursor-System. Reaktionszeit (`belege/um-e0/reaktion/reaktion.json`, m390, 4× Drosselung, Schwelle 200 ms, höchster Median je Ansicht): `/` 608 ms (Eingabe), `/bad` 216, `/bad/badsanierung` 80, `/bad/barrierefreies-bad` 168, `/leistungen` 72, `/fliesen` 96, `/balkon-terrasse` 404 (unvollständig), `/referenzen` 304, `/ueber-uns` 456, `/kontakt` 812 (unvollständig), `/standorte/wetzlar` 584, `/blog` 744 ms. 4 bestanden, 6 nicht bestanden, 2 unvollständig. Die Einzelwerte streuen stark (zum Beispiel `/` Hauptknopf 3.184, 48 und 192 ms); verglichen wird deshalb der Median mit der Spanne der drei Läufe. Bildrate beim Scrollen siehe Z-06. Stand: offen.

### Z-08 Grafik
- Methode: Prüfstufe C; `svg.mjs` mit den SVGO-Konfigurationen; Kennungen je Ansicht im DOM.
- Schwelle: eine Icon-Familie im Formsystem; jede SVG-Datei Fixpunkt ihrer SVGO-Konfiguration; keine doppelten Kennungen in einer Ansicht; Zugänglichkeit vollständig (dekorativ `aria-hidden`, bedeutungstragend `role="img"` mit `title`); Budgets (Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip).
- Beleg: `belege/um-e5/svg.json`.
- E0: 51 Dateien, 14 Befunde; zwei Familien (Sprite und lucide-react in drei Dateien); zwei Logo-SVG mit eingebettetem PNG. Stand: offen.

### Z-09 Zugänglichkeit (keine Ausnahme)
- Methode: axe nach WCAG 2.2 AA in den vier Gerätegrößen, auch mit offenem Menü und Dialog; Probeläufe A1 bis A5 nur mit Tastatur; Kontraste; Reflow 320 px, Zoom 200 %, erzwungene Farben.
- Schwelle: null ernste oder kritische axe-Befunde auf den Hauptansichten; Hauptaufgaben nur mit Tastatur lösbar bei sichtbarem Fokus; Kontraste nach Abschnitt 7; Reflow, Zoom und erzwungene Farben ohne Verlust.
- Beleg: `belege/um-e5/axe/`, `belege/um-e5/tastatur.md`.
- E0: axe 4.13 nach WCAG 2.2 AA (`belege/um-e0/axe/axe.json`): 84 Läufe (12 Hauptansichten × 4 Größen, mit Menü und Dialog), 0 Knoten mit ernsten oder kritischen Befunden. Stand: offen; Tor E2 (E-076): axe 396 Läufe (11 Größen, Menü und Erstbesuch in allen) 0 ernste Knoten auf 51355ef7.

### Z-10 Leistung
- Methode: Lighthouse mobil und Desktop als Median aus drei Läufen am Produktionsbau; Größe des Bewegungs-JavaScripts im ersten Laden.
- Schwelle: BUDGETS auf allen Hauptansichten (K-012); keine Hauptansicht schlechter als E0 um mehr als die Spanne der drei E0-Läufe.
- Beleg: `belege/um-e5/lighthouse/`.
- E0 (`belege/um-e0/lighthouse.json`, Median aus drei, Spanne in Klammern): Desktop Leistung 100 auf allen 12 Ansichten, LCP 696 bis 788 ms. Mobil Leistung `/` 92 (91–95), `/bad` 91 (91–93), `/bad/badsanierung` 90 (89–91), `/bad/barrierefreies-bad` 93 (92–94), `/leistungen` 95 (94–95), `/fliesen` 92 (92–92), `/balkon-terrasse` 91 (90–94), `/referenzen` 92 (92–95), `/ueber-uns` 92 (91–93), `/kontakt` 93 (91–93), `/standorte/wetzlar` 81 (80–82), `/blog` 87 (85–90). Mobiles LCP 2.860 bis 4.517 ms (`/standorte/wetzlar`), TBT 64 bis 171 ms, CLS 0, JavaScript 196 bis 318 KB (`/blog`). BUDGETS in E0 verfehlt: LCP mobil > 2,5 s auf allen 12 Ansichten; Leistung mobil < 90 auf `/standorte/wetzlar` und `/blog`; Reaktion > 200 ms auf 8 Ansichten (Z-07). Pakete: UM-E3-LCP-K, UM-E3-LEISTUNG, UM-E4-LEISTUNG. Stand: offen; Tor E2 (E-076): LCP und Leistung im Rahmen der E0-Spanne; TBT mobil auf `/`, `/leistungen`, `/balkon-terrasse` 2–8 ms über der Spanne → UM-E3-TBT.

### Z-11 Darstellung
- Methode: Bildsatz der Hauptansichten und der Stichprobe in den vier GERÄTEGRÖSSEN (390 × 844, 768 × 1024, 1440 × 900, 1920 × 1080), dazu 200 % Schrift und Reflow 320 px, mit Überlauf- und Überlappungsprüfung. Themen: hell (einziges Thema; kommt UM-K07, auch dunkel). Sprachen: Deutsch.
- Schwelle: kein Überlauf, kein abgeschnittener oder überlappender Text.
- Beleg: `belege/um-e5/bildsatz.json`.
- E0: Bildsatz der vier Größen (`belege/um-e0/bildsatz.json`, Bilder im Scratchpad): 534 Aufnahmen, 0 Fehler, 0 Überläufe, 0 Überlappungen, 0 Konsolenmeldungen; Browserprüfung Runde 5 des Vorlaufs mit 17 geringen Befunden (`belege/um-e0/runde5-befunde.json`). Stand: offen; Tor E2 (E-076): Bildsatz 10 Größen, 1.334 Aufnahmen, 0 Befunde.

### Z-12 Kontingent
- Methode: KONTINGENT.md.
- Schwelle: kein Limit-Ereignis außer im Endspurt eines Fensters oder als Kalibrierpunkt ohne Messwert; jedes abgeschlossene Fenster mit Messwert endet zwischen Fensterziel minus 10 Punkte und Fensterziel, außer es fehlten bereite Pakete.
- Beleg: KONTINGENT.md; Nachweis in UM-E5-KONT.
- E0: ein Limit-Ereignis am 26.10. (vor dem Auftrag, Kalibrierpunkt). Stand: offen.

### Z-13 Übergabe
- Methode: Endprüfung.
- Schwelle: BERICHT.md, KERN.md, UPGRADE.md, MENSCHEN.md und die Anleitung zum Zusammenführen und Zurückrollen vollständig.
- Beleg: die Dateien; die Anleitung steht in `ZUSAMMENFUEHREN.md`. Schreiber: UM-E5-BER (alle fünf), UM-E4-DOK (README, EINRICHTUNG).
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
