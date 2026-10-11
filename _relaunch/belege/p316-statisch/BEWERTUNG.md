# Slop statisch · Kern-Code (Stand 075e936, `werkzeuge/statisch.mjs`)

Gesamtzahlen gelten für `src/` mit dem Bestand; sie sinken erst, wenn die Bestandsseiten in den Wellen ersetzt sind. Für `/` zählt der Kern-Code: 47 Treffer, einzeln bewertet.

| Kennung | Fundstelle | Urteil |
|---|---|---|
| S-05 Beliebigwert | `kopf-b/Hauptnavigation.tsx:242` `max-h-[calc(100dvh-var(--k-kopf-hoehe))]` | **echt** (nur Token im calc, aber freie Form). Wird als Utility in `kern.css` geführt (nach P3-16a). |
| S-05 Hex | `lib/kern/metadaten.ts:68` `themeColor: '#FFFFFF'` | begründet: Meta `theme-color` nimmt keine CSS-Variable; Wert = `--k-fliese`. |
| S-05 Inline-style | `start/Fachgewerke.tsx:44` `--k-staffel-nr` | begründet: Staffelindex als Variable (KERN Register, keine Zeit- oder Längenangabe). |
| S-05 Inline-style | `kopf-a/*`, `einstieg-a/*` | nicht ausgeliefert (Variante A verworfen, E-022). |
| S-04 Inline-svg | `icons/*`, `motive/*`, `basis/Zeichen.tsx`, `einstieg-b/Laser.tsx`, `_entwurf/not-found.tsx` | begründet: eigenes Formsystem (E-010, KERN), keine Fremdfamilie. |
| S-01 Platzhalter | `fuss/UntereLeiste.tsx:56` (Kommentar „Platzhalter im Fluss“), `_entwurf/p3-*` (Vorschauseiten, nicht gebaut) | Falschtreffer. |
| S-09 Funkeln | `lib/kern/icons.ts:47` | Falschtreffer: Liste der Konfig-Namen, die auf Kern-Icons abgebildet werden (kein Funkel-Icon im Kern). |
| S-09 eyebrow | `kopf-b/daten.ts`, `start/Fachbereiche.tsx`, `lib/kern/start/daten.ts` | Feldname aus der Bestandskonfiguration; gerendert als Mono-Etikett im Feldkopf (KERN Mikrotext-Klasse 3), kein Badge über der Überschrift. |
| S-13 Floskel | `start/einstieg-b/Einstieg.tsx:69` „Perfektion“, `start/Fragen.tsx:12` „modernste“ | Wortlaut Bestand (Überschrift bzw. FAQ, unantastbar); Vorschläge stehen in TEXTVORSCHLAEGE Zeilen 26–27. |
| S-13 Floskel | `basis/Akkordeon.tsx:22` „exklusives“ | Falschtreffer (Kommentar: exklusives Öffnen per `name`). |

Ergebnis: 1 echter Treffer (freier Wert im Kopf), Rest begründet oder Falschtreffer.
