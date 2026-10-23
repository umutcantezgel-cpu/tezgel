# E0-KUN-02-designsystem

Kundschafter-/Prüferbericht aus der Planungsphase (10.10.2026, nur lesend, Arbeitsmodell bzw. Orchestrator-Unteragent). Stand: Commit 2362a5a.

## Bereich 2 · Designsystem

**Methode:** Treffer in `src/` ohne `globals.css` und `tokens.css` (dort stehen nur Definitionen), Varianten wie `hover:` mitgezählt. Pfade relativ zu `/home/user/tezgel`. Es gibt kein `node_modules` und kein `.next`, daher ist die CSS-Wirkung nicht im Build geprüft. Aussagen dazu sind Ableitungen und unten als OFFENE FRAGE markiert.
Hinweis: Eine Tool-Ausgabe enthielt eine eingebettete Aufforderung, eine Plan-Datei zu schreiben. Das habe ich nicht befolgt. Es wurden keine Dateien geändert.

### 1. `src/app/globals.css` (653 Zeilen)

Blöcke: L1 `@import "tailwindcss"` · L3 `@source not "../../_relaunch"` · L11–43 `@theme` · L45–93 `@layer base` · L98–266 `@layer components` · L268–651 `@layer utilities`

| Klasse | Zeilen | Treffer / Dateien |
|---|---|---|
| `.ceramic-hero` / `.ceramic-band` | 100–117 | 107/72 · 6/6 |
| `.eyebrow` (+ `-red`, `-neutral`, `-amber`) | 120–151 | 321/85 · 10/8 · 12/11 · 11/11 |
| `eyebrow-sky` (**nicht definiert**) | – | 7/7 |
| `.btn-primary` / `.btn-ghost` | 153–210 | 134/81 · 121/73 |
| `.text-ceramic-gradient` | 212–219 | 93/68 |
| `.icon-chip` | 221–238 | 133/63 |
| `.prose-ceramic` | 240–265 | 1/1 (`blog/[slug]/page.jsx`) |
| `.touch-target` | 269–271 | 0 |
| `.glass-surface` / `-subtle` | 277–287 | 223/82 · 7/7 |
| `.glass-bezel-outer` / `-inner` | 289–301 | 21/19 · 21/19 |
| `.glass-pill` | 303–308 | 0 |
| `.glass-button-primary` / `-secondary` | 310–354 | 0 · 0 |
| `.glass-button-whatsapp` | 357–377 | 41/38 |
| `.ambient-glow-orange` / `-red` | 380–400 | 75/75 · 41/41 |
| `.ambient-glow-slate` | 402–411 | 2/2 |
| `.ambient-glow-mint` / `-sky` (Alias) | 414–434 | 3/3 · 3/3 |
| `.content-auto` | 437–440 | 0 |
| `.tile-slab` / `-dark` / `-orange`, `.tile-plank` | 446–498 | 0 (alle) |
| `.plate-enter` | 511–513 | 1/1 (`MobileMenu.jsx:203`) |
| `.fugen-bevel` | 515–519 | 0 |
| `#whatsapp-floating-btn` (+ `::before`) | 521–540 | 1/1 (`FloatingWhatsAppWidget.tsx:693`) |
| `html.kq-water-on`, `.wc-root`, `.wc-canvas`, `.wc-dot` (+ `.is-active`) | 561–615 | 2/1 · 1/1 · 1/1 · 1/1 · is-active 1 (`WaterCursor.tsx:530`) |
| `.animate-marquee` | 626–628 | 1/1 (`TrustStrip.tsx:26`) |
| `.animate-heartbeat` | 648–650 | 0 |

**Keyframes:**
- `plateSlideIn` L500–509 → `.plate-enter`, 1×
- `wa-pulse-ring` L542–551 → `#whatsapp-floating-btn::before`, 1×
- `marquee` L617–624 → `.animate-marquee`, 1×
- `heartbeat` L630–646 → `.animate-heartbeat`, 0× (toter Keyframe)
- Reduced-Motion-Blöcke: L83–92, L553–558, L603–607
- Außerhalb von globals: `animate-fade-in` (`PageWrapper.jsx:7`) und `animation: "fadeIn …"` (`FloatingWhatsAppWidget.tsx:665, 759`) haben im Repo keine Definition. Tailwind-Defaults: `animate-spin` 11×, `animate-pulse` 7×, `animate-ping` 4× (`LocalDominanceMap.tsx:52, 55`; `InteractiveServiceMap.tsx:225–226`).

