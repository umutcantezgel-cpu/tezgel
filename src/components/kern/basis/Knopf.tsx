// Knopf (K-011): Hauptknopf Tinte mit Kalk-Text, Nebenknopf 1-px-Rahmen Strich, Textknopf mit Unterstreichung.
// Als Link (href) oder als <button>. Server-tauglich (keine Hooks, keine eigenen Handler): gesperrte Zustände
// entstehen ohne Skript – der Knopf wird type="button", verliert onClick und trägt aria-disabled; ein gesperrter Link
// verliert sein href. So bleibt der Knopf fokussierbar (kein Fokusverlust beim Absenden) und tut doch nichts.
// Register K-009: `druck` (1 px nach unten, :active) und `laden` (Fuge läuft); Hover nur bei feinem Zeiger.
import Link from 'next/link';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { fokus, istIntern, verbinde, type Grund } from '@/components/kern/basis/klassen';

export type KnopfArt = 'haupt' | 'neben' | 'text';
export type KnopfGroesse = 'klein' | 'normal' | 'gross';

type KnopfEigen = {
  /** haupt (Tinte) · neben (Rahmen) · text (Unterstreichung). Standard: haupt. */
  art?: KnopfArt;
  /** klein 32 px (Trefferfläche 48 px) · normal 48 px · gross 64 px. Standard: normal. */
  groesse?: KnopfGroesse;
  /** Fläche dahinter; auf Tinte kehren sich Farben und Fokus (Kalk) um. */
  auf?: Grund;
  /** volle Breite */
  breit?: boolean;
  /** sichtbar deaktiviert: gestrichelter Rahmen, Cursor, aria-disabled */
  deaktiviert?: boolean;
  /** sichtbare Ladeanzeige (Fuge läuft, Ladetext). Zeitsteuerung 300/500 ms: useLadeanzeige bzw. SendeKnopf. */
  laedt?: boolean;
  /** gesperrt ohne sichtbaren Wechsel (Senden läuft, Anzeige noch im Verzug) – aria-busy */
  beschaeftigt?: boolean;
  /** Text während des Ladens (K-012 freigegeben: „Wird gesendet …“) */
  ladetext?: string;
  /** Zeichen vor bzw. hinter der Beschriftung (dekorativ, aria-hidden setzt der Aufrufer) */
  vorne?: ReactNode;
  hinten?: ReactNode;
  children: ReactNode;
  className?: string;
};

export type KnopfAlsLink = KnopfEigen & Omit<ComponentPropsWithRef<'a'>, keyof KnopfEigen | 'href'> & { href: string };
export type KnopfAlsButton = KnopfEigen & Omit<ComponentPropsWithRef<'button'>, keyof KnopfEigen | 'disabled'> & { href?: undefined };
export type KnopfProps = KnopfAlsLink | KnopfAlsButton;

const BASIS = 'relative inline-flex items-center justify-center gap-k-2 rounded-k-0 border k-text font-semibold text-center';

const HOEHE: Record<KnopfGroesse, string> = {
  // klein: 32 px sichtbar, Trefferfläche über ::before auf 48 px erweitert (K-007 Touch-Ziele ≥ 44 px)
  klein: 'min-h-k-6 py-k-1 text-k-2 before:absolute before:inset-x-0 before:-inset-y-k-2',
  normal: 'min-h-k-7 py-k-2 text-k-2',
  gross: 'min-h-k-8 py-k-3 text-k-3',
};

const INNEN_X: Record<KnopfGroesse, string> = { klein: 'px-k-3', normal: 'px-k-5', gross: 'px-k-6' };

const LINIE = 'underline decoration-1 underline-offset-4';

const RUHE: Record<Grund, Record<KnopfArt, string>> = {
  hell: {
    haupt: 'border-k-tinte bg-k-tinte text-k-kalk',
    neben: 'border-k-strich bg-transparent text-k-tinte',
    text: `border-transparent bg-transparent text-k-tinte ${LINIE} decoration-k-strich`,
  },
  tinte: {
    haupt: 'border-k-kalk bg-k-kalk text-k-tinte',
    neben: 'border-k-nacht-2 bg-transparent text-k-kalk',
    text: `border-transparent bg-transparent text-k-kalk ${LINIE} decoration-k-nacht-2`,
  },
};

// Hover nur bei (hover: hover) und (pointer: fine); :active für Touch und Tastatur (Farbwechsel auch bei reduzierter Bewegung).
const WIRKUNG: Record<Grund, Record<KnopfArt, string>> = {
  hell: {
    haupt: 'cursor-pointer pointer-fine:hover:border-k-tinte-2 pointer-fine:hover:bg-k-tinte-2 active:border-k-tinte-2 active:bg-k-tinte-2',
    neben: 'cursor-pointer pointer-fine:hover:border-k-tinte pointer-fine:hover:bg-k-fliese active:border-k-tinte active:bg-k-fuge',
    text: 'cursor-pointer pointer-fine:hover:decoration-k-tinte pointer-fine:hover:decoration-2 active:decoration-k-tinte active:decoration-2',
  },
  tinte: {
    haupt: 'cursor-pointer pointer-fine:hover:border-k-fuge pointer-fine:hover:bg-k-fuge active:border-k-fuge active:bg-k-fuge',
    neben: 'cursor-pointer pointer-fine:hover:border-k-kalk pointer-fine:hover:bg-k-nacht-fuge active:border-k-kalk active:bg-k-nacht-fuge',
    text: 'cursor-pointer pointer-fine:hover:decoration-k-kalk pointer-fine:hover:decoration-2 active:decoration-k-kalk active:decoration-2',
  },
};

