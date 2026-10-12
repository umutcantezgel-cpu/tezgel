"use client";
// Badanfrage (E-011): Schrittwechsel und Rahmen hier. Logik aus useBadanfrage (gemeinsam mit der Kern-Ansicht); Markup in Schritt1–5,
// Erfolg und WhatsAppGeoeffnet. Darstellung nach KERN v2 (Q-01, Vorbild Express-Anfrage): ein Feld an der Fuge mit Kopf in Mono,
// Fortschritt als Fugenband (dekorativ wie im Bestand; der Stand steht im Etikett), Fußleiste Zurück/Weiter.
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
        calculatedSqm,
        objectTitle,
        scopeTitle,
        tierTitle,
        featureLabels,
        addressText,
        handleWhatsApp,
        handleOnlineSubmit,
        handleNewRequest,
        handleBackFromWhatsApp
    } = useBadanfrage();

    if (status === 'success') {
        return <Erfolg handleNewRequest={handleNewRequest} referenceId={referenceId} formData={formData} calculatedSqm={calculatedSqm} objectTitle={objectTitle} scopeTitle={scopeTitle} tierTitle={tierTitle} featureLabels={featureLabels} addressText={addressText} />;
    }

    if (status === 'whatsapp_opened') {
        return <WhatsAppGeoeffnet handleBackFromWhatsApp={handleBackFromWhatsApp} calculatedSqm={calculatedSqm} scopeTitle={scopeTitle} />;
    }

    return (
        <div className="@container">
            <div className={feldClass}>
                {/* Kopf: Etiketten, Überschrift, Fortschritt */}
                <div className="mb-8 border-b border-fuge pb-6">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <span className={etikettKlassen}>
                            {/* Kreuz an der ersten Zeile, auch wenn das Etikett mobil umbricht */}
                            <Fugenkreuz className="mt-1 size-3 self-start text-strich" />
                            <span>
                                Interaktive Badanfrage &middot; <span className="whitespace-nowrap">Schritt {step} von {TOTAL_STEPS}</span>
                            </span>
                        </span>
                        <span className={etikettKlassen}>
                            Kostenlos &amp; unverbindlich
                        </span>
                    </div>
                    <h2 className="mt-6 text-fs-5 text-tinte">
                        Planen Sie Ihr Traumbad mit dem Fachbetrieb aus Aßlar
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
                {step === 3 && <Schritt3 formData={formData} setFormData={setFormData} calculatedSqm={calculatedSqm} />}
                {step === 4 && <Schritt4 formData={formData} setFormData={setFormData} toggleFeature={toggleFeature} />}
                {step === 5 && (
                    <Schritt5
                        setStep={setStep} status={status} errorMessage={errorMessage} formData={formData} setFormData={setFormData}
                        handleWhatsApp={handleWhatsApp} handleOnlineSubmit={handleOnlineSubmit}
                    />
                )}

                {/* Fußleiste für die Schritte 1–4: mobil Weiter oben in voller Breite, Zurück darunter */}
                {step < TOTAL_STEPS && (
                    <div
                        className={`mt-8 flex flex-col-reverse items-stretch gap-4 border-t border-fuge pt-6 @md:flex-row @md:items-center ${
                            step > 1 ? '@md:justify-between' : '@md:justify-end'
                        }`}
                    >
                        {step > 1 && (
                            <Knopf variante="text" onClick={() => setStep(step - 1)} iconLinks="pfeil-links">
                                Zurück
                            </Knopf>
                        )}
                        <Knopf onClick={() => setStep(step + 1)} icon="pfeil-rechts" className="w-full @md:w-auto">
                            Weiter zu Schritt {step + 1}
                        </Knopf>
                    </div>
                )}
            </div>
        </div>
    );
}
