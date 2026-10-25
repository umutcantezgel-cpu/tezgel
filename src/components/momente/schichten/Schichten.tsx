// Großer Moment „schichten“ (KERN v3.3 K-007, Register `schichten`, /bad; E3-GRAF-01): Was unter der Fliese steckt.
// Figur mit Bildunterschrift; darunter in einem Feld an der Fuge die Zeichnung groß und mittig, darunter die fünf Schichten
// von unten nach oben als schmale nummerierte Liste mit Legende, je Schicht ein Satz (K-016, E-047: kein zweiter Strang
// neben der Zeichnung, auf allen Breiten untereinander). Die Bewegung steht allein in
// bewegung.css: ein Zeitstrahl je Satz (view-timeline). Je Satz setzt sich seine Schicht in der Zeichnung, die Zeichnung
// klebt dabei unter dem Kopf. Ohne Unterstützung, reduziert, ohne JavaScript, bei wenig Höhe: alle Schichten sichtbar,
// nichts klebt. Platz: ErzaehlSeite `momente.tun`. Serverkomponente.
import Schichtzeichnung, { Schichtmuster } from './Zeichnung';
import { SCHICHTEN, UNTERSCHRIFT } from './daten';

export default function Schichten() {
  return (
    <figure className="schichten" data-motion="schichten">
      <figcaption className="mx-auto max-w-mass text-center font-text text-fs-3 text-pretty text-tinte-2">{UNTERSCHRIFT}</figcaption>
      <div className="mt-6 border border-fuge bg-fliese">
        <div className="schichten-buehne border-b border-fuge bg-fliese p-4 text-tinte lg:p-8">
          <div className="mx-auto max-w-md lg:w-1/2 lg:max-w-full">
            <Schichtzeichnung />
          </div>
        </div>
        <ol className="@container mx-auto max-w-mass">
          {SCHICHTEN.map((s, i) => (
            <li key={s.kennung} className="schichten-satz flex gap-4 border-t border-fuge px-4 py-6 first:border-t-0 lg:py-12">
              <span aria-hidden="true" className="hidden w-12 shrink-0 pt-1 text-tinte @xs:block">
                <Schichtmuster kennung={s.kennung} />
              </span>
              <div className="min-w-0">
                <p className="font-text text-fs-4 font-semibold text-tinte">
                  <span aria-hidden="true" className="mr-3 font-mono text-fs-2 font-normal text-tinte-2">{i + 1}</span>
                  {s.name}
                </p>
                <p className="mt-1 font-text text-fs-3 text-pretty text-tinte-2">{s.satz}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
