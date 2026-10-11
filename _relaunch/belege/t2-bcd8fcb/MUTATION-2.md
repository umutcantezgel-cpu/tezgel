# Mutationsprobe 2 · nach P3-14-GEG / P3-14e · Kandidat bf63dbe-k (11.10.2026)

Kopie `reinraum-bf63dbe-m`, Port 4313. Elf Mutationen gleichzeitig (Skript `mutationen-m2.py`), je Ersetzung mit Soll-Trefferzahl. Specs: Hero, Einwilligung, Kontaktwege, Navigation, mobil und Desktop. Ergebnis: 116 grün, 12 übersprungen, 28 rot. **11/11 erkannt.**

| Mutation | rot (alle Fälle) |
|---|---|
| K10 Kern-Kopf ohne `data-kopf` | V-06 „Menü-Schalter … ohne JavaScript“ (mobil + Desktop) – jetzt rot statt übersprungen |
| K11 Kern-Menüschalter auch ab xl | Desktop: „/: … Kern ab xl ohne Menü-Schalter“, „/: Schalter öffnet …“, „/: Kategorie aufklappen …“ |
| K12 FAQ-Eintrag immer offen | „Startseite: Akkordeon-Frage klappt auf und zu …“ (mobil + Desktop) |
| K13 Platzhalter „Cookie-Einstellungen“ stimmt zu | „/: ‚Cookie-Einstellungen‘ im Kartenplatzhalter …“ (mobil + Desktop) |
| K14 Hero-Vorhaben bleibt „bad“ | „Vorhaben ‚Balkon & Terrasse‘ landet als projectType …“ (mobil + Desktop) |
| K15 Kern-Kanal mit vorgetäuschtem Abzeichen | Desktop „Widget /: kein vorgetäuschtes Benachrichtigungs-Abzeichen“ |
| K16 Kern-Banner Marketing-Haken ohne Wirkung | „/: Einstellungen: ‚Auswahl speichern‘ …“ (mobil + Desktop) |
| B1 Bestand-Drawer-Schalter ohne Wirkung | „/leistungen: Schalter öffnet …“, „/leistungen: Kategorie aufklappen …“ (mobil + Desktop) |
| B2 Bestand-Banner „Alle ablehnen“ stimmt zu | „/kontakt: Alle ablehnen …“ (mobil + Desktop), „/standorte: Schild … ‚Alle ablehnen‘ entzieht …“ (mobil + Desktop) |
| B3 Bestand-Widget mit Abzeichen von Anfang an | „Widget /kontakt: kein vorgetäuschtes … Abzeichen“ (mobil + Desktop) |
| B4 `#cookie-settings` beim Laden ignoriert (gemeinsamer Hook) | „/: #cookie-settings …“ und „/kontakt: #cookie-settings …“ (mobil + Desktop) |

Vollständige Liste der roten Fälle: `mutation-2-rot.json`.
