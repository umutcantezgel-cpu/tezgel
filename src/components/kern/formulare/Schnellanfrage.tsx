'use client';

// Kurzformular „Schnellanfrage“ (P3-13a, F-09) in Kern-Erscheinung (KERN v1.2, K-011) – für spätere Seiten und den
// Abschluss mit `showQuickForm`; auf `/` nicht sichtbar. Logik unverändert aus `useSchnellanfrage` (G9): Honeypot
// `websiteUrl` (vorgetäuschter Erfolg), Pflichtprüfung inkl. Einwilligung, Fehlertexte, Nutzlast, `_t`, `source`.
// Props, Standardwerte, IDs, `type` und Wortlaut aus `src/components/forms/LeadQuickForm.tsx`; geändert nur die
// freigegebenen Mikrotexte (MIKROTEXTE.md: „Wird gesendet …“, „Notiert. …“). Einwilligungstext = Rechtstext, wörtlich.
// Aufbau: Kopf als Schriftfeld-Kopf auf Tinte, darunter Feldraster mit 1-px-Fugen; mobil eine Spalte.
// `SchnellanfrageAnsicht` zeigt einen Hook-Zustand an; die Vorschau setzt damit Zustände, ohne zu senden.
import { useId } from 'react';
import {
  Ankreuzfeld,
  Etikett,
  Feld,
  Feldraster,
  Hinweis,
  Mehrzeilig,
  Rasterfeld,
  SendeKnopf,
  Textlink,
  verbinde,
} from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Erfolgszeichen from '@/components/kern/formulare/a/Erfolgszeichen';
import { useFokusWechsel } from '@/components/kern/formulare/a/useFokusWechsel';
import { useSchnellanfrage } from '@/lib/formulare/useSchnellanfrage';

export interface SchnellanfrageProps {
  variant?: 'card' | 'inline' | 'sheet';
  sourceTag?: string;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  onSuccess?: () => void;
  className?: string;
}

export type SchnellanfrageZustand = ReturnType<typeof useSchnellanfrage>;

// card: eigenes Feldraster genügt als Rahmen · sheet: Fliese mit Innenabstand · inline: ohne Rahmen
const HUELLE: Record<NonNullable<SchnellanfrageProps['variant']>, string> = {
  card: '',
  sheet: 'bg-k-fliese p-k-5',
  inline: '',
};

type AnsichtProps = Required<Pick<SchnellanfrageProps, 'variant' | 'sourceTag' | 'heading' | 'subheading' | 'submitLabel' | 'className'>> & {
  k: SchnellanfrageZustand;
};

