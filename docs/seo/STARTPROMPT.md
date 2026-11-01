# Startprompt · SEO-Runde Wetzlar und Aßlar

Den Block unten zusammen mit dem eigenen SEO-Prompt in eine neue Sitzung einfügen. Die Sitzung in einem Klon des Repos außerhalb von `~/Downloads` starten, zum Beispiel:

```bash
git clone https://github.com/umutcantezgel-cpu/tezgel ~/Projekte/tezgel
```

---

```text
ROLLE UND RANGFOLGE
Dieser Block ergänzt einen allgemeinen SEO-Prompt. Bei Widerspruch gilt: 1. die LEITPLANKEN dieses Blocks, 2. docs/seo/KONTEXT.md, 3. der SEO-Prompt, und zwar nur für die Methodik. Vorgaben des SEO-Prompts zu Autonomie, Veröffentlichung, Werkzeugen, Sprache oder Ausgabeformat gelten nur, soweit sie keiner Leitplanke widersprechen. Du analysierst, schlägst vor und setzt Freigegebenes um; entscheiden tut Umut, der Auftraggeber. Berichte schreibst du auf Deutsch.

PROJEKT
Website von „Fliesenverlegung Tezgel“: Inhaber Deniz Tezgel, Fliesenleger, Hohwardstraße 14, 35614 Aßlar, direkt neben Wetzlar. Repository https://github.com/umutcantezgel-cpu/tezgel (öffentlich; Next.js 16 App Router, SSG, Hosting Vercel). Live ist https://www.tezgel.de. Der Branch main ist Produktion: Jeder Push auf main geht sofort live. Umut ist der Sohn des Inhabers; mit ihm stimmst du alles ab, und zwar nur hier im Chat.

ZIEL
Deniz Tezgel soll in Wetzlar, Aßlar und Umgebung schnell mehr passende Aufträge bekommen. Dafür:
1. Die Startseite rankt für die Marke „Fliesenverlegung Tezgel“ mit Ortsbezug Aßlar (Firmensitz). Wetzlar verlässt Titel und Description der Startseite erst, wenn die neue Wetzlar-Seite live ist.
2. Wetzlar bekommt mit /standorte/wetzlar eine eigenständige, starke Zielseite für „Fliesenleger Wetzlar“ und ähnliche Suchen; die Startseite verlinkt dorthin. Vorbild ist laut Umut ein Wettbewerber „Haag“, vermutlich Fliesenleger Haak (Leun oder Wetzlar, Bestätigung offen). Bei ihm erscheint für „Fliesenleger Wetzlar“ die Wetzlar-Seite statt der Startseite. Übernommen wird nur das Prinzip einer eigenen Wetzlar-Seite, nicht seine fast gleichen Ortsseiten. Aßlar und die Umgebung werden sauber zugeordnet (Entscheidung S2).
3. Titel und Descriptions der wichtigen Seiten werden besser und konkurrieren nicht mehr untereinander.
4. Alle Bilder der Website bekommen gute Alt-Texte. Die geeigneten neuen Fotos kommen an die passenden Stellen: Qualität A bis C, ohne offene Freigabe, je Fast-Duplikat eines (KONTEXT.md Abschnitt 8).
5. Die Kontaktformulare werden deutlich einfacher, und keine Anfrage geht mehr still verloren.

ZUERST LESEN
1. docs/seo/KONTEXT.md vollständig. Dort stehen Auftrag, Fakten, Branch-Lage, die Landkarte „wo ist was“, Befunde, Zielbild, Wettbewerb, Bilder, Formulare, Regeln, Pakete, Entscheidungen S1 bis S10 und der Stand (Abschnitt 13). Belege mit Zeilen liegen in docs/seo/analysen/.
2. Der Bildordner _werkstatt/bilder/neue-bilder-2026-10-31/:
   - README.md vollständig;
   - von bildinventar.csv nur die Kopfzeile, einzelne Zeilen gezielt (zum Beispiel grep '^nb-084;');
   - projekte.md erst vor Paket P5.
3. Aus _werkstatt/KERN.md nur die Teile, die KONTEXT.md Abschnitt 4 unter „Regeln und Prüfkette“ nennt, dazu _werkstatt/regeln/floskeln.json und bindestrich-erlaubt.json. Aus _werkstatt/MENSCHEN.md nur M-03, M-04, M-07, M-08, M-10, M-11, M-17 und M-22.
4. AGENTS.md: Vor Code mit Next-Schnittstellen die Doku in node_modules/next/dist/docs/ lesen.

LEITPLANKEN
- Wahrheit: Nichts erfinden. Keine Orte zu Fotos ohne Bestätigung durch Deniz, keine Ausstellung, keine Bewertungen, keine Projekte. Zahlen und Zusagen nur aus dem Faktenblatt in _werkstatt/KERN.md und aus bestätigten Einträgen in KONTEXT.md Abschnitt 13; neue Fakten trägst du dort mit Datum und Quelle ein. Ortsseiten unterscheiden sich nur durch echte Angaben, nicht durch getauschte Ortsnamen. Suchvolumen und Positionen nennst du nur mit Quelle und Datum.
- Hausregeln für Texte:
  - Sie-Anrede.
  - Kein Gedankenstrich und kein „ - “ in Texten, Titeln, Descriptions und Alt-Texten.
  - Floskelliste beachten.
  - Titel 45 bis 58 Zeichen mit „Tezgel“; Descriptions 120 bis 155 Zeichen ohne „&“, „!“ und „…“.
  - Alt-Texte höchstens 125 Zeichen und nur, was zu sehen ist.
  - Eine H1 je Seite.
  Titel, Descriptions, Alt-Texte und Seitentexte änderst du direkt im Code, sobald Umut den Plan freigegeben hat; _werkstatt/TEXTVORSCHLAEGE.md bleibt unberührt.
- Freigaben: Nur nach ausdrücklicher Freigabe durch Umut ändern sich:
  - die H1 von / („Perfektion auf jedem Quadratmeter.“) und von /bad/badsanierung („Ihr neues Traumbad zum Festpreis.“);
  - bestehende Adressen (entfernen, umleiten, noindex);
  - Pflichtfelder, Einwilligung, Empfänger und Geschäftslogik der Formulare sowie die Schnittstelle /api/anfrage;
  - Firmendaten (src/config/company.js);
  - Bewertungszahlen und der Wortlaut der Kundenstimmen;
  - Rechtstexte, Cookie-Einwilligung und Tracking, das Logo.
  Einwilligung, Datenschutzhinweise und Pflichtfelder der Formulare sowie Rechtstexte zusätzlich nur nach Rechtsprüfung (M-11); für K01 und K02 genügt Umuts Zustimmung zu S10. Wetzlar verlässt Titel und Description der Startseite und der Übersichtsseiten erst im selben Push wie die neue Wetzlar-Seite (P3); früher nur mit Umuts Freigabe. Die Pakete P2 bis P8 setzt du erst nach Umuts Zustimmung zum Plan um.
- Git:
  - Arbeite auf dem Branch seo/lokal von main.
  - Push auf main, auch per Merge eines Pull Requests, nur wenn Umut im Chat für genau diesen Stand „live“ schreibt. Eine Freigabe gilt für genau einen Push, bis Umut S9 anders entscheidet; seine Antwort trägst du in KONTEXT.md Abschnitt 13 ein. Dauerfreigaben aus _werkstatt/ENTSCHEIDUNGEN.md gelten nicht für dich.
  - Vor jedem Push auf main führst du origin/main mit git merge in seo/lokal zusammen und lässt die Prüfkette auf genau diesem Stand laufen.
  - seo/lokal pushst du erst, wenn Umut S1 entschieden und geklärt hat, ob der Branch Vorschau-Builds auslösen darf (sonst in vercel.json unter git.deploymentEnabled "seo/lokal": false).
  - Kein Force-Push, kein Rebase, kein Reset über fremde Arbeit, kein Löschen von Branches.
- Werkstatt:
  - Der WERKSTATT-Block in CLAUDE.md gilt nicht für dich, auch nicht nach einer Kontextverdichtung. Nach jeder Verdichtung, jedem Limit und jeder neuen Sitzung liest du zuerst docs/seo/STARTPROMPT.md und KONTEXT.md Abschnitt 13. _werkstatt/AUFTRAG.md, STATUS.md, PRUEFPUNKT.md und KONTINGENT.md sind nie dein Auftrag.
  - Du startest oder setzt keine Werkstatt-Workflows fort, pushst nie auf claude/tezgel-website-redesign-iqxt8z und schreibst nie in die Werkstatt-Sitzung oder ihre Dateien. Musst du der Werkstatt etwas mitteilen, bittest du Umut darum.
  - In _werkstatt/ legst du nur im Bildordner neue-bilder-2026-10-31/ neue Dateien an und pflegst dort Inventar und projekte.md. Liegt deine Sitzung doch unter ~/Downloads, gilt die dortige CLAUDE.md (Coday-Mediapipeline) für dieses Projekt nicht; den Ordner ~/Downloads/Neue Bilder Tezgel öffnest und änderst du nicht.
- Außenwirkung:
  - tezgel.de und fremde Websites nur lesend und höchstens eine Anfrage pro Sekunde. Keine kostenpflichtigen Dienste.
  - Keine E-Mails, Nachrichten, Einträge oder Änderungen bei Google, Verzeichnissen, STARK, Kunden oder anderen Dritten; für Paket P7 schreibst du Umut eine Liste.
  - Kein Aufruf von /api/anfrage oder /api/indexnow, kein npm run indexnow ohne Freigabe.
  - Einstellungen und Plugins von Claude Code änderst du nicht.
  - Eigene Arbeitsdateien legst du unter docs/seo/arbeit/ nur ab, wenn sie öffentlich sein dürfen (das Repo ist öffentlich), sonst außerhalb des Repos.
- Daten: Zugangsdaten nie anfassen oder anzeigen. KONTEXT.md, Inventar und projekte.md sind öffentlich: Orte, Stadtteile und Projekte zu Fotos trägst du dort nur ein, wenn Deniz die Nennung erlaubt hat; nicht freigegebene Angaben und Kundendaten bleiben außerhalb des Repos.
- Prüfkette vor jedem Commit, der live gehen soll: npm run typecheck, npm run lint, npm test, npm run build, bei Schemaänderungen npm run qa:graph. Die GitHub-CI prüft bei einem Push auf main gar nichts. Prüfungen nie abschwächen; eine gewollte Änderung passt die Erwartung im Test mit Begründung an.

ERSTE SCHRITTE
1. Prüfe Node 24 (node -v), führe npm ci aus und lass die Prüfkette auf dem Ausgangsstand laufen. Das Ergebnis trägst du in KONTEXT.md Abschnitt 13 ein.
2. Prüfe die Branch-Lage:
   git fetch origin
   git rev-list --left-right --count origin/main...origin/claude/tezgel-website-redesign-iqxt8z
   (die rechte Zahl ist der Vorsprung der Werkstatt)
   git diff --name-only origin/main...origin/claude/tezgel-website-redesign-iqxt8z -- . ':(exclude)_werkstatt'
   Die Dateiliste ist maßgeblich, nicht der Auszug in KONTEXT.md Abschnitt 3. Was darin steht, änderst du erst nach dem Merge der Werkstatt oder nach einer Dateisperre, die Umut dir bestätigt hat. Einzige Ausnahme vor dem Merge: die Meta-Zeilen (titel, beschreibung) in src/inhalte/*.ts für P2, als eigener Commit ohne weitere Änderung dieser Dateien.
3. Schreib Umut hier im Chat EINE kurze Nachricht. Sie enthält die Entscheidungen S1 bis S10 und die weiteren Fragen aus KONTEXT.md Abschnitt 12 (Haak, Maps- oder CID-Link des Profils, Vorschau-Builds, Fragen an Deniz), jeweils mit deiner Empfehlung. Warte nicht untätig: Beginne lokal auf seo/lokal mit Paket P1:
   - T01 robots.txt;
   - T02 Product-Sterne entfernen, mit scripts/qa/check-graph.mjs und dem priceValidUntil in src/lib/schema.ts;
   - T03 Wikidata-IDs;
   - T04 zweites LocalBusiness durch Service ersetzen;
   - T12 /api/indexnow ohne Secret mit 403.
   T05 erst, wenn Umut den Profil-Link nennt; den Link ermittelst du nie selbst (Verwechslungsgefahr mit dem Betrieb Özcan Tezgel). K01 und K02 erst nach S10.
4. Lege Umut einen Plan vor:
   - Suchbegriff-Cluster je Zielseite (KONTEXT.md Abschnitt 6);
   - eine Tabelle „Titel und Description alt und neu“ für die wichtigsten Seiten;
   - die Reihenfolge der Pakete P2 bis P8.
   Startseite und Übersichtsseiten geben Wetzlar erst im selben Push ab, mit dem die neue Wetzlar-Seite (P3) live geht. P2 bis P8 setzt du erst nach Umuts Zustimmung um.
5. Pro Paket: Änderungen, grüne Prüfkette, kurzer Bericht (was geändert, Titel alt und neu, was offen) und ein Eintrag in KONTEXT.md Abschnitt 13.

BILDER
Die Originale liegen bewusst im öffentlichen Repo unter _werkstatt/bilder/neue-bilder-2026-10-31/ (nb-001.jpg bis nb-127.jpg). Sie bleiben unverändert: nicht verschieben, umbenennen, überschreiben, zuschneiden, keine Metadaten schreiben. Webfassungen erzeugst du mit node _werkstatt/werkzeuge/bilder.mjs --auftrag <json> --ziel "$SCRATCH/seo-bilder" außerhalb des Repos und kopierst nur <raum>/<name>.jpg nach public/images/arbeiten/<raum>/ (KONTEXT.md Abschnitt 8); für T13 nach Umuts Zustimmung auch die Breitenvarianten <name>-<breite>.jpg, bilder.json nie. Alt-Entwürfe und Dateinamen im Inventar sind Vorschläge; prüfe sie gegen das Webbild. Ohne Bestätigung durch Deniz kommt keine Stadt an ein Foto. Bilder mit Datenschutzrisiko „hoch“, die Gewerbeanlage (Baustelle P09 in projekte.md) und die Mosaike nur mit Freigabe.

BERICHTE
Deutsch, kurz, mit Dateipfaden. Fakten und Vermutungen trennen. Am Ende immer: offene Fragen und der nächste Schritt.
```
