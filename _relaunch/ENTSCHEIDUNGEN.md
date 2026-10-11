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
- **Wahl: (1).** Nach E-015: Die Kern-Schale enthält keinen Nachlaufcursor; im Bestand entfällt er mit dem Aufräumen in W10 (Bestand bleibt bis dahin eingefroren); verwaiste Hülle `src/components/common/WaterCursor.tsx` gleich mit.
- **Umkehrprobe:** Revert des P4-Pakets.
- **Folgen zweiter Ordnung:** Lauf 2 darf einen markenbezogenen WebGL-/Canvas-Moment prüfen (A2 C) – nicht als Cursor.

## E-012 · Denkprotokoll: WhatsApp-Widget
- **Ziel:** Funktion F-10 unverändert (Ziel-URL, vorbelegter, seitenbezogener Text, Ereignis `whatsapp_click`), Form nach KERN, keine Überdeckung von Formularen (Jury P0), keine manipulativen Muster.
- **Bestand:** `FloatingWhatsAppWidget.tsx` (780 Zeilen) mit Wurfphysik (`widgetPhysicsCoordinator`), Tooltip, Benachrichtigungs-Badge „1“ für 30 s (vorgetäuschte Nachricht), dazu MobileBottomBar mit WhatsApp.
- **Wege:** (1) mobil entfällt das schwebende Widget, WhatsApp liegt in der unteren Leiste; Desktop ein flacher, rechteckiger Knopf rechts unten im Formsystem, ohne Badge und ohne Physik. (2) überall schwebend, nur neu gestaltet. (3) Widget ganz entfernen, nur Leiste und Kopf.
- **Bewertung:** (2) behält die Mehrfachüberlagerung mobil. (3) verliert am Desktop einen sichtbaren Kanal (Bestand). (1) erhält jeden Kanal und beseitigt die Überdeckung. Das Badge „1“ täuscht eine Nachricht vor → manipulatives Muster, entfällt (Leitplanke Rang 1).
- **Wahl: (1)** in der Kern-Schale (P3-07). Seitenbezogene Texte und das Analyse-Ereignis bleiben wörtlich. Das vorgetäuschte Abzeichen „1“ entfällt im Bestand sofort (P3-00k, Rang 1).
- **Umkehrprobe:** Revert; Funktionstest F-10 sichert beide Wege.
- **Folgen zweiter Ordnung:** `widgetPhysicsCoordinator` wird nur noch vom Banner genutzt → mit E-013 entfällt er ganz.

## E-013 · Denkprotokoll: Einwilligungsbanner
- **Ziel:** Inhalt, Reihenfolge und Gleichwertigkeit der Knöpfe unverändert (F-11), Form nach KERN, verdeckt nie die Hauptaktion des ersten Bildschirms.
- **Wege:** (1) Schriftfeld-Form: Desktop links unten ≤ 28rem, mobil unten über der Leiste, ohne Wurfphysik. (2) Modal in der Mitte. (3) schmale Leiste am oberen Rand.
- **Bewertung:** (2) blockiert Inhalte (S-07-nah) und fokussiert zwangsweise. (3) verdrängt Kopf und Achse. (1) ist nicht blockierend und im Formsystem; die Wurfphysik hat keine Aufgabe.
- **Wahl: (1)** in der Kern-Schale (P3-08). Texte und Kategorien wörtlich (Rechtstext), Fokusreihenfolge geprüft; Bestand unverändert bis zu seiner Freischaltung.
- **Umkehrprobe:** Revert; F-11 sichert das Verhalten.
- **Folgen zweiter Ordnung:** Das Einwilligungsverhalten selbst (Speicherung, Kategorien, Zeitpunkt) bleibt unberührt (G9); Prüfpunkte dazu stehen neutral in MENSCHEN.md.

## E-014 · Vorab angekreuzte Einwilligung im Preisrechner
- **Befund:** Die Einwilligungs-Checkbox im PricingCalculator startet angekreuzt (`useState(true)`). Eine vorab erteilte Einwilligung ist kein freiwilliges, bewusstes Ja (Fairness-Leitplanke, Rang 1 vor Bestand).
- **Wahl:** Startwert `false` – im Bestand sofort (P3-00k, Rang 1 vor Bestand, P2-GEG-02 N-14) und in der Kern-Darstellung (P3-13); Logik der Übermittlung unverändert. **Folge für Z-04:** ein Klick mehr in der Aufgabe „Anfrage stellen“ über den Preisrechner – begründete Abweichung, im Probeläufer-Vergleich ausgewiesen. Prüfhinweis an den Auftraggeber in MENSCHEN.md.
- **Umkehrprobe:** ein Wert im Revert.

## E-015 · Denkprotokoll: Bauweise und Freischaltung (ersetzt den „globalen Umstieg“ in P4)
- **Ziel:** (1) nie ein halbfertiger oder gemischter Stand live – jede Seite ist live ganz alt oder ganz neu; (2) trotzdem nach jeder Welle pushen (E-000), damit nichts verloren geht; (3) kein globales Umfärben ungeprüfter Seiten (P2-GEG-01 Befund 2: ≈ 4.600 Klassenstellen über `tokens.css`-Umdeutungen); (4) neue Seiten laden nur die neuen Schriften und das neue CSS.
- **Wege:**
  1. *Plan Runde 1:* P3 additiv auf `/`, P4 globaler Umstieg (Tokens, Schriften, Schale für alle), P5 Körper je Cluster. → Mischstände live (neue `/` unter altem Kopf; neue Schale über orangen Körpern auf 113 Seiten), großes Umfärbe-Risiko.
  2. *Schale per Pfad wählen* (Client-Weiche mit `usePathname`, beide Schalen im RSC-Paket aller Seiten) + Schalter je Phase. → doppelte Schale in jeder Seite, alle vier Schriftfamilien überall, Weiche im Client.
  3. *Zwei Routen-Gruppen mit je eigenem Root-Layout:* `src/app/(bestand)/` (heutiges Layout unverändert: Schale, Inter/Jakarta, `globals.css`) und `src/app/(kern)/` (neues Layout: Kern-Schale, Archivo/Plex, eigenes CSS `kern-global.css` mit `@source` nur auf Kern-Code). Neue Seiten entstehen ruhend im privaten Ordner `src/app/(kern)/_entwurf/<route>/` (Unterstrich = nicht geroutet), werden typgeprüft, gelintet und gepusht, sind aber nicht erreichbar und nicht gebaut (private Ordner kompiliert Next nur bei Import) – gebaut und angesehen werden sie im Vorschau-Kandidaten (Plan Runde 3, N-03). **Freischaltung** einer Seite oder eines Clusters = ein Commit, der `_entwurf/<route>` nach `(kern)/<route>` verschiebt und `(bestand)/<route>` entfernt. Getestet wird vorher der **Kandidat**: Reinraum-Kopie + dasselbe Freischalt-Skript (`werkzeuge/freischalten.sh`), also Byte für Byte der spätere Live-Stand. 404 für unbekannte Adressen über `app/global-not-found.tsx` (experimentell, `experimental.globalNotFound`), das die Bestands-Schale rendert, bis die letzte Seite umgezogen ist.
