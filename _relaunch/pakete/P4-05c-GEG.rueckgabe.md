# P4-05c-GEG · Rückgabe · Gegenprüfung Formular-Hooks F-07 BookingCalendar, F-08 Termin-Formular

Kennung P4-05c-GEG · Stufe 3 · Opus (frisch) · Kriterium Z-03 (G9). Geschrieben habe ich nur diese Datei. Kein Build, kein Server, keine POST-Anfrage, kein git mit Schreibwirkung. Hilfsdateien (alte Fassungen, Typ-Abstreifer) liegen nur im Scratchpad. Dateien von P4-05b habe ich nicht geöffnet und nicht angefasst.

## Urteil

| Formular | Verhalten gleich | Fundstelle |
|---|---|---|
| F-07 BookingCalendar (`/termin`, `/kontakt#termin-buchen`) | **ja** | `src/components/contact/BookingCalendar.tsx`, `src/lib/formulare/useTerminKalender.ts` |
| F-08 Termin-Formular (`/termin`) | **ja** | `src/app/(bestand)/termin/page.jsx`, `src/lib/formulare/useTerminAnfrage.ts` |

Ich habe gezielt nach einer Abweichung gesucht und keine gefunden. Der Beleg ist stärker als ein Textvergleich: Ich habe alte und neue Fassung durch den TypeScript-Übersetzer geschickt (nur Typen entfernt, `transpileModule`). Das erzeugte JavaScript der gesamten Logik ist **Zeichen für Zeichen gleich** (Einrückung und Leerzeilen ausgenommen):
- F-07: alt `BookingCalendar.tsx:45–165` gegen `useTerminKalender.ts:21–141`, 105 Zeilen erzeugter Code, gleich.
- F-08: alt `page.jsx:38–138` gegen `useTerminAnfrage.ts:37–140`, 90 Zeilen erzeugter Code, gleich. Ebenso `TOPICS`, `TIME_SLOTS`, `labelOf`, `formatDate` (nur `export` davor).

## Befunde (durch das Paket entstanden)

Keine mit Wirkung auf Besucher oder Anfragen. Nur Randnotizen, alle **niedrig**, ohne Laufzeitfolge:

1. **niedrig** · `useTerminKalender.ts:144` · `formattedDate` wird jetzt bei jedem Rendern berechnet, vorher nur im Erfolgszweig. Szenario: beliebige Eingabe → gleiche Anzeige; die Umformung ist rein und wirft nicht (auch bei leerem `selectedDate` ergibt sie `''`). Keine Abweichung.
2. **niedrig** · `useTerminKalender.ts:5`, `useTerminAnfrage.ts:5` · `import React` wird nur für Typen gebraucht. Ohne Laufzeitfolge (`jsx: react-jsx`, im Hook kein JSX).
3. **niedrig** · `P4-05c.rueckgabe.md` · Die Dateitabelle nennt „9 × `useState`“, die Blocktabelle „8 × `useState`“. Beides stimmt (8 + `contactData`), nur uneinheitlich formuliert.
4. **niedrig, nur Kern (ruht)** · `src/components/kern/formulare/TerminKalender.tsx:10` · Die Kern-Insel verlangt `initialServiceType` ohne Vorgabewert, der Bestand hat einen Vorgabewert. Heute ohne Folge, weil beide Aufrufer ihn setzen; beim späteren Einbinden beachten.

## Prüfpunkte im Einzelnen

