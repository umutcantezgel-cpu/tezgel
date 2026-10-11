// Kontaktblatt (P4-08f, KERN v1.2 K-008, K-011): Kern-Fassung von `@/components/contact/DirectContactCard` auf `/kontakt`.
// Gestalt: Schriftfeld – Kopf auf Tinte (Etikett, h3, Satz), darunter auf Fliese die drei Wege als gleichwertige Zeilen
// (Telefon · Mobil & WhatsApp · E-Mail), getrennt durch 1-px-Fugen, dann Bürozeiten und Betriebssitz als Angaben.
// Jede Zeile ist ein Link über die volle Breite (Trefferfläche ≥ 64 px), Etikett und Wert stehen je in einem eigenen
// Block (Lehre 2), Werte in Mono, wo sie Maß sind (Telefon, Mobilnummer; K-005).
// Daten nur aus COMPANY_DATA (K-004). Linkziele: Festnetz `tel:+4964414483567` (Bestand `tel:+49 6441 4483567`, gleiche Nummer,
// ohne Leerzeichen wie überall sonst), WhatsApp `wa.me` und `mailto:` wie im Bestand.
// Öffnungszeiten: Werte aus `COMPANY_DATA.hours`, Wortlaut der Zeilen wie im Bestand („Mo–Do“, „Fr“, Samstag mit
// „(Vor-Ort-Termine nach Vereinbarung)“). Widersprüche zu anderen Angaben werden gemeldet, nicht aufgelöst (Rückgabe P4-08f).
// Entfällt: Verlaufsflecken (Glow), Pillen-Badge mit Award-Zeichen, Skalieren beim Hover.
// Server-Komponente; Register nur `zustand` (Hover, Fokus, aktiv).
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { siteConfig } from '@/lib/config';
import { Etikett, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import { UMBRUCH } from '@/components/kern/vorlagen/teile';

const ZEILE = 'flex items-start gap-k-4 border-b border-k-fuge px-k-4 py-k-4 sm:px-k-5';

const WEG = verbinde(
  ZEILE,
  'group min-h-k-8 text-k-tinte',
  'pointer-fine:hover:bg-k-kalk active:bg-k-kalk',
  // Ring am Link selbst, über den Nachbarzeilen (Lehre 4)
  'focus-visible:relative focus-visible:z-10',
  fokus('hell'),
);

function Zeichen({ name }: { name: IconName }) {
  return (
    <span aria-hidden="true" className="flex h-k-6 shrink-0 items-center text-k-tinte-2">
      <Icon name={name} groesse={20} />
    </span>
  );
}

/** Ein Weg (Telefon, WhatsApp, E-Mail): Etikett und Wert, rechts das Zeichen für das Ziel. */
function Weg({ href, zeichen, etikett, wert, mono = false, extern = false }: { href: string; zeichen: IconName; etikett: string; wert: string; mono?: boolean; extern?: boolean }) {
  return (
    <li>
      <a
        href={href}
        target={extern ? '_blank' : undefined}
        rel={extern ? 'noopener noreferrer' : undefined}
        data-motion="zustand"
        className={WEG}
      >
        <Zeichen name={zeichen} />
        <div className="flex min-w-0 flex-1 flex-col gap-k-1">
          <div className="k-mono text-k-1 text-k-tinte-2">{etikett}</div>
          <div
            className={verbinde(
              mono ? 'k-mono text-k-3' : 'k-text text-k-3 font-semibold',
              'underline decoration-1 underline-offset-4 decoration-transparent pointer-fine:group-hover:decoration-k-tinte group-active:decoration-k-tinte',
              UMBRUCH,
            )}
          >
            {wert}
          </div>
        </div>
        <span aria-hidden="true" className="hidden h-k-6 shrink-0 items-center text-k-tinte-2 sm:flex">
          <Icon name={extern ? 'extern' : 'pfeil'} groesse={20} />
        </span>
      </a>
    </li>
  );
}

/** Angabe ohne Link (Bürozeiten, Betriebssitz): Etikett und Zeilen untereinander. */
function Angabe({ zeichen, etikett, children }: { zeichen: IconName; etikett: string; children: ReactNode }) {
  return (
    <div className={verbinde(ZEILE, 'last:border-b-0')}>
      <Zeichen name={zeichen} />
      <div className="flex min-w-0 flex-1 flex-col gap-k-1">
        <div className="k-mono text-k-1 text-k-tinte-2">{etikett}</div>
        {children}
      </div>
    </div>
  );
}

export default function Kontaktblatt() {
  const { owner, contact, hours, headquarters } = COMPANY_DATA;
  return (
    <div className="border border-k-tinte bg-k-fliese">
      {/* Kopf des Blatts auf Tinte (Schriftfeld-Kopf, K-008) */}
      <div className="bg-k-tinte px-k-4 py-k-5 sm:px-k-5">
        <Etikett auf="tinte" rahmen>
          Eingetragener HWK-Fachbetrieb
        </Etikett>
        <h3 className={verbinde('mt-k-4 k-anzeige text-k-5 text-k-kalk', UMBRUCH)}>
          Direkter Kontakt
        </h3>
        <p className="mt-k-2 k-text text-k-2 text-k-nacht-2">
          Sprechen Sie direkt mit Inhaber {owner.fullName} – ohne Callcenter oder Warteschleifen.
        </p>
      </div>

      {/* Drei gleichwertige Wege */}
      <ul>
        <Weg href={`tel:${contact.phoneLink}`} zeichen="telefon" etikett="Büro / Festnetz" wert={contact.phone} mono />
        <Weg href={siteConfig.contact.whatsappLink} zeichen="whatsapp" etikett="Mobil & WhatsApp" wert={contact.mobile} mono extern />
        <Weg href={`mailto:${contact.email}`} zeichen="mail" etikett="E-Mail Adresse" wert={contact.email} />
      </ul>

      {/* Angaben */}
      <Angabe zeichen="uhr" etikett="Bürozeiten">
        <div className="k-text text-k-2 text-k-tinte">
          Mo–Do: {hours.monday.open} – {hours.thursday.close} Uhr
        </div>
        <div className="k-text text-k-2 text-k-tinte">
          Fr: {hours.friday.open} – {hours.friday.close} Uhr
        </div>
        <div className="k-text text-k-2 text-k-tinte-2">
          Sa: {hours.saturday.open} – {hours.saturday.close} Uhr (Vor-Ort-Termine nach Vereinbarung)
        </div>
      </Angabe>
      <Angabe zeichen="ort" etikett="Betriebssitz (HQ)">
        <div className="k-text text-k-2 font-semibold text-k-tinte">{headquarters.street}</div>
        <div className="k-text text-k-2 text-k-tinte">
          <span className="k-mono">{headquarters.postalCode}</span> {headquarters.city} (Mittelhessen)
        </div>
      </Angabe>
    </div>
  );
}
