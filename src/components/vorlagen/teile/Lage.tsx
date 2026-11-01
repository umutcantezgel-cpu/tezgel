// Vorlagen · 2 Ihre Lage (KERN v3 K-003 Nr. 2, K-009; E-025; K-016 „Ruhe“, E-047): die Lage der Kundschaft in ihren Worten.
// Wahlweise als Absätze, als Wege-Zeilen mit Link (wie die Bereiche in „Was wir tun“) oder als Auswahl wie auf der
// Startseite: große Zeilen mit Satz und Pfeil an einer Fuge, ab md in zwei Spalten, ohne Fotos (Bilder werden nie
// angeschnitten; ein Foto je Wahl wäre zu viel auf einem Bildschirm, E-047). Kopf mittig. Wahlweise auf Fliese (Startseite,
// UM-E3-FIX2 N8): Einstieg, Lage und „Was wir tun“ lagen auf derselben Kalkfläche mit drei mittigen Köpfen, die Grenzen waren
// nicht zu sehen. Weiß mit Fuge und Kantenkreuz setzt den Bruch nach dem Einstieg, danach wechseln die Flächen Abschnitt für
// Abschnitt. Ab lg setzt der Einstieg eine Stufe 16 Kalk unter seine Bewertungszeile (EinstiegMitte fugeUnten), und der Kopf
// beginnt eine Stufe 16 unter der Fuge. Der Abschnitt zeichnet spät (content-visibility, unter dem ersten Bildschirm,
// E3-LEIST-01).
// Eine Auswahlebene (Startseite, UM-E4-START, Sicht Anlauf 3): Trägt eine Lage eine Plan-Zeichnung (`vignette`), steht sie links
// in der Zeile in einem eigenen Feld an der Fuge, Satz und Pfeil rechts; die Leistungen darunter („Was wir tun“) sind nur noch
// eine Zeile mit Links. Unter 20rem Zeilenbreite (große Systemschrift) entfällt die Zeichnung.
// Ortsmoment (Ortsseiten, UM-E4-SICHT-FIX M-C6 Nr. 2): `zusatz` steht nach den Absätzen, dort das Einzugsband mit „Sie sind
// hier“. Ohne Angabe unverändert.
// Satzspiegel v2 (UM-E4-SICHT-FIX-2 M2-A1, K-003 „Fläche“; vorher links an der Laserlinie, M-B1): Die Absätze stehen als großer
// Vorspann (fs-4, Tinte, Lesemaß am eigenen Element, d1440 rund 790 px) im Block auf der Kopfachse (`achse`, zwei Drittel ab lg),
// eine lange Einleitung linksbündig im selben Block darüber. Ausrichtung je Block, nicht je Absatz: ab lg mittig, wenn alle Absätze
// zusammen höchstens VORSPANN_MITTIG Zeichen Klartext tragen (rund zwei Zeilen), sonst alle linksbündig an der Kante des Blocks;
// unter lg linksbündig wie bisher.
// Mittig gesetzt tritt die Abschnittsmarke daneben zurück (data-kopf-pause="ganz"): Sie steht nie neben mittigem Text. Wege ab
// drei Einträgen stehen voll breit in Spalten (`satzSpalten`). Der Zusatz (Einzugsband der Ortsseiten) steht im Block auf der
// Achse, auf der Kante des Vorspanns (Nacharbeit SF2-A1: über die volle Satzbreite gedehnt standen Name und Wert einer Zeile bis
// 560 px auseinander, solange das Band nur eine Zone zeigt); `zusatzBreit` setzt ihn über die volle Satzbreite (für M2-B7, wenn
// das Band Ortsmaß und Kennzahl trägt). Eine Lage nur mit der Auswahl (Startseite) steht wie bisher in voller Breite (breit)
// mit mittiger Einleitung. Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt, { Satzblock, satzBlock, satzMass } from '@/components/kern/Abschnitt';
import { langeEinleitung } from '@/components/kern/einleitung';
import { klartext } from '@/lib/textmarken';
import Textmarken from '@/components/kern/Textmarken';
import { VIGNETTEN, type VignettenName } from '@/components/kern/vignetten';
import type { BildOderMotiv, LageInhalt } from '../inhalt';
import { Bereichszeilen } from './Tun';

