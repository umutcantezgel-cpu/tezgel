// Vorlagen · Schnurebene (UM-E4-SICHT-FIX M-A3 Nr. 1, KERN K-007 „An der Schnur“ und Laserlinie): die Figur unter der H1,
// gemeinsam für den mittigen Einstieg (EinstiegMitte) und den einfachen Einstieg an der Schnur (Einstieg mit `schnur`).
// - Schnurebene: Zierebene ab der Schnur. An ihrer Oberkante liegt die rote Schnur von der Achse bis zur gespiegelten Stelle
//   rechts (SCHNUR_LAGE), an ihrem linken Ende beginnt das Lot der Leitachse und läuft im Seitenrand bis zum Fuß des Einstiegs,
//   ohne Lücke in den Leitfaden der Seite (Grundschicht Fuge, rot gezogen bis zur Leselinie, bewegung.css „Leitfaden“).
//   Liegt unter dem Inhalt, schneidet nie Text (data-leitachse für die Überlappungsprüfung). `stark`: mobil und bei DPR 1 zwei
//   Pixel (schnur-linie, globals.css), sonst 1 px.
// - Lotstueck: rotes Lot von der Schnur bis an den nächsten Block (Länge über die Klassen des Aufrufs, z. B. -bottom-8), auf
//   derselben Achse wie das Lot der Zierebene. Ort und Hauptknopf stehen sichtbar an der Linie.
// - Aufhaengung: Fuge mit Fugenkreuz am Ende des Lotstücks (ab sm), an der das Foto hängt (Tinte wie an den Abschnittskanten).
// Schnur und Lotstück stehen in jedem Zustand rot, auch ruhig, reduziert und ohne JavaScript; nur ihr Ziehen ist Bewegung
// (Kennung `eingang`, data-eingang="schnur" und "lot"). Behälter ist der Abschnitt des Einstiegs (data-motion="eingang"); die
// Ebene steht in einer positionierten Hülle direkt im Abschnitt (bewegung.css: `[data-formel="worum"] > * > .einstieg-lot`).
// Serverkomponente.
import clsx from 'clsx';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Laserachse from '@/components/kern/Laserachse';
import { ACHSE_LAGE, KREUZ_GROESSE, SCHNUR_LAGE } from '@/components/kern/Leitachse';
import { seitenKlassen } from '@/components/kern/stile';

export default function Schnurebene({ stark = false }: { stark?: boolean }) {
  return (
    <div aria-hidden="true" className="einstieg-lot pointer-events-none absolute inset-0">
      <div className={clsx(seitenKlassen, 'relative h-full')}>
        <Laserachse className={ACHSE_LAGE} />
        <span data-eingang="schnur" data-leitachse="" className={clsx('absolute top-0 h-px origin-left bg-laser', stark && 'schnur-linie', SCHNUR_LAGE)} />
      </div>
    </div>
  );
}

/** Rotes Lotstück ab der Schnur; `className` setzt das untere Ende (Abstand zum nächsten Block) */
export function Lotstueck({ className }: { className: string }) {
  return <span aria-hidden="true" data-eingang="lot" data-leitachse="" className={clsx('lot-stueck origin-top max-sm:animate-none', className, ACHSE_LAGE)} />;
}

/** Fuge mit Fugenkreuz am Ende des Lotstücks, ab sm; `lage` ist der Abstand von der Oberkante des Bildblocks (dessen pt) */
export function Aufhaengung({ lage }: { lage: string }) {
  return (
    <>
      <span aria-hidden="true" data-leitachse="" className={clsx('absolute h-px bg-fuge max-sm:hidden', lage, SCHNUR_LAGE)} />
      <Fugenkreuz className={clsx('absolute -translate-1/2 text-tinte max-sm:hidden', lage, KREUZ_GROESSE, ACHSE_LAGE)} />
    </>
  );
}
