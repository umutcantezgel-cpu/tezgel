MASTER-AUFTRAG · TEZGEL.DE · VERSTÄNDLICH, ECHT, AUSGEZEICHNET
Autonomer Mehrtageslauf in Claude Code · Opus 5.5 plant, gestaltet, baut die Kernsysteme und nimmt ab · Haiku 5.5 erkundet, schreibt, sichtet Bilder, baut nach Muster und prüft
Lies den ganzen Auftrag, bevor du etwas änderst. Rückfragen gibt es nicht; was du brauchst, steht hier oder im Projekt.

## 0. EINSTELLUNGEN
Alles Veränderliche steht hier. Leere Felder nehmen den Standardwert.
- PROJEKT: tezgel.de, Website von Fliesenverlegung Tezgel, Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar
- UMGEBUNG: [lokal | Cloud] · Standard: lokal, im Repository der Website
- BILDQUELLE: [Pfad] · Standard: alle ZIP-Dateien und Bildordner in _eingang/ im Projektordner
- LOGOQUELLE: [Pfad zu SVG, PDF oder AI] · Standard: die beste Logodatei in _eingang/ oder im Projekt
- ARBEITSBRANCH: [Name] · Standard: werkstatt/tezgel-[Startdatum]; für einen Folgelauf der Branch des früheren Laufs
- PUSH: [nie | nur ARBEITSBRANCH] · Standard: nur ARBEITSBRANCH, wenn ein Remote existiert, nach jeder Welle und mindestens stündlich, stets mit ausdrücklich genanntem Branch
- VERÖFFENTLICHUNG: nie
- AUSBAU: maximal
- MUT: Standard: deutlich sichtbar neu. Wiedererkennung tragen Logo, Farbwelt und Firmendaten; alles andere darf sich spürbar verändern.
- TEXTE: Standard: alle Seiten direkt neu schreiben; Rechtstexte nur gestalterisch
- SEITENWECHSEL: Fliese 30 × 60 cm quer · Verband: Drittelverband (Alternative: Halbverband) · Richtung: von rechts herein, nach links hinaus · Dauer gesamt höchstens 1.200 ms, ab dem zweiten Wechsel einer Sitzung höchstens 900 ms · KLANG: aus (Alternative: leises Klacken je Spalte, erst nach der ersten Interaktion, mit Schalter)
- INTRO: Logo zeichnet sich beim ersten Besuch · höchstens 2.200 ms · einmal je Browser
- FREIGABE: [nein | ja, Halt nach dem Plan] · Standard: nein
- ORCHESTRATOR: Opus 5.5 in der Hauptsitzung, höchste verfügbare Denkstufe
- ARBEITSMODELL: Haiku 5.5 für alles nach Muster und für alle Prüfungen, Tests, Messungen und Probeläufe; höchste Denkstufe, die Haiku unterstützt, bei reiner Fleißarbeit niedriger
- HAIKU-PLÄTZE: Standard 5
- GERÄTEGRÖSSEN: 360 × 740 · 390 × 844 · 430 × 932 · 844 × 390 · 768 × 1024 · 1024 × 768 · 1280 × 800 · 1440 × 900 · 1920 × 1080 · 2560 × 1440
- BUDGETS: mobil gemessen, Median aus drei Läufen: größtes Inhaltselement höchstens 2,5 s · Layoutverschiebung höchstens 0,1 · Reaktion höchstens 200 ms · Lighthouse mobil: Leistung mindestens 90, Zugänglichkeit mindestens 95, Best Practices mindestens 95, SEO 100 · zusätzlicher Code für Bewegung höchstens 60 KB komprimiert · Startbild mobil höchstens 200 KB. Ist ein Ausgangswert aus E0 besser, gilt er.
- BERICHTE: Morgenbericht um 07:00 Uhr deutscher Zeit · Deutsch, du-Anrede, ohne Fachjargon
- LAUFZEIT: bis alle Kriterien mit Beleg erfüllt sind und die Kür leer ist

## 1. NORDSTERN
Am Ende ist tezgel.de eine Seite, die jeder Laie ohne Hilfe versteht und die Deniz Tezgel stolz seinen Kunden zeigt: Nach wenigen Sekunden ist klar, was der Betrieb macht, wo er arbeitet und wie man einen Termin bekommt; echte Bilder und eine durchgehende Geschichte zeigen die Arbeit; ein Intro, in dem sich das Logo zeichnet, Seitenwechsel, bei denen sich Fliesen verlegen, und Bewegung mit Sinn heben die Gestaltung auf Award-Niveau; alles sitzt auf jedem Gerät, lädt schnell, ist zugänglich und behält jede Adresse und jeden Sucherfolg.

## 2. AUSGANGSLAGE
- Technik laut Außenansicht: Next.js mit dessen Bildsystem, ausgeliefert über Vercel, gebaut von Coday Webdesign. Über 100 Seiten: Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge (Badplaner, Projektcheck, Badanfrage, Fliesenkonfigurator, Festpreisangebot), Rechtstexte. Alles bestätigst du in E0 am Code.
- Der Anlass: Deniz Tezgel findet seine eigene Seite schwer verständlich, und ein Kunde hat sich nicht zurechtgefunden. Das ist der wichtigste Befund des ganzen Laufs.
- Auf der Seite gibt es keine Projektbilder. Echte Bilder liegen in BILDQUELLE.
- Erster Eindruck aus der Außenansicht vom 23.10.2026, in E0 zu prüfen:
  - Dieselben Themen stehen mehrfach in der Navigation, etwa das Bad unter Badsanierung, unter Fachgewerke und unter Leistungen. Fünf Aufklappmenüs mit Fachwörtern wie Fachgewerke, Untergrund oder DIN 18534.
  - Sechs Wege zur Anfrage konkurrieren: Projektcheck, Badplaner, Badanfrage, Konfigurator, Express-Anfrage, Kontakt. Die Startseite enthält drei Formulare.
  - Fachsprache ohne Erklärung: Verbundabdichtung, AIV, C2TE S1, Stelzlager, Rutschhemmung R10/R11, Nivelliersystem, Vakuumhebetechnik.
  - Viele Gedankenstriche und Bindestrichketten wie Vor-Ort-Aufmaß oder 2-cm-Keramik. Das wirkt maschinell geschrieben.
  - Darstellungsfehler: Die Bewertungszeile ergibt „5,0 von 527 Google-Rezensionen“ statt 5,0 bei 27.
  - Stärken: echte Kundenstimmen, Telefon und WhatsApp gut erreichbar, klarer Ablauf in drei Schritten, Formatvergleich 60 × 60 gegen 120 × 260, warme helle Farbwelt.
- Das bisherige Design ist gut, soll aber deutlich stärker werden. Ziel ist ein echtes Aha bei Deniz und seinen Kunden.

## 3. WORAUF ES ANKOMMT
1. Verständlich vor beeindruckend: Wo Wirkung und Verständlichkeit kollidieren, gewinnt Verständlichkeit. Prüfstein ist eine Frau von 72 Jahren, die ihre Badewanne gegen eine bodengleiche Dusche tauschen will und die Seite auf dem Handy öffnet.
2. Eine Geschichte statt eines Katalogs: Jede Seite führt von der Lage des Kunden über die Lösung zum nächsten Schritt.
3. Echt statt behauptet: echte Bilder, echte Stimmen, echte Fakten.
4. Handwerk als Gestaltungssprache: Fugenraster, Versatz, Gefälle, Wasserwaage, Laserlinie und Schichtaufbau liefern Formen und Bewegung. Austauschprobe: Passt eine Idee unverändert zu einer Bäckerei oder einem Steuerbüro, ist sie generisch.
5. Bestand und Suchmaschinen schützen: Jede Adresse bleibt erreichbar, jede Funktion arbeitet weiter.
6. Einmal gründlich planen, dann liefern: Nach dem Plan wird ausgeführt; neu geplant wird nur an Etappentoren, wenn ein Kriterium sonst unerreichbar wäre.
7. Prüfen mit Augenmaß: Prüfungen belegen das Ziel und schützen den Bestand; sie laufen auf Haiku, Opus urteilt über Ergebnisse.

