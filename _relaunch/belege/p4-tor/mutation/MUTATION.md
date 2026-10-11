# Mutationsprobe P4-Tor · Kern-Zweige der Hauptseiten-Entwürfe · Vorschau 1c6c9cd-v

Vorgehen: Kopie `reinraum-1c6c9cd-m` aus `-v` mit sechs Mutationen gleichzeitig, je eine in einer anderen Datei. Skript `mutationen.py`, jede Ersetzung mit Prüfung der Trefferzahl. Danach Build und Start auf Port 4313. Gelaufen sind die Specs Projekt-Check, Termin, Navigation, Kontaktwege, Express-Funnel und Einwilligung, beide Projekte, mit `RELAUNCH_FASSUNG=vorschau`.

Erster Lauf (`suite-mutiert.json`): 169 grün, 12 übersprungen, 55 rot. Rot wurden nur Fälle mit passendem Bezug; die Bestandsseiten blieben grün.

| Mutation | Datei | erkannt durch (Auswahl) |
|---|---|---|
| P1 F-05 Projekt-Check übernimmt den Sanierungsumfang nicht (`/bad`) | `formulare/c/ProjektCheckAnsicht.tsx` | Projekt-Check „/bad: Auswahl und Kontakt gehen als POST …“ und „/bad: WhatsApp-Knopf …“, je mobil und Desktop |
| P2 F-07 Kalender wählt immer den ersten Tag (`/kontakt`) | `formulare/e/TerminKalenderAnsicht.tsx` | **zunächst nicht erkannt** (siehe unten); nach der Verschärfung 8 Fälle „BookingCalendar (F-07) auf /kontakt#termin-buchen“ |
| P3 F-16 Blog-Suche übernimmt die Eingabe nicht (`/blog`) | `seiten/blog/Filter.tsx` (2 Stellen) | Navigation „Blog-Übersicht: Suche filtert Artikel …“ |
| P4 F-09 Festnetz im Kontaktblatt falsch (`/kontakt`) | `seiten/kontakt/Kontaktblatt.tsx` | Kontaktwege „/kontakt: alle Telefonlinks zeigen auf Festnetz oder Mobilnummer …“ |
| P5 F-03 Anfrage-Funnel bleibt auf Schritt 2 | `formulare/b/AnfrageFunnelAnsicht.tsx` | Express-Funnel auf `/kontakt`, `/#express-anfrage` und `/leistungen` (Gutfall je Ort), alle Schrittfälle |
| P6 F-12 „Karte laden“ öffnet nur die Einstellungen | `einwilligung/KartenPlatzhalter.tsx` | Einwilligung „/standorte, /kontakt, /: Karte laden & zustimmen …“ |

## Testlücke P2 und Verschärfung
Der Kern-Zweig von F-07 las das Datum aus der Überschrift von Schritt 2 und verglich die Nutzlast damit. Ob das der angeklickte Tag war, prüfte er nicht. Ein Kalender, der immer den ersten Tag nimmt, blieb deshalb grün.

Verschärfung in `tests/funktion-termin.spec.mjs` (`kalenderZuKontaktdaten`): Im Kern-Zweig muss das gewählte Datum dem Datum im Namen des angeklickten Tag-Knopfs entsprechen (+1 `expect`). Ergebnis nach der Verschärfung:
- Mutationskopie 4313: 8 rot (alle F-07 auf `/kontakt`, Kern), 18 grün
- Vorschau 4321: 26/26 grün
- Live 4337: 26/26 grün

**Ergebnis: 6/6 Mutationen erkannt.**
