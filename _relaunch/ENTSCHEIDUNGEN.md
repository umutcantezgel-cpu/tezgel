# ENTSCHEIDUNGEN

Chronologisch. Folgenreiche Entscheidungen mit Denkprotokoll (Ziel → Wege → Bewertung → Umkehrprobe → Folgen zweiter Ordnung).

---

## E-000 · 10.10.2026 · Entscheidungen des Auftraggebers (Chat) – gehen den Einstellungen vor

Quelle: Antworten des Auftraggebers im Chat am 10.10.2026, nach Nachricht „Werte einfach die Webseite speziell für Fliesenverlegung tezgel auf, nur noch für ihn das repo weil der rest kann entfernt werde“.

| Frage | Antwort (wörtlich gewählt) | Folge |
|---|---|---|
| Ablauf | „Nur aufwerten, ohne Rückführung“ | P1 Verlustatlas entfällt. Z-01 und Z-02 = ENTFÄLLT (Entscheidung des Auftraggebers), keine AUSNAHME. |
| Aufräumen | „Reste der Vorgängerfirma, Prompt-/Pipeline-Dokumente, Export-Ordner, Logs, Vorlagen, Altkonfig“ | Entfernen dieser Gruppen ist freigegeben (G4 für diese Gruppen aufgehoben), mit Protokoll. |
| Sichern | „Push direkt auf main“ | G2 „kein Push“ und G3 für Pushes auf main aufgehoben. BRANCH = main. |
| Live-Push | „Nach jeder Welle auf main“ | Push nach jeder grünen Welle; main = Produktion (Vercel). |
| Freigabe | „Nein, vollautonom“ | FREIGABE = nein für Lauf 1. |
| Lauf 2 | „Direkt anschließen (Empfohlen)“ | Lauf 2 startet nach ABSCHLUSS von Lauf 1; Halt am Freigabepunkt A2. |
| Doku | „Alles ins Repo“ | `_relaunch` wird committet (statt `.git/info/exclude`). |
| Altstand | „Tezgel-Stände in Git (Empfohlen)“ | Nur Nachschlagequelle (keine Rückführung). |

Der Plan mit diesen Punkten wurde vom Auftraggeber genehmigt (Plan-Freigabe im Chat): `_relaunch/PLAN.md`.

## E-001 · Zwei Einschränkungen zu „Alles ins Repo“ (im genehmigten Plan)
- Das Repo `umutcantezgel-cpu/tezgel` ist öffentlich. Sicherheitslücken und rechtliche Angriffsflächen stehen nur in `_relaunch/intern/` (per `.git/info/exclude` ausgeschlossen); MENSCHEN.md verweist neutral darauf. Grund: Schutz des Betriebs vor Ausnutzung und Abmahnungen.
- Belege in vertretbarer Menge: alle Belege, auf die MESSUNGEN/ABNAHME/BERICHT verweisen (Hauptseiten + 2 je Vorlage, JPEG q70, DPR 1, Kontaktbögen, Bildfolgen); Massen-Rohaufnahmen bleiben im lokalen Cache `_relaunch/cache/` (ignoriert, aus jeder Commit-Kennung reproduzierbar). Keine Datei > 5 MB, ≤ 50 MB je Push.
- Nicht committet: `_relaunch/sicherung/` (Archiv; Commit-Kennung 5a7a7b0 ist die eigentliche Sicherung), `_relaunch/werkzeuge/node_modules`, Build-Ausgaben, Lighthouse-Roh-JSON.

## E-002 · Sicherung
- Ausgangsstand = Commit `5a7a7b066ab098a1984bfbc556aa597b957bb8f4` (origin/main = HEAD, Arbeitsbaum sauber → kein „Ausgangsstand vor dem Lauf“-Commit nötig).
- Archiv: `_relaunch/sicherung/ausgangsstand-5a7a7b0.tar.gz`, sha256 `d433404dbc7bc8f25e529d904986d07b5d000adc8f4cbe761c877ff3b650a795` (lokal).
- Volle Git-Historie per `git fetch --unshallow` geladen.

