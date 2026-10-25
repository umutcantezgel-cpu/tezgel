'use client';

// Schnellanfrage (F-09) im KERN v2 – Fusion F-07 (E-039, Gutachten u7): Grundgerüst Q-03 (Kopf als Schriftfeld-Zeile,
// ein Feldraster, alle Zustände mit role="status", aria-busy und aria-invalid), Fläche wie der Abschluss im Baum (FinalCTA
// hell): Fliese mit Strich-Rand, Tinte-Knopf, Fokus Tinte, Haken in Abnahme, Pflichtmarke grau (Rot nur für Fehlerzeichen).
// Aus der zweiten Fassung: Vorsatz „Fehler: “ für Screenreader, deutsches Honigtopf-Label, Fuge zwischen Einleitung und
// Feldern, Vertrauenszeile in Mono. Darüber hinaus (Gutachten Rezept 5): Fokus nach eigener Prüfung ins erste fehlende
// Feld, nach Erfolg auf die Erfolgszeile, nach Übertragungsfehler auf Absenden; Meldung über aria-describedby an
// den fehlenden Feldern; Absenden bleibt beim Laden fokussierbar (aria-busy, Doppelabsendung im Handler gesperrt) und
// lesbar (Tinte auf Kalk); Rufnummer im Übertragungsfehler als tel:-Link ohne Umbruch. Titel und Erfolgszeile bleiben
// <p> wie im Bestand (Überschriften unantastbar), mit id für aria-labelledby der umgebenden Region.
// Logik unverändert aus useSchnellanfrage: Honeypot `websiteUrl` (vorgetäuschter Erfolg), Pflichtprüfung inkl.
// Einwilligung, Fehlertexte, Nutzlast mit `_t` und `source`. Props, Standardwerte, IDs, `type`, `required` und Wortlaut
// wie im Bestand; neu ist nur die Prop `titelId` (id der Titelzeile, z. B. für aria-labelledby der umgebenden Region).
// Test: funktion-schnellanfrage (Felder über `type`/`required`, Fehlertext innerhalb des <form>, „Vorgangsnummer: …“ in
// einem Element).
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen, feldKlassen, knopfKlassen, kontrollKlassen, labelKlassen, linkKlassen } from '@/components/kern/stile';
import PflichtHinweis from '@/components/kern/PflichtHinweis';
import Rufnummer from '@/components/kern/Rufnummer';
import { COMPANY_DATA } from '@/config/company';
import { useSchnellanfrage } from '@/lib/formulare/useSchnellanfrage';

export interface LeadQuickFormProps {
  variant?: 'card' | 'inline' | 'sheet';
  sourceTag?: string;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  onSuccess?: () => void;
  className?: string;
  /** id der Titelzeile (Formular und Erfolg), z. B. für aria-labelledby der umgebenden Region */
  titelId?: string;
}

// card: gerahmtes Feld auf Fliese · sheet: Fläche mit Innenabstand · inline: ohne Rahmen und Abstand
const HUELLE: Record<NonNullable<LeadQuickFormProps['variant']>, string> = {
  card: 'border border-strich bg-fliese p-6 text-left lg:p-8',
  sheet: 'bg-fliese p-6 text-left',
  inline: 'text-left',
};

