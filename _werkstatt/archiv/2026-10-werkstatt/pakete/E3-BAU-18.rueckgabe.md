# E3-BAU-18 · Rückgabe · BadanfrageFunnel Erfolg, WhatsApp geöffnet und Rahmen

## GEÄNDERTE DATEIEN
- `src/components/funnels/BadanfrageFunnel/Erfolg.jsx`
- `src/components/funnels/BadanfrageFunnel/WhatsAppGeoeffnet.jsx`
- `src/components/funnels/BadanfrageFunnel/index.jsx`
- `_werkstatt/pakete/E3-BAU-18.rueckgabe.md`

Kein Commit, Push, Build oder Serverstart von mir. Commit `4a729f5` („ZWISCHENSTAND“, 21:40) enthält diese drei Dateien im geprüften Stand, ist aber nicht von mir.

## WAS UND WARUM
- **Erfolg:** Maßstab TezgelAnfrage/Erfolg. Etikett mit `haken` (abnahme) und Text, Vorgangs-Nr. als Mono-Feld mit Fuge, Zusammenfassung ohne Karte, getrennt durch `border-t border-fuge`. Knöpfe über `Knopf`: Anruf mit `telefon`, Nebenknopf „Neue Badanfrage starten“, beide `w-full sm:w-auto`. Entfallen: lucide-Icons, Icon-Chip, Glasrahmen, `shadow-xl`, `max-w-2xl`, `text-center`, `Sparkles` (dekorativ).
- **WhatsApp geöffnet:** `sprechblase` statt MessageCircle. Die Überschrift bleibt `h3`, Größe `fs-5` statt 30 px, damit der Satz im Rahmen bleibt. Knöpfe wie Erfolg.
- **Rahmen (index):** `border-strich bg-fliese`, Kopf mit `border-fuge` (Maßstab TezgelAnfrage/index.tsx). Etiketten über `etikettKlassen`, Fugenkreuz statt Sparkles, H2 `font-anzeige fs-5`. Fortschritt: fünf Felder im 1-px-Raster, erreicht `bg-tinte`, sonst `bg-fliese`; ohne Orange, Radius und Übergang. Formularbereich `mt-8` statt `sm:p-10` (40 px liegt außerhalb der Skala). Zurück: `knopfKlassen('text', 'self-start')` mit `pfeil-links`. Weiter: `knopfKlassen('haupt', 'w-full sm:w-auto')` mit `pfeil-rechts`. Beide `data-motion="druck"`. Fußzeile `border-t border-fuge`: mobil untereinander (Zurück oben, Weiter voll breit), ab `sm` nebeneinander (Schritt 1 rechtsbündig).
- **Unverändert:** Logik, Props, Handler, Schrittwechsel, Fehlerweitergabe, Reihenfolge, `role="status"`, `aria-hidden` am Fortschritt, Überschriftsebenen.
- **Mikrotexte alt → neu: keine Wortänderung.** Textprobe: entfernt nur das Attribut `type="button"` je in einem Knopf (`Knopf` setzt es selbst, gleiches DOM); hinzu nur Icon-Namen. index: entfernt 0.

## GEMEINSAME DATEIEN (nicht geändert)
Für meinen Umfang nichts nötig. Nur mit Freigabe gewünscht: `src/app/(bestand)/bad/badanfrage/page.jsx` (und die übrigen Seiten mit `<BadanfrageFunnel />`): Behälter mit Lesebreite um den Funnel. Wert offen, nicht geprüft.

## PRÜFUNG UND ERGEBNIS
- `werte.mjs`: vorher 81 Befunde, nachher 0.
- `bezeichner.cjs`: `[]` in allen drei Dateien.
- Prüfstufe A (`pruefe-a.sh E3-BAU-18 … -- /bad/badanfrage`): GRÜN, Exit 0. tsc: 0 Fehler (eigene 0). eslint: 0 Fehler, 0 Warnungen. Funktionstest `funktion-badanfrage`: 14 erwartet, 0 unerwartet, 0 flaky. Bilder m390/d1440: HTTP 200/200, Konsole 0, Überlauf 0. Textvergleich gegen e0: entfernt 0, unerlaubt entfernt 0, hinzu 11 (Kopf/Fuß, Vorbestand).
- Hilfslauf (Scratchpad, Anfragesperre aus `lib.mjs`; Absenden nur als Attrappe, WhatsApp-Links abgefangen): m390 und d1440 ohne Überlauf, Konsole 0.
  - Erfolg: Vorgangs-Nr. TEZ-26-TEST, Begrüßung, Bestätigungszeile mit E-Mail, `role="status"` je einmal.
  - WhatsApp: Zurück und Anruf je einmal; Zurück führt zu Schritt 1.
  - Navigation Schritt 2, m390: Zurück 80×44 oben, Weiter 308×49 voll breit. d1440: Zurück bei x 161, Weiter bei x 1069 bis 1279.
- Server: 4310 und 4320 antworten HTTP 200 (geprüft, nicht gestartet).

## BILDBELEGE
Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-18/bilder/`
- Prüfstufe A: `bad__badanfrage/m390.jpg`, `d1440.jpg` (Schritt 1)
- `hilfslauf/`: `erfolg-*`, `whatsapp-*`, `schritt1|2|4-*` (m390, d1440, Vollbild), `nav-s2-m390.png`, `nav-s2-d1440.png`, `ausschnitte/`
- Vollbild-Aufnahmen zeigen den fixierten Kopf mitten im Rahmen; das ist ein Aufnahmeeffekt.

## OFFENE FRAGEN
1. **✉️ in der Bestätigungszeile** (Erfolg, nur mit E-Mail): bleibt, weil die Texte exakt gleich gelten. Der Maßstab hat es entfernt, und Emoji-Deko steht im Slop-Katalog. Entfernen wäre eine Mikrotext-Änderung: „✉️ Eine ausführliche …“ → „Eine ausführliche …“. Freigabe?
2. **Breite des Rahmens:** bisher `max-w-3xl` (768 px, nicht im Maßstab). Jetzt nimmt er die Containerbreite ein; auf /bad/badanfrage bei 1440 rund 1216 px, die Kacheln werden breit. Lesebreite in der Seite setzen?
3. **Fortschritt mit `strich`-Linien** (Muster Kern-Ansicht). Mit `fuge` (1,22 : 1) wären leere Felder kaum sichtbar. Bestätigen?
4. **Überschrift WhatsApp-Ansicht** bleibt `h3`, weil in dieser Ansicht die h2 des Kopfes fehlt. `h2` wäre eine Strukturänderung. Freigabe?