## E-003 · Push-Weg
- *(ersetzt durch E-005)* Vor jedem main-Push: Reinraum-Build aus `git worktree`, Invarianten, ~~Push des Commits auf den Sitzungs-Branch → Vercel-Vorschau-Status grün~~ → `git push origin HEAD:main` → Produktionsstatus → Live-Rauchtest (x-build-Meta = Commit). Bewegt sich origin/main: Merge-Commit, kein Rebase, kein Force.

## E-004 · Node-Version
- `.nvmrc` (20) und `engines` (>=18.17) bleiben unverändert: Die Laufzeit auf Vercel ist eine Projekteinstellung; eine Änderung wäre eine Hosting-Änderung ohne Nutzen für die Gestaltung. Lokal läuft Node 22.22 (nötig für `npm test` mit `--experimental-strip-types`). Hinweis in MENSCHEN.md.

## E-005 · Push-Weg korrigiert: kein Vorab-Push auf den Sitzungs-Branch mehr
- Befund (10.10., P0-ORCH-01): Der Commit 707a93d wurde zuerst auf `claude/kind-franklin-5y6s1d` gepusht (Vorschau in beiden Vercel-Projekten erfolgreich), danach auf `main`. Für denselben Commit legte Vercel auf `main` **keine** Produktions-Bereitstellung an; www.tezgel.de blieb auf 5a7a7b0 (data-dpl-id `dpl_HLCm…`, x-build fehlt).
- Ziel: Jeder Wellen-Commit muss verlässlich live gehen und vorher geprüft sein.
- Wege: (1) weiter Vorab-Push auf Branch → blockiert Produktion (verworfen); (2) Vorab-Push eines eigenen Prüf-Commits → doppelte Commits, Verwirrung (verworfen); (3) **direkt auf main pushen, Vorprüfung ausschließlich über den Reinraum-Build** (`_relaunch/werkzeuge/reinraum.sh`, identische Kopie der getrackten Dateien, `npm ci`, Build, Typen, Lint, Tests, Routentabelle, Tracing) plus Produktionsstatus und Live-Rauchtest danach.
- Wahl: (3). Umkehrprobe: Revert-Commit auf main. Folge zweiter Ordnung: Ein nur auf Vercel auftretender Build-Fehler würde erst nach dem Push sichtbar – dann bleibt die vorherige Produktion aktiv (Vercel schaltet nur erfolgreiche Builds live), Schaden gering.
- Beobachtung: Das Repo ist mit **zwei** Vercel-Projekten verbunden (`uus-projects-dd41487b/tezgel` und `codays-projects/tezgel`); www.tezgel.de wird vom Projekt `codays-projects` ausgeliefert. → MENSCHEN.md M-11.

## E-006 · Richtungsarbeit (P2) startet parallel zum Rest von P0
- Die drei Stilkacheln entstehen als eigenständige HTML-Dateien in `_relaunch/richtungen/` und berühren weder Plattform noch Messbasis. Sie laufen daher als Vorrat (L2: kein Platz bleibt leer) in freien Agentenplätzen, während P0 (Fotos, axe, Lighthouse, Jury-Ausgangswert, W0) abschließt. Wahl, KERN und Plan erfolgen erst nach dem P0-Phasentor.
- Schriften: Pool aus 30 OFL-Familien lokal über npm (`_relaunch/richtungen/SCHRIFTEN-POOL.md`), keine Laufzeitabhängigkeit.

