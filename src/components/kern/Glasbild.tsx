// Glasbild (KERN v3.6 K-016 „Ruhe“, E-047): ein Foto vollständig, ohne Unterschrift darunter. Beim Darüberfahren oder mit
// dem Fokus dunkelt eine Glasfläche das Foto ab und zeigt den Namen und den Weg zur passenden Leistungsseite (CSS in
// bewegung.css, Block glasbild); ohne Maus steht der Name immer unten auf einem Verlauf. Der Alt-Text kommt aus dem
// Bildplatz (arbeiten.ts), der Name ist der sichtbare Text des Links. Serverkomponente.
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Bildfeld from '@/components/kern/Bildfeld';
import type { ArbeitId } from '@/config/arbeiten';

export interface GlasbildProps {
  arbeit: ArbeitId;
  /** sichtbarer Name auf der Glasfläche, z. B. „Dusche ohne Stufe“ */
  name: string;
  /** Leistungsseite zum Foto; ohne Link nur der Name */
  href?: string;
  /** Wort des Links, Standard „Ansehen“ */
  linkText?: string;
  sizes: string;
}

export default function Glasbild({ arbeit, name, href, linkText = 'Ansehen', sizes }: GlasbildProps) {
  const flaeche = (
    <span aria-hidden={href ? undefined : true} className="glasbild-flaeche pointer-events-none absolute inset-0 flex flex-col justify-end p-4 text-kalk lg:p-6">
      <span className="font-text text-fs-4 font-semibold text-pretty">{name}</span>
      {href && (
        <span className="mt-2 inline-flex items-center gap-2 font-text text-fs-2">
          {linkText}
          <Icon name="pfeil-rechts" groesse={4} />
        </span>
      )}
    </span>
  );
  if (!href) {
    return (
      <div className="glasbild relative">
        <Bildfeld arbeit={arbeit} sizes={sizes} flaeche />
        {flaeche}
      </div>
    );
  }
  return (
    <Link href={href} data-motion="zustand" className="glasbild relative block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinte">
      <Bildfeld arbeit={arbeit} sizes={sizes} flaeche />
      {flaeche}
    </Link>
  );
}
