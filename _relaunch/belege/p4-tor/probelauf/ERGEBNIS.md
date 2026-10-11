# Probeläufer P4-Tor (Z-04, L3) · Vorschau 1c6c9cd-v (`/` und sechs Hauptseiten im Kern)

## Freie Läufe (P4-11, Haiku, Satz p4-tor) gegen Bezugswerte (PROBELAUF §7)
| Aufgabe | m375 Touch (Bezug) | d1440 Maus (Bezug) | d1440 Tastatur (Bezug) |
|---|---|---|---|
| 1 | 3 (4) ✓ | 2 (2) ✓ | 21 (23) ✓ |
| 2 | 4 (4) ✓ | 1 (2) ✓ | 12 (12) ✓ |
| 3 | 8 (12) ✓ | 5 (5) ✓ | 29 (34) ✓ |
| 4 | 5 (8) ✓ | 1 (1) ✓ | 8 (8) ✓ |
| 5 | 11 (10) Umweg, s. Gegenprobe | 5 (5) ✓ | 35 (114) ✓ |
15/15 gelöst, 0 Befunde „hoch“, 6 mittel, 6 gering (`../../../pakete/P4-11.rueckgabe.md`). Mittel M1–M5: Kopfnavigation mit Link und Untermenü-Knopf je Rubrik kostet die Tastatur Tabs (Aufgaben trotzdem ≤ Bezug). M6: Der Ablauf steht nicht auf der Übersicht `/bad` → Auflage W1.

## Gegenprobe (Wege des Ausgangsstands unverändert, E-023)
| Aufgabe | m375 Touch (Bezug) | d1440 Maus (Bezug) | d1440 Tastatur (Bezug) |
|---|---|---|---|
| 1 | 3 (4) ✓ | 2 (2) ✓ | 21 (23) ✓ |
| 2 | 4 (4) ✓ | 2 (2) ✓ | 12 (12) ✓ |
| 3 | **14 (12) ✗** | 5 (5) ✓ | 29 (34) ✓ |
| 4 | 5 (8) ✓ | 1 (1) ✓ | 8 (8) ✓ |
| 5 | 10 (10) ✓ | 5 (5) ✓ | 35 (114) ✓ |
- a1-m375 und a5-m375 mit den Kern-Namen des Mobilmenüs (Fassung aus d548), a3-m375 mit dem Kern-Namen des Absende-Knopfs („Anfrage senden“, MIKROTEXTE P3-00j); a5-d1440-tastatur nach Werkzeugfehler einmal wiederholt (Protokoll).
- **a3-m375 +2:** Der Weg führt jetzt durch das Kern-Anfrageformular auf `/kontakt` (bei der P3-Gegenprobe war `/kontakt` noch Bestand). Schritt 3 des Kern-Formulars ist mobil höher: Telefonfeld und Absende-Knopf liegen je einmal unter dem Bildrand (je 1 Bildlauf). Ursache: Beim Schrittwechsel geht der Fokus auf die Schrittüberschrift, die schon im Bild ist, also rollt der Browser nicht; die Felder bleiben unten. → Auflage W9 (Freischaltung `/kontakt`): Schrittwechsel richtet die Überschrift oben aus, Dichte von Schritt 3 mobil prüfen; Ziel ≤ 12.

Werkzeug: Die Konsolenausgabe nennt nach jedem Lauf die Namen der Zielbedingungen (E-031); gleiche Bedingungen wie beim Ausgangsstand.
