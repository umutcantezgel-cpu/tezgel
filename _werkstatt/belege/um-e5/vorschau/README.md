# Vorschau der Prüfstufe C auf 990b01e0 (1.11.2026)

E5-C Teil 1 (`e5c-1.sh`, Protokoll `e5c-1.log`) lief vollständig auf dem Endstand 990b01e0, gegen den Produktionsbau auf 4325, von 17:41 bis 20:49 UTC. Zur gleichen Zeit baute die Reparatur in einer Arbeitskopie. Bildrate und Zeiten gelten deshalb nur als Vorschau. Teil 2 (Lighthouse und Reaktion gegen E0) und die Probeläufe liefen nicht mehr, weil der Auftraggeber die Werkstatt angehalten hat (E-115). Live ging dieser Code-Stand, zusammengeführt mit main.

| Prüfung | Ergebnis |
|---|---|
| Reinraum 990b01e0 | grün: lint 0, test 280/280, qa-graph 0, Build |
| Stylesheets | eines je Seite auf 33 Adressen (Haupt, Zusatz, Stichprobe) |
| Adressen | 209 Adressen: 200 = 173, 308 = 4, 410 = 32, 404 = 0. Alle 202 Adressen aus E0 mit gleichem Status, neu: Logo-Dateien, /preise, zwei Filteradressen von /referenzen. 0 kaputte interne Links (`adressen-um-e5-c.csv`, `adressen-zusammenfassung.md`) |
| Funktionssuite | reduziert 398/0/26, Bewegung an 398/0/26 |
| Lesbarkeit | Hauptansichten 10/12 (rot nur die geschützten H1); Stichprobe 2 grün, 8 rot (Altbestand, Wortlaut nach Regel unverändert), Datenschutz ausgenommen |
| Werte seit E0 | 163 Dateien, 1 Befund `STAFFEL_MAX = 7` (K-005-Obergrenze, Stückzahl, Fehlalarm der Regel dauer_zahl) |
| SVG | DOM 0 Befunde auf allen geprüften Seiten; Dateien 0; Sprite mit `--animiert` (E-075) 0 |
| axe | Hauptansichten 396 Läufe 0, Zusatz und Stichprobe 660 Läufe 0 |
| ruhig / reduziert | 24 Läufe, 0 Befunde |
| Register | d1440 und m390 je 0 unbekannt, 0 ohne Register |
| Bildrate (Vorschau) | alle unter 5 % (/bad 3,93 %, übrige höchstens 0,51 %) |
| Strukturdaten | 113/113 grün, je Seite ein Service-Knoten |
| Erstes Bild | 240 Fälle, 212 bestanden, Ausfälle Fall für Fall wie vor der Runde (Cookie-Hinweis im Erstbesuch); Stichprobe 144 Ausfälle auf Altbestandsseiten |
| Bildsatz | 1.350 Aufnahmen, 1 Fehler (/ d1920), 0 Überlauf, 140 Überlappungen nur an der Leitachse (wie a3c28d36: 141), 0 Konsole; Stichprobe 1.043 Aufnahmen, 0 Fehler |
| Zugang (`zugang.mjs`) | Reflow 320 px 12/12 ohne Befund, erzwungene Farben 24/24 ohne Befund |
| Seitensuche | gefunden 24/24; Sprung sichtbar 20/24, wie E0 (20/24), Vergleich `suche-vergleich.txt` |
| Cursor | Glasbild „ansehen“, Tab und Verlassen blenden aus, Touch ohne Schild, ruhig ohne Übergang |
