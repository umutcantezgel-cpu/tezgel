"use client";
// Bad-Projektcheck (E-011): Logik aus useProjektCheck (gemeinsam mit der Kern-Ansicht), Markup in Schritt1–4 und Zusammenfassung.
// E3-BAU-19: Darstellung nach dem KERN-Formularmuster (wie BadanfrageFunnel/index.jsx): Feld an der Fuge, Etikett mit Fugenkreuz,
// Angaben links, Zusammenfassung auf Kalk rechts (ab lg). Texte, IDs, ARIA und Nutzlast unverändert.
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen } from '@/components/kern/stile';
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
        <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12">
            {/* Kopf */}
            <div className="border-b border-fuge pb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className={etikettKlassen}>
                        <Fugenkreuz className="size-3 text-strich" />
                        Bad-Projektcheck
                    </span>
                    <span className={`${etikettKlassen} max-sm:hidden`}>
                        Festpreis nach Vor-Ort-Aufmaß
                    </span>
                </div>
                <h2 className="mt-6 font-anzeige text-fs-5 font-semibold text-tinte">
                    Ihr Badprojekt in vier Schritten beschreiben
                </h2>
                <p className="mt-2 max-w-mass text-fs-2 text-tinte-2">
                    Wählen Sie Größe, Umfang, Ausstattungsniveau und Wünsche – wir erhalten eine strukturierte Anfrage und
                    melden uns für einen kostenfreien Aufmaßtermin in Aßlar, Wetzlar und Mittelhessen.
                </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-12">
                {/* Angaben 1–4 (links, 7 Spalten) */}
                <div className="flex min-w-0 flex-col gap-8 xl:col-span-6">
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
    );
}
