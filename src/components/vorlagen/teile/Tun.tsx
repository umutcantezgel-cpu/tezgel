// Vorlagen · 3 Was wir tun (KERN v3 K-009, K-011, K-012; E-025; K-016 „Ruhe“, E-047): gebaut wie „Was wir tun“ der Startseite.
// Kopf mittig über dem Inhalt mit einem Satz (kein Theorietext neben den Zeichnungen, E-047), wahlweise linksbündig an der
// Laserlinie (Startseite, UM-E3-FIX2 N9: vorher drei mittige Köpfe in Folge); Bereiche oder Unterseiten als Zeilen an der Fuge mit einem Verlegemuster aus dem Formsystem statt eines
// Strichsymbols (unter 20 rem Zeilenbreite entfällt das Muster); Aussagen als nummerierte Liste an der Fuge (M-B2, unten);
// oder Bereiche als Plan-Fliesen im Drittelverband (Startseite, E-037, UM-E3-FIX2 N9); danach ein Absatz und der Platz
// für den großen Moment der Seite. Wahlweise eine erklärende Zeichnung mit Bildunterschrift direkt unter Kopf und Satz, vor
// Zeilen und Punkten (`unterKopf`, M-C9). Der Abschnitt zeichnet spät (unter dem ersten Bildschirm, E-044).
// Oder (Startseite, UM-E4-START, Sicht Anlauf 3: zwei Auswahllisten mit sich überschneidenden Zielen folgten aufeinander) nur
// die Leistungen unter dem mittigen Kopf, seit UM-E4-SICHT-FIX M-B8 als verlegte Reihe aus vier Fliesen (unten); ihre
// Zeichnungen stehen in den Zeilen der Lage.
// Lange Namen trennen nur an ihrer Fuge (mitFugen, FS-K Nr. 2), ebenso die Sätze der Punkte (Textmarken mit fugen, FS-K
// Nr. 6).
// Folge im Abschnitt (UM-E4-SICHT-FIX M-B7): Mit `momentZuerst` steht der große Moment direkt nach Kopf und Satz, Bereiche,
// Punkte und Absatz danach (nur Seiten aus K-009). Fachtext (`absatzMehr`, M-B4) steht am Ende im Aufklapper „Mehr
// erfahren“ statt mitten in der Erzählung; mit `punkteMehr` (UM-E4-SICHT-FIX-2 M2-A6) wandern auch die Punkte dorthin, vor den
// Fachtext: genau ein Aufklapper je Abschnitt, der Absatz bleibt offen.
// Listen an der Fuge (UM-E4-SICHT-FIX M-B2): Aussagen stehen als Liste an der Fuge, getrennt durch 1-px-Fugen, ohne Außenrahmen
// und ohne Kasten je Punkt (vorher Plus-Kästen, die wie ein Akkordeon aussahen, Sicht Anlauf 1: das Fugenkreuz bleibt
// Abschnittskanten und echten Aufklappern vorbehalten). Seit UM-E4-SICHT-FIX-2 M2-A7 ohne Mono-Nummern (Sicht Anlauf 2,
// übergreifend 2b Nr. 3: Punkte 01 bis 04 direkt vor der Treppe 01 bis 03, zwei Nummernfolgen in Folge): Die Nummern gehören der
// Ablauf-Treppe, das ol bleibt für Vorleser. Bereichszeilen nennen ihren Namen
// im Textschnitt (fs-4 halbfett) statt in der Anzeigeschrift: Sie sind Wege, keine Überschriften.
// Satzspiegel v2 (UM-E4-SICHT-FIX-2 M2-A1, K-003 „Fläche“; vorher rechts in den Spalten 2 bis 3, M-B1): Punkte, Absatz und
// Aufklapper stehen im Block auf der Kopfachse (`achse`, zwei Drittel ab lg), die lange Einleitung im selben Block darüber; alle
// an der linken Kante des Blocks im Lesemaß der Stufe fs-3, Fugen und Text enden an einer Kante (`satzBlock`, Nacharbeit SF2-A1).
// Punkte sind mehrsätzige Absätze und bleiben einspaltig (in zwei Spalten ohne Nummern wäre die Lesefolge unklar). Bereiche
// (Wegzeilen) ab drei Einträgen stehen voll breit in Spalten (`satzSpalten`: ab vier zwei, bei drei drei), weniger im Block. Die
// Zeichnung unter Kopf und Satz steht breit und mittig (höchstens max-w-5xl), ihre Unterschrift darunter im Lesemaß, ab lg
// mittig; ein großer Moment steht breit. So wechselt die Breite im Abschnitt, alle Blöcke stehen auf der Kopfachse. `satz` im
// Inhalt wählt ausdrücklich einen anderen Satz für die Blöcke (Standard `achse`). Folgt der Aufklapper „Mehr erfahren“ direkt auf die
// Punkte, ist die letzte Fuge der Liste seine obere Kante (vorher zwei Linien 33 px übereinander). Die Leistungsreihe der
// Startseite setzt ihren Versatz selbst (M-B8), der Abschnitt bleibt mittig. Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import clsx from 'clsx';
import Abschnitt, { Satzblock, satzBlock, satzMass, satzSpalten, type Satz } from '@/components/kern/Abschnitt';
import { langeEinleitung } from '@/components/kern/einleitung';
import Fliesenkomposition from '@/components/kern/Fliesenkomposition';
import { VIGNETTEN } from '@/components/kern/vignetten';
import Textmarken from '@/components/kern/Textmarken';
import { mitFugen } from '@/components/kern/zusammen';
import type { BereichFliese, TunInhalt, Verweis, Zeile } from '../inhalt';
import Aufklapper from './Aufklapper';

