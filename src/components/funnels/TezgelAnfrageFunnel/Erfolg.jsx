import { Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

// Erfolgsansicht nach dem Absenden (E-011: aus TezgelAnfrageFunnel.tsx verschoben, Markup unverändert).
export default function Erfolg({ setStep, name, setName, setPhone, email, setEmail, setNotes, setStatus, referenceId, setReferenceId, projectTitle, finalArea, locationText }) {
    return (
        <div className="glass-surface rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xl" role="status">
          <div className="icon-chip w-20 h-20 rounded-xl mx-auto mb-6 bg-orange-100 text-orange-700">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="eyebrow">Anfrage erfolgreich übermittelt</span>
            {referenceId && (
              <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-mono text-xs font-bold text-slate-800">
                Vorgangs-Nr.: {referenceId}
              </span>
            )}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-neutral-900 mb-3">Vielen Dank, {name}!</p>
          <p className="text-base text-neutral-700 leading-relaxed mb-6">
            Ihre Anfrage für <strong>{projectTitle}</strong> ({finalArea}) in <strong>{locationText}</strong> ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
            {email && (
              <span className="block mt-2 text-sm text-orange-800 font-semibold bg-orange-50/80 border border-orange-200/80 rounded-xl p-2.5 max-w-md mx-auto">
                ✉️ Eine ausführliche Bestätigung mit allen Angaben wurde an <em>{email}</em> gesendet.
              </span>
            )}
          </p>

          <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 text-left text-sm text-neutral-700 mb-6 space-y-2">
            <div className="font-bold text-neutral-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              Nächste Schritte:
            </div>
            <p className="text-xs text-neutral-600">
              1. Unser Team prüft Ihre Angaben und den geschätzten Material- &amp; Zeitaufwand.<br />
              2. Herr Tezgel meldet sich binnen <strong>24 bis 48 Stunden</strong> telefonisch zur Terminabstimmung des kostenfreien Aufmaßes.
            </p>
          </div>

          <figure className="p-4 rounded-xl bg-orange-50/50 border border-orange-200 text-sm text-neutral-700 mb-6">
            <blockquote className="italic">&bdquo;{COMPANY_DATA.motto}&ldquo;</blockquote>
            <figcaption className="mt-1 font-bold text-orange-800">— {COMPANY_DATA.owner.fullName}, Fachbetrieb Aßlar</figcaption>
          </figure>

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
                setName('');
                setPhone('');
                setEmail('');
                setNotes('');
                setReferenceId('');
              }}
              className="btn-ghost w-full sm:w-auto"
            >
              Weitere Anfrage starten
            </button>
          </div>
        </div>
    );
}
