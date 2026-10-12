# P4-Tor (T3 Phasentor P4, E-017) · Vorschau der Hauptseiten-Entwürfe

**Gegenstand:** Vorschau-Kandidat `1c6c9cd-v`, Port 4321. Darin sind `/` (live Kern) und die sechs Hauptseiten-Entwürfe P4-08a–f (`/bad`, `/leistungen`, `/standorte`, `/blog`, `/ueber-uns`, `/kontakt`) per `freischalten.sh` in einer Kopie freigeschaltet; alle übrigen Seiten sind Bestand. Stempel: `basis 1c6c9cd · routen bad leistungen standorte blog ueber-uns kontakt · art v`.

**Bezug:** f2c4180 (= Live-Produkt vor den Entwürfen, Port 4337) für die Seiten und Ausgangsstand 707a93d (4310) bzw. PROBELAUF §7 für Besucheraufgaben.

**Kriterien:** AUFTRAG für P4 sind Z-05, Z-11 und Z-13 auf den Hauptseiten. Dazu L3: Probeläufer, Fünf-Sekunden-Probe, Mutationsprobe und ein frischer Gegenprüfer.

**Übertrag 5913897-v → 1c6c9cd-v:** Das Produkt unterscheidet sich nur in zwei Klassenlisten, dem Fokusring innen in `Kontaktblatt.tsx` und `TerminKalenderAnsicht.tsx` (E-029). Texte, Metadaten, Links und Struktur sind gleich. Deshalb gelten texte2, SEO und axe, gemessen an 5913897-v, auch für 1c6c9cd-v. Neu gemessen an 1c6c9cd-v wurden a11y-zusatz, Fotos, Wortbruch, Suite, Mutationsprobe, Probeläufer, Gegenprobe und Slop.

## Ergebnis je Kriterium

