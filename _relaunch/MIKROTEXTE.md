# MIKROTEXTE – Freigabeliste

Zweck: Freigabeliste für die Text-Invarianten (`werkzeuge/texte2.mjs --vergleich … --freigabe _relaunch/MIKROTEXTE.md`) und die Tests. Eine Zeile sagt: dieser Wortlaut darf sich von `alt` nach `neu` ändern. Die Zeile wirkt erst, wenn der Code entsprechend geändert ist; bis dahin ist sie nur ein angekündigter Eingriff.

Regel (K-012): nur die Klassen 1–4. Klasse 1 Beschriftungen von Bedienelementen, Hilfe-, Fehler- und Zustandstexte; Klasse 2 Alt-Texte und `aria-label`; Klasse 3 Etiketten und Badges (Wortlaut bleibt, nur Form und Ort ändern sich; eine Zeile mit geändertem Wortlaut ist unwirksam); Klasse 4 Wahrheitskorrekturen in Metadaten und Badges (protokolliert, Liste intern). Überschriften, Absätze, Listen, FAQ, Kundenstimmen und Rechtstexte stehen hier nie; ihre Vorschläge stehen in `TEXTVORSCHLAEGE.md`.

Format, wie `texte2.mjs` es liest: Tabellenzeilen mit Spalten `Seite oder * | alt | neu | Klasse (K-012) | Paket | Grund`. Zellen in Backticks. `–` oder leer = kein Text. Seite `*`, `/pfad` oder `/pfad/*`. Klasse als Ziffer 1–4. `alt` ist der Wortlaut, wie er im Code steht; `{…}` markiert einen JSX-Ausdruck, den das Werkzeug im HTML nicht als Text findet. Teilersetzung innerhalb eines Blocks ist erlaubt. Im Grund-Feld kein `|`.

Hinweis: Erfolgs- und Ladezustände erscheinen erst nach dem Absenden. `texte2.mjs` misst sie nicht; die Zeilen stehen hier, damit P3 sie zusammen mit dem Code ändert. Gemeinsam genutzte Komponenten wirken auf jeder Seite, in der sie eingebunden sind; die Seitenangabe `/` gilt nur für den Code, den P3 an dieser Stelle ändert.

Stand 10.10.2026 · P3-00j · 10 Einträge für `/`, alle Klasse 1. Orchestrator-Prüfung: Erfolgstexte behalten ihren vollen bisherigen Wortlaut (Information und Zusagen bleiben), vorangestellt wird nur „Notiert.“ (KERN K-012).

## Freigaben

