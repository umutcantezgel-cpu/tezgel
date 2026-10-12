STATUS · Vereinheitlichung (E-037/E-038) · Vorbild: live laufende Fusions-Startseite (KERN v2) · nur diese Sitzung, Seite für Seite auf main · live 6156079 · Phase 0: Zusammenführung (Merge 6e9b619) und Übergabe, T1 läuft · Nächster Schritt: Push, dann Phase 1 (eine Suite, Werkzeuge, Basiswerte) und S-01 `/leistungen`

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
- 2026-10-11 08:08 CEST · P4-07 Wege live (544c42d): 308 für 2 Tezgel-Adressen, 410 für 7 Altbereiche + 18 Einzeladressen über `proxy.ts`; T2 grün (HTML 172 gleich, Proxy trifft keine Seite, Suite 350/0/16, Mutationsprobe 5/5 + Werkzeug), Live-Rauchtest + `wege --live` grün. P4-01…P4-05a zurück und lokal committet; Gegenprüfer P4-05a: Verhalten gleich. P4-05b/c laufen.
- 2026-10-11 09:35 CEST · Push 8b4f9cd nach T2: Icon-Vollsatz (E-026), Formular-Hooks F-04…F-08 (je Gegenprüfer „gleich“), Kalender-Hydrationsfehler ab Tag 2 behoben (I-19, P4-05d), Zuklappen animiert (P4-09), Wortbruch im Fuß behoben; Vorlagen P4-01/02/03 und deren Überarbeitung P4-10a/b ruhend. Wunschtermin-Verlust (I-12) als M-19 an den Auftraggeber.
- 2026-10-11 12:30 CEST · Nutzungslimit 11:48 traf alle Unteragenten; danach fortgesetzt. Entwürfe der Hauptseiten /bad (SIG-2), /leistungen (SIG-3), /standorte, /blog, /ueber-uns ruhend committet; Hook F-16 /blog nach Gegenprüfer + T2 live (8622329, Rauchtest + Live-Browser grün). /kontakt in Arbeit; danach P4-Tor über den Vorschau-Kandidaten.
- 2026-10-11 14:25 CEST · Alle sechs Hauptseiten-Entwürfe ruhend (P4-08a–f). P4-Tor läuft am Vorschau-Kandidaten 5913897-v: texte2 0 rot (E-028), SEO-Invarianten 0 Abweichungen, axe 0 ernst/kritisch; a11y-zusatz und Fotos in Arbeit, Testschreiber P4-06 läuft. Redeploy auf Wunsch des Auftraggebers.
- 2026-10-11 ≈ 14:30 CEST · P4-Tor an der Vorschau 1c6c9cd-v weitgehend durch: Suite 382/0, Mutation 6/6 (Testlücke im Kalender-Test geschlossen), Barrierefreiheit harte Kennzahlen 0, Darstellung 0 Fehler, Probeläufer 15/15, Fünf-Sekunden 10/12 (Zielgruppe auf /kontakt und /leistungen mobil → M-20), Slop weich 23 statt 58. Gegenprüfer läuft; TBT-Paket P4-12 läuft. Pushes nur Arbeitsordner und ruhender Code (T1 grün).
- 2026-10-11 18:15 CEST · P4-Tor Runde 2 an Vorschau c5ef582-v gemessen: H1/H2 behoben, Suite 382/1/15 (Lastfall Bestand, einzeln grün), axe 57/0, a11y hart 0 (E-018), Gegenprobe 13/15, Mutation P6 6/6, Fünf-Sekunden (Regel vorab, 3 Bewerter): Desktop ≥ Bestand, Wortlaut M-20 bleibt; T2 `/`: Pixel nur Kopf, Lighthouse = Live, INP max 80; E-035 (TBT → P4-14), E-036 (Pixelwerkzeug blind seit P2, berichtigt); Gegenprüfer P4-GEG2 gestartet.
- 2026-10-12 04:40 CEST · Neustart nach Containerwechsel. Lage: Werkstatt-Fusion (6156079) seit 11.10. live; Auftraggeber: Vorbild = Fusions-Startseite, nur diese Sitzung baut (E-038). origin/main eingemischt (6e9b619, Konflikt kopfskript.ts aufgelöst), commit.sh mit Merge-Modus, Übergabevermerke in `_werkstatt`, Plan „Vereinheitlichung“ in PLAN.md.
- 2026-10-12 06:25 CEST · Phase 0 live (c27fc77). Basiswerte: live `/` mobil 70,5 gegen 82,5 Punkte, TBT 1 045 gegen 286 ms (Stil-Neuberechnungen nach dem ersten Bild) → Paket N-01. S-01 `/leistungen`, S-02 `/ueber-uns`, S-03 `/blog` und N-01 laufen (Opus); Suite gegen live läuft; Prüftor tor-s.sh; Werkstatt-Fragen als WM-15–WM-22 übernommen; Morgenbericht umgestellt.
- 2026-10-12 07:05 CEST · S-02 `/ueber-uns` live (5c3c359, Tor grün, Live-Prüfung grün). S-01 `/leistungen` (67f6df4) und S-03 `/blog` (607d822) committet, gemeinsames Tor läuft. S-04 `/leistungen/[id]` und N-01 in Arbeit. Rahmenpaket R-01 (Fokus verdeckt) in den PLAN.
- 2026-10-12 07:50 CEST · S-04 abgenommen (0be3106). Q-01/02/03/05 laufen (Q-03 fertig, Nachtrag autocomplete). Tor S-01/03+N-01: alles grün außer neu waagerecht scrollbarem Viewport bei Zoom/Textabstand durch N-01 → N-01b; Push bis dahin angehalten. Morgenbericht gesendet.
- 2026-10-12 10:05 CEST · Zweite Sitzung entdeckt: Werkstatt hat a1aeda6 (191 Commits, E3–E5) gepusht. Auftraggeber: abschnittsweise fusionieren, /bad·/fliesen·Artikel aus der Werkstatt, nur diese Sitzung pusht (E-039). Merge c4f2a04 (Konflikte vorläufig Werkstatt), WIP gesichert, Reinraum läuft.
- 2026-10-12 10:55 CEST · F0: Sammel-Tor m-e039 (M gegen live a1aeda6) grün, Lighthouse ruhig gemessen; Push M; F1 Gutachten Formulare läuft.
