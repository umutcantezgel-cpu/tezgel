# E3-BAU-01 · Rückgabe · Seitenkörper /bad

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/bad/page.jsx`: Seitenkörper aus KERN-Bausteinen neu; Metadaten, Daten und Funnels unverändert.
- `_werkstatt/pakete/E3-BAU-01.rueckgabe.md` (diese Rückgabe)

## WAS UND WARUM
- **Einstieg** (`art="erzaehl"`): Mono-Etikett, H1 an der Laserachse mit gleichem Wortlaut, Vorspann, Knöpfe „Bad-Projektcheck starten“ (Haupt) und „Musterbäder entdecken“ (Neben), drei Zusagen als Fugenkreuz-Liste. Rechts Verlegeplan `plan="bad"` mit `ohneAchse`, ohne Bemaßung.
- **Leitachse**, danach:
  - Bad-Leistungen: H2 über `titelId`, Feldraster mit sechs Feldern, je Feld ein Link über die ganze Fläche.
  - Qualitäts-Kategorien auf Fliese: H2 über `titelId`, Feldraster mit drei Kategorien, Textlink „Musterbäder ansehen“, Telefonsatz.
  - Projektcheck und Badanfrage: ohne Titel, `kopf="seitlich"` (acht Spalten, Lesebreite). Funnels unverändert.
- FinalCTA unverändert.
- Entfallen: Umgebungsglühen, Schatten, Hover-Versatz, Verlauf, Icon-Kacheln, Mono-Badges (jetzt Etiketten). Stern in Schriftfarbe. Nicht übernommen: Schriftfeld (würde neue Beschriftungen einführen), Auftritt, Bewegung, großer Moment.
- Mikrotexte unverändert (alt → neu: keine).

## GEMEINSAME DATEIEN
1. `_werkstatt/werkzeuge/test-zuordnung.json`, neuer Eintrag: `{"muster": "bad/page\\.jsx$", "specs": ["funktion-projektcheck.spec.mjs", "funktion-kontaktwege.spec.mjs", "funktion-badanfrage.spec.mjs"]}`.
2. Optional `src/components/kern/Einstieg.tsx`: Prop für die Titel-ID (Frage 1).

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A: GRÜN, Exit 0. tsc und eslint ohne Fehler, eslint ohne Warnungen. Bilder /bad m390 und d1440: HTTP 200/200, Konsole 0, Überlauf 0, Überlappung 0. Textvergleich gegen e0: GRÜN, unerlaubt entfernt 0. Funktionstests in der Stufe: ÜBERSPRUNGEN (keine Zuordnung).
- Textprobe gegen Bestand (`97dfbfe^`): kein Textverlust. Entfernt 7 und hinzu 6 sind Wanderungen mit gleichem Wortlaut in Props, IDs über `titelId`, zwei `name=` an Icons.
- Bezeichner-Probe und `werte.mjs`: 0 Befunde.
- Funktionstests von Hand, 4320, `--workers=1`: `funktion-projektcheck`, `funktion-kontaktwege`, `funktion-badanfrage`: 63 bestanden, 0 fehlgeschlagen, 0 flaky, 3 übersprungen (Spec-Bedingung je Gerät). Darunter ein Mock-Test „echte Route“ mit POST an den lokalen `/api/anfrage`, ohne Mail.
- GET `/bad` auf 4320: HTTP 200, IDs `bad-hero-heading`, `bad-services-heading`, `bad-tiers-heading`, `projekt-check`, `anfrage` vorhanden, eine H1.

## BILDBELEGE
Basis `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-01/`: `bilder/bad/m390.jpg`, `bilder/bad/d1440.jpg` (erster Bildschirm); `voll/m390-voll.jpg`, `voll/d1440-voll.jpg` (ganze Seite). Logs: `pruefe-a.stdout.log`, `pw-manuell.log`.

## OFFENE FRAGEN
1. Die H1-ID steht an einem Span, weil `Einstieg` keine ID-Prop hat. Mit Prop sauberer?
2. Breiten 1024 bis 1280 px sind nicht belegt; die Werkzeuge messen 390, 768, 1440, 1920. „schlüsselfertig“ ist bei 390 und 1440 unauffällig.
3. Bad-Leistungen-Icons (Droplets, Grid, ShieldCheck, Sparkles, Layers, Ruler) entfallen als Zierrat. Bestätigen?
4. Funnels in acht Spalten ohne Kopf: so lassen oder `max-w-mass`?
5. Der Textvergleich gegen e0 ist für Kopf, Fuß und FinalCTA veraltet. Basis prüfen?
6. Die Datei liegt per ZWISCHENSTAND-Commit `20501ca` (nicht von mir) in HEAD, Arbeitskopie identisch. Ich habe nichts committet oder gepusht. Die fremde Änderung in `standorte/[stadt]/page.tsx` ist unberührt.
