import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';

// Ansicht nach dem Öffnen von WhatsApp (E-011: aus BadanfrageFunnel.jsx verschoben, Markup unverändert).
// E3-BAU-18: Darstellung nach dem KERN-Formularmuster (wie TezgelAnfrageFunnel/WhatsAppGeoeffnet); Texte, IDs, role und Nutzlast unverändert.
export default function WhatsAppGeoeffnet({ handleBackFromWhatsApp, calculatedSqm, scopeTitle }) {
    return (
        <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12" role="status">
            <span className={etikettKlassen}>
                <Icon name="sprechblase" groesse={4} className="text-tinte" />
                WhatsApp geöffnet
            </span>
            <h3 className="mt-6 font-anzeige text-fs-5 font-semibold text-tinte">
                Fast geschafft – Nachricht jetzt absenden
            </h3>
            <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
                Ihre Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist in WhatsApp vorbereitet. Senden Sie die Nachricht einfach ab – {COMPANY_DATA.owner.fullName} meldet sich umgehend bei Ihnen.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon" className="w-full sm:w-auto">
                    Direkt anrufen: {COMPANY_DATA.contact.phone}
                </Knopf>
                <Knopf variante="neben" onClick={handleBackFromWhatsApp} className="w-full sm:w-auto">
                    Zurück
                </Knopf>
            </div>
        </div>
    );
}
