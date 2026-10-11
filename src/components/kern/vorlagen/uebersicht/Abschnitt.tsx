// Gemeinsame Teile der Vorlagen Übersicht, Liste, Artikel und Detail (P4-02, KERN v1.2).
// Abschnitt (Hülle mit Seitenbreite und Abschnittsabstand je Seitenart, K-007), Abschnittskopf (Etikett, Überschrift,
// Vorspann; Ebene wie im Bestand), Aktionen (Knöpfe nach K-011), Merkmale (Haken-Liste), Pfeillink, Achse (Lot, K-007).
// Kein Text in den Teilen: aller Wortlaut kommt als Prop. Server-Komponenten, keine Hooks.
// Überschriften entstehen nur, wo der Aufrufer sie übergibt (Text-Invarianten: „Überschrift hinzu“ ist rot).
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Etikett, Knopf, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';

/** Seitenart nach GRUNDMENGE.json (`seitenart`): Erzählseite oder Arbeitsseite (K-002, K-011). */
export type Seitenart = 'erzaehl' | 'arbeit';

/** Ein Weg als Knopf oder Textlink; Beschriftung wörtlich aus dem Bestand. */
export type Aktion = {
  label: ReactNode;
  href: string;
  /** haupt (Tinte) · neben (Rahmen) · text (Unterstreichung); Standard: neben */
  art?: 'haupt' | 'neben' | 'text';
  /** Zeichen vor der Beschriftung (dekorativ) */
  zeichen?: IconName;
  /** Pfeil hinter der Beschriftung (dekorativ) */
  pfeil?: boolean;
  /** neues Fenster (WhatsApp, fremde Ziele): target=_blank, rel=noopener noreferrer */
  extern?: boolean;
  /** zugänglicher Name, falls der Bestand einen eigenen trägt */
  ariaLabel?: string;
  /** Beschriftung in Mono (Telefonnummer, K-005) */
  mono?: boolean;
};

/** Verweis in Linklisten (Querverweise, Weiterlesen). */
export type Verweis = { label: ReactNode; href: string; ariaLabel?: string };

const ABSTAND: Record<Seitenart, string> = {
  erzaehl: 'py-k-9 lg:py-k-10',
  arbeit: 'py-k-7 lg:py-k-8',
};

export type AbschnittProps = {
  children: ReactNode;
  id?: string;
  /** id der Überschrift (aria-labelledby) */
  titelId?: string;
  /** zugänglicher Name ohne sichtbare Überschrift (wie im Bestand `aria-label`) */
  ariaLabel?: string;
  seitenart?: Seitenart;
  /** kalk (Grund, Standard) · fliese (Feld) – Strukturwechsel nach K-011 */
  flaeche?: 'kalk' | 'fliese';
  /** Fuge oben (Abschnittsgrenze) */
  fuge?: boolean;
  /** Abstand oben/unten: normal (je Seitenart) · eng (Arbeitsseite) · keiner */
  abstand?: 'normal' | 'eng' | 'keiner';
  /** Abschnittskopf über dem Inhalt (Etikett, Überschrift, Vorspann); titelId wird übernommen */
  kopf?: Omit<AbschnittskopfProps, 'titelId'>;
  className?: string;
};

export function Abschnitt({ children, id, titelId, ariaLabel, seitenart = 'erzaehl', flaeche = 'kalk', fuge = false, abstand = 'normal', kopf, className }: AbschnittProps) {
  return (
    <section
      id={id}
      aria-labelledby={titelId}
      aria-label={titelId ? undefined : ariaLabel}
      className={verbinde(
        flaeche === 'fliese' ? 'bg-k-fliese' : 'bg-k-kalk',
        fuge && 'border-t border-k-fuge',
        abstand === 'normal' ? ABSTAND[seitenart] : abstand === 'eng' ? ABSTAND.arbeit : '',
        className,
      )}
    >
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        {kopf ? <Abschnittskopf {...kopf} titelId={titelId} /> : null}
        {kopf ? <div className={seitenart === 'arbeit' ? 'mt-k-6' : 'mt-k-8'}>{children}</div> : children}
      </div>
    </section>
  );
}

export type AbschnittskopfProps = {
  etikett?: ReactNode;
  titel: ReactNode;
  titelId?: string;
  /** Ebene wie im Bestand; Standard h2 */
  ebene?: 'h2' | 'h3' | 'p';
  /** Vorspann neben (Desktop) bzw. unter der Überschrift */
  text?: ReactNode;
  /** Größe: gross (H2 Erzählseite, k-6) · mittel (k-5) · klein (k-4) */
  groesse?: 'gross' | 'mittel' | 'klein';
  className?: string;
};

const TITEL_GROESSE = { gross: 'text-k-6', mittel: 'text-k-5', klein: 'text-k-4' } as const;

export function Abschnittskopf({ etikett, titel, titelId, ebene: Titel = 'h2', text, groesse = 'gross', className }: AbschnittskopfProps) {
  return (
    <div className={verbinde('grid gap-k-5 lg:grid-cols-12 lg:items-end', className)}>
      <div className="min-w-0 lg:col-span-7">
        {etikett ? <Etikett kreuz>{etikett}</Etikett> : null}
        <Titel id={titelId} className={verbinde('k-anzeige text-k-tinte wrap-break-word hyphens-auto', TITEL_GROESSE[groesse], etikett ? 'mt-k-4' : '')}>
          {titel}
        </Titel>
      </div>
      {text ? <div className="min-w-0 max-w-(--k-mass) k-text text-k-3 text-k-tinte-2 lg:col-span-5">{text}</div> : null}
    </div>
  );
}

