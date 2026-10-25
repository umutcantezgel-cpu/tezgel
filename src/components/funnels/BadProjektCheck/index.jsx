"use client";
// Bad-Projektcheck (E-011): Logik aus useProjektCheck (gemeinsam mit der Kern-Ansicht), Markup in Schritt1–4 und Zusammenfassung.
// Darstellung KERN v2 (Q-02, E-038): ein Feld an der Fuge (Rahmen Strich, Fläche Fliese) ohne eigene Hintergrundfläche,
// Kopf als Schriftfeld-Zeile mit Mono-Etiketten, links die vier Angaben auf Fliese, rechts Zusammenfassung und Anfrage auf
// Kalk (schmal darunter). Ablauf, Texte, IDs und Nutzlast unverändert.
// F-05 (Fusion II, E-039): Grundgerüst B. Spalten, Innenabstände und Raster richten sich nach der eigenen Breite
// (@container), nicht nach dem Bildschirm: Auf /bad steht der Baustein in einer 8/12-Spalte (etwa 795 px), bei 200 %
// CSS-Zoom bleibt er mit dem Bildschirm-Raster bei halber Breite – beide Male stapeln die Spalten, statt Knopftexte über die
// Kante zu drücken (Gutachten u5, Stolperstein 200 % Zoom). Zwei Spalten erst ab 64 rem Bausteinbreite (@5xl).
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
        <div className="@container border border-strich bg-fliese">
            {/* Kopf: Schriftfeld-Zeile mit Etiketten, darunter Titel und Einleitung */}
            <div className="border-b border-fuge p-6 @lg:p-8 @5xl:p-12">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-fuge pb-4">
                    <span className={etikettKlassen}>
                        <Fugenkreuz className="size-3 text-strich" />
                        Projektcheck fürs Bad
                    </span>
                    <span className="hidden font-mono text-fs-1 text-tinte @lg:inline-flex">
                        Festpreis nach dem Termin bei Ihnen vor Ort
                    </span>
                </div>
                <h2 className="mt-6 text-fs-5 text-tinte">
                    Beschreiben Sie Ihr Bad in vier Schritten
                </h2>
                <p className="mt-2 max-w-mass text-fs-2 text-tinte-2">
                    Wählen Sie Größe, Umfang, Ausstattung und Wünsche. Ihre Angaben kommen geordnet bei uns an. Wir
                    melden uns für einen kostenfreien Termin bei Ihnen vor Ort in Aßlar, Wetzlar und Mittelhessen.
                </p>
            </div>

            <div className="grid grid-cols-1 @5xl:grid-cols-12">
                {/* Angaben 1–4 (links 7 Spalten); eigene Containerbreite für die Raster der Schritte */}
                <div className="@container flex min-w-0 flex-col gap-12 p-6 @lg:p-8 @5xl:col-span-7 @5xl:p-12">
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
