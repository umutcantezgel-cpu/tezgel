# P4-13b · Nachprüfung (Kandidat 923a167 auf 4324, Vorschau 923a167-v auf 4321)

Änderung: `Banner.tsx`. Die feste Leiste bekommt ab lg `lg:overflow-y-auto`, der Schließen-Knopf `forced-colors:border` (Auftrag `../../pakete/P4-13b.md`).

| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Reinraum 923a167 und 923a167-v | npm ci, Build, typecheck, lint, test, qa:graph: alle Exit 0 | `../../cache/reinraum-923a167*/ergebnis.txt` (lokal) |
| build-vergleich streng f2c4180 → 923a167 | HTML 172, nur `index.html`. CSS 7 weg, 30 neu: gegenüber c5ef582 +1 (`lg:overflow-y-auto`); `forced-colors:border` gab es schon | `../build-vergleich-f2c4180-923a167-streng/` |
| a11y-zusatz mit Banner (`--banner erstbesuch,einstellungen`, 7 Seiten, 147 Läufe) | **forced ohne Grenze 0** (vorher 14) · **textabstand abgeschnitten 0** (vorher 7 + 7) · reflow 0 · Zoom nur Information (unverändert) | `../p413b-a11y-banner/` (vorher `../p4r2-a11y-banner/`) |
| a11y Tastatur `/` m375/d1440, abgelehnt und Erstbesuch | harte Kennzahlen 0 außer „dünn“ 1 = derselbe E-018-Fall (Stimmen, m375 Erstbesuch, 1 492/1 526) | `../p413b-a11y-tastatur/` |
| axe-Zustände (Menü, Erstbesuch, Einstellungen; 7 Seiten) | 35 Läufe, **0** | `../p413b-axe/` |
| Specs Einwilligung, Kontaktwege, Navigation (`vorschau`) | **137 grün · 0 rot · 11 übersprungen** (wie P4-13) | `specs.json` |
| Pixel `/` Live gegen Kandidat | wie c5ef582: nur d1440/d1920 je 4 060 px im Kopf | `pixel-start.json` |
| Leiste rollt bei normalem Satz? | 48 Messungen (`/`, `/kontakt`, `/blog` × 1024–1920 × Erstbesuch/Einstellungen, mit klassischer Scrollleiste): **0** | `leiste-rollt.json` |
| Fotos d1440/d1920 mit Banner | 6/6, 0 Fehler, 0 Überlauf; Leiste unverändert | `../../cache/fotos/p413b-fotos-banner/` (lokal) |

**Urteil:** Auflage N-A (P4-GEG2) erfüllt: Banner-Zustände belegt, beide Befunde behoben. Ohne Verlust gegenüber c5ef582.
