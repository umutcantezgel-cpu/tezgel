import { CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { labelOf, ROOM_OPTIONS } from '@/lib/formulare/useFliesenKonfigurator';
import ResultSummary from './ResultSummary';

// Erfolgsansicht nach dem Absenden (E-011: aus FliesenKonfigurator.jsx verschoben, Markup unverändert).
export default function Erfolg({ data, referenceId, handleNewRequest }) {
    const roomsText = data.rooms.map((id) => labelOf(ROOM_OPTIONS, id)).join(', ') || 'Fliesenprojekt';
    return (
        <div className="glass-surface rounded-[2.5rem] p-6 sm:p-10 max-w-3xl mx-auto shadow-xl" role="status">
            <div className="text-center">
                <div className="icon-chip w-16 h-16 rounded-full mx-auto mb-5 bg-orange-100 text-orange-600">
                    <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                    <span className="eyebrow">Konfiguration erfolgreich übermittelt</span>
                    {referenceId && (
                        <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-mono text-xs font-bold text-slate-800">
                            Vorgangs-Nr.: {referenceId}
                        </span>
                    )}
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                    Vielen Dank, {data.name}!
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-2xl mx-auto">
                    Ihre Konfiguration für <strong>{roomsText}</strong> ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
                    {data.email && (
                        <span className="block mt-2 font-semibold text-orange-800 bg-orange-50/80 border border-orange-200/80 rounded-xl p-2.5 max-w-md mx-auto text-xs sm:text-sm">
                            ✉️ Eine ausführliche Bestätigung mit allen Angaben und Materialschätzungen wurde an <em>{data.email}</em> gesendet.
                        </span>
                    )}
                </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs sm:text-sm text-neutral-700 mb-6 space-y-2">
                <div className="font-bold text-neutral-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    Nächste Schritte:
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                    1. Inhaber Deniz Tezgel prüft Ihre Raum- und Materialangaben sowie Machbarkeit und Vorarbeiten.<br />
                    2. Wir melden uns binnen <strong>24 bis 48 Stunden</strong> telefonisch zur Vorab-Klärung und Terminabsprache.<br />
                    3. Kostenfreies Aufmaß vor Ort für Ihr verbindliches Festpreisangebot.
                </p>
            </div>

            <ResultSummary data={data} />

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto text-xs">
                    <Phone className="w-4 h-4" />
                    Direkt anrufen: {COMPANY_DATA.contact.phone}
                </a>
                <button
                    type="button"
                    onClick={handleNewRequest}
                    className="btn-ghost w-full sm:w-auto text-xs"
                >
                    Neue Konfiguration starten
                </button>
            </div>
        </div>
    );
}
