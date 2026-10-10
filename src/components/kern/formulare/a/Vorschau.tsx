'use client';

// Vorschau-Hüllen P3-13a (nur für `_entwurf/p3-13-a`, wird nie freigeschaltet; liegt hier, weil Tailwind `_entwurf` nicht liest).
// Die Hüllen nutzen die echten Hooks für die Felder, ersetzen aber Zustand, Meldung, Referenz und das Absenden:
// Der Absende-Handler des Hooks wird nie verdrahtet – die Vorschau sendet nie (G5), kein fetch, kein POST.
// zustand „probe“: Absenden zeigt „lädt“ (Verzug 300 ms, Mindestanzeige 500 ms) und dann den Erfolg mit Fokuswechsel.
// Fehlertexte wörtlich aus den Hooks (nur zur Anzeige im Fehlerzustand).
import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { HeroKontaktAnsicht, type HeroKontaktZustand } from '@/components/kern/formulare/HeroKontakt';
import { SchnellanfrageAnsicht, type SchnellanfrageZustand } from '@/components/kern/formulare/Schnellanfrage';
import { useHeroKontakt } from '@/lib/formulare/useHeroKontakt';
import { useSchnellanfrage } from '@/lib/formulare/useSchnellanfrage';

export type VorschauZustand = 'ruhe' | 'fehler' | 'laedt' | 'erfolg' | 'probe';

const REFERENZ = 'TEZ-00-VORSCHAU';
const PROBE_DAUER_MS = 1500;
const HERO_FEHLER = 'Bitte geben Sie Ihren Namen und Ihre Telefonnummer für den Rückruf an.';
const SCHNELL_FEHLER = 'Bitte füllen Sie Name und Telefonnummer aus und stimmen Sie der Datenschutzerklärung zu.';

/** Beispielangaben für das Erfolgsbild (nur Vorschau). */
const BEISPIEL = { name: 'Erika Mustermann', phone: '0170 0000000', email: 'erika@example.de' };

export function HeroVorschau({ zustand }: { zustand: VorschauZustand }) {
  const echt = useHeroKontakt();
  const [status, setStatus] = useState<HeroKontaktZustand['status']>(
    zustand === 'erfolg' ? 'success' : zustand === 'laedt' ? 'submitting' : zustand === 'fehler' ? 'error' : 'idle',
  );
  const [meldung, setMeldung] = useState(zustand === 'fehler' ? HERO_FEHLER : '');
  const zeitgeber = useRef<number | undefined>(undefined);

  const probeSenden = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (zustand !== 'probe') return;
    window.clearTimeout(zeitgeber.current);
    setMeldung('');
    setStatus('submitting');
    zeitgeber.current = window.setTimeout(() => setStatus('success'), PROBE_DAUER_MS);
  };

  const statisch = zustand === 'erfolg';
  const k: HeroKontaktZustand = {
    ...echt,
    name: statisch ? BEISPIEL.name : echt.name,
    phone: statisch ? BEISPIEL.phone : echt.phone,
    email: statisch ? BEISPIEL.email : echt.email,
    status,
    errorMessage: meldung,
    referenceId: status === 'success' ? REFERENZ : '',
    handleSubmit: probeSenden,
    handleNewRequest: () => {
      echt.handleNewRequest();
      setStatus('idle');
    },
  };
  return <HeroKontaktAnsicht k={k} />;
}

export function SchnellVorschau({ zustand, sourceTag = 'vorschau-p3-13a', kopf = true }: { zustand: VorschauZustand; sourceTag?: string; kopf?: boolean }) {
  const echt = useSchnellanfrage({ sourceTag });
  const [status, setStatus] = useState<SchnellanfrageZustand['status']>(
    zustand === 'erfolg' ? 'success' : zustand === 'laedt' ? 'loading' : zustand === 'fehler' ? 'error' : 'idle',
  );
  const zeitgeber = useRef<number | undefined>(undefined);

  const probeSenden = async (e: FormEvent) => {
    e.preventDefault();
    if (zustand !== 'probe') return;
    window.clearTimeout(zeitgeber.current);
    setStatus('loading');
    zeitgeber.current = window.setTimeout(() => setStatus('success'), PROBE_DAUER_MS);
  };

  const k: SchnellanfrageZustand = {
    ...echt,
    formData: zustand === 'erfolg' ? { ...echt.formData, name: BEISPIEL.name } : echt.formData,
    status,
    errorMessage: status === 'error' ? SCHNELL_FEHLER : '',
    referenceId: status === 'success' ? REFERENZ : '',
    handleSubmit: probeSenden,
  };
  return (
    <SchnellanfrageAnsicht
      k={k}
      variant="card"
      sourceTag={sourceTag}
      heading={kopf ? 'Kostenfreies Vor-Ort-Aufmaß anfragen' : ''}
      subheading={kopf ? 'In 60 Sekunden ausgefüllt. Deniz Tezgel meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.' : ''}
      submitLabel="Unverbindliches Angebot anfordern"
      className=""
    />
  );
}

/** Beschriftete Vorschau-Zelle (Zustandsname in Mono). */
export function VorschauZelle({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col gap-k-3" aria-label={`Vorschau: ${titel}`}>
      <p className="k-mono text-k-1 text-k-tinte-2">{titel}</p>
      {children}
    </section>
  );
}

/** Seitenrahmen der Vorschau mit Raster für Zustände nebeneinander. */
export function VorschauRaster({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-(--k-seite) flex-col gap-k-5 px-(--k-rand) py-k-8">
      <h2 className="k-anzeige text-k-5 text-k-tinte">{titel}</h2>
      <div className="grid grid-cols-1 gap-k-7 lg:grid-cols-2">{children}</div>
    </div>
  );
}
