<!-- Gesichert aus dem Workflow-Protokoll der E0-Erkundung (23.10.2026, nur lesend, Haiku 5.5). Unverändert. -->

GEÄNDERTE DATEIEN: keine

BEFUNDE
Pfade relativ zu /home/user/tezgel.

Git und Live-Stand
1. Der Klon hat `main` = 388fa7b (2026-10-13 03:23, „live-rauchtest …“), 47 Commits. Ausgecheckt ist `claude/tezgel-website-redesign-iqxt8z` (HEAD 35af5cc), Arbeitsbaum sauber (`git status`: 0 Zeilen).
2. Ancestor von main sind 5be70eb (E5-Welle live), 1d837bd (E6-Welle live), 95d6f01 (R-02 live), cb46951 (Altsystem-Abbau live), f3ecf9b, 388fa7b.
3. Nicht im Klon (`git cat-file`) sind die in den Notizen genannten Kennungen 6156079 („main = 6156079 (live)“, `_werkstatt/PRUEFPUNKT.md:11`, `:36`), a1aeda6, 5c3c359, 28ee443, d4da429, e41b65f, f3ec304, b913dfd, 559975b.
4. Keine Werkstatt-Commits im Klon: `git log --all` findet 0 Treffer für das Muster E[0-5]-(BAU|ORCH|PRUEF).
5. Der Werkstatt-Arbeitsbranch `claude/amazing-mendel-b0g40w` (`_werkstatt/STATUS.md:24`) fehlt in `git branch -a`.
6. Letzter dokumentierter Live-Stand: cb46951 am 13.10. 05:02 (`_relaunch/PRUEFPUNKT.md:21`). f3ecf9b und 388fa7b auf main haben keine Protokollzeile. `_relaunch/STATUS.md` endet am 12.10. 19:48.

Werkstatt (Lauf angehalten, Übergabe an Relaunch)
7. HALT: `_werkstatt/STATUS.md:1`, `:3`; Übergabe 11.10.: `_werkstatt/STATUS.md:7`; Offen-Liste: `_werkstatt/PRUEFPUNKT.md:5`.
8. Laut Notizen erreicht: 12 Hauptansichten zweimal geprüft, Funktionstests 290/0, Gestaltungsnote 6,5–7,7 (vorher 4,2–4,4), Ladezeit-Budget auf 1 von 12 Seiten (`_werkstatt/BERICHT.md:7–8`; Ausgang `_werkstatt/LAGEBILD.md:12`).
9. Abnahme Z-01…Z-10 steht durchgehend auf ☐ offen (`_werkstatt/ABNAHME.md:15–24`). Die Ausnahme-Liste sagt „_keine_“ (`ABNAHME.md:48`), die Notizen führen aber die Ausnahme M-24 / E-026 (`_werkstatt/MENSCHEN.md:29`, `_werkstatt/ENTSCHEIDUNGEN.md:183`).
10. Stand beim HALT: „Etappe 4 abgeschlossen (11/11)“, E5-BAU-01, -02, -10 fertig (`_werkstatt/STATUS.md:1`). Offen laut `_werkstatt/PRUEFPUNKT.md:5`: E4-Tor, E5-BAU-03…09/-11, E6, Abbau, Kür, Prüfstufe C.
11. `_werkstatt/BERICHT.md:11` sagt „Nichts ist live gegangen; main unverändert seit 11.10.“. Das ist für den Stand 12.10. vormittags richtig, überholt durch die Relaunch-Pushes.

Relaunch (aktiver Lauf)
12. Fusion II abgeschlossen (`_relaunch/PRUEFPUNKT.md:15`). Live: R-01a/b b913dfd (:16), E5-Welle 5be70eb (:18), E6-Welle 1d837bd (:19), R-02 95d6f01 (:20), Altsystem-Abbau cb46951 (:21).
13. Zwei Schritte des Altsystem-Abbaus stehen offen: lucide in `src/config` (Schritte 4/9, `PRUEFPUNKT.md:21`) und die Reste in `kopfskript` (M-27).
14. Lagebezug: `_relaunch/PLAN.md:827` sagt, E4 sei von der Werkstatt erledigt. `_werkstatt/PRUEFPUNKT.md:5` führt den E4-Tor noch als offen.

