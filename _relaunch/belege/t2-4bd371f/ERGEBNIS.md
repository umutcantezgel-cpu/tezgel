# T2 · Schub nach dc1217e: P4-09, Fuß-Sockel, P4-05b/c/d, Kern-CSS, ruhende P4-10a/b (Kandidat 4bd371f gegen Live-Produkt ca8d5ff = dc1217e)

## Sofort wirksam
- **P4-09:** Zuklappen bleibt animiert (`content-visibility` als diskreter Übergang).
- **Fuß:** Garantie-Sockel ohne Wortbruch (E-027).
- **`kern.css`:** additive Regeln `sig-plan`, `.k-zelle[data-spalte]`, `.k-regler`.
- **P4-05b/c:** Hooks für Konfigurator, Kalender und Terminformular; Bestand nur umverdrahtet.
- **P4-05d:** Kalender berechnet „heute“ erst im Browser, Tag je Kalender festgehalten (I-19).

## Ruhend
P4-10a (Vorlagen auf gemeinsame Teile) und P4-10b (Formulare nach Behälterbreite).

| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Reinraum 35c0883 und 4bd371f | jeweils npm ci, Build, Typen, Lint, Tests 22/22, qa:graph grün; Tracing ohne `_relaunch`; Routentabelle gleich | `routen.txt` |
| build-vergleich ca8d5ff → 35c0883 weich | HTML 172: nur `index.html` anders (Sockel-Klassen); CSS +4 | `../build-vergleich-ca8d5ff-35c0883/` |
| build-vergleich ca8d5ff → 35c0883 streng | 16 Dateien: 12 `/fliesen`-Seiten (Konfigurator-Chunk), `/kontakt`, `/termin` (Kalender-Chunk), `/` (Sockel) | `../build-vergleich-ca8d5ff-35c0883-streng/` |
| build-vergleich 35c0883 → 4bd371f weich | HTML: nur `/kontakt` und `/termin` (Kalendertage stehen nicht mehr im vorgerenderten HTML, P4-05d); CSS +100/−12 (nur ruhender Kern-Code; live benutzte Klassen bleiben, siehe Pixel) | `../build-vergleich-35c0883-4bd371f/` |
| Gegenprüfer (Opus, frisch) | P4-05b: Verhalten gleich: ja · P4-05c: F-07 und F-08 ja · P4-05d: gleich bis auf den Zeitpunkt; Befund „Tage rücken über Mitternacht nach“ behoben (fa0e45e) | `../../pakete/P4-05{b,c,d}-GEG.rueckgabe.md` |
| Zuklapp-Probe (P4-09) | am Live-Produkt rot reproduziert (0 Zwischenhöhen, 838 → 0); Kandidat: 8 Zwischenhöhen, danach `hidden`; reduziert sofort; Aufklappen unverändert (17) | `../t2-35c0883/zuklappen.json` |
| Uhr-Probe (P4-05d) | vorher: React #418 auf `/termin` und `/kontakt` ab +1 Tag (6 von 8 rot); Kandidat 4bd371f: +0/+1/+3/+30 Tage 0 Fehler | `../uhr-35c0883-vorher/uhr.json`, `uhr.json` |
| Wortbruch `/` | 8 → 0 | `../t2-35c0883/wortbruch.json` |
| axe `/` (m375, d1440) | ernst/kritisch 0 | `../t2-35c0883-axe/axe.json` |
| Pixel gegen Live-Produkt | 35c0883: 20 Vergleiche, nur `/` anders (Höhe +37…+122 px durch den Sockel, gesichtet: besser) · 4bd371f gegen 35c0883: `/`, `/termin`, `/kontakt`, `/fliesen/konfigurator` in 4 Ansichten 16/0 | `../t2-35c0883/pixel.json`, `pixel.json` |
| CLS (4× Drosselung) | `/termin` d1440 0,0062 (vorher 0), sonst 0; Budget 0,1. Hingenommen: Vorher erzwang der Hydrationsfehler ab Tag 2 ein komplettes Neurendern | Protokoll |
| Hydrierzeit Konfigurator / Termin (4×, je 5) | Median 1093 → 1086 ms bzw. 1196 → 1201 ms, gleiche Zahl und Größe der Skripte | Protokoll |
| Funktionstests 35c0883 | 348 bestanden, 2 rot (Konfigurator, Projekt-Check: Klick vor dem Hydrieren unter Last), 16 übersprungen. Ursache: Specs ohne `bedienbar()` → korrigiert (4bd371f, LERNEN). Danach Konfigurator 46/46 und 4 × 23/23, Projekt-Check 18/18 | `../t2-35c0883/suite.json` |
| Funktionstests 4bd371f (betroffene Specs) | Termin, Kontaktwege, Konfigurator, Projekt-Check: 124 bestanden, 0 rot, 8 übersprungen | `termin-kontakt.json` |
| Mutationsprobe (Kopie 4bd371f-m, gebaut) | 3/3 rot, 24 Fälle: `Math.floor` in `fmt` (Konfigurator-Rechner und Gutfälle) · `timeSlot: selectedDate` (Kalender `/kontakt` und `/termin`) · `topic: formData.timeSlot` (Terminformular) | `mutation-tests.log` |

**Urteil: T2 grün.** Push `git push origin HEAD:main` (E-005), danach Live-Rauchtest und Live-Browser.

> **Berichtigung (E-036, 11.10.2026):** Die Pixelvergleiche in diesem Beleg sind ungültig. Die Maske von `pixel.mjs` blendete die ganze Seite aus; erkannt wurden nur Höhenänderungen. Nachgeprüft mit dem berichtigten Werkzeug: `../p4-tor-r2/pixel/` (Stichprobe und rückwirkend gegen den Ausgangsstand).
