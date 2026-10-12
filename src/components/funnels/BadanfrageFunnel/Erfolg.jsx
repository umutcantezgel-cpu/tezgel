import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { feldClass } from './stile';

// Erfolgsansicht nach dem Absenden (Q-01: Darstellung nach KERN v2 wie die Express-Anfrage; Texte und Verhalten unverändert).
// Haken + Text als Erfolgszeichen, Vorgangsnummer, Telefon und Maße der Zusammenfassung in Mono, Zusammenfassung als Feld an der Fuge.
// Das Brief-Emoji vor dem Bestätigungssatz ist durch das Icon „mail“ ersetzt (keine Emojis, Rückgabe MIKROTEXTE).
export default function Erfolg({ handleNewRequest, referenceId, formData, calculatedSqm, objectTitle, scopeTitle, tierTitle, featureLabels, addressText }) {
    return (
        <div className="@container">
            <div className={feldClass} role="status">
                <div className="flex flex-wrap items-center gap-3">
                    <span className={etikettKlassen}>
                        <Icon name="haken" groesse={4} className="text-abnahme" />
                        Badanfrage erfolgreich übermittelt
                    </span>
                    {referenceId && (
                        <span className="border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">
                            Vorgangs-Nr.: {referenceId}
                        </span>
                    )}
                </div>
                <p className="mt-6 font-anzeige text-fs-5 font-semibold text-tinte">
                    Vielen Dank, {formData.name}!
                </p>
                <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
                    Ihre detaillierte Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
                    {formData.email && (
                        <span className="mt-3 flex items-start gap-2 border-l-2 border-tinte pl-4 text-fs-2 text-tinte">
                            <Icon name="mail" groesse={4} className="mt-1" />
                            <span>
                                Eine ausführliche Bestätigung mit allen Angaben wurde an <em className="wrap-break-word">{formData.email}</em> gesendet.
                            </span>
                        </span>
                    )}
                </p>

                <div className="mt-8 border border-fuge bg-kalk p-4 text-fs-2 text-tinte @xl:p-6">
                    <p className="flex items-start gap-2 font-semibold">
                        <Fugenkreuz className="mt-1 size-3 text-strich" />
                        Zusammenfassung Ihres Badkonzepts:
                    </p>
                    <div className="mt-3 divide-y divide-fuge border-t border-fuge">
                        <p className="py-2"><strong className="font-mono font-normal text-tinte-2">Kontakt:</strong> {formData.name} &middot; <span className="font-mono">{formData.phone}</span></p>
                        <p className="py-2"><strong className="font-mono font-normal text-tinte-2">Ort:</strong> {addressText}</p>
                        <p className="py-2"><strong className="font-mono font-normal text-tinte-2">Projekt:</strong> {objectTitle} &middot; Stufe: {tierTitle} &middot; <span className="font-mono">{calculatedSqm} m²</span></p>
                        {featureLabels.length > 0 && (
                            <p className="py-2"><strong className="font-mono font-normal text-tinte-2">Ausstattung:</strong> {featureLabels.join(', ')}</p>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-stretch gap-3 @2xl:flex-row @2xl:items-center">
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon">
                        Direkt anrufen: <span className="whitespace-nowrap font-mono">{COMPANY_DATA.contact.phone}</span>
                    </Knopf>
                    <Knopf variante="neben" onClick={handleNewRequest}>
                        Neue Badanfrage starten
                    </Knopf>
                </div>
            </div>
        </div>
    );
}
