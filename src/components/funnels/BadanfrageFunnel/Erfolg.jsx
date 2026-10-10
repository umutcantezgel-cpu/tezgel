import { Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

// Erfolgsansicht nach dem Absenden (E-011: aus BadanfrageFunnel.jsx verschoben, Markup unverändert).
export default function Erfolg({ setStep, setStatus, referenceId, setReferenceId, formData, calculatedSqm, objectTitle, scopeTitle, tierTitle, featureLabels, addressText }) {
    return (
        <div className="glass-bezel-outer max-w-2xl mx-auto shadow-xl">
            <div className="glass-bezel-inner p-8 md:p-12 text-center" role="status">
                <div className="icon-chip w-20 h-20 rounded-xl mx-auto mb-6 bg-orange-100 text-orange-700">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                    <span className="eyebrow">Badanfrage erfolgreich übermittelt</span>
                    {referenceId && (
                        <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-mono text-xs font-bold text-slate-800">
                            Vorgangs-Nr.: {referenceId}
                        </span>
                    )}
                </div>
                <p className="text-2xl md:text-3xl font-black text-neutral-900 mb-3">
                    Vielen Dank, {formData.name}!
                </p>
                <p className="text-sm sm:text-base text-neutral-700 mb-6 leading-relaxed">
                    Ihre detaillierte Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
                    {formData.email && (
                        <span className="block mt-2 font-semibold text-orange-800 bg-orange-50/80 border border-orange-200/80 rounded-xl p-2.5 max-w-md mx-auto text-xs sm:text-sm">
                            ✉️ Eine ausführliche Bestätigung mit allen Angaben wurde an <em>{formData.email}</em> gesendet.
                        </span>
                    )}
                </p>

                <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200 text-left text-sm space-y-2 mb-6">
                    <p className="font-black text-neutral-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        Zusammenfassung Ihres Badkonzepts:
                    </p>
                    <p className="text-slate-700 text-xs sm:text-sm"><strong>Kontakt:</strong> {formData.name} &middot; {formData.phone}</p>
                    <p className="text-slate-700 text-xs sm:text-sm"><strong>Ort:</strong> {addressText}</p>
                    <p className="text-slate-700 text-xs sm:text-sm"><strong>Projekt:</strong> {objectTitle} &middot; Stufe: {tierTitle} &middot; {calculatedSqm} m²</p>
                    {featureLabels.length > 0 && (
                        <p className="text-slate-700 text-xs"><strong>Ausstattung:</strong> {featureLabels.join(', ')}</p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto text-xs">
                        <Phone className="w-4 h-4" />
                        Direkt anrufen: {COMPANY_DATA.contact.phone}
                    </a>
                    <button
                        type="button"
                        onClick={() => { setStatus('idle'); setStep(1); setReferenceId(''); }}
                        className="btn-ghost w-full sm:w-auto text-xs"
                    >
                        Neue Badanfrage starten
                    </button>
                </div>
            </div>
        </div>
    );
}
