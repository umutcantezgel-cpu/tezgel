// Vorlagen · 3 Was wir tun (KERN v3 K-009, K-011, K-012; E-025; K-016 „Ruhe“, E-047): gebaut wie „Was wir tun“ der Startseite.
// Kopf mittig über dem Inhalt mit einem Satz (kein Theorietext neben den Zeichnungen, E-047), wahlweise linksbündig an der
// Laserlinie (Startseite, UM-E3-FIX2 N9: vorher drei mittige Köpfe in Folge); Bereiche oder Unterseiten als Zeilen an der Fuge mit einem Verlegemuster aus dem Formsystem statt eines
// Strichsymbols (unter 20 rem Zeilenbreite entfällt das Muster); Aussagen als Fliesen an der Fuge (bei großer Schrift das
// Fugenkreuz über dem Satz); oder Bereiche als Plan-Fliesen im Drittelverband (Startseite, E-037, UM-E3-FIX2 N9); danach ein Absatz und der Platz
// für den großen Moment der Seite. Wahlweise eine erklärende Zeichnung mit Bildunterschrift nach dem Inhalt. Der Abschnitt zeichnet spät (unter dem ersten Bildschirm, E-044).
// Oder (Startseite, UM-E4-START, Sicht Anlauf 3: zwei Auswahllisten mit sich überschneidenden Zielen folgten aufeinander) nur
// eine ruhige Zeile mit den Leistungen als Links unter dem mittigen Kopf; ihre Zeichnungen stehen in den Zeilen der Lage.
// Lange Namen trennen nur an ihrer Fuge (mitFugen, FS-K Nr. 2), ebenso die Sätze der Punkte (Textmarken mit fugen, FS-K
// Nr. 6).
// Folge im Abschnitt (UM-E4-SICHT-FIX M-B7): Mit `momentZuerst` steht der große Moment direkt nach Kopf und Satz, Bereiche,
// Punkte, Absatz und Zeichnung danach (nur Seiten aus K-009). Fachtext (`absatzMehr`, M-B4) steht am Ende im Aufklapper „Mehr
// erfahren“ statt mitten in der Erzählung. Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Fliesenkomposition from '@/components/kern/Fliesenkomposition';
import { VIGNETTEN } from '@/components/kern/vignetten';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Textmarken from '@/components/kern/Textmarken';
import { linkKlassen } from '@/components/kern/stile';
import { mitFugen } from '@/components/kern/zusammen';
import type { BereichFliese, TunInhalt, Verweis, Zeile } from '../inhalt';
import Aufklapper from './Aufklapper';

function ZeilenVignette({ name }: { name: NonNullable<Zeile['vignette']> }) {
  const Vignette = VIGNETTEN[name];
  return <Vignette fuellen />;
}

