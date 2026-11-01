// Großer Moment `gefaelle-dusche` (KERN v3.4 K-007, K-008; E3-GRAF-03; Schlitz `momente.tun` der ErzaehlSeite auf
// /bad/barrierefreies-bad): Schnitt durch eine Dusche ohne Stufe. Der Badboden geht ohne Kante in den Duschboden über, der
// sich zum Ablauf an der Wand neigt (Neigung übertrieben, gestrichelt die Waagrechte). Beim Eintritt (Sicht 0,4) läuft ein
// Tropfen über das Gefälle in den Ablauf und bleibt dort liegen, die drei Pfeile legen sich hinter ihm hin (CSS in
// bewegung.css, Auslöser im Bewegungsmodul). Ohne JavaScript, reduziert, im Notaus, im Druck und bei erzwungenen Farben: Pfeile
// stehen, der Tropfen liegt im Ablauf (UM-E4-SICHT-FIX-2 M2-A10, Endzustand wie gefaelle-balkon; vorher kein Tropfen).
// Zeichenmittel aus kern/vignetten/zeichnen (1,5 px, currentColor, Fugen und Schnitt in Strich, kein Rot).
// `breit` (UM-E4-SICHT-FIX M-C9, /bad/barrierefreies-bad; Sicht Anlauf 1: die Zeichnung kam im Lesemaß nicht als Blickfang an):
// das Feld in voller Rasterbreite, die Zeichnung darin ab xl höchstens drei Viertel breit (Prüfung SF-C3: so steht das Feld nach
// dem Sprung an den Abschnitt bei d1440 und d1920 ganz im Fenster),
// die Unterschrift im Satz rechts (Spalten 2 bis 3) wie die Liste danach (`tun.satz`).
// Ohne `breit` mittig im Lesemaß wie bisher. Serverkomponente ohne Client-Code.
import clsx from 'clsx';
import { Satzblock, satzMass } from '@/components/kern/Abschnitt';
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { PFADE, PFEILE, SCHNITT_FLAECHEN, VIEWBOX, pfeilEntlang, tropfenPfad } from './geometrie';

const SCHNITT = SCHNITT_FLAECHEN.map(([x, y, b, h, abstand]) => schraffur(x, y, b, h, abstand)).join('');

/** Name der Zeichnung für Screenreader (role="img") */
export const ZEICHNUNG_NAME =
  'Zeichnung einer Dusche ohne Stufe, von der Seite gesehen. Der Boden neigt sich zum Ablauf an der Wand. Pfeile zeigen, wohin das Wasser fließt.';

export default function GefaelleDusche({ breit = false }: { breit?: boolean }) {
  return (
    <figure data-motion="gefaelle-dusche" className={clsx('text-tinte', !breit && 'mx-auto max-w-mass')}>
      <div role="img" aria-label={ZEICHNUNG_NAME} className="border border-fuge bg-fliese p-4 lg:p-6">
        <Planrahmen viewBox={VIEWBOX} className={breit ? 'mx-auto xl:max-w-3/4' : undefined}>
          <g className="text-strich">
            <Linie d={SCHNITT} />
            <Linie d={PFADE.fugen} />
            <Linie d={PFADE.waage} strokeDasharray="4 4" />
          </g>
          {/* der Tropfen liegt unter den Kanten der Rinne: er sinkt in den Ablauf */}
          <path className="gefaelle-tropfen" d={tropfenPfad()} fill="currentColor" stroke="none" />
          <Linie d={PFADE.kanten} />
          <Linie d={PFADE.rinne} />
          <Linie d={PFADE.belag} />
          <Linie d={PFADE.brause} />
          <g>
            {PFEILE.map(([xa, xb]) => (
              <Linie key={xa} className="gefaelle-pfeil" d={pfeilEntlang(xa, xb)} />
            ))}
          </g>
        </Planrahmen>
      </div>
      <figcaption className={clsx('mt-4', !breit && 'font-text text-fs-3 text-pretty text-tinte-2')}>
        {breit ? (
          // im Block auf der Kopfachse wie Einleitung und Punkte (Satzspiegel v2, UM-E4-SICHT-FIX-2 M2-A1 Nr. 5), das Lesemaß in
          // ch der eigenen Stufe am Satz selbst (max-w-mass, E-065; der Block ist ab lg die Breite)
          <Satzblock satz="achse">
            <div className={satzMass('achse')}>
              <p className="max-w-mass font-text text-fs-3 text-pretty text-tinte-2">Das Wasser läuft von selbst zum Ablauf.</p>
            </div>
          </Satzblock>
        ) : (
          <p>Das Wasser läuft von selbst zum Ablauf.</p>
        )}
      </figcaption>
    </figure>
  );
}