| Kriterium | Prüfung | Ergebnis | Beleg |
|---|---|---|---|
| Z-05 Bestand | Reinraum 1c6c9cd-v: npm ci, Build, typecheck, lint, `npm test`, qa:graph | alle Exit 0; nft ohne `_relaunch` | `../../cache/reinraum-1c6c9cd-v/ergebnis.txt` (lokal), T1 `../t1-1752144/ERGEBNIS.md` |
| Z-05 Bestand | Suite (12 Specs, beide Projekte) gegen die Vorschau, Kern-Zweige für `/` und die sechs Entwürfe (`RELAUNCH_FASSUNG=vorschau`) | **382 grün · 0 rot · 16 übersprungen**; Live 4337: 382/0/16 (`suite-live-4337-p4-06.json`). Nachtrag M1: Der Kern-Fall F-12 `/standorte` mobil lief zunächst nicht mit (Bestands-`fixme`); `fixme` gilt jetzt nur noch für den Bestand, Vorschau 10/10 grün. Kern-Zweige F-05 (`/bad#projekt-check`) und F-07 (`/kontakt#termin-buchen`) liefen erstmals zur Laufzeit, grün | `suite.json` |
| Z-05 Bestand | Test-Sperrklinke | **berichtigt (P4-GEG M2):** statisch Basis 456 `expect` / 109 Fälle → jetzt 507 / 116. Die frühere Angabe „501“ war die Zählung aus T2 bcd8fcb, nicht die Basis. Laufzeit 292 → 398 Fälle, Basis neu gelegt. **Offenlegung:** Die Laufzeit-Sperrklinke (`--bericht`) lief seit P3-14 in keinem T2 und wäre mit der alten Basis rot gewesen (kontaktwege mobil 1→2, navigation mobil 4→7). Alle 9 mobil ausgelassenen Fälle sind gerätebedingt (Mega-Menü und Inhaltsverzeichnis mobil ausgeblendet, Entprellung nur am Desktop synchron prüfbar); ihr Desktop-Gegenstück läuft. Regel ab jetzt: `testzahl.mjs --bericht <suite.json>` ist Pflicht in jedem T2 (LERNEN) | `../testzahl-basis.json` |
| Z-05 Bestand | Konsolenfehler | Fotos: 24 Aufnahmen, 0 Konsolenfehler · Uhr-Spec (+1/+30 Tage): 0 `pageerror` und 0 `console.error` | `../p4tor-fotos-vorschau/fotos-zusammenfassung.json`, `suite.json` |
| Z-11 Barrierefreiheit | axe (wcag2a/aa, 21a/aa, 22aa), 6 Seiten | m375 + d1440 normal, Menü, Erstbesuch: 33 Läufe, **0 ernst/kritisch**; t768 + d1920 normal: 12 Läufe, **0** (Nachtrag M4); Fehlerzustände (Funnel-Serverfehler /kontakt /leistungen, Kalender leerer Name, Projekt-Check-Serverfehler /bad; m375 + d1440, E-032): 8 Läufe, **0** (Bestand in denselben Zuständen: 28 color-contrast) | `../p4tor-axe-vorschau/axe.json`, `../p4tor-axe-vorschau2/axe.json` (Normalansichten), `../p4tor-axe-vorschau2-fehler/`, Bezug `../p4tor-axe-basis-fehler/` |
| Z-11 Barrierefreiheit | a11y-zusatz, harte Kennzahlen (E-018) | Fokus unsichtbar 0 (Bezug 474) · dünn 0 (225) · verdeckt 0 (466) · Sprung 0 (2) · Falle 0 · Sprunglink fehlt 0 · Reflow 320 0 (6) · Textabstand 0 (26) · forced-colors 0 (53) · **ohne JS: rot 4 (Bezug 0)** → **nicht ohne Verlust** (siehe nächste Zeile) | `../p4tor-a11y-vorschau3/a11y-zusatz.json`, Bezug `../p4tor-a11y-basis/` |
| Z-11 Barrierefreiheit | ohne JS (hart, P4-GEG H1) | **rot:** Der Kern-Kanal steht ohne JavaScript verborgen im HTML (4 Seiten d1440). Der Bestand rendert seinen Kanal ohne JavaScript gar nicht (`ssr: false`), hat aber einen funktionierenden WhatsApp-Link im Kopf. Bei d1440 ohne JS fehlt den Kern-Seiten jeder WhatsApp-Weg im ersten Bildschirm (Berichtigung E-029). → **P4-13**: WhatsApp-Weg im Desktop-Kopf, Kanal nur im Browser | wie oben |
| Z-11 Barrierefreiheit | nur Information (E-018), mit Bezug | Zoom CSS-Emulation: horizontal 6 (Bezug 0), verdeckt 6 (1); gleichwertige Zoomprobe 0 (1). Ring teilverdeckt (fest) 133 (221) | wie oben |
| Z-11 Werkzeug | a11y-zusatz: Umfang mehrzeiliger Inline-Links | Messkorrektur E-029. U ist die umrandete Fläche (Vereinigung der Zeilenstücke, gestapelte als ein Umriss); der erste Ansatz (Summe) ist verworfen. Nachtrag N1: Verbindungsabstand aus `outline-width`/`outline-offset` statt fest 8 px; Umriss < 2 px gilt immer als „dünn“; Selbsttest mit fünf Formen (`node a11y-zusatz.mjs --selbsttest`). Alle 80 mehrteiligen Elemente der Vorschau: Verhältnis ≥ 2,03 (Gegenprüfer) | `../p4tor-a11y-vorschau2/` (verworfen), `../../werkzeuge/a11y-zusatz.mjs` |
| Z-13 Darstellung | Fotos 6 Seiten × 4 Ansichten, Überlaufprüfung, selbst gesichtet | 24/24, 0 Fehler, **0 Überlauf**, kein abgeschnittener oder überlappender Text | `../p4tor-fotos-vorschau/` |
| Z-13 Darstellung | Wortbruch 6 Seiten × 320/375/768/1024/1440/1920 | **0** | `../p4tor-wortbruch/wortbruch.json` |
| Z-13 Pixel (P4-GEG M3) | nicht freigeschaltete Seiten der Vorschau gegen Live 4337, feste Stichprobe 16 Seiten (je Vorlage eine + statische) × 4 Ansichten | **ungültig (E-036, Maskenfehler im Werkzeug)**; nachgeprüft in Runde 2 mit berichtigtem Werkzeug: 64/0 nach Maske der Sprechblase (`../p4-tor-r2/pixel/`). Ursprünglich gemeldet: 64 Vergleiche, 0 abweichend. Der Rauschlauf Live gegen Live brach am Zeitlimit ab; bei 0 Abweichungen trägt das Ergebnis ohne ihn. Für das Live-Produkt trägt zusätzlich T1 1752144 (HTML 172 gleich, CSS gleich) | `pixel/ergebnis.json` |
| Z-06 (mitgeprüft) | texte2 gegen f2c4180 mit MIKROTEXTE | 0 rot (E-028) | `../p4tor-texte2/` |
| Z-06 (mitgeprüft) | SEO-Invarianten | 0 Abweichungen Meta/SEO; Sitemap 163; 0 kaputte Links | `../p4tor-seo-vorschau/` |
| Z-07 (Zwischenstand) | Slop-Jäger (Haiku) + Opus-Gegenprüfer je Seite | weich 23 (P0 58, −60 %) · hart 0 (P0 13). Rest: Floskeln in unantastbarem Wortlaut (→ TEXTVORSCHLAEGE) und Strukturfunde als Auflagen W1, W2, W6, W8 | `../p4tor-slop/slop-jaeger.json` |

