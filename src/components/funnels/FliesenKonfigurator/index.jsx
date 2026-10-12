'use client';
// Fliesen-Konfigurator (E-011): Markup hier. Logik aus useFliesenKonfigurator (gemeinsam mit der Kern-Ansicht);
// Markup in Schritt1–4, Erfolg, WhatsAppGeoeffnet, OptionGroup und ResultSummary.
// Darstellung nach KERN v2 (Q-05, Vorbild Express-Anfrage und Projektanfrage der Startseite): ein Feld (Fliese, Rahmen
// Strich) mit Kopf (Mono-Etikett mit Fugenkreuz, Fortschritt als Mono-Felder, Überschrift) und dem Richtwert live als
// Schriftfeld an der Fuge (Kalk, Zahlen in Mono); darunter ein Fugenband mit dem Fortschritt, dann der Schritt.
// Spalten nach Behälterbreite (@container): ab 56 rem steht der Richtwert rechts neben der Überschrift.
// Texte, IDs, Rollen, aria-*, Fokusführung (headingRef) und Verhalten unverändert.
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
        <div className="@container">
            <div className="border border-strich bg-fliese">
                {/* Kopf: Etikett, Fortschritt, Überschrift und Richtwert live */}
                <div className="p-6 @xl:p-8 @4xl:p-12">
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

                    <div className="mt-6 grid grid-cols-1 gap-6 @4xl:grid-cols-12 @4xl:items-start">
                        <div className="@4xl:col-span-6">
                            <p className="font-mono text-fs-1 text-tinte-2 tabular-nums">Schritt {step} von 4</p>
                            <h2 className="mt-2 text-fs-5 text-tinte">Fliesenprojekt vorbereiten</h2>
                        </div>

                        {/* Richtwert live als Schriftfeld: Zahl und Netto-Fläche in Mono */}
                        <div className="flex flex-col gap-2 border border-fuge bg-kalk p-4 @4xl:col-span-6" aria-live="polite">
                            <p className="font-mono text-fs-1 text-tinte-2">Materialbedarf inkl. Verschnitt (Richtwert):</p>
                            {!hasAreaRooms && !hasStairs && (
                                <p className="font-text text-fs-2 text-tinte-2">Wählen Sie zuerst einen Bereich.</p>
                            )}
                            {areaCalc && areaCalc.valid && (
                                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-fs-4 text-tinte tabular-nums">
                                    <span>ca. <span className="whitespace-nowrap">{fmt(areaCalc.low)}–{fmt(areaCalc.high)}</span> m²</span>
                                    <span className="text-fs-2 text-tinte-2">aus {fmt(areaCalc.net)} m² netto</span>
                                </p>
                            )}
                            {areaCalc && !areaCalc.valid && (
                                <p className="font-text text-fs-2 text-tinte-2">Fläche in Schritt 3 eingeben.</p>
                            )}
                            {stairCalc && (
                                <p className="font-text text-fs-2 text-tinte-2">
                                    <strong className="font-semibold text-tinte">Treppe:</strong>{' '}
                                    <span className={stairCalc.valid ? 'font-mono text-tinte' : undefined}>
                                        {stairCalc.valid
                                            ? `${fmt(stairCalc.total, 2)} m² netto (ohne Verschnitt)`
                                            : 'Menge nach Stufenmaßen bzw. beim Aufmaß'}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Fortschritt als Fugenband (Schmuck; der Stand steht in der Liste oben) */}
                <div className="grid grid-cols-4 gap-px" aria-hidden="true">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`h-1 ${s <= step ? 'bg-tinte' : 'bg-fuge'}`} />
                    ))}
                </div>

                <div className="flex flex-col gap-8 p-6 @xl:p-8 @4xl:p-12">
                    <div>
                        <p ref={headingRef} tabIndex={-1} className="font-anzeige text-fs-4 font-semibold text-tinte">
                            {step}. {STEPS[step - 1].title}
                        </p>
                        <p className="mt-2 font-text text-fs-2 text-tinte-2">{STEPS[step - 1].text}</p>
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
                        <div className="flex flex-col-reverse items-stretch gap-4 border-t border-fuge pt-6 @xl:flex-row @xl:items-center @xl:justify-between">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => goToStep(step - 1)}
                                    className={knopfKlassen('text')}
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
                                className={knopfKlassen('haupt', 'w-full @xl:ml-auto @xl:w-auto')}
                                data-motion="druck"
                            >
                                {step === 3 ? 'Zur Zusammenfassung' : `Weiter zu Schritt ${step + 1}`}
                                <Icon name="pfeil-rechts" groesse={5} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
