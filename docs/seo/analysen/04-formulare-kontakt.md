# Analyse: Kontaktwege und Formulare

> Momentaufnahme vom 01.11.2026 (Code-Stand `main` f19ebba, Werkstatt-Branch 40 Commits voraus). Erstellt als Grundlage für [`docs/seo/KONTEXT.md`](../KONTEXT.md); bei Abweichungen gilt `KONTEXT.md`, das nach einer unabhängigen Gegenprüfung korrigiert wurde. Zeilennummern können sich mit späteren Commits verschieben. Hinweise auf damals noch fehlende Dateien im Bildordner (`bildinventar`, `projekte.md`, `KONTEXT.md`, Platzhalter im README) sind mit dem Commit der Bilder erledigt. `B/` = `src/app/(bestand)/`.

## 1. Inventar (Fakten)

Kürzel: `(b)/` = `src/app/(bestand)/`, `fo/` = `src/lib/formulare/`, `fu/` = `src/components/funnels/`, `em/` = `src/lib/email/`. Mit „Branch“ ist `claude/tezgel-website-redesign-iqxt8z` gemeint. Alle Formulare senden JSON an `POST /api/anfrage`. Ein `*` markiert ein Pflichtfeld.

| # | Formular · Code | Seiten | Schritte · Felder | Einwilligung · Spamschutz | Erfolg |
|---|---|---|---|---|---|
| F1 | Startseite · `src/components/forms/HeroContactForm.tsx`, `fo/useHeroKontakt.ts` | `/` (`(b)/page.tsx:26`) | 1 Schritt · Vorhaben (4 Optionen, `useHeroKontakt.ts:7-12`), Name*, Telefon*, E-Mail, Ort, Notiz (`HeroContactForm.tsx:137-251`); WhatsApp-Link ohne Pflichtfelder (`:279-288`) | keine Checkbox, kein Datenschutzhinweis · Honeypot, `_t` (`useHeroKontakt.ts:23`) | „24 Stunden“ (`:82`) |
| F2 | Schnellanfrage · `src/components/forms/LeadQuickForm.tsx`, `fo/useSchnellanfrage.ts` | 13 × `/standorte/[stadt]` (`page.tsx:133-139`); 52 × `/leistungen/[id]/[stadt]` über `FinalCTA.tsx:130-139` (`(b)/leistungen/[id]/[stadt]/page.tsx:405-412`) | 1 Schritt · Name*, Telefon*, E-Mail, PLZ/Ort, Notiz (`LeadQuickForm.tsx:199-280`) | Checkbox* (`useSchnellanfrage.ts:32`) · Honeypot mit vorgetäuschtem Erfolg (`:26-30`), `_t` | „24 Stunden“ (`LeadQuickForm.tsx:136`) |
| F3 | Express · `fu/TezgelAnfrageFunnel/*`, `fo/useAnfrageFunnel.ts` | `/kontakt` (`kontakt/page.jsx:31`), `/leistungen` (`:92`), `/leistungen/[id]` (`:267`), `/foerderung` (`:170`) | 3 Schritte (`logik.ts:4-8`) · Projekt (5), Fläche, Zeitraum, Ort; Name*, Telefon*, E-Mail, Notiz (`Schritt3.jsx:68-127`) | nur Hinweis (`Schritt3.jsx:140-149`) · Honeypot, `_t` | „24 bis 48 Stunden“ (`Erfolg.jsx:40`) |
| F4 | Badanfrage · `fu/BadanfrageFunnel/*`, `fo/useBadanfrage.ts` | 8 Bad-Seiten, u. a. `/bad` (`bad/page.jsx:60`), `/bad/badanfrage` (`:64`), `/bad/badplaner` (`:161`) | 5 Schritte (`useBadanfrage.ts:46`) · Objekt, Umfang, Maße, Personen, Stufe, 6 Extras; Name*, Telefon*, E-Mail, Straße, PLZ, Notiz (`Schritt5.jsx:45-132`) | Hinweis · Honeypot, kein `_t` (`useBadanfrage.ts:3`) | keine Fristzusage |
| F5 | Projektcheck · `fu/BadProjektCheck/*`, `fo/useProjektCheck.ts` | `/bad` (`bad/page.jsx:59`), `/bad/projekt-check` (`:63`) | Regler, Umfang, Niveau, 8 Extras, dann ein Knopf, danach Name*, Telefon*, E-Mail; **kein Ort** (`useProjektCheck.ts:111-115`) | Hinweis · weder Honeypot noch `_t` (`:4`) | „24 bis 48 Stunden“ (`Zusammenfassung.jsx:179`) |
| F6 | Konfigurator · `fu/FliesenKonfigurator/*`, `fo/useFliesenKonfigurator.ts` | 13 Fliesen-Seiten, u. a. `/fliesen` (`fliesen/page.jsx:55`), `/fliesen/kueche` (`:279`) | 4 Schritte · bis etwa 30 Eingaben; Name*, Telefon*, PLZ, Zeitraum, Notiz (`Schritt4.jsx:27-105`) | Checkbox* (`:111`) · weder Honeypot noch `_t` (`useFliesenKonfigurator.ts:5`) | in der Ansicht |
| F7 | Preisrechner · `src/components/pricing/PricingCalculator.tsx`, `fo/usePreisrechner.ts` | `/preise` (`:187`), `/faq` (`:252`), `/leistungen/[id]` (`:239`) | 1 lange Seite in 3 Phasen · Gewerk*, Name*, Telefon* | Checkbox*, nur per JS geprüft (`usePreisrechner.ts:58-77`) · Honeypot, `_t` | „zeitnah“ (`PricingCalculator.tsx:329`) |
| F8 | Terminformular · `(b)/termin/page.jsx:190-395`, `fo/useTerminAnfrage.ts` | `/termin` | 1 Schritt · Thema* (vorbelegt, `:43`), Datum, Zeitfenster (vorbelegt, `:45`), Name*, Telefon*, E-Mail, PLZ, Notiz | Checkbox* (`page.jsx:337`) · weder Honeypot noch `_t` (`useTerminAnfrage.ts:3`) | in der Ansicht |
| F9 | Kalender · `src/components/contact/BookingCalendar.tsx`, `fo/useTerminKalender.ts` | `/termin`, Standardansicht (`useTerminAnfrage.ts:37`) | 2 Schritte · Tag und Zeit; Name*, Telefon*, E-Mail, PLZ, Notiz (`BookingCalendar.tsx:186-271`) | Checkbox* · Honeypot, `_t` fest auf `Date.now()-3000` (`useTerminKalender.ts:133`) | „Terminanfrage bestätigt!“ (`BookingCalendar.tsx:66-69`) |

