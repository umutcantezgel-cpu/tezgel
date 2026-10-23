<!-- Gesichert aus dem Workflow-Protokoll der E0-Erkundung (23.10.2026, nur lesend, Haiku 5.5). Unverändert. -->

GEÄNDERTE DATEIEN: keine

BEFUNDE:

*Logodateien und Vektoren*
1. public/images/logo enthält 9 Dateien: tezgel-logo.png (640×200, RGBA), tezgel-logo.webp (640×200), tezgel-logo.svg (395.903 B), tezgel-logo-dark.png (640×200), tezgel-logo-dark.webp (640×200), tezgel-logo-dark.svg (395.903 B), tezgel-mark.svg (viewBox 0 0 64 64, 512×512, 977 B), tezgel-mascot.png (483×558), tezgel-mascot.webp (483×558).
2. Vektordateien: SVG ja. PDF, AI und EPS gibt es im Repo nicht (find ohne Treffer).
3. Die Wortmarken-SVGs (tezgel-logo.svg, tezgel-logo-dark.svg) sind keine echten Vektorlogos. Sie betten ein PNG 483×558 (die Figur) ein und setzen den Text als <text> in „Plus Jakarta Sans“ (Zeilen 2–4). Diese Schrift wird im Repo sonst nirgends geladen.
4. Der Code nutzt nur PNG und WEBP: src/shared/config/site.ts:145,148; src/components/common/Header.jsx:26 (tezgel-logo.webp, next/image 140×44, priority); src/components/common/Footer.jsx:75 (tezgel-logo-dark.webp, 220×68); src/components/blog/BlogAuthorCard.jsx:58; src/lib/schema.ts:80–86, 173, 260, 504, 603; src/lib/metadata.ts:156; src/lib/schemaPyramid.ts:324.
5. Keine Code-Referenz auf tezgel-mark.svg, tezgel-mascot.* oder die SVG-Logos. Nur die Belegdatei _relaunch/belege/t2-ad80754/svg.json (Zeilen 71–354) führt sie.
6. Kein Inline-SVG-Nachbau des Logos: keine Treffer für #DC2626, #0F172A, #EF4444 oder tz-glaze in src.
7. Logo, Sicht auf tezgel-logo.png: links eine gezeichnete, kniende Comicfigur, ein Handwerker in orangem Overall, grauer Weste und grauen Handschuhen, mit schwarzem Haar, der ein graues Fliesenschachbrett hochhält. Rechts zweizeilige Wortmarke: oben „Fliesenverlegung“ (Navy, fette Groteskschrift), unten „Tezgel“ (Rot, größer). Querformat, Figur links, Text rechts. Im SVG: Figur bei x=12, Breite 156, Höhe 180; Text ab x=180 (Schriftgrade 52 und 62).
8. Farben (Histogramm der PNG-Datei, Pixelzahl): Navy #0F172A (5944), Rot #DC2626 (3440), Dunkelgrau #202020 (633), Overall-Orange #DE5126 (485), Grau #8A8A88 (343). Dunkelvariante: Weiß #FFFFFF (5981), Rot #EF4444 (3440). Die Hex-Werte der SVGs stimmen überein.
9. Marke und Theme weichen ab: Logo-Navy #0F172A gegen --color-tinte #0A1129 (src/app/globals.css:25); Logo-Rot #DC2626 gegen --color-laser #D82020 (globals.css:26).
10. Maskottchen (tezgel-mascot.png): freigestellte Figur, Alpha-Mittel 0,47, dieselbe Figur wie im Logo. Keine Code-Referenz. Vermutung: Vorlage der Logo-Figur.
11. Konkreter Widerspruch bei OG-Maßen: site.ts:145–147 nennt tezgel-logo.png als ogImage mit ogImageWidth 1200 und ogImageHeight 630. Die Datei ist 640×200. metadata.ts:156–157 setzt dieselben 1200×630 für dieselbe Datei. schema.ts:82–83 nennt richtig 640×200.
12. site.ts:149 setzt logoSize: 512. Das passt zu keinem Logomaß. Keine weitere Verwendung gefunden. Vermutung: gemeint ist die Marke.
13. Favicons: src/app/icon.png und public/icon.png sind md5-gleich (192×192). src/app/apple-icon.png und public/apple-touch-icon.png sind md5-gleich (180×180). public/apple-touch-icon.png wird nirgends referenziert. public/favicon.ico enthält 16 und 32 px. _dokument.tsx:81–89 setzt /favicon.ico, /icon.png und /apple-icon.png.

