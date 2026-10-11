// Einstieg (P4-10a, gemeinsam für alle Vorlagen; KERN v1.2 K-001, K-007, K-011): Kopf einer Seite mit H1 links bündig,
// nie zentriert mit zwei Knöpfen vor abstraktem Hintergrund. Kein Signaturmoment: Die Achse steht still (kein `data-motion`).
// Vorher dreifach: `fachseite/Einstieg` (P4-01, Waage), `uebersicht/Einstieg` (P4-02, Lot) und `liste/Kopf` (P4-02,
// Erzählseite mit Lot bzw. Arbeitsseite ohne Achse). Unterschiede sind Varianten über `achse`:
//
// waage – Fachseite als Planblatt, ab lg drei Zeilen im 12er-Raster:
//   1  Kennzeile (Sp. 1–7) | Fuge läuft bis zum Rand weiter (Sp. 8–12)
//   2  H1 mit Unterzeile (Sp. 1–7, unten bündig) | Motiv (Sp. 9–12, unten bündig; ruhender Verlegeplan der Leistung)
//   3  Vorspann, Knöpfe, Nachsatz (Sp. 1–7) | Schriftfeld (Sp. 9–12)
//   Die Achse ist eine Waage in Laser (2 px) am Anfang von Zeile 3: Die H1 steht auf ihr, kein Text wird geschnitten. Wo rechts
//   etwas fluchtet, setzt ein Fugenkreuz in Laser den Kreuzpunkt auf die Spaltengrenze 8 | 9.
// lot – Übersicht und Erzählseiten-Liste: Textspalte Sp. 1–8, an ihrer rechten Kante die Achse als Lot an der Spaltengrenze,
//   Randspalte Sp. 9–12 für Motiv und Schriftfeld.
// keine – Arbeitsseite (K-011): kompakter Kopf, H1 höchstens k-6, keine Achse, Textspalte Sp. 1–9.
// Unter lg (eigenes Blatt, K-003 Nr. 7) eine Spalte; bei Waage und Lot steht die Achse als Lot am linken Rand.
// H1: Stufe nach dem längsten Wort (`stufeNachWort`, Ort `einstieg`): „Verbundabdichtung“ steht in k-6, weil es in k-7 bei
// 320 px nicht in die Spalte passt; kurze Wörter behalten k-7. Rot: nur die Achse (K-003 Nr. 2). H1 und Vorspann stehen ab
// dem ersten Bild (LCP). `data-hauptaktion` bei Knöpfen: der WhatsApp-Kanal weicht aus (Lehre 9).
import { useId, type ReactNode } from 'react';
import { Etikett, Fugenkreuz, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import Knopfreihe from '@/components/kern/vorlagen/teile/Knopfreihe';
import { Ruecklink } from '@/components/kern/vorlagen/teile/Pfeillink';
import { Zusagen } from '@/components/kern/vorlagen/teile/Punkte';
import { stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH, istText, type KnopfAngabe } from '@/components/kern/vorlagen/teile/typen';

/** Kennzeile: Maßangabe in Mono mit optionalem Zeichen (Kalender, Uhr). */
export type Kennung = { zeichen?: IconName; text: ReactNode };

export type EinstiegProps = {
  /** waage (Fachseite) · lot (Übersicht, Erzählseiten-Liste) · keine (Arbeitsseite) */
  achse?: 'waage' | 'lot' | 'keine';
  /** section (Standard, benannt über die H1) oder header (Kopf von Liste und Artikel wie im Bestand) */
  als?: 'section' | 'header';
  /** ID der H1 aus dem Bestand (z. B. „badsanierung-heading“) */
  titelId?: string;
  /** Rücksprung über der Kennzeile (Bestand: „Zurück zur … Übersicht“) */
  ruecklink?: { href: string; titel: ReactNode };
  /** Eyebrow des Bestands als Kennzeile (Etikett mit Fugenkreuz, Wortlaut gleich; Trenner „·“ als `<Trenner />`) */
  etikett?: ReactNode;
  /** Badges des Bestands als gerahmte Etiketten, je ein Element (Lehre 2); das erste in Tinte */
  etiketten?: readonly ReactNode[];
  /** H1 (bzw. ihr erster Teil) */
  titel: ReactNode;
  /** zweiter Teil der H1 (im Bestand Verlaufsschrift oder nach `<br />`) – eigene Zeile, ungestaucht */
  unterzeile?: ReactNode;
  /** Absatz unter der H1 */
  vorspann?: ReactNode;
  /** Datum, Lesezeit in Mono */
  kennungen?: readonly Kennung[];
  /** gerahmter Satz unter dem Vorspann (Bestand: weißes Kästchen) */
  hinweis?: ReactNode;
  /** Knöpfe in Bestandsreihenfolge; der erste ist Hauptknopf, wenn er keine `art` trägt */
  knoepfe?: readonly KnopfAngabe[];
  /** Zusagen-Zeile unter den Knöpfen (Bestand: Haken-Liste) */
  zusagen?: readonly ReactNode[];
  /** kleiner Satz unter den Knöpfen (Bestand z. B. Innentreppe: Voraussetzung mit Verweis) */
  nachsatz?: ReactNode;
  /** ruhender Verlegeplan der Leistung (`<Plan ruhend />`, P4-03) oder Vignette; dekorativ */
  motiv?: ReactNode;
  /** Schriftfeld (`SchriftfeldBetrieb` oder `Schriftfeld`) */
  schriftfeld?: ReactNode;
  className?: string;
};

/** Lot (K-007): unter lg am linken Rand (rechte Kante bei `--k-rand`), über die volle Höhe; dekorativ. */
function Lot() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-(--k-rand) w-(--k-linie-2) -translate-x-full bg-k-laser lg:hidden" />;
}