**Erfolg und Fehler:** Alle Formulare zeigen den Erfolg in der Ansicht mit Vorgangsnummer. Bei einem Fehler zeigen F1 und F3 bis F8 den Text des Servers (`FEHLER_HINWEIS` mit Telefon und WhatsApp, `em/mailer.ts:143-144`). F2 und F9 zeigen einen eigenen Text mit Rufnummer (`useSchnellanfrage.ts:72-78`, `useTerminKalender.ts:153-155`).

**WhatsApp** (F1, F3 bis F6, F8): Es öffnet sich nur ein vorbereiteter Text, der Server erfasst nichts. F3 und F4 verlangen vorher Name und Telefon (`useAnfrageFunnel.ts:91-94`, `useBadanfrage.ts:142-145`). F5, F6 und F8 nutzen einen zweiten Absende-Knopf, dabei gilt die Pflichtprüfung des Browsers.

**Direkte Wege:**
- Kopfzeile: `tel:`-Link (`src/components/common/Header.jsx:224`), WhatsApp-Knopf ab Breite lg (`FloatingWhatsAppWidget.tsx:29-40`).
- Mobile Leiste mit Anrufen, WhatsApp und Termin (`src/components/layout/MobileBottomBar.tsx:49-91`). Auf vier Ablaufseiten ist sie ausgeblendet (`src/config/navigation.js:83-85`).
- Abschlussblock `src/components/ui/FinalCTA.tsx:98-119` auf 13 Seiten.
- „Lieber anrufen/schreiben?“ steht unter dem Formular (`src/components/vorlagen/teile/Schritt.tsx:81-100`).
- `DirectContactCard.tsx:61-64` auf /kontakt.
- `CalendlySection.jsx:28-48` auf /beratung: nur Links, kein Calendly.
- `src/components/kern/Rueckfrage.tsx` auf 19 Seiten.
- Platzhalter ohne JavaScript (`fu/TezgelAnfrageFunnel/Platzhalter.tsx:1-7`).

