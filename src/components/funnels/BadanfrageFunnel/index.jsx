"use client";
// Badanfrage (E-011): Schrittwechsel und Rahmen hier. Logik aus useBadanfrage (gemeinsam mit der Kern-Ansicht); Markup in Schritt1–5,
// Erfolg und WhatsAppGeoeffnet. E3-BAU-18: Darstellung nach dem KERN-Formularmuster (wie TezgelAnfrageFunnel/index.tsx):
// Feld an der Fuge, Fortschritt in Tinte und Fliese, Zurück als Textlink, Weiter als Hauptknopf.
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen, knopfKlassen } from '@/components/kern/stile';
import { useBadanfrage, TOTAL_STEPS } from '@/lib/formulare/useBadanfrage';
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
        <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12">
            {/* Kopf und Fortschritt */}
            <div className="border-b border-fuge pb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className={etikettKlassen}>
                        <Fugenkreuz className="size-3 text-strich" />
                        Interaktive Badanfrage &middot; Schritt {step} von {TOTAL_STEPS}
                    </span>
                    <span className={etikettKlassen}>
                        Kostenlos &amp; unverbindlich
                    </span>
                </div>
                <h2 className="mt-6 font-anzeige text-fs-5 font-semibold text-tinte">
                    Planen Sie Ihr Traumbad mit dem Fachbetrieb aus Aßlar
                </h2>

                {/* Fortschritt: Felder in Tinte (erreicht) und Fliese, getrennt durch 1-px-Linien */}
                <div className="mt-6 grid grid-cols-5 border-l border-t border-strich" aria-hidden="true">
                    {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
                        <div
                            key={s}
                            className={`h-2 border-b border-r border-strich ${s <= step ? 'bg-tinte' : 'bg-fliese'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Formularinhalt */}
            <div className="mt-8">
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
            </div>

            {/* Navigation für die Schritte 1–4 */}
            {step < TOTAL_STEPS && (
                <div className={`mt-8 flex flex-col gap-4 border-t border-fuge pt-6 sm:flex-row sm:items-center ${step === 1 ? 'sm:justify-end' : 'sm:justify-between'}`}>
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className={knopfKlassen('text', 'self-start')}
                            data-motion="druck"
                        >
                            <Icon name="pfeil-links" groesse={5} />
                            Zurück
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        className={knopfKlassen('haupt', 'w-full sm:w-auto')}
                        data-motion="druck"
                    >
                        Weiter zu Schritt {step + 1}
                        <Icon name="pfeil-rechts" groesse={5} />
                    </button>
                </div>
            )}
        </div>
    );
}
