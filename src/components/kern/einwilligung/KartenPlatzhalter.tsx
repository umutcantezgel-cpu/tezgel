'use client';

// Karten-Platzhalter der Kern-Schale (P3-08, F-12): Zwei-Klick-Lösung, bis Marketing-Einwilligung vorliegt.
// Logik ausschließlich über `useKartenEinwilligung` (P3-00l, G9). Die Karte selbst (iframe, Ziel-URL, Titel) gibt der
// Einbindende als `children`; der Platzhalter lädt sie erst mit Einwilligung – vorher keine Anfrage an Karten-Hosts.
// Gestalt: Planfläche mit Kreuzfuge-Muster und Mono-Etikett, feste Seitenverhältnis-Box in allen drei Zuständen
// (vor dem Mount leer · Frage · Karte) – kein Layoutsprung beim Laden. Wortlaut wie `src/components/legal/MapConsentGate.tsx`.
import type { ReactNode } from 'react';
import { useKartenEinwilligung } from '@/lib/formulare/useKartenEinwilligung';
import { Knopf, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';

export type KartenVerhaeltnis = 'standard' | 'quadrat';

// Seitenverhältnis nach der Breite des Behälters (Container-Abfrage, nicht Bildschirm): Der Platzhalter-Inhalt passt in
// jeder Stufe in die Box, also ändert sich ihre Höhe beim Laden der Karte nicht.
// standard: unter 28rem 4:5 · ab 28rem 1:1 · ab 36rem 16:9 · quadrat: 1:1 überall.
// Wächst der Inhalt doch (Zoom, Textabstände), dehnt aspect-ratio die Box als Mindestmaß – nichts wird abgeschnitten.
const VERHAELTNIS: Record<KartenVerhaeltnis, string> = {
  standard: 'aspect-4/5 @md:aspect-square @xl:aspect-video',
  quadrat: 'aspect-square',
};

export type KartenPlatzhalterAnsichtProps = {
  /** laedt = vor dem Mount (Bestand: leere Fläche) · frage = Einwilligung fehlt · karte = Kinder werden gezeigt */
  zustand: 'laedt' | 'frage' | 'karte';
  onLaden?: () => void;
  onEinstellungen?: () => void;
  verhaeltnis?: KartenVerhaeltnis;
  className?: string;
  /** die Karte (z. B. iframe mit Titel); füllt die Box (`size-full`) */
  children: ReactNode;
};

export function KartenPlatzhalterAnsicht({ zustand, onLaden, onEinstellungen, verhaeltnis = 'standard', className, children }: KartenPlatzhalterAnsichtProps) {
  const box = verbinde('relative w-full border border-k-fuge', VERHAELTNIS[verhaeltnis]);
  const huelle = (inhalt: ReactNode) => <div className={verbinde('@container w-full', className)}>{inhalt}</div>;

  if (zustand === 'karte') {
    return huelle(
      <div className={box}>
        <div className="absolute inset-0 *:size-full">{children}</div>
      </div>,
    );
  }

  if (zustand === 'laedt') {
    // Wie der Bestand ohne Text; ohne Pulsieren (K-009 kennt keinen Ladeschimmer).
    return huelle(<div className={verbinde(box, 'k-muster-kreuzfuge bg-k-kalk')} />);
  }

  return huelle(
    <div className={verbinde(box, 'k-muster-kreuzfuge flex items-end bg-k-kalk p-k-4 @md:items-center @md:p-k-5 @xl:p-k-6')}>
      <div className="flex w-full max-w-md flex-col gap-k-3 border border-k-strich bg-k-fliese p-k-4 @md:p-k-5">
        <p className="k-mono flex items-start gap-k-2 text-k-1 text-k-tinte">
          <span className="flex h-lh shrink-0 items-center">
            <Icon name="ort" groesse={16} />
          </span>
          <span>Interaktive Karte geschützt (DSGVO)</span>
        </p>

        <p className="k-text text-k-2 text-k-tinte-2">
          Um die interaktive Google Maps Karte mit Standorten und Routen anzuzeigen,
          ist Ihre Einwilligung in externe Medien erforderlich.
        </p>

        <div className="flex flex-wrap gap-k-2">
          <Knopf onClick={onLaden}>Karte laden & zustimmen</Knopf>
          <Knopf art="neben" onClick={onEinstellungen}>
            Cookie-Einstellungen
          </Knopf>
        </div>
      </div>
    </div>,
  );
}

export type KartenPlatzhalterProps = Omit<KartenPlatzhalterAnsichtProps, 'zustand' | 'onLaden' | 'onEinstellungen'>;

/** Platzhalter mit Logik (F-12): zeigt `children` erst nach Marketing-Einwilligung. */
export default function KartenPlatzhalter({ children, verhaeltnis, className }: KartenPlatzhalterProps) {
  const { isHydrated, hasConsent, handleAccept } = useKartenEinwilligung();
  // „Cookie-Einstellungen“ geht im Kern über denselben Weg wie der Fußlink (#cookie-settings, den der Banner-Hook auswertet).
  // Das openSettings des Hooks öffnet nur seine eigene useConsent-Instanz und erreicht den Banner nicht (Befund M-16);
  // die Einwilligungslogik bleibt unverändert (G9).
  const zuDenEinstellungen = () => { window.location.hash = 'cookie-settings'; };
  const zustand = !isHydrated ? 'laedt' : hasConsent ? 'karte' : 'frage';
  return (
    <KartenPlatzhalterAnsicht zustand={zustand} onLaden={handleAccept} onEinstellungen={zuDenEinstellungen} verhaeltnis={verhaeltnis} className={className}>
      {children}
    </KartenPlatzhalterAnsicht>
  );
}
