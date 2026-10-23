// Planblatt (KERN K-008, K-009; E4-NACH-01): die Randspalte des Einstiegs als Zeichenblatt – oben die Zeichnung
// (Verlegeplan, Einzugsband …), unten das Schriftfeld mit Stammdaten. Das Blatt füllt die Höhe der Textspalte, damit im
// ersten Bildschirm keine leere Rasterspalte bleibt (E3-SICHT-ERZ Befund 1). Die Zeichnung sitzt in der Blattfläche
// mittig; die Felder stehen an der unteren Fuge. Alle Werte kommen aus der Konfiguration – nichts Erfundenes, kein Maßstab.
// Ist die Zeichnung ein Verlegeplan, zeigt das Blatt seine rote Achse (das gezogene Rot des Einstiegs, E3-SICHT-2-ERZ Q3);
// mit `flucht="laden"` zieht sich die Achse während der Flucht auf (bewegung.css, sig-plan).
// Tablett (md bis unter lg, R-02a): Dort steht die Randspalte unter dem Text in voller Breite – ein Plan über die ganze
// Breite mit dem Schriftfeld darunter war bei 768 px 530–890 px hoch, der Einstieg endete erst nach anderthalb Bildschirmen.
// Bei einem Verlegeplan stehen Zeichnung und Schriftfeld deshalb dort nebeneinander wie auf einem gezeichneten Blatt
// (Zeichnung links, Schriftfeld rechts in zwei Spalten), das Blatt ist nur noch 270–360 px hoch. Andere Zeichnungen
// (Einzugsband, Verband-Umschalter) brauchen die volle Breite und bleiben gestapelt; mobil und ab lg bleibt alles wie bisher.
import { cloneElement, isValidElement, type ReactNode } from 'react';
import clsx from 'clsx';
import Schriftfeld, { type SchriftfeldFeld } from './Schriftfeld';
import Verlegeplan, { type VerlegeplanProps } from './Verlegeplan';
import { COMPANY_DATA } from '@/config/company';
import { PLAENE, type PlanName } from '@/lib/plaene/vorgaben';
import type { Planvorgabe, Verband } from '@/lib/plaene/typen';

const VERBAND_NAME: Record<Verband, string> = { kreuz: 'Kreuzfuge', halb: 'Halbverband', drittel: 'Drittelverband' };

export interface PlanblattProps {
  /** die Zeichnung des Blatts */
  children: ReactNode;
  /** Schriftfeld unter der Zeichnung; ohne Felder nur das Blatt */
  felder?: SchriftfeldFeld[];
  /** rote Achse eines Verlegeplans im Blatt zeigen (Standard ja; `ohneAchse` am Plan wird dann übergangen) */
  achse?: boolean;
  /** die Zeichnung trägt ihre rote Achse selbst (z. B. ein Plan, den die Seite als Kind setzt und das Blatt nicht erkennt) */
  mitAchse?: boolean;
  className?: string;
}

export default function Planblatt({ children, felder, achse = true, mitAchse = false, className }: PlanblattProps) {
  const istPlan = isValidElement<VerlegeplanProps>(children) && children.type === Verlegeplan;
  const zeichnung = achse && istPlan ? cloneElement(children, { ohneAchse: false }) : children;
  // Verlegeplan (auch in einer Hülle, die die Achse selbst trägt) mit Schriftfeld: auf dem Tablett nebeneinander
  const nebeneinander = (istPlan || mitAchse) && Boolean(felder?.length);
  // planblatt-achse: das Blatt trägt das eine Rot des ersten Bildschirms – die Laserachse des Einstiegs bleibt ab lg Grundschicht
  // (globals.css; K-003 „höchstens ein roter Blickfang“, auch bei reduzierter Bewegung, Prüfstufe A E4-N2-02-PA)
  return (
    <div className={clsx('flex h-full flex-col border border-fuge bg-fliese', nebeneinander && 'md:max-lg:flex-row', ((achse && istPlan) || mitAchse) && 'planblatt-achse', className)}>
      {/* Blattfläche mit Schnittmarken an den Ecken: der freie Rand um die Zeichnung gehört zum Blatt */}
      <div className={clsx('relative flex flex-1 flex-col justify-center p-6 lg:p-8', nebeneinander && 'md:max-lg:min-w-0')}>
        <span aria-hidden="true" className="absolute top-3 left-3 size-3 border-t border-l border-strich" />
        <span aria-hidden="true" className="absolute top-3 right-3 size-3 border-t border-r border-strich" />
        <span aria-hidden="true" className="absolute bottom-3 left-3 size-3 border-b border-l border-strich" />
        <span aria-hidden="true" className="absolute right-3 bottom-3 size-3 border-r border-b border-strich" />
        {zeichnung}
      </div>
      {felder && felder.length > 0 && (
        <Schriftfeld
          felder={felder}
          spalten="blatt"
          className={clsx(
            'border-x-0 border-b-0',
            // Tablett: rechte Blatthälfte, Fuge links statt oben, zwei Spalten (drei wären bei halber Breite zu eng)
            nebeneinander && 'md:max-lg:w-1/2 md:max-lg:shrink-0 md:max-lg:grid-cols-2 md:max-lg:border-t-0 md:max-lg:border-l',
          )}
        />
      )}
    </div>
  );
}

/**
 * Felder eines Plankopfs: Blatt (Thema der Seite), Verband der Zeichnung (ohne Plan: Sitz), Betrieb, Inhaber, Kammer, Betrieb seit –
 * ausschließlich aus `COMPANY_DATA` und der Planvorgabe.
 */
export function planfelder(blatt: string, plan?: PlanName | Planvorgabe): SchriftfeldFeld[] {
  const { legalName, owner, authority, business, headquarters } = COMPANY_DATA;
  const vorgabe = typeof plan === 'string' ? PLAENE[plan] : plan;
  return [
    { etikett: 'Blatt', wert: blatt },
    // mit Zeichnung: Verband des Plans; ohne: der Sitz – so bleiben es sechs Felder (zwei bzw. drei Spalten ohne Lücke)
    vorgabe ? { etikett: 'Verband', wert: VERBAND_NAME[vorgabe.verband] } : { etikett: 'Sitz', wert: headquarters.city },
    { etikett: 'Betrieb', wert: legalName },
    { etikett: 'Inhaber', wert: owner.fullName },
    { etikett: 'Kammer', wert: authority.shortName },
    { etikett: 'Betrieb seit', wert: <span className="font-mono">{business.establishmentYear}</span> },
  ];
}
