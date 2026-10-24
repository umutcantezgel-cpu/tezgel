// Startseite · 3 Was wir tun (KERN v3 K-009, K-011; Text REF-start): ein Absatz in Alltagssprache mit dem Fachwort
// „Untergrund“ samt Erklärung, vier Bereiche als Zeilen an der Fuge (je ein Link), darunter drei Belege aus dem
// Faktenblatt (K-015) als Zeilen an der Fuge (die Erklärungen der Fachwörter brauchen die Zeilenlänge). Kopf seitlich,
// damit dieser Abschnitt anders gebaut ist als die Lage davor.
// Serverkomponente.
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import type { IconName } from '@/components/icons/namen';
import Abschnitt from '@/components/kern/Abschnitt';
import Fachwort from '@/components/kern/Fachwort';
import Fugenkreuz from '@/components/kern/Fugenkreuz';

const BEREICHE: { name: string; href: string; icon: IconName }[] = [
  { name: 'Badsanierung und neue Dusche', href: '/bad', icon: 'bad' },
  { name: 'Böden und Wände in Haus und Wohnung', href: '/leistungen/wohnen', icon: 'fliese' },
  { name: 'Balkon, Terrasse und Treppen', href: '/balkon-terrasse', icon: 'balkon' },
  { name: 'Reparatur von Fliesen und Fugen', href: '/fliesenreparatur', icon: 'reparatur' },
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
      <ul className="border-t border-fuge">
        {BEREICHE.map((b) => (
          <li key={b.href} className="border-b border-fuge">
            <Link
              href={b.href}
              data-motion="zustand"
              className="group flex min-h-16 items-center gap-4 py-4 text-tinte lg:gap-6 lg:py-6"
            >
              <Icon name={b.icon} groesse={6} className="shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte" />
              <span className="flex-1 font-anzeige text-fs-5 font-extrabold hyphens-none underline decoration-transparent decoration-2 underline-offset-8 transition-colors dauer-1 group-hover:decoration-laser">
                {b.name}
              </span>
              <Icon name="pfeil-rechts" groesse={6} className="shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte" />
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mt-16 grid gap-px border border-fuge bg-fuge">
        <li className="flex gap-3 bg-fliese p-6">
          <Fugenkreuz className="mt-2 size-3 shrink-0 text-tinte" />
          <p className="font-text text-fs-3 text-tinte">Seit 2008 sind wir bei der Handwerkskammer Wiesbaden eingetragen.</p>
        </li>
        <li className="flex gap-3 bg-fliese p-6">
          <Fugenkreuz className="mt-2 size-3 shrink-0 text-tinte" />
          <p className="font-text text-fs-3 text-tinte">
            {/* zwei Sätze, jedes Fachwort mit seiner Erklärung am Satzende (höchstens 25 Wörter je Satz, K-010) */}
            Gegen Wasser hilft eine <Fachwort id="abdichtung">Abdichtung</Fachwort>. Wir machen sie nach{' '}
            <Fachwort id="din-18534">DIN 18534</Fachwort>.
          </p>
        </li>
        <li className="flex gap-3 bg-fliese p-6">
          <Fugenkreuz className="mt-2 size-3 shrink-0 text-tinte" />
          <p className="font-text text-fs-3 text-tinte">Wohnen Sie während der Arbeiten im Haus, schützen wir Ihre Räume vor Staub.</p>
        </li>
      </ul>
    </Abschnitt>
  );
}
