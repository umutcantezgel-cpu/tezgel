# E2-PRUEF-00 · Rückgabe (Haiku, Workflow wf_16ad5e39-fa4)

GEÄNDERTE DATEIEN
Keine im Repo: `git status` leer, HEAD 8376062. Außerhalb meines Schreibrechts: Ein Shell-Fehler mit leerer Variable hat `/E2-PRUEF-00/` im Wurzelverzeichnis angelegt (`spur.mjs` und ein leerer Ordner `spur`). Das Löschen hat die Sicherheitsprüfung abgelehnt; bitte von Hand entfernen. Die Lighthouse-Rohberichte liegen über den festen Cache-Symlink im Scratch-Ordner `werkstatt-cache/lighthouse/` (Werkzeugvorgabe).

ERGEBNIS LIGHTHOUSE (Mediane, mobil, `/`)

| Kennzahl | 4311 neu (5 Läufe) | 4310 alt (3 Läufe) | E0 |
|---|---|---|---|
| Leistung | 85 [82–91] | 89 [84–91] | 89 |
| LCP simuliert, ms | 3034 [2869–3735] | 3115 [2956–3125] | 3472 |
| FCP simuliert, ms | 1226 | 1372 | 1364 |
| TBT, ms | 307 [199–450] | 277 [197–376] | – |
| CLS | 0 | 0 | 0 |
| Zugänglichkeit / BP / SEO | 100 / 100 / 100 | 100 / 100 / 100 | – |
| LCP-Element | Startbild-Foto (`img` in `figure`) | Vorspann `p.max-w-mass` | Vorspann |

Keine Benchmark-Abweichung. Der Bericht trägt `throttlingMethod: simulate`: Die LCP ist eine Simulation, der beobachtete Wert im selben Bericht liegt bei 265 bis 355 ms (ungedrosselter Lauf).

Playwright mit echter Drosselung (m390-Näherung, CPU 4x, Slow 4G), Mediane aus 5 Läufen ohne Spur: Erstbesuch LCP 1284 [1248–1388] ms, erstes hydriertes Element 3378 ms. Wiederkehrend LCP 1716 [1560–1904] ms, Hydrierung 2970 ms. Spurläufe mit Tracing (je einer): 1560 ms bzw. 1644 ms; Tracing erhöht den Wert. Positivprobe des Observers: BESTANDEN (Bild nach 1500 ms eingefügt, letzter Kandidat bei 1808 ms).

LCP-KETTE (ms ab navigationStart; LCP ist das Startbild-Foto `dusche-ohne-stufe-graue-fliesen`)

Erstbesuch:
- 386 Foto-Anfrage per preload; CSS fertig 920; Foto fertig 1017.
- 938 Kopfskript setzt `k-intro`; 1114 Intro-Animationen starten.
- 967 bis 1194 HTML-Parser (227) und Inline-Skript (224) auf dem Hauptfaden; Layout 990 bis 1114 (124) und 1232 bis 1349 (117); Paint 1431.
- 1503 Schrift Archivo fertig (Anfrage 378, Antwort erst 1498).
- 1559 erster Frame: Foto und H1 zugleich. Wartezeit nach Ladeende 542 ms.

Wiederkehrend:
- 356 Foto-Anfrage; CSS fertig 886; Foto fertig 986.
- 893 `k-startbild` gesetzt; 1026 Aufgabe 610 ms; Layout 1130 bis 1492 (362).
- 1492.6 Belag-Animationen starten (Trace-Phase `b`).
- 1514 Paint; 1640 Schrift fertig; 1643 erster Frame mit Foto und H1.
- 2293 Belag fertig (berechnet: 1492.6 + 800 ms); Trace-Endereignisse bei 2529 bis 2677.

Warum erst dann: Das Foto ist bei 986 bzw. 1017 ms fertig, der erste Frame kommt bei 1559 bzw. 1643 ms. Dazwischen arbeitet der Hauptfaden, vor allem Layout (27 % bzw. 28 % des Fensters). Der Belagstart folgt unmittelbar auf das Ende der Layout-Phase, 600 ms nach dem Setzen der Klasse.

ANTEILE (an der LCP-Zeit)
- Schrift: Archivo fertig bei 1503 ms (96 %, Erstbesuch) bzw. 1640 ms (100 %, wiederkehrend); H1 im selben Frame. Mitauslöser, nicht alleinige Ursache, weil das Foto schon fertig war. Beleg: Ressourcen und `LargestTextPaint` in der Spur.
- Intro (Erstbesuch): aktiv ab 1114 ms, also 445 ms (29 %). Anteil an der Hauptfadenlast nicht trennbar.
- Startbild-Belag (wiederkehrend): Start 1492.6 ms, LCP 1643 ms, also 150 ms (19 % der 800 ms) nach Start. Das Foto ist bei der LCP noch überwiegend verdeckt; frei ab etwa 2293 ms. Der Belag verlängert die LCP nicht, er verschiebt die sichtbare Freigabe.
- Bewegung: Modul `k-modul` erst bei 3894 (wiederkehrend) bzw. 4060 ms (Erstbesuch); Fallback `k-notaus` nach 2 s bei 3236 bzw. 3439 ms. Anteil an der LCP: 0 %.
- Hydrierung: erstes Element bei 3437 bzw. 3742 ms, also 1,8 bis 2,2 s nach der LCP. Anteil an der LCP: 0 %. Skriptpaket `075_…js` (72,7 KB) belegt danach 380 bis 479 ms am Hauptfaden.
- Hauptfaden im LCP-Fenster (1-ms-Abtastung): Erstbesuch Layout 27 %, Bild 5 %, Parser 4 %, Paint 3 %, Inline-Skript 1 %, übrige Aufgaben 36 %, Leerlauf 25 %. Wiederkehrend Layout 28 %, Bild 7 %, Parser 6 %, Paint 3 %, übrige 32 %, Leerlauf 23 %.

BELEGE
- Lighthouse 4311: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-00/belege/e2p00-4311/lighthouse.json
- Lighthouse 4310: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-00/belege/e2p00-4310/lighthouse.json
- Rohberichte: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/werkstatt-cache/lighthouse/e2p00-4311/start-mobil-0 bis -4.report.json
- Spur: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-00/spur/erst-spur-1.json und wieder-spur-1.json; Messungen erst-messung-1 bis -5 und wieder-messung-1 bis -5 im selben Ordner
- Skript und Auswertung: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-00/spur.mjs, analyse2.mjs, anim2.mjs, anteil.mjs

OFFENE FRAGEN
1. Z-08 nennt die simulierte LCP (3034 ms gegen Ziel 2500 ms); die gedrosselte Messung liegt bei 1,3 bis 1,7 s. Welcher Wert gilt?
2. Schrift-Anteil ungemessen: Ein Lauf mit früher geladener Schrift würde zeigen, ob der Frame vorrückt.
3. Intro- und Belag-Anteil an der Hauptfadenlast nicht getrennt; dafür fehlt je ein Lauf ohne die Animation.
4. Belag-Ende: Die Trace-Endereignisse (2529 bis 2677 ms) liegen über der Auslegung (2293 ms). Ursache offen, möglicherweise Skriptpaket 075 bei 2715 ms.
5. Stray-Ordner `/E2-PRUEF-00/` bitte entfernen (siehe GEÄNDERTE DATEIEN).

=== ENDE E2-PRUEF-00 · BEREIT ZUR RÜCKGABE ===
