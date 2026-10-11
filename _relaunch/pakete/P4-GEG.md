# P4-GEG · Frischer Gegenprüfer P4-Tor (T3 Phasentor P4) · Stufe 3 · Modell: Opus (frisch) · Schreibrechte: `_relaunch/pakete/P4-GEG.rueckgabe.md` · Kriterien: Z-05, Z-11, Z-13 (Hauptseiten) + L3

## Auftrag
Prüfe adversarial, ob das P4-Tor bestanden ist. Gefragt sind drei Urteile:
1. „Z-05, Z-11, Z-13 auf den Hauptseiten-Entwürfen erfüllt: ja/nein“, je Kriterium begründet.
2. „L3 (Probeläufer, Fünf-Sekunden-Probe, Mutationsprobe) tragfähig ausgewertet: ja/nein“.
3. „Die Abweichungen und Auflagen sind ehrlich und vollständig: ja/nein“. Prüfe dafür, ob etwas schöngerechnet, weggelassen oder als Information abgestuft ist, das hart zählen müsste.

Bestätige nur, was ein Beleg trägt. Übernimm keine Behauptung aus dem Ergebnis ungeprüft: Öffne die Belegdatei und vergleiche die Zahlen.

## Material
- **Ergebnis:** `_relaunch/belege/p4-tor/ERGEBNIS.md`.
- **Entscheidungen:** in `_relaunch/ENTSCHEIDUNGEN.md` die Einträge E-017, E-018, E-023, E-028, E-029, E-030, E-031.
- **Belege:**
  - `_relaunch/belege/p4-tor/` (suite.json, mutation/, probelauf/, fuenf/)
  - `_relaunch/belege/p4tor-a11y-vorschau3/`, `p4tor-a11y-vorschau2/` (verworfener Ansatz), `p4tor-a11y-vorschau/`, Basis `p4tor-a11y-basis/`
  - `p4tor-fotos-vorschau/`, `p4tor-wortbruch/`, `p4tor-axe-vorschau/`, `p4tor-texte2/`, `p4tor-seo-vorschau/`, `p4tor-slop/`
  - `t1-1752144/`, `testzahl-basis.json` (Diff per `git log -p -2 -- _relaunch/belege/testzahl-basis.json`)
- **Regeln:**
  - `_relaunch/AUFTRAG.md`: Abschnitte 6, 7, 11; Z-01 … Z-14
  - `_relaunch/PLAN.md`: Tore T1/T2/T3
  - `_relaunch/KERN.md`: K-006, K-012
  - `_relaunch/PROBELAUF.md`: §2, §3, §7, §8
  - `_relaunch/MIKROTEXTE.md`, `_relaunch/ABNAHME.md`
- **Werkzeuge:**
  - `_relaunch/werkzeuge/a11y-zusatz.mjs`: Funktion `umfangStuecke`, Messkorrektur E-029. Sieh dir die Fokusbilder unter `_relaunch/cache/a11y-zusatz/p4tor-a11y-vorschau2/tastatur/*/blog/*-fokus.png` an.
  - `_relaunch/werkzeuge/tests/` (Änderungen seit 849aa69: `git diff 849aa69 HEAD -- _relaunch/werkzeuge/tests/`).
- **Quelltext:** `git diff 849aa69 HEAD -- src/` (nur der ruhende Fokusring E-029); die Entwürfe unter `src/app/(kern)/_entwurf/` und `src/components/kern/`.

## Besonders prüfen
- **Messkorrektur E-029:**
  - Ist der Umfang mehrzeiliger Inline-Links als umrandete Fläche sachlich richtig, oder senkt sie die Hürde unzulässig?
  - Würde sie echte dünne Ringe verdecken?
- **E-030:**
  - War die Neubewertung der Fünf-Sekunden-Probe mit vorab festgelegter Regel zulässig?
  - Ist die Regel fair, für Bestand und Entwurf gleich?
- **E-031:** Gleiche Bedingung beim Ausgangsstand. Trägt das?
- **Teständerungen:**
  - Sind die Umschreibungen gleichwertig (P4-06)?
  - Ist die neu gelegte Laufzeit-Basis der Sperrklinke gerechtfertigt?
  - Ist die Verschärfung der Termin-Spec richtig?
- **Ohne JS (E-029):** WhatsApp-Kanal verborgen. Ist das wirklich kein Verlust?
- **Übertrag 5913897-v → 1c6c9cd-v:** Tragen texte2, SEO und axe der älteren Vorschau für die neue? Prüfe den Produkt-Diff.
- **UNANTASTBAR:**
  - Logo, Rechts- und Fließtexte, Überschriften der Entwürfe unverändert; erlaubt sind nur MIKROTEXTE-Zeilen (texte2).
  - Geschäftslogik nur über die gemeinsamen Hooks (G9).

## Grenzen
- Nur lesen.
- Lokale GET-Anfragen an `127.0.0.1:4321` (Vorschau) und `127.0.0.1:4337` (Basis) per `curl -s` sind erlaubt, höchstens 1 pro Sekunde.
- Keine POST-Anfragen, kein Browserlauf, kein Build oder Start, kein git mit Schreibwirkung.

## Rückgabe `_relaunch/pakete/P4-GEG.rueckgabe.md`
- Die drei Urteile.
- Befunde mit Schwere hoch/mittel/niedrig, je mit Ort, Beleg und Vorschlag.
- Eine Liste dessen, was du **nicht** prüfen konntest.
