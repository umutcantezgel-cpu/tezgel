# P4-05a-GEG · Rückgabe · Gegenprüfung Formular-Hooks F-04 BadanfrageFunnel, F-05 BadProjektCheck

Kennung P4-05a-GEG · Stufe 3 · Opus (frisch) · Kriterium Z-03 (G9). Geschrieben habe ich nur diese Datei. Kein Build, kein Server, kein `npm install`, kein git mit Schreibwirkung, keine POST-Anfrage, kein Netz.

## Urteil
- **F-04 BadanfrageFunnel: Verhalten gleich: ja.**
- **F-05 BadProjektCheck: Verhalten gleich: ja.**

Ich habe gezielt nach einer Abweichung gesucht und keine gefunden. Jede Abweichung im Text zwischen alter und neuer Fassung ist eine Typangabe, ein Kommentar, ein `export` oder eine Verschiebung eines Inline-Handlers. Alles davon wirkt zur Laufzeit nicht.

## Befunde (durch das Paket entstanden)
Keine Befunde der Schwere hoch oder mittel.

| # | Schwere | Fundstelle | Szenario | Bewertung |
|---|---|---|---|---|
| G-1 | niedrig (kein Verhalten) | `src/lib/formulare/useBadanfrage.ts:4`, `useProjektCheck.ts:4` | `import React, { useState }`: `React` wird nur als Typ gebraucht (`React.FormEvent`). | Ohne Laufzeitwirkung. Das `.ts`-Übersetzen entfernt den Import oder lässt ihn harmlos stehen (`verbatimModuleSyntax` ist nicht gesetzt). Nur Kosmetik; `import type { FormEvent }` wäre sauberer. |
| G-2 | niedrig (nur Vorschau) | `src/components/kern/formulare/c/Vorschau.tsx:34–67` | Die Vorschau überschreibt Felder (`daten.status = …`, `daten.formData = {…}`). | Das betrifft eine flache Kopie (`{ ...echt }`). `formData` und `leadData` werden ersetzt, nicht verändert. Das Rückgabeobjekt des Hooks und sein Zustand bleiben unberührt. Senden und WhatsApp sind leer ersetzt (`nichtSenden`, `() => undefined`). Kein Verstoß. |
| G-3 | niedrig (Textgenauigkeit der Selbstauskunft) | `P4-05a.rueckgabe.md`, Befund 1 | „Bekannt als I-18“ | Stimmt: I-18 nennt „BadanfrageFunnel sendet kein `_t`“ ausdrücklich (`_relaunch/intern/BEFUNDE.md:27`). Nur der Paketbrief `P4-05a.md:15` nennt I-18 allein für BadProjektCheck. Das ist eine Ungenauigkeit im Brief, nicht im Paket. |

## Prüfung im Einzelnen

### 1. Logik alt gegen Hook (`diff`, zeilenweise)
- **F-04:** Ich habe die Konstanten (alt 21–57 gegen Hook 8–44) verglichen: Sie unterscheiden sich nur im `export`. Die Logik (alt 70–195 gegen Hook 49–176) weicht an genau 5 Stellen ab:
  - `useState<BadanfrageStatus>('idle')`: Der Kommentar ist durch einen Typ ersetzt.
  - `(feat: string)`.
  - `(e: React.FormEvent<HTMLFormElement>)`.
  - `parseFloat((formData.length || 0) as string)` (ebenso `width`): Die Klammer umschließt `||` vollständig, `as` fällt weg. Das ergibt `parseFloat(formData.length || 0)` wie vorher. Leere Zeichenkette → `0` → `parseFloat(0)` = 0, also gleich.
  - `(err as Error).message`: wird zu `err.message`, gleich. Auch ein Wurf ohne `Error` verhält sich gleich.
  - Startwerte, `toggleFeature`, Ableitungen, WhatsApp-Text (`getMessage`), WhatsApp-Ziel (`COMPANY_DATA.contact.whatsappNumber`), Prüfung (`!formData.name || !formData.phone`), Fehlertexte, Nutzlast samt `badDetails`, Honeypot, `notes.trim()` und Referenz-ID sind Zeichen für Zeichen gleich.
  - F-04 hat kein `finally`, weder alt noch neu.
