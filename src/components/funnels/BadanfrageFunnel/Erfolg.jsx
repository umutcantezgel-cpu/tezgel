import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { feldClass } from './stile';

// Erfolgsansicht nach dem Absenden (Q-01: Darstellung nach KERN v2 wie die Express-Anfrage; Texte und Verhalten unverändert).
// Haken + Text als Erfolgszeichen, Vorgangsnummer, Telefon und Maße der Zusammenfassung in Mono, Zusammenfassung als Feld an der Fuge.
// Das Brief-Emoji vor dem Bestätigungssatz ist durch das Icon „mail“ ersetzt (keine Emojis, Rückgabe MIKROTEXTE).
// Fusion F-04: Dank-Zeile in der Größe von A (Anzeigeschrift fs-6) und Fokusziel nach dem Absenden (tabIndex -1, siehe
// index); im schmalen Behälter steht das Etikett jeder Zeile über dem Wert, ab 36rem daneben (B). Der Behälter der
// Container-Abfragen ist die Wurzel in index.
const etikett = 'block font-mono font-normal text-tinte-2 @xl:inline';

export default function Erfolg({ handleNewRequest, referenceId, formData, calculatedSqm, objectTitle, scopeTitle, tierTitle, featureLabels, addressText }) {
    return (
        <div className={feldClass} role="status">
            <div className="flex flex-wrap items-center gap-3">
                <span className={etikettKlassen}>
                    <Icon name="haken" groesse={4} className="text-abnahme" />
                    Badanfrage erfolgreich übermittelt
                </span>
                {referenceId && (
                    <span className="border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">
                        Vorgangsnummer: {referenceId}
                    </span>
                )}
            </div>
            <p className="mt-6 font-anzeige text-fs-6 font-semibold text-tinte wrap-break-word" tabIndex={-1} data-fokusziel>
                Vielen Dank, {formData.name}!
            </p>
            <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
                Ihre Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist bei Fliesenverlegung Tezgel eingegangen.
                {formData.email && (
                    <span className="mt-3 flex items-start gap-2 border-l-2 border-tinte pl-4 text-fs-2 text-tinte">
                        <Icon name="mail" groesse={4} className="mt-1" />
                        <span>
                            Eine Bestätigung mit allen Angaben wurde an <em className="wrap-break-word">{formData.email}</em> gesendet.
                        </span>
                    </span>
                )}
            </p>

            <div className="mt-8 border border-fuge bg-kalk p-4 text-fs-2 text-tinte @xl:p-6">
                <p className="flex items-start gap-2 font-semibold">
                    <Fugenkreuz className="mt-1 size-3 text-strich" />
                    Ihre Angaben im Überblick:
                </p>
                <div className="mt-3 divide-y divide-fuge border-t border-fuge">
                    <p className="py-2"><strong className={etikett}>Kontakt:</strong> {formData.name} &middot; <span className="font-mono">{formData.phone}</span></p>
                    <p className="py-2"><strong className={etikett}>Ort:</strong> {addressText}</p>
                    <p className="py-2"><strong className={etikett}>Projekt:</strong> {objectTitle} &middot; Stufe: {tierTitle} &middot; <span className="font-mono">{calculatedSqm} m²</span></p>
                    {featureLabels.length > 0 && (
                        <p className="py-2"><strong className={etikett}>Ausstattung:</strong> {featureLabels.join(', ')}</p>
                    )}
                </div>
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-3 @2xl:flex-row @2xl:items-center">
                <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon">
                    Anrufen: <span className="whitespace-nowrap font-mono">{COMPANY_DATA.contact.phone}</span>
                </Knopf>
                <Knopf variante="neben" onClick={handleNewRequest}>
                    Neue Badanfrage starten
                </Knopf>
            </div>
        </div>
    );
}