| Seite oder * | alt | neu | Klasse (K-012) | Paket | Grund |
|---|---|---|---|---|---|
| `/` | `Ihre Anfrage für {projectTitle} ist direkt bei Herrn Deniz Tezgel eingegangen.` | `Notiert. Ihre Anfrage für {projectTitle} ist direkt bei Herrn Deniz Tezgel eingegangen.` | 1 | P3-00j | Erfolgszustand Hero-Formular (`src/components/forms/HeroContactForm.tsx:130`); „Vielen Dank, {name}!“ bleibt davor stehen |
| `/` | `Ihre Situationsbeschreibung und Kontaktdaten sind direkt bei Herrn Deniz Tezgel eingegangen.` | `Notiert. Ihre Situationsbeschreibung und Kontaktdaten sind direkt bei Herrn Deniz Tezgel eingegangen.` | 1 | P3-00j | Erfolgsansicht Preisrechner nach Absenden (`src/components/pricing/PricingCalculator.tsx:404`); Begrüßungszeile bleibt |
| `/` | `Ihre Anfrage für {projectTitle} ({finalArea}) in {locationText} ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.` | `Notiert. Ihre Anfrage für {projectTitle} ({finalArea}) in {locationText} ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.` | 1 | P3-00j | Erfolgszustand Anfrage-Funnel (`src/components/funnels/TezgelAnfrageFunnel.tsx:193`); voller bisheriger Wortlaut bleibt, nur „Notiert.“ davor (Orchestrator-Prüfung P3-00j) |
| `/` | `Inhaber Deniz Tezgel prüft Ihre Anfrage und meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen.` | `Notiert. Inhaber Deniz Tezgel prüft Ihre Anfrage und meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen.` | 1 | P3-00j | Erfolgszustand Kurzformular (`src/components/forms/LeadQuickForm.tsx:117`); voller bisheriger Wortlaut einschließlich „innerhalb von 24 Stunden“ bleibt, nur „Notiert.“ davor (Orchestrator-Prüfung P3-00j) |
| `/` | `Wird übertragen...` | `Wird gesendet …` | 1 | P3-00j | Ladezustand Knopf Hero-Formular (`src/components/forms/HeroContactForm.tsx:339`) |
| `/` | `Anfrage wird übertragen...` | `Wird gesendet …` | 1 | P3-00j | Ladezustand Knopf Preisrechner (`src/components/pricing/PricingCalculator.tsx:611`) |
| `/` | `Anfrage wird sicher übertragen...` | `Wird gesendet …` | 1 | P3-00j | Ladezustand Knopf Anfrage-Funnel (`src/components/funnels/TezgelAnfrageFunnel.tsx:575`); „sicher“ entfällt, weil der Text die Sicherheit nicht belegt |
| `/` | `Wird gesendet...` | `Wird gesendet …` | 1 | P3-00j | Ladezustand Kurzformular (`src/components/forms/LeadQuickForm.tsx:270`); nur die Schreibweise (Leerzeichen vor dem Auslassungszeichen) |
| `/` | `Oder via WhatsApp` | `Per WhatsApp schreiben` | 1 | P3-00j | Link neben dem Absende-Knopf im Hero-Formular (`src/components/forms/HeroContactForm.tsx:367`); im Build-HTML von `/` enthalten, also von texte2 gemessen |
| `/` | `Anfrage verbindlich absenden` | `Anfrage senden` | 1 | P3-00j | Absende-Knopf Anfrage-Funnel (`src/components/funnels/TezgelAnfrageFunnel.tsx:580`); „verbindlich“ passt nicht zu „Unverbindliche Anfrage absenden“ (Preisrechner, `/`) und „100 % unverbindlich“ (Hero-Formular, `/`) |
| `/` | `Freistehende Badewanne mit fugenlosem XXL-Fliesenbelag von Fliesenverlegung Tezgel` | `Freistehende Badewanne vor bodentiefen Fenstern, Boden aus großformatigen hellen Natursteinplatten (generierte Darstellung)` | 2 | P3-11 | Alt-Text beschreibt, was zu sehen ist (K-012): Das Bild trägt die Kennzeichnung eines Bildgenerators (unten rechts) und ist keine eigene Arbeit; Fugen sind sichtbar, „fugenlos“ trifft nicht zu. Gilt für die Kern-Ansicht `src/components/kern/start/Grossformat.tsx` |
| `/` | `Bodengleiche Walk-In Dusche und Badgestaltung Tezgel` | `–` | 2 | P3-10 | Foto im Feld „Bäder & Wellness“ war dekorativ (generiertes Bild) und wird durch die gezeichnete Plan-Vignette `bad` ersetzt (K-003 Prinzip 4); Vignette `aria-hidden`, der Leistungsname steht als H3 daneben. Gilt für `src/components/kern/start/Fachgewerke.tsx` |
| `/` | `Wohnbereich und Fliesenverlegung mit Feinsteinzeug` | `–` | 2 | P3-10 | Foto im Feld „Wohnbereiche & Neubau“ (zeigte ein Bad bei Tageslicht, Alt passte nicht) wird durch die Vignette `wohnen` ersetzt; dekorativ, Name als H3 daneben |
| `/` | `Terrassenplatten auf Stelzlagern und Außenbereiche` | `–` | 2 | P3-10 | Foto im Feld „Balkon- & Terrassensanierung“ (zeigte ein barrierefreies Bad mit Holz, Alt passte nicht) wird durch die Vignette `aussen` ersetzt; dekorativ, Name als H3 daneben |
| `/` | `Verbundabdichtung DIN 18534 und Estrichausgleich` | `–` | 2 | P3-10 | Foto im Feld „Untergrund & DIN 18534 Abdichtung“ (zeigte grüne Wandfliesen, Alt passte nicht) wird durch die Vignette `untergrund` ersetzt; dekorativ, Name als H3 daneben |
| `*` | `DIN 18534 zertifiziert.` | `Abdichtung DIN 18534.` | 4 | P3-15 | Wahrheitskorrektur in Metadaten (Beschreibung, Open Graph): DIN 18534 ist eine Norm, keine Zertifizierung; kurz gehalten, damit die Beschreibung unter 155 Zeichen bleibt und nicht gekürzt wird. Gilt für die Kern-Metadaten-Vorgabe `src/lib/kern/metadaten.ts` und die Seitenbeschreibung von `/` im Kern; Bestandsseiten bleiben bis zu ihrer Freischaltung unverändert |
| `*` | `fugenlose Großformate` | `fugenarme Großformate` | 4 | P3-15 | Wahrheitskorrektur in Metadaten: Fliesen werden immer mit Fuge verlegt; der Bestand nennt dieselben Flächen im Text selbst „fugenarm“. Gilt wie die Zeile darüber nur für die Kern-Metadaten-Vorgabe und `/` im Kern |
| `/` | `–` | `{step} von 3` | 1 | P3-13b | Zustandstext der Schrittanzeige im Anfrage-Funnel (Kern, Mono); der Bestand zeigte die Schritte nur als Nummern-Kreise ohne Text |
| `/` | `–` | `* Pflichtfeld` | 1 | P3-13a | Hilfetext einmal je Formular (Feldgruppe `pflichthinweis`), erklärt das Sternchen an Pflichtfeldern, das der Bestand ohne Erklärung zeigt |
| `/` | `✉️ Eine schriftliche Zusammenfassung wurde an` | `Eine schriftliche Zusammenfassung wurde an` | 1 | P3-13a | Erfolgszustand Hero-Formular: das Emoji wird durch das Kern-Icon „mail“ (aria-hidden) ersetzt, Wortlaut unverändert |
| `/` | `✉️ Eine ausführliche Bestätigung mit allen Angaben wurde an` | `Eine ausführliche Bestätigung mit allen Angaben wurde an` | 1 | P3-13b | Erfolgszustand Anfrage-Funnel: Emoji durch Kern-Icon „mail“ (aria-hidden) ersetzt, Wortlaut unverändert |
| `/` | `HQ` | `5 km` | 4 | P3-12b | Wahrheitskorrektur Servicegebiet: Firmensitz ist Aßlar, nicht Wetzlar; Entfernung Wetzlar ab Aßlar aus `CITY_HUB_DATA` (E-021) |
| `/` | `5 km` | `Firmensitz` | 4 | P3-12b | Wahrheitskorrektur Servicegebiet: Aßlar ist der Firmensitz (Wortlaut „Firmensitz“ aus dem Bestand); Entfernungsangaben ab Aßlar (E-021) |
| `*` | `Aufmaß buchen` | `Aufmaß anfragen` | 1 | P3-06 | Hauptknopf im Kern-Kopf (K-012 nennt „Aufmaß anfragen“); Ziel bleibt `/kontakt`, es wird nichts gebucht |
| `*` | `Menü schließen` | `–` | 2 | P3-06 | Mobilmenü im Kern als Popover: Schließen über den Menü-Schalter am selben Ort („… schließen“), Escape und Tippen daneben; kein zweiter Schließen-Knopf |
| `*` | `Navigation schließen` | `–` | 2 | P3-06 | Überlagerungsfläche des Bestands-Drawers entfällt (Popover schließt per Tippen daneben) |
| `*` | `Fliesen-Katalog & Gewerke` | `–` | 2 | P3-06 | `title`-Attribut (Tooltip) am Bestands-Menüschalter entfällt; der zugängliche Name des Schalters bleibt |
| `/` | `Google` | `–` | 2 | P3-12 | Google-Markenzeichen (aria-label und SVG-Titel) an Bewertungsabzeichen und Kundenstimmen entfällt (Fremdmarke, K-010); die Quelle steht je Stimme als Text „Google Rezension“ |
| `/` | `Verifizierter Kunde` | `–` | 4 | P3-12 | Wahrheitskorrektur: „verifiziert“ ist für die Kundenstimmen nicht belegt (Quelle ist Google, keine Prüfung durch den Betrieb); Liste intern |
| `*` | `Badsanierung DIN 18534` | `Badsanierung Schlüsselfertige Bäder, Walk-In-Duschen & Fliesen DIN 18534` | 1 | P3-06 | Navigationseintrag im Kern-Mobilblatt: Name, Beschreibung aus `navigationLinks` und Etikett in einem Eintrag; Wortlaut aus der Konfiguration |
| `*` | `Fachgewerke Konfigurator` | `Unsere Fachgewerke` | 1 | P3-06 | Navigationseintrag im Kern-Mobilblatt: Kategorietitel aus `navigationLinks` („Unsere Fachgewerke“); „Konfigurator“ steht als Etikett im Planblatt |
| `*` | `Impressum · Datenschutz` | `Impressum Datenschutz` | 1 | P3-08 | Linkzeile im Einwilligungsbanner: Trenner „·“ als Gestaltung statt Text; beide Links unverändert |
| `/` | `Handwerkskammer-eingetragener Fachbetrieb Deniz Tezgel ·` | `Handwerkskammer-eingetragener Fachbetrieb Deniz Tezgel` | 1 | P3-09 | Kennzeile im Einstieg (Zeichensetzung): Trenner „·“ zwischen Etikett und Bewertung entfällt (Fuge statt Zeichen), Wortlaut gleich |
| `*` | `Aufmaß buchen` | `–` | 1 | P3-06 | Zweiter „Aufmaß buchen“-Knopf (Bestands-Drawer) entfällt; der Kopf trägt „Aufmaß anfragen“, mobil die untere Leiste „Aufmaß“ |
| `*` | `Fliesenverlegung Tezgel – Fachbetrieb Aßlar · Wetzlar – Startseite` | `–` | 2 | P3-06 | Dublette: Logo-Link im Bestands-Drawer; der Logo-Link im Kopf trägt den Namen unverändert |
| `*` | `Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar` | `–` | 2 | P3-06 | Dublette: Logo-Bild im Bestands-Drawer; das Logo im Kopf trägt den Alt-Text unverändert |
| `/` | `Vertrauenssignale und Fachbetriebs-Garantien` | `–` | 2 | P3-12 | aria-label der Vertrauensleiste wird zu aria-labelledby auf einen nur für Screenreader sichtbaren Titel mit demselben Wortlaut |
| `*` | `Cookie-Einstellungen verwalten` | `–` | 2 | P3-08 | Schwebendes Schild entfällt im Kern (E-020); Widerruf über den Fußlink „Cookie-Einstellungen“ |
| `*` | `Cookie-Einstellungen öffnen` | `–` | 2 | P3-08 | `title` des schwebenden Schilds entfällt mit dem Schild (E-020) |
| `*` | `Frei verschiebbar & werfbar` | `–` | 2 | P3-08 | `title` der Wurfphysik am Banner entfällt; der Kern-Banner ist fest und ohne Physik (E-013) |
| `/` | `1. Ihr Vorhaben wählen` | `Ihr Vorhaben wählen` | 1 | P3-16 | Legende der Projektauswahl im Hero-Formular: Die Auswahl steht im Kern nach den Kontaktfeldern (Probelauf Aufgabe 3, Desktop), die Ziffer „1.“ würde die Reihenfolge falsch angeben |
| `/` | `verifizierte Google-Rezensionen` | `Google-Rezensionen` | 4 | P3-16 | Wahrheitskorrektur wie „Verifizierter Kunde“ (P3-12): „verifiziert“ ist nicht belegt, die Quelle ist Google ohne Prüfung durch den Betrieb (P3-16-GEG H-1); Liste intern |
| `*` | `Treppen` | `–` | 1 | P4-08 (E-028) | Kopf-Navigation im Kern: der Eintrag „Treppen“ steht als Link zusammen mit seiner Beschreibung (eine Texteinheit statt zwei); der Link `/treppen` bleibt (auf `/blog` 3× statt 2×) |
| `/blog` | `Ratgeber durchsuchen` | `–` | 2 | P4-08d | `aria-label` des mobilen Suchfelds entfällt: derselbe Wortlaut steht als sichtbare `<label>` (K-011), der zugängliche Name bleibt gleich |
| `/blog` | `Artikel suchen` | `–` | 2 | P4-08d | `aria-label` des Desktop-Suchfelds entfällt wie oben; sichtbare Beschriftung mit gleichem Wortlaut |
| `/kontakt` | `Stadt oder Kreis filtern...` | `–` | 1 | P4-08f | Suchfeld der Kartenstadtwahl entfällt (E-021 wie auf `/`): alle 13 Städte stehen im Register, jede als Link zur Standortseite, auch ohne JavaScript |
| `/kontakt` | `Alle` | `–` | 1 | P4-08f | Entfernungsfilter der Karte entfällt (E-021); die Entfernung steht je Stadt im Register |
| `/kontakt` | `≤ 15 km` | `–` | 1 | P4-08f | wie oben |
| `/kontakt` | `≤ 30 km` | `–` | 1 | P4-08f | wie oben |
| `/kontakt` | `≤ 45 km` | `–` | 1 | P4-08f | wie oben |

Aufgehoben: Die Zeile `*` „WhatsApp-Chat starten“ → „–“ (P3-06) ist gestrichen. Der Kern-Kopf führt den Link ab lg wieder mit dem Bestandsnamen (P4-13, E-029 Berichtigung, E-034).