// Deaktiviert: nicht nur blasser – gestrichelter Rahmen bzw. gestrichelte Linie, Cursor, aria-disabled.
const AUS: Record<Grund, { flaeche: string; text: string }> = {
  hell: {
    flaeche: 'cursor-not-allowed border-dashed border-k-strich bg-transparent text-k-tinte-2',
    text: `cursor-not-allowed border-transparent bg-transparent text-k-tinte-2 ${LINIE} decoration-dashed decoration-k-strich`,
  },
  tinte: {
    flaeche: 'cursor-not-allowed border-dashed border-k-nacht-2 bg-transparent text-k-nacht-2',
    text: `cursor-not-allowed border-transparent bg-transparent text-k-nacht-2 ${LINIE} decoration-dashed decoration-k-nacht-2`,
  },
};

export const LADETEXT = 'Wird gesendet …';

type Zustand = Pick<KnopfEigen, 'art' | 'groesse' | 'auf' | 'breit' | 'deaktiviert' | 'laedt' | 'className'>;

function knopfKlassen({ art = 'haupt', groesse = 'normal', auf = 'hell', breit, deaktiviert, laedt, className }: Zustand): string {
  const farbe = deaktiviert
    ? art === 'text' ? AUS[auf].text : AUS[auf].flaeche
    : verbinde(RUHE[auf][art], laedt ? 'cursor-progress' : WIRKUNG[auf][art]);
  return verbinde(BASIS, HOEHE[groesse], art !== 'text' && INNEN_X[groesse], farbe, fokus(auf), breit && 'w-full', className);
}

function Inhalt({ vorne, hinten, children, laedt, ladetext }: Pick<KnopfEigen, 'vorne' | 'hinten' | 'children' | 'laedt' | 'ladetext'>) {
  // Ladefähig (laedt ist gesetzt, auch false): Beschriftung und Ladetext liegen übereinander im selben Rasterfeld,
  // die Breite bleibt beim Wechsel gleich (kein Sprung). Unsichtbares fällt aus dem Barrierebaum (visibility).
  if (laedt === undefined) {
    return (
      <>
        {vorne}
        {children}
        {hinten}
      </>
    );
  }
  return (
    <>
      <span className="inline-grid">
        <span className={verbinde('col-start-1 row-start-1 inline-flex items-center justify-center gap-k-2', laedt && 'invisible')}>
          {vorne}
          {children}
          {hinten}
        </span>
        <span className={verbinde('col-start-1 row-start-1 inline-flex items-center justify-center', !laedt && 'invisible')}>
          {ladetext ?? LADETEXT}
        </span>
      </span>
      {laedt && (
        <span data-motion="laden" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-(--k-linie-2)" />
      )}
    </>
  );
}

export default function Knopf(props: KnopfProps) {
  if (props.href !== undefined) {
    const { art, groesse, auf, breit, deaktiviert, laedt, beschaeftigt, ladetext, vorne, hinten, children, className, href, onClick, ...rest } = props;
    const gesperrt = Boolean(deaktiviert || laedt || beschaeftigt);
    const klassen = knopfKlassen({ art, groesse, auf, breit, deaktiviert, laedt, className });
    const inhalt = <Inhalt vorne={vorne} hinten={hinten} laedt={laedt} ladetext={ladetext}>{children}</Inhalt>;
    if (gesperrt) {
      // Gesperrter Link: ohne href kein Ziel und kein Tab-Halt; role="link" + aria-disabled nennen den Zustand.
      return (
        <a {...rest} role="link" aria-disabled="true" aria-busy={laedt || beschaeftigt || undefined} className={klassen}>
          {inhalt}
        </a>
      );
    }
    if (istIntern(href)) {
      return (
        <Link {...rest} href={href} onClick={onClick} data-motion="druck" className={klassen}>
          {inhalt}
        </Link>
      );
    }
    return (
      <a {...rest} href={href} onClick={onClick} data-motion="druck" className={klassen}>
        {inhalt}
      </a>
    );
  }

  const { art, groesse, auf, breit, deaktiviert, laedt, beschaeftigt, ladetext, vorne, hinten, children, className, type = 'button', onClick, ...rest } = props;
  const gesperrt = Boolean(deaktiviert || laedt || beschaeftigt);
  return (
    <button
      {...rest}
      type={gesperrt ? 'button' : type}
      onClick={gesperrt ? undefined : onClick}
      aria-disabled={gesperrt || undefined}
      aria-busy={laedt || beschaeftigt || undefined}
      data-motion={gesperrt ? undefined : 'druck'}
      className={knopfKlassen({ art, groesse, auf, breit, deaktiviert, laedt, className })}
    >
      <Inhalt vorne={vorne} hinten={hinten} laedt={laedt} ladetext={ladetext}>{children}</Inhalt>
    </button>
  );
}