## E-007 · W0 „Aufräumen“ – Protokoll, Gegenprüfung P0-GEG-01: FREIGABE
- Commits: f595f7b (Gruppen b/c), 88b2b67 (d), eca9d5b (a, Code der Vorgängerfirma), 74be890 (ungenutzte Abhängigkeiten), dazu P0-W0-05 (Auflagen der Gegenprüfung).
- Richtigstellungen laut Gegenprüfung: `Pipeline Kopie 5/` enthielt 112 Dateien (92 Direktiven + 20 in `context_documents`, Commit-Text sagte 93); `src/styles/index.css` stammt aus 54038a2 als `src/index.css` und wurde in 6cd3436 umbenannt; `SECURITY.md` steht in der Löschliste unter (a), im Commit unter (d) – inhaltlich gilt (a) (beschrieb die Anmeldung der Vorgängerfirma); `src/utils/index.js` wurde versehentlich auf LF umgestellt → in P0-W0-05 mit CRLF wiederhergestellt (Diff gegen 5a7a7b0: nur 20 entfernte Zeilen `createPageUrl`).
- `public/llms.txt`: Tezgel-Inhalt, aber überschattetes Duplikat der Route `src/app/llms.txt/route.ts`; live wurde es nie ausgeliefert (Beleg der Gegenprüfung: Live-Abruf `https://www.tezgel.de/llms.txt` ist byte-gleich mit `.next/server/app/llms.txt.body` des Reinraum-Builds 74be890). URL und ausgelieferter Inhalt bleiben gleich; lokal stimmt die Auslieferung jetzt mit live überein.
- Next-Vorlagen-SVGs `/file.svg`, `/globe.svg`, `/next.svg`, `/vercel.svg`, `/window.svg` lieferten live 200 und liefern nach dem Push 404: nicht in der Sitemap, nirgends verlinkt, freigegebene Vorlagen (Gruppe d) – kein URL-Schutzfall (Z-06 bezieht sich auf Seiten mit Suchwert).
- Tor: Pixelvergleich durch stärkeren deterministischen Beleg ersetzt – vorgerendertes HTML aller 172 Seiten identisch (normalisiert), 211 CSS-Selektoren, 46 Theme-Variablen und `@keyframes bounce` entfallen, keine davon im gerenderten HTML, in Client-JS (nur tailwind-merge-/zod-Tabellen) oder per `var()` im neuen CSS referenziert. Text-/SEO-Vergleich 120 Seiten GRÜN. Begründung: Bei identischem Markup und ausschließlich unbenutzten entfallenen Regeln kann sich die Darstellung nicht ändern.
- `build-vergleich.mjs` repariert (Selektorlisten nur außerhalb von Klammern trennen) und um Custom Properties und `@keyframes` erweitert.
- Optionale Auflage umgesetzt: `dist/*`-Altkonfiguration aus `tsconfig.json` und `eslint.config.mjs` entfernt (`.gitignore`-Eintrag `dist/` bleibt als Schutz). `ms-reusable-components`/`coday-seo-toolkit`-Einträge bleiben (evtl. lokale Ordner des Auftraggebers).

## E-008 · Denkprotokoll: Gestaltungsrichtung (P2, vollautonom nach E-000)
- **Ziel:** eine Richtung, die (1) die Austauschprobe besteht, (2) ohne Textänderung an Überschriften und Fließtext auskommt (UNANTASTBAR), (3) auf alle 120 Seiten und 10 Vorlagen trägt – auch auf Arbeits- und Rechtsseiten, (4) ohne echte Fotos stark ist (Bildfragen offen in MENSCHEN.md; neue Bilder dürfen nicht erfunden werden), (5) für 35- bis 75-Jährige gut bedienbar ist und (6) in Lauf 2 einen markenbezogenen Spitzenmoment hergibt.
- **Jury (3 × 3 Opus, nur Bilder, Lockvogel gültig 3,9–4,8 bei P0 4,30):** A 7,00 (7,5/6/8/6) · B 6,45 (7/5,5/7,5/5) · C 7,00 (7,5/6/8/6). Gemeinsame Schwächen aller drei: Kachel ist Stil-Dokumentation statt Kundenseite (gewollt, Kachel ≠ Seite), keine echten Fotos, Kleinfehler im Satz (A: ß in Plex Mono, Achse schneidet mobil die Überschrift; C: „Großformatflies/en“, WhatsApp-Knopf allein in Zeile 2). Beleg `belege/p2-richtungen-jury.json`.
- **Wege:**
  1. *A rein* („Fuge und Achse“: Fugenraster, eine Laserachse, Verlegeplan-Zeichnungen, Archivo + Plex Mono, Navy + Laserrot).
  2. *C rein* („Angestrichen“: Aufmaßblatt, Kundenstimmen mit Rotstift, Newsreader + Atkinson Hyperlegible Next + Plex Mono).
  3. *B rein* („Streiflicht“: Großformat-Platten, 2-px-Fuge, Wasserblau).
  4. *Verschmelzung: A als Grundsystem + C als Vertrauensschicht* (Rotstift nur für wörtliche Kundenstimmen und Prüfhaken, in A-Formensprache).
