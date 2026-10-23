# E1-PLANPRUEFUNG-technik-gestaltung

Kundschafter-/Prüferbericht aus der Planungsphase (10.10.2026, nur lesend, Arbeitsmodell bzw. Orchestrator-Unteragent). Stand: Commit 2362a5a.

**Prüfung: Technik- und Gestaltungsrisiken im Werkstatt-Plan**

**(1) Schwachstellen und (2) Verbesserungen**

**S1 · Konflikt zwischen alten und neuen Tokens** (E-004; /home/user/tezgel/src/app/layout.tsx:3, /home/user/tezgel/src/styles/tokens.css:133–145, 187–188)
- **Befund:** `tokens.css` wird ohne Layer geladen, Tailwinds `@theme` landet in `@layer theme`. CSS ohne Layer gewinnt immer. Jede gleichnamige Variable überschreibt neue Tokens unbemerkt, etwa `--color-red-500/600` (wird Orange), `--color-slate/neutral/orange-*` und `--spacing-*`.
- **Befund:** Tailwind 4 gibt nur genutzte Theme-Variablen aus. `var(--color-laser)` in SVG- oder Bewegungs-CSS kann deshalb leer bleiben.
- **Verbesserung:** `tokens.css` aus `layout.tsx` entfernen und in `globals.css` per `@import … layer(alt)` mit `@layer alt, theme, base, components, utilities;` einbinden. KERN-Tokens als `@theme static` anlegen, mit einer einzigen Quelle (nicht `--k-kalk` und `--color-kalk` nebeneinander).

**S2 · Z-03 ist mit den geplanten Mitteln nicht durchsetzbar** (E-004)
- **Befund:** Tailwind 4 hat keinen `--duration-*`-Namensraum. Haiku landet daher bei `duration-300` oder `[…]`.
- **Befund:** 44-px-Ziele (/home/user/tezgel/_relaunch/KERN.md:99, Stufe 11) und 20-px-Icons (Stufe 5) liegen außerhalb der Skala.
- **Befund:** Klassen ohne Wirkung findet keine Wertesuche (Vorbild: 487× `rounded-tile-*`).
- **Verbesserung:** In KERN v2 `@utility dauer-*` und `kurve-*` anlegen. Die Skala gilt nur für margin, padding und gap; Größen bekommen eigene Tokens. Schriftstufen werden `--text-fs-N` mit Untertokens für Zeilenhöhe, Laufweite und Gewicht.
- **Verbesserung:** `werte.mjs` kompiliert die Klassen mit Tailwind selbst und meldet Klassen ohne CSS sowie Deklarationen ohne Systemvariable.

**S3 · Schriften** (E2-OPUS-01)
- **Befund:** `adjustFontFallback` misst die Standardinstanz (wdth 100, wght 400) gegen `local("Arial")`.
  - Auf Android gibt es kein Arial, dort wirkt die Anpassung nicht.
  - Für den Anzeigeschnitt (wdth 74, wght 760) sind die Werte falsch. Die H1 bricht beim Schrifttausch anders um, das erzeugt CLS mobil.
- **Befund:** Ohne `font-stretch`-Bereich im `@font-face` wird 74 % auf 100 % geklemmt.
- **Befund:** „ß prüfen“ greift zu kurz. Diese Zeichen fehlen in den Latin-Teilmengen:
  - `≤` in Mono-Messwerten (/home/user/tezgel/src/app/untergrund-abdichtung/estrich-belegreife/page.jsx:203)
  - `㎡` im unantastbaren Datenmodell /home/user/tezgel/src/config/musterbaeder.js:13
  - `★` und `→`
- **Verbesserung:**
  - `adjustFontFallback: false` und eigene Ersatzschriften (Arial, Roboto), getrennt für Text und Anzeige.
  - `font-stretch: 62% 125%` über `declarations`.
  - Nur Archivo-latin vorladen, Plex Mono mit `preload: false`.
  - Glyphenabdeckung von `texte-index.json` gegen beide woff2 automatisch prüfen.
  - `hyphens: none` umstellen (globals.css:54).

