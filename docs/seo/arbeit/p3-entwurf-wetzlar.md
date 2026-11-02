# P3 Entwurf: eigene Inhalte für /standorte/wetzlar

Stand 01.11.2026. **Entwurf zur Durchsicht, nicht im Code.** Umgesetzt wird er erst nach Umuts Freigabe des Plans (`docs/seo/arbeit/plan-p2-bis-p8.md`) und zusammen mit den Antworten von Deniz. Aussagen nur aus dem Faktenblatt (`_werkstatt/KERN.md` Anhang F, Nummern in Klammern) und aus dem Auftrag („Aßlar, direkt neben Wetzlar“). Platzhalter in eckigen Klammern füllt nur Deniz; ohne seine Bestätigung bleiben die Abschnitte weg.

**Warum:** Die Seite ist heute zu 89 bis 95 % gleich wie die anderen Ortsseiten (KONTEXT.md A03). Leitplanke: Ortsseiten unterscheiden sich nur durch echte Angaben, nicht durch getauschte Ortsnamen. Mehr Text allein hilft nicht; es zählen echte Belege aus Wetzlar.

## Stand der Umsetzung (02.11.2026, nach der Gegenprüfung)

**Patch:** `docs/seo/arbeit/p3-wetzlar.patch`, anzuwenden nach `p3-meta.patch` und vor `p4-noindex.patch` (Reihenfolge im Plan, Abschnitt 7). Er setzt um, was ohne Deniz belegt ist, über die neue Datei `src/inhalte/orte-eigen.ts`:
- **Vorspann:** Leistungen nach F-08.
- **„Sie suchen einen Fliesenleger in Wetzlar?“:** Landkreis und Sitz in Aßlar, etwa 5 km bis zur Stadtmitte (F-09). Termin vor Ort und Angebot stehen im Ablauf derselben Seite.
- **„Das machen wir in Wetzlar.“:** sechs Leistungen mit je einem kurzen Text und Link auf die Fachseite, statt der vier Links auf die Seiten Leistung × Ort. Die Förderung steht im Wortlaut von `/bad` („kann … dazugeben“), Fachwörter mit Erklärung.
- **Alle Ortsseiten:** Über den Fotos steht „So arbeiten wir.“ ohne Ort (Abschnitt 4).
- **Was fehlt:**
  - Baustellen, Stadtteile und Stimmen aus Wetzlar (Abschnitte 4, 5 und Fragen) warten auf Deniz;
  - die Beratung (Abschnitt 6) wartet auf S4;
  - die Fotos aus P5;
  - eigene Fragen bräuchten einen neuen Baustein in der Vorlage der Ortsseite.

## Aufbau (Reihenfolge auf der Seite)

1. **Einstieg** (bleibt): H1 „Fliesenleger in Wetzlar“, Ortszeile „Fliesenverlegung Tezgel aus Aßlar, direkt neben Wetzlar.“
   - **Neu im ersten Bildschirm:** zwei gleich große Knöpfe „Anrufen“ (06441 / 44 83 567, F-04) und „Nachricht per WhatsApp“ (0172 / 67 28 504, F-04). Darunter die Schnellanfrage mit vorbelegtem Ort Wetzlar. Ob der Ort vorbelegt wird, gehört zu S6 (Formulare).
2. **Kurz zu uns, für Wetzlar** (neu, Vorschlag):
   > Unser Betrieb sitzt in Aßlar, direkt neben Wetzlar. Deniz Tezgel kommt selbst zu Ihnen, sieht sich den Raum an und prüft den Untergrund. Der Termin bei Ihnen vor Ort ist kostenfrei. Danach bekommen Sie ein Angebot mit festem Preis.

   Belege: F-03 Sitz, F-13 persönliche Betreuung, F-12 Termin kostenfrei, Versprechen Festpreisangebot.
3. **Was wir in Wetzlar machen** (statt der vier Links auf die Seiten Leistung × Ort, die nach S3 entfallen): je Leistung zwei bis drei Sätze und ein Link zur Fachseite.

   | Block | Text (Vorschlag) | Link | Beleg |
   |---|---|---|---|
   | Bad und Dusche ohne Stufe | Wir erneuern Ihr Bad und bauen eine Dusche ohne Stufe ein. Unter die Fliesen kommt eine Abdichtung nach DIN 18534. | `/bad/badsanierung`, `/bad/barrierefreies-bad` | F-08, F-15, F-27 |
   | Barrierefreies Bad | Mit Pflegegrad zahlt die Pflegekasse bis zu 4.180 € je Person dazu. Wir planen das Bad nach DIN 18040-2. | `/bad/barrierefreies-bad`, `/foerderung` | F-25 |
   | Böden und Wände | Wir verlegen große Fliesen, Feinsteinzeug und Naturstein in Wohnräumen, Küchen und im Neubau. | `/fliesen/grossformat`, `/naturstein` | F-08, F-15 |
   | Balkon und Terrasse | Wir legen ein Gefälle vom Haus weg an, dichten ab und verlegen den neuen Belag, auch auf Stelzlagern. | `/balkon-terrasse`, `/balkon-terrasse/balkonsanierung` | F-08, F-21 |
   | Treppe | Innentreppe, Treppenhaus oder Außentreppe mit Fliesen oder Naturstein neu belegen. | `/treppen` | F-08 |
   | Reparatur und Fugen | Einzelne Fliesen tauschen, Fugen erneuern. Fotos per WhatsApp helfen bei der ersten Einschätzung. | `/fliesenreparatur`, `/fliesen/fugensanierung` | F-08, F-04 |

