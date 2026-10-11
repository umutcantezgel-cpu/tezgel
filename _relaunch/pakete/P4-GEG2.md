# P4-GEG2 · Frischer Gegenprüfer P4-Tor, Runde 2 · Stufe 3 · Modell: Opus (frisch) · Schreibrechte: `_relaunch/pakete/P4-GEG2.rueckgabe.md` · Kriterien: Z-05, Z-11, Z-13 (Hauptseiten) + L3; T2 für `/`

## Auftrag
Runde 1 (`_relaunch/pakete/P4-GEG.rueckgabe.md`) hat das P4-Tor nicht bestehen lassen (H1, H2, M1–M4, N1–N8). Prüfe adversarial, ob die Befunde jetzt **wirklich** behoben oder tragfähig begründet sind. Prüfe außerdem, ob P4-13, das sofort auf die Live-Startseite `/` wirkt, das T2 für `/` besteht. Gefragt sind fünf Urteile:
1. „Z-05, Z-11, Z-13 auf den Hauptseiten-Entwürfen erfüllt: ja/nein“, je Kriterium.
2. „L3 tragfähig ausgewertet: ja/nein“ (Probeläufer, Gegenprobe, Fünf-Sekunden-Probe, Mutationsprobe).
3. „T2 `/` bestanden: ja/nein“. Schwelle E-017: Ränge 1–4 grün, nichts schlechter als der Bestand, Z-12 nach E-024/E-033/E-035.
4. „Abweichungen und Auflagen ehrlich und vollständig: ja/nein“.
5. **E-035 Werkzeugregel:** „Ist die vorgeschlagene Messregel für den Aufschub (eingespeister Stil `.k-aufschub { content-visibility: visible }` nur in Werkzeugen, die die ganze Seite auf einmal lesen) zulässig: ja/nein“, mit Begründung. Prüfe dabei G7 und ob die Regel einen echten Verlust verdecken könnte (z. B. forced-colors, Zoom, Fokus).

Bestätige nur, was ein Beleg trägt. Öffne jede Belegdatei und rechne nach. Übernimm keine Behauptung aus einem Ergebnisprotokoll ungeprüft.

## Material
- **Ergebnis:** `_relaunch/belege/p4-tor/ERGEBNIS.md` (Stand nach Runde 2) und `_relaunch/belege/p4-tor/` (Unterordner).
- **Entscheidungen** in `_relaunch/ENTSCHEIDUNGEN.md`: E-013, E-017, E-018, E-023, E-024, E-029 (mit Berichtigung), E-030 (mit Nachtrag), E-031 bis E-035.
- **P4-13:** Auftrag `_relaunch/pakete/P4-13.md`, Rückgabe `P4-13.rueckgabe.md`, Belege `_relaunch/belege/p4-13/`, Code `git show 0d26ca5`.
- **P4-12:** Rückgabe `_relaunch/pakete/P4-12.rueckgabe.md`. Messungen zu A: `_relaunch/cache/p4-12/` (lokal, nur lesen).
- **Regeln:**
  - `_relaunch/AUFTRAG.md` §6, §7, §10, §11, §12; Z-01 … Z-14
  - `_relaunch/PLAN.md` (Tore)
  - `_relaunch/KERN.md` (K-006, K-009, K-011, K-012)
  - `_relaunch/PROBELAUF.md` §2, §3, §7, §8
  - `_relaunch/MIKROTEXTE.md`, `_relaunch/ABNAHME.md`
- **Werkzeuge:**
  - `_relaunch/werkzeuge/a11y-zusatz.mjs` (`umfangStuecke`, `--selbsttest`)
  - `axe.mjs` (`--fehler`, E-032)
  - `tests/` (seit 849aa69)

## Besonders prüfen
- **H1:** Steht ein WhatsApp-Weg im Server-HTML aller Kern-Seiten am Desktop? Ist der Kanal aus dem Server-HTML verschwunden? Ist „ohne JS“ wirklich grün? Prüfe per GET.
- **H2:** Fünf-Sekunden-Probe neu nach dem Banner-Umbau.
  - Wurde die Regel vorab festgelegt?
  - Gab es zwei Bewerter plus strenge Lesart?
  - Liegt eine Seite oder Ansicht unter dem Bestand, und ist die Begründung tragfähig?
- **E-033 Weg C:**
  - Liest das Kopfskript nur, oder ändert es Logik?
  - Gibt es Fälle, in denen Platz reserviert bleibt, ohne dass ein Banner erscheint (Restfall E-034)?
  - Wird ein Sonderweg für Tests oder Lighthouse erkannt (G7)?
- **E-034:** Tragen die Abweichungen (a3-d1440 +1, Einleitung bei 1024/1280) oder sind sie schöngerechnet?
- **T2 `/`:** build-vergleich gegen Live, Pixel `/`, Lighthouse `/` (verschränkt, ruhiges Fenster), INP, Suite. Erkläre jede Abweichung.

## Grenzen
- Nur lesen.
- GET per `curl -s` nur an 127.0.0.1-Ports, die im ERGEBNIS genannt sind, höchstens 1 pro Sekunde.
- Kein Browserlauf, kein Build oder Start, kein POST, kein git mit Schreibwirkung.

## Rückgabe `_relaunch/pakete/P4-GEG2.rueckgabe.md`
- Die vier Urteile.
- Je Befund aus Runde 1: behoben / tragfähig begründet / offen.
- Neue Befunde mit Schwere, Ort, Beleg und Vorschlag.
- Was du **nicht** prüfen konntest.
