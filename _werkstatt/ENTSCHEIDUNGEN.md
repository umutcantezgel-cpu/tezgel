# ENTSCHEIDUNGEN · Lauf „Verständlich, echt, ausgezeichnet“

Folgenreiche Entscheidungen mit Begründung. Denkprotokolle (Ziel, drei Wege, Bewertung nach Nordstern, Kriterien, Risiko und Aufwand, Umkehrprobe, Folgen zweiter Ordnung) stehen bei den Einträgen, die der Auftrag dafür vorsieht. Entscheidungen des Vorlaufs: `archiv/2026-10-werkstatt/ENTSCHEIDUNGEN.md` und `_relaunch/ENTSCHEIDUNGEN.md`.

## E-001 · Arbeitsbranch (23.10.2026, E0)
`claude/tezgel-website-redesign-iqxt8z`. Die Cloud-Sitzung gibt diesen Branch verbindlich vor; er geht dem Standard `werkstatt/tezgel-[Startdatum]` und dem veralteten Branch `claude/amazing-mendel-b0g40w` im alten CLAUDE.md-Block vor. Er enthält main (388fa7b, live) und drei Bild-Commits vom 23.10. Push nur dorthin, nie main, nie erzwungen.

## E-002 · Neuer Lauf statt Wiederaufnahme (23.10.2026, E0)
Das vorgefundene `_werkstatt` gehört zum Werkstatt-Lauf vom 10. bis 12.10. (anderer Auftrag, Status HALT und ÜBERGEBEN). L5 greift deshalb nicht. Seine Dokumente, Pakete, Berichte und Belege liegen jetzt in `archiv/2026-10-werkstatt/` (per `git mv`, Geschichte bleibt). Weiter genutzt werden `werkzeuge/`, `register.json` (aktuelles Bewegungsregister bis KERN v3), `GRUNDMENGE.json` (Seitenmenge bis zur Neuerhebung), `KERN.md` v2 (bis v3 sie ersetzt, Kopie im Archiv) und `bilder/referenzen/`. `_relaunch` bleibt unberührt.

## E-003 · Fehlender Auftragsteil wird rekonstruiert (23.10.2026, E0)
Der übermittelte Auftrag bricht in Abschnitt 14 mitten in Stufe B ab. Auf Wahl des Auftraggebers („Rekonstruieren“) steht in `AUFTRAG.md` unter dem wörtlichen Text ein markierter Block „ERGÄNZUNG · rekonstruiert (Annahme)“: Rest von Stufe B, Stufe C, Award-Rubrik, L0 bis L7, Z-01 bis Z-14, Risiken, Status und Start. Quelle: Vorgänger-Auftrag und Abschnitte 0 bis 13. Wird der Originaltext nachgereicht, ersetzt er den Block.

## E-004 · Bildquelle und Originale (23.10.2026, E0)
BILDQUELLE sind die 84 Originale (iPhone-Bildschirmfotos), die am 23.10. in `bilder/referenzen/originale/` committet wurden (dec6dd3, 35af5cc). G4 verbietet Originale im Commit: Sie liegen jetzt in `_eingang/entpackt/` (in .gitignore) und sind aus dem Baum genommen. Wiederherstellung: `git checkout 35af5cc -- _werkstatt/bilder/referenzen/originale`, dann nach `_eingang/entpackt/` verschieben und wieder aus dem Index nehmen (EINRICHTUNG.md). Die Geschichte bleibt unverändert (G2); die Folge steht als M-01 in MENSCHEN.md.

## E-005 · Modelle, Plätze und Orchestrierung (23.10.2026, E0)
Jeder Haiku-Agent wird mit ausdrücklichem Modell aufgerufen. Der Container hat 4 Kerne; ein Workflow führt deshalb höchstens 2 Agenten gleichzeitig aus. Rechenleichte Wellen laufen in bis zu zwei parallelen Workflows plus Hintergrundagenten, zusammen höchstens 5 (HAIKU-PLÄTZE). Build, Lighthouse und Playwright laufen nacheinander, Lighthouse in einem Ruhefenster. Jede Welle: Haiku baut oder schreibt, ein zweiter Haiku prüft nach Stufe A, der Orchestrator nimmt ab.

## E-006 · Technikgutachten zu B-01 und B-02 (23.10.2026, E0)
Zwei lesende Gutachten (`berichte/E0-GUT-01-b01-next16.md`, `berichte/E0-GUT-02-b02-leistung.md`) haben die Annahmen gegen den Quelltext von Next 16.3.6 und Lighthouse 13.5 geprüft. Folgen für den Plan: Klick-Abfangen über einen Capture-Listener ist tragfähig (`next/link` prüft `defaultPrevented`); Abschlusserkennung ohne `useSearchParams` im Root-Layout; für Zurück und Vor zwei Wege (Aufschub oder sicher), Entscheidung in E2 per Test; das Lighthouse-Werkzeug bekommt ein frisches Profil je Lauf; die LCP-Ursache auf `/` (3,46 s) wird vor Intro und Startbild behoben.
