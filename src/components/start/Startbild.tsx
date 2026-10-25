// Startbild mit großem Moment `startbild` (KERN v3 K-007, E2-ORCH-06b; E-037): das echte Foto der Dusche ohne Stufe
// (Bildplatz start-dusche), darüber ein Belag aus Fliesen, der Reihe für Reihe nach links abzieht, sobald das Foto zu 40 %
// im Blick ist (data-motion="startbild", Register: Sicht; nur unter lg, ab lg steht das Foto unter der Waage sofort frei).
// Hohe Ladepriorität nur auf Wunsch (`lcp`): im mittigen Einstieg der Startseite (K-016) ist das Foto das LCP-Element (E-061).
// Der Belag ist reines CSS (bewegung.css) und steht nur unter html.k-startbild (Kopfskript: Bewegung erlaubt und kein Intro;
// der erste Seitenwechsel nimmt die Klasse weg). Ohne Klasse, reduziert, ohne Bewegungsmodul, im Druck und ohne JavaScript ist
// das Bild sofort sichtbar. Der Belag ist dekorativ und kein LCP-Kandidat (nur Flächen und Verläufe).
import type { CSSProperties } from 'react';
import Bildfeld from '@/components/kern/Bildfeld';
import { startbildReihen } from '@/lib/motion/startbild';

const REIHEN = startbildReihen();

type Stil = CSSProperties & Record<`--${string}`, number>;

export default function Startbild({ sizes, lcp = false }: { sizes: string; lcp?: boolean }) {
  return (
    <div className="relative" data-motion="startbild">
      <Bildfeld arbeit="start-dusche" lcp={lcp} sizes={sizes} />
      <div aria-hidden="true" className="startbild-decke">
        {REIHEN.map((r) => (
          <span
            key={r.k}
            className="startbild-reihe"
            style={{ '--k': r.k, '--v': r.versatz, '--a': r.beginn, '--d': r.dauer } as Stil}
          />
        ))}
      </div>
    </div>
  );
}
