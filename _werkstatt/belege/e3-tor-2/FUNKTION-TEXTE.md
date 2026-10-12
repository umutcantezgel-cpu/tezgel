# E3-PRUEF-F2: Funktion, Texte, axe, Werte am E3-Tor (Anlauf 2)

**Stand:** Port 4310, Produktionsbuild `adacabf`, Lauf am 2026-10-12. Prüfer: Arbeitsmodell. Keine Quell-, Test-, Werkzeug- oder Erlaubnisdateien geändert, kein Commit, kein Push, Entwicklungsserver 4320 nicht angefasst.

**Gesamt:** Funktion GRÜN · Texte ROT · axe: keine kritischen, 81 ernste Knoten · Werte: 3 Befunde

## 1. Funktionssuite (Playwright, workers=1, Projekte mobil und desktop)

- Tests gesamt: 310 (155 je Projekt, 14 Spezifikationen)
- erwartet: 290
- unerwartet: 0
- flaky: 0
- übersprungen: 20
- Laufzeit: 12,0 min
- Fehlschläge: keine, daher keine Einzelwiederholung nötig

Übersprungen (20):
- `test.fixme` Konfigurator: „Weiß nicht“ bei Fußbodenheizung (mobil, desktop); „Nur Treppe“ ohne erfundene Fläche (mobil, desktop). 4 Läufe, offene Fragen im Spec.
- Bedingt je Projekt: Kontaktwege 3, Navigation 5 (Hover, Tastatur, Klick im Untermenü, Desktop-Navigation im Projekt desktop, Inhaltsverzeichnis mobil). 8 Läufe.
- Tracking 8 (mobil und desktop, Punkte 1 bis 4): Bedingung `RELAUNCH_TRACKING=1` nicht gesetzt, nur für Build mit Platzhalter-GA4-ID. Diese Tests sind in diesem Lauf nicht geprüft.

## 2. Texte (Basis e0 gegen e3-tor-2)

- Erhebung: `texte.mjs --satz e3-tor-2 --ansichten d1440,m390 --base http://127.0.0.1:4310`, 121 Seiten, 242 Läufe (Seitenmenge wie e0)
- Vergleich: `texte-vergleich.mjs e0 e3-tor-2 --erlaubt texte-erlaubt.json` (238 Einträge)
- **Ergebnis: ROT**

Zahlen:
- unerlaubt entfernte Zeilen: 21 (alle gelistet, Grenze 80)
- unerlaubt entfernte Wortspannen: 2 (Seite `/fliesen/konfigurator`, Block main, je Ansicht d1440 und m390)
- SEO-Abweichungen (jsonld, h1, canonical, robots, status): 0
- unerlaubte Meta-Änderungen (description, og_description; vom Werkzeug nicht im SEO-Zähler): 6
- Sitemap: 163 (e0: 163), entfernt 0, hinzu 0
- robots: unverändert
- kaputte interne Links: 0 (interne Ziele 168)
- Zusatzzahlen (keine Prüfgröße): Zeilen hinzu 7031; Spannen entfernt 2880 (davon unerlaubt 2), hinzu 3320

### 2a. Unerlaubt entfernte Zeilen (21)

- 20 × Zeile `F`, main_zeilen, je 10 Blogseiten × 2 Ansichten: `/blog/barrierefreier-balkonaustritt`, `/blog/duschrinne-oder-punktablauf`, `/blog/feinsteinzeug-oder-naturstein-vergleich`, `/blog/fliesen-fuer-allergiker`, `/blog/fliesen-reinigen-pflegen`, `/blog/fliesenleger-gesucht-geselle-meister`, `/blog/gaeste-wc-fliesen`, `/blog/rutschfeste-fliesen-r-klassen`, `/blog/schimmel-fliesenfugen-vermeiden`, `/blog/undichte-dusche-warnzeichen`. Befund: Avatar-Initial der Autorenkarte (`charAt(0)` in BlogAuthorCard) fehlt im sichtbaren Text. Autorenname „Fliesenverlegung Tezgel“ und Wortfolge des Blocks sind unverändert. Muster an `/blog/gaeste-wc-fliesen` geprüft. Kein Eintrag in der Erlaubnisliste.
- 1 × Zeile „Verschnitt-Richtwerte je Verlegemuster“, `/fliesen/konfigurator@m390`, main_zeilen. Im sichtbaren Text mobil nicht mehr vorhanden, im Blocktext an gleicher Stelle weiter vorhanden. Die übrigen Tabellenzeilen sind erlaubt (E3-BAU-08, m390). Ursache nicht geklärt. Kein Eintrag für die Überschrift.

### 2b. Unerlaubt entfernte Wortspannen (2, Seite `/fliesen/konfigurator`, Block main)

Ursache: Werkzeug steht seit adacabf direkt unter dem Kopf (`src/app/(bestand)/fliesen/konfigurator/page.jsx`, Kommentar E4-NACH-13). Der Wortlaut ist nicht verloren: „Weiter zu Schritt 2“ und der Block kommen je Satz einmal vor. Die Spanne steht in e0 an Zeichenposition 1367 (nach „So funktioniert es …“), in e3-tor-2 an Position 360 (nach der Einleitung). Identisch in d1440 und m390. Kein Eintrag in der Erlaubnisliste.

