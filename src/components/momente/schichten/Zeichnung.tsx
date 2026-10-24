// Zeichnung des großen Moments „schichten“ (E3-GRAF-01): Schnitt durch einen Boden im Bad in der Zeichensprache der
// Plan-Vignetten (kern/vignetten/zeichnen.tsx: Strich 1,5 px non-scaling, currentColor, Schraffur als Linien, keine IDs,
// kein Text). Von unten: Untergrund schraffiert (liegt von Anfang an), Abdichtung als dunkles Band, Kleber mit Zahnung,
// Fugen gefüllt, vier Fliesen. Kein Rot: das eine Rot je Bildschirm trägt die Leitachse (wie SzeneAblauf). Bewegte Teile
// tragen data-motion="schichten" und eine Klasse für bewegung.css. Dekorativ (aria-hidden über Planrahmen), den Inhalt
// tragen Bildunterschrift und Liste. Dazu die Legende je Schicht (Schichtmuster). Serverkomponente.
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { FLIESE_B, FLIESEN_X, FUGEN_X, ZEICHNUNG, schicht, zickzack, type SchichtKennung } from './daten';

const { breite, hoehe, links, rechts, fuge } = ZEICHNUNG;
const BREITE = rechts - links;
const U = schicht('untergrund');
const A = schicht('abdichtung');
const K = schicht('kleber');
const F = schicht('fliese');
const FH = F.unten - F.oben;

export default function Schichtzeichnung() {
  return (
    <Planrahmen viewBox={`0 0 ${breite} ${hoehe}`}>
      {/* Untergrund: Schraffur in Strich, Kante in Tinte; liegt von Anfang an (ohne Bewegung) */}
      <g className="text-strich">
        <Linie d={schraffur(links, U.oben, BREITE, U.unten - U.oben, 8)} />
      </g>
      <Linie d={`M${links} ${U.oben}H${rechts}V${U.unten}H${links}Z`} />
      {/* Abdichtung: dunkles Band, streicht sich von links auf */}
      <g data-motion="schichten" className="schichten-abdichtung text-tinte-2">
        <path d={`M${links} ${A.oben}H${rechts}V${A.unten}H${links}Z`} fill="currentColor" stroke="none" />
      </g>
      {/* Kleber: Zahnung des Kammspachtels, Täler auf der Abdichtung, Spitzen knapp unter den Fliesen */}
      <g data-motion="schichten" className="schichten-kleber text-strich">
        <Linie d={zickzack(links, rechts, K.unten, K.oben + 2, 4)} />
      </g>
      {/* Fugen: gefüllt in Strich, füllen sich von unten; unter den Fliesenkanten gezeichnet */}
      <g data-motion="schichten" className="schichten-fugen text-strich">
        {FUGEN_X.map((x) => (
          <path key={x} d={`M${x} ${F.oben}h${fuge}v${FH}h${-fuge}Z`} fill="currentColor" stroke="none" />
        ))}
      </g>
      {/* Fliesen: vier Umrisse in Tinte, legen sich Fliese für Fliese */}
      <g className="schichten-fliesen">
        {FLIESEN_X.map((x) => (
          <Linie key={x} data-motion="schichten" className="schichten-fliese" d={`M${x} ${F.oben}h${FLIESE_B}v${FH}h${-FLIESE_B}Z`} />
        ))}
      </g>
    </Planrahmen>
  );
}

/** Legende: dasselbe Zeichen jeder Schicht im Kleinen (48 × 24), so finden Liste und Zeichnung ohne Text im Bild zusammen */
export function Schichtmuster({ kennung }: { kennung: SchichtKennung }) {
  return (
    <Planrahmen viewBox="0 0 48 24">
      {kennung === 'untergrund' && (
        <>
          <g className="text-strich">
            <Linie d={schraffur(2, 6, 44, 16, 6)} />
          </g>
          <Linie d="M2 6H46V22H2Z" />
        </>
      )}
      {kennung === 'abdichtung' && <path d="M2 12H46V16H2Z" className="text-tinte-2" fill="currentColor" stroke="none" />}
      {kennung === 'kleber' && (
        <g className="text-strich">
          <Linie d={zickzack(4, 44, 18, 10, 4)} />
        </g>
      )}
      {kennung === 'fliese' && <Linie d="M2 8h20v12H2ZM26 8h20v12H26Z" />}
      {/* Fuge: die Fuge dunkel, die Fliesen daneben nur angedeutet (sonst sähe die Legende aus wie die der Fliese) */}
      {kennung === 'fuge' && (
        <>
          <g className="text-strich">
            <Linie d="M2 8h20v12H2ZM26 8h20v12H26Z" />
          </g>
          <path d="M22 8h4v12h-4Z" className="text-tinte-2" fill="currentColor" stroke="none" />
        </>
      )}
    </Planrahmen>
  );
}
