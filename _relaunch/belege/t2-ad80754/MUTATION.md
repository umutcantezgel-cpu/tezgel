# Mutationsprobe · Kern-Ansichten auf `/` · Kandidat ad80754-k (11.10.2026)

Kopie `reinraum-ad80754-m` (aus `-k`), Port 4313. Neun Mutationen gleichzeitig, je eine in einer anderen Datei (Skript `scratchpad/mutationen-ad80754.py`, jede Ersetzung mit Trefferzahlprüfung). Danach Build, dann die Specs Hero, Preisrechner, Express-Funnel, Einwilligung, Kontaktwege und Navigation, mobil und Desktop.

Ergebnis: 150 grün, 8 übersprungen, 50 rot. **Jede Mutation macht mindestens einen Fall rot.** Rot sind nur Fälle auf `/` mit dem passenden Bezug; die Bestandsseiten blieben grün.

| Mutation | Datei | rot (Auswahl) |
|---|---|---|
| K1 F-01 Telefonfeld übernimmt Eingabe nicht | `formulare/HeroKontakt.tsx` | Hero „gültig: sendet …“, „Balkon & Terrasse …“, echte Route (je mobil + Desktop) |
| K2 F-02 Datenschutz-Haken bleibt aus | `formulare/b/PreisrechnerAnsicht.tsx` | Preisrechner „Vorauswahl Bad …“, „anderes Gewerk …“, „Name nur aus Leerzeichen“, echte Route |
| K3 F-03 „Weiter“ zu Schritt 3 bleibt auf 2 | `formulare/b/AnfrageFunnelAnsicht.tsx` | Funnel: Schritte vor/zurück, Pflichtfelder, Telefon < 6, E-Mail, WhatsApp, Gutfall, Serverfehler, echte Route |
| K4 F-11 „Alle ablehnen“ ruft Annehmen (beide Ebenen) | `einwilligung/Banner.tsx` | „Alle ablehnen: speichert Ablehnung …“, Widerruf über den Fußlink |
| K5 F-12 „Karte laden“ öffnet nur Einstellungen | `einwilligung/KartenPlatzhalter.tsx` | „/: Karte laden & zustimmen im Servicegebiet …“ |
| K6 F-15 Telefon der Leiste falsch | `fuss/UntereLeiste.tsx` | „Mobil-Leiste: Anrufen zeigt auf die Festnetznummer“, „/: alle Telefonlinks …“ (mobil) |
| K7 F-10 WhatsApp-Kanal falsche Nummer | `fuss/WhatsAppKanal.tsx` | „/: alle WhatsApp-Links … zeigen auf die Firmennummer“ |
| K8 F-13 Mobilmenü-Schalter zielt ins Leere | `kopf-b/Mobilmenue.tsx` | mobil: „Schalter öffnet das Menü …“, „Kategorie aufklappen …“, V-06 ohne JavaScript |
| K9 F-19 Karussell „Nächste“ blättert zurück | `start/vertrauen/Karussell.tsx` | „‚Nächste‘ blättert vor …“ |

Hinweis: Die erste Fassung von K9 (`blaettern(0)`) scheiterte an der Typprüfung des Builds; ersetzt durch `blaettern(-1)`.