- **Bewertung:** (3) erfüllt alle vier Ziele: Seiten sind live nie gemischt; Wellen pushen ruhenden Code; alte Seiten behalten ihr CSS unverändert (`globals.css` bekommt nur `@source not` für Kern-Ordner, damit ihr CSS byte-gleich bleibt), neue Seiten tragen nur Kern-CSS und zwei Schriften; framer-motion, lucide, `tokens.css`, Inter/Jakarta und die alte Schale fallen am Ende mit dem letzten Bestandsnutzer weg (E-009/E-010 vereinfacht, P2-GEG-01 Befund 10 erledigt). Nachteil: Wechsel zwischen alter und neuer Seite lädt die Seite voll neu (verschiedene Root-Layouts) – nur in der Übergangszeit, unkritisch. Risiko: `global-not-found` ist experimentell → Kandidat-Prüfung mit Status 404 und Funktionstest F-17; Rückfall: Weg 2 nur für die 404.
- **Wahl: (3).** Ablauf je Phase: ruhende Wellen → Kandidat-Tor (vollständig) → Freischalt-Commit → Push → Live-Rauchtest. Der Umzug des Bestands nach `(bestand)` ist ein eigener, inhaltsneutraler Schritt (P3-00): HTML aller 172 Dateien normalisiert identisch, Pixel 0.
- **Umkehrprobe:** Revert des Freischalt-Commits stellt die Bestandsseite wieder her (sie liegt bis zum Aufräumen am Phasenende in der Historie und im Kandidat-Vergleich). Der Umzug selbst ist per Revert umkehrbar.
- **Folgen zweiter Ordnung:** (1) P4 heißt nun „Fundament“ ohne globalen Umstieg: vollständige Kern-Bausteine, Vorlagen, Verlegepläne, Icons, Wege (308/410) – die Freischaltungen geschehen clusterweise in P5. (2) Interne Links zwischen alten und neuen Seiten bleiben gleich (URLs unverändert). (3) Metadaten-Vorgaben des Root-Layouts werden in ein gemeinsames Modul gezogen und von beiden Layouts genutzt (JSON-LD-Hash-Invariante). (4) Die Startklasse (Kopfskript) steht nur im Kern-Layout. (5) Dokumentation: Zusammenführen entfällt (main), am Ende von P5 werden `(bestand)` und alle Altbausteine entfernt.

## E-016 · Slop-Basis: Umfang
- **Ziel:** belastbare Basis für Z-07 ohne 240 Agenten.
- **Wahl:** Hart über alle Dateien per `statisch.mjs` (479), weich (a) über alle Dateien per `statisch.mjs` (1.383) und (b) per Slop-Jäger + Opus-Gegenprüfer auf einer festen Stichprobe: 7 Hauptseiten (74, MESSUNGEN; ≤ 30 Ausschnitte) + je Vorlage eine Seite (P3-00, 12 Seiten, je 16 Ausschnitte über 4 Ansichten; Liste `belege/p0-stichprobe-slop-args.json`). Begründung der Verkleinerung: Opus-Kontingent (P2-GEG-01 Befund 14/C-11). Die Abnahme vergleicht dieselbe Stichprobe vorher/nachher; am Ende zusätzlich Slop-Jäger über die Grundmenge in allen Ansichten (Z-07).
- **Umkehrprobe:** Stichprobe ist fest in `belege/p0-slop-args.json` und folgender Datei; erweiterbar.

## E-017 · Denkprotokoll: Tore unter E-015 (P2-GEG-02 N-01, N-09)
- **Ziel:** Tore, die (1) ruhenden Code als ruhend beweisen, (2) eine Freischaltung nur zulassen, wenn nichts schlechter wird, (3) die Zielwerte des Auftrags an den Phasentoren prüfen, ohne dass eine schwer erreichbare Zielmarke (Jury ≥ 8,0, Kategorie Inhalt ohne Fotos) jede Freischaltung blockiert.
- **Wege:** (1) ein Tor für alles (Kandidat-Tor mit Zielwerten) → jede Freischaltung hängt an Z-08 und blockiert den Pfad (L3: drei Anläufe). (2) nur Wellen-Tor + Phasentor → Freischaltungen ohne Prüfung der betroffenen Seiten. (3) **drei Stufen:** T1 Wellen-Tor (build-vergleich gegen Live: HTML 172 + CSS gleich ⇒ ruhend bewiesen), T2 Kandidat-Tor mit Freischalt-Schwelle (Ränge 1–4 grün, nichts schlechter als Bestand, Jury ≥ Bestand + 2,0), T3 Phasentor mit allen Zielwerten und L3.
- **Wahl: (3).** P4-Tor (AUFTRAG: Z-05, Z-11, Z-13 auf den Hauptseiten) wird über die Vorschau-Kandidaten der Hauptseiten-Entwürfe geprüft (W1-01, W2-01, W3-01, W6-01, W8-01, W9-01 werden dafür in P4 als Entwurf vorgezogen); live schalten sie erst in ihrer Welle frei.
- **Umkehrprobe:** Schwelle und Ziel sind getrennt dokumentiert; wird eine Seite mit Freischalt-Schwelle live und verfehlt später das Ziel, bleibt sie Paket bis zum Phasentor (L7).
- **Folgen zweiter Ordnung:** Z-08 kann nach L7 AUSNAHME werden, ohne dass der Bestand länger live bleibt; die Freischaltungen verbessern den Live-Stand schrittweise.

