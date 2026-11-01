# P6 Formulare: Entwurf Kurzanfrage und Korrektur K01/K02

Stand 02.11.2026, Code-Stand `seo/lokal` (Basis `main` 00876c76). **Vorschlag, nichts davon ist im Code der Website.** Grundlage: `docs/seo/KONTEXT.md` Abschnitt 9, [Analyse 04](../analysen/04-formulare-kontakt.md) (dort Zeilen auf dem älteren Stand f19ebba), Werkstatt-Entscheidungen E-109 und E-110 zum Mailweg. Pflichtfelder, Einwilligung, Empfänger, Geschäftslogik und `/api/anfrage` ändern sich nur mit Umuts Freigabe; Einwilligung, Datenschutzhinweis und Pflichtfelder zusätzlich nur nach Rechtsprüfung (M-11). Für K01 und K02 genügt Umuts Zustimmung zu S10.

## Kurzfassung

- **Mailweg:** Seit E-109 und E-110 kommen Anfragen an (Testanfrage am 31.10. bestätigt). Scheitert der Versand, sieht die Person einen Hinweis auf Telefon und WhatsApp statt eines Scheinerfolgs.
- **Zwei stille Verluste bleiben:**
  - **K01:** Die Zeitsperre gegen Bots kann echte Anfragen verwerfen. Die Person sieht trotzdem „Erfolg“ mit einer Nummer, aber keine Mail geht raus.
  - **K02:** Der Terminkalender verliert den Wunschtermin.
- **Ein fertiger, getesteter Patch** behebt beides. Er wird nach Umuts Ja zu S10 eingespielt (Abschnitt 1).
- **Kurzanfrage:** Neun Formulare werden zu einer Kurzanfrage. Dafür braucht es die Entscheidungen in Abschnitt 3 (S6) und eine Rechtsprüfung der Einwilligung.

## 1. Patch K01 und K02 (bereit, wartet auf S10)

**Fehler K01 (Fakt, im Code geprüft):**
- **Wie die Sperre heute prüft:** `checkFastBot` in `src/lib/email/security.ts` vergleicht den Zeitstempel `_t` des Geräts mit der Uhr des Servers. Liegt die Differenz unter 1,5 Sekunden oder über 24 Stunden, antwortet `/api/anfrage` mit Erfolg („TEZ-BOT-IGN“) und verschickt nichts (`src/app/api/anfrage/route.ts`, Schritt 3).
- **Betroffen:** echte Anfragen, wenn
  - die Uhr des Geräts vorgeht. Beim Terminkalender reichen schon etwa 1,5 Sekunden, weil er `_t` als „jetzt minus 3 Sekunden“ setzt (`src/lib/formulare/useTerminKalender.ts`);
  - der Tab länger als einen Tag offen war.

**Fehler K02 (Fakt):** Der Kalender sendet `preferredDate` und `serviceType`. Die Prüfung (`src/lib/email/validation.ts`, `TerminDetailsSchema`) kennt beide Felder nicht und verwirft sie. Die Team-Mail nennt deshalb weder Tag noch Zeitfenster. Die Ansicht meldet trotzdem „Terminanfrage bestätigt!“.

**Was der Patch ändert:**

