# P4-05b-GEG · Rückgabe · Gegenprüfung F-06 FliesenKonfigurator

Kennung P4-05b-GEG · Stufe 3 · Opus (frisch) · Kriterium Z-03 (G9). Geschrieben habe ich nur diese Datei. Kein Build, kein Server, kein `npm install`, kein git mit Schreibwirkung, keine POST-Anfrage (`fetch` nur als Attrappe im Scratchpad). Die Termin-Dateien von P4-05c habe ich nicht angefasst.

## Urteil
**Verhalten gleich: ja.**

Ich habe gezielt nach einer Abweichung gesucht und keine gefunden: nicht in der Logik, nicht im Markup, nicht in der Reihenfolge der Hooks und nicht in der Laufzeitwirkung der Typangaben. Die Selbstauskunft von P4-05b stimmt in allen Punkten, die ich nachgeprüft habe.

## Befunde

Keiner davon ändert das Verhalten der ausgelieferten Seiten.

| # | Schwere | Fundstelle | Szenario |
|---|---|---|---|
| 1 | niedrig | `src/lib/formulare/useFliesenKonfigurator.ts:556`, `:559` | `areaRangeValue` und `roomsText` werden jetzt bei jedem Rendern berechnet, vorher nur in Schritt 3 bzw. in der Erfolgsansicht. Beide sind reine Ausdrücke ohne Nebenwirkung. `data.area` ist im Bestand immer ein Text (Startwert `'20'`, sonst `e.target.value`), also kann `parseNumber` nicht abbrechen. Eingabe → Ergebnis: gleich. |
| 2 | niedrig | `src/lib/formulare/useFliesenKonfigurator.ts:5` (kein `'use client'`) | Das Modul holt `useState`/`useRef` aus `react`. Heute importieren es nur Client-Module. Ein späterer Import aus einer Server-Seite (auch über `d/KonfiguratorErgebnis.tsx`, das selbst kein `'use client'` hat) würde beim Bauen scheitern. Das ist ein Hinweis für später, keine heutige Abweichung. |
| 3 | niedrig (nur Vorschau) | `src/components/kern/formulare/d/Vorschau.tsx:38–42` | Der Effekt hängt an `update`, und `update` ist bei jedem Rendern neu. Darum läuft der Effekt jedes Mal, aber `gesetzt.current` sorgt dafür, dass `update(eingaben)` nur einmal wirkt. Die Vorschau wird nicht ausgeliefert. |

Geprüft und in Ordnung:
- **Logik:** Byte-Diff alt gegen Hook. Optionen (alt 27–107 gegen Hook 13–93), Helfer (113–134 gegen 159–180), Rechnung, Prüfliste, Zusammenfassung und Mengenzeilen (161–335 gegen 186–361) sowie der Hook-Kern (461–631 gegen 367–542) unterscheiden sich nur durch `export`, Typangaben und Kommentare. Das gilt auch für Startwerte, Vorgaben-Logik, `update`, Ableitungen, `goToStep`, den WhatsApp-Text und das Ziel `COMPANY_DATA.contact.whatsappNumber`, die Nutzlast, die Fehlertexte, `finally`, die Referenz-ID und `fmt`/Rundung.
- **Typangaben:** `ts.transpileModule` des Hooks ergibt wörtlich `event.nativeEvent?.submitter`, `submitter?.value === 'whatsapp' ? …`, `err.message || …`, `format: presetFormat`, `material: presetMaterial` und `calculateStairs(data)`. Klammern, Vorrang, `?.` und Rundung bleiben gleich. Ein `parseFloat` oder `Number` ist nicht hinzugekommen. `import React` fällt im Hook als reiner Typimport weg.
- **Gewanderte Inline-Handler:**
  - `toggleRoom(id)` (`:545`) ist gleich `update({ rooms: toggleInList(data.rooms, r.id) })`.
  - `toggleSubstrate` (`:548–553`) ist zeichengleich mit dem alten `onChange`. `OptionGroup` ruft es weiter mit genau einem Argument `o.id` auf.
  - `areaRangeValue` (`:556`) ist zeichengleich.
  - `handleNewRequest` (`:562–566`) setzt in derselben Reihenfolge: `setSentVia(null)`, `setStep(1)`, `setReferenceId('')`.
  - Alle vier schließen über das `data` desselben Renderns, wie die alten Inline-Pfeile. Eingabewerte werden nicht anders umgewandelt.
