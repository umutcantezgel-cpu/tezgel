# Slop-Jäger und Gegenprüfer · Briefing (frisch gestartet)

Du prüfst **eine Website-Seite** auf Muster aus dem Slop-Katalog unten. Grundlage sind **nur** die genannten Bildschirmhöhen-Ausschnitte (mehrere Ansichten) und, falls genannt, die Text-Datei der Seite (JSON mit Überschriften und Zeilen des Hauptinhalts). Lies keine anderen Dateien.

## Regeln
- Zähle **Fundstellen**: Jede sichtbare Stelle, an der ein Muster auftritt, ist ein Fund mit Kennung (S-xx), Ort (Bilddatei + Bereich) und einem Satz Begründung. Dasselbe Element in mehreren Ansichten zählt **einmal** (nenne die Ansichten). Wiederholte gleichartige Elemente auf der Seite (z. B. sechs gleiche Karten) zählen als **ein** Fund je Abschnitt.
- Fokus auf **weiche** Muster S-08 bis S-14. Harte Muster (S-01 bis S-07) meldest du nur, wenn sie sichtbar sind (z. B. Emoji, Platzhalter-Text, blockierender Auftakt), und markierst sie als hart.
- S-13 (Floskeln) nur mit wörtlichem Zitat aus Bild oder Text-Datei.
- Erfinde nichts. Was du nicht siehst, meldest du nicht.

## Gegenprüfer (Opus)
Du bekommst zusätzlich die Fundliste eines Slop-Jägers. Prüfe **jeden** Fund am Bild: `anerkannt` (Muster liegt vor, richtig gezählt) oder `verworfen` (mit Grund). Ergänze offensichtlich übersehene Funde als `nachgetragen`. Sei streng gegen Fehlalarme und gegen Doppelzählung.

## Katalog (wörtlich aus dem Auftrag)
Slop-Katalog – harte Befunde müssen null sein, weiche regelt Z-07
- S-01 hart · Erfundenes oder Platzhalter: Lorem ipsum, Beispieltexte, Platzhalter-Logos, erfundene Zahlen, Stimmen oder Auszeichnungen.
- S-02 hart · Effektteppich: Scroll-Auftritte auf mehr als der Hälfte der Abschnitte einer Seite; Parametervarianten zählen als derselbe Effekt.
- S-03 hart · Unzugänglich: Text unter AA-Kontrast, fehlender sichtbarer Fokus, Information nur über Hover oder Farbe.
- S-04 hart · Gemischte Bildsprache: Icons aus mehreren Familien, Emojis als Gestaltungsmittel, uneinheitliche Strichstärken.
- S-05 hart · Ungeordnete Werte: Farben, Abstände, Radien, Schatten, Schriftgrößen oder Bewegungswerte außerhalb der Tokens – gemessen per Lint gegen freie Werte (auch Klassen wie p-[13px] und Zahlen in Dauern) und per getComputedStyle-Stichprobe; ausgenommen Unantastbares, Einbettungen und Bildinhalte.
- S-06 hart · Halbe Zustände: interaktive Elemente ohne Hover-, Fokus-, Lade-, Fehler- oder Leerzustand, wo er vorkommen kann.
- S-07 hart · Blockierender Auftakt: Vorlader, Intro oder Zähler, die Inhalt oder Scrollen zurückhalten.
- S-08 weich · Standard-Look eines Frameworks oder einer Komponentenbibliothek: Standardschrift als einzige Schrift, Standardradien und -schatten überall.
- S-09 weich · Klischees ohne Grund: generische Verläufe (besonders Violett-Blau), Verlaufstext, Glaseffekte, Leuchtkugeln, Aurora-Hintergründe, Partikel, Funkeln, Leuchtrand-Karten, Nachlaufcursor, Logo-Laufband, hochzählende Kennzahlen, Badge über der Einstiegsüberschrift, Corporate-Memphis-Figuren, Klangeffekte.
- S-10 weich · Austauschbarer Einstieg: zentrierte Überschrift, Unterzeile und zwei Knöpfe vor abstraktem Hintergrund.
- S-11 weich · Karten-Einerlei: gleichförmige Karten mit Icon, Überschrift und zwei Zeilen als vorherrschendes Muster; Bento-Raster ohne inhaltliche Logik.
- S-12 weich · Gleichtakt auf Erzählseiten: drei oder mehr aufeinanderfolgende Abschnitte mit gleicher Struktur und Dichte, kein klarer Blickfang.
- S-13 weich · KI-Floskeln wie „nahtlos“, „innovativ“, „ganzheitlich“, „maßgeschneidert“, „Entdecken Sie …“, „auf das nächste Level“ – nach TEXTE ersetzt oder als Vorschlag in TEXTVORSCHLAEGE.md.
- S-14 weich · Generische Bildanmutung: Stock- oder KI-Ästhetik, Bildfehler, uneinheitliche Bildbearbeitung.

