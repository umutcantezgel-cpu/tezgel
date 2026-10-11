// SIG-2 „Laser zieht den Ablauf“ (P4-08a, KERN v1.2 K-009, Register `sig-ablauf`): die Schrittfuge einer Station auf /bad.
// Der Ablauf von /bad ist der Weg, den die Seite selbst geht: Konzept wählen (Qualitäts-Kategorien) → Projekt beschreiben
// (Projektcheck) → anfragen (Badanfrage). Jede Station beginnt an einer Schrittfuge; dort
//   - zieht der Laser die Achse: ab lg als Waage von links über die volle Inhaltsbreite, darunter als Lot am linken Rand
//     (`--k-rand` − 2 px) von oben über die ganze Station, sodass die Lote der Stationen und das Lot des Einstiegs eine
//     durchgehende Linie bilden (K-007: mobil Lot am linken Rand);
//   - setzt sich das Fugenkreuz (Laser) am Kreuzpunkt (Anfang der Waage bzw. auf dem Lot);
//   - wird der Prüfhaken gesetzt. Er trägt keinen eigenen Text: Die Prüfhaken „Ebenheit · Restfeuchte · Tragfähigkeit“
//     (KERN SIG-2) stehen nicht im Bestandstext von /bad, darum gilt der vorhandene Schritttitel – die Überschrift der Station
//     direkt darunter (Rückgabe P4-08a, Abschnitt SIG-2).
// Auslöser: IO 30 % an der Schrittfuge selbst (32 px hoch), nicht an der Station – eine Station kann mobil höher sein als
// 1 / 0,3 Bildschirme und erreichte 30 % sonst nie. Die Lotlinie liegt im Baum der Schrittfuge (CSS erreicht sie über
// `[data-motion="sig-ablauf"] .k-ablauf-lot`), ist aber an der Station positioniert: Schrittfuge und ihr Innenbehälter sind
// nicht positioniert, die Station (`relative`) ist der Bezug.
// Bewegung allein über CSS (Vorschlag für `kern.css` in der Rückgabe): Startzustand nur unter html.k-bewegung; ohne Klasse
// (reduzierte Bewegung, ohne JavaScript, Zeitlimit 2 s) steht der Endzustand sofort – so auch, solange die Regel fehlt.
// Klassen `k-ablauf-*` sind Haken für die Registerregel, keine Tailwind-Klassen. Dekorativ (aria-hidden), ohne Text und Fokus.
import { Fugenkreuz, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { Flaeche } from '@/components/kern/vorlagen/teile';

export default function Schrittfuge({ flaeche = 'kalk' }: { flaeche?: Flaeche }) {
  return (
    <div data-motion="sig-ablauf" data-ausloeser="sicht" data-schwelle="0.3" aria-hidden="true" className="pointer-events-none">
      {/* Lot (unter lg): über die ganze Station, 1 px über deren Fugen hinaus, damit die Linie an der Fuge nicht absetzt */}
      <span className="k-ablauf-lot absolute -inset-y-px left-(--k-rand) w-(--k-linie-2) -translate-x-full bg-k-laser lg:hidden" />
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="relative flex h-k-6 items-center pl-k-4 lg:pl-k-6">
          {/* Waage (ab lg): über die volle Inhaltsbreite, der Laser zieht sie vom Kreuzpunkt nach rechts */}
          <span className="k-ablauf-waage absolute inset-x-0 top-1/2 hidden h-(--k-linie-2) -translate-y-1/2 bg-k-laser lg:block" />
          {/* Fugenkreuz am Kreuzpunkt: Anfang der Waage, mobil auf dem Lot */}
          <span className="k-ablauf-kreuz absolute top-1/2 left-0 flex -translate-x-1/2 -translate-y-1/2 text-k-laser">
            <Fugenkreuz className="size-k-4" />
          </span>
          {/* Prüfhaken auf der Linie; die Fläche der Station deckt die Waage darunter ab */}
          <span
            className={verbinde(
              'k-ablauf-haken relative flex size-k-6 items-center justify-center border border-k-strich text-k-tinte',
              flaeche === 'fliese' ? 'bg-k-fliese' : 'bg-k-kalk',
            )}
          >
            <Icon name="haken" groesse={20} />
          </span>
        </div>
      </div>
    </div>
  );
}
