# ENTSCHEIDUNGEN · Werkstatt-Lauf

Chronologisch. Folgenreiche Entscheidungen mit Denkprotokoll (Ziel → drei Wege → Bewertung nach Nordstern, Kriterien, Risiko, Aufwand → Umkehrprobe → Folgen zweiter Ordnung). Vorentscheidungen des Vorlaufs stehen in `_relaunch/ENTSCHEIDUNGEN.md` (E-000 bis E-013) und gelten nur, soweit hier übernommen.

---

## E-001 · Vorlauf übernehmen statt neu erkunden und neu wählen (Denkprotokoll)
- **Ziel:** Laufzeit in auslieferbare Verbesserungen statt Varianten und Doppelprüfungen (Nordstern), ohne die Pflicht „selbst erkunden“ zu verletzen.
- **Wege:** (1) Vollständige Neuerkundung und neue Richtungswahl. (2) Vorlauf-Ergebnisse ungeprüft übernehmen. (3) Vorlauf übernehmen, aber gezielt gegen den heutigen Code prüfen und Lücken schließen.
- **Bewertung:** (1) wiederholt 3.600 Zeilen Atlas, drei Stilkacheln und eine Jury – genau die „Varianten und Doppelprüfungen“, die der Auftrag vermeiden will; der Code ist seit dem Atlas nur um ungenutzte Dateien geschrumpft. (2) riskiert veraltete Befunde. (3) kostet fünf Kundschafter-Pakete, belegt die Aktualität (Stichprobe 9/10 korrekt, 1 teilweise; E0-KUN-05) und schließt die Lücken des neuen Auftrags (Werkzeuge, Gerätegrößen, Hauptansichten).
- **Wahl: (3).** Richtung E-008 (Grundsystem „Fuge und Achse“ + Vertrauensschicht) und KERN v1 gelten; KERN v2 überführt v1 in die Gliederung K-001–K-012 dieses Auftrags und erweitert für AUSBAU maximal. Atlas, Funktionsliste, Funktionstests, Werkzeuge und Messbasis werden weiter genutzt. Berichte: `berichte/E0-KUN-01…05`.
- **Umkehrprobe:** Erweist sich die Richtung am Referenz-Tor als nicht tragfähig (Sichtabnahme < 8 nach zwei Anläufen), wird sie an der Referenz geschärft – nicht verworfen; ein Richtungswechsel wäre ein Planwechsel nur bei unerreichbarem Kriterium.
- **Folgen zweiter Ordnung:** Die Ausgangswerte müssen in den neuen Gerätegrößen und für 12 statt 7 Hauptansichten neu erhoben werden (E0-PRUEF-03); die Vorlauf-Messungen bleiben Vergleichsmaterial.

## E-002 · Was aus dem Vorlauf nicht mehr gilt
- Push auf `main`/Live-Gang je Welle (Vorlauf E-000, E-003, E-005) – dieser Auftrag: nur ARBEITSBRANCH, nie veröffentlichen.
- Rückführung, alte Jury-Rubrik (4 Kategorien), Slop-Katalog S-xx, Phasen P3–P7 – ersetzt durch Rubrik (6 Kategorien), Katalog „Generisches“ und Etappen E2 ff. dieses Auftrags.
- Übernommen als Pflicht: Vorrat V-01 bis V-06 (`_relaunch/PLAN.md`, Abschnitt Vorrat).

## E-003 · Arbeitsordner `_werkstatt/`
- `_relaunch/werkzeuge` → `_werkstatt/werkzeuge` per `git mv` (Historie bleibt), Pfade angepasst; `_relaunch/` bleibt unverändert als Archiv des Vorlaufs; `GRUNDMENGE.json` als Kopie nach `_werkstatt/` (von `lib.mjs` relativ gelesen).
- Ausschluss von `_werkstatt` aus Build, Lint, Typprüfung, Tailwind-Quellen und Vercel (tsconfig `exclude`, eslint `globalIgnores`, `@source not`, `.vercelignore`).
- `_werkstatt/cache` und `_werkstatt/werkzeuge/node_modules` sind Symlinks in den Scratchpad (gitignored) – Rohbilder, Messrohdaten und Werkzeug-Abhängigkeiten liegen außerhalb des Repos.

