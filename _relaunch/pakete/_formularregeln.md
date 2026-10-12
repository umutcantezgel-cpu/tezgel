# Formularregeln · Vereinheitlichung (E-038) · gelten für jeden Auftrag Q-xx zusätzlich zu `_seitenregeln.md`

## Was ein Q-Auftrag ist
Ein geteiltes Formular (Funnel, Schnellanfrage, Konfigurator) bekommt die Optik der Formulare, die schon im KERN v2 live
sind. **Nur die Darstellungsdateien** ändern sich; Ablauf, Zustände, Validierung, Nutzlast und Versand bleiben exakt gleich.

## Muster (verbindlich, so aussehen und so gebaut)
- `src/components/funnels/TezgelAnfrageFunnel/**` (Express-Anfrage auf `/` und `/kontakt`): Schrittkopf, Auswahlkacheln,
  Felder, Fehler, Erfolg, WhatsApp-Weg.
- `src/components/forms/HeroContactForm.tsx` (Einstieg der Startseite) und `src/components/pricing/PricingCalculator.tsx`.
- Klassen aus `src/components/kern/stile.ts`: `labelKlassen`, `feldKlassen`, `hilfeKlassen`, `fehlerKlassen`, `pflichtKlassen`,
  `wahlKlassen` (Auswahl mit `aria-pressed`/`aria-checked`), `kontrollKlassen`, `knopfKlassen`/`Knopf`, `etikettKlassen`.
- KERN K-009 „Formulare“: sichtbare Beschriftung über dem Feld (`htmlFor`/`id`), `autocomplete` wie Bestand, Hilfetext
  `tinte-2`, Fehler = Rahmen (`aria-invalid`) + Fehler-Icon + Text + `role="alert"`, Erfolg mit Haken-Icon und Text,
  ein Hauptknopf je Schritt, Touch-Ziele ≥ 44 px, gewählt = Tinte-Fläche (kein Orange, kein Verlauf, kein Schatten).

## Unantastbar (zusätzlich)
- `src/lib/formulare/*` (Hooks), `logik.js` der Funnels, `src/lib/email/**`, `src/app/api/**`, Einwilligungslogik.
- Jede Prop, jeder Ereignis-Handler, jedes `name`, `id`, `htmlFor`, `aria-*`, `role`, `data-*`, Honigtopf-Feld (`websiteUrl`
  u. ä. – Lage außerhalb des Bildes und `tabIndex={-1}` bleiben), jedes Feld der Nutzlast.
- Test-Selektoren: Lies die Spec deines Formulars **vollständig** (`_relaunch/werkzeuge/tests/<spec>`), bevor du Markup
  änderst; Rollen, zugängliche Namen und Texte, die sie nutzt, bleiben exakt.
- Wortlaut aller Labels, Platzhalter, Knöpfe, Meldungen, Zustände (Mikrotexte nur nach `_seitenregeln.md`).
- Vorhandene Befunde der Geschäftslogik (z. B. fehlendes `_t`, Honigtopf, Vorgabewerte) **nicht** beheben – nur in der
  Rückgabe unter OFFENE FRAGEN nennen, falls dir etwas Neues auffällt.

## Prüfen (zusätzlich zu `_seitenregeln.md` 1–9)
- Die Funktions-Spec deines Formulars **ganz** gegen 4350, beide Projekte (mobil, desktop), mit eigenen Ausgabepfaden
  (`RELAUNCH_REPORT`/`RELAUNCH_OUTPUT` unter `scratchpad/<kennung>/`). Grün; ein Fehlschlag, der auf 4337 genauso auftritt,
  ist nicht deiner (nur melden).
- Bilder jedes Zustands, den du gestaltet hast (Schritte, Fehler, Erfolg, WhatsApp geöffnet), m390 und d1440 – mit einem
  kleinen eigenen Playwright-Skript im Scratchpad über `installSperre` aus `_relaunch/werkzeuge/lib.mjs` (POST an
  `/api/anfrage` wird dort mit einer Attrappe beantwortet; nie echt senden). Jedes Bild selbst ansehen.
- axe im Fehler- und Erfolgszustand: `node _relaunch/werkzeuge/axe.mjs --satz <kennung>-axe --seiten <Seite> --fehler`
  (wo das Werkzeug dein Formular kennt), sonst axe-core im eigenen Skript.
- Mindestens zwei Seiten, auf denen das Formular eingebunden ist, in m390 und d1440 ansehen (Liste im Auftrag).
