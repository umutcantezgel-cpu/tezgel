# Tor l2b-e039 · Lieferung 2 (F-06 Konfigurator, F-07 Schnellanfrage + Routenkarte, Kopf-Fix) · live e41b65f → 44b83f2 · 12.10.2026

- Lauf 1 (`../l2-e039`, Stand 0adf516) brach am vollen Datenträger ab bzw. lief beim zweiten Start mit 1 rotem Fall
  (`funktion-navigation` „/: Tastatur: Schalter per Enter öffnen …“, zum zweiten Mal nach `../l1-e039`). Ursache: echtes
  Hydrierungs-Rennen im Kopf (`Header.jsx`, pathname-Effekt schloss ein gerade geöffnetes Untermenü), auch live. Behoben in
  d7c2851; dieser Lauf mit dem Fix.
- **Automatische Stufen:** alle grün außer `05-altsystem` 1 Treffer = Fehlalarm (`link.featured.eyebrow` ist ein Datenfeld
  der Navigation, keine Altklasse; die Zeile stand schon live und erscheint nur, weil `Header.jsx` geändert ist).
  Bereich: `/fliesen`-Familie (Konfigurator eingebettet), `/leistungen/*/[stadt]` und `/standorte/[stadt]` (Schnellanfrage,
  Routenkarte); texte2 rot 0; axe 0; Wortbruch 0; Fotos 28/0; **Specs 380 bestanden, 0 rot**; Pixel-Stichprobe 16/16 gleich.
- **a11y-zusatz gegen live** (`/tmp/…/e039/a11y/A` bzw. `../l2-e039-live-fliesen`): harte Kennzahlen unverändert
  (`/fliesen` forced-Felder 6 wie live); besser u. a. Konfigurator Fokus unter 2 px 50 → 34, Zoom „nie im Bild“ 43–64 → 7
  (Stadtseiten, Konfigurator), `/fliesen` Fokus unter 2 px 76 → 60; weich +2 „teilverdeckt“ auf den Stadtseiten (Banner m375).
- **Lighthouse mobil gegen live** (`../l2-e039-lh`, `../l2-e039-lh-fliesen10`): Konfigurator 94 → 94 (TBT 184 → 147),
  `/standorte/giessen` 93 → 94, `/fliesen` mit 10 Paaren 92 → 91, LCP −3,5 % (Z-12 innerhalb der Streuung).