**Server und Mail:**
- Höchstens 5 Anfragen je IP in 10 Minuten (`src/app/api/anfrage/route.ts:18-34`).
- Honeypot und Zeitsperre melden still Erfolg (`:56-72`).
- Zod verwirft unbekannte Felder (`em/validation.ts:129-175`).
- Absender kontakt@, Empfänger info@, Umgebungsvariablen haben Vorrang (`em/mailer.ts:27-38`, E-109).
- Wiederholung, Idempotenz und 503 statt Scheinerfolg (`mailer.ts:106-185`, `:150-155`, E-110).
- Betreff-Präfix „[Neue Anfrage]“ für Outlook-Regeln (`em/templates/teamEmail.ts:263-274`).
- Ungenutzt: `leadNotification.ts` und `clientConfirmation.ts`, nur exportiert (`em/index.ts:9-10`).
- E-109 und E-110 stehen nur in der Datei des Branch (`_werkstatt/ENTSCHEIDUNGEN.md:1735`, `:1781`). Auf main endet die Datei bei E-106 (`:1720`).

## 2. Wo es kompliziert ist

- Es gibt neun Formulare und vier verschiedene Listen für die Art des Vorhabens (`useHeroKontakt.ts:7-12`, `useAnfrageFunnel.ts:7-43`, `useTerminAnfrage.ts:9-17`, `src/components/pricing/pricing.constants.ts:38-75`).
- Mehrere Formulare auf einer Seite:
  - `/leistungen/[id]`: Preisrechner und Express, dazu der Abschluss (`(b)/leistungen/[id]/page.jsx:239`, `:267`, `:271`).
  - `/bad`: Projektcheck und Badanfrage (`bad/page.jsx:59-60`).
  - `/termin`: Kalender und Formular.
- Zu tief: Die Badanfrage hat 5 Schritte. Der Konfigurator hat bis zu 30 Eingaben, allein Schritt 3 bis zu 17 mit Treppe. Der „Badplaner“ ist nur Text plus Badanfrage (`bad/badplaner/page.jsx:161`).
- Einwilligung uneinheitlich: Checkbox in F2 und F6 bis F9, keine in F1 und F3 bis F5.
- Widersprüchliche Zusagen: 24 Stunden, 24 bis 48 Stunden und „zeitnah“ (`em/templates/customerEmail.ts:210`).
- Auf den Ablaufseiten fehlt mobil die Leiste (`navigation.js:83-85`). Auf Start- und Ortsseiten stehen Anruf und WhatsApp erst unter dem Formular (`Schritt.tsx:81-100`).
- Datenlücken: F5 fragt keinen Ort ab. F4 fragt keinen Zeitraum ab, das Feld `timing` trägt die Personenzahl (`useBadanfrage.ts:193`).

## 3. Vorschlag „Kurzanfrage“ (Empfehlung)

