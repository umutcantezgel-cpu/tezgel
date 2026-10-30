// Regel zum Service-Knoten der Ordner-Layouts (UM-E4-EP4, E-068): Er steht auf jeder Unterseite, nicht auf der Ordnerseite
// selbst, denn die trägt ihren Service-Knoten selbst (kein Doppelknoten). Eigene Datei ohne Importe, damit die Clientkomponente
// `NurUnterseiten` sie lädt, ohne `lib/schema.ts` (Kundenstimmen und Firmendaten) ins Clientpaket zu ziehen, und damit der
// Test sie ohne React prüfen kann (test/meta.test.mjs).

/** Ob der Knoten des Ordners auf dieser Adresse steht (`adresse` wie `usePathname`, auch mit Schrägstrich am Ende) */
export function zeigtOrdnerKnoten(adresse: string, ordner: string): boolean {
  return adresse.replace(/\/+$/, '') !== ordner;
}
