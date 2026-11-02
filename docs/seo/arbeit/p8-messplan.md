# P8 Messen und melden: Ablauf für Umut

Stand 02.11.2026. **Vorschlag, nichts davon ist eingerichtet.** Ich messe nur mit kostenlosen Werkzeugen und nenne Zahlen zu Suchanfragen und Positionen immer mit Quelle und Datum. Den Zugang zur Search Console richtet Umut ein (`docs/seo/arbeit/p7-liste-fuer-umut.md`, Abschnitt 6).

## 1. Vor dem ersten Live-Gang der Patches

- **Ausgangswerte sichern**, sobald die Search Console da ist: Bericht „Leistung“ der letzten drei Monate, einmal nach Seiten und einmal nach Suchanfragen, als Export. Datum und Zeitraum kommen in KONTEXT.md Abschnitt 13.
- **Ohne Search Console** gibt es keine belastbaren Ausgangswerte. Dann gilt der Tag des Live-Gangs als Startpunkt, und der Vergleich beginnt mit den ersten Daten danach.
- **Heutiger Stand im Bau** liegt schon vor: Titel, Descriptions und Regelbefunde aller Seiten (Plan, Abschnitt 1 und Tabelle der Gesamtprobe in Abschnitt 7).

## 2. Direkt nach dem Live-Gang

1. **Sitemap einreichen:** `https://www.tezgel.de/sitemap.xml` in der Search Console unter „Sitemaps“.
2. **URL-Prüfung** und „Indexierung beantragen“ für die wichtigsten Seiten:
   - `/` (Marke und Aßlar);
   - `/standorte/wetzlar` (Wetzlar);
   - `/bad/badsanierung` und `/bad/barrierefreies-bad`.
3. **Rich-Results-Test** von Google für `/` und `/standorte/wetzlar`: Erwartet sind ein LocalBusiness ohne Fehler und auf der Wetzlar-Seite ein Service. Product und Bewertungssterne darf er nicht mehr finden (P1).
4. **robots.txt** auf `https://www.tezgel.de/robots.txt` ansehen: keine Zeile `Disallow: /*?*` mehr (T01).
5. **Bing Webmaster Tools:** die Website aus der Search Console übernehmen. IndexNow erst nach Umuts Freigabe; ohne Freigabe rufe ich `/api/indexnow` nicht auf.

## 3. In den ersten zwei bis vier Wochen

- **Bericht „Seiten“ (Indexierung):**
  - Die Seiten mit noindex (mit P4: 71 im Bau) erscheinen nach und nach unter „Durch noindex-Tag ausgeschlossen“. Das ist gewollt.
  - Mit S2 erscheint `/standorte/asslar` unter „Seite mit Weiterleitung“. Auch das ist gewollt.
  - Fehler wie „Serverfehler (5xx)“ oder „Nicht gefunden (404)“ bei Seiten aus der Sitemap sind dagegen ein Befund.
- **Bericht „Leistung“, Filter Seite `/standorte/wetzlar`:** Ab wann erscheint die Seite für Suchanfragen mit „Wetzlar“? Ziel ist, dass für „Fliesenleger Wetzlar“ diese Seite erscheint und nicht mehr die Startseite oder eine Fachseite.

## 4. Vergleich nach 4 und 8 Wochen

Je Zielseite aus dem Plan, Abschnitt 2, aus dem Bericht „Leistung“ der Search Console, immer mit Zeitraum:

| Cluster | Zielseite | Messgröße |
|---|---|---|
| Marke | `/` | Klicks und Impressionen für Suchanfragen mit „Tezgel“ |
| Aßlar | `/` | Suchanfragen mit „Aßlar“: Impressionen, Klicks, mittlere Position |
| Wetzlar | `/standorte/wetzlar` | Suchanfragen mit „Wetzlar“: Welche Seite erscheint, mit welcher mittleren Position? |
| Badsanierung | `/bad/badsanierung` | Impressionen und Klicks; erscheinen andere Seiten für dieselben Anfragen? |
| Barrierefreies Bad | `/bad/barrierefreies-bad` | Impressionen und Klicks |
| Kontakt | `/kontakt` | Anfragen im Postfach; nach P6 die Quelle in jeder Mail |

- **Kannibalisierung prüfen:** Für jede Suchanfrage oben sollte möglichst nur eine Seite der Website erscheinen. Erscheinen zwei, gehört das in den Bericht.
- **Anfragen zählen:** Die Search Console misst keine Anfragen. Bis P6 die Quelle mitschickt, zählt Deniz die Anfragen grob nach Weg (Telefon, WhatsApp, Formular).
- **Ereignisse** wie Anruf, WhatsApp oder Formular messe ich nur nach Umuts Freigabe für Tracking und nur mit Einwilligung der Besucher. Die Cookie-Einwilligung bleibt, wie sie ist.

## 5. Was ich nicht mache

- keine bezahlten Werkzeuge, keine eigenen Abfragen der Google-Suche;
- keine Positionen ohne Quelle und Datum;
- keine Einträge oder Änderungen in der Search Console, bei Bing oder in Verzeichnissen; das macht Umut.
