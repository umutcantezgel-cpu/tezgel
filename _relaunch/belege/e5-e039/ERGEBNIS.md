# Tor e5-e039 · E5-Welle + S-21 Karriere + Sternefix · live b913dfd (Produkt a06bd36) → 5be70eb · 12.10.2026

Inhalt: S-12 Untergrund-Rest (6c94c51), S-13/S-14 Balkon/Terrasse (c1dd8a1, 53b06cf), S-15/S-16 Naturstein und
Fliesenreparatur (73dd96f, 3810261), S-17/S-18 Treppen (e98e281, dbca16b), S-19 Schadensanalyse (b2feb9d), S-21 Karriere
(5be70eb), Bewertungssterne mit `role="img"` auf sechs Seiten (c102676). Produktänderungen nur in den 22 Seitendateien.

## Automatische Stufen (tor-s.sh, TOR_PORT 4364, Pixel gegen live 4363) – alle grün
- Sperrklinke, Reinraum (npm ci, Build, Typprüfung, Lint, Tests, qa:graph), Bereich (HTML nur auf den 22 Seiten), Werte 0,
  Altsystem 0, texte2 rot 0, axe 0 ernst/kritisch (123 Läufe mit Zuständen), Wortbruch 0, Fotos 88/0 (Überlauf 0,
  Konsole 0), **Specs 380 bestanden, 0 rot** (26 übersprungen).
- Der Spec „404 → Zur Startseite“, im Dev-Server unter Last mehrfach rot (S-21 ff.), ist am Produktions-Build grün.
- Pixel 22 Vergleiche, 1 abweichend: `/standorte/giessen` d1440 (Rückfrage-Zeilen, Farbe statt Lage) – unveränderte Seite.
  Gegenproben: 4364 gegen 4364 einmal abweichend, danach 2× 0; 4363 gegen 4364 2× 0 (m375, d1440). Messrauschen unter
  Last (Last 11–19 während des Tors), keine Änderung.
- axe nachgeprüft mit `spaetZeichnen` (d6cfa98, zeichnet spaet-Abschnitte vor der Prüfung): 123 Läufe, 0 ernst/kritisch
  (`belege/e5-e039-axe2/`).

## a11y-zusatz (22 Seiten, 286 Läufe)
- Harte Kennzahlen 0: Falle, Zyklus, Sprunglink, Rücksprünge, Reflow/Zoom waagerecht, Textabstand waagerecht,
  forced-Felder, ohne JS (Text, erster Bildschirm, Navigation).
- Weich: Fokus verdeckt 13 gesamt (je Seite 0–4, davon fest 6), Zoom „nie im Bild“ 7 je Seite (Kopf bei CSS-Zoom 2,
  R-02), Textabstand abgeschnitten 1 (/balkon-terrasse/balkonsanierung m375, H2 ragt 3 px über – R-02).

## Lighthouse (ruhiges Fenster, mobil, 5 verschränkte Paare, live 4363 gegen 4364)
Siehe `belege/e5-e039-lh/lighthouse-vergleich.json` (Nachtrag unten).
