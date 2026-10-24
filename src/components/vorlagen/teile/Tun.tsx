// Vorlagen · 3 Was wir tun (KERN v3 K-009, K-011, K-012; E-025): gebaut wie „Was wir tun“ der Startseite. Kopf seitlich
// mit Einleitung; Bereiche oder Unterseiten als Zeilen an der Fuge mit einem Verlegemuster aus dem Formsystem statt eines
// Strichsymbols (unter 20 rem Zeilenbreite entfällt das Muster); Aussagen als Fliesen an der Fuge (bei großer Schrift das
// Fugenkreuz über dem Satz); danach ein Absatz und der Platz für den großen Moment der Seite. Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Fliesenkomposition, { type Kompositionsmotiv } from '@/components/kern/Fliesenkomposition';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Textmarken from '@/components/kern/Textmarken';
import type { TunInhalt } from '../inhalt';

export function Bereichszeilen({ bereiche }: { bereiche: NonNullable<TunInhalt['bereiche']> }) {
  return (
    <ul className="@container border-t border-fuge">
      {bereiche.map((b) => (
        <li key={b.href} className="border-b border-fuge">
          <Link href={b.href} data-motion="zustand" className="group flex min-h-16 items-center gap-4 py-4 text-tinte lg:gap-6 lg:py-6">
            {b.motiv && (
              <span aria-hidden="true" className="hidden size-16 shrink-0 border border-fuge @xs:block">
                <Fliesenkomposition motiv={b.motiv} ausschnitt={48} fuellen />
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block font-anzeige text-fs-5 font-extrabold hyphens-none underline decoration-transparent decoration-2 underline-offset-8 transition-colors dauer-1 group-hover:decoration-laser">
                {b.name}
              </span>
              {b.satz && (
                <span className="mt-2 block font-text text-fs-3 text-tinte-2">
                  <Textmarken text={b.satz} />
                </span>
              )}
            </span>
            <Icon name="pfeil-rechts" groesse={6} className="shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Bereiche als Fliesen mit Zeichnung (Startseite, Sichtabnahme E2, Befunde 8 und 12): zwei Spalten an der Fuge, oben ein
 *  Verlegemuster im Format 16:9 mit Fugen in Strich und roter Laserlinie, darunter der Name und der Pfeil. So ist der Abschnitt
 *  anders gebaut als die Zeilen der Lage davor. Schmal (große Systemschrift, unter 20 rem) eine Spalte ohne Zeichnung; lange
 *  Namen dürfen dort trennen (sonst ragte „Badsanierung“ bei 200 % über den Rand). */
export function Bereichsfliesen({ bereiche }: { bereiche: { name: string; href: string; motiv: Kompositionsmotiv }[] }) {
  return (
    <div className="@container">
      <ul className="grid grid-cols-1 gap-px border border-fuge bg-fuge @xs:grid-cols-2">
        {bereiche.map((b) => (
          <li key={b.href} className="bg-fliese">
            <Link href={b.href} data-motion="zustand" className="group flex h-full flex-col text-tinte">
              <span aria-hidden="true" className="hidden aspect-video overflow-hidden border-b border-fuge @xs:block">
                <Fliesenkomposition motiv={b.motiv} format="16:9" ausschnitt={96} fuellen deutlich />
              </span>
              <span className="flex flex-1 items-start gap-3 p-4 lg:p-6">
                <span className="min-w-0 flex-1 font-text text-fs-3 font-semibold hyphens-auto underline decoration-transparent decoration-2 underline-offset-4 transition-colors dauer-1 group-hover:decoration-laser lg:font-anzeige lg:text-fs-4 lg:font-extrabold">
                  {b.name}
                </span>
                <Icon name="pfeil-rechts" groesse={5} className="mt-1 shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Punktfliesen({ punkte }: { punkte: ReactNode[] }) {
  return (
    <div className="@container">
      <ul className="grid gap-px border border-fuge bg-fuge">
        {punkte.map((p, i) => (
          <li key={i} className="flex flex-col gap-2 bg-fliese p-3 @xs:flex-row @xs:gap-3 @xs:p-6">
            <Fugenkreuz className="size-3 shrink-0 text-tinte @xs:mt-2" />
            <p className="font-text text-fs-3 text-tinte">{p}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Tun({ inhalt, moment }: { inhalt: TunInhalt; moment?: ReactNode }) {
  return (
    <Abschnitt
      id="was-wir-tun"
      formel="tun"
      leitachse
      kopf="seitlich"
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
    >
      {inhalt.bereiche && inhalt.bereiche.length > 0 && <Bereichszeilen bereiche={inhalt.bereiche} />}
      {inhalt.punkte && inhalt.punkte.length > 0 && (
        <div className={inhalt.bereiche?.length ? 'mt-16' : undefined}>
          <Punktfliesen punkte={inhalt.punkte.map((p) => <Textmarken key={p} text={p} />)} />
        </div>
      )}
      {inhalt.absatz && (
        <p className="mt-8 max-w-mass font-text text-fs-3 text-pretty text-tinte">
          <Textmarken text={inhalt.absatz} />
        </p>
      )}
      {moment && <div className="mt-16">{moment}</div>}
    </Abschnitt>
  );
}