1. **Logik.** Konstanten (`AVAILABLE_SLOTS`, `TOPICS`, `TIME_SLOTS`), Startwerte, Setzer, `useMemo` der Tage (`new Date()`, `+1` je Schleife, Sonntag `getDay() === 0` übersprungen, 10 Tage, Samstag markiert, `de-DE`), Auswahl `handleSelectSlot` (Datum, Uhrzeit, Fehler leeren, Schritt 2), Zurück `setStep(1)`, Honeypot `TEZ-BOT-IGN`, Pflichtprüfung, Nutzlast samt `terminDetails` und `_t: Date.now() - 3000`, Fehlertexte, `finally`, Referenz-ID, `bookedSlots`, `onBookingConfirmed`; WhatsApp-Text `buildMessage`, Ziel `COMPANY_DATA.contact.whatsappNumber`, Kanal über `submitter`, Online-Nutzlast mit `location`-Ersatz und `timing`. Alles gleich (siehe Übersetzer-Vergleich).
2. **Typangaben.** `(e.nativeEvent as SubmitEvent | undefined)?.submitter` → erzeugt `e.nativeEvent?.submitter`; `(submitter as HTMLButtonElement | null | undefined)?.value === 'whatsapp'` → `submitter?.value === 'whatsapp'` (Klammer nur um den Bezeichner, Vorrang unverändert); `(e.target as HTMLInputElement).checked` → `e.target.checked`; `(err as Error).message` → `err.message`; `useState<BookingMode>`/`useState<SentVia>` → gleiche Startwerte. Kein `parseFloat`, `Number` oder Rundung im Spiel. Laufzeit unverändert.
3. **Gewanderter Inline-Handler.** „Weiteren Termin anfragen“: alt `() => { setSentVia(null); setReferenceId(''); }`, neu `handleNewRequest` mit derselben Reihenfolge. Er liest keinen Zustand, nur stabile Setzer; das Klick-Ereignis wurde alt wie neu nicht genutzt. Gleiche Wirkung, gleicher Render-Zustand. Alle übrigen Inline-Handler (`setBookingMode(…)`, `setSentVia(null)`, `setStep(1)`, `setContactData({ ...contactData, … })`, `update(…)`) stehen wörtlich im Markup.
4. **Markup.** `git diff HEAD` zeigt nur: Importe, Destrukturierung, entfallene Zeile `const formattedDate` (F-07) und `onClick={handleNewRequest}` (F-08). Restliches Markup per `diff` gegen die alte Fassung gleich (F-07: Zeilen 166–443 alt gegen 54–329 neu; F-08: 140–473 alt gegen 27–360 neu). Jeder im Markup genutzte Bezeichner ist destrukturiert oder importiert; jede Rückgabe ist derselbe Wert bzw. dieselbe Funktion unter gleichem Namen. Importe: entfernt nur `React`/`useState`/`useMemo` (BookingCalendar) bzw. `React`/`useState`/`openWhatsApp` (Seite), die im neuen Markup nicht mehr vorkommen; `COMPANY_DATA` bleibt (Hero, Erfolgsansicht), alle Icons werden weiter benutzt. Nichts fehlt, nichts zu viel.
5. **Hook-Folge.** F-07: 9 × `useState` in alter Reihenfolge, dann `useMemo` mit `[]`. F-08: 6 × `useState` in alter Reihenfolge, keine Effekte. Ein eigener Hook ändert die Reihenfolge für React nicht. Callbacks wurden alt wie neu bei jedem Rendern neu erzeugt; das Kind `BookingCalendar` bekommt auf `/termin` weiter nur `initialServiceType` (fester Text). Kein anderes Rendern.
6. **Server/Client-Grenze.** `termin/page.jsx` beginnt weiter mit `"use client"`, `export default function TerminPage` unverändert; die Metadaten stehen in `termin/layout.tsx` (unverändert). `/kontakt/page.jsx` (Server-Komponente, unverändert) bindet `BookingCalendar` (`'use client'`) ein; der Hook gehört über dieses Modul zum Client-Graphen, wie der Next-16-Leitfaden (`server-and-client-boundary.md`, Abschnitt „Every module imported from that entry becomes part of the client module graph“) es vorsieht. `grep`: die Hooks werden nur aus Client-Modulen importiert (`BookingCalendar.tsx`, `termin/page.jsx`, `kern/formulare/TerminKalender.tsx`, `TerminAnfrage.tsx`, `e/Vorschau.tsx`); `e/TerminKalenderAnsicht.tsx` und `e/TerminAnfrageAnsicht.tsx` importieren nur Typen und Konstanten und tragen selbst `'use client'`. Server-Seite (`src/lib/email/*`, `src/app/api/*`) ist unverändert (`git status`).
7. **Kern-Ansichten und Vorschau (ruhen).** Kein `fetch`, `openWhatsApp`, `JSON` oder `/api/` in `TerminKalender.tsx`, `TerminAnfrage.tsx`, `e/*`. Die Ansichten rufen nur die übergebenen Hook-Handler und eigene Anzeige-Zustände (`tagWahl`, Fokus-Ref). Die Vorschau `e/Vorschau.tsx` legt eine flache Kopie (`{ ...echt, … }`) an und überschreibt nur Felder der Kopie; das Rückgabeobjekt des Hooks und dessen Zustand werden nicht verändert. Absenden ist dort durch `nichtSenden` (nur `preventDefault`) ersetzt; die Vorschau sendet nichts. Keine Kern-Datei wird aus `(bestand)` oder ausgelieferten Seiten importiert.

