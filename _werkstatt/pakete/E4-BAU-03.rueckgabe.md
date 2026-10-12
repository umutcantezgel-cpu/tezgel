# E4-BAU-03 · Rückgabe Baumeister (Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/bad/badplaner/page.jsx`
- `src/app/(bestand)/bad/badanfrage/page.jsx`
- `src/app/(bestand)/bad/projekt-check/page.jsx`

Keine weiteren Dateien. Kein Commit, kein Push.

## WAS UND WARUM
- Alle drei Seiten: Kopf als `Einstieg art="arbeit"`, Eyebrows als Etikett mit gleichem Wortlaut, H1 mit Bestandswortlaut. Ambient-Glows, Ceramic-, Glass-, Eyebrow- und lucide-Klassen entfallen; Werte nur Systemskala; eine Icon-Familie.
- Anfragewege (BadanfrageFunnel, BadProjektCheck) per `next/dynamic` mit Ladehinweis wie in der Referenz. Darin `Abschnitt art="arbeit" flaeche="fliese" spaet` mit Funnel (8 Spalten) und `Rueckfrage` (4 Spalten, ab lg). Hüllen tragen `id="anfrage"` bzw. `id="projekt-check"` und `aria-label` „Badanfrage“ bzw. „Bad-Projektcheck“.
- QualityPromise (badanfrage, projekt-check) und die Metadaten unverändert.
- /bad/badplaner:
  - Tipp als `Hinweis art="merk"` mit H2 `badplaner-tipp-heading` als Titel. Ein Abschnitt ohne Inhalt hätte 48 px leeren Abstand erzeugt.
  - Anleitung: `Abschnitt id="planung" titelId="planung-heading" kopf="seitlich"` mit `Schrittfolge` waagrecht. Der Titel behält das sr-only „Schritt 01: “.
  - „Und danach?“: `Feldraster spalten={3}`, je Feld ein Link über die ganze Fläche. Die lucide-Symbole der Datensätze entfallen.
  - Knöpfe: „Zur Schritt-für-Schritt-Anleitung“ (haupt, `#planung`) und „Projektcheck starten“ (neben).
- Umbau-Skript vorab mit `--schreiben` gelaufen, danach Struktur von Hand neu geschrieben.

## MIKROTEXT ALT → NEU
Keine Wortlautänderung. Verschoben in Props, Wortlaut gleich: „Anleitung“, „So funktioniert die Badplanung“, „Und danach?“. Neu: Ladehinweis „Anfrageformular wird geladen...“ (wie Referenz) und die Texte der Rückfrage (Ansprechpartner, Telefon, Mobil & WhatsApp, E-Mail, Sitz).

## GEMEINSAME DATEIEN (nicht geändert)
1. `src/components/kern/Schrittfolge.tsx`: Option, die Schrittnummer aria-hidden zu setzen. Im Bestand war sie aria-hidden, sonst liest der Badplaner „01“ doppelt mit „Schritt 01: …“. Standard unverändert lassen.
2. `_werkstatt/werkzeuge/test-zuordnung.json`: Muster `\(bestand\)/bad/(badplaner|badanfrage|projekt-check)/page` auf `funktion-badanfrage.spec.mjs` und `funktion-projektcheck.spec.mjs` erweitern. Heute ordnet pruefe-a.sh diesen Dateien nur navigation und kontaktwege zu.

## PRÜFUNG UND ERGEBNIS
Prüfstufe A `pruefe-a.sh E4-BAU-03 …`: Gesamt GRÜN, Exit 0, 341 s.
- Typprüfung: GRÜN, 0 Fehler in eigenen Dateien, 0 übrige.
- Lint: GRÜN, 0 Fehler, 0 Warnungen.
- Funktionstests nach Zuordnung (navigation, kontaktwege): GRÜN, 72 erwartet, 0 unerwartet, 0 flaky.
- Funnel-Tests zusätzlich, manuell (funktion-badanfrage, funktion-projektcheck): 32 bestanden, mobil und Desktop.
- Bilder: HTTP 200 auf allen drei Seiten, Konsole 0, Überlauf 0 (m390 und d1440).
- Textvergleich gegen e0: GRÜN, entfernt 0, hinzugefügt 86 (Rückfrage, Ladehinweise, Verschiebungen).
- werte.mjs: 0 Befunde. bezeichner.cjs: keine offenen Bezeichner.
- Textprobe: nur Prop-Verschiebungen als ENTFERNT. Die ID `planung-heading` steht im gerenderten HTML weiterhin am H2.

## BILDBELEGE (Scratchpad `E4-BAU-03/`)
- `bilder/bad__badplaner/{m390,d1440}.jpg`, `bilder/bad__badanfrage/{m390,d1440}.jpg`, `bilder/bad__projekt-check/{m390,d1440}.jpg`
- Kopf-Nachweis: `nachweis/kopf-902.png`
- Logs: `lauf-pruefe-a.log`, `funnel-tests.log`

## OFFENE FRAGEN
1. Überlappung je 2 auf d1440 bei /bad/badanfrage und /bad/projekt-check. Die klebende Rückfrage (`lg:sticky lg:top-24`) rutscht am Seitenende unter den Kopf. Der Kopf ist opak (`bg-kalk`, z-40) und liegt darüber, der Kopftext bleibt lesbar (Nachweis). `ueberlappung.mjs` wertet ohne Z-Reihenfolge. Entscheidung nötig: Prüfregel anpassen oder Rückfrage ohne Klebung. Die Bildstufe von pruefe-a.sh wertet nur HTTP, deshalb ist das Gesamt GRÜN.
2. Einstieg ohne Knöpfe auf badanfrage und projekt-check: Der Bestand hat keine Knöpfe im Kopf, und ein Knopf wäre neuer Mikrotext. Vorschlag „Zum Formular“ mit Ziel `#anfrage` bzw. `#projekt-check`, nur mit Freigabe.
3. QualityPromise läuft mit Erzählmaß (Standard). `art="arbeit"` wäre auf den beiden Arbeitsansichten konsistent. Props nicht geändert.
4. Tipp als Hinweis mit H2 statt Abschnitt: Abweichung von der Vorgabe, begründet oben.