- **Basis:** `LeadQuickForm.tsx` (Fokusführung, `useId`, Fehlertext mit `tel:`, `:74-159`) und `useSchnellanfrage.ts` erweitern. Die Vorhaben-Kacheln aus `HeroContactForm.tsx:137-160` und den WhatsApp-Text aus `useHeroKontakt.ts:32-46` übernehmen.
- **Felder:**
  - Vorhaben* (ein Tipp: Bad, Dusche statt Wanne, Boden/Wand innen, Balkon/Terrasse, Treppe, Reparatur, Sonstiges)
  - Ort* (ein Tipp: Aßlar, Wetzlar, Solms, Braunfels, Gießen, Herborn, „anderer Ort“ öffnet ein PLZ-Feld; auf Ortsseiten per Prop vorbelegen, siehe Frage 3)
  - Name*, Telefon*
  - Zeitraum, Nachricht und E-Mail optional
  - Fotos per WhatsApp, denn die API nimmt nur JSON (`route.ts:37-44`). Vermutung: Ein Upload bräuchte eigenen Speicher und eine Ergänzung im Datenschutz (`src/lib/cookie-inventory.ts:136`).
- **Über dem Formular** zwei gleich große Knöpfe „Anrufen“ und „WhatsApp“. Der WhatsApp-Text nennt Vorhaben, Ort und Seite.
- **Erfolgsanzeige:** Vorgangsnummer, eine einzige Zusage, Knopf zum Anrufen.
- **Einwilligung:** Ein Hinweis mit Link statt Checkbox, falls Art. 6 Abs. 1 b/f als Rechtsgrundlage gilt (`cookie-inventory.ts:135-141`).
- **Spamschutz:** Honeypot behalten. Statt des absoluten `_t` die Ausfülldauer im Browser messen.
- **Einbau**, je eine Zeile:
  - `(b)/page.tsx:26`, `standorte/[stadt]/page.tsx:133`, `FinalCTA.tsx:132`, `kontakt/page.jsx:31`, `leistungen/page.jsx:92`
  - `leistungen/[id]/page.jsx:239` und `:267` (ein Formular statt zwei)
  - `foerderung/page.jsx:170`, `preise/page.jsx:187`, `faq/page.jsx:252`
  - 8 Bad-Seiten mit `vorhaben="bad"`, 13 Fliesen-Seiten
- **Stilllegen:**
  - F1, F3 bis F5 und F7 bis F9. F6 bleibt höchstens als Rechner ohne eigenes Formular.
  - Weiterleitungen in `next.config.ts:15-21`: `/bad/badanfrage`, `/bad/projekt-check` und `/bad/badplaner` auf `/bad`; `/termin` und `/beratung` auf `/kontakt`. Die bestehende Weiterleitung `/bad/budgetkalkulator` (`:17`) direkt aufs neue Ziel setzen, damit keine Kette entsteht.
  - Mitziehen: `src/app/sitemap.ts:29-31`, `:44`, `:57`; `navigation.js:83-85`, `:158-165`; 37 Dateien mit internen Links; 13 Funktionstests `_werkstatt/werkzeuge/tests/funktion-*.spec.mjs`.
- **Mailweg:**
  - `validation.ts`: neue Felder `quelle`, `vorhaben`, `zeitraum`, `dauerMs`; den Titel auf dem Server bilden.
  - `em/types.ts` anpassen.
  - `route.ts`: Quelle, Zone, neue Zeitsperre, eine Protokollzeile ohne Personendaten.
  - `teamEmail.ts`: Zeilen für Quelle, Ort und Vorhaben; das Präfix bleibt.
  - `customerEmail.ts:210` und `test/email-pipeline.test.mjs` anpassen.
  - Der Versandweg aus E-109/E-110 bleibt. Die ungenutzten Vorlagen löschen.
- **Lead-Qualität:** Pflicht sind nur Vorhaben und Ort, beide per Tipp. Die Zone rechnet der Server aus `src/lib/einzugszonen.ts:13-21` und `src/config/cities.ts`. Betreff dann z. B. „[Neue Anfrage] Bad · Wetzlar (≤ 10 km) · Name [Nr.]“. Keine Fragen nach Fläche oder Budget.

## 4. Werkstatt-Branch (per gh api gelesen)


