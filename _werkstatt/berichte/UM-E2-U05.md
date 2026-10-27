# UM-E2-U05 · Laufzeitbibliotheken und Audit · Bericht

## GEÄNDERTE DATEIEN
- `/home/user/tezgel/package.json`: fünf Einträge (zod `^4.6.7`, resend `^6.34.1`, lucide-react `^1.61.0`, tailwind-merge `^3.7.0`, @types/google.maps `^3.66.7`). Sonst unverändert.
- `/home/user/tezgel/package-lock.json`: sechs Pakete geändert, keine hinzugefügt oder entfernt.
- `/home/user/tezgel/_werkstatt/berichte/UM-E2-U05.md` (neu).

## WAS UND WARUM
- zod 4.4.3 → 4.6.7 (Audit hoch: `<4.6.6`, Speicherüberlauf bei großen Sammlungen).
- resend 6.30.0 → 6.34.1.
- lucide-react 1.16.0 → 1.61.0. Der Befehl aus dem Briefing löste auf 1.62.0 auf und schrieb `^1.62.0`; ich habe mit `npm install lucide-react@1.61.0` auf das Ziel zurückgesetzt (siehe OFFENE FRAGEN 1).
- tailwind-merge 3.6.0 → 3.7.0.
- @types/google.maps 3.66.5 → 3.66.7.
- source-map-js 1.2.1 → 1.2.2 (transitiv über @tailwindcss/node und postcss; Audit hoch `<1.2.2`; `npm audit fix` ohne `--force`).
- sharp: 0.35.5 unter next, schon vor dem Lauf; kein Befund, keine Änderung.

Leitfaden zod 4.5 und 4.6 (zod.dev/blog/zod-4-5, zod-4-6; GitHub-Releases durch den Proxy gesperrt):
- `z.object`: Unbekannte Schlüssel brechen mit `.strict()` nicht mehr ab, beide Fehler werden gemeldet. Das Projekt nutzt kein `.strict()`. `__proto__` wird immer entfernt. Ohne Wirkung.
- `z.string().email()`: Muster ohne Lookaheads. Annahme und Ablehnung bleiben gleich (20 Adressen gegen 4.4.3 und 4.6.7 geprüft, identisch). Im Projekt ungenutzt: `z.regexes.email`, `issue.pattern`.
- `safeParse`: Kein Stack-Trace bei Fehlschlag (4.5); `result.error` wird beim ersten Lesen gebaut (4.6). Die Anfrage liest `result.error.issues` sofort (`src/lib/email/validation.ts`, Zeilen 210 bis 213). Ohne Wirkung. Das Projekt setzt keine `z.config` und keine Error-Map.
- Fehlermeldungen: Eigene Texte unverändert; das Anfrageobjekt mit E-Mail-Feld liefert in beiden Versionen dieselbe Meldung. Neu ab 4.5: `.min()`, `.max()`, `.length()` zählen Unicode-Codepunkte statt UTF-16. Nur Emoji betroffen: `.max(5)` mit fünf Emoji war abgelehnt, ist jetzt angenommen; `.min(5)` mit drei Emoji war angenommen, ist jetzt abgelehnt.
- Im Projekt ungenutzt (grep leer): `z.iso.datetime`, `z.emoji`, `z.url`, `z.ipv6`, `z.ulid`, Enum-Optionen, `z.toJSONSchema`, `z.config`.
- lucide-react, resend, tailwind-merge: Im Paket liegt keine Changelog-Datei. Nutzung: lucide in drei Dateien (`src/config/blog.js`, `src/config/company.js`, `src/lib/formulare/useAnfrageFunnel.ts`); resend nur `emails.send` (`src/lib/email/mailer.ts`); tailwind-merge nur `twMerge` (`src/lib/utils.ts`). Build ohne Export-Warnung.

## GEMEINSAME DATEIEN
Nur Orchestrator, nicht geändert. `_werkstatt/UPGRADE.md`:
- Nr. 11 zod: „umgesetzt: 4.6.7 (`^4.6.7`); Audit hoch beseitigt; Anfrageschnittstelle geprüft (berichte/UM-E2-U05.md)“.
- Nr. 12 sharp: „Projekt 0.35.5 über next, unverändert; Werkzeuge in U07“.
- Nr. 13 source-map-js: „umgesetzt: 1.2.2“.
- Nr. 14 resend: „umgesetzt: 6.34.1 (`^6.34.1`)“.
- Nr. 15 lucide-react: „umgesetzt: 1.61.0 (`^1.61.0`); 1.62.0 offen“.
- Nr. 16 tailwind-merge: „umgesetzt: 3.7.0“.
- Nr. 17 @types/google.maps: „umgesetzt: 3.66.7“.
Commit je „–“.

## PRÜFUNG UND ERGEBNIS
- Node v24.22.1, npm 11.19.1.
- `npm ls` (Exit 0): zod 4.6.7, resend 6.34.1, lucide-react 1.61.0, tailwind-merge 3.7.0, @types/google.maps 3.66.7, source-map-js 1.2.2, sharp 0.35.5.
- `npm ls --all | grep -cE 'invalid:|ERR!|ERESOLVE'`: 0.
- `npm install-scripts ls`: „No packages with unreviewed install scripts.“
- Stufe A: `typecheck` Exit 0 (5 s). `lint` Exit 0 (19 s), ohne Ausgabe. `test` Exit 0 (2 s), 210 von 210, 0 Fehler, 0 Warnungen, `email-pipeline.test.mjs` grün. `build` Exit 0 (16 s), Routentabelle mit 117 Zeilen identisch zur Sicherung vor dem Upgrade. `qa:graph` Exit 0, 0 Fehler.
- `warn|deprecat|DEP0` in allen Logs: einziger Treffer `/blog/undichte-dusche-warnzeichen` (Routenname), kein Befund.
- Audit vorher: high 2 (zod, source-map-js), critical 0. Nachher: 0 Befunde gesamt (`audit.json`).
- Vergleich zod 4.4.3 gegen 4.6.7: 20 E-Mail-Fälle und Objektfälle identisch; Abweichungen nur bei den zwei Emoji-Längen.
- `git status --short`: nur `package.json`, `package-lock.json` und dieser Bericht.

Logs und Vergleiche: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e2-u05/`

## BILDBELEGE
keine nötig

## OFFENE FRAGEN
1. lucide-react 1.62.0 steht seit 27.10.2026, 06:14 UTC, im Register; Z-03 verlangt die neueste stabile Version. Das Briefingziel ist `^1.61.0`, installiert ist 1.61.0. Entscheidung beim Orchestrator. Umsetzung wäre `npm install lucide-react@^1.62.0` plus Stufe A.
2. `z.string().email()` in `src/lib/email/validation.ts:49` ist in zod 4.4.3 und 4.6.7 als `@deprecated` markiert (Ersatz `z.email()`). Lint und Build melden nichts. Die Umstellung wäre eine Codeänderung in `src/`, also nicht Teil von U05.
3. Die Längengrenzen zählen ab zod 4.5 Codepunkte. Das ist im Lauf übernommen, weil es dem zod-Verhalten entspricht. Bitte bestätigen, falls die Grenzen anders gemeint sind.

=== ENDE UM-E2-U05 · BEREIT ZUR RÜCKGABE ===
