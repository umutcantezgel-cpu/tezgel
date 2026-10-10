import { MessageCircle, Phone } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

// Ansicht nach dem Öffnen von WhatsApp (E-011: aus TezgelAnfrageFunnel.tsx verschoben, Markup unverändert).
export default function WhatsAppGeoeffnet({ setStep, setStatus }) {
    return (
        <div className="glass-surface rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xl" role="status">
          <div className="icon-chip w-20 h-20 rounded-xl mx-auto mb-6 bg-green-100 text-green-700">
            <MessageCircle className="w-10 h-10" />
          </div>
          <span className="eyebrow mb-4">WhatsApp geöffnet</span>
          <p className="text-2xl sm:text-3xl font-black text-neutral-900 mb-3">Fast geschafft – Nachricht absenden</p>
          <p className="text-base text-neutral-700 leading-relaxed mb-6">
            Ihre Anfrage ist in WhatsApp vorbereitet. Senden Sie die Nachricht einfach ab – Herr Tezgel antwortet Ihnen schnellstmöglich.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto">
              <Phone className="w-4 h-4" />
              Direkt anrufen: {COMPANY_DATA.contact.phone}
            </a>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setStep(1);
              }}
              className="btn-ghost w-full sm:w-auto"
            >
              Zurück zur Übersicht
            </button>
          </div>
        </div>
    );
}
