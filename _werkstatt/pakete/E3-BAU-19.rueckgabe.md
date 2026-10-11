# E3-BAU-19 · Rückgabe · BadProjektCheck Darstellung und Fehler (V-03)

## GEÄNDERTE DATEIEN
- `src/components/funnels/BadProjektCheck/index.jsx`, `Schritt1.jsx`, `Schritt2.jsx`, `Schritt3.jsx`, `Schritt4.jsx`, `Zusammenfassung.jsx`
- `_werkstatt/pakete/E3-BAU-19.rueckgabe.md` (neu)

Kein Commit, Push, Build oder Serverstart von mir.
Git-Hinweis: Die Zwischenstand-Commits `ad1a5f0` (21:56) und `71c87ba` (21:57) enthalten meine früheren Stände dieser Dateien. Die Vergleichsbasis ist deshalb `23810e4`, nicht HEAD. Gegenüber HEAD ist im Arbeitsbaum nur `Zusammenfassung.jsx` geändert (Nacharbeit).

## WAS UND WARUM
- **Kopf (index):** Etikett mit `Fugenkreuz` statt ClipboardCheck, Festpreis-Etikett `max-sm:hidden`, H2 `font-anzeige fs-5`, Rahmen `border-strich bg-fliese p-6 sm:p-8 lg:p-12`. Raster ab `lg` 7/5 Spalten, `gap-8`. Entfallen: `max-w-4xl`, Glas- und Keramikklassen.
- **Schritt 1:** Label `labelKlassen`, Wertfeld mit Strich-Rahmen. Regler `h-2`, `bg-strich` (Grafik ≥ 3:1), `accent-tinte`. Skala mono `fs-1`, mobil zweizeilig.
- **Schritte 2 und 3:** `fieldset`/`legend`, Auswahl über `wahlKlassen` (gewählt = Tinte), Nebentext `nacht-2` bzw. `tinte-2`. Hover-Verschiebung und Übergänge entfallen. Mobil einspaltig, ab `sm` drei Spalten.
- **Schritt 4:** wie oben, Haken `haken` nur bei Auswahl.
- **Zusammenfassung:** Etikett mit Fugenkreuz, Feld auf Kalk mit Fugenrahmen. Musterbad und Zuschuss als `Hinweis` (merk). Angebotsknopf und „Sofort anrufen“ als `Knopf`.
  - Erfolg online: `Hinweis art="erfolg" rolle="status"`.
  - WhatsApp-Zustand: `Hinweis art="merk" rolle="status"`, bewusst kein Erfolg, weil die Anfrage mit dem Öffnen von WhatsApp noch nicht zugestellt ist.
  - Sendefehler: `Hinweis art="fehler" rolle="alert"` (V-03), Text unverändert.
  - Beschriftungen sichtbar über den Feldern (bisher sr-only), Wortlaut gleich. Der Pflichtstern ist `aria-hidden` und steht **neben** dem Label. Im Label würde der exakte Name „Ihr Name“ nicht mehr passen (Playwright, im Lauf bestätigt).
  - Absendeknöpfe bleiben `<button>` mit `knopfKlassen`, nicht `Knopf`, weil `Knopf` `name` und `value` nicht durchreicht. Der Hook liest den Kanal daraus.
- Keine neue Bewegung. Auswahlknöpfe tragen `data-motion="zustand"` wie in den Vorlagen.

## MIKROTEXT ALT → NEU (freigegeben)
- „✉️ Eine Bestätigung wurde an …“ → „Eine Bestätigung wurde an …“ (Zusammenfassung, Erfolg online). Sonst keine Wortänderung.

## GEMEINSAME DATEIEN (nicht geändert)
1. `src/app/(bestand)/bad/projekt-check/page.jsx` und der Abschnitt in `src/app/(bestand)/bad/page.jsx`: Seitenkopf noch im Bestand (ClipboardCheck, `text-slate-*`, `eyebrow`). Umstellung nötig.
2. `src/components/kern/formulare/c/ProjektCheckAnsicht.tsx`: enthält noch „✉️ Eine Bestätigung“. Gleiche Freigabe nötig.

## PRÜFUNG UND ERGEBNIS
- `werte.mjs`: 6 Dateien, 248 Klassen, 0 Befunde.
- `bezeichner.cjs`: `[]` in allen sechs Dateien.
- Textprobe gegen `23810e4`: Einzige Textänderung ist der Mikrotext. Technische Einträge: Icon-Namen, zwei `*` (aria-hidden), entfallenes `type="button"` am Angebotsknopf (Knopf setzt den Typ selbst).
- Prüfstufe A: [PLATZHALTER_PRUEFUNG]
- Hilfslauf (Scratchpad, Anfragesperre und Attrappen), m390 und d1440, Zustände Start, Formular, Sendefehler, Erfolg, WhatsApp: kein Überlauf, Skala ohne Überschneidung. Erfolg: Referenz sichtbar, Status einmal, kein Briefsymbol. Fehler: ein eigener `role="alert"`; der zweite Treffer ist die Routenansage von Next.js. WhatsApp mobil ohne `window.open`, weil `openWhatsApp` dort direkt navigiert (Logik unverändert).

## BILDBELEGE
- Hilfslauf: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-BAU-19/zustaende/` (`m390-1` bis `-7`, `d1440-1` bis `-7`). Der fixierte Kopf im Gesamtbild ist ein Aufnahmeeffekt.
- Prüfstufe A: [PLATZHALTER_BILDER]

## OFFENE FRAGEN
1. Zwei KERN-Fassungen des Projektchecks: diese Umstellung (stile.ts, Knopf, Hinweis) und `kern/formulare/c/ProjektCheckAnsicht.tsx` (basis/*, k-*-Tokens). Welche gilt?
2. Startwert 8,2 m² liegt nicht im Reglerraster (3,5 + n·0,5). Der Regler rastet auf 8,0 bzw. 8,5, die Anzeige zeigt 8,2 m² (I-18, Hook gesperrt).
3. Pflichtmarke: `required` ist gesetzt, der sichtbare Stern ist `aria-hidden`. Ein sr-only-Zusatz „Pflichtfeld“ würde den exakten Namen ändern. Bestätigen?
4. `Hinweis` ergänzt ohne Titel ein sr-only-Präfix („Fehler:“, „Hinweis:“, „Erledigt:“), wie in E3-BAU-17/18. Freigabe?
5. Lesebreite: Der Rahmen nimmt die Containerbreite ein (`max-w-7xl`). Max-Breite in den Seiten?
6. `_werkstatt/texte-erlaubt.json` hat keinen Eintrag für das entfernte Briefsymbol. [PLATZHALTER_TEXTVERGLEICH]
