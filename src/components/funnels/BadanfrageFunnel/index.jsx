"use client";
// Badanfrage (E-011): Schrittwechsel und Rahmen hier. Logik aus useBadanfrage (gemeinsam mit der Kern-Ansicht); Markup in Schritt1–5,
// Erfolg und WhatsAppGeoeffnet. Darstellung nach KERN v2 (Q-01, Vorbild Express-Anfrage): ein Feld an der Fuge mit Kopf in Mono,
// Fortschritt als nummerierte Zellen (dekorativ; der Stand steht im Etikett), Fußleiste Zurück/Weiter.
// Fusion F-04 (E-039, Grundgerüst B): Region und Anker #anfrage („Badanfrage“) setzt die einbindende Seite, nicht der Baustein
// (genau ein id="anfrage" im DOM). Die Wurzel `data-baustein="badanfrage"` besteht in allen Zuständen (Schritte, Erfolg,
// WhatsApp) als dasselbe Element und ist der Behälter der Container-Abfragen.
import { useEffect, useRef } from 'react';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { useBadanfrage, TOTAL_STEPS } from '@/lib/formulare/useBadanfrage';
import { feldClass } from './stile';
import Schritt1 from './Schritt1';
import Schritt2 from './Schritt2';
import Schritt3 from './Schritt3';
import Schritt4 from './Schritt4';
import Schritt5 from './Schritt5';
import Erfolg from './Erfolg';
import WhatsAppGeoeffnet from './WhatsAppGeoeffnet';

export default function BadanfrageFunnel() {
    const {
        step,
        setStep,
        status,
        errorMessage,
        referenceId,
        formData,
        setFormData,
        toggleFeature,
        flaecheText,
        objectTitle,
        scopeTitle,
        tierTitle,
        featureText,
        addressText,
        handleWhatsApp,
        handleOnlineSubmit,
        handleNewRequest,
        handleBackFromWhatsApp
    } = useBadanfrage();

    // Fokusführung beim Zustandswechsel (F-04, über A und B hinaus): Verschwindet das bediente Element (Weiter 4→5,
    // Zurück zu Schritt 4, Zurück 2→1, Absenden, WhatsApp, Neustart, Zurück aus WhatsApp), läge der Fokus auf <body>.
    // Dann geht er auf die neue Schrittfrage bzw. die Dank-Zeile oder die WhatsApp-Überschrift (tabIndex -1,
    // data-fokusziel), nach einem Serverfehler auf den wieder aktiven Sendeknopf. Beim Schrittwechsel geht er auch dann
    // auf die Schrittfrage, wenn der bediente Knopf stehen bleibt (umbenannter Weiter-Knopf, „Zurück“; R-01b, wie Express
    // und Konfigurator). Sonst bleibt ein Fokus auf einem Element dort (Per WhatsApp bei fehlenden Angaben, Fokus außerhalb).
    const wurzel = useRef(null);
    const zuletzt = useRef({ step, status });
    useEffect(() => {
        const vorher = zuletzt.current;
        zuletzt.current = { step, status };
        if ((vorher.step === step && vorher.status === status) || status === 'submitting') return;
        const aktiv = document.activeElement;
        const schrittwechsel = vorher.step !== step && vorher.status === status && !!aktiv && !!wurzel.current?.contains(aktiv);
        if (aktiv && aktiv !== document.body && !schrittwechsel) return;
        const nachFehler = status === 'error' && vorher.status !== 'error';
        const ziel = wurzel.current?.querySelector(nachFehler ? 'button[type="submit"]' : '[data-fokusziel]');
        ziel?.focus();
    }, [step, status]);

    let inhalt;
    if (status === 'success') {
        inhalt = <Erfolg handleNewRequest={handleNewRequest} referenceId={referenceId} formData={formData} flaecheText={flaecheText} objectTitle={objectTitle} scopeTitle={scopeTitle} tierTitle={tierTitle} featureText={featureText} addressText={addressText} />;
    } else if (status === 'whatsapp_opened') {
        inhalt = <WhatsAppGeoeffnet handleBackFromWhatsApp={handleBackFromWhatsApp} />;
    } else {
        inhalt = (
            <div className={feldClass}>
                {/* Kopf: Etiketten, Überschrift, Fortschritt */}
                <div className="mb-8 border-b border-fuge pb-6">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <span className={etikettKlassen}>
                            {/* Kreuz an der ersten Zeile, auch wenn das Etikett mobil umbricht */}
                            <Fugenkreuz className="mt-1 size-3 self-start text-strich" />
                            <span>
                                Badanfrage &middot; <span><span className="whitespace-nowrap">Schritt {step}</span> <span className="whitespace-nowrap">von {TOTAL_STEPS}</span></span>
                            </span>
                        </span>
                        <span className={etikettKlassen}>
                            Kostenlos und unverbindlich
                        </span>
                    </div>
                    <h2 className="mt-6 text-fs-5 text-tinte">
                        Planen Sie Ihr neues Bad mit uns.
                    </h2>

                    {/* Fortschritt: erledigt = Haken, aktuell = Tinte, offen = Nummer in Tinte-2 */}
                    <div className="mt-6 grid grid-cols-5 border-t border-l border-strich" aria-hidden="true">
                        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
                            <div
                                key={s}
                                className={`flex h-8 items-center justify-center border-r border-b border-strich font-mono text-fs-1 tabular-nums ${
                                    s === step ? 'bg-tinte text-kalk' : s < step ? 'bg-fliese text-tinte' : 'bg-fliese text-tinte-2'
                                }`}
                            >
                                {s < step ? <Icon name="haken" groesse={4} /> : s}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inhalt des Schritts */}
                {step === 1 && <Schritt1 formData={formData} setFormData={setFormData} />}
                {step === 2 && <Schritt2 formData={formData} setFormData={setFormData} />}
                {step === 3 && <Schritt3 formData={formData} setFormData={setFormData} flaecheText={flaecheText} />}
                {step === 4 && <Schritt4 formData={formData} setFormData={setFormData} toggleFeature={toggleFeature} />}
                {step === 5 && (
                    <Schritt5
                        setStep={setStep} status={status} errorMessage={errorMessage} formData={formData} setFormData={setFormData}
                        handleWhatsApp={handleWhatsApp} handleOnlineSubmit={handleOnlineSubmit}
                    />
                )}

                {/* Fußleiste für die Schritte 1–4 (Gutachten u4, Rezept 2; R-01b): mobil „Zurück“ über „Weiter“ wie DOM- und
                    Tab-Folge (kein flex-col-reverse), ab breitem Behälter Zurück links, Weiter rechts */}
                {step < TOTAL_STEPS && (
                    <div
                        className={`mt-8 flex flex-col items-stretch gap-4 border-t border-fuge pt-6 @md:flex-row @md:items-center ${
                            step > 1 ? '@md:justify-between' : '@md:justify-end'
                        }`}
                    >
                        {step > 1 && (
                            <Knopf variante="text" onClick={() => setStep(step - 1)} iconLinks="pfeil-links" className="self-start @md:self-auto">
                                Zurück
                            </Knopf>
                        )}
                        {/* Die Ziffer bleibt bei „Schritt“ (E4-W1, F1): „Schritt N“ bricht nicht */}
                        <Knopf onClick={() => setStep(step + 1)} icon="pfeil-rechts" className="w-full @md:w-auto">
                            Weiter zu <span className="whitespace-nowrap">Schritt {step + 1}</span>
                        </Knopf>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div ref={wurzel} className="@container" data-baustein="badanfrage">
            {inhalt}
        </div>
    );
}
