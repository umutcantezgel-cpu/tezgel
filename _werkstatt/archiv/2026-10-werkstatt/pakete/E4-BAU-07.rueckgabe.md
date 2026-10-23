# E4-BAU-07 · Rückgabe (Baumeister, ARBEITSMODELL)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/flur-diele/page.jsx`
- `src/app/(bestand)/fliesen/fugensanierung/page.jsx`

Nicht berührt: die bereits vorher geänderten Dateien `bad/musterbaeder/…`, `fliesen/festpreisangebot`, `fliesen/fliesenarten` (fremde Arbeit). Kein Commit, kein Push.

## WAS UND WARUM
- **Beide Seiten:** Lucide-Icons und Icon-Kacheln entfallen (eine Icon-Familie), ebenso Glow, Verläufe, Schatten, `eyebrow`/`btn-*`/`glass-*`/`ceramic-*`. Einstieg `art="erzaehl"`, H1 an der Laserachse, Knöpfe als `Knopf`, Randspalte als Planblatt mit `interaktiv`. Abschnitte in `Leitachse` mit `leitachse spaet`, Bausteinfolge wechselt (Feldraster, Band, Merkliste, Feldpaar, Schrittfolge, Hinweis).
- **flur-diele:** Planblatt „Flur & Diele fliesen lassen“, Plan `wohnen`. Anforderungen als Feldraster (fünfter Punkt über zwei Spalten, keine Restzelle). Format als seitlicher Band-Abschnitt; die Sauberlaufzone steht darunter statt in Parallelspalte. Übergänge als Merkliste, Feldpaar Rutschhemmung/offener Wohnbereich, Ratgeber als Merkliste. Konfigurator per `next/dynamic` nachgeladen, `area="flur"` unverändert, mit `Rueckfrage` daneben. Die Reihenfolge Qualitätsversprechen → Konfigurator bleibt wie im Bestand; der Konfigurator steht deshalb in eigenem Leitachsen-Segment.
- **fugensanierung:** Planblatt „Fugensanierung & Silikonfugen erneuern“, Plan `fugen`. Grundlagen seitlich, Warnzeichen als Feldraster 4, Arbeitsschritte als senkrechte `Schrittfolge` (waagrecht ergäbe bei fünf Schritten eine Restzelle), Nummern bleiben `aria-hidden` wie im Bestand. Zement/Material als Feldpaar, Abdichtung mit eigener Box (Icon `hinweis`), Kundenstimme als `Abschnitt aria-label="Kundenstimme"` mit `figure`, Ratgeber als Merkliste.
- **IDs:** alle bestehenden IDs bleiben, Überschriften laufen über `titelId`. Im gerenderten DOM geprüft (H1, H2, `aria-labelledby`).
- **Mikrotext alt → neu:** kein bestehender Wortlaut geändert. Neu hinzu, durch Bausteine bzw. Referenz vorgegeben: Planblatt-Felder (Blatt, Verband, Betrieb, Inhaber, Kammer, Betrieb seit); `Rueckfrage` (Ansprechpartner, Telefon, Mobil & WhatsApp, E-Mail, Sitz); Ladehinweis „Anfrageformular wird geladen...“ (nur flur).

## GEMEINSAME DATEIEN
Keine Änderung nötig. Wünsche, nicht ausgeführt:
1. `src/components/kern/` Baustein „Kundenstimme“ (Anriss, Quelle in Mono). Im Briefing genannt, im Ordner nicht vorhanden. Fugensanierung baut ihn als Abschnitt mit `figure`.
2. `kern/Hinweis`: ohne `titel` wird „Warnung: “ als sr-only-Text vorangestellt. Deshalb ist die Abdichtungsbox eigen gebaut. Wunsch: Option ohne sr-only-Präfix, wenn die Überschrift im Kind steht.

## PRÜFUNG UND ERGEBNIS
- **Prüfstufe A** (`pruefe-a.sh E4-BAU-07`): GRÜN, Exit 0.
  - tsc: 0 Fehler in eigenen Dateien, 0 übrige.
  - eslint: 0 Fehler, 0 Warnungen.
  - Funktionstests navigation + kontaktwege: 72 erwartet, 0 unerwartet.
  - Bilder m390/d1440: HTTP 200, Konsole 0, Überlauf 0, Überlappung 0.
  - Textvergleich gegen e0: entfernt 0, unerlaubt entfernt 0.
- **Zusatz:** `funktion-konfigurator.spec.mjs` (flur lädt den Funnel jetzt nachgeladen): 46 erwartet, 0 unerwartet, 4 übersprungen (bekannte).
- `werte.mjs`: 0 Befunde. `bezeichner`: keine freien Namen.
- Sichtwort-Vergleich alt (Produktion 4310) gegen neu (4320): nichts entfallen, nur die Zugaben oben. Die Konfigurator-Abweichung im Vergleich ist Streaming-Reihenfolge der Roh-HTML, nicht Text.

## BILDBELEGE
Unter `…/scratchpad/E4-BAU-07/`:
- Ausschnitt: `bilder/fliesen__flur-diele/{m390,d1440}.jpg`, `bilder/fliesen__fugensanierung/{m390,d1440}.jpg`
- Ganze Seite: `voll/fliesen__flur-diele/{m390,d1440}-voll.jpg`, `voll/fliesen__fugensanierung/{m390,d1440}-voll.jpg`

Geprüft: keine leere Spalte, keine grauen Restzellen, keine Überlappung.

## OFFENE FRAGEN
1. Abschluss (`FinalCTA`) fehlt auf beiden Seiten. Die Familienreferenz hat ihn. Nicht ergänzt, weil es ein neues großes Element wäre. Vorschlag an den Orchestrator.
2. Der Einstieg hat keine Merkmalsliste im Bestand. Die vorgesehene Fugenkreuz-Liste `merkmale` wurde deshalb nicht erfunden.
3. Sauberlaufzone: Layoutänderung (Parallelspalte → Unterblock im Band), Lesefolge gleich. Bitte bestätigen.
4. Neue Mikrotexte der Bausteine (Rueckfrage, Planblatt-Felder, Ladehinweis) sind eingebaut. Bitte bestätigen oder streichen.
