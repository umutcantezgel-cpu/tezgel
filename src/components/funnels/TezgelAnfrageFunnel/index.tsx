'use client';

// Express-Anfrage (E-011): Zustand, Schrittwechsel und Absenden hier; Logik in logik.ts (gesperrt), Markup in Schritt1–3,
// Erfolg und WhatsAppGeoeffnet.
import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';
import { STEPS, beschriftungen, nachricht, nutzlast, type SubmissionStatus } from './logik';
import Schritt1 from './Schritt1';
import Schritt2 from './Schritt2';
import Schritt3 from './Schritt3';
import Erfolg from './Erfolg';
import WhatsAppGeoeffnet from './WhatsAppGeoeffnet';

export default function TezgelAnfrageFunnel() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('bad');
  const [selectedArea, setSelectedArea] = useState('15 - 35 m²');
  const [customArea, setCustomArea] = useState('');
  const [timing, setTiming] = useState('In 1 - 3 Monaten');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formInitTime] = useState<number>(() => Date.now());
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const { projectTitle, finalArea, locationText } = beschriftungen(projectType, customArea, selectedArea, location);

  const getWhatsAppMessage = () => nachricht({ projectTitle, finalArea, locationText, timing, name, phone, email, notes });

  const handleWhatsAppDirect = () => {
    if (!name || !phone) {
      setErrorMessage('Bitte tragen Sie zumindest Ihren Namen und eine Telefonnummer ein.');
      return;
    }
    openWhatsApp({
      phone: COMPANY_DATA.contact.whatsappNumber,
      text: getWhatsAppMessage(),
    });
    setStatus('whatsapp_opened');
  };

  const handleOnlineSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setStatus('submitting');

    try {
      const response = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nutzlast({ projectType, projectTitle, finalArea, locationText, name, phone, email, timing, notes, honeypot, formInitTime }))
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Übertragung fehlgeschlagen.');
      }

      if (data.referenceId) {
        setReferenceId(data.referenceId);
      }

      setStatus('success');
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const msg = err instanceof Error ? err.message : 'Es gab ein Problem bei der Übertragung.';
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <Erfolg setStep={setStep} name={name} setName={setName} setPhone={setPhone} email={email} setEmail={setEmail} setNotes={setNotes} setStatus={setStatus} referenceId={referenceId} setReferenceId={setReferenceId} projectTitle={projectTitle} finalArea={finalArea} locationText={locationText} />;
  }

  // WHATSAPP OPENED STATE
  if (status === 'whatsapp_opened') {
    return <WhatsAppGeoeffnet setStep={setStep} setStatus={setStatus} />;
  }

  return (
    <div className="glass-surface rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden max-w-4xl mx-auto shadow-lg border border-neutral-200">
      {/* Decorative gradient corner */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-500/10 blur-2xl" aria-hidden="true" />

      {/* Header & step indicator */}
      <div className="mb-8 text-center sm:text-left relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <span className="eyebrow mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5" />
            Express-Anfrage in 60 Sekunden
          </span>
          <ol className="flex items-center gap-2 mx-auto sm:mx-0" aria-label="Fortschritt">
            {STEPS.map((item, idx) => {
              const s = idx + 1;
              return (
                <li
                  key={item.title}
                  aria-current={step === s ? 'step' : undefined}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black tabular-nums transition-all duration-200 ${
                    step === s
                      ? 'bg-orange-700 text-white shadow-md shadow-orange-700/30'
                      : step > s
                        ? 'bg-orange-50 text-orange-800 border border-orange-300'
                        : 'bg-white text-neutral-700 border border-neutral-300'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" aria-label={`Schritt ${s} erledigt`} /> : s}
                </li>
              );
            })}
          </ol>
        </div>

        <p className="text-xl sm:text-2xl font-black text-neutral-900">
          Schritt {step}: {STEPS[step - 1].title}
        </p>
        <p className="text-sm text-neutral-700 mt-1">{STEPS[step - 1].text}</p>
      </div>

      {/* STEP 1: PROJECT */}
      {step === 1 && <Schritt1 setStep={setStep} projectType={projectType} setProjectType={setProjectType} />}

      {/* STEP 2: DETAILS */}
      {step === 2 && (
        <Schritt2
          setStep={setStep} selectedArea={selectedArea} setSelectedArea={setSelectedArea} customArea={customArea} setCustomArea={setCustomArea}
          timing={timing} setTiming={setTiming} location={location} setLocation={setLocation}
        />
      )}

      {/* STEP 3: CONTACT & SUBMISSION */}
      {step === 3 && (
        <Schritt3
          setStep={setStep} name={name} setName={setName} phone={phone} setPhone={setPhone} email={email} setEmail={setEmail}
          notes={notes} setNotes={setNotes} honeypot={honeypot} setHoneypot={setHoneypot} status={status} errorMessage={errorMessage}
          projectTitle={projectTitle} finalArea={finalArea} locationText={locationText}
          handleWhatsAppDirect={handleWhatsAppDirect} handleOnlineSubmit={handleOnlineSubmit}
        />
      )}
    </div>
  );
}