- **F-05:** Die Konstanten (alt 21–42 gegen Hook 8–29) unterscheiden sich nur im `export`. Die Logik (alt 48–151 gegen Hook 34–139) weicht an genau 5 Stellen ab:
  - `useState<SentVia>(null)`.
  - `(id: string)`.
  - `(e: React.FormEvent<HTMLFormElement>)`.
  - `(e.nativeEvent as SubmitEvent | undefined)?.submitter`: wird zu `e.nativeEvent?.submitter`, gleich.
  - `submitter && (submitter as HTMLButtonElement).value === 'whatsapp' ? 'whatsapp' : 'online'`: Ohne Typangabe steht dort `submitter && submitter.value === 'whatsapp' ? … : …`. Der Vorrang ist unverändert: `===` vor `&&` vor `?:`. Die neue Klammer umschließt nur `submitter as …`, also den Ausdruck vor `.value`. Ohne `submitter` gilt `online` wie vorher.
  - `(err as Error).message`, gleich.
  - `finally { setIsSubmitting(false) }`, die frühe Rückkehr im WhatsApp-Zweig vor `setIsSubmitting`/`setErrorMessage('')`, Nutzlast `projektCheckDetails`, `sqmLabel` (`de-DE`) und `matchingBath` sind gleich.

### 2. Typangaben
Keine ändert die Laufzeit. Alle sind reine TypeScript-Angaben (`as`, `<…>`, Parametertypen). Sie fallen beim Übersetzen weg; die Klammern bleiben inhaltlich gleich (siehe oben). Ein React Compiler oder Babel ist nicht im Spiel (`next.config.ts` ohne `reactCompiler`, keine Babel-Konfiguration).

### 3. Gewanderte Inline-Handler
- **F-04 `handleNewRequest`:** Alt stand am Knopf `() => { setStatus('idle'); setStep(1); setReferenceId(''); }`. Neu steht dort `useBadanfrage.ts:179–183`, in gleicher Reihenfolge. Der Knopf liegt unter `BadanfrageFunnel.jsx:107`.
- **F-04 `handleBackFromWhatsApp`:** Alt stand am Knopf `() => { setStatus('idle'); setStep(1); }`. Neu steht dort `:186–189`, in gleicher Reihenfolge. Der Knopf liegt unter `BadanfrageFunnel.jsx:139`.
- **F-05 `handleNewRequest`:** Alt stand am Knopf `() => { setSentVia(null); setReferenceId(''); }`. Neu steht dort `useProjektCheck.ts:147–150`, in gleicher Reihenfolge. Der Knopf liegt unter `BadProjektCheck.jsx:300`.
- **F-05 `changeSqm`:** Alt hieß es `setSqm(parseFloat(e.target.value))`. Neu heißt es `(e) => changeSqm(e.target.value)`, und `changeSqm` ruft `setSqm(parseFloat(value))` auf. `e.target.value` wird wie vorher im Handler gelesen und als dieselbe Zeichenkette an dasselbe `parseFloat` gegeben.
- **Closure:** Die Handler nutzen nur Setzer, und Setzer sind stabil. Sie lesen keinen Render-Zustand, also gibt es keinen Unterschied zum alten Inline-Handler. Das Klick-Ereignis, das jetzt als Argument ankommt, wird nicht benutzt.