type Fliese = { satz: string; href: string; vignette?: VignettenName } & BildOderMotiv;

/** Höchstens so viele Zeichen Klartext tragen alle Absätze zusammen, damit die Lage mittig steht (rund zwei Zeilen im Vorspann,
 *  M2-A1 Nr. 2: /referenzen mittig, Ortsseiten und /bad/badsanierung linksbündig). Der Plan nennt 160; gemessen fasst eine Zeile
 *  des Vorspanns bei d1440 rund 72 Zeichen, /bad (153 Zeichen) stand mittig in drei Zeilen mit einem Rest von zwei Wörtern. 120
 *  hält die Regel „rund zwei Zeilen“ (Nacharbeit SF2-A1, EV-13) */
export const VORSPANN_MITTIG = 120;

/** Plan-Zeichnung der Lage im eigenen Feld an der Fuge, ganz und mittig (Feld 4 : 3), dekorativ; unter 24rem Listenbreite (Handy)
 *  Stufe 16 (64 px) mit engerem Innenabstand, sonst Stufe 24 (96 px), ab lg 32 (128 px), damit der Satz daneben höchstens drei
 *  Zeilen braucht */
function LageZeichnung({ name }: { name: VignettenName }) {
  const Vignette = VIGNETTEN[name];
  return (
    <span aria-hidden="true" className="hidden w-16 shrink-0 @xs:block @sm:w-24 lg:w-32">
      <span className="flex aspect-4/3 items-center justify-center border border-fuge bg-kalk p-1 text-tinte @sm:p-2">
        <Vignette fuellen />
      </span>
    </span>
  );
}

/** Auswahl: je Lage eine Zeile mit Satz und Pfeil, mit Zeichnung links (UM-E4-START); Bild oder Motiv im Inhalt bleiben für
 *  andere Formen erhalten, hier ruhen sie. Mit Zeichnung zwei Spalten erst ab lg: auf t768 standen die Sätze neben der
 *  Zeichnung in vier bis fünf Zeilen */