## E-004 · Designsystem global mit eindeutigen Namen (Denkprotokoll)
- **Ziel:** ein System (Auftrag 3.2), Z-03 prüfbar, keine Kollision mit dem Alt-System, unumgebaute Seiten nicht zerstören.
- **Wege:** (1) wie im Vorlauf additiv `--k-*` nur auf `/`, globaler Umstieg später; (2) Tailwind-Standardpalette überschreiben (`slate`, `red` …) wie `tokens.css` heute; (3) `@theme static` mit eigenen Namen (kalk, tinte, laser …) als einzige Quelle, `tokens.css` als `layer(alt)` darunter, Aliasse bis null Nutzung, danach `--color-*: initial`.
- **Bewertung:** (1) nur sinnvoll bei Live-Gang je Welle (entfällt, E-002) und erzeugt zwei Systeme nebeneinander; (2) färbt unkontrolliert alle Altseiten um und verschleiert, was umgebaut ist; (3) macht neue Klassen eindeutig erkennbar (Z-03 per `werte.mjs`), Altseiten bleiben lesbar, der Abbau ist messbar.
- **Wahl: (3).** Abstände = Tailwind-Stufen 1/2/3/4/6/8/12/16/24/32 (= v1-Skala 4–128 px), Größen-Stufen für Icons und Touch-Ziele, Schriftstufen `text-fs-N`, `dauer-*`-Utilities, Kurven als `ease-*`, Radien `none|r1`, Schatten `fuge`.
- **Umkehrprobe:** Revert der Fundament-Commits stellt den Ausgangszustand her; Alt-System bleibt bis E6 unangetastet.
- **Folgen zweiter Ordnung:** `layer(alt)` hebt die heutige Umfärbung `red-600 → Orange` auf; Fehlermeldungen auf Altseiten werden wieder rot (gewollt). Altseiten mit `slate-*` erhalten die Tailwind-Standardgrautöne statt der überschriebenen – leichte Farbverschiebung bis zum Umbau.

## E-005 · Bewegung CSS-first mit eigenem Modul (Denkprotokoll, schärft Vorlauf-E-009)
- **Ziel:** alle Registereinträge mit ≤ 60 KB gzip Zusatz-JS, LCP nie verzögert, ohne JS alles sichtbar, Z-05 (≤ 5 % verworfene Bilder bei 4× CPU).
- **Wege:** (1) CSS + kleines Modul `src/lib/motion/` (IO, Startklasse, Bereit-Meldung), scroll-gebunden über `animation-timeline`; (2) framer-motion mit `LazyMotion`; (3) GSAP + ScrollTrigger.
- **Bewertung:** (1) ≈ 2–3 KB, läuft im Compositor (transform/opacity), keine neue Abhängigkeit; (2) 15–20 KB, Hauptthread, Hydrierungsabhängigkeit; (3) 30–45 KB, neue Lizenz, Scroll-Kapern-Gefahr.
- **Wahl: (1).** Schärfungen aus der Planprüfung: Zeitlimit nur ohne Bereit-Meldung; Zustand in `data-motion-stand`; Neu-Beobachtung nach Seitenwechsel; erster Bildschirm nur Versatz; Linien per `scale` statt `stroke-dashoffset`; `@supports not`-Zweig = reduzierter Zustand; globale `0.01ms !important`-Regel durch Register-Regeln ersetzt.
- **Umkehrprobe:** Ohne Modul greift das Zeitlimit im Head-Skript: alles sichtbar.
- **Folgen zweiter Ordnung:** framer-motion verschwindet nach der letzten Fundstelle (CompanyHistory, HeartbeatCTA, /beratung, Kartenhüllen, MotionProvider); `data-motion-hydrated` entfällt mit MotionProvider (vorher Nutzung prüfen).

## E-006 · Eigene Icon-Familie mit Sprite (Denkprotokoll, aus Vorlauf-E-010)
- **Ziel:** eine Familie im Formsystem (Z-06), Icon ≤ 1,5 KB, keine doppelten IDs.
- **Wege:** (1) eigene Familie, Sprite per Import (gehashte Datei, `<use>`); (2) eigene Familie als Inline-React-Komponenten; (3) lucide behalten und per CSS angleichen.
- **Bewertung:** (3) widerspricht dem Formsystem (runde Enden, Einheitslook). (2) bläht HTML und JS je Seite auf. (1) einmal geladen, cachebar, keine IDs im DOM, Formsystem erzwingbar.
- **Wahl: (1).** Vollständige Zuordnung der 134 lucide-Namen durch den Orchestrator (eigenes Icon oder „entfällt“); Fachzeichen vom Orchestrator, UI-Icons nach Muster. Config-Dateien (`company.js`, `blog.js`) ändern nur ihre Importzeile auf die eigene Familie; Werte und Form der Daten bleiben gleich (Verhalten des Datenmodells unverändert).
- **Umkehrprobe:** `Icon` kann je Name zurückfallen, solange lucide installiert ist.
- **Folgen zweiter Ordnung:** Viele Icon-Kacheln entfallen ersatzlos (Fuge statt Karte); `iconMapper` bildet auf die neuen Namen ab.

