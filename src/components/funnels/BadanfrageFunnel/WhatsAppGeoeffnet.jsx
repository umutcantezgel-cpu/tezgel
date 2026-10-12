import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

// Ansicht nach dem Öffnen von WhatsApp (E-011: aus BadanfrageFunnel.jsx verschoben, Markup unverändert).
export default function WhatsAppGeoeffnet({ handleBackFromWhatsApp, calculatedSqm, scopeTitle }) {
    return (
        <div className="glass-bezel-outer max-w-2xl mx-auto shadow-xl">
            <div className="glass-bezel-inner p-8 md:p-12 text-center" role="status">
                <div className="icon-chip w-20 h-20 rounded-tile-xl mx-auto mb-6 bg-green-100 text-green-700">
                    <MessageCircle className="w-10 h-10" />
                </div>
                <span className="eyebrow mb-4">WhatsApp geöffnet</span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                    Fast geschafft – Nachricht jetzt absenden
                </h3>
                <p className="text-sm sm:text-base text-slate-700 mb-6 leading-relaxed">
                    Ihre Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist in WhatsApp vorbereitet. Senden Sie die Nachricht einfach ab – {COMPANY_DATA.owner.fullName} meldet sich umgehend bei Ihnen.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto text-xs">
                        <Phone className="w-4 h-4" />
                        Direkt anrufen: {COMPANY_DATA.contact.phone}
                    </a>
                    <button
                        type="button"
                        onClick={handleBackFromWhatsApp}
                        className="btn-ghost w-full sm:w-auto text-xs"
                    >
                        Zurück
                    </button>
                </div>
            </div>
        </div>
    );
}
