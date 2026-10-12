import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import ResultSummary from './ResultSummary';

// Ansicht nach dem Öffnen von WhatsApp (E-011: aus FliesenKonfigurator.jsx verschoben, Markup unverändert).
export default function WhatsAppGeoeffnet({ data, setSentVia }) {
    return (
        <div className="glass-surface rounded-[2.5rem] p-6 sm:p-10 max-w-3xl mx-auto" role="status">
            <div className="text-center">
                <div className="icon-chip w-16 h-16 rounded-full mx-auto mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="eyebrow mb-4">
                    WhatsApp wurde geöffnet
                </span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                    WhatsApp wurde geöffnet – bitte absenden
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                    Ihre Anfrage ist vorbereitet, aber noch nicht verschickt. Senden Sie die Nachricht in{' '}
                    WhatsApp ab. Fotos von Raum, Untergrund oder Treppe
                    können Sie gern per WhatsApp nachsenden. Auf dieser Website wird nichts gespeichert.
                </p>
            </div>

            <ResultSummary data={data} />

            <p className="mt-6 text-sm text-slate-800 font-bold text-center">
                Das verbindliche Festpreisangebot folgt nach dem kostenfreien Vor-Ort-Aufmaß durch {COMPANY_DATA.owner.fullName}.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto text-xs">
                    <Phone className="w-4 h-4" />
                    Direkt anrufen: {COMPANY_DATA.contact.phone}
                </a>
                <button type="button" onClick={() => setSentVia(null)} className="btn-ghost w-full sm:w-auto text-xs">
                    <ArrowLeft className="w-4 h-4" />
                    Zurück zur Anfrage
                </button>
            </div>
        </div>
    );
}
