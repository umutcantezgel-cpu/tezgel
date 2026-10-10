"use client";
// Badanfrage (E-011): Zustand, Schrittwechsel und Absenden hier; Logik in logik.js (gesperrt), Markup in Schritt1–5,
// Erfolg und WhatsAppGeoeffnet.
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';
import { TOTAL_STEPS, beschriftungen, nachricht, nutzlast } from './logik';
import Schritt1 from './Schritt1';
import Schritt2 from './Schritt2';
import Schritt3 from './Schritt3';
import Schritt4 from './Schritt4';
import Schritt5 from './Schritt5';
import Erfolg from './Erfolg';
import WhatsAppGeoeffnet from './WhatsAppGeoeffnet';

export default function BadanfrageFunnel() {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error' | 'whatsapp_opened'
    const [errorMessage, setErrorMessage] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [formData, setFormData] = useState({
        objectType: 'efh',
        scope: 'komplett',
        length: '3.0',
        width: '2.5',
        persons: '2',
        tier: 'premium',
        features: ['walkin', 'led-spiegel'],
        name: '',
        phone: '',
        email: '',
        street: '',
        zipCity: '',
        notes: '',
        honeypot: ''
    });

    const toggleFeature = (feat) => {
        setFormData(prev => {
            const exists = prev.features.includes(feat);
            return {
                ...prev,
                features: exists ? prev.features.filter(f => f !== feat) : [...prev.features, feat]
            };
        });
    };

    const { calculatedSqm, objectTitle, scopeTitle, tierTitle, personsLabel, featureLabels, addressText } = beschriftungen(formData);

    const getMessage = () => nachricht({ ownerLastName: COMPANY_DATA.owner.lastName, formData, calculatedSqm, objectTitle, scopeTitle, tierTitle, personsLabel, featureLabels, addressText });

    const handleWhatsApp = () => {
        if (!formData.name || !formData.phone) {
            setErrorMessage('Bitte tragen Sie zumindest Name und Telefonnummer ein.');
            return;
        }
        openWhatsApp({
            phone: COMPANY_DATA.contact.whatsappNumber,
            text: getMessage(),
        });
        setStatus('whatsapp_opened');
    };

    const handleOnlineSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setStatus('submitting');

        try {
            const response = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nutzlast({ formData, calculatedSqm, objectTitle, scopeTitle, tierTitle, personsLabel, featureLabels, addressText }))
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Übertragung fehlgeschlagen.');
            }

            if (data.referenceId) {
                setReferenceId(data.referenceId);
            }

            setStatus('success');
        } catch (err) {
            console.error('Submission error:', err);
            setErrorMessage(err.message || 'Verbindungsfehler beim Absenden.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return <Erfolg setStep={setStep} setStatus={setStatus} referenceId={referenceId} setReferenceId={setReferenceId} formData={formData} calculatedSqm={calculatedSqm} objectTitle={objectTitle} scopeTitle={scopeTitle} tierTitle={tierTitle} featureLabels={featureLabels} addressText={addressText} />;
    }

    if (status === 'whatsapp_opened') {
        return <WhatsAppGeoeffnet setStep={setStep} setStatus={setStatus} calculatedSqm={calculatedSqm} scopeTitle={scopeTitle} />;
    }

    return (
        <div className="glass-bezel-outer max-w-3xl mx-auto overflow-hidden">
            <div className="glass-bezel-inner overflow-hidden">
                {/* Header / Progress Bar */}
                <div className="ceramic-band p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="eyebrow">
                            <Sparkles className="w-3.5 h-3.5" />
                            Interaktive Badanfrage &middot; Schritt {step} von {TOTAL_STEPS}
                        </span>
                        <span className="eyebrow eyebrow-neutral">
                            Kostenlos &amp; unverbindlich
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-neutral-900">
                        Planen Sie Ihr Traumbad mit dem Fachbetrieb aus Aßlar
                    </h2>

                    {/* Progress Indicators */}
                    <div className="grid grid-cols-5 gap-2 mt-6" aria-hidden="true">
                        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
                            <div
                                key={s}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    s <= step ? 'bg-orange-600' : 'bg-neutral-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6 sm:p-10">
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

                    {/* Navigation Buttons for Steps 1-4 */}
                    {step < TOTAL_STEPS && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-slate-700 hover:text-orange-600 font-bold text-xs transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Zurück
                                </button>
                            ) : (
                                <div />
                            )}

                            <button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                className="btn-primary px-6 py-3 text-xs"
                            >
                                Weiter zu Schritt {step + 1}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
