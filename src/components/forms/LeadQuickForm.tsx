'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Phone, Lock } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCity: '',
    notes: '',
    privacyConsent: false,
    websiteUrl: '', // HONEYPOT: Invisible to real humans, traps bots
  });

  const [mountTime] = useState<number>(() => Date.now());
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Silent Honeypot Trap: If filled, fake immediate success without sending email
    if (formData.websiteUrl && formData.websiteUrl.trim().length > 0) {
      setStatus('success');
      setReferenceId('TEZ-BOT-IGN');
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.privacyConsent) {
      setStatus('error');
      setErrorMessage('Bitte füllen Sie Name und Telefonnummer aus und stimmen Sie der Datenschutzerklärung zu.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: 'general',
          projectType: 'general',
          projectTitle: `Schnellanfrage: ${sourceTag}`,
          contact: {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim() || undefined,
            zipCity: formData.zipCity.trim() || undefined,
          },
          notes: formData.notes.trim() || undefined,
          privacyConsent: formData.privacyConsent,
          honeypot: formData.websiteUrl,
          _t: mountTime,
          source: sourceTag,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Fehler beim Senden der Anfrage.');
      }

      setReferenceId(data.referenceId || '');
      setStatus('success');
      if (onSuccess) onSuccess();
    } catch {
      setStatus('error');
      setErrorMessage(
        'Die Anfrage konnte leider nicht übertragen werden. Bitte rufen Sie uns direkt an: 06441 / 44 83 567.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div
        className={`p-6 sm:p-8 rounded-2xl bg-orange-50/80 border border-orange-200/80 text-center shadow-lg transition-all ${className}`}
      >
        <div className="inline-flex p-3 rounded-full bg-orange-500/10 text-orange-600 mb-4 ring-8 ring-orange-500/5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900">Anfrage erfolgreich übermittelt!</h3>
        <p className="mt-2 text-sm text-neutral-700 max-w-md mx-auto leading-relaxed">
          Vielen Dank, <strong>{formData.name}</strong>. Inhaber Deniz Tezgel prüft Ihre Anfrage und meldet sich innerhalb von 24 Stunden telefonisch bei Ihnen.
        </p>
        {referenceId && (
          <div className="mt-4 inline-block px-3 py-1 rounded-md bg-white border border-orange-200 text-xs font-mono text-orange-950">
            Vorgangsnummer: {referenceId}
          </div>
        )}
      </div>
    );
  }

  const containerClasses =
    variant === 'card'
      ? 'p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-xl relative overflow-hidden'
      : variant === 'sheet'
      ? 'p-6 bg-white'
      : 'p-0';

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* Decorative Warm Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500" />

      {heading && (
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-orange-600" />
            <span>Kostenloses Vor-Ort-Aufmaß</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">{heading}</h3>
          {subheading && <p className="mt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed">{subheading}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* HONEYPOT - Hidden from real visitors and assistive tech */}
        <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Ihr Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="z. B. Markus Schmidt"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Telefonnummer <span className="text-orange-600">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="z. B. 0172 / 1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              E-Mail Adresse <span className="text-xs text-neutral-400 font-normal">(optional)</span>
            </label>
            <input
              type="email"
              placeholder="ihre-adresse@beispiel.de"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              PLZ / Wohnort <span className="text-xs text-neutral-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="z. B. 35614 Aßlar"
              value={formData.zipCity}
              onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">
            Ihr Projekt / Anmerkungen <span className="text-xs text-neutral-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="z. B. Komplettbadsanierung ca. 12 m², barrierefreie Dusche, Baustart ab Mai..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400 resize-none"
          />
        </div>

        {/* Privacy Consent Checkbox */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            id={`consent-${sourceTag}`}
            type="checkbox"
            required
            checked={formData.privacyConsent}
            onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-orange-600 focus:ring-orange-500 cursor-pointer accent-orange-600"
          />
          <label htmlFor={`consent-${sourceTag}`} className="text-xs text-neutral-600 leading-tight cursor-pointer">
            Ich willige in die Verarbeitung meiner Daten zur Kontaktaufnahme ein. Hinweise in der{' '}
            <Link href="/datenschutz" className="text-orange-700 underline hover:text-orange-900 font-medium">
              Datenschutzerklärung
            </Link>
            .
          </label>
        </div>

        {status === 'error' && errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all disabled:opacity-50 cursor-pointer"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Wird gesendet...</span>
            </>
          ) : (
            <>
              <span>{submitLabel}</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-neutral-400" />
            100% DSGVO-konform
          </span>
          <span>&middot;</span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-neutral-400" />
            Kostenfreie Erstberatung
          </span>
        </div>
      </form>
    </div>
  );
}

export default LeadQuickForm;
