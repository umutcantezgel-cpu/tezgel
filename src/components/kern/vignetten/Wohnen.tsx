import { Linie, Planrahmen, gleich, schraffur, type VignetteProps } from '@/components/kern/vignetten/zeichnen';

// Vignette „wohnen“ (P3-10, K-010): Draufsicht eines Raums, Großformat 2 : 1 im Drittelverband (Reihenversatz 1/3 Platte).
// Die Achse (Waage) läuft mittig durch den Raum und liegt auf einer Fuge – in Strichgrau, nicht rot: seit die Leitachse
// über die Erzählansichten läuft, trägt sie das eine Rot je Bildschirm (E3-NACH-02, Rückgabe E3-BAU-02).
// Passstücke an den Reihenenden schraffiert, Bemaßung links: Achse mittig („=“ über und unter ihr). Türöffnung unten.
const X0 = 24;
const X1 = 228;
const Y0 = 16;
const PLATTE = 48;
const REIHE = 24;

function verband() {
  let fugen = '';
  let passstuecke = '';
  for (let reihe = 0; reihe < 4; reihe++) {
    const y = Y0 + reihe * REIHE;
    const stoesse: number[] = [];
    // Erster Stoß 14 / 30 / 46 Einheiten vom Rand: jedes Passstück mindestens 14 breit (keine Splitter).
    for (let x = X0 + ((14 + (reihe * PLATTE) / 3) % PLATTE); x < X1; x += PLATTE) stoesse.push(x);
    for (const x of stoesse) fugen += `M${x} ${y}v${REIHE}`;
    const erster = stoesse[0];
    const letzter = stoesse[stoesse.length - 1];
    passstuecke += schraffur(X0, y, erster - X0, REIHE) + schraffur(letzter, y, X1 - letzter, REIHE);
    if (reihe > 0) fugen += `M${X0} ${y}H${X1}`;
  }
  return { fugen, passstuecke };
}

const { fugen: FUGEN, passstuecke: PASSSTUECKE } = verband();
const MASS = `M12 16V112M8 16h8M8 64h8M8 112h8${gleich(4, 40)}${gleich(4, 88)}`;

export default function VignetteWohnen({ className, fuellen }: VignetteProps) {
  return (
    <Planrahmen viewBox="0 0 240 128" className={className} fuellen={fuellen}>
      <g className="text-strich">
        <Linie d={PASSSTUECKE} />
        <Linie d={FUGEN} />
      </g>
      {/* Wände mit Türöffnung unten */}
      <Linie d="M84 112H228V16H24V112H48" />
      <Linie d={MASS} />
      {/* Achse (Waage) durch den Raum, auf der mittleren Fuge */}
      <g className="text-strich">
        <Linie d="M18 64H236" />
      </g>
    </Planrahmen>
  );
}
