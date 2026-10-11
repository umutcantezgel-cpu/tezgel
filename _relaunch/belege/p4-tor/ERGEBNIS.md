# P4-Tor (T3 Phasentor P4, E-017) · Vorschau der Hauptseiten-Entwürfe

**Gegenstand:** Vorschau-Kandidat `1c6c9cd-v`, Port 4321. Darin sind `/` (live Kern) und die sechs Hauptseiten-Entwürfe P4-08a–f (`/bad`, `/leistungen`, `/standorte`, `/blog`, `/ueber-uns`, `/kontakt`) per `freischalten.sh` in einer Kopie freigeschaltet; alle übrigen Seiten sind Bestand. Stempel: `basis 1c6c9cd · routen bad leistungen standorte blog ueber-uns kontakt · art v`.

**Bezug:** f2c4180 (= Live-Produkt vor den Entwürfen, Port 4337) für die Seiten und Ausgangsstand 707a93d (4310) bzw. PROBELAUF §7 für Besucheraufgaben.

**Kriterien:** AUFTRAG für P4 sind Z-05, Z-11 und Z-13 auf den Hauptseiten. Dazu L3: Probeläufer, Fünf-Sekunden-Probe, Mutationsprobe und ein frischer Gegenprüfer.

**Übertrag 5913897-v → 1c6c9cd-v:** Das Produkt unterscheidet sich nur in zwei Klassenlisten, dem Fokusring innen in `Kontaktblatt.tsx` und `TerminKalenderAnsicht.tsx` (E-029). Texte, Metadaten, Links und Struktur sind gleich. Deshalb gelten texte2, SEO und axe, gemessen an 5913897-v, auch für 1c6c9cd-v. Neu gemessen an 1c6c9cd-v wurden a11y-zusatz, Fotos, Wortbruch, Suite, Mutationsprobe, Probeläufer, Gegenprobe und Slop.

## Ergebnis je Kriterium

| Kriterium | Prüfung | Ergebnis | Beleg |
|---|---|---|---|
| Z-05 Bestand | Reinraum 1c6c9cd-v: npm ci, Build, typecheck, lint, `npm test`, qa:graph | alle Exit 0; nft ohne `_relaunch` | `../../cache/reinraum-1c6c9cd-v/ergebnis.txt` (lokal), T1 `../t1-1752144/ERGEBNIS.md` |
| Z-05 Bestand | Suite (12 Specs, beide Projekte) gegen die Vorschau, Kern-Zweige für `/` und die sechs Entwürfe (`RELAUNCH_FASSUNG=vorschau`) | **382 grün · 0 rot · 16 übersprungen**; gleiche 16 wie am Live-Stand (4337: 382/0/16). Kern-Zweige F-05 (`/bad#projekt-check`) und F-07 (`/kontakt#termin-buchen`) liefen erstmals zur Laufzeit, grün | `suite.json` |
| Z-05 Bestand | Test-Sperrklinke | statisch grün: expect 506 statt Basis 501. Laufzeit-Basis neu gelegt: Die alte vom 10.10. kannte die Seitenschleifen aus P3-14 noch nicht. Alle 9 mobil ausgelassenen Fälle sind gerätebedingt (Mega-Menü und Inhaltsverzeichnis mobil ausgeblendet, Entprellung nur am Desktop synchron prüfbar), und ihr Desktop-Gegenstück läuft | `../testzahl-basis.json` |
| Z-05 Bestand | Konsolenfehler | Fotos: 24 Aufnahmen, 0 Konsolenfehler · Uhr-Spec (+1/+30 Tage): 0 `pageerror` und 0 `console.error` | `../p4tor-fotos-vorschau/fotos-zusammenfassung.json`, `suite.json` |
| Z-11 Barrierefreiheit | axe (wcag2a/aa, 21a/aa, 22aa), 6 Seiten × Ansichten + Zustände | 33 Läufe, **0 ernst/kritisch** | `../p4tor-axe-vorschau/axe.json` |
| Z-11 Barrierefreiheit | a11y-zusatz, harte Kennzahlen (E-018) | Fokus unsichtbar 0 (Bezug 474) · dünn 0 (225) · verdeckt 0 (466) · Sprung 0 (2) · Falle 0 · Sprunglink fehlt 0 · Reflow 320 0 (6) · Textabstand 0 (26) · forced-colors 0 (53) → **ohne Verlust, deutlich besser** | `../p4tor-a11y-vorschau3/a11y-zusatz.json`, Bezug `../p4tor-a11y-basis/` |
| Z-11 Barrierefreiheit | nur Information | Zoom per CSS-Emulation horizontal 6, gleichwertige Zoomprobe 0 (E-018). Ohne JS: WhatsApp-Kanal im ersten Bildschirm verborgen (4 Seiten d1440). Das ist begründet (E-029): Ohne Skript lässt sich nicht prüfen, ob er etwas verdeckt; der Bestand zeigt dort einen toten `<button>`; WhatsApp steht in Fuß und Leiste | wie oben |
| Z-11 Werkzeug | a11y-zusatz: Umfang mehrzeiliger Inline-Links | Messkorrektur E-029. U ist die umrandete Fläche (Vereinigung der Zeilenstücke, gestapelte als ein Umriss), an drei Formen nachgerechnet; der erste Ansatz (Summe) ist verworfen | `../p4tor-a11y-vorschau2/` (verworfen), `../../werkzeuge/a11y-zusatz.mjs` |
| Z-13 Darstellung | Fotos 6 Seiten × 4 Ansichten, Überlaufprüfung, selbst gesichtet | 24/24, 0 Fehler, **0 Überlauf**, kein abgeschnittener oder überlappender Text | `../p4tor-fotos-vorschau/` |
| Z-13 Darstellung | Wortbruch 6 Seiten × 320/375/768/1024/1440/1920 | **0** | `../p4tor-wortbruch/wortbruch.json` |
| Z-06 (mitgeprüft) | texte2 gegen f2c4180 mit MIKROTEXTE | 0 rot (E-028) | `../p4tor-texte2/` |
| Z-06 (mitgeprüft) | SEO-Invarianten | 0 Abweichungen Meta/SEO; Sitemap 163; 0 kaputte Links | `../p4tor-seo-vorschau/` |
| Z-07 (Zwischenstand) | Slop-Jäger (Haiku) + Opus-Gegenprüfer je Seite | weich 23 (P0 58, −60 %) · hart 0 (P0 13). Rest: Floskeln in unantastbarem Wortlaut (→ TEXTVORSCHLAEGE) und Strukturfunde als Auflagen W1, W2, W6, W8 | `../p4tor-slop/slop-jaeger.json` |

