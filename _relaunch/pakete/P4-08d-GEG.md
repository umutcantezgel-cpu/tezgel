# P4-08d-GEG · Gegenprüfung Listen-Hook F-16 Blog · Stufe 3 · Modell: Opus (frisch) · Schreibrechte: `_relaunch/pakete/P4-08d-GEG.rueckgabe.md` · Kriterium: Z-03 (G9)

## Rolle
Du bist frischer Gegenprüfer. Deine Aufgabe ist es, eine Verhaltensänderung **zu finden**. Gehe davon aus, dass es eine gibt, bis du sie ausgeschlossen hast. Das Paket P4-08d hat die Listenlogik der Live-Seite `/blog` in einen Hook verschoben. Jede Abweichung trifft echte Besucher (Suche, Kategorien, Hervorhebung, Leerzustand).

## Umfang
- **Alte Fassung:** `git show "HEAD:src/app/(bestand)/blog/page.jsx"`.
- **Neue Fassung (Arbeitsbaum, nicht committet):** `src/app/(bestand)/blog/page.jsx`, `src/lib/formulare/useBlogListe.ts`.
- **Selbstauskunft des Pakets:** `_relaunch/pakete/P4-08d.rueckgabe.md`. Sie ist eine Behauptung, kein Beleg.
- **Nur zur Einordnung:** die Kern-Ansichten unter `src/components/kern/seiten/blog/*` und der Entwurf `src/app/(kern)/_entwurf/blog/`. Sie ruhen und werden nicht ausgeliefert. Prüfe nur, dass sie den Hook nicht verändern (keine Mutation der Rückgaben) und dass der eigene `ContentProvider` der Kern-Insel denselben Inhalt liefert wie im Bestand.

## Zu prüfen
1. **Logik:** alt (Komponente) gegen Hook, blockweise und Zeichen für Zeichen:
   - Konstanten, Startwerte, Setzer, Ableitungen
   - Suche (Vergleich, Groß-/Kleinschreibung), Kategorien, Hervorhebung, Sortierung, Leerzustand, Zähler
   - Inhaltskontext (`ContentProvider`/Overrides), Datenquelle, Sortierung
2. **Typangaben** (`as string`, `as Error`, `SubmitEvent`, `submitter`): Ändert eine davon die Laufzeit? Achte besonders auf Vorrang, Klammerung, `parseFloat`/`Number` und Rundung.
3. **Inline-Handler, die in den Hook gewandert sind** (laut Rückgabe):
   - Gleiche Reihenfolge der Setzer?
   - Gleiche Closure, also derselbe Render-Zustand?
   - Werden Eingabewerte gleich umgewandelt wie vorher?
4. **Markup:** alt gegen neu über `git diff HEAD -- <datei>`.
   - Ist jeder im Markup verwendete Bezeichner destrukturiert?
   - Ist jede Hook-Rückgabe identisch mit dem alten lokalen Wert (Wert gegen Funktion, gleicher Name)?
   - Fehlt ein Import, oder ist einer zu viel?
5. **Hook-Folge** der Komponente (`useState`-Reihenfolge, Effekte): Bleibt sie gleich? Ändert sich die Identität von Callbacks so, dass ein Kind anders rendert?
6. **Server/Client-Grenze:** Die Hooks haben kein `'use client'`. Prüfe, dass sie nur aus Client-Komponenten importiert werden (`grep -rn "useBlogListe" src`). Lies dazu `node_modules/next/dist/docs/01-app/02-guides/server-and-client-boundary.md` (Next 16; die Fassung weicht von deinem Training ab).
7. **Gegenprobe der Befundliste:** Die Rückgabe nennt Befunde (z. B. Suche ohne `trim`, Ersatz-Lesezeit, zwei Hervorhebungen, Sidebar filtert selbst). Bestätige an der alten Fassung, dass jeder davon auch alt so war, also nicht durch das Paket entstanden ist.

## Verbote
- Kein `next build`, `next start`, `next dev`, kein `npm install`.
- Keine POST-Anfrage, kein Formular absenden, keine Mail, kein Netz außer Lesen im Repo.
- Kein git mit Schreibwirkung (kein add, commit, stash, checkout, restore).
- Keine Datei ändern außer deiner Rückgabe.
- Andere Agenten arbeiten parallel im Arbeitsbaum (Hauptseiten-Entwürfe P4-08a/b/c/e/f). Fasse deren Dateien nicht an.

## Rückgabe (`_relaunch/pakete/P4-08d-GEG.rueckgabe.md`, Deutsch, ohne Fachjargon wo möglich)
- **Urteil:** „Verhalten gleich: ja“ oder „nein“ (mit Fundstelle).
- **Befunde** mit Schwere (hoch/mittel/niedrig), Datei:Zeile und Szenario (Eingabe → abweichendes Ergebnis).
- **Bestätigung der Altbefunde:** je Zeile „alt ebenso“ oder „neu entstanden“.
- **Vorgehen:** kurz, was du gelesen und verglichen hast.
Gib als letzte Nachricht nur eine Zusammenfassung von höchstens 8 Zeilen zurück.
