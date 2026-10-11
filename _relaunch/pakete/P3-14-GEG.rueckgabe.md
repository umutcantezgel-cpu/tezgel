# P3-14-GEG · Rückgabe · Gegenprüfer Testschreiber (Opus, frisch) · Kriterium Z-03

Geprüft: `git diff e0de94c~1 HEAD -- _relaunch/werkzeuge/tests/`. Das umfasst P3-14a (bf24a13), P3-14b (e0de94c), P3-14c (c14f909), P3-14d (4f511f5), den Orchestrator-Test a41f371 und dazu `fixtures.mjs` (926059b). Gelesen habe ich außerdem die Rückgaben a–d, das Briefing P3-14, `MUTATION.md` samt `mutationen.py`, die FUNKTIONSLISTE und die betroffenen Quellen. Die Quellen waren `kern/einwilligung/Banner.tsx` + `BannerInsel.tsx`, `hooks/useConsent.ts`, `common/CookieConsent.tsx`, `lib/formulare/useHeroKontakt.ts`, `layout/MobileBottomBar.tsx`, `kern/fuss/*` und `kern/kopf-b/Kopf.tsx`.
Grenzen eingehalten: nur gelesen und `node testzahl.mjs` ausgeführt. Kein Testlauf, kein Build, kein git mit Schreibwirkung, keine Server-Anfrage.

## Sperrklinke
`node testzahl.mjs`: **grün** (Specs 11 · Fälle 115 · expect 484 · fixme 3 · skip 6). Textzählung je Datei, Basis `e0de94c~1` → HEAD:

| Spec | Fälle | expect | fixme | skip |
|---|---|---|---|---|
| hero-kontakt | 3 → 4 | 8 → 11 | 0 → 0 | 0 → 0 |
| preisrechner | 9 → 9 | 37 → 37 | 0 → 0 | 0 → 0 |
| express-funnel | 10 → 10 | 52 → 54 | 0 → 0 | 0 → 0 |
| kontaktwege | 9 → 9 | 22 → 22 | 0 → 0 | 3 → 3 |
| einwilligung | 13 → 15 | 46 → 51 | 1 → 1 | 0 → 0 |
| navigation | 23 → 24 | 102 → 114 | 0 → 0 | 3 → 3 |

Bei navigation bleibt die Skip-Zahl nur durch einen Tausch gleich: `test.skip(!isMobile)` (alt Z. 66) ist entfallen, `test.skip(true, …)` (neu Z. 151) kam dazu. Von den +12 expect sind rund 10 Duplikate (siehe H-1).

## Urteil je Spec: „Erwartungen gleich oder strenger“
| Spec | Urteil | Kurzgrund |
|---|---|---|
| `funktion-hero-kontakt.spec.mjs` | **ja** | Nur `bedienbar` ergänzt. Der neue Fall `projectType: 'aussen'` ist trennscharf, denn der Hook-Standard ist `'bad'` (`useHeroKontakt.ts:15`). |
| `funktion-preisrechner.spec.mjs` | **ja** | Alle 8 Fälle laufen zusätzlich auf `/`. Nutzlast, Texte und E-014 sind unverändert. `wahl`/`vorarbeit` nutzen dieselbe Teilsuche über den Namen wie vorher. |
| `funktion-express-funnel.spec.mjs` | **ja** | Die Bedienfälle laufen zusätzlich auf `/#express-anfrage`. `aria-pressed` → `projektGewaehlt().toHaveCount(1)` ist gleichwertig. Neue Wartebedingungen. Zu `absenden` siehe N-1. |
| `funktion-kontaktwege.spec.mjs` | **nein** | Die Rückfallebene in `wegWhatsApp` nimmt auf Bestandsseiten auch die Leiste an. Abzeichen und Entprellung des Bestand-Widgets sind im Kandidaten ungeprüft. Auf dem Leistenweg ist die aria-label-Prüfung tautologisch (H-2, M-3). |
| `funktion-einwilligung.spec.mjs` | **nein** | Nach dem Neuladen wird das zustandsabhängige Schild durch den stets vorhandenen Fußlink ersetzt; der Check kann nicht mehr scheitern (M-1). Die Bestand-Bannerfälle laufen nur noch auf der Kern-Seite `/` (M-2). Die neuen Fälle (Checkbox `toBeChecked`, M-16, Karte nach Einwilligung) sind strenger bzw. neu. |
| `funktion-navigation.spec.mjs` | **nein** | Das Bestand-Mobilmenü ist im Kandidaten nirgends mehr geprüft. Die Desktop-Zweige sind wörtliche Duplikate der Mega-Menü-Fälle (H-1). V-06 überspringt sich selbst, wenn ein Produkt-Attribut fehlt (M-4). FAQ `/` ist gleichwertig. |