- **Bewertung:**
  - Nordstern/Austauschprobe: A und C bestehen, B nur im Grenzfall (anderer Großformat-Betrieb könnte es übernehmen).
  - UNANTASTBAR: Die bestehende H1 von `/` lautet „Perfektion auf jedem Quadratmeter. Fliesenverlegung & Badsanierung aus Aßlar“ – sie ist wörtlich die Leitidee von A (Präzision je Quadratmeter = Verlegeplan). C setzt das Motto als H1 → Überschriftenänderung, nur als Vorschlag zulässig; C verliert ohne diese Geste seinen Einstieg.
  - Skalierung: A erzeugt je Leistung eine eigene Verlegeplan-Zeichnung (6 Leistungen, 13 Fliesenseiten, Untergrund/Abdichtung, Treppen, Balkon) – Bildwelt ohne Foto, ehrlich gezeichnet, ohne erfundene Maße („=“ statt Zahl). C lebt von Kundenstimmen (27 Bewertungen, Freigabe der Namensnennung offen, M-12) und trägt auf Rechts-, Blog- und Leistungsseiten kaum.
  - Bedienbarkeit: gleich (je 6); Fehler beider sind lokal behebbar. Cs Atkinson-Vorteil (1/l/I, 0/O) gilt vor allem für Nummern – diese stehen in A ohnehin in Plex Mono mit eindeutigen Formen.
  - Lauf 2: A liefert den markenbezogenen Spitzenmoment (Kreuzlinienlaser projiziert Waage und Lot über eine gezeichnete Fläche) ohne Fremdmotiv.
  - Risiko: A wirkt kühl/technisch → Gegenmittel aus C: die Hand des Inhabers (Anriss mit dem Stift ist Fliesenleger-Praxis) an echten Stimmen und Prüfhaken; Kitschgefahr von C wird durch „ein Rot, eine Geste je Abschnitt“ begrenzt.
  - Aufwand: A ≈ C; Verschmelzung + 10 % (zwei Gesten statt einer), dafür weniger Schriften als C (2 Familien statt 3, Budget ≤ 250 KB sicher).
- **Wahl: Weg 4.** Grundsystem A (Raster, Achse, Schriften, Palette, Formsystem, Verlegeplan-Motiv). Aus C übernommen: (a) der *Anriss* – eine handgeführte Unterstreichung in Laser-tief an genau einem Schlüsselwort wörtlicher Kundenstimmen, mit Randnotiz, die auf Tezgels echten Ablauf verweist; (b) die *Prüfhaken* Ebenheit · Restfeuchte · Tragfähigkeit im Ablauf (Inhalt existiert im Ablauf-Text); (c) der Erfolgszustand „Notiert.“ mit Inhabername (Mikrotext, erlaubt). Aus B übernommen: Drittelverband als Rastervariante für Großformat-Seiten. Verworfen: Cs Zeitungs-Antiqua und Motto-H1 (Textänderung), Bs Wasserblau (zweite Akzentfarbe), Cs `navigator.webdriver`-Weiche (G7 – keine Sonderbehandlung von Testumgebungen; Endzustände entstehen über die Startklasse mit 2-s-Zeitlimit).
- **Umkehrprobe:** Die Richtung wird ab P3 nur additiv (`--k-*`, Schriften am Seiten-Wrapper von `/`) eingeführt; Rücknahme = Revert der P3-Commits, alle anderen Seiten bleiben pixelgleich (Tor: Pixeldiff 0). Ab P4 Revert je Welle.
- **Folgen zweiter Ordnung:** (1) Der Hamburger am Desktop entfällt (Raster braucht Kopfzeile mit Hauptnavigation) – Funktion bleibt, Test F-13 sichert. (2) Orange verschwindet aus der Gestaltung und bleibt allein im Logo → Logo wird der einzige warme Fleck; Logo unverändert. (3) Viele Icon-Kacheln (S-11) werden durch Verlegeplan-Vignetten oder Fugenkreuz-Aufzählungen ersetzt → Icon-Bestand sinkt stark, eine Familie (K-010). (4) Kundenstimmen werden zum tragenden Vertrauensbeleg → MENSCHEN: Freigabe der Namensnennung. (5) Die Plex-Mono-Teilmenge muss Latin Extended (ß, ẞ, Umlaute) enthalten – P3 prüft „Aßlar“, „Straße“, „Großformat“ in allen Ansichten. (6) Mobil eigene Komposition: Achse als Lot links statt als Waage durch die Überschrift.

