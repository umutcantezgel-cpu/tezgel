# Werkstatt-Aufträge im Relaunch-Ablauf (E-038/E-039) · gilt für jeden Auftrag S-12 ff., der auf einen `_werkstatt/pakete/E*-BAU-*.md` verweist

Lies diese Datei ganz, dann `_relaunch/pakete/_seitenregeln.md` (gilt), dann den Werkstatt-Auftrag, auf den dein S-Auftrag zeigt.
Der Werkstatt-Auftrag liefert **Inhalt und Maßstab** (Aufgabe, Referenz der Familie, Einstieg mit Planblatt, Komposition,
Systemwerte, Bestandsschutz). Für **Ablauf, Grenzen, Prüfung und Rückgabe** gilt dagegen das hier Folgende. Bei Widerspruch:
dein S-Auftrag vor dieser Datei vor den Seitenregeln vor dem Werkstatt-Auftrag.

## Was im Werkstatt-Auftrag nicht mehr gilt
- Branch `claude/amazing-mendel-b0g40w` → hier **`main`** (Git nur lesend).
- Server 4310/4320 → hier **Entwicklung http://127.0.0.1:4350** (Arbeitsbaum) und **Live-Stand http://127.0.0.1:4362**
  (Build 44b83f2 = www.tezgel.de). Nicht starten oder stoppen.
- Scratchpad `…/dace07c4-…/scratchpad/` → hier `/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad/<kennung>/`.
- Prüfstufe A (`pruefe-a.sh`) → hier die **Prüfungen 1–9 der Seitenregeln** (Texttreue gegen 4362 statt 4337).
- Rückgabe `_werkstatt/pakete/…rueckgabe.md` → hier `_relaunch/pakete/<S-Kennung>.rueckgabe.md` (Format der Seitenregeln).
  Belege nur JSON/Text unter `_relaunch/belege/<s-kennung>*`; Bilder nur im Scratchpad.
- Modell „ARBEITSMODELL“ → du bist Opus; `umbau.mjs` darfst du als mechanischen Vorlauf nutzen (Trockenlauf zuerst).

## Was seit dem Werkstatt-Auftrag neu gilt (Lehren aus Fusion II und R-01)
- **Formulare über `next/dynamic`:** `loading` immer mit `FormularPlatzhalter` (`src/components/funnels/TezgelAnfrageFunnel/Platzhalter.tsx`,
  Muster `src/app/(bestand)/bad/page.jsx`) – ohne JavaScript ein gleichwertiger Weg (Telefon, WhatsApp, E-Mail).
- **`spaet` nie auf einem Sprungziel** (Abschnitt mit `id`, auf das Links zeigen) und nicht auf Abschnitten mit
  Formularen/Funnels; sonst landen Sprünge daneben bzw. Prüfwerkzeuge lesen den Inhalt nicht.
- **Sprungziele:** kein eigenes `scroll-mt-*` (`scroll-padding-top` in `globals.css` reicht; Landeplatz 96 px).
- **Pflichtsternchen** nur über `pflichtKlassen` (grau), nie rot. **Rot** nur Achse/Anriss/Fehlerzeichen; die Leitachse ist
  grau, rot nur das gezogene Stück – kein weiteres rotes Element in einem Bildschirm mit Plan-Laser.
- **Wertende Eckmarken/Badges** („Sehr beliebt“, „#1 …“) ohne Beleg entfallen nicht still: wörtlich als Mono-Etikett lassen
  oder unter TEXTVORSCHLÄGE/OFFENE FRAGEN melden.
- Parallel arbeiten bis zu vier weitere Baumeister im selben Arbeitsbaum; fremde Dateien nie anfassen. Playwright-Läufe mit
  eigenen Ausgabepfaden: `RELAUNCH_REPORT=…/scratchpad/<kennung>/pw.json RELAUNCH_OUTPUT=…/scratchpad/<kennung>/pw`.

## Rückgabe zusätzlich
Abschnitt **UMSETZUNG** je Seite: Einstieg (Plan, Blatt), Abschnittsfolge, verwendete Bausteine, entfernte Altklassen
(Zahl vorher → nachher aus dem Altsystem-grep), Textprobe-Ergebnis.
