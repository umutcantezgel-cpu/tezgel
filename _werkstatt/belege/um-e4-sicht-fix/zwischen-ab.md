# Zwischenprüfung nach SF-A und SF-B (7e117c19), 31.10.2026 09:07–09:38 UTC

=== REINRAUM 7e117c19 09:07:52
exit 0
lint 0 (22s)
test 0 (2s)
qa-graph 0 (1s)
ℹ tests 266
ℹ pass 266
ℹ fail 0
ℹ skipped 0
läuft: 7e117c19 auf 4325
4325 200
/ css=1
/bad css=1
/fliesen css=1
/blog css=1
/ueber-uns css=1
/kontakt css=1
=== SUITE reduziert 09:09:37
exit 0
=== SUITE Bewegung an 09:18:09
exit 1
  26 skipped
  398 passed (8.5m)
  1 failed
  26 skipped
  397 passed (10.0m)
/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/sfix/pruef-ab/suite-bewegung.txt:  1) [desktop] › tests/funktion-navigation.spec.mjs:192:3 › FAQ-Aufklapper (/preise) › Frage öffnet die Antwort, zweiter Klick schließt sie (aria-expanded, Höhe, Bereich inert) 
=== AXE 09:28:12
.............................................................................................................................................................................................................................................................
axe: 396 Läufe · ernst/kritisch (Knoten) 0


=== ENDE 09:38:01

[exited with code 0]

## Nachprüfung FAQ-Aufklapper (/preise), Bewegung an, je 5 Wiederholungen
- 4325 (7e117c19): 10/10 bestanden
- 4324 (4d2d3fef): 10/10 bestanden
- Befund im Gesamtlauf: Klick ohne Wirkung (aria-expanded bleibt false). Nicht nachgestellt. /preise nutzt Schritte aus vorlagen/teile/Ablauf (von SF-B geändert), FAQAccordion selbst unverändert. Beobachtung im Messpunkt (kette-1.sh); tritt der Fehler dort erneut auf, wird die Ursache geklärt.
