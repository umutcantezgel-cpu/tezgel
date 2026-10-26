// Hauptknopf (KERN v3 K-004, K-009): die eine Hauptaktion jeder Seite, „Termin vor Ort anfragen“.
// Alle Hauptknöpfe einer Seite tragen dieselbe Beschriftung und dasselbe Ziel (Z-11); data-hauptknopf für die Prüfung,
// data-erstes-bild="hauptknopf" für den Knopf im ersten Bildschirm (Prüfung „Erstes Bild“, K-004).
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import { knopfKlassen } from './stile';
import { zusammen } from './zusammen';

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
  const merkmale = {
    'data-hauptknopf': '',
    'data-erstes-bild': erstesBild ? 'hauptknopf' : undefined,
    'data-motion': 'druck',
    // text-center: bricht die Beschriftung um, stehen beide Zeilen mittig wie im Einstieg, auch in linksbündigen Abschnitten
    // (Browserprüfung E4-W1, Runde 4)
    className: knopfKlassen('haupt', clsx('text-center', breit && 'w-full sm:w-auto', className)),
  };
  // Der Pfeil hängt am letzten Wort: Bricht die Beschriftung um (große Systemschrift), steht er hinter der letzten Zeile statt
  // allein am rechten Rand des Knopfs (E2-SICHT-2 Befund 10, E3-START-05). Ein Flex-Kind, Abstand wie gap-2.
  const schnitt = children.lastIndexOf(' ') + 1;
  const inhalt = (
    <span>
      {schnitt > 0 && zusammen(children.slice(0, schnitt))}
      <span className="whitespace-nowrap">
        {children.slice(schnitt)}
        <Icon name="pfeil-rechts" groesse={5} className="ml-2 align-middle" />
      </span>
    </span>
  );
  // Anker derselben Seite (#termin, #anfrage) als einfacher Link: Der Browser springt weich (scroll-behavior) und setzt den
  // Fokus-Startpunkt, ohne Router-Navigation im Klick (Reaktion, E-033); Seitenwechsel bleiben bei next/link (B-01).
  if (href.startsWith('#')) return <a href={href} {...merkmale}>{inhalt}</a>;
  return <Link href={href} {...merkmale}>{inhalt}</Link>;
}
