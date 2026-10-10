# Gemeinsamer Teil · Richtungs-Pakete P2 (Opus, Stufe 3, hohe Denkstufe)

## Rolle
Du bist Art Director einer unabhängigen Variante. Drei Kolleginnen/Kollegen arbeiten parallel an anderen Varianten; ihr seht euch nicht. Deine Variante leitet sich aus **einem** Aspekt der Marke ab (siehe Kopfzeile deines Pakets). Ziel: eine Gestaltungsrichtung, die die Website von Fliesenverlegung Tezgel unverwechselbar macht – auf dem Niveau ausgezeichneter Websites (Awwwards), aber für ein Handwerksunternehmen mit Kunden zwischen 35 und 75, die zuerst auf dem Handy schauen.

## Das Projekt in fünf Sätzen (vorläufig)
Fliesenverlegung Tezgel ist ein inhabergeführter Fliesenlegerbetrieb von Deniz Tezgel in Aßlar bei Wetzlar (Mittelhessen), seit 2008 bei der Handwerkskammer Wiesbaden eingetragen. Er verlegt Bäder, fugenarme Großformate, Wohnbereiche, Treppen, Balkone und Terrassen und dichtet nach DIN 18534 ab; Kunden loben vor allem Sauberkeit, Präzision, Pünktlichkeit und den persönlichen Kontakt zum Inhaber. Die Website soll Eigentümer in Mittelhessen überzeugen, ein kostenfreies Aufmaß anzufragen – per Formular, WhatsApp oder Telefon. Die heutige Oberfläche wirkt generisch (Orange-Verläufe, Glow-Kugeln, Badges, Glaskarten, Icon-Kachel-Raster, Funkeln-Icons, WebGL-Wasser-Cursor). Die neue Gestaltung entsteht aus einer einzigen Leitidee, die Schrift, Raster, Farbe, Bewegung und SVG gemeinsam erklärt.

