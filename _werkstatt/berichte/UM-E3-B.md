# UM-E3-B · Referenztor, Prüfstufe B für `/` · Kern-Version 4.4 · 28.10.2026

Gemessen am Reinraum 1d101816, Server 4324. Alle Werkzeuge liefen als Skript (E-076), Belege in `belege/um-e3/b/`, Lighthouse in `belege/um-e3-leistung/` und `belege/um-e3-leistung-br/`.

| Kriterium | Methode Stufe B | Ergebnis | Schwelle | Urteil |
|---|---|---|---|---|
| Z-02 | Build, volle Suite in beiden Zuständen, Konsole | Reinraum grün (Build, Typen, Lint, Tests, Graph); Suite mit Bewegung 398/0/26; ohne Bewegung 397/1/26, der eine rote Test (Schnellanfrage /standorte/wetzlar) danach 96/96 in vier Wiederholungen; Konsole 0 | alles grün | erfüllt (Zufallsfehler belegt) |
| Z-04 | `werte.mjs --basis 51355ef7` (alle Dateien der Etappe E3) | 35 Dateien, 1073 Klassenvorkommen, 0 Befunde | 0 | erfüllt |
| Z-06 | Register, reduziert, ruhiger Schalter, Bildrate, Bildfolgen | Register 8 Kennungen, 0 unbekannt; reduziert und ruhig 0 Bewegungsbefunde; Bildrate m390 bei 4× Drosselung 1,44 % verworfen, 0 Long Animation Frames; Einzelbilder für eingang, zeilenmaske, sig-flucht, leitachse in m390 und d1440 | ≤ 5 %, 0 LoAF über 20 ms, keine Lage- oder Größenänderung | erfüllt |
| Z-07 | Reaktion m390 bei 4× Drosselung (Scrollen gedrosselt über die Bildrate) | 15 Läufe in wechselnder Reihenfolge: Hauptknopf Median 192 ms, Menü 192 ms, Eingabe 96 ms, Link 120 ms (Stand vor UM-E3-W3: 152, 176, 80, 96 ms; E0: 608 ms) | ≤ 200 ms | erfüllt, knapp; Anstieg um 16 bis 40 ms seit 5c2481e0, Verdacht Dokumentregeln der Speculation Rules, Prüfung in UM-E4-LEISTUNG |
| Z-08 | `svg.mjs` für `/` | 180 Inline-SVG je Ansicht, 0 Befunde (d1440, m390) | 0 | erfüllt |
| Z-09 | axe vier Größen mit Menü, Dialog und Erstbesuch | 33 Läufe, 0 ernste oder kritische Knoten | 0 | erfüllt |
| Z-10 | Lighthouse mobil, Median aus drei, wechselnde Reihenfolge | Leistung 94 (gzip) bzw. 96 (Brotli), LCP 2,70 s, TBT 92 bis 155 ms, CLS 0 | Leistung ≥ 90, LCP ≤ 2,5 s | Leistung erfüllt; LCP nicht erfüllt, Ausnahme A-1 (E-085) |
| Z-11 | `bildsatz.mjs` vier Größen | 111 Aufnahmen, 0 Fehler, 0 Überlauf, 0 Überlappung, 0 Konsolenmeldungen | 0 | erfüllt |

## Gesamturteil
Prüfstufe B für `/` ist bestanden, mit einer Ausnahme: LCP mobil 2,70 s statt 2,5 s (A-1, E-085). Alle übrigen Schwellen sind erfüllt. Z-07 liegt knapp unter der Grenze, deshalb steht es für UM-E4-LEISTUNG auf der Liste. Die Sichtabnahme (Z-05) folgt in UM-E3-SICHT an den Bildern dieser Stufe.
