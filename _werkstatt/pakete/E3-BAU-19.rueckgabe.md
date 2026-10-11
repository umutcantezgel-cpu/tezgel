# E3-BAU-19 · Rückgabe · BadProjektCheck Darstellung und Fehler (V-03)

## GEÄNDERTE DATEIEN
- `src/components/funnels/BadProjektCheck/`: `index.jsx`, `Schritt1.jsx` bis `Schritt4.jsx`, `Zusammenfassung.jsx`
- `_werkstatt/pakete/E3-BAU-19.rueckgabe.md`

Kein Commit, Push, Build oder Serverstart von mir. Git-Stand: Die Zwischenstände `ad1a5f0` bis `8175222` (Orchestrator) enthalten diese Dateien; der Arbeitsbaum entspricht HEAD. Vergleichsbasis ist `23810e4`.

## WAS UND WARUM
- **Kopf (index):** Etikett mit `Fugenkreuz`, Festpreis-Etikett `max-sm:hidden`, H2 `font-anzeige fs-5`, Rahmen `border-strich bg-fliese p-6 sm:p-8 lg:p-12`, Raster ab `lg` 7/5. Entfallen: `max-w-4xl`, Glas- und Keramikklassen.
- **Schritt 1:** Label `labelKlassen`, Wertfeld mit Strich-Rahmen. Regler `h-2`, `bg-strich` (Grafik ≥ 3:1), `accent-tinte`. Skala mono `fs-1`, mobil zweizeilig.
- **Schritte 2–4:** `fieldset`/`legend`, Auswahl über `wahlKlassen` (gewählt = Tinte), Nebentext `nacht-2` bzw. `tinte-2`, Haken `haken` nur bei Auswahl. Hover-Verschiebung und Übergänge entfallen.
- **Zusammenfassung:** Etikett mit Fugenkreuz, Feld auf Kalk. Musterbad und Zuschuss als `Hinweis` (merk). Angebotsknopf und „Sofort anrufen“ als `Knopf`.
  - Erfolg online: `Hinweis art="erfolg" rolle="status"`.
  - WhatsApp-Zustand: `Hinweis art="merk" rolle="status"`, bewusst kein Erfolg, da die Anfrage mit dem Öffnen von WhatsApp noch nicht zugestellt ist.
  - Sendefehler: `Hinweis art="fehler" rolle="alert"` (V-03), Text unverändert.
  - Beschriftungen sichtbar über den Feldern (bisher sr-only), Wortlaut gleich. Der Pflichtstern ist `aria-hidden` und steht **neben** dem Label, sonst würde der exakte Name „Ihr Name“ nicht mehr passen.
  - Absendeknöpfe bleiben `<button>` mit `knopfKlassen`, weil `Knopf` `name` und `value` nicht durchreicht; der Hook liest den Kanal daraus.

## MIKROTEXT ALT → NEU (freigegeben)
„✉️ Eine Bestätigung wurde an …“ → „Eine Bestätigung wurde an …“ (Zusammenfassung, Erfolg online). Keine weitere Wortänderung.

## GEMEINSAME DATEIEN (nicht geändert)
1. `_werkstatt/texte-erlaubt.json`: Eintrag für die Spanne „anfordernSofort“ (Seite `/bad/projekt-check`, Block `main`), siehe Prüfung.
2. `src/app/(bestand)/bad/projekt-check/page.jsx` und Abschnitt in `bad/page.jsx`: Seitenkopf noch im Bestand (ClipboardCheck, `text-slate-*`, `eyebrow`).
3. `src/components/common/CookieConsent.tsx`: fester Schloss-Knopf unten links (mobil `bottom-4 left-4`) überdeckt im Erstbildschirm die Skala „3,5 m²“ (Bild m390). Platzierung im gemeinsamen Layer nötig.
4. `src/components/kern/formulare/c/ProjektCheckAnsicht.tsx` enthält noch „✉️ Eine Bestätigung“.

## PRÜFUNG UND ERGEBNIS
- `werte.mjs`: 6 Dateien, 248 Klassen, 0 Befunde. `bezeichner.cjs`: `[]` in allen sechs.
- Textprobe gegen `23810e4`: einzige Textänderung ist der Mikrotext. Übrige Einträge sind technisch: Icon-Namen, zwei `*`, entfallenes `type="button"` am Angebotsknopf.
- **Prüfstufe A: ROT (Exit 1), nur durch das Textgate.**
  - Typprüfung GRÜN, 0 Fehler. Lint GRÜN, 0 Fehler, 0 Warnungen. `funktion-projektcheck`: 18 erwartet, 0 unerwartet, 0 flaky (mobil und Desktop). Bilder GRÜN: HTTP 200/200, Konsole 0, Überlauf 0, Überlappung 0.
  - Textgate ROT: eine „unerlaubt entfernte“ Spanne „anfordernSofort“. In der Basis e0 standen die Wörter ohne Trennung; jetzt sind die Knöpfe getrennt („anfordern Sofort“ hinzu). Kein Wort fehlt. Die Erlaubnisliste hat keinen Eintrag; der Orchestrator entscheidet (Punkt 1).
- Hilfslauf (Scratchpad, Anfragesperre, Attrappen), m390 und d1440: Start, Formular, Sendefehler, Erfolg, WhatsApp. Kein Überlauf, Skala ohne Überschneidung. Erfolg: Referenz sichtbar, Status einmal, kein Briefsymbol. Fehler: ein eigener `role="alert"`; der zweite Treffer ist die Routenansage von Next.js. Mobil navigiert `openWhatsApp` direkt, daher zählt der `window.open`-Abfang dort 0.

## BILDBELEGE
- Prüfstufe A: `…/scratchpad/E3-BAU-19/bilder/bad__projekt-check/m390.jpg` und `d1440.jpg`.
- Hilfslauf: `…/scratchpad/E3-BAU-19/zustaende/` (`m390-1` bis `-7`, `d1440-1` bis `-7`). Der fixierte Kopf im Gesamtbild ist ein Aufnahmeeffekt.

## OFFENE FRAGEN
1. Zwei KERN-Fassungen des Projektchecks: diese Umstellung (stile.ts, Knopf, Hinweis) und `kern/formulare/c/ProjektCheckAnsicht.tsx` (basis, k-Tokens). Welche gilt?
2. Der Startwert 8,2 m² liegt nicht im Reglerraster (3,5 + n·0,5). Der Regler rastet auf 8,0 bzw. 8,5, die Anzeige zeigt 8,2 m² (I-18, Hook gesperrt).
3. Pflichtmarke: `required` ist gesetzt, der Stern `aria-hidden`. Ein sr-only-„Pflichtfeld“ würde die exakten Namen ändern. Bestätigen?
4. `Hinweis` ergänzt ohne Titel ein sr-only-Präfix („Hinweis:“, „Fehler:“, „Erledigt:“), wie in E3-BAU-17/18. Im Textvergleich als „hinzu“ (2× „Hinweis:“). Freigabe?
5. Lesebreite: Der Rahmen nimmt die Containerbreite (`max-w-7xl`) ein. Max-Breite in den Seiten setzen?