- **Markup:** Ein `diff` von alt 636–1375 gegen neu 218–954 zeigt nur die fünf genannten Stellen (Kommentarkopf, entfallene `roomsText`-Zeile, `:270`, `:424`, `:467`, `:569`). Klassen, `OptionGroup` und `ResultSummary` sind byte-gleich, bis auf eine Leerzeile.
  - Jeder Bezeichner ist destrukturiert oder importiert. `eslint` mit erzwungenem `no-undef` ist grün, und die Gegenprobe meldet einen eingeschleusten Namen.
  - Jede Hook-Rückgabe hat denselben Namen und dieselbe Art (Wert bzw. Funktion) wie der alte lokale Wert.
  - Kein Import fehlt. Weggefallen sind `useRef`, `useState` und `openWhatsApp`. `React` bleibt für `React.Fragment`.
- **Hook-Folge:** Die Komponente ruft nur `useFliesenKonfigurator` auf. Darin stehen wie vorher 5 × `useState`, dann `useRef`, dann `useState`. Es gibt keine Effekte. Callbacks waren vorher und nachher bei jedem Rendern neu, und kein Kind ist mit `memo` umschlossen. Darum rendert kein Kind anders.
- **Server/Client-Grenze:** Ich habe die Next-16-Anleitung `server-and-client-boundary.md` gelesen („Crossing the boundary“: Ein Modul, das eine Client-Komponente importiert, gehört zum Client-Bündel). `useFliesenKonfigurator` importieren nur `FliesenKonfigurator.jsx`, `kern/formulare/Konfigurator.tsx`, `d/Vorschau.tsx` und `d/KonfiguratorAnsicht.tsx`; alle haben `'use client'`. `d/KonfiguratorErgebnis.tsx` hat keins, wird aber nur aus `KonfiguratorAnsicht` (Client) importiert. Die 13 `/fliesen/*`-Seiten importieren weiter nur den Default-Export des Bestands. Die alte Datei hatte keine benannten Exporte, darum fehlt keinem anderen Modul etwas.
- **Kern-Ansichten (ruhend):** `grep` findet in `Konfigurator.tsx` und `d/*` kein `fetch`, kein `openWhatsApp`, kein `wa.me`, kein `/api`, kein `push`/`splice`/`sort` und keine Zuweisung an Hook-Werte. Gesendet wird nur über `handleSubmit` des Hooks. Die Vorschau ändert eine Kopie (`{ ...echt }`, `daten.data = { ...daten.data, … }`) und ersetzt das Senden durch eine leere Handlung.

## Bestätigung der Altbefunde (aus `P4-05b.rueckgabe.md`, BEFUNDE)

Geprüft an `git show HEAD:src/components/funnels/FliesenKonfigurator.jsx`.

| # | Befund | Beleg alt | Ergebnis |
|---|---|---|---|
| 1 | kein Honeypot, kein `_t`; `checkFastBot` lässt fehlenden Zeitstempel durch | `grep` ohne Treffer; Nutzlast alt 584–613; `security.ts:160–163` | alt ebenso |
| 2 | „Weiß nicht“ wird als `underfloorHeatingLabel: 'Nein'` gesendet | alt 490, 606 | alt ebenso |
| 3 | Vorgabe 20: `area: '20 m²'`, bei reiner Treppe `sqm: '20'`, leeres Feld → kein `sqm`, aber „20 m²“; keine Treppendaten in der Nutzlast | alt 496, 598, 611, 595–609 | alt ebenso |
| 4 | Rohwert in `sqm`/`area` (`abc`, `-3`, `0`) | alt 598, 611 | alt ebenso |
| 5 | `replace(',', '.')` ersetzt nur das erste Komma: „1.234,5“ ist ungültig, „1e3“ gilt als 1000, „150.5“ als 150,5 | alt 117, 130 | alt ebenso |
| 6 | Verlegemuster, Richtwert, Sockel, Nassbereich, Stufen und Maße gehen nur in den WhatsApp-Text; der Erfolgstext sagt „Materialschätzungen“ zu | alt 595–609, 534–535, 659 | alt ebenso |
| 7 | `location: data.zipCity \|\| 'Aßlar / Wetzlar'` | alt 593 | alt ebenso |
| 8 | kein `trim`; `notes` wird ungetrimmt gesendet | alt 589, 612, 1198 | alt ebenso |
| 9 | WhatsApp kehrt vor `setErrorMessage('')` zurück; alter Fehler steht wieder da | alt 563–570, 727, 1284 | alt ebenso |
| 10 | Reset setzt nur `sentVia`, Schritt und Referenz zurück | alt 686 | alt ebenso |
| 11 | Heizestrich setzt die Fußbodenheizung auf „Ja“, Abwählen setzt sie nicht zurück | alt 883–888 | alt ebenso |
| 12 | `parseCount` rundet (14,6 → 15 Steigungen, 14 Trittstufen); Stufenfelder liegen außerhalb des `<form>` | alt 121–124, 184, Felder 1074–1105, `<form>` erst 1187 | alt ebenso |
| 13 | Der WhatsApp-Knopf ist ein Submit-Knopf, also gelten auch für WhatsApp die Einwilligung (`required`) und das Telefon (`minLength 6`) | alt 1213–1214, 1272, 1313–1315 | alt ebenso |
| 14 | Der Richtwert steht in `aria-live="polite"` | alt 785 | alt ebenso |
| 15 | Schritt 4 sagt „per WhatsApp oder E-Mail“ | alt 31 | alt ebenso |

