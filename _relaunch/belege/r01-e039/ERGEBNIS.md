# Tor r01-e039 · R-01a (Rahmen) + R-01b (geteilte Formular-Bausteine) · live f3ec304 (Produkt 44b83f2) → a06bd36 · 12.10.2026

Inhalt: R-01a 9a5ea81 (Pflichtsternchen grau, Leitachse als Grundschicht, Zierebene unter dem Inhalt, Sprungziele ohne
scroll-mt + SprungHalter, BannerPlatz, Fuß), Nachtrag 57b466c (/bad Anker ohne doppelten Versatz), KERN K-007 a06bd36;
R-01b aca7a23 (Express-Fokus, Abschluss-Telefon 44 px, FormularPlatzhalter ohne JS auf 24 Seiten, Knopffolge nach u4,
spaet auf /leistungen/[id]#kosten-rechner, scroll-mt-Reste).

## Automatische Stufen (tor-s.sh, BEREICH_AUCH='*', Pixel gegen live 4362)
- Grün: Sperrklinke, Reinraum, Bereich (Rahmenänderung: alle Seiten, keine neu/weg), Werte, texte2 (rot 0, gelb 1 =
  Pflichtanker schon in A), axe 0, Wortbruch 0, Fotos 32/0, **Specs 380 bestanden, 0 rot**.
- `05-altsystem` rot = Fehlalarm: Datenschlüssel `eyebrow:` in `fliesen/page.jsx` (Navigationsdaten, keine Klasse; Datei nur
  in den Importzeilen geändert).
- `13-pixel` 10/10 abweichend – erwartet bei einer Rahmenänderung, gesichtet (d1440 `faq`, `bad/badanfrage`): Seitenindex im
  Fuß bricht jetzt um statt abzuschneiden, Abschluss-Telefon 44 px, Achse grau; m375 Höhenunterschied durch den Fuß (+113 px).

## a11y-zusatz gegen die letzten Produktionsläufe (m-e039, l1-e039, l2b-e039)
| Seite | Fokus verdeckt | Fokus unter 2 px | teilverdeckt fest | nicht sichtbar |
|---|---|---|---|---|
| / | 182 → 13 | 116 → 13 | 58 → 10 | 19 → 7 |
| /leistungen | 94 → 0 | 71 → 6 | 32 → 7 | 19 → 7 |
| /leistungen/bad | 101 → 0 | 63 → 6 | 32 → 7 | 19 → 7 |
| /blog | 57 → 0 | 23 → 8 | 34 → 7 | 16 → 7 |
| /bad | 86 → 0 | 41 → 4 | 27 → 7 | 15 → 7 |
| /fliesen | 94 → 0 | 60 → 16 | 40 → 7 | 19 → 11 |
| /standorte/giessen | 85 → 0 | 41 → 14 | 27 → 7 | 15 → 7 |
- Textabstand „abgeschnitten“ im Fuß 0 (vorher 1 je Seite); Zoom „nie im Bild“ / 81 → 7, /bad 64 → 7 (Rest: Kopf bei
  CSS-Zoom 2, Paket R-02).
- Harte Kennzahlen unverändert (Falle, Zyklus, Sprunglink, Reflow/Zoom waagerecht 0; forced-Felder 6 auf /fliesen wie live).
- Sprungziele (Orchestrator, 4350): /bad#projekt-check, /bad#anfrage, /leistungen/bad#fachdetails, /leistungen#bad bei
  96 px (d1440, m390).

## Offen (Paket R-02)
- Einwilligungsbanner am Desktop verdeckt beim Erstbesuch die Hauptaktion des ersten Bildschirms auf 7 von 8 Seiten
  (K-009) – Lage rechts unten verdeckt andere Bedienteile; Entscheidung nötig.
- Kopf bei CSS-Zoom 2: 7 Elemente „nie im Bild“ (Container-Abfragen im Kopf).
- Mit Bewegung: gezogenes Achsstück und Anfahrt-Strecke in einem Bildschirm (Stadtseiten).
- scroll-mt-Reste in Fachbereiche, ReviewsSection, CalendlySection, /preise, /foerderung, Untergrund-Seiten.
- PricingCalculator Tab-Rücksprung (Textfeld → Name); Messwerkzeuge lesen innerText in spaet-Abschnitten.
- Planblatt unter lg in der Familie sehr hoch (t768) – Begrenzung (z. B. `max-w-md`) familienweit entscheiden (S-14, F-02).
- `.spaet-zeichnen` (content-visibility) schneidet Fokusringe am Abschnittsrand ab – familienweit `overflow-clip-margin`
  prüfen statt Innenabstand je Seite (S-21); Tab-Folge über mehrere spaet-Abschnitte ohne Bedienelement (S-19).
- 404 → „Zur Startseite“ im Dev-Server unter Last zweimal rot (S-21, gegen 4362 grün) – im Reinraum-Tor beobachten.
- Tor e5-e039, Textabstand m375: H2 „Woran Sie einen sanierungsbedürftigen Balkon erkennen“ (/balkon-terrasse/balkonsanierung)
  ragt 3 px über – weiches Trennzeichen in „sanierungs­bedürftigen“ (K-006) oder `hyphens` für Überschriften familienweit.