export function Bereichszeilen({ bereiche }: { bereiche: NonNullable<TunInhalt['bereiche']> }) {
  return (
    <ul className="@container border-t border-fuge">
      {bereiche.map((b) => (
        <li key={b.href} className="border-b border-fuge">
          <Link href={b.href} data-motion="zustand" className="group flex min-h-16 items-center gap-4 py-4 text-tinte lg:gap-6 lg:py-6">
            {b.vignette ? (
              // Plan-Vignette im Feld 4 : 3 wie in der Lage (M-C6 Nr. 3), unter 20rem Zeilenbreite ohne Zeichnung
              <span aria-hidden="true" className="hidden w-24 shrink-0 @xs:block lg:w-32">
                <span className="flex aspect-4/3 items-center justify-center border border-fuge bg-kalk p-2 text-tinte">
                  <ZeilenVignette name={b.vignette} />
                </span>
              </span>
            ) : (
              b.motiv && (
                <span aria-hidden="true" className="hidden size-16 shrink-0 border border-fuge @xs:block">
                  <Fliesenkomposition motiv={b.motiv} ausschnitt={48} fuellen />
                </span>
              )
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

/** Zeichnung eines Bereichs im eigenen Feld: Plan-Vignette (Linienzeichnung 1,5 px wie im alten Stand, E-037) oder
 *  Verlegemuster, ganz und mittig (fuellen) */
function BereichZeichnung({ b }: { b: Bereich }) {
  const Vignette = b.vignette ? VIGNETTEN[b.vignette] : null;
  if (Vignette) return <Vignette fuellen />;
  return b.motiv ? <Fliesenkomposition motiv={b.motiv} ausschnitt={48} fuellen /> : null;
}

/** Bereiche als Plan-Fliesen (Startseite, E-037; UM-E3-FIX2 N9 und N10): ein ungleiches Raster im Drittelverband statt vier
 *  gleicher Karten (K-003). Jede Fliese steht an der Fuge, die Zeichnung an der Fuge daneben bzw. darüber, dann Name und Pfeil.
 *  - Querkarte (Container unter 36rem, Handy): je Bereich eine Zeile, die Zeichnung als Feld von 32 Stufen links, Name und
 *    Pfeil rechts (UM-E3-FIX F5).
 *  - 36 bis 64rem (Tablet hochkant und quer, t768 bis t1024, q844): dieselben Querkarten in zwei Spalten. Vorher 2 × 2 mit
 *    rund 300 px hohen Zeichnungen; der Block füllte anderthalb Bildschirme, auf q844 war eine Karte höher als der Bildschirm
 *    (Sichtabnahme E3 Anlauf 2).
 *  - ab 64rem (d1280 bis d2560): drei Spalten. Der erste Bereich (Bad, der Kern des Betriebs) steht als große Fliese über
 *    zwei Drittel und drei Reihen mit großer Zeichnung, die übrigen drei als Querkarten (Zeichnung zwei Fünftel breit) im letzten
 *    Drittel, drei gleich hohe Reihen (die höchste Querkarte gibt das Maß): Ihre Fugen teilen die große Fliese genau in
 *    Drittel. Die Zeichnung der großen Fliese steht absolut in ihrem Feld und hat keine eigene Höhe: Die Reihen bemessen sich
 *    nach den Querkarten.
 *  Nachrangig nach den Lagen davor (N10): Die Namen stehen eine Stufe unter den Sätzen der Lage, nur der große Bereich ab
 *  64rem in derselben Stufe. Unter 20rem (große Systemschrift) ohne Zeichnung; lange Namen dürfen dort trennen. */
function Planfliesen({ bereiche }: { bereiche: Bereich[] }) {
  return (
    <div className="@container">
      <ul className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @xl:gap-6 @5xl:grid-cols-3 @5xl:grid-rows-3 @5xl:gap-8">
        {bereiche.map((b, i) => {
          const gross = i === 0;
          return (
            <li key={b.href} className={clsx('border border-fuge bg-fliese', gross && '@5xl:col-span-2 @5xl:row-span-3')}>
              <Link href={b.href} data-motion="zustand" className={clsx('group flex h-full text-tinte', gross && '@5xl:flex-col')}>
                {/* Die Fuge hängt an der äußeren Zelle über die ganze Höhe der Karte: Ist der Name zwei- oder dreizeilig, stößt sie
                    trotzdem an Ober- und Unterkante; das Feld 4 : 3 steht darin mittig */}
                <span
                  aria-hidden="true"
                  className={clsx(
                    'hidden w-32 shrink-0 items-center border-r border-fuge @xs:flex',
                    gross ? '@5xl:relative @5xl:min-h-32 @5xl:w-auto @5xl:flex-1 @5xl:border-r-0 @5xl:border-b' : '@5xl:w-2/5',
                  )}
                >
                  <span className={clsx('flex aspect-4/3 w-full items-center justify-center overflow-hidden p-2', gross && '@5xl:absolute @5xl:inset-0 @5xl:aspect-auto @5xl:p-8')}>
                    <BereichZeichnung b={b} />
                  </span>
                </span>
                <span className={clsx('flex min-w-0 flex-1 items-center gap-3 p-4', gross && '@5xl:flex-none @5xl:p-6')}>
                  <span
                    className={clsx(
                      'min-w-0 flex-1 font-text text-fs-3 font-semibold text-pretty hyphens-auto underline decoration-transparent decoration-2 underline-offset-4 transition-colors dauer-1 group-hover:decoration-laser',
                      gross && '@5xl:text-fs-4',
                    )}
                  >
                    {mitFugen(b.name)}
                  </span>
                  <Icon name="pfeil-rechts" groesse={5} className="shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Bereiche als Fliesen mit Zeichnung (Startseite, Sichtabnahme E2, Befunde 8 und 12; E-037): mit Plan-Vignetten als Plan-Fliesen
 *  im Drittelverband (oben). Nur mit Verlegemustern (Fliesenkomposition deutlich): ab 20rem zwei Spalten, die Zeichnung 16:9
 *  über dem Namen, ab lg 3:2; schmal (große Systemschrift, unter 20rem) eine Spalte ohne Zeichnung. */
export function Bereichsfliesen({ bereiche }: { bereiche: Bereich[] }) {
  if (bereiche.some((b) => b.vignette)) return <Planfliesen bereiche={bereiche} />;
  return (
    <div className="@container">
      {/* einzelne Fliesen mit Luft dazwischen statt aneinandergesetzt (E-047: nicht gequetscht) */}
      <ul className="grid grid-cols-1 gap-6 @xs:grid-cols-2 lg:gap-8">
        {bereiche.map((b) => (
          <li key={b.href} className="border border-fuge bg-fliese">
            <Link href={b.href} data-motion="zustand" className="group flex h-full flex-col text-tinte">
              {b.motiv && (
                <span aria-hidden="true" className="hidden aspect-video overflow-hidden border-b border-fuge @xs:block lg:aspect-3/2">
                  <Fliesenkomposition motiv={b.motiv} format="16:9" ausschnitt={96} fuellen deutlich />
                </span>
              )}
              <span className="flex min-w-0 flex-1 items-start gap-3 p-4 lg:p-6">
                {/* gesetzt wie die Sätze der Lage-Fliesen (gleiche Ebene, ein Schnitt; E2-SICHT-2 Typografie) */}
                <span className="min-w-0 flex-1 font-text text-fs-4 font-semibold text-pretty hyphens-auto underline decoration-transparent decoration-2 underline-offset-4 transition-colors dauer-1 group-hover:decoration-laser">
                  {mitFugen(b.name)}
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

/** Leistungen als ruhige Zeilen (Startseite, UM-E4-START): Links mittig unter dem Kopf, mobil untereinander, ab md zwei mal
 *  zwei in zwei gleich breiten Spalten, jeder Link mittig in seiner Zelle (Nacharbeit, Prüfung A: als umbrechende Zeile stand
 *  auf t1024 bis d1920 „Reparatur von Fliesen und Fugen“ allein in der zweiten Zeile); jede Trefffläche mindestens 44 px
 *  hoch. Lange Namen trennen nur an ihrer Fuge (FS-K Nr. 2). Ohne Karten und ohne Zeichnungen: Die Zeichnungen stehen in den
 *  Zeilen der Lage darüber. */
function Leistungszeile({ leistungen }: { leistungen: Verweis[] }) {
  return (
    <ul className="mx-auto grid w-fit max-w-full grid-cols-1 justify-items-center gap-x-12 text-center md:grid-cols-2">
      {leistungen.map((l) => (
        <li key={l.href}>
          <Link href={l.href} data-motion="zustand" className={clsx(linkKlassen, 'inline-block min-h-11 py-2 font-text text-fs-3 font-semibold text-balance')}>
            {mitFugen(l.name)}
          </Link>
        </li>
      ))}
    </ul>
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
  const zuerst = Boolean(inhalt.momentZuerst && moment);
  const hatFolge = Boolean(inhalt.bereiche?.length || inhalt.bereichsfliesen?.length || inhalt.leistungen?.length || inhalt.punkte?.length || inhalt.absatz || inhalt.unterKopf);
  const folge = (
    <>
      {inhalt.bereiche && inhalt.bereiche.length > 0 && <Bereichszeilen bereiche={inhalt.bereiche} />}
      {inhalt.bereichsfliesen && inhalt.bereichsfliesen.length > 0 && <Bereichsfliesen bereiche={inhalt.bereichsfliesen} />}
      {inhalt.leistungen && inhalt.leistungen.length > 0 && <Leistungszeile leistungen={inhalt.leistungen} />}
      {inhalt.punkte && inhalt.punkte.length > 0 && (
        <div className={inhalt.bereiche?.length ? 'mt-16' : undefined}>
          <Punktfliesen punkte={inhalt.punkte.map((p) => <Textmarken key={p} text={p} fugen />)} />
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
    </>
  );
  return (
    <Abschnitt
      id="was-wir-tun"
      formel="tun"
      leitachse
      spaet
      mitte={!inhalt.anDerLinie}
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
      // ruhige Leistungszeilen (Startseite): ab lg eine Stufe 16 statt 24 über und unter dem Band, es trägt wenig Inhalt
      // (Nacharbeit UM-E4-START, Prüfung A: rund 300 px für Kopf, Satz und vier Links)
      className={inhalt.leistungen?.length ? 'lg:pt-16 lg:pb-16' : undefined}
    >
      {zuerst ? (
        <>
          <div>{moment}</div>
          {hatFolge && <div className="mt-16">{folge}</div>}
        </>
      ) : (
        <>
          {folge}
          {moment && <div className="mt-16">{moment}</div>}
        </>
      )}
      {inhalt.absatzMehr && (
        <Aufklapper zeile="Mehr erfahren" className="mx-auto mt-8 max-w-mass border-y border-fuge">
          <p className="pb-6 font-text text-fs-3 text-pretty text-tinte">
            <Textmarken text={inhalt.absatzMehr} />
          </p>
        </Aufklapper>
      )}
    </Abschnitt>
  );
}