// Pflichtmarke und Zusatz grau in Mono: in Ruhe bleibt kein rotes Zeichen neben der Achse (K-003 Nr. 2)
const PFLICHT = 'ml-1 font-mono text-fs-1 text-tinte-2';
const ZUSATZ = 'ml-1 font-mono text-fs-1 font-normal text-tinte-2';
// Absenden beim Laden: gesperrt wirkend, aber lesbar (Tinte auf Kalk statt halbtransparent) und weiter fokussierbar
const LADEN = 'aria-busy:pointer-events-none aria-busy:border-strich aria-busy:bg-kalk aria-busy:text-tinte';

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
  heading = 'Einen kostenfreien Termin bei Ihnen vor Ort anfragen',
  subheading = 'Das geht in 60 Sekunden. Deniz Tezgel meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.',
  submitLabel = 'Unverbindliches Angebot anfordern',
  onSuccess,
  className = '',
  titelId,
}: LeadQuickFormProps) {
  const { formData, setFormData, status, errorMessage, referenceId, handleSubmit } = useSchnellanfrage({ sourceTag, onSuccess });

  // Feld-IDs je Instanz eindeutig (useId), damit jedes Label zu seinem Feld gehört, auch bei mehreren Formularen auf einer Seite
  const kennung = useId().replace(/[^A-Za-z0-9_-]/g, '');
  const feldId = (feld: string) => `schnell-${kennung}-${feld}`;
  const meldungId = feldId('meldung');

  // Rahmen und aria-invalid der fehlenden Pflichtangaben nach der eigenen Prüfung (dieselbe Bedingung wie im Hook); bei
  // Übertragungsfehlern sind alle Angaben vorhanden und die Felder bleiben gültig
  const pruefFehler = status === 'error';
  const nameFehlt = pruefFehler && !formData.name.trim();
  const telefonFehlt = pruefFehler && !formData.phone.trim();
  const einwilligungFehlt = pruefFehler && !formData.privacyConsent;
  const laedt = status === 'loading';

  // Fokusführung je Absendeversuch: Das Formular wird bei Erfolg ersetzt, beim Laden wechselt der Knopftext – ohne
  // Führung läge der Fokus auf <body> oder im Feld davor
  const nameRef = useRef<HTMLInputElement>(null);
  const telefonRef = useRef<HTMLInputElement>(null);
  const einwilligungRef = useRef<HTMLInputElement>(null);
  const absendenRef = useRef<HTMLButtonElement>(null);
  const erfolgRef = useRef<HTMLParagraphElement>(null);
  const [versuch, setVersuch] = useState(0);
  const erledigt = useRef(0);

  const absenden = (e: FormEvent<HTMLFormElement>) => {
    // Doppelabsendung sperren: der Knopf bleibt beim Laden bedienbar (Fokus), sendet aber nicht erneut
    if (laedt) {
      e.preventDefault();
      return;
    }
    setVersuch((n) => n + 1);
    void handleSubmit(e);
  };

  useEffect(() => {
    if (versuch === erledigt.current || status === 'idle' || status === 'loading') return;
    erledigt.current = versuch;
    if (status === 'success') {
      erfolgRef.current?.focus();
      return;
    }
    const fehlend = nameFehlt ? nameRef : telefonFehlt ? telefonRef : einwilligungFehlt ? einwilligungRef : null;
    if (fehlend) {
      fehlend.current?.focus();
    } else if (!document.activeElement || document.activeElement === document.body) {
      absendenRef.current?.focus();
    }
  }, [versuch, status, nameFehlt, telefonFehlt, einwilligungFehlt]);

  if (status === 'success') {
    return (
      <div className={clsx(HUELLE[variant], className)} role="status">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center border border-strich text-abnahme">
            <Icon name="haken" groesse={6} />
          </span>
          <p ref={erfolgRef} id={titelId} tabIndex={-1} className="font-anzeige text-fs-5 font-semibold text-balance text-tinte">
            Anfrage erfolgreich übermittelt!
          </p>
        </div>
        <p className="mt-6 max-w-mass text-fs-3 text-tinte-2">
          Vielen Dank, <strong className="font-semibold text-tinte">{formData.name}</strong>. Inhaber Deniz Tezgel prüft Ihre Anfrage und meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen.
        </p>
        {referenceId && (
          <p className="mt-6 w-fit border border-fuge bg-kalk px-3 py-1 font-mono text-fs-1 text-tinte">Vorgangsnummer: {referenceId}</p>
        )}
      </div>
    );
  }

  // Rufnummer im Übertragungsfehler als Anruf-Link, ohne Umbruch in der Nummer (sichtbarer Wortlaut unverändert)
  const telefon = COMPANY_DATA.contact.phone;
  const teile = errorMessage.split(telefon);
  const meldung =
    teile.length === 2 ? (
      <>
        {teile[0]}
        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="font-semibold underline underline-offset-4">
          <Rufnummer nummer={telefon} />
        </a>
        {teile[1]}
      </>
    ) : (
      errorMessage
    );

  return (
    <div className={clsx('@container', HUELLE[variant], className)}>
      {heading && (
        // Kopf: Etikett als Schriftfeld-Zeile, Titel und Einleitung, Fuge zum Feldblock
        <div className="mb-6 border-b border-fuge pb-6">
          <div className="border-b border-fuge pb-4">
            <span className={etikettKlassen}>
              <Fugenkreuz className="size-3 text-strich" />
              <span>Kostenfrei bei Ihnen vor Ort</span>
            </span>
          </div>
          <p id={titelId} className="mt-6 font-anzeige text-fs-5 font-semibold text-balance text-tinte">
            {heading}
          </p>
          {subheading && <p className="mt-2 max-w-mass text-fs-2 text-tinte-2">{subheading}</p>}
        </div>
      )}
      {/* ohne eigene Überschrift (die Vorlage trägt sie, Ortsseiten): die Zusage steht trotzdem über den Feldern (M-07,
          Abnahme E3-BAU-10) */}
      {!heading && subheading && <p className="mb-6 max-w-mass text-fs-2 text-tinte-2">{subheading}</p>}

      <form onSubmit={absenden} className="flex flex-col gap-6">
        {/* HONEYPOT - Hidden from real visitors and assistive tech */}
        <div hidden className="hidden" aria-hidden="true">
          <label htmlFor={`websiteUrl-${sourceTag}`}>Bitte dieses Feld freilassen</label>
          <input
            id={`websiteUrl-${sourceTag}`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.websiteUrl}
            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
          />
        </div>

        <PflichtHinweis />

        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor={feldId('name')} className={labelKlassen}>
              Ihr Name <span className={PFLICHT}>*</span>
            </label>
            <input
              ref={nameRef}
              id={feldId('name')}
              type="text"
              required
              autoComplete="name"
              aria-invalid={nameFehlt || undefined}
              aria-describedby={nameFehlt ? meldungId : undefined}
              placeholder="z. B. Markus Schmidt"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={feldKlassen}
            />
          </div>

          <div>
            <label htmlFor={feldId('telefon')} className={labelKlassen}>
              Telefonnummer <span className={PFLICHT}>*</span>
            </label>
            <input
              ref={telefonRef}
              id={feldId('telefon')}
              type="tel"
              required
              autoComplete="tel"
              aria-invalid={telefonFehlt || undefined}
              aria-describedby={telefonFehlt ? meldungId : undefined}
              placeholder="z. B. 0172 / 1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={feldKlassen}
            />
          </div>

          <div>
            <label htmlFor={feldId('email')} className={labelKlassen}>
              E-Mail-Adresse <span className={ZUSATZ}>(optional)</span>
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
              PLZ und Wohnort <span className={ZUSATZ}>(optional)</span>
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
          <label htmlFor={feldId('notiz')} className={labelKlassen}>
            Ihr Projekt in wenigen Worten <span className={ZUSATZ}>(optional)</span>
          </label>
          <textarea
            id={feldId('notiz')}
            rows={3}
            placeholder="z. B. ganzes Bad neu, ca. 12 m², barrierefreie Dusche, Baustart ab Mai …"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className={clsx(feldKlassen, 'resize-none')}
          />
        </div>

        {/* Einwilligung (Rechtstext unverändert); das ganze Label ist klickbar, der Link hat 24 px Zielhöhe */}
        <div className="flex items-start gap-3">
          <input
            ref={einwilligungRef}
            id={`consent-${sourceTag}`}
            type="checkbox"
            required
            aria-invalid={einwilligungFehlt || undefined}
            aria-describedby={einwilligungFehlt ? meldungId : undefined}
            checked={formData.privacyConsent}
            onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
            className={clsx(kontrollKlassen, einwilligungFehlt && 'outline-2 outline-offset-2 outline-laser-tief focus-visible:outline-tinte')}
          />
          <label htmlFor={`consent-${sourceTag}`} className="min-w-0 cursor-pointer text-fs-2 text-tinte @max-3xs:hyphens-auto wrap-break-word">
            Ich willige in die Verarbeitung meiner Daten zur Kontaktaufnahme ein. Hinweise in der{' '}
            <Link href="/datenschutz" className={clsx(linkKlassen, 'py-1')}>
              Datenschutzerklärung
            </Link>
            .
          </label>
        </div>

        {/* Fehler: Versatz-Zeichen + Text an der Laserkante; je Absendeversuch neu eingefügt, damit die Meldung erneut
            angesagt wird */}
        {status === 'error' && errorMessage && (
          <p
            key={versuch}
            id={meldungId}
            role="alert"
            className="flex items-start gap-2 border-l-2 border-laser bg-fliese p-3 text-fs-2 text-laser-tief"
          >
            <Icon name="fehler" groesse={4} className="mt-1 shrink-0" />
            <span className="min-w-0">
              <span className="sr-only">Fehler: </span>
              {meldung}
            </span>
          </p>
        )}

        <div className="flex flex-col gap-4 border-t border-fuge pt-6">
          <button
            ref={absendenRef}
            type="submit"
            aria-busy={laedt || undefined}
            className={knopfKlassen('haupt', clsx('w-full @max-3xs:hyphens-auto wrap-break-word @max-3xs:px-4 @max-3xs:flex-wrap', LADEN))}
            data-motion="druck"
          >
            {laedt ? (
              <span className="flex flex-col items-center gap-2">
                <span>Wird gesendet …</span>
                <span className="laden-fuge w-16" data-motion="laden" aria-hidden="true" />
              </span>
            ) : (
              <>
                <span>{submitLabel}</span>
                <Icon name="pfeil-rechts" groesse={5} />
              </>
            )}
          </button>

          {/* Zusagen als Mono-Etiketten: mobil untereinander, Trennpunkt erst ab sm (dekorativ, nicht vorgelesen) */}
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
            <span className={etikettKlassen}>
              <Icon name="schloss" groesse={4} />
              100% konform mit der DSGVO
            </span>
            <span aria-hidden="true" className="hidden font-mono text-fs-1 text-tinte-2 sm:inline">
              &middot;
            </span>
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
