// Raster der Detail- und Listenseiten (P4-02, KERN v1.2, K-007): Hauptspalte und Randspalte auf dem 12er-Raster.
// Hauptspalte zuerst im DOM (Lesefolge = Tab-Folge, Lehre 7), Randspalte rechts (Desktop 4/12) bzw. darunter (mobil).
// `rand="links"` setzt die Randspalte ab lg nach links (Inhaltsverzeichnis des Artikels), im DOM bleibt sie vorn,
// damit das Verzeichnis vor dem Text gelesen wird. Zwischen den Spalten eine Fuge statt Abstand.
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';

export type RasterProps = {
  haupt: ReactNode;
  neben?: ReactNode;
  /** Lage der Randspalte ab lg */
  rand?: 'rechts' | 'links';
  /** Breite der Randspalte ab lg in Spalten */
  randBreite?: 3 | 4;
  className?: string;
};

export default function Raster({ haupt, neben, rand = 'rechts', randBreite = 4, className }: RasterProps) {
  if (!neben) return <div className={verbinde('min-w-0', className)}>{haupt}</div>;
  const breit = randBreite === 3 ? 'lg:col-span-3' : 'lg:col-span-4';
  const hauptBreit = randBreite === 3 ? 'lg:col-span-9' : 'lg:col-span-8';
  if (rand === 'links') {
    return (
      <div className={verbinde('grid gap-k-7 lg:grid-cols-12 lg:items-start lg:gap-0', className)}>
        <aside className={verbinde('min-w-0 lg:sticky lg:top-(--k-kopf-hoehe) lg:border-r lg:border-k-fuge lg:pr-k-6', breit)}>{neben}</aside>
        <div className={verbinde('min-w-0 lg:pl-k-7', hauptBreit)}>{haupt}</div>
      </div>
    );
  }
  return (
    <div className={verbinde('grid gap-k-7 lg:grid-cols-12 lg:items-start lg:gap-0', className)}>
      <div className={verbinde('min-w-0 lg:border-r lg:border-k-fuge lg:pr-k-7', hauptBreit)}>{haupt}</div>
      <div className={verbinde('min-w-0 lg:self-stretch lg:pl-k-6', breit)}>{neben}</div>
    </div>
  );
}
