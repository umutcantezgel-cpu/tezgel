'use client';

// Hero-Formular „Direktanfrage an Deniz Tezgel“ (P3-13a, F-01) in Kern-Erscheinung (KERN v1.2, K-003 Prinzip 6, K-011).
// Logik unverändert aus `useHeroKontakt` (G9): Pflichtprüfung, Fehlertexte, Nutzlast, `_t`, Honeypot und WhatsApp-Ziel
// kommen aus dem Hook. Markup-Semantik, IDs, `name`, `type`, `autocomplete` und Wortlaut aus
// `src/components/forms/HeroContactForm.tsx`; geändert nur die freigegebenen Mikrotexte (MIKROTEXTE.md: Ladetext,
// „Per WhatsApp schreiben“, „Notiert. …“).
// Aufbau als Feldraster mit 1-px-Fugen (Fuge statt Karte), Beschriftung über dem Feld, mobil eine Spalte; Projektart als
// Auswahlknöpfe im Raster. Kein Glas, kein Schatten. Default-Export ohne Props (P3-09: Prop `formular` des Einstiegs).
// `HeroKontaktAnsicht` zeigt einen Hook-Zustand an; die Vorschau setzt damit Zustände, ohne zu senden.
import { useId } from 'react';
import {
  Etikett,
  Feld,
  Feldgruppe,
  Feldraster,
  Hinweis,
  Knopf,
  Rasterfeld,
  SendeKnopf,
  Auswahlknopf,
} from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Erfolgszeichen from '@/components/kern/formulare/a/Erfolgszeichen';
import { useFokusWechsel } from '@/components/kern/formulare/a/useFokusWechsel';
import { PROJECT_OPTIONS, useHeroKontakt } from '@/lib/formulare/useHeroKontakt';

export type HeroKontaktZustand = ReturnType<typeof useHeroKontakt>;

