// Hauptknopf (KERN v3 K-004, K-009): die eine Hauptaktion jeder Seite, „Termin vor Ort anfragen“.
// Alle Hauptknöpfe einer Seite tragen dieselbe Beschriftung und dasselbe Ziel (Z-11); data-hauptknopf für die Prüfung,
// data-erstes-bild="hauptknopf" für den Knopf im ersten Bildschirm (Prüfung „Erstes Bild“, K-004).
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import { knopfKlassen } from './stile';

export const HAUPTAKTION = { text: 'Termin vor Ort anfragen', ziel: '/kontakt' } as const;

interface HauptknopfProps {
  /** Ziel, Standard `/kontakt`; auf der Startseite der Formularanker `#termin` */
  href?: string;
  /** seitengerechte Abwandlung aus K-010, sonst „Termin vor Ort anfragen“ */
  children?: string;
  /** steht im ersten Bildschirm */
  erstesBild?: boolean;
  /** volle Breite unter sm */
  breit?: boolean;
  className?: string;
}

export default function Hauptknopf({ href = HAUPTAKTION.ziel, children = HAUPTAKTION.text, erstesBild = false, breit = false, className }: HauptknopfProps) {
  return (
    <Link
      href={href}
      data-hauptknopf=""
      data-erstes-bild={erstesBild ? 'hauptknopf' : undefined}
      data-motion="druck"
      className={knopfKlassen('haupt', clsx(breit && 'w-full sm:w-auto', className))}
    >
      <span>{children}</span>
      <Icon name="pfeil-rechts" groesse={5} />
    </Link>
  );
}