### E-015 · Nachtrag: Erprobung 2 (P3-00o, 10.10.2026) – bestanden
Wegwerf-Baum = Umzug + Minimal-`(kern)` (Layout mit Archivo/Plex, Kopfskript, BewegungsRegie; statische und dynamische Probe-Route mit `notFound()`; Entwurf mit eigener Klasse). Belege `belege/e015-erprobung2/`.
- Bestand: HTML 172/172 normalisiert gleich (`build-vergleich.json`), Bestands-CSS ohne Kern- und Probeklassen.
- Kern-CSS: Einstieg **`src/styles/kern-global.css`** mit `@source "../app/(kern)"` und `@source not "../app/(kern)/_entwurf"` greift (Probeklasse drin, Entwurfsklasse nicht). Eine Kern-CSS-Datei liegt **in** `(kern)/` mit `@source "./"` hat nicht gegriffen; maskierte Klammern (`\(kern\)`) und `?kern?` ebenfalls nicht → Einstieg liegt unter `src/styles/`.
- Status (`status.txt`): unbekannte Adressen 404 mit Bestands-Schale (`global-not-found`), `notFound()` in Bestand und Kern 404, Kern-404 rendert `(kern)/not-found.tsx`; Wechsel Kern → Bestand (Next-Link, volle Neuladung) und zurück ohne Konsolenfehler; Startklasse und Sichtauslöser greifen.
- **Abweichung (befristet bis W10):** `global-not-found` wird von Next in jede Route eingehängt; dadurch lädt eine Kern-Seite zusätzlich Inter und Jakarta vor (4 statt 2 Schriftdateien, `schriften-manifest.json`). Ohne `global-not-found` sind es 2, mit Schriftaufrufen nur in der 404 ebenfalls 4 (geprüft). JavaScript unverändert (173 KB gzip mit und ohne). Gegenweg (Fang-Route `[...unbekannt]`) wäre schlechter: die 404 unbekannter Adressen käme ohne Server-HTML (leer ohne JavaScript). → Hinnehmen bis W10-02 (Kern-404 global, Bestands-Schriften entfallen); Lighthouse im T2 weist den Effekt aus; K-005 vermerkt die Ausnahme.

## E-018 · Messregeln für Bewegung und Barrierefreiheit (Rückfragen P3-00a, P3-00c)
- **Frames (Z-09):** Soll nur mobil bei 4× CPU-Drosselung (AUFTRAG Ebene 4). „Verworfen“ = Frame-Intervall > 25 ms (mehr als 1,5 vsync, mindestens ein verpasster Frame). Desktop-Frames nur als Information (Headless ohne GPU).
- **Interaktions-Bewegungen** (`sig-plan`, `zustand`, `druck`, `aufklappen`): `bewegung.mjs` löst Hover, Fokus und Klick auf Elementen mit diesen Kennungen aus – Erweiterung in P3-14d, sobald Kern-Elemente existieren.
- **Harte Kennzahlen Z-11:** Fokus nicht sichtbar · Fokusring < 3:1 oder < 2 px („dünn“; KERN K-006 verlangt 2 px und 3:1) · Fokus durch feste Ebene verdeckt (WCAG 2.4.11) · Tastaturfalle · Reihenfolge-Sprünge · Sprunglink · Reflow 320 · Textabstände: abgeschnitten (auch `line-clamp`, außer der volle Text ist über einen benannten Link erreichbar) · forced-colors ohne Grenze · ohne JS. **Nur Information:** Zoom per CSS-Emulation (ungenau), Ring teilverdeckt am Bildrand.
- **Einwilligungsbanner:** Inhalt, Kategorien und gleichwertige Knöpfe unantastbar, Form nicht (E-013). Die 426 Fokus-Verdeckungen durch den Banner (m375, Erstbesuch) sind ein Befund des Bestands; die Kern-Schale (P3-08) muss sie auf null bringen.
- Basiswerte stehen in MESSUNGEN (Ebene 4/5 Ergänzung); Frames werden im ruhigen Messfenster nachgemessen (Last bei der Basis 6–16 auf 4 CPUs).

## E-019 · Zählregeln der Probeläufe (Rückfragen P3-00g)
- **Einwilligungsbanner:** Der Probeläufer schließt den Banner nur, wenn er die nächste Handlung verdeckt oder blockiert – wie ein Besucher; jede dafür nötige Handlung zählt als Schritt (Tastatur: alle Tabs bis zum Knopf). Die 190 Tabs bis zum Banner im Bestand sind ein echter Reibungsbefund (Banner steht am Ende der Tab-Reihenfolge) und bleiben im Bezugswert.
- **Mobil:** Bezugswert ist der realistische beste Weg einschließlich `wische` (Aufgabe 4: 8 Schritte statt 10 senkrecht).
- **Antworten:** Aufgabe 2 gilt als gelöst, wenn der Läufer eine Angabe zur Bestandsdauer findet („seit 2008“ oder „über N Jahre“) und eine Bewertungsangabe; widersprüchliche Angaben sind ein Befund (Inhalt, MENSCHEN M-03), keine Lösungsfrage.
- Läufe unter Lastspitzen mit „Werkzeug:“-Abbruch werden wiederholt, nicht gezählt. Die Matrix der Basis (15 Läufe) erhebt ein Haiku-Probeläufer im ruhigen Fenster; Ablage `belege/p0-ausgangsstand/probelauf/` durch den Orchestrator.

## E-020 · Widerruf der Einwilligung im Kern: Fußlink statt schwebendem Schild
- **Befund (Vorschau 1323c32-v):** Der Kern-Banner (P3-08) übernahm das schwebende Schild des Bestands als festen Knopf unten links. Neben Kopf und unterer Leiste wäre das eine dritte feste Ebene (KERN K-003 Prinzip 7, K-011).
- **Wege:**
  1. Schild behalten. Dann gibt es mobil zwei feste Ebenen unten, und Inhalte werden überdeckt.
  2. Schild in die untere Leiste legen. Dann hat die Leiste vier Felder; Anrufen, WhatsApp und Anfrage werden schmaler (Touch-Ziele).
  3. Widerruf über den Link „Cookie-Einstellungen“ (`#cookie-settings`) im Fuß jeder Seite (P3-07) und auf der Datenschutzseite.