export function HeroKontaktAnsicht({ k }: { k: HeroKontaktZustand }) {
  const {
    projectType,
    setProjectType,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    location,
    setLocation,
    notes,
    setNotes,
    honeypot,
    setHoneypot,
    referenceId,
    status,
    errorMessage,
    projectTitle,
    getWhatsAppUrl,
    handleSubmit,
    handleNewRequest,
    handleWhatsAppClick,
  } = k;
  const { erfolgRef, formularRef } = useFokusWechsel(status === 'success');
  const kennung = useId();
  const dankId = `hero-erfolg-dank${kennung}`;
  const textId = `hero-erfolg-text${kennung}`;

  // ERFOLG
  if (status === 'success') {
    return (
      <div
        ref={erfolgRef}
        tabIndex={-1}
        role="group"
        aria-labelledby={`${dankId} ${textId}`}
        className="border border-k-fuge bg-k-fliese text-left outline-none"
      >
        <div className="flex flex-col gap-k-4 p-k-5 lg:p-k-6">
          <div className="flex flex-wrap items-center gap-x-k-4 gap-y-k-2">
            <Etikett rahmen ton="tinte">
              Anfrage übermittelt
            </Etikett>
            {referenceId && <span className="k-mono text-k-2 text-k-tinte">{referenceId}</span>}
          </div>

          <p id={dankId} className="k-anzeige text-k-5 text-k-tinte">
            Vielen Dank, {name}!
          </p>

          <div className="flex items-start gap-k-3">
            <Erfolgszeichen />
            <p id={textId} className="k-text text-k-3 text-k-tinte">
              Notiert. Ihre Anfrage für <strong className="font-semibold">{projectTitle}</strong> ist direkt bei Herrn Deniz Tezgel eingegangen.
            </p>
          </div>

          {email && (
            <p className="flex items-start gap-k-3 k-text text-k-2 text-k-tinte-2">
              <span className="flex h-lh w-k-5 shrink-0 items-center justify-center text-k-tinte">
                <Icon name="mail" groesse={20} />
              </span>
              <span className="min-w-0">
                Eine schriftliche Zusammenfassung wurde an <strong className="font-semibold text-k-tinte">{email}</strong> gesendet.
              </span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-k-2 border-t border-k-fuge p-k-5 lg:px-k-6">
          <p className="flex items-center gap-k-2 k-text text-k-2 font-semibold text-k-tinte">
            <Icon name="uhr" groesse={16} />
            <span>Nächste Schritte:</span>
          </p>
          <p className="k-text text-k-2 text-k-tinte-2">
            Herr Tezgel prüft Ihre Angaben persönlich und ruft Sie innerhalb von <strong className="font-semibold text-k-tinte">24 Stunden</strong> unter{' '}
            <span className="k-mono">{phone}</span> an, um den Termin für das kostenfreie Aufmaß vor Ort abzustimmen.
          </p>
        </div>

        <div className="border-t border-k-fuge px-k-5 py-k-2 lg:px-k-6">
          <Knopf art="text" onClick={handleNewRequest}>
            Weitere Anfrage stellen
          </Knopf>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <Feldraster>
        {/* Formularkopf: Etiketten (K-012 Kl. 3, Wortlaut bleibt), Titel und Vorspann */}
        <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} flaeche="fliese">
          <div ref={formularRef} tabIndex={-1} className="flex flex-col gap-k-2 outline-none">
            <div className="flex flex-wrap items-center justify-between gap-x-k-4 gap-y-k-2">
              <Etikett rahmen ton="tinte">
                Direktanfrage an Deniz Tezgel
              </Etikett>
              <Etikett>
                <span className="inline-flex items-center gap-k-2">
                  <Icon name="uhr" groesse={16} />
                  <span>Rückruf &lt; 24h</span>
                </span>
              </Etikett>
            </div>
            <p className="mt-k-2 k-anzeige text-k-5 text-k-tinte">Kostenloses Aufmaß vor Ort anfragen</p>
            <p className="k-text text-k-2 text-k-tinte-2">
              Beschreiben Sie Ihr Projekt in 30 Sekunden – Herr Tezgel meldet sich direkt persönlich bei Ihnen.
            </p>
          </div>
        </Rasterfeld>

        {/* Fehlermeldung des Hooks: Versatz-Zeichen + Text + role="alert" */}
        {errorMessage && (
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} flaeche="fliese" innen="eng">
            <Hinweis art="fehler">{errorMessage}</Hinweis>
          </Rasterfeld>
        )}

        {/* Kontaktdaten */}
        <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 6 }} flaeche="fliese" innen="eng">
          <Feld
            id="hero-name"
            name="name"
            beschriftung="Name"
            zusatz="*"
            required
            autoComplete="name"
            placeholder="Vor- und Nachname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Rasterfeld>
        <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 6 }} flaeche="fliese" innen="eng">
          <Feld
            id="hero-phone"
            name="phone"
            art="tel"
            beschriftung="Telefonnummer"
            zusatz="*"
            required
            autoComplete="tel"
            placeholder="Für den Rückruf"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Rasterfeld>

        {/* Ort & E-Mail */}
        <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 6 }} flaeche="fliese" innen="eng">
          <Feld
            id="hero-email"
            name="email"
            art="email"
            beschriftung="E-Mail"
            zusatz="(für Bestätigung)"
            autoComplete="email"
            placeholder="ihre.adresse@beispiel.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Rasterfeld>
        <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 6 }} flaeche="fliese" innen="eng">
          <Feld
            id="hero-location"
            name="location"
            beschriftung="Ort / PLZ"
            autoComplete="address-level2"
            placeholder="z. B. Aßlar, Wetzlar, Gießen"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Rasterfeld>

        {/* Vorhaben-Auswahl nach den Kontaktfeldern: Name und Telefon stehen am Desktop im ersten Bildschirm (Probelauf P3-16b,
            Aufgabe 3 mit Maus: vorher ein Bildlauf mehr als im Bestand). Voreinstellung und Logik unverändert (Hook). */}
        <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} flaeche="fliese" innen="eng">
          <Feldgruppe legende="Ihr Vorhaben wählen" anordnung="kacheln" spalten={2}>
            {PROJECT_OPTIONS.map((opt) => (
              <Auswahlknopf
                key={opt.id}
                art="kachel"
                name="projectType"
                value={opt.id}
                checked={projectType === opt.id}
                onChange={() => setProjectType(opt.id)}
              >
                {opt.label}
              </Auswahlknopf>
            ))}
          </Feldgruppe>
        </Rasterfeld>

        {/* Kurzbeschreibung */}
        <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} flaeche="fliese" innen="eng">
          <Feld
            id="hero-notes"
            name="notes"
            beschriftung="Projektnotiz (optional)"
            autoComplete="off"
            placeholder="z. B. ca. 15 m² Fliesen, Altbau, Walk-In Dusche"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* Anti-Spam-Honeypot: verborgen (hidden), nicht fokussierbar, aus dem Barrierebaum */}
          <div hidden aria-hidden="true">
            <label htmlFor="website_url_hp">Bitte dieses Feld freilassen</label>
            <input
              id="website_url_hp"
              type="text"
              name="website_url_hp"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>
        </Rasterfeld>

        {/* Absenden und WhatsApp-Weg */}
        <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 12 }} flaeche="fliese" innen="eng" className="flex flex-col gap-k-2">
          <SendeKnopf sendet={status === 'submitting'} breit hinten={<Icon name="pfeil" groesse={20} />}>
            Kostenfreies Aufmaß anfragen
          </SendeKnopf>
          <div className="flex flex-wrap items-center justify-between gap-x-k-4">
            <Etikett kreuz>100 % unverbindlich</Etikett>
            <Knopf
              art="text"
              groesse="klein"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              vorne={<Icon name="whatsapp" groesse={16} />}
            >
              Per WhatsApp schreiben
            </Knopf>
          </div>
        </Rasterfeld>
      </Feldraster>
    </form>
  );
}

export default function HeroKontakt() {
  const k = useHeroKontakt();
  return <HeroKontaktAnsicht k={k} />;
}