Entscheidungen, die für einen neuen Lauf gelten
15. Vorbild und Lauf: E-037 (`_relaunch/ENTSCHEIDUNGEN.md:476`), E-038 KERN v2 als einziges Gestaltungssystem, nur die Relaunch-Sitzung baut direkt auf main (`:490`). E-039 Fusion II (`:514`).
16. Bauweise: jede Seite ist live ganz alt oder ganz neu, nach jeder Welle pushen (E-015, `:129`). Push nur `git push origin HEAD:main` nach Reinraum-Prüfung (E-005, `:40`).
17. Schriften: Archivo (wdth 62–125, Latin-Teilmenge) und IBM Plex Mono (`_relaunch/KERN.md:57–60`; gleich in `_werkstatt/KERN.md:96–97`).
18. Farbe: ein Rot, Laser = Logo-Rot, Orange nur im Logo (`_relaunch/KERN.md:35`, `:76`, `:86`). Tinte = Logo-Navy.
19. Seitenwechsel: React ViewTransition ohne Konfiguration, `transitionTypes` für Vorwärts-Navigation (`_werkstatt/KERN.md:48`). Relaunch: Token `seitenwechsel` (`_relaunch/KERN.md:137`).
20. Bewegung nur transform und opacity, Register-Pflicht (`_relaunch/KERN.md:114`; `_werkstatt/KERN.md:116`). CSS-first statt framer-motion (`_werkstatt/ENTSCHEIDUNGEN.md:37`).
21. Gesperrte Palette: Commit 7b8ab21 „Tailwind-Standardpalette gesperrt“ (git log). Ein eigener Entscheidungseintrag existiert nicht (grep „gesperrt“ in ENTSCHEIDUNGEN.md ohne Treffer).
22. Widerruf der Einwilligung über Fußlink, kein schwebendes Schild (E-020, `_relaunch/ENTSCHEIDUNGEN.md:172`). Banner verdeckt nie die Hauptaktion (Nachtrag E-013, `:217`).
23. Preisrechner: Einwilligung nicht vorab angekreuzt (E-014, `:124`). Umgesetzt: `src/lib/formulare/usePreisrechner.ts:35` `useState<boolean>(false)`.
24. Weiterleitungen: 308 über `redirects()` in next.config.ts, 410 über `src/proxy.ts` (E-025, `:277–291`). Live laut `_relaunch/STATUS.md` (Eintrag 08:08, 11.10.): 308 für 2 Adressen, 410 für 7 Altbereiche und 18 Einzeladressen.
25. Leistungsbudgets: mobil LCP ≤ 2,5 s, CLS ≤ 0,1, TBT/INP ≤ 200 ms, Lighthouse ≥ 90, Bewegungs-JS ≤ 60 KB gzip, Schriften ≤ 250 KB, Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip (`_werkstatt/STATUS.md:26`). Relaunch-Ausnahmen TBT: E-024 (`_relaunch/ENTSCHEIDUNGEN.md:260`), E-035 Frist verfehlt (`:435`).
26. Messprotokoll: Lighthouse 13, mobil 4× CPU, Median aus 3 (`_werkstatt/ABNAHME.md:5–9`).
27. Umgebungsausnahmen: kein echtes Safari/Firefox, Bildrate nicht messbar, Ersatzpfad ohne animation-timeline (`_werkstatt/ABNAHME.md:27–30`).
28. Repo ist öffentlich. Vertrauliche Befunde liegen in `_relaunch/intern/`, nicht im Klon (`_relaunch/ENTSCHEIDUNGEN.md:25`; `_relaunch/MENSCHEN.md:4`).
29. Node: `.nvmrc` 20 bleibt, `npm test` braucht Node ≥ 22.6 (E-004, `_relaunch/ENTSCHEIDUNGEN.md:37–38`).