## E-007 · AUSBAU maximal, konkret (Denkprotokoll)
- **Ziel:** die Stufe „maximal“ (interaktive Grafik, scroll-gebundene Szenen, Leitelement, ggf. 3D) so umsetzen, wie Zweck und Nutzer es tragen.
- **Wege:** (1) alles inklusive WebGL-Szene des Kreuzlinienlasers; (2) Leitachse, eine scroll-gebundene Szene, drei interaktive Grafiken, Seitenwechsel – alles SVG/CSS; (3) nur „ausgeprägt“ (ein großer Moment je Erzählansicht).
- **Bewertung:** (1) GPU-Last auf älteren Handys der Zielgruppe, Budget- und Akku-Risiko, die Marke zeigt sich in der Zeichnung, nicht in Tiefe; (3) verschenkt die Interaktion, die echte Information trägt (Verband, Einzugsgebiet); (2) jede Grafik zeigt Tezgel-Inhalt, läuft im Compositor, statischer Endzustand ohne Animation.
- **Wahl: (2).** Leitachse (alle Erzählansichten), Szene „Verlegeplan entsteht“ (`/bad`), Verband-Umschalter (`/fliesen`, Kür `/fliesen/verlegemuster`), Einzugsband statt Maßband (gerundete Entfernungen würden Genauigkeit vortäuschen), SIG-3 mit Seitenwechsel, Fugenband (`/ueber-uns`). 3D/Shader entfallen.
- **Umkehrprobe:** Jede Grafik hat einen statischen Endzustand; Entfernen eines Moments lässt die Seite vollständig.
- **Folgen zweiter Ordnung:** Register wächst um 5 Einträge – Gegenmittel „Effektfeuerwerk“: genau ein Moment je Erzählansicht.

## E-008 · WaterCursor, WhatsApp-Widget, Einwilligungsbanner (übernommen aus Vorlauf-E-011 bis E-013)
- WaterCursor (WebGL-Nachlaufcursor, Katalog „weich“) entfällt ersatzlos; die Lebendigkeit übernimmt SIG-1.
- WhatsApp: mobil in der unteren Leiste, Desktop flacher rechteckiger Knopf mit `id="whatsapp-floating-btn"`; seitenbezogene Texte und Analyse-Ereignis unverändert; das vorgetäuschte Benachrichtigungs-Badge „1“ entfällt (manipulatives Muster).
- Banner: Schriftfeld-Form, Inhalt, Reihenfolge, Namen und Gleichwertigkeit der Knöpfe unverändert; Einwilligungslogik unberührt. Die Wurfphysik (`widgetPhysicsCoordinator`) entfällt mit beiden.

## E-009 · Menü vor der Hydrierung bedienbar (Denkprotokoll, V-06)
- **Ziel:** Menü auf langsamen Geräten sofort bedienbar, F-13 bleibt grün (Dialog „Hauptnavigation“, Schalter mit Namen und `aria-expanded`).
- **Wege:** (1) `<details>`/`<summary>`; (2) Popover-API (`popover`, `popovertarget`) mit `role="dialog"`, React spiegelt `aria-expanded` über `toggle`; (3) Link auf den Seitenindex im Fuß.
- **Bewertung:** (1) bricht die getesteten Rollen und Namen; (3) allein ist ein Rückschritt in der Bedienung; (2) funktioniert ohne JS in allen Zielbrowsern ab Safari 17, Escape schließt nativ, Rollen bleiben.
- **Wahl: (2) mit (3) als Rückfall** für Browser ohne Popover-Unterstützung.
- **Umkehrprobe:** Revert stellt das bisherige React-Menü her.
- **Folgen zweiter Ordnung:** Abnahmetest V-06 mit gesperrtem `_next/static` (Menü öffnet trotzdem).

## E-010 · Tempo an der Ursache (Denkprotokoll)
- **Ziel:** mobil LCP ≤ 2,5 s (Ausgangswert 3,4–6,6 s), CLS ≤ 0,1, TBT ≤ 200 ms.
- **Wege:** (1) nur Bildoptimierung/Preload; (2) Ursachen beseitigen: `AuthProvider`/`ContentProvider` (zod, 13 Ratgebertexte in jedem Bündel) an den Nutzungsort, `/blog` als Server-Komponente mit kleiner Filter-Insel, schlanke Schriften (nur Archivo-latin vorgeladen, Achsen und Zeichen beschnitten, Ersatzschriften mit Metrik-Anpassung), feste Höhen für Karte und Kalender, framer-motion/lucide/WaterCursor/Physik raus; (3) Seiten clientseitig nachladen.
- **Bewertung:** (1) trifft nicht die Ursache (FCP 1,4 s, LCP 3,4 s ⇒ spät erscheinendes, JS-gebundenes Element); (3) verschlechtert LCP; (2) trifft die gemessenen Ursachen – LCP-Element wird in E0 gemessen, nicht vermutet.
- **Wahl: (2).** Die Provider-Logik bleibt unverändert; nur ihr Einhängeort ändert sich (Bestandsschutz F-16, F-18).
- **Umkehrprobe:** Revert je Paket; Messung je Etappe.
- **Folgen zweiter Ordnung:** Lokale Inhaltsüberschreibungen (`dataService`, localStorage) wirken weiter dort, wo sie gelesen werden.

