// Abschnitt (P4-10a, gemeinsam für alle Vorlagen; KERN v1.2 K-007, K-011): Rahmen und Kopf, die jeder Abschnitt teilt.
// Vorher doppelt: `fachseite/Abschnitt` (P4-01) und `uebersicht/Abschnitt` (P4-02). Unterschiede sind Varianten:
// - dichte: weit (Erzählseite, 96/128 px) · normal (64/96) · eng (Arbeitsseite, 48/64) · keine. Früher P4-02 `seitenart`
//   + `abstand`: erzaehl = weit, arbeit/eng = eng, keiner = keine.
// - flaeche: kalk (Grund) oder fliese; `fugen`: oben/beide/keine (Standard: Fliese mit Fugen oben und unten, Kalk ohne).
// - kopfLage: oben (Kopf im Maß 66ch, Inhalt darunter – luftig) · seitlich (ab lg Kopf Sp. 1–5, Inhalt 6–12 – dicht) ·
//   geteilt (ab lg Überschrift Sp. 1–7, Vorspann Sp. 8–12, Inhalt darunter – P4-02 „Abschnittskopf“).
// - kopfGroesse: gross (H2 k-6) · mittel (k-5, Nebenabschnitte) · klein (k-4); `kopfEbene`: h2, h3 oder p wie im Bestand.
// Die Stufe der Überschrift kommt aus ihrem längsten Wort (`stufeNachWort`, Ort `abschnitt` bzw. `seitlich`): kein Wort
// bricht mitten im Wort. Name: eigene Überschrift (`titel`), Überschrift im Inhalt (`titelId` ohne `titel`, z. B. Projektband)
// oder `ariaLabel` (Bestand „Kundenstimme“); ohne Namen ist der Abschnitt ein div.
// `auftritt`: der Inhalt rückt beim Erreichen 8 px in die Flucht (Register `auftritt`, IO 20 %; höchstens die Hälfte der
// Abschnitte, K-009, S-02). `hauptaktion`: der WhatsApp-Kanal weicht aus (P3-07, Lehre 9).
// Server-Komponente; `useId` liefert eine eindeutige Titel-ID, wenn die Seite keine aus dem Bestand mitgibt.
import { useId, type ReactNode } from 'react';
import { Etikett, verbinde } from '@/components/kern/basis';
import { stufeNachWort, type Stufe } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH, istText, type Dichte, type Flaeche } from '@/components/kern/vorlagen/teile/typen';

export type KopfLage = 'oben' | 'seitlich' | 'geteilt';
export type KopfGroesse = 'gross' | 'mittel' | 'klein';

export type AbschnittKopfProps = {
  /** Eyebrow des Bestands (Etikett, Wortlaut gleich) */
  etikett?: ReactNode;
  /** Überschrift des Abschnitts (Wortlaut gleich, ohne Verlaufsschrift) */
  titel?: ReactNode;
  /** ID der Überschrift aus dem Bestand (z. B. „workflow-heading“), sonst automatisch */
  titelId?: string;
  /** Vorspann: Zeichenkette = ein Absatz; mehrere Absätze als <p>-Elemente übergeben */
  einleitung?: ReactNode;
  kopfLage?: KopfLage;
  kopfGroesse?: KopfGroesse;
  /** Ebene der Überschrift wie im Bestand (Standard h2) */
  kopfEbene?: 'h2' | 'h3' | 'p';
};

export type AbschnittRahmenProps = {
  /** Anker des Bestands (z. B. „anfrage“, „konfigurator“) */
  id?: string;
  /** Name des Abschnitts, wenn er keine sichtbare Überschrift hat (Wortlaut aus dem Bestand) */
  ariaLabel?: string;
  flaeche?: Flaeche;
  /** Fugen am Abschnittsrand; Standard: Fliese beide, Kalk keine */
  fugen?: 'keine' | 'oben' | 'beide';
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
  keine: '',
};

const FUGEN = { keine: '', oben: 'border-t border-k-fuge', beide: 'border-y border-k-fuge' } as const;