## E-009 · Denkprotokoll: Bewegungsarchitektur
- **Ziel:** alle Einträge des Registers (K-009) mit ≤ 60 KB gzip zusätzlichem JS, reduzierte Bewegung zentral, ohne JS alles sichtbar, LCP nie verzögert.
- **Bestand:** framer-motion in 7 Dateien (global `MotionConfig` in `MotionProvider`, `CompanyHistory` mit useScroll, `HeartbeatCTA`, `/beratung`, `useInView` in zwei Kartenhüllen, verwaistes `AnimatedNumber`). Paket `motion` war ungenutzt (W0 entfernt).
- **Wege:** (1) *CSS-first + eigenes Modul* `src/lib/motion/` (IntersectionObserver-Auslöser, Startklasse, Zeitlimit, `prefers-reduced-motion`- und Zeigerabfragen; Animationen als CSS-Transitions/Keyframes über Tokens, Linienzeichnen per `stroke-dashoffset`), framer-motion danach entfernen. (2) framer-motion behalten, auf `LazyMotion` + `m` umstellen. (3) GSAP + ScrollTrigger.
- **Bewertung:** Das Register enthält nur Auftritte, Linienzeichnen, Zustände und eine Aufklapphöhe – alles mit CSS + IO lösbar, keine Physik nötig. (1) ≈ 2–3 KB gzip, keine neue Abhängigkeit (G6), läuft ohne Hydrierung (Startzustände per Klasse). (2) ≈ 15–20 KB gzip, Hydrierungsabhängigkeit bleibt. (3) ≈ 30–45 KB gzip, neue Lizenzprüfung, überdimensioniert.
- **Wahl: (1).** framer-motion wird je Fundstelle in den zuständigen Wellen ersetzt (P3: `/`-Bestandteile; P4: `MotionProvider`, Kartenhüllen; P5: `CompanyHistory`, `HeartbeatCTA`, `/beratung`) und nach der letzten Fundstelle per `npm uninstall` entfernt.
- **Umkehrprobe:** Revert der Welle; das Paket bleibt bis zur letzten Fundstelle installiert.
- **Folgen zweiter Ordnung:** kleineres JS auf allen Seiten (TBT ↓); `data-motion-hydrated` (Interaktionsmarker) entfällt mit `MotionProvider` – vorher Nutzung in CSS/Tests prüfen (K-004).

