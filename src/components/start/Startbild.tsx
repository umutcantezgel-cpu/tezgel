// Startbild mit großem Moment `startbild` (KERN v3 K-007, E2-ORCH-06b): das echte Foto der Dusche ohne Stufe (Bildplatz
// start-dusche, einziges Bild mit hoher Ladepriorität, E-034), darüber beim Laden ein Belag aus Fliesen, der Reihe für Reihe nach links abzieht.
// Der Belag ist reines CSS ab dem ersten Bild (bewegung.css) und steht nur unter html.k-startbild (Kopfskript: Bewegung
// erlaubt und kein Intro; der erste Seitenwechsel nimmt die Klasse weg). Ohne Klasse, reduziert, im Druck und ohne
// JavaScript ist das Bild sofort sichtbar. Der Belag ist dekorativ und kein LCP-Kandidat (nur Flächen und Verläufe).
import type { CSSProperties } from 'react';
import Bildfeld from '@/components/kern/Bildfeld';
import { startbildReihen } from '@/lib/motion/startbild';

const REIHEN = startbildReihen();

type Stil = CSSProperties & Record<`--${string}`, number>;

export default function Startbild({ sizes }: { sizes: string }) {
  return (
    <div className="relative">
      <Bildfeld arbeit="start-dusche" lcp sizes={sizes} />
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
