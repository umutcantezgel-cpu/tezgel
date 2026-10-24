'use client';

// Hauptknopf im dunklen Band über dem Fuß (K-004, K-009): dieselbe Beschriftung und dasselbe Ziel wie alle Hauptknöpfe
// der Seite (auf der Startseite ihr Formular #termin, sonst /kontakt), deshalb mit Pfad; Form „hell“ auf Tinte.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/icons/Icon';
import { knopfKlassen } from '@/components/kern/stile';
import { hauptziel, primaryCta } from '@/config/navigation';

export default function FussHauptknopf() {
  const pathname = usePathname() || '';
  return (
    <Link href={hauptziel(pathname)} className={knopfKlassen('hell', 'shrink-0 self-start lg:self-auto')} data-motion="druck" data-hauptknopf="">
      {primaryCta.name}
      <Icon name="pfeil-rechts" groesse={4} />
    </Link>
  );
}
