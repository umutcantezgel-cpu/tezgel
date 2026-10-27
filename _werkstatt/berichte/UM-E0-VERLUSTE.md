# UM-E0-VERLUSTE · Kundschaft Verluste (Haiku, Stufe 1)

Vergleich: HEAD 7ceb5e41 (src und public seit 7ceb5e41 unverändert) gegen E0 des Vorlaufs c53faf4. Der Quelltext von c53faf4 ist gleich 388fa7b (geprüft: `git diff 388fa7b c53faf4 -- src public` leer). Die Historie war flach (52 Vorfahren von c53faf4); mit `git fetch --deepen=300` nachgeholt (800 Vorfahren).

## GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/berichte/UM-E0-VERLUSTE.md` (neu).
- Arbeitsdateien (Skripte, Listen, HTML-Abzüge) nur im Scratchpad `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.

## WAS UND WARUM

### 1. Adressen
- Die Liste `_werkstatt/adressen-e0.csv` hat 202 Adressen (168 mit 200, 2 mit 308, 32 mit 410). Alle 202 wurden per curl gegen 127.0.0.1:4311 geprüft (eine Anfrage je Sekunde).
- Ergebnis: 168 mit 200 erreichbar. Die 308 führen korrekt: `/bad/budgetkalkulator` nach `/bad/projekt-check`, `/blog/barrierefreies-bad-planung-zuschuesse` nach `/bad/barrierefreies-bad`. Die 32 mit 410 sind wie geplant (`src/lib/wege.ts`).
- Fehler: 0. 404: 0. Abweichungen gegen den E0-Status: 0. Erreichbar oder weitergeleitet: 170 von 170.
- Statisch: 76 Seitendateien unter `src/app/(bestand)`. Der Abgleich der Adressen erfolgte über die Laufzeitprüfung, nicht über eine eigene Routenliste.

### 2. Gelöschte Dateien
- Netto E0 bis 7ceb5e41 in `src` und `public`: 9 gelöscht, 5 umbenannt, 253 neu, 193 geändert. In `public` netto keine gelöschte Datei.
- Gelöscht und ersetzt: `src/components/start/{Ablauf,Einstieg,Fachbereiche,Fachgewerke,Grossformat,Servicegebiet,Stimmen}.tsx` und `start/vignetten/index.ts` (ersetzt durch `src/components/vorlagen/teile`, E-044). `src/components/leistungen/uebersicht/PlanUebergang.jsx` (Plan-Morph läuft über B-01, E-037, ENTSCHEIDUNGEN.md:265).
- Umbenannt: `start/vignetten/{Aussen,Bad,Untergrund,Wohnen,zeichnen}.tsx` nach `src/components/kern/vignetten/`.
- Im Vorlauf ergänzt und wieder entfernt (nicht E0-Verlust): 63 Bilder in `public/images/arbeiten` (E4-W0 und E4-W1).
- Vor E0 (die letzten 300 Commits vor c53faf4, 18 mit Löschungen, 488 Pfade, davon 487 heute fehlend). Einordnung nach Commit:
  - 81d30168, 254 Dateien: „ruhenden Kern-Entwurfsbaum abgebaut“, bewusst.
  - b7666dd4, 84 Bilder: „keep only neutral bath imagery“, bewusst.
  - 10199cc7, 53 Dateien: „erase previous company's assets“, bewusst (Vorgängerfirma).
  - 6cd34365, 29 Dateien: Umstieg auf den Next.js-16-App-Router, alte Vite-Dateien, ersetzt.
  - a09d483b, 25 Dateien: „verwaiste Dateien“, bewusst.
  - bcd8fcb9, 16 Dateien: „verworfene Varianten A entfernt“, bewusst.
  - eca9d5b7, 9 Dateien: „ungenutzter Code der Vorgängerfirma“, bewusst.
  - 88b2b672, 6 Dateien: Next-Vorlagen und Altkonfiguration, bewusst.
  - d7caa440, 3 Dateien, und 2461587b, f69b6ca5, 2bc5f0f7: Logik in gemeinsame Hooks und Fusionen, ersetzt.
  - dc56410b: `src/config/testimonials.js`, „remove fake testimonials“, bewusst.
  - d1e16547: `src/app/icon.svg`, durch das Logo-Icon ersetzt.
  - 2026cd2e: Alias-Schicht, bewusst.
  - 757d8a9a: `src/components/common/HelpSidebar.jsx`, ohne Ersatz, Commit nennt keinen Grund (OFFENE FRAGE).
  - 4b44dca1: `WhatsAppButton.jsx` nach `.tsx` umbenannt, kein Verlust.
  - d4da4292: Datei gelöscht und wieder angelegt, heute vorhanden, kein Verlust.

### 3. Hauptansichten: Funktionen, Abschnitte, Strukturdaten
Die 12 Ansichten lassen sich gegen E0 nur über Quelltext und die Adressliste vergleichen; ein E0-Abzug der gerenderten Seite liegt nicht vor (kein Server-Start, kein Build). Die Dateizuordnung je Ansicht (Abhängigkeitsabschluss aus `page`, `layout` und Imports) ergibt auf den Hauptansichten folgende Lücken gegen E0. Bewusst Entferntes steht unter 5.

Element-Pässe (Verlust ohne Ersatz und ohne Entscheidung):

**EP-1 · Aufbauten-Vergleich auf `/balkon-terrasse`**
- Aufgabe: Abschnitt „Aufbauten im Vergleich: Stelzlager, Splittbett, gebunden“ mit Tabelle und Plattenstärke-Hinweis zurückbringen.
- Wesenskern: Die drei Bauweisen nebeneinander, mit der Frage, welche zur Fläche passt.
- Freiraum: Form frei (Feldraster, Merkliste oder Tabelle im Vorlagen-Stil); Fachwörter erklären.
- Bindungen: E0-Quelle `src/app/(bestand)/balkon-terrasse/page.jsx:199-235` (Tabelle mit CONSTRUCTIONS und CRITERIA_ROWS). Unterseiten `balkon-terrasse/stelzlager/page.jsx:94` und `terrassenplatten/page.jsx:104` tragen noch den Brotkrumen „Aufbauten im Vergleich: Balkon & Terrasse“, der jetzt auf eine Seite ohne Vergleich zeigt. Im HTML von 4311 fehlen „Splittbett“, „gebunden“, „Plattenstärke“.
- Priorität: Muss (Seite mit Suchwert, Unterseiten verweisen darauf).
- Entscheidungsvorschlag: als Abschnitt der Vorlage zurückbringen; Wortlaut aus der E0-Quelle.

**EP-2 · Werte-Block auf `/ueber-uns`**
- Aufgabe: die sechs Werte aus E0 wieder ausgeben: HWK-Mitgliedschaft, DIN 18534, Staubschutz-Garantie, Termintreue und Festpreis, Großformat-Präzision, Kundenbegeisterung.
- Wesenskern: belegte Vertrauensfakten kurz und sichtbar; das Motto bleibt erhalten (HTML 4311: 3 Treffer).
- Freiraum: Darstellung frei; die Garantie-Wortlaute nur nach Klärung (KERN: Versprechen mit rechtlicher Bindung).
- Bindungen: `src/config/company.js` (E0-Werte, Zeilen 188 bis 196), `src/components/ueber-uns/Werte.tsx` (E0; im HEAD ohne Einbindung). HEAD-HTML `/ueber-uns` enthält „Termintreue“, „Großformat-Präzision“, „Staubschutz-Garantie“ nicht.
- Priorität: Muss (belegte Vertrauenselemente).
- Entscheidungsvorschlag: Vertrauensliste mit HWK und DIN auf `/ueber-uns` setzen; Garantie-Wortlaut mit dem Auftraggeber klären.

**EP-3 · 8-Punkte-Qualitätsversprechen auf sechs Hauptansichten**
- Aufgabe: den Block „Unser 8-Punkte-Qualitätsversprechen für Ihr Fliesenprojekt“ auf `/bad/badsanierung`, `/fliesen`, `/balkon-terrasse`, `/ueber-uns`, `/standorte/[stadt]` und `/blog` wieder einbinden.
- Wesenskern: acht Zusagen an der Fuge als Vertrauenszeile.
- Freiraum: Wortlaut aus `COMPANY_DATA.qualityPromises`; Zusagen mit rechtlicher Bindung nur sinngleich (KERN).
- Bindungen: E0 `src/components/sections/QualityPromise.jsx`. Heute nutzt nur `referenzen/[id]` (vier Punkte) die Liste. Offener Text in MENSCHEN.md M-23.
- Priorität: Muss (belegtes Vertrauenselement).
- Entscheidungsvorschlag: Baustein in die Vorlage zurück; je Seite entscheiden, welche Punkte.

**EP-4 · Service-Strukturdaten auf 47 Seiten**
- Aufgabe: den JSON-LD-Typ Service je Leistungsseite wieder ausgeben.
- Wesenskern: jede Leistung als Dienstleistung beschreiben.
- Freiraum: Knoten-Form frei; `buildServiceNode` steht in `src/lib/schema.ts:412`.
- Bindungen: E0 setzte den Knoten in den Ordner-Layouts (`src/app/(bestand)/bad/layout.tsx:20`, `balkon-terrasse/layout.tsx:20`, `fliesen/layout.tsx:20`, `beratung/layout.tsx:50`). E0 hatte den Typ auf 113 Seiten, HEAD auf 66. Ohne Service u. a. `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/bad/musterbaeder/*` (16 Seiten), `/balkon-terrasse/stelzlager`, `/fliesen/abnahme`. ENTSCHEIDUNGEN.md zu E3-SEO-JSONLD sagt „jede Seite trägt ihre eigene“; das gilt hier nicht.
- Priorität: Soll (Metadaten mit Suchwert, kein Recht, kein Geschäftsablauf).
- Entscheidungsvorschlag: Service-Knoten je Seite über die Vorlage setzen.

**EP-5 · Stellenangebot auf `/karriere/ausbildung`**
- Aufgabe: FAQPage, Question und Answer sowie JobPosting und Place wieder ausgeben.
- Wesenskern: die Ausbildungsstelle als Stellenangebot mit Ort und offenen Fragen für Suchmaschinen.
- Freiraum: Wortlaut nur aus den Firmendaten; Angaben vor der Ausgabe prüfen.
- Bindungen: E0-Zeile `/karriere/ausbildung` in `_werkstatt/adressen-e0.csv`; Seite `src/app/(bestand)/karriere/ausbildung/page.jsx`.
- Priorität: Soll (Auffindbarkeit der Stelle).
- Entscheidungsvorschlag: JobPosting und FAQ-Knoten zurück; Angaben gegen Firmendaten prüfen.

**EP-6 · Weitere Strukturdatentypen**
- Aufgabe: Typ Blog auf 13 Ratgeber-Artikeln (u. a. `/blog/fliesen-mythen-faktencheck`, `/blog/undichte-dusche-warnzeichen`) und Typ CollectionPage auf 6 Referenz-Detailseiten (u. a. `/referenzen/badsanierung-grossformat`) wieder ausgeben.
- Wesenskern: Artikel und Referenzsammlungen als solche auszeichnen.
- Freiraum: Typwahl offen (Blog ist ein allgemeiner Typ; ob BlogPosting passt, ist nicht geprüft).
- Bindungen: E0-CSV-Zeilen. HEAD ersetzt durch WebPage, BreadcrumbList und ListItem (je 9 Seiten neu).
- Priorität: Kann (ohne Sichtbarkeit).
- Entscheidungsvorschlag: zusammen mit EP-4 prüfen.

### 4. Gegenüber E0 bewusst verändert oder ersetzt (nur gelistet)
- `/kontakt`: Terminkalender entfernt, nur noch auf `/termin` (E-062; PLAN.md:227; MENSCHEN.md M-21).
- `/kontakt`: Karteneinbettung, Einwilligungs-Gate und interaktive Karte entfernt, ersetzt durch eine gezeichnete Einsatzkarte ohne Einbettung (E4-W0-KONTAKT, ENTSCHEIDUNGEN.md:486).
- `/leistungen`: Preisrechner entfernt, ersetzt durch Express-Anfrage und Verweis auf `/preise` (E4-W0-LEISTUNGEN, ENTSCHEIDUNGEN.md:488).
- `/`: Preisrechner, Express-Anfrage, Werkzeugformular, FAQ, Stimmen als Karussell, Trust-Leiste, Abschluss-Block entfernt (Hauptweg HeroContactForm, E-012, ENTSCHEIDUNGEN.md:55; Seitenformel E-012/E3-RUHE-01). Die FAQ auf `/` steht nur im Plan (LAGEBILD F-14), nicht als eigene Entscheidung.
- `/blog`: Seitenleiste mit Firmendaten entfernt (E-049, ENTSCHEIDUNGEN.md:385).
- `/standorte/[stadt]`: Einsatzgebiets-Karte (LocalDominanceMap) durch die Einsatzkarte ersetzt (E4-W0-KARTE, PLAN.md:229).
- `/ueber-uns`: „Bis zu 12 Fachkräfte“ entfernt (Faktenregel M-05, Annahme, MENSCHEN.md Zeile 19).
- `/fliesen`: Verband-Umschalter ersetzt durch den Moment `VerbandProbe` (E3-GRAF-06); der Umschalter bleibt auf `/fliesen/verlegemuster`.
- Bewegungen: Die 16 Registerschlüssel aus E0 stehen alle in `src/lib/motion/register.ts` (HEAD), dazu neue. Die SVG-Bewegungen aus E0 sind nach E-037 zurück.
- Titel (68 von 168) und Beschreibungen (162 von 168) sind neu gefasst (E3-SEO-TITEL, E3-SEO-META); H1 je Seite genau eine (168 von 168); canonical auf allen 168 vorhanden; keine noindex-Abweichung.

## GEMEINSAME DATEIEN
Keine geschrieben. Außer der Berichtsdatei und dem Scratchpad nichts verändert. Im `.git` wurden Objekte nachgeholt (`git fetch --deepen=300`); der Arbeitsbaum blieb unverändert.

## PRÜFUNG UND ERGEBNIS
- Adressen: 202 von 202 geprüft, 170 erreichbar oder weitergeleitet, 32 mit 410 (bewusst), 0 Fehler.
- Gelöschte Dateien: 9 (E0 bis HEAD) eingeordnet; vor E0 488 Pfade in 18 Commits, alle eingeordnet.
- Element-Pässe: 6 (EP-1 bis EP-6), je mit allen sechs Feldern.
- Strukturdaten gegen E0: Service auf 47 Seiten verloren (EP-4); Blog auf 13, CollectionPage auf 6, Stellenangebot auf 1 Seite (EP-5, EP-6).
- git status: nur die Berichtsdatei neu; die übrigen untracked Dateien stammen von anderen Läufen.

## BILDBELEGE
Keine Bilder gesichtet, keine Browserläufe, keine Lighthouse-, axe- oder Bildsatzläufe (Messreihe läuft).

## OFFENE FRAGEN
1. Funktionsliste (LAGEBILD §3): F-02 (Preisrechner auf `/leistungen`), F-07 (`/kontakt#termin-buchen`) und F-12 (Karten auf `/kontakt`) weichen vom Plan ab. Ist die Liste nachzuführen?
2. EP-1 bis EP-3 (Balkon-Vergleich, Werte, Qualitätsversprechen): in ENTSCHEIDUNGEN.md ist keine bewusste Entfernung gefunden; nur der Textpunkt M-23. Beabsichtigt oder übersehen?
3. EP-4: Ist der Verlust des Service-Knotens gewollt? Keine Entscheidung dazu gefunden.
4. Garantie-Wortlaute („Staubschutz-Garantie“, „Garantierter Standard“): Klärung über M-07 nötig.
5. `HelpSidebar.jsx` (757d8a9a): ohne Ersatz, ohne Begründung im Commit. Einordnung?
6. Karteneinwilligung: F-12 gilt als Bestandsschutz; auf `/kontakt` gibt es jetzt keine Karteneinbettung mehr. Bestätigung nötig.
7. Umschalter-Funktion auf `/fliesen`: ist der Wechsel der Verbandsart auf `/fliesen` bewusst auf `/fliesen/verlegemuster` verlagert?

=== ENDE UM-E0-KUND-VERLUSTE · BEREIT ZUR RÜCKGABE ===
