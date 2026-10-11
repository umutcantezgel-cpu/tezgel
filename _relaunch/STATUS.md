STATUS · Phase P4 (Fundament, ruhend) · live d4da429 (Startseite `/` im Kern freigeschaltet, Rauchtest + Live-Browser grün) · Erfüllt 0/14 (Z-01, Z-02 ENTFÄLLT) · `/`: Jury 6,9 (4,30) · Lighthouse mobil 88 (85) · INP max 56 ms · axe 0 · Slop weich 5/hart 0 (16/4) · übrige Seiten unverändert · Planwert 8–13 Tage · Nächster Schritt: P4-Pakete (Vorlagen, Formulare, Wege), dann W1 `/bad`

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
- BRANCH: main (Auftraggeber) · kein Vorab-Push auf andere Branches (E-005)
- PUSH: nach jeder grünen Welle auf main (Auftraggeber)
- ANSICHTEN: 375×812 · 768×1024 · 1440×900 · 1920×1080
- BUDGETS: Standard
- BERICHTE: Morgenbericht 07:00 Europe/Berlin (Annahme Zeitzone)

## Protokoll (stündlich)
- 2026-10-10 15:55 CEST · P0 gestartet; Sicherung (Archiv + unshallow), main ausgecheckt, Aufträge gespeichert, Arbeitsdateien angelegt.
- 2026-10-10 16:20 CEST · P0-ORCH-01 (707a93d) gepusht; Reinraum grün (Build, Typen, Lint, 17/17 Tests, qa:graph), CSS identisch zum Ausgangsstand; Produktion nicht ausgelöst (E-005) → Folgecommit.
- 2026-10-10 16:30 CEST · Werkzeuge (lib, fotos, texte, texte-vergleich, axe, lighthouse, statisch, Playwright-Tests) eingerichtet; Text-/SEO-Basis 120 Seiten, 0 kaputte Links; Kundschafter A01/A02 zurück; Richtung A gestartet.
- 2026-10-10 16:40 CEST · Ausgangsfotos 480/480 (0 Fehler, 0 Überlauf, 0 Konsole); statische Slop-Zählung P0; W0 lokal committet (4 Pakete), Reinraum grün, HTML 172/172 identisch, Texte/SEO grün; Gegenprüfung W0 läuft; axe P0 läuft; Kundschafter A01–A05 zurück; Richtungen A/B/C laufen; 10 Testschreiber-Pakete vorbereitet.
- 2026-10-10 16:54 CEST · W0 live (cf38982), Live-Rauchtest grün; Gegenprüfung P0-GEG-01 FREIGABE; axe-Basis 1.661 ernst/kritisch; Richtung C fertig; TEST-01/02/05 laufen.
- 2026-10-10 18:52 CEST · Funktionstests 289 Fälle grün (Hydrierungs-Wartebedingung), Lighthouse-Basis, Richtung gewählt (E-008), KERN v1, E-009–E-013, heikle Befunde aus öffentlichen Dateien entfernt (a00fdc2), Gesamtplan Runde 1, ruhender Kern-Code (1fc0ec3) live, Live-Rauchtest grün; Gegenprüfung P2-GEG-01: mit Auflagen.
- 2026-10-10 20:40 CEST · Nutzungslimit traf 5 Unteragenten (P3-00a/c/e/g, P2-GEG-02); P2-GEG-02-Rückgabe liegt vor (L0 Runde 2 mit Auflagen nicht bestanden); Neustart, Server neu gestartet.
- 2026-10-10 22:25 CEST · L0 bestanden mit Auflagen (umgesetzt); Werkzeuge P3-00a/b/c/e/g/j/m/n abgenommen; Umzug P3-00h + Fairness P3-00k nach T2 live (ff531a1), Live-Browser grün.
- 2026-10-10 22:45 CEST · P3-00l (Formular-Hooks) nach T2 live (57470f8; Mutationsprobe 4/4, Rauchtest + Live-Browser grün); P3-00d (INP, verschränkte Messung), P3-00p (Hooks Kanal/Banner, lokal), P3-03 Grundbausteine, P3-04 Icons, P3-11 Ablauf/Großformat abgenommen (ruhend, lokal); Kopf A/B, Fuß, Banner laufen.
- 2026-10-11 02:48 CEST · Kandidat `/` (926059b-k): Text v2, Pixel, SVG, axe, Klassen grün; a11y-zusatz zeigt 5 Verschlechterungen → P3-16a; Navigationstests P3-14d und Probeläufer-Basis laufen.
- 2026-10-11 03:48 CEST · P3-16a Barrierefreiheit (harte Kennzahlen 0), Reflow-Ursache im Fuß behoben, Mutationsprobe 9/9, Fünf-Sekunden-Probe, Slop, Jury 6,9 (≥ Schwelle 6,3); Jury-Korrekturen (Kanal, Großformat); Gegenprüfung Tests → P3-14e; ruhende Commits live (5225fb3, Rauchtest grün).
- 2026-10-11 05:35 CEST · Kandidat-Tor `/` (bcd8fcb-k) grün: Suite 350/0, Mutation 9/9 + 11/11, Text v2 rot 0, a11y hart 0, INP max 64 ms, Lighthouse gleich/besser, Jury 6,9, Fünf-Sekunden 10/10, Probeläufe gleich (Tastatur +3 begründet, E-023); Varianten A entfernt; Gegenprüfer P3-16-GEG läuft.

- 2026-10-11 07:28 CEST · **Startseite `/` live (d4da429)** nach Kandidat-Tor 5421e5b-k und zwei Gegenprüfungen (Runde 1 nein → behoben, Runde 2 ja); Live-Rauchtest und Live-Browser grün (0 Konsole, 0 CSP). P3 abgeschlossen; offene Abweichungen Z-04 (Tastatur +3) und Z-12 (TBT über Bestand) in ABNAHME.