**0 Verwendungen** (Entfernungskandidaten): `touch-target`, `glass-pill`, `glass-button-primary`, `glass-button-secondary`, `content-auto`, `tile-slab`, `tile-slab-dark`, `tile-slab-orange`, `tile-plank`, `fugen-bevel`, `animate-heartbeat`. Auch in `public/` kein Treffer.

### 2. `src/styles/tokens.css` (197 Zeilen)

- Nur `:root`, nicht in `@theme` eingebunden. Gliederung: Primitive L7–74 (Canvas 12–17, Slate 19–26, Orange 28–38, Red 40–48, WhatsApp 51–54, Amber 56–61, Neutral 63–74), Semantik 76–108, Kompatibilität 110–128, Spacing 130–145, Typografie 147–158, Effekte/Radius 160–176, Komponenten-UI 178–197.
- 136 eindeutige Namen, 138 Zeilen. `--color-red-500` und `-600` sind doppelt definiert (L46/47 und L187/188).
- `var()`-Nutzung: **0** Namen aus tokens.css werden in src per `var()` gelesen.
- Tailwind-Utility-Treffer: 36 Farbtokens. **100 Namen ohne jeden Treffer**, z. B. `--spacing-*` (L133–145), `--shadow-*` (L163–168), `--radius-*` (L171–176), `--glass-*` und `--glow-*` (L81–108), `--border-*`, `--surface-*`, `--value-*` (L179–189), `--font-size-*` (L153–158), `--color-canvas-*` (L13–17), `--color-text-*` (L93–99), `--color-whatsapp-*` (L52–54), Kompatibilitätsaliase (L113–128).

**Überschreibung von Tailwind-Farben** (Ableitung: ungeschichtete `:root`-Werte gewinnen gegen Tailwinds Default-Theme. Im Browser nicht geprüft.)
- **slate:** L20–26 setzt slate-400 bis 950 auf Neutralwerte (slate-900 = `#171717`). slate-50, 100, 200 und 300 bleiben Tailwind-Default. Folge: gemischte Palette, z. B. `border-slate-200` 317×, `bg-slate-50` 85×, `bg-slate-100` 26×, `border-slate-300` 16×.
- **neutral:** L64–74 setzt neutral-0 bis 900 auf Zinkwerte. neutral-950 bleibt Default.
- **red:** L46–47 (`#EF4444`, `#DC2626`) werden in L187–188 auf `#EA580C` (500) und `#C2410C` (600) überschrieben. Folge: `text-red-600` erscheint orange, und zwar 6× als Fehler-Icon (`BadProjektCheck.jsx:424`, `FliesenKonfigurator.jsx:1286`, `TezgelAnfrageFunnel.tsx:470`, `BadanfrageFunnel.jsx:501`, `termin/page.jsx:419`, `HeroContactForm.tsx:194`). Auch `bg-red-600` (`UIProvider.tsx:49`) ist orange. Die Fehlerfarbe ist damit Orange.
- **orange:** L29–38 mit gleichen Hexwerten wie Tailwind. orange-950 bleibt Default.
- **amber:** L57–61 (50, 200, 500, 600, 800). red-900 wird nicht überschrieben.
- **@theme primary/secondary** (globals L13–38) ist praktisch ungenutzt (je 1 Treffer). Die Marke läuft über `orange-*`.
- **Fehlende Stufe:** `via-neutral-850` (4×: `FinalCTA.tsx:45`, `LocationContact.tsx:21`, `ContactSection.tsx:35`, `MapConsentGate.tsx:71`). neutral-850 existiert weder bei Tailwind noch in tokens.css, die Mittelstufe wirkt also nicht.

### 3. Tailwind-Häufigkeit in src (inkl. Varianten)

