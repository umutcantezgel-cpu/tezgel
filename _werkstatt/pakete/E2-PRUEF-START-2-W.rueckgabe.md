ERGEBNIS JE WERKZEUG

1. **bildsatz, Hauptansichten, alle 10 Geräte**: `node bildsatz.mjs --satz e2r2 --hauptansichten --geraete alle --worker 1`. Exit 0. 120 Kombinationen (12 Seiten × 10 Geräte), 1276 Aufnahmen, alle Status 200, Fehler 0. Überlauf: 0 Befunde. Überlappung: 0 Befunde. Konsolenfehler: 0. Das Werkzeug erfasst nur Konsolenfehler, Warnungen stehen in Schritt 5.
   - Zusatz /gibt-es-nicht, m390 und d1440: Exit 1 nur wegen HTTP 404 (erwartet). Je 7 Aufnahmen, Überlauf 0, Überlappung 0. Je eine Konsolenmeldung: „Failed to load resource: the server responded with a status of 404 (Not Found)“. Dokument-404, ausgenommen.
2. **erstesbild, /**: Exit 0. 20 Fälle, Fehler 0, nicht 200: 0. Bestanden von 5 Elementen:
   - Erstbesuch: m360 3, m390 3, m430 5, q844 2, t768 5, t1024 3, d1280 3, d1440 3, d1920 4, d2560 5.
   - Nach Einwilligung: alle 5, außer q844 mit 4.
   - Querformat q844: 24,1 % oben und unten, ok.
3. **axe** (/, /gibt-es-nicht, m390, d1440, mit Zuständen): Exit 0. 25 Läufe, 14 Knoten ernst/kritisch. Einzige Regel: serious:target-size, nur im Zustand „menue“ (Mobilmenü, m390). Je Seite 2 Ziele: `.px-3[href="tel:+4964414483567"]` und `.px-3[rel="noopener noreferrer"][target="_blank"]`. Betroffen: /, /bad, /leistungen, /standorte, /blog, /ueber-uns, /kontakt. Normal- und Erstbesuchszustand ohne Verstöße, auch /gibt-es-nicht.
4. **lesbarkeit, /**: Exit 0. GRÜN 1, ROT 0. Flesch 78,5, Satz Ø 7,3, Satz max 23, Titel 56 Zeichen, Beschreibung 146 Zeichen, Alt-Texte ok.
5. **Konsole** (eigenes Skript, installSperre, 3 s Wartezeit, Durchscrollen): / , /bad, /gibt-es-nicht in m390 und d1440.
   - Positivprobe auf /bad m390: console.error und console.warn je erfasst (2/2).
   - Reale Konsolenfehler, -warnungen und Seitenfehler: 0.
   - Eigene Anfragen ≥ 400: 0 außer dem Dokument-404.
   - Eine blockierte Anfrage auf /bad m390: POST `/__nextjs_original-stack-frames`, „net::ERR_BLOCKED_BY_CLIENT.Inspector“. Sie entstand durch die Positivprobe (Dev-Overlay) und ist kein Seitenbefund.

BEFUNDE

- **B1, / im Erstbesuch (Einwilligungsbanner)**: Der Banner ist `div[role=dialog].hoehe-banner.ueber-leiste-12` in src/components/common/CookieConsent.tsx Zeile 75. Er verdeckt in 13 Fällen Erstes-Bild-Elemente: m360 Hauptknopf und Kontakt; m390 Hauptknopf (Titelzeile `p.pt-2.text-fs-3`) und Kontakt; q844 Überschrift und Ort; t1024, d1280 und d1440 Überschrift und Ort; d1920 Ort. Nach Einwilligung sind diese Fälle alle ok. Belege: `.../scratchpad/E2-R2-W/erstesbild/erstes-bild.json`
- **B2, / in q844 (844 × 390), mit und ohne Banner**: Hauptknopf `header.kopf-anker … a.inline-flex.min-h-11` liegt bei y = −1,1 px und ist abgeschnitten. Belege: dieselbe JSON.
- **B3, Mobilmenü m390**: serious:target-size, siehe Punkt 3. Belege: `.../scratchpad/E2-R2-W/axe/axe.json`

BILDPFADE

- Erstes Bild, Ordner: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R2-W/erstesbild/bilder/`
  - m390: `.../erstesbild/bilder/start__m390__erstbesuch.jpg`
  - d1440: `.../erstesbild/bilder/start__d1440__erstbesuch.jpg`
- Bildsatz, Ordner: `.../scratchpad/E2-R2-W/bildsatz/`
  - m390: `.../bildsatz/m390/start/00.jpg`
  - d1440: `.../bildsatz/d1440/start/00.jpg`

OFFENE FRAGEN

- Die axe-Zustandsläufe liefen zusätzlich über /bad, /leistungen, /standorte, /blog, /ueber-uns und /kontakt. Der Pfad lautet /standorte und nicht /standorte/wetzlar. Herkunft nicht geprüft.
- Bildsatz und erstes Bild liefen mit abgelehntem bzw. ohne Einwilligungs-Cookie. Der Banner ist deshalb in den Bildsatz-Aufnahmen nicht zu sehen.

Skripte und Belege: `.../scratchpad/E2-R2-W/konsole.mjs`, `.../E2-R2-W/konsole/konsole.json`, `.../E2-R2-W/lesbarkeit/lesbarkeit.md`, `.../E2-R2-W/bildsatz-404/bildsatz.json`.

=== ENDE E2-R2-W ===