## E-011 · Funnels zuerst zerlegen, dann gestalten (Denkprotokoll)
- **Ziel:** FliesenKonfigurator (1.375 Zeilen), BadanfrageFunnel (675), TezgelAnfrageFunnel (620), BadProjektCheck (513) parallel und ohne Logikänderung gestalten.
- **Wege:** (1) je Funnel ein großes Haiku-Paket; (2) nacheinander mehrere Pakete auf derselben Datei; (3) Orchestrator verschiebt Code ohne Verhaltensänderung in `logik.js` (gesperrt), `stile.js`, `Schritt*.jsx`, `Zusammenfassung.jsx`; danach parallele Gestaltungspakete.
- **Bewertung:** (1) zu groß für eine Sitzung, Logikrisiko; (2) langsam, auf dem kritischen Pfad; (3) Logik bleibt bytegleich in einer gesperrten Datei, Nachweis durch die Funktionstests, danach parallel.
- **Wahl: (3).**
- **Umkehrprobe:** Revert des Zerlege-Commits.
- **Folgen zweiter Ordnung:** Testselektoren und Nutzlast-Schlüssel bleiben exakt; Altfehler (M-06) bleiben unverändert erhalten.

## E-012 · Modellnamen
In Repo-Dateien stehen nur die Rollen ORCHESTRATOR und ARBEITSMODELL aus Abschnitt 0 des Auftrags; Paketköpfe nennen „Modell: ARBEITSMODELL“ bzw. „Modell: ORCHESTRATOR“. Ausnahme: `AUFTRAG.md` (wörtlich).

## E-013 · Mikrotexte und Alt-Texte
- Badge-Texte gelten als Mikrotext: Sie werden zum Mono-Etikett mit gleichem Wortlaut; entfallen sie, weil sie nur die H2 wiederholen, steht das alt → (entfällt) in TEXTVORSCHLAEGE.md.
- Alt-Texte, die Bilder als Tezgel-Arbeit ausgeben („… von Fliesenverlegung Tezgel“), werden beschreibend umformuliert, bis die Bildherkunft geklärt ist (M-02).

## E-014 · Verwaiste Komponenten entfernen (Denkprotokoll, Entfernen von Bestand)
- **Ziel:** Altlasten ohne Funktion und ohne Inhalt entfernen, die das Formsystem und Z-03/Z-06 belasten (lucide, framer-motion, freie Werte), ohne Bestand zu verlieren.
- **Bestand:** 13 Dateien ohne Importeur laut E0-KUN-03 (Abschnitt 3): `components/CookieConsent.tsx` (Duplikat-Re-Export), `common/GoogleMap.tsx`, `common/WaterCursor.tsx` (Re-Export), `common/WhatsAppButton.tsx`, `layout/FloatingDock.tsx`, `maps/ContactMapWrapper.tsx`, `sections/home/ContactSection.tsx`, `trust/TrustBadges.tsx`, `trust/TrustSignals.tsx`, `ui/AnimatedNumber.tsx`, `ui/OptimizedImage.tsx`, `ui/RotatingText.tsx`, `ui/TiltCard.tsx`.
- **Wege:** (1) behalten und umgestalten; (2) behalten, aber nicht anfassen (bleiben im Altstil, mit lucide/framer); (3) nach erneuter Nutzungssuche (statische, dynamische und relative Importe, Zeichenketten, Tests, E-Mail-Vorlagen) entfernen.
- **Bewertung:** (1) Arbeit ohne Nutzen für Besucher; (2) blockiert die Deinstallation von lucide und framer-motion (Z-06) und hält Generisches im Repo (Hochzählen, Kippkarten, Nachlauf-Laufschrift); (3) kein Inhalt, keine Route, keine Funktion geht verloren – „gleichwertiger Ersatz“ ist nicht nötig, weil nichts genutzt wird; Vermerk hier und im Commit.
- **Wahl: (3)** in Paket E2-AUF-01; Datei wird nur entfernt, wenn die Suche null Treffer zeigt und Typprüfung sowie Lint danach grün sind.
- **Umkehrprobe:** Revert des Commits stellt jede Datei wieder her (Historie bleibt).
- **Folgen zweiter Ordnung:** weniger Fundstellen für lucide/framer-motion; `AnimatedNumber` (Hochzählen) und `TiltCard` (Kippkarte) als Katalog-Muster verschwinden.