| Datei | Änderung |
|---|---|
| `src/lib/formulare/ausfuelldauer.ts` (neu) | Misst die Ausfülldauer mit `performance.now()`. Diese Uhr läuft ab dem Laden der Seite und hängt nicht an der Uhrzeit des Geräts. |
| `useHeroKontakt.ts`, `useSchnellanfrage.ts`, `useAnfrageFunnel.ts`, `usePreisrechner.ts` | senden zusätzlich `_d` (Ausfülldauer in ms); `_t` bleibt |
| `useTerminKalender.ts` | sendet `_d` statt des festen `_t`. Wunschtag, Zeitfenster und Thema gehen in die Felder, die die Prüfung kennt: `date`, `formattedDate`, `timeSlot`, `timeSlotLabel`, `topicLabel`. Zeitfenster als „08:30 bis 10:00 Uhr (Morgens)“. Die Nutzlast baut die reine Funktion `terminNutzlast`, die der Test direkt prüft. |
| `src/lib/email/security.ts` | `pruefeZeitsperre` liest `_d` und `_t` aus dem Körper der Anfrage. Zuerst zählt `_d`, zu schnell ist unter 1,5 Sekunden. Ohne `_d` gilt nur noch eine Dauer von 0 bis unter 1,5 Sekunden als zu schnell. |
| `src/app/api/anfrage/route.ts` | ruft `pruefeZeitsperre` auf; `_d` steht bewusst nicht im Schema (`validation.ts`), damit ein ungewohnter Wert nie zu einem Fehler führt |
| `src/components/contact/BookingCalendar.tsx` | nur der Kommentar zur Nutzlast |
| `test/email-pipeline.test.mjs` | Test 22: Zeitsperre mit Uhrabweichung, altem Tab, Ausfülldauer und Grenzfällen. Test 23: echte Nutzlast des Kalenders durch Prüfung und Team-Mail. |

- **Was gleich bleibt:**
  - Pflichtfelder, Einwilligung, Empfänger, Wortlaut der Seiten und Erfolgsweg.
  - Honeypot und Ratenbegrenzung.
  - **Ohne Zeitsperre, auch nach dem Patch:** Badanfrage, Projektcheck, Konfigurator und Terminformular senden weder `_t` noch `_d`. Sie hatten nie eine Zeitsperre und sind von K01 nicht betroffen. Die Messung läuft also in 5 der 9 Formulare.
- **Neu sichtbar:** Die Bestätigung an die Kundin oder den Kunden (wenn eine E-Mail angegeben ist) und die Team-Mail nennen beim Terminkalender jetzt Thema, Wunschtag und Zeitfenster.
- **Rest für alte Seiten:** Wer eine Seite noch mit dem Stand von vor dem Einspielen offen hat, sendet nur `_t`. Ein kleiner Rest des alten Fehlers bleibt dann: Geht die Geräteuhr knapp weniger vor, als das Ausfüllen dauerte, kann die Rechnung zwischen 0 und 1,5 Sekunden landen. Das betrifft nur Tabs von vor dem Einspielen.
- **Übergabe an die Werkstatt** (über Umut, die SEO-Runde ändert `_werkstatt/` nicht):
  - Der Funktionstest `_werkstatt/werkzeuge/tests/funktion-termin.spec.mjs` (Zeilen 90 bis 99) erwartet noch die alte Nutzlast (`preferredDate`, `serviceType`, `_t`) und wird mit dem Patch rot.
  - Neue Soll-Form: `terminDetails` mit `date`, `formattedDate`, `timeSlot`, `timeSlotLabel`, `topicLabel` sowie `typeof _d === 'number'`.
  - Der Test gehört nicht zur Prüfkette der SEO-Runde (`npm test`).
- **Geprüft** in einer Arbeitskopie außerhalb des Repos:
  - `npx tsc --noEmit` ohne Fehler, eslint ohne Befund.
  - Mail-Tests 25 von 25, `npm test` mit Build.
  - Unabhängige Gegenprüfung: einspielbar; ihre Hinweise sind eingearbeitet (Grenzfälle, keine Klammer auf 0, kein neuer Fehlerweg über das Schema, Nutzlast als reine Funktion, Übergabe des Funktionstests).
  - Vor dem Einspielen läuft die volle Prüfkette noch einmal auf `seo/lokal`.
- **Ablage:** `docs/seo/arbeit/k01-k02.patch`, anwendbar mit `git apply` auf `seo/lokal`.

## 2. Bestand (Kurzform)