- **`kontakt/page.jsx`:** Das Formular rückt in den ersten Bildschirm. Neu ist `EXPRESS_EINLEITUNG` (Branch `:32`); Einleitung und Vorspann stehen unter dem Funnel (Branch `:37-51`); `titelZeilen` ersetzt `vorspann` (Branch `:99`). Das braucht den Branch-Stand von `src/inhalte/kontakt.ts` (`:25`, `:50`, `:65-66`) und `ArbeitsSeite.tsx`. Der Funnel selbst bleibt gleich.
- **`Schritt1.jsx`:** nur Darstellung (Raster `:28`, `LETZTE_SPANNE` `:21`, Pfeil `:66`).
- **Ebenfalls geändert:** `standorte/[stadt]/page.tsx` (Slot `karte` heißt jetzt `band`, neue Fotoliste; Formular gleich, Branch `:145-150`), `FinalCTA.tsx`, `DirectContactCard.tsx`, `OrtsSeite.tsx`.
- **Unberührt:** `forms/*`, `fo/*`, `em/*`, `api/anfrage` und die übrigen Funnels. Der Branch liegt 40 Commits vor main und 0 dahinter.
- **Konfliktrisiko:**
  - Hoch in `kontakt/page.jsx` (main `:29-37`).
  - Hoch in `standorte/[stadt]/page.tsx`: Die Fotoliste (main `:24-31`) betrifft auch die Bildaufgabe.
  - Wer `Schritt1.jsx` löscht, bekommt einen Ändern/Löschen-Konflikt.
  - Gering in `FinalCTA.tsx`.
- **Empfehlung:** Den Branch zuerst übernehmen oder auf seinem Stand bauen. Die neue Logik in neue Dateien legen und auf den Seiten nur einzeilig tauschen.

## 5. Messbarkeit

**Fakten:**
- GA4 und Meta-Pixel laden nur, wenn die Umgebungsvariable gesetzt ist und eine Einwilligung vorliegt (`src/components/common/TrackingScripts.jsx:14-15`, `:19`, `:42`). Beide Variablen fehlen in `.env.example`. Die Einwilligung ist anfangs aus (`src/hooks/useConsent.ts:23-29`).
- Es gibt genau ein Ereignis, `whatsapp_click`, und nur am Desktop-Knopf (`fo/useWhatsAppKanal.ts:44-54`). Für Formularerfolg, `tel:`-Klicks und mobiles WhatsApp gibt es keins (`MobileBottomBar.tsx:61-70`). WhatsApp-Anfragen sind nur im Telefon des Inhabers sichtbar.
- `page_path` wird nur beim ersten Laden gesetzt (`TrackingScripts.jsx:53-55`).
- Vercel Analytics ist in der CSP erlaubt (`next.config.ts:85`), das Paket fehlt in `package.json`.
- Heute lässt sich nur F2 einer Seite zuordnen, über den Titel (`useSchnellanfrage.ts:48`, z. B. `standort-wetzlar`). Das Feld `source` (`:59`) verwirft Zod.
- F1 trägt keine Quelle. Seine Titel kollidieren mit F3, z. B. „Balkon & Terrasse“ (`useHeroKontakt.ts:10`, `useAnfrageFunnel.ts:24`).

**Empfehlung:**
1. Ein Feld `quelle` mit dem Seitenpfad, ersatzweise den `Referer`-Header (Policy `strict-origin-when-cross-origin`, `next.config.ts:68-69`). In Team-Mail, Betreff und Protokoll eintragen. So wird auch ohne Einwilligung gezählt.
2. Mit Einwilligung ein Ereignis `generate_lead` (page_path, vorhaben, zone) im gemeinsamen Hook. `click_to_call` und `whatsapp_click` über einen einzigen delegierten Listener in `TrackingScripts.jsx`. Auswertung nach Landingpage: `/` gegen `/standorte/wetzlar`.
3. Den Ort in den WhatsApp-Text aufnehmen; heute ist der Text allgemein (`src/lib/whatsapp.ts:131-133`).
4. Search Console je URL auswerten; der Link im Google-Unternehmensprofil bekommt UTM-Parameter.
5. `/leistungen/bad/wetzlar` (Quelle `leistung-bad-wetzlar`) zielt ebenfalls auf Wetzlar und sollte getrennt ausgewertet werden.

## Risiken und Fehler