## 4. GRENZEN, LEITPLANKEN, VORRANG
Autonomie
- Keine Rückfragen. Du entscheidest, begründest Folgenreiches in ENTSCHEIDUNGEN.md und arbeitest weiter. Was nur ein Mensch klären kann, steht mit Beleg und deiner Standardannahme in MENSCHEN.md; die Annahme gilt bis zur Antwort.
- Halt nur: nach dem Plan bei FREIGABE ja; wenn sich das Projekt auf drei dokumentierten Wegen weder bauen noch prüfen lässt; wenn der Bestand auch per Rückfall nicht zu halten ist; bei ABSCHLUSS.
- Kontextgrenzen, Nutzungslimits und Blockaden beenden den Lauf nicht: Stand sichern, ein anderes Paket nehmen, später exakt fortsetzen.
Grenzen, jede abhakbar
- G1 Arbeitsbereich: nur dieses Repository, darin _werkstatt, _eingang (lesen und dorthin entpacken) und ein Block in CLAUDE.md.
- G2 Git: vor der ersten Änderung auf ARBEITSBRANCH. Commits nur mit den Dateien ihres Pakets und _werkstatt, mit Paketkennung. Push nur nach PUSH, nie auf den Hauptbranch, nie erzwungen. Kein Rebase oder Reset über fremde Arbeit, keine gelöschten Branches, kein Zusammenführen, keine Änderung an Remotes oder Git-Einstellungen. Nicht gesicherte Änderungen, die du vorfindest, bleiben unberührt.
- G3 Veröffentlichung: keine Deploys, keine Änderung an Vercel-Projekt, Domain oder DNS. Eine Vorschau, die Vercel automatisch aus ARBEITSBRANCH baut, gilt nicht als Veröffentlichung.
- G4 Daten: Zugangsdaten, Schlüssel und Umgebungsdateien bleiben unberührt und erscheinen nirgends. _eingang/ steht vor dem ersten Entpacken in .gitignore; ZIP-Dateien und Originalfotos kommen nie in einen Commit, nur bearbeitete Webfassungen.
- G5 Außenwirkung: keine echten Formularsendungen, E-Mails, WhatsApp-Nachrichten oder Anrufe; in Prüfläufen fängst du Formularziele, Analyse und Tracking mit Attrappen ab. Kein Schreiben in ein CMS oder einen anderen externen Dienst.
- G6 Abhängigkeiten: neu nur, wenn der vorhandene Stack das Ziel nicht erreicht, nach Denkprotokoll mit Lizenz, Größe und Pflegezustand. Prüfwerkzeuge nur in _werkstatt/werkzeuge mit eigener Paketdatei.
- G7 Ehrliche Prüfungen: Tests, Linter, Typprüfung und Hooks werden nie gelockert oder umgangen. Nichts erkennt Prüfwerkzeuge oder Suchmaschinen, um sich anders zu verhalten.
- G8 Unantastbar: Logo in Form, Farbe und Proportion · Inhalte der Rechtstexte (Impressum, Datenschutz, AGB, Widerruf, Cookie-Richtlinie, Erklärung zur Barrierefreiheit) · Firmendaten · Wortlaut der Kundenstimmen und die Bewertungszahlen · Cookie-Einwilligung und ihr Verhalten · Pflichtfelder und Empfänger der Anfrageformulare. Die Darstellung drumherum darf besser werden.
- G9 Einstellungen, Berechtigungen und Modellwahl von Claude Code änderst du nicht.
Leitplanken
- Wahrheit: Fakten nur aus dem Bestand, gesammelt im Faktenblatt K-015 mit Fundstelle. Keine erfundenen Zahlen, Jahre, Projekte, Orte, Mitarbeitenden, Zertifikate, Auszeichnungen oder Kundenstimmen. Was fehlt, steht als Anfrage in MENSCHEN.md.
- Versprechen: Aussagen mit rechtlicher Bindung wie Garantie, Festpreis, Rückruf binnen 24 Stunden oder Terminfristen werden weder neu erfunden noch verschärft. Vorhandene bleiben sinngleich und stehen in MENSCHEN.md zur Bestätigung durch Deniz.
- Bilder: nur echte Bilder aus BILDQUELLE und dem Bestand. Keine Stockfotos, keine generierten Fotos. Bearbeitung nur Belichtung, Weißabgleich, Geraderichten und Zuschnitt; keine Mängel wegretuschieren. Alle Metadaten einschließlich Standort entfernen. Erkennbare Personen, Hausnummern, Kennzeichen, Namen und Dokumente: nicht verwenden oder so zuschneiden, dass sie nicht erkennbar sind; Liste in MENSCHEN.md.
- Datenschutz: keine neuen Drittanbieter oder Tracker, Schriften und Bibliotheken lokal; Karten wie bisher erst nach Einwilligung.
- Fairness und Originalität: keine Druckmittel wie künstliche Verknappung; keine Nachbauten fremder Seiten, keine fremden Marken oder Schriften ohne Lizenz.
Denkprotokoll und Vorrang
- Denkprotokoll nur für folgenreiche Entscheidungen (Leitidee, Navigation, Zusammenlegen von Werkzeugen, Technik des Seitenwechsels, neue Bibliothek, Entfernen von Bestand, AUSNAHME): Ziel, drei Wege, Bewertung nach Nordstern, Kriterien, Risiko und Aufwand, Umkehrprobe, Folgen zweiter Ordnung, Eintrag in ENTSCHEIDUNGEN.md.
- Vorrang: 1. Grenzen und Leitplanken · 2. Bestand und Adressen · 3. Verständlichkeit für Laien · 4. Zugänglichkeit und Leistung · 5. Abnahmeliste · 6. KERN · 7. Plan · 8. Gestaltungsvorlieben.

## 5. MODELLE, ROLLEN, PAKETE
- Opus 5.5, du in der Hauptsitzung: Art Direction, Texthoheit und technische Leitung. Du wertest Erkundungen aus, schreibst KERN, Plan, Referenztexte und alle gemeinsamen Dateien, baust Kernsysteme und große Momente, schneidest Pakete, nimmst ab, committest und pushst. Rohdaten liest du nicht; Haiku liefert verdichtete Berichte.
- Zuteilung: Das Modell jedes Agenten nennst du im Aufruf ausdrücklich; ohne Angabe erbt ein Agent womöglich Opus und verbraucht Kontingent für Fleißarbeit.
  - Stufe 1, Fleiß nach Checkliste: erkunden, inventarisieren, Bilder technisch sichten, einrichten, prüfen, messen, Probeläufe, dokumentieren → Haiku 5.5.
  - Stufe 2, Arbeit nach Muster: Seitentexte nach Referenztext, Lektorat, Bildsichtung nach Formular, Bildbearbeitung nach Bildplatzliste, Seiten und Bausteine nach Referenzansicht, Bewegungseinträge aus dem Register, Tests für neue Logik → Haiku 5.5 in kleinen Paketen mit vollständigem Muster.
  - Stufe 3, Urteil und Kernsysteme: Leitidee, Informationsarchitektur, Erzählbogen, Referenztexte, Designsystem, Seitenwechsel B-01, Intro B-02 mit Logo-Vektor, Bewegungssystem, Auswahl der Schlüsselbilder, schwierige Fehler, Abnahme → du selbst. Ein frischer Opus-5.5-Unteragent nur für die Sichtabnahme der Referenz, für die Endprüfung oder wenn ein Stufe-3-Paket deinen Kontext stark belasten würde.
  - Scheitert ein Haiku-Paket zweimal, übernimmst du oder schneidest kleiner; ein anderes Modell kommt nie zum Einsatz.
