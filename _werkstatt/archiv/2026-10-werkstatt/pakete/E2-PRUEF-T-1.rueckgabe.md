# E2-PRUEF-T-1 · Rückgabe

## GEÄNDERTE DATEIEN
`/home/user/tezgel/_werkstatt/belege/e0/texte-index.json`, `/home/user/tezgel/_werkstatt/belege/e0/texte/**` (363 Dateien, von 4310). Scratch: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-1/`.

## WAS UND WARUM
Basis e0 neu erhoben, Wiederholbarkeit belegt, Zwischenstand 4320 gegen e0 verglichen. Nichts behoben.

## PRÜFUNG UND ERGEBNIS
1. Erreichbarkeit 4310 und 4320: 200.
2. Wiederholbarkeit 4310 (3 Seiten, 2 Ansichten): GRÜN, alle Summen 0. Log `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-1/t1-t2.log`.
3. Kopf/Fuß (`t1/texte/fliesen.json`): header 330 Wörter, footer 192, footer_zeilen 80. Proben: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-1/probe-kopf-fuss.txt`.
4. Basis neu (121 Seiten, 156 s): Dateien 363/363; `seiten` 242; sitemap_anzahl 163; kaputte_links 0; Status ≠200: 0. Log `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-1/e0.log`. `git status` e0: 364 geändert; fremder Ordner `funktion/` (Frage 3).
5. Aufwärmen 4320: 121 Pfade, alle 200 (`/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-1/aufwaermen.txt`).
6. Zwischenstand 4320 (411 s, ein Lauf): „Seiten 121 · kaputte Links 0“ (`/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-1/zwischen.log`).
7. Vergleich, erste Zeile: seiten_mit_abweichung 242, entfernt 1763, hinzu 5072, meta 0, seo 0, spannen_unerlaubt_entfernt 902, kaputte_links 0, **ROT** (`/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-1/vergleich.log`).
8. Verdichtung: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-1/verdichtung.json` (nur lesend). Verschiedene Einträge: (a) entfernte Zeilen main 89, footer 6, header 1, überschriften 1, alt 0; (b) unerlaubt entfernte Spannen main 43 (176 Vorkommen), footer 3 (726); (c) hinzugefügte Spannen main 52, footer 6. Nachgerechnet: 902 = 176 + 726 Einträge mit `erlaubt: false`.

**Tabelle (a)**: 25 häufigste von 97. Anz. = Seitenschlüssel; Beispielschlüssel `/@m390`, wo nicht angegeben; Text gekürzt.
- footer: 242 „BADSANIERUNG“; 242 „FACHGEWERKE & FACHTHEMEN“; 242 „Fax: 06441 / 44 83 548“; 242 „Mobil & WhatsApp: 0172 …“; 242 „STANDORTE HESSEN“; 242 „UNTERNEHMEN & RATGEBER“
- header: 73 „06441 / 44 83 567“ (/)
- main: 3 „Cookie-Einstellungen“ (/kontakt@m390); 3 „Interaktive Karte geschützt (DSGVO)“ (/kontakt@m390); 3 „Karte laden & zustimmen“ (/kontakt@m390); 3 „Um die interaktive Google …“ (/kontakt@m390); 2 „Deniz Tezgel und sein …“; 2 „Die Fa.Tezgel hat uns …“; 2 „Die Firma Tezgel hat …“; 2 „Herr Tezgel und sein …“; 2 „Ich kann die Firma …“; 2 „Immer wieder HERVORRAGENDE …“; 2 „Sehr gute Kommunikation …“; 2 „Sehr gute schnelle saubere …“; 2 „Sehr schnelle und saubere …“; 2 „Sehr zuverlässig, freundlich …“; 2 „Sehr zuverlässiges Inhabergeführtes …“; 2 „Top Arbeit zum fairen Preis.“; 2 „Top Unternehmen! Herr Tezgel …“; 2 „Wir haben unser gesamtes …“
- Rest: main 71 (Anz. ≤ 2), überschriften 1 (`/standorte`, `/standorte@m390`).

**Tabelle (b)**: 25 häufigste von 46. Beispielschlüssel `/@m390`, wo nicht angegeben; Kontext in `verdichtung.json`.
- footer: 242 „Fax:“; 242 „info@tezgel.de“; 242 „WhatsApp:“
- main: 3 „geschützt (DSGVO) Um …“ (/kontakt@m390); 3 „Interaktive“ (/kontakt@m390); 2 „"“; 2 „(barrierefrei)“; 2 „C C. W.“; 2 „C Christian D.“; 2 „C Christian S.“; 2 „E Elke S.“; 2 „E Erik S.“; 2 „geschützt (DSGVO) Um …“ (/standorte); 2 „H Hasan Ö.“; 2 „J Jan G.“; 2 „J Janet T.“; 2 „K K. D.“; 2 „K Kathrin W.“; 2 „Kommunikation,“; 2 „mit Standorten und …“ (/standorte); 2 „O Ortwin L.“; 2 „Organisation,“; 2 „P Peter P.“; 2 „Preis. " Google …“; 2 „R Rabia Ö.“

**Tabelle (d)**: vollständig.
- 0 Abweichungen (242 Ansichten) bei Meta-Feldern, h1, jsonld, status.
- links_entfernt: `/standorte` und `/standorte@m390`, je 1 Routenlink (Google Maps, Hohwardstraße 14).
- links hinzugefügt (nicht vom Werkzeug ausgewiesen): `/` und `/@m390`, je `/#ablauf` und `/fliesen/festpreisangebot`.

## GEMEINSAME DATEIEN
Keine.

## BILDBELEGE
Keine.

## OFFENE FRAGEN
1. Das Werkzeug meldet nur entfernte Links; hinzugefügte erscheinen nur im Feldvergleich. Soll es sie melden? Nicht geändert.
2. header_zeilen: 121 Ansichten mit Abweichung, 73 gemeldet (Rest durch `texte-erlaubt.json` gefiltert). „06441 / 44 83 567“ fehlt auf 73 Ansichten, `bloecke.header` ist auf allen 242 unverändert. Ursache offen.
3. `_werkstatt/belege/e0/funktion/` war um 20:01 untracked (angelegt 20:00:14 UTC, im e0-Lauf); kein Werkzeug verweist darauf. Seit 20:14 im fremden Commit 006c894 (E0-PRUEF-04). Nicht angefasst.
4. Stand 4320 enthält fremde, unkommittierte Änderungen (6 Dateien unter `src/components/`). Nicht angefasst.
5. Wiederholbarkeit nur auf 3 Seiten geprüft, nicht auf 121.
