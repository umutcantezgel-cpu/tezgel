'use client';

// Vorschau-Hüllen P3-13b (nur für `src/app/(kern)/_entwurf/p3-13-b`, wird nie freigeschaltet).
// Sie rufen die echten Hooks auf und setzen den gezeigten Zustand darüber – ohne Anfrage (G5): Absenden und WhatsApp
// sind hier durch leere Handlungen ersetzt, die Vorschau sendet nie und öffnet nichts.
// Die Zustandstexte der Fehler-Vorschau sind die wörtlichen Meldungen der Hooks; Name, Referenz und E-Mail sind
// erkennbare Vorschau-Werte. Klassen hier, weil `_entwurf` nicht von Tailwind gelesen wird.
import { useState, type FormEvent, type ReactNode } from 'react';
import { usePreisrechner } from '@/lib/formulare/usePreisrechner';
import { useAnfrageFunnel } from '@/lib/formulare/useAnfrageFunnel';
import PreisrechnerAnsicht, { type PreisrechnerDaten } from '@/components/kern/formulare/b/PreisrechnerAnsicht';
import AnfrageFunnelAnsicht, { type AnfrageFunnelDaten } from '@/components/kern/formulare/b/AnfrageFunnelAnsicht';

const nichtSenden = async (e: FormEvent) => {
  e.preventDefault();
};

export type PreisrechnerZustand = 'ruhe' | 'fehler' | 'laedt' | 'erfolg';

export function PreisrechnerVorschau({ zustand = 'ruhe' }: { zustand?: PreisrechnerZustand }) {
  const echt = usePreisrechner();
  const daten: PreisrechnerDaten = { ...echt, handleSubmit: nichtSenden };
  if (zustand === 'fehler') daten.errorMessage = 'Bitte willigen Sie in die Datenverarbeitung zur Kontaktaufnahme ein.';
  if (zustand === 'laedt') daten.status = 'submitting';
  if (zustand === 'erfolg') {
    daten.status = 'success';
    daten.name = daten.name || 'Vorschau Person';
    daten.referenceId = 'TEZ-26-VORSCHAU';
  }
  return <PreisrechnerAnsicht rechner={daten} />;
}

export type FunnelZustand = 'ruhe' | 'fehler' | 'laedt' | 'erfolg' | 'whatsapp';

export function FunnelVorschau({ schritt = 1, zustand = 'ruhe' }: { schritt?: 1 | 2 | 3; zustand?: FunnelZustand }) {
  const echt = useAnfrageFunnel();
  const [step, setStep] = useState<number>(schritt);
  const daten: AnfrageFunnelDaten = {
    ...echt,
    step,
    setStep,
    handleOnlineSubmit: nichtSenden,
    handleWhatsAppDirect: () => undefined,
    handleNewRequest: () => setStep(1),
    handleBackToOverview: () => setStep(1),
  };
  if (zustand === 'fehler') daten.errorMessage = 'Bitte tragen Sie zumindest Ihren Namen und eine Telefonnummer ein.';
  if (zustand === 'laedt') daten.status = 'submitting';
  if (zustand === 'erfolg') {
    daten.status = 'success';
    daten.name = daten.name || 'Vorschau Person';
    daten.email = daten.email || 'ihre-adresse@beispiel.de';
    daten.referenceId = 'TEZ-26-VORSCHAU';
  }
  if (zustand === 'whatsapp') daten.status = 'whatsapp_opened';
  return <AnfrageFunnelAnsicht funnel={daten} />;
}

/** Beschrifteter Rahmen je Zustand (Mono-Kennung über dem Teil). */
export function VorschauZustand({ kennung, children }: { kennung: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-k-3">
      <p className="k-mono text-k-1 text-k-tinte-2">{kennung}</p>
      {children}
    </div>
  );
}

/** Abschnitt der Vorschau mit Zuständen nebeneinander (ab 1024 px zwei Spalten). */
export function VorschauRaster({ titel, breit = false, children }: { titel: string; breit?: boolean; children: ReactNode }) {
  return (
    <section aria-label={titel} className="py-k-8">
      <div className="mx-auto flex max-w-(--k-seite) flex-col gap-k-6 px-(--k-rand)">
        <p className="k-mono text-k-1 text-k-tinte">{titel}</p>
        <div className={breit ? 'flex flex-col gap-k-8' : 'grid grid-cols-1 gap-k-8 lg:grid-cols-2'}>{children}</div>
      </div>
    </section>
  );
}