## Befunde

### H-1 · hoch · `funktion-navigation.spec.mjs` Z. 79–140: Bestand-Drawer ohne Abdeckung, Desktop-Zweige doppelt
- Alle drei Mobilmenü-Fälle öffnen nur `/`. Das ist im Kandidaten Kern. Damit prüft im Kandidaten kein Fall mehr den Bestand-Drawer `Architektur-Menü öffnen` (`aria-hidden`-Dialog), weder mobil noch am Desktop. Andere Specs prüfen ihn auch nicht (grep über `tests/`).
- In der Basis lief der Drawer-Fall auch am Desktop (kein Skip, Bestand 1440 px hat den Schalter). Diese Abdeckung ist ersatzlos weg, obwohl alle übrigen Seiten den Bestand-Kopf tragen (F-13 „global“).
- Die neuen Desktop-Zweige (Z. 93–103 und Z. 116–123) sind Schritt für Schritt identisch mit „Tastatur: Schalter per Enter …“ (Z. 56–66) und „Klick auf einen Untermenü-Punkt …“ (Z. 68–75) auf derselben Seite. Sie heben die expect-Zahl um rund 10, schützen aber nichts zusätzlich.
- Vorschlag: Die drei Drawer-Fälle über `['/', '/leistungen']` laufen lassen. Mobil auf beiden Seiten den Drawer prüfen, am Desktop auf `/leistungen` (Bestand) den Drawer. Am Desktop auf `/` statt des Duplikats prüfen, dass der Kern-Menüschalter ab xl fehlt bzw. verborgen ist.

### H-2 · hoch · `funktion-kontaktwege.spec.mjs` Z. 56–71, 82–109: Rückfall auf die Leiste verdeckt Bestand-Fehler
- `wegWhatsApp` nimmt den Kanal, wenn er binnen 1 s sichtbar wird, sonst die Leiste. Der Bestand hat dieselbe Leiste (`MobileBottomBar.tsx:27/51`, gleicher Name). Mobil auf `/kontakt` und `/bad` werden die Fälle „Widget …“ deshalb auch dann grün, wenn das Bestand-Widget `#whatsapp-floating-btn` unsichtbar oder unklickbar ist.
- Vorher musste es genau das Widget sein. Die Wahl des Wegs ist an das Laufzeitverhalten gekoppelt, nicht an Seite und Projekt.
- Dazu kommt: „kein vorgetäuschtes Abzeichen“ (E-012) und „Entprellung“ laufen nur auf `/`. Für das Bestand-Widget auf allen übrigen Seiten gibt es im Kandidaten keine Prüfung mehr.
- Vorschlag: Den Weg deterministisch festlegen: Leiste nur bei `pfad === '/' && isMobile`, sonst ausschließlich `#whatsapp-floating-btn`; bei Fehlen rot. Abzeichen und Entprellung zusätzlich auf `/kontakt` laufen lassen (Bestand).

### M-1 · mittel · `funktion-einwilligung.spec.mjs` Z. 76–78 (dazu Z. 121–122 für `/`): „bleibt nach Neuladen zu“ ist auf `/` nicht mehr prüfbar
- Das Bestand-Schild erscheint erst, wenn der Banner-Hook gemountet ist und `showBanner` false ist (`CookieConsent.tsx:719`). Der Kern-Fußlink kommt dagegen vom Server und ist immer da.
- Der Banner ist `ssr:false` (`BannerInsel.tsx:8`) und erscheint ohne Cookie erst 400 ms nach dem Mount (`useConsent.ts:140–143`). `expect(banner).toHaveCount(0)` gilt deshalb sofort nach `reload()`, bevor der Banner überhaupt laden kann.
- Eine Mutation „Kern-Banner ignoriert den gespeicherten Cookie und öffnet wieder“ bliebe grün; die Cookie-Prüfung danach liest nur den Kontext.
- Vorschlag: Nach dem Neuladen `bedienbar(widerruf(page))`. Dann per `addInitScript` und MutationObserver festhalten, ob der Dialog je erschien, und darauf `expect.poll` (Zustand, keine feste Wartezeit). Alternativ den Fußlink klicken und `Aktiviert` = 0 prüfen; das belegt, dass der gespeicherte Zustand gelesen wurde.

