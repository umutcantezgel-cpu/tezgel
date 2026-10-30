// Vorlagen · 4 So läuft es ab (KERN v3 K-003 Nr. 5, K-005, K-009; E-025, E-044): die Schritte an der roten Linie wie auf der
// Startseite. Ab lg als fallende Treppe über den Spalten, jeder Schritt um ein Drittel der langen Fliesenseite tiefer als
// der vorige (Stufe 16, der Versatz dieses Bildschirms), dazwischen eine rote Setzstufe; so liest sich die Folge 01, 02, 03
// (vorher stand nur jeder zweite tiefer und wirkte wie ein Versatzfehler, E2-SICHT-2 Befund 7). Mobil senkrecht genau auf
// dem Lot der Laserlinie. Je Schritt ein Fugenkreuz am Anfang der Linie und die Nummer in Mono, ohne Kästen. Darunter,
// abgesetzt durch eine Fuge, Belege aus dem Faktenblatt (ab lg in Spalten wie die Schritte, je mit Fugenkreuz). Ein großer
// Moment (z. B. der Weg einer Badsanierung) kann die Schritte ersetzen; darunter ein Hinweis mit Verweis. Wahlweise ein Satz
// unter der Überschrift (Einleitung). Fünf oder sechs Schritte stehen als zwei Treppenläufe untereinander unter einem mittigen
// Kopf (K-016 „3 + 3“, E-047, E-062). Der Abschnitt zeichnet spät (unter dem ersten Bildschirm). Titel und Sätze der Schritte
// trennen lange Zusammensetzungen nur an ihrer Fuge (FS-K Nr. 6: „Festpreisan-gebot“).
// Anriss (Startseite, UM-E4-START, Sicht Anlauf 3: nach dem Eingang kein Moment mit Gewicht auf der Seite; Kennung anriss): Die
// rote Stufenlinie reißt beim Eintritt (Sicht 0,5, Register anriss) einmal Stufe für Stufe an, je Stufe dauer-3 mit
// ease-setzen: erst die Setzstufe herab und das Fugenkreuz setzt sich, dann der Lauf nach rechts (mobil das Lot herab zum
// nächsten Kreuz). Die Linien sind dafür eigene Striche über den (durchsichtigen) Rändern, die Lage bleibt dieselbe; animiert
// werden nur scale und opacity (Compositor). Reduziert, ruhig, ohne JavaScript, im Notaus und ohne Unterstützung steht die
// Linie voll (bewegung.css „anriss“). Serverkomponente.
// Gewicht (Nacharbeit UM-E4-START, Prüfung A: am Desktop wuchs nur eine 2-px-Linie, mobil las sich das Lot nicht als
// Treppe): Das Kreuz setzt sich rot und größer und wird dann Tinte, der Schritt (Nummer, Titel, Satz) setzt sich mit ihm,
// und mobil zweigt am Kreuz je Schritt eine kurze rote Stufe vom Lot zur Spalte der Nummer ab (treppe-tritt, auch im
// Ruhezustand).
import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { KREUZ_GROESSE } from '@/components/kern/Leitachse';
import Textmarken from '@/components/kern/Textmarken';
import WeiterLink from '@/components/kern/WeiterLink';
import { mitFugen } from '@/components/kern/zusammen';
import type { AblaufInhalt } from '../inhalt';

// Spalten ab lg je Schrittzahl und Stufen der Treppe (Klassen fest im Quelltext)
const SPALTEN: Record<number, string> = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };
const STUFE = ['', 'lg:mt-16', 'lg:mt-32', 'lg:mt-48'];
/** Ab so vielen Schritten wäre eine Treppe zu breit: zwei Treppenläufe untereinander (K-016 „3 + 3“, E-047, E-048; seit E-062
 *  als Treppen wie auf den anderen Seiten statt zwei senkrechter Spalten, E3-SICHT) */
export const ZWEI_SPALTEN_AB = 5;

/** Treppe; `start` zählt weiter (zweiter Lauf beginnt bei 04), `weiter`: mobil läuft die Linie über den letzten Schritt hinaus
 *  in den nächsten Lauf; `anriss`: die Linie reißt beim Eintritt Stufe für Stufe an (nur ein Lauf, Startseite) */
