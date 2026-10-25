import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';

// Ansicht nach dem Öffnen von WhatsApp (E2-ORCH-08: Darstellung nach KERN; Texte und Verhalten unverändert).
export default function WhatsAppGeoeffnet({ handleBackToOverview }) {
    return (
        <div className="border border-strich bg-fliese p-6 sm:p-8 lg:p-12" role="status">
          <span className={etikettKlassen}>
            <Icon name="sprechblase" groesse={4} className="text-tinte" />
            WhatsApp geöffnet
          </span>
          <p className="mt-6 font-anzeige text-fs-6 font-semibold text-tinte">Fast geschafft. Jetzt die Nachricht absenden.</p>
          <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
            Ihre Anfrage ist in WhatsApp vorbereitet. Senden Sie die Nachricht einfach ab. Herr Tezgel antwortet Ihnen so schnell wie möglich.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon">
              Direkt anrufen: {COMPANY_DATA.contact.phone}
            </Knopf>
            <Knopf
              variante="neben"
              onClick={handleBackToOverview}
            >
              Zurück zur Übersicht
            </Knopf>
          </div>
        </div>
    );
}
