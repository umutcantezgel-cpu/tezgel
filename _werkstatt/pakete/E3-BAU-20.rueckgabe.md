# E3-BAU-20 · Rückgabe · LeadQuickForm (KERN-Formularmuster, Labels, V-03, V-05)

## GEÄNDERTE DATEIEN
- `src/components/forms/LeadQuickForm.tsx`
- `_werkstatt/pakete/E3-BAU-20.rueckgabe.md`

Kein Commit, Push, Build oder Serverstart von mir. Der Zwischenstand-Commit `9ceb23a` („ZWISCHENSTAND – LeadQuickForm“) ist nicht von mir und enthält die Vorstufe der Datei. Der Endstand liegt im Arbeitsbaum (gegenüber HEAD +4/−3 Zeilen).

## WAS UND WARUM
- **Darstellung nach KERN:** Hülle `border-strich bg-fliese p-6 lg:p-8`, Etikett mit Fugenkreuz, Überschrift `font-anzeige text-fs-5`. Verlaufsleiste sowie Orange und Neutral entfernt, nur Tokens.
- **Felder:** `labelKlassen`, `feldKlassen`, `pflichtKlassen`. Anmerkungen von 2 auf 3 Zeilen, damit der Platzhalter mobil vollständig steht.
- **Labels verknüpft:** `htmlFor`/`id` für Name, Telefon, E-Mail, PLZ/Wohnort und Anmerkungen. Neue IDs `schnell-<useId>-<feld>` sind je Instanz eindeutig. Bestehende IDs `consent-${sourceTag}` und `websiteUrl-${sourceTag}` bleiben. `autocomplete` ergänzt (Attribut, kein Text).
- **V-03:** Sendefehler als `Hinweis art="fehler" rolle="alert"`. Bedingung und Position unverändert.
- **Knopf:** `knopfKlassen('haupt','w-full')` mit `data-motion="druck"`. Kein `Knopf`-Baustein, weil er `aria-busy` setzt. Ladezustand: Text „Wird gesendet...“ wie bisher, Ladefuge `laden-fuge` statt Spinner.
- **Erfolg:** Haken `haken` in `text-abnahme`, Texte unverändert, Vorgangsnummer als Fuge-Feld. Kein `role="status"`, damit ARIA gleich bleibt.
- **Einwilligung:** `kontrollKlassen` und `linkKlassen`, Rechtstext unverändert. **Vertrauenszeile:** Lock und Phone werden `schloss` und `telefon`. Der Trennpunkt ist ab `sm` sichtbar, mobil stehen die Angaben untereinander.
- **Honeypot:** inline-`style` entfernt (Werte-Regel `style_wert`). Die Klasse `hidden` wirkt gleich.
- **Mikrotexte:** keine Änderung. Textprobe gegen den Ausgangsstand: ENTFERNT 0, HINZU nur 4 `name=`-Attribute der Icons.

## GEMEINSAME DATEIEN (nicht geändert)
- **V-05:** Diese Datei enthält keine feste Firmennummer, nur den Platzhalter „z. B. 0172 / 1234567“. Die feste Nummer steht im gesperrten Hook `src/lib/formulare/useSchnellanfrage.ts`, Zeile 74 („06441 / 44 83 567“). Gewünscht: Telefon aus `COMPANY_DATA.contact.phone` (identischer Wert, Text wortgleich).

## PRÜFUNG UND ERGEBNIS
- **Prüfstufe A** (Endstand, `pruefe-a.sh E3-BAU-20 … -- / /kontakt`): Gesamt ROT, Exit 1, allein durch das Textgate. Typprüfung GRÜN (0 Fehler), eslint GRÜN (0/0), `funktion-schnellanfrage`: 24 erwartet, 0 unerwartet, 0 flaky. Bilder `/` und `/kontakt` GRÜN (HTTP 200, Konsole 0, Überlauf 0, Überlappung 0). Diese Seiten zeigen das Formular nicht.
- **Textgate ROT:** Die einzige unerlaubte Spanne ist der Terminkalender auf `/kontakt` („Mo, 12.10.2026 …“, tagesabhängig). Er braucht eine Ausnahme in `texte-erlaubt.json`. Die übrigen entfernten Einträge sind erlaubt und stammen aus anderen Paketen.
- **Textvergleich der Formularseiten** `/standorte/wetzlar` und `/leistungen/bad/wetzlar` (m390, d1440): GRÜN, entfernt 0, unerlaubt 0.
- `werte.mjs`: 0 Befunde. `bezeichner.cjs`: nur `LeadQuickFormProps`, Fehlalarm wie im Ausgangsstand.
- **Zustände** (Hilfslauf über die `lib.mjs`-Sperre, Dev 4320): Ruhe, Fehler, Lädt und Erfolg bei 390 und 1440. HTTP 200, keine Konsolen- oder Seitenfehler, beim Absenden genau eine Attrappe, keine blockierten Zugriffe.
- Server 4310 und 4320 antworten mit HTTP 200. Nicht gestartet oder gestoppt.

## BILDBELEGE
Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-20/zustaende/`: `m390-` und `d1440-` jeweils mit `ruhe`, `fehler`, `laedt`, `erfolg` (`.png`).

## OFFENE FRAGEN
1. **V-05:** Freigabe für `useSchnellanfrage.ts` nötig (siehe GEMEINSAME DATEIEN).
2. **Erfolgsblock mit `role="status"`:** ARIA-Änderung, daher nicht umgesetzt. Freigabe?
3. **Erfolgstext „Notiert.“** (K-009, Muster Kern-Schnellanfrage) fehlt. Mikrotext, nur mit Erlaubnis.
4. **Honeypot-Label „Do not fill this“** ist englisch. Vorschlag: „Bitte dieses Feld freilassen“ (wie HeroContactForm). Mikrotext.
5. **Pflichtmarke:** kein sr-Zusatz „Pflichtfeld“ (K-009 sieht ihn vor). Nicht ergänzt, da neuer Text.
6. **Baustein `Hinweis`:** setzt sr-only „Fehler: “ vor die Meldung. Verhalten von `kern/Hinweis.tsx`, nicht meine Datei.
7. **sourceTag mit Leerzeichen** (Fallback `serviceContext` in FinalCTA) macht die Bestands-IDs ungültig. Die neuen IDs sind nicht betroffen. Die Änderung läge beim Aufrufer.
8. **Hover und Fokus** kommen aus den gemeinsamen Klassen und sind nicht gesondert fotografiert.