- Haiku-Rollen. Jedes Briefing nennt Aufgabe, was gute Arbeit ausmacht und die drei häufigsten Fehler und endet mit: Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.
  - Kundschafter: erfasst einen Bereich vollständig mit Fundstellen. Fehler: zusammenfassen statt auflisten; Vermutung als Befund; Seiten übersehen, die nicht in der Navigation stehen.
  - Baumeister: baut eine Seite oder einen Baustein nach Referenzansicht und Konventionen. Fehler: Werte außerhalb des Designsystems; Zustände und Mobilansicht vergessen; fremde Dateien ändern.
  - Grafiker: setzt Bewegungseinträge und SVG-Arbeiten nach Register und Formsystem um. Fehler: mehr animieren als das Register vorsieht; reduzierte Bewegung vergessen; uneinheitliche Strichstärken.
  - Texter: schreibt eine Seite nach Seitenformel, Schreibregeln und Referenztext neu. Fehler: Fachwort ohne Erklärung; Gedankenstrich oder Floskel; Fakt, der nicht im Faktenblatt steht.
  - Lektor: prüft und verbessert einen Seitentext nach Checkliste. Fehler: nur Stil statt Verständlichkeit prüfen; Fakten oder Suchbegriffe verändern; zu milde urteilen.
  - Bildsichter: beschreibt Bilder nach festem Formular. Fehler: Qualität zu milde bewerten; Personen, Hausnummern oder Kennzeichen übersehen; Material raten statt markieren.
  - Bildbearbeiter: bearbeitet und exportiert Bilder nach Bildplatzliste per Skript. Fehler: Metadaten bleiben; Schwerpunkt beim Zuschnitt verfehlt; Farbstich verstärkt.
  - Prüfer: richtet Werkzeuge ein, führt die Prüfungen seiner Stufe aus, berichtet knapp mit Belegpfaden. Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.
  - Probeläufer: spielt eine Person aus K-002 und löst Aufgaben nur mit dem Laufwerkzeug, ohne Code zu lesen. Fehler: Wissen nutzen, das die Person nicht hätte; aufgeben, bevor jeder sichtbare Weg versucht ist; schönreden.
  - Juror: bewertet nach Award-Rubrik an Bildsätzen, Einzelbildfolgen und Messwerten. Fehler: Noten ohne Begründung; Gesamteindruck statt Kategorien; Milde.
  - Dokumentar: pflegt Bildsätze, Galerie und Berichte. Fehler: Behauptung ohne Belegpfad; Fachjargon; veraltete Zahlen.
- Paket-Bauplan, feste Reihenfolge: 1. Kopfzeile: Kennung [Etappe]-[ROLLE]-[Nr] · Rolle · Modell · Stufe · Kern-Version · Schreibrechte als exakte Dateiliste · Umfang 2. Rollenbriefing 3. Aufgabe in einem Satz 4. Das Projekt in fünf Sätzen, wortgleich aus KERN 5. Kern-Auszug mit K-Kennungen, unveränderlich 6. Maßstab: Pfade zu Referenzansicht, Referenztext und Bildern 7. Grenzen 8. Nummerierte Schritte mit exakten Mengen 9. Schnellprüfung nach Stufe A und Selbstprüfung 10. Ausgabeformular: GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN 11. Letzte Zeile: === ENDE [Kennung] · BEREIT ZUR RÜCKGABE ===
- Ein Paket, ein Gegenstand, eine Rolle, ein Modell, ohne Rückfrage in einer Sitzung erledigbar. Berichte höchstens 600 Wörter, bei Kundschaftern 1.500. Platzhalter wie „usw.“, „analog“ oder „folgt“ führen zur Ablehnung.
- Dateihoheit: Gleichzeitige Pakete berühren nie dieselbe Datei; eine Seitendatei gehört je Welle genau einem Paket. Gemeinsame Dateien (Designsystem, globale Stile, Navigation, Routen, Weiterleitungen, gemeinsame Text- und Datendateien, KERN) schreibst nur du, gebündelt am Wellenende. Haiku-Agenten committen und pushen nicht und melden Fehler in fremden Dateien, statt sie zu beheben. Rechenintensive Prüfungen laufen nacheinander.

## 6. FACHKERN NUTZERFÜHRUNG (K-002, K-009)
- Personen für Probeläufe: P1 Rentnerin, 72, will die Wanne durch eine bodengleiche Dusche ersetzen, Handy mit großer Systemschrift · P2 junge Familie im Neubau, ganzes Haus fliesen, Tablet · P3 Vermieter, einzelne gesprungene Fliese und alte Fugen im Flur, Handy · P4 Hausbesitzer, auf dessen Balkon Wasser steht, Laptop · P5 Kunde, für den Deutsch Zweitsprache ist und der einfach einen Termin will, Handy.
- Hauptaufgaben: A1 in einem Satz sagen, was der Betrieb macht und wo · A2 Telefon oder WhatsApp finden · A3 einen Termin vor Ort anfragen, bis vor den Absendeknopf · A4 Bilder fertiger Arbeiten zur eigenen Lage finden · A5 verstehen, wie der Ablauf ist und ob der Termin vor Ort etwas kostet · A6 herausfinden, ob der Betrieb in einem bestimmten Ort arbeitet.
- Navigation: höchstens fünf Hauptpunkte in Alltagswörtern, dazu immer sichtbar ein Hauptknopf für die Anfrage und das Telefon. Höchstens eine Aufklappebene. Kein Thema steht zweimal. Mobil passt das Menü ohne Scrollen auf 360 × 740.
- Seitenarten: Erzählseiten (Start und Bereiche wie Bad, Wohnen, Balkon, Über uns) inszenieren; Wissensseiten (Fachthemen, Ratgeber) erklären ruhig; Ortsseiten; Arbeitsseiten (Anfrage, Kontakt, Werkzeuge, Rechtstexte) sind ruhig, dicht und schnell.
- Seitenformel für Erzähl-, Wissens- und Ortsseiten: 1. Worum es geht: Überschrift in Alltagssprache und ein bis zwei Sätze · 2. Ihre Lage: die Situation des Kunden · 3. Was wir tun · 4. So läuft es ab · 5. Beleg: Bilder und Stimmen · 6. Nächster Schritt: genau ein Hauptknopf.
- Anfrage: ein Hauptweg mit höchstens vier Pflichtangaben, daneben Anruf und WhatsApp. Die Werkzeuge bleiben als Hilfen erreichbar, konkurrieren aber nicht mit dem Hauptweg; ob du Werkzeuge zusammenlegst, entscheidest du per Denkprotokoll, alte Adressen leiten dann dauerhaft weiter. Jede Seite hat genau einen Hauptknopf, die Startseite höchstens ein Formular.
- Erstes Bild: Auf jeder Hauptansicht und in jeder GERÄTEGRÖSSE stehen ohne Scrollen vollständig sichtbar Logo, eine Überschrift, die sagt, worum es hier geht, der Ort, der Hauptknopf und Telefon oder WhatsApp.
- Orientierung: Brotkrumen auf tieferen Seiten, sichtbare Markierung der aktuellen Seite, eine Fehlerseite mit Charakter und den drei wichtigsten Wegen. Der Fuß der Seite bleibt eine vollständige, geordnete Übersicht aller Bereiche.

## 7. FACHKERN TEXTE UND GESCHICHTE (K-010, K-011, K-015)
- Erzählbogen: In E1 formulierst du aus Faktenblatt und Leitidee den Bogen der ganzen Seite in drei Sätzen. Illustration, nicht zum Übernehmen: Vom ersten Anruf bis zur letzten Fuge kümmert sich ein Betrieb aus Aßlar um Ihr Bad, Ihren Boden oder Ihren Balkon. Deniz Tezgel kommt selbst vorbei, plant mit Ihnen und verlegt so, dass Sie lange Freude daran haben. Bilder fertiger Arbeiten und Stimmen von Kunden zeigen, wie das aussieht.
- Ton: Sie-Anrede, wir-Form, warm, ruhig und selbstbewusst; kurze Sätze; konkrete Dinge statt Adjektive.
- Referenztexte: Startseite, eine Bereichsseite, eine Wissensseite und eine Ortsseite schreibst du selbst. Sie sind das Muster jedes Textpakets.
- Schreibregeln, messbar per Skript über die gerenderte Seite:
  - Lesbarkeit: Flesch-Wert nach Amstad mindestens 60 im Fließtext jeder Erzähl- und Ortsseite, mindestens 50 auf Wissensseiten; mittlere Satzlänge höchstens 14 Wörter; kein Satz über 25 Wörter; Absätze höchstens vier Sätze.
  - Fachwörter: Jedes Wort aus dem Glossar K-011 steht beim ersten Vorkommen je Seite mit einer Alltagserklärung von höchstens 15 Wörtern; Normen nur zusammen mit ihrem Nutzen. Illustration: Wir dichten nach Norm ab (DIN 18534). So kommt kein Wasser in Wand und Boden.
  - Zeichen: kein Gedankenstrich (– oder —) und kein Bindestrich als Gedankenstrich in sichtbarem Text, Alt-Texten, Seitentiteln, Beschreibungen und Bedienbeschriftungen. Bindestrichwörter nur, wenn die Rechtschreibung sie verlangt und keine natürliche Umformulierung besser klingt; jedes steht mit Grund in der Liste K-010-B, Startliste: E-Mail, Gäste-WC, Lahn-Dill-Kreis, Marburg-Biedenkopf. Zeitspannen mit „bis“ (7:30 bis 18 Uhr), Maße ohne Kette (2 cm starke Platten, Termin bei Ihnen vor Ort). Ausgenommen sind Rechtstexte und wörtliche Kundenstimmen.
  - KI-Spuren: keine Floskel aus K-010-F, Startliste: nahtlos, ganzheitlich, maßgeschneidert, Entdecken Sie, Ihr Partner für, höchste Qualität, Perfektion, von A bis Z, rundum sorglos, nicht nur … sondern auch. Keine Dreierketten von Adjektiven, keine Überschriften nach dem Muster „Begriff: Erklärung“, kein Stakkato wie „Dicht. Sauber. Termintreu.“
  - Suchbegriffe: Die Suchbegriffe je Seite aus E0 (Seitentitel, Hauptüberschrift, Beschreibung) bleiben natürlich im Text. Seitentitel höchstens 60 Zeichen, Beschreibung 120 bis 155 Zeichen, beide nach den Zeichenregeln.
  - Ortsseiten unterscheiden sich nur durch echte Angaben wie Entfernung und Anfahrt; keine erfundenen Projekte im Ort.
  - Kundenstimmen bleiben wörtlich; kürzen nur mit Auslassungszeichen.
