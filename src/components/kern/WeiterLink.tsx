// Weiter-Link (KERN v3 K-008): Text mit Pfeil, z. B. „Alle Arbeiten ansehen“. Der Pfeil steht im Textfluss hinter dem
// letzten Wort; bricht der Text bei großer Systemschrift um, folgt der Pfeil der letzten Zeile, statt abgesetzt am rechten
// Rand zu stehen (Sichtprüfung E2 Runde 4). Letztes Wort und Pfeil sind ungeteilt, damit der Pfeil nie allein in einer
// Zeile steht (Browserprüfung E4-W0, E-065). Trefffläche mindestens 44 px. Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import { linkKlassen } from './stile';

export default function WeiterLink({ href, children, className }: { href: string; children: string; className?: string }) {
  const schnitt = children.lastIndexOf(' ') + 1;
  const kopf = children.slice(0, schnitt);
  const ende = children.slice(schnitt);
  return (
    <Link href={href} data-motion="zustand" className={clsx(linkKlassen, 'inline-block min-h-11 py-2 font-semibold text-fs-3', className)}>
      {kopf}
      <span className="whitespace-nowrap">
        {ende}
        <Icon name="pfeil-rechts" groesse={5} className="ml-2 align-text-bottom" />
      </span>
    </Link>
  );
}