## E-015 · WhatsApp mobil in der Leiste, am Desktop flacher Knopf (Denkprotokoll, Teständerung)
- **Ziel:** KERN K-003/7 („untere Leiste als einzige feste Ebene neben dem Kopf“, keine Chat-Blase) einhalten, ohne einen Kontaktweg oder dessen Verhalten zu verlieren.
- **Bestand:** schwebender, ziehbarer WhatsApp-Kreis mit „1“-Abzeichen auf allen Breiten (`#whatsapp-floating-btn`, seitenbezogene Nachricht, Entprellung 450 ms); mobil zusätzlich WhatsApp in der unteren Leiste (ohne seitenbezogene Nachricht). Test F-10 klickt mobil und am Desktop `#whatsapp-floating-btn` und erwartet Firmennummer und seitenbezogenen Text.
- **Wege:** (1) Kreis mobil behalten (flach) – zwei WhatsApp-Wege übereinander; (2) Kreis mobil ausblenden, Test unverändert – Test schlägt mobil fehl; (3) mobil trägt die Leiste WhatsApp mit derselben seitenbezogenen Nachricht (`kontextNachricht` in `src/lib/whatsapp.ts`, aus dem Widget verschoben), am Desktop bleibt `#whatsapp-floating-btn` als flacher Knopf; Test F-10 klickt mobil den WhatsApp-Link der Leiste mit denselben Erwartungen.
- **Bewertung:** (1) widerspricht K-003/7 und verdeckt Inhalt; (2) verletzt den Bestand; (3) ein Weg je Breite, gleiches Verhalten, die Leiste gewinnt den seitenbezogenen Text dazu.
- **Wahl: (3).** Der Test bleibt gleich streng (gleiche Erwartungen: sichtbares Bedienelement, Firmennummer, seitenbezogener Text, keine Anfrage); nur das Element mobil ist die Leiste. Das vorgetäuschte „1“-Abzeichen und der Hinweis „Chat starten 💬“ entfallen (E-008, TEXTVORSCHLAEGE).
- **Umkehrprobe:** Revert der Commits E2-ORCH-05b.
- **Folgen zweiter Ordnung:** Die Leiste öffnet WhatsApp jetzt mit vorbelegtem Text; der Widerrufs-Knopf der Einwilligung bleibt als zweite kleine feste Ebene links (Art. 7 Abs. 3 DSGVO, Test F-11) und trägt `data-feste-ebene`.

## E-016 · Farbwechsel ohne Überblendung bei Links, Feldern und Auswahlknöpfen
- **Anlass:** Prüfstufe A (E2-PRUEF-A-1, Z3) fand Übergänge ohne `data-motion` an Elementen, die ihre Klassen aus `kern/stile.ts` beziehen (Textlinks, Felder, Auswahlknöpfe). Ein Attribut lässt sich über Klassenbausteine nicht mitgeben.
- **Wahl:** Diese Elemente wechseln Farbe und Rahmen sofort (kein Übergang, kein Registereintrag nötig). Knöpfe (`knopfKlassen`) behalten ihre Rückmeldung und tragen immer `data-motion="druck"`; Kopf-Links tragen `zustand`. Die Prüfung bleibt unverändert streng.
- **Umkehrprobe:** Klassen in `stile.ts` zurücksetzen und `data-motion="zustand"` an allen Nutzungen setzen.

## E-017 · Rufnummer im Kopf ab 1024 px in Mono
- **Anlass:** Prüfstufe A (D4): K-009 verlangt die Rufnummer in Mono im Kopf; bei 1280–1535 px war sie nur als Symbol sichtbar.
- **Wahl:** Rufnummer ab 1024 px sichtbar, bei 1280–1535 px in `text-fs-1` und mit engerer Navigation (`pl-2`, `gap-4`); die Unterzeile „Fachbetrieb · Aßlar · Wetzlar“ bleibt dort ausgeblendet (TEXTVORSCHLAEGE). Nachweis: Kopfzeile ohne Überlauf bei 1280 und 1440 (Prüfer).

## E-018 · Kartenhöhen als eigene Stufe
- **Anlass:** E2-BAU-04 – Karten brauchen eine feste Höhe, damit Platzhalter (Einwilligungs-Tor) und geladene Karte gleich hoch sind (CLS); die Abstandsskala endet bei 128 px.
- **Wahl:** Höhe über die Variable `--karten-hoehe` am Element und die Komponentenklasse `karten-hoehe` (globals.css); erlaubte Werte 400/440/460 px und Spaltenhöhe ab `lg` (KERN K-005). Keine weiteren Kartenwerte.
- **Umkehrprobe:** Klasse entfernen → Karten fallen auf Inhaltshöhe zurück (CLS-Risiko).

## E-019 · Sicht-Nacharbeit am E2-Tor (Anlauf 2)
- Frage: Wie reagiert der Lauf auf die Sichtabnahme E2-SICHT (/ 5,7, /kontakt 5,0)?
- Entscheidung (Denkprotokoll): Befunde mit Wirkung auf die Leitidee zuerst und systemweit, nicht je Seite flicken:
  1. Flucht: Lot, Kreuzlinie und Abschnittsmarken stehen an einer gemeinsamen Lage im Seitenrand (`ACHSE_LAGE`), Etikett/H1/Text des Einstiegs ohne Einzug an der Inhaltskante; eine `Leitachse` führt das Lot über alle Abschnitte der Erzählansicht, Abschnitte setzen ein Fugenkreuz an ihre Oberkante.
  2. Rot-Disziplin (K-003.2): Aufzählungs- und Etikettenkreuze in Strich (auf Tinte Nacht-2); Rot bleibt Laserachse, Kreuzlinie, Firmensitz-Marke, Anriss, Fokus, Fehler. Aktiver Menüpunkt in Tinte.
  3. Gezeichnet statt generiert (K-003.4): Fotos mit Generatorzeichen verlassen die Startseite (M-19), Verlegepläne tragen das Bild; Gewerkwahl im Rechner mit Planmarken statt Piktogrammen.
  4. Feste Ebenen (K-003.7): Leiste bis lg, Widerruf-Schild als erstes Leistenfeld (bestehendes Ereignis `openCookieSettings`, Logik unverändert); WhatsApp ab lg als 44-px-Quadrat im Seitenrand.
  5. Takt: Erzählabschnitte py-16/24; Garantien als Zeilen, Fachthemen als Linienliste – keine zwei benachbarten Abschnitte gleicher Bauart; Vertrauensleiste als festes Raster mit dem Kennwert als achtem Feld.
  6. /kontakt: seitlicher Abschnittskopf mobil volle Breite (Fehler), Ortsliste in ganzen Zeilen, Zonen 10/25/50 aus `einzugszonen.ts`, Kartenplatzhalter mit kompaktem Einzugsband.
