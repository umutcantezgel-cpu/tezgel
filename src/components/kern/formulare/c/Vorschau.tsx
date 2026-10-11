'use client';

// Vorschau-Hüllen P4-05a (nur für `src/app/(kern)/_entwurf/p4-05a`, wird nie freigeschaltet).
// Sie rufen die echten Hooks auf und setzen den gezeigten Zustand darüber – ohne Anfrage (G5): Absenden und WhatsApp
// sind hier durch leere Handlungen ersetzt, die Vorschau sendet nie und öffnet nichts.
// Die Fehlertexte sind die wörtlichen Meldungen der Hooks; Name, Telefon, E-Mail und Referenz sind erkennbare
// Vorschau-Werte. Klassen hier, weil `_entwurf` nicht von Tailwind gelesen wird.
import { useState, type FormEvent, type ReactNode } from 'react';
import { useBadanfrage } from '@/lib/formulare/useBadanfrage';
import { useProjektCheck } from '@/lib/formulare/useProjektCheck';
import BadanfrageAnsicht, { type BadanfrageDaten } from '@/components/kern/formulare/c/BadanfrageAnsicht';
import ProjektCheckAnsicht, { type ProjektCheckDaten } from '@/components/kern/formulare/c/ProjektCheckAnsicht';
import { verbinde } from '@/components/kern/basis/klassen';

const nichtSenden = async (e: FormEvent) => {
  e.preventDefault();
};

const VORSCHAU_KONTAKT = { name: 'Vorschau Person', phone: '0170 0000000', email: 'ihre-adresse@beispiel.de' };

export type BadanfrageZustand = 'ruhe' | 'fehler' | 'whatsapp-fehler' | 'laedt' | 'erfolg' | 'whatsapp';

export function BadanfrageVorschau({ schritt = 1, zustand = 'ruhe' }: { schritt?: 1 | 2 | 3 | 4 | 5; zustand?: BadanfrageZustand }) {
  const echt = useBadanfrage();
  const [step, setStep] = useState<number>(schritt);
  const daten: BadanfrageDaten = {
    ...echt,
    step,
    setStep,
    handleOnlineSubmit: nichtSenden,
    handleWhatsApp: () => undefined,
    handleNewRequest: () => setStep(1),
    handleBackFromWhatsApp: () => setStep(1),
  };
  if (zustand === 'fehler') daten.errorMessage = 'Verbindungsfehler beim Absenden.';
  if (zustand === 'whatsapp-fehler') daten.errorMessage = 'Bitte tragen Sie zumindest Name und Telefonnummer ein.';
  if (zustand === 'laedt') daten.status = 'submitting';
  if (zustand === 'erfolg' || zustand === 'whatsapp') {
    daten.status = zustand === 'erfolg' ? 'success' : 'whatsapp_opened';
    daten.formData = {
      ...daten.formData,
      name: daten.formData.name || VORSCHAU_KONTAKT.name,
      phone: daten.formData.phone || VORSCHAU_KONTAKT.phone,
      email: daten.formData.email || VORSCHAU_KONTAKT.email,
    };
    daten.referenceId = 'TEZ-26-VORSCHAU';
  }
  return <BadanfrageAnsicht anfrage={daten} />;
}

export type ProjektCheckZustand = 'ruhe' | 'formular' | 'fehler' | 'laedt' | 'erfolg' | 'whatsapp';

export function ProjektCheckVorschau({ zustand = 'ruhe' }: { zustand?: ProjektCheckZustand }) {
  const echt = useProjektCheck();
  const daten: ProjektCheckDaten = { ...echt, handleLeadSubmit: nichtSenden };
  if (zustand !== 'ruhe') daten.contactOpen = true;
  if (zustand === 'fehler') daten.errorMessage = 'Verbindungsfehler beim Absenden.';
  if (zustand === 'laedt') daten.isSubmitting = true;
  if (zustand === 'erfolg') {
    daten.sentVia = 'online';
    daten.leadData = {
      name: daten.leadData.name || VORSCHAU_KONTAKT.name,
      phone: daten.leadData.phone || VORSCHAU_KONTAKT.phone,
      email: daten.leadData.email || VORSCHAU_KONTAKT.email,
    };
    daten.referenceId = 'TEZ-26-VORSCHAU';
  }
  if (zustand === 'whatsapp') daten.sentVia = 'whatsapp';
  return <ProjektCheckAnsicht check={daten} />;
}

// Behälterbreiten der Probe (P4-10b): 18 rem (320 px abzüglich Rand, schmalste Spalte), 28 rem (mittlere Spalte; strenger
// als 30 rem bei derselben Stufe @md–@lg) und 48 rem (breite Spalte). Container-Größen aus dem Tailwind-Standard.
const PROBEN = [
  { kennung: 'Behälter 18 rem', breite: 'w-2xs' },
  { kennung: 'Behälter 28 rem', breite: 'w-md' },
  { kennung: 'Behälter 48 rem', breite: 'w-3xl' },
] as const;

/** Dieselbe Ansicht in drei Behälterbreiten nebeneinander (umbrechend, nie breiter als das Fenster). */
export function VorschauBreiten({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start gap-k-6">
      {PROBEN.map((probe) => (
        <div key={probe.kennung} className={verbinde('flex min-w-0 max-w-full shrink-0 flex-col gap-k-3', probe.breite)}>
          <p className="k-mono text-k-1 text-k-tinte-2">{probe.kennung}</p>
          {children}
        </div>
      ))}
    </div>
  );
}