/** Satz unter einem Abschnitt (z. B. Anruf-Hinweis mit Telefon-Textlink); Wortlaut als ReactNode. */
export function Nachsatz({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={verbinde('mt-k-6 max-w-(--k-mass) k-text text-k-2 text-k-tinte-2', className)}>{children}</p>;
}

/** Knöpfe in Lesefolge; mobil volle Breite für den ersten (Hauptweg), die übrigen teilen sich die Zeile. */
export function Aktionen({ aktionen, auf = 'hell', gestapelt = false, className }: { aktionen: Aktion[]; auf?: 'hell' | 'tinte'; gestapelt?: boolean; className?: string }) {
  if (aktionen.length === 0) return null;
  return (
    <div className={verbinde('flex gap-k-3', gestapelt ? 'flex-col' : 'flex-wrap', className)}>
      {aktionen.map((a, i) => (
        <Knopf
          key={a.href + i}
          href={a.href}
          art={a.art ?? 'neben'}
          auf={auf}
          target={a.extern ? '_blank' : undefined}
          rel={a.extern ? 'noopener noreferrer' : undefined}
          aria-label={a.ariaLabel}
          className={verbinde(a.art === 'text' ? 'w-fit' : gestapelt ? 'w-full' : i === 0 ? 'w-full sm:w-auto' : 'grow sm:grow-0', 'wrap-break-word hyphens-auto')}
          vorne={a.zeichen ? <Icon name={a.zeichen} groesse={20} /> : undefined}
          hinten={a.pfeil ? <Icon name="pfeil" groesse={20} /> : undefined}
        >
          {a.mono ? <span className="k-mono font-normal">{a.label}</span> : a.label}
        </Knopf>
      ))}
    </div>
  );
}

/** Haken-Liste (Zusagen, Merkmale, Leistungsumfang). Jeder Punkt ein eigenes Element (Lehre 2). */
export function Merkmale({ punkte, dicht = false, spalten = 1, className }: { punkte: ReactNode[]; dicht?: boolean; spalten?: 1 | 2; className?: string }) {
  return (
    <ul className={verbinde('grid border-t border-k-fuge', spalten === 2 && 'sm:grid-cols-2 sm:gap-x-k-5', className)}>
      {punkte.map((punkt, i) => (
        <li key={i} className={verbinde('flex min-w-0 items-start gap-k-3 border-b border-k-fuge k-text text-k-tinte', dicht ? 'py-k-2 text-k-2' : 'py-k-3 text-k-3')}>
          <span className="flex h-lh shrink-0 items-center text-k-tinte-2">
            <Icon name="haken" groesse={20} />
          </span>
          <span className="min-w-0 wrap-break-word hyphens-auto">{punkt}</span>
        </li>
      ))}
    </ul>
  );
}

const PFEILLINK = verbinde(
  'group inline-flex min-h-k-7 max-w-full items-center gap-k-2 rounded-k-1 k-text text-k-2 font-semibold text-k-tinte',
  fokus(),
);
const PFEILLINK_TEXT =
  'min-w-0 wrap-break-word hyphens-auto underline decoration-1 underline-offset-4 decoration-k-strich pointer-fine:group-hover:decoration-2 pointer-fine:group-hover:decoration-k-tinte group-active:decoration-2 group-active:decoration-k-tinte';

/** Weg mit Pfeil (Verweis auf Unterseite, „Mehr …“). Trefferfläche 48 px hoch; Fokus 2 px Tinte am Link. */
export function Pfeillink({ href, children, ariaLabel, zeichen = 'pfeil', className }: { href: string; children: ReactNode; ariaLabel?: string; zeichen?: IconName; className?: string }) {
  const inhalt = (
    <>
      <span className={PFEILLINK_TEXT}>{children}</span>
      <span aria-hidden="true" className="flex shrink-0">
        <Icon name={zeichen} groesse={20} />
      </span>
    </>
  );
  const intern = href.startsWith('/') && !href.startsWith('//');
  return intern ? (
    <Link href={href} aria-label={ariaLabel} data-motion="zustand" className={verbinde(PFEILLINK, className)}>
      {inhalt}
    </Link>
  ) : (
    <a href={href} aria-label={ariaLabel} data-motion="zustand" className={verbinde(PFEILLINK, className)}>
      {inhalt}
    </a>
  );
}

/** Rücksprung („Zurück zur … Übersicht“): Textlink mit Pfeil nach links, Trefferfläche 48 px. */
export function Ruecklink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} data-motion="zustand" className={verbinde(PFEILLINK, 'text-k-2')}>
      <span aria-hidden="true" className="flex shrink-0">
        <Icon name="pfeil" richtung="links" groesse={20} />
      </span>
      <span className={PFEILLINK_TEXT}>{children}</span>
    </Link>
  );
}

/** Lot (K-007): mobil am linken Rand (`--k-rand` − 2 px), dekorativ. Der Elternteil ist `relative`. Ab lg trägt die
 *  Textspalte die Achse als rechte Kante an der Spaltengrenze (Klasse `ACHSE_SPALTE`), sodass sie nie Text schneidet. */
export function Lot() {
  return <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-(--k-rand) w-(--k-linie-2) -translate-x-full bg-k-laser lg:hidden" />;
}

export const ACHSE_SPALTE = 'lg:border-r-2 lg:border-r-k-laser lg:pr-k-7';
