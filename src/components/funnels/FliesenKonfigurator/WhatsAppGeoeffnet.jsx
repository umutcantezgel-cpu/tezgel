import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, knopfKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import ResultSummary from './ResultSummary';

// Ansicht nach dem Öffnen von WhatsApp (E-011: aus FliesenKonfigurator.jsx verschoben, Markup unverändert).
// E3-BAU-15: Darstellung nach dem KERN-Formularmuster (wie BadanfrageFunnel/WhatsAppGeoeffnet); Texte, IDs, role und
// Verhalten unverändert.
export default function WhatsAppGeoeffnet({ data, setSentVia }) {
    return (
        <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12" role="status">
            <span className={etikettKlassen}>
                <Icon name="sprechblase" groesse={4} className="text-tinte" />
                WhatsApp wurde geöffnet
            </span>
            <p className="mt-6 font-anzeige text-fs-5 font-semibold text-tinte">
                WhatsApp wurde geöffnet – bitte absenden
            </p>
            <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
                Ihre Anfrage ist vorbereitet, aber noch nicht verschickt. Senden Sie die Nachricht in{' '}
                WhatsApp ab. Fotos von Raum, Untergrund oder Treppe
                können Sie gern per WhatsApp nachsenden. Auf dieser Website wird nichts gespeichert.
            </p>

            <div className="mt-8">
                <ResultSummary data={data} />
            </div>

            <p className="mt-8 text-fs-2 font-semibold text-tinte">
                Das verbindliche Festpreisangebot folgt nach dem kostenfreien Vor-Ort-Aufmaß durch {COMPANY_DATA.owner.fullName}.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon" className="w-full sm:w-auto">
                    Direkt anrufen: {COMPANY_DATA.contact.phone}
                </Knopf>
                <button
                    type="button"
                    onClick={() => setSentVia(null)}
                    className={knopfKlassen('neben', 'w-full sm:w-auto')}
                    data-motion="druck"
                >
                    <Icon name="pfeil-links" groesse={5} />
                    Zurück zur Anfrage
                </button>
            </div>
        </div>
    );
}