## L3

| Prüfung | Ergebnis | Beleg |
|---|---|---|
| Probeläufer frei (P4-11, 15 Läufe) | 15/15 gelöst, **0 hoch**; 14/15 ≤ Bezug, Tastatur a5 35 statt 114. a5-m375 11 statt 10 durch Umweg des Läufers (Gegenprobe = Bezug) | `probelauf/ERGEBNIS.md` |
| Gegenprobe Bezugswege (E-023) | 14/15 ≤ Bezug. **a3-m375 14 statt 12**: Das Kern-Anfrageformular auf `/kontakt` braucht in Schritt 3 mobil zwei Bildläufe mehr → Auflage W9 | `probelauf/ERGEBNIS.md` |
| Fünf-Sekunden-Probe (§8, E-030) | 10/12 Seiten-Ansichten erfüllt. Region 60 statt 35 erkannt. **/kontakt m375 2/5 und /leistungen m375 4/5 unter Bestand**: Die Zielgruppe steht nirgends im Wortlaut (M-20) → Auflage W2/W9 | `fuenf/ERGEBNIS.md` |
| Mutationsprobe Kern-Zweige | 6/6 erkannt (eine Testlücke F-07 geschlossen) | `mutation/MUTATION.md` |
| Gegenprüfer (Opus, frisch) | siehe unten | `../../pakete/P4-GEG.rueckgabe.md` |

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
- **W6/W8:**
  - Qualitätsversprechen als acht gleiche Karten (S-11).
  - Bildanmutung (S-14, M-02).
- **W9 `/kontakt`:**
  - Fünf-Sekunden mobil (M-20).
  - Gegenprobe a3 mobil ≤ 12: Schrittwechsel des Anfrageformulars richtet die Überschrift oben aus; Dichte von Schritt 3 prüfen.
- **Z-12 (offene Abweichung aus P3):** TBT `/` mobil über dem Bestand. Paket P4-12 läuft (E-024, Auftrag 3); Messung mit `lighthouse.mjs --vergleich` (10 Paare) im ruhigen Fenster, dann T2 für `/`.

## Urteil
_folgt nach Mutationsprobe und Gegenprüfer_