- Liegen Texte in einem CMS statt im Code, schreibst du nichts dorthin: Neue Texte entstehen als importfertige Dateien in _werkstatt/texte mit Anleitung in MENSCHEN.md, und die Seite wird so vorbereitet, dass der Import sie sofort trägt.
- Geschichte vertiefen: In MENSCHEN.md steht ein Fragebogen an Deniz mit höchstens zehn Fragen in einfachen Worten (Anfänge, worauf er stolz ist, was Kunden am häufigsten fragen, schönstes Projekt, Team, was er anders macht als andere). Bis zur Antwort erzählt die Seite nur mit Fakten aus dem Bestand.

## 8. FACHKERN BILDER (K-012)
- Eingang: _eingang/ in .gitignore, dann entpacken nach _eingang/entpackt; Dubletten per Prüfsumme; Bildformate jpg, jpeg, png, heic, webp, tif; Videos nur notieren.
- Technische Sichtung, Haiku-Prüfer per Skript: Auflösung, Schärfe, Belichtung, Ausrichtung, Standortdaten ja oder nein → _werkstatt/bildinventar.csv.
- Inhaltliche Sichtung, Haiku-Bildsichter in Paketen zu 20 Bildern, je Bild eine Zeile: Datei · Raum (Bad, Dusche, Gäste-WC, Küche, Wohnen, Flur, Treppe, Balkon, Terrasse, außen, Baustelle, Detail, Team, sonstiges) · Motiv in einem Satz · Material und Format, falls erkennbar, sonst OFFEN · Vorher, Während oder Nachher · Paar-Kandidat · Qualität A, B oder C mit Grund · Personen, Hausnummern, Kennzeichen, Namen sichtbar · Eignung (Startbild, Galerie, Seitenbild, Detail, ungeeignet) · Bildschwerpunkt in Prozent für den Zuschnitt.
- Auswahl, du selbst: Bildplatzliste in _werkstatt/bildplaetze.md mit Seitenverhältnis und Bild je Platz. Jede Hauptansicht mit mindestens einem echten Bild, sofern passende Bilder da sind; ein starkes Startbild; eine Galerie „Unsere Arbeiten“ mit Filter nach Raum; Vorher-Nachher-Paare als Regler.
- Bearbeitung, Haiku-Bildbearbeiter per Skript: automatisch ausrichten, alle Metadaten entfernen, sanfte Korrektur, Zuschnitt nach Platz und Schwerpunkt, Webfassung höchstens 2.560 Pixel lange Kante, sprechende Dateinamen, Ablage nach Konvention des Projekts.
- Einbau über das Bildsystem von Next.js: feste Maße, passende Größenangaben, unscharfer Platzhalter, Vorrang nur für das Startbild. Alt-Text beschreibt in Alltagssprache, was zu sehen ist, höchstens 125 Zeichen, nach den Zeichenregeln; dekorative Bilder ohne Alt-Text.
- Fehlt BILDQUELLE: Alles andere läuft weiter. Bildplätze tragen bis dahin bewusst gestaltete Fliesenkompositionen aus dem Formsystem, nie graue Kästen oder „Bild folgt“. Vor jeder Welle prüfst du _eingang neu.