function ZeilenVignette({ name }: { name: NonNullable<Zeile['vignette']> }) {
  const Vignette = VIGNETTEN[name];
  return <Vignette fuellen />;
}

/** Zeilen mit Link an der Fuge: Name im Textschnitt (fs-4 halbfett, M-B2 Nr. 2), Satz und Pfeil; vorn wahlweise eine
 *  Plan-Vignette (`vignette`, Feld 4 : 3) oder ein Verlegemuster (`motiv`), unter 20 rem Zeilenbreite ohne Zeichnung.
 *  `spalten` (Satzspiegel v2, M2-A1): voll breit, ab lg in Spalten nach `satzSpalten` (Liste mit Fuge oben, jede Zeile mit
 *  eigener Fuge unten); die Zeichnung misst sich dann an der eigenen Zeile (unter 20 rem Spaltenbreite entfällt sie, gewollt).
 *  Ab lg füllt der Link seine Zelle und steht oben darin, der Pfeil auf der Höhe des Namens: Die Zellen einer Reihe sind gleich
 *  hoch, ihre Texte verschieden lang (Nacharbeit SF2-A1; vorher stand jeder Pfeil auf der Mitte seines eigenen Textes, in einer
 *  Reihe bis zu 15 px versetzt; wie das Fugenfeld der Wissensseiten) */
