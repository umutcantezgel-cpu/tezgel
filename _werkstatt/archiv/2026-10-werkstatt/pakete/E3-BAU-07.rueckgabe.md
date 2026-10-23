E3-BAU-07 · Rückgabe (Baumeister, Arbeitsmodell)

GEÄNDERTE DATEIEN
- `src/app/(bestand)/ueber-uns/page.jsx` (einzige Änderung)

WAS UND WARUM
- Einstieg (Erzählansicht mit Achse): Kennzeile „Gegründet 2008 · HWK Wiesbaden“, H1 „Über uns – Fliesenleger-Fachbetrieb Tezgel in Aßlar“, Vorspann. Verlauf in der H1 entfällt.
- Abschnitt `#betrieb` (seitlich, Fläche Fliese): Etikett „Unser Betrieb“, H2, drei Absätze, Motto mit Signatur, vier Kennwerte (Sterne aria-hidden).
- Abschnitt `#werte` (Kalk): Etikett „Wofür wir stehen“, H2, `Feldraster` mit sechs Werten (Fugenkreuz statt Icon-Kachel). Darunter drei Knöpfe: „Vor-Ort-Aufmaß vereinbaren“ (Haupt), Telefon in Mono, Firmensitz (neues Fenster).
- CompanyHistory, QualityPromise und FinalCTA unverändert eingebunden.
- Entfernt: Glas-Karten, Verläufe, Schatten, Hover-Hebung, Icon-Kacheln, Hero-Band, `"use client"` (keine Hooks, keine Handler). Eyebrows sind Mono-Etiketten.
- Keine neue Bewegung, kein `auftritt`, kein großer Moment. Neue IDs nur `betrieb` und `werte` (für `aria-labelledby`).
- Mengen: 4 Kennwerte, 6 Werte, 3 Knöpfe, 3 Absätze. Der Bestand hat keine Fotos und keine Schrittfolgen.
- Mikrotexte: kein Wortlaut geändert. Textprobe ENTFERNT 6 / HINZU 7 entsteht durch Props (`etikett=`, `titel=`) und die H1 in einem Stück.

GEMEINSAME DATEIEN
- `_werkstatt/werkzeuge/test-zuordnung.json`, neue Zeile: `{ "muster": "ueber-uns", "specs": ["funktion-kontaktwege.spec.mjs"] }`. Ohne sie laufen für diese Seite keine Funktionstests.

PRÜFUNG UND ERGEBNIS
- Umbau-Vorlauf: ZU_PRUEFEN (Zeile 92) gelöst, danach von Hand neu aufgebaut.
- tsc GRÜN (0 Fehler), eslint GRÜN (0/0), Funktionstests ÜBERSPRUNGEN (keine Zuordnung), werte.mjs 0 Befunde, Bezeichner-Probe leer.
- Bilder GRÜN: 390 und 1440 HTTP 200, Konsole 0, Überlauf 0, Überlappung 0.
- Textvergleich ROT, Gesamt Prüfstufe A ROT (Exit 1). Nicht durch diesen Umbau: Der Produktionsstand (4310) liefert gegen e0 denselben Befund (Unterzeile im Abschluss „Über 15 Jahre Praxiserfahrung …“, Kopf, Fuß). Sichtbare Wortfolge gegen 4310 identisch (832 Wörter).
- Prüfung lief vor einer fremden Änderung an `kern/Abschnitt.tsx` (21:04:54, Prop `spaet`, Standard aus). Endstand danach erneut geprüft: eslint, tsc und Wortfolge unverändert.

BILDBELEGE (Ordner `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-07/`)
- `bilder/d1440-voll.jpg`, `bilder/m390-voll.jpg` (ganze Seite)
- `mobil-top/m390.jpg`, `mobil-betrieb/m390.jpg`, `mobil-werte/m390.jpg` (Ausschnitte)

OFFENE FRAGEN
1. Textstufe ROT für /ueber-uns: Beleg e0 neu erzeugen oder Abweichung freigeben?
2. `kern/Abschnitt` setzt Erzählansichten auf py-16/lg:py-24, K-005 nennt py-24/lg:py-32. Komponente anpassen oder K-005 präzisieren?
3. Leitachse über alle Abschnitte (K-007) fehlt, aktiv ist nur die Achse des Einstiegs. Ergänzung im Schritt für den großen Moment?
4. Schriftfeld (K-009) nicht eingesetzt. Es bräuchte neue Etiketten (Inhaber, Kammer, Betrieb seit, Sitz), dafür fehlt Freigabe.
5. Kennwerte: sichtbare Reihenfolge wechselt von Wert-über-Etikett (Bestand) zu Etikett-über-Wert (Komponente). DOM und Wortfolge bleiben. Bestätigen?
6. `values[].icon` (lucide) in `src/config/company.js` ist hier ungenutzt. Bereinigung?
7. Werkzeug: `umbau.mjs` entfernt beim Icon-Tausch in Listen das `key` (Trockenlauf, Sterne).
