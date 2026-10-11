import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';

// Erfolgsansicht nach dem Absenden (E-011: aus BadanfrageFunnel.jsx verschoben, Markup unverändert).
// E3-BAU-18: Darstellung nach dem KERN-Formularmuster (wie TezgelAnfrageFunnel/Erfolg); Texte, IDs, role und Nutzlast unverändert.
export default function Erfolg({ handleNewRequest, referenceId, formData, calculatedSqm, objectTitle, scopeTitle, tierTitle, featureLabels, addressText }) {
    return (
        <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12" role="status">
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
            <p className="mt-6 font-anzeige text-fs-6 font-semibold text-tinte">
                Vielen Dank, {formData.name}!
            </p>
            <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
                Ihre detaillierte Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
                {formData.email && (
                    <span className="mt-3 block border-l-2 border-tinte pl-4 text-fs-2 text-tinte">
                        Eine ausführliche Bestätigung mit allen Angaben wurde an <em>{formData.email}</em> gesendet.
                    </span>
                )}
            </p>

            <div className="mt-8 border-t border-fuge pt-6 text-fs-2 text-tinte-2">
                <p className="font-semibold text-tinte">Zusammenfassung Ihres Badkonzepts:</p>
                <p className="mt-2"><strong className="font-semibold text-tinte">Kontakt:</strong> {formData.name} &middot; {formData.phone}</p>
                <p className="mt-2"><strong className="font-semibold text-tinte">Ort:</strong> {addressText}</p>
                <p className="mt-2"><strong className="font-semibold text-tinte">Projekt:</strong> {objectTitle} &middot; Stufe: {tierTitle} &middot; {calculatedSqm} m²</p>
                {featureLabels.length > 0 && (
                    <p className="mt-2"><strong className="font-semibold text-tinte">Ausstattung:</strong> {featureLabels.join(', ')}</p>
                )}
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon" className="w-full sm:w-auto">
                    Direkt anrufen: {COMPANY_DATA.contact.phone}
                </Knopf>
                <Knopf variante="neben" onClick={handleNewRequest} className="w-full sm:w-auto">
                    Neue Badanfrage starten
                </Knopf>
            </div>
        </div>
    );
}
