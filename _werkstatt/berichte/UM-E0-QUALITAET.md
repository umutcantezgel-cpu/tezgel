# UM-E0-KUND-QUALITAET · Qualität (Kundschafter, Haiku 5.5)

Abgelegt vom Orchestrator aus der Rückgabe des Pakets (das Paket hat die Datei nicht selbst geschrieben).

## Zusammenfassung
Prüfungen: npm test exit 0, 210 Tests bestanden, 0 übersprungen, 6,0 s. tsc --noEmit exit 0, keine Ausgabe, 2,7 s. eslint src exit 0, 437 Dateien, 0 Fehler, 0 Warnungen, 21,5 s. Funktionsspecs: 418 Tests (209 je Projekt) in 15 Dateien, nur per Playwright --list aufgelistet, nicht ausgeführt. Letzter Suite-Lauf (26.10., 20:09): 393 bestanden, 25 übersprungen, EXIT 0. Übersprungen: 8 Tracking-Tests env-gesteuert (RELAUNCH_TRACKING), 2 fixme-Zeilen Treppendaten (funktion-konfigurator.spec.mjs:313), Rest Projekt-Skips nach Design. test/: zwei konditionale Skips (gefaelle-dusche.test.mjs:52, verband.test.mjs:67), derzeit inaktiv. TODO/FIXME/XXX/HACK: 0 in src/, keine echten in werkzeuge. MENSCHEN: 28 Einträge, 1 dringend (M-01, Originalfotos in der Git-Historie). PLAN: 453 Datenzeilen, 289 Status „offen“, 2 offene Punkte. Doku-Abweichungen: README nennt KERN v2 (aktuell 3.6), 174 Seiten (93 page-Dateien), „über 50“ Landingpages (13), /bad/budgetkalkulator (entfernt in 2e0b5be4), HelpSidebar (fehlt), Node >= 18.17 (npm test braucht 22.6). Der Bericht _werkstatt/berichte/UM-E0-QUALITAET.md wurde nicht geschrieben (Systemvorgabe gegen .md-Berichte); Rohdaten im bericht_pfad. Keine Repo-Datei geändert.

## Rohdaten aus der Rückgabe
/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e0-qualitaet-daten.txt

## Offene Fragen
- Die verlangte Datei _werkstatt/berichte/UM-E0-QUALITAET.md fehlt, weil die Systemvorgabe Berichte als .md untersagt; der Orchestrator entscheidet, ob der Inhalt trotzdem als Datei gebraucht wird. Die vollständigen Listen (Testdateien, Skips mit Fundstellen, MENSCHEN-Einträge, PLAN-Status, Doku-Abweichungen) stehen im bericht_pfad.
- Der letzte vollständige Suite-Lauf stammt vom 26.10. 20:09; Specs, die danach geändert wurden, sind nicht gegen einen Lauf geprüft. Die Funktionsspecs wurden wegen des Browserlauf-Verbots nicht ausgeführt.
- Die Zahl offen (289) zählt nur den ersten Wert der Statusspalte; 305 Zeilen enthalten das Wort offen. Welche Zählung gilt, ist offen.
- Die Node-Angabe ist widersprüchlich: package.json engines und README sagen >= 18.17.0, npm test braucht laut EINRICHTUNG.md Node >= 22.6. Welche Angabe gilt, ist offen.
- Der Eintrag M-01 (Originalfotos in der Git-Historie, Repo laut Vorlauf öffentlich) ist ein Fund für den Menschen und wurde nicht bewertet.
- Die grep-Zählung der Funktionsspecs (258) weicht von der Playwright-Liste (209 je Projekt) ab; maßgeblich ist die Liste.
- Im Arbeitsbaum liegen fremde Untracked-Dateien (_werkstatt/berichte/UM-E0-BEWEGUNG.md, UM-E0-DESIGN.md, UM-E0-KONTINGENT.md, UM-E0-STACK.md, _werkstatt/belege/um-e0/axe/); sie gehören anderen Paketen und wurden nicht bewertet.

=== ENDE UM-E0-KUND-QUALITAET · BEREIT ZUR RÜCKGABE ===