### M-2 · mittel · `funktion-einwilligung.spec.mjs` Z. 61, 69, 90, 98: Bestand-Banner nur noch teilweise geprüft
- Diese vier Fälle laufen nur auf `/` und prüfen im Kandidaten nur noch den Kern-Banner: „Schließen ohne Wahl“, „Alle ablehnen“ (erste Ebene), „#cookie-settings öffnet direkt“ und „Auswahl speichern“.
- Der Bestand-Banner (`CookieConsent.tsx`) auf allen anderen Seiten hat für diese Wege keinen Fall mehr. F-11 „global“ ist damit nur für „Alle akzeptieren“ (`/kontakt`) und den Widerruf (`/standorte`) belegt.
- Vorschlag: Die vier Fälle über `['/', '/kontakt']` laufen lassen, mit der Rolle der Kategorie je Fassung (Kern `checkbox`, Bestand `button`). Die Weg-nach-Seite-Regel des Briefings erlaubt genau das; die Kern-Rolle wird dadurch nicht abgeschwächt.

### M-3 · mittel · `funktion-kontaktwege.spec.mjs` Z. 94–99: Abzeichen-Fall auf dem Leistenweg tautologisch
- Mobil auf `/` wird die Leiste über `getByRole('link', { name: LEISTE_NAME, exact: true })` gefunden.
- `toBeVisible()` ist durch `wegWhatsApp` bereits gesichert. `toHaveAttribute('aria-label', name)` prüft den Namen, über den der Link gefunden wurde. Nur die „1“-Prüfung kann scheitern.
- Vorschlag: Auf dem Leistenweg die Leiste über ihren Ort suchen (`aside[aria-label=…] a[href*="whatsapp"]`) und den Namen dann prüfen. Oder den Fall dort ausdrücklich auf die Abzeichen-Aussage beschränken und ihn für den Kanal auf `/kontakt` ergänzen (siehe H-2).

### M-4 · mittel · `funktion-navigation.spec.mjs` Z. 150–152: V-06 überspringt sich selbst, wenn ein Produkt-Attribut fehlt
- Der Fall entscheidet über `header[data-kopf="b"]` (`kern/kopf-b/Kopf.tsx:40`), ob er läuft. Fehlt das Attribut oder liefert `/` versehentlich den Bestand-Kopf, wird der Fall übersprungen statt rot.
- Ein Lauf gegen die Basis belegt hier keine Trennschärfe: Dort ist er „skipped“, nicht rot. Die Aussage „wäre rot“ in P3-14d stützt sich nur auf eine Probe außerhalb des Specs.
- Vorschlag: Das Überspringen an die Fassung des Ziels koppeln (z. B. Umgebungsvariable oder Liste „`/` ist Kern im Kandidaten“) statt an das DOM. Im Kandidaten zusätzlich `expect(header[data-kopf="b"]).toHaveCount(1)` prüfen.

### N-1 · niedrig · `funktion-express-funnel.spec.mjs` Z. 33–34
`absenden` nimmt auf jeder Seite beide Namen an. MIKROTEXTE Z. 26 gibt „Anfrage senden“ nur für `/` frei. Eine Umbenennung im Bestand auf `/kontakt` bliebe unbemerkt. Vorschlag: den Namen nach `seite` wählen.

### N-2 · niedrig · `funktion-einwilligung.spec.mjs` Z. 213–217 (neuer Fall „Karte ohne Platzhalter“)
`LADE_KNOPF toHaveCount(0)` gilt sofort nach `scrollIntoViewIfNeeded`, auch bevor der Platzhalter eingebunden ist. Trennscharf ist nur der Poll auf Karten-Anfragen. Vorschlag: vorher auf die geladene Karte bzw. das iframe warten, danach die 0 prüfen.

### N-3 · niedrig · `funktion-einwilligung.spec.mjs` Z. 198 (a41f371)
`toEqual(vorher)` wird sofort gelesen, nicht gepollt. Eine asynchron nachträglich geschriebene Einwilligung bliebe unbemerkt. Vorschlag: kurz `expect.poll(...).toEqual(vorher)` mit kleinem Zeitfenster, oder den Vergleich nach dem Schließen der Einstellungen wiederholen.

### N-4 · niedrig · `funktion-navigation.spec.mjs` Z. 122 und Z. 221
- Z. 122: „Menü schließt“ wird nach einem Seitenwechsel auf eine Bestandsseite geprüft (neuer Kopf, frischer Zustand) und ist damit trivial. Das gilt ebenso für den Mega-Menü-Fall Z. 74.
- Z. 221: Der Titel nennt noch `aria-expanded`, im Kern wird aber `details.open` geprüft.
- Vorschlag: Für das Schließen auf `/` einen Ziel-Link mit `#`-Anker verwenden oder den Zustand vor der Navigation prüfen. Den Titel angleichen.

