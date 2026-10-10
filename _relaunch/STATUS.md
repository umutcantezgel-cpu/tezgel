STATUS · Phase P0 · Welle 0/– · Erfüllt 0/14 · Ausnahmen 0 · Elemente –/– (Rückführung entfällt) · Slop hart – · Jury – · Lighthouse mobil – · axe – · Puffer 100 % · Nächster Schritt: Prüfwerkzeuge einrichten (P0 Schritt 4)

# STATUS · Lauf 1 „Rückführung und Veredelung“ (angepasst: nur Aufwertung)

## Auftrag in drei eigenen Sätzen
1. Die Website von Fliesenverlegung Tezgel wird von einem generischen, effektlastigen KI-Look zu einem eigenständigen, handwerklich präzisen Gesamtwerk gehoben, dessen Schrift, Raster, Farbe, Bewegung und SVG aus einer einzigen Leitidee folgen.
2. Das Repo enthält danach nur noch Tezgel: Fremdreste, Prompt-Dokumente, Exporte und Altkonfiguration verschwinden, ohne dass eine Seite, Funktion, URL oder ein unantastbarer Text Schaden nimmt.
3. Jede Welle geht nach einem harten Prüftor live; Tempo, Barrierefreiheit, Suche und Echtheit werden gemessen und dürfen nie schlechter werden.

## Einstellungen und Annahmen (leere Felder = Standardwert)
- PROJEKTORDNER: /home/user/tezgel
- ALTBESTAND: Tezgel-Stände in Git (Entscheidung des Auftraggebers), nur zum Nachschlagen
- LIVE-ADRESSE: https://www.tezgel.de (= aktuelle Plattform auf Vercel)
- BEKANNTE VERLUSTE: keine (Rückführung entfällt)
- MARKE: Annahme, wird in P2 aus den Inhalten abgeleitet
- GESCHMACK: keine Vorgabe
- WÜNSCHE: „Werte einfach die Webseite speziell für Fliesenverlegung Tezgel auf, nur noch für ihn das Repo, der Rest kann entfernt werden.“
- UNANTASTBAR: Standard (Logo, Rechts- und Fließtexte, Geschäftslogik, Zahlungs-/Kontoabläufe)
- UMFANG: ganze Plattform · AUSBAUSTUFE: Voll · GESTALTUNGSMUT: ausgeprägt
- TEXTE: Mikrotexte direkt, alles andere als Vorschlag
- FREIGABE: nein (Auftraggeber)
- MODELLE: Opus 5.5 (Orchestrator, Stufe 3, effort high für Unteragenten) · Haiku 5.5 (Stufe 1–2)
- PARALLELITÄT: 5
- BRANCH: main (Auftraggeber) · Vorab-Prüfstand: claude/kind-franklin-5y6s1d
- PUSH: nach jeder grünen Welle auf main (Auftraggeber)
- ANSICHTEN: 375×812 · 768×1024 · 1440×900 · 1920×1080
- BUDGETS: Standard
- BERICHTE: Morgenbericht 07:00 Europe/Berlin (Annahme Zeitzone)

## Protokoll (stündlich)
- 2026-10-10 15:55 CEST · P0 gestartet; Sicherung (Archiv + unshallow), main ausgecheckt, Aufträge gespeichert, Arbeitsdateien angelegt.
- 2026-10-10 16:20 CEST · P0-ORCH-01 (707a93d) gepusht; Reinraum grün (Build, Typen, Lint, 17/17 Tests, qa:graph), CSS identisch zum Ausgangsstand; Produktion nicht ausgelöst (E-005) → Folgecommit.
