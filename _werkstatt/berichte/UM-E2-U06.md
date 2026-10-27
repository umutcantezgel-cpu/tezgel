# UM-E2-U06 · ESLint

GEÄNDERTE DATEIEN
- `/home/user/tezgel/package-lock.json`: eslint 9.39.4 → 9.39.5; transitiv @eslint/js 9.39.5, @eslint/eslintrc 3.3.7, acorn 8.19.0
- `/home/user/tezgel/_werkstatt/berichte/UM-E2-U06.md` (neu)
- Unverändert gegen HEAD: `package.json` (`"eslint": "^9"`), `eslint.config.mjs`
- Sicherungen: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e2-u06/` (Start, `ziel1/`, `anlauf2/`)

WAS UND WARUM
- Ziel 1 erreicht: `npm update eslint` auf 9.39.5, `^9` bleibt. `npm ls eslint`: 9.39.5, 0 invalid.
- Ziel 2, Anlauf 2 (eslint 10.13.0) gescheitert, zurückgesetzt:
  - `npm install --save-dev eslint@10.13.0` (ohne `--legacy-peer-deps`): Exit 0, aber 3× `npm warn ERESOLVE overriding peer dependency`. Der Trockenlauf zeigt dasselbe. Bedingung 1 verletzt.
  - `npm ls eslint`: 11 Zeilen `invalid` für eslint-plugin-import (Peer `^2 … ^9`), eslint-plugin-jsx-a11y (`^3 … ^9`) und eslint-plugin-react (`^3 … ^9.7`), alle unter `node_modules/eslint-config-next/node_modules/`.
  - `npm run lint` mit 10.13.0: Exit 0, 0 Befunde, 0 Warnungen. Bedingung 2 wäre erfüllt.
  - Registry am 27.10.: die neuesten Versionen der drei Plugins (7.37.5, 6.10.2, 2.32.0) erlauben kein ESLint 10; eslint-config-next 16.4.3 hängt daran.
  - Zurücksetzung nach Schritt 4: `cp` aus `ziel1/`, dann `npm ci` (Exit 0). ESLint 9.39.5 aktiv.
  - Leitfaden eslint.org „Migrate to v10.0.0“ gelesen und geprüft: Node 24.22.1 erfüllt ≥ 20.19. Das Projekt nutzt weder `--flag` noch `ESLINT_FLAGS` (package.json, `.github/workflows/security.yml`, `.vscode`), kein `.eslintrc`, kein `FlatESLint`/`LegacyESLint`, kein `eslint-env`. Keine Einstellung für `radix`, `func-names`, `no-shadow-restricted-names` oder `no-invalid-regexp`; keine POSIX-Klassen in `globalIgnores`; jiti 2.7.0 ≥ 2.2.0. Die Regeländerungen betreffen das Projekt nicht (Lint grün). Der Leitfaden nennt keine Peer-Bereiche; dort liegt der Befund.

GEMEINSAME DATEIEN
- `_werkstatt/UPGRADE.md`, Nr. 19, Status: „Ziel 1 umgesetzt: 9.39.5 (`^9`, nur Lockfile). ESLint 10.13.0 Anlauf 2 gescheitert: ERESOLVE overriding peer dependency; npm ls invalid bei eslint-plugin-import, -jsx-a11y, -react unter eslint-config-next. Bericht UM-E2-U06.“
- `_werkstatt/UPGRADE.md`, Nr. 8: Aussage zur ESLint-10-Unterstützung präzisieren (siehe OFFENE FRAGE 3).

PRÜFUNG UND ERGEBNIS (Stand 9.39.5, nach `npm ci` erneut geprüft)
- `npm ls --all`: 0 Treffer für invalid, ERR! oder ERESOLVE. `npm install-scripts ls`: keine ungeprüften Skripte.
- `npm run typecheck`: Exit 0, 2 s.
- `npm run lint`: Exit 0, 17 s, 0 Befunde (vorher 9.39.4: Exit 0, 0 Befunde).
- `npm test`: Exit 0, 210 von 210 bestanden, 0 fehlgeschlagen.
- `NEXT_TELEMETRY_DISABLED=1 npm run build`: Exit 0, 10 s. Routentabelle 85 Zeilen, identisch zur Sicherung vor dem Upgrade (`/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e2-u06/vorher/build.log`).
- `npm run qa:graph`: Exit 0, 0 Fehler.
- `npm audit`: 0 Befunde, je Schwere 0 (`/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e2-u06/audit.json`).
- Warnungen aus allen Logs (Schritt 5):
  1. `npm warn deprecated eslint@9.39.5: This version is no longer supported` (`/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e2-u06/ziel1-update.log`, `.../um-e2-u06/ziel1/npm-ci-zurueck.log`): Registry-Hinweis zu 9.39.5 und 9.39.4, nicht aus dem Code (OFFENE FRAGE 2).
  2. `npm warn ERESOLVE overriding peer dependency` 3× in `.../um-e2-u06/anlauf2/install.log` und 3× in `.../um-e2-u06/anlauf2/dry-run-ohne-override.log`: nur Anlauf 2, zurückgesetzt.
  3. Build-Log Zeile 54: „warn“ nur im Routennamen `/blog/undichte-dusche-warnzeichen`.
  Keine Treffer für `DEP0` oder `deprecat` in Test-, Lint-, Build- und qa-Logs.

BILDBELEGE: keine nötig.

OFFENE FRAGEN
1. ESLint 10 ist blockiert durch eslint-plugin-react (`^9.7`), eslint-plugin-jsx-a11y (`^9`) und eslint-plugin-import (`^9`) unter eslint-config-next. Ein Override oder Pluginwechsel wäre eine Codeänderung bzw. eine Lockerung der Prüfung und ist in U06 nicht gemacht. Erneuter Anlauf nach Plugin-Release; Lint mit 10.13.0 war bereits grün.
2. ESLint 9.39.5 trägt den npm-Hinweis „no longer supported“ (dist-tag `maintenance`). Z-03 verlangt die neueste stabile Version (10.13.0); sie ist blockiert. Entscheidung: 9.39.5 bis zum Plugin-Release annehmen?
3. UPGRADE.md Nr. 8 sagt, eslint-config-next ab 16.4.0 unterstütze ESLint 10. Die eigene Peer-Angabe (`>=9.0.0`) stimmt; die Abhängigkeiten von 16.4.3 erlauben es nicht.
4. typescript-eslint 8.72.1 (neueste) erlaubt ESLint ^10; im Lockfile steht 8.60.0 (über eslint-config-next). Kein Blocker, zur Kenntnis.

=== ENDE UM-E2-U06 · BEREIT ZUR RÜCKGABE ===

## Abnahme-Vermerk des Orchestrators (27.10.2026, E-073)
- Gegenprüfung: Routentabelle 109 Zeilen statt „85“ (die 85 stammen aus einer gefilterten Datei); identisch zur Sicherung.
- Lockfile: Zusätzlich verlangt `@eslint/eslintrc` jetzt js-yaml `^4.3.2` statt `^4.1.1`; installiert war 4.3.2 schon vorher, die Version ändert sich nicht.
- Der npm-Hinweis „no longer supported“ an eslint 9.39.5 ist der Wartungsstatus der 9er-Linie (dist-tag `maintenance`), keine veraltete Schnittstelle im Code. Weil ESLint 10 nach zwei belegten Anläufen blockiert ist, gilt 9.39.5 als belegt neueste kompatible Version (Z-03).
