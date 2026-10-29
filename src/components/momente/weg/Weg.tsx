// Großer Moment „weg“ (KERN v3.3 K-007, E3-GRAF-02) für /bad/badsanierung, Schlitz `momente.ablauf` der Erzählseite (ersetzt
// dort die Schritte): Vom Anruf bis zur letzten Fuge als Weg mit Stationen an der roten Laserlinie. Die Linie liegt auf dem
// Lot der Leitachse (Lage wie die Schritte der Vorlage: -ml-2 md:-ml-4, Kreuze mobil 8 px) und führt durch die Fläche des Abschnitts, die die
// Leitachse verdeckt. Jedes Wegstück reicht von der Marke einer Station bis zur Marke der nächsten; sein rotes Stück wächst
// scrollgebunden, und die Marke der nächsten Station setzt sich, wenn die Spitze ankommt (bewegung.css, Register `weg`).
// Ohne JavaScript, bei reduzierter Bewegung, ohne animation-timeline, im Notaus und im Druck steht die Linie voll und alle
// Marken sind gesetzt. Ab 56 rem Breite des Bausteins (Container-Abfrage, wächst mit der Systemschrift) steht jede Station
// als Zeile: Nummer, Name, Satz; die Fotos bei der Station „Fliesen verlegen“ beginnen unter dem Satz, ein Drittel
// eingerückt (Drittelversatz, K-005). Die Fotos stammen aus verschiedenen Baustellen: keine Nummern, keine Pfeile,
// Unterschriften nur mit dem, was zu sehen ist (K-012). Texte kommen aus dem Seiteninhalt. Serverkomponente.
import clsx from 'clsx';
import Bildfeld from '@/components/kern/Bildfeld';
import { KREUZ_GROESSE } from '@/components/kern/Leitachse';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Textmarken from '@/components/kern/Textmarken';
import type { AblaufInhalt } from '@/components/vorlagen/inhalt';
import type { Foto } from '@/components/vorlagen/teile/Fotos';

/** Fotos: ab lg etwa ein Fünftel der Breite (drei in acht Spalten), Tablet ein Drittel, mobil höchstens volle Breite */
const BILD_GROESSEN = '(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 100vw';

export interface WegProps {
  /** Stationen in fester Reihenfolge: Name (höchstens vier Wörter) und ein Satz mit Textmarken; fünf bis sieben */
  stationen: AblaufInhalt['schritte'];
  /** echte Fotos während der Arbeit (verschiedene Baustellen, ohne Reihenfolge); das erste steht mobil doppelt breit */
  bilder?: Foto[];
  /** Nummer der Station (ab 1), unter deren Satz die Fotos stehen */
  bilderBei?: number;
}

export default function Weg({ stationen, bilder = [], bilderBei = 5 }: WegProps) {
  return (
    <div data-motion="weg" className="@container">
      <ol className="-ml-2 md:-ml-4">
        {stationen.map((s, i) => {
          const letzte = i === stationen.length - 1;
          const mitBildern = bilder.length > 0 && i + 1 === bilderBei;
          return (
            <li key={s.titel} className={clsx('relative pl-8 @4xl:grid @4xl:grid-cols-12 @4xl:items-baseline @4xl:gap-x-12', !letzte && 'pb-12')}>
              {/* Wegstück bis zur Marke der nächsten Station: Grund in Strich, darüber das rote Stück (wächst von oben) */}
              {!letzte && (
                <span aria-hidden="true" className="weg-strecke absolute top-3 -bottom-3 left-0 w-px @4xl:top-6 @4xl:-bottom-6">
                  <span className="absolute inset-y-0 left-0 w-0 -translate-x-1/2 border-l border-strich" />
                  <span className="weg-rot absolute inset-y-0 left-0 w-0 origin-top -translate-x-1/2 border-l-2 border-laser" />
                </span>
              )}
              {/* Marke der Station auf der Linie: Fugenkreuz in Strich, darüber das gesetzte in Tinte */}
              <span aria-hidden="true" className={clsx('absolute top-3 left-0 -translate-x-1/2 -translate-y-1/2 @4xl:top-6', KREUZ_GROESSE)}>
                <Fugenkreuz className="absolute inset-0 size-full text-strich" />
                <span className="weg-marke-an absolute inset-0 flex">
                  <Fugenkreuz className="size-full text-tinte" />
                </span>
              </span>
              <p className="font-mono text-fs-4 text-tinte-2 @4xl:col-span-1">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte @4xl:col-span-3 @4xl:mt-0">{s.titel}</h3>
              <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2 @4xl:col-span-8 @4xl:mt-0">
                <Textmarken text={s.text} />
              </p>
              {mitBildern && (
                <div className="@container mt-8 @4xl:col-span-8 @4xl:col-start-5">
                  <ul className="grid grid-cols-1 gap-px border border-fuge bg-fuge @xs:grid-cols-2 @2xl:grid-cols-3">
                    {bilder.map((b, j) => (
                      <li key={b.bild} className={clsx('bg-kalk', j === 0 && '@xs:col-span-2 @2xl:col-span-1')}>
                        <Bildfeld arbeit={b.bild} sizes={BILD_GROESSEN} beschriftung={b.unterschrift} flaeche />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
