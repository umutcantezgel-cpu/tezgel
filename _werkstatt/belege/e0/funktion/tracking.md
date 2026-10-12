# E0-PRUEF-04 · Teil B · Tracking erst nach Einwilligung

Stand 2026-10-10 · Prüfer E0-PRUEF-04 · Datei `_werkstatt/werkzeuge/tests/funktion-tracking.spec.mjs` (neu, F-11-Erweiterung)

## Fälle (je Projekt mobil und desktop)

| Fall | Ausgangslage | Prüfung |
|---|---|---|
| (1) | Erstbesuch, kein Cookie | nach Laden und Scrollen keine Anfrage an GA4-Hosts |
| (2) | Erstbesuch, „Alle ablehnen“ | nach Neuladen und Seitenwechsel (/kontakt) keine Anfrage |
| (3) | Erstbesuch, „Alle akzeptieren“ | danach Anfrage an `gtag/js?id=G-TEST000000` (Sperre antwortet mit 204) |
| (4) | Zustimmung vorhanden, Widerruf über „Cookie-Einstellungen verwalten“ → „Alle ablehnen“ | nach Neuladen keine neue Anfrage |

## Läufe

| Lauf | Basis | mobil | desktop | Rohbericht (Cache) |
|---|---|---|---|---|
| A · Beleg | 127.0.0.1:4311 (Platzhalter G-TEST000000), `RELAUNCH_TRACKING=1` | (1) grün, (2) grün, (3) **rot**, (4) grün | (1) grün, (2) grün, (3) **rot**, (4) grün | `_werkstatt/cache/e0-funktion/tracking-4311.json` |
| B · Gegenprobe | 127.0.0.1:4310 (ohne GA4-ID), `RELAUNCH_TRACKING=1` | (1) grün, (2) grün, (3) **rot**, (4) grün | (1) grün, (2) grün, (3) **rot**, (4) grün | `_werkstatt/cache/e0-funktion/tracking-4310-gegenprobe.json` |
| C · ohne Flag | Standardbasis, `RELAUNCH_TRACKING` nicht gesetzt | 8 übersprungen, nicht rot | | – |

Laufzeit je Beleglauf etwa 1,5 Minuten. Fehlerbild von (3) in beiden Läufen: „Timeout 15000ms exceeded while waiting on the predicate“. Die Zustimmung ist gespeichert (`analytics: true`), eine Anfrage mit `id=G-TEST000000` bleibt aber aus.

Ein vorläufiger Lauf A vor einer Korrektur zeigte sechs rote Läufe. Ursachen waren zwei Fehler im Test selbst: die Leerlauf-Warteschleife hatte keine Obergrenze und hing, und der Fußlink-Klick schlug fehl (siehe unten). Beides ist behoben. Die Ergebnisse oben stammen aus den Läufen nach der Korrektur.

## Diagnose zu Fall (3)

Eigener Browserlauf außerhalb der Specs, über dieselbe Anfragesperre (`lib.mjs`). Erstbesuch, Desktop 1440 × 900, Beobachtungszeit je Schritt 8 s.

| Build | nach „Alle akzeptieren“, ohne Neuladen | nach Neuladen |
|---|---|---|
| 4311 (Platzhalter-ID) | 0 Anfragen an gtag/js; Cookie `analytics: true` | 1 Anfrage, `id=G-TEST000000` |
| 4310 (ohne ID) | 0 Anfragen | 0 Anfragen |

Ursache, aus dem Code gelesen und durch die Diagnose belegt: `src/hooks/useConsent.ts` registriert den Listener für `cookie_consent_updated` im Effekt nur dann, wenn beim Mount schon ein Cookie vorliegt. Beim Erstbesuch fehlt er. Der Banner setzt die Zustimmung und sendet das Ereignis, aber `TrackingScripts.jsx` hat eine eigene Hook-Instanz mit Mount ohne Cookie und übernimmt die Zustimmung nicht. GA4 startet deshalb erst beim nächsten Seitenaufruf. Die Einwilligungslogik ist unantastbar und wurde nicht verändert. Die Entscheidung liegt beim Orchestrator (Rückgabe, OFFENE FRAGE 1).

## Anpassung in Fall (2)

Der Seitenwechsel ist ein vollständiger Aufruf von `/kontakt` statt eines Klicks auf den Fußlink „Kostenfreies Vor-Ort-Aufmaß“. Der Link liegt mobil bei x = 407 px in einer 390 px breiten Ansicht und ist nicht klickbar. Messung auf 4310 und 4311 gleich, also ein Ausgangsbefund des Basisstands und kein Effekt des Tracking-Builds.