export function LageFliesen({ fliesen, className }: { fliesen: Fliese[]; className?: string }) {
  const mitZeichnung = fliesen.some((f) => f.vignette);
  return (
    <ul className={clsx('grid border-t border-fuge', mitZeichnung ? '@container lg:grid-cols-2 lg:gap-x-12' : 'md:grid-cols-2 md:gap-x-12', className)}>
      {fliesen.map((f) => (
        <li key={f.href} className="border-b border-fuge">
          <Link
            href={f.href}
            data-motion="zustand"
            className={clsx('group flex min-h-16 justify-between text-tinte', mitZeichnung ? 'items-center gap-4 py-4 lg:gap-6' : 'items-start gap-6 py-6')}
          >
            {f.vignette && <LageZeichnung name={f.vignette} />}
            <span className={clsx('font-text text-fs-4 font-semibold text-pretty hyphens-none underline decoration-transparent decoration-2 underline-offset-8 transition-colors dauer-1 group-hover:decoration-laser', mitZeichnung && 'min-w-0 flex-1')}>
              {f.satz}
            </span>
            {/* Pfeil an der ersten Zeile: in einer Zeile der Liste stehen die Pfeile gleich hoch, ob der Satz ein- oder zweizeilig ist (Browserprüfung E4-W1, Runde 2).
                Die Höhe einer Zeile gibt ein unsichtbares Leerzeichen derselben Stufe in derselben Rasterzelle vor, der Pfeil steht darin mittig
                (vorher h-[1lh], ein Beliebigwert außerhalb der Tokens; UM-E3-FIX2, werte.mjs) */}
            <span className="grid shrink-0 items-center font-text text-fs-4">
              <span className="invisible col-start-1 row-start-1">{'\u00a0'}</span>
              <Icon name="pfeil-rechts" groesse={5} className="col-start-1 row-start-1 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** `zusatzBreit`: der Zusatz über die volle Satzbreite statt im Block auf der Achse (für M2-B7, Einzugsband mit Ortsmaß) */
export default function Lage({ inhalt, zusatz, zusatzBreit = false }: { inhalt: LageInhalt; zusatz?: ReactNode; zusatzBreit?: boolean }) {
  const fliesen = inhalt.fliesen ?? [];
  const absaetze = inhalt.absaetze ?? [];
  const wege = inhalt.wege ?? [];
  // nur die Auswahl (Startseite): breit wie bisher, mittige Einleitung; `/` ändert sich hier nicht
  const nurAuswahl = fliesen.length > 0 && !absaetze.length && !wege.length && !zusatz;
  const mittig = absaetze.reduce((summe, a) => summe + klartext(a).length, 0) <= VORSPANN_MITTIG;
  // Wege ab drei Einträgen voll breit in Spalten, weniger im Block auf der Achse
  const wegeVoll = wege.length >= 3;
  return (
    <Abschnitt
      id="ihre-lage"
      formel="lage"
      leitachse
      spaet
      mitte
      flaeche={inhalt.aufFliese ? 'fliese' : 'kalk'}
      // dicht (M2-A9): die Lage ist ein kurzer Rahmen nach dem Einstieg; die Auswahl der Startseite bleibt, wie sie ist (`/`)
      dichte={nurAuswahl ? undefined : 'dicht'}
      satz="breit"
      // Satzspiegel v2: die lange Einleitung im Block auf der Achse über dem Inhalt
      einleitungSatz={nurAuswahl ? undefined : 'achse'}
      className={inhalt.aufFliese ? 'lg:pt-16' : undefined}
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
      // die Auswahl der Startseite (breit) behält ihre mittige Einleitung: `/` ändert sich nur im Schritt (M-B1)
      einleitungLang={!nurAuswahl && langeEinleitung(inhalt.einleitung)}
    >
      {absaetze.length > 0 && (
        // Vorspann: das Lesemaß in ch der eigenen Stufe fs-4 (rund 790 px), so füllt er den Block auf der Achse. Mittig erst ab
        // der Teilung (lg, Block über zwei Drittel): schmaler stünde ein mittiger Vorspann in vier bis zehn Zeilen (m390, mit 200 %
        // Schrift), dort bleibt er linksbündig wie bisher. Mittig gesetzt tritt die Abschnittsmarke daneben zurück (höchstens eine
        // Pause „ganz“ je Abschnitt; die Lage hat sonst keine)
        <Satzblock satz="achse">
          <div data-kopf-pause={mittig ? 'ganz' : undefined} className={clsx('mx-auto max-w-mass space-y-4 font-text text-fs-4 text-pretty text-tinte', mittig ? 'lg:@lg:text-center' : 'lg:@lg:mx-0')}>
            {absaetze.map((a) => (
              <p key={a}>
                <Textmarken text={a} />
              </p>
            ))}
          </div>
        </Satzblock>
      )}
      {fliesen.length > 0 && <LageFliesen fliesen={fliesen} className={clsx(absaetze.length && 'mt-12')} />}
      {wege.length > 0 &&
        (wegeVoll ? (
          <Bereichszeilen bereiche={wege} spalten className={clsx((absaetze.length || fliesen.length) && 'mt-12')} />
        ) : (
          <Satzblock satz="achse" className={clsx((absaetze.length || fliesen.length) && 'mt-12')}>
            <Bereichszeilen bereiche={wege} className={satzBlock('achse')} />
          </Satzblock>
        ))}
      {/* Zusatz (Einzugsband der Ortsseiten) im Block auf der Achse, unter lg im Lesemaß wie bisher; breit nur mit zusatzBreit */}
      {zusatz &&
        (zusatzBreit ? (
          <div className={clsx((absaetze.length || fliesen.length || wege.length) && 'mt-12')}>{zusatz}</div>
        ) : (
          <Satzblock satz="achse" className={clsx((absaetze.length || fliesen.length || wege.length) && 'mt-12')}>
            <div className={satzMass('achse')}>{zusatz}</div>
          </Satzblock>
        ))}
    </Abschnitt>
  );
}