- **Bewertung:** (3) erhält die Funktion „Widerruf jederzeit“ (F-11) auf jeder Seite, ohne feste Ebene. Die Einwilligungslogik bleibt unberührt (G9); `#cookie-settings` öffnet die Einstellungen mit dem aktuellen Stand.
- **Wahl: (3).** Der Test „Schild öffnet die Einstellungen“ wird im Testschreiber-Paket P3-14c auf den Fußlink umgestellt; Fälle und `expect` bleiben gleich viele. Prüfhinweis an den Auftraggeber: MENSCHEN M-18.
- **Umkehrprobe:** Schild wieder einhängen (Hook liefert `handleShieldClick` unverändert).

## E-021 · Servicegebiet auf `/` im Kern: Städteregister + Karte nach Einwilligung, ohne Radar und Kartenumschalter
- **Bestand:** `InteractiveServiceMap` mit Radar-Ansicht (Animation), Umschalter Radar/OpenStreetMap/Google-JS-Karte und Stadtwahl auf der Karte. Alles hinter dem Zwei-Klick-Platzhalter.
- **Ziel:** Besucheraufgabe 4 „Eigenen Ort prüfen“ (K-002) und F-12 bleiben erhalten. Die Gestaltungsmerkmale folgen KERN.
- **Wege:**
  1. Alles nachbauen. Das wäre eine Kopie der Bestands-Logik und der Google-Bibliothek, dazu eine Radar-Bewegung ohne Registereintrag.
  2. Städteregister mit Links zu den Standortseiten plus OSM-Karte des Bestands nach Einwilligung, ohne Radar und Umschalter.
  3. Karte ganz streichen. Das verlöre F-12 auf `/`.
- **Bewertung:** (2) löst die Aufgabe ohne Karte: jede Stadt als Link mit Entfernung ab Aßlar, die Karte nur nach Einwilligung. Das Radar hat keine Aufgabe und keinen Registereintrag (S-09-nah). Der Umschalter verdoppelt die Fremdanfragen.
- **Wahl: (2)** (P3-12). Die Entfernungen werden ab dem Firmensitz Aßlar angezeigt (`CITY_HUB_DATA`). Im Bestand standen sie ab Wetzlar, aber als Abstand zum Firmensitz bezeichnet; das ist eine Wahrheitskorrektur. Die Stadtwahl auf der Karte prüft W3 (`/standorte`) erneut.
- **Umkehrprobe:** Revert. Der Bestand bleibt bis zur Freischaltung unverändert.

## E-022 · Variantenwahl Kopf (P3-06) und Einstieg (P3-09) – Jury 3 × Opus, Bildmaterial (Belege `belege/p3-varianten/`)
| Juror (Schwerpunkt) | Kopf A | Kopf B | Einstieg A | Einstieg B | Wahl |
|---|---|---|---|---|---|
| 1 Gestaltung | 36 | 42 | 45 | 42 | Kopf B · Einstieg B (unter Auflagen) |
| 2 Nutzerführung, Barrierefreiheit | 41 | 47 | 45 | 42 | Kopf B · Einstieg A |
| 3 Marke, Handwerk | 40 | 36 | 36 | 48 | Kopf A (unter Auflagen) · Einstieg B |

- **Denkprotokoll:**
  - **Kopf:** B gewinnt 2 : 1. Es fluchtet an der Inhaltskante, ist mobil sauber (A läuft auf 396 px über) und ruhiger. Die Stärke von A, Felder mit 1-px-Fugen, wird als Auflage in B übernommen.
  - **Einstieg:** B gewinnt 2 : 1. Nur B besteht die Austauschprobe K-001, mit dem gezeichneten Verlegeplan und dem Kreuzpunkt auf dem Plan. Die Mängel von B liegen in der Anordnung und sind behebbar; bei A fehlt die eigene Bildwelt grundsätzlich.
  - A bleibt die Rückfallwahl, falls die Auflagen nicht erfüllt werden.
- **Wahl: Kopf B + Einstieg B**, mit diesen Auflagen vor der Freischaltung:
  - **Kopf B:**
    1. Zonen (Marke | Navigation | Telefon + Knopf) mit 1-px-Fugen, Kanten auf der Inhaltsflucht (`--k-seite`/`--k-rand`), keine leeren Felder.
    2. Hauptpunkte mindestens `text-k-2`, Knopf „Aufmaß anfragen“ mindestens 44 px hoch.
    3. Geöffnetes Mega-Blatt fotografisch belegen, ebenso den Tastaturweg.
  - **Einstieg B:**
    1. Das Formular steht in einem eigenen Feld an einer Fuge des Plans, ohne die Zeichnung zu überdecken. Seine Oberkante liegt bei 1440 × 900 im ersten Bildschirm, einschließlich des Kopfs.
    2. Mobil gilt die Reihenfolge Kennzeile → H1 → Unterzeile → Absatz → „Aufmaß vor Ort anfragen“ → Plan vollständig (nicht angeschnitten) → Formular. Das Lot läuft über die volle Höhe.
    3. Die Unterzeile wird nicht gestaucht.
    4. „DIN 18534“ in Mono ohne breite Wortlücken.
    5. Der Einstieg trägt `data-hauptaktion`, damit der WhatsApp-Kanal ihn nie überdeckt (K-011, E-013).
- **Umkehrprobe:** Variante A liegt im Repo (`kopf-a`, `einstieg-a`), ein Import tauscht sie zurück. Nicht gewählte Varianten werden in W10 mit knip entfernt.

## E-013 · Nachtrag (11.10.2026, Vorschau 77ef851-v): „verdeckt nie die Hauptaktion“ – Auslegung
- **Befund:** Beim Erstbesuch am Desktop (1440 × 900) liegt der Banner links unten (≤ 28rem) über den Knöpfen des Einstiegs, „Aufmaß vor Ort anfragen“ und WhatsApp. Frei bleiben der Knopf „Aufmaß anfragen“ im Kopf, das Hero-Formular ab seiner Überschrift und die H1 (LCP). Mobil liegt der Banner über dem Absatz, und die untere Leiste mit „Aufmaß“ bleibt frei.
- **Wege:**
  1. Banner rechts: verdeckt das Formular.
  2. Banner oben: verdeckt die H1, also das LCP-Element.
  3. Banner im Fluss: verschiebt die Seite nach dem Laden (CLS).
  4. Links unten wie gebaut.
