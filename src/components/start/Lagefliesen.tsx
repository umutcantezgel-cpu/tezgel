// Startseite · 2 Ihre Lage (KERN v3 K-003 Nr. 2, K-009; Text REF-start): sechs Fliesen, je eine Lage in den Worten des
// Kunden, jede ein Link auf die passende Seite. Fliese = Foto (oder Fliesenkomposition, wo kein Foto passt) und Satz,
// aneinander an der Fuge. Ab lg zwei Streifen zu je drei Fliesen über die volle Satzbreite, der rechte um ein Drittel
// versetzt (der eine Versatz dieses Bildschirms, K-005); je Fliese Bild links (ein Drittel) und Satz rechts, ohne
// Silbentrennung. Mobil eine Liste mit kleinem Bild links, groß genug zum Tippen. Ist die Fliese schmaler als 20 rem (große
// Systemschrift), steht das Bild als Streifen über dem Satz, damit der Satz die volle Breite behält (Container-Abfrage in
// rem, wächst mit der Schrift). Bilder im Link sind dekorativ (alt=""), der Satz ist der Name des Links. Serverkomponente.
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Fliesenkomposition, { type Kompositionsmotiv } from '@/components/kern/Fliesenkomposition';
import { ARBEITEN, type ArbeitId } from '@/config/arbeiten';

type Lage = { satz: string; href: string } & ({ bild: ArbeitId; motiv?: never } | { motiv: Kompositionsmotiv; bild?: never });

const LAGEN: Lage[] = [
  // Fotos anders als in der Galerie „So sieht unsere Arbeit aus.“, damit kein Bild doppelt erscheint (Sichtprüfung E2)
  { satz: 'Die Badewanne soll raus. Ich möchte eine Dusche ohne Stufe.', href: '/bad/barrierefreies-bad', bild: 'bereich-dusche-streifen-sitzbank' },
  { satz: 'Das ganze Bad ist alt und soll neu werden.', href: '/bad/badsanierung', bild: 'bad-einstieg' },
  { satz: 'Im Neubau sollen Böden und Wände gefliest werden.', href: '/fliesen/neubau', motiv: 'verlegekante' },
  { satz: 'Eine Fliese ist gesprungen, oder die Fugen sind alt.', href: '/fliesenreparatur', motiv: 'riss' },
  { satz: 'Auf dem Balkon bleibt nach dem Regen Wasser stehen.', href: '/balkon-terrasse', bild: 'lage-balkon' },
  { satz: 'Die Treppe vor dem Haus ist kaputt.', href: '/treppen/aussentreppe', bild: 'kontakt-eingang' },
];

function Bild({ lage }: { lage: Lage }) {
  // Zeichnung nur, wo kein Foto passt, und dann im selben Stil wie die Bereichsfliesen (deutlich; Sichtabnahme E2, Befund 13)
  if (lage.motiv) return <Fliesenkomposition motiv={lage.motiv} ausschnitt={72} fuellen deutlich className="absolute inset-0" />;
  const b = ARBEITEN[lage.bild];
  return (
    <Image
      src={b.src}
      alt=""
      fill
      sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 33vw"
      placeholder="blur"
      blurDataURL={b.blur}
      className="object-cover"
    />
  );
}

export default function Lagefliesen() {
  return (
    <Abschnitt
      id="ihre-lage"
      formel="lage"
      leitachse
      titel="Was möchten Sie ändern?"
      einleitung={<p>Wählen Sie, was am besten passt. Sie kommen direkt zu den Bildern und Antworten für Ihre Lage.</p>}
      className="lg:pb-32"
    >
      <ul className="grid gap-px border border-fuge bg-fuge md:grid-cols-2 lg:grid-flow-col lg:grid-rows-3 lg:gap-0 lg:border-0 lg:bg-transparent">
        {LAGEN.map((lage, i) => (
          <li
            key={lage.href}
            className={clsx(
              '@container bg-fliese lg:border-x lg:border-fuge',
              i % 3 === 0 && 'lg:border-t',
              'lg:border-b',
              // rechter Streifen: um ein Drittel versetzt, die Fuge zum linken Streifen liegt übereinander (1 px)
              i >= 3 && 'lg:-ml-px lg:translate-y-16',
            )}
          >
            <Link
              href={lage.href}
              data-motion="zustand"
              className="group grid h-full grid-cols-1 text-tinte transition-colors dauer-1 ease-setzen hover:bg-kalk @xs:grid-cols-4 @xs:lg:grid-cols-3"
            >
              {/* schmal ein Streifen über dem Satz; sonst füllt das Bild die ganze Höhe der Fliese (mindestens 96 px), ab lg
                  quadratisch */}
              <span
                aria-hidden="true"
                className="relative h-24 overflow-hidden border-b border-fuge @xs:col-span-1 @xs:h-auto @xs:min-h-24 @xs:border-r @xs:border-b-0 @xs:lg:aspect-square @xs:lg:min-h-0"
              >
                <Bild lage={lage} />
              </span>
              {/* schmal: Pfeil in eigener Zeile unter dem Satz, damit der Satz die volle Breite hat (Runde 3) */}
              <span className="flex min-w-0 flex-col gap-2 p-3 @xs:col-span-3 @xs:flex-row @xs:items-start @xs:justify-between @xs:gap-3 @xs:p-4 lg:p-8 @xs:lg:col-span-2">
                <span className="font-text text-fs-4 font-semibold text-pretty hyphens-none">{lage.satz}</span>
                <Icon name="pfeil-rechts" groesse={5} className="shrink-0 self-end text-tinte-2 transition-colors dauer-1 group-hover:text-tinte @xs:mt-1 @xs:self-auto" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Abschnitt>
  );
}
