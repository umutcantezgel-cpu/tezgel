# E5-BAU-01 · Rückgabe (Baumeister, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/untergrund-abdichtung/page.jsx`
- `src/app/(bestand)/untergrund-abdichtung/din-18534/page.jsx`
- `_werkstatt/pakete/E5-BAU-01.rueckgabe.md` (diese Datei)

Kein Commit, kein Push. Vorab lief `umbau.mjs --schreiben`; die Seiten wurden danach von Hand neu aufgebaut.

## WAS UND WARUM
**/untergrund-abdichtung:** Einstieg `erzaehl` mit Etikett, H1 (ID `untergrund-heading`), Vorspann, zwei Knöpfe; Randspalte Planblatt „Untergrund & Abdichtung für Fliesen“ mit Plan `untergrund` (ohne Achse, ohne Bemaßung, interaktiv). Danach Leitachse: Themen als Register (die H2 bleibt sr-only), Ursachen als Feldraster, Prüfkriterien als Schrittfolge (Nummern verborgen), Überblick als Feldraster mit den Ankern `din18534`, `abbruch`, `ausgleich`, `rissverharzung`, Typische Untergründe als Halbverband, Vor-Ort-Aufmaß mit Knöpfen (Telefon und WhatsApp aus `COMPANY_DATA`), Ratgeber als Merkliste.

**/untergrund-abdichtung/din-18534:** Einstieg mit ID `din-heading`, Planblatt „DIN 18534 Verbundabdichtung“ mit Plan `abdichtung`. Geltungsbereich (Kopf links, sechs Teile als Halbverband), Wassereinwirkungsklassen als `Tabelle` (Name = bisheriger Caption-Text) mit `Hinweis`, Abdichtungsstoffe als Feldraster, Kritische Punkte (Kopf links, Merkliste mit H3-Titeln, Hinweisbox), Schichtdicken als Schrittfolge, Fragen als native Aufklapper im KERN-Stil, Abschluss mit Knöpfen, Ratgeber als Merkliste.

**Drittes Feld in Dreierrastern:** `spanne={2}` mit `lg:col-span-1`, damit im mittleren Breitenbereich keine graue Restzelle bleibt.

**Entfernt:** Icon-Kacheln, lucide-Icons, ambient-glow, glass-/ceramic-/eyebrow-Klassen, Beliebigwerte, die Icon-Datenimporte aus `ersatz`. Metadaten und `createMetadata` unverändert. `layout.tsx` nicht berührt.

## GEMEINSAME DATEIEN
Keine Änderung nötig.

Hinweis für den Orchestrator: Die Textvergleich-Basis `_werkstatt/belege/e0` ist älter als HEAD. Gegen HEAD (Produktion 4310) gehen keine Zeile, kein Link und keine Wortspanne verloren. Gegen e0 fehlen 19 bzw. 17 Zeilen aus dem geteilten QualityPromise-Block und ein `wa.me`-Link. Das liegt nicht an diesem Paket. Basis e0 sollte aktualisiert werden.

Im Baum liegen weitere geänderte Dateien (`ausgleich-gefaelle/page.jsx`, `estrich-belegreife/page.jsx`, `fliesen/*`). Sie gehören nicht zu diesem Paket.

## PRÜFUNG UND ERGEBNIS
**Prüfstufe A** (`pruefe-a.sh E5-BAU-01 … -- /untergrund-abdichtung /untergrund-abdichtung/din-18534`): **GESAMT GRÜN**, Laufzeit 428 s.
- Typprüfung (tsc): GRÜN, 0 Fehler in den eigenen Dateien.
- Lint (eslint): GRÜN, 0 Fehler, 0 Warnungen.
- Funktionstests: GRÜN, 72 erwartet, 0 unerwartet, 0 flaky.
- Bilder: HTTP 200 auf beiden Seiten, Konsole 0, Überlauf 0. Überlappung: Hub 0; din-18534 26 (siehe OFFENE FRAGEN).
- Textvergleich: GRÜN, entfernt 0, unerlaubt entfernt 0.
- Gegen HEAD (4310): Zeilen-, Link- und Wortverlust 0; H1 und alle Überschriften identisch.
- `werte.mjs`: 0 Befunde. `bezeichner.cjs modul`: leer. ESLint auf beiden Dateien: sauber.

## MIKROTEXT-ÄNDERUNGEN (alt → neu)
Keine Wörter ersetzt oder entfernt. Nur Zusätze:
- Planblatt-Schriftfeld (Pflicht laut Paket): „Blatt“, „Verband: Kreuzfuge“, „Betrieb“, „Inhaber“, „Kammer“, „Betrieb seit“ mit den Stammdaten.
- Din-18534: sr-only „Hinweis:“ (Baustein `Hinweis` ohne Titel).
- Din-18534: Schrittnummern 01–05 (Baustein `Schrittfolge`), per `nummerStumm` für Screenreader verborgen.

Strukturelle Änderungen: Die Ratgeber-Gruppe war ein `nav`, ist jetzt ein `section` über `Abschnitt`. Die Themen-H2 ist sr-only in einem `section`, weil der Baustein keine verborgene Überschrift erlaubt.

## BILDBELEGE
Ordner: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E5-BAU-01/`
- Hub, ganze Seite d1440: `voll-hub/d1440-voll.jpg`. Teile je 2300 px: `voll-hub/d-teil1.jpg` … `d-teil5.jpg`. Ganze Seite m390: `voll-hub/m390-voll.jpg`.
- Din, ganze Seite d1440: `voll-din/d1440-voll.jpg`. Teile: `voll-din/d-teil1.jpg` … `d-teil5.jpg`. Ganze Seite m390: `voll-din/m390-voll.jpg`.
- Prüfstufe A: `bilder/untergrund-abdichtung/{m390,d1440}.jpg` und `bilder/untergrund-abdichtung__din-18534/{m390,d1440}.jpg`.

Die Vollbilder entstanden vor der letzten Änderung (verborgene Schrittnummern), die sichtbar nichts ändert.

## OFFENE FRAGEN
1. **FAQ (din-18534):** Native Aufklapper im KERN-Stil statt `FAQAccordion`. Der Baustein fügt je Frage Mikrotexte hinzu („Haben Sie eine Frage zu Ihrem Bauvorhaben?“ und Anrufvarianten). Soll er trotzdem verwendet werden?
2. **Überlappung din-18534 (26):** Der Detektor zählt Texte geschlossener Aufklapper (FAQ). Die Produktionsseite hat dieselbe Art Befund (21 mobil, 5 am Desktop). Visuell ist nichts verdeckt. Soll der Detektor angepasst werden?
3. **„Mehr zu … erfahren“ auf der Hub-Seite:** Der Text bleibt sichtbar, wirkt im Register aber neben dem Namen redundant. Mikrotext-Entscheidung beim Orchestrator.
4. **Zusätze:** Sind die sr-only „Hinweis:“ und die Planblatt-Felder akzeptiert?
