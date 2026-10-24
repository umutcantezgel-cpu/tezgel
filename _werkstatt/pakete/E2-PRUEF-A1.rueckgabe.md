# E2-PRUEF-A1 · Rückgabe (Haiku, Workflow wf_465d4634-607)

ERGEBNIS JE PAKET

Alle Läufe mit `PRUEFE_A_WELLENLAUF=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-A-WELLE/berichte`. Vorbedingung erfüllt: `git diff --stat 4479016 HEAD -- src test` ist leer. Belege je Paket: `<Scratch>/<Kennung>/pruefe-a.txt`, mit Scratch = `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.

- **E2-PRUEF-A1-1** (`src/app/globals.css`, `/`): GRÜN. tsc 0 eigene, 0 übrige. eslint 0 Fehler; die CSS-Datei wurde nicht geprüft ("File ignored because no matching configuration"). Funktionstests GRÜN (ALLE, erwartet 294, unerwartet 0). Bilder GRÜN (HTTP 200, Konsole 0, Überlauf 0, Überlappung 0). Lesbarkeit `/` GRÜN.
- **E2-PRUEF-A1-2** (`src/lib/motion/register.ts`, `test/bewegung.test.mjs`, `/`): GRÜN mit Hinweis. tsc 0/0, eslint 0/0, Bilder GRÜN, Lesbarkeit GRÜN. Funktionstests ÜBERSPRUNGEN, keine Zuordnung.
- **E2-PRUEF-A1-3** (`GoogleReviewsBadge.tsx`, `schema.ts`, `standorte/[stadt]/page.tsx`, `/standorte/wetzlar`): ROT. tsc 0/0, eslint 0/0, Funktionstests GRÜN (navigation, schnellanfrage, kontaktwege; erwartet 98, unerwartet 0), Bilder GRÜN (HTTP 200, 0/0/0). Lesbarkeit ROT: Flesch 29.6 (Soll mindestens 60); Gedankenstriche 9; Bindestrichwörter 29; Floskel 1 (Überschrift „Ihr Fliesenleger für Wetzlar: J…“ nach dem Muster „Begriff: Erklärung“); 11 offene Glossarbegriffe (u. a. Verbundabdichtung, DIN 18534, Walk-In-Duschen, Stelzlagern, Feinsteinzeug, Großformat). Beleg: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-A1/lesbarkeit/lesbarkeit.md`.
- **E2-PRUEF-A1-4** (`src/config/glossar.ts`, `src/components/kern/Fachwort.tsx`, `/`): GRÜN mit Hinweis. tsc 0/0, eslint 0/0, Bilder GRÜN, Lesbarkeit GRÜN. Funktionstests ÜBERSPRUNGEN, keine Zuordnung.
- **E2-PRUEF-A1-5** (sieben Dateien unter `src/components/kern/`, `/`): GRÜN mit Hinweis. tsc 0/0, eslint 0/0, Bilder GRÜN, Lesbarkeit GRÜN. Funktionstests ÜBERSPRUNGEN, keine Zuordnung.
- **E2-PRUEF-A1-6** (`Bildfeld.tsx`, `src/config/arbeiten.ts`, `/`): GRÜN mit Hinweis. tsc 0/0, eslint 0/0, Bilder GRÜN, Lesbarkeit GRÜN. Funktionstests ÜBERSPRUNGEN, keine Zuordnung.
- **E2-PRUEF-A1-7** (E2-ORCH-02i: `WeiterLink.tsx`, `Textmarken.tsx`, `textmarken.ts`, `test/textmarken.test.mjs`, `stile.ts`, `/`): GRÜN. tsc 0/0, eslint 0/0, Funktionstests GRÜN (ALLE, 294, 0 unerwartet), Bilder GRÜN, Lesbarkeit GRÜN.
- Wurzel `npm test`: 114 bestanden, 0 gescheitert.
- Textvergleich bei allen Paketen ÜBERSPRUNGEN (keine E0-Basis, siehe OFFENE FRAGEN). Er ist nicht geprüft.

POSITIVPROBE

- Probe (`Hauptknopf.tsx`, `/`): Gesamt GRÜN, Exit 0. tsc, eslint und Bilder GRÜN; Funktionstests und Text ÜBERSPRUNGEN.
- Negativprobe (`-- /gibt-es-wirklich-nicht-200`): Bilder ROT, HTTP 404/404; Gesamt ROT, Exit 1.
- Zweite Probe aus dem Nachtrag (`PRUEFE_A_WELLENLAUF=/gibt-es-nicht.json`, `HeroContactForm.tsx`, `/`): Funktionstests ROT, Gesamt ROT, Exit 1.
- Zweiter Lauf für rote Tests war nicht nötig, da kein Wellentest rot war.

BILDBELEGE

Gesichtet je Paket, m390 und d1440 (Basis `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/`):
- `E2-PRUEF-A1-1/bilder/start/m390.jpg` und `d1440.jpg`
- `E2-PRUEF-A1-2/bilder/start/m390.jpg` und `d1440.jpg`
- `E2-PRUEF-A1-3/bilder/standorte__wetzlar/m390.jpg` und `d1440.jpg`
- `E2-PRUEF-A1-4`, `-5`, `-6`, `-7` je `bilder/start/m390.jpg` und `d1440.jpg`

Sichtbar falsch: nichts. Auf dem mobilen Bild ist der untere Rand von der festen Leiste (Anrufen, WhatsApp, Termin) verdeckt, und das d1440-Bild von `/standorte/wetzlar` endet am Viewport-Rand. Das gehört zum Bildausschnitt und ist kein Befund.

GEÄNDERTE DATEIEN

Keine. `git status --porcelain` war vor und nach den Läufen leer. Vorher-Stand: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-A1-status-vorher.txt`.

GEMEINSAME DATEIEN

Keine Fehler in gemeinsamen Dateien belegt. Die Lesbarkeitsbefunde auf `/standorte/wetzlar` sind keiner Quelldatei zugeordnet. Unantastbare Inhalte: wegen des leeren Diffs gegen 4479016 keine Änderung.

OFFENE FRAGEN

1. Pakete -2, -4, -5 und -6 haben keine Funktionstests. `test-zuordnung.json` deckt `Hauptknopf.tsx`, die Seitenformel-Gruppe, `glossar.ts`, `Fachwort.tsx`, `Bildfeld.tsx`, `arbeiten.ts` und `motion/register.ts` nicht ab. Das Muster `components/kern/Knopf` trifft `Hauptknopf.tsx` nicht. Ob die Zuordnung ergänzt wird, entscheidet der Orchestrator.
2. Textvergleich nicht ausführbar: `_werkstatt/belege/e0/texte-index.json` fehlt.
3. eslint ignoriert `globals.css`; die Datei wurde nicht gelintet.

=== ENDE E2-PRUEF-A1 · BEREIT ZUR RÜCKGABE ===