1. **Der Kalender verliert den Wunschtermin**, meldet aber „bestätigt … eingetragen“. `preferredDate` fehlt im Schema (`validation.ts:108-115`; gesendet in `useTerminKalender.ts:119-123`). Die Team-Mail zeigt nur `date` und `timeSlotLabel` (`teamEmail.ts:29-34`). Intern ist das bekannt (`useTerminKalender.ts:3-4`).
2. **Anfragen gehen still verloren durch die Zeitsperre.** Der Server vergleicht das `_t` aus dem Browser mit seiner eigenen Uhr. Geht die Geräteuhr vor oder ist der Tab älter als 24 Stunden, sieht die Person einen Erfolg mit der Nummer „TEZ-BOT-IGN“, und keine Mail geht raus (`em/security.ts:165-173`, `route.ts:66-72`). Ein Kurzformular verschärft das, weil es schneller ausgefüllt ist (Vermutung).
3. Auf Vercel gibt es keinen dauerhaften Notfallspeicher (`mailer.ts:64-80`). Die Sperren liegen nur im Speicher der jeweiligen Instanz (`security.ts:70-71`, `mailer.ts:48`).
4. Das Terminformular setzt einen erfundenen Ort „Aßlar / Wetzlar“ ein und schickt vorbelegte Werte für Thema und Zeitfenster mit (`useTerminAnfrage.ts:43`, `:45`, `:109`).
5. Wählt man im Konfigurator alle 7 Bereiche, wird der Titel 142 Zeichen lang; erlaubt sind 120, der Server weist mit 400 ab (`useFliesenKonfigurator.ts:529`, `validation.ts:133-137`; nachgerechnet).
6. F1 hat keinen Datenschutzhinweis. Das sollte rechtlich geprüft werden.
7. „Bestätigung gesendet“ erscheint, egal ob die Mail tatsächlich verschickt wurde (`HeroContactForm.tsx:70-74`). Die Antwort des Servers enthält kein `customerSent` (`mailer.ts:150-155`).
8. Liefert der Server kein JSON, zeigt das Formular den Text des Parserfehlers (`useHeroKontakt.ts:81`, `:94`).
9. Das Datenschutzinventar nennt Meta-Conversions, der Code sendet aber keine (`cookie-inventory.ts:154`).
10. Die Metadaten von `/kontakt` stehen doppelt (`kontakt/layout.tsx:6-10`, `page.jsx:18-22`).
11. Die Werkstatt-Regel G8 schützt die Geschäftslogik (`_werkstatt/AUFTRAG.md:14`, `:64`). Der Umbau braucht deshalb eine ausdrückliche Freigabe.

## Offene Fragen an den Auftraggeber

1. Welche Werkzeuge bleiben: Konfigurator als Rechner, Projektcheck, Kalender? Wollt ihr eine echte Terminbuchung oder nur einen Rückruf?
2. Darf die Checkbox weg, und wer prüft das rechtlich?
3. Soll der Ort Pflicht sein? Darf er auf Ortsseiten vorbelegt werden, obwohl bisher „keine Vorauswahl“ gilt (`useHeroKontakt.ts:15`)?
4. Gilt ein Einzugsgebiet von 50 km (`einzugszonen.ts:16`)? Werden Anfragen von außerhalb angenommen?
5. Welche eine Zusage soll überall stehen, z. B. „Rückruf innerhalb von 24 Stunden an Werktagen“?
6. Sind `NEXT_PUBLIC_GA4_ID` und `NEXT_PUBLIC_META_PIXEL_ID` in Vercel gesetzt?
7. In welcher Reihenfolge laufen Werkstatt-Branch und Formularumbau?
8. Wird ein dauerhafter Speicher für Anfragen gewünscht?
9. Braucht es einen Foto-Upload, oder reicht WhatsApp?
10. Gibt es Zugang zur Search Console, um vor den Weiterleitungen die Klicks der alten URLs zu prüfen?
11. Hängen die Outlook-Regeln nur am Präfix „[Neue Anfrage]“?
