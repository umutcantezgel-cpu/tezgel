# E4-NACH-07 · Rückgabe (Baumeister, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/bad/page.jsx` (einzige Datei; sonst nichts angefasst)

## WAS UND WARUM
- **Befund 15 (Raster):** Projektcheck und Badanfrage ohne `kopf="seitlich"`, je Abschnitt `grid gap-y-12 lg:grid-cols-12 lg:gap-x-12`. Funnel in `min-w-0 lg:col-span-8`, `<Rueckfrage />` in `lg:col-span-4` (ab lg klebend, unter lg nach dem Funnel). Keine leere Rasterspalte mehr.
- **Befund 16 (Überlauf):** `min-w-0` an der Funnel-Zelle. Telefon-Link im Satz unter den Kategorien bekommt `whitespace-nowrap`. Der Überlauf im Funnel-Inneren bleibt, siehe offene Fragen.
- **Befund 17 (Grundrisse):** Basic, Premium und Luxus tragen je Feld oben einen `Verlegeplan` (`ohneAchse`, `bemassung={false}`, Hülle `w-1/2`). Konstante `TIER_PLAENE` in der Seite. Basic: Wanne klein in der Ecke. Premium: Gefälle und Rinne (bodengleich). Luxus: freistehende Wanne mittig, großes Format im Drittelverband. Keine Flächenangaben, keine Bewegung (kein `interaktiv`, kein `flucht`).
- **Befund 8:** Stern im Einstiegs-Etikett `stern` → `stern-voll`.
- **Tempo:** Projektcheck und Badanfrage per `dynamic()` nachgeladen (Muster der Startseite). Alle vier Abschnitte nach dem Einstieg tragen `spaet`.
- Kopfkommentar an die neue Struktur angepasst. Wortlaut, IDs (`projekt-check`, `anfrage`), Überschriften, Links und Lesefolge unverändert.

## MIKROTEXT (alt → neu)
- Icon-Name (kein sichtbarer Text): `stern` → `stern-voll`.
- Neu: Lade-Text „Anfrageformular wird geladen...“ (zwei Stellen, Wortlaut aus dem Muster der Startseite; vorher kein Lade-Text).
- Sonst keine Textänderung. `textprobe.cjs` gegen HEAD: ENTFERNT nur der Icon-Name, HINZU nur die zwei Lade-Texte.

## GEMEINSAME DATEIEN (Wünsche, nicht geändert)
- `src/components/funnels/BadProjektCheck/Zusammenfassung.jsx` (Funnel-Inneres): Der Wert „Wünsche“ ragt über den Rand der Angabenliste (ca. 17 px). Ursache: die Zeile ist ab `sm` eine Flex-Reihe in der schmalen Spalte (rund 270 px). Vorschlag: Zeile unter `2xl` stapeln (`flex-col`) oder die Spalte breiter machen.
- `src/components/funnels/BadProjektCheck/Zusammenfassung.jsx`: „Sofort anrufen: 06441 / 44 83 567“ bricht zweizeilig um. Vorschlag: Telefonnummer im Knopf `whitespace-nowrap`.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A (`pruefe-a.sh E4-NACH-07 'src/app/(bestand)/bad/page.jsx' -- /bad /bad/projekt-check`):
  - tsc: GRÜN, 0 Fehler in eigenen Dateien, 0 übrige.
  - eslint: GRÜN, 0 Fehler, 0 Warnungen.
  - Funktionstests projektcheck, kontaktwege, badanfrage: GRÜN, 63 erwartet, 0 unerwartet, 0 flaky.
  - Bilder: GRÜN, HTTP 200, Konsole 0, Überlauf 0. Einzige Meldung: Überlappung 2 (sticky) auf /bad im Vollbild, siehe Bildbelege.
  - Textstufe: ROT durch andere Seiten. Für `/bad` 0 entfernt, 0 unerlaubt entfernt. `/bad/projekt-check` hat 7 unerlaubt entfernte Spannen in der Fußzeile (WhatsApp:, Fax:) und Hinweis-Zeilen. Das liegt in Fuß und gemeinsamen Bausteinen, nicht in meiner Datei.
- `werte.mjs --dateien …`: 0 Befunde (auch nach der letzten Änderung).
- `git status`: eigene Änderung nur `bad/page.jsx`. Die übrigen geänderten Dateien stammen von anderen Paketen.
- Kein Build, kein Serverstart, keine Formularsendung. Server 4310 und 4320 antworten.

## BILDBELEGE (Ordner unter `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-07/`)
- Vorher, 1440 Vollbild: `vorher/d1440-voll.jpg`. Zeigt die leere rechte Fläche und den Umbruch in der Zusammenfassung.
- Nachher, 1440 Vollbild: `nachher/d1440-voll.jpg`. Rückfrage rechts, drei Grundrisse.
- Nachher, 390 Vollbild: `nachher/m390-voll.jpg` (automatisch geprüft, nicht ausschnittweise gesichtet).
- Sichtfenster 1440 bei `#projekt-check`: `sichtfenster/d1440.jpg`. Rückfrage klebend unter dem Kopf, keine Überdeckung.
- Prüfstufe A: `bilder/bad/m390.jpg`, `bilder/bad/d1440.jpg`, `bilder/bad__projekt-check/…`.
- Überlappung „sticky 2“ im Vollbild ist ein Messartefakt: Die Rückfrage (top-24) liegt im Sichtfenster unter dem 64 px hohen Kopf.

## OFFENE FRAGEN
1. **Überlauf im Funnel (Befund 16):** Der Wert „Wünsche“ ragt im Funnel-Inneren über die Angabenliste hinaus (`sichtfenster/d1440.jpg`). Die Ursache liegt in `Zusammenfassung.jsx` und ist am Seitenrand nicht behebbar. Als GEMEINSAME DATEI entscheiden.
2. Die Rückfrage steht auf `/bad` zweimal (unter Projektcheck und Badanfrage, je `aside aria-label="Ansprechpartner"`). So beauftragt. Ob die zweite entfallen soll, ist offen.
3. Die Textstufe ist ROT durch Fuß-Änderungen anderer Pakete auf `/bad/projekt-check`. Die Entscheidung liegt beim Orchestrator.
4. Der Lade-Text „Anfrageformular wird geladen...“ ist neuer Mikrotext. Freigabe bitte bestätigen.
