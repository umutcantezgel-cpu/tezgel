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

## L6 · Lernen
| Datum | Rolle | Pakettyp | Fehler | Häufigkeit | Maßnahme |
|---|---|---|---|---|---|
| 10.10. | Kundschafter (Planung) | Workflow-Agent | Leerer Auftrag („NaN“) bei einem von fünf Agenten | 1 | Paket über Agent-Werkzeug neu gestartet; Briefings künftig als Datei + kurzer Verweis |