## E-010 · Denkprotokoll: Icon-Familie
- **Ziel:** eine Familie (S-04 hart = 0), Formsystem K-010, Budget je Icon ≤ 1,5 KB.
- **Bestand:** lucide in 122 Dateien (133 Icons, `iconMapper` löst Konfig-Strings), Phosphor für Social-Logos, eigene Inline-SVG in 5 Dateien (`TileCraftIcons`).
- **Wege:** (1) *eigenes Formsystem* für den reduzierten Bestand (≈ 30 Icons, K-010), Sprite + Komponente `Icon`, `iconMapper` bildet alte Namen auf neue ab. (2) lucide behalten und angleichen (Strichstärke 1,5, `square`-Enden per CSS). (3) eine andere Bibliothek (Tabler, Phosphor) vollständig.
- **Bewertung:** (2) besteht S-04 formal, aber lucide-Rundungen widersprechen dem Formsystem (Ecken `miter`) und tragen den Einheitslook. (3) dasselbe Problem, neue Abhängigkeit. (1) passt zur Leitidee, reduziert Icon-Kacheln (S-11) auf das Nötige; Aufwand ≈ 30 Zeichnungen + Abbildung.
- **Wahl: (1).** Markenlogos (WhatsApp, Google, Social) bleiben unverändert und zählen nicht zur Familie. Umstieg je Welle; lucide wird nach der letzten Fundstelle entfernt.
- **Umkehrprobe:** `Icon` kann je Name auf lucide zurückfallen, solange das Paket installiert ist.
- **Folgen zweiter Ordnung:** Konfig-Strings in `src/config` bleiben gleich (Abbildung statt Umbenennung); E-Mail-Vorlagen nutzen keine Icons (prüfen).

## E-011 · Denkprotokoll: WaterCursor
- **Ziel:** S-09 Nachlaufcursor entfernen, ohne dass eine Aufgabe verloren geht.
- **Bestand:** `src/components/ui/WaterCursor.tsx` (588 Zeilen, WebGL), global über `ClientWidgets`, nur Dekoration ohne Aufgabe.
- **Wege:** (1) entfernen, Ersatz ist SIG-1 Kreuzlinie als lebendiges Element des Einstiegs. (2) auf `(pointer: fine)` und Erzählseiten begrenzen. (3) in Form der Leitidee neu (Laserpunkt folgt dem Zeiger).
- **Bewertung:** (2) bleibt S-09 und WebGL (in Lauf 1 nur bei GESTALTUNGSMUT experimentell zulässig). (3) Nachlaufcursor bleibt Nachlaufcursor, Austauschprobe schwach. (1) spart JS und GPU-Last, die Aufgabe „Lebendigkeit“ übernimmt SIG-1.
- **Wahl: (1)** in P4 (globaler Umstieg) mit Protokoll; verwaiste Hülle `src/components/common/WaterCursor.tsx` gleich mit.
- **Umkehrprobe:** Revert des P4-Pakets.
- **Folgen zweiter Ordnung:** Lauf 2 darf einen markenbezogenen WebGL-/Canvas-Moment prüfen (A2 C) – nicht als Cursor.

## E-012 · Denkprotokoll: WhatsApp-Widget
- **Ziel:** Funktion F-10 unverändert (Ziel-URL, vorbelegter, seitenbezogener Text, Ereignis `whatsapp_click`), Form nach KERN, keine Überdeckung von Formularen (Jury P0), keine manipulativen Muster.
- **Bestand:** `FloatingWhatsAppWidget.tsx` (780 Zeilen) mit Wurfphysik (`widgetPhysicsCoordinator`), Tooltip, Benachrichtigungs-Badge „1“ für 30 s (vorgetäuschte Nachricht), dazu MobileBottomBar mit WhatsApp.
- **Wege:** (1) mobil entfällt das schwebende Widget, WhatsApp liegt in der unteren Leiste; Desktop ein flacher, rechteckiger Knopf rechts unten im Formsystem, ohne Badge und ohne Physik. (2) überall schwebend, nur neu gestaltet. (3) Widget ganz entfernen, nur Leiste und Kopf.
- **Bewertung:** (2) behält die Mehrfachüberlagerung mobil. (3) verliert am Desktop einen sichtbaren Kanal (Bestand). (1) erhält jeden Kanal und beseitigt die Überdeckung. Das Badge „1“ täuscht eine Nachricht vor → manipulatives Muster, entfällt (Leitplanke Rang 1).
- **Wahl: (1)** in P4. Seitenbezogene Texte und das Analyse-Ereignis bleiben wörtlich.
- **Umkehrprobe:** Revert; Funktionstest F-10 sichert beide Wege.
- **Folgen zweiter Ordnung:** `widgetPhysicsCoordinator` wird nur noch vom Banner genutzt → mit E-013 entfällt er ganz.