export function Bereichszeilen({ bereiche, className, spalten = false }: { bereiche: NonNullable<TunInhalt['bereiche']>; className?: string; spalten?: boolean }) {
  const raster = spalten ? satzSpalten(bereiche.length) : undefined;
  const liste = (
    <ul className={clsx(raster ? raster.liste : '@container', 'border-t border-fuge', !raster && className)}>
      {bereiche.map((b, i) => (
        <li key={b.href} className={clsx('border-b border-fuge', raster && '@container', raster && i === bereiche.length - 1 && raster.letzte)}>
          <Link href={b.href} data-motion="zustand" className={clsx('group flex min-h-16 items-center gap-4 py-4 text-tinte lg:gap-6 lg:py-6', raster && 'h-full lg:items-start')}>
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
              <span className="block font-text text-fs-4 font-semibold text-pretty hyphens-none underline decoration-transparent decoration-2 underline-offset-8 transition-colors dauer-1 group-hover:decoration-laser">
                {b.name}
              </span>
              {b.satz && (
                <span className="mt-2 block font-text text-fs-3 text-tinte-2">
                  <Textmarken text={b.satz} />
                </span>
              )}
            </span>
            <Icon name="pfeil-rechts" groesse={6} className={clsx('shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte', raster && 'lg:mt-1')} />
          </Link>
        </li>
      ))}
    </ul>
  );
  // die Spalten fragen die volle Breite der Hülle ab
  return raster ? <div className={clsx('@container', className)}>{liste}</div> : liste;
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

/** Aussagen als Liste an der Fuge (UM-E4-SICHT-FIX M-B2): je Punkt eine Fugenzeile, 1-px-Fugen zwischen den Punkten, ohne Rahmen
 *  und ohne Kasten, ohne Nummer (M2-A7: die Nummern gehören der Ablauf-Treppe; für Vorleser zählt das ol weiter). Kein
 *  Fugenkreuz je Zeile (M-B2). Glossar-Erklärungen bleiben im Satz (Textmarken). `className` setzt Breite und Lage im Satz (z. B.
 *  `satzBlock`): Die Fugen laufen über die ganze Breite der Liste, der Satz steht im Lesemaß der Schrift der Liste (max-w-mass
 *  misst in ch der eigenen Schrift, E-065; Grundschrift, auf der Achse ab lg fs-3 über `satzBlock('achse')`, dann füllt der Satz
 *  die Liste), so endet der Satz an derselben rechten Kante wie ein Absatz darunter (Prüfung SF-B2, Nacharbeit SF2-A1).
 *  `schluss={false}`: ohne Fuge unter dem letzten Punkt, wenn die Liste am Ende eines Aufklappers steht, dessen untere Kante die
 *  Fuge trägt (M2-A6). */
export function Punktliste({ punkte, className, schluss = true }: { punkte: ReactNode[]; className?: string; schluss?: boolean }) {
  return (
    <ol className={clsx('@container', className)}>
      {punkte.map((p, i) => (
        <li key={i} className={clsx('border-t border-fuge py-4 @xs:py-6', schluss && 'last:border-b')}>
          <p className="max-w-mass font-text text-fs-3 text-tinte">{p}</p>
        </li>
      ))}
    </ol>
  );
}

/** Leistungen als verlegte Reihe (Startseite, UM-E4-SICHT-FIX M-B8; Sicht Anlauf 1: als ruhige Zeile mit vier Textlinks war der
 *  Abschnitt der dünnste und generischste der Seite): vier gleich hohe Fliesen an 1-px-Fugen, je Fliese Linktext und Pfeil im
 *  Feld, die ganze Fliese ist die Trefffläche. Ohne Zeichnungen: Die stehen in den Zeilen der Lage darüber (UM-E4-START, eine
 *  Auswahlebene). Ab lg steht die Reihe um ein Drittel versetzt in den Spalten 2 bis 3 (der Versatz dieses Bildschirms, wie die
 *  Stimme auf /); die Spalten der Reihe messen sich an ihrer eigenen Breite: ab 42 rem vier nebeneinander (d1280 bis d2560, t768),
 *  darunter zwei mal zwei gleich hohe (t1024: bei vier Spalten von je rund 155 px brach „Reparatur von Fliesen und Fugen“ in
 *  vier Zeilen, Prüfung SF-C3), unter 20 rem (große Systemschrift) untereinander. Lange Namen trennen nur an ihrer Fuge (FS-K
 *  Nr. 2). */
function Leistungsreihe({ leistungen }: { leistungen: Verweis[] }) {
  return (
    <Satzblock satz="rechts">
      <div className="@container">
        <ul className="grid auto-rows-fr grid-cols-1 gap-px border border-fuge bg-fuge @xs:grid-cols-2 @2xl:grid-cols-4">
          {leistungen.map((l) => (
            <li key={l.href} className="bg-fliese">
              <Link href={l.href} data-motion="zustand" className="group flex h-full flex-col justify-between gap-6 p-4 text-tinte @3xl:p-6">
                <span className="font-text text-fs-3 font-semibold text-pretty underline decoration-transparent decoration-2 underline-offset-4 transition-colors dauer-1 group-hover:decoration-laser">
                  {mitFugen(l.name)}
                </span>
                <Icon name="pfeil-rechts" groesse={5} className="self-end text-tinte-2 transition-colors dauer-1 group-hover:text-tinte" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Satzblock>
  );
}

/** Zeichnung unter Kopf und Satz mit Bildunterschrift (UM-E4-SICHT-FIX M-C9, /bad/badsanierung „Wanne raus, Dusche ohne
 *  Stufe“; Sicht Anlauf 1: der Abschnitt erzählte das Kernthema der Seite nur mit Textkästen): der Erklärmoment des Abschnitts
 *  vor der Liste, im Feld auf Fliese wie die großen Momente (gefaelle-dusche). Satzspiegel v2 (M2-A1 Nr. 3): breit und mittig,
 *  höchstens max-w-5xl (d1440 rund 1024 px statt 811 px im Block rechts), die Unterschrift darunter im Lesemaß, ab lg mittig
 *  (unter lg linksbündig wie die Einleitung und die Punkte darüber und darunter, Nacharbeit SF2-A1); neben ihr
 *  tritt die Abschnittsmarke zurück (data-kopf-pause="ganz": nie neben mittigem Text; höchstens eine Pause „ganz“ je Abschnitt,
 *  kein großer Moment in „Was wir tun“ trägt mit dieser Zeichnung zusammen eine eigene). Die Zeichnung ist dekorativ, die
 *  Unterschrift sagt, was sie zeigt. */
function Zeichnung({ vignette, unterschrift }: NonNullable<TunInhalt['unterKopf']>) {
  const Vignette = VIGNETTEN[vignette];
  return (
    <figure className="mx-auto max-w-5xl text-tinte">
      <div className="border border-fuge bg-fliese p-4 lg:p-6">
        <Vignette />
      </div>
      <figcaption data-kopf-pause="ganz" className="mx-auto mt-4 max-w-mass lg:text-center">
        <p className="font-text text-fs-3 text-pretty text-tinte-2">
          <Textmarken text={unterschrift} />
        </p>
      </figcaption>
    </figure>
  );
}

export default function Tun({ inhalt, moment }: { inhalt: TunInhalt; moment?: ReactNode }) {
  const zuerst = Boolean(inhalt.momentZuerst && moment);
  const bereiche = inhalt.bereiche ?? [];
  const punkte = inhalt.punkte ?? [];
  // Punkte im Aufklapper (M2-A6): nur die Punkte wandern, sie teilen den einen Aufklapper „Mehr erfahren“ mit dem Fachtext
  const punkteZu = Boolean(inhalt.punkteMehr) && punkte.length > 0;
  const punkteOffen = punkte.length > 0 && !punkteZu;
  const hatFolge = Boolean(bereiche.length || inhalt.bereichsfliesen?.length || inhalt.leistungen?.length || punkteOffen || inhalt.absatz || inhalt.unterKopf);
  // Satz der Blöcke (Satzspiegel v2, M2-A1): Standard `achse`; mit der Leistungsreihe der Startseite bleibt der Abschnitt mittig
  // (die Reihe setzt ihren Versatz selbst, M-B8; `/` unverändert). Der Abschnitt selbst steht breit, jeder Block trägt seinen
  // Satz: Zeichnung und großer Moment breit, Bereiche ab drei voll breit in Spalten, Punkte, Absatz und Aufklapper im Satz.
  const nurLeistungen = Boolean(inhalt.leistungen?.length) && !bereiche.length && !inhalt.bereichsfliesen?.length && !punkte.length && !inhalt.absatz;
  const satz: Satz = nurLeistungen ? 'mitte' : (inhalt.satz ?? 'achse');
  const achse = satz === 'achse';
  // Block im Satz: `achse`, `links`, `rechts` mit eigener Hülle (Container-Abfrage auf der vollen Breite), `mitte` ohne
  const imSatz = (teil: ReactNode, className?: string) => <Satzblock satz={satz} className={className}>{teil}</Satzblock>;
  const bereicheVoll = achse && bereiche.length >= 3;
  // Aufklapper direkt nach den offenen Punkten (kein Absatz, kein Moment dazwischen): Die letzte Fuge der Liste ist seine obere Kante
  const nachListe = punkteOffen && !inhalt.absatz && !(moment && !zuerst);
  const vorPunkten = Boolean(bereiche.length || inhalt.unterKopf);
  // Abstand des Absatzes: nach den offenen Punkten 8, nach Bereichen oder Zeichnung 16 (EV-9), nach Bereichsfliesen oder der
  // Leistungsreihe wie bisher 8; als erstes Element ohne
  const vorAbsatz = punkteOffen ? 'mt-8' : vorPunkten ? 'mt-16' : inhalt.bereichsfliesen?.length || inhalt.leistungen?.length ? 'mt-8' : undefined;
  const folge = (
    <>
      {inhalt.unterKopf && <Zeichnung {...inhalt.unterKopf} />}
      {bereiche.length > 0 &&
        (bereicheVoll ? (
          <Bereichszeilen bereiche={bereiche} spalten className={clsx(inhalt.unterKopf && 'mt-16')} />
        ) : (
          imSatz(<Bereichszeilen bereiche={bereiche} className={satzBlock(satz)} />, clsx(inhalt.unterKopf && 'mt-16'))
        ))}
      {inhalt.bereichsfliesen && inhalt.bereichsfliesen.length > 0 && <Bereichsfliesen bereiche={inhalt.bereichsfliesen} />}
      {inhalt.leistungen && inhalt.leistungen.length > 0 && <Leistungsreihe leistungen={inhalt.leistungen} />}
      {punkteOffen && imSatz(<Punktliste punkte={punkte.map((p) => <Textmarken key={p} text={p} fugen />)} className={satzBlock(satz)} />, clsx(vorPunkten && 'mt-16'))}
      {inhalt.absatz &&
        imSatz(
          // Satzspiegel in der Grundschrift, damit der Absatz mit der Liste darüber fluchtet (max-w-mass misst in ch, E-065); auf
          // der Achse trägt der Absatz das Lesemaß selbst (der Block ist die Breite)
          <div className={satzMass(satz)}>
            <p className={clsx('font-text text-fs-3 text-pretty text-tinte', achse && 'max-w-mass')}>
              <Textmarken text={inhalt.absatz} />
            </p>
          </div>,
          vorAbsatz,
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
      // weit (M2-A9): mit großem Moment oder erklärender Zeichnung trägt der Abschnitt Ruhe um sich
      dichte={moment || inhalt.unterKopf ? 'weit' : undefined}
      satz={nurLeistungen ? 'mitte' : 'breit'}
      // die lange Einleitung steht im Satz der Blöcke über dem Inhalt (auf der Achse im Block, M2-A1; M-C9)
      einleitungSatz={nurLeistungen ? undefined : satz}
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
      einleitungLang={langeEinleitung(inhalt.einleitung)}
      // Leistungsreihe (Startseite): ab lg eine Stufe 16 statt 24 über und unter dem Band, es trägt wenig Inhalt (Nacharbeit
      // UM-E4-START, Prüfung A; Innenabstand Stufe 16 auf allen Breiten, M-B8)
      className={inhalt.leistungen?.length ? 'lg:pt-16 lg:pb-16' : undefined}
    >
      {zuerst ? (
        <>
          <div>{moment}</div>
          {hatFolge && <div className="mt-16">{folge}</div>}
        </>
      ) : (
        <>
          {hatFolge && (nurLeistungen ? folge : <div>{folge}</div>)}
          {/* wie bisher auch ohne Folge eine Stufe 16 über dem Moment (z. B. /leistungen: nur Einleitung und Moment) */}
          {moment && <div className="mt-16">{moment}</div>}
        </>
      )}
      {(punkteZu || inhalt.absatzMehr) &&
        imSatz(
          <Aufklapper zeile="Mehr erfahren" className={clsx(satzBlock(satz), nachListe ? 'border-b border-fuge' : 'border-y border-fuge')}>
            {/* Punkte (M2-A6): die Fuge unter dem letzten Punkt trägt sonst die untere Kante des Aufklappers */}
            {punkteZu && <Punktliste punkte={punkte.map((p) => <Textmarken key={p} text={p} fugen />)} schluss={Boolean(inhalt.absatzMehr)} />}
            {inhalt.absatzMehr && (
              // Lesemaß in der Grundschrift (E-065), wie der Absatz und die Liste darüber
              <div className={clsx('max-w-mass pb-6', punkteZu && 'pt-6')}>
                <p className="font-text text-fs-3 text-pretty text-tinte">
                  <Textmarken text={inhalt.absatzMehr} />
                </p>
              </div>
            )}
          </Aufklapper>,
          nachListe ? undefined : clsx((hatFolge || moment) && 'mt-8'),
        )}
    </Abschnitt>
  );
}
