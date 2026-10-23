# E4-NACH-03 · Rückgabe

## GEÄNDERTE DATEIEN
- `src/components/ui/FinalCTA.tsx`
- `src/components/common/Footer.jsx`
- `src/components/common/CookieConsent.tsx`

## WAS UND WARUM
- **FinalCTA:** Sektion auf `bg-kalk`, `border-t border-fuge`, `py-24 lg:py-32`, Text `text-tinte`. Gerahmtes Feld `border border-fuge bg-fliese`, Fugen `border-fuge`. Überschrift und Zusagen `text-tinte`, Haken `text-strich`; Untertitel, Kontext und Leiste `text-tinte-2`. Telefon `text-tinte`, Unterstrich `decoration-strich`, Hover `decoration-tinte`. Hauptknopf `variante="haupt"`. WhatsApp über `knopfKlassen("neben", "w-full")`; die Konstante `NEBENKNOPF_AUF_TINTE` entfällt. Leiste: Icon `stern-voll` in `text-tinte`. Laserachse `<Laserachse className={ACHSE_LAGE} />` im `relative`-Rahmen `seitenKlassen`. Keine `nacht-*`-Klassen und kein `flaeche-tinte` mehr.
- **Footer:** Das `<li>` mit `item.path === '#cookie-settings'` bekommt `lg:hidden`. Ab lg bleibt nur der Schild-Knopf.
- **CookieConsent:** Der Fuß-Knopf hat immer `hidden lg:inline-flex` (die Fallunterscheidung entfällt). Logik, Portale und Leisten-Variante bleiben.
- Mikrotexte: keine Änderung. Der Icon-Name `stern` wird zu `stern-voll`; das ist kein Text.

## GEMEINSAME DATEIEN
- `_werkstatt/texte-erlaubt.json`: Erlaubnis für die Verschiebung des Eintrags „Cookie-Einstellungen“ im Fuß (Block `footer`). Vorher: Link in der Rechtszeile. Nachher: Schild-Knopf am Ende der Rechtszeile, ab lg. Formulierung im Dateiformat durch den Orchestrator.
- Keine gemeinsame Datei von mir geändert.

## PRÜFUNG UND ERGEBNIS
- **Prüfstufe A** (`pruefe-a.sh E4-NACH-03`, Ansichten `/ /leistungen /kontakt /standorte`): Gesamt ROT, Exit 1.
  - Typprüfung GRÜN: 0 Fehler in eigenen Dateien, 0 übrige.
  - Lint GRÜN: 0 Fehler, 0 Warnungen.
  - Funktionstests GRÜN: `funktion-kontaktwege`, `funktion-einwilligung`; erwartet 65, unerwartet 0, flaky 0.
  - Bilder GRÜN: HTTP 200 auf allen vier Ansichten, Konsole 0, Überlauf 0. Überlappung auf `/` m390 = 25, identisch zum Stand auf 4310 (HEAD), also nicht durch diese Änderung. d1440 = 0.
  - Textvergleich ROT (siehe unten).
- `werte.mjs --dateien …`: 0 Befunde.
- `textprobe.cjs` gegen HEAD: keine Wörter entfernt; nur `stern` zu `stern-voll`.
- **Textvergleich:**
  - Gegen e0: 19 entfernt, 15 unerlaubt.
  - Zusätzlich gegen HEAD auf 4310 (d1440, vier Seiten): 22 entfernt, 19 unerlaubt.
  - Aus meinem Paket stammt nur die Fuß-Verschiebung „Cookie-Einstellungen“ (siehe GEMEINSAME DATEIEN).
  - Die übrigen Spannen liegen nicht in meinen drei Dateien: Leistungen-Wörter (Sehr beliebt, Großformat, Frostsicher, Präzision, DIN-Norm), der Buchungshinweis auf `/kontakt`, die Umstellung der Gebietsliste auf `/standorte`. Die Quelle ist nicht abschließend geklärt.
- **Arbeitsbaum:** `git status` zeigt inzwischen geänderte Dateien, die nicht zu meinem Paket gehören (u. a. `leistungen/page.jsx`, `bad/page.jsx`, `standorte/*`, `globals.css`, `components/kern/*`). Der Dev-Server 4320 zeigt damit einen Mischstand; die Prüfergebnisse sind nur eingeschränkt eindeutig.
- Kein Build, kein Start oder Stopp eines Servers, kein Commit, Push, Checkout oder Reset. Git nur lesend.

## BILDBELEGE
Ordner: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-03/`
- `bilder/{start,leistungen,kontakt,standorte}/{m390,d1440}.jpg`: Ansicht oben.
- `voll/{start,leistungen,kontakt}/{m390,d1440}-voll.jpg`: ganze Seite.
- `unten/start-d1440-unten.jpg`, `unten/start-m390-unten.jpg`, `unten/kontakt-d1440-unten.jpg`, `unten/leistungen-m390-unten.jpg`: Ausschnitte unten.
- Sichtbefund `/` d1440: Abschluss hell (Kalk, weißes Feld, rote Achse nur als Linie am linken Rand), Fuß dunkel, ein Cookie-Eintrag in der Rechtszeile (Schloss-Knopf). Sichtbefund `/` m390: Link „Cookie-Einstellungen“ in der Rechtszeile.

## OFFENE FRAGEN
1. Ab lg fehlt bei offenem Banner der Cookie-Eintrag im Fuß, weil Link und Schild dann ausgeblendet sind. Ist das gewollt? Der Banner selbst bietet „Einstellungen“.
2. Erlaubnis für die Fuß-Verschiebung in `texte-erlaubt.json` (siehe GEMEINSAME DATEIEN) oder Bestätigung, dass der Befund so bleibt.
3. Konkurrierende Änderungen im Arbeitsbaum: Prüfung auf einem sauberen Stand wiederholen oder den Mischstand akzeptieren?
