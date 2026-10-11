'use client';
// Fliesen-Konfigurator (E-011): Markup hier. Logik aus useFliesenKonfigurator (gemeinsam mit der Kern-Ansicht);
// Markup in Schritt1–4, Erfolg, WhatsAppGeoeffnet, OptionGroup und ResultSummary.
// E3-BAU-15: Rahmen nach dem KERN-Formularmuster (wie BadanfrageFunnel/index.jsx): Feld an der Fuge, Fortschritt in Tinte
// und Fliese ohne Orange, Zurück als Textlink, Weiter als Hauptknopf. Logik, IDs, ARIA und Texte unverändert.
import React from 'react';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen, knopfKlassen } from '@/components/kern/stile';
import { STEPS, fmt, useFliesenKonfigurator } from '@/lib/formulare/useFliesenKonfigurator';
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
    const {
        step,
        sentVia,
        setSentVia,
        referenceId,
        isSubmitting,
        errorMessage,
        headingRef,
        data,
        update,
        hasAreaRooms,
        hasStairs,
        areaCalc,
        stairCalc,
        rises,
        goToStep,
        handleSubmit,
        handleNewRequest
    } = useFliesenKonfigurator({ area, substrate, format, material, floorHeating });

    // -----------------------------------------------------------------------
    // Success view
    // -----------------------------------------------------------------------
    if (sentVia === 'online') {
        return <Erfolg data={data} referenceId={referenceId} handleNewRequest={handleNewRequest} />;
    }

    if (sentVia === 'whatsapp') {
        return <WhatsAppGeoeffnet data={data} setSentVia={setSentVia} />;
    }

    // -----------------------------------------------------------------------
    // Stepper
    // -----------------------------------------------------------------------
    return (
        <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12">
            {/* Kopf und Fortschritt */}
            <div className="border-b border-fuge pb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className={etikettKlassen}>
                        <Fugenkreuz className="size-3 text-strich" />
                        Fliesen-Konfigurator
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
                                    {step > s ? (
                                        <>
                                            <Icon name="haken" groesse={4} />
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

                <p className={`mt-6 ${etikettKlassen}`}>Schritt {step} von 4</p>
                <h2 className="mt-2 font-anzeige text-fs-5 font-semibold text-tinte">Fliesenprojekt vorbereiten</h2>

                {/* Live preview */}
                <div className="mt-6 space-y-1 border border-fuge bg-kalk p-4" aria-live="polite">
                    <p className="font-mono text-fs-1 text-tinte-2">Materialbedarf inkl. Verschnitt (Richtwert):</p>
                    {!hasAreaRooms && !hasStairs && (
                        <p className="text-fs-2 text-tinte-2">Wählen Sie zuerst einen Bereich.</p>
                    )}
                    {areaCalc && areaCalc.valid && (
                        <p className="font-anzeige text-fs-4 font-semibold tabular-nums text-tinte">
                            ca. {fmt(areaCalc.low)}–{fmt(areaCalc.high)} m²
                            <span className="ml-2 font-text font-normal text-fs-2 text-tinte-2">aus {fmt(areaCalc.net)} m² netto</span>
                        </p>
                    )}
                    {areaCalc && !areaCalc.valid && (
                        <p className="text-fs-2 text-tinte-2">Fläche in Schritt 3 eingeben.</p>
                    )}
                    {stairCalc && (
                        <p className="text-fs-2 text-tinte-2">
                            <strong className="font-semibold text-tinte">Treppe:</strong>{' '}
                            {stairCalc.valid
                                ? `${fmt(stairCalc.total, 2)} m² netto (ohne Verschnitt)`
                                : 'Menge nach Stufenmaßen bzw. beim Aufmaß'}
                        </p>
                    )}
                </div>

                {/* Fortschrittsleiste: 1-px-Raster, dekorativ (die Liste oben trägt die Bedeutung) */}
                <div className="mt-4 grid grid-cols-4 border-l border-t border-strich" aria-hidden="true">
                    {[1, 2, 3, 4].map((s) => (
                        <div
                            key={s}
                            className={`h-2 border-b border-r border-strich ${s <= step ? 'bg-tinte' : 'bg-fliese'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Formularinhalt */}
            <div className="mt-8">
                <div className="mb-6">
                    <p ref={headingRef} tabIndex={-1} className="font-anzeige text-fs-4 font-semibold text-tinte focus:outline-none">
                        {step}. {STEPS[step - 1].title}
                    </p>
                    <p className="mt-2 text-fs-2 text-tinte-2">{STEPS[step - 1].text}</p>
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
            </div>

            {/* Step navigation */}
            {step < 4 && (
                <div className={`mt-8 flex flex-col gap-4 border-t border-fuge pt-6 sm:flex-row sm:items-center ${step === 1 ? 'sm:justify-end' : 'sm:justify-between'}`}>
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => goToStep(step - 1)}
                            className={knopfKlassen('text', 'self-start')}
                            data-motion="druck"
                        >
                            <Icon name="pfeil-links" groesse={5} />
                            Zurück
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => goToStep(step + 1)}
                        disabled={data.rooms.length === 0}
                        aria-describedby={data.rooms.length === 0 && step === 1 ? 'konfigurator-step1-hint' : undefined}
                        className={knopfKlassen('haupt', 'w-full sm:w-auto')}
                        data-motion="druck"
                    >
                        {step === 3 ? 'Zur Zusammenfassung' : `Weiter zu Schritt ${step + 1}`}
                        <Icon name="pfeil-rechts" groesse={5} />
                    </button>
                </div>
            )}
        </div>
    );
}
