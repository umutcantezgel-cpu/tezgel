// Startseite · 3 Was wir tun (KERN v3 K-009, K-011, K-012; Text REF-start): ein Absatz in Alltagssprache mit dem Fachwort
// „Untergrund“ samt Erklärung, vier Bereiche als Zeilen an der Fuge (je ein Link mit einem Verlegemuster aus dem
// Formsystem statt eines Strichsymbols: großes Format, Drittelverband, Halbverband, der Riss; unter 20 rem Zeilenbreite
// entfällt das Muster, damit der Name die Breite behält), darunter drei Belege aus dem
// Faktenblatt (K-015) als Zeilen an der Fuge (die Erklärungen der Fachwörter brauchen die Zeilenlänge). Kopf seitlich,
// damit dieser Abschnitt anders gebaut ist als die Lage davor.
// Serverkomponente.
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Fachwort from '@/components/kern/Fachwort';
import Fliesenkomposition, { type Kompositionsmotiv } from '@/components/kern/Fliesenkomposition';
import Fugenkreuz from '@/components/kern/Fugenkreuz';

const BEREICHE: { name: string; href: string; motiv: Kompositionsmotiv }[] = [
  { name: 'Badsanierung und neue Dusche', href: '/bad', motiv: 'kreuzfuge' },
  { name: 'Böden und Wände in Haus und Wohnung', href: '/leistungen/wohnen', motiv: 'drittelverband' },
  { name: 'Balkon, Terrasse und Treppen', href: '/balkon-terrasse', motiv: 'halbverband' },
  { name: 'Reparatur von Fliesen und Fugen', href: '/fliesenreparatur', motiv: 'riss' },
];

export default function WasWirTun() {
  return (
    <Abschnitt
      id="was-wir-tun"
      formel="tun"
      leitachse
      kopf="seitlich"
      titel="Wir kümmern uns um alles, was mit Fliesen zu tun hat."
      einleitung={
        <p>
          Wir nehmen alte Fliesen heraus und bereiten den <Fachwort id="untergrund">Untergrund</Fachwort> vor. Dann verlegen wir
          neue Fliesen, auch große Fliesen mit wenigen Fugen. Am Ende ist alles sauber, und Sie können Ihren Raum wieder
          nutzen.
        </p>
      }
    >
      <ul className="@container border-t border-fuge">
        {BEREICHE.map((b) => (
          <li key={b.href} className="border-b border-fuge">
            <Link
              href={b.href}
              data-motion="zustand"
              className="group flex min-h-16 items-center gap-4 py-4 text-tinte lg:gap-6 lg:py-6"
            >
              <span aria-hidden="true" className="hidden size-16 shrink-0 border border-fuge @xs:block">
                <Fliesenkomposition motiv={b.motiv} ausschnitt={48} fuellen />
              </span>
              <span className="min-w-0 flex-1 font-anzeige text-fs-5 font-extrabold hyphens-none underline decoration-transparent decoration-2 underline-offset-8 transition-colors dauer-1 group-hover:decoration-laser">
                {b.name}
              </span>
              <Icon name="pfeil-rechts" groesse={6} className="shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte" />
            </Link>
          </li>
        ))}
      </ul>
      {/* schmal (große Systemschrift): Fugenkreuz über dem Satz statt in eigener Spalte, weniger Innenabstand (Runde 3) */}
      <div className="@container mt-16">
      <ul className="grid gap-px border border-fuge bg-fuge">
        <li className="flex flex-col gap-2 bg-fliese p-3 @xs:flex-row @xs:gap-3 @xs:p-6">
          <Fugenkreuz className="size-3 shrink-0 text-tinte @xs:mt-2" />
          <p className="font-text text-fs-3 text-tinte">Seit 2008 sind wir bei der Handwerkskammer Wiesbaden eingetragen.</p>
        </li>
        <li className="flex flex-col gap-2 bg-fliese p-3 @xs:flex-row @xs:gap-3 @xs:p-6">
          <Fugenkreuz className="size-3 shrink-0 text-tinte @xs:mt-2" />
          <p className="font-text text-fs-3 text-tinte">
            {/* zwei Sätze, jedes Fachwort mit seiner Erklärung am Satzende (höchstens 25 Wörter je Satz, K-010) */}
            Im Bad kommt vor dem Verlegen eine <Fachwort id="abdichtung">Abdichtung</Fachwort>. Dabei halten wir uns
            an <Fachwort id="din-18534">DIN 18534</Fachwort>.
          </p>
        </li>
        <li className="flex flex-col gap-2 bg-fliese p-3 @xs:flex-row @xs:gap-3 @xs:p-6">
          <Fugenkreuz className="size-3 shrink-0 text-tinte @xs:mt-2" />
          <p className="font-text text-fs-3 text-tinte">Wohnen Sie während der Arbeiten im Haus, schützen wir Ihre Räume vor Staub.</p>
        </li>
      </ul>
      </div>
    </Abschnitt>
  );
}
