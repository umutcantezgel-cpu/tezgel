# T2 · P4-04 Icon-Vollsatz, P4-05a Formular-Hooks F-04/F-05, P4-01/02/03 ruhend (Kandidat ca8d5ff gegen Live-Produkt 74e768c)

Sofort wirksam ist zweierlei:
- P4-04 ändert den unsichtbaren Sprite-Block auf `/` (E-026).
- P4-05a stellt zwei Bestandsformulare auf Hooks um (Skripte der `/bad`-Seiten).

Die Vorlagen P4-01/02/03 ruhen: Sie fügen dem Kern-CSS nur Hilfsregeln hinzu.

| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Reinraum cefbde0 und ca8d5ff | jeweils npm ci, Build, Typen, Lint, Tests 22/22, qa:graph grün; Tracing ohne `_relaunch` | `cache/reinraum-*/` |
| Routentabelle | gleich | `routen.txt` |
| build-vergleich 74e768c → cefbde0 `--ohne-sprite` | HTML 172 **gleich**; CSS +2 Selektoren (`.accent-k-tinte`, `.h-k-2`, live unbenutzt) | `../build-vergleich-74e768c-cefbde0-ohne-sprite/` |
| build-vergleich 74e768c → cefbde0 weich | 1 Datei anders: `index.html`, nur der Sprite-Block | `../build-vergleich-74e768c-cefbde0/` |
| build-vergleich 74e768c → cefbde0 `--streng` | 21 Dateien anders: 20 `/bad`-Seiten (Skript-Chunks der umgestellten Formulare) und `index.html` (Sprite) | `../build-vergleich-74e768c-cefbde0-streng/` |
| build-vergleich cefbde0 → ca8d5ff `--streng` | HTML 172 gleich bis auf den CSS-Dateinamen in `index.html`; CSS +86 Regeln, 4 Regeln zusammengelegt (Gruppen-Selektoren, `@layer theme` +3 Variablen: `--container-sm`, `--default-transition-*`) → die Vorlagen ruhen, `/` lädt nur zusätzliche, unbenutzte Regeln | `../build-vergleich-cefbde0-ca8d5ff-streng/` |
| Gegenprüfer P4-05a (Opus, frisch) | F-04 und F-05: „Verhalten gleich: ja“; 3 niedrige Hinweise ohne Wirkung; 11 Altbefunde schon vorher | `../../pakete/P4-05a-GEG.rueckgabe.md` |
| Mutationsprobe Hooks (Kopie cefbde0-m, gebaut) | 3/3 rot: `toFixed(2)` in useBadanfrage → 3 Fälle × 2 Ansichten rot · `parseInt` in `changeSqm` → 4 × 2 rot · `toLocaleString('en-US')` in useProjektCheck → 10 rot | `mut-p405a-1-tests.log`, `mut-p405a-2-tests.log` |
| Pixel (A/A gegen 74e768c) | `/`, `/bad`, `/bad/badanfrage`, `/bad/projekt-check`, `/bad/badsanierung` in 4 Ansichten: 20 Vergleiche, **0 abweichend** | `pixel.json` |
| Funktionstests | 349 bestanden, 1 rot, 16 übersprungen. Rot: F-09 LeadQuickForm `/standorte/wetzlar` desktop „nur Pflichtfelder“ (`locator.check`: „Clicking the checkbox did not change its state“). Wiederholt: Kandidat 12/12 grün; Live-Produkt 74e768c im selben Test einmal rot, danach 12/12 grün → Wackeln unter Last (zwei Unteragenten liefen), F-09 ist von den Paketen nicht berührt. Auftrag an P4-06: Test wartet auf Hydrierung | `suite.json` |

Text v2, SEO-Invarianten und axe entfallen begründet: Das HTML aller 172 Seiten ist ohne den Sprite-Block gleich. Der Sprite-Block ist `aria-hidden`, ohne Text und ohne Fokus.

**Urteil: T2 grün.** Push `git push origin HEAD:main` (E-005), danach Live-Rauchtest.

> **Berichtigung (E-036, 11.10.2026):** Die Pixelvergleiche in diesem Beleg sind ungültig. Die Maske von `pixel.mjs` blendete die ganze Seite aus; erkannt wurden nur Höhenänderungen. Nachgeprüft mit dem berichtigten Werkzeug: `../p4-tor-r2/pixel/` (Stichprobe und rückwirkend gegen den Ausgangsstand).