export function SchnellanfrageAnsicht({ k, variant, sourceTag, heading, subheading, submitLabel, className }: AnsichtProps) {
  const { formData, setFormData, status, errorMessage, referenceId, handleSubmit } = k;
  const { erfolgRef } = useFokusWechsel(status === 'success');
  const kennung = useId();
  const titelId = `schnell-erfolg-titel${kennung}`;
  const textId = `schnell-erfolg-text${kennung}`;

  if (status === 'success') {
    return (
      <div
        ref={erfolgRef}
        tabIndex={-1}
        role="group"
        aria-labelledby={`${titelId} ${textId}`}
        className={verbinde('flex flex-col gap-k-4 border border-k-abnahme bg-k-fliese p-k-5 text-left outline-none lg:p-k-6', className)}
      >
        <div className="flex items-start gap-k-3">
          <Erfolgszeichen />
          <p id={titelId} className="k-anzeige text-k-5 text-k-tinte">
            Anfrage erfolgreich übermittelt!
          </p>
        </div>
        <p id={textId} className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
          Vielen Dank, <strong className="font-semibold">{formData.name}</strong>. Notiert. Inhaber Deniz Tezgel prüft Ihre Anfrage und meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen.
        </p>
        {referenceId && (
          <p className="w-fit border border-k-strich px-k-3 py-k-1 k-mono text-k-2 text-k-tinte">Vorgangsnummer: {referenceId}</p>
        )}
      </div>
    );
  }

  return (
    <div className={verbinde('text-left', HUELLE[variant], className)}>
      <form onSubmit={handleSubmit}>
        <Feldraster>
          {heading && (
            <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} flaeche="tinte" className="flex flex-col gap-k-2">
              <Etikett auf="tinte" kreuz>
                Kostenloses Vor-Ort-Aufmaß
              </Etikett>
              <p className="k-anzeige text-k-5 text-k-kalk">{heading}</p>
              {subheading && <p className="max-w-(--k-mass) k-text text-k-2 text-k-nacht-2">{subheading}</p>}
            </Rasterfeld>
          )}

          {/* HONEYPOT – verborgen (hidden) für Besucher und Hilfstechnik, nicht fokussierbar */}
          <div hidden aria-hidden="true">
            <label htmlFor={`websiteUrl-${sourceTag}`}>Do not fill this</label>
            <input
              id={`websiteUrl-${sourceTag}`}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
            />
          </div>

          <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 6 }} flaeche="fliese" innen="eng">
            <Feld
              beschriftung="Ihr Name"
              zusatz="*"
              required
              autoComplete="name"
              placeholder="z. B. Markus Schmidt"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Rasterfeld>
          <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 6 }} flaeche="fliese" innen="eng">
            <Feld
              art="tel"
              beschriftung="Telefonnummer"
              zusatz="*"
              required
              placeholder="z. B. 0172 / 1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </Rasterfeld>

          <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 6 }} flaeche="fliese" innen="eng">
            <Feld
              art="email"
              beschriftung="E-Mail Adresse"
              zusatz="(optional)"
              placeholder="ihre-adresse@beispiel.de"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Rasterfeld>
          <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 6 }} flaeche="fliese" innen="eng">
            <Feld
              beschriftung="PLZ / Wohnort"
              zusatz="(optional)"
              placeholder="z. B. 35614 Aßlar"
              value={formData.zipCity}
              onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
            />
          </Rasterfeld>

          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} flaeche="fliese" innen="eng">
            <Mehrzeilig
              beschriftung="Ihr Projekt / Anmerkungen"
              zusatz="(optional)"
              rows={2}
              placeholder="z. B. Komplettbadsanierung ca. 12 m², barrierefreie Dusche, Baustart ab Mai..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </Rasterfeld>

          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} flaeche="fliese" innen="eng" className="flex flex-col gap-k-3">
            {/* Einwilligung (Rechtstext wörtlich) */}
            <Ankreuzfeld
              id={`consent-${sourceTag}`}
              required
              checked={formData.privacyConsent}
              onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
            >
              <span className="text-k-2">
                Ich willige in die Verarbeitung meiner Daten zur Kontaktaufnahme ein. Hinweise in der{' '}
                <Textlink href="/datenschutz">Datenschutzerklärung</Textlink>.
              </span>
            </Ankreuzfeld>

            {status === 'error' && errorMessage && <Hinweis art="fehler">{errorMessage}</Hinweis>}

            <SendeKnopf sendet={status === 'loading'} breit hinten={<Icon name="pfeil" groesse={20} />}>
              {submitLabel}
            </SendeKnopf>

            <div className="flex flex-wrap items-center gap-x-k-5 gap-y-k-1">
              <Etikett>100% DSGVO-konform</Etikett>
              <span className="k-mono text-k-1 text-k-tinte-2">&middot;</span>
              <Etikett>Kostenfreie Erstberatung</Etikett>
            </div>
          </Rasterfeld>
        </Feldraster>
      </form>
    </div>
  );
}

export function Schnellanfrage({
  variant = 'card',
  sourceTag = 'schnellanfrage-leistungsseite',
  heading = 'Kostenfreies Vor-Ort-Aufmaß anfragen',
  subheading = 'In 60 Sekunden ausgefüllt. Deniz Tezgel meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.',
  submitLabel = 'Unverbindliches Angebot anfordern',
  onSuccess,
  className = '',
}: SchnellanfrageProps) {
  const k = useSchnellanfrage({ sourceTag, onSuccess });
  return (
    <SchnellanfrageAnsicht
      k={k}
      variant={variant}
      sourceTag={sourceTag}
      heading={heading}
      subheading={subheading}
      submitLabel={submitLabel}
      className={className}
    />
  );
}

export default Schnellanfrage;