## E-013 · Denkprotokoll: Einwilligungsbanner
- **Ziel:** Inhalt, Reihenfolge und Gleichwertigkeit der Knöpfe unverändert (F-11), Form nach KERN, verdeckt nie die Hauptaktion des ersten Bildschirms.
- **Wege:** (1) Schriftfeld-Form: Desktop links unten ≤ 28rem, mobil unten über der Leiste, ohne Wurfphysik. (2) Modal in der Mitte. (3) schmale Leiste am oberen Rand.
- **Bewertung:** (2) blockiert Inhalte (S-07-nah) und fokussiert zwangsweise. (3) verdrängt Kopf und Achse. (1) ist nicht blockierend und im Formsystem; die Wurfphysik hat keine Aufgabe.
- **Wahl: (1)** in P4. Texte und Kategorien wörtlich (Rechtstext), Fokusreihenfolge geprüft.
- **Umkehrprobe:** Revert; F-11 sichert das Verhalten.
- **Folgen zweiter Ordnung:** Das Einwilligungsverhalten selbst (Speicherung, Kategorien, Zeitpunkt) bleibt unberührt (G9); Prüfpunkte dazu stehen neutral in MENSCHEN.md.

## E-014 · Vorab angekreuzte Einwilligung im Preisrechner
- **Befund:** Die Einwilligungs-Checkbox im PricingCalculator startet angekreuzt (`useState(true)`). Eine vorab erteilte Einwilligung ist kein freiwilliges, bewusstes Ja (Fairness-Leitplanke, Rang 1 vor Bestand).
- **Wahl:** Startwert `false` in der Kern-Darstellung (P3-10); Logik der Übermittlung unverändert. **Folge für Z-04:** ein Klick mehr in der Aufgabe „Anfrage stellen“ über den Preisrechner – begründete Abweichung, im Probeläufer-Vergleich ausgewiesen. Prüfhinweis an den Auftraggeber in MENSCHEN.md.
- **Umkehrprobe:** ein Wert im Revert.

## E-015 · Denkprotokoll: Bauweise und Freischaltung (ersetzt den „globalen Umstieg“ in P4)
- **Ziel:** (1) nie ein halbfertiger oder gemischter Stand live – jede Seite ist live ganz alt oder ganz neu; (2) trotzdem nach jeder Welle pushen (E-000), damit nichts verloren geht; (3) kein globales Umfärben ungeprüfter Seiten (P2-GEG-01 Befund 2: ≈ 4.600 Klassenstellen über `tokens.css`-Umdeutungen); (4) neue Seiten laden nur die neuen Schriften und das neue CSS.
- **Wege:**
  1. *Plan Runde 1:* P3 additiv auf `/`, P4 globaler Umstieg (Tokens, Schriften, Schale für alle), P5 Körper je Cluster. → Mischstände live (neue `/` unter altem Kopf; neue Schale über orangen Körpern auf 113 Seiten), großes Umfärbe-Risiko.
  2. *Schale per Pfad wählen* (Client-Weiche mit `usePathname`, beide Schalen im RSC-Paket aller Seiten) + Schalter je Phase. → doppelte Schale in jeder Seite, alle vier Schriftfamilien überall, Weiche im Client.
  3. *Zwei Routen-Gruppen mit je eigenem Root-Layout:* `src/app/(bestand)/` (heutiges Layout unverändert: Schale, Inter/Jakarta, `globals.css`) und `src/app/(kern)/` (neues Layout: Kern-Schale, Archivo/Plex, eigenes CSS `kern-global.css` mit `@source` nur auf Kern-Code). Neue Seiten entstehen ruhend im privaten Ordner `src/app/(kern)/_entwurf/<route>/` (Unterstrich = nicht geroutet), werden gebaut, typgeprüft, gelintet und gepusht, sind aber nicht erreichbar. **Freischaltung** einer Seite oder eines Clusters = ein Commit, der `_entwurf/<route>` nach `(kern)/<route>` verschiebt und `(bestand)/<route>` entfernt. Getestet wird vorher der **Kandidat**: Reinraum-Kopie + dasselbe Freischalt-Skript (`werkzeuge/freischalten.sh`), also Byte für Byte der spätere Live-Stand. 404 für unbekannte Adressen über `app/global-not-found.tsx` (experimentell, `experimental.globalNotFound`), das die Bestands-Schale rendert, bis die letzte Seite umgezogen ist.