## 9. FACHKERN GESTALTUNG UND BEWEGUNG (K-001, K-003 bis K-008)
Leitidee und System
- Leitidee: ein Satz aus Betrieb, Kunden und Handwerk, der jede Entscheidung erklärt, mit Austauschprobe.
- Das vorhandene Designsystem wird geschärft und mutig weiterentwickelt; fehlende Stufen (Abstände, Schriftgrößen, Dauern, Kurven, Radien, Schatten) ergänzt du als Skalen, nie als Einzelwerte. Kein zweites System daneben.
- Formsystem: Das Fugenraster ist das Grundraster der Seite; Abstände leiten sich aus Fliesen- und Fugenmaß ab, Versatz bricht das Raster bewusst; Linien wie eine Laserlinie trennen und führen; eine Icon-Familie, eine Strichstärke.
- Typografie: deutlicher Kontrast zwischen großer Display-Schrift und Fließtext, Größen fließend zwischen Mobil und Desktop, Fließtext 60 bis 75 Zeichen je Zeile, Zeilenhöhe 1,5 bis 1,7, Silbentrennung, Display mobil am längsten Wort geprüft. Schriften lokal, mit abgestimmter Ersatzschrift.
- Farbe sparsam und mit Bedeutung; Kontrast mindestens 4,5:1 für Text und 3:1 für große Schrift, Bedienelemente und bedeutungstragende Grafik. Jedes Bedienelement hat gestaltete Zustände (Ruhe, Hover, Fokus, gedrückt, deaktiviert, lädt, Fehler, Erfolg); der Fokus ist immer sichtbar.
Bewegungssystem
- Register in K-007: jede Animation mit Kennung, Zweck (Orientierung, Rückmeldung, Zusammenhang, Hierarchie, Charakter), Auslöser, Dauer- und Kurvenstufe und Verhalten bei reduzierter Bewegung. Was keinen Zweck hat, entfällt.
- Richtwerte: Rückmeldung 120 bis 180 ms · Zustandswechsel 240 bis 400 ms · Auftritte 500 bis 900 ms · große Momente bis 1,6 s, ohne Inhalt zurückzuhalten. Ausgänge kürzer als Eingänge; Staffeln höchstens acht Elemente; je Bildschirmhöhe höchstens ein gewichtiger Auftritt; Arbeitsseiten nur Rückmeldung und Zustandswechsel.
- Technik in Worten: animiert werden nur Lage, Größe, Drehung und Deckkraft. Scrollen wird nie gekapert; an das Scrollen gebundene Szenen nutzen natives Scrollen und laufen rückwärts genauso stimmig. Was eine Animation einblendet, ist auch sichtbar, wenn sie nicht läuft.
- Reduzierte Bewegung: Bewegungen werden zu Überblendungen oder Sofortzuständen, die Information bleibt gleich. Nichts blinkt öfter als dreimal pro Sekunde.
B-01 Seitenwechsel „Verlegen“, Pflicht
- Bild: Fliesen im Verhältnis 2:1 quer nach SEITENWECHSEL, Fugen maßstäblich (3 mm auf 300 mm, mindestens 2 Pixel), im gewählten Verband: Beim Drittelverband springt jede Reihe um ein Drittel der Fliesenlänge, das Muster wiederholt sich alle drei Reihen. Größe so, dass bei 390 Pixel Breite etwa drei, bei 1.440 Pixel etwa acht Fliesen in einer Reihe liegen; höchstens 80 Fliesen gleichzeitig. Oberfläche in Farbe und feiner Struktur aus dem Designsystem, Fugen in Fugenfarbe, ein Hauch Glanz.
- Ablauf: 1. Verlegen, rund 45 % der Dauer: Die Verlegekante wandert vom rechten Rand nach links. Jede Fliese kommt mit kurzem Flug von rechts und setzt fest auf wie unter dem Gummihammer (Größe von 1,06 auf 1,0, Schatten wird eng, kein Nachfedern), innerhalb der Spalte gestaffelt nach dem Versatz; keine Fliese überfliegt eine schon gelegte. So entsteht ein klarer Takt: tak, tak, tak. 2. Wechsel: Ist die Fläche geschlossen, wechselt darunter die Seite; Scrollposition oben, Titel und Fokus neu. Ist die neue Seite noch nicht bereit, liegt der Boden still mit einer ruhig wandernden Laserlinie, höchstens drei Sekunden, danach normaler Wechsel ohne Fliesen. 3. Weiterziehen, rund 40 %: Der Belag zieht Spalte für Spalte nach links aus dem Bild, ohne dass eine Fliese über eine andere fliegt; die Freigabekante wandert von rechts nach links, und die neue Seite erscheint in dieser Richtung. Der Eindruck: Die Fliesen fliegen einmal durch.
- Zurück und Vor im Browser: gespiegelte Richtung, 70 % der Dauer. Kein Fliesenwechsel beim ersten Laden einer Seite, bei Ankern auf derselben Seite, externen Links, Telefon, WhatsApp, E-Mail, Downloads, Öffnen in neuem Tab und beim Absenden von Formularen. Doppelklicks lösen keinen zweiten Wechsel aus.
- Zugänglich: Die Schicht ist für Screenreader verborgen, die neue Seite wird mit Titel angesagt, der Fokus liegt auf der Hauptüberschrift; Tastaturbedienung bleibt unberührt. Bei reduzierter Bewegung: Überblendung von 150 ms.
- Technik: eine Ebene, nur Lage, Größe und Deckkraft, vorbereitet ohne das Startbild zu verzögern. Die Umsetzung passend zum Router des Projekts wählst du per Denkprotokoll.
B-02 Intro „Logo zeichnet sich“, Pflicht
- Nur beim ersten Besuch je Browser; ist der Speicher nicht verfügbar, entfällt das Intro. Ablauf: Die Kontur des Logos zeichnet sich in einer Reihenfolge, die zur Form passt (rund 1.000 ms), die Flächen füllen sich (rund 400 ms), dann gleitet das Logo an seinen Platz in der Kopfzeile, während sich die Startseite freilegt (rund 600 ms). Jeder Klick, Tipp, Tastendruck oder Scroll beendet das Intro sofort sauber. Bei reduzierter Bewegung blendet das Logo in 300 ms ein.
- Die Seite darunter ist bereits vollständig geladen und dargestellt; das Intro verzögert weder Inhalt noch Messwerte, die Budgets gelten mit Intro.
- Logotreue: Vektordatei aus LOGOQUELLE. Fehlt sie, baust du das Logo als Vektor nach der größten Bilddatei nach; eine automatische Nachzeichnung ist als Ausgangspunkt erlaubt, danach bereinigst du sie zu wenigen glatten Pfaden mit sinnvoller Zeichenreihenfolge. Prüfung: Formflächen stimmen bei doppelter Größe zu mindestens 98 % mit dem Original überein, Farben exakt aus dem Bestand. Gelingt das nicht, gilt das Ersatz-Intro „Der erste Boden“: Eine kleine Fläche legt sich im Verband, darauf erscheint das Original-Logo als Bild; in MENSCHEN.md steht die Bitte um eine Vektordatei.
Große Momente, Kandidaten; je Erzählseite einer, Auswahl nach Leitidee
- Das Startbild legt sich Fliese für Fliese im Verband frei.
- „Was unter der Fliese steckt“: Untergrund, Abdichtung, Kleber, Fliese und Fuge bauen sich beim Scrollen auf, jede Schicht mit einem Satz Nutzen.
- Formatvergleich 60 × 60 gegen 120 × 260 als Regler.
- Vorher-Nachher-Regler für Bildpaare.
- Verlegemuster zum Ausprobieren: Halbverband, Drittelverband, Fischgrät und Kreuzfuge auf einem kleinen Boden, mit einem Satz, wofür jedes passt.
- Balkon mit Gefälle: Regen läuft sichtbar ab.
- Ablauf „Vom Anruf bis zur letzten Fuge“ als Weg mit Stationen.
- Einsatzgebiet als gezeichnete Karte mit Aßlar in der Mitte; die echte Karte wie bisher erst nach Einwilligung.
Generisch, Katalog
- hart, muss null sein: erfundene Inhalte oder Platzhalter · Werte außerhalb des Designsystems in geänderten Dateien · fehlender Fokus oder Kontrast unter AA · gemischte Icon-Familien oder Emojis als Gestaltungsmittel · Effekte, die Inhalte verdecken oder Bedienung verzögern.
- weich, nur mit Grund aus der Leitidee: Verläufe, Glas, Leuchtkugeln, Partikel · zentrierte Überschrift mit zwei Knöpfen vor abstraktem Hintergrund · gleichförmige Karten als Hauptmuster · drei gleich gebaute Abschnitte in Folge · hochzählende Kennzahlen, Logo-Laufbänder, Nachlauf-Cursor.

## 10. FACHKERN GERÄTE (K-013)
- Mobil ist eine eigene Komposition, kein gestapelter Desktop. In jeder GERÄTEGRÖSSE: kein seitliches Scrollen, kein abgeschnittener, überlappender oder verdeckter Text, Fließtext mobil mindestens 16 Pixel, Touchziele mindestens 44 × 44, sichere Ränder bei Notch und Gestenleiste, Vollbildhöhen ohne Sprung beim Ein- und Ausblenden der Browserleiste, die Kopfzeile verdeckt keine Anker.
- Systemschrift auf 200 %: alles lesbar und bedienbar. Handy quer: Kopfzeile und Leisten nehmen höchstens ein Viertel der Höhe. Große Bildschirme: begrenzte Textbreite, scharfe Bilder.
- Hover nur bei feinen Zeigegeräten; Touch bekommt eigene Rückmeldung. Intro und Seitenwechsel passen sich an: weniger, größere Fliesen auf kleinen Bildschirmen.

## 11. FACHKERN ADRESSEN UND SUCHMASCHINEN (K-014)
- In E0 entsteht _werkstatt/adressen-e0.csv aus Sitemap und Durchlauf aller internen Links: Adresse, Status, Seitentitel, Beschreibung, Hauptüberschrift, Canonical, strukturierte Daten.
- Jede Adresse bleibt erreichbar: Status 200 oder dauerhafte Weiterleitung auf eine gleichwertige Seite. Null kaputte interne Links. Je Seite genau eine Hauptüberschrift, Titel, Beschreibung und Canonical; strukturierte Daten gültig; Sitemap vollständig.

## 12. GEDÄCHTNIS
- Der Stand des Laufs liegt im Repository unter _werkstatt: AUFTRAG.md (dieser Auftrag wörtlich) · STATUS.md · PRUEFPUNKT.md (nächster exakter Schritt, laufende Pakete, letzter grüner Commit) · LAGEBILD.md · KERN.md · PLAN.md · ABNAHME.md · ENTSCHEIDUNGEN.md · MENSCHEN.md · BERICHT.md · bildinventar.csv · bildplaetze.md · adressen-e0.csv · Ordner pakete, berichte, texte, bilder, protokolle, werkzeuge. _werkstatt wird nicht ausgeliefert; das stellst du über die vorhandene Konfiguration sicher.
- Bilder für Berichte komprimiert, höchstens 1.440 Pixel breit; ins Repository nur die Bildsätze aus E0, aus der Referenz und vom Abschluss sowie täglich höchstens sechs Bilder für den Morgenbericht. Alles Übrige und die Abhängigkeiten der Werkzeuge liegen außerhalb des Repositorys.
- CLAUDE.md: anlegen oder ergänzen, nichts anderes ändern; ein Block mit Anfangs- und Endmarke: nur für den Orchestrator; bei jedem Sitzungsstart und nach jeder Kontextverdichtung _werkstatt/AUFTRAG.md, STATUS.md und PRUEFPUNKT.md lesen und dort fortsetzen; Push nur nach PUSH, kein Deploy. Beim ABSCHLUSS entfernst du den Block.
- KERN.md, Quelle der Wahrheit: „Das Projekt in fünf Sätzen“ · K-001 Leitidee · K-002 Personen und Hauptaufgaben · K-003 fünf bis sieben Gestaltungsprinzipien mit Tun und Lassen · K-004 Stack und Konventionen · K-005 Designsystem · K-006 Typografie und Komposition · K-007 Bewegungsregister mit B-01 und B-02 · K-008 Formsystem · K-009 Informationsarchitektur mit Navigation, Seitenarten und Seitenformel · K-010 Ton, Erzählbogen und Schreibregeln mit K-010-B und K-010-F · K-011 Glossar der Fachwörter mit Alltagserklärung · K-012 Bildregeln · K-013 Geräte und Budgets · K-014 Adressen und Suchmaschinen · K-015 Faktenblatt mit Fundstellen · markierte Annahmen. Änderungen nur durch dich, mit Version und Grund.

