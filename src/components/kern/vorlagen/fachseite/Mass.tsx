// Mass und Trenner (P4-01, K-005, Lehre 2): kleine Satzhelfer für den Wortlaut der Seite.
// Mass: Messbares und Belegbares im Fließtext in IBM Plex Mono (DIN 18534, R10, W2-I, Telefonnummer) – reine Darstellung,
//   der Text bleibt Zeichen für Zeichen gleich.
// Trenner: das „·“ des Bestands zwischen zwei Texteinheiten (Eyebrow „HWK Fachbetrieb · HWK Wiesbaden“, Bildunterschrift
//   „Name · Quelle · Thema“). Es bleibt im Text (Wortlaut gleich), wird aber nicht vorgelesen und hält die Einheiten getrennt.
import type { ReactNode } from 'react';

export function Mass({ children }: { children: ReactNode }) {
  return <span className="k-mono">{children}</span>;
}

export function Trenner() {
  return (
    <span aria-hidden="true">{' · '}</span>
  );
}
