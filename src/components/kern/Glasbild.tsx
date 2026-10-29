// Glasbild (KERN v3.6 K-016 „Ruhe“, E-047): ein Foto vollständig, ohne Unterschrift darunter. Beim Darüberfahren oder mit
// dem Fokus dunkelt eine Glasfläche das Foto ab und zeigt den Namen und den Weg zur passenden Leistungsseite (CSS in
// bewegung.css, Block glasbild); ohne Maus steht der Name immer unten auf einem Verlauf. Der Alt-Text kommt aus dem
// Bildplatz (arbeiten.ts), der Name ist der sichtbare Text des Links. Foto und Fläche liegen in derselben Rasterzelle:
// Ist der Name bei großer Systemschrift höher als das Foto, wächst die Kachel nach unten mit, statt ihn über die
// Fotokante zu schieben; der Verlauf hängt am Text und steht so immer hinter ihm.
// Zeiger (Cursor-Zustand „ansehen“, src/lib/motion/cursor.ts): Über einem Foto mit Weg zeigt das Schild nur das Fugenkreuz,
// ohne Wort (data-cursor-text=""). Die Glasfläche sagt „Ansehen →“ schon direkt darunter; vorher stand dieselbe Handlung
// doppelt da (Sichtabnahme E3 Anlauf 3, Prüfer 1, gering; Entscheidung UM-E4-VORL). Das Wort bleibt so an einer Stelle, die
// Maus, Tastatur und Touch gleich sehen, und das Kreuz zeigt weiter an, dass das Foto ein Ziel ist. Serverkomponente.
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Bildfeld from '@/components/kern/Bildfeld';
import { mitFugen } from '@/components/kern/zusammen';
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

/** Foto oben in der gemeinsamen Zelle, in seinem eigenen Seitenverhältnis (K-012) */
const FOTO = 'col-start-1 row-start-1 self-start';

export default function Glasbild({ arbeit, name, href, linkText = 'Ansehen', sizes }: GlasbildProps) {
  // Lage im Raster (Zelle des Fotos, ohne Maus in schmaler Kachel darunter) steht in bewegung.css, Block glasbild: eine
  // Tailwind-Klasse wie row-start-1 gewönne dort über die Regel (Ebene utilities vor components)
  const flaeche = (
    <span aria-hidden={href ? undefined : true} className="glasbild-flaeche pointer-events-none flex flex-col justify-end text-kalk">
      <span className="glasbild-text flex flex-col px-4 pb-4 lg:px-6 lg:pb-6">
        <span className="font-text text-fs-4 font-semibold text-pretty">{mitFugen(name)}</span>
        {href && (
          <span className="mt-2 inline-flex items-center gap-2 font-text text-fs-2">
            {linkText}
            <Icon name="pfeil-rechts" groesse={4} />
          </span>
        )}
      </span>
    </span>
  );
  if (!href) {
    return (
      <div className="glasbild grid">
        <Bildfeld arbeit={arbeit} sizes={sizes} flaeche className={FOTO} />
        {flaeche}
      </div>
    );
  }
  // Fokus auf dem Foto, auf jedem Grund sichtbar: beide Ringe liegen innerhalb des Links auf einem Pseudo-Element in derselben
  // Rasterzelle, über der Glasfläche (die beim Fokus aufblendet). Außen Tinte (inset-ring), innen Kalk (Umriss, Versatz -4).
  // So deckt weder die Glasfläche noch eine Nachbarkachel der Galerie einen Ring ab (Prüfung UM-E3-ZUST).
  return (
    <Link
      href={href}
      data-motion="zustand"
      data-cursor="ansehen"
      data-cursor-text=""
      className="glasbild grid focus-visible:outline-hidden after:pointer-events-none after:relative after:col-start-1 after:row-start-1 focus-visible:after:inset-ring-2 focus-visible:after:inset-ring-tinte focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-kalk"
    >
      <Bildfeld arbeit={arbeit} sizes={sizes} flaeche className={FOTO} />
      {flaeche}
    </Link>
  );
}
