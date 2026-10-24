// Vorlagen · 2 Ihre Lage (KERN v3 K-003 Nr. 2, K-009; E-025): die Lage der Kundschaft in ihren Worten. Wahlweise als
// Absätze oder als Fliesen mit Link wie auf der Startseite (Foto oder Fliesenkomposition und Satz, aneinander an der Fuge;
// ab lg zwei Streifen, der rechte um ein Drittel versetzt, der eine Versatz dieses Bildschirms, K-005). Bei großer
// Systemschrift steht das Bild als Streifen über dem Satz und der Pfeil darunter (Container-Abfrage in rem, Runden 2 und
// 3). Bilder im Link sind dekorativ (alt=""), der Satz ist der Name des Links. Serverkomponente.
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Fliesenkomposition from '@/components/kern/Fliesenkomposition';
import Textmarken from '@/components/kern/Textmarken';
import { ARBEITEN } from '@/config/arbeiten';
import type { BildOderMotiv, LageInhalt } from '../inhalt';

type Fliese = { satz: string; href: string } & BildOderMotiv;

// Zeilen je Streifen ab lg (Klassen fest im Quelltext, damit Tailwind sie findet)
const STREIFEN_ZEILEN: Record<number, string> = { 1: 'lg:grid-rows-1', 2: 'lg:grid-rows-2', 3: 'lg:grid-rows-3', 4: 'lg:grid-rows-4' };

function Bild({ fliese }: { fliese: Fliese }) {
  if (fliese.motiv) return <Fliesenkomposition motiv={fliese.motiv} fuellen className="absolute inset-0" />;
  const b = ARBEITEN[fliese.bild];
  return <Image src={b.src} alt="" fill sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 33vw" placeholder="blur" blurDataURL={b.blur} className="object-cover" />;
}

export function LageFliesen({ fliesen }: { fliesen: Fliese[] }) {
  const proStreifen = Math.ceil(fliesen.length / 2);
  return (
    <ul className={clsx('grid gap-px border border-fuge bg-fuge md:grid-cols-2 lg:grid-flow-col lg:gap-0 lg:border-0 lg:bg-transparent', STREIFEN_ZEILEN[proStreifen])}>
      {fliesen.map((f, i) => (
        <li
          key={f.href}
          className={clsx(
            '@container bg-fliese lg:border-x lg:border-b lg:border-fuge',
            i % proStreifen === 0 && 'lg:border-t',
            // rechter Streifen: um ein Drittel versetzt, die Fuge zum linken Streifen liegt übereinander (1 px)
            i >= proStreifen && 'lg:-ml-px lg:translate-y-16',
          )}
        >
          <Link
            href={f.href}
            data-motion="zustand"
            className="group grid h-full grid-cols-1 text-tinte transition-colors dauer-1 ease-setzen hover:bg-kalk @xs:grid-cols-4 @xs:lg:grid-cols-3"
          >
            <span
              aria-hidden="true"
              className="relative h-24 overflow-hidden border-b border-fuge @xs:col-span-1 @xs:h-auto @xs:min-h-24 @xs:border-r @xs:border-b-0 @xs:lg:aspect-square @xs:lg:min-h-0"
            >
              <Bild fliese={f} />
            </span>
            <span className="flex min-w-0 flex-col gap-2 p-3 @xs:col-span-3 @xs:flex-row @xs:items-start @xs:justify-between @xs:gap-3 @xs:p-4 lg:p-8 @xs:lg:col-span-2">
              <span className="font-text text-fs-4 font-semibold text-pretty hyphens-none">{f.satz}</span>
              <Icon name="pfeil-rechts" groesse={5} className="shrink-0 self-end text-tinte-2 transition-colors dauer-1 group-hover:text-tinte @xs:mt-1 @xs:self-auto" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Lage({ inhalt, einleitung }: { inhalt: LageInhalt; einleitung?: string }) {
  const fliesen = inhalt.fliesen ?? [];
  return (
    <Abschnitt
      id="ihre-lage"
      formel="lage"
      leitachse
      titel={inhalt.titel}
      einleitung={einleitung ? <p><Textmarken text={einleitung} /></p> : undefined}
      className={fliesen.length > 1 ? 'lg:pb-32' : undefined}
    >
      {inhalt.absaetze && inhalt.absaetze.length > 0 && (
        <div className="max-w-mass space-y-4 font-text text-fs-4 text-pretty text-tinte">
          {inhalt.absaetze.map((a) => (
            <p key={a}>
              <Textmarken text={a} />
            </p>
          ))}
        </div>
      )}
      {fliesen.length > 0 && (
        <div className={clsx(inhalt.absaetze?.length && 'mt-12')}>
          <LageFliesen fliesen={fliesen} />
        </div>
      )}
    </Abschnitt>
  );
}