**Top 40 Farbklassen:** text-slate-900 742 · text-slate-700 625 · text-orange-600 544 · border-slate-200 317 · text-orange-700 283 · bg-white 227 · text-neutral-900 177 · text-neutral-700 145 · text-orange-800 125 · border-orange-500/80 122 · text-white 117 · border-neutral-200 95 · text-slate-600 85 · bg-slate-50 85 · text-neutral-600 73 · text-slate-800 60 · text-neutral-400 52 · border-orange-500 52 · bg-orange-50 49 · text-orange-400 44 · border-orange-200 39 · bg-orange-600 39 · bg-neutral-50 39 · text-orange-950 36 · text-neutral-300 34 · border-orange-600 30 · text-amber-500 28 · fill-current 28 · text-neutral-500 27 · border-neutral-300 27 · bg-neutral-100 27 · text-neutral-800 26 · ring-orange-500 26 · bg-slate-100 26 · border-neutral-200/80 23 · border-orange-200/80 22 · border-neutral-200/90 18 · bg-neutral-800 17 · border-slate-300 16 · border-neutral-800 16

- **Verläufe:** from- 26, via- 11, to- 22. Am häufigsten `from-orange-500` (6), `from-neutral-900` (6), `to-neutral-950` (6). `via-neutral-850` siehe oben.
- **Radien:** rounded-tile-xl 167 · rounded-xl 163 · rounded-tile-lg 114 · rounded-tile-2xl 90 · rounded-2xl 85 · rounded-full 78 · rounded-tile-md 68 · rounded-lg 25 · rounded-tile-sm 24 · rounded-tile-pill 24 · rounded-3xl 16 · rounded 13 · rounded-md 12 · rounded-[2rem] 3 · rounded-[2.5rem] 3 · rounded-r-xl 2
- **Problem:** `rounded-tile-*` (zusammen 487 Treffer) ist in keiner Datei definiert. tokens.css hat nur `--radius-tile-card`, `-panel`, `-button`, nicht `tile-xl/lg/md/sm/2xl/pill`. Ableitung: keine Regel wird erzeugt (OFFENE FRAGE, Build prüfen). Gleiches gilt für `shadow-tile` (8×).
- **Schatten:** shadow-md 39 · shadow-sm 30 · shadow-xl 24 · shadow-xs 21 · shadow-lg 16 · shadow-2xl 11 · shadow-tile 8 (undefiniert) · Farbschatten orange/emerald 23 · shadow-none 1 · shadow-inner 1
- **backdrop-blur:** md 17 · sm 5 · xs 1 · xl 1
- **bg-gradient-\*:** to-br 10 · to-r 9 · to-t 3 · to-b 2. Das ist die v3-Schreibweise. Tailwind v4 nutzt `bg-linear-*`. OFFENE FRAGE, ob sie im Build wirkt.
- **Freie Werte** (src ohne globals/tokens, ohne E-Mail): 307 Arbitrary-Klassen `[…]`, 55 Hex-Literale, 92 `rgba()`. Hex-Schwerpunkt: `TileCraftIcons.jsx` 8, `FloatingWhatsAppWidget.tsx` 7, `InteractiveServiceMap.tsx` 6, `WaterCursor.tsx` 5, `GoogleIcon.tsx` 5. E-Mail-Templates: 102 Hex.

### 4. Schriften

- `src/app/layout.tsx`: L2 Import aus `next/font/google`. L19–23 Inter (`--font-inter`). L25–29 Plus Jakarta Sans (`--font-jakarta`). L105 Variablen auf `<html>`. L113 `font-sans` am `<body>`.
- globals.css `@theme` L40–42: `--font-sans` → Inter, `--font-display`/`--font-heading` → Jakarta. L61 Body. L67–68 h1–h6.
- Klassen: `font-display` 43×, `font-sans` 2×, `font-mono` 11× (Tailwind-Default-Mono, nicht Plex), `font-heading` 0×. Gewichte: font-black 870, font-bold 496, font-semibold 99, font-medium 40, font-extrabold 5, font-normal 8.
- tokens.css L150–151 (`--font-family-display`/`-body`): 0 Nutzung.
- `src/app/fonts/` existiert nicht. Im Repo gibt es keine woff2/woff/ttf/otf/eot-Datei und keine Lizenzdatei (ohne node_modules).
- Archivo und IBM Plex Mono kommen nicht in src/ oder public/ vor. Nur in `_relaunch/richtungen/A/index.html` (eingebettet, siehe 7), `B/index.html` und `C/index.html`. `SCHRIFTEN-POOL.md` verweist auf `_relaunch/cache/schriften/…` (OFL-1.1, Fontsource). Dieses Verzeichnis existiert nicht. OFFENE FRAGE: Lizenzdateien fehlen.

