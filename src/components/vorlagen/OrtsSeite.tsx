// Vorlage „Ortsseite“ (KERN v3 K-009 Seitenformel, E3-ORCH-01c, E-024, E-025): `/standorte/[stadt]` aus `ortsInhalt()`
// (`src/inhalte/orte.ts`). Gleiche Folge und Bausteine wie die Erzählseite. Im Einstieg steht rechts statt eines Fotos die
// gezeichnete Karte (Slot, Aßlar in der Mitte, der Ort markiert; ohne Karte bleibt die Spalte leer), denn Fotos aus dem Ort
// gibt es nicht (K-015). Der nächste Schritt trägt die vorhandene Schnellanfrage der Ortsseiten (F-09, Slot `formular`,
// Pflichtfelder und Zusage unverändert) unter der Kennung `anfrage`, links Satz, Rufnummer, WhatsApp und die
// Nachbarorte. Alle Hauptknöpfe der Seite führen zu `#anfrage` (K-004, `hauptziel` in navigation.js, erst mit dem Umzug der
// Bestandsseite auf diese Vorlage). Im Einstieg trägt der Schlitz `karte` das Einzugsband (statt SIG-1: ein großer Moment je
// Bildschirm, E-044). Rahmen wie die Erzählseite (eine Suspense-Grenze nach dem Einstieg, spätes Zeichnen). Der Einstieg
// steht vor der Leitachse und trägt sein Lot in Grundschicht (UM-E4-VORL): Danach führt der Leitfaden wie auf /, und im
// ersten Bildschirm steht kein zweites Rot neben dem Einzugsband (K-003). Steht die Lage auf Fliese (`lage.aufFliese`, wie
// auf /), setzt der Einstieg ab lg eine Stufe 16 Kalk bis zur Fuge (`fugeUnten`, wie die Wissensvorlage; UM-E4-CHOR-FIX). Das
// Qualitätsversprechen aus dem Inhalt (`versprechen`, UM-E4-EP3) steht als eigener Abschnitt nach dem Beleg vor dem nächsten
// Schritt. Serverkomponente.
import { Suspense, type ReactNode } from 'react';
import Leitachse from '@/components/kern/Leitachse';
import Seitenformel from '@/components/kern/Seitenformel';
import type { Ortsinhalt } from '@/inhalte/orte';
import type { Verweis } from './inhalt';
import Einstieg from './teile/Einstieg';
import Lage from './teile/Lage';
import Tun from './teile/Tun';
import Ablauf from './teile/Ablauf';
import Beleg from './teile/Beleg';
import Versprechen from './teile/Versprechen';
import Schritt, { Nachbarorte } from './teile/Schritt';

export const ORT_ANKER = 'anfrage';

export interface OrtsSeiteProps {
  inhalt: Ortsinhalt;
  /** Schnellanfrage der Ortsseiten (LeadQuickForm, F-09) */
  formular: ReactNode;
  /** nächstgelegene Orte (vorhandene Logik der Ortsseite) */
  nachbarn: Verweis[];
  /** gezeichnete Karte im Einstieg (großer Moment `karte`) */
  karte?: ReactNode;
}

export default function OrtsSeite({ inhalt, formular, nachbarn, karte }: OrtsSeiteProps) {
  const { worum } = inhalt;
  return (
    <Seitenformel>
      <Einstieg pfad={inhalt.pfad} brotkrumen={worum.brotkrumen} titel={worum.titel} ort={worum.ort} vorspann={worum.vorspann} bild={karte} hauptziel={`#${ORT_ANKER}`} lot fugeUnten={inhalt.lage.aufFliese} />
      <Leitachse>
        <Suspense fallback={<div aria-hidden="true" className="min-h-dvh noscript:hidden" />}>
          <Lage inhalt={inhalt.lage} />
          <Tun inhalt={inhalt.tun} />
          <Ablauf inhalt={inhalt.ablauf} />
          <Beleg inhalt={inhalt.beleg} pfad={inhalt.pfad} />
          {inhalt.versprechen && (
            <Versprechen vorher={[worum.vorspann, inhalt.lage, inhalt.tun, inhalt.ablauf, inhalt.beleg]} erklaert={inhalt.versprechen.erklaert} />
          )}
          <Schritt inhalt={inhalt.schritt} pfad={inhalt.pfad} formular={formular} titelId={ORT_ANKER} zusatz={<Nachbarorte nachbarn={nachbarn} />} />
        </Suspense>
      </Leitachse>
    </Seitenformel>
  );
}
