'use client';

// Express-Anfrage (E-011): Schrittwechsel und Markup hier. Logik aus useAnfrageFunnel (gemeinsam mit der Kern-Ansicht);
// Schritttexte in logik.ts, Markup in Schritt1–3, Erfolg und WhatsAppGeoeffnet. Darstellung nach KERN (E2-ORCH-08): Feld an der Fuge, Fortschritt als Mono-Felder.
import { useEffect, useRef } from 'react';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen } from '@/components/kern/stile';
import { useAnfrageFunnel } from '@/lib/formulare/useAnfrageFunnel';
import { STEPS } from './logik';
import Schritt1 from './Schritt1';
import Schritt2 from './Schritt2';
import Schritt3 from './Schritt3';
import Erfolg from './Erfolg';
import WhatsAppGeoeffnet from './WhatsAppGeoeffnet';

export default function TezgelAnfrageFunnel() {
  const {
    step,
    setStep,
    projectType,
    setProjectType,
    selectedArea,
    customArea,
    setCustomArea,
    timing,
    setTiming,
    location,
    setLocation,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    notes,
    setNotes,
    honeypot,
    setHoneypot,
    status,
    errorMessage,
    referenceId,
    projectTitle,
    finalArea,
    locationText,
    handleWhatsAppDirect,
    handleOnlineSubmit,
    handleNewRequest,
    handleBackToOverview,
    selectArea
  } = useAnfrageFunnel();

  // Fokusführung beim Schrittwechsel (R-01b, wie Badanfrage und Konfigurator): Verschwindet der bediente Knopf (Weiter,
  // Zurück, Ändern), läge der Fokus auf <body>; dann geht er auf den Schritttitel (tabIndex -1). Bleibt der Fokus auf einem
  // Element, bleibt er dort. Beim ersten Zeichnen kein Fokus.
  const titel = useRef<HTMLParagraphElement>(null);
  const letzterSchritt = useRef(step);
  useEffect(() => {
    if (letzterSchritt.current === step) return;
    letzterSchritt.current = step;
    const aktiv = document.activeElement;
    if (aktiv && aktiv !== document.body) return;
    titel.current?.focus();
  }, [step]);

  if (status === 'success') {
    return <Erfolg name={name} email={email} referenceId={referenceId} projectTitle={projectTitle} finalArea={finalArea} locationText={locationText} handleNewRequest={handleNewRequest} />;
  }

  // WHATSAPP OPENED STATE
  if (status === 'whatsapp_opened') {
    return <WhatsAppGeoeffnet handleBackToOverview={handleBackToOverview} />;
  }

  return (
    <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12">
      {/* Kopf und Fortschritt */}
      <div className="mb-8 border-b border-fuge pb-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <span className={etikettKlassen}>
            <Fugenkreuz className="size-3 text-strich" />
            Kurze Anfrage in drei Schritten
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

        <p ref={titel} tabIndex={-1} className="font-anzeige text-fs-5 font-semibold text-tinte">
          Schritt {step}: {STEPS[step - 1].title}
        </p>
        <p className="mt-2 text-fs-2 text-tinte-2">{STEPS[step - 1].text}</p>
      </div>

      {/* STEP 1: PROJECT */}
      {step === 1 && <Schritt1 setStep={setStep} projectType={projectType} setProjectType={setProjectType} />}

      {/* STEP 2: DETAILS */}
      {step === 2 && (
        <Schritt2
          setStep={setStep} selectedArea={selectedArea} selectArea={selectArea} customArea={customArea} setCustomArea={setCustomArea}
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
