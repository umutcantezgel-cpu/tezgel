# Rückgabe E3-BAU-10 · Lesemodus /blog/[slug]

**GEÄNDERTE DATEIEN**
- `src/app/(bestand)/blog/[slug]/page.jsx`, `src/components/blog/ReadingProgress.jsx`, `TableOfContents.jsx`, `ShareButtons.jsx`, `BlogAuthorCard.jsx`, `RelatedPosts.jsx`, `BlogVoteButton.jsx`
- Hinweis: Diese Fassung steht bereits im Commit `23810e4` („ZWISCHENSTAND“, Autor Claude). Ich habe nichts committet, gepusht oder zurückgesetzt.

**WAS UND WARUM**
- Kopf nach dem Muster /kontakt: „Zurück zur Ratgeber-Übersicht“ bleibt erstes Element (Lesefolge), danach Mono-Etikett (Kategorie · Empfehlung, Trenner Fugenkreuz), H1 `text-fs-6`, Untertitel, Datum und Lesezeit in Mono. Von Hand gebaut, weil `Einstieg` den Rückweg hinter das Etikett stellen würde.
- Satzspiegel `max-w-mass`; Vorspann `text-fs-4` mit 2-px-Tinte-Linie; Fließtext `text-fs-3`; H2 `text-fs-5` mit Fuge, H3 `text-fs-4`; Listen an der Fuge mit Fugenkreuz; Links `linkKlassen`; Tabellen mit Mono-Kopf; Zitate in Tinte statt Rot.
- Schlagworte in Mono ohne Pillen. Rückmeldung und „Teilen“ zwischen Fugen. PDF-Knopf `knopfKlassen('haupt')` auf nativem `<a download>`, da `Knopf` interne Links ohne `download` rendert.
- Inhaltsverzeichnis: Etikett „Inhalt“, Zeilen an der Fuge (44 px), aktive Zeile mit 2-px-Tinte. `aria-current`, Beobachter und Klick unverändert; H3-Einzug per Klasse statt `style`.
- Teilen: Nebenknopf mit `aria-expanded`, Menü ohne Schatten. Markenlogos aus `ui/Markenlogos`; WhatsApp grün aus `ui/WhatsAppLogo` (ausdrücklicher Wunsch). Menü mobil links, am Desktop rechts ausgerichtet.
- Rückmeldung: Erfolg mit Haken und Text in `abnahme`, gesperrt wie bisher. Autor: Fläche Fliese mit Fuge, Social-Links 44 px. Weiterlesen: Liste an der Fuge, Bild 96 px, Titel als Link (Ebene `p` wie bisher), „Artikel lesen“.
- Lesefortschritt: 2-px-Linie in `laser`, Startzustand `scale-x-0`, Wert über `--lesefortschritt`; ohne Übergang und ohne `data-motion`. Prozentanzeige bleibt. Division durch 0 abgefangen.
- Entfernt: Leuchtkugeln, Glas, Schatten, Verläufe, `prose-ceramic`, `eyebrow`, `btn-*`, `text-xs`, `font-black`, Farben außerhalb des Systems, `style` außer CSS-Variablen, lucide- und Phosphor-Importe. Nach ZUORDNUNG entfallen Daumen-, Schlagwort-, Listen- und Kategorie-Icons.
- Inneres `<main>` durch `<div>` ersetzt; das Layout hat bereits `main#main-content`.
- Mikrotexte alt → neu: keine. Der Trenner „·“ ist durch das Fugenkreuz ersetzt.

**GEMEINSAME DATEIEN**
- `src/app/globals.css`, Block `@layer utilities` am Ende (nach `.spaet-zeichnen`) ergänzen:
```css
  /* Lesefortschritt (Ratgeber): Linie wächst mit --lesefortschritt (0–1), ohne Übergang */
  .lesefortschritt-linie { scale: var(--lesefortschritt, 0) 1; }
```
- Ohne diese Regel bleibt die Linie unsichtbar, ein falscher Vollbalken entsteht nicht. In `utilities` muss sie stehen, sonst gewinnt `scale-x-0`. Geprüft gegen 4320: ohne Regel 0 px, mit Regel 0 / 720 / 1440 px bei 0 / 50 / 100 %.

**PRÜFUNG UND ERGEBNIS**
- Textprobe je Datei: ENTFERNT 0, HINZU nur Icon-Namen. Bezeichner: nur Browser-Globale. `werte.mjs`: 0 Befunde.
- Prüfstufe A (`pruefe-a.sh E3-BAU-10 … -- /blog/rutschfeste-fliesen-r-klassen /blog/duschrinne-oder-punktablauf`): GESAMT GRÜN, Exit 0.
  - tsc: 0 Fehler. eslint: 0 Fehler, 0 Warnungen.
  - Funktionstests `funktion-navigation`: erwartet 41, unerwartet 0, flaky 0.
  - Bilder: HTTP 200, Konsole 0, Überlauf 0. Überlappung 0 bzw. 1 (sticky Inhaltsverzeichnis am Spaltenende). Produktion 4310 hatte 10, darunter dieselbe Stelle.
  - Textvergleich: GRÜN, entfernt 0, unerlaubt 0.
- Zusatz (Playwright gegen 4320 über `lib.mjs`): Teilen-Menü mobil x 16–190 px, kein horizontaler Überlauf. Rückmeldung vorher aktiv, nachher gesperrt. Inhaltsverzeichnis: alle 8 Einträge werden beim Scrollen aktiv, wie in 4310.

**BILDBELEGE** (Scratchpad `…/E3-BAU-10/`)
- `bilder/blog__rutschfeste-fliesen-r-klassen/` und `bilder/blog__duschrinne-oder-punktablauf/` (m390, d1440)
- Ganzseite: `voll/m390-voll.jpg`, `voll/d1440-voll.jpg`
- Teilen-Menü: `teilen/teilen-m390.png`, `teilen/teilen-d1440.png`; Rückmeldung: `verhalten/vote-vorher.png`, `verhalten/vote-erfolg.png`

**OFFENE FRAGEN**
1. Der Lesefortschritt bleibt unsichtbar, bis die Regel oben in `globals.css` steht.
2. Tabellen im Text haben keinen Namen; der Kern verlangt bei Überlauf eine benannte Region. Auf 390 px tritt kein Überlauf auf. Welche Namensregel?
3. Commit `23810e4` stammt nicht von mir. Bitte entscheiden, ob er so bleibt oder korrigiert wird.
4. Titel der Weiterlesen-Liste als `p` (bisher). Der Kern-Baustein `RatgeberListe` nutzt `h3`. Entscheidung?
5. Inneres `<main>` entfernt. Bitte bestätigen.
6. WhatsApp fehlt in `ui/Markenlogos` (Z-06).
7. Fremd, nicht geändert: Der Textvergleich meldet Unterschiede in Kopf und Fuß (u. a. „Aufmaß anfragen“, ein wa.me-Link). `config/blog.js` und `utils/iconMapper` importieren noch lucide-Icons.