Probeläufe
30. Protokoll fest: `_relaunch/PROBELAUF.md:3`. Fünf Aufgaben, Matrix 15 Läufe (`:54–55`). Bezugswerte Ausgangsstand: `:88–92`, z. B. Aufgabe 5 Tastatur 114 Schritte.
31. Ausgangsbefunde: hoch, Tastatur-Tab-Folge springt nach Seitenwechsel (`:95`); mittel, Tastatur-Umwege 11–24 Tabs (`:96`); Banner bis zu 190 Tabs bis „Alle ablehnen“ (`:100`).
32. Kandidat `/` (P3-16b): freier Lauf über dem Bezugswert in 7 von 15 Läufen (`_relaunch/ENTSCHEIDUNGEN.md:228`). Folge: Gegenprobe mit Ausgangseingaben (`:229`, E-023 `:227`).
33. P4-Tor: Probeläufer 15/15, Fünf-Sekunden 10/12. Mobil erkennen nur 2 von 5 Erstbetrachtern auf /kontakt die Zielgruppe (`_relaunch/MENSCHEN.md:27`, M-20; Eintrag 2026-10-11 ≈14:30 in `_relaunch/STATUS.md`).
34. Die Werkstatt-Notizen enthalten keine Probelauf-Ergebnisse. `_werkstatt/LAGEBILD.md` nennt keine Probeläufe.

Lernpunkte (`_relaunch/LERNEN.md`, Werkzeuge, Prüfungen, Container, Agentenarbeit)
35. Werkzeug und Uhr: feste Client-Uhr ≠ Build-Tag erzeugt Hydrationsfehler #418 (`:8`). Regel: zeitabhängige Elemente maskieren.
36. Werkzeuge: Überlaufprüfung meldet sr-only (`:9`); axe-Menü ohne `:visible` (`:10`); `--reporter=line,json` schreibt auf stdout, nicht in RELAUNCH_REPORT (`:21`); Pixelmaske `:has()` war blind, Positiv-Selbsttest nötig (`:35`); Mess-Korrektur an Umrissen erst mit echten Bildern prüfen (`:30`).
37. Prüfungen: Klick vor Hydrierung ist Testursache, Regel `bedienbar()` (`:14`, `:24`); volle Suite unter Last rot, Einzelwiederholung grün, Suiten nur ohne parallele Last (`:22`, `:36`); Sperrklinke lief in keinem T2 (`:32`); Suspense-Grenzen verstecken Inhalt ohne JS und täuschen Lighthouse (`:23`).
38. Push-Regel: vor jedem Push `git diff --name-only <letzter-Push> HEAD | grep -v ^_relaunch/`, bei Treffern erst T1 (`:27`). Gepushte Kennung als Literal übergeben, nie `$(git rev-parse HEAD)` im Hintergrund (`:25`; `_relaunch/PRUEFPUNKT.md:15`).
39. Container und Server: `server.sh` bricht bei belegtem Port ab (`:15`); `server.sh stop` ließ next-server als Waise (`:19`); `pkill -f` mit eigenem Muster beendet die Shell, Exit 144 (`:17`).
40. Agentenarbeit: gleichnamige Scratchpad-Dateien überschrieben, eigener Unterordner je Paket (`:12`); gemeinsames Ausgabeverzeichnis bei Testschreibern (`:13`); Parallelität 6 statt 5 (`:26`); Workflow mit Platzhalter-Argumenten, Argumentdatei zuerst prüfen (`:28`); je Bild eigener Bewerter statt einem (`:29`); ungeprüfte Begründung, harte Kennzahl umetikettiert (`:31`).
41. Speicherplatz: LERNEN.md enthält keinen Eintrag. Die Regel „höchstens 4 Reinraum-Kopien im Scratchpad“ steht in `_relaunch/PRUEFPUNKT.md:15`.
42. Containerwechsel 12.10. 04:40 mit Neustart (`_relaunch/STATUS.md`, Eintrag 04:40). Werkstatt: node_modules als Symlink in den Scratchpad (`_werkstatt/STATUS.md:30`).

