// Leitachse der Erzählansichten (KERN K-007 leitachse): ein Lot im Seitenfluss über alle Abschnitte nach dem
// Einstieg, an derselben Stelle wie Lot bzw. Kreuzlinie des Einstiegs (im Seitenrand vor der Inhaltskante, mobil mittig im
// Rand: 8 px vom Rand, 8 px vor dem Satz). Grundschicht Fuge, rot nur das gezogene Stück (K-003 Nr. 2): es wächst mit dem
// Lesefortschritt, nur bei erlaubter Bewegung; reduziert und ohne JavaScript bleibt die Achse grau (globals.css, R-01a).
// Abschnitte mit `leitachse` setzen an ihrer Oberkante ein Fugenkreuz auf das Lot. Schneidet nie Text. Im Leitfaden (unten)
// steht ein Kreuz nur dort, wo das Lot eine Trennlinie kreuzt (Kante einer Fliese- oder Tintefläche, globals.css
// „abschnitt-kreuz“, UM-E3-FIX F3): Vor ruhiger Kalkfläche las es sich wie ein verirrtes Pluszeichen.
// Der mittige Einstieg (vorlagen/teile/EinstiegMitte) beginnt das Lot schon an seiner Schnur unter der H1; es läuft
// ohne Lücke in diese Leitachse über.
//
// Leitfaden mit Abschnittsmarke (K-007 Leitfaden-Motiv, UM-E3-LEIT; seit UM-E3-FIX2 N1 je Abschnitt): Folgt die Leitachse
// in einer Ansicht mit Seitenformel auf den Einstieg (Erzählseite mit mittigem Einstieg oder Planblatt: `/` und mit Absicht
// die übrigen Seiten dieser Vorlage, K-007 „alle Erzählansichten“), steht ihre rote Spitze fest auf der Leselinie (40 % der
// Bildschirmhöhe). Den Kopf, ein rotes Fugenkreuz auf der Spitze, setzt der Abschnitt selbst (kern/Abschnitt), und nur
// dort, wo das Lot gezeichnet ist: neben dem Inhalt eines Abschnitts auf Kalk. Fliese- und Tinteflächen decken das Lot,
// dort gibt es keinen Kopf (vorher schwebte er dort allein im Weiß, Sichtabnahme E3 Anlauf 2). Neben Kopf und Satz des
// Abschnitts (H2 und Einleitung), an den Kanten, am Ursprung der Entfernungsskala, neben den Köpfen der Ortsgruppen und
// neben Karten mit H3 (data-kopf-pause) steht er nie, in einem Abschnitt ohne eigenen Kopf gar nicht; an einer Kante
// rastet er ein: Ihr Fugenkreuz wird rot, solange die Leselinie es auf eine Stufe 6 (24 px) trifft. So steht nie ein
// zweites Kreuz näher als 24 px. Nur CSS (bewegung.css „Leitfaden mit Abschnittsmarke“). Ohne Bewegung, ohne Unterstützung,
// im Druck und bei erzwungenen Farben gibt es weder Kopf noch Einrasten. Seit UM-E4-VORL stehen auch die Wissens- und
// Ortsseiten und die Erzählseite mit einfachem Einstieg so (der Einstieg vor der Leitachse, mit eigenem Lot in Grundschicht,
// vorlagen/teile/Einstieg `lot`). Arbeitsansichten (K-010, `gezogen={false}`) und Seiten außerhalb der Vorlagen zeigen
// beides nicht; die Klassen `leitfaden` und `leitfaden-ebene` sind die Haken dafür.
//
// Ebenen (K-005, R-01a): Die Zierebene liegt unter dem Inhalt – ohne z-index vor dem Inhalt; der Inhalt steht in einer
// positionierten Hülle ohne eigenen Stapelkontext und malt in Baumreihenfolge darüber. Flächen (Fliese, Tinte, Bänder)
// decken das Lot, es läuft unter ihnen weiter wie im Anfahrtsband (Gutachten u8). Über dem Text liegt keine Ebene (axe
// „bgOverlap“), und Ebenen im Inhalt (z-30 … z-50) bleiben im Stapel der Seite. Kopf und Fugenkreuze der Abschnittskanten
// stehen in Ebene z-10, ganz im Seitenrand vor der Textkante, nie über Text.
//
// `gezogen={false}` (R-02a): nur die Grundschicht, kein rotes Stück und keine Marke – für Strecken der Seite, in denen
// ein anderes Rot der Blickfang ist (z. B. die Anfahrt der Stadtseiten). Die Seite teilt ihre Leitachse dann in
// Abschnittsfolgen; die Lote stehen an derselben Stelle und laufen ohne Lücke ineinander. Keine Bewegung, kein
// Registereintrag (data-leitachse bleibt für die Überlappungsprüfung).
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Laserachse from './Laserachse';
import { seitenKlassen } from './stile';

/** Lage des Lots im Seitenrahmen – gemeinsam für Einstieg, Leitachse und die Fugenkreuze der Abschnittskanten */
// mobil 8 px vom Rand, mittig im Rand vor dem Satz (16 px; UM-E3-FIX2 N2, Sichtabnahme E3 Anlauf 2: bei 4 px las sich das Lot
// wie ein Gehäuserand, die Kreuze lagen halb am Bildrand). Das Kreuz (mobil 8 px, KREUZ_GROESSE) steht ganz im Bild und hält
// 4 px Abstand zur Textkante; ab md 16 px vom Rand (Text ab 32 px), ab lg 32 px (Text ab 48 px), dort mit 12-px-Kreuz
// 10 px Abstand. Die Abschnittsmarke steht nur ab md. Die Marke `achse` (ohne eigenen Stil) ist der Haken für das Lot an der
// Satzkante: Auf der Startseite steht es unter md auf der Satzkante (16 px) statt im Rand (Seitenformel lot="satzkante",
// globals.css; UM-E4-START, Sicht Anlauf 3: bei 8 px las sich das 2-px-Rot wie eine Schnittmarke am Bildrand).
export const ACHSE_LAGE = 'achse left-2 md:left-4 lg:left-8';
/** Dieselbe Lage, gemessen von der Inhaltskante eines Abschnitts mit Satzspiegel (seitenKlassen px-4 md:px-8 lg:px-12):
 *  8 px davor, ab md 16 px (rem, wächst mit der Grundschrift wie Rand und Achse) */
export const ACHSE_VOR_SATZ = '-left-2 md:-left-4';
/** Größe eines Fugenkreuzes auf dem Lot: mobil 8 px (ganz im Bild, 4 px vor der Textkante), ab md 12 px */
export const KREUZ_GROESSE = 'size-2 md:size-3';
/** Schnur des mittigen Einstiegs (UM-E3-FIX F1): von der Achse bis zur gespiegelten Stelle am rechten Rand */
export const SCHNUR_LAGE = `${ACHSE_LAGE} achse-rechts right-2 md:right-4 lg:right-8`;

export default function Leitachse({ children, gezogen = true, className }: { children: ReactNode; gezogen?: boolean; className?: string }) {
  return (
    <div className={clsx('relative', gezogen && 'leitfaden', className)}>
      <div aria-hidden="true" className={clsx('pointer-events-none absolute inset-0', gezogen && 'leitfaden-ebene')}>
        <div className={clsx(seitenKlassen, 'relative h-full')}>
          {gezogen ? <Laserachse className={ACHSE_LAGE} /> : <div data-leitachse="" className={clsx('leitachse', ACHSE_LAGE)} />}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
