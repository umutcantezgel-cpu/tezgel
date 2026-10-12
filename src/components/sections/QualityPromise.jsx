import React from 'react';
import { COMPANY_DATA } from '@/config/company';
import Abschnitt from '@/components/kern/Abschnitt';
import Merkliste from '@/components/kern/Merkliste';
import Knopf from '@/components/kern/Knopf';

// Qualitätsversprechen (KERN K-009, Merkliste im Halbverband): acht Punkte als Zeilen an der Fuge mit Mono-Nummer,
// „Garantierter Standard“ einmal im Etikett des Abschnitts, der Abschluss als Zeile ohne Kasten.
// Überschrift, Texte und Links bleiben wortgleich.
export default function QualityPromise() {
    const punkte = COMPANY_DATA.qualityPromises.map((promise) => ({
        titel: promise.title,
        text: promise.description,
    }));

    return (
        <Abschnitt
            id="qualitaet"
            titelId="quality-promise-heading"
            etikett={<>HWK Fachbetrieb &middot; {COMPANY_DATA.authority.shortName} &middot; Garantierter Standard</>}
            titel="Unser 8-Punkte-Qualitätsversprechen für Ihr Fliesenprojekt"
            einleitung="Vom Aufmaß bis zur fertigen Fuge: Wir stehen zu unseren Vereinbarungen, Preisen und Terminen – in Aßlar, Wetzlar und ganz Hessen."
            spaet
        >
            <Merkliste spalten={2} verband nummeriert eintraege={punkte} />

            <div className="mt-12 flex flex-col gap-6 border-t border-strich pt-8 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <p className="font-anzeige text-fs-4 font-semibold text-tinte">
                        Überzeugen Sie sich selbst von unserer Fachqualität
                    </p>
                    <p className="text-fs-2 text-tinte-2">
                        Kostenfreies Vor-Ort-Aufmaß durch {COMPANY_DATA.owner.fullName} – in Aßlar, Wetzlar, Gießen und Umgebung.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full sm:w-auto">
                        <span className="font-mono">{COMPANY_DATA.contact.phone}</span>
                    </Knopf>
                    <Knopf href="/kontakt" icon="pfeil-rechts" className="w-full sm:w-auto">
                        Aufmaß anfragen
                    </Knopf>
                </div>
            </div>
        </Abschnitt>
    );
}
