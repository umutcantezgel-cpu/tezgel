# E2-PRUEF-T-2 · Rückgabe (Prüfer, Stufe 1, Kern v2)

## GEÄNDERTE DATEIEN
- `_werkstatt/belege/e0/texte-index.json` und `_werkstatt/belege/e0/texte/**`: neu erhoben gegen 4310 mit `texte.mjs --satz e0` (363 Dateien vorher und nachher).
- Diese Datei: `_werkstatt/pakete/E2-PRUEF-T-2.rueckgabe.md`.
- Scratch: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/` (Logs, JSON, Hilfsskripte).
- Nicht von mir, unangetastet: `_werkstatt/PLAN.md` (geändert), `_werkstatt/werkzeuge/test-zuordnung.json` (geändert), `_werkstatt/werkzeuge/tests/funktion-weiterleitung.spec.mjs` (neu), `src/components/legal/MapConsentGate.tsx`, `src/components/maps/{ContactPremiumMap,InteractiveMap,InteractiveServiceMap,LocalDominanceMap,ServiceMapWrapper}.tsx` (geändert), `_werkstatt/pakete/E2-PRUEF-T-2.md` (neu).

## WAS UND WARUM
1. Erreichbarkeit: 4310 und 4320 antworten je mit HTTP 200.
2. Wiederholbarkeit (4310; `/`, `/fliesen`, `/kontakt`; d1440, m390; Läufe t1 und t2): erste Logzeile `"seiten_mit_abweichung":0,"entfernt":0,"hinzu":0,"meta":0,"seo":0,"spannen_entfernt":0,"spannen_hinzu":0,"spannen_unerlaubt_entfernt":0,"sitemap_entfernt":0,"sitemap_hinzu":0,"robots_geaendert":false,"kaputte_links":0,"ergebnis":"GRÜN"}`. Summe: alle Werte 0. Quellen: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/t1-t2.log`, `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/t2/texte-vergleich-gegen-t1.json`.
3. Wortproben (`t1/texte/start.json`, d1440): Block main 2113 Wörter, header 330, footer 189. Erste 15 Wörter footer: HWK, Fachbetrieb, HWK, Wiesbaden, DIN, 18534, Verbundabdichtung, Staubschutz-Garantie, bei, bewohnten, Sanierungen, Festpreisgarantie, transparent, kalkuliert, Kostenfreies. Muster Kleinbuchstabe gefolgt von Großbuchstabe in main: 4 Treffer, alle „WhatsApp“ (Wortpositionen 44, 131, 1979, 2093). Zusatz: fliesen 2 Treffer, kontakt 4 Treffer, alle „WhatsApp“. Laut Auftraggeber Markenschreibweise.
4. Basis e0 (Grundmenge 121 Seiten × d1440, m390): Dateien vorher 363, nachher 363. Index `seiten` vorher 242, nachher 242. `sitemap_anzahl` 163. `kaputte_links` 0 (interne Ziele 168). Einträge mit `status` ≠ 200: 0. `git status --porcelain _werkstatt/belege/e0 | wc -l`: 364 (vorher 364). Log `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/e0.log`, letzte Zeile `EXIT=0`.
5. Probe Arbeitsstand (4320; `/`, `/fliesen`, `/kontakt`; d1440, m390; Vergleich gegen e0 mit `--erlaubt _werkstatt/texte-erlaubt.json`): erste Logzeile `{"seiten_mit_abweichung":242,"entfernt":98,"hinzu":202,"meta":0,"seo":0,"spannen_entfernt":148,"spannen_hinzu":182,"spannen_unerlaubt_entfernt":2,"sitemap_entfernt":0,"sitemap_hinzu":0,"robots_geaendert":false,"kaputte_links":0,"ergebnis":"ROT"}`. Summe: entfernt 98, hinzu 202, meta 0, seo 0, spannen_entfernt 148, spannen_hinzu 182, spannen_unerlaubt_entfernt 2.
   - Aufschlüsselung (main / footer, entfernt / hinzu): `/` und `/@m390`: 49 / 0 und 68 / 10. `/fliesen` und `/fliesen@m390`: 0 / 0 und 1 / 10. `/kontakt` und `/kontakt@m390`: 0 / 0 und 2 / 10.
   - Die 236 übrigen Indexschlüssel (Basis 242, Probe 6) tragen `fehlt: true`. Sie zählen in `seiten_mit_abweichung` (6 + 236 = 242), nicht in Zeilen- oder Spannenzahlen.
   - Regelgrund laut Werkzeug für ROT: entfernte Zeilen (98) und unerlaubt entfernte Wortspanne (2, je `/` und `/@m390`, main).
   - Entfernte Zeilen: vollständig in Anhang A (49 je Ansicht, auf `/` und `/@m390` identisch).
   - Spannen mit `erlaubt: false`: 184 (2 entfernt, 182 hinzugefügt). Erste 60 in Anhang B, Pfad für alle 184: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/probe/texte-vergleich-gegen-e0.json`, Abschnitt `seiten[*].spannen`.
   - Sitemap: entfernt 0, hinzu 0. robots unverändert. Kaputte Links 0 (interne Ziele 75).

## PRÜFUNG UND ERGEBNIS
- Schritte 1 bis 5 vollständig ausgeführt. Schritt 2 GRÜN mit 0 Spannen. Schritt 5 ROT (Zahlen wie oben).
- Stichproben nachgerechnet: entfernt 49 + 49 = 98 ✓. hinzu: main 68 + 68 + 1 + 1 + 2 + 2 = 142, footer 6 × 10 = 60, gesamt 202 ✓. spannen_entfernt: 68 + 68 + 3 + 3 + 3 + 3 = 148 ✓. erlaubt:false: 2 entfernt + 182 hinzugefügt = 184 ✓, spannen_hinzu 182 ✓.
- Schreibrechte und Grenzen eingehalten: geschrieben nur `_werkstatt/belege/e0/**`, Scratch und diese Datei. Git nur lesend. Keine POST-Anfragen, keine Werkzeugänderung, kein Server gestartet oder gestoppt.

## BILDBELEGE
- Keine.

## GEMEINSAME DATEIEN
- Keine gewünschten Änderungen.

## OFFENE FRAGEN
1. Schritt 5 ist ROT. Auf `/` und `/@m390` fehlen 49 Zeilen des Rezensionsblocks (Initialen, „Google Rezension“, Zitate, Zeile „27 verifizierte Google-Rezensionen“, siehe Anhang A). Der Auftraggeber nennt Banner und WhatsApp-Knopf als erwartete Änderungen. Ob der Rezensionsblock dazugehört, entscheidet der Orchestrator. Keine Deutung von mir.
2. Vergleichswerkzeug: Es legt den gesamten Basisindex (242 Schlüssel) gegen die Probe (3 Seiten, 6 Schlüssel). 236 Schlüssel erscheinen mit `fehlt: true` und treiben `seiten_mit_abweichung` auf 242. Ob das so gewollt ist, bitte prüfen. Werkzeug nicht geändert.
3. Wortlimit: Die Listen überschreiten 600 Wörter. Vollständige Zeilenliste in Anhang A, Spannen in Anhang B (erste 60 von 184) mit Pfad zur Vollliste. Bei Bedarf kürzen.
4. Schritt 3, „WhatsApp“: laut Auftraggeber geklärt, nicht offen.

---

## NACHTRAG (Vergleich Schritt 5 erneut, nach Ergänzung von `_werkstatt/texte-erlaubt.json`)

- Lauf: nur der Vergleich, ohne neuen `texte.mjs`-Lauf. Befehl: `node _werkstatt/werkzeuge/texte-vergleich.mjs e0 probe --vorher-ordner _werkstatt/belege/e0 --nachher-ordner /tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/probe --erlaubt _werkstatt/texte-erlaubt.json > /tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/probe2-vergleich.log`. Der Lauf hat `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/probe/texte-vergleich-gegen-e0.json` überschrieben (wie beauftragt).
- Erste Logzeile: `{"seiten_mit_abweichung":242,"entfernt":0,"hinzu":202,"meta":0,"seo":0,"spannen_entfernt":148,"spannen_hinzu":182,"spannen_unerlaubt_entfernt":0,"sitemap_entfernt":0,"sitemap_hinzu":0,"robots_geaendert":false,"kaputte_links":0,"ergebnis":"GRÜN"}`
- Summe: entfernt 0, hinzu 202, meta 0, seo 0, spannen_entfernt 148, spannen_hinzu 182, spannen_unerlaubt_entfernt 0.
- Je Probeschlüssel (nur die sechs Probeseiten; die 236 `fehlt`-Schlüssel sind nicht berichtet):
  - `/`, `/@m390`: unerlaubt entfernte Spannen 0 (main und footer). Entfernte Zeilen 0 (main und footer). Hinzugefügt unerlaubt (nur Zählung): main 67, footer 7.
  - `/fliesen`, `/fliesen@m390`: unerlaubt entfernte Spannen 0. Entfernte Zeilen 0. Hinzugefügt unerlaubt: main 1, footer 7.
  - `/kontakt`, `/kontakt@m390`: unerlaubt entfernte Spannen 0. Entfernte Zeilen 0. Hinzugefügt unerlaubt: main 2, footer 7.
- Befund zum früheren Stand: Die 49 entfernten Zeilen je `/` und `/@m390` (Anhang A) und die 2 unerlaubt entfernten Spannen sind jetzt durch die Erlaubtliste abgedeckt. Die Erlaubtliste hat 62 Einträge; gegenüber Git-HEAD sind 30 neu (Seite `*`, Teil `main_zeilen`, Vermerk „E2-ORCH-04 Kundenstimme … – TEXTVORSCHLAEGE“). Das Werkzeug gibt erlaubt entfernte Zeilen nicht mehr aus, daher zeigt der Nachtrag null. Anhang A bleibt die Liste des Stands vor der Ergänzung.
- Einordnung: Dieser Nachtrag ersetzt den ROT-Befund unter PRÜFUNG UND ERGEBNIS und OFFENE FRAGE 1. Ob die Erlaubtliste die Rezensionszeilen zu Recht freigibt, entscheidet der Orchestrator; ich habe die Liste nicht geändert.
- Nicht geändert: `_werkstatt/texte-erlaubt.json`, `_werkstatt/werkzeuge/*`.

---

## ANHANG A · Entfernte Zeilen (je Teil)

Quelle: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/probe/texte-vergleich-gegen-e0.json` (Seiten `/` und `/@m390`, Teil main_zeilen, identisch, je 49 Zeilen). Alle übrigen Teile und Seiten: 0 entfernte Zeilen.

1. 27 verifizierte Google-Rezensionen
2. E
3. "Die Fa.Tezgel hat uns im Bad neue Fliesen verlegt.Wir können diese Firma uneingeschränkt und wärmstens empfehlen.Handwerklich perfekt, saubere u.präzise …"
4. Google Rezension
5. C
6. "Die Firma Tezgel hat für mich zwei Bäder saniert. Als einziges der Gewerke wurden die Arbeiten von der Firma Tezgel ordnungsgemäß, sauber und pünktlich …"
7. Google Rezension
8. R
9. "Wir haben unser gesamtes Haus von der Firma Fliesenverlegung Tezgel verlegen lassen – und sind rundum zufrieden. Vom ersten Tag an lief alles absolut …"
10. Google Rezension
11. H
12. "Ich kann die Firma Tezgel nur wärmstens empfehlen! Herr Tezgel hat bei mir die Fliesen auf dem Balkon neu verlegt, und ich bin mehr als zufrieden mit seiner …"
13. Google Rezension
14. U
15. "Top Unternehmen! Herr Tezgel und sein Team haben unser Bad (barrierefrei) gefliest. Tolle Arbeit, wir sind sehr zufrieden. Können wir uneingeschränkt weiter empfehlen! …"
16. Google Rezension
17. P
18. "Wir sind mit den Leistungen der Firma D. Tezgel sehr zufrieden. Unser neues Bad ist professionell und hochwertig, nach unseren Vorstellungen ausgeführt. Termine …"
19. Google Rezension
20. C
21. "Sehr gute Kommunikation, super freundlich und das wichtigste: TOP Arbeit! Absolut empfehlenswert. Ein Handwerker, der sich auch nicht zu schade ist, kleinere Arbeiten durchzuführen! …"
22. Google Rezension
23. S
24. "Wir haben unser komplettes Haus von Herrn Tezgel und seinen Angestellten fliesen lassen. Auch die Bäder und die Treppen. Wir sind mit der Arbeit mehr als …"
25. Google Rezension
26. K
27. "Herr Tezgel und sein Team sind ausnahmslos professionell, zuverlässig und gut in dem was sie machen. Sie haben unser Badezimmer, Gäste WC und die Küche gefliest …"
28. Google Rezension
29. C
30. "Sehr zuverlässiges Inhabergeführtes Unternehmen in Aßlar. Nach Kontaktaufnahme mit dem Inhaber kam Herr Tezgel kurzfristig zur Absprache und Abgabe eines …"
31. Google Rezension
32. T
33. "Deniz Tezgel und sein Team haben erneut bei uns hervorragende Arbeit abgeliefert! Absolut zu empfehlen - top Beratung, top Organisation, sensationelle und …"
34. Google Rezension
35. E
36. "Immer wieder HERVORRAGENDE!!! Jedes Bad, jede Treppe, jeder Bodenbelag immer wieder TOP! …"
37. Google Rezension
38. K
39. "Sehr zuverlässig, freundlich und qualitativ sehr hochwertige Arbeit!"
40. Google Rezension
41. J
42. "Sehr gute schnelle saubere und professionelle Arbeit . Nur zu empfehlen"
43. Google Rezension
44. O
45. "Sehr schnelle und saubere Arbeit, immer wieder gerne 😊"
46. Google Rezension
47. J
48. "Top Arbeit zum fairen Preis."
49. Google Rezension

## ANHANG B · Spannen mit erlaubt: false (erste 60 von 184)

Gesamt 184 = 2 entfernt + 182 hinzugefügt. Vollständige Liste: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/probe/texte-vergleich-gegen-e0.json` (Abschnitt seiten[*].spannen, Felder erlaubt:false). Sortierung wie im Werkzeug-Ausgabe, je Seite, Block, Art.

1. Seite `/@m390` · Block main · entfernt · Text „verifizierte“ · vor: „(27 Rezensionen) Google 5,0 27“ · nach: „Google-Rezensionen Normgerechte Sicherheit Normgerechte Verbundabdichtung“
2. Seite `/@m390` · Block main · hinzugefuegt · Text „von 5“ · vor: „Google-Bewertungen (27 Rezensionen) Google 5,0“ · nach: „27 Google-Rezensionen Normgerechte Sicherheit Normgerechte“
3. Seite `/@m390` · Block main · hinzugefuegt · Text „„Die“ · vor: „aus Mittelhessen Elke S. Bad“ · nach: „Fa.Tezgel hat uns im Bad“
4. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „wärmstens empfehlen.Handwerklich perfekt, saubere u.präzise“ · nach: „Google 5 von 5 Google“
5. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „perfekt, saubere u.präzise …“ Google“ · nach: „Google Ablauf 02 · Material“
6. Seite `/@m390` · Block main · hinzugefuegt · Text „Ablauf 02 · Material & Fugenbild“ · vor: „Google 5 von 5 Google“ · nach: „C. W. Badsanierung „Die Firma“
7. Seite `/@m390` · Block main · hinzugefuegt · Text „„Die“ · vor: „& Fugenbild C. W. Badsanierung“ · nach: „Firma Tezgel hat für mich“
8. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „Tezgel ordnungsgemäß, sauber und pünktlich“ · nach: „Google 5 von 5 Google“
9. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „sauber und pünktlich …“ Google“ · nach: „Google Ablauf 03 · Ausführung“
10. Seite `/@m390` · Block main · hinzugefuegt · Text „Ablauf 03 · Ausführung & Abnahme“ · vor: „Google 5 von 5 Google“ · nach: „Rabia Ö. Komplettes Haus „Wir“
11. Seite `/@m390` · Block main · hinzugefuegt · Text „„Wir“ · vor: „Abnahme Rabia Ö. Komplettes Haus“ · nach: „haben unser gesamtes Haus von“
12. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „Tag an lief alles absolut“ · nach: „Google 5 von 5 Google“
13. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „lief alles absolut …“ Google“ · nach: „Google Leistung · Wohnbereiche Hasan“
14. Seite `/@m390` · Block main · hinzugefuegt · Text „Leistung · Wohnbereiche“ · vor: „Google 5 von 5 Google“ · nach: „Hasan Ö. Balkon „Ich kann“
15. Seite `/@m390` · Block main · hinzugefuegt · Text „„Ich“ · vor: „· Wohnbereiche Hasan Ö. Balkon“ · nach: „kann die Firma Tezgel nur“
16. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „mehr als zufrieden mit seiner“ · nach: „Google 5 von 5 Google“
17. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „zufrieden mit seiner …“ Google“ · nach: „Google Leistung · Balkon &“
18. Seite `/@m390` · Block main · hinzugefuegt · Text „Leistung · Balkon & Terrasse“ · vor: „Google 5 von 5 Google“ · nach: „Ute T. Barrierefreies Bad „Top“
19. Seite `/@m390` · Block main · hinzugefuegt · Text „„Top“ · vor: „Terrasse Ute T. Barrierefreies Bad“ · nach: „Unternehmen! Herr Tezgel und sein“
20. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „Können wir uneingeschränkt weiter empfehlen!“ · nach: „Google 5 von 5 Google“
21. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „uneingeschränkt weiter empfehlen! …“ Google“ · nach: „Google Barrierefreies Bad Peter P.“
22. Seite `/@m390` · Block main · hinzugefuegt · Text „Barrierefreies Bad“ · vor: „Google 5 von 5 Google“ · nach: „Peter P. Bad „Wir sind“
23. Seite `/@m390` · Block main · hinzugefuegt · Text „„Wir“ · vor: „Barrierefreies Bad Peter P. Bad“ · nach: „sind mit den Leistungen der“
24. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „nach unseren Vorstellungen ausgeführt. Termine“ · nach: „Google 5 von 5 Google“
25. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „Vorstellungen ausgeführt. Termine …“ Google“ · nach: „Google Badsanierung Christian D. Beratung“
26. Seite `/@m390` · Block main · hinzugefuegt · Text „Badsanierung“ · vor: „Google 5 von 5 Google“ · nach: „Christian D. Beratung & Service“
27. Seite `/@m390` · Block main · hinzugefuegt · Text „„Sehr“ · vor: „Christian D. Beratung & Service“ · nach: „gute Kommunikation, super freundlich und“
28. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „schade ist, kleinere Arbeiten durchzuführen!“ · nach: „Google 5 von 5 Google“
29. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „kleinere Arbeiten durchzuführen! …“ Google“ · nach: „Google Ablauf 01 · Planung“
30. Seite `/@m390` · Block main · hinzugefuegt · Text „Ablauf 01 · Planung & Aufmaß vor Ort“ · vor: „Google 5 von 5 Google“ · nach: „Sara J. Haus, Bäder &“
31. Seite `/@m390` · Block main · hinzugefuegt · Text „„Wir“ · vor: „J. Haus, Bäder & Treppen“ · nach: „haben unser komplettes Haus von“
32. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „mit der Arbeit mehr als“ · nach: „Google 5 von 5 Google“
33. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „Arbeit mehr als …“ Google“ · nach: „Google Treppen K. D. Bad,“
34. Seite `/@m390` · Block main · hinzugefuegt · Text „Treppen“ · vor: „Google 5 von 5 Google“ · nach: „K. D. Bad, Gäste-WC &“
35. Seite `/@m390` · Block main · hinzugefuegt · Text „„Herr“ · vor: „D. Bad, Gäste-WC & Küche“ · nach: „Tezgel und sein Team sind“
36. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „WC und die Küche gefliest“ · nach: „Google 5 von 5 Google“
37. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „die Küche gefliest …“ Google“ · nach: „Google Ablauf 03 · Ausführung“
38. Seite `/@m390` · Block main · hinzugefuegt · Text „Ablauf 03 · Ausführung & Abnahme“ · vor: „Google 5 von 5 Google“ · nach: „Christian S. Beratung vor Ort“
39. Seite `/@m390` · Block main · hinzugefuegt · Text „„Sehr“ · vor: „Christian S. Beratung vor Ort“ · nach: „zuverlässiges Inhabergeführtes Unternehmen in Aßlar.“
40. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „zur Absprache und Abgabe eines“ · nach: „Google 5 von 5 Google“
41. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „und Abgabe eines …“ Google“ · nach: „Google Ablauf 01 · Planung“
42. Seite `/@m390` · Block main · hinzugefuegt · Text „Ablauf 01 · Planung & Aufmaß vor Ort“ · vor: „Google 5 von 5 Google“ · nach: „Thorsten A. Beratung & Organisation“
43. Seite `/@m390` · Block main · hinzugefuegt · Text „„Deniz“ · vor: „Thorsten A. Beratung & Organisation“ · nach: „Tezgel und sein Team haben“
44. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „Beratung, top Organisation, sensationelle und“ · nach: „Google 5 von 5 Google“
45. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „Organisation, sensationelle und …“ Google“ · nach: „Google Ablauf 01–03 Erik S.“
46. Seite `/@m390` · Block main · hinzugefuegt · Text „Ablauf 01–03“ · vor: „Google 5 von 5 Google“ · nach: „Erik S. Bad, Treppe &“
47. Seite `/@m390` · Block main · hinzugefuegt · Text „„Immer“ · vor: „S. Bad, Treppe & Boden“ · nach: „wieder HERVORRAGENDE!!! Jedes Bad, jede“
48. Seite `/@m390` · Block main · hinzugefuegt · Text „…““ · vor: „jeder Bodenbelag immer wieder TOP!“ · nach: „Google 5 von 5 Google“
49. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „immer wieder TOP! …“ Google“ · nach: „Google Treppen Kathrin W. Qualität“
50. Seite `/@m390` · Block main · hinzugefuegt · Text „Treppen“ · vor: „Google 5 von 5 Google“ · nach: „Kathrin W. Qualität „Sehr zuverlässig,“
51. Seite `/@m390` · Block main · hinzugefuegt · Text „„Sehr“ · vor: „Google Treppen Kathrin W. Qualität“ · nach: „zuverlässig, freundlich und qualitativ sehr“
52. Seite `/@m390` · Block main · hinzugefuegt · Text „Arbeit!““ · vor: „freundlich und qualitativ sehr hochwertige“ · nach: „Google 5 von 5 Google“
53. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „qualitativ sehr hochwertige Arbeit!“ Google“ · nach: „Google Leistungen Janet T. Sauberkeit“
54. Seite `/@m390` · Block main · hinzugefuegt · Text „Leistungen“ · vor: „Google 5 von 5 Google“ · nach: „Janet T. Sauberkeit „Sehr gute“
55. Seite `/@m390` · Block main · hinzugefuegt · Text „„Sehr“ · vor: „Google Leistungen Janet T. Sauberkeit“ · nach: „gute schnelle saubere und professionelle“
56. Seite `/@m390` · Block main · hinzugefuegt · Text „empfehlen““ · vor: „professionelle Arbeit . Nur zu“ · nach: „Google 5 von 5 Google“
57. Seite `/@m390` · Block main · hinzugefuegt · Text „5 von 5“ · vor: „. Nur zu empfehlen“ Google“ · nach: „Google Ablauf 03 · Staubgeschützt“
58. Seite `/@m390` · Block main · hinzugefuegt · Text „Ablauf 03 · Staubgeschützt“ · vor: „Google 5 von 5 Google“ · nach: „Ortwin L. Sauberkeit „Sehr schnelle“
59. Seite `/@m390` · Block main · hinzugefuegt · Text „„Sehr“ · vor: „· Staubgeschützt Ortwin L. Sauberkeit“ · nach: „schnelle und saubere Arbeit, immer“
60. Seite `/@m390` · Block main · hinzugefuegt · Text „😊““ · vor: „saubere Arbeit, immer wieder gerne“ · nach: „Google 5 von 5 Google“
