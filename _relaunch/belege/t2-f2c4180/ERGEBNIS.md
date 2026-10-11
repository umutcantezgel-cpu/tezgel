# T2 · P4-08d Hook F-16 `/blog` (Bestand umverdrahtet) + ruhende Entwürfe P4-08a/b/c/d/e + SIG-2-Regel (Kandidat f2c4180 gegen Live-Produkt 4bd371f = 8b4f9cd)

| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Reinraum f2c4180 | npm ci, Build, Typen, Lint, Tests 22/22, qa:graph grün; Tracing ohne `_relaunch`; Routentabelle gleich | `cache/reinraum-f2c4180/` |
| build-vergleich weich | HTML 172 **gleich**; CSS +56 Selektoren (Kern-Klassen der ruhenden Entwürfe, `sig-ablauf`) | `../build-vergleich-4bd371f-f2c4180/` |
| build-vergleich streng | 2 Dateien: `/blog` (Skript-Chunk der Liste mit Hook), `/` (Name der CSS-Datei) | `../build-vergleich-4bd371f-f2c4180-streng/` |
| Gegenprüfer P4-08d-GEG (Opus, frisch) | Verhalten gleich: ja; eigene Laufzeitprobe 900 Fälle gleich, 5 Gegenfehler erkannt; 7 Altbefunde schon vorher | `../../pakete/P4-08d-GEG.rueckgabe.md` |
| Selbstprüfung P4-08d | SSR identisch (74012 Zeichen), Ablaufvergleich 144 Schritte gleich, 5 Gegenmutationen erkannt, `literal.mjs` GLEICH | `../../pakete/P4-08d.rueckgabe.md` |
| Pixel gegen Live-Produkt | `/`, `/blog` in 4 Ansichten: 8/0 | `pixel.json` |
| Funktionstests | `funktion-navigation.spec.mjs` (inkl. Blog-Übersicht F-16): 55 bestanden, 0 rot, 7 übersprungen | `navigation.json` |
| Mutationsprobe (Kopie f2c4180-m, je gebaut) | M1 Suche ohne Kleinschreibung → 2 Fälle rot · M2 „Filter zurücksetzen“ leert die Suche nicht → 3 Fälle rot | `mut-blog-1-tests.log`, `mut-blog-2-tests.log` |

**Urteil: T2 grün.** Push `git push origin HEAD:main` (E-005), danach Live-Rauchtest und Live-Browser (Kennung fest übergeben).
