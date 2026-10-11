// Abschnitt der Vorlage Fachseite (P4-01, KERN v1.2 K-007, K-011): Rahmen und Kopf, die jeder Abschnitt teilt.
// Rahmen: Seitenbreite `--k-seite`, Rand `--k-rand`, senkrechter Abstand nach `dichte`, Fläche Kalk oder Fliese.
// Kopf: Etikett (Mono, Fugenkreuz, K-012 Kl. 3 – Wortlaut bleibt) · H2 (`k-anzeige`) · Einleitung (Vorspann, Tinte-2).
// kopfLage „oben“: Kopf im Maß (66ch), Inhalt darunter über die volle Breite – luftig.
// kopfLage „seitlich“: ab lg Kopf in Spalte 1–5, Inhalt in 6–12 – dicht; mobil untereinander, Lesefolge = DOM-Folge.
// Ohne Titel trägt der Abschnitt nur `ariaLabel` (Bestand: `aria-label="Kundenstimme"`); ohne beides ist er ein div.
// `auftritt`: der Inhalt rückt beim Erreichen 8 px in die Flucht (Register `auftritt`, IO 20 %); die Seite setzt ihn auf
// höchstens der Hälfte ihrer Abschnitte (K-009, S-02). `hauptaktion`: der WhatsApp-Kanal weicht aus (P3-07, Lehre 9).
// Server-Komponente; `useId` liefert eine eindeutige Titel-ID, wenn die Seite keine aus dem Bestand mitgibt.
import { useId, type ReactNode } from 'react';
import { Etikett, verbinde } from '@/components/kern/basis';
import { UMBRUCH, istText, type Dichte, type Flaeche } from '@/components/kern/vorlagen/fachseite/typen';

export type AbschnittKopfProps = {
  /** Eyebrow des Bestands (Etikett, Wortlaut gleich) */
  etikett?: ReactNode;
  /** H2 des Abschnitts (Wortlaut gleich, ohne Verlaufsschrift) */
  titel?: ReactNode;
  /** ID der H2 aus dem Bestand (z. B. „workflow-heading“), sonst automatisch */
  titelId?: string;
  /** Vorspann unter der H2: Zeichenkette = ein Absatz; mehrere Absätze als <p>-Elemente übergeben */
  einleitung?: ReactNode;
  kopfLage?: 'oben' | 'seitlich';
  /** gross: H2 in `text-k-6` · klein: H2 in `text-k-5` (Nebenabschnitte wie Querverweise) */
  kopfGroesse?: 'gross' | 'klein';
};

export type AbschnittRahmenProps = {
  /** Anker des Bestands (z. B. „anfrage“, „konfigurator“) */
  id?: string;
  /** Name des Abschnitts, wenn er keine sichtbare Überschrift hat (Wortlaut aus dem Bestand) */
  ariaLabel?: string;
  flaeche?: Flaeche;
  dichte?: Dichte;
  auftritt?: boolean;
  hauptaktion?: boolean;
  /** Satz nach dem Inhalt (Bestand: Absatz mit Verweis unter Rastern) */
  nachsatz?: ReactNode;
  /** Landmarke: section (Standard) oder nav (Ratgeber-Verweise) */
  als?: 'section' | 'nav';
  className?: string;
};

export type AbschnittProps = AbschnittKopfProps & AbschnittRahmenProps & { children?: ReactNode };

const DICHTE: Record<Dichte, string> = {
  weit: 'py-k-9 lg:py-k-10',
  normal: 'py-k-8 lg:py-k-9',
  eng: 'py-k-7 lg:py-k-8',
};

const FLAECHE: Record<Flaeche, string> = {
  kalk: '',
  fliese: 'border-y border-k-fuge bg-k-fliese',
};

/** Etikett · H2 · Einleitung. Auch einzeln nutzbar (z. B. in einem Feld). */
export function Abschnittskopf({
  etikett,
  titel,
  titelId,
  einleitung,
  kopfLage = 'oben',
  kopfGroesse = 'gross',
}: AbschnittKopfProps & { titelId: string }) {
  if (!etikett && !titel && !einleitung) return null;
  const vorspann = kopfLage === 'seitlich' || kopfGroesse === 'klein' ? 'text-k-3' : 'text-k-4';
  return (
    <>
      {etikett ? <Etikett kreuz>{etikett}</Etikett> : null}
      {titel ? (
        <h2
          id={titelId}
          className={verbinde(
            'k-anzeige text-k-tinte',
            kopfGroesse === 'klein' ? 'text-k-5' : 'text-k-6',
            etikett ? 'mt-k-4' : undefined,
            UMBRUCH,
          )}
        >
          {titel}
        </h2>
      ) : null}
      {einleitung ? (
        <div className={verbinde('flex max-w-(--k-mass) flex-col gap-k-4 k-text text-k-tinte-2', vorspann, titel || etikett ? 'mt-k-5' : undefined)}>
          {istText(einleitung) ? <p>{einleitung}</p> : einleitung}
        </div>
      ) : null}
    </>
  );
}

/** Satz nach dem Inhalt, im Maß, Nebentext. */
export function Nachsatz({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={verbinde('mt-k-7 flex max-w-(--k-mass) flex-col gap-k-3 k-text text-k-2 text-k-tinte-2', className)}>
      {istText(children) ? <p>{children}</p> : children}
    </div>
  );
}

export default function Abschnitt({
  etikett,
  titel,
  titelId,
  einleitung,
  kopfLage = 'oben',
  kopfGroesse = 'gross',
  id,
  ariaLabel,
  flaeche = 'kalk',
  dichte = 'weit',
  auftritt = false,
  hauptaktion = false,
  nachsatz,
  als = 'section',
  className,
  children,
}: AbschnittProps) {
  const eigeneId = `k-abschnitt${useId()}`;
  const tid = titelId ?? eigeneId;
  const benannt = Boolean(titel) || Boolean(ariaLabel);
  const Element = benannt ? als : 'div';
  const hatKopf = Boolean(etikett || titel || einleitung);
  const bewegung = auftritt ? { 'data-motion': 'auftritt', 'data-ausloeser': 'sicht' } : {};
  const kopf = (
    <Abschnittskopf etikett={etikett} titel={titel} titelId={tid} einleitung={einleitung} kopfLage={kopfLage} kopfGroesse={kopfGroesse} />
  );

  return (
    <Element
      id={id}
      aria-labelledby={titel ? tid : undefined}
      aria-label={!titel && ariaLabel ? ariaLabel : undefined}
      data-hauptaktion={hauptaktion ? '' : undefined}
      className={verbinde(DICHTE[dichte], FLAECHE[flaeche], className)}
    >
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        {kopfLage === 'seitlich' && hatKopf ? (
          <div className="grid grid-cols-1 gap-k-7 lg:grid-cols-12 lg:gap-0">
            <header className="min-w-0 lg:col-span-5 lg:pr-k-7">{kopf}</header>
            <div className="min-w-0 lg:col-span-7" {...bewegung}>
              {children}
              {nachsatz ? <Nachsatz>{nachsatz}</Nachsatz> : null}
            </div>
          </div>
        ) : (
          <>
            {hatKopf ? <header className="max-w-(--k-mass)">{kopf}</header> : null}
            <div className={verbinde('min-w-0', hatKopf && children ? (kopfGroesse === 'klein' ? 'mt-k-6' : 'mt-k-8') : undefined)} {...bewegung}>
              {children}
            </div>
            {nachsatz ? <Nachsatz>{nachsatz}</Nachsatz> : null}
          </>
        )}
      </div>
    </Element>
  );
}