- **Wahl: (4).** Ausgelegt heißt die Regel: In jeder Ansicht bleibt mindestens ein vollständiger Anfrageweg frei sichtbar und bedienbar (Kopf-Knopf + Formular am Desktop, untere Leiste mobil). Der Banner deckt höchstens Zweitwege ab. Er ist nicht blockierend (`aria-modal="false"`) und mit einer gleichwertigen Wahl sofort weg.
- **Prüfung:** Probeläufer-Aufgabe 3 (Anfrage) am Kandidaten mit Einwilligung „erstbesuch“ – Schrittzahl ≤ Bezugswert, kein Befund „verdeckt durch …“ auf dem Weg.

## E-023 · Kandidat-Tor `/` (P3-16): Probeläufe per Gegenprobe, Tastatur-Abweichung, Korrekturen aus den Messungen
- **Befund:** Der freie Probelauf am Kandidaten (P3-16b, Haiku) lag in 7 von 15 Läufen über dem Bezugswert. Probeläufer wählen frei, Wege und Banner-Entscheidungen streuen.
- **Weg zur Trennung:** Die Eingaben des Ausgangsstands werden unverändert am Kandidaten nachgespielt (Satz `gegenprobe-*`, PROBELAUF §3), je mindestens zweimal und, wo nötig, auch an der Basis. Nur Unterschiede, die sich auf demselben Weg wiederholen, gelten als Wirkung des Kandidaten.
- **Ergebnis:**
  - Echt und behoben waren drei Unterschiede:
    1. Im Mobilmenü lagen Links aufgeklappter Gruppen unter dem Blattrand. Der Bereich rückt jetzt an den Rand.
    2. Im Hero-Formular lag das Namensfeld am Desktop unter dem ersten Bildschirm (y 998 bei 900). Die Kontaktfelder stehen jetzt vor der Projektauswahl, die Legende ohne „1.“ steht in MIKROTEXTE.
    3. Aufgabe 5 mobil: Mit den Kern-Menünamen ist der Weg gleich lang.
  - Messrauschen war a3-m375-touch: Die Basis selbst schwankt auf demselben Weg zwischen 12 und 15 Schritten.
  - Endstand bcd8fcb-k: a2/a4 Touch 4/8, a3 Maus 5, a5 Touch 10, a3 Touch 12. Alle sind gleich der Basis.
- **Abweichung mit Begründung:** a1-d1440-tastatur 26 statt 23, a5-d1440-tastatur 117 statt 114.
  - Ursache: Von der Kern-Seite `/` auf eine Bestandsseite wird das Dokument voll geladen (andere Wurzel-Layouts), der Fokus beginnt dort korrekt am Dokumentanfang, also +3 Tabs bis zum Untermenü.
  - Der Bezugswert entsteht im Bestand durch den clientseitigen Wechsel (Next-Standard: Fokus bleibt am aktivierten Link); die Basis-Matrix führt dieses Verhalten als Befund „hoch“ (a5, 87 Tabs). Berichtigt nach P3-16-GEG M-3: Ursache des +3 ist der volle Neuladevorgang nach E-015, nicht ein Fehler des Kerns.
  - Folge: kein Rückbau. Die Zahl wird in der Welle der Zielseite (W1 `/bad`) mit der Fokusführung des Kerns neu gemessen. Bis dahin steht sie als offene Abweichung in ABNAHME Z-04.
- **Weitere Korrekturen in diesem Tor:**
  - **Jury, alle drei:** Der WhatsApp-Kanal weicht jetzt allen Bedienelementen aus (FREIHALTEN um Links, Knöpfe, Beschriftungen, `summary`). Das Großformat-Bild füllt seine Zelle.
  - **INP „Menü öffnen“ mobil:** vorher 248 ms gegen 104 ms Basis.
    - Ursache war Stilarbeit, kein JavaScript: die `:has(:is([open],:popover-open,:open))`-Regeln der verworfenen Variante A.
    - Die Varianten A (Kopf, Einstieg) sind deshalb schon jetzt entfernt statt erst in W10 (Umkehrprobe E-022: Rückweg über git).
    - Dazu `content-visibility: hidden` für zugeklappte Bereiche und `memo` für das Mobilblatt.
    - Endstand: 48 ms (Basis 96).
  - **Barrierefreiheit (P3-16a):** Alle harten Kennzahlen bis auf „dünn“ stehen auf 0. „dünn“ = 1: Ring des Stimmen-Bereichs bei offenem Banner mobil, 0,98 · U statt 1,5 · U, also rund die Hälfte der Ringpixel unter dem Banner (berichtigt nach P3-16-GEG M-1; Regel E-018 Nachtrag; Bestand 44).
- **Prüfung:** Frischer Gegenprüfer P3-16-GEG über das Tor (ERGEBNIS `belege/t2-bcd8fcb/ERGEBNIS.md`).

### E-018 · Nachtrag (11.10.2026, P3-16-GEG M-1): Fokusring teilweise unter dem nicht-modalen Einwilligungsbanner
- **Befund:** Kandidat `/`, m375, Erstbesuch, Element nr 81 (Bereich des Stimmen-Karussells, 420 px hoch, Fokusring 2 px).
  - Gemessen sind 1492 Kontrastpixel bei einem Umfang U = 1526, also 0,98 · U; „ok“ verlangt 1,5 · U (2-px-Ring ≈ 2 · U).
  - Damit fehlt rund die Hälfte der erwarteten Ringpixel. Die frühere Angabe „2 %“ in ERGEBNIS/E-023 war falsch.
  - Grund laut Werkzeug: `ring-unter-fester-ebene`. Der Banner belegt mobil 375 px; das Element ist höher als die freie Fläche zwischen Kopf und Banner, Ober- und Unterkante liegen unter fester Ebene.
  - Ohne Banner (`abgelehnt`) misst dasselbe Element „ok“, die Mitte ist frei (`fokus_verdeckt_fest` 0, WCAG 2.4.11 erfüllt).
