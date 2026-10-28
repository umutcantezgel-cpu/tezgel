// Vorlagen · 3 Was wir tun (KERN v3 K-009, K-011, K-012; E-025; K-016 „Ruhe“, E-047): gebaut wie „Was wir tun“ der Startseite.
// Kopf mittig über dem Inhalt mit einem Satz (kein Theorietext neben den Zeichnungen, E-047); Bereiche oder Unterseiten als Zeilen an der Fuge mit einem Verlegemuster aus dem Formsystem statt eines
// Strichsymbols (unter 20 rem Zeilenbreite entfällt das Muster); Aussagen als Fliesen an der Fuge (bei großer Schrift das
// Fugenkreuz über dem Satz); oder Bereiche als Fliesen mit Plan-Vignette (Startseite, E-037); danach ein Absatz und der Platz
// für den großen Moment der Seite. Wahlweise eine erklärende Zeichnung mit Bildunterschrift nach dem Inhalt. Der Abschnitt zeichnet spät (unter dem ersten Bildschirm, E-044). Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Fliesenkomposition from '@/components/kern/Fliesenkomposition';
import { VIGNETTEN } from '@/components/kern/vignetten';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Textmarken from '@/components/kern/Textmarken';
import type { BereichFliese, TunInhalt } from '../inhalt';

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

export type Bereich = BereichFliese;

/** Bereiche als Fliesen mit Zeichnung (Startseite, Sichtabnahme E2, Befunde 8 und 12; E-037): an der Fuge, oben die Zeichnung,
 *  darunter der Name und der Pfeil. So ist der Abschnitt anders gebaut als die Zeilen der Lage davor.
 *  - Plan-Vignette (E-037, Linienzeichnung 1,5 px wie im alten Stand): schmal (Container unter 36rem, also am Handy) eine
 *    Zeile je Bereich, die Zeichnung als Feld von 32 Stufen links an der Fuge, Name und Pfeil rechts daneben (UM-E3-FIX F5:
 *    vorher je Bereich ein Streifen 2:1 über dem Namen, zusammen rund 1200 px Scrollweg direkt nach den sechs Lagen; jetzt
 *    gut ein Drittel davon, alle vier Bereiche bleiben mit Zeichnung). Ab 36rem zwei Spalten (16:9, ab 48rem 3:2),
 *    die Zeichnung oben; zweispaltig am Handy liefe die Schraffur zu Brei zusammen.
 *  - Verlegemuster (Fliesenkomposition deutlich): ab 20rem zwei Spalten, 16:9, ab lg 3:2.
 *  Schmal (große Systemschrift, unter 20rem) eine Spalte ohne Zeichnung; lange Namen dürfen dort trennen. */
