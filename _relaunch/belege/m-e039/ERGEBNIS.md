# Sammel-Tor m-e039 · Merge-Basis M (Fusion II, F0) · Stand 090858e gegen live a1aeda6 · 12.10.2026

Stand: c4f2a04 (origin/main a1aeda6 mit allen 191 Werkstatt-Commits eingemischt; die 29 Konflikte in den doppelt gebauten
Einheiten vorläufig in der Werkstatt-Fassung) + 090858e (E-039, PLAN „Fusion II“, HALT-Vermerk der Werkstatt).
Sichtbar gegenüber live ändert sich nur die Phasenleiste des Preisrechners; dazu die Ladelast-Regel N-01/N-01b.

## Automatische Stufen (tor-s.sh, `BEREICH_AUCH='*'`, `PIXEL_A` = live-Build a1aeda6): GRÜN
- Sperrklinke, Reinraum (npm ci, Build, Typprüfung, Lint, Test, qa:graph): 0.
- Bereich: HTML abweichend nur `index`, `faq`, `preise`, `leistungen`, `leistungen/{bad,wohnen,aussen,untergrund}` – jede
  Abweichung ist genau die Phasenleiste des PricingCalculator (`flex-wrap`, Trennlinien `hidden … sm:block`); keine Seite
  neu oder weg. CSS: weg `html:has(.menue-blatt:popover-open)`; neu `body:has(…)`, `body>main`, `body>footer` (N-01/N-01b)
  und 35 Hilfsklassen aus den noch verwaisten Bausteinen `src/components/leistungen/*` und `BlogListe.jsx` (Tailwind liest
  alle Quelldateien; in keiner Seite benutzt, F2 nutzt oder entfernt sie).
- Werte, Altsystem, texte2 (rot 0), axe (ernst/kritisch 0 auf `/`, `/leistungen`, `/blog`, `/bad`, `/fliesen`), Wortbruch 0,
  Fotos 20 Aufnahmen (Überlauf 0, Konsole 0, alle 200).
- Funktionstests (alle 14 Specs, beide Projekte): 380 bestanden, 26 übersprungen, 0 rot.
- Pixel-Stichprobe gegen live (16 Vergleiche): abweichend nur `/faq` m375 und `/preise` m375 (je 1 884 px, Phasenleiste des
  Preisrechners, gesichtet).

## a11y-zusatz gegen live (`../m-e039-live`, gleiche Seiten, gleicher Ablauf)
- Harte Kennzahlen unverändert 0 (Falle, Zyklus, Sprunglink, Reflow waagerecht, Zoom waagerecht, forced-Felder, ohne JS).
- Besser: Reflow „ragt heraus“ 4 → 0, Überlauf 5 → 1 (`/`, `/leistungen`); Textabstand Überlauf 30 → 26.
- Neu, weich: Textabstand „abgeschnitten“ +1 je Seite = „Verbundabdichtung“ im Fuß m375, 2 px (bekannt aus t-sammel-1,
  Folge des Fuß-`clip` N-01b; Nachpaket R-01).

## Lighthouse `/` (ruhiges Fenster, je 10 verschränkte Paare, Median)
| | Ausgangsstand 707a93d | live a1aeda6 | M |
|---|---|---|---|
| mobil Punkte | 81,5 | 91,5 | **92** |
| mobil TBT | 311 ms | 139 ms (Läufe bis 1 188 ms) | **139 ms** (höchstens 237 ms) / 113 ms gegen 707a93d |
| mobil LCP | 3 872 ms | 3 255 ms | 3 278 ms / 3 270 ms |
| Desktop | – | 100, LCP 639 ms | 100, LCP 718 ms |
- Desktop-LCP +79 ms im ersten Satz (A = live zuerst) war ein Reihenfolge-Effekt: umgekehrt gemessen (A = M zuerst,
  `../e039-lh-desktop-umgekehrt`) M 717 ms, live 718 ms, Δ 0,1 %. Z-12: innerhalb der Streuung.
- Die Ladelast-Ausreißer von live (1 188 ms, 428 ms TBT) treten mit N-01 nicht mehr auf.

Belege: `../e039-lh-live-m`, `../e039-lh-basis-m`, `../e039-lh-desktop-umgekehrt`, `../build-vergleich-a1aeda6-090858e`,
`tor/`. Bilder nur im Scratchpad bzw. `_relaunch/cache/` (nicht versioniert).