- Nicht umgesetzt (Bestand/Funktion): zweites und drittes Anfrageformular auf / und Terminwahl als Formularschritt – das wären Funktionsänderungen; sie gehen als Vorschlag in BERICHT.
- Folgen: neue Bausteine `Leitachse`, `Einzugsband` (vorgezogen aus E3-ORCH-03), Logik `einzugszonen.ts` mit Test; Prüfstufe A und Sichtabnahme Anlauf 2.

## E-020 · Zusammenführung mit main auf ausdrückliche Anweisung
- Anlass: Nachricht der Nutzerin/des Nutzers am 11.10. (~02:40): „merge bitte alles mit main. Fully push to main for redeploy on vercel!“ – das hebt für diesen Schritt G2 (kein Zusammenführen, kein Push auf main) und G3 (keine Veröffentlichung) des Auftrags ausdrücklich auf.
- Befund: main ist seit der Basis 2362a5a um 60 Commits einer anderen Sitzung („relaunch P3“) weiter: Seiten in die Routengruppe (bestand) verschoben, ruhender Kern unter (kern), Logik in Hooks, Fairness-Korrekturen. Probe-Zusammenführung (ohne Verzeichnis-Umbenennungserkennung): 13 Konflikte.
- Entscheidung: beide Arbeitsstände erhalten. Sichtbares Markup = Werkstatt (KERN v2, geprüft); Verhaltenskorrekturen und Hooks der anderen Sitzung übernehmen; ruhende Kern-Dateien unverändert; `_relaunch/` vollständig in der Fassung von main (Werkzeuge der anderen Sitzung). Gepusht wird nur ein zusammengeführter Stand mit grünem Reinraum-Build und grünen Funktionstests; unmittelbar vor dem Push wird main erneut geholt (die andere Sitzung schreibt dort weiter).
- Umkehrprobe: Revert des Merge-Commits auf main stellt den vorherigen Produktionsstand wieder her.
- Fortsetzung 11.10. (Nutzungslimit dazwischen): main war auf c758acf (P4) weiter, die Kern-Startseite der anderen Sitzung live unter dem eigenen Root-Layout (kern). Anweisung zur Startseite: „schau welche besser aussieht, du kannst ja elemente übernehmen und beide fusionieren“; Hinweis: „nicht alle Unterseiten sind auf main vollendet“.
- Entscheidung Startseite: ein Rahmen für alle Seiten. `/` bleibt im Rahmen (bestand), der alle rund 120 unfertigen Unterseiten trägt; zwei Root-Layouts hätten jeden Klick von `/` auf eine Unterseite zum vollständigen Neuladen gemacht (Next-Doku layout.md: „Navigating across multiple root layouts will cause a full page load“) und Kopf/Fuß zwischen Start- und Unterseiten gewechselt. Die Kern-Startseite liegt unverändert als Entwurf unter `src/app/(kern)/_entwurf/start/page.tsx` (nicht ausgeliefert). Fusion: was das blinde Abschnittsgutachten bei ihrer Fassung vorn sieht, wird mit KERN-v2-Bausteinen nachgebaut (die beiden CSS-Systeme sind getrennt und nicht mischbar; gleiche Farbwerte). Vorab aus dem Codevergleich übernommen: Bewertung aus `RATING_SUMMARY`, Entfernungen ab Aßlar aus `CITY_HUB_DATA` (behebt „Wetzlar = HQ“), Wahrheitskorrektur der Beschreibung („fugenarme … Abdichtung DIN 18534“), ein Rot je Bildschirm in den Fachgewerk-Plänen, Sprunglink im System. Bei uns belassen: keine generierten Fotos (ihr Großformat zeigt ein KI-Bild mit Generatormarke, M-19).
- Konflikte c758acf: Testlisten vereinigt; BookingCalendar mit unserem Markup und ihrem Hook `useTerminKalender` (inkl. P4-05d: Tag je Kalender festgehalten); Funnel-Einzeldateien bleiben zugunsten der Ordner-Zerlegung entfernt, die Ordner beziehen ihre Logik aus den gemeinsamen Hooks (`src/lib/formulare`); doppelte gleichlautende `redirects()` zusammengelegt.
- Prüfung und Gutachten (11.10.): blinder Abschnittsvergleich vor der Fusion – Kern-Fassung 7, Werkstatt 6 (beide Gutachter); Fusion danach Desktop 6,5 / Handy 7 gegen 6 / 6 und 5,5 / 5,5. Gesamtprüfung cf91c38: Reinraum grün, 289 von 290 Funktionstests (1 Ausreißer, einzeln grün), Sitemap 163 × 200, axe / und /kontakt 0, Register ohne Lücke. Die Testsuite der anderen Sitzung meldet 45 Fehlschläge, weil sie die Kern-Startseite auf „/“ erwartet (M-21).
- Push: Der Push auf main wurde von der Berechtigungsprüfung der Sitzung abgelehnt; nicht umgangen. Der Stand liegt auf dem Arbeitsbranch, der main vollständig enthält.
- Push auf main am 11.10. (~17:10 CEST) auf erneute ausdrückliche Anweisung („fully push to main“): Fast-Forward von main auf den Arbeitsbranch, kein Force. Geprüfter Stand 3dc142c (Reinraum grün, 290/290 Funktionstests, Texte grün, axe 0); danach nur `_relaunch/` und Werkstatt-Dokumente. main = Branch = 6156079; Vercel „Deployment has completed“ (success), live auf www.tezgel.de geprüft (HTTP 200, neue Startseite ausgeliefert).

