// Vorlagen · Quadratmeter an der Schnur (UM-E3-FIX2 N5, nur Startseite über WorumInhalt.quadratmeter): Strichzeichnung eines
// Quadratmeters mit Bemaßung „100 cm“ in der Zeichensprache der Plan-Vignetten (kern/vignetten: Strich 1,5 px, Enden square,
// Fugen und Maße in Strich, Maßlinien mit Pfeilen und Hilfslinien, Zahlen in Mono wie an der Entfernungsskala). Belegt die H1
// „Perfektion auf jedem Quadratmeter.“: ein Quadratmeter, sauber in vier Platten zu 50 × 50 cm geteilt, die Fugen treffen sich
// mittig. Die rote Schnur darunter ist die Waage; die Fliese steht auf ihr, darum hat die Zeichnung keine Unterkante.
// Lage und Größe (EinstiegMitte): rechts am Ende der Schnur, die rechte Kante über dem Ende der Schnur; so groß wie eine
// Fliese (Stufe 24 = F, wächst mit der Grundschrift). Nur ab lg (in rem: bei großer Systemschrift entfällt sie, statt die
// H1 zu bedrängen; Handy und Tablet hochkant ohnehin nicht): Dort endet die Schnur bei right-8 wie die Zeichnung, und die H1
// steht in fs-7, hoch genug für Zeichnung und Zahl unter dem Kopf der Seite. Nicht flach (Querformat bis 32rem Höhe): Dort
// ist der Block der H1 eine Zeile hoch, die Zeichnung ragte unter den Kopf der Seite (Nacharbeit UM-E3-FIX2).
// Dekorativ (aria-hidden), Inline-SVG mit currentColor und Tokens, absolut gesetzt: kein Platz im Fluss (kein CLS), kein
// Bild, kein Abruf; die Zahlen sind kleiner als jede Zeile der H1 und das Foto, nie LCP-Element.
// Eingang (bewegung.css „eingang“, Kennung eingang): Wenn die Schnur steht, zeichnen sich die Kanten (links hoch, oben nach
// rechts, rechts herab), dann setzen sich Fugen, Maße und Zahlen. Ruhig, reduziert, ohne JavaScript und in der Wiederkehr
// steht sie fertig. Serverkomponente.
import clsx from 'clsx';
import { Linie } from '@/components/kern/vignetten/zeichnen';

// Zeichenfläche 96 × 96 (eine Fliese), Maße außerhalb (overflow sichtbar), Strich 1,5 px um 0,75 eingerückt
const LINKS = 'M0.75 96V0.75';
const OBEN = 'M0.75 0.75H95.25';
const RECHTS = 'M95.25 0.75V96';
const FUGEN = 'M48 0.75V96M0.75 48H95.25';
// Maßlinie oben 12 über der Kante mit Pfeilen an beiden Enden und Hilfslinien; links 12 vor der Kante bis auf die Schnur
// (unten ist die Schnur selbst die Hilfslinie)
const MASS =
  'M0.75 -12H95.25M5.75 -17L0.75 -12L5.75 -7M90.25 -17L95.25 -12L90.25 -7M0.75 -4V-20M95.25 -4V-20' +
  'M-12 0.75V96M-17 5.75L-12 0.75L-7 5.75M-17 91L-12 96L-7 91M-4 0.75H-20';

export default function Quadratmeter({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={clsx('pointer-events-none size-24', className)}>
      <svg
        viewBox="0 0 96 96"
        className="absolute inset-0 size-full overflow-visible"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <g data-eingang="mass" className="text-strich">
          <Linie d={FUGEN} />
          <Linie d={MASS} />
        </g>
        <g className="text-tinte">
          <Linie data-eingang="kante-links" d={LINKS} />
          <Linie data-eingang="kante-oben" d={OBEN} />
          <Linie data-eingang="kante-rechts" d={RECHTS} />
        </g>
      </svg>
      <span data-eingang="mass" className="absolute inset-x-0 -top-12 text-center font-mono text-fs-1 whitespace-nowrap text-tinte-2">
        100 cm
      </span>
      <span data-eingang="mass" className="absolute top-1/2 -left-8 -translate-1/2 font-mono text-fs-1 whitespace-nowrap text-tinte-2">
        <span className="block -rotate-90">100 cm</span>
      </span>
    </div>
  );
}