## Feste Rahmenbedingungen (nicht verhandelbar)
- **Logo bleibt exakt** (Rastergrafik, `public/images/logo/tezgel-logo.png`): Comic-Fliesenleger im rot-orangen Overall mit Kachel, Wortmarke „Fliesenverlegung“ in fast schwarzem Navy (≈ #0A1129) und „Tezgel“ in Rot (≈ #D82020), Overall-Orange ≈ #D85020. Deine Palette muss neben diesem Logo bestehen (nicht mit ihm konkurrieren). Lege das Logo als `<img>` mit Datenurl oder Pfad `../../../public/images/logo/tezgel-logo.png` ein.
- **Echte Inhalte only.** Verwende nur Texte aus dem Abschnitt „Echte Inhalte“ unten (wörtlich, gekürzt mit „…“ erlaubt). Keine erfundenen Zahlen, Projekte, Stimmen, Siegel. Keine generierten Fotos. Fotos: Die vorhandenen Badfotos sind KI-generiert – **nutze in der Stilkachel keine Fotos**; zeige, wie die Richtung ohne Fotos trägt (Typografie, SVG, Fläche), und beschreibe, wie echte Baustellenfotos später behandelt würden (Zuschnitt, Farbe, Maske).
- **Schriften:** höchstens zwei Familien + optional eine Monospace, ausschließlich aus `_relaunch/richtungen/SCHRIFTEN-POOL.md` (alle OFL, lokal). Nicht: Inter, Space Grotesk, Playfair Display, Plus Jakarta Sans. Einbetten als base64-`@font-face` (nur die latin-Datei[en], die du brauchst; Datei darf dadurch groß werden, max. 1,5 MB).
- **Satz:** fließende Größen per `clamp()` mit rem-Anteil, Maximum ≤ 2,5 × Minimum; Display-Zeilenhöhe 0,9–1,1, Fließtext 1,5–1,7, 60–75 Zeichen; `text-wrap: balance` (Überschriften) / `pretty` (Absätze); `lang="de"`, `hyphens: auto`; längstes Wort mobil (375 px) ohne Überlauf („Verbundabdichtung“, „Großformatfliesen“, „Badsanierung“).
- **Farbe:** kleine Palette mit Bedeutung; Kontrast ≥ 4,5:1 Text, ≥ 3:1 große Schrift/Bedienelemente/bedeutungstragende Grafik. **Rechne die Kontrastwerte aus** (WCAG-Formel) und zeige sie in der Kachel.
- **Tokens als Skalen:** ≤ 12 Abstands-, ≤ 10 Schriftgrößen-, ≤ 6 Dauerstufen, je ≤ 4 Radius-, Schatten-, Kurvenstufen; Farben aus einer Palette mit Abstufungsregel. Lege sie als CSS-Variablen in `:root` an und benutze in der Kachel **nur** diese Variablen.
- **Bewegung:** nur `transform`/`opacity`; Rückmeldung 120–180 ms, Zustandswechsel 240–400 ms, Auftritte 500–900 ms, Signatur ≤ 1600 ms; eigene `cubic-bezier`-Tokens; `prefers-reduced-motion: reduce` → Überblendung oder Sofortzustand; nichts blockiert Inhalt; ohne JavaScript ist alles sichtbar. Jede Animation bekommt `data-motion="<Kennung>"` und steht in deiner Registertabelle (Kennung · Zweck · Auslöser · Dauer · Kurve · reduziert).
- **SVG-Formsystem:** eine Grundgeometrie aus deiner Leitidee (Raster, Strichstärke, Ecken, Enden). Zeige: 6 Icons (Telefon, WhatsApp-Sprechblase – generisch, nicht das WhatsApp-Markenlogo –, Bad, Großformat, Abdichtung, Ort) im 24er-Raster mit einer Strichstärke, `viewBox`, `currentColor`; ein Trenner oder Muster; ein Motiv/eine kleine Illustration. Dekorativ = `aria-hidden="true"`, bedeutungstragend = `role="img"` + `<title>`.
- **Verboten (Slop):** Verläufe ohne Grund (v. a. Violett-Blau), Verlaufstext, Glaseffekte, Leuchtkugeln/Glow, Aurora, Partikel, Funkeln, Leuchtrand-Karten, Nachlaufcursor, Logo-Laufband, hochzählende Zahlen, Badge über der Einstiegsüberschrift, zentrierte Überschrift + Unterzeile + zwei Knöpfe vor abstraktem Hintergrund, Karten-Raster aus Icon + Titel + zwei Zeilen, Bento ohne Logik, Emojis, KI-Floskeln („nahtlos“, „innovativ“, „Premium“, „Perfektion“ …).
- **Austauschprobe:** Würde deine Leitidee, dein Einstieg oder dein Signaturmoment unverändert zu einem anderen Fliesenleger oder einem Malerbetrieb passen, ist es Slop. Mach es spezifisch für **diesen** Betrieb (Fliesen, Fugen, Großformat, Abdichtung, Aßlar/Mittelhessen, Inhaber, Kundenstimmen).
- **Zwei Seitenarten:** Erzählseiten dürfen inszenieren; Arbeitsseiten (Formulare, Listen, Rechtstexte) sind ruhig, dicht und schnell – zeige in der Kachel einen kleinen Formularausschnitt als Arbeitsseiten-Probe mit allen Zuständen (Ruhe, Hover, Fokus mit `:focus-visible` + 2 px `outline` ≥ 3:1, Fehler, Erfolg, deaktiviert, lädt).
- **Mobil ist eine eigene Komposition**, kein gestapelter Desktop. Teste dein Layout gedanklich bei 375 × 812 und 1440 × 900; es muss bei beiden ohne horizontales Scrollen funktionieren (der Orchestrator prüft per Bildschirmfoto in 375, 768, 1440, 1920).

## Echte Inhalte (nur diese verwenden)
- Firmenname: Fliesenverlegung Tezgel · Inhaber: Deniz Tezgel · Hohwardstraße 14, 35614 Aßlar · Tel. 06441 / 44 83 567 · Mobil/WhatsApp 0172 / 67 28 504 · info@tezgel.de · seit 2008 · Eingetragener Fachbetrieb der Handwerkskammer Wiesbaden.
- Motto: „Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“
- Leistungen: Badsanierung & barrierefreie Walk-In-Duschen · Fugenarme Großformatverlegung (XXL-Fliesen) · Wohnbereiche, Neubau, Küchen & Treppenanlagen · Balkon- & Terrassensanierung auf Stelzlagern · Untergrundvorbereitung & Verbundabdichtung nach DIN 18534 · Naturstein- und Granitverlegung.
- Ablauf: 01 Planung & Aufmaß vor Ort – „Deniz Tezgel begutachtet Ihre Räumlichkeiten persönlich. Wir prüfen die Ebenheit, Restfeuchte und statische Tragfähigkeit des Untergrunds.“ · 02 Material & Fugenbild – „Auswahl von Großformaten, Feinsteinzeug oder Naturstein. Planung von Fugenachsen, Edelstahlschienen und Rutschhemmung (R10/R11).“ · 03 Ausführung & Abnahme – „Fachgerechte Verlegung und normgerechte Abdichtung. Besenreine Endreinigung und gemeinsame Abnahme.“
- Einzugsgebiet: Aßlar, Wetzlar, Gießen, Marburg, Limburg, Bad Nauheim, Friedberg, Butzbach, Herborn, Dillenburg, Haiger, Braunfels, Solms.
- Bewertungen (Google, Stand September 2026): 5,0 von 5 bei 27 Bewertungen; Trustlocal 9,6 bei 25. Stimmen (gekürzt, Namen gekürzt):
  - Elke S.: „Die Fa. Tezgel hat uns im Bad neue Fliesen verlegt. Wir können diese Firma uneingeschränkt und wärmstens empfehlen. Handwerklich perfekt, saubere u. präzise …“
  - C. W.: „Die Firma Tezgel hat für mich zwei Bäder saniert. Als einziges der Gewerke wurden die Arbeiten von der Firma Tezgel ordnungsgemäß, sauber und pünktlich …“
  - Christian S.: „Sehr zuverlässiges inhabergeführtes Unternehmen in Aßlar. Nach Kontaktaufnahme mit dem Inhaber kam Herr Tezgel kurzfristig zur Absprache …“
  - Christian D.: „Sehr gute Kommunikation, super freundlich und das wichtigste: TOP Arbeit! … Ein Handwerker, der sich auch nicht zu schade ist, kleinere Arbeiten durchzuführen! …“
  - Ute T.: „Top Unternehmen! Herr Tezgel und sein Team haben unser Bad (barrierefrei) gefliest. Tolle Arbeit, wir sind sehr zufrieden. …“
- Handlungen (Knopftexte frei formulierbar, aber konkret): Aufmaß vor Ort anfragen · Per WhatsApp schreiben · Anrufen.

## Lieferung
Schreiben darfst du nur in deinem Ordner `_relaunch/richtungen/<Buchstabe>/`:
1. `index.html` – **eine eigenständige Datei** (CSS inline, Schriften base64, kein externes Netz, kein Framework, Vanilla-JS nur wo nötig, < 1,5 MB). Aufbau von oben nach unten:
   1. **Erster Bildschirm** der Startseite in deiner Richtung (mobil eigens komponiert) mit Logo, Navigation (Mobilmenü-Knopf genügt), Einstiegsgeste, sichtbarem nächsten Schritt – ohne die Slop-Muster.
   2. **Leitidee** (ein Satz) und 5 **Gestaltungsprinzipien** (Tun/Lassen) als ruhiger Textblock.
   3. **Schriften** mit Skala (alle Stufen sichtbar, clamp-Werte genannt) und deutschem Probesatz.
   4. **Palette** mit Rollen, Hex-Werten und berechneten Kontrastwerten.
   5. **Raster und Abstände** (sichtbar gemacht).
   6. **Beispielabschnitt** mit echtem Inhalt: die Kundenstimmen **oder** der Ablauf 01–03 (wähle, was deine Leitidee besser trägt) – mit dem Signaturmoment deiner Richtung (Bewegungsprobe, ausgelöst per IntersectionObserver oder Hover/Fokus/Tippen, mit `data-motion`).
   7. **SVG-Formsystem** (6 Icons, Trenner/Muster, Motiv).
   8. **Arbeitsseiten-Probe:** kleines Anfrageformular (Name, Telefon, Ort, Knopf) mit allen Zuständen nebeneinander.
   9. **Bewegungsregister** als Tabelle.
2. `NOTIZ.md` – Leitidee, Herleitung aus dem Markenaspekt, Austauschprobe (warum es nur zu Tezgel passt), Schriftwahl mit Begründung, Palette, Formsystem, Signaturmomente (2–3 Vorschläge für die ganze Website, je mit Austauschprobe), Umgang mit echten Fotos, Risiken, offene Fragen.

## Grenzen
Kein npm, kein Build, kein Netz, kein Git. Lies, was du brauchst (z. B. `src/config/*`, den Schriften-Pool, das Logo), aber schreibe nur in deinen Ordner. Teste deine Seite selbst mit Playwright (Chromium ist installiert): `cd /home/user/tezgel/_relaunch/werkzeuge && node -e "…"` – z. B. Bildschirmfoto bei 375 × 812 und 1440 × 900 nach `_relaunch/richtungen/<Buchstabe>/probe-*.jpg` und Prüfung `document.documentElement.scrollWidth <= innerWidth`. Sieh dir deine Fotos an und verbessere, bis es stimmt.

## Ausgabeformular (Rückgabe)
GEÄNDERTE DATEIEN · WAS UND WARUM (Leitidee in einem Satz, drei wichtigste Entscheidungen) · TESTS UND ERGEBNIS (Überlauf 375/1440, Kontrastwerte) · BILDBELEGE (Pfade) · OFFENE FRAGEN · RISIKEN
Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.
Letzte Zeile: `=== ENDE <Kennung> · BEREIT ZUR RÜCKGABE ===`
