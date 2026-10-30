// Vorlagen · Quadratmeter an der Schnur (UM-E3-FIX2 N5, nur Startseite über WorumInhalt.quadratmeter): Strichzeichnung eines
// Quadratmeters mit Bemaßung „100 cm“ in der Zeichensprache der Plan-Vignetten (kern/vignetten: Strich 1,5 px, Enden square,
// Fugen und Maße in Strich, Maßlinien mit Pfeilen und Hilfslinien, Zahlen in Mono wie an der Entfernungsskala). Belegt die H1
// „Perfektion auf jedem Quadratmeter.“: ein Quadratmeter, sauber in vier Platten zu 50 × 50 cm geteilt, die Fugen treffen sich
// mittig. Die rote Schnur darunter ist die Waage; die Fliese steht auf ihr, darum hat die Zeichnung keine Unterkante.
// Lage und Größe (UM-E4-START, Sicht Anlauf 3: vorher 250 bis 300 px rechts von „Quadratmeter.“ am Rand der Schnur, mobil gar
// nicht): direkt hinter „Quadratmeter.“ auf der Schnur, in der Schriftgröße der H1-Zeilen gemessen (EinstiegMitte setzt sie
// in derselben Stufe daneben): ab lg so hoch wie die H1 (1,8em, rund zwei Zeilen) mit Maß oben und links, darunter eine
// Zeilenhöhe mit Maß nur oben
// (links stünde es im Wortabstand zur H1). Ohne Höhe im Fluss: Die Unterkante ist die Grundlinie der letzten Zeile, also die
// Schnur; Zeichnung und Zahlen ragen darüber auf (globals.css „quadratmeter“). Flach (Querformat bis 32rem Höhe)
// fließt die H1 als ein Satz; dort steht nur die Fliese in Zeilenhöhe ohne Bemaßung (Nacharbeit UM-E4-START).
// Dekorativ (aria-hidden am Platz in EinstiegMitte), Inline-SVG mit currentColor und Tokens: kein Bild, kein Abruf; die Zahlen
// sind kleiner als jede Zeile der H1 und das Foto, nie LCP-Element. Die Zahlen stehen außerhalb der H1 (ihr Text bleibt der
// Wortlaut, A-1).
// Eingang (bewegung.css „eingang“, Kennung eingang): Wenn die Schnur steht, zeichnen sich die Kanten (links hoch, oben nach
// rechts, rechts herab), dann setzen sich Fugen, Maße und Zahlen. Ruhig, reduziert, ohne JavaScript und in der Wiederkehr
// steht sie fertig. Serverkomponente.
import { Linie } from '@/components/kern/vignetten/zeichnen';

// Zeichenfläche 96 × 96 (eine Fliese), Maße außerhalb (overflow sichtbar), Strich 1,5 px um 0,75 eingerückt
const LINKS = 'M0.75 96V0.75';
const OBEN = 'M0.75 0.75H95.25';
const RECHTS = 'M95.25 0.75V96';
const FUGEN = 'M48 0.75V96M0.75 48H95.25';
// Maßlinie oben 12 über der Kante mit Pfeilen an beiden Enden und Hilfslinien; links 12 vor der Kante bis auf die Schnur
// (unten ist die Schnur selbst die Hilfslinie)
const MASS_OBEN = 'M0.75 -12H95.25M5.75 -17L0.75 -12L5.75 -7M90.25 -17L95.25 -12L90.25 -7M0.75 -4V-20M95.25 -4V-20';
const MASS_LINKS = 'M-12 0.75V96M-17 5.75L-12 0.75L-7 5.75M-17 91L-12 96L-7 91M-4 0.75H-20';

export default function Quadratmeter() {
  return (
    <div className="quadratmeter pointer-events-none">
      <svg
        viewBox="0 0 96 96"
        className="quadratmeter-zeichnung"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <g data-eingang="mass" className="text-strich">
          <Linie d={FUGEN} />
          <Linie d={MASS_OBEN} className="quadratmeter-mass-oben" />
          <Linie d={MASS_LINKS} className="quadratmeter-seite" />
        </g>
        <g className="text-tinte">
          <Linie data-eingang="kante-links" d={LINKS} />
          <Linie data-eingang="kante-oben" d={OBEN} />
          <Linie data-eingang="kante-rechts" d={RECHTS} />
        </g>
      </svg>
      <span data-eingang="mass" className="quadratmeter-zahl-oben">
        <span className="block font-mono text-fs-1 whitespace-nowrap text-tinte-2">100 cm</span>
      </span>
      <span data-eingang="mass" className="quadratmeter-seite quadratmeter-zahl-seite">
        <span className="block font-mono text-fs-1 whitespace-nowrap text-tinte-2">100 cm</span>
      </span>
    </div>
  );
}
