'use client';

// E3-BAU-20: Kurzformular im KERN-Formularmuster (wie HeroContactForm und BadanfrageFunnel). Klassen aus kern/stile.ts,
// Fehler als Hinweis mit role="alert", Knopf über knopfKlassen, Labels mit ihren Feldern verknüpft.
// Logik, Nutzlast, Honeypot, Einwilligung und Texte bleiben unverändert (Logik in useSchnellanfrage, gemeinsam mit dem Bestand).

import { useId } from 'react';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Hinweis from '@/components/kern/Hinweis';
import { etikettKlassen, feldKlassen, kontrollKlassen, knopfKlassen, labelKlassen, linkKlassen, pflichtKlassen } from '@/components/kern/stile';
import { useSchnellanfrage } from '@/lib/formulare/useSchnellanfrage';

export interface LeadQuickFormProps {
  variant?: 'card' | 'inline' | 'sheet';
  sourceTag?: string;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  onSuccess?: () => void;
  className?: string;
}

/**
 * High-Conversion Quick Lead Capture Form
 * Features:
 *  - 60-Second Completion: Name, Phone, Location & Notes
 *  - Invisible Honeypot Spam Trap (websiteUrl)
 *  - Submission Timing Barrier (_t)
 *  - Direct Integration with /api/anfrage
 */
export function LeadQuickForm({
  variant = 'card',
  sourceTag = 'schnellanfrage-leistungsseite',
  heading = 'Kostenfreies Vor-Ort-Aufmaß anfragen',
  subheading = 'In 60 Sekunden ausgefüllt. Deniz Tezgel meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.',
  submitLabel = 'Unverbindliches Angebot anfordern',
  onSuccess,
  className = '',
}: LeadQuickFormProps) {
  const { formData, setFormData, status, errorMessage, referenceId, handleSubmit } = useSchnellanfrage({ sourceTag, onSuccess });

  // Feld-IDs je Instanz eindeutig (useId), damit jedes Label zu seinem Feld gehört, auch bei mehreren Formularen auf einer Seite
  const kennung = useId().replace(/[^A-Za-z0-9_-]/g, '');
  const feldId = (feld: string) => `schnell-${kennung}-${feld}`;

  if (status === 'success') {
    return (
      <div className={`border border-strich bg-fliese p-6 text-left lg:p-8 ${className}`}>
        <p className="flex items-center gap-3 font-anzeige text-fs-5 font-semibold text-tinte">
          <Icon name="haken" groesse={6} className="text-abnahme" />
          Anfrage erfolgreich übermittelt!
        </p>
        <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
          Vielen Dank, <strong className="font-semibold text-tinte">{formData.name}</strong>. Inhaber Deniz Tezgel prüft Ihre Anfrage und meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen.
        </p>
        {referenceId && (
          <p className="mt-6 w-fit border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">Vorgangsnummer: {referenceId}</p>
        )}
      </div>
    );
  }

  const containerClasses =
    variant === 'card'
      ? 'border border-strich bg-fliese p-6 text-left lg:p-8'
      : variant === 'sheet'
      ? 'bg-fliese p-6 text-left'
      : 'text-left';

  return (
    <div className={`${containerClasses} ${className}`}>
      {heading && (
        <div className="mb-6 border-b border-fuge pb-6">
          <span className={etikettKlassen}>
            <Fugenkreuz className="size-3 text-strich" />
            Kostenloses Vor-Ort-Aufmaß
          </span>
          <p className="mt-4 font-anzeige text-fs-5 font-semibold text-balance text-tinte">{heading}</p>
          {subheading && <p className="mt-2 max-w-mass text-fs-2 text-tinte-2">{subheading}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* HONEYPOT - Hidden from real visitors and assistive tech */}
        <div className="hidden" aria-hidden="true">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={feldId('name')} className={labelKlassen}>
              Ihr Name <span className={pflichtKlassen}>*</span>
            </label>
            <input
              id={feldId('name')}
              type="text"
              required
              autoComplete="name"
              placeholder="z. B. Markus Schmidt"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={feldKlassen}
            />
          </div>

          <div>
            <label htmlFor={feldId('telefon')} className={labelKlassen}>
              Telefonnummer <span className={pflichtKlassen}>*</span>
            </label>
            <input
              id={feldId('telefon')}
              type="tel"
              required
              autoComplete="tel"
              placeholder="z. B. 0172 / 1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={feldKlassen}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={feldId('email')} className={labelKlassen}>
              E-Mail Adresse <span className="font-mono text-fs-1 font-normal text-tinte-2">(optional)</span>
            </label>
            <input
              id={feldId('email')}
              type="email"
              autoComplete="email"
              placeholder="ihre-adresse@beispiel.de"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={feldKlassen}
            />
          </div>

          <div>
            <label htmlFor={feldId('ort')} className={labelKlassen}>
              PLZ / Wohnort <span className="font-mono text-fs-1 font-normal text-tinte-2">(optional)</span>
            </label>
            <input
              id={feldId('ort')}
              type="text"
              autoComplete="address-level2"
              placeholder="z. B. 35614 Aßlar"
              value={formData.zipCity}
              onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
              className={feldKlassen}
            />
          </div>
        </div>

        <div>
          <label htmlFor={feldId('notiz')} className={labelKlassen}>
            Ihr Projekt / Anmerkungen <span className="font-mono text-fs-1 font-normal text-tinte-2">(optional)</span>
          </label>
          <textarea
            id={feldId('notiz')}
            rows={2}
            placeholder="z. B. Komplettbadsanierung ca. 12 m², barrierefreie Dusche, Baustart ab Mai..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className={`${feldKlassen} resize-none`}
          />
        </div>

        {/* Einwilligung (Rechtstext unverändert) */}
        <div className="flex items-start gap-3">
          <input
            id={`consent-${sourceTag}`}
            type="checkbox"
            required
            checked={formData.privacyConsent}
            onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
            className={kontrollKlassen}
          />
          <label htmlFor={`consent-${sourceTag}`} className="cursor-pointer text-fs-2 text-tinte">
            Ich willige in die Verarbeitung meiner Daten zur Kontaktaufnahme ein. Hinweise in der{' '}
            <Link href="/datenschutz" className={linkKlassen}>
              Datenschutzerklärung
            </Link>
            .
          </label>
        </div>

        {status === 'error' && errorMessage && (
          <Hinweis art="fehler" rolle="alert">
            {errorMessage}
          </Hinweis>
        )}

        <div className="flex flex-col gap-4 border-t border-fuge pt-6">
          <button type="submit" disabled={status === 'loading'} className={knopfKlassen('haupt', 'w-full')} data-motion="druck">
            {status === 'loading' ? (
              <span className="flex flex-col items-center gap-2">
                <span>Wird gesendet...</span>
                <span className="laden-fuge w-16" aria-hidden="true" />
              </span>
            ) : (
              <>
                <span>{submitLabel}</span>
                <Icon name="pfeil-rechts" groesse={5} />
              </>
            )}
          </button>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className={etikettKlassen}>
              <Icon name="schloss" groesse={4} />
              100% DSGVO-konform
            </span>
            <span className="font-mono text-fs-1 text-tinte-2">&middot;</span>
            <span className={etikettKlassen}>
              <Icon name="telefon" groesse={4} />
              Kostenfreie Erstberatung
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LeadQuickForm;
