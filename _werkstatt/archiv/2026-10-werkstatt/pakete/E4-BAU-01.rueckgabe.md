# Rückgabe E4-BAU-01 · Baumeister

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/bad/badsanierung/page.jsx`
- `src/app/(bestand)/bad/bad-aus-einer-hand/page.jsx`
- Git-Status geprüft: nur diese zwei Dateien von mir. Kein Commit, kein Push.

## WAS UND WARUM
Beide Seitenkörper auf KERN v2 nach dem Muster von `bestand/bad/page.jsx` umgebaut:
- Einstieg `art="erzaehl"`: Badge wird Mono-Etikett (gleicher Wortlaut), H1 behält die bisherige ID, Vorspann unverändert, Aktionen als `Knopf`, rechts `Planblatt` mit `Verlegeplan` (`badsanierung` bzw. `bad`, `ohneAchse bemassung={false} interaktiv`). Blatt-Name nach Regel aus dem Metadaten-Titel.
- Alle Abschnitte in `<Leitachse>` mit `leitachse`; ab dem ersten Bildschirm `spaet`.
- badsanierung: Ablauf als `Schrittfolge` senkrecht (6 Schritte; waagrecht entstünden graue Restzellen), darunter die Bewertung mit `stern-voll`. `QualityPromise` unverändert. Anfrage in einem Abschnitt auf Fliese: `BadanfrageFunnel` (dynamic, Ladehinweis wie in der Referenz) 8 Spalten, `Rueckfrage` 4 Spalten.
- bad-aus-einer-hand: Vorteile als `Feldraster` (4 Felder) statt Icon-Kacheln; sonst wie oben.
- Entfallen: Lucide-Imports, Icon-Kacheln, Glow-Ebenen, Schatten, Verläufe. Keine neue Bewegung (kein `flucht`, kein `auftritt`).
- Vorlauf `umbau.mjs --schreiben` lief; danach von Hand neu gebaut (`ersatz`-Import entfernt).

## GEMEINSAME DATEIEN
1. `src/components/kern/Rueckfrage.tsx`: Prüfwerkzeug meldet Überlappung am Seitenende (siehe Offene Fragen). Nicht von mir geändert.
2. `_werkstatt/werkzeuge/test-zuordnung.json`: kein Eintrag für beide Pfade, daher keine Funktionstests. Vorschlag: Muster für `bad/badsanierung` und `bad/bad-aus-einer-hand` auf `funktion-badanfrage` und `funktion-kontaktwege` setzen.
3. Kundenstimme: als Baustein in `kern/` nicht vorhanden. Figur hier mit Kern-Klassen gebaut.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A GESAMT GRÜN (Exit 0, 74 s). tsc GRÜN (0 eigene, 0 übrige). eslint 0 Fehler, 0 Warnungen.
- Funktionstests ÜBERSPRUNGEN (keine Zuordnung).
- Bilder: HTTP 200 beide. Konsole 0. Überlauf 0 (m390, d1440). Bad-aus-einer-hand Überlappung 0. Badsanierung d1440 Überlappung 2 (siehe Offene Fragen).
- Textvergleich GRÜN gegen e0. Unerlaubt entfernt je Seite 0 (beide).
- Textprobe gegen HEAD: nur Verschiebungen von Badge bzw. H2 in Props mit gleichem Wortlaut. IDs `workflow-heading` und `vorteile-heading` im gerenderten HTML bestätigt.
- `werte.mjs`: 0 Befunde. Bezeichner-Probe: leer.
- Mengen: 6 von 6 Schritte, 4 von 4 Vorteile. Merkmalsliste nicht vorhanden, daher nicht ergänzt.

## BILDBELEGE
Unter `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-BAU-01/`:
- `bilder/bad__badsanierung/{m390,d1440}.jpg`
- `bilder/bad__bad-aus-einer-hand/{m390,d1440}.jpg`
- `voll/m390-voll.jpg`, `voll/d1440-voll.jpg` (Ganzseite badsanierung)

## MIKROTEXT ALT → NEU
Keine Änderung an Knopftexten, Überschriften oder Fließtexten.
- badsanierung: Badge „Der Weg zum neuen Bad“ → Abschnitt-Etikett (gleich). „HWK Fachbetrieb · …“ → Mono-Etikett (gleich).
- bad-aus-einer-hand: Badge „Rundum-Sorglos-Service · Aßlar & Wetzlar“ → Mono-Etikett (gleich). Vorteile-Badge „{Bewertung} · {Anzahl} {Label}“ → Abschnitt-Etikett, Stern-Icon entfällt.
- Neu (Komponenten-Wortlaut): Ladehinweis „Anfrageformular wird geladen...“ (wie Referenz). Plan-Felder Blatt, Verband, Betrieb, Inhaber, Kammer, Betrieb seit. Rückfrage-Labels Ansprechpartner, Telefon, Mobil & WhatsApp, E-Mail, Sitz.
- Schritte: das aria-hidden „01“ entfällt, die Nummer steht sichtbar in der Schrittfolge. Kein Textverlust; Screenreader lesen „01“ zusätzlich.

## OFFENE FRAGEN
1. Blatt-Name: Die Regel (Teil vor „:“, „–“, „|“) ergibt „Badsanierung Wetzlar & Aßlar“ bzw. „Bad aus einer Hand Wetzlar & Aßlar“. Die Referenz `/bad` nutzt „Badsanierung“. Welcher Wert gilt?
2. Badsanierung d1440: Das Prüfwerkzeug meldet 2 sticky-Überlappungen. Die Rückfrage-Spalte am Ende des Anfrageblocks liegt im Prüfbild über Telefon und „Aufmaß anfragen“ im Kopf. Die Referenz `/bad` zeigt denselben Befund. Vermutlich gemeinsame Ursache im Baustein, nicht in meinen Dateien behebbar. Manuelle Sichtprüfung am Seitenende empfohlen.
3. Kein Abschluss (`FinalCTA`) ergänzt, die Ausgangsseiten hatten keinen.
4. `QualityPromise` bleibt ohne `leitachse` und `spaet`, da die Komponente unverändert bleibt.
