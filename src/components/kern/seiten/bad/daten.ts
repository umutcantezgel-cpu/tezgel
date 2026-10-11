// Inhalte der Hauptseite /bad (P4-08a, KERN v1.2), wörtlich aus `src/app/(bestand)/bad/page.jsx`.
// Die Bestands-Icons (lucide) entfallen: Die Leistungen stehen als Verzeichniszeilen ohne Icon-Kachel (Slop S-03,
// E-026 Vorgabe „kein Icon“ für Zeichen wie ShieldCheck, die als Siegel gelesen würden).

/** Bad-Leistungen im Überblick (Bestand `BATH_SERVICES`, ohne `icon`). Reihenfolge, Wortlaut und Ziele unverändert. */
export const BAD_LEISTUNGEN = [
  { title: 'Badsanierung komplett', desc: 'Komplettbad schlüsselfertig zum Festpreis', path: '/bad/badsanierung' },
  { title: 'Fliesen & XXL-Großformate', desc: 'Fugenarm verlegt, abgedichtet nach DIN 18534', path: '/bad/fliesen' },
  { title: 'Barrierefreies Bad', desc: 'DIN 18040-2 & bis zu 4.180 € Zuschuss', path: '/bad/barrierefreies-bad' },
  { title: 'Bad aus einer Hand', desc: 'Ein Ansprechpartner, abgestimmte Gewerke', path: '/bad/bad-aus-einer-hand' },
  { title: 'Musterbad-Konzepte', desc: 'Basic, Premium & Luxus (4,6 bis 15,9 m²)', path: '/bad/musterbaeder' },
  { title: 'Badplaner', desc: 'Ihr neues Bad Schritt für Schritt planen', path: '/bad/badplaner' },
] as const;

/** Zusagen unter den Knöpfen des Einstiegs (Bestand: Haken-Liste im Hero). */
export const BAD_ZUSAGEN = ['Kostenfreies Vor-Ort-Aufmaß', 'Staubschutz-Garantie', 'Verbindlicher Festpreis'] as const;

/** Normangaben in einem Satz: werden in Mono gesetzt (K-003 „Maß statt Behauptung“), der Wortlaut bleibt. */
export const NORM = /(DIN \d{4,5}(?:-\d)?)/;