| # | Formular | Seiten | Umfang heute |
|---|---|---|---|
| F1 | Startseite (`HeroContactForm`) | `/` | 1 Schritt, Name und Telefon Pflicht, ohne Datenschutzhinweis |
| F2 | Schnellanfrage (`LeadQuickForm`) | 13 Ortsseiten, 52 Leistung-×-Ort-Seiten | 1 Schritt, Einwilligung als Pflicht-Checkbox |
| F3 | Express (`TezgelAnfrageFunnel`) | `/kontakt`, `/leistungen`, `/leistungen/<id>`, `/foerderung` | 3 Schritte |
| F4 | Badanfrage (`BadanfrageFunnel`) | 7 Bad-Seiten, 12 Musterbäder | 5 Schritte |
| F5 | Projektcheck (`BadProjektCheck`) | `/bad`, `/bad/projekt-check` | Regler und Extras, fragt keinen Ort |
| F6 | Konfigurator (`FliesenKonfigurator`) | 13 Fliesen-Seiten | 4 Schritte, bis etwa 30 Eingaben |
| F7 | Preisrechner (`PricingCalculator`) | `/preise`, `/faq`, `/leistungen/<id>` | lange Seite in drei Phasen |
| F8 | Terminformular | `/termin` | ohne Ortsangabe sendet es „Aßlar / Wetzlar“ (`useTerminAnfrage.ts:109`) |
| F9 | Terminkalender (`BookingCalendar`) | `/termin` | 2 Schritte; K01, K02 |

**Weitere Befunde** (Fakt, im Code geprüft):
- **Drei verschiedene Zusagen zur Rückmeldung:**
  - „innerhalb von 24 Stunden“: `HeroContactForm.tsx:82`, `LeadQuickForm.tsx:66` und `:136`, `FinalCTA.tsx:138`;
  - „24 bis 48 Stunden“: `TezgelAnfrageFunnel/Erfolg.jsx:40`, `BadProjektCheck/Zusammenfassung.jsx:179`, `FliesenKonfigurator/Erfolg.jsx:51`;
  - „zeitnah“: `PricingCalculator.tsx:329`, `customerEmail.ts:210`.
  - Welche gilt, entscheidet Deniz (M-07, Fragenliste Nr. 15).
- **„Terminanfrage bestätigt!“** (`BookingCalendar.tsx:66`): Es ist eine Anfrage, kein bestätigter Termin. Vorschlag: „Ihre Terminanfrage ist da.“
- **Text mit Gedankenstrichen:**
  - `FinalCTA.tsx:138` („Tragen Sie Ihre Kontaktdaten ein – …“);
  - die Zeitfenster im Kalender („08:30 – 10:00 Uhr“).
  - Beides kommt mit den Seitentexten nach der Freigabe des Plans in Ordnung (Plan, Abschnitt 6a).
- **Konfigurator:** Mit allen 7 Bereichen wird der Titel länger als die erlaubten 120 Zeichen, der Server antwortet dann mit 400 (Analyse 04, Risiko 5). Das ist sichtbar, aber ärgerlich; entfällt mit der Kurzanfrage.

## 3. Entscheidungen für die Kurzanfrage (S6), mit Empfehlung

1. **Welche Werkzeuge bleiben?**
   - **Empfehlung:** eine Kurzanfrage überall.
   - Preisrechner und Konfigurator höchstens als Rechner ohne eigenes Formular.
   - Projektcheck, Badanfrage, Terminformular und Kalender entfallen.
   - Ihre Adressen per 308:
     - `/bad/badanfrage`, `/bad/projekt-check` und `/bad/badplaner` auf `/bad`;
     - `/termin` und `/beratung` auf `/kontakt`.
   - Das ändert Adressen und braucht deshalb Umuts ausdrückliche Freigabe.
2. **Einwilligung:**
   - **Empfehlung:** ein Hinweis mit Link auf den Datenschutz statt einer Pflicht-Checkbox, wenn die Rechtsprüfung Art. 6 Abs. 1 b oder f als Grundlage bestätigt.
   - Bis dahin bleibt es, wie es ist.
