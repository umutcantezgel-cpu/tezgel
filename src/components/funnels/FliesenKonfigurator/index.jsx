'use client';
// Fliesen-Konfigurator (E-011): Zustand, Schrittwechsel mit Fokus und Absenden hier; Logik in logik.js (gesperrt),
// Markup in Schritt1–4, Erfolg, WhatsAppGeoeffnet, OptionGroup und ResultSummary.
import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';
import { STEPS, AREA_ROOMS, calculateArea, calculateStairs, parseCount, fmt, anfangsdaten, nachricht, nutzlast } from './logik';
import Schritt1 from './Schritt1';
import Schritt2 from './Schritt2';
import Schritt3 from './Schritt3';
import Schritt4 from './Schritt4';
import Erfolg from './Erfolg';
import WhatsAppGeoeffnet from './WhatsAppGeoeffnet';

/**
 * Fliesen-Konfigurator. All props are optional presets:
 * area ('kueche' | 'flur' | … or an array of room ids), substrate ('altfliesen' | …),
 * format ('xxl' | …), material ('holzoptik' | …), floorHeating (boolean).
 */
export default function FliesenKonfigurator({ area, substrate, format, material, floorHeating } = {}) {
    const [step, setStep] = useState(1);
    const [sentVia, setSentVia] = useState(null); // 'whatsapp' | 'online'
    const [referenceId, setReferenceId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const headingRef = useRef(null);

    const [data, setData] = useState(() => anfangsdaten({ area, substrate, format, material, floorHeating }));

    const update = (patch) => setData((prev) => ({ ...prev, ...patch }));

    const hasAreaRooms = data.rooms.some((r) => AREA_ROOMS.includes(r));
    const hasStairs = data.rooms.includes('treppe');
    const areaCalc = calculateArea(data);
    const stairCalc = calculateStairs(data);
    const rises = parseCount(data.stairRises);

    const goToStep = (next) => {
        setStep(next);
        requestAnimationFrame(() => headingRef.current?.focus());
    };

    const buildMessage = () => nachricht(data);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const submitter = event.nativeEvent?.submitter;
        const channel = submitter?.value === 'whatsapp' ? 'whatsapp' : 'online';
        const message = buildMessage();

        if (channel === 'whatsapp') {
            openWhatsApp({
                phone: COMPANY_DATA.contact.whatsappNumber,
                text: message,
            });
            setSentVia('whatsapp');
            return;
        }

        // Online Direct API Submission
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const res = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nutzlast(data))
            });

            const resData = await res.json();
            if (!res.ok || !resData.success) {
                throw new Error(resData.error || 'Übertragung fehlgeschlagen.');
            }

            if (resData.referenceId) {
                setReferenceId(resData.referenceId);
            }
            setSentVia('online');
        } catch (err) {
            console.error('Fliesen-Konfigurator submission error:', err);
            setErrorMessage(err.message || 'Verbindungsfehler beim Absenden.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // -----------------------------------------------------------------------
    // Success view
    // -----------------------------------------------------------------------
    if (sentVia === 'online') {
        return <Erfolg setStep={setStep} data={data} setSentVia={setSentVia} referenceId={referenceId} setReferenceId={setReferenceId} />;
    }

    if (sentVia === 'whatsapp') {
        return <WhatsAppGeoeffnet data={data} setSentVia={setSentVia} />;
    }

    // -----------------------------------------------------------------------
    // Stepper
    // -----------------------------------------------------------------------
    return (
        <div className="glass-bezel-outer max-w-4xl mx-auto overflow-hidden">
            <div className="glass-bezel-inner overflow-hidden">
                {/* Header */}
                <div className="ceramic-band p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="eyebrow">
                            <Sparkles className="w-3.5 h-3.5" />
                            Fliesen-Konfigurator
                        </span>
                        <ol className="flex items-center gap-2" aria-label="Fortschritt">
                            {STEPS.map((item, idx) => {
                                const s = idx + 1;
                                return (
                                    <li
                                        key={item.title}
                                        aria-current={step === s ? 'step' : undefined}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black tabular-nums transition-all duration-300 ${
                                            step === s
                                                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                                                : step > s
                                                    ? 'bg-orange-50 text-orange-950 border border-orange-200'
                                                    : 'bg-white text-slate-700 border border-slate-300'
                                        }`}
                                    >
                                        {step > s ? (
                                            <>
                                                <Check className="w-4 h-4 text-orange-600" aria-hidden="true" />
                                                <span className="sr-only">Schritt {s}: {item.title} (erledigt)</span>
                                            </>
                                        ) : (
                                            <>
                                                <span aria-hidden="true">{s}</span>
                                                <span className="sr-only">Schritt {s}: {item.title}</span>
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    <p className="text-xs font-bold text-slate-700 tabular-nums">Schritt {step} von 4</p>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">Fliesenprojekt vorbereiten</h2>

                    {/* Live preview */}
                    <div className="mt-4 p-3.5 rounded-tile-sm bg-white border border-slate-200 space-y-1" aria-live="polite">
                        <p className="text-xs font-bold text-slate-700">Materialbedarf inkl. Verschnitt (Richtwert):</p>
                        {!hasAreaRooms && !hasStairs && (
                            <p className="text-sm text-slate-700">Wählen Sie zuerst einen Bereich.</p>
                        )}
                        {areaCalc && areaCalc.valid && (
                            <p className="font-display text-lg font-black text-orange-950 tabular-nums">
                                ca. {fmt(areaCalc.low)}–{fmt(areaCalc.high)} m²
                                <span className="ml-2 text-xs font-bold text-slate-700">aus {fmt(areaCalc.net)} m² netto</span>
                            </p>
                        )}
                        {areaCalc && !areaCalc.valid && (
                            <p className="text-sm text-slate-700">Fläche in Schritt 3 eingeben.</p>
                        )}
                        {stairCalc && (
                            <p className="text-sm text-slate-700">
                                <strong className="text-slate-900">Treppe:</strong>{' '}
                                {stairCalc.valid
                                    ? `${fmt(stairCalc.total, 2)} m² netto (ohne Verschnitt)`
                                    : 'Menge nach Stufenmaßen bzw. beim Aufmaß'}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-4 gap-2 mt-4" aria-hidden="true">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`h-2 rounded-full transition-all duration-500 ${s <= step ? 'bg-orange-600' : 'bg-slate-200'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-6 sm:p-10">
                    <div className="mb-6">
                        <p ref={headingRef} tabIndex={-1} className="text-base sm:text-lg font-black text-slate-900 focus:outline-none">
                            {step}. {STEPS[step - 1].title}
                        </p>
                        <p className="text-sm text-slate-700 mt-1">{STEPS[step - 1].text}</p>
                    </div>

                    {step === 1 && <Schritt1 data={data} update={update} />}

                    {/* Step 2: substrate */}
                    {step === 2 && <Schritt2 data={data} update={update} />}

                    {/* Step 3: format, material, quantity */}
                    {step === 3 && <Schritt3 data={data} update={update} hasAreaRooms={hasAreaRooms} hasStairs={hasStairs} rises={rises} />}

                    {/* Step 4: summary & contact */}
                    {step === 4 && (
                        <Schritt4 data={data} update={update} goToStep={goToStep} handleSubmit={handleSubmit} isSubmitting={isSubmitting} errorMessage={errorMessage} />
                    )}

                    {/* Step navigation */}
                    {step < 4 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={() => goToStep(step - 1)}
                                    className="btn-ghost px-5 py-3 text-xs"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Zurück
                                </button>
                            ) : (
                                <div />
                            )}
                            <button
                                type="button"
                                onClick={() => goToStep(step + 1)}
                                disabled={data.rooms.length === 0}
                                aria-describedby={data.rooms.length === 0 && step === 1 ? 'konfigurator-step1-hint' : undefined}
                                className="btn-primary px-6 py-3 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {step === 3 ? 'Zur Zusammenfassung' : `Weiter zu Schritt ${step + 1}`}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
