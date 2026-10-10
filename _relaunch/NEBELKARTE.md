# NEBELKARTE

Sortiert nach Wirkung × Unsicherheit. Jede Zeile hat Lichtungsaufgabe oder Gegenmaßnahme.

| Stand | Punkt | Wirkung | Unsicherheit | Lichtung / Gegenmaßnahme |
|---|---|---|---|---|
| riskant | Jeder Push auf main geht live; ein Fehler trifft echte Besucher | hoch | mittel | Push-Tor: Reinraum-Build, Invarianten, Live-Rauchtest, Revert-Regel (E-005); Phasen-Freischaltung (E-015) |
| riskant | Richtung trifft die Marke nicht (keine Geschmacksabnahme, vollautonom) | hoch | mittel | Drei Stilkacheln, Jury mit Lockvogel, Denkprotokoll; M-07 |
| riskant | Bildmaterial trägt die Marke nicht (Jury P0) → Bildwelt muss ohne Fotos tragen | hoch | gering | Typografie und SVG tragen; ehrliche Alt-Texte; M-02 |
| riskant | Harte S-01-Befunde im unantastbaren Fließtext | mittel | mittel | TEXTVORSCHLAEGE + MENSCHEN; ggf. Z-07 AUSNAHME nach L7 |
| riskant | Suchverlust (stark SEO-optimierte Seite) | hoch | gering | SEO-Invarianten je Welle; 308/410 für alte Pfade |
| riskant | Recht und Datenschutz bei Schriften, Einbettungen, Tracking | mittel | gering | nichts Neues von Dritten, Schriften lokal, M-01 |
| unbekannt | URLs der Original-tezgel.de | mittel | hoch | M-08 (Search-Console-Export) |
| unbekannt | Vercel-Build-Umgebung (Node-Version, Env-Variablen) | mittel | mittel | Reinraum-Build vor jedem main-Push (E-005); x-build-Meta; bei Vercel-Fehler bleibt die vorige Produktion aktiv |
| unbekannt | Ob `.vercelignore` bei Git-Deployments greift | gering | mittel | Build hängt nicht davon ab (@source not, tsconfig/eslint exclude); erster Push prüft |
| angenommen | Marke, Zielgruppe, Besucheraufgaben (aus Inhalten abgeleitet) | hoch | mittel | P2, als Annahme markiert |
| gesichert | Ausgangsstand 5a7a7b0, Archiv mit sha256 | – | – | E-002 |
| riskant | Z-08 Kategorie „Inhalt“ ≥ 7,5 ohne echte Fotos (P0: 4,5–5,5; Texte unantastbar) | hoch | mittel | Frühwarnung in P3-16 (eigene Auswertung „Inhalt“), Fotoliste M-14, Verlegepläne als ehrliche Bildwelt; L7-Pfad: Z-08 kann AUSNAHME werden |
| riskant | `global-not-found` ist experimentell (E-015) | mittel | gering | erprobt in Erprobung 2 (`belege/e015-erprobung2/status.txt`: 404 in beiden Gruppen, Bestands-Schale, HTML 172 gleich; Nebenwirkung: Kern-Seiten laden bis W10 Inter/Jakarta mit vor); Kandidat-Tor prüft F-17; Rückfall: Pfad-Weiche nur für die 404 |
| riskant | Markenbruch in der Übergangszeit: Kern- und Bestandsseiten sehen verschieden aus, Wechsel lädt voll neu (E-015) | mittel | gering | Hauptwege früh freischalten (W1, dann W9-01 `/kontakt`), Navigation gleich gegliedert, Übergangszeit kurz halten |

## Vorab-Scheitern
- „Prächtig, aber träge“: Lighthouse fällt nach einer Welle um > 3 Punkte → Welle anhalten, Ursache beheben, Budget je Paket.
- „Effektfeuerwerk“: Bewegungsregister wächst schneller als fertige Seiten → Einträge streichen.
- „Fremdkörper“: neue Teile wirken als Bruch zu nicht umgebauten Seiten, die zwischen den Wellen live sind → E-015: jede Seite ganz alt oder ganz neu; Hauptwege früh freischalten (Plan Runde 3). (Früher: P3 strikt auf `/`, P4 globaler Umstieg vor P5.
- „Grüner Build lokal, roter Build live“: nicht committete Dateien, abweichende Umgebung → Reinraum-Build aus `git archive`-Kopie (E-005).