### N-5 · niedrig · `fixtures.mjs` Z. 9 (926059b, nicht Teil der Teilpakete)
Das IP-Oktett ist `20 + Sekunde % 200`. Zwei Läufe im Abstand von genau n·200 s teilen sich die IPs. Das ist harmlos und keine Erwartungsänderung. Gleichzeitig ist bestätigt, dass kein Test das Rate-Limit selbst prüft.

## Trennschärfe und Mutationsprobe
- **Belegbar:**
  - `MUTATION.md` nennt je Mutation nur eine Auswahl roter Fälle. Ein Bericht je Fall liegt nicht vor; `suite-ad80754.log` ist abgeschnitten und `scratchpad` enthält nur das Skript.
  - Bei K7 (Kanal-Nummer) ist nur „/: alle WhatsApp-Links …“ genannt. Ob „Widget /“ am Desktop dabei rot wurde (das wäre der Beleg, dass `wegWhatsApp` dort den Kanal wählt), lässt sich nicht nachprüfen. Vorschlag: Bei der nächsten Probe die rote Fallliste vollständig ablegen.
- **Gegen die Basis trennend belegt:** a41f371 (Basis 2/2 rot, laut Commit). Die übrigen neuen Fälle sind auf der Basis grün oder übersprungen. Das ist gewollt, weil sie gleiche Funktion prüfen; trennscharf ist dann nur die Mutation.

Fälle ohne Mutationsabdeckung, mit Vorschlag:

| Fall | Vorschlag Mutation |
|---|---|
| hero „Balkon & Terrasse → projectType aussen“ (K1 trifft ihn nur über das Telefon) | `HeroKontakt.tsx`: Radio-`onChange` → `setProjectType('bad')` |
| preisrechner `/` „anderes Gewerk …“ (K2 trifft ihn nur über den Datenschutz-Haken) | `PreisrechnerAnsicht.tsx`: Gewerk-Radio-`onChange` ohne Wirkung |
| funnel `/` „Schritte … Auswahl bleibt erhalten“ (`projektGewaehlt`) | `AnfrageFunnelAnsicht.tsx`: Projekt-Radio `checked={false}` |
| einwilligung „Auswahl speichern“ (Checkbox, `toBeChecked`) | `kern/einwilligung/Banner.tsx`: Marketing-`onChange` ohne Wirkung, oder `handleSaveSettings` → `handleAcceptAll` |
| einwilligung „Alle ablehnen … bleibt nach Neuladen zu“ | Kern-Banner `showBanner` nach Mount immer true; erwartet: bleibt grün (M-1) |
| einwilligung Widerruf `/` über den Fußlink, Teil „Aktiviert = 2“ | Banner: `isChecked` für Analyse/Marketing fest false |
| einwilligung M-16 Platzhalter „Cookie-Einstellungen“ (a41f371) | `KartenPlatzhalter.tsx`: `zuDenEinstellungen` ohne Wirkung bzw. → `handleAccept` (trifft `toEqual(vorher)`) |
| einwilligung „/: Karte ohne Platzhalter … (alle)“ | `KartenPlatzhalter.tsx`: Einwilligung ignorieren (immer Platzhalter) |
| kontaktwege „kein vorgetäuschtes Abzeichen“ (Kern-Kanal) | `WhatsAppKanal.tsx`: `<span>1</span>` im Knopf ergänzen |
| kontaktwege „Doppelklick … Entprellung“ (Kern-Kanal) | `WhatsAppKanal.tsx`: Entprell-Sperre entfernen |
| kontaktwege „Widget /“ mobil (Leiste) | `UntereLeiste.tsx`: WhatsApp-Nummer ändern (K6 traf nur `tel:`) |
| navigation FAQ „Startseite: Akkordeon …“ (Kern `details`) | Kern-`AkkordeonEintrag`: `open` fest setzen bzw. `summary`-Klick per `preventDefault` sperren |
| navigation V-06 Desktop (Untermenü ohne JS) | `kopf-b`: `popoverTarget` des Untermenü-Schalters verfälschen (K8 traf nur den mobilen Schalter) |
| navigation Desktop-Zweige Z. 93–123 | gleiche Mutation wie bei V-06 Desktop; trifft auch die Mega-Menü-Fälle (Duplikat, H-1) |
