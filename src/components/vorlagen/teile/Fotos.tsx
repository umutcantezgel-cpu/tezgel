// Vorlagen · Fotos als verlegte Fläche (KERN v3 K-012; E-023, E-025): echte Fotos mit kurzer Unterschrift in einem
// geraden Raster mit 1-px-Fugen (kein Versatz: den tragen Lage und Ablauf), schmal einspaltig (große Systemschrift: ein
// Foto über die volle Breite), ab 36 rem zweispaltig, ab 64 rem dreispaltig. Serverkomponente.
import clsx from 'clsx';
import Bildfeld from '@/components/kern/Bildfeld';
import type { ArbeitId } from '@/config/arbeiten';

export interface Foto {
  bild: ArbeitId;
  unterschrift: string;
}

export default function Fotos({ fotos, spalten = 3 }: { fotos: Foto[]; spalten?: 1 | 2 | 3 }) {
  return (
    <div className="@container">
      {/* ein einzelnes Foto steht in der Breite einer Textspalte, nicht über die ganze Seite */}
      <ul className={clsx('grid grid-cols-1 gap-px border border-fuge bg-fuge', spalten === 1 ? 'max-w-mass' : '@xl:grid-cols-2', spalten === 3 && '@5xl:grid-cols-3')}>
        {fotos.map((f) => (
          <li key={f.bild} className="bg-kalk">
            <Bildfeld
              arbeit={f.bild}
              sizes={spalten === 3 ? '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw' : spalten === 2 ? '(min-width: 640px) 50vw, 100vw' : '(min-width: 768px) 40rem, 100vw'}
              beschriftung={f.unterschrift}
              flaeche
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
