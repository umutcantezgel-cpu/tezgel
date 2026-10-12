'use client';

// Schnellanfrage (F-09) im KERN v2 (Q-03, E-038): gebaut wie die Direktanfrage im Einstieg der Startseite
// (HeroContactForm), aber auf Tinte (eingebunden im Abschluss FinalCTA mit showQuickForm) – helle Varianten wie im
// Preisrechner: Beschriftung kalk, Nebentext nacht-2, Felder Fliese (feldKlassen), Knopf „hell“, Fokus kalk (flaeche-tinte).
// Logik unverändert aus useSchnellanfrage: Honeypot `websiteUrl` (vorgetäuschter Erfolg), Pflichtprüfung inkl.
// Einwilligung, Fehlertexte, Nutzlast mit `_t` und `source`. Props, Standardwerte, IDs, `type`, `required` und Wortlaut
// wie im Bestand; neu sind nur die Verknüpfung Beschriftung ↔ Feld (useId), autocomplete (WCAG 1.3.5) und aria-invalid
// aus der Pflichtprüfung.
// Test: funktion-schnellanfrage (Felder über `type`/`required`, Fehlertext innerhalb des <form>, „Vorgangsnummer: …“ in
// einem Element).
import { useId } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettForm, feldKlassen } from '@/components/kern/stile';
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

// Eigene Tinte-Fläche (auch außerhalb des Abschlusses lesbar); card: gerahmtes Feld an der Nacht-Fuge wie der
// Abschluss darüber · sheet: Fläche mit Innenabstand · inline: ohne Rahmen und Abstand
const FLAECHE = 'flaeche-tinte bg-tinte text-left text-kalk';
const HUELLE: Record<NonNullable<LeadQuickFormProps['variant']>, string> = {
  card: 'border border-nacht-fuge p-6 lg:p-8',
  sheet: 'p-6',
  inline: '',
};

