# E3-BAU-09 · Rückgabe · Baumeister (Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/blog/page.jsx`: Server-Komponente ohne "use client", Kopf, Abschnitt, Insel, QualityPromise.
- `src/components/blog/BlogFilter.jsx` (neu): Client-Insel mit Hook, Suche, Kategorien, Hervorhebung, Liste, Leerzustand, Seitenleiste.
- `src/components/blog/BlogCard.jsx`: Zeile an der Fuge statt Schattenkarte.
- `src/components/blog/BlogSidebar.jsx`: Felder und Zeilen statt Glaskarten.
- `_werkstatt/pakete/E3-BAU-09.rueckgabe.md` (diese Datei).

## WAS UND WARUM
- Schritt 2 (Verschiebung, wortgleich nach `BlogFilter.jsx`): Lauf E3-BAU-09-V grün.
- Kopf: `Einstieg` art="arbeit", H1 `text-fs-6`, Etikett, Vorspann, zwei Knöpfe. Glows, `ceramic-*`, `eyebrow`, `btn-*` entfallen.
- Liste: Zeilen an der Fuge nach RatgeberListe-Muster (`ul`/`li`). Bild quadratisch (96 px mobil, 128 px ab md, `object-cover`, Maße wie im Bestand). Kennzeile in Mono in Bestandsfolge: Kategorie, Lesezeit, Datum. Titel-Link wie im Bestand, dazu Auszug und „Artikel lesen“.
- Hervorhebung: Feld mit Fuge, Link umschließt wie im Bestand. „Empfohlener Leitfaden“ als Mono-Etikett statt Pille auf dem Bild.
- Suche und Kategorien: Klassen aus `kern/stile.ts` (`feldKlassen`, `wahlKlassen`). Gedrückte Kategorie zusätzlich mit Fugenkreuz bzw. Pfeil, nicht nur Farbe. Mobil umbrechende Knopfzeile statt Wischzeile.
- Seitenleiste: 4/12 ab lg statt fester 320 px. Kategorie-Zeilen mit `aria-pressed`, CTA mit `Knopf` (`data-motion="druck"`).
- Icons nur über `Icon`, keine lucide- oder Phosphor-Importe. Kategorie-Icons entfallen (siehe OFFENE FRAGEN).
- Keine neue Bewegung: Lift, Zoom und Pfeilverschiebung entfernt. Zustand über Fuge, Strich und Fliese.
- Unverändert: Hook, `useContent`-Zugriffe, Filterlogik, Links, IDs, ARIA-Namen, `aria-pressed`, Leerzustand, Textreihenfolge.
- Mikrotexte alt zu neu: keine.

## GEMEINSAME DATEIEN
- Keine Änderung nötig.
- Optionaler Wunsch: `src/components/kern/RatgeberListe.tsx` um ein optionales Bildfeld erweitern (`bild?: { src, alt, breite, hoehe }`, Rahmen `size-24 md:size-32` links vor dem Text). Danach könnte `BlogCard.jsx` den Baustein nutzen. Nicht umgesetzt.
- Außerhalb meiner Dateien: Kopf und Fuß weichen von E0 ab („Aufmaß anfragen“ statt „buchen“, Fußzeilen, `wa.me`-Link). Ursache: Layout anderer Pakete.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A, Endlauf E3-BAU-09: GRÜN. tsc: 0 Fehler (eigene 0, übrige 0). eslint: 0 Fehler, 0 Warnungen. funktion-navigation: erwartet 41, unerwartet 0, flaky 0, 5 per Spec übersprungen. Bilder /blog: HTTP 200, Konsole 0, Überlauf 0. Textvergleich GRÜN, unerlaubt entfernte Spannen 0, Hauptbereich ohne Abweichung zu E0.
- Überlappung: m390 0, d1440 2 (sticky Seitenleiste gegen fixierten Kopf im Vollbild). HEAD auf 4310 zeigt dieselben 2, also vorbestehend.
- `werte.mjs`: 0 Befunde (4 Dateien, 223 Klassenvorkommen).
- Textprobe gegen Start-HEAD 7f28abd: ENTFERNT 0. HINZU nur Icon-Namen (`A:name=…`).
- `bezeichner.cjs`: leer in allen vier Dateien.
- Git: nur meine vier Dateien und diese Rückgabe geändert; fremde Änderungen (u. a. `[slug]/page.jsx`, `ReadingProgress.jsx`, Funnel-Dateien) unberührt.
- Commit-Stand: HEAD ist f12978c, der Zwischenstand der Verschiebung (nicht von mir). Die Gestaltung liegt unkommittiert im Arbeitsbaum. Kein Commit, kein Push, kein Build, keine Server-Änderung, nur GET-Anfragen.

## BILDBELEGE
Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-09/`:
- `bilder/blog/d1440.jpg`, `bilder/blog/m390.jpg` (Kopf, Hervorhebung, Seitenleiste)
- `scroll/a/m390.jpg` (Hervorhebung mobil), `scroll/b/m390.jpg` (Liste mobil), `scroll/d/d1440.jpg`, `scroll/f/d1440.jpg` (Liste und Seitenleiste)
- `basis-4310/d1440.jpg` (HEAD-Vergleich)

## OFFENE FRAGEN
1. Tab-Reihenfolge (Lehre 7): Desktop-Suche und Kategorien stehen im Dokument nach der Liste, wie im Bestand. Vorschlag: Suche über die Liste wie `kern/seiten/blog/Filter.tsx`. Freigabe nötig, bis dahin bleibt die Lesefolge.
2. Suchfelder ohne sichtbare Beschriftung (Systemregel Formulare). Vorschlag: sichtbare Labels „Ratgeber durchsuchen“ und „Artikel suchen“. Mikrotext-Änderung, nicht umgesetzt.
3. Kategorie-Icons (lucide im Bestand) entfallen. Falls gewünscht: bad→`bad`, fliesen→`fliese`, untergrund→`abdichtung`, aussen→`balkon`, ratgeber und news→`dokument`, pflege ohne Icon.
4. Mobil brechen die Kategorie-Knöpfe in etwa fünf Zeilen um (Bestand: waagerechte Wischzeile). Entscheidung offen.
5. Bildgenerator-Zeichen: `kern/seiten/blog/bilder.ts` nennt vier Bilder mit Zeichen unten rechts und setzt dort `contain`. Hier gilt wie im Bestand `cover`. In der 128-px-Miniatur (Stichprobe „Rutschfeste Fliesen“) nicht erkennbar. Vollformat-Prüfung offen.
6. Zwei Fassungen der Liste bestehen parallel (Kern v1.2: `kern/seiten/blog/*`, `vorlagen/liste/*`, `(kern)/_entwurf/blog`). Abgleich offen.
