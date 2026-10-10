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