- **Regel:** Ein Ring, der nur deshalb teilweise verdeckt ist, weil der nicht-modale Banner offen steht und das Element höher ist als die freie Fläche, zählt wie „Ring teilverdeckt (fest)“ als Information. Hart bleibt „dünn“, wenn derselbe Ring ohne Banner dünn ist.
- **Umkehrprobe:** Wird der Banner modal oder deckt er die Mitte eines Fokusziels, greift wieder die harte Kennzahl „verdeckt“. Bestand: 44 „dünn“, 130 „verdeckt fest“.

## E-024 · TBT mobil `/` über Budget bei besserer Leistung insgesamt (P3-16-GEG M-4)
- **Befund:**
  - Kandidat bcd8fcb-k, Median aus 5 verschränkten Läufen: Lighthouse mobil 84 gegen 84, LCP −7,8 %, TBT 224 gegen 140 ms (Budget 200), CLS 0.
  - Versuch mit Suspense-Grenzen (b341543-k, 10 Läufe: 87 gegen 85, TBT 226 gegen 148) **verworfen**: Der Prerender von Next legt den Inhalt der Grenzen in verborgene `<div hidden id="S:n">` und zeigt ihn erst per Skript (`$RC`). Ohne JavaScript war alles unter dem Einstieg unsichtbar (a11y-zusatz „ohne JS“: Text < 80 %). Die Grenzen sind wieder entfernt.
  - Lange Aufgaben: die Hydrierung (~160 ms bei 4×) und eine anfängliche Stil- und Layoutaufgabe (~130 ms).
  - INP: alle sechs Interaktionen deutlich unter Basis und Budget (max 64 ms).
- **Wege:**
  1. Freischaltung zurückhalten, bis TBT ≤ 200 ms.
  2. Freischalten mit Arbeitsauftrag; K-013 definiert „schlechter als der Bestand“ über Punkte (> 3) und LCP (> 10 %), beide besser.
  3. Bewegung oder Formulare unter dem ersten Bildschirm erst bei Sicht hydrieren (größerer Umbau, eigenes Paket).
- **Wahl: (2) mit Auftrag (3) in P4.**
  - Grund: Für Besucher ist der Kandidat schneller (LCP, INP) und nicht schlechter in den Punkten. TBT ist ein Laborwert ohne Interaktion; der Wert sank durch das Entfernen der Variante-A-Regeln von 332 auf 224 ms.
  - Das Budget bleibt Ziel für das P4-Tor (ABNAHME „Offene Abweichungen“).
- **Umkehrprobe:** Steigt TBT in einer späteren Welle weiter oder fällt der Punktwert unter den Bestand, greift (1).

## E-025 · Wege alter Adressen (P4-07, V-04, Z-06)
- **Ziel:** Alte Adressen enden nicht mehr im gewöhnlichen 404. Umbenannte Tezgel-Seiten leiten dauerhaft weiter, Adressen der Vorgängerfirma melden „dauerhaft entfernt“, damit Suchmaschinen sie schneller vergessen.
- **308 (`redirects()` in `next.config.ts`):**
  - `/bad/budgetkalkulator` → `/bad/projekt-check` (Umbenennung, Stand 757d8a9~1).
  - `/blog/barrierefreies-bad-planung-zuschuesse` → `/bad/barrierefreies-bad` (einziger Altbeitrag mit Fliesen-/Badthema; die Fachseite deckt das Thema ab).
- **410 (`src/proxy.ts`):**
  - Ganze Bereiche: `/energie`, `/energieberatung`, `/gewerbe`, `/haustechnik`, `/heizung`, `/lueftung`, `/notdienst`, jeweils samt Unterseiten.
  - Einzeladressen: 12 Altbeiträge im Blog und `/referenzen/project-001` bis `-006`.
  - Beleg: Seitendateien sowie `src/config/posts.js` und `projects.js` im Stand 757d8a9~1. Alle übrigen dynamischen Adressen (Städte, Leistungen, Musterbäder) sind gleich geblieben.
- **Warum ein Proxy:** `redirects()` kennt nur 307/308. Eigene Routen-Handler für 410 kollidieren mit `blog/[slug]` und `referenzen/[id]`.
  - Der `matcher` nennt nur diese Adressen. Die Funktion prüft zusätzlich exakt, weil ein Muster auch längere Pfade treffen kann.
  - Seiten, `_next`, Bilder und `/api` laufen nie durch den Proxy. Beleg: `wege.mjs` gegen die kompilierten matcher des Builds.
- **Antwortseite:**
  - Kleines eigenes Dokument ohne Skripte, mit Systemfarben und Systemschriften. Der Proxy kennt die gebauten CSS-Dateien nicht, und Markenwerte im Code wären freie Werte.
  - `noindex`, Wortlaut nach der 404: „Fliesenverlegung Tezgel · Fehler 410 · Seite dauerhaft entfernt · Die von Ihnen aufgerufene Seite gibt es nicht mehr. Kehren Sie zur Startseite zurück oder informieren Sie sich über unsere Fachleistungen.“ Dazu die Links „Zur Startseite“ und „Zur Leistungsübersicht“ (Mikrotexte, neue Seite).
- **Umkehrprobe:**
  - Liefert Search Console (MENSCHEN) Adressen der früheren tezgel.de, kommen sie als 308 auf die passende Seite dazu.
  - Wird eine Altadresse wieder zu einer echten Seite, schlägt `test/wege.test.mjs` an (Seite trifft Liste).

## E-026 · Icon-Vollsatz im Kern-Layout (P4-04, offene Frage 1)
- **Frage:** Rendert das Kern-Layout den ganzen Satz (34 Familienzeichen + WhatsApp) oder nur den Grundsatz? Mit dem Grundsatz bliebe `/` byte-gleich; Seiten mit Fachzeichen bräuchten dann ein eigenes Zusatz-Sprite.
- **Wahl: ganzer Satz.**
  - +3,1 KB roh, +373 B gzip je Kern-Seite; das Sprite hat dann 1,9 KB gzip. Unsichtbar (`aria-hidden`), ohne Text und ohne Fokus.
  - Grund: Ein vergessenes Zusatz-Sprite ergäbe leere Icons ohne Fehlermeldung. Zwei Sprites mit demselben Namen ergäben doppelte IDs. Beides fällt bei je einem Sprite pro Seite weg.
  - Die Zusatzlast ist gegen LCP und TBT bedeutungslos: Inline-SVG wird geparst, aber erst bei `use` gezeichnet.