### 5. `docs/DESIGN_SYSTEM.md` (50 Zeilen) gegen den Code

1. Stil „Clean Architectural Ceramic Light“, Smaragd-Primär, Sky, Bernstein (L1–4). **Abweichung:** Code ist Orange/Rot „Tile-Craft“.
2. Tokens in tokens.css plus Tailwind-@theme (L6–7). Dateien stimmen, aber Mint- und Sky-Tokens existieren nicht. **Abweichung.**
3. Radius-Tokens `--radius-ceramic-*` (L8–10). **Nicht vorhanden.** Tatsächlich `--radius-base`, `--radius-tile-*`, `--radius-16`, `--radius-full`.
4. `primary` = Smaragd, `secondary` = Sky (L11–12). **Abweichung:** primary = Orange, secondary = Rot (globals L13–38).
5. Canvas `#FFFFFF`, `#F8FAFC`, `#F1F5F9` (L18). **Abweichung:** Body `#FAFAFA` (globals L50, L59).
6. Primär-CTA `#047857`, Links emerald-800/sky-800 (L21–22). **Abweichung:** `btn-primary` `#C2410C` (L170), Links `#9A3412` (L253).
7. „Nie slate-400/500 für Text“ (L20). **Verletzt:** `text-slate-400`/`-500` 8×.
8. `eyebrow-sky` (L29). **Fehlt** in globals.css, 7 Verwendungen. Außerdem „All-Caps“, aber kein `text-transform` in L120–133.
9. „Pill-CTAs“ (L30). **Abweichung:** 14 px Radius (L160).
10. Formensprache: Karten `rounded-2xl` bis `[2rem]`, Pills `rounded-full` (L42). **Abweichung:** `rounded-tile-*` (487, undefiniert) dominiert. Fokus-Outline „Smaragd“ (L44) ist im Code `#EA580C` (L78–81).
- Stimmt: Referenzdateien in L37–38 existieren, ebenso `tezgel-logo.svg`, `tezgel-mark.svg`, `company.js`, `reviews.js`. **Fehlt:** `src/app/icon.svg` (vorhanden: `icon.png`, `apple-icon.png`).

### 6. Dunkelmodus

- **0** `dark:`-Varianten in src. Die Treffer „dark“ sind nur Tokennamen (`--color-primary-dark` globals L14, `--color-whatsapp-dark` tokens L53).
- Kein `prefers-color-scheme` in src.
- Festgelegt auf hell: `color-scheme: light` (globals L52), `colorScheme: 'light'` (`layout.tsx` L94).
- E-Mail-Template `customerEmail.ts` L309–310 deklariert `light dark`. Das betrifft E-Mails, nicht die Website.

### 7. `_relaunch/richtungen/A/index.html` (818 Zeilen, 338 KB) und `NOTIZ.md` (90 Zeilen)

**CSS-Variablen** (`:root` L14–63, Medien L64–65):
- Farbe L16–26: `--c-kalk`, `--c-fliese`, `--c-fuge`, `--c-strich`, `--c-tinte-2`, `--c-tinte`, `--c-laser`, `--c-laser-tief`, `--c-abnahme`, `--c-nacht-2`, `--c-nacht-fuge` (11)
- Abstand L29–30: `--s-fuge`, `--s-1` bis `--s-10`
- Typografie L33–41: `--fs-1` bis `--fs-7` (clamp), `--lh-*` (4), `--breite-anzeige` 74%, `--gewicht-anzeige` 760
- Bewegung L44–51: `--dur-1` bis `--dur-5` (140 bis 1200 ms), `--ease-laser`, `--ease-setzen`, `--ease-rueck`
- Kanten/Linien/Schatten L54–56: `--r-0`, `--r-1`, `--line-1` bis `-3`, `--schatten-0`, `--schatten-1`
- Satzspiegel L59–62, L64–65: `--seite`, `--mass`, `--rand`, `--spalten`, `--bleed`, `--kreuz`, `--logo-h`, `--spalte-*`, `--font-text`, `--font-mono`
- Lokal: `--versatz` (L445–447, Werte −14/10/−7 px), `--n` (L588–596), `--i` (L630–648)

