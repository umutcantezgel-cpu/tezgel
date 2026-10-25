// Großer Moment `gefaelle-dusche` (KERN v3.4 K-007, K-008; E3-GRAF-03; Schlitz `momente.tun` der ErzaehlSeite auf
// /bad/barrierefreies-bad): Schnitt durch eine Dusche ohne Stufe. Der Badboden geht ohne Kante in den Duschboden über, der
// sich zum Ablauf an der Wand neigt (Neigung übertrieben, gestrichelt die Waagrechte). Beim Eintritt (Sicht 0,4) läuft ein
// Tropfen über das Gefälle in den Ablauf, die drei Pfeile legen sich hinter ihm hin (CSS in bewegung.css, Auslöser im
// Bewegungsmodul). Ohne JavaScript, reduziert, im Notaus, im Druck und bei erzwungenen Farben: Pfeile stehen, kein Tropfen.
// Zeichenmittel aus kern/vignetten/zeichnen (1,5 px, currentColor, Fugen und Schnitt in Strich, kein Rot).
// Serverkomponente ohne Client-Code.
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { PFADE, PFEILE, SCHNITT_FLAECHEN, VIEWBOX, pfeilEntlang, tropfenPfad } from './geometrie';

const SCHNITT = SCHNITT_FLAECHEN.map(([x, y, b, h, abstand]) => schraffur(x, y, b, h, abstand)).join('');

/** Name der Zeichnung für Screenreader (role="img") */
export const ZEICHNUNG_NAME =
  'Zeichnung einer Dusche ohne Stufe, von der Seite gesehen. Der Boden neigt sich zum Ablauf an der Wand. Pfeile zeigen, wohin das Wasser fließt.';

export default function GefaelleDusche() {
  return (
    <figure data-motion="gefaelle-dusche" className="mx-auto max-w-mass text-tinte">
      <div role="img" aria-label={ZEICHNUNG_NAME} className="border border-fuge bg-fliese p-4 lg:p-6">
        <Planrahmen viewBox={VIEWBOX}>
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
      <figcaption className="mt-4 font-text text-fs-3 text-pretty text-tinte-2">
        <p>Das Wasser läuft von selbst zum Ablauf.</p>
      </figcaption>
    </figure>
  );
}
