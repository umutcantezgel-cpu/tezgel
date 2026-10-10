import Link from 'next/link';
import { ArrowLeft, Send, MessageCircle, Lock, Loader2, AlertCircle } from 'lucide-react';
import { inputClass } from './stile';

// Schritt 3: Kontaktdaten und Absenden (E-011: aus TezgelAnfrageFunnel.tsx verschoben, Markup unverändert).
export default function Schritt3({ setStep, name, setName, phone, setPhone, email, setEmail, notes, setNotes, honeypot, setHoneypot, status, errorMessage, projectTitle, finalArea, locationText, handleWhatsAppDirect, handleOnlineSubmit }) {
    return (
        <form onSubmit={handleOnlineSubmit} className="space-y-6 relative z-10">
          {/* Honeypot for spam bots */}
          <input
            type="text"
            name="website_url_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <div>
                <strong>Fehler beim Absenden:</strong> {errorMessage}
                <div className="mt-1">
                  Sie können die Anfrage alternativ direkt per{' '}
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="underline font-bold text-green-700 hover:text-green-800"
                  >
                    WhatsApp senden
                  </button>{' '}
                  oder anrufen.
                </div>
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200 text-xs sm:text-sm text-neutral-900 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Projekt:</strong> {projectTitle} &middot; <strong>Umfang:</strong> {finalArea} &middot;{' '}
              <strong>Ort:</strong> {locationText}
            </span>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-bold text-orange-800 underline underline-offset-2 hover:text-orange-900"
            >
              Ändern
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="funnel-name" className="block text-sm font-bold text-neutral-800 mb-1.5">
                Ihr Name <span className="text-orange-800">*</span>
              </label>
              <input
                id="funnel-name"
                type="text"
                required
                autoComplete="name"
                placeholder="Vor- und Nachname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="funnel-phone" className="block text-sm font-bold text-neutral-800 mb-1.5">
                Telefon- oder Mobilnummer <span className="text-orange-800">*</span>
              </label>
              <input
                id="funnel-phone"
                type="tel"
                required
                autoComplete="tel"
                minLength={6}
                placeholder="Für die Rücksprache zum Aufmaß"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="funnel-email" className="block text-sm font-bold text-neutral-800 mb-1.5">
              E-Mail-Adresse <span className="text-neutral-700 font-medium">(für die Eingangsbestätigung)</span>
            </label>
            <input
              id="funnel-email"
              type="email"
              autoComplete="email"
              placeholder="ihre-adresse@beispiel.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="funnel-notes" className="block text-sm font-bold text-neutral-800 mb-1.5">
              Projekt-Details / Wünsche (optional)
            </label>
            <textarea
              id="funnel-notes"
              rows={3}
              placeholder="z. B. Altbelag vorhanden, bodengleiche Dusche gewünscht, Fliesenformat ca. 60 x 120 cm …"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full sm:flex-1 text-sm py-3.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Anfrage wird sicher übertragen...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Anfrage verbindlich absenden
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="glass-button-whatsapp w-full sm:w-auto text-sm py-3.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Direkt per WhatsApp
              </button>
            </div>

            <p className="flex items-start justify-center gap-1.5 text-xs text-neutral-600 text-center leading-relaxed">
              <Lock className="w-3.5 h-3.5 text-orange-700 shrink-0 mt-0.5" />
              <span>
                Ihre Angaben werden vertraulich behandelt und verschlüsselt übertragen. Keine Weitergabe an Dritte. Details in unserer{' '}
                <Link href="/datenschutz" className="font-bold text-orange-800 underline underline-offset-2">
                  Datenschutzerklärung
                </Link>
                .
              </span>
            </p>
          </div>

          <div className="pt-1 flex justify-start">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-700 hover:text-orange-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zu Schritt 2
            </button>
          </div>
        </form>
    );
}