**Schriften:** base64-woff2 eingebettet. L10 Archivo (`font-weight` 100–900, `font-stretch` 62–125%), L11 IBM Plex Mono 400. Beide mit `font-display: swap`. Keine externen Requests. Keine `unicode-range`, daher ist das Subset nicht prüfbar (NOTIZ sagt „latin“, OFFENE FRAGE). Die Zeilenlängen (ca. 120.300 bzw. 19.750 Zeichen) passen zu den 90 KB und 15 KB in NOTIZ.

**SVG-Motive:**
- Symbol-Sprite L377–413 mit 11 Symbolen (L379–389): `i-kreuz`, `i-telefon`, `i-chat`, `i-bad`, `i-format`, `i-abdichtung`, `i-ort`, `i-menue`, `i-pfeil`, `i-haken`, `i-versatz`. NOTIZ nennt 6 Icons. Verwendung: `kreuz` 7×, `telefon` 3×, `chat` 2×, `format` 2×, `haken` 2×, `versatz` 2×, die übrigen 1×.
- Plan-Motiv `#plan` L393–412 (Schraffur L391). Verwendet in L459–463 (Einstieg) und L717–725 (Blatt 7).
- Konstruktionsraster L673–682, Fugenlinien-Trenner L703–707 (ersetzt `<hr>`), Muster Kreuzfuge, Halbverband, Drittelverband L710–713.
- Laser-Elemente `.laser-v` (L443), `.laser-h` (L446), `.kreuz` (L446).
- Logos: zwei eingebettete PNG (L419 Header, L574 Palette-Blatt), keine SVG.

**Bewegungen:**
- Register L770–779 mit 10 Kennungen. Nutzung im Markup: `knopf-linie` 10×, `einstieg-laser` 7×, `einstieg-flucht` 5×, `ablauf-schritt` 5×, `ablauf-kreuz` 4×, `ablauf-achse` 3×, `einstieg-kreuz` 3×, `feld-status` 3×, `menue` 1×, `senden-laedt` 1×.
- `@keyframes einblenden` (L339–340, 320 ms) und `scan` (L350–351, 1200 ms, infinite alternate, nur ohne Reduktion).
- CSS-Transitionen L83–112, L166–176, L284–293. Reduktion L91, L107, L166, L284, L290.
- JS L790–816: `requestAnimationFrame` setzt `ist-bereit` (L793). `IntersectionObserver` mit Schwelle 0.3 auf `[data-beobachten]` (L796–799, Blatt 6). Menütoggle (L801–803). Formular: Prüfung auf mindestens 6 Ziffern, Ladezustand, Erfolgsmeldung nach 1600 ms (L805–814), ohne echten Versand.
- NOTIZ-Abgleich: „≤ 14 px, 800 ms“ bestätigt (L173, Verzögerung 660 ms). Die Pixelmessung der Achse (340,90 px) ist hier nicht prüfbar.

### 8. Offene Fragen

- **OFFENE FRAGE 1:** Erzeugen Tailwind-Klassen ohne `@theme`-Definition (`rounded-tile-*`, `shadow-tile`, `via-neutral-850`) und `bg-gradient-*` im Build tatsächlich CSS? Ohne `node_modules` und `.next` nicht geprüft.
- **OFFENE FRAGE 2:** Lizenzdateien für Archivo und IBM Plex Mono. Der Schriftenpool verweist auf ein nicht vorhandenes Verzeichnis.
- **OFFENE FRAGE 3:** Subset der eingebetteten woff2 in Richtung A (latin?).
- **OFFENE FRAGE 4:** `animate-fade-in` und `fadeIn` sind im Repo nicht definiert. Vermutlich wirkungslos, aber nicht geprüft.
- Die Zählungen umfassen alle Dateien unter `src/`, auch nicht importierte Komponenten. Die Erreichbarkeit über Navigation wurde nicht geprüft.
