# TBT mobil auf /kontakt: vorher 9c98aa9a gegen nachher e222f6d3

Quelle: Rohberichte `_werkstatt/cache/lighthouse/leist4-{v1,v2,n1,n2}/kontakt-mobil-*.report.json` (je 3 Läufe, Lantern-Simulation).

| Lauf | FCP ms | TBT ms | Hauptthread ms | Skriptzeit ms | lange Aufgaben (Start beobachtet ms / Dauer ms / Quelle) |
|---|---|---|---|---|---|
| v1-0 | 1208 | 56 | 1723 | 771 | 754/120/Unattributable; 884/54/kontakt; 938/72/kontakt; 1010/54/kontakt; 3161/162/2oi9n3b4syua3.js |
| v1-1 | 1208 | 63 | 1614 | 726 | 754/100/Unattributable; 913/101/kontakt; 3162/176/2oi9n3b4syua3.js |
| v1-2 | 1208 | 63 | 1661 | 733 | 754/123/Unattributable; 944/110/kontakt; 3162/176/2oi9n3b4syua3.js |
| v2-0 | 1208 | 63 | 1682 | 805 | 754/111/Unattributable; 920/100/kontakt; 3162/176/2tbu000sg63yb.js |
| v2-1 | 1206 | 58 | 1576 | 656 | 753/127/Unattributable; 933/120/kontakt; 3159/165/2oi9n3b4syua3.js |
| v2-2 | 1207 | 64 | 1602 | 747 | 753/84/Unattributable; 883/120/kontakt; 3160/178/2oi9n3b4syua3.js |
| n1-0 | 1056 | 154 | 1640 | 782 | 753/100/Unattributable; 899/92/kontakt; 3009/204/2tbu000sg63yb.js |
| n1-1 | 1058 | 126 | 1685 | 815 | 754/95/Unattributable; 913/89/kontakt; 3012/176/2tbu000sg63yb.js |
| n1-2 | 1057 | 130 | 1615 | 672 | 753/104/Unattributable; 910/112/kontakt; 3010/180/2oi9n3b4syua3.js |
| n2-0 | 1058 | 201 | 1893 | 839 | 754/95/Unattributable; 898/142/kontakt; 1062/81/kontakt; 3012/216/2oi9n3b4syua3.js; 3228/58/2tbu000sg63yb.js |
| n2-1 | 1062 | 115 | 1779 | 805 | 756/122/Unattributable; 932/111/kontakt; 3017/165/2oi9n3b4syua3.js |
| n2-2 | 1054 | 135 | 1810 | 785 | 752/96/Unattributable; 969/88/kontakt; 3006/185/2tbu000sg63yb.js |

- Median fcp: vorher 1208, nachher 1057
- Median tbt: vorher 63, nachher 132
- Median main: vorher 1638, nachher 1732
- Median boot: vorher 740, nachher 795

**Lesart:** Dieselben drei langen Aufgaben in beiden Ständen (Dokument und Inline-Skripte bei rund 750 und 900 ms beobachtet, das Laufzeit-Stück bei rund 3.000 bis 3.160 ms), mit gleicher Dauer. Hauptthread vorher 1.576 bis 1.723 ms, nachher 1.615 bis 1.893 ms: Runde n1 liegt ganz in der Vorher-Spanne, n2 darüber; TBT ist aber in beiden Runden gleich erhöht (n1 126 bis 154, n2 115 bis 201 ms), hängt also nicht an der Menge der Arbeit. Der erste Inhalt kommt aber 150 ms früher (eine render-blockierende Datei weniger). TBT zählt nur die Blockierung zwischen FCP und TTI; mit dem früheren FCP fällt im simulierten Ablauf ein größerer Teil der frühen Aufgaben hinter den FCP und zählt mit. Der Anstieg ist eine Folge der Definition, keine zusätzliche Arbeit. Budget TBT ≤ 200 ms: Median 132 ms, erfüllt.
