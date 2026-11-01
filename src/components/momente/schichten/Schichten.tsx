// Großer Moment „schichten“ (KERN v3.3 K-007, Register `schichten`, /bad; E3-GRAF-01): Was unter der Fliese steckt.
// Figur mit Bildunterschrift; darunter in einem Feld an der Fuge die Zeichnung groß und mittig, darunter die fünf Schichten
// von unten nach oben als schmale nummerierte Liste mit Legende, je Schicht ein Satz (K-016, E-047: kein zweiter Strang
// neben der Zeichnung, auf allen Breiten untereinander). Die Bewegung steht allein in
// bewegung.css: ein Zeitstrahl je Satz (view-timeline). Je Satz setzt sich seine Schicht in der Zeichnung, die Zeichnung
// klebt dabei unter dem Kopf. Ohne Unterstützung, reduziert, ohne JavaScript, bei wenig Höhe: alle Schichten sichtbar,
// nichts klebt. Platz: ErzaehlSeite `momente.tun`.
// Auslauf (UM-E4-SICHT-FIX M-C1 Nr. 1 und 2): Solange die Bühne klebt, folgt der Liste ein leerer Platz in Bühnenhöhe
// (`schichten-auslauf`, nur im Bewegungszweig von bewegung.css sichtbar). So gleitet Satz 5 ganz unter die Bühne, bevor sie
// sich löst, und am Ende steht die fertige Zeichnung allein; vorher deckte die Bühne „5 Fuge“ zu. Jeder Satz blendet über
// 48 px vor der Bühnenunterkante aus (nur opacity), die Unterkante der Bühne ist eine 1-px-Fuge.
// Fachwörter (`fachwort`, M-C1 Nr. 3): Steht der Moment vorn in „Was wir tun“ (`momentZuerst`), sind die Namen „Untergrund“
// und „Abdichtung“ das erste Vorkommen auf der Seite und tragen die Marke mit der Erklärung aus dem Glossar (K-011, wie
// GefaelleBalkon); die Erklärung steht in Textstärke und in der Stufe des Satzes darunter. Sonst stehen die Namen ohne Marke.
// Satzspiegel v2 (UM-E4-SICHT-FIX-2, E-113 Nachtrag Stufe 1, Szenenlegende an SF2-A2): Die Liste füllt ab lg den Block auf der
// Kopfachse (Satzblock `achse`, mittig über zwei Drittel, d1440 x 315 bis 1125 statt mittig 605 px ab x 417). So beginnt sie an
// derselben linken Kante wie Einleitung, Punkte und Absatz darunter und steht zugleich mittig unter der Zeichnung der Bühne (eine
// Achse in der Karte; Nacharbeit: im Lesemaß an der Blockkante lag ihre Mitte 64 px links von der Zeichnung). Der Satz jeder
// Schicht bleibt im Lesemaß (max-w-mass am Satz; Muster, Abstand und Innenabstand nehmen rund 96 px der Zeile). Text,
// Reihenfolge und Ablauf der Szene bleiben (die Zeitstrahlen hängen an den Listenpunkten, nicht an ihrer Breite); Zeichnung und
// Satz darüber unverändert mittig. Unter lg mittig im Lesemaß wie bisher. Serverkomponente.
import { Satzblock, satzMass } from '@/components/kern/Abschnitt';
import Fachwort from '@/components/kern/Fachwort';
import type { GlossarId } from '@/config/glossar';
import Schichtzeichnung, { Schichtmuster } from './Zeichnung';
import { SCHICHTEN, UNTERSCHRIFT, type SchichtKennung } from './daten';

/** Schichten, deren Name ein Glossarbegriff ist */
const FACHWOERTER: Partial<Record<SchichtKennung, GlossarId>> = { untergrund: 'untergrund', abdichtung: 'abdichtung' };

export default function Schichten({ fachwort = false }: { fachwort?: boolean }) {
  return (
    <figure className="schichten" data-motion="schichten">
      <figcaption className="mx-auto max-w-mass text-center font-text text-fs-3 text-pretty text-tinte-2">{UNTERSCHRIFT}</figcaption>
      <div className="mt-6 border border-fuge bg-fliese">
        <div className="schichten-buehne border-b border-fuge bg-fliese p-4 text-tinte lg:p-8">
          <div className="mx-auto max-w-md lg:w-1/2 lg:max-w-full">
            <Schichtzeichnung />
          </div>
        </div>
        <Satzblock satz="achse">
          <ol className={`@container ${satzMass('achse')}`}>
            {SCHICHTEN.map((s, i) => {
              const glossar = fachwort ? FACHWOERTER[s.kennung] : undefined;
              return (
                <li key={s.kennung} className="schichten-satz flex gap-4 border-t border-fuge px-4 py-6 first:border-t-0 lg:py-12">
                  <span aria-hidden="true" className="hidden w-12 shrink-0 pt-1 text-tinte @xs:block">
                    <Schichtmuster kennung={s.kennung} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-text text-fs-4 font-semibold text-tinte *:data-erklaert:font-normal *:data-erklaert:text-fs-3 *:data-erklaert:text-tinte-2">
                      {/* Nummer und Name durch ein echtes Leerzeichen getrennt (Text „1 Untergrund“ statt „1Untergrund“ beim Kopieren und für
                          die Glossarprüfung, sonst begann das Wort mit der Ziffer); Abstand etwa wie vorher: 8 px Rand plus Wortabstand */}
                      <span aria-hidden="true" className="mr-2 font-mono text-fs-2 font-normal text-tinte-2">{i + 1}</span>{' '}
                      {glossar ? <Fachwort id={glossar}>{s.name}</Fachwort> : s.name}
                    </p>
                    <p className="mt-1 max-w-mass font-text text-fs-3 text-pretty text-tinte-2">{s.satz}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Satzblock>
        {/* Auslauf in Bühnenhöhe, nur solange die Bühne klebt (bewegung.css „schichten“) */}
        <div aria-hidden="true" className="schichten-auslauf" />
      </div>
    </figure>
  );
}
