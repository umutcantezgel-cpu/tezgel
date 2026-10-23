# E3-BAU-03 · Rückgabe (Baumeister, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/leistungen/[id]/page.jsx`: Seitenkörper als Erzählansicht. Datenblöcke, `generateStaticParams`, Metadaten und JSON-LD unverändert. Kein `"use client"`, da keine Hooks und keine Ereignis-Handler.
- `_werkstatt/pakete/E3-BAU-03.rueckgabe.md`

Kein Commit, Push, Build oder Serverstart durch mich. Der Stand steht bereits als „ZWISCHENSTAND“ in den Commits 471889f und e251789 (nicht von mir ausgelöst).

## WAS UND WARUM
- Einstieg (`art="erzaehl"`): Etikettzeile mit Rücklink „Zurück zur Leistungsübersicht“, Fugenkreuz, „Fachgewerk · Fliesenverlegung Tezgel“. Danach H1, Vorspann, Knöpfe „Aufmaß anfordern“ (Anker `#express-anfrage`) und „WhatsApp Direkt“ (Markenlogo). Rechts der Verlegeplan der Leistung (`plan={service.id}`, `ohneAchse`).
- Leitachse über alle Abschnitte, jeder Abschnitt mit Fugenkreuz am Lot.
- Spezialisierungen als Feldraster (3 oder 4 Spalten), Fugenkreuz statt Icon-Kachel.
- Fachkompetenz: Kurzbeschreibung als Vorspann, Merkmale als Fugenkreuz-Liste (zwei Spalten ab `lg`), „Warum Fachqualität …“ als Hinweis.
- Weitere Gewerke als Feldraster, je Feld ein Link. Region als Städteregister aller 13 Orte.
- Direktkontakt (vormals Seitenleiste): Telefon, „WhatsApp Chat“, „Kostenfreies Aufmaß buchen“, Leitsatz, Reihenfolge wie im Bestand.
- Projektanfrage mit Rechner, Fragen (seitlich), Express-Anfrage mit Funnel (`id="express-anfrage"` erhalten), FinalCTA unverändert.
- Entfallen: Glas- und Keramikklassen, Ambient-Glows, Icon-Kacheln, Schatten, Verläufe, Hover-Versatz, Pill-Badges, ungenutzter `React`-Import.
- Neue IDs nur für `aria-labelledby`: `spezialisierung-heading`, `fachkompetenz-heading`, `weitere-heading`, `region-heading`, `direktkontakt-heading`, `projekt-heading`, `faq-heading`, `anfrage-heading`.
- Kein Auftritt, kein großer Moment, keine Bewegung.

Mikrotexte alt → neu (Wortlaut gleich, nur die Form):
- Badge „Fachgewerk · …“ → Etikett.
- Eyebrows „Direktkontakt“, „Individuelle Anfrage“, „Transparenz & Ratgeber“, „Express-Aufmaß“ → Etiketten.
- Sprechblasen-Icon bei „WhatsApp Direkt“ und „WhatsApp Chat“ → WhatsApp-Markenlogo (dekorativ).
- Kein Text entfernt, kein Text ergänzt.

## GEMEINSAME DATEIEN
`_werkstatt/werkzeuge/test-zuordnung.json`: Ohne Eintrag prüft Prüfstufe A diese Seite nicht auf Funktionstests („ÜBERSPRUNGEN“). Einfügen vor dem ALLE-Eintrag:

```
{ "muster": "leistungen/\\[id\\]/page", "specs": ["funktion-express-funnel.spec.mjs", "funktion-preisrechner.spec.mjs", "funktion-navigation.spec.mjs", "funktion-kontaktwege.spec.mjs"] },
```

Sonst keine Änderung nötig.

## PRÜFUNG UND ERGEBNIS
- umbau.mjs: Trockenlauf, dann `--schreiben`. Die 5 ZU_PRUEFEN von Hand gelöst (Icon-Kachel entfällt, WhatsApp-Block ohne Flächenton). Danach Struktur von Hand neu.
- textprobe gegen HEAD: ENTFERNT 6 (T: Direktkontakt, Individuelle Anfrage, Projekt anfragen & Situation schildern, Transparenz & Ratgeber, Express-Aufmaß, Jetzt unverbindlich anfragen). Alle sechs stehen wortgleich als Prop (`etikett=`/`titel=`) wieder. HINZU nur Icon-Namen und diese Props.
- bezeichner: keine freien Namen. werte.mjs: 0 Befunde. eslint: 0 Fehler, 0 Warnungen.
- Prüfstufe A auf der Endfassung: GRÜN. tsc 0 Fehler in eigenen Dateien. Bilder 390 und 1440: HTTP 200, Konsole 0, Überlauf 0, Überlappung 0. Textvergleich GRÜN, entfernt 0. Funktionstests ÜBERSPRUNGEN (siehe GEMEINSAME DATEIEN).
- Manuell gegen 4320 (Testwerkzeuge, `--workers=1`): funktion-express-funnel, funktion-preisrechner, funktion-navigation, funktion-kontaktwege: 116 bestanden, 0 fehlgeschlagen, 8 vorab übersprungen (projektabhängige Testdefinition).
- axe-core auf /leistungen/bad, m390 und d1440: 0 Verstöße.
- GET 4320: /leistungen/bad, /wohnen, /aussen, /untergrund je HTTP 200, eine H1, ein `#express-anfrage`, kein „undefined“, 13 Ortslinks, Verlegepläne ohne Achse.
- Rot: je Bildschirm eine Laserachse; Verlegepläne ohne Achse.

## BILDBELEGE
Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-03/`:
- Ansichten: `bilder/leistungen__bad/m390.jpg`, `bilder/leistungen__bad/d1440.jpg`
- Ganze Seite: `bilder-voll/m390-voll.jpg` (390×16111), `bilder-voll/d1440-voll.jpg` (1440×9854)
- Ausschnitte: `schnitte/m-00.jpg` bis `m-08.jpg`, `schnitte/d-00.jpg` bis `d-05.jpg`, `schnitte/direktkontakt-d1440.jpg`

## OFFENE FRAGEN
1. Das Briefing nennt „/leistungen/fliesen“ als Prüfansicht. Das ist keine Leistungs-ID (bad, wohnen, aussen, untergrund); die Seite antwortet mit 404. Bitte bestätigen, ob das gewollt ist.
2. Der Rücklink steht in der Etikettzeile, weil der Einstieg oben (`pt-32`) keinen Platz über der H1 lässt. Freigabe?
3. Textvergleich: Abweichungen außerhalb meiner Datei, nicht bearbeitet: „Per WhatsApp schreiben“ (`FinalCTA.tsx`), Kopf und Fußzeile. Gate GRÜN, da nichts entfernt wurde.
4. Abschnittsabstand: Der Baustein `Abschnitt` nutzt `py-16`/`lg:py-24`, das Briefing nennt `py-24`/`lg:py-32`. Wie in E3-BAU-02 offen.
5. Platz für den großen Moment: der Verlegeplan rechts im Einstieg. Dort ist keine Bewegung gesetzt.
6. Unterseiten `/leistungen/[id]/[stadt]`: nicht Teil dieses Pakets, unverändert.