**S4 · Sichtbarkeit im Bewegungsmodul** (E-005)
- **Befund:** Setzt das 2-s-Limit `k-bereit` in jedem Fall, sind danach alle Auftritte unterhalb des ersten Bildschirms schon sichtbar.
- **Befund:** Zustände, die per `classList` gesetzt werden, löscht ein React-Re-Render (Funnels). Inhalt verschwindet dann wieder.
- **Befund:** Nach einem Seitenwechsel ohne Neuladen erkennt nichts die neuen Elemente.
- **Befund:** Chrome zählt Elemente, die von opacity 0 aus erscheinen, neu als LCP-Kandidaten.
- **Befund:** `globals.css:83–92` (`0.01ms !important`) überstimmt die im Register vorgesehene Überblendung bei reduzierter Bewegung.
- **Verbesserung:**
  - Das Limit liegt im Head-Skript und greift nur, wenn das Modul nicht „bereit“ meldet.
  - Den Zustand in einem `data-`Attribut halten, das React nicht verwaltet.
  - Bei jedem Seitenwechsel neu nach Elementen suchen.
  - Im ersten Bildschirm nur Versatz, nie Deckkraft < 1.
  - `@media print` hebt die Startzustände auf.
  - Die Altregel streichen.

**S5 · Scroll-Szenen** (E-007; /home/user/tezgel/_relaunch/ENTSCHEIDUNGEN.md:83)
- **Befund:** Das übernommene E-009 zeichnet Linien per `stroke-dashoffset`.
  - Das widerspricht K-009 („nur transform und opacity“).
  - Es läuft auf dem Hauptthread und gefährdet Z-05 (≤ 5 % verworfene Bilder bei 4× CPU).
- **Befund:** Safari vor 26 und Firefox kennen kein `animation-timeline`. Ältere iPhones der Zielgruppe sehen nur den Ersatz, und den schaut keine Abnahme an.
- **Verbesserung:** Jeder Zustand wird eine eigene Ebene (HTML oder `<svg>`-Wurzel), animiert mit `scale` und `opacity`. Der Zweig `@supports not (animation-timeline: view())` ist identisch mit dem Zustand bei reduzierter Bewegung, damit ihn die Fotos (reducedMotion) mit abdecken.

**S6 · Menü ohne JavaScript** (V-06, E2-OPUS-05)
- **Befund:** Der Plan legt keine Technik fest. F-13 verlangt einen `dialog` namens „Hauptnavigation“ und einen Schalter mit `aria-expanded` (/home/user/tezgel/_relaunch/werkzeuge/tests/funktion-navigation.spec.mjs:11–18). Mit `<details>` bräche Z-02.
- **Verbesserung:**
  - Popover-API (`popover` + `popovertarget`): vor der Hydrierung bedienbar, Escape schließt nativ.
  - `role="dialog"` am Menü; React spiegelt `aria-expanded` über `onToggle`.
  - Für Safari 16.4 (steht in der browserslist) ein Rückfall `href="#seitenindex"`.
  - Die Oberpunkte des Mega-Menüs bleiben echte Links.

**S7 · Seitenwechsel mit `<ViewTransition>`** (E-007)
- **Befund:** Der App Router setzt Scroll und Fokus selbst. „Nicht bei Zurück“ braucht eine eigene popstate-Erkennung.
- **Befund:** Mobil liegt der Plan auf `/leistungen/bad` womöglich unterhalb des Bildschirms, der Übergang zielt dann ins Leere.
- **Befund:** Die Wischgeste auf iOS plus Übergang ergibt eine doppelte Animation.
- **Verbesserung:** Das gemeinsame Element nur ab `lg` und nur bei Vorwärts-Navigation. Fokus erst nach `finished` mit `preventScroll`, die h1 bekommt `tabIndex={-1}`.

