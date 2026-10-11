// Anriss und Randnotiz je Kundenstimme (P3-12, K-001 Vertrauensschicht, K-011, K-012).
// ANRISS: genau ein Schlüsselwort je Stimme (Schlüssel = `id` aus `@/config/reviews`); es steht wörtlich im Zitat –
// die Stimme selbst bleibt ungekürzt, der Anriss unterstreicht nur. Fehlt das Wort im Zitat, entfällt der Anriss.
// Höchstens zwei kurze Wörter: Der Anriss bricht nicht um (whitespace-nowrap) und muss in eine Karte bei 320 px passen.
// RANDNOTIZ: nur als Verweis mit vorhandenem Wortlaut (Schrittnummer aus `processSteps`), im Zweifel weggelassen.
export const ANRISS: Readonly<Record<string, string>> = {
  'elke-s': 'präzise',
  'c-wolf': 'pünktlich',
  'rabia-oe': 'rundum zufrieden',
  'hasan-oe': 'wärmstens',
  'ute-t': 'barrierefrei',
  'peter-p': 'Vorstellungen',
  'christian-d': 'Kommunikation',
  'sara-j': 'Treppen',
  'k-d': 'zuverlässig',
  'christian-s': 'kurzfristig',
  'thorsten-a': 'top Beratung',
  'erik-s': 'jeder Bodenbelag',
  'kathrin-w': 'hochwertige',
  'janet-t': 'saubere',
  'ortwin-l': 'immer wieder',
  'jan-g': 'fairen Preis',
};

/** Stimme → Schrittnummer (`processSteps[].step`). Christian S.: „kam Herr Tezgel kurzfristig zur Absprache“ → Aufmaß vor Ort. */
export const RANDNOTIZ: Readonly<Record<string, string>> = {
  'christian-s': '01',
};
