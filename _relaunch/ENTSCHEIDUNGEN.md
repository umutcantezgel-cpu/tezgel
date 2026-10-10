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
- Vor jedem main-Push: Reinraum-Build aus `git worktree`, Invarianten, Push des Commits auf den Sitzungs-Branch `claude/kind-franklin-5y6s1d` → Vercel-Vorschau-Status grün → `git push origin HEAD:main` → Produktionsstatus → Live-Rauchtest (x-build-Meta = Commit). Bewegt sich origin/main: Merge-Commit, kein Rebase, kein Force.

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
- `public/llms.txt`: Tezgel-Inhalt, aber überschattetes Duplikat der Route `src/app/llms.txt/route.ts`; live wurde es nie ausgeliefert (Beleg der Gegenprüfung: Live-Abruf `https://www.tezgel.de/llms.txt` ist byte-gleich mit `.next/server/app/llms.txt.body` des Reinraum-Builds 74be890). URL und ausgelieferter Inhalt bleiben gleich; lokal stimmt die Auslieferung jetzt mit live überein. Die Datei behauptete „Meisterbetrieb“/„Fliesenlegermeister“.
- Next-Vorlagen-SVGs `/file.svg`, `/globe.svg`, `/next.svg`, `/vercel.svg`, `/window.svg` lieferten live 200 und liefern nach dem Push 404: nicht in der Sitemap, nirgends verlinkt, freigegebene Vorlagen (Gruppe d) – kein URL-Schutzfall (Z-06 bezieht sich auf Seiten mit Suchwert).
- Tor: Pixelvergleich durch stärkeren deterministischen Beleg ersetzt – vorgerendertes HTML aller 172 Seiten identisch (normalisiert), 211 CSS-Selektoren, 46 Theme-Variablen und `@keyframes bounce` entfallen, keine davon im gerenderten HTML, in Client-JS (nur tailwind-merge-/zod-Tabellen) oder per `var()` im neuen CSS referenziert. Text-/SEO-Vergleich 120 Seiten GRÜN. Begründung: Bei identischem Markup und ausschließlich unbenutzten entfallenen Regeln kann sich die Darstellung nicht ändern.
- `build-vergleich.mjs` repariert (Selektorlisten nur außerhalb von Klammern trennen) und um Custom Properties und `@keyframes` erweitert.
- Optionale Auflage umgesetzt: `dist/*`-Altkonfiguration aus `tsconfig.json` und `eslint.config.mjs` entfernt (`.gitignore`-Eintrag `dist/` bleibt als Schutz). `ms-reusable-components`/`coday-seo-toolkit`-Einträge bleiben (evtl. lokale Ordner des Auftraggebers).
