// Intro B-02 als Ersatz „Der erste Boden“ (KERN K-007, E-018): Kalkblatt mit Fugenraster, in der Mitte legt sich eine
// kleine Fläche im Drittelverband, darauf erscheint das Logo (dieselbe Datei wie im Kopf, über den Bildoptimierer); dann
// gleitet es an den Platz des Kopf-Logos, und das Blatt zieht Reihe für Reihe nach links ab (wie B-01). Serverkomponente
// ohne JavaScript im Browser: Die Schicht steht
// im HTML, ist ohne html.k-intro per Inline-Stil verborgen und läuft als CSS ab dem ersten Bild (bewegung.css). Die Zeiten
// kommen als Anteile von --intro-gesamt aus der Ablauf-Logik. Das Blatt besteht nur aus Flächen und Verläufen; einziges
// Bild ist das Logo (lazy: ohne Intro bleibt die Schicht verborgen und lädt nichts; mit Intro holt es das Kopfskript
// sofort). In schmalen Querformaten kann es das größte Element des ersten Bilds sein und zählt dann als LCP.
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { INTRO_LOGO, REIHEN, introAblauf } from '@/lib/intro/ablauf';
import { FLUG_ANTEIL, GROESSE_FLUG } from '@/lib/verlegen/raster';

const ABLAUF = introAblauf();

type Stil = CSSProperties & Record<`--${string}`, number | string>;

function takt(beginn: number, dauer: number): Record<'--a' | '--d', number> {
  return { '--a': beginn, '--d': dauer };
}

export default function Intro() {
  const wurzel: Stil = { display: 'none', '--intro-flug': FLUG_ANTEIL, '--intro-gross': GROESSE_FLUG };
  return (
    <div className="intro" aria-hidden="true" style={wurzel}>
      {ABLAUF.reihen.map((r) => (
        <div key={r.k} className="intro-reihe" style={{ '--k': r.k, '--v': r.versatz, ...takt(r.beginn, r.dauer) } as Stil}>
          {r.k >= 0 && r.k < REIHEN && (
            <div className="intro-flaeche">
              {ABLAUF.fliesen
                .filter((f) => f.reihe === r.k)
                .map((f) => (
                  <span
                    key={f.links}
                    className="intro-fliese"
                    style={{ '--x': f.links, zIndex: f.ebene, ...takt(f.beginn, f.dauer) } as Stil}
                  />
                ))}
            </div>
          )}
        </div>
      ))}
      {/* INTRO_ZIEL (lib/motion/kopfskript.ts) setzt --intro-x, --intro-y und --intro-s vor der Hydrierung: erwartete Abweichung */}
      <div className="intro-schild" suppressHydrationWarning style={takt(ABLAUF.gleiten.beginn, ABLAUF.gleiten.dauer) as Stil}>
        <Image
          className="intro-logo"
          src={INTRO_LOGO}
          alt=""
          width={640}
          height={200}
          unoptimized
          loading="lazy"
          style={takt(ABLAUF.logo.beginn, ABLAUF.logo.dauer) as Stil}
        />
      </div>
    </div>
  );
}
