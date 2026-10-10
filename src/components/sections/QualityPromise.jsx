import React from 'react';
import { COMPANY_DATA } from '@/config/company';
import Abschnitt from '@/components/kern/Abschnitt';
import Merkliste from '@/components/kern/Merkliste';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';

// Qualitätsversprechen (KERN K-009, Merkliste): acht Punkte mit Fugenkreuz, „Garantierter Standard“ als Fuß
// je Punkt, der Abschluss als Feld an der Fuge. Überschrift, Texte und Links bleiben wortgleich.
export default function QualityPromise() {
    const punkte = COMPANY_DATA.qualityPromises.map((promise) => ({
        titel: promise.title,
        text: promise.description,
        fuss: (
            <span className="flex items-center gap-2 font-mono text-fs-1 text-tinte-2">
                <Fugenkreuz className="size-3 text-laser" />
                Garantierter Standard
            </span>
        ),
    }));

    return (
        <Abschnitt
            id="qualitaet"
            titelId="quality-promise-heading"
            etikett={<>HWK Fachbetrieb &middot; {COMPANY_DATA.authority.shortName}</>}
            titel="Unser 8-Punkte-Qualitätsversprechen für Ihr Fliesenprojekt"
            einleitung="Vom Aufmaß bis zur fertigen Fuge: Wir stehen zu unseren Vereinbarungen, Preisen und Terminen – in Aßlar, Wetzlar und ganz Hessen."
        >
            <Merkliste spalten={4} nummeriert eintraege={punkte} />

            <div className="mt-12 flex flex-col gap-6 border border-fuge bg-fliese p-6 md:flex-row md:items-center md:justify-between lg:p-8">
                <div className="space-y-2 text-center md:text-left">
                    <p className="font-anzeige text-fs-4 font-semibold text-tinte">
                        Überzeugen Sie sich selbst von unserer Fachqualität
                    </p>
                    <p className="text-fs-2 text-tinte-2">
                        Kostenfreies Vor-Ort-Aufmaß durch {COMPANY_DATA.owner.fullName} – in Aßlar, Wetzlar, Gießen und Umgebung.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                        <span className="font-mono">{COMPANY_DATA.contact.phone}</span>
                    </Knopf>
                    <Knopf href="/kontakt" icon="pfeil-rechts">
                        Aufmaß anfragen
                    </Knopf>
                </div>
            </div>
        </Abschnitt>
    );
}
