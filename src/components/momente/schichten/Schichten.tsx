// Großer Moment „schichten“ (KERN v3.3 K-007, Register `schichten`, /bad; E3-GRAF-01): Was unter der Fliese steckt.
// Figur mit Bildunterschrift; darunter in einem Feld an der Fuge die Zeichnung (mobil oben, ab lg links) und die fünf
// Schichten von unten nach oben als nummerierte Liste mit Legende, je Schicht ein Satz. Die Bewegung steht allein in
// bewegung.css: ein Zeitstrahl je Satz (view-timeline). Je Satz setzt sich seine Schicht in der Zeichnung, die Zeichnung
// klebt dabei unter dem Kopf. Ohne Unterstützung, reduziert, ohne JavaScript, bei wenig Höhe: alle Schichten sichtbar,
// nichts klebt. Platz: ErzaehlSeite `momente.tun`. Serverkomponente.
import Schichtzeichnung, { Schichtmuster } from './Zeichnung';
import { SCHICHTEN, UNTERSCHRIFT } from './daten';

export default function Schichten() {
  return (
    <figure className="schichten" data-motion="schichten">
      <figcaption className="max-w-mass font-text text-fs-3 text-pretty text-tinte-2">{UNTERSCHRIFT}</figcaption>
      <div className="mt-6 border border-fuge bg-fliese lg:grid lg:grid-cols-2">
        <div className="schichten-buehne border-b border-fuge bg-fliese p-4 text-tinte lg:self-start lg:border-b-0 lg:p-8">
          <div className="mx-auto max-w-md">
            <Schichtzeichnung />
          </div>
        </div>
        <ol className="@container lg:border-l lg:border-fuge">
          {SCHICHTEN.map((s, i) => (
            <li key={s.kennung} className="schichten-satz flex gap-4 border-t border-fuge px-4 py-6 first:border-t-0 lg:min-h-48 lg:p-8">
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
