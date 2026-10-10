# Rückgabe P0-TEST-01 F-02 (Kurzfassung)
- 8 Tests je Projekt, mobil 8/8, desktop 8/8; Belastungsläufe 80/80 je Projekt nach Stabilisierung (mittig scrollen, invalid-Ereignis statt Fokus).
- Befunde: Standard-Gewerk „Badsanierung“ → Anfrage ohne Änderung geht als „bad“ (Geschäftslogik, bleibt); Einwilligungs-Checkbox vorab angehakt (→ I-05, Vorschlag P3: Vorab-Haken entfernen, Tests setzen den Haken ohnehin explizit); fester Kopfbereich überdeckt beim Scrollen Absende-Knopf/Checkbox (→ P4 Header, `scroll-padding-top`).
- Werkzeug: gemeinsames Ausgabeverzeichnis → playwright.config bekommt RELAUNCH_OUTPUT (L6).
