# Rückgabe P0-TEST-07 F-09 (Kurzfassung)
- 12 Tests je Projekt, mobil 12/12, desktop 12/12 (zwei Orte, Pflichtfelder, Einwilligung, Leerzeichen-Name, Gutfall mit voller Nutzlast inkl. source/_t, Honeypot, echte Route).
- Entscheidung zu OF-1: Vorgetäuschter Erfolg bei gefülltem Honeypot ist Geschäftslogik (Spam-Schutz) → bleibt, Test sichert es.
- Befund für P5: Labels in LeadQuickForm nicht mit Feldern verknüpft (kein htmlFor/id) → Markup-Korrektur (Z-11), kein Logik-Eingriff.
- Hinweis: Systemlast ~40 auf 4 Kernen während paralleler Läufe → Messungen (Lighthouse, Bewegung) nur im ruhigen Fenster (bestätigt).