3. **Ort als Pflichtfeld?**
   - **Empfehlung:** ja, als ein Tipp: Aßlar, Wetzlar, Solms, Braunfels, Gießen, Herborn, „anderer Ort“ mit PLZ-Feld.
   - Auf Ortsseiten vorbelegt. Bisher gilt „keine Vorauswahl“, das ändert sich damit.
4. **Eine Zusage überall** (M-07): zum Beispiel „Wir rufen Sie innerhalb von 24 Stunden an Werktagen zurück“. Das geht nur, wenn Deniz das halten kann.
5. **Einzugsgebiet:** Gilt der Umkreis von 50 km (`src/lib/einzugszonen.ts`)? Anfragen von außerhalb trotzdem annehmen; die Mail nennt dann die Zone.
6. **Fotos:** über WhatsApp statt Upload. Ein Upload bräuchte Speicher und eine Ergänzung im Datenschutz.

## 4. Zielbild der Kurzanfrage (nach Freigabe)

- **Über dem Formular:** zwei gleich große Knöpfe, „Anrufen“ (06441 / 44 83 567) und „Nachricht per WhatsApp“ (0172 / 67 28 504). Der WhatsApp-Text nennt Vorhaben, Ort und Seite.
- **Felder**, Pflicht mit Stern:
  - Vorhaben* (ein Tipp): Bad, Dusche statt Wanne, Boden oder Wand innen, Balkon oder Terrasse, Treppe, Reparatur, Sonstiges;
  - Ort*, wie oben;
  - Name*, Telefon*;
  - dazu Zeitraum, Nachricht und E-Mail, freiwillig.
- **Knopf:** „Anfrage senden“ (feste Beschriftung, KONTEXT Abschnitt 10).
- **Erfolg:** Vorgangsnummer, die eine Zusage aus Abschnitt 3, Knopf „Anrufen“.
- **Technik:**
  - Basis `LeadQuickForm` mit `useSchnellanfrage`, dazu die Vorhaben-Kacheln aus `HeroContactForm`.
  - Neues Feld `quelle` (Seitenpfad); der Server rechnet die Zone aus.
  - Betreff zum Beispiel „[Neue Anfrage] Bad · Wetzlar · Name [Nr.]“. Das Präfix bleibt wegen der Outlook-Regeln.
  - Zeitsperre mit `_d` wie im Patch, Honeypot bleibt.
- **Messung:**
  - Ereignis `generate_lead` (Seitenpfad, Vorhaben, Zone) nur nach Einwilligung;
  - `click_to_call` und `whatsapp_click` auf allen Geräten;
  - die Quelle steht in jeder Mail, auch ohne Einwilligung.
- **Dateien:** `src/components/forms/*`, `src/lib/formulare/*`, `src/lib/email/validation.ts`, `types.ts`, `templates/teamEmail.ts`, `templates/customerEmail.ts`, `src/app/api/anfrage/route.ts`; auf den Seiten nur je eine Zeile; dazu Weiterleitungen in `next.config.ts`, `src/app/sitemap.ts`, `src/config/navigation.js`.
- **Tests:** `test/email-pipeline.test.mjs`, `test/wege.test.mjs`, `test/navigation.test.mjs`; die Funktionstests unter `_werkstatt/werkzeuge/tests/` gehören der Werkstatt und werden nur mit Umuts Zustimmung angepasst.
- **Versandweg:** aus E-109 und E-110, bleibt unverändert.

## 5. Offene Fragen

1. S10: Darf der Patch K01/K02 eingespielt werden? Er ginge mit der nächsten Freigabe „live“ auf `main`.
2. S6: die Punkte 1 bis 6 in Abschnitt 3.
3. Wer prüft Einwilligung und Datenschutzhinweis rechtlich (M-11)?
4. Deniz: Welche Zusage zur Rückmeldung gilt (Fragenliste Nr. 15)?