- **Folge für `/` (live):**
  - P4-04 ändert das HTML von `/` und der Kern-404 nur im Sprite-Block.
  - Nachweis per build-vergleich mit herausgenommenem Sprite-Block (Rest gleich) und Pixelvergleich `/` in 4 Ansichten. Das ist sofort wirksam, also T2 im kleinen Umfang.
- **Offene Fragen 2–4 der Rückgabe:**
  - (2) Zeichen, die auf einer Fachseite etwas anderes bedeuten (z. B. `Thermometer` als Messung, `ShieldCheck` als Siegel), entscheidet die Welle der Seite; Vorgabe „kein Icon“.
  - (3) Teilen-Knöpfe mit Facebook, LinkedIn und X entscheidet W6 (Blog). Vorgabe: `teilen` (Web Share) und „Link kopieren“, keine Fremdlogos.
  - (4) Fugenkreuz bleibt eigenes Inline-SVG (P3-03).
- **Umkehrprobe:** Wächst der Satz über 60 Zeichen oder das Sprite über 4 KB gzip, gilt die Seitenauswahl (`namen`) mit einer Prüfung „jedes `use` hat ein Ziel“ (`svg.mjs`).

## E-027 · Abnahme P4-01 bis P4-05c: Antworten auf die offenen Fragen, Vorschau-Befunde, Kalender
- **Vorschau a361e9c-v** (Fotos in 3 Ansichten, `wortbruch.mjs`):
  - Pläne (P4-03), Icon-Tafel (P4-04) und die Übersichtslisten (P4-02) tragen die Leitidee.
  - 89 Wortbrüche ohne Trennstrich in Überschriften, Werten und Kacheln.
  - Formular-Raster hängen an der Fensterbreite statt an der Behälterbreite.
  - Das Bild des empfohlenen Leitfadens füllt seine Spalte nicht.
  - Doppelte Teile in `fachseite/` und `uebersicht/`.
  - → P4-10a (Vorlagen) und P4-10b (Formulare).
- **Live `/`:** 8 Wortbrüche, alle im Garantie-Sockel des Fußes („Festpreisgarantie“ in Mono passte in vier Spalten in keiner Breite). Korrigiert: unter `sm` einspaltig, darüber 2 × 2 (3fa28fd, sofort wirksam → T2 mit P4-09).
- **Offene Fragen:**
  - P4-01 F1 (Schriftfeld auf Fachseiten): ja, aus vorhandenem Kern-Wortlaut (Kennzeile, Bewertung, „Kammer“). MIKROTEXTE-Zeilen der Klasse 3 kommen mit der Welle, die es nutzt.
  - P4-01 F2 (Tabellen-Etiketten ohne doppeltes DOM): ja, Regel `.k-zelle[data-spalte]::before` in `kern.css`.
  - P4-01 F3 (ein Ablauf für `/` und Fachseiten): jetzt nicht, `/` bleibt; Prüfung in P6.
  - P4-01 F4 (Anruf-Hinweis je FAQ-Antwort): erst bei Bedarf, dann nach `kern/basis`.
  - P4-01 F6 (Halbverband als Feldvariante): nein, erst nach der Jury W1.
  - P4-02 (Seitenart `/bad/musterbaeder`, `/referenzen`): es gilt `GRUNDMENGE.json`.
  - P4-02 (Hooks für F-16: Filter, Inhaltsverzeichnis, Teilen, Abstimmung): kommen mit W6 als eigenes Paket mit T2.
  - P4-03 F1–F3: W5 entscheidet mit dem Seiteninhalt; bis dahin der Plan der Leistung.
  - P4-03 F4: SIG_PLAN_AUSLOESER setzen die Vorlagen (P4-10a); die zentrale Regel `[data-motion="sig-plan"]` steht in `kern.css`.
  - P4-05a/b/c (Kern-Zweig der Tests): P4-06 baut ihn, sobald die Bad-, Fliesen- und Termin-Seiten in `KERN_SEITEN` kommen; Werkzeugregel: Fassung je Seite aus `KERN_SEITEN` (Lehre 10).
- **Kalender (P4-05c, I-19):**
  - BookingCalendar berechnet die Tage beim Rendern aus `new Date()`. Ab dem Tag nach dem Build wirft React auf `/termin` und `/kontakt` den Hydrationsfehler #418 (gemessen mit Uhr +1/+3 Tage am Live-Produkt 74e768c).
  - Das ist ein technischer Fehler, keine Geschäftslogik. Er widerspricht Z-11 („keine Hydrationsfehler“).
  - **Wahl:** beheben als eigenes Paket P4-05d. Die Tage werden erst im Browser berechnet (nach dem Einhängen); bis dahin zeigt der Kalender seinen Rahmen ohne Tage. Auswahl, Slots und Nutzlast bleiben gleich. T2 mit Uhrprobe.
  - **Umkehrprobe:** Ändert P4-05d etwas an Nutzlast oder Slotlogik, gilt G9 und das Paket wird verworfen.
- **Wunschtermin geht verloren (I-12):** Geschäftslogik (API-Prüfung, Mailvorlagen) → MENSCHEN M-19 mit Vorschlag; keine eigene Korrektur.

## E-028 · Freigaben der Hülle gelten für alle Kern-Seiten (P4-Tor, texte2 Vorschau 5913897-v)
- **Befund:** Der Textabgleich der sechs Hauptseiten-Entwürfe zeigte 68 rote Einträge.
  - 60 davon stammen von der Hülle: Kopf, Mobilblatt, Banner (P3-06, P3-08). Sie traten auf jeder Seite gleich auf und waren für `/` schon freigegeben.
  - Hinzu kommt „Treppen“: Die Kopf-Navigation fasst den Eintrag mit seiner Beschreibung zu einer Texteinheit zusammen; der Link `/treppen` bleibt (auf `/blog` 3× statt 2×).
  - Seitenspezifisch: 2 `aria-label` auf `/blog` (derselbe Wortlaut steht jetzt als sichtbare Beschriftung) und 5 Filtertexte der Karte auf `/kontakt` (E-021).
