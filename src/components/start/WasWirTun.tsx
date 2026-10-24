// Startseite · 3 Was wir tun (KERN v3 K-009, K-011, K-012; Text REF-start; E-037): ein Absatz in Alltagssprache mit dem
// Fachwort „Untergrund“ samt Erklärung, vier Bereiche als Fliesen mit den Plan-Vignetten des alten Stands (Bad, Wohnen,
// Außen; Reparatur neu in derselben Zeichensprache), Linienzeichnungen ohne Rot (Bereichsfliesen). Unter dem Kopf (ab lg in
// der Kopfspalte, mobil nach den Bereichen) die Vignette Untergrund, der Schnitt am Wandanschluss, mit der Erklärung der
// Abdichtung in der Bildunterschrift (Sichtabnahme E2, Befund 13: eine erklärende Zeichnung). Die drei Belege aus dem
// Faktenblatt stehen im Ablauf (Befund 8). Kopf seitlich, damit dieser Abschnitt anders gebaut ist als die Lage davor.
// Serverkomponente.
import Abschnitt from '@/components/kern/Abschnitt';
import Fachwort from '@/components/kern/Fachwort';
import VignetteUntergrund from '@/components/kern/vignetten/Untergrund';
import { Bereichsfliesen, type Bereich } from '@/components/vorlagen/teile/Tun';

const BEREICHE: Bereich[] = [
  { name: 'Badsanierung und neue Dusche', href: '/bad', vignette: 'bad' },
  { name: 'Böden und Wände in Haus und Wohnung', href: '/leistungen/wohnen', vignette: 'wohnen' },
  { name: 'Balkon, Terrasse und Treppen', href: '/balkon-terrasse', vignette: 'aussen' },
  { name: 'Reparatur von Fliesen und Fugen', href: '/fliesenreparatur', vignette: 'reparatur' },
];

export default function WasWirTun() {
  return (
    <Abschnitt
      id="was-wir-tun"
      formel="tun"
      leitachse
      spaet
      kopf="seitlich"
      titel="Wir kümmern uns um alles, was mit Fliesen zu tun hat."
      einleitung={
        <p>
          Wir nehmen alte Fliesen heraus und bereiten den <Fachwort id="untergrund">Untergrund</Fachwort> vor. Dann verlegen wir
          neue Fliesen, auch große Fliesen mit wenigen Fugen. Am Ende ist alles sauber, und Sie können Ihren Raum wieder
          nutzen.
        </p>
      }
      unterKopf={
        <figure className="max-w-mass text-tinte">
          <VignetteUntergrund />
          <figcaption className="mt-4 font-text text-fs-2 text-tinte-2">
            <p>
              So ist der Boden im Bad am Rand zur Wand aufgebaut. Unter den Fliesen liegt die{' '}
              <Fachwort id="abdichtung">Abdichtung</Fachwort>. Sie geht ein Stück an der Wand hoch.
            </p>
          </figcaption>
        </figure>
      }
    >
      <Bereichsfliesen bereiche={BEREICHE} />
    </Abschnitt>
  );
}