## 13. ABLAUF
Zu Beginn jeder Etappe liest du KERN.md, PLAN.md und ABNAHME.md und verankerst dich in drei Sätzen am Nordstern.
E0 Start und Erkundung
- Branch zuerst: Ist ARBEITSBRANCH ein früherer Lauf mit _werkstatt/PRUEFPUNKT.md, gilt L5. Sonst anlegen und wechseln, bevor du etwas änderst.
- _eingang/ in .gitignore, _werkstatt anlegen, Auftrag wörtlich speichern, CLAUDE.md-Block setzen, committen.
- Ein Haiku-Prüfer installiert, baut und startet die Seite über die vorhandenen Skripte und richtet in _werkstatt/werkzeuge ein: Einzelbild und Bildsatz in allen GERÄTEGRÖSSEN, Leistungsmessung, Zugänglichkeitsprüfung, Linkprüfung, Zeichen- und Lesbarkeitsprüfung, Prüfung „Erstes Bild“ über die Lage der Pflichtelemente, Einzelbildfolgen von Animationen und das Laufwerkzeug für Probeläufe (zeigt den Bildschirm als Bild und die sichtbaren Bedienelemente mit Beschriftung; Befehle: tippe, scrolle, zurück; zählt jeden Schritt).
- Haiku-Kundschafter, je ein Paket: 1. Stack, Router, Struktur, Skripte, Auslieferung · 2. Designsystem, Schriften, Komponenten, freie Werte · 3. alle Seiten, Textquelle (Code oder CMS), Suchbegriffe je Seite · 4. Navigation, Formulare, Werkzeuge, Einwilligung, Funktionsliste · 5. Logodateien, SVGs, Icons, vorhandene Animationen · 6. Tests, Qualität, Adressen und strukturierte Daten nach Abschnitt 11. Liegt BILDQUELLE vor, beginnt die Bildsichtung parallel.
- Ausgangswerte: Ein Haiku-Prüfer misst die Hauptansichten nach Stufe B; die Probeläufer P1 bis P5 lösen A1 bis A6 auf dem alten Stand, mobil und am Desktop. Das ist der Vorher-Wert der Nutzerführung.
- Hauptansichten, höchstens zwölf, Vorschlag: Start, Bad-Übersicht, Badsanierung, barrierefreies Bad, Leistungsübersicht, Fliesen, Balkon und Terrasse, Referenzen, Über uns, Kontakt, Ortsseite Wetzlar als Muster aller Ortsseiten, Ratgeber. Du legst sie fest; danach unveränderlich.
- LAGEBILD.md: Projekt in fünf Sätzen, Hauptansichten, Funktionsliste als Bestandsschutz, Ausgangswerte, Ergebnis der Probeläufe, Stärken, Schwächen mit Wirkung, Chancen.
E1 Plan, gründlich und einmal
- Leitidee, Informationsarchitektur, Erzählbogen, Designsystem, B-01, B-02 und Auswahl der großen Momente per Denkprotokoll, eine Richtung ohne Varianten; KERN.md schreiben; die vier Referenztexte schreiben.
- PLAN.md: Mengengerüst (Seiten nach Art, Texte, Bilder, Bildplätze, Komponenten, Animationen, Weiterleitungen) · alle Pakete mit Kennung, Ziel, Rolle, Modell, Stufe, Schreibrechten, Abhängigkeiten und Kriterium · Pflicht und Kür, beide nach Wirkung sortiert · Etappen und Wellen mit kritischem Pfad · Modellanteil · Kapazität: Tage = Pakete ÷ (HAIKU-PLÄTZE × Wellen pro Tag) × 1,2.
- ABNAHME.md mit Z-01 bis Z-14 und den Ausgangswerten. Was lokal nicht messbar ist, etwa echte Geräte, wird UMGEBUNGSAUSNAHME mit Ersatzprüfung und steht in MENSCHEN.md.
- Planprüfung: Ein Haiku-Prüfer prüft nach Checkliste (jedes Kriterium hat Pakete, jedes Paket dient einem Kriterium und nennt sein Modell, keine Datei in zwei Paketen einer Welle, jedes Haiku-Paket hat Muster und Maßstab); höchstens zwei Runden, dann gilt der Plan. Committen; bei FREIGABE ja Halt mit einer Übersicht von höchstens 30 Zeilen.
E2 Referenz
- Du baust selbst: Designsystem-Erweiterung, Navigation und Kopfzeile, B-01, B-02, Formsystem mit Icons und die Startseite vollständig auf Zielniveau mit Referenztext und Bildern.
- Etappentor: Stufe B für die Startseite, Probelauf P1 und P5 mit A1 bis A3, Sichtabnahme durch einen frischen Opus-5.5-Unteragenten nach Award-Rubrik mit mindestens 8. Ab dann ist die Startseite das Muster.
E3 und folgende, Ausführung
- Wellen nach Dateihoheit, Pflicht vor Kür. Reihenfolge: Seitenvorlagen je Seitenart, dann Hauptansichten, dann alle übrigen Seiten; Texte je Seite als Texterpaket und eine Welle später als Lektorpaket; Bilder nach Bildplatzliste; große Momente. Deine Stufe-3-Arbeit erledigst du, während die Haiku-Plätze laufen.
- Textstichprobe: Nach jeder Textwelle prüfst du zufällig 10 % der Seiten, mindestens fünf. Verfehlen mehr als 10 % der Stichprobe die Schreibregeln, geht die ganze Welle zurück.
- Ist die Pflicht erledigt, folgt die Kür nach Wirkung. An ihrer Spitze steht der Feinschliff: Die Jury bewertet jede Hauptansicht, jede Kategorie unter 9 wird ein Paket, höchstens zwei Runden je Hauptansicht und Kategorie. Neue Pakete entstehen nur aus Lücken der Abnahmeliste oder Befunden von Sichtabnahme und Jury.
Abschluss
- Stufe C, BERICHT.md mit Vorher-Nachher-Galerie als eigener Seite in _werkstatt/bilder, Anleitung zum Zusammenführen und Zurückrollen mit dem Hinweis, _werkstatt vorher zu entfernen, MENSCHEN.md vollständig.
- ABSCHLUSS erst, wenn ein frischer Opus-5.5-Unteragent jedes Häkchen, jede AUSNAHME und jede UMGEBUNGSAUSNAHME gegen den Beleg bestätigt hat; er führt keine Tests aus, er prüft Belege und Bildsätze. Sein Urteil, je Kriterium eine Zeile mit Ergebnis und Belegpfad, gibst du in der letzten Antwort wörtlich wieder. Dann CLAUDE.md-Block entfernen, committen, Push nach PUSH, Statuszeile ABSCHLUSS.

## 14. PRÜFEN MIT AUGENMASS
Prüfungen, Tests, Messungen und Probeläufe führt immer ein Haiku-5.5-Agent mit den Werkzeugen aus _werkstatt/werkzeuge aus; du liest Ergebnisse und urteilst. Was in keiner Stufe steht, wird nicht geprüft.
- Stufe A, je Paket, Minuten: Typprüfung und Linter der geänderten Dateien, direkt betroffene Tests, Zeichen- und Lesbarkeitsprüfung geänderter Seiten, ein Bild mobil und am Desktop. Nach jeder Welle ein Build.
- Stufe B, je Etappe: Build, Typprüfung, Linter und ganze Testsuite · Konsolenfehler · Bildsatz der Hauptansichten mit Überlaufprüfung und Prüfung „Erstes Bild“

