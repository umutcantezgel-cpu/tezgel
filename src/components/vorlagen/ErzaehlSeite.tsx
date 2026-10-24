// Vorlage „Erzählseite“ (KERN v3 K-009 Seitenformel, E3-ORCH-01a, E-025): setzt eine Seite aus ihrem Inhalt
// (`src/inhalte/<seite>.ts`, Modell in `inhalt.ts`) in der festen Folge Worum es geht · Ihre Lage · Was wir tun · So läuft
// es ab · Beleg · Nächster Schritt an der Laserlinie, mit den Bausteinen der Startseite. Große Momente der Seite kommen als
// fertige Bausteine über `momente` an ihren Platz. Alle Hauptknöpfe führen zu `/kontakt` (K-004). Strukturierte Daten
// (Brotkrumen) setzt die Seite wie bisher selbst. Serverkomponente.
import type { ReactNode } from 'react';
import Leitachse from '@/components/kern/Leitachse';
import Seitenformel from '@/components/kern/Seitenformel';
import type { ErzaehlInhalt } from './inhalt';
import Einstieg from './teile/Einstieg';
import Lage from './teile/Lage';
import Tun from './teile/Tun';
import Ablauf from './teile/Ablauf';
import Beleg from './teile/Beleg';
import Schritt from './teile/Schritt';

export interface ErzaehlSeiteProps {
  inhalt: ErzaehlInhalt;
  /** große Momente der Seite an ihrem Platz (Registereinträge, K-007) */
  momente?: { tun?: ReactNode; ablauf?: ReactNode; beleg?: ReactNode };
}

export default function ErzaehlSeite({ inhalt, momente }: ErzaehlSeiteProps) {
  const { worum } = inhalt;
  return (
    <Seitenformel>
      <Leitachse>
        <Einstieg pfad={inhalt.pfad} brotkrumen={worum.brotkrumen} titel={worum.titel} ort={worum.ort} vorspann={worum.vorspann} bild={worum.bild} />
        <Lage inhalt={inhalt.lage} />
        <Tun inhalt={inhalt.tun} moment={momente?.tun} />
        <Ablauf inhalt={inhalt.ablauf} moment={momente?.ablauf} />
        <Beleg inhalt={inhalt.beleg} moment={momente?.beleg} />
        <Schritt inhalt={inhalt.schritt} pfad={inhalt.pfad} />
      </Leitachse>
    </Seitenformel>
  );
}
