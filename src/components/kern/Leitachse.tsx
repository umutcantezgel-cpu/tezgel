// Leitachse der Erzählansichten (KERN K-007 leitachse): ein Lot im Seitenfluss über alle Abschnitte nach dem
// Einstieg, an derselben Stelle wie Lot bzw. Kreuzlinie des Einstiegs (im Seitenrand vor der Inhaltskante, mobil
// ≥ 8 px Abstand zum Text). Grundschicht Fuge, rot nur das gezogene Stück (K-003 Nr. 2): es wächst mit dem
// Lesefortschritt, nur bei erlaubter Bewegung; reduziert und ohne JavaScript bleibt die Achse grau (globals.css, R-01a).
// Abschnitte mit `leitachse` setzen an ihrer Oberkante ein Fugenkreuz auf das Lot. Schneidet nie Text. Im Leitfaden (unten)
// steht ein Kreuz nur dort, wo das Lot eine Trennlinie kreuzt (Kante einer Fliese- oder Tintefläche, globals.css
// „abschnitt-kreuz“, UM-E3-FIX F3): Vor ruhiger Kalkfläche las es sich wie ein verirrtes Pluszeichen.
// Der mittige Einstieg (vorlagen/teile/EinstiegMitte) beginnt das Lot schon an seiner Schnur unter der H1; es läuft
// ohne Lücke in diese Leitachse über.
//
// Leitfaden mit Abschnittsmarke (K-007 Leitfaden-Motiv, UM-E3-LEIT): Folgt die Leitachse in einer Ansicht mit
// Seitenformel auf den Einstieg (Erzählseite mit mittigem Einstieg oder Planblatt: `/` und mit Absicht die übrigen
// Seiten dieser Vorlage, K-007 „alle Erzählansichten“), steht ihre rote Spitze fest auf der Leselinie (40 % der
// Bildschirmhöhe), und dort sitzt die Abschnittsmarke, ein rotes Fugenkreuz. Sie steht im Abschnitt, der gerade gelesen
// wird, und trifft sein Fugenkreuz an der Oberkante, sobald er an die Reihe kommt. Nur CSS (bewegung.css „Leitfaden mit
// Abschnittsmarke“), kein Skript: Die Bahn der Marke hat dieselbe Box wie das Lot und einen eigenen Zeitstrahl, so
// liegen Spitze und Marke in jeder Stellung aufeinander. Die Marke ist ein Streifen in voller Höhe der Bahn mit dem
// Fugenkreuz an der Unterkante und verschiebt sich um ihre eigene Höhe (translate in %, nie in Container-Einheiten: die
// friert Chromium beim Start ein, die Bahn wächst danach). Ohne Bewegung, ohne Unterstützung, im Druck und bei
// erzwungenen Farben gibt es keine Marke. Leitachsen, die den Einstieg umfassen (Wissens- und Ortsseiten),
// Arbeitsansichten (K-010) und Seiten außerhalb der Vorlagen zeigen sie nicht; die Klassen `leitfaden` und
// `leitfaden-ebene` sind nur die Haken dafür.
//
// Ebenen (K-005, R-01a): Die Zierebene liegt unter dem Inhalt – ohne z-index vor dem Inhalt; der Inhalt steht in einer
// positionierten Hülle ohne eigenen Stapelkontext und malt in Baumreihenfolge darüber. Flächen (Fliese, Tinte, Bänder)
// decken das Lot, es läuft unter ihnen weiter wie im Anfahrtsband (Gutachten u8). Über dem Text liegt keine Ebene (axe
// „bgOverlap“), und Ebenen im Inhalt (z-30 … z-50) bleiben im Stapel der Seite. Nur die Bahn der Marke steht in Ebene
// z-10, damit die Marke auch über Fliese und Tinte den Abschnitt markiert: 0 px breit, die Marke (12 px) ganz im
// Seitenrand vor der Textkante, nie über Text. Die Fugenkreuze der Abschnittskanten (ebenfalls z-10, im Baum später)
// liegen über der Marke: Trifft die Marke eines, deckt es sie für diesen Moment.
//
// `gezogen={false}` (R-02a): nur die Grundschicht, kein rotes Stück und keine Marke – für Strecken der Seite, in denen
// ein anderes Rot der Blickfang ist (z. B. die Anfahrt der Stadtseiten). Die Seite teilt ihre Leitachse dann in
// Abschnittsfolgen; die Lote stehen an derselben Stelle und laufen ohne Lücke ineinander. Keine Bewegung, kein
// Registereintrag (data-leitachse bleibt für die Überlappungsprüfung).
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';
import Laserachse from './Laserachse';
import { seitenKlassen } from './stile';

/** Lage des Lots im Seitenrahmen – gemeinsam für Einstieg, Leitachse und die Fugenkreuze der Abschnittskanten */
// mobil 4 px vom Rand (UM-E3-FIX F3, Sichtabnahme E3 Anlauf 1: bei 8 px berührten Kreuz und Lot den Text): Lot und
// Fugenkreuz (mobil 8 px, KREUZ_GROESSE) halten mindestens 8 px Abstand zur Textkante (16 px); ab md 16 px vom Rand
// (Text ab 32 px), ab lg 32 px (Text ab 48 px), dort mit 12-px-Kreuz 10 px Abstand. Die Abschnittsmarke steht nur ab md.
export const ACHSE_LAGE = 'left-1 md:left-4 lg:left-8';
/** Größe eines Fugenkreuzes auf dem Lot: mobil 8 px (ganz im Bild, 8 px vor der Textkante), ab md 12 px */
export const KREUZ_GROESSE = 'size-2 md:size-3';
/** Schnur des mittigen Einstiegs (UM-E3-FIX F1): von der Achse bis zur gespiegelten Stelle am rechten Rand */
export const SCHNUR_LAGE = `${ACHSE_LAGE} right-1 md:right-4 lg:right-8`;

export default function Leitachse({ children, gezogen = true, className }: { children: ReactNode; gezogen?: boolean; className?: string }) {
  return (
    <div className={clsx('relative', gezogen && 'leitfaden', className)}>
      <div aria-hidden="true" className={clsx('pointer-events-none absolute inset-0', gezogen && 'leitfaden-ebene')}>
        <div className={clsx(seitenKlassen, 'relative h-full')}>
          {gezogen ? (
            <>
              <Laserachse className={ACHSE_LAGE} />
              {/* Bahn der Abschnittsmarke: gleiche Box wie das Lot, Kennung leitachse (Register), Ebene z-10 über den
                  Flächen. Die Marke ist ein Streifen in voller Höhe der Bahn, das Fugenkreuz sitzt an seiner Unterkante
                  und trägt data-leitachse für die Überlappungsprüfung (es schneidet wie das Lot nie Text) */}
              {/* Mobil keine Marke (UM-E3-FIX F3): Sie stünde auf der Leselinie immer neben einer Textzeile; dort führt
                  allein die rote Spitze des Lots */}
              <div data-motion="leitachse" className={clsx('leitfaden-bahn z-10', ACHSE_LAGE)}>
                <span className="leitfaden-marke max-md:hidden">
                  <span data-leitachse="" className="absolute bottom-0 left-0 size-3 translate-y-1/2">
                    <Fugenkreuz className="absolute inset-0 size-full" />
                  </span>
                </span>
              </div>
            </>
          ) : (
            <div data-leitachse="" className={clsx('leitachse', ACHSE_LAGE)} />
          )}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