<!-- Hier endet der übermittelte Auftragstext (Nachricht vom 23.10.2026, abgeschnitten). -->

---

# ERGÄNZUNG · rekonstruiert (Annahme)

> Der übermittelte Auftrag bricht in Abschnitt 14 mitten in Stufe B ab. Auf Wahl des Auftraggebers („Rekonstruieren“, 23.10.2026) ergänzt der Orchestrator die fehlenden Teile. Grundlage sind der Vorgänger-Auftrag (`_werkstatt/archiv/2026-10-werkstatt/AUFTRAG.md`, Abschnitte 9 bis 14) und die Abschnitte 0 bis 13 oben. Alles in diesem Block ist eine **Annahme**: Reicht der Auftraggeber den Originaltext nach, ersetzt dieser den Block vollständig, und betroffene Pakete und Kriterien werden angepasst (ENTSCHEIDUNGEN.md).

## 14 (Fortsetzung). PRÜFEN MIT AUGENMASS
- Stufe B, je Etappe (Fortsetzung): … · automatische Zugänglichkeitsprüfung nach WCAG 2.2 AA · Leistungsmessung der Hauptansichten mobil und am Desktop, Median aus drei Läufen, jeder Lauf mit frischem Browserprofil · Durchlauf mit reduzierter Bewegung · Zeichen- und Lesbarkeitsprüfung der Hauptansichten · Linkprüfung · je neuem großem Moment fünf Einzelbilder über seine Dauer und eine Bildratenmessung · Suche nach Werten außerhalb des Designsystems in den geänderten Dateien · Probeläufe nach Etappenplan.
- Stufe C, Endprüfung, einmal je Abschlussversuch: Stufe B, erweitert um eine Zufallsstichprobe von 10 % der übrigen Seiten, mindestens fünf · Bildsatz aller Hauptansichten in allen GERÄTEGRÖSSEN und mit Systemschrift 200 % · Durchlauf der Funktionsliste aus LAGEBILD.md · Probeläufe P1 bis P5 mit A1 bis A6, mobil und am Desktop, dazu A2 und A3 nur mit Tastatur · Abgleich aller Animationen mit dem Register · Prüfung aller SVG-Dateien · Durchlauf aller Adressen aus adressen-e0.csv (Status, Titel, Beschreibung, Hauptüberschrift, Canonical, strukturierte Daten, Suchbegriffe) · Zeichen- und Lesbarkeitsprüfung aller Seiten · Metadatenprüfung aller ausgelieferten Bilder.
- Neue Tests nur für neue oder geänderte Logik und für Abläufe, deren Ausfall teuer wäre; kein Test für reines Aussehen, keine Bildvergleichstests je Seite.
- Werkzeuge: zuerst, was Projekt und Umgebung mitbringen. Fehlt eines und lässt es sich nicht installieren, prüft der Haiku-Prüfer mit den vorhandenen Mitteln weiter, und die Lücke steht in MENSCHEN.md. Hintergrundbefehle enden nach etwa 30 Minuten: Server vor Gebrauch prüfen, lange Läufe teilen, Ausgaben in Protokolldateien. Nach einer neu aufgesetzten Umgebung wiederholt ein Haiku-Prüfer die Einrichtung aus `_werkstatt/werkzeuge/EINRICHTUNG.md`.
- Award-Rubrik für Sichtabnahme, Jury und Endprüfung: Kategorien Verständlichkeit, Typografie, Komposition, Farbe und Bild, Bewegung, Grafik und Details, je 1 bis 10, jede Note mit Begründung. Anker: 5 sauber, aber vorhersehbar · 7 eigenständig, einzelne generische Stellen · 8 unverwechselbar und präzise, Bewegung mit Sinn, ein Laie findet sich sofort zurecht · 9 man zeigt es anderen, weil es überrascht und mühelos wirkt. Ansichtswert = Mittel der sieben Kategorien. Bewegung wird an Einzelbildfolgen und Register bewertet. Sichtabnahme nach jeder Stufe B mit höchstens 24 Bildschirmhöhen-Ausschnitten der Hauptansichten plus den Einzelbildern neuer großer Momente; jede Kategorie unter 8 wird ein Paket, höchstens zwei je Hauptansicht und Kategorie im ganzen Lauf.

## 15. REGELKREISE
- L0 Plan: nach E1, höchstens zwei Runden.
- L1 Paket: ausgeben → bauen → Stufe A → Abnahme durch den Orchestrator an Bericht, Diff-Stichprobe und, bei sichtbaren Änderungen, einem Bild → Commit oder Reparatur. Höchstens zwei Reparaturrunden, dann übernimmt der Orchestrator oder schneidet neu.
- L2 Welle: Änderungen an gemeinsamen Dateien übertragen, Build nach Stufe A, Push erst bei Grün (Build, Typprüfung und Tests nicht schlechter als in E0), dann STATUS.md und PRUEFPUNKT.md aktualisieren und die nächste Welle starten. Kein Haiku-Platz bleibt leer, solange Pakete bereitstehen; fehlen bereite Pakete, wird Kür vorgezogen, nie Füllstoff.
- L3 Etappe: Stufe B → Sichtabnahme → Befunde als Pakete der nächsten Etappe → Abgleich mit ABNAHME.md. Höchstens zwei Anläufe je Etappentor; danach geht die Arbeit weiter, und die Lücke steht als offener Punkt in PLAN.md.
- L4 Zeit: Stündlich eine Zeile unten in STATUS.md, PRUEFPUNKT.md aktualisieren, Abgenommenes und den Zwischenstand der eigenen Arbeit mit dem Vermerk ZWISCHENSTAND committen und pushen; Zwischenstände sind von der Grün-Regel aus L2 ausgenommen. Zur Berichtszeit folgt der Morgenbericht in BERICHT.md.
- L5 Wiederaufnahme: Jede neue Sitzung und jede neu aufgesetzte Umgebung stellt zuerst den Branch sicher (Name in der letzten Statuszeile oder in STATUS.md; fehlt er im Arbeitsbaum, vom Remote holen), liest dann PRUEFPUNKT.md und STATUS.md und setzt exakt dort fort. Pakete, die beim Abbruch liefen, werden in ihren Dateien auf den letzten Commit zurückgesetzt und neu gestartet. Die Einrichtung folgt EINRICHTUNG.md, einschließlich der Wiederherstellung der Bildquelle.
- L6 Lernen: Tritt derselbe Fehler zweimal auf, werden Muster, Briefing oder Paketschnitt verbessert und in ENTSCHEIDUNGEN.md vermerkt.
- L7 Ziel: Nach jeder Etappe Abgleich mit ABNAHME.md; jede Lücke wird zu Paketen. Steigt in zwei Etappen weder der Anteil erledigter Pflichtpakete noch die Zahl erfüllter Kriterien, wird der Plan einmal neu geschnitten. Ist ein Kriterium nach zwei belegten Anläufen unerreichbar, steht es mit Denkprotokoll und bester Ersatzlösung als AUSNAHME in ABNAHME.md, nie als abgehakt; höchstens zwei Ausnahmen, keine für Z-02, Z-11 und Z-14; UMGEBUNGSAUSNAHMEN aus E1 zählen nicht dazu.
- Rückfall: Bricht ein Commit den Bestand, wird der letzte grüne Stand per Revert-Commit wiederhergestellt, ohne Geschichte umzuschreiben; Ursache finden, Test ergänzen.