4. **Arbeiten in Wetzlar** (nur mit Bestätigung von Deniz): [Stadtteil, Leistung, ein bis drei Fotos je Baustelle]. Ohne Bestätigung keine Ortsangabe am Foto; dann zeigt der Abschnitt ortsneutrale Fotos unter der Überschrift „So arbeiten wir“, wie heute.
5. **Stimmen aus Wetzlar** (nur mit Erlaubnis der Kunden zur Ortsnennung): [Wortlaut unverändert aus dem Google-Profil, mit Ort]. Bis dahin bleibt eine Stimme ohne Ortsbezug.
6. **Fliesenberatung in Wetzlar** (hängt an S4): Heute steht die Beratung auf `/ausstellung/wetzlar`. Belegt ist nur „Fliesenberatung in Wetzlar nach Terminvereinbarung, ohne Adresse“ (F-18). Vorschlag: ein Absatz hier, `/ausstellung/wetzlar` per 308 hierher.
   > Eine feste Ausstellung haben wir nicht. Zur Fliesenberatung in Wetzlar treffen wir uns nach Vereinbarung; Muster bringt Deniz Tezgel zum Termin mit. [Muster: nur wenn Deniz das bestätigt]
7. **Häufige Fragen aus Wetzlar** (Aufklapper, bleibt im HTML):
   - *Kommen Sie für das Angebot zu mir nach Wetzlar?* Ja. Deniz Tezgel kommt zu Ihnen und sieht sich alles an. Der Termin ist kostenfrei (F-12).
   - *In welchen Stadtteilen arbeiten Sie?* [Liste von Deniz, zum Beispiel aus den Baustellen der letzten Jahre]. Ohne Liste entfällt die Frage.
   - *Gibt es in Wetzlar eine Ausstellung?* Siehe Abschnitt 6 (S4).
   - *Was kostet eine Badsanierung?* Das hängt vom Raum und vom Material ab. Den Preis nennen wir nach dem Termin vor Ort als Festpreisangebot.
8. **Schritt** (bleibt): „Termin in Wetzlar anfragen“.

## Meta und Strukturdaten

- Titel bleibt „Fliesenleger in Wetzlar | Fliesenverlegung Tezgel“ (49).
- Description neu (Plan, Tabelle 4b): „Ihr Fliesenleger für Wetzlar aus dem Nachbarort Aßlar: Bad und Dusche ohne Stufe, Böden, Balkon und Treppe. Der Termin bei Ihnen vor Ort ist kostenfrei.“ (152). Mit bestätigten Belegen konkreter.
- Strukturdaten: seit P1 `City` Wetzlar (Wikidata Q4178) und `Service` mit `provider` auf den einen Betrieb; kein zweites LocalBusiness. Mit Fragen aus Abschnitt 7 zusätzlich `FAQPage`, wenn die Fragen sichtbar auf der Seite stehen.

## Interne Links auf die Seite (Ankertext „Fliesenleger in Wetzlar“)

- Startseite, Einsatzgebiet (`src/components/vorlagen/teile/Einsatzorte.tsx`), Fuß (`src/config/navigation.js`), Einzugsband (`src/components/kern/Einzugsband.tsx`) und Einsatzkarte (`src/components/momente/karte/Einsatzkarte.tsx`): schon mit P2.
- Fachseiten (`/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/treppen`, `/fliesenreparatur`): je ein Satz mit Link, zum Beispiel „Sie wohnen in Wetzlar? Mehr dazu bei Fliesenleger in Wetzlar.“
- `/referenzen`: Link im Vorspann.
- Zurück zur Startseite mit „Fliesenverlegung Tezgel in Aßlar“.

## Technischer Weg

- Neue Datei `src/inhalte/orte-eigen.ts` mit den Blöcken je Ort (vorerst nur Wetzlar), in `inhaltFuer()` von `src/app/(bestand)/standorte/[stadt]/page.tsx` eingemischt; neue Abschnitte in `src/components/vorlagen/OrtsSeite.tsx` (seit dem Werkstatt-Merge frei).
- Tests: `test/orte.test.mjs` prüft, dass Wetzlar eigene Blöcke hat und andere Orte sie nicht übernehmen; Glossar-Textmarken für Fachwörter.
- Im selben Push: Titel und Descriptions der Startseite und der Übersichten ohne Wetzlar (Plan, Tabellen 4a, 4b, 5) und, nach S3 und S4, `/leistungen/*/wetzlar`, `/leistungen/*/asslar` und `/ausstellung/wetzlar` auf noindex oder 308.

## Was Deniz liefern muss

1. Baustellen in Wetzlar: Stadtteil, Leistung, Jahr, welche Fotos dazugehören, und ob Ort und Projekt genannt werden dürfen.
2. Kundenstimmen aus Wetzlar mit Erlaubnis zur Ortsnennung.
3. Stadtteile, in denen er regelmäßig arbeitet.
4. Beratung in Wetzlar: Wo findet sie statt, bringt er Muster mit (S4)?
