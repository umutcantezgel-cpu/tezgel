// Vorlage „Wissensseite“ (KERN v3 K-009 Seitenformel, E3-ORCH-01b, E-025): erklärt ruhig, Block für Block. Gleiche Folge
// und gleiche Bausteine wie die Erzählseite; „Was wir tun“ besteht aus Wissensblöcken (Absatz, Karten, Liste, Tabelle,
// Zeichnung), der Beleg ist oft ein einzelnes Foto mit Satz, der nächste Schritt nennt verwandte Seiten. Ruhige
// Zeichnungen der Seite kommen über `zeichnungen` (Kennung im Block). Serverkomponente.
import type { ReactNode } from 'react';
import Leitachse from '@/components/kern/Leitachse';
import Seitenformel from '@/components/kern/Seitenformel';
import type { WissenInhalt } from './inhalt';
import Einstieg from './teile/Einstieg';
import Lage from './teile/Lage';
import Wissen from './teile/Wissen';
import Ablauf from './teile/Ablauf';
import Beleg from './teile/Beleg';
import Schritt from './teile/Schritt';
import { Werkzeug, type Arbeitsabschnitt } from './ArbeitsSeite';

export interface WissensSeiteProps {
  inhalt: WissenInhalt;
  zeichnungen?: Record<string, ReactNode>;
  /** Werkzeug der Seite nach dem nächsten Schritt (z. B. Konfigurator), Kennung wie im Bestand */
  werkzeug?: Arbeitsabschnitt;
}

export default function WissensSeite({ inhalt, zeichnungen, werkzeug }: WissensSeiteProps) {
  const { worum } = inhalt;
  return (
    <Seitenformel>
      <Leitachse>
        <Einstieg pfad={inhalt.pfad} brotkrumen={worum.brotkrumen} titel={worum.titel} ort={worum.ort} vorspann={worum.vorspann} bild={worum.bild} />
        <Lage inhalt={inhalt.lage} />
        <Wissen bloecke={inhalt.wissen} zeichnungen={zeichnungen} />
        <Ablauf inhalt={inhalt.ablauf} />
        <Beleg inhalt={inhalt.beleg} />
        <Schritt inhalt={inhalt.schritt} pfad={inhalt.pfad} />
        {werkzeug && <Werkzeug werkzeug={werkzeug} />}
      </Leitachse>
    </Seitenformel>
  );
}
