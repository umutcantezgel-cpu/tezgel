import React from 'react';
import { COMPANY_DATA } from '@/config/company';
import Abschnitt from '@/components/kern/Abschnitt';
import Merkliste from '@/components/kern/Merkliste';
import Knopf from '@/components/kern/Knopf';
import { PUNKTE } from '@/components/vorlagen/teile/Versprechen';
import { klartext } from '@/lib/textmarken';

// Qualitätsversprechen (KERN K-009, Merkliste im Halbverband): acht Punkte als Zeilen an der Fuge mit Mono-Nummer,
// „Garantierter Standard“ einmal im Etikett des Abschnitts, der Abschluss als Zeile ohne Kasten.
// Überschrift, Texte und Links bleiben wortgleich. `art="arbeit"` auf Arbeitsansichten: Abstände und H2-Stufe der
// Arbeitsansicht (H2 eine Stufe unter der H1, E3-SICHT-2-ARB Befund 15).
export default function QualityPromise({ art = 'erzaehl' }) {
    // SEO-Runde, Befund Zusagen (docs/seo/arbeit/zusagen-befund.md): dieselbe Fassung wie die Vorlagen (PUNKTE in
    // vorlagen/teile/Versprechen.tsx: ohne „Garantierter“, „Verbindliche“ und „Feste Zusagen“, solange M-07 offen ist; der Bau
    // bricht dort ab, wenn ein Garantie-Wort auftaucht). Die Firmendaten in company.js bleiben unverändert.
    const punkte = PUNKTE.map((punkt) => ({
        titel: punkt.titel,
        text: klartext(punkt.text),
    }));

    return (
        <Abschnitt
            id="qualitaet"
            art={art}
            titelId="quality-promise-heading"
            etikett={<>HWK Fachbetrieb &middot; {COMPANY_DATA.authority.shortName} &middot; Unser Standard</>}
            titel="Unser 8-Punkte-Qualitätsversprechen für Ihr Fliesenprojekt"
            einleitung="Vom Aufmaß bis zur fertigen Fuge: So arbeiten wir in Aßlar, Wetzlar und Mittelhessen."
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
