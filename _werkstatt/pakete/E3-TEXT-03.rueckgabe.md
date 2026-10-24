GEÄNDERTE DATEIEN
- Neu: `/home/user/tezgel/_werkstatt/texte/leistungen.md`
- Arbeitsnotiz (nur Scratch): `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-TEXT-03/notizen.md`
- git status: der einzige neue Eintrag meiner Arbeit ist `_werkstatt/texte/leistungen.md`. Nichts committet, nichts gestasht.

WAS UND WARUM (Aufbau in sechs Zeilen)
1. Worum es geht: H1 „Alle Leistungen vom Fliesenleger aus Aßlar, Fliese für Fliese.“, Vorspann, Hauptknopf „Termin vor Ort anfragen“ → /kontakt, Anrufen. Kein Foto im Einstieg.
2. Ihre Lage: drei alltägliche Situationen (gesprungene Fliese, Wasser auf dem Balkon, altes Bad), dann „Den ersten Schritt gehen wir gemeinsam.“
3. Was wir tun: vier Bereiche mit Link auf /leistungen/bad, /leistungen/wohnen, /leistungen/aussen, /leistungen/untergrund. Kopfbilder leistungen-bad, -balkon, -untergrund; Böden und Wände ohne Foto. Großer Moment formatregler: kleine Fliese gegen große Fliese bis 120 × 260 cm.
4. So läuft es ab: drei Schritte im Wortlaut der Startseite.
5. Beleg: Eintragung seit 2008, eine Stimme (c-wolf, Badsanierung), Kennzeile, Link /referenzen.
6. Nächster Schritt: Rückrufsatz, Hauptknopf wie in Abschnitt 1, Hilfen als Textlinks (#kosten-rechner, #express-anfrage).

Umfang ca. 500 Wörter Seitentext.

FAKTEN
- 120 × 260 cm: F-20 (260 statt 278, M-06 offen)
- 2008: F-06; Handwerkskammer Wiesbaden: F-05
- 5,0 von 5 Sternen, 27 Bewertungen bei Google, Stand September 2026: F-10
- DIN 18534: F-15 und K-011
- Termin vor Ort kostenfrei: F-12
- Deniz Tezgel als fester Ansprechpartner von der Skizze bis zur Abnahme: F-13
- Drei Schritte: F-11
- Staubschutz, besenreine Übergabe: F-17
- Leistungen (Bad, Wohnräume, Küchen, Neubau, Balkon, Terrasse, Stelzlager, Naturstein, Untergrund, Abdichtung): F-08
- Einsatzgebiet Aßlar und Wetzlar: F-09
- Richtpreis und Anfrage in drei Schritten als Hilfen: F-02, F-03 (keine Zusage)
- Angebot mit festem Preis: M-07, sinngleich, nicht verschärft
- Rückruf „Deniz Tezgel ruft Sie zurück“ ohne Frist: K-015-Regel für neue Texte
- Telefon: F-04 über {{COMPANY_DATA.contact.phone}}

PRÜFUNG UND ERGEBNIS
Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/leistungen.md`

Ausgabe:
```
_werkstatt/texte/leistungen.md · GRÜN · Stücke 19 · Sätze 36 · Flesch 76.2 · Satz Ø 8.1
  ok Titel höchstens 58 Zeichen
  ok Beschreibung 120 bis 155 Zeichen
  ok kein Satz über 25 Wörter
  ok mittlere Satzlänge höchstens 14 Wörter
  ok Flesch nach Amstad mindestens 60 (erzaehl)
  ok Absätze höchstens 4 Sätze
  ok keine Gedankenstriche
  ok keine Bindestrichwörter außerhalb der Liste K-010-B
  ok keine Floskeln K-010-F
  ok Fachwort-Kennungen im Glossar
  ok Glossarwort beim ersten Vorkommen als Fachwort
  ok Bild- und Stimmenkennungen bekannt
  Zahlen im Text: 18534 · 120 · 260 · 2008 · 5,0 · 5 · 27 · 2026
```
Meta: Titel 57 Zeichen, Beschreibung 146 Zeichen.

GEMEINSAME DATEIEN (nur melden)
- `_werkstatt/adressen-e0.csv`, Zeile `/leistungen`, Spalte titel: `Fliesenleger Leistungen Wetzlar | Fliesenverlegung Tezgel`
- Spalte beschreibung: `Fliesenleger Leistungen in Aßlar und Wetzlar: Badsanierung, Böden, Balkon, Terrasse, Naturstein und Abdichtung. Der Termin vor Ort ist kostenfrei.`
- Spalte h1: `Alle Leistungen vom Fliesenleger aus Aßlar, Fliese für Fliese.`
- `src/app/(bestand)/leistungen/page.jsx`: Schema-Texte mit „XXL-Großformate“ und „Festpreis“; Knopf „Vor-Ort-Aufmaß vereinbaren“; H2 „Ihr verlässlicher Weg zum neuen Traumbelag“.
- `src/components/leistungen/Gewerk.tsx`: Etikett „Geprüfte Fachkompetenz“ hat keinen Beleg in K-015.
- `src/components/leistungen/Gewerke.tsx`: Wort „Fachgewerke“ (K-010 ersetzt es).
- `src/config/services.js`: „120 x 278 cm“ (K-015 F-20: 260 oder 278, M-06 offen).
- Glossar: keine fehlenden Glossarwörter für diese Seite.
- Kennungen bekannt: leistungen-bad, leistungen-balkon, leistungen-untergrund, c-wolf.

OFFENE FRAGEN
1. Formatregler: Der Auftrag nennt „60 × 60 cm“ für die kleine Fliese. Diese Zahl steht nicht in K-015. Der Text sagt „Kleine Fliese“ ohne Zahl. Soll die Zahl ins Faktenblatt?
2. „leichter zu putzen“ steht nicht in K-015 und fehlt im Text. Nur „weniger Fugen“ aus K-011 steht drin. Freigabe?
3. Der Suchbegriff „Festpreis“ fehlt wörtlich. Der Text sagt „Angebot mit festem Preis“. Bestätigen?
4. Bereichslinks: Auftrag und Bestand nutzen /leistungen/bad, /wohnen, /aussen, /untergrund. K-009 nennt /bad und /balkon-terrasse. Welcher Pfad gilt?
5. Bild leistungen-bad zeigt eine Badewanne, der Text spricht von der Dusche statt der Wanne. Bildwahl bestätigen?
6. Ohne Beleg im Bestand, deshalb nicht übernommen: Feinsteinzeug, Granit, Marmor, Schiefer, spielend leichte Pflege, Luxusoase, innovative Trockenverlegung, Frostschutz.

=== ENDE E3-TEXT-03 · BEREIT ZUR RÜCKGABE ===