## E-021 · Ausgang des E2-Tors nach Anlauf 2
- Ergebnis: Sichtabnahme E2-SICHT-2 auf dem zusammengeführten Stand 5324b62: `/` 6,7 (Desktop) und 6,2 (Handy), `/kontakt` 5,7 und 5,8 – Ziel 8 nicht erreicht (Anlauf 1: 5,7 und 5,0). Prüfstufe B5 grün (Reinraum, 65 Aufnahmen ohne Überlauf oder Überlappung, 0,1 % verworfene Bilder bei 4× CPU, Register ohne unbekannte Kennung). Lighthouse: LCP mobil −30 % (`/`) und −44 % (`/kontakt`) gegen E0, aber über 2,5 s; TBT auf `/` mobil 779 ms gegen 415 ms in E0 (Rückschritt über der Spanne).
- Entscheidung (Denkprotokoll): Laut Plan ist Anlauf 2 der letzte; der Lauf geht weiter nach E3, alle Kategorien unter 8 werden Pakete (höchstens 2 je Ansicht und Kategorie, PLAN „Offene Punkte“: E3-NACH-01 bis -07, E3-PRUEF-W1). Ein dritter Anlauf am Tor würde E3 blockieren, ohne dass die Unterseiten – der größere Teil der Seite – vorankommen; die Befunde sind konkret und paketierbar. `/` und `/kontakt` werden am E3-Tor erneut abgenommen (Ziel bleibt ≥ 8, Z-04 verlangt es in Prüfstufe C).
- Abgelehnt: Befund 2 (zwei Anfrageformulare auf `/` zu einem Weg) und Befund 15 (Terminwahl als Schritt der Express-Anfrage) – das sind Funktionsänderungen an Anfragewegen (wie schon in E-019); sie gehen als Vorschlag in BERICHT. Befund 10 (Google-„G“ einfarbig) – Markenregel des Anbieters; das WhatsApp-Zeichen darf einfarbig werden (E3-NACH-03 prüft es mit).
- Werkzeuglücken aus dem Tor: Bildsatz endet nach zwölf Aufnahmen (unterer Teil von `/` unbelegt) → künftige Sichtabnahmen mit Abschnittsbildern über die ganze Höhe; Ersatzpfad-Lauf mit reduzierter Bewegung ist mit dem Bildsatz identisch → mit normaler Bewegung wiederholen; Namensfehler `sig-ablauf` im Bewegungswerkzeug (E3-PRUEF-W1).
- Reihenfolge: E3-W1 = vier Baumeister-Pakete laut PRUEFPUNKT (E3-BAU-11, -16, -02, -07) und E3-PRUEF-W1; parallel Orchestrator-Spur E3-NACH-07 (Tempo), -01, -02, -04 – ohne Dateiüberschneidung mit den Baumeister-Paketen.

