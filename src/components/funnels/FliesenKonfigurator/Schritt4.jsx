import Link from 'next/link';
import { ArrowLeft, Lock, MessageCircle, Send, Loader2, AlertCircle } from 'lucide-react';
import { TIMING_OPTIONS } from './logik';
import { inputClass, labelClass, linkClass } from './stile';
import OptionGroup from './OptionGroup';
import ResultSummary from './ResultSummary';

// Schritt 4: Zusammenfassung und Kontakt (E-011: aus FliesenKonfigurator.jsx verschoben, Markup unverändert).
export default function Schritt4({ data, update, goToStep, handleSubmit, isSubmitting, errorMessage }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <ResultSummary data={data} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                    <label htmlFor="fk-name" className={labelClass}>
                        Name <span className="text-orange-600">*</span>
                    </label>
                    <input
                        id="fk-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Vor- und Nachname"
                        value={data.name}
                        onChange={(e) => update({ name: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="fk-phone" className={labelClass}>
                        Telefon- oder Mobilnummer <span className="text-orange-600">*</span>
                    </label>
                    <input
                        id="fk-phone"
                        type="tel"
                        required
                        minLength={6}
                        autoComplete="tel"
                        placeholder="Für die Rücksprache zum Aufmaß"
                        value={data.phone}
                        onChange={(e) => update({ phone: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="fk-email" className={labelClass}>E-Mail-Adresse (optional)</label>
                    <input
                        id="fk-email"
                        type="email"
                        autoComplete="email"
                        placeholder="ihre-adresse@beispiel.de"
                        value={data.email}
                        onChange={(e) => update({ email: e.target.value })}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="fk-zip" className={labelClass}>PLZ &amp; Ort des Projekts</label>
                    <input
                        id="fk-zip"
                        type="text"
                        autoComplete="postal-code"
                        placeholder="PLZ und Ort"
                        value={data.zipCity}
                        onChange={(e) => update({ zipCity: e.target.value })}
                        className={inputClass}
                    />
                </div>
            </div>

            <OptionGroup
                legend="Gewünschter Zeitraum:"
                options={TIMING_OPTIONS.map((t) => ({ id: t, label: t }))}
                value={data.timing}
                columns="grid-cols-1 sm:grid-cols-3"
                onChange={(id) => update({ timing: id })}
            />

            <div>
                <label htmlFor="fk-notes" className={labelClass}>Notiz (optional)</label>
                <textarea
                    id="fk-notes"
                    rows={3}
                    placeholder="z. B. Raummaße, Wunschfliese, Besonderheiten am Untergrund …"
                    value={data.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                />
                <p className="mt-1 text-xs text-slate-600">Fotos senden Sie gern im Anschluss per WhatsApp nach.</p>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                    type="checkbox"
                    required
                    checked={data.privacyConsent}
                    onChange={(e) => update({ privacyConsent: e.target.checked })}
                    className="mt-0.5 rounded accent-orange-600"
                />
                <span>
                    Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Details in der{' '}
                    <Link href="/datenschutz" className={linkClass}>Datenschutzerklärung</Link>.{' '}
                    <span className="text-orange-600">*</span>
                </span>
            </label>

            {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                        type="submit"
                        name="channel"
                        value="online"
                        disabled={isSubmitting}
                        className="btn-primary w-full sm:flex-1 text-sm flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Wird übertragen …
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Online absenden (mit E-Mail-Bestätigung)
                            </>
                        )}
                    </button>
                    <button
                        type="submit"
                        name="channel"
                        value="whatsapp"
                        disabled={isSubmitting}
                        className="glass-button-whatsapp w-full sm:w-auto text-sm flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Per WhatsApp senden
                    </button>
                </div>
                <p className="flex items-start justify-center gap-1.5 text-xs text-slate-700 text-center leading-relaxed">
                    <Lock className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span>
                        Bei Online-Absendung erhalten Sie unmittelbar eine schriftliche Zusammenfassung per E-Mail. Bei Auswahl von WhatsApp öffnet sich WhatsApp mit Ihren vorbereiteten Angaben.
                    </span>
                </p>
            </div>

            <div className="flex justify-start">
                <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-slate-700 hover:text-orange-600 font-bold text-xs transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Zurück zu Schritt 3
                </button>
            </div>
        </form>
    );
}
