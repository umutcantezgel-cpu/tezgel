# Tor r02-e039 · R-02a (Rahmen II) + R-02b (Baustein-Reste) + /faq Rechner direkt · live 1d837bd → 9988385 · 13.10.2026

Inhalt: R-02b f60a8f6 (Sprungziele ohne scroll-mt auf /untergrund-abdichtung und /#portal-netzwerk, weiches Trennzeichen
in den Überschriften von /balkon-terrasse/balkonsanierung und /agb, Register t768; **Rechner-Umbau nicht übernommen**),
R-02a 0d231ed (Kopf als Container – bedienbar bei 200 % Zoom, Menüblatt bildschirmhoch, Planblatt md–lg neben dem
Schriftfeld, `.spaet-zeichnen` mit overflow-clip-margin für Fokusringe, Leitachse ohne gezogenes Stück in den
Anfahrt-Abschnitten der Stadtseiten), 9988385 (/faq bindet den Rechner wieder direkt ein, KERN K-007 ergänzt).

## Automatische Stufen (tor-s.sh, BEREICH_AUCH='*', TOR_PORT 4366, Pixel gegen live 4365)
- Grün: Sperrklinke, Reinraum, Bereich (Rahmenänderung: alle Seiten, keine neu/weg), Werte 0, texte2 rot 0, axe 0
  ernst/kritisch, Wortbruch 0, Fotos 56/0, **Specs 380 bestanden, 0 rot**, Pixel-Stichprobe 10 Vergleiche 0 abweichend
  (m375, d1440 – die Planblatt-Änderung wirkt nur md–lg).
- `05-altsystem` rot mit 3 Treffern = Fehlalarm: Datenschlüssel `link.featured.eyebrow` (Header) und `hub.eyebrow`
  (Fachbereiche), keine Klassen (bekannt seit r01-e039). Muster in `tor-s.sh` nachgeschärft: „eyebrow“ zählt nur noch als
  Klassenname in einer Zeichenkette (Selbsttest: Datenschlüssel und Objektschlüssel nein, `className="eyebrow …"`,
  `clsx('eyebrow', …)` und Template-String ja). Neu gelaufen auf denselben Dateien: **0 Treffer**
  (`tor/05-altsystem-nach.log`).

## a11y-zusatz (14 Seiten) gegen live (`belege/r02-e039-live-ref/`, 7 Seiten, gleiche Prüfungen)
- Harte Kennzahlen 0.
- Zoom (CSS 200 %): „nie im Bild“ live 49 → **0**, Überlauf 119 → 21 (14 Seiten); `verdeckt` 1 = /kontakt d1280
  (Telefon-Knopf unter der Karte) – live gleich.
- Textabstand: abgeschnitten 4 = /kontakt m375 (Städtenamen in der Kartenliste, `truncate`) und die H1 der Stadtseiten
  /standorte/giessen, /standorte/wetzlar (15 px) – **live gleich** (4); Kandidat für ein Folgepaket.
- Ohne JS `text_unter_80`: live 6 (/faq, /bad, /preise) → 4 (/bad, /preise; /faq mit direktem Rechner behoben). /bad und
  /preise laden Funnel bzw. Rechner bewusst nach (R-01b, Lighthouse e6-e039) – Platzhalter mit Telefon/WhatsApp/E-Mail.
- `sprung_rueckwaerts` und `fokus_verdeckt` je Seite wie live (Rechnerseiten d1440; Banner beim Erstbesuch, M-21).

## Lighthouse (Last 2,5; 5 verschränkte Paare, live 4365 gegen 4366; `belege/r02-e039-lh/`) – alles innerhalb der Streuung oder besser
| Seite | mobil Punkte · TBT | Desktop Punkte · LCP |
|---|---|---|
| / | 90 → 91 · 134 → 86 ms | 100 → 100 · +55 ms |
| /faq | 95 → 96 · 166 → 97 ms (JS 281 → 270 KB, Rechner direkt) | 100 → 100 · ±0 |
| /standorte/giessen | 95 → 95 · 143 → 180 ms | 100 → 100 · +35 ms |

## Ergebnis
Grün. Push des geprüften Produktstands 9988385 (danach nur Belege und Prüfwerkzeug).
