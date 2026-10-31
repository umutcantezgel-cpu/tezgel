// Seitenformel (KERN v3 K-009) für Erzähl-, Wissens- und Ortsseiten: sechs Abschnitte in fester Folge.
// Jeder Abschnitt trägt data-formel="<teil>" (über `Abschnitt formel=…`), die Hülle data-seitenformel; die Prüfwerkzeuge
// lesen daran ab, ob alle sechs Teile in der richtigen Reihenfolge stehen.
import type { ReactNode } from 'react';

export const FORMEL = ['worum', 'lage', 'tun', 'ablauf', 'beleg', 'schritt'] as const;
export type Formelteil = (typeof FORMEL)[number];

/** Bedeutung der Teile (Auftrag Abschnitt 6) */
export const FORMEL_NAMEN: Record<Formelteil, string> = {
  worum: 'Worum es geht',
  lage: 'Ihre Lage',
  tun: 'Was wir tun',
  ablauf: 'So läuft es ab',
  beleg: 'Beleg',
  schritt: 'Nächster Schritt',
};

/** Das Lot steht auf allen Seiten an derselben Stelle (ACHSE_LAGE). `lot="satzkante"` (Startseite, UM-E4-START) ist entfallen
 *  (UM-E4-SICHT-FIX M-A4 Nr. 2: mobil stehen nur noch Marken an den Kanten); die Angabe bleibt bis zur Zusammenführung mit der
 *  Vorlage ErzaehlSeite im Typ und wirkt nicht mehr (siehe Paketnotiz UM-E4-SICHT-FIX-a2) */
export default function Seitenformel({ children }: { children: ReactNode; lot?: 'satzkante' }) {
  return <div data-seitenformel="">{children}</div>;
}