export function Bereichsfliesen({ bereiche }: { bereiche: Bereich[] }) {
  const mitVignetten = bereiche.some((b) => b.vignette);
  return (
    <div className="@container">
      {/* einzelne Fliesen mit Luft dazwischen statt aneinandergesetzt (E-047: nicht gequetscht); ab 64rem vier nebeneinander */}
      <ul className={clsx('grid grid-cols-1 gap-6 lg:gap-8', mitVignetten ? '@xl:grid-cols-2 @5xl:grid-cols-4' : '@xs:grid-cols-2')}>
        {bereiche.map((b) => {
          const Vignette = b.vignette ? VIGNETTEN[b.vignette] : null;
          return (
          <li key={b.href} className="border border-fuge bg-fliese">
            <Link href={b.href} data-motion="zustand" className={clsx('group flex h-full text-tinte', Vignette ? '@xl:flex-col' : 'flex-col')}>
              {Vignette ? (
                // Die Fuge hängt an der äußeren Zelle über die ganze Höhe der Karte (in der Zeile gestreckt): Ist der Name zwei-
                // oder dreizeilig, stößt sie trotzdem an Ober- und Unterkante; das Feld 4 : 3 steht darin mittig.
                // min-h-0: sonst dehnt die höhere Zeichnung (Bad 1,3 : 1) das Feld über sein Seitenverhältnis hinaus
                <span aria-hidden="true" className="hidden w-32 shrink-0 items-center border-r border-fuge @xs:flex @xl:w-auto @xl:border-r-0 @xl:border-b">
                  <span className="flex aspect-4/3 min-h-0 w-full items-center justify-center overflow-hidden p-2 @xl:aspect-video @xl:p-4 @3xl:aspect-3/2 lg:p-6">
                    <Vignette fuellen />
                  </span>
                </span>
              ) : (
                b.motiv && (
                  <span aria-hidden="true" className="hidden aspect-video overflow-hidden border-b border-fuge @xs:block lg:aspect-3/2">
                    <Fliesenkomposition motiv={b.motiv} format="16:9" ausschnitt={96} fuellen deutlich />
                  </span>
                )
              )}
              <span className={clsx('flex min-w-0 flex-1 gap-3 p-4 lg:p-6', Vignette ? 'items-center @xl:items-start' : 'items-start')}>
                {/* gesetzt wie die Sätze der Lage-Fliesen (gleiche Ebene, ein Schnitt; E2-SICHT-2 Typografie) */}
                <span className="min-w-0 flex-1 font-text text-fs-4 font-semibold text-pretty hyphens-auto underline decoration-transparent decoration-2 underline-offset-4 transition-colors dauer-1 group-hover:decoration-laser">
                  {b.name}
                </span>
                <Icon name="pfeil-rechts" groesse={5} className={clsx('shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte', Vignette ? '@xl:mt-1' : 'mt-1')} />
              </span>
            </Link>
          </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Punktfliesen({ punkte }: { punkte: ReactNode[] }) {
  return (
    <div className="@container mx-auto max-w-mass">
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

/** Zeichnung unter dem Kopf mit Bildunterschrift (Startseite: der Schnitt am Wandanschluss erklärt die Abdichtung) */
function Zeichnung({ vignette, unterschrift }: NonNullable<TunInhalt['unterKopf']>) {
  const Vignette = VIGNETTEN[vignette];
  return (
    <figure className="max-w-mass text-tinte">
      <Vignette />
      <figcaption className="mt-4 font-text text-fs-2 text-tinte-2">
        <p>
          <Textmarken text={unterschrift} />
        </p>
      </figcaption>
    </figure>
  );
}

export default function Tun({ inhalt, moment }: { inhalt: TunInhalt; moment?: ReactNode }) {
  return (
    <Abschnitt
      id="was-wir-tun"
      formel="tun"
      leitachse
      spaet
      mitte
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
    >
      {inhalt.bereiche && inhalt.bereiche.length > 0 && <Bereichszeilen bereiche={inhalt.bereiche} />}
      {inhalt.bereichsfliesen && inhalt.bereichsfliesen.length > 0 && <Bereichsfliesen bereiche={inhalt.bereichsfliesen} />}
      {inhalt.punkte && inhalt.punkte.length > 0 && (
        <div className={inhalt.bereiche?.length ? 'mt-16' : undefined}>
          <Punktfliesen punkte={inhalt.punkte.map((p) => <Textmarken key={p} text={p} />)} />
        </div>
      )}
      {inhalt.absatz && (
        // Satzspiegel in der Grundschrift, damit der Absatz mit den Fliesen darüber fluchtet (max-w-mass misst in ch, E-065)
        <div className="mx-auto mt-8 max-w-mass">
          <p className="font-text text-fs-3 text-pretty text-tinte">
            <Textmarken text={inhalt.absatz} />
          </p>
        </div>
      )}
      {inhalt.unterKopf && (
        <div className="mt-16">
          <Zeichnung {...inhalt.unterKopf} />
        </div>
      )}
      {moment && <div className="mt-16">{moment}</div>}
    </Abschnitt>
  );
}
