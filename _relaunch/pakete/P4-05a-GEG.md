# P4-05a-GEG · Gegenprüfung Formular-Hooks F-04 BadanfrageFunnel, F-05 BadProjektCheck · Stufe 3 · Modell: Opus (frisch) · Schreibrechte: `_relaunch/pakete/P4-05a-GEG.rueckgabe.md` · Kriterium: Z-03 (G9)

## Rolle
Du bist frischer Gegenprüfer. Deine Aufgabe ist es, eine Verhaltensänderung **zu finden**. Gehe davon aus, dass es eine gibt, bis du sie ausgeschlossen hast. Das Paket P4-05a hat die Logik zweier Live-Formulare in Hooks verschoben. Die Formulare laufen auf www.tezgel.de (`/bad`, `/bad/badanfrage`, `/bad/projekt-check`, `/bad/badsanierung`, Musterbad-Seiten); jede Abweichung trifft echte Anfragen.

## Umfang
- **Alte Fassung:** `git show HEAD:src/components/funnels/BadanfrageFunnel.jsx` und `git show HEAD:src/components/funnels/BadProjektCheck.jsx`.
- **Neue Fassung (Arbeitsbaum, nicht committet):** `src/components/funnels/BadanfrageFunnel.jsx`, `src/components/funnels/BadProjektCheck.jsx`, `src/lib/formulare/useBadanfrage.ts`, `src/lib/formulare/useProjektCheck.ts`.
- **Selbstauskunft des Pakets:** `_relaunch/pakete/P4-05a.rueckgabe.md`. Sie ist eine Behauptung, kein Beleg.
- **Nur zur Einordnung:** die Kern-Ansichten unter `src/components/kern/formulare/` (`Badanfrage.tsx`, `ProjektCheck.tsx`, `c/*`) und die Vorschau `src/app/(kern)/_entwurf/p4-05a/`. Sie ruhen und werden nicht ausgeliefert. Prüfe nur, dass sie die Hooks nicht verändern (keine Mutation von Hook-Rückgaben, keine eigene Nutzlast) und nichts senden außer über die Hook-Handler.

## Zu prüfen (je Formular)
1. **Logik:** alt (Komponente) gegen Hook, blockweise und Zeichen für Zeichen:
   - Konstanten, Startwerte, Setzer, Ableitungen
   - WhatsApp-Text und -Ziel
   - Prüfungen, Nutzlast (`badDetails`, `projektCheckDetails`), Honeypot, Fehlertexte, `finally`
   - Referenz-ID, Reset-Handler
2. **Typangaben** (`as string`, `as Error`, `SubmitEvent`, `submitter`): Ändert eine davon die Laufzeit? Achte besonders auf Vorrang und Klammerung bei `submitter && … ? … : …` und auf `parseFloat`.
3. **Inline-Handler, die in den Hook gewandert sind** (`handleNewRequest`, `handleBackFromWhatsApp`, `changeSqm`):
   - Gleiche Reihenfolge der Setzer?
   - Gleiche Closure, also derselbe Render-Zustand?
   - `changeSqm(e.target.value)`: Wird die Zeichenkette gleich umgewandelt wie vorher `parseFloat(e.target.value)`?
4. **Markup:** alt gegen neu über `git diff HEAD -- <datei>`.
   - Ist jeder im Markup verwendete Bezeichner destrukturiert?
   - Ist jede Hook-Rückgabe identisch mit dem alten lokalen Wert (Wert gegen Funktion, gleicher Name)?
   - Fehlt ein Import, oder ist einer zu viel?
5. **Hook-Folge** der Komponente (`useState`-Reihenfolge, Effekte): Bleibt sie gleich? Ändert sich die Identität von Callbacks so, dass ein Kind anders rendert?
6. **Server/Client-Grenze:** Die Hooks haben kein `'use client'`. Prüfe, dass sie nur aus Client-Komponenten importiert werden (`grep -rn "useBadanfrage\|useProjektCheck" src`). Lies dazu `node_modules/next/dist/docs/01-app/02-guides/server-and-client-boundary.md` (Next 16; die Fassung weicht von deinem Training ab).
7. **Gegenprobe der Befundliste:** Die Rückgabe nennt 11 Befunde (z. B. „kein `_t`“, „kein Honeypot in F-05“). Bestätige an der alten Fassung, dass jeder davon auch alt so war, also nicht durch das Paket entstanden ist.

## Verbote
- Kein `next build`, `next start`, `next dev`, kein `npm install`.
- Keine POST-Anfrage, kein Formular absenden, keine Mail, kein Netz außer Lesen im Repo.
- Kein git mit Schreibwirkung (kein add, commit, stash, checkout, restore).
- Keine Datei ändern außer deiner Rückgabe.
- Andere Agenten arbeiten parallel im Arbeitsbaum (Icons, Vorlagen, Verlegepläne). Fasse deren Dateien nicht an.

## Rückgabe (`_relaunch/pakete/P4-05a-GEG.rueckgabe.md`, Deutsch, ohne Fachjargon wo möglich)
- **Urteil je Formular:** „Verhalten gleich: ja“ oder „nein“ (mit Fundstelle).
- **Befunde** mit Schwere (hoch/mittel/niedrig), Datei:Zeile und Szenario (Eingabe → abweichendes Ergebnis).
- **Bestätigung der 11 Altbefunde:** je Zeile „alt ebenso“ oder „neu entstanden“.
- **Vorgehen:** kurz, was du gelesen und verglichen hast.
Gib als letzte Nachricht nur eine Zusammenfassung von höchstens 8 Zeilen zurück.
