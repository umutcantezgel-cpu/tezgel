// Logo-Feld des Kopfs (Variante A): Link zur Startseite mit dem Logo (Form, Proportion 140 × 44 und Farbe unverändert,
// kein Hover-Zoom) und – wo Platz ist – dem Etikett „Fachbetrieb Aßlar · Wetzlar“ als eigenem Feld (K-012 Klasse 3:
// Wortlaut bleibt, Form wird Mono-Etikett). Server-Komponente.
import Image from 'next/image';
import Link from 'next/link';
import Etikett from '@/components/kern/basis/Etikett';
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import { TEXTE } from '@/components/kern/kopf-a/texte';

export type LogoFeldProps = {
  /** Sichtbarkeit des Orts-Etiketts je Breite (Klassen am Etikett-Feld). */
  etikett?: string;
  /** Bild sofort laden (Kopf im ersten Bildschirm); im Mobilblatt verzögert. */
  sofort?: boolean;
};

export default function LogoFeld({ etikett = 'hidden', sofort = false }: LogoFeldProps) {
  return (
    <Link
      href="/"
      aria-label={TEXTE.logoLink}
      className={verbinde('flex h-full shrink-0 border-r border-k-fuge', fokus('hell'))}
    >
      <span className="flex h-full items-center px-k-4">
        <Image
          src="/images/logo/tezgel-logo.webp"
          alt={TEXTE.logoAlt}
          width={140}
          height={44}
          loading={sofort ? 'eager' : 'lazy'}
          className="h-k-7 w-auto shrink-0 lg:h-k-6 2xl:h-k-7"
        />
      </span>
      <span className={verbinde('h-full items-center border-l border-k-fuge px-k-4', etikett)}>
        <Etikett>
          {TEXTE.ortZeile1}
          <br />
          {TEXTE.ortZeile2}
        </Etikett>
      </span>
    </Link>
  );
}
