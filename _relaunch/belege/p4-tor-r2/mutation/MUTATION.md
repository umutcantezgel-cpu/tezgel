# Mutationsprobe P4-Tor Runde 2 · P6 F-12 einzeln · Vorschau c5ef582-v

**Anlass:** P4-GEG M1/N4. In Runde 1 liefen sechs Mutationen gleichzeitig, und der Kern-Fall F-12 `/standorte` mobil war noch mit einer Bestandsbegründung übersprungen. Seit M1 läuft er im Kern. Zu zeigen ist, dass er eine kaputte Karteneinwilligung erkennt.

**Vorgehen:**
- Kopie `reinraum-c5ef582-m` aus `-v`, darin **nur** P6 (`mutation-p6.py`, Trefferzahl geprüft): In `KartenPlatzhalter.tsx` wird `onLaden={handleAccept}` zu `onLaden={zuDenEinstellungen}`. „Karte laden & zustimmen“ öffnet damit nur noch die Einstellungen.
- Build, Start auf 4313.
- Lauf: `funktion-einwilligung.spec.mjs`, beide Projekte, `RELAUNCH_FASSUNG=vorschau`, 1 Worker.

**Ergebnis (`suite-mutiert-p6.json`): 42 grün, 6 rot.** Rot sind genau die Kartenfälle:

| Fall | mobil | Desktop |
|---|---|---|
| `/standorte`: „Karte laden & zustimmen“ setzt Marketing-Einwilligung und lädt die Karte | **rot** (neu seit M1) | rot |
| `/kontakt`: dasselbe | rot | rot |
| `/`: dasselbe im Servicegebiet | rot | rot |

Alle übrigen Einwilligungsfälle (Banner, Ablehnen/Annehmen, Einstellungen, Widerruf, Fußlink) bleiben grün; die Mutation wirkt also nur dort, wo sie soll.

**Urteil: P6 erkannt, auch mobil auf `/standorte`.** Die Lücke aus M1 ist geschlossen.
