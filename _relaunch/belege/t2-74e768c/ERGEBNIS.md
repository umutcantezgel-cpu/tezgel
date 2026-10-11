# T2 · P4-07 Wege (Kandidat 74e768c gegen Live-Stand 0f44c9b = d4da429 + Doku)

Sofort wirksames Paket außerhalb der Kern-Ordner (Plan Runde 3, Einfrieren N-01 c): volles Tor statt Kandidat-Freischaltung.

| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Reinraum 74e768c | npm ci, Build, Typen, Lint, Tests 22/22 (17 + 5 neu), qa:graph grün; Tracing ohne `_relaunch` | `cache/reinraum-74e768c/` |
| Routentabelle | gleich (○/●/ƒ je Route); das Build-Protokoll nennt zusätzlich nur `ƒ Proxy (Middleware)` | `routen.txt` |
| build-vergleich `--streng` | HTML 172 gleich, keine Seite neu oder weg, CSS-Regeln, Variablen und Keyframes gleich, Skripte und Chunk-Namen gleich | `build-vergleich-0f44c9b-74e768c-streng/` |
| Proxy-matcher (statisch) | 25 kompilierte matcher (`functions-config-manifest.json`) · 200 unbeteiligte Adressen (alle vorgerenderten Seiten, `_next`, Bilder, `/api`, Sitemaps, 308-Quellen): **0 Treffer** · 32 entfernte Adressen: 0 verfehlt | `wege.json` |
| HTTP lokal | 43 Proben rot 0: 410 mit Seite, `noindex` und allen Sicherheitsköpfen (CSP, HSTS, nosniff); HEAD 410; Schrägstrich-Form 308 → 410; 308 auf `/bad/projekt-check` und `/bad/barrierefreies-bad` (Ziele 200); Grenzfälle `/heizungen`, `/energie-sparen`, `/referenzen/project-007` 404, `/blog/fliesen-reinigen-pflegen` und `/` 200 | `wege.json` |
| Sitemap | alle 163 Adressen 200, keine 410-Seite | `wege.json` |
| 410-Seite | axe 0, kein Überlauf (375, 1440); einzige Konsolenmeldung ist der Dokumentstatus 410 selbst (wie bei 404) | `seite-410-m375.jpg`, `seite-410-d1440.jpg` |
| Mutationsprobe Unit-Test | 5/5 rot: `/bad` als Bereich · breiter matcher `/blog/:pfad*` · fehlender matcher-Eintrag · 307 statt 308 · Präfix ohne Segmentgrenze | Protokoll unten |
| Mutationsprobe Werkzeug | Kopie 74e768c-m (matcher `/blog/:pfad*` + Status 404): ROT, 16 unbeteiligte Treffer, 33 HTTP-Proben rot | `../t2-74e768c-mutation/wege.json` |
| Funktionstests | 350 bestanden, 0 rot, 16 übersprungen (fassungsbedingt), 0 wackelig, 8,7 min (wie Endstand P3) | `suite.json` |

Pixel, Text v2, SEO-Invarianten, Lighthouse und Jury entfallen begründet: Der strenge build-vergleich belegt gleiches HTML, gleiche Skripte und gleiches CSS für alle 172 Seiten. Der Proxy läuft auf keiner dieser Adressen (0 Treffer).

## Protokoll Mutationsprobe Unit-Test (Kopie, dateigenau zurückgesetzt)
- M1 `/bad` als Bereich → Tests 1, 2, 3, 4, 5 rot
- M2 matcher `/blog/:pfad*` → Test 4 rot
- M3 matcher `/referenzen/project-006` fehlt → Test 4 rot
- M4 `permanent: false` (307) → Test 5 rot
- M5 `startsWith(bereich)` ohne `/` → Test 3 rot

**Urteil: T2 grün.** Push `git push origin HEAD:main` (E-005), danach Live-Rauchtest und `wege.mjs --live`.
