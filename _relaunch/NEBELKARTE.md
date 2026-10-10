# NEBELKARTE

Sortiert nach Wirkung × Unsicherheit. Jede Zeile hat Lichtungsaufgabe oder Gegenmaßnahme.

| Stand | Punkt | Wirkung | Unsicherheit | Lichtung / Gegenmaßnahme |
|---|---|---|---|---|
| riskant | Jeder Push auf main geht live; ein Fehler trifft echte Besucher | hoch | mittel | Push-Tor: Reinraum-Build, Invarianten, Vorschau-Status, Live-Rauchtest, Revert-Regel |
| riskant | Richtung trifft die Marke nicht (keine Geschmacksabnahme, vollautonom) | hoch | mittel | Drei Stilkacheln, Jury mit Lockvogel, Denkprotokoll; M-07 |
| riskant | Bildmaterial ist KI-generiert → Echtheit und Jury-Inhalt leiden | hoch | gering | Typografie und SVG tragen; ehrliche Alt-Texte; M-02 |
| riskant | Harte S-01-Befunde im unantastbaren Fließtext | mittel | mittel | TEXTVORSCHLAEGE + MENSCHEN; ggf. Z-07 AUSNAHME nach L7 |
| riskant | Suchverlust (stark SEO-optimierte Seite) | hoch | gering | SEO-Invarianten je Welle; 308/410 für alte Pfade |
| riskant | Recht und Datenschutz bei Schriften, Einbettungen, Tracking | mittel | gering | nichts Neues von Dritten, Schriften lokal, M-01 |
| unbekannt | URLs der Original-tezgel.de | mittel | hoch | M-08 (Search-Console-Export) |
| unbekannt | Vercel-Build-Umgebung (Node-Version, Env-Variablen) | mittel | mittel | Vorschau-Build vor jedem main-Push; x-build-Meta |
| unbekannt | Ob `.vercelignore` bei Git-Deployments greift | gering | mittel | Build hängt nicht davon ab (@source not, tsconfig/eslint exclude); erster Push prüft |
| angenommen | Marke, Zielgruppe, Besucheraufgaben (aus Inhalten abgeleitet) | hoch | mittel | P2, als Annahme markiert |
| gesichert | Ausgangsstand 5a7a7b0, Archiv mit sha256 | – | – | E-002 |

## Vorab-Scheitern
- „Prächtig, aber träge“: Lighthouse fällt nach einer Welle um > 3 Punkte → Welle anhalten, Ursache beheben, Budget je Paket.
- „Effektfeuerwerk“: Bewegungsregister wächst schneller als fertige Seiten → Einträge streichen.
- „Fremdkörper“: neue Teile wirken als Bruch zu nicht umgebauten Seiten, die zwischen den Wellen live sind → P3 strikt auf `/`, P4 globaler Umstieg vor P5.
- „Grüner Build lokal, roter Build live“: nicht committete Dateien, abweichende Umgebung → Reinraum-Build aus Worktree, Vorschau-Status.