Geplant, nicht gebaut (Kennungen gruppiert, ≤ 30 Zeilen)
43. E4-PRUEF-B, E5-PRUEF-B, E6-PRUEF-B: Prüfstufe B je Etappe (`_werkstatt/PLAN.md:129–131`).
44. E5-BAU-03…09 und E5-BAU-11 (`PLAN.md:108–116`). E5-BAU-03 wurde verworfen, der Patch liegt nur im Scratchpad (`_werkstatt/PRUEFPUNKT.md:5`).
45. E6-BAU-01…11 (`PLAN.md:117–127`). Im Relaunch als S-20 und S-22…S-29 gebaut (`_relaunch/PRUEFPUNKT.md:18–19`).
46. E6-ORCH-01 Altsystem-Abbau (`PLAN.md:128`). Relaunch-Schritte 1–8 live, Schritte 4/9 und 10 offen (`_relaunch/PRUEFPUNKT.md:21`).
47. KÜR-01a…d, KÜR-02…KÜR-09 (`_werkstatt/PLAN.md:132–143`, Kürliste `:410–432`). Nicht gebaut.
48. Z-01…Z-10 und Prüfstufe C, Galerie `bilder/galerie.html` (`_werkstatt/ABNAHME.md:15–24`).
49. E2-AUF-01 Löschung der 13 Komponenten zurückgestellt (`_werkstatt/STATUS.md:37`).
50. Relaunch P6, P7 und Lauf 2 A0–A2 (`_relaunch/PLAN.md:711`, `:265`).
51. Relaunch BERICHT.md leer: „Noch kein Bericht“ (`_relaunch/BERICHT.md:5`).
52. Relaunch P4-14 Aufschub TBT `/` (`_relaunch/ENTSCHEIDUNGEN.md:435`). Umsetzung nicht belegt.
53. Echte Projektfotos und Referenzen fehlen (`_werkstatt/MENSCHEN.md:9`, M-04; `:23`, M-18). Platzhalter-Kennzeichnung bleibt.

Doppelte Entscheidungs-Nummern
54. `_relaunch/ENTSCHEIDUNGEN.md` vergibt E-013, E-015 und E-018 je zweimal: `:116` und `:217`, `:129` und `:152`, `:159` und `:251`.

GEMEINSAME DATEIEN
- `_relaunch/MENSCHEN.md:27` und `_werkstatt/MENSCHEN.md:25` nutzen M-20 für zwei verschiedene Fragen (Zielgruppe gegen Öffnungszeiten). Gleiches gilt für M-21, M-22 und M-25. Die Werkstatt-Fragen M-23…M-26 (Bearbeitungsfunktion, Ladezeit-Ausnahme, Widersprüche, Anfragewege) fehlen in `_relaunch/MENSCHEN.md`; übernommen sind nur WM-15…WM-20 und WM-22.
- `_relaunch/MENSCHEN.md:41` (M-25) listet lucide nur in `src/config/company.js:4` und `src/config/blog.js:1–10`. Dazu kommt `src/lib/formulare/useAnfrageFunnel.ts:10`.
- `_werkstatt/ABNAHME.md:48` („AUSNAHMEN _keine_“) widerspricht `_werkstatt/MENSCHEN.md:29` (M-24 Ausnahme).
- `_werkstatt/MENSCHEN.md:25` nennt die Öffnungszeiten-Quelle `src/lib/config`. Dieser Pfad existiert im Arbeitsbaum nicht (`ls` leer). Zeiten stehen in `src/shared/config/site.ts:54` (`opens: '07:30'`). Den Widerspruch habe ich nicht vollständig geprüft.
- `_relaunch/STATUS.md` endet am 12.10. 19:48. Die Commits vom 13.10. (f3ecf9b, 388fa7b, dd04074) haben keinen Eintrag.

