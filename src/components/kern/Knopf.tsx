// Knopf (KERN K-009): Hauptknopf (Tinte), Nebenknopf (Strich-Rahmen), Textlink, hell (auf Tinte-Flächen).
// Als Link (href) oder Schaltfläche; „laedt“ zeigt die laufende Fuge und „Wird gesendet …“.
import Link from 'next/link';
import type { ReactNode, MouseEventHandler } from 'react';
import Icon, { type IconName } from '@/components/icons/Icon';
import { knopfKlassen, type KnopfVariante } from './stile';

interface Gemeinsam {
  variante?: KnopfVariante;
  icon?: IconName;
  iconLinks?: IconName;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

type AlsLink = Gemeinsam & { href: string; extern?: boolean; transitionTypes?: string[] };
type AlsKnopf = Gemeinsam & { href?: undefined; type?: 'button' | 'submit'; onClick?: MouseEventHandler<HTMLButtonElement>; deaktiviert?: boolean; laedt?: boolean; ladeText?: string };

export default function Knopf(props: AlsLink | AlsKnopf) {
  const { variante = 'haupt', icon, iconLinks, className, children } = props;
  const inhalt = (
    <>
      {iconLinks && <Icon name={iconLinks} groesse={5} />}
      <span>{children}</span>
      {icon && <Icon name={icon} groesse={5} />}
    </>
  );
  const klassen = knopfKlassen(variante, className);
  if (props.href !== undefined) {
    const { href, extern, transitionTypes } = props;
    const roh = extern || /^(tel:|mailto:|https?:)/.test(href);
    if (roh) {
      return (
        <a href={href} className={klassen} data-motion="druck" aria-label={props['aria-label']} {...(extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {inhalt}
        </a>
      );
    }
    return (
      <Link href={href} className={klassen} data-motion="druck" aria-label={props['aria-label']} transitionTypes={transitionTypes}>
        {inhalt}
      </Link>
    );
  }
  const { type = 'button', onClick, deaktiviert, laedt, ladeText = 'Wird gesendet …' } = props;
  return (
    <button type={type} onClick={onClick} disabled={deaktiviert || laedt} aria-busy={laedt || undefined} className={klassen} data-motion="druck" aria-label={props['aria-label']}>
      {laedt ? (
        <span className="flex flex-col items-center gap-2">
          <span>{ladeText}</span>
          <span className="laden-fuge w-16" data-motion="laden" aria-hidden="true" />
        </span>
      ) : (
        inhalt
      )}
    </button>
  );
}