Spanne (wörtlich, identisch in beiden Ansichten):
- text: `Fliesen-Konfigurator Schritt 1: Raum & Einsatzbereich Schritt 2: Untergrund & Bestand Schritt 3: Format, Material & Menge Schritt 4: Zusammenfassung & Kontakt Schritt 1 von 4 Fliesenprojekt vorbereiten Materialbedarf inkl. Verschnitt (Richtwert): Wählen Sie zuerst einen Bereich. 1. Raum & Einsatzbereich Wo soll gefliest werden? Mehrfachauswahl ist möglich. Raum und Einsatzbereich (Mehrfachauswahl) Wohn- & Essbereich Böden in Wohnräumen und offenen Grundrissen Küche Küchenboden und Küchenrückwand Flur & Diele Eingang, Diele, Garderobe Treppe Innen- oder Außentreppe, Tritt- und Setzstufen Balkon & Terrasse Frostsichere Außenbeläge Nur Untergrund / Abdichtung Ausgleich, Entkopplung, Abdichtung Bad, Dusche, Gäste-WC Dafür gibt es eigene Planungswerkzeuge Bitte wählen Sie mindestens einen Bereich aus. Weiter zu Schritt 2`
- kontext_vor: `ohne Speicherung auf dieser Website.`
- kontext_nach: `Berechnung So rechnet der Konfigurator:`

### 2c. Unerlaubte Meta-Änderungen (6, nicht im SEO-Zähler)

- `/` description und og_description; `/@m390` description und og_description: alt „… fugenlose Großformate & Terrassen. DIN 18534 zertifiziert. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!“, neu „… fugenarme Großformate & Terrassen. Abdichtung DIN 18534. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!“
- `/login` og_description und `/login@m390` og_description: gleiche Änderung

## 3. axe (Ebene 5, wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa)

- Lauf: `axe.mjs --satz e3-tor-2 --hauptansichten --zustaende --ansichten m390,d1440`, 12 Hauptansichten, 60 Läufe (normal, Menü m390, Erstbesuch m390 und d1440)
- Kritisch: 0
- Ernst: 81 Knoten (78 color-contrast, 3 target-size), in 18 von 60 Läufen
- Ohne Befund: 42 Läufe

| Seite | Ansicht / Zustand | Regel | Knoten |
|---|---|---|---|
| /fliesen/konfigurator | m390 normal, m390 Menü, m390 Erstbesuch | color-contrast | 6 je Lauf (18) |
| /fliesen/konfigurator | d1440 normal, d1440 Erstbesuch | color-contrast | 4 je Lauf (8) |
| /blog | m390 normal, m390 Menü, m390 Erstbesuch | color-contrast | 6 je Lauf (18) |
| /blog | d1440 normal, d1440 Erstbesuch | color-contrast | 4 je Lauf (8) |
| /blog/rutschfeste-fliesen-r-klassen | m390 normal, m390 Menü, m390 Erstbesuch | color-contrast | 6 je Lauf (18) |
| /blog/rutschfeste-fliesen-r-klassen | d1440 normal, d1440 Erstbesuch | color-contrast | 4 je Lauf (8) |
| /ueber-uns | m390 normal, m390 Menü, m390 Erstbesuch | target-size (`.lg\:self-auto`) | 1 je Lauf (3) |

Ziele Kontrast: Zählziffern (`.w-8.font-mono`) und Textabsätze in den nummerierten Listenelementen (`last:border-b`-Reihen) der drei Seiten. Ziele Ziel-Größe: `.lg\:self-auto` auf /ueber-uns, m390. Summe: 78 + 3 = 81.

## 4. Werte (Z-03, Dateiliste aus `git diff 8debc92 adacabf -- src`)

- Dateien: 52 (tsx, jsx, ts, js, css)
- Klassenvorkommen: 3678 (397 eindeutig), nicht prüfbare Stil-Werte: 8, Laufzeit 1,3 s
- Befunde: 3 (Exit 1). Alle Kategorien außer `style_wert` und `dauer_zahl` ohne Befund.
  - `src/components/kern/Zeitband.tsx:18` `dauer_zahl`: `dauer: Math.max(1, punkte[i+1].jahr - p.jahr)`. Es ist eine Jahresdifferenz als flex-Gewicht, keine CSS-Dauer. Vermutlich Fehlalarm der Regel.
  - `src/components/kern/Zeitband.tsx:52` `style_wert` `style.flexGrow`: datengetriebene Breite je Stück, keine CSS-Variable.
  - `src/components/kern/Zeitband.tsx:52` `style_wert` `style.flexBasis`: wie oben.
- Bericht: `_werkstatt/belege/e3-tor-2/werte/2026-10-12T03-13-21-824Z.json`

## 5. npm test

Nicht wiederholt. Reinraum-Ergebnis laut Briefing: 37 bestanden, 0 fehlgeschlagen.

## 6. Gesamturteil

- Funktion: GRÜN (0 unerwartet, 0 flaky, 20 übersprungen)
- Texte: ROT (21 unerlaubte Zeilen, 2 unerlaubte Wortspannen auf /fliesen/konfigurator, 6 unerlaubte Meta-Änderungen; Sitemap 163, robots unverändert, kaputte Links 0, SEO-Zähler 0)
- axe: keine kritischen; 81 ernste Knoten (Kontrast 78 auf /fliesen/konfigurator, /blog, /blog/rutschfeste-fliesen-r-klassen; Ziel-Größe 3 auf /ueber-uns)
- Werte: 3 Befunde in `src/components/kern/Zeitband.tsx`