**S8 · Große Momente gegen KERN und Zielgruppe** (E2-OPUS-06)
- **Befund:** `/` bekommt fünf Momente. KERN erlaubt einen je Seite (/home/user/tezgel/_relaunch/KERN.md:153) und einen roten Blickfang je Bildschirmhöhe; die dauerhaft rote Achse verbraucht diesen allein.
- **Befund:** Mobil sitzt die Achse bei `--k-rand − 1px` (KERN.md:97). Sie klebt am Text und wirkt wie ein Fehlerrand.
- **Befund:** Das Anfahrts-Lineal steht auf schwachen Daten.
  - /home/user/tezgel/src/config/cities.ts:4 misst ab Wetzlar; Aßlar liegt bei 5 km (Zeile 111).
  - Die Werte sind auf 5 km gerundet und doppeln sich (25, 35, 40). Bei 390 px kollidieren die Beschriftungen.
  - Das Maßband täuscht Genauigkeit vor und besteht die Austauschprobe kaum.
- **Befund:** SIG-3 reagiert nur auf Hover oder Fokus und ist mobil unsichtbar.
- **Verbesserung:**
  - Die Achse wird eine Fuge-graue Grundschicht im Seitenfluss (nicht `fixed`); rot ist nur das gezogene Stück; mobil mindestens 8 px Abstand zum Text.
  - In KERN v2 die Regel „ein Moment mit Gewicht je Bildschirmhöhe“.
  - Das Lineal wird ein Fugenband mit Zonen (≤ 10, 25, 50 km); eine Linkliste ist die Hauptform.
  - SIG-3 mobil per IntersectionObserver auslösen.

**S9 · Formsystem und Bilder** (Mengengerüst; E2-GRAF-01/02)
- **Befund:** Die 12 Themenpläne haben keinen Urheber. Die markentragenden Fachzeichen gehen an Haiku.
- **Befund:** KERN.md:105 (nur 2:1 oder 1:1, kein Beschnitt) passt nicht zu Fotos mit 2816×1536 und 3712×4608. Es gibt kein Paket für ein Bildfeld.
- **Verbesserung:**
  - Opus liefert in E2-OPUS-03 alle Planvorgaben als Daten und alle zehn Fachzeichen; Haiku baut nur die UI-Icons.
  - Den Verband-Umschalter als Radiogruppe mit `:has()` bauen, ohne JavaScript.
  - Das Sprite per `import sprite from './sprite.svg'` einbinden: gehashte Adresse, unbegrenzt cachebar, keine IDs im DOM. Unter `public/` bekäme die Datei `max-age=0`.
  - Ein Bildfeld in E2-OPUS-04: Seitenverhältnis der Datei, ganze Spalten, `sizes`, `preload` nur für das LCP-Bild.

**S10 · Ursache des langsamen LCP ist nicht belegt**
- **Befund:** Auf `/` liegt FCP bei 1,36 s, LCP bei 3,41 s (/home/user/tezgel/_relaunch/belege/p0-ausgangsstand/lighthouse.json). Das deutet auf ein spät erscheinendes Element.
- **Verdacht:**
  - das Banner, geladen mit `ssr:false` (/home/user/tezgel/src/components/layout/ClientWidgets.tsx:8)
  - auf `/blog` ein Bild mit `priority` (/home/user/tezgel/src/app/blog/page.jsx:134)
- **Verbesserung:** E0-PRUEF-03 schreibt das LCP-Element je Hauptansicht mit. Die Textfläche des Banners bleibt mobil kleiner als die H1. Vor dem Median läuft ein Aufwärmlauf.

**(3) Gut, sollte bleiben**
- Das System wird global eingeführt (E-004), die Basisklassen werden früh umgefärbt.
- Bewegung CSS-first ohne Erkennung von Testumgebungen; Endzustände entstehen nur über reduzierte Bewegung und das Zeitlimit.
- Große Momente baut Opus als Komponenten, Haiku die Seiten drumherum; gemeinsame Dateien schreibt nur der Orchestrator.
- Die Ablauf-Szene zeigt ohne Animation alle drei Zustände; 3D/Shader sind begründet verworfen.
- Altsysteme werden erst bei null Treffern entfernt; V-01 bis V-06 sind Pflicht.

### Critical Files for Implementation
- /home/user/tezgel/src/app/globals.css
- /home/user/tezgel/src/styles/tokens.css
- /home/user/tezgel/src/app/layout.tsx
- /home/user/tezgel/src/components/layout/HeaderWrapper.tsx
- /home/user/tezgel/_relaunch/KERN.md
