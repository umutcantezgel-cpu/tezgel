GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/texte/bad.md` (neu)
- Arbeitsnotiz im Schreibrecht, kein Bericht: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-TEXT-01/notizen.md`
- Nicht committet, nicht gepusht.

WAS UND WARUM
1. Worum es geht: H1 „Aus Ihrem alten Bad wird ein neues, das Sie gern nutzen.“, Vorspann mit bodengleiche Dusche, Hauptknopf „Termin vor Ort anfragen“ → `/kontakt`, Bild `bad-einstieg`.
2. Ihre Lage: Einstieg in die Wanne und alte Fliesen; fünf Wege als Links zu `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/bad/fliesen`, `/bad/bad-aus-einer-hand`, `/bad/musterbaeder`.
3. Was wir tun: vier Schritte (Untergrund, Gefälle, Abdichtung, Rutschhemmung); großer Moment `schichten` mit fünf Schichten von Untergrund bis Fuge, je höchstens 12 Wörter; Absatz zu DIN 18534 und Handwerkskammer.
4. So läuft es ab: drei Schritte (Termin, Festpreisangebot, Übergabe); Zuschuss-Hinweis mit Link `/foerderung`.
5. Beleg: Fotos `bad-beleg-1` bis `-4` mit Unterschriften nur zu Sichtbarem; Stimme `peter-p` wörtlich; Link `/referenzen`.
6. Nächster Schritt: ein Satz, Hauptknopf → `/kontakt` wie in Abschnitt 1, Hilfen `/bad/badanfrage` und `/bad/projekt-check`.

FAKTEN
- Zahl 2019 und DIN 18534: F-15 (Abdichtung nach DIN 18534 als Standard seit 2019).
- Zahl 2008: F-06 (Eintragung 2008), F-05 (Handwerkskammer Wiesbaden).
- Zahlen 10 und 11: F-22 (Rutschhemmung R10 und R11 je nach Raum).
- Zahl 4.180 €: F-23 und F-25 (Pflegekasse bis 4.180 € je Person, barrierefreier Umbau, Pflegegrad).
- Zusage Termin vor Ort kostenfrei: F-12.
- Zusage Festpreisangebot: K-015, Abschnitt „Versprechen mit rechtlicher Bindung“, sinngleich.
- Weitere Fakten im Text: F-11 (drei Schritte), F-13 (fester Ansprechpartner), F-17 (Staubschutz, besenreine Übergabe), F-02 (Inhaber), F-09 (Aßlar, Wetzlar), F-04 (Telefon über COMPANY_DATA).
- Das Gefälle im Duschboden ist nicht in K-015 belegt, siehe OFFENE FRAGEN.

PRÜFUNG UND ERGEBNIS
Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/bad.md`, Exit 0
```
_werkstatt/texte/bad.md · GRÜN · Stücke 40 · Sätze 54 · Flesch 75.8 · Satz Ø 7.9
  ok  Titel höchstens 58 Zeichen
  ok  Beschreibung 120 bis 155 Zeichen
  ok  kein Satz über 25 Wörter
  ok  mittlere Satzlänge höchstens 14 Wörter
  ok  Flesch nach Amstad mindestens 60 (erzaehl)
  ok  Absätze höchstens 4 Sätze
  ok  keine Gedankenstriche
  ok  keine Bindestrichwörter außerhalb der Liste K-010-B
  ok  keine Floskeln K-010-F
  ok  Fachwort-Kennungen im Glossar
  ok  Glossarwort beim ersten Vorkommen als Fachwort
  ok  Bild- und Stimmenkennungen bekannt
  Zahlen im Text (gegen K-015 prüfen): 10 · 11 · 2019 · 18534 · 2008 · 4.180
```
Länge: etwa 600 Wörter Seitentext ohne Meta.
Lesedurchgang als P1: Fachwörter beim ersten Vorkommen markiert, Wiederholungen zwischen den Abschnitten entfernt.
Selbstprüfung git: vorher leer, nachher ist `_werkstatt/texte/bad.md` die einzige Änderung von mir. Weitere Einträge stammen nicht aus diesem Paket.

GEMEINSAME DATEIEN
- Keine Änderung nötig. Alle verwendeten Glossarwörter stehen in `_werkstatt/regeln/glossar.json`.
- Zu melden, nicht behoben: Das Muster verlinkt `/referenzen?raum=…`. Einen `raum`-Parameter finde ich in `src/app/(bestand)/referenzen/page.jsx` nicht. Der Text nutzt deshalb nur `/referenzen`.

OFFENE FRAGEN
1. Gefälle im Duschboden (Abschnitt 3, Punkt 2): steht im Muster und im Grundriss Premium (`src/app/(bestand)/bad/page.jsx`), ist in K-015 aber nur für Balkon belegt (F-21). Bitte bestätigen oder streichen.
2. Badplaner `/bad/badplaner`: war Karte im Bestand, steht nicht in den Auftragslinks und fehlt im Text. Als Hilfe aufnehmen?
3. Nicht übernommen, weil nicht in K-015: Musterbäder 4,6 bis 15,9 m², Kategorien Basic, Premium und Luxus, Markenkomponenten, „Komplettbad schlüsselfertig“, „Alle Gewerke koordiniert“, „Staubschutz-Garantie“ und „garantierter Festpreis“. Im Text stehen Zusagen nur sinngleich.
4. Suchbegriffe „Walk-In Duschen“ und „XXL-Fliesen“ aus E0 sind nach K-010 durch „bodengleiche Dusche“ und „große Fliesen“ ersetzt. „Fachbetrieb“ steht nicht wörtlich im Text. Bitte bestätigen.
5. Stimme: `peter-p` gewählt (Thema Bad, Google). Alternativen: `elke-s`, `k-d`.

=== ENDE E3-TEXT-01 · BEREIT ZUR RÜCKGABE ===