### 4. Markup (`git diff HEAD`)
- **F-04:** Altes Markup 197–675 gegen neues 60–538: genau 2 Zeilen unterscheiden sich (`:107`, `:139`). Der Kopf verliert nur `import React, { useState }` und `openWhatsApp`; neu ist der Hook-Import. `"use client"` steht weiter in Zeile 1.
- **F-05:** Altes Markup 153–513 gegen neues 56–416: genau 2 Zeilen unterscheiden sich (`:99`, `:300`). Der Kopf ist wie bei F-04 geändert.
- **Bezeichner:** Jeder im Markup verwendete Bezeichner ist destrukturiert oder importiert. Gezählt habe ich alle Hook-Werte, Konstanten, Icons, `Link`, `COMPANY_DATA`, `inputClass` und `optionClass`. Nicht mehr verwendet werden: `React`, `useState`, `openWhatsApp`, `setStatus`, `setReferenceId`, `setErrorMessage`, `setSqm`, `getMessage`/`getLeadMessage`.
  - Die Komponente verwendet `React.*` nirgends. Die JSX-Laufzeit ist automatisch (`"jsx": "react-jsx"`).
  - `personsLabel` wird in F-04 nicht destrukturiert, wurde aber auch im alten Markup nie benutzt (0 Treffer).
  - Jede destrukturierte Größe wird im Markup benutzt. Es gibt keinen überzähligen oder fehlenden Import.
- **Rückgaben:** Jede Hook-Rückgabe ist derselbe Wert unter demselben Namen wie der alte lokale Wert. Werte bleiben Werte, Funktionen bleiben Funktionen.

### 5. Hook-Folge
- **F-04:** 5 × `useState` in alter Reihenfolge.
- **F-05:** 10 × `useState` in alter Reihenfolge.
- Die Komponenten haben keine weiteren Hooks oder Effekte, weder alt noch neu.
- Callbacks waren alt Inline-Pfeile und sind neu Funktionen aus dem Hook. Beide entstehen bei jedem Rendern neu. Empfänger sind nur DOM-Elemente, kein `memo`-Kind. Am Rendern ändert sich nichts.

### 6. Server/Client-Grenze
`grep` zeigt: Die Hooks werden nur aus Client-Modulen importiert.
- Mit `"use client"`: `BadanfrageFunnel.jsx` und `BadProjektCheck.jsx` (beide Zeile 1), `kern/formulare/Badanfrage.tsx`, `ProjektCheck.tsx`, `c/Vorschau.tsx`, `c/BadanfrageAnsicht.tsx`, `c/ProjektCheckAnsicht.tsx` (alle `'use client'`).
- Die Ansichten importieren den Hook nur als Typ (`type useBadanfrage`) und dazu die Konstanten.
- Die Doku (`server-and-client-boundary.md`, Abschnitt „Crossing the boundary“) sagt: `'use client'` braucht nur der Einstieg in einen Client-Teilbaum. Jedes von dort importierte Modul gehört zum Client-Graphen. Darum ist kein `'use client'` in den Hooks nötig.
- Die Server-Seiten unter `src/app/(bestand)/bad/**` importieren weiterhin nur die Komponenten mit `"use client"`.

### Kern-Ansichten (nur Einordnung)
- Kein `fetch`, kein `openWhatsApp`, kein `wa.me`, kein `/api/` in `Badanfrage.tsx`, `ProjektCheck.tsx` und `c/*`.
- Gesendet wird nur über `handleOnlineSubmit`, `handleWhatsApp` und `handleLeadSubmit`.
- Es gibt keine eigene Nutzlast.
- Es gibt keine Mutation von Hook-Rückgaben: kein `push`, `splice` oder `=` auf `formData`, `leadData` oder `selectedOptions`. Gesetzt wird nur über `setFormData({ ...formData, … })`, `setLeadData({ ...leadData, … })`, `toggleFeature`, `toggleOption` und `changeSqm(e.target.value)`.
- Zur Vorschau siehe G-2.