export function Schritte({ schritte, start = 0, weiter = false, anriss = false }: { schritte: AblaufInhalt['schritte']; start?: number; weiter?: boolean; anriss?: boolean }) {
  if (anriss && schritte.length < ZWEI_SPALTEN_AB) return <AnrissTreppe schritte={schritte} />;
  if (start === 0 && schritte.length >= ZWEI_SPALTEN_AB) {
    const haelfte = Math.ceil(schritte.length / 2);
    return (
      <div className="flex flex-col lg:gap-32">
        <Schritte schritte={schritte.slice(0, haelfte)} weiter />
        <Schritte schritte={schritte.slice(haelfte)} start={haelfte} />
      </div>
    );
  }
  return (
    // mobil auf dem Lot (ACHSE_LAGE: 8 px vom Rand, also 8 px vor der Inhaltskante; ab md 16 px), ab lg die Treppe
    <ol className={clsx('-ml-2 grid md:-ml-4 lg:ml-0', SPALTEN[schritte.length] ?? 'lg:grid-cols-3')}>
      {schritte.map((s, i) => {
        const letzter = i === schritte.length - 1;
        return (
          <li
            key={s.titel}
            className={clsx(
              // senkrecht: das Kreuz steht am Anfang der Linie eine halbe Stufe 12 über der Nummer, nie auf Höhe einer Textzeile
              // (UM-E3-FIX2 N2); die Abstände zwischen den Schritten bleiben 48 px (pt-6 und pb-6)
              'relative border-l-2 pt-6 pb-6 pl-8 lg:border-t-2 lg:border-l-0 lg:pt-8 lg:pr-12 lg:pb-0 lg:pl-0',
              letzter && !weiter ? 'border-l-transparent lg:border-t-laser' : 'border-laser',
              STUFE[i],
            )}
          >
            {/* Setzstufe ab lg: vom Ende der vorigen Linie senkrecht herab zum Anfang dieser */}
            {i > 0 && <span aria-hidden="true" className="absolute bottom-full left-0 hidden h-16 -translate-x-1/2 border-l-2 border-laser lg:block" />}
            <Fugenkreuz className={clsx('absolute top-0 left-0 -translate-1/2 text-tinte', KREUZ_GROESSE)} />
            <p className="font-mono text-fs-4 text-tinte-2">{String(start + i + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte">{mitFugen(s.titel)}</h3>
            <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
              <Textmarken text={s.text} fugen />
            </p>
          </li>
        );
      })}
    </ol>
  );
}

/** Treppe mit Anriss (UM-E4-START): wie Schritte, die Linien aber als eigene Striche (treppe-lot mobil, treppe-lauf und
 *  treppe-setz ab lg) über durchsichtigen Rändern derselben Breite, damit Lage und Abstände gleich bleiben. Jeder
 *  Schritt trägt seine Nummer als --stufe für den Takt (bewegung.css „anriss“). Mobil steht die Treppe auf dem Lot; an der
 *  Satzkante (Startseite) rückt sie dorthin mit (globals.css „Lot an der Satzkante“, Klasse treppe-auf-lot). */
function AnrissTreppe({ schritte }: { schritte: AblaufInhalt['schritte'] }) {
  return (
    <ol data-motion="anriss" className={clsx('treppe-auf-lot -ml-2 grid md:-ml-4 lg:ml-0', SPALTEN[schritte.length] ?? 'lg:grid-cols-3')}>
      {schritte.map((s, i) => {
        const letzter = i === schritte.length - 1;
        return (
          <li
            key={s.titel}
            style={{ '--stufe': i } as CSSProperties}
            className={clsx('relative border-l-2 border-transparent pt-6 pb-6 pl-8 lg:border-t-2 lg:border-l-0 lg:pt-8 lg:pr-12 lg:pb-0 lg:pl-0', STUFE[i])}
          >
            {/* Lot mobil (nicht nach dem letzten Schritt), Lauf ab lg: je ein Strich über dem durchsichtigen Rand */}
            {!letzter && <span aria-hidden="true" className="treppe-lot absolute inset-y-0 right-full origin-top border-l-2 border-laser lg:hidden" />}
            <span aria-hidden="true" className="treppe-lauf absolute inset-x-0 bottom-full hidden origin-left border-t-2 border-laser lg:block" />
            {/* Setzstufe ab lg: vom Ende der vorigen Linie senkrecht herab zum Anfang dieser */}
            {i > 0 && <span aria-hidden="true" className="treppe-setz absolute bottom-full left-0 hidden h-16 origin-top -translate-x-1/2 border-l-2 border-laser lg:block" />}
            {/* Hülle als HTML-Kasten: Deckkraft und Größe eines <svg> animiert Chromium im Hauptthread (Spur UM-E4-START: rund 155
                Hauptthread-Bilder je Anriss), die eines span im Compositor. Das svg füllt die Hülle absolut: als inline-block
                (Fugenkreuz) stand es auf der Zeile der Hülle und damit 7 bis 9 px unter der Linie (Prüfung A). Darüber dasselbe
                Kreuz in Rot, das nur beim Setzen kurz zu sehen ist (treppe-kreuz-rot, sonst Deckkraft 0) */}
            <span aria-hidden="true" className={clsx('treppe-kreuz absolute top-0 left-0 block -translate-1/2 text-tinte', KREUZ_GROESSE)}>
              <Fugenkreuz className="absolute inset-0 size-full" />
              <span className="treppe-kreuz-rot absolute inset-0 text-laser opacity-0">
                <Fugenkreuz className="absolute inset-0 size-full" />
              </span>
            </span>
            {/* mobil die Stufe: vom Lot am Kreuz waagrecht zur Spalte der Nummer (bis 8 px davor), wie ab lg der Lauf über
                dem Schritt; so liest sich das Lot als Treppe */}
            <span aria-hidden="true" className="treppe-tritt absolute bottom-full left-0 w-6 origin-left border-t-2 border-laser lg:hidden" />
            {/* Schritt: setzt sich, wenn die Linie ihn erreicht (treppe-schritt) */}
            <div className="treppe-schritt">
              <p className="font-mono text-fs-4 text-tinte-2">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte">{mitFugen(s.titel)}</h3>
              <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
                <Textmarken text={s.text} fugen />
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Belege unter den Schritten: ab lg in Spalten wie die Schritte, mobil untereinander, je mit Fugenkreuz, ohne Kästen */
function Belege({ belege }: { belege: string[] }) {
  return (
    <ul className={clsx('mt-4 grid gap-6 border-t border-fuge pt-8 lg:mt-24 lg:gap-12', SPALTEN[belege.length] ?? 'lg:grid-cols-3')}>
      {belege.map((b) => (
        <li key={b} className="flex gap-3">
          <Fugenkreuz className="mt-2 size-3 shrink-0 text-tinte" />
          <p className="font-text text-fs-3 text-tinte">
            <Textmarken text={b} />
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function Ablauf({ inhalt, moment }: { inhalt: AblaufInhalt; moment?: ReactNode }) {
  // zwei Läufe: Überschrift und Satz mittig darüber (Auftraggeber zu /bad/badsanierung, E-047)
  const zweiSpaltig = !moment && inhalt.schritte.length >= ZWEI_SPALTEN_AB;
  return (
    <Abschnitt
      id="ablauf"
      formel="ablauf"
      leitachse
      spaet
      flaeche="fliese"
      mitte={zweiSpaltig}
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
      className="lg:pb-32"
    >
      {moment ?? <Schritte schritte={inhalt.schritte} anriss={inhalt.anriss} />}
      {inhalt.belege && inhalt.belege.length > 0 && <Belege belege={inhalt.belege} />}
      {inhalt.hinweis && (
        <div className="mt-12 max-w-mass border-l-2 border-tinte pl-6 lg:mt-24">
          <p className="font-text text-fs-3 text-tinte">
            <Textmarken text={inhalt.hinweis.text} />
          </p>
          {inhalt.hinweis.verweis && <WeiterLink href={inhalt.hinweis.verweis.href} className="mt-2">{inhalt.hinweis.verweis.name}</WeiterLink>}
        </div>
      )}
    </Abschnitt>
  );
}
