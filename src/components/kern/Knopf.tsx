// Knopf (KERN K-009): Hauptknopf (Tinte), Nebenknopf (Strich-Rahmen), Textlink, hell (auf Tinte-Flächen).
// Als Link (href) oder Schaltfläche; „laedt“ sperrt sofort (kein doppeltes Absenden) und zeigt die laufende Fuge und
// „Wird gesendet …“ erst nach der Ladeschwelle (300 ms, dann mindestens 500 ms; K-010, LadeInhalt).
import Link from 'next/link';
import type { ReactNode, MouseEventHandler } from 'react';
import Icon, { type IconName } from '@/components/icons/Icon';
import LadeInhalt from './LadeInhalt';
import { knopfKlassen, type KnopfVariante } from './stile';

interface Gemeinsam {
  variante?: KnopfVariante;
  icon?: IconName;
  iconLinks?: IconName;
  /** Zeichen vor dem Text, das nicht zur Icon-Familie gehört (z. B. ein Markenlogo wie WhatsApp) */
  vorne?: ReactNode;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

type AlsLink = Gemeinsam & { href: string; extern?: boolean };
type AlsKnopf = Gemeinsam & { href?: undefined; type?: 'button' | 'submit'; onClick?: MouseEventHandler<HTMLButtonElement>; deaktiviert?: boolean; laedt?: boolean; ladeText?: string };

export default function Knopf(props: AlsLink | AlsKnopf) {
  const { variante = 'haupt', icon, iconLinks, vorne, className, children } = props;
  const inhalt = (
    <>
      {vorne}
      {iconLinks && <Icon name={iconLinks} groesse={5} />}
      <span>{children}</span>
      {icon && <Icon name={icon} groesse={5} />}
    </>
  );
  // Zeichen vorn (Hörer, Sprechblase): bei großer Schrift über dem Text statt allein am linken Rand, wenn der Text umbricht
  // (Browserprüfung E4-W1, Runde 2)
  const klassen = knopfKlassen(variante, iconLinks ? `@max-3xs:flex-col @max-3xs:gap-1 ${className ?? ''}`.trim() : className);
  if (props.href !== undefined) {
    const { href, extern } = props;
    const roh = extern || /^(tel:|mailto:|https?:)/.test(href);
    if (roh) {
      return (
        <a href={href} className={klassen} data-motion="druck" aria-label={props['aria-label']} {...(extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {inhalt}
        </a>
      );
    }
    return (
      <Link href={href} className={klassen} data-motion="druck" aria-label={props['aria-label']}>
        {inhalt}
      </Link>
    );
  }
  const { type = 'button', onClick, deaktiviert, laedt, ladeText = 'Wird gesendet …' } = props;
  return (
    <button type={type} onClick={onClick} disabled={deaktiviert || laedt} aria-busy={laedt || undefined} className={klassen} data-motion="druck" aria-label={props['aria-label']}>
      <LadeInhalt laedt={Boolean(laedt)} ladeText={ladeText}>
        {inhalt}
      </LadeInhalt>
    </button>
  );
}
