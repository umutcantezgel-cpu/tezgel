# E0-DOK-01 · Rückgabe

## GEÄNDERTE DATEIEN
- `_werkstatt/bilder/e0/` (neu): 180 JPEG-Dateien in 12 Ordnern (je Seite ein Ordner), `index.json`, `LIESMICH.md`.
- `_werkstatt/pakete/E0-DOK-01.rueckgabe.md` (diese Datei).
Sonst nichts geändert.

## WAS UND WARUM
- Quelle: Bildsatz des Basisstands 745335f (`_werkstatt/cache/bildsatz/e0`, Index `_werkstatt/belege/e0/ausgang/bildsatz.json`). Keine neuen Aufnahmen.
- Auswahl: je Ansicht × Gerät höchstens 5 Ausschnitte statt 8. Erster und letzter aufgenommener Ausschnitt, dazwischen Index = round(k·(n−1)/4), k = 0..4; bei n ≤ 5 alle. Grund: Mit 8 wären es 287 Bilder und 16,6 MB gewesen, mit 6 noch 12,7 MB. Mit 5 sind es 10,4 MB (Grenze 12 MB).
- Ergebnis: 180 Bilder, 10.395.997 Bytes. Je Gerät: d1440 60 Bilder (4,87 MB), t768 60 (3,46 MB), m390 60 (2,06 MB).
- Kompression: JPEG, Qualität 60, progressiv, ohne Metadaten. Keine Quelldatei war breiter als 1440 px, daher nichts verkleinert.
- Ordner: Startseite `start`, Unterseiten mit den Namen aus dem Bildsatz-Cache (`leistungen__bad`, `standorte__wetzlar`, `fliesen__konfigurator`, `blog__rutschfeste-fliesen-r-klassen`).
- Index: je Bild Ansicht, Gerät, Ausschnitt-Nr., Scrollposition (y, y_wirksam), Maße, Bytes, Quelle, Messstand. Je Ansicht × Gerät Seitenhöhe, Auswahl und Feld `bis_seitenende`.
- Messstand 745335f ist Vorfahr von HEAD (db2619d). Die Bildsatz-Datei nennt keinen Commit; die Angabe stammt aus dem Briefing.

## GEMEINSAME DATEIEN
Keine Änderung nötig.

## PRÜFUNG UND ERGEBNIS
- 12 Ansichten × 3 Geräte = 36 Kombinationen. Erster und letzter Ausschnitt sind in allen 36 enthalten (Skriptprüfung).
- Alle 180 Dateien mit Pillow `verify` geöffnet; Maße stimmen mit dem Index überein; keine EXIF- oder ICC-Metadaten.
- Größe 10,4 MB (du: 11 MB), also unter 12 MB.
- `git status --porcelain` zeigt für diesen Auftrag nur `_werkstatt/bilder/` und die Rückgabe. Die übrigen geänderten Dateien im Arbeitsbaum stammen nicht von mir.
- Nicht erreicht: „Fuß = Seitenende“ in 14 Kombinationen (siehe OFFENE FRAGEN).
- Kein Build, kein Server, kein Browserlauf, kein Commit, kein Push.

## BILDBELEGE
Stichprobe, je Gerät 2 Bilder, angesehen:
- `m390/start/m390-00.jpg`: erster Bildschirm, Handy-Breite, korrekt.
- `m390/start/m390-11.jpg`: Seitenmitte („Bäder & Wellness“), nicht das Seitenende. Bestätigt den Befund unten.
- `t768/kontakt/t768-00.jpg`: erster Bildschirm Kontakt, korrekt.
- `t768/kontakt/t768-07.jpg`: Seitenende mit Fußzeile, korrekt.
- `d1440/blog/d1440-00.jpg`: erster Bildschirm Ratgeber, korrekt.
- `d1440/blog/d1440-07.jpg`: Fußzeile, korrekt.

## OFFENE FRAGEN
1. Seitenende fehlt in 14 Kombinationen. Der Bildsatz endet bei 12 Ausschnitten (Protokoll `max_ausschnitte: 12`). Betroffen sind alle 12 Seiten am Handy (letzter Ausschnitt bei y=9284; Seitenhöhen 10.243 bis 23.611 px), die Startseite am Computer (y=9900 von 12.882 px) und am Tablet (y=11264 von 17.253 px). Das liegt am Bildsatz, nicht an diesem Paket. Eine Neuaufnahme mit höherer Grenze braucht einen Browserlauf. Soll das so bleiben oder neu aufgenommen werden?
2. Obergrenze 5 statt 8 weicht von Schritt 2 ab, begründet mit der 12-MB-Grenze. Bitte bestätigen.
3. Keine Mikrotexte geändert. Keine Vorschläge für Überschriften.
