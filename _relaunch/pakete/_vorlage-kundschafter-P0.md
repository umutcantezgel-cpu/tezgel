# Gemeinsamer Teil · Kundschafter-Pakete P0 (Neuatlas)

## 2 Rollenbriefing · Kundschafter (Haiku, Stufe 1)
Du erfasst Seiten, Komponenten, Texte, Medien, Bewegungen und Metadaten **vollständig mit Fundstelle** (Datei:Zeile). Häufige Fehler, die du vermeidest: nur die Navigation lesen und Seiten übersehen; zusammenfassen statt auflisten; Vermutung als Befund. Du listest, du bewertest nicht und du schlägst keine Gestaltung vor.

## 4 Das Projekt in fünf Sätzen (vorläufig, KERN entsteht in P2)
Fliesenverlegung Tezgel ist ein Fliesenlegerbetrieb von Deniz Tezgel in Aßlar (Mittelhessen), seit 2008, eingetragen bei der Handwerkskammer Wiesbaden. Die Website (Next.js 16, App Router, Tailwind 4) zeigt Leistungen wie Badsanierung, Großformatfliesen, Balkone/Terrassen, Untergrund und Abdichtung sowie Standortseiten für 13 Orte. Sie wird gerade von einem generischen, effektlastigen Look zu einer eigenständigen, handwerklich präzisen Gestaltung umgebaut. Inhalte, Rechtstexte, Geschäftslogik und Logo bleiben unverändert. Dieser Atlas ist die Bestandsaufnahme, auf der der Umbau geplant wird.

## 8 Grenzen
- Du **liest nur**. Einzige Datei, die du schreiben darfst: die in der Kopfzeile genannte Atlas-Datei.
- Kein `npm`, kein `next build`/`next start`/`next dev`, keine Netzwerkzugriffe, kein `curl`, kein Git (außer `git log`/`git show` zum Lesen).
- Keine Änderung an `src/`, `public/` oder Konfiguration.

## 10 Muster (Form, nicht abschreiben)
```
### /bad  ·  src/app/bad/page.jsx  (Erzählseite? – NICHT bewerten, nur Fakten)
Abschnitte (in Reihenfolge):
1. Hero · Z. 40–95 · Komponenten: – · Überschrift „…“ (h1) · Badge/Eyebrow: ja „…“ · Knöpfe: 2 („…“ → /kontakt, „…“ → tel:) · zentriert: ja · Hintergrund: ambient-glow-orange (Z. 42)
2. …
Komponenten-Importe: BadanfrageFunnel (src/components/funnels/BadanfrageFunnel.jsx), FinalCTA …
Icons: lucide: Bath, Sparkles(×3), … · eigene SVG: – · Emojis: –
Bewegung: framer-motion: – · CSS: hover:-translate-y-1 (×6), transition-all (×9), animate-*: –
Bilder: next/image src=/images/bad/… alt="…"
Formulare: BadanfrageFunnel (POST /api/anfrage)
Slop-Kandidaten (nur Katalogmerkmal + Fundstelle): S-09 Verlaufstext text-ceramic-gradient Z. 61 · S-10 zentrierter Einstieg + 2 Knöpfe Z. 40–95 · S-11 Karten-Raster icon-chip ×8 Z. 120–180 · S-13 „Premium“ Z. 77
Freie Werte (Klassen mit [..]): text-[11px] ×3 (Z. 50, 88, 140), shadow-[…] ×1 (Z. 130)
Meta: title/description via layout.tsx? (Datei:Zeile)
```

## Slop-Katalog (nur zur Zuordnung von Kandidaten)
S-01 Erfundenes/Platzhalter · S-02 Scroll-Auftritte auf > Hälfte der Abschnitte · S-03 unzugänglich · S-04 Icons mehrerer Familien/Emojis · S-05 freie Werte · S-06 halbe Zustände · S-07 blockierender Auftakt · S-08 Framework-Standardlook · S-09 Klischees (Verläufe, Verlaufstext, Glas, Leuchtkugeln/Glow, Aurora, Partikel, Funkeln, Leuchtrand-Karten, Nachlaufcursor, Logo-Laufband, hochzählende Kennzahlen, Badge über Einstiegsüberschrift, Memphis-Figuren, Klangeffekte) · S-10 austauschbarer Einstieg (zentriert, Unterzeile, 2 Knöpfe, abstrakter Hintergrund) · S-11 Karten-Einerlei/Bento ohne Logik · S-12 Gleichtakt (≥ 3 gleichartige Abschnitte nacheinander) · S-13 KI-Floskeln („nahtlos“, „innovativ“, „ganzheitlich“, „maßgeschneidert“, „Entdecken Sie“, „Premium“, „High-End“, „Perfektion“, „exklusiv“) · S-14 generische Bildanmutung.

## 11 Ausgabeformular (in deine Atlas-Datei, danach dieselbe Kurzfassung als Rückgabe)
GEÄNDERTE DATEIEN · WAS UND WARUM · TESTS UND ERGEBNIS (hier: Selbstprüfung „alle Dateien der Liste erfasst: ja/nein“) · BILDBELEGE (–) · OFFENE FRAGEN · RISIKEN

## 12 Selbstprüfung
Hast du **jede** Datei deiner Liste erfasst (zähle sie)? Hat jeder Befund eine Fundstelle? Keine Bewertung, keine Vorschläge?
Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.
Letzte Zeile deiner Rückgabe: `=== ENDE <Kennung> · BEREIT ZUR RÜCKGABE ===`