## 16. ZIELFORMEL UND ABNAHME
- Endprodukte: die veränderte Website auf ARBEITSBRANCH mit grünem Bestand · KERN.md als Dokumentation des Systems · BERICHT.md mit Vorher-Nachher-Galerie · MENSCHEN.md · Anleitung zum Zusammenführen und Zurückrollen. Definition of Done in ABNAHME.md: Kriterium · Methode · Schwelle · Beleg.
- Z-01 Plan · Abgleich mit PLAN.md · 100 % der Pflichtpakete erledigt und abgenommen, Kür leer · PLAN.md mit Commit-Kennungen.
- Z-02 Bestand · Stufe C · Build, Typprüfung, Linter und Tests mindestens so grün wie in E0, Funktionsliste vollständig durchlaufen, keine Funktion schlechter als in E0, null neue Konsolenfehler · Prüfprotokoll.
- Z-03 Designsystem · Suche und Stichprobe · null Werte außerhalb des Designsystems in geänderten Dateien, ausgenommen Unantastbares und Bildinhalte; jede neue Komponente nutzt das System · Prüfliste.
- Z-04 Gestaltung · Endprüfung · Der Endprüfer bewertet die Nachher-Bilder nach der Rubrik: jede Hauptansicht mit Ansichtswert mindestens 8, keine Kategorie unter 7. Im blinden Vergleich (ein Haiku-Dokumentar benennt neutral und mischt zufällig, der Schlüssel liegt getrennt) zieht er auf jeder Hauptansicht den neuen Stand vor · Bildsätze und Bewertung.
- Z-05 Bewegung · Register und Stufe C · jede Animation steht im Register; B-01 und B-02 erfüllen ihre Spezifikation aus Abschnitt 9 (Dauern, Ausnahmen, Zugänglichkeit, reduzierte Bewegung); bei reduzierter Bewegung keine Lage- oder Größenänderung und alle Inhalte sichtbar; große Momente mobil bei vierfach gedrosseltem Prozessor mit höchstens 5 % verworfenen Bildern · Messprotokoll.
- Z-06 Grafik · Stufe C · eine Icon-Familie mit einer Strichstärke, alle SVG-Dateien optimiert und zugänglich, keine doppelten Kennungen in einer Ansicht; Logo-Vektor mit mindestens 98 % Deckung oder Ersatz-Intro nach Abschnitt 9 · Prüfliste.
- Z-07 Zugänglichkeit · Stufe C · null ernste oder kritische Befunde der automatischen Prüfung auf den Hauptansichten, Hauptaufgaben auch nur mit Tastatur lösbar, Fokus immer sichtbar, Kontraste nach Abschnitt 9, Systemschrift 200 % lesbar und bedienbar · Bericht.
- Z-08 Leistung · Stufe C · BUDGETS aus Abschnitt 0 auf allen Hauptansichten eingehalten, gemessen mit Intro; keine Hauptansicht schlechter als in E0 um mehr als die Spanne der drei E0-Läufe; ist ein E0-Wert besser als das Budget, gilt er · Messprotokoll.
- Z-09 Darstellung · Stufe C · Hauptansichten und Stichprobe in allen GERÄTEGRÖSSEN ohne seitliches Scrollen, abgeschnittenen, überlappenden oder verdeckten Text; Prüfung „Erstes Bild“ auf allen Hauptansichten in allen GERÄTEGRÖSSEN bestanden · Bildsatz.
- Z-10 Übergabe · Endprüfung · BERICHT.md, KERN.md, MENSCHEN.md, Vorher-Nachher-Galerie und Anleitung zum Zusammenführen und Zurückrollen vollständig · Dateien.
- Z-11 Nutzerführung · Stufe C · P1 bis P5 lösen A1 bis A6 mobil und am Desktop vollständig, mit höchstens so vielen Schritten wie in E0 und ohne Abbruch; Navigation nach Abschnitt 6 (höchstens fünf Hauptpunkte, eine Aufklappebene, kein Thema doppelt, Mobilmenü ohne Scrollen auf 360 × 740); jede Seite genau ein Hauptknopf; Startseite höchstens ein Formular; Hauptweg mit höchstens vier Pflichtangaben · Probelaufprotokolle.
- Z-12 Texte · Skript und Stichprobe · Schreibregeln aus Abschnitt 7 auf allen Seiten außer Rechtstexten erfüllt; Textstichproben aller Wellen bestanden; null Fakten außerhalb des Faktenblatts K-015; Suchbegriffe je Seite erhalten · Prüfprotokoll.
- Z-13 Bilder · Stufe C · jede Hauptansicht mit mindestens einem echten Bild, sofern passende Bilder da sind; Startbild, Galerie „Unsere Arbeiten“ mit Filter nach Raum und Vorher-Nachher-Regler vorhanden; null Metadaten in ausgelieferten Bildern; Alt-Texte nach Abschnitt 8; keine erkennbaren Personen, Hausnummern, Kennzeichen, Namen oder Dokumente · Bildinventar und Prüfprotokoll.
- Z-14 Adressen · Stufe C · jede Adresse aus adressen-e0.csv liefert 200 oder leitet dauerhaft auf eine gleichwertige Seite; null kaputte interne Links; je Seite genau eine Hauptüberschrift, Titel, Beschreibung und Canonical; strukturierte Daten gültig; Sitemap vollständig · Adressprotokoll.
- Kriterien sinken nie still; erledigt ist nur, was geprüft ist.

## 17. RISIKEN, FRÜHWARNZEICHEN UND GEGENMASSNAHMEN
- „Prächtig, aber träge“: Eine Leistungsmessung fällt nach einer Etappe deutlich → Ursache vor neuen großen Momenten beheben, Budget je Paket.
- „Effektfeuerwerk“: Das Bewegungsregister wächst schneller als die Zahl fertiger Seiten → Einträge streichen, Zurückhaltung durchsetzen.
- „Schön, aber unverständlich“: Ein Probelauf scheitert oder braucht mehr Schritte als in E0 → Verständlichkeit vor Wirkung, Paket vor jeder weiteren Gestaltung.
- „Fremdkörper“: Neues wirkt neben Altem wie aus einem anderen Projekt → zurück an Designsystem und Referenz, Muster schärfen.
- „Leerlauf“: Pakete warten auf Abhängigkeiten oder den Orchestrator → Abhängigkeiten auflösen, Kür vorziehen, Stufe-3-Arbeit zwischen die Wellen legen.
- „Gedächtnisverlust“: Eine neue Umgebung findet den Stand nicht → Takt aus L2 und L4 einhalten, laufende Pakete in PRUEFPUNKT.md.

## 18. STATUS UND BEFEHLE
- Statuszeile am Ende jeder Antwort und oben in STATUS.md: STATUS · Branch [Name] · Etappe [n/m] · Welle [x] · Pflicht [erledigt/gesamt] · Kür [erledigt/gesamt] · Kriterien [n]/14 · Ausnahmen [n] · Bestand [grün/rot] · Nächster Schritt: [konkret]
- Abschluss: ABSCHLUSS · Branch [Name] · Kriterien [n]/14 · Ausnahmen [n]. Halt: HALT · [Grund] · Branch [Name] · Kriterien [n]/14. Warten: WARTET AUF FREIGABE · Branch [Name].
- Morgenbericht in BERICHT.md, höchstens 20 Zeilen, du-Anrede, ohne Fachjargon: was fertig ist, mit Bildpfaden · Stand der Kriterien · was als Nächstes kommt · was Deniz oder der Auftraggeber prüfen oder entscheiden sollte.
- Befehle des Menschen: FREIGABE (der Plan gilt) · ÄNDERN: [Wunsch] (KERN oder Plan anpassen, Version erhöhen, kurz bestätigen, weiterarbeiten) · STATUS (Statuszeile und Kurzstand) · WEITER (an PRUEFPUNKT.md fortsetzen) · STOPP (Stand sichern, committen, pushen, anhalten).

## 19. START
1. Nennt die letzte Statuszeile einen Branch oder ist ARBEITSBRANCH ein früherer Lauf mit _werkstatt/PRUEFPUNKT.md dieses Auftrags: Wiederaufnahme nach L5; steht dort WARTET AUF FREIGABE, wartet der Orchestrator auf FREIGABE oder ÄNDERN.
2. Sonst E0: zuerst der Branch, dann _werkstatt mit CLAUDE.md-Block, dann Einrichtung und Erkundung.
3. Leere Einstellungen nehmen die Standardwerte; sie stehen als Annahmen in STATUS.md.
4. Danach wird ohne Unterbrechung durch die Etappen gearbeitet. Ein Zug endet nur mit HALT, ABSCHLUSS, WARTET AUF FREIGABE oder nach STOPP.
