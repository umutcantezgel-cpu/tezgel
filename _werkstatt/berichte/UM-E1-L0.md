Kopfzeile: UM-E1-PRUEF-L0 · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 · Kern-Version 4.0 · Kostenklasse S · Schreibrechte: /home/user/tezgel/_werkstatt/berichte/UM-E1-L0.md · Umfang: Planprüfung nach Checkliste, nur lesen.

## Ergebnis je Punkt
- a) Teilweise. Z-02: U03, E2-B, EP1–EP5, VIDEO · Z-03: U01–U07, PX, E2-B · Z-04: DS, ZUST · Z-05: LEIT, E3-B, VORL, CHOR, CHOR-FIX, E4-B, BLIND · Z-06: MOD, EIN, B01, LEIT, REG, E3-B, VORL, CHOR, E4-B · Z-07: B01, SCROLL, CURSOR · Z-08: SVGO, SVG · Z-09: ZUST, E4-B · Z-10: EIN, SCROLL, E4-B · Z-11: NBSP, FS, E4-B · Z-13: DOK, BER. Ohne Paket: Z-01, Z-12.
- b) Teilweise, siehe Befund 2.
- c) Nicht erfüllt: Befunde 4 bis 7.
- d) Teilweise. Upgrader-Muster in UPGRADE.md Nr. 10 bis 22, im PLAN nicht genannt. Ohne Muster oder Maßstab: PX, ZUST, FS, EP4 (Befund 8).
- e) Zählung stimmt: 48, davon Klasse L 15 (11 Opus, 4 Haiku-Prüfstufen), M/S 33. Kostenrechnung nicht nachvollziehbar (Befunde 10, 11).
- f) Teilweise. Etappen genannt; Wellen für E4 und E5 fehlen; fett ist nur E2 U01–U03 und E3 DS→MOD→EIN→B01.

## Befunde
1. PLAN.md:7 nennt „170 Adressen“; adressen-e0.csv und ABNAHME.md:15 haben 202. Korrigieren.
2. PLAN.md:42 und :57 (E2-B, E3-B): Krit. fehlt die Prüfmatrix ABNAHME.md:96–105 (Stufe B für Z-04, Z-07 bis Z-11). PLAN.md:57, :74, :82 haben zwei Modelle je Paket (AUFTRAG.md:104). VIDEO (:72, Opus) ist Klasse S, die Haiku vorbehalten ist (AUFTRAG.md:257). Ergänzen bzw. aufteilen.
3. Z-01 und Z-12 haben kein Pflichtpaket (ABNAHME.md:7, :73). Z-01 in UM-E5-BER, Z-12 als Orchestrator-Aufgabe nennen. „alle“ in PLAN.md:79 und :81 durch Liste ersetzen.
4. Gleiche Datei, gleiche Welle: `src/inhalte/balkon-terrasse.ts` und `ueber-uns.ts` in EP1/EP2 (:66, :67) und im NBSP-Glob `src/inhalte/*` (:65); `src/config` in EP3 (:68) und NBSP (:65). Reihenfolge festlegen, Dateiliste nennen.
5. E3: `bewegung.css` in EIN (:49), LEIT (:53), REG (:54), ohne Welle festgelegt. `test/` in MOD, B01, CURSOR (:48, :50, :52). Welle nummerieren.
6. Unscharfe Schreibrechte („Menü“ :48, „Vorlage“ :66, „laut Befunden“ :64, „betroffene Seiten“ :69, „laut Bericht“ :56, „laut Befund“ :71): Dateihoheit nicht prüfbar. Exakte Dateiliste je Paket (AUFTRAG.md:92–104).
7. `src/config/blog.js` und `company.js` in SVG (:55) und NBSP (:65) sind Konfiguration, also gemeinsame Dateien (AUFTRAG.md:105–109). Klären, wer schreibt.
8. Ohne Muster oder Maßstab: PX (:40), kein Repo-Werkzeug nutzt pixelmatch. ZUST (:56), „Muster in Knopf“ ist Orchestrator-Arbeit im Haiku-Paket. FS (:71), Quelle `$SCRATCH/…/sicht.json` nur im Sitzungs-Scratchpad. EP4 (:69), 47 Seiten, Entscheidung offen (UM-E0-VERLUSTE.md, Frage 3). Muster nennen, Quelle sichern, EP4 teilen.
9. ZUST (:56): UM-E0-DESIGN.md:92–104 nennt acht lückenhafte Bausteine, PLAN und ENTSCHEIDUNGEN.md:697 sechs. `stile.ts` teilen sich drei Bausteine. Zahl und Dateiliste festlegen; der Ladeschwelle-Test (PLAN.md:13) hat kein Schreibrecht.
10. Kapazität (PLAN.md:16–18): 245 USD sind 4,83 Fenster zu 100 %, bei Sicherheitsziel 95 (AUFTRAG.md:243) ≈ 5,1. Tage-Formel: „3,5 Fenster je Tag“ ohne Herleitung, nicht Pakete je Tag (AUFTRAG.md:259); Wochenspielraum fehlt.
11. Kosten (PLAN.md:17–18): Die 15 Pakete der Klasse L (≈ 110 USD) enthalten die vier Prüfstufen, die mit ≈ 130 USD extra stehen (Doppelzählung). Drei Prüfstufen mit Juroren à 45 USD ergäben 135. Sieben Opus-M/S-Pakete sind zu Haiku-Preisen gerechnet.
12. U03 (:35) und E2-B (:42) hängen nicht von PX (:40) ab. Abhängigkeit ergänzen.
13. Z-03: sharp steht direkt in `_werkstatt/werkzeuge/package.json`, U05 (:37) hat nur das Wurzel-Schreibrecht; UPGRADE.md Nr. 12 nennt es „transitiv“. Nr. 18 und 23 sind „aktuell“ ohne Version. TypeScript 7 braucht zwei Anläufe (ENTSCHEIDUNGEN.md:708), U02 (:34) nennt einen.
14. UPGRADE.md (Z-03-Beleg), MENSCHEN.md, KERN.md und die Anleitung (Z-13, ABNAHME.md:81): kein Paket mit Schreibrecht (:73, :82). Zuweisen.
15. „Ansichtsart im Linkfilter“ (PLAN.md:13) fehlt in allen Paketzielen; vermutlich B01 (`src/lib/verlegen/linkfilter.ts`). Aufnehmen.

## OFFENE FRAGEN
- Node-Ziel: 24.22.1 oder 26 (UPGRADE.md Nr. 1)? U01 nennt keine Version.
- ABNAHME.md:15 lässt A-1 und A-2 bei Z-02 zu, ABNAHME.md:90–91 sagt „keine“, AUFTRAG.md:283 „keine für Z-02“. Welche Regel gilt?
- Z-11: „zehn Größen“ (ABNAHME.md:68) gegen „vier“ (:105). Themen nur in AUFTRAG.md:299.
- Kopfskript-Einbindung (`_dokument.tsx`, nur SCROLL): auch für EIN oder MOD nötig?

=== ENDE UM-E1-PRUEF-L0 · BEREIT ZUR RÜCKGABE ===