## L3

| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Probeläufer frei (P4-11, 15 Läufe) | 15/15 gelöst, **0 hoch**; 14/15 ≤ Bezug, Tastatur a5 35 statt 114. a5-m375 11 statt 10 durch Umweg des Läufers (Gegenprobe = Bezug) | `probelauf/ERGEBNIS.md` |
| Gegenprobe Bezugswege (E-023) | 14/15 ≤ Bezug. **a3-m375 14 statt 12**: Das Kern-Anfrageformular auf `/kontakt` braucht in Schritt 3 mobil zwei Bildläufe mehr → Auflage W9. Hinweis N3: Die Befunde in `gegenprobe/matrix.json` sind aus den Eingaben des Ausgangsstands übernommen (z. B. „hoch: 87 Tabs“), nicht neu; die Gegenproben a4 enden nach erreichtem Ziel mit „nicht gefunden“ (Ortsknöpfe heißen im Kern anders) | `probelauf/ERGEBNIS.md` |
| Fünf-Sekunden-Probe (§8, E-030) | **rot.** Protokoll (zwei Bewerter, 118/120 gleich): /kontakt m375 und /leistungen m375 unter Bestand. Strenge Lesart (P4-GEG H2): gesamt 39 gegen 31, mobil durchweg besser, **am Desktop vier Rückschritte** (/standorte 5→3, /ueber-uns 4→2, /blog 5→4, /leistungen 5→4): Der Kern-Banner sitzt links unten über dem Einleitungsabsatz. Region 60 statt 35 erkannt. → **P4-13** (Banner am Desktop als Leiste) und M-20 (Zielgruppe im Wortlaut /kontakt, /leistungen, /ueber-uns) | `fuenf/ERGEBNIS.md` |
| Mutationsprobe Kern-Zweige | 6/6 erkannt (eine Testlücke F-07 geschlossen) | `mutation/MUTATION.md` |
| Gegenprüfer (Opus, frisch) | **nicht bestanden** (Z-11 und L3 nein, Abweichungen nicht vollständig): H1, H2, M1–M4, N1–N8. Umgesetzt: M1, M2, M4, N1, N2, N3, N5, N7, N8 sowie die Dokumentation zu H1/H2; offen: H1 und Banner (P4-13); M3 erledigt (Pixel 64/0) | `../../pakete/P4-GEG.rueckgabe.md` |