## Bestätigung der 11 Altbefunde (an `git show HEAD:…`)
| # | Befund der Selbstauskunft | Beleg alt | Ergebnis |
|---|---|---|---|
| 1 | F-04 kein `_t`; `checkFastBot` lässt Fehlen durch | Alte Nutzlast 146–177 ohne `_t`; `src/lib/email/security.ts:160` `if (!submissionTime) return { isBot: false }` (Datei unverändert) | alt ebenso |
| 2 | F-04 Maße außerhalb des `<form>`, `min`/`max` wirkungslos; leer → `"0.0"` | Maße in `step === 3` (alt 367–395, `min="1"` `max="15"`), `<form>` erst in `step === 5` (alt 476–642); `'' \|\| 0` → `0.0` | alt ebenso |
| 3 | F-04 ohne `trim` (nur `notes` in Online-Nutzlast) | alt 126 `!formData.name`, `required` 514/529, `notes.trim()` nur 175; `getMessage` 122 ungetrimmt | alt ebenso |
| 4 | F-04 alte Fehlermeldung bleibt nach WhatsApp | `handleWhatsApp` (alt 125–135) löscht `errorMessage` nicht; Anzeige `errorMessage &&` in Schritt 5 (alt 499) unabhängig vom Status | alt ebenso |
| 5 | F-04 Reset nur Status/Schritt/Referenz | alt 244 | alt ebenso |
| 6 | Zahlformat F-04 Punkt (`toFixed`) / F-05 Komma (`de-DE`) | alt F-04 101, F-05 70 | alt ebenso |
| 7 | F-05 kein Honeypot, kein `_t` | alte Nutzlast F-05 114–133; kein Honeypot-Feld im alten Markup (`grep honeypot`: 0 Treffer) | alt ebenso |
| 8 | F-05 Startwert 8,2 nicht auf Raster | alt 48 `useState(8.2)`, Regler 190–196 `min="3.5"` `step="0.5"` (nächste Werte 8,0/8,5) | alt ebenso |
| 9 | F-05 ohne `trim`; WhatsApp löscht Fehler nicht; „Erneut anfragen“ behält Kontakt; `contactOpen` nie zurück | WhatsApp-Zweig kehrt vor `setErrorMessage('')` zurück (alt 98–105); alt 397 setzt nur `sentVia`/`referenceId`; `setContactOpen` nur `(true)` (alt 360) | alt ebenso |
| 10 | F-05 „Herrn Deniz Tezgel“ fest im Markup | alt 380 | alt ebenso |
| 11 | Paketbrief nennt `_t` für beide, Bestand hat keins | `P4-05a.md:14` nennt „Zeitschranke `_t`“; beide alten Fassungen: `grep _t` 0 Treffer | alt ebenso |

Alle 11 Befunde bestanden schon in der alten Fassung. Keiner ist durch das Paket entstanden.

## Vorgehen
- **Gelesen:** Auftrag, Paketbrief (Ausschnitt) und Selbstauskunft P4-05a. Dazu beide alten Fassungen über `git show HEAD:` (Kopie im Scratchpad), beide Hooks, beide neuen Komponenten, `Badanfrage.tsx`, `ProjektCheck.tsx`, `c/Vorschau.tsx`, die Ansichten (Ausschnitte), `security.ts`, `whatsapp.ts`, `tsconfig.json`, `next.config.ts`, die Next-16-Doku zur Server/Client-Grenze und I-18 in `BEFUNDE.md`.
- **Verglichen:** `diff` der Konstanten- und Logikblöcke alt gegen Hook und `diff` des Markups alt gegen neu, je Formular. Außerdem eine Bezeichnerzählung im Markup (alt/neu) und `grep` nach Hook-Importen, Sende-Wegen und Mutationen in den Kern-Dateien.
- **Bewusst nicht gemacht:** Ablauf- oder SSR-Werkzeuge ausgeführt (laut Auftrag kein Build oder Server). Der Nachweis steht auf dem Textvergleich und den Sprachregeln (Vorrang, Wegfall der Typangaben).
