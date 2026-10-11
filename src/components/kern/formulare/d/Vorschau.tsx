'use client';

// Vorschau-Hülle P4-05b (nur für `src/app/(kern)/_entwurf/p4-05b`, wird nie freigeschaltet).
// Sie ruft den echten Hook auf und setzt den gezeigten Zustand darüber – ohne Anfrage (G5): Absenden ist durch eine
// leere Handlung ersetzt, die Vorschau sendet nie und öffnet kein WhatsApp.
// Zustand setzen: Bereiche, Untergrund, Format, Material und Fußbodenheizung über die Vorgaben des Hooks (wie die
// Bestandsseiten); weitere Eingaben (Fläche, Stufenmaße, Bauart) einmal nach dem Laden über `update` des Hooks, damit
// Rechnung und Richtwert aus derselben Logik kommen. Schritt, Fehler, Laden und Erfolg werden an der Kopie des
// Hook-Ergebnisses gesetzt. Fehlertext ist die wörtliche Meldung des Hooks; Name, Telefon, E-Mail und Referenz sind
// erkennbare Vorschau-Werte. Klassen hier, weil `_entwurf` nicht von Tailwind gelesen wird.
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useFliesenKonfigurator, type FliesenDaten, type FliesenVorgaben } from '@/lib/formulare/useFliesenKonfigurator';
import KonfiguratorAnsicht, { type KonfiguratorDaten } from '@/components/kern/formulare/d/KonfiguratorAnsicht';

const nichtSenden = async (e: FormEvent) => {
  e.preventDefault();
};

const VORSCHAU_KONTAKT = { name: 'Vorschau Person', phone: '0170 0000000', email: 'ihre-adresse@beispiel.de' };

export type KonfiguratorZustand = 'ruhe' | 'fehler' | 'laedt' | 'erfolg' | 'whatsapp';

export function KonfiguratorVorschau({
  schritt = 1,
  zustand = 'ruhe',
  vorgaben,
  eingaben,
}: {
  schritt?: 1 | 2 | 3 | 4;
  zustand?: KonfiguratorZustand;
  vorgaben?: FliesenVorgaben;
  /** einmal nach dem Laden über `update` gesetzt (Fläche, Stufenmaße …) */
  eingaben?: Partial<FliesenDaten>;
}) {
  const echt = useFliesenKonfigurator(vorgaben);
  const [step, setStep] = useState<number>(schritt);
  const { update } = echt;
  const gesetzt = useRef(false);
  useEffect(() => {
    if (gesetzt.current || !eingaben) return;
    gesetzt.current = true;
    update(eingaben);
  }, [update, eingaben]);

  const daten: KonfiguratorDaten = {
    ...echt,
    step,
    setStep,
    goToStep: setStep,
    handleSubmit: nichtSenden,
    handleNewRequest: () => setStep(1),
  };
  if (zustand === 'fehler') daten.errorMessage = 'Verbindungsfehler beim Absenden.';
  if (zustand === 'laedt') daten.isSubmitting = true;
  if (zustand === 'erfolg' || zustand === 'whatsapp') {
    daten.sentVia = zustand === 'erfolg' ? 'online' : 'whatsapp';
    daten.data = {
      ...daten.data,
      name: daten.data.name || VORSCHAU_KONTAKT.name,
      phone: daten.data.phone || VORSCHAU_KONTAKT.phone,
      email: daten.data.email || VORSCHAU_KONTAKT.email,
    };
    daten.referenceId = 'TEZ-26-VORSCHAU';
  }
  return <KonfiguratorAnsicht konfigurator={daten} />;
}
