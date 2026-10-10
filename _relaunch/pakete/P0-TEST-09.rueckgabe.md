# Rückgabe P0-TEST-09 F-11/F-12 (Kurzfassung)
- 17 Tests: desktop 17/17, mobil 16/16 + 1 fixme. Banner-Gleichwertigkeit, Ablehnen/Akzeptieren/Auswahl, #cookie-settings, Widerruf; Karten ohne Marketing-Einwilligung ohne Anfrage an Karten-Hosts, Zwei-Klick-Platzhalter, Gutfälle nach Klick.
- Befund 1 (Darstellung, eigene Aufgabe in P5 W3 Standorte): Mobil (375–430 px) überdeckt der Info-Kasten der Standortkarte den Knopf „Karte laden & zustimmen“ vollständig (elementFromPoint 0/25) → Karte mobil nicht aktivierbar. test.fixme(isMobile) bis zur Behebung; danach fixme entfernen.
- Befund 2 (Einwilligungslogik, unverändert): nach „Alle akzeptieren“ im Erstbesuch bleibt der Kartenplatzhalter bis zum Neuladen (Listener nur bei vorhandenem Cookie) – deckt sich mit I-06.