PRÜFUNG UND ERGEBNIS
- Vollständig gelesen: `_werkstatt/{STATUS,PRUEFPUNKT,LAGEBILD,ABNAHME,BERICHT,MENSCHEN}.md`; `_relaunch/{PRUEFPUNKT,MENSCHEN,BERICHT,LERNEN,PROBELAUF}.md`; `_relaunch/STATUS.md` letzte 20 Zeilen.
- Entscheidungen: Überschrift und erste Inhaltszeile aller Einträge. Werkstatt E-001…E-026 (26). Relaunch E-000…E-039 plus drei Nachträge (43 Überschriften).
- Git: `log main`, `merge-base --is-ancestor` für 10 Kennungen, `cat-file` für 11 Kennungen, `branch -a`, `ls-tree main`, Commit-Muster-Suche, `status`.
- Quellen-Stichproben per grep: lucide-Importe (3 Treffer), usePreisrechner.ts:35, cities.ts:15, site.ts:54, kopfskript.ts vorhanden.
- Nicht gelesen: Volltext der Entscheidungen (nur erste Zeile), `_werkstatt/PLAN.md` und `_relaunch/PLAN.md` außer den Paketzeilen und Abschnitten Fusion II und Vereinheitlichung, `_werkstatt/AUFTRAG.md`, `TEXTVORSCHLAEGE.md`, `MIKROTEXTE.md`, Belege und Bilder. Die Live-Seite wurde nicht abgerufen.
- Kein Planfile angelegt; die Aufgabe verlangt nur den Bericht.

BILDBELEGE: keine

OFFENE FRAGEN
1. Welche Historie ist live? main im Klon endet bei 388fa7b. 6156079, e41b65f, f3ec304, b913dfd und a1aeda6 sind nicht vorhanden. Ob die Werkstatt-Commits auf main gelandet sind, ist nicht belegbar.
2. Was ist nach cb46951 (13.10. 05:02) live? f3ecf9b und 388fa7b haben keine Protokollzeile.
3. Gesperrte Palette (7b8ab21) hat keinen eigenen Entscheidungseintrag. Gilt sie als beschlossen?
4. Z-08-Ausnahme: Ist M-24 vom Inhaber bestätigt oder nur Annahme? Die ABNAHME-Liste sagt „_keine_“.
5. Preisrechner (M-13): Der Code hat die vorab gesetzte Einwilligung entfernt. Die Bestätigung des Inhabers fehlt in den Notizen.
6. Öffnungszeiten (M-20 Werkstatt / WM-20): offen. Welche Zeiten gelten, und liegt die Quelle jetzt in src/shared/config/site.ts?
7. Wetzlar (M-17 / WM-17): `src/config/cities.ts:15` steht weiter auf `distanceKm: 0`. Ob Aßlar als Firmensitz und Wetzlar mit Entfernung geführt werden soll, ist offen.
8. Fotos (M-02, M-14, M-17 Relaunch; M-18, M-19, M-22 Werkstatt): keine echten Projektfotos mit Bildrechten. Herkunft der Badfotos (Generatorzeichen) ungeklärt.
9. Bewertungen (M-03 Werkstatt; M-12 Relaunch): Zahlen 5,0/27 und 9,6/25 sowie Namensnennung nicht bestätigt.
10. Garantien, Festpreis, Rückrufzeiten: keine Frage an den Inhaber gefunden. Fundstellen: `_werkstatt/TEXTVORSCHLAEGE.md:61` („Garantierter Standard“), `_relaunch/TEXTVORSCHLAEGE.md:14` (Festpreisangebot). Rückrufzeiten: keine Fundstelle gefunden.
11. Logo-Vektordatei: in keiner Notiz als Frage geführt. Logo gilt als unantastbar (`_werkstatt/KERN.md:6`). Vertrauliche Detailnummer I-08 liegt außerhalb des Klons.
12. Werkstatt-Fragen M-23…M-26 sind in der Relaunch-Liste nicht enthalten: Bearbeitungsfunktion `dataService` (~60 KB), Ladezeit-Ausnahme, widersprüchliche Maße und Zeiten, Anfragewege je Seite.
13. Löschung der verwaisten Dateien (M-15 / WM-15, M-26): laut `a09d483` 25 Dateien gelöscht. Ob der Inhaber widersprochen hat, ist nicht vermerkt.
14. Werkstatt-Probeläufe: keine Ergebnisse in den Notizen gefunden. Ob es sie gab, ist offen.
15. Relaunch P4-14 (TBT-Aufschub) und Morgenbericht-Routine (`_relaunch/PLAN.md:720–731`): Status nicht belegt.
16. Relaunch: M-20 (Zielgruppe) bleibt offen. Die Fünf-Sekunden-Auflage gilt laut PLAN als begründete Abweichung (`_relaunch/PLAN.md:726–729`).

=== ENDE E0-KUND-07 · BEREIT ZUR RÜCKGABE ===