- **Bewertung:** (3) erfüllt alle vier Ziele: Seiten sind live nie gemischt; Wellen pushen ruhenden Code; alte Seiten behalten ihr CSS unverändert (`globals.css` bekommt nur `@source not` für Kern-Ordner, damit ihr CSS byte-gleich bleibt), neue Seiten tragen nur Kern-CSS und zwei Schriften; framer-motion, lucide, `tokens.css`, Inter/Jakarta und die alte Schale fallen am Ende mit dem letzten Bestandsnutzer weg (E-009/E-010 vereinfacht, P2-GEG-01 Befund 10 erledigt). Nachteil: Wechsel zwischen alter und neuer Seite lädt die Seite voll neu (verschiedene Root-Layouts) – nur in der Übergangszeit, unkritisch. Risiko: `global-not-found` ist experimentell → Kandidat-Prüfung mit Status 404 und Funktionstest F-17; Rückfall: Weg 2 nur für die 404.
- **Wahl: (3).** Ablauf je Phase: ruhende Wellen → Kandidat-Tor (vollständig) → Freischalt-Commit → Push → Live-Rauchtest. Der Umzug des Bestands nach `(bestand)` ist ein eigener, inhaltsneutraler Schritt (P3-00): HTML aller 172 Dateien normalisiert identisch, Pixel 0.
- **Umkehrprobe:** Revert des Freischalt-Commits stellt die Bestandsseite wieder her (sie liegt bis zum Aufräumen am Phasenende in der Historie und im Kandidat-Vergleich). Der Umzug selbst ist per Revert umkehrbar.
- **Folgen zweiter Ordnung:** (1) P4 heißt nun „Fundament“ ohne globalen Umstieg: vollständige Kern-Bausteine, Vorlagen, Verlegepläne, Icons, Wege (308/410) – die Freischaltungen geschehen clusterweise in P5. (2) Interne Links zwischen alten und neuen Seiten bleiben gleich (URLs unverändert). (3) Metadaten-Vorgaben des Root-Layouts werden in ein gemeinsames Modul gezogen und von beiden Layouts genutzt (JSON-LD-Hash-Invariante). (4) Die Startklasse (Kopfskript) steht nur im Kern-Layout. (5) Dokumentation: Zusammenführen entfällt (main), am Ende von P5 werden `(bestand)` und alle Altbausteine entfernt.

## E-016 · Slop-Basis: Umfang
- **Ziel:** belastbare Basis für Z-07 ohne 240 Agenten.
- **Wahl:** Hart über alle Dateien per `statisch.mjs` (479), weich (a) über alle Dateien per `statisch.mjs` (1.383) und (b) per Slop-Jäger + Opus-Gegenprüfer auf einer festen Stichprobe: 7 Hauptseiten (74, MESSUNGEN) + je Vorlage zwei Seiten (P3-00, ≈ 22 Seiten). Die Abnahme vergleicht dieselbe Stichprobe vorher/nachher; am Ende zusätzlich Slop-Jäger über die Grundmenge in allen Ansichten (Z-07).
- **Umkehrprobe:** Stichprobe ist fest in `belege/p0-slop-args.json` und folgender Datei; erweiterbar.