const GROESSTE: Record<KopfGroesse, Stufe> = { gross: 'text-k-6', mittel: 'text-k-5', klein: 'text-k-4' };

/** Klasse der Abschnittsüberschrift: Stufe nach dem längsten Wort, nie größer als die Kopfgröße. */
export function kopfStufe(titel: ReactNode, kopfLage: KopfLage = 'oben', kopfGroesse: KopfGroesse = 'gross'): Stufe {
  return stufeNachWort(titel, kopfLage === 'seitlich' ? 'seitlich' : 'abschnitt', GROESSTE[kopfGroesse]);
}

/** Etikett · Überschrift · Einleitung. Auch einzeln nutzbar (z. B. im Verweisblock). */
export function Abschnittskopf({
  etikett,
  titel,
  titelId,
  einleitung,
  kopfLage = 'oben',
  kopfGroesse = 'gross',
  kopfEbene: Titel = 'h2',
}: AbschnittKopfProps) {
  if (!etikett && !titel && !einleitung) return null;
  const vorspann = kopfLage === 'oben' && kopfGroesse === 'gross' ? 'text-k-4' : 'text-k-3';
  const ueberschrift = (
    <>
      {etikett ? <Etikett kreuz>{etikett}</Etikett> : null}
      {titel ? (
        <Titel id={titelId} className={verbinde('k-anzeige text-k-tinte', kopfStufe(titel, kopfLage, kopfGroesse), etikett ? 'mt-k-4' : undefined, UMBRUCH)}>
          {titel}
        </Titel>
      ) : null}
    </>
  );
  const text = einleitung ? (
    <div className={verbinde('flex max-w-(--k-mass) min-w-0 flex-col gap-k-4 k-text text-k-tinte-2', vorspann)}>
      {istText(einleitung) ? <p>{einleitung}</p> : einleitung}
    </div>
  ) : null;
  if (kopfLage === 'geteilt') {
    return (
      <div className="grid gap-k-5 lg:grid-cols-12 lg:items-end">
        <div className="min-w-0 lg:col-span-7">{ueberschrift}</div>
        {text ? <div className="min-w-0 lg:col-span-5">{text}</div> : null}
      </div>
    );
  }
  return (
    <>
      {ueberschrift}
      {text ? <div className={titel || etikett ? 'mt-k-5' : undefined}>{text}</div> : null}
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
  kopfEbene,
  id,
  ariaLabel,
  flaeche = 'kalk',
  fugen,
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
  const benanntDurch = titel ? tid : titelId;
  const Element = benanntDurch || ariaLabel ? als : 'div';
  const hatKopf = Boolean(etikett || titel || einleitung);
  const bewegung = auftritt ? { 'data-motion': 'auftritt', 'data-ausloeser': 'sicht' } : {};
  const kopf = (
    <Abschnittskopf
      etikett={etikett}
      titel={titel}
      titelId={tid}
      einleitung={einleitung}
      kopfLage={kopfLage}
      kopfGroesse={kopfGroesse}
      kopfEbene={kopfEbene}
    />
  );
  const abstand = dichte === 'eng' || kopfGroesse !== 'gross' ? 'mt-k-6' : 'mt-k-8';

  return (
    <Element
      id={id}
      aria-labelledby={benanntDurch}
      aria-label={!benanntDurch && ariaLabel ? ariaLabel : undefined}
      data-hauptaktion={hauptaktion ? '' : undefined}
      className={verbinde(DICHTE[dichte], flaeche === 'fliese' ? 'bg-k-fliese' : 'bg-k-kalk', FUGEN[fugen ?? (flaeche === 'fliese' ? 'beide' : 'keine')], className)}
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
            {hatKopf ? <header className={kopfLage === 'geteilt' ? undefined : 'max-w-(--k-mass)'}>{kopf}</header> : null}
            <div className={verbinde('min-w-0', hatKopf && children ? abstand : undefined)} {...bewegung}>
              {children}
            </div>
            {nachsatz ? <Nachsatz>{nachsatz}</Nachsatz> : null}
          </>
        )}
      </div>
    </Element>
  );
}
