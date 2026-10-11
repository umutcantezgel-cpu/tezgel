# P4-05c-GEG · Gegenprüfung Formular-Hooks F-07 BookingCalendar, F-08 Termin-Formular · Stufe 3 · Modell: Opus (frisch) · Schreibrechte: `_relaunch/pakete/P4-05c-GEG.rueckgabe.md` · Kriterium: Z-03 (G9)

## Rolle
Du bist frischer Gegenprüfer. Deine Aufgabe ist es, eine Verhaltensänderung **zu finden**. Gehe davon aus, dass es eine gibt, bis du sie ausgeschlossen hast. Das Paket P4-05c hat die Logik zweier Live-Formulare in Hooks verschoben. Kalender und Termin-Formular laufen auf www.tezgel.de (`/termin`, `/kontakt#termin-buchen`); jede Abweichung trifft echte Terminanfragen.

## Umfang
- **Alte Fassung:** `git show HEAD:src/components/contact/BookingCalendar.tsx` und `git show "HEAD:src/app/(bestand)/termin/page.jsx"`.
- **Neue Fassung (Arbeitsbaum, nicht committet):** `src/components/contact/BookingCalendar.tsx`, `src/app/(bestand)/termin/page.jsx`, `src/lib/formulare/useTerminKalender.ts`, `src/lib/formulare/useTerminAnfrage.ts`.
- **Selbstauskunft des Pakets:** `_relaunch/pakete/P4-05c.rueckgabe.md`. Sie ist eine Behauptung, kein Beleg.
- **Nur zur Einordnung:** die Kern-Ansichten unter `src/components/kern/formulare/` (`TerminKalender.tsx`, `TerminAnfrage.tsx`, `e/*`) und die Vorschau `src/app/(kern)/_entwurf/p4-05c/`. Sie ruhen und werden nicht ausgeliefert. Prüfe nur, dass sie die Hooks nicht verändern (keine Mutation von Hook-Rückgaben, keine eigene Nutzlast) und nichts senden außer über die Hook-Handler.

## Zu prüfen
1. **Logik:** alt (Komponente) gegen Hook, blockweise und Zeichen für Zeichen:
   - Konstanten, Startwerte, Setzer, Ableitungen
   - Datums- und Slotlogik: Zeitzone, Wochentage, Sperrtage, Monatswechsel, Jahreswechsel, Auswahl und Zurücksetzen
   - WhatsApp-Text und -Ziel
   - Prüfungen, Nutzlast, Fehlertexte, `finally`
   - Referenz-ID, Reset-Handler
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
6. **Server/Client-Grenze:** `/termin/page.jsx` ist eine Client-Seite; prüfe, dass Metadaten, Export und Seitenstruktur gleich geblieben sind. Die Hooks haben kein `'use client'`. Prüfe, dass sie nur aus Client-Komponenten importiert werden (`grep -rn "useTerminKalender\|useTerminAnfrage" src`). Lies dazu `node_modules/next/dist/docs/01-app/02-guides/server-and-client-boundary.md` (Next 16; die Fassung weicht von deinem Training ab).
7. **Gegenprobe der Befundliste:** Die Rückgabe nennt Befunde (z. B. Datum/Uhrzeit gehen verloren, Tage aus `new Date()` beim Rendern → Hydrationsfehler ab dem Folgetag, Feiertage buchbar, `_t` wirkungslos). Bestätige an der alten Fassung, dass jeder davon auch alt so war, also nicht durch das Paket entstanden ist.

## Verbote
- Kein `next build`, `next start`, `next dev`, kein `npm install`.
- Keine POST-Anfrage, kein Formular absenden, keine Mail, kein Netz außer Lesen im Repo.
- Kein git mit Schreibwirkung (kein add, commit, stash, checkout, restore).
- Keine Datei ändern außer deiner Rückgabe.
- Andere Agenten arbeiten parallel im Arbeitsbaum (Konfigurator P4-05b). Fasse deren Dateien nicht an.

## Rückgabe (`_relaunch/pakete/P4-05c-GEG.rueckgabe.md`, Deutsch, ohne Fachjargon wo möglich)
- **Urteil je Formular:** „Verhalten gleich: ja“ oder „nein“ (mit Fundstelle).
- **Befunde** mit Schwere (hoch/mittel/niedrig), Datei:Zeile und Szenario (Eingabe → abweichendes Ergebnis).
- **Bestätigung der Altbefunde:** je Zeile „alt ebenso“ oder „neu entstanden“.
- **Vorgehen:** kurz, was du gelesen und verglichen hast.
Gib als letzte Nachricht nur eine Zusammenfassung von höchstens 8 Zeilen zurück.