## E-022 · SIG-1 ab dem ersten Bild, Leitachse auf `/`, spätes Zeichnen langer Seiten
- Anlass: E2-SICHT-2 Befunde 5, 6, 11 (Lot ohne Startverzug, beide Linien aus dem Kreuzpunkt, `sig-flucht` und `leitachse` fehlen auf `/`) und Lighthouse e2-tor-3 (TBT `/` mobil 779 ms; „Style & Layout“ 1,6 s gegen 0,7 s im Ausgang, Skriptausführung 0,9 s gegen 1,7 s – der Rückschritt liegt im Zeichnen der langen Seite, nicht im JavaScript; 2 972 Elemente).
- Entscheidung (Denkprotokoll):
  1. SIG-1 läuft als CSS-Animation unter `html.k-bewegung` (Kopfskript vor dem ersten Bild) statt als Übergang nach dem Signal des Bewegungsmoduls: Das Modul meldet sich erst nach der Hydrierung; auf langsamen Geräten griff nach 2 s das Notaus, die Linien sprangen. Der große Moment hängt damit an keinem Skript. Zeitverlauf linear – ein Laser zieht mit gleicher Geschwindigkeit, und bei 25/50/75 % ist die Linie ¼/½/¾ lang (Abnahmekriterium). Register-Zeilen in KERN angepasst; reduzierte Bewegung, Druck und erzwungene Farben ohne Animation.
  2. Ab lg wächst die Waage aus dem Kreuzpunkt mit dem Plan-Lot (Ursprung 75 % der Blattbreite), knickt am linken Ende ins Lot und übergibt am Fuß des Einstiegs an die Leitachse der Seite (gleiche Lage `ACHSE_LAGE`); unter lg steht das Lot des Einstiegs in derselben Lage wie die Leitachse, der Text an der Inhaltskante (wie E-019). Die Leitachse kehrt auf `/` zurück (in der Fusion E-020 entfallen); die Abschnitte mit `Abschnitt` setzen ihr Fugenkreuz.
  3. Abschnitte unterhalb des ersten Bildschirms von `/` tragen `content-visibility: auto` (`.spaet-zeichnen`, Abschnitt-Eigenschaft `spaet`): Stil und Layout entstehen erst in Sichtnähe. Inhalte bleiben im DOM, in der Zugänglichkeitsstruktur und in der Seitensuche; gedruckt wird alles. Nur an Hüllen ohne überstehende Zeichen (Inhalt wird am Rand beschnitten) – deshalb bei `Abschnitt` am inneren Rahmen, nicht an der Sektion mit dem Fugenkreuz.
- Prüfung: Prüfstufe A (Funktion, Bilder, Register, reduziert) und Lighthouse-Nachmessung `/` mobil gegen e2-tor-3 durch den Prüfer; Ziel TBT ≤ E0 + Spanne (≤ 635 ms), „Style & Layout“ deutlich unter 1,6 s.

## L6 · Lernen
| Datum | Rolle | Pakettyp | Fehler | Häufigkeit | Maßnahme |
|---|---|---|---|---|---|
| 10.10. | Kundschafter (Planung) | Workflow-Agent | Leerer Auftrag („NaN“) bei einem von fünf Agenten | 1 | Paket über Agent-Werkzeug neu gestartet; Briefings künftig als Datei + kurzer Verweis |
| 10.10. | Orchestrator | Funnel-Zerlegung (E2-ORCH-06) | Import einer verschobenen Teilkomponente fehlte (FK/Erfolg → ResultSummary); der Text-Fingerabdruck prüft keine Bezeichner | 1 | Bei jeder Zerlegung zusätzlich freie Bezeichner je Teil prüfen (`kennungen.cjs modul`); Lint-Befund `react/jsx-no-undef` in Prüfstufe A als ROT werten |
| 10.10. | Orchestrator | Briefing (E2-PRUEF-B) | `briefing.mjs` schreibt die Datei selbst und gibt den Pfad aus; Umleitung der Ausgabe in dieselbe Datei überschrieb die Kopfzeile | 1 | Briefing nie umleiten; Kopfzeile nach Erzeugung prüfen (Kennung · Rolle · Modell) |
| 11.10. | Prüfer | Ersatzpfad-Lauf (E2-PRUEF-B5) | Ersatzpfad mit reduzierter Bewegung aufgenommen – identisch mit dem Bildsatz, prüft nichts | 1 | Ersatzpfad-Läufe mit normaler Bewegung; Werkzeug-Standard ändern (E3-PRUEF-W1) |
| 11.10. | Orchestrator | Sichtabnahme-Belege (E2-SICHT-2) | Bildsatz mit festen zwölf Aufnahmen deckte nur rund zwei Drittel der Startseite ab | 1 | Für Sichtabnahmen `abschnitte.mjs` (ganze Höhe, je Abschnitt) zusätzlich zum Bildsatz |
| 10.10. | Orchestrator | Bewegung bei reduzierter Bewegung (E2-ORCH-09) | Globale Regel `transition-duration: 0.01ms` lässt Transitionen mit `transition-property: all` weiterlaufen; `motion-safe:transition-*` allein reicht nicht, `rotate` wurde als Übergang gemeldet | 1 | Gedrehte Elemente tragen zusätzlich `motion-reduce:transition-none`; Muster in KERN-Bausteinen übernommen |

| 11.10. | Orchestrator | Fusion (E-020) | Ein Tastaturtest ohne Hydrier-Wartepunkt wurde mit der schwereren Startseite im parallelen Lauf zweimal rot (einzeln grün); ein klebendes Formular, höher als der Bildschirm, hätte den Absenden-Knopf verdeckt | 2 | Interaktionstests immer mit `bedienbar()` beginnen; `sticky` nur für Inhalte, die sicher in den Bildschirm passen |