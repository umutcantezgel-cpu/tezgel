// Startseite · 3 Was wir tun (KERN v3 K-009, K-011, K-012; Text REF-start): ein Absatz in Alltagssprache mit dem Fachwort
// „Untergrund“ samt Erklärung, vier Bereiche als Fliesen mit Zeichnung in zwei Spalten (je ein Link mit einem Verlegemuster
// aus dem Formsystem: großes Format, Drittelverband, Halbverband, der Riss; Fugen in Strich, rote Laserlinie; Bereichsfliesen).
// Die drei Belege aus dem Faktenblatt stehen seit der Sichtabnahme E2 (Befund 8: mobil drei Listen in Folge) im Ablauf.
// Kopf seitlich, damit dieser Abschnitt anders gebaut ist als die Lage davor. Serverkomponente.
import Abschnitt from '@/components/kern/Abschnitt';
import Fachwort from '@/components/kern/Fachwort';
import type { Kompositionsmotiv } from '@/components/kern/Fliesenkomposition';
import { Bereichsfliesen } from '@/components/vorlagen/teile/Tun';

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
      <Bereichsfliesen bereiche={BEREICHE} />
    </Abschnitt>
  );
}
