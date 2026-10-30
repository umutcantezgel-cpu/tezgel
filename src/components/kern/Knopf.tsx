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

// Pfeil am letzten Wort (Muster MitPfeil in vorlagen/teile/Schritt.tsx und Hauptknopf): Bricht die Beschriftung bei großer
// Schrift um, folgt der Pfeil dem letzten Wort, statt als eigenes Flex-Kind allein am Rand zu stehen (Browserprüfung Runde 5,
// Nr. 9 und 16). Der Text bleibt ein Wortlaut mit denselben Leerzeichen, der Pfeil ist dekorativ (aria-hidden), der zugängliche
// Name ändert sich nicht. Eine Zeile bleibt wie vorher: Der Pfeil steht im Abstand von 0,5 rem hinter dem Wort.
// Zusammen mit dem Pfeil steht nur das letzte Stück des letzten Worts (nach Leerzeichen, Bindestrich oder weichem Trennstrich)
// und nur, wenn es nicht länger als 11 Zeichen ist: Längere Wörter trennt der Knopf selbst (ab 12 Zeichen), und eine
// Zeichenkette ohne Umbruchstelle würde dort überlaufen. Dort und bei Inhalten ohne Text am Ende bleibt der Pfeil, wie er war.
const PFEIL_WORT_MAX = 11;
const PFEIL_KLASSE = 'ml-2 align-middle';

function mitPfeilAmEnde(children: ReactNode, pfeil: ReactNode): ReactNode | null {
  const felder = Array.isArray(children) ? children : [children];
  const letztes = felder.at(-1);
  if (typeof letztes !== 'string') return null;
  const schnitt = Math.max(letztes.lastIndexOf(' '), letztes.lastIndexOf('-'), letztes.lastIndexOf('\u00ad')) + 1;
  const ende = letztes.slice(schnitt);
  if (!ende || ende.length > PFEIL_WORT_MAX) return null;
  // Das Stück vor dem letzten Wort (meist nur das Leerzeichen) hängt am Textknoten davor und steht nicht als eigener, nur aus
  // Leerraum bestehender Knoten: Chrome lässt einen solchen Knoten hinter einem Textknoten im zugänglichen Namen weg
  // („Kostenloses Aufmaß in Wetzlar“ + „ “ + „anfragen“ ergab „… Wetzlaranfragen“). Hinter einem Element bleibt das
  // Leerzeichen im Namen (Textknoten ohne Text davor).
  const kopf = felder.slice(0, -1);
  const vorn = letztes.slice(0, schnitt);
  const davor = kopf.at(-1);
  if (typeof davor === 'string') kopf[kopf.length - 1] = davor + vorn;
  else if (vorn) kopf.push(vorn);
  return (
    <>
      {kopf}
      <span className="whitespace-nowrap">
        {ende}
        {pfeil}
      </span>
    </>
  );
}

export default function Knopf(props: AlsLink | AlsKnopf) {
  const { variante = 'haupt', icon, iconLinks, vorne, className, children } = props;
  // @max-3xs:text-center am Text: bricht die Beschriftung in einer schmalen Spalte (große Schrift, unter 16 rem) um, stehen die
  // Zeilen mittig im Knopf (wie im Hauptknopf). Wirkt nur unter einem @container (Formulare, Karten, Abschnitte mit
  // Container); bei 100 % Schrift ohne Wirkung, also keine sichtbare Änderung
  const beschriftung = icon ? mitPfeilAmEnde(children, <Icon name={icon} groesse={5} className={PFEIL_KLASSE} />) : null;
  const inhalt = (
    <>
      {vorne}
      {iconLinks && <Icon name={iconLinks} groesse={5} />}
      <span className="@max-3xs:text-center">{beschriftung ?? children}</span>
      {icon && !beschriftung && <Icon name={icon} groesse={5} />}
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