Keiner der Befunde ist durch das Paket entstanden.

## Vorgehen
1. Ich habe den Auftrag, die Selbstauskunft P4-05b, die alte Fassung (`git show HEAD:…`), den neuen Hook und die neue Komponente vollständig gelesen.
2. **Byte-Diffs mit `diff`:** Optionen, Helfer, Rechnung und Hook-Kern alt gegen Hook; Klassen, `OptionGroup`, `ResultSummary` und das Markup alt gegen neu; dazu `git diff HEAD` der Komponente.
3. **Typangaben:** Ich habe den Hook mit `ts.transpileModule` übersetzt und die betroffenen Zeilen mit der alten Fassung verglichen.
4. **Bezeichner:** Ich habe sie je Name in altem und neuem Markup gezählt und `eslint` mit `no-undef` laufen lassen. Die Gegenprobe lief über stdin, ohne eine Datei zu schreiben.
5. **Eigener Ablaufvergleich** (unabhängig von den Werkzeugen von P4-05b): `scratchpad/geg/lauf.cjs` und `vergleich.cjs`.
   - Aufbau: Übersetzung mit TypeScript, Ersatz-Hooks, Attrappen für `fetch`, WhatsApp und Fokus. Gesperrte Knöpfe werden nicht geklickt.
   - Ablauf: 55 Schritte. Bereiche und Untergründe an/ab (mit Heizestrich), Format und Muster, Flächen `24,5`, `abc`, `1.234,5`, `1e3`, ` 7,5 `, `-3`, `149,6`, Regler, Sockel, Treppenmaße mit `14,6`, Blockstufen/gewendelt, Kontaktfelder. Danach WhatsApp und Rückweg, Serverfehler mit und ohne Text, Wurf ohne `nativeEvent`, Wurf ohne `Error`, Erfolg mit Referenz, Neue Konfiguration, Erfolg ohne Referenz.
   - Vorgaben: keine, `holzoptik`, `[kueche, treppe]`/`altfliesen`/`floorHeating: true`/`xxl`, `flur`/`false` und `balkon`/`aussen2cm`/unbekanntes Format.
   - Verglichen habe ich je Schritt den ganzen Elementbaum, alle Zustandswerte, die Nutzlasten als Rohtext, die WhatsApp-Aufrufe, den Fokus und `console.error`.
   - Ergebnis: alle fünf Läufe **gleich**.
   - Gegenprobe: Zwei Mutationen im neuen Markup werden erkannt (Reset ohne `setStep` bei Schritt 47, Raumwahl ersetzt statt umgeschaltet bei Schritt 2). Eine Mutation ohne Wirkung bleibt wie erwartet gleich.
6. **Grenze:** Ich habe die Next-16-Anleitung gelesen und alle Importe des Hooks samt ihrer `'use client'`-Angaben geprüft.
7. **Kern und Vorschau:** Ich habe `grep` auf Senden, Mutation und eigene Nutzlast laufen lassen und `Vorschau.tsx` und `Konfigurator.tsx` gelesen.
