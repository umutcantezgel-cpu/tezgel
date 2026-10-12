// Logik des Kurzformulars (F-09, LeadQuickForm) – wörtlich aus der Komponente verschoben (P3-00q).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook.
import React, { useState } from 'react';
import { COMPANY_DATA } from '@/config/company';

export function useSchnellanfrage({ sourceTag, onSuccess }: { sourceTag: string; onSuccess?: () => void }) {
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
        // V-05: Rufnummer aus einer Quelle (gleicher Wert wie bisher, Wortlaut unverändert)
        `Die Anfrage konnte leider nicht übertragen werden. Bitte rufen Sie uns direkt an: ${COMPANY_DATA.contact.phone}.`
      );
    }
  };

  return { formData, setFormData, status, errorMessage, referenceId, handleSubmit };
}
