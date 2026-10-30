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

/** `lot="satzkante"` (Startseite, UM-E4-START): Das Lot des Leitfadens steht unter md auf der Satzkante statt mittig im Rand
 *  (globals.css „Lot an der Satzkante“, Marke `achse` an ACHSE_LAGE) */
export default function Seitenformel({ children, lot }: { children: ReactNode; lot?: 'satzkante' }) {
  return (
    <div data-seitenformel="" data-lot={lot}>
      {children}
    </div>
  );
}
