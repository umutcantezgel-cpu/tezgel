'use client';

// Express-Anfrage (E-011): Zustand, Schrittwechsel und Absenden hier; Logik in logik.ts (gesperrt), Markup in Schritt1–3,
// Erfolg und WhatsAppGeoeffnet. Darstellung nach KERN (E2-ORCH-08): Feld an der Fuge, Fortschritt als Mono-Felder.
import React, { useState } from 'react';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen } from '@/components/kern/stile';
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
    <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12">
      {/* Kopf und Fortschritt */}
      <div className="mb-8 border-b border-fuge pb-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <span className={etikettKlassen}>
            <Fugenkreuz className="size-3 text-strich" />
            Express-Anfrage in 60 Sekunden
          </span>
          <ol className="flex items-center gap-2" aria-label="Fortschritt">
            {STEPS.map((item, idx) => {
              const s = idx + 1;
              return (
                <li
                  key={item.title}
                  aria-current={step === s ? 'step' : undefined}
                  className={`flex size-8 items-center justify-center border font-mono text-fs-1 tabular-nums ${
                    step === s
                      ? 'border-tinte bg-tinte text-kalk'
                      : step > s
                        ? 'border-tinte bg-fliese text-tinte'
                        : 'border-strich bg-fliese text-tinte-2'
                  }`}
                >
                  {step > s ? <Icon name="haken" groesse={4} label={`Schritt ${s} erledigt`} /> : s}
                </li>
              );
            })}
          </ol>
        </div>

        <p className="font-anzeige text-fs-5 font-semibold text-tinte">
          Schritt {step}: {STEPS[step - 1].title}
        </p>
        <p className="mt-2 text-fs-2 text-tinte-2">{STEPS[step - 1].text}</p>
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
