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
