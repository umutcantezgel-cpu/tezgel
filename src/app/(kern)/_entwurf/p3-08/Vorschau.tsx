'use client';

// Vorschau P3-08 (Client-Teil): Banner und Karten-Platzhalter in festen Zuständen, ohne Cookie und ohne Netz.
// Die Zustände halten lokale Werte; nur Umschalten und Ansichtswechsel wirken, Wahlknöpfe tun hier nichts.
import { useState, type ReactNode } from 'react';
import { BannerAnsicht } from '@/components/kern/einwilligung/Banner';
import { KartenPlatzhalterAnsicht } from '@/components/kern/einwilligung/KartenPlatzhalter';
import type { ConsentState } from '@/lib/cookie-inventory';
import { CONSENT_VERSION } from '@/lib/cookie-inventory';
import { Etikett } from '@/components/kern/basis';

const nichts = () => {};

// Gespeicherte Einwilligung für den Wiederaufruf (Status-Zeile): nur Analyse, Stand 10.10.2026.
const GESPEICHERT: ConsentState = {
  essential: true,
  analytics: true,
  marketing: false,
  timestamp: '2026-10-10T08:00:00.000Z',
  version: CONSENT_VERSION,
};

function Zustand({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-k-3">
      <Etikett kreuz>{titel}</Etikett>
      {children}
    </div>
  );
}

function BannerProbe({ consent, einstellungen, sichtbar = true }: { consent: ConsentState | null; einstellungen: boolean; sichtbar?: boolean }) {
  const [showSettings, setShowSettings] = useState(einstellungen);
  const [analyticsChecked, setAnalyticsChecked] = useState(consent?.analytics ?? false);
  const [marketingChecked, setMarketingChecked] = useState(consent?.marketing ?? false);
  return (
    <BannerAnsicht
      lage="vorschau"
      consent={consent}
      showBanner={sichtbar}
      showSettings={showSettings}
      setShowSettings={setShowSettings}
      analyticsChecked={analyticsChecked}
      setAnalyticsChecked={setAnalyticsChecked}
      marketingChecked={marketingChecked}
      setMarketingChecked={setMarketingChecked}
      handleSaveSettings={nichts}
      handleClose={nichts}
      handleOpenSettings={() => setShowSettings(true)}
      handleDeclineAll={nichts}
      handleAcceptAll={nichts}
    />
  );
}

export function BannerZustaende() {
  return (
    <div className="grid grid-cols-1 gap-k-7 lg:grid-cols-2">
      <Zustand titel="1 · Erstbesuch (kein Cookie)">
        <BannerProbe consent={null} einstellungen={false} />
      </Zustand>
      <Zustand titel="1b · Wiederaufruf über „Zurück“ (Status-Zeile)">
        <BannerProbe consent={GESPEICHERT} einstellungen={false} />
      </Zustand>
      <Zustand titel="2 · Einstellungen offen (Umschalter und Details bedienbar)">
        <BannerProbe consent={GESPEICHERT} einstellungen />
      </Zustand>
      <Zustand titel="3 · Nach Wahl: Banner verborgen (kein Schild, Widerruf über den Fußlink)">
        <BannerProbe consent={GESPEICHERT} einstellungen={false} sichtbar={false} />
        <p className="k-text border border-dashed border-k-strich p-k-4 text-k-2 text-k-tinte-2">
          Vorschau: Der Banner ist verborgen. Der Fokus kehrt dorthin zurück, wo er vor dem Banner war, sonst auf main.
          Widerruf jederzeit über den Fußlink zu #cookie-settings.
        </p>
      </Zustand>
    </div>
  );
}

// Kind statt echter Karte: kein Aufruf von Google Maps.
export function KartenRahmen() {
  return (
    <div className="flex items-center justify-center border border-dashed border-k-strich bg-k-fliese p-k-4">
      <span className="k-mono text-k-1 text-k-tinte-2">Vorschau: hier lädt die Karte</span>
    </div>
  );
}

export function KartenZustaende() {
  return (
    <div className="grid grid-cols-1 gap-k-7 lg:grid-cols-3">
      <Zustand titel="a · vor dem Mount (leer, gleiche Box)">
        <KartenPlatzhalterAnsicht zustand="laedt">
          <KartenRahmen />
        </KartenPlatzhalterAnsicht>
      </Zustand>
      <Zustand titel="b · ohne Marketing-Einwilligung">
        <KartenPlatzhalterAnsicht zustand="frage" onLaden={nichts} onEinstellungen={nichts}>
          <KartenRahmen />
        </KartenPlatzhalterAnsicht>
      </Zustand>
      <Zustand titel="c · nach Einwilligung (Kind geladen)">
        <KartenPlatzhalterAnsicht zustand="karte">
          <KartenRahmen />
        </KartenPlatzhalterAnsicht>
      </Zustand>
    </div>
  );
}