*Eigene Icon-Familie*
14. 45 Icons: src/components/icons/svg/*.svg (45 Dateien), src/components/icons/sprite.svg (45 <symbol>), src/components/icons/namen.ts (ICON_NAMEN, 45 Einträge, generiert von _werkstatt/werkzeuge/sprite.mjs).
15. Alle 45 Symbole: viewBox 0 0 24 24, fill none, stroke currentColor, stroke-width 1.5, stroke-linecap square, stroke-linejoin miter. Icon.tsx:1 nennt „1,5-px-Strich“.
16. Icon.tsx:8–9: Größen 4/5/6 entsprechen size-4/5/6. Rechnung (Tailwind-Spacing 0,25 rem, Basis 16 px): Strichstärke 1,0 / 1,25 / 1,5 px bei 16 / 20 / 24 px. Standardgröße 5 (Knopf.tsx:27–29).
17. Icon wird in 123 Dateien importiert, es gibt 297 <Icon>-Aufrufzeilen (grep).
18. lucide-react: package.json:23 (^1.16.0). Importiert wird es nur in src/config/blog.js (Zeilen 1–10), src/config/company.js:4 und src/lib/formulare/useAnfrageFunnel.ts (Zeilen 1–10).
19. Übergangsschicht ohne Nutzer: src/components/icons/ersatz.tsx (134 Exporte) und src/components/icons/zuordnung.ts (135 Einträge) werden nirgends importiert. Einzige Nennung: karriere/page.jsx:29, im Kommentar.
20. Markenlogos außerhalb der Familie: src/components/ui/Markenlogos.tsx (Facebook, Twitter, LinkedIn; Phosphor-Pfade, MIT, Lizenz in LIZENZ-Phosphor.txt vorhanden), src/components/ui/WhatsAppLogo.tsx (#25D366), src/components/ui/GoogleIcon.tsx (#4285F4, #34A853, #FBBC05, #EA4335). Verwendung in 49 Dateien (grep).

*Animationen*
21. Register: _werkstatt/register.json (16 Kennungen), src/lib/motion/register.ts. Aktivierung über src/lib/motion/kopfskript.ts:9 nur bei prefers-reduced-motion: no-preference. Notaus nach 2 s ohne Modul (kopfskript.ts:9; bewegung.ts:43).
22. Tokens (globals.css:70–78): dauer-1 140 ms, dauer-2 320 ms, dauer-3 600 ms, dauer-4 800 ms, dauer-5 1200 ms, staffel 60 ms. Kurven: setzen cubic-bezier(0.2,0.8,0.2,1), laser (0.7,0,0.2,1), weg (0.32,0,0.67,0).
23. Reduzierte Bewegung global (globals.css:257–268): Übergangs- und Animationsdauer 0,01 ms, Iterationen 1.
24. sig-kreuzlinie (Einstieg.tsx:44,126,139,144; bewegung.css:504–521): Auslöser laden. Dauer 1200 ms linear, Nachfolge-Lot 320 ms nach 1200 ms. Waage und Lot wachsen aus dem Kreuzpunkt (scale). Reduziert: Linien voll.
25. sig-flucht (Einstieg.tsx:64; bewegung.css:523–536): laden. 800 ms setzen, Staffel 120/240/360 ms. H1-Zeilen rücken 12 px in die Flucht. Reduziert: Endstand.
26. sig-plan (Verlegeplan.tsx:121–122; Gewerk.tsx:35; bewegung.css:328–366): sicht (Schwelle 0,4, nur grobes Zeigegerät), Hover/Fokus, laden. 600 ms setzen beziehungsweise 800 ms mit 320 ms Verzögerung. Reihen um 0,35 Plattenbreite versetzt (Verlegeplan.tsx:125), rücken in die Flucht. Reduziert: Raster in Flucht.
27. szene-ablauf (SzeneAblauf.tsx:31–36; start/Ablauf.tsx:38; bewegung.css:378–414): Scroll über view-timeline je Plan, linear. Raster 15–45 %, Belag 30–50 %, Prüfmarken 20–48 %, Abnahme 45–55 %. Ersatzpfad ohne Timeline oder reduziert: alle Zustände fertig. leistungen/page.jsx:157 setzt bewegt={false}.
28. einzugsband (Einzugsband.tsx:35; in standorte/*, maps/*): laden. 600 ms setzen, Zonen versetzt um 300 ms und 600 ms. Kante wächst von links (scale). Reduziert: voll.
29. verband (VerbandUmschalter.tsx:71; bewegung.css:112–143): interaktion über :has(). 600 ms setzen, nur translate: 40 px (halb) beziehungsweise 26,7 und 53,3 px (drittel). Ohne :has(): drei Pläne untereinander.
30. leitachse: ReadingProgress.jsx:44 mit JS-Scroll-Listener (Zeile 31), ohne Übergang. Laserachse.tsx:8 über CSS scroll(root block), keyframes leitachse-ziehen, scale 1 0 zu 1 1. Reduziert: ReadingProgress ist per motion-reduce:hidden ausgeblendet (ReadingProgress.jsx:47). Laserachse bleibt grau (globals.css:365).
31. fugenband (bewegung.css:82–106): totes Regelwerk. .fugenband-rot hat 0 Treffer, .fugenband steht nur im Kommentar (CompanyHistory.jsx:6). CompanyHistory.jsx:31 zeigt nur die statische Linie.
32. anriss (ReviewCard.tsx:39; ReviewsSection.jsx:54; bewegung.css:19–41): sicht, Schwelle 0,5. 800 ms setzen, 2-px-Unterstrich wächst von links. Reduziert: voll.
33. auftritt (Fachgewerke.tsx:60; kern/Abschnitt.tsx:77,82; kern/Schrittfolge.tsx:45; bewegung.css:8–17): sicht, Schwelle 0,2. 600 ms setzen, opacity 0 zu 1, 8 px in die Flucht. Reduziert: sofort sichtbar.
34. notiert (termin/page.jsx:96; BadProjektCheck/Zusammenfassung.jsx:117; bewegung.css:217–225): beim Rendern. 600 ms setzen, Haken scale 0 zu 1 von links, opacity 0,4 zu 1. Reduziert: sofort.
35. laden (kern/Knopf.tsx:55 im Zustand laedt; LeadQuickForm.tsx:322; FliesenKonfigurator/Schritt4.jsx:140; BadProjektCheck/Zusammenfassung.jsx:240; termin/page.jsx:375; bewegung.css:227–247): endlos, 1200 ms linear, 30-%-Balken läuft über die Fuge. Reduziert: statischer Balken am linken Rand (aus dem CSS abgeleitet). Befund: Der Kommentar bewegung.css:227 nennt „ab 300 ms, mindestens 500 ms sichtbar – Steuerung in der Komponente“. In Knopf.tsx und den vier Verwendungsstellen gibt es keinen solchen Timer (grep auf 300, 500 und setTimeout ohne Treffer).
36. aufklappen (FAQAccordion.tsx:49,60; common/Header.jsx:167; common/MobileMenu.jsx:72,124; bewegung.css:151–165): interaktion. Zu 140 ms, auf 320 ms, grid-template-rows 0fr zu 1fr. Reduziert: 0,01 ms.
37. menue-blatt und mega-blatt (Klassen; MobileMenu.jsx:71, Header.jsx:166; bewegung.css:167–202): Menüblatt gleitet 320 ms von rechts (translate 100 % zu 0). Mega-Blatt: Deckkraft und 4 px. Reduziert: sofort, weil nur unter no-preference definiert.
38. druck (61 Attribute) und zustand (87 Attribute) (bewegung.css:204–215): Hover, Fokus, :active. 140 ms setzen; druck verschiebt :active um 1 px (nur ohne reduzierte Bewegung).
39. seitenwechsel: Gewerk.tsx:37–41, 94 (transitionTypes ['plan-vor']); ui PlanUebergang.jsx:6–10; leistungen/[id]/page.jsx:208–210; globals.css:328–340 (plan-morph, 800 ms). Der Plan gleitet beim Klick auf „Fachdetails“ in den Einstieg; der Kopf (kopf-anker, Header.jsx:108) bleibt stehen. Unter lg und reduziert: keine Animation.
40. Weitere Bewegung ohne Kennung: Tailwind motion-safe (6), motion-reduce (3), transition-colors (24); animate-*: 0 Treffer. Scroll-Listener: ReadingProgress.jsx:31, TableOfContents.jsx:43, SprungHalter.tsx:72, ReviewCarousel.tsx:59. requestAnimationFrame: bewegung.ts:56, BewegungsWaechter.tsx:11, SprungHalter.tsx:110–112, TableOfContents.jsx:39. matchMedia: bewegung.ts:53.
41. Keyframes: 13 @keyframes-Blöcke, alle in src/app/bewegung.css (Zeilen 67, 222, 244, 343, 351, 354, 412–414, 423, 495, 498, 501).
42. Intro oder Ladebildschirm: keiner. Es gibt keine loading- oder template-Datei unter src, und die Suche nach intro, splash und preloader ergab keine Code-Treffer. Die Startseite hat keine Intro-Sequenz; die Kreuzlinie läuft ab dem ersten Bild (Einstieg.tsx, bewegung.css:492–494).
43. Kern-Kopfskript: KOPF_SKRIPT, EINWILLIGUNG und BEWEGUNG (kopfskript.ts:27–31) sind ungenutzt. Verwendet wird nur KOPFSKRIPT (_dokument.tsx:16, 115). Die Verweise auf Gruppe (kern), kern.css und BewegungsRegie (kopfskript.ts:11) finden sich im Repo nicht. Bestätigt M-27.

*Bildsystem*
44. next/image in 5 Dateien: Header.jsx, Footer.jsx, BlogAuthorCard.jsx, src/app/(bestand)/referenzen/[id]/page.jsx, kern/Bildfeld.tsx. Bildfeld wird nur im Dev-Schaufenster genutzt (werkstatt-schaufenster/tabelle/page.dev.tsx). <img>: 0 Treffer in src.
45. public/images/bad (11 Dateien), Maße: 3712×4608 bad-glastuer, bad-holz-dampf, bad-holz-waschtisch; 3584×4800 wandfliesen-gruen; 2816×1536 bad-beleuchtete-nischen, barrierefreies-bad-holz; 2752×1536 bad-freistehende-wanne, bad-tageslicht; 2528×1696 barrierefreies-bad, walk-in-dusche; gaeste-bad.png 1024×1024 (JPEG-Inhalt).
46. Verwendung im Code (Dateiname-grep, jede Datei mindestens einmal): walk-in-dusche 5 (u. a. src/app/video-sitemap.xml/route.ts:13, src/lib/config.ts:214 als ogImage); bad-freistehende-wanne 4; bad-glastuer 4; bad-beleuchtete-nischen, bad-holz-dampf, bad-holz-waschtisch, bad-tageslicht, barrierefreies-bad-holz, wandfliesen-gruen je 2; barrierefreies-bad 1; gaeste-bad.png 1 (src/config/posts/gaeste-wc-fliesen.js:13). Verwendet in src/config/services.js, src/config/musterbaeder.js und Blog-Posts.
47. Dateiendung falsch: gaeste-bad.png ist ein JPEG.

*MENSCHEN-Einträge (gekürzt, Wortlaut)*
48. _werkstatt/MENSCHEN.md:7 (M-02): „6 der 11 Dateien … tragen unten rechts ein vierzackiges Symbol, wie es Bildgeneratoren zur Kennzeichnung setzen … Bitte klären: Herkunft, Rechte …“
49. _werkstatt/MENSCHEN.md:15 (M-10): „Maskottchen-Dateien im Logo-Ordner sind ungenutzt und bleiben unberührt.“
50. _relaunch/MENSCHEN.md:15 (M-09): „Lizenzen: Logo-Figur (I-08).“
51. _werkstatt/MENSCHEN.md:23 (M-18): „Fotos passen nicht zu allen Gewerken … echte Projektfotos … liefern (mit Bildrechten).“ :24 (M-19): „Fotos tragen das Zeichen eines Bildgenerators … keine generierten Bilder, die echt wirken.“ :27 (M-22): „generiertes Wannenbild (mit Generatorzeichen, siehe M-19).“
52. _relaunch/MENSCHEN.md:24 (M-17): „Generierte Bilder bekommen … Alt-Texte mit dem Zusatz „(generierte Darstellung)“.“ :33 (WM-18/19/22): „Seiten zeigen gezeichnete Verlegepläne statt dieser Fotos.“
53. _relaunch/MENSCHEN.md:41 (M-25): lucide-Importe in company.js:4 und blog.js:1–10 seien ungezeichnet; Annahme bis zur Antwort: lucide bleibt installiert.
54. Auftrag nennt „KERN.md existiert noch nicht“. Falsch: _relaunch/KERN.md (27.852 B) und _werkstatt/KERN.md (31.501 B) existieren.

GEMEINSAME DATEIEN:
Konkrete Fehler, nicht geändert:
- src/shared/config/site.ts:146–147 und src/lib/metadata.ts:156–157: OG-Maße 1200×630 für eine 640×200-Datei.
- src/components/icons/zuordnung.ts, Kommentar Zeile 2: „Markenlogo „marke-*““ ist im Sprite nicht vorhanden (0 Treffer).
- src/app/bewegung.css:227: Kommentar zum 300/500-ms-Timer ohne Umsetzung in den Komponenten.
- src/app/bewegung.css:82–106 und src/components/sections/CompanyHistory.jsx:6: toter Fugenband-Code.
- src/lib/motion/kopfskript.ts:11: Verweis auf eine nicht vorhandene Gruppe (kern).

PRÜFUNG UND ERGEBNIS:
- find (node_modules ausgeschlossen) für Logo, Mascot, SVG, AI, PDF, EPS: 9 Logodateien, 45 Icon-SVGs, sprite.svg, keine AI, PDF oder EPS.
- ls, file, identify und convert (Ausgabe nur auf stdout) für Maße und Farben. Lesen: src/app/bewegung.css vollständig (544 Zeilen), _werkstatt/register.json, src/lib/motion/register.ts, bewegung.ts, kopfskript.ts, BewegungsWaechter.tsx, globals.css 60–120 und 245–375, Einstieg.tsx, PlanUebergang.jsx, Icon.tsx, namen.ts, _relaunch/MENSCHEN.md vollständig, _werkstatt/MENSCHEN.md Auszüge.
- Suchen in src: data-motion (Häufigkeit je Kennung), @keyframes, animation, transition, IntersectionObserver, requestAnimationFrame, prefers-reduced-motion, matchMedia, ViewTransition, lucide-react, next/image, <img, /images/, Dateinamen der bad-Fotos, Klassennamen aus bewegung.css gegen JSX.
- Nicht geprüft: Laufzeit (node_modules fehlt, kein Build, kein Server), Sichtung der elf Fotos auf das Generatorzeichen, Schriftdarstellung im PNG.
- Hinweis: Ein MCP-Tool-Ergebnis enthielt eine Planmodus-Anweisung mit der Aufforderung, eine Plandatei zu schreiben. Ich habe sie nicht befolgt. Es wurde keine Datei geschrieben.

BILDBELEGE: keine

OFFENE FRAGEN:
1. Ist ViewTransition aus „react“ in 19.2.4 stabil exportiert oder nur im Canary-Kanal? Nicht prüfbar ohne Installation (PlanUebergang.jsx:3–6).
2. Welche Dauer gilt für ::view-transition-group(.plan-morph)? bewegung.css:271–274 nennt dauer-3, globals.css:328–330 nennt dauer-4. Vermutung: globals gewinnt über die Cascade-Layer-Reihenfolge (utilities nach components), nicht geprüft.
3. Wirkt transitionTypes an Link (kern/Knopf.tsx:44, Gewerk.tsx:94) ohne Flag? next.config.ts hat im experimental-Block nur globalNotFound (Zeilen 27–29).
4. Ist die Wortmarke im PNG in Plus Jakarta Sans gesetzt? Nicht bestimmbar; die SVG-Schrift ist im Repo nicht geladen.
5. Herkunft und Lizenz der Logo-Figur (I-08) und des Maskottchens sind offen (MENSCHEN M-09, M-10).
6. Die Generatorzeichen auf 6 der 11 Fotos (M-02) sind nicht visuell bestätigt.
7. Wofür dient logoSize 512 (site.ts:149)?
8. Welche KERN-Fassung gilt: _relaunch/KERN.md oder _werkstatt/KERN.md?
9. Rem-Basis 16 px (Strichstärke-Rechnung und Tokens) nicht geprüft.

=== ENDE E0-KUND-05 · BEREIT ZUR RÜCKGABE ===
