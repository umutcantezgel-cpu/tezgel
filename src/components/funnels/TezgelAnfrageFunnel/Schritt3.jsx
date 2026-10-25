import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import { knopfKlassen, labelKlassen, linkKlassen, pflichtKlassen } from '@/components/kern/stile';
import PflichtHinweis from '@/components/kern/PflichtHinweis';
import { inputClass } from './stile';
import { anzeige } from '@/lib/formulare/anzeige';

// Schritt 3: Kontaktdaten und Absenden (E2-ORCH-08: Darstellung nach KERN; Texte, Namen und Verhalten unverändert).
export default function Schritt3({ setStep, name, setName, phone, setPhone, email, setEmail, notes, setNotes, honeypot, setHoneypot, status, errorMessage, projectTitle, finalArea, locationText, handleWhatsAppDirect, handleOnlineSubmit }) {
    return (
        <form onSubmit={handleOnlineSubmit} className="flex flex-col gap-8">
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
            <div className="flex items-start gap-3 border-l-2 border-laser bg-kalk p-4 text-fs-2 text-tinte" role="alert">
              <Icon name="fehler" groesse={5} className="mt-px text-laser-tief" />
              <div>
                <strong className="font-semibold text-laser-tief">Fehler beim Absenden:</strong> {errorMessage}
                <div className="mt-1">
                  Sie können die Anfrage auch direkt per{' '}
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className={`${linkKlassen} font-semibold`}
                  >
                    WhatsApp senden
                  </button>{' '}
                  oder anrufen.
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 border border-fuge bg-kalk p-4 text-fs-2 text-tinte">
            <span>
              <strong className="font-mono font-normal text-tinte-2">Projekt:</strong> {projectTitle} &middot; <strong className="font-mono font-normal text-tinte-2">Umfang:</strong> {anzeige(finalArea)} &middot;{' '}
              <strong className="font-mono font-normal text-tinte-2">Ort:</strong> {locationText}
            </span>
            <button
              type="button"
              onClick={() => setStep(2)}
              className={knopfKlassen('text')}
              data-motion="druck"
            >
              Ändern
            </button>
          </div>

          <PflichtHinweis />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
            <div>
              <label htmlFor="funnel-name" className={labelKlassen}>
                Ihr Name <span className={pflichtKlassen}>*</span>
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
              <label htmlFor="funnel-phone" className={labelKlassen}>
                Telefon- oder Mobilnummer <span className={pflichtKlassen}>*</span>
              </label>
              <input
                id="funnel-phone"
                type="tel"
                required
                autoComplete="tel"
                minLength={6}
                placeholder="Für Rückfragen zu Ihrem Vorhaben"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="funnel-email" className={labelKlassen}>
              E-Mail-Adresse <span className="font-normal text-tinte-2">(für eine Bestätigung per E-Mail)</span>
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
            <label htmlFor="funnel-notes" className={labelKlassen}>
              Angaben zum Projekt und Wünsche (optional)
            </label>
            <textarea
              id="funnel-notes"
              rows={3}
              placeholder="z. B. Altbelag vorhanden, bodengleiche Dusche gewünscht, Fliesengröße ca. 60 x 120 cm …"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-fuge pt-6">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Knopf type="submit" laedt={status === 'submitting'} ladeText="Wird gesendet …" icon="pfeil-rechts" className="w-full sm:flex-1">
                Anfrage verbindlich absenden
              </Knopf>
              <Knopf variante="neben" onClick={handleWhatsAppDirect} iconLinks="sprechblase" className="w-full sm:w-auto">
                Direkt per WhatsApp
              </Knopf>
            </div>

            <p className="flex items-start gap-2 text-fs-1 text-tinte-2">
              <Icon name="schloss" groesse={4} className="mt-px" />
              <span>
                Ihre Angaben werden vertraulich behandelt und verschlüsselt übertragen. Keine Weitergabe an Dritte. Details in unserer{' '}
                <Link href="/datenschutz" className={linkKlassen}>
                  Datenschutzerklärung
                </Link>
                .
              </span>
            </p>
          </div>

          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => setStep(2)}
              className={knopfKlassen('text')}
              data-motion="druck"
            >
              <Icon name="pfeil-links" groesse={5} />
              Zurück zu Schritt 2
            </button>
          </div>
        </form>
    );
}