export default function Einstieg({
  achse = 'waage',
  als: Element = 'section',
  titelId,
  ruecklink,
  etikett,
  etiketten = [],
  titel,
  unterzeile,
  vorspann,
  kennungen = [],
  hinweis,
  knoepfe = [],
  zusagen = [],
  nachsatz,
  motiv,
  schriftfeld,
  className,
}: EinstiegProps) {
  const eigeneId = `k-einstieg${useId()}`;
  const tid = titelId ?? eigeneId;
  const arbeit = achse === 'keine';
  const waage = achse === 'waage';
  const benennung = Element === 'section' ? { 'aria-labelledby': tid } : {};
  const hauptaktion = knoepfe.length > 0 ? { 'data-hauptaktion': '' } : {};

  const kennzeile =
    ruecklink || etikett || etiketten.length > 0 ? (
      <>
        {ruecklink ? (
          <div className="-ml-k-1">
            <Ruecklink href={ruecklink.href}>{ruecklink.titel}</Ruecklink>
          </div>
        ) : null}
        {etikett ? (
          <Etikett als="p" kreuz ton="tinte" className={ruecklink ? 'mt-k-3' : undefined}>
            {etikett}
          </Etikett>
        ) : null}
        {etiketten.length > 0 ? (
          <ul className={verbinde('flex flex-wrap gap-k-2', ruecklink || etikett ? 'mt-k-3' : undefined)}>
            {etiketten.map((e, i) => (
              <li key={i} className="min-w-0">
                <Etikett rahmen kreuz={i === 0} ton={i === 0 ? 'tinte' : 'neben'}>
                  {e}
                </Etikett>
              </li>
            ))}
          </ul>
        ) : null}
      </>
    ) : null;

  const h1 = (lage: string) => (
    <h1 id={tid} className={verbinde('k-anzeige text-k-tinte', stufeNachWort(titel, 'einstieg', arbeit ? 'text-k-6' : 'text-k-7'), UMBRUCH, lage)}>
      <span className="block">{titel}</span>
      {unterzeile ? (
        <>
          {' '}
          <span className="mt-k-3 block k-text text-k-5 font-semibold tracking-normal text-k-tinte-2">{unterzeile}</span>
        </>
      ) : null}
    </h1>
  );

  const rest = (
    <>
      {vorspann ? (
        <div className={verbinde('flex max-w-(--k-mass) flex-col gap-k-4 k-text text-k-tinte', arbeit ? 'text-k-3' : 'text-k-4')}>
          {istText(vorspann) ? <p>{vorspann}</p> : vorspann}
        </div>
      ) : null}
      {kennungen.length > 0 ? (
        <ul className="mt-k-4 flex flex-wrap gap-x-k-5 gap-y-k-2">
          {kennungen.map((k, i) => (
            <li key={i} className="flex items-center gap-k-2 k-mono text-k-1 text-k-tinte-2">
              {k.zeichen ? (
                <span aria-hidden="true" className="flex shrink-0">
                  <Icon name={k.zeichen} groesse={16} />
                </span>
              ) : null}
              <span>{k.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {hinweis ? <p className="mt-k-5 w-fit max-w-(--k-mass) border border-k-strich bg-k-fliese px-k-4 py-k-3 k-text text-k-2 text-k-tinte">{hinweis}</p> : null}
      <Knopfreihe knoepfe={knoepfe} className={arbeit ? 'mt-k-5' : 'mt-k-6'} />
      <Zusagen punkte={zusagen} className="mt-k-5" />
      {nachsatz ? (
        <div className="mt-k-5 max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">{istText(nachsatz) ? <p>{nachsatz}</p> : nachsatz}</div>
      ) : null}
    </>
  );

  if (waage) {
    const rechts = Boolean(motiv || schriftfeld);
    return (
      <Element {...benennung} {...hauptaktion} className={verbinde('relative pt-k-6 pb-k-9 lg:pt-k-7', className)}>
        <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
          <div className="relative grid grid-cols-1 pl-k-4 lg:grid-cols-12 lg:pl-0">
            {/* Zeile 1 · Kennzeile; die Fuge darunter läuft über die volle Breite */}
            {kennzeile ? <div className="min-w-0 lg:col-span-7 lg:row-start-1 lg:border-b lg:border-k-fuge lg:pr-k-6 lg:pb-k-3">{kennzeile}</div> : null}
            <div aria-hidden="true" className="hidden lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:block lg:border-b lg:border-k-fuge" />

            {/* Zeile 2 links · H1 auf der Waage */}
            {h1(verbinde('lg:col-span-7 lg:row-start-2 lg:self-end lg:pr-k-6 lg:pb-k-5', kennzeile ? 'mt-k-5 lg:mt-k-7' : undefined))}

            {/* Zeile 3 links · Vorspann, Knöpfe, Nachsatz */}
            <div className="mt-k-5 min-w-0 lg:col-span-7 lg:row-start-3 lg:mt-0 lg:pt-k-6 lg:pr-k-6">{rest}</div>

            {/* Zeile 2 rechts · Motiv (mobil nach dem Text, verkleinert) */}
            {motiv ? (
              <div className="mt-k-7 w-3/4 min-w-0 text-k-tinte md:w-1/2 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:mt-k-7 lg:w-auto lg:self-end lg:pb-k-5">
                {motiv}
              </div>
            ) : null}

            {/* Zeile 3 rechts · Schriftfeld, Oberkante auf der Waage */}
            {schriftfeld ? <div className="mt-k-7 min-w-0 lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:mt-0 lg:pt-k-6">{schriftfeld}</div> : null}

            {/* Waage (ab lg): ruhende Achse am Anfang von Zeile 3 über alle Spalten */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 hidden h-(--k-linie-2) -translate-y-1/2 bg-k-laser lg:col-span-full lg:row-start-3 lg:block"
            />
            {/* Kreuzpunkt auf der Spaltengrenze 8 | 9, nur wenn rechts etwas an der Achse fluchtet */}
            {rechts ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 text-k-laser lg:col-start-9 lg:row-start-3 lg:flex"
              >
                <Fugenkreuz className="size-k-4" />
              </span>
            ) : null}
          </div>
        </div>
        <Lot />
      </Element>
    );
  }

  const rand =
    motiv || schriftfeld ? (
      <div className="flex min-w-0 flex-col gap-k-6 text-k-tinte lg:col-span-4 lg:self-end lg:pl-k-7">
        {motiv ? <div className="w-3/4 md:w-1/2 lg:w-auto">{motiv}</div> : null}
        {schriftfeld}
      </div>
    ) : null;

  return (
    <Element {...benennung} {...hauptaktion} className={verbinde('relative border-b border-k-fuge bg-k-kalk', className)}>
      {arbeit ? null : <Lot />}
      <div
        className={verbinde(
          'mx-auto grid max-w-(--k-seite) px-(--k-rand) lg:grid-cols-12 lg:gap-0',
          arbeit ? 'gap-k-6 pt-k-6 pb-k-6 lg:pt-k-7' : 'gap-k-7 pt-k-8 pb-k-8 lg:pt-k-9 lg:pb-k-9',
        )}
      >
        <div className={verbinde('flex min-w-0 flex-col', arbeit ? 'lg:col-span-9' : 'lg:col-span-8 lg:border-r-2 lg:border-r-k-laser lg:pr-k-7')}>
          {kennzeile}
          {h1(kennzeile ? (arbeit ? 'mt-k-4' : 'mt-k-5') : '')}
          <div className={arbeit ? 'mt-k-4' : 'mt-k-5'}>{rest}</div>
        </div>
        {rand}
      </div>
    </Element>
  );
}
