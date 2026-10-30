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
// eine Zeile mit Links. Unter 20rem Zeilenbreite (große Systemschrift) entfällt die Zeichnung. Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Textmarken from '@/components/kern/Textmarken';
import { VIGNETTEN, type VignettenName } from '@/components/kern/vignetten';
import type { BildOderMotiv, LageInhalt } from '../inhalt';
import { Bereichszeilen } from './Tun';

type Fliese = { satz: string; href: string; vignette?: VignettenName } & BildOderMotiv;

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

export default function Lage({ inhalt }: { inhalt: LageInhalt }) {
  const fliesen = inhalt.fliesen ?? [];
  return (
    <Abschnitt
      id="ihre-lage"
      formel="lage"
      leitachse
      spaet
      mitte
      flaeche={inhalt.aufFliese ? 'fliese' : 'kalk'}
      className={inhalt.aufFliese ? 'lg:pt-16' : undefined}
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
    >
      {inhalt.absaetze && inhalt.absaetze.length > 0 && (
        // Satzspiegel in der Grundschrift: max-w-mass misst in ch der eigenen Schrift; mit text-fs-4 am selben Element stand der
        // Absatz rund 300 px breiter als die Zeilen darunter (Browserprüfung E4-W0, E-065). So fluchten beide Kanten.
        <div className="mx-auto max-w-mass">
          <div className="space-y-4 font-text text-fs-4 text-pretty text-tinte">
            {inhalt.absaetze.map((a) => (
              <p key={a}>
                <Textmarken text={a} />
              </p>
            ))}
          </div>
        </div>
      )}
      {fliesen.length > 0 && <LageFliesen fliesen={fliesen} className={clsx(inhalt.absaetze?.length && 'mt-12')} />}
      {inhalt.wege && inhalt.wege.length > 0 && (
        <div className={clsx('mx-auto max-w-mass', (inhalt.absaetze?.length || fliesen.length) && 'mt-12')}>
          <Bereichszeilen bereiche={inhalt.wege} />
        </div>
      )}
    </Abschnitt>
  );
}
