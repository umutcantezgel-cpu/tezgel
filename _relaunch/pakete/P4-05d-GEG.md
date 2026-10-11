# P4-05d-GEG · Gegenprüfung Kalender „heute erst im Browser“ · Stufe 3 · Modell: Opus (frisch) · Schreibrechte: `_relaunch/pakete/P4-05d-GEG.rueckgabe.md` · Kriterium: Z-03 (G9), Z-11

## Rolle
Du bist frischer Gegenprüfer. Suche eine Verhaltensänderung, die über den beabsichtigten Zeitpunkt hinausgeht. Der Kalender läuft live auf `/termin` und `/kontakt#termin-buchen`.

## Umfang
- Commit `bce9eb3` (`git show bce9eb3 -- src/lib/formulare/useTerminKalender.ts`), alte Fassung `bce9eb3~1`.
- **Absicht laut Commit und E-027:** Die Tage werden nicht mehr beim Rendern aus `new Date()` berechnet, sondern erst im Browser. Mittel ist `useSyncExternalStore` mit Serverwert `null`. Server und Hydrieren zeigen den Kalender ohne Tage, danach dieselben Tage wie bisher: Browserdatum, ab morgen, ohne Sonntag, 10 Tage, gleiche Texte.
- **Verwender:** `src/components/contact/BookingCalendar.tsx` (Bestand), `src/components/kern/formulare/e/TerminKalenderAnsicht.tsx` (ruhend).

## Zu prüfen
1. Ist die Tagesfolge alt gegen neu für jeden Starttag gleich? Prüfe mit einer Rechnung im Scratchpad (Node, `TZ=Europe/Berlin`) über ein ganzes Jahr, auch an den Tagen der Zeitumstellung und über den Jahreswechsel: `dateStr`, `displayDate`, `weekday`, `isSaturday`.
2. **`useSyncExternalStore`:**
   - Liefert `getSnapshot` stabil denselben Wert (sonst Endlosschleife)?
   - Ist `getServerSnapshot` beim Hydrieren wirksam? Lies die React-19-Doku bzw. den Quelltext unter `node_modules/react-dom`, soweit nötig.
   - Was passiert um Mitternacht bei offener Seite? Alt: Tage bleiben bis zum Neuladen. Neu: ebenso, weil kein Abo besteht. Bestätige oder widerlege das.
3. **Hook-Folge:** Der neue Hook steht nach den `useState`-Aufrufen. Ändert das etwas für Verwender? Die Reihenfolge ist in jedem Rendern gleich.
4. **Leere Tage beim ersten Rendern:**
   - Stürzt einer der Verwender bei `availableDays = []` ab oder zeigt er irreführenden Text?
   - Gibt es Zustand, der aus `availableDays[0]` initialisiert wird und nach dem Nachrücken der Tage falsch bliebe?
5. Nutzlast, Slots, `bookedSlots`, Prüfung, Fehlertexte: unverändert?

## Verbote
Kein Build, Start oder Dev; kein `npm install`; kein git mit Schreibwirkung; keine POST-Anfrage; nur deine Rückgabe schreiben.

## Rückgabe (Deutsch)
Urteil „Verhalten gleich bis auf den beabsichtigten Zeitpunkt: ja/nein“, dazu Befunde mit Schwere und Szenario und kurz dein Vorgehen. Letzte Nachricht: höchstens 6 Zeilen.