// Beschriftung, Zusatz und Pflichtmarke auf Tinte (labelKlassen/pflichtKlassen sind für helle Flächen gesetzt)
const LABEL = 'block font-text text-fs-2 font-semibold text-kalk';
const PFLICHT = 'ml-1 font-mono text-fs-1 text-nacht-2';
const ZUSATZ = 'ml-1 font-mono text-fs-1 font-normal text-nacht-2';
// Textlink im Nebentext auf Tinte: Unterstreichung sichtbar (nicht nur Farbe), ohne Überblendung
const LINK = 'font-semibold text-kalk underline decoration-nacht-2 underline-offset-4 hover:decoration-kalk';

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
  const kennung = useId();
  const feldId = (feld: string) => `schnell-${feld}${kennung}`;
  // Rahmen der Pflichtfelder nach der eigenen Prüfung (dieselbe Bedingung wie im Hook); bei Übertragungsfehlern bleiben
  // die Felder gültig
  const pruefFehler = status === 'error';
  const nameFehlt = pruefFehler && !formData.name.trim();
  const telefonFehlt = pruefFehler && !formData.phone.trim();

  if (status === 'success') {
    return (
      <div className={clsx(FLAECHE, HUELLE[variant], className)} role="status">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center border border-nacht-2 text-kalk">
            <Icon name="haken" groesse={6} />
          </span>
          <p className="font-anzeige text-fs-5 font-semibold text-balance text-kalk">Anfrage erfolgreich übermittelt!</p>
        </div>
        <p className="mt-6 max-w-mass text-fs-3 text-nacht-2">
          Vielen Dank, <strong className="font-semibold text-kalk">{formData.name}</strong>. Inhaber Deniz Tezgel prüft Ihre Anfrage und meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen.
        </p>
        {referenceId && (
          <p className="mt-6 w-fit border border-nacht-fuge px-3 py-1 font-mono text-fs-1 text-kalk">
            Vorgangsnummer: {referenceId}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={clsx(FLAECHE, HUELLE[variant], className)}>
      {heading && (
        <div className="mb-6">
          {/* Kopf als Schriftfeld-Zeile: Etikett in Mono mit Fugenkreuz */}
          <div className="border-b border-nacht-fuge pb-4">
            <span className={`${etikettForm} text-nacht-2`}>
              <Fugenkreuz className="size-3 text-nacht-2" />
              <span>Kostenloses Vor-Ort-Aufmaß</span>
            </span>
          </div>
          <p className="mt-6 font-anzeige text-fs-5 font-semibold text-balance text-kalk">{heading}</p>
          {subheading && <p className="mt-2 text-fs-2 text-nacht-2">{subheading}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* HONEYPOT - Hidden from real visitors and assistive tech */}
        <div hidden className="hidden" aria-hidden="true">
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

        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor={feldId('name')} className={LABEL}>
              Ihr Name <span className={PFLICHT}>*</span>
            </label>
            <input
              id={feldId('name')}
              type="text"
              required
              autoComplete="name"
              aria-invalid={nameFehlt || undefined}
              placeholder="z. B. Markus Schmidt"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={feldKlassen}
            />
          </div>

          <div>
            <label htmlFor={feldId('telefon')} className={LABEL}>
              Telefonnummer <span className={PFLICHT}>*</span>
            </label>
            <input
              id={feldId('telefon')}
              type="tel"
              required
              autoComplete="tel"
              aria-invalid={telefonFehlt || undefined}
              placeholder="z. B. 0172 / 1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={feldKlassen}
            />
          </div>

          <div>
            <label htmlFor={feldId('email')} className={LABEL}>
              E-Mail Adresse <span className={ZUSATZ}>(optional)</span>
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
            <label htmlFor={feldId('ort')} className={LABEL}>
              PLZ / Wohnort <span className={ZUSATZ}>(optional)</span>
            </label>
            <input
              id={feldId('ort')}
              type="text"
              autoComplete="postal-code"
              placeholder="z. B. 35614 Aßlar"
              value={formData.zipCity}
              onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
              className={feldKlassen}
            />
          </div>
        </div>

        <div>
          <label htmlFor={feldId('notizen')} className={LABEL}>
            Ihr Projekt / Anmerkungen <span className={ZUSATZ}>(optional)</span>
          </label>
          <textarea
            id={feldId('notizen')}
            rows={3}
            placeholder="z. B. Komplettbadsanierung ca. 12 m², barrierefreie Dusche, Baustart ab Mai..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className={clsx(feldKlassen, 'resize-none')}
          />
        </div>

        {/* Privacy Consent Checkbox (Rechtstext wörtlich) */}
        <div className="flex items-start gap-3">
          <input
            id={`consent-${sourceTag}`}
            type="checkbox"
            required
            checked={formData.privacyConsent}
            onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
            className="mt-1 size-5 shrink-0 cursor-pointer rounded-r1 accent-kalk"
          />
          <label htmlFor={`consent-${sourceTag}`} className="cursor-pointer text-fs-2 text-nacht-2">
            Ich willige in die Verarbeitung meiner Daten zur Kontaktaufnahme ein. Hinweise in der{' '}
            <Link href="/datenschutz" className={LINK}>
              Datenschutzerklärung
            </Link>
            .
          </label>
        </div>

        {/* Fehler: Versatz-Zeichen + Text, als Feld auf Fliese (Rot als Text nur auf hellem Grund lesbar) */}
        {status === 'error' && errorMessage && (
          <p className="flex items-start gap-2 border-l-2 border-laser bg-fliese p-3 text-fs-2 text-laser-tief" role="alert">
            <Icon name="fehler" groesse={4} className="mt-1" />
            <span>{errorMessage}</span>
          </p>
        )}

        <div className="flex flex-col gap-4 border-t border-nacht-fuge pt-6">
          <Knopf type="submit" variante="hell" laedt={status === 'loading'} ladeText="Wird gesendet..." icon="pfeil-rechts" className="w-full">
            {submitLabel}
          </Knopf>

          {/* Zusagen: mobil untereinander (Trennpunkt erst ab sm, wenn beide in einer Zeile stehen) */}
          <div className="flex flex-col gap-2 text-fs-2 text-nacht-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="flex items-center gap-2">
              <Icon name="schloss" groesse={4} />
              100% DSGVO-konform
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              &middot;
            </span>
            <span className="flex items-center gap-2">
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
