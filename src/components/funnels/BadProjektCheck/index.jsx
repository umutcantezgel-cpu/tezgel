"use client";
// Bad-Projektcheck (E-011): Logik aus useProjektCheck (gemeinsam mit der Kern-Ansicht), Markup in Schritt1–4 und Zusammenfassung.
import { ClipboardCheck } from 'lucide-react';
import { useProjektCheck } from '@/lib/formulare/useProjektCheck';
import Schritt1 from './Schritt1';
import Schritt2 from './Schritt2';
import Schritt3 from './Schritt3';
import Schritt4 from './Schritt4';
import Zusammenfassung from './Zusammenfassung';

export default function BadProjektCheck() {
    const {
        sqm,
        changeSqm,
        tier,
        setTier,
        sanitaryScope,
        setSanitaryScope,
        selectedOptions,
        toggleOption,
        contactOpen,
        setContactOpen,
        leadData,
        setLeadData,
        sentVia,
        setSentVia,
        referenceId,
        isSubmitting,
        errorMessage,
        sqmLabel,
        scopeLabel,
        tierLabel,
        extras,
        matchingBath,
        handleLeadSubmit,
        handleNewRequest
    } = useProjektCheck();

    return (
        <div className="glass-bezel-outer max-w-4xl mx-auto overflow-hidden">
            <div className="glass-bezel-inner overflow-hidden">
                {/* Header */}
                <div className="ceramic-band p-6 sm:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="eyebrow">
                            <ClipboardCheck className="w-3.5 h-3.5" />
                            Bad-Projektcheck
                        </span>
                        <span className="eyebrow eyebrow-neutral hidden sm:inline-flex">
                            Festpreis nach Vor-Ort-Aufmaß
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black mb-2 text-slate-900">
                        Ihr Badprojekt in vier Schritten beschreiben
                    </h2>
                    <p className="text-sm text-slate-700 max-w-2xl leading-relaxed">
                        Wählen Sie Größe, Umfang, Ausstattungsniveau und Wünsche – wir erhalten eine strukturierte Anfrage und
                        melden uns für einen kostenfreien Aufmaßtermin in Aßlar, Wetzlar und Mittelhessen.
                    </p>
                </div>

                <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controls (Left 7 Cols) */}
                    <div className="lg:col-span-7 space-y-7">
                        <Schritt1 sqm={sqm} changeSqm={changeSqm} sqmLabel={sqmLabel} />
                        <Schritt2 sanitaryScope={sanitaryScope} setSanitaryScope={setSanitaryScope} />
                        <Schritt3 tier={tier} setTier={setTier} />
                        <Schritt4 selectedOptions={selectedOptions} toggleOption={toggleOption} />
                    </div>

                    <Zusammenfassung
                        sqmLabel={sqmLabel} scopeLabel={scopeLabel} tierLabel={tierLabel} extras={extras} matchingBath={matchingBath}
                        contactOpen={contactOpen} setContactOpen={setContactOpen}
                        sentVia={sentVia} setSentVia={setSentVia} referenceId={referenceId} handleNewRequest={handleNewRequest}
                        leadData={leadData} setLeadData={setLeadData}
                        isSubmitting={isSubmitting} errorMessage={errorMessage} handleLeadSubmit={handleLeadSubmit}
                    />
                </div>
            </div>
        </div>
    );
}
