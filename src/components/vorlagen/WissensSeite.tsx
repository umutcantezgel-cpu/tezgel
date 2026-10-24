// Vorlage „Wissensseite“ (KERN v3 K-009 Seitenformel, E3-ORCH-01b, E-025): erklärt ruhig, Block für Block. Gleiche Folge
// und gleiche Bausteine wie die Erzählseite; „Was wir tun“ besteht aus Wissensblöcken (Absatz, Karten, Liste, Tabelle,
// Zeichnung), der Beleg ist oft ein einzelnes Foto mit Satz, der nächste Schritt nennt verwandte Seiten. Ruhige
// Zeichnungen der Seite kommen über `zeichnungen` (Kennung im Block). Mit Plan steht im Einstieg statt des Fotos der
// Verlegeplan, der sich beim Zeigen in die Flucht rückt (sig-plan „zeigen“; Wissensseiten tragen nur diese Bewegung des
// Planblatts, E-044). Rahmen wie die Erzählseite: alles nach dem Einstieg ist eine Suspense-Grenze, die Abschnitte zeichnen
// spät, das Hauptziel kommt aus navigation.js. Serverkomponente.
import { Suspense, type ReactNode } from 'react';
import Leitachse from '@/components/kern/Leitachse';
import Seitenformel from '@/components/kern/Seitenformel';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { hauptziel } from '@/config/navigation';
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
  const bild = worum.plan ? <Verlegeplan plan={worum.plan} flucht="zeigen" /> : worum.bild;
  return (
    <Seitenformel>
      <Leitachse>
        <Einstieg pfad={inhalt.pfad} brotkrumen={worum.brotkrumen} titel={worum.titel} ort={worum.ort} vorspann={worum.vorspann} bild={bild} hauptziel={hauptziel(inhalt.pfad)} />
        <Suspense fallback={<div aria-hidden="true" className="min-h-dvh" />}>
          <Lage inhalt={inhalt.lage} />
          <Wissen bloecke={inhalt.wissen} zeichnungen={zeichnungen} />
          <Ablauf inhalt={inhalt.ablauf} />
          <Beleg inhalt={inhalt.beleg} />
          <Schritt inhalt={inhalt.schritt} pfad={inhalt.pfad} />
          {werkzeug && <Werkzeug werkzeug={werkzeug} />}
        </Suspense>
      </Leitachse>
    </Seitenformel>
  );
}
