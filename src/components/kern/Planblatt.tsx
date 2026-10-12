// Planblatt (KERN K-008, K-009; E4-NACH-01): die Randspalte des Einstiegs als Zeichenblatt – oben die Zeichnung
// (Verlegeplan, Einzugsband …), unten das Schriftfeld mit Stammdaten. Das Blatt füllt die Höhe der Textspalte, damit im
// ersten Bildschirm keine leere Rasterspalte bleibt (E3-SICHT-ERZ Befund 1). Die Zeichnung sitzt in der Blattfläche
// mittig; die Felder stehen an der unteren Fuge. Alle Werte kommen aus der Konfiguration – nichts Erfundenes, kein Maßstab.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Schriftfeld, { type SchriftfeldFeld } from './Schriftfeld';
import { COMPANY_DATA } from '@/config/company';
import { PLAENE, type PlanName } from '@/lib/plaene/vorgaben';
import type { Planvorgabe, Verband } from '@/lib/plaene/typen';

const VERBAND_NAME: Record<Verband, string> = { kreuz: 'Kreuzfuge', halb: 'Halbverband', drittel: 'Drittelverband' };

export interface PlanblattProps {
  /** die Zeichnung des Blatts */
  children: ReactNode;
  /** Schriftfeld unter der Zeichnung; ohne Felder nur das Blatt */
  felder?: SchriftfeldFeld[];
  className?: string;
}

export default function Planblatt({ children, felder, className }: PlanblattProps) {
  return (
    <div className={clsx('flex h-full flex-col border border-fuge bg-fliese', className)}>
      {/* Blattfläche mit Schnittmarken an den Ecken: der freie Rand um die Zeichnung gehört zum Blatt */}
      <div className="relative flex flex-1 flex-col justify-center p-6 lg:p-8">
        <span aria-hidden="true" className="absolute top-3 left-3 size-3 border-t border-l border-strich" />
        <span aria-hidden="true" className="absolute top-3 right-3 size-3 border-t border-r border-strich" />
        <span aria-hidden="true" className="absolute bottom-3 left-3 size-3 border-b border-l border-strich" />
        <span aria-hidden="true" className="absolute right-3 bottom-3 size-3 border-r border-b border-strich" />
        {children}
      </div>
      {felder && felder.length > 0 && <Schriftfeld felder={felder} spalten="blatt" className="border-x-0 border-b-0" />}
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