## Mutationsprobe
**6/6 Mutationen erkannt** (`mutation/MUTATION.md`). Mutiert wurden sechs Kern-Zweige der Entwürfe: Projekt-Check `/bad`, Kalender `/kontakt`, Blog-Suche, Festnetz im Kontaktblatt, Anfrage-Funnel (`/kontakt`, `/leistungen`, `/`) und Karteneinwilligung (`/standorte`, `/kontakt`, `/`). Rot wurden nur die zugehörigen Fälle.
- **Testlücke gefunden und geschlossen:** Der Kern-Zweig F-07 prüfte nicht, ob der angeklickte Tag gewählt wird; die Mutation „immer erster Tag“ blieb im ersten Lauf grün.
- Verschärfung in der Termin-Spec (+1 `expect`). Danach: Mutation 8 rot, Vorschau 26/26 grün, Live 26/26 grün.
- Sperrklinke statisch 507 `expect`, Basis nachgezogen.

## Auflagen für die Wellen (Freischaltung erst, wenn erfüllt oder nach L7 begründet)
- **W1 `/bad`:**
  - Vorspann mit Sternbewertung über der H1 (S-09).
  - Knopf „Musterbäder entdecken“ → „Musterbäder ansehen“ (Mikrotext).
  - Ablauf auf der Übersicht verlinken (Probeläufer M6).
- **W2 `/leistungen`:**
  - Fünf-Sekunden mobil auf Bestandsniveau (M-20).
  - Gleichtakt der vier Gewerk-Abschnitte (S-12).
- **W3 `/standorte`:** Einleitungssatz mit Zielgruppe im ersten Bildschirm frei (über P4-13).
- **W6/W8:**
  - Qualitätsversprechen als acht gleiche Karten (S-11).
  - Bildanmutung (S-14, M-02).
  - W8 `/ueber-uns`: Zielgruppe im Wortlaut (M-20).
- **W9 `/kontakt`:**
  - Fünf-Sekunden mobil (M-20).
  - Gegenprobe a3 mobil ≤ 12: Schrittwechsel des Anfrageformulars richtet die Überschrift oben aus; Dichte von Schritt 3 prüfen.
- **Z-12 (offene Abweichung aus P3):** TBT `/` mobil über dem Bestand. Paket P4-12 läuft (E-024, Auftrag 3); Messung mit `lighthouse.mjs --vergleich` (10 Paare) im ruhigen Fenster, dann T2 für `/`.

## Weitere Hinweise (Gegenprüfer N5–N8)
- **texte2 ohne Zustände (N6):** Die Zustände der Formular-Inseln (Fehler, Erfolg, Laden) misst texte2 nicht; ihr Wortlaut ist in den Funktionstests festgehalten (z. B. „Fehler beim Absenden:“, „Terminanfrage bestätigt!“), und MIKROTEXTE regelt die Erfolgs-/Ladetexte. Die 369 Einträge „hinzu“ hat der Gegenprüfer gesichtet: Hülle, Navigation, Ortsnamen, Beschriftungen, keine neue Überschrift.
- **`/` (N8):** In diesem Tor nicht neu gemessen. Belegt ist die Seite über das P3-Tor (t2-5421e5b) und die T1-Gleichheit seither (HTML 172 gleich).
- **K-006 (N7):** Regel „Ring innen an Kanten zu Tinte“ aufgenommen.

## Urteil (Stand nach Gegenprüfer)
**P4-Tor nicht bestanden.**
- **Erfüllt:** Z-05 und Z-13; Mutationsprobe; Probeläufer.
- **Offen:**
  1. **Z-11 „ohne JS“ (H1)** → P4-13.
  2. **Fünf-Sekunden-Probe:** Banner am Desktop → P4-13; Zielgruppe im Wortlaut → M-20, Entscheidung des Auftraggebers.
  4. **Z-12** (offene Abweichung aus P3) → P4-12.
- **Danach:**
  - Neue Vorschau mit Suite, a11y-zusatz und axe.
  - Fünf-Sekunden-Probe der betroffenen Ansichten neu, Bewertung nach Protokoll mit zwei Bewertern.
  - Mutationsprobe P6 mobil.
  - T2 für `/` (P4-12 + P4-13 wirken sofort).
  - Gegenprüfer Runde 2.

## Runde 2
Siehe `../p4-tor-r2/ERGEBNIS.md` (Vorschau c5ef582-v nach P4-13, T2 für `/`, Gegenprüfer P4-GEG2).