- **Wahl:**
  - Die 14 Hüllen-Zeilen in `MIKROTEXTE.md` gelten jetzt für `*` statt `/`. Die Hülle ist auf jeder Kern-Seite dieselbe; Bestandsseiten berührt das nicht, weil sich dort nichts ändert.
  - Dazu 1 Zeile `*` für „Treppen“, 2 Zeilen `/blog` (Klasse 2), 5 Zeilen `/kontakt` (Klasse 1, E-021).
- **Ergebnis:** texte2 GRÜN – 0 rot, 68 freigegeben, 785 gelb (umgestellt, neu gegliedert, hinzu, verschoben), keine neue Überschrift.
- **Umkehrprobe:** Ändert eine Welle die Hülle seitenabhängig, bekommt die Zeile wieder eine Seitenangabe.

## E-029 · P4-Tor Barrierefreiheit: Ring innen an Kanten zu Tinte, Umfang mehrzeiliger Links, WhatsApp-Kanal ohne JavaScript
- **Befund (a11y-zusatz, Vorschau 5913897-v gegen f2c4180):** Alle harten Kennzahlen sind besser als im Bestand (Fokus unsichtbar 474 → 0, verdeckt 466 → 0, Reflow 6 → 0, Textabstand 26 → 0, forced-colors 53 → 0). Offen blieben „dünn“ 10 (drei Elemente in je zwei Einwilligungszuständen) und „ohne JS: im ersten Bildschirm versteckt“ 4.
- **Kontaktblatt-Wege (`/kontakt`) und Kalendertage (Termin):** Der Ring lag außen 2 px über der Kante. Dort grenzen der Tinte-Kopf des Blatts bzw. der gewählte Tag in Tinte an, und Tinte auf Tinte zählt nicht. **Wahl:** Ring innen (`-outline-offset-4`) wie in Hauptnavigation und unterer Leiste; der gewählte Tag bekommt einen Kalk-Ring.
- **Textlink über zwei Zeilen (`/bad`, Projekt-Check):** Das Bild zeigt um jedes Zeilenstück einen vollständigen 2-px-Ring. Das Werkzeug setzte den Umfang U aber aus dem umschließenden Rechteck beider Zeilen an (Verhältnis 1,47 statt 1,5). **Wahl:** Bei `display: inline` mit mehreren Zeilenstücken ist U jetzt der Umfang der Fläche, die Chrome tatsächlich umrandet. Das ist die Vereinigung der Zeilenstücke; liegen Stücke übereinander mit höchstens 8 px Abstand, verbindet Chrome sie zu einem Umriss, und die inneren Kanten entfallen. Getrennt liegende Stücke wie beim /bad-Link behalten je einen eigenen Ring. Ein erster Ansatz (Summe aller Stück-Umfänge) zählte die inneren Kanten mit und meldete 22 Artikeltitel auf /blog fälschlich als „dünn“ (Bilder: vollständiger Umriss). Er ist ersetzt; der Rechenweg ist an drei Formen nachgerechnet. Das ist eine Messkorrektur, keine Ausnahme, und sie gilt für Basis und Vorschau gleich. Wichtig für W6, wo Links im Fließtext oft umbrechen.
- **WhatsApp-Kanal ohne JavaScript (4 Seiten, d1440):** Der Kanal startet unsichtbar und erscheint erst, wenn das Skript geprüft hat, dass er kein Bedienelement verdeckt (WCAG 2.4.11, P3-07). Ohne JavaScript ist diese Prüfung unmöglich. Im Bestand ist der Knopf ohne JavaScript zwar sichtbar, aber ein `<button>` ohne Ziel und damit tot. Der Weg zu WhatsApp steht ohne JavaScript im Fuß und in der unteren Leiste. **Wahl:** bleibt so, als begründete Abweichung. Ohne JavaScript geht keine Funktion verloren; nur ein toter Knopf entfällt.
- **Umkehrprobe:** Grenzt ein Ring an anderer Stelle an Tinte, gilt dieselbe Regel (Ring innen). Zeigt ein mehrzeiliger Link Lücken im Ring, bleibt er „dünn“: Der Umfang der umrandeten Fläche verlangt den vollen Ring um jedes Stück bzw. jeden Umriss.

## E-030 · Fünf-Sekunden-Probe: ein Bewerter für alle Antworten, Wertung vorsichtiger Antworten
- **Befund (P4-Tor, Workflow fuenf-p4):** Die Bewertungsstufe lief je Bild mit einem eigenen Opus statt, wie PROBELAUF §8 verlangt, mit einem Bewerter über alle Antworten. Die Strenge schwankte: Sinngleiche, vorsichtig formulierte Zielgruppen („Vermutlich Privatleute und Bauherren …“) zählten bei einem Bild richtig, beim anderen falsch. Damit ist der Vergleich Bestand gegen Vorschau nicht belastbar (Rohwertung: 39 gegen 45 vollständig richtig, fünf Seiten-Ansichten unter Schwelle oder Basis).
- **Wahl:**
  - Die Bewertung wird nach Protokoll wiederholt: ein frischer Opus, alle 120 Antworten gemischt unter neutralen Kennungen (A001–A120, feste Mischung), ohne Bild, Stand oder Ansicht. Die Erstbetrachter-Antworten bleiben unverändert.
  - Wertung, vor der Neubewertung festgelegt: Eine Zielgruppe ist richtig, wenn sie sinngemäß dem Bezug entspricht (Privatkunden, Haus- oder Wohnungseigentümer, private Bauherren mit Bad-, Fliesen- oder Terrassenvorhaben), auch wenn sie als Vermutung formuliert ist. Die Erstbetrachter waren angewiesen, Unsicherheit offen zu sagen; ehrliche Vorsicht darf nicht bestraft werden. Falsch ist sie, wenn die Antwort die Gruppe offen lässt („nicht erkennbar“, „ob privat oder gewerblich, unklar“, ohne Festlegung), etwas anderes nennt oder nur einen Allgemeinplatz wie „Kunden“ bietet. Dieselbe Regel gilt für Angebot und nächsten Schritt.
- **Umkehrprobe:** Weicht die Neubewertung bei derselben Antwort stark von der Rohwertung ab, wird eine zweite unabhängige Bewertung als Gegenprobe beigelegt; das Tor zählt die Wertung nach Protokoll.