## Bestätigung der Altbefunde (an `git show HEAD:…`)

| Nr. | Befund der Rückgabe | Ergebnis |
|---|---|---|
| 1 | Kalender verliert Datum/Uhrzeit (`preferredDate`, `serviceType` nicht im `TerminDetailsSchema`, `validation.ts:108–115`; Mails zeigen nur `topicLabel`, `formattedDate`/`date`, `timeSlotLabel`) | alt ebenso (alte Nutzlast `BookingCalendar.tsx:126–130`, Schema und Vorlagen unverändert) |
| 2 | Tage aus `new Date()` beim Rendern → veraltetes HTML, Hydrationsabweichung ab dem Folgetag, Zeitzone des Rechners | alt ebenso (alt `:65–91`, gleicher `useMemo`; Beleg `termin.json` beginnt mit „Mo, 12.10.2026“, HEAD vom 11.10.2026) |
| 3 | Nur Sonntag gesperrt, Feiertage buchbar; Kommentare „14 days“/„12 workdays“ gegen 10 Tage | alt ebenso (alt `:37`, `:64`, `:69–72`) |
| 4 | Belegung nur im Browser, nach Umschalten wieder frei | alt ebenso (alt `:48`, `:150`; bedingtes Rendern alt `page.jsx:270–271`) |
| 5 | `_t` wirkungslos; Honeypot nur aus Leerzeichen wird gesendet | alt ebenso (alt `:104`, `:140`; `security.ts:156ff.` unverändert) |
| 6 | Telefonnummer und Inhabername fest im Code | alt ebenso (alt `:161`, `:191`, `:214`) |
| 7 | `onBookingConfirmed` ungetrimmt, Nutzlast getrimmt | alt ebenso (alt `:132–133` gegen `:156–157`) |
| 8 | Labels ohne `htmlFor`/`id`, kein `autocomplete`, `AVAILABLE_SLOTS[].label` ungenutzt | alt ebenso (alt `:300–389`) |
| 9 | F-08 ohne Honeypot und `_t`, Name/Telefon ungetrimmt | alt ebenso (alt `page.jsx:99–120`, `:66–67`) |
| 10 | Ort-Ersatz `'Aßlar / Wetzlar'` erscheint als Kundenangabe | alt ebenso (alt `page.jsx:108`; `teamEmail.ts:24–25` unverändert) |
| 11 | Wunschdatum ohne `min`; `required` am Thema wirkungslos | alt ebenso (alt `page.jsx:279–303`) |
| 12 | Alter Fehler bleibt nach WhatsApp-Weg stehen; Eingaben bleiben nach „Weiteren Termin anfragen“ | alt ebenso (alt `page.jsx:78–89`, `:207`) |
| 13 | Umschalter ohne `aria-pressed`; Kalendereingaben gehen beim Umschalten verloren | alt ebenso (alt `page.jsx:246–271`) |
| 14 | Kein Monatsraster, nur Liste von 10 Tagen über Monats-/Jahresgrenzen | alt ebenso (alt `:69–88`; Monats- und Jahreswechsel über `setDate(+1)` korrekt) |

Kein Altbefund ist neu entstanden.

## Vorgehen

- Auftrag und Selbstauskunft `P4-05c.rueckgabe.md` gelesen (als Behauptung).
- Alte Fassungen per `git show HEAD:` ins Scratchpad gezogen; neue Hooks und Komponenten vollständig gelesen.
- Logikblöcke alt gegen Hook per `diff` verglichen, danach beide Seiten mit `typescript.transpileModule` (Typen entfernt, ohne Build) übersetzt und den erzeugten Code verglichen: gleich.
- Markup per `git diff HEAD` und Block-`diff` geprüft; Bezeichner, Importe, Hook-Reihenfolge abgeglichen.
- Grenze Server/Client: `grep` nach Hook-Importen, `'use client'` aller Importeure, `termin/layout.tsx`, Next-16-Leitfaden gelesen.
- Kern-Ansichten und Vorschau auf Senden, eigene Nutzlast und Veränderung der Hook-Rückgabe durchsucht.
- Altbefunde an der alten Fassung sowie an `validation.ts`, `security.ts`, `teamEmail.ts`, `customerEmail.ts` (alle unverändert) nachgeprüft.
