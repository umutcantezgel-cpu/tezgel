# Tor e6o1-a3 · E6-ORCH-01 Schritte 7–8 · live 8f1e979 (Produkt 51f2cad) → 7b8ab21 · 13.10.2026

Inhalt: 2026cd2 (Alias-Schicht abgebaut: tokens.css, alt-Layer, Theme-Aliase primary/secondary, Alias-Klassen ceramic/
eyebrow/btn/glass/ambient-glow, --font-display/-heading; .karten-hoehe und --font-sans bleiben; Doku auf KERN v2),
7b8ab21 (Tailwind-Standardpalette gesperrt, `--color-*: initial`, white für print). Umsetzung und je ein Gegenprüfer im
Workflow, abgenommen; getrennte Commits über den gesicherten Zwischenstand von globals.css (sha256 d7b273df… nach 7).

## Automatische Stufen (tor-s.sh, BEREICH_AUCH='*', TOR_PORT 4369, Pixel gegen live 4368) – alle grün
- build-vergleich: **HTML 172 Seiten gleich**, css_weg 58, **css_neu 0**, **var_weg 165**, var_neu 0, keyframes 0/0.
- Werte 0, Altsystem 0, texte2 rot 0, axe 0, Wortbruch 0, Fotos 48/0, **Specs 380/0**, Pixel-Stichprobe 6/0.
- Zusätzlich Pixel aller 12 Torseiten in m375, t768, d1440 (36 Vergleiche): 2 abweichend, beide Messrauschen –
  /standorte/giessen d1440 4399 px (bekannt) und /bad t768 151 424 px: Wiederholung neu gegen live 0, **live gegen live
  dieselbe Zahl 151 424** (`cache/pixel/e6o1-a3-*`).
- a11y harte Kennzahlen 0 (forced-Felder /fliesen, ohne JS /bad und /preise wie live).

## Lighthouse (Last 0,6; 5 verschränkte Paare, live 4368 gegen 4369; `belege/e6o1-lh/`) – innerhalb der Streuung oder besser
| Seite | mobil Punkte · LCP · TBT | Desktop Punkte · LCP |
|---|---|---|
| / | 90 → 90 · −47 ms · 149 → 121 ms | 100 → 100 · +32 ms |
| /kontakt | 93 → 96 · −266 ms · 163 → 131 ms | 100 → 100 · −1 ms |
| /leistungen | 93 → 93 · −192 ms · 117 → 178 ms | 100 → 100 · +19 ms |
Übertragung je Seite 2–3 KB kleiner.

## Ergebnis
Grün. Push des geprüften Stands 7b8ab21.
