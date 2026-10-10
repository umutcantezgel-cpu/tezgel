// Marke im Kopf (Variante B): Logo unverändert (Form, Proportion 140 × 44, Farbe), Größe 128 px breit (= --spacing-k-10,
// 40 px hoch), kein Hover-Zoom. Daneben das Etikett „Fachbetrieb Aßlar · Wetzlar“ (K-012 Klasse 3: Wortlaut bleibt,
// Form Mono-Etikett) – sichtbar von sm bis unter xl; ab xl reicht die Zeile neben fünf Einträgen, Telefon und Hauptknopf
// nicht (gemessen, Rückgabe P3-06b Nachtrag), der Wortlaut steht dort im zugänglichen Namen des Logo-Links. Server-tauglich, keine Hooks.
import Image from 'next/image';
import Link from 'next/link';
import { fokus, verbinde } from '@/components/kern/basis';
import { TEXT } from '@/components/kern/kopf-b/modell';

export default function Marke({ etikett = true }: { etikett?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={TEXT.logoLink}
      className={verbinde('flex h-k-7 shrink-0 items-center gap-k-3 rounded-k-1', fokus('hell'))}
    >
      <Image
        src="/images/logo/tezgel-logo.webp"
        alt={TEXT.logoAlt}
        width={140}
        height={44}
        loading="eager"
        className="h-auto w-k-10 shrink-0"
      />
      {etikett ? (
        <span className="hidden border-l border-k-fuge pl-k-3 k-mono text-k-1 text-k-tinte-2 sm:block xl:hidden">
          {TEXT.ortZeile1}
          <br />
          {TEXT.ortZeile2}
        </span>
      ) : null}
    </Link>
  );
}
